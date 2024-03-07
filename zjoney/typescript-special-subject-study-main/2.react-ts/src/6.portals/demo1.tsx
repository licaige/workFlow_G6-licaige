import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const Modal: React.FC<{}> = ({ children }) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const current = el.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

function App() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <div id="modal-root"></div>
      {showModal && (
        <Modal>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              height: '100vh',
              width: '100vh',
              background: 'rgba(0,0,0,0.1)',
              zIndex: 99,
            }}
          >
            I'm a modal!{' '}
            <button
              style={{ background: 'papyawhip' }}
              onClick={() => setShowModal(false)}
            >
              close
            </button>
          </div>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
    </div>
  );
}
