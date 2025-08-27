const validateName = (name) => {
    return typeof name === 'string' && name.length >= 20 && name.length <= 60;
};

const validateAddress = (address) => {
    return typeof address === 'string' && address.length <= 400;
};

const validatePassword = (password) => {
    return typeof password === 'string' &&
           password.length >=8 &&
           password.length <=16 &&
           /[A-Z]/.test(password) &&
           /[!@#$%^&*]/.test(password);
};

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

module.exports = { validateName, validateAddress, validatePassword, validateEmail };
