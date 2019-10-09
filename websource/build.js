var fs = require("fs");

var _ = require("./lib/underscore.js");

let cache = getCache();

fs.readFile("package.json", "utf8", (err, content) => {

    let obj = JSON.parse(content);

    let modules = obj.modules;
    modules.forEach(m => {
        let name = m.name;
        let group = m.group;
        let leftbar = !!m.leftbar;

        let moduleName = (group ? group + "/" : '') + name;
        let file = "modules/" + moduleName + ".js";
        if (isNeedBuild(file)) {
            console.log("准备编译模块", name);
            let stat = fs.statSync(file);
            let mtimeMs = stat.mtimeMs;
            setCache(file, mtimeMs);
            let target = "../modules/" + moduleName + ".module.js";
            buildModuleFile(moduleName, leftbar, file, target);
        }
    })

    let components = obj.components;
    components.forEach(comp => {
        // 当组件属性为激活才去编译，避免太慢
        if (!comp.active) {
            return;
        }
        console.log("开始编译组件", comp.group, comp.name);
        buildCompFile(comp);
    });

    fs.writeFileSync(".cache", JSON.stringify(cache));

});

function getCache() {
    let cacheExist = fs.existsSync(".cache");
    if (!cacheExist) {
        return null;
    }
    let cacheContent = fs.readFileSync(".cache");
    let cache = JSON.parse(cacheContent);
    return cache;
}

function setCache(key, value) {
    if (!cache) {
        cache = {};
    }
    cache[key] = value;
}

function isNeedBuild(file) {
    let stat = fs.statSync(file);
    let mtimeMs = stat.mtimeMs;
    if (cache && cache[file] === mtimeMs) {
        return false;
    }
    return true;
}

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
    });
}

function buildModuleFile(name, leftbar, moduleFile, target) {
    let templateFile = './build/template/module.js';
    let templeteContent = fs.readFileSync(templateFile).toString();
    let moduleFileContent = fs.readFileSync(moduleFile).toString();
    let templateRenderer = _.template(templeteContent);
    let res = templateRenderer({
        name: name,
        init: moduleFileContent,
        leftbar: leftbar
    });
    fs.writeFile(target, res, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}