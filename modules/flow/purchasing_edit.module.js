(function(name, moduleFun) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    let module = moduleFun();
    if (arguments.length > 2) {
        let components = Object.create(null);
        for (let i = 2; i < arguments.length; i++) {
            let name = arguments[i];
            i++;
            let func = arguments[i];
            if (!func) {
                continue;
            }
            let component = func();
            components[name] = component;
        }
        module.components = components;
    }

    window.modules[name] = module;
})('flow/purchasing_edit', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <table>\r\n        <tr>\r\n            <td>申请部门</td>\r\n            <td>\r\n                <department-select v-model=\"form.dept\"></department-select>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td>申请人职位</td>\r\n            <td><select v-model=\"form.role\"></select></td>\r\n        </tr>\r\n        <tr>\r\n            <td>最少额度</td>\r\n            <td><input v-model=\"form.price_min\" type=\"number\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td>最多额度</td>\r\n            <td><input v-model=\"form.price_max\" type=\"number\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td>审批人</td>\r\n            <td><select v-model=\"form.dd_man\"></select></td>\r\n        </tr>\r\n        <tr>\r\n            <td>是否需复审</td>\r\n            <td><select v-model=\"form.fif\"><option>是</option><option selected=\"selected\">否</option></select></td>\r\n        </tr>\r\n        <tr>\r\n            <td>是否需复审</td>\r\n            <td><select v-model=\"form.fspman\"></select></td>\r\n        </tr>\r\n        <tr>\r\n            <td>备注</td>\r\n            <td><textarea v-model=\"form.remark\"></textarea></td>\r\n        </tr>\r\n    </table>\r\n</div>";
        

        exports.init = function() {
            let id = router.getParam("id");
new Vue({
    el: '#app',
    data: {
        form: {
            dept: null
        },
        restrainList: [],
        positionList: []

    },
    mounted() {
        let me = this;
        $.ajax({
            url: 'flowPurchasing!detail.do',
            data: {
                id
            }
        }).done(function(res) {
            me.form = res.data;
            me.loadRestrainList();
            me.loadPositionList();
        }).fail(function(e) {
            alert("加载数据异常");
        });
    },
    methods: {
        loadPositionList() {
            let me = this;
            $.ajax({
                url: 'position!listAll.do'
            }).done(res => {
                me.positionList = res;
            })
        },
        loadRestrainList() {
            let me = this;
            $.ajax({
                url: 'restrain!listAll.do'
            }).done(res => {
                me.restrainList = res;
            })
        },
        sub() {
            let params = this.form;
            http.post({
                url: 'user!update.do',
                data: params
            }).then(res => {
                if (res.success) {
                    router.goRoute("user");
                }
            })
        },
        back() {
            router.goRoute("user");
        }
    },
    computed: {
        isIPDisabled() {
            return this.form.ipbd !== 'Y';
        }
    },
})
        };
        return module.exports;
    }

    
);