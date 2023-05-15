import React, { useContext, useMemo } from "react";
import styles from "./styles/styles.module.scss";
import { Data } from "./Main";
import searchImage from "../images/trend.png";

const SearchComponent = () => {
    const { storeTrendingTopics, dataLoader, storeTrendingSearchTerms } = useContext(Data);

    const RenderTrendingTopics = useMemo(() => {
        return (
            <div className={styles.searchComponentWrapper}>
                <div className={styles.trendingSearchComponentWrapper}>
                    <h4>Trending Topics</h4>
                    {dataLoader && <p>Loading...</p>}
                    <ul>
                        {storeTrendingTopics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.trendingSearchComponentWrapper}>
                    <h4>Trending Searches</h4>
                    {dataLoader && <p>Loading...</p>}
                    <ul>
                        {storeTrendingSearchTerms.map((searchTerm, index) => (
                            <li key={index}><img src={searchImage} alt="Trend"/> {searchTerm.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }, [storeTrendingTopics]);

    return RenderTrendingTopics;
};

export default SearchComponent;
