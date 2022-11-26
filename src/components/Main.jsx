import React, { useState, useEffect, createContext, useRef } from "react";
import axios from "axios";
import { baseUrl } from "./utils/baseUrl";
import Home from "./Home";
import { debounce } from "lodash";
import { saveAs } from 'file-saver'
import ScrollToTop from "react-scroll-to-top";

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
  // to add a validation if input field is empty.
  const [addInputValidation, setAddInputValidation] = useState(false);

  const selectInput = useRef(null);

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
    console.log(index, "===== index");
    showModal(index);
    setCurrent(index);
  };

  const handleModalClose = () => {
    showModal(false);
  }

  const handleInputValue = (e) => {
    setStoreInputValue(e);
    setAddInputValidation(false);
    if (e.length === 0) {
      setSearchImage(false);
      fetchData();
    }
  };

  const handleImageSearch = debounce(() => {
    if (storeInputValue.length === 0) {
      setTimeout(() => {
        selectInput.current && selectInput.current.focus();
      }, 100);
      setAddInputValidation(true);
      setSearchImage(false);
    } else {
      setSearchImage(true);
      axios
        .get(baseUrl + `/search/photos/?client_id=${accessKey}&page=1&query=${storeInputValue}`)
        .then((response) => {
          setShowSearchImages(response.data.results);
        })
        .catch((error) => {
          console.log(error, "====== error");
        });
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }, 500);

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
    searchImage,
    addInputValidation,
    selectInput

  };
  return (
    <Data.Provider value={values}>
      <ScrollToTop smooth color="#111" top="1000" />
      <Home />
    </Data.Provider>
  );
};

export default Main;
export { Data };
