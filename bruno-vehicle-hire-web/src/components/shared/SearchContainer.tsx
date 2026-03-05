import { useState, useImperativeHandle, forwardRef } from 'react'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import { useSearchContainerContext } from '../../contexts/SearchContainerContext'

export interface SearchPaginationState {
    pageNumber: number
    pageSize: number
    searchTerm: string
}

interface SearchPaginationContainerProps {
    pageName: string
    totalCount: number
    totalPages: number
    itemCount: number
    onChange: (state: SearchPaginationState) => void
    searchPlaceholder?: string
    children: React.ReactNode
}

export interface SearchPaginationContainerRef {
    refresh: () => void
}

const SearchPaginationContainer = forwardRef<SearchPaginationContainerRef, SearchPaginationContainerProps>(({
    pageName,
    totalCount,
    totalPages,
    itemCount,
    onChange,
    searchPlaceholder,
    children,
}, ref) => {
    const { getState, setState } = useSearchContainerContext()
    const [state, setLocalState] = useState<SearchPaginationState>(getState(pageName))

    useImperativeHandle(ref, () => ({
        refresh: () => onChange(state),
    }), [state, onChange])

    const update = (partial: Partial<SearchPaginationState>) => {
        const newState = { ...state, ...partial }
        setLocalState(newState)
        setState(pageName, newState)
        onChange(newState)
    }

    return (
        <div>
            <div className="mb-4">
                <SearchBar
                    onSearch={term => update({ searchTerm: term, pageNumber: 1 })}
                    placeholder={searchPlaceholder}
                    initialValue={state.searchTerm}
                />
            </div>

            {children}

            <Pagination
                pageNumber={state.pageNumber}
                pageSize={state.pageSize}
                totalPages={totalPages}
                totalCount={totalCount}
                itemCount={itemCount}
                onPageChange={page => update({ pageNumber: page })}
                onPageSizeChange={size => update({ pageSize: size, pageNumber: 1 })}
            />
        </div>
    )
})

export default SearchPaginationContainer