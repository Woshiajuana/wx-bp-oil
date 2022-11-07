//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.input,
        WowPage.wow$.mixins.jump,
        WowPage.wow$.mixins.share,
    ],
    data: {
        useSave: true,
        arrHistory: [],
        numIndex: 1,
        numSize: 5,
        numTotal: 0,
        strVin: '',
        numTabIndex: 0,
        isPopup: false,

        status: -1,
    },
    onShow () {
        const refresh = () => {
            this.userGet().then(() => {
                this.setData({ numIndex: 1 });
                this.assignmentData();
                this.reqHistoryList();
            }).catch(() => {
                this.setData({ numIndex: 1, numTotal: 0, arrHistory: []});
            });
        }
        const { modal } = this.wow$.plugins;
        if (this.data.status === -1) {
            wx.request({
                url: 'https://bpoil.castrol.com.cn/change.json',
                success: (response) => {
                    this.setData({ status: +response.data })
                    if (this.data.status === 0) {
                        modal.confirm({
                            title: '温馨提示',
                            content: `1、本油品推荐仅供参考，但最终选油依据须以车辆用户手册或原厂技术公告为准，请核实车辆配置信息，遵守相关推荐机油的标准。\n
2、正确的机油液位对发动机的正常运行非常重要，选油助手的推荐加注量仅供参考，请以车辆用户手册为准。`,
                            showCancel: false
                        })
                        refresh()
                    } else if (this.data.status === 2) {
                        modal.confirm({
                            title: '温馨提示',
                            content: `新版小程已上线，确认立即跳转`,
                            showCancel: false
                        }).then(() => {
                            this.jumpMini()
                        }).null()
                    }
                },
                fail: (err) => {
                    console.log('err => ', err)
                }
            })
        } else if (this.data.status === 0) {
            refresh()
        }
    },
    jumpMini () {
        wx.navigateToMiniProgram({
            appId: 'wx7d543573313f1111', // 小程序appid
            envVersion: 'release',
            success (res) {
                console.log('打开成功 => ', res);
            },
            fail (err) {
                console.log('打开失败 => ', err);
            },
        })
    },
    assignmentData () {
        let { store } = this.wow$.plugins;
        store.get('USE_SAVE_HISTORY')
            .then((res) => this.setData({ useSave: res }))
            .catch(() => this.inputCallback());
    },
    reqHistoryList () {
        let { http } = this.wow$.plugins;
        let { numIndex, numSize, arrHistory } = this.data;
        http(http.API.REQ_HISTORY_LIST, {
            pageIndex: numIndex,
            pageSize: numSize,
        }).then((res) => {
            let { Total, List } = res;
            arrHistory = numIndex === 1 ? List || [] : [...arrHistory, ...List];
            this.setData({ arrHistory, numTotal: Total || 0 });
        }).toast();
    },
    handleOcr () {
        let { modal, image, http } = this.wow$.plugins;
        let { user$ } = this.data;
        if (!user$.nickName) {
            return modal.confirm('使用该功能，请先登录哦').then((res) => {
                let { confirm } = res;
                confirm && this.routerPush('login_index');
            }).null();
        }
        modal.actionSheet(['从手机相册选择', '拍照']).then((res) => {
            let sourceType = [['album'], ['camera']];
            if (res.cancel)
                return null;
            return image.choose({sourceType: sourceType[res.tapIndex]});
        }).then((res) => {
            if (!res) return Promise.reject('处理图片失败');
            return this.transformBase64(res.tempFilePaths[0]);
        }).then((res) => {
            http(http.API.REQ_OIL_INFO_BY_IMAGE, {
                imgBase64: res,
            }).then((res) => {
                this.setData({ strVin: res || '' });
            }).toast();
        }).null();
    },
    transformBase64 (filePath) {
        return new Promise((resolve, reject) => {
            wx.getFileSystemManager().readFile({
                filePath, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: (res) => {
                    resolve(res.data);
                },
                fail: (err) => reject(err),
            })
        });
    },
    handleLoad () {
        let { numTotal, arrHistory, numIndex } = this.data;
        if (arrHistory.length < numTotal) {
            this.setData({ numIndex: numIndex + 1 });
            this.reqHistoryList();
        }
    },
    inputCallback () {
        let { store } = this.wow$.plugins;
        store.set('USE_SAVE_HISTORY', this.data.useSave);
    },
    handleSearch () {
        let { modal, router, http  } = this.wow$.plugins;
        let { user$, strVin = '' } = this.data;
        if (!user$.nickName) {
            return modal.confirm('使用该功能，请先登录哦').then((res) => {
                let { confirm } = res;
                confirm && this.routerPush('login_index');
            }).null();
        }
        if (!strVin) return modal.toast('请输入17位VIN码');
        // if (strVin.trim().length !== 17) return modal.toast('VIN码输入有误');
        // LGBR4DE49FR007718
        http(http.API.REQ_OIL_INFO_BY_VIN, {
            vinCode: strVin,
        }).then((res = {}) => {
            this.routerPush('suitable_index', { from: 'home_index', data: res });
            this.setData({ strVin: '' });
        }).toast();
    },
});

