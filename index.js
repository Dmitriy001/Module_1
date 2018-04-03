'use strict';

(function () {
    function Timer() {
        // Timer.prototype.increment = this.increment.bind(this);
        // Timer.prototype.stoping = this.stoping.bind(this);
        // Timer.prototype.decrement = this.decrement.bind(this);
        // Timer.prototype.increasingValue = this.increasingValue.bind(this);
        this.test = 'creating div-element';
        this.timerid = null;
    }

    Timer.prototype.renderTo = function (container) {
        this.elem = container.appendChild(this.creatingElement('div', 'classDiv'));
        this.elem.appendChild(this.creatingElement('input', 'text'));
        this.elem.appendChild(this.creatingElement('input', 'inc', 'increment', 'button'));
        this.elem.appendChild(this.creatingElement('input', 'dec', 'decrement', 'button'));
        this.elem.appendChild(this.creatingElement('span', 'num', undefined, undefined, '0'));
        this.elem.appendChild(this.creatingElement('input', 'stop', 'stop', 'button'));

        var self = this;
        this.elem.querySelector('.inc').addEventListener('click', function(e){
            self.increment();
        });
        this.elem.querySelector('.dec').addEventListener('click', function(e){
            self.decrement();
        });
        this.elem.querySelector('.stop').addEventListener('click', function(e){
            self.stoping();
        });
    };

    Timer.prototype.stoping = function () {
        clearInterval(this.timerid);
        this.elem.querySelector('.text').readOnly = false;
        this.elem.querySelector('.dec').disabled = false;
    };

    Timer.prototype.creatingElement = function (nameElem, className, value, type, text, id) {
        var elem = document.createElement(nameElem);
        elem.className = className;
        elem.type = type || elem.type;
        elem.value = value || elem.value;
        elem.innerText = text || elem.innerText;
        if (id) (elem.id = id);
        return elem;
    };

    Timer.prototype.increment = function () {
        var input = this.elem.querySelector('.text');
        var numElem = this.elem.querySelector('.num');
        if (!input.value) {
            alert('введите целое не нулевое число и нажмите enter');
            return;
        }

        input.readOnly = true;
        this.elem.querySelector('.dec').disabled = true;

        numElem.innerText = parseInt(input.value) + parseInt(numElem.innerText);
        if (this.timerid) {
            return;
        }
        var self = this;
        this.timerid = setInterval(function(){self.increasingValue();}, 1000);
    };


    Timer.prototype.decrement = function () {
        var numElem = this.elem.querySelector('.num');
        var value = parseInt(this.elem.querySelector('.text').value);
        if (!value) {
            alert('введите целое не нулевое число и нажмите enter');
            return;
        }
        numElem.innerText = parseInt(numElem.innerText) - value;
    };

    Timer.prototype.increasingValue = function () {
        var value = parseInt(this.elem.querySelector('.text').value);
        var numElem = this.elem.querySelector('.num');
        numElem.innerText = parseInt(numElem.innerText) * value;
    };
    window.Timer = Timer;
})();





var timer1 = new Timer();
timer1.renderTo(document.body);

var timer2 = new Timer();
timer2.renderTo(document.body);

