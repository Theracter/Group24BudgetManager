import DataTable from "react-data-table-component";
import './HistoryTable.css'

function HistoryTable() {
    const [userId, setUserId] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [name, setName] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [notes, setNotes] = React.useState('');


    function handleSetUserId(e: any): void {
        setUserId(e.target.value);
    }
    function handleSetCategory(e: any): void {
        setUserId(e.target.value);
    }
    function handleSetAmount(e: any): void {
        setAmount(e.target.value);
    }
    function handleSetName(e: any): void {
        setName(e.target.value);
    }
    function handleSetMonth(e: any): void {
        setMonth(e.target.value);
    }
    function handleSetNotes(e: any): void {
        setNotes(e.target.value);
    }

    interface Expense {
        personID: string | number;
        // Add other properties your row might have
        name: string;
        type: string;
        cost: number;
        // ... etc.
      }

    const columns = [
        {
            name: "ID",
            selector: (row: Expense) => row.personID,
        },
        {
            name: "Name",
            selector: (row: Expense) => row.name,
        },
        {
            name: "Type",
            selector: (row: Expense) => row.type,
        },
        {
            name: "Cost",
            selector: (row: Expense) => "$" + row.cost,
        },
    ];
    const rows = [
        {
           personID: 1,
           name: "Broccoli",
           type: "Food" ,
           cost: 360.65
        },
    ];

    async function doEditIncome(event:any) : Promise<void>
    {
	event.preventDefault();

	var obj = {userId: userId, category: category, amount: amount, name: name, month: month, notes: notes};
	var js = JSON.stringify(obj);
	console.log(js);
	try
	{
	const response = await fetch('https://budgetmanager.xyz/api/editExpense',
	{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
	console.log(response);
	var res = JSON.parse(await response.text());
	console.log(res);
	if( res.id <= 0 )
	{
		setMessage('Information entered was invalid');
	}
	else
	{
		//var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
		//localStorage.setItem('user_data', JSON.stringify(user));
		
		window.location.href = '/main-menu';
	
	}
}
	catch(error:any)
	{
	alert(error.toString());
	return;
	}
};

    return (
        <>
            <div className="history-table">
                <DataTable
                    columns={columns}
                    data={rows}
                    fixedHeader
                    title="History"
                />
            </div>
        </>
    );
}

export default HistoryTable;