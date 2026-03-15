//Для подключения данной консоли в html стоит указть следующий код: 
//<script src="console.js" onload="createConsole(true)"></script>
//Если поменять true на false она не Будет подключена
//Так же при подключение скрипта можно указать клавишу на которую 
//будет открыватся консоль - (true, "KeyQ"), по умолчанию используеться F1

const myConsole = {
    created: false,
    shown: false,
    showBtn: "F1",
    btnsNames: []
}

function createConsole(isOn, key){

    function createElement({parent, id, style, innerHTML=""}){
        document.querySelector(parent).append(
	        Object.assign(document.createElement("div"), {id: id, style: style, innerHTML: innerHTML})
        );
    }

    if(isOn && !myConsole.created){
        createElement({parent: "body", id: "myConsoleID", style: "z-index: 1000; border-left: 3px solid #444; opacity:80%; overflow-y: auto; position: fixed; right: 0; top: 0; background-color: black; color: white; height: 100vh; width: 40%; min-width: 10%; max-width: 100%; font-family: 'Courier New', Courier, monospace; resize: horizontal;"});
        createElement({parent: "body", id: "myConsoleResizeHandle", style: "position: fixed; right: 40%; top: 0; width: 5px; height: 100vh; background: #444; cursor: ew-resize; z-index: 1001; opacity: 0.5;"});
document.getElementById("myConsoleResizeHandle").hidden = "hidden";

// Обработчик ресайза
const handle = document.getElementById("myConsoleResizeHandle");
const console = document.getElementById("myConsoleID");

let isResizing = false;

handle.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    
    const isLeft = console.style.right !== "0px";
    let newWidth;
    
    if(isLeft) {
        // Консоль слева - ширина = позиция мыши
        newWidth = (e.clientX / window.innerWidth) * 100;
    } else {
        // Консоль справа - ширина = (ширина окна - позиция мыши) / ширина окна
        newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
    }
    
    const clampedWidth = Math.max(10, Math.min(100, newWidth));
    
    console.style.width = clampedWidth + '%';
    
    if(isLeft) {
        handle.style.left = clampedWidth + '%';
    } else {
        handle.style.right = clampedWidth + '%';
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
});
    
        document.querySelector("#myConsoleID").hidden = "hidden";
            createElement({parent: "#myConsoleID", id: "myConsoleInfoPanelID", style: "height: auto; width: 100%;"});
                createElement({parent: "#myConsoleInfoPanelID", id: "myConsoleInfoFPSID", style: "height: 25px; width: 130px; font-size: 25px; margin: 10px; display: inline-block;"});
            createElement({parent: "#myConsoleID", id: "myConsoleControlPanel", style: "height: auto; width: 100%; font-size: 20px; padding: 5px;"});
createElement({parent: "#myConsoleControlPanel", id: "myConsoleThemeBtn", style: "height: 25px; width: 25px; font-size: 20px; display: inline-block; background: none; cursor: pointer;", innerHTML: "☀️"});
createElement({parent: "#myConsoleControlPanel", id: "myConsoleSideBtn", style: "height: 25px; width: 25px; font-size: 20px; display: inline-block; background: none; cursor: pointer;", innerHTML: "◀️"});
createElement({parent: "#myConsoleControlPanel", id: "myConsoleClearBtn", style: "height: 25px; width: 25px; font-size: 20px; display: inline-block; background: none; cursor: pointer;", innerHTML: "🧹"});
createElement({parent: "#myConsoleControlPanel", id: "myConsoleMinifyBtn", style: "height: 25px; width: 25px; font-size: 20px; margin: 5px; display: inline-block; background: none; border: 1px solid #666; cursor: pointer;", innerHTML: "🗕"});

document.getElementById("myConsoleMinifyBtn").addEventListener('click', () => {
    const console = document.getElementById("myConsoleID");
    const lines = document.getElementById("myConsoleLines");
    const panel = document.getElementById("myConsoleControlPanel");
    const info = document.getElementById("myConsoleInfoPanelID");
    const handle = document.getElementById("myConsoleResizeHandle");
    const btn = document.getElementById("myConsoleMinifyBtn");
    
    // Переключаем класс
    console.classList.toggle("minimized");
    
    if(console.classList.contains("minimized")) {
        // Сворачиваем
        lines.style.display = "none";
        panel.style.display = "none";
        info.style.display = "none";
        handle.style.display = "none";
        btn.innerHTML = "🗖";
        console.style.height = "80px";
        
        // Показываем мини-логи
        const miniContainer = document.createElement("div");
        miniContainer.id = "myConsoleMiniLogs";
        miniContainer.style = "display: flex; flex-direction: column; height: 80px; overflow: hidden;";
        
        const fps = document.getElementById("myConsoleInfoFPSID").cloneNode(true);
        fps.id = "myConsoleMiniFPS";
        fps.style.display = "block";
        fps.style.width = "100%";
        fps.style.textAlign = "center";
        fps.style.margin = "2px 0";
        fps.style.fontSize = "14px";
        miniContainer.appendChild(fps);
        
        // Кнопка разворачивания прямо в мини-консоли
const expandBtn = document.createElement("button");
expandBtn.innerHTML = "🗖";
expandBtn.style = "position: absolute; right: 5px; top: 5px; height: 25px; width: 25px; background: none; border: 1px solid #666; cursor: pointer; z-index: 1002;";
expandBtn.onclick = function(e) {
    e.stopPropagation();
    document.getElementById("myConsoleMinifyBtn").click();
};
console.appendChild(expandBtn);

        const allLines = document.querySelectorAll("#myConsoleLines div");
        const lastLines = Array.from(allLines).slice(-3);
        
        lastLines.forEach(line => {
            const miniLine = line.cloneNode(true);
            miniLine.style.height = "18px";
            miniLine.style.fontSize = "12px";
            miniLine.style.overflow = "hidden";
            miniLine.style.textOverflow = "ellipsis";
            miniLine.style.whiteSpace = "nowrap";
            miniLine.style.padding = "0 5px";
            miniContainer.appendChild(miniLine);
        });
        
        console.appendChild(miniContainer);
        
    } else {
        // Разворачиваем
        lines.style.display = "block";
        panel.style.display = "block";
        info.style.display = "block";
        handle.style.display = "block";
        btn.innerHTML = "🗕";
        console.style.height = "100vh";
        
        const miniLogs = document.getElementById("myConsoleMiniLogs");
        const expandBtn = document.querySelector("#myConsoleID > button");
if(expandBtn) expandBtn.remove();
        if(miniLogs) miniLogs.remove();
    }
});
                // Обработчик темы
document.getElementById("myConsoleThemeBtn").addEventListener('click', () => {
    const console = document.getElementById("myConsoleID");
    const btn = document.getElementById("myConsoleThemeBtn");
    
    if(console.style.backgroundColor !== "white") {
        console.style.backgroundColor = "white";
        console.style.color = "black";
        btn.innerHTML = "🌙";
    } else {
        console.style.backgroundColor = "black";
        console.style.color = "white";
        btn.innerHTML = "☀️";
    }
});

// Обработчик ориентации
document.getElementById("myConsoleSideBtn").addEventListener('click', () => {
    const console = document.getElementById("myConsoleID");
    const handle = document.getElementById("myConsoleResizeHandle");
    const btn = document.getElementById("myConsoleSideBtn");
    
    // Проверяем текущую позицию по left
    if(console.style.left === "0px") {
        // Сейчас слева - перемещаем направо
        console.style.right = "0";
        console.style.left = "auto";
        handle.style.right = "40%";
        handle.style.left = "auto";
        handle.style.cursor = "ew-resize";
        btn.innerHTML = "◀️";
    } else {
        // Сейчас справа - перемещаем налево
        console.style.right = "auto";
        console.style.left = "0";
        handle.style.right = "auto";
        handle.style.left = "40%";
        handle.style.cursor = "ew-resize";
        btn.innerHTML = "▶️";
    }
});
                createElement({parent: "#myConsoleControlPanel", id: "myConsoleOpacityID", style: "height: 25px; font-size: 16px; display: inline-block;", innerHTML: "Прозрачность: "});
                    document.querySelector("#myConsoleControlPanel").append(
                        Object.assign(document.createElement("input"), {id: "myConsoleOpacityRangeID", style: "height: 25px; width: 100px; margin: 5px; vertical-align: middle;", type: "range", min: 0.05, max: 1, step: 0.05, value: 0.8})
                    );
                    document.getElementById("myConsoleOpacityRangeID").addEventListener('input', (e) => {
                        document.getElementById("myConsoleID").style.opacity = e.target.value;
                    });
            createElement({parent: "#myConsoleID", id: "myConsoleLines", style: "width: 100%; font-size: 20px; padding: 10px;"});
        myConsole.created = true;
        if(key){myConsole.showBtn = key;}
        FPS(performance.now());
        myLog("Консоль создана!")
    }
    return createElement;

    function FPS(currentTime){
        if(myConsole.created){
            if(currentTime - (FPS.lastTime || 0) >= 1000){
                document.getElementById("myConsoleInfoFPSID").innerHTML = "FPS: " + FPS.count;
                FPS.count = 0;
                FPS.lastTime = currentTime;
            }
            FPS.count = (FPS.count || 0) + 1;
            requestAnimationFrame(FPS);
        }
    }
} 

