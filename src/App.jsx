import { Routes, Route } from "react-router-dom";
import Home from "./page/Home"
import Posts from "./page/Posts";
import User from "./page/User";
import UpdatePost from "./page/UpdatePost";
import MyPost from "./page/MyPost";
import UpdateUser from "./page/UpdateUser";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/users" element={<User/>} />
        <Route path="/update" element={<UpdatePost/>} />
        <Route path="/my-post" element={<MyPost/>} />
        <Route path="/update-user" element={<UpdateUser/>} />
      </Routes>
    </>
  )
}

export default App
