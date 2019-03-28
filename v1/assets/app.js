const app = document.querySelector('#wrapper');
const gradientText = document.querySelector('#current-gradient');
var hiddenBg = document.querySelector('.hide-bg');
var currentBg = document.querySelector('.show-bg');

document.addEventListener('keyup', (e)=>{
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
})

function setGradient(bgs){
    var gradient = `radial-gradient(rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()}), rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()}))`;

    bgs[1].style.background = gradient;
    gradientText.textContent = gradient;

    bgs.forEach(element => {
        element.classList.toggle('hide-bg');
        element.classList.toggle('show-bg');
    });

}

function getRandomNum(){
    return Math.floor(Math.random() * 256);
}

window.onload = ()=>{
    setGradient([currentBg, hiddenBg]);
    document.body.style.opacity = 1;
}