import { Phone, CheckCircle, Wrench } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { siteConfig, services, companies } from '@/config/siteConfig'

interface ServicesPageProps {
  currentCompany?: string
}

export function ServicesPage({ currentCompany }: ServicesPageProps) {
  const currentCompanyData = currentCompany 
    ? companies.find(c => c.id === currentCompany)
    : null

  const availableServices = currentCompany 
    ? services.filter(service => service.availableFor.includes(currentCompany))
    : services

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {currentCompanyData?.name || 'Professional'} Appliance Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentCompanyData
              ? `Comprehensive ${currentCompanyData.name} appliance repair services in ${siteConfig.locations} with certified technicians and genuine parts.`
              : `Expert repair services for all major home appliances in ${siteConfig.locations}. Professional technicians, genuine parts, and warranty included.`
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {availableServices.map((service) => (
            <Card key={service.id} id={service.id} className="hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <CardHeader className="p-0">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover rounded-l-lg"
                    width={400}
                    height={300}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-4">{service.name}</CardTitle>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Common Issues We Fix:</h4>
                    <ul className="space-y-1">
                      {service.commonIssues.map((issue, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {siteConfig.phoneNumber}
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Service Process */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Service Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
              <p className="text-gray-600">
                Call us or book online to schedule your {currentCompanyData?.name || 'appliance'} repair service at your convenience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Diagnosis</h3>
              <p className="text-gray-600">
                Our certified technician will diagnose the issue and provide a free, detailed quote for the repair.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Repair</h3>
              <p className="text-gray-600">
                We fix your appliance using genuine {currentCompanyData?.name || 'manufacturer'} parts and provide a comprehensive warranty.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Wrench className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Certified Technicians</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {currentCompanyData 
                  ? `${currentCompanyData.name}-certified technicians with specialized training and experience.`
                  : 'Factory-trained and certified technicians for all major appliance brands.'
                }
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Genuine Parts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We use only genuine {currentCompanyData?.name || 'manufacturer'} parts to ensure optimal performance and warranty coverage.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Emergency repair services available round-the-clock throughout {siteConfig.locations}.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need {currentCompanyData?.name || 'Appliance'} Repair Service?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our expert technicians today for fast and reliable repair service in {siteConfig.locations}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call {siteConfig.phoneNumber}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Get Free Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}