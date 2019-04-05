import Font from "./components/Font";

const font = new Font();
font.getFontList().then((data) => {
    font.init(data);
}).then(() => {
    initNewFont(true);
}).catch((err) => {
    console.log(err);
});

var undoHistory = [];  // ex 3 entries
var undoSteps = 0;
var timer;

function initNewFont(start = false, undoRedo = null) {
    var toast = document.querySelector('#toast');
    if (!toast.classList.contains('hide-and-slide-up')) {
        toast.classList.add('hide-and-slide-up');
    }
    var text = document.querySelector('#text');
    if (!start && !undoRedo) {
        text.addEventListener('transitionend', changeFont);
        font.hide(text);
    } else if (!start && undoRedo === 'undo') {
        text.addEventListener('transitionend', undoFont);
        font.hide(text);
    } else if (!start && undoRedo === 'redo') {
        text.addEventListener('transitionend', redoFont);
        font.hide(text);
    }
    else {
        prepareNewFont(true);
    }
}

function changeFont() {
    prepareNewFont(false);
}

function undoFont() {
    if ((undoSteps + 1) < undoHistory.length) {
        undoSteps++;
        prepareNewFont(false, true, undoSteps);
    } else {
        text.removeEventListener('transitionend', undoFont);
        font.reveal(text);
    }
}

function redoFont() {
    if ((undoSteps - 1) >= 0) {
        undoSteps--;
        prepareNewFont(false, true, undoSteps);
    } else {
        text.removeEventListener('transitionend', redoFont);
        font.reveal(text);
    }
}

function prepareNewFont(start = true, undoRedo = false, undoRedoSteps = 0) {
    if (undoRedo) {
        font.set(undoHistory[(undoHistory.length - 1) - undoRedoSteps]);
    } else {
        if (undoSteps > 0) {
            undoHistory = undoHistory.slice(0, (undoHistory.length) - undoSteps)
            undoSteps = 0;
        }
        var selectedCategories = font.getSelectedCategories();
        font.setFilteredList(selectedCategories);
        var filteredList = font.getFilteredList();
        var randomFont = font.getRandomFont(filteredList);
        undoHistory.push(randomFont);
        font.set(randomFont);
    }

    if (start) {
        font.resetValues(document.querySelector('#text'), true);
    } else {
        font.resetValues(document.querySelector('#text'));
    }
    font.setLink(font.get());
    font.setInlineStyle(font.get());
    font.setToast(font.family.replace(/"/g, ""));
    window.clearTimeout(timer);
    timer = setTimeout(() => {
        updateNewFont();
    }, 500);
}

function updateNewFont() {
    var text = document.querySelector('#text');
    [changeFont, undoFont, redoFont].forEach((listener) => {
        text.removeEventListener('transitionend', listener);
    })
    font.toast();
    font.reveal(text);
}



document.addEventListener('keydown', (e) => {
    var mainText = document.querySelector('#text');
    if (e.shiftKey && e.code == 'Space') { initNewFont(); }
    if (e.shiftKey && e.code == 'KeyT') { font.toast(); }
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyZ') { initNewFont(false, 'undo') }
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyY') { initNewFont(false, 'redo') }
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyS') { font.toggleCPanel() }
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyF') { font.toggleWhiteOnBlack() }
    if (e.shiftKey && e.keyCode == '38') { font.setSize(mainText, 1) }
    if (e.shiftKey && e.keyCode == '40') { font.setSize(mainText, -1) }
    if (e.shiftKey && e.keyCode == '39') { font.setSpace(mainText, 1) }
    if (e.shiftKey && e.keyCode == '37') { font.setSpace(mainText, -1) }
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyU') { font.toggleUpper(mainText) }
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyL') { font.toggleLower(mainText) }
})


font.textInput.addEventListener('keyup', (e) => { font.setText(e.target.value) });
['keyup', 'change'].forEach((event) => {
    font.sizeInput.addEventListener(event, (e) => { font.setSize(document.querySelector('#text'), e.target.value, true) });
    font.letterSpacingInput.addEventListener(event, (e) => { font.setSpace(document.querySelector('#text'), e.target.value, true) });
})

font.categoriesInput.forEach(category => {
    category.addEventListener('change', (e) => {
        var selectedCategories = font.getSelectedCategories();
        if (selectedCategories.length == 0) {
            e.target.checked = true;
        }
        initNewFont();
    })
})

font.caseOptions.forEach((option) => {
    option.addEventListener('change', (e) => {
        if(e.target.id === 'uppercase' && e.target.checked){ font.setCase(font.text, 'uppercase') }
        if(e.target.id === 'lowercase' && e.target.checked){ font.setCase(font.text, 'lowercase') }
        if(e.target.id === 'none' && e.target.checked){ font.setCase(font.text, 'none') }
    })
})

font.colourScheme.forEach((option)=>{
    option.addEventListener('change', (e)=>{
        if(e.target.id === 'bow' && e.target.checked){ font.setColourScheme(font.wrapper, true); }
        if(e.target.id === 'wob' && e.target.checked){ font.setColourScheme(font.wrapper, false); }
    })
})

font.getNewFontButton.addEventListener('click', (e)=>{ initNewFont() })
font.undoButton.addEventListener('click', (e)=>{ initNewFont(false, 'undo') })
font.redoButton.addEventListener('click', (e)=>{ initNewFont(false, 'redo') })
