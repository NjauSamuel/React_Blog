import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useAuth } from "../components/context/AuthContext";

const VerifyUser = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading2, setLoading2] = useState(false);


  const auth = useAuth();

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();

    try{
      setLoading(true);

      // API request

      const response = await axios.post("auth/send-verification-email", {email: auth.email})

      const data = response.data;

      toast.success(data.message, {
        autoClose: 6000,
      });
      
      setLoading(false);
      
    }catch(error){
      setLoading(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        autoClose: 6000,
      });
      
    }
  }

  const handleSubmit = async(e) => {

    e.preventDefault();

    if(code){
      try{
        setLoading2(true);
        setCodeError("");
        // API request
        const response = await axios.post("auth/verify-user", {email: auth.email, code: code});
  
        const data = response.data;
  
        toast.success(data.message, {
          autoClose: 6000,
        });

        window.localStorage.removeItem("blogData");
        navigate("/login")
        
        setLoading2(false);
        setCode("");
      }catch(error){
        setLoading(false);
        setCode("");
        setCodeError("");
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          autoClose: 6000,
        });
        
      }
    }else{
      setCodeError("Verification Code is Required!");
    }

  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center">
      <button className="button button-block absolute top-16 left-4" onClick={() => navigate(-1)}>Go Back</button>

      <button className="button button-block absolute top-32 left-4" onClick={handleSendVerificationCode}>
        { loading ? "Sending..." : "Send verification code" }
      </button>

      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Verify Email</h2>
          <div className="form-group">
            <label>Confirmation Code</label>
            <input
              className="form-control"
              type="text"
              name="code"
              placeholder="789654"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {codeError && <p className="error">{codeError}</p>}
          </div>

          <div className="form-group">
            <input className="button" type="submit" value={loading2 ? "Verifying..." : "Verify"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
