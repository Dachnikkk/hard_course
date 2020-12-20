window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let body = document.querySelector('body');

    const DomElement = function(selector, height, width, bg, position) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.position = position;
    }

    DomElement.prototype.newElement = function() {
        let div = document.createElement('div');
        let newId = this.selector.slice(1);
        div.setAttribute('id', newId);
        div.style.height = this.height;
        div.style.width = this.width;
        div.style.background = this.bg;
        div.style.position = this.position;

        body.append(div);
    };
    const domElementId = new DomElement('#block', '100px', '100px', 'green', 'absolute');
    domElementId.newElement();
    
    const elem = document.querySelector('#block');
    let countTopBottom = 0,
        countLeftRight = 0;

    document.addEventListener('keydown', function(event) {
        if(event.key === 'ArrowRight') {
            countLeftRight += 10;
            elem.style.left = countLeftRight + 'px';
        }else if(event.key === 'ArrowLeft') {
            countLeftRight -= 10;
            elem.style.left = countLeftRight + 'px';
        }else if(event.key === 'ArrowDown') {
            countTopBottom += 10;
            elem.style.top = countTopBottom + 'px';
        }else if(event.key === 'ArrowUp') {
            countTopBottom -= 10;
            elem.style.top = countTopBottom + 'px';
        }
    });
});