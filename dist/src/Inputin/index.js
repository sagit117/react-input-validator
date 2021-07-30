import React, { useEffect, useState } from 'react';
export default function Inputin({ title, placeholder, type, value, onChange, validate, validator, validateExec, onKeyPress, setIsInvalid, }) {
    const [isValid, setIsValid] = useState(false);
    const [firstFocus, setFirstFocus] = useState(false);
    const [classNames, setClassNames] = useState('');
    function changeInput(e) {
        onChange(e.target.value);
    }
    function onBlurHandler() {
        setFirstFocus(true);
        validate && setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
    }
    useEffect(() => {
        if (validate && firstFocus) {
            setClassNames(isValid ? 'is-valid' : 'is-invalid');
        }
        else {
            setClassNames('');
        }
    }, [isValid, validate, firstFocus]);
    useEffect(() => {
        if (setIsInvalid === false || setIsInvalid === true) {
            setIsValid(setIsInvalid);
        }
    }, [setIsInvalid]);
    useEffect(() => {
        if (validate && validateExec) {
            setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
            setFirstFocus(true);
        }
    }, [validateExec, validate]);
    useEffect(() => {
        if (validate && firstFocus) {
            Object.assign(validate, { value: value });
            setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
        }
    }, [value]);
    return (React.createElement("div", { className: "input-group mb-3" },
        React.createElement("span", { className: "input-group-text", id: "basic-addon" }, title),
        React.createElement("input", { type: type, className: `form-control ${classNames}`, placeholder: placeholder, "aria-label": placeholder, "aria-describedby": "basic-addon", value: value, onChange: changeInput, onBlur: onBlurHandler, onKeyPress: onKeyPress })));
}
