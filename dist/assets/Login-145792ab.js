import{g as y,u as N,r as h,a as P,b as a,o as U,c as t,d as k,e as C,f as u,h as e,w as o,i as z}from"./index-8a49950e.js";const B={class:"login-wrapper"},q={class:"modal"},F=u("div",{class:"title"},"OA后台管理系统",-1),I={class:"form"},E={__name:"Login",setup(L){const{proxy:m}=y(),p=N(),_=h(null),f=P();a({});const r=a({userName:"admin",userPwd:"1234"}),g=a({userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],userPwd:[{required:!0,message:"请输入密码",trigger:"blur"}]});U(()=>{});const w=()=>{_.value.validate(i=>{if(i)m.$api.login(r).then(s=>{console.log(s),p.commit("saveUserInfo",s),f.push("/welcome")});else return!1})};return(i,s)=>{const v=t("User"),d=t("el-icon"),c=t("el-input"),l=t("el-form-item"),V=t("View"),x=t("el-button"),b=t("el-form");return k(),C("div",B,[u("div",q,[e(b,{ref_key:"userForm",ref:_,model:r,"status-icon":"",rules:g},{default:o(()=>[F,u("div",I,[e(l,{prop:"userName"},{default:o(()=>[e(c,{type:"text",modelValue:r.userName,"onUpdate:modelValue":s[0]||(s[0]=n=>r.userName=n),size:"large",disabled:""},{prefix:o(()=>[e(d,null,{default:o(()=>[e(v)]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(l,{prop:"userPwd"},{default:o(()=>[e(c,{type:"password",modelValue:r.userPwd,"onUpdate:modelValue":s[1]||(s[1]=n=>r.userPwd=n),size:"large",disabled:""},{prefix:o(()=>[e(d,null,{default:o(()=>[e(V)]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(l,null,{default:o(()=>[e(x,{type:"primary",class:"btn-login",onClick:w,size:"large"},{default:o(()=>[z("登录")]),_:1})]),_:1})])]),_:1},8,["model","rules"])])])}}};export{E as default};
