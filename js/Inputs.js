let inputs={ //методы работающие с вводом в поиск
    isbn:()=>{
        let input=document.querySelector('.search__line_isbn');
        let enter=document.querySelector('.add_book');
        let books=finds.find_isbn(input.value);
        if(enter.childNodes){
            while(enter.firstChild){
                enter.removeChild(enter.firstChild);
            }
        }
        if(books.length!=0){
            elements.create_book(books,enter);
        }
    },
    book:()=>{
        let input=document.querySelector('.search__line_book');
        let enter=document.querySelector('.add_book');
        let books=finds.find_book(input.value);
        if(enter.childNodes){
            while(enter.firstChild){
                enter.removeChild(enter.firstChild);
            }
        }
        if(books.length!=0){
            elements.create_book(books,enter);
        }
    },
    categories:()=>{
        let input=document.querySelector('.search__line_category');
        finds.find_category_in_tree(input.value);
    }
}