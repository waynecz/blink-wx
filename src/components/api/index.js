import axios from 'axios'

window.axios = axios
window.apiHost = 'http://114.215.110.36:8989/api/v1'

const post = (url, data, option = {loading: false, errmsg: '请求发生异常'}) => {
    return axios({
        url: apiHost + url,
        data: data,
        withCredentials: true,
        method: option.method || 'POST'
    }).catch(e => {
        if (e.response) {
            return e.response
        } else {
            console.warn(e);
        }
    }).then(res => {
        if (/^2\d\d/.test(res.status)) {
            return {
                success: true,
                data: res.data,
                message: ''
            }
        } else {
            let message
            let keys = Object.keys(res.data || {})
            keys.forEach(e => {
                if (res.data[e]) {
                    message = res.data[e]
                }
            })
            return {
                success: false,
                message: message
            }
        }
    })
};

const get = (url, params, option = {loading: false, errmsg: '请求发生异常'}) => {

    return axios({
        url: apiHost + url,
        withCredentials: true,
        params: params ? Object.assign(params, {time: new Date().getTime()}) : {time: new Date().getTime()},
        method: 'GET'
    }).catch(e => {
        if (e.response) {
            return e.response
        } else {
            console.warn(e);
        }
    }).then(res => {
        if (/^2\d\d/.test(res.status)) {
            return {
                success: true,
                data: res.data,
                message: ''
            }
        } else {
            let message
            let keys = Object.keys(res.data.keys || {})
            keys.forEach(e => {
                if (res.data[e]) {
                    message = res.data[e]
                }
            })
            return {
                success: false,
                message: message
            }
        }
    })
};

const APIS = {
    getBanners (actId) {
        const url = `/activities/${actId}/banners/`;
        return get(url, null, {errmsg: '获取banner失败'})
    },
    getJXPhotoList (page, actId) {
        const url = `/activities/${actId}/truing_pictures/`
        return get(url, {page, page_size: 200}, {errmsg: '获取图片失败'})
    },
}

export default APIS