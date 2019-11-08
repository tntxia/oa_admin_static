(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('menu-add-view', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    props: ['id'],

    data() {
        return {
            parent: null,
            form: {}
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            if (this.id) {
                let me = this;
                let pid = this.id;
                $.ajax({
                    url: 'menu!detail.do',
                    data: {
                        id: pid
                    }
                }).done(res => {
                    me.parent = res.name;
                })
            } else {
                this.parent = "无";
            }
        },
        sub() {
            let me = this;
            let form = this.form;
            form.pid = this.id;
            $.ajax({
                url: 'menu!add.do',
                type: "post",
                data: form,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    me.$parent.loadData();
                } else {
                    alert("操作失败");
                }
            })
            console.log(form);
        }
    },
    watch: {
        id() {
            debugger
            this.loadData();
            this.form = {};
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        <button @click=\"sub\">增加</button>\r\n        <span>父菜单： {{parent}}</span>\r\n    </div>\r\n\r\n    <div id=\"form\">\r\n        <input type=\"hidden\" name=\"logo\">\r\n        <table class=\"table table-bordered\">\r\n            <tr>\r\n                <td>菜单名</td>\r\n                <td><input v-model=\"form.name\"></td>\r\n                <td>关键字名</td>\r\n                <td><input v-model=\"form.key_name\"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>\r\n                    URL\r\n                </td>\r\n                <td><input v-model=\"form.url\"></td>\r\n                <td>\r\n                    排序编号\r\n                </td>\r\n                <td>\r\n                    <input v-model=\"form.order_no\" type=\"number\">\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n\r\n</div>"
        return module.exports;
    })(),

)