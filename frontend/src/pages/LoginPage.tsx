import '../App.css';
import Login from '../components/Login'
import LoginTitle from '../components/LoginTitle'

export default function LoginPage() {
  return (
    <div className='login'>
      <LoginTitle />
      <Login />
    </div>
  );

}