const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        );

const sendCodeValidator = ({ email }) => {
    const errors = {
        email: ""
    };

    if (!email) {
        errors.email = "Email is Required!";
    } else if (!isEmail(email)) {
        errors.email = "Invalid Email!";
    }

    return errors;
};

export default sendCodeValidator;