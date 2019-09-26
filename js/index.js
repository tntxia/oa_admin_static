$(function() {

    WebInstall.install({
        configUrl: '/oa_admin_static/json/webConfig.json',
        mainLayout: {
            leftbarWidth: 150,
            headerHeight: 50,
            headerTemplate: '/oa_admin_static/template/header.html',
            mainSecTemplate: '/oa_admin_static/template/content.html'
        }
    }).then(function(webApp) {
        window.mainLayout = webApp.mainLayout;
        $(document.body).append($("<div>", {
            text: '组件加载完成，开始渲染'
        }));
        init(mainLayout);

    })

    function init(mainLayout) {
        $.getJSON("/oa_admin_static/json/menu.json").done(function(res) {
            mainLayout.setLeftbar(res);
            router.register({
                target: $(".main_sec"),
                defaultModule: 'main',
                resourcePath: '/oa_admin_static',
                onChange(moduleName) {
                    mainLayout.selectLeftbar(moduleName);
                }
            });
        }).fail(function() {
            alert("fail");
        });
    }

});

function changePassword() {
    $("#changePassModal").modal('show');
}

function logout() {
    $.ajax({
        url: 'logout.do',
        success: function(data) {
            if (data.success) {
                window.location.reload();
            } else {
                alert("注销失败");
            }
        },
        error: function() {
            alert("注销异常");
        }
    })
}