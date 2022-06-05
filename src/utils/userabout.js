
import { v4 as uuidv4 } from 'uuid';

export const getUserTempId = () => {
    //先从localStorage当中获取用户临时标识
    let userTempId = localStorage.getItem('GETUSERTEMPID')
    //localStorage获取不到返回的数据为null
    if (!userTempId) {
        //通过uuid重新创建，并且存储到localStorage
        let userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        localStorage.setItem('GETUSERTEMPID', userTempId)
    }
    return userTempId
}