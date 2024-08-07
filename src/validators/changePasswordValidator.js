const changePasswordValidator = ({ oldPassword, newPassword }) => {
    const errors = {
        oldPassword: "",
        newPassword: ""
    }

    if (!oldPassword) {
        errors.oldPassword = "Old Password is Required!"
    } else if (oldPassword === "") {
        errors.oldPassword = "Old Password Field Should not be Blank!"
    }

    if (!newPassword) {
        errors.newPassword = "New Password is Required!"
    } else if (newPassword.length < 6) {
        errors.newPassword = "New Password Should Be Longer Than 6 Characters!"
    }

    if (oldPassword && oldPassword === newPassword) {
        errors.newPassword = "You Are Providing Old Password!"
    }


    return errors;
}

export default changePasswordValidator;