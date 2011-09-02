
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
    this.loadingHtml = '';

    this.useFade = true;

    this.init = function() {
        this.element = jQuery('<div class="popin_main"></div>')
        jQuery('body').append(this.element);

        this.fade = jQuery('<div class="popin_fade"></div>')
        jQuery('body').append(this.fade);
    }

    this.setLoadingHtml = function(html) {
        this.loadingHtml = html;
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

    this.clear = function() {
        this.setContent('');
    }

    this.open = function(url) {
        this.clear();
        this.load(url);
        this.show();
    }

    this.showLoading = function() {
        var d = jQuery('<div class="popin_loadinglayer"></div>');
        d.html(this.loadingHtml);
        this.element.append(d);
    }

    this.load = function(url) {
        var self = this;

        this.showLoading();

        jQuery.get(url, function(data) {
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
        this.center();
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
        this.element.css("top", ((jQuery(window).height() - this.element.outerHeight()) / 2) + jQuery(window).scrollTop() + "px");
        this.element.css("left", ((jQuery(window).width() - this.element.outerWidth()) / 2) + jQuery(window).scrollLeft() + "px");
    }

    this.dynamicSize = function() {
        this.element.removeAttr('width');
        this.element.removeAttr('height');
    }

    this.size = function(width, height) {
        this.width(width);
        this.height(height);
    }

    /* call init */
    this.init();
}
