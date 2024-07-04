import { FC, useEffect, useState } from 'react'
import { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import clsx from 'clsx'
import { Prize } from 'entities/prize'
import { useTheme } from 'entities/theme'
import { Work } from 'entities/work'
import { selectContestOwnerId } from 'pages/contestPage/model/selectors'
import instance from 'shared/api/api'
import desc from 'shared/assets/icons/caretDown.svg'
import asc from 'shared/assets/icons/caretUp.svg'
import none from 'shared/assets/icons/caretUpDown.svg'
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

interface Props {
    openModal: (work: Work) => void
}

export const ContestWinnersTable: FC<Props> = ({ openModal }) => {
    const { theme } = useTheme()

    const [rowData, setRowData] = useState<ContestWinner[]>([])
    const [columnDefs] = useState<ColDef[]>([
        {
            headerName: 'Place',
            field: 'place',
            headerClass: 'custom-header',
            cellClass: 'custom-cell custom-cell__place',
            cellRenderer: FirstColumnRenderer,
            maxWidth: 100,
            unSortIcon: true,
        },
        {
            headerName: 'Author',
            cellRenderer: NameRenderer,
            field: 'profileImage&name',
            valueGetter: (p) => {
                return `${p.data.profileImage},${p.data.name}`
            },
            sortable: false,
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
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
            cellRenderer: PrizeRenderer,
            unSortIcon: true,
        },
        {
            headerName: 'Likes',
            field: 'likeAmount',
            headerClass: 'custom-header',
            cellClass: 'custom-cell custom-cell__likes',
            maxWidth: 100,
            unSortIcon: true,
        },
        {
            headerName: 'Comments',
            field: 'commentAmount',
            headerClass: 'custom-header',
            cellClass: 'custom-cell custom-cell__comments',
            maxWidth: 150,
            unSortIcon: true,
        },
        {
            headerName: 'Reposts',
            field: 'commentAmount',
            headerClass: 'custom-header',
            cellClass: 'custom-cell custom-cell__reposts',
            maxWidth: 150,
            unSortIcon: true,
        },
        {
            headerName: '',
            field: 'workId',
            cellRenderer: WorkLinkRenderer,
            cellRendererParams: {
                openModal,
            },
            sortable: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
            maxWidth: 194,
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

    const gridOptions = {
        icons: {
            sortAscending: `<img src="${asc}" alt="Sort Ascending" width="24px" height="24px" style="filter: invert(1)" />`,
            sortDescending: `<img src="${desc}" alt="Sort Descending" width="24px" height="24px" style="filter: invert(1)" />`,
            sortUnSort: `<img src="${none}" alt="Sort None" width="24px" height="24px" style="filter: invert(1)" />`,
        },
    }

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
            color: theme === 'dark' ? '#ffffff' : '#000000',
        }
    }

    const getRowHeight = () => {
        return 56
    }

    return (
        <div
            className={clsx(theme, 'ag-theme-alpine')}
            style={{ width: '1415px' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs.map((col) => ({
                    ...col,
                    cellStyle,
                }))}
                defaultColDef={defaultColDef}
                getRowStyle={getRowStyle}
                getRowHeight={getRowHeight}
                domLayout='autoHeight'
                sortingOrder={['asc', 'desc']}
                gridOptions={gridOptions}
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
