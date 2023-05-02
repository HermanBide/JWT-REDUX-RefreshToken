import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register.page';
import LoginPage from './pages/login.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='login' element={<LoginPage></LoginPage>}></Route>
        <Route path='verifyemail'>
          <Route path=':verificationCode' ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
