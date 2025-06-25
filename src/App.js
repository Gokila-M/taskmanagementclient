import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./Components/CreateUser";
import Login from "./Components/Login";
import CreateTask from "./Components/CreateTask";
import Task from "./Components/Task";
import Dashboard from "./Components/User";
// import { useContext, useEffect } from "react";
// import { getUserProfile } from "./utility/ApiServices";
function App() {
    
   
return (
	<Router>
	
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<CreateUser />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Dashboard/tasks" element={<Task />} />
                <Route path="/Dashboard/createTask" element={<CreateTask/>} />
               
            </Routes>
	</Router>
);
}
export default App;
