let array;
var toastTimeout;
var fontTimeout; 

const text = document.querySelector('#text');
const fontSizeInput = document.querySelector('#font-size');
const letterSpacingInput = document.querySelector('#letter-spacing');

document.addEventListener('keydown', (e)=>{
    if(e.shiftKey && e.code == 'Space'){
        text.classList.add('hide');
        document.querySelector('#toast').classList.add('hide-and-slide-up');
    }

    if(e.shiftKey && e.code == 'KeyT'){
        runToast(text.style.fontFamily.replace(/"/g, ""));
    }
    
    if(e.shiftKey && e.keyCode == '38'){ incFontSize(); }
    if(e.shiftKey && e.keyCode == '40'){ decFontSize(); }
    if(e.shiftKey && e.keyCode == '39'){ incLetterSpacing(); }
    if(e.shiftKey && e.keyCode == '37'){ decLetterSpacing(); }

    if(e.ctrlKey && e.shiftKey && e.code == 'KeyS'){
        const cPanel = document.querySelector('#control-panel');
        const fontSize = getFontSize();
        setFontSize(fontSize);
        cPanel.classList.toggle('hide');
        if(cPanel.classList.contains('hide')){
            document.activeElement.blur();
        }else{
            document.querySelector('#text-input').focus();
        }
    }

    if(e.ctrlKey && e.shiftKey && e.code == 'KeyU'){
        if(text.style.textTransform == 'uppercase'){
            text.style.textTransform = 'none';
        }else{
            text.style.textTransform = 'uppercase';
        }
    }

    if(e.ctrlKey && e.shiftKey && e.code == 'KeyL'){
        if(text.style.textTransform == 'lowercase'){
            text.style.textTransform = 'none';
        }else{
            text.style.textTransform = 'lowercase';
        }
    }

    if(e.ctrlKey && e.shiftKey && e.code == 'KeyN'){
        text.style.textTransform = 'none';
    }
});

document.querySelector('#text-input').addEventListener('keyup', (e)=>{
    text.textContent = e.target.value;
})

text.addEventListener('transitionend', ()=>{
    if(text.classList.contains('hide')){
        text.style.letterSpacing = '0px';
        updateLink(array[getRandFontIndex(array.length)]);
    }
});

fontSizeInput.addEventListener('keyup', (e)=>{
    setFontSize(e.target.value);
});

letterSpacingInput.addEventListener('keyup', (e)=>{
    setLetterSpacing(e.target.value);
});

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
    text.style.fontFamily = `'${font}'`;
    window.clearTimeout(fontTimeout);
    fontTimeout = setTimeout(()=>{
        text.classList.remove('hide');
        runToast(font);
    }, 800)
    
}

function getRandFontIndex(listLength){
    return Math.floor(Math.random() * listLength);
}

function runToast(text){
    var toast = document.querySelector('#toast');
    toast.textContent = text;
    toast.classList.remove('hide-and-slide-up');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(()=>{
        toast.classList.add('hide-and-slide-up');
    },5000);
}

// Font size functions

function incFontSize(){
    let size = getFontSize();
    setFontSize(size + 1);
}

function decFontSize(){
    var size = getFontSize();
    setFontSize(size - 1);
}

function getFontSize(){
    let fontSize = text.style.fontSize;
    fontSize = parseInt(/\d*/g.exec(fontSize).join());
    return fontSize;
}

function setFontSize(size){
    text.style.fontSize = `${size}px`;
    fontSizeInput.value = size;
}

// Letter spacing functions

function incLetterSpacing(){
    let size = getLetterSpacing();
    setLetterSpacing(size + 1);
}

function decLetterSpacing(){
    var size = getLetterSpacing();
    setLetterSpacing(size - 1);
}

function getLetterSpacing(){
    let letterSpacing = text.style.letterSpacing;
    letterSpacing = parseInt(/-?\d*/g.exec(letterSpacing).join());
    return letterSpacing;
}

function setLetterSpacing(size){
    text.style.letterSpacing = `${size}px`;
    letterSpacingInput.value = size;
}

getFonts();