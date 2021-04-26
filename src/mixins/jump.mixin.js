
export default {
    handleJump (event) {
        let { url, params = {}, auth, type = true } = event.currentTarget.dataset;
        let { nickName } = this.data.user$ || {};
        let { modal, router } = this.wow$.plugins;
        if (auth && !nickName) {
            return modal.confirm('使用该功能，请先登录哦').then((res) => {
                let { confirm } = res;
                confirm && this.routerPush('login_index');
            }).null();
        }
        type && this.routerPush(url, params);
    },
    handleRoot (event) {
        let { url, params = {} } = event.currentTarget.dataset;
        this.routerRoot(url, params);
    },
}
