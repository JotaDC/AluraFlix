import React from "react";
import styles from "./ModalPlay.module.css";

const ModalPlay = ({ video, onCerrar }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onCerrar}>
        X
        </button>
        <h2>{video.url}</h2>
        <div className={styles.videoContainer}>
         
        <iframe
            width="100%"
            height="315"
            src={video.video_url}  
            title={video.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ModalPlay;
