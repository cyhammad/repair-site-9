"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone, Star, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { siteConfig, companies, stats } from "@/config/siteConfig";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import Image from "next/image";

interface HeroSectionProps {
  currentCompany?: string;
}

export function HeroSection({ currentCompany }: HeroSectionProps) {
  const bgImage = "/kitchen.jpg";
  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-gray-900 to-black opacity-90 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Professional Appliance Repair in {siteConfig.locations}
            </motion.h1>

            <motion.p
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {currentCompanyData
                ? `Expert ${currentCompanyData.name} appliance repair services with certified technicians and genuine parts. Same day service available.`
                : `Expert repair services for all major appliance brands. Certified technicians available 24/7 throughout ${siteConfig.locations}.`}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                onClick={makePhoneCall}
              >
                <Phone className="size-5" />
                Call {siteConfig.phoneNumber}
              </Button>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white border-0"
                onClick={() => openWhatsApp()}
              >
                <Image width={20} height={20} alt="icon" src="/whatsapp.svg" />
                WhatsApp Us
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Licensed Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Same Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Warranty Included</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center text-white"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
