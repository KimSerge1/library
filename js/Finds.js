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