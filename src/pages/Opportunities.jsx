import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, Filter, X } from 'lucide-react'
import OpportunityCard from '../components/OpportunityCard'

// Mock data
  const mockOpportunities = [
    {
      id: 1,
      title: 'Допомога ВПО з продуктами',
      organization: 'Благодійний фонд "Допомога"',
      location: 'Київ',
      category: 'Допомога ВПО',
      date: '2025-12-01',
      volunteersNeeded: 5,
      volunteersApplied: 3,
      description: 'Потрібна допомога з розподілом продуктів для ВПО',
      status: 'active',
    },
    {
      id: 2,
      title: 'Навчання дітей англійською',
      organization: 'Освітній центр "Майбутнє"',
      location: 'Львів',
      category: 'Освіта',
      date: '2025-12-05',
      volunteersNeeded: 10,
      volunteersApplied: 7,
      description: 'Шукаємо волонтерів для навчання дітей англійською мовою',
      status: 'active',
    },
    {
      id: 3,
      title: 'Медична допомога в лікарні',
      organization: 'Міська лікарня №1',
      location: 'Одеса',
      category: 'Медична допомога',
      date: '2025-12-03',
      volunteersNeeded: 8,
      volunteersApplied: 5,
      description: 'Потрібні волонтери для допомоги медперсоналу',
      status: 'active',
    },
    {
      id: 4,
      title: 'Прибирання парку',
      organization: 'Екологічна ініціатива',
      location: 'Харків',
      category: 'Екологія',
      date: '2025-12-10',
      volunteersNeeded: 20,
      volunteersApplied: 15,
      description: 'Організуємо прибирання міського парку',
      status: 'active',
    },
    {
      id: 5,
      title: 'Збір гуманітарної допомоги для ЗСУ',
      organization: 'Волонтерський центр "Підтримка"',
      location: 'Київ',
      category: 'Допомога ЗСУ',
      date: '2025-12-07',
      volunteersNeeded: 15,
      volunteersApplied: 12,
      description: 'Потрібна допомога зі збором та сортуванням гуманітарної допомоги для військових',
      status: 'active',
    },
    {
      id: 6,
      title: 'Пошиття маскувальних сіток',
      organization: 'Волонтерський центр "Підтримка"',
      location: 'Львів',
      category: 'Допомога ЗСУ',
      date: '2025-12-08',
      volunteersNeeded: 25,
      volunteersApplied: 18,
      description: 'Шукаємо волонтерів для пошиття маскувальних сіток для ЗСУ',
      status: 'active',
    },
  ]

function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [opportunities, setOpportunities] = useState(mockOpportunities)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['Всі', 'Медична допомога', 'Освіта', 'Допомога ВПО', 'Допомога ЗСУ', 'Екологія', 'Тваринки', 'Культура']
  const locations = ['Всі', 'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро']

  useEffect(() => {
    let filtered = [...mockOpportunities]

    if (searchQuery) {
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory && selectedCategory !== 'Всі') {
      filtered = filtered.filter(opp => opp.category === selectedCategory)
    }

    if (selectedLocation && selectedLocation !== 'Всі') {
      filtered = filtered.filter(opp => opp.location === selectedLocation)
    }

    setOpportunities(filtered)
  }, [searchQuery, selectedCategory, selectedLocation])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedLocation('')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Можливості для волонтерства</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Шукати можливості..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              <span>Фільтри</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категорія</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat === 'Всі' ? '' : cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Локація</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc === 'Всі' ? '' : loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {(selectedCategory || selectedLocation || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                  <span>Очистити фільтри</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 text-gray-600">
          Знайдено: <span className="font-semibold">{opportunities.length}</span> можливостей
        </div>

        {/* Opportunities Grid */}
        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map(opportunity => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">Не знайдено можливостей за вашими критеріями</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-red-600 hover:text-red-700"
            >
              Очистити фільтри
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Opportunities

