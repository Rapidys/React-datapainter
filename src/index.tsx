import React from 'react';
import {ModifyObject} from "@helpers/modifyObject";
import {RenderField} from "@components/RenderField";


const DynamicForm = ({
                         formData,
                         ordering = ["status"],
                         skipKeys = [],
                         arrayKeys = true,
                         isNestedRoutes = false
                     }: {
    formData: any;
    ordering?: string[];
    skipKeys?: string[];
    arrayKeys?: boolean
    isNestedRoutes?: boolean
}) => {

    // Memoize the result of ModifyObject to avoid unnecessary recalculations
    const data = React.useMemo(() => {
        return ModifyObject(formData, ordering, skipKeys, '',arrayKeys,isNestedRoutes);
    }, [formData, ordering, skipKeys]);

    return (
        <div>
            {Object.keys(data).map((key) => (
                <RenderField key={key} value={data[key]} fieldKey={key} />
            ))}
        </div>
    );
};

export default DynamicForm;
