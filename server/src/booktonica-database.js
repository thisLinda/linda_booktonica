/* eslint-disable no-undef */
const pgp = require('pg-promise')();

/**
 * An object that has methods matching useful database queries.
 * Use `this.db` to access a connected pg-promise connection.
 * Make sure to return the promise!
 *
 * For examples of other queries, see
 * [pghttps://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
 */
class BooktonicaDatabase {
  /**
   * @param {String} name - name of database to connect to
   */
  constructor(name) {
    const connectionString = `postgres://localhost:5432/${name}`;
    console.log('Postgres DB => ', connectionString);
    this.db = pgp(connectionString);
  }

  sanityCheck() {
    console.log('\tTesting database connection...');
    return this.getBooksCount().then(count =>
      console.log(`\t✔️ Found ${count} books.`)
    );
  }

  getBooksCount() {
    return this.db.one('SELECT count(*) FROM books').then(r => r.count);
  }
  // comments.comment,
  //       users.user_name,
  //       INNER JOIN comments on comments.book_id = b.id
  //       INNER JOIN users on users.user_id = comments.user_id
  getAllBooks() {
    return this.db.any(
      `SELECT
        b.id,
        b.title,
        b.subtitle,
        b.summary,
      
        b.cover_image_url,
        to_char(b.publication_date, 'DD Mon YYYY') as publication_date, 
        a.name AS author_name FROM books b 
        INNER JOIN authors a on a.id = b.author_id
       
        ORDER BY b.publication_date DESC`
        
    );
  }
 //My editing
  addComment(data){
    console.log(`what is add comment ${JSON.stringify(data)}`)
      return this.db.none('INSERT INTO comments(comment,user_id,book_id) VALUES ($1, $2,$3)',[data.text,data.id,data.bId])
  }
  getCommentsLists(){
    // return this.db.any('SELECT * FROM comments');
    return this.db.any(
      `SELECT 
      comments.comment,
      comments.created_on,
      comments.book_id,
      users.user_name FROM comments 
      INNER JOIN users on users.user_id=comments.user_id`
      )
 }
}



module.exports = BooktonicaDatabase;
