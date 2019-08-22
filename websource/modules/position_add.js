new Vue({
    el: '#app',
    data: {
        form: {
            role_name: null,
            remark: null
        }
    },
    methods: {
        sub() {
            $.ajax({
                url: 'position!add.do',
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