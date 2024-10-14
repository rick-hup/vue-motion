// import { animate } from 'framer-motion/dom'

// const needToAddFirstTimeKeys = ['scale']
// export function createAnimate({
//   key,
//   target,
//   prevTarget,
//   element,
//   animationOptions,
// }: {
//   key: string
//   target: any
//   prevTarget: any
//   element: Element
//   animationOptions: any
// }) {
//   let animateTarget = target
//   if(needToAddFirstTimeKeys.includes(key)){
//     animateTarget = Array.isArray(target)?[]
//   }
//   return () => animate(target, target, animationOptions) as any
// }

// function getLastFrameValue(target: any) {
//   if (Array.isArray(target)) {
//     return target.map((item) => getLastFrameValue(item))
//   }
//   if (typeof target === 'object' && target !== null) {
//     return Object.keys(target).reduce((acc, key) => {
//       acc[key] = getLastFrameValue(target[key])
//       return acc
//     }, {})
//   }
// }
