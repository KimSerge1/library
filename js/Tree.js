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