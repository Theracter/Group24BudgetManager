
import DataTable from "react-data-table-component";
import './HistoryTable.css'
import React, { useState, useEffect } from 'react';

interface Expense {
  _id: string;
  category: string;
  type: string;
  amount: string;
  name: string;
  month: string;
  notes: string;
  
}

function HistoryTable() {
    const [type, setDataType] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [name, setName] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [rows, setRows] = React.useState<Expense[]>([]);

    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId: string = ud.id;

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://budgetmanager.xyz/api/displayHistory/' + userId);
        const data = await response.json();
        setRows(data);
      } catch (error: any) {
        console.error('Error fetching data:', error.toString());
      }
    };
    fetchData();
  }, []);
	
    function handleSetCategory(e: any): void {
        setUserId(e.target.value);
    }
    function handleSetAmount(e: any): void {
        setAmount(e.target.value);
    }
    function handleSetType(e: any): void {
        setDataType(e.target.value);
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

    const columns = [
        {
            name: "Name",
            selector: (row: Expense) => row.name,
        },
        {
            name: "Type",
            selector: (row: Expense) => row.type,
        },
		{
            name: "Category",
            selector: (row: Expense) => row.category,
        },
        {
            name: "Cost",
            selector: (row: Expense) => "$" + row.amount,
        },
        {
            cell: (row: Expense) => <button className = "editButton" onClick={() => doEdit(row)}>Edit</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            cell: (row: Expense) => <button className = "deleteButton" onClick={() => deleteExpense(row._id)}>Delete</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
	
	async function deleteExpense(id: string) : Promise<void>
	{
		event.preventDefault();
		
		try
        {
        const response = await fetch(`https://budgetmanager.xyz/api/deleteExpense/${id}`, 
		{method:'DELETE'});
        console.log(response);
        var res = JSON.parse(await response.text());
        console.log(res);
        if( res.error )
		{
        alert(res.error);
		}
		else
		{
        // Update the state by filtering out the deleted row
        setRows(rows.filter(row => row._id !== id));
        window.location.href = '/main-menu';
		}
}
        catch(error:any)
        {
        alert(error.toString());
        return;
        }
	}
	
	function doEdit(row: Expense): void {
	event.preventDefault();
    localStorage.setItem('row_data', JSON.stringify(row));
    window.location.href = '/edit';
  }

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
