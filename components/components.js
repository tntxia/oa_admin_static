(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('menu-edit-view', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['id'],
    data() {
        return {
            form: {}
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            let id = this.id;
            $.ajax({
                url: 'menu!detail.do',
                data: {
                    id: id
                }
            }).done(res => {
                me.form = res;
            })
        },
        sub() {
            let me = this;
            let form = this.form;
            $.ajax({
                url: 'menu!update.do',
                type: "post",
                data: form,
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
        }
    },
    watch: {
        id() {
            this.loadData();
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        <button @click=\"sub\">保存</button>\r\n    </div>\r\n\r\n    <div id=\"form\">\r\n        <input type=\"hidden\" name=\"logo\">\r\n        <table class=\"table table-bordered\">\r\n            <tr>\r\n                <td>菜单名</td>\r\n                <td><input v-model=\"form.name\"></td>\r\n                <td>关键字名</td>\r\n                <td><input v-model=\"form.key_name\"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>\r\n                    URL\r\n                </td>\r\n                <td><input v-model=\"form.url\"></td>\r\n                <td>\r\n                    排序编号\r\n                </td>\r\n                <td><input v-model=\"form.order_no\" type=\"number\"></td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('menu-add-view', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
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

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('department-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: null,
            departmentList: []
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: 'dept!listAll.do'
            }).done(function(res) {
                if (!me.value) {
                    if (res && res.length) {
                        me.v = res[0].departname;
                    }
                }

                me.departmentList = res;
            })
        }
    },
    watch: {
        v() {
            if (this.v != this.value) {
                this.$emit("input", this.v);
            }
        },
        value() {
            this.v = this.value;
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option v-for=\"t in departmentList\">{{t.departname}}</option>\r\n</select>"
        return module.exports;
    })(),

);