import{u as f}from"./utils-64b53f9e.js";import{g as G,r as d,o as H,b as S,c as p,d as b,e as M,f as n,h as e,w as a,i as _,F as J,k as K,m as U,y as O,t as i,l as m}from"./index-8a49950e.js";const P={class:"user-manage"},Q={class:"query-form"},W={class:"base-table"},X=n("div",{class:"action"},null,-1),Y={class:"dialog-footer"},te={__name:"Approve",setup(Z){const{proxy:g}=G(),x=d(null),k=d(null),w=d({applyState:""});let u=d({});const T=d({total:1,pageSize:1});g.$store.state.userInfo;const h=d([]),y=d(!1),F=d([{label:"单号",prop:"orderNo"},{label:"申请人",prop:"",formatter(t){return t.applyUser.userName}},{label:"休假时间",prop:"",formatter(t){return f.formateDate(new Date(t.startTime),"yyyy-MM-dd")+"到"+f.formateDate(new Date(t.endTime),"yyyy-MM-dd")}},{label:"休假时长",prop:"leaveTime"},{label:"休假类型",prop:"applyType",formatter(t,l,r){return{1:"事假",2:"调休",3:"年假"}[r]}},{label:"休假原因",prop:"reasons"},{label:"申请时间",prop:"createTime",width:180,formatter:(t,l,r)=>f.formateDate(new Date(r))},{label:"审批人",prop:"auditUsers"},{label:"当前审批人",prop:"curAuditUserName"},{label:"审批状态",prop:"applyState",formatter:(t,l,r)=>({1:"待审批",2:"审批中",3:"审批拒绝",4:"审批通过",5:"作废"})[r]}]);H(()=>{C()});const C=async()=>{let t=await g.$api.getApplyList();h.value=t.list},$=()=>{},A=t=>{console.log(t);let l={...t};l.applyTypeName={1:"事假",2:"调休",3:"年假"}[l.applyType],l.time=f.formateDate(new Date(l.startTime),"yyyy-MM-dd")+"到"+f.formateDate(new Date(l.endTime),"yyyy-MM-dd"),l.applyStateName={1:"待审批",2:"审批中",3:"审批拒绝",4:"审批通过",5:"作废"}[l.applyState],u.value=l,y.value=!0},z=()=>{};S({applyType:1,startTime:"",endTime:"",leaveTime:"0天",reasons:""});const B={remark:[{required:!0,message:"请输入审核备注",trigger:"change"}]},v=S({remark:""}),L=()=>{y.value=!1,k.value.resetFields()},D=t=>{k.value.validate(async l=>{if(l){v.remark,u.value._id;try{L(),g.$message.success("处理成功"),C()}catch{}}})};return(t,l)=>{const r=p("el-option"),q=p("el-select"),s=p("el-form-item"),c=p("el-button"),N=p("el-form"),V=p("el-table-column"),I=p("el-table"),E=p("el-pagination"),R=p("el-input"),j=p("el-dialog");return b(),M("div",P,[n("div",Q,[e(N,{ref_key:"form",ref:x,inline:!0,model:w.value},{default:a(()=>[e(s,{label:"审批状态",prop:"applyState"},{default:a(()=>[e(q,{modelValue:w.value.applyState,"onUpdate:modelValue":l[0]||(l[0]=o=>w.value.applyState=o)},{default:a(()=>[e(r,{value:"",label:"全部"}),e(r,{value:1,label:"待审批"}),e(r,{value:2,label:"审批中"}),e(r,{value:3,label:"审批拒绝"}),e(r,{value:4,label:"审批通过"}),e(r,{value:5,label:"作废"})]),_:1},8,["modelValue"])]),_:1}),e(s,null,{default:a(()=>[e(c,{type:"primary",onClick:C},{default:a(()=>[_("查询")]),_:1}),e(c,{onClick:l[1]||(l[1]=o=>$("form"))},{default:a(()=>[_("重置")]),_:1})]),_:1})]),_:1},8,["model"])]),n("div",W,[X,e(I,{data:h.value},{default:a(()=>[(b(!0),M(J,null,K(F.value,o=>(b(),U(V,{key:o.prop,prop:o.prop,label:o.label,width:o.width,formatter:o.formatter},null,8,["prop","label","width","formatter"]))),128)),e(V,{label:"操作",width:"150"},{default:a(o=>[[1,2].includes(o.row.applyState)?(b(),U(c,{key:0,size:"mini",onClick:ee=>A(o.row)},{default:a(()=>[_("审核")]),_:2},1032,["onClick"])):O("",!0)]),_:1})]),_:1},8,["data"]),e(E,{class:"pagination",background:"",layout:(t.prev,T.value,t.next),total:T.value.total,"page-size":T.value.pageSize,onCurrentChange:z},null,8,["layout","total","page-size"])]),e(j,{title:"审核",width:"50%",modelValue:y.value,"onUpdate:modelValue":l[5]||(l[5]=o=>y.value=o),"destroy-on-close":""},{footer:a(()=>[n("span",Y,[e(c,{onClick:l[3]||(l[3]=o=>D("pass"))},{default:a(()=>[_("审核通过")]),_:1}),e(c,{onClick:l[4]||(l[4]=o=>D("refuse")),type:"primary"},{default:a(()=>[_("驳回")]),_:1})])]),default:a(()=>[e(N,{ref_key:"dialogForm",ref:k,model:v,"label-width":"120px","label-suffix":":",rules:B},{default:a(()=>[e(s,{label:"申请人"},{default:a(()=>[n("div",null,i(m(u).applyUser.userName),1)]),_:1}),e(s,{label:"休假类型"},{default:a(()=>[n("div",null,i(m(u).applyTypeName),1)]),_:1}),e(s,{label:"休假时间"},{default:a(()=>[n("div",null,i(m(u).time),1)]),_:1}),e(s,{label:"休假时长"},{default:a(()=>[n("div",null,i(m(u).leaveTime),1)]),_:1}),e(s,{label:"休假原因"},{default:a(()=>[n("div",null,i(m(u).reasons),1)]),_:1}),e(s,{label:"审批状态"},{default:a(()=>[n("div",null,i(m(u).applyStateName),1)]),_:1}),e(s,{label:"审批人"},{default:a(()=>[n("div",null,i(m(u).curAuditUserName),1)]),_:1}),e(s,{label:"备注",prop:"remark"},{default:a(()=>[e(R,{type:"textarea",rows:3,placeholder:"请输入审核备注",modelValue:v.remark,"onUpdate:modelValue":l[2]||(l[2]=o=>v.remark=o)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"])])}}};export{te as default};
