import styles from "./Card.module.css"

function Card(id,capa,titulo){
    return(
       <div className={styles.container}>
            <img src={capa} alt={titulo} className="styles.capa" />
            <h2>{titulo}</h2>
            <img src="" />
       </div> 
    )
}

export default Card