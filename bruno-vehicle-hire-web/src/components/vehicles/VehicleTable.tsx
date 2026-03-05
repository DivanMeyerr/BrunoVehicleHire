import type { Vehicle } from '../../models/Vehicle'
import { Pencil, Trash2 } from 'lucide-react'

interface VehiclesTableProps {
    vehicles: Vehicle[]
    loading: boolean
    deletingId?: string
    onEdit?: (registrationNumber: string) => void
    onDelete?: (id: string) => void
    emptyMessage?: string
    extraColumns?: string[]
    renderExtraColumns?: (vehicle: Vehicle) => React.ReactNode
}

export default function VehiclesTable({
    vehicles,
    loading,
    deletingId,
    onEdit,
    onDelete,
    emptyMessage = 'No vehicles found',
    extraColumns = [],
    renderExtraColumns,
}: VehiclesTableProps) {
    const showActions = onEdit || onDelete
    const columns = ['Registration', 'Make', 'Model', 'Year', ...extraColumns, ...(showActions ? ['Actions'] : [])]

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {columns.map(col => (
                            <th key={col} className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                                Loading...
                            </td>
                        </tr>
                    ) : vehicles?.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        vehicles?.map(vehicle => (
                            <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-mono text-sm">{vehicle.registrationNumber}</td>
                                <td className="px-4 py-3">{vehicle.make}</td>
                                <td className="px-4 py-3">{vehicle.model}</td>
                                <td className="px-4 py-3">{vehicle.year}</td>
                                {renderExtraColumns?.(vehicle)}
                                {showActions && (
                                    <td className="px-4 py-3">
                                        <div className="flex gap-3">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(vehicle.registrationNumber)}
                                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(vehicle.id)}
                                                    disabled={deletingId === vehicle.id}
                                                    className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}