import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { A as o, S as s, _ as c, b as l, c as u, d, f, g as p, h as m, l as h, m as ee, n as g, o as te, p as ne, r as _, s as v, t as y, v as re, w as ie, x as ae, y as oe } from "./anchor-B6LJUWD7.js";
import { a as b, b as se, d as ce, h as le, m as ue, p as de, t as fe, x as pe, __tla as __tla_0 } from "./supabase-BXtpc1SX.js";
import { l as me, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let at;
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
    var x = e(t(), 1), he = `corsair_onboard_v1`;
    function ge() {
        try {
            return new Set(JSON.parse(localStorage.getItem(he) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function _e(e) {
        let t = ge();
        t.add(e);
        try {
            localStorage.setItem(he, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function ve(e) {
        let t = ge();
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
    var ye = {
        gold: .5,
        buy: .5,
        damage: .6,
        streak: .55,
        zone: .6,
        death: .6,
        hunter_near: .65,
        hunter_attack: .7,
        thunder: .55
    }, S = {}, be = !1;
    function xe(e) {
        be = e;
    }
    function C(e) {
        if (!be) try {
            let t = S[e];
            t || (t = new Audio(`/sounds/${e}.wav`), S[e] = t), t.volume = ye[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var w = r();
    function Se({ tip: e, isMobile: t, onDismiss: n }) {
        return (0, w.jsxs)(i.button, {
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
                (0, w.jsx)(`div`, {
                    style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: `#c8a030`,
                        fontFamily: `'Cinzel', serif`,
                        marginBottom: 4
                    },
                    children: e.title
                }),
                (0, w.jsx)(`div`, {
                    style: {
                        fontSize: t ? 13 : 15,
                        lineHeight: 1.35
                    },
                    children: e.text
                }),
                (0, w.jsx)(`div`, {
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
    var Ce = `/assets/careful-Cp7BVX84.png`, we = `/assets/cover-B_e5YbfY.png`, Te = `/assets/cursed-DmavkUs_.png`, Ee = `/assets/detour-D8HBkeuW.png`, T = `/assets/dock-ePamt-Sr.png`, E = `/assets/explore-CNxn52P4.png`, De = `/assets/fight-g8Kc5AC3.png`, Oe = `/assets/leave-CeE9NwgD.png`, ke = `/assets/lurks-BB0IX5ES.png`, D = `/assets/pact-DCE16eF-.png`, Ae = `/assets/push-DcLNLHxV.png`, je = `/assets/ritual-B5bqWt-6.png`, Me = `/assets/sacrifice-KlI9xYLE.png`, O = `/assets/sail-yGR6Adzb.png`, k = `/assets/search-CSNg3Ko5.png`, Ne = `/assets/speed-BTjZicNY.png`, Pe = `/assets/take-CO53AH6i.png`, A = `/assets/tribute-CcshN1U0.png`, Fe = `/assets/vortex-l5f1oTMj.png`, Ie = Object.fromEntries([
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
                "../../assets/choices/careful.png": Ce,
                "../../assets/choices/cover.png": we,
                "../../assets/choices/cursed.png": Te,
                "../../assets/choices/detour.png": Ee,
                "../../assets/choices/dock.png": T,
                "../../assets/choices/explore.png": E,
                "../../assets/choices/fight.png": De,
                "../../assets/choices/leave.png": Oe,
                "../../assets/choices/lurks.png": ke,
                "../../assets/choices/pact.png": D,
                "../../assets/choices/push.png": Ae,
                "../../assets/choices/ritual.png": je,
                "../../assets/choices/sacrifice.png": Me,
                "../../assets/choices/sail.png": O,
                "../../assets/choices/search.png": k,
                "../../assets/choices/speed.png": Ne,
                "../../assets/choices/take.png": Pe,
                "../../assets/choices/tribute.png": A,
                "../../assets/choices/vortex.png": Fe
            })[`../../assets/choices/${e}.png`], import.meta.url).href
        ])), Le = {
        1: `/scenes/island.jpg`,
        2: `/scenes/storm.jpg`,
        3: `/scenes/ancient-kraken.jpg`
    }, Re = {
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
    function j(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function M(e, t) {
        let n = j(e);
        return n === 0 || t >= n;
    }
    function Ve(e, t, n, r) {
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function N(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    function P(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, w.jsx)(`img`, {
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
        }) : (0, w.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function He({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, score: s, cellIcon: c, onboard: l, onDismissOnboard: u, onChoose: d, canEscape: f, onSkip: p }) {
        let m = (0, w.jsx)(`div`, {
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
                let l = N(s.risk), u = M(s.desc, r), f = Ve(s, t.cellType, o, a), p = e === `scene` ? 1.04 : 1.02, m = e === `scene` ? .96 : .98;
                return (0, w.jsxs)(i.button, {
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
                        e === `scene` ? (0, w.jsx)(`div`, {
                            style: {
                                marginBottom: 12,
                                textAlign: `center`
                            },
                            children: (0, w.jsx)(`img`, {
                                src: Ie[s.icon] || ``,
                                alt: ``,
                                style: {
                                    width: 72,
                                    height: 72,
                                    objectFit: `contain`
                                }
                            })
                        }) : (0, w.jsx)(`div`, {
                            style: {
                                fontSize: 26,
                                marginBottom: 4
                            },
                            children: s.icon
                        }),
                        (0, w.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: l,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: s.label
                        }),
                        (0, w.jsx)(`div`, {
                            style: {
                                fontSize: 20,
                                color: `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: f
                        }),
                        (0, w.jsx)(`div`, {
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
        }), h = f && p ? (0, w.jsx)(`button`, {
            onClick: p,
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
        }) : null;
        return e === `scene` ? (0, w.jsxs)(i.div, {
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
                Re[t.cellType] && (0, w.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${Re[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, w.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                s != null && (0, w.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, w.jsxs)(`div`, {
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
                (0, w.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        l && u && (0, w.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, w.jsx)(Se, {
                                tip: l,
                                isMobile: n,
                                onDismiss: u
                            })
                        }),
                        (0, w.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: 16,
                                paddingLeft: 8
                            },
                            children: (0, w.jsx)(`div`, {
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
                        h && (0, w.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: h
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, w.jsx)(i.div, {
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
            children: (0, w.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, w.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: P(c, 55)
                    }),
                    (0, w.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, w.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            l && u && (0, w.jsx)(Se, {
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
    var F = {
        escape: `/assets/swift_sails-YMobDX4v.png`,
        ghost: `/assets/ghost_ship-4jaVs07k.png`,
        hunter: `/assets/treasure_hunter-C9jnAyZy.png`,
        rider: `/assets/storm_rider-BjRGnDwr.png`,
        greed: `/assets/cursed_greed-BlVfcQDt.png`,
        berserker: `/assets/berserker-B9haxHEY.png`
    }, Ue = [
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
    ], I = [
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
    ], L = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function We({ ok: e }) {
        return (0, w.jsx)(`span`, {
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
    function Ge({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, w.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, w.jsx)(We, {
                        ok: t
                    }),
                    (0, w.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, w.jsxs)(`div`, {
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
    function Ke({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, onRepair: m, onSetSail: h }) {
        return (0, w.jsx)(n, {
            children: e && (0, w.jsxs)(i.div, {
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
                    (0, w.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, w.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, w.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, w.jsx)(`span`, {
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
                            u && d && (0, w.jsx)(Se, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, w.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, w.jsx)(`div`, {
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
                                                    `Vision 1`,
                                                    `Vision 2 +danger detect`,
                                                    `Vision 3 +2 cases +minimap`
                                                ]
                                            }
                                        ].map((e)=>{
                                            let t = r.levels[e.key], n = t === 0 ? 50 : 110, i = t < 2 && r.gold >= n && !(t === 1 && s >= 2), a = t >= 2;
                                            return (0, w.jsxs)(`div`, {
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
                                                    (0, w.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, w.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, w.jsx)(`img`, {
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
                                                            (0, w.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, w.jsx)(`div`, {
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
                                                    (0, w.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: `rgba(255,255,255,0.6)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, w.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 11,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: t === 1 && s >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                    }),
                                                    a && (0, w.jsx)(`div`, {
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
                            (0, w.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8
                                },
                                children: [
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, w.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        onClick: p,
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
                            (0, w.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: I.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = L[e.build];
                                    return (0, w.jsxs)(`div`, {
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
                                            (0, w.jsx)(`img`, {
                                                src: F[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, w.jsxs)(`div`, {
                                                children: [
                                                    (0, w.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                            fontFamily: `'Pirata One', cursive`
                                                        },
                                                        children: e.name
                                                    }),
                                                    (0, w.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, w.jsx)(Ge, {
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
                            r.upgrades.length + c.length >= 2 && (0, w.jsx)(`div`, {
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
                    (0, w.jsx)(`div`, {
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
                        ].map((e)=>(0, w.jsxs)(i.button, {
                                whileTap: {
                                    scale: .97
                                },
                                onClick: ()=>m(e.gain, e.cost, e.code),
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
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `#44cc88`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: e.label
                                    }),
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.5)`
                                        },
                                        children: e.desc
                                    }),
                                    (0, w.jsxs)(`div`, {
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
                    (0, w.jsxs)(i.button, {
                        whileHover: {
                            scale: 1.02
                        },
                        whileTap: {
                            scale: .98
                        },
                        onClick: h,
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
                            (0, w.jsx)(g, {
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
    var qe = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new me({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function Je(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: qe,
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
    function Ye({ payload: e, isMobile: t, onShare: n }) {
        return (0, w.jsxs)(i.div, {
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
                (0, w.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, w.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, w.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, w.jsxs)(`div`, {
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
                (0, w.jsx)(`div`, {
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
                    ].map((e)=>(0, w.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, w.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, w.jsx)(`div`, {
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
                (0, w.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, w.jsxs)(`div`, {
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
                        (0, w.jsx)(i.button, {
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
    async function Xe(e) {
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
    function Ze(e) {
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
    function Qe({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: o, isNewRecord: c, newFeats: l, scoreSubmitted: u, nftMinted: d, walletAddress: f, account: p, onChainDone: m, setOnChainDone: ee, submitting: te, setSubmitting: _, connecting: v, onConnect: y, showGuestDailyCta: re, onPlayDaily: ie, rangMois: ae, harborDown: oe, restarting: b, onRestart: se, onHome: ce }) {
        return (0, w.jsx)(n, {
            children: e && (0, w.jsxs)(i.div, {
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
                    (0, w.jsx)(i.div, {
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
                    (0, w.jsx)(i.div, {
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
                        children: (0, w.jsx)(g, {
                            name: `skull`,
                            size: 130
                        })
                    }),
                    (0, w.jsx)(i.div, {
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
                    (0, w.jsx)(i.div, {
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
                    (0, w.jsxs)(i.div, {
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
                        let e = Ze(t.log);
                        return (0, w.jsxs)(i.div, {
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
                                (0, w.jsxs)(`div`, {
                                    style: {
                                        fontSize: r ? 13 : 15,
                                        color: `#ee6655`,
                                        fontFamily: `'Cinzel', serif`,
                                        letterSpacing: 2
                                    },
                                    children: [
                                        (0, w.jsx)(g, {
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
                                (0, w.jsx)(`div`, {
                                    style: {
                                        fontSize: r ? 12 : 14,
                                        color: `rgba(255,255,255,0.55)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        textAlign: `center`
                                    },
                                    children: e.tip
                                }),
                                t.score < o && o > 0 && (0, w.jsxs)(`div`, {
                                    style: {
                                        fontSize: r ? 11 : 13,
                                        color: `rgba(238,221,68,0.7)`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        o - t.score,
                                        ` pts short of your best (`,
                                        o,
                                        `)`
                                    ]
                                })
                            ]
                        });
                    })(),
                    l.length > 0 && (0, w.jsx)(i.div, {
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
                        children: l.map((e)=>(0, w.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 10
                                },
                                children: [
                                    (0, w.jsx)(g, {
                                        name: e.icon,
                                        size: 26
                                    }),
                                    (0, w.jsxs)(`div`, {
                                        style: {
                                            textAlign: `left`
                                        },
                                        children: [
                                            (0, w.jsxs)(`div`, {
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
                                            (0, w.jsxs)(`div`, {
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
                    (0, w.jsx)(i.div, {
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
                        ].map((e)=>(0, w.jsxs)(`div`, {
                                style: {
                                    textAlign: `center`
                                },
                                children: [
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 10 : 13,
                                            color: `rgba(255,255,255,0.3)`,
                                            letterSpacing: r ? 1 : 3,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: e.label
                                    }),
                                    (0, w.jsx)(`div`, {
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
                    t.scoreBreakdown && (0, w.jsxs)(i.div, {
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
                            (0, w.jsx)(`div`, {
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
                            ].filter((e)=>e.val > 0).map((e)=>(0, w.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        marginBottom: 3
                                    },
                                    children: [
                                        (0, w.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.4)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1
                                            },
                                            children: e.label
                                        }),
                                        (0, w.jsxs)(`span`, {
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
                    (0, w.jsxs)(i.div, {
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
                            (0, w.jsx)(`div`, {
                                children: a ? ne() ? `Seed: ${t.seed} — Daily Key: ${h()}` : `Blind daily — seed revealed at 00:00 UTC` : `Seed: ${t.seed} — challenge your crew!`
                            }),
                            a && (0, w.jsxs)(`div`, {
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
                    (0, w.jsxs)(i.div, {
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
                            p && !m && (0, w.jsx)(i.button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                disabled: te,
                                onClick: async ()=>{
                                    _(!0);
                                    try {
                                        await Je(p, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                    } catch (e) {
                                        console.warn(`On-chain submit failed:`, e);
                                    }
                                    ee(!0), _(!1);
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
                                children: te ? `ENGRAVING...` : (0, w.jsxs)(w.Fragment, {
                                    children: [
                                        (0, w.jsx)(g, {
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
                            (0, w.jsx)(`div`, {
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
                            u && (0, w.jsx)(`div`, {
                                style: {
                                    fontSize: 14,
                                    color: `#44cc88`,
                                    letterSpacing: 2,
                                    fontFamily: `'Pirata One', cursive`
                                },
                                children: `✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD`
                            }),
                            d.length > 0 && (0, w.jsxs)(i.div, {
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
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            marginBottom: 4
                                        },
                                        children: (0, w.jsx)(g, {
                                            name: `flag`,
                                            size: 24
                                        })
                                    }),
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `#FFD700`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 2
                                        },
                                        children: `NFT EARNED!`
                                    }),
                                    d.map((e)=>(0, w.jsx)(`div`, {
                                            style: {
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'Cinzel', serif`,
                                                marginTop: 4
                                            },
                                            children: e.replace(/_/g, ` `).toUpperCase()
                                        }, e)),
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginTop: 8,
                                            lineHeight: 1.4
                                        },
                                        children: `Your NFT will be sent to your wallet soon.`
                                    }),
                                    (0, w.jsx)(i.button, {
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
                            !f && (0, w.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `This run stayed local. Connect a wallet to submit scores, play the Daily, and earn NFTs.`
                                    }),
                                    (0, w.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: y,
                                        disabled: v,
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
                                        children: v ? `CONNECTING...` : `CONNECT WALLET`
                                    })
                                ]
                            }),
                            re && ie && (0, w.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `Wallet linked. This run stayed local — sail the Daily to climb today's board.`
                                    }),
                                    (0, w.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ie,
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
                                }, i = (t.relics ?? []).map((e)=>s(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, c = ae ? `\n⚔️ #${ae.rank} in Starktember — ${ae.total.toLocaleString()} pts across the month.` : ``, l = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${c}${o}\n⚓ @PlayCorsair https://playcorsair.xyz/ #Starktember #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/ #Starknet`, u = Ze(t.log);
                                return (0, w.jsx)(Ye, {
                                    isMobile: r,
                                    onShare: ()=>{
                                        Xe(l);
                                    },
                                    payload: {
                                        score: t.score,
                                        turn: t.turn,
                                        gold: t.ship.gold,
                                        runTitle: t.runTitle,
                                        seed: t.seed,
                                        deathName: u.name,
                                        isDaily: a,
                                        text: l
                                    }
                                });
                            })(),
                            (0, w.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    oe && (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try Sail again when you're back online`
                                    }),
                                    (0, w.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 12
                                        },
                                        children: [
                                            (0, w.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: se,
                                                disabled: b,
                                                style: {
                                                    padding: `14px 36px`,
                                                    borderRadius: 12,
                                                    border: `2px solid rgba(200,160,48,0.6)`,
                                                    background: `rgba(80,60,10,0.5)`,
                                                    color: `#c8a030`,
                                                    cursor: b ? `wait` : `pointer`,
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    boxShadow: `0 0 20px rgba(200,160,48,0.2)`,
                                                    opacity: b ? .7 : 1
                                                },
                                                children: b ? `PREPARING…` : `SAIL AGAIN`
                                            }),
                                            (0, w.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ce,
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
    var $e = `/icons/gold.png`, et = {
        sea: `〰`,
        storm: `/icons_ui/storm.png`,
        pirate: `/icons_ui/swords.png`,
        treasure: `/icons_ui/treasure.png`,
        port: `/icons/port.png`,
        kraken: `/icons_ui/kraken.png`,
        wreck: `/icons/wreck.png`,
        island: `/icons/island.png`,
        rocks: `/icons/rocks.png`
    }, tt = {
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
    }, nt = {
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
    }, rt = (e, t = 14)=>(0, w.jsx)(g, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        }), it = (e)=>e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`;
    at = function({ walletAddress: e, account: t, username: r, onHome: ne, onPlayDaily: me, dailySeed: he, isDaily: ge, seedToken: ye, shipId: S, resumeState: be, resumeRunId: Ce, resumeActions: we }) {
        let { connect: Te, connecting: Ee } = a(), [T, E] = (0, x.useState)(()=>be ?? f(he, S ?? `default`)), De = (0, x.useRef)(!e), [Oe, ke] = (0, x.useState)(()=>!d()), [D, Ae] = (0, x.useState)(null), [je, Me] = (0, x.useState)(!1), [O, k] = (0, x.useState)([]), [Ne, Pe] = (0, x.useState)([]), [A, Fe] = (0, x.useState)(null), Ie = (0, x.useRef)((T.relics ?? []).length), [j, M] = (0, x.useState)(!1), [Ve, N] = (0, x.useState)(!1), P = (0, x.useRef)(!1), [We, qe] = (0, x.useState)([]), [Je, Ye] = (0, x.useState)(null), [Xe, Ze] = (0, x.useState)(0), [at, ot] = (0, x.useState)(()=>parseInt(localStorage.getItem(`corsair_best_score`) || `0`)), [st, ct] = (0, x.useState)(!1), [lt, ut] = (0, x.useState)(!1), [R, dt] = (0, x.useState)(window.innerWidth < 768), z = ge === !0, ft = (0, x.useRef)(ye), [pt, mt] = (0, x.useState)(!1), [ht, gt] = (0, x.useState)(!1);
        (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Ae(null);
                return;
            }
            T.turn > 0 && _e(`sail`), Ae(ve(T));
        }, [
            T.turn,
            T.event,
            T.showPort,
            T.hunter?.active,
            T.stormDistance,
            T.gameOver
        ]);
        let _t = ()=>{
            D && (_e(D.id), Ae(null));
        };
        (0, x.useEffect)(()=>{
            z && (m(), e && h());
        }, []), (0, x.useEffect)(()=>{
            if (!e) {
                ke(!d());
                return;
            }
            de(e, h()).then((e)=>ke(!(e || d())));
        }, [
            e
        ]);
        let B = (0, x.useRef)(Ce ?? crypto.randomUUID()), V = (0, x.useRef)(we ? [
            ...we
        ] : []), H = (e)=>{
            V.current.push(e);
        }, U = (0, x.useRef)([]);
        (0, x.useEffect)(()=>{
            let t = e;
            !t || T.gameOver || V.current.length !== 0 && v({
                run_id: B.current,
                wallet_address: t,
                seed: T.seed,
                ship_id: S ?? `default`,
                is_daily: z,
                actions: V.current,
                turn: T.turn,
                score: T.score,
                saved_at: Date.now()
            });
        }, [
            T
        ]), (0, x.useEffect)(()=>{
            let e = V.current.length - 1;
            e < 0 || (U.current[e * 3] = T.score, U.current[e * 3 + 1] = T.ship.hull, U.current[e * 3 + 2] = T.rngState ?? -1);
        }, [
            T
        ]);
        let vt = (0, x.useRef)(0);
        (0, x.useEffect)(()=>{
            e && (Ce || pe({
                run_id: B.current,
                wallet_address: e,
                username: r ?? null,
                seed: T.seed,
                is_daily: z,
                seed_token: ye ?? null
            }));
        }, []), (0, x.useEffect)(()=>{
            !e || T.gameOver || T.turn - vt.current < 3 || (vt.current = T.turn, ue(B.current, {
                score: T.score,
                turn: T.turn,
                zone: T.currentZone ?? 1,
                gold: T.ship.gold,
                hull: T.ship.hull
            }));
        }, [
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (!(!e || !T.gameOver) && !P.current) {
                if (P.current = !0, b(B.current, {
                    score: T.score,
                    turn: T.turn,
                    zone: T.currentZone ?? 1,
                    gold: T.ship.gold,
                    hull: T.ship.hull,
                    run_title: T.runTitle
                }), !z && !ft.current) {
                    console.warn(`[approve] skip : seed local, run non soumise`), _();
                    return;
                }
                se({
                    run_id: B.current,
                    wallet_address: e,
                    seed: T.seed,
                    ship_id: S ?? `default`,
                    is_daily: z,
                    actions: V.current,
                    checks: V.current.flatMap((e, t)=>[
                            U.current[t * 3] ?? -1,
                            U.current[t * 3 + 1] ?? -1,
                            U.current[t * 3 + 2] ?? -1
                        ]),
                    final_score: T.score,
                    final_turn: T.turn
                }).then(()=>fe(B.current)).then((e)=>{
                    e?.approved ? (M(!0), e.nft?.minted?.length && qe(e.nft.minted.map((e)=>typeof e == `string` ? e : e.nft))) : console.warn(`[approve] refuse :`, e?.raison ?? e);
                }).catch((e)=>{
                    console.warn(`[approve]`, e), te(`approve`, {
                        run_id: B.current
                    });
                }), _();
            }
        }, [
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            let e = ()=>dt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [W, G] = (0, x.useState)(null), [yt, bt] = (0, x.useState)(!1), [xt, K] = (0, x.useState)(!1), St = (0, x.useRef)(null), Ct = (0, x.useRef)(new Set), [wt, Tt] = (0, x.useState)(null);
        (0, x.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !T.gameOver || !z || !e || !n || j && ce().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && Tt({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            T.gameOver,
            j
        ]);
        let Et = (0, x.useRef)({
            x: T.ship.x,
            y: T.ship.y
        }), [Dt, Ot] = (0, x.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [kt, At] = (0, x.useState)({
            x: 0,
            y: 0
        });
        (0, x.useEffect)(()=>{
            let e = Et.current, t = T.ship.x - e.x, n = T.ship.y - e.y;
            if (Et.current = {
                x: T.ship.x,
                y: T.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = T.ship.vision * 2 + 1, i = (R ? Math.floor((window.innerWidth - 16) / r) : Math.floor(Math.min(window.innerWidth * .5, window.innerHeight * .62) / r) - 4) + 4, a = .8;
            Ot({
                x: t * i * a,
                y: n * i * a,
                instant: !0
            }), At({
                x: t,
                y: n
            });
            let o = setTimeout(()=>At({
                    x: 0,
                    y: 0
                }), 380), s = requestAnimationFrame(()=>Ot({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(s), clearTimeout(o);
            };
        }, [
            T.ship.x,
            T.ship.y
        ]);
        let [jt, Mt] = (0, x.useState)(!1), [q, Nt] = (0, x.useState)(null), [Pt, Ft] = (0, x.useState)(!1), [It, Lt] = (0, x.useState)(!1), [Rt, zt] = (0, x.useState)(!1), [Bt, Vt] = (0, x.useState)(!1), [Ht, Ut] = (0, x.useState)(!1), [Wt, Gt] = (0, x.useState)(!1), [Kt, qt] = (0, x.useState)(!1), [Jt, Yt] = (0, x.useState)(!1), [Xt, Zt] = (0, x.useState)(!1), [Qt, $t] = (0, x.useState)(!1), [en, tn] = (0, x.useState)(!1), [nn, rn] = (0, x.useState)(null), [J, an] = (0, x.useState)(0), on = ()=>{
            Me(!0), setTimeout(()=>Me(!1), 400);
        }, sn = (e)=>{
            rn(e), setTimeout(()=>rn(null), 150);
        }, Y = T, X = Math.min(100, (1 - Y.stormDistance / 10) * 100), cn = Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`, ln = !Y.escapeUsed && Y.ship.upgrades.includes(`escape`) && Y.event && Y.event.choices[0].risk !== `safe`;
        (0, x.useEffect)(()=>{
            if (R) {
                G(null);
                return;
            }
            if (T.gameOver) return;
            let e = T.event?.cellType;
            if (e && ze[e]) {
                if (Ct.current.has(e)) return;
                Ct.current.add(e), G(e);
                let t = setTimeout(()=>G(null), 5e3);
                return ()=>clearTimeout(t);
            }
        }, [
            T.event,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                tn(!1);
                return;
            }
            T.event?.cellType === `port` && !R && (tn(!0), setTimeout(()=>tn(!1), 5e3));
        }, [
            T.event,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                qt(!1);
                return;
            }
            if (T.gameOver) {
                qt(!1);
                return;
            }
            if (T.event?.cellType === `rocks` && !R) {
                qt(!0);
                let e = setTimeout(()=>qt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Yt(!1);
                return;
            }
            if (T.event?.cellType === `treasure` && !R) {
                Yt(!0);
                let e = setTimeout(()=>Yt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Zt(!1);
                return;
            }
            if (T.event?.cellType === `cursed_treasure` && !R) {
                Zt(!0);
                let e = setTimeout(()=>Zt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                $t(!1);
                return;
            }
            if (T.event?.cellType === `storm` && !R) {
                $t(!0);
                let e = setTimeout(()=>$t(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Ut(!1);
                return;
            }
            if (T.event?.cellType === `ancient_kraken` && !R) {
                Ut(!0);
                let e = setTimeout(()=>Ut(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Gt(!1);
                return;
            }
            if (T.event?.cellType === `maelstrom` && !R) {
                Gt(!0);
                let e = setTimeout(()=>Gt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Vt(!1);
                return;
            }
            if (T.event?.cellType === `island` && !R) {
                Vt(!0);
                let e = setTimeout(()=>Vt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                zt(!1);
                return;
            }
            if (T.gameOver) {
                zt(!1);
                return;
            }
            if (T.event?.cellType === `wreck` && !R) {
                zt(!0);
                let e = setTimeout(()=>zt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Lt(!1);
                return;
            }
            if (T.gameOver) {
                Lt(!1);
                return;
            }
            if (T.event?.cellType === `pirate` && !R) {
                Lt(!0);
                let e = setTimeout(()=>Lt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                Ft(!1);
                return;
            }
            if (T.event?.cellType === `kraken` && !R) {
                Ft(!0);
                let e = setTimeout(()=>Ft(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            T.event,
            T.gameOver
        ]);
        let un = (0, x.useRef)(1);
        (0, x.useEffect)(()=>{
            let e = T.currentZone ?? 1;
            if (e > un.current) {
                let t = o[e];
                Ye({
                    lines: [
                        ...t.transitionText,
                        ``,
                        `You have entered:`,
                        t.name.toUpperCase()
                    ],
                    zone: e
                }), Ze(0), un.current = e;
            }
        }, [
            T.currentZone
        ]), (0, x.useEffect)(()=>{
            if (!Je) return;
            if (Xe >= Je.lines.length) {
                setTimeout(()=>Ye(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Ze((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            Je,
            Xe
        ]), (0, x.useEffect)(()=>{
            T.gameOver && T.score > 0 && T.score > at && (ot(T.score), ct(!0), localStorage.setItem(`corsair_best_score`, T.score.toString()));
        }, [
            T.gameOver
        ]), (0, x.useEffect)(()=>{
            if (T.gameOver) {
                let e = ie(T);
                if (e.length > 0 && (Pe(e), C(`streak`)), _(), R) K(!0);
                else {
                    let e = dn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Mt(!1), G(`death`), St.current = setTimeout(()=>{
                            K((e)=>e || !0), G(null);
                        }, 9e3);
                    }, e);
                }
            } else St.current &&= (clearTimeout(St.current), null), K(!1), G(null), Ct.current.clear();
        }, [
            T.gameOver
        ]);
        let dn = (0, x.useRef)(!1), fn = (0, x.useRef)(-99), pn = (0, x.useRef)(null);
        (0, x.useEffect)(()=>{
            T.log?.includes(`Tentacles rake the hull`) && (T.turn - fn.current < 3 || (fn.current = T.turn, pn.current && clearTimeout(pn.current), dn.current = !0, Mt(!0), pn.current = setTimeout(()=>{
                dn.current = !1, Mt(!1);
            }, 3500)));
        }, [
            T.log,
            T.turn
        ]), (0, x.useEffect)(()=>{
            if (!jt) return;
            let e = ()=>{
                dn.current = !1, Mt(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            jt
        ]), (0, x.useEffect)(()=>{
            T.log?.includes(`⚡ Storm surge`) && sn(`rgba(100,150,255,0.35)`), (T.event?.cellType === `kraken` || T.event?.cellType === `ancient_kraken`) && sn(`rgba(150,0,255,0.3)`), T.event?.cellType === `ancient_kraken` && sn(`rgba(200,160,48,0.4)`);
            let e = T.hunter;
            if (e?.active) {
                let t = Math.abs(e.x - T.ship.x) + Math.abs(e.y - T.ship.y);
                an(t <= 1 ? .72 : t <= 2 ? .5 : t <= 4 ? .28 : .12);
            } else an(0);
        }, [
            T
        ]), (0, x.useEffect)(()=>{
            let e = (e)=>{
                if (T.gameOver || T.event || T.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && Z(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && Z(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && Z(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            T.gameOver,
            T.event,
            T.showPort,
            T.turn
        ]);
        let Z = (e, t)=>{
            H(e === -1 ? 0 : e === 1 ? 2 : 1), E((n)=>p(n, e, t));
        }, mn = (e)=>{
            H(10 + e), E((t)=>{
                let n = oe(t, e);
                return n.ship.hull < t.ship.hull && on(), n;
            });
        }, hn = ()=>{
            H(20), E((e)=>l(e));
        }, gn = (e)=>{
            H(e === `hull` ? 30 : e === `weapon` ? 31 : 32), E((t)=>ae(t, e));
        }, _n = async ()=>{
            if (e) {
                gt(!0), mt(!1);
                let t = await le(e);
                if (gt(!1), !t) {
                    mt(!0);
                    return;
                }
                ft.current = t.seed_token;
                let n = f(t.seed, S ?? `default`);
                V.current = [], U.current = [], vt.current = 0, B.current = crypto.randomUUID(), P.current = !1, M(!1), N(!1), qe([]), pe({
                    run_id: B.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), E(n);
                return;
            }
            let t = f(void 0, S ?? `default`);
            V.current = [], U.current = [], vt.current = 0, B.current = crypto.randomUUID(), P.current = !1, M(!1), N(!1), qe([]), E(t);
        }, Q = (0, x.useRef)(null), [$, vn] = (0, x.useState)(!1);
        (0, x.useEffect)(()=>{
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
        }, []), (0, x.useEffect)(()=>{
            Q.current && (Q.current.muted = $), xe($);
        }, [
            $
        ]);
        let yn = (0, x.useRef)({
            gold: T.ship.gold,
            hull: T.ship.hull,
            zone: T.currentZone ?? 1,
            over: T.gameOver,
            mult: T.scoreMultiplier ?? 1,
            hmode: T.hunter?.mode ?? ``,
            storm: T.stormDistance
        });
        return (0, x.useEffect)(()=>{
            let e = yn.current, t = !!T.log?.includes(`Tentacles rake`);
            if (T.gameOver && !e.over) C(`death`);
            else if (!T.gameOver) {
                T.ship.gold > e.gold && C(`gold`), T.ship.gold < e.gold && T.showPort && C(`buy`), t ? C(`hunter_attack`) : T.ship.hull < e.hull && C(`damage`), (T.currentZone ?? 1) !== e.zone && C(`zone`), (T.scoreMultiplier ?? 1) > e.mult && C(`streak`);
                let n = T.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && C(`hunter_near`), T.stormDistance < e.storm && T.stormDistance <= 4 && T.stormDistance > 0 && (C(`thunder`), on());
            }
            yn.current = {
                gold: T.ship.gold,
                hull: T.ship.hull,
                zone: T.currentZone ?? 1,
                over: T.gameOver,
                mult: T.scoreMultiplier ?? 1,
                hmode: T.hunter?.mode ?? ``,
                storm: T.stormDistance
            };
            let n = (T.relics ?? []).length;
            if (n > Ie.current) {
                let e = (T.relics ?? [])[n - 1], t = s(e);
                t && (Fe(t), C(`streak`));
            }
            Ie.current = n;
        }, [
            T
        ]), (0, w.jsxs)(i.div, {
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
                boxShadow: Y.stormDistance <= 2 ? `inset 0 0 80px rgba(220,30,30,0.6)` : Y.stormDistance <= 4 ? `inset 0 0 50px rgba(220,100,30,0.3)` : `none`,
                color: `#e8e0d0`,
                fontFamily: `'Pirata One', cursive`,
                display: `flex`,
                flexDirection: `column`,
                overflow: `hidden`,
                position: `relative`
            },
            children: [
                (0, w.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, w.jsx)(i.div, {
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
                                backgroundImage: `url(${Le[Y.currentZone ?? 1] ?? Le[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Y.currentZone ?? 1),
                        (0, w.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        })
                    ]
                }),
                nn && (0, w.jsx)(i.div, {
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
                        background: nn,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                J > 0 && (0, w.jsx)(i.div, {
                    animate: {
                        opacity: [
                            J,
                            J * .6,
                            J
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
                Y.ship.hull <= 5 && !Y.gameOver && (0, w.jsx)(i.div, {
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
                (0, w.jsxs)(`div`, {
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
                        (0, w.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, w.jsx)(`img`, {
                                    src: y,
                                    style: {
                                        width: R ? 28 : 56,
                                        height: R ? 28 : 56,
                                        objectFit: `contain`
                                    }
                                }),
                                !R && ` CORSAIR`
                            ]
                        }),
                        (0, w.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: R ? 8 : 24
                            },
                            children: (R ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Y.ship.hull}/${Y.ship.maxHull}`,
                                    color: cn
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
                                    color: cn
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
                                    label: (o[Y.currentZone ?? 1]?.name ?? `The Coasts`).toUpperCase(),
                                    val: ``,
                                    color: `#aa44ee`
                                }
                            ]).map((e)=>(0, w.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                fontSize: R ? 10 : 17,
                                                color: `rgba(255,255,255,0.7)`,
                                                letterSpacing: 1,
                                                fontFamily: `'Pirata One', cursive`
                                            },
                                            children: e.label
                                        }),
                                        (0, w.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 4,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, w.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: $e,
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
                                                (0, w.jsx)(`span`, {
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
                        !R && (0, w.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 16
                            },
                            children: [
                                (0, w.jsxs)(`div`, {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, w.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 56,
                                                height: 56,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, w.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Y.score
                                        }),
                                        ` pts`
                                    ]
                                }),
                                (0, w.jsx)(`button`, {
                                    onClick: ()=>vn((e)=>!e),
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
                        R && (0, w.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, w.jsxs)(`span`, {
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
                                (0, w.jsx)(`button`, {
                                    onClick: ()=>vn((e)=>!e),
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
                R && (Y.relics ?? []).length > 0 && (0, w.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Y.relics ?? []).map((e)=>{
                        let t = s(e);
                        return t ? (0, w.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, w.jsx)(g, {
                                name: t.icon,
                                size: 15
                            })
                        }, e) : null;
                    })
                }),
                R && Y.hunter?.active && (()=>{
                    let e = Math.abs(Y.hunter.x - Y.ship.x) + Math.abs(Y.hunter.y - Y.ship.y);
                    return (0, w.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            alignItems: `center`,
                            gap: 8,
                            padding: `4px 10px`,
                            background: e <= 2 ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid rgba(180,30,180,0.3)`
                        },
                        children: [
                            (0, w.jsx)(g, {
                                name: `kraken`,
                                size: 15,
                                style: {
                                    marginRight: 2
                                }
                            }),
                            (0, w.jsxs)(`div`, {
                                style: {
                                    fontSize: 11,
                                    color: Y.hunter.mode === `frenzy` ? `#ff6666` : Y.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.4)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: 1,
                                    minWidth: 70
                                },
                                children: [
                                    rt(Y.hunter.mode),
                                    it(Y.hunter.mode)
                                ]
                            }),
                            (0, w.jsx)(`div`, {
                                style: {
                                    fontSize: 10,
                                    color: e <= 1 ? `#ff6677` : `rgba(255,255,255,0.45)`,
                                    fontFamily: `'Cinzel', serif`,
                                    minWidth: 52
                                },
                                children: e <= 1 ? `HULL!` : `${e} away`
                            }),
                            (0, w.jsx)(`div`, {
                                style: {
                                    flex: 1,
                                    height: 3,
                                    background: `rgba(255,255,255,0.1)`,
                                    borderRadius: 2
                                },
                                children: (0, w.jsx)(`div`, {
                                    style: {
                                        height: 3,
                                        borderRadius: 2,
                                        width: `${Y.hunter.awareness}%`,
                                        background: Y.hunter.awareness >= 80 ? `#ee4444` : Y.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`,
                                        transition: `width 0.5s`
                                    }
                                })
                            }),
                            (0, w.jsxs)(`span`, {
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
                (0, w.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, w.jsxs)(`div`, {
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
                                (0, w.jsxs)(`div`, {
                                    style: {
                                        background: X > 70 ? `rgba(180,30,30,0.2)` : `rgba(255,255,255,0.03)`,
                                        border: `1px solid ${X > 70 ? `rgba(220,50,50,0.5)` : `rgba(255,255,255,0.08)`}`,
                                        borderRadius: 10,
                                        padding: `12px 10px`
                                    },
                                    children: [
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                fontSize: 14,
                                                color: X > 70 ? `#ee4444` : `rgba(255,255,255,0.3)`,
                                                letterSpacing: 2,
                                                marginBottom: 6
                                            },
                                            children: `⛈ STORM`
                                        }),
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                fontSize: 29,
                                                fontWeight: 700,
                                                color: X > 70 ? `#ee4444` : `#ee8844`
                                            },
                                            children: Y.stormDistance
                                        }),
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                fontSize: 20,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                marginTop: 2
                                            },
                                            children: `turns until impact`
                                        }),
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 8
                                            },
                                            children: (0, w.jsx)(i.div, {
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
                                    return (0, w.jsxs)(`div`, {
                                        style: {
                                            background: t ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Y.hunter.mode === `frenzy` || t ? `rgba(220,50,80,0.65)` : Y.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 10,
                                            padding: `12px 10px`,
                                            marginTop: 4
                                        },
                                        children: [
                                            (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: t ? `#ff8899` : `rgba(200,100,220,0.8)`,
                                                    letterSpacing: 2,
                                                    marginBottom: 6
                                                },
                                                children: `🐙 HUNTER`
                                            }),
                                            (0, w.jsxs)(`div`, {
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
                                                    rt(Y.hunter.mode),
                                                    it(Y.hunter.mode)
                                                ]
                                            }),
                                            (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: e <= 1 ? `#ff5566` : e <= 2 ? `#eeaa66` : `rgba(255,255,255,0.45)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginBottom: 6
                                                },
                                                children: e <= 1 ? `ON YOUR HULL` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`
                                            }),
                                            (0, w.jsxs)(`div`, {
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
                                            (0, w.jsx)(`div`, {
                                                style: {
                                                    height: 4,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2
                                                },
                                                children: (0, w.jsx)(i.div, {
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
                                (0, w.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.6)`,
                                        letterSpacing: 2,
                                        marginTop: 8
                                    },
                                    children: `EQUIPPED`
                                }),
                                Y.ship.upgrades.length === 0 ? (0, w.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontStyle: `italic`
                                    },
                                    children: `None yet`
                                }) : Y.ship.upgrades.map((e)=>{
                                    let t = I.find((t)=>t.id === e);
                                    return (0, w.jsxs)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            color: L[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, w.jsx)(`img`, {
                                                src: F[e],
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
                                Y.upgradeToken && (0, w.jsx)(`div`, {
                                    style: {
                                        fontSize: 14,
                                        color: `#eedd44`,
                                        marginTop: 4
                                    },
                                    children: `✦ Free upgrade — claim it at a port`
                                }),
                                (0, w.jsxs)(`div`, {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.3)`,
                                                letterSpacing: 3,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 10
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, w.jsx)(`div`, {
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
                                                return (0, w.jsxs)(i.div, {
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
                                                        (0, w.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 8,
                                                                marginBottom: 6
                                                            },
                                                            children: [
                                                                (0, w.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 16
                                                                    },
                                                                    children: e.icon
                                                                }),
                                                                (0, w.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        (0, w.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: 1
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, w.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.3)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, w.jsxs)(`div`, {
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
                                                        (0, w.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, o)=>(0, w.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        o > 0 && (0, w.jsx)(`div`, {
                                                                            style: {
                                                                                width: 10,
                                                                                height: 2,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, w.jsx)(i.div, {
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
                                                                            children: (0, w.jsx)(`span`, {
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
                        (0, w.jsxs)(`div`, {
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
                                R && !Y.event && !Y.showPort && !Y.gameOver && (0, w.jsx)(`div`, {
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
                                    ].map((e)=>(0, w.jsx)(`button`, {
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
                                R && (0, w.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 12,
                                        marginBottom: 6,
                                        fontSize: 13,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        (0, w.jsxs)(`span`, {
                                            style: {
                                                color: Y.stormDistance <= 4 ? `#ee4444` : `#ee8844`
                                            },
                                            children: [
                                                `⛈ `,
                                                Y.stormDistance,
                                                ` turns`
                                            ]
                                        }),
                                        (0, w.jsx)(`span`, {
                                            style: {
                                                color: `#cc44ee`
                                            },
                                            children: o[Y.currentZone ?? 1]?.name ?? `The Coasts`
                                        }),
                                        (0, w.jsxs)(`span`, {
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
                                !R && !Y.event && !Y.showPort && !Y.gameOver && (0, w.jsxs)(`div`, {
                                    "aria-label": `Sailing controls`,
                                    style: {
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 8,
                                        marginBottom: 10
                                    },
                                    children: [
                                        (0, w.jsx)(`span`, {
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
                                        ].map((e)=>(0, w.jsxs)(`button`, {
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
                                                    (0, w.jsx)(`span`, {
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
                                D && !Y.event && !Y.showPort && !Y.gameOver && (0, w.jsx)(Se, {
                                    tip: D,
                                    isMobile: R,
                                    onDismiss: _t
                                }),
                                (0, w.jsxs)(`div`, {
                                    style: {
                                        position: `relative`
                                    },
                                    children: [
                                        (0, w.jsx)(`div`, {
                                            style: {
                                                position: `absolute`,
                                                inset: 0,
                                                background: `radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)`,
                                                pointerEvents: `none`,
                                                zIndex: 2,
                                                borderRadius: 8
                                            }
                                        }),
                                        (0, w.jsxs)(`div`, {
                                            style: {
                                                display: `grid`,
                                                gridTemplateColumns: `repeat(${Y.ship.vision * 2 + 1},1fr)`,
                                                gap: 4,
                                                transform: `translate(${Dt.x}px, ${Dt.y}px)`,
                                                transition: Dt.instant ? `none` : `transform 420ms cubic-bezier(0.22, 1, 0.36, 1)`,
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
                                                        }, l = Y.ship.x + t, u = Y.ship.y + e, d = Y.hunter?.active && Y.hunter.x === l && Y.hunter.y === u, f = Y.hunter?.active ? Math.abs(Y.hunter.x - Y.ship.x) + Math.abs(Y.hunter.y - Y.ship.y) : 99, p = t === 0 && e === 0, m = c.revealed || c.visited, h = c.stormed, ee = Y.stormDistance <= 0 ? -1 : Y.grid.length + 2 - Math.floor((10 - Y.stormDistance) / 3), g = h && r === ee, te = tt[Y.currentZone ?? 1] ?? tt[1], ne = nt[Y.currentZone ?? 1] ?? nt[1], _ = h ? `#cc2222` : ne[c.type], v = Y.ship.vision * 2 + 1, y = R ? Math.floor((window.innerWidth - 16) / v) : Math.floor(Math.min(window.innerWidth * .5, window.innerHeight * .62) / v) - 4;
                                                        return (0, w.jsxs)(i.div, {
                                                            className: g ? `storm-front` : void 0,
                                                            initial: m ? {
                                                                opacity: 0,
                                                                scale: .8
                                                            } : !1,
                                                            animate: {
                                                                opacity: 1,
                                                                scale: 1
                                                            },
                                                            style: {
                                                                width: y,
                                                                height: y,
                                                                background: p ? `#0a2a4a` : d ? Y.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : h ? `#2a0505` : m ? te[c.type] ?? `#050a0f` : Y.currentZone === 2 ? `#03050a` : Y.currentZone === 3 ? `#020204` : `#050a0f`,
                                                                border: p ? f <= 1 ? `2px solid #ee4466` : `2px solid #4a8acc` : d ? `2px solid ${Y.hunter?.mode === `frenzy` ? `#ff4466` : Y.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : h ? `1px solid #cc222244` : m ? `1px solid ${_ ? _ + `44` : `rgba(255,255,255,0.08)`}` : `1px solid rgba(255,255,255,0.03)`,
                                                                borderRadius: 8,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                justifyContent: `center`,
                                                                fontSize: p ? 26 : 20,
                                                                boxShadow: d ? `0 0 ${f <= 2 ? 22 : 14}px ${Y.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : p ? f <= 1 ? `0 0 22px rgba(238,68,102,0.55)` : `0 0 20px rgba(74,138,204,0.4)` : _ && m ? `0 0 10px ${_}44` : `none`,
                                                                position: `relative`,
                                                                cursor: `default`
                                                            },
                                                            children: [
                                                                p && (0, w.jsxs)(w.Fragment, {
                                                                    children: [
                                                                        (0, w.jsx)(i.div, {
                                                                            animate: {
                                                                                rotate: kt.x * 10,
                                                                                y: kt.y * 5,
                                                                                scale: kt.x || kt.y ? 1.06 : 1
                                                                            },
                                                                            transition: {
                                                                                type: `spring`,
                                                                                stiffness: 200,
                                                                                damping: 11
                                                                            },
                                                                            style: {
                                                                                transformOrigin: `50% 75%`
                                                                            },
                                                                            children: (0, w.jsx)(i.div, {
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
                                                                                children: (0, w.jsx)(`img`, {
                                                                                    src: `/icons/ship.png`,
                                                                                    style: {
                                                                                        width: y * .82,
                                                                                        height: y * .82,
                                                                                        objectFit: `contain`,
                                                                                        filter: `drop-shadow(0 0 10px rgba(74,138,204,0.9))`
                                                                                    }
                                                                                })
                                                                            })
                                                                        }),
                                                                        (0, w.jsxs)(`div`, {
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
                                                                                (0, w.jsx)(`div`, {
                                                                                    style: {
                                                                                        flex: 1,
                                                                                        height: 3,
                                                                                        background: `rgba(0,0,0,0.5)`,
                                                                                        borderRadius: 2
                                                                                    },
                                                                                    children: (0, w.jsx)(`div`, {
                                                                                        style: {
                                                                                            width: `${Y.ship.hull / Y.ship.maxHull * 100}%`,
                                                                                            height: `100%`,
                                                                                            borderRadius: 2,
                                                                                            background: Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                                            transition: `width 0.3s`
                                                                                        }
                                                                                    })
                                                                                }),
                                                                                (0, w.jsx)(`div`, {
                                                                                    style: {
                                                                                        fontSize: Math.max(7, y * .16),
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
                                                                !d && !p && !m && c.type === `portal` && (0, w.jsx)(i.div, {
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
                                                                    children: (0, w.jsx)(`div`, {
                                                                        style: {
                                                                            fontSize: y * .5,
                                                                            lineHeight: 1,
                                                                            filter: `drop-shadow(0 0 6px #aa77ff)`
                                                                        },
                                                                        children: `🌀`
                                                                    })
                                                                }),
                                                                !d && !p && m && (0, w.jsx)(`img`, {
                                                                    src: `/icons/${c.type}.png`,
                                                                    style: {
                                                                        width: y * .82,
                                                                        height: y * .82,
                                                                        opacity: c.visited ? .35 : 1,
                                                                        objectFit: `contain`,
                                                                        mixBlendMode: `screen`
                                                                    }
                                                                }),
                                                                d && !p && (0, w.jsx)(i.div, {
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
                                                                    children: (0, w.jsx)(`img`, {
                                                                        src: `/icons/hunter.png`,
                                                                        style: {
                                                                            width: y * .82,
                                                                            height: y * .82,
                                                                            objectFit: `contain`
                                                                        }
                                                                    })
                                                                }),
                                                                s && !p && !d && (0, w.jsx)(i.div, {
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
                                                                d && !p && !m && (0, w.jsx)(i.div, {
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
                                                                    children: (0, w.jsx)(`img`, {
                                                                        src: `/icons/hunter.png`,
                                                                        style: {
                                                                            width: y * .82,
                                                                            height: y * .82,
                                                                            objectFit: `contain`,
                                                                            opacity: .4,
                                                                            filter: `grayscale(0.8) brightness(0.5)`
                                                                        }
                                                                    })
                                                                }),
                                                                !d && !p && !m && (0, w.jsx)(`span`, {
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
                                Y.dangerStreak > 0 && (0, w.jsxs)(i.div, {
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
                                        Y.scoreMultiplier > 1 && (0, w.jsxs)(`div`, {
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
                                        (0, w.jsxs)(`div`, {
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
                                        Y.dangerStreak >= 3 && (0, w.jsx)(i.div, {
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
                                        Y.dangerStreak >= 4 && (0, w.jsx)(i.div, {
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
                                        Y.dangerStreak >= 5 && (0, w.jsxs)(i.div, {
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
                                                (0, w.jsx)(g, {
                                                    name: `skull`,
                                                    size: 18,
                                                    style: {
                                                        marginRight: 6
                                                    }
                                                }),
                                                `CURSED WATERS`
                                            ]
                                        }),
                                        Y.dangerStreak >= 6 && (0, w.jsxs)(i.div, {
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
                                                (0, w.jsx)(g, {
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
                                Y.ship.upgrades.includes(`hunter`) && (0, w.jsxs)(`div`, {
                                    style: {
                                        position: `relative`,
                                        marginBottom: 8
                                    },
                                    children: [
                                        (0, w.jsx)(`div`, {
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
                                        (0, w.jsx)(`div`, {
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
                                                    return (0, w.jsx)(`div`, {
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
                                (0, w.jsx)(`div`, {
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
                                        return (0, w.jsxs)(w.Fragment, {
                                            children: [
                                                (0, w.jsxs)(`div`, {
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
                                                n && (0, w.jsxs)(`div`, {
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
                                Y.portalHint && (0, w.jsxs)(`div`, {
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
                                (Y.relics ?? []).length > 0 && !R && (0, w.jsx)(`div`, {
                                    style: {
                                        marginTop: 8,
                                        display: `flex`,
                                        gap: 6,
                                        justifyContent: `center`,
                                        flexWrap: `wrap`
                                    },
                                    children: (Y.relics ?? []).map((e)=>{
                                        let t = s(e);
                                        return t ? (0, w.jsxs)(`div`, {
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
                                                (0, w.jsx)(g, {
                                                    name: t.icon,
                                                    size: 16
                                                }),
                                                (0, w.jsx)(`span`, {
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
                                R && (0, w.jsx)(`div`, {
                                    "aria-hidden": !0,
                                    style: {
                                        flexShrink: 0,
                                        height: `calc(112px + env(safe-area-inset-bottom))`
                                    }
                                })
                            ]
                        }),
                        (0, w.jsxs)(`div`, {
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
                                (0, w.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.9)`,
                                        letterSpacing: 2
                                    },
                                    children: `UPGRADES`
                                }),
                                (0, w.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 5,
                                        overflowY: `auto`
                                    },
                                    children: I.map((e)=>{
                                        let t = Y.ship.upgrades.includes(e.id), n = O.includes(e.id), r = Y.upgradeToken && Y.showPort, i = r ? 0 : e.cost, a = !t && !n && Y.ship.gold >= i && Y.showPort, o = L[e.build];
                                        return (0, w.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Y.showPort && (n ? k((t)=>t.filter((t)=>t !== e.id)) : a && k((t)=>[
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
                                                (0, w.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`
                                                    },
                                                    children: [
                                                        (0, w.jsxs)(`span`, {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: t ? o : `#ffffff`,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 4
                                                            },
                                                            children: [
                                                                (0, w.jsx)(`img`, {
                                                                    src: F[e.id],
                                                                    style: {
                                                                        width: 24,
                                                                        height: 24,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                e.name
                                                            ]
                                                        }),
                                                        t ? (0, w.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, w.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, w.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: `#eedd44`
                                                            },
                                                            children: r && Y.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                (0, w.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, w.jsx)(Ge, {
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
                (0, w.jsx)(n, {
                    children: W && ze[W] && (0, w.jsxs)(i.div, {
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
                            W === `death` && K(!0), G(null);
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 140,
                            cursor: `pointer`,
                            background: `#05080f`
                        },
                        children: [
                            (0, w.jsx)(i.video, {
                                src: ze[W],
                                autoPlay: !0,
                                muted: $,
                                playsInline: !0,
                                preload: `metadata`,
                                onEnded: ()=>{
                                    W === `death` && K(!0), G(null);
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
                            }, W),
                            (0, w.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`,
                                    pointerEvents: `none`
                                }
                            }),
                            (0, w.jsxs)(`div`, {
                                style: {
                                    position: `absolute`,
                                    bottom: `12%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`,
                                    pointerEvents: `none`
                                },
                                children: [
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 40,
                                            color: `#e8e0d0`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                        },
                                        children: Be[W] ?? ``
                                    }),
                                    (0, w.jsx)(`div`, {
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
                (0, w.jsx)(n, {
                    children: A && (()=>{
                        let e = A.rarity === `legendary` ? `#eedd44` : A.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = A.rarity.toUpperCase();
                        return (0, w.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>Fe(null),
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
                                (0, w.jsx)(i.div, {
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
                                (0, w.jsx)(i.div, {
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
                                    children: (0, w.jsx)(g, {
                                        name: A.icon,
                                        size: 140
                                    })
                                }),
                                (0, w.jsxs)(i.div, {
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
                                (0, w.jsx)(i.div, {
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
                                    children: A.name
                                }),
                                (0, w.jsx)(i.div, {
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
                                    children: A.desc
                                }),
                                (0, w.jsx)(i.div, {
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
                (0, w.jsx)(n, {
                    children: Y.event && !W && !Y.gameOver && !Y.showPort && Be[Y.event.cellType] && (0, w.jsx)(He, {
                        variant: `scene`,
                        event: Y.event,
                        isMobile: R,
                        gold: Y.ship.gold,
                        hull: Y.ship.hull,
                        relics: Y.relics,
                        score: Y.score,
                        onboard: D,
                        onDismissOnboard: _t,
                        onChoose: mn,
                        canEscape: !!ln,
                        onSkip: hn
                    }, `event-scene`)
                }),
                (0, w.jsx)(n, {
                    children: Y.event && !W && !Y.gameOver && !Y.showPort && Y.event.cellType && !Re[Y.event.cellType] && (0, w.jsx)(He, {
                        variant: `compact`,
                        event: Y.event,
                        isMobile: R,
                        gold: Y.ship.gold,
                        hull: Y.ship.hull,
                        relics: Y.relics,
                        cellIcon: et[Y.event.cellType],
                        onboard: D,
                        onDismissOnboard: _t,
                        onChoose: mn,
                        canEscape: !!ln,
                        onSkip: hn
                    }, `event-compact`)
                }),
                (0, w.jsx)(Ke, {
                    open: !!Y.showPort && !Y.gameOver,
                    isMobile: R,
                    ship: Y.ship,
                    portUpgrades: Y.portUpgrades,
                    upgradeToken: !!Y.upgradeToken,
                    maxedComponents: Y.maxedComponents,
                    cart: O,
                    setCart: k,
                    onboard: D,
                    onDismissOnboard: _t,
                    onUpgradeComponent: gn,
                    onReroll: ()=>{
                        H(40), E((e)=>re(e));
                    },
                    onRepair: (e, t, n)=>{
                        H(n), E((n)=>c(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of O)H(50 + Ue.indexOf(e));
                        H(70), E((e)=>{
                            let t = e;
                            for (let e of O)t = u(t, e);
                            return ee(t);
                        }), k([]);
                    }
                }),
                (0, w.jsx)(Qe, {
                    open: xt,
                    state: Y,
                    isMobile: R,
                    isDailyRun: z,
                    personalBest: at,
                    isNewRecord: st,
                    newFeats: Ne,
                    scoreSubmitted: j,
                    nftMinted: We,
                    walletAddress: e,
                    account: t,
                    onChainDone: Ve,
                    setOnChainDone: N,
                    submitting: lt,
                    setSubmitting: ut,
                    connecting: Ee,
                    onConnect: ()=>Te(),
                    showGuestDailyCta: !!(e && De.current && !z && Oe && me),
                    onPlayDaily: me,
                    rangMois: wt,
                    harborDown: pt,
                    restarting: ht,
                    onRestart: _n,
                    onHome: ne
                }),
                (0, w.jsx)(n, {
                    children: jt && !R && (0, w.jsxs)(i.div, {
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
                            (0, w.jsx)(`video`, {
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
                            (0, w.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `rgba(0,0,0,0.3)`
                                }
                            }),
                            (0, w.jsxs)(i.div, {
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
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 32,
                                            color: `#cc44ee`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                        },
                                        children: `THE HUNTER STRIKES!`
                                    }),
                                    (0, w.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.7)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 6
                                        },
                                        children: `Tentacles rake the hull`
                                    }),
                                    (0, w.jsx)(`div`, {
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
                R && (0, w.jsxs)(w.Fragment, {
                    children: [
                        !Y.event && !Y.showPort && !Y.gameOver && (0, w.jsxs)(`div`, {
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
                                (0, w.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Nt(q === `ship` ? null : `ship`),
                                    "aria-label": `Show ship status`,
                                    "aria-expanded": q === `ship`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${q === `ship` ? `#44cc88` : `rgba(255,255,255,0.2)`}`,
                                        background: q === `ship` ? `rgba(68,204,136,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: q === `ship` ? `#44cc88` : `rgba(255,255,255,0.6)`,
                                        fontSize: 20,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: `⚓`
                                }),
                                (0, w.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Nt(q === `upgrades` ? null : `upgrades`),
                                    "aria-label": `Show upgrades`,
                                    "aria-expanded": q === `upgrades`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${q === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.2)`}`,
                                        background: q === `upgrades` ? `rgba(200,160,48,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: q === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.6)`,
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
                        (0, w.jsx)(n, {
                            children: q && (0, w.jsxs)(i.div, {
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
                                    q === `ship` && (0, w.jsxs)(w.Fragment, {
                                        children: [
                                            (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Y.ship.upgrades.length === 0 ? (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Y.ship.upgrades.map((e)=>{
                                                let t = I.find((t)=>t.id === e);
                                                return (0, w.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, w.jsx)(`img`, {
                                                            src: F[e],
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
                                            Y.upgradeToken && (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8
                                                },
                                                children: `✦ Free upgrade — claim it at a port`
                                            }),
                                            (0, w.jsx)(`div`, {
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
                                                return (0, w.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, w.jsx)(`span`, {
                                                            children: e.icon
                                                        }),
                                                        (0, w.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, w.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, w.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, w.jsx)(`span`, {
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
                                    q === `upgrades` && (0, w.jsxs)(w.Fragment, {
                                        children: [
                                            (0, w.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            I.map((e)=>{
                                                let t = Y.ship.upgrades.includes(e.id), n = L[e.build];
                                                return (0, w.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, w.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, w.jsx)(`img`, {
                                                                    src: F[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, w.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, w.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, w.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, w.jsx)(Ge, {
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
                        q && (0, w.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>Nt(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { at as default, __tla };
