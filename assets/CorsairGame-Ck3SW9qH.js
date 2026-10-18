import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { A as o, B as s, C as c, D as l, E as u, F as d, I as f, J as p, K as m, L as h, M as g, N as _, O as ee, P as te, R as v, S as ne, _ as y, a as re, g as b, h as x, i as S, j as ie, k as ae, l as C, q as w, s as oe, t as se, v as ce, w as le, x as ue } from "./anchor-CoYpRKT5.js";
import { S as de, f as fe, g as pe, h as me, m as he, o as ge, t as _e, x as ve, __tla as __tla_0 } from "./supabase-CFUQaIns.js";
import { l as T, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let ht;
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
    var E = e(t(), 1), ye = `corsair_onboard_v1`;
    function be() {
        try {
            return new Set(JSON.parse(localStorage.getItem(ye) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function xe(e) {
        let t = be();
        t.add(e);
        try {
            localStorage.setItem(ye, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function Se(e) {
        let t = be();
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
    var Ce = {
        gold: .5,
        buy: .5,
        damage: .6,
        streak: .55,
        zone: .6,
        death: .6,
        hunter_near: .65,
        hunter_attack: .7,
        thunder: .55
    }, we = {}, Te = !1;
    function Ee(e) {
        Te = e;
    }
    function D(e) {
        if (!Te) try {
            let t = we[e];
            t || (t = new Audio(`/sounds/${e}.wav`), we[e] = t), t.volume = Ce[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var O = r();
    function k({ tip: e, isMobile: t, onDismiss: n }) {
        return (0, O.jsxs)(i.button, {
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
                (0, O.jsx)(`div`, {
                    style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: `#c8a030`,
                        fontFamily: `'Cinzel', serif`,
                        marginBottom: 4
                    },
                    children: e.title
                }),
                (0, O.jsx)(`div`, {
                    style: {
                        fontSize: t ? 13 : 15,
                        lineHeight: 1.35
                    },
                    children: e.text
                }),
                (0, O.jsx)(`div`, {
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
    var A = {
        search: `/assets/search-CSNg3Ko5.png`,
        lurks: `/assets/lurks-BB0IX5ES.png`,
        fight: `/assets/fight-g8Kc5AC3.png`,
        tribute: `/assets/tribute-CcshN1U0.png`,
        pact: `/assets/pact-DCE16eF-.png`,
        push: `/assets/push-DcLNLHxV.png`,
        detour: `/assets/detour-D8HBkeuW.png`,
        take: `/assets/take-CO53AH6i.png`,
        leave: `/assets/leave-CeE9NwgD.png`,
        dock: `/assets/dock-ePamt-Sr.png`,
        sail: `/assets/sail-yGR6Adzb.png`,
        ritual: `/assets/ritual-B5bqWt-6.png`,
        explore: `/assets/explore-CNxn52P4.png`,
        careful: `/assets/careful-Cp7BVX84.png`,
        speed: `/assets/speed-BTjZicNY.png`,
        vortex: `/assets/vortex-l5f1oTMj.png`,
        cursed: `/assets/cursed-DmavkUs_.png`,
        sacrifice: `/assets/sacrifice-KlI9xYLE.png`,
        cover: `/assets/cover-B_e5YbfY.png`
    }, j = (e)=>`/scenes/${e}`, M = {
        1: j(`island.jpg`),
        2: j(`storm.jpg`),
        3: j(`ancient_kraken.jpg`)
    }, N = {
        kraken: j(`kraken.jpg`),
        ancient_kraken: j(`ancient_kraken.jpg`),
        storm: j(`storm.jpg`),
        island: j(`island.jpg`),
        treasure: j(`treasure.jpg`),
        cursed_treasure: j(`cursed_treasure.jpg`),
        pirate: j(`pirate.jpg`),
        port: j(`port.jpg`),
        rocks: j(`rocks.jpg`),
        wreck: j(`wreck.jpg`),
        maelstrom: j(`maelstrom.jpg`)
    }, De = {
        kraken: j(`kraken.mp4`),
        ancient_kraken: j(`ancient_kraken.mp4`),
        storm: j(`storm.mp4`),
        island: j(`island.mp4`),
        treasure: j(`treasure.mp4`),
        cursed_treasure: j(`cursed_treasure.mp4`),
        pirate: j(`pirate.mp4`),
        port: j(`port.mp4`),
        rocks: j(`rocks.mp4`),
        wreck: j(`wreck.mp4`),
        maelstrom: j(`maelstrom.mp4`),
        death: j(`death.mp4`)
    }, Oe = {
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
    };
    function ke(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function Ae(e, t) {
        let n = ke(e);
        return n === 0 || t >= n;
    }
    function P(e, t, n, r) {
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function je(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    function Me(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, O.jsx)(`img`, {
            src: e,
            alt: ``,
            style: {
                width: t,
                height: t,
                objectFit: `contain`,
                borderRadius: `50%`,
                mixBlendMode: `lighten`,
                filter: `drop-shadow(0 0 12px rgba(200,160,48,0.6))`
            }
        }) : (0, O.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function Ne({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, score: s, cellIcon: c, onboard: l, onDismissOnboard: u, onChoose: d, canEscape: f, onSkip: p }) {
        let m = (0, O.jsx)(`div`, {
            style: {
                display: `flex`,
                flexDirection: n ? `column` : `row`,
                alignItems: n ? `stretch` : void 0,
                width: n ? `100%` : void 0,
                gap: n ? e === `scene` ? 10 : 8 : e === `scene` ? 16 : 10,
                justifyContent: `center`,
                marginTop: e === `compact` ? 8 : 0
            },
            children: t.choices.map((s, c)=>{
                let l = je(s.risk), u = Ae(s.desc, r), f = P(s, t.cellType, o, a), p = e === `scene` ? 1.04 : 1.02, m = e === `scene` ? .96 : .98;
                return (0, O.jsxs)(i.button, {
                    whileHover: {
                        scale: u ? p : 1
                    },
                    whileTap: {
                        scale: u ? m : 1
                    },
                    onClick: ()=>{
                        u && d(c);
                    },
                    style: {
                        flex: 1,
                        maxWidth: e === `scene` && !n ? 320 : void 0,
                        padding: e === `scene` ? n ? `14px 16px` : `24px 28px` : `20px 24px`,
                        borderRadius: 16,
                        border: `1.5px solid ${u ? l : `rgba(255,255,255,0.1)`}55`,
                        background: u ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${l}0f 100%)` : `rgba(0,0,0,0.5)`,
                        cursor: u ? `pointer` : `not-allowed`,
                        color: u ? `#e8e0d0` : `rgba(255,255,255,0.3)`,
                        fontFamily: `'Pirata One', cursive`,
                        textAlign: `left`,
                        backdropFilter: `blur(8px)`,
                        boxShadow: e === `scene` && u ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${l}22` : `none`,
                        transition: `all 0.2s`,
                        opacity: u ? 1 : .5
                    },
                    children: [
                        A[s.icon] ? (0, O.jsx)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: (0, O.jsx)(`img`, {
                                src: A[s.icon],
                                alt: ``,
                                style: {
                                    width: e === `scene` ? 72 : 40,
                                    height: e === `scene` ? 72 : 40,
                                    objectFit: `contain`
                                }
                            })
                        }) : (0, O.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 26 : 22,
                                marginBottom: 4
                            },
                            children: s.icon
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: l,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: s.label
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                fontSize: 20,
                                color: `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: f
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 13 : 16,
                                color: l,
                                marginTop: e === `scene` ? 10 : 4,
                                letterSpacing: e === `scene` ? 2 : 1,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: s.risk.toUpperCase()
                        })
                    ]
                }, c);
            })
        }), h = f && p ? (0, O.jsxs)(`button`, {
            onClick: p,
            style: {
                marginTop: 8,
                padding: `6px 16px`,
                borderRadius: 7,
                border: `1px solid rgba(100,170,220,0.3)`,
                background: `transparent`,
                color: `rgba(100,170,220,0.5)`,
                cursor: `pointer`,
                fontSize: 14,
                display: `inline-flex`,
                alignItems: `center`,
                gap: 6
            },
            children: [
                (0, O.jsx)(y, {
                    name: `ship`,
                    size: 14
                }),
                ` Use Swift Sails (1 use left)`
            ]
        }) : null;
        return e === `scene` ? (0, O.jsxs)(i.div, {
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
                padding: n ? `12px` : `24px`,
                paddingBottom: n ? `calc(20px + env(safe-area-inset-bottom))` : 64,
                overflowY: `auto`
            },
            children: [
                N[t.cellType] && (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${N[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                s != null && (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, O.jsxs)(`div`, {
                        style: {
                            fontSize: n ? 13 : 18,
                            fontWeight: 700,
                            color: `#eedd44`
                        },
                        children: [
                            s,
                            n ? `pts` : ` pts`
                        ]
                    })
                }),
                (0, O.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        l && u && (0, O.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, O.jsx)(k, {
                                tip: l,
                                isMobile: n,
                                onDismiss: u
                            })
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: 16,
                                paddingLeft: 8
                            },
                            children: (0, O.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 28 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: Oe[t.cellType] ?? t.cellType
                            })
                        }),
                        m,
                        h && (0, O.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: h
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, O.jsx)(i.div, {
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
            children: (0, O.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, O.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: Me(c, 55)
                    }),
                    (0, O.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, O.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            l && u && (0, O.jsx)(k, {
                                tip: l,
                                isMobile: n,
                                onDismiss: u
                            }),
                            m,
                            h
                        ]
                    })
                ]
            })
        }, `event-compact`);
    }
    var Pe = {
        escape: `/assets/swift_sails-YMobDX4v.png`,
        ghost: `/assets/ghost_ship-4jaVs07k.png`,
        hunter: `/assets/treasure_hunter-C9jnAyZy.png`,
        rider: `/assets/storm_rider-BjRGnDwr.png`,
        greed: `/assets/cursed_greed-BlVfcQDt.png`,
        berserker: `/assets/berserker-B9haxHEY.png`
    }, Fe = [
        `ghost`,
        `hunter`,
        `rider`,
        `greed`,
        `berserker`,
        `escape`,
        `_reserved6`,
        `_reserved7`,
        `_reserved8`,
        `_reserved9`,
        `_reserved10`,
        `_reserved11`,
        `_reserved12`
    ], F = w.upgrades.costs, Ie = Math.round(w.storm.hunterSurgeBonus * 100), Le = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: F.ghost,
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
            cost: F.rider,
            icon: `rider`,
            build: `escape`
        },
        {
            id: `greed`,
            name: `Cursed Greed`,
            pros: [
                `Gold x${w.greed.goldMultiplier} on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm worsens every 200g. Pirates hit harder at 400g+. Hunter aggro at 600g+.`
            ],
            cost: F.greed,
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
            cost: F.berserker,
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
                `Storm surges +${Ie}% more frequent.`
            ],
            cost: F.hunter,
            icon: `hunter`,
            build: `gold`
        },
        {
            id: `escape`,
            name: `Swift Sails`,
            pros: [
                `Skip one dangerous event per run with no consequences. Save for the worst moment.`
            ],
            cons: [],
            cost: F.escape,
            icon: `escape`,
            build: `escape`
        }
    ], Re = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function ze({ ok: e }) {
        return (0, O.jsx)(`span`, {
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
    function Be({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, O.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, O.jsx)(ze, {
                        ok: t
                    }),
                    (0, O.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, O.jsxs)(`div`, {
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
    var Ve = `/assets/hull-CGmPGbU0.png`, He = `/assets/vision-3Q65Za4i.png`, Ue = `/assets/power-CBX9SU5d.png`;
    function We({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, O.jsx)(n, {
            children: e && (0, O.jsxs)(i.div, {
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
                    padding: t ? `12px 12px calc(12px + env(safe-area-inset-bottom))` : `16px 24px`,
                    flexShrink: 0,
                    position: `relative`,
                    zIndex: 5,
                    maxHeight: t ? `62vh` : void 0,
                    overflowY: t ? `auto` : void 0
                },
                children: [
                    (0, O.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, O.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, O.jsx)(`span`, {
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
                            u && d && (0, O.jsx)(k, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, O.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            display: `grid`,
                                            gridTemplateColumns: t ? `1fr` : `repeat(3,1fr)`,
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
                                                    `Vision base 1`,
                                                    `Vision base 2 (stacks with Spyglass)`,
                                                    `Vision base 3 +detect`
                                                ]
                                            }
                                        ].map((e)=>{
                                            let t = r.levels[e.key], n = t === 0 ? 50 : 110, i = t < 2 && r.gold >= n && !(t === 1 && s >= 2), a = t >= 2;
                                            return (0, O.jsxs)(`div`, {
                                                onClick: ()=>i && f(e.key),
                                                style: {
                                                    background: `${e.color}12`,
                                                    border: `1px solid ${e.color}${i ? `66` : `22`}`,
                                                    borderRadius: 10,
                                                    padding: `12px 10px`,
                                                    cursor: i ? `pointer` : `default`,
                                                    opacity: i || a ? 1 : .5,
                                                    transition: `all 0.2s`
                                                },
                                                children: [
                                                    (0, O.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, O.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, O.jsx)(`img`, {
                                                                        src: e.img,
                                                                        alt: ``,
                                                                        style: {
                                                                            width: 22,
                                                                            height: 22,
                                                                            objectFit: `contain`
                                                                        }
                                                                    }),
                                                                    e.label
                                                                ]
                                                            }),
                                                            (0, O.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, O.jsx)(`div`, {
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
                                                    (0, O.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: `rgba(255,255,255,0.6)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, O.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 11,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: t === 1 && s >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                    }),
                                                    a && (0, O.jsx)(`div`, {
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
                            (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, O.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        onClick: p,
                                        style: {
                                            padding: `4px 12px`,
                                            borderRadius: 6,
                                            border: m ? `1px solid rgba(238,221,68,0.55)` : `1px solid rgba(255,200,50,0.3)`,
                                            background: m ? `rgba(238,221,68,0.14)` : `rgba(255,200,50,0.08)`,
                                            cursor: `pointer`,
                                            color: `#eedd44`,
                                            fontSize: 13,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: m ? `🎲 Free reroll (Merchant)` : `🎲 Reroll (20g)`
                                    })
                                ]
                            }),
                            (0, O.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: Le.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = Re[e.build];
                                    return (0, O.jsxs)(`div`, {
                                        onClick: ()=>{
                                            n ? l((t)=>t.filter((t)=>t !== e.id)) : s && l((t)=>[
                                                    ...t,
                                                    e.id
                                                ]);
                                        },
                                        style: {
                                            padding: `14px 18px`,
                                            borderRadius: 10,
                                            border: `1px solid ${t ? u + `66` : n ? `#44cc8866` : s ? u + `33` : `rgba(255,255,255,0.05)`}`,
                                            background: t ? `${u}18` : n ? `rgba(68,204,136,0.15)` : s ? `rgba(255,255,255,0.04)` : `rgba(255,255,255,0.01)`,
                                            cursor: s || n ? `pointer` : `default`,
                                            opacity: t || s || n ? 1 : .35,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 12
                                        },
                                        children: [
                                            (0, O.jsx)(`img`, {
                                                src: Pe[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                children: [
                                                    (0, O.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                            fontFamily: `'Pirata One', cursive`
                                                        },
                                                        children: e.name
                                                    }),
                                                    (0, O.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, O.jsx)(Be, {
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
                            r.upgrades.length + c.length >= 2 && (0, O.jsx)(`div`, {
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
                    (0, O.jsx)(`div`, {
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
                                gain: 8,
                                code: 60
                            },
                            {
                                label: `Full Repair`,
                                desc: `Restore all`,
                                cost: 55,
                                gain: r.maxHull,
                                code: 61
                            }
                        ].map((e)=>(0, O.jsxs)(i.button, {
                                whileTap: {
                                    scale: .97
                                },
                                onClick: ()=>h(e.gain, e.cost, e.code),
                                disabled: r.gold < e.cost || r.hull >= r.maxHull,
                                style: {
                                    flex: 1,
                                    padding: `10px 8px`,
                                    borderRadius: 10,
                                    border: `1px solid rgba(68,204,136,0.3)`,
                                    background: `rgba(68,204,136,0.08)`,
                                    cursor: r.gold >= e.cost && r.hull < r.maxHull ? `pointer` : `not-allowed`,
                                    opacity: r.gold >= e.cost && r.hull < r.maxHull ? 1 : .4,
                                    textAlign: `center`
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `#44cc88`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: e.label
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.5)`
                                        },
                                        children: e.desc
                                    }),
                                    (0, O.jsxs)(`div`, {
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
                    (0, O.jsxs)(i.button, {
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: .98
                        },
                        onClick: g,
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
                            (0, O.jsx)(y, {
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
        });
    }
    var Ge = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new T({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function Ke(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: Ge,
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
    function qe({ payload: e, isMobile: t, onShare: n }) {
        return (0, O.jsxs)(i.div, {
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
                (0, O.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, O.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, O.jsxs)(`div`, {
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
                (0, O.jsx)(`div`, {
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
                    ].map((e)=>(0, O.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, O.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, O.jsx)(`div`, {
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
                (0, O.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, O.jsxs)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 1,
                                color: `rgba(255,255,255,0.3)`
                            },
                            children: [
                                e.isDaily ? `Blind map · revealed at 00:00 UTC` : `Seed ${e.seed}`,
                                ` · playcorsair.xyz`
                            ]
                        }),
                        (0, O.jsx)(i.button, {
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
    async function Je(e) {
        try {
            if (typeof navigator < `u` && navigator.share) {
                await navigator.share({
                    text: e
                });
                return;
            }
        } catch  {}
        window.open(`https://x.com/intent/post?text=${encodeURIComponent(e)}`, `_blank`);
    }
    function I(e) {
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
    function Ye({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: o, isNewRecord: s, newFeats: c, nearFeats: l, scoreSubmitted: d, nftMinted: f, walletAddress: p, account: m, onChainDone: g, setOnChainDone: _, submitting: te, setSubmitting: v, connecting: ne, onConnect: b, showGuestDailyCta: x, onPlayDaily: S, rangMois: ie, harborDown: ae, restarting: C, onRestart: w, onHome: oe }) {
        return (0, O.jsx)(n, {
            children: e && (0, O.jsxs)(i.div, {
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
                    (0, O.jsx)(i.div, {
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
                    (0, O.jsx)(i.div, {
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
                        children: (0, O.jsx)(y, {
                            name: `skull`,
                            size: 130
                        })
                    }),
                    (0, O.jsx)(i.div, {
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
                            fontSize: r ? 42 : 72,
                            fontWeight: 700,
                            color: `#ee4444`,
                            fontFamily: `'Pirata One', cursive`,
                            letterSpacing: r ? 3 : 6,
                            textShadow: `0 0 40px rgba(220,30,30,0.8), 0 0 80px rgba(220,30,30,0.4)`,
                            marginBottom: 8
                        },
                        children: `SHIPWRECKED`
                    }),
                    (0, O.jsx)(i.div, {
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
                            fontSize: r ? 16 : 24,
                            color: `rgba(200,160,48,0.8)`,
                            fontFamily: `'Cinzel', serif`,
                            letterSpacing: r ? 2 : 4,
                            marginBottom: 4,
                            textAlign: `center`
                        },
                        children: t.runTitle
                    }),
                    (0, O.jsxs)(i.div, {
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
                            fontSize: r ? 15 : 20,
                            color: `rgba(255,255,255,0.35)`,
                            fontFamily: `'IM Fell English', cursive`,
                            marginBottom: 16,
                            maxWidth: r ? `90vw` : 600,
                            textAlign: `center`,
                            fontStyle: `italic`,
                            padding: r ? `0 16px` : 0
                        },
                        children: [
                            `"`,
                            t.log,
                            `"`
                        ]
                    }),
                    (()=>{
                        let e = I(t.log);
                        return (0, O.jsxs)(i.div, {
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
                                maxWidth: r ? `90vw` : 560
                            },
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: r ? 13 : 15,
                                        color: `#ee6655`,
                                        fontFamily: `'Cinzel', serif`,
                                        letterSpacing: 2
                                    },
                                    children: [
                                        (0, O.jsx)(y, {
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
                                (0, O.jsx)(`div`, {
                                    style: {
                                        fontSize: r ? 12 : 14,
                                        color: `rgba(255,255,255,0.55)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        textAlign: `center`
                                    },
                                    children: e.tip
                                })
                            ]
                        });
                    })(),
                    c.length > 0 && (0, O.jsx)(i.div, {
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
                            maxWidth: r ? `90vw` : 560
                        },
                        children: c.map((e)=>(0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 10
                                },
                                children: [
                                    (0, O.jsx)(y, {
                                        name: e.icon,
                                        size: 26
                                    }),
                                    (0, O.jsxs)(`div`, {
                                        style: {
                                            textAlign: `left`
                                        },
                                        children: [
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontFamily: `'Pirata One', cursive`,
                                                    fontSize: r ? 15 : 17,
                                                    color: `#eedd44`,
                                                    letterSpacing: 1
                                                },
                                                children: [
                                                    `NEW FEAT: `,
                                                    e.name
                                                ]
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontFamily: `'Cinzel', serif`,
                                                    fontSize: r ? 10 : 11,
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
                    (l.length > 0 || !s && o > t.score) && (0, O.jsxs)(i.div, {
                        initial: {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 1.35
                        },
                        style: {
                            marginBottom: 18,
                            padding: r ? `12px 14px` : `14px 20px`,
                            borderRadius: 12,
                            border: `1px solid rgba(136,221,255,0.35)`,
                            background: `rgba(10,24,40,0.75)`,
                            maxWidth: r ? `92vw` : 520,
                            width: `100%`
                        },
                        children: [
                            (0, O.jsx)(`div`, {
                                style: {
                                    fontFamily: `'Cinzel', serif`,
                                    fontSize: 11,
                                    letterSpacing: 3,
                                    color: `rgba(136,221,255,0.85)`,
                                    marginBottom: 8,
                                    textAlign: `center`
                                },
                                children: `STILL ON THE TIDE`
                            }),
                            !s && o > t.score && (0, O.jsxs)(`div`, {
                                style: {
                                    fontFamily: `'IM Fell English', cursive`,
                                    fontSize: r ? 14 : 15,
                                    color: `rgba(255,255,255,0.75)`,
                                    textAlign: `center`,
                                    marginBottom: l.length ? 8 : 0
                                },
                                children: [
                                    o - t.score,
                                    ` pts short of your best (`,
                                    o.toLocaleString(),
                                    `)`
                                ]
                            }),
                            l.map((e)=>(0, O.jsxs)(`div`, {
                                    style: {
                                        marginTop: 8
                                    },
                                    children: [
                                        (0, O.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                justifyContent: `space-between`,
                                                gap: 8,
                                                alignItems: `baseline`,
                                                marginBottom: 4
                                            },
                                            children: [
                                                (0, O.jsx)(`div`, {
                                                    style: {
                                                        fontFamily: `'Pirata One', cursive`,
                                                        fontSize: 15,
                                                        color: `#c8e8ff`
                                                    },
                                                    children: e.feat.name
                                                }),
                                                (0, O.jsxs)(`div`, {
                                                    style: {
                                                        fontFamily: `'Cinzel', serif`,
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.45)`
                                                    },
                                                    children: [
                                                        Math.round(e.ratio * 100),
                                                        `%`
                                                    ]
                                                })
                                            ]
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                borderRadius: 2,
                                                background: `rgba(255,255,255,0.08)`,
                                                overflow: `hidden`,
                                                marginBottom: 4
                                            },
                                            children: (0, O.jsx)(`div`, {
                                                style: {
                                                    height: `100%`,
                                                    width: `${Math.round(e.ratio * 100)}%`,
                                                    background: `linear-gradient(90deg,#2a6a8a,#88ddff)`,
                                                    borderRadius: 2
                                                }
                                            })
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontFamily: `'IM Fell English', cursive`,
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.55)`
                                            },
                                            children: e.line
                                        })
                                    ]
                                }, e.feat.id)),
                            !a && !u() && S && p && (0, O.jsx)(`div`, {
                                style: {
                                    marginTop: 12,
                                    fontSize: 12,
                                    color: `rgba(200,160,48,0.75)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: 1,
                                    textAlign: `center`
                                },
                                children: `Daily still open today — same seas as every captain.`
                            }),
                            !a && !u() && !p && (0, O.jsx)(`div`, {
                                style: {
                                    marginTop: 12,
                                    fontSize: 12,
                                    color: `rgba(200,160,48,0.75)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: 1,
                                    textAlign: `center`
                                },
                                children: `Connect to sail today’s Daily and climb the board.`
                            })
                        ]
                    }),
                    (0, O.jsx)(i.div, {
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
                            gap: r ? 16 : 32,
                            marginBottom: r ? 16 : 28,
                            flexWrap: r ? `wrap` : `nowrap`,
                            justifyContent: `center`,
                            padding: r ? `0 16px` : 0
                        },
                        children: [
                            {
                                label: `SCORE`,
                                val: `${t.score} pts`,
                                color: `#eedd44`
                            },
                            {
                                label: `BEST`,
                                val: `${Math.max(o, t.score)} pts`,
                                color: s ? `#44ffaa` : `rgba(255,255,255,0.3)`
                            },
                            {
                                label: `TURNS`,
                                val: t.turn,
                                color: `rgba(255,255,255,0.6)`
                            },
                            {
                                label: `GOLD`,
                                val: t.ship.gold,
                                color: `#eedd44`
                            },
                            {
                                label: `HULL`,
                                val: `${t.ship.hull}/${t.ship.maxHull}`,
                                color: t.ship.hull <= 5 ? `#ee4444` : t.ship.hull <= 10 ? `#ee8844` : `#44cc88`
                            },
                            {
                                label: `VOYAGES`,
                                val: re(),
                                color: `#88ddff`
                            }
                        ].map((e)=>(0, O.jsxs)(`div`, {
                                style: {
                                    textAlign: `center`
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 10 : 13,
                                            color: `rgba(255,255,255,0.3)`,
                                            letterSpacing: r ? 1 : 3,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: e.label
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 20 : 28,
                                            color: e.color,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 700
                                        },
                                        children: e.val
                                    })
                                ]
                            }, e.label))
                    }),
                    t.scoreBreakdown && (0, O.jsxs)(i.div, {
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
                            (0, O.jsx)(`div`, {
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
                                    val: t.scoreBreakdown.movement,
                                    color: `#6aaccc`
                                },
                                {
                                    label: `COMBAT`,
                                    val: t.scoreBreakdown.combat,
                                    color: `#ee6644`
                                },
                                {
                                    label: `TREASURE`,
                                    val: t.scoreBreakdown.treasure,
                                    color: `#eedd44`
                                },
                                {
                                    label: `STREAKS`,
                                    val: t.scoreBreakdown.streaks,
                                    color: `#cc44ee`
                                },
                                {
                                    label: `FEATS`,
                                    val: t.scoreBreakdown.achievements,
                                    color: `#44cc88`
                                },
                                ...t.scoreBreakdown.other > 0 ? [
                                    {
                                        label: `BONUS`,
                                        val: t.scoreBreakdown.other,
                                        color: `#aaaaff`
                                    }
                                ] : []
                            ].filter((e)=>e.val > 0).map((e)=>(0, O.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        marginBottom: 3
                                    },
                                    children: [
                                        (0, O.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.4)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1
                                            },
                                            children: e.label
                                        }),
                                        (0, O.jsxs)(`span`, {
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
                    (0, O.jsxs)(i.div, {
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
                            (0, O.jsx)(`div`, {
                                children: a ? ee() ? `Seed: ${t.seed} — Daily Key: ${le()}` : `Blind daily — seed revealed at 00:00 UTC` : `Seed: ${t.seed} — challenge your crew!`
                            }),
                            a && (0, O.jsxs)(`div`, {
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
                    (0, O.jsxs)(i.div, {
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
                            m && !g && (0, O.jsx)(i.button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                disabled: te,
                                onClick: async ()=>{
                                    v(!0);
                                    try {
                                        await Ke(m, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                    } catch (e) {
                                        console.warn(`On-chain submit failed:`, e);
                                    }
                                    _(!0), v(!1);
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
                                children: te ? `ENGRAVING...` : (0, O.jsxs)(O.Fragment, {
                                    children: [
                                        (0, O.jsx)(y, {
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
                            (0, O.jsx)(`div`, {
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
                            d && (0, O.jsx)(`div`, {
                                style: {
                                    fontSize: 14,
                                    color: `#44cc88`,
                                    letterSpacing: 2,
                                    fontFamily: `'Pirata One', cursive`
                                },
                                children: `✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD`
                            }),
                            f.length > 0 && (0, O.jsxs)(i.div, {
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
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            marginBottom: 4
                                        },
                                        children: (0, O.jsx)(y, {
                                            name: `flag`,
                                            size: 24
                                        })
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `#FFD700`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 2
                                        },
                                        children: `NFT EARNED!`
                                    }),
                                    f.map((e)=>(0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'Cinzel', serif`,
                                                marginTop: 4
                                            },
                                            children: e.replace(/_/g, ` `).toUpperCase()
                                        }, e)),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginTop: 8,
                                            lineHeight: 1.4
                                        },
                                        children: `Your NFT will be sent to your wallet soon.`
                                    }),
                                    (0, O.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ()=>{
                                            let e = f[0], t = `🏴‍☠️ I earned "${e.replace(/_/g, ` `).replace(/\b\w/g, (e)=>e.toUpperCase())}" — a ${new Set([
                                                `splintered_keel`,
                                                `quiet_hold`,
                                                `red_wake`,
                                                `abyss_lantern`,
                                                `tideborn_crown`
                                            ]).has(e) ? `Tideborn` : `Genesis`} NFT in Corsair.\nNo mint button. No whitelist. Just sail, meet the condition, claim it before it's SOLD OUT.\nDare to find yours? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                            window.open(`https://x.com/intent/post?text=${encodeURIComponent(t)}`, `_blank`);
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
                            !p && (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `This run stayed local. Connect a wallet to submit scores, play the Daily, and earn NFTs.`
                                    }),
                                    (0, O.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: b,
                                        disabled: ne,
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
                                        children: ne ? `CONNECTING...` : `CONNECT WALLET`
                                    })
                                ]
                            }),
                            x && S && (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `Wallet linked. This run stayed local — sail the Daily to climb today's board.`
                                    }),
                                    (0, O.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: S,
                                        style: {
                                            padding: `12px 28px`,
                                            borderRadius: 10,
                                            border: `2px solid rgba(200,160,48,0.75)`,
                                            background: `rgba(200,160,48,0.18)`,
                                            color: `#c8a030`,
                                            cursor: `pointer`,
                                            fontSize: 16,
                                            letterSpacing: 2,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `PLAY DAILY · 1 TRY`
                                    })
                                ]
                            }),
                            (()=>{
                                let e = new Date().toLocaleDateString(`en-US`, {
                                    month: `short`,
                                    day: `numeric`
                                }), n = {
                                    legendary: 3,
                                    rare: 2,
                                    common: 1
                                }, i = (t.relics ?? []).map((e)=>h(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = ie ? `\n⚔️ #${ie.rank} in Starktember — ${ie.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`, l = I(t.log);
                                return (0, O.jsx)(qe, {
                                    isMobile: r,
                                    onShare: ()=>{
                                        Je(c);
                                    },
                                    payload: {
                                        score: t.score,
                                        turn: t.turn,
                                        gold: t.ship.gold,
                                        runTitle: t.runTitle,
                                        seed: t.seed,
                                        deathName: l.name,
                                        isDaily: a,
                                        text: c
                                    }
                                });
                            })(),
                            (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    ae && (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try Sail again when you're back online`
                                    }),
                                    (0, O.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 12,
                                            flexWrap: `wrap`,
                                            justifyContent: `center`
                                        },
                                        children: [
                                            !a && !u() && S && p && (0, O.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: S,
                                                style: {
                                                    padding: `14px 28px`,
                                                    borderRadius: 12,
                                                    border: `2px solid rgba(136,221,255,0.7)`,
                                                    background: `rgba(30,80,110,0.45)`,
                                                    color: `#88ddff`,
                                                    cursor: `pointer`,
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    boxShadow: `0 0 20px rgba(100,180,220,0.2)`
                                                },
                                                children: `PLAY DAILY · 1 TRY`
                                            }),
                                            (0, O.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: w,
                                                disabled: C,
                                                style: {
                                                    padding: `14px 36px`,
                                                    borderRadius: 12,
                                                    border: `2px solid rgba(200,160,48,0.6)`,
                                                    background: `rgba(80,60,10,0.5)`,
                                                    color: `#c8a030`,
                                                    cursor: C ? `wait` : `pointer`,
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    boxShadow: `0 0 20px rgba(200,160,48,0.2)`,
                                                    opacity: C ? .7 : 1
                                                },
                                                children: C ? `PREPARING…` : `SAIL AGAIN`
                                            }),
                                            (0, O.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: oe,
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
                ]
            })
        });
    }
    function L({ shipId: e, size: t, lurchX: n = 0, lurchY: r = 0 }) {
        let a = e === `specter`, [o, s] = (0, E.useState)(!0), c = `${b(e)}?v=6`;
        return (0, O.jsx)(i.div, {
            animate: {
                rotate: n * 8,
                y: r * 4,
                scale: n || r ? 1.04 : 1
            },
            transition: {
                type: `spring`,
                stiffness: 220,
                damping: 14
            },
            style: {
                lineHeight: 0,
                transformOrigin: `50% 70%`
            },
            children: (0, O.jsxs)(i.div, {
                animate: {
                    y: [
                        0,
                        -2,
                        0
                    ]
                },
                transition: {
                    repeat: 1 / 0,
                    duration: 2.2,
                    ease: `easeInOut`
                },
                style: {
                    position: `relative`,
                    width: t,
                    height: t
                },
                children: [
                    (0, O.jsx)(`div`, {
                        "aria-hidden": !0,
                        style: {
                            position: `absolute`,
                            left: `18%`,
                            right: `18%`,
                            bottom: `6%`,
                            height: `18%`,
                            borderRadius: `50%`,
                            background: a ? `radial-gradient(ellipse, rgba(120,210,240,0.45) 0%, transparent 70%)` : `radial-gradient(ellipse, rgba(30,80,110,0.55) 0%, rgba(180,220,240,0.15) 45%, transparent 72%)`,
                            pointerEvents: `none`
                        }
                    }),
                    o ? (0, O.jsx)(`img`, {
                        src: c,
                        alt: ``,
                        width: t,
                        height: t,
                        onError: ()=>s(!1),
                        style: {
                            display: `block`,
                            width: t,
                            height: t,
                            objectFit: `contain`,
                            position: `relative`,
                            zIndex: 1,
                            filter: a ? `drop-shadow(0 0 8px rgba(110,200,240,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.35))` : `drop-shadow(0 3px 5px rgba(0,0,0,0.7))`,
                            opacity: a ? .92 : 1
                        }
                    }) : (0, O.jsx)(Xe, {
                        shipId: e,
                        size: t,
                        ghost: a
                    })
                ]
            })
        });
    }
    function Xe({ shipId: e, size: t, ghost: n }) {
        return (0, O.jsxs)(`svg`, {
            width: t,
            height: t,
            viewBox: `0 0 64 64`,
            style: {
                display: `block`,
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.6))`,
                opacity: n ? .9 : 1
            },
            children: [
                (0, O.jsx)(`ellipse`, {
                    cx: `32`,
                    cy: `50`,
                    rx: `14`,
                    ry: `4`,
                    fill: `rgba(40,90,120,0.35)`
                }),
                (0, O.jsx)(`path`, {
                    d: `M32 10 L46 28 L42 50 L22 50 L18 28 Z`,
                    fill: e === `corsair` ? `#2A1814` : e === `specter` ? `#5A9BB8` : e === `merchant` ? `#8B5A2B` : `#6B4428`
                }),
                (0, O.jsx)(`path`, {
                    d: `M22 14 L42 14 L38 34 L26 34 Z`,
                    fill: e === `corsair` ? `#B01820` : e === `specter` ? `#E8F8FF` : `#F0E6D0`
                }),
                (0, O.jsx)(`rect`, {
                    x: `30.5`,
                    y: `6`,
                    width: `3`,
                    height: `30`,
                    fill: `#2E2014`
                })
            ]
        });
    }
    var Ze = `/sea/ocean-tile.jpg`, Qe = 4, R = {
        1: {
            base: `#1a5a6e`,
            veil: `rgba(8, 40, 52, 0.05)`,
            sheen: `rgba(180, 220, 230, 0.08)`
        },
        2: {
            base: `#164860`,
            veil: `rgba(6, 32, 48, 0.14)`,
            sheen: `rgba(150, 190, 210, 0.07)`
        },
        3: {
            base: `#123848`,
            veil: `rgba(4, 20, 36, 0.22)`,
            sheen: `rgba(120, 160, 190, 0.06)`
        }
    };
    function $e(e, t) {
        return Math.abs(e * 73856093 ^ t * 19349663) % 1e3;
    }
    function et({ zone: e, x: t, y: n, cellSize: r, quiet: i }) {
        let a = R[e] ?? R[1], o = $e(t, n), s = Math.max(1, r * Qe), c = -t * r, l = -n * r;
        return (0, O.jsxs)(`div`, {
            "aria-hidden": !0,
            className: i ? void 0 : `sea-tile`,
            style: {
                position: `absolute`,
                inset: 0,
                borderRadius: 5,
                pointerEvents: `none`,
                overflow: `hidden`,
                backgroundColor: a.base,
                backgroundImage: `url(${Ze})`,
                backgroundSize: `${s}px ${s}px`,
                backgroundPosition: `${c}px ${l}px`,
                boxShadow: i ? `inset 0 -5px 10px rgba(8,30,40,0.4)` : `inset 0 1px 0 rgba(220,240,245,0.12), inset 0 -7px 12px rgba(8,28,38,0.45)`,
                animationDelay: i ? void 0 : `${o % 50 / 10}s`
            },
            children: [
                (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        background: a.veil
                    }
                }),
                (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        left: 0,
                        right: 0,
                        top: 0,
                        height: `40%`,
                        background: `linear-gradient(180deg, ${a.sheen} 0%, transparent 100%)`
                    }
                })
            ]
        });
    }
    function z(e) {
        return (R[e] ?? R[1]).base;
    }
    var B = (e)=>`/icons/${e}.png`, tt = {
        sea: B(`sea`),
        storm: B(`storm`),
        pirate: B(`pirate`),
        treasure: B(`treasure`),
        cursed_treasure: B(`cursed_treasure`),
        port: B(`port`),
        kraken: B(`kraken`),
        ancient_kraken: B(`ancient_kraken`),
        wreck: B(`wreck`),
        island: B(`island`),
        rocks: B(`rocks`),
        maelstrom: B(`maelstrom`),
        portal: B(`portal`),
        hunter: B(`hunter`)
    }, nt = {
        pirate: `#ee5555`,
        storm: `#a78bfa`,
        treasure: `#f0d060`,
        cursed_treasure: `#88cc66`,
        port: `#44d4d4`,
        kraken: `#cc66ee`,
        ancient_kraken: `#e070ff`,
        wreck: `#c4a574`,
        island: `#66bb66`,
        rocks: `#9aa3ad`,
        maelstrom: `#66aadd`,
        portal: `#aa88ff`
    };
    function V(e, t) {
        let n = e * 2 + 1, r = t ? 240 : 170, i = Math.max(180, window.innerHeight - r), a = e >= 4 ? .58 : .55, o = e >= 4 ? 700 : 640, s = t ? window.innerWidth - 12 : Math.min(window.innerWidth * a, o);
        return Math.max(44, Math.floor(Math.min(s, i) / n) - 2);
    }
    function rt(e, t) {
        return V(e, t) + 2;
    }
    function it(e) {
        let t = e.hunter;
        return t?.active ? Math.abs(t.x - e.ship.x) + Math.abs(t.y - e.ship.y) : 99;
    }
    function at(e) {
        let t = (e.relics ?? []).includes(`black_flag`) ? 2 : 0, n = Math.max(w.hunter.minDamage, w.hunter.baseDamage - e.ship.power) + t;
        return m(e.ship.upgrades, n);
    }
    function ot(e) {
        return e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`;
    }
    function st(e) {
        return e === `frenzy` ? `ENR` : e === `stalking` ? `STK` : e === `searching` ? `SRC` : `TRK`;
    }
    function ct(e) {
        return e <= 0 ? `ON YOU` : e === 1 ? `1 CELL — NEXT HIT` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`;
    }
    function lt(e) {
        if (!e.hunter?.active) return `calm`;
        let t = it(e);
        return t <= 1 || e.hunter.mode === `frenzy` ? `critical` : t <= 3 || e.hunter.awareness >= 80 ? `danger` : t <= 5 || e.hunter.mode === `stalking` ? `watch` : `calm`;
    }
    function ut(e) {
        if (!e.hunter?.active) return ``;
        let t = it(e), n = at(e), r = ot(e.hunter.mode);
        return t <= 1 ? `${r} · STRIKE ~−${n} hull` : `${r} · ${t} away · hit ~−${n}`;
    }
    var dt = {
        1: `rgba(6,14,22,0.82)`,
        2: `rgba(6,10,22,0.86)`,
        3: `rgba(4,6,14,0.9)`
    };
    function ft({ state: e, isMobile: t, slide: n, lurch: r, onboard: a, onDismissOnboard: o, onMove: s }) {
        let c = e.ship.vision * 2 + 1, l = V(e.ship.vision, t), u = !e.event && !e.showPort && !e.gameOver && (t ? (0, O.jsx)(`div`, {
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
            ].map((e)=>(0, O.jsx)(`button`, {
                    onClick: ()=>s(e.dx, e.dy),
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
        }) : (0, O.jsxs)(`div`, {
            "aria-label": `Sailing controls`,
            style: {
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                gap: 8,
                marginTop: 10,
                flexShrink: 0
            },
            children: [
                (0, O.jsx)(`span`, {
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
                ].map((e)=>(0, O.jsxs)(`button`, {
                        onClick: ()=>s(e.dx, e.dy),
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
                            (0, O.jsx)(`span`, {
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
        })), d = e.hunter?.active && !e.gameOver && (()=>{
            let n = lt(e), r = ut(e), a = n === `critical` ? `rgba(160,10,30,0.92)` : n === `danger` ? `rgba(100,20,50,0.88)` : n === `watch` ? `rgba(70,20,90,0.85)` : `rgba(40,20,60,0.8)`, o = n === `critical` ? `rgba(255,80,100,0.75)` : n === `danger` ? `rgba(255,120,80,0.55)` : `rgba(180,80,220,0.45)`;
            return (0, O.jsxs)(i.div, {
                initial: {
                    opacity: 0,
                    y: -6
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                style: {
                    position: `absolute`,
                    top: -6,
                    left: `50%`,
                    transform: `translateX(-50%)`,
                    zIndex: 5,
                    padding: t ? `5px 10px` : `6px 14px`,
                    borderRadius: 10,
                    border: `1px solid ${o}`,
                    background: a,
                    boxShadow: n === `critical` || n === `danger` ? `0 0 18px ${o}` : `0 4px 12px rgba(0,0,0,0.45)`,
                    display: `flex`,
                    alignItems: `center`,
                    gap: 8,
                    maxWidth: `min(100%, 420px)`,
                    whiteSpace: `nowrap`,
                    pointerEvents: `none`
                },
                children: [
                    (0, O.jsx)(y, {
                        name: `kraken`,
                        size: t ? 14 : 16
                    }),
                    (0, O.jsx)(`div`, {
                        style: {
                            fontFamily: `'Cinzel', serif`,
                            fontSize: t ? 10 : 11,
                            letterSpacing: 1.1,
                            color: n === `critical` ? `#ffccdd` : `#e8d0ff`,
                            fontWeight: 700
                        },
                        children: r
                    })
                ]
            }, r);
        })();
        return (0, O.jsxs)(`div`, {
            style: {
                flex: 1,
                minHeight: 0,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: t ? `flex-start` : `center`,
                padding: t ? `6px 4px calc(96px + env(safe-area-inset-bottom))` : `8px 10px`,
                position: `relative`,
                overflowY: `auto`
            },
            children: [
                t && (0, O.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12,
                        marginBottom: 6,
                        fontSize: 13,
                        fontFamily: `'Cinzel', serif`,
                        flexShrink: 0
                    },
                    children: [
                        (0, O.jsxs)(`span`, {
                            style: {
                                color: e.stormDistance <= 4 ? `#ee4444` : `#ee8844`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, O.jsx)(y, {
                                    name: `storm`,
                                    size: 13
                                }),
                                ` `,
                                e.stormDistance,
                                ` turns`
                            ]
                        }),
                        (0, O.jsx)(`span`, {
                            style: {
                                color: `#cc44ee`
                            },
                            children: p[e.currentZone ?? 1]?.name ?? `The Coasts`
                        }),
                        (0, O.jsxs)(`span`, {
                            style: {
                                color: `#eedd44`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, O.jsx)(y, {
                                    name: `star`,
                                    size: 13
                                }),
                                ` `,
                                e.score,
                                ` pts`
                            ]
                        })
                    ]
                }),
                a && !e.event && !e.showPort && !e.gameOver && (0, O.jsx)(k, {
                    tip: a,
                    isMobile: t,
                    onDismiss: o
                }),
                (0, O.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        flexShrink: 0
                    },
                    children: [
                        d,
                        (0, O.jsxs)(O.Fragment, {
                            children: [
                                (0, O.jsx)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        pointerEvents: `none`,
                                        zIndex: 2,
                                        borderRadius: 8,
                                        background: e.ship.vision >= 4 ? `radial-gradient(circle at 50% 50%, transparent 55%, rgba(8,15,24,0.35) 78%, rgba(8,15,24,0.7) 100%)` : `radial-gradient(circle at 50% 65%, transparent 28%, rgba(8,15,24,0.45) 55%, rgba(8,15,24,0.85) 78%)`
                                    }
                                }),
                                M[e.currentZone ?? 1] && (0, O.jsx)(`div`, {
                                    "aria-hidden": !0,
                                    style: {
                                        position: `absolute`,
                                        inset: -6,
                                        zIndex: 0,
                                        borderRadius: 14,
                                        overflow: `hidden`,
                                        backgroundImage: `url(${M[e.currentZone ?? 1]})`,
                                        backgroundSize: `cover`,
                                        backgroundPosition: `center`,
                                        opacity: .14,
                                        filter: `saturate(0.55) brightness(0.45)`,
                                        pointerEvents: `none`
                                    }
                                }),
                                (0, O.jsx)(`div`, {
                                    style: {
                                        position: `relative`,
                                        zIndex: 1,
                                        display: `grid`,
                                        gridTemplateColumns: `repeat(${c},1fr)`,
                                        gap: 2,
                                        padding: 2,
                                        borderRadius: 8,
                                        background: z(e.currentZone ?? 1),
                                        boxShadow: `inset 0 0 24px rgba(0,8,14,0.55)`,
                                        transform: `translate(${n.x}px, ${n.y}px)`,
                                        transition: n.instant ? `none` : `transform 420ms cubic-bezier(0.22, 1, 0.36, 1)`,
                                        willChange: `transform`
                                    },
                                    children: Array.from({
                                        length: c
                                    }, (t, n)=>n - e.ship.vision).flatMap((t)=>Array.from({
                                            length: c
                                        }, (t, n)=>n - e.ship.vision).map((n)=>{
                                            let a = e.ship.x + n, o = e.ship.y + t, s = (()=>{
                                                let t = new Set;
                                                if (!e.hunter?.active) return t;
                                                let n = e.hunter.x, r = e.hunter.y, i = e.ship.x, a = e.ship.y;
                                                if (e.hunter.mode === `searching`) [
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
                                                ].forEach(([e, i])=>t.add(`${n + e}-${r + i}`));
                                                else {
                                                    let e = Math.abs(i - n), o = Math.abs(a - r);
                                                    e >= o && t.add(`${n + (i > n ? 1 : -1)}-${r}`), o >= e && t.add(`${n}-${r + (a > r ? 1 : -1)}`), e === o && (t.add(`${n + (i > n ? 1 : -1)}-${r}`), t.add(`${n}-${r + (a > r ? 1 : -1)}`));
                                                }
                                                return t;
                                            })(), c = (e.relics ?? []).includes(`kraken_eye`) || e.shipType === `specter`, u = !!(e.hunter?.active && Math.abs(e.hunter.x - e.ship.x) <= e.ship.vision && Math.abs(e.hunter.y - e.ship.y) <= e.ship.vision) && (c || e.hunter?.mode !== `tracking`) && s.has(`${a}-${o}`) && !(a === e.hunter.x && o === e.hunter.y), d = a >= 0 && a < 12 && o >= 0 && o < 12 ? e.grid[o][a] : {
                                                type: `sea`,
                                                revealed: !1,
                                                visited: !1,
                                                value: 0,
                                                stormed: !1
                                            }, f = e.ship.x + n, p = e.ship.y + t, m = e.hunter?.active && e.hunter.x === f && e.hunter.y === p, h = e.hunter?.active ? it(e) : 99, g = n === 0 && t === 0, _ = d.revealed || d.visited, ee = d.stormed, te = e.stormDistance <= 0 ? -1 : e.grid.length + 2 - Math.floor((10 - e.stormDistance) / 3), v = ee && o === te, ne = e.currentZone ?? 1, y = g || _ && !m, re = m ? e.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : y ? `transparent` : dt[ne] ?? dt[1], b = l < 56, x = Math.round(l * (b ? 1.02 : .96)), S = !g && !m && _ && d.type !== `sea` ? nt[d.type] ?? null : null, ie = b ? 2 : 1.5, ae = b ? 1.38 : 1.22, C = b ? 1.32 : 1.2, w = b ? 5 : 3;
                                            return (0, O.jsxs)(i.div, {
                                                className: v ? `storm-front` : void 0,
                                                initial: _ ? {
                                                    opacity: 0,
                                                    scale: .8
                                                } : !1,
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                style: {
                                                    width: l,
                                                    height: l,
                                                    background: y ? z(ne) : re,
                                                    border: g ? h <= 1 ? `2px solid #ee4466` : `1px solid rgba(120,190,200,0.45)` : m ? `2px solid ${e.hunter?.mode === `frenzy` ? `#ff4466` : e.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : ee ? `1px solid #cc222244` : S ? `${ie}px solid ${S}${b ? `cc` : `99`}` : y ? `1px solid rgba(255,255,255,0.10)` : `1px solid rgba(255,255,255,0.04)`,
                                                    borderRadius: 5,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    justifyContent: `center`,
                                                    fontSize: g ? 26 : 20,
                                                    boxShadow: m ? `0 0 ${h <= 2 ? 22 : 14}px ${e.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : g ? h <= 1 ? `0 0 18px rgba(238,68,102,0.5)` : `0 0 10px rgba(20,60,80,0.35)` : S ? `0 0 ${b ? 12 : 8}px ${S}${b ? `66` : `44`}, inset 0 0 ${b ? 14 : 10}px ${S}${b ? `28` : `18`}` : `none`,
                                                    position: `relative`,
                                                    cursor: `default`,
                                                    overflow: `hidden`
                                                },
                                                children: [
                                                    y && (0, O.jsx)(et, {
                                                        zone: ne,
                                                        x: f,
                                                        y: p,
                                                        cellSize: l,
                                                        quiet: g
                                                    }),
                                                    g && (0, O.jsxs)(O.Fragment, {
                                                        children: [
                                                            (0, O.jsx)(`div`, {
                                                                style: {
                                                                    position: `relative`,
                                                                    zIndex: 1,
                                                                    lineHeight: 0
                                                                },
                                                                children: (0, O.jsx)(L, {
                                                                    shipId: e.shipType ?? `default`,
                                                                    size: Math.round(l * (b ? .98 : .92)),
                                                                    lurchX: r.x,
                                                                    lurchY: r.y
                                                                })
                                                            }),
                                                            (0, O.jsxs)(`div`, {
                                                                style: {
                                                                    position: `absolute`,
                                                                    bottom: 3,
                                                                    left: `5%`,
                                                                    width: `90%`,
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 3,
                                                                    zIndex: 1
                                                                },
                                                                children: [
                                                                    (0, O.jsx)(`div`, {
                                                                        style: {
                                                                            flex: 1,
                                                                            height: 3,
                                                                            background: `rgba(0,0,0,0.5)`,
                                                                            borderRadius: 2
                                                                        },
                                                                        children: (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                width: `${e.ship.hull / e.ship.maxHull * 100}%`,
                                                                                height: `100%`,
                                                                                borderRadius: 2,
                                                                                background: e.ship.hull <= 5 ? `#ee4444` : e.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                                transition: `width 0.3s`
                                                                            }
                                                                        })
                                                                    }),
                                                                    (0, O.jsx)(`div`, {
                                                                        style: {
                                                                            fontSize: Math.max(7, l * .16),
                                                                            color: e.ship.hull <= 5 ? `#ee4444` : e.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                            fontFamily: `'Cinzel', serif`,
                                                                            fontWeight: 700,
                                                                            textShadow: `0 1px 3px rgba(0,0,0,0.9)`,
                                                                            lineHeight: 1,
                                                                            flexShrink: 0
                                                                        },
                                                                        children: e.ship.hull
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    !m && !g && !_ && d.type === `portal` && (0, O.jsx)(i.div, {
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
                                                            zIndex: 1,
                                                            display: `flex`,
                                                            alignItems: `center`,
                                                            justifyContent: `center`,
                                                            background: `radial-gradient(circle, #aa77ff 0%, #6644cc55 45%, transparent 75%)`,
                                                            borderRadius: 4,
                                                            boxShadow: `0 0 12px #8866ff`
                                                        },
                                                        children: (0, O.jsx)(`img`, {
                                                            src: `/icons/portal.png?v=9`,
                                                            alt: ``,
                                                            style: {
                                                                width: x,
                                                                height: x,
                                                                objectFit: `contain`,
                                                                filter: `drop-shadow(0 0 8px #aa77ff)`
                                                            }
                                                        })
                                                    }),
                                                    !m && !g && _ && d.type !== `sea` && (0, O.jsxs)(O.Fragment, {
                                                        children: [
                                                            S && !d.visited && (0, O.jsx)(`div`, {
                                                                "aria-hidden": !0,
                                                                style: {
                                                                    position: `absolute`,
                                                                    inset: b ? `8%` : `14%`,
                                                                    borderRadius: `50%`,
                                                                    background: `radial-gradient(circle, ${S}${b ? `55` : `38`} 0%, ${S}00 70%)`,
                                                                    pointerEvents: `none`,
                                                                    zIndex: 0
                                                                }
                                                            }),
                                                            (0, O.jsx)(`img`, {
                                                                src: `/icons/${d.type}.png?v=9`,
                                                                alt: ``,
                                                                style: {
                                                                    width: x,
                                                                    height: x,
                                                                    opacity: d.visited ? .45 : 1,
                                                                    objectFit: `contain`,
                                                                    position: `relative`,
                                                                    zIndex: 1,
                                                                    filter: d.visited ? `brightness(1.05) contrast(1.1)` : `brightness(${ae}) contrast(${C}) drop-shadow(0 0 ${w}px ${S ?? `#88aacc`}${b ? `cc` : `88`})`
                                                                }
                                                            })
                                                        ]
                                                    }),
                                                    m && !g && (0, O.jsxs)(i.div, {
                                                        animate: {
                                                            scale: [
                                                                1,
                                                                e.hunter?.mode === `frenzy` ? 1.28 : 1.18,
                                                                1
                                                            ],
                                                            opacity: [
                                                                .85,
                                                                1,
                                                                .85
                                                            ]
                                                        },
                                                        transition: {
                                                            repeat: 1 / 0,
                                                            duration: e.hunter?.mode === `frenzy` ? .9 : 1.5
                                                        },
                                                        style: {
                                                            filter: `drop-shadow(0 0 ${h <= 2 ? 16 : 10}px ${e.hunter?.mode === `frenzy` ? `#ff4466` : `#cc44ee`})`,
                                                            position: `relative`,
                                                            zIndex: 1
                                                        },
                                                        children: [
                                                            (0, O.jsx)(`img`, {
                                                                src: `/icons/hunter.png?v=9`,
                                                                style: {
                                                                    width: x,
                                                                    height: x,
                                                                    objectFit: `contain`
                                                                }
                                                            }),
                                                            (0, O.jsxs)(`div`, {
                                                                style: {
                                                                    position: `absolute`,
                                                                    left: `50%`,
                                                                    bottom: -2,
                                                                    transform: `translateX(-50%)`,
                                                                    fontSize: Math.max(7, l * .14),
                                                                    lineHeight: 1.1,
                                                                    whiteSpace: `nowrap`,
                                                                    padding: `1px 4px`,
                                                                    borderRadius: 4,
                                                                    background: e.hunter?.mode === `frenzy` ? `rgba(180,20,40,0.92)` : `rgba(60,10,80,0.88)`,
                                                                    color: e.hunter?.mode === `frenzy` ? `#ffccdd` : `#e8c8ff`,
                                                                    fontFamily: `'Cinzel', serif`,
                                                                    fontWeight: 700,
                                                                    letterSpacing: .5,
                                                                    border: `1px solid ${e.hunter?.mode === `frenzy` ? `rgba(255,100,120,0.7)` : `rgba(200,100,255,0.5)`}`,
                                                                    textShadow: `0 1px 2px rgba(0,0,0,0.9)`,
                                                                    pointerEvents: `none`
                                                                },
                                                                children: [
                                                                    st(e.hunter.mode),
                                                                    ` `,
                                                                    h <= 1 ? `HIT` : h
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    u && !g && !m && (0, O.jsx)(i.div, {
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
                                                            pointerEvents: `none`,
                                                            zIndex: 1
                                                        }
                                                    }),
                                                    !m && !g && !_ && d.type !== `portal` && (0, O.jsx)(`span`, {
                                                        style: {
                                                            fontSize: 21,
                                                            color: `rgba(255,255,255,0.08)`,
                                                            fontWeight: 700,
                                                            position: `relative`,
                                                            zIndex: 1
                                                        },
                                                        children: `?`
                                                    })
                                                ]
                                            }, `${a}-${o}`);
                                        }))
                                })
                            ]
                        })
                    ]
                }),
                !t && u,
                e.dangerStreak > 0 && (0, O.jsxs)(i.div, {
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
                        letterSpacing: 2,
                        flexShrink: 0,
                        marginTop: 6
                    },
                    children: [
                        e.scoreMultiplier > 1 && (0, O.jsxs)(`div`, {
                            style: {
                                fontSize: t ? 17 : e.scoreMultiplier >= 3 ? 28 : 22,
                                fontWeight: 700,
                                color: e.scoreMultiplier >= 3 ? `#ee4444` : `#eedd44`,
                                letterSpacing: t ? 2 : 3,
                                textShadow: t ? `none` : e.scoreMultiplier >= 3 ? `0 0 30px #ee4444, 0 0 60px #ee444466` : `0 0 20px #eedd44, 0 0 40px #eedd4466`,
                                filter: e.scoreMultiplier >= 3 ? `brightness(1.3)` : `brightness(1.1)`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                gap: 6
                            },
                            children: [
                                e.scoreMultiplier >= 3 ? (0, O.jsxs)(`span`, {
                                    style: {
                                        display: `inline-flex`,
                                        alignItems: `center`,
                                        gap: 2
                                    },
                                    children: [
                                        (0, O.jsx)(y, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, O.jsx)(y, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, O.jsx)(y, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        })
                                    ]
                                }) : (0, O.jsx)(y, {
                                    name: `fire`,
                                    size: t ? 16 : 20
                                }),
                                (0, O.jsxs)(`span`, {
                                    children: [
                                        `×`,
                                        e.scoreMultiplier,
                                        ` COMBO`
                                    ]
                                })
                            ]
                        }),
                        (0, O.jsxs)(`div`, {
                            style: {
                                display: t ? `none` : `block`,
                                fontSize: 12,
                                color: `rgba(255,255,255,0.4)`,
                                fontFamily: `'Cinzel', serif`,
                                letterSpacing: 2,
                                marginTop: 2
                            },
                            children: [
                                `STREAK `,
                                e.dangerStreak,
                                e.dangerStreak >= 3 && (0, O.jsx)(`span`, {
                                    style: {
                                        color: `#ee8844`,
                                        marginLeft: 10
                                    },
                                    children: `HUNTER ALERT`
                                }),
                                e.dangerStreak >= 4 && (0, O.jsx)(`span`, {
                                    style: {
                                        color: `#ee4444`,
                                        marginLeft: 10
                                    },
                                    children: `STORM SURGE`
                                })
                            ]
                        })
                    ]
                }, e.dangerStreak),
                e.ship.upgrades.includes(`hunter`) && (0, O.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        marginBottom: 8,
                        flexShrink: 0
                    },
                    children: [
                        (0, O.jsx)(`div`, {
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
                        (0, O.jsx)(`div`, {
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
                            }, (t, n)=>Array.from({
                                    length: 12
                                }, (t, r)=>{
                                    let i = e.grid[n][r], a = r === e.ship.x && n === e.ship.y, o = e.hunter?.active && r === e.hunter.x && n === e.hunter.y, s = i.revealed && !i.visited && (i.type === `treasure` || i.type === `cursed_treasure`), c = i.revealed && !i.visited && i.type === `port`;
                                    return (0, O.jsx)(`div`, {
                                        style: {
                                            width: 8,
                                            height: 8,
                                            background: a ? `#4a8acc` : o ? `#ee4444` : s ? `#eedd44` : c ? `#44cccc` : i.revealed ? `rgba(255,255,255,0.08)` : `rgba(0,0,0,0.3)`,
                                            borderRadius: o || a ? 4 : 1
                                        }
                                    }, `${r}-${n}`);
                                }))
                        })
                    ]
                }),
                (0, O.jsx)(`div`, {
                    "aria-live": `polite`,
                    "aria-atomic": `true`,
                    style: {
                        marginTop: 8,
                        textAlign: `center`,
                        maxWidth: 420,
                        paddingRight: t ? 80 : 0,
                        marginBottom: 0,
                        flexShrink: 0
                    },
                    children: (()=>{
                        let n = (e.log ?? ``).split(`. `).map((e)=>e.trim()).filter(Boolean), r = n[0] ? n[0].replace(/\.+$/, ``) : ``, i = n.slice(1).join(`. `);
                        return (0, O.jsxs)(O.Fragment, {
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: t ? 16 : 17,
                                        color: `rgba(255,255,255,0.95)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        lineHeight: 1.35
                                    },
                                    children: [
                                        r,
                                        r ? `.` : ``
                                    ]
                                }),
                                i && (0, O.jsxs)(`div`, {
                                    style: {
                                        marginTop: 4,
                                        fontSize: 13,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        lineHeight: 1.35
                                    },
                                    children: [
                                        i,
                                        i.endsWith(`.`) ? `` : `.`
                                    ]
                                })
                            ]
                        });
                    })()
                }),
                e.portalHint && (0, O.jsxs)(`div`, {
                    style: {
                        marginTop: 6,
                        fontSize: 13,
                        color: `#8866ff`,
                        fontFamily: `'IM Fell English', cursive`,
                        textAlign: `center`,
                        fontStyle: `italic`,
                        animation: `pulse 2s infinite`,
                        flexShrink: 0,
                        paddingBottom: 4,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        gap: 6
                    },
                    children: [
                        (0, O.jsx)(y, {
                            name: `vortex`,
                            size: 14
                        }),
                        ` `,
                        e.portalHint,
                        ` `,
                        (0, O.jsx)(y, {
                            name: `vortex`,
                            size: 14
                        })
                    ]
                }),
                (e.relics ?? []).length > 0 && !t && (0, O.jsx)(`div`, {
                    style: {
                        marginTop: 8,
                        display: `flex`,
                        gap: 6,
                        justifyContent: `center`,
                        flexWrap: `wrap`,
                        flexShrink: 0
                    },
                    children: (e.relics ?? []).map((e)=>{
                        let t = h(e);
                        return t ? (0, O.jsxs)(`div`, {
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
                                (0, O.jsx)(`img`, {
                                    src: v(t.id),
                                    alt: ``,
                                    style: {
                                        width: 18,
                                        height: 18,
                                        borderRadius: 4,
                                        objectFit: `cover`
                                    }
                                }),
                                (0, O.jsx)(`span`, {
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
                t && u,
                t && (0, O.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        flexShrink: 0,
                        height: `calc(112px + env(safe-area-inset-bottom))`
                    }
                })
            ]
        });
    }
    var pt = `/icons/gold.png`, mt = (e, t = 14)=>(0, O.jsx)(y, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    ht = function({ walletAddress: e, account: t, username: r, onHome: m, onPlayDaily: ee, dailySeed: re, isDaily: b, seedToken: w, shipId: T, resumeState: ye, resumeRunId: be, resumeActions: Ce }) {
        let { connect: we, connecting: Te } = a(), [k, A] = (0, E.useState)(()=>ye ?? l(re, T ?? `default`)), j = (0, E.useRef)(!e), [ke, Ae] = (0, E.useState)(()=>!u()), [P, je] = (0, E.useState)(null), [Me, F] = (0, E.useState)(!1), [Ie, ze] = (0, E.useState)([]), [Ge, Ke] = (0, E.useState)([]), [qe, Je] = (0, E.useState)([]), I = (0, E.useRef)(0), [L, Xe] = (0, E.useState)(null), Ze = (0, E.useRef)((k.relics ?? []).length), [Qe, R] = (0, E.useState)(!1), [$e, et] = (0, E.useState)(!1), z = (0, E.useRef)(!1), [B, nt] = (0, E.useState)([]), [V, st] = (0, E.useState)(null), [ut, dt] = (0, E.useState)(0), [ht, gt] = (0, E.useState)(()=>S()), [_t, vt] = (0, E.useState)(!1), [yt, bt] = (0, E.useState)(!1), [H, xt] = (0, E.useState)(window.innerWidth < 768), U = b === !0, St = (0, E.useRef)(w), [Ct, wt] = (0, E.useState)(!1), [Tt, Et] = (0, E.useState)(!1);
        (0, E.useEffect)(()=>{
            if (k.gameOver) {
                je(null);
                return;
            }
            k.turn > 0 && xe(`sail`), je(Se(k));
        }, [
            k.turn,
            k.event,
            k.showPort,
            k.hunter?.active,
            k.stormDistance,
            k.gameOver
        ]);
        let Dt = ()=>{
            P && (xe(P.id), je(null));
        };
        (0, E.useEffect)(()=>{
            U && (o(), e && le());
        }, []), (0, E.useEffect)(()=>{
            if (!e) {
                Ae(!u());
                return;
            }
            he(e, le()).then((e)=>Ae(!(e || u())));
        }, [
            e
        ]);
        let W = (0, E.useRef)(be ?? crypto.randomUUID()), G = (0, E.useRef)(Ce ? [
            ...Ce
        ] : []), K = (e)=>{
            G.current.push(e);
        }, q = (0, E.useRef)([]);
        (0, E.useEffect)(()=>{
            let t = e;
            !t || k.gameOver || G.current.length !== 0 && ne({
                run_id: W.current,
                wallet_address: t,
                seed: k.seed,
                ship_id: T ?? `default`,
                is_daily: U,
                actions: G.current,
                turn: k.turn,
                score: k.score,
                saved_at: Date.now()
            });
        }, [
            k
        ]), (0, E.useEffect)(()=>{
            let e = G.current.length - 1;
            e < 0 || (q.current[e * 3] = k.score, q.current[e * 3 + 1] = k.ship.hull, q.current[e * 3 + 2] = k.rngState ?? -1);
        }, [
            k
        ]);
        let Ot = (0, E.useRef)(0);
        (0, E.useEffect)(()=>{
            e && (be || de({
                run_id: W.current,
                wallet_address: e,
                username: r ?? null,
                seed: k.seed,
                is_daily: U,
                seed_token: w ?? null
            }));
        }, []), (0, E.useEffect)(()=>{
            !e || k.gameOver || k.turn - Ot.current < 3 || (Ot.current = k.turn, me(W.current, {
                score: k.score,
                turn: k.turn,
                zone: k.currentZone ?? 1,
                gold: k.ship.gold,
                hull: k.ship.hull
            }));
        }, [
            k.turn
        ]), (0, E.useEffect)(()=>{
            if (!(!e || !k.gameOver) && !z.current) {
                if (z.current = !0, ge(W.current, {
                    score: k.score,
                    turn: k.turn,
                    zone: k.currentZone ?? 1,
                    gold: k.ship.gold,
                    hull: k.ship.hull,
                    run_title: k.runTitle
                }), !U && !St.current) {
                    console.warn(`[approve] skip : seed local, run non soumise`), ce();
                    return;
                }
                ve({
                    run_id: W.current,
                    wallet_address: e,
                    seed: k.seed,
                    ship_id: T ?? `default`,
                    is_daily: U,
                    actions: G.current,
                    checks: G.current.flatMap((e, t)=>[
                            q.current[t * 3] ?? -1,
                            q.current[t * 3 + 1] ?? -1,
                            q.current[t * 3 + 2] ?? -1
                        ]),
                    final_score: k.score,
                    final_turn: k.turn
                }).then(()=>_e(W.current)).then((e)=>{
                    e?.approved ? (R(!0), e.nft?.minted?.length && nt(e.nft.minted.map((e)=>typeof e == `string` ? e : e.nft))) : console.warn(`[approve] refuse :`, e?.raison ?? e);
                }).catch((e)=>{
                    console.warn(`[approve]`, e), ue(`approve`, {
                        run_id: W.current
                    });
                }), ce();
            }
        }, [
            k.gameOver
        ]), (0, E.useEffect)(()=>{
            let e = ()=>xt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [J, Y] = (0, E.useState)(null), [kt, At] = (0, E.useState)(!1), jt = (0, E.useRef)(null), Mt = (0, E.useRef)(new Set), [Nt, Pt] = (0, E.useState)(null);
        (0, E.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !k.gameOver || !U || !e || !n || Qe && fe().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && Pt({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            k.gameOver,
            Qe
        ]);
        let Ft = (0, E.useRef)({
            x: k.ship.x,
            y: k.ship.y
        }), [It, Lt] = (0, E.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [Rt, zt] = (0, E.useState)({
            x: 0,
            y: 0
        });
        (0, E.useEffect)(()=>{
            let e = Ft.current, t = k.ship.x - e.x, n = k.ship.y - e.y;
            if (Ft.current = {
                x: k.ship.x,
                y: k.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = rt(k.ship.vision, H), i = .8;
            Lt({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), zt({
                x: t,
                y: n
            });
            let a = setTimeout(()=>zt({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>Lt({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(o), clearTimeout(a);
            };
        }, [
            k.ship.x,
            k.ship.y,
            H,
            k.ship.vision
        ]);
        let [Bt, X] = (0, E.useState)(!1), [Z, Vt] = (0, E.useState)(null), [Ht, Ut] = (0, E.useState)(null), [Wt, Gt] = (0, E.useState)(0), Kt = ()=>{
            F(!0), setTimeout(()=>F(!1), 400);
        }, qt = (e)=>{
            Ut(e), setTimeout(()=>Ut(null), 150);
        }, Q = k, Jt = Math.min(100, (1 - Q.stormDistance / 10) * 100), Yt = Q.ship.hull <= 5 ? `#ee4444` : Q.ship.hull <= 10 ? `#ee8844` : `#44cc88`, Xt = !Q.escapeUsed && Q.ship.upgrades.includes(`escape`) && Q.event && Q.event.choices[0].risk !== `safe`;
        (0, E.useEffect)(()=>{
            if (k.gameOver) return;
            let e = k.event?.cellType;
            e && (!De[e] && !N[e] || Mt.current.has(e) || Y(e));
        }, [
            k.event?.cellType,
            k.gameOver
        ]), (0, E.useEffect)(()=>{
            if (!J || J === `death`) return;
            let e = H ? 2200 : {
                ancient_kraken: 6500
            }[J] ?? 5e3, t = setTimeout(()=>{
                Mt.current.add(J), Y(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            J,
            H
        ]);
        let Zt = (0, E.useRef)(1);
        (0, E.useEffect)(()=>{
            let e = k.currentZone ?? 1;
            if (e > Zt.current) {
                let t = Zt.current, n = p[e], r = p[t]?.transitionText ?? [];
                st({
                    lines: r.length > 0 ? [
                        ...r,
                        ``,
                        `You have entered:`,
                        n.name.toUpperCase()
                    ] : [
                        `You have entered:`,
                        n.name.toUpperCase()
                    ],
                    zone: e
                }), dt(0), Zt.current = e;
            }
        }, [
            k.currentZone
        ]), (0, E.useEffect)(()=>{
            if (!V) return;
            if (ut >= V.lines.length) {
                setTimeout(()=>st(null), 1e3);
                return;
            }
            let e = setTimeout(()=>dt((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            V,
            ut
        ]), (0, E.useEffect)(()=>{
            k.dangerStreak > I.current && (I.current = k.dangerStreak);
        }, [
            k.dangerStreak
        ]), (0, E.useEffect)(()=>{
            if (k.gameOver) {
                let e = s(k);
                e.length > 0 && (Ke(e), D(`streak`));
                let t = oe({
                    score: k.score,
                    turn: k.turn,
                    zone: k.currentZone ?? 1,
                    gold: k.ship.gold,
                    hunterAttacksSurvived: k.hunterAttacksSurvived ?? 0,
                    peakStreak: I.current,
                    hadStreak5: (k.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if (Je(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (gt(t.pb), vt(!0)), ce(), H) X(!1), Y(`death`), jt.current = setTimeout(()=>{
                    At((e)=>e || !0), Y(null);
                }, 2200);
                else {
                    let e = Qt.current ? 8e3 : 0;
                    setTimeout(()=>{
                        X(!1), Y(`death`), jt.current = setTimeout(()=>{
                            At((e)=>e || !0), Y(null);
                        }, 9e3);
                    }, e);
                }
            } else jt.current &&= (clearTimeout(jt.current), null), At(!1), Y(null), Mt.current.clear(), I.current = 0, Je([]), vt(!1);
        }, [
            k.gameOver
        ]);
        let Qt = (0, E.useRef)(!1), $t = (0, E.useRef)(-99), en = (0, E.useRef)(null);
        (0, E.useEffect)(()=>{
            k.log?.includes(`Tentacles rake the hull`) && (k.turn - $t.current < 3 || ($t.current = k.turn, en.current && clearTimeout(en.current), Qt.current = !0, X(!0), en.current = setTimeout(()=>{
                Qt.current = !1, X(!1);
            }, H ? 2e3 : 7200)));
        }, [
            k.log,
            k.turn,
            H
        ]), (0, E.useEffect)(()=>{
            if (!Bt) return;
            let e = ()=>{
                Qt.current = !1, X(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            Bt
        ]), (0, E.useEffect)(()=>{
            if (k.log?.includes(`⚡ Storm surge`) && qt(`rgba(100,150,255,0.35)`), k.event?.cellType === `ancient_kraken` ? qt(`rgba(200,160,48,0.4)`) : k.event?.cellType === `kraken` && qt(`rgba(150,0,255,0.3)`), k.hunter?.active) {
                let e = lt(k);
                Gt(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else Gt(0);
        }, [
            k
        ]), (0, E.useEffect)(()=>{
            let e = (e)=>{
                if (k.gameOver || k.event || k.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && tn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && tn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && tn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            k.gameOver,
            k.event,
            k.showPort,
            k.turn
        ]);
        let tn = (e, t)=>{
            K(e === -1 ? 0 : e === 1 ? 2 : 1), A((n)=>ie(n, e, t));
        }, nn = (e)=>{
            K(10 + e), A((t)=>{
                let n = te(t, e);
                return n.ship.hull < t.ship.hull && Kt(), n;
            });
        }, rn = ()=>{
            K(20), A((e)=>d(e));
        }, an = (e)=>{
            K(e === `hull` ? 30 : e === `weapon` ? 31 : 32), A((t)=>f(t, e));
        }, on = async ()=>{
            if (e) {
                Et(!0), wt(!1);
                let t = await pe(e);
                if (Et(!1), !t) {
                    wt(!0);
                    return;
                }
                St.current = t.seed_token;
                let n = l(t.seed, T ?? `default`);
                G.current = [], q.current = [], Ot.current = 0, W.current = crypto.randomUUID(), z.current = !1, R(!1), et(!1), nt([]), de({
                    run_id: W.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), A(n);
                return;
            }
            let t = l(void 0, T ?? `default`);
            G.current = [], q.current = [], Ot.current = 0, W.current = crypto.randomUUID(), z.current = !1, R(!1), et(!1), nt([]), A(t);
        }, sn = (0, E.useRef)(null), [$, cn] = (0, E.useState)(!1);
        (0, E.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = $, n.play().catch(()=>{}), sn.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), sn.current && (sn.current.pause(), sn.current.currentTime = 0);
            };
        }, []), (0, E.useEffect)(()=>{
            sn.current && (sn.current.muted = $), Ee($);
        }, [
            $
        ]);
        let ln = (0, E.useRef)({
            gold: k.ship.gold,
            hull: k.ship.hull,
            zone: k.currentZone ?? 1,
            over: k.gameOver,
            mult: k.scoreMultiplier ?? 1,
            hmode: k.hunter?.mode ?? ``,
            storm: k.stormDistance
        });
        return (0, E.useEffect)(()=>{
            let e = ln.current, t = !!k.log?.includes(`Tentacles rake`);
            if (k.gameOver && !e.over) D(`death`);
            else if (!k.gameOver) {
                k.ship.gold > e.gold && D(`gold`), k.ship.gold < e.gold && k.showPort && D(`buy`), t ? D(`hunter_attack`) : k.ship.hull < e.hull && D(`damage`), (k.currentZone ?? 1) !== e.zone && D(`zone`), (k.scoreMultiplier ?? 1) > e.mult && D(`streak`);
                let n = k.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && D(`hunter_near`), k.stormDistance < e.storm && k.stormDistance <= 4 && k.stormDistance > 0 && (D(`thunder`), Kt());
            }
            ln.current = {
                gold: k.ship.gold,
                hull: k.ship.hull,
                zone: k.currentZone ?? 1,
                over: k.gameOver,
                mult: k.scoreMultiplier ?? 1,
                hmode: k.hunter?.mode ?? ``,
                storm: k.stormDistance
            };
            let n = (k.relics ?? []).length;
            if (n > Ze.current) {
                let e = (k.relics ?? [])[n - 1], t = h(e);
                t && (Xe(t), D(`streak`));
            }
            Ze.current = n;
        }, [
            k
        ]), (0, O.jsxs)(i.div, {
            animate: Me ? {
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
                boxShadow: Q.stormDistance <= 2 ? `inset 0 0 80px rgba(220,30,30,0.6)` : Q.stormDistance <= 4 ? `inset 0 0 50px rgba(220,100,30,0.3)` : `none`,
                color: `#e8e0d0`,
                fontFamily: `'Pirata One', cursive`,
                display: `flex`,
                flexDirection: `column`,
                overflow: `hidden`,
                position: `relative`
            },
            children: [
                (0, O.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, O.jsx)(i.div, {
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
                                backgroundImage: `url(${M[Q.currentZone ?? 1] ?? M[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Q.currentZone ?? 1),
                        (0, O.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        }),
                        (0, O.jsx)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            transition: {
                                duration: 1.2
                            },
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: (Q.currentZone ?? 1) === 3 ? `radial-gradient(ellipse at 50% 42%, transparent 18%, rgba(50,8,70,0.35) 55%, rgba(0,0,0,0.72) 100%)` : (Q.currentZone ?? 1) === 2 ? `radial-gradient(ellipse at 50% 42%, transparent 20%, rgba(55,25,95,0.32) 58%, rgba(4,6,18,0.7) 100%)` : `radial-gradient(ellipse at 50% 42%, transparent 22%, rgba(15,55,85,0.28) 60%, rgba(4,10,18,0.65) 100%)`
                            }
                        }, `vig-${Q.currentZone ?? 1}`)
                    ]
                }),
                Ht && (0, O.jsx)(i.div, {
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
                        background: Ht,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                Wt > 0 && (0, O.jsx)(i.div, {
                    animate: {
                        opacity: [
                            Wt,
                            Wt * .6,
                            Wt
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
                Q.ship.hull <= 5 && !Q.gameOver && (0, O.jsx)(i.div, {
                    animate: {
                        opacity: [
                            .4,
                            0,
                            .4
                        ]
                    },
                    transition: {
                        repeat: 1 / 0,
                        duration: Q.ship.hull <= 1 ? .4 : Q.ship.hull <= 3 ? .6 : 1
                    },
                    style: {
                        position: `fixed`,
                        inset: 0,
                        background: `radial-gradient(ellipse at center, transparent 50%, rgba(220,30,30,0.5) 100%)`,
                        zIndex: 97,
                        pointerEvents: `none`
                    }
                }),
                (0, O.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        padding: H ? `5px 8px` : `8px 18px`,
                        background: `linear-gradient(180deg, rgba(6,12,20,0.78) 0%, rgba(6,12,20,0.42) 100%)`,
                        borderBottom: `1px solid rgba(255,255,255,0.05)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5,
                        backdropFilter: `blur(6px)`
                    },
                    children: [
                        (0, O.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: H ? 6 : 8
                            },
                            children: [
                                (0, O.jsx)(`img`, {
                                    src: se,
                                    style: {
                                        width: H ? 24 : 36,
                                        height: H ? 24 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !H && (0, O.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                (()=>{
                                    let e = C.find((e)=>e.id === (Q.shipType ?? `default`)) ?? C[0], t = p[Q.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, O.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: H ? 0 : 2,
                                            padding: H ? `2px 6px 2px 2px` : `2px 8px 2px 2px`,
                                            borderRadius: 7,
                                            border: `1px solid rgba(200,160,48,0.28)`,
                                            background: `rgba(200,160,48,0.07)`,
                                            fontSize: H ? 9 : 10,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: H ? 110 : 200,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, O.jsx)(`img`, {
                                                src: x(e.id),
                                                alt: ``,
                                                style: {
                                                    width: H ? 20 : 24,
                                                    height: H ? 20 : 24,
                                                    borderRadius: 4,
                                                    objectFit: `cover`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, O.jsxs)(`span`, {
                                                style: {
                                                    display: `flex`,
                                                    flexDirection: `column`,
                                                    lineHeight: 1.15,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    (0, O.jsx)(`span`, {
                                                        children: H ? e.name.replace(/^The /, ``) : e.name
                                                    }),
                                                    !H && (0, O.jsx)(`span`, {
                                                        style: {
                                                            fontSize: 8,
                                                            letterSpacing: 1.5,
                                                            color: `rgba(170,120,255,0.75)`,
                                                            fontWeight: 500
                                                        },
                                                        children: t.toUpperCase()
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            ]
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: H ? 8 : 16,
                                alignItems: `flex-end`
                            },
                            children: (H ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Q.ship.hull}/${Q.ship.maxHull}`,
                                    color: Yt
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: Q.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: Q.ship.power,
                                    color: `#ee8844`
                                }
                            ] : [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Q.ship.hull}/${Q.ship.maxHull}`,
                                    color: Yt
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: Q.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `vision`,
                                    label: `VISION`,
                                    val: (Q.visionBlind ?? 0) > 0 ? `${Q.ship.vision}~` : Q.ship.vision,
                                    color: (Q.visionBlind ?? 0) > 0 ? `#88aacc` : `#6aaccc`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: Q.ship.power,
                                    color: `#ee8844`
                                },
                                {
                                    icon: `turn`,
                                    label: `TURN`,
                                    val: Q.turn,
                                    color: `rgba(255,255,255,0.45)`
                                }
                            ]).map((e)=>(0, O.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: H ? 9 : 10,
                                                color: `rgba(255,255,255,0.38)`,
                                                letterSpacing: 1.5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: e.label
                                        }),
                                        (0, O.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 3,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, O.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: pt,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: H ? 18 : 22,
                                                        height: H ? 18 : 22,
                                                        objectFit: `contain`,
                                                        opacity: .9
                                                    }
                                                }),
                                                (0, O.jsx)(`span`, {
                                                    style: {
                                                        fontSize: H ? 13 : 16,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !H && (0, O.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 12
                            },
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 4
                                    },
                                    children: [
                                        (0, O.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 28,
                                                height: 28,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, O.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Q.score
                                        }),
                                        (0, O.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(238,221,68,0.55)`,
                                                fontWeight: 500
                                            },
                                            children: `pts`
                                        })
                                    ]
                                }),
                                (0, O.jsx)(`button`, {
                                    onClick: ()=>cn((e)=>!e),
                                    "aria-label": $ ? `Unmute sound` : `Mute sound`,
                                    title: $ ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.08)`,
                                        color: `rgba(255,255,255,0.4)`,
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        borderRadius: 6,
                                        padding: `4px 8px`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: $ ? `MUTE` : `SOUND`
                                })
                            ]
                        }),
                        H && (0, O.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, O.jsxs)(`span`, {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        Q.score,
                                        `pts`
                                    ]
                                }),
                                (0, O.jsx)(`button`, {
                                    onClick: ()=>cn((e)=>!e),
                                    "aria-label": $ ? `Unmute sound` : `Mute sound`,
                                    title: $ ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `none`,
                                        color: `rgba(255,255,255,0.4)`,
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: $ ? `MUTE` : `SND`
                                })
                            ]
                        })
                    ]
                }),
                H && (Q.relics ?? []).length > 0 && (0, O.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Q.relics ?? []).map((e)=>{
                        let t = h(e);
                        return t ? (0, O.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, O.jsx)(`img`, {
                                src: v(e),
                                alt: ``,
                                style: {
                                    width: 18,
                                    height: 18,
                                    borderRadius: 4,
                                    objectFit: `cover`
                                }
                            })
                        }, e) : null;
                    })
                }),
                H && Q.hunter?.active && (()=>{
                    let e = it(Q), t = lt(Q), n = at(Q);
                    return (0, O.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, O.jsx)(y, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, O.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: Q.hunter.mode === `frenzy` ? `#ff6666` : Q.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            mt(Q.hunter.mode),
                                            ot(Q.hunter.mode)
                                        ]
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: ct(e)
                                    }),
                                    (0, O.jsxs)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: `#ff8899`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            whiteSpace: `nowrap`
                                        },
                                        children: [
                                            `~−`,
                                            n,
                                            ` hull`
                                        ]
                                    })
                                ]
                            }),
                            (0, O.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, O.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${Q.hunter.awareness}%`,
                                                background: Q.hunter.awareness >= 80 ? `#ee4444` : Q.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, O.jsxs)(`span`, {
                                        style: {
                                            fontSize: 9,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: [
                                            `AWARE `,
                                            Q.hunter.awareness,
                                            `%`
                                        ]
                                    })
                                ]
                            })
                        ]
                    });
                })(),
                (0, O.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, O.jsxs)(`div`, {
                            style: {
                                width: H ? 0 : 200,
                                padding: H ? 0 : `12px 10px`,
                                overflow: `hidden`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 8,
                                borderRight: H ? `none` : `1px solid rgba(255,255,255,0.04)`,
                                transition: `width 0.3s`,
                                background: H ? void 0 : `linear-gradient(90deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        background: Jt > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${Jt > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, O.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: Jt > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, O.jsx)(y, {
                                                    name: `storm`,
                                                    size: 13
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, O.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `baseline`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, O.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: Jt > 70 ? `#ee4444` : `#ee8844`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        lineHeight: 1
                                                    },
                                                    children: Q.stormDistance
                                                }),
                                                (0, O.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.45)`,
                                                        fontFamily: `'IM Fell English', cursive`
                                                    },
                                                    children: `turns left`
                                                })
                                            ]
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 6
                                            },
                                            children: (0, O.jsx)(i.div, {
                                                animate: {
                                                    width: `${Jt}%`
                                                },
                                                transition: {
                                                    duration: .5
                                                },
                                                style: {
                                                    height: 3,
                                                    borderRadius: 2,
                                                    background: `linear-gradient(90deg,#2a5a2a,#ee4444)`
                                                }
                                            })
                                        })
                                    ]
                                }),
                                Q.hunter?.active && (()=>{
                                    let e = it(Q), t = lt(Q), n = at(Q), r = t === `critical` || t === `danger`;
                                    return (0, O.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Q.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : Q.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 8,
                                            padding: `8px 9px`
                                        },
                                        children: [
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 10,
                                                    color: r ? `#ff8899` : `rgba(200,100,220,0.8)`,
                                                    letterSpacing: 2,
                                                    marginBottom: 4,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5,
                                                    fontFamily: `'Cinzel', serif`
                                                },
                                                children: [
                                                    (0, O.jsx)(y, {
                                                        name: `kraken`,
                                                        size: 13
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    display: `inline-block`,
                                                    padding: `1px 7px`,
                                                    borderRadius: 5,
                                                    fontSize: 10,
                                                    letterSpacing: 1.5,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 4,
                                                    background: Q.hunter.mode === `frenzy` ? `rgba(220,30,30,0.3)` : Q.hunter.mode === `stalking` ? `rgba(180,30,180,0.3)` : Q.hunter.mode === `searching` ? `rgba(30,100,180,0.3)` : `rgba(255,255,255,0.06)`,
                                                    color: Q.hunter.mode === `frenzy` ? `#ff6666` : Q.hunter.mode === `stalking` ? `#dd88ff` : Q.hunter.mode === `searching` ? `#66aaff` : `rgba(255,255,255,0.55)`,
                                                    border: `1px solid ${Q.hunter.mode === `frenzy` ? `rgba(220,30,30,0.6)` : Q.hunter.mode === `stalking` ? `rgba(180,30,180,0.5)` : `rgba(255,255,255,0.1)`}`
                                                },
                                                children: [
                                                    mt(Q.hunter.mode, 12),
                                                    ot(Q.hunter.mode)
                                                ]
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: .5,
                                                    marginBottom: 2
                                                },
                                                children: [
                                                    ct(e),
                                                    ` · ≈−`,
                                                    n
                                                ]
                                            }),
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    height: 3,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2,
                                                    marginTop: 4
                                                },
                                                children: (0, O.jsx)(i.div, {
                                                    animate: {
                                                        width: `${Q.hunter.awareness}%`
                                                    },
                                                    transition: {
                                                        duration: .5
                                                    },
                                                    style: {
                                                        height: 3,
                                                        borderRadius: 2,
                                                        background: Q.hunter.awareness >= 80 ? `#ee4444` : Q.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`
                                                    }
                                                })
                                            })
                                        ]
                                    });
                                })(),
                                (0, O.jsx)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.35)`,
                                        letterSpacing: 2,
                                        marginTop: 4,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: `EQUIPPED`
                                }),
                                Q.ship.upgrades.length === 0 ? (0, O.jsx)(`div`, {
                                    style: {
                                        fontSize: 12,
                                        color: `rgba(255,255,255,0.28)`,
                                        fontStyle: `italic`,
                                        fontFamily: `'IM Fell English', cursive`
                                    },
                                    children: `None yet`
                                }) : Q.ship.upgrades.map((e)=>{
                                    let t = Le.find((t)=>t.id === e);
                                    return (0, O.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: Re[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 5
                                        },
                                        children: [
                                            (0, O.jsx)(`img`, {
                                                src: Pe[e],
                                                style: {
                                                    width: 16,
                                                    height: 16,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            t.name
                                        ]
                                    }, e);
                                }),
                                Q.upgradeToken && (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: 11,
                                        color: `#eedd44`,
                                        marginTop: 2,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 5
                                    },
                                    children: [
                                        (0, O.jsx)(y, {
                                            name: `star`,
                                            size: 12
                                        }),
                                        ` Free upgrade at port`
                                    ]
                                }),
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        marginTop: 6
                                    },
                                    children: [
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: `rgba(255,255,255,0.28)`,
                                                letterSpacing: 2,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 6
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 6
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: Ve,
                                                    color: `#44cc88`,
                                                    sub: [
                                                        `Integrity`,
                                                        `Reinforced`,
                                                        `Ironclad`
                                                    ]
                                                },
                                                {
                                                    key: `weapon`,
                                                    label: `Weapon`,
                                                    img: Ue,
                                                    color: `#ee6644`,
                                                    sub: [
                                                        `Cannons`,
                                                        `Iron Guns`,
                                                        `Heavy Fire`
                                                    ]
                                                },
                                                {
                                                    key: `nav`,
                                                    label: `Nav`,
                                                    img: He,
                                                    color: `#6aaccc`,
                                                    sub: [
                                                        `Basic`,
                                                        `Chart`,
                                                        `Star Reader`
                                                    ]
                                                }
                                            ].map((e)=>{
                                                let t = Q.ship.levels[e.key], n = t === 2, r = e.color, a = [
                                                    `I`,
                                                    `II`,
                                                    `III`
                                                ], o = e.key === `hull` ? `${Q.ship.maxHull} HP` : e.key === `weapon` ? `P${Q.ship.power}` : `V${Q.ship.vision}`;
                                                return (0, O.jsxs)(i.div, {
                                                    animate: n ? {
                                                        filter: [
                                                            `drop-shadow(0 0 3px ${r}00)`,
                                                            `drop-shadow(0 0 6px ${r}aa)`,
                                                            `drop-shadow(0 0 3px ${r}00)`
                                                        ]
                                                    } : {},
                                                    transition: {
                                                        repeat: 1 / 0,
                                                        duration: 2
                                                    },
                                                    style: {
                                                        background: `rgba(0,0,0,0.28)`,
                                                        border: `1px solid ${r}${n ? `55` : `18`}`,
                                                        borderRadius: 7,
                                                        padding: `6px 7px`
                                                    },
                                                    children: [
                                                        (0, O.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 4
                                                            },
                                                            children: [
                                                                (0, O.jsx)(`img`, {
                                                                    src: e.img,
                                                                    alt: ``,
                                                                    style: {
                                                                        width: 16,
                                                                        height: 16,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, O.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 11,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: .5
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 8,
                                                                                color: `rgba(255,255,255,0.28)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, O.jsxs)(`div`, {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: r,
                                                                        fontFamily: `'Cinzel', serif`,
                                                                        fontWeight: 700
                                                                    },
                                                                    children: [
                                                                        o,
                                                                        n ? ` ★` : ``
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        (0, O.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, n)=>(0, O.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        n > 0 && (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                width: 6,
                                                                                height: 1,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                width: 18,
                                                                                height: 18,
                                                                                clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
                                                                                background: e <= t ? `linear-gradient(135deg, ${r}dd, ${r}66)` : `rgba(255,255,255,0.05)`,
                                                                                display: `flex`,
                                                                                alignItems: `center`,
                                                                                justifyContent: `center`,
                                                                                boxShadow: e <= t ? `0 0 5px ${r}33` : `none`
                                                                            },
                                                                            children: (0, O.jsx)(`span`, {
                                                                                style: {
                                                                                    fontSize: 7,
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
                        (0, O.jsx)(ft, {
                            state: Q,
                            isMobile: H,
                            slide: It,
                            lurch: Rt,
                            onboard: P,
                            onDismissOnboard: Dt,
                            onMove: tn
                        }),
                        (0, O.jsxs)(`div`, {
                            style: {
                                width: H ? 0 : 200,
                                minWidth: H ? 0 : 200,
                                padding: H ? 0 : `12px 10px`,
                                display: H ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                borderLeft: `1px solid rgba(255,255,255,0.04)`,
                                pointerEvents: Q.showPort ? `none` : `auto`,
                                opacity: Q.showPort ? .35 : 1,
                                overflow: `hidden`,
                                background: `linear-gradient(270deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.4)`,
                                        letterSpacing: 2,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        `UPGRADES`,
                                        !Q.showPort && (0, O.jsx)(`span`, {
                                            style: {
                                                color: `rgba(255,255,255,0.22)`,
                                                marginLeft: 6
                                            },
                                            children: `· at port`
                                        })
                                    ]
                                }),
                                (0, O.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 4,
                                        overflowY: `auto`
                                    },
                                    children: Le.map((e)=>{
                                        let t = Q.ship.upgrades.includes(e.id), n = Ie.includes(e.id), r = Q.upgradeToken && Q.showPort, i = r ? 0 : e.cost, a = !t && !n && Q.ship.gold >= i && Q.showPort, o = Re[e.build], s = t || Q.showPort;
                                        return (0, O.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Q.showPort && (n ? ze((t)=>t.filter((t)=>t !== e.id)) : a && ze((t)=>[
                                                        ...t,
                                                        e.id
                                                    ]));
                                            },
                                            title: s ? void 0 : [
                                                ...e.pros,
                                                ...e.cons
                                            ].join(` · `),
                                            style: {
                                                background: t ? `${o}14` : `rgba(0,0,0,0.2)`,
                                                border: `1px solid ${t ? o + `44` : a ? o + `22` : `rgba(255,255,255,0.04)`}`,
                                                borderRadius: 6,
                                                padding: s ? `5px 6px` : `4px 6px`,
                                                cursor: a ? `pointer` : `default`,
                                                opacity: t ? 1 : a ? .9 : .45,
                                                transition: `all 0.15s`
                                            },
                                            children: [
                                                (0, O.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`,
                                                        alignItems: `center`,
                                                        gap: 4
                                                    },
                                                    children: [
                                                        (0, O.jsxs)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                fontWeight: 600,
                                                                color: t ? o : `rgba(255,255,255,0.85)`,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 4,
                                                                minWidth: 0
                                                            },
                                                            children: [
                                                                (0, O.jsx)(`img`, {
                                                                    src: Pe[e.id],
                                                                    style: {
                                                                        width: 18,
                                                                        height: 18,
                                                                        objectFit: `contain`,
                                                                        flexShrink: 0
                                                                    }
                                                                }),
                                                                (0, O.jsx)(`span`, {
                                                                    style: {
                                                                        overflow: `hidden`,
                                                                        textOverflow: `ellipsis`,
                                                                        whiteSpace: `nowrap`
                                                                    },
                                                                    children: e.name
                                                                })
                                                            ]
                                                        }),
                                                        t ? (0, O.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, O.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, O.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#eedd44`,
                                                                flexShrink: 0
                                                            },
                                                            children: r && Q.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                s && (0, O.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, O.jsx)(Be, {
                                                        pros: e.pros,
                                                        cons: e.cons,
                                                        fontSize: 10,
                                                        opacity: .45
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
                (0, O.jsx)(n, {
                    children: J && (De[J] || N[J] || J === `death`) && (()=>{
                        let e = !H && !!De[J], t = J === `death` ? M[Q.currentZone ?? 1] ?? N.storm : N[J] ?? null;
                        return (0, O.jsxs)(i.div, {
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
                                delay: .1,
                                duration: .25
                            },
                            onClick: ()=>{
                                J === `death` && At(!0), J && Mt.current.add(J), Y(null);
                            },
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 140,
                                cursor: `pointer`,
                                background: `#05080f`
                            },
                            children: [
                                e ? (0, O.jsx)(i.video, {
                                    src: De[J],
                                    autoPlay: !0,
                                    muted: $,
                                    playsInline: !0,
                                    preload: `metadata`,
                                    onEnded: ()=>{
                                        J === `death` && At(!0), J && Mt.current.add(J), Y(null);
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
                                        delay: .2,
                                        duration: .6,
                                        ease: `easeOut`
                                    },
                                    style: {
                                        width: `100%`,
                                        height: `100%`,
                                        objectFit: `cover`
                                    }
                                }, J) : t ? (0, O.jsx)(i.div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 1.08
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    transition: {
                                        duration: .7,
                                        ease: `easeOut`
                                    },
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        backgroundImage: `url(${t})`,
                                        backgroundSize: `cover`,
                                        backgroundPosition: `center`
                                    }
                                }, `still-${J}`) : null,
                                (0, O.jsx)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        background: J === `death` ? `linear-gradient(to bottom, rgba(40,5,5,0.35) 0%, rgba(5,8,15,0.55) 55%, rgba(5,8,15,0.88) 100%)` : `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`,
                                        pointerEvents: `none`
                                    }
                                }),
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        bottom: H ? `18%` : `12%`,
                                        left: 0,
                                        right: 0,
                                        textAlign: `center`,
                                        pointerEvents: `none`,
                                        padding: `0 16px`
                                    },
                                    children: [
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: H ? 28 : 40,
                                                color: J === `death` ? `#ee6666` : `#e8e0d0`,
                                                fontFamily: `'Pirata One', cursive`,
                                                letterSpacing: 3,
                                                textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                            },
                                            children: Oe[J] ?? ``
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                marginTop: 10,
                                                fontSize: H ? 12 : 13,
                                                color: `rgba(255,255,255,0.55)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                letterSpacing: 1
                                            },
                                            children: `tap to skip`
                                        })
                                    ]
                                })
                            ]
                        });
                    })()
                }),
                (0, O.jsx)(n, {
                    children: V && (0, O.jsxs)(i.div, {
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
                            duration: .45
                        },
                        onClick: ()=>st(null),
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 145,
                            cursor: `pointer`,
                            display: `flex`,
                            flexDirection: `column`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            background: `radial-gradient(ellipse at center, rgba(8,6,20,0.75) 0%, rgba(2,3,8,0.96) 100%)`
                        },
                        children: [
                            M[V.zone] && (0, O.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${M[V.zone]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    opacity: .28,
                                    filter: `saturate(0.7) brightness(0.55)`
                                }
                            }),
                            (0, O.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)`
                                }
                            }),
                            (0, O.jsx)(i.div, {
                                initial: {
                                    scale: .8,
                                    opacity: 0
                                },
                                animate: {
                                    scale: 1,
                                    opacity: 1
                                },
                                transition: {
                                    type: `spring`,
                                    stiffness: 120,
                                    delay: .1
                                },
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    marginBottom: 28,
                                    filter: `drop-shadow(0 0 28px rgba(136,102,255,0.55))`
                                },
                                children: (0, O.jsx)(y, {
                                    name: `vortex`,
                                    size: H ? 72 : 96
                                })
                            }),
                            (0, O.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: H ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: V.lines.slice(0, ut + 1).map((e, t)=>{
                                    let n = e === V.lines[V.lines.length - 1] && ut >= V.lines.length - 1, r = e === `You have entered:`;
                                    return e ? (0, O.jsx)(i.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 8
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: .35
                                        },
                                        style: {
                                            fontFamily: n ? `'Pirata One', cursive` : `'IM Fell English', cursive`,
                                            fontSize: n ? H ? 28 : 40 : r ? 14 : H ? 17 : 20,
                                            letterSpacing: n || r ? 3 : .5,
                                            color: n ? `#c8a8ff` : r ? `rgba(200,180,255,0.55)` : `rgba(230,220,255,0.85)`,
                                            marginBottom: n ? 0 : 6,
                                            textShadow: n ? `0 0 24px rgba(136,102,255,0.45)` : `none`
                                        },
                                        children: e
                                    }, t) : (0, O.jsx)(`div`, {
                                        style: {
                                            height: 12
                                        }
                                    }, t);
                                })
                            }),
                            (0, O.jsx)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 1.2
                                },
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    marginTop: 36,
                                    fontFamily: `'Cinzel', serif`,
                                    fontSize: 11,
                                    letterSpacing: 3,
                                    color: `rgba(255,255,255,0.35)`
                                },
                                children: `tap to continue`
                            })
                        ]
                    }, `portal-zone`)
                }),
                (0, O.jsx)(n, {
                    children: L && (()=>{
                        let e = L.rarity === `legendary` ? `#eedd44` : L.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = L.rarity.toUpperCase();
                        return (0, O.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>Xe(null),
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
                                (0, O.jsx)(i.div, {
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
                                (0, O.jsxs)(i.div, {
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
                                        position: `relative`,
                                        marginBottom: 20,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: [
                                        (0, O.jsx)(i.div, {
                                            "aria-hidden": !0,
                                            animate: {
                                                scale: [
                                                    1,
                                                    1.18,
                                                    1
                                                ],
                                                opacity: [
                                                    .45,
                                                    .15,
                                                    .45
                                                ]
                                            },
                                            transition: {
                                                repeat: 1 / 0,
                                                duration: 2.4,
                                                ease: `easeInOut`
                                            },
                                            style: {
                                                position: `absolute`,
                                                width: H ? 168 : 220,
                                                height: H ? 168 : 220,
                                                borderRadius: `50%`,
                                                border: `2px solid ${e}`,
                                                boxShadow: `0 0 40px ${e}66, inset 0 0 30px ${e}22`
                                            }
                                        }),
                                        (0, O.jsx)(i.div, {
                                            "aria-hidden": !0,
                                            animate: {
                                                scale: [
                                                    1.05,
                                                    1.28,
                                                    1.05
                                                ],
                                                opacity: [
                                                    .25,
                                                    .08,
                                                    .25
                                                ]
                                            },
                                            transition: {
                                                repeat: 1 / 0,
                                                duration: 2.4,
                                                ease: `easeInOut`,
                                                delay: .3
                                            },
                                            style: {
                                                position: `absolute`,
                                                width: H ? 200 : 260,
                                                height: H ? 200 : 260,
                                                borderRadius: `50%`,
                                                border: `1px solid ${e}88`
                                            }
                                        }),
                                        (0, O.jsx)(`img`, {
                                            src: v(L.id),
                                            alt: ``,
                                            style: {
                                                position: `relative`,
                                                zIndex: 1,
                                                width: H ? 120 : 160,
                                                height: H ? 120 : 160,
                                                borderRadius: 16,
                                                objectFit: `cover`,
                                                border: `2px solid ${e}`,
                                                boxShadow: `0 0 36px ${e}99, 0 8px 24px rgba(0,0,0,0.6)`
                                            }
                                        })
                                    ]
                                }),
                                (0, O.jsxs)(i.div, {
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
                                (0, O.jsx)(i.div, {
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
                                        fontSize: H ? 30 : 40,
                                        color: e,
                                        letterSpacing: 2,
                                        textShadow: `0 0 30px ${e}66`,
                                        marginBottom: 14,
                                        textAlign: `center`,
                                        padding: `0 20px`
                                    },
                                    children: L.name
                                }),
                                (0, O.jsx)(i.div, {
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
                                        fontSize: H ? 15 : 17,
                                        color: `rgba(255,255,255,0.75)`,
                                        maxWidth: 440,
                                        textAlign: `center`,
                                        lineHeight: 1.5,
                                        padding: `0 24px`,
                                        marginBottom: 32
                                    },
                                    children: L.desc
                                }),
                                (0, O.jsx)(i.div, {
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
                (0, O.jsx)(n, {
                    children: Q.event && !J && !Q.gameOver && !Q.showPort && Oe[Q.event.cellType] && (0, O.jsx)(Ne, {
                        variant: `scene`,
                        event: Q.event,
                        isMobile: H,
                        gold: Q.ship.gold,
                        hull: Q.ship.hull,
                        relics: Q.relics,
                        score: Q.score,
                        onboard: P,
                        onDismissOnboard: Dt,
                        onChoose: nn,
                        canEscape: !!Xt,
                        onSkip: rn
                    }, `event-scene`)
                }),
                (0, O.jsx)(n, {
                    children: Q.event && !J && !Q.gameOver && !Q.showPort && Q.event.cellType && !N[Q.event.cellType] && (0, O.jsx)(Ne, {
                        variant: `compact`,
                        event: Q.event,
                        isMobile: H,
                        gold: Q.ship.gold,
                        hull: Q.ship.hull,
                        relics: Q.relics,
                        cellIcon: tt[Q.event.cellType],
                        onboard: P,
                        onDismissOnboard: Dt,
                        onChoose: nn,
                        canEscape: !!Xt,
                        onSkip: rn
                    }, `event-compact`)
                }),
                (0, O.jsx)(We, {
                    open: !!Q.showPort && !Q.gameOver,
                    isMobile: H,
                    ship: Q.ship,
                    portUpgrades: Q.portUpgrades,
                    upgradeToken: !!Q.upgradeToken,
                    maxedComponents: Q.maxedComponents,
                    cart: Ie,
                    setCart: ze,
                    onboard: P,
                    onDismissOnboard: Dt,
                    onUpgradeComponent: an,
                    onReroll: ()=>{
                        K(40), A((e)=>_(e));
                    },
                    freeReroll: Q.shipType === `merchant` && !!Q.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        K(n), A((n)=>g(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of Ie)K(50 + Fe.indexOf(e));
                        K(70), A((e)=>{
                            let t = e;
                            for (let e of Ie)t = c(t, e);
                            return ae(t);
                        }), ze([]);
                    }
                }),
                (0, O.jsx)(Ye, {
                    open: kt,
                    state: Q,
                    isMobile: H,
                    isDailyRun: U,
                    personalBest: ht,
                    isNewRecord: _t,
                    newFeats: Ge,
                    nearFeats: qe,
                    scoreSubmitted: Qe,
                    nftMinted: B,
                    walletAddress: e,
                    account: t,
                    onChainDone: $e,
                    setOnChainDone: et,
                    submitting: yt,
                    setSubmitting: bt,
                    connecting: Te,
                    onConnect: ()=>we(),
                    showGuestDailyCta: !!(e && j.current && !U && ke && ee),
                    onPlayDaily: ee,
                    rangMois: Nt,
                    harborDown: Ct,
                    restarting: Tt,
                    onRestart: on,
                    onHome: m
                }),
                (0, O.jsx)(n, {
                    children: Bt && (0, O.jsxs)(i.div, {
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
                            H ? (0, O.jsx)(i.div, {
                                initial: {
                                    scale: 1.06,
                                    opacity: .7
                                },
                                animate: {
                                    scale: 1,
                                    opacity: 1
                                },
                                transition: {
                                    duration: .55
                                },
                                style: {
                                    width: `100%`,
                                    height: `100%`,
                                    backgroundImage: `url(/icons/hunter.png)`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    filter: `saturate(1.1) brightness(0.75)`
                                }
                            }) : (0, O.jsx)(`video`, {
                                src: `/scenes/hunter.mp4`,
                                autoPlay: !0,
                                muted: $,
                                playsInline: !0,
                                preload: `metadata`,
                                onEnded: ()=>{
                                    Qt.current = !1, X(!1);
                                },
                                style: {
                                    width: `100%`,
                                    height: `100%`,
                                    objectFit: `cover`
                                }
                            }),
                            (0, O.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: H ? `radial-gradient(ellipse at center, rgba(80,0,100,0.35) 0%, rgba(0,0,0,0.65) 100%)` : `rgba(0,0,0,0.3)`
                                }
                            }),
                            (0, O.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .2
                                },
                                style: {
                                    position: `absolute`,
                                    bottom: H ? `22%` : `20%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: H ? 26 : 32,
                                            color: `#cc44ee`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                        },
                                        children: `THE HUNTER STRIKES!`
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: H ? 14 : 16,
                                            color: `rgba(255,255,255,0.7)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 6
                                        },
                                        children: `Tentacles rake the hull`
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 14
                                        },
                                        children: `TAP TO SKIP`
                                    })
                                ]
                            })
                        ]
                    })
                }),
                H && (0, O.jsxs)(O.Fragment, {
                    children: [
                        !Q.event && !Q.showPort && !Q.gameOver && (0, O.jsxs)(`div`, {
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
                                (0, O.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Vt(Z === `ship` ? null : `ship`),
                                    "aria-label": `Show ship status`,
                                    "aria-expanded": Z === `ship`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${Z === `ship` ? `#44cc88` : `rgba(255,255,255,0.2)`}`,
                                        background: Z === `ship` ? `rgba(68,204,136,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: Z === `ship` ? `#44cc88` : `rgba(255,255,255,0.6)`,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: (0, O.jsx)(y, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, O.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Vt(Z === `upgrades` ? null : `upgrades`),
                                    "aria-label": `Show upgrades`,
                                    "aria-expanded": Z === `upgrades`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${Z === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.2)`}`,
                                        background: Z === `upgrades` ? `rgba(200,160,48,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: Z === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.6)`,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: (0, O.jsx)(y, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, O.jsx)(n, {
                            children: Z && (0, O.jsxs)(i.div, {
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
                                    Z === `ship` && (0, O.jsxs)(O.Fragment, {
                                        children: [
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Q.ship.upgrades.length === 0 ? (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Q.ship.upgrades.map((e)=>{
                                                let t = Le.find((t)=>t.id === e);
                                                return (0, O.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, O.jsx)(`img`, {
                                                            src: Pe[e],
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
                                            Q.upgradeToken && (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, O.jsx)(y, {
                                                        name: `star`,
                                                        size: 12
                                                    }),
                                                    ` Free upgrade — claim it at a port`
                                                ]
                                            }),
                                            (0, O.jsx)(`div`, {
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
                                                    img: `/assets/hull-CGmPGbU0.png`,
                                                    color: `#44cc88`
                                                },
                                                {
                                                    key: `weapon`,
                                                    label: `Weapon`,
                                                    img: `/assets/power-CBX9SU5d.png`,
                                                    color: `#ee6644`
                                                },
                                                {
                                                    key: `nav`,
                                                    label: `Nav`,
                                                    img: `/assets/vision-3Q65Za4i.png`,
                                                    color: `#6aaccc`
                                                }
                                            ].map((e)=>{
                                                let t = Q.ship.levels[e.key], n = e.key === `hull` ? `${Q.ship.maxHull} HP` : e.key === `weapon` ? `P${Q.ship.power}` : `V${Q.ship.vision}`;
                                                return (0, O.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, O.jsx)(`img`, {
                                                            src: e.img,
                                                            alt: ``,
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, O.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, O.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, O.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, O.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 12
                                                            },
                                                            children: n
                                                        })
                                                    ]
                                                }, e.key);
                                            })
                                        ]
                                    }),
                                    Z === `upgrades` && (0, O.jsxs)(O.Fragment, {
                                        children: [
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            Le.map((e)=>{
                                                let t = Q.ship.upgrades.includes(e.id), n = Re[e.build];
                                                return (0, O.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, O.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, O.jsx)(`img`, {
                                                                    src: Pe[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, O.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, O.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, O.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, O.jsx)(Be, {
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
                        Z && (0, O.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>Vt(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { ht as default, __tla };
