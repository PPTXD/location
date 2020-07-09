<template>
	<view class="content">
		
		
		<map  class="map" :longitude="location.longitude"show-location="true" :latitude="location.latitude" :markers="markers" @markertap="launchApp2" ></map>
		
		<!-- <view>
			<button type="primary" @click="launchApp2">打开淘宝</button>
		</view>
		<view>
			  <button @click="opengaode">打开gaode</button> 
		</view> -->
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				location:{
					id:'',
					longitude:'',
					latitude:'',
				},
				mes:'iosamap://viewMap?sourceApplication=Hello%20uni-app&lat=39.9631018208&lon=116.3406135236&dev=0',
				T1:'iosamap://viewMap?sourceApplication=Hello%20uni-app&lat=',
				T2:'&lon=',
				T3:'&dev=0',
				markers:[
					// {
					// 	id:1,
					// 	latitude:'',
					// 	 longitude:'',
					// 	//iconPath:'/../../static/location.jpg',
					// 	//width:30,
					// 	//height:30
					// }
				],
				markers2:[
					 {
					 	id:1,
					 	latitude:'30.066257',
					 	longitude:'119.948038',
					 	iconPath:'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKLUbqLMZavCaia59foZdzO2Cghx8YUklf9K6696micwMwIISjg6AxQUJW4vW6g26zZm8fDrPllSDlA/132',
						width:30,
						height:30
					 }
				],
			}
		},
	
		created() {//实例创建后
			// this.getLocation();	
			var obj=new fu();
			console.log(obj.x);
			console.log(this.fu());
		},
		
		onShow() {//两个页面切换会触发
		if(getApp().globalData.PostCompelete===false&&getApp().globalData.shareLocation===true){//同意分享并且未上传定位
			this.SaveLocation();
			getApp().globalData.PostCompelet=true;
			console.log("打开分享，上传成功");
		}
				this.setmarkers();//设置定位点
			console.log("Show")
		},
		
		onUnLoad() {
			this.deletelocation();
		},
		
		onPullDownRefresh() {
			console.log("下拉了")
			setTimeout(()=>{
				this.setmarkers(()=>{
					uni.stopPullDownRefresh()
				});
			},1000)
		},
		
		methods: {
			fu(){
				var tmp=1;
				this.x=3;
				console.log(tmp);
				console.log(this.x);
			},
			deletelocation(){
				var that=this;
				uni.request({
					url:'http://localhost:8888/user/delete',
					method:'POST',
					data:that.location,
				})
			},
			setmarkers(callback){
				var that=this;
				uni.request({
					url:'http://localhost:8888/user/get',
					success(res) {
						console.log(res.data);
						that.markers=res.data;
						console.log(that.markers);
					},
					fail() {
						console.log("失败");
					}
				 })
				 callback&&callback()
			},
			 opengaode(e){  //plus只能用于APP,也太啰嗦了
				 var that=this;
				 that.mes=this.T1+this.location.latitude+this.T2+this.location.longitude+this.T3;
				 console.log(e.markerId);
			            plus.runtime.openURL(that.mes, function(res) {  
			            });  
			        },  
			launchApp(){
				wx.openLocation({
					latitude:30.066257,
					 longitude:119.948038,
				})
			},
			launchApp2(e){//这种方法是可以适用于小程序和APP都可以的
			 var that=this;
			 for(var i=0;i<that.markers.length;i++){
				 var id=that.markers[i].id;
				 if(id===e.markerId){
					 console.log(that.markers[i].iconpath);
					 wx.openLocation({
					  latitude:Number(that.markers[i].latitude),
					  longitude:Number(that.markers[i].longitude),
				});
				 }
			 }
			},
		getLocation(){
			
			var that=this;
				uni.getLocation({
						type: 'wgs84',
						success: function (res) {
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
							that.location.latitude=res.latitude;
							that.location.longitude=res.longitude;
							getApp().globalData.location.latitude=res.latitude;
							getApp().globalData.location.longitude=res.longitude;
							//that.savelocation();
							if(getApp().globalData.shareLocation===true){
								that.SaveLocation();//可以分享定位，上传定位
							}
						}
					})
				}			
		},
		
	}
</script>

<style>
	.map{
		width: 750rpx;
		height: 750rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
