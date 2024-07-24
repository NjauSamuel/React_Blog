const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        );

const signupValidator = ({ name, email, password, confirmPassword }) => {
    const errors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    if (!name) {
        errors.name = "Name is Required!";
    }

    if (!email) {
        errors.email = "Email is Required!";
    } else if (!isEmail(email)) {
        errors.email = "Invalid Email";
    }

    if (!password) {
        errors.password = "Password is Required! ";
    } else if (password.length < 6) {
        errors.password = "Password should be longer than 5 charaters. ";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Confirm Password is Required!"
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password doesn't match. ";
    }

    return errors;
};

export default signupValidator;