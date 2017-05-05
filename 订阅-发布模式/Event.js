/**
 * Created by CBDTTF on 2017/5/5.
 *
 */

var Event = (function () {

    var clientList = {};
    var listen;
    var trigger;
    var remove;

    /**
     * 监听事件
     * @param key
     * @param fn
     */
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    /**
     * 触发事件
     * @returns {boolean}
     */
    trigger = function () {
        var key = Array.prototype.shift.call(arguments);
        var fns = clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0; i < fns.length; i++) {
            // console.log(this);
            fns[i].apply(this, arguments);
        }
    };

    /**
     * 删除监听的事件
     * @param key
     * @param fn
     * @returns {boolean}
     */
    remove = function (key, fn) {
        var fns = clientList[key];

        if (!fns) {
            return false;
        }

        if (!fn) {

            fns && (fns.length = 0);
        } else {

            for (var i = 0; i < fns.length; i++) {
                var _fn = fns[i];

                if (_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }

})();
