// src/components/Main.js

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Upload from "./routes/UploadsComponents/Uploads";
import Myvideos from "./routes/UploadsComponents/Myvideos";

export default function Main(){

    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}></Route>
                <Route path="/login" Component={Login}></Route>
                <Route path="/register" Component={Register}></Route>
                <Route path="/Uploads" Component={Upload}></Route>
                <Route path="/Myvideos" Component={Myvideos}></Route>
            </Routes>
        </BrowserRouter>
    </div>
}