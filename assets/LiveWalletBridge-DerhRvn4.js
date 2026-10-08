import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { a as t, o as n } from "./motion-BDjlfrhw.js";
import { t as r } from "./walletApi-D6myOQWw.js";
import { a as i, i as a, o, __tla as __tla_0 } from "./wallet-CnoMKH14.js";
import { n as s, __tla as __tla_1 } from "./cartridge-7pDcJsEA.js";
let u;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_1;
        } catch  {}
    })()
]).then(async ()=>{
    var c = e(n(), 1), l = t();
    u = function({ children: e, autoConnect: t }) {
        let { address: n, account: u } = a(), { connect: d, isPending: f } = i(), { disconnect: p } = o(), [m, h] = (0, c.useState)(null);
        return (0, c.useEffect)(()=>{
            if (!n) {
                h(null);
                return;
            }
            s.username()?.then((e)=>h(e ?? null)).catch(()=>h(null));
        }, [
            n
        ]), (0, c.useEffect)(()=>{
            !t || n || d({
                connector: s
            });
        }, [
            t,
            n,
            d
        ]), (0, l.jsx)(r, {
            value: {
                address: n ?? null,
                account: u ?? null,
                username: m,
                connecting: f,
                ready: !0,
                connect: ()=>d({
                        connector: s
                    }),
                disconnect: ()=>p(),
                openProfile: ()=>{
                    try {
                        s.controller.openProfile();
                    } catch  {}
                }
            },
            children: e
        });
    };
});
export { u as default, __tla };
