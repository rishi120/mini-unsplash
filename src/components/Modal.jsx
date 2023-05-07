import React, { useContext } from "react";
import styles from "./styles/styles.module.scss";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { Data } from "./Main";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: '600px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 2,
};

const imageWrapperStyles = {
  position: 'relative'
}

const imageStyles = {
  maxWidth: '800px',
  width: '100%',
  height: '600px',
  objectFit: 'cover',
  borderRadius: '10px'
}

const closeImageStyles = {
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  cursor: 'pointer',
  zIndex: '10',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
}

const leftNavArrow = {
  position: 'absolute',
  left: '-300px',
  top: '50%',
  cursor: 'pointer',
  zIndex: '1500',
  color: '#fff'
}

const rightNavArrow = {
  position: 'absolute',
  right: '-300px',
  top: '50%',
  cursor: 'pointer',
  zIndex: '1500',
  color: '#fff',
}

const Custommodal = () => {
  const { modal, handleModalClose, displayImages, handleNextSlide, handlePrevSlide, current, searchImage, showSearchImages, showPrevIcon } = useContext(Data);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            {showPrevIcon && (<ArrowCircleLeftIcon style={leftNavArrow} onClick={handlePrevSlide} />)}
            <ArrowCircleRightIcon style={rightNavArrow} onClick={handleNextSlide} />
            {searchImage ? (
              showSearchImages.map((imageData, index) => {
                return (
                  index === current && (
                    <div style={imageWrapperStyles} key={imageData.id}>
                      <img src={imageData.urls.regular} alt="img" style={imageStyles} />
                      <CloseIcon style={closeImageStyles} onClick={handleModalClose} />
                    </div>
                  )
                )
              })
            ) : (
              displayImages.map((imageData, index) => {
                return (
                  index === current && (
                    <div style={imageWrapperStyles} key={imageData.id}>
                      <img src={imageData.urls.regular} alt="img" style={imageStyles} />
                      <CloseIcon style={closeImageStyles} onClick={handleModalClose} />
                    </div>
                  )
                )
              })
            )}
          </Box>

        </Fade>
      </Modal>
    </>
  );
};

export default Custommodal;
