import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import clsx from 'clsx'
import { Prize } from 'entities/prize'
import { useTheme } from 'entities/theme'
import { Work } from 'entities/work'
import instance from 'shared/api/api'
import desc from 'shared/assets/icons/caretDown.svg'
import asc from 'shared/assets/icons/caretUp.svg'
import none from 'shared/assets/icons/caretUpDown.svg'
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
    const {contestId} = useParams()


    const [rowData, setRowData] = useState<ContestWinner[]>([])

    const navigate = useNavigate()

    const handleWorkLink = (value: Work) => {
        // console.log(1)

        sessionStorage.setItem("contestScroll", String(window.scrollY));
        navigate(`work/${value.id}`, {preventScrollReset: true})
    }


    const [columnDefs] = useState<ColDef[]>([
        {
            headerName: 'Place',
            field: 'place',
            headerClass: 'custom-header',
            cellClass: 'custom-cell custom-cell__place',
            cellRenderer: FirstColumnRenderer,
            minWidth: 100,
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
            minWidth: 200,
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
            minWidth: 100,
            maxWidth: 500,
            unSortIcon: true,
        },
        {
            headerName: 'Likes',
            field: 'likeAmount',
            headerClass: 'custom-header custom-header__likes',
            cellClass: 'custom-cell custom-cell__likes',
            minWidth: 150,
            unSortIcon: true,
        },
        {
            headerName: 'Comments',
            field: 'commentAmount',
            headerClass: 'custom-header custom-header__comments',
            cellClass: 'custom-cell custom-cell__comments',
            minWidth: 150,
            unSortIcon: true,
        },
        {
            headerName: 'Reposts',
            field: 'commentAmount',
            headerClass: 'custom-header custom-header__reposts',
            cellClass: 'custom-cell custom-cell__reposts',
            minWidth: 150,
            unSortIcon: true,
        },
        {
            headerName: '',
            field: 'workId',
            cellRenderer: WorkLinkRenderer,
            cellRendererParams: {
                openModal: handleWorkLink,
            },
            sortable: false,
            headerClass: 'custom-header custom__work-link',
            cellClass: 'custom-cell custom__work-link',
            minWidth: 194,
        },
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalWinners, setTotalWinners] = useState(0)

    const pageSize = 10


    useEffect(() => {
        const fetchOtherPrizes = async () => {
            try {
                const { data } = await instance.get(
                    `winners/${contestId}?page=${
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
        suppressMovableColumns: true,
        rowStyle: {
            width: '100%',
            border: `0.5px solid #393b3b`,
            background: theme === 'dark' ? '#1b2321' : '#f0f0f0',
        },
    }

    const defaultColDef = {
        flex: 1,
        resizable: false,
        rowDrag: false,
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
            style={{ width: '100%', maxWidth: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs.map((col) => ({
                    ...col,
                    cellStyle,
                }))}
                defaultColDef={defaultColDef}
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
