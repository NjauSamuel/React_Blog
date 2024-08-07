import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      try{
        setLoading(true);

        // Api Request
        const response = await axios.get(`posts?page=${currentPage}&q=${searchValue}`)
        const data = response.data.data
        setPosts(data.posts)
        setTotalPage(data.pages);

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

    getPosts();
  }, [currentPage, searchValue]);


  useEffect(() => {
    if(totalPage > 1){
      let tempPageCount = [];

      for(let i = 1;i <= totalPage; i++){
        tempPageCount= [...tempPageCount, i]
      }

      setPageCount(tempPageCount)
    }else{
      setPageCount([])
    }
  }, [totalPage]);


  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentPage((next) => next + 1)
  }

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Handle Search Functionality
  const handleSearch = async (e) => {
    try{
      const input = e.target.value;
      setSearchValue(input);

      const response = await axios.get(`/posts?q=${input}&page=${currentPage}`)
      const data = response.data.data;

      setPosts(data.posts)
      setTotalPage(data.pages)
    }catch(error){
      setLoading(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        autoClose: 6000,
      });
    }
  }


  return (
    <div className="px-3 pb-3">
      
      <h2 className="table-title mt-6">Post list</h2>

      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      <div className="flexbox-container wrap min-h-[365px]">

        {loading ? "Loading.." :   
          posts.map((post) => (
            <div className="post-card" key={post._id} onClick={() => navigate(`/posts/detail-post/${post._id}`)}>
              <h4 className="card-title">{post.title}</h4>
              <div className="flex min-h-[96px] items-center">
                <p className="card-desc">
                  {post.desc.length > 50 ? `${post.desc.substring(0, 50)}...` : post.desc}
                </p>
              </div>
            </div>
          ))
        }
        
      </div>

      {pageCount.length > 0 && (
        <div className="my-3 pag-container">

          <button className="pag-button" onClick={handlePrevious} disabled={currentPage === 1}>prev</button>

          {pageCount.map((pageNumber, index) => (
            <button className={`pag-button`} key={index} onClick={() => handlePage(pageNumber)} style={{backgroundColor: currentPage === pageNumber ? "#ccc" : ""}}>
              {pageNumber}
            </button>
          ))}

          <button className="pag-button" onClick={handleNext} disabled={currentPage === totalPage}>next</button>

        </div>
      )}

    </div>
  );
};

export default Home;
