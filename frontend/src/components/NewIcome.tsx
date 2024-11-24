import CurrencyInput from 'react-currency-input-field';
import './NewExpense.css';


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

export default function NewExpense() {
    return (
        <>
            <div className='container'>
            
                <CurrencyInput
                    id="amount"
                    name="input-name"
                    placeholder="Enter Amount"
                    prefix="$"
                    decimalsLimit={2}
                    onValueChange={(value, name, values) => console.log(value, name, values)}
                />
                <br/>
                <select className='category'>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
                <br/>
                <button type="button" id="submit">Submit</button>
            </div>
        </>
    );
};