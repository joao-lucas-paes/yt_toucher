const puppeteer = require('puppeteer');

class Chrome{
    constructor(){}
    init = async() =>{
        this.browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            ignoreDefaultArgs: [
                "--mute-audio",
            ],
            args: [
                "--start-fulscreen"
            ],
        });
        this.page = await this.browser.newPage();
        await this.page.setJavaScriptEnabled(true);
        setInterval(()=>
            this.page.click('button.ytp-ad-skip-button.ytp-button')
            .then(console.log("skipped"))
            .catch(err=>console.log("not skipped"))
        ,5000);
        return this;
      }
    get = async(video) =>{
        try{
            await this.page.goto(video);
            await this.page.click('video.video-stream.html5-main-video')
            var setT = setInterval(()=>{
                var boolean = false;
                this.page.click('.ytp-play-button').then(boolean = true).catch((err)=>boolean = false);
                if(boolean){
                    clearInterval(setT);
                }
            },1500)
        }
        catch(err){
            console.log(err)
        }
    }
}

let browser = new Chrome();
module.exports = browser.init();