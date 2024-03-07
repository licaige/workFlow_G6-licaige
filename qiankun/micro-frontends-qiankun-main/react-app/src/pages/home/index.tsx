import { useState } from 'react';
import { Button, Modal } from 'antd';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Home;