import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const initialUserState = {
    username: "",
    auth: false,
    email: "",
  };
  const [user, setUser] = useState(initialUserState);

  const [posts, setPosts] = useState([]); // Array to store posts

  const setUserData = (username, auth, email) => {
    setUser({ username, auth, email });
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  const logout = () => {
    // Reset user state to default values
    setUser(initialUserState);
  };

  return (
    <UserContext.Provider value={{ user, setUserData, posts, addPost, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
