let id = router.getParams().id;

new Vue({
    el: '#app',
    data: {
        form: {

        }
    },
    mounted() {
        let me = this;
        $.ajax({
            url: 'company!detail.do',
            data: {
                id: id
            }
        }).done(res => {
            me.form = res;
        })
    },
    methods: {
        getPicSrc() {
            return '/file_center/file!showPic.do?uuid=' + this.form.pic_id;
        },
        sub() {
            let me = this;
            let form = this.form;
            let picInput = this.$refs["pic"];
            let formData = new FormData();
            let file = picInput.getFile();
            formData.append("id", id);
            formData.append("companyname", form.companyname);
            formData.append("companytel", form.companytel);
            formData.append("pic", file);
            $.ajax({
                url: 'company!update.do',
                type: "post",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
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
        back() {
            router.goRoute("company/list");
        }
    }
});