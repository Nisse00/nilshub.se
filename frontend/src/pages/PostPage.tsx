import { Link, useParams } from "react-router-dom";
import { POSTS, formatDate } from "../blog/posts";
import Layout from "../components/Layout";
import NotFoundPage from "./NotFoundPage";

export default function PostPage() {
  const { slug } = useParams();
  const post = POSTS.find((candidate) => candidate.slug === slug);
  if (!post) return <NotFoundPage />;

  return (
    <Layout>
      <article className="narrow">
        <Link to="/blog" className="back-link">
          ← All posts
        </Link>
        <header className="post-header">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <h1>{post.title}</h1>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
}
