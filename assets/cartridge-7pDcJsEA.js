import { a as e } from "./motion-BDjlfrhw.js";
import { c as t, n, r, s as i, t as a, __tla as __tla_0 } from "./wallet-CnoMKH14.js";
let s, l;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let o;
    o = e();
    s = new a({
        chains: [
            {
                rpcUrl: `https://api.cartridge.gg/x/starknet/mainnet`
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
    function c(e) {
        return e.id === t.id ? {
            nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
        } : {
            nodeUrl: `https://api.cartridge.gg/x/starknet/sepolia`
        };
    }
    l = function({ children: e }) {
        return (0, o.jsx)(n, {
            chains: [
                t
            ],
            provider: r({
                rpc: c
            }),
            connectors: [
                s
            ],
            explorer: i,
            children: e
        });
    };
});
export { s as n, l as t, __tla };
