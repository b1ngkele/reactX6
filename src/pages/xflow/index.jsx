import React from 'react';
import {
  XFlow,
  XFlowCanvas,
  createGraphConfig,
  XFlowGraphCommands,
  NsGraph
} from '@antv/xflow';
import Node1 from './components/node';
import Edge1 from './components/edge';

export default () => {
  const graphConfig = createGraphConfig((config) => {
    /** 设置画布配置项，会覆盖XFlow默认画布配置项 */
    config.setX6Config({
      grid: true,
      width: 1200,
      height: 600,
      scaling: { min: 0.2, max: 3 },
      mousewheel: { enabled: true, zoomAtMousePosition: true },
    });

    /** 设置画布需要渲染的React节点、连线上的React内容 */
    config.setNodeRender('NODE1', (props) => <Node1 {...props} />);
    config.setEdgeRender('EDGE1', (props) => <Edge1 {...props} />);
  })();

  const onLoad = async (app) => {
    console.log('sGraph.AnchorGroup.TOP', NsGraph.AnchorGroup.TOP)
    const nodes = [
      {
        id: 'root1',
        width: 150,
        height: 40,
        renderKey: 'NODE1',
        x: 60,
        y: 200,
        ports: [
          {
            id: 'node1-input-1',
            type: 'output',
            group: NsGraph.AnchorGroup.TOP,
            tooltip: '输入桩',
          },
        ]
      },
      {
        id: 'down1',
        x: 550,
        y: 50,
        width: 120,
        height: 40,
        renderKey: 'NODE1',
        info: 'React节点2',
        ports: [
          {
            id: 'node1-input-2',
            type: 'input',
            group: 'left',
            tooltip: '输入桩',
          },
        ]
      },
    ];
    const edges = [
      { id: 'root1-down1',sourcePortId: 'node1-input-1', targetPortId: 'node1-input-2', label: 'text', renderKey: 'EDGE1' },
    ];
    const graphData = { nodes, edges };

    /** 执行画布渲染命令 */
    app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
      graphData,
    });
  };

  return (
    <div style={{ width: 1200, height: 600 }}>
      <XFlow
        isAutoCenter={true}
        // graphData={graphData}
        onLoad={onLoad}
      >
        <XFlowCanvas
          position={{ top: 0, left: 0 }}
          config={graphConfig}
        ></XFlowCanvas>
      </XFlow>
    </div>
  );
};
