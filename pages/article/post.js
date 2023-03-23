import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

export default function Article({ article }) {
  return (
    <>
      <Header />
      <div className="flex h-screen p-8 px-32 space-x-16">
        <div className="flex-grow w-full">
          <div className="relative w-full max-w-[720px] h-full max-h-[400px]">
            <Image
              src={
                article.urlToImage
                  ? article.urlToImage
                  : "https://letusstudy.in/clientside/images/no-image.png"
              }
              layout="fill"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex-grow w-full space-y-6">
          <h1 className="font-sans font-bold text-3xl ">{article.title}</h1>
          <p className="font-sans font-bold text-lg">{article.description}</p>
          <p className="font-sans font-bold text-sm">{article.content}</p>
          <Link href={article.url} target={"_blank"}>
            <button className="bg-teal-600 p-2 px-4 rounded-lg font-bold text-white cursor-pointer mt-8">
              Click to visit news website
            </button>
          </Link>
          <h3 className="font-semibold">
            <span className="text-red-500">Note:-</span>Full Content is not
            provided by the API. But after searching, I found that we could
            scrap it from the news url, But every website has its own DOM
            structure, So it could be implemented by taking two or three news
            websites, But search results will be limited to these only, So
            provided the link to visit the news post URL.
          </h3>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { url, title, description, author, publishedAt, content, urlToImage } =
    query;
  return {
    props: {
      article: {
        url,
        title,
        description,
        author,
        publishedAt,
        content,
        urlToImage,
      },
    },
  };
}
