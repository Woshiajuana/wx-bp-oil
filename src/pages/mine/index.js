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
}));
