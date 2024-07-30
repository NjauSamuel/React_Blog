import { useNavigate } from "react-router-dom";

const CategoryList = () => {

  const navigate = useNavigate();

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
          <tr>
            <td>Category 1</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button" onClick={() => navigate("update-category")}>Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 2</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 3</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 4</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 5</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 6</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 7</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 8</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 9</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
          <tr>
            <td>Category 10</td>
            <td>Test Description</td>
            <td>2023-10-01 14:43:52</td>
            <td>2023-10-01 14:43:52</td>
            <th>
              <button className="button">Update</button>
              <button className="button">Delete</button>
            </th>
          </tr>
        </tbody>
      </table>

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
