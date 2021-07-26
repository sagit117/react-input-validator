export interface IValidateDataItem {
    value: string
    methods: Function[]
    isValid: boolean
}

/**
 * Класс валидатор
 */
export default class Validator {
    public static methods = {
        required(value: string | number) {
            return !!value
        },
        minLength(length: number) {
            return (value: string) => value.length >= length
        },
        maxLength(length: number) {
            return (value: string) => value.length <= length
        },
        setIsValid(isValid: boolean) {
            return isValid
        },
        isEmail(value: string): boolean {
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
            return reg.test(value);
        },
        isEqual(valueEqual: string | number) {
            return (value: string | number) => valueEqual === value
        }
    }

    private data: IValidateDataItem[] = []

    constructor(data: IValidateDataItem[]) {
        this.data = data
    }

    /**
     * Массовая валидация
     */
    public allValidate(): boolean {
        const isValid = this.data.map((d) => {
            return this.validateExec(d)
        })

        return isValid.every((item) => item)
    }

    /**
     * Единичная валидация
     * @param data
     */
    public validateExec(data: IValidateDataItem): boolean {
        const isValid = data.methods
            ?.map((cb) => cb(data.value))
            .reduce((prev, acc) => acc + +prev, 0)

        data.isValid = isValid === data.methods.length

        return data.isValid
    }
}
