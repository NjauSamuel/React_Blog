import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
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


const UpdatePost = () => {

  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  // Getting Single Post Data to fill-out the Update Post Form. 
  useEffect(() => {
    if(postId){
      const getPost = async () => {
        try{
          // Api Request
          const response = await axios.get(`posts/${postId}`)

          const data = response.data.data
          setFormData({title: data.post.title, desc: data.post.desc, category: data.post.category._id, file: data.post?.file?._id})
          
        }catch(error){
          setLoading(false);
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            autoClose: 6000,
          });
        }
      }

      getPost();
    }
  }, [postId]);


  // Getting The Category List for helping with the Categories 
  // select category options for UX . 
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
  }, []);

  // Handling Submissions once Update Post button in pressed. 
  const handleSubmit = async (e) => {

    e.preventDefault();
    const errors = addPostValidator({title: formData.title, category: formData.category})

    if(errors.title || errors.category){
      setFormError(errors);
    }else{
      try{
        setLoading(true);

        let input = formData;

        if (fileId){
          input = {...input, file: fileId}
        }

        // API request
        const response = await axios.put(`/posts/${postId}`, input)
        const data = response.data;

        toast.success(data.message, {
          autoClose: 6000,
        });

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false);
        navigate(`/posts/detail-post/${postId}`)
        
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
  
  // Handling Image-File Submissions. 
  const handleFileChange = async (e) => {
    console.log(e.target.files)

    const formInput = new FormData();
    formInput.append("image", e.target.files[0])

    const type = e.target.files[0].type

    if(type === "image/png" || type === "image/jpg" || type === "image/jpeg"){
      setExtensionError(null);
      try{
        setIsDisable(true);
        // API request
        const response = await axios.post("file/upload", formInput)

        const data = response.data;
        setFileId(data.data._id)

        console.log(data);

        toast.success(data.message, {
          autoClose: 6000,
        });

        setIsDisable(false);
        
      }catch(error){
        setLoading(false);
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: 6000,
        });
        
      }
    }else{
      setExtensionError("Only .png or .jpg or .jpeg files are allowed. ");
    }
  }

  return (
    <div>
      <button className="button button-block" onClick={() => {navigate(-1)}}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Post</h2>
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
              onChange={handleFileChange}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
              <option value=""></option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}

            </select>
            {formError.category && <p className="error">{formError.category}</p> }
          </div>

          <div className="form-group">
            <input className="button" type="submit" disabled={isDisable} value={`${loading ? "Updating..." : "Update"}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
