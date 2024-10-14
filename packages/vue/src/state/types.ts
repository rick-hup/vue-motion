import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'framer-motion'
import type { animate } from 'framer-motion/dom'
import type { CSSProperties } from 'vue'

type AnimationPlaybackControls = ReturnType<typeof animate>

export interface Variant extends DOMKeyframesDefinition {
  transition?: DynamicAnimationOptions
}

export interface Options {
  initial?: string | Variant | boolean
  animate?: string | Variant
  exit?: string | Variant
  variants?: {
    [k: string]: Variant
  }
  transition?: DynamicAnimationOptions
  style?: CSSProperties
}

export interface MotionState {
  update: (options: Options) => void
  getDepth: () => number
  getTarget: () => DOMKeyframesDefinition
  getOptions: () => Options
  getContext: () => MotionStateContext
  setActive: (type: keyof MotionStateContext, isActive: boolean) => void
  mount: (element: Element, props: any) => () => void
  isMounted: () => boolean
  animateUpdates: () => Generator<void>
}

export interface MotionStateContext {
  initial?: string
  animate?: string
  inView?: string
  hover?: string
  press?: string
  exit?: string
}

export type AnimationFactory = () => AnimationPlaybackControls | undefined

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit: (v: number) => string | number
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }
