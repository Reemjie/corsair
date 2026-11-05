import { r as e } from "./motion-wKhEcHeU.js";
import { c as t, n, r, s as i, t as a, __tla as __tla_0 } from "./wallet-D0U5_iuP.js";
import { t as o } from "./rpc-BQNg8r_c.js";
let c, u;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let s;
    s = e();
    c = new a({
        chains: [
            {
                rpcUrl: o
            }
        ],
        defaultChainId: `0x534e5f4d41494e`,
        policies: {
            contracts: {
                "0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3": {
                    methods: [
                        {
                            name: `submit_score`,
                            entrypoint: `submit_score`
                        }
                    ]
                }
            }
        }
    });
    function l(e) {
        return e.id, t.id, {
            nodeUrl: o
        };
    }
    u = function({ children: e }) {
        return (0, s.jsx)(n, {
            chains: [
                t
            ],
            provider: r({
                rpc: l
            }),
            connectors: [
                c
            ],
            explorer: i,
            children: e
        });
    };
});
export { c as n, u as t, __tla };
