(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t(1),u=t(14),r=t.n(u),a=(t(20),t(3)),i=function(e){var n=e.person,t=e.deletePerson;return Object(c.jsxs)("p",{children:[n.name," ",n.number," ",Object(c.jsx)("button",{onClick:t,children:"Poista"})]})},s=function(e){var n=e.list,t=e.filter,o=e.deletePerson;return(""!==t?n.filter((function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())})):n).map((function(e){return Object(c.jsx)(i,{person:e,deletePerson:function(){return o(e.id,e.name)}},e.id)}))},l=function(e){return Object(c.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(c.jsxs)("div",{children:["name:   ",Object(c.jsx)("input",{value:e.valueName,onChange:e.onNameChange})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:e.valueNumber,onChange:e.onNumberChange})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Add"})})]})},d=t(4),f=t.n(d),j="https://intense-savannah-81450.herokuapp.com/api/persons",b=function(){return f.a.get(j).then((function(e){return e.data}))},m=function(e){return f.a.post(j,e).then((function(e){return console.log(e),e.data}))},h=function(e){return f.a.delete("".concat(j,"/").concat(e)).then((function(e){return e}))},O=function(e,n){return f.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"success",children:n})},p=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},x=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],u=n[1],r=Object(o.useState)(""),i=Object(a.a)(r,2),d=i[0],f=i[1],j=Object(o.useState)(""),x=Object(a.a)(j,2),g=x[0],w=x[1],N=Object(o.useState)(""),C=Object(a.a)(N,2),P=C[0],S=C[1],y=Object(o.useState)(null),k=Object(a.a)(y,2),T=k[0],I=k[1],A=Object(o.useState)(null),D=Object(a.a)(A,2),E=D[0],J=D[1];Object(o.useEffect)((function(){b().then((function(e){u(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(v,{message:T}),Object(c.jsx)(p,{message:E}),Object(c.jsxs)("div",{children:["Filter shown with: ",Object(c.jsx)("input",{value:P,onChange:function(e){S(e.target.value)}})]}),Object(c.jsx)("h2",{children:"Add new"}),Object(c.jsx)(l,{onSubmit:function(e){e.preventDefault();var n={name:d,number:g};if(t.some((function(e){return e.name===d}))){var c=t.find((function(e){return e.name===d}));console.log(c),window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))&&O(c.id,n).then((function(e){u(t.map((function(n){return n.id!==c.id?n:e}))),I("Persons ".concat(e.name," number was succesfully changed")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){J("Information of ".concat(c.name," has already been removed from server")),setTimeout((function(){J(null)}),5e3),u(t.filter((function(e){return e.id!==c.id})))}))}else m(n).then((function(e){u(t.concat(e)),I("Person ".concat(e.name," was succesfully added")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){console.log(e.response.data.error);var t=e.response.data.error;""!==n.name&&""!==n.number||(J(t),setTimeout((function(){J(null)}),5e3))})),f(""),w("")},valueName:d,valueNumber:g,onNameChange:function(e){console.log(e.target.value),f(e.target.value)},onNumberChange:function(e){console.log(e.target.value),w(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("div",{children:Object(c.jsx)(s,{list:t,filter:P,deletePerson:function(e,n){window.confirm("Delete ".concat(n,"?"))&&h(e).then((function(c){u(t.filter((function(n){return n.id!==e}))),I("Person ".concat(n," was succesfully deleted")),setTimeout((function(){I(null)}),5e3)})).catch((function(c){J("Information of ".concat(n," has already been removed from server")),setTimeout((function(){J(null)}),5e3),u(t.filter((function(n){return n.id!==e})))}))}})})]})};r.a.render(Object(c.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.8c400349.chunk.js.map