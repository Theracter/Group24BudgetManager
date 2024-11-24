import Expense from '../components/NewExpense.tsx';
import Income from '../components/NewIcome.tsx';
import './InputArea.css'

export default function InputArea() {
    return (
        <div className='userInput'>
            <div className='input' id='expense'>
                <h3 className='subTitle'>Add Expense</h3>
                <Expense />
            </div>
            <div className='input'id='income'>
                <h3 className='subTitle'>Set Budget</h3>
                <Income />
            </div>
        </div>
    );
};