import React, { useContext } from "react";
import styles from "./styles/styles.module.scss";
import Modal from "react-modal";
import { Data } from "./Main";

const Custommodal = () => {
  const { modal, showImage } = useContext(Data);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  return (
    <>
      <Modal
        isOpen={modal}
        //  onAfterOpen={afterOpenModal}
        //  onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.customModal}>
          <img src={showImage} alt="img" />
        </div>
      </Modal>
    </>
  );
};

export default Custommodal;
