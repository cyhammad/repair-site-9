'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { siteConfig, services, companies } from '@/config/siteConfig'

interface ContactPageProps {
  currentCompany?: string
}

export function ContactPage({ currentCompany }: ContactPageProps) {
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
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will contact you shortly.')
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact {currentCompanyData?.name || siteConfig.companyName}
            {currentCompanyData && ' Service Center'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our expert technicians for professional {currentCompanyData?.name || 'appliance'} repair services in {siteConfig.locations}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get Free Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="service">Service Required *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Describe your appliance issue and any symptoms you've noticed..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-0" size="lg">
                  <Send className="w-5 h-5 mr-2" />
                  Request Service Call
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">{siteConfig.phoneNumber}</p>
                    <p className="text-sm text-muted-foreground">24/7 Emergency Service</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">{siteConfig.email}</p>
                    <p className="text-sm text-muted-foreground">We reply within 1 hour</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Service Areas</h3>
                    <p className="text-muted-foreground">{siteConfig.locations}</p>
                    <p className="text-sm text-muted-foreground">Free service calls</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Working Hours</h3>
                    <p className="text-muted-foreground">{siteConfig.workingHours}</p>
                    <p className="text-sm text-muted-foreground">Same day appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Service */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-red-800">Emergency Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  Need immediate {currentCompanyData?.name || 'appliance'} repair? Our emergency technicians are available 24/7 throughout {siteConfig.locations}.
                </p>
                <Button className="w-full bg-red-600 text-white hover:bg-red-700 border-0">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Emergency Line: {siteConfig.phoneNumber}
                </Button>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Service Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We provide {currentCompanyData?.name || 'appliance'} repair services throughout:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    'Dubai Marina', 'Downtown Dubai', 'Business Bay', 'JBR',
                    'Dubai Mall', 'Burj Khalifa', 'Abu Dhabi', 'Al Ain',
                    'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'
                  ].map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>How quickly can you service my appliance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer same-day service appointments throughout {siteConfig.locations}. Emergency repairs are available 24/7 for urgent issues.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you use genuine {currentCompanyData?.name || 'manufacturer'} parts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we only use genuine {currentCompanyData?.name || 'manufacturer'} parts to ensure optimal performance and maintain your warranty coverage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Is there a warranty on repairs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our repair work comes with a comprehensive warranty. Parts and labor are covered for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What are your service charges?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide free diagnostic and quotation. Service charges are transparent with no hidden fees. Contact us for detailed pricing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}