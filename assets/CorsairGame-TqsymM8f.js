import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { A as o, C as s, D as c, F as l, I as u, J as d, L as f, M as p, N as m, O as h, P as g, R as _, S as ee, T as v, V as te, Y as y, _ as b, a as ne, g as re, h as ie, i as ae, j as x, k as S, l as C, q as w, s as T, t as oe, v as se, w as ce, x as le, z as ue } from "./anchor-Db_GWVn4.js";
import { E as de, I as fe, L as E, T as pe, a as me, b as he, c as D, h as ge, l as _e, o as ve, r as ye, s as be, w as xe, __tla as __tla_0 } from "./nftCatalog-C4VxViRd.js";
import { l as Se, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
let Ot;
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
    var O = e(t(), 1), Ce = `corsair_onboard_v2`;
    function k() {
        try {
            return new Set(JSON.parse(localStorage.getItem(Ce) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function we(e) {
        let t = k();
        t.add(e);
        try {
            localStorage.setItem(Ce, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function Te(e) {
        let t = k();
        return !t.has(`sail`) && e.turn === 0 && !e.event && !e.showPort && !e.gameOver ? {
            id: `sail`,
            title: `SET SAIL`,
            text: `← ↑ → north. Storm rises from the south.`
        } : !t.has(`danger`) && e.event && e.event.choices.some((e)=>e.risk === `risky` || e.risk === `bold`) ? {
            id: `danger`,
            title: `A CHOICE`,
            text: `Bold pays more. Safe keeps you alive.`
        } : !t.has(`storm`) && e.turn > 0 && e.stormDistance <= 6 && !e.gameOver ? {
            id: `storm`,
            title: `THE STORM`,
            text: `${e.stormDistance} turns left. Island ritual or Kraken Pact buys time.`
        } : !t.has(`port`) && e.showPort ? {
            id: `port`,
            title: `PORT`,
            text: `Repair. Upgrade. Max 2 specials. Then leave.`
        } : !t.has(`hunter`) && e.hunter?.active && !e.gameOver ? {
            id: `hunter`,
            title: `THE HUNTER`,
            text: `Watch the bar. Ports & storms calm it.`
        } : null;
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
        thunder: .55,
        nft: .7
    }, Ee = {
        gold: `gold`,
        buy: `buy`,
        damage: `damage`,
        streak: `streak`,
        zone: `zone`,
        death: `death`,
        hunter_near: `hunter_near`,
        hunter_attack: `hunter_attack`,
        thunder: `thunder`,
        nft: `streak`
    }, De = {}, Oe = !1;
    function ke(e) {
        Oe = e;
    }
    function j(e) {
        if (!Oe) try {
            let t = De[e];
            t || (t = new Audio(`/sounds/${Ee[e]}.wav`), De[e] = t), t.volume = A[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var M = r();
    function N({ tip: e, isMobile: t, onDismiss: n }) {
        return (0, M.jsxs)(i.button, {
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
                maxWidth: 360,
                margin: `0 12px 8px`,
                padding: `8px 12px`,
                border: `1px solid rgba(200,160,48,0.4)`,
                borderRadius: 10,
                background: `rgba(12,18,28,0.9)`,
                color: `rgba(255,255,255,0.9)`,
                textAlign: `left`,
                cursor: `pointer`,
                fontFamily: `'IM Fell English', cursive`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.45)`
            },
            children: [
                (0, M.jsx)(`div`, {
                    style: {
                        fontSize: 10,
                        letterSpacing: 2,
                        color: `#c8a030`,
                        fontFamily: `'Cinzel', serif`,
                        marginBottom: 3
                    },
                    children: e.title
                }),
                (0, M.jsx)(`div`, {
                    style: {
                        fontSize: t ? 13 : 14,
                        lineHeight: 1.3
                    },
                    children: e.text
                }),
                (0, M.jsx)(`div`, {
                    style: {
                        fontSize: 9,
                        letterSpacing: 1,
                        color: `rgba(255,255,255,0.3)`,
                        fontFamily: `'Cinzel', serif`,
                        marginTop: 4
                    },
                    children: `TAP`
                })
            ]
        });
    }
    var Ae = {
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
    }, P = (e)=>`/scenes/${e}`, F = {
        1: P(`island.jpg`),
        2: P(`storm.jpg`),
        3: P(`ancient_kraken.jpg`)
    }, I = {
        kraken: P(`kraken.jpg`),
        ancient_kraken: P(`ancient_kraken.jpg`),
        storm: P(`storm.jpg`),
        island: P(`island.jpg`),
        treasure: P(`treasure.jpg`),
        cursed_treasure: P(`cursed_treasure.jpg`),
        pirate: P(`pirate.jpg`),
        port: P(`port.jpg`),
        rocks: P(`rocks.jpg`),
        wreck: P(`wreck.jpg`),
        maelstrom: P(`maelstrom.jpg`)
    }, je = {
        kraken: P(`kraken.mp4`),
        ancient_kraken: P(`ancient_kraken.mp4`),
        storm: P(`storm.mp4`),
        island: P(`island.mp4`),
        treasure: P(`treasure.mp4`),
        cursed_treasure: P(`cursed_treasure.mp4`),
        pirate: P(`pirate.mp4`),
        port: P(`port.mp4`),
        rocks: P(`rocks.mp4`),
        wreck: P(`wreck.mp4`),
        maelstrom: P(`maelstrom.mp4`),
        death: P(`death.mp4`)
    }, Me = {
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
    function Ne(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function Pe(e, t) {
        let n = Ne(e);
        return n === 0 || t >= n;
    }
    function Fe(e, t, n) {
        return t === `port` && e.label === `Dock` && (n ?? []).includes(`ghost`) ? `Ghost Ship cannot dock` : null;
    }
    function Ie(e, t, n, r, i) {
        let a = Fe(e, t, i);
        if (a) return a + ` — sail on.`;
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function Le(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    var Re = {
        escape: `/assets/swift_sails-YMobDX4v.png`,
        ghost: `/assets/ghost_ship-4jaVs07k.png`,
        hunter: `/assets/treasure_hunter-C9jnAyZy.png`,
        rider: `/assets/storm_rider-BjRGnDwr.png`,
        greed: `/assets/cursed_greed-BlVfcQDt.png`,
        berserker: `/assets/berserker-B9haxHEY.png`
    }, ze = [
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
    ], L = d.upgrades.costs, Be = Math.round(d.storm.hunterSurgeBonus * 100), Ve = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: L.ghost,
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
            cost: L.rider,
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
            cost: L.greed,
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
            cost: L.berserker,
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
                `Storm surges +${Be}% more frequent.`
            ],
            cost: L.hunter,
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
            cost: L.escape,
            icon: `escape`,
            build: `escape`
        }
    ], He = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function Ue({ ok: e }) {
        return (0, M.jsx)(`span`, {
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
    function We({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, M.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, M.jsx)(Ue, {
                        ok: t
                    }),
                    (0, M.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, M.jsxs)(`div`, {
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
    function R(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, M.jsx)(`img`, {
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
        }) : (0, M.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function Ge({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, upgrades: s, score: c, cellIcon: l, onboard: u, onDismissOnboard: d, onChoose: f, canEscape: p, onSkip: m }) {
        let h = (0, M.jsx)(`div`, {
            style: {
                display: `flex`,
                flexDirection: n ? `column` : `row`,
                alignItems: n ? `stretch` : void 0,
                width: n ? `100%` : void 0,
                gap: n ? e === `scene` ? 10 : 8 : e === `scene` ? 16 : 10,
                justifyContent: `center`,
                marginTop: e === `compact` ? 8 : 0
            },
            children: t.choices.map((c, l)=>{
                let u = Le(c.risk), d = Fe(c, t.cellType, s), p = !d && Pe(c.desc, r) && !d, m = Ie(c, t.cellType, o, a, s), h = e === `scene` ? 1.04 : 1.02, g = e === `scene` ? .96 : .98, _ = d ? `rgba(120,120,140,0.45)` : p ? `${u}55` : `rgba(255,255,255,0.1)`;
                return (0, M.jsxs)(i.button, {
                    whileHover: {
                        scale: p ? h : 1
                    },
                    whileTap: {
                        scale: p ? g : 1
                    },
                    onClick: ()=>{
                        p && f(l);
                    },
                    "aria-disabled": !p,
                    title: d ?? void 0,
                    style: {
                        flex: 1,
                        maxWidth: e === `scene` && !n ? 320 : void 0,
                        padding: e === `scene` ? n ? `14px 16px` : `24px 28px` : `20px 24px`,
                        borderRadius: 16,
                        border: `1.5px solid ${_}`,
                        background: d ? `linear-gradient(135deg, rgba(12,12,18,0.9) 0%, rgba(40,40,55,0.45) 100%)` : p ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${u}0f 100%)` : `rgba(0,0,0,0.5)`,
                        cursor: p ? `pointer` : `not-allowed`,
                        color: p ? `#e8e0d0` : `rgba(255,255,255,0.32)`,
                        fontFamily: `'Pirata One', cursive`,
                        textAlign: `left`,
                        backdropFilter: `blur(8px)`,
                        boxShadow: e === `scene` && p ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${u}22` : `none`,
                        transition: `all 0.2s`,
                        opacity: p ? 1 : d ? .55 : .5,
                        filter: d ? `grayscale(0.85)` : void 0
                    },
                    children: [
                        Ae[c.icon] ? (0, M.jsxs)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`,
                                position: `relative`
                            },
                            children: [
                                (0, M.jsx)(`img`, {
                                    src: Ae[c.icon],
                                    alt: ``,
                                    style: {
                                        width: e === `scene` ? 72 : 40,
                                        height: e === `scene` ? 72 : 40,
                                        objectFit: `contain`,
                                        opacity: d ? .45 : 1,
                                        filter: d ? `grayscale(1)` : void 0
                                    }
                                }),
                                d && (0, M.jsx)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`,
                                        fontSize: e === `scene` ? 28 : 20,
                                        color: `rgba(200,180,220,0.85)`,
                                        fontWeight: 700,
                                        textShadow: `0 1px 4px rgba(0,0,0,0.9)`,
                                        pointerEvents: `none`
                                    },
                                    children: `✕`
                                })
                            ]
                        }) : (0, M.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 26 : 22,
                                marginBottom: 4
                            },
                            children: c.icon
                        }),
                        (0, M.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: d ? `rgba(160,160,180,0.75)` : u,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: c.label
                        }),
                        (0, M.jsx)(`div`, {
                            style: {
                                fontSize: 20,
                                color: d ? `rgba(180,170,200,0.7)` : `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: m
                        }),
                        (0, M.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 13 : 16,
                                color: d ? `rgba(140,140,160,0.7)` : u,
                                marginTop: e === `scene` ? 10 : 4,
                                letterSpacing: e === `scene` ? 2 : 1,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: d ? `BLOCKED` : c.risk.toUpperCase()
                        })
                    ]
                }, l);
            })
        }), g = p && m ? (0, M.jsxs)(i.button, {
            onClick: m,
            whileHover: {
                scale: 1.03
            },
            whileTap: {
                scale: .97
            },
            animate: {
                boxShadow: [
                    `0 0 0 0 rgba(80,180,220,0.0)`,
                    `0 0 18px 2px rgba(80,180,220,0.35)`,
                    `0 0 0 0 rgba(80,180,220,0.0)`
                ]
            },
            transition: {
                boxShadow: {
                    repeat: 1 / 0,
                    duration: 2.2
                }
            },
            style: {
                marginTop: 12,
                padding: e === `scene` ? `12px 22px` : `10px 18px`,
                borderRadius: 10,
                border: `1.5px solid rgba(100,190,230,0.65)`,
                background: `linear-gradient(135deg, rgba(20,50,70,0.95) 0%, rgba(30,80,110,0.75) 100%)`,
                color: `#a8e4ff`,
                cursor: `pointer`,
                fontSize: e === `scene` ? 17 : 15,
                fontFamily: `'Pirata One', cursive`,
                letterSpacing: .5,
                display: `inline-flex`,
                alignItems: `center`,
                gap: 10,
                textShadow: `0 1px 4px rgba(0,0,0,0.7)`
            },
            children: [
                (0, M.jsx)(`img`, {
                    src: Re.escape,
                    alt: ``,
                    style: {
                        width: 28,
                        height: 28,
                        objectFit: `contain`,
                        filter: `drop-shadow(0 0 6px rgba(100,200,240,0.7))`
                    }
                }),
                (0, M.jsxs)(`span`, {
                    style: {
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `flex-start`,
                        lineHeight: 1.15
                    },
                    children: [
                        (0, M.jsx)(`span`, {
                            children: `Swift Sails — Escape`
                        }),
                        (0, M.jsx)(`span`, {
                            style: {
                                fontSize: 11,
                                color: `rgba(170,220,255,0.7)`,
                                fontFamily: `'Cinzel', serif`,
                                letterSpacing: 1.5
                            },
                            children: `1 USE LEFT · NO CONSEQUENCES`
                        })
                    ]
                })
            ]
        }) : null;
        return e === `scene` ? (0, M.jsxs)(i.div, {
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
                I[t.cellType] && (0, M.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${I[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, M.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                c != null && (0, M.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, M.jsxs)(`div`, {
                        style: {
                            fontSize: n ? 13 : 18,
                            fontWeight: 700,
                            color: `#eedd44`
                        },
                        children: [
                            c,
                            n ? `pts` : ` pts`
                        ]
                    })
                }),
                (0, M.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        u && d && (0, M.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, M.jsx)(N, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            })
                        }),
                        (0, M.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: 16,
                                paddingLeft: 8
                            },
                            children: (0, M.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 28 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: Me[t.cellType] ?? t.cellType
                            })
                        }),
                        h,
                        g && (0, M.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: g
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, M.jsx)(i.div, {
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
            children: (0, M.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, M.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: R(l, 55)
                    }),
                    (0, M.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, M.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            u && d && (0, M.jsx)(N, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            }),
                            h,
                            g
                        ]
                    })
                ]
            })
        }, `event-compact`);
    }
    var Ke = `/assets/hull-CGmPGbU0.png`, qe = `/assets/vision-3Q65Za4i.png`, Je = `/assets/power-CBX9SU5d.png`;
    function Ye({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, M.jsx)(n, {
            children: e && (0, M.jsxs)(i.div, {
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
                    (0, M.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, M.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, M.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, M.jsx)(`span`, {
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
                            u && d && (0, M.jsx)(N, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, M.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, M.jsx)(`div`, {
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
                                            return (0, M.jsxs)(`div`, {
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
                                                    (0, M.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, M.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, M.jsx)(`img`, {
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
                                                            (0, M.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, M.jsx)(`div`, {
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
                                                    (0, M.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: `rgba(255,255,255,0.6)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, M.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 11,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: t === 1 && s >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                    }),
                                                    a && (0, M.jsx)(`div`, {
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
                            (0, M.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8
                                },
                                children: [
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, M.jsx)(i.button, {
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
                            (0, M.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: Ve.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = He[e.build];
                                    return (0, M.jsxs)(`div`, {
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
                                            (0, M.jsx)(`img`, {
                                                src: Re[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, M.jsxs)(`div`, {
                                                children: [
                                                    (0, M.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                            fontFamily: `'Pirata One', cursive`
                                                        },
                                                        children: e.name
                                                    }),
                                                    (0, M.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, M.jsx)(We, {
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
                            r.upgrades.length + c.length >= 2 && (0, M.jsx)(`div`, {
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
                    (()=>{
                        let e = r.upgrades.includes(`greed`), t = r.upgrades.includes(`rider`) && !e, n = [
                            {
                                label: `Rum Barrel`,
                                baseDesc: `+8 hull`,
                                cost: 25,
                                gain: 8,
                                code: 60,
                                heal: t ? 4 : 8
                            },
                            {
                                label: `Full Repair`,
                                baseDesc: `Restore all`,
                                cost: 55,
                                gain: r.maxHull,
                                code: 61,
                                heal: t ? Math.floor(r.maxHull / 2) : r.maxHull
                            }
                        ];
                        return (0, M.jsxs)(M.Fragment, {
                            children: [
                                e && (0, M.jsx)(`div`, {
                                    style: {
                                        marginBottom: 8,
                                        padding: `8px 12px`,
                                        borderRadius: 8,
                                        border: `1px solid rgba(180,160,80,0.4)`,
                                        background: `rgba(40,35,15,0.55)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: 14,
                                        color: `rgba(220,200,140,0.85)`,
                                        textAlign: `center`
                                    },
                                    children: `Cursed Greed refuses the dry dock — repairs are sealed.`
                                }),
                                t && (0, M.jsx)(`div`, {
                                    style: {
                                        marginBottom: 8,
                                        padding: `6px 12px`,
                                        borderRadius: 8,
                                        border: `1px solid rgba(68,204,136,0.28)`,
                                        background: `rgba(20,40,30,0.45)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: 13,
                                        color: `rgba(140,220,180,0.8)`,
                                        textAlign: `center`
                                    },
                                    children: `Storm Rider — port repairs heal only half.`
                                }),
                                (0, M.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 8,
                                        marginBottom: 16
                                    },
                                    children: n.map((n)=>{
                                        let a = r.gold >= n.cost && r.hull < r.maxHull && !e, o = e ? `Cursed Greed blocks repairs` : t ? `+${n.heal} hull (half)` : n.baseDesc;
                                        return (0, M.jsxs)(i.button, {
                                            whileTap: {
                                                scale: a ? .97 : 1
                                            },
                                            onClick: ()=>{
                                                a && h(n.gain, n.cost, n.code);
                                            },
                                            disabled: !a,
                                            title: e ? `Cursed Greed prevents repairs` : void 0,
                                            "aria-disabled": !a,
                                            style: {
                                                flex: 1,
                                                padding: `10px 8px`,
                                                borderRadius: 10,
                                                textAlign: `center`,
                                                border: `1px solid ${e ? `rgba(120,120,140,0.4)` : `rgba(68,204,136,0.3)`}`,
                                                background: e ? `linear-gradient(135deg, rgba(12,12,18,0.9) 0%, rgba(40,40,55,0.45) 100%)` : `rgba(68,204,136,0.08)`,
                                                cursor: a ? `pointer` : `not-allowed`,
                                                opacity: e ? .55 : a ? 1 : .4,
                                                filter: e ? `grayscale(0.85)` : void 0
                                            },
                                            children: [
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: e ? `rgba(160,160,180,0.75)` : `#44cc88`,
                                                        fontFamily: `'Pirata One', cursive`
                                                    },
                                                    children: n.label
                                                }),
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: e ? `rgba(180,170,200,0.65)` : `rgba(255,255,255,0.5)`
                                                    },
                                                    children: o
                                                }),
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 12,
                                                        color: e ? `rgba(140,140,160,0.7)` : `#eedd44`,
                                                        marginTop: 4,
                                                        letterSpacing: +!!e
                                                    },
                                                    children: e ? `BLOCKED` : `◆ ${n.cost}g`
                                                })
                                            ]
                                        }, n.label);
                                    })
                                })
                            ]
                        });
                    })(),
                    (0, M.jsxs)(i.button, {
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
                            (0, M.jsx)(b, {
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
    var Xe = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new Se({
        nodeUrl: `https://api.cartridge.gg/x/starknet/mainnet`
    });
    async function Ze(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: Xe,
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
    function Qe({ payload: e, isMobile: t, onShare: n }) {
        return (0, M.jsxs)(i.div, {
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
                (0, M.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, M.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, M.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, M.jsxs)(`div`, {
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
                (0, M.jsx)(`div`, {
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
                    ].map((e)=>(0, M.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, M.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, M.jsx)(`div`, {
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
                (0, M.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, M.jsxs)(`div`, {
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
                        (0, M.jsx)(i.button, {
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
    async function $e(e) {
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
    function et(e) {
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
    function z({ status: e, onRetry: t }) {
        return e.kind === `idle` ? null : e.kind === `local` ? (0, M.jsx)(tt, {
            tone: `muted`,
            children: `Local voyage — not ranked. Connect + server seed to climb the board.`
        }) : e.kind === `sending` ? (0, M.jsx)(tt, {
            tone: `info`,
            pulse: !0,
            children: (0, M.jsxs)(`span`, {
                style: {
                    display: `inline-flex`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, M.jsx)(nt, {}),
                    ` Logging the voyage to the harbor…`
                ]
            })
        }) : e.kind === `ok` ? e.daily ? (0, M.jsx)(tt, {
            tone: `daily`,
            children: (0, M.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4
                },
                children: [
                    (0, M.jsxs)(`div`, {
                        style: {
                            display: `inline-flex`,
                            alignItems: `center`,
                            gap: 8,
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 16,
                            letterSpacing: 2,
                            color: `#88ddff`
                        },
                        children: [
                            (0, M.jsx)(b, {
                                name: `sun`,
                                size: 18
                            }),
                            ` DAILY SCORE PUBLISHED`
                        ]
                    }),
                    (0, M.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(180,220,255,0.7)`,
                            fontFamily: `'Cinzel', serif`,
                            letterSpacing: 1
                        },
                        children: `You're on today's board`
                    })
                ]
            })
        }) : (0, M.jsx)(tt, {
            tone: `ok`,
            children: (0, M.jsx)(`span`, {
                style: {
                    fontFamily: `'Pirata One', cursive`,
                    fontSize: 15,
                    letterSpacing: 2
                },
                children: `✓ SCORE SAVED — ON THE LEADERBOARD`
            })
        }) : e.kind === `queued` ? (0, M.jsx)(tt, {
            tone: `warn`,
            children: (0, M.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, M.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#eec070`
                        },
                        children: `Harbor lag — voyage queued`
                    }),
                    (0, M.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: e.step === `log` ? `Could not save the run log. Retry now, or it will send on your next visit.` : `Log saved, approval pending. Retry now, or it will finish on your next visit.`
                    }),
                    t && (0, M.jsx)(`button`, {
                        type: `button`,
                        onClick: t,
                        style: {
                            marginTop: 2,
                            padding: `8px 18px`,
                            borderRadius: 8,
                            border: `1px solid rgba(238,192,112,0.55)`,
                            background: `rgba(238,192,112,0.12)`,
                            color: `#eec070`,
                            cursor: `pointer`,
                            fontSize: 13,
                            letterSpacing: 2,
                            fontFamily: `'Pirata One', cursive`
                        },
                        children: `RETRY SUBMIT`
                    })
                ]
            })
        }) : (0, M.jsx)(tt, {
            tone: `bad`,
            children: (0, M.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, M.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#ee8899`
                        },
                        children: `Score not accepted`
                    }),
                    (0, M.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: e.raison ?? `The harbor could not verify this voyage.`
                    }),
                    t && (0, M.jsx)(`button`, {
                        type: `button`,
                        onClick: t,
                        style: {
                            marginTop: 2,
                            padding: `8px 18px`,
                            borderRadius: 8,
                            border: `1px solid rgba(238,136,153,0.45)`,
                            background: `rgba(238,100,120,0.1)`,
                            color: `#ee8899`,
                            cursor: `pointer`,
                            fontSize: 13,
                            letterSpacing: 2,
                            fontFamily: `'Pirata One', cursive`
                        },
                        children: `RETRY SUBMIT`
                    })
                ]
            })
        });
    }
    function tt({ children: e, tone: t, pulse: n }) {
        let r = {
            muted: {
                border: `rgba(255,255,255,0.12)`,
                bg: `rgba(0,0,0,0.35)`
            },
            info: {
                border: `rgba(136,180,220,0.4)`,
                bg: `rgba(20,40,60,0.75)`
            },
            ok: {
                border: `rgba(68,204,136,0.5)`,
                bg: `rgba(10,40,25,0.8)`
            },
            daily: {
                border: `rgba(100,200,255,0.55)`,
                bg: `rgba(8,30,55,0.85)`
            },
            warn: {
                border: `rgba(238,192,112,0.45)`,
                bg: `rgba(40,30,10,0.8)`
            },
            bad: {
                border: `rgba(238,100,120,0.45)`,
                bg: `rgba(40,12,18,0.8)`
            }
        }[t];
        return (0, M.jsx)(i.div, {
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
                maxWidth: 380,
                padding: `12px 16px`,
                borderRadius: 12,
                border: `1px solid ${r.border}`,
                background: r.bg,
                textAlign: `center`,
                fontSize: 13,
                color: `rgba(255,255,255,0.7)`,
                fontFamily: `'Cinzel', serif`,
                letterSpacing: 1,
                boxShadow: n ? `0 0 20px rgba(100,160,220,0.15)` : void 0
            },
            children: e
        });
    }
    function nt() {
        return (0, M.jsx)(i.span, {
            "aria-hidden": !0,
            animate: {
                rotate: 360
            },
            transition: {
                repeat: 1 / 0,
                duration: 1,
                ease: `linear`
            },
            style: {
                display: `inline-block`,
                width: 12,
                height: 12,
                borderRadius: `50%`,
                border: `2px solid rgba(136,180,220,0.25)`,
                borderTopColor: `#88b4dc`
            }
        });
    }
    function rt({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: o, isNewRecord: s, newFeats: l, nearFeats: u, submitStatus: d, onRetrySubmit: f, nftMinted: p, walletAddress: m, account: h, onChainDone: g, setOnChainDone: ee, submitting: te, setSubmitting: y, connecting: re, onConnect: ie, showGuestDailyCta: ae, onPlayDaily: x, rangMois: C, harborDown: w, restarting: T, onRestart: oe, onHome: se }) {
        let [ce, le] = (0, O.useState)(!1), ue = ne(), de = ue <= 1, fe = !a && !c() && !!x && !!m, E = ae || fe, pe = et(t.log), he = {
            padding: r ? `16px 36px` : `18px 48px`,
            borderRadius: 14,
            border: E ? `2px solid rgba(136,221,255,0.85)` : `2px solid rgba(200,160,48,0.85)`,
            background: E ? `linear-gradient(135deg, rgba(30,90,120,0.85) 0%, rgba(20,50,70,0.9) 100%)` : `linear-gradient(135deg, rgba(120,90,20,0.75) 0%, rgba(60,45,10,0.9) 100%)`,
            color: E ? `#a8e8ff` : `#f0d878`,
            cursor: T && !E ? `wait` : `pointer`,
            fontSize: r ? 22 : 26,
            fontWeight: 700,
            letterSpacing: 3,
            fontFamily: `'Pirata One', cursive`,
            boxShadow: E ? `0 0 28px rgba(80,180,220,0.35)` : `0 0 28px rgba(200,160,48,0.35)`,
            opacity: T && !E ? .7 : 1,
            width: r ? `min(92vw, 360px)` : void 0,
            textAlign: `center`
        }, D = {
            padding: `10px 22px`,
            borderRadius: 10,
            border: `1px solid rgba(255,255,255,0.18)`,
            background: `rgba(0,0,0,0.35)`,
            color: `rgba(255,255,255,0.55)`,
            cursor: `pointer`,
            fontSize: 14,
            letterSpacing: 2,
            fontFamily: `'Pirata One', cursive`
        };
        return (0, M.jsx)(n, {
            children: e && (0, M.jsxs)(i.div, {
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
                    justifyContent: `flex-start`,
                    background: `radial-gradient(ellipse at center, #1a0505 0%, #050008 50%, #000000 100%)`,
                    overflow: `hidden`,
                    overflowY: `auto`,
                    padding: r ? `24px 12px calc(28px + env(safe-area-inset-bottom))` : `40px 24px 48px`
                },
                children: [
                    (0, M.jsx)(i.div, {
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
                    (0, M.jsxs)(`div`, {
                        style: {
                            position: `relative`,
                            zIndex: 1,
                            width: `100%`,
                            maxWidth: 560,
                            display: `flex`,
                            flexDirection: `column`,
                            alignItems: `center`
                        },
                        children: [
                            (0, M.jsx)(i.div, {
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
                                    delay: .15
                                },
                                style: {
                                    marginBottom: 4,
                                    filter: `drop-shadow(0 0 30px rgba(220,30,30,0.8))`
                                },
                                children: (0, M.jsx)(b, {
                                    name: `skull`,
                                    size: r ? 72 : 100
                                })
                            }),
                            (0, M.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .35
                                },
                                style: {
                                    fontSize: r ? 36 : 56,
                                    fontWeight: 700,
                                    color: `#ee4444`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: r ? 3 : 5,
                                    textShadow: `0 0 40px rgba(220,30,30,0.8)`,
                                    marginBottom: 2,
                                    lineHeight: 1.05
                                },
                                children: `SHIPWRECKED`
                            }),
                            (0, M.jsx)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: .45
                                },
                                style: {
                                    fontSize: r ? 14 : 18,
                                    color: `rgba(200,160,48,0.75)`,
                                    fontFamily: `'Cinzel', serif`,
                                    letterSpacing: 2,
                                    marginBottom: 10,
                                    textAlign: `center`
                                },
                                children: t.runTitle
                            }),
                            (0, M.jsxs)(i.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: .55
                                },
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    gap: 3,
                                    alignItems: `center`,
                                    marginBottom: 14,
                                    padding: `8px 16px`,
                                    borderRadius: 10,
                                    background: `rgba(150,0,0,0.14)`,
                                    border: `1px solid rgba(220,60,60,0.28)`,
                                    maxWidth: `100%`
                                },
                                children: [
                                    (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 14,
                                            color: `#ee6655`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2
                                        },
                                        children: [
                                            `Sunk by `,
                                            pe.name
                                        ]
                                    }),
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 13,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            lineHeight: 1.35
                                        },
                                        children: pe.tip
                                    })
                                ]
                            }),
                            (0, M.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .65
                                },
                                style: {
                                    textAlign: `center`,
                                    marginBottom: 6
                                },
                                children: [
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: `SCORE`
                                    }),
                                    (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 40 : 52,
                                            color: `#eedd44`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 700,
                                            lineHeight: 1.05
                                        },
                                        children: [
                                            t.score.toLocaleString(),
                                            (0, M.jsx)(`span`, {
                                                style: {
                                                    fontSize: r ? 16 : 20,
                                                    color: `rgba(238,221,68,0.55)`,
                                                    marginLeft: 6
                                                },
                                                children: `pts`
                                            })
                                        ]
                                    }),
                                    s && (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `#44ffaa`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 4
                                        },
                                        children: `NEW BEST`
                                    }),
                                    !s && o > t.score && (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 4
                                        },
                                        children: [
                                            `Best `,
                                            o.toLocaleString(),
                                            ` · `,
                                            o - t.score,
                                            ` short`
                                        ]
                                    })
                                ]
                            }),
                            de && (0, M.jsx)(i.div, {
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
                                    fontSize: 13,
                                    color: `rgba(255,255,255,0.5)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    textAlign: `center`,
                                    marginBottom: 10,
                                    maxWidth: 340
                                },
                                children: `Every captain sinks the first time. The next voyage is where legends start.`
                            }),
                            (0, M.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 12
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .8
                                },
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    alignItems: `center`,
                                    gap: 10,
                                    marginTop: 8,
                                    marginBottom: 14,
                                    width: `100%`
                                },
                                children: [
                                    w && (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try again when you're online`
                                    }),
                                    E && x ? (0, M.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: x,
                                        style: he,
                                        children: `PLAY DAILY · 1 TRY`
                                    }) : (0, M.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: oe,
                                        disabled: T,
                                        style: he,
                                        children: T ? `PREPARING…` : `SAIL AGAIN`
                                    }),
                                    (0, M.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 10,
                                            flexWrap: `wrap`,
                                            justifyContent: `center`,
                                            alignItems: `center`
                                        },
                                        children: [
                                            E && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: oe,
                                                disabled: T,
                                                style: D,
                                                children: T ? `…` : `Sail free run`
                                            }),
                                            !E && fe && x && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: x,
                                                style: {
                                                    ...D,
                                                    borderColor: `rgba(136,221,255,0.4)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Daily · 1 try`
                                            }),
                                            !m && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ie,
                                                disabled: re,
                                                style: {
                                                    ...D,
                                                    borderColor: `rgba(200,160,48,0.4)`,
                                                    color: `#c8a030`
                                                },
                                                children: re ? `…` : `Connect wallet`
                                            }),
                                            (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: se,
                                                style: {
                                                    ...D,
                                                    border: `none`,
                                                    color: `rgba(255,255,255,0.28)`
                                                },
                                                children: `← Menu`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, M.jsx)(z, {
                                status: d,
                                onRetry: f
                            }),
                            l.length > 0 && (0, M.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    scale: .95
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    delay: 1
                                },
                                style: {
                                    display: `flex`,
                                    flexDirection: `column`,
                                    gap: 6,
                                    alignItems: `center`,
                                    marginTop: 12,
                                    marginBottom: 8,
                                    padding: `10px 18px`,
                                    borderRadius: 12,
                                    background: `rgba(200,160,48,0.12)`,
                                    border: `1px solid rgba(238,221,68,0.5)`,
                                    width: `100%`
                                },
                                children: l.map((e)=>(0, M.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, M.jsx)(b, {
                                                name: e.icon,
                                                size: 22
                                            }),
                                            (0, M.jsxs)(`div`, {
                                                style: {
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, M.jsxs)(`div`, {
                                                        style: {
                                                            fontFamily: `'Pirata One', cursive`,
                                                            fontSize: 15,
                                                            color: `#eedd44`
                                                        },
                                                        children: [
                                                            `NEW FEAT: `,
                                                            e.name
                                                        ]
                                                    }),
                                                    (0, M.jsxs)(`div`, {
                                                        style: {
                                                            fontFamily: `'Cinzel', serif`,
                                                            fontSize: 10,
                                                            color: `rgba(238,221,68,0.7)`,
                                                            letterSpacing: 1
                                                        },
                                                        children: [
                                                            `TITLE: `,
                                                            e.title
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, e.id))
                            }),
                            p.length > 0 && (0, M.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 6
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 12,
                                    width: `100%`,
                                    marginTop: 10,
                                    padding: `10px 14px`,
                                    borderRadius: 12,
                                    border: `1px solid rgba(200,160,48,0.45)`,
                                    background: `rgba(20,16,8,0.75)`
                                },
                                children: (()=>{
                                    let e = me(p[0]), t = e ? ye[e.rarity] : `#eedd88`;
                                    return (0, M.jsxs)(M.Fragment, {
                                        children: [
                                            e && (0, M.jsx)(`img`, {
                                                src: ve(e.image),
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 58,
                                                    objectFit: `cover`,
                                                    borderRadius: 6,
                                                    border: `1px solid ${t}`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, M.jsxs)(`div`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0,
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, M.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 10,
                                                            letterSpacing: 2,
                                                            color: t,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: `NFT CLAIMED · MINT PENDING`
                                                    }),
                                                    (0, M.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 14,
                                                            color: `#f0e6c8`,
                                                            fontFamily: `'Pirata One', cursive`,
                                                            overflow: `hidden`,
                                                            textOverflow: `ellipsis`,
                                                            whiteSpace: `nowrap`
                                                        },
                                                        children: p.map(be).join(` · `)
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            }),
                            (0, M.jsx)(`button`, {
                                type: `button`,
                                onClick: ()=>le((e)=>!e),
                                style: {
                                    marginTop: 18,
                                    padding: `8px 16px`,
                                    borderRadius: 8,
                                    border: `1px solid rgba(255,255,255,0.12)`,
                                    background: `transparent`,
                                    color: `rgba(255,255,255,0.4)`,
                                    fontSize: 12,
                                    letterSpacing: 2,
                                    fontFamily: `'Cinzel', serif`,
                                    cursor: `pointer`
                                },
                                children: ce ? `▲ HIDE DETAILS` : `▼ VOYAGE DETAILS`
                            }),
                            (0, M.jsx)(n, {
                                children: ce && (0, M.jsxs)(i.div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: `auto`
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    style: {
                                        overflow: `hidden`,
                                        width: `100%`,
                                        marginTop: 12
                                    },
                                    children: [
                                        (0, M.jsxs)(`div`, {
                                            style: {
                                                fontSize: r ? 13 : 16,
                                                color: `rgba(255,255,255,0.35)`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                marginBottom: 14,
                                                textAlign: `center`,
                                                fontStyle: `italic`
                                            },
                                            children: [
                                                `"`,
                                                t.log,
                                                `"`
                                            ]
                                        }),
                                        (0, M.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                gap: 16,
                                                marginBottom: 14,
                                                flexWrap: `wrap`,
                                                justifyContent: `center`
                                            },
                                            children: [
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
                                                    color: t.ship.hull <= 5 ? `#ee4444` : `#44cc88`
                                                },
                                                {
                                                    label: `VOYAGES`,
                                                    val: ue,
                                                    color: `#88ddff`
                                                }
                                            ].map((e)=>(0, M.jsxs)(`div`, {
                                                    style: {
                                                        textAlign: `center`
                                                    },
                                                    children: [
                                                        (0, M.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `rgba(255,255,255,0.3)`,
                                                                letterSpacing: 2,
                                                                fontFamily: `'Cinzel', serif`
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, M.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 18,
                                                                color: e.color,
                                                                fontFamily: `'Cinzel', serif`,
                                                                fontWeight: 700
                                                            },
                                                            children: e.val
                                                        })
                                                    ]
                                                }, e.label))
                                        }),
                                        t.scoreBreakdown && (0, M.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `10px 16px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(255,255,255,0.08)`,
                                                background: `rgba(0,0,0,0.3)`
                                            },
                                            children: [
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 10,
                                                        color: `rgba(255,255,255,0.3)`,
                                                        letterSpacing: 2,
                                                        fontFamily: `'Cinzel', serif`,
                                                        marginBottom: 6,
                                                        textAlign: `center`
                                                    },
                                                    children: `BREAKDOWN`
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
                                                ].filter((e)=>e.val > 0).map((e)=>(0, M.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            marginBottom: 2
                                                        },
                                                        children: [
                                                            (0, M.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: `rgba(255,255,255,0.4)`,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: e.label
                                                            }),
                                                            (0, M.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: e.color,
                                                                    fontFamily: `'Cinzel', serif`,
                                                                    fontWeight: 700
                                                                },
                                                                children: e.val.toLocaleString()
                                                            })
                                                        ]
                                                    }, e.label))
                                            ]
                                        }),
                                        u.length > 0 && (0, M.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `12px 14px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(136,221,255,0.3)`,
                                                background: `rgba(10,24,40,0.65)`
                                            },
                                            children: [
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontFamily: `'Cinzel', serif`,
                                                        fontSize: 10,
                                                        letterSpacing: 2,
                                                        color: `rgba(136,221,255,0.8)`,
                                                        marginBottom: 8,
                                                        textAlign: `center`
                                                    },
                                                    children: `STILL ON THE TIDE`
                                                }),
                                                u.map((e)=>(0, M.jsxs)(`div`, {
                                                        style: {
                                                            marginTop: 6
                                                        },
                                                        children: [
                                                            (0, M.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    justifyContent: `space-between`,
                                                                    marginBottom: 3
                                                                },
                                                                children: [
                                                                    (0, M.jsx)(`div`, {
                                                                        style: {
                                                                            fontFamily: `'Pirata One', cursive`,
                                                                            fontSize: 14,
                                                                            color: `#c8e8ff`
                                                                        },
                                                                        children: e.feat.name
                                                                    }),
                                                                    (0, M.jsxs)(`div`, {
                                                                        style: {
                                                                            fontFamily: `'Cinzel', serif`,
                                                                            fontSize: 10,
                                                                            color: `rgba(255,255,255,0.4)`
                                                                        },
                                                                        children: [
                                                                            Math.round(e.ratio * 100),
                                                                            `%`
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            (0, M.jsx)(`div`, {
                                                                style: {
                                                                    height: 3,
                                                                    borderRadius: 2,
                                                                    background: `rgba(255,255,255,0.08)`,
                                                                    overflow: `hidden`,
                                                                    marginBottom: 3
                                                                },
                                                                children: (0, M.jsx)(`div`, {
                                                                    style: {
                                                                        height: `100%`,
                                                                        width: `${Math.round(e.ratio * 100)}%`,
                                                                        background: `linear-gradient(90deg,#2a6a8a,#88ddff)`
                                                                    }
                                                                })
                                                            }),
                                                            (0, M.jsx)(`div`, {
                                                                style: {
                                                                    fontFamily: `'IM Fell English', cursive`,
                                                                    fontSize: 12,
                                                                    color: `rgba(255,255,255,0.5)`
                                                                },
                                                                children: e.line
                                                            })
                                                        ]
                                                    }, e.feat.id))
                                            ]
                                        }),
                                        (0, M.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.25)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginBottom: 12,
                                                textAlign: `center`
                                            },
                                            children: a ? S() ? `Seed ${t.seed} · Daily ${v()}` : `Blind daily — seed at 00:00 UTC` : `Seed ${t.seed}`
                                        }),
                                        h && !g && (0, M.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                alignItems: `center`,
                                                gap: 6,
                                                marginBottom: 12
                                            },
                                            children: [
                                                (0, M.jsx)(i.button, {
                                                    whileHover: {
                                                        scale: 1.04
                                                    },
                                                    disabled: te,
                                                    onClick: async ()=>{
                                                        y(!0);
                                                        try {
                                                            await Ze(h, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                                        } catch (e) {
                                                            console.warn(`On-chain submit failed:`, e);
                                                        }
                                                        ee(!0), y(!1);
                                                    },
                                                    style: {
                                                        padding: `10px 24px`,
                                                        borderRadius: 8,
                                                        border: `1px solid rgba(200,160,48,0.35)`,
                                                        background: `rgba(200,160,48,0.08)`,
                                                        color: `#c8a030`,
                                                        fontSize: 14,
                                                        letterSpacing: 2,
                                                        cursor: `pointer`,
                                                        fontFamily: `'Pirata One', cursive`
                                                    },
                                                    children: te ? `ENGRAVING...` : (0, M.jsxs)(M.Fragment, {
                                                        children: [
                                                            (0, M.jsx)(b, {
                                                                name: `anchor`,
                                                                size: 14,
                                                                style: {
                                                                    marginRight: 6
                                                                }
                                                            }),
                                                            `ENGRAVE ON STARKNET`
                                                        ]
                                                    })
                                                }),
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 10,
                                                        color: `rgba(255,255,255,0.3)`,
                                                        letterSpacing: 1,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: `OPTIONAL`
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
                                            }, i = (t.relics ?? []).map((e)=>_(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = C ? `\n⚔️ #${C.rank} in Starktember — ${C.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                            return (0, M.jsx)(Qe, {
                                                isMobile: r,
                                                onShare: ()=>{
                                                    $e(c);
                                                },
                                                payload: {
                                                    score: t.score,
                                                    turn: t.turn,
                                                    gold: t.ship.gold,
                                                    runTitle: t.runTitle,
                                                    seed: t.seed,
                                                    deathName: pe.name,
                                                    isDaily: a,
                                                    text: c
                                                }
                                            });
                                        })()
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        });
    }
    function it({ queue: e, isMobile: t, onDismiss: r }) {
        let a = e[0] ?? null;
        if ((0, O.useEffect)(()=>{
            a && j(`nft`);
        }, [
            a
        ]), !a) return null;
        let o = me(a), s = o?.name ?? be(a), c = o?.rarity ?? `Rare`, l = ye[c], u = D(a), d = o ? ve(o.image) : null, f = e.length - 1;
        return (0, M.jsx)(n, {
            children: (0, M.jsxs)(i.div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                onClick: r,
                style: {
                    position: `fixed`,
                    inset: 0,
                    zIndex: 220,
                    cursor: `pointer`,
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    padding: t ? `20px 16px calc(20px + env(safe-area-inset-bottom))` : 32,
                    background: `radial-gradient(ellipse at 50% 35%, rgba(40,28,8,0.94) 0%, rgba(4,6,12,0.98) 70%)`
                },
                children: [
                    (0, M.jsx)(`div`, {
                        "aria-hidden": !0,
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            opacity: .35,
                            background: `radial-gradient(circle at 50% 40%, ${l}22 0%, transparent 55%)`
                        }
                    }),
                    (0, M.jsx)(i.div, {
                        initial: {
                            opacity: 0,
                            y: -12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: .08
                        },
                        style: {
                            fontFamily: `'Cinzel', serif`,
                            fontSize: t ? 11 : 13,
                            letterSpacing: 6,
                            color: `rgba(255,255,255,0.5)`,
                            marginBottom: 10,
                            textAlign: `center`,
                            position: `relative`
                        },
                        children: `THE TIDE YIELDS A RELIC`
                    }),
                    (0, M.jsxs)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: .15
                        },
                        style: {
                            fontFamily: `'Cinzel', serif`,
                            fontSize: 11,
                            letterSpacing: 3,
                            color: l,
                            marginBottom: 18,
                            position: `relative`
                        },
                        children: [
                            u.toUpperCase(),
                            ` · `,
                            c.toUpperCase(),
                            ` NFT`
                        ]
                    }),
                    (0, M.jsxs)(i.div, {
                        initial: {
                            scale: .6,
                            rotate: -8,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            rotate: 0,
                            opacity: 1
                        },
                        transition: {
                            type: `spring`,
                            stiffness: 120,
                            damping: 14,
                            delay: .2
                        },
                        style: {
                            position: `relative`,
                            marginBottom: 22,
                            width: t ? 180 : 230,
                            aspectRatio: `3 / 4`,
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            (0, M.jsx)(i.div, {
                                "aria-hidden": !0,
                                animate: {
                                    opacity: [
                                        .55,
                                        .2,
                                        .55
                                    ]
                                },
                                transition: {
                                    repeat: 1 / 0,
                                    duration: 2.6,
                                    ease: `easeInOut`
                                },
                                style: {
                                    position: `absolute`,
                                    inset: t ? -16 : -22,
                                    borderRadius: 22,
                                    border: `2px solid ${l}`,
                                    boxShadow: `0 0 50px ${l}55`,
                                    pointerEvents: `none`
                                }
                            }),
                            (0, M.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    width: `100%`,
                                    height: `100%`,
                                    borderRadius: 16,
                                    overflow: `hidden`,
                                    border: `2px solid ${l}`,
                                    boxShadow: `0 0 40px ${l}88, 0 16px 40px rgba(0,0,0,0.65)`,
                                    background: `rgba(0,0,0,0.5)`
                                },
                                children: d ? (0, M.jsx)(`img`, {
                                    src: d,
                                    alt: s,
                                    style: {
                                        width: `100%`,
                                        height: `100%`,
                                        objectFit: `cover`,
                                        display: `block`
                                    }
                                }) : (0, M.jsx)(`div`, {
                                    style: {
                                        width: `100%`,
                                        height: `100%`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`,
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: 48,
                                        color: l
                                    },
                                    children: s.slice(0, 1)
                                })
                            })
                        ]
                    }),
                    (0, M.jsx)(i.div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: .45
                        },
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: t ? 28 : 38,
                            color: `#f0e6c8`,
                            letterSpacing: 2,
                            textAlign: `center`,
                            maxWidth: 420,
                            padding: `0 12px`,
                            textShadow: `0 0 28px ${l}66`,
                            marginBottom: 10,
                            position: `relative`
                        },
                        children: s
                    }),
                    o?.condition && (0, M.jsx)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: .55
                        },
                        style: {
                            fontFamily: `'IM Fell English', cursive`,
                            fontSize: t ? 14 : 16,
                            color: `rgba(255,255,255,0.65)`,
                            textAlign: `center`,
                            maxWidth: 380,
                            lineHeight: 1.45,
                            marginBottom: 18,
                            position: `relative`,
                            padding: `0 12px`
                        },
                        children: o.condition
                    }),
                    (0, M.jsx)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: .65
                        },
                        style: {
                            fontFamily: `'Cinzel', serif`,
                            fontSize: 11,
                            letterSpacing: 1.5,
                            color: `rgba(200,180,120,0.7)`,
                            textAlign: `center`,
                            marginBottom: 8,
                            position: `relative`
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: `CLAIMED · MINT PENDING`
                    }),
                    (0, M.jsx)(i.div, {
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
                            fontSize: t ? 12 : 13,
                            color: `rgba(255,255,255,0.4)`,
                            textAlign: `center`,
                            maxWidth: 360,
                            marginBottom: 20,
                            position: `relative`,
                            lineHeight: 1.35,
                            padding: `0 12px`
                        },
                        children: `Reserved for your wallet. On-chain mint comes next — check Relics for PENDING → MINTED.`
                    }),
                    (0, M.jsxs)(i.div, {
                        initial: {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: .75
                        },
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            alignItems: `center`,
                            gap: 10,
                            position: `relative`
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            (0, M.jsx)(i.button, {
                                whileHover: {
                                    scale: 1.04
                                },
                                whileTap: {
                                    scale: .97
                                },
                                onClick: ()=>{
                                    let e = `🏴‍☠️ I earned "${s}" — a ${u} NFT in Corsair.\nNo mint button. No whitelist. Just sail, meet the condition, claim it before it's SOLD OUT.\nDare to find yours? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                    window.open(`https://x.com/intent/post?text=${encodeURIComponent(e)}`, `_blank`);
                                },
                                style: {
                                    padding: `10px 22px`,
                                    borderRadius: 10,
                                    border: `1px solid rgba(255,255,255,0.35)`,
                                    background: `rgba(0,0,0,0.45)`,
                                    color: `#fff`,
                                    cursor: `pointer`,
                                    fontSize: 14,
                                    letterSpacing: 1,
                                    fontFamily: `'Pirata One', cursive`
                                },
                                children: `𝕏 Share your find`
                            }),
                            (0, M.jsx)(`button`, {
                                onClick: r,
                                style: {
                                    padding: `8px 18px`,
                                    borderRadius: 8,
                                    border: `none`,
                                    background: `transparent`,
                                    color: `rgba(255,255,255,0.45)`,
                                    cursor: `pointer`,
                                    fontSize: 12,
                                    letterSpacing: 3,
                                    fontFamily: `'Cinzel', serif`
                                },
                                children: f > 0 ? `CONTINUE · ${f} MORE` : `TAP TO CONTINUE`
                            })
                        ]
                    })
                ]
            }, a)
        });
    }
    function at({ cinematic: e, isMobile: t, muted: r, zone: a, onClose: o, onDeathEnd: s }) {
        if (!e || !(je[e] || I[e] || e === `death`)) return null;
        let c = !t && !!je[e], l = e === `death` ? F[a] ?? I.storm : I[e] ?? null, u = ()=>{
            e === `death` && s(), o();
        };
        return (0, M.jsx)(n, {
            children: (0, M.jsxs)(i.div, {
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
                onClick: u,
                style: {
                    position: `fixed`,
                    inset: 0,
                    zIndex: 140,
                    cursor: `pointer`,
                    background: `#05080f`
                },
                children: [
                    c ? (0, M.jsx)(i.video, {
                        src: je[e],
                        autoPlay: !0,
                        muted: r,
                        playsInline: !0,
                        preload: `auto`,
                        disablePictureInPicture: !0,
                        onEnded: u,
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
                            duration: .55,
                            ease: `easeOut`
                        },
                        style: {
                            width: `100%`,
                            height: `100%`,
                            objectFit: `cover`
                        }
                    }, e) : l ? (0, M.jsx)(i.div, {
                        initial: {
                            opacity: 0,
                            scale: 1.08
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            duration: .65,
                            ease: `easeOut`
                        },
                        style: {
                            position: `absolute`,
                            inset: 0,
                            backgroundImage: `url(${l})`,
                            backgroundSize: `cover`,
                            backgroundPosition: `center`
                        }
                    }, `still-${e}`) : null,
                    (0, M.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            background: e === `death` ? `linear-gradient(to bottom, rgba(40,5,5,0.35) 0%, rgba(5,8,15,0.55) 55%, rgba(5,8,15,0.88) 100%)` : `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`
                        }
                    }),
                    (0, M.jsxs)(`div`, {
                        style: {
                            position: `absolute`,
                            bottom: t ? `calc(18% + env(safe-area-inset-bottom))` : `12%`,
                            left: 0,
                            right: 0,
                            textAlign: `center`,
                            pointerEvents: `none`,
                            padding: `0 16px`
                        },
                        children: [
                            (0, M.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 28 : 40,
                                    color: e === `death` ? `#ee6666` : `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                },
                                children: Me[e] ?? ``
                            }),
                            (0, M.jsx)(`div`, {
                                style: {
                                    marginTop: 10,
                                    fontSize: t ? 12 : 13,
                                    color: `rgba(255,255,255,0.55)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    letterSpacing: 1
                                },
                                children: `tap to skip`
                            })
                        ]
                    })
                ]
            }, `cine-${e}`)
        });
    }
    function ot({ open: e, isMobile: t, muted: r, onClose: a }) {
        return (0, M.jsx)(n, {
            children: e && (0, M.jsxs)(i.div, {
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
                    t ? (0, M.jsx)(i.div, {
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
                    }) : (0, M.jsx)(`video`, {
                        src: `/scenes/hunter.mp4`,
                        autoPlay: !0,
                        muted: r,
                        playsInline: !0,
                        preload: `auto`,
                        disablePictureInPicture: !0,
                        onEnded: a,
                        style: {
                            width: `100%`,
                            height: `100%`,
                            objectFit: `cover`
                        }
                    }),
                    (0, M.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            background: t ? `radial-gradient(ellipse at center, rgba(80,0,100,0.35) 0%, rgba(0,0,0,0.65) 100%)` : `rgba(0,0,0,0.3)`
                        }
                    }),
                    (0, M.jsxs)(i.div, {
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
                            bottom: t ? `calc(22% + env(safe-area-inset-bottom))` : `20%`,
                            left: 0,
                            right: 0,
                            textAlign: `center`,
                            padding: `0 16px`
                        },
                        children: [
                            (0, M.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 26 : 32,
                                    color: `#cc44ee`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                },
                                children: `THE HUNTER STRIKES!`
                            }),
                            (0, M.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 14 : 16,
                                    color: `rgba(255,255,255,0.7)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    marginTop: 6
                                },
                                children: `Tentacles rake the hull`
                            }),
                            (0, M.jsx)(`div`, {
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
        });
    }
    function st({ shipId: e, size: t, lurchX: n = 0, lurchY: r = 0 }) {
        let a = e === `specter`, [o, s] = (0, O.useState)(!0), c = `${re(e)}?v=6`;
        return (0, M.jsx)(i.div, {
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
            children: (0, M.jsxs)(i.div, {
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
                    (0, M.jsx)(`div`, {
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
                    o ? (0, M.jsx)(`img`, {
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
                    }) : (0, M.jsx)(ct, {
                        shipId: e,
                        size: t,
                        ghost: a
                    })
                ]
            })
        });
    }
    function ct({ shipId: e, size: t, ghost: n }) {
        return (0, M.jsxs)(`svg`, {
            width: t,
            height: t,
            viewBox: `0 0 64 64`,
            style: {
                display: `block`,
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.6))`,
                opacity: n ? .9 : 1
            },
            children: [
                (0, M.jsx)(`ellipse`, {
                    cx: `32`,
                    cy: `50`,
                    rx: `14`,
                    ry: `4`,
                    fill: `rgba(40,90,120,0.35)`
                }),
                (0, M.jsx)(`path`, {
                    d: `M32 10 L46 28 L42 50 L22 50 L18 28 Z`,
                    fill: e === `corsair` ? `#2A1814` : e === `specter` ? `#5A9BB8` : e === `merchant` ? `#8B5A2B` : `#6B4428`
                }),
                (0, M.jsx)(`path`, {
                    d: `M22 14 L42 14 L38 34 L26 34 Z`,
                    fill: e === `corsair` ? `#B01820` : e === `specter` ? `#E8F8FF` : `#F0E6D0`
                }),
                (0, M.jsx)(`rect`, {
                    x: `30.5`,
                    y: `6`,
                    width: `3`,
                    height: `30`,
                    fill: `#2E2014`
                })
            ]
        });
    }
    var lt = `/sea/ocean-tile.jpg`, ut = 4, B = {
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
    function V(e, t) {
        return Math.abs(e * 73856093 ^ t * 19349663) % 1e3;
    }
    function dt({ zone: e, x: t, y: n, cellSize: r, quiet: i }) {
        let a = B[e] ?? B[1], o = V(t, n), s = Math.max(1, r * ut), c = -t * r, l = -n * r;
        return (0, M.jsxs)(`div`, {
            "aria-hidden": !0,
            className: i ? void 0 : `sea-tile`,
            style: {
                position: `absolute`,
                inset: 0,
                borderRadius: 5,
                pointerEvents: `none`,
                overflow: `hidden`,
                backgroundColor: a.base,
                backgroundImage: `url(${lt})`,
                backgroundSize: `${s}px ${s}px`,
                backgroundPosition: `${c}px ${l}px`,
                boxShadow: i ? `inset 0 -5px 10px rgba(8,30,40,0.4)` : `inset 0 1px 0 rgba(220,240,245,0.12), inset 0 -7px 12px rgba(8,28,38,0.45)`,
                animationDelay: i ? void 0 : `${o % 50 / 10}s`
            },
            children: [
                (0, M.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        background: a.veil
                    }
                }),
                (0, M.jsx)(`div`, {
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
    function ft(e) {
        return (B[e] ?? B[1]).base;
    }
    var H = (e)=>`/icons/${e}.png`, pt = {
        sea: H(`sea`),
        storm: H(`storm`),
        pirate: H(`pirate`),
        treasure: H(`treasure`),
        cursed_treasure: H(`cursed_treasure`),
        port: H(`port`),
        kraken: H(`kraken`),
        ancient_kraken: H(`ancient_kraken`),
        wreck: H(`wreck`),
        island: H(`island`),
        rocks: H(`rocks`),
        maelstrom: H(`maelstrom`),
        portal: H(`portal`),
        hunter: H(`hunter`)
    }, mt = {
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
    function ht(e, t) {
        let n = e * 2 + 1, r = t ? 240 : 170, i = Math.max(180, window.innerHeight - r), a = e >= 4 ? .58 : .55, o = e >= 4 ? 700 : 640, s = t ? window.innerWidth - 12 : Math.min(window.innerWidth * a, o);
        return Math.max(44, Math.floor(Math.min(s, i) / n) - 2);
    }
    function gt(e, t) {
        return ht(e, t) + 2;
    }
    function _t(e) {
        let t = e.hunter;
        return t?.active ? Math.abs(t.x - e.ship.x) + Math.abs(t.y - e.ship.y) : 99;
    }
    function vt(e) {
        let t = (e.relics ?? []).includes(`black_flag`) ? 2 : 0, n = Math.max(d.hunter.minDamage, d.hunter.baseDamage - e.ship.power) + t;
        return w(e.ship.upgrades, n);
    }
    function yt(e) {
        return e === `frenzy` ? `ENRAGED` : e === `stalking` ? `STALKING` : e === `searching` ? `SEARCHING` : `TRACKING`;
    }
    function bt(e) {
        return e === `frenzy` ? `ENR` : e === `stalking` ? `STK` : e === `searching` ? `SRC` : `TRK`;
    }
    function xt(e) {
        return e <= 0 ? `ON YOU` : e === 1 ? `1 CELL — NEXT HIT` : e === 2 ? `2 CELLS AWAY` : `${e} CELLS AWAY`;
    }
    function St(e) {
        if (!e.hunter?.active) return `calm`;
        let t = _t(e);
        return t <= 1 || e.hunter.mode === `frenzy` ? `critical` : t <= 3 || e.hunter.awareness >= d.hunter.frenzyAwareness ? `danger` : t <= 5 || e.hunter.mode === `stalking` || e.hunter.awareness >= d.hunter.stalkingAwareness ? `watch` : `calm`;
    }
    function Ct(e) {
        if (!e.hunter?.active) return ``;
        let t = _t(e), n = vt(e), r = yt(e.hunter.mode);
        return t <= 1 ? `${r} · STRIKE ~−${n} hull` : `${r} · ${t} away · hit ~−${n}`;
    }
    var wt = {
        1: `rgba(6,14,22,0.82)`,
        2: `rgba(6,10,22,0.86)`,
        3: `rgba(4,6,14,0.9)`
    };
    function Tt({ state: e, isMobile: t, slide: n, lurch: r, onboard: a, onDismissOnboard: o, onMove: s }) {
        let c = e.ship.vision * 2 + 1, l = ht(e.ship.vision, t), u = !e.event && !e.showPort && !e.gameOver && (t ? (0, M.jsx)(`div`, {
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
            ].map((e)=>(0, M.jsx)(`button`, {
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
        }) : (0, M.jsxs)(`div`, {
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
                (0, M.jsx)(`span`, {
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
                ].map((e)=>(0, M.jsxs)(`button`, {
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
                            (0, M.jsx)(`span`, {
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
            let n = St(e), r = Ct(e), a = n === `critical` ? `rgba(160,10,30,0.92)` : n === `danger` ? `rgba(100,20,50,0.88)` : n === `watch` ? `rgba(70,20,90,0.85)` : `rgba(40,20,60,0.8)`, o = n === `critical` ? `rgba(255,80,100,0.75)` : n === `danger` ? `rgba(255,120,80,0.55)` : `rgba(180,80,220,0.45)`;
            return (0, M.jsxs)(i.div, {
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
                    (0, M.jsx)(b, {
                        name: `kraken`,
                        size: t ? 14 : 16
                    }),
                    (0, M.jsx)(`div`, {
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
        return (0, M.jsxs)(`div`, {
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
                t && (0, M.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12,
                        marginBottom: 6,
                        fontSize: 13,
                        fontFamily: `'Cinzel', serif`,
                        flexShrink: 0
                    },
                    children: [
                        (0, M.jsxs)(`span`, {
                            style: {
                                color: e.stormDistance <= 4 ? `#ee4444` : `#ee8844`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, M.jsx)(b, {
                                    name: `storm`,
                                    size: 13
                                }),
                                ` `,
                                e.stormDistance,
                                ` turns`
                            ]
                        }),
                        (0, M.jsx)(`span`, {
                            style: {
                                color: `#cc44ee`
                            },
                            children: y[e.currentZone ?? 1]?.name ?? `The Coasts`
                        }),
                        (0, M.jsxs)(`span`, {
                            style: {
                                color: `#eedd44`,
                                display: `inline-flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, M.jsx)(b, {
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
                a && !e.event && !e.showPort && !e.gameOver && (0, M.jsx)(N, {
                    tip: a,
                    isMobile: t,
                    onDismiss: o
                }),
                (0, M.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        flexShrink: 0
                    },
                    children: [
                        d,
                        (0, M.jsxs)(M.Fragment, {
                            children: [
                                (0, M.jsx)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        pointerEvents: `none`,
                                        zIndex: 2,
                                        borderRadius: 8,
                                        background: e.ship.vision >= 4 ? `radial-gradient(circle at 50% 50%, transparent 55%, rgba(8,15,24,0.35) 78%, rgba(8,15,24,0.7) 100%)` : `radial-gradient(circle at 50% 65%, transparent 28%, rgba(8,15,24,0.45) 55%, rgba(8,15,24,0.85) 78%)`
                                    }
                                }),
                                F[e.currentZone ?? 1] && (0, M.jsx)(`div`, {
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
                                (0, M.jsx)(`div`, {
                                    style: {
                                        position: `relative`,
                                        zIndex: 1,
                                        display: `grid`,
                                        gridTemplateColumns: `repeat(${c},1fr)`,
                                        gap: 2,
                                        padding: 2,
                                        borderRadius: 8,
                                        background: ft(e.currentZone ?? 1),
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
                                            }, f = e.ship.x + n, p = e.ship.y + t, m = e.hunter?.active && e.hunter.x === f && e.hunter.y === p, h = e.hunter?.active ? _t(e) : 99, g = n === 0 && t === 0, _ = d.revealed || d.visited, ee = d.stormed, v = e.ship.upgrades.includes(`rider`), te = v && (ee || _ && d.type === `storm`), y = v && g && ee, b = e.ship.upgrades.includes(`ghost`) && d.type === `port`, ne = e.stormDistance <= 0 ? -1 : e.grid.length + 2 - Math.floor((10 - e.stormDistance) / 3), re = ee && o === ne, ie = e.currentZone ?? 1, ae = g || _ && !m, x = m ? e.hunter?.mode === `frenzy` ? `#3a0612` : `#2a0830` : ae ? `transparent` : wt[ie] ?? wt[1], S = l < 56, C = Math.round(l * (S ? 1.02 : .96)), w = !g && !m && _ && d.type !== `sea` ? b ? `#6a6a78` : v && d.type === `storm` ? `#44ddaa` : mt[d.type] ?? null : null, T = S ? 2 : 1.5, oe = S ? 1.38 : 1.22, se = S ? 1.32 : 1.2, ce = S ? 5 : 3;
                                            return (0, M.jsxs)(i.div, {
                                                className: re ? v ? `storm-front-rider` : `storm-front` : void 0,
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
                                                    background: ae ? ft(ie) : x,
                                                    border: g ? h <= 1 ? `2px solid #ee4466` : y ? `2px solid #44eebb` : `1px solid rgba(120,190,200,0.45)` : m ? `2px solid ${e.hunter?.mode === `frenzy` ? `#ff4466` : e.hunter?.mode === `stalking` ? `#dd66ff` : `#aa44cc`}` : ee ? v ? `1.5px solid rgba(60,220,180,0.55)` : `1px solid #cc222244` : w ? `${T}px solid ${w}${S ? `cc` : `99`}` : ae ? `1px solid rgba(255,255,255,0.10)` : `1px solid rgba(255,255,255,0.04)`,
                                                    borderRadius: 5,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    justifyContent: `center`,
                                                    fontSize: g ? 26 : 20,
                                                    boxShadow: m ? `0 0 ${h <= 2 ? 22 : 14}px ${e.hunter?.mode === `frenzy` ? `rgba(255,60,80,0.85)` : `rgba(200,60,220,0.75)`}` : g ? h <= 1 ? `0 0 18px rgba(238,68,102,0.5)` : y ? `0 0 16px rgba(60,220,180,0.55)` : `0 0 10px rgba(20,60,80,0.35)` : te && !g ? `0 0 ${S ? 10 : 7}px rgba(60,200,170,0.45), inset 0 0 ${S ? 12 : 8}px rgba(40,180,150,0.18)` : w ? `0 0 ${S ? 12 : 8}px ${w}${S ? `66` : `44`}, inset 0 0 ${S ? 14 : 10}px ${w}${S ? `28` : `18`}` : `none`,
                                                    position: `relative`,
                                                    cursor: `default`,
                                                    overflow: `hidden`
                                                },
                                                children: [
                                                    ae && (0, M.jsx)(dt, {
                                                        zone: ie,
                                                        x: f,
                                                        y: p,
                                                        cellSize: l,
                                                        quiet: g
                                                    }),
                                                    te && !g && !m && (0, M.jsx)(i.div, {
                                                        "aria-hidden": !0,
                                                        animate: {
                                                            opacity: [
                                                                .25,
                                                                .55,
                                                                .25
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
                                                            zIndex: 0,
                                                            pointerEvents: `none`,
                                                            background: `radial-gradient(circle at 50% 70%, rgba(60,220,180,0.35) 0%, transparent 70%)`
                                                        }
                                                    }),
                                                    g && (0, M.jsxs)(M.Fragment, {
                                                        children: [
                                                            (0, M.jsx)(`div`, {
                                                                style: {
                                                                    position: `relative`,
                                                                    zIndex: 1,
                                                                    lineHeight: 0
                                                                },
                                                                children: (0, M.jsx)(st, {
                                                                    shipId: e.shipType ?? `default`,
                                                                    size: Math.round(l * (S ? .98 : .92)),
                                                                    lurchX: r.x,
                                                                    lurchY: r.y
                                                                })
                                                            }),
                                                            y && (0, M.jsx)(i.div, {
                                                                "aria-hidden": !0,
                                                                animate: {
                                                                    opacity: [
                                                                        .4,
                                                                        .85,
                                                                        .4
                                                                    ]
                                                                },
                                                                transition: {
                                                                    repeat: 1 / 0,
                                                                    duration: 1.2
                                                                },
                                                                style: {
                                                                    position: `absolute`,
                                                                    top: 2,
                                                                    right: 2,
                                                                    zIndex: 2,
                                                                    fontSize: Math.max(7, l * .14),
                                                                    padding: `1px 4px`,
                                                                    borderRadius: 3,
                                                                    background: `rgba(10,40,35,0.85)`,
                                                                    border: `1px solid rgba(80,220,180,0.7)`,
                                                                    color: `#88ffd0`,
                                                                    fontFamily: `'Cinzel', serif`,
                                                                    fontWeight: 700,
                                                                    letterSpacing: .5,
                                                                    pointerEvents: `none`
                                                                },
                                                                children: `SURF`
                                                            }),
                                                            (0, M.jsxs)(`div`, {
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
                                                                    (0, M.jsx)(`div`, {
                                                                        style: {
                                                                            flex: 1,
                                                                            height: 3,
                                                                            background: `rgba(0,0,0,0.5)`,
                                                                            borderRadius: 2
                                                                        },
                                                                        children: (0, M.jsx)(`div`, {
                                                                            style: {
                                                                                width: `${e.ship.hull / e.ship.maxHull * 100}%`,
                                                                                height: `100%`,
                                                                                borderRadius: 2,
                                                                                background: e.ship.hull <= 5 ? `#ee4444` : e.ship.hull <= 10 ? `#ee8844` : `#44cc88`,
                                                                                transition: `width 0.3s`
                                                                            }
                                                                        })
                                                                    }),
                                                                    (0, M.jsx)(`div`, {
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
                                                    !m && !g && !_ && d.type === `portal` && (0, M.jsx)(i.div, {
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
                                                        children: (0, M.jsx)(`img`, {
                                                            src: `/icons/portal.png?v=9`,
                                                            alt: ``,
                                                            style: {
                                                                width: C,
                                                                height: C,
                                                                objectFit: `contain`,
                                                                filter: `drop-shadow(0 0 8px #aa77ff)`
                                                            }
                                                        })
                                                    }),
                                                    !m && !g && _ && d.type !== `sea` && (0, M.jsxs)(M.Fragment, {
                                                        children: [
                                                            w && !d.visited && (0, M.jsx)(`div`, {
                                                                "aria-hidden": !0,
                                                                style: {
                                                                    position: `absolute`,
                                                                    inset: S ? `8%` : `14%`,
                                                                    borderRadius: `50%`,
                                                                    background: `radial-gradient(circle, ${w}${S ? `55` : `38`} 0%, ${w}00 70%)`,
                                                                    pointerEvents: `none`,
                                                                    zIndex: 0
                                                                }
                                                            }),
                                                            (0, M.jsx)(`img`, {
                                                                src: `/icons/${d.type}.png?v=9`,
                                                                alt: ``,
                                                                title: b ? `Ghost Ship cannot dock` : void 0,
                                                                style: {
                                                                    width: C,
                                                                    height: C,
                                                                    opacity: d.visited ? .45 : b ? .4 : 1,
                                                                    objectFit: `contain`,
                                                                    position: `relative`,
                                                                    zIndex: 1,
                                                                    filter: d.visited ? `brightness(1.05) contrast(1.1)` : b ? `grayscale(1) brightness(0.7) contrast(0.9)` : `brightness(${oe}) contrast(${se}) drop-shadow(0 0 ${ce}px ${w ?? `#88aacc`}${S ? `cc` : `88`})`
                                                                }
                                                            }),
                                                            b && !d.visited && (0, M.jsx)(`div`, {
                                                                "aria-hidden": !0,
                                                                title: `Ghost Ship cannot dock`,
                                                                style: {
                                                                    position: `absolute`,
                                                                    right: 2,
                                                                    top: 2,
                                                                    width: Math.max(12, l * .28),
                                                                    height: Math.max(12, l * .28),
                                                                    borderRadius: `50%`,
                                                                    background: `rgba(20,18,28,0.85)`,
                                                                    border: `1px solid rgba(180,170,200,0.55)`,
                                                                    color: `rgba(200,190,220,0.95)`,
                                                                    fontSize: Math.max(8, l * .18),
                                                                    fontWeight: 700,
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    justifyContent: `center`,
                                                                    zIndex: 2,
                                                                    pointerEvents: `none`,
                                                                    lineHeight: 1
                                                                },
                                                                children: `✕`
                                                            })
                                                        ]
                                                    }),
                                                    m && !g && (0, M.jsxs)(i.div, {
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
                                                            (0, M.jsx)(`img`, {
                                                                src: `/icons/hunter.png?v=9`,
                                                                style: {
                                                                    width: C,
                                                                    height: C,
                                                                    objectFit: `contain`
                                                                }
                                                            }),
                                                            (0, M.jsxs)(`div`, {
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
                                                                    bt(e.hunter.mode),
                                                                    ` `,
                                                                    h <= 1 ? `HIT` : h
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    u && !g && !m && (0, M.jsx)(i.div, {
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
                                                    !m && !g && !_ && d.type !== `portal` && (0, M.jsx)(`span`, {
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
                e.dangerStreak > 0 && (0, M.jsxs)(i.div, {
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
                        e.scoreMultiplier > 1 && (0, M.jsxs)(`div`, {
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
                                e.scoreMultiplier >= 3 ? (0, M.jsxs)(`span`, {
                                    style: {
                                        display: `inline-flex`,
                                        alignItems: `center`,
                                        gap: 2
                                    },
                                    children: [
                                        (0, M.jsx)(b, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, M.jsx)(b, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        }),
                                        (0, M.jsx)(b, {
                                            name: `fire`,
                                            size: t ? 16 : 22
                                        })
                                    ]
                                }) : (0, M.jsx)(b, {
                                    name: `fire`,
                                    size: t ? 16 : 20
                                }),
                                (0, M.jsxs)(`span`, {
                                    children: [
                                        `×`,
                                        e.scoreMultiplier,
                                        ` COMBO`
                                    ]
                                })
                            ]
                        }),
                        (0, M.jsxs)(`div`, {
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
                                e.dangerStreak >= 3 && (0, M.jsx)(`span`, {
                                    style: {
                                        color: `#ee8844`,
                                        marginLeft: 10
                                    },
                                    children: `HUNTER ALERT`
                                }),
                                e.dangerStreak >= 4 && (0, M.jsx)(`span`, {
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
                e.ship.upgrades.includes(`hunter`) && (0, M.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        marginBottom: 8,
                        flexShrink: 0
                    },
                    children: [
                        (0, M.jsx)(`div`, {
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
                        (0, M.jsx)(`div`, {
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
                                    let i = e.grid[n][r], a = r === e.ship.x && n === e.ship.y, o = e.hunter?.active && r === e.hunter.x && n === e.hunter.y, s = i.revealed && !i.visited && (i.type === `treasure` || i.type === `cursed_treasure`), c = i.revealed && !i.visited && i.type === `port`, l = c && e.ship.upgrades.includes(`ghost`);
                                    return (0, M.jsx)(`div`, {
                                        style: {
                                            width: 8,
                                            height: 8,
                                            background: a ? `#4a8acc` : o ? `#ee4444` : s ? `#eedd44` : l ? `#555566` : c ? `#44cccc` : i.revealed ? `rgba(255,255,255,0.08)` : `rgba(0,0,0,0.3)`,
                                            borderRadius: o || a ? 4 : 1
                                        }
                                    }, `${r}-${n}`);
                                }))
                        })
                    ]
                }),
                (0, M.jsx)(`div`, {
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
                        return (0, M.jsxs)(M.Fragment, {
                            children: [
                                (0, M.jsxs)(`div`, {
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
                                i && (0, M.jsxs)(`div`, {
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
                e.portalHint && (0, M.jsxs)(`div`, {
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
                        (0, M.jsx)(b, {
                            name: `vortex`,
                            size: 14
                        }),
                        ` `,
                        e.portalHint,
                        ` `,
                        (0, M.jsx)(b, {
                            name: `vortex`,
                            size: 14
                        })
                    ]
                }),
                (e.relics ?? []).length > 0 && !t && (0, M.jsx)(`div`, {
                    style: {
                        marginTop: 8,
                        display: `flex`,
                        gap: 6,
                        justifyContent: `center`,
                        flexWrap: `wrap`,
                        flexShrink: 0
                    },
                    children: (e.relics ?? []).map((e)=>{
                        let t = _(e);
                        return t ? (0, M.jsxs)(`div`, {
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
                                (0, M.jsx)(`img`, {
                                    src: ue(t.id),
                                    alt: ``,
                                    style: {
                                        width: 18,
                                        height: 18,
                                        borderRadius: 4,
                                        objectFit: `cover`
                                    }
                                }),
                                (0, M.jsx)(`span`, {
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
                t && (0, M.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        flexShrink: 0,
                        height: `calc(112px + env(safe-area-inset-bottom))`
                    }
                })
            ]
        });
    }
    var Et = `/icons/gold.png`, Dt = (e, t = 14)=>(0, M.jsx)(b, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    Ot = function({ walletAddress: e, account: t, username: r, onHome: ne, onPlayDaily: re, dailySeed: S, isDaily: w, seedToken: me, shipId: D, resumeState: ve, resumeRunId: ye, resumeActions: be }) {
        let { connect: Se, connecting: Ce } = a(), [k, A] = (0, O.useState)(()=>ve ?? h(S, D ?? `default`)), Ee = (0, O.useRef)(!e), [De, Oe] = (0, O.useState)(()=>!c()), [N, Ae] = (0, O.useState)(null), [P, Ne] = (0, O.useState)(!1), [Pe, Fe] = (0, O.useState)([]), [Ie, Le] = (0, O.useState)([]), [L, Be] = (0, O.useState)([]), Ue = (0, O.useRef)(0), [R, Xe] = (0, O.useState)(null), Ze = (0, O.useRef)((k.relics ?? []).length), [Qe, $e] = (0, O.useState)(!1), [et, z] = (0, O.useState)({
            kind: `idle`
        }), [tt, nt] = (0, O.useState)(!1), st = (0, O.useRef)(!1), [ct, lt] = (0, O.useState)([]), [ut, B] = (0, O.useState)([]), [V, dt] = (0, O.useState)(null), [ft, H] = (0, O.useState)(0), [mt, ht] = (0, O.useState)(()=>ae()), [bt, Ct] = (0, O.useState)(!1), [wt, Ot] = (0, O.useState)(!1), [U, kt] = (0, O.useState)(window.innerWidth < 768), W = w === !0, At = (0, O.useRef)(me), [jt, Mt] = (0, O.useState)(!1), [Nt, Pt] = (0, O.useState)(!1);
        (0, O.useEffect)(()=>{
            if (k.gameOver) {
                Ae(null);
                return;
            }
            k.turn > 0 && we(`sail`), Ae(Te(k));
        }, [
            k.turn,
            k.event,
            k.showPort,
            k.hunter?.active,
            k.stormDistance,
            k.gameOver
        ]);
        let Ft = ()=>{
            N && (we(N.id), Ae(null));
        };
        (0, O.useEffect)(()=>{
            W && (x(), e && v());
        }, []), (0, O.useEffect)(()=>{
            if (!e) {
                Oe(!c());
                return;
            }
            xe(e, v()).then((e)=>{
                if (e) {
                    Oe(!1);
                    return;
                }
                c() && ce(), Oe(!0);
            });
        }, [
            e
        ]);
        let G = (0, O.useRef)(ye ?? crypto.randomUUID()), K = (0, O.useRef)(be ? [
            ...be
        ] : []), q = (e)=>{
            K.current.push(e);
        }, J = (0, O.useRef)([]);
        (0, O.useEffect)(()=>{
            let t = e;
            !t || k.gameOver || K.current.length !== 0 && ee({
                run_id: G.current,
                wallet_address: t,
                seed: k.seed,
                ship_id: D ?? `default`,
                is_daily: W,
                actions: K.current,
                turn: k.turn,
                score: k.score,
                saved_at: Date.now()
            });
        }, [
            k
        ]), (0, O.useEffect)(()=>{
            let e = K.current.length - 1;
            e < 0 || (J.current[e * 3] = k.score, J.current[e * 3 + 1] = k.ship.hull, J.current[e * 3 + 2] = k.rngState ?? -1);
        }, [
            k
        ]);
        let It = (0, O.useRef)(0);
        (0, O.useEffect)(()=>{
            e && (ye || E({
                run_id: G.current,
                wallet_address: e,
                username: r ?? null,
                seed: k.seed,
                is_daily: W,
                seed_token: me ?? null
            }));
        }, []), (0, O.useEffect)(()=>{
            !e || k.gameOver || k.turn - It.current < 3 || (It.current = k.turn, pe(G.current, {
                score: k.score,
                turn: k.turn,
                zone: k.currentZone ?? 1,
                gold: k.ship.gold,
                hull: k.ship.hull
            }));
        }, [
            k.turn
        ]);
        let Lt = ()=>({
                run_id: G.current,
                wallet_address: e,
                seed: k.seed,
                ship_id: D ?? `default`,
                is_daily: W,
                actions: K.current,
                checks: K.current.flatMap((e, t)=>[
                        J.current[t * 3] ?? -1,
                        J.current[t * 3 + 1] ?? -1,
                        J.current[t * 3 + 2] ?? -1
                    ]),
                final_score: k.score,
                final_turn: k.turn
            }), Rt = async ()=>{
            if (!e) return;
            if (!W && !At.current) {
                z({
                    kind: `local`
                });
                return;
            }
            let t = Lt();
            z({
                kind: `sending`
            });
            try {
                await fe(t);
            } catch (e) {
                console.warn(`[runlog]`, e), le(`runlog`, t), z({
                    kind: `queued`,
                    step: `log`
                });
                return;
            }
            try {
                let t = await _e(G.current);
                if (t?.approved) {
                    if ($e(!0), z({
                        kind: `ok`,
                        daily: W
                    }), W && x(), t.nft?.minted?.length) {
                        let e = t.nft.minted.map((e)=>typeof e == `string` ? e : e.nft).filter(Boolean);
                        lt(e), B(e);
                    }
                } else console.warn(`[approve] refuse :`, t?.raison ?? t), z({
                    kind: `rejected`,
                    raison: t?.raison ?? void 0
                }), W && xe(e, v()).then((e)=>{
                    e || ce();
                });
            } catch (e) {
                console.warn(`[approve]`, e), le(`approve`, {
                    run_id: G.current
                }), z({
                    kind: `queued`,
                    step: `approve`
                });
            }
        };
        (0, O.useEffect)(()=>{
            if (k.gameOver) {
                if (!e) {
                    z({
                        kind: `idle`
                    });
                    return;
                }
                if (!st.current) {
                    if (st.current = !0, ge(G.current, {
                        score: k.score,
                        turn: k.turn,
                        zone: k.currentZone ?? 1,
                        gold: k.ship.gold,
                        hull: k.ship.hull,
                        run_title: k.runTitle
                    }), !W && !At.current) {
                        console.warn(`[approve] skip : seed local, run non soumise`), z({
                            kind: `local`
                        }), se();
                        return;
                    }
                    Rt(), se();
                }
            }
        }, [
            k.gameOver
        ]), (0, O.useEffect)(()=>{
            let e = (e)=>{
                let t = e.detail;
                !t?.run_id || t.run_id !== G.current || t.approved && ($e(!0), z({
                    kind: `ok`,
                    daily: W
                }), W && x());
            };
            return window.addEventListener(`corsair-sync`, e), ()=>window.removeEventListener(`corsair-sync`, e);
        }, [
            W
        ]), (0, O.useEffect)(()=>{
            let e = ()=>kt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [Y, X] = (0, O.useState)(null), [zt, Bt] = (0, O.useState)(!1), Vt = (0, O.useRef)(null), Ht = (0, O.useRef)(new Set), [Ut, Wt] = (0, O.useState)(null);
        (0, O.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !k.gameOver || !W || !e || !n || Qe && he().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && Wt({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            k.gameOver,
            Qe
        ]);
        let Gt = (0, O.useRef)({
            x: k.ship.x,
            y: k.ship.y
        }), [Kt, qt] = (0, O.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [Jt, Yt] = (0, O.useState)({
            x: 0,
            y: 0
        });
        (0, O.useEffect)(()=>{
            let e = Gt.current, t = k.ship.x - e.x, n = k.ship.y - e.y;
            if (Gt.current = {
                x: k.ship.x,
                y: k.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = gt(k.ship.vision, U), i = .8;
            qt({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), Yt({
                x: t,
                y: n
            });
            let a = setTimeout(()=>Yt({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>qt({
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
            U,
            k.ship.vision
        ]);
        let [Xt, Zt] = (0, O.useState)(!1), [Z, Qt] = (0, O.useState)(null), [$t, en] = (0, O.useState)(null), [tn, nn] = (0, O.useState)(0), rn = ()=>{
            Ne(!0), setTimeout(()=>Ne(!1), 400);
        }, an = (e)=>{
            en(e), setTimeout(()=>en(null), 150);
        }, Q = k, on = Math.min(100, (1 - Q.stormDistance / 10) * 100), sn = Q.ship.hull <= 5 ? `#ee4444` : Q.ship.hull <= 10 ? `#ee8844` : `#44cc88`, cn = !Q.escapeUsed && Q.ship.upgrades.includes(`escape`) && Q.event && Q.event.choices[0].risk !== `safe`;
        (0, O.useEffect)(()=>{
            if (k.gameOver) return;
            let e = k.event?.cellType;
            e && (!je[e] && !I[e] || Ht.current.has(e) || X(e));
        }, [
            k.event?.cellType,
            k.gameOver
        ]), (0, O.useEffect)(()=>{
            if (!Y || Y === `death`) return;
            let e = U ? 2200 : {
                ancient_kraken: 6500
            }[Y] ?? 5e3, t = setTimeout(()=>{
                Ht.current.add(Y), X(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            Y,
            U
        ]);
        let ln = (0, O.useRef)(1);
        (0, O.useEffect)(()=>{
            let e = k.currentZone ?? 1;
            if (e > ln.current) {
                let t = ln.current, n = y[e], r = y[t]?.transitionText ?? [];
                dt({
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
                }), H(0), ln.current = e;
            }
        }, [
            k.currentZone
        ]), (0, O.useEffect)(()=>{
            if (!V) return;
            if (ft >= V.lines.length) {
                setTimeout(()=>dt(null), 1e3);
                return;
            }
            let e = setTimeout(()=>H((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            V,
            ft
        ]), (0, O.useEffect)(()=>{
            k.dangerStreak > Ue.current && (Ue.current = k.dangerStreak);
        }, [
            k.dangerStreak
        ]), (0, O.useEffect)(()=>{
            if (k.gameOver) {
                let e = te(k);
                e.length > 0 && (Le(e), j(`streak`));
                let t = T({
                    score: k.score,
                    turn: k.turn,
                    zone: k.currentZone ?? 1,
                    gold: k.ship.gold,
                    hunterAttacksSurvived: k.hunterAttacksSurvived ?? 0,
                    peakStreak: Ue.current,
                    hadStreak5: (k.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if (Be(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (ht(t.pb), Ct(!0)), se(), U) Zt(!1), X(`death`), Vt.current = setTimeout(()=>{
                    Bt((e)=>e || !0), X(null);
                }, 2200);
                else {
                    let e = un.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Zt(!1), X(`death`), Vt.current = setTimeout(()=>{
                            Bt((e)=>e || !0), X(null);
                        }, 9e3);
                    }, e);
                }
            } else Vt.current &&= (clearTimeout(Vt.current), null), Bt(!1), X(null), Ht.current.clear(), Ue.current = 0, Be([]), Ct(!1);
        }, [
            k.gameOver
        ]);
        let un = (0, O.useRef)(!1), dn = (0, O.useRef)(-99), fn = (0, O.useRef)(null);
        (0, O.useEffect)(()=>{
            k.log?.includes(`Tentacles rake the hull`) && (k.turn - dn.current < 3 || (dn.current = k.turn, fn.current && clearTimeout(fn.current), un.current = !0, Zt(!0), fn.current = setTimeout(()=>{
                un.current = !1, Zt(!1);
            }, U ? 2e3 : 7200)));
        }, [
            k.log,
            k.turn,
            U
        ]), (0, O.useEffect)(()=>{
            if (!Xt) return;
            let e = ()=>{
                un.current = !1, Zt(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            Xt
        ]), (0, O.useEffect)(()=>{
            if (k.log?.includes(`⚡ Storm surge`) && an(`rgba(100,150,255,0.35)`), k.log?.includes(`Storm Rider surfs`) && an(`rgba(50,200,160,0.32)`), k.event?.cellType === `ancient_kraken` ? an(`rgba(200,160,48,0.4)`) : k.event?.cellType === `kraken` && an(`rgba(150,0,255,0.3)`), k.hunter?.active) {
                let e = St(k);
                nn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else nn(0);
        }, [
            k
        ]), (0, O.useEffect)(()=>{
            let e = (e)=>{
                if (k.gameOver || k.event || k.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && pn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && pn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && pn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            k.gameOver,
            k.event,
            k.showPort,
            k.turn
        ]);
        let pn = (e, t)=>{
            q(e === -1 ? 0 : e === 1 ? 2 : 1), A((n)=>p(n, e, t));
        }, mn = (e)=>{
            q(10 + e), A((t)=>{
                let n = l(t, e);
                return n.ship.hull < t.ship.hull && rn(), n;
            });
        }, hn = ()=>{
            q(20), A((e)=>u(e));
        }, gn = (e)=>{
            q(e === `hull` ? 30 : e === `weapon` ? 31 : 32), A((t)=>f(t, e));
        }, _n = async ()=>{
            if (e) {
                Pt(!0), Mt(!1);
                let t = await de(e);
                if (Pt(!1), !t) {
                    Mt(!0);
                    return;
                }
                At.current = t.seed_token;
                let n = h(t.seed, D ?? `default`);
                K.current = [], J.current = [], It.current = 0, G.current = crypto.randomUUID(), st.current = !1, $e(!1), z({
                    kind: `idle`
                }), nt(!1), lt([]), B([]), E({
                    run_id: G.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), A(n);
                return;
            }
            let t = h(void 0, D ?? `default`);
            K.current = [], J.current = [], It.current = 0, G.current = crypto.randomUUID(), st.current = !1, $e(!1), z({
                kind: `idle`
            }), nt(!1), lt([]), B([]), A(t);
        }, vn = (0, O.useRef)(null), [$, yn] = (0, O.useState)(!1);
        (0, O.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = $, n.play().catch(()=>{}), vn.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), vn.current && (vn.current.pause(), vn.current.currentTime = 0);
            };
        }, []), (0, O.useEffect)(()=>{
            vn.current && (vn.current.muted = $), ke($);
        }, [
            $
        ]);
        let bn = (0, O.useRef)({
            gold: k.ship.gold,
            hull: k.ship.hull,
            zone: k.currentZone ?? 1,
            over: k.gameOver,
            mult: k.scoreMultiplier ?? 1,
            hmode: k.hunter?.mode ?? ``,
            storm: k.stormDistance
        });
        return (0, O.useEffect)(()=>{
            let e = bn.current, t = !!k.log?.includes(`Tentacles rake`);
            if (k.gameOver && !e.over) j(`death`);
            else if (!k.gameOver) {
                k.ship.gold > e.gold && j(`gold`), k.ship.gold < e.gold && k.showPort && j(`buy`), t ? j(`hunter_attack`) : k.ship.hull < e.hull && j(`damage`), (k.currentZone ?? 1) !== e.zone && j(`zone`), (k.scoreMultiplier ?? 1) > e.mult && j(`streak`);
                let n = k.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && j(`hunter_near`), k.stormDistance < e.storm && k.stormDistance <= 4 && k.stormDistance > 0 && (j(`thunder`), rn());
            }
            bn.current = {
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
                let e = (k.relics ?? [])[n - 1], t = _(e);
                t && (Xe(t), j(`streak`));
            }
            Ze.current = n;
        }, [
            k
        ]), (0, M.jsxs)(i.div, {
            animate: P ? {
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
                (0, M.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, M.jsx)(i.div, {
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
                                backgroundImage: `url(${F[Q.currentZone ?? 1] ?? F[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Q.currentZone ?? 1),
                        (0, M.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        }),
                        (0, M.jsx)(i.div, {
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
                $t && (0, M.jsx)(i.div, {
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
                        background: $t,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                tn > 0 && (0, M.jsx)(i.div, {
                    animate: {
                        opacity: [
                            tn,
                            tn * .6,
                            tn
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
                Q.ship.hull <= 5 && !Q.gameOver && (0, M.jsx)(i.div, {
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
                (0, M.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        padding: U ? `calc(5px + env(safe-area-inset-top)) 8px 5px` : `8px 18px`,
                        background: `linear-gradient(180deg, rgba(6,12,20,0.78) 0%, rgba(6,12,20,0.42) 100%)`,
                        borderBottom: `1px solid rgba(255,255,255,0.05)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5,
                        backdropFilter: `blur(6px)`
                    },
                    children: [
                        (0, M.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: U ? 6 : 8
                            },
                            children: [
                                (0, M.jsx)(`img`, {
                                    src: oe,
                                    style: {
                                        width: U ? 24 : 36,
                                        height: U ? 24 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !U && (0, M.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                (()=>{
                                    let e = C.find((e)=>e.id === (Q.shipType ?? `default`)) ?? C[0], t = y[Q.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, M.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: U ? 0 : 2,
                                            padding: U ? `2px 6px 2px 2px` : `2px 8px 2px 2px`,
                                            borderRadius: 7,
                                            border: `1px solid rgba(200,160,48,0.28)`,
                                            background: `rgba(200,160,48,0.07)`,
                                            fontSize: U ? 9 : 10,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: U ? 110 : 200,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, M.jsx)(`img`, {
                                                src: ie(e.id),
                                                alt: ``,
                                                style: {
                                                    width: U ? 20 : 24,
                                                    height: U ? 20 : 24,
                                                    borderRadius: 4,
                                                    objectFit: `cover`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, M.jsxs)(`span`, {
                                                style: {
                                                    display: `flex`,
                                                    flexDirection: `column`,
                                                    lineHeight: 1.15,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    (0, M.jsx)(`span`, {
                                                        children: U ? e.name.replace(/^The /, ``) : e.name
                                                    }),
                                                    !U && (0, M.jsx)(`span`, {
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
                        (0, M.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: U ? 8 : 16,
                                alignItems: `flex-end`
                            },
                            children: (U ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Q.ship.hull}/${Q.ship.maxHull}`,
                                    color: sn
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
                                    color: sn
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
                            ]).map((e)=>(0, M.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, M.jsx)(`div`, {
                                            style: {
                                                fontSize: U ? 9 : 10,
                                                color: `rgba(255,255,255,0.38)`,
                                                letterSpacing: 1.5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: e.label
                                        }),
                                        (0, M.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 3,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, M.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: Et,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: U ? 18 : 22,
                                                        height: U ? 18 : 22,
                                                        objectFit: `contain`,
                                                        opacity: .9
                                                    }
                                                }),
                                                (0, M.jsx)(`span`, {
                                                    style: {
                                                        fontSize: U ? 13 : 16,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !U && (0, M.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 12
                            },
                            children: [
                                (0, M.jsxs)(`div`, {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 4
                                    },
                                    children: [
                                        (0, M.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 28,
                                                height: 28,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, M.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Q.score
                                        }),
                                        (0, M.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(238,221,68,0.55)`,
                                                fontWeight: 500
                                            },
                                            children: `pts`
                                        })
                                    ]
                                }),
                                (0, M.jsx)(`button`, {
                                    onClick: ()=>yn((e)=>!e),
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
                        U && (0, M.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, M.jsxs)(`span`, {
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
                                (0, M.jsx)(`button`, {
                                    onClick: ()=>yn((e)=>!e),
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
                U && (Q.relics ?? []).length > 0 && (0, M.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Q.relics ?? []).map((e)=>{
                        let t = _(e);
                        return t ? (0, M.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, M.jsx)(`img`, {
                                src: ue(e),
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
                U && Q.hunter?.active && (()=>{
                    let e = _t(Q), t = St(Q), n = vt(Q);
                    return (0, M.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, M.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, M.jsx)(b, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: Q.hunter.mode === `frenzy` ? `#ff6666` : Q.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            Dt(Q.hunter.mode),
                                            yt(Q.hunter.mode)
                                        ]
                                    }),
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: xt(e)
                                    }),
                                    (0, M.jsxs)(`div`, {
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
                            (0, M.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, M.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${Q.hunter.awareness}%`,
                                                background: Q.hunter.awareness >= d.hunter.frenzyAwareness ? `#ee4444` : Q.hunter.awareness >= d.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, M.jsxs)(`span`, {
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
                (0, M.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, M.jsxs)(`div`, {
                            style: {
                                width: U ? 0 : 200,
                                padding: U ? 0 : `12px 10px`,
                                overflow: `hidden`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 8,
                                borderRight: U ? `none` : `1px solid rgba(255,255,255,0.04)`,
                                transition: `width 0.3s`,
                                background: U ? void 0 : `linear-gradient(90deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, M.jsxs)(`div`, {
                                    style: {
                                        background: on > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${on > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, M.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: on > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, M.jsx)(b, {
                                                    name: `storm`,
                                                    size: 13
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, M.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `baseline`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: on > 70 ? `#ee4444` : `#ee8844`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        lineHeight: 1
                                                    },
                                                    children: Q.stormDistance
                                                }),
                                                (0, M.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.45)`,
                                                        fontFamily: `'IM Fell English', cursive`
                                                    },
                                                    children: `turns left`
                                                })
                                            ]
                                        }),
                                        (0, M.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 6
                                            },
                                            children: (0, M.jsx)(i.div, {
                                                animate: {
                                                    width: `${on}%`
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
                                    let e = _t(Q), t = St(Q), n = vt(Q), r = t === `critical` || t === `danger`;
                                    return (0, M.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Q.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : Q.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 8,
                                            padding: `8px 9px`
                                        },
                                        children: [
                                            (0, M.jsxs)(`div`, {
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
                                                    (0, M.jsx)(b, {
                                                        name: `kraken`,
                                                        size: 13
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, M.jsxs)(`div`, {
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
                                                    Dt(Q.hunter.mode, 12),
                                                    yt(Q.hunter.mode)
                                                ]
                                            }),
                                            (0, M.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: .5,
                                                    marginBottom: 2
                                                },
                                                children: [
                                                    xt(e),
                                                    ` · ≈−`,
                                                    n
                                                ]
                                            }),
                                            (0, M.jsx)(`div`, {
                                                style: {
                                                    height: 3,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2,
                                                    marginTop: 4
                                                },
                                                children: (0, M.jsx)(i.div, {
                                                    animate: {
                                                        width: `${Q.hunter.awareness}%`
                                                    },
                                                    transition: {
                                                        duration: .5
                                                    },
                                                    style: {
                                                        height: 3,
                                                        borderRadius: 2,
                                                        background: Q.hunter.awareness >= d.hunter.frenzyAwareness ? `#ee4444` : Q.hunter.awareness >= d.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`
                                                    }
                                                })
                                            })
                                        ]
                                    });
                                })(),
                                (0, M.jsx)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.35)`,
                                        letterSpacing: 2,
                                        marginTop: 4,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: `EQUIPPED`
                                }),
                                Q.ship.upgrades.length === 0 ? (0, M.jsx)(`div`, {
                                    style: {
                                        fontSize: 12,
                                        color: `rgba(255,255,255,0.28)`,
                                        fontStyle: `italic`,
                                        fontFamily: `'IM Fell English', cursive`
                                    },
                                    children: `None yet`
                                }) : Q.ship.upgrades.map((e)=>{
                                    let t = Ve.find((t)=>t.id === e), n = e === `escape` && !Q.escapeUsed, r = e === `escape` && Q.escapeUsed;
                                    return (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: r ? `rgba(255,255,255,0.28)` : He[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 5
                                        },
                                        children: [
                                            (0, M.jsx)(`img`, {
                                                src: Re[e],
                                                style: {
                                                    width: 16,
                                                    height: 16,
                                                    objectFit: `contain`,
                                                    opacity: r ? .4 : 1
                                                }
                                            }),
                                            (0, M.jsx)(`span`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: t.name
                                            }),
                                            n && (0, M.jsx)(`span`, {
                                                style: {
                                                    fontSize: 9,
                                                    letterSpacing: 1,
                                                    color: `#66ccee`,
                                                    border: `1px solid rgba(100,190,220,0.45)`,
                                                    borderRadius: 4,
                                                    padding: `0 4px`,
                                                    fontFamily: `'Cinzel', serif`
                                                },
                                                children: `READY`
                                            }),
                                            r && (0, M.jsx)(`span`, {
                                                style: {
                                                    fontSize: 9,
                                                    letterSpacing: 1,
                                                    color: `rgba(255,255,255,0.28)`,
                                                    fontFamily: `'Cinzel', serif`
                                                },
                                                children: `USED`
                                            })
                                        ]
                                    }, e);
                                }),
                                Q.upgradeToken && (0, M.jsxs)(`div`, {
                                    style: {
                                        fontSize: 11,
                                        color: `#eedd44`,
                                        marginTop: 2,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 5
                                    },
                                    children: [
                                        (0, M.jsx)(b, {
                                            name: `star`,
                                            size: 12
                                        }),
                                        ` Free upgrade at port`
                                    ]
                                }),
                                (0, M.jsxs)(`div`, {
                                    style: {
                                        marginTop: 6
                                    },
                                    children: [
                                        (0, M.jsx)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: `rgba(255,255,255,0.28)`,
                                                letterSpacing: 2,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 6
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, M.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 6
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: Ke,
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
                                                    img: Je,
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
                                                    img: qe,
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
                                                return (0, M.jsxs)(i.div, {
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
                                                        (0, M.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 4
                                                            },
                                                            children: [
                                                                (0, M.jsx)(`img`, {
                                                                    src: e.img,
                                                                    alt: ``,
                                                                    style: {
                                                                        width: 16,
                                                                        height: 16,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, M.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        (0, M.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 11,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: .5
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, M.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 8,
                                                                                color: `rgba(255,255,255,0.28)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, M.jsxs)(`div`, {
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
                                                        (0, M.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, n)=>(0, M.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        n > 0 && (0, M.jsx)(`div`, {
                                                                            style: {
                                                                                width: 6,
                                                                                height: 1,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, M.jsx)(`div`, {
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
                                                                            children: (0, M.jsx)(`span`, {
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
                        (0, M.jsx)(Tt, {
                            state: Q,
                            isMobile: U,
                            slide: Kt,
                            lurch: Jt,
                            onboard: N,
                            onDismissOnboard: Ft,
                            onMove: pn
                        }),
                        (0, M.jsxs)(`div`, {
                            style: {
                                width: U ? 0 : 200,
                                minWidth: U ? 0 : 200,
                                padding: U ? 0 : `12px 10px`,
                                display: U ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                borderLeft: `1px solid rgba(255,255,255,0.04)`,
                                pointerEvents: Q.showPort ? `none` : `auto`,
                                opacity: Q.showPort ? .35 : 1,
                                overflow: `hidden`,
                                background: `linear-gradient(270deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, M.jsxs)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.4)`,
                                        letterSpacing: 2,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        `UPGRADES`,
                                        !Q.showPort && (0, M.jsx)(`span`, {
                                            style: {
                                                color: `rgba(255,255,255,0.22)`,
                                                marginLeft: 6
                                            },
                                            children: `· at port`
                                        })
                                    ]
                                }),
                                (0, M.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 4,
                                        overflowY: `auto`
                                    },
                                    children: Ve.map((e)=>{
                                        let t = Q.ship.upgrades.includes(e.id), n = Pe.includes(e.id), r = Q.upgradeToken && Q.showPort, i = r ? 0 : e.cost, a = !t && !n && Q.ship.gold >= i && Q.showPort, o = He[e.build], s = t || Q.showPort;
                                        return (0, M.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Q.showPort && (n ? Fe((t)=>t.filter((t)=>t !== e.id)) : a && Fe((t)=>[
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
                                                (0, M.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`,
                                                        alignItems: `center`,
                                                        gap: 4
                                                    },
                                                    children: [
                                                        (0, M.jsxs)(`span`, {
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
                                                                (0, M.jsx)(`img`, {
                                                                    src: Re[e.id],
                                                                    style: {
                                                                        width: 18,
                                                                        height: 18,
                                                                        objectFit: `contain`,
                                                                        flexShrink: 0
                                                                    }
                                                                }),
                                                                (0, M.jsx)(`span`, {
                                                                    style: {
                                                                        overflow: `hidden`,
                                                                        textOverflow: `ellipsis`,
                                                                        whiteSpace: `nowrap`
                                                                    },
                                                                    children: e.name
                                                                })
                                                            ]
                                                        }),
                                                        t ? (0, M.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, M.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, M.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#eedd44`,
                                                                flexShrink: 0
                                                            },
                                                            children: r && Q.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                s && (0, M.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, M.jsx)(We, {
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
                (0, M.jsx)(at, {
                    cinematic: Y,
                    isMobile: U,
                    muted: $,
                    zone: Q.currentZone ?? 1,
                    onDeathEnd: ()=>Bt(!0),
                    onClose: ()=>{
                        Y && Ht.current.add(Y), X(null);
                    }
                }),
                (0, M.jsx)(n, {
                    children: V && (0, M.jsxs)(i.div, {
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
                        onClick: ()=>dt(null),
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
                            F[V.zone] && (0, M.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${F[V.zone]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    opacity: .28,
                                    filter: `saturate(0.7) brightness(0.55)`
                                }
                            }),
                            (0, M.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)`
                                }
                            }),
                            (0, M.jsx)(i.div, {
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
                                children: (0, M.jsx)(b, {
                                    name: `vortex`,
                                    size: U ? 72 : 96
                                })
                            }),
                            (0, M.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: U ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: V.lines.slice(0, ft + 1).map((e, t)=>{
                                    let n = e === V.lines[V.lines.length - 1] && ft >= V.lines.length - 1, r = e === `You have entered:`;
                                    return e ? (0, M.jsx)(i.div, {
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
                                            fontSize: n ? U ? 28 : 40 : r ? 14 : U ? 17 : 20,
                                            letterSpacing: n || r ? 3 : .5,
                                            color: n ? `#c8a8ff` : r ? `rgba(200,180,255,0.55)` : `rgba(230,220,255,0.85)`,
                                            marginBottom: n ? 0 : 6,
                                            textShadow: n ? `0 0 24px rgba(136,102,255,0.45)` : `none`
                                        },
                                        children: e
                                    }, t) : (0, M.jsx)(`div`, {
                                        style: {
                                            height: 12
                                        }
                                    }, t);
                                })
                            }),
                            (0, M.jsx)(i.div, {
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
                (0, M.jsx)(n, {
                    children: R && (()=>{
                        let e = R.rarity === `legendary` ? `#eedd44` : R.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = R.rarity.toUpperCase();
                        return (0, M.jsxs)(i.div, {
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
                                (0, M.jsx)(i.div, {
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
                                (0, M.jsxs)(i.div, {
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
                                        (0, M.jsx)(i.div, {
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
                                                width: U ? 168 : 220,
                                                height: U ? 168 : 220,
                                                borderRadius: `50%`,
                                                border: `2px solid ${e}`,
                                                boxShadow: `0 0 40px ${e}66, inset 0 0 30px ${e}22`
                                            }
                                        }),
                                        (0, M.jsx)(i.div, {
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
                                                width: U ? 200 : 260,
                                                height: U ? 200 : 260,
                                                borderRadius: `50%`,
                                                border: `1px solid ${e}88`
                                            }
                                        }),
                                        (0, M.jsx)(`img`, {
                                            src: ue(R.id),
                                            alt: ``,
                                            style: {
                                                position: `relative`,
                                                zIndex: 1,
                                                width: U ? 120 : 160,
                                                height: U ? 120 : 160,
                                                borderRadius: 16,
                                                objectFit: `cover`,
                                                border: `2px solid ${e}`,
                                                boxShadow: `0 0 36px ${e}99, 0 8px 24px rgba(0,0,0,0.6)`
                                            }
                                        })
                                    ]
                                }),
                                (0, M.jsxs)(i.div, {
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
                                (0, M.jsx)(i.div, {
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
                                        fontSize: U ? 30 : 40,
                                        color: e,
                                        letterSpacing: 2,
                                        textShadow: `0 0 30px ${e}66`,
                                        marginBottom: 14,
                                        textAlign: `center`,
                                        padding: `0 20px`
                                    },
                                    children: R.name
                                }),
                                (0, M.jsx)(i.div, {
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
                                        fontSize: U ? 15 : 17,
                                        color: `rgba(255,255,255,0.75)`,
                                        maxWidth: 440,
                                        textAlign: `center`,
                                        lineHeight: 1.5,
                                        padding: `0 24px`,
                                        marginBottom: 32
                                    },
                                    children: R.desc
                                }),
                                (0, M.jsx)(i.div, {
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
                (0, M.jsx)(n, {
                    children: Q.event && !Y && !Q.gameOver && !Q.showPort && Me[Q.event.cellType] && (0, M.jsx)(Ge, {
                        variant: `scene`,
                        event: Q.event,
                        isMobile: U,
                        gold: Q.ship.gold,
                        hull: Q.ship.hull,
                        relics: Q.relics,
                        upgrades: Q.ship.upgrades,
                        score: Q.score,
                        onboard: N,
                        onDismissOnboard: Ft,
                        onChoose: mn,
                        canEscape: !!cn,
                        onSkip: hn
                    }, `event-scene`)
                }),
                (0, M.jsx)(n, {
                    children: Q.event && !Y && !Q.gameOver && !Q.showPort && Q.event.cellType && !I[Q.event.cellType] && (0, M.jsx)(Ge, {
                        variant: `compact`,
                        event: Q.event,
                        isMobile: U,
                        gold: Q.ship.gold,
                        hull: Q.ship.hull,
                        relics: Q.relics,
                        upgrades: Q.ship.upgrades,
                        cellIcon: pt[Q.event.cellType],
                        onboard: N,
                        onDismissOnboard: Ft,
                        onChoose: mn,
                        canEscape: !!cn,
                        onSkip: hn
                    }, `event-compact`)
                }),
                (0, M.jsx)(Ye, {
                    open: !!Q.showPort && !Q.gameOver,
                    isMobile: U,
                    ship: Q.ship,
                    portUpgrades: Q.portUpgrades,
                    upgradeToken: !!Q.upgradeToken,
                    maxedComponents: Q.maxedComponents,
                    cart: Pe,
                    setCart: Fe,
                    onboard: N,
                    onDismissOnboard: Ft,
                    onUpgradeComponent: gn,
                    onReroll: ()=>{
                        q(40), A((e)=>g(e));
                    },
                    freeReroll: Q.shipType === `merchant` && !!Q.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        q(n), A((n)=>m(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of Pe)q(50 + ze.indexOf(e));
                        q(70), A((e)=>{
                            let t = e;
                            for (let e of Pe)t = s(t, e);
                            return o(t);
                        }), Fe([]);
                    }
                }),
                (0, M.jsx)(rt, {
                    open: zt,
                    state: Q,
                    isMobile: U,
                    isDailyRun: W,
                    personalBest: mt,
                    isNewRecord: bt,
                    newFeats: Ie,
                    nearFeats: L,
                    submitStatus: et,
                    onRetrySubmit: ()=>{
                        Rt();
                    },
                    nftMinted: ct,
                    walletAddress: e,
                    account: t,
                    onChainDone: tt,
                    setOnChainDone: nt,
                    submitting: wt,
                    setSubmitting: Ot,
                    connecting: Ce,
                    onConnect: ()=>Se(),
                    showGuestDailyCta: !!(e && Ee.current && !W && De && re),
                    onPlayDaily: re,
                    rangMois: Ut,
                    harborDown: jt,
                    restarting: Nt,
                    onRestart: _n,
                    onHome: ne
                }),
                ut.length > 0 && (0, M.jsx)(it, {
                    queue: ut,
                    isMobile: U,
                    onDismiss: ()=>B((e)=>e.slice(1))
                }),
                (0, M.jsx)(ot, {
                    open: Xt,
                    isMobile: U,
                    muted: $,
                    onClose: ()=>{
                        un.current = !1, Zt(!1);
                    }
                }),
                U && (0, M.jsxs)(M.Fragment, {
                    children: [
                        !Q.event && !Q.showPort && !Q.gameOver && (0, M.jsxs)(`div`, {
                            style: {
                                position: `fixed`,
                                right: 8,
                                bottom: `calc(90px + env(safe-area-inset-bottom))`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                zIndex: 30
                            },
                            children: [
                                (0, M.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Qt(Z === `ship` ? null : `ship`),
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
                                    children: (0, M.jsx)(b, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, M.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Qt(Z === `upgrades` ? null : `upgrades`),
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
                                    children: (0, M.jsx)(b, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, M.jsx)(n, {
                            children: Z && (0, M.jsxs)(i.div, {
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
                                    top: `calc(60px + env(safe-area-inset-top))`,
                                    bottom: `calc(70px + env(safe-area-inset-bottom))`,
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
                                    Z === `ship` && (0, M.jsxs)(M.Fragment, {
                                        children: [
                                            (0, M.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, M.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Q.ship.upgrades.length === 0 ? (0, M.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Q.ship.upgrades.map((e)=>{
                                                let t = Ve.find((t)=>t.id === e);
                                                return (0, M.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, M.jsx)(`img`, {
                                                            src: Re[e],
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
                                            Q.upgradeToken && (0, M.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, M.jsx)(b, {
                                                        name: `star`,
                                                        size: 12
                                                    }),
                                                    ` Free upgrade — claim it at a port`
                                                ]
                                            }),
                                            (0, M.jsx)(`div`, {
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
                                                return (0, M.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, M.jsx)(`img`, {
                                                            src: e.img,
                                                            alt: ``,
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, M.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, M.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, M.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, M.jsx)(`span`, {
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
                                    Z === `upgrades` && (0, M.jsxs)(M.Fragment, {
                                        children: [
                                            (0, M.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            Ve.map((e)=>{
                                                let t = Q.ship.upgrades.includes(e.id), n = He[e.build];
                                                return (0, M.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, M.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, M.jsx)(`img`, {
                                                                    src: Re[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, M.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, M.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, M.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, M.jsx)(We, {
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
                        Z && (0, M.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>Qt(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { Ot as default, __tla };
