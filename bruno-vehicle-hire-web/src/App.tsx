import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VehicleListPage from './pages/VehicleListPage'
import Navbar from './components/navbar/Navbar'
import VehicleHistoryPage from './pages/VehicleHistoryPage'
import { SearchContainerProvider } from './contexts/SearchContainerContext'

function App() {
  return (
    <BrowserRouter>
      <SearchContainerProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<VehicleListPage />} />
              <Route path="/history" element={<VehicleHistoryPage />} />
            </Routes>
          </main>
        </div>
      </SearchContainerProvider>
    </BrowserRouter>
  )
}

export default App