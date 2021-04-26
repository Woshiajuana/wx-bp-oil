export default {
    onLoad () {
        wx.showShareMenu();
    },
    onShareAppMessage () {
        return {
            title: '车养护达人选油助手',
            path: '/pages/home/index',
            imageUrl: 'https://castorl-oil.g2digi.com/content/img/fenxiang.jpg',
        }
    },
}
