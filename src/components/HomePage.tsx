import Link from 'next/link'
import { CheckCircle, Phone, Star, Wrench, Clock, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { siteConfig, services, companies } from '@/config/siteConfig'

interface HomePageProps {
  currentCompany?: string
}

export function HomePage({ currentCompany }: HomePageProps) {
  const currentCompanyData = currentCompany 
    ? companies.find(c => c.id === currentCompany)
    : null

  const availableServices = currentCompany 
    ? services.filter(service => service.availableFor.includes(currentCompany))
    : services

  const servicePrefix = currentCompany ? `/${currentCompany}` : ''

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {currentCompanyData ? `${currentCompanyData.name} ` : ''}
                Appliance Repair Center in {siteConfig.locations}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {currentCompanyData 
                  ? `Professional ${currentCompanyData.name} appliance repair services with certified technicians and genuine parts.`
                  : `Professional home appliance repair services for all major brands. Expert technicians available 24/7 in ${siteConfig.locations}.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-0">
                  <Phone className="w-5 h-5 mr-2" />
                  Call {siteConfig.phoneNumber}
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-secondary">
                  Book Service Online
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
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
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop&auto=format"
                alt="Professional appliance repair technician"
                className="rounded-lg shadow-2xl w-full h-auto"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose {currentCompanyData?.name || 'Our'} Repair Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are the leading appliance service center in UAE with certified technicians and genuine parts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader className="text-center">
                <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Technicians</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Certified and experienced technicians with specialized training in {currentCompanyData?.name || 'all major'} appliances.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader className="text-center">
                <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle>24/7 Emergency Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Round-the-clock emergency repair services available throughout {siteConfig.locations}.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Warranty Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  All repairs come with comprehensive warranty coverage and genuine parts guarantee.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {currentCompanyData?.name || 'Our'} Repair Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional repair solutions for all your home appliances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow group hover:border-primary/30">
                <CardHeader className="p-0">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    width={400}
                    height={300}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{service.name}</CardTitle>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={`${servicePrefix}/services#${service.id}`}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section - Only show if not on company-specific page */}
      {!currentCompany && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Brands We Service</h2>
              <p className="text-xl text-muted-foreground">
                Authorized service center for leading appliance brands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies.map((company) => (
                <Link key={company.id} href={`/${company.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group hover:border-primary/30">
                    <CardContent className="p-6 text-center">
                      <ImageWithFallback
                        src={company.logo}
                        alt={`${company.name} service center`}
                        className="w-20 h-10 object-contain mx-auto mb-4"
                        width={200}
                        height={100}
                      />
                      <h3 className="font-semibold mb-2">{company.name} Service Center</h3>
                      <p className="text-sm text-muted-foreground">{company.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need {currentCompanyData?.name || 'Appliance'} Repair Service?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our expert technicians today for fast and reliable service in {siteConfig.locations}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0">
              <Phone className="w-5 h-5 mr-2" />
              Call {siteConfig.phoneNumber}
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              <Link href={`${servicePrefix}/contact`}>Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}