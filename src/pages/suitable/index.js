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
        current: 0,
        arrData: [],
        oilCurrent: 0,
    },
    onLoad (options) {
        this.routerGetParams(options);
        this.doSubHistory();
        this.reqOilInfo();
    },
    handleChange (event) {
        this.setData({ current: event.detail.current, oilCurrent: 0 });
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
            return this.formatData(params$.data);
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
        let arrData = [];
        if (!Array.isArray(res)) {
            res = [res];
        }
        res.forEach(item => {
            let { CarInfo, OilList = [], GearBoxOilList = [] } = item || {};
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
            arrData.push({
                objCarInfo: CarInfo || {},
                arrArrOilData,
                arrGearBoxOilList: GearBoxOilList || [],
            });
        });

        this.setData({ arrData });
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
});
