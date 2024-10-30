import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'framer-motion'
import type { AnimationFactory, MotionState, MotionStateContext, Options, Variant } from './types'
import { getOptions, hasChanged, noop, resolveVariant } from './utils'
import { scheduleAnimation, unscheduleAnimation } from './schedule'
import { style } from './style'
import { animate } from 'framer-motion/dom'
import { motionEvent } from './event'
import { visualElementStore } from 'framer-motion/dist/es/render/store.mjs'
import { createVisualElement } from 'framer-motion/dist/es/animation/utils/create-visual-element.mjs'

/**
 * A list of state types, in priority order. If a value is defined in
 * a righter-most type, it will override any definition in a lefter-most.
 */
const stateTypes = ['initial', 'animate',
  //  ...Object.keys(gestures),
  'exit']
// const gestures = {
//   // inView, hover, press
// }
export const mountedStates = new WeakMap<Element, MotionState>()

export function createMotionState(
  options: Options = {},
  parent?: MotionState,
) {
  /**
   * The element represented by the motion state. This is an empty reference
   * when we create the state to support SSR and allow for later mounting
   * in view libraries.
   *
   * @ts-ignore
   */
  let element: Element

  /**
   * Calculate a depth that we can use to order motion states by tree depth.
   */
  const depth = parent ? parent.getDepth() + 1 : 0

  /**
   * Track which states are currently active.
   */
  const activeStates = { initial: true, animate: true }

  /**
   * A map of functions that, when called, will remove event listeners for
   * a given gesture.
   */
  // const gestureSubscriptions: GestureSubscriptions = {}

  /**
   * Initialise a context to share through motion states. This
   * will be populated by variant names (if any).
   */
  const context: MotionStateContext = {}

  for (const name of stateTypes) {
    // 为每个状态类型设置上下文
    // 如果options中对应的状态类型是字符串，则直接使用
    // 否则，尝试从父级上下文中获取对应的状态类型值
    context[name as keyof typeof context]
      = typeof options[name as keyof typeof options] === 'string'
        ? options[name as keyof typeof options]
        : (parent?.getContext()[name as keyof typeof context] as any)
  }

  /**
   * If initial is set to false we use the animate prop as the initial
   * animation state.
   */
  const initialVariantSource = options.initial === false ? 'animate' : 'initial'

  /**
   * Destructure an initial target out from the resolved initial variant.
   */
  let { transition: initialTransition, ...target }
   = resolveVariant(
     (options[initialVariantSource] || context[initialVariantSource]),
     options.variants,
   ) || {}
  /**
   * The base target is a cached map of values that we'll use to animate
   * back to if a value is removed from all active state types. This
   * is usually the initial value as read from the DOM, for instance if
   * it hasn't been defined in initial.
   */
  const baseTarget: Variant = { ...target }

  /**
   * A generator that will be processed by the global animation scheduler.
   * This yields when it switches from reading the DOM to writing to it
   * to prevent layout thrashing.
   */
  function* animateUpdates() {
    const prevTarget = target
    target = {}
    const resolvedVariants: { [key: string]: DOMKeyframesDefinition } = {}
    const enteringInto: { [key: string]: string } = {}
    const animationOptions: { [key: string]: DynamicAnimationOptions } = {}
    for (const name of stateTypes) {
      if (!activeStates[name as keyof typeof activeStates])
        continue

      const variant = resolveVariant(
        options[name as keyof typeof options] as any,
        options.variants,
      )
      if (!variant)
        continue

      resolvedVariants[name] = variant

      const allTarget = { ...prevTarget, ...variant }
      for (const key in allTarget) {
        if (key === 'transition')
          continue

        // @ts-ignore
        target[key] = variant[
          key as keyof typeof variant
        ]

        animationOptions[key] = getOptions(
          variant.transition ?? options.transition ?? {},
          key,
        )

        /**
         * Mark which state type this value is animating into.
         */
        enteringInto[key] = name
      }
    }

    const allTargetKeys = new Set([
      ...Object.keys(target),
      ...Object.keys(prevTarget),
    ])

    const animationFactories: AnimationFactory[] = []
    allTargetKeys.forEach((key: any) => {
      if (target[key] === undefined) {
        target[key] = baseTarget[key]
      }

      if (hasChanged(prevTarget[key], target[key])) {
        baseTarget[key] ??= style.get(element, key) as string
        animationFactories.push(
          () => {
            return animate(
              element,
              {
                [key]: target[key],
              },
              (animationOptions[key] || {}) as any,
            )
          },
        )
      }
    })

    // Wait for all animation states to read from the DOM
    yield

    const animations = animationFactories
      .map(factory => factory())
      .filter(Boolean)

    if (!animations.length)
      return

    const animationTarget = target
    element.dispatchEvent(motionEvent('motionstart', animationTarget))

    Promise.all(animations.map((animation: any) => animation.finished))
      .then(() => {
        element.dispatchEvent(motionEvent('motioncomplete', animationTarget))
      })
      .catch(noop)
  }

  // const setGesture = (name: string, isActive: boolean) => () => {
  //   activeStates[name as keyof typeof activeStates] = isActive
  //   scheduleAnimation(state)
  // }
  const state: MotionState = {
    update: (newOptions) => {
      if (!element)
        return
      options = newOptions
      visualElementStore.get(element)?.update(newOptions as any, null)
      // updateGestureSubscriptions()
      scheduleAnimation(state)
    },
    setActive: (name, isActive) => {
      if (!element)
        return
      activeStates[name as keyof typeof activeStates] = isActive
      scheduleAnimation(state)
    },
    animateUpdates,
    getDepth: () => depth,
    getTarget: () => target,
    getOptions: () => options,
    getContext: () => context,
    mount: (newElement, props) => {
      // invariant(
      //   Boolean(newElement),
      //   'Animation state must be mounted with valid Element',
      // )

      element = newElement
      mountedStates.set(element, state)
      if (!visualElementStore.get(element)) {
        createVisualElement(element)
      }
      const visualElement = visualElementStore.get(element)
      visualElement.update(props, null)
      if (typeof props.initial === 'object') {
        for (const key in props.initial) {
          visualElement.setStaticValue(key, props.initial[key])
        }
      }
      return () => {
        mountedStates.delete(element)
        unscheduleAnimation(state)
        visualElementStore.get(element)?.unmount()
        // for (const key in gestureSubscriptions) {
        //   gestureSubscriptions[key]()
        // }
      }
    },
    isMounted: () => Boolean(element),
  }

  return state
}
