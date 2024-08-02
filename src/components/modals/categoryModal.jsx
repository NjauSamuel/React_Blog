import React, { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef();

  useEffect(() => {
    // Close modal if clicked outside of it
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h2 className='font-bold text-2xl mt-3 mb-1'>Confirm Deletion</h2>
        <p className='mb-2'>Are you sure you want to delete this category?</p>
        <button onClick={onConfirm} className="confirm-button font-bold">Yes, Delete</button>
        <button onClick={onClose} className="cancel-button font-bold">Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
