import {FC} from "react";

interface IAppValues {
    value:string,
    className?:string,
}
const AppValues:FC<IAppValues> = ({value,className}) => {
    return <span className={className}>{String(value)}</span>;

};

export default AppValues;
