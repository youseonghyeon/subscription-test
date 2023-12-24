import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_SUBSCRIBE_WAS_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    dataType: 'json',
});

// token을 관리하는 객체 (서버가 구동되면 설정해주어야 함)
const tokenManager = {
    get token() {
        // Retrieve the token from localStorage
        return localStorage.getItem('token') || "";
    },

    set token(value) {
        // Save the new token to localStorage
        localStorage.setItem('token', value);
    }

}

// 요청을 보내기 전 header에 token 추가
instance.interceptors.request.use((config) => {
    const authToken = tokenManager.token;
    if (authToken === "") {
        const userInput = confirm("애플리케이션 키를 상단에 넣어주세요. 키를 확인하시겠습니까?");
        if (userInput === true) {
            window.location.href = import.meta.env.VITE_SUBSCRIBE_WAS_SERVER_URL + "/applications";
        }
    }
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;
export {tokenManager};
