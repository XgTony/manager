<script setup>
import { ref,onMounted,getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance()
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

})

</script>

<template>
  <h1 @click="goHome">Login</h1>

</template>

<style scoped>

</style>
