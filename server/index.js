const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const BooktonicaDatabase = require('./src/booktonica-database');

/**
 * A way to change the defaults.
 * You can run this app like:
 * `DB_NAME=osito npm start` and it will
 * use the DB named osito instead of DEFAULT_DB_NAME.
 */
const DEFAULT_PORT = 3001;
const PORT = process.env.PORT || DEFAULT_PORT;
const DEFAULT_DB_NAME = 'booktonica';
const dbName = process.env.DB_NAME || DEFAULT_DB_NAME;
const db = new BooktonicaDatabase(dbName);

const api = express();

// Middlewares
api.use(morgan('tiny'));
api.use(bodyParser.json());

/**
 * This will just print the incoming request bodies
 * which is useful for debugging. You can skip it if you want
 * by removing
 */
const bodyDebugMiddleware = require('./src/body-debug-middleware');
const { Pool } = require('pg');
api.use(bodyDebugMiddleware);

new Pool({
  connectionString:process.env.DATABASE_URL || 'postgres://localhost:5432/booktonica.sql'
});

/**
 * Creates a new database object.
 * Add new database queries there.
 */
// const db = new BooktonicaDb(DB_NAME);

// GET /books
api.get('/books', (_unused, res) =>
  db.getAllBooks().then(books => res.send(books))
);

//Post comments
api.post("/comments",(req,res)=>
  db.addComment(req.body)
      .then(data=>{
        console.log("success adding comments",data)
      })
      .catch(error =>{
        console.log("fail deleting: ", error)
   })
   )

  // api.get('/commentsList',(req,res)=>
  api.get('/comments',(req,res)=>
    db.getCommentsLists(req.body)
      .then((data)=>{
        console.log("success getting list",data)
        res.send(data)
      })
      .catch(error =>{
        console.log("fail deleting: ", error)
   })
  )


// sanityCheck will make sure the DB is working before listening
db.sanityCheck().then(() => {
  api.listen(PORT, () => {
    console.log(`
    
      📚 booktonica express api listening on port ${PORT}
      
    `);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}