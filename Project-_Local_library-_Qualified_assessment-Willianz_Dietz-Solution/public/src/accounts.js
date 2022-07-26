function findAccountById(accounts, id) {
  const found = accounts.find((account) => account.id === id); //returns the accounts that match the id
  return found;   
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1);  //sorts from last name 
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id; 
  let accu = 0; 
  //goes through all of books and checks id matches, then  add accum. 
  books.forEach(book => book.borrows.forEach(borrow => accountId === borrow.id && accu++))
  return accu; 
  }

function getBooksPossessedByAccount(account, books, authors) {
  //Initialze a return array
  let result=[];
  //check for the account id in the borrows arrays
  books.forEach(book => book.borrows.find(borrow => borrow.id === account.id && !borrow.returned && result.push(book)))
  //for everything in result we create an object and returns author
  result.forEach(book=>{
    const author = authors.find(person => person.id === book.authorId);
    book['author'] = author;
  })
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
