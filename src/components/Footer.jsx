import { Heart, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-red-600" fill="currentColor" />
              <span className="text-xl font-bold">VolunteerHub</span>
            </div>
            <p className="text-gray-400">
              Централізована платформа для пошуку волонтерських можливостей та координації допомоги в Україні.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/opportunities" className="hover:text-white transition-colors">Можливості</a></li>
              <li><a href="/organizations" className="hover:text-white transition-colors">Організації</a></li>
              <li><a href="/profile" className="hover:text-white transition-colors">Профіль</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@volunteerhub.ua</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+380687763512</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Україна</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 VolunteerHub. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

