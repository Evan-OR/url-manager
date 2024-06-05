import { useContext, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '@frontend/src/context/UserContext';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/auth" replace={true} state={{ path: location.pathname }} />;
    }

    return children;
};
