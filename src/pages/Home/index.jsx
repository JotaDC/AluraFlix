import ListaVideos from "../../components/ListaVideos/ListaVideos"


function Home() {
    return (

        <>
            <ListaVideos categoria="Frontend" />
            <ListaVideos categoria="Backend" />
            <ListaVideos categoria="Innovación y gestión" />
        </>
    )
}

export default Home