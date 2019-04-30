<template>
</template>
<script>
export default {
	created() {
		this.getUserInfo(this.$route.query.code)
	},
	methods: {
		getUserInfo(code) {
			this.$http.post('https://taoapi.04wu.com/taoapi/info?code=' + code).then(({data}) => {  
				this.userInfo = data
				localStorage.setItem("adzoneid", data.adzoneid)
				localStorage.setItem("headimgurl", data.headimgurl)
				localStorage.setItem("jdadzoneid", data.jdadzoneid)
				localStorage.setItem("openid", data.openid)
				localStorage.setItem("sex", data.sex)
				localStorage.setItem("level", data.level)
				localStorage.setItem("nickname", data.nickname)
				this.$router.push({ path:'/mine'})
		    })
		}
	}
}
</script>