(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{104:function(e,t,n){e.exports={Header:"Header_Header__RWSel",HeaderHome:"Header_HeaderHome__4fkBX Header_Header__RWSel",HeaderGame:"Header_HeaderGame__20foV Header_Header__RWSel",ProfileButton:"Header_ProfileButton__77GX2"}},105:function(e,t,n){e.exports={Home:"Home_Home__1aUBM",Content:"Home_Content__2ue8L",Or:"Home_Or__1IcPt","wallet-adapter-button":"Home_wallet-adapter-button__S-GGy"}},106:function(e,t,n){e.exports={LeaderboardContainer:"Leaderboard_LeaderboardContainer__DjWNe",Leaderboard:"Leaderboard_Leaderboard__1JspY",BoldRank:"Leaderboard_BoldRank__2L6LA"}},227:function(e,t,n){},229:function(e,t){},232:function(e,t){},250:function(e,t){},251:function(e,t){},289:function(e,t,n){},291:function(e,t){},293:function(e,t){},304:function(e,t){},306:function(e,t){},31:function(e,t,n){e.exports={DashContainer:"Dashboard_DashContainer__G4W5n",Dashboard:"Dashboard_Dashboard__1uK3T",Play:"Dashboard_Play__1d_2z",Replay:"Dashboard_Replay__2R53y",Hand:"Dashboard_Hand__17d2t",Cards:"Dashboard_Cards__2XYZz",CardGrid:"Dashboard_CardGrid__2Vfkb",Headline:"Dashboard_Headline__3lSWr",Card:"Dashboard_Card__2tCQ2",Stats:"Dashboard_Stats__1e_pm"}},333:function(e,t){},335:function(e,t){},341:function(e,t){},353:function(e,t){},356:function(e,t){},367:function(e,t){},368:function(e,t){},399:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(95),c=n.n(r),s=(n(227),n(9)),i=n(17),l=n(94),o=n(20),d=n(411),j=n(412),b=n(413),u=n(414),f=n(415),O=n(408),h=n(409),x=n(212),p=n(211),m=n(416),_=n(410),g=n(5),v=n(1),k=n.n(v),y=n(51),P=n.n(y),C=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.get("/games/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data.entries);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(g.a)(k.a.mark((function e(t,n){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.post("/games/play/".concat(n),{gameType:n.substring(8),user:t});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),N=n(145),H=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.post("/users/login",{user:t},{headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.a.get("/users/history/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=n(104),D=n.n(R),G=n(4),A=function(e){var t=e.user,n=e.onProfileClick,a="184px";return Object(G.jsxs)("div",{className:t?D.a.HeaderGame:D.a.HeaderHome,children:[Object(G.jsx)("div",{style:{minWidth:a},children:Object(G.jsxs)("p",{children:["The ",Object(G.jsx)("b",{children:"ACES"})]})}),Object(G.jsxs)("p",{children:["The ",Object(G.jsx)("b",{children:"ACES Contest"})]}),Object(G.jsx)("div",{style:{minWidth:a},children:Object(G.jsx)("button",{className:D.a.ProfileButton,onClick:n,style:t?{width:a}:{display:"none"},children:"PROFILE"})})]})},I=n(105),L=n.n(I);n(288),n(289);var E=function(e){var t=e.wallet,n=Object(a.useState)(!1),r=Object(s.a)(n,2),c=r[0],l=r[1];return Object(a.useEffect)((function(){t.publicKey&&(H(t.publicKey.toString()),l(!0))}),[t]),c?Object(G.jsx)(i.a,{to:"/play"}):Object(G.jsxs)("div",{className:L.a.Home,children:[Object(G.jsx)(A,{user:!1,onProfileClick:function(){}}),Object(G.jsxs)("div",{className:L.a.Content,children:[Object(G.jsx)(N.a,{children:Object(G.jsx)(N.b,{children:"PLAY"})}),Object(G.jsxs)("div",{className:L.a.Or,children:[Object(G.jsx)("div",{}),Object(G.jsx)("hr",{}),Object(G.jsx)("p",{children:"Or"}),Object(G.jsx)("hr",{})]}),Object(G.jsx)("a",{href:"https://www.magiceden.io/marketplace/the_aces_nft",children:"BUY"}),Object(G.jsx)("p",{children:"In Order to Play the Game You Must Hold At Least 1 Aces NFT"}),Object(G.jsxs)("p",{children:["This version is in ",Object(G.jsx)("b",{children:"Beta Mode"})]})]})]})},B=n(31),T=n.n(B),W=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],M=function(e){var t,n=e.wallet,r=e.gameId,c=e.rank,i=e.setRank,l=e.rankings,o=e.setRankings,d=e.reloadRankings,j=e.setReloadRankings,b=Object(a.useState)([]),u=Object(s.a)(b,2),f=u[0],O=u[1],h=Object(a.useState)([]),x=Object(s.a)(h,2),p=x[0],m=x[1],_=Object(a.useState)(),g=Object(s.a)(_,2),v=g[0],k=g[1];t="30"===r.substring(2,4)?15:20;var y=Object(a.useState)(t),P=Object(s.a)(y,2),N=P[0],H=P[1];Object(a.useEffect)((function(){v&&0===d&&(O(v.aces?v.aces:[]),m(v.wildCards))}),[n,r,v,d,O,m]),Object(a.useEffect)((function(){if(l){var e=l.map((function(e){return e.user})).indexOf(n);-1!==e&&k(l[e]);for(var t=0,a=0;a<l.length;a++)l[a].user===n&&(t+=1);H(t)}}),[n,l,H]);var S=Object(a.useState)("PLAY AGAIN"),R=Object(s.a)(S,2),D=R[0],A=R[1],I=function(){A("Thinking..."),w(n,r).then((function(e){e&&e!=={}&&(O(e.aces),m(e.wildCards),n&&C(r).then((function(e){if(o(e),e){var t=e.map((function(e){return e.user})).indexOf(n);i(-1===t?"?":t+1),-1!==t&&k(e[t])}})),j(d+1),A("PLAY AGAIN"))}))};return Object(G.jsx)("div",{className:T.a.DashContainer,children:Object(G.jsxs)("div",{className:T.a.Dashboard,children:[Object(G.jsx)("div",{className:T.a.Play,children:v?v.handType?Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)("p",{children:"".concat((v.handType[0].toUpperCase()+v.handType.slice(1)).replace("-"," "))}),Object(G.jsx)("div",{className:T.a.Hand,children:v.hand.sort((function(e,t){return W.indexOf(1===t.face.length?t.face:t.face[0].toUpperCase())-W.indexOf(1===e.face.length?e.face:e.face[0].toUpperCase())})).map((function(e,t){return Object(G.jsx)("div",{children:e.image?Object(G.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit}):Object(G.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)}))}),Object(G.jsxs)("div",{className:T.a.Replay,children:[Object(G.jsxs)("div",{className:T.a.Stats,children:[Object(G.jsxs)("p",{children:[Object(G.jsx)("b",{children:"Rank: "}),l?"".concat(c,"/").concat(l.length):""]}),Object(G.jsxs)("p",{children:[Object(G.jsx)("b",{children:"Entries: "}),"".concat(N,"/").concat(t)]})]}),Object(G.jsx)("button",{onClick:function(){return I()},disabled:!!(N&&N>=t||"PLAY AGAIN"!==D),children:D})]})]}):Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)("p",{children:"Need at least 1 Aces NFT to play the card contest."}),Object(G.jsx)("button",{onClick:function(){return I()},disabled:!1===l,children:"PLAY"}),Object(G.jsx)("p",{children:l?"Rank: ".concat(c,"/").concat(l.length):"Rank"})]}):Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)("p",{children:"Best Hand"}),Object(G.jsx)("button",{onClick:function(){return I()},children:"PLAY"}),Object(G.jsx)("p",{children:l?"Rank: ".concat(c,"/").concat(l.length):"Rank"})]})}),Object(G.jsx)("hr",{}),Object(G.jsx)("div",{className:T.a.Cards,children:Object(G.jsxs)("div",{className:T.a.CardGrid,children:[Object(G.jsx)("div",{className:T.a.Headline,children:Object(G.jsx)("p",{children:"Table Cards"})}),p.map((function(e,t){return Object(G.jsx)("div",{className:T.a.Card,children:Object(G.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)})),Object(G.jsx)("div",{className:T.a.Headline,children:Object(G.jsx)("p",{children:"ACES"})}),f&&f.length>0?f.map((function(e,t){return Object(G.jsx)("div",{className:T.a.Card,children:Object(G.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit})},t)})):Object(G.jsx)(G.Fragment,{})]})})]})})},F=n(106),Y=n.n(F),K=function(e){var t,n=e.rankings,r=e.rank,c=e.wallet,i=e.gameId;t="deuceswild"===i.substring(8)?"Deuces Wild":"4swild"===i.substring(8)?"4's Wild":"Five Card Poker";var l=Object(a.useState)(),o=Object(s.a)(l,2),d=o[0],j=o[1];return Object(a.useEffect)((function(){if(n){var e;e=(e=r<=5||"?"===r?n.slice(0,Math.min(10,n.length)):r>n.length-5?n.slice(n.length-Math.min(10,n.length),n.length):n.slice(r-Math.min(5,n.length/2),r).concat(n.slice(r,r+Math.min(5,n.length/2)))).map((function(e){return{rank:0,user:e.user}}));for(var t=-1,a=0;a<e.length;a++)if(e[a].user===c){t=a;break}if(-1===t)j(n.slice(0,Math.min(10,n.length)).map((function(e,t){return{rank:t+1,user:e.user}})));else{for(var s=0;s<e.length;s++)e[s].rank=t!==s?r+s-t:r;j(e)}}}),[n,r,c,j]),Object(G.jsx)("div",{className:Y.a.LeaderboardContainer,children:Object(G.jsxs)("div",{className:Y.a.Leaderboard,children:[Object(G.jsxs)("h1",{children:["Leaderboard: ",t]}),Object(G.jsx)("hr",{}),Object(G.jsx)("ul",{children:d?d.map((function(e,t){return Object(G.jsx)("li",{className:Number(e.rank)===Number(r)?Y.a.BoldRank:"",children:"#".concat(e.rank,": ")+e.user},t)})):Object(G.jsx)(G.Fragment,{})})]})})},z=n(56),U=n.n(z),J=function(e){var t=e.wallet,n=e.isProfileOpen,r=e.setIsProfileOpen,c=Object(a.useState)(),i=Object(s.a)(c,2),l=i[0],o=i[1];return Object(a.useEffect)((function(){S(t).then((function(e){o(e)}))}),[t,o]),Object(G.jsx)("div",{className:n?U.a.ProfileBlock:U.a.ProfileNone,children:Object(G.jsxs)("div",{className:U.a.ProfileMain,children:[Object(G.jsx)("button",{onClick:function(){return r(!1)}}),Object(G.jsxs)("div",{className:U.a.ProfileInner,children:[Object(G.jsxs)("div",{children:[Object(G.jsx)("p",{children:"Wallet ID"}),Object(G.jsx)("p",{style:{overflow:"hidden",textOverflow:"ellipsis",maxWidth:"50%"},children:t})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("p",{children:"Games played:"}),Object(G.jsx)("p",{children:null!==l&&void 0!==l&&l.games?l.games.length:"0"})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("p",{children:"Coin balance:"}),Object(G.jsx)("p",{children:"Coming soon!"})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("p",{children:"Contest history:"}),Object(G.jsx)("div",{className:U.a.History,children:null!==l&&void 0!==l&&l.games?l.games.slice(0,5).map((function(e,t){return"testtest"!==e.substring(0,8)?Object(G.jsx)("div",{className:U.a.HistoryEntry,children:"".concat("deuceswild"===e.substring(8)?"2's Wild ":"4swild"===e.substring(8)?"4's wild":"5 Card ","\n                                                ").concat(String(Number(e.substring(2,4))+1).padStart(2,"0"),"/").concat(e.substring(0,2)," - \n                                                Rank ").concat(l.ranks[t],"/").concat(l.totals[t])},t):Object(G.jsx)(G.Fragment,{})})):Object(G.jsx)("p",{children:"Play your first game!"})})]})]})]})})},Z=n(75),X=n.n(Z),Q=function(e){var t=e.wallet,n=e.gameId,r=e.rankings,c=e.setRankings,l=e.reloadRankings,o=e.setReloadRankings,d=Object(a.useState)(!1),j=Object(s.a)(d,2),b=j[0],u=j[1],f=Object(a.useState)("?"),O=Object(s.a)(f,2),h=O[0],x=O[1];return Object(a.useEffect)((function(){if(null!==t&&void 0!==t&&t.publicKey)if(r){var e=r.map((function(e){return e.user})).indexOf(t.publicKey.toString());x(-1===e?"?":e+1)}else x("?")}),[t,n,r,x]),t.publicKey?Object(G.jsxs)("div",{className:X.a.Game,children:[Object(G.jsx)("p",{children:Object(G.jsx)("b",{children:"BETA"})}),Object(G.jsxs)("div",{className:X.a.Content,children:[Object(G.jsxs)("div",{className:X.a.GameArea,children:[Object(G.jsx)(A,{user:!0,onProfileClick:function(){return u(!0)}}),Object(G.jsx)(M,{wallet:t.publicKey.toString(),gameId:n,rankings:r,rank:h,reloadRankings:l,setRankings:c,setRank:x,setReloadRankings:o})]}),Object(G.jsx)("div",{className:X.a.Rankings,children:Object(G.jsx)(K,{wallet:t.publicKey.toString(),gameId:n,rankings:r,rank:h})})]}),Object(G.jsx)(J,{wallet:t.publicKey.toString(),isProfileOpen:b,setIsProfileOpen:u})]}):Object(G.jsx)(i.a,{to:"/"})},V=function(){var e,t=Object(p.b)(),n=new Date,r=new Date(n.getTime()+6e4*n.getTimezoneOffset());e=-1!==["24","25","26","27","28","29","30"].indexOf(String(r.getDate()).padStart(2,"0"))?"deuceswild":-1!==["31","01","02","03","04","05","06"].indexOf(String(r.getDate()).padStart(2,"0"))?"4swild":"5card";var c=String(r.getDate()).padStart(2,"0")+String(r.getMonth()).padStart(2,"0")+String(r.getFullYear())+e,l=Object(a.useState)(!1),o=Object(s.a)(l,2),d=o[0],j=o[1],b=Object(a.useState)(0),u=Object(s.a)(b,2),f=u[0],O=u[1];return Object(a.useEffect)((function(){C(c).then((function(e){j(e||[])}))}),[t,c,f,j]),Object(G.jsx)(G.Fragment,{children:Object(G.jsxs)(i.d,{children:[Object(G.jsx)(i.b,{path:"/",element:Object(G.jsx)(E,{wallet:t})}),Object(G.jsx)(i.b,{path:"/play",element:Object(G.jsx)(Q,{wallet:t,gameId:c,rankings:d,setRankings:j,reloadRankings:f,setReloadRankings:O})})]})})},q=function(){var e=x.b.Mainnet,t=Object(o.d)(e),n=Object(a.useMemo)((function(){return[Object(d.a)(),Object(j.a)(),Object(b.a)(),Object(u.a)({options:{clientId:"Get a client ID @ https://developer.tor.us"}}),Object(f.a)(),Object(O.a)({network:e}),Object(h.a)({network:e})]}),[e]);return Object(G.jsx)(m.a,{endpoint:t,children:Object(G.jsx)(_.a,{wallets:n,children:Object(G.jsx)(l.a,{children:Object(G.jsx)(V,{})})})})};c.a.render(Object(G.jsx)(q,{}),document.getElementById("root"))},56:function(e,t,n){e.exports={Profile:"Profile_Profile__nD2-Z",ProfileMain:"Profile_ProfileMain__18I6y",ProfileInner:"Profile_ProfileInner__risdd",ProfileBlock:"Profile_ProfileBlock__1_2dO Profile_Profile__nD2-Z",ProfileNone:"Profile_ProfileNone__ePzbk Profile_Profile__nD2-Z",History:"Profile_History__3oShl",HistoryEntry:"Profile_HistoryEntry__3jN5Y"}},75:function(e,t,n){e.exports={Game:"Game_Game__1qzE8",Content:"Game_Content__2W_3p",GameArea:"Game_GameArea__38dyN",Rankings:"Game_Rankings__1yrWx"}}},[[399,1,2]]]);
//# sourceMappingURL=main.36ce4cac.chunk.js.map