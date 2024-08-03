import placeImg from "../../assets/images/place.jpeg"
import { useNavigate } from "react-router-dom";

const PostList = () => {

  const navigate = useNavigate()

  return (
    <div className="px-3 pb-3">
      <button className="button button-block" onClick={() => navigate("new-post")}>Add New Post</button>
      <h2 className="table-title">Post list</h2>

      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
      />

      <div className="flexbox-container wrap">

        <div className="post-card" onClick={() => navigate("detail-post")}>
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>

        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">Post 1</h4>
          <p className="card-desc">
            Lorem, ipsum dolor sit amet consectetur.
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
      </div>

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

export default PostList;
