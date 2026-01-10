var DOM =(function(){
    //Приватные функции
    function private(){

    }
    //Публичные функции
    return {
        elDisabled: function(id, bool){
            document.getElementById(id).disabled = bool;
            // const el = document.getElementById(id);
            // bool ? el.disabled = "disabled" : el.removeAttribute("disabled");
        }
    }
})();
// function elDisabled(id){
//     document.getElementById(id).disabled = "disabled";
// }
//alpha v0.0.2.1