import './index.json'
import './index.wxml'
import './index.scss'

Component({
    properties: {
        button_txt: {
            type: String,
            value: '',
        }
    },
    externalClasses: [
        'button-class',
        'button-txt-class',
    ]
});
