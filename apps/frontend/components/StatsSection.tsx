"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  number: string;
  description: string;
  backgroundColor?: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    number: "40+",
    description: "Successful Projects Launched",
    backgroundColor: "#f2f2f2",
  },
  {
    number: "8+",
    description: "Years of Experience",
    backgroundColor: "#eee",
  },
  {
    number: "10/10",
    description: "Client Recommendation",
    backgroundColor: "#f2f2f2",
  },
];

function parseNumber(str: string): { value: number; suffix: string } {
  const match = str.match(/^(\d+)(.*)$/);
  if (match) return { value: parseInt(match[1]), suffix: match[2] };
  return { value: 0, suffix: str };
}

function CounterNumber({ number, started }: { number: string; started: boolean }) {
  const { value, suffix } = parseNumber(number);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    setCount(0);
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setCount(current);
      if (current >= value) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, value]);

  return <>{count}{suffix}</>;
}

export default function StatsSection({ stats = defaultStats }: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full pb-16 lg:pb-20 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center min-h-[140px] lg:h-[182px] px-8 py-6 lg:py-0"
              style={{ backgroundColor: stat.backgroundColor }}
            >
              <h3
                className="text-[40px] lg:text-[60px] text-[#353638] font-bold font-montserrat mb-2 lg:mb-3"
                style={{ letterSpacing: "-1.8px", lineHeight: "1" }}
              >
                <CounterNumber number={stat.number} started={started} />
              </h3>
              <p
                className="text-[#353638] font-montserrat max-w-[321px]"
                style={{ fontSize: "20px", letterSpacing: "-0.32px", lineHeight: "1.6" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
