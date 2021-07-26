# React компонет и класс для валидирования input-ов

### Установка

> npm install react-inputin-validator

### Подключение основного модуля 

```js
import {
    IValidateDataItem,
    Validator as ValidatorClass,
    Inputin,
} from 'react-inputin-validator/dist'

export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [validateExec, setValidateExec] = useState(false) // флаг для общей валидации

    /**
     * Объект для валидации
     */
    const validateData: IValidateDataItem[] = [
        {
            value: email,
            methods: [
                ValidatorClass.methods.required,
                ValidatorClass.methods.minLength(4),
            ]
        },
        {
            value: password,
            methods: [
                ValidatorClass.methods.required,
                ValidatorClass.methods.maxLength(8),
            ]
        },
    ]

    const Validator = new ValidatorClass(validateData)

    /**
     * Обработчик кнопки войти
     */
    function entryHandler() {
        Validator.allValidate()
        setValidateExec(true)
    }

    /**
     * Обработчки нажатия кнопки
     * @param event
     */
    function keyPressHandler(event: React.KeyboardEvent) {
        if (event.key === 'Enter') entryHandler()
    }

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center">
            <div className="form-login p-3 rounded mt-5 d-flex flex-column col-sm-12 col-12 col-md-6 col-lg-4">
                <h4 className="mb-3">Вход в систему</h4>
                <Inputin
                    type="text"
                    title={<User />}
                    placeholder="Введите email"
                    value={email}
                    onChange={setEmail}
                    validate={validateData[0]}
                    validator={Validator}
                    validateExec={validateExec}
                    onKeyPress={keyPressHandler}
                />
                <Inputin
                    type="password"
                    title={<Lock />}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={setPassword}
                    validate={validateData[1]}
                    validator={Validator}
                    validateExec={validateExec}
                    onKeyPress={keyPressHandler}
                />

                <div className="form-login--btn mt-2 d-flex">
                    <button
                        type="button"
                        className="btn btn-success me-2"
                        onClick={entryHandler}
                    >
                        Войти
                    </button>
                    <button type="button" className="btn btn-outline-danger">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}
```

### Методы валидации описаны в файле index.d.ts

### CSS классы для input

```css
.is-valid {}
.is-invalid {}

.input-group {}
.mb-3 {}
.input-group-text {}
.input-group {}
```



