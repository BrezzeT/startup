import { useState } from 'react'
import { User, Mail, Phone, MapPin, Building, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { saveProfile } from '../utils/profile'

// Список областей та міст України
const regions = {
  'Київська': ['Київ', 'Біла Церква', 'Бровари', 'Вишгород', 'Ірпінь', 'Обухів', 'Фастів', 'Інше місто/село'],
  'Львівська': ['Львів', 'Дрогобич', 'Стрий', 'Трускавець', 'Червоноград', 'Самбір', 'Інше місто/село'],
  'Одеська': ['Одеса', 'Ізмаїл', 'Чорноморськ', 'Білгород-Дністровський', 'Южне', 'Інше місто/село'],
  'Харківська': ['Харків', 'Ізюм', 'Куп\'янськ', 'Чугуїв', 'Лозова', 'Інше місто/село'],
  'Дніпропетровська': ['Дніпро', 'Кривий Ріг', 'Нікополь', 'Каменське', 'Марганець', 'Інше місто/село'],
  'Донецька': ['Донецьк', 'Маріуполь', 'Краматорськ', 'Слов\'янськ', 'Бахмут', 'Інше місто/село'],
  'Запорізька': ['Запоріжжя', 'Мелітополь', 'Бердянськ', 'Енергодар', 'Інше місто/село'],
  'Івано-Франківська': ['Івано-Франківськ', 'Калуш', 'Коломия', 'Яремче', 'Інше місто/село'],
  'Київ': ['Київ', 'Інше місто/село'],
  'Луганська': ['Луганськ', 'Сєвєродонецьк', 'Лисичанськ', 'Рубіжне', 'Інше місто/село'],
  'Вінницька': ['Вінниця', 'Жмеринка', 'Хмільник', 'Інше місто/село'],
  'Волинська': ['Луцьк', 'Ковель', 'Нововолинськ', 'Інше місто/село'],
  'Закарпатська': ['Ужгород', 'Мукачеве', 'Хуст', 'Інше місто/село'],
  'Полтавська': ['Полтава', 'Кременчук', 'Лубни', 'Інше місто/село'],
  'Рівненська': ['Рівне', 'Дубно', 'Інше місто/село'],
  'Сумська': ['Суми', 'Конотоп', 'Шостка', 'Інше місто/село'],
  'Тернопільська': ['Тернопіль', 'Чортків', 'Інше місто/село'],
  'Херсонська': ['Херсон', 'Нова Каховка', 'Інше місто/село'],
  'Хмельницька': ['Хмельницький', 'Кам\'янець-Подільський', 'Інше місто/село'],
  'Черкаська': ['Черкаси', 'Умань', 'Інше місто/село'],
  'Чернівецька': ['Чернівці', 'Інше місто/село'],
  'Чернігівська': ['Чернігів', 'Ніжин', 'Інше місто/село'],
}

const regionNames = Object.keys(regions)

function CreateProfile() {
  const navigate = useNavigate()
  const [profileType, setProfileType] = useState('volunteer') // 'volunteer' or 'organization'
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [customCity, setCustomCity] = useState('')
  const [useCustomCity, setUseCustomCity] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    website: '',
    category: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Формуємо локацію
    let location = ''
    if (selectedRegion) {
      if (useCustomCity && customCity) {
        location = `${customCity}, ${selectedRegion}`
      } else if (selectedCity && selectedCity !== 'Інше місто/село') {
        location = `${selectedCity}, ${selectedRegion}`
      } else if (customCity) {
        location = `${customCity}, ${selectedRegion}`
      } else {
        location = selectedRegion
      }
    }
    
    // Зберігаємо профіль в localStorage
    const profileData = {
      type: profileType,
      ...formData,
      location: location,
      region: selectedRegion,
      city: useCustomCity ? customCity : selectedCity,
      createdAt: new Date().toISOString(),
      rating: 0,
      completedOpportunities: 0,
      hoursVolunteered: 0,
      badges: [],
    }
    saveProfile(profileData)
    // Оновлюємо Header через кастомну подію
    window.dispatchEvent(new Event('profileUpdated'))
    // Після створення перенаправляємо на профіль
    navigate('/profile')
  }
  
  const handleRegionChange = (e) => {
    const region = e.target.value
    setSelectedRegion(region)
    setSelectedCity('')
    setCustomCity('')
    setUseCustomCity(false)
  }
  
  const handleCityChange = (e) => {
    const city = e.target.value
    setSelectedCity(city)
    if (city === 'Інше місто/село') {
      setUseCustomCity(true)
    } else {
      setUseCustomCity(false)
      setCustomCity('')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const categories = [
    'Медична допомога',
    'Освіта',
    'Допомога ВПО',
    'Допомога ЗСУ',
    'Екологія',
    'Тваринки',
    'Культура',
    'Соціальна допомога',
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          to="/profile"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Створити профіль</h1>

          {/* Profile Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Тип профілю
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setProfileType('volunteer')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  profileType === 'volunteer'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <User className={`w-8 h-8 mb-3 ${profileType === 'volunteer' ? 'text-red-600' : 'text-gray-400'}`} />
                <h3 className="font-semibold text-lg mb-1">Волонтер</h3>
                <p className="text-sm text-gray-600">Створити профіль волонтера</p>
              </button>
              <button
                type="button"
                onClick={() => setProfileType('organization')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  profileType === 'organization'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Building className={`w-8 h-8 mb-3 ${profileType === 'organization' ? 'text-red-600' : 'text-gray-400'}`} />
                <h3 className="font-semibold text-lg mb-1">Організація</h3>
                <p className="text-sm text-gray-600">Створити профіль організації</p>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {profileType === 'volunteer' ? 'Ім\'я та прізвище' : 'Назва організації'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={profileType === 'volunteer' ? 'Іван Петренко' : 'Назва вашої організації'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="+380 XX XXX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Локація
              </label>
              
              {/* Область */}
              <div className="mb-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <select
                    required
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Оберіть область</option>
                    {regionNames.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Місто/Село */}
              {selectedRegion && (
                <div>
                  {!useCustomCity ? (
                    <div className="relative">
                      <select
                        required
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Оберіть місто або село</option>
                        {regions[selectedRegion]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Введіть назву міста або села"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {profileType === 'organization' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категорія
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Оберіть категорію</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Веб-сайт (необов'язково)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="www.example.ua"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {profileType === 'volunteer' ? 'Про себе' : 'Про організацію'}
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={profileType === 'volunteer' 
                  ? 'Розкажіть про себе, свої навички та досвід волонтерства...'
                  : 'Опишіть вашу організацію, місію та цілі...'}
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Створити профіль
              </button>
              <Link
                to="/profile"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile

