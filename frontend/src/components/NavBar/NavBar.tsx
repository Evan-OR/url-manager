import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, NavLink } from 'react-router-dom';
import style from './navBar.module.scss';

function NavBar() {
    const userContext = useContext(UserContext);

    const navLinkStyles = ({ isActive }: any): string => {
        return isActive ? style.linkActive : style.linkElement;
    };

    return (
        <nav className={style.navbarWrapper}>
            <div className={style.logo}>LOGO</div>
            <div className={style.links}>
                <NavLink className={navLinkStyles} to={'/'}>
                    Home
                </NavLink>

                <NavLink className={navLinkStyles} to={'/manage'}>
                    Manage URLs
                </NavLink>

                <NavLink className={navLinkStyles} to={'/analytics'}>
                    See URL Analytics
                </NavLink>
            </div>
            <div className={style.login}>
                {userContext.user ? userContext.user.username : <Link to={'/auth'}>Login/Register</Link>}
            </div>
        </nav>
    );
}

export default NavBar;
