import React from 'react';
import {LayoutPropsType} from "@/models";

const EmptyLayout = ({children, openSidebar, title, role}: LayoutPropsType) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default EmptyLayout;