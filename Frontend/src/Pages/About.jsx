import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/Components/ui/Button';
import { FiZap, FiEye, FiCheckCircle, FiStar, FiHeart, FiGlobe } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <section className="relative py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Crafting Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
              Premium clothing for those who appreciate quality and timeless design.
            </p>
            <Link to="/collection">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Our Story
              </h2>
              <div className="w-16 h-0.5 bg-black" />
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Founded with a passion for exceptional craftsmanship, Brand Lovers has been redefining fashion
                since our inception. We believe that clothing should be an expression of individuality,
                combining comfort with contemporary style.
              </p>
              <p>
                Every piece in our collection is carefully curated and designed with attention to detail,
                ensuring that you not only look good but feel confident in what you wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Mission */}
            <div>
              <div className="mb-6">
                <FiZap className="w-10 h-10 text-black mb-4" />
                <h3 className="text-3xl font-bold text-black">Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To empower individuals through fashion by creating high-quality, stylish clothing that
                celebrates diversity and self-expression while maintaining our commitment to sustainability.
              </p>
            </div>

            {/* Vision */}
            <div>
              <div className="mb-6">
                <FiEye className="w-10 h-10 text-black mb-4" />
                <h3 className="text-3xl font-bold text-black">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become a global leader in fashion innovation, recognized for our commitment to quality,
                sustainability, and customer satisfaction. Creating a positive impact on both people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Core Values
              </h2>
              <p className="text-lg text-gray-600">
                Principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Quality */}
              <div className="group">
                <FiCheckCircle className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-black mb-2">Quality</h3>
                <p className="text-gray-600">
                  Premium materials and meticulous craftsmanship
                </p>
              </div>

              {/* Innovation */}
              <div className="group">
                <FiStar className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-black mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Constantly evolving designs that set trends
                </p>
              </div>

              {/* Sustainability */}
              <div className="group">
                <FiGlobe className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-black mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Committed to eco-friendly practices
                </p>
              </div>

              {/* Customer Focus */}
              <div className="group">
                <FiHeart className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-black mb-2">Customer Love</h3>
                <p className="text-gray-600">
                  Your satisfaction is our goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">10+</div>
                <div className="text-gray-400">Years of Excellence</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50K+</div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-gray-400">Quality Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover our curated collection of premium clothing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collection">
                <Button variant="primary" size="lg" className="px-8">
                  Shop Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;