import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  readonly children: ReactNode;
  readonly as?: "div" | "section" | "article" | "li";
  readonly className?: string;
  /** Delay in milliseconds, to stagger items in a list */
  readonly delay?: number;
}

/** Fades its content in the first time it scrolls into view. */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Content that is already on screen when the page opens is shown straight away
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
