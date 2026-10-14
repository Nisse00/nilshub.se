import nilshubPicture from "../assets/nilshub.png";
import Layout from "../components/Layout";
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

      <section className="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <article key={project.name} className="project-card">
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
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
