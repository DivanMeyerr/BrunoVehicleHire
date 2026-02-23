import { useState, useEffect } from 'react'

interface SearchBarProps {
    onSearch: (searchTerm: string) => void
    placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
    const [input, setInput] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(input)
        }, 300)

        return () => clearTimeout(timer)
    }, [input])

    return (
        <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}