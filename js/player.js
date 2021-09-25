const browser = require('../puppeteer/Chrome');

document.querySelector('#search').addEventListener('click',()=>{
    video = document.querySelector('#videoToSearch').value;
    browser.then(elm=>{
        elm.get(video);
    })
})