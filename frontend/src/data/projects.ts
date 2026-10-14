export interface Project {
  name: string;
  description: string;
  tech: string[];
  /** Link to the code, if it is public */
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    name: "LaundryBooking",
    description:
      "Booking system for the laundry room in my housing association. Neighbours book " +
      "time slots in a calendar, and the backend makes double bookings impossible.",
    tech: ["React", "TypeScript", "Flask", "SQLite"],
    href: "https://github.com/Nisse00/LaundryBooking",
  },
  {
    name: "Walkaround",
    description:
      "A small first-person 3D world to wander through, drawn with ray casting " +
      "from scratch: walls, fog, a sky gradient and a toggleable map.",
    tech: ["Python", "Tkinter"],
  },
  {
    name: "Snake",
    description:
      "The classic game, with queued turns so quick key presses are never lost and " +
      "a speed that increases as the snake grows.",
    tech: ["Python", "Tkinter"],
  },
];
