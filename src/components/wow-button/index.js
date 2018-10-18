import './index.json'
import './index.wxml'
import './index.scss'

Component({
    properties: {
        button_txt: {
            type: String,
            value: '',
        },
        button_disabled: {
            type: Boolean,
            value: false,
        },
        button_open_type:  {
            type: String,
            value: '',
        },
        button_use_able: {
            type: Boolean,
            value: false,
        }
    },
    externalClasses: [
        'button-class',
        'button-disabled-class',
        'button-txt-class',
    ],
    data: {
        button_click_able: true
    },
    methods: {
        handleTap () {
            let {
                button_disabled,
                button_use_able,
            } = this.properties;
            if (button_disabled) return;
            let {
                button_click_able,
            } = this.data;
            if (!button_click_able && button_use_able) return;
            button_click_able = false;
            this.setData({button_click_able});
            this.triggerEvent('click', {
                callback: () => {
                    button_click_able = true;
                    this.setData({button_click_able});
                }
            });
        },
        handleGetUserInfo (event) {
            this.triggerEvent('getuserinfo', event.detail);
        }
    },
});
