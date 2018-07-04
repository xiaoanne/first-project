const
    glob         = require('glob'),
    protractor   = require.resolve('protractor'),
    node_modules = protractor.substring(0, protractor.lastIndexOf('node_modules') + 'node_modules'.length),
    seleniumJar  = glob.sync(`${node_modules}/protractor/**/selenium-server-standalone-*.jar`).pop(),
    crew         = require('serenity-js/lib/stage_crew');

exports.config = {

    baseUrl: 'http://todomvc.com',

    seleniumServerJar: seleniumJar,
    
    directConnect: true,

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    disableChecks: true,

    // https://github.com/protractor-cucumber-framework/protractor-cucumber-framework#uncaught-exceptions
    ignoreUncaughtExceptions: true,

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [ 'features/**/*.feature' ],

    serenity: {
        stageCueTimeout: 30*1000,
        dialect: 'cucumber',
        crew: [
            crew.serenityBDDReporter('./features', './artifacts'),
            crew.Photographer(),
            crew.consoleReporter()
        ]
    },

    cucumberOpts: {
        require:    [ 'features/**/*.ts' ],
        format:     'pretty',
        compiler:   'ts:ts-node/register'
    },

    // capabilities: {
    //     browserName: 'chrome',
    //     chromeOptions: {
    //         args: [
    //             'disable-infobars', '--start-maximized'
    //             // 'incognito',
    //             // 'disable-extensions',
    //             // 'show-fps-counter=true'
    //         ]
    //     }
    // }

    capabilities: {
        browserName: 'firefox',
        // 'moz:firefoxOptions': {
        //     'args': ['--safe-mode', '--headless'],
        //     'binary': './spec/support'
        // }
    },
};
