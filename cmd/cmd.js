
import copy             from './copy.cmd'
import page             from './page.cmd'
import ip               from './ip.cmd'
import release          from './release.cmd'
import deletes          from './delete.cmd'

const parameters = process.argv.splice(2);
const arr = [
    page,
    copy,
    ip,
    release,
    deletes,
];

(function fireFun(index) {
    arr[index] && arr[index](parameters).then(() => {
        return fireFun(++index);
    })
})(0);
