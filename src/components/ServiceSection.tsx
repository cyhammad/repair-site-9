"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { siteConfig, services, companies } from "@/config/siteConfig";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import { useEffect } from "react";
import Image from "next/image";

interface ServicesSectionProps {
  currentCompany?: string;
}

export function ServicesSection({ currentCompany }: ServicesSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentCompanyData = currentCompany
    ? companies.find((c) => c.id === currentCompany)
    : null;

  const availableServices = currentCompany
    ? services.filter((service) =>
        service.availableFor.includes(currentCompany)
      )
    : services;

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(availableServices.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentServices = availableServices.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  const handleServiceWhatsApp = (serviceName: string) => {
    openWhatsApp(`Hey! I want ${serviceName}. Please contact me for service.`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
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
            {currentCompanyData?.name || "Professional"} Repair Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {currentCompanyData
              ? `Comprehensive ${currentCompanyData.name} appliance repair services in ${siteConfig.locations} with certified technicians and genuine parts.`
              : `Expert repair services for all major home appliances in ${siteConfig.locations}. Professional technicians, genuine parts, and warranty included.`}
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={makePhoneCall}
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-0"
            >
              <Phone className="size-5" />
              Call {siteConfig.phoneNumber}
            </Button>
            <Button
              onClick={() => openWhatsApp()}
              className="bg-green-500 hover:bg-green-600 text-white border-0"
            >
              <Image width={20} height={20} alt="icon" src="/whatsapp.svg" />
              WhatsApp Us
            </Button>
          </div>
        </motion.div>

        {/* Services Slider */}
        <div className="relative hidden sm:block">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={totalSlides <= 1}
              className="border-primary/20 hover:border-primary/40"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-primary w-8" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={totalSlides <= 1}
              className="border-primary/20 hover:border-primary/40"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
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
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border-primary/20 h-full">
                  <CardHeader className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-t-lg"
                    >
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        width={400}
                        height={300}
                      />
                      <div className="absolute top-4 left-4 text-3xl bg-white/90 w-12 h-12 rounded-full flex items-center justify-center">
                        {service.icon}
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col h-full">
                    <CardTitle className="mb-3 text-xl">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="mb-4 flex-grow">
                      {service.description}
                    </CardDescription>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm">
                        Common Issues We Fix:
                      </h4>
                      <ul className="space-y-2">
                        {service.commonIssues
                          .slice(0, 3)
                          .map((issue, issueIndex) => (
                            <motion.li
                              key={issueIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + issueIndex * 0.1 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{issue}</span>
                            </motion.li>
                          ))}
                      </ul>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                        onClick={makePhoneCall}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => handleServiceWhatsApp(service.name)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* All Services Grid for smaller screens */}
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
                <Card className="hover:shadow-lg transition-shadow border-primary/20">
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
                        <span className="text-2xl">{service.icon}</span>
                        {service.name}
                      </CardTitle>
                      <CardDescription className="mb-4">
                        {service.description}
                      </CardDescription>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Common Issues:</h4>
                        <ul className="space-y-1">
                          {service.commonIssues.map((issue, issueIndex) => (
                            <li
                              key={issueIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                          onClick={makePhoneCall}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-green-500 text-green-600 hover:bg-green-50"
                          onClick={() => handleServiceWhatsApp(service.name)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section with Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-lg p-8 mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Our Service Process
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                step: "1",
                title: "Book Appointment",
                description: `Call us or book online to schedule your ${
                  currentCompanyData?.name || "appliance"
                } repair service at your convenience.`,
              },
              {
                step: "2",
                title: "Expert Diagnosis",
                description:
                  "Our certified technician will diagnose the issue and provide a free, detailed quote for the repair.",
              },
              {
                step: "3",
                title: "Professional Repair",
                description: `We fix your appliance using genuine ${
                  currentCompanyData?.name || "manufacturer"
                } parts and provide a comprehensive warranty.`,
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
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-2xl font-bold text-primary-foreground">
                    {process.step}
                  </span>
                </motion.div>
                <h4 className="text-xl font-semibold mb-2">{process.title}</h4>
                <p className="text-muted-foreground">{process.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <p className="text-lg mb-6">
              Ready to get started? Contact us now for immediate assistance!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={makePhoneCall}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-0"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {siteConfig.phoneNumber}
              </Button>
              <Button
                onClick={() => openWhatsApp()}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white border-0"
              >
                <Image width={20} height={20} alt="icon" src="/whatsapp.svg" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
