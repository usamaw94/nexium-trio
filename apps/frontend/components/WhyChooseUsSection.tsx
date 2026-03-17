"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionGrid from "@/components/SectionGrid";

interface Feature {
  number: string;
  title: string;
  description: string;
  isDark?: boolean;
}

interface WhyChooseUsSectionProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    number: "01",
    title: "Tailored Solutions",
    description: "We don't start with templates. We start with your vision, tailoring the solution to your business needs.",
    isDark: true,
  },
  {
    number: "02",
    title: "Always Full-Stack",
    description: "From intuitive front-end interfaces to robust server-side logic, we manage the entire development lifecycle.",
    isDark: true,
  },
  {
    number: "03",
    title: "Scalable and Secure",
    description: "We build robust systems that can scale with your business and adapt as you grow.",
    isDark: true,
  },
  {
    number: "04",
    title: "Fast Delivery",
    description: "We work in agile sprints to deliver working software faster while keeping you involved every step of the way.",
    isDark: true,
  },
  {
    number: "05",
    title: "Like Having An Extra Team Member",
    description: "You'll work directly with the trio behind the name. No account managers or middlemen - just clear, honest communication.",
    isDark: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function WhyChooseUsSection({
  features = defaultFeatures,
}: WhyChooseUsSectionProps) {
  return (
    <section className="w-full py-16 lg:py-24 px-4 lg:px-20 bg-[#1f1f1f] relative overflow-hidden">
      <SectionGrid />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-[38px] lg:text-[78px] leading-tight lg:leading-[80px] tracking-[0.5px] text-white mb-12 lg:mb-16 font-montserrat font-normal uppercase"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Why clients<br />choose us
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                x: 8,
                borderLeftColor: "#267275",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className={`p-8 lg:p-10 border-l-2 border-transparent cursor-default ${
                feature.isDark ? "bg-transparent" : "bg-[#267275]"
              } ${index === features.length - 1 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-start gap-4">
                <motion.span
                  className="font-montserrat"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "#267275", fontSize: "18px", fontWeight: 800 }}
                >
                  {feature.number}
                </motion.span>
                <div className="flex-1">
                  <h3
                    className={`font-bold uppercase mb-4 font-montserrat ${feature.isDark ? "text-white" : "text-white"}`}
                    style={{ fontSize: "21px", letterSpacing: "-0.36px" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.80)",
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "19px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "30px",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute pointer-events-none z-0 hidden lg:block" style={{ bottom: "-70px", right: "-70px", opacity: 0.4 }}>
        <Image
          src="/images/about-us/rectangle-702.png"
          alt=""
          width={400}
          height={400}
          className="object-contain"
          style={{ display: "block" }}
        />
      </div>
    </section>
  );
}
