(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('position_edit', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");
new Vue({
    el: '#app',
    data: {
        form: {
            id: null
            role_name: null,
            remark: null
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            $.ajax({
                url: 'position!detail.do',
                data: {
                    id: id
                }
            }).done(res => {
                this.form = res;
            })
        },
        sub() {
            $.ajax({
                url: 'position!update.do',
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