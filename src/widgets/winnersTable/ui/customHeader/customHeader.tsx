import React from 'react';
import { IHeaderParams } from 'ag-grid-community';
import arrows from 'shared/assets/icons/caretUpDown.svg?react';
import { Button } from 'shared/ui/button';
import { Icon } from 'shared/ui/icon';

import './customHeader.scss';

type CustomHeaderComponentProps = IHeaderParams & {
    api: any;
}

const CustomHeaderComponent: React.FC<CustomHeaderComponentProps> = ({ displayName, enableSorting, api }) => {
    const handleSort = () => {
        if (enableSorting && api) {
            const sortModel = api.getSortModel();
            const sortDirection = sortModel?.[0]?.sort;
            const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            api.setSortModel([{ colId: displayName, sort: newSortDirection }]);
        }
    };

    return (
        <Button variant='div' className="custom-header" onClick={handleSort}>
            <span>{displayName}</span>
            {enableSorting && <Icon Svg={arrows} />}
        </Button>
    );
};

export default CustomHeaderComponent;
