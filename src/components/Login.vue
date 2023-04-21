<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const count = ref(0)
const router = useRouter()
const goHome = () => {
	router.push('/welcome')
}
onMounted(() => {



  proxy.$request({
    method:'get',
    url:'/login',
    data:{
      name:'jack'
    }
  }).then((result) => {
    console.log(result);
  }).catch((err) => {

  });
</script>

<template>
	<h1 @click="goHome">Login</h1>
</template>

<style scoped></style>
