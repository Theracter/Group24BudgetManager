import DataTable from "react-data-table-component";
import './HistoryTable.css'

function HistoryTable() {
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