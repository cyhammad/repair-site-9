"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig, companies } from "@/config/siteConfig";
import Image from "next/image";
import { useParams } from "next/navigation";

export function Footer() {
  const params = useParams();
  const currentCompany = params.company;
  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
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
                <h3 className="text-xl font-bold text-primary">
                  Appliance Repair Center
                </h3>
              )}
            </div>
            <p className="text-secondary-foreground/80 mb-4">
              Professional appliance repair services in {siteConfig.locations}.
              Expert technicians, genuine parts, and guaranteed satisfaction.
            </p>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{siteConfig.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{siteConfig.locations}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/80"
        >
          <p>
            &copy; 2025 {currentCompanyData?.name || "Appliance Repair Center"}.
            All rights reserved. | Professional Appliance Repair Center in UAE
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
