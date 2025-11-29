import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Виправлення іконок Leaflet (проблема з webpack)
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

L.Marker.prototype.options.icon = DefaultIcon

// Координати міст України
const cityCoordinates = {
  'Київ': [50.4501, 30.5234],
  'Львів': [49.8397, 24.0297],
  'Одеса': [46.4825, 30.7233],
  'Харків': [49.9935, 36.2304],
  'Дніпро': [48.4647, 35.0462],
  'Херсон': [46.6354, 32.6169],
}

// Реальні українські волонтерські організації з локаціями
// Координати трохи змінені для організацій в одному місті, щоб маркери не накладалися
const organizations = [
  {
    id: 1,
    name: 'Благодійний фонд "Повернись живим"',
    location: 'Київ',
    coordinates: [50.4501, 30.5234], // Центр Києва
    category: 'Допомога ЗСУ',
  },
  {
    id: 2,
    name: 'Благодійний фонд "Серце до серця"',
    location: 'Львів',
    coordinates: [49.8397, 24.0297], // Центр Львова
    category: 'Допомога ВПО',
  },
  {
    id: 3,
    name: 'Волонтерська організація "Українська Притулок"',
    location: 'Київ',
    coordinates: [50.4600, 30.5100], // Трохи зміщено від центру
    category: 'Тваринки',
  },
  {
    id: 4,
    name: 'Освітній фонд "Освіта майбутнього"',
    location: 'Львів',
    coordinates: [49.8500, 24.0200], // Трохи зміщено від центру
    category: 'Освіта',
  },
  {
    id: 5,
    name: 'Медичний волонтерський центр "Допомога"',
    location: 'Харків',
    coordinates: [49.9935, 36.2304], // Центр Харкова
    category: 'Медична допомога',
  },
  {
    id: 6,
    name: 'Екологічна ініціатива "Чиста Україна"',
    location: 'Київ',
    coordinates: [50.4400, 30.5350], // Трохи зміщено від центру
    category: 'Екологія',
  },
  {
    id: 7,
    name: 'Культурний центр "Українська душа"',
    location: 'Одеса',
    coordinates: [46.4825, 30.7233], // Центр Одеси
    category: 'Культура',
  },
]

// Кастомна іконка маркера (червона)
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 30px;
      height: 30px;
      background-color: #dc2626;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

function Map() {
  const navigate = useNavigate()

  const handleMarkerClick = (orgId) => {
    navigate(`/organizations/${orgId}`)
  }

  // Центр України
  const center = [48.3794, 31.1656]
  const zoom = 6

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Карта організацій</h1>
        <p className="text-gray-600 mb-6">
          Натисніть на маркер, щоб переглянути профіль організації
        </p>
      </div>
      
      <div className="relative" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%', zIndex: 1 }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {organizations.map((org) => (
            <Marker
              key={org.id}
              position={org.coordinates}
              icon={createCustomIcon()}
              eventHandlers={{
                click: () => handleMarkerClick(org.id),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm mb-1">{org.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{org.location}</p>
                  <p className="text-xs text-gray-500">{org.category}</p>
                  <button
                    onClick={() => handleMarkerClick(org.id)}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 font-semibold"
                  >
                    Переглянути профіль →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Легенда */}
      <div className="container mx-auto px-4 py-4 bg-white border-t">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Організації</span>
          </div>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">
            Знайдено: {organizations.length} організацій
          </span>
        </div>
      </div>
    </div>
  )
}

export default Map

