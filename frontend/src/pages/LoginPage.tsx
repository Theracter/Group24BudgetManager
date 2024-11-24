import '../App.css';
import Login from '../components/Login'
import LoginTitle from '../components/LoginTitle'
import Navbar from '../components/Navbar';

export default function LoginPage() {
  return (
    <>
    <Navbar/>
    <div className='login'>
      <LoginTitle />
      <Login />
    </div>
    </>
  );

}