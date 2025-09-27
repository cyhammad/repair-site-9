"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { siteConfig, services, companies } from "@/config/siteConfig";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import Image from "next/image";

interface ServicesSectionProps {
  currentCompany?: string;
}

type Theme = {
  accent: string;        // main brand color
  accentSoft: string;    // subtle bg/border tint
  border: string;        // border color
};

const THEMES: Record<string, Theme> = {
  // lg:      { accent: "#A50034", accentSoft: "rgba(165,0,52,0.10)", border: "rgba(165,0,52,0.25)" },
  // bosch:   { accent: "#F80000", accentSoft: "rgba(248,0,0,0.10)",  border: "rgba(248,0,0,0.25)" },
  // siemens: { accent: "#019997", accentSoft: "rgba(1,153,151,0.10)", border: "rgba(1,153,151,0.25)" },
  // samsung: { accent: "#000000", accentSoft: "rgba(0,0,0,0.06)",     border: "rgba(0,0,0,0.20)" },
};

export function ServicesSection({ currentCompany }: ServicesSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  const theme: Theme = useMemo(() => {
    if (currentCompany && THEMES[currentCompany]) return THEMES[currentCompany];
    return { accent: "var(--primary)", accentSoft: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)" };
  }, [currentCompany]);

  const availableServices = currentCompany
    ? services.filter((service) => service.availableFor.includes(currentCompany))
    : services;

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(availableServices.length / itemsPerSlide);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const currentServices = availableServices.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  const handleServiceWhatsApp = (serviceName: string) => {
    openWhatsApp(`Hey! I want ${serviceName}. Please contact me for service.`);
  };

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % totalSlides), 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {/* {currentCompanyData?.name || "Professional"} Repair Services */}
            Professional Repair Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {/* {currentCompanyData
              ? `Comprehensive ${currentCompanyData.name} appliance repair services in ${siteConfig.locations} with certified technicians and genuine parts.`
              : `Expert repair services for all major home appliances in ${siteConfig.locations}. Professional technicians, genuine parts, and warranty included.`} */}
              Expert repair services for all major home appliances in {siteConfig.locations}. Professional technicians, genuine parts.
          </p>

          {/* Quick Contact Buttons (brand-aligned like hero, adapted for light bg) */}
          <div className="flex justify-center gap-3">
            {/* Call: solid brand, white text */}
            <button
              onClick={() => makePhoneCall()}
              className="px-6 py-3 rounded-md font-semibold text-white transition-shadow shadow-sm"
              style={{ backgroundColor: theme.accent }}
            >
              Call Us
            </button>

            {/* WhatsApp: transparent with brand border/text (hero uses white; here we adapt for visibility) */}
            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3 rounded-md font-semibold transition-colors"
              style={{
                color: theme.accent,
                border: `1px solid ${theme.border}`,
                backgroundColor: "transparent",
              }}
            >
              WhatsApp Us
            </button>
          </div>
        </motion.div>

        {/* Services Slider */}
        <div className="relative hidden sm:block">
          {/* Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={prevSlide}
              disabled={totalSlides <= 1}
              className="px-3 py-2 rounded-md transition-colors"
              style={{
                border: `1px solid ${theme.border}`,
                backgroundColor: "transparent",
                color: "#111827",
                opacity: totalSlides <= 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: index === currentSlide ? 32 : 8,
                    backgroundColor: index === currentSlide ? theme.accent : theme.accentSoft,
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={totalSlides <= 1}
              className="px-3 py-2 rounded-md transition-colors"
              style={{
                border: `1px solid ${theme.border}`,
                backgroundColor: "transparent",
                color: "#111827",
                opacity: totalSlides <= 1 ? 0.5 : 1,
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Services Grid */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {currentServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full"
                  style={{ borderColor: theme.border, borderWidth: 1 }}
                >
                  <CardHeader className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.25 }}
                      className="relative overflow-hidden rounded-t-lg"
                    >
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={300}
                      />
                      <div
                        className="absolute top-4 left-4 text-3xl w-12 h-12 rounded-full flex items-center justify-center bg-white"
                        style={{ boxShadow: `0 4px 18px -6px ${theme.border}`, color: theme.accent }}
                      >
                        {service.icon}
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="p-6 flex flex-col h-full">
                    <CardTitle className="mb-3 text-xl">{service.name}</CardTitle>
                    <CardDescription className="mb-4 flex-grow">{service.description}</CardDescription>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm">Common Issues We Fix:</h4>
                      <ul className="space-y-2">
                        {service.commonIssues.slice(0, 3).map((issue, issueIndex) => (
                          <motion.li
                            key={issueIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + issueIndex * 0.1 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: theme.accent }} />
                            <span>{issue}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 mt-auto">
                      {/* Call: solid brand */}
                      <button
                        className="w-full py-2.5 rounded-md font-semibold text-white"
                        style={{ backgroundColor: theme.accent }}
                        onClick={() => makePhoneCall()}
                      >
                        Call Now
                      </button>
                      {/* WhatsApp: transparent with brand border/text */}
                      <button
                        className="w-full py-2.5 rounded-md font-semibold"
                        style={{ color: theme.accent, border: `1px solid ${theme.border}`, backgroundColor: "transparent" }}
                        onClick={() => handleServiceWhatsApp(service.name)}
                      >
                        WhatsApp
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* All Services Grid (mobile) */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {availableServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow" style={{ borderColor: theme.border, borderWidth: 1 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <CardHeader className="p-0">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 sm:h-full object-cover rounded-l-lg"
                        width={400}
                        height={300}
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="mb-2 flex items-center gap-2">
                        <span className="text-2xl" style={{ color: theme.accent }}>
                          {service.icon}
                        </span>
                        {service.name}
                      </CardTitle>
                      <CardDescription className="mb-4">{service.description}</CardDescription>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Common Issues:</h4>
                        <ul className="space-y-1">
                          {service.commonIssues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: theme.accent }} />
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <button
                          className="w-full py-2.5 rounded-md font-semibold text-white"
                          style={{ backgroundColor: theme.accent }}
                          onClick={() => makePhoneCall()}
                        >
                          Call Now
                        </button>
                        <button
                          className="w-full py-2.5 rounded-md font-semibold"
                          style={{ color: theme.accent, border: `1px solid ${theme.border}`, backgroundColor: "transparent" }}
                          onClick={() => handleServiceWhatsApp(service.name)}
                        >
                          WhatsApp
                        </button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-lg p-8 mt-16"
          style={{ backgroundColor: theme.accentSoft, border: `1px solid ${theme.border}` }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">Our Service Process</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                step: "1",
                title: "Book Appointment",
                description: `Call us or book online to schedule your ${currentCompanyData?.name || "appliance"} repair service at your convenience.`,
              },
              {
                step: "2",
                title: "Expert Diagnosis",
                description: "Our certified technician will diagnose the issue and provide a free, detailed quote for the repair.",
              },
              {
                step: "3",
                title: "Professional Repair",
                description: `We fix your appliance using genuine ${currentCompanyData?.name || "manufacturer"} parts and provide a comprehensive warranty.`,
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: theme.accent }}
                >
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </motion.div>
                <h4 className="text-xl font-semibold mb-2">{process.title}</h4>
                <p className="text-muted-foreground">{process.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA (same style language as hero) */}
          <div className="text-center">
            <p className="text-lg mb-6">Ready to get started? Contact us now for immediate assistance!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => makePhoneCall()}
                className="px-6 py-3 rounded-md font-semibold text-white"
                style={{ backgroundColor: theme.accent }}
              >
                Call Us
              </button>
              <button
                onClick={() => openWhatsApp()}
                className="px-6 py-3 rounded-md font-semibold"
                style={{ color: "#ffffff", border: "1px solid #ffffff", backgroundColor: "transparent" }}
              >
                {/* NOTE: If you keep this on light bg, swap to brand border/text like above */}
                WhatsApp Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
