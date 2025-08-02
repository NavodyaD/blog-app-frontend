import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/loginpage/loginpage";
import SignUp from "./pages/signuppage/signuppage";
import ProtectedRoute from './components/ProtectedRoute';
import WriterDashboard from './pages/writer/writerdashboard/WriterDashboard';
import AdminDashboard from './pages/admin/admindashboard/AdminDashboard';
import CreatePost from "./pages/writer/createpost/CreatePost";
import HomePage from "./pages/homepage/HomePage";
import WriterEditPost from "./pages/writer/writereditpost/WriterEditPost";
import PostDetailPage from "./pages/postdetailpage/PostDetailPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/create-post" element={<CreatePost/>} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/edit-post" element={<WriterEditPost />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />

                <Route
                    path="/writer-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['writer']}>
                            <WriterDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
};

export default AppRoutes;