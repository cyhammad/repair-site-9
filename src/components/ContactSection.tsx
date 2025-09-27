"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";
import { siteConfig, services, companies } from "@/config/siteConfig";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import Image from "next/image";

interface ContactSectionProps {
  currentCompany?: string;
}

type Theme = {
  accent: string;        // main brand color
  accentSoft: string;    // soft background tint
  border: string;        // border tint
  overlay: string;       // dark overlay gradient for the CTA panel
};

const THEMES: Record<string, Theme> = {
  // lg: {
  //   accent: "#A50034",
  //   accentSoft: "rgba(165,0,52,0.10)",
  //   border: "rgba(165,0,52,0.25)",
  //   overlay:
  //     "linear-gradient(120deg, rgba(165,0,52,0.85) 0%, rgba(50,0,16,0.85) 45%, rgba(0,0,0,0.85) 100%)",
  // },
  // bosch: {
  //   accent: "#F80000",
  //   accentSoft: "rgba(248,0,0,0.10)",
  //   border: "rgba(248,0,0,0.25)",
  //   overlay:
  //     "linear-gradient(120deg, rgba(248,0,0,0.88) 0%, rgba(112,0,0,0.86) 50%, rgba(0,0,0,0.84) 100%)",
  // },
  // siemens: {
  //   accent: "#019997",
  //   accentSoft: "rgba(1,153,151,0.10)",
  //   border: "rgba(1,153,151,0.25)",
  //   overlay:
  //     "linear-gradient(120deg, rgba(1,153,151,0.88) 0%, rgba(0,72,71,0.86) 50%, rgba(0,0,0,0.84) 100%)",
  // },
  // samsung: {
  //   accent: "#000000",
  //   accentSoft: "rgba(0,0,0,0.06)",
  //   border: "rgba(0,0,0,0.20)",
  //   overlay:
  //     "linear-gradient(120deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.84) 100%)",
  // },
};

export function ContactSection({ currentCompany }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  const availableServices = currentCompany
    ? services.filter((s) => s.availableFor.includes(currentCompany))
    : services;

  const theme = useMemo<Theme>(() => {
    if (currentCompany && THEMES[currentCompany]) return THEMES[currentCompany];
    return {
      accent: "var(--primary)",
      accentSoft: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.25)",
      overlay:
        "linear-gradient(120deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.88) 50%, rgba(0,0,0,0.85) 100%)",
    };
  }, [currentCompany]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hey! I want Home Appliance Repair Services\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${
      availableServices.find((s) => s.id === formData.service)?.name || "Not specified"
    }\nMessage: ${formData.message}`;
    openWhatsApp(whatsappMessage);
    alert("Thank you for your inquiry! We will contact you shortly.");
  };

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {/* Contact {currentCompanyData?.name || "Our"} Service Center */}
            Contact Our Appliance Repair Center
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Get in touch with our expert technicians for professional{" "}
            {currentCompanyData?.name || "appliance"} repair services in {siteConfig.locations}.
          </p>
        </motion.div>

        {/* Brand-tinted CTA panel (so hero-style buttons are readable) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 md:p-8 mb-12 text-white"
          style={{
            backgroundImage: theme.overlay,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div
                className="inline-block text-xs font-bold tracking-wider px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: theme.accentSoft, border: `1px solid ${theme.border}` }}
              >
                AUTHORISED SERVICE CENTER {currentCompanyData?.name ? `– ${currentCompanyData.name.toUpperCase()}` : ""}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                Need help right now? Our team is ready.
              </h3>
              <p className="mt-1 text-white/80">
                Same-day service • Genuine parts • Licensed technicians
              </p>
            </div>

            {/* Buttons: EXACT hero styles */}
            <div className="flex gap-3 w-full md:w-auto">
              {/* Call: solid brand color, white text */}
              <button
                onClick={() => makePhoneCall()}
                className="px-6 py-3 rounded-md font-semibold text-white w-full md:w-auto"
                style={{ backgroundColor: theme.accent }}
              >
                Call Us
              </button>

              {/* WhatsApp: transparent with WHITE border/text */}
              <button
                onClick={() => openWhatsApp()}
                className="px-6 py-3 rounded-md font-semibold w-full md:w-auto"
                style={{ color: "#ffffff", border: "1px solid #ffffff", backgroundColor: "transparent" }}
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </motion.div>

        {/* (Optional) If you add a form below, keep brand accents consistent */}
        {/* Example input focus ring and button styles */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-md border px-4 py-3"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{ borderColor: theme.border }}
            />
            <input
              className="w-full rounded-md border px-4 py-3"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              style={{ borderColor: theme.border }}
            />
            <input
              className="w-full rounded-md border px-4 py-3 md:col-span-2"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{ borderColor: theme.border }}
            />
            <input
              className="w-full rounded-md border px-4 py-3 md:col-span-2"
              placeholder="Service (e.g. Washing Machine Repair)"
              value={formData.service}
              onChange={(e) => handleChange("service", e.target.value)}
              style={{ borderColor: theme.border }}
            />
            <textarea
              className="w-full rounded-md border px-4 py-3 md:col-span-2 min-h-[120px]"
              placeholder="Message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              style={{ borderColor: theme.border }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            {/* Call: solid brand */}
            <button
              type="button"
              onClick={() => makePhoneCall()}
              className="px-6 py-3 rounded-md font-semibold text-white w-full sm:w-auto"
              style={{ backgroundColor: theme.accent }}
            >
              Call Us
            </button>

            {/* WhatsApp: transparent with WHITE border/text (keeps hero style).
                If you keep it on a white background and want more contrast,
                switch to brand border/text instead. */}
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="px-6 py-3 rounded-md font-semibold w-full sm:w-auto"
              style={{ color: "#111827", border: `1px solid ${theme.border}`, backgroundColor: "transparent" }}
            >
              WhatsApp Us
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-md font-semibold text-white w-full sm:w-auto"
              style={{ backgroundColor: theme.accent }}
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
