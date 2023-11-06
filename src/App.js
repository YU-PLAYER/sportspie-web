import {Routes, Route} from "react-router-dom";
import Display from './routers/Display.js';
import Teamselect from "./routers/TeamSelect.js";
import MapDisplay from './routers/MapDisplay.js';
import MyMatchList from "./routers/MyMatchList.js";
import WriteDisplay from "./routers/WriteDisplay.js";

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
         */
function App() {
  return (
    <div>
       <Routes>
         <Route path="/" element={<Display />} />
         <Route path="/TeamSelect" element={<Teamselect />} />
         <Route path="/Map" element={<MapDisplay />} /> 
         <Route path="/MatchList" element={<MyMatchList />} /> 
         <Route path="/Write" element={<WriteDisplay />} /> 
       </Routes> 
    </div>
   
  );
}

export default App;
