import React, { useContext } from "react";
import styles from "./styles/styles.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Data } from "./Main";
import Custommodal from "./Modal";

const Home = () => {
  const {
    headingName,
    displayImages,
    fetchData,
    handleImageModal
  } = useContext(Data);
  console.log(displayImages, "===== displayImages");
  return (
    <section>
      <h1 className={styles.heading}>{headingName}</h1>
      <div>
        <InfiniteScroll
          dataLength={displayImages.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          className={styles.photoGrid}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {displayImages.map((items, index) => {
            return (
              <div className={styles.photoWrapper} key={index}>
                <img src={items.urls.regular} alt="Photos" />
                <h1>
                  <span>Photography by {items.user.name}</span>
                  <FontAwesomeIcon
                    icon={faMaximize}
                    onClick={() =>
                      handleImageModal(items.urls.regular, items.id)
                    }
                  />
                </h1>
              </div>
            );
          })}
          <Custommodal />
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Home;
