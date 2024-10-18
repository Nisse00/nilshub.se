import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface CancellingBookingPopoutProps {
  readonly show: boolean;
  readonly handleCloseCancel: () => void;
  readonly handleSave: () => void;
  readonly text: string;
}

function CancellingBookingPopout({ show, handleCloseCancel, handleSave, text }: Readonly<CancellingBookingPopoutProps>) {
  return (
    <Modal show={show} onHide={handleCloseCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Cancelling Booking Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
            Confirm Cancellation of Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancellingBookingPopout;
