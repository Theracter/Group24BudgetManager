import './MainMenu.css'
import Sidebar from '../components/Sidebar.tsx'
import HistoryTable from '../components/HistoryTable.tsx';
import Stats from '../components/Stats.tsx';
import Input from '../components/InputArea.tsx';




export default function MainMenuPage() {
  return (
    <>
      <Sidebar/>
      <Stats/>
      <Input/>
      <HistoryTable/>
      <br/>
    </>
  );
}
