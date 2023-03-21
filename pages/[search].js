import React from "react";

export default function SearchQuery({ articles }) {
  return <div></div>;
}

export async function getServerSideProps({ suggestionsArticles }) {
  const { articles } = suggestionsArticles;
  return {
    props: {
      articles: { articles },
    },
  };
}
