var fs = require("fs");

var _ = require("./lib/underscore.js");

fs.readFile("package.json", "utf8", (err, content) => {

    let obj = JSON.parse(content);

    let modules = obj.modules;
    modules.forEach(m => {
        // 当组件属性为激活才去编译，避免太慢
        if (!m.active) {
            return;
        }
        let name = m.name;
        let group = m.group;
        let file = "modules/" + (group ? group + "/" : '') + name + ".js";
        fs.writeFileSync(file, "");
    })

    let components = obj.components;
    components.forEach(comp => {
        // 当组件属性为激活才去编译，避免太慢
        if (!comp.active) {
            return;
        }
        let name = comp.name;
        let group = comp.group;
        if (group) {
            let groupDir = "components/" + group;
            if (!fs.existsSync(groupDir)) {
                fs.mkdirSync(groupDir);
            }
        }
        let template = "components/" + (group ? group + "/" : "") + name + ".html";
        fs.writeFileSync(template, "");
        let options = "components/" + (group ? group + "/" : "") + name + ".js";
        fs.writeFileSync(options, "");
    });

});