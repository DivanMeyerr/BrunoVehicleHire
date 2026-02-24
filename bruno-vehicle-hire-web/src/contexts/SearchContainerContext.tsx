import { createContext, useContext, useState } from 'react'
import type { SearchPaginationState } from '../components/shared/SearchContainer'

interface SearchContainerContextType {
    getState: (pageName: string) => SearchPaginationState
    setState: (pageName: string, state: SearchPaginationState) => void
}

const defaultState: SearchPaginationState = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
}

const SearchContainerContext = createContext<SearchContainerContextType | null>(null)

export function SearchContainerProvider({ children }: { children: React.ReactNode }) {
    const [states, setStates] = useState<Record<string, SearchPaginationState>>({})

    const getState = (pageName: string): SearchPaginationState => {
        return states[pageName] ?? defaultState
    }

    const setState = (pageName: string, state: SearchPaginationState) => {
        setStates(prev => ({ ...prev, [pageName]: state }))
    }

    return (
        <SearchContainerContext.Provider value={{ getState, setState }}>
            {children}
        </SearchContainerContext.Provider>
    )
}

export function useSearchContainerContext() {
    const context = useContext(SearchContainerContext)
    if (!context)
        throw new Error('useSearchContainerContext must be used within a SearchContainerProvider')
    return context
}