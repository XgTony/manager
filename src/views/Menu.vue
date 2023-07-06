
<script setup>
import { ref } from 'vue'
// import utils from '@/'

const json_data = ref(
    [
{
    数学:"20",
    语文:"30",
}
]
)
const fields = {
    数学: "数学",
    语文: "语文"
}
</script>
<template>
    <div>
        <download-excel types="xls" :data="dataArr" :fields="fields" :name="exportName" :worksheet="exportSheet"
            :header="exportHeader" :footer="exportFooter" :defaultValue="exportDefaultValue">
            <el-button type="success">导出</el-button>
        </download-excel>
        <vue3-json-excel :json-data="json_data" :fields="fields">
            Download Data
        </vue3-json-excel>

    </div>
</template>