import { Link } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { hasProfile } from '../utils/profile'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profileExists, setProfileExists] = useState(false)

  useEffect(() => {
    const checkProfile = () => {
      setProfileExists(hasProfile())
    }
    
    checkProfile()
    
    // Слухаємо зміни в localStorage (для інших вкладок)
    window.addEventListener('storage', checkProfile)
    // Слухаємо кастомну подію для оновлення в тій же вкладці
    window.addEventListener('profileUpdated', checkProfile)
    
    return () => {
      window.removeEventListener('storage', checkProfile)
      window.removeEventListener('profileUpdated', checkProfile)
    }
  }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-600" fill="currentColor" />
            <span className="text-2xl font-bold text-gray-900">VolunteerHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Головна
            </Link>
            <Link to="/opportunities" className="text-gray-700 hover:text-red-600 transition-colors">
              Можливості
            </Link>
            <Link to="/organizations" className="text-gray-700 hover:text-red-600 transition-colors">
              Організації
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-red-600 transition-colors">
              Карта
            </Link>
            {profileExists ? (
              <Link 
                to="/profile" 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Профіль
              </Link>
            ) : (
              <Link 
                to="/create-profile" 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Створити профіль
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Головна
              </Link>
              <Link 
                to="/opportunities" 
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Можливості
              </Link>
              <Link 
                to="/organizations" 
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Організації
              </Link>
              <Link 
                to="/map" 
                className="text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Карта
              </Link>
              {profileExists ? (
                <Link 
                  to="/profile" 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профіль
                </Link>
              ) : (
                <Link 
                  to="/create-profile" 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Створити профіль
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

