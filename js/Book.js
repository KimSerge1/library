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