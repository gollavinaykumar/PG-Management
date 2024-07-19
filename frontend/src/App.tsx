import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Signup";
import Home from "./components/homepage";
import Login from "./components/Login";
import AddRoom from "./components/AddRoom";
import SeperateRoom from "./components/seperateRoom";
import DashBoard from "./components/Dashboard";
import Profile from "./components/Profile";
import IssuesPage from "./components/IssuesPage";
import AllIssues from "./components/allIssues";
import SingleIssue from "./components/SingleIssue";
import RoomsList from "./components/AdminRoomsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/newroom" element={<AddRoom />} />
        <Route path="/:roomid" element={<SeperateRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/:roomid/Issues" element={<IssuesPage />} />
        <Route path="/dashboard/Issues" element={<AllIssues />} />
        <Route path="/dashboard/Issues/:issueid" element={<SingleIssue />} />
        <Route path="/dashboard/ListRooms" element={<RoomsList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
