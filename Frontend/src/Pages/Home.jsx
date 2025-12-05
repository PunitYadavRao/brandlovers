import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { assets } from '../assets/frontend_assets/assets'

const Home = () => {
  return (
    <div className='min-h-screen'>
      {/* Section 1: Hero */}
      <section className='min-h-screen flex items-center justify-center bg-white'>
        <div className='max-w-4xl mx-auto text-center px-4'>
          <h1 className='text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight'>
            Brand Lovers
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto'>
            Minimal fashion for the modern individual
          </p>
          <Link
            to='/collection'
            className='inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-lg hover:bg-gray-800 transition-colors'
          >
            Shop Collection
            <FiArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </section>

      {/* Section 2: Featured */}
      <section className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl md:text-5xl font-bold text-black mb-6'>
                Curated for You
              </h2>
              <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                Every piece is carefully selected to bring you timeless style and uncompromising quality.
                Our collection speaks to those who appreciate the beauty of simplicity.
              </p>
              <Link
                to='/about'
                className='inline-flex items-center gap-2 text-black text-lg hover:gap-4 transition-all'
              >
                Learn More
                <FiArrowRight className='w-5 h-5' />
              </Link>
            </div>
            <div className='aspect-square bg-gray-200 rounded-lg overflow-hidden'>
              <img
                src={assets.hero_img}
                alt="Featured"
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className='min-h-screen flex items-center justify-center bg-white'>
        <div className='max-w-6xl mx-auto px-4 w-full'>
          <h2 className='text-4xl md:text-5xl font-bold text-black mb-16 text-center'>
            Shop by Category
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {['Men', 'Women', 'Kids'].map((category) => (
              <Link
                key={category}
                to={`/collection?category=${category}`}
                className='group'
              >
                <div className='aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden'>
                  <img
                    src={assets.hero_img}
                    alt={category}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
                <h3 className='text-2xl font-semibold text-black group-hover:text-gray-600 transition-colors'>
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black text-white py-12 w-full'>
        <div className='px-4 md:px-8 lg:px-16'>
          <div className='grid md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h3 className='text-2xl font-bold mb-4'>Brand Lovers</h3>
              <p className='text-gray-400'>
                Minimal fashion for the modern individual
              </p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li><Link to='/collection' className='text-gray-400 hover:text-white transition-colors'>Collection</Link></li>
                <li><Link to='/about' className='text-gray-400 hover:text-white transition-colors'>About</Link></li>
                <li><Link to='/contact' className='text-gray-400 hover:text-white transition-colors'>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Contact</h4>
              <p className='text-gray-400'>
                Email: hello@brandlovers.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className='border-t border-gray-800 pt-8 text-center text-gray-400'>
            <p>&copy; 2025 Brand Lovers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home