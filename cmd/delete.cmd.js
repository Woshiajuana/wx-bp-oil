
import wowCool          from 'wow-cool'
import fs               from 'fs-extra'
import path             from 'path'
import log              from './../tools/log.tool'


/**
 * 发布环境
 * */
export default((arr_parameter) => new Promise((resolve, reject) => {
    let num_release_index = wowCool.findFirstIndexForArr(arr_parameter, (item) => {
        return item === '--delete' || item === '-d';
    });
    let str_release = (num_release_index !== -1 && arr_parameter[num_release_index + 1]);
    str_release = str_release ? str_release.toLocaleLowerCase() : '';
    if (!str_release) return;
    let dir = path.join(__dirname, '../', str_release);
    log(`即将清除${dir}目录`);
    emptyDir(dir);
    log(`清除${dir}目录成功`);

}));

function emptyDir(fileUrl) {
    try {
        fs.emptyDirSync(fileUrl)
    } catch(e) {
        log(e, '004');
        log(`重新清除${fileUrl}目录`);
        emptyDir(fileUrl);
    }
}

