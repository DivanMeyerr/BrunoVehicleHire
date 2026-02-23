import { useState } from 'react'
import SearchBar from './SearchBar'
import Pagination from './Pagination'

export interface SearchPaginationState {
    pageNumber: number
    pageSize: number
    searchTerm: string
}

interface SearchPaginationContainerProps {
    totalCount: number
    totalPages: number
    itemCount: number
    onChange: (state: SearchPaginationState) => void
    searchPlaceholder?: string
    children: React.ReactNode
}

export default function SearchPaginationContainer({
    totalCount,
    totalPages,
    itemCount,
    onChange,
    searchPlaceholder,
    children,
}: SearchPaginationContainerProps) {
    const [state, setState] = useState<SearchPaginationState>({
        pageNumber: 1,
        pageSize: 10,
        searchTerm: '',
    })

    const update = (partial: Partial<SearchPaginationState>) => {
        const newState = { ...state, ...partial }
        setState(newState)
        onChange(newState)
    }

    return (
        <div>
            <div className="mb-4">
                <SearchBar
                    onSearch={term => update({ searchTerm: term, pageNumber: 1 })}
                    placeholder={searchPlaceholder}
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
}