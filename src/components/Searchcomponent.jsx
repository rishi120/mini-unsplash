import React, { useContext, useMemo } from "react";
import styles from "./styles/styles.module.scss";
import { Data } from "./Main";

const SearchComponent = () => {
  const { storeTrendingTopics, dataLoader } = useContext(Data);

  const RenderTrendingTopics = useMemo(() => {
    return (
      <div className={styles.searchComponentWrapper}>
        <h4>Trending Topics</h4>
        {dataLoader && <p>Loading...</p>}
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
