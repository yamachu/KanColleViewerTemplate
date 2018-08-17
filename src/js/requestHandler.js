'use strict';

const { Subject } = require('rxjs');

function initializeHandling() {
    let content = window.game.Content;

    try {
        content.debugger.attach('1.2');
    } catch (err) {
        console.error('Debugger attach failed : ', err);
    };

    content.debugger.on('detach', (event, reason) => {
        console.error('Debugger detached due to : ', reason);
    });

    content.debugger.on('message', (event, method, params) => {
        if (method === 'Network.responseReceived') {
            if (params.response.mimeType === 'text/plain' && /^http:\/\/.*\/kcsapi\/.+$/.test(params.response.url)) {
                content.debugger.sendCommand(
                    'Network.getResponseBody',
                    { 'requestId': params.requestId },
                    (e, r) => {
                        window.game.jsonResponse.next({
                            URL: params.response.url,
                            Body: r.body
                        });
                    }
                );
            }
        } else if(method === 'Network.requestWillBeSent') {
            // リクエスト欲しい時あったっけ…
        }
    });

    content.debugger.sendCommand('Network.enable');

    console.debug('Network request/response handling start');
}

module.exports = {
    // Call top-level
    init: () => {
        window.game.jsonResponse = window.game.jsonResponse || new Subject();
    },
    // Call after webview emitted dom-ready
    initializeHandling: initializeHandling,
};
