import Font from "./components/Font";
import CPanel from "./components/CPanel";

const font = new Font();
font.getFontList().then((data)=>{
    font.init(data);
}).then(()=>{
    initNewFont(true);
}).catch((err)=>{
    console.log(err);
});

// const cp = new CPanel();

var timer;

function initNewFont(start=false){
    var toast = document.querySelector('#toast');
    if(!toast.classList.contains('hide-and-slide-up')){
        toast.classList.add('hide-and-slide-up');
    }
    var text = document.querySelector('#text');
    if(!start){
        text.addEventListener('transitionend', changeFont);
        font.hide(text);
    }else{
        prepareNewFont(true);
    }
}

function changeFont(){
    prepareNewFont(false);
}

function prepareNewFont(start=true){
    console.log(start);
    var selectedCategories = font.getSelectedCategories();
    font.setFilteredList(selectedCategories);
    var filteredList = font.getFilteredList();

    var randomFont = font.getRandomFont(filteredList);
    font.set(randomFont);
    if(start){
        font.resetValues(document.querySelector('#text'), true);
    }else{
        font.resetValues(document.querySelector('#text'));
    }
    font.setLink(font);
    font.setInlineStyle(font);
    font.setToast(font.family.replace(/"/g, ""));
    window.clearTimeout(timer);
    timer = setTimeout(()=>{
        updateNewFont();
    }, 500);
}

function updateNewFont(){
    var text = document.querySelector('#text')
    text.removeEventListener('transitionend', changeFont);
    font.toast();    
    font.reveal(text);
}

document.addEventListener('keydown', (e)=>{
    var mainText = document.querySelector('#text');
    if(e.shiftKey && e.code == 'Space'){ initNewFont(); }
    if(e.shiftKey && e.code == 'KeyT'){ font.toast(); }
    if(e.ctrlKey && e.shiftKey && e.code == 'KeyS') { font.toggleCPanel() }
    if(e.shiftKey && e.keyCode == '38') { font.setSize(mainText, 1) }
    if(e.shiftKey && e.keyCode == '40') { font.setSize(mainText, -1) }
    if(e.shiftKey && e.keyCode == '39') { font.setSpace(mainText, 1) }
    if(e.shiftKey && e.keyCode == '37') { font.setSpace(mainText, -1) }
    if(e.ctrlKey && e.shiftKey && e.code == 'KeyU') { font.toggleUpper(mainText) }
    if(e.ctrlKey && e.shiftKey && e.code == 'KeyL') { font.toggleLower(mainText) }
})


font.textInput.addEventListener('keyup', (e)=>{ font.setText(e.target.value) });
['keyup', 'change'].forEach((event)=>{
    font.sizeInput.addEventListener(event, (e)=>{ font.setSize(document.querySelector('#text'), e.target.value, true) });
    font.letterSpacingInput.addEventListener(event, (e)=>{ font.setSpace(document.querySelector('#text'), e.target.value, true) });
})

font.categoriesInput.forEach(category => {
    category.addEventListener('change', (e)=>{
        var selectedCategories = font.getSelectedCategories();
        if(selectedCategories.length == 0){
            e.target.checked = true;
        }
        initNewFont();
    })
})