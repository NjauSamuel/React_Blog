const recoverPasswordValidator = ({ code, password }) => {
    const errors = {
        code: "",
        password: ""
    };

    if (!code) {
        errors.code = "Code is Required!";
    }

    if (!password) {
        errors.password = "Password is Required";
    } else if (password.length < 6) {
        errors.password = "Password Should be 6 Characters and Above!";
    }

    return errors;
};

export default recoverPasswordValidator;