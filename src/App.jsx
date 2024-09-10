import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import OauthPage from "./pages/Oauth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/oauth" element={<OauthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
