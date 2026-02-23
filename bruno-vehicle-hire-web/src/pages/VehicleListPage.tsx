import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Vehicle } from '../models/Vehicle'
import type { PaginatedResult } from '../models/PaginatedResult'
import type { SearchPaginationState } from '../components/shared/SearchContainer'
import vehicleService from '../services/VehicleApiService'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import ErrorMessage from '../components/shared/ErrorMessage'
import SearchPaginationContainer from '../components/shared/SearchContainer'

export default function VehicleListPage() {
    const navigate = useNavigate()
    const [data, setData] = useState<PaginatedResult<Vehicle> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchVehicles = async ({ pageNumber, pageSize, searchTerm }: SearchPaginationState) => {
        try {
            setLoading(true)
            setError(null)
            const response = await vehicleService.getAll(pageNumber, pageSize, searchTerm)
            console.log(response)
            setData(response.data)
        } catch (err) {
            setError('Failed to load vehicles.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return
        try {
            setDeletingId(id)
            await vehicleService.delete(id)
            await fetchVehicles({ pageNumber: 1, pageSize: 10, searchTerm: '' })
        } catch (err) {
            setError('Failed to delete vehicle.')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
                <button
                    onClick={() => navigate('/vehicles/create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Vehicle
                </button>
            </div>

            {error && <ErrorMessage message={error} />}

            <SearchPaginationContainer
                totalCount={data?.totalCount ?? 0}
                totalPages={data?.totalPages ?? 0}
                itemCount={data?.items?.length ?? 0}
                onChange={fetchVehicles}
                searchPlaceholder="Search by registration, make or model..."
            >
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {['Registration', 'Make', 'Model', 'Year', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5}>
                                        <LoadingSpinner />
                                    </td>
                                </tr>
                            ) : data?.items?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-400">
                                        No vehicles found
                                    </td>
                                </tr>
                            ) : (
                                data?.items?.map(vehicle => (
                                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-sm">{vehicle.registrationNumber}</td>
                                        <td className="px-4 py-3">{vehicle.make}</td>
                                        <td className="px-4 py-3">{vehicle.model}</td>
                                        <td className="px-4 py-3">{vehicle.year}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(vehicle.id)}
                                                    disabled={deletingId === vehicle.id}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                                                >
                                                    {deletingId === vehicle.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </SearchPaginationContainer>
        </div>
    )
}