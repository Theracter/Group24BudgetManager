import '../App.css';
import SignUp from '../components/SignUp'
import SignUpTitle from '../components/SignUpTitle'

export default function SignUpPage() {
  return (
    <div className='sign-up'>
      <SignUpTitle />
      <SignUp />
    </div>
  );

}