import { Addon, Graph } from '@antv/x6';
import { useEffect, useRef, useState } from 'react';
import { StepForwardOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import CreateModal from './components/createModal';
import ContextMenu from "./components/ContextMenu";
import { Input, Collapse, Menu } from 'antd';
import { initformData } from './utils/config';
import { registerNode, unregisterShape } from "./utils/shape";
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

  console.log('graph', graph)

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
        // 网格
        grid: true,
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

      graph.on("cell:contextmenu", ({ e, cell }) => {
        let shape = cell.shape;
        if (shape == "start") return;
        setVisible(true)
        graph.resetSelection(cell);
        reff.current.style.top = e.clientY + 25 + "px";
        reff.current.style.left = e.clientX + 25 + "px";
      });

      graph.on("blank:click", () => {
        setVisible(false)
      });
      // #region 初始化 stencil
      dnd = new Addon.Dnd({
        target: graph,
        scaled: true,
        containerParent: stencilContainer,
      });

    }
    return () => {
      unregisterShape();
    }
  }, []);

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, shape: string) => {
    console.log("🚀 ~ file: index.tsx ~ line 100 ~ startDrag ~ graph", graph)
    let node = graph.createNode({
      shape: shape,
      data: cloneDeep(initformData[shape])
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
                  onMouseDown={(e) => { startDrag(e, it.value) }}
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
      <CreateModal visible={false} onCancel={() => { }} />
      <div style={{ position: 'absolute' }} ref={reff}>
        {
          visible ? (
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
          ) : null
        }
      </div>
    </div>
  );
}
