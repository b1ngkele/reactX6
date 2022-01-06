import React from 'react';
import { Modal, Form, Input } from 'antd';

type Props = {
  visible: boolean;
  onCancel: () => void;
};

export default (props: Props) => {
  const { visible, onCancel } = props;
  const [form] = Form.useForm();
  const onOk = () => {
    const { validateFields } = form;
    validateFields().then((val) => {
      if (val) {
        console.log('val', val);
        onCancel();
      }
    });
  };
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk}>
      <Form form={form}>
        <Form.Item label="节点名称" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
