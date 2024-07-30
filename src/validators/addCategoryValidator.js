const addCategoryValidator = ({ title, desc }) => {
    const errors = {
        title: "",
        desc: ""
    }

    if (!title) {
        errors.title = "Title is Required!"
    }

    if (!desc) {
        errors.desc = "Description is Required!"
    }

    return errors;
}

export default addCategoryValidator;