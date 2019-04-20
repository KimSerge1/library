let access_level={
    User:()=>{
        let user_panel_show=document.querySelector('.register');
        user_panel_show.style.display="none";
    },
    Admin:()=>{
        let admin_panel_show=document.querySelector('.register');
        admin_panel_show.style.display="none";
    }
}
let nav_bar={
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
let elements={
    create_book:(books,enter)=>{
        for(let i=0;i<books.length;i++){
            let div=document.createElement('div');
            div.className='div_book col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12';
            div.innerHTML='Автор: '+books[i].autor+'<br>'+
                        'Название: '+books[i].book+'<br>'+
                        'ISBN: '+books[i].isbn+'<br>'+
                        'Краткое описание: '+books[i].discription+'<br>'+
                        'Категории: '+books[i].categoryes;
            enter.appendChild(div);
        }
    },
    create_list:(class_name)=>{
        let elem=document.querySelector(class_name);
        let div=document.createElement('ul');
        div.className='generate_tree';
        elem.appendChild(div)
    },
    create_list_item:(class_name)=>{
        
    }
}
let finds={
    find_isbn:(value)=>{
        let temp=[];
        let obj={};
        for(let i=0;i<state.autors.length;i++){
            if(state.autors[i].isbn==value){
                temp.push(state.autors[i]);
            }
        }
        return temp;
    },
    find_book:(value)=>{
        let temp=[];
        for(let i=0;i<state.autors.length;i++){
            let book_name=state.autors[i].book.toLowerCase();
            let value_case=value.toLowerCase();
            if(value_case!=''){
                if(!book_name.indexOf(value_case)){
                    temp.push(state.autors[i])
                }
            }
        }
        return temp;
    }
}
let inputs={
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
    }
}
let Tree=()=>{

}