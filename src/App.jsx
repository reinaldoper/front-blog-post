import { Routes, Route } from "react-router-dom";
import Home from "./page/Home"
import Posts from "./page/Posts";
import User from "./page/User";
import DeleteMyPost from "./page/DeleteMyPost";
import MyPost from "./page/MyPost";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/users" element={<User/>} />
        <Route path="/delete" element={<DeleteMyPost/>} />
        <Route path="/my-post" element={<MyPost/>} />
      </Routes>
    </>
  )
}

export default App
