var DOM =(function(){
    //Приватные функции
    function private(){

    }
    //Публичные функции
    return {
        Disable: function(id, bool = true){
            document.getElementById(id).disabled = bool;
        },

        Hide: function(id, bool = true){
            document.getElementById(id).hidden = bool;
        },

        Id: function(id){
            return document.getElementById(id);
        },

        Create: function({Parent, Method = "append", Tag, Id, Class, Text}){
            if(Parent){
                document.getElementById(Parent)[Method](
		            Object.assign(document.createElement(Tag), {id: Id, className: Class, innerHTML: Text})
	            );
            } else {
                console.error(Parent + ' - Такого элемента нет!');
            }
        }
    }
})();
// function elDisabled(id){
//     document.getElementById(id).disabled = "disabled";
// }
//alpha v0.0.3