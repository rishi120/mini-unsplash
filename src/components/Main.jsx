import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { baseUrl } from "./utils/baseUrl";
import Home from "./Home";
import { debounce } from "lodash";

const Data = createContext();

const Main = () => {
  const accessKey = process.env.REACT_APP_KEY;
  const [displayImages, setDisplayImages] = useState([]);
  // to display the modal.
  const [modal, showModal] = useState(false);
  // to display the image inside the modal.
  const [showImage, setShowImage] = useState(false);

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

  const handleImageModal = (photo, index) => {
    showModal(index);
    setShowImage(photo);
  };

  const handleModalClose = () => {
    showModal(false);
  }

  const handleInputValue = debounce((e) => {
    axios
      .get(baseUrl + `/search/photos/?client_id=${accessKey}&page=1&query=${e}`)
      .then((response) => {
        setDisplayImages(response.data.results);
      })
      .catch((error) => {
        console.log(error, "====== error");
      });
  }, 1000);

  const values = {
    displayImages,
    fetchData,
    handleImageModal,
    modal,
    showImage,
    handleModalClose,
    handleInputValue
  };
  return (
    <Data.Provider value={values}>
      <Home />
    </Data.Provider>
  );
};

export default Main;
export { Data };
