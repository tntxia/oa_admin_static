new Vue({
    el: '#app',
    data: {
        form: {
            name: null,
            tel: null
        }
    },
    methods: {
        sub() {
            let form = this.form;
            let picInput = this.$refs["pic"];
            let formData = new FormData();
            formData.append("name", form.name);
            formData.append("tel", form.tel);
            formData.append("pic", picInput.getFile());
            $.ajax({
                url: 'company!add.do',
                type: "post",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
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
            router.goRoute("company");
        }
    }
});