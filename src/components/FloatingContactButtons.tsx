"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { makePhoneCall, openWhatsApp } from "../utils/contactActions";
import Image from "next/image";

export function FloatingContactButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* WhatsApp Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mb-4"
            >
              <Button
                onClick={() => openWhatsApp()}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                size="sm"
              >
                <Image width={30} height={30} alt="icon" src="/whatsapp.svg" />
              </Button>
              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                WhatsApp
              </div>
            </motion.div>

            {/* Phone Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="mb-4"
            >
              <Button
                onClick={makePhoneCall}
                className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                size="sm"
              >
                <Phone className="size-8" />
              </Button>
              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                Call Now
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={toggleExpanded}
          className="w-16 h-16 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          size="sm"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
