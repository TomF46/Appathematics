import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Leaderboards from "./pages/Leaderboards";
import Header from "./components/Header";

const App = () => {
  return (
    <>
    <div className="bg-background">
      <Header />
      <div className="app-container container mx-auto px-4 lg:px-0 mb-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="games/:id/play" element={<Play />}/>
          <Route path="/leaderboards" element={<Leaderboards />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
      </div>
    </div>
    </>
  )
};

export default App;
