import { Link } from 'react-router-dom';
import URLInput from './URLInput';

function HomePage() {
    return (
        <>
            <h2>HomePage</h2>
            <URLInput />
            <div>
                <Link to={'/auth'}>Login/Register</Link>
            </div>
            <div>
                <Link to={'/manage'}>Manage My URLs</Link>
            </div>
            <div>
                <Link to={'/analytics'}>See URL Analytics</Link>
            </div>
        </>
    );
}

export default HomePage;
