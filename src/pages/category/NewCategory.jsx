import { useState, useRef, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import addCategoryValidator from "../../validators/addCategoryValidator";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  title: "",
  desc: ""
}
const initialFormError = {
  title: "",
  desc: ""
}

const NewCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const errors = addCategoryValidator({title: formData.title, desc: formData.desc})

    if(errors.title || errors.desc){
      setFormError(errors);
    }else{
      try{
        setLoading(true);

        // API request
        const requestBody = {
          title: formData.title,
          desc: formData.desc
        }

        const response = await axios.post("category", requestBody)

        const data = response.data;

        toast.success(data.message, {
          autoClose: 6000,
        });

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false);
        navigate("/categories")
        
      }catch(error){
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: 6000,
        });
        
      }
    }
  }

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div>
      <button className="button button-block ml-3" onClick={() => navigate("/categories")}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              ref={inputRef}
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p> }
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
            {formError.desc && <p className="error">{formError.desc}</p> }
          </div>

          <div className="form-group">
            <input className="button" type="submit" value={`${loading ? "Adding..." : "Add"}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
