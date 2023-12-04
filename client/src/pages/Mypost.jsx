import axios from "axios";
import React, { useState, useEffect } from "react";
import UserCard from "../components/userCard";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Mypost = () => {
  const [userPost, setUserPost] = useState([]);
  const [name, setName] = useState("");
  const { user, setUserData } = useUser();
  const navigate = useNavigate();

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <UserCard key={post.id} {...post} />);
    }
  };

  const fetchUserData = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/post/mypost",
        { name: username }
      );
      const data = response.data.data;
      setUserPost(data);
    } catch (error) {}
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    const auth = localStorage.getItem("auth");
    if (auth) fetchUserData(username);
    else navigate("/signup");
  }, []);
  return (
    <>
      <div className="p-5">
        <div>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{user.username}'s Profile</span>
          </h1>
        </div>

        {/* <div>{<RenderCards data={userData} />}</div>
         */}
        <div className="mt-8 md:flex md:gap-4 ">
          {userPost.length > 0 ? (
            <RenderCards data={userPost} key={userPost.id} />
          ) : (
            <h1 className="orange_gradient text-xl font-bold text-left">
              No Post Found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Mypost;
