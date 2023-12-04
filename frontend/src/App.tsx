import { useState } from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';

function App() {
    const [data, setData] = useState(null);

    const getData = async () => {
        const res = await fetch('/api');
        const json = await res.json();
        setData(json);
    };

    return (
        <>
            <button onClick={getData}>Get Data</button>
            {data && <div>{JSON.stringify(data)}</div>}

            <RegisterForm />
        </>
    );
}

export default App;
