"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig, companies } from "@/config/siteConfig";
import Image from "next/image";
import { useParams } from "next/navigation";

type Theme = {
  bg: string;        // footer background
  fg: string;        // footer foreground (text)
  accent: string;    // brand accent (icons, pills, links)
  soft: string;      // subtle brand-tinted bg
  border: string;    // divider/border color
};

const THEMES: Record<string, Theme> = {
  // lg: {
  //   bg: "#3A0010",                  // deep LG maroon base
  //   fg: "#FFFFFF",
  //   accent: "#A50034",              // LG
  //   soft: "rgba(165,0,52,0.12)",
  //   border: "rgba(165,0,52,0.28)",
  // },
  // bosch: {
  //   bg: "#7A0000",                  // deep Bosch red base
  //   fg: "#FFFFFF",
  //   accent: "#F80000",              // Bosch
  //   soft: "rgba(248,0,0,0.12)",
  //   border: "rgba(248,0,0,0.28)",
  // },
  // siemens: {
  //   bg: "#003F3E",                  // deep Siemens teal base
  //   fg: "#FFFFFF",
  //   accent: "#019997",              // Siemens
  //   soft: "rgba(1,153,151,0.12)",
  //   border: "rgba(1,153,151,0.28)",
  // },
  // samsung: {
  //   bg: "#000000",                  // Samsung black
  //   fg: "#FFFFFF",
  //   accent: "#000000",              // keep accent black on light elems; we’ll invert with border/soft
  //   soft: "rgba(255,255,255,0.08)", // subtle neutral for chips
  //   border: "rgba(255,255,255,0.18)",
  // },
};

export function Footer() {
  const params = useParams() as { company?: string | string[] };
  // const currentCompany = Array.isArray(params?.company) ? params.company[0] : params?.company;
  const currentCompany = "";
  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  const theme: Theme =
    (currentCompany && THEMES[currentCompany]) || {
      // Neutral default for `/`
      bg: "#111827",               // gray-900
      fg: "#FFFFFF",
      accent: "var(--primary)",
      soft: "rgba(59,130,246,0.10)", // blue-500 soft
      border: "rgba(255,255,255,0.16)",
    };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative"
      style={{ backgroundColor: theme.bg, color: theme.fg }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Brand pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span
            className="inline-block text-[11px] md:text-xs font-bold tracking-wider px-3 py-1 rounded-full"
            style={{
              backgroundColor: theme.soft,
              border: `1px solid ${theme.border}`,
              color: "#fff",
            }}
          >
            {currentCompanyData
              ? `AUTHORISED SERVICE CENTER – ${currentCompanyData.name.toUpperCase()}`
              : `APPLIANCE SERVICE CENTER AE`}
          </span>
        </motion.div>

        <div className="flex flex-col gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              {currentCompanyData ? (
                <Image
                  src={currentCompanyData.logo}
                  alt={`${currentCompanyData.name} logo`}
                  className="h-8 w-32 object-contain"
                  width={100}
                  height={100}
                />
              ) : (
                <h3
                  className="text-xl font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  Appliance Service Center AE
                </h3>
              )}
            </div>

            <p className="mb-5" style={{ color: "rgba(255,255,255,0.80)" }}>
              Professional appliance repair services in {siteConfig.locations}.
              Expert technicians, genuine parts, and guaranteed satisfaction.
            </p>

            {/* Contacts */}
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: theme.accent }} />
                <span>{siteConfig.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: theme.accent }} />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: theme.accent }} />
                <span>{siteConfig.locations}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: theme.accent }} />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick links (optional) */}
          <nav className="flex flex-wrap gap-4 text-sm mt-2">
            {[
              { name: "Home", href: "#hero" },
              { name: "About", href: "#about" },
              { name: "Services", href: "#services" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="transition-colors"
                style={{ color: "rgba(255,255,255,0.90)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = theme.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.90)";
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 text-center"
          style={{ borderTop: `1px solid ${theme.border}`, color: "rgba(255,255,255,0.80)" }}
        >
          <p>
            &copy; 2025 {currentCompanyData?.name || "Appliance Service Center AE"}. All rights reserved.
            {" "} | Professional Authorised Service Center in UAE
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
