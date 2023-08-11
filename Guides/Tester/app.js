(function () {
    return {
        "Run": function () {
            document.getElementById('primary-view').innerHTML = '<center id="GuideWrapper" class="smooth"><h2 class="selectable">Browsing...</h2><span class="selectable">Opening guide...</span></center>';
            let flnm = ZellaSoft.View.Parameter('name') || 'guide404';
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        document.getElementById('primary-view').innerHTML = xhr.responseText;
                        try {
                            let ls = document.getElementsByTagName('meta');
                            for (let i in ls) {
                                if (ls[i]["name"] == "GuideTitle") {
                                    document.getElementById('GuideLink').innerText = ls[i]["content"];
                                }
                            }
                        } catch (ex) {
                            document.getElementById('GuideLink').innerText = flnm;
                        }
                    } else if (xhr.status === 404) {
                        document.getElementById('primary-view').innerHTML = '<center id="GuideWrapper" class="smooth"><h2 class="selectable">404</h2><span class="selectable">The guide you were looking for cannot be found...</span></center>';
                    } else {
                        document.getElementById('primary-view').innerHTML = '<center id="GuideWrapper" class="smooth"><h2 class="selectable">Wow</h2><span class="selectable">Something went wrong... (' + xhr.status + ')</span></center>';
                    }
                }
            };
            xhr.open("GET", flnm);
            xhr.setRequestHeader("Accept", "*/*");
            xhr.send();

            if (ZellaSoft.IsLedge()) {
                if (navigator.platform === "ARM") {
                    App.ShowLedgeOutDate();
                } else {
                    /* x86 */
                }
            }
        },
        "Unload": function () {

        },
        "ShowLedgeOutDate": function () {
            let r = /Edge\/([0-9]+)(\.)([0-9]+)\b/;
            if (r.test(navigator.userAgent)) {
                let ver = parseInt(navigator.userAgent.match(r)[3]);
                if (ver < 15063) {
                    ZellaSoft.View.ContentDialog("Update Windows 10 Mobile to version 10.0.15063.0 or later.");
                } else if (ver < 15254) {
                    ZellaSoft.View.ContentDialog("Optional update to Windows 10 Mobile 10.0.15254.603.");
                }
            }
        },
        "Code": {
            "Copy": function (el) {
                try {
                    let elparento = el.parentElement;
                    while (elparento.nextElementSibling == null || elparento.nextElementSibling.tagName.toUpperCase() != "CODE") {
                        elparento = elparento.parentElement;
                    }
                    let _code = elparento.nextElementSibling.innerText;
                    try {
                        navigator.clipboard.writeText(_code);
                    } catch (ex) {
                        let _e = document.createElement("textarea");
                        document.body.appendChild(_e);
                        _e.value = _code;
                        _e.select();
                        document.execCommand("copy");
                        document.body.removeChild(_e);
                    }
                } catch (ex) { }
            }
        },
        "Guide": function (tag) {
            return ZellaSoft.View.Navigate(location.origin.toString() + '/Guides/?name=' + (tag || 'guide404'));
        },
        "OnHref": function (url) {
            return ZellaSoft.View.Navigate(url.toString());
        }
    };
})
