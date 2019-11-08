new Vue({
    el: '#app',
    data: {
        form: {
            deptId: ''
        },
        dataset: {
            url: 'currency!list.do',
            method: 'post'
        }
    },
    methods: {
        toAdd() {
            router.goRoute("currency/add");
        },
        toEdit(row) {
            router.goRoute("currency/edit", {
                id: row.id
            });
        },
        del(row) {
            if (confirm("删除后无法恢复，是否确认删除")) {
                let me = this;
                $.ajax({
                    url: 'currency!del.do',
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
})