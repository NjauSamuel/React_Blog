const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        );

const loginValidator = ({ email, password }) => {
    const errors = {
        email: "",
        password: ""
    };

    if (!email) {
        errors.email = "Email is Required!";
    } else if (!isEmail(email)) {
        errors.email = "Invalid Email";
    }

    if (!password) {
        errors.password = "Password is Required! ";
    }

    return errors;
};

export default loginValidator;