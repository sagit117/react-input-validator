export interface IValidateDataItem {
    value: string
    methods: Function[]
    isValid: boolean
}

export interface IMethods {
    required(value: string | number): boolean,
    minLength(length: number): boolean,
    maxLength(length: number): boolean
}

/**
 * Класс валидатор
 */
export default class Validator {
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