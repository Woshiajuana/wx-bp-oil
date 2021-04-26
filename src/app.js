import './project.config.json'
import './app.json'
import './app.scss'
import './wxs/filter.wxs'
import './utils/es6promise.util'
import './utils/ald-stat'
import './sitemap.json'

import WowApp                       from 'wow-wx'

let files = require.context('./mixins', false, /.js$/);
files.keys().forEach((key) => {
    let newKey = key.substring(2, key.indexOf('.mixin'));
    WowApp.use('mixins', newKey, files(key).default);
});
files = require.context('./config', false, /.js$/);
files.keys().forEach((key) => {
    if (['./env.bd.config.js', './env.cs.config.js', './env.sc.config.js'].indexOf(key) > -1) return;
    let newKey = key.substring(2, key.indexOf('.config'));
    WowApp.use('config', newKey, files(key).default);
});
files = require.context('./plugins', false, /.js$/);
files.keys().forEach((key) => {
    let newKey = key.substring(2, key.indexOf('.plugin'));
    WowApp.use('plugins', newKey, files(key).default);
});
files = require.context('./utils', false, /.js$/);
files.keys().forEach((key) => {
    if (key.indexOf('.util') > -1) {
        let newKey = key.substring(2, key.indexOf('.util'));
        WowApp.use('utils', newKey, files(key).default || files(key));
    }
});

WowApp({
    onLaunch () {
        console.log('【SUCCESS】加载成功 => ', this.wow$);
    },
    onError (msg) {
        console.log('【ERROR】发生错误 => ', msg);
    },
    onPageNotFound () {
        this.wow$.plugins.router.push('home_index');
    },
});
