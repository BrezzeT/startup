import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Award, Heart, Settings, X, LogOut, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getProfile, hasProfile, updateProfile, clearProfile } from '../utils/profile'

function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    description: '',
  })

  useEffect(() => {
    if (!hasProfile()) {
      // Якщо профілю немає, перенаправляємо на створення
      navigate('/create-profile')
      return
    }
    
    loadProfile()
  }, [navigate])

  const loadProfile = () => {
    const profileData = getProfile()
    if (profileData) {
      const userData = {
        name: profileData.name || 'Користувач',
        email: profileData.email || '',
        phone: profileData.phone || '',
        location: profileData.location || '',
        joinDate: profileData.createdAt || new Date().toISOString(),
        rating: profileData.rating || 0,
        completedOpportunities: profileData.completedOpportunities || 0,
        hoursVolunteered: profileData.hoursVolunteered || 0,
        badges: profileData.badges || [],
        description: profileData.description || '',
        type: profileData.type || 'volunteer',
      }
      setUser(userData)
      setEditForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        description: userData.description,
      })
    }
  }

  const handleEditClick = () => {
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    const updated = updateProfile(editForm)
    if (updated) {
      loadProfile()
      setShowEditModal(false)
      window.dispatchEvent(new Event('profileUpdated'))
    }
  }

  const handleLogout = () => {
    if (window.confirm('Ви впевнені, що хочете вийти з профілю?')) {
      clearProfile()
      window.dispatchEvent(new Event('profileUpdated'))
      navigate('/')
    }
  }

  const activities = [
    { id: 1, title: 'Допомога ВПО з продуктами', date: '2025-11-20', status: 'completed' },
    { id: 2, title: 'Навчання дітей англійською', date: '2025-11-15', status: 'completed' },
    { id: 3, title: 'Прибирання парку', date: '2025-12-10', status: 'upcoming' },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Завантаження профілю...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleEditClick}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Settings className="w-4 h-4" />
                <span>Налаштування</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Вийти</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Рейтинг</p>
                <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Завершено</p>
                <p className="text-2xl font-bold text-gray-900">{user.completedOpportunities}</p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Годин</p>
                <p className="text-2xl font-bold text-gray-900">{user.hoursVolunteered}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">З нами з</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(user.joinDate).toLocaleDateString('uk-UA', { month: 'short', year: 'numeric' })}
                </p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <div className="flex space-x-4 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Огляд
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === 'activities'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Активність
              </button>
              <button
                onClick={() => setActiveTab('badges')}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === 'badges'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Досягнення
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Про мене</h2>
                <p className="text-gray-700 mb-6">
                  {user.description || (user.type === 'volunteer' 
                    ? 'Активний волонтер з досвідом роботи в різних соціальних проєктах. Допомагаю організаціям та потребуючим людям по всій Україні.'
                    : 'Організація, яка працює над покращенням життя людей в Україні.')}
                </p>
                {user.type === 'volunteer' && (
                  <>
                    <h3 className="text-xl font-bold mb-4">Навички</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Організація', 'Комунікація', 'Робота з дітьми', 'Логістика'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'activities' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Моя активність</h2>
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <p className="text-gray-600 text-sm">
                            {new Date(activity.date).toLocaleDateString('uk-UA')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          activity.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {activity.status === 'completed' ? 'Завершено' : 'Заплановано'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Досягнення</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 text-center">
                      <Award className="w-12 h-12 text-red-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900">{badge}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальне вікно редагування профілю */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Редагувати профіль</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ім'я
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Локація
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Про себе
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Зберегти</span>
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

