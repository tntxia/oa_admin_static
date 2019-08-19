(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('company', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        new Vue({
            el: '#app',
            data: {
                form: {
                    deptId: ''
                },
                dataset: {
                    url: 'company!list.do',
                    method: 'post'
                }
            },
            methods: {
                toAdd() {
                    router.goRoute("company/add");
                },
                toEdit(row) {
                    router.goRoute("company/edit", {
                        id: row.id
                    });
                }
            },
        })

        // let grid = new BootstrapGrid({
        //     target: $("#datagrid"),
        //     url: 'company!list.do',
        //     cols: [{
        //         label: '公司名称',
        //         field: 'companyname'
        //     }, {
        //         label: '修改',
        //         renderer: function(value, row) {
        //             let button = $("<button>", {
        //                 text: '修改',
        //                 click: function() {
        //                     var row = $(this).data("row");
        //                     router.goRoute("company_edit", { id: row.id })
        //                 }
        //             });
        //             button.data("row", row)
        //             return button;
        //         }
        //     }]
        // });
        // grid.init();

    };
    return module.exports;
});