import React from "react";
import {HStack} from "shared/ui/stack";

export const FirstColumnRenderer: React.FC<{ value: string }> = ({ value }) => {
    return (
        <HStack className="place-col">
            {value}
        </HStack>
    );
};