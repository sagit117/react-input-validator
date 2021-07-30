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
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
    setIsInvalid?: boolean
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
 * @param onKeyPress    - обработчик нажатия кнопки
 * @param isInvalid     - параметр для принудительной окраски в валидное или не валидное значение
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
    onKeyPress,
    setIsInvalid,
}: IPropsInputin) {
    const [isValid, setIsValid] = useState<boolean>(false)
    const [firstFocus, setFirstFocus] = useState<boolean>(false) // флаг отвечает за потерю фокуса
    const [classNames, setClassNames] = useState<string>('')

    function changeInput(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value)
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
    useEffect(() => {
        if (validate && firstFocus) {
            setClassNames(isValid ? 'is-valid' : 'is-invalid')
        } else {
            setClassNames('')
        }
    }, [isValid, validate, firstFocus])

    useEffect(() => {
        if (setIsInvalid === false || setIsInvalid === true) {
            setIsValid(setIsInvalid)
        }
    }, [setIsInvalid])

    useEffect(() => {
        if (validate && validateExec) {
            setIsValid(!!validator?.validateExec(validate))
            setFirstFocus(true)
        }

    }, [validateExec, validate])

    useEffect(() => {
        if (validate && firstFocus) {
            Object.assign(validate, { value: value })
            setIsValid(!!validator?.validateExec(validate))
        }
    }, [value])

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon">
                {title}
            </span>
            <input
                type={type}
                className={`form-control ${classNames}`}
                placeholder={placeholder}
                aria-label={placeholder}
                aria-describedby="basic-addon"
                value={value}
                onChange={changeInput}
                onBlur={onBlurHandler}
                onKeyPress={onKeyPress}
            />
        </div>
    )
}
