const path = require('path');
const fs = require('fs');
const DEV_CONFIG_PATH = '../dev.config.json';
const PROD_CONFIG_PATH = '../prod.config.json';
const PROJECT_CONFIG_PATH = '../project.config.json';

const APP_DEV_CONFIG_PATH = '../src/configs/app.dev.json';
const APP_PROD_CONFIG_PATH = '../src/configs/app.prod.json';
const APP_CONFIG_PATH = '../src/configs/app.json';
function ToolConfigLoader (env) {
    switch (env) {
        case 'dev': {
            loadConfig(DEV_CONFIG_PATH, PROJECT_CONFIG_PATH);
            loadConfig(APP_DEV_CONFIG_PATH, APP_CONFIG_PATH);
            break;
        }
        case 'prod': {
            loadConfig(PROD_CONFIG_PATH, PROJECT_CONFIG_PATH);
            loadConfig(APP_PROD_CONFIG_PATH, APP_CONFIG_PATH);
            break;
        }
        default: {
            loadConfig(DEV_CONFIG_PATH, PROJECT_CONFIG_PATH);
            loadConfig(APP_DEV_CONFIG_PATH, APP_CONFIG_PATH);
            break;
        }
    }
}

function loadConfig (configPath, distConfigPath) {
    configPath = path.join(__dirname, configPath);
    distConfigPath = path.join(__dirname, distConfigPath);
    fs.readFile(configPath, 'utf8', function (error, config) {
        if (error) {
            //console.log('set front env config fail', error);
        } else {
            fs.writeFile(distConfigPath, config, function () {});
        }
    });
}

ToolConfigLoader.prototype.apply = compler => {

}

module.exports = ToolConfigLoader;

