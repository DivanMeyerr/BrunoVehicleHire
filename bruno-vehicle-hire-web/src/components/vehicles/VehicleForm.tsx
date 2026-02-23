import { useState } from 'react'
import type { CreateVehicleRequest } from '../../services/VehicleApiService'

interface VehicleFormProps {
    initialValues?: CreateVehicleRequest
    onSubmit: (values: CreateVehicleRequest) => Promise<void>
    isLoading: boolean
    submitLabel?: string
}

interface FormErrors {
    registrationNumber?: string
    make?: string
    model?: string
    year?: string
}

export default function VehicleForm({
    initialValues,
    onSubmit,
    isLoading,
    submitLabel = 'Save'
}: VehicleFormProps) {
    const [values, setValues] = useState<CreateVehicleRequest>({
        registrationNumber: initialValues?.registrationNumber ?? '',
        make: initialValues?.make ?? '',
        model: initialValues?.model ?? '',
        year: initialValues?.year ?? new Date().getFullYear(),
    })

    const [errors, setErrors] = useState<FormErrors>({})

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

    return (
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

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? 'Saving...' : submitLabel}
            </button>
        </form>
    )
}