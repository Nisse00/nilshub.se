import { Link } from "react-router-dom";
import nilshubPicture from "../assets/nilshub.png";
import { POSTS, formatDate } from "../blog/posts";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import { LINKS, PROFILE } from "../data/profile";
import { PROJECTS } from "../data/projects";

export default function HomePage() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">{PROFILE.title}</p>
          <h1>Hi, I'm {PROFILE.name}.</h1>
          <p className="hero-intro">{PROFILE.intro}</p>
          <div className="hero-links">
            {LINKS.map((link) => (
              <a key={link.label} className="button" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <img className="hero-image" src={nilshubPicture} alt="The nilshub.se logo" />
      </section>

      <Reveal as="section" className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {PROJECTS.map((project, index) => (
            <Reveal as="article" key={project.name} className="project-card" delay={index * 80}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul className="tags">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              {project.href && (
                <a className="project-link" href={project.href}>
                  View the code →
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="latest-posts">
        <div className="section-heading">
          <h2>Latest posts</h2>
          <Link to="/blog">All posts →</Link>
        </div>
        <ol className="post-list">
          {POSTS.slice(0, 2).map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="post-card">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
              </Link>
            </li>
          ))}
        </ol>
      </Reveal>
    </Layout>
  );
}
