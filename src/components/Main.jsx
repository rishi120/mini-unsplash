import React, { useState, useEffect, createContext, useRef, useMemo } from "react";
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
  // show prev indicator.
  const [showPrevIcon, setShowPrevIcon] = useState(true);
  // show next indicator.
  const [showNextIcon, setShowNextIcon] = useState(true);
  // store the trending topics.
  const [storeTrendingTopics, setStoreTrendingTopics] = useState([]);
  // to show data loader.
  const [dataLoader, setDataLoader] = useState(true);
  // to store the trending search terms.
  const [storeTrendingSearchTerms, setStoreTrendingSearchTerms] = useState([]);

  const selectInput = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(baseUrl + `/photos/random?client_id=${accessKey}&count=10`)
      .then((response) => {
        setDisplayImages([...displayImages, ...response.data]);
        fetchTrendingSearchTerms();
        fetchTrendingTopics();
      })
      .catch((error) => {
        console.log(error, "====== error");
      });
  };

  const fetchTrendingSearchTerms = () => {
    axios
      .get(baseUrl + `collections?client_id=${accessKey}`)
      .then((response) => {
        const storeTheTagsForTheSearchTerm = [];
        response.data.forEach((items) => {
          items.tags.forEach((fetchTags) => {
            if (fetchTags.type === "search") {
              storeTheTagsForTheSearchTerm.push(fetchTags);
            }
          });
        });

        const firstNineTags = storeTheTagsForTheSearchTerm.slice(0, 9);
        console.log(firstNineTags, "===== firstNineTags");
        setStoreTrendingSearchTerms(firstNineTags);
      })
      .catch((error) => {
        console.log(error, "====== error");
        setDataLoader(false);
      });
  }

  const fetchTrendingTopics = () => {
    setDataLoader(true);
    axios
      .get(baseUrl + `/search/photos?client_id=${accessKey}&query=trending`)
      .then((response) => {
        const trendingTopics = response.data.results.map(result => result.tags[0].title);
        setStoreTrendingTopics(trendingTopics);
        setDataLoader(false);
      })
      .catch((error) => {
        console.log(error, "====== error");
        setDataLoader(false);
      });
  }

  const handleImageModal = (index) => {
    console.log(showSearchImages, "==== showSearchImages");
    showModal(index + 1);
    setCurrent(index);
    setShowPrevIcon(index === 0 ? false : true);
    if ((index === showSearchImages.length - 1) || (index === displayImages.length - 1)) {
      setShowNextIcon(false);
    } else {
      setShowNextIcon(true);
    }
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
        .get(baseUrl + `/search/photos?client_id=${accessKey}&page=1&query=${storeInputValue}`)
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

  const handleImageDownload = async (photo_id) => {
    const headers = {
      Authorization: accessKey
    }
    const response = await axios({
      url: baseUrl + `photos/${photo_id}/download`,
      method: 'GET',
      headers,
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'photo.jpg');
    document.body.appendChild(link);
    link.click();

    // saveAs(download + `&w=${width}&h=${height}`, 'image.jpg') // Put your image url here.
  }

  const handleNextSlide = () => {
    const length = displayImages.length;

    setShowPrevIcon(true);

    const nextCurrent = current === length - 1 ? 0 : current + 1;
    setCurrent(nextCurrent);

    if (
      (nextCurrent === showSearchImages.length - 1) ||
      (nextCurrent === displayImages.length - 1) ||
      (nextCurrent === length - 1)
    ) {
      setShowNextIcon(false);
    } else {
      setShowNextIcon(true);
    }

  }


  const handlePrevSlide = () => {
    if (current === 1) {
      setShowPrevIcon(false);
    }
    setCurrent(current === 0 ? 0 : current - 1);
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
    selectInput,
    showPrevIcon,
    showNextIcon,
    storeTrendingTopics,
    dataLoader,
    storeTrendingSearchTerms

  };

  const Renderoptimizedmaincomponent = useMemo(() => {
    return (
      <Data.Provider value={values}>
        <ScrollToTop smooth color="#111" top="1000" />
        <Home />
      </Data.Provider>

    )
  }, [displayImages,
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
    selectInput,
    showPrevIcon,
    showNextIcon,
    storeTrendingTopics,
    dataLoader,
    storeTrendingSearchTerms]);

  return Renderoptimizedmaincomponent
};

export default Main;
export { Data };
