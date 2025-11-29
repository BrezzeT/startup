import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Users, Star, CheckCircle, Mail, Phone, Globe, ArrowLeft, Calendar, MessageCircle, X } from 'lucide-react'

function OrganizationDetail() {
  const { id } = useParams()
  const [showContactModal, setShowContactModal] = useState(false)

  // Реальні українські волонтерські організації
  const organizations = {
    1: {
      id: 1,
      name: 'Благодійний фонд "Повернись живим"',
      location: 'Київ',
      rating: 4.9,
      reviews: 2847,
      verified: true,
      opportunities: 35,
      description: 'Найбільший фонд допомоги ЗСУ. Забезпечуємо військових необхідним обладнанням та технікою.',
      category: 'Допомога ЗСУ',
      email: 'info@comebackalive.in.ua',
      phone: '+380 44 235 01 01',
      telegram: '@comebackalive',
      website: 'comebackalive.in.ua',
      founded: '2014',
      volunteers: 1500,
      completedProjects: 1200,
      about: 'Благодійний фонд "Повернись живим" - найбільша волонтерська організація, яка допомагає ЗСУ з 2014 року. Ми забезпечуємо військових технікою, обладнанням та навчанням.',
    },
    2: {
      id: 2,
      name: 'Благодійний фонд "Серце до серця"',
      location: 'Львів',
      rating: 4.8,
      reviews: 892,
      verified: true,
      opportunities: 28,
      description: 'Допомога ВПО, дітям та сім\'ям загиблих захисників України.',
      category: 'Допомога ВПО',
      email: 'info@hearttoheart.ua',
      phone: '+380 32 235 67 89',
      telegram: '@hearttoheart_ua',
      website: 'hearttoheart.ua',
      founded: '2022',
      volunteers: 450,
      completedProjects: 180,
      about: 'Фонд "Серце до серця" допомагає внутрішньо переміщеним особам, дітям та сім\'ям загиблих героїв. Ми надаємо житло, продукти, одяг та психологічну підтримку.',
    },
    3: {
      id: 3,
      name: 'Волонтерська організація "Українська Притулок"',
      location: 'Київ',
      rating: 4.7,
      reviews: 567,
      verified: true,
      opportunities: 22,
      description: 'Допомога безпритульним тваринам, евакуація тварин з зон бойових дій.',
      category: 'Тваринки',
      email: 'help@ukrainian-shelter.ua',
      phone: '+380 50 123 45 67',
      telegram: '@ukrainian_shelter',
      website: 'ukrainian-shelter.ua',
      founded: '2022',
      volunteers: 320,
      completedProjects: 95,
      about: 'Ми рятуємо тварин з зон бойових дій, надаємо їм притулок, лікування та знаходимо нові домівки. Вже врятували понад 2000 тварин.',
    },
    4: {
      id: 4,
      name: 'Освітній фонд "Освіта майбутнього"',
      location: 'Львів',
      rating: 4.9,
      reviews: 445,
      verified: true,
      opportunities: 18,
      description: 'Навчальні програми для дітей ВПО, онлайн-освіта, підтримка вчителів.',
      category: 'Освіта',
      email: 'info@education-future.ua',
      phone: '+380 32 234 56 78',
      telegram: '@education_future',
      website: 'education-future.ua',
      founded: '2022',
      volunteers: 280,
      completedProjects: 65,
      about: 'Фонд забезпечує освіту дітям, які через війну втратили доступ до школи. Ми організовуємо онлайн-навчання, надаємо планшети та підтримуємо вчителів.',
    },
    5: {
      id: 5,
      name: 'Медичний волонтерський центр "Допомога"',
      location: 'Харків',
      rating: 4.8,
      reviews: 678,
      verified: true,
      opportunities: 42,
      description: 'Медична допомога пораненим, евакуація, психологічна підтримка.',
      category: 'Медична допомога',
      email: 'medhelp@volunteer.ua',
      phone: '+380 57 123 45 67',
      telegram: '@medhelp_ua',
      website: 'medhelp.volunteer.ua',
      founded: '2022',
      volunteers: 650,
      completedProjects: 320,
      about: 'Медичний центр надає допомогу пораненим, організовує евакуацію, забезпечує ліками та медичним обладнанням. Працюємо 24/7.',
    },
    6: {
      id: 6,
      name: 'Екологічна ініціатива "Чиста Україна"',
      location: 'Київ',
      rating: 4.6,
      reviews: 334,
      verified: true,
      opportunities: 15,
      description: 'Прибирання територій, екологічна освіта, відновлення довкілля.',
      category: 'Екологія',
      email: 'info@cleanukraine.ua',
      phone: '+380 44 234 56 78',
      telegram: '@clean_ukraine',
      website: 'cleanukraine.ua',
      founded: '2023',
      volunteers: 200,
      completedProjects: 48,
      about: 'Ми організовуємо прибирання територій, екологічні акції та навчальні програми. Разом робимо Україну чистішою.',
    },
    7: {
      id: 7,
      name: 'Культурний центр "Українська душа"',
      location: 'Одеса',
      rating: 4.7,
      reviews: 289,
      verified: true,
      opportunities: 12,
      description: 'Культурні проєкти, підтримка митців, збереження культурної спадщини.',
      category: 'Культура',
      email: 'culture@ukrainian-soul.ua',
      phone: '+380 48 234 56 78',
      telegram: '@ukrainian_soul',
      website: 'ukrainian-soul.ua',
      founded: '2022',
      volunteers: 150,
      completedProjects: 35,
      about: 'Центр підтримує українську культуру, організовує виставки, концерти та культурні події. Зберігаємо нашу культурну спадщину.',
    },
  }

  const org = organizations[id] || organizations[1]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/organizations"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад до організацій
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <h1 className="text-3xl font-bold text-gray-900 mr-3">{org.name}</h1>
                {org.verified && (
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{org.location}</span>
                <span className="mx-2">•</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {org.category}
                </span>
              </div>
              <p className="text-gray-700 text-lg">{org.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                <span className="text-2xl font-bold">{org.rating}</span>
              </div>
              <p className="text-gray-600 text-sm">{org.reviews} відгуків</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{org.opportunities}</div>
              <p className="text-gray-600 text-sm">Активних можливостей</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{org.volunteers}</div>
              <p className="text-gray-600 text-sm">Волонтерів</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{org.completedProjects}</div>
              <p className="text-gray-600 text-sm">Завершених проєктів</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Про організацію</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{org.about}</p>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Засновано: {org.founded}</span>
              </div>
            </div>

            {/* Opportunities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Активні можливості</h2>
                <Link
                  to={`/opportunities?organization=${org.id}`}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Переглянути всі
                </Link>
              </div>
              <p className="text-gray-600">
                Наразі доступно {org.opportunities} можливостей для волонтерства
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Контакти</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-red-600" />
                  <a href={`mailto:${org.email}`} className="hover:text-red-600">
                    {org.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-red-600" />
                  <a href={`tel:${org.phone}`} className="hover:text-red-600">
                    {org.phone}
                  </a>
                </div>
                {org.website && (
                  <div className="flex items-center text-gray-700">
                    <Globe className="w-5 h-5 mr-3 text-red-600" />
                    <a href={`https://${org.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                      {org.website}
                    </a>
                  </div>
                )}
              </div>
              
              {/* Кнопка звернутися */}
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Звернутися</span>
              </button>
            </div>

            {/* Action */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Хочеш допомогти?</h3>
              <p className="text-red-100 mb-4">
                Переглянь активні можливості цієї організації
              </p>
              <Link
                to={`/opportunities?organization=${org.id}`}
                className="block w-full text-center bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Переглянути можливості
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно для звернення */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Зв'язатися з організацією</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Оберіть спосіб зв'язку з {org.name}
            </p>

            <div className="space-y-3">
              {/* Телефон */}
              <a
                href={`tel:${org.phone}`}
                className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Телефон</div>
                  <div className="text-sm text-gray-600">{org.phone}</div>
                </div>
              </a>

              {/* Telegram */}
              {org.telegram && (
                <a
                  href={`https://t.me/${org.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Telegram</div>
                    <div className="text-sm text-gray-600">{org.telegram}</div>
                  </div>
                </a>
              )}

              {/* Email */}
              <a
                href={`mailto:${org.email}`}
                className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">{org.email}</div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizationDetail

