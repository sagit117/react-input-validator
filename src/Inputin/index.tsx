import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import Validator, { IValidateDataItem } from '../validate'

interface IPropsInputin {
    title: string | JSX.Element
    placeholder: string
    type: string
    value: string | number
    onChange: Dispatch<any>
    validate?: IValidateDataItem
    validator?: Validator
    validateExec?: boolean
}

/**
 * Компонент input с валидацией
 * @param title
 * @param placeholder
 * @param type
 * @param value
 * @param onChange
 * @param validate      - объект валидации
 * @param validator     - инстанс класса валидации
 * @param validateExec  - флаг, который определяет был ли из вне запрос валидации
 * @constructor
 */
export default function Inputin({
    title,
    placeholder,
    type,
    value,
    onChange,
    validate,
    validator,
    validateExec,
}: IPropsInputin) {
    const [isValid, setIsValid] = useState<boolean>(false)
    const [firstFocus, setFirstFocus] = useState<boolean>(false) // флаг отвечает за потерю фокуса

    const [validData, setValidData] = useState<IValidateDataItem | null>(
        validate || null
    ) // для отслеживания изменений в поле ввода

    function changeInput(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value)

        if (validate) {
            Object.assign(validate, { value: e.target.value })
            setValidData({ ...validate })

            firstFocus && setIsValid(!!validator?.validateExec(validate))
        }
    }

    /**
     * Обработчик потери фокуса
     */
    function onBlurHandler() {
        setFirstFocus(true)
        validate && setIsValid(!!validator?.validateExec(validate))
    }

    /**
     * Установка класса валидации
     */
    function setClassName(): string {
        if (validate && firstFocus) {
            return isValid ? 'is-valid' : 'is-invalid'
        }

        return ''
    }

    useEffect(() => {
        if (validate && validateExec) {
            setIsValid(!!validator?.validateExec(validate))
            setFirstFocus(true)
        }

        // eslint-disable-next-line
    }, [validateExec, validData])

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                {title}
            </span>
            <input
                type={type}
                className={`form-control ${setClassName()}`}
                placeholder={placeholder}
                aria-label={placeholder}
                aria-describedby="basic-addon1"
                value={value}
                onChange={changeInput}
                onBlur={onBlurHandler}
            />
        </div>
    )
}
