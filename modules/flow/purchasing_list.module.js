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
})('flow/purchasing_list', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n\r\n    <button id=\"addBtn\">新增流程</button>\r\n\r\n    <div>\r\n        <jxiaui-datagrid :dataset=\"dataset\" ref=\"datagrid\">\r\n            <jxiaui-datagrid-item type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"dept\" label=\"申请部门\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"role\" label=\"申请人职位\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"price_min\" label=\"最少额度\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"price_max\" label=\"最多额度\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"dd_man\" label=\"审批人\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"fif\" label=\"是否需复审\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"fspman\" label=\"复审人\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item field=\"dd_date\" label=\"添加日期\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"操作\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<button @click=\"toEdit(row)\">编辑</button>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n\r\n</div>";
        

        exports.init = function() {
            new Vue({
    el: '#app',
    data: {
        dataset: {
            url: "flowPurchasing!list.do"
        }
    },
    methods: {
        toEdit(row) {
            router.goRoute("flow/purchasing_edit", {
                id: row.id
            });
        }
    }
})

var grid = new BootstrapGrid({
    target: $("#datagrid"),
    url: "flowPurchasing!list.do",
    cols: [{
        label: '#',
        type: 'index'
    }, {
        label: '申请部门',
        field: 'dept'
    }, {
        label: '申请人职位',
        field: 'role'
    }, {
        label: '最少额度',
        field: 'price_min'
    }, {
        label: '最多额度',
        field: 'price_max'
    }, {
        label: '审批人',
        field: 'dd_man'
    }, {
        label: '是否需复审',
        field: 'fif'
    }, {
        label: '复审人',
        field: 'fspman'
    }, {
        label: '添加日期',
        field: 'dd_date'
    }, {
        label: '操作',
        renderer: function(value, r, field) {

            var butArray = new Array();
            var buttonEdit = $("<button>", {
                text: '编辑',
                click: function() {
                    var rowId = $(this).data("rowId");
                    editFlowPurchasing(rowId);
                    console.log("edit");
                }
            });
            buttonEdit.data("rowId", r.id);
            butArray.push(buttonEdit);
            var buttonDel = $("<button>", {
                text: '删除',
                click: function() {
                    var rowId = $(this).data("rowId");
                    $.ajax({
                        url: "flowPurchasing!del.do",
                        data: {
                            id: rowId
                        }
                    }).done(function(data) {
                        if (data.success) {
                            alert("删除成功");
                            grid.load();
                        } else {
                            alert("删除失败");
                        }
                    }).fail(function() {
                        alert("删除异常");
                    });
                    console.log("del");
                }
            });
            buttonDel.data("rowId", r.id);
            butArray.push(buttonDel);
            return butArray;
        }

    }]
});
grid.init();

$("#addBtn").click(function() {

    var dialog = BootstrapUtils.createDialog({
        id: 'newFlowDialog',
        title: '新增流程',
        width: 700,
        template: "template/flow_purchasing_add.html",
        init: function() {
            OACommonSelects.fillDepartmentSelect({
                sel: $("[name=dept]")
            });
            OACommonSelects.fillPositionSelect({
                sel: $("[name=role]")
            });
            OACommonSelects.fillUserSelect({
                sel: $("[name=dd_man]")
            });
            OACommonSelects.fillUserSelect({
                sel: $("[name=fspman]")
            });
        },
        onConfirm: function() {
            var params = this.getParamMap();
            $.ajax({
                url: 'flowPurchasing!create.do',
                type: 'post',
                data: params,
                success: function(data) {
                    if (data.success) {
                        grid.load();
                        $("#newFlowDialog").modal('hide');
                    } else {
                        alert("操作失败！");
                    }
                }
            })
        }
    });
    $("#newFlowDialog").modal('show');

});

function editFlowPurchasing(id) {
    var dialog = BootstrapUtils.createDialog({
        id: 'editFlowDialog',
        title: '编辑流程',
        width: 700,
        template: "template/flow_purchasing_edit.html",
        init: function() {

            var rows = grid.getRows();
            var row;
            $.each(rows, function(i, r) {
                if (r.id == id) {
                    row = r;
                    return false;
                }
            });
            var dialog = this;

            dialog.find("[name=id]").val(id);
            dialog.find("[name=price_min]").val(row.price_min);
            dialog.find("[name=price_max]").val(row.price_max);
            dialog.find("[name=remark]").val(row.remark);

            dialog.find("[name=fif] option").each(function(i, d) {
                var text = $(d).text();
                if (text == row.fif) {
                    $(d).prop("selected", true);
                } else {
                    $(d).prop("selected", false);
                }
            });


            OACommonSelects.fillDepartmentSelect({
                sel: dialog.find("[name=dept]"),
                defaultValue: row.dept
            });

            OACommonSelects.fillPositionSelect({
                sel: dialog.find("[name=role]"),
                defaultValue: row.role
            });
            OACommonSelects.fillUserSelect({
                sel: dialog.find("[name=dd_man]"),
                defaultValue: row.dd_man
            });
            OACommonSelects.fillUserSelect({
                sel: dialog.find("[name=fspman]"),
                defaultValue: row.fspman
            });



        },
        onConfirm: function() {
            var params = this.getParamMap();
            $.ajax({
                url: 'flowPurchasing!update.do',
                type: 'post',
                data: params,
                success: function(data) {
                    if (data.success) {
                        grid.load();
                        $("#editFlowDialog").modal('hide');
                    } else {
                        alert("操作失败！");
                    }
                }
            })
        }
    });
    $("#editFlowDialog").modal('show');
}
        };
        return module.exports;
    }

    
);