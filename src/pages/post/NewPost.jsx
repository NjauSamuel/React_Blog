import { useState, useRef, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  desc: "",
  category: ""
}
const initialFormError = {
  title: "",
  category: ""
}

const NewPost = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([])

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    const getCategories = async () => {
      try{
        // Api Request
        const response = await axios.get(`category?size=1000`)
        const data = response.data.data
        setCategories(data.categories)
        
      }catch(error){
        
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: 6000,
        });
      }
    }

    getCategories();
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();

    const errors = addPostValidator({title: formData.title, category: formData.category})

    if(errors.title || errors.category){
      setFormError(errors);
    }else{
      try{
        setLoading(true);

        // API request
        const requestBody = {
          title: formData.title,
          category: formData.category
        }

        const response = await axios.post("posts", requestBody)

        const data = response.data;

        toast.success(data.message, {
          autoClose: 6000,
        });

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false);
        navigate("/posts")
        
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

  console.log(formData)

  return (
    <div>
      <button className="button button-block" onClick={() => {navigate(-1)}}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p> }
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
            />
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
              
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
              
            </select>
            {formError.category && <p className="error">{formError.category}</p> }
          </div>

          <div className="form-group">
            <input className="button" type="submit" value={`${loading ? "Adding..." : "Add"}`}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
