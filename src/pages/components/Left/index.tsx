import React, { useState } from 'react';
import { Input, Collapse } from 'antd';
import EditCom from './EditCom';
import styles from './index.less';

const { Search } = Input;
const { Panel } = Collapse;

type Props = {
  searchValue: string | undefined;
  setSearchValue: (val: string) => void;
  dnd: any;
  graph: any;
};

export const stencilList = [
  { label: '数据集成转换', value: 'change' },
  { label: '数据集成作业', value: 'homework' },
];

export default (props: Props) => {
  const { searchValue, setSearchValue, dnd, graph } = props;

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.leftWarp}>
      <div>
        <Search onSearch={onSearch} value={searchValue} />
      </div>
      <Collapse defaultActiveKey={['all']}>
        <Panel header="节点组件" key="all">
          {stencilList.map((it) => {
            return (
              <EditCom
                type={it.value}
                text={it.label}
                dnd={dnd}
                graph={graph}
              />
            );
          })}
        </Panel>
      </Collapse>
    </div>
  );
};
