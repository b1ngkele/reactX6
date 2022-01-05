import { Addon, Graph } from '@antv/x6'
import { useEffect, useRef } from 'react';
import registerShape, { unregisterShape } from './shape';
import styles from './index.less';

const createNodes = (graph: Graph) => {
	const startNode = graph.createNode({
		shape: 'sps-circle',
		label: '开始'
	})

	const eventNode = graph.createNode({
		shape: 'sps-rect',
		label: '事件',
		attrs: {
			body: {
				rx: 20,
				ry: 20
			}
		}
	})

	const endNode = graph.createNode({
		shape: 'sps-circle',
		label: '结束'
	})

	return {
		startNode,
		eventNode,
		endNode
	}
}

export default function IndexPage() {

	const stencilContanerRef = useRef<HTMLElement | null>(null)
	const graphContanerRef = useRef<HTMLElement | null>(null)

	let graph: Graph

	useEffect(() => {
		if (!graph) {
			const stencilContainer = stencilContanerRef.current!
			const graphContainer = graphContanerRef.current!
			registerShape();
			// 初始化 画布
			graph = new Graph({
				container: graphContainer,
				width: 800,
				height: 600,
				grid: true, // 显示网格线
				connecting: {
					router: 'manhattan', // 连接线路由算法
					connector: {
						name: 'rounded', // 连接线圆角
						args: {
							radius: 20
						}
					},
					snap: {
						radius: 50 // 锚点吸附半径
					},
					allowBlank: false, // 禁用连线到空处
					allowMulti: false, // 禁用在同一对节点中多条连线
					allowLoop: false, // 禁用自循环连线
					connectionPoint: 'anchor' // 连接点为锚点
				},
				selecting: {
					enabled: true, // 节点/边 可选中
					showNodeSelectionBox: true, // 节点选中后边框
					showEdgeSelectionBox: true // 边选中后边框
				},
				keyboard: true, // 启用键盘事件
			})
			// #region 初始化 stencil
			const stencil = new Addon.Stencil({
				title: '流程节点',
				target: graph, // 绑定流程面板
				stencilGraphWidth: 200, // 节点库宽度
				stencilGraphHeight: 600, // 节点库高度
				layoutOptions: {
					columns: 2, // 每行节点数
					rowhHeight: 40 // 行高
				}
			})
			stencilContainer.appendChild(stencil.container)

			// #region 初始化图形
			const { startNode, eventNode, endNode } = createNodes(graph)
			stencil.load([startNode, eventNode, endNode])

		}
	}, [])

	const graphToJson = () => {
		return {
			// ...state.flow,
			nodes: graph.getNodes().map(item => {
				// @ts-ignore
				const { id, shape, label, ports: { items }, data } = item
				const { x, y } = item.position()
				return {
					id,
					shape,
					label,
					x,
					y,
					ports: {
						items
					},
					data
				}
			}),
			edges: graph.getEdges().map(item => ({
				target: item.target,
				source: item.source,
				data: item.data
			}))
		}
	}

	const click = () => {
		console.log(graphToJson())
	}

	return (
		<div className={styles.warp}>
			<div style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
				<button onClick={click}>click me123</button>
			</div>
			<div ref={stencilContanerRef} className={styles.left}>

			</div>
			<div ref={graphContanerRef} className={styles.right}>

			</div>

		</div>
	);
}
