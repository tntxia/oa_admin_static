$(function() {

    loadWebConfig().then(() => {
        installMainLayout().then((mainLayout) => {
            init(mainLayout);
        });
        return;

        var target = "";

        // 绑定路由，设置路由变化影响的区域
        router.register({
            target: $("#mainPage"),
            defaultModule: 'main'
        });

        new Vue({
            el: '#changePassModal',
            data: {
                pass: '',
                passConfirm: ''
            },
            methods: {
                updatePass: function() {

                    var pass = this.pass;
                    var passConfirm = this.passConfirm;

                    if (pass != passConfirm) {
                        alert("两次输入的密码不一致！");
                        return;
                    }

                    $.ajax({
                        url: 'modifyPass.do',
                        data: {
                            pass: pass
                        }
                    }).done(function(data) {
                        if (data.success) {
                            alert("修改成功");
                        } else {
                            alert("修改失败");
                        }
                    }).fail(function(e) {
                        alert("修改异常");
                    });
                }
            }
        });
    });

    function loadWebConfig() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/oa_admin_static/json/webConfig.json'
            }).done(res => {
                WebInstall.install(res).then(() => {
                    resolve();
                }, e => {
                    reject(e);
                });
            }).fail(e => {
                console.error(e);
                reject(e);
            })
        });
    }

    function installMainLayout() {
        $(document.body).empty();
        return MainLayoutInstall.install({
            leftbarWidth: 150,
            headerHeight: 50,
            headerTemplate: '/oa_admin_static/template/header.html',
            mainSecTemplate: '/oa_admin_static/template/content.html',
            dialogs: []
        });
    }

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