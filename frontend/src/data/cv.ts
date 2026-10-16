// The CV shown on /cv. Keep in sync with public/CV.pdf.

export interface CvEntry {
  period: string;
  title: string;
  place: string;
  description?: string;
  tech?: string[];
}

export const CV_PROFILE = [
  "I am a software developer based in Lund with a strong passion for technology, " +
    "problem-solving and continuous learning. As an energetic, positive and highly social " +
    "person, I enjoy collaborating with others, building strong relationships and working " +
    "toward shared goals. I thrive in team environments where I can combine technical " +
    "expertise with strong communication skills and a genuine interest in people.",
  "Throughout my career I have worked across the full software development lifecycle, from " +
    "requirements gathering and solution design to implementation, testing, deployment and " +
    "maintenance, primarily within agile Scrum teams. I have experience collaborating closely " +
    "with clients and stakeholders through planning sessions, task estimation and customer " +
    "meetings, balancing technical requirements with business needs. My technical experience " +
    "spans backend, frontend, cloud and DevOps technologies, and I am highly motivated by " +
    "solving complex challenges, delivering high-quality solutions and continuously learning " +
    "new technologies.",
  "Outside of work I am training for an Ironman while working on personal coding projects and " +
    "exploring new technologies within software development. I was born and raised in Lund, " +
    "but spent four years of my childhood in California, USA, making me essentially bilingual " +
    "in Swedish and English.",
];

export const SKILLS = [
  { area: "Languages", items: "C#, Python, Java, Scala, TypeScript, JavaScript, C, SQL" },
  { area: "Frameworks", items: ".NET, Angular, REST APIs" },
  { area: "Cloud & DevOps", items: "Azure, Docker, Kubernetes, CI/CD" },
  { area: "Messaging", items: "Kafka, RabbitMQ" },
  { area: "Tools", items: "Git, SonarQube, Jenkins, TeamCity, Gerrit" },
  {
    area: "Methods",
    items: "Agile, Scrum, requirements analysis, task estimation, stakeholder collaboration",
  },
];

export const WORK: CvEntry[] = [
  {
    period: "Jun 2025 – present",
    title: "Consultant",
    place: "Netcompany, Copenhagen",
    description:
      "Working as a full-stack developer in a Scrum team on a project for the Danish " +
      "Government. Responsible for delivering features end-to-end, from requirements analysis " +
      "and solution design to implementation, testing, deployment and maintenance. Regularly " +
      "collaborate with clients and stakeholders through planning sessions, estimations, " +
      "workshops and customer meetings.",
    tech: [
      "C#",
      ".NET",
      "Angular",
      "Python",
      "Azure",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "SonarQube",
    ],
  },
  {
    period: "Jan 2025 – Jun 2025",
    title: "Master's Thesis",
    place: "Sinch, Malmö",
    description:
      "Researched queuing systems for large-scale real-time communication platforms, " +
      "evaluating the performance, scalability and operational characteristics of " +
      "technologies such as Kafka and RabbitMQ: how different messaging architectures affect " +
      "throughput, latency, reliability and operational complexity in distributed systems.",
    tech: ["Java", "Scala", "Kafka", "RabbitMQ"],
  },
  {
    period: "Summers 2023 and 2024",
    title: "Summer Internships",
    place: "Ericsson, Lund",
    description:
      "Two summer internships focusing on software quality, internal tooling and codebase " +
      "improvements, in an agile Scrum environment with sprint planning, estimations and " +
      "cross-team collaboration.",
    tech: ["Python", "C", "Gerrit", "Jenkins"],
  },
  {
    period: "Sep 2023 – May 2024",
    title: "Junior Software Developer",
    place: "Axis Communications, Lund",
    description:
      "Worked with test automation and development of internal testing frameworks in an agile " +
      "Scrum team. Took part in sprint planning, task estimation and cross-team collaboration " +
      "while contributing to improvements in software quality and development processes.",
  },
  {
    period: "Jun 2022 – Aug 2022",
    title: "Summer Internship",
    place: "Softhouse Sydväst AB, Malmö",
    description:
      "Developed a backend tool that scraped and analyzed tweets from Swedish party leaders, " +
      "categorizing them by topic, sentiment and target audience, and displaying key metadata " +
      "in a user interface.",
    tech: ["Python"],
  },
  {
    period: "Jan 2022 – Dec 2022",
    title: "Vice Industry Liaison",
    place: "D-sektionen, LTH, Lund",
    description:
      "Acted as the link between students and industry at LTH, mainly raising funds for the " +
      "guild by organizing company events and securing sponsors for our activities.",
  },
  {
    period: "Aug 2018 – Aug 2020",
    title: "Alumni Board",
    place: "Ung Företagsamhet, Malmö",
    description:
      "Board member of Ung Företagsamhet Skåne, recruiting young entrepreneurs to the network " +
      "and organizing events for alumni through marketing, event planning and recruitment.",
  },
];

export const EDUCATION: CvEntry[] = [
  {
    period: "Aug 2020 – Jun 2025",
    title: "Computer Science",
    place: "LTH – Lund Faculty of Engineering",
  },
  { period: "Aug 2016 – Jun 2019", title: "Economics Programme", place: "Katedralskolan, Lund" },
];
