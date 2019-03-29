let array;

document.addEventListener('keypress', (e)=>{
    if(e.shiftKey && e.code == 'Space'){
        updateLink(array[getRandFontIndex(array.length)]);
    }

    if(e.ctrlKey && e.shiftKey && e.code == 'KeyK'){
        var cPanel = document.querySelector('#control-panel');
        cPanel.classList.toggle('hide');
        if(cPanel.classList.contains('hide')){
            document.activeElement.blur();
        }else{
            document.querySelector('#text-input').focus();
        }
    }
});

document.querySelector('#text-input').addEventListener('keyup', (e)=>{
    document.querySelector('#text').textContent = e.target.value;
})

function getFonts(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.status == 200 && xhr.readyState == 4){
            startApp(JSON.parse(xhr.responseText));
        }
    }

    xhr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAZPt82j4_tyfPLEeWYVp14aXp5SM1-PME", true);

    xhr.send();
}

function startApp(api){
    var library = api.items;
    array = library.map((item)=>{
        return item.family;
    })

    createLink(array[getRandFontIndex(array.length)]);
}

function createLink(font){
    var link = document.createElement('link');
    link.id = 'googleFont';
    link.rel = 'stylesheet';
    link.type = "text/css";
    link.href = `https://fonts.googleapis.com/css?family=${font}`;

    document.getElementsByTagName('head')[0].appendChild(link);
    setTextStyle(font);
}

function updateLink(font){
    var link = document.querySelector('#googleFont');
    link.href = `https://fonts.googleapis.com/css?family=${font}`;
    setTextStyle(font);
}

function setTextStyle(font){
    const text = document.querySelector('#text');
    text.style.fontFamily = `'${font}'`;
}

function getRandFontIndex(listLength){
    return Math.floor(Math.random() * listLength);
}

getFonts();