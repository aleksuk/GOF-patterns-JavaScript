function inherit(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.super = Parent;
}

var mediator = (function () {
    var subscribers = {};
    
    return {
        
        subscribe: function (event, callback) {
            subscribers[event] = subscribers[event] || [];
            subscribers[event].push(callback);
        },
        
        unsubscribe: function (event, callback) {
            var subscriberIndex;

            if (!event) {
                subscribers = {};
            } else if (event && !callback) {
                subscribers[event] = [];
            } else {
                subscriberIndex = subscribers[event].indexOf(callback);
                if (subscriberIndex > -1) {
                    subscribers[event].splice(subscriberIndex, 1);
                }
            }
        },
        
        publish: function (event, data) {
            if (subscribers[event]) {
                subscribers[event].forEach(function (callback) {
                    callback(data);
                });
            }
        }
    };
    
} ());

var Widget = (function () {
    
    function Widget(mediator) {
        this.mediator = mediator;
        return this;
    }
    
    Widget.prototype.notify = function (event, data) {};
    
    return Widget;
    
} ());

var ModalWindow = (function (Widget) {
    
    function ModalWindow(mediator) {
        Widget.apply(this, arguments);
        return this;
    }
    
    inherit(ModalWindow, Widget);
    
    ModalWindow.prototype.notify = function (event, data) {
        this.mediator.publish('modal:' + event, data);
    };
    
    return ModalWindow;
    
} (Widget));

var ListOfItems = (function (Widget) {
    
    function ListOfItems(mediator) {
        Widget.apply(this, arguments);
        
        this.mediator.subscribe('modal:change', function (data) {
            console.log('modal:change with data ', data);
        });
        
        return this;
    }
    
    inherit(ListOfItems, Widget);
    
    ListOfItems.prototype.notify = function (event, data) {
        this.mediator.publish('list-of-items:' + event, data);
    };
    
    return ListOfItems;
    
} (Widget));

var modalWindow = new ModalWindow(mediator);
var listOfItems = new ListOfItems(mediator);

modalWindow.notify('change', { test: true });