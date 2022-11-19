import React, { useContext } from "react";
import styles from "./styles/styles.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Data } from "./Main";
import Custommodal from "./Modal";
import backgroundImage from "../images/banner.jpg";
import moment from "moment/moment";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Tooltip from '@mui/material/Tooltip';

const Home = () => {
  const {
    displayImages,
    fetchData,
    handleImageModal,
    handleInputValue,
    storeInputValue,
    showSearchImages,
    handleImageDownload

  } = useContext(Data);
  return (
    <>
      <header>
        <div className={styles.container}>
          <div className={styles.searchWrapper}>
            <input type="text" placeholder="Search high-resolution photos" onChange={(e) => handleInputValue(e.target.value)}></input>
          </div>
          <div className={styles.backgroundImage}>
            <img src={backgroundImage} alt="Background Image" />
            <h1 className={styles.heading}>A Simple <br />Intuitive Photo App</h1>
          </div>
        </div>
      </header>
      <section>
        <div>
          {storeInputValue ? (
            <>
              <div className={styles.photoGrid}>
                {showSearchImages.map((items, index) => {
                  return (
                    <div className={styles.photoWrapper} key={index}>
                      <img src={items.urls.regular} alt="Photos" className={styles.gridImage} />
                      <div className={styles.photoContentWrapper}>
                        <div className={styles.userProfile}>
                          <div className={styles.col}>
                            <img src={items.user.profile_image.medium} alt="User Photo" />
                            <h1><a href={items.user.social.portfolio_url} target="blank">{items.user.name}</a></h1>
                            <p>{moment(items.created_at).format("DD MMM YYYY")}</p>
                          </div>
                          <div className={styles.col}>
                            <Tooltip title="Enlarge">
                              <FontAwesomeIcon
                                icon={faMaximize}
                                onClick={() =>
                                  handleImageModal(items.urls.regular, items.id)
                                }
                              />
                            </Tooltip>
                            <Tooltip title="Download">
                              <DownloadForOfflineIcon onClick={() => handleImageDownload(items.links.download, items.width, items.height)} />
                            </Tooltip>
                            <p>{items.likes} Likes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Custommodal />
            </>
          ) : (
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
              style={{ overflow: "inherit" }}
            >
              {displayImages.map((items, index) => {
                return (
                  <div className={styles.photoWrapper} key={index}>
                    <img src={items.urls.regular} alt="Photos" className={styles.gridImage} />
                    <div className={styles.photoContentWrapper}>
                      <div className={styles.userProfile}>
                        <div className={styles.col}>
                          <img src={items.user.profile_image.medium} alt="User Photo" />
                          <h1><a href={items.user.social.portfolio_url} target="blank">{items.user.name}</a></h1>
                          <p>{moment(items.created_at).format("DD MMM YYYY")}</p>
                        </div>
                        <div className={styles.col}>
                          <Tooltip title="Enlarge">
                            <FontAwesomeIcon
                              icon={faMaximize}
                              onClick={() =>
                                handleImageModal(items, index)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <DownloadForOfflineIcon onClick={() => handleImageDownload(items.links.download, items.width, items.height)} />
                          </Tooltip>
                          <p>{items.likes} Likes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Custommodal />
            </InfiniteScroll>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
