import * as React from "react";
import Validator, {IValidateDataItem} from "../validate/index";

export interface IPropsInputin {
    title: string | JSX.Element
    placeholder: string
    type: string
    value: string | number
    onChange: React.Dispatch<any>
    validate?: IValidateDataItem
    validator?: Validator
    validateExec?: boolean
}

export declare class Inputin extends React.Component<IPropsInputin, any> { }