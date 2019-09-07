(window["webpackJsonppuhelinluettelo-frontend"]=window["webpackJsonppuhelinluettelo-frontend"]||[]).push([[0],{15:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),l=n.n(o),c=n(2),i=n(3),u=n.n(i),d="/api/persons",s=function(){return u.a.get(d).then(function(e){return e.data})},f=function(e){return u.a.post(d,e).then(function(e){return e.data})},m=function(e){return u.a.put(d,e).then(function(e){return e.data})},g=function(e){return u.a.delete("".concat(d,"/").concat(e)).then(function(e){return e.data})},v=n(36),p=function(e){return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{onChange:e.changeHandler,value:e.value}))},b=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"name:",r.a.createElement("input",{onChange:e.changeNameHandler,value:e.name})),r.a.createElement("div",null,"number:",r.a.createElement("input",{onChange:e.changeNumberHandler,value:e.number})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:e.submitClickHandler},"add")))},h=function(e){return r.a.createElement("ul",{style:{listStyleType:"none",padding:0}},e.persons.filter(function(t){return t.name.toLocaleUpperCase().includes(e.filter)}).map(function(t){return r.a.createElement("li",{key:t.name},t.name," ",t.number,"\xa0",r.a.createElement(E,{id:t.id,deleteClickHandler:e.deleteClickHandler}))}))},E=function(e){return r.a.createElement("button",{id:e.id,onClick:e.deleteClickHandler},"delete")},y=function(e){var t=e.notification,n=[{padding:10,marginBottom:10,borderStyle:"solid",borderRadius:5,background:"lightgrey",color:"darkgreen",fontStyle:"normal",fontSize:20},{padding:10,marginBottom:10,borderStyle:"solid",borderRadius:5,background:"grey",color:"blue",fontStyle:"italics",fontSize:20},{padding:10,marginBottom:10,borderStyle:"solid",borderRadius:5,background:"darkblue",color:"salmon",fontStyle:"bold",fontSize:20}];return t.level<0||t.level>=n.length?null:r.a.createElement("div",{className:"notification",style:n[t.level]},r.a.createElement("pre",null,t.text))},k=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(""),i=Object(c.a)(l,2),u=i[0],d=i[1],E=Object(a.useState)(""),k=Object(c.a)(E,2),S=k[0],w=k[1],C=Object(a.useState)(""),O=Object(c.a)(C,2),H=O[0],N=O[1],j=Object(a.useState)({level:-1}),x=Object(c.a)(j,2),T=x[0],q=x[1];return Object(a.useEffect)(function(){s().then(function(e){o(e.sort(function(e,t){return e.name>t.name}))}).catch(function(e){var t;t=e.response?e.response.data.error:e.request?JSON.stringify(e.request.data):e.stack,console.log("Could not get person list from server:",v.inspect(e)),q({text:"Could not get person list from server\n".concat(t),level:2}),setTimeout(function(){return q({level:-1})},15e3)})},[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(y,{notification:T}),r.a.createElement(p,{changeHandler:function(e){return N(e.target.value)},value:H}),r.a.createElement("h3",null,"add a new"),r.a.createElement(b,{changeNameHandler:function(e){return d(e.target.value)},name:u,changeNumberHandler:function(e){return w(e.target.value)},number:S,submitClickHandler:function(e){e.preventDefault();var t=JSON.parse(JSON.stringify(n)),a=t.find(function(e){return e.name===u});if(void 0!==a){if(!window.confirm("".concat(u," is already added to phonebook, replace the old number with a new one?")))return q({text:"Cancelled updating '".concat(u,"'"),level:1}),void setTimeout(function(){return q({level:-1})},1e4);a.name=u,a.number=S,m(a).then(function(e){o(t.filter(function(t){return t.id===e.id?e:t}))}).then(function(e){q({text:"Updated '".concat(u,"'"),level:0}),setTimeout(function(){return q({level:-1})},5e3)}).catch(function(e){var t;t=e.response?e.response.data.error:e.request?JSON.stringify(e.request.data,null,2):e.stack,console.log("Failed modifying '".concat(u,"':"),v.inspect(e)),q({text:"Failed modifying '".concat(u,"'\n").concat(e.message,"\n").concat(t),level:2}),setTimeout(function(){return q({level:-1})},15e3)})}else f({name:u,number:S}).then(function(e){return o(t.concat(e).sort(function(e,t){return e.name>t.name}))}).then(function(e){q({text:"Added '".concat(u,"'"),level:0}),setTimeout(function(){return q({level:-1})},5e3)}).catch(function(e){var t;t=e.response?e.response.data.error:e.request?JSON.stringify(e.request.data):e.stack,console.log("Failed creating '".concat(u,"':"),v.inspect(e)),q({text:"Failed creating '".concat(u,"'\n").concat(e.message,"\n").concat(t),level:2}),setTimeout(function(){return q({level:-1})},15e3)});d(""),w("")}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(h,{persons:n,filter:H.toLocaleUpperCase(),deleteClickHandler:function(e){var t=e.target.getAttribute("id"),a=n.find(function(e){return e.id===t});if(!window.confirm("Delete ".concat(a.name,"?")))return q({text:"Cancelling deletion of '".concat(a.name,"' with id '").concat(a.id,"'"),level:1}),void setTimeout(function(){return q({level:-1})},1e4);g(a.id).then(function(e){return o(n.filter(function(e){return e.id!==a.id}))}).then(function(e){q({text:"Deleted '".concat(a.name,"' with id '").concat(a.id,"'"),level:0}),setTimeout(function(){return q({level:-1})},5e3)}).catch(function(e){var t;t=e.response?e.response.data.error:e.request?JSON.stringify(e.request.data):e.stack,console.log("Failed deleting '".concat(a.name,"' with id '").concat(a.id,"':"),v.inspect(e)),q({text:"Failed deleting '".concat(a.name,"' with id '").concat(a.id,"'\n").concat(t),level:2}),setTimeout(function(){return q({level:-1})},15e3)})}}))};l.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.1385767f.chunk.js.map