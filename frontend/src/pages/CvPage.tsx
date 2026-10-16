import Layout from "../components/Layout";
import { CV_PROFILE, CvEntry, EDUCATION, SKILLS, WORK } from "../data/cv";
import { PROFILE } from "../data/profile";

// Served from the public folder
const CV_PDF_URL = "/CV.pdf";

function Timeline({ entries }: { readonly entries: CvEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li key={`${entry.period}-${entry.title}`}>
          <span className="timeline-period">{entry.period}</span>
          <div>
            <h3>
              {entry.title} <span className="timeline-place">· {entry.place}</span>
            </h3>
            {entry.description && <p>{entry.description}</p>}
            {entry.tech && (
              <ul className="tags timeline-tags">
                {entry.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function CvPage() {
  return (
    <Layout>
      <article className="cv">
        <header className="cv-header">
          <div>
            <p className="eyebrow">Curriculum vitae</p>
            <h1>{PROFILE.name}</h1>
          </div>
          <a className="button" href={CV_PDF_URL} download>
            Download PDF
          </a>
        </header>

        <section>
          <h2>Profile</h2>
          {CV_PROFILE.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section>
          <h2>Technical skills</h2>
          <dl className="skills">
            {SKILLS.map(({ area, items }) => (
              <div key={area}>
                <dt>{area}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Work experience</h2>
          <Timeline entries={WORK} />
        </section>

        <section>
          <h2>Education</h2>
          <Timeline entries={EDUCATION} />
        </section>
      </article>
    </Layout>
  );
}
