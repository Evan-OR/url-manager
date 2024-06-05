import Cookies from 'js-cookie';

type AuthenticationType = 'Register' | 'Login';
type AuthenticationData = {
    email: string;
    password: string;
    username?: string;
};

export const authenticateUser = async (
    type: AuthenticationType,
    email: string,
    password: string,
    username?: string
) => {
    const data: AuthenticationData = { email, password };
    if (type === 'Register') data.username = username;

    const res = await fetch(`/api/user/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
};

export const getAnalytics = async (url_id: string) => {
    try {
        const token = Cookies.get('jwt');
        const res = await fetch(`/api/analytics/${url_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await res.json();

        return json;
    } catch (e) {
        return e;
    }
};
