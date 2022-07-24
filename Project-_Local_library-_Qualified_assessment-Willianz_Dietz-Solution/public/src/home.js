function getTotalBooksCount(books) {
  return books.length;  
}

function getTotalAccountsCount(accounts) {
  return accounts.length; 
}

function getBooksBorrowedCount(books) {
  let accum = 0; 
  books.forEach((book) => { 
    if (!book.borrows[0].returned) { 
      accum++; 
    } 
  });
  return accum; 
}

function getMostCommonGenres(books) {
  let allGenres = {};
  
  books.forEach((book) => {
    if(allGenres[book.genre]){
      allGenres[book.genre]++;
    }else{
      allGenres[book.genre] = 1;
    }
  });

  let genreCount  = [];
  for (const [key, value] of Object.entries( allGenres )) {
    genreCount .push({
      'name' : key,
      'count' : value
    }); 
  }
  genreCount.sort((a, b) => b.count - a.count) ;
  return genreCount .slice(0, 5);
}
//Check on this
function getMostPopularBooks(books) {
  let popularBooks = {};

  books.forEach(book => {
    if(!popularBooks[book.title]){
      popularBooks[book.title] = book.borrows.length; 
    }
  });

  let popularCount = [];
  //This is going to create an array of objects so we can use .sort
  for(const [key, value] of Object.entries(popularBooks)){
    popularCount.push({
      'name' : key, 
      'count' : value
    })
  }
  popularCount.sort((a, b) => b.count - a.count);
  return popularCount.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const listofAuthors = books.reduce((totalBooks, book) => {
    const {authorId, borrows} = book; 
    const getAuthor = authors.find(author => author.id === authorId)
    const name = `${getAuthor.name.first} ${getAuthor.name.last}`;
    const count = borrows.length; 
    const authorExists = totalBooks.find(auth => auth.name === name);
    if(authorExists){
      authorExists.count += count;
    }else{
      const newAuthor = {
        name, 
        count
      }
      totalBooks.push(newAuthor);
    }
    return totalBooks; 
    
  }, [])
  const sortedAuthor = listofAuthors.sort((a, b) => b.count - a.count);
    return sortedAuthor.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
