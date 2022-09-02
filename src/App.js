import Home from "./component/Home";
import Navbar from "./component/Navbar";
import './App.css'
import { Route, Routes} from "react-router-dom"
import Edit from "./component/Edit";
import Details from "./component/Details";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/view/:id" element={<Details/>}/>
      </Routes>
    </div>
  );
}

export default App;
