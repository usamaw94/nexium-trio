"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionGrid from "@/components/SectionGrid";

interface Project {
  title: string;
  category: string;
  image: string;
  bgColor: string;
  link?: string;
}

interface ProjectShowcaseSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Shopify Development",
    image: "/images/projects/project-1.jpg",
    bgColor: "#8B1538",
  },
  {
    title: "Brand Identity",
    category: "Design & Development",
    image: "/images/projects/project-2.jpg",
    bgColor: "#4A5FC1",
  },
  {
    title: "Agency Website",
    category: "WordPress Development",
    image: "/images/projects/project-3.jpg",
    bgColor: "#B88B9D",
  },
  {
    title: "Interior Design",
    category: "Custom Web App",
    image: "/images/projects/project-4.jpg",
    bgColor: "#1A4D3E",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function ProjectShowcaseSection({
  projects = defaultProjects,
}: ProjectShowcaseSectionProps) {
  return (
    <section className="w-full py-16 lg:py-24 px-4 lg:px-20 bg-white relative">
      <SectionGrid />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-[28px] lg:text-[48px] leading-tight lg:leading-[60px] tracking-[0.5px] text-[#252525] font-light text-center mb-12 lg:mb-16 uppercase font-montserrat"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          SEE WHAT WE HAVE BUILT
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const rowIndex = Math.floor(index / 2);
            const isFirstInRow = index % 2 === 0;
            const isEvenRow = rowIndex % 2 === 0;
            const colSpan = isEvenRow
              ? isFirstInRow ? "md:col-span-8" : "md:col-span-4"
              : isFirstInRow ? "md:col-span-4" : "md:col-span-8";

            return (
              <motion.div
                key={index}
                className={`relative group overflow-hidden cursor-pointer min-h-[300px] lg:min-h-[400px] ${colSpan}`}
                style={{ backgroundColor: project.bgColor }}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="relative w-full h-full p-8 lg:p-12 flex flex-col justify-between">
                  <motion.div
                    className="relative w-full h-[200px] lg:h-[280px] mb-6"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  <div className="mt-auto">
                    <p
                      className="text-white uppercase mb-1 font-montserrat"
                      style={{ fontSize: "12px", letterSpacing: "1.5px", fontWeight: 600 }}
                    >
                      {project.category}
                    </p>
                    <h3
                      className="text-white font-montserrat"
                      style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.4px" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
