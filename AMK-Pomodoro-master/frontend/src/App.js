import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Video from "./pages/Video";

function App() {
  return (
    <>
      <Router>
        <link href="//cdn.muicss.com/mui-0.10.3/css/mui.min.css" rel="stylesheet" type="text/css" />
        <script src="//cdn.muicss.com/mui-0.10.3/js/mui.min.js"></script>
        <Box>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video" element={<Video/>} />
          </Routes>
          <Footer />
        </Box>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
