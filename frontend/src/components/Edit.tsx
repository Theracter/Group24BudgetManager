import Edit from './NewExpense';

export default function edit() {
    return (
        <div className='input' id='expense'>
            <h3 className='subTitle'>Edit Expense</h3>
            <Edit />
        </div>
    );
}