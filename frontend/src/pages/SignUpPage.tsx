import '../App.css';
import SignUp from '../components/SignUp'
import SignUpTitle from '../components/SignUpTitle'
import Navbar from '../components/Navbar';

export default function SignUpPage() {
  return (
    <>
      <Navbar/>
      <div className='sign-up'>
        <SignUpTitle />
        <SignUp />
      </div>
    </>
  );

}