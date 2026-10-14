// The CV shown on /cv. Keep in sync with public/CV.pdf.

export interface CvEntry {
  period: string;
  title: string;
  place: string;
  description?: string;
}

export const CV_PROFILE = [
  "I live in Lund and study Computer Engineering at Lund University.",
  "As a person I am energetic, positive and social. I love challenges and always set goals " +
    "that I strive to achieve. In my spare time I enjoy working out, hanging out with friends " +
    "and working on coding projects. I am also active in my section of the computer " +
    "engineering programme and work at the student nations in Lund as a bartender.",
  "I was born and raised in Lund, but during four years of elementary school my family and I " +
    "lived in California, USA. Those years made me essentially bilingual.",
];

export const WORK: CvEntry[] = [
  {
    period: "Jun 2024 – Aug 2024",
    title: "Summer Internship",
    place: "Ericsson, Lund",
    description:
      "Improved code structure and code health. Also worked on graphical visualization of test data.",
  },
  {
    period: "Sep 2023 – May 2024",
    title: "Junior Software Developer",
    place: "Axis Communications, Lund",
    description:
      "Worked with test automation and framework development using Python, PowerShell and TeamCity.",
  },
  {
    period: "Jun 2023 – Aug 2023",
    title: "Summer Internship",
    place: "Ericsson, Lund",
    description:
      "Developed a tool for automating document creation to improve team communication. " +
      "Tasks included code reviewing using Python, C, Gerrit and Jenkins.",
  },
  {
    period: "Jun 2022 – Aug 2022",
    title: "Summer Internship",
    place: "Softhouse Sydväst AB, Malmö",
    description:
      "Created a backend tool to analyze political tweets. Implemented scraping and metadata analysis in Python.",
  },
  {
    period: "Jan 2022 – Dec 2022",
    title: "Vice Industry Liaison",
    place: "D-sektionen, LTH, Lund",
    description:
      "Acted as liaison between students and industry. Organized company events and secured sponsorships.",
  },
  {
    period: "Jun 2021 – Aug 2022",
    title: "Summer Job",
    place: "Akribian.com, Lund",
    description:
      "Worked on product testing, marketing and development of a math game for children.",
  },
  {
    period: "Aug 2018 – Aug 2020",
    title: "Alumni Board",
    place: "Ung Företagsamhet, Malmö",
    description: "Recruited entrepreneurs, planned events and worked on marketing and recruitment.",
  },
  {
    period: "Jun 2018 – Aug 2018",
    title: "Intern",
    place: "Gwydion.co, Ann Arbor, Michigan",
    description:
      "Worked on data management and collection and general office tasks at a tech startup.",
  },
];

export const EDUCATION: CvEntry[] = [
  {
    period: "Aug 2020 – present",
    title: "Computer Science",
    place: "LTH – Lund Faculty of Engineering",
  },
  { period: "Aug 2016 – Jun 2019", title: "Economics Programme", place: "Katedralskolan, Lund" },
];

export const LANGUAGES = [
  { language: "Swedish", level: "Native" },
  { language: "English", level: "Fluent" },
];
