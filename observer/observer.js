function inherit(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.super = Parent;
}

var Subject = (function () {

    function Subject() {
        this.observers = {};
        return this;
    }

    Subject.prototype = {
        
        subscribe: function (event, observer) {
            this.observers[event] = this.observers[event] || [];

            this.observers[event].push(observer);
        },

        unsubscribe: function (event, observer) {
            var observerIndex;
            
            if (!event) {
                this.observers = {};
            } else if (event && !observer) {
                this.observers[event] = [];
            } else {
                observerIndex = this.observers[event].indexOf(observer);
                if (observerIndex > -1) {
                    this.observers[event].slice(observerIndex, 1);
                }
            }
        },

        publish: function (event, data) {
            this.observers[event] = this.observers[event] || [];

            this.observers[event].forEach(function (observer) {
                observer(data);
            });
        }
    }

    return Subject;
    
} ());

var ConcreteSubject = (function (Subject) {
    
    function ConcreteSubject() {
        Subject.apply(this, arguments);
        this.state = this;
        return this;
    }
    
    inherit(Subject, ConcreteSubject);
    
    ConcreteSubject.prototype.set = function (prop, value) {
        if (!value &&Object.prototype.toString.call(prop) === '[object Object]') {
            this.state = prop;
        } else {
            this.state[prop] = value;
            this.publish('change:' + prop, value);
        }
        
        this.publish('change', this.state);
    };
    
    ConcreteSubject.prototype.get = function (prop) {
        var result;
        
        if (prop) {
            result = this.state('prop');
        } else {
            result = this.state;
        }
        
        return result;
    };
    
    return ConcreteSubject;
    
} (Subject));

var SomeObserver = (function () {
    
    function SomeObserver(observer) {
        observer.subscribe('change', function (data) {
            console.log(data);
        });
        
        observer.subscribe('change:test', function (data) {
            console.log('change:test = ', data); 
        });
    }
    
    return SomeObserver;
    
} ());

var concreteSubject = new ConcreteSubject();
var someObserver = new SomeObserver(concreteSubject);

concreteSubject.set('test', true);