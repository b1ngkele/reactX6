import { registerNode, unregisterNode } from './node'

export default function registerShape() {
  registerNode()
}

export const unregisterShape = () => {
  unregisterNode()
}