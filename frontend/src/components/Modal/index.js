import { useEffect } from "react";
import "./styles.css";

function Modal({ children, isOpen, handleClose }) {
    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
          document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
      }, [handleClose]);

    if (!isOpen) return null;

    return (
        <div className="modal">
        
        <div className="modal-content">
          <>
            <button onClick={handleClose} className="close-btn">
                X
            </button>
            {children}
          </>
        </div>
        </div>
    );
}
export default Modal;