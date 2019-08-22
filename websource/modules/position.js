let grid;
new Vue({
    el: '#app',
    data: {
        dataset: {
            url: 'position!list.do',
            method: 'post'
        }
    },
    methods: {
        query() {
            let me = this;
            grid.load({
                deptId: me.deptId,
                name: me.name
            })
        },
        toAdd() {
            router.goRoute("position_add");
        },
        toEdit: function(row) {
            router.goRoute("position_edit", { id: row.id });
        },
        del(row) {
            if (confirm("确实要删除职业吗？")) {
                var vm = this;
                $.ajax({
                    url: 'position!del.do',
                    type: 'post',
                    data: {
                        id: row.id
                    }
                }).done(res => {
                    if (res.success) {
                        this.$refs["datagrid"].loadData();
                    } else {
                        alert("操作失败");
                    }
                }).fail(e => {
                    alert("操作异常");
                });
            }
        }

    }
});