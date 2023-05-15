(function () {
    return {
        "Run": function () {
            let branch = ZellaSoft.View.Parameter('branch');
            if (branch == 'alpha')
                document.getElementById('ProductDisplayName').innerHTML = 'Zella Store <span class="marker red">Alpha</span>';
            else if (branch == 'beta')
                document.getElementById('ProductDisplayName').innerHTML = 'Zella Store <span class="marker yellow">Beta</span>';
            else if (branch == 'preview')
                document.getElementById('ProductDisplayName').innerHTML = 'Zella Store <span class="marker green">Preview</span>';
            else if (branch == 'release')
                document.getElementById('ProductDisplayName').innerHTML = 'Zella Store';
            if (ZellaSoft.IsLedge()) {
                /*ShowLedgeOutDate();*/
                let uwpinstall = document.getElementById('W10MSideload');
                if (navigator.platform === "ARM") {
                    uwpinstall.classList.remove('hidden');
                } else /* x86 */ {
                    ZellaSoft.View.ContentDialog("It is possible that sideloading will fail due to the wrong architecture of your device.");
                    uwpinstall.classList.remove('hidden');
                }
            } else if (ZellaSoft.IsiPadSafari()) {
                let ipadosinstall = document.getElementById('iPadOSSideload');
                ipadosinstall.classList.remove('hidden');
            } else if (ZellaSoft.IsiPhoneSafari()) {
                let iosinstall = document.getElementById('iOSSideload');
                iosinstall.classList.remove('hidden');
            } else {
                if (ZellaSoft.View.Parameter('debug') == 'true') {
                    ZellaSoft.View.ContentDialog('Platform:' + navigator.platform.toString() + '\n' + navigator.userAgent.toString());
                } else {
                    ZellaSoft.View.ContentDialog("Please use the native web browser that came preinstalled with your operating system.");
                }
            }
        },
        "Unload": function () {
            
        },
        "ShowLedgeOutDate": function () {
            let r = /Edge\/([0-9]+)(\.)([0-9]+)\b/;
            if (r.test(navigator.userAgent)) {
                if (parseInt(navigator.userAgent.match(r)[3]) < 15063) {
                    ZellaSoft.View.ContentDialog("Update Windows 10 Mobile to version: 10.0.15063.0 or later.");
                } else if (parseInt(navigator.userAgent.match(r)[3]) < 15254) {
                    ZellaSoft.View.ContentDialog("Optional update to Windows 10 Mobile 10.0.15254.603.");
                }
            }
        },
        "DownloadVCLib140": function () {
            if (navigator.platform === "ARM") {
                return ZellaSoft.Launchers.DownloadFromURI('Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx');
            } else {
                ZellaSoft.View.ContentDialog("We don't have the right architecture for your device.");
            }
        },
        "DownloadMAI": function () {
            if (navigator.platform === "ARM") {
                return ZellaSoft.Launchers.DownloadFromURI('Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx');
            } else {
                ZellaSoft.View.ContentDialog("We don't have the right architecture for your device.");
            }
        },
        "DownloadCA": function () {
            let rs = ZellaSoft.Launchers.DownloadFromURI('ZellaSoft_CA.cer', 'ZellaSoft Root CA.cer');
            if (ZellaSoft.IsiPhoneSafari()) {
                ZellaSoft.View.ContentDialog("Open the settings app and install the profile.");
            }
            return rs;
        },
        "SideloadAsUWP": function (url) {
            var el = document.getElementById('troubleshooter');
            el.scrollIntoView({ behavior: "smooth" });
            return ZellaSoft.msSideload(url.toString());
        },
        "SideloadAsiOS": function (url) {
            var el = document.getElementById('troubleshooter');
            el.scrollIntoView({ behavior: "smooth" });
            return ZellaSoft.iOSSideload(location.origin + location.pathname + url.toString());
        },
        "Guide": function (tag) {
            return ZellaSoft.View.Navigate(location.origin.toString() + '/Guides/' + (tag || ''));
        },
        "OnHref": function (url) {
            return ZellaSoft.View.Navigate(url.toString());
        }
    };
})
