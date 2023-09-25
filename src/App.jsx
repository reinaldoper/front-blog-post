import { Routes, Route } from "react-router-dom";
import Home from "./page/Home"
import Posts from "./page/Posts";
import User from "./page/User";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/users" element={<User/>} />
      </Routes>
    </>
  )
}

export default App
