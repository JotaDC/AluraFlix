import styles from "./Pie.module.css"
import logo from "./LogoMain.png"

function Pie() {
    return (
        <footer className={styles.pie}>
            <section className="{styles.Logocontainer">
                <img src={logo} alt="Logo Alura" />
                <p><a href="https://github.com/JotaDC" target="_blank">Realizado por Javier Cañete</a></p>
            </section>
        </footer>
    )
}

export default Pie