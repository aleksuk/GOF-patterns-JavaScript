function inherit(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.super = Parent;
}

var AbstractMediator = (function () {
    
    function AbstractMediator() {
        this.collegues = {};
        return this;
    }
    
    AbstractMediator.prototype.send = function (message, collegue) {};
    
    return AbstractMediator;
    
} ());

var ConcreteMediator = (function (AbstractMediator) {
    
    function ConcreteMediator() {
        AbstractMediator.apply(this, arguments);
        return this;
    }
    
    inherit(AbstractMediator, ConcreteMediator);
    
    ConcreteMediator.prototype.send = function (message, collegue) {
        var collegueName,
            collegue_;
        
        for (collegueName in this.collegues) {
            collegue_ = this.collegues[collegueName];
            
            if (collegue_ !== collegue) {
                collegue.notify(message);
            }
        }
    };
    
    ConcreteMediator.prototype.setCollegue1 = function (collegue1) {
        this.collegues.collegue = collegue1;
    };
    
    ConcreteMediator.prototype.setCollegue2 = function (collegue2) {
        this.collegues.collegue2 = collegue2;
    };
    
    return ConcreteMediator;
    
} (AbstractMediator));

var AbstractCollegue = (function () {
    
    function AbstractCollegue(mediator) {
        this.mediator = mediator;
        return this;
    }
    
    AbstractCollegue.prototype.send = function (message) {};
    AbstractCollegue.prototype.notify = function (message) {};
       
    return AbstractCollegue;
    
} ());

var ConcreteCollegue1 = (function (AbstractCollegue) {
    
    function ConcreteCollegue1(mediator) {
        AbstractCollegue.apply(this, arguments);
        
        return this;
    }
    
    inherit(AbstractCollegue, ConcreteCollegue1);
    
    ConcreteCollegue1.prototype.send = function (message) {
        this.mediator.send(message, this);
    };
    
    ConcreteCollegue1.prototype.notify = function (message) {
        console.log(message, ': Collegue1 is notified');
    };
    
    return ConcreteCollegue1;
    
} (AbstractCollegue));

var ConcreteCollegue2 = (function (AbstractCollegue) {
    
    function ConcreteCollegue2(mediator) {
        AbstractCollegue.apply(this, arguments);
        
        return this;
    }
    
    inherit(AbstractCollegue, ConcreteCollegue2);
    
    ConcreteCollegue2.prototype.send = function (message) {
        this.mediator.send(message, this);
    };
    
    ConcreteCollegue2.prototype.notify = function (message) {
        console.log(message, ': Collegue2 is notified');
    };
    
    return ConcreteCollegue2;
    
} (AbstractCollegue));

var mediator = new ConcreteMediator();
var collegue1 = new ConcreteCollegue1(mediator);
var collegue2 = new ConcreteCollegue2(mediator);

mediator.setCollegue1(collegue1);
mediator.setCollegue2(collegue2);

collegue1.send('collegue1_event');
collegue2.send('collegue2_event');