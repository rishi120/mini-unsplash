import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { baseUrl } from "./utils/baseUrl";
import Home from "./Home";

const Data = createContext();

const Main = () => {
  const accessKey = "R1lPWiuQXByFD_d_TZ_LA8xgpDS_SSX7lC7J_C0PDNc";
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
      .get(baseUrl + `?client_id=${accessKey}&count=10`)
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

  const headingName = "The Photo App you always wanted";
  const values = {
    headingName,
    displayImages,
    fetchData,
    handleImageModal,
    modal,
    showImage
  };
  return (
    <Data.Provider value={values}>
      <Home />
    </Data.Provider>
  );
};

export default Main;
export { Data };
