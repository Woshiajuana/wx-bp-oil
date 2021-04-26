//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.user,
        WowPage.wow$.mixins.router,
        WowPage.wow$.mixins.share,
    ],
    onLoad (options) {
        this.routerGetParams(options);
    },
    handleGetUser (event) {
        let { userInfo } = event.detail;
        if (!userInfo) return null;
        let code;
        let { modal, http } = this.wow$.plugins;
        this.userLogin().then((res) => {
            code = res;
            return this.userGetInfo();
        }).then((res) => {
            let { avatarUrl, city, country, gender, language, nickName, province } = userInfo;
            let { encryptedData, iv } = res;
            return http(http.API.DO_USER_AUTH, {
                iv,
                code,
                encryptedData,
                user: {
                    AvatarUrl: avatarUrl,
                    City: city,
                    Country: country,
                    Gender: gender,
                    Language: language,
                    NickName: nickName,
                    Province: province,
                },
            }, {
                useAuth: false,
            });
        }).then((res) => {
            return this.userUpdate({ ...userInfo, ...res });
        }).then(() => {
            this.handleRefuse();
        }).catch((err) => {
            if (typeof err === 'object' && err.status === 302) {
                return this.handleGetUser(event);
            }
            modal.toast(err);
        });
    },
    handleRefuse () {
        let { useRoot } = this.data.params$;
        useRoot ? this.routerRoot('home_index', {}, true) : this.routerPop();
    }
});

