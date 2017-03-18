const docMode = document.documentMode;
const hasDocumentMode = (docMode !== undefined);
const userAgent = window.navigator.userAgent;
const browserMetadata = {
   isIE8: (hasDocumentMode && docMode === 8),
   isIE9: (hasDocumentMode && docMode === 9),
   isIE10: (hasDocumentMode && docMode === 10),
   isIE11: (hasDocumentMode && docMode === 11),
   isIE: /*@cc_on!@*/false || !!document.documentMode,
   isMsEdge: window.navigator.userAgent.indexOf("Edge/") > -1,
   isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
   isFirefox: typeof InstallTrigger !== 'undefined',
   isSafari: /constructor/i.test(window.HTMLElement) || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]"; }
      )(!window['safari'] || safari.pushNotification),
   isChrome: !!window.chrome && !!window.chrome.webstore,
   userAgent: userAgent
};

export { browserMetadata };