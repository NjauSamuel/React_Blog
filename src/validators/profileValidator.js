const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        );

const profileValidator = ({ name, email }) => {
    const errors = {
        name: "",
        email: ""
    };

    if (!name) {
        errors.name = "Name is Required!";
    }

    if (!email) {
        errors.email = "Email is Required!";
    } else if (!isEmail(email)) {
        errors.email = "Invalid Email";
    }

    return errors;
};

export default profileValidator;