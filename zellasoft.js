function ErrorReport(th, ex, ad) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", location.origin.toString() + "/crashreport/submit");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            /*location.href = "/UpgradeBrowser";*/
        }
    };
    var data = '{"$type": "CrashReport.json", "ex": ' + JSON.stringify(ex) + ', "ad": ' + JSON.stringify(ad) + '}';
    console.log(data);
    document.body.innerHTML = '<h1>Collecting crash data...</h1>';
    xhr.send(data);
}
window.addEventListener('DOMContentLoaded', function () {
    try {
        let liew = document.getElementById('primary-view');
        liew.addEventListener('scroll', function (e) {
            document.documentElement.style.setProperty('--scroll-top', e.srcElement.scrollTop + 'px');
            document.documentElement.style.setProperty('--scroll-bottom', 'calc(var(--scroll-top) + ' + getComputedStyle(e.srcElement).height + ')');
        }, false);
    } catch (ex) { }
    App = {};
    ZellaSoft = {
        "intern": {
            "Split": function (str, separator, n) {
                let s = str.split(separator);
                if (s.length <= n)
                    return s
                let out = s.slice(0, n - 1);
                out.push(s.slice(n - 1).join(separator));
                return out;
            }
        },
        "LanguagePack": (function (region) {
            return {
                "$type": "Language Pack",
                "Version": "1.0",
                "Language": "en-US",
                "Strings": ["", "", "", "Not implemented exception!", "Something went wrong, reload the site.", "This browser is not supported. Please consider using an alternative."]
            };
        })(),
        "BackgroundChecks": {
            "value": [],
            "Add": function (s) { ZellaSoft.BackgroundChecks.value.push(s); },
            "Stop": function (s) { alert(ZellaSoft.Strings[3]); throw new DOMException(); }
        },
        "View": {
            "Navigate": function (url) {
                location.href = url;
                return false;
            },
            "Parameter": function (param) {
                if (location.search[0] != '?') return undefined;
                let fr = location.search.substring(1).split("&");
                for (let i = 0; i < fr.length; i++) {
                    let rs = ZellaSoft.intern.Split(fr[i], '=', 2);
                    if (rs[0].toLowerCase() == param.toLowerCase()) {
                        return decodeURI(rs[1]) || undefined;
                    }
                }
                return undefined;
            },
            "ContentDialog": function (msg) {
                let ou1 = document.createElement('div');
                let ou2 = document.createElement('div');
                let tx = document.createElement('span');
                let ch = document.createElement('div');
                let chi = document.createElement('div');
                let acb = document.createElement('button');
                ou1.classList.add('contentdialog');
                ou2.classList.add('content-box');
                ou2.classList.add('bordered-shadow');
                tx.innerText = msg.toString();
                ch.classList.add('chin');
                acb.classList.add('bordered-shadow');
                acb.innerText = "OK";
                chi.appendChild(acb);
                ch.appendChild(chi);
                ou2.appendChild(tx);
                ou2.appendChild(ch);
                ou1.appendChild(ou2);
                acb.dghost = ou1;
                acb.onclick = function () { document.body.removeChild(this.dghost); }
                document.body.appendChild(ou1);
                try { acb.focus(); } catch (ex) {}
            }
        },
        "Launchers": {
            "frame": null,
            "GenericURI": function (uri) {
                try {
                    if (ZellaSoft.Launchers.frame == null) {
                        ZellaSoft.Launchers.frame = document.createElement("iframe");
                        ZellaSoft.Launchers.frame.classList.add("hidden");
                        document.body.appendChild(ZellaSoft.Launchers.frame);
                    }
                    ZellaSoft.Launchers.frame.src = uri;
                } catch (ex) {
                    ErrorReport(this, ex, { "throw": "generic URI launcher" });
                }
                return false;
            },
            "DownloadFromURI": function (uri, filename) {
                let dwnl = document.createElement("a");
                dwnl.setAttribute("style", "display: none;");
                dwnl.setAttribute("href", uri);
                if (filename !== undefined) { dwnl.setAttribute("download", filename); }
                document.body.appendChild(dwnl);
                dwnl.click();
                document.body.removeChild(dwnl);
            }
        },
        "msSideload": function (url) {
            return ZellaSoft.Launchers.GenericURI("ms-appinstaller:?source=" + url);
        },
        "iOSSideload": function (url) {
            return ZellaSoft.View.Navigate("itms-services://?action=download-manifest&url=" + url);
        },
        "DeveloperSettings": function () {
            return ZellaSoft.Launchers.GenericURI("ms-settings:developers");
        },
        "iOSCertificatesSettings": function () {
            return ZellaSoft.View.Navigate("prefs:root=General");
        },
        "IsLedge": function () {
            try {
                let LedgeTest = eval("(function(){try{}catch{}})");
            } catch (ex) {
                return true;
            }
            return false;
        },
        "IsiPadSafari": function () {
            try {
                let rg = /(Mozilla\/5.0 )(\(Macintosh; Intel Mac OS X )[0-9,_]*(\) AppleWebKit\/)[0-9,.]*( \(KHTML, like Gecko\) Version\/)[0-9,.]*( Safari\/)[0-9,.]*/gm;

                return navigator.platform === "MacIntel" && rg.test(navigator.userAgent);
            } catch (ex) {
                return false;
            }
        },
        "IsiPhoneSafari": function () {
            try {
                let rg = /(Mozilla\/5.0 )(\(iPhone; CPU iPhone OS )[0-9,_]*( like Mac OS X\) AppleWebKit\/)[0-9,.]*( \(KHTML, like Gecko\) Version\/)[0-9,.]*( Mobile\/)[^ ]*( Safari\/)[0-9,.]*/gm;

                return navigator.platform === "iPhone" && rg.test(navigator.userAgent);
            } catch (ex) {
                return false;
            }
        },
        "RunApp": function (appjs) {
            try {
                ZellaSoft.App = eval(appjs)();
                if ('App' in ZellaSoft) {
                    if ('Run' in ZellaSoft.App) {
                        App = ZellaSoft.App;
                        App.Run();
                    }
                }
            } catch (ex) {
                ErrorReport(this, ex, { "throw": "generic URI launcher" });
            }
        },

        "Initialized": false
    };

    (function () {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    ZellaSoft.RunApp(xhr.responseText);
                }
            }
        };
        xhr.open("GET", "app.js");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.send();
    })();
}, false);
