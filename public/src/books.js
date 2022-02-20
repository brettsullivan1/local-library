

const getNonReturnedBooks = (books) => {
  return books.filter((book) => book.borrows.some((transaction) => !transaction.returned));
};

const getReturnedBooks = (books) => {
    return books.filter((book) => book.borrows.every((transaction) => transaction.returned));
  };

const findAccountById = (accounts, id) => {
  return accounts.find((account) => account.id === id);
}
  
//helpers


function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const nonReturnedBooks = getNonReturnedBooks(books);
  const returnedBooks = getReturnedBooks(books);
  const result = [];
  result.push(nonReturnedBooks);
  result.push(returnedBooks);
  return result;
}

function getBorrowersForBook(book, accounts) {  
  const transactions = book.borrows;
  const result = transactions.map((transaction) => {
    const accountInfo = findAccountById(accounts, transaction.id);
    const newTransaction = {
      ...transaction,
      ...accountInfo,
    };
    return newTransaction;
  });

  result.splice(10);

  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};


