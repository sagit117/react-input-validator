"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function Inputin({ title, placeholder, type, value, onChange, validate, validator, validateExec, }) {
    const [isValid, setIsValid] = react_1.useState(false);
    const [firstFocus, setFirstFocus] = react_1.useState(false);
    const [validData, setValidData] = react_1.useState(validate || null);
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
    react_1.useEffect(() => {
        if (validate && validateExec) {
            setIsValid(!!(validator === null || validator === void 0 ? void 0 : validator.validateExec(validate)));
            setFirstFocus(true);
        }
    }, [validateExec, validData]);
    return (react_1.default.createElement("div", { className: "input-group mb-3" },
        react_1.default.createElement("span", { className: "input-group-text", id: "basic-addon1" }, title),
        react_1.default.createElement("input", { type: type, className: `form-control ${setClassName()}`, placeholder: placeholder, "aria-label": placeholder, "aria-describedby": "basic-addon1", value: value, onChange: changeInput, onBlur: onBlurHandler })));
}
exports.default = Inputin;
//# sourceMappingURL=index.js.map