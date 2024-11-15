import '../App.css';
import MainMenuTitle from '../components/MainMenuTitle'
import Logout from '../components/Logout.tsx'

export default function MainMenuPage() {
    return (
      <div>
        <MainMenuTitle />
        <Logout />
      </div>
    );
  }