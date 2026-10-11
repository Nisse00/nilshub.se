import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

interface LaundryMenuProps {
  readonly username: string | null;
  readonly onLogOut: () => void;
}

/** Menu button that opens a panel on the left with account actions and navigation. */
export default function LaundryMenu({ username, onLogOut }: LaundryMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setOpen(true)} aria-expanded={open}>
        ☰ Menu
      </Button>
      <Offcanvas show={open} onHide={close} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {username ? `Logged in as ${username}` : "Not logged in"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="laundry-menu-items">
            {username ? (
              <Button
                variant="primary"
                onClick={() => {
                  close();
                  onLogOut();
                }}
              >
                Log out
              </Button>
            ) : (
              <>
                <Link className="btn btn-primary" to="/Laundry/login">
                  Log in
                </Link>
                <Link className="btn btn-outline-primary" to="/Laundry/login/createAccount">
                  Create account
                </Link>
              </>
            )}
          </div>
          <hr className="laundry-menu-divider" />
          <nav className="laundry-menu-items">
            <Link className="btn btn-outline-secondary" to="/Laundry">
              Laundry start page
            </Link>
            <Link className="btn btn-outline-secondary" to="/">
              nilshub.se
            </Link>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
