import ListaVideos from "../../components/ListaVideos/ListaVideos"
import Banner from "../../components/Banner"

function Home() {
    return (

        <>
            <Banner img="home" color="#000000"/>
            <ListaVideos categoria="Frontend" />
            <ListaVideos categoria="Backend" />
            <ListaVideos categoria="Innovación y gestión" />
        </>
    )
}

export default Home