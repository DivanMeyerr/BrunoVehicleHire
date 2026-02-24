import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-6">
            <div className="max-w-6xl mx-auto flex items-center gap-8">
                <img src='src/assets/Bruno_Logo.png' className="h-30 w-30" alt="Bruno Vehicle Hire Logo" />

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-md font-medium transition-colors ${isActive
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                        }`
                    }
                >
                    Vehicles
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `text-md font-medium transition-colors ${isActive
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                        }`
                    }
                >
                    History
                </NavLink>
            </div>
        </nav>
    )
}