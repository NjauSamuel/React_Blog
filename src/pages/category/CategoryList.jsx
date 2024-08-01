import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";

const CategoryList = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      try{
        setLoading(true);

        // Api Request
        const response = await axios.get(`category?page=${currentPage}&q=${searchValue}`)
        const data = response.data.data
        setCategories(data.categories)
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

    getCategories();
  }, [currentPage])

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
  }, [totalPage])

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentPage((next) => next + 1)
  }

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  const handleSearch = async (e) => {
    try{
      const input = e.target.value;
      setSearchValue(input);

      const response = await axios.get(`/category?q=${input}&page=${currentPage}`)
      const data = response.data.data;

      setCategories(data.categories)
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
    <div>
      <button className="button button-block" onClick={() => navigate("new-category")}>Add New Category</button>
      <h2 className="table-title">Category list</h2>
      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      {loading ? "Loading..." : 
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.title}</td>
              <td>{category.desc}</td>
              <td>{moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
              <td>{moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</td>
              <th>
                <button className="button" onClick={() => navigate("update-category")}>Update</button>
                <button className="button">Delete</button>
              </th>
            </tr> 
          )) }        
        </tbody>
      </table>}

      {pageCount.length && (
        <div className="pag-container">

          <button className="pag-button" onClick={handlePrevious} disabled={currentPage === 1}>prev</button>

          {pageCount.map((pageNumber, index) => (
            <button className="pag-button" key={index} onClick={() => handlePage(pageNumber)} style={{backgroundColor: currentPage === pageCount ? "#ccc" : ""}}>
              {pageNumber}
            </button>
          ))}

          <button className="pag-button" onClick={handleNext} disabled={currentPage === totalPage}>next</button>

        </div>
      )}
    </div>
  );
};

export default CategoryList;
