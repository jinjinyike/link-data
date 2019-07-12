import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'
// import router from 'umi/router';

const prifix = '/api';

const fetch = (options) => {
    let {
        method = 'get',
        data,
        url
    } = options

    url = prifix + url;

    const cloneData = cloneDeep(data)

    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, {params: cloneData})
        case 'delete':
            return axios.delete(url, {data: cloneData})
        case 'post':
            return axios.post(url, cloneData)
        case 'put':
            return axios.put(url, cloneData)
        case 'patch':
            return axios.patch(url, cloneData)
        default:
            return axios(options)
    }
}

export default function request(options) {

    return fetch(options).then((response) => {
        const {statusText, status} = response
        let data = response.data;
        if(data instanceof Object){
            if(data.code === 401) {
                window.location.replace('/')
                // router.replace('/');
                return;
            }
            if (data.code !== 0) {
                return Promise.reject({success: false, statusCode: status, message: data.desc})
            } else {
                return Promise.resolve({
                    success: true,
                    message: statusText,
                    statusCode: status,
                    ...data
                })
            }
        }else{
            return Promise.resolve({
                success: true,
                message: statusText,
                statusCode: status,
                data
            })
        }
    }).catch((error) => {
        const {response} = error
        let msg
        let statusCode
        if (response && response instanceof Object) {
            const {data, statusText} = response
            statusCode = response.status
            msg = data.message || statusText
        } else {
            statusCode = 600
            msg = error.message || 'Network Error'
        }
        return Promise.reject({success: false, statusCode, message: msg})
    })
}
