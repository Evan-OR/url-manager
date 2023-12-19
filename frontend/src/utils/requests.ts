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
