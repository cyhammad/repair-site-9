'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { siteConfig, services, companies } from '@/config/siteConfig'
import { makePhoneCall, openWhatsApp, sendEmail } from '../utils/contactActions'
import Image from 'next/image'

interface ContactSectionProps {
  currentCompany?: string
}

export function ContactSection({ currentCompany }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const currentCompanyData = currentCompany 
    ? companies.find(c => c.id === currentCompany)
    : null

  const availableServices = currentCompany 
    ? services.filter(service => service.availableFor.includes(currentCompany))
    : services

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    
    // Send WhatsApp message with form details
    const whatsappMessage = `Hey! I want Home Appliance Repair Services\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${availableServices.find(s => s.id === formData.service)?.name || 'Not specified'}\nMessage: ${formData.message}`
    openWhatsApp(whatsappMessage)
    
    alert('Thank you for your inquiry! We will contact you shortly.')
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleQuickWhatsApp = (message: string) => {
    openWhatsApp(message)
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Contact {currentCompanyData?.name || 'Our'} Service Center
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get in touch with our expert technicians for professional {currentCompanyData?.name || 'appliance'} repair services in {siteConfig.locations}.
          </p>
          
          {/* Quick Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={makePhoneCall} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-0">
              <Phone className="size-5" />
              Call {siteConfig.phoneNumber}
            </Button>
            <Button onClick={() => openWhatsApp()} size="lg" className="bg-green-500 hover:bg-green-600 text-white border-0">
              <Image width={20} height={20} alt="icon" src="/whatsapp.svg" />
              WhatsApp Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}