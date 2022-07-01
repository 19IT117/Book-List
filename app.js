//constructor 
function Book(title , author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//ui constructor

function UI(){

}

UI.prototype.addBookToList = function(book){
 // console.log(book);
 const list = document.getElementById('book-list');
 //create tr element
 const row = document.createElement('tr');
 row.innerHTML = `
 <td> ${book.title}</td>
 <td> ${book.author}</td>
 <td> ${book.isbn}</td>
 <td> <a href ="#" class="delete">X</a></sstd>
 `
 list.appendChild(row);
}

UI.prototype.clearFeilds = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message , className){
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
//Event Listners
UI.prototype.deleteBook= function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  };
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
      ui.clearFeilds(); 
      ui.showAlert('Book added','success');
    
    }
    e.preventDefault();
});


// Event Listner for Delete Book

document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Deleted", 'success');
  e.preventDefault();
});