(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('menu/add', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let pid = router.getParam("pid");
new Vue({
    el: '#app',
    data: {
        parent: null,
        form: {
            pid: pid
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            if (pid) {
                let me = this;
                $.ajax({
                    url: 'menu!detail.do',
                    data: {
                        id: pid
                    }
                }).done(res => {
                    me.parent = res.name;
                })
            } else {
                this.parent = "无";
            }
        },
        sub() {
            let form = this.form;
            $.ajax({
                url: 'menu!add.do',
                type: "post",
                data: form,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    router.goRoute("company");
                } else {
                    alert("操作失败");
                }
            })
            console.log(form);
        },
        back() {
            router.goRoute("menu/list");
        }
    }
});
    };
    return module.exports;
});