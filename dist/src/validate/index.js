export default class Validator {
    constructor(data) {
        this.data = [];
        this.data = data;
    }
    allValidate() {
        const isValid = this.data.map((d) => {
            return this.validateExec(d);
        });
        return isValid.every((item) => item);
    }
    validateExec(data) {
        var _a;
        const isValid = (_a = data.methods) === null || _a === void 0 ? void 0 : _a.map((cb) => cb(data.value)).reduce((prev, acc) => acc + +prev, 0);
        data.isValid = isValid === data.methods.length;
        return data.isValid;
    }
}
Validator.methods = {
    required(value) {
        return !!value;
    },
    minLength(length) {
        return (value) => value.length >= length;
    },
    maxLength(length) {
        return (value) => value.length <= length;
    },
};
