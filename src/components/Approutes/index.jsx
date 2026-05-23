import Login from "@/pages/Auth/Login";
import NotFound from "@/pages/NotFound";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaulLayout";
import DashBoard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import Groups from "@/pages/Groups";

function Approutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout/>}>
                    <Route path="/" element={<Navigate to="/dash-board" replace/> }/>
                    <Route path="/dash-board" element={<DashBoard/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/groups" element={<Groups/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Approutes
