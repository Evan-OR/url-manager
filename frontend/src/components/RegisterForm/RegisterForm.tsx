import { useRef } from 'react';
import style from './registerFrom.module.scss';

function RegisterForm() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        console.log(json);
    };

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Register</h1>

            <form className={style.form} onSubmit={register}>
                <input className={style.input} ref={usernameRef} type="text" placeholder="Username"></input>
                <input className={style.input} ref={emailRef} type="text" placeholder="Email"></input>
                <input className={style.input} ref={passwordRef} type="password" placeholder="Password"></input>
                <button className={style.btn} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
