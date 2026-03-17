"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatWeBuildSection from "@/components/WhatWeBuildSection";
import TeamCTASection from "@/components/TeamCTASection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";
import { serviceService } from "@/lib/services/serviceService";
import { Service } from "@/types/admin";

export default function OurServices() {
  const [services, setServices] = useState<{ title: string; description: string; items: string[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAll();

        const transformedServices = response.data?.map((service: Service) => ({
          title: service.title,
          description: service.description,
          items: service.items?.map(item => item.item_text) || []
        })) || [];

        setServices(transformedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);
  if (isLoading) {
    return (
      <div className="bg-white w-full overflow-x-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#267275] mx-auto"></div>
          <p className="mt-4 text-[#727272]">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full overflow-x-hidden">
      <Header transparent />

      <HeroSection
        heading="Elevating Ideas into Premium Solutions"
        description="Every business is unique, and off-the shelf solutions rarely deliver. That's why we offer custom-built solutions, using trusted technology like Shopify, WordPress, Laravel and React. Whether you need a marketing site, an eCommerce store, or a full-stack web app, we can help you bring it to life."
        buttonText="GET A QUOTE"
        buttonLink="/contact-us"
      />

      {services.length > 0 ? (
        <WhatWeBuildSection services={services} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-[#727272]">No services available at the moment.</p>
        </div>
      )}

      <TeamCTASection
        topText="Don't know where to start?"
        heading="Get in touch & we will talk through your requirements"
        buttonText="Get a Quote"
        buttonLink="/contact-us"
      />

      <ContactFormSection />

      <Footer />
    </div>
  );
}
