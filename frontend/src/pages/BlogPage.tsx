import { Link } from "react-router-dom";
import { POSTS, formatDate } from "../blog/posts";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";

export default function BlogPage() {
  return (
    <Layout>
      <div className="narrow">
        <p className="eyebrow">Blog</p>
        <h1>Notes and write-ups</h1>
        <p className="page-intro">Things I have built, learned or found interesting.</p>
        <ol className="post-list">
          {POSTS.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={index * 80}>
              <Link to={`/blog/${post.slug}`} className="post-card">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </Layout>
  );
}
