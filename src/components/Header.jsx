import { useState, useEffect } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'
import SearchBar from './SearchBar'

function Header({ onSearch, isLoading, currentPage, onNavigateToHome, onNavigateToAbout, onNavigateToContact, currentView }) {
  const [showBorder, setShowBorder] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 300; // Total scroll distance for full animation
      const progress = Math.min(scrollTop / maxScroll, 1);

      setShowBorder(scrollTop === 0);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate which letters should be visible based on scroll progress
  const getLetterVisibility = (index) => {
    const letters = ['I', 'M', 'G', 'V', 'E', 'R', 'S', 'E'];
    // Reverse the order: rightmost letter (E) disappears first
    const reversedIndex = letters.length - 1 - index;
    const threshold = (reversedIndex + 1) / letters.length;
    return scrollProgress < threshold;
  };

  // Render animated logo
  const renderAnimatedLogo = (size = 'text-3xl') => {
    const letters = ['I', 'M', 'G', 'V', 'E', 'R', 'S', 'E'];

    return (
      <div className={`font-bold text-gray-800 tracking-wider ${size} flex items-center`}>
        {letters.map((letter, index) => {
          const isVisible = getLetterVisibility(index);
          const isFirstLetter = index === 0;

          if (isFirstLetter) {
            return (
              <div key={index} className="relative flex items-center justify-center">
                <span
                  className={`transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {letter}
                </span>
                <div
                  className="absolute flex items-center justify-center transition-opacity duration-300"
                  style={{
                    width: '48px',
                    height: '48px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 0 : 1
                  }}
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-2 0 24 24"
                    style={{ width: '40px', height: '40px', color: '#1f2937' }}
                  >
                    <path d="M18 0h2v4h4v2h-2v2h-2v2h-2V6h-4V4h2V2h2V0zM4 3h8v2H4v14h16v-7h2v9H2V3h2zm10 6h-2v2h-2v2H8v2H6v2h2v-2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2V9zM8 7H6v2h2V7z" />
                  </svg>
                </div>
              </div>
            );
          }

          return (
            <span
              key={index}
              className={`transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <header className={`sticky top-0 z-50 py-4 bg-gray-50 transition-all duration-300 ${showBorder ? 'border-b border-gray-200 shadow-sm' : 'border-b border-transparent shadow-none'}`}>
      <nav className="minimal-container !py-0">
        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Left Section - Logo + Navigation */}
          <div className="flex items-center space-x-8">
            {renderAnimatedLogo('text-3xl')}
            <div className="flex space-x-6">
               <button
                 onClick={onNavigateToHome}
                 className={`transition-colors text-base uppercase tracking-wider ${
                   currentView === 'home'
                     ? 'text-gray-900 font-medium'
                     : 'text-gray-600 hover:text-gray-900'
                 }`}
               >
                 Home
               </button>
               <button
                 onClick={onNavigateToAbout}
                 className={`transition-colors text-base uppercase tracking-wider ${
                   currentView === 'about'
                     ? 'text-gray-900 font-medium'
                     : 'text-gray-600 hover:text-gray-900'
                 }`}
               >
                 About
               </button>
               <button
                 onClick={onNavigateToContact}
                 className={`transition-colors text-base uppercase tracking-wider ${
                   currentView === 'contact'
                     ? 'text-gray-900 font-medium'
                     : 'text-gray-600 hover:text-gray-900'
                 }`}
               >
                 Contact
               </button>
             </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="hidden lg:block">
              <SearchBar
                onSearch={onSearch}
                isLoading={isLoading}
                currentPage={currentPage}
              />
            </div>
            <div className="hidden md:block lg:hidden">
              <div className="scale-90 origin-center">
                <SearchBar
                  onSearch={onSearch}
                  isLoading={isLoading}
                  currentPage={currentPage}
                />
              </div>
            </div>
            <div className="block md:hidden">
              <div className="scale-75 origin-center">
                <SearchBar
                  onSearch={onSearch}
                  isLoading={isLoading}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>

          {/* Right Section - Support Button */}
          <div className="flex items-center space-x-4">
            <button className="minimal-btn text-xs" onClick={onNavigateToContact}>
              SUPPORT
            </button>
          </div>
        </div>

        {/* Tablet Layout (md-lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            {renderAnimatedLogo('text-2xl')}
          </div>

          {/* Right Section - Search + Hamburger */}
          <div className="flex items-center space-x-0 ml-auto">
            <div className="w-80 min-w-0 max-w-sm">
              <div className="scale-90 origin-center">
                <SearchBar
                  onSearch={onSearch}
                  isLoading={isLoading}
                  currentPage={currentPage}
                />
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <IoClose className="w-8 h-8" /> : <IoMenu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Layout (sm) */}
        <div className="flex md:hidden items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            {renderAnimatedLogo('text-lg')}
          </div>

          {/* Right Section - Search + Hamburger */}
          <div className="flex items-center space-x-0 ml-auto">
            <div className="flex-1 min-w-0 max-w-48">
              <div className="scale-75 origin-center">
                <SearchBar
                  onSearch={onSearch}
                  isLoading={isLoading}
                  currentPage={currentPage}
                />
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <IoClose className="w-8 h-8" /> : <IoMenu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Popup */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Popup Menu - Positioned below hamburger */}
          <div className="absolute top-full right-4 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 min-w-64 animate-fadeIn">
            {/* Arrow pointer */}
            <div className="absolute -top-2 right-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

            <div className="p-5">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4 mb-6">
                <button
                  onClick={() => {
                    onNavigateToHome();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors text-base font-medium py-2 px-3 rounded hover:bg-gray-50 ${
                    currentView === 'home'
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigateToAbout();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors text-base font-medium py-2 px-3 rounded hover:bg-gray-50 ${
                    currentView === 'about'
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    onNavigateToContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors text-base font-medium py-2 px-3 rounded hover:bg-gray-50 ${
                    currentView === 'contact'
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Contact
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-4"></div>

              {/* Support Button */}
              <div className="flex flex-col space-y-3">
                <button
                  className="minimal-btn text-sm w-full text-center py-2.5"
                  onClick={() => {
                    onNavigateToContact();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  SUPPORT
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none"></div>
    </header>
  )
}

export default Header