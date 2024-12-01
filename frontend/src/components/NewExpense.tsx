import CurrencyInput from 'react-currency-input-field';
import TextArea from './Textarea';
import './NewExpense.css';
import React, { useState } from 'react';

export default function NewExpense() {

    const options = [
        {
            label: "Food",
            value: "Food",
        },
        {
            label: "Gas",
            value: "Gas",
        },
        {
            label: "Grocery",
            value: "Grocery",
        },
        {
            label: "Personal",
            value: "Personal",
        },
        {
            label: "Other",
            value: "Other",
        },
    ];
    
    const handleNameValue = (value: any) => {
        setNameValue(value);
    }
    
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDropDownValue(event.target.value); // Update state with the selected value
      };
    
      const handleValueChange = (value: any) => {
        setCurrencyValue(value); 
        // Do something with the value, like storing it in state or sending it to an API
      };
      const handleNotesChange = (value: any) => {
        setNotes(value);
      }

    const [dropDownValue, setDropDownValue] = useState(' ');
    const [currencyValue, setCurrencyValue] = useState(' ');
    const [nameValue, setNameValue] = useState(' ');
    const [notes, setNotes] = useState(' ');
    
    let _ud : any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId : string = ud.id;
    async function addExpense(event:any) : Promise<void> {
        event.preventDefault;
        console.log("userId is " + userId);
        
        if(ud.id == null) {
            console.log("problem");
        }
        let obj = {userId:userId,category:dropDownValue,amount:currencyValue,name:nameValue,notes:notes};
        console.log(obj);
        let js = JSON.stringify(obj);
        console.log(js);
        try {
            const response = await fetch('https://budgetmanager.xyz/api/addExpense',
            {method: 'POST', body:js, headers: {'Content-type':'application/json'}});
            var res = JSON.parse(await response.text());
                window.location.href = '/main-menu';
        } catch(error: any) {
            alert(error.toString());
            return;
        }
    };


    return (
        <>
            <div className='container'>
                
                <input type="text" id="expenseName" placeholder="Enter Name" onChange={handleNameValue}/>
                <br/>
                <CurrencyInput
                    id="amount"
                    name="input-name"
                    placeholder="Enter Amount"
                    prefix="$"
                    decimalsLimit={2}
                    onValueChange={handleValueChange}
                />
                <br/>
                <select className='category' onChange={handleSelect}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <br/>
                <TextArea onChange={handleNotesChange}></TextArea>
                <button type="button" id="submit" onClick={addExpense}>Submit</button>
            </div>
        </>
    );
};