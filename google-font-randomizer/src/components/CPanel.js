export default class CPanel{
    constructor(){
        this.panel = document.querySelector('#cpanel');
        this.text = document.querySelector('#text-input');
        this.size = document.querySelector('#size-input');
        this.letterSpacing = document.querySelector('#space-input');
        this.categories = document.querySelectorAll('.category');
    }

    togglePanel(){
        this.panel.classList.toggle('hide');
        if(this.panel.classList.contains('hide')){ document.activeElement.blur() }
    }
}