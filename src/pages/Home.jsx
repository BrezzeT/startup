import { Link } from 'react-router-dom'
import { Search, MapPin, Users, Heart, ArrowRight } from 'lucide-react'
import { useState } from 'react'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { icon: Users, number: '2M+', label: 'Активних волонтерів' },
    { icon: Heart, number: '10K+', label: 'Організацій' },
    { icon: MapPin, number: '50K+', label: 'Проєктів щомісяця' },
  ]

  const categories = [
    { name: 'Медична допомога', icon: '🏥', color: 'bg-red-100 text-red-700' },
    { name: 'Освіта', icon: '📚', color: 'bg-blue-100 text-blue-700' },
    { name: 'Допомога ВПО', icon: '🏠', color: 'bg-green-100 text-green-700' },
    { name: 'Допомога ЗСУ', icon: '🪖', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Екологія', icon: '🌱', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Тваринки', icon: '🐾', color: 'bg-orange-100 text-orange-700' },
    { name: 'Культура', icon: '🎭', color: 'bg-purple-100 text-purple-700' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Об'єднуймо зусилля для допомоги Україні
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Знайди можливості для волонтерства або опублікуй потреби своєї організації
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Шукай можливості для волонтерства..."
                className="flex-1 px-4 py-3 text-gray-900 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link
                to={`/opportunities?search=${searchQuery}`}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Шукати
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Категорії можливостей</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/opportunities?category=${category.name}`}
                className={`${category.color} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Готовий допомогти?</h2>
            <p className="text-xl mb-8 text-red-100">
              Знайди актуальні можливості для волонтерства в твоєму регіоні
            </p>
            <Link
              to="/opportunities"
              className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Переглянути можливості</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

