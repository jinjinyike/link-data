(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{Dk45:function(e,a,l){e.exports={blueColor:"blueColor___3UI9F",contant:"contant___33S0h",demoHome:"demoHome___1ZS_q",list:"list___2SKzF",logout:"logout___2t3vv",subBtn:"subBtn___3CiA8",cardSelf:"cardSelf___2pWS8",row:"row___Dz8xC",sub_title:"sub_title___1yrHg",flex:"flex___19-GS",iconflex:"iconflex___1VKTe"}},QXgB:function(e,a,l){"use strict";l.r(a);l("ufv1");var t,o=l("QYgq"),r=(l("XGli"),l("NHyu")),i=(l("e3Tq"),l("n+tp")),p=(l("5aHp"),l("dzEL")),n=l("jehZ"),s=l.n(n),d=(l("1Cgs"),l("zvbH")),c=(l("D2jH"),l("2ROE")),_=l("p0pE"),m=l.n(_),u=l("q1tI"),h=l.n(u),y=l("47e7"),b=l("/MKj"),f=l("3a4m"),k=l.n(f),v=l("Dk45"),g=new RegExp("\\biPhone\\b|\\biPod\\b","i").test(window.navigator.userAgent);g&&(t={onTouchStart:e=>e.preventDefault()});var E=[{key:"day_look",placeholder:"\u4eca\u65e5\u5e26\u770b",label:"\u4eca\u65e5\u5e26\u770b"},{key:"day_gonnalook",placeholder:"\u4eca\u65e5\u7ea6\u770b",label:"\u4eca\u65e5\u7ea6\u770b"},{key:"day_add",placeholder:"\u4eca\u65e5\u65b0\u589e",label:"\u4eca\u65e5\u65b0\u589e"},{key:"day_order",placeholder:"\u4eca\u65e5\u5355\u91cf",label:"\u4eca\u65e5\u5355\u91cf"},{key:"day_achievement",placeholder:"\u4eca\u65e5\u4e1a\u7ee9",label:"\u4eca\u65e5\u4e1a\u7ee9"},{key:"im_consult",placeholder:"im\u5ba2\u6237\u54a8\u8be2\u91cf",label:"im\u5ba2\u6237\u54a8\u8be2\u91cf"},{key:"im_noreply",placeholder:"im\u672a\u53ca\u65f6\u56de\u590d\u91cf",label:"im\u672a\u53ca\u65f6\u56de\u590d\u91cf"},{key:"im_private",placeholder:"im\u52a0\u79c1\u91cf",label:"im\u52a0\u79c1\u91cf"},{key:"im_privatelook",placeholder:"im\u52a0\u79c1\u7ea6\u770b\u91cf",label:"im\u52a0\u79c1\u7ea6\u770b\u91cf"}];class w extends h.a.Component{constructor(){super(...arguments),this.state={type:"money"},this.handleSubmit=(e=>{e.preventDefault(),this.props.form.validateFields((e,a)=>{if(!e){console.log(a);var l=m()({},a,{user_id:this.props.app.user.id});this.props.app.info.id&&(l.id=this.props.app.info.id),this.props.dispatch({type:"app/fetchAdd",payload:l})}})})}render(){var e=this.props.form.getFieldProps,a=this.state.type,l=this.props.app.info;return h.a.createElement("div",null,h.a.createElement(d["a"],{mode:"dark",icon:h.a.createElement(c["a"],{type:"left"}),onLeftClick:()=>k.a.push("/home")},"\u4eca\u65e5\u6570\u636e"),h.a.createElement(i["a"],{className:v.list},E.map(o=>h.a.createElement(p["a"],s()({key:o.key},e(o.key,{normalize:(e,a)=>{return e&&!/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(e)?"."===e?"0.":a:e},initialValue:l[o.key]}),{type:a,placeholder:o.placeholder,ref:e=>this.inputRef=e,onVirtualKeyboardConfirm:e=>console.log("onVirtualKeyboardConfirm:",e),clear:!0,moneyKeyboardWrapProps:t}),o.label))),h.a.createElement("div",{className:v.subBtn},h.a.createElement(r["a"],{type:"primary",onClick:this.handleSubmit},l.id?"\u4fee\u6539":"\u6dfb\u52a0")),h.a.createElement(o["a"],{size:"lg"}))}}var C=Object(y["a"])()(w);a["default"]=Object(b["c"])(e=>{var a=e.app;return{app:a}})(C)}}]);