import './app.scss';
import Featured from './components/featured/Featured';
import Home from './pages/home/home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = true;

  return (
    <Router>
      <Routes>
        {/* Routes accessible to all users */}
        {!user && (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to="/register" />} />
          </>
        )}

        {/* Routes accessible only to authenticated users */}
        {user && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Featured />} />
            <Route path='/watch' element={<Watch />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
