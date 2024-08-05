import placeImage from "../../assets/images/place.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";

const DetailPost = () => {

  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(null);
  const [fileUrl, setFileUrl ] = useState(null);

  // Getting Data for the Post Detail(Show) Form. 
  useEffect(() => {
    if(postId){
      const getPost = async () => {
        try{
          // Api Request
          const response = await axios.get(`posts/${postId}`)
          const data = response.data.data

          setPost(data.post)         
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

  // Fetching The Image from AWS
  useEffect(() => {
    if(post && post?.file){
      const getFile = async () => {
        try{
          // Api Request
          const response = await axios.get(`file/signed-url?key=${post.file.key}`)
          const data = response.data.data

          setFileUrl(data.url);         
        }catch(error){
          setLoading(false);
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            autoClose: 6000,
          });
        }
      }

      getFile();
    }
  }, [post])

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>Go Back</button>
      <button className="button button-block" onClick={() => navigate("/posts/update-post")}>Update Post</button>
      <button className="button button-block">Delete Post</button>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">{post?.category.title}</h5>
        <h5 className="post-category">{moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</h5>
        <h5 className="post-category">{moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</h5>
        <p className="post-desc"> {post?.desc} </p>

        <img src={fileUrl} alt="mern" />
      </div>
    </div>
  );
};

export default DetailPost;
