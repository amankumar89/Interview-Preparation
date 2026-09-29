import { useEffect, useRef } from "react";

export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  isDestructive = false,
  onCancel,
  onConfirm,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      className="confirm-dialog"
      ref={dialogRef}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
    >
      <p className="confirm-dialog-eyebrow">Confirm action</p>
      <h2 id="confirm-dialog-title">{title}</h2>
      <p id="confirm-dialog-description">{description}</p>
      <div className="confirm-dialog-actions">
        <button className="confirm-cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className={`confirm-accept ${isDestructive ? "destructive" : ""}`}
          type="button"
          onClick={onConfirm}
          autoFocus
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
