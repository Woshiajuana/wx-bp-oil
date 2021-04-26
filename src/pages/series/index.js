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
        arrSourceData: [],
        arrData: '',
        strKeyword: '',
    },
    onLoad (options) {
        this.routerGetParams(options);
        this.reqSeriesList();
    },
    reqSeriesList () {
        let { http } = this.wow$.plugins;
        let { BrandName } = this.data.params$;
        http(http.API.REQ_SERIES_LIST, {
            brandName: BrandName,
        }).then((res) => {
            this.setData({ arrSourceData: res || [] });
            this.formatData();
        }).toast();
    },
    handleSelect (event) {
        let { item } = event.currentTarget.dataset;
        let { BrandName } = this.data.params$;
        this.routerPush('model_index', { SeriesName: item, BrandName });
    },
    inputCallback () {
        this.formatData();
    },
    formatData () {
        let { arrSourceData, strKeyword } = this.data;
        let arrData = arrSourceData.filter((item) => item.indexOf(strKeyword.trim()) > -1);
        this.setData({ arrData });
    },
});

