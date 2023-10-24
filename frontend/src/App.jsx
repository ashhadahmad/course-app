import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
