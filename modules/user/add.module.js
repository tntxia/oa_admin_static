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
})('user/add', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = null;
        

        exports.init = function() {
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
        this.loadRestrainList();
        this.loadPositionList();
        this.loadDepartmentList();
    },
    methods: {
        loadDepartmentList() {
            let me = this;
            http.post({
                url: 'dept!listAll.do'
            }).then(res => {
                me.departmentList = res;
            })
        },
        loadPositionList() {
            let me = this;
            http.post({
                url: 'position!listAll.do'
            }).then(res => {
                me.positionList = res;
            })
        },
        loadRestrainList() {
            let me = this;
            http.post({
                url: 'restrain!listAll.do'
            }).then(res => {
                me.restrainList = res;
            })
        },
        sub() {
            $.ajax({
                url: 'user!add.do',
                data: this.form
            }).then(res => {
                if (res.success) {
                    router.goRoute("user");
                } else {
                    alert("操作失败：" + res.msg);
                }
            }, e => {
                alert("操作异常");
            })
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