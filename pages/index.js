import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Category from "../components/Category";
import Header from "../components/Header";
import Image from "next/image";

const sortOptions = ["relevancy", "popularity", "publishedAt"];

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  let startPage = page - 2 <= 0 ? 1 : page - 2;
  let endPage =
    startPage + 4 > Math.ceil(totalResults / 5)
      ? Math.ceil(totalResults / 5)
      : startPage + 4;

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery != "") return;
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&language=en&category=${selectedCategory}&page=${page}&pageSize=${5}&apiKey=${
          process.env.NEXT_PUBLIC_NEWS_API_KEY
        }`
      );
      setTotalResults(response.data.totalResults);
      const articles = response.data.articles;
      setArticles(articles);
    };

    fetchData();
  }, [searchQuery, selectedCategory, page]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (searchQuery == "") return;
      const response = await axios.get(
        `https://newsapi.org/v2/everything?language=en&q=${searchQuery}&sortBy=${sortValue}&page=${page}&pageSize=${5}&apiKey=${
          process.env.NEXT_PUBLIC_NEWS_API_KEY
        }`
      );
      setTotalResults(response.data.totalResults);
      const articles = response.data.articles;
      setArticles(articles);
    };

    fetchArticles();
  }, [searchQuery, sortValue, page]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleQueryChange = (query) => {
    setSortValue("relevancy");
    setPage(1);
    setSearchQuery(query);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSelectPage = (pageClicked) => {
    setPage(pageClicked);
  };

  const handleNext = () => {
    if (page < Math.ceil(totalResults / 5)) setPage(page + 1);
  };
  return (
    <div>
      <Header change={handleQueryChange} />
      <div className="flex min-h-screen">
        <div className="flex-grow">
          <div className="flex">
            <h1 className="font-bold flex-grow text-2xl m-8 ml-10">Top News</h1>
            {searchQuery && (
              <div className="relative lg:max-w-sm flex items-center">
                <h4 className="font-bold text-sm">Sort By :- </h4>
                <select
                  onChange={(e) => setSortValue(e.target.value)}
                  value={sortValue}
                  className="w-fit min-w-[200px] p-2.5 m-2 mr-10 text-gray-500 bg-white border rounded-md shadow-sm outline-none cursor-pointer focus:border-teal-600"
                >
                  <option>Please Select Value</option>
                  {sortOptions.map((sortOption) => (
                    <option value={sortOption} key={sortOption}>
                      {sortOption}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {articles.map((article) => (
            <div className="m-8 ml-10 pr-32 flex" key={article.url}>
              <div className="relative w-full max-w-[260px] h-40 my-auto mr-10">
                <Image
                  src={
                    article.urlToImage
                      ? article.urlToImage
                      : "https://letusstudy.in/clientside/images/no-image.png"
                  }
                  layout="fill"
                  style={{ objectFit: "fill" }}
                />
              </div>
              <div className="">
                <h2 className="font-bold">{article.title}</h2>
                <Link
                  href={{
                    pathname: `/article/${article.title}`,
                    query: { ...article },
                  }}
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handlePrevious}
              className={`p-2 px-5 m-4 bg-teal-500 rounded-lg font-semibold text-white ${
                page <= 1 ? "opacity-0" : ""
              }`}
            >
              Previous
            </button>
            <div className="m-4 p-2 px-5">
              {startPage > 1 && (
                <span
                  onClick={() => handleSelectPage(1)}
                  className={`px-4 py-3 cursor-pointer border ${
                    1 == page ? "bg-gray-300" : ""
                  }`}
                >
                  {1}
                </span>
              )}
              {startPage > 1 && <span className="px-4 py-3">. . .</span>}
              {[...Array(Math.ceil(totalResults / 5))].map((_, i) => {
                if (startPage <= i + 1 && endPage >= i + 1) {
                  return (
                    <span
                      onClick={() => handleSelectPage(i + 1)}
                      className={`px-4 py-3 cursor-pointer border ${
                        i + 1 == page ? "bg-gray-300" : ""
                      }`}
                    >
                      {i + 1}
                    </span>
                  );
                }
              })}
              {endPage < Math.ceil(totalResults / 5) && (
                <span className="px-4 py-3">. . .</span>
              )}
              {endPage < Math.ceil(totalResults / 5) && (
                <span
                  onClick={() => handleSelectPage(Math.ceil(totalResults / 5))}
                  className={`px-4 py-3 cursor-pointer border ${
                    Math.ceil(totalResults / 5) == page ? "bg-gray-300" : ""
                  }`}
                >
                  {Math.ceil(totalResults / 5)}
                </span>
              )}
            </div>
            <button
              onClick={handleNext}
              className={`p-2 px-5 m-4 bg-teal-500 rounded-lg font-semibold text-white ${
                page >= Math.ceil(totalResults / 5) ? "opacity-0" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="min-w-[300px] h-screen">
          {searchQuery == "" ? (
            <Category onChange={handleCategoryChange} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
