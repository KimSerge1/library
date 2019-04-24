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
            if(book==state.autors[i].book){
                state.autors.splice(i,1);
                break;
            }
        }
        console.log(state.autors);
    }
}