import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Summary from "./pages/Summary";
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
          <Route path="/play" element={<Play />}/>
          <Route path="/summary" element={<Summary />}/>
          <Route path="/leaderboards" element={<Leaderboards />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
      </div>
    </div>
    </>
  )
};

export default App;
