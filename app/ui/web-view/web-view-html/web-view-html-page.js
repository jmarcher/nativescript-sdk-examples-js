// >> web-view-src-local-file
let Observable = require("tns-core-modules/data/observable").Observable;
let webViewModule = require("tns-core-modules/ui/web-view");
function onNavigatingTo(args) {
    let page = args.object;
    let vm = new Observable();
    // loading the WebView source while providing a HTML code
    vm.set("firstWebViewSRC", '<!DOCTYPE html><html><head><title>MyTitle</title><meta charset="utf-8" /></head><body><span style="color:#0099CC; text-align: center;">First WebView</span></body></html>');
    vm.set("resultFirstWebView", "");
    // loading the WebView source from a local file
    vm.set("secondWebViewSRC", "~/ui/web-view/web-view-html/test.html");
    vm.set("resultSecondWebView", "");
    page.bindingContext = vm;
}

function onFirstWebViewLoaded(webargs){
    let page = webargs.object.page;
    let vm = page.bindingContext;
    let webview = webargs.object;
    vm.set("resultFirstWebView", "First WebView is still loading...");
    // handling WebView load finish event
    webview.on(webViewModule.WebView.loadFinishedEvent, (args) => {
        let message;
        if (!args.error) {
            message = "First WebView finished loading of " + args.url;
        } else {
            message = "Error loading first WebView" + args.url + ": " + args.error;
        }

        vm.set("resultFirstWebView", message);
        console.log("First WebView message - " + message);
    });
}

function onSecondWebViewLoaded(webargs){
    let page = webargs.object.page;
    let vm = page.bindingContext;
    let webview = webargs.object;
    vm.set("resultSecondWebView", "Second WebView is still loading...");

    webview.on(webViewModule.WebView.loadFinishedEvent, (args) => {
        let message;
        if (!args.error) {
            message = "Second WebView finished loading of " + args.url;
        } else {
            message = "Error loading second WebView" + args.url + ": " + args.error;
        }

        vm.set("resultSecondWebView", message);
        console.log("Second WebView message - " + message);
    });
}


exports.onNavigatingTo = onNavigatingTo;
exports.onFirstWebViewLoaded = onFirstWebViewLoaded;
exports.onSecondWebViewLoaded = onSecondWebViewLoaded;
// << web-view-src-local-file