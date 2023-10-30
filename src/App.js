
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";

import TopBar from './topBar';
import Nav from './Nav';
import Map from "./Map";
/*import Write from "./pages/Write";
import Home from "./pages/Home";
import Myplay from "./pages/Myplay";
import Mypage from "./pages/Mypage"; 
import Alarm from "./pages/Alarm"; */
/*      <Route path="/Write" component={Write} />
        <Route path="/Home" component={Home} />
        <Route path="/Myplay" component={Myplay} />
        <Route path="/Mypage" component={Mypage} />
        <Route path="/Alarm" component={Alarm} />*/
function App() {
  return (
    <div>
      <TopBar />

      <Router>
       <Routes>
         <Route path="/Map" element={<Map />} />
       </Routes>   
      </Router>
      
      <Nav />
    </div>
   
  );
}

export default App;
