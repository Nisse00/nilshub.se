import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface SavingBookingPopoutProps {
  show: boolean;
  handleCloseSave: () => void;
  handleSave: () => void;
  text: string;
}

function SavingBookingPopout({ show, handleCloseSave, handleSave, text }: Readonly<SavingBookingPopoutProps>) {
  return (
    <Modal show={show} onHide={handleCloseSave}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSave}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
            Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SavingBookingPopout;
