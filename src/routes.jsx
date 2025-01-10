import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Cabecera from "./components/Cabecera/Cabecera"
import Banner from "./components/Banner"




function AppRoutes(){
    return(
        <BrowserRouter>
            <Cabecera/>
            <Banner img="home" color="#000000"/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes