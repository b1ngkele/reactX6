import { Graph } from '@antv/x6'
import { createPorts } from '../utils/shape'

const attrs = {
  body: {
    strokeWidth: 1,
    stroke: '#5F95FF',
    fill: '#EFF4FF'
  },
  text: {
    fontSize: 12,
    color: '#262626'
  }
}

export const registerNode = () => {
  // 注册自定义圆形
  Graph.registerNode('sps-circle', {
    inherit: 'circle',
    width: 45,
    height: 45,
    attrs,
    ports: createPorts() // 锚点配置
  })

  // 注册自定义矩形
  Graph.registerNode('sps-rect', {
    inherit: 'rect',
    width: 66,
    height: 36,
    attrs,
    ports: createPorts()
  })
}

// 取消注册自定义圆形
export const unregisterNode = () => {
  Graph.unregisterNode('sps-circle')
  Graph.unregisterNode('sps-rect')
}
