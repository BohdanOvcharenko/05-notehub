import css from './Modal.module.css'

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}


function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
  const handleEscape = (
    event: KeyboardEvent
  ) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  document.body.style.overflow = 'hidden';

  window.addEventListener(
    'keydown',
    handleEscape
  );

  return () => {
    document.body.style.overflow = '';

    window.removeEventListener(
      'keydown',
      handleEscape
    );
  };
}, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal