type RegistrationErrors = {
    username?: string;
    email?: string;
    password?: string;
};

export const registrationValidation = (username: string, email: string, password: string) => {
    const errors: RegistrationErrors = {};

    const usernameError = validateUsername(username);
    if (usernameError) errors.username = usernameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

const validateUsername = (username: string): string | undefined => {
    return !(username.length > 3 && username.length <= 12) ? 'Username must be longer than 3 characters' : undefined;
};

const validateEmail = (email: string): string | undefined => {
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailReg.test(email) ? 'Invalid email' : undefined;
};

const validatePassword = (password: string): string | undefined => {
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return !passwordReg.test(password) ? 'Invalid Password' : undefined;
};
