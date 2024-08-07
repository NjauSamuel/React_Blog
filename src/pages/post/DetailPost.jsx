import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import PostModal from "../../components/modals/postModal";

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


  // DELETING LOGIC And Modal Manenoz. 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmDelete = async () => {
    // Handle the deletion logic here
    console.log('Post deleted');

    try{
      const response = await axios.delete(`posts/${postId}`)
      const data = response.data;
      toast.success(data.message, {
        autoClose: 6000,
      });

      navigate("/posts")
    }catch(error){
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        autoClose: 6000,
      });
    }
    setIsModalOpen(false);
  };


  return (
    <div>
      <button className="button button-block ml-3" onClick={() => navigate("/posts")}>Go Back</button>
      <button className="button button-block ml-3" onClick={() => navigate(`/posts/update-post/${post._id}`)}>Update Post</button>
      <button className="button button-block ml-3" onClick={() => {handleOpenModal()}}>Delete Post</button>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">{post?.category.title}</h5>
        <h5 className="post-category">{moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</h5>
        <h5 className="post-category">{moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</h5>
        <p className="post-desc"> {post?.desc} </p>

        {fileUrl ? <img src={fileUrl} alt="Post Image" /> : null}

        <PostModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />

      </div>
    </div>
  );
};

export default DetailPost;
