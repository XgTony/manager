<script setup></script>

<template>
	<div class="welcome">
		<div class="content">
			<div class="sub-title">欢迎体验</div>
			<div class="title">OA后台管理系统</div>
			<div class="desc">Vue3.0 + Element Plues + Vuex 技术栈</div>
			<br />
			<div class="desc">mock数据，无后台交互功能</div>
		</div>
		<div class="img"></div>
	</div>
</template>

<style scoped lang="scss">
.welcome {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: #fff;
	.content {
		position: relative;
		top: -30px;
		.sub-title {
			font-size: 30px;
			line-height: 42px;
			color: #333;
		}
		.title {
			font-size: 40px;
			line-height: 62px;
			color: #409eff;
		}
		.desc {
			text-align: right;
			font-size: 14px;
			color: #999;
		}
	}
	.img {
		margin-left: 130px;
		background-image: url('./../assets/images/welcome.png');
		width: 371px;
		height: 438px;
	}
}
</style>
