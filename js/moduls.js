let access_level={
    User:()=>{
        let user_panel_show=document.querySelector('.register');
        let show_panel=document.querySelector('#panel');
        let show_panel_section=document.querySelector('#panel_section');
        show_panel.style.display="flex";
        show_panel_section.style.display="block";
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
        debugger;
        elem.appendChild(div);
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
    },
    find_tree_category:(array1,array2)=>{
        let temp=array2;
        let arr1=array1;
        let arr2=array2;
        Array.prototype.remove = function(value) {
            var idx = this.indexOf(value);
            if (idx != -1) {
                // Второй параметр - число элементов, которые необходимо удалить
                return this.splice(idx, 1);
            }
            return false;
        }
        for(let j=0;j<arr2.length;j++){
            for(let i=0;i<arr1.length;i++){
                if(arr2[j]==arr1[i]){
                    temp.remove(arr2[j]);
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
let Tree={
    create_tree:()=>{
        let categories=[];
        for(let i=0;i<state.autors.length;i++){
            if(i==0){
                let temp=state.autors[i].categoryes;
                for(let j=0;j<temp.length;j++){
                    categories.push(temp[j]);
                }
            }else{
                let temp=finds.find_tree_category(categories,state.autors[i].categoryes);
                for(let j=0;j<temp.length;j++){
                    categories.push(temp[j]);
                }
            }
        }
        console.log(categories);
        elements.create_list('.tree');
        for(let i=0;i<categories.length;i++){
            elements.create_list_item('.categories',categories[i]);
        }
    },
    li_to_span:()=>{
        var tree_ul = document.getElementsByTagName('ul')[0];
        var tree_lis = tree_ul.getElementsByTagName('li');
        for (var i = 0; i < tree_lis.length; i++) {
            var li = tree_lis[i];
            var span = document.createElement('span');
            li.insertBefore(span, li.firstChild);
            span.appendChild(span.nextSibling);
        }
    },
    hidden_submenu:()=>{
        let tree = document.getElementsByTagName('li');
        for(let i=0;i<tree.length;i++){
            let parent_div=tree[i].parentNode.parentNode;
            if(parent_div.className=='tree'){
                continue;
            }else{
                tree[i].style.display='none';
                tree[i].parentNode.style.display='none';
            }
        }
        /*
        for(let i=0;i<submenu.length;i++){
            submenu[i].style.display='none';
        }*/
    },
    show_submenu_on_click:()=>{
        let tree = document.getElementsByTagName('ul')[0];
        tree.onclick = (event)=>{
            let target = event.target;
            if (target.tagName != 'SPAN') {
                return;
            }
            let li = target.parentNode;
            let children_сontainer = li.getElementsByTagName('ul')[0];
            if (!children_сontainer) return;
            if(children_сontainer.style.display=='none'){
                children_сontainer.style.display='block';
                let children=children_сontainer.childNodes;
                for(let i=0;i<children.length;i++){
                    console.log(children[i].tagName);
                    if(children[i].tagName=='LI'){
                        children[i].style.display='block';
                    }
                }
            }else{
                children_сontainer.style.display='none';
                let children=children_сontainer.childNodes;
                for(let i=0;i<children.length;i++){
                    console.log(children[i].tagName);
                    if(children[i].tagName=='LI'){
                        children[i].style.display='none';
                    }
                }
            }
        }
    }
}
let Book={
    book_show:()=>{
        document.onclick=(event)=>{
            let target=event.target;
            if(target.tagName!='P' && target.className=='book_name'){
                return;
            }
            let div=target.parentNode;
            let find_what_show=div.getElementsByClassName('book_hidden');
            for(let i=0;i<find_what_show.length;i++){
                if(find_what_show[i].style.display=='none')
                    find_what_show[i].style.display='inline';
                else
                    find_what_show[i].style.display='none';
            }
        }
    }
}