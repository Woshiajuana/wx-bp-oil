//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.jump,
        WowPage.wow$.mixins.share,
    ],
    data: {
        objData: '',
        objCarInfo: '',
        arrArrOilData: [],
        arrGearBoxOilList: [],
    },
    onLoad (options) {
        this.routerGetParams(options);
        this.doSubHistory();
        this.reqOilInfo();
    },
    doSubHistory () {
        let { http, store } = this.wow$.plugins;
        let {
            BrandName,
            SeriesName,
            ModelDriver,
            ModelName,
            ModelYear,
            SpeedChangeDescribe,
            from,
        } = this.data.params$;
        if (from !== 'model_index' ) return null;
        store.get('USE_SAVE_HISTORY').then((res) => {
            if (!res) throw '无需保存';
            return http(http.API.DO_SUB_HISTORY, {
                brandName: BrandName,
                seriesName: SeriesName,
                modelDriver: ModelDriver,
                modelName: ModelName,
                modelYear: ModelYear,
                speedChangeDescribe: SpeedChangeDescribe,
            });
        }).then(() => {}).null();
    },
    reqOilInfo () {
        let { params$ } = this.data;
        if (params$.from === 'home_index') {
            return this.formatData(params$);
        }
        let { http } = this.wow$.plugins;
        let {
            BrandName,
            SeriesName,
            ModelDriver,
            ModelName,
            ModelYear,
            SpeedChangeDescribe,
        } = this.data.params$;
        http(http.API.REQ_OIL_INFO, {
            brandName: BrandName,
            seriesName: SeriesName,
            modelDriver: ModelDriver,
            modelName: ModelName,
            modelYear: ModelYear,
            speedChangeDescribe: SpeedChangeDescribe,
        }).then((res) => {
            this.formatData(res);
        }).toast();
    },
    formatData (res) {
        let { CarInfo, OilList = [], GearBoxOilList = [] } = res || {};
        let arrArrOilData = [];
        if (OilList) {
            for (let i = 0, len = OilList.length; i < len; i ++) {
                if (i % 3 === 0) {
                    arrArrOilData.push([OilList[i]]);
                } else {
                    arrArrOilData[arrArrOilData.length -1].push(OilList[i]);
                }
            }
        }
        GearBoxOilList.forEach((item) => {
            item.JieTouXingHaos = item.JieTouXingHao.split(';');
            item.JieTouXingHaoImgs = item.JieTouXingHaoImg.split(';');
        });
        this.setData({ objCarInfo: CarInfo || {}, arrArrOilData, arrGearBoxOilList: GearBoxOilList || [] });
    },
    handlePreview (event) {
        let {
            url = '',
        } = event.currentTarget.dataset;
        let urls = url.split(';');
        console.log('urls => ', url.split(';'));
        wx.previewImage({
            current: urls[0],
            urls,
            success: (res) => { console.log(res) },
            fail: (err) => { console.log(err) },
        });
    },
    handleTelConfirm () {
        let tel = '4000353585';
        wx.makePhoneCall({ phoneNumber: tel });
    },
});
