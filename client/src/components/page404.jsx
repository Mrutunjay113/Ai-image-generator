import React from "react";
import "./page404.css";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="page_404">
      <div className="mx-auto">
        <div className=" text-center">
          <div className="four_zero_four_bg mb-28">
            <h1 className="text-8xl">404</h1>
          </div>

          <div className="contant_box_404">
            <h3 className=" text-lg font-bold">Look like you're lost</h3>
            <p>the page you are looking for not available!</p>
            <Link to="/" className="link_404">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
