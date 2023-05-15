import React, { useContext, useMemo } from "react";
import styles from "./styles/styles.module.scss";
import { Data } from "./Main";

const SearchComponent = () => {
  const { storeTrendingTopics } = useContext(Data);
  console.log(storeTrendingTopics, "===== storeTrendingTopics");

  const RenderTrendingTopics = useMemo(() => {
    return (
      <div>
        <h1>Trending Topics</h1>
        <ul>
          {storeTrendingTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
    );
  }, [storeTrendingTopics]);

  return RenderTrendingTopics;
};

export default SearchComponent;
