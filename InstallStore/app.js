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
                if (navigator.platform === "ARM") {
                    let iosinstall = document.getElementById('W10MSideload');
                    iosinstall.classList.remove('hidden');
                } else {
                    /* x86 */
                }
            } else if (ZellaSoft.IsiPhoneSafari()) {
                let iosinstall = document.getElementById('iOSSideload');
                iosinstall.classList.remove('hidden');
            } else {
                ZellaSoft.View.ContentDialog("Please use the native web browser that came preinstalled with your operating system.");
            }
        },
        "Unload": function () {

        },
        "DownloadVCLib140": function () {
            if (navigator.platform === "ARM") {
                return ZellaSoft.Launchers.DownloadFromURI('Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx');
            } else {
                ZellaSoft.View.ContentDialog("Your device doesn't support this architecture.");
            }
        },
        "DownloadMAI": function () {
            if (navigator.platform === "ARM") {
                return ZellaSoft.Launchers.DownloadFromURI('Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx');
            } else {
                ZellaSoft.View.ContentDialog("Your device doesn't support this architecture.");
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
