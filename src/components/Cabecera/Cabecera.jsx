import { Link } from "react-router-dom"
import styles from "./Cabecera.module.css"
import logo from "./LogoMain.png"
import CabeceraLink from "../CabeceraLink/CabeceraLink"
import { useState } from "react";
import { NavLink } from 'react-router-dom';

function Cabecera() {
    const [isHomeActive,setIsHomeActive]=useState(true)
    const [isNuevoVideoActive,setNuevoVideoActive]=useState(false)

  return (
    <header className={styles.cabecera}>
      <Link to="/"
      onClick={()=>{
        setIsHomeActive(!isHomeActive)
        setNuevoVideoActive(!isNuevoVideoActive)
    }}
      >
        <section className={styles.logoContainer}>
          <img src={logo} alt="Logo Alura" />
        </section>
      </Link>


      <nav>
        <NavLink
          to="/"
          onClick={()=>{
            setIsHomeActive(!isHomeActive)
            setNuevoVideoActive(!isNuevoVideoActive)
        }}
          className={() =>
            isHomeActive ? styles.seleccionado : styles.noseleccionado
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/nuevo-video"
          onClick={()=>{
            setIsHomeActive(!isHomeActive)
            setNuevoVideoActive(!isNuevoVideoActive)
        }}
          className={() =>
            isNuevoVideoActive ? styles.seleccionado : styles.noseleccionado
          }
        >
          Nuevo Video
        </NavLink>
       
      </nav>
    </header>
  );
}

export default Cabecera