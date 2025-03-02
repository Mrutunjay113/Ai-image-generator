import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import { useUser } from "../context/UserContext";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setloading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchText, setsearchText] = useState("");
  const { posts, addPost } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true);
      try {
        const response = await fetch(
          "https://ai-image-generator-apii-tau.vercel.app/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
          addPost(result.data.reverse());
          const log = result.data.reverse();
          console.log(log);
        }
      } catch (error) {
        alert(error);
      } finally {
        setloading(false);
      }
    };
    fetchPosts();
  }, []);
  const handleSearchChange = (e) => {
    setsearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="head_text orange_gradient">The Community ShowCase</h1>
        <p className="desc">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>
      <div className="mt-8">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-5">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for:
                <span className="text-[#222328]"> {searchText}</span>
              </h2>
            )}
            <div
              className="grid lg:grid-cols-4
             sm:grid-cols-3
             xs:grid-cols-2 grid-cols-1 gap-3"
            >
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Result Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
