document.addEventListener("DOMContentLoaded", function(){
    var els = document.getElementsByClassName("elements-container");
    var container = [];
    for(var i = 0; i < els.length; i++)
    {
        container[i] = new Container(els[i]);
        console.log(container[i]);
    }
})

class Container {
    constructor(el) {
        this.mainElement = el;
        this.mainHeight = this.mainElement.offsetHeight;
        this.contentElement = this.mainElement.firstElementChild;
        this.contentHeight = this.contentElement.offsetHeight;
        this.scrollbarElement = this.contentElement.firstElementChild;
        this.scrollbarHeight = this.mainElement.offsetHeight;
        this.scrollbarThumbElement = this.scrollbarElement.firstElementChild;
        this.scrollbarThumbHeight = this.mainHeight / this.contentHeight * this.mainHeight;
        this.moveThumb = false;
        this.startThumb = 0;
        this.startScroll = 0;

        this.init();
    }

    init()
    {
        this.setScrollbarHeight();
        this.setScrollbarThumbHeight();
        var that = this;
        this.mainElement.addEventListener("scroll", function(){
            that.setScrollbarTop();
            that.setScrollbarThumbTop();
        });
        this.scrollbarThumbElement.addEventListener("mousedown", function(ev){
            that.moveThumb = true;
            that.startThumb = ev.clientY;
            that.startScroll = that.mainElement.scrollTop;
        });
        this.scrollbarThumbElement.addEventListener("mousemove", function(ev){
            if(that.moveThumb == true)
            {
                that.scrollWithThumb(ev);
            }
        });
        this.scrollbarThumbElement.addEventListener("mouseup", function(){
            that.moveThumb = false;
        });
        this.scrollbarThumbElement.addEventListener("mouseout", function(){
            that.moveThumb = false;
        });
    }    

    setScrollbarHeight()
    {
        this.scrollbarElement.style.height = this.scrollbarHeight + "px";
    }

    setScrollbarTop()
    {
        this.scrollbarElement.style.top = this.mainElement.scrollTop + "px";
    }

    setScrollbarThumbHeight()
    {
        this.scrollbarThumbElement.style.height = this.scrollbarThumbHeight + "px";
    }

    setScrollbarThumbTop()
    {
        this.scrollbarThumbElement.style.top = this.mainElement.scrollTop / this.contentHeight * this.scrollbarHeight;
    }

    scrollWithThumb(ev)
    {
        var moveY = (ev.clientY - this.startThumb) / (this.scrollbarHeight - this.scrollbarThumbHeight) * (this.contentHeight - this.mainHeight);
        this.mainElement.scrollTop = this.startScroll + moveY;
        console.log(ev);
        console.log(ev.clientY);
        console.log(this.startThumb);
        console.log(this.scrollbarHeight);
        console.log(this.scrollbarThumbHeight);
        console.log(moveY);
        console.log(this.mainElement.scrollTop);
    }
}