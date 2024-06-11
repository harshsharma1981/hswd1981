import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/components/Footer';
import Logout from './pages/Logout';
import ChatPage from './pages/Hchat/ChatPage';
import socketIO from "socket.io-client"
import Addfriend1 from './pages/Hchat/Addfriend1';
import Feedback from './pages/Feedback';
import { useAuth } from './Store/auth';
import Diary from './pages/Diary-app/Diary';
import Projects from './pages/Projects';

const token= localStorage.getItem("hswd")
const username= localStorage.getItem("username")
const socket = socketIO.connect('https://chatserver1981.netlify.app/' ,{
  query: {token,username}
});
function App() {
 
  
  return (
     <>
     <BrowserRouter>
      <Routes>

        <Route path="/" element={< Home />}/> 
          {/* <Route path="/myprojects" element={<Projects />} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/hdiary" element={<Diary />} />
          <Route path="/hchat" element={< ChatPage socket={socket}/>} />
          <Route path="/add-friend" element={< Addfriend1 />} />
          <Route path="/feedback" element={< Feedback />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
       
      </Routes>
    </BrowserRouter>
  
 </>
  );
}

export default App;
