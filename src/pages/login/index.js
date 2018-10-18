//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import MixinUtil                    from 'wow-wx/utils/mixin.util'

const arr_src = [
    { key: 'mine', value: 'mine-icon.png' },
];

Page(MixinUtil({
    data: {

    },
    onShow() {

    },
    onLoad () {
        // this.sourceGet(arr_src);
    },
    handleClick (event) {
        let { callback } = event.detail;
        console.log('提交数据')
        // callback()
    },
    handleGetUserInfo (event) {
        console.log('heihei')
        console.log(event);
    }
}));
