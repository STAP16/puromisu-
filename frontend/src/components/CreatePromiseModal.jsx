import "./CosmicModal.css";
import { useEffect, useRef } from "react";

export default function CosmicModal({
  open,
  onClose,
  onSave,
  value,
  setModalValue,
}) {
  if (!open) return null;

  const modalInput = useRef();
  useEffect(() => {
    if (modalInput.current) {
      modalInput.current.focus();
    }
  }, []);

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="title">New Promise</h2>

        <input
          value={value}
          onChange={(e) => setModalValue(e.target.value)}
          ref={modalInput}
          className="cosmicInput"
          placeholder="Enter something..."
        />

        <div className="actions">
          <button className="btn ghost" onClick={onClose}>
            Close
          </button>
          <button className="btn primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
