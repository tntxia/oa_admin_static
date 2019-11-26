(function(name, moduleFun) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    let module = moduleFun();
    if (arguments.length > 2) {
        let components = Object.create(null);
        for (let i = 2; i < arguments.length; i++) {
            let name = arguments[i];
            i++;
            let func = arguments[i];
            if (!func) {
                continue;
            }
            let component = func();
            components[name] = component;
        }
        module.components = components;
    }

    window.modules[name] = module;
})('user/list', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = null;
        

        exports.init = function() {
            let grid;

let componentUpdatePasswordDialog = {
    template: '<jxiaui-dialog title="密码修改" ref="dialog"><div id="form" style="padding: 10px;"><div>密码：<input v-model="password" type="password"></div><div>重复密码：<input v-model="password2" type="password"></div><button @click="update">提交</button></div></jxiaui-dialog>',
    data: function() {
        return {
            id: null,
            password: null,
            password2: null
        }
    },
    methods: {
        setId(id) {
            this.id = id;
        },
        show() {
            let me = this;
            me.$refs["dialog"].show();
        },
        update() {
            if (!this.password) {
                alert("请输入密码");
                return;
            }
            if (!this.password2) {
                alert("请输入重复密码");
                return;
            }
            if (this.password !== this.password2) {
                alert("再次输入的密码不一致，请重新输入！");
                return;
            }
            let me = this;
            $.ajax({
                url: 'user!updatePassword.do',
                data: {
                    id: this.id,
                    password: me.password
                }
            }).done(res => {
                if (res.success) {
                    alert("操作成功");
                    me.$refs["dialog"].close();
                } else {
                    alert("操作失败");
                }
            })
        }
    }
}

new Vue({
    el: '#app',
    data: {
        form: {
            deptId: ''
        },
        dataset: {
            url: 'user!list.do',
            method: 'post'
        },
        rows: [],
        positionList: [],
        restrainList: [],
        departmentList: [],
        newRow: {
            ipbd: 'N'
        },
        currRow: {
            ipbd: 'N'
        },
        showPasswordDialogFlag: false
    },
    components: {
        'update-password-dialog': componentUpdatePasswordDialog
    },
    created: function() {},
    mounted() {
        this.loadDepartmentList();
    },
    methods: {
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        add() {
            router.goRoute("user/add");
        },
        loadDepartmentList() {
            let me = this;
            http.post({
                url: 'dept!listAll.do'
            }).then(res => {
                me.departmentList = res;
            })
        },
        fetchData: function() {
            var vm = this;
            $.ajax({
                url: 'user!list.do',
                success: function(data) {
                    var rows = data.rows;
                    $.each(rows, function(i, r) {
                        if (r.ipbd == 'Y' || r.ipbd == "是") {
                            r.ipbd = 'Y';
                        } else {
                            r.ipbd = 'N';
                        }
                        if (!r.worktel) {
                            r.worktel = "";
                        }
                    });
                    vm.rows = data.rows;
                },
                error: function() {
                    alert("请求失败");
                }
            });
        },
        unlock: function(id) {
            unlock(id);
        },
        toEdit: function(row) {
            router.goRoute("user/edit", { id: row.nameid });
        },
        toChangePassword(row) {
            let dialog = this.$refs.updatePasswordDialog;
            dialog.setId(row.nameid);
            dialog.show();
        },
        viewRole(row) {
            router.goRoute("user/role", { id: row.nameid });
        },
        del(row) {
            if (confirm("确实要删除用户吗？")) {
                var vm = this;
                $.ajax({
                    url: 'user!del.do',
                    type: 'post',
                    data: {
                        id: row.nameid
                    },
                    success: function(data) {
                        if (data.success) {
                            vm.query();
                        } else {
                            alert("操作失败");
                        }
                    }
                });
            }
        },
        update: function() {

            var vm = this;
            var row = vm.currRow;
            row.sex = $("[name=sex]:checked").val();
            if ($("#editModal [name=ipbd]").prop("checked")) {
                row.ipbd = 'Y';
            } else {
                row.ipbd = 'N';
            }
            $.ajax({
                url: 'user!update.do',
                type: 'post',
                data: row,
                success: function(data) {
                    if (data.success) {
                        $("#editModal").modal("hide");
                        vm.fetchData();
                    } else {
                        alert("操作失败");
                    }
                }
            });
        },
        onChangeIPBind: function() {
            if ($("#addModal [name=ipbd]").prop("checked")) {
                this.newRow.ipbd = 'Y';
            } else {
                this.newRow.ipbd = 'N';
            }
        },
        onChangeIPBindEdit: function() {
            if ($("#editModal [name=ipbd]").prop("checked")) {
                this.currRow.ipbd = 'Y';
            } else {
                this.currRow.ipbd = 'N';
            }
        },
        toUpdatePassword: function(r) {
            VueManager.setVueData("updatePasswordVue", "id", r.nameid);
            $("#updatePasswordModal").modal('show');
        }

    }
});

function unlock(id) {
    $.ajax({
        url: 'user.do',
        data: {
            method: 'unlock',
            id: id
        },
        success: function(data) {
            if (data.success) {
                alert("解锁成功");
            } else {
                alert("操作失败");
            }
        }
    });
}
        };
        return module.exports;
    }

    
);