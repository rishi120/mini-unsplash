import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { baseUrl } from "./utils/baseUrl";
import Home from "./Home";
import { debounce } from "lodash";
import { saveAs } from 'file-saver'

const Data = createContext();

const Main = () => {
  const accessKey = process.env.REACT_APP_KEY;
  const [displayImages, setDisplayImages] = useState([]);
  const [showSearchImages, setShowSearchImages] = useState([]);
  // to display the modal.
  const [modal, showModal] = useState(false);
  // to store the input value.
  const [storeInputValue, setStoreInputValue] = useState("");
  // current index.
  const [current, setCurrent] = useState(0);
  // to determine the search state.
  const [searchImage, setSearchImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(baseUrl + `/photos/random/?client_id=${accessKey}&count=10`)
      .then((response) => {
        setDisplayImages([...displayImages, ...response.data]);
      })
      .catch((error) => {
        console.log(error, "====== error");
      });
  };

  const handleImageModal = (index) => {
    showModal(index);
    setCurrent(index);
  };

  const handleModalClose = () => {
    showModal(false);
  }

  const handleInputValue = (e) => {
    setStoreInputValue(e);
    if (e.length === 0) {
      setSearchImage(false);
      fetchData();
    }
  };

  const handleImageSearch = debounce(() => {
    setSearchImage(true);
    axios
      .get(baseUrl + `/search/photos/?client_id=${accessKey}&page=1&query=${storeInputValue}`)
      .then((response) => {
        setShowSearchImages(response.data.results);
      })
      .catch((error) => {
        console.log(error, "====== error");
      });

  }, 1000);

  const handleImageDownload = (download, width, height) => {
    saveAs(download + `&w=${width}&h=${height}`, 'image.jpg') // Put your image url here.
  }

  const handleNextSlide = () => {
    const length = displayImages.length;
    setCurrent(current === length - 1 ? 0 : current + 1);
    // fetchData();
  }

  const handlePrevSlide = () => {
    const length = displayImages.length;
    setCurrent(current === length - 1 ? 0 : current - 1);
  }

  const values = {
    displayImages,
    fetchData,
    handleImageModal,
    modal,
    handleModalClose,
    handleInputValue,
    showSearchImages,
    handleImageDownload,
    handleNextSlide,
    handlePrevSlide,
    current,
    handleImageSearch,
    searchImage

  };
  return (
    <Data.Provider value={values}>
      <Home />
    </Data.Provider>
  );
};

export default Main;
export { Data };
