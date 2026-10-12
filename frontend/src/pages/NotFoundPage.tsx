import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="laundry-welcome">
      <h1>Page not found</h1>
      <Link to="/">Back to nilshub.se</Link>
    </div>
  );
}
