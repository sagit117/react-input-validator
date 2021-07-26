import * as React from "react";

export interface IPropsInputin {
    title: string | JSX.Element
    placeholder: string
    type: string
    value: string | number
    onChange: React.Dispatch<any>
    validate?: IValidateDataItem
    validator?: Validator
    validateExec?: boolean
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
}

export declare class Inputin extends React.Component<IPropsInputin, any> { }

export interface IValidateDataItem {
    value: string
    methods: Function[]
    isValid: boolean
}

export interface IMethods {
    required(value: string | number): boolean   // поле обязательное для заполнение
    minLength(length: number): Function         // минимальная длина поля
    maxLength(length: number): Function         // максимальная длина поля
    setIsValid(isValid: boolean): boolean       // принудительная валидация
    isEmail(value: string): boolean             // проверка на email
}

/**
 * Класс валидатор
 */
export class Validator {
    public static methods: IMethods

    private data: IValidateDataItem[]

    constructor(data: IValidateDataItem[])

    /**
     * Массовая валидация
     */
    public allValidate(): boolean

    /**
     * Единичная валидация
     * @param data
     */
    public validateExec(data: IValidateDataItem): boolean
}

