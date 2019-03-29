const app = document.querySelector('#wrapper');
const gradientText = document.querySelector('#current-gradient');
var hiddenBg = document.querySelector('.hide-bg');
var currentBg = document.querySelector('.show-bg');
var direction = 'to right';

document.addEventListener('keyup', (e)=>{
    if(e.key == '1'){
        updateDirection('to top');
    }
    if(e.key == '2'){
        updateDirection('to right');
    }
    if(e.key == '3'){
        updateDirection('to bottom');
    }
    if(e.key == '4'){
        updateDirection('to left');
    }
    if(e.key == '5'){
        updateDirection('to top right');
    }
    if(e.key == '6'){
        updateDirection('to bottom right');
    }
    if(e.key == '7'){
        updateDirection('to bottom left');
    }
    if(e.key == '8'){
        updateDirection('to top left');
    }

    if(e.code == 'Space'){
        hiddenBg = document.querySelector('.hide-bg');
        currentBg = document.querySelector('.show-bg');
        setGradient([currentBg, hiddenBg]);
    }

    if(e.code == 'KeyC'){
        const copyElement = document.createElement('textarea');
        copyElement.value = gradientText.textContent;
        document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        document.body.removeChild(copyElement);
        alert('Copied CSS to clipboard!');
    }

    if(e.code == 'KeyI'){
        document.querySelector('#instructions').classList.toggle('hide');
    }

    if(e.code == 'KeyH'){
        document.querySelector('#content').classList.toggle('hide');
    }

    if(e.code == 'KeyT'){
        document.body.classList.toggle('white-text');
    }

    if(e.code == 'KeyS'){
        var regex = /rgb\(.*?\)/g
        var currentGradient = gradientText.textContent;
        var rgbValues = currentGradient.match(regex);
        var newGradient = `linear-gradient(${direction}, ${rgbValues[1]}, ${rgbValues[0]})`;
        hiddenBg.style.background = newGradient;
        gradientText.textContent = newGradient;
    }
})

function setGradient(bgs){
    var gradient = `linear-gradient(${direction}, rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()}), rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()}))`;

    bgs[1].style.background = gradient;
    gradientText.textContent = gradient;

    bgs.forEach(element => {
        element.classList.toggle('hide-bg');
        element.classList.toggle('show-bg');
    });
}

function updateDirection(newDirection){
    var regex = /to(?:(?!,).)*/
    var currentGradient = gradientText.textContent;
    var newGradient = currentGradient.replace(regex, `${newDirection}`);
    direction = newDirection;
    hiddenBg.style.background = newGradient;
    gradientText.textContent = newGradient;
}

function getRandomNum(){
    return Math.floor(Math.random() * 256);
}

window.onload = ()=>{
    setGradient([currentBg, hiddenBg]);
    document.body.style.opacity = 1;
}