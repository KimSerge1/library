let access_level={ //уровни доступа
    User:()=>{
        let user_panel_show=document.querySelector('.register');
        let show_panel=document.querySelector('#panel');
        let show_panel_section=document.querySelector('#panel_section');
        show_panel.style.display="flex";
        show_panel_section.style.display="block";
        user_panel_show.style.display="none";
    },
    Admin:()=>{
        let user_panel_show=document.querySelector('.register');
        let show_panel=document.querySelector('#panel');
        let show_panel_section=document.querySelector('#panel_section');
        let admin_panel_show=document.querySelector('.admin');
        show_panel.style.display="flex";
        show_panel_section.style.display="block";
        user_panel_show.style.display="none";
        admin_panel_show.style.display="block";
    }
}
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
let finds={ //методы отвечающие за поиск
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
    find_tree_category:(array1,array2)=>{ //поиск уникальных категорий, для отрисовки первоначального дерева
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
    },
    find_all_parent_and_display_block:(elem)=>{
        if(elem.parentNode.parentNode.parentNode.className=='tree'){
            return;
        }else{
            let previos=elem.parentNode;
            previos.style.display='block';
            finds.find_all_parent_and_display_block(previos);
        }
    },
    find_category_in_tree:(val)=>{ //поиск категорий в дереве
        let lis=document.getElementsByTagName('span');
        let buff;
        let val_case=val;
        val_case=val_case.toLowerCase();
        for(let i=0;i<lis.length;i++){
            let category=lis[i].firstChild.data;
            category = category.trim().toLowerCase();
            if(category==val_case){
                let children=lis[i].parentNode.childNodes;
                for(let j=0;j<children.length;++j){
                    console.log(children[j].tagName);
                    if(children[j].tagName=='UL'/**/){
                    let show_li=children[j].childNodes;
                    for(let z=0;z<show_li.length;z++){
                        if(show_li[z].tagName=='LI'){
                            show_li[z].style.display='block';
                        }
                    }
                    children[j].style.display="block";
                    }
                }
                finds.find_all_parent_and_display_block(lis[i]);
                console.log(lis[i].parentNode.parentNode.parentNode.className);
                buff=category;
            }
        }
        if(val!=buff){
            Tree.hidden_submenu();
        }
    }
}
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
let Tree={ //методы нашего деревца
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
        let tree_ul = document.getElementsByTagName('ul')[0];
        let tree_lis = tree_ul.getElementsByTagName('li');
        for (let i = 0; i < tree_lis.length; i++) {
            let li = tree_lis[i];
            let span = document.createElement('span');
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
            if(finds.find_book(target.innerHTML)){
                let books=finds.find_book(target.innerHTML);
                let enter=document.querySelector('.add_book');
                if(enter.childNodes){
                    while(enter.firstChild){
                        enter.removeChild(enter.firstChild);
                    }
                }
                if(books.length!=0){
                    elements.create_book(books,enter);
                }
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
let Book={ //отображение информации о книжках
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
let Admin={
    hidden_menu:()=>{
        let hidden=document.querySelectorAll('.close_menu');
        for(let i=0;i<hidden.length;i++){
            hidden[i].onclick=(e)=>{
                event=e.target;
                let parent=event.parentNode.parentNode;
                parent.style.display='none';
            }
        }
    },
    add_book_window:()=>{
        let show_window=document.querySelector('.add__book');
        show_window.style.display='block';
        Admin.hidden_menu();
    },
    del_book_window:()=>{
        let show_window=document.querySelector('.del__book');
        show_window.style.display='block';
        Admin.hidden_menu();
    },
    edit_book_window:()=>{
        let show_window=document.querySelector('.edit__book');
        show_window.style.display='block';
        Admin.hidden_menu();
    },
    add_category_window:()=>{
        let show_window=document.querySelector('.add__category');
        show_window.style.display='block';
        Admin.hidden_menu();
    },
    del_category_window:()=>{
        let show_window=document.querySelector('.del__category');
        show_window.style.display='block';
        Admin.hidden_menu();
    },
    edit_category_window:()=>{
        let show_window=document.querySelector('.edit__category');
        show_window.style.display='block';
        Admin.hidden_menu();
    },
    add_book:()=>{
        let name=document.querySelector('.admin_add_name').value;
        let autor=document.querySelector('.admin_add_autor').value;
        let isbn=document.querySelector('.admin_add_isbn').value;
        let discription=document.querySelector('.admin_add_discription').value;
        let categories=document.querySelector('.admin_add_categories').value.split(' ');
        let temp={
            autor:autor,
            book:name,
            isbn:isbn,
            discription:discription,
            categoryes:categories
        }
        state.autors.push(temp);
        let lis=document.getElementsByTagName('span');
        for(let i=0;i<lis.length;i++){
            for(let j=0;j<categories.length;j++){
                let text=lis[i].innerText;
                debugger;
                if(text.trim()==categories[j]){
                    console.log(categories[j]);
                    let elem=lis[i].parentNode;
                    let elem_to_add=elem.querySelector('.categories');
                    let li=document.createElement('li');
                    li.classList.add('categories__item');
                    li.innerHTML='<span>'+name+'</span>';
                    elem_to_add.appendChild(li);
                }
            }
        }
    },
    add_category:()=>{
        let category=document.querySelector('.admin_add_category').value;
        let prev_category=document.querySelector('.admin_add_prev_category').value;
        let lis=document.getElementsByTagName('span');
        if(prev_category!=''){
            for(let i=0;i<lis.length;i++){
                let text=lis[i].innerText;
                //debugger;
                if(text.trim()==prev_category){
                    let elem=lis[i].parentNode;
                    let elem_to_add=elem.querySelector('.categories');
                    let li=document.createElement('li');
                    let ul=document.createElement('ul');
                    li.classList.add('categories__item');
                    ul.classList.add('categories');
                    ul.style.display='none';
                    li.innerHTML='<span>'+category+'</span>';
                    li.appendChild(ul);
                    elem_to_add.appendChild(li);
                }else{
                    return;
                }
            }
        }else{
            let elem_to_add=document.querySelectorAll('.categories')[0];
            debugger;
            let li=document.createElement('li');
            let ul=document.createElement('ul');
            li.classList.add('categories__item');
            ul.classList.add('categories');
            ul.style.display='none';
            li.innerHTML='<span>'+category+'</span>';
            li.appendChild(ul);
            elem_to_add.appendChild(li);
        }
    },
    edit_book:()=>{
        let book_to_edit=document.querySelector('.admin_edit_name_to_edit').value;
        let name=document.querySelector('.admin_edit_name').value;
        let autor=document.querySelector('.admin_edit_autor').value;
        let isbn=document.querySelector('.admin_edit_isbn').value;
        let discription=document.querySelector('.admin_edit_discription').value;
        let categories=document.querySelector('.admin_edit_categories').value.split(' ');
        let temp={
            autor:autor,
            book:name,
            isbn:isbn,
            discription:discription,
            categoryes:categories
        }
        let index_of_state_autors=0;
        let buff={}
        for(let i=0;i<state.autors.length;i++){
            //debugger;
            if(book_to_edit==state.autors[i].book){
                buff=state.autors[i];
                break;
            }
            index_of_state_autors++;
            //debugger;
        }
        //debugger;
        if(temp.autor==''){
            temp.autor=buff.autor;
        }
        if(temp.book==''){
            temp.book=buff.book;
        }
        if(temp.isbn==''){
            temp.isbn=buff.isbn;
        }
        if(temp.discription==''){
            temp.discription=buff.discription;
        }
        if(temp.categoryes==''){
            temp.categoryes=buff.categoryes;
        }
        debugger;
        state.autors[index_of_state_autors]=temp;
    },
    del_category_func:(value)=>{
        let lis=document.getElementsByTagName('span');
        for(let i=0;i<lis.length;i++){
            let text=lis[i].innerText;
            if(text.trim()==value){
                let elem=lis[i].parentNode;
                elem.remove();
            }
        }
    },
    edit_category:()=>{
        let lis=document.getElementsByTagName('span');
        let category=document.querySelector('.admin_edit_category').value;
        let edit_category=document.querySelector('.admin_edit_new_category').value;
        let edit_prev=document.querySelector('.admin_edit_prev_category').value;
        debugger;
        if(edit_category==''){
            let elem;
            for(let i=0;i<lis.length;i++){
                let text=lis[i].innerText;
                //debugger;
                if(text.trim()==category){
                    elem=lis[i].parentNode.cloneNode(true);
                    Admin.del_category_func(category);
                }else{
                    return;
                }
            }
            for(let i=0;i<lis.length;i++){
                let text=lis[i].innerText;
                if(text.trim()==edit_prev){
                    let elem_prev=lis[i].parentNode;
                    let elem_to_add=elem_prev.querySelector('.categories');
                    elem_to_add.appendChild(elem);
                }
            }   
        }
        debugger;
        if(edit_prev==''){
            for(let i=0;i<lis.length;i++){
                let check_child=lis[i].parentNode.childNodes.length;
                console.log(check_child);
                if(check_child>2){
                    let text=lis[i].innerText;
                    //debugger;
                    if(text.trim()==category){
                        lis[i].innerHTML=edit_category;
                    }
                }else{
                    return;
                }
            }
        }
        debugger;
        if(edit_category==''&&edit_prev==''||category==''){
            return;
        }
        if(edit_category!=''&&edit_prev!=''&&category!=''){
            let elem;
            for(let i=0;i<lis.length;i++){
                let text=lis[i].innerText;
                //debugger;
                if(text.trim()==category){
                    lis[i].innerHTML=edit_category;
                    debugger;
                    elem=lis[i].parentNode.cloneNode(true);
                    Admin.del_category_func(edit_category);
                }else{
                    return;
                }
            }
            for(let i=0;i<lis.length;i++){
                let text=lis[i].innerText;
                if(text.trim()==edit_prev){
                    debugger;
                    let elem_prev=lis[i].parentNode;
                    let elem_to_add=elem_prev.querySelector('.categories');
                    elem_to_add.appendChild(elem);
                }
            }
        }
    },
    del_category:()=>{
        let category=document.querySelector('.admin_del_category').value;
        Admin.del_category_func(category);
    },
    del_book:()=>{
        let book=document.querySelector('.admin_del_name').value;
        let lis=document.getElementsByTagName('span');
        for(let i=0;i<lis.length;i++){
            let text=lis[i].innerText;
            if(text.trim()==book){
                let elem=lis[i].parentNode;
                elem.remove();
            }
        }
        for(let i=0;i<state.autors.length;i++){
            //debugger;
            if(book==state.autors[i].book){
                state.autors.splice(i,1);
                break;
            }
            //debugger;
        }
        console.log(state.autors);
    }
}