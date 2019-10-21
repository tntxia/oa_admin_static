(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('menu/list', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        new Vue({
    el: '#app',
    data: {
        menudata: null,
        currentId: null,
        currentView: null
    },
    mounted() {
        this.loadData();
    },
    methods: {
        exportData() {
            $.ajax({
                url: 'menu!export.do',
                data: {

                }
            }).done(function(data) {
                console.log(data);
                var iframe = $("<iframe>");
                iframe.hide();
                $("body").append(iframe);
                iframe.attr("src", "/file_center/file!download.do?uuid=" + data.uuid);
            })
        },
        importData() {
            let file = this.$refs["file"].files[0];
            let formData = new FormData();
            formData.append("file", file);
            $.ajax({
                url: 'menu!importMenu.do',
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
            });
            console.log("file", file);
        },
        loadData() {
            let me = this;
            me.currentView = null;
            $.ajax({
                url: 'menu!list.do'
            }).done(function(res) {
                me.menudata = res;
            })
        },
        toAdd(id) {
            this.currentId = id;
            this.currentView = 'menu-add-view';
        },
        toEdit(row) {
            this.currentId = row.id;
            this.currentView = 'menu-edit-view';
        },
        del(row) {
            if (confirm("删除后无法恢复，是否确认删除")) {
                let me = this;
                $.ajax({
                    url: 'menu!delete.do',
                    data: {
                        id: row.id
                    }
                }).done(function(res) {
                    if (res.success) {
                        me.loadData();
                    } else {
                        alert("删除失败");
                    }
                });
            }
        }
    },
})
    };
    return module.exports;
});