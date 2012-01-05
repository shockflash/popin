
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

    this.heightScroll = false;
    this.widthScroll = false;

    this.init = function() {
        this.element = jQuery('<div class="popin_main"></div>')
        jQuery('body').append(this.element);

        this.fade = jQuery('<div class="popin_fade"></div>')
        jQuery('body').append(this.fade);

        var self = this;
        jQuery(window).resize(function() {
            self.sizeCheck();
            self.center();
        });
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
        this.element.css('overflow', 'none');
        this.dynamicSize();
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
        this.showLoading();

        var self = this;
        jQuery.get(url, function(data) {
            self._handle_result(data);
        })
        .error(function(data) {
            self._handle_error(data);
        })
    }

    this._handle_result = function(data) {
        if (data.action == 'redirect')
        {
            this.load(data.content);
            return;
        }
        this.setContent(data.content);
    }

    this._handle_error = function(data) {
        this.setContent('Error! (<a href="javascript: void(popin().hide());">Close popup</a>)<hr>' + data.responseText);
    }

    this.setContent = function(content) {
        this.element.html(content);
        this.sizeCheck();
        this.center();
    }

    this.height = function(value) {
        if (value)
        {
            this.element.height(value);
            this.sizeCheck();
            this.center();
        }

        return this.element.height();
    }

    this.width = function(value) {
        if (value)
        {
            this.element.width(value);
            this.sizeCheck();
            this.center();
        }
        return this.element.width();
    }

    /**
     * To ensure that the popin is never bigger then the browser window, we
     * do a size check on resize.
     * If the popin window is bigger then the screen, we made is a little bit
     * smaller and set this as the fixed height, even whem the popin window is
     * normally dynamic.
     */
    this.sizeCheck = function() {
        var overflowX = 'keep';
        var overflowY = 'keep';

        var recall = false; // true if we need to call sizeCheck again

        /* height check */
        if (jQuery(window).height() < (this.element.outerHeight() + 100))
        {
            /* mark that we changed to auto-height. And saved old value */
            if (!this.heightScroll)
            {
              this.heightScroll = true;

              if (!this.heightScrollPrev) // only the first init value is usefull
              {
                this.heightScrollPrev = this.element.outerHeight();
              }
            }

            var height = jQuery(window).height() - 100;
            if (height < 100) // min height
              height = 100;

            this.element.height(height);
            overflowY = 'auto';
        } else if (this.heightScroll) {
            /* if heightScroll active, but no longer true, reset it */
            this.heightScroll = false;

            if (overflowY == 'keep') // overwrite only if not needed as auto
              overflowY = 'reset';
            this.element.height(this.heightScrollPrev);

            recall = true;
        }

        /* width check */
        if (jQuery(window).width() < (this.element.outerWidth() + 100))
        {
            /* mark that we changed to auto-width. And saved old value */
            if (this.widthScroll)
            {
              this.widthScroll = true;

              if (!this.widthScrollPrev) // only the first init value is usefull
              {
                this.widthScrollPrev = this.element.outerWidth();
              }
            }
            var width = jQuery(window).width() - 100;
            if (width < 100) // min width
              width = 100;

            this.element.width(width);
            overflowX = 'auto';
        } else if (this.widthScroll) {
            /* if heightScroll active, but no longer true, reset it */
            this.widthScroll = false;

            if (overflowX == 'keep') // overwrite only if not needed as auto
              overflowX = 'reset';

            this.element.width(this.widthScrollPrev);

            recall = true;
        }

        if (overflowY == 'reset')
          this.element.css('overflow-y', 'visible');
        if (overflowY == 'auto')
          this.element.css('overflow-y', 'auto');

        if (overflowX == 'reset')
          this.element.css('overflow-x', 'visible');
        if (overflowX == 'auto')
          this.element.css('overflow-x', 'auto');

        /* check again to see if the restored height/width is ok, or not matching.
           Sometimes the restored height is better then the previous height/width,
           but still not perfect. Mainly a problem then the screen size increases,
           but still not big enough for the non-scrolled content */
        if (recall)
          this.sizeCheck();
    }

    this.center = function() {
        this.element.css("top", ((jQuery(window).height() - this.element.outerHeight()) / 2)  + "px");
        this.element.css("left", ((jQuery(window).width() - this.element.outerWidth()) / 2)  + "px");

        //this.element.css("top", ((jQuery(window).height() - this.element.outerHeight()) / 2) + jQuery(window).scrollTop() + "px");
        //this.element.css("left", ((jQuery(window).width() - this.element.outerWidth()) / 2) + jQuery(window).scrollLeft() + "px");
    }

    this.dynamicSize = function() {
        this.element.css('width', "auto");
        this.element.css('height', "auto");

        this.widthScroll = false;
        this.heightScroll = false;

        this.widthScrollPrev = null;
        this.heightScrollPrev = null;
    }

    this.size = function(width, height) {
        this.width(width);
        this.height(height);

        this.widthScrollPrev = height;
        this.heightScrollPrev = width;
    }

    /**
     * Handles the form submit, converts a normal form request to an special
     * ajax request. Current page keeps unchanged, but the answer needs to be
     * in popin-style
     */
    this.formSubmit = function(form) {
        form = jQuery(form)

        data = form.serialize();
        url = form.attr('action');

        var self = this;
        jQuery.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function(data) {
                self._handle_result(data);
            },
            error:  function(data) {
                self._handle_error(data);
            }
        });

        this.showLoading();

        return false; // prevent submit of the form
    }

    /* call init */
    this.init();
}
