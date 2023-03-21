import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Category from "../components/Category";
import Header from "../components/Header";
import Image from "next/image";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );

      const articles = results.data.articles;
      setArticles(articles);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory.length == 0) return;
      const noOfArticles = 20 / selectedCategory.length;
      const results = await Promise.all(
        selectedCategory.map((category) =>
          axios.get(
            `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${noOfArticles}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
          )
        )
      );
      setArticles(
        shuffleArray(
          results.reduce((acc, result) => [...acc, ...result.data.articles], [])
        )
      );
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory([...selectedCategory, category]);
  };

  return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <div className="flex-grow">
          <h1 className="font-bold text-2xl m-8 ml-10">Top News</h1>
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
        </div>
        <div className="min-w-[300px] h-screen">
          <Category onChange={handleCategoryChange} />
        </div>
      </div>
    </div>
  );
}
