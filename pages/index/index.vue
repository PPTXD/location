<template>
	<view>
	
		<view class="row">
			<view>
				<image style="width: 150px; height: 150px;" :src="userInfo.avatarUrl"></image>
			</view>
			<view class="column" >
				<text class="infomation" style="height: 75px;top: 50rpx;">{{userInfo.nickName}}</text>
				<text class="infomation"style="top: auto;">{{userInfo.province}}  {{userInfo.city}}</text>
			</view>
		</view>
		    <view class="switch row">
		        <view style="margin-left: 60rpx;">分享当前定位</view>
				<view style="margin-left: 400rpx;">
					<switch checked @change="switchChange"/>
				</view>
		     </view>
		            
	</view>
</template>

<script>

	export default {
		data() {
			return {
				userInfo:{},
			}
		},
		created() {
			this.login();
		},
		onLoad() {

		},
		methods: {
			switchChange:function(e){
				getApp().globalData.shareLocation=e.target.value;
				if(e.target.value===false){
					getApp().globalData.PostCompelete=false;
					this.deletelocation();
				}
				console.log(getApp().globalData.shareLocation);
				console.log(e.target.value);
				//删除定位
			},
			deletelocation(){
				console.log(getApp().globalData.location);
				uni.request({
					
					url:'http://localhost:8888/user/delete',
					method:'POST',
					data:getApp().globalData.location,
					success() {
						console.log("删除定位成功");
					}
				})
			},
			login(){
				var that=this;
				uni.login({
					provider:"weixin",
					success:function(res){
						uni.getUserInfo({
							provider:"weixin",
							success:function(infoRes){
								console.log(infoRes);
								that.userInfo=infoRes.userInfo;
								getApp().globalData.location.iconPath=that.userInfo.avatarUrl;
								console.log(that.userInfo.nickName);
							}
						})
					}
				
				})
			}

		}
	}
</script>

<style>
	.row {
		display: flex;
		flex-direction: row;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	.switch{
		border-style: solid;
		  border-top-width: 2rpx;
		  border-right-width: 0px;
		  border-bottom-width: 2rpx;
		  border-left-width: 0px;
		border-color: #ccc;
		height: 100rpx;
		line-height: 100rpx;
	}
	.infomation {
		
		font-size: 36rpx;
		top: 100px;
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
