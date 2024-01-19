import { base, products } from './helper.js';
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.14/vue.esm-browser.min.js';
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';
import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.5/esm/axios.js';

const authToken = {
	headers: {
		Authorization: Cookies.get('hexToken') ?? '',
	},
};

const app = createApp({
	data() {
		return {
            isLogin: false,
			products : [],
			temp: {},
		};
	},
	methods: {
		switchImage(img) {
			const index = this.temp.imagesUrl.indexOf(img);

			this.temp.imagesUrl[index] = this.temp.imageUrl;

			this.temp.imageUrl = img;
		},
		async checkLogin() {
			try {
                const result = await axios.post(
                    `${base}/v2/api/user/check`,
                    {},
                    authToken
                );
				this.isLogin = true;	
				this.products = products;
            }
            catch(err){
				const { status } = err.response;
				if (status === 403 || status === 401){
					alert('請重新登入！');
					location.href = 'login.html';
				}
            }

		},
	},
	mounted() {
        this.checkLogin()
    },
});

app.mount('#app');
