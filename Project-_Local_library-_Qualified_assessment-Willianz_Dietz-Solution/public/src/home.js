function getTotalBooksCount(books) {
  //returns length of book array
  return books.length;  
}

function getTotalAccountsCount(accounts) {
  //returns length of account array
  return accounts.length; 
}

function getBooksBorrowedCount(books) {
  let accum = 0; 
  //go through each book and see if it is returned
  books.forEach((book) => { 
    if (!book.borrows[0].returned) { 
      //add to accu if it is false
      accum++; 
    } 
  });
  return accum; 
}

//This is a helper function
function highestToLowest(item){
 return item.sort((a, b) => b.count - a.count)
}


function getMostCommonGenres(books) {
  let allGenres = {};
  
  //go through books
  books.forEach((book) => {
    //check to see if object was created, if true add +1, else initialize object
    if(allGenres[book.genre]){
      allGenres[book.genre]++;
    }else{
      allGenres[book.genre] = 1;
    }
  });

  //create count array
  let genreCount  = [];
  //changes allGenres from object to array, and then push an object into the genreCount array with name and count
  for (const [key, value] of Object.entries( allGenres )) {
    genreCount .push({
      'name' : key,
      'count' : value
    }); 
  }
  //sort the numbers from highest to lowest
  genreCount.sort((a, b) => b.count - a.count) ;
  //cut to only 5 books
  return genreCount .slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularBooks = {};

  //go through all the books
  books.forEach(book => {
    //check to see if book.title is false
    if(!popularBooks[book.title]){
      //return the length
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
  const sortedPeople = highestToLowest(popularCount);
  return sortedPeople.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  //reduce the object and have a totalBook accu
  const listofAuthors = books.reduce((totalBooks, book) => {
    //create variables from book
    const {authorId, borrows} = book; 
    //grabs information from author
    const getAuthor = authors.find(author => author.id === authorId)
    //create the name for the author
    const name = `${getAuthor.name.first} ${getAuthor.name.last}`;
    //the count is how many times book was borrowed
    const count = borrows.length; 
    //get author name
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
