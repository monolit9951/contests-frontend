import { FC, useEffect, useState } from 'react'
import { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import clsx from 'clsx'
import { Prize } from 'entities/prize'
import { useTheme } from 'entities/theme'
import { selectContestOwnerId } from 'pages/contestPage/model/selectors'
import instance from 'shared/api/api'
import { useAppSelector } from 'shared/lib/store'
import { Pagination } from 'widgets/winnersTable/ui/customPagination/customPagination'

import {
    FirstColumnRenderer,
    NameRenderer,
    PrizeRenderer,
    WorkLinkRenderer,
} from './customColumns'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './contestWinnersTable.scss'

interface ContestWinner extends Omit<Prize, 'id' | 'winnersAmount'> {
    userId: string
    name: string
    profileImage: string
    likeAmount: number
    commentAmount: number
    workId: string
}

export const ContestWinnersTable: FC = () => {
    const { theme } = useTheme()

    const [rowData, setRowData] = useState<ContestWinner[]>([])
    const [columnDefs] = useState<ColDef[]>([
        {
            headerName: 'Place',
            field: 'place',
            sortable: true,
            filter: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell__place',
            cellRenderer: FirstColumnRenderer,
        },
        {
            headerName: 'Author',
            cellRenderer: NameRenderer,
            field: 'profileImage&name',
            valueGetter: (p) => {
                return `${p.data.profileImage},${p.data.name}`
            },
            sortable: true,
            filter: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
        },
        {
            headerName: 'Prize',
            field: 'prizeType&prizeText&prizeAmount&currency',
            valueGetter: (p) => {
                const { prizeType, prizeText, prizeAmount, currency } = p.data
                return `${prizeType},${prizeText},${prizeAmount},${currency}`
            },
            sortable: true,
            filter: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
            cellRenderer: PrizeRenderer,
        },
        {
            headerName: 'Likes',
            field: 'likeAmount',
            sortable: true,
            filter: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
        },
        {
            headerName: 'Comments',
            field: 'commentAmount',
            sortable: true,
            filter: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
        },
        {
            headerName: 'Reposts',
            field: 'commentAmount',
            sortable: true,
            filter: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
        },
        {
            headerName: '',
            field: 'workId',
            cellRenderer: WorkLinkRenderer,
            filter: false,
            sortable: true,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
        },
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalWinners, setTotalWinners] = useState(0)

    const pageSize = 10

    const ownerId = useAppSelector(selectContestOwnerId)

    useEffect(() => {
        const fetchOtherPrizes = async () => {
            try {
                const { data } = await instance.get(
                    `contests/winners/${ownerId}?page=${
                        currentPage - 1
                    }&pageSize=${pageSize}&sortDirection=ASC`
                )

                setRowData(data.content)
                setTotalWinners(data.totalElements)
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err)
            }
        }

        fetchOtherPrizes()
    }, [currentPage])

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * pageSize
    const visibleRows = rowData.slice(startIndex, startIndex + pageSize)

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: false,
    }

    const getRowStyle = () => {
        return {
            border: `0.5px solid #393b3b`,
            background: theme === 'dark' ? '#1b2321' : '#f0f0f0',
        }
    }

    const cellStyle = () => {
        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: theme === 'dark' ? '#ffffff' : '#000000',
        }
    }

    const getRowHeight = () => {
        return 50
    }

    return (
        <div
            className={clsx(theme, 'ag-theme-alpine')}
            style={{ width: '1415px' }}>
            <AgGridReact
                rowData={visibleRows}
                columnDefs={columnDefs.map((col) => ({
                    ...col,
                    cellStyle,
                }))}
                defaultColDef={defaultColDef}
                getRowStyle={getRowStyle}
                getRowHeight={getRowHeight}
                domLayout='autoHeight'
                sortingOrder={['asc', 'desc']}
            />
            <Pagination
                onPageChange={onPageChange}
                totalCount={totalWinners}
                currentPage={currentPage}
                pageSize={pageSize}
            />
        </div>
    )
}
