(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('right/role_list', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        new Vue({
    el: '#app',
    data: {
        form: {
            deptId: ''
        },
        dataset: {
            url: 'restrain!list.do',
            method: 'post'
        }
    },
    methods: {
        toAdd() {
            router.goRoute("restrain/add");
        },
        toEdit(row) {
            router.goRoute("restrain/edit", {
                id: row.id
            });
        },
        viewRight: function(id) {
            router.goRoute("restrain_right", {
                id: id
            });
        },
        viewMenu: function(id) {
            router.goRoute("restrain_menu", {
                id: id
            });
        },
        del(row) {
            if (confirm("删除后无法恢复，是否确认删除")) {
                let me = this;
                $.ajax({
                    url: 'restrain!del.do',
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
    };
    return module.exports;
});