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
            /*if (!ZellaSoft.IsLedge()) {
                alert("Please use Microsoft Edge for Windows Phone");
            }*/

        },
        "Unload": function () {

        },
        "DownloadVCLib140": function () {
            return ZellaSoft.Launchers.DownloadFromURI('Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.VCLibs.140.00_14.0.30704.0_arm_8wekyb3d8bbwe.appx');
        },
        "DownloadMAI": function () {
            return ZellaSoft.Launchers.DownloadFromURI('Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx', 'Microsoft.DesktopAppInstaller_1.0.20921.0_arm_8wekyb3d8bbwe.appx');
        },
        "DownloadCA": function () {
            return ZellaSoft.Launchers.DownloadFromURI('ZellaSoft_CA.cer', 'ZellaSoft Root CA.cer');
        },
        "SideloadAsUWP": function () {
            /*ZellaSoft.View.Navigate('#troubleshooter');*/
            var el = document.getElementById('troubleshooter');
            el.scrollIntoView({ behavior: "smooth" });
            return ZellaSoft.Sideload(location.origin.toString() + location.pathname.toString() + 'ZellaStore.appxbundle');
        },
        "Guide": function (tag) {
            return ZellaSoft.View.Navigate(location.origin.toString() + '/Guides/' + tag);
        }
    };
})
