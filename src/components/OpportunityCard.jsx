import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'

function OpportunityCard({ opportunity }) {
  const progress = (opportunity.volunteersApplied / opportunity.volunteersNeeded) * 100

  return (
    <Link to={`/opportunities/${opportunity.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
              {opportunity.category}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{opportunity.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(opportunity.date).toLocaleDateString('uk-UA')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{opportunity.organization}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Волонтерів: {opportunity.volunteersApplied} / {opportunity.volunteersNeeded}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center text-red-600 font-semibold mt-auto pt-4 border-t">
          <span>Детальніше</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  )
}

export default OpportunityCard

