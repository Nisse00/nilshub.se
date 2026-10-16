import { formatDate } from "../blog/posts";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import { NOW, NOW_UPDATED } from "../data/now";

export default function NowPage() {
  return (
    <Layout>
      <div className="narrow">
        <p className="eyebrow">Now</p>
        <h1>What I'm doing now</h1>
        <p className="page-intro">
          Updated {formatDate(NOW_UPDATED)}. Inspired by{" "}
          <a href="https://nownownow.com/about">nownownow.com</a>.
        </p>
        <div className="now-list">
          {NOW.map((item, index) => (
            <Reveal as="section" key={item.heading} className="now-item" delay={index * 80}>
              <h2>{item.heading}</h2>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Layout>
  );
}
