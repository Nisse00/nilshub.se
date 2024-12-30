import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface BookingPopoutProps {
  show: boolean;
  handleCloseSave: () => void;
  handleCloseCancel: () => void;
  handleSave: () => void;
  text: string;
  option: string;
}

function BookingPopout({ show, handleCloseSave, handleCloseCancel, handleSave, text, option }: Readonly<BookingPopoutProps>) {
  return (
    <Modal show={show} onHide={handleCloseSave}>
      <Modal.Header closeButton>
        {option === "Book" ? (
          <Modal.Title>Booking Confirmation</Modal.Title>
        ) : (
          <Modal.Title>Cancellation Booking Confirmation</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={option === "Book" ? handleCloseSave : handleCloseCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {option === "Book" ? "Confirm Booking" : "Confirm Cancellation of Booking"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingPopout;
