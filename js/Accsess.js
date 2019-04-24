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