const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://team24:lovelygerber24@team24.b5ri7.mongodb.net/?retryWrites=true&w=majority&appName=Team24';
const client = new MongoClient(url);

client.connect();



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});



app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
	var error = '';
    const { login, password } = req.body;
    const db = client.db('BudgetManager');
    const results = await db.collection('Users').find({ login: login, password: password }).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
	console.log(results);
    if (results.length > 0) {
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }
    var ret = { id: id, firstName: fn, lastName: ln, error: '' };
    res.status(200).json(ret);
});

app.post('/api/signUp', async (req, res, next) => {
    // incoming: email, password, firstname, lastname
    //outgoing: error
    const {login, password, firstName, lastName} = req.body;
    const newUser = { login : login, password : password, firstName : firstName, lastName : lastName };
    var error = '';
    try {
        const db = client.db('BudgetManager');
        const result = db.collection('Users').insertOne(newUser);
    } catch (e) {
        error = e.toString();
    }
    var ret = { error: error};
    res.status(200).json(ret);
});

app.post('/api/addIncome', async (req, res, next) => {
    // incoming: userId, Category, Amount, Name, Month, Notes 
    // outgoing: error
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let monthName = months[d.getMonth()]; 

    const { userId, category, amount, name, month, notes } = req.body;
    const newIncome = { userId: userId, category : category, amount : amount, name : name, month : monthName, notes : notes};

    var error = '';
	console.log(newIncome);
    try {
        const db = client.db('BudgetManager');
        const result = db.collection('Income').insertOne(newIncome);
    }
    catch (e) {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

app.get('/api/search', async (req, res, next) =>  {
    //incoming: optionForSearch month
    //outgoing: list of incomes/expenses
    const {userId, option, month} = req.body;
    var results = null;
    var error = '';
    try {
        const db = client.db("BudgetManager");
        if(option === "Expense") {
            //do expense search
            
            results = await db.collection('Expenses').find({Month: month, userId : userId}).toArray();
            console.log(results);
        } else {
            //do income search
            results = await db.collection('Income').find({Month: month, userId : userId}).toArray();
            console.log(results);
        }
    } catch (e) {
        error = e.toString();
    }
    res.status(200).json(results);
});

app.post('/api/addExpense', async (req, res, next) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let monthName = months[d.getMonth()]; 

    const { userId, category, amount, name, month, notes } = req.body;
    const newExpense = { userId: userId, Category : category, Amount : amount, Name : name, Month : monthName, Notes : notes};
    var error = '';
    console.log(newExpense);
    try {
        const db = client.db('BudgetManager');
        const result = db.collection('Expenses').insertOne(newExpense);
    }
    catch (e) {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
    // incoming: userId, Category, Amount, Name, Month, Notes 
    // outgoing: error
});

app.post('/printTransactions', async (req, res, next) => {
    //incoming: nothing
    //outgoing: a list of all of the monthy transactions sorted by date modified.
    const db = client.db('budgetManager');
    
    const sortedDocument = db.collection('Income').find().sort({ month : -1}).toArray();
    var totalCount = db.income.countDocuments() + db.expense.countDocuments();
    while(totalCount > 0) {
        

        totalCount--;
    }

});

app.post('/api/createBudget', async (req, res, next) => {
    // incoming: userId, Category, Amount, Name, Month, Notes 
    // outgoing: error
    const { userId, category, amount, name, month, notes } = req.body;

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let monthName = months[d.getMonth()]; 

    const newIncome = { userId: userId, Category : "budget", Amount : amount, Name : "initialBudget", Month : monthName, Notes : notes};
    var error = '';
	console.log(newIncome);
    try {
        const db = client.db('BudgetManager');
        const result = db.collection('Income').insertOne(newIncome);
    }
    catch (e) {
        error = e.toString();
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

app.patch('/editIncome', async (req, res, next) => {
    //incoming: userId, Category, Amount, Name, Month, Notes
    //outgoing: error
    const { userId, category, amount, name, month, notes } = req.body;

    var myquery = { Name: name, UserId: userId};
    var newvalues = { $set: {Category: category, Amount: amount, Notes: notes } };
    db.collection("Income").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });

    res.status(200).json(ret);

});

app.patch('/editExpense', async (req, res, next) => {
    //incoming: userId, Category, Amount, Name, Month, Notes
    //outgoing: error
    const { userId, category, amount, name, month, notes } = req.body;

    var myquery = { Name: name, UserId: userId};
    var newvalues = { $set: {Category: category, Amount: amount, Notes: notes } };
    db.collection("Expenses").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });

    res.status(200).json(ret);

});

app.patch('/api/editBudget', async (req, res, next) => {
    // incoming: userId, Category, Amount, Name, Month, Notes 
    // outgoing: error
    const { userId, category, amount, name, month, notes } = req.body;
    var myquery = { Name: "initialBudget", UserId: userId, Month: month};
  
    var newvalues = { $set: {Category: category, Amount: amount, Notes: notes } };
    db.collection("Income").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });

    res.status(200).json(ret);
});

app.get('/api/pieChartData', async (req, res, next) => {

    const {userId, month } = req.body; // Query for userId and month
    const db = client.db('BudgetManager');

    try {

        // Aggregating income data for the given user and month
        const incomeData = await db.collection('Income').aggregate([
            { $match: { userId: userId, Month: month } }, // Filter by userId and month
            { $group: { _id: "$Category", totalAmount: { $sum: "$Amount" } } } // Group by category and sum amounts
        ]).toArray();

        // Aggregating expense data for the given user and month
        const expenseData = await db.collection('Expenses').aggregate([
            { $match: { userId: userId, Month: month } }, // Filter by userId and month
            { $group: { _id: "$Category", totalAmount: { $sum: "$Amount" } } } // Group by category and sum amounts
        ]).toArray();

        // Combine the data into a single array 
        var combinedData = [
            ...incomeData.map(item => ({ category: item._id, type: 'Income', totalAmount: item.totalAmount })),
            ...expenseData.map(item => ({ category: item._id, type: 'Expense', totalAmount: item.totalAmount }))
        ];

    } catch (e) {
        error = e.toString();
    }

    var ret = combinedData;
    res.status(200).json(combinedData);

});

const { ObjectId } = require('mongodb'); // Import ObjectId for working with MongoDB IDs

// Delete an income
app.delete('/api/deleteIncome/:id', async (req, res) => {
    const incomeId = req.params.id; // Get the income ID from the URL
    const db = client.db('BudgetManager'); // Connect to the database

    try {
        const result = await db.collection('Income').deleteOne({ _id: new ObjectId(incomeId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Income not found' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete income' });
    }
});

// Delete an expense
app.delete('/api/deleteExpense/:id', async (req, res) => {
    const expenseId = req.params.id; // Get the expense ID from the URL
    const db = client.db('BudgetManager'); // Connect to the database

    try {
        const result = await db.collection('Expenses').deleteOne({ _id: new ObjectId(expenseId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

app.listen(5000);
