import {FC} from "react";
import {formatKey} from "@helpers/formatKey";

interface IAppKeys {
    keyValue:string,
    className?:string
}
const AppKeys:FC<IAppKeys> = ({keyValue,className}) => {
    return <span className={className}>{formatKey(keyValue)}:</span>;
};

export default AppKeys;
