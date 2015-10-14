function ViewerWrapper() {
    var listeners = new KastListener();

    var options = {
        id              : null,
        scale           : 1,
        page            : 1,
        canvas_height   : 400,
        canvas_width    : 500,
        file            : 'fixtures/openedx.pdf'
    };

    var construct = function () {
        var id = Math.random();
        $('.kast-viewer').attr('id', 'kast-' + id);
        options.id = 'kast-' + id;
        render();
    };

    var render = function () {
        PDFJS.getDocument(options.file).then(function (pdf) {
            // Using promise to fetch the page
            pdf.getPage(options.page).then(function (page) {
                var scale       = options.scale;
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