import styles from "./Pie.module.css"
import logo from "./LogoMain.png"

function Pie() {
    return (
        <footer className={styles.pie}>
            <section className="{styles.Logocontainer">
                <img src={logo} alt="Logo Alura" />
            </section>
        </footer>
    )
}

export default Pie