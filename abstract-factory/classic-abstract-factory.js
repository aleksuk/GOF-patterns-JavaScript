function inherit(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.super = Parent;
}

// abstract product (IOS)
var IOSWidget = (function () {
    
    function IOSWidget() {
        this.platform = 'IOS';
        return this;
    }
    
    IOSWidget.prototype.getPlatform = function () {
        console.log(this.platform);
        return this.platform;
    };
    
    IOSWidget.prototype.getType = function () {
        console.log(this.type);
        return this.type;
    };
    
    return IOSWidget;
    
} ());

// concrete product (IOS) - scrollbar
var IOSScrollBar = (function (IOSWidget) {
    
    function IOSScrollBar() {
        IOSWidget.apply(this, arguments);
        this.type = 'scrollbar';
    }
    
    inherit(IOSWidget, IOSScrollBar);
    
    IOSScrollBar.prototype.scroll = function () {
        console.log('scroll');
    };
    
    return IOSScrollBar;
    
} (IOSWidget));

// concrete product (IOS) - button
var IOSButton = (function (IOSWidget) {
    
    function IOSButton() {
        IOSWidget.apply(this, arguments);
        this.type = 'button';
    }
    
    inherit(IOSWidget, IOSButton);
    
    IOSButton.prototype.click = function () {
        console.log('click');
    };
    
    return IOSButton;
    
} (IOSWidget));

// abstract product (android)
var AndroidWidget = (function () {
    
    function AndroidWidget() {
        this.platform = 'android';
        return this;
    }
    
    AndroidWidget.prototype.getPlatform = function () {
        console.log(this.platform);
        return this.platform;
    };
    
    AndroidWidget.prototype.getType = function () {
        console.log(this.type);
        return this.type;
    };
    
    return AndroidWidget;
    
} ());

// concrete product (android) - scrollbar
var AndroidScrollBar = (function (AndroidWidget) {
    
    function AndroidScrollBar() {
        AndroidWidget.apply(this, arguments);
        this.type = 'scrollbar';
        
        return this;
    }
    
    inherit(AndroidWidget, AndroidScrollBar);
    
    AndroidScrollBar.prototype.scroll = function () {
        console.log('scroll');
    };
    
    return AndroidScrollBar;
    
} (AndroidWidget));

// concrete product (android) - button
var AndroidButton = (function (AndroidWidget) {
    
    function AndroidButton() {
        AndroidWidget.apply(this, arguments);
        this.type = 'button';
        
        return this;
    }
    
    inherit(AndroidWidget, AndroidButton);
    
    AndroidButton.prototype.click = function () {
        console.log('click');
    };
    
    return AndroidButton;
    
} (AndroidWidget));

// abstract factory
var WidgetFactory = (function () {
    
    function WidgetFactory() {
        return this;
    }
    
    WidgetFactory.prototype = {
        
        createScrollBar: function () {},
        
        createButton: function () {}
        
    };
    
    return WidgetFactory;
    
} ());

// concrete factory (ios)
var IOSWidgetFactory = (function (WidgetFactory) {
    
    function IOSWidgetFactory() {
        WidgetFactory.apply(this, arguments);
    }
    
    inherit(WidgetFactory, IOSWidgetFactory);
    
    IOSWidgetFactory.prototype.createScrollBar = function () {
        return new IOSScrollBar();
    };
    
    IOSWidgetFactory.prototype.createButton = function () {
        return new IOSButton();
    };
    
    return IOSWidgetFactory;
    
} (WidgetFactory));

// concrete factory (android)
var AndroidWidgetFactory = (function (WidgetFactory) {
    
    function AndroidWidgetFactory() {
        WidgetFactory.apply(this, arguments);
    }
    
    inherit(WidgetFactory, AndroidWidgetFactory);
    
    AndroidWidgetFactory.prototype.createScrollBar = function () {
        return new AndroidScrollBar();
    };
    
    AndroidWidgetFactory.prototype.createButton = function () {
        return new AndroidButton();
    };
    
    return AndroidWidgetFactory;
    
} (WidgetFactory));

var iosWidgetFactory = new IOSWidgetFactory();
var androidWidgetFactory = new AndroidWidgetFactory();

var androidButton = androidWidgetFactory.createButton();

androidButton.getPlatform();
androidButton.getType();
androidButton.click();

var androidScroll = androidWidgetFactory.createScrollBar();

androidScroll.getPlatform();
androidScroll.getType();
androidScroll.scroll();

var iosButton = iosWidgetFactory.createButton();

iosButton.getPlatform();
iosButton.getType();
iosButton.click();

var iosScrollbar = iosWidgetFactory.createScrollBar();

iosScrollbar.getPlatform();
iosScrollbar.getType();
iosScrollbar.scroll();