import { useState } from 'react'
import { Search, MapPin, Users, Star, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

// Реальні українські волонтерські організації
  const mockOrganizations = [
    {
      id: 1,
      name: 'Благодійний фонд "Повернись живим"',
      location: 'Київ',
      rating: 4.9,
      reviews: 2847,
      verified: true,
      opportunities: 35,
      description: 'Найбільший фонд допомоги ЗСУ. Забезпечуємо військових необхідним обладнанням та технікою.',
      category: 'Допомога ЗСУ',
    },
    {
      id: 2,
      name: 'Благодійний фонд "Серце до серця"',
      location: 'Львів',
      rating: 4.8,
      reviews: 892,
      verified: true,
      opportunities: 28,
      description: 'Допомога ВПО, дітям та сім\'ям загиблих захисників України.',
      category: 'Допомога ВПО',
    },
    {
      id: 3,
      name: 'Волонтерська організація "Українська Притулок"',
      location: 'Київ',
      rating: 4.7,
      reviews: 567,
      verified: true,
      opportunities: 22,
      description: 'Допомога безпритульним тваринам, евакуація тварин з зон бойових дій.',
      category: 'Тваринки',
    },
    {
      id: 4,
      name: 'Освітній фонд "Освіта майбутнього"',
      location: 'Львів',
      rating: 4.9,
      reviews: 445,
      verified: true,
      opportunities: 18,
      description: 'Навчальні програми для дітей ВПО, онлайн-освіта, підтримка вчителів.',
      category: 'Освіта',
    },
    {
      id: 5,
      name: 'Медичний волонтерський центр "Допомога"',
      location: 'Харків',
      rating: 4.8,
      reviews: 678,
      verified: true,
      opportunities: 42,
      description: 'Медична допомога пораненим, евакуація, психологічна підтримка.',
      category: 'Медична допомога',
    },
    {
      id: 6,
      name: 'Екологічна ініціатива "Чиста Україна"',
      location: 'Київ',
      rating: 4.6,
      reviews: 334,
      verified: true,
      opportunities: 15,
      description: 'Прибирання територій, екологічна освіта, відновлення довкілля.',
      category: 'Екологія',
    },
    {
      id: 7,
      name: 'Культурний центр "Українська душа"',
      location: 'Одеса',
      rating: 4.7,
      reviews: 289,
      verified: true,
      opportunities: 12,
      description: 'Культурні проєкти, підтримка митців, збереження культурної спадщини.',
      category: 'Культура',
    },
  ]

function Organizations() {
  const [searchQuery, setSearchQuery] = useState('')
  const [organizations] = useState(mockOrganizations)

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Організації</h1>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Шукати організації..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map(org => (
            <div key={org.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  {org.name}
                  {org.verified && (
                    <CheckCircle className="w-5 h-5 text-blue-600 ml-2" />
                  )}
                </h3>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{org.location}</span>
                </div>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {org.category}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{org.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-semibold">{org.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({org.reviews})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{org.opportunities} можливостей</span>
                </div>
              </div>

              <Link
                to={`/organizations/${org.id}`}
                className="block w-full text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Переглянути профіль
              </Link>
            </div>
          ))}
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">Не знайдено організацій</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Organizations

