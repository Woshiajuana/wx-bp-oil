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
        isPop: false,
    },
    onLoad (options) {
        this.routerGetParams(options);
        this.reqSeriesList();
    },
    onShow () {
        if (this.data.isPop) this.routerPop(3);
    },
    reqSeriesList () {
        let { http } = this.wow$.plugins;
        let { BrandName, SeriesName } = this.data.params$;
        http(http.API.REQ_MODEL_LIST, {
            brandName: BrandName,
            seriesName: SeriesName,
        }).then((res) => {
            this.setData({ arrSourceData: res || [] });
            this.formatData();
        }).toast();
    },
    handleSelect (event) {
        let { item } = event.currentTarget.dataset;
        this.setData({ isPop: true });
        this.routerPush('suitable_index', {
            ...item,
            ...this.data.params$,
            from: 'model_index'
        });
    },
    inputCallback () {
        this.formatData();
    },
    formatData () {
        let { arrSourceData, strKeyword } = this.data;
        let arrData = arrSourceData.filter((item) => item.ModelName.indexOf(strKeyword.trim()) > -1);
        this.setData({ arrData });
    },
});

