"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { testimonials } from "@/config/siteConfig";

type Theme = {
  accent: string;      // main brand color
  accentSoft: string;  // soft bg/dot
  border: string;      // border color
};

const THEMES: Record<string, Theme> = {
  // lg:      { accent: "#A50034", accentSoft: "rgba(165,0,52,0.10)", border: "rgba(165,0,52,0.25)" },
  // bosch:   { accent: "#F80000", accentSoft: "rgba(248,0,0,0.10)",  border: "rgba(248,0,0,0.25)" },
  // siemens: { accent: "#019997", accentSoft: "rgba(1,153,151,0.10)", border: "rgba(1,153,151,0.25)" },
  // samsung: { accent: "#000000", accentSoft: "rgba(0,0,0,0.06)",     border: "rgba(0,0,0,0.20)" },
};

export function TestimonialsSection() {
  const params = useParams() as { company?: string | string[] };
  const routeCompany = Array.isArray(params?.company) ? params.company[0] : params?.company;

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // theme from brand (route-aware)
  const theme: Theme = useMemo(() => {
    if (routeCompany && THEMES[routeCompany]) return THEMES[routeCompany];
    // fallback uses your app primary-ish tones
    return { accent: "var(--primary)", accentSoft: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)" };
  }, [routeCompany]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our appliance repair services.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg" style={{ borderColor: theme.border, borderWidth: 1 }}>
              <CardContent className="p-8 md:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-6"
                >
                  <Quote className="w-12 h-12 mx-auto opacity-50" style={{ color: theme.accent }} />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-xl md:text-2xl text-muted-foreground mb-8 italic leading-relaxed"
                >
                  "{testimonials[currentTestimonial].comment}"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center justify-center gap-1 mb-4"
                >
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.1, duration: 0.2 }}>
                      <Star className="w-5 h-5 fill-current" style={{ color: theme.accent }} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
                  <h4 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].location}</p>
                  <p className="text-sm font-medium" style={{ color: theme.accent }}>
                    {testimonials[currentTestimonial].service}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].date}</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Nav buttons (brand border on light bg) */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
            style={{ borderColor: theme.border }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
            style={{ borderColor: theme.border }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Indicators (brand dot + active wider) */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className="h-2 rounded-full transition-all"
              style={{
                width: index === currentTestimonial ? 20 : 8,
                backgroundColor: index === currentTestimonial ? theme.accent : theme.accentSoft,
              }}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="transition-all duration-300 h-full hover:shadow-lg" style={{ borderColor: theme.border, borderWidth: 1 }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: theme.accent }} />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    "{t.comment.slice(0, 100)}..."
                  </p>

                  <div className="pt-4" style={{ borderTop: `1px solid ${theme.border}` }}>
                    <h5 className="font-semibold text-sm">{t.name}</h5>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                    <p className="text-xs font-medium" style={{ color: theme.accent }}>
                      {t.service}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges (brand-tinted) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-90">
            {[
              { label: "4.9/5 Rating", icon: <Star className="w-4 h-4" style={{ color: theme.accent }} /> },
              { label: "Verified Reviews", icon: <span style={{ color: theme.accent }} className="font-bold text-xs">✓</span> },
              { label: "Licensed & Insured", icon: <span style={{ color: theme.accent }} className="font-bold text-xs">🏆</span> },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.accentSoft, border: `1px solid ${theme.border}` }}
                >
                  {b.icon}
                </div>
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
