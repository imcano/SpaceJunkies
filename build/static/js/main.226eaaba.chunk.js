(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(47)},29:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(7),s=n.n(o),c=(n(29),n(1)),r=n(2),l=n(4),d=n(3),m=n(5),u=n(10),h=n.n(u),g=function(){return i.a.createElement("div",{className:"top_nav"},i.a.createElement("div",{className:"nav_menu"},i.a.createElement("nav",{className:"dashboardHeader"})))},p=function(e){var t=e.onEdit;return i.a.createElement("div",{className:"row edit-bar"},i.a.createElement("div",{className:"col-sm-12 text-right"},i.a.createElement("button",{type:"button",className:"btn btn-default btn-xs",onClick:t},i.a.createElement("span",{className:"glyphicon glyphicon-pencil","aria-hidden":"true"}),"Edit")))},y=function(e){var t=e.children;return i.a.createElement("div",{className:"container body"},i.a.createElement("div",{className:"main_container"},t))},f=n(18),v=n.n(f),b=function(e){var t=e.widgets,n=e.isModalOpen,a=e.onRequestClose,o=e.onWidgetSelect,s=Object.keys(t).map(function(e,n){return i.a.createElement("div",{key:n,className:"list-group"},i.a.createElement("a",{href:!0,className:"list-group-item",onClick:function(){return o(e)}},i.a.createElement("h6",{className:"list-group-item-heading"},t[e].title)))});return i.a.createElement(v.a,{className:"Modal__Bootstrap modal-dialog",isOpen:n},i.a.createElement("div",{className:"modal-content"},i.a.createElement("div",{className:"modal-header"},i.a.createElement("button",{type:"button",className:"close",onClick:a},i.a.createElement("span",{"aria-hidden":"true"},"\xd7"),i.a.createElement("span",{className:"sr-only"},"Close")),i.a.createElement("h4",{className:"modal-title"},"Add a widget")),i.a.createElement("div",{className:"modal-body"},i.a.createElement("h5",null,"Pick a widget to add"),s),i.a.createElement("div",{className:"modal-footer"},i.a.createElement("button",{type:"button",className:"btn btn-default",onClick:a},"Close"))))},E=function(e){var t=e.children,n=e.onRemove,a=e.editable,o=e.title;return i.a.createElement("div",{className:"x_panel fixed_height_320"},i.a.createElement("div",{className:"x_title"},i.a.createElement("h2",null,o),i.a.createElement("ul",{className:"nav navbar-right panel_toolbox"},a&&i.a.createElement("li",null,i.a.createElement("a",{href:!0,onClick:function(){n()},className:"close-link"},i.a.createElement("span",{className:"glyphicon glyphicon-remove","aria-hidden":"true"})))),i.a.createElement("div",{className:"clearfix"})),i.a.createElement("div",{className:"x_content"},t))},O=n(6),k=n(12),N=n(11),w=n.n(N),j=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).joyRef=i.a.createRef(),n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.manager=w.a.create(Object(k.a)({},this.props.options,{zone:this.joyRef.current})),this.props.managerListener(this.manager),this.manager2=w.a.create(Object(k.a)({},this.props.options,{zone:this.joyRef.current})),this.props.managerListener(this.manager2)}},{key:"render",value:function(){return i.a.createElement("div",{ref:this.joyRef,style:this.props.containerStyle})}}]),t}(a.Component);j.defaultProps={options:{mode:"semi",catchDistance:150,color:"white"},containerStyle:{width:"100%",height:"50vh",position:"relative",background:"linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)"}};var S=j,C={mode:"static",catchDistance:150,color:"white",position:{top:"50%",left:"50%"}},x={position:"relative",height:"150px",width:"100%",background:"black"},L=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(d.a)(t).call(this))).managerListener=e.managerListener.bind(Object(O.a)(Object(O.a)(e))),e.managerListener2=e.managerListener2.bind(Object(O.a)(Object(O.a)(e))),e.state={rasberyPy:!1},e}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;"localhost:3000"===window.location.host?this.socket=new WebSocket("ws://localhost:3030"):this.socket=new WebSocket("ws://142.93.25.132:3030"),this.socket.onmessage=function(t){var n=JSON.parse(t.data);"users"===n.type&&e.setState({rasberyPy:n.rp_status})},document.addEventListener("keydown",function(t){if(!t.defaultPrevented){var n=t.key||t.keyCode;" "===n&&e.socket.send(JSON.stringify({direction:"stop"})),"W"!==n&&"w"!==n||e.socket.send(JSON.stringify({direction:"up"})),"A"!==n&&"a"!==n||e.socket.send(JSON.stringify({direction:"left"})),"S"!==n&&"s"!==n||e.socket.send(JSON.stringify({direction:"down"})),"D"!==n&&"d"!==n||e.socket.send(JSON.stringify({direction:"right"})),"Q"!==n&&"q"!==n||e.socket.send(JSON.stringify({direction:"rotateX"})),"E"!==n&&"e"!==n||e.socket.send(JSON.stringify({direction:"rotateY"}))}})}},{key:"managerListener",value:function(e){var t=this;e.on("move",function(e,n){n.direction&&t.socket.send(JSON.stringify({direction:n.direction.angle}))}),e.on("end",function(){t.socket.send(JSON.stringify({direction:"stop"}))})}},{key:"managerListener2",value:function(e){var t=this;e.on("move",function(e,n){"up"!==n.direction.angle&&"down"!==n.direction.angle||t.socket.send(JSON.stringify({direction:"rotateY"})),"left"!==n.direction.angle&&"right"!==n.direction.angle||t.socket.send(JSON.stringify({direction:"rotateX"}))}),e.on("end",function(){t.socket.send(JSON.stringify({direction:"stop"}))})}},{key:"render",value:function(){var e=this.state.rasberyPy;return i.a.createElement("div",null,e?i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",{className:"text-center"},"Direction"),i.a.createElement(S,{options:C,containerStyle:x,managerListener:this.managerListener}),",",i.a.createElement("h2",{className:"text-center"},"Rotation"),i.a.createElement(S,{options:C,containerStyle:x,managerListener:this.managerListener2})):i.a.createElement("h1",null,"Connect RP"))}}]),t}(a.Component),J=n(19),R=n.n(J),M=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("video-canvas");new R.a.Player("ws://142.93.25.132:8082/",{canvas:e})}},{key:"render",value:function(){return this.cameraStyle={paddingLeft:0,paddingRight:0,marginLeft:"auto",marginRight:"auto",display:"block",width:"100%",height:"100%"},i.a.createElement("div",null,i.a.createElement("h1",null,"Camera"),i.a.createElement("canvas",{style:this.cameraStyle,id:"video-canvas"}))}}]),t}(a.Component),W=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h1",null,"Log"))}}]),t}(a.Component),_=(n(44),n(45),n(46),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).onRemove=function(e){n.setState({layout:e})},n.onAdd=function(e,t,a){n.setState({isModalOpen:!0,addWidgetOptions:{layout:e,rowIndex:t,columnIndex:a}})},n.onMove=function(e){n.setState({layout:e})},n.onRequestClose=function(){n.setState({isModalOpen:!1})},n.toggleEdit=function(){n.setState({editMode:!n.state.editMode})},n.handleWidgetSelection=function(e){var t=n.state.addWidgetOptions,a=t.layout,i=t.rowIndex,o=t.columnIndex;n.setState({layout:Object(u.addWidget)(a,i,o,e)}),n.onRequestClose()},n.state={widgets:{Log:{type:W,title:"Log"},JoyStick:{type:L,title:"Joy Stick"},Camera:{type:M,title:"Camera"}},layout:{rows:[{columns:[{className:"col-md-12 col-sm-12 col-xs-12",widgets:[{key:"Camera"}]}]},{columns:[{className:"col-md-8 col-sm-8 col-xs-8",widgets:[{key:"Log"}]},{className:"col-md-4 col-sm-4 col-xs-4",widgets:[{key:"JoyStick"}]}]}]},editMode:!1,isModalOpen:!1,addWidgetOptions:null},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return i.a.createElement(y,null,i.a.createElement(b,{widgets:this.state.widgets,isModalOpen:this.state.isModalOpen,onRequestClose:this.onRequestClose,onWidgetSelect:this.handleWidgetSelection}),i.a.createElement(g,null),i.a.createElement(p,{onEdit:this.toggleEdit}),i.a.createElement(h.a,{frameComponent:E,onRemove:this.onRemove,layout:this.state.layout,widgets:this.state.widgets,editable:this.state.editMode,onAdd:this.onAdd,onMove:this.onMove,addWidgetComponentText:"Add New Widget"}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.226eaaba.chunk.js.map