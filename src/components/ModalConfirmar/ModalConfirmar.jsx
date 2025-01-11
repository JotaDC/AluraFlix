import React from "react";
import styles from "./ModalConfirmar.module.css";

const ModalConfirmar = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{mensaje}</p>
        <div>
          <button onClick={onConfirmar} className={styles.botonConfirmar}>
            Sí
          </button>
          <button onClick={onCancelar} className={styles.botonCancelar}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmar;
