"use client";

import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import { motion } from "framer-motion";
import SectionGrid from "@/components/SectionGrid";

export default function OutgrownSection() {
  return (
    <section className="w-full py-16 lg:py-24 px-4 lg:px-20 bg-white relative overflow-hidden">
      <SectionGrid />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-center lg:gap-22 relative">
          <h2
            className="text-[30px] lg:text-[48px] leading-tight lg:leading-[67px] tracking-[0.5px] text-[#353638] font-montserrat font-light uppercase mb-6 lg:mb-0 lg:flex-shrink-0"
          >
            You&apos;ve outgrown<br />off-the-shelf
          </h2>
          <div className="relative">
            <p
              className="text-[#727272] font-montserrat max-w-[718px]"
              style={{
                fontSize: "17px",
                lineHeight: "30px",
              }}
            >
              We work with businesses that are scaling fast, evolving their digital presence, or rethinking their current offer. Whether you're replacing your existing workflows or building something from scratch, we designand develop custom platforms that support your goals.
            </p>
            <motion.div
              className="hidden lg:block absolute -top-15 -right-16 opacity-80"
              initial={{ rotate: 55 }}
              animate={{ rotate: 55 + 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src="/images/landing/Polygon 1.svg"
                alt=""
                width={120}
                height={120}
              />
            </motion.div>
          </div>
        </div>

        <StatsSection />
      </div>
    </section>
  );
}
