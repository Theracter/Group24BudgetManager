import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MainMenuPage from './pages/MainMenuPage'

function App() {

  return (
    <div className='App'>
      <Router>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/info' element={<About/>}/>
          <Route path='/sign-up' element={<SignUpPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/main-menu' element={<MainMenuPage/>}/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
