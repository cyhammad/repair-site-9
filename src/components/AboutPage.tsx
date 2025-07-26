import { CheckCircle, Award, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { siteConfig, companies } from '@/config/siteConfig'

interface AboutPageProps {
  currentCompany?: string
}

export function AboutPage({ currentCompany }: AboutPageProps) {
  const currentCompanyData = currentCompany 
    ? companies.find(c => c.id === currentCompany)
    : null

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About {currentCompanyData?.name || siteConfig.companyName}
            {currentCompanyData && ' Service Center'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentCompanyData 
              ? `We are the leading ${currentCompanyData.name} authorized service center in ${siteConfig.locations}, providing professional repair services with certified technicians and genuine parts.`
              : `Leading appliance repair service center in ${siteConfig.locations} with over 15 years of experience serving homeowners and businesses.`
            }
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Professional {currentCompanyData?.name || 'Appliance'} Repair Services
            </h2>
            <p className="text-gray-600 mb-6">
              {currentCompanyData
                ? `As an authorized ${currentCompanyData.name} service center, we specialize in diagnosing and repairing all ${currentCompanyData.name} home appliances. Our certified technicians undergo regular training to stay updated with the latest ${currentCompanyData.name} technologies and repair techniques.`
                : `Our company has been serving the UAE community for over 15 years, providing reliable and professional appliance repair services. We are authorized service providers for all major brands including Bosch, Siemens, LG, and Samsung.`
              }
            </p>
            <p className="text-gray-600 mb-8">
              We understand that broken appliances can disrupt your daily routine, which is why we offer same-day service and emergency repairs throughout {siteConfig.locations}. Our team uses only genuine parts and provides comprehensive warranties on all repair work.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span>Licensed and insured technicians</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span>Genuine {currentCompanyData?.name || 'manufacturer'} parts only</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span>Comprehensive warranty on all repairs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span>24/7 emergency service available</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span>Same-day service in {siteConfig.locations}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span>Free diagnostic and quotation</span>
              </div>
            </div>
          </div>

          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop&auto=format"
              alt="Professional appliance repair team"
              className="rounded-lg shadow-lg w-full h-auto"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">5000+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Happy Customers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">15+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Years Experience</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">98%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Success Rate</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Emergency Service</p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose {currentCompanyData?.name || 'Our'} Service Center?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Expert Technicians</h3>
              <p className="text-gray-600 mb-6">
                Our certified technicians have extensive experience with {currentCompanyData?.name || 'all major'} appliances and receive ongoing training to stay current with the latest technologies and repair methods.
              </p>

              <h3 className="text-xl font-semibold mb-4">Genuine Parts</h3>
              <p className="text-gray-600">
                We use only genuine {currentCompanyData?.name || 'manufacturer'} parts to ensure your appliances perform optimally and maintain their warranty coverage.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Fast Service</h3>
              <p className="text-gray-600 mb-6">
                We offer same-day service appointments and emergency repairs because we understand that broken appliances can't wait.
              </p>

              <h3 className="text-xl font-semibold mb-4">Competitive Pricing</h3>
              <p className="text-gray-600">
                Our transparent pricing ensures you get the best value for professional {currentCompanyData?.name || 'appliance'} repair services in {siteConfig.locations}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}