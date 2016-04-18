// form GOF patterns
function inherit(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.super = Parent;
}

var Subject = (function () {

    function Subject() {
        this.observers = [];
        return this;
    }

    Subject.prototype = {
        
        attach: function (observer) {
            this.observers.push(observer);
        },

        detach: function (event, observer) {
            var observerIndex = this.observers[event].indexOf(observer);
            if (observerIndex > -1) {
                this.observers[event].slice(observerIndex, 1);
            }
        },

        notify: function (data) {
            this.observers.forEach(function (observer) {
                observer.update(data);
            });
        }
    };

    return Subject;
    
} ());

var ConcreteSubject = (function (Subject) {
    
    function ConcreteSubject() {
        Subject.apply(this, arguments);
        
        this.state = {};
        return this;
    }
    
    inherit(Subject, ConcreteSubject);
    
    ConcreteSubject.prototype.getState = function () {
        return this.state;
    };
    
    ConcreteSubject.prototype.setState = function (state) {
        this.state = state;
        
        this.notify();
    };
    
    return ConcreteSubject;
    
} (Subject));

var Observer = (function () {
    
    function Observer() {
        return this;
    }
    
    Observer.prototype.update = function (data) {};
    
    return Observer;
    
} ());

var ConcreteObserver = (function (Observer) {
    
    function ConcreteObserver(subject) {
        Observer.apply(this, arguments);
        this.subject = subject;
        this.observerState = subject.getState();
        subject.attach(this);
    }
    
    inherit(Observer, ConcreteObserver);
    
    ConcreteObserver.prototype.update = function () {
        this.observerState = this.subject.getState();
        console.log(this.observerState);
    };
    
    return ConcreteObserver;
    
} (Observer));

var concreteSubject = new ConcreteSubject();
var concreteObserver = new ConcreteObserver(concreteSubject);

concreteSubject.setState({ test: false });