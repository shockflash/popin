
/**
 * Holds the instance of popin. We use popin as singleton, but implented
 * the singleton handling in a factory function (popin). This seems more
 * fitting to javascript.
 */
var popinInstance = null;

/**
 * returns an instance of popin. An optional url can be given, this url will be
 * opened with the "open" call in popin.
 */
function popin(url) {
    if (popinInstance == null) {
        popinInstance = new popinCls();
    }

    /* if an open is given, we open the url in popin. This is a shortcut for the
       most often used call */
    if (url != null)
        popinInstance.open(url)

    return popinInstance;
}

/**
 * The Popin class itself.
 */
function popinCls() {
    this.element;
    this.fade;

    this.useFade = true;

    this.init = function() {
        this.element = jQuery('<div class="popin_main"></div>')
        jQuery('body').append(this.element);

        this.fade = jQuery('<div class="popin_fade"></div>')
        jQuery('body').append(this.fade);
    }

    this.setUseFade = function(value) {
        this.useFade = value;
    }

    this.getElement = function() {
        return this.element;
    }

    this.getFade = function() {
        return this.fade;
    }

    this.show = function() {
        this.element.show();

        if (this.useFade)
            this.fade.show();
    }

    this.hide = function() {
        this.element.hide();

        if (this.useFade)
            this.fade.hide();
    }

    this.open = function(url) {
        this.load(url);
        this.show();
    }

    this.load = function(url) {
        var self = this;
        $.get(url, function(data) {
            if (data.action == 'redirect')
            {
                self.load(data.content);
                return;
            }
            self.setContent(data.content);
        });
    }

    this.setContent = function(content) {
        this.element.html(content);
    }

    this.height = function(value) {
        this.element.height(value);
        this.center();
    }

    this.width = function(value) {
        this.element.width(value);
        this.center();
    }

    this.center = function() {
        this.element.css("top", (($(window).height() - this.element.outerHeight()) / 2) + $(window).scrollTop() + "px");
        this.element.css("left", (($(window).width() - this.element.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    }

    this.size = function(width, height) {
        this.width(width);
        this.height(height);
    }

    /* call init */
    this.init();
}
