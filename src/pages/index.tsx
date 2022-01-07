import { Addon, Graph } from '@antv/x6';
import { useEffect, useRef, useState } from 'react';
import { StepForwardOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import CreateModal from './components/createModal';
import ContextMenu from './components/ContextMenu';
import { Input, Collapse, Menu } from 'antd';
import { initformData } from './utils/config';
import { registerNode, unregisterShape } from './utils/shape';
import { cloneDeep } from 'lodash';
import styles from './index.less';

const { Search } = Input;
const { Panel } = Collapse;

const stencilList = [
  { label: '数据集成转换', value: 'change' },
  { label: '数据集成作业', value: 'homework' },
];

let graph: Graph;
let dnd: any;

export default function IndexPage() {
  const stencilContanerRef = useRef<HTMLElement | null>(null);
  const graphContanerRef = useRef<HTMLElement | null>(null);
  const reff = useRef<HTMLElement | null>(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const stencilContainer = stencilContanerRef.current!;
    const graphContainer = graphContanerRef.current!;
    // 初始化 画布
    if (!graph) {
      registerNode();
      graph = new Graph({
        container: graphContainer,
        autoResize: graphContainer,
        width: 800,
        height: 600,
        panning: true,
        connecting: {
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          snap: {
            radius: 50, // 锚点吸附半径
          },
          connector: 'algo-connector',
          connectionPoint: 'anchor',
          anchor: 'center',
          // validateMagnet({ magnet }) {
          // 	return magnet.getAttribute('port-group') !== 'top'
          // },
          createEdge() {
            return graph.createEdge({
              shape: 'dag-edge',
              attrs: {
                line: {
                  stroke: '#2CFEFF', // #e52e1a
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 8,
                  },
                },
              },
              zIndex: -1,
            });
          },
        },
        selecting: {
          enabled: true, // 节点/边 可选中
          showNodeSelectionBox: false, // 节点选中后边框
          showEdgeSelectionBox: false, // 边选中后边框
        },
        keyboard: true, // 启用键盘事件
      });

      graph.on('cell:contextmenu', ({ e, cell }) => {
        let shape = cell.shape;
        if (shape == 'start') return;
        setVisible(true);
        graph.resetSelection(cell);
        reff.current.style.top = e.clientY + 25 + 'px';
        reff.current.style.left = e.clientX + 25 + 'px';
      });

      graph.on('blank:click', () => {
        setVisible(false);
      });

      // #region 初始化 stencil
      dnd = new Addon.Dnd({
        target: graph,
        scaled: true,
        containerParent: stencilContainer,
      });

      // 选中节点/边  #31a3ff
      graph.on('cell:selected', ({ cell }) => {
        if (cell.isEdge()) {
          cell.attr('line/stroke', '#07f5f5');
          cell.attr('line/strokeWidth', 2.5);
        } else {
          cell.setAttrs({
            body: {
              fill: '#2cfeff',
              stroke: '#2cfeff',
              fillOpacity: '1',
              strokeOpacity: '1',
            },
            label: {
              fill: '#151B21',
            },
            path: {
              fill: '#151B21',
            },
            path2: {
              fill: '#151B21',
            },
          });
        }
      });

      // 取消选中节点/边时触发
      graph.on('cell:unselected', ({ cell }) => {
        if (cell.isEdge()) {
          cell.attr('line/stroke', '#2cfeff');
          cell.attr('line/strokeWidth', 1);
        } else {
          cell.setAttrs({
            body: {
              fill: '#2cfeff',
              stroke: '#2cfeff',
              fillOpacity: '0.15',
              strokeOpacity: '0.6',
            },
            label: {
              fill: '#2CFEFF',
            },
            path: {
              fill: '#2CFEFF',
            },
            path2: {
              fill: '#2CFEFF',
            },
          });
        }
      });
    }

    return () => {
      unregisterShape();
    };
  }, []);

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  // 初始化开始节点
  const initGraphStart = () => {
    graph.clearCells();
    graph.center(); // 内容居中
    graph.zoomTo(1); // 缩放比例
    const start_node = graph.createNode({
      shape: 'start',
      x: 100,
      y: 300,
    });
    graph.addNode(start_node);
  };

  const startDrag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    shape: string,
  ) => {
    let node = graph.createNode({
      shape: shape,
      data: cloneDeep(initformData[shape]),
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
                  onMouseDown={(e) => {
                    startDrag(e, it.value);
                  }}
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
      <div style={{ position: 'absolute' }} ref={reff}>
        {visible ? (
          <Menu>
            <Menu.Item key="0">
              <a href="https://www.antgroup.com">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="https://www.aliyun.com">2nd menu item</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">3rd menu item</Menu.Item>
          </Menu>
        ) : null}
      </div>
    </div>
  );
}
