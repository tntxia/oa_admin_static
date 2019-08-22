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