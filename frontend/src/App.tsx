import React, { useRef, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    const getData = async () => {
        const res = await fetch('/api');
        const json = await res.json();
        setData(json);
    };

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
        setData(json);
    };

    return (
        <>
            <button onClick={getData}>Get Data</button>
            {data && <div>{JSON.stringify(data)}</div>}

            <form onSubmit={register}>
                <input ref={usernameRef} type="text" placeholder="Username"></input>
                <input ref={emailRef} type="text" placeholder="Email"></input>
                <input ref={passwordRef} type="password" placeholder="Password"></input>
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default App;
