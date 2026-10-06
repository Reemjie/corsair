import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { A as o, C as s, D as c, E as l, F as u, H as d, M as f, N as p, O as m, S as h, T as g, U as _, V as v, _ as ee, a as te, d as ne, f as y, g as re, i as b, j as x, k as ie, p as S, r as ae, t as oe, v as se, w as ce, x as C, y as le } from "./anchor-CJawS8b5.js";
import { a as ue, b as de, d as fe, h as pe, m as me, p as he, t as ge, x as _e, __tla as __tla_0 } from "./supabase-BXtpc1SX.js";
import { l as ve, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let U;
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
    var w = e(t(), 1), ye = `corsair_onboard_v1`;
    function T() {
        try {
            return new Set(JSON.parse(localStorage.getItem(ye) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function be(e) {
        let t = T();
        t.add(e);
        try {
            localStorage.setItem(ye, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function xe(e) {
        let t = T();
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
    function E(e) {
        if (!we) try {
            let t = Ce[e];
            t || (t = new Audio(`/sounds/${e}.wav`), Ce[e] = t), t.volume = Se[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var D = r();
    function Ee({ tip: e, isMobile: t, onDismiss: n }) {
        return (0, D.jsxs)(i.button, {
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
                (0, D.jsx)(`div`, {
                    style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: `#c8a030`,
                        fontFamily: `'Cinzel', serif`,
                        marginBottom: 4
                    },
                    children: e.title
                }),
                (0, D.jsx)(`div`, {
                    style: {
                        fontSize: t ? 13 : 15,
                        lineHeight: 1.35
                    },
                    children: e.text
                }),
                (0, D.jsx)(`div`, {
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
    var De = `/assets/careful-Cp7BVX84.png`, O = `/assets/cover-B_e5YbfY.png`, k = `/assets/cursed-DmavkUs_.png`, Oe = `/assets/detour-D8HBkeuW.png`, ke = `/assets/dock-ePamt-Sr.png`, Ae = `/assets/explore-CNxn52P4.png`, A = `/assets/fight-g8Kc5AC3.png`, je = `/assets/leave-CeE9NwgD.png`, Me = `/assets/lurks-BB0IX5ES.png`, Ne = `/assets/pact-DCE16eF-.png`, j = `/assets/push-DcLNLHxV.png`, M = `/assets/ritual-B5bqWt-6.png`, Pe = `/assets/sacrifice-KlI9xYLE.png`, Fe = `/assets/sail-yGR6Adzb.png`, Ie = `/assets/search-CSNg3Ko5.png`, Le = `/assets/speed-BTjZicNY.png`, N = `/assets/take-CO53AH6i.png`, P = `/assets/tribute-CcshN1U0.png`, Re = `/assets/vortex-l5f1oTMj.png`, ze = Object.fromEntries([
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
                "../../assets/choices/careful.png": De,
                "../../assets/choices/cover.png": O,
                "../../assets/choices/cursed.png": k,
                "../../assets/choices/detour.png": Oe,
                "../../assets/choices/dock.png": ke,
                "../../assets/choices/explore.png": Ae,
                "../../assets/choices/fight.png": A,
                "../../assets/choices/leave.png": je,
                "../../assets/choices/lurks.png": Me,
                "../../assets/choices/pact.png": Ne,
                "../../assets/choices/push.png": j,
                "../../assets/choices/ritual.png": M,
                "../../assets/choices/sacrifice.png": Pe,
                "../../assets/choices/sail.png": Fe,
                "../../assets/choices/search.png": Ie,
                "../../assets/choices/speed.png": Le,
                "../../assets/choices/take.png": N,
                "../../assets/choices/tribute.png": P,
                "../../assets/choices/vortex.png": Re
            })[`../../assets/choices/${e}.png`], import.meta.url).href
        ])), F = {
        1: `/scenes/island.jpg`,
        2: `/scenes/storm.jpg`,
        3: `/scenes/ancient-kraken.jpg`
    }, Be = {
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
    }, Ve = {
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
    }, He = {
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
    function Ue(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function We(e, t) {
        let n = Ue(e);
        return n === 0 || t >= n;
    }
    function Ge(e, t, n, r) {
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function Ke(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    function I(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, D.jsx)(`img`, {
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
        }) : (0, D.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function qe({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, score: s, cellIcon: c, onboard: l, onDismissOnboard: u, onChoose: d, canEscape: f, onSkip: p }) {
        let m = (0, D.jsx)(`div`, {
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
                let l = Ke(s.risk), u = We(s.desc, r), f = Ge(s, t.cellType, o, a), p = e === `scene` ? 1.04 : 1.02, m = e === `scene` ? .96 : .98;
                return (0, D.jsxs)(i.button, {
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
                        ze[s.icon] ? (0, D.jsx)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: (0, D.jsx)(`img`, {
                                src: ze[s.icon],
                                alt: ``,
                                style: {
                                    width: e === `scene` ? 72 : 40,
                                    height: e === `scene` ? 72 : 40,
                                    objectFit: `contain`
                                }
                            })
                        }) : (0, D.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 26 : 22,
                                marginBottom: 4
                            },
                            children: s.icon
                        }),
                        (0, D.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: l,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: s.label
                        }),
                        (0, D.jsx)(`div`, {
                            style: {
                                fontSize: 20,
                                color: `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: f
                        }),
                        (0, D.jsx)(`div`, {
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
        }), h = f && p ? (0, D.jsxs)(`button`, {
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
                (0, D.jsx)(y, {
                    name: `ship`,
                    size: 14
                }),
                ` Use Swift Sails (1 use left)`
            ]
        }) : null;
        return e === `scene` ? (0, D.jsxs)(i.div, {
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
                Be[t.cellType] && (0, D.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${Be[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, D.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                s != null && (0, D.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, D.jsxs)(`div`, {
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
                (0, D.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        l && u && (0, D.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, D.jsx)(Ee, {
                                tip: l,
                                isMobile: n,
                                onDismiss: u
                            })
                        }),
                        (0, D.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: 16,
                                paddingLeft: 8
                            },
                            children: (0, D.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 28 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: He[t.cellType] ?? t.cellType
                            })
                        }),
                        m,
                        h && (0, D.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: h
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, D.jsx)(i.div, {
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
            children: (0, D.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, D.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: I(c, 55)
                    }),
                    (0, D.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, D.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            l && u && (0, D.jsx)(Ee, {
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
    var L = {
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
    ], R = d.upgrades.costs, Ye = Math.round(d.storm.hunterSurgeBonus * 100), z = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: R.ghost,
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
            cost: R.rider,
            icon: `rider`,
            build: `escape`
        },
        {
            id: `greed`,
            name: `Cursed Greed`,
            pros: [
                `Gold x${d.greed.goldMultiplier} on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm worsens every 200g. Pirates hit harder at 400g+. Hunter aggro at 600g+.`
            ],
            cost: R.greed,
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
            cost: R.berserker,
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
                `Storm surges +${Ye}% more frequent.`
            ],
            cost: R.hunter,
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
            cost: R.escape,
            icon: `escape`,
            build: `escape`
        }
    ], Xe = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function B({ ok: e }) {
        return (0, D.jsx)(`span`, {
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
    function Ze({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, D.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, D.jsx)(B, {
                        ok: t
                    }),
                    (0, D.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, D.jsxs)(`div`, {
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
    var Qe = `/assets/hull-CGmPGbU0.png`, $e = `/assets/vision-3Q65Za4i.png`, et = `/assets/power-CBX9SU5d.png`;
    function tt({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, D.jsx)(n, {
            children: e && (0, D.jsxs)(i.div, {
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
                    (0, D.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, D.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, D.jsx)(`span`, {
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
                            u && d && (0, D.jsx)(Ee, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, D.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, D.jsx)(`div`, {
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
                                            return (0, D.jsxs)(`div`, {
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
                                                    (0, D.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, D.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, D.jsx)(`img`, {
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
                                                            (0, D.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, D.jsx)(`div`, {
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
                                                    (0, D.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: `rgba(255,255,255,0.6)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, D.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 11,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: t === 1 && s >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                    }),
                                                    a && (0, D.jsx)(`div`, {
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
                            (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, D.jsx)(i.button, {
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
                            (0, D.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: z.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = Xe[e.build];
                                    return (0, D.jsxs)(`div`, {
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
                                            (0, D.jsx)(`img`, {
                                                src: L[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, D.jsxs)(`div`, {
                                                children: [
                                                    (0, D.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                            fontFamily: `'Pirata One', cursive`
                                                        },
                                                        children: e.name
                                                    }),
                                                    (0, D.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, D.jsx)(Ze, {
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
                            r.upgrades.length + c.length >= 2 && (0, D.jsx)(`div`, {
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
                    (0, D.jsx)(`div`, {
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
                        ].map((e)=>(0, D.jsxs)(i.button, {
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
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `#44cc88`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: e.label
                                    }),
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.5)`
                                        },
                                        children: e.desc
                                    }),
                                    (0, D.jsxs)(`div`, {
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
                    (0, D.jsxs)(i.button, {
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
                            (0, D.jsx)(y, {
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
    var nt = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new ve({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function V(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: nt,
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
    function rt({ payload: e, isMobile: t, onShare: n }) {
        return (0, D.jsxs)(i.div, {
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
                (0, D.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, D.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, D.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, D.jsxs)(`div`, {
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
                (0, D.jsx)(`div`, {
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
                    ].map((e)=>(0, D.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, D.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, D.jsx)(`div`, {
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
                (0, D.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, D.jsxs)(`div`, {
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
                        (0, D.jsx)(i.button, {
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
    async function it(e) {
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
    function at(e) {
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
    function ot({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: o, isNewRecord: c, newFeats: l, nearFeats: u, scoreSubmitted: d, nftMinted: p, walletAddress: m, account: h, onChainDone: g, setOnChainDone: _, submitting: v, setSubmitting: ee, connecting: te, onConnect: ne, showGuestDailyCta: re, onPlayDaily: b, rangMois: x, harborDown: ie, restarting: S, onRestart: ae, onHome: oe }) {
        return (0, D.jsx)(n, {
            children: e && (0, D.jsxs)(i.div, {
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
                    (0, D.jsx)(i.div, {
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
                    (0, D.jsx)(i.div, {
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
                        children: (0, D.jsx)(y, {
                            name: `skull`,
                            size: 130
                        })
                    }),
                    (0, D.jsx)(i.div, {
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
                    (0, D.jsx)(i.div, {
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
                    (0, D.jsxs)(i.div, {
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
                        let e = at(t.log);
                        return (0, D.jsxs)(i.div, {
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
                                (0, D.jsxs)(`div`, {
                                    style: {
                                        fontSize: r ? 13 : 15,
                                        color: `#ee6655`,
                                        fontFamily: `'Cinzel', serif`,
                                        letterSpacing: 2
                                    },
                                    children: [
                                        (0, D.jsx)(y, {
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
                                (0, D.jsx)(`div`, {
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
                    l.length > 0 && (0, D.jsx)(i.div, {
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
                        children: l.map((e)=>(0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 10
                                },
                                children: [
                                    (0, D.jsx)(y, {
                                        name: e.icon,
                                        size: 26
                                    }),
                                    (0, D.jsxs)(`div`, {
                                        style: {
                                            textAlign: `left`
                                        },
                                        children: [
                                            (0, D.jsxs)(`div`, {
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
                                            (0, D.jsxs)(`div`, {
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
                    (u.length > 0 || !c && o > t.score) && (0, D.jsxs)(i.div, {
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
                            (0, D.jsx)(`div`, {
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
                            !c && o > t.score && (0, D.jsxs)(`div`, {
                                style: {
                                    fontFamily: `'IM Fell English', cursive`,
                                    fontSize: r ? 14 : 15,
                                    color: `rgba(255,255,255,0.75)`,
                                    textAlign: `center`,
                                    marginBottom: u.length ? 8 : 0
                                },
                                children: [
                                    o - t.score,
                                    ` pts short of your best (`,
                                    o.toLocaleString(),
                                    `)`
                                ]
                            }),
                            u.map((e)=>(0, D.jsxs)(`div`, {
                                    style: {
                                        marginTop: 8
                                    },
                                    children: [
                                        (0, D.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                justifyContent: `space-between`,
                                                gap: 8,
                                                alignItems: `baseline`,
                                                marginBottom: 4
                                            },
                                            children: [
                                                (0, D.jsx)(`div`, {
                                                    style: {
                                                        fontFamily: `'Pirata One', cursive`,
                                                        fontSize: 15,
                                                        color: `#c8e8ff`
                                                    },
                                                    children: e.feat.name
                                                }),
                                                (0, D.jsxs)(`div`, {
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
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                borderRadius: 2,
                                                background: `rgba(255,255,255,0.08)`,
                                                overflow: `hidden`,
                                                marginBottom: 4
                                            },
                                            children: (0, D.jsx)(`div`, {
                                                style: {
                                                    height: `100%`,
                                                    width: `${Math.round(e.ratio * 100)}%`,
                                                    background: `linear-gradient(90deg,#2a6a8a,#88ddff)`,
                                                    borderRadius: 2
                                                }
                                            })
                                        }),
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                fontFamily: `'IM Fell English', cursive`,
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.55)`
                                            },
                                            children: e.line
                                        })
                                    ]
                                }, e.feat.id)),
                            !a && !C() && b && m && (0, D.jsx)(`div`, {
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
                            !a && !C() && !m && (0, D.jsx)(`div`, {
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
                    (0, D.jsx)(i.div, {
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
                                color: c ? `#44ffaa` : `rgba(255,255,255,0.3)`
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
                        ].map((e)=>(0, D.jsxs)(`div`, {
                                style: {
                                    textAlign: `center`
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 10 : 13,
                                            color: `rgba(255,255,255,0.3)`,
                                            letterSpacing: r ? 1 : 3,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: e.label
                                    }),
                                    (0, D.jsx)(`div`, {
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
                    t.scoreBreakdown && (0, D.jsxs)(i.div, {
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
                            (0, D.jsx)(`div`, {
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
                            ].filter((e)=>e.val > 0).map((e)=>(0, D.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        marginBottom: 3
                                    },
                                    children: [
                                        (0, D.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.4)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1
                                            },
                                            children: e.label
                                        }),
                                        (0, D.jsxs)(`span`, {
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
                    (0, D.jsxs)(i.div, {
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
                            (0, D.jsx)(`div`, {
                                children: a ? s() ? `Seed: ${t.seed} — Daily Key: ${le()}` : `Blind daily — seed revealed at 00:00 UTC` : `Seed: ${t.seed} — challenge your crew!`
                            }),
                            a && (0, D.jsxs)(`div`, {
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
                    (0, D.jsxs)(i.div, {
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
                            h && !g && (0, D.jsx)(i.button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                disabled: v,
                                onClick: async ()=>{
                                    ee(!0);
                                    try {
                                        await V(h, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                    } catch (e) {
                                        console.warn(`On-chain submit failed:`, e);
                                    }
                                    _(!0), ee(!1);
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
                                children: v ? `ENGRAVING...` : (0, D.jsxs)(D.Fragment, {
                                    children: [
                                        (0, D.jsx)(y, {
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
                            (0, D.jsx)(`div`, {
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
                            d && (0, D.jsx)(`div`, {
                                style: {
                                    fontSize: 14,
                                    color: `#44cc88`,
                                    letterSpacing: 2,
                                    fontFamily: `'Pirata One', cursive`
                                },
                                children: `✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD`
                            }),
                            p.length > 0 && (0, D.jsxs)(i.div, {
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
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            marginBottom: 4
                                        },
                                        children: (0, D.jsx)(y, {
                                            name: `flag`,
                                            size: 24
                                        })
                                    }),
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `#FFD700`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 2
                                        },
                                        children: `NFT EARNED!`
                                    }),
                                    p.map((e)=>(0, D.jsx)(`div`, {
                                            style: {
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'Cinzel', serif`,
                                                marginTop: 4
                                            },
                                            children: e.replace(/_/g, ` `).toUpperCase()
                                        }, e)),
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginTop: 8,
                                            lineHeight: 1.4
                                        },
                                        children: `Your NFT will be sent to your wallet soon.`
                                    }),
                                    (0, D.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ()=>{
                                            let e = `🏴‍☠️ I earned "${p[0].replace(/_/g, ` `).replace(/\b\w/g, (e)=>e.toUpperCase())}" — a Genesis NFT in Corsair.\nNo mint button. No whitelist. Just sail, meet the condition, claim it before it's SOLD OUT.\nDare to find yours? ⚓\nhttps://playcorsair.xyz/`;
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
                            !m && (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `This run stayed local. Connect a wallet to submit scores, play the Daily, and earn NFTs.`
                                    }),
                                    (0, D.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ne,
                                        disabled: te,
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
                                        children: te ? `CONNECTING...` : `CONNECT WALLET`
                                    })
                                ]
                            }),
                            re && b && (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `Wallet linked. This run stayed local — sail the Daily to climb today's board.`
                                    }),
                                    (0, D.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: b,
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
                                }, i = (t.relics ?? []).map((e)=>f(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = x ? `\n⚔️ #${x.rank} in Starktember — ${x.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair https://playcorsair.xyz/ #Starktember #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/ #Starknet`, l = at(t.log);
                                return (0, D.jsx)(rt, {
                                    isMobile: r,
                                    onShare: ()=>{
                                        it(c);
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
                            (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    ie && (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try Sail again when you're back online`
                                    }),
                                    (0, D.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 12,
                                            flexWrap: `wrap`,
                                            justifyContent: `center`
                                        },
                                        children: [
                                            !a && !C() && b && m && (0, D.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: b,
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
                                            (0, D.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ae,
                                                disabled: S,
                                                style: {
                                                    padding: `14px 36px`,
                                                    borderRadius: 12,
                                                    border: `2px solid rgba(200,160,48,0.6)`,
                                                    background: `rgba(80,60,10,0.5)`,
                                                    color: `#c8a030`,
                                                    cursor: S ? `wait` : `pointer`,
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    boxShadow: `0 0 20px rgba(200,160,48,0.2)`,
                                                    opacity: S ? .7 : 1
                                                },
                                                children: S ? `PREPARING…` : `SAIL AGAIN`
                                            }),
                                            (0, D.jsx)(i.button, {
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
    var st = {
        sea: `〰`,
        storm: `/icons_ui/storm.png`,
        pirate: `/icons_ui/swords.png`,
        treasure: `/icons_ui/treasure.png`,
        port: `/icons/port.png`,
        kraken: `/icons_ui/kraken.png`,
        wreck: `/icons/wreck.png`,
        island: `/icons/island.png`,
        rocks: `/icons/rocks.png`
    }, ct = {
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
    }, lt = {
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
    function ut(e) {
        let t = e.hunter;
        return t?.active ? Math.abs(t.x - e.ship.x) + Math.abs(t.y - e.ship.y) : 99;
    }
    function dt(e) {
        let t = (e.relics ?? []).includes(`black_flag`) ? 2 : 0, n = Math.max(d.hunter.minDamage, d.hunter.baseDamage - e.ship.power) + t;
        return v(e.ship.upgrades, n);
    }
    function ft(e) {
        return e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`;
    }
    function pt(e) {
        return e === `frenzy` ? `ENR` : e === `stalking` ? `STK` : e === `searching` ? `SRC` : `TRK`;
    }
    function mt(e) {
        return e === `frenzy` ? `Knows where you are · strikes hard` : e === `stalking` ? `Cuts your path · moves every turn` : e === `searching` ? `Lost your trail · wandering` : `Following your wake · every other turn`;
    }
    function ht(e) {
        return e <= 0 ? `ON YOU` : e === 1 ? `1 CELL — NEXT HIT` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`;
    }
    function gt(e) {
        if (!e.hunter?.active) return `calm`;
        let t = ut(e);
        return t <= 1 || e.hunter.mode === `frenzy` ? `critical` : t <= 3 || e.hunter.awareness >= 80 ? `danger` : t <= 5 || e.hunter.mode === `stalking` ? `watch` : `calm`;
    }
    function _t(e) {
        if (!e.hunter?.active) return ``;
        let t = ut(e), n = dt(e), r = ft(e.hunter.mode);
        return t <= 1 ? `${r} · STRIKE ~−${n} hull` : `${r} · ${t} away · hit ~−${n}`;
    }
    var H = `/icons/sea.png`, vt = {
        1: `rgba(6,14,22,0.82)`,
        2: `rgba(6,10,22,0.86)`,
        3: `rgba(4,6,14,0.9)`
    };
    function yt({ state: e, isMobile: t, slide: n, lurch: r, onboard: a, onDismissOnboard: o, onMove: s }) {
        let c = e.ship.vision * 2 + 1, l = t ? 240 : 210, u = Math.max(180, window.innerHeight - l), d = t ? window.innerWidth - 16 : Math.min(window.innerWidth * .48, 560), m = Math.max(28, Math.floor(Math.min(d, u) / c) - 4), h = !e.event && !e.showPort && !e.gameOver && (t ? (0, D.jsx)(`div`, {
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
            ].map((e)=>(0, D.jsx)(`button`, {
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
        }) : (0, D.jsxs)(`div`, {
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
                (0, D.jsx)(`span`, {
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
                ].map((e)=>(0, D.jsxs)(`button`, {
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
                            (0, D.jsx)(`span`, {
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
        }));
        return (0, D.jsxs)(`div`, {
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
                t && (0, D.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12,
                        marginBottom: 6,
                        fontSize: 13,
                        fontFamily: `'Cinzel', serif`,
                        flexShrink: 0
                    },
                    children: [
                        (0, D.jsxs)(`span`, {
                            style: {
                                color: e.stormDistance <= 4 ? `#ee4444` : `#ee8844`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, D.jsx)(y, {
                                    name: `storm`,
                                    size: 13
                                }),
                                ` `,
                                e.stormDistance,
                                ` turns`
                            ]
                        }),
                        (0, D.jsx)(`span`, {
                            style: {
                                color: `#cc44ee`
                            },
                            children: _[e.currentZone ?? 1]?.name ?? `The Coasts`
                        }),
                        (0, D.jsxs)(`span`, {
                            style: {
                                color: `#eedd44`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, D.jsx)(y, {
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
                a && !e.event && !e.showPort && !e.gameOver && (0, D.jsx)(Ee, {
                    tip: a,
                    isMobile: t,
                    onDismiss: o
                }),
                (0, D.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        flexShrink: 0
                    },
                    children: [
                        e.hunter?.active && !e.gameOver && (()=>{
                            let n = gt(e), r = _t(e), a = n === `critical` ? `rgba(160,10,30,0.92)` : n === `danger` ? `rgba(100,20,50,0.88)` : n === `watch` ? `rgba(70,20,90,0.85)` : `rgba(40,20,60,0.8)`, o = n === `critical` ? `rgba(255,80,100,0.75)` : n === `danger` ? `rgba(255,120,80,0.55)` : `rgba(180,80,220,0.45)`;
                            return (0, D.jsxs)(i.div, {
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
                                    (0, D.jsx)(y, {
                                        name: `kraken`,
                                        size: t ? 14 : 16
                                    }),
                                    (0, D.jsx)(`div`, {
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
                        })(),
                        (0, D.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)`,
                                pointerEvents: `none`,
                                zIndex: 2,
                                borderRadius: 8
                            }
                        }),
                        F[e.currentZone ?? 1] && (0, D.jsx)(`div`, {
                            "aria-hidden": !0,
                            style: {
                                position: `absolute`,
                                inset: -6,
                                zIndex: 0,
                                borderRadius: 14,
                                overflow: `hidden`,
                                backgroundImage: `url(${F[e.currentZone ?? 1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                opacity: .14,
                                filter: `saturate(0.55) brightness(0.45)`,
                                pointerEvents: `none`
                            }
                        }),
                        (0, D.jsxs)(`div`, {
                            style: {
                                position: `relative`,
                                zIndex: 1,
                                display: `grid`,
                                gridTemplateColumns: `repeat(${c},1fr)`,
                                gap: 4,
                                transform: `translate(${n.x}px, ${n.y}px)`,
                                transition: n.instant ? `none` : `transform 420ms cubic-bezier(0.22, 1, 0.36, 1)`,
                                willChange: `transform`
                            },
                            children: [
                                Array.from({
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
                                        })(), c = (e.relics ?? []).includes(`kraken_eye`) || e.shipType === `specter`, l = !!(e.hunter?.active && Math.abs(e.hunter.x - e.ship.x) <= e.ship.vision && Math.abs(e.hunter.y - e.ship.y) <= e.ship.vision) && (c || e.hunter?.mode !== `tracking`) && s.has(`${a}-${o}`) && !(a === e.hunter.x && o === e.hunter.y), u = a >= 0 && a < 12 && o >= 0 && o < 12 ? e.grid[o][a] : {
                                            type: `sea`,
                                            revealed: !1,
                                            visited: !1,
                                            value: 0
                                        }, d = e.ship.x + n, f = e.ship.y + t, p = e.hunter?.active && e.hunter.x === d && e.hunter.y === f, h = e.hunter?.active ? ut(e) : 99, g = n === 0 && t === 0, _ = u.revealed || u.visited, v = u.stormed, ee = e.stormDistance <= 0 ? -1 : e.grid.length + 2 - Math.floor((10 - e.stormDistance) / 3), te = v && o === ee, y = e.currentZone ?? 1, re = ct[y] ?? ct[1], b = lt[y] ?? lt[1], x = v ? `#cc2222` : b[u.type], ie = g ? `#0a2a4a` : p ? e.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : v ? `rgba(90,12,18,0.78)` : _ ? re[u.type] ?? `#050a0f` : vt[y] ?? vt[1], S = `${Math.abs(d) * 47 % 85}% ${Math.abs(f) * 31 % 85}%`, ae = !g && !p, oe = v ? .38 : _ ? u.type === `sea` ? .88 : u.visited ? .28 : .42 : .2, se = v ? `hue-rotate(-25deg) saturate(0.55) brightness(0.45)` : _ ? y === 2 ? `hue-rotate(18deg) saturate(0.8) brightness(0.72)` : y === 3 ? `hue-rotate(-12deg) saturate(0.45) brightness(0.42)` : `saturate(0.95) brightness(0.88)` : y === 3 ? `brightness(0.18) saturate(0.3)` : y === 2 ? `hue-rotate(20deg) brightness(0.22) saturate(0.45)` : `brightness(0.28) saturate(0.5)`;
                                        return (0, D.jsxs)(i.div, {
                                            className: te ? `storm-front` : void 0,
                                            initial: _ ? {
                                                opacity: 0,
                                                scale: .8
                                            } : !1,
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            style: {
                                                width: m,
                                                height: m,
                                                background: `#050a0f`,
                                                border: g ? h <= 1 ? `2px solid #ee4466` : `2px solid #4a8acc` : p ? `2px solid ${e.hunter?.mode === `frenzy` ? `#ff4466` : e.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : v ? `1px solid #cc222244` : _ ? `1px solid ${x ? x + `55` : `rgba(255,255,255,0.1)`}` : `1px solid rgba(255,255,255,0.04)`,
                                                borderRadius: 8,
                                                display: `flex`,
                                                alignItems: `center`,
                                                justifyContent: `center`,
                                                fontSize: g ? 26 : 20,
                                                boxShadow: p ? `0 0 ${h <= 2 ? 22 : 14}px ${e.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : g ? h <= 1 ? `0 0 22px rgba(238,68,102,0.55)` : `0 0 20px rgba(74,138,204,0.4)` : x && _ ? `0 0 10px ${x}44` : `none`,
                                                position: `relative`,
                                                cursor: `default`,
                                                overflow: `hidden`
                                            },
                                            children: [
                                                ae && (0, D.jsx)(`div`, {
                                                    "aria-hidden": !0,
                                                    style: {
                                                        position: `absolute`,
                                                        inset: 0,
                                                        borderRadius: 7,
                                                        backgroundImage: `url(${H})`,
                                                        backgroundSize: `155%`,
                                                        backgroundPosition: S,
                                                        opacity: oe,
                                                        filter: se,
                                                        pointerEvents: `none`
                                                    }
                                                }),
                                                (0, D.jsx)(`div`, {
                                                    "aria-hidden": !0,
                                                    style: {
                                                        position: `absolute`,
                                                        inset: 0,
                                                        borderRadius: 7,
                                                        background: ie,
                                                        opacity: g || p ? 1 : _ ? u.type === `sea` ? .28 : .52 : .72,
                                                        pointerEvents: `none`
                                                    }
                                                }),
                                                g && (0, D.jsxs)(D.Fragment, {
                                                    children: [
                                                        (0, D.jsx)(i.div, {
                                                            animate: {
                                                                rotate: r.x * 10,
                                                                y: r.y * 5,
                                                                scale: r.x || r.y ? 1.06 : 1
                                                            },
                                                            transition: {
                                                                type: `spring`,
                                                                stiffness: 200,
                                                                damping: 11
                                                            },
                                                            style: {
                                                                transformOrigin: `50% 75%`,
                                                                position: `relative`,
                                                                zIndex: 1
                                                            },
                                                            children: (0, D.jsx)(i.div, {
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
                                                                children: (0, D.jsx)(`img`, {
                                                                    src: ne(e.shipType ?? `default`),
                                                                    alt: ``,
                                                                    style: {
                                                                        width: m * .82,
                                                                        height: m * .82,
                                                                        objectFit: `cover`,
                                                                        borderRadius: 8,
                                                                        border: `1px solid rgba(200,160,48,0.45)`,
                                                                        filter: `drop-shadow(0 0 10px rgba(74,138,204,0.9))`
                                                                    }
                                                                })
                                                            })
                                                        }),
                                                        (0, D.jsxs)(`div`, {
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
                                                                (0, D.jsx)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        height: 3,
                                                                        background: `rgba(0,0,0,0.5)`,
                                                                        borderRadius: 2
                                                                    },
                                                                    children: (0, D.jsx)(`div`, {
                                                                        style: {
                                                                            width: `${e.ship.hull / e.ship.maxHull * 100}%`,
                                                                            height: `100%`,
                                                                            borderRadius: 2,
                                                                            background: e.ship.hull <= 5 ? `#ee4444` : e.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                            transition: `width 0.3s`
                                                                        }
                                                                    })
                                                                }),
                                                                (0, D.jsx)(`div`, {
                                                                    style: {
                                                                        fontSize: Math.max(7, m * .16),
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
                                                !p && !g && !_ && u.type === `portal` && (0, D.jsx)(i.div, {
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
                                                    children: (0, D.jsx)(`img`, {
                                                        src: `/icons/portal.png`,
                                                        alt: ``,
                                                        style: {
                                                            width: m * .72,
                                                            height: m * .72,
                                                            objectFit: `contain`,
                                                            filter: `drop-shadow(0 0 6px #aa77ff)`,
                                                            mixBlendMode: `screen`
                                                        }
                                                    })
                                                }),
                                                !p && !g && _ && u.type !== `sea` && (0, D.jsx)(`img`, {
                                                    src: `/icons/${u.type}.png`,
                                                    style: {
                                                        width: m * .82,
                                                        height: m * .82,
                                                        opacity: u.visited ? .35 : 1,
                                                        objectFit: `contain`,
                                                        mixBlendMode: `screen`,
                                                        position: `relative`,
                                                        zIndex: 1
                                                    }
                                                }),
                                                !p && !g && _ && u.type === `sea` && (0, D.jsx)(`div`, {
                                                    "aria-hidden": !0,
                                                    className: `sea-shimmer`,
                                                    style: {
                                                        position: `absolute`,
                                                        inset: 0,
                                                        zIndex: 1,
                                                        borderRadius: 7,
                                                        pointerEvents: `none`
                                                    }
                                                }),
                                                p && !g && (0, D.jsxs)(i.div, {
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
                                                        (0, D.jsx)(`img`, {
                                                            src: `/icons/hunter.png`,
                                                            style: {
                                                                width: m * .82,
                                                                height: m * .82,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, D.jsxs)(`div`, {
                                                            style: {
                                                                position: `absolute`,
                                                                left: `50%`,
                                                                bottom: -2,
                                                                transform: `translateX(-50%)`,
                                                                fontSize: Math.max(7, m * .14),
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
                                                                pt(e.hunter.mode),
                                                                ` `,
                                                                h <= 1 ? `HIT` : h
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                l && !g && !p && (0, D.jsx)(i.div, {
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
                                                p && !g && !_ && (0, D.jsx)(i.div, {
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
                                                    children: (0, D.jsx)(`img`, {
                                                        src: `/icons/hunter.png`,
                                                        style: {
                                                            width: m * .82,
                                                            height: m * .82,
                                                            objectFit: `contain`,
                                                            opacity: .4,
                                                            filter: `grayscale(0.8) brightness(0.5)`
                                                        }
                                                    })
                                                }),
                                                !p && !g && !_ && u.type !== `portal` && (0, D.jsx)(`span`, {
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
                                    })),
                                `)`
                            ]
                        })
                    ]
                }),
                !t && h,
                e.dangerStreak > 0 && (0, D.jsxs)(i.div, {
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
                        e.scoreMultiplier > 1 && (0, D.jsxs)(`div`, {
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
                                e.scoreMultiplier >= 3 ? (0, D.jsxs)(`span`, {
                                    style: {
                                        display: `inline-flex`,
                                        alignItems: `center`,
                                        gap: 2
                                    },
                                    children: [
                                        (0, D.jsx)(y, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, D.jsx)(y, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, D.jsx)(y, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        })
                                    ]
                                }) : (0, D.jsx)(y, {
                                    name: `fire`,
                                    size: t ? 16 : 20
                                }),
                                (0, D.jsxs)(`span`, {
                                    children: [
                                        `×`,
                                        e.scoreMultiplier,
                                        ` COMBO`
                                    ]
                                })
                            ]
                        }),
                        (0, D.jsxs)(`div`, {
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
                                e.dangerStreak >= 3 && (0, D.jsx)(`span`, {
                                    style: {
                                        color: `#ee8844`,
                                        marginLeft: 10
                                    },
                                    children: `HUNTER ALERT`
                                }),
                                e.dangerStreak >= 4 && (0, D.jsx)(`span`, {
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
                e.ship.upgrades.includes(`hunter`) && (0, D.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        marginBottom: 8,
                        flexShrink: 0
                    },
                    children: [
                        (0, D.jsx)(`div`, {
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
                        (0, D.jsx)(`div`, {
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
                                    return (0, D.jsx)(`div`, {
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
                (0, D.jsx)(`div`, {
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
                        return (0, D.jsxs)(D.Fragment, {
                            children: [
                                (0, D.jsxs)(`div`, {
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
                                i && (0, D.jsxs)(`div`, {
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
                e.portalHint && (0, D.jsxs)(`div`, {
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
                        (0, D.jsx)(y, {
                            name: `vortex`,
                            size: 14
                        }),
                        ` `,
                        e.portalHint,
                        ` `,
                        (0, D.jsx)(y, {
                            name: `vortex`,
                            size: 14
                        })
                    ]
                }),
                (e.relics ?? []).length > 0 && !t && (0, D.jsx)(`div`, {
                    style: {
                        marginTop: 8,
                        display: `flex`,
                        gap: 6,
                        justifyContent: `center`,
                        flexWrap: `wrap`,
                        flexShrink: 0
                    },
                    children: (e.relics ?? []).map((e)=>{
                        let t = f(e);
                        return t ? (0, D.jsxs)(`div`, {
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
                                (0, D.jsx)(`img`, {
                                    src: p(t.id),
                                    alt: ``,
                                    style: {
                                        width: 18,
                                        height: 18,
                                        borderRadius: 4,
                                        objectFit: `cover`
                                    }
                                }),
                                (0, D.jsx)(`span`, {
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
                t && h,
                t && (0, D.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        flexShrink: 0,
                        height: `calc(112px + env(safe-area-inset-bottom))`
                    }
                })
            ]
        });
    }
    var bt = `/icons/gold.png`, xt = (e, t = 14)=>(0, D.jsx)(y, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    U = function({ walletAddress: e, account: t, username: r, onHome: s, onPlayDaily: d, dailySeed: v, isDaily: ve, seedToken: ye, shipId: T, resumeState: Se, resumeRunId: Ce, resumeActions: we }) {
        let { connect: Ee, connecting: De } = a(), [O, k] = (0, w.useState)(()=>Se ?? h(v, T ?? `default`)), Oe = (0, w.useRef)(!e), [ke, Ae] = (0, w.useState)(()=>!C()), [A, je] = (0, w.useState)(null), [Me, Ne] = (0, w.useState)(!1), [j, M] = (0, w.useState)([]), [Pe, Fe] = (0, w.useState)([]), [Ie, Le] = (0, w.useState)([]), N = (0, w.useRef)(0), [P, Re] = (0, w.useState)(null), ze = (0, w.useRef)((O.relics ?? []).length), [Ue, We] = (0, w.useState)(!1), [Ge, Ke] = (0, w.useState)(!1), I = (0, w.useRef)(!1), [R, Ye] = (0, w.useState)([]), [B, nt] = (0, w.useState)(null), [V, rt] = (0, w.useState)(0), [it, at] = (0, w.useState)(()=>ae()), [ct, lt] = (0, w.useState)(!1), [pt, _t] = (0, w.useState)(!1), [H, vt] = (0, w.useState)(window.innerWidth < 768), U = ve === !0, St = (0, w.useRef)(ye), [Ct, wt] = (0, w.useState)(!1), [Tt, Et] = (0, w.useState)(!1);
        (0, w.useEffect)(()=>{
            if (O.gameOver) {
                je(null);
                return;
            }
            O.turn > 0 && be(`sail`), je(xe(O));
        }, [
            O.turn,
            O.event,
            O.showPort,
            O.hunter?.active,
            O.stormDistance,
            O.gameOver
        ]);
        let Dt = ()=>{
            A && (be(A.id), je(null));
        };
        (0, w.useEffect)(()=>{
            U && (g(), e && le());
        }, []), (0, w.useEffect)(()=>{
            if (!e) {
                Ae(!C());
                return;
            }
            he(e, le()).then((e)=>Ae(!(e || C())));
        }, [
            e
        ]);
        let W = (0, w.useRef)(Ce ?? crypto.randomUUID()), G = (0, w.useRef)(we ? [
            ...we
        ] : []), K = (e)=>{
            G.current.push(e);
        }, q = (0, w.useRef)([]);
        (0, w.useEffect)(()=>{
            let t = e;
            !t || O.gameOver || G.current.length !== 0 && ee({
                run_id: W.current,
                wallet_address: t,
                seed: O.seed,
                ship_id: T ?? `default`,
                is_daily: U,
                actions: G.current,
                turn: O.turn,
                score: O.score,
                saved_at: Date.now()
            });
        }, [
            O
        ]), (0, w.useEffect)(()=>{
            let e = G.current.length - 1;
            e < 0 || (q.current[e * 3] = O.score, q.current[e * 3 + 1] = O.ship.hull, q.current[e * 3 + 2] = O.rngState ?? -1);
        }, [
            O
        ]);
        let Ot = (0, w.useRef)(0);
        (0, w.useEffect)(()=>{
            e && (Ce || _e({
                run_id: W.current,
                wallet_address: e,
                username: r ?? null,
                seed: O.seed,
                is_daily: U,
                seed_token: ye ?? null
            }));
        }, []), (0, w.useEffect)(()=>{
            !e || O.gameOver || O.turn - Ot.current < 3 || (Ot.current = O.turn, me(W.current, {
                score: O.score,
                turn: O.turn,
                zone: O.currentZone ?? 1,
                gold: O.ship.gold,
                hull: O.ship.hull
            }));
        }, [
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (!(!e || !O.gameOver) && !I.current) {
                if (I.current = !0, ue(W.current, {
                    score: O.score,
                    turn: O.turn,
                    zone: O.currentZone ?? 1,
                    gold: O.ship.gold,
                    hull: O.ship.hull,
                    run_title: O.runTitle
                }), !U && !St.current) {
                    console.warn(`[approve] skip : seed local, run non soumise`), S();
                    return;
                }
                de({
                    run_id: W.current,
                    wallet_address: e,
                    seed: O.seed,
                    ship_id: T ?? `default`,
                    is_daily: U,
                    actions: G.current,
                    checks: G.current.flatMap((e, t)=>[
                            q.current[t * 3] ?? -1,
                            q.current[t * 3 + 1] ?? -1,
                            q.current[t * 3 + 2] ?? -1
                        ]),
                    final_score: O.score,
                    final_turn: O.turn
                }).then(()=>ge(W.current)).then((e)=>{
                    e?.approved ? (We(!0), e.nft?.minted?.length && Ye(e.nft.minted.map((e)=>typeof e == `string` ? e : e.nft))) : console.warn(`[approve] refuse :`, e?.raison ?? e);
                }).catch((e)=>{
                    console.warn(`[approve]`, e), re(`approve`, {
                        run_id: W.current
                    });
                }), S();
            }
        }, [
            O.gameOver
        ]), (0, w.useEffect)(()=>{
            let e = ()=>vt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [J, Y] = (0, w.useState)(null), [kt, At] = (0, w.useState)(!1), [jt, Mt] = (0, w.useState)(!1), Nt = (0, w.useRef)(null), Pt = (0, w.useRef)(new Set), [Ft, It] = (0, w.useState)(null);
        (0, w.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !O.gameOver || !U || !e || !n || Ue && fe().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && It({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            O.gameOver,
            Ue
        ]);
        let Lt = (0, w.useRef)({
            x: O.ship.x,
            y: O.ship.y
        }), [Rt, zt] = (0, w.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [Bt, Vt] = (0, w.useState)({
            x: 0,
            y: 0
        });
        (0, w.useEffect)(()=>{
            let e = Lt.current, t = O.ship.x - e.x, n = O.ship.y - e.y;
            if (Lt.current = {
                x: O.ship.x,
                y: O.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = O.ship.vision * 2 + 1, i = (H ? Math.floor((window.innerWidth - 16) / r) : Math.floor(Math.min(window.innerWidth * .5, window.innerHeight * .62) / r) - 4) + 4, a = .8;
            zt({
                x: t * i * a,
                y: n * i * a,
                instant: !0
            }), Vt({
                x: t,
                y: n
            });
            let o = setTimeout(()=>Vt({
                    x: 0,
                    y: 0
                }), 380), s = requestAnimationFrame(()=>zt({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(s), clearTimeout(o);
            };
        }, [
            O.ship.x,
            O.ship.y
        ]);
        let [Ht, Ut] = (0, w.useState)(!1), [X, Wt] = (0, w.useState)(null), [Gt, Kt] = (0, w.useState)(!1), [qt, Jt] = (0, w.useState)(!1), [Yt, Xt] = (0, w.useState)(!1), [Zt, Qt] = (0, w.useState)(!1), [$t, en] = (0, w.useState)(!1), [tn, nn] = (0, w.useState)(!1), [rn, an] = (0, w.useState)(!1), [on, sn] = (0, w.useState)(!1), [cn, ln] = (0, w.useState)(!1), [un, dn] = (0, w.useState)(!1), [fn, pn] = (0, w.useState)(!1), [mn, hn] = (0, w.useState)(null), [gn, _n] = (0, w.useState)(0), vn = ()=>{
            Ne(!0), setTimeout(()=>Ne(!1), 400);
        }, yn = (e)=>{
            hn(e), setTimeout(()=>hn(null), 150);
        }, Z = O, bn = Math.min(100, (1 - Z.stormDistance / 10) * 100), xn = Z.ship.hull <= 5 ? `#ee4444` : Z.ship.hull <= 10 ? `#ee8844` : `#44cc88`, Sn = !Z.escapeUsed && Z.ship.upgrades.includes(`escape`) && Z.event && Z.event.choices[0].risk !== `safe`;
        (0, w.useEffect)(()=>{
            if (H) {
                Y(null);
                return;
            }
            if (O.gameOver) return;
            let e = O.event?.cellType;
            if (e && Ve[e]) {
                if (Pt.current.has(e)) return;
                Pt.current.add(e), Y(e);
                let t = setTimeout(()=>Y(null), 5e3);
                return ()=>clearTimeout(t);
            }
        }, [
            O.event,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                pn(!1);
                return;
            }
            O.event?.cellType === `port` && !H && (pn(!0), setTimeout(()=>pn(!1), 5e3));
        }, [
            O.event,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                an(!1);
                return;
            }
            if (O.gameOver) {
                an(!1);
                return;
            }
            if (O.event?.cellType === `rocks` && !H) {
                an(!0);
                let e = setTimeout(()=>an(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.gameOver
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                sn(!1);
                return;
            }
            if (O.event?.cellType === `treasure` && !H) {
                sn(!0);
                let e = setTimeout(()=>sn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                ln(!1);
                return;
            }
            if (O.event?.cellType === `cursed_treasure` && !H) {
                ln(!0);
                let e = setTimeout(()=>ln(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                dn(!1);
                return;
            }
            if (O.event?.cellType === `storm` && !H) {
                dn(!0);
                let e = setTimeout(()=>dn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.gameOver
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                en(!1);
                return;
            }
            if (O.event?.cellType === `ancient_kraken` && !H) {
                en(!0);
                let e = setTimeout(()=>en(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.gameOver
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                nn(!1);
                return;
            }
            if (O.event?.cellType === `maelstrom` && !H) {
                nn(!0);
                let e = setTimeout(()=>nn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.gameOver
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                Qt(!1);
                return;
            }
            if (O.event?.cellType === `island` && !H) {
                Qt(!0);
                let e = setTimeout(()=>Qt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.gameOver
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                Xt(!1);
                return;
            }
            if (O.gameOver) {
                Xt(!1);
                return;
            }
            if (O.event?.cellType === `wreck` && !H) {
                Xt(!0);
                let e = setTimeout(()=>Xt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                Jt(!1);
                return;
            }
            if (O.gameOver) {
                Jt(!1);
                return;
            }
            if (O.event?.cellType === `pirate` && !H) {
                Jt(!0);
                let e = setTimeout(()=>Jt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                Kt(!1);
                return;
            }
            if (O.event?.cellType === `kraken` && !H) {
                Kt(!0);
                let e = setTimeout(()=>Kt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            O.event,
            O.gameOver
        ]);
        let Cn = (0, w.useRef)(1);
        (0, w.useEffect)(()=>{
            let e = O.currentZone ?? 1;
            if (e > Cn.current) {
                let t = Cn.current, n = _[e], r = _[t]?.transitionText ?? [];
                nt({
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
                }), rt(0), Cn.current = e;
            }
        }, [
            O.currentZone
        ]), (0, w.useEffect)(()=>{
            if (!B) return;
            if (V >= B.lines.length) {
                setTimeout(()=>nt(null), 1e3);
                return;
            }
            let e = setTimeout(()=>rt((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            B,
            V
        ]), (0, w.useEffect)(()=>{
            O.dangerStreak > N.current && (N.current = O.dangerStreak);
        }, [
            O.dangerStreak
        ]), (0, w.useEffect)(()=>{
            if (O.gameOver) {
                let e = u(O);
                if (e.length > 0 && (Fe(e), E(`streak`)), O.score > 0) {
                    let t = b({
                        score: O.score,
                        turn: O.turn,
                        zone: O.currentZone ?? 1,
                        gold: O.ship.gold,
                        hunterAttacksSurvived: O.hunterAttacksSurvived ?? 0,
                        peakStreak: N.current,
                        hadStreak5: (O.exploits ?? []).includes(`streak5`)
                    }), n = new Set(e.map((e)=>e.id));
                    Le(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (at(t.pb), lt(!0));
                }
                if (S(), H) Mt(!0);
                else {
                    let e = wn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Ut(!1), Y(`death`), Nt.current = setTimeout(()=>{
                            Mt((e)=>e || !0), Y(null);
                        }, 9e3);
                    }, e);
                }
            } else Nt.current &&= (clearTimeout(Nt.current), null), Mt(!1), Y(null), Pt.current.clear(), N.current = 0, Le([]), lt(!1);
        }, [
            O.gameOver
        ]);
        let wn = (0, w.useRef)(!1), Tn = (0, w.useRef)(-99), En = (0, w.useRef)(null);
        (0, w.useEffect)(()=>{
            O.log?.includes(`Tentacles rake the hull`) && (O.turn - Tn.current < 3 || (Tn.current = O.turn, En.current && clearTimeout(En.current), wn.current = !0, Ut(!0), En.current = setTimeout(()=>{
                wn.current = !1, Ut(!1);
            }, 3500)));
        }, [
            O.log,
            O.turn
        ]), (0, w.useEffect)(()=>{
            if (!Ht) return;
            let e = ()=>{
                wn.current = !1, Ut(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            Ht
        ]), (0, w.useEffect)(()=>{
            if (O.log?.includes(`⚡ Storm surge`) && yn(`rgba(100,150,255,0.35)`), (O.event?.cellType === `kraken` || O.event?.cellType === `ancient_kraken`) && yn(`rgba(150,0,255,0.3)`), O.event?.cellType === `ancient_kraken` && yn(`rgba(200,160,48,0.4)`), O.hunter?.active) {
                let e = gt(O);
                _n(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else _n(0);
        }, [
            O
        ]), (0, w.useEffect)(()=>{
            let e = (e)=>{
                if (O.gameOver || O.event || O.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && Dn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && Dn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && Dn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            O.gameOver,
            O.event,
            O.showPort,
            O.turn
        ]);
        let Dn = (e, t)=>{
            K(e === -1 ? 0 : e === 1 ? 2 : 1), k((n)=>l(n, e, t));
        }, On = (e)=>{
            K(10 + e), k((t)=>{
                let n = ie(t, e);
                return n.ship.hull < t.ship.hull && vn(), n;
            });
        }, kn = ()=>{
            K(20), k((e)=>o(e));
        }, An = (e)=>{
            K(e === `hull` ? 30 : e === `weapon` ? 31 : 32), k((t)=>x(t, e));
        }, jn = async ()=>{
            if (e) {
                Et(!0), wt(!1);
                let t = await pe(e);
                if (Et(!1), !t) {
                    wt(!0);
                    return;
                }
                St.current = t.seed_token;
                let n = h(t.seed, T ?? `default`);
                G.current = [], q.current = [], Ot.current = 0, W.current = crypto.randomUUID(), I.current = !1, We(!1), Ke(!1), Ye([]), _e({
                    run_id: W.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), k(n);
                return;
            }
            let t = h(void 0, T ?? `default`);
            G.current = [], q.current = [], Ot.current = 0, W.current = crypto.randomUUID(), I.current = !1, We(!1), Ke(!1), Ye([]), k(t);
        }, Q = (0, w.useRef)(null), [$, Mn] = (0, w.useState)(!1);
        (0, w.useEffect)(()=>{
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
        }, []), (0, w.useEffect)(()=>{
            Q.current && (Q.current.muted = $), Te($);
        }, [
            $
        ]);
        let Nn = (0, w.useRef)({
            gold: O.ship.gold,
            hull: O.ship.hull,
            zone: O.currentZone ?? 1,
            over: O.gameOver,
            mult: O.scoreMultiplier ?? 1,
            hmode: O.hunter?.mode ?? ``,
            storm: O.stormDistance
        });
        return (0, w.useEffect)(()=>{
            let e = Nn.current, t = !!O.log?.includes(`Tentacles rake`);
            if (O.gameOver && !e.over) E(`death`);
            else if (!O.gameOver) {
                O.ship.gold > e.gold && E(`gold`), O.ship.gold < e.gold && O.showPort && E(`buy`), t ? E(`hunter_attack`) : O.ship.hull < e.hull && E(`damage`), (O.currentZone ?? 1) !== e.zone && E(`zone`), (O.scoreMultiplier ?? 1) > e.mult && E(`streak`);
                let n = O.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && E(`hunter_near`), O.stormDistance < e.storm && O.stormDistance <= 4 && O.stormDistance > 0 && (E(`thunder`), vn());
            }
            Nn.current = {
                gold: O.ship.gold,
                hull: O.ship.hull,
                zone: O.currentZone ?? 1,
                over: O.gameOver,
                mult: O.scoreMultiplier ?? 1,
                hmode: O.hunter?.mode ?? ``,
                storm: O.stormDistance
            };
            let n = (O.relics ?? []).length;
            if (n > ze.current) {
                let e = (O.relics ?? [])[n - 1], t = f(e);
                t && (Re(t), E(`streak`));
            }
            ze.current = n;
        }, [
            O
        ]), (0, D.jsxs)(i.div, {
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
                boxShadow: Z.stormDistance <= 2 ? `inset 0 0 80px rgba(220,30,30,0.6)` : Z.stormDistance <= 4 ? `inset 0 0 50px rgba(220,100,30,0.3)` : `none`,
                color: `#e8e0d0`,
                fontFamily: `'Pirata One', cursive`,
                display: `flex`,
                flexDirection: `column`,
                overflow: `hidden`,
                position: `relative`
            },
            children: [
                (0, D.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, D.jsx)(i.div, {
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
                                backgroundImage: `url(${F[Z.currentZone ?? 1] ?? F[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Z.currentZone ?? 1),
                        (0, D.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        })
                    ]
                }),
                mn && (0, D.jsx)(i.div, {
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
                        background: mn,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                gn > 0 && (0, D.jsx)(i.div, {
                    animate: {
                        opacity: [
                            gn,
                            gn * .6,
                            gn
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
                Z.ship.hull <= 5 && !Z.gameOver && (0, D.jsx)(i.div, {
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
                (0, D.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        padding: H ? `6px 8px` : `16px 28px`,
                        background: `rgba(6,11,18,0.92)`,
                        borderBottom: `1px solid rgba(255,255,255,0.06)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5
                    },
                    children: [
                        (0, D.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: H ? 6 : 10
                            },
                            children: [
                                (0, D.jsx)(`img`, {
                                    src: oe,
                                    style: {
                                        width: H ? 28 : 56,
                                        height: H ? 28 : 56,
                                        objectFit: `contain`
                                    }
                                }),
                                !H && ` CORSAIR`,
                                (()=>{
                                    let e = te.find((e)=>e.id === (Z.shipType ?? `default`)) ?? te[0];
                                    return (0, D.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: H ? 0 : 4,
                                            padding: H ? `2px 6px 2px 2px` : `3px 10px 3px 3px`,
                                            borderRadius: 8,
                                            border: `1px solid rgba(200,160,48,0.4)`,
                                            background: `rgba(200,160,48,0.1)`,
                                            fontSize: H ? 9 : 11,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: H ? 110 : 180,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, D.jsx)(`img`, {
                                                src: ne(e.id),
                                                alt: ``,
                                                style: {
                                                    width: H ? 22 : 28,
                                                    height: H ? 22 : 28,
                                                    borderRadius: 5,
                                                    objectFit: `cover`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            H ? e.name.replace(/^The /, ``) : e.name
                                        ]
                                    });
                                })()
                            ]
                        }),
                        (0, D.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: H ? 8 : 24
                            },
                            children: (H ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Z.ship.hull}/${Z.ship.maxHull}`,
                                    color: xn
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
                                    color: xn
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
                                    label: (_[Z.currentZone ?? 1]?.name ?? `The Coasts`).toUpperCase(),
                                    val: ``,
                                    color: `#aa44ee`
                                }
                            ]).map((e)=>(0, D.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                fontSize: H ? 10 : 17,
                                                color: `rgba(255,255,255,0.7)`,
                                                letterSpacing: 1,
                                                fontFamily: `'Pirata One', cursive`
                                            },
                                            children: e.label
                                        }),
                                        (0, D.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 4,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, D.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: bt,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: H ? 24 : 40,
                                                        height: H ? 24 : 40,
                                                        objectFit: `contain`
                                                    }
                                                }),
                                                (0, D.jsx)(`span`, {
                                                    style: {
                                                        fontSize: H ? 14 : 22,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !H && (0, D.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 16
                            },
                            children: [
                                (0, D.jsxs)(`div`, {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, D.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 56,
                                                height: 56,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, D.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Z.score
                                        }),
                                        ` pts`
                                    ]
                                }),
                                (0, D.jsx)(`button`, {
                                    onClick: ()=>Mn((e)=>!e),
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
                        H && (0, D.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, D.jsxs)(`span`, {
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
                                (0, D.jsx)(`button`, {
                                    onClick: ()=>Mn((e)=>!e),
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
                H && (Z.relics ?? []).length > 0 && (0, D.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Z.relics ?? []).map((e)=>{
                        let t = f(e);
                        return t ? (0, D.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, D.jsx)(`img`, {
                                src: p(e),
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
                H && Z.hunter?.active && (()=>{
                    let e = ut(Z), t = gt(Z), n = dt(Z);
                    return (0, D.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, D.jsx)(y, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, D.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: Z.hunter.mode === `frenzy` ? `#ff6666` : Z.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            xt(Z.hunter.mode),
                                            ft(Z.hunter.mode)
                                        ]
                                    }),
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: ht(e)
                                    }),
                                    (0, D.jsxs)(`div`, {
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
                            (0, D.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, D.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${Z.hunter.awareness}%`,
                                                background: Z.hunter.awareness >= 80 ? `#ee4444` : Z.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, D.jsxs)(`span`, {
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
                (0, D.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, D.jsxs)(`div`, {
                            style: {
                                width: H ? 0 : 260,
                                padding: H ? 0 : `16px 12px`,
                                overflow: `hidden`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 10,
                                borderRight: H ? `none` : `1px solid rgba(255,255,255,0.05)`,
                                transition: `width 0.3s`
                            },
                            children: [
                                (0, D.jsxs)(`div`, {
                                    style: {
                                        background: bn > 70 ? `rgba(180,30,30,0.2)` : `rgba(255,255,255,0.03)`,
                                        border: `1px solid ${bn > 70 ? `rgba(220,50,50,0.5)` : `rgba(255,255,255,0.08)`}`,
                                        borderRadius: 10,
                                        padding: `12px 10px`
                                    },
                                    children: [
                                        (0, D.jsxs)(`div`, {
                                            style: {
                                                fontSize: 14,
                                                color: bn > 70 ? `#ee4444` : `rgba(255,255,255,0.3)`,
                                                letterSpacing: 2,
                                                marginBottom: 6,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, D.jsx)(y, {
                                                    name: `storm`,
                                                    size: 16
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                fontSize: 29,
                                                fontWeight: 700,
                                                color: bn > 70 ? `#ee4444` : `#ee8844`
                                            },
                                            children: Z.stormDistance
                                        }),
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                fontSize: 20,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                marginTop: 2
                                            },
                                            children: `turns until impact`
                                        }),
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 8
                                            },
                                            children: (0, D.jsx)(i.div, {
                                                animate: {
                                                    width: `${bn}%`
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
                                    let e = ut(Z), t = gt(Z), n = dt(Z), r = t === `critical` || t === `danger`;
                                    return (0, D.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Z.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : Z.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 10,
                                            padding: `12px 10px`,
                                            marginTop: 4
                                        },
                                        children: [
                                            (0, D.jsxs)(`div`, {
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
                                                    (0, D.jsx)(y, {
                                                        name: `kraken`,
                                                        size: 15
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, D.jsxs)(`div`, {
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
                                                    xt(Z.hunter.mode),
                                                    ft(Z.hunter.mode)
                                                ]
                                            }),
                                            (0, D.jsx)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.45)`,
                                                    fontFamily: `'IM Fell English', cursive`,
                                                    lineHeight: 1.35,
                                                    marginBottom: 8
                                                },
                                                children: mt(Z.hunter.mode)
                                            }),
                                            (0, D.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginBottom: 4
                                                },
                                                children: ht(e)
                                            }),
                                            (0, D.jsxs)(`div`, {
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
                                            (0, D.jsxs)(`div`, {
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
                                            (0, D.jsx)(`div`, {
                                                style: {
                                                    height: 4,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2
                                                },
                                                children: (0, D.jsx)(i.div, {
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
                                            Z.hunter.awareness >= 80 && (0, D.jsx)(`div`, {
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
                                (0, D.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.6)`,
                                        letterSpacing: 2,
                                        marginTop: 8
                                    },
                                    children: `EQUIPPED`
                                }),
                                Z.ship.upgrades.length === 0 ? (0, D.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontStyle: `italic`
                                    },
                                    children: `None yet`
                                }) : Z.ship.upgrades.map((e)=>{
                                    let t = z.find((t)=>t.id === e);
                                    return (0, D.jsxs)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            color: Xe[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, D.jsx)(`img`, {
                                                src: L[e],
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
                                Z.upgradeToken && (0, D.jsxs)(`div`, {
                                    style: {
                                        fontSize: 14,
                                        color: `#eedd44`,
                                        marginTop: 4,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, D.jsx)(y, {
                                            name: `star`,
                                            size: 14
                                        }),
                                        ` Free upgrade — claim it at a port`
                                    ]
                                }),
                                (0, D.jsxs)(`div`, {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.3)`,
                                                letterSpacing: 3,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 10
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, D.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 10
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: Qe,
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
                                                    img: et,
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
                                                    img: $e,
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
                                                return (0, D.jsxs)(i.div, {
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
                                                        (0, D.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 8,
                                                                marginBottom: 6
                                                            },
                                                            children: [
                                                                (0, D.jsx)(`img`, {
                                                                    src: e.img,
                                                                    alt: ``,
                                                                    style: {
                                                                        width: 22,
                                                                        height: 22,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, D.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        (0, D.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: 1
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, D.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.3)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, D.jsxs)(`div`, {
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
                                                        (0, D.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, o)=>(0, D.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        o > 0 && (0, D.jsx)(`div`, {
                                                                            style: {
                                                                                width: 10,
                                                                                height: 2,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, D.jsx)(i.div, {
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
                                                                            children: (0, D.jsx)(`span`, {
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
                        (0, D.jsx)(yt, {
                            state: Z,
                            isMobile: H,
                            slide: Rt,
                            lurch: Bt,
                            onboard: A,
                            onDismissOnboard: Dt,
                            onMove: Dn
                        }),
                        (0, D.jsxs)(`div`, {
                            style: {
                                width: H ? 0 : 260,
                                minWidth: H ? 0 : 260,
                                padding: H ? 0 : `16px 12px`,
                                display: H ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 10,
                                borderLeft: `1px solid rgba(255,255,255,0.05)`,
                                pointerEvents: Z.showPort ? `none` : `auto`,
                                opacity: Z.showPort ? .4 : 1,
                                overflow: `hidden`
                            },
                            children: [
                                (0, D.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.9)`,
                                        letterSpacing: 2
                                    },
                                    children: `UPGRADES`
                                }),
                                (0, D.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 5,
                                        overflowY: `auto`
                                    },
                                    children: z.map((e)=>{
                                        let t = Z.ship.upgrades.includes(e.id), n = j.includes(e.id), r = Z.upgradeToken && Z.showPort, i = r ? 0 : e.cost, a = !t && !n && Z.ship.gold >= i && Z.showPort, o = Xe[e.build];
                                        return (0, D.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Z.showPort && (n ? M((t)=>t.filter((t)=>t !== e.id)) : a && M((t)=>[
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
                                                (0, D.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`
                                                    },
                                                    children: [
                                                        (0, D.jsxs)(`span`, {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: t ? o : `#ffffff`,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 4
                                                            },
                                                            children: [
                                                                (0, D.jsx)(`img`, {
                                                                    src: L[e.id],
                                                                    style: {
                                                                        width: 24,
                                                                        height: 24,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                e.name
                                                            ]
                                                        }),
                                                        t ? (0, D.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, D.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, D.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: `#eedd44`
                                                            },
                                                            children: r && Z.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                (0, D.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, D.jsx)(Ze, {
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
                (0, D.jsx)(n, {
                    children: J && Ve[J] && (0, D.jsxs)(i.div, {
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
                            J === `death` && Mt(!0), Y(null);
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 140,
                            cursor: `pointer`,
                            background: `#05080f`
                        },
                        children: [
                            (0, D.jsx)(i.video, {
                                src: Ve[J],
                                autoPlay: !0,
                                muted: $,
                                playsInline: !0,
                                preload: `metadata`,
                                onEnded: ()=>{
                                    J === `death` && Mt(!0), Y(null);
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
                            }, J),
                            (0, D.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`,
                                    pointerEvents: `none`
                                }
                            }),
                            (0, D.jsxs)(`div`, {
                                style: {
                                    position: `absolute`,
                                    bottom: `12%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`,
                                    pointerEvents: `none`
                                },
                                children: [
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 40,
                                            color: `#e8e0d0`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                        },
                                        children: He[J] ?? ``
                                    }),
                                    (0, D.jsx)(`div`, {
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
                (0, D.jsx)(n, {
                    children: B && (0, D.jsxs)(i.div, {
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
                        onClick: ()=>nt(null),
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
                            F[B.zone] && (0, D.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${F[B.zone]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    opacity: .28,
                                    filter: `saturate(0.7) brightness(0.55)`
                                }
                            }),
                            (0, D.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)`
                                }
                            }),
                            (0, D.jsx)(i.div, {
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
                                children: (0, D.jsx)(y, {
                                    name: `vortex`,
                                    size: H ? 72 : 96
                                })
                            }),
                            (0, D.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: H ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: B.lines.slice(0, V + 1).map((e, t)=>{
                                    let n = e === B.lines[B.lines.length - 1] && V >= B.lines.length - 1, r = e === `You have entered:`;
                                    return e ? (0, D.jsx)(i.div, {
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
                                    }, t) : (0, D.jsx)(`div`, {
                                        style: {
                                            height: 12
                                        }
                                    }, t);
                                })
                            }),
                            (0, D.jsx)(i.div, {
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
                (0, D.jsx)(n, {
                    children: P && (()=>{
                        let e = P.rarity === `legendary` ? `#eedd44` : P.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = P.rarity.toUpperCase();
                        return (0, D.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>Re(null),
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
                                (0, D.jsx)(i.div, {
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
                                (0, D.jsx)(i.div, {
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
                                    children: (0, D.jsx)(`img`, {
                                        src: p(P.id),
                                        alt: ``,
                                        style: {
                                            width: H ? 120 : 160,
                                            height: H ? 120 : 160,
                                            borderRadius: 16,
                                            objectFit: `cover`,
                                            border: `2px solid ${e}88`
                                        }
                                    })
                                }),
                                (0, D.jsxs)(i.div, {
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
                                (0, D.jsx)(i.div, {
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
                                    children: P.name
                                }),
                                (0, D.jsx)(i.div, {
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
                                    children: P.desc
                                }),
                                (0, D.jsx)(i.div, {
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
                (0, D.jsx)(n, {
                    children: Z.event && !J && !Z.gameOver && !Z.showPort && He[Z.event.cellType] && (0, D.jsx)(qe, {
                        variant: `scene`,
                        event: Z.event,
                        isMobile: H,
                        gold: Z.ship.gold,
                        hull: Z.ship.hull,
                        relics: Z.relics,
                        score: Z.score,
                        onboard: A,
                        onDismissOnboard: Dt,
                        onChoose: On,
                        canEscape: !!Sn,
                        onSkip: kn
                    }, `event-scene`)
                }),
                (0, D.jsx)(n, {
                    children: Z.event && !J && !Z.gameOver && !Z.showPort && Z.event.cellType && !Be[Z.event.cellType] && (0, D.jsx)(qe, {
                        variant: `compact`,
                        event: Z.event,
                        isMobile: H,
                        gold: Z.ship.gold,
                        hull: Z.ship.hull,
                        relics: Z.relics,
                        cellIcon: st[Z.event.cellType],
                        onboard: A,
                        onDismissOnboard: Dt,
                        onChoose: On,
                        canEscape: !!Sn,
                        onSkip: kn
                    }, `event-compact`)
                }),
                (0, D.jsx)(tt, {
                    open: !!Z.showPort && !Z.gameOver,
                    isMobile: H,
                    ship: Z.ship,
                    portUpgrades: Z.portUpgrades,
                    upgradeToken: !!Z.upgradeToken,
                    maxedComponents: Z.maxedComponents,
                    cart: j,
                    setCart: M,
                    onboard: A,
                    onDismissOnboard: Dt,
                    onUpgradeComponent: An,
                    onReroll: ()=>{
                        K(40), k((e)=>m(e));
                    },
                    freeReroll: Z.shipType === `merchant` && !!Z.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        K(n), k((n)=>c(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of j)K(50 + Je.indexOf(e));
                        K(70), k((e)=>{
                            let t = e;
                            for (let e of j)t = se(t, e);
                            return ce(t);
                        }), M([]);
                    }
                }),
                (0, D.jsx)(ot, {
                    open: jt,
                    state: Z,
                    isMobile: H,
                    isDailyRun: U,
                    personalBest: it,
                    isNewRecord: ct,
                    newFeats: Pe,
                    nearFeats: Ie,
                    scoreSubmitted: Ue,
                    nftMinted: R,
                    walletAddress: e,
                    account: t,
                    onChainDone: Ge,
                    setOnChainDone: Ke,
                    submitting: pt,
                    setSubmitting: _t,
                    connecting: De,
                    onConnect: ()=>Ee(),
                    showGuestDailyCta: !!(e && Oe.current && !U && ke && d),
                    onPlayDaily: d,
                    rangMois: Ft,
                    harborDown: Ct,
                    restarting: Tt,
                    onRestart: jn,
                    onHome: s
                }),
                (0, D.jsx)(n, {
                    children: Ht && !H && (0, D.jsxs)(i.div, {
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
                            (0, D.jsx)(`video`, {
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
                            (0, D.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `rgba(0,0,0,0.3)`
                                }
                            }),
                            (0, D.jsxs)(i.div, {
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
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 32,
                                            color: `#cc44ee`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                        },
                                        children: `THE HUNTER STRIKES!`
                                    }),
                                    (0, D.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.7)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 6
                                        },
                                        children: `Tentacles rake the hull`
                                    }),
                                    (0, D.jsx)(`div`, {
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
                H && (0, D.jsxs)(D.Fragment, {
                    children: [
                        !Z.event && !Z.showPort && !Z.gameOver && (0, D.jsxs)(`div`, {
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
                                (0, D.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Wt(X === `ship` ? null : `ship`),
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
                                    children: (0, D.jsx)(y, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, D.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Wt(X === `upgrades` ? null : `upgrades`),
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
                                    children: (0, D.jsx)(y, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, D.jsx)(n, {
                            children: X && (0, D.jsxs)(i.div, {
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
                                    X === `ship` && (0, D.jsxs)(D.Fragment, {
                                        children: [
                                            (0, D.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, D.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Z.ship.upgrades.length === 0 ? (0, D.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Z.ship.upgrades.map((e)=>{
                                                let t = z.find((t)=>t.id === e);
                                                return (0, D.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, D.jsx)(`img`, {
                                                            src: L[e],
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
                                            Z.upgradeToken && (0, D.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, D.jsx)(y, {
                                                        name: `star`,
                                                        size: 12
                                                    }),
                                                    ` Free upgrade — claim it at a port`
                                                ]
                                            }),
                                            (0, D.jsx)(`div`, {
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
                                                return (0, D.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, D.jsx)(`img`, {
                                                            src: e.img,
                                                            alt: ``,
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, D.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, D.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, D.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, D.jsx)(`span`, {
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
                                    X === `upgrades` && (0, D.jsxs)(D.Fragment, {
                                        children: [
                                            (0, D.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            z.map((e)=>{
                                                let t = Z.ship.upgrades.includes(e.id), n = Xe[e.build];
                                                return (0, D.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, D.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, D.jsx)(`img`, {
                                                                    src: L[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, D.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, D.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, D.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, D.jsx)(Ze, {
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
                        X && (0, D.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>Wt(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { U as default, __tla };
