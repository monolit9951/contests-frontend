import React from 'react';
import clsx from "clsx";
import arrowLeft from 'shared/assets/icons/caretLeft.svg?react'
import arrowRight from 'shared/assets/icons/caretRight.svg?react'
import {Button} from "shared/ui/button";
import {Icon} from "shared/ui/icon";
import {HStack} from "shared/ui/stack";

import { DOTS,usePagination } from '../../models/usePagination.ts';

import './customPagination.scss';

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1] as number;

    const onNext = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <HStack
            className='pagination-container'
        >
            <Button variant='secondary'
                className={clsx('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <Icon Svg={arrowLeft} />
            </Button>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <Button variant='primary' key={index} className="pagination-item dots">&#8230;</Button>;
                }

                return (
                    <Button variant='primary'
                        key={index}
                        className={clsx('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber as number)}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
            <Button variant='secondary'
                className={clsx('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <Icon Svg={arrowRight} />
            </Button>
        </HStack>
    );
};
