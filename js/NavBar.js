let nav_bar={ //выбираем какой именно поиск у нас будет
    show_search_book:()=>{
        let search__line_book=document.querySelector('.search__line_book');
        let search__line_isbn=document.querySelector('.search__line_isbn');
        let search__line_category=document.querySelector('.search__line_category');
        if(search__line_category.style.display=="block"){
            search__line_category.style.display="none";
        }
        if(search__line_isbn.style.display=="block"){
            search__line_isbn.style.display="none";
        }
        search__line_book.style.display="block";
    },
    search_line_isbn:()=>{
        let search__line_book=document.querySelector('.search__line_book');
        let search__line_isbn=document.querySelector('.search__line_isbn');
        let search__line_category=document.querySelector('.search__line_category');
        if(search__line_category.style.display=="block"){
            search__line_category.style.display="none";
        }
        if(search__line_book.style.display=="block"){
            search__line_book.style.display="none";
        }
        search__line_isbn.style.display="block";
    },
    search_line_category:()=>{
        let search__line_book=document.querySelector('.search__line_book');
        let search__line_isbn=document.querySelector('.search__line_isbn');
        let search__line_category=document.querySelector('.search__line_category');
        if(search__line_isbn.style.display=="block"){
            search__line_isbn.style.display="none";
        }
        if(search__line_book.style.display=="block"){
            search__line_book.style.display="none";
        }
        search__line_category.style.display="block";
    }
}