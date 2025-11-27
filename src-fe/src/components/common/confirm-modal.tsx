import { Modal, Button } from "react-bootstrap"

type Props = {
  show: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  variant?: "danger" | "primary" | "warning"
  onConfirm: () => void
  onCancel: () => void
};

export function ConfirmModal({ show, title, message, confirmText, cancelText, variant, onCancel, onConfirm }: Props) {
    if (!variant) variant = "danger";
  
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{message}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
                <Button variant={variant} onClick={onConfirm}>{confirmText}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal