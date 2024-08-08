import { useState } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import sendCodeValidator from "../validators/sendCodeValidator";
import recoverPasswordValidator from "../validators/recoverPasswordValidator"
import { useNavigate } from "react-router-dom";

const initialFormData = {email: '', code: '',  password: ''};
const initialFormError = {code: '', password: ""};

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSendCode = async (e) => {

    e.preventDefault();

    const errors = sendCodeValidator({email: formData.email});

    if(errors.email){
      setEmailError(errors.email);
    }else{
      try{
        setLoading(true);

        // API request
        const response = await axios.post("auth/forgot-password-code", {email: formData.email});
        const data = response.data;
        toast.success(data.message, {
          autoClose: 6000,
        });
        setHasEmail(true)
        setLoading(false);
      }catch(error){
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.success(data.message, {
          autoClose: 6000,
        });
        console.log(error.message)
      }
    }
  }

  //Submit The Code
  const handleRecoverPassword = async(e) => {

    e.preventDefault();

    const errors = recoverPasswordValidator({
      code: formData.code, 
      password: formData.password
    });

    if(errors.code || errors.password ){
      setFormError(errors)
    } else{
      try{
        setLoading(true);

        // API request
        const response = await axios.post("auth/recover-password", formData);

        const data = response.data;

        toast.success(data.message, {
          autoClose: 6000,
        });

        setFormData(initialFormData)
        setFormError(initialFormError)
        setLoading(false);
        navigate("/login");
      }catch(error){
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.success(data.message, {
          autoClose: 6000,
        });
        console.log(error.message)
      }
    }
  }

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword}>
        <h2 className="form-title">{!hasEmail ? "Recover Password" : "Enter New Password"}</h2>

        {!hasEmail ? (

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="doe@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {formError.email && <p className="error">{formError.email}</p> }
            </div>

          ) : (
            <>
              <div className="form-group">
                <label>Code</label>
                <input
                  className="form-control"
                  type="text"
                  name="code"
                  placeholder="1234567"
                  value={formData.code}
                  onChange={handleChange}
                />
                {formError.code && <p className="error">{formError.code}</p> }
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="***********"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formError.password && <p className="error">{formError.password}</p> }
              </div>
            </>

          )
        }

        <div className="form-group">
          <input className="button" type="submit" value={loading ? "Sending..." : "Send"} />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
