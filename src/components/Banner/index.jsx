import styles from "./Banner.module.css"
function Banner({img, color}){
    return(
        // <div classname={styles.capa} style={{backgroundImage:`url('./img/banner-${img}.png')`}}>
          
            <div className={styles.container}>
                <img src={`./img/banner-${img}.png`} />
            </div>
     
    )
}

export default Banner