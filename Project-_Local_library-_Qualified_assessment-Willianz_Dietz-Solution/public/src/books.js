function findAuthorById(authors, id) {
  const found = authors.find((author) => author.id === id);
 return found;
}

function findBookById(books, id) {
  return found = books.find(book => book.id === id);
    
}

function partitionBooksByBorrowedStatus(books) {
  let booksUnavailable = [];
  let booksAvailable = []; 
    books.forEach(book =>{
      const checkBook =  book.borrows.every(check => check.returned); 
    if(checkBook){
      booksAvailable.push(book);
    }else{
      booksUnavailable.push(book);
    }
  });
    const allBooks = [[...booksUnavailable], [...booksAvailable]];
    allBooks.slice(0,10);
    return allBooks; 
}

function getBorrowersForBook(book, accounts) {
  const getBorrowers = book.borrows.map((borrow) => {
   let findAccount = accounts.find((account) => account.id === borrow.id);
   console.log(findAccount); 
   return { ...borrow, ...findAccount };
  })
  
  return getBorrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
