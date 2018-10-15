import WowCool                          from 'wow-cool'
import Path                             from 'path'
import fs                               from 'fs'
import config                           from '../config'

const { copyArr } = config;

class Copy {
    constructor () {
        this.readable = null;
        this.writable = null;
    }

    mkDirsSync (dirpath, mode) {
        try
        {
            if (!fs.existsSync(dirpath)) {
                let pathtmp;
                dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                    if (pathtmp) {
                        pathtmp = Path.join(pathtmp, dirname);
                    } else {
                        pathtmp = dirname;
                    }
                    if (!fs.existsSync(pathtmp)) {
                        if (!fs.mkdirSync(pathtmp, mode)) {
                            return false;
                        }
                    }
                });
            }
            return true;
        } catch(e) {
            return false;
        }
    }

    copy (from, to) {
        let from_arr_file = fs.readdirSync(from);
        this.mkDirsSync(to);
        from_arr_file.forEach((file) => {
            let from_full_path = Path.join(from, file);
            let to_full_path = Path.join(to, file);
            let from_ext_name = Path.extname(from_full_path);
            let from_file_stat = fs.statSync(from_full_path);
            if (from_file_stat.isFile() && ['.scss'].indexOf(from_ext_name) === -1) {
                this.readable = fs.createReadStream(from_full_path);       // 创建读取流
                this.writable = fs.createWriteStream(to_full_path);      // 创建写入流
                this.readable.pipe(this.writable);
            } else if (from_file_stat.isDirectory()) {
                let to_exists = fs.existsSync(to_full_path);
                !to_exists && this.mkDirsSync(to_full_path);
                this.copy(from_full_path, to_full_path)
            }
        });
        // this.close();
    }

    close () {
        this.readable && this.readable.close();
        this.writable && this.writable.close();
    }


    start (from, to) {
        this.copy(from, to)
    }
}
export default((arr_parameter) => new Promise((resolve, reject) => {
    let num_app_index = WowCool.findFirstIndexForArr(arr_parameter, (item) => {
        return item === '--copy' || item === '-c';
    });
    if (num_app_index) return resolve();
    const copy = new Copy();
    if (copyArr) {
        copyArr.forEach((item, index) => {
            copy.start(Path.join(__dirname, item.from), Path.join(__dirname, item.to));
        })
    }
    return resolve();
}));

export const copy =  new Copy();






