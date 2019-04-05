export default class Font {
    constructor(){
        this.text = document.querySelector('#text');
        this.cpanel = document.querySelector('#cpanel');
        this.textInput = document.querySelector('#text-input');
        this.sizeInput = document.querySelector('#size-input');
        this.letterSpacingInput = document.querySelector('#space-input');
        this.categoriesInput = document.querySelectorAll('.category');
        this.wrapper = document.querySelector('#wrapper');
        this.toastBox = document.querySelector('#toast')
        this.caseOptions = document.querySelectorAll('.case');
        this.colourScheme = document.querySelectorAll('.colourscheme');
        this.getNewFontButton = document.querySelector('#new');
        this.undoButton = document.querySelector('#undo');
        this.redoButton = document.querySelector('#redo');
    }

    getFontList(){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    resolve(JSON.parse(xhr.responseText))
                }else if(xhr.status != 200 && xhr.readyState == 4){
                    reject(xhr.responseText);
                }
            }
            xhr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAZPt82j4_tyfPLEeWYVp14aXp5SM1-PME", true);
            xhr.send();
        })
    }

    init(json){
        return new Promise((resolve)=>{
            this.jsonData = json.items;
            var link = document.createElement('link');
            link.id = 'googleFont';
            link.rel = 'stylesheet';
            link.type = "text/css";
            link.href = "#";
            document.getElementsByTagName('head')[0].appendChild(link);
            resolve();
        })
    }

    getFilteredList(){
        return this.filteredList;
    }

    setFilteredList(categories){
        this.filteredList = this.jsonData.filter((i)=>{
            return categories.includes(i.category)
        });
    }

    getFamily(){
        return this.family;
    }

    setFamily(name){
        this.family = name;
    }

    getCategory(){
        return this.category
    }

    setCategory(name){
        this.category = name;
    }

    get(){
        return {
            'family' : this.family,
            'category' : this.category
        }
    }

    set(font){
        this.setFamily(font.family);
        this.setCategory(font.category);
    }

    getText(){
        return this.text.textContent;
    }
    
    setText(text){
        this.text.textContent = text;
    }
    
    getSelectedCategories(){
        var array = Array.from(document.querySelectorAll('.category'));
        array = array.filter((i)=>{
            return i.checked === true;
        })
    
        array = array.map((i)=>{
            return i.id;
        })
        return array;
    }
    
    getRandomFont(filteredList){
        return filteredList[Math.floor(Math.random() * filteredList.length)]
    }
    
    setLink(font){
        var link = document.querySelector('#googleFont');
        link.href = `https://fonts.googleapis.com/css?family=${ font.family }`;
    }
    
    setInlineStyle(font){
        this.text.style.fontFamily = font.family;
    }

    getToast(){
        return this.toastText;
    }

    setToast(text){
        this.toastText = text;
    }

    toast(){
        this.toastBox.textContent = this.toastText;
        this.toastBox.classList.remove('hide-and-slide-up');
        window.clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.toastBox.classList.add('hide-and-slide-up');
        }, 4000);
    }

    reveal(element){
        element.classList.remove('hide');
    }

    hide(element){
        element.classList.add('hide');
    }

    getSpace(element){
        return parseInt(/-?\d*/g.exec(element.style.letterSpacing).join());
    }

    setSpace(element, value, abs=false){
        if(abs){
            element.style.letterSpacing = `${value}px`
        }else{
            element.style.letterSpacing = `${this.getSpace(element) + value}px`
        }
        this.letterSpacingInput.value = this.getSpace(element);
    }

    getSize(element){
        return parseInt(/\d*/g.exec(element.style.fontSize).join());
    }

    setSize(element, value, abs=false){
        if(abs){
            element.style.fontSize = `${value}px`;
        }else{
            element.style.fontSize = `${this.getSize(element) + value}px`;
        }
        this.sizeInput.value = this.getSize(element);
    }

    resetValues(element, start=false){
        if(start){
            this.setSize(element, 100, true);
        }
        this.setSpace(element, 0, true);
    }

    getCase(element){
        return element.style.textTransform;
    }

    setCase(element, value){
        document.querySelector(`#${value}`).checked = true;
        element.style.textTransform = value;
    }

    toggleUpper(element){
        if(this.getCase(element) === 'uppercase'){
            this.setCase(element, 'none')
        }else{
            this.setCase(element, 'uppercase')
        }
    }

    toggleLower(element){
        if(this.getCase(element) === 'lowercase'){
            this.setCase(element, 'none')
        }else{
            this.setCase(element, 'lowercase')
        }
    }

    toggleCPanel(){
        this.cpanel.classList.toggle('hide');
        if(this.cpanel.classList.contains('hide')){
            document.activeElement.blur();
        }
    }

    setColourScheme(element, on){
        if(on){
            element.classList.add('black-on-white');
            document.querySelector('#bow').checked = true;
        }else{
            element.classList.remove('black-on-white');
            document.querySelector('#wob').checked = true;
        }
    }

    toggleWhiteOnBlack(){
        var isOff = this.wrapper.classList.contains('black-on-white');
        this.setColourScheme(this.wrapper, !isOff);
        this.setColourScheme(this.toastBox, !isOff);
    }
}