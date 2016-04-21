// classic mediator
function inherit(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.super = Parent;
}

var AbstractMediator = (function () {
    
    function AbstractMediator() {
        this.collegues = [];
        return this;
    }
    
    AbstractMediator.prototype.send = function (message, event, collegue) {};
    
    AbstractMediator.prototype = {
        
        send: function (message, event, collegue) {},
        
        register: function (collegue) {
            this.collegues.push(collegue);
        }
        
    };
    
    return AbstractMediator;
    
} ());

var ConcreteMediator = (function (AbstractMediator) {
    
    function ConcreteMediator() {
        AbstractMediator.apply(this, arguments);
        return this;
    }
    
    inherit(AbstractMediator, ConcreteMediator);
    
    ConcreteMediator.prototype.send = function (event, collegue) {       
        this.collegues.forEach(function (collegue_) {
            if (collegue_ !== collegue) {
                collegue_.notify(event);
            }
        });
    };
    
    return ConcreteMediator;
    
} (AbstractMediator));

var Event = (function () {
    
    function Event(name, data) {
        this.data = data;
        this.name = name;
        
        return this;
    }
    
    Event.prototype.getData = function () {
        return this.data;
    };
    
    return Event;
    
} ());

var AbstractCollegue = (function () {
    
    function AbstractCollegue(mediator) {
        this.mediator = mediator;
        return this;
    }
    
    AbstractCollegue.prototype.send = function (event) {};
    AbstractCollegue.prototype.notify = function (event) {};
       
    return AbstractCollegue;
    
} ());

var ConcreteCollegue1 = (function (AbstractCollegue) {
    
    function ConcreteCollegue1(mediator) {
        AbstractCollegue.apply(this, arguments);
        
        return this;
    }
    
    inherit(AbstractCollegue, ConcreteCollegue1);
    
    ConcreteCollegue1.prototype.send = function (event) {
        this.mediator.send(event, this);
    };
    
    ConcreteCollegue1.prototype.notify = function (event) {
        console.log(event.name, ': Collegue1 is notified');
        console.warn(event.getData());
    };
    
    return ConcreteCollegue1;
    
} (AbstractCollegue));

var ConcreteCollegue2 = (function (AbstractCollegue) {
    
    function ConcreteCollegue2(mediator) {
        AbstractCollegue.apply(this, arguments);
        
        return this;
    }
    
    inherit(AbstractCollegue, ConcreteCollegue2);
    
    ConcreteCollegue2.prototype.send = function (event) {
        this.mediator.send(event, this);
    };
    
    ConcreteCollegue2.prototype.notify = function (event) {
        console.log(event.name, ': Collegue2 is notified');
        console.warn(event.getData());
    };
    
    return ConcreteCollegue2;
    
} (AbstractCollegue));

var mediator = new ConcreteMediator();
var collegue1 = new ConcreteCollegue1(mediator);
var collegue2 = new ConcreteCollegue2(mediator);

mediator.register(collegue1);
mediator.register(collegue2);

collegue1.send(new Event('collegue1_event', { collegue1: true }));
collegue2.send(new Event('collegue2_event', { collegue2: false }));