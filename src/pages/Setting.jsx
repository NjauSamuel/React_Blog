import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import changePasswordValidator from "../validators/changePasswordValidator";

const initialFormData = {oldPassword: '', newPassword: ''};
const initialFormError = {oldPassword: "", newPassword: ""};

const Setting = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Focusing The Cursor To The First Input Only On Initial Render
  useEffect(() => {
    inputRef.current.focus()
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async(e) => {

    e.preventDefault();

    const errors = changePasswordValidator({
      oldPassword: formData.oldPassword, 
      newPassword: formData.newPassword
    });

    if(errors.oldPassword || errors.newPassword){
      setFormError(errors)
    } else{
      try{
        setLoading(true);

        // API request

        const response = await axios.put("auth/change-password", formData)

        const data = response.data;

        toast.success(data.message, {
          autoClose: 6000,
        });

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false);        

        // toast.success("Youre' Awesome!", {
        //   autoClose: 6000,
        // });

        // setFormError(initialFormError)
        
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
    <div className="min-h-[calc(100vh-56px)] flex items-center">
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Change Password</h2>
          <div className="form-group">
            <label>Old password</label>
            <input
              className="form-control"
              type="password"
              name="oldPassword"
              placeholder="***********"
              ref={inputRef}
              value={formData.oldPassword}
              onChange={handleChange}
            />
            {formError.oldPassword && <p className="error">{formError.oldPassword}</p> }
          </div>

          <div className="form-group">
            <label>New password</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="***********"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {formError.newPassword && <p className="error">{formError.newPassword}</p> }
          </div>

          <div className="form-group">
            <input className="button" type="submit" value={ `${loading ? "Changing.." : "Change" }`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
