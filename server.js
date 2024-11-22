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
        id = results[0].UserId;
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

app.post('/api/addincome', async (req, res, next) => {
    // incoming: userId, Category, Amount, Name, Month, Notes 
    // outgoing: error
    const { UserId, category, amount, name, month, notes } = req.body;
    const newIncome = { UserId: UserId, Category : category, Amount : amount, Name : name, Month : month, Notes : notes};
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

app.post('/api/addExpense', async (req, res, next) => {
    const { UserId, category, amount, name, month, notes } = req.body;
    const newExpense = { UserId: UserId, Category : category, Amount : amount, Name : name, Month : month, Notes : notes};
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

app.patch('/editIncome', async (req, res, next) => {
    //incoming: userId, Category, Amount, Name, Month, Notes
    //outgoing: error
    const {userId, category, amount, name, month, notes} = req.body;
    
});

app.patch('/api/editBudget', async (req, res, next) => {
    // incoming: userId, Category, Amount, Name, Month, Notes 
    // outgoing: error

    var myquery = { Name: "initialBudget", UserId: UserId};
    var newvalues = { $set: {Category: category, Amount: amount, Notes: notes } };
    db.collection("Income").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });

    res.status(200).json(ret);
});

app.listen(5000);
