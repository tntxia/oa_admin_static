(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('menu/edit', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        dataset: {
            url: 'menu!list.do',
            params: {
                pid: id
            },
            method: 'post'
        },
        form: {

        }
    },
    mounted() {
        let me = this;
        $.ajax({
            url: 'menu!detail.do',
            data: {
                id: id
            }
        }).done(res => {
            me.form = res;
        })
    },
    methods: {
        back() {
            router.goRoute("menu/list");
        },
        sub() {
            let me = this;
            let form = this.form;
            $.ajax({
                url: 'menu!update.do',
                type: "post",
                data: form,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    me.back();
                } else {
                    alert("操作失败");
                }
            })
            console.log(form);
        },
        addSub() {
            router.goRoute("menu/add", {
                pid: id
            })
        },
        toEdit(row) {
            router.goRoute("menu/edit", {
                id: row.id
            });
        },
        del(row) {
            if (confirm("删除后无法恢复，是否确认删除")) {
                let me = this;
                $.ajax({
                    url: 'menu!del.do',
                    data: {
                        id: row.id
                    }
                }).done(function(res) {
                    if (res.success) {
                        me.$refs["datagrid"].loadData();
                    } else {
                        alert("删除失败");
                    }
                });
            }
        }
    }
});

let form = $("#form").buildform({
    actions: {
        sub() {
            let params = this.getParamMap();
            http.post({
                url: 'menu!update.do',
                data: params
            }).then(res => {
                if (res.success) {
                    router.goRoute("menu");
                }
            })

        }
    }
});

http.post({
    url: 'menu!detail.do',
    data: {
        id
    }
}).then(res => {
    form.setValues(res);
});
    };
    return module.exports;
});