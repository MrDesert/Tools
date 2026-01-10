var DOM =(function(){
    //Приватные функции
    function private(){

    }
    //Публичные функции
    return {
        elDisabled: function(id, bool){
            document.getElementById(id).disabled = bool;
        },

        elHide: function(id, bool){
            document.getElementById(id).hidden = bool;
        }
    }
})();
// function elDisabled(id){
//     document.getElementById(id).disabled = "disabled";
// }
//alpha v0.0.2.3