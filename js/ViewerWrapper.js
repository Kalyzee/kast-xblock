function ViewerWrapper() {
    var listeners   = new KastListener();
    var _this       = this;
    var _elm        = null;
    
    var options = {
        id              : null,
        scale           : 1,
        page            : 1,
        num_pages       : null,
        canvas_height   : 400,
        canvas_width    : 500,
        file            : 'fixtures/openedx.pdf'
    };

    var construct = function () {
        _elm = $(".kast");
        var id = Math.random();
        _elm.find('canvas').attr('id', 'kast-' + id);
        options.id = 'kast-' + id;
        
        _this.refreshToolbar();
        _this.render();
    };

    this.refreshToolbar = function(){
        var btnZoomIn   = $('<li/>').addClass("mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect").html('<i class="material-icons fa fa-search-plus"></i>').on("click", function(){
            _this.zoomIn();
        }).attr("id", Math.random());
        var btnZoomInTooltip = $('<li/>').addClass("mdl-tooltip").html("Zoom In").attr("for", btnZoomIn.attr('id'));
        
        var btnZoomOut  = $('<li/>').addClass("mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect").html('<i class="material-icons fa fa-search-minus"></i>').on("click", function(){
            _this.zoomOut();
        }).attr("id", Math.random());        
        var btnZoomOutTooltip = $('<li/>').addClass("mdl-tooltip").html("Zoom out").attr("for", btnZoomOut.attr('id'));

        var btnPageNext = $('<li/>').addClass("mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect").html('<i class="material-icons fa fa-forward"></i>').on("click", function(){
            _this.nextPage();
        }).attr("id", Math.random());
        var btnPageNextTooltip = $('<li/>').addClass("mdl-tooltip").html("Next page").attr("for", btnPageNext.attr('id'));

        var btnPagePrev = $('<li/>').addClass("mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect").html('<i class="material-icons fa fa-backward"></i>').on("click", function(){
            _this.prevPage();
        }).attr("id", Math.random());
        var btnPagePrevTooltip = $('<li/>').addClass("mdl-tooltip").html("Previous page").attr("for", btnPagePrev.attr('id'));
        
        var ul_content  = $('<ul/>')
                .append(btnPagePrev)
                .append(btnPagePrevTooltip)
                .append(btnPageNext)
                .append(btnPageNextTooltip)
                .append(btnZoomIn)
                .append(btnZoomInTooltip)
                .append(btnZoomOut)
                .append(btnZoomOutTooltip);
        _elm.find('.kast-viewer-toolbar').append(ul_content);
    };
    
    this.nextPage = function(){
        if(options.page < options.num_pages){
            options.page = options.page+1;
            firePageNext();
            firePageChange();
            _this.render();
        }
    };

    this.setPage = function(page){
        if(page <= options.num_pages && page >= 1){
            options.page = page;
            firePageChange();
            _this.render();
        }
    };

    this.prevPage = function(){
        if(options.page > 1){
            options.page = options.page-1;
            firePagePrev();
            firePageChange();
            _this.render();
        }
    };
    this.zoomIn = function(){
        options.scale = options.scale+.1;
        fireZoomIn();
        _this.render();
    };
    this.zoomOut = function(){
        options.scale = options.scale-.1;
        fireZoomOut();
        _this.render();
    };
    
    
    this.render = function () {
        PDFJS.getDocument(options.file).then(function (pdf) {
            // Using promise to fetch the page
            pdf.getPage(options.page).then(function (page) {
                var scale           = options.scale;
                options.num_pages   = pdf.numPages;
                
                var viewport    = page.getViewport(scale);
                //
                // Prepare canvas using PDF page dimensions
                //
                var canvas      = document.getElementById(options.id);
                var context     = canvas.getContext('2d');
                canvas.height   = options.canvas_height;
                canvas.width    = options.canvas_width;
                //
                // Render PDF page into canvas context
                //
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        });
    };

    var fireZoomIn = function () {
        listeners.fireListeners("onZoomIn", function (callback) {
            callback(options.scale);
        });
    };
    this.onZoomIn = function (callback) {
        listeners.addlisteners("onZoomIn", callback);
    };
    var fireZoomOut = function () {
        listeners.fireListeners("onZoomOut", function (callback) {
            callback(options.scale);
        });
    };
    this.onZoomOut = function (callback) {
        listeners.addlisteners("onZoomOut", callback);
    };
    var firePageNext = function () {
        listeners.fireListeners("onPageNext", function (callback) {
            callback(options.page);
        });
    };
    this.onPageNext = function (callback) {
        listeners.addlisteners("onPageNext", callback);
    };

    var firePageChange = function () {
        listeners.fireListeners("onPageChange", function (callback) {
            callback(options.page);
        });
    };
    this.onPageChange = function (callback) {
        listeners.addlisteners("onPageChange", callback);
    };


    var firePagePrev = function () {
        listeners.fireListeners("onPagePrev", function (callback) {
            callback(options.page);
        });
    };
    this.onPagePrev = function (callback) {
        listeners.addlisteners("onPagePrev", callback);
    };

    construct();
}