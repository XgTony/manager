<script setup>

</script>

<template>
    <div class="base-layout">
        <div class="nav-side">111</div>
        <div class="content-right">
            <div class="nav-top">
                <div class="bread">123</div>
                <div class="userInfo">234</div>
            </div>
            <div class="wrapper">
                <div class="main-page"><router-view ></router-view></div>
            </div>
        </div>
    </div>

</template>


<style scoped lang="scss">
.base-layout {
    position: relative;
    .nav-side {
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        color: #fff;
        overflow-y: auto;
        transition: width 0.5s;
    }
    .content-right {
        margin-left: 200px;
        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;
        }
        .wrapper {
            background-color: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);
            .main-page {
                background-color: #fff;
                height: 100%;
            }
        }
    }
}
</style>