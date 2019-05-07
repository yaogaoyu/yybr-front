/**
 * 定义Cookie操作组件。
 *
 */

const vars = {
    keypre: '', // cookie 前缀
    domain: '', // cookie 域
};

export default class Cookie {
    /*
     * 配置Cookie
     */
    static config(key, value) {
        if (key === 'keypre') vars.keypre = value;
        if (key === 'domain') vars.domain = value;
        return Cookie;
    }

    /*
     * 判断Cookie中是否有指定的数据
     */
    static hasKey(name) {
        const oName = vars.keypre ? vars.keypre + name : name;
        const result = document.cookie.match(new RegExp(`(^| )${oName}=`));
        if (result !== null) {
            return true;
        }
        return false;
    }

    /*
     * 获取cookie
     */
    static get(name) {
        const oName = vars.keypre ? vars.keypre + name : name;
        const result = document.cookie.match(new RegExp(`(^| )${oName}=([^;]*)(;|$)`));

        if (result !== null) {
            try {
                return unescape(result[2]);
            } catch (error) {
                return null;
            }
        }

        return null;
    }

    /*
     * 设置cookie
     * name: cookie 名称
     * value: cookie 值
     * seconds: cookie 有效期（秒）
     */
    static set(oName, oValue, oSeconds) {
        let date = null;
        let expires = '';
        let domain = '';
        let path = '';

        const seconds = oSeconds || 0;

        if (typeof seconds === 'number') {
            date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = `; expires=${date.toGMTString()}`;
        }

        if (vars.domain) domain = `; domain=${vars.domain}`;

        path = '; path=/';

        const name = vars.keypre ? vars.keypre + oName : oName;
        const value = escape(oValue);
        document.cookie = `${name}=${value + expires + domain + path}`;
    }

    /*
     * 删除cookie
     */
    static remove(name) {
        if (typeof name === 'string') {
            if (Cookie.hasKey(name)) {
                Cookie.set(name, '', -10);
            }
        } else {
            name.forEach((value) => {
                if (Cookie.hasKey(value)) {
                    Cookie.set(value, '', -10);
                }
            });
        }
    }
}
