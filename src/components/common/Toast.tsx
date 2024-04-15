import React from 'react';
import {useEffect} from 'react';

interface Props {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast = ({message, show, onClose}: Props) => {
  useEffect(() => {
    if (show) {
      const toastElement = document.getElementById('toast');
      const toast = new window.bootstrap.Toast(toastElement);
      toast.show();
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="toast"
        className="toast text-bg-success"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
