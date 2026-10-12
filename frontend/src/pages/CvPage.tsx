// Served from the public folder
const CV_URL = "/CV.pdf";

export default function CvPage() {
  return (
    <object className="cv-document" data={CV_URL} type="application/pdf">
      <p>
        It appears your browser doesn't support embedded PDFs. You can{" "}
        <a href={CV_URL} target="_blank" rel="noopener noreferrer">
          download the CV
        </a>{" "}
        instead.
      </p>
    </object>
  );
}
