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
    } else if (category === "") {
        errors.category = "Category Field Should not be Blank!"
    }

    return errors;
}

export default addPostValidator;