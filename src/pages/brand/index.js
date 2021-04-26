//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

let strTimer = null;

WowPage({
    mixins: [
        WowPage.wow$.mixins.input,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.share,
    ],
    data: {
        arrData: [],
        isShowTag: false,
        strKey: '',
        arrKey: '',
        numScrollTop: 0,
        strKeyword: '',
        arrSourceData: [],
    },
    onLoad () {
        this.reqBrandList();
    },
    reqBrandList () {
        let { http, modal } = this.wow$.plugins;
        http(http.API.REQ_BRAND_LIST).then((res) => {
            let arrSourceData = res || [];
            this.setData({ arrSourceData });
            this.formatData();
        }).toast();
    },
    inputCallback (item, value) {
        if (item === 'strKey') {
            clearTimeout(strTimer);
            this.setData({ isShowTag: true });
            strTimer = setTimeout(() => this.setData({ isShowTag: false }), 1000);
        } else if (item === 'strKeyword') {
            this.formatData();
        }
    },
    formatData () {
        let arrData = [];
        let arrKey = [];
        let { arrSourceData, strKeyword } = this.data;
        arrSourceData.forEach((item) => {
            let { BrandName, Letter, LogoPath } = item;
            let isHave = BrandName.indexOf(strKeyword.trim()) > -1;
            if (!isHave) return null;
            if (arrKey.indexOf(Letter) === -1) {
                let objData = {};
                arrKey.push(Letter);
                objData.Letter = Letter;
                objData.data = [item];
                arrData.push(objData);
            } else {
                arrData[arrData.length - 1].data.push(item);
            }
        });
        this.setData({ arrSourceData, arrData, arrKey, strKey: arrKey[0] || '' });
    },
    handleSelect (event) {
        let { item } = event.currentTarget.dataset;
        this.routerPush('series_index', item);
    },
});
