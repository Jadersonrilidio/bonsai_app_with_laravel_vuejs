const { default: axios } = require('axios');

window._ = require('lodash');

try {
    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

/**
 * Intercept all requests.
 */
axios.interceptors.request.use(
    config => {

        console.log('REQUEST INTERCEPTED: ', config.headers);

        if (document.cookie.includes('token=')) {
            let token = document.cookie.split(';').find(index => {
                return index.includes('token=');
            });
            token = 'bearer ' + token.split('=')[1];
            config.headers['Authorization'] = token;
        }

        config.headers['Accept'] = 'application/json';

        if (config.method == 'post') {
            config.headers['Content-Type'] = 'multipart/form-data';
            
            console.log("WE'RE HERE!");

        }

        console.log('REQUEST INTERCEPTED: ', config.headers);

        return config;
    },
    error => {

        console.log('REQUEST INTERCEPTED ON ERROR: ', error.response);
        
        return Promise.reject(error);
    }
);

/**
 * Intercept all responses.
 */
axios.interceptors.response.use(
    response => {
        
        console.log('RESPONSE INTERCEPTED: ', response);
        
        return response;
    },
    error => {

        console.log('RESPONSE INTERCEPTED ON ERROR: ', error.response);
        
        if (error.response.status == 401 && error.response.data.message == 'Token has expired') {
            axios.post('http://localhost:8000/api/auth/refresh')
                .then(response => {
                    document.cookie = 'token=' + response.data.access_token + ';SameSite=Lax';
                    
                    console.log('RESPONSE INTERCEPTED: ', 'TOKEN RESTORED => ', document.cookie);

                    window.location.reload();
                })
                .catch(errors => {
                    console.log(errors.response);
                });
        }

        return Promise.reject(error);
    }
);
