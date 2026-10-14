import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="not-found">
        <h1>Page not found</h1>
        <p>
          <Link to="/">Back to the start page</Link>
        </p>
      </section>
    </Layout>
  );
}
