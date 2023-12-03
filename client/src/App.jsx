import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { logo } from "./assets";

import { Home, CreatePost, Signup } from "./pages";
import Mypost from "./pages/Mypost";
import NavBar from "./components/NavBar";
import Page_404 from "./pages/Page_404";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header className="">
          <NavBar />
        </header>
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypost" element={<Mypost />} />
            <Route path="*" element={<Page_404 />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
