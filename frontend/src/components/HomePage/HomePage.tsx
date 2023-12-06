import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            HomePage
            <div>
                <Link to={'/auth'}>Login/Register</Link>
            </div>
            <div>
                <Link to={'/manage'}>Manage My URLs</Link>
            </div>
            <div>
                <Link to={'/analytics'}>See URL Analytics</Link>
            </div>
        </div>
    );
}

export default HomePage;
