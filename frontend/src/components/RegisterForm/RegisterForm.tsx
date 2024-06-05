import { useContext, useEffect, useRef, useState } from 'react';
import style from './registerFrom.module.scss';
import FormInput from './FormInput';
import Cookies from 'js-cookie';
import FormToggle from './FormToggle';
import { UserContext } from '@frontend/src/context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

type RegistrationErrors = {
    username?: string;
    email?: string;
    password?: string;
};

type FormType = 'Register' | 'Login';

function RegisterForm() {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [formType, setFormType] = useState<FormType>('Register');

    const [errors, setErrors] = useState<RegistrationErrors>({});
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);

    const redirectPath = location.state?.path || '/';

    const requestHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisableSubmitButton(true);

        if (!emailRef.current || !passwordRef.current || (formType === 'Register' && !usernameRef.current)) {
            console.log('null ref found');
            return;
        }

        const postData: { email: string; password: string; username?: string } = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (formType === 'Register' && usernameRef.current) {
            postData.username = usernameRef.current.value;
        }

        const res = await fetch(`/api/user/${formType.toLocaleLowerCase()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        const json = await res.json();

        if (json.hasOwnProperty('errors')) setErrors(json['errors']);

        console.log(json);

        Cookies.set('jwt', json.token);
        userContext?.setUser(json.user);
        setDisableSubmitButton(false);
        navigate(redirectPath, { replace: true });
    };

    const toggleFormType = () => {
        formType === 'Register' ? setFormType('Login') : setFormType('Register');
    };

    useEffect(() => {
        setUsernameError(Object.keys(errors).includes('username'));
        setEmailError(Object.keys(errors).includes('email'));
        setPasswordError(Object.keys(errors).includes('password'));
    }, [errors]);

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>{formType}</h1>

            <form className={style.form} onSubmit={requestHandler}>
                {formType === 'Register' && (
                    <FormInput
                        inputType={'text'}
                        formType={formType}
                        placeHolder={'Username'}
                        error={usernameError}
                        inputRef={usernameRef}
                        errorMessage={errors.username}
                        name="username"
                        setPasswordError={setUsernameError}
                    />
                )}
                <FormInput
                    inputType={'text'}
                    formType={formType}
                    placeHolder={'Email'}
                    error={emailError}
                    inputRef={emailRef}
                    errorMessage={errors.email}
                    name="email"
                    setPasswordError={setEmailError}
                />
                <FormInput
                    inputType={'password'}
                    formType={formType}
                    placeHolder={'Password'}
                    error={passwordError}
                    inputRef={passwordRef}
                    errorMessage={errors.password}
                    name="password"
                    setPasswordError={setPasswordError}
                />

                <button disabled={disableSubmitButton} className={style.btn} type="submit">
                    {formType}
                </button>
            </form>

            {formType === 'Register' ? (
                <FormToggle text="Already have an account?" btnText="Login" toggleFormType={toggleFormType} />
            ) : (
                <FormToggle text="Don't have an account?" btnText="Register" toggleFormType={toggleFormType} />
            )}
        </div>
    );
}

export default RegisterForm;
