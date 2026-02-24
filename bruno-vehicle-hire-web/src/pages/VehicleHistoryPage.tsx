import { useState, useEffect } from 'react'
import type { Vehicle } from '../models/Vehicle'
import vehicleService from '../services/VehicleApiService'
import Toast from '../components/shared/Toast'
import VehiclesTable from '../components/vehicles/VehicleTable'

export default function VehicleHistoryPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

    useEffect(() => {
        const fetchDeleted = async () => {
            try {
                setLoading(true)
                const response = await vehicleService.getDeleted()
                setVehicles(response.data)
            } catch (err) {
                if (err instanceof Error)
                    setToast({ message: err.message, type: 'error' })
            } finally {
                setLoading(false)
            }
        }
        fetchDeleted()
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Deleted Vehicles</h1>
                <span className="text-sm text-gray-500">
                    {vehicles.length} record{vehicles.length !== 1 ? 's' : ''}
                </span>
            </div>

            <VehiclesTable
                vehicles={vehicles}
                loading={loading}
                emptyMessage="No deleted vehicles found"
                extraColumns={['Deleted On']}
                renderExtraColumns={(vehicle: Vehicle) => (
                    <td className="px-4 py-3 text-sm text-gray-500">
                        {vehicle.deletedDate ? new Date(vehicle.deletedDate).toLocaleDateString('en-ZA', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </td>
                )}
            />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    )
}