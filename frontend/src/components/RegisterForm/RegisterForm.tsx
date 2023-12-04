import { useEffect, useRef, useState } from 'react';
import style from './registerFrom.module.scss';
import FormInput from './FormInput';

type RegistrationErrors = {
    username?: string;
    email?: string;
    password?: string;
};

function RegisterForm() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<RegistrationErrors>({});
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisableSubmitButton(true);

        if (!usernameRef.current || !emailRef.current || !passwordRef.current) {
            console.log('null ref found');
            return;
        }

        const res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        });

        const json = await res.json();

        if (json.hasOwnProperty('errors')) setErrors(json['errors']);

        console.log(json);
        setDisableSubmitButton(false);
    };

    useEffect(() => {
        setUsernameError(Object.keys(errors).includes('username'));
        setEmailError(Object.keys(errors).includes('email'));
        setPasswordError(Object.keys(errors).includes('password'));
    }, [errors]);

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Register</h1>

            <form className={style.form} onSubmit={register}>
                <FormInput
                    type={'text'}
                    placeHolder={'Username'}
                    passwordError={usernameError}
                    passwordRef={usernameRef}
                    errorMessage={errors.username}
                    setPasswordError={setUsernameError}
                />
                <FormInput
                    type={'text'}
                    placeHolder={'Email'}
                    passwordError={emailError}
                    passwordRef={emailRef}
                    errorMessage={errors.email}
                    setPasswordError={setEmailError}
                />
                <FormInput
                    type={'password'}
                    placeHolder={'Password'}
                    passwordError={passwordError}
                    passwordRef={passwordRef}
                    errorMessage={errors.password}
                    setPasswordError={setPasswordError}
                />

                <button disabled={disableSubmitButton} className={style.btn} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
