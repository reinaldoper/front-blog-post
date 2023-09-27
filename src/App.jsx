import { Routes, Route } from "react-router-dom";
import Home from "./page/Home"
import Posts from "./page/Posts";
import User from "./page/User";
import UpdatePost from "./page/UpdatePost";
import MyPost from "./page/MyPost";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/users" element={<User/>} />
        <Route path="/update" element={<UpdatePost/>} />
        <Route path="/my-post" element={<MyPost/>} />
      </Routes>
    </>
  )
}

export default App