function consoleCreateBtnsCP(btns){

    function  update(){
        for(let i = 0; i < myConsole.btnsNames.length; i++){
            document.getElementById("myConsoleCPBtnID"+i).innerHTML = myConsole.btnsNames[i] + " - " + 10** document.getElementById("myConsoleCPRangeID").value;
        }
    }

    if(myConsole.created){
        myConsole.btnsNames = [...btns];
        document.querySelector("#myConsoleControlPanel").append(
	        Object.assign(document.createElement("input"), {id: "myConsoleCPRangeID", style: "height: 25px; font-size: 20px; margin: 5px; display: inline-block;", type: "range", min: 0, value: 1, max: 15,})
        );
        document.getElementById("myConsoleCPRangeID").addEventListener('input', ()=> {
            update();
        })
        for(let i = 0; i < myConsole.btnsNames.length; i++){
            document.querySelector("#myConsoleControlPanel").append(
	            Object.assign(document.createElement("button"), {id: "myConsoleCPBtnID"+i, value: myConsole.btnsNames[i], style: "height: 25px; font-size: 20px; margin: 5px; display: inline-block;", onclick: function(){consBtnReturn(10**document.getElementById("myConsoleCPRangeID").value, this.value);}})
            );
        }
        document.querySelector("#myConsoleControlPanel").append(
            Object.assign(document.createElement("button"), {id: "myConsoleCPClearStorageID", style: "height: 25px; font-size: 20px; margin: 5px; display: inline-block;", innerHTML:"очистить локальное хранилище", onclick: function(){localStorage.clear(); startingValues(); hit.count = 0; expBonus.count = 0; bossLevel = 1; exp = 0}})
        );
        update();
    }
}

