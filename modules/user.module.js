(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('user', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        let grid;

        // new Vue({
        //     el: "#toolbar",
        //     data: {
        // dataset: {
        //     url: 'user!list.do',
        //     method: 'post'
        // },
        //         deptId: '',
        //         name: null,
        //         deptList: []
        //     },
        //     mounted() {
        //         let vm = this;
        //         $.ajax({
        //             url: 'dept!listAll.do',
        //             success: function(data) {
        //                 vm.deptList = data;
        //             },
        //             error: function() {
        //                 alert("请求失败");
        //             }
        //         });
        //     },
        //     methods: {
        //         query() {
        //             let me = this;
        //             grid.load({
        //                 deptId: me.deptId,
        //                 name: me.name
        //             })
        //         },
        //         add() {
        //             router.goRoute("user_add");
        //         }
        //     }
        // })

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
                }
            },
            created: function() {},
            methods: {
                query() {
                    let me = this;
                    grid.load({
                        deptId: me.deptId,
                        name: me.name
                    })
                },
                add() {
                    router.goRoute("user_add");
                },
                initData: function() {
                    var vm = this;
                    $.ajax({
                        url: 'position!list.do',
                        success: function(data) {
                            vm.positionList = data.rows;
                        },
                        error: function() {
                            alert("请求失败");
                        }
                    });

                    $.ajax({
                        url: 'restrain!list.do',
                        success: function(data) {
                            vm.restrainList = data.rows;
                        },
                        error: function() {
                            alert("请求失败");
                        }
                    });

                    this.fetchData();
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

                toAdd: function() {
                    $("#addModal").modal("show");
                },
                add: function() {
                    var vm = this;
                    var newRow = vm.newRow;
                    if ($("#addModal [name=ipbd]").prop("checked")) {
                        newRow.ipbd = 'Y';
                    } else {
                        newRow.ipbd = 'N';
                    }
                    $.ajax({
                        url: 'user!add.do',
                        type: 'post',
                        data: newRow,
                        success: function(data) {
                            if (data.success) {
                                vm.fetchData();
                                $("#addModal").modal("hide");
                            } else {
                                alert("操作失败");
                            }
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
                    router.goRoute("user_edit", { id: row.nameid });
                },
                toChangePassword(row) {
                    router.goRoute("user_password", { id: row.nameid });
                },
                viewRole(row) {
                    router.goRoute("user_role", { id: row.nameid });
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
                                    grid.load();
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
                del: function(id) {},
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

        VueManager.createVue("updatePasswordVue", {
            el: '#updatePasswordModal',
            data: {
                id: null,
                password: '',
                passwordConfirm: ''
            },
            methods: {
                updatePassword: function() {
                    var id = this.id;
                    var password = this.password;
                    var passwordConfirm = this.passwordConfirm;
                    if (password != passwordConfirm) {
                        alert("两次输入的密码不一致！");
                        return;
                    }
                    $.ajax({
                        url: 'user!updatePassword.do',
                        type: 'post',
                        data: {
                            id: id,
                            password: password
                        }
                    }).done(function(data) {
                        if (data.success) {
                            alert("修改成功");
                            $("#updatePasswordModal").modal('hide');
                        } else {
                            alert("修改失败");
                        }
                    }).fail(function() {
                        alert("修改异常");
                    });
                }
            }
        })

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
});