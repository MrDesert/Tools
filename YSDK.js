let resurses = false;
let sdkLoad = false;

function useSDK(bool){
if(bool){
    const script = document.createElement('script');
        script.src = "/sdk.js";
        script.async = true;
    document.head.appendChild(script);
    script.onload = function(){
        myLog?.("script.onload");
        YaGames.init().then(ysdk => {
            const langSDK = ysdk.environment?.i18n?.lang; //Запрашиваем язык у YSDK
            if(langSDK == "ru"){document.getElementById("loading").textContent = "Загрузка"}
            else{document.getElementById("loading").textContent = "Loading"};
            myLog?.("язык - " + langSDK);
            document.documentElement.lang = langSDK;
            window.ysdk = ysdk;
            if(window.ysdk){
                sdkLoad = true;
                myLog?.("SDK загружен - " + sdkLoad);
            }
        })
        .then(()=>{
            return new Promise((resolve)=>{
                const chekcInterval = setInterval(()=>{
                    if (sdkLoad && resurses){
                        myLog?.("Загруженны ресурсы и SDK");
                        ysdk.features?.GameplayAPI?.start?.();
                        clearInterval(chekcInterval);
                        resolve();
                    }
                    else if(sdkLoad){myLog?.("Ожидание ресурсов - " + resurses)}
                    else if (resurses){myLog?.("Ожидание SDK - " + sdkLoad)}
                    else{myLog?.("Ожидание ресурсов и CDK");}
                }, 400);
            })
        })
        .then(()=>{                 
            ysdk.features.LoadingAPI.ready();
        })
        .then(()=>{
            setTimeout(function(){
                startGame();
            }, 5);
        })
        .catch(console.error);
    };
    window.addEventListener('load', function(){
        // resurses = true;
        myLog?.("Ресурсы загруженны - " + resurses);
    }) 
} else {
    setTimeout(function(){ sdkLoad =true; resurses=true; startGame();}, 1000);
}
}