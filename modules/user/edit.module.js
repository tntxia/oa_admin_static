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
})('user/edit', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = null;
        

        exports.init = function() {
            let id = router.getParams().id;
new Vue({
    el: '#form',
    data: {
        form: {
            name: null,
            name_en: null,
            sex: null,
            workj: null,
            department_id: null,
            worktel: null,
            ipbd: null,
            user_ip: null
        },
        restrainList: [],
        positionList: [],
        departmentList: []

    },
    mounted() {
        let me = this;
        $.ajax({
            url: 'user!detail.do',
            data: {
                id
            }
        }).done(function(res) {
            me.form = res;
            me.loadRestrainList();
            me.loadPositionList();
            me.loadDepartmentList();
        }).fail(function(e) {
            alert("加载数据异常");
        });
    },
    methods: {
        loadDepartmentList() {
            let me = this;
            $.ajax({
                url: 'dept!listAll.do'
            }).done(res => {
                me.departmentList = res;
            })
        },
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