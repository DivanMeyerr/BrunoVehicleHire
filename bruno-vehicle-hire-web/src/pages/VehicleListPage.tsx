import { useRef, useState } from 'react'
import type { Vehicle, VehicleRequest } from '../models/Vehicle'
import type { PaginatedResult } from '../models/PaginatedResult'
import type { SearchPaginationState } from '../components/shared/SearchContainer'
import vehicleService from '../services/VehicleApiService'
import Toast from '../components/shared/Toast'
import SearchPaginationContainer, { type SearchPaginationContainerRef } from '../components/shared/SearchContainer'
import VehicleFormDialog from '../components/vehicles/VehicleFormDialog'
import VehiclesTable from '../components/vehicles/VehicleTable'

export default function VehicleListPage() {
    const [data, setData] = useState<PaginatedResult<Vehicle>>()
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string>("")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [formInitialValues, setFormInitialValues] = useState<VehicleRequest | undefined>(undefined)
    const [editId, setEditId] = useState<string>("")
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)
    const searchPaginationRef = useRef<SearchPaginationContainerRef>(null)

    const fetchVehicles = async ({ pageNumber, pageSize, searchTerm }: SearchPaginationState) => {
        try {
            setLoading(true)
            const response = await vehicleService.getAll(pageNumber, pageSize, searchTerm)
            setData(response.data)
        } catch (err) {
            if (err instanceof Error)
                setToast({ message: err.message, type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const onCreate = () => {
        setEditId("")
        setIsFormLoading(false)
        setFormInitialValues(undefined)
        setIsFormOpen(true)
    }

    const onEdit = async (regNumber: string) => {
        try {
            setIsFormLoading(true)
            const response = await vehicleService.getByRegistration(regNumber)
            setEditId(response.data.id)
            setFormInitialValues(response.data)
            setIsFormOpen(true)
        }
        catch (err) {
            if (err instanceof Error)
                setToast({ message: err.message, type: 'error' })
        }
        finally {
            setIsFormLoading(false)
        }
    }

    const onSubmit = async (values: VehicleRequest) => {
        try {
            setIsFormLoading(true)
            if (editId) {
                await vehicleService.update(editId, values)
            } else {
                await vehicleService.create(values)
            }
            setIsFormOpen(false)
            setToast({ message: `Vehicle ${editId ? 'updated' : 'created'} successfully!`, type: 'success' })
            searchPaginationRef.current?.refresh()
        } catch (err) {
            if (err instanceof Error)
                setToast({ message: err.message, type: 'error' })
        } finally {
            setIsFormLoading(false)
            setEditId('')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return
        try {
            setDeletingId(id)
            await vehicleService.delete(id)
            searchPaginationRef.current?.refresh()
        } catch (err) {
            if (err instanceof Error)
                setToast({ message: err.message, type: 'error' })
        } finally {
            setDeletingId("")
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
                <button
                    onClick={() => onCreate()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Vehicle
                </button>
            </div>

            <SearchPaginationContainer
                ref={searchPaginationRef}
                pageName='vehiclesList'
                totalCount={data?.totalCount ?? 0}
                totalPages={data?.totalPages ?? 0}
                itemCount={data?.items?.length ?? 0}
                onChange={fetchVehicles}
                searchPlaceholder="Search by registration, make or model..."
            >
                <VehiclesTable
                    vehicles={data?.items || []}
                    loading={loading}
                    deletingId={deletingId}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                />
            </SearchPaginationContainer>

            <VehicleFormDialog isOpen={isFormOpen} initialValues={formInitialValues} onClose={() => setIsFormOpen(false)} isLoading={isFormLoading} onSubmit={onSubmit} />

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}


        </div>
    )
}