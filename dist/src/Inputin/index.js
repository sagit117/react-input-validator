import React, { useEffect, useState } from 'react';
export default function Inputin({ title, placeholder, type, value, onChange, validate, validator, validateExec, onKeyPress }) {
    const [isValid, setIsValid] = useState(false);
    const [firstFocus, setFirstFocus] = useState(false);
    const [validData, setValidData] = useState(validate || null);
    function changeInput(e) {
        onChange(e.target.value);
        if (validate) {
            Object.assign(validate, { value: e.target.value });
            setValidData(Object.assign({}, validate));
            firstFocus && setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
        }
    }
    function onBlurHandler() {
        setFirstFocus(true);
        validate && setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
    }
    function setClassName() {
        if (validate && firstFocus) {
            return isValid ? 'is-valid' : 'is-invalid';
        }
        return '';
    }
    useEffect(() => {
        if (validate && validateExec) {
            setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
            setFirstFocus(true);
        }
    }, [validateExec, validData]);
    return (React.createElement("div", { className: "input-group mb-3" },
        React.createElement("span", { className: "input-group-text", id: "basic-addon1" }, title),
        React.createElement("input", { type: type, className: `form-control ${setClassName()}`, placeholder: placeholder, "aria-label": placeholder, "aria-describedby": "basic-addon1", value: value, onChange: changeInput, onBlur: onBlurHandler, onKeyPress: onKeyPress })));
}
