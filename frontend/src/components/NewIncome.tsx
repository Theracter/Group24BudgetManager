import CurrencyInput from 'react-currency-input-field';
import TextArea from './Textarea';
import './NewExpense.css';
import React, { useState } from 'react';

export default function NewIncome() {
    // Fixed handleValueChange function to correctly process the value from CurrencyInput
    const handleValueChange = (value: string | undefined) => {
        console.log(value);
        if (value) {
            setCurrencyValue(parseFloat(value)); // Parse the string value to a float
        } else {
            setCurrencyValue(0.0); // Default to 0 if no value is provided
        }
    };

    const [currencyValue, setCurrencyValue] = useState(0.0); // Initial state for currency
    
    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId: string = ud.id;

    async function addIncome(event: any): Promise<void> {
        event.preventDefault();
        console.log("userId is " + userId);
        
        if (ud.id == null) {
            console.log("problem");
        }
        let obj = {
            userId: userId || '',
            amount: currencyValue || 2.0, // Currency value is now properly handled
        };
        console.log(obj);
        let js = JSON.stringify(obj);
        console.log(js);
        try {
            const response = await fetch('https://budgetmanager.xyz/api/createBudget',
                { method: 'POST', body: js, headers: { 'Content-type': 'application/json' } });
            var res = JSON.parse(await response.text());
            window.location.href = '/main-menu';
        } catch (error: any) {
            alert(error.toString());
            return;
        }
    };

    return (
        <>
            <div className='container'>
                {/* Updated onValueChange to use the corrected handleValueChange */}
                <CurrencyInput
                    id="amount"
                    name="input-name"
                    placeholder="Enter Amount"
                    prefix="$"
                    decimalsLimit={2}
                    onValueChange={handleValueChange} // Corrected function for currency input
                />
                <button type="button" id="submit" onClick={addIncome}>Submit</button>
            </div>
        </>
    );
};
