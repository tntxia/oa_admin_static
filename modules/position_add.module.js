(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('position_add', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        new Vue({
    el: '#app',
    data: {
        form: {
            role_name: null,
            remark: null
        }
    },
    methods: {
        sub() {
            $.ajax({
                url: 'position!add.do',
                data: this.form
            }).then(res => {
                if (res.success) {
                    router.goRoute("position");
                } else {
                    alert("操作失败：" + res.msg);
                }
            }, e => {
                alert("操作异常");
            })
        }
    }
})
    };
    return module.exports;
});