import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { C as o, _ as s, b as c, c as ee, f as te, g as l, h as u, k as d, l as f, m as p, n as m, o as ne, p as re, r as ie, s as h, t as ae, v as g, x as _, y as oe } from "./anchor-UE0q-Ym0.js";
import { a as se, b as ce, d as le, h as ue, m as de, t as fe, x as pe, __tla as __tla_0 } from "./supabase-DqO5a1F5.js";
import { l as me, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let nt;
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
    var he = `/assets/careful-Cp7BVX84.png`, ge = `/assets/cover-B_e5YbfY.png`, _e = `/assets/cursed-DmavkUs_.png`, v = `/assets/detour-D8HBkeuW.png`, ve = `/assets/dock-ePamt-Sr.png`, ye = `/assets/explore-CNxn52P4.png`, be = `/assets/fight-g8Kc5AC3.png`, xe = `/assets/leave-CeE9NwgD.png`, Se = `/assets/lurks-BB0IX5ES.png`, y = `/assets/pact-DCE16eF-.png`, b = `/assets/push-DcLNLHxV.png`, x = `/assets/ritual-B5bqWt-6.png`, S = `/assets/sacrifice-KlI9xYLE.png`, Ce = `/assets/sail-yGR6Adzb.png`, we = `/assets/search-CSNg3Ko5.png`, C = `/assets/speed-BTjZicNY.png`, w = `/assets/take-CO53AH6i.png`, Te = `/assets/tribute-CcshN1U0.png`, Ee = `/assets/vortex-l5f1oTMj.png`, T = e(t(), 1), E = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new me({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function De(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: E,
                entrypoint: `submit_score`,
                calldata: [
                    t.toString(),
                    n.toString(),
                    r.toString(),
                    i.toString(),
                    s,
                    `1`
                ]
            }
        ]);
    }
    var D = `corsair_onboard_v1`;
    function O() {
        try {
            return new Set(JSON.parse(localStorage.getItem(D) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function Oe(e) {
        let t = O();
        t.add(e);
        try {
            localStorage.setItem(D, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function ke(e) {
        let t = O();
        return !t.has(`sail`) && e.turn === 0 && !e.event && !e.showPort && !e.gameOver ? {
            id: `sail`,
            title: `SET SAIL`,
            text: `Move with ← ↑ → (or A / W / D). Sail north. The storm climbs from the south.`
        } : !t.has(`danger`) && e.event && e.event.choices.some((e)=>e.risk === `risky` || e.risk === `bold`) ? {
            id: `danger`,
            title: `A CHOICE`,
            text: `Risky choices pay more — and can sink you. Read both options before you commit.`
        } : !t.has(`storm`) && e.turn > 0 && e.stormDistance <= 8 && !e.gameOver ? {
            id: `storm`,
            title: `THE STORM`,
            text: `Only ${e.stormDistance} turns left. Islands and Kraken Pacts buy you time.`
        } : !t.has(`port`) && e.showPort ? {
            id: `port`,
            title: `SAFE HARBOR`,
            text: `Repair, upgrade hull / cannons / navigation, then leave. Max two special abilities per run.`
        } : !t.has(`hunter`) && e.hunter?.active && !e.gameOver ? {
            id: `hunter`,
            title: `THE HUNTER`,
            text: `It tracks you. Purple tiles hint its next move. Ports and storms lower its awareness.`
        } : null;
    }
    var k = r();
    function Ae({ payload: e, isMobile: t, onShare: n }) {
        return (0, k.jsxs)(i.div, {
            initial: {
                opacity: 0,
                y: 8
            },
            animate: {
                opacity: 1,
                y: 0
            },
            style: {
                width: `100%`,
                maxWidth: t ? `92vw` : 420,
                borderRadius: 16,
                border: `1px solid rgba(200,160,48,0.45)`,
                background: `linear-gradient(160deg, rgba(28,18,6,0.95), rgba(6,10,18,0.96))`,
                boxShadow: `0 0 28px rgba(200,160,48,0.12)`,
                overflow: `hidden`,
                marginBottom: 10
            },
            children: [
                (0, k.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, k.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, k.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, k.jsxs)(`div`, {
                            style: {
                                fontFamily: `'IM Fell English', cursive`,
                                fontSize: 14,
                                color: `rgba(255,255,255,0.6)`,
                                marginTop: 2
                            },
                            children: [
                                `Sunk by `,
                                e.deathName
                            ]
                        })
                    ]
                }),
                (0, k.jsx)(`div`, {
                    style: {
                        display: `grid`,
                        gridTemplateColumns: `repeat(3, 1fr)`,
                        gap: 8,
                        padding: `12px 16px`
                    },
                    children: [
                        {
                            label: `SCORE`,
                            val: e.score.toLocaleString(),
                            color: `#eedd44`
                        },
                        {
                            label: `TURNS`,
                            val: String(e.turn),
                            color: `rgba(255,255,255,0.75)`
                        },
                        {
                            label: `GOLD`,
                            val: String(e.gold),
                            color: `#eedd44`
                        }
                    ].map((e)=>(0, k.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, k.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, k.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: e.color
                                    },
                                    children: e.val
                                })
                            ]
                        }, e.label))
                }),
                (0, k.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, k.jsxs)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 1,
                                color: `rgba(255,255,255,0.3)`
                            },
                            children: [
                                `Seed `,
                                e.seed,
                                ` · playcorsair.xyz`
                            ]
                        }),
                        (0, k.jsx)(i.button, {
                            whileHover: {
                                scale: 1.04
                            },
                            whileTap: {
                                scale: .97
                            },
                            onClick: n,
                            style: {
                                width: `100%`,
                                padding: `12px 18px`,
                                borderRadius: 10,
                                border: `1px solid rgba(255,255,255,0.28)`,
                                background: `rgba(0,0,0,0.45)`,
                                color: `#fff`,
                                cursor: `pointer`,
                                fontSize: 16,
                                letterSpacing: 1,
                                fontFamily: `'Pirata One', cursive`
                            },
                            children: `𝕏 SHARE THIS VOYAGE`
                        })
                    ]
                })
            ]
        });
    }
    async function je(e) {
        try {
            if (typeof navigator < `u` && navigator.share) {
                await navigator.share({
                    text: e,
                    url: `https://playcorsair.xyz/`
                });
                return;
            }
        } catch  {}
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(e)}`, `_blank`);
    }
    var A = {
        gold: .5,
        buy: .5,
        damage: .6,
        streak: .55,
        zone: .6,
        death: .6,
        hunter_near: .65,
        hunter_attack: .7,
        thunder: .55
    }, j = {}, Me = !1;
    function Ne(e) {
        Me = e;
    }
    function M(e) {
        if (!Me) try {
            let t = j[e];
            t || (t = new Audio(`/sounds/${e}.wav`), j[e] = t), t.volume = A[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var Pe = `/assets/swift_sails-YMobDX4v.png`, Fe = `/assets/ghost_ship-4jaVs07k.png`, Ie = `/assets/treasure_hunter-C9jnAyZy.png`, Le = `/assets/storm_rider-BjRGnDwr.png`, Re = `/assets/cursed_greed-BlVfcQDt.png`, ze = `/assets/berserker-B9haxHEY.png`, Be = Object.fromEntries([
        `search`,
        `lurks`,
        `fight`,
        `tribute`,
        `pact`,
        `push`,
        `detour`,
        `take`,
        `leave`,
        `dock`,
        `sail`,
        `ritual`,
        `explore`,
        `careful`,
        `speed`,
        `vortex`,
        `cursed`,
        `sacrifice`,
        `cover`
    ].map((e)=>[
            e,
            new URL(Object.assign({
                "../assets/choices/careful.png": he,
                "../assets/choices/cover.png": ge,
                "../assets/choices/cursed.png": _e,
                "../assets/choices/detour.png": v,
                "../assets/choices/dock.png": ve,
                "../assets/choices/explore.png": ye,
                "../assets/choices/fight.png": be,
                "../assets/choices/leave.png": xe,
                "../assets/choices/lurks.png": Se,
                "../assets/choices/pact.png": y,
                "../assets/choices/push.png": b,
                "../assets/choices/ritual.png": x,
                "../assets/choices/sacrifice.png": S,
                "../assets/choices/sail.png": Ce,
                "../assets/choices/search.png": we,
                "../assets/choices/speed.png": C,
                "../assets/choices/take.png": w,
                "../assets/choices/tribute.png": Te,
                "../assets/choices/vortex.png": Ee
            })[`../assets/choices/${e}.png`], import.meta.url).href
        ])), N = {
        escape: Pe,
        ghost: Fe,
        hunter: Ie,
        rider: Le,
        greed: Re,
        berserker: ze
    }, Ve = `/icons/gold.png`, He = {
        1: `/scenes/island.jpg`,
        2: `/scenes/storm.jpg`,
        3: `/scenes/ancient-kraken.jpg`
    }, Ue = {
        kraken: `/scenes/kraken.jpg`,
        ancient_kraken: `/scenes/ancient-kraken.jpg`,
        storm: `/scenes/storm.jpg`,
        island: `/scenes/island.jpg`,
        treasure: `/scenes/treasure.jpg`,
        cursed_treasure: `/scenes/cursed_treasure.jpg`,
        pirate: `/scenes/pirate.jpg`,
        port: `/scenes/port.jpg`,
        rocks: `/scenes/rocks.jpg`,
        wreck: `/scenes/wreck.jpg`,
        maelstrom: `/scenes/maelstrom.jpg`
    }, We = {
        kraken: `/scenes/kraken.mp4`,
        ancient_kraken: `/scenes/ancient_kraken.mp4`,
        storm: `/scenes/storm.mp4`,
        island: `/scenes/island.mp4`,
        treasure: `/scenes/treasure.mp4`,
        cursed_treasure: `/scenes/cursed_treasure.mp4`,
        pirate: `/scenes/pirate.mp4`,
        port: `/scenes/port.mp4`,
        rocks: `/scenes/rocks.mp4`,
        wreck: `/scenes/wreck.mp4`,
        maelstrom: `/scenes/maelstrom.mp4`,
        death: `/scenes/death.mp4`
    }, Ge = {
        kraken: `The Kraken Rises`,
        ancient_kraken: `The Ancient One Awakens`,
        storm: `Into the Storm`,
        island: `Uncharted Island`,
        treasure: `Hidden Treasure`,
        cursed_treasure: `Cursed Gold`,
        pirate: `Pirates on the Horizon`,
        port: `Safe Harbor`,
        rocks: `Treacherous Reef`,
        wreck: `A Ghostly Wreck`,
        death: `Your Voyage Ends`,
        maelstrom: `The Maelstrom`
    }, Ke = {
        sea: `〰`,
        storm: `/icons_ui/storm.png`,
        pirate: `/icons_ui/swords.png`,
        treasure: `/icons_ui/treasure.png`,
        port: `/icons/port.png`,
        kraken: `/icons_ui/kraken.png`,
        wreck: `/icons/wreck.png`,
        island: `/icons/island.png`,
        rocks: `/icons/rocks.png`
    }, qe = {
        1: {
            sea: `#1a3a4a`,
            storm: `#2a1a4a`,
            pirate: `#3a1010`,
            treasure: `#2a2a00`,
            port: `#0a2a2a`,
            kraken: `#2a0a3a`,
            wreck: `#2a1a0a`,
            island: `#0a2a0a`,
            rocks: `#1a1a1a`,
            portal: `#1a0a3a`
        },
        2: {
            sea: `#1a2a3a`,
            storm: `#3a0a5a`,
            pirate: `#4a0a1a`,
            treasure: `#2a1a00`,
            port: `#0a1a2a`,
            kraken: `#3a0a4a`,
            wreck: `#3a1a0a`,
            island: `#0a1a0a`,
            rocks: `#0a0a1a`,
            portal: `#2a0a4a`
        },
        3: {
            sea: `#0a1a2a`,
            storm: `#2a0a3a`,
            pirate: `#3a0505`,
            treasure: `#1a1000`,
            port: `#051015`,
            kraken: `#200530`,
            wreck: `#200a05`,
            island: `#051005`,
            rocks: `#050508`,
            portal: `#150020`
        }
    }, Je = {
        1: {
            treasure: `#eedd44`,
            port: `#44cccc`,
            kraken: `#cc44ee`,
            pirate: `#ee4444`,
            portal: `#8866ff`
        },
        2: {
            treasure: `#cc9922`,
            port: `#2299aa`,
            kraken: `#aa22cc`,
            pirate: `#cc2222`,
            portal: `#6644cc`
        },
        3: {
            treasure: `#aa7700`,
            port: `#116677`,
            kraken: `#880099`,
            pirate: `#aa0000`,
            portal: `#440088`
        }
    };
    function Ye({ ok: e }) {
        return (0, k.jsx)(`span`, {
            style: {
                display: `inline-block`,
                width: 7,
                height: 7,
                borderRadius: `50%`,
                flexShrink: 0,
                marginTop: 6,
                marginRight: 7,
                background: e ? `#4ccf7e` : `#d9534f`,
                boxShadow: e ? `0 0 5px rgba(76,207,126,0.6)` : `0 0 5px rgba(217,83,79,0.6)`
            }
        });
    }
    function Xe({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, k.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, k.jsx)(Ye, {
                        ok: t
                    }),
                    (0, k.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, k.jsxs)(`div`, {
            style: {
                fontSize: n,
                display: `flex`,
                flexDirection: `column`,
                gap: 3
            },
            children: [
                e.map((e, t)=>i(e, !0, `p` + t)),
                t.map((e, t)=>i(e, !1, `c` + t))
            ]
        });
    }
    var Ze = [
        `ghost`,
        `hunter`,
        `rider`,
        `greed`,
        `berserker`,
        `escape`,
        `vision`,
        `compass`,
        `detector`,
        `power`,
        `armor`,
        `explorer`,
        `stormbreaker`
    ], P = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: 80,
            icon: `ghost`,
            build: `combat`
        },
        {
            id: `rider`,
            name: `Storm Rider`,
            pros: [
                `Storm immunity. Storm cells give gold+score.`,
                `Hull+Rider synergy heals on storm.`
            ],
            cons: [
                `-1 HP every 2 turns. Repairs -50%.`
            ],
            cost: 90,
            icon: `rider`,
            build: `escape`
        },
        {
            id: `greed`,
            name: `Cursed Greed`,
            pros: [
                `Gold x1.5 on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm gets worse every 200g. Hunter speeds up at 800g.`
            ],
            cost: 60,
            icon: `greed`,
            build: `gold`
        },
        {
            id: `berserker`,
            name: `Berserker`,
            pros: [
                `Power x2. Weapon3 synergy = 15% crit chance.`
            ],
            cons: [
                `All damage received x2.`
            ],
            cost: 60,
            icon: `berserker`,
            build: `combat`
        },
        {
            id: `hunter`,
            name: `Treasure Hunter`,
            pros: [
                `All treasures revealed on map. x3 combo = treasure reward x2.`
            ],
            cons: [
                `Storm surges +10% more frequent.`
            ],
            cost: 75,
            icon: `hunter`,
            build: `gold`
        },
        {
            id: `escape`,
            name: `Swift Sails`,
            pros: [
                `Skip any dangerous event twice per run with no consequences. Save for the worst moments.`
            ],
            cons: [],
            cost: 65,
            icon: `escape`,
            build: `escape`
        }
    ], F = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function Qe(e) {
        let t = (e || ``).toLowerCase();
        return t.includes(`storm`) || t.includes(`lightning`) || t.includes(`splits the deck`) || t.includes(`waves`) || t.includes(`surge`) ? {
            name: `The Storm`,
            tip: `Rituals at islands (+4 turns) and Kraken Pacts (+6) push it back.`
        } : t.includes(`tentacles`) || t.includes(`surfaces`) || t.includes(`hunter`) ? {
            name: `The Hunter`,
            tip: `Ports (-15) and storms (-10) lower its awareness. Watch the bar.`
        } : t.includes(`pirate`) ? {
            name: `Pirates`,
            tip: `Power wins fights — or swallow your pride and pay tribute.`
        } : t.includes(`kraken`) ? {
            name: `The Kraken`,
            tip: `Sometimes restraint is the better part of valor.`
        } : t.includes(`reef`) || t.includes(`rock`) ? {
            name: `The Reefs`,
            tip: `Careful navigation costs a turn but spares the hull.`
        } : t.includes(`curse`) ? {
            name: `The Curse`,
            tip: `Cursed gold always collects its price.`
        } : {
            name: `The Deep`,
            tip: `The sea keeps its secrets.`
        };
    }
    var $e = (e, t = 14)=>(0, k.jsx)(m, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        }), et = (e)=>e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`, tt = (e, t)=>e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, k.jsx)(`img`, {
            src: e,
            style: {
                width: t,
                height: t,
                objectFit: `contain`,
                borderRadius: `50%`,
                mixBlendMode: `lighten`,
                filter: `drop-shadow(0 0 12px rgba(200,160,48,0.6))`
            }
        }) : (0, k.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    function I({ tip: e, isMobile: t, onDismiss: n }) {
        return (0, k.jsxs)(i.button, {
            type: `button`,
            initial: {
                opacity: 0,
                y: 6
            },
            animate: {
                opacity: 1,
                y: 0
            },
            onClick: n,
            style: {
                maxWidth: 440,
                margin: `0 12px 10px`,
                padding: `10px 14px`,
                border: `1px solid rgba(200,160,48,0.35)`,
                borderRadius: 10,
                background: `rgba(12,18,28,0.82)`,
                color: `rgba(255,255,255,0.85)`,
                textAlign: `left`,
                cursor: `pointer`,
                fontFamily: `'IM Fell English', cursive`
            },
            children: [
                (0, k.jsx)(`div`, {
                    style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: `#c8a030`,
                        fontFamily: `'Cinzel', serif`,
                        marginBottom: 4
                    },
                    children: e.title
                }),
                (0, k.jsx)(`div`, {
                    style: {
                        fontSize: t ? 13 : 15,
                        lineHeight: 1.35
                    },
                    children: e.text
                }),
                (0, k.jsx)(`div`, {
                    style: {
                        fontSize: 10,
                        letterSpacing: 1,
                        color: `rgba(255,255,255,0.35)`,
                        fontFamily: `'Cinzel', serif`,
                        marginTop: 6
                    },
                    children: `TAP TO DISMISS`
                })
            ]
        });
    }
    nt = function({ walletAddress: e, account: t, username: r, onHome: me, dailySeed: he, isDaily: ge, seedToken: _e, shipId: v, resumeState: ve, resumeRunId: ye, resumeActions: be }) {
        let { connect: xe, connecting: Se } = a(), [y, b] = (0, T.useState)(()=>ve ?? te(he, v ?? `default`)), [x, S] = (0, T.useState)(null), [Ce, we] = (0, T.useState)(!1), [C, w] = (0, T.useState)([]), [Te, Ee] = (0, T.useState)([]), [E, D] = (0, T.useState)(null), O = (0, T.useRef)((y.relics ?? []).length), [A, j] = (0, T.useState)(!1), [Me, Pe] = (0, T.useState)(!1), Fe = (0, T.useRef)(!1), [Ie, Le] = (0, T.useState)([]), [Re, ze] = (0, T.useState)(null), [Ye, nt] = (0, T.useState)(0), [L, rt] = (0, T.useState)(()=>parseInt(localStorage.getItem(`corsair_best_score`) || `0`)), [it, at] = (0, T.useState)(!1), [ot, st] = (0, T.useState)(!1), [R, ct] = (0, T.useState)(window.innerWidth < 768), z = ge === !0;
        (0, T.useEffect)(()=>{
            if (y.gameOver) {
                S(null);
                return;
            }
            y.turn > 0 && Oe(`sail`), S(ke(y));
        }, [
            y.turn,
            y.event,
            y.showPort,
            y.hunter?.active,
            y.stormDistance,
            y.gameOver
        ]);
        let B = ()=>{
            x && (Oe(x.id), S(null));
        };
        (0, T.useEffect)(()=>{
            z && (p(), e && f());
        }, []);
        let V = (0, T.useRef)(ye ?? crypto.randomUUID()), H = (0, T.useRef)(be ? [
            ...be
        ] : []), U = (e)=>{
            H.current.push(e);
        }, W = (0, T.useRef)([]);
        (0, T.useEffect)(()=>{
            let t = e;
            !t || y.gameOver || H.current.length !== 0 && h({
                run_id: V.current,
                wallet_address: t,
                seed: y.seed,
                ship_id: v ?? `default`,
                is_daily: z,
                actions: H.current,
                turn: y.turn,
                score: y.score,
                saved_at: Date.now()
            });
        }, [
            y
        ]), (0, T.useEffect)(()=>{
            let e = H.current.length - 1;
            e < 0 || (W.current[e * 3] = y.score, W.current[e * 3 + 1] = y.ship.hull, W.current[e * 3 + 2] = y.rngState ?? -1);
        }, [
            y
        ]);
        let lt = (0, T.useRef)(0);
        (0, T.useEffect)(()=>{
            e && (ye || pe({
                run_id: V.current,
                wallet_address: e,
                username: r ?? null,
                seed: y.seed,
                is_daily: z,
                seed_token: _e ?? null
            }));
        }, []), (0, T.useEffect)(()=>{
            !e || y.gameOver || y.turn - lt.current < 3 || (lt.current = y.turn, de(V.current, {
                score: y.score,
                turn: y.turn,
                zone: y.currentZone ?? 1,
                gold: y.ship.gold,
                hull: y.ship.hull
            }));
        }, [
            y.turn
        ]), (0, T.useEffect)(()=>{
            !e || !y.gameOver || Fe.current || (Fe.current = !0, se(V.current, {
                score: y.score,
                turn: y.turn,
                zone: y.currentZone ?? 1,
                gold: y.ship.gold,
                hull: y.ship.hull,
                run_title: y.runTitle
            }), ce({
                run_id: V.current,
                wallet_address: e,
                seed: y.seed,
                ship_id: v ?? `default`,
                is_daily: z,
                actions: H.current,
                checks: H.current.flatMap((e, t)=>[
                        W.current[t * 3] ?? -1,
                        W.current[t * 3 + 1] ?? -1,
                        W.current[t * 3 + 2] ?? -1
                    ]),
                final_score: y.score,
                final_turn: y.turn
            }).then(()=>fe(V.current)).then((e)=>{
                e?.approved ? (j(!0), e.nft?.minted?.length && Le(e.nft.minted.map((e)=>typeof e == `string` ? e : e.nft))) : console.warn(`[approve] refuse :`, e?.raison ?? e);
            }).catch((e)=>{
                console.warn(`[approve]`, e), ne(`approve`, {
                    run_id: V.current
                });
            }), ie());
        }, [
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            let e = ()=>ct(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [G, K] = (0, T.useState)(null), [ut, dt] = (0, T.useState)(!1), [ft, q] = (0, T.useState)(!1), pt = (0, T.useRef)(null), mt = (0, T.useRef)(new Set), [ht, gt] = (0, T.useState)(null);
        (0, T.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !y.gameOver || !z || !e || !n || A && le().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && gt({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            y.gameOver,
            A
        ]);
        let _t = (0, T.useRef)({
            x: y.ship.x,
            y: y.ship.y
        }), [vt, yt] = (0, T.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [bt, xt] = (0, T.useState)({
            x: 0,
            y: 0
        });
        (0, T.useEffect)(()=>{
            let e = _t.current, t = y.ship.x - e.x, n = y.ship.y - e.y;
            if (_t.current = {
                x: y.ship.x,
                y: y.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = y.ship.vision * 2 + 1, i = (R ? Math.floor((window.innerWidth - 16) / r) : Math.floor(Math.min(window.innerWidth * .5, window.innerHeight * .62) / r) - 4) + 4, a = .8;
            yt({
                x: t * i * a,
                y: n * i * a,
                instant: !0
            }), xt({
                x: t,
                y: n
            });
            let o = setTimeout(()=>xt({
                    x: 0,
                    y: 0
                }), 380), s = requestAnimationFrame(()=>yt({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(s), clearTimeout(o);
            };
        }, [
            y.ship.x,
            y.ship.y
        ]);
        let [St, Ct] = (0, T.useState)(!1), [J, wt] = (0, T.useState)(null), [Tt, Et] = (0, T.useState)(!1), [Dt, Ot] = (0, T.useState)(!1), [kt, At] = (0, T.useState)(!1), [jt, Mt] = (0, T.useState)(!1), [Nt, Pt] = (0, T.useState)(!1), [Ft, It] = (0, T.useState)(!1), [Lt, Rt] = (0, T.useState)(!1), [zt, Bt] = (0, T.useState)(!1), [Vt, Ht] = (0, T.useState)(!1), [Ut, Wt] = (0, T.useState)(!1), [Gt, Kt] = (0, T.useState)(!1), [qt, Jt] = (0, T.useState)(null), [Yt, Xt] = (0, T.useState)(0), Zt = ()=>{
            we(!0), setTimeout(()=>we(!1), 400);
        }, Qt = (e)=>{
            Jt(e), setTimeout(()=>Jt(null), 150);
        }, Y = y, X = Math.min(100, (1 - Y.stormDistance / 10) * 100), $t = Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`, en = !Y.escapeUsed && Y.ship.upgrades.includes(`escape`) && Y.event && Y.event.choices[0].risk !== `safe`;
        (0, T.useEffect)(()=>{
            if (R) {
                K(null);
                return;
            }
            if (y.gameOver) return;
            let e = y.event?.cellType;
            if (e && We[e]) {
                if (mt.current.has(e)) return;
                mt.current.add(e), K(e);
                let t = setTimeout(()=>K(null), 5e3);
                return ()=>clearTimeout(t);
            }
        }, [
            y.event,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Kt(!1);
                return;
            }
            y.event?.cellType === `port` && !R && (Kt(!0), setTimeout(()=>Kt(!1), 5e3));
        }, [
            y.event,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Rt(!1);
                return;
            }
            if (y.gameOver) {
                Rt(!1);
                return;
            }
            if (y.event?.cellType === `rocks` && !R) {
                Rt(!0);
                let e = setTimeout(()=>Rt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Bt(!1);
                return;
            }
            if (y.event?.cellType === `treasure` && !R) {
                Bt(!0);
                let e = setTimeout(()=>Bt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Ht(!1);
                return;
            }
            if (y.event?.cellType === `cursed_treasure` && !R) {
                Ht(!0);
                let e = setTimeout(()=>Ht(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Wt(!1);
                return;
            }
            if (y.event?.cellType === `storm` && !R) {
                Wt(!0);
                let e = setTimeout(()=>Wt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Pt(!1);
                return;
            }
            if (y.event?.cellType === `ancient_kraken` && !R) {
                Pt(!0);
                let e = setTimeout(()=>Pt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                It(!1);
                return;
            }
            if (y.event?.cellType === `maelstrom` && !R) {
                It(!0);
                let e = setTimeout(()=>It(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Mt(!1);
                return;
            }
            if (y.event?.cellType === `island` && !R) {
                Mt(!0);
                let e = setTimeout(()=>Mt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                At(!1);
                return;
            }
            if (y.gameOver) {
                At(!1);
                return;
            }
            if (y.event?.cellType === `wreck` && !R) {
                At(!0);
                let e = setTimeout(()=>At(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Ot(!1);
                return;
            }
            if (y.gameOver) {
                Ot(!1);
                return;
            }
            if (y.event?.cellType === `pirate` && !R) {
                Ot(!0);
                let e = setTimeout(()=>Ot(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                Et(!1);
                return;
            }
            if (y.event?.cellType === `kraken` && !R) {
                Et(!0);
                let e = setTimeout(()=>Et(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            y.event,
            y.gameOver
        ]);
        let tn = (0, T.useRef)(1);
        (0, T.useEffect)(()=>{
            let e = y.currentZone ?? 1;
            if (e > tn.current) {
                let t = d[e];
                ze({
                    lines: [
                        ...t.transitionText,
                        ``,
                        `You have entered:`,
                        t.name.toUpperCase()
                    ],
                    zone: e
                }), nt(0), tn.current = e;
            }
        }, [
            y.currentZone
        ]), (0, T.useEffect)(()=>{
            if (!Re) return;
            if (Ye >= Re.lines.length) {
                setTimeout(()=>ze(null), 1e3);
                return;
            }
            let e = setTimeout(()=>nt((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            Re,
            Ye
        ]), (0, T.useEffect)(()=>{
            y.gameOver && y.score > 0 && y.score > L && (rt(y.score), at(!0), localStorage.setItem(`corsair_best_score`, y.score.toString()));
        }, [
            y.gameOver
        ]), (0, T.useEffect)(()=>{
            if (y.gameOver) {
                let e = o(y);
                if (e.length > 0 && (Ee(e), M(`streak`)), ie(), R) q(!0);
                else {
                    let e = nn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Ct(!1), K(`death`), pt.current = setTimeout(()=>{
                            q((e)=>e || !0), K(null);
                        }, 9e3);
                    }, e);
                }
            } else pt.current &&= (clearTimeout(pt.current), null), q(!1), K(null), mt.current.clear();
        }, [
            y.gameOver
        ]);
        let nn = (0, T.useRef)(!1), rn = (0, T.useRef)(-99), an = (0, T.useRef)(null);
        (0, T.useEffect)(()=>{
            y.log?.includes(`Tentacles rake the hull`) && (y.turn - rn.current < 3 || (rn.current = y.turn, an.current && clearTimeout(an.current), nn.current = !0, Ct(!0), an.current = setTimeout(()=>{
                nn.current = !1, Ct(!1);
            }, 3500)));
        }, [
            y.log,
            y.turn
        ]), (0, T.useEffect)(()=>{
            if (!St) return;
            let e = ()=>{
                nn.current = !1, Ct(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            St
        ]), (0, T.useEffect)(()=>{
            y.log?.includes(`⚡ Storm surge`) && Qt(`rgba(100,150,255,0.35)`), (y.event?.cellType === `kraken` || y.event?.cellType === `ancient_kraken`) && Qt(`rgba(150,0,255,0.3)`), y.event?.cellType === `ancient_kraken` && Qt(`rgba(200,160,48,0.4)`);
            let e = y.hunter;
            if (e?.active) {
                let t = Math.abs(e.x - y.ship.x) + Math.abs(e.y - y.ship.y);
                Xt(t <= 1 ? .72 : t <= 2 ? .5 : t <= 4 ? .28 : .12);
            } else Xt(0);
        }, [
            y
        ]), (0, T.useEffect)(()=>{
            let e = (e)=>{
                if (y.gameOver || y.event || y.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && Z(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && Z(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && Z(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            y.gameOver,
            y.event,
            y.showPort,
            y.turn
        ]);
        let Z = (e, t)=>{
            U(e === -1 ? 0 : e === 1 ? 2 : 1), b((n)=>u(n, e, t));
        }, on = (e)=>{
            U(10 + e), b((t)=>{
                let n = g(t, e);
                return n.ship.hull < t.ship.hull && Zt(), n;
            });
        }, sn = ()=>{
            U(20), b((e)=>oe(e));
        }, cn = (e)=>{
            U(e === `hull` ? 30 : e === `weapon` ? 31 : 32), b((t)=>c(t, e));
        }, ln = async ()=>{
            let t = e ? await ue(e) : null, n = te(t?.seed, v ?? `default`);
            H.current = [], W.current = [], lt.current = 0, V.current = crypto.randomUUID(), Fe.current = !1, j(!1), Pe(!1), Le([]), e && pe({
                run_id: V.current,
                wallet_address: e,
                username: r ?? null,
                seed: n.seed,
                is_daily: !1,
                seed_token: t?.seed_token ?? null
            }), b(n);
        }, Q = (0, T.useRef)(null), [$, un] = (0, T.useState)(!1);
        (0, T.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = $, n.play().catch(()=>{}), Q.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), Q.current && (Q.current.pause(), Q.current.currentTime = 0);
            };
        }, []), (0, T.useEffect)(()=>{
            Q.current && (Q.current.muted = $), Ne($);
        }, [
            $
        ]);
        let dn = (0, T.useRef)({
            gold: y.ship.gold,
            hull: y.ship.hull,
            zone: y.currentZone ?? 1,
            over: y.gameOver,
            mult: y.scoreMultiplier ?? 1,
            hmode: y.hunter?.mode ?? ``,
            storm: y.stormDistance
        });
        return (0, T.useEffect)(()=>{
            let e = dn.current, t = !!y.log?.includes(`Tentacles rake`);
            if (y.gameOver && !e.over) M(`death`);
            else if (!y.gameOver) {
                y.ship.gold > e.gold && M(`gold`), y.ship.gold < e.gold && y.showPort && M(`buy`), t ? M(`hunter_attack`) : y.ship.hull < e.hull && M(`damage`), (y.currentZone ?? 1) !== e.zone && M(`zone`), (y.scoreMultiplier ?? 1) > e.mult && M(`streak`);
                let n = y.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && M(`hunter_near`), y.stormDistance < e.storm && y.stormDistance <= 4 && y.stormDistance > 0 && (M(`thunder`), Zt());
            }
            dn.current = {
                gold: y.ship.gold,
                hull: y.ship.hull,
                zone: y.currentZone ?? 1,
                over: y.gameOver,
                mult: y.scoreMultiplier ?? 1,
                hmode: y.hunter?.mode ?? ``,
                storm: y.stormDistance
            };
            let n = (y.relics ?? []).length;
            if (n > O.current) {
                let e = (y.relics ?? [])[n - 1], t = _(e);
                t && (D(t), M(`streak`));
            }
            O.current = n;
        }, [
            y
        ]), (0, k.jsxs)(i.div, {
            animate: Ce ? {
                x: [
                    0,
                    -8,
                    8,
                    -6,
                    6,
                    -3,
                    3,
                    0
                ]
            } : {
                x: 0
            },
            transition: {
                duration: .4
            },
            style: {
                height: `100dvh`,
                width: `100vw`,
                background: `#080f18`,
                boxShadow: Y.stormDistance <= 2 ? `inset 0 0 80px rgba(220,30,30,0.6)` : Y.stormDistance <= 4 ? `inset 0 0 50px rgba(220,100,30,0.3)` : `none`,
                color: `#e8e0d0`,
                fontFamily: `'Pirata One', cursive`,
                display: `flex`,
                flexDirection: `column`,
                overflow: `hidden`,
                position: `relative`
            },
            children: [
                (0, k.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, k.jsx)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: .22
                            },
                            transition: {
                                duration: 1.6,
                                ease: `easeOut`
                            },
                            style: {
                                position: `absolute`,
                                inset: 0,
                                backgroundImage: `url(${He[Y.currentZone ?? 1] ?? He[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Y.currentZone ?? 1),
                        (0, k.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        })
                    ]
                }),
                qt && (0, k.jsx)(i.div, {
                    initial: {
                        opacity: 1
                    },
                    animate: {
                        opacity: 0
                    },
                    transition: {
                        duration: .15
                    },
                    style: {
                        position: `fixed`,
                        inset: 0,
                        background: qt,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                Yt > 0 && (0, k.jsx)(i.div, {
                    animate: {
                        opacity: [
                            Yt,
                            Yt * .6,
                            Yt
                        ]
                    },
                    transition: {
                        repeat: 1 / 0,
                        duration: 1.5,
                        ease: `easeInOut`
                    },
                    style: {
                        position: `fixed`,
                        inset: 0,
                        background: `radial-gradient(ellipse at center, transparent 40%, rgba(80,0,80,0.8) 100%)`,
                        zIndex: 98,
                        pointerEvents: `none`
                    }
                }),
                Y.ship.hull <= 5 && !Y.gameOver && (0, k.jsx)(i.div, {
                    animate: {
                        opacity: [
                            .4,
                            0,
                            .4
                        ]
                    },
                    transition: {
                        repeat: 1 / 0,
                        duration: Y.ship.hull <= 1 ? .4 : Y.ship.hull <= 3 ? .6 : 1
                    },
                    style: {
                        position: `fixed`,
                        inset: 0,
                        background: `radial-gradient(ellipse at center, transparent 50%, rgba(220,30,30,0.5) 100%)`,
                        zIndex: 97,
                        pointerEvents: `none`
                    }
                }),
                (0, k.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        padding: R ? `6px 8px` : `16px 28px`,
                        background: `rgba(6,11,18,0.92)`,
                        borderBottom: `1px solid rgba(255,255,255,0.06)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5
                    },
                    children: [
                        (0, k.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, k.jsx)(`img`, {
                                    src: ae,
                                    style: {
                                        width: R ? 28 : 56,
                                        height: R ? 28 : 56,
                                        objectFit: `contain`
                                    }
                                }),
                                !R && ` CORSAIR`
                            ]
                        }),
                        (0, k.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: R ? 8 : 24
                            },
                            children: (R ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Y.ship.hull}/${Y.ship.maxHull}`,
                                    color: $t
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: Y.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: Y.ship.power,
                                    color: `#ee8844`
                                }
                            ] : [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Y.ship.hull}/${Y.ship.maxHull}`,
                                    color: $t
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: Y.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `vision`,
                                    label: `VISION`,
                                    val: Y.ship.vision,
                                    color: `#6aaccc`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: Y.ship.power,
                                    color: `#ee8844`
                                },
                                {
                                    icon: `turn`,
                                    label: `TURN`,
                                    val: Y.turn,
                                    color: `rgba(255,255,255,0.4)`
                                },
                                {
                                    icon: `turn`,
                                    label: (d[Y.currentZone ?? 1]?.name ?? `The Coasts`).toUpperCase(),
                                    val: ``,
                                    color: `#aa44ee`
                                }
                            ]).map((e)=>(0, k.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: R ? 10 : 17,
                                                color: `rgba(255,255,255,0.7)`,
                                                letterSpacing: 1,
                                                fontFamily: `'Pirata One', cursive`
                                            },
                                            children: e.label
                                        }),
                                        (0, k.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 4,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, k.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: Ve,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: R ? 24 : 40,
                                                        height: R ? 24 : 40,
                                                        objectFit: `contain`
                                                    }
                                                }),
                                                (0, k.jsx)(`span`, {
                                                    style: {
                                                        fontSize: R ? 14 : 22,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !R && (0, k.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 16
                            },
                            children: [
                                (0, k.jsxs)(`div`, {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, k.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 56,
                                                height: 56,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, k.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Y.score
                                        }),
                                        ` pts`
                                    ]
                                }),
                                (0, k.jsx)(`button`, {
                                    onClick: ()=>un((e)=>!e),
                                    "aria-label": $ ? `Unmute sound` : `Mute sound`,
                                    title: $ ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.1)`,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontSize: 18,
                                        cursor: `pointer`,
                                        borderRadius: 8,
                                        padding: `6px 10px`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: $ ? `🔇` : `🔊`
                                })
                            ]
                        }),
                        R && (0, k.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, k.jsxs)(`span`, {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        Y.score,
                                        `pts`
                                    ]
                                }),
                                (0, k.jsx)(`button`, {
                                    onClick: ()=>un((e)=>!e),
                                    "aria-label": $ ? `Unmute sound` : `Mute sound`,
                                    title: $ ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `none`,
                                        color: `rgba(255,255,255,0.4)`,
                                        fontSize: 14,
                                        cursor: `pointer`
                                    },
                                    children: $ ? `🔇` : `🔊`
                                })
                            ]
                        })
                    ]
                }),
                R && (Y.relics ?? []).length > 0 && (0, k.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Y.relics ?? []).map((e)=>{
                        let t = _(e);
                        return t ? (0, k.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, k.jsx)(m, {
                                name: t.icon,
                                size: 15
                            })
                        }, e) : null;
                    })
                }),
                R && Y.hunter?.active && (()=>{
                    let e = Math.abs(Y.hunter.x - Y.ship.x) + Math.abs(Y.hunter.y - Y.ship.y);
                    return (0, k.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            alignItems: `center`,
                            gap: 8,
                            padding: `4px 10px`,
                            background: e <= 2 ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid rgba(180,30,180,0.3)`
                        },
                        children: [
                            (0, k.jsx)(m, {
                                name: `kraken`,
                                size: 15,
                                style: {
                                    marginRight: 2
                                }
                            }),
                            (0, k.jsxs)(`div`, {
                                style: {
                                    fontSize: 11,
                                    color: Y.hunter.mode === `frenzy` ? `#ff6666` : Y.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.4)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: 1,
                                    minWidth: 70
                                },
                                children: [
                                    $e(Y.hunter.mode),
                                    et(Y.hunter.mode)
                                ]
                            }),
                            (0, k.jsx)(`div`, {
                                style: {
                                    fontSize: 10,
                                    color: e <= 1 ? `#ff6677` : `rgba(255,255,255,0.45)`,
                                    fontFamily: `'Cinzel', serif`,
                                    minWidth: 52
                                },
                                children: e <= 1 ? `HULL!` : `${e} away`
                            }),
                            (0, k.jsx)(`div`, {
                                style: {
                                    flex: 1,
                                    height: 3,
                                    background: `rgba(255,255,255,0.1)`,
                                    borderRadius: 2
                                },
                                children: (0, k.jsx)(`div`, {
                                    style: {
                                        height: 3,
                                        borderRadius: 2,
                                        width: `${Y.hunter.awareness}%`,
                                        background: Y.hunter.awareness >= 80 ? `#ee4444` : Y.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`,
                                        transition: `width 0.5s`
                                    }
                                })
                            }),
                            (0, k.jsxs)(`span`, {
                                style: {
                                    fontSize: 10,
                                    color: `rgba(255,255,255,0.3)`,
                                    fontFamily: `'Cinzel', serif`
                                },
                                children: [
                                    Y.hunter.awareness,
                                    `%`
                                ]
                            })
                        ]
                    });
                })(),
                (0, k.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, k.jsxs)(`div`, {
                            style: {
                                width: R ? 0 : 260,
                                padding: R ? 0 : `16px 12px`,
                                overflow: `hidden`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 10,
                                borderRight: R ? `none` : `1px solid rgba(255,255,255,0.05)`,
                                transition: `width 0.3s`
                            },
                            children: [
                                (0, k.jsxs)(`div`, {
                                    style: {
                                        background: X > 70 ? `rgba(180,30,30,0.2)` : `rgba(255,255,255,0.03)`,
                                        border: `1px solid ${X > 70 ? `rgba(220,50,50,0.5)` : `rgba(255,255,255,0.08)`}`,
                                        borderRadius: 10,
                                        padding: `12px 10px`
                                    },
                                    children: [
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: 14,
                                                color: X > 70 ? `#ee4444` : `rgba(255,255,255,0.3)`,
                                                letterSpacing: 2,
                                                marginBottom: 6
                                            },
                                            children: `⛈ STORM`
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: 29,
                                                fontWeight: 700,
                                                color: X > 70 ? `#ee4444` : `#ee8844`
                                            },
                                            children: Y.stormDistance
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: 20,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                marginTop: 2
                                            },
                                            children: `turns until impact`
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 8
                                            },
                                            children: (0, k.jsx)(i.div, {
                                                animate: {
                                                    width: `${X}%`
                                                },
                                                transition: {
                                                    duration: .5
                                                },
                                                style: {
                                                    height: 4,
                                                    borderRadius: 2,
                                                    background: `linear-gradient(90deg,#2a5a2a,#ee4444)`
                                                }
                                            })
                                        })
                                    ]
                                }),
                                Y.hunter && (()=>{
                                    let e = Math.abs(Y.hunter.x - Y.ship.x) + Math.abs(Y.hunter.y - Y.ship.y), t = e <= 2;
                                    return (0, k.jsxs)(`div`, {
                                        style: {
                                            background: t ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Y.hunter.mode === `frenzy` || t ? `rgba(220,50,80,0.65)` : Y.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 10,
                                            padding: `12px 10px`,
                                            marginTop: 4
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: t ? `#ff8899` : `rgba(200,100,220,0.8)`,
                                                    letterSpacing: 2,
                                                    marginBottom: 6
                                                },
                                                children: `🐙 HUNTER`
                                            }),
                                            (0, k.jsxs)(`div`, {
                                                style: {
                                                    display: `inline-block`,
                                                    padding: `2px 10px`,
                                                    borderRadius: 6,
                                                    fontSize: 11,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 6,
                                                    background: Y.hunter.mode === `frenzy` ? `rgba(220,30,30,0.3)` : Y.hunter.mode === `stalking` ? `rgba(180,30,180,0.3)` : Y.hunter.mode === `searching` ? `rgba(30,100,180,0.3)` : `rgba(255,255,255,0.06)`,
                                                    color: Y.hunter.mode === `frenzy` ? `#ff6666` : Y.hunter.mode === `stalking` ? `#dd88ff` : Y.hunter.mode === `searching` ? `#66aaff` : `rgba(255,255,255,0.4)`,
                                                    border: `1px solid ${Y.hunter.mode === `frenzy` ? `rgba(220,30,30,0.6)` : Y.hunter.mode === `stalking` ? `rgba(180,30,180,0.5)` : `rgba(255,255,255,0.1)`}`
                                                },
                                                children: [
                                                    $e(Y.hunter.mode),
                                                    et(Y.hunter.mode)
                                                ]
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: e <= 1 ? `#ff5566` : e <= 2 ? `#eeaa66` : `rgba(255,255,255,0.45)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginBottom: 6
                                                },
                                                children: e <= 1 ? `ON YOUR HULL` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`
                                            }),
                                            (0, k.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    letterSpacing: 1,
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    `AWARENESS `,
                                                    Y.hunter.awareness,
                                                    `%`
                                                ]
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    height: 4,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2
                                                },
                                                children: (0, k.jsx)(i.div, {
                                                    animate: {
                                                        width: `${Y.hunter.awareness}%`
                                                    },
                                                    transition: {
                                                        duration: .5
                                                    },
                                                    style: {
                                                        height: 4,
                                                        borderRadius: 2,
                                                        background: Y.hunter.awareness >= 80 ? `#ee4444` : Y.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`
                                                    }
                                                })
                                            })
                                        ]
                                    });
                                })(),
                                (0, k.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.6)`,
                                        letterSpacing: 2,
                                        marginTop: 8
                                    },
                                    children: `EQUIPPED`
                                }),
                                Y.ship.upgrades.length === 0 ? (0, k.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontStyle: `italic`
                                    },
                                    children: `None yet`
                                }) : Y.ship.upgrades.map((e)=>{
                                    let t = P.find((t)=>t.id === e);
                                    return (0, k.jsxs)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            color: F[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, k.jsx)(`img`, {
                                                src: N[e],
                                                style: {
                                                    width: 20,
                                                    height: 20,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            t.name
                                        ]
                                    }, e);
                                }),
                                Y.upgradeToken && (0, k.jsx)(`div`, {
                                    style: {
                                        fontSize: 14,
                                        color: `#eedd44`,
                                        marginTop: 4
                                    },
                                    children: `✦ Free upgrade — claim it at a port`
                                }),
                                (0, k.jsxs)(`div`, {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.3)`,
                                                letterSpacing: 3,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 10
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 10
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    icon: `⚓`,
                                                    color: `#44cc88`,
                                                    levels: [
                                                        `20 HP`,
                                                        `28 HP`,
                                                        `38 HP`
                                                    ],
                                                    sub: [
                                                        `Integrity`,
                                                        `Reinforced`,
                                                        `Ironclad`
                                                    ]
                                                },
                                                {
                                                    key: `weapon`,
                                                    label: `Weapon`,
                                                    icon: `⚔️`,
                                                    color: `#ee6644`,
                                                    levels: [
                                                        `P2`,
                                                        `P5`,
                                                        `P9`
                                                    ],
                                                    sub: [
                                                        `Cannons`,
                                                        `Iron Guns`,
                                                        `Heavy Fire`
                                                    ]
                                                },
                                                {
                                                    key: `nav`,
                                                    label: `Navigation`,
                                                    icon: `🔭`,
                                                    color: `#6aaccc`,
                                                    levels: [
                                                        `V1`,
                                                        `V2`,
                                                        `V3`
                                                    ],
                                                    sub: [
                                                        `Basic`,
                                                        `Chart`,
                                                        `Star Reader`
                                                    ]
                                                }
                                            ].map((e)=>{
                                                let t = Y.ship.levels[e.key], n = t === 2, r = e.color, a = [
                                                    `I`,
                                                    `II`,
                                                    `III`
                                                ];
                                                return (0, k.jsxs)(i.div, {
                                                    animate: n ? {
                                                        filter: [
                                                            `drop-shadow(0 0 3px ${r}00)`,
                                                            `drop-shadow(0 0 8px ${r}bb)`,
                                                            `drop-shadow(0 0 3px ${r}00)`
                                                        ]
                                                    } : {},
                                                    transition: {
                                                        repeat: 1 / 0,
                                                        duration: 2
                                                    },
                                                    style: {
                                                        background: `linear-gradient(135deg, rgba(0,0,0,0.4), ${r}08)`,
                                                        border: `1px solid ${r}${n ? `66` : `22`}`,
                                                        borderRadius: 10,
                                                        padding: `8px 10px`
                                                    },
                                                    children: [
                                                        (0, k.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 8,
                                                                marginBottom: 6
                                                            },
                                                            children: [
                                                                (0, k.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 16
                                                                    },
                                                                    children: e.icon
                                                                }),
                                                                (0, k.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        (0, k.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: 1
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, k.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.3)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, k.jsxs)(`div`, {
                                                                    style: {
                                                                        fontSize: 14,
                                                                        color: r,
                                                                        fontFamily: `'Cinzel', serif`,
                                                                        fontWeight: 700
                                                                    },
                                                                    children: [
                                                                        e.levels[t],
                                                                        n ? ` ★` : ``
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, o)=>(0, k.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        o > 0 && (0, k.jsx)(`div`, {
                                                                            style: {
                                                                                width: 10,
                                                                                height: 2,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, k.jsx)(i.div, {
                                                                            animate: n && e === 2 ? {
                                                                                scale: [
                                                                                    1,
                                                                                    1.15,
                                                                                    1
                                                                                ]
                                                                            } : {},
                                                                            transition: {
                                                                                repeat: 1 / 0,
                                                                                duration: 1.5
                                                                            },
                                                                            style: {
                                                                                width: 28,
                                                                                height: 28,
                                                                                clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
                                                                                background: e <= t ? `linear-gradient(135deg, ${r}dd, ${r}66)` : `rgba(255,255,255,0.05)`,
                                                                                border: `none`,
                                                                                display: `flex`,
                                                                                alignItems: `center`,
                                                                                justifyContent: `center`,
                                                                                boxShadow: e <= t ? `0 0 8px ${r}44` : `none`
                                                                            },
                                                                            children: (0, k.jsx)(`span`, {
                                                                                style: {
                                                                                    fontSize: 9,
                                                                                    color: e <= t ? `#000` : `rgba(255,255,255,0.2)`,
                                                                                    fontFamily: `'Cinzel', serif`,
                                                                                    fontWeight: 700
                                                                                },
                                                                                children: a[e]
                                                                            })
                                                                        })
                                                                    ]
                                                                }, e))
                                                        })
                                                    ]
                                                }, e.key);
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        (0, k.jsxs)(`div`, {
                            style: {
                                flex: 1,
                                display: `flex`,
                                flexDirection: `column`,
                                alignItems: `center`,
                                justifyContent: R ? `flex-start` : `center`,
                                padding: R ? `6px 4px calc(96px + env(safe-area-inset-bottom))` : `10px`,
                                position: `relative`,
                                overflowY: R ? `auto` : `visible`
                            },
                            children: [
                                R && !Y.event && !Y.showPort && !Y.gameOver && (0, k.jsx)(`div`, {
                                    style: {
                                        position: `fixed`,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 60,
                                        display: `flex`,
                                        gap: 8,
                                        padding: `10px 12px calc(10px + env(safe-area-inset-bottom))`,
                                        background: `linear-gradient(to top, rgba(5,8,15,0.96), rgba(5,8,15,0.0))`
                                    },
                                    children: [
                                        {
                                            label: `◀ PORT`,
                                            dx: -1,
                                            dy: 0
                                        },
                                        {
                                            label: `▲ AHEAD`,
                                            dx: 0,
                                            dy: -1
                                        },
                                        {
                                            label: `STARBOARD ▶`,
                                            dx: 1,
                                            dy: 0
                                        }
                                    ].map((e)=>(0, k.jsx)(`button`, {
                                            onClick: ()=>Z(e.dx, e.dy),
                                            "aria-label": `Sail ${e.label.replace(/[▲◀▶]/g, ``).trim().toLowerCase()}`,
                                            style: {
                                                flex: e.dy === -1 ? 1.3 : 1,
                                                padding: `16px 8px`,
                                                borderRadius: 12,
                                                border: `2px solid rgba(200,160,48,0.7)`,
                                                background: e.dy === -1 ? `rgba(200,160,48,0.28)` : `rgba(200,160,48,0.14)`,
                                                color: `#e8d8a8`,
                                                fontSize: 15,
                                                fontFamily: `'Pirata One', cursive`,
                                                letterSpacing: 1,
                                                cursor: `pointer`,
                                                WebkitTapHighlightColor: `transparent`
                                            },
                                            children: e.label
                                        }, e.label))
                                }),
                                R && (0, k.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 12,
                                        marginBottom: 6,
                                        fontSize: 13,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        (0, k.jsxs)(`span`, {
                                            style: {
                                                color: Y.stormDistance <= 4 ? `#ee4444` : `#ee8844`
                                            },
                                            children: [
                                                `⛈ `,
                                                Y.stormDistance,
                                                ` turns`
                                            ]
                                        }),
                                        (0, k.jsx)(`span`, {
                                            style: {
                                                color: `#cc44ee`
                                            },
                                            children: d[Y.currentZone ?? 1]?.name ?? `The Coasts`
                                        }),
                                        (0, k.jsxs)(`span`, {
                                            style: {
                                                color: `#eedd44`
                                            },
                                            children: [
                                                `✦ `,
                                                Y.score,
                                                ` pts`
                                            ]
                                        })
                                    ]
                                }),
                                !R && !Y.event && !Y.showPort && !Y.gameOver && (0, k.jsxs)(`div`, {
                                    "aria-label": `Sailing controls`,
                                    style: {
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 8,
                                        marginBottom: 10
                                    },
                                    children: [
                                        (0, k.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.38)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1.5
                                            },
                                            children: `SAIL`
                                        }),
                                        [
                                            {
                                                label: `← PORT`,
                                                keyHint: `A`,
                                                dx: -1,
                                                dy: 0
                                            },
                                            {
                                                label: `↑ AHEAD`,
                                                keyHint: `W`,
                                                dx: 0,
                                                dy: -1
                                            },
                                            {
                                                label: `STARBOARD →`,
                                                keyHint: `D`,
                                                dx: 1,
                                                dy: 0
                                            }
                                        ].map((e)=>(0, k.jsxs)(`button`, {
                                                onClick: ()=>Z(e.dx, e.dy),
                                                title: `${e.label} (${e.keyHint} / arrow key)`,
                                                style: {
                                                    padding: `8px 11px`,
                                                    borderRadius: 8,
                                                    border: `1px solid rgba(200,160,48,0.46)`,
                                                    background: e.dy === -1 ? `rgba(200,160,48,0.2)` : `rgba(200,160,48,0.08)`,
                                                    color: `#e8d8a8`,
                                                    fontSize: 13,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    letterSpacing: 1,
                                                    cursor: `pointer`
                                                },
                                                children: [
                                                    e.label,
                                                    ` `,
                                                    (0, k.jsx)(`span`, {
                                                        style: {
                                                            marginLeft: 4,
                                                            color: `rgba(255,255,255,0.42)`,
                                                            fontFamily: `'Cinzel', serif`,
                                                            fontSize: 10
                                                        },
                                                        children: e.keyHint
                                                    })
                                                ]
                                            }, e.label))
                                    ]
                                }),
                                x && !Y.event && !Y.showPort && !Y.gameOver && (0, k.jsx)(I, {
                                    tip: x,
                                    isMobile: R,
                                    onDismiss: B
                                }),
                                (0, k.jsxs)(`div`, {
                                    style: {
                                        position: `relative`
                                    },
                                    children: [
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                position: `absolute`,
                                                inset: 0,
                                                background: `radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)`,
                                                pointerEvents: `none`,
                                                zIndex: 2,
                                                borderRadius: 8
                                            }
                                        }),
                                        (0, k.jsxs)(`div`, {
                                            style: {
                                                display: `grid`,
                                                gridTemplateColumns: `repeat(${Y.ship.vision * 2 + 1},1fr)`,
                                                gap: 4,
                                                transform: `translate(${vt.x}px, ${vt.y}px)`,
                                                transition: vt.instant ? `none` : `transform 420ms cubic-bezier(0.22, 1, 0.36, 1)`,
                                                willChange: `transform`
                                            },
                                            children: [
                                                Array.from({
                                                    length: Y.ship.vision * 2 + 1
                                                }, (e, t)=>t - Y.ship.vision).flatMap((e)=>Array.from({
                                                        length: Y.ship.vision * 2 + 1
                                                    }, (e, t)=>t - Y.ship.vision).map((t)=>{
                                                        let n = Y.ship.x + t, r = Y.ship.y + e, a = (()=>{
                                                            let e = new Set;
                                                            if (!Y.hunter?.active) return e;
                                                            let t = Y.hunter.x, n = Y.hunter.y, r = Y.ship.x, i = Y.ship.y;
                                                            if (Y.hunter.mode === `searching`) [
                                                                [
                                                                    -1,
                                                                    0
                                                                ],
                                                                [
                                                                    1,
                                                                    0
                                                                ],
                                                                [
                                                                    0,
                                                                    -1
                                                                ],
                                                                [
                                                                    0,
                                                                    1
                                                                ],
                                                                [
                                                                    -1,
                                                                    -1
                                                                ],
                                                                [
                                                                    1,
                                                                    1
                                                                ]
                                                            ].forEach(([r, i])=>e.add(`${t + r}-${n + i}`));
                                                            else {
                                                                let a = Math.abs(r - t), o = Math.abs(i - n);
                                                                a >= o && e.add(`${t + (r > t ? 1 : -1)}-${n}`), o >= a && e.add(`${t}-${n + (i > n ? 1 : -1)}`), a === o && (e.add(`${t + (r > t ? 1 : -1)}-${n}`), e.add(`${t}-${n + (i > n ? 1 : -1)}`));
                                                            }
                                                            return e;
                                                        })(), o = (Y.relics ?? []).includes(`kraken_eye`), s = !!(Y.hunter?.active && Math.abs(Y.hunter.x - Y.ship.x) <= Y.ship.vision && Math.abs(Y.hunter.y - Y.ship.y) <= Y.ship.vision) && (o || Y.hunter?.mode !== `tracking`) && a.has(`${n}-${r}`) && !(n === Y.hunter.x && r === Y.hunter.y), c = n >= 0 && n < 12 && r >= 0 && r < 12 ? Y.grid[r][n] : {
                                                            type: `sea`,
                                                            revealed: !1,
                                                            visited: !1,
                                                            value: 0
                                                        }, ee = Y.ship.x + t, te = Y.ship.y + e, l = Y.hunter?.active && Y.hunter.x === ee && Y.hunter.y === te, u = Y.hunter?.active ? Math.abs(Y.hunter.x - Y.ship.x) + Math.abs(Y.hunter.y - Y.ship.y) : 99, d = t === 0 && e === 0, f = c.revealed || c.visited, p = c.stormed, m = Y.stormDistance <= 0 ? -1 : Y.grid.length + 2 - Math.floor((10 - Y.stormDistance) / 3), ne = p && r === m, re = qe[Y.currentZone ?? 1] ?? qe[1], ie = Je[Y.currentZone ?? 1] ?? Je[1], h = p ? `#cc2222` : ie[c.type], ae = Y.ship.vision * 2 + 1, g = R ? Math.floor((window.innerWidth - 16) / ae) : Math.floor(Math.min(window.innerWidth * .5, window.innerHeight * .62) / ae) - 4;
                                                        return (0, k.jsxs)(i.div, {
                                                            className: ne ? `storm-front` : void 0,
                                                            initial: f ? {
                                                                opacity: 0,
                                                                scale: .8
                                                            } : !1,
                                                            animate: {
                                                                opacity: 1,
                                                                scale: 1
                                                            },
                                                            style: {
                                                                width: g,
                                                                height: g,
                                                                background: d ? `#0a2a4a` : l ? Y.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : p ? `#2a0505` : f ? re[c.type] ?? `#050a0f` : Y.currentZone === 2 ? `#03050a` : Y.currentZone === 3 ? `#020204` : `#050a0f`,
                                                                border: d ? u <= 1 ? `2px solid #ee4466` : `2px solid #4a8acc` : l ? `2px solid ${Y.hunter?.mode === `frenzy` ? `#ff4466` : Y.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : p ? `1px solid #cc222244` : f ? `1px solid ${h ? h + `44` : `rgba(255,255,255,0.08)`}` : `1px solid rgba(255,255,255,0.03)`,
                                                                borderRadius: 8,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                justifyContent: `center`,
                                                                fontSize: d ? 26 : 20,
                                                                boxShadow: l ? `0 0 ${u <= 2 ? 22 : 14}px ${Y.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : d ? u <= 1 ? `0 0 22px rgba(238,68,102,0.55)` : `0 0 20px rgba(74,138,204,0.4)` : h && f ? `0 0 10px ${h}44` : `none`,
                                                                position: `relative`,
                                                                cursor: `default`
                                                            },
                                                            children: [
                                                                d && (0, k.jsxs)(k.Fragment, {
                                                                    children: [
                                                                        (0, k.jsx)(i.div, {
                                                                            animate: {
                                                                                rotate: bt.x * 10,
                                                                                y: bt.y * 5,
                                                                                scale: bt.x || bt.y ? 1.06 : 1
                                                                            },
                                                                            transition: {
                                                                                type: `spring`,
                                                                                stiffness: 200,
                                                                                damping: 11
                                                                            },
                                                                            style: {
                                                                                transformOrigin: `50% 75%`
                                                                            },
                                                                            children: (0, k.jsx)(i.div, {
                                                                                animate: {
                                                                                    y: [
                                                                                        0,
                                                                                        -3,
                                                                                        0
                                                                                    ]
                                                                                },
                                                                                transition: {
                                                                                    repeat: 1 / 0,
                                                                                    duration: 2,
                                                                                    ease: `easeInOut`
                                                                                },
                                                                                children: (0, k.jsx)(`img`, {
                                                                                    src: `/icons/ship.png`,
                                                                                    style: {
                                                                                        width: g * .82,
                                                                                        height: g * .82,
                                                                                        objectFit: `contain`,
                                                                                        filter: `drop-shadow(0 0 10px rgba(74,138,204,0.9))`
                                                                                    }
                                                                                })
                                                                            })
                                                                        }),
                                                                        (0, k.jsxs)(`div`, {
                                                                            style: {
                                                                                position: `absolute`,
                                                                                bottom: 3,
                                                                                left: `5%`,
                                                                                width: `90%`,
                                                                                display: `flex`,
                                                                                alignItems: `center`,
                                                                                gap: 3
                                                                            },
                                                                            children: [
                                                                                (0, k.jsx)(`div`, {
                                                                                    style: {
                                                                                        flex: 1,
                                                                                        height: 3,
                                                                                        background: `rgba(0,0,0,0.5)`,
                                                                                        borderRadius: 2
                                                                                    },
                                                                                    children: (0, k.jsx)(`div`, {
                                                                                        style: {
                                                                                            width: `${Y.ship.hull / Y.ship.maxHull * 100}%`,
                                                                                            height: `100%`,
                                                                                            borderRadius: 2,
                                                                                            background: Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                                            transition: `width 0.3s`
                                                                                        }
                                                                                    })
                                                                                }),
                                                                                (0, k.jsx)(`div`, {
                                                                                    style: {
                                                                                        fontSize: Math.max(7, g * .16),
                                                                                        color: Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                                        fontFamily: `'Cinzel', serif`,
                                                                                        fontWeight: 700,
                                                                                        textShadow: `0 1px 3px rgba(0,0,0,0.9)`,
                                                                                        lineHeight: 1,
                                                                                        flexShrink: 0
                                                                                    },
                                                                                    children: Y.ship.hull
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                !l && !d && !f && c.type === `portal` && (0, k.jsx)(i.div, {
                                                                    animate: {
                                                                        opacity: [
                                                                            .55,
                                                                            1,
                                                                            .55
                                                                        ],
                                                                        scale: [
                                                                            .9,
                                                                            1.08,
                                                                            .9
                                                                        ]
                                                                    },
                                                                    transition: {
                                                                        repeat: 1 / 0,
                                                                        duration: 1.6,
                                                                        ease: `easeInOut`
                                                                    },
                                                                    style: {
                                                                        position: `absolute`,
                                                                        inset: 0,
                                                                        display: `flex`,
                                                                        alignItems: `center`,
                                                                        justifyContent: `center`,
                                                                        background: `radial-gradient(circle, #aa77ff 0%, #6644cc55 45%, transparent 75%)`,
                                                                        borderRadius: 4,
                                                                        boxShadow: `0 0 12px #8866ff`
                                                                    },
                                                                    children: (0, k.jsx)(`div`, {
                                                                        style: {
                                                                            fontSize: g * .5,
                                                                            lineHeight: 1,
                                                                            filter: `drop-shadow(0 0 6px #aa77ff)`
                                                                        },
                                                                        children: `🌀`
                                                                    })
                                                                }),
                                                                !l && !d && f && (0, k.jsx)(`img`, {
                                                                    src: `/icons/${c.type}.png`,
                                                                    style: {
                                                                        width: g * .82,
                                                                        height: g * .82,
                                                                        opacity: c.visited ? .35 : 1,
                                                                        objectFit: `contain`,
                                                                        mixBlendMode: `screen`
                                                                    }
                                                                }),
                                                                l && !d && (0, k.jsx)(i.div, {
                                                                    animate: {
                                                                        scale: [
                                                                            1,
                                                                            1.2,
                                                                            1
                                                                        ],
                                                                        opacity: [
                                                                            .8,
                                                                            1,
                                                                            .8
                                                                        ]
                                                                    },
                                                                    transition: {
                                                                        repeat: 1 / 0,
                                                                        duration: 1.5
                                                                    },
                                                                    style: {
                                                                        filter: `drop-shadow(0 0 12px #cc44ee)`
                                                                    },
                                                                    children: (0, k.jsx)(`img`, {
                                                                        src: `/icons/hunter.png`,
                                                                        style: {
                                                                            width: g * .82,
                                                                            height: g * .82,
                                                                            objectFit: `contain`
                                                                        }
                                                                    })
                                                                }),
                                                                s && !d && !l && (0, k.jsx)(i.div, {
                                                                    animate: {
                                                                        opacity: [
                                                                            0,
                                                                            .4,
                                                                            0
                                                                        ]
                                                                    },
                                                                    transition: {
                                                                        repeat: 1 / 0,
                                                                        duration: 1.8,
                                                                        ease: `easeInOut`
                                                                    },
                                                                    style: {
                                                                        position: `absolute`,
                                                                        inset: 0,
                                                                        borderRadius: 8,
                                                                        background: `rgba(180,30,220,0.15)`,
                                                                        border: `1px solid rgba(180,30,220,0.3)`,
                                                                        pointerEvents: `none`
                                                                    }
                                                                }),
                                                                l && !d && !f && (0, k.jsx)(i.div, {
                                                                    animate: {
                                                                        opacity: [
                                                                            .3,
                                                                            .6,
                                                                            .3
                                                                        ]
                                                                    },
                                                                    transition: {
                                                                        repeat: 1 / 0,
                                                                        duration: 2
                                                                    },
                                                                    style: {
                                                                        filter: `drop-shadow(0 0 8px #aa22cc)`
                                                                    },
                                                                    children: (0, k.jsx)(`img`, {
                                                                        src: `/icons/hunter.png`,
                                                                        style: {
                                                                            width: g * .82,
                                                                            height: g * .82,
                                                                            objectFit: `contain`,
                                                                            opacity: .4,
                                                                            filter: `grayscale(0.8) brightness(0.5)`
                                                                        }
                                                                    })
                                                                }),
                                                                !l && !d && !f && (0, k.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 21,
                                                                        color: `rgba(255,255,255,0.06)`,
                                                                        fontWeight: 700
                                                                    },
                                                                    children: `?`
                                                                })
                                                            ]
                                                        }, `${n}-${r}`);
                                                    })),
                                                `)`
                                            ]
                                        })
                                    ]
                                }),
                                Y.dangerStreak > 0 && (0, k.jsxs)(i.div, {
                                    initial: {
                                        scale: .6,
                                        opacity: 0
                                    },
                                    animate: {
                                        scale: 1,
                                        opacity: 1
                                    },
                                    transition: {
                                        type: `spring`,
                                        stiffness: 300
                                    },
                                    style: {
                                        textAlign: `center`,
                                        letterSpacing: 2
                                    },
                                    children: [
                                        Y.scoreMultiplier > 1 && (0, k.jsxs)(`div`, {
                                            style: {
                                                fontSize: R ? 17 : Y.scoreMultiplier >= 3 ? 42 : 32,
                                                fontWeight: 700,
                                                color: Y.scoreMultiplier >= 3 ? `#ee4444` : `#eedd44`,
                                                letterSpacing: R ? 2 : 4,
                                                textShadow: R ? `none` : Y.scoreMultiplier >= 3 ? `0 0 30px #ee4444, 0 0 60px #ee444466` : `0 0 20px #eedd44, 0 0 40px #eedd4466`,
                                                filter: Y.scoreMultiplier >= 3 ? `brightness(1.3)` : `brightness(1.1)`
                                            },
                                            children: [
                                                Y.scoreMultiplier >= 3 ? `🔥🔥🔥` : `🔥`,
                                                ` ×`,
                                                Y.scoreMultiplier,
                                                ` COMBO`
                                            ]
                                        }),
                                        (0, k.jsxs)(`div`, {
                                            style: {
                                                display: R ? `none` : `block`,
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.4)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 2,
                                                marginTop: 4
                                            },
                                            children: [
                                                `STREAK `,
                                                Y.dangerStreak
                                            ]
                                        }),
                                        Y.dangerStreak >= 3 && (0, k.jsx)(i.div, {
                                            animate: {
                                                opacity: [
                                                    1,
                                                    .4,
                                                    1
                                                ]
                                            },
                                            transition: {
                                                repeat: 1 / 0,
                                                duration: 1.2
                                            },
                                            style: {
                                                fontSize: 11,
                                                color: `#ee8844`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginTop: 2
                                            },
                                            children: `HUNTER ALERT`
                                        }),
                                        Y.dangerStreak >= 4 && (0, k.jsx)(i.div, {
                                            animate: {
                                                opacity: [
                                                    1,
                                                    .4,
                                                    1
                                                ]
                                            },
                                            transition: {
                                                repeat: 1 / 0,
                                                duration: .9
                                            },
                                            style: {
                                                fontSize: 11,
                                                color: `#ee4444`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginTop: 2
                                            },
                                            children: `⛈ STORM SURGE +8%`
                                        }),
                                        Y.dangerStreak >= 5 && (0, k.jsxs)(i.div, {
                                            animate: {
                                                opacity: [
                                                    1,
                                                    .3,
                                                    1
                                                ]
                                            },
                                            transition: {
                                                repeat: 1 / 0,
                                                duration: .7
                                            },
                                            style: {
                                                fontSize: 11,
                                                color: `#cc44ee`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginTop: 2
                                            },
                                            children: [
                                                (0, k.jsx)(m, {
                                                    name: `skull`,
                                                    size: 18,
                                                    style: {
                                                        marginRight: 6
                                                    }
                                                }),
                                                `CURSED WATERS`
                                            ]
                                        }),
                                        Y.dangerStreak >= 6 && (0, k.jsxs)(i.div, {
                                            animate: {
                                                opacity: [
                                                    1,
                                                    .2,
                                                    1
                                                ]
                                            },
                                            transition: {
                                                repeat: 1 / 0,
                                                duration: .5
                                            },
                                            style: {
                                                fontSize: 11,
                                                color: `#ff2222`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginTop: 2
                                            },
                                            children: [
                                                (0, k.jsx)(m, {
                                                    name: `skull`,
                                                    size: 18,
                                                    style: {
                                                        marginRight: 6
                                                    }
                                                }),
                                                `LEGENDARY ZONE`
                                            ]
                                        })
                                    ]
                                }, Y.dangerStreak),
                                Y.ship.upgrades.includes(`hunter`) && (0, k.jsxs)(`div`, {
                                    style: {
                                        position: `relative`,
                                        marginBottom: 8
                                    },
                                    children: [
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.3)`,
                                                letterSpacing: 3,
                                                textAlign: `center`,
                                                marginBottom: 4,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: `NAVIGATOR`
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                display: `grid`,
                                                gridTemplateColumns: `repeat(12, 1fr)`,
                                                gap: 1,
                                                width: 120,
                                                margin: `0 auto`,
                                                border: `1px solid rgba(255,255,255,0.1)`,
                                                borderRadius: 4,
                                                padding: 2,
                                                background: `rgba(0,0,0,0.4)`
                                            },
                                            children: Array.from({
                                                length: 12
                                            }, (e, t)=>Array.from({
                                                    length: 12
                                                }, (e, n)=>{
                                                    let r = Y.grid[t][n], i = n === Y.ship.x && t === Y.ship.y, a = Y.hunter?.active && n === Y.hunter.x && t === Y.hunter.y, o = r.revealed && !r.visited && (r.type === `treasure` || r.type === `cursed_treasure`), s = r.revealed && !r.visited && r.type === `port`;
                                                    return (0, k.jsx)(`div`, {
                                                        style: {
                                                            width: 8,
                                                            height: 8,
                                                            background: i ? `#4a8acc` : a ? `#ee4444` : o ? `#eedd44` : s ? `#44cccc` : r.revealed ? `rgba(255,255,255,0.08)` : `rgba(0,0,0,0.3)`,
                                                            borderRadius: a || i ? 4 : 1
                                                        }
                                                    }, `${n}-${t}`);
                                                }))
                                        })
                                    ]
                                }),
                                !1,
                                (0, k.jsx)(`div`, {
                                    "aria-live": `polite`,
                                    "aria-atomic": `true`,
                                    style: {
                                        marginTop: 10,
                                        textAlign: `center`,
                                        maxWidth: 420,
                                        paddingRight: R ? 80 : 0,
                                        marginBottom: 0
                                    },
                                    children: (()=>{
                                        let e = (Y.log ?? ``).split(`. `).map((e)=>e.trim()).filter(Boolean), t = e[0] ? e[0].replace(/\.+$/, ``) : ``, n = e.slice(1).join(`. `);
                                        return (0, k.jsxs)(k.Fragment, {
                                            children: [
                                                (0, k.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 18,
                                                        color: `rgba(255,255,255,0.95)`,
                                                        fontFamily: `'IM Fell English', cursive`,
                                                        lineHeight: 1.4
                                                    },
                                                    children: [
                                                        t,
                                                        t ? `.` : ``
                                                    ]
                                                }),
                                                n && (0, k.jsxs)(`div`, {
                                                    style: {
                                                        marginTop: 4,
                                                        fontSize: 13.5,
                                                        color: `rgba(255,255,255,0.5)`,
                                                        fontFamily: `'IM Fell English', cursive`,
                                                        lineHeight: 1.4
                                                    },
                                                    children: [
                                                        n,
                                                        n.endsWith(`.`) ? `` : `.`
                                                    ]
                                                })
                                            ]
                                        });
                                    })()
                                }),
                                Y.portalHint && (0, k.jsxs)(`div`, {
                                    style: {
                                        marginTop: 6,
                                        fontSize: 14,
                                        color: `#8866ff`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        textAlign: `center`,
                                        fontStyle: `italic`,
                                        animation: `pulse 2s infinite`
                                    },
                                    children: [
                                        `✦ `,
                                        Y.portalHint,
                                        ` ✦`
                                    ]
                                }),
                                (Y.relics ?? []).length > 0 && !R && (0, k.jsx)(`div`, {
                                    style: {
                                        marginTop: 8,
                                        display: `flex`,
                                        gap: 6,
                                        justifyContent: `center`,
                                        flexWrap: `wrap`
                                    },
                                    children: (Y.relics ?? []).map((e)=>{
                                        let t = _(e);
                                        return t ? (0, k.jsxs)(`div`, {
                                            title: `${t.name} — ${t.desc}`,
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 4,
                                                padding: `3px 8px`,
                                                borderRadius: 8,
                                                background: `rgba(200,160,48,0.12)`,
                                                border: `1px solid rgba(200,160,48,0.35)`
                                            },
                                            children: [
                                                (0, k.jsx)(m, {
                                                    name: t.icon,
                                                    size: 16
                                                }),
                                                (0, k.jsx)(`span`, {
                                                    style: {
                                                        fontSize: 10,
                                                        color: `#eedd88`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        letterSpacing: .5
                                                    },
                                                    children: t.name
                                                })
                                            ]
                                        }, e) : null;
                                    })
                                }),
                                R && (0, k.jsx)(`div`, {
                                    "aria-hidden": !0,
                                    style: {
                                        flexShrink: 0,
                                        height: `calc(112px + env(safe-area-inset-bottom))`
                                    }
                                })
                            ]
                        }),
                        (0, k.jsxs)(`div`, {
                            style: {
                                width: R ? 0 : 260,
                                minWidth: R ? 0 : 260,
                                padding: R ? 0 : `16px 12px`,
                                display: R ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 10,
                                borderLeft: `1px solid rgba(255,255,255,0.05)`,
                                pointerEvents: Y.showPort ? `none` : `auto`,
                                opacity: Y.showPort ? .4 : 1,
                                overflow: `hidden`
                            },
                            children: [
                                (0, k.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.9)`,
                                        letterSpacing: 2
                                    },
                                    children: `UPGRADES`
                                }),
                                (0, k.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 5,
                                        overflowY: `auto`
                                    },
                                    children: P.map((e)=>{
                                        let t = Y.ship.upgrades.includes(e.id), n = C.includes(e.id), r = Y.upgradeToken && Y.showPort, i = r ? 0 : e.cost, a = !t && !n && Y.ship.gold >= i && Y.showPort, o = F[e.build];
                                        return (0, k.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Y.showPort && (n ? w((t)=>t.filter((t)=>t !== e.id)) : a && w((t)=>[
                                                        ...t,
                                                        e.id
                                                    ]));
                                            },
                                            style: {
                                                background: t ? `${o}14` : `rgba(255,255,255,0.02)`,
                                                border: `1px solid ${t ? o + `44` : a ? o + `22` : `rgba(255,255,255,0.04)`}`,
                                                borderRadius: 6,
                                                padding: `4px 6px`,
                                                cursor: a ? `pointer` : `default`,
                                                opacity: t ? 1 : a ? .9 : .3,
                                                transition: `all 0.15s`
                                            },
                                            children: [
                                                (0, k.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`
                                                    },
                                                    children: [
                                                        (0, k.jsxs)(`span`, {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: t ? o : `#ffffff`,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 4
                                                            },
                                                            children: [
                                                                (0, k.jsx)(`img`, {
                                                                    src: N[e.id],
                                                                    style: {
                                                                        width: 24,
                                                                        height: 24,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                e.name
                                                            ]
                                                        }),
                                                        t ? (0, k.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, k.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, k.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: `#eedd44`
                                                            },
                                                            children: r && Y.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                (0, k.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, k.jsx)(Xe, {
                                                        pros: e.pros,
                                                        cons: e.cons,
                                                        fontSize: 11,
                                                        opacity: .5
                                                    })
                                                })
                                            ]
                                        }, e.id);
                                    })
                                })
                            ]
                        })
                    ]
                }),
                (0, k.jsx)(n, {
                    children: G && We[G] && (0, k.jsxs)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        transition: {
                            delay: .2,
                            duration: .3
                        },
                        onClick: ()=>{
                            G === `death` && q(!0), K(null);
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 140,
                            cursor: `pointer`,
                            background: `#05080f`
                        },
                        children: [
                            (0, k.jsx)(i.video, {
                                src: We[G],
                                autoPlay: !0,
                                muted: $,
                                playsInline: !0,
                                preload: `metadata`,
                                onEnded: ()=>{
                                    G === `death` && q(!0), K(null);
                                },
                                initial: {
                                    opacity: 0,
                                    scale: 1.07
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    delay: .42,
                                    duration: .75,
                                    ease: `easeOut`
                                },
                                style: {
                                    width: `100%`,
                                    height: `100%`,
                                    objectFit: `cover`
                                }
                            }, G),
                            (0, k.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`,
                                    pointerEvents: `none`
                                }
                            }),
                            (0, k.jsxs)(`div`, {
                                style: {
                                    position: `absolute`,
                                    bottom: `12%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`,
                                    pointerEvents: `none`
                                },
                                children: [
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 40,
                                            color: `#e8e0d0`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                        },
                                        children: Ge[G] ?? ``
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            marginTop: 10,
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            letterSpacing: 1
                                        },
                                        children: `tap to skip`
                                    })
                                ]
                            })
                        ]
                    })
                }),
                (0, k.jsx)(n, {
                    children: E && (()=>{
                        let e = E.rarity === `legendary` ? `#eedd44` : E.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = E.rarity.toUpperCase();
                        return (0, k.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>D(null),
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 150,
                                cursor: `pointer`,
                                display: `flex`,
                                flexDirection: `column`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                background: `radial-gradient(ellipse at center, rgba(20,15,5,0.92) 0%, rgba(3,5,10,0.97) 100%)`
                            },
                            children: [
                                (0, k.jsx)(i.div, {
                                    initial: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: .1
                                    },
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 13,
                                        letterSpacing: 6,
                                        color: `rgba(255,255,255,0.5)`,
                                        marginBottom: 24
                                    },
                                    children: `A RELIC SURFACES FROM THE DEEP`
                                }),
                                (0, k.jsx)(i.div, {
                                    initial: {
                                        scale: 0,
                                        rotate: -30
                                    },
                                    animate: {
                                        scale: 1,
                                        rotate: 0
                                    },
                                    transition: {
                                        type: `spring`,
                                        stiffness: 130,
                                        damping: 12,
                                        delay: .2
                                    },
                                    style: {
                                        filter: `drop-shadow(0 0 40px ${e})`,
                                        marginBottom: 20
                                    },
                                    children: (0, k.jsx)(m, {
                                        name: E.icon,
                                        size: 140
                                    })
                                }),
                                (0, k.jsxs)(i.div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: .5
                                    },
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 12,
                                        letterSpacing: 4,
                                        color: e,
                                        marginBottom: 8
                                    },
                                    children: [
                                        t,
                                        ` RELIC`
                                    ]
                                }),
                                (0, k.jsx)(i.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: .55
                                    },
                                    style: {
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: R ? 30 : 40,
                                        color: e,
                                        letterSpacing: 2,
                                        textShadow: `0 0 30px ${e}66`,
                                        marginBottom: 14,
                                        textAlign: `center`,
                                        padding: `0 20px`
                                    },
                                    children: E.name
                                }),
                                (0, k.jsx)(i.div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: .7
                                    },
                                    style: {
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: R ? 15 : 17,
                                        color: `rgba(255,255,255,0.75)`,
                                        maxWidth: 440,
                                        textAlign: `center`,
                                        lineHeight: 1.5,
                                        padding: `0 24px`,
                                        marginBottom: 32
                                    },
                                    children: E.desc
                                }),
                                (0, k.jsx)(i.div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: 1
                                    },
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 12,
                                        letterSpacing: 3,
                                        color: `rgba(255,255,255,0.4)`
                                    },
                                    children: `tap to continue`
                                })
                            ]
                        });
                    })()
                }),
                (0, k.jsx)(n, {
                    children: Y.event && !G && Ge[Y.event.cellType] && (0, k.jsxs)(i.div, {
                        initial: {
                            opacity: 0,
                            scale: 1.05
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        transition: {
                            delay: .26,
                            duration: .5,
                            ease: [
                                .22,
                                1,
                                .36,
                                1
                            ]
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 100,
                            display: `flex`,
                            flexDirection: `column`,
                            alignItems: `center`,
                            justifyContent: `flex-end`,
                            padding: R ? `12px` : `24px`,
                            paddingBottom: R ? `calc(20px + env(safe-area-inset-bottom))` : 64,
                            overflowY: `auto`
                        },
                        children: [
                            Ue[Y.event.cellType] && (0, k.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${Ue[Y.event.cellType]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`
                                }
                            }),
                            (0, k.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                                }
                            }),
                            (0, k.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    top: 16,
                                    right: 24,
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 6,
                                    zIndex: 2
                                },
                                children: (0, k.jsxs)(`div`, {
                                    style: {
                                        fontSize: R ? 13 : 18,
                                        fontWeight: 700,
                                        color: `#eedd44`
                                    },
                                    children: [
                                        Y.score,
                                        R ? `pts` : ` pts`
                                    ]
                                })
                            }),
                            (0, k.jsxs)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: 700,
                                    width: `100%`,
                                    textAlign: `center`
                                },
                                children: [
                                    x && (0, k.jsx)(`div`, {
                                        style: {
                                            display: `flex`,
                                            justifyContent: `center`,
                                            marginBottom: 12
                                        },
                                        children: (0, k.jsx)(I, {
                                            tip: x,
                                            isMobile: R,
                                            onDismiss: B
                                        })
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            alignSelf: `flex-start`,
                                            marginBottom: 16,
                                            paddingLeft: 8
                                        },
                                        children: (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: R ? 28 : 42,
                                                fontWeight: 700,
                                                color: `#e8e0d0`,
                                                fontFamily: `'Pirata One', cursive`,
                                                letterSpacing: 3,
                                                textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                                lineHeight: 1.1
                                            },
                                            children: Ge[Y.event.cellType] ?? Y.event.cellType
                                        })
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            display: `flex`,
                                            flexDirection: R ? `column` : `row`,
                                            alignItems: R ? `stretch` : void 0,
                                            width: R ? `100%` : void 0,
                                            gap: R ? 10 : 16,
                                            justifyContent: `center`
                                        },
                                        children: Y.event.choices.map((e, t)=>{
                                            let n = e.risk === `safe` ? `#44cc88` : e.risk === `risky` ? `#eedd44` : `#ee6644`, r = e.desc.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i), a = r ? parseInt(r[1] ?? r[2]) : 0, o = a === 0 || Y.ship.gold >= a;
                                            return (0, k.jsxs)(i.button, {
                                                whileHover: {
                                                    scale: o ? 1.04 : 1
                                                },
                                                whileTap: {
                                                    scale: o ? .96 : 1
                                                },
                                                onClick: ()=>{
                                                    o && on(t);
                                                },
                                                style: {
                                                    flex: 1,
                                                    maxWidth: R ? `none` : 320,
                                                    padding: R ? `14px 16px` : `24px 28px`,
                                                    borderRadius: 16,
                                                    border: `1.5px solid ${o ? n : `rgba(255,255,255,0.1)`}55`,
                                                    background: o ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${n}0f 100%)` : `rgba(0,0,0,0.5)`,
                                                    cursor: o ? `pointer` : `not-allowed`,
                                                    color: o ? `#e8e0d0` : `rgba(255,255,255,0.3)`,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    textAlign: `left`,
                                                    backdropFilter: `blur(8px)`,
                                                    boxShadow: o ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${n}22` : `none`,
                                                    transition: `all 0.2s`,
                                                    opacity: o ? 1 : .5
                                                },
                                                children: [
                                                    (0, k.jsx)(`div`, {
                                                        style: {
                                                            marginBottom: 12,
                                                            textAlign: `center`
                                                        },
                                                        children: (0, k.jsx)(`img`, {
                                                            src: Be[e.icon] || ``,
                                                            style: {
                                                                width: 72,
                                                                height: 72,
                                                                objectFit: `contain`
                                                            }
                                                        })
                                                    }),
                                                    (0, k.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            color: n,
                                                            textAlign: `center`
                                                        },
                                                        children: e.label
                                                    }),
                                                    (0, k.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 20,
                                                            color: `rgba(255,255,255,0.8)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginTop: 8,
                                                            textAlign: `center`
                                                        },
                                                        children: e.label === `Pact` && Y.event?.cellType === `kraken` ? `-${Math.min((Y.relics ?? []).includes(`storm_heart`) ? 10 : 20, Y.ship.hull - 1)} HP, storm +6 turns. Hunter awakens!${(Y.relics ?? []).includes(`storm_heart`) ? ` (Heart of the Storm)` : ``}` : e.desc
                                                    }),
                                                    (0, k.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 13,
                                                            color: n,
                                                            marginTop: 10,
                                                            letterSpacing: 2,
                                                            textAlign: `center`
                                                        },
                                                        children: e.risk.toUpperCase()
                                                    })
                                                ]
                                            }, t);
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                }),
                (0, k.jsx)(n, {
                    children: Y.event && !y.gameOver && !Y.showPort && Y.event.cellType && !Ue[Y.event.cellType] && (0, k.jsx)(i.div, {
                        initial: {
                            y: 100,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        exit: {
                            y: 100,
                            opacity: 0
                        },
                        style: {
                            background: `rgba(5,10,18,0.97)`,
                            borderTop: `1px solid rgba(255,255,255,0.1)`,
                            padding: `16px 24px`,
                            flexShrink: 0
                        },
                        children: (0, k.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `flex-start`,
                                gap: 20,
                                maxWidth: 700,
                                margin: `0 auto`
                            },
                            children: [
                                (0, k.jsx)(`div`, {
                                    style: {
                                        flexShrink: 0
                                    },
                                    children: tt(Ke[Y.event.cellType], 55)
                                }),
                                (0, k.jsxs)(`div`, {
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: 21,
                                                fontWeight: 700,
                                                marginBottom: 4,
                                                color: `#e8e0d0`
                                            },
                                            children: Y.event.cellType.charAt(0).toUpperCase() + Y.event.cellType.slice(1).replace(`_`, ` `)
                                        }),
                                        x && (0, k.jsx)(I, {
                                            tip: x,
                                            isMobile: R,
                                            onDismiss: B
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: R ? `column` : `row`,
                                                gap: R ? 8 : 10,
                                                marginTop: 8
                                            },
                                            children: Y.event.choices.map((e, t)=>{
                                                let n = e.risk === `safe` ? `#44cc88` : e.risk === `risky` ? `#eedd44` : `#ee6644`, r = e.desc.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i), a = r ? parseInt(r[1] ?? r[2]) : 0, o = a === 0 || Y.ship.gold >= a;
                                                return (0, k.jsxs)(i.button, {
                                                    whileHover: {
                                                        scale: o ? 1.02 : 1
                                                    },
                                                    whileTap: {
                                                        scale: o ? .98 : 1
                                                    },
                                                    onClick: ()=>{
                                                        o && on(t);
                                                    },
                                                    style: {
                                                        flex: 1,
                                                        padding: `20px 24px`,
                                                        borderRadius: 16,
                                                        border: `1.5px solid ${o ? n : `rgba(255,255,255,0.1)`}55`,
                                                        background: o ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${n}0f 100%)` : `rgba(0,0,0,0.5)`,
                                                        cursor: o ? `pointer` : `not-allowed`,
                                                        color: o ? `#e8e0d0` : `rgba(255,255,255,0.3)`,
                                                        fontFamily: `'Pirata One', cursive`,
                                                        textAlign: `left`,
                                                        backdropFilter: `blur(8px)`,
                                                        opacity: o ? 1 : .5,
                                                        transition: `all 0.2s`
                                                    },
                                                    children: [
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 26,
                                                                marginBottom: 4
                                                            },
                                                            children: e.icon
                                                        }),
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 18,
                                                                fontWeight: 600,
                                                                color: n
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 20,
                                                                color: `rgba(255,255,255,0.8)`,
                                                                fontFamily: `'IM Fell English', cursive`,
                                                                marginTop: 2
                                                            },
                                                            children: e.desc
                                                        }),
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 16,
                                                                color: n,
                                                                marginTop: 4,
                                                                letterSpacing: 1
                                                            },
                                                            children: e.risk.toUpperCase()
                                                        })
                                                    ]
                                                }, t);
                                            })
                                        }),
                                        en && (0, k.jsx)(`button`, {
                                            onClick: sn,
                                            style: {
                                                marginTop: 8,
                                                padding: `6px 16px`,
                                                borderRadius: 7,
                                                border: `1px solid rgba(100,170,220,0.3)`,
                                                background: `transparent`,
                                                color: `rgba(100,170,220,0.5)`,
                                                cursor: `pointer`,
                                                fontSize: 14
                                            },
                                            children: `⛵ Use Swift Sails (1 use left)`
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                (0, k.jsx)(n, {
                    children: Y.showPort && !Y.gameOver && (0, k.jsxs)(i.div, {
                        initial: {
                            y: 100,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        exit: {
                            y: 100,
                            opacity: 0
                        },
                        style: {
                            background: `rgba(5,10,18,0.985)`,
                            borderTop: `1px solid rgba(68,204,136,0.2)`,
                            padding: R ? `12px 12px calc(12px + env(safe-area-inset-bottom))` : `16px 24px`,
                            flexShrink: 0,
                            position: `relative`,
                            zIndex: 5,
                            maxHeight: R ? `62vh` : void 0,
                            overflowY: R ? `auto` : void 0
                        },
                        children: [
                            (0, k.jsxs)(`div`, {
                                style: {
                                    maxWidth: 700,
                                    margin: `0 auto`
                                },
                                children: [
                                    (0, k.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 8,
                                            marginBottom: 12
                                        },
                                        children: [
                                            (0, k.jsx)(`img`, {
                                                src: `/assets/anchor-Bx3zJViJ.png`,
                                                style: {
                                                    width: 40,
                                                    height: 40,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, k.jsx)(`span`, {
                                                style: {
                                                    fontSize: 26,
                                                    fontWeight: 700,
                                                    color: `#44cc88`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`
                                                },
                                                children: `SAFE HARBOR`
                                            })
                                        ]
                                    }),
                                    x && (0, k.jsx)(I, {
                                        tip: x,
                                        isMobile: R,
                                        onDismiss: B
                                    }),
                                    (0, k.jsxs)(`div`, {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 14,
                                                    letterSpacing: 3,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 10
                                                },
                                                children: `SHIP COMPONENTS`
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    display: `grid`,
                                                    gridTemplateColumns: R ? `1fr` : `repeat(3,1fr)`,
                                                    gap: 8
                                                },
                                                children: [
                                                    {
                                                        key: `hull`,
                                                        label: `HULL`,
                                                        img: `/assets/hull-CGmPGbU0.png`,
                                                        color: `#44cc88`,
                                                        effects: [
                                                            `Hull 20`,
                                                            `Hull 28 −2 storm dmg`,
                                                            `Hull 38 −3 env dmg`
                                                        ]
                                                    },
                                                    {
                                                        key: `weapon`,
                                                        label: `ARMEMENT`,
                                                        img: `/assets/power-CBX9SU5d.png`,
                                                        color: `#ee6644`,
                                                        effects: [
                                                            `Power 2`,
                                                            `Power 5 +min dmg`,
                                                            `Power 9 −3 combat dmg`
                                                        ]
                                                    },
                                                    {
                                                        key: `nav`,
                                                        label: `NAVIGATION`,
                                                        img: `/assets/vision-3Q65Za4i.png`,
                                                        color: `#6aaccc`,
                                                        effects: [
                                                            `Vision 1`,
                                                            `Vision 2 +danger detect`,
                                                            `Vision 3 +2 cases +minimap`
                                                        ]
                                                    }
                                                ].map((e)=>{
                                                    let t = Y.ship.levels[e.key], n = t === 0 ? 50 : 110, r = t < 2 && Y.ship.gold >= n && !(t === 1 && Y.maxedComponents >= 2), i = t >= 2;
                                                    return (0, k.jsxs)(`div`, {
                                                        onClick: ()=>r && cn(e.key),
                                                        style: {
                                                            background: `${e.color}12`,
                                                            border: `1px solid ${e.color}${r ? `66` : `22`}`,
                                                            borderRadius: 10,
                                                            padding: `12px 10px`,
                                                            cursor: r ? `pointer` : `default`,
                                                            opacity: r || i ? 1 : .5,
                                                            transition: `all 0.2s`
                                                        },
                                                        children: [
                                                            (0, k.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    justifyContent: `space-between`,
                                                                    alignItems: `center`,
                                                                    marginBottom: 6
                                                                },
                                                                children: [
                                                                    (0, k.jsxs)(`div`, {
                                                                        style: {
                                                                            display: `flex`,
                                                                            alignItems: `center`,
                                                                            gap: 6,
                                                                            fontSize: 13,
                                                                            color: e.color,
                                                                            fontFamily: `'Pirata One', cursive`
                                                                        },
                                                                        children: [
                                                                            (0, k.jsx)(`img`, {
                                                                                src: e.img,
                                                                                style: {
                                                                                    width: 22,
                                                                                    height: 22,
                                                                                    objectFit: `contain`
                                                                                }
                                                                            }),
                                                                            e.label
                                                                        ]
                                                                    }),
                                                                    (0, k.jsx)(`div`, {
                                                                        style: {
                                                                            display: `flex`,
                                                                            gap: 3
                                                                        },
                                                                        children: [
                                                                            0,
                                                                            1,
                                                                            2
                                                                        ].map((n)=>(0, k.jsx)(`div`, {
                                                                                style: {
                                                                                    width: 8,
                                                                                    height: 8,
                                                                                    borderRadius: `50%`,
                                                                                    background: n <= t ? e.color : `rgba(255,255,255,0.1)`
                                                                                }
                                                                            }, n))
                                                                    })
                                                                ]
                                                            }),
                                                            (0, k.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: `rgba(255,255,255,0.6)`,
                                                                    fontFamily: `'IM Fell English', cursive`,
                                                                    marginBottom: 6
                                                                },
                                                                children: e.effects[t]
                                                            }),
                                                            !i && (0, k.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: r ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: t === 1 && Y.maxedComponents >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                            }),
                                                            i && (0, k.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: e.color,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: `✓ MAX`
                                                            })
                                                        ]
                                                    }, e.key);
                                                })
                                            })
                                        ]
                                    }),
                                    (0, k.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            justifyContent: `space-between`,
                                            alignItems: `center`,
                                            marginBottom: 8
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 16,
                                                    color: `rgba(255,255,255,0.6)`,
                                                    fontFamily: `'Pirata One', cursive`
                                                },
                                                children: `Available upgrades`
                                            }),
                                            (0, k.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                onClick: ()=>{
                                                    U(40), b((e)=>s(e));
                                                },
                                                style: {
                                                    padding: `4px 12px`,
                                                    borderRadius: 6,
                                                    border: `1px solid rgba(255,200,50,0.3)`,
                                                    background: `rgba(255,200,50,0.08)`,
                                                    cursor: `pointer`,
                                                    color: `#eedd44`,
                                                    fontSize: 13,
                                                    fontFamily: `'Pirata One', cursive`
                                                },
                                                children: `🎲 Reroll (20g)`
                                            })
                                        ]
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            display: `grid`,
                                            gridTemplateColumns: `repeat(2, 1fr)`,
                                            gap: 10,
                                            marginBottom: 12
                                        },
                                        children: P.filter((e)=>Y.portUpgrades.includes(e.id) || Y.ship.upgrades.includes(e.id)).map((e)=>{
                                            let t = Y.ship.upgrades.includes(e.id), n = C.includes(e.id), r = Y.upgradeToken ? 0 : e.cost, i = Y.ship.upgrades.length + C.length >= 2, a = !t && !n && Y.ship.gold >= r && !i, o = F[e.build];
                                            return (0, k.jsxs)(`div`, {
                                                onClick: ()=>{
                                                    n ? w((t)=>t.filter((t)=>t !== e.id)) : a && w((t)=>[
                                                            ...t,
                                                            e.id
                                                        ]);
                                                },
                                                style: {
                                                    padding: `14px 18px`,
                                                    borderRadius: 10,
                                                    border: `1px solid ${t ? o + `66` : n ? `#44cc8866` : a ? o + `33` : `rgba(255,255,255,0.05)`}`,
                                                    background: t ? `${o}18` : n ? `rgba(68,204,136,0.15)` : a ? `rgba(255,255,255,0.04)` : `rgba(255,255,255,0.01)`,
                                                    cursor: a || n ? `pointer` : `default`,
                                                    opacity: t || a || n ? 1 : .35,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 12
                                                },
                                                children: [
                                                    (0, k.jsx)(`img`, {
                                                        src: N[e.id],
                                                        style: {
                                                            width: 44,
                                                            height: 44,
                                                            objectFit: `contain`
                                                        }
                                                    }),
                                                    (0, k.jsxs)(`div`, {
                                                        children: [
                                                            (0, k.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 17,
                                                                    fontWeight: 700,
                                                                    color: t ? o : n ? `#44cc88` : `#e8e0d0`,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: e.name
                                                            }),
                                                            (0, k.jsx)(`div`, {
                                                                style: {
                                                                    marginTop: 3
                                                                },
                                                                children: (0, k.jsx)(Xe, {
                                                                    pros: e.pros,
                                                                    cons: e.cons,
                                                                    fontSize: 12,
                                                                    opacity: .5
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, e.id);
                                        })
                                    }),
                                    Y.ship.upgrades.length + C.length >= 2 && (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,102,85,0.8)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`,
                                            marginBottom: 8
                                        },
                                        children: `MAX 2 SPECIAL ABILITIES`
                                    })
                                ]
                            }),
                            (0, k.jsx)(`div`, {
                                style: {
                                    display: `flex`,
                                    gap: 8,
                                    marginBottom: 16
                                },
                                children: [
                                    {
                                        label: `Rum Barrel`,
                                        desc: `+8 hull`,
                                        cost: 25,
                                        fn: ()=>{
                                            U(60), b((e)=>l(e, 8, 25));
                                        }
                                    },
                                    {
                                        label: `Full Repair`,
                                        desc: `Restore all`,
                                        cost: 55,
                                        fn: ()=>{
                                            U(61), b((e)=>l(e, Y.ship.maxHull, 55));
                                        }
                                    }
                                ].map((e)=>(0, k.jsxs)(i.button, {
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: e.fn,
                                        disabled: Y.ship.gold < e.cost || Y.ship.hull >= Y.ship.maxHull,
                                        style: {
                                            flex: 1,
                                            padding: `10px 8px`,
                                            borderRadius: 10,
                                            border: `1px solid rgba(68,204,136,0.3)`,
                                            background: `rgba(68,204,136,0.08)`,
                                            cursor: Y.ship.gold >= e.cost && Y.ship.hull < Y.ship.maxHull ? `pointer` : `not-allowed`,
                                            opacity: Y.ship.gold >= e.cost && Y.ship.hull < Y.ship.maxHull ? 1 : .4,
                                            textAlign: `center`
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `#44cc88`,
                                                    fontFamily: `'Pirata One', cursive`
                                                },
                                                children: e.label
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.5)`
                                                },
                                                children: e.desc
                                            }),
                                            (0, k.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginTop: 4
                                                },
                                                children: [
                                                    `◆ `,
                                                    e.cost,
                                                    `g`
                                                ]
                                            })
                                        ]
                                    }, e.label))
                            }),
                            (0, k.jsxs)(i.button, {
                                whileHover: {
                                    scale: 1.02
                                },
                                whileTap: {
                                    scale: .98
                                },
                                onClick: ()=>{
                                    for (let e of C)U(50 + Ze.indexOf(e));
                                    U(70), b((e)=>{
                                        let t = e;
                                        for (let e of C)t = ee(t, e);
                                        return re(t);
                                    }), w([]);
                                },
                                style: {
                                    width: `100%`,
                                    padding: `14px`,
                                    borderRadius: 12,
                                    border: `2px solid rgba(200,160,48,0.5)`,
                                    background: `rgba(200,160,48,0.1)`,
                                    color: `#c8a030`,
                                    fontSize: 18,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    cursor: `pointer`
                                },
                                children: [
                                    (0, k.jsx)(m, {
                                        name: `anchor`,
                                        size: 22,
                                        style: {
                                            marginRight: 8
                                        }
                                    }),
                                    `SET SAIL`
                                ]
                            })
                        ]
                    })
                }),
                (0, k.jsx)(n, {
                    children: ft && (0, k.jsxs)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            duration: .8
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 200,
                            display: `flex`,
                            flexDirection: `column`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            background: `radial-gradient(ellipse at center, #1a0505 0%, #050008 50%, #000000 100%)`,
                            overflow: `hidden`,
                            overflowY: `auto`
                        },
                        children: [
                            (0, k.jsx)(i.div, {
                                animate: {
                                    opacity: [
                                        .3,
                                        .6,
                                        .3
                                    ]
                                },
                                transition: {
                                    repeat: 1 / 0,
                                    duration: 3
                                },
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `radial-gradient(ellipse at center, transparent 30%, rgba(150,0,0,0.4) 100%)`,
                                    pointerEvents: `none`
                                }
                            }),
                            (0, k.jsx)(i.div, {
                                initial: {
                                    scale: 0,
                                    rotate: -20
                                },
                                animate: {
                                    scale: 1,
                                    rotate: 0
                                },
                                transition: {
                                    type: `spring`,
                                    stiffness: 120,
                                    delay: .2
                                },
                                style: {
                                    marginBottom: 8,
                                    filter: `drop-shadow(0 0 30px rgba(220,30,30,0.8))`
                                },
                                children: (0, k.jsx)(m, {
                                    name: `skull`,
                                    size: 130
                                })
                            }),
                            (0, k.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .5
                                },
                                style: {
                                    fontSize: R ? 42 : 72,
                                    fontWeight: 700,
                                    color: `#ee4444`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: R ? 3 : 6,
                                    textShadow: `0 0 40px rgba(220,30,30,0.8), 0 0 80px rgba(220,30,30,0.4)`,
                                    marginBottom: 8
                                },
                                children: `SHIPWRECKED`
                            }),
                            (0, k.jsx)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: .7
                                },
                                style: {
                                    fontSize: R ? 16 : 24,
                                    color: `rgba(200,160,48,0.8)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: R ? 2 : 4,
                                    marginBottom: 4,
                                    textAlign: `center`
                                },
                                children: Y.runTitle
                            }),
                            (0, k.jsxs)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: .9
                                },
                                style: {
                                    fontSize: R ? 15 : 20,
                                    color: `rgba(255,255,255,0.35)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    marginBottom: 16,
                                    maxWidth: R ? `90vw` : 600,
                                    textAlign: `center`,
                                    fontStyle: `italic`,
                                    padding: R ? `0 16px` : 0
                                },
                                children: [
                                    `"`,
                                    Y.log,
                                    `"`
                                ]
                            }),
                            (()=>{
                                let e = Qe(Y.log);
                                return (0, k.jsxs)(i.div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: 1
                                    },
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 4,
                                        alignItems: `center`,
                                        marginBottom: 16,
                                        padding: `10px 18px`,
                                        borderRadius: 12,
                                        background: `rgba(150,0,0,0.12)`,
                                        border: `1px solid rgba(220,60,60,0.25)`,
                                        maxWidth: R ? `90vw` : 560
                                    },
                                    children: [
                                        (0, k.jsxs)(`div`, {
                                            style: {
                                                fontSize: R ? 13 : 15,
                                                color: `#ee6655`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 2
                                            },
                                            children: [
                                                (0, k.jsx)(m, {
                                                    name: `anchor`,
                                                    size: 16,
                                                    style: {
                                                        marginRight: 6
                                                    }
                                                }),
                                                `Sunk by: `,
                                                e.name
                                            ]
                                        }),
                                        (0, k.jsx)(`div`, {
                                            style: {
                                                fontSize: R ? 12 : 14,
                                                color: `rgba(255,255,255,0.55)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                textAlign: `center`
                                            },
                                            children: e.tip
                                        }),
                                        Y.score < L && L > 0 && (0, k.jsxs)(`div`, {
                                            style: {
                                                fontSize: R ? 11 : 13,
                                                color: `rgba(238,221,68,0.7)`,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                L - Y.score,
                                                ` pts short of your best (`,
                                                L,
                                                `)`
                                            ]
                                        })
                                    ]
                                });
                            })(),
                            Te.length > 0 && (0, k.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    scale: .9
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    delay: 1.4,
                                    type: `spring`
                                },
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    gap: 6,
                                    alignItems: `center`,
                                    marginBottom: 16,
                                    padding: `12px 22px`,
                                    borderRadius: 12,
                                    background: `rgba(200,160,48,0.12)`,
                                    border: `1px solid rgba(238,221,68,0.55)`,
                                    boxShadow: `0 0 24px rgba(238,221,68,0.15)`,
                                    maxWidth: R ? `90vw` : 560
                                },
                                children: Te.map((e)=>(0, k.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, k.jsx)(m, {
                                                name: e.icon,
                                                size: 26
                                            }),
                                            (0, k.jsxs)(`div`, {
                                                style: {
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, k.jsxs)(`div`, {
                                                        style: {
                                                            fontFamily: `'Pirata One', cursive`,
                                                            fontSize: R ? 15 : 17,
                                                            color: `#eedd44`,
                                                            letterSpacing: 1
                                                        },
                                                        children: [
                                                            `NEW FEAT: `,
                                                            e.name
                                                        ]
                                                    }),
                                                    (0, k.jsxs)(`div`, {
                                                        style: {
                                                            fontFamily: `'Cinzel', serif`,
                                                            fontSize: R ? 10 : 11,
                                                            color: `rgba(238,221,68,0.75)`,
                                                            letterSpacing: 1.5
                                                        },
                                                        children: [
                                                            `TITLE UNLOCKED: `,
                                                            e.title
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, e.id))
                            }),
                            (0, k.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 1.1
                                },
                                style: {
                                    display: `flex`,
                                    gap: R ? 16 : 32,
                                    marginBottom: R ? 16 : 28,
                                    flexWrap: R ? `wrap` : `nowrap`,
                                    justifyContent: `center`,
                                    padding: R ? `0 16px` : 0
                                },
                                children: [
                                    {
                                        label: `SCORE`,
                                        val: `${Y.score} pts`,
                                        color: `#eedd44`
                                    },
                                    {
                                        label: `BEST`,
                                        val: `${Math.max(L, Y.score)} pts`,
                                        color: it ? `#44ffaa` : `rgba(255,255,255,0.3)`
                                    },
                                    {
                                        label: `TURNS`,
                                        val: Y.turn,
                                        color: `rgba(255,255,255,0.6)`
                                    },
                                    {
                                        label: `GOLD`,
                                        val: Y.ship.gold,
                                        color: `#eedd44`
                                    },
                                    {
                                        label: `HULL`,
                                        val: `${Y.ship.hull}/${Y.ship.maxHull}`,
                                        color: Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`
                                    }
                                ].map((e)=>(0, k.jsxs)(`div`, {
                                        style: {
                                            textAlign: `center`
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: R ? 10 : 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    letterSpacing: R ? 1 : 3,
                                                    fontFamily: `'Cinzel', serif`
                                                },
                                                children: e.label
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: R ? 20 : 28,
                                                    color: e.color,
                                                    fontFamily: `'Cinzel', serif`,
                                                    fontWeight: 700
                                                },
                                                children: e.val
                                            })
                                        ]
                                    }, e.label))
                            }),
                            Y.scoreBreakdown && (0, k.jsxs)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 1.1
                                },
                                style: {
                                    marginBottom: 16,
                                    padding: `12px 20px`,
                                    borderRadius: 10,
                                    border: `1px solid rgba(255,255,255,0.08)`,
                                    background: `rgba(0,0,0,0.3)`,
                                    width: `100%`,
                                    maxWidth: 400
                                },
                                children: [
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.3)`,
                                            letterSpacing: 3,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 8,
                                            textAlign: `center`
                                        },
                                        children: `SCORE BREAKDOWN`
                                    }),
                                    [
                                        {
                                            label: `MOVEMENT`,
                                            val: Y.scoreBreakdown.movement,
                                            color: `#6aaccc`
                                        },
                                        {
                                            label: `COMBAT`,
                                            val: Y.scoreBreakdown.combat,
                                            color: `#ee6644`
                                        },
                                        {
                                            label: `TREASURE`,
                                            val: Y.scoreBreakdown.treasure,
                                            color: `#eedd44`
                                        },
                                        {
                                            label: `STREAKS`,
                                            val: Y.scoreBreakdown.streaks,
                                            color: `#cc44ee`
                                        },
                                        {
                                            label: `FEATS`,
                                            val: Y.scoreBreakdown.achievements,
                                            color: `#44cc88`
                                        },
                                        ...Y.scoreBreakdown.other > 0 ? [
                                            {
                                                label: `BONUS`,
                                                val: Y.scoreBreakdown.other,
                                                color: `#aaaaff`
                                            }
                                        ] : []
                                    ].filter((e)=>e.val > 0).map((e)=>(0, k.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                justifyContent: `space-between`,
                                                marginBottom: 3
                                            },
                                            children: [
                                                (0, k.jsx)(`span`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.4)`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        letterSpacing: 1
                                                    },
                                                    children: e.label
                                                }),
                                                (0, k.jsxs)(`span`, {
                                                    style: {
                                                        fontSize: 12,
                                                        color: e.color,
                                                        fontFamily: `'Cinzel', serif`,
                                                        fontWeight: 700
                                                    },
                                                    children: [
                                                        e.val.toLocaleString(),
                                                        ` pts`
                                                    ]
                                                })
                                            ]
                                        }, e.label))
                                ]
                            }),
                            (0, k.jsxs)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 1.3
                                },
                                style: {
                                    fontSize: 13,
                                    color: `rgba(255,255,255,0.25)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: 2,
                                    marginBottom: 24,
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, k.jsxs)(`div`, {
                                        children: [
                                            `Seed: `,
                                            Y.seed,
                                            ` — `,
                                            z ? `Daily Key: ${f()}` : `challenge your crew!`
                                        ]
                                    }),
                                    z && (0, k.jsxs)(`div`, {
                                        style: {
                                            display: `inline-flex`,
                                            alignItems: `center`,
                                            gap: 6,
                                            padding: `4px 14px`,
                                            borderRadius: 20,
                                            border: `1px solid rgba(100,200,255,0.5)`,
                                            background: `rgba(0,30,60,0.7)`,
                                            color: `#88ddff`,
                                            fontSize: 12,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2
                                        },
                                        children: [
                                            `☀ DAILY RUN — `,
                                            new Date().toLocaleDateString(`en-US`, {
                                                month: `short`,
                                                day: `numeric`,
                                                year: `numeric`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, k.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 1.5
                                },
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 12
                                },
                                children: [
                                    t && !Me && (0, k.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        disabled: ot,
                                        onClick: async ()=>{
                                            if (st(!0), t) try {
                                                await De(t, Y.score, Y.seed, Y.turn, Y.currentZone ?? 1, Y.runTitle);
                                            } catch (e) {
                                                console.warn(`On-chain submit failed:`, e);
                                            }
                                            Pe(!0), st(!1);
                                        },
                                        style: {
                                            padding: `12px 32px`,
                                            borderRadius: 10,
                                            border: `1px solid rgba(200,160,48,0.4)`,
                                            background: `rgba(200,160,48,0.1)`,
                                            color: `#c8a030`,
                                            fontSize: 16,
                                            letterSpacing: 3,
                                            cursor: `pointer`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: ot ? `ENGRAVING...` : (0, k.jsxs)(k.Fragment, {
                                            children: [
                                                (0, k.jsx)(m, {
                                                    name: `anchor`,
                                                    size: 16,
                                                    style: {
                                                        marginRight: 6
                                                    }
                                                }),
                                                `ENGRAVE ON STARKNET`
                                            ]
                                        })
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.35)`,
                                            letterSpacing: 2,
                                            fontFamily: `'Cinzel', serif`,
                                            textAlign: `center`,
                                            marginTop: -4
                                        },
                                        children: `OPTIONAL — CARVES THIS VOYAGE INTO STARKNET FOREVER`
                                    }),
                                    A && (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            color: `#44cc88`,
                                            letterSpacing: 2,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD`
                                    }),
                                    Ie.length > 0 && (0, k.jsxs)(i.div, {
                                        initial: {
                                            opacity: 0,
                                            scale: .8
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        style: {
                                            padding: `12px 24px`,
                                            borderRadius: 12,
                                            border: `1px solid rgba(200,160,48,0.6)`,
                                            background: `rgba(0,0,0,0.8)`,
                                            textAlign: `center`
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    marginBottom: 4
                                                },
                                                children: (0, k.jsx)(m, {
                                                    name: `flag`,
                                                    size: 24
                                                })
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 16,
                                                    color: `#FFD700`,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    letterSpacing: 2
                                                },
                                                children: `NFT EARNED!`
                                            }),
                                            Ie.map((e)=>(0, k.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `rgba(255,255,255,0.8)`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        marginTop: 4
                                                    },
                                                    children: e.replace(/_/g, ` `).toUpperCase()
                                                }, e)),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginTop: 8,
                                                    lineHeight: 1.4
                                                },
                                                children: `Your NFT will be sent to your wallet soon.`
                                            }),
                                            (0, k.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ()=>{
                                                    let e = `🏴‍☠️ I just found "${Ie[0].replace(/_/g, ` `).replace(/\b\w/g, (e)=>e.toUpperCase())}" — a hidden NFT inside Corsair.\nNo mint button. No whitelist. Just playing.\nDare to find yours? ⚓\nhttps://playcorsair.xyz/`;
                                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(e)}`, `_blank`);
                                                },
                                                style: {
                                                    marginTop: 10,
                                                    padding: `8px 20px`,
                                                    borderRadius: 8,
                                                    border: `1px solid rgba(255,255,255,0.3)`,
                                                    background: `rgba(0,0,0,0.5)`,
                                                    color: `#ffffff`,
                                                    cursor: `pointer`,
                                                    fontSize: 13,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    letterSpacing: 1
                                                },
                                                children: `𝕏 Share your find`
                                            })
                                        ]
                                    }),
                                    !e && (0, k.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            flexDirection: `column`,
                                            alignItems: `center`,
                                            gap: 8,
                                            marginBottom: 4
                                        },
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'IM Fell English', cursive`,
                                                    textAlign: `center`,
                                                    maxWidth: 360
                                                },
                                                children: `This run stayed local. Connect a wallet to submit scores, play the Daily, and earn NFTs.`
                                            }),
                                            (0, k.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ()=>xe(),
                                                disabled: Se,
                                                style: {
                                                    padding: `12px 28px`,
                                                    borderRadius: 10,
                                                    border: `1px solid rgba(200,160,48,0.55)`,
                                                    background: `rgba(200,160,48,0.12)`,
                                                    color: `#c8a030`,
                                                    cursor: `pointer`,
                                                    fontSize: 15,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`
                                                },
                                                children: Se ? `CONNECTING...` : `CONNECT WALLET`
                                            })
                                        ]
                                    }),
                                    (()=>{
                                        let e = new Date().toLocaleDateString(`en-US`, {
                                            month: `short`,
                                            day: `numeric`
                                        }), t = {
                                            legendary: 3,
                                            rare: 2,
                                            common: 1
                                        }, n = (Y.relics ?? []).map((e)=>_(e)).filter((e)=>!!e).sort((e, n)=>(t[n.rarity] ?? 0) - (t[e.rarity] ?? 0))[0], r = n ? `\nFound the ${n.name} relic along the way.` : ``, i = ht ? `\n⚔️ #${ht.rank} in Starktember — ${ht.total.toLocaleString()} pts across the month.` : ``, a = z ? `☀️ Daily Challenge — ${e} — ${Y.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${i}${r}\n⚓ @PlayCorsair https://playcorsair.xyz/ #Starktember #Starknet` : `🏴\u200d☠️ ${Y.runTitle} — ${Y.score} pts before the storm claimed me.\n${Y.turn} turns · ${Y.ship.gold} gold · No mercy.${r}\nSame waters, seed ${Y.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/ #Starknet`, o = Qe(Y.log);
                                        return (0, k.jsx)(Ae, {
                                            isMobile: R,
                                            onShare: ()=>{
                                                je(a);
                                            },
                                            payload: {
                                                score: Y.score,
                                                turn: Y.turn,
                                                gold: Y.ship.gold,
                                                runTitle: Y.runTitle,
                                                seed: Y.seed,
                                                deathName: o.name,
                                                isDaily: z,
                                                text: a
                                            }
                                        });
                                    })(),
                                    (0, k.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 12
                                        },
                                        children: [
                                            (0, k.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ln,
                                                style: {
                                                    padding: `14px 36px`,
                                                    borderRadius: 12,
                                                    border: `2px solid rgba(200,160,48,0.6)`,
                                                    background: `rgba(80,60,10,0.5)`,
                                                    color: `#c8a030`,
                                                    cursor: `pointer`,
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    boxShadow: `0 0 20px rgba(200,160,48,0.2)`
                                                },
                                                children: `SAIL AGAIN`
                                            }),
                                            (0, k.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: me,
                                                style: {
                                                    padding: `14px 24px`,
                                                    borderRadius: 12,
                                                    border: `1px solid rgba(255,255,255,0.1)`,
                                                    background: `transparent`,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    cursor: `pointer`,
                                                    fontSize: 14,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`
                                                },
                                                children: `← MENU`
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }),
                (0, k.jsx)(n, {
                    children: St && !R && (0, k.jsxs)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        transition: {
                            duration: .3
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 150,
                            pointerEvents: `none`
                        },
                        children: [
                            (0, k.jsx)(`video`, {
                                src: `/scenes/hunter.mp4`,
                                autoPlay: !0,
                                muted: $,
                                playsInline: !0,
                                preload: `metadata`,
                                style: {
                                    width: `100%`,
                                    height: `100%`,
                                    objectFit: `cover`
                                }
                            }),
                            (0, k.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `rgba(0,0,0,0.3)`
                                }
                            }),
                            (0, k.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .3
                                },
                                style: {
                                    position: `absolute`,
                                    bottom: `20%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`
                                },
                                children: [
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 32,
                                            color: `#cc44ee`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                        },
                                        children: `THE HUNTER STRIKES!`
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.7)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 6
                                        },
                                        children: `Tentacles rake the hull`
                                    }),
                                    (0, k.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 14
                                        },
                                        children: `CLICK TO SKIP`
                                    })
                                ]
                            })
                        ]
                    })
                }),
                R && (0, k.jsxs)(k.Fragment, {
                    children: [
                        !Y.event && !Y.showPort && !Y.gameOver && (0, k.jsxs)(`div`, {
                            style: {
                                position: `fixed`,
                                right: 8,
                                bottom: 90,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                zIndex: 30
                            },
                            children: [
                                (0, k.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>wt(J === `ship` ? null : `ship`),
                                    "aria-label": `Show ship status`,
                                    "aria-expanded": J === `ship`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${J === `ship` ? `#44cc88` : `rgba(255,255,255,0.2)`}`,
                                        background: J === `ship` ? `rgba(68,204,136,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: J === `ship` ? `#44cc88` : `rgba(255,255,255,0.6)`,
                                        fontSize: 20,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: `⚓`
                                }),
                                (0, k.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>wt(J === `upgrades` ? null : `upgrades`),
                                    "aria-label": `Show upgrades`,
                                    "aria-expanded": J === `upgrades`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${J === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.2)`}`,
                                        background: J === `upgrades` ? `rgba(200,160,48,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: J === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.6)`,
                                        fontSize: 20,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: `⚔️`
                                })
                            ]
                        }),
                        (0, k.jsx)(n, {
                            children: J && (0, k.jsxs)(i.div, {
                                initial: {
                                    x: `100%`
                                },
                                animate: {
                                    x: 0
                                },
                                exit: {
                                    x: `100%`
                                },
                                transition: {
                                    type: `tween`,
                                    duration: .25
                                },
                                style: {
                                    position: `fixed`,
                                    right: 0,
                                    top: 60,
                                    bottom: 70,
                                    width: `75vw`,
                                    maxWidth: 280,
                                    background: `linear-gradient(135deg,#0a1422,#060e18)`,
                                    borderLeft: `1px solid rgba(255,255,255,0.1)`,
                                    zIndex: 25,
                                    overflowY: `auto`,
                                    padding: `12px 10px`
                                },
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    J === `ship` && (0, k.jsxs)(k.Fragment, {
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Y.ship.upgrades.length === 0 ? (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Y.ship.upgrades.map((e)=>{
                                                let t = P.find((t)=>t.id === e);
                                                return (0, k.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, k.jsx)(`img`, {
                                                            src: N[e],
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        t.name
                                                    ]
                                                }, e);
                                            }),
                                            Y.upgradeToken && (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8
                                                },
                                                children: `✦ Free upgrade — claim it at a port`
                                            }),
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginTop: 10,
                                                    marginBottom: 6
                                                },
                                                children: `COMPONENTS`
                                            }),
                                            [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    icon: `⚓`,
                                                    color: `#44cc88`,
                                                    levels: [
                                                        `20 HP`,
                                                        `28 HP`,
                                                        `38 HP`
                                                    ]
                                                },
                                                {
                                                    key: `weapon`,
                                                    label: `Weapon`,
                                                    icon: `⚔️`,
                                                    color: `#ee6644`,
                                                    levels: [
                                                        `P2`,
                                                        `P5`,
                                                        `P9`
                                                    ]
                                                },
                                                {
                                                    key: `nav`,
                                                    label: `Nav`,
                                                    icon: `🔭`,
                                                    color: `#6aaccc`,
                                                    levels: [
                                                        `V1`,
                                                        `V2`,
                                                        `V3`
                                                    ]
                                                }
                                            ].map((e)=>{
                                                let t = Y.ship.levels[e.key];
                                                return (0, k.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, k.jsx)(`span`, {
                                                            children: e.icon
                                                        }),
                                                        (0, k.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, k.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, k.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 12
                                                            },
                                                            children: e.levels[t]
                                                        })
                                                    ]
                                                }, e.key);
                                            })
                                        ]
                                    }),
                                    J === `upgrades` && (0, k.jsxs)(k.Fragment, {
                                        children: [
                                            (0, k.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            P.map((e)=>{
                                                let t = Y.ship.upgrades.includes(e.id), n = F[e.build];
                                                return (0, k.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, k.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, k.jsx)(`img`, {
                                                                    src: N[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, k.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, k.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, k.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, k.jsx)(Xe, {
                                                                pros: e.pros,
                                                                cons: e.cons,
                                                                fontSize: 11,
                                                                opacity: .4
                                                            })
                                                        })
                                                    ]
                                                }, e.id);
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        J && (0, k.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>wt(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { nt as default, __tla };
