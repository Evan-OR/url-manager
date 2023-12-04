import style from './registerFrom.module.scss';

type FormInputProps = {
    type: 'text' | 'password';
    placeHolder: string;
    passwordError: boolean;
    passwordRef: React.RefObject<HTMLInputElement>;
    errorMessage: string | undefined;
    setPasswordError: (value: boolean) => void;
};

function FormInput(props: FormInputProps) {
    const { type, placeHolder, passwordError, passwordRef, errorMessage, setPasswordError } = props;
    // const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                className={`${style.input} ${passwordError ? style.formErrorBorder : ''}`}
                ref={passwordRef}
                type={type}
                placeholder={placeHolder}
                onChange={() => setPasswordError(false)}
            ></input>
            {passwordError && <div className={style.formErrorMessage}>{errorMessage}</div>}
        </>
    );
}

export default FormInput;