document.addEventListener('keydown', (e)=> {
    if(myConsole.created){
        let myConsoleID = document.getElementById("myConsoleID");
        if(e.code === myConsole.showBtn){
            e.preventDefault();
            myConsole.shown = !myConsole.shown;
            myConsole.shown ? myConsoleID.removeAttribute("hidden") : myConsoleID.hidden = "hidden";
            document.getElementById("myConsoleResizeHandle").hidden = myConsoleID.hidden;
        } else if(myConsole.shown && e.code === 'Escape'){
            e.preventDefault();
            myConsole.shown = !myConsole.shown;
            myConsoleID.hidden = "hidden";
            document.getElementById("myConsoleResizeHandle").hidden = myConsoleID.hidden;
        }
    }
});

function myLog(text){
    if(myConsole.created){
        // Проверяем последнюю строку
        const lastLine = document.querySelector("#myConsoleLines div:last-child");
        if(lastLine){
            const lastText = lastLine.innerHTML.replace(/\(\d+\)$/, '').trim(); // убираем (число) в конце если есть
            if(lastText === myLog.count + ". " + text){
                // Если совпадает - увеличиваем счетчик
                const match = lastLine.innerHTML.match(/\((\d+)\)$/);
                const count = match ? parseInt(match[1]) + 1 : 2;
                lastLine.innerHTML = lastText + " (" + count + ")";
                return;
            }
        }
        
        // Если не совпало - добавляем новую строку
        myLog.count = (myLog.count || 0) + 1;
        const line = createConsole();
        line({parent: "#myConsoleLines", id: "myConsoleLineID"+myLog.count, style: "height: 20px; width: 100%;", innerHTML: myLog.count + ". " + text});
        return myLog.count;
    }
}