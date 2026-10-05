import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { A as o, C as s, D as c, E as l, I as u, L as d, O as f, R as p, S as m, T as h, _ as g, b as _, c as v, f as ee, h as te, l as y, m as ne, n as b, p as re, t as ie, v as x, w as ae, x as oe, y as se } from "./anchor-BToIUbif.js";
import { a as ce, b as le, d as ue, h as de, m as fe, p as pe, t as me, x as he, __tla as __tla_0 } from "./supabase-BXtpc1SX.js";
import { l as ge, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let z;
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
    var S = e(t(), 1), _e = `corsair_onboard_v1`;
    function C() {
        try {
            return new Set(JSON.parse(localStorage.getItem(_e) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function ve(e) {
        let t = C();
        t.add(e);
        try {
            localStorage.setItem(_e, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function ye(e) {
        let t = C();
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
    var be = {
        gold: .5,
        buy: .5,
        damage: .6,
        streak: .55,
        zone: .6,
        death: .6,
        hunter_near: .65,
        hunter_attack: .7,
        thunder: .55
    }, xe = {}, Se = !1;
    function Ce(e) {
        Se = e;
    }
    function w(e) {
        if (!Se) try {
            let t = xe[e];
            t || (t = new Audio(`/sounds/${e}.wav`), xe[e] = t), t.volume = be[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var T = r();
    function E({ tip: e, isMobile: t, onDismiss: n }) {
        return (0, T.jsxs)(i.button, {
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
                (0, T.jsx)(`div`, {
                    style: {
                        fontSize: 11,
                        letterSpacing: 2,
                        color: `#c8a030`,
                        fontFamily: `'Cinzel', serif`,
                        marginBottom: 4
                    },
                    children: e.title
                }),
                (0, T.jsx)(`div`, {
                    style: {
                        fontSize: t ? 13 : 15,
                        lineHeight: 1.35
                    },
                    children: e.text
                }),
                (0, T.jsx)(`div`, {
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
    var we = `/assets/careful-Cp7BVX84.png`, D = `/assets/cover-B_e5YbfY.png`, O = `/assets/cursed-DmavkUs_.png`, Te = `/assets/detour-D8HBkeuW.png`, Ee = `/assets/dock-ePamt-Sr.png`, De = `/assets/explore-CNxn52P4.png`, k = `/assets/fight-g8Kc5AC3.png`, Oe = `/assets/leave-CeE9NwgD.png`, ke = `/assets/lurks-BB0IX5ES.png`, Ae = `/assets/pact-DCE16eF-.png`, A = `/assets/push-DcLNLHxV.png`, j = `/assets/ritual-B5bqWt-6.png`, je = `/assets/sacrifice-KlI9xYLE.png`, Me = `/assets/sail-yGR6Adzb.png`, M = `/assets/search-CSNg3Ko5.png`, Ne = `/assets/speed-BTjZicNY.png`, Pe = `/assets/take-CO53AH6i.png`, Fe = `/assets/tribute-CcshN1U0.png`, Ie = `/assets/vortex-l5f1oTMj.png`, Le = Object.fromEntries([
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
                "../../assets/choices/careful.png": we,
                "../../assets/choices/cover.png": D,
                "../../assets/choices/cursed.png": O,
                "../../assets/choices/detour.png": Te,
                "../../assets/choices/dock.png": Ee,
                "../../assets/choices/explore.png": De,
                "../../assets/choices/fight.png": k,
                "../../assets/choices/leave.png": Oe,
                "../../assets/choices/lurks.png": ke,
                "../../assets/choices/pact.png": Ae,
                "../../assets/choices/push.png": A,
                "../../assets/choices/ritual.png": j,
                "../../assets/choices/sacrifice.png": je,
                "../../assets/choices/sail.png": Me,
                "../../assets/choices/search.png": M,
                "../../assets/choices/speed.png": Ne,
                "../../assets/choices/take.png": Pe,
                "../../assets/choices/tribute.png": Fe,
                "../../assets/choices/vortex.png": Ie
            })[`../../assets/choices/${e}.png`], import.meta.url).href
        ])), Re = {
        1: `/scenes/island.jpg`,
        2: `/scenes/storm.jpg`,
        3: `/scenes/ancient-kraken.jpg`
    }, ze = {
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
    }, Be = {
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
    }, Ve = {
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
    function He(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function N(e, t) {
        let n = He(e);
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
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, T.jsx)(`img`, {
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
        }) : (0, T.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function Ke({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, score: s, cellIcon: c, onboard: l, onDismissOnboard: u, onChoose: d, canEscape: f, onSkip: p }) {
        let m = (0, T.jsx)(`div`, {
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
                let l = We(s.risk), u = N(s.desc, r), f = Ue(s, t.cellType, o, a), p = e === `scene` ? 1.04 : 1.02, m = e === `scene` ? .96 : .98;
                return (0, T.jsxs)(i.button, {
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
                        e === `scene` ? (0, T.jsx)(`div`, {
                            style: {
                                marginBottom: 12,
                                textAlign: `center`
                            },
                            children: (0, T.jsx)(`img`, {
                                src: Le[s.icon] || ``,
                                alt: ``,
                                style: {
                                    width: 72,
                                    height: 72,
                                    objectFit: `contain`
                                }
                            })
                        }) : (0, T.jsx)(`div`, {
                            style: {
                                fontSize: 26,
                                marginBottom: 4
                            },
                            children: s.icon
                        }),
                        (0, T.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: l,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: s.label
                        }),
                        (0, T.jsx)(`div`, {
                            style: {
                                fontSize: 20,
                                color: `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: f
                        }),
                        (0, T.jsx)(`div`, {
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
        }), h = f && p ? (0, T.jsx)(`button`, {
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
        return e === `scene` ? (0, T.jsxs)(i.div, {
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
                ze[t.cellType] && (0, T.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${ze[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, T.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                s != null && (0, T.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, T.jsxs)(`div`, {
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
                (0, T.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        l && u && (0, T.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, T.jsx)(E, {
                                tip: l,
                                isMobile: n,
                                onDismiss: u
                            })
                        }),
                        (0, T.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: 16,
                                paddingLeft: 8
                            },
                            children: (0, T.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 28 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: Ve[t.cellType] ?? t.cellType
                            })
                        }),
                        m,
                        h && (0, T.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: h
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, T.jsx)(i.div, {
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
            children: (0, T.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, T.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: Ge(c, 55)
                    }),
                    (0, T.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, T.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            l && u && (0, T.jsx)(E, {
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
    var P = {
        escape: `/assets/swift_sails-YMobDX4v.png`,
        ghost: `/assets/ghost_ship-4jaVs07k.png`,
        hunter: `/assets/treasure_hunter-C9jnAyZy.png`,
        rider: `/assets/storm_rider-BjRGnDwr.png`,
        greed: `/assets/cursed_greed-BlVfcQDt.png`,
        berserker: `/assets/berserker-B9haxHEY.png`
    }, qe = [
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
    ], F = d.upgrades.costs, I = [
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
                `Gold x${d.greed.goldMultiplier} on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm gets worse every 200g. Hunter speeds up at 800g.`
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
                `Storm surges +10% more frequent.`
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
    ], Je = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function Ye({ ok: e }) {
        return (0, T.jsx)(`span`, {
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
        let i = (e, t, n)=>(0, T.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, T.jsx)(Ye, {
                        ok: t
                    }),
                    (0, T.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, T.jsxs)(`div`, {
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
    function Ze({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, T.jsx)(n, {
            children: e && (0, T.jsxs)(i.div, {
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
                    (0, T.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, T.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, T.jsx)(`span`, {
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
                            u && d && (0, T.jsx)(E, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, T.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, T.jsx)(`div`, {
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
                                            return (0, T.jsxs)(`div`, {
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
                                                    (0, T.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, T.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, T.jsx)(`img`, {
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
                                                            (0, T.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, T.jsx)(`div`, {
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
                                                    (0, T.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: `rgba(255,255,255,0.6)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, T.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 11,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: t === 1 && s >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                    }),
                                                    a && (0, T.jsx)(`div`, {
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
                            (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, T.jsx)(i.button, {
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
                            (0, T.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: I.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = Je[e.build];
                                    return (0, T.jsxs)(`div`, {
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
                                            (0, T.jsx)(`img`, {
                                                src: P[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, T.jsxs)(`div`, {
                                                children: [
                                                    (0, T.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                            fontFamily: `'Pirata One', cursive`
                                                        },
                                                        children: e.name
                                                    }),
                                                    (0, T.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, T.jsx)(Xe, {
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
                            r.upgrades.length + c.length >= 2 && (0, T.jsx)(`div`, {
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
                    (0, T.jsx)(`div`, {
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
                        ].map((e)=>(0, T.jsxs)(i.button, {
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
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `#44cc88`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: e.label
                                    }),
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.5)`
                                        },
                                        children: e.desc
                                    }),
                                    (0, T.jsxs)(`div`, {
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
                    (0, T.jsxs)(i.button, {
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
                            (0, T.jsx)(v, {
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
    var Qe = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new ge({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function $e(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: Qe,
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
    function et({ payload: e, isMobile: t, onShare: n }) {
        return (0, T.jsxs)(i.div, {
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
                (0, T.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, T.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, T.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, T.jsxs)(`div`, {
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
                (0, T.jsx)(`div`, {
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
                    ].map((e)=>(0, T.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, T.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, T.jsx)(`div`, {
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
                (0, T.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, T.jsxs)(`div`, {
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
                        (0, T.jsx)(i.button, {
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
    async function tt(e) {
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
    function nt(e) {
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
    function rt({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: o, isNewRecord: s, newFeats: c, scoreSubmitted: l, nftMinted: u, walletAddress: d, account: p, onChainDone: m, setOnChainDone: h, submitting: g, setSubmitting: _, connecting: ee, onConnect: y, showGuestDailyCta: ne, onPlayDaily: b, rangMois: re, harborDown: ie, restarting: x, onRestart: ae, onHome: oe }) {
        return (0, T.jsx)(n, {
            children: e && (0, T.jsxs)(i.div, {
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
                    (0, T.jsx)(i.div, {
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
                    (0, T.jsx)(i.div, {
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
                        children: (0, T.jsx)(v, {
                            name: `skull`,
                            size: 130
                        })
                    }),
                    (0, T.jsx)(i.div, {
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
                    (0, T.jsx)(i.div, {
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
                    (0, T.jsxs)(i.div, {
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
                        let e = nt(t.log);
                        return (0, T.jsxs)(i.div, {
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
                                (0, T.jsxs)(`div`, {
                                    style: {
                                        fontSize: r ? 13 : 15,
                                        color: `#ee6655`,
                                        fontFamily: `'Cinzel', serif`,
                                        letterSpacing: 2
                                    },
                                    children: [
                                        (0, T.jsx)(v, {
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
                                (0, T.jsx)(`div`, {
                                    style: {
                                        fontSize: r ? 12 : 14,
                                        color: `rgba(255,255,255,0.55)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        textAlign: `center`
                                    },
                                    children: e.tip
                                }),
                                t.score < o && o > 0 && (0, T.jsxs)(`div`, {
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
                    c.length > 0 && (0, T.jsx)(i.div, {
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
                        children: c.map((e)=>(0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 10
                                },
                                children: [
                                    (0, T.jsx)(v, {
                                        name: e.icon,
                                        size: 26
                                    }),
                                    (0, T.jsxs)(`div`, {
                                        style: {
                                            textAlign: `left`
                                        },
                                        children: [
                                            (0, T.jsxs)(`div`, {
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
                                            (0, T.jsxs)(`div`, {
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
                    (0, T.jsx)(i.div, {
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
                        ].map((e)=>(0, T.jsxs)(`div`, {
                                style: {
                                    textAlign: `center`
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 10 : 13,
                                            color: `rgba(255,255,255,0.3)`,
                                            letterSpacing: r ? 1 : 3,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: e.label
                                    }),
                                    (0, T.jsx)(`div`, {
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
                    t.scoreBreakdown && (0, T.jsxs)(i.div, {
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
                            (0, T.jsx)(`div`, {
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
                            ].filter((e)=>e.val > 0).map((e)=>(0, T.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        marginBottom: 3
                                    },
                                    children: [
                                        (0, T.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.4)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1
                                            },
                                            children: e.label
                                        }),
                                        (0, T.jsxs)(`span`, {
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
                    (0, T.jsxs)(i.div, {
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
                            (0, T.jsx)(`div`, {
                                children: a ? se() ? `Seed: ${t.seed} — Daily Key: ${te()}` : `Blind daily — seed revealed at 00:00 UTC` : `Seed: ${t.seed} — challenge your crew!`
                            }),
                            a && (0, T.jsxs)(`div`, {
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
                    (0, T.jsxs)(i.div, {
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
                            p && !m && (0, T.jsx)(i.button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                disabled: g,
                                onClick: async ()=>{
                                    _(!0);
                                    try {
                                        await $e(p, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                    } catch (e) {
                                        console.warn(`On-chain submit failed:`, e);
                                    }
                                    h(!0), _(!1);
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
                                children: g ? `ENGRAVING...` : (0, T.jsxs)(T.Fragment, {
                                    children: [
                                        (0, T.jsx)(v, {
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
                            (0, T.jsx)(`div`, {
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
                            l && (0, T.jsx)(`div`, {
                                style: {
                                    fontSize: 14,
                                    color: `#44cc88`,
                                    letterSpacing: 2,
                                    fontFamily: `'Pirata One', cursive`
                                },
                                children: `✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD`
                            }),
                            u.length > 0 && (0, T.jsxs)(i.div, {
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
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            marginBottom: 4
                                        },
                                        children: (0, T.jsx)(v, {
                                            name: `flag`,
                                            size: 24
                                        })
                                    }),
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `#FFD700`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 2
                                        },
                                        children: `NFT EARNED!`
                                    }),
                                    u.map((e)=>(0, T.jsx)(`div`, {
                                            style: {
                                                fontSize: 13,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'Cinzel', serif`,
                                                marginTop: 4
                                            },
                                            children: e.replace(/_/g, ` `).toUpperCase()
                                        }, e)),
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginTop: 8,
                                            lineHeight: 1.4
                                        },
                                        children: `Your NFT will be sent to your wallet soon.`
                                    }),
                                    (0, T.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ()=>{
                                            let e = `🏴‍☠️ I earned "${u[0].replace(/_/g, ` `).replace(/\b\w/g, (e)=>e.toUpperCase())}" — a Genesis NFT in Corsair.\nNo mint button. No whitelist. Just sail, meet the condition, claim it before it's SOLD OUT.\nDare to find yours? ⚓\nhttps://playcorsair.xyz/`;
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
                            !d && (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `This run stayed local. Connect a wallet to submit scores, play the Daily, and earn NFTs.`
                                    }),
                                    (0, T.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: y,
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
                            ne && b && (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 4
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 13,
                                            color: `rgba(255,255,255,0.55)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            maxWidth: 360
                                        },
                                        children: `Wallet linked. This run stayed local — sail the Daily to climb today's board.`
                                    }),
                                    (0, T.jsx)(i.button, {
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
                                }, i = (t.relics ?? []).map((e)=>f(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = re ? `\n⚔️ #${re.rank} in Starktember — ${re.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair https://playcorsair.xyz/ #Starktember #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/ #Starknet`, l = nt(t.log);
                                return (0, T.jsx)(et, {
                                    isMobile: r,
                                    onShare: ()=>{
                                        tt(c);
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
                            (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    ie && (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try Sail again when you're back online`
                                    }),
                                    (0, T.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 12
                                        },
                                        children: [
                                            (0, T.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ae,
                                                disabled: x,
                                                style: {
                                                    padding: `14px 36px`,
                                                    borderRadius: 12,
                                                    border: `2px solid rgba(200,160,48,0.6)`,
                                                    background: `rgba(80,60,10,0.5)`,
                                                    color: `#c8a030`,
                                                    cursor: x ? `wait` : `pointer`,
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Pirata One', cursive`,
                                                    boxShadow: `0 0 20px rgba(200,160,48,0.2)`,
                                                    opacity: x ? .7 : 1
                                                },
                                                children: x ? `PREPARING…` : `SAIL AGAIN`
                                            }),
                                            (0, T.jsx)(i.button, {
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
    var it = {
        sea: `〰`,
        storm: `/icons_ui/storm.png`,
        pirate: `/icons_ui/swords.png`,
        treasure: `/icons_ui/treasure.png`,
        port: `/icons/port.png`,
        kraken: `/icons_ui/kraken.png`,
        wreck: `/icons/wreck.png`,
        island: `/icons/island.png`,
        rocks: `/icons/rocks.png`
    }, at = {
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
    }, ot = {
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
    function L(e) {
        let t = e.hunter;
        return t?.active ? Math.abs(t.x - e.ship.x) + Math.abs(t.y - e.ship.y) : 99;
    }
    function st(e) {
        let t = (e.relics ?? []).includes(`black_flag`) ? 2 : 0, n = Math.max(d.hunter.minDamage, d.hunter.baseDamage - e.ship.power) + t;
        return u(e.ship.upgrades, n);
    }
    function ct(e) {
        return e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`;
    }
    function R(e) {
        return e === `frenzy` ? `ENR` : e === `stalking` ? `STK` : e === `searching` ? `SRC` : `TRK`;
    }
    function lt(e) {
        return e === `frenzy` ? `Knows where you are · strikes hard` : e === `stalking` ? `Cuts your path · moves every turn` : e === `searching` ? `Lost your trail · wandering` : `Following your wake · every other turn`;
    }
    function ut(e) {
        return e <= 0 ? `ON YOU` : e === 1 ? `1 CELL — NEXT HIT` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`;
    }
    function dt(e) {
        if (!e.hunter?.active) return `calm`;
        let t = L(e);
        return t <= 1 || e.hunter.mode === `frenzy` ? `critical` : t <= 3 || e.hunter.awareness >= 80 ? `danger` : t <= 5 || e.hunter.mode === `stalking` ? `watch` : `calm`;
    }
    function ft(e) {
        if (!e.hunter?.active) return ``;
        let t = L(e), n = st(e), r = ct(e.hunter.mode);
        return t <= 1 ? `${r} · STRIKE ~−${n} hull` : `${r} · ${t} away · hit ~−${n}`;
    }
    function pt({ state: e, isMobile: t, slide: n, lurch: r, onboard: a, onDismissOnboard: o, onMove: s }) {
        let c = e.ship.vision * 2 + 1, l = t ? 240 : 210, u = Math.max(180, window.innerHeight - l), d = t ? window.innerWidth - 16 : Math.min(window.innerWidth * .48, 560), m = Math.max(28, Math.floor(Math.min(d, u) / c) - 4), h = !e.event && !e.showPort && !e.gameOver && (t ? (0, T.jsx)(`div`, {
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
            ].map((e)=>(0, T.jsx)(`button`, {
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
        }) : (0, T.jsxs)(`div`, {
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
                (0, T.jsx)(`span`, {
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
                ].map((e)=>(0, T.jsxs)(`button`, {
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
                            (0, T.jsx)(`span`, {
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
        return (0, T.jsxs)(`div`, {
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
                t && (0, T.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12,
                        marginBottom: 6,
                        fontSize: 13,
                        fontFamily: `'Cinzel', serif`,
                        flexShrink: 0
                    },
                    children: [
                        (0, T.jsxs)(`span`, {
                            style: {
                                color: e.stormDistance <= 4 ? `#ee4444` : `#ee8844`
                            },
                            children: [
                                `⛈ `,
                                e.stormDistance,
                                ` turns`
                            ]
                        }),
                        (0, T.jsx)(`span`, {
                            style: {
                                color: `#cc44ee`
                            },
                            children: p[e.currentZone ?? 1]?.name ?? `The Coasts`
                        }),
                        (0, T.jsxs)(`span`, {
                            style: {
                                color: `#eedd44`
                            },
                            children: [
                                `✦ `,
                                e.score,
                                ` pts`
                            ]
                        })
                    ]
                }),
                a && !e.event && !e.showPort && !e.gameOver && (0, T.jsx)(E, {
                    tip: a,
                    isMobile: t,
                    onDismiss: o
                }),
                (0, T.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        flexShrink: 0
                    },
                    children: [
                        e.hunter?.active && !e.gameOver && (()=>{
                            let n = dt(e), r = ft(e), a = n === `critical` ? `rgba(160,10,30,0.92)` : n === `danger` ? `rgba(100,20,50,0.88)` : n === `watch` ? `rgba(70,20,90,0.85)` : `rgba(40,20,60,0.8)`, o = n === `critical` ? `rgba(255,80,100,0.75)` : n === `danger` ? `rgba(255,120,80,0.55)` : `rgba(180,80,220,0.45)`;
                            return (0, T.jsxs)(i.div, {
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
                                    (0, T.jsx)(v, {
                                        name: `kraken`,
                                        size: t ? 14 : 16
                                    }),
                                    (0, T.jsx)(`div`, {
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
                        (0, T.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)`,
                                pointerEvents: `none`,
                                zIndex: 2,
                                borderRadius: 8
                            }
                        }),
                        (0, T.jsxs)(`div`, {
                            style: {
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
                                        }, d = e.ship.x + n, f = e.ship.y + t, p = e.hunter?.active && e.hunter.x === d && e.hunter.y === f, h = e.hunter?.active ? L(e) : 99, g = n === 0 && t === 0, _ = u.revealed || u.visited, v = u.stormed, ee = e.stormDistance <= 0 ? -1 : e.grid.length + 2 - Math.floor((10 - e.stormDistance) / 3), te = v && o === ee, y = at[e.currentZone ?? 1] ?? at[1], ne = ot[e.currentZone ?? 1] ?? ot[1], b = v ? `#cc2222` : ne[u.type];
                                        return (0, T.jsxs)(i.div, {
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
                                                background: g ? `#0a2a4a` : p ? e.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : v ? `#2a0505` : _ ? y[u.type] ?? `#050a0f` : e.currentZone === 2 ? `#03050a` : e.currentZone === 3 ? `#020204` : `#050a0f`,
                                                border: g ? h <= 1 ? `2px solid #ee4466` : `2px solid #4a8acc` : p ? `2px solid ${e.hunter?.mode === `frenzy` ? `#ff4466` : e.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : v ? `1px solid #cc222244` : _ ? `1px solid ${b ? b + `44` : `rgba(255,255,255,0.08)`}` : `1px solid rgba(255,255,255,0.03)`,
                                                borderRadius: 8,
                                                display: `flex`,
                                                alignItems: `center`,
                                                justifyContent: `center`,
                                                fontSize: g ? 26 : 20,
                                                boxShadow: p ? `0 0 ${h <= 2 ? 22 : 14}px ${e.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : g ? h <= 1 ? `0 0 22px rgba(238,68,102,0.55)` : `0 0 20px rgba(74,138,204,0.4)` : b && _ ? `0 0 10px ${b}44` : `none`,
                                                position: `relative`,
                                                cursor: `default`
                                            },
                                            children: [
                                                g && (0, T.jsxs)(T.Fragment, {
                                                    children: [
                                                        (0, T.jsx)(i.div, {
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
                                                                transformOrigin: `50% 75%`
                                                            },
                                                            children: (0, T.jsx)(i.div, {
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
                                                                children: (0, T.jsx)(`img`, {
                                                                    src: `/icons/ship.png`,
                                                                    style: {
                                                                        width: m * .82,
                                                                        height: m * .82,
                                                                        objectFit: `contain`,
                                                                        filter: `drop-shadow(0 0 10px rgba(74,138,204,0.9))`
                                                                    }
                                                                })
                                                            })
                                                        }),
                                                        (0, T.jsxs)(`div`, {
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
                                                                (0, T.jsx)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        height: 3,
                                                                        background: `rgba(0,0,0,0.5)`,
                                                                        borderRadius: 2
                                                                    },
                                                                    children: (0, T.jsx)(`div`, {
                                                                        style: {
                                                                            width: `${e.ship.hull / e.ship.maxHull * 100}%`,
                                                                            height: `100%`,
                                                                            borderRadius: 2,
                                                                            background: e.ship.hull <= 5 ? `#ee4444` : e.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                            transition: `width 0.3s`
                                                                        }
                                                                    })
                                                                }),
                                                                (0, T.jsx)(`div`, {
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
                                                !p && !g && !_ && u.type === `portal` && (0, T.jsx)(i.div, {
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
                                                    children: (0, T.jsx)(`div`, {
                                                        style: {
                                                            fontSize: m * .5,
                                                            lineHeight: 1,
                                                            filter: `drop-shadow(0 0 6px #aa77ff)`
                                                        },
                                                        children: `🌀`
                                                    })
                                                }),
                                                !p && !g && _ && (0, T.jsx)(`img`, {
                                                    src: `/icons/${u.type}.png`,
                                                    style: {
                                                        width: m * .82,
                                                        height: m * .82,
                                                        opacity: u.visited ? .35 : 1,
                                                        objectFit: `contain`,
                                                        mixBlendMode: `screen`
                                                    }
                                                }),
                                                p && !g && (0, T.jsxs)(i.div, {
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
                                                        position: `relative`
                                                    },
                                                    children: [
                                                        (0, T.jsx)(`img`, {
                                                            src: `/icons/hunter.png`,
                                                            style: {
                                                                width: m * .82,
                                                                height: m * .82,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, T.jsxs)(`div`, {
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
                                                                R(e.hunter.mode),
                                                                ` `,
                                                                h <= 1 ? `HIT` : h
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                l && !g && !p && (0, T.jsx)(i.div, {
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
                                                p && !g && !_ && (0, T.jsx)(i.div, {
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
                                                    children: (0, T.jsx)(`img`, {
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
                                                !p && !g && !_ && (0, T.jsx)(`span`, {
                                                    style: {
                                                        fontSize: 21,
                                                        color: `rgba(255,255,255,0.06)`,
                                                        fontWeight: 700
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
                e.dangerStreak > 0 && (0, T.jsxs)(i.div, {
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
                        e.scoreMultiplier > 1 && (0, T.jsxs)(`div`, {
                            style: {
                                fontSize: t ? 17 : e.scoreMultiplier >= 3 ? 28 : 22,
                                fontWeight: 700,
                                color: e.scoreMultiplier >= 3 ? `#ee4444` : `#eedd44`,
                                letterSpacing: t ? 2 : 3,
                                textShadow: t ? `none` : e.scoreMultiplier >= 3 ? `0 0 30px #ee4444, 0 0 60px #ee444466` : `0 0 20px #eedd44, 0 0 40px #eedd4466`,
                                filter: e.scoreMultiplier >= 3 ? `brightness(1.3)` : `brightness(1.1)`
                            },
                            children: [
                                e.scoreMultiplier >= 3 ? `🔥🔥🔥` : `🔥`,
                                ` ×`,
                                e.scoreMultiplier,
                                ` COMBO`
                            ]
                        }),
                        (0, T.jsxs)(`div`, {
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
                                e.dangerStreak >= 3 && (0, T.jsx)(`span`, {
                                    style: {
                                        color: `#ee8844`,
                                        marginLeft: 10
                                    },
                                    children: `HUNTER ALERT`
                                }),
                                e.dangerStreak >= 4 && (0, T.jsx)(`span`, {
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
                e.ship.upgrades.includes(`hunter`) && (0, T.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        marginBottom: 8,
                        flexShrink: 0
                    },
                    children: [
                        (0, T.jsx)(`div`, {
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
                        (0, T.jsx)(`div`, {
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
                                    return (0, T.jsx)(`div`, {
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
                (0, T.jsx)(`div`, {
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
                        return (0, T.jsxs)(T.Fragment, {
                            children: [
                                (0, T.jsxs)(`div`, {
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
                                i && (0, T.jsxs)(`div`, {
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
                e.portalHint && (0, T.jsxs)(`div`, {
                    style: {
                        marginTop: 6,
                        fontSize: 13,
                        color: `#8866ff`,
                        fontFamily: `'IM Fell English', cursive`,
                        textAlign: `center`,
                        fontStyle: `italic`,
                        animation: `pulse 2s infinite`,
                        flexShrink: 0,
                        paddingBottom: 4
                    },
                    children: [
                        `✦ `,
                        e.portalHint,
                        ` ✦`
                    ]
                }),
                (e.relics ?? []).length > 0 && !t && (0, T.jsx)(`div`, {
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
                        return t ? (0, T.jsxs)(`div`, {
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
                                (0, T.jsx)(v, {
                                    name: t.icon,
                                    size: 16
                                }),
                                (0, T.jsx)(`span`, {
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
                t && (0, T.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        flexShrink: 0,
                        height: `calc(112px + env(safe-area-inset-bottom))`
                    }
                })
            ]
        });
    }
    var mt = `/icons/gold.png`, ht = (e, t = 14)=>(0, T.jsx)(v, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    z = function({ walletAddress: e, account: t, username: r, onHome: u, onPlayDaily: d, dailySeed: se, isDaily: ge, seedToken: _e, shipId: C, resumeState: be, resumeRunId: xe, resumeActions: Se }) {
        let { connect: E, connecting: we } = a(), [D, O] = (0, S.useState)(()=>be ?? x(se, C ?? `default`)), Te = (0, S.useRef)(!e), [Ee, De] = (0, S.useState)(()=>!g()), [k, Oe] = (0, S.useState)(null), [ke, Ae] = (0, S.useState)(!1), [A, j] = (0, S.useState)([]), [je, Me] = (0, S.useState)([]), [M, Ne] = (0, S.useState)(null), Pe = (0, S.useRef)((D.relics ?? []).length), [Fe, Ie] = (0, S.useState)(!1), [Le, He] = (0, S.useState)(!1), N = (0, S.useRef)(!1), [Ue, We] = (0, S.useState)([]), [Ge, F] = (0, S.useState)(null), [Ye, Qe] = (0, S.useState)(0), [$e, et] = (0, S.useState)(()=>parseInt(localStorage.getItem(`corsair_best_score`) || `0`)), [tt, nt] = (0, S.useState)(!1), [at, ot] = (0, S.useState)(!1), [R, ft] = (0, S.useState)(window.innerWidth < 768), z = ge === !0, gt = (0, S.useRef)(_e), [_t, vt] = (0, S.useState)(!1), [yt, bt] = (0, S.useState)(!1);
        (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Oe(null);
                return;
            }
            D.turn > 0 && ve(`sail`), Oe(ye(D));
        }, [
            D.turn,
            D.event,
            D.showPort,
            D.hunter?.active,
            D.stormDistance,
            D.gameOver
        ]);
        let B = ()=>{
            k && (ve(k.id), Oe(null));
        };
        (0, S.useEffect)(()=>{
            z && (oe(), e && te());
        }, []), (0, S.useEffect)(()=>{
            if (!e) {
                De(!g());
                return;
            }
            pe(e, te()).then((e)=>De(!(e || g())));
        }, [
            e
        ]);
        let V = (0, S.useRef)(xe ?? crypto.randomUUID()), H = (0, S.useRef)(Se ? [
            ...Se
        ] : []), U = (e)=>{
            H.current.push(e);
        }, W = (0, S.useRef)([]);
        (0, S.useEffect)(()=>{
            let t = e;
            !t || D.gameOver || H.current.length !== 0 && re({
                run_id: V.current,
                wallet_address: t,
                seed: D.seed,
                ship_id: C ?? `default`,
                is_daily: z,
                actions: H.current,
                turn: D.turn,
                score: D.score,
                saved_at: Date.now()
            });
        }, [
            D
        ]), (0, S.useEffect)(()=>{
            let e = H.current.length - 1;
            e < 0 || (W.current[e * 3] = D.score, W.current[e * 3 + 1] = D.ship.hull, W.current[e * 3 + 2] = D.rngState ?? -1);
        }, [
            D
        ]);
        let xt = (0, S.useRef)(0);
        (0, S.useEffect)(()=>{
            e && (xe || he({
                run_id: V.current,
                wallet_address: e,
                username: r ?? null,
                seed: D.seed,
                is_daily: z,
                seed_token: _e ?? null
            }));
        }, []), (0, S.useEffect)(()=>{
            !e || D.gameOver || D.turn - xt.current < 3 || (xt.current = D.turn, fe(V.current, {
                score: D.score,
                turn: D.turn,
                zone: D.currentZone ?? 1,
                gold: D.ship.gold,
                hull: D.ship.hull
            }));
        }, [
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (!(!e || !D.gameOver) && !N.current) {
                if (N.current = !0, ce(V.current, {
                    score: D.score,
                    turn: D.turn,
                    zone: D.currentZone ?? 1,
                    gold: D.ship.gold,
                    hull: D.ship.hull,
                    run_title: D.runTitle
                }), !z && !gt.current) {
                    console.warn(`[approve] skip : seed local, run non soumise`), y();
                    return;
                }
                le({
                    run_id: V.current,
                    wallet_address: e,
                    seed: D.seed,
                    ship_id: C ?? `default`,
                    is_daily: z,
                    actions: H.current,
                    checks: H.current.flatMap((e, t)=>[
                            W.current[t * 3] ?? -1,
                            W.current[t * 3 + 1] ?? -1,
                            W.current[t * 3 + 2] ?? -1
                        ]),
                    final_score: D.score,
                    final_turn: D.turn
                }).then(()=>me(V.current)).then((e)=>{
                    e?.approved ? (Ie(!0), e.nft?.minted?.length && We(e.nft.minted.map((e)=>typeof e == `string` ? e : e.nft))) : console.warn(`[approve] refuse :`, e?.raison ?? e);
                }).catch((e)=>{
                    console.warn(`[approve]`, e), ee(`approve`, {
                        run_id: V.current
                    });
                }), y();
            }
        }, [
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            let e = ()=>ft(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [G, K] = (0, S.useState)(null), [St, Ct] = (0, S.useState)(!1), [wt, q] = (0, S.useState)(!1), Tt = (0, S.useRef)(null), Et = (0, S.useRef)(new Set), [Dt, Ot] = (0, S.useState)(null);
        (0, S.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !D.gameOver || !z || !e || !n || Fe && ue().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && Ot({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            D.gameOver,
            Fe
        ]);
        let kt = (0, S.useRef)({
            x: D.ship.x,
            y: D.ship.y
        }), [At, jt] = (0, S.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [Mt, Nt] = (0, S.useState)({
            x: 0,
            y: 0
        });
        (0, S.useEffect)(()=>{
            let e = kt.current, t = D.ship.x - e.x, n = D.ship.y - e.y;
            if (kt.current = {
                x: D.ship.x,
                y: D.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = D.ship.vision * 2 + 1, i = (R ? Math.floor((window.innerWidth - 16) / r) : Math.floor(Math.min(window.innerWidth * .5, window.innerHeight * .62) / r) - 4) + 4, a = .8;
            jt({
                x: t * i * a,
                y: n * i * a,
                instant: !0
            }), Nt({
                x: t,
                y: n
            });
            let o = setTimeout(()=>Nt({
                    x: 0,
                    y: 0
                }), 380), s = requestAnimationFrame(()=>jt({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(s), clearTimeout(o);
            };
        }, [
            D.ship.x,
            D.ship.y
        ]);
        let [Pt, Ft] = (0, S.useState)(!1), [J, It] = (0, S.useState)(null), [Lt, Rt] = (0, S.useState)(!1), [zt, Bt] = (0, S.useState)(!1), [Vt, Ht] = (0, S.useState)(!1), [Ut, Wt] = (0, S.useState)(!1), [Gt, Kt] = (0, S.useState)(!1), [qt, Jt] = (0, S.useState)(!1), [Yt, Xt] = (0, S.useState)(!1), [Zt, Qt] = (0, S.useState)(!1), [$t, en] = (0, S.useState)(!1), [tn, nn] = (0, S.useState)(!1), [rn, an] = (0, S.useState)(!1), [on, sn] = (0, S.useState)(null), [cn, ln] = (0, S.useState)(0), un = ()=>{
            Ae(!0), setTimeout(()=>Ae(!1), 400);
        }, dn = (e)=>{
            sn(e), setTimeout(()=>sn(null), 150);
        }, Y = D, X = Math.min(100, (1 - Y.stormDistance / 10) * 100), fn = Y.ship.hull <= 5 ? `#ee4444` : Y.ship.hull <= 10 ? `#ee8844` : `#44cc88`, pn = !Y.escapeUsed && Y.ship.upgrades.includes(`escape`) && Y.event && Y.event.choices[0].risk !== `safe`;
        (0, S.useEffect)(()=>{
            if (R) {
                K(null);
                return;
            }
            if (D.gameOver) return;
            let e = D.event?.cellType;
            if (e && Be[e]) {
                if (Et.current.has(e)) return;
                Et.current.add(e), K(e);
                let t = setTimeout(()=>K(null), 5e3);
                return ()=>clearTimeout(t);
            }
        }, [
            D.event,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                an(!1);
                return;
            }
            D.event?.cellType === `port` && !R && (an(!0), setTimeout(()=>an(!1), 5e3));
        }, [
            D.event,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Xt(!1);
                return;
            }
            if (D.gameOver) {
                Xt(!1);
                return;
            }
            if (D.event?.cellType === `rocks` && !R) {
                Xt(!0);
                let e = setTimeout(()=>Xt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Qt(!1);
                return;
            }
            if (D.event?.cellType === `treasure` && !R) {
                Qt(!0);
                let e = setTimeout(()=>Qt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                en(!1);
                return;
            }
            if (D.event?.cellType === `cursed_treasure` && !R) {
                en(!0);
                let e = setTimeout(()=>en(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                nn(!1);
                return;
            }
            if (D.event?.cellType === `storm` && !R) {
                nn(!0);
                let e = setTimeout(()=>nn(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Kt(!1);
                return;
            }
            if (D.event?.cellType === `ancient_kraken` && !R) {
                Kt(!0);
                let e = setTimeout(()=>Kt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Jt(!1);
                return;
            }
            if (D.event?.cellType === `maelstrom` && !R) {
                Jt(!0);
                let e = setTimeout(()=>Jt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Wt(!1);
                return;
            }
            if (D.event?.cellType === `island` && !R) {
                Wt(!0);
                let e = setTimeout(()=>Wt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Ht(!1);
                return;
            }
            if (D.gameOver) {
                Ht(!1);
                return;
            }
            if (D.event?.cellType === `wreck` && !R) {
                Ht(!0);
                let e = setTimeout(()=>Ht(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Bt(!1);
                return;
            }
            if (D.gameOver) {
                Bt(!1);
                return;
            }
            if (D.event?.cellType === `pirate` && !R) {
                Bt(!0);
                let e = setTimeout(()=>Bt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                Rt(!1);
                return;
            }
            if (D.event?.cellType === `kraken` && !R) {
                Rt(!0);
                let e = setTimeout(()=>Rt(!1), 5e3);
                return ()=>clearTimeout(e);
            }
        }, [
            D.event,
            D.gameOver
        ]);
        let mn = (0, S.useRef)(1);
        (0, S.useEffect)(()=>{
            let e = D.currentZone ?? 1;
            if (e > mn.current) {
                let t = p[e];
                F({
                    lines: [
                        ...t.transitionText,
                        ``,
                        `You have entered:`,
                        t.name.toUpperCase()
                    ],
                    zone: e
                }), Qe(0), mn.current = e;
            }
        }, [
            D.currentZone
        ]), (0, S.useEffect)(()=>{
            if (!Ge) return;
            if (Ye >= Ge.lines.length) {
                setTimeout(()=>F(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Qe((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            Ge,
            Ye
        ]), (0, S.useEffect)(()=>{
            D.gameOver && D.score > 0 && D.score > $e && (et(D.score), nt(!0), localStorage.setItem(`corsair_best_score`, D.score.toString()));
        }, [
            D.gameOver
        ]), (0, S.useEffect)(()=>{
            if (D.gameOver) {
                let e = o(D);
                if (e.length > 0 && (Me(e), w(`streak`)), y(), R) q(!0);
                else {
                    let e = Z.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Ft(!1), K(`death`), Tt.current = setTimeout(()=>{
                            q((e)=>e || !0), K(null);
                        }, 9e3);
                    }, e);
                }
            } else Tt.current &&= (clearTimeout(Tt.current), null), q(!1), K(null), Et.current.clear();
        }, [
            D.gameOver
        ]);
        let Z = (0, S.useRef)(!1), hn = (0, S.useRef)(-99), gn = (0, S.useRef)(null);
        (0, S.useEffect)(()=>{
            D.log?.includes(`Tentacles rake the hull`) && (D.turn - hn.current < 3 || (hn.current = D.turn, gn.current && clearTimeout(gn.current), Z.current = !0, Ft(!0), gn.current = setTimeout(()=>{
                Z.current = !1, Ft(!1);
            }, 3500)));
        }, [
            D.log,
            D.turn
        ]), (0, S.useEffect)(()=>{
            if (!Pt) return;
            let e = ()=>{
                Z.current = !1, Ft(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            Pt
        ]), (0, S.useEffect)(()=>{
            if (D.log?.includes(`⚡ Storm surge`) && dn(`rgba(100,150,255,0.35)`), (D.event?.cellType === `kraken` || D.event?.cellType === `ancient_kraken`) && dn(`rgba(150,0,255,0.3)`), D.event?.cellType === `ancient_kraken` && dn(`rgba(200,160,48,0.4)`), D.hunter?.active) {
                let e = dt(D);
                ln(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else ln(0);
        }, [
            D
        ]), (0, S.useEffect)(()=>{
            let e = (e)=>{
                if (D.gameOver || D.event || D.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && _n(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && _n(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && _n(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            D.gameOver,
            D.event,
            D.showPort,
            D.turn
        ]);
        let _n = (e, t)=>{
            U(e === -1 ? 0 : e === 1 ? 2 : 1), O((n)=>m(n, e, t));
        }, vn = (e)=>{
            U(10 + e), O((t)=>{
                let n = h(t, e);
                return n.ship.hull < t.ship.hull && un(), n;
            });
        }, yn = ()=>{
            U(20), O((e)=>l(e));
        }, bn = (e)=>{
            U(e === `hull` ? 30 : e === `weapon` ? 31 : 32), O((t)=>c(t, e));
        }, xn = async ()=>{
            if (e) {
                bt(!0), vt(!1);
                let t = await de(e);
                if (bt(!1), !t) {
                    vt(!0);
                    return;
                }
                gt.current = t.seed_token;
                let n = x(t.seed, C ?? `default`);
                H.current = [], W.current = [], xt.current = 0, V.current = crypto.randomUUID(), N.current = !1, Ie(!1), He(!1), We([]), he({
                    run_id: V.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), O(n);
                return;
            }
            let t = x(void 0, C ?? `default`);
            H.current = [], W.current = [], xt.current = 0, V.current = crypto.randomUUID(), N.current = !1, Ie(!1), He(!1), We([]), O(t);
        }, Q = (0, S.useRef)(null), [$, Sn] = (0, S.useState)(!1);
        (0, S.useEffect)(()=>{
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
        }, []), (0, S.useEffect)(()=>{
            Q.current && (Q.current.muted = $), Ce($);
        }, [
            $
        ]);
        let Cn = (0, S.useRef)({
            gold: D.ship.gold,
            hull: D.ship.hull,
            zone: D.currentZone ?? 1,
            over: D.gameOver,
            mult: D.scoreMultiplier ?? 1,
            hmode: D.hunter?.mode ?? ``,
            storm: D.stormDistance
        });
        return (0, S.useEffect)(()=>{
            let e = Cn.current, t = !!D.log?.includes(`Tentacles rake`);
            if (D.gameOver && !e.over) w(`death`);
            else if (!D.gameOver) {
                D.ship.gold > e.gold && w(`gold`), D.ship.gold < e.gold && D.showPort && w(`buy`), t ? w(`hunter_attack`) : D.ship.hull < e.hull && w(`damage`), (D.currentZone ?? 1) !== e.zone && w(`zone`), (D.scoreMultiplier ?? 1) > e.mult && w(`streak`);
                let n = D.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && w(`hunter_near`), D.stormDistance < e.storm && D.stormDistance <= 4 && D.stormDistance > 0 && (w(`thunder`), un());
            }
            Cn.current = {
                gold: D.ship.gold,
                hull: D.ship.hull,
                zone: D.currentZone ?? 1,
                over: D.gameOver,
                mult: D.scoreMultiplier ?? 1,
                hmode: D.hunter?.mode ?? ``,
                storm: D.stormDistance
            };
            let n = (D.relics ?? []).length;
            if (n > Pe.current) {
                let e = (D.relics ?? [])[n - 1], t = f(e);
                t && (Ne(t), w(`streak`));
            }
            Pe.current = n;
        }, [
            D
        ]), (0, T.jsxs)(i.div, {
            animate: ke ? {
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
                (0, T.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, T.jsx)(i.div, {
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
                                backgroundImage: `url(${Re[Y.currentZone ?? 1] ?? Re[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Y.currentZone ?? 1),
                        (0, T.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        })
                    ]
                }),
                on && (0, T.jsx)(i.div, {
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
                        background: on,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                cn > 0 && (0, T.jsx)(i.div, {
                    animate: {
                        opacity: [
                            cn,
                            cn * .6,
                            cn
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
                Y.ship.hull <= 5 && !Y.gameOver && (0, T.jsx)(i.div, {
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
                (0, T.jsxs)(`div`, {
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
                        (0, T.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: R ? 6 : 10
                            },
                            children: [
                                (0, T.jsx)(`img`, {
                                    src: ie,
                                    style: {
                                        width: R ? 28 : 56,
                                        height: R ? 28 : 56,
                                        objectFit: `contain`
                                    }
                                }),
                                !R && ` CORSAIR`,
                                (()=>{
                                    let e = b.find((e)=>e.id === (Y.shipType ?? `default`)) ?? b[0];
                                    return (0, T.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: R ? 0 : 4,
                                            padding: R ? `2px 7px` : `3px 10px`,
                                            borderRadius: 8,
                                            border: `1px solid rgba(200,160,48,0.4)`,
                                            background: `rgba(200,160,48,0.1)`,
                                            fontSize: R ? 9 : 11,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: R ? 90 : 160,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`
                                        },
                                        children: [
                                            `⛵ `,
                                            R ? e.name.replace(/^The /, ``) : e.name
                                        ]
                                    });
                                })()
                            ]
                        }),
                        (0, T.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: R ? 8 : 24
                            },
                            children: (R ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Y.ship.hull}/${Y.ship.maxHull}`,
                                    color: fn
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
                                    color: fn
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
                                    val: (Y.visionBlind ?? 0) > 0 ? `${Y.ship.vision}~` : Y.ship.vision,
                                    color: (Y.visionBlind ?? 0) > 0 ? `#88aacc` : `#6aaccc`
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
                                    label: (p[Y.currentZone ?? 1]?.name ?? `The Coasts`).toUpperCase(),
                                    val: ``,
                                    color: `#aa44ee`
                                }
                            ]).map((e)=>(0, T.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, T.jsx)(`div`, {
                                            style: {
                                                fontSize: R ? 10 : 17,
                                                color: `rgba(255,255,255,0.7)`,
                                                letterSpacing: 1,
                                                fontFamily: `'Pirata One', cursive`
                                            },
                                            children: e.label
                                        }),
                                        (0, T.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 4,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, T.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: mt,
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
                                                (0, T.jsx)(`span`, {
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
                        !R && (0, T.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 16
                            },
                            children: [
                                (0, T.jsxs)(`div`, {
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 6
                                    },
                                    children: [
                                        (0, T.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 56,
                                                height: 56,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, T.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Y.score
                                        }),
                                        ` pts`
                                    ]
                                }),
                                (0, T.jsx)(`button`, {
                                    onClick: ()=>Sn((e)=>!e),
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
                        R && (0, T.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, T.jsxs)(`span`, {
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
                                (0, T.jsx)(`button`, {
                                    onClick: ()=>Sn((e)=>!e),
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
                R && (Y.relics ?? []).length > 0 && (0, T.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Y.relics ?? []).map((e)=>{
                        let t = f(e);
                        return t ? (0, T.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, T.jsx)(v, {
                                name: t.icon,
                                size: 15
                            })
                        }, e) : null;
                    })
                }),
                R && Y.hunter?.active && (()=>{
                    let e = L(Y), t = dt(Y), n = st(Y);
                    return (0, T.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, T.jsx)(v, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, T.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: Y.hunter.mode === `frenzy` ? `#ff6666` : Y.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            ht(Y.hunter.mode),
                                            ct(Y.hunter.mode)
                                        ]
                                    }),
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: ut(e)
                                    }),
                                    (0, T.jsxs)(`div`, {
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
                            (0, T.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, T.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${Y.hunter.awareness}%`,
                                                background: Y.hunter.awareness >= 80 ? `#ee4444` : Y.hunter.awareness >= 50 ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, T.jsxs)(`span`, {
                                        style: {
                                            fontSize: 9,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: [
                                            `AWARE `,
                                            Y.hunter.awareness,
                                            `%`
                                        ]
                                    })
                                ]
                            })
                        ]
                    });
                })(),
                (0, T.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, T.jsxs)(`div`, {
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
                                (0, T.jsxs)(`div`, {
                                    style: {
                                        background: X > 70 ? `rgba(180,30,30,0.2)` : `rgba(255,255,255,0.03)`,
                                        border: `1px solid ${X > 70 ? `rgba(220,50,50,0.5)` : `rgba(255,255,255,0.08)`}`,
                                        borderRadius: 10,
                                        padding: `12px 10px`
                                    },
                                    children: [
                                        (0, T.jsx)(`div`, {
                                            style: {
                                                fontSize: 14,
                                                color: X > 70 ? `#ee4444` : `rgba(255,255,255,0.3)`,
                                                letterSpacing: 2,
                                                marginBottom: 6
                                            },
                                            children: `⛈ STORM`
                                        }),
                                        (0, T.jsx)(`div`, {
                                            style: {
                                                fontSize: 29,
                                                fontWeight: 700,
                                                color: X > 70 ? `#ee4444` : `#ee8844`
                                            },
                                            children: Y.stormDistance
                                        }),
                                        (0, T.jsx)(`div`, {
                                            style: {
                                                fontSize: 20,
                                                color: `rgba(255,255,255,0.8)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                marginTop: 2
                                            },
                                            children: `turns until impact`
                                        }),
                                        (0, T.jsx)(`div`, {
                                            style: {
                                                height: 4,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 8
                                            },
                                            children: (0, T.jsx)(i.div, {
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
                                Y.hunter?.active && (()=>{
                                    let e = L(Y), t = dt(Y), n = st(Y), r = t === `critical` || t === `danger`;
                                    return (0, T.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Y.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : Y.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 10,
                                            padding: `12px 10px`,
                                            marginTop: 4
                                        },
                                        children: [
                                            (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: r ? `#ff8899` : `rgba(200,100,220,0.8)`,
                                                    letterSpacing: 2,
                                                    marginBottom: 6
                                                },
                                                children: `🐙 HUNTER`
                                            }),
                                            (0, T.jsxs)(`div`, {
                                                style: {
                                                    display: `inline-block`,
                                                    padding: `2px 10px`,
                                                    borderRadius: 6,
                                                    fontSize: 11,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 4,
                                                    background: Y.hunter.mode === `frenzy` ? `rgba(220,30,30,0.3)` : Y.hunter.mode === `stalking` ? `rgba(180,30,180,0.3)` : Y.hunter.mode === `searching` ? `rgba(30,100,180,0.3)` : `rgba(255,255,255,0.06)`,
                                                    color: Y.hunter.mode === `frenzy` ? `#ff6666` : Y.hunter.mode === `stalking` ? `#dd88ff` : Y.hunter.mode === `searching` ? `#66aaff` : `rgba(255,255,255,0.55)`,
                                                    border: `1px solid ${Y.hunter.mode === `frenzy` ? `rgba(220,30,30,0.6)` : Y.hunter.mode === `stalking` ? `rgba(180,30,180,0.5)` : `rgba(255,255,255,0.1)`}`
                                                },
                                                children: [
                                                    ht(Y.hunter.mode),
                                                    ct(Y.hunter.mode)
                                                ]
                                            }),
                                            (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    color: `rgba(255,255,255,0.45)`,
                                                    fontFamily: `'IM Fell English', cursive`,
                                                    lineHeight: 1.35,
                                                    marginBottom: 8
                                                },
                                                children: lt(Y.hunter.mode)
                                            }),
                                            (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: 1,
                                                    marginBottom: 4
                                                },
                                                children: ut(e)
                                            }),
                                            (0, T.jsxs)(`div`, {
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
                                            (0, T.jsxs)(`div`, {
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
                                            (0, T.jsx)(`div`, {
                                                style: {
                                                    height: 4,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2
                                                },
                                                children: (0, T.jsx)(i.div, {
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
                                            }),
                                            Y.hunter.awareness >= 80 && (0, T.jsx)(`div`, {
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
                                (0, T.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.6)`,
                                        letterSpacing: 2,
                                        marginTop: 8
                                    },
                                    children: `EQUIPPED`
                                }),
                                Y.ship.upgrades.length === 0 ? (0, T.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontStyle: `italic`
                                    },
                                    children: `None yet`
                                }) : Y.ship.upgrades.map((e)=>{
                                    let t = I.find((t)=>t.id === e);
                                    return (0, T.jsxs)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            color: Je[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, T.jsx)(`img`, {
                                                src: P[e],
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
                                Y.upgradeToken && (0, T.jsx)(`div`, {
                                    style: {
                                        fontSize: 14,
                                        color: `#eedd44`,
                                        marginTop: 4
                                    },
                                    children: `✦ Free upgrade — claim it at a port`
                                }),
                                (0, T.jsxs)(`div`, {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        (0, T.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.3)`,
                                                letterSpacing: 3,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 10
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, T.jsx)(`div`, {
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
                                                return (0, T.jsxs)(i.div, {
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
                                                        (0, T.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 8,
                                                                marginBottom: 6
                                                            },
                                                            children: [
                                                                (0, T.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 16
                                                                    },
                                                                    children: e.icon
                                                                }),
                                                                (0, T.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1
                                                                    },
                                                                    children: [
                                                                        (0, T.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 13,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: 1
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, T.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.3)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, T.jsxs)(`div`, {
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
                                                        (0, T.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, o)=>(0, T.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        o > 0 && (0, T.jsx)(`div`, {
                                                                            style: {
                                                                                width: 10,
                                                                                height: 2,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, T.jsx)(i.div, {
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
                                                                            children: (0, T.jsx)(`span`, {
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
                        (0, T.jsx)(pt, {
                            state: Y,
                            isMobile: R,
                            slide: At,
                            lurch: Mt,
                            onboard: k,
                            onDismissOnboard: B,
                            onMove: _n
                        }),
                        (0, T.jsxs)(`div`, {
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
                                (0, T.jsx)(`div`, {
                                    style: {
                                        fontSize: 17,
                                        color: `rgba(255,255,255,0.9)`,
                                        letterSpacing: 2
                                    },
                                    children: `UPGRADES`
                                }),
                                (0, T.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 5,
                                        overflowY: `auto`
                                    },
                                    children: I.map((e)=>{
                                        let t = Y.ship.upgrades.includes(e.id), n = A.includes(e.id), r = Y.upgradeToken && Y.showPort, i = r ? 0 : e.cost, a = !t && !n && Y.ship.gold >= i && Y.showPort, o = Je[e.build];
                                        return (0, T.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Y.showPort && (n ? j((t)=>t.filter((t)=>t !== e.id)) : a && j((t)=>[
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
                                                (0, T.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`
                                                    },
                                                    children: [
                                                        (0, T.jsxs)(`span`, {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: t ? o : `#ffffff`,
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 4
                                                            },
                                                            children: [
                                                                (0, T.jsx)(`img`, {
                                                                    src: P[e.id],
                                                                    style: {
                                                                        width: 24,
                                                                        height: 24,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                e.name
                                                            ]
                                                        }),
                                                        t ? (0, T.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, T.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, T.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 12,
                                                                color: `#eedd44`
                                                            },
                                                            children: r && Y.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                (0, T.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, T.jsx)(Xe, {
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
                (0, T.jsx)(n, {
                    children: G && Be[G] && (0, T.jsxs)(i.div, {
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
                            (0, T.jsx)(i.video, {
                                src: Be[G],
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
                            (0, T.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`,
                                    pointerEvents: `none`
                                }
                            }),
                            (0, T.jsxs)(`div`, {
                                style: {
                                    position: `absolute`,
                                    bottom: `12%`,
                                    left: 0,
                                    right: 0,
                                    textAlign: `center`,
                                    pointerEvents: `none`
                                },
                                children: [
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 40,
                                            color: `#e8e0d0`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                        },
                                        children: Ve[G] ?? ``
                                    }),
                                    (0, T.jsx)(`div`, {
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
                (0, T.jsx)(n, {
                    children: M && (()=>{
                        let e = M.rarity === `legendary` ? `#eedd44` : M.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = M.rarity.toUpperCase();
                        return (0, T.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>Ne(null),
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
                                (0, T.jsx)(i.div, {
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
                                (0, T.jsx)(i.div, {
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
                                    children: (0, T.jsx)(v, {
                                        name: M.icon,
                                        size: 140
                                    })
                                }),
                                (0, T.jsxs)(i.div, {
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
                                (0, T.jsx)(i.div, {
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
                                    children: M.name
                                }),
                                (0, T.jsx)(i.div, {
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
                                    children: M.desc
                                }),
                                (0, T.jsx)(i.div, {
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
                (0, T.jsx)(n, {
                    children: Y.event && !G && !Y.gameOver && !Y.showPort && Ve[Y.event.cellType] && (0, T.jsx)(Ke, {
                        variant: `scene`,
                        event: Y.event,
                        isMobile: R,
                        gold: Y.ship.gold,
                        hull: Y.ship.hull,
                        relics: Y.relics,
                        score: Y.score,
                        onboard: k,
                        onDismissOnboard: B,
                        onChoose: vn,
                        canEscape: !!pn,
                        onSkip: yn
                    }, `event-scene`)
                }),
                (0, T.jsx)(n, {
                    children: Y.event && !G && !Y.gameOver && !Y.showPort && Y.event.cellType && !ze[Y.event.cellType] && (0, T.jsx)(Ke, {
                        variant: `compact`,
                        event: Y.event,
                        isMobile: R,
                        gold: Y.ship.gold,
                        hull: Y.ship.hull,
                        relics: Y.relics,
                        cellIcon: it[Y.event.cellType],
                        onboard: k,
                        onDismissOnboard: B,
                        onChoose: vn,
                        canEscape: !!pn,
                        onSkip: yn
                    }, `event-compact`)
                }),
                (0, T.jsx)(Ze, {
                    open: !!Y.showPort && !Y.gameOver,
                    isMobile: R,
                    ship: Y.ship,
                    portUpgrades: Y.portUpgrades,
                    upgradeToken: !!Y.upgradeToken,
                    maxedComponents: Y.maxedComponents,
                    cart: A,
                    setCart: j,
                    onboard: k,
                    onDismissOnboard: B,
                    onUpgradeComponent: bn,
                    onReroll: ()=>{
                        U(40), O((e)=>ae(e));
                    },
                    freeReroll: Y.shipType === `merchant` && !!Y.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        U(n), O((n)=>s(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of A)U(50 + qe.indexOf(e));
                        U(70), O((e)=>{
                            let t = e;
                            for (let e of A)t = ne(t, e);
                            return _(t);
                        }), j([]);
                    }
                }),
                (0, T.jsx)(rt, {
                    open: wt,
                    state: Y,
                    isMobile: R,
                    isDailyRun: z,
                    personalBest: $e,
                    isNewRecord: tt,
                    newFeats: je,
                    scoreSubmitted: Fe,
                    nftMinted: Ue,
                    walletAddress: e,
                    account: t,
                    onChainDone: Le,
                    setOnChainDone: He,
                    submitting: at,
                    setSubmitting: ot,
                    connecting: we,
                    onConnect: ()=>E(),
                    showGuestDailyCta: !!(e && Te.current && !z && Ee && d),
                    onPlayDaily: d,
                    rangMois: Dt,
                    harborDown: _t,
                    restarting: yt,
                    onRestart: xn,
                    onHome: u
                }),
                (0, T.jsx)(n, {
                    children: Pt && !R && (0, T.jsxs)(i.div, {
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
                            (0, T.jsx)(`video`, {
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
                            (0, T.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    background: `rgba(0,0,0,0.3)`
                                }
                            }),
                            (0, T.jsxs)(i.div, {
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
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 32,
                                            color: `#cc44ee`,
                                            fontFamily: `'Pirata One', cursive`,
                                            letterSpacing: 3,
                                            textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                        },
                                        children: `THE HUNTER STRIKES!`
                                    }),
                                    (0, T.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.7)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 6
                                        },
                                        children: `Tentacles rake the hull`
                                    }),
                                    (0, T.jsx)(`div`, {
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
                R && (0, T.jsxs)(T.Fragment, {
                    children: [
                        !Y.event && !Y.showPort && !Y.gameOver && (0, T.jsxs)(`div`, {
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
                                (0, T.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>It(J === `ship` ? null : `ship`),
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
                                (0, T.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>It(J === `upgrades` ? null : `upgrades`),
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
                        (0, T.jsx)(n, {
                            children: J && (0, T.jsxs)(i.div, {
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
                                    J === `ship` && (0, T.jsxs)(T.Fragment, {
                                        children: [
                                            (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Y.ship.upgrades.length === 0 ? (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Y.ship.upgrades.map((e)=>{
                                                let t = I.find((t)=>t.id === e);
                                                return (0, T.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, T.jsx)(`img`, {
                                                            src: P[e],
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
                                            Y.upgradeToken && (0, T.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8
                                                },
                                                children: `✦ Free upgrade — claim it at a port`
                                            }),
                                            (0, T.jsx)(`div`, {
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
                                                return (0, T.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, T.jsx)(`span`, {
                                                            children: e.icon
                                                        }),
                                                        (0, T.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, T.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, T.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, T.jsx)(`span`, {
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
                                    J === `upgrades` && (0, T.jsxs)(T.Fragment, {
                                        children: [
                                            (0, T.jsx)(`div`, {
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
                                                let t = Y.ship.upgrades.includes(e.id), n = Je[e.build];
                                                return (0, T.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, T.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, T.jsx)(`img`, {
                                                                    src: P[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, T.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, T.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, T.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, T.jsx)(Xe, {
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
                        J && (0, T.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>It(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { z as default, __tla };
