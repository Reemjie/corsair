import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { A as o, C as s, D as c, E as l, H as u, I as d, M as f, N as p, O as m, P as h, S as g, T as _, U as v, W as y, _ as ee, a as te, b, d as ne, f as x, i as S, j as re, k as C, m as ie, p as w, r as ae, t as oe, v as se, w as ce, y as le } from "./anchor-DTwjXLM2.js";
import { a as ue, b as de, d as fe, h as pe, m as me, p as he, t as ge, x as _e, __tla as __tla_0 } from "./supabase-BXtpc1SX.js";
import { l as ve, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let W;
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
    var T = e(t(), 1), E = `corsair_onboard_v1`;
    function ye() {
        try {
            return new Set(JSON.parse(localStorage.getItem(E) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function be(e) {
        let t = ye();
        t.add(e);
        try {
            localStorage.setItem(E, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function xe(e) {
        let t = ye();
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
    var Se = {
        gold: .5,
        buy: .5,
        damage: .6,
        streak: .55,
        zone: .6,
        death: .6,
        hunter_near: .65,
        hunter_attack: .7,
        thunder: .55
    }, Ce = {}, we = !1;
    function Te(e) {
        we = e;
    }
    function D(e) {
        if (!we) try {
            let t = Ce[e];
            t || (t = new Audio(`/sounds/${e}.wav`), Ce[e] = t), t.volume = Se[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var O = r();
    function Ee({ tip: e, isMobile: t, onDismiss: n }) {
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
    var k = `/assets/careful-Cp7BVX84.png`, A = `/assets/cover-B_e5YbfY.png`, De = `/assets/cursed-DmavkUs_.png`, Oe = `/assets/detour-D8HBkeuW.png`, ke = `/assets/dock-ePamt-Sr.png`, j = `/assets/explore-CNxn52P4.png`, Ae = `/assets/fight-g8Kc5AC3.png`, je = `/assets/leave-CeE9NwgD.png`, Me = `/assets/lurks-BB0IX5ES.png`, M = `/assets/pact-DCE16eF-.png`, N = `/assets/push-DcLNLHxV.png`, Ne = `/assets/ritual-B5bqWt-6.png`, Pe = `/assets/sacrifice-KlI9xYLE.png`, Fe = `/assets/sail-yGR6Adzb.png`, Ie = `/assets/search-CSNg3Ko5.png`, P = `/assets/speed-BTjZicNY.png`, F = `/assets/take-CO53AH6i.png`, Le = `/assets/tribute-CcshN1U0.png`, Re = `/assets/vortex-l5f1oTMj.png`, I = Object.fromEntries([
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
                "../../assets/choices/careful.png": k,
                "../../assets/choices/cover.png": A,
                "../../assets/choices/cursed.png": De,
                "../../assets/choices/detour.png": Oe,
                "../../assets/choices/dock.png": ke,
                "../../assets/choices/explore.png": j,
                "../../assets/choices/fight.png": Ae,
                "../../assets/choices/leave.png": je,
                "../../assets/choices/lurks.png": Me,
                "../../assets/choices/pact.png": M,
                "../../assets/choices/push.png": N,
                "../../assets/choices/ritual.png": Ne,
                "../../assets/choices/sacrifice.png": Pe,
                "../../assets/choices/sail.png": Fe,
                "../../assets/choices/search.png": Ie,
                "../../assets/choices/speed.png": P,
                "../../assets/choices/take.png": F,
                "../../assets/choices/tribute.png": Le,
                "../../assets/choices/vortex.png": Re
            })[`../../assets/choices/${e}.png`], import.meta.url).href
        ])), L = {
        1: `/scenes/island.jpg`,
        2: `/scenes/storm.jpg`,
        3: `/scenes/ancient-kraken.jpg`
    }, R = {
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
    }, ze = {
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
    }, Be = {
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
    function Ve(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function He(e, t) {
        let n = Ve(e);
        return n === 0 || t >= n;
    }
    function Ue(e, t, n, r) {
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function We(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    function Ge(e, t) {
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
    function Ke({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, score: s, cellIcon: c, onboard: l, onDismissOnboard: u, onChoose: d, canEscape: f, onSkip: p }) {
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
                let l = We(s.risk), u = He(s.desc, r), f = Ue(s, t.cellType, o, a), p = e === `scene` ? 1.04 : 1.02, m = e === `scene` ? .96 : .98;
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
                        I[s.icon] ? (0, O.jsx)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: (0, O.jsx)(`img`, {
                                src: I[s.icon],
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
                (0, O.jsx)(w, {
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
                R[t.cellType] && (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${R[t.cellType]})`,
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
                            children: (0, O.jsx)(Ee, {
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
                                children: Be[t.cellType] ?? t.cellType
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
                        children: Ge(c, 55)
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
                            l && u && (0, O.jsx)(Ee, {
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
    var qe = {
        escape: `/assets/swift_sails-YMobDX4v.png`,
        ghost: `/assets/ghost_ship-4jaVs07k.png`,
        hunter: `/assets/treasure_hunter-C9jnAyZy.png`,
        rider: `/assets/storm_rider-BjRGnDwr.png`,
        greed: `/assets/cursed_greed-BlVfcQDt.png`,
        berserker: `/assets/berserker-B9haxHEY.png`
    }, Je = [
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
    ], z = v.upgrades.costs, B = Math.round(v.storm.hunterSurgeBonus * 100), Ye = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: z.ghost,
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
            cost: z.rider,
            icon: `rider`,
            build: `escape`
        },
        {
            id: `greed`,
            name: `Cursed Greed`,
            pros: [
                `Gold x${v.greed.goldMultiplier} on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm worsens every 200g. Pirates hit harder at 400g+. Hunter aggro at 600g+.`
            ],
            cost: z.greed,
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
            cost: z.berserker,
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
                `Storm surges +${B}% more frequent.`
            ],
            cost: z.hunter,
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
            cost: z.escape,
            icon: `escape`,
            build: `escape`
        }
    ], Xe = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function Ze({ ok: e }) {
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
    function Qe({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, O.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, O.jsx)(Ze, {
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
    var $e = `/assets/hull-CGmPGbU0.png`, et = `/assets/vision-3Q65Za4i.png`, tt = `/assets/power-CBX9SU5d.png`;
    function nt({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
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
                            u && d && (0, O.jsx)(Ee, {
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
                                children: Ye.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = Xe[e.build];
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
                                                src: qe[e.id],
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
                                                        children: (0, O.jsx)(Qe, {
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
                            (0, O.jsx)(w, {
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
    var rt = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new ve({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function it(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: rt,
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
    function at({ payload: e, isMobile: t, onShare: n }) {
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
    async function ot(e) {
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
    function st(e) {
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
    function ct({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: o, isNewRecord: s, newFeats: c, nearFeats: l, scoreSubmitted: u, nftMinted: d, walletAddress: f, account: m, onChainDone: h, setOnChainDone: _, submitting: v, setSubmitting: y, connecting: ee, onConnect: te, showGuestDailyCta: ne, onPlayDaily: x, rangMois: S, harborDown: re, restarting: C, onRestart: ie, onHome: ae }) {
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
                        children: (0, O.jsx)(w, {
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
                        let e = st(t.log);
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
                                        (0, O.jsx)(w, {
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
                                    (0, O.jsx)(w, {
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
                            !a && !g() && x && f && (0, O.jsx)(`div`, {
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
                            !a && !g() && !f && (0, O.jsx)(`div`, {
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
                                children: a ? ce() ? `Seed: ${t.seed} — Daily Key: ${b()}` : `Blind daily — seed revealed at 00:00 UTC` : `Seed: ${t.seed} — challenge your crew!`
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
                            m && !h && (0, O.jsx)(i.button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                disabled: v,
                                onClick: async ()=>{
                                    y(!0);
                                    try {
                                        await it(m, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                    } catch (e) {
                                        console.warn(`On-chain submit failed:`, e);
                                    }
                                    _(!0), y(!1);
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
                                children: v ? `ENGRAVING...` : (0, O.jsxs)(O.Fragment, {
                                    children: [
                                        (0, O.jsx)(w, {
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
                            u && (0, O.jsx)(`div`, {
                                style: {
                                    fontSize: 14,
                                    color: `#44cc88`,
                                    letterSpacing: 2,
                                    fontFamily: `'Pirata One', cursive`
                                },
                                children: `✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD`
                            }),
                            d.length > 0 && (0, O.jsxs)(i.div, {
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
                                        children: (0, O.jsx)(w, {
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
                                    d.map((e)=>(0, O.jsx)(`div`, {
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
                                            let e = `🏴‍☠️ I earned "${d[0].replace(/_/g, ` `).replace(/\b\w/g, (e)=>e.toUpperCase())}" — a Genesis NFT in Corsair.\nNo mint button. No whitelist. Just sail, meet the condition, claim it before it's SOLD OUT.\nDare to find yours? ⚓\nhttps://playcorsair.xyz/`;
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
                            !f && (0, O.jsxs)(`div`, {
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
                                        onClick: te,
                                        disabled: ee,
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
                                        children: ee ? `CONNECTING...` : `CONNECT WALLET`
                                    })
                                ]
                            }),
                            ne && x && (0, O.jsxs)(`div`, {
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
                                        onClick: x,
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
                                }, i = (t.relics ?? []).map((e)=>p(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = S ? `\n⚔️ #${S.rank} in Starktember — ${S.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair https://playcorsair.xyz/ #Starktember #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/ #Starknet`, l = st(t.log);
                                return (0, O.jsx)(at, {
                                    isMobile: r,
                                    onShare: ()=>{
                                        ot(c);
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
                                    re && (0, O.jsx)(`div`, {
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
                                            !a && !g() && x && f && (0, O.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: x,
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
                                                onClick: ie,
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
                                                onClick: ae,
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
    function lt({ shipId: e, size: t, heading: n = 0, lurchX: r = 0, lurchY: a = 0 }) {
        let o = e === `specter`, [s, c] = (0, T.useState)(!0), l = `${x(e)}?v=4`, u = r !== 0 || a !== 0, d = u ? r * 2.5 : 0;
        return (0, O.jsx)(i.div, {
            animate: {
                rotate: n + d,
                scale: u ? 1.02 : 1
            },
            transition: {
                rotate: {
                    type: `tween`,
                    duration: .9,
                    ease: [
                        .45,
                        .05,
                        .25,
                        1
                    ]
                },
                scale: {
                    type: `tween`,
                    duration: .85,
                    ease: `easeInOut`
                }
            },
            style: {
                lineHeight: 0,
                transformOrigin: `50% 55%`
            },
            children: (0, O.jsxs)(i.div, {
                animate: {
                    y: [
                        0,
                        -1.4,
                        0
                    ]
                },
                transition: {
                    repeat: 1 / 0,
                    duration: 3.6,
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
                            background: o ? `radial-gradient(ellipse, rgba(120,210,240,0.45) 0%, transparent 70%)` : `radial-gradient(ellipse, rgba(30,80,110,0.55) 0%, rgba(180,220,240,0.15) 45%, transparent 72%)`,
                            pointerEvents: `none`
                        }
                    }),
                    s ? (0, O.jsx)(`img`, {
                        src: l,
                        alt: ``,
                        width: t,
                        height: t,
                        onError: ()=>c(!1),
                        style: {
                            display: `block`,
                            width: t,
                            height: t,
                            objectFit: `contain`,
                            position: `relative`,
                            zIndex: 1,
                            filter: o ? `drop-shadow(0 0 8px rgba(110,200,240,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.35))` : `drop-shadow(0 3px 5px rgba(0,0,0,0.7))`,
                            opacity: o ? .92 : 1
                        }
                    }) : (0, O.jsx)(ut, {
                        shipId: e,
                        size: t,
                        ghost: o
                    })
                ]
            })
        });
    }
    function ut({ shipId: e, size: t, ghost: n }) {
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
    var dt = {
        1: {
            base: `#1a5a6e`,
            mid: `#247a8c`,
            deep: `#0e3a48`,
            foam: `rgba(230,245,250,0.55)`,
            ripple: `rgba(160,210,220,0.45)`,
            sheen: `rgba(120,200,210,0.35)`
        },
        2: {
            base: `#164860`,
            mid: `#1e6880`,
            deep: `#0c3044`,
            foam: `rgba(210,230,240,0.42)`,
            ripple: `rgba(130,180,200,0.38)`,
            sheen: `rgba(90,160,190,0.28)`
        },
        3: {
            base: `#123848`,
            mid: `#185060`,
            deep: `#0a2434`,
            foam: `rgba(180,205,220,0.32)`,
            ripple: `rgba(100,150,175,0.32)`,
            sheen: `rgba(70,130,160,0.22)`
        }
    };
    function V(e, t) {
        return Math.abs(e * 73856093 ^ t * 19349663) % 1e3;
    }
    function ft({ zone: e, x: t, y: n, quiet: r }) {
        let i = dt[e] ?? dt[1], a = V(t, n), o = 22 + a % 55, s = 18 + a * 3 % 40, c = 10 + a % 6, l = 22 + a * 2 % 7, u = 34 + a % 5, d = 3 + a % 4;
        return (0, O.jsxs)(`div`, {
            "aria-hidden": !0,
            className: r ? void 0 : `sea-tile`,
            style: {
                position: `absolute`,
                inset: 0,
                borderRadius: 5,
                pointerEvents: `none`,
                overflow: `hidden`,
                background: `
          radial-gradient(ellipse 85% 65% at ${o}% ${s}%, ${i.sheen} 0%, transparent 58%),
          linear-gradient(160deg, ${i.mid} 0%, ${i.base} 48%, ${i.deep} 100%)
        `,
                boxShadow: r ? `inset 0 -5px 10px rgba(8,30,40,0.35)` : `inset 0 1px 0 rgba(220,240,245,0.18), inset 0 -7px 12px rgba(8,28,38,0.4)`,
                animationDelay: r ? void 0 : `${a % 50 / 10}s`
            },
            children: [
                (0, O.jsxs)(`svg`, {
                    viewBox: `0 0 48 48`,
                    preserveAspectRatio: `none`,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        width: `100%`,
                        height: `100%`,
                        opacity: r ? .35 : .85
                    },
                    children: [
                        (0, O.jsx)(`path`, {
                            d: `M-2 ${c} Q12 ${c - d}, 24 ${c} T50 ${c}`,
                            fill: `none`,
                            stroke: i.foam,
                            strokeWidth: `1.8`,
                            strokeLinecap: `round`
                        }),
                        (0, O.jsx)(`path`, {
                            d: `M-4 ${l} Q14 ${l + d * .6}, 26 ${l - 1} T52 ${l}`,
                            fill: `none`,
                            stroke: i.ripple,
                            strokeWidth: `1.35`,
                            strokeLinecap: `round`
                        }),
                        (0, O.jsx)(`path`, {
                            d: `M0 ${u} Q18 ${u - 2}, 30 ${u + 1} T48 ${u}`,
                            fill: `none`,
                            stroke: `rgba(10,40,55,0.28)`,
                            strokeWidth: `1.5`,
                            strokeLinecap: `round`
                        }),
                        !r && (0, O.jsxs)(O.Fragment, {
                            children: [
                                (0, O.jsx)(`circle`, {
                                    cx: 8 + a % 10,
                                    cy: c,
                                    r: `1.1`,
                                    fill: i.foam
                                }),
                                (0, O.jsx)(`circle`, {
                                    cx: 22 + a % 8,
                                    cy: c + 2,
                                    r: `0.8`,
                                    fill: i.foam
                                }),
                                (0, O.jsx)(`circle`, {
                                    cx: 36 + a * 2 % 7,
                                    cy: c - 1,
                                    r: `0.9`,
                                    fill: i.foam
                                }),
                                (0, O.jsx)(`circle`, {
                                    cx: 14 + a % 6,
                                    cy: l - 1,
                                    r: `0.6`,
                                    fill: i.ripple
                                })
                            ]
                        })
                    ]
                }),
                (0, O.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        left: 0,
                        right: 0,
                        top: 0,
                        height: `42%`,
                        background: `linear-gradient(180deg, rgba(200,235,240,${r ? .08 : .14}) 0%, transparent 100%)`
                    }
                })
            ]
        });
    }
    function H(e) {
        return (dt[e] ?? dt[1]).base;
    }
    var pt = {
        sea: `〰`,
        storm: `/icons_ui/storm.png`,
        pirate: `/icons_ui/swords.png`,
        treasure: `/icons_ui/treasure.png`,
        port: `/icons/port.png`,
        kraken: `/icons_ui/kraken.png`,
        wreck: `/icons/wreck.png`,
        island: `/icons/island.png`,
        rocks: `/icons/rocks.png`
    }, mt = {
        1: {
            sea: `#1a5a6e`,
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
            sea: `#164860`,
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
            sea: `#123848`,
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
    }, ht = {
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
    function gt(e, t) {
        let n = e * 2 + 1, r = t ? 240 : 210, i = Math.max(180, window.innerHeight - r), a = t ? window.innerWidth - 16 : Math.min(window.innerWidth * .48, 560);
        return Math.max(28, Math.floor(Math.min(a, i) / n) - 4);
    }
    function _t(e, t) {
        return gt(e, t) + 2;
    }
    function vt(e) {
        let t = e.hunter;
        return t?.active ? Math.abs(t.x - e.ship.x) + Math.abs(t.y - e.ship.y) : 99;
    }
    function yt(e) {
        let t = (e.relics ?? []).includes(`black_flag`) ? 2 : 0, n = Math.max(v.hunter.minDamage, v.hunter.baseDamage - e.ship.power) + t;
        return u(e.ship.upgrades, n);
    }
    function bt(e) {
        return e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`;
    }
    function xt(e) {
        return e === `frenzy` ? `ENR` : e === `stalking` ? `STK` : e === `searching` ? `SRC` : `TRK`;
    }
    function St(e) {
        return e === `frenzy` ? `Knows where you are · strikes hard` : e === `stalking` ? `Cuts your path · moves every turn` : e === `searching` ? `Lost your trail · wandering` : `Following your wake · every other turn`;
    }
    function Ct(e) {
        return e <= 0 ? `ON YOU` : e === 1 ? `1 CELL — NEXT HIT` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`;
    }
    function wt(e) {
        if (!e.hunter?.active) return `calm`;
        let t = vt(e);
        return t <= 1 || e.hunter.mode === `frenzy` ? `critical` : t <= 3 || e.hunter.awareness >= 80 ? `danger` : t <= 5 || e.hunter.mode === `stalking` ? `watch` : `calm`;
    }
    function Tt(e) {
        if (!e.hunter?.active) return ``;
        let t = vt(e), n = yt(e), r = bt(e.hunter.mode);
        return t <= 1 ? `${r} · STRIKE ~−${n} hull` : `${r} · ${t} away · hit ~−${n}`;
    }
    var U = {
        1: `rgba(6,14,22,0.82)`,
        2: `rgba(6,10,22,0.86)`,
        3: `rgba(4,6,14,0.9)`
    };
    function Et({ state: e, isMobile: t, slide: n, lurch: r, heading: a, onboard: o, onDismissOnboard: s, onMove: c }) {
        let l = e.ship.vision * 2 + 1, u = gt(e.ship.vision, t), d = !e.event && !e.showPort && !e.gameOver && (t ? (0, O.jsx)(`div`, {
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
                    onClick: ()=>c(e.dx, e.dy),
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
                        onClick: ()=>c(e.dx, e.dy),
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
        })), f = e.hunter?.active && !e.gameOver && (()=>{
            let n = wt(e), r = Tt(e), a = n === `critical` ? `rgba(160,10,30,0.92)` : n === `danger` ? `rgba(100,20,50,0.88)` : n === `watch` ? `rgba(70,20,90,0.85)` : `rgba(40,20,60,0.8)`, o = n === `critical` ? `rgba(255,80,100,0.75)` : n === `danger` ? `rgba(255,120,80,0.55)` : `rgba(180,80,220,0.45)`;
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
                    (0, O.jsx)(w, {
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
                                (0, O.jsx)(w, {
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
                            children: y[e.currentZone ?? 1]?.name ?? `The Coasts`
                        }),
                        (0, O.jsxs)(`span`, {
                            style: {
                                color: `#eedd44`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, O.jsx)(w, {
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
                o && !e.event && !e.showPort && !e.gameOver && (0, O.jsx)(Ee, {
                    tip: o,
                    isMobile: t,
                    onDismiss: s
                }),
                (0, O.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        flexShrink: 0
                    },
                    children: [
                        f,
                        (0, O.jsxs)(O.Fragment, {
                            children: [
                                (0, O.jsx)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        background: `radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)`,
                                        pointerEvents: `none`,
                                        zIndex: 2,
                                        borderRadius: 8
                                    }
                                }),
                                L[e.currentZone ?? 1] && (0, O.jsx)(`div`, {
                                    "aria-hidden": !0,
                                    style: {
                                        position: `absolute`,
                                        inset: -6,
                                        zIndex: 0,
                                        borderRadius: 14,
                                        overflow: `hidden`,
                                        backgroundImage: `url(${L[e.currentZone ?? 1]})`,
                                        backgroundSize: `cover`,
                                        backgroundPosition: `center`,
                                        opacity: .14,
                                        filter: `saturate(0.55) brightness(0.45)`,
                                        pointerEvents: `none`
                                    }
                                }),
                                (0, O.jsx)(i.div, {
                                    animate: {
                                        x: n.x,
                                        y: n.y
                                    },
                                    transition: n.instant ? {
                                        duration: 0
                                    } : {
                                        duration: 1.05,
                                        ease: [
                                            .45,
                                            .05,
                                            .25,
                                            1
                                        ]
                                    },
                                    style: {
                                        position: `relative`,
                                        zIndex: 1,
                                        display: `grid`,
                                        gridTemplateColumns: `repeat(${l},1fr)`,
                                        gap: 2,
                                        padding: 2,
                                        borderRadius: 8,
                                        background: H(e.currentZone ?? 1),
                                        boxShadow: `inset 0 0 24px rgba(0,8,14,0.55)`,
                                        willChange: `transform`
                                    },
                                    children: Array.from({
                                        length: l
                                    }, (t, n)=>n - e.ship.vision).flatMap((t)=>Array.from({
                                            length: l
                                        }, (t, n)=>n - e.ship.vision).map((n)=>{
                                            let o = e.ship.x + n, s = e.ship.y + t, c = (()=>{
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
                                            })(), l = (e.relics ?? []).includes(`kraken_eye`) || e.shipType === `specter`, d = !!(e.hunter?.active && Math.abs(e.hunter.x - e.ship.x) <= e.ship.vision && Math.abs(e.hunter.y - e.ship.y) <= e.ship.vision) && (l || e.hunter?.mode !== `tracking`) && c.has(`${o}-${s}`) && !(o === e.hunter.x && s === e.hunter.y), f = o >= 0 && o < 12 && s >= 0 && s < 12 ? e.grid[s][o] : {
                                                type: `sea`,
                                                revealed: !1,
                                                visited: !1,
                                                value: 0,
                                                stormed: !1
                                            }, p = e.ship.x + n, m = e.ship.y + t, h = e.hunter?.active && e.hunter.x === p && e.hunter.y === m, g = e.hunter?.active ? vt(e) : 99, _ = n === 0 && t === 0, v = f.revealed || f.visited, y = f.stormed, ee = e.stormDistance <= 0 ? -1 : e.grid.length + 2 - Math.floor((10 - e.stormDistance) / 3), te = y && s === ee, b = e.currentZone ?? 1, ne = mt[b] ?? mt[1], x = ht[b] ?? ht[1], S = y ? `#cc2222` : x[f.type], re = v && f.type === `sea`, C = _ || re ? H(b) : h ? e.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : y ? `rgba(90,12,18,0.78)` : v ? ne[f.type] ?? `#050a0f` : U[b] ?? U[1];
                                            return (0, O.jsxs)(i.div, {
                                                className: te ? `storm-front` : void 0,
                                                initial: v ? {
                                                    opacity: 0,
                                                    scale: .8
                                                } : !1,
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                style: {
                                                    width: u,
                                                    height: u,
                                                    background: C,
                                                    border: _ ? g <= 1 ? `2px solid #ee4466` : `1px solid rgba(120,190,200,0.45)` : h ? `2px solid ${e.hunter?.mode === `frenzy` ? `#ff4466` : e.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : y ? `1px solid #cc222244` : re ? `1px solid rgba(255,255,255,0.08)` : v ? `1px solid ${S ? S + `55` : `rgba(255,255,255,0.1)`}` : `1px solid rgba(255,255,255,0.04)`,
                                                    borderRadius: 5,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    justifyContent: `center`,
                                                    fontSize: _ ? 26 : 20,
                                                    boxShadow: h ? `0 0 ${g <= 2 ? 22 : 14}px ${e.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : _ ? g <= 1 ? `0 0 18px rgba(238,68,102,0.5)` : `0 0 10px rgba(20,60,80,0.35)` : S && v ? `0 0 10px ${S}44` : `none`,
                                                    position: `relative`,
                                                    cursor: `default`,
                                                    overflow: `hidden`
                                                },
                                                children: [
                                                    (_ || !h && re) && (0, O.jsx)(ft, {
                                                        zone: b,
                                                        x: p,
                                                        y: m,
                                                        quiet: _
                                                    }),
                                                    _ && (0, O.jsxs)(O.Fragment, {
                                                        children: [
                                                            (0, O.jsx)(`div`, {
                                                                style: {
                                                                    position: `relative`,
                                                                    zIndex: 1,
                                                                    lineHeight: 0
                                                                },
                                                                children: (0, O.jsx)(lt, {
                                                                    shipId: e.shipType ?? `default`,
                                                                    size: Math.round(u * .92),
                                                                    heading: a,
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
                                                                            fontSize: Math.max(7, u * .16),
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
                                                    !h && !_ && !v && f.type === `portal` && (0, O.jsx)(i.div, {
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
                                                            src: `/icons/portal.png`,
                                                            alt: ``,
                                                            style: {
                                                                width: u * .72,
                                                                height: u * .72,
                                                                objectFit: `contain`,
                                                                filter: `drop-shadow(0 0 6px #aa77ff)`,
                                                                mixBlendMode: `screen`
                                                            }
                                                        })
                                                    }),
                                                    !h && !_ && v && f.type !== `sea` && (0, O.jsx)(`img`, {
                                                        src: `/icons/${f.type}.png`,
                                                        style: {
                                                            width: u * .82,
                                                            height: u * .82,
                                                            opacity: f.visited ? .35 : 1,
                                                            objectFit: `contain`,
                                                            mixBlendMode: `screen`,
                                                            position: `relative`,
                                                            zIndex: 1
                                                        }
                                                    }),
                                                    h && !_ && (0, O.jsxs)(i.div, {
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
                                                            filter: `drop-shadow(0 0 ${g <= 2 ? 16 : 10}px ${e.hunter?.mode === `frenzy` ? `#ff4466` : `#cc44ee`})`,
                                                            position: `relative`,
                                                            zIndex: 1
                                                        },
                                                        children: [
                                                            (0, O.jsx)(`img`, {
                                                                src: `/icons/hunter.png`,
                                                                style: {
                                                                    width: u * .82,
                                                                    height: u * .82,
                                                                    objectFit: `contain`
                                                                }
                                                            }),
                                                            (0, O.jsxs)(`div`, {
                                                                style: {
                                                                    position: `absolute`,
                                                                    left: `50%`,
                                                                    bottom: -2,
                                                                    transform: `translateX(-50%)`,
                                                                    fontSize: Math.max(7, u * .14),
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
                                                                    xt(e.hunter.mode),
                                                                    ` `,
                                                                    g <= 1 ? `HIT` : g
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    d && !_ && !h && (0, O.jsx)(i.div, {
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
                                                    h && !_ && !v && (0, O.jsx)(i.div, {
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
                                                            filter: `drop-shadow(0 0 8px #aa22cc)`,
                                                            position: `relative`,
                                                            zIndex: 1
                                                        },
                                                        children: (0, O.jsx)(`img`, {
                                                            src: `/icons/hunter.png`,
                                                            style: {
                                                                width: u * .82,
                                                                height: u * .82,
                                                                objectFit: `contain`,
                                                                opacity: .4,
                                                                filter: `grayscale(0.8) brightness(0.5)`
                                                            }
                                                        })
                                                    }),
                                                    !h && !_ && !v && f.type !== `portal` && (0, O.jsx)(`span`, {
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
                                            }, `${o}-${s}`);
                                        }))
                                })
                            ]
                        })
                    ]
                }),
                !t && d,
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
                                        (0, O.jsx)(w, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, O.jsx)(w, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, O.jsx)(w, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        })
                                    ]
                                }) : (0, O.jsx)(w, {
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
                        (0, O.jsx)(w, {
                            name: `vortex`,
                            size: 14
                        }),
                        ` `,
                        e.portalHint,
                        ` `,
                        (0, O.jsx)(w, {
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
                        let t = p(e);
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
                                    src: h(t.id),
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
                t && d,
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
    var Dt = `/icons/gold.png`, Ot = (e, t = 14)=>(0, O.jsx)(w, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    W = function({ walletAddress: e, account: t, username: r, onHome: u, onPlayDaily: v, dailySeed: x, isDaily: ce, seedToken: ve, shipId: E, resumeState: ye, resumeRunId: Se, resumeActions: Ce }) {
        let { connect: we, connecting: Ee } = a(), [k, A] = (0, T.useState)(()=>ye ?? s(x, E ?? `default`)), De = (0, T.useRef)(!e), [Oe, ke] = (0, T.useState)(()=>!g()), [j, Ae] = (0, T.useState)(null), [je, Me] = (0, T.useState)(!1), [M, N] = (0, T.useState)([]), [Ne, Pe] = (0, T.useState)([]), [Fe, Ie] = (0, T.useState)([]), P = (0, T.useRef)(0), [F, Le] = (0, T.useState)(null), Re = (0, T.useRef)((k.relics ?? []).length), [I, Ve] = (0, T.useState)(!1), [He, Ue] = (0, T.useState)(!1), We = (0, T.useRef)(!1), [Ge, z] = (0, T.useState)([]), [B, Ze] = (0, T.useState)(null), [rt, it] = (0, T.useState)(0), [at, ot] = (0, T.useState)(()=>ae()), [st, lt] = (0, T.useState)(!1), [ut, dt] = (0, T.useState)(!1), [V, ft] = (0, T.useState)(window.innerWidth < 768), H = ce === !0, mt = (0, T.useRef)(ve), [ht, gt] = (0, T.useState)(!1), [xt, Tt] = (0, T.useState)(!1);
        (0, T.useEffect)(()=>{
            if (k.gameOver) {
                Ae(null);
                return;
            }
            k.turn > 0 && be(`sail`), Ae(xe(k));
        }, [
            k.turn,
            k.event,
            k.showPort,
            k.hunter?.active,
            k.stormDistance,
            k.gameOver
        ]);
        let U = ()=>{
            j && (be(j.id), Ae(null));
        };
        (0, T.useEffect)(()=>{
            H && (l(), e && b());
        }, []), (0, T.useEffect)(()=>{
            if (!e) {
                ke(!g());
                return;
            }
            he(e, b()).then((e)=>ke(!(e || g())));
        }, [
            e
        ]);
        let W = (0, T.useRef)(Se ?? crypto.randomUUID()), G = (0, T.useRef)(Ce ? [
            ...Ce
        ] : []), K = (e)=>{
            G.current.push(e);
        }, q = (0, T.useRef)([]);
        (0, T.useEffect)(()=>{
            let t = e;
            !t || k.gameOver || G.current.length !== 0 && se({
                run_id: W.current,
                wallet_address: t,
                seed: k.seed,
                ship_id: E ?? `default`,
                is_daily: H,
                actions: G.current,
                turn: k.turn,
                score: k.score,
                saved_at: Date.now()
            });
        }, [
            k
        ]), (0, T.useEffect)(()=>{
            let e = G.current.length - 1;
            e < 0 || (q.current[e * 3] = k.score, q.current[e * 3 + 1] = k.ship.hull, q.current[e * 3 + 2] = k.rngState ?? -1);
        }, [
            k
        ]);
        let kt = (0, T.useRef)(0);
        (0, T.useEffect)(()=>{
            e && (Se || _e({
                run_id: W.current,
                wallet_address: e,
                username: r ?? null,
                seed: k.seed,
                is_daily: H,
                seed_token: ve ?? null
            }));
        }, []), (0, T.useEffect)(()=>{
            !e || k.gameOver || k.turn - kt.current < 3 || (kt.current = k.turn, me(W.current, {
                score: k.score,
                turn: k.turn,
                zone: k.currentZone ?? 1,
                gold: k.ship.gold,
                hull: k.ship.hull
            }));
        }, [
            k.turn
        ]), (0, T.useEffect)(()=>{
            if (!(!e || !k.gameOver) && !We.current) {
                if (We.current = !0, ue(W.current, {
                    score: k.score,
                    turn: k.turn,
                    zone: k.currentZone ?? 1,
                    gold: k.ship.gold,
                    hull: k.ship.hull,
                    run_title: k.runTitle
                }), !H && !mt.current) {
                    console.warn(`[approve] skip : seed local, run non soumise`), ie();
                    return;
                }
                de({
                    run_id: W.current,
                    wallet_address: e,
                    seed: k.seed,
                    ship_id: E ?? `default`,
                    is_daily: H,
                    actions: G.current,
                    checks: G.current.flatMap((e, t)=>[
                            q.current[t * 3] ?? -1,
                            q.current[t * 3 + 1] ?? -1,
                            q.current[t * 3 + 2] ?? -1
                        ]),
                    final_score: k.score,
                    final_turn: k.turn
                }).then(()=>ge(W.current)).then((e)=>{
                    e?.approved ? (Ve(!0), e.nft?.minted?.length && z(e.nft.minted.map((e)=>typeof e == `string` ? e : e.nft))) : console.warn(`[approve] refuse :`, e?.raison ?? e);
                }).catch((e)=>{
                    console.warn(`[approve]`, e), ee(`approve`, {
                        run_id: W.current
                    });
                }), ie();
            }
        }, [
            k.gameOver
        ]), (0, T.useEffect)(()=>{
            let e = ()=>ft(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [J, Y] = (0, T.useState)(null), [At, jt] = (0, T.useState)(!1), [Mt, Nt] = (0, T.useState)(!1), Pt = (0, T.useRef)(null), Ft = (0, T.useRef)(new Set), [It, Lt] = (0, T.useState)(null);
        (0, T.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !k.gameOver || !H || !e || !n || I && fe().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && Lt({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            k.gameOver,
            I
        ]);
        let Rt = (0, T.useRef)({
            x: k.ship.x,
            y: k.ship.y
        }), [zt, Bt] = (0, T.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [Vt, Ht] = (0, T.useState)({
            x: 0,
            y: 0
        }), [Ut, Wt] = (0, T.useState)(0);
        (0, T.useEffect)(()=>{
            let e = Rt.current, t = k.ship.x - e.x, n = k.ship.y - e.y;
            if (Rt.current = {
                x: k.ship.x,
                y: k.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = t === 1 ? 90 : t === -1 ? -90 : n === 1 ? 180 : 0;
            Wt((e)=>{
                let t = r - (e % 360 + 360) % 360;
                return t > 180 && (t -= 360), t < -180 && (t += 360), e + t;
            });
            let i = _t(k.ship.vision, V);
            Bt({
                x: t * i,
                y: n * i,
                instant: !0
            }), Ht({
                x: t,
                y: n
            });
            let a = setTimeout(()=>Ht({
                    x: 0,
                    y: 0
                }), 900), o = 0, s = requestAnimationFrame(()=>{
                o = requestAnimationFrame(()=>Bt({
                        x: 0,
                        y: 0,
                        instant: !1
                    }));
            });
            return ()=>{
                cancelAnimationFrame(s), cancelAnimationFrame(o), clearTimeout(a);
            };
        }, [
            k.ship.x,
            k.ship.y,
            V,
            k.ship.vision
        ]);
        let [Gt, Kt] = (0, T.useState)(!1), [X, qt] = (0, T.useState)(null), [Jt, Yt] = (0, T.useState)(!1), [Xt, Zt] = (0, T.useState)(!1), [Qt, $t] = (0, T.useState)(!1), [en, tn] = (0, T.useState)(!1), [nn, rn] = (0, T.useState)(!1), [an, on] = (0, T.useState)(!1), [sn, cn] = (0, T.useState)(!1), [ln, un] = (0, T.useState)(!1), [dn, fn] = (0, T.useState)(!1), [pn, mn] = (0, T.useState)(!1), [hn, gn] = (0, T.useState)(!1), [_n, vn] = (0, T.useState)(null), [yn, bn] = (0, T.useState)(0), xn = ()=>{
            Me(!0), setTimeout(()=>Me(!1), 400);
        }, Sn = (e)=>{
            vn(e), setTimeout(()=>vn(null), 150);
        }, Z = k, Cn = Math.min(100, (1 - Z.stormDistance / 10) * 100), wn = Z.ship.hull <= 5 ? `#ee4444` : Z.ship.hull <= 10 ? `#ee8844` : `#44cc88`, Tn = !Z.escapeUsed && Z.ship.upgrades.includes(`escape`) && Z.event && Z.event.choices[0].risk !== `safe`;
        (0, T.useEffect)(()=>{
            if (k.gameOver) return;
            let e = k.event?.cellType;
            if (!e || !ze[e] && !R[e] || Ft.current.has(e)) return;
            Ft.current.add(e), Y(e);
            let t = setTimeout(()=>Y(null), V ? 2200 : 5e3);
            return ()=>clearTimeout(t);
        }, [
            k.event,
            k.turn,
            V
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                gn(!1);
                return;
            }
            k.event?.cellType === `port` && !V && (gn(!0), setTimeout(()=>gn(!1), 5e3));
        }, [
            k.event,
            k.turn
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                cn(!1);
                return;
            }
            if (k.gameOver) {
                cn(!1);
                return;
            }
            if (k.event?.cellType === `rocks` && !V) {
                cn(!0);
                let e = setTimeout(()=>cn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.gameOver
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                un(!1);
                return;
            }
            if (k.event?.cellType === `treasure` && !V) {
                un(!0);
                let e = setTimeout(()=>un(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.turn
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                fn(!1);
                return;
            }
            if (k.event?.cellType === `cursed_treasure` && !V) {
                fn(!0);
                let e = setTimeout(()=>fn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.turn
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                mn(!1);
                return;
            }
            if (k.event?.cellType === `storm` && !V) {
                mn(!0);
                let e = setTimeout(()=>mn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.gameOver
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                rn(!1);
                return;
            }
            if (k.event?.cellType === `ancient_kraken` && !V) {
                rn(!0);
                let e = setTimeout(()=>rn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.gameOver
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                on(!1);
                return;
            }
            if (k.event?.cellType === `maelstrom` && !V) {
                on(!0);
                let e = setTimeout(()=>on(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.gameOver
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                tn(!1);
                return;
            }
            if (k.event?.cellType === `island` && !V) {
                tn(!0);
                let e = setTimeout(()=>tn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.gameOver
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                $t(!1);
                return;
            }
            if (k.gameOver) {
                $t(!1);
                return;
            }
            if (k.event?.cellType === `wreck` && !V) {
                $t(!0);
                let e = setTimeout(()=>$t(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.turn
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                Zt(!1);
                return;
            }
            if (k.gameOver) {
                Zt(!1);
                return;
            }
            if (k.event?.cellType === `pirate` && !V) {
                Zt(!0);
                let e = setTimeout(()=>Zt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.turn
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                Yt(!1);
                return;
            }
            if (k.event?.cellType === `kraken` && !V) {
                Yt(!0);
                let e = setTimeout(()=>Yt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            k.event,
            k.gameOver
        ]);
        let En = (0, T.useRef)(1);
        (0, T.useEffect)(()=>{
            let e = k.currentZone ?? 1;
            if (e > En.current) {
                let t = En.current, n = y[e], r = y[t]?.transitionText ?? [];
                Ze({
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
                }), it(0), En.current = e;
            }
        }, [
            k.currentZone
        ]), (0, T.useEffect)(()=>{
            if (!B) return;
            if (rt >= B.lines.length) {
                setTimeout(()=>Ze(null), 1e3);
                return;
            }
            let e = setTimeout(()=>it((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            B,
            rt
        ]), (0, T.useEffect)(()=>{
            k.dangerStreak > P.current && (P.current = k.dangerStreak);
        }, [
            k.dangerStreak
        ]), (0, T.useEffect)(()=>{
            if (k.gameOver) {
                let e = d(k);
                if (e.length > 0 && (Pe(e), D(`streak`)), k.score > 0) {
                    let t = S({
                        score: k.score,
                        turn: k.turn,
                        zone: k.currentZone ?? 1,
                        gold: k.ship.gold,
                        hunterAttacksSurvived: k.hunterAttacksSurvived ?? 0,
                        peakStreak: P.current,
                        hadStreak5: (k.exploits ?? []).includes(`streak5`)
                    }), n = new Set(e.map((e)=>e.id));
                    Ie(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (ot(t.pb), lt(!0));
                }
                if (ie(), V) Kt(!1), Y(`death`), Pt.current = setTimeout(()=>{
                    Nt((e)=>e || !0), Y(null);
                }, 2200);
                else {
                    let e = Dn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Kt(!1), Y(`death`), Pt.current = setTimeout(()=>{
                            Nt((e)=>e || !0), Y(null);
                        }, 9e3);
                    }, e);
                }
            } else Pt.current &&= (clearTimeout(Pt.current), null), Nt(!1), Y(null), Ft.current.clear(), P.current = 0, Ie([]), lt(!1);
        }, [
            k.gameOver
        ]);
        let Dn = (0, T.useRef)(!1), On = (0, T.useRef)(-99), kn = (0, T.useRef)(null);
        (0, T.useEffect)(()=>{
            k.log?.includes(`Tentacles rake the hull`) && (k.turn - On.current < 3 || (On.current = k.turn, kn.current && clearTimeout(kn.current), Dn.current = !0, Kt(!0), kn.current = setTimeout(()=>{
                Dn.current = !1, Kt(!1);
            }, V ? 2e3 : 3500)));
        }, [
            k.log,
            k.turn,
            V
        ]), (0, T.useEffect)(()=>{
            if (!Gt) return;
            let e = ()=>{
                Dn.current = !1, Kt(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            Gt
        ]), (0, T.useEffect)(()=>{
            if (k.log?.includes(`⚡ Storm surge`) && Sn(`rgba(100,150,255,0.35)`), (k.event?.cellType === `kraken` || k.event?.cellType === `ancient_kraken`) && Sn(`rgba(150,0,255,0.3)`), k.event?.cellType === `ancient_kraken` && Sn(`rgba(200,160,48,0.4)`), k.hunter?.active) {
                let e = wt(k);
                bn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else bn(0);
        }, [
            k
        ]), (0, T.useEffect)(()=>{
            let e = (e)=>{
                if (k.gameOver || k.event || k.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && An(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && An(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && An(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            k.gameOver,
            k.event,
            k.showPort,
            k.turn
        ]);
        let An = (e, t)=>{
            K(e === -1 ? 0 : e === 1 ? 2 : 1), A((n)=>c(n, e, t));
        }, jn = (e)=>{
            K(10 + e), A((t)=>{
                let n = o(t, e);
                return n.ship.hull < t.ship.hull && xn(), n;
            });
        }, Mn = ()=>{
            K(20), A((e)=>re(e));
        }, Nn = (e)=>{
            K(e === `hull` ? 30 : e === `weapon` ? 31 : 32), A((t)=>f(t, e));
        }, Pn = async ()=>{
            if (e) {
                Tt(!0), gt(!1);
                let t = await pe(e);
                if (Tt(!1), !t) {
                    gt(!0);
                    return;
                }
                mt.current = t.seed_token;
                let n = s(t.seed, E ?? `default`);
                G.current = [], q.current = [], kt.current = 0, W.current = crypto.randomUUID(), We.current = !1, Ve(!1), Ue(!1), z([]), _e({
                    run_id: W.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), A(n);
                return;
            }
            let t = s(void 0, E ?? `default`);
            G.current = [], q.current = [], kt.current = 0, W.current = crypto.randomUUID(), We.current = !1, Ve(!1), Ue(!1), z([]), A(t);
        }, Q = (0, T.useRef)(null), [$, Fn] = (0, T.useState)(!1);
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
            Q.current && (Q.current.muted = $), Te($);
        }, [
            $
        ]);
        let In = (0, T.useRef)({
            gold: k.ship.gold,
            hull: k.ship.hull,
            zone: k.currentZone ?? 1,
            over: k.gameOver,
            mult: k.scoreMultiplier ?? 1,
            hmode: k.hunter?.mode ?? ``,
            storm: k.stormDistance
        });
        return (0, T.useEffect)(()=>{
            let e = In.current, t = !!k.log?.includes(`Tentacles rake`);
            if (k.gameOver && !e.over) D(`death`);
            else if (!k.gameOver) {
                k.ship.gold > e.gold && D(`gold`), k.ship.gold < e.gold && k.showPort && D(`buy`), t ? D(`hunter_attack`) : k.ship.hull < e.hull && D(`damage`), (k.currentZone ?? 1) !== e.zone && D(`zone`), (k.scoreMultiplier ?? 1) > e.mult && D(`streak`);
                let n = k.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && D(`hunter_near`), k.stormDistance < e.storm && k.stormDistance <= 4 && k.stormDistance > 0 && (D(`thunder`), xn());
            }
            In.current = {
                gold: k.ship.gold,
                hull: k.ship.hull,
                zone: k.currentZone ?? 1,
                over: k.gameOver,
                mult: k.scoreMultiplier ?? 1,
                hmode: k.hunter?.mode ?? ``,
                storm: k.stormDistance
            };
            let n = (k.relics ?? []).length;
            if (n > Re.current) {
                let e = (k.relics ?? [])[n - 1], t = p(e);
                t && (Le(t), D(`streak`));
            }
            Re.current = n;
        }, [
            k
        ]), (0, O.jsxs)(i.div, {
            animate: je ? {
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
                boxShadow: Z.stormDistance <= 2 ? `inset 0 0 80px rgba(220,30,30,0.6)` : Z.stormDistance <= 4 ? `inset 0 0 50px rgba(220,100,30,0.3)` : `none`,
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
                                backgroundImage: `url(${L[Z.currentZone ?? 1] ?? L[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Z.currentZone ?? 1),
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
                                background: (Z.currentZone ?? 1) === 3 ? `radial-gradient(ellipse at 50% 42%, transparent 18%, rgba(50,8,70,0.35) 55%, rgba(0,0,0,0.72) 100%)` : (Z.currentZone ?? 1) === 2 ? `radial-gradient(ellipse at 50% 42%, transparent 20%, rgba(55,25,95,0.32) 58%, rgba(4,6,18,0.7) 100%)` : `radial-gradient(ellipse at 50% 42%, transparent 22%, rgba(15,55,85,0.28) 60%, rgba(4,10,18,0.65) 100%)`
                            }
                        }, `vig-${Z.currentZone ?? 1}`)
                    ]
                }),
                _n && (0, O.jsx)(i.div, {
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
                        background: _n,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                yn > 0 && (0, O.jsx)(i.div, {
                    animate: {
                        opacity: [
                            yn,
                            yn * .6,
                            yn
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
                Z.ship.hull <= 5 && !Z.gameOver && (0, O.jsx)(i.div, {
                    animate: {
                        opacity: [
                            .4,
                            0,
                            .4
                        ]
                    },
                    transition: {
                        repeat: 1 / 0,
                        duration: Z.ship.hull <= 1 ? .4 : Z.ship.hull <= 3 ? .6 : 1
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
                        padding: V ? `6px 8px` : `16px 28px`,
                        background: `rgba(6,11,18,0.92)`,
                        borderBottom: `1px solid rgba(255,255,255,0.06)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5
                    },
                    children: [
                        (0, O.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: V ? 6 : 10
                            },
                            children: [
                                (0, O.jsx)(`img`, {
                                    src: oe,
                                    style: {
                                        width: V ? 28 : 56,
                                        height: V ? 28 : 56,
                                        objectFit: `contain`
                                    }
                                }),
                                !V && ` CORSAIR`,
                                (()=>{
                                    let e = te.find((e)=>e.id === (Z.shipType ?? `default`)) ?? te[0];
                                    return (0, O.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: V ? 0 : 4,
                                            padding: V ? `2px 6px 2px 2px` : `3px 10px 3px 3px`,
                                            borderRadius: 8,
                                            border: `1px solid rgba(200,160,48,0.4)`,
                                            background: `rgba(200,160,48,0.1)`,
                                            fontSize: V ? 9 : 11,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: V ? 110 : 180,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, O.jsx)(`img`, {
                                                src: ne(e.id),
                                                alt: ``,
                                                style: {
                                                    width: V ? 22 : 28,
                                                    height: V ? 22 : 28,
                                                    borderRadius: 5,
                                                    objectFit: `cover`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            V ? e.name.replace(/^The /, ``) : e.name
                                        ]
                                    });
                                })()
                            ]
                        }),
                        (0, O.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: V ? 8 : 24
                            },
                            children: (V ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Z.ship.hull}/${Z.ship.maxHull}`,
                                    color: wn
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: Z.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: Z.ship.power,
                                    color: `#ee8844`
                                }
                            ] : [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Z.ship.hull}/${Z.ship.maxHull}`,
                                    color: wn
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: Z.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `vision`,
                                    label: `VISION`,
                                    val: (Z.visionBlind ?? 0) > 0 ? `${Z.ship.vision}~` : Z.ship.vision,
                                    color: (Z.visionBlind ?? 0) > 0 ? `#88aacc` : `#6aaccc`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: Z.ship.power,
                                    color: `#ee8844`
                                },
                                {
                                    icon: `turn`,
                                    label: `TURN`,
                                    val: Z.turn,
                                    color: `rgba(255,255,255,0.4)`
                                },
                                {
                                    icon: `turn`,
                                    label: (y[Z.currentZone ?? 1]?.name ?? `The Coasts`).toUpperCase(),
                                    val: ``,
                                    color: `#aa44ee`
                                }
                            ]).map((e)=>(0, O.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: V ? 10 : 17,
                                                color: `rgba(255,255,255,0.7)`,
                                                letterSpacing: 1,
                                                fontFamily: `'Pirata One', cursive`
                                            },
                                            children: e.label
                                        }),
                                        (0, O.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 4,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, O.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: Dt,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: V ? 24 : 40,
                                                        height: V ? 24 : 40,
                                                        objectFit: `contain`
                                                    }
                                                }),
                                                (0, O.jsx)(`span`, {
                                                    style: {
                                                        fontSize: V ? 14 : 22,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !V && (0, O.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 16
                            },
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, O.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 56,
                                                height: 56,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, O.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Z.score
                                        }),
                                        ` pts`
                                    ]
                                }),
                                (0, O.jsx)(`button`, {
                                    onClick: ()=>Fn((e)=>!e),
                                    "aria-label": $ ? `Unmute sound` : `Mute sound`,
                                    title: $ ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.1)`,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontSize: 11,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        borderRadius: 8,
                                        padding: `6px 10px`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: $ ? `MUTE` : `SOUND`
                                })
                            ]
                        }),
                        V && (0, O.jsxs)(`div`, {
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
                                        Z.score,
                                        `pts`
                                    ]
                                }),
                                (0, O.jsx)(`button`, {
                                    onClick: ()=>Fn((e)=>!e),
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
                V && (Z.relics ?? []).length > 0 && (0, O.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Z.relics ?? []).map((e)=>{
                        let t = p(e);
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
                                src: h(e),
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
                V && Z.hunter?.active && (()=>{
                    let e = vt(Z), t = wt(Z), n = yt(Z);
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
                                    (0, O.jsx)(w, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, O.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: Z.hunter.mode === `frenzy` ? `#ff6666` : Z.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            Ot(Z.hunter.mode),
                                            bt(Z.hunter.mode)
                                        ]
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: Ct(e)
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
                                                width: `${Z.hunter.awareness}%`,
                                                background: Z.hunter.awareness >= 80 ? `#ee4444` : Z.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`,
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
                                            Z.hunter.awareness,
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
                                width: V ? 0 : 260,
                                padding: V ? 0 : `16px 12px`,
                                overflow: `hidden`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 10,
                                borderRight: V ? `none` : `1px solid rgba(255,255,255,0.05)`,
                                transition: `width 0.3s`
                            },
                            children: [
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        background: Cn > 70 ? `rgba(180,30,30,0.2)` : `rgba(255,255,255,0.03)`,
                                        border: `1px solid ${Cn > 70 ? `rgba(220,50,50,0.5)` : `rgba(255,255,255,0.08)`}`,
                                        borderRadius: 10,
                                        padding: `12px 10px`
                                    },
                                    children: [
                                        (0, O.jsxs)(`div`, {
                                            style: {
                                                fontSize: 14,
                                                color: Cn > 70 ? `#ee4444` : `rgba(255,255,255,0.3)`,
                                                letterSpacing: 2,
                                                marginBottom: 6,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, O.jsx)(w, {
                                                    name: `storm`,
                                                    size: 16
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: 29,
                                                fontWeight: 700,
                                                color: Cn > 70 ? `#ee4444` : `#ee8844`
                                            },
                                            children: Z.stormDistance
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: 20,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                marginTop: 2
                                            },
                                            children: `turns until impact`
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 8
                                            },
                                            children: (0, O.jsx)(i.div, {
                                                animate: {
                                                    width: `${Cn}%`
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
                                Z.hunter?.active && (()=>{
                                    let e = vt(Z), t = wt(Z), n = yt(Z), r = t === `critical` || t === `danger`;
                                    return (0, O.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Z.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : Z.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 10,
                                            padding: `12px 10px`,
                                            marginTop: 4
                                        },
                                        children: [
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: r ? `#ff8899` : `rgba(200,100,220,0.8)`,
                                                    letterSpacing: 2,
                                                    marginBottom: 6,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 6
                                                },
                                                children: [
                                                    (0, O.jsx)(w, {
                                                        name: `kraken`,
                                                        size: 15
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    display: `inline-block`,
                                                    padding: `2px 10px`,
                                                    borderRadius: 6,
                                                    fontSize: 11,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 4,
                                                    background: Z.hunter.mode === `frenzy` ? `rgba(220,30,30,0.3)` : Z.hunter.mode === `stalking` ? `rgba(180,30,180,0.3)` : Z.hunter.mode === `searching` ? `rgba(30,100,180,0.3)` : `rgba(255,255,255,0.06)`,
                                                    color: Z.hunter.mode === `frenzy` ? `#ff6666` : Z.hunter.mode === `stalking` ? `#dd88ff` : Z.hunter.mode === `searching` ? `#66aaff` : `rgba(255,255,255,0.55)`,
                                                    border: `1px solid ${Z.hunter.mode === `frenzy` ? `rgba(220,30,30,0.6)` : Z.hunter.mode === `stalking` ? `rgba(180,30,180,0.5)` : `rgba(255,255,255,0.1)`}`
                                                },
                                                children: [
                                                    Ot(Z.hunter.mode),
                                                    bt(Z.hunter.mode)
                                                ]
                                            }),
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.45)`,
                                                    fontFamily: `'IM Fell English', cursive`,
                                                    lineHeight: 1.35,
                                                    marginBottom: 8
                                                },
                                                children: St(Z.hunter.mode)
                                            }),
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginBottom: 4
                                                },
                                                children: Ct(e)
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#ff8899`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    `Hit ≈ −`,
                                                    n,
                                                    ` hull`
                                                ]
                                            }),
                                            (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    letterSpacing: 1,
                                                    marginBottom: 4
                                                },
                                                children: [
                                                    `AWARENESS `,
                                                    Z.hunter.awareness,
                                                    `%`
                                                ]
                                            }),
                                            (0, O.jsx)(`div`, {
                                                style: {
                                                    height: 4,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2
                                                },
                                                children: (0, O.jsx)(i.div, {
                                                    animate: {
                                                        width: `${Z.hunter.awareness}%`
                                                    },
                                                    transition: {
                                                        duration: .5
                                                    },
                                                    style: {
                                                        height: 4,
                                                        borderRadius: 2,
                                                        background: Z.hunter.awareness >= 80 ? `#ee4444` : Z.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`
                                                    }
                                                })
                                            }),
                                            Z.hunter.awareness >= 80 && (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 10,
                                                    color: `#ff6677`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginTop: 6
                                                },
                                                children: `HIGH AWARENESS — it will not let go`
                                            })
                                        ]
                                    });
                                })(),
                                (0, O.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.6)`,
                                        letterSpacing: 2,
                                        marginTop: 8
                                    },
                                    children: `EQUIPPED`
                                }),
                                Z.ship.upgrades.length === 0 ? (0, O.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontStyle: `italic`
                                    },
                                    children: `None yet`
                                }) : Z.ship.upgrades.map((e)=>{
                                    let t = Ye.find((t)=>t.id === e);
                                    return (0, O.jsxs)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            color: Xe[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, O.jsx)(`img`, {
                                                src: qe[e],
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
                                Z.upgradeToken && (0, O.jsxs)(`div`, {
                                    style: {
                                        fontSize: 14,
                                        color: `#eedd44`,
                                        marginTop: 4,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, O.jsx)(w, {
                                            name: `star`,
                                            size: 14
                                        }),
                                        ` Free upgrade — claim it at a port`
                                    ]
                                }),
                                (0, O.jsxs)(`div`, {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.3)`,
                                                letterSpacing: 3,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 10
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 10
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: $e,
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
                                                    img: tt,
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
                                                    img: et,
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
                                                let t = Z.ship.levels[e.key], n = t === 2, r = e.color, a = [
                                                    `I`,
                                                    `II`,
                                                    `III`
                                                ];
                                                return (0, O.jsxs)(i.div, {
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
                                                        (0, O.jsxs)(`div`, {
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
                                                                        width: 22,
                                                                        height: 22,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, O.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: 1
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.3)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, O.jsxs)(`div`, {
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
                                                            ].map((e, o)=>(0, O.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        o > 0 && (0, O.jsx)(`div`, {
                                                                            style: {
                                                                                width: 10,
                                                                                height: 2,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, O.jsx)(i.div, {
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
                                                                            children: (0, O.jsx)(`span`, {
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
                        (0, O.jsx)(Et, {
                            state: Z,
                            isMobile: V,
                            slide: zt,
                            lurch: Vt,
                            heading: Ut,
                            onboard: j,
                            onDismissOnboard: U,
                            onMove: An
                        }),
                        (0, O.jsxs)(`div`, {
                            style: {
                                width: V ? 0 : 260,
                                minWidth: V ? 0 : 260,
                                padding: V ? 0 : `16px 12px`,
                                display: V ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 10,
                                borderLeft: `1px solid rgba(255,255,255,0.05)`,
                                pointerEvents: Z.showPort ? `none` : `auto`,
                                opacity: Z.showPort ? .4 : 1,
                                overflow: `hidden`
                            },
                            children: [
                                (0, O.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.9)`,
                                        letterSpacing: 2
                                    },
                                    children: `UPGRADES`
                                }),
                                (0, O.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 5,
                                        overflowY: `auto`
                                    },
                                    children: Ye.map((e)=>{
                                        let t = Z.ship.upgrades.includes(e.id), n = M.includes(e.id), r = Z.upgradeToken && Z.showPort, i = r ? 0 : e.cost, a = !t && !n && Z.ship.gold >= i && Z.showPort, o = Xe[e.build];
                                        return (0, O.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Z.showPort && (n ? N((t)=>t.filter((t)=>t !== e.id)) : a && N((t)=>[
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
                                                (0, O.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`
                                                    },
                                                    children: [
                                                        (0, O.jsxs)(`span`, {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: t ? o : `#ffffff`,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 4
                                                            },
                                                            children: [
                                                                (0, O.jsx)(`img`, {
                                                                    src: qe[e.id],
                                                                    style: {
                                                                        width: 24,
                                                                        height: 24,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                e.name
                                                            ]
                                                        }),
                                                        t ? (0, O.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, O.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, O.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: `#eedd44`
                                                            },
                                                            children: r && Z.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                (0, O.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, O.jsx)(Qe, {
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
                (0, O.jsx)(n, {
                    children: J && (ze[J] || R[J] || J === `death`) && (()=>{
                        let e = !V && !!ze[J], t = J === `death` ? L[Z.currentZone ?? 1] ?? R.storm : R[J] ?? null;
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
                                J === `death` && Nt(!0), Y(null);
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
                                    src: ze[J],
                                    autoPlay: !0,
                                    muted: $,
                                    playsInline: !0,
                                    preload: `metadata`,
                                    onEnded: ()=>{
                                        J === `death` && Nt(!0), Y(null);
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
                                        bottom: V ? `18%` : `12%`,
                                        left: 0,
                                        right: 0,
                                        textAlign: `center`,
                                        pointerEvents: `none`,
                                        padding: `0 16px`
                                    },
                                    children: [
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                fontSize: V ? 28 : 40,
                                                color: J === `death` ? `#ee6666` : `#e8e0d0`,
                                                fontFamily: `'Pirata One', cursive`,
                                                letterSpacing: 3,
                                                textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                            },
                                            children: Be[J] ?? ``
                                        }),
                                        (0, O.jsx)(`div`, {
                                            style: {
                                                marginTop: 10,
                                                fontSize: V ? 12 : 13,
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
                    children: B && (0, O.jsxs)(i.div, {
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
                        onClick: ()=>Ze(null),
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
                            L[B.zone] && (0, O.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${L[B.zone]})`,
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
                                children: (0, O.jsx)(w, {
                                    name: `vortex`,
                                    size: V ? 72 : 96
                                })
                            }),
                            (0, O.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: V ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: B.lines.slice(0, rt + 1).map((e, t)=>{
                                    let n = e === B.lines[B.lines.length - 1] && rt >= B.lines.length - 1, r = e === `You have entered:`;
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
                                            fontSize: n ? V ? 28 : 40 : r ? 14 : V ? 17 : 20,
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
                    children: F && (()=>{
                        let e = F.rarity === `legendary` ? `#eedd44` : F.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = F.rarity.toUpperCase();
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
                            onClick: ()=>Le(null),
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
                                                width: V ? 168 : 220,
                                                height: V ? 168 : 220,
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
                                                width: V ? 200 : 260,
                                                height: V ? 200 : 260,
                                                borderRadius: `50%`,
                                                border: `1px solid ${e}88`
                                            }
                                        }),
                                        (0, O.jsx)(`img`, {
                                            src: h(F.id),
                                            alt: ``,
                                            style: {
                                                position: `relative`,
                                                zIndex: 1,
                                                width: V ? 120 : 160,
                                                height: V ? 120 : 160,
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
                                        fontSize: V ? 30 : 40,
                                        color: e,
                                        letterSpacing: 2,
                                        textShadow: `0 0 30px ${e}66`,
                                        marginBottom: 14,
                                        textAlign: `center`,
                                        padding: `0 20px`
                                    },
                                    children: F.name
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
                                        fontSize: V ? 15 : 17,
                                        color: `rgba(255,255,255,0.75)`,
                                        maxWidth: 440,
                                        textAlign: `center`,
                                        lineHeight: 1.5,
                                        padding: `0 24px`,
                                        marginBottom: 32
                                    },
                                    children: F.desc
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
                    children: Z.event && !J && !Z.gameOver && !Z.showPort && Be[Z.event.cellType] && (0, O.jsx)(Ke, {
                        variant: `scene`,
                        event: Z.event,
                        isMobile: V,
                        gold: Z.ship.gold,
                        hull: Z.ship.hull,
                        relics: Z.relics,
                        score: Z.score,
                        onboard: j,
                        onDismissOnboard: U,
                        onChoose: jn,
                        canEscape: !!Tn,
                        onSkip: Mn
                    }, `event-scene`)
                }),
                (0, O.jsx)(n, {
                    children: Z.event && !J && !Z.gameOver && !Z.showPort && Z.event.cellType && !R[Z.event.cellType] && (0, O.jsx)(Ke, {
                        variant: `compact`,
                        event: Z.event,
                        isMobile: V,
                        gold: Z.ship.gold,
                        hull: Z.ship.hull,
                        relics: Z.relics,
                        cellIcon: pt[Z.event.cellType],
                        onboard: j,
                        onDismissOnboard: U,
                        onChoose: jn,
                        canEscape: !!Tn,
                        onSkip: Mn
                    }, `event-compact`)
                }),
                (0, O.jsx)(nt, {
                    open: !!Z.showPort && !Z.gameOver,
                    isMobile: V,
                    ship: Z.ship,
                    portUpgrades: Z.portUpgrades,
                    upgradeToken: !!Z.upgradeToken,
                    maxedComponents: Z.maxedComponents,
                    cart: M,
                    setCart: N,
                    onboard: j,
                    onDismissOnboard: U,
                    onUpgradeComponent: Nn,
                    onReroll: ()=>{
                        K(40), A((e)=>C(e));
                    },
                    freeReroll: Z.shipType === `merchant` && !!Z.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        K(n), A((n)=>m(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of M)K(50 + Je.indexOf(e));
                        K(70), A((e)=>{
                            let t = e;
                            for (let e of M)t = le(t, e);
                            return _(t);
                        }), N([]);
                    }
                }),
                (0, O.jsx)(ct, {
                    open: Mt,
                    state: Z,
                    isMobile: V,
                    isDailyRun: H,
                    personalBest: at,
                    isNewRecord: st,
                    newFeats: Ne,
                    nearFeats: Fe,
                    scoreSubmitted: I,
                    nftMinted: Ge,
                    walletAddress: e,
                    account: t,
                    onChainDone: He,
                    setOnChainDone: Ue,
                    submitting: ut,
                    setSubmitting: dt,
                    connecting: Ee,
                    onConnect: ()=>we(),
                    showGuestDailyCta: !!(e && De.current && !H && Oe && v),
                    onPlayDaily: v,
                    rangMois: It,
                    harborDown: ht,
                    restarting: xt,
                    onRestart: Pn,
                    onHome: u
                }),
                (0, O.jsx)(n, {
                    children: Gt && (0, O.jsxs)(i.div, {
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
                            V ? (0, O.jsx)(i.div, {
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
                                    background: V ? `radial-gradient(ellipse at center, rgba(80,0,100,0.35) 0%, rgba(0,0,0,0.65) 100%)` : `rgba(0,0,0,0.3)`
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
                                    bottom: V ? `22%` : `20%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: [
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: V ? 26 : 32,
                                            color: `#cc44ee`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                        },
                                        children: `THE HUNTER STRIKES!`
                                    }),
                                    (0, O.jsx)(`div`, {
                                        style: {
                                            fontSize: V ? 14 : 16,
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
                V && (0, O.jsxs)(O.Fragment, {
                    children: [
                        !Z.event && !Z.showPort && !Z.gameOver && (0, O.jsxs)(`div`, {
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
                                    onClick: ()=>qt(X === `ship` ? null : `ship`),
                                    "aria-label": `Show ship status`,
                                    "aria-expanded": X === `ship`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${X === `ship` ? `#44cc88` : `rgba(255,255,255,0.2)`}`,
                                        background: X === `ship` ? `rgba(68,204,136,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: X === `ship` ? `#44cc88` : `rgba(255,255,255,0.6)`,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: (0, O.jsx)(w, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, O.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>qt(X === `upgrades` ? null : `upgrades`),
                                    "aria-label": `Show upgrades`,
                                    "aria-expanded": X === `upgrades`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${X === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.2)`}`,
                                        background: X === `upgrades` ? `rgba(200,160,48,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: X === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.6)`,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: (0, O.jsx)(w, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, O.jsx)(n, {
                            children: X && (0, O.jsxs)(i.div, {
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
                                    X === `ship` && (0, O.jsxs)(O.Fragment, {
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
                                            Z.ship.upgrades.length === 0 ? (0, O.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Z.ship.upgrades.map((e)=>{
                                                let t = Ye.find((t)=>t.id === e);
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
                                                            src: qe[e],
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
                                            Z.upgradeToken && (0, O.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, O.jsx)(w, {
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
                                                    img: `/assets/power-CBX9SU5d.png`,
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
                                                    img: `/assets/vision-3Q65Za4i.png`,
                                                    color: `#6aaccc`,
                                                    levels: [
                                                        `V1`,
                                                        `V2`,
                                                        `V3`
                                                    ]
                                                }
                                            ].map((e)=>{
                                                let t = Z.ship.levels[e.key];
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
                                                            children: e.levels[t]
                                                        })
                                                    ]
                                                }, e.key);
                                            })
                                        ]
                                    }),
                                    X === `upgrades` && (0, O.jsxs)(O.Fragment, {
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
                                            Ye.map((e)=>{
                                                let t = Z.ship.upgrades.includes(e.id), n = Xe[e.build];
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
                                                                    src: qe[e.id],
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
                                                            children: (0, O.jsx)(Qe, {
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
                        X && (0, O.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>qt(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { W as default, __tla };
