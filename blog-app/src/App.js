import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./pages/PrivateRoute";
import Userdashboard from "./pages/user-routes/Userdashboard";
import UserProfile from "./pages/user-routes/UserProfile";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./pages/Categories";
import MyBlog from "./pages/MyBlog";

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<ToastContainer position="bottom-center" theme="dark" />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Signup />} />
					<Route path="/services" element={<Services />} />
					<Route path="/posts/:postId" element={<PostPage />} />
					<Route path="/categories/:categoryId" element={<Categories />} />
					<Route path="/myblogs" element={<MyBlog />} />

					<Route path="/user" element={<PrivateRoute />}>
						<Route path="dashboard" element={<Userdashboard />} />
						<Route path="profile" element={<UserProfile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
