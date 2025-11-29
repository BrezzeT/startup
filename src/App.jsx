import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Opportunities from './pages/Opportunities'
import Organizations from './pages/Organizations'
import OrganizationDetail from './pages/OrganizationDetail'
import Profile from './pages/Profile'
import CreateProfile from './pages/CreateProfile'
import OpportunityDetail from './pages/OpportunityDetail'
import Map from './pages/Map'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:id" element={<OrganizationDetail />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-profile" element={<CreateProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
