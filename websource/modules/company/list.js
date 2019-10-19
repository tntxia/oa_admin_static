new Vue({
    el: '#app',
    data: {
        form: {
            deptId: ''
        },
        dataset: {
            url: 'company!list.do',
            method: 'post'
        }
    },
    methods: {
        toAdd() {
            router.goRoute("company/add");
        },
        toEdit(row) {
            router.goRoute("company/edit", {
                id: row.id
            });
        },
        del(row) {
            if (confirm("删除后无法恢复，是否确认删除")) {
                let me = this;
                $.ajax({
                    url: 'company!del.do',
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
    },
})