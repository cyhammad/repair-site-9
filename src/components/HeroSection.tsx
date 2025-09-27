"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { siteConfig, companies, stats } from "@/config/siteConfig";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import Image from "next/image";

interface HeroSectionProps {
  currentCompany?: string;
}

type Theme = {
  accent: string;
  tint: string;
  tintDeep?: string;
};

const THEMES: Record<string, Theme> = {
  // lg: { accent: "#A50034", tint: "rgba(165,0,52,0.55)", tintDeep: "rgba(80,0,25,0.55)" },
  // bosch: { accent: "#F80000", tint: "rgba(248,0,0,0.50)", tintDeep: "rgba(128,0,0,0.50)" },
  // siemens: { accent: "#019997", tint: "rgba(1,153,151,0.50)", tintDeep: "rgba(0,70,69,0.50)" },
  // samsung: { accent: "#000000", tint: "rgba(0,0,0,0.45)", tintDeep: "rgba(0,0,0,0.55)" },
};

export function HeroSection({ currentCompany }: HeroSectionProps) {
  const bgImage = "/kitchen.jpg";
  // const currentCompanyData = currentCompany
  //   ? companies.find((c) => c.id === currentCompany)
  //   : null;
  const theme: Theme =
    (currentCompany && THEMES[currentCompany]) || {
      accent: "var(--primary)",
      tint: "rgba(17,24,39,0.45)",
      tintDeep: "rgba(0,0,0,0.50)",
    };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Brand tint layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(120deg, ${theme.tint} 0%, ${theme.tintDeep ?? theme.tint
            } 40%, rgba(0,0,0,0.35) 100%)`,
        }}
      />

      {/* Vignette for readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 500px at 25% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy on frosted panel */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div
              className="rounded-2xl border bg-white/5 backdrop-blur-md mt-8 p-6 md:p-8"
              style={{ borderColor: `${theme.accent}33` }}
            >
              {/* Pill */}
              {/* {currentCompanyData ? (
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide mb-4"
                  style={{
                    backgroundColor: `${theme.accent}1a`,
                    color: "#ffffff",
                  }}
                >
                  AUTHORISED SERVICE CENTER – {currentCompanyData.name.toUpperCase()}
                </div>
              ) : ( */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
                  style={{ backgroundColor: `${theme.accent}1a`, color: "#ffffff" }}
                >
                  <span>Certified Technicians</span>
                  <span className="opacity-60">•</span>
                  <span>Genuine Parts</span>
                </div>
              {/* )} */}

              {/* Headline: keep same style as `/` (do NOT force uppercase) */}
              <motion.h1
                className="text-white tracking-tight font-extrabold leading-[1.05] text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* {currentCompanyData
                  ? `${currentCompanyData.name} service center in Dubai and Abu Dhabi`
                  : `Professional appliance repair in ${siteConfig.locations}`} */}
                  Professional appliance repair in ${siteConfig.locations}
              </motion.h1>

              <motion.p
                className="mt-5 text-white/90 text-lg md:text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* {currentCompanyData
                  ? `Expert ${currentCompanyData.name} appliance repair services with certified technicians and genuine parts. Same day service available.`
                  : `Expert repair services for all major appliance brands. Certified technicians available 24/7 throughout ${siteConfig.locations}.`} */}
                  Expert repair services for all major appliance brands. Certified technicians available 24/7 throughout {siteConfig.locations}.
              </motion.p>

              <motion.div
                className="mt-6 flex flex-col sm:flex-row gap-3 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Call Button */}
                <button
                  onClick={() => makePhoneCall()}
                  className="flex-1 py-3 text-white font-semibold text-center rounded-md transition-colors duration-200"
                  style={{ backgroundColor: theme.accent }}
                >
                  Call Us
                </button>

                {/* WhatsApp Button */}
                <button
                  onClick={() => openWhatsApp()}
                  className="flex-1 py-3 text-white font-semibold text-center rounded-md border border-white transition-colors duration-200 hover:bg-white/10"
                >
                  WhatsApp Us
                </button>
              </motion.div>


              {/* Assurances Strip */}
              <div
                className="mt-5 rounded-xl bg-white/5 backdrop-blur-md border text-white/90"
                style={{ borderColor: `${theme.accent}33` }}
                aria-label="service assurances"
              >
                <ul className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {[
                    "Licensed technicians",
                    "Genuine parts only",
                    "90-day repair warranty",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 px-4 py-3">
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-6 rounded-full shrink-0"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span className="tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>

          {/* Right: stat tiles */}
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Happy customers", value: "5,000+" },
              { label: "Years experience", value: "15+" },
              { label: "Success rate", value: "98%" },
              { label: "Service window", value: "Same day" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/5 backdrop-blur-md border p-5 text-white"
                style={{ borderColor: `${theme.accent}33` }}
              >
                <div className="text-xs uppercase tracking-wider text-white/70">
                  {s.label}
                </div>
                <div
                  className="mt-1 text-3xl md:text-4xl font-semibold leading-tight"
                  style={{ color: theme.accent }}
                >
                  {s.value}
                </div>
                <div className="mt-2 h-0.5 w-12 rounded-full" style={{ backgroundColor: `${theme.accent}66` }} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
    </section>
  );
}
