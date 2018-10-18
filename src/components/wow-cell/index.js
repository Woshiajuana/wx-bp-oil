import './index.json'
import './index.wxml'
import './index.scss'

Component({
    properties: {
        cell_label: {
            type: String,
            value: '',
        },
        cell_value: {
            type: String,
            value: '',
        },
        cell_use_arrow: {
            type: Boolean,
            value: true,
        },
        cell_use_input: {
            type: Boolean,
            value: false,
        },
        cell_input_disabled: {
            type: Boolean,
            value: false,
        },
        cell_input_type: {
            type: String,
            value: 'text',
        },
        cell_input_placeholder: {
            type: String,
            value: '请输入',
        },
        cell_input_max: {
            type: Number,
            value: 140,
        }
    },
    externalClasses: [
        'cell-class'
    ],
    methods: {
        handleInput (event) {
            this.triggerEvent('input', event.detail);
        }
    }
});
