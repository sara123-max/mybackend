// Import necessary modules
const express = require('express');
//const pool= require('pool');
//const pool = require('./pool');
const mysql = require('mysql');
const cors = require('cors'); // Permettre les requêtes depuis d'autres origines (Flutter)
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();

// Import des routes
const grossisteRoutes = require('./routes/grossisteRoute'); // Ajout de la route
const selectGrossisteRoute = require("./routes/selectGrossisteRoute"); // Import the routes
const updateGrossisteRoute = require('./routes/updateGrossisteRoute');
const grossisteDeleteRouter = require('./routes/grossisteDeleteRoute');



const categoryRoutes = require('./routes/categoryCreateRoute'); //Import category route


const subcategoryRoutes = require('./routes/subcategoryCreateRoute');

const productRoutes = require('./routes/productCreateRoute');

const productSelectRoute = require('./routes/productSelectRoute');


const categorySelectRoutes = require('./routes/categorySelectRoute');

const productDeleteRoute = require('./routes/productDeleteRoute');

const productUpdateRoute = require('./routes/productUpdateRoute');

const categoryDeleteRouter = require('./routes/categoryDeleteRouter');

const categoryUpdateRoute = require('./routes/categoryUpdateRoute');

const catalogueSelectRoutes = require('./routes/catalogueSelectRoute');

const singleCatalogueSelectRoute = require('./routes/singleCatalogueSelectRoute');

const catalogueCreateRoute = require('./routes/catalogueCreateRoute');


const timeCatalogueRoutes = require('./routes/timestamp');
const catalogueAddProductsRoute = require('./routes/catalogueAddProductsRoute');

app.use('/api/catalogue-timestamps', timeCatalogueRoutes);

const catalogueDeleteProductsRoute = require('./routes/catalogueDeleteProductsRoute');

const catalogueDeleteRoute = require('./routes/catalogueDeleteRoute');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());


// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Define a sample route
app.get('/', (req, res) => {
    res.send('Backend API is running');
});
// Utilisation des routes pour les grossistes
app.use('/grossiste', grossisteRoutes);

app.use("/api/select", selectGrossisteRoute); 


app.use('/api/update', updateGrossisteRoute);
app.use('/api/grossiste', grossisteDeleteRouter);

//for creating categories
app.use('/api/category', categoryRoutes);

//for subcategories
app.use('/api/subcategories', subcategoryRoutes);

app.use('/api/product', productRoutes);


// for slecting products
app.use('/api/products', productSelectRoute);



// for selectin categoriess
app.use('/api/categories', categorySelectRoutes);

app.use('/api/products', productDeleteRoute);


// for updataing product
app.use('/api/products', productUpdateRoute);
// Near other route imports


// for deleting category  "DELETE"
app.use('/api/categories', categoryDeleteRouter);


// for updating category
app.use('/api/categories', categoryUpdateRoute);

app.use('/api/catalogues', catalogueSelectRoutes);
// selectin all catalogues "GET"

// for selecting acatalogue by its id "GET"
app.use('/api/catalogues', singleCatalogueSelectRoute);

// creating a catalogue "POST"
app.use('/api', catalogueCreateRoute);

// ... for the updating catalogue with adding products and chnage its name "PUT"
app.use('/api/catalogues', catalogueAddProductsRoute);


app.use('/api/catalogues', catalogueDeleteProductsRoute);

app.use('/api/catalogues', catalogueDeleteRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
