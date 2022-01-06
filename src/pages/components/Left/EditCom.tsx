import React, { useMemo } from 'react';
import { StepForwardOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { initformData } from '../../utils/config';
import { ReactShape } from '@antv/x6-react-shape';
import { cloneDeep } from 'lodash';

export default (props: {
  node?: ReactShape;
  type: string;
  text: string;
  dnd: any;
  graph: any;
}) => {
  const { type, text, dnd, graph } = props;
  const dom = useMemo(() => {
    if (type === 'change') {
      return (
        <>
          <StepForwardOutlined />
        </>
      );
    } else if (type === 'homework') {
      return (
        <>
          <MenuUnfoldOutlined />
        </>
      );
    }
  }, [type]);

  const startDrag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string,
  ) => {
    // let node = graph.createNode({
    //   shape: 'rect',
    //   data: cloneDeep(initformData[type])
    // });
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
    <div
      style={{ display: 'flex', height: 30, alignItems: 'center' }}
      onMouseDown={startDrag}
    >
      {dom}
      <span>{text}</span>
    </div>
  );
};
