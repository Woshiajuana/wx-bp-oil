import './index.json'
import './index.wxml'
import './index.scss'
import WowPage                      from 'wow-wx/lib/page'

Component({
    options: {
        multipleSlots: true,
        addGlobalClass: true,
    },
    data: { visible: false, privacyContractName: '' },
    properties: {
        btnId: {
            type: String,
            value: 'agree-btn',
        }
    },
    pageLifetimes: {
        show () {
            if (wx.getPrivacySetting) {
                wx.getPrivacySetting({
                    success: (res) => {
                        const { privacyContractName, needAuthorization } = res
                        this.setData({ visible: needAuthorization, privacyContractName })
                        if (!this.data.visible) {
                            this.showPopup()
                        }
                    }
                })
            } else {
                this.showPopup()
            }

        },
    },
    methods: {
        showPopup () {
            if (this.data.flag) return
            this.data.flag = true
            const { modal } = WowPage.wow$.plugins;
            modal.confirm({
                title: '温馨提示',
                content: `1、本油品推荐仅供参考，但最终选油依据须以车辆用户手册或原厂技术公告为准，请核实车辆配置信息，遵守相关推荐机油的标准。\n
2、正确的机油液位对发动机的正常运行非常重要，选油助手的推荐加注量仅供参考，请以车辆用户手册为准。`,
                showCancel: false
            })
        },
        handleOpenPrivacyContract () {
            wx.openPrivacyContract()
        },
        handleExitMiniProgram () {
            wx.exitMiniProgram()
        },
        handleAgreePrivacyAuthorization () {
            this.showPopup()
            this.setData({ visible: false })
        },
    },
})
