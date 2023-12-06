import style from './registerFrom.module.scss';

type FormInputProps = {
    inputType: 'text' | 'password';
    formType: 'Register' | 'Login';
    placeHolder: string;
    error: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    errorMessage: string | undefined;
    name: string;
    setPasswordError: (value: boolean) => void;
};

function FormInput(props: FormInputProps) {
    const { inputType, formType, placeHolder, error, inputRef, errorMessage, name, setPasswordError } = props;
    // const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                className={`${style.input} ${error && formType === 'Register' ? style.formErrorBorder : ''}`}
                ref={inputRef}
                type={inputType}
                placeholder={placeHolder}
                onChange={() => setPasswordError(false)}
                name={name}
            ></input>
            {error && <div className={style.formErrorMessage}>{errorMessage}</div>}
        </>
    );
}

export default FormInput;
