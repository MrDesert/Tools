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

        Create: function({Parent, Method = "append", Tag = "div", Id, Class, Text, Src, Disabled, Hidden, OnClick, Style}){
            const parent = document.getElementById(Parent);
            if(parent){
                if(['append', 'prepend', 'before', 'after'].includes(Method)){
                    parent[Method](
		                Object.assign(
                            document.createElement(Tag), 
                            Id !== undefined && {id: Id}, 
                            Class !== undefined && {className: Class}, 
                            Text !== undefined && {textContent: Text},
                            Src !== undefined && {src: Src},
                            Disabled !== undefined && {disabled: Disabled},
                            Hidden !== undefined && {hidden: Hidden},
                            OnClick !== undefined && {onclick: OnClick},
                            Style !== undefined && {style: Style}
                        )
	                );
                } else {
                    console.error(Method + ' - Такого метода нет!');
                }
            } else {
                console.error(Parent + ' - Такого элемента нет!');
            }
        }
    }
})();
// function elDisabled(id){
//     document.getElementById(id).disabled = "disabled";
// }
//alpha v0.0.3.6.0