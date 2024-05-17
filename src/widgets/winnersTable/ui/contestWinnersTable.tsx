import React, {useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-duplicates
import {ColDef} from 'ag-grid-community';
// eslint-disable-next-line import/no-duplicates,import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { AgGridReact } from 'ag-grid-react';
import clsx from "clsx";
import {useTheme} from "entities/theme";
import {Button} from "shared/ui/button";
import {HStack, VStack} from "shared/ui/stack";

// eslint-disable-next-line import/no-extraneous-dependencies
import 'ag-grid-community/styles/ag-grid.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './contestWinnersTable.scss';

interface ContestWinner {
    place: number;
    author: string;
    prize: string;
    likes: number;
    comments: number;
    reposts: number;
    workLink: string;
}
export const WorkLinkRenderer: React.FC<{ value: string }> = ({ value }) => {
    const {theme} = useTheme();
    const handleClick = () => {
        window.open(value, '_blank');
    };

    return (
        <Button variant="secondary" onClick={handleClick} className={clsx(theme, 'work-link')}>
            View Work
        </Button>
    );
};

export const ContestWinnersTable: React.FC = () => {
    const {theme} = useTheme();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowData] = useState<ContestWinner[]>([
        { place: 1, author: 'John Doe', prize: '$500', likes: 120, comments: 30, reposts: 15, workLink: 'http://example.com/work1' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 3, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 4, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 5, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 6, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 7, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 8, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 9, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 10, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 11, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 12, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 13, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 14, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 15, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 16, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 17, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 18, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 19, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 20, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 21, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 22, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 23, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 24, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 25, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 26, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 27, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 28, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 29, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 30, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 31, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 32, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 33, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 34, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 35, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 36, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 37, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 38, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 11, author: 'John Doe', prize: '$500', likes: 120, comments: 30, reposts: 15, workLink: 'http://example.com/work1' },
        { place: 2, author: 'Jane Smith', prize: '$300', likes: 100, comments: 20, reposts: 10, workLink: 'http://example.com/work2' },
        { place: 3, author: 'Sam Johnson', prize: '$200', likes: 80, comments: 15, reposts: 5, workLink: 'https://example.com/work3' },
        { place: 4, author: 'Emily Brown', prize: '$150', likes: 70, comments: 12, reposts: 8, workLink: 'https://example.com/work4' },
        { place: 5, author: 'Chris Anderson', prize: '$100', likes: 60, comments: 10, reposts: 7, workLink: 'https://example.com/work5' },
        { place: 6, author: 'Sophia Wilson', prize: '$50', likes: 50, comments: 8, reposts: 5, workLink: 'https://example.com/work6' },
        { place: 7, author: 'David Martinez', prize: '$30', likes: 40, comments: 6, reposts: 3, workLink: 'https://example.com/work7' },
        { place: 8, author: 'Emma Taylor', prize: '$20', likes: 30, comments: 5, reposts: 2, workLink: 'https://example.com/work8' },
        { place: 9, author: 'Noah Thomas', prize: '$10', likes: 20, comments: 4, reposts: 1, workLink: 'https://example.com/work9' },
        { place: 10, author: 'Olivia Harris', prize: '$5', likes: 10, comments: 2, reposts: 0, workLink: 'https://example.com/work10' }
    ])
    const [columnDefs] = useState<ColDef[]>([
        { headerName: 'Place', field: 'place', sortable: true, filter: false, headerClass: 'custom-header', cellClass: 'custom-cell', },
        { headerName: 'Author', field: 'author', sortable: true, filter: false, headerClass: 'custom-header', cellClass: 'custom-cell' },
        { headerName: 'Prize', field: 'prize', sortable: true, filter: false, headerClass: 'custom-header', cellClass: 'custom-cell' },
        { headerName: 'Likes', field: 'likes', sortable: true, filter: false, headerClass: 'custom-header', cellClass: 'custom-cell' },
        { headerName: 'Comments', field: 'comments', sortable: true, filter: false, headerClass: 'custom-header', cellClass: 'custom-cell' },
        { headerName: 'Reposts', field: 'reposts', sortable: true, filter: false, headerClass: 'custom-header', cellClass: 'custom-cell'},
        {
            headerName: '',
            field: 'workLink',
            cellRenderer: WorkLinkRenderer,
            filter: false,
            sortable: false,
            headerClass: 'custom-header',
            cellClass: 'custom-cell',
        }
    ]);

    const rowsPerPage = 10;
    const totalRows = rowData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const visibleRows = rowData.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const generatePageNumbers = () => {
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i+=1) {
            pages.push(i);
        }
        return pages;
    };

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: false,
        sortOrder: ['asc', 'desc'],
    };

    const getRowStyle = () => {
        return {
            border: `0.5px solid #393b3b`,
            background: theme === 'dark' ? '#222' : '#f0f0f0',
        };
    };

    const cellStyle = () => {
        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: theme === 'dark' ? '#ffffff' : '#000000',
        };
    };
    const getRowHeight = () => {
        return 50;
    };

    return (
        <div className={clsx(theme,"ag-theme-alpine")} style={{ height: 600, width: '1415px'}}>
            <AgGridReact
                key={visibleRows.length}
                rowData={visibleRows}
                columnDefs={columnDefs.map(col => ({
                    ...col,
                    cellStyle,
                }))}
                defaultColDef={defaultColDef}
                getRowStyle={getRowStyle}
                getRowHeight={getRowHeight}
                domLayout="autoHeight"
                sortingOrder={['asc', 'desc']}
            />
            <VStack>
                <HStack className="pagination-controls flex">
                    <Button variant="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &larr;
                    </Button>
                    {generatePageNumbers().map(page => (
                        <Button key={page} variant="secondary" onClick={() => handlePageChange(page)} disabled={currentPage === page}>
                            {page}
                        </Button>
                    ))}
                    <Button
                        variant="secondary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={startIndex + rowsPerPage >= rowData.length || currentPage === totalPages}
                    >
                        &rarr;
                    </Button>
                </HStack>
            </VStack>
        </div>
    );
};
