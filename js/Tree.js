let Tree={ //методы нашего деревца
    unique_category:(arr)=>{
        var obj = {};  
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            obj[str] = true; // запомнить строку в виде свойства объекта
        }
        return Object.keys(obj);
    },
    create_tree:()=>{
        let tree=document.querySelector('.tree');
        let categories=state.autors;
        let buffer=[];
        for(let i=0;i<categories.length;i++){
            let check=categories[i];
            let mass=check.categoryes;
            for(let j=0;j<mass.length;j++){
                buffer.push(mass[j]);
            }
        }
        debugger;
        let ul_tree=document.createElement('ul');
        ul_tree.classList='categories';
        let unique_category=Tree.unique_category(buffer);
        for(let i=0;i<unique_category.length;i++){
            let ul=document.createElement('ul');
            ul.className='categories';
            let li=document.createElement('li');
            li.className='categories__item';
            li.innerHTML=unique_category[i];
            li.appendChild(ul);
            ul_tree.appendChild(li);
        }
        tree.appendChild(ul_tree);
    },
    add_books:()=>{
        let lis=document.getElementsByTagName('span');
        for(let i=0;i<lis.length;i++){
            for(let j=0;j<state.autors.length;j++){
                let text=lis[i].innerText;
                for(let p=0;p<state.autors[j].categoryes.length;p++){
                    if(text.trim()==state.autors[j].categoryes[p]){
                        //console.log(categories[j]);
                        let elem=lis[i].parentNode;
                        let elem_to_add=elem.querySelector('.categories');
                        let li=document.createElement('li');
                        li.classList.add('categories__item');
                        li.innerHTML='<span>'+state.autors[j].book+'</span>';
                        elem_to_add.appendChild(li);
                    }
                }
            }
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