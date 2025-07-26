'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Award, Users, Clock, Shield, Wrench } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { siteConfig, companies, stats } from '@/config/siteConfig'

interface AboutSectionProps {
  currentCompany?: string
}

export function AboutSection({ currentCompany }: AboutSectionProps) {
  const currentCompanyData = currentCompany 
    ? companies.find(c => c.id === currentCompany)
    : null

  const features = [
    {
      icon: Wrench,
      title: "Expert Technicians",
      description: `Certified technicians with specialized training in ${currentCompanyData?.name || 'all major'} appliances.`,
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: `Round-the-clock emergency repair services available throughout ${siteConfig.locations}.`,
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "All repairs come with comprehensive warranty coverage and genuine parts guarantee.",
      color: "text-primary"
    },
    {
      icon: Award,
      title: "Licensed & Insured",
      description: "Fully licensed and insured technicians for your peace of mind and protection.",
      color: "text-secondary"
    }
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About {currentCompanyData?.name || 'Our Professional'} Service Center
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {currentCompanyData
                ? `As an authorized ${currentCompanyData.name} service center, we specialize in diagnosing and repairing all ${currentCompanyData.name} home appliances. Our certified technicians undergo regular training to stay updated with the latest ${currentCompanyData.name} technologies.`
                : `Professional appliance repair services in ${siteConfig.locations} with over 15 years of experience. We are authorized service providers for all major brands including Bosch, Siemens, LG, and Samsung.`
              }
            </p>
            <p className="text-muted-foreground mb-8 text-lg">
              We understand that broken appliances can disrupt your daily routine, which is why we offer same-day service and emergency repairs throughout {siteConfig.locations}. Our team uses only genuine parts and provides comprehensive warranties.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg">Licensed and insured technicians</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg">Genuine {currentCompanyData?.name || 'manufacturer'} parts only</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg">Comprehensive warranty on all repairs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg">24/7 emergency service available</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg">Same-day service in {siteConfig.locations}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="/kitchen-2.jpg"
                alt="Professional appliance repair team"
                className="rounded-lg shadow-lg w-full h-auto"
                width={600}
                height={400}
              />
            </motion.div>
            
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg"
            >
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm">Years Experience</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg"
            >
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm">Repairs Done</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose {currentCompanyData?.name || 'Our'} Service Center?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-primary/20">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                    </motion.div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}