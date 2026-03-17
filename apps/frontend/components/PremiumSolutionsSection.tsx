"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionGrid from "@/components/SectionGrid";

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface PremiumSolutionsSectionProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "SHOPIFY ECOMMERCE",
    description: "Custom online stores built for conversion.",
    icon: "/images/landing/bxl-shopify 1.svg",
  },
  {
    title: "WORDPRESS DEVELOPMENT",
    description: "Content management systems with fully customised themes and integrations.",
    icon: "/images/landing/logo-wordpress 1.svg",
  },
  {
    title: "LARAVEL WEB APPLICATIONS",
    description: "Secure backend solutions designed for your business logic and workflows",
    icon: "/images/landing/Laravel.svg",
  },
  {
    title: "REACT.JS FRONTENDS",
    description: "Dynamic user experiences built with the most trusted JavaScript framework.",
    icon: "/images/landing/React.svg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function PremiumSolutionsSection({
  services = defaultServices,
}: PremiumSolutionsSectionProps) {
  return (
    <section className="w-full py-16 lg:py-24 px-4 lg:px-20 relative" style={{ backgroundColor: "#eee" }}>
      <SectionGrid />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 lg:mb-20">
          <p className="text-[22px] leading-tight lg:leading-[67px] text-[#353638] font-montserrat font-semibold mb-2">
            Elevating Ideas into
          </p>
          <h2 className="text-[38px] lg:text-[78px] leading-tight lg:leading-[80px] tracking-[0.64px] text-[#353638] font-montserrat font-light uppercase mb-8">
            PREMIUM<br />SOLUTIONS
          </h2>
          <p
            className="text-[#727272] max-w-[718px] mx-auto pt-6 lg:pt-12 font-montserrat"
            style={{ fontSize: "17px", lineHeight: "30px" }}
          >
            We deliver premium websites and digital systems using trusted technology like Shopify, WordPress, Laravel, and React.js. From front-end design to backend architecture, we develop solutions that align with your goals and scale with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-12 lg:gap-y-26 max-w-[718px] mx-auto py-12 pl-12 lg:pl-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative cursor-default"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={service.icon}
                  alt=""
                  width={130}
                  height={130}
                  className="absolute top-[-30px] left-[-40px]"
                />
              </motion.div>

              <h3
                className="text-[#353638] font-montserrat font-bold uppercase relative z-10"
                style={{ fontSize: "21px", lineHeight: "36px", letterSpacing: "-0.36px" }}
              >
                {service.title}
              </h3>

              <p
                className="text-[#727272] max-w-[320px] relative z-10 font-montserrat"
                style={{ fontSize: "19px", lineHeight: "30px" }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
