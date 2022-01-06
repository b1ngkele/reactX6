import { Addon, Graph } from '@antv/x6';
import { useEffect, useRef, useState } from 'react';
import { StepForwardOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import CreateModal from './components/createModal';
import { Input, Collapse } from 'antd';
import LeftCom from './components/Left';
import { initformData } from './utils/config';
import { cloneDeep } from 'lodash';
import styles from './index.less';

const { Search } = Input;
const { Panel } = Collapse;

const stencilList = [
  { label: '数据集成转换', value: 'change' },
  { label: '数据集成作业', value: 'homework' },
];

export default function IndexPage() {
  const stencilContanerRef = useRef<HTMLElement | null>(null);
  const graphContanerRef = useRef<HTMLElement | null>(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  // const [graph, setGraph] = useState<Graph | undefined>(undefined);
  // const [dnd, setDnd] = useState<any | undefined>(undefined);

  let graph: Graph;
  let dnd: any;

  useEffect(() => {
    const stencilContainer = stencilContanerRef.current!;
    const graphContainer = graphContanerRef.current!;
    // 初始化 画布
    if (!graph) {
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
              radius: 20,
            },
          },
          snap: {
            radius: 50, // 锚点吸附半径
          },
          allowBlank: false, // 禁用连线到空处
          allowMulti: false, // 禁用在同一对节点中多条连线
          allowLoop: false, // 禁用自循环连线
          connectionPoint: 'anchor', // 连接点为锚点
        },
        selecting: {
          enabled: true, // 节点/边 可选中
          showNodeSelectionBox: true, // 节点选中后边框
          showEdgeSelectionBox: true, // 边选中后边框
        },
        keyboard: true, // 启用键盘事件
      });
      // #region 初始化 stencil
      dnd = new Addon.Dnd({
        target: graph,
        scaled: true,
        containerParent: stencilContainer,
      });
    }
  });

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let node = graph.createNode({
      width: 100,
      height: 40,
      attrs: {
        label: {
          text: 'Rect',
          fill: '#6a6c8a',
        },
        body: {
          stroke: '#31d0c6',
          strokeWidth: 2,
        },
      },
    });
    dnd.start(node, e);
  };

  return (
    <div className={styles.warp}>
      <div className={styles.left} ref={stencilContanerRef}>
        <div>
          <Search onSearch={onSearch} value={searchValue} />
        </div>
        <Collapse defaultActiveKey={['all']}>
          <Panel header="节点组件" key="all">
            {stencilList.map((it) => {
              return (
                <div
                  style={{ display: 'flex', height: 30, alignItems: 'center' }}
                  onMouseDown={startDrag}
                >
                  <StepForwardOutlined />
                  <span>{it.label}</span>
                </div>
              );
            })}
          </Panel>
        </Collapse>
      </div>
      <div ref={graphContanerRef} className={styles.right} />
      <CreateModal visible={false} onCancel={() => {}} />
    </div>
  );
}
