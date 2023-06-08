//import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const userObj=useAuthContext();
  console.log(userObj)
  return (
    <div className="App">
    <BrowserRouter>
      <div className="pages">
        <Routes>

        <Route 
            path="/login" 
            element={!userObj.user ? <Login />: <Navigate to='/'/>} 
          />

        <Route 
            path="/"
            element={userObj.user ? <Home />: <Navigate to='login'/>}
          />

        <Route 
            path="/signup" 
            element={<Signup />} 
          />
     

        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;

