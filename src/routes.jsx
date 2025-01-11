import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Cabecera from "./components/Cabecera/Cabecera"
import Banner from "./components/Banner"
import Pie from "./components/Pie"
// import ListaVideos from "./components/ListaVideos/ListaVideos"
import NuevoVideo from "./pages/NuevoVideo"




function AppRoutes(){
    return(
        <BrowserRouter>
            <Cabecera/>
          
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/nuevo-video" element={<NuevoVideo/>}></Route>

            </Routes>

            <Pie/>
        </BrowserRouter>
    )
}

export default AppRoutes