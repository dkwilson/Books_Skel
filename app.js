//Book Constructor 
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI Constructor
function UI() {

}

//Add Book To List
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    //Create tr element
    const row = document.createElement('tr');

    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className){
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add test
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);
    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove;
    }, 3000);
    //Delete Book
    UI.prototype.deletebook = function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}

//Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}

//Event listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();
    
    //Validate
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //add book to list
        ui.addBookToList(book);

        //show success
        ui.showAlert('Book Added!', 'success');

        //Clear fields
        ui.clearFields();
    }

    

    e.preventDefault();
});

//delete event listner
document.getElementById('book-list').addEventListener('click', function(e){
    //instantiate UI
     const ui = new UI();

    //Delete book
     ui.deletebook(e.target);

    //show message
     ui.showAlert('Book Removed!!', 'success');

    e.preventDefault();
})