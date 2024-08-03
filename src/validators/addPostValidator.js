const addPostValidator = ({ title, category }) => {
    const errors = {
        title: "",
        category: ""
    }

    if (!title) {
        errors.title = "Title is Required!"
    }

    if (!category) {
        errors.category = "Category is Required!"
    }

    return errors;
}

export default addPostValidator;