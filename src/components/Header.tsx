"use client";

import { useState, useEffect, useMemo } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { siteConfig, companies } from "@/config/siteConfig";
import Image from "next/image";
import { useParams } from "next/navigation";

type Theme = { accent: string; accentFg: string; accentSoft: string; border: string };

const THEMES: Record<string, Theme> = {
  // lg:      { accent: "#A50034", accentFg: "#ffffff", accentSoft: "rgba(165,0,52,0.08)", border: "rgba(165,0,52,0.25)" },
  // // bosch:   { accent: "#F80000", accentFg: "#ffffff", accentSoft: "rgba(248,0,0,0.08)",  border: "rgba(248,0,0,0.25)" },
  // siemens: { accent: "#019997", accentFg: "#ffffff", accentSoft: "rgba(1,153,151,0.08)", border: "rgba(1,153,151,0.25)" },
  // samsung: { accent: "#000000", accentFg: "#ffffff", accentSoft: "rgba(0,0,0,0.06)",     border: "rgba(0,0,0,0.2)" },
};

export function Header() {
  const params = useParams() as { company?: string | string[] };
  // const currentCompany = Array.isArray(params?.company) ? params.company[0] : params?.company;
  const currentCompany = "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  const theme = useMemo<Theme>(() => {
    if (currentCompany && THEMES[currentCompany]) return THEMES[currentCompany];
    return { accent: "var(--primary)", accentFg: "#ffffff", accentSoft: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)" };
  }, [currentCompany]);

  const navigationItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "rgba(255,255,255,0.9)" : "#ffffff",
        backdropFilter: isScrolled ? "saturate(180%) blur(8px)" : undefined,
        borderBottom: isScrolled ? `1px solid ${theme.border}` : "1px solid transparent",
        boxShadow: isScrolled ? "0 8px 24px -16px rgba(0,0,0,0.2)" : "none",
      }}
    >
      {/* Top bar (brand) */}
      <div
        className="py-2"
        style={{ backgroundColor: theme.accent, color: theme.accentFg }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{siteConfig.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{siteConfig.locations}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            {currentCompanyData ? (
              <Image
                src={currentCompanyData.logo}
                alt={`${currentCompanyData.name} logo`}
                className="h-8 w-32 object-contain"
                width={100}
                height={100}
                priority
              />
            ) : (
              <span
                className="text-2xl font-bold"
                style={{ color: "#111827" }}
              >
                Appliance Service Center AE
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="font-medium transition-colors"
                style={{
                  color: "#111827",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = theme.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#111827";
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              border: `1px solid ${theme.border}`,
              color: "#111827",
              backgroundColor: theme.accentSoft,
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="md:hidden py-4 border-t"
            style={{ borderColor: theme.border }}
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left font-medium px-2 py-2 rounded-md transition-colors"
                  style={{
                    color: "#111827",
                    border: `1px solid transparent`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = theme.accent;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = theme.border;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.accentSoft;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#111827";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
