import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Base from './components/Base';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './pages/PrivateRoute';
import Userdashboard from './pages/user-routes/Userdashboard';
import UserProfile from './pages/user-routes/UserProfile';
import PostPage from './pages/PostPage';

function App() {

  return (
    <BrowserRouter>
    <ToastContainer position='bottom-center' theme='dark'/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<Base> <About /> </Base>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Signup />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/posts/:postId" element={<PostPage />} />

          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
