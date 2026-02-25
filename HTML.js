let HTMLLoaded = false;
let langGame = "en";
const IMGs = {};
const HTMLs = {};
const IMG = {};
const ID = {};
const IDs = ["body"];
const TEXTs = {};
myLog?.("html.js")
loadHTMLs().then(()=>{
    loadIMG().then(()=>{
        generateHTML().then(()=>{
            DOMInitialization().then(()=>{
                loadLangTexts().then(()=>{
                    changeTextsLang(); 
                    HTMLLoaded = true; 
                    startGame();
                })
            })
        })
    })
});

async function loadIMG(){
    const load = await fetch('IMG.json').then(r => r.json());
    Object.assign(IMGs, load);
    for (const key in IMGs) {
        const img = new Image();  // Создаем объект Image (быстро)
        img.src = IMGs[key];      // Начинаем загрузку (не ждем!)
        IMG[key] = img;     // Сохраняем в кэш (быстро)
    }
}
async function loadHTMLs(){ //загрузка HTML.json
    const load = await fetch('HTML.json').then(r => r.json());
    Object.assign(HTMLs, load);
}
async function generateHTML(){
    for(const key in HTMLs){
        let isСycle = key.substring(0, 1);
        if(isСycle == "$"){
            if(isNaN(HTMLs[key].arrayName$)){
                const array = window[HTMLs[key].arrayName$];
                let id = key.substring(1);
                let parent = HTMLs[key]?.Parent;
                let src = IMG[HTMLs[key]?.Src]?.src;
                let onclick = new Function(HTMLs[key]?.OnClick);
                for(let i = 0; i < array.length; i++){
                    if(HTMLs[key]?.Parent.substring(0, 1) == "_"){
                        parent = array[i].name + HTMLs[key]?.Parent.substring(1);
                    } 
                    if(HTMLs[key]?.Id.substring(0, 1) == "_"){
                        id = array[i].name + HTMLs[key]?.Id.substring(1); //Не нравиться что используеться .name не универсально скорее всего надо переходить  на глобальный объект и тогда можно получать их имена через key
                    }
                    if(HTMLs[key]?.Src?.substring(0, 1) == "_"){
                        src = IMG[array[i].name + HTMLs[key]?.Src.substring(1)]?.src;
                    }
                    if(HTMLs[key]?.OnClick?.substring(0, 1) == "$"){
                        onclick = array[i][HTMLs[key].OnClick.substring(1)];
                    }
                    DOM.Create({Parent: parent, Id: id, Tag: HTMLs[key]?.Tag, Class: HTMLs[key]?.Class, Hidden: HTMLs[key]?.Hidden, Text:HTMLs[key]?.Text, Src: src, OnClick: onclick, Value:HTMLs[key]?.Value});   
                    IDs.push(id);
                }
            } 
            else{
                let id = key.slice(0, -1);
                let parent = HTMLs[key]?.Parent;
                let src = IMG[HTMLs[key]?.Src]?.src;
                for(let i = 0; i < HTMLs[key].arrayName$; i++){
                    if(HTMLs[key]?.Parent.slice(-1) == "_"){
                        parent = HTMLs[key]?.Parent.slice(0, -1) + i;
                    }
                    if(HTMLs[key]?.Id.slice(-1) == "_"){
                        id = HTMLs[key]?.Id.slice(0, -1) + i;
                    }
                    DOM.Create({Parent: parent, Id: id, Tag: HTMLs[key]?.Tag, Class: HTMLs[key]?.Class, Hidden: HTMLs[key]?.Hidden, Text:HTMLs[key]?.Text, Src: src, OnClick: new Function(HTMLs[key]?.OnClick), Value:HTMLs[key]?.Value});
                    IDs.push(id);   
                } 
            }
        }else{
            DOM?.Create({Parent: HTMLs[key]?.Parent, Id: key, Tag: HTMLs[key]?.Tag, Class: HTMLs[key]?.Class, Hidden: HTMLs[key]?.Hidden, Text:HTMLs[key]?.Text, Src:IMG[HTMLs[key]?.Src]?.src, OnClick: new Function(HTMLs[key]?.OnClick), Value:HTMLs[key]?.Value});
            IDs.push(key);
        }
    }
}
async function DOMInitialization() {
    IDs.forEach(id => {
        ID[id] = DOM.Id(id);
    })
    await new Promise(r => setTimeout(r, 0));
    return Promise.resolve();
}
async function loadLangTexts(){
    const load = await fetch('lang.json').then(r => r.json());
    Object.assign(TEXTs, load);
}
function changeTextsLang(){
    for(const key in TEXTs){
        toChangeText(key, TEXTs[key]?.[langGame]);
    }
}
function changeLang(lang){
    if(lang != undefined){
        langGame = lang;
        ID.langBtn.value = lang == "ru" ? "en" : "ru";
    } else{
        langGame = langGame == "ru" ? "en" : "ru";
    }
    ID.langBtn.textContent = langGame;
    changeTextsLang() 
}