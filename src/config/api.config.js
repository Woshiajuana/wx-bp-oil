

export default {

    // 授权登录
    DO_USER_AUTH: 'AppletApi/UserAuthorize',

    // 获取车主(用户)资料信息
    REQ_USER_INFO: 'User/GetUserInfo',

    // 提交车主用户信息
    DO_SUB_USER_INFO: 'User/PostUserInfo',

    // 获取品牌列表
    REQ_BRAND_LIST: 'CarInfo/GetAllCarBrand',

    // 获取车系列表
    REQ_SERIES_LIST: 'CarInfo/GetCarSeries',

    // 获取车型列表
    REQ_MODEL_LIST: 'CarInfo/GetCarModels',

    // 获取有品信息
    REQ_OIL_INFO: 'CarInfo/GetCarOilInfos',

    // 获取搜索历史
    REQ_HISTORY_LIST: 'User/GetUserQueryHistoryInfo',

    // 提交搜索历史
    DO_SUB_HISTORY: 'User/PostUserQueryInfo',

    // 车架号查询接口
    REQ_OIL_INFO_BY_VIN: 'CarInfo/GetCarOilInfosByVIN',

    // 上传 OCR 图片
    REQ_OIL_INFO_BY_IMAGE: 'CarInfo/GetCarOilInfosByOCR',

}
