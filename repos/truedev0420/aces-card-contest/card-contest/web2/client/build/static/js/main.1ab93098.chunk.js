(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{105:function(e,t,n){e.exports={Header:"Header_Header__RWSel",HeaderHome:"Header_HeaderHome__4fkBX Header_Header__RWSel",HeaderGame:"Header_HeaderGame__20foV Header_Header__RWSel",ProfileButton:"Header_ProfileButton__77GX2"}},106:function(e,t,n){e.exports={Home:"Home_Home__1aUBM",Content:"Home_Content__2ue8L",Or:"Home_Or__1IcPt","wallet-adapter-button":"Home_wallet-adapter-button__S-GGy"}},107:function(e,t,n){e.exports={LeaderboardContainer:"Leaderboard_LeaderboardContainer__DjWNe",Leaderboard:"Leaderboard_Leaderboard__1JspY",BoldRank:"Leaderboard_BoldRank__2L6LA"}},228:function(e,t,n){},230:function(e,t){},233:function(e,t){},251:function(e,t){},252:function(e,t){},290:function(e,t,n){},292:function(e,t){},294:function(e,t){},305:function(e,t){},307:function(e,t){},31:function(e,t,n){e.exports={DashContainer:"Dashboard_DashContainer__G4W5n",Dashboard:"Dashboard_Dashboard__1uK3T",Play:"Dashboard_Play__1d_2z",Replay:"Dashboard_Replay__2R53y",Hand:"Dashboard_Hand__17d2t",Cards:"Dashboard_Cards__2XYZz",CardGrid:"Dashboard_CardGrid__2Vfkb",Headline:"Dashboard_Headline__3lSWr",Card:"Dashboard_Card__2tCQ2",Stats:"Dashboard_Stats__1e_pm"}},334:function(e,t){},336:function(e,t){},342:function(e,t){},354:function(e,t){},357:function(e,t){},368:function(e,t){},369:function(e,t){},400:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(96),s=n.n(r),c=(n(228),n(9)),i=n(17),l=n(95),o=n(20),d=n(412),j=n(413),u=n(414),b=n(415),h=n(416),O=n(409),f=n(410),p=n(213),x=n(212),_=n(417),m=n(411),g=n(5),v=n(1),k=n.n(v),y=n(51),R=n.n(y),C=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("/games/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data.entries);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(g.a)(k.a.mark((function e(t,n){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.post("/games/play/".concat(n),{gameType:n.substring(8),user:t});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),P=n(146),N=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.post("/users/login",{user:t},{headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(g.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("/users/history/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=n(105),A=n.n(S),D=n(3),G=function(e){var t=e.user,n=e.onProfileClick,a="184px";return Object(D.jsxs)("div",{className:t?A.a.HeaderGame:A.a.HeaderHome,children:[Object(D.jsx)("div",{style:{minWidth:a},children:Object(D.jsxs)("p",{children:["The ",Object(D.jsx)("b",{children:"ACES"})]})}),Object(D.jsxs)("p",{children:["The ",Object(D.jsx)("b",{children:"ACES Contest"})]}),Object(D.jsx)("div",{style:{minWidth:a},children:Object(D.jsx)("button",{className:A.a.ProfileButton,onClick:n,style:t?{width:a}:{display:"none"},children:"PROFILE"})})]})},I=n(106),T=n.n(I);n(289),n(290);var L=function(e){var t=e.wallet,n=Object(a.useState)(!1),r=Object(c.a)(n,2),s=r[0],l=r[1];return Object(a.useEffect)((function(){t.publicKey&&(N(t.publicKey.toString()),l(!0))}),[t]),s?Object(D.jsx)(i.a,{to:"/play"}):Object(D.jsxs)("div",{className:T.a.Home,children:[Object(D.jsx)(G,{user:!1,onProfileClick:function(){}}),Object(D.jsxs)("div",{className:T.a.Content,children:[Object(D.jsx)(P.a,{children:Object(D.jsx)(P.b,{children:"PLAY"})}),Object(D.jsxs)("div",{className:T.a.Or,children:[Object(D.jsx)("div",{}),Object(D.jsx)("hr",{}),Object(D.jsx)("p",{children:"Or"}),Object(D.jsx)("hr",{})]}),Object(D.jsx)("a",{href:"https://www.magiceden.io/marketplace/the_aces_nft",children:"BUY"}),Object(D.jsx)("p",{children:"In Order to Play the Game You Must Hold At Least 1 Aces NFT"}),Object(D.jsxs)("p",{children:["This version is in ",Object(D.jsx)("b",{children:"Beta Mode"})]})]})]})},B=n(31),E=n.n(B),W=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],M=function(e){var t,n=e.wallet,r=e.gameId,s=e.rank,i=e.setRank,l=e.rankings,o=e.setRankings,d=e.reloadRankings,j=e.setReloadRankings,u=(e.setIsRulesOpen,Object(a.useState)([])),b=Object(c.a)(u,2),h=b[0],O=b[1],f=Object(a.useState)([]),p=Object(c.a)(f,2),x=p[0],_=p[1],m=Object(a.useState)(),g=Object(c.a)(m,2),v=g[0],k=g[1];console.log(r.substring(2,4)),t="30"===r.substring(0,2)?15:20;var y=Object(a.useState)(t),R=Object(c.a)(y,2),P=R[0],N=R[1];Object(a.useEffect)((function(){v&&0===d&&(O(v.aces?v.aces:[]),_(v.wildCards))}),[n,r,v,d,O,_]),Object(a.useEffect)((function(){if(l){var e=l.map((function(e){return e.user})).indexOf(n);-1!==e&&k(l[e]);for(var t=0,a=0;a<l.length;a++)l[a].user===n&&(t+=1);N(t)}}),[n,l,N]);var H=Object(a.useState)("PLAY AGAIN"),S=Object(c.a)(H,2),A=S[0],G=S[1],I=function(){G("Thinking..."),w(n,r).then((function(e){e&&e!=={}&&(O(e.aces),_(e.wildCards),n&&C(r).then((function(e){if(o(e),e){var t=e.map((function(e){return e.user})).indexOf(n);i(-1===t?"?":t+1),-1!==t&&k(e[t])}})),j(d+1),G("PLAY AGAIN"))}))};return Object(D.jsx)("div",{className:E.a.DashContainer,children:Object(D.jsxs)("div",{className:E.a.Dashboard,children:[Object(D.jsx)("div",{className:E.a.Play,children:v?v.handType?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("p",{children:"".concat((v.handType[0].toUpperCase()+v.handType.slice(1)).replace("-"," "))}),Object(D.jsx)("div",{className:E.a.Hand,children:v.hand.sort((function(e,t){return W.indexOf(1===t.face.length?t.face:t.face[0].toUpperCase())-W.indexOf(1===e.face.length?e.face:e.face[0].toUpperCase())})).map((function(e,t){return Object(D.jsx)("div",{children:e.image?Object(D.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit}):Object(D.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)}))}),Object(D.jsxs)("div",{className:E.a.Replay,children:[Object(D.jsxs)("div",{className:E.a.Stats,children:[Object(D.jsxs)("p",{children:[Object(D.jsx)("b",{children:"Rank: "}),l?"".concat(s,"/").concat(l.length):""]}),Object(D.jsxs)("p",{children:[Object(D.jsx)("b",{children:"Entries: "}),"".concat(P,"/").concat(t)]})]}),Object(D.jsx)("button",{onClick:function(){return I()},disabled:!!(P&&P>=t||"PLAY AGAIN"!==A||0===h.length),children:A})]})]}):Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("p",{children:"Need at least 1 Aces NFT to play the card contest."}),Object(D.jsx)("button",{onClick:function(){return I()},disabled:!1===l||0===h.length,children:"PLAY"}),Object(D.jsx)("p",{children:l?"Rank: ".concat(s,"/").concat(l.length):"Rank"})]}):Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)("p",{children:"Best Hand"}),Object(D.jsx)("button",{onClick:function(){return I()},children:"PLAY"}),Object(D.jsx)("p",{children:l?"Rank: ".concat(s,"/").concat(l.length):"Rank"})]})}),Object(D.jsx)("hr",{}),Object(D.jsx)("div",{className:E.a.Cards,children:Object(D.jsxs)("div",{className:E.a.CardGrid,children:[Object(D.jsx)("div",{className:E.a.Headline,children:Object(D.jsx)("p",{children:"Table Cards"})}),x.map((function(e,t){return Object(D.jsx)("div",{className:E.a.Card,children:Object(D.jsx)("img",{src:"/images/wildCards/".concat(e.face).concat(e.suit,".png"),alt:e.face+" of "+e.suit})},t)})),Object(D.jsx)("div",{className:E.a.Headline,children:Object(D.jsx)("p",{children:"ACES"})}),h&&h.length>0?h.map((function(e,t){return Object(D.jsx)("div",{className:E.a.Card,children:Object(D.jsx)("img",{src:e.image,alt:e.face+" of "+e.suit})},t)})):Object(D.jsx)(D.Fragment,{})]})})]})})},F=n(107),Y=n.n(F),K=function(e){var t,n=e.rankings,r=e.rank,s=e.wallet,i=e.gameId;t="deuceswild"===i.substring(8)?"Deuces Wild":"4swild"===i.substring(8)?"4's Wild":"Five Card Poker";var l=Object(a.useState)(),o=Object(c.a)(l,2),d=o[0],j=o[1];return Object(a.useEffect)((function(){if(n){var e;e=(e=r<=5||"?"===r?n.slice(0,Math.min(10,n.length)):r>n.length-5?n.slice(n.length-Math.min(10,n.length),n.length):n.slice(r-Math.min(5,n.length/2),r).concat(n.slice(r,r+Math.min(5,n.length/2)))).map((function(e){return{rank:0,user:e.user}}));for(var t=-1,a=0;a<e.length;a++)if(e[a].user===s){t=a;break}if(-1===t)j(n.slice(0,Math.min(10,n.length)).map((function(e,t){return{rank:t+1,user:e.user}})));else{for(var c=0;c<e.length;c++)e[c].rank=t!==c?r+c-t:r;j(e)}}}),[n,r,s,j]),Object(D.jsx)("div",{className:Y.a.LeaderboardContainer,children:Object(D.jsxs)("div",{className:Y.a.Leaderboard,children:[Object(D.jsxs)("h1",{children:["Leaderboard: ",t]}),Object(D.jsx)("hr",{}),Object(D.jsx)("ul",{children:d?d.map((function(e,t){return Object(D.jsx)("li",{className:Number(e.rank)===Number(r)?Y.a.BoldRank:"",children:"#".concat(e.rank,": ")+e.user},t)})):Object(D.jsx)(D.Fragment,{})})]})})},U=n(56),z=n.n(U),J=function(e){var t=e.wallet,n=e.isProfileOpen,r=e.setIsProfileOpen,s=Object(a.useState)(),i=Object(c.a)(s,2),l=i[0],o=i[1];return Object(a.useEffect)((function(){H(t).then((function(e){o(e)}))}),[t,o]),Object(D.jsx)("div",{className:n?z.a.ProfileBlock:z.a.ProfileNone,children:Object(D.jsxs)("div",{className:z.a.ProfileMain,children:[Object(D.jsx)("button",{onClick:function(){return r(!1)}}),Object(D.jsxs)("div",{className:z.a.ProfileInner,children:[Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Wallet ID"}),Object(D.jsx)("p",{style:{overflow:"hidden",textOverflow:"ellipsis",maxWidth:"50%"},children:t})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Games played:"}),Object(D.jsx)("p",{children:null!==l&&void 0!==l&&l.games?l.games.length:"0"})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Coin balance:"}),Object(D.jsx)("p",{children:"Coming soon!"})]}),Object(D.jsxs)("div",{children:[Object(D.jsx)("p",{children:"Contest history:"}),Object(D.jsx)("div",{className:z.a.History,children:null!==l&&void 0!==l&&l.games?l.games.slice(0,5).map((function(e,t){return"testtest"!==e.substring(0,8)?Object(D.jsx)("div",{className:z.a.HistoryEntry,children:"".concat("deuceswild"===e.substring(8)?"2's Wild ":"4swild"===e.substring(8)?"4's wild":"5 Card ","\n                                                ").concat(String(Number(e.substring(2,4))+1).padStart(2,"0"),"/").concat(e.substring(0,2)," - \n                                                Rank ").concat(l.ranks[t],"/").concat(l.totals[t])},t):Object(D.jsx)(D.Fragment,{})})):Object(D.jsx)("p",{children:"Play your first game!"})})]})]})]})})},X=n(76),Z=n.n(X),Q=function(e){var t=e.isProfileOpen,n=e.setIsProfileOpen;return Object(D.jsx)("div",{className:t?Z.a.RulesBlock:Z.a.RulesNone,children:Object(D.jsxs)("div",{className:Z.a.RulesMain,children:[Object(D.jsx)("button",{onClick:function(){return n(!1)}}),Object(D.jsxs)("div",{className:Z.a.RulesInner,children:["The Aces Card Contest runs every day from 12AM-11:59PM UTC.",Object(D.jsx)("br",{}),'You get up to 20 entries per day, with each entry providing you with 4 new "Table Cards."',Object(D.jsx)("br",{}),"Each entry, you will get up to 10 of your Aces NFTs randomly drawn from your deck alone with those 4 Table Cards to make your best hand.",Object(D.jsx)("br",{}),"After you enter, your entry's respective Aces and Table Cards will appear on the bottom of the screen. The top shows your best entry from the current contest.",Object(D.jsx)("br",{}),"Currently, the contest is \"Best 5 Card Poker Hand.\" This game has variants such as 2's Wild and 4's Wild, which provides players with another wild card (on top of the Joker) to increase their chances of drawing low probability hands.",Object(D.jsx)("br",{}),"Give it a try!"]})]})})},V=n(64),q=n.n(V),$=function(e){var t=e.wallet,n=e.gameId,r=e.rankings,s=e.setRankings,l=e.reloadRankings,o=e.setReloadRankings,d=Object(a.useState)(!1),j=Object(c.a)(d,2),u=j[0],b=j[1],h=Object(a.useState)(!1),O=Object(c.a)(h,2),f=O[0],p=O[1],x=Object(a.useState)("?"),_=Object(c.a)(x,2),m=_[0],g=_[1];return Object(a.useEffect)((function(){if(null!==t&&void 0!==t&&t.publicKey)if(r){var e=r.map((function(e){return e.user})).indexOf(t.publicKey.toString());g(-1===e?"?":e+1)}else g("?")}),[t,n,r,g]),t.publicKey?Object(D.jsxs)("div",{className:q.a.Game,children:[Object(D.jsxs)("div",{className:q.a.Footer,children:[Object(D.jsx)("p",{children:Object(D.jsx)("b",{children:"BETA"})}),Object(D.jsx)("button",{onClick:function(){return p(!0)},children:"RULES"})]}),Object(D.jsxs)("div",{className:q.a.Content,children:[Object(D.jsxs)("div",{className:q.a.GameArea,children:[Object(D.jsx)(G,{user:!0,onProfileClick:function(){return b(!0)}}),Object(D.jsx)(M,{wallet:t.publicKey.toString(),gameId:n,rankings:r,rank:m,reloadRankings:l,setRankings:s,setRank:g,setReloadRankings:o})]}),Object(D.jsx)("div",{className:q.a.Rankings,children:Object(D.jsx)(K,{wallet:t.publicKey.toString(),gameId:n,rankings:r,rank:m})})]}),Object(D.jsx)(J,{wallet:t.publicKey.toString(),isProfileOpen:u,setIsProfileOpen:b}),Object(D.jsx)(Q,{isRulesOpen:f,setIsRulesOpen:p})]}):Object(D.jsx)(i.a,{to:"/"})},ee=function(){var e,t=Object(x.b)(),n=new Date,r=new Date(n.getTime()+6e4*n.getTimezoneOffset());e=-1!==["24","25","26","27","28","29","30"].indexOf(String(r.getDate()).padStart(2,"0"))?"deuceswild":-1!==["31","01","02","03","04","05","06"].indexOf(String(r.getDate()).padStart(2,"0"))?"4swild":"5card";var s=String(r.getDate()).padStart(2,"0")+String(r.getMonth()).padStart(2,"0")+String(r.getFullYear())+e,l=Object(a.useState)(!1),o=Object(c.a)(l,2),d=o[0],j=o[1],u=Object(a.useState)(0),b=Object(c.a)(u,2),h=b[0],O=b[1];return Object(a.useEffect)((function(){C(s).then((function(e){j(e||[])}))}),[t,s,h,j]),Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)(i.d,{children:[Object(D.jsx)(i.b,{path:"/",element:Object(D.jsx)(L,{wallet:t})}),Object(D.jsx)(i.b,{path:"/play",element:Object(D.jsx)($,{wallet:t,gameId:s,rankings:d,setRankings:j,reloadRankings:h,setReloadRankings:O})})]})})},te=function(){var e=p.b.Mainnet,t=Object(o.d)(e),n=Object(a.useMemo)((function(){return[Object(d.a)(),Object(j.a)(),Object(u.a)(),Object(b.a)({options:{clientId:"Get a client ID @ https://developer.tor.us"}}),Object(h.a)(),Object(O.a)({network:e}),Object(f.a)({network:e})]}),[e]);return Object(D.jsx)(_.a,{endpoint:t,children:Object(D.jsx)(m.a,{wallets:n,children:Object(D.jsx)(l.a,{children:Object(D.jsx)(ee,{})})})})};s.a.render(Object(D.jsx)(te,{}),document.getElementById("root"))},56:function(e,t,n){e.exports={Profile:"Profile_Profile__nD2-Z",ProfileMain:"Profile_ProfileMain__18I6y",ProfileInner:"Profile_ProfileInner__risdd",ProfileBlock:"Profile_ProfileBlock__1_2dO Profile_Profile__nD2-Z",ProfileNone:"Profile_ProfileNone__ePzbk Profile_Profile__nD2-Z",History:"Profile_History__3oShl",HistoryEntry:"Profile_HistoryEntry__3jN5Y"}},64:function(e,t,n){e.exports={Game:"Game_Game__1qzE8",Footer:"Game_Footer__3t8B7",Content:"Game_Content__2W_3p",GameArea:"Game_GameArea__38dyN",Rankings:"Game_Rankings__1yrWx"}},76:function(e,t,n){e.exports={Rules:"Rules_Rules__24oWh",RulesMain:"Rules_RulesMain___9aKG",RulesInner:"Rules_RulesInner__1ZpXD",RulesBlock:"Rules_RulesBlock__sU4FC Rules_Rules__24oWh",RulesNone:"Rules_RulesNone__2rXF0 Rules_Rules__24oWh"}}},[[400,1,2]]]);
//# sourceMappingURL=main.1ab93098.chunk.js.map