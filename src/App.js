import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyUrls from "./screens/MyUrls/MyUrls";
import SingleUrl from "./screens/SingleUrl/SingleUrl";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateUrl from "./screens/SingleUrl/CreateUrl";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
<>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/mis-urls" element={<MyUrls />}/>
        <Route path="/urls/orig/:id" element={<SingleUrl />} />
        <Route path="/crear-url" element={<CreateUrl />} />;
        <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </main>
      <Footer />
      </>
  );
}

export default App;
