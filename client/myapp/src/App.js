import { Link, Navigate, Route, Router, Routes } from "react-router-dom";
import Login from "./features/auth/login";
import UserList from "./features/user/userrrr";
import HomeWorker from "./features/worker/homeWorker";
import HomeManager from "./features/manager/homeManager";
import AllWorkers from "./features/manager/allWorkers";
import AllTodos from "./features/manager/allTodos";
import Home from "./features/home";


function App() {
  return (
    <>


      
      <Routes>
        <Route path='/' element={<Login />} />
        
        <Route path='/HomeManager' element={<HomeManager />}>
        <Route path='/HomeManager/Home' element={<Home />} />
          <Route path='/HomeManager/AllWorkers' element={<AllWorkers />} />
          <Route path='/HomeManager/AllTodos/Complete' element={<AllTodos done={true}/>} />
          <Route path='/HomeManager/AllTodos/UnComplete' element={<AllTodos done={false} />} />
        </Route>
        <Route path='/HomeWorker' element={<HomeWorker />}>
          <Route path='/HomeWorker/AllTodos/Complete' element={<AllTodos done={true}/>} />
          <Route path='/HomeWorker/AllTodos/UnComplete' element={<AllTodos done={false} />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
