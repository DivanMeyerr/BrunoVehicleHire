import { useState, useEffect } from 'react'
import type { VehicleRequest } from '../../services/VehicleApiService'

interface FormErrors {
    registrationNumber?: string
    make?: string
    model?: string
    year?: string
}

interface VehicleFormDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (values: VehicleRequest) => Promise<void>
    initialValues?: VehicleRequest
    isLoading: boolean
    title?: string
}

export default function VehicleFormDialog({
    isOpen,
    onClose,
    onSubmit,
    initialValues,
    isLoading,
    title = 'Add Vehicle',
}: VehicleFormDialogProps) {
    const [values, setValues] = useState<VehicleRequest>({
        registrationNumber: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
    })
    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        if (isOpen) {
            setValues({
                registrationNumber: initialValues?.registrationNumber ?? '',
                make: initialValues?.make ?? '',
                model: initialValues?.model ?? '',
                year: initialValues?.year ?? new Date().getFullYear(),
            })
            setErrors({})
        }
    }, [isOpen, initialValues])

    const validate = (): boolean => {
        const newErrors: FormErrors = {}

        if (!values.registrationNumber.trim())
            newErrors.registrationNumber = 'Registration number is required'
        else if (values.registrationNumber.length > 20)
            newErrors.registrationNumber = 'Maximum 20 characters'

        if (!values.make.trim())
            newErrors.make = 'Make is required'

        if (!values.model.trim())
            newErrors.model = 'Model is required'

        if (!values.year || values.year < 1900 || values.year > new Date().getFullYear() + 1)
            newErrors.year = `Year must be between 1900 and ${new Date().getFullYear() + 1}`

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        await onSubmit(values)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues(prev => ({
            ...prev,
            [name]: name === 'year' ? parseInt(value) : value
        }))
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registration Number
                        </label>
                        <input
                            name="registrationNumber"
                            value={values.registrationNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. CA 123-456"
                        />
                        {errors.registrationNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Make
                        </label>
                        <input
                            name="make"
                            value={values.make}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Toyota"
                        />
                        {errors.make && (
                            <p className="text-red-500 text-sm mt-1">{errors.make}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Model
                        </label>
                        <input
                            name="model"
                            value={values.model}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Corolla"
                        />
                        {errors.model && (
                            <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                        </label>
                        <input
                            name="year"
                            type="number"
                            value={values.year}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 2020"
                        />
                        {errors.year && (
                            <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}