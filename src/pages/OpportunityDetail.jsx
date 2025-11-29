import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Users, Clock, CheckCircle, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

function OpportunityDetail() {
  const { id } = useParams()
  const [isApplied, setIsApplied] = useState(false)

  // Mock data - в реальному додатку це буде з API
  const opportunity = {
    id: parseInt(id),
    title: 'Допомога ВПО з продуктами',
    organization: 'Благодійний фонд "Допомога"',
    organizationId: 1,
    location: 'Київ, вул. Хрещатик, 1',
    category: 'Допомога ВПО',
    date: '2025-12-01',
    time: '10:00',
    volunteersNeeded: 5,
    volunteersApplied: 3,
    description: 'Потрібна допомога з розподілом продуктів для ВПО. Ми шукаємо волонтерів, які готові допомогти з організацією та розподілом продуктів харчування для внутрішньо переміщених осіб.',
    requirements: [
      'Вік від 18 років',
      'Фізична витривалість',
      'Відповідальність',
      'Готовність працювати в команді'
    ],
    contact: {
      email: 'help@fond.ua',
      phone: '+380 XX XXX XX XX'
    }
  }

  const handleApply = () => {
    setIsApplied(true)
    // Тут буде логіка відправки заявки
  }

  const progress = (opportunity.volunteersApplied / opportunity.volunteersNeeded) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/opportunities"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад до можливостей
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">
                  {opportunity.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{opportunity.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2 text-red-600" />
                <span>{new Date(opportunity.date).toLocaleDateString('uk-UA')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                <span>{opportunity.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-red-600" />
                <span>{opportunity.organization}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Волонтерів: {opportunity.volunteersApplied} / {opportunity.volunteersNeeded}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Опис</h2>
            <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Вимоги</h2>
            <ul className="space-y-2">
              {opportunity.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Контакти</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {opportunity.contact.email}</p>
              <p><strong>Телефон:</strong> {opportunity.contact.phone}</p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="border-t pt-6">
            {isApplied ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-semibold">Ви успішно подали заявку!</p>
                <p className="text-green-600 text-sm mt-1">Організація зв'яжеться з вами найближчим часом</p>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={opportunity.volunteersApplied >= opportunity.volunteersNeeded}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
                  opportunity.volunteersApplied >= opportunity.volunteersNeeded
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {opportunity.volunteersApplied >= opportunity.volunteersNeeded
                  ? 'Всі місця заповнені'
                  : 'Подати заявку на волонтерство'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpportunityDetail

