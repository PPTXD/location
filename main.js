import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.SaveLocation=function(){
				//var that=this;
				console.log("save");
				if(getApp().globalData.location.id!==''&&getApp().globalData.PostCompelet===false){
					console.log("他是")
					getApp().globalData.location.id='';
				}
				uni.request({
					url:'http://localhost:8888/user/save',
					method:"POST",
					data:getApp().globalData.location,
					success(res) {
						console.log('地址id是'+res.data+'OK');
						getApp().globalData.location.id=res.data;
						//that.location.id=res.data;
						//that.setmarkers();
					}
				})
			}
const app = new Vue({
    ...App
})
app.$mount()
