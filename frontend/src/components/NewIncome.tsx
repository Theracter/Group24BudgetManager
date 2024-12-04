import CurrencyInput from 'react-currency-input-field';
import TextArea from './Textarea'
import './NewExpense.css';
import { useState } from 'react';


export default function NewIncome() {

    const [dropDownValue, setDropDownValue] = useState('');
    const [currencyValue, setCurrencyValue] = useState(0.0);
    const [nameValue, setNameValue] = useState('');
    const [notes, setNotes] = useState('');


const options = [
    {
        label: "",
        value: "",
    },
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
    if (value) {
            setCurrencyValue(parseFloat(value)); // Parse the string value to a float
        } else {
            setCurrencyValue(0.0); // Default to 0 if no value is provided
        }
    // Do something with the value, like storing it in state or sending it to an API
  };
  const handleNotesChange = (value: any) => {
    setNotes(value);
  }

    let _ud : any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId : string = ud.id;
    
    async function addIncome(event:any) : Promise<void> {
        event.preventDefault();

        const user = localStorage.getItem("user_data");
        if(user.id == null) {
            console.log("incomeProblem");
        }
        let obj = {userId:userId || '',
                    category:dropDownValue || '',
                    amount:currencyValue || 0.0,
                    name:nameValue || '',
                    notes:notes || ''
                };
        let js = JSON.stringify(obj);
        try {
            const response = await fetch('https://budgetmanager.xyz/api/addIncome',
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
                <button type="button" id="submit" onClick={addIncome}>Submit</button>
            </div>
        </>
    );
};
