
import {Routes, Route} from "react-router-dom";
//import Display from './routers/Display.js';
import Teamselect from "./routers/TeamSelect.js";
import MapDisplay from './routers/MapDisplay.js';
//import Map from "./components/Map.js";

/*import Write from "./pages/Write";
import Home from "./pages/Home";
import Myplay from "./pages/Myplay";
import Mypage from "./pages/Mypage"; 
import Alarm from "./pages/Alarm"; */
/*      <Route path="/Write" component={Write} />
        <Route path="/Home" component={Home} />
        <Route path="/Myplay" component={Myplay} />
        <Route path="/Mypage" component={Mypage} />
        <Route path="/Alarm" component={Alarm} />
         <Route path="/" element={<Display />} />*/
function App() {
  return (
    <div>
       <Routes>
         <Route path="/TeamSelect" element={<Teamselect />} />
         <Route path="/Map" element={<MapDisplay />} /> 
       </Routes> 
    </div>
   
  );
}

export default App;
