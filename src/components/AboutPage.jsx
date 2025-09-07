import { useState } from 'react';
import {
  MdBusiness,
  MdOutlineRocket,
  MdOutlineBolt,
  MdOutlineBuild,
  MdOutlineSearch,
  MdOutlinePalette,
  MdOutlinePhoneAndroid,
  MdOutlineShield,
  MdOutlineCategory,
  MdOutlinePublic,
  MdOutlineHandshake,
  MdOutlineSettings
} from 'react-icons/md';

function AboutPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'OVERVIEW', icon: MdBusiness },
    { id: 'mission', label: 'MISSION', icon: MdOutlineRocket },
    { id: 'features', label: 'FEATURES', icon: MdOutlineBolt },
    { id: 'technology', label: 'TECHNOLOGY', icon: MdOutlineBuild },
    { id: 'credits', label: 'CREDITS', icon: MdOutlineHandshake }
  ];
//ab
  const features = [
    {
      icon: MdOutlineSearch,
      title: 'Advanced Image Search',
      description: 'Unified search across multiple premium image sources including Pexels, Unsplash, and Pixabay in a single, streamlined interface.'
    },
    {
      icon: MdOutlinePalette,
      title: 'Pinterest-Style Layout',
      description: 'Beautiful masonry grid layout with natural image aspect ratios for an authentic Pinterest-like browsing experience.'
    },
    {
      icon: MdOutlinePhoneAndroid,
      title: 'Responsive Design',
      description: 'Fully responsive design that works perfectly on desktop, tablet, and mobile devices with pixel-perfect precision.'
    },
    {
      icon: MdOutlineBolt,
      title: 'Lightning Fast',
      description: 'Optimized performance with efficient loading, caching, and infinite scroll for seamless browsing experience.'
    },
    {
      icon: MdOutlineShield,
      title: 'Download Protection',
      description: 'Legal download protection with watermarking and usage tracking to protect creator rights and platform integrity.'
    },
    {
      icon: MdOutlineCategory,
      title: 'Smart Categories',
      description: 'Curated Featured, Trending, and Popular image collections with advanced content discovery and organization.'
    }
  ];

  const technologies = [
    { name: 'React', description: 'Modern frontend framework for interactive UI' },
    { name: 'Vite', description: 'Lightning-fast build tool and development server' },
    { name: 'Node.js', description: 'Scalable backend runtime environment' },
    { name: 'Express', description: 'Minimalist web application framework' },
    { name: 'PostgreSQL', description: 'Robust relational database for data persistence' },
    { name: 'Supabase', description: 'Backend-as-a-Service for authentication and real-time features' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling' }
  ];


  return (
    <div className="fade-in">
      {/* Header */}
      <div className="minimal-container py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 tracking-wider mb-6">
            ABOUT IMGVERSE
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing image discovery through multi-source aggregation, beautiful design, and seamless user experience.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 bg-gray-100 rounded-lg p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeSection === section.id
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 tracking-wider mb-6">
                  THE FUTURE OF IMAGE DISCOVERY
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  IMGVERSE is a cutting-edge image search platform that aggregates images from multiple premium
                  sources in a single, beautifully designed interface. Founded in 2024, we're on a mission to make
                  high-quality images accessible to everyone while respecting creator rights and platform integrity.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 tracking-wider mb-4">
                    WHY IMGVERSE?
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Unified search across multiple premium image sources</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Multi-source image aggregation from premium APIs</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Beautiful Pinterest-style masonry layout</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Legal download protection with watermarking</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Responsive design for all devices</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Completely free with no usage limits</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="text-center">
                    <MdOutlineRocket className="text-4xl mb-4 mx-auto" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Our Impact</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">10M+</div>
                        <div className="text-sm text-gray-600">Images Indexed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">Still Counting :-]</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                        <div className="text-sm text-gray-600">Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-600">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Section */}
          {activeSection === 'mission' && (
            <div className="text-center space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-wider mb-6">
                  OUR MISSION
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                  To democratize access to high-quality visual content while building a sustainable
                  ecosystem that respects and compensates creators.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-lg p-8">
                  <MdOutlinePublic className="text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Accessibility</h3>
                  <p className="text-gray-600">
                    Making professional-quality images accessible to everyone, from students to enterprises,
                    without compromising on quality or ethics.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-8">
                  <MdOutlineHandshake className="text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Creator Support</h3>
                  <p className="text-gray-600">
                    Building a platform that fairly compensates content creators while providing
                    innovative tools for content discovery and usage.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-8">
                  <MdOutlineSettings className="text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    Pushing the boundaries of image search technology with multi-source aggregation,
                    advanced web technologies, and innovative user experiences.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          {activeSection === 'features' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 tracking-wider mb-6">
                  POWERFUL FEATURES
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover what makes IMGVERSE the most advanced image search platform available.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <feature.icon className="text-3xl mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Section */}
          {activeSection === 'technology' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 tracking-wider mb-6">
                  BUILT WITH MODERN TECH
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our technology stack is carefully chosen to deliver performance, scalability, and reliability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{tech.name}</h3>
                    <p className="text-gray-600 text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why This Stack?</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  We chose this technology stack for its proven track record in building scalable,
                  performant web applications. React provides excellent user experience, Node.js
                  ensures server-side efficiency, and our database choices guarantee data integrity
                  and fast queries. Every technology decision is made with our users' experience in mind.
                </p>
              </div>
            </div>
          )}

          {/* Credits Section */}
          {activeSection === 'credits' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 tracking-wider mb-6">
                  SPECIAL THANKS
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  IMGVERSE wouldn't be possible without the amazing API providers and services that power our platform.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Pexels */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img
                      src="/Pexels_logo.svg"
                      alt="Pexels Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pexels</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    High-quality stock photos and videos for creative projects.
                  </p>
                  <a
                    href="https://pexels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Visit Pexels →
                  </a>
                </div>

                {/* Unsplash */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img
                      src="/unsplash-2.svg"
                      alt="Unsplash Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Unsplash</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Beautiful, free images from talented photographers worldwide.
                  </p>
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Visit Unsplash →
                  </a>
                </div>

                {/* Pixabay */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img
                      src="/Pixabay-logo.svg"
                      alt="Pixabay Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pixabay</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Free stock photos, illustrations, and vectors for all projects.
                  </p>
                  <a
                    href="https://pixabay.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Visit Pixabay →
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h3>
                <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                  We are deeply grateful to these amazing platforms for providing access to their incredible collections.
                  IMGVERSE is built on the foundation of respecting creator rights, proper attribution, and supporting
                  the creative community that makes visual content possible.
                </p>
                <div className="text-sm text-gray-500">
                  Thank you for making beautiful images accessible to everyone! 🙏
                </div>
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-16">
        <div className="minimal-container">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 tracking-wider mb-4">
              IMGVERSE
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Revolutionizing image discovery through multi-source aggregation and beautiful design.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              © 2025 IMGVERSE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
