import { Graph, Node, Path } from '@antv/x6';
import { cloneDeep } from 'lodash';
import { commonPortsGroups } from './config';

export const registerNode = () => {
  // node基础节点样式
  Graph.registerNode('base-cell', {
    inherit: 'rect',
    attrs: {
      body: {
        strokeWidth: 1,
        rx: 4,
        ry: 4,
        fill: '#2cfeff',
        stroke: '#2cfeff',
        fillOpacity: '0.15',
        strokeOpacity: '0.6',
      },
      icon: {
        refX: 12,
        refY: 13,
      },
      path: {
        transform: 'scale(0.013)',
        fill: '#2CFEFF',
      },
      path2: {
        transform: 'scale(0.013)',
        fill: '#2CFEFF',
      },
      label: {
        text: 'node text',
        refX: 32,
        refY: 14,
        fill: '#2CFEFF',
        fontSize: 16,
        'text-anchor': 'start',
        y: 7,
        textWrap: {
          width: 80,
          height: 20,
          ellipsis: true,
        },
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'g',
        selector: 'icon',
        children: [
          {
            tagName: 'path',
            selector: 'path',
          },
          {
            tagName: 'path',
            selector: 'path2',
          },
        ],
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    ports: {
      groups: cloneDeep(commonPortsGroups),
    },
  });

  //  开始节点
  Graph.registerNode('start', {
    inherit: 'base-cell',
    size: {
      width: 82,
      height: 40,
    },
    attrs: {
      label: {
        text: '开始',
      },
      path: {
        d:
          'M895.72141 411.897028L239.333657 15.577782a106.557878 106.557878 0 0 0-110.653445 0 117.016201 117.016201 0 0 0-55.36329 100.121987v792.711628a117.016201 117.016201 0 0 0 55.36329 100.121987 106.557878 106.557878 0 0 0 110.653445 0l656.387753-396.319247a118.405769 118.405769 0 0 0 0-200.170839z',
      },
    },
    ports: {
      items: [
        {
          group: 'out',
        },
      ],
    },
  });

  //  策略节点
  Graph.registerNode('change', {
    inherit: 'base-cell',
    attrs: {
      label: {
        text: '数据集成转换',
      },
      path: {
        d:
          'M636.367648 1006.986642h-247.714495a29.194923 29.194923 0 0 1-31.304579-30.964312v-117.528278a674.885891 674.885891 0 0 1-68.053432-37.157174l-99.017745 61.86057a32.597594 32.597594 0 0 1-43.281983-12.385725L23.886755 654.333754a26.608892 26.608892 0 0 1 12.385725-43.281983l99.017744-61.86057V474.876853l-99.358012-61.860571a26.608892 26.608892 0 0 1-12.045457-43.350036L147.335682 153.120223a28.854655 28.854655 0 0 1 43.281983-6.192862l98.677477 61.86057a240.09251 240.09251 0 0 1 68.053432-37.157174V47.97767a29.194923 29.194923 0 0 1 31.304579-30.964312h247.714495a29.194923 29.194923 0 0 1 30.964312 30.964312v117.528278a674.885891 674.885891 0 0 1 68.053432 37.157174l99.017745-61.86057a32.597594 32.597594 0 0 1 43.009769 12.317671l123.721141 216.546023a26.608892 26.608892 0 0 1-12.385725 43.281983l-99.017744 61.86057v74.314348l99.017744 61.860571a35.523892 35.523892 0 0 1 12.385725 43.281983l-123.721141 216.546022a35.523892 35.523892 0 0 1-43.281983 12.385725l-99.017744-61.86057a240.09251 240.09251 0 0 1-68.053433 37.157174v117.528278a29.194923 29.194923 0 0 1-30.692098 30.964312z m-216.546022-61.86057h185.37755v-105.210607a34.026716 34.026716 0 0 1 18.578587-30.964312 394.709909 394.709909 0 0 0 86.63202-49.474845 39.470991 39.470991 0 0 1 37.157174 0l92.824882 55.667707 92.688775-160.810261-92.552668-55.735761c-12.385725-12.385725-18.578587-24.771449-12.385725-37.157174 0-18.578587 6.192862-30.964312 6.192862-49.474846a136.106865 136.106865 0 0 0-6.192862-49.474845 47.229082 47.229082 0 0 1 12.385725-30.964312l92.824882-55.667708-92.824882-160.878314-92.824882 55.667707a39.470991 39.470991 0 0 1-37.157174 0 394.709909 394.709909 0 0 0-86.83618-49.474845 53.489998 53.489998 0 0 1-18.578588-37.157174V78.873928H419.549412v105.210607a34.026716 34.026716 0 0 1-18.578587 30.964312 394.709909 394.709909 0 0 0-86.63202 49.474845 39.470991 39.470991 0 0 1-37.157174 0L184.424802 214.980794 91.940187 375.859108l92.824882 55.667708a22.59374 22.59374 0 0 1 12.385725 30.964312c0 18.578587-6.192862 30.964312-6.192862 49.474845a136.106865 136.106865 0 0 0 5.852595 49.474846 22.59374 22.59374 0 0 1-12.385725 30.964312l-92.484615 55.735761 92.824882 160.878314 92.824882-55.667707a39.470991 39.470991 0 0 1 37.157175 0 394.709909 394.709909 0 0 0 86.632019 49.474845 34.026716 34.026716 0 0 1 18.170267 30.828205z',
      },
      path2: {
        d:
          'M512.374294 697.615737a185.649764 185.649764 0 1 1 185.649764-185.649764 182.315146 182.315146 0 0 1-185.649764 185.649764z m0-309.370904a123.72114 123.72114 0 1 0 123.72114 123.72114 124.129461 124.129461 0 0 0-123.72114-123.72114z',
      },
    },
    size: {
      width: 116,
      height: 40,
    },
    ports: {
      items: [
        {
          group: 'in',
        },
        {
          group: 'out',
        },
      ],
    },
  });

  // 判断节点 节点
  Graph.registerNode('homework', {
    inherit: 'base-cell',
    attrs: {
      label: {
        text: '数据集成作业',
      },
      path: {
        d:
          'M140.653714 73.142857A67.510857 67.510857 0 0 0 73.142857 140.653714v742.692572a67.510857 67.510857 0 0 0 67.510857 67.510857h742.692572a67.510857 67.510857 0 0 0 67.510857-67.510857V140.653714A67.510857 67.510857 0 0 0 883.346286 73.142857z m-4.096-73.142857h750.884572A136.557714 136.557714 0 0 1 1024 136.557714v750.884572a136.557714 136.557714 0 0 1-136.557714 136.484571H136.484571A136.557714 136.557714 0 0 1 0 887.442286V136.557714A136.630857 136.630857 0 0 1 136.484571 0z m18.578286 827.538286l672.256-672.256 51.712 51.638857-672.329143 672.256-51.638857-51.638857zM258.925714 279.917714l77.677715-77.458285a36.571429 36.571429 0 0 1 51.638857 51.638857L310.125714 331.629714l77.604572 77.604572a36.571429 36.571429 0 1 1-51.638857 51.638857L258.925714 383.341714 181.321143 460.946286a36.571429 36.571429 0 0 1-51.712-51.712l77.458286-77.604572-77.458286-77.604571a36.571429 36.571429 0 1 1 51.712-51.638857l77.604571 77.531428z m564.077715 340.918857a36.571429 36.571429 0 1 1 55.076571 48.201143l-191.926857 196.169143a36.571429 36.571429 0 0 1-53.394286 1.828572l-98.962286-83.821715a36.571429 36.571429 0 0 1 51.712-51.712l71.314286 56.173715 166.253714-166.765715z',
      },
    },
    size: {
      width: 116,
      height: 40,
    },
    ports: {
      items: [
        {
          group: 'in',
        },
        {
          group: 'out',
        },
        {
          group: 'out',
        },
      ],
    },
  });

  Graph.registerConnector(
    'algo-connector',
    (s, e) => {
      const offset = 4;
      const deltaY = Math.abs(e.y - s.y);
      const control = Math.floor((deltaY / 3) * 2);

      const v1 = { x: s.x, y: s.y + offset + control };
      const v2 = { x: e.x, y: e.y - offset - control };

      return Path.normalize(
        `M ${s.x} ${s.y}
         L ${s.x} ${s.y + offset}
         C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
         L ${e.x} ${e.y}
        `,
      );
    },
    true,
  );

  Graph.registerEdge(
    'dag-edge',
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: '#C2C8D5',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    },
    true,
  );
};

export const unregisterShape = () => {
  // 取消注册自定义圆形
  Graph.unregisterNode('start');
  Graph.unregisterNode('change');
  Graph.unregisterNode('homework');
};
