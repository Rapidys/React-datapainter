import s from '../style.module.css'
import {FC} from "react";
import AppKeys from "@components/AppKeys";
import AppValues from "@components/AppValues";

interface IRenderField {
    fieldKey: string,
    value: any,
    valuesClassName?: string
    keysClassName?: string
}

export const RenderField: FC<IRenderField> = ({fieldKey, value, valuesClassName, keysClassName}) => {
    if (Array.isArray(value)) {
        return (
            <div key={fieldKey} className={s.mb_10}>
                <AppKeys keyValue={fieldKey} className={keysClassName}/>
                <ul className={s.ml_20}>
                    {value.map((item, index) => (
                        <li key={`${fieldKey}-${index}`}>
                            {typeof item === 'object' && item !== null ? (
                                <div className={s.mt_10}>
                                    {Object.entries(item).map(([subKey, subValue]) =>
                                        <RenderField
                                            key={subKey}
                                            fieldKey={subKey}
                                            value={subValue}
                                            keysClassName={keysClassName}
                                            valuesClassName={valuesClassName}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className={s.mt_10}>
                                    <AppValues value={item} className={valuesClassName}/>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (typeof value === 'object' && value !== null) {
        return (
            <div key={fieldKey} className={s.mb_10}>
                <AppKeys keyValue={fieldKey} className={keysClassName}/>
                <div className={`${s.ml_20} ${s.mt_10}`}>
                    {Object.entries(value).map(([subKey, subValue]) =>
                        <RenderField
                            key={subKey}
                            fieldKey={subKey}
                            value={subValue}
                            keysClassName={keysClassName}
                            valuesClassName={valuesClassName}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div key={fieldKey} className={s.mb_10}>
            <AppKeys keyValue={fieldKey} className={keysClassName}/>
            <AppValues value={value} className={valuesClassName}/>
        </div>
    );
};
