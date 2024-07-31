import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";

const CategoryList = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try{
        setLoading(true);

        // Api Request
        const response = await axios.get("category")
        const data = response.data.data
        setCategories(data.categories)

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
  }, [])

  return (
    <div>
      <button className="button button-block" onClick={() => navigate("new-category")}>Add New Category</button>
      <h2 className="table-title">Category list</h2>
      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
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

      <div className="pag-container">
        <button className="pag-button">prev</button>
        <button className="pag-button">1</button>
        <button className="pag-button">2</button>
        <button className="pag-button">3</button>
        <button className="pag-button">next</button>
      </div>
    </div>
  );
};

export default CategoryList;
