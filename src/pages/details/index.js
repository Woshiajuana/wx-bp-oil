//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.input,
        WowPage.wow$.mixins.share,
    ],
    data: {
        isLoading: true,
    },
    onLoad (options) {
        this.routerGetParams(options);
    },
});
