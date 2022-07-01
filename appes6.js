class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  addBookToList(book){
    // console.log(book);
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href ="#" class="delete">X</a></sstd>
    `
    list.appendChild(row);
   }
   clearFeilds(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  showAlert(message , className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div,form);
  
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },1000);
  }
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    };
  }
}
class Store{
  static displayBooks(){
    const books = Store.getBooks();
    const ui = new UI();
    books.forEach(function(book){
      ui.addBookToList(book);
    })
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books =[];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    //const ui = new UI();
    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      //console.log(book.isbn);
      //console.log(isbn);
      books.splice(index, 1);
      //ui.showAlert('Books Deleted','error');
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.getElementById('book-form').addEventListener('submit',function(e){
  const title = document.getElementById('title').value ,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;
  // console.log(`${title} ,${isbn} ,${author} `);
  //console.log(book);
  const ui = new UI();
  if(title === '' || author === '' || isbn === ''){
    //alert('failed');
    ui.showAlert('Please Fill all the Details','error');
  }else{
    const book = new Book(title,author,isbn);
    ui.addBookToList(book);
    Store.addBook(book);
    ui.clearFeilds(); 
    ui.showAlert('Book added','success');
  
  }
  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);
  //console.log(e.target.parentElement.previousElementSibling.textContent);
  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
document.addEventListener('DOMContentLoaded',Store.displayBooks);