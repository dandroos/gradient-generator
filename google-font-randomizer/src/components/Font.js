export default class Font {
    constructor(){
        this.cpanel = document.querySelector('#cpanel');
        this.textInput = document.querySelector('#text-input');
        this.sizeInput = document.querySelector('#size-input');
        this.letterSpacingInput = document.querySelector('#space-input');
        this.categoriesInput = document.querySelectorAll('.category');
    }

    getFontList(){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    // this._init(JSON.parse(xhr.responseText));
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
        return new Promise((resolve, reject)=>{
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
        return document.querySelector('#text').textContent;
    }
    
    setText(text){
        document.querySelector('#text').textContent = text;
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
        document.querySelector('#text').style.fontFamily = font.family;
    }

    getToast(){
        return this.text;
    }

    setToast(text){
        this.text = text;
    }

    toast(){
        var toast = document.querySelector('#toast')
        toast.textContent = this.text;
        toast.classList.remove('hide-and-slide-up');
        window.clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            toast.classList.add('hide-and-slide-up');
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
        document.querySelector('#space-input').value = this.getSpace(element);
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
        document.querySelector('#size-input').value = this.getSize(element);
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
}