let elements={ //методы отвечающие за создание динамических элементов
    create_book:(books,enter)=>{
        for(let i=0;i<books.length;i++){
            let div=document.createElement('div');
            div.className='div_book col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12';
            div.innerHTML='<p class="book_hidden">'+'Автор: '+books[i].autor+'</p>'+'<br>'+
                        '<p class="book_name">'+'Название: '+books[i].book+'</p>'+'<br>'+
                        '<p class="book_hidden">'+'ISBN: '+books[i].isbn+'</p>'+'<br>'+
                        '<p class="book_hidden">'+'Краткое описание: '+books[i].discription+'</p>'+'<br>'+
                        '<p class="book_hidden">'+'Категории: '+books[i].categoryes+'</p>';
            enter.appendChild(div);
        }
    },
    create_list:(class_name)=>{
        let elem=document.querySelector(class_name);
        let div=document.createElement('ul');
        div.className='categories';
        elem.appendChild(div);
    },
    create_list_item:(class_name,category)=>{
        let elem=document.querySelector(class_name);
        let div=document.createElement('li');
        div.className='categories__item';
        div.innerHTML=category;
        elem.appendChild(div);
    }
}