import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
  title: "",
  desc: ""
}
const initialFormError = {
  title: "",
  desc: ""
}

const UpdateCategory = () => {

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const categoryId  = params.id;

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  // Getting Data to fill-out the Update Form. 
  useEffect(() => {
    if(categoryId){
      const getCategory = async () => {
        try{
          // Api Request
          const response = await axios.get(
            `category/${categoryId}`
          )

          const data = response.data.data
          setFormData({title: data.category.title, desc: data.category.desc})
          
        }catch(error){
          setLoading(false);
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            autoClose: 6000,
          });
        }
      }

      getCategory();
    }
  }, [categoryId])

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

        const response = await axios.put(`/category/${categoryId}`, requestBody)
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

  return (
    <div>
      <button className="button button-block ml-3" onClick={() => {navigate(-1)}}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
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
            <input className="button" type="submit" value={`${loading ? "Updating..." : "Update"}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
