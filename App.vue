<script>
	
	export default {
		globalData:{
			shareLocation:true,
			PostCompelete:true,
			location:{
				id:'',
				longitude:'',
				latitude:'',
				iconPath:'',
				width:30,
				height:30,
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
