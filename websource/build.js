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
        console.log("file", file);
        let target = "../modules/" + (group ? group + "/" : "") + (group ? group + "_" : "") + name + ".module.js";
        buildModuleFile((group ? group + "_" : "") + name, file, target);
    })

    let components = obj.components;
    components.forEach(comp => {
        // 当组件属性为激活才去编译，避免太慢
        if (!comp.active) {
            return;
        }
        buildCompFile(comp);
    });

});

function buildCompFile(c) {

    let buildTemplateFile = './build/template/component.js';
    let buildTemplateFileContent = fs.readFileSync(buildTemplateFile).toString();
    let buildRenderer = _.template(buildTemplateFileContent);

    let initContent = [];
    let name = c.name;
    let group = c.group;
    let optionsjsFile = "components/" + (group ? group + "/" : '') + name + ".js";
    let options = fs.readFileSync(optionsjsFile);
    initContent.push(options);
    let templateFile = "components/" + (group ? group + "/" : '') + name + ".html";
    if (templateFile) {
        let template = fs.readFileSync(templateFile);
        initContent.push('module.exports.template = ' + JSON.stringify(template.toString()));
    }

    let res = buildRenderer({
        name: (group ? group + "-" : '') + name,
        init: initContent.join("\n")
    })

    let distFile = "../components/" + (group ? group + "/" : '') + (group ? group + "-" : '') + name + ".js";
    fs.writeFile(distFile, res, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(distFile, "构建完成");
    });
}

function buildModuleFile(name, moduleFile, target) {
    let templateFile = './build/template/module.js';
    let templeteContent = fs.readFileSync(templateFile).toString();
    let moduleFileContent = fs.readFileSync(moduleFile).toString();
    let templateRenderer = _.template(templeteContent);
    let res = templateRenderer({
        name: name,
        init: moduleFileContent
    });
    fs.writeFile(target, res, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(target, "生成完成");
    });
}