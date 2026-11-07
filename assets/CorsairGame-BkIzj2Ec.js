import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { a as o, f as s, h as c, i as l, l as u, m as d, p as f, s as p, t as m } from "./anchor-DzgZ22kI.js";
import { A as h, B as g, C as ee, D as te, E as ne, F as re, I as ie, L as ae, M as oe, N as se, P as ce, R as le, T as _, U as ue, V as de, X as v, Y as y, _ as fe, a as pe, c as me, d as he, f as b, h as ge, i as _e, j as ve, k as ye, l as x, m as S, n as be, o as C, p as xe, r as Se, s as Ce, t as we, u as Te, w, z as Ee } from "./ReplayScreen-CHmsMBG9.js";
import { A as De, b as Oe, c as ke, j as Ae, m as je, t as Me, v as Ne, y as Pe, __tla as __tla_0 } from "./supabase-C_VahK1j.js";
import { a as Fe, c as Ie, o as Le, r as Re, s as ze } from "./nftCatalog-DgS71tPf.js";
import { l as T, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
import { t as E } from "./rpc-BQNg8r_c.js";
let Mt;
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
    var D = e(t(), 1), Be = `corsair_onboard_v2`;
    function Ve() {
        try {
            return new Set(JSON.parse(localStorage.getItem(Be) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function He(e) {
        let t = Ve();
        t.add(e);
        try {
            localStorage.setItem(Be, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function Ue(e) {
        let t = Ve();
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
    var We = {
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
    }, O = {
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
    }, Ge = {}, Ke = (()=>{
        try {
            return localStorage.getItem(`corsair_muted`) === `1`;
        } catch  {
            return !1;
        }
    })();
    function qe(e) {
        Ke = e;
    }
    function k(e) {
        if (!Ke) try {
            let t = Ge[e];
            t || (t = new Audio(`/sounds/${O[e]}.wav`), Ge[e] = t), t.volume = We[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var Je = `corsair_muted`, Ye = `corsair_skip_cine`;
    function Xe(e) {
        try {
            return localStorage.getItem(e) === `1`;
        } catch  {
            return !1;
        }
    }
    function A(e, t) {
        try {
            localStorage.setItem(e, t ? `1` : `0`);
        } catch  {}
    }
    function Ze() {
        return Xe(Je);
    }
    function Qe(e) {
        A(Je, e);
    }
    function $e() {
        return Xe(Ye);
    }
    function et(e) {
        A(Ye, e);
    }
    function tt(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function nt(e, t) {
        let n = tt(e);
        return n === 0 || t >= n;
    }
    function rt(e, t, n) {
        return t === `port` && e.label === `Dock` && (n ?? []).includes(`ghost`) ? `Ghost Ship cannot dock` : null;
    }
    function it(e, t, n, r, i) {
        let a = rt(e, t, i);
        if (a) return a + ` — sail on.`;
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function at(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    var ot = `/assets/swift_sails-YMobDX4v.png`, j = `/assets/ghost_ship-4jaVs07k.png`, st = `/assets/treasure_hunter-C9jnAyZy.png`, ct = `/assets/storm_rider-BjRGnDwr.png`, lt = `/assets/cursed_greed-BlVfcQDt.png`, ut = `/assets/berserker-B9haxHEY.png`, M = r(), N = {
        escape: ot,
        ghost: j,
        hunter: st,
        rider: ct,
        greed: lt,
        berserker: ut
    }, dt = [
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
    ], P = y.upgrades.costs, F = Math.round(y.storm.hunterSurgeBonus * 100), ft = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: P.ghost,
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
            cost: P.rider,
            icon: `rider`,
            build: `escape`
        },
        {
            id: `greed`,
            name: `Cursed Greed`,
            pros: [
                `Gold x${y.greed.goldMultiplier} on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm worsens every 200g. Pirates hit harder at 400g+. Hunter aggro at 600g+.`
            ],
            cost: P.greed,
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
            cost: P.berserker,
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
                `Storm surges +${F}% more frequent.`
            ],
            cost: P.hunter,
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
            cost: P.escape,
            icon: `escape`,
            build: `escape`
        }
    ], pt = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function mt({ ok: e }) {
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
    function ht({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, M.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, M.jsx)(mt, {
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
    function gt(e, t) {
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
    function _t({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, upgrades: s, score: c, cellIcon: l, onboard: u, onDismissOnboard: d, onChoose: f, canEscape: p, onSkip: m }) {
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
                let u = at(c.risk), d = rt(c, t.cellType, s), p = !d && nt(c.desc, r) && !d, m = it(c, t.cellType, o, a, s), h = e === `scene` ? 1.04 : 1.02, g = e === `scene` ? .96 : .98, ee = d ? `rgba(120,120,140,0.45)` : p ? `${u}55` : `rgba(255,255,255,0.1)`;
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
                        border: `1.5px solid ${ee}`,
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
                        me[c.icon] ? (0, M.jsxs)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`,
                                position: `relative`
                            },
                            children: [
                                (0, M.jsx)(`img`, {
                                    src: me[c.icon],
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
                    src: N.escape,
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
                x[t.cellType] && (0, M.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${x[t.cellType]})`,
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
                            children: (0, M.jsx)(S, {
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
                                children: Te[t.cellType] ?? t.cellType
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
                        children: gt(l, 55)
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
                            u && d && (0, M.jsx)(S, {
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
    var vt = `/assets/hull-CGmPGbU0.png`, yt = `/assets/vision-3Q65Za4i.png`, bt = `/assets/power-CBX9SU5d.png`;
    function xt({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
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
                            u && d && (0, M.jsx)(S, {
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
                                children: ft.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = pt[e.build];
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
                                                src: N[e.id],
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
                                                        children: (0, M.jsx)(ht, {
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
                            (0, M.jsx)(w, {
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
    var St = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new T({
        nodeUrl: E
    });
    async function Ct(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: St,
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
    function wt(e) {
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
    function Tt({ status: e, onRetry: t }) {
        if (e.kind === `idle`) return null;
        if (e.kind === `local`) return (0, M.jsx)(I, {
            tone: `muted`,
            children: `Local voyage — not ranked. Connect + server seed to climb the board.`
        });
        if (e.kind === `sending`) return (0, M.jsx)(I, {
            tone: `info`,
            pulse: !0,
            children: (0, M.jsxs)(`span`, {
                style: {
                    display: `inline-flex`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, M.jsx)(L, {}),
                    ` Logging the voyage to the harbor…`
                ]
            })
        });
        if (e.kind === `ok`) return e.daily ? (0, M.jsx)(I, {
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
                            (0, M.jsx)(w, {
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
        }) : (0, M.jsx)(I, {
            tone: `ok`,
            children: (0, M.jsx)(`span`, {
                style: {
                    fontFamily: `'Pirata One', cursive`,
                    fontSize: 15,
                    letterSpacing: 2
                },
                children: `✓ SCORE SAVED — ON THE LEADERBOARD`
            })
        });
        if (e.kind === `queued`) return (0, M.jsx)(I, {
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
        });
        let n = e.raison === `seed non verifiable` ? `Harbor seed missing — sail again for a fresh server seed, then retry.` : e.raison === `score non reproductible` ? `Replay did not match this voyage. Score not ranked.` : e.raison ?? `The harbor could not verify this voyage.`;
        return (0, M.jsx)(I, {
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
                        children: n
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
    function I({ children: e, tone: t, pulse: n }) {
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
    function L() {
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
    function Et({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: s, isNewRecord: l, newFeats: u, nearFeats: f, submitStatus: p, onRetrySubmit: m, nftMinted: h, walletAddress: ee, account: ne, onChainDone: re, setOnChainDone: ie, submitting: ae, setSubmitting: oe, connecting: se, onConnect: ce, showGuestDailyCta: le, onPlayDaily: _, rangMois: ue, harborDown: de, restarting: v, onRestart: y, onHome: fe, onWatchReplay: pe }) {
        let [me, he] = (0, D.useState)(!1), b = o(), ge = b <= 1, _e = !a && !ye() && !!_ && !!ee, x = le || _e, S = wt(t.log), be = {
            padding: r ? `16px 36px` : `18px 48px`,
            borderRadius: 14,
            border: x ? `2px solid rgba(136,221,255,0.85)` : `2px solid rgba(200,160,48,0.85)`,
            background: x ? `linear-gradient(135deg, rgba(30,90,120,0.85) 0%, rgba(20,50,70,0.9) 100%)` : `linear-gradient(135deg, rgba(120,90,20,0.75) 0%, rgba(60,45,10,0.9) 100%)`,
            color: x ? `#a8e8ff` : `#f0d878`,
            cursor: v && !x ? `wait` : `pointer`,
            fontSize: r ? 22 : 26,
            fontWeight: 700,
            letterSpacing: 3,
            fontFamily: `'Pirata One', cursive`,
            boxShadow: x ? `0 0 28px rgba(80,180,220,0.35)` : `0 0 28px rgba(200,160,48,0.35)`,
            opacity: v && !x ? .7 : 1,
            width: r ? `min(92vw, 360px)` : void 0,
            textAlign: `center`
        }, C = {
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
                                children: (0, M.jsx)(w, {
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
                                            S.name
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
                                        children: S.tip
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
                                    l && (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `#44ffaa`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 4
                                        },
                                        children: `NEW BEST`
                                    }),
                                    !l && s > t.score && (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            marginTop: 4
                                        },
                                        children: [
                                            `Best `,
                                            s.toLocaleString(),
                                            ` · `,
                                            s - t.score,
                                            ` short`
                                        ]
                                    })
                                ]
                            }),
                            ge && (0, M.jsx)(i.div, {
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
                                    de && (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try again when you're online`
                                    }),
                                    x && _ ? (0, M.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: _,
                                        style: be,
                                        children: `PLAY DAILY · 1 TRY`
                                    }) : (0, M.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: y,
                                        disabled: v,
                                        style: be,
                                        children: v ? `PREPARING…` : `SAIL AGAIN`
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
                                            x && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: y,
                                                disabled: v,
                                                style: C,
                                                children: v ? `…` : `Sail free run`
                                            }),
                                            !x && _e && _ && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: _,
                                                style: {
                                                    ...C,
                                                    borderColor: `rgba(136,221,255,0.4)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Daily · 1 try`
                                            }),
                                            !ee && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ce,
                                                disabled: se,
                                                style: {
                                                    ...C,
                                                    borderColor: `rgba(200,160,48,0.4)`,
                                                    color: `#c8a030`
                                                },
                                                children: se ? `…` : `Connect wallet`
                                            }),
                                            pe && (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: pe,
                                                style: {
                                                    ...C,
                                                    borderColor: `rgba(136,221,255,0.35)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Watch replay`
                                            }),
                                            (0, M.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: fe,
                                                style: {
                                                    ...C,
                                                    border: `none`,
                                                    color: `rgba(255,255,255,0.28)`
                                                },
                                                children: `← Menu`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, M.jsx)(Tt, {
                                status: p,
                                onRetry: m
                            }),
                            u.length > 0 && (0, M.jsx)(i.div, {
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
                                children: u.map((e)=>(0, M.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, M.jsx)(w, {
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
                            h.length > 0 && (0, M.jsx)(i.div, {
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
                                    let e = Fe(h[0]), t = e ? Re[e.rarity] : `#eedd88`;
                                    return (0, M.jsxs)(M.Fragment, {
                                        children: [
                                            e && (0, M.jsx)(`img`, {
                                                src: Le(e.image),
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
                                                        children: h.map(ze).join(` · `)
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            }),
                            (0, M.jsx)(`button`, {
                                type: `button`,
                                onClick: ()=>he((e)=>!e),
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
                                children: me ? `▲ HIDE DETAILS` : `▼ VOYAGE DETAILS`
                            }),
                            (0, M.jsx)(n, {
                                children: me && (0, M.jsxs)(i.div, {
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
                                                    val: b,
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
                                        f.length > 0 && (0, M.jsxs)(`div`, {
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
                                                f.map((e)=>(0, M.jsxs)(`div`, {
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
                                            children: a ? ve() ? `Seed ${t.seed} · Daily ${te()}` : `Blind daily — seed at 00:00 UTC` : `Seed ${t.seed}`
                                        }),
                                        ne && !re && (0, M.jsxs)(`div`, {
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
                                                    disabled: ae,
                                                    onClick: async ()=>{
                                                        oe(!0);
                                                        try {
                                                            await Ct(ne, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                                        } catch (e) {
                                                            console.warn(`On-chain submit failed:`, e);
                                                        }
                                                        ie(!0), oe(!1);
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
                                                    children: ae ? `ENGRAVING...` : (0, M.jsxs)(M.Fragment, {
                                                        children: [
                                                            (0, M.jsx)(w, {
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
                                            }, i = (t.relics ?? []).map((e)=>g(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = ue ? `\n⚔️ #${ue.rank} in Starktember — ${ue.total.toLocaleString()} pts across the month.` : ``, l = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                            return (0, M.jsx)(d, {
                                                isMobile: r,
                                                onShare: ()=>{
                                                    c(l);
                                                },
                                                payload: {
                                                    score: t.score,
                                                    turn: t.turn,
                                                    gold: t.ship.gold,
                                                    runTitle: t.runTitle,
                                                    seed: t.seed,
                                                    deathName: S.name,
                                                    isDaily: a,
                                                    text: l
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
    function Dt({ queue: e, isMobile: t, onDismiss: r }) {
        let a = e[0] ?? null;
        if ((0, D.useEffect)(()=>{
            a && k(`nft`);
        }, [
            a
        ]), !a) return null;
        let o = Fe(a), s = o?.name ?? ze(a), c = o?.rarity ?? `Rare`, l = Re[c], u = Ie(a), d = o ? Le(o.image) : null, f = e.length - 1;
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
    function Ot({ cinematic: e, isMobile: t, muted: r, zone: a, onClose: o, onDeathEnd: s }) {
        if (!e || !(he[e] || x[e] || e === `death`)) return null;
        let c = !t && !!he[e], l = e === `death` ? b[a] ?? x.storm : x[e] ?? null, u = ()=>{
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
                        src: he[e],
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
                                children: Te[e] ?? ``
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
    function kt({ open: e, isMobile: t, muted: r, onClose: a }) {
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
    var At = `/icons/gold.png`, jt = (e, t = 14)=>(0, M.jsx)(w, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    Mt = function({ walletAddress: e, account: t, username: r, onHome: o, onPlayDaily: c, dailySeed: d, isDaily: me, seedToken: ve, shipId: S, resumeState: Fe, resumeRunId: Ie, resumeActions: Le }) {
        let { connect: Re, connecting: ze } = a(), [T, E] = (0, D.useState)(()=>Fe ?? h(d, S ?? `default`)), Be = (0, D.useRef)(!e), [Ve, We] = (0, D.useState)(()=>!ye()), [O, Ge] = (0, D.useState)(null), [Ke, Je] = (0, D.useState)(null), [Ye, Xe] = (0, D.useState)(!1), [A, tt] = (0, D.useState)([]), [nt, rt] = (0, D.useState)([]), [it, at] = (0, D.useState)([]), ot = (0, D.useRef)(0), [j, st] = (0, D.useState)(null), ct = (0, D.useRef)((T.relics ?? []).length), [lt, ut] = (0, D.useState)(!1), [P, F] = (0, D.useState)({
            kind: `idle`
        }), [mt, gt] = (0, D.useState)(!1), St = (0, D.useRef)(!1), [Ct, wt] = (0, D.useState)([]), [Tt, I] = (0, D.useState)([]), [L, Mt] = (0, D.useState)(null), [Nt, Pt] = (0, D.useState)(0), [Ft, It] = (0, D.useState)(()=>l()), [Lt, Rt] = (0, D.useState)(!1), [R, zt] = (0, D.useState)(()=>Ze()), [z, Bt] = (0, D.useState)(()=>$e()), Vt = (0, D.useRef)(z);
        Vt.current = z;
        let [Ht, Ut] = (0, D.useState)(!1), [B, Wt] = (0, D.useState)(window.innerWidth < 768), V = (0, D.useRef)(me === !0), H = V.current, Gt = (0, D.useRef)(ve), [Kt, qt] = (0, D.useState)(!1), [Jt, Yt] = (0, D.useState)(!1);
        (0, D.useEffect)(()=>{
            if (T.gameOver) {
                Ge(null);
                return;
            }
            T.turn > 0 && He(`sail`), Ge(Ue(T));
        }, [
            T.turn,
            T.event,
            T.showPort,
            T.hunter?.active,
            T.stormDistance,
            T.gameOver
        ]);
        let Xt = ()=>{
            O && (He(O.id), Ge(null));
        };
        (0, D.useEffect)(()=>{
            H && (se(), e && te());
        }, []), (0, D.useEffect)(()=>{
            if (!e) {
                We(!ye());
                return;
            }
            Ne(e, te()).then((e)=>{
                if (e) {
                    We(!1);
                    return;
                }
                ye() && ne(), We(!0);
            });
        }, [
            e
        ]);
        let U = (0, D.useRef)(Ie ?? crypto.randomUUID()), W = (0, D.useRef)(Le ? [
            ...Le
        ] : []), G = (e)=>{
            W.current.push(e);
        }, K = (0, D.useRef)([]);
        (0, D.useEffect)(()=>{
            let t = e;
            !t || T.gameOver || W.current.length !== 0 && f({
                run_id: U.current,
                wallet_address: t,
                seed: T.seed,
                ship_id: S ?? `default`,
                is_daily: V.current,
                seed_token: Gt.current ?? null,
                actions: W.current,
                turn: T.turn,
                score: T.score,
                saved_at: Date.now()
            });
        }, [
            T
        ]), (0, D.useEffect)(()=>{
            let e = W.current.length - 1;
            e < 0 || (K.current[e * 3] = T.score, K.current[e * 3 + 1] = T.ship.hull, K.current[e * 3 + 2] = T.rngState ?? -1);
        }, [
            T
        ]);
        let Zt = (0, D.useRef)(0);
        (0, D.useEffect)(()=>{
            e && (Ie || Ae({
                run_id: U.current,
                wallet_address: e,
                username: r ?? null,
                seed: T.seed,
                is_daily: H,
                seed_token: ve ?? null
            }));
        }, []), (0, D.useEffect)(()=>{
            !e || T.gameOver || T.turn - Zt.current < 3 || (Zt.current = T.turn, Pe(U.current, {
                score: T.score,
                turn: T.turn,
                zone: T.currentZone ?? 1,
                gold: T.ship.gold,
                hull: T.ship.hull
            }));
        }, [
            T.turn
        ]);
        let Qt = ()=>({
                run_id: U.current,
                wallet_address: e,
                seed: T.seed,
                ship_id: S ?? `default`,
                is_daily: V.current,
                actions: W.current,
                checks: W.current.flatMap((e, t)=>[
                        K.current[t * 3] ?? -1,
                        K.current[t * 3 + 1] ?? -1,
                        K.current[t * 3 + 2] ?? -1
                    ]),
                final_score: T.score,
                final_turn: T.turn
            }), $t = async ()=>{
            if (!e) return;
            if (!V.current && !Gt.current) {
                F({
                    kind: `local`
                });
                return;
            }
            let t = Qt();
            F({
                kind: `sending`
            });
            try {
                await De(t);
            } catch (e) {
                console.warn(`[runlog]`, e), s(`runlog`, t), F({
                    kind: `queued`,
                    step: `log`
                });
                return;
            }
            try {
                let t = await Me(U.current);
                if (t?.approved) {
                    if (ut(!0), F({
                        kind: `ok`,
                        daily: V.current
                    }), V.current && se(), t.nft?.minted?.length) {
                        let e = t.nft.minted.map((e)=>typeof e == `string` ? e : e.nft).filter(Boolean);
                        wt(e), I(e);
                    }
                } else console.warn(`[approve] refuse :`, t?.raison ?? t), F({
                    kind: `rejected`,
                    raison: t?.raison ?? void 0
                }), V.current && Ne(e, te()).then((e)=>{
                    e || ne();
                });
            } catch (e) {
                console.warn(`[approve]`, e), s(`approve`, {
                    run_id: U.current
                }), F({
                    kind: `queued`,
                    step: `approve`
                });
            }
        };
        (0, D.useEffect)(()=>{
            if (T.gameOver) {
                if (!e) {
                    F({
                        kind: `idle`
                    });
                    return;
                }
                if (!St.current) {
                    if (St.current = !0, ke(U.current, {
                        score: T.score,
                        turn: T.turn,
                        zone: T.currentZone ?? 1,
                        gold: T.ship.gold,
                        hull: T.ship.hull,
                        run_title: T.runTitle
                    }), !V.current && !Gt.current) {
                        console.warn(`[approve] skip : seed local, run non soumise`), F({
                            kind: `local`
                        }), u();
                        return;
                    }
                    $t(), u();
                }
            }
        }, [
            T.gameOver
        ]), (0, D.useEffect)(()=>{
            let e = (e)=>{
                let t = e.detail;
                !t?.run_id || t.run_id !== U.current || t.approved && (ut(!0), F({
                    kind: `ok`,
                    daily: H
                }), H && se());
            };
            return window.addEventListener(`corsair-sync`, e), ()=>window.removeEventListener(`corsair-sync`, e);
        }, [
            H
        ]), (0, D.useEffect)(()=>{
            let e = ()=>Wt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [q, J] = (0, D.useState)(null), [en, Y] = (0, D.useState)(!1), tn = (0, D.useRef)(null), nn = (0, D.useRef)(new Set), [rn, an] = (0, D.useState)(null);
        (0, D.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !T.gameOver || !H || !e || !n || lt && je().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && an({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            T.gameOver,
            lt
        ]);
        let on = (0, D.useRef)({
            x: T.ship.x,
            y: T.ship.y
        }), [sn, cn] = (0, D.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [ln, un] = (0, D.useState)({
            x: 0,
            y: 0
        });
        (0, D.useEffect)(()=>{
            let e = on.current, t = T.ship.x - e.x, n = T.ship.y - e.y;
            if (on.current = {
                x: T.ship.x,
                y: T.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = ge(T.ship.vision, B), i = .8;
            cn({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), un({
                x: t,
                y: n
            });
            let a = setTimeout(()=>un({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>cn({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(o), clearTimeout(a);
            };
        }, [
            T.ship.x,
            T.ship.y,
            B,
            T.ship.vision
        ]);
        let [dn, X] = (0, D.useState)(!1), [Z, fn] = (0, D.useState)(null), [pn, mn] = (0, D.useState)(null), [hn, gn] = (0, D.useState)(0), _n = ()=>{
            Xe(!0), setTimeout(()=>Xe(!1), 400);
        }, vn = (e)=>{
            mn(e), setTimeout(()=>mn(null), 150);
        }, Q = T, yn = Math.min(100, (1 - Q.stormDistance / 10) * 100), bn = Q.ship.hull <= 5 ? `#ee4444` : Q.ship.hull <= 10 ? `#ee8844` : `#44cc88`, xn = !Q.escapeUsed && Q.ship.upgrades.includes(`escape`) && Q.event && Q.event.choices[0].risk !== `safe`;
        (0, D.useEffect)(()=>{
            if (z || T.gameOver) return;
            let e = T.event?.cellType;
            e && (!he[e] && !x[e] || nn.current.has(e) || J(e));
        }, [
            T.event?.cellType,
            T.gameOver,
            z
        ]), (0, D.useEffect)(()=>{
            if (!q || q === `death`) return;
            let e = B ? 2200 : {
                ancient_kraken: 6500
            }[q] ?? 5e3, t = setTimeout(()=>{
                nn.current.add(q), J(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            q,
            B
        ]);
        let Sn = (0, D.useRef)(1);
        (0, D.useEffect)(()=>{
            let e = T.currentZone ?? 1;
            if (e > Sn.current) {
                let t = Sn.current, n = v[e], r = v[t]?.transitionText ?? [], i = r.length > 0 ? [
                    ...r,
                    ``,
                    `You have entered:`,
                    n.name.toUpperCase()
                ] : [
                    `You have entered:`,
                    n.name.toUpperCase()
                ];
                z || (Mt({
                    lines: i,
                    zone: e
                }), Pt(0)), Sn.current = e;
            }
        }, [
            T.currentZone,
            z
        ]), (0, D.useEffect)(()=>{
            if (!L) return;
            if (Nt >= L.lines.length) {
                setTimeout(()=>Mt(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Pt((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            L,
            Nt
        ]), (0, D.useEffect)(()=>{
            T.dangerStreak > ot.current && (ot.current = T.dangerStreak);
        }, [
            T.dangerStreak
        ]), (0, D.useEffect)(()=>{
            if (T.gameOver) {
                let e = ue(T);
                e.length > 0 && (rt(e), k(`streak`));
                let t = p({
                    score: T.score,
                    turn: T.turn,
                    zone: T.currentZone ?? 1,
                    gold: T.ship.gold,
                    hunterAttacksSurvived: T.hunterAttacksSurvived ?? 0,
                    peakStreak: ot.current,
                    hadStreak5: (T.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if (at(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (It(t.pb), Rt(!0)), u(), Vt.current) X(!1), J(null), Y(!0);
                else if (B) X(!1), J(`death`), tn.current = setTimeout(()=>{
                    Y((e)=>e || !0), J(null);
                }, 2200);
                else {
                    let e = $.current ? 8e3 : 0;
                    setTimeout(()=>{
                        X(!1), J(`death`), tn.current = setTimeout(()=>{
                            Y((e)=>e || !0), J(null);
                        }, 9e3);
                    }, e);
                }
            } else tn.current &&= (clearTimeout(tn.current), null), Y(!1), J(null), nn.current.clear(), ot.current = 0, at([]), Rt(!1);
        }, [
            T.gameOver,
            B
        ]);
        let $ = (0, D.useRef)(!1), Cn = (0, D.useRef)(-99), wn = (0, D.useRef)(null);
        (0, D.useEffect)(()=>{
            z || T.log?.includes(`Tentacles rake the hull`) && (T.turn - Cn.current < 3 || (Cn.current = T.turn, wn.current && clearTimeout(wn.current), $.current = !0, X(!0), wn.current = setTimeout(()=>{
                $.current = !1, X(!1);
            }, B ? 2e3 : 7200)));
        }, [
            T.log,
            T.turn,
            B,
            z
        ]), (0, D.useEffect)(()=>{
            z && (q && q !== `death` && (nn.current.add(q), J(null)), q === `death` && (J(null), Y(!0)), Mt(null), $.current = !1, X(!1));
        }, [
            z
        ]), (0, D.useEffect)(()=>{
            if (!dn) return;
            let e = ()=>{
                $.current = !1, X(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            dn
        ]), (0, D.useEffect)(()=>{
            if (T.log?.includes(`⚡ Storm surge`) && vn(`rgba(100,150,255,0.35)`), T.log?.includes(`Storm Rider surfs`) && vn(`rgba(50,200,160,0.32)`), T.event?.cellType === `ancient_kraken` ? vn(`rgba(200,160,48,0.4)`) : T.event?.cellType === `kraken` && vn(`rgba(150,0,255,0.3)`), T.hunter?.active) {
                let e = Ce(T);
                gn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else gn(0);
        }, [
            T
        ]), (0, D.useEffect)(()=>{
            let e = (e)=>{
                if (T.gameOver || T.event || T.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && Tn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && Tn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && Tn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            T.gameOver,
            T.event,
            T.showPort,
            T.turn
        ]);
        let Tn = (e, t)=>{
            G(e === -1 ? 0 : e === 1 ? 2 : 1), E((n)=>ce(n, e, t));
        }, En = (e)=>{
            G(10 + e), E((t)=>{
                let n = ae(t, e);
                return n.ship.hull < t.ship.hull && _n(), n;
            });
        }, Dn = ()=>{
            G(20), E((e)=>le(e));
        }, On = (e)=>{
            G(e === `hull` ? 30 : e === `weapon` ? 31 : 32), E((t)=>Ee(t, e));
        }, kn = async ()=>{
            if (e) {
                Yt(!0), qt(!1);
                let t = await Oe(e);
                if (Yt(!1), !t) {
                    qt(!0);
                    return;
                }
                V.current = !1, Gt.current = t.seed_token;
                let n = h(t.seed, S ?? `default`);
                W.current = [], K.current = [], Zt.current = 0, U.current = crypto.randomUUID(), St.current = !1, ut(!1), F({
                    kind: `idle`
                }), gt(!1), wt([]), I([]), Ae({
                    run_id: U.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), E(n);
                return;
            }
            V.current = !1;
            let t = h(void 0, S ?? `default`);
            W.current = [], K.current = [], Zt.current = 0, U.current = crypto.randomUUID(), St.current = !1, ut(!1), F({
                kind: `idle`
            }), gt(!1), wt([]), I([]), E(t);
        }, An = (0, D.useRef)(null);
        (0, D.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = Ze(), n.play().catch(()=>{}), An.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), An.current && (An.current.pause(), An.current.currentTime = 0);
            };
        }, []), (0, D.useEffect)(()=>{
            An.current && (An.current.muted = R), qe(R), Qe(R);
        }, [
            R
        ]), (0, D.useEffect)(()=>{
            et(z);
        }, [
            z
        ]);
        let jn = ()=>zt((e)=>!e), Mn = ()=>Bt((e)=>!e), Nn = (0, D.useRef)({
            gold: T.ship.gold,
            hull: T.ship.hull,
            zone: T.currentZone ?? 1,
            over: T.gameOver,
            mult: T.scoreMultiplier ?? 1,
            hmode: T.hunter?.mode ?? ``,
            storm: T.stormDistance
        });
        return (0, D.useEffect)(()=>{
            let e = Nn.current, t = !!T.log?.includes(`Tentacles rake`);
            if (T.gameOver && !e.over) k(`death`);
            else if (!T.gameOver) {
                T.ship.gold > e.gold && k(`gold`), T.ship.gold < e.gold && T.showPort && k(`buy`), t ? k(`hunter_attack`) : T.ship.hull < e.hull && k(`damage`), (T.currentZone ?? 1) !== e.zone && k(`zone`), (T.scoreMultiplier ?? 1) > e.mult && k(`streak`);
                let n = T.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && k(`hunter_near`), T.stormDistance < e.storm && T.stormDistance <= 4 && T.stormDistance > 0 && (k(`thunder`), _n());
            }
            Nn.current = {
                gold: T.ship.gold,
                hull: T.ship.hull,
                zone: T.currentZone ?? 1,
                over: T.gameOver,
                mult: T.scoreMultiplier ?? 1,
                hmode: T.hunter?.mode ?? ``,
                storm: T.stormDistance
            };
            let n = (T.relics ?? []).length;
            if (n > ct.current) {
                let e = (T.relics ?? [])[n - 1], t = g(e);
                t && (st(t), k(`streak`));
            }
            ct.current = n;
        }, [
            T
        ]), (0, M.jsxs)(i.div, {
            animate: Ye ? {
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
                                backgroundImage: `url(${b[Q.currentZone ?? 1] ?? b[1]})`,
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
                pn && (0, M.jsx)(i.div, {
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
                        background: pn,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                hn > 0 && (0, M.jsx)(i.div, {
                    animate: {
                        opacity: [
                            hn,
                            hn * .6,
                            hn
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
                        padding: B ? `calc(5px + env(safe-area-inset-top)) 8px 5px` : `8px 18px`,
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
                                gap: B ? 6 : 8
                            },
                            children: [
                                (0, M.jsx)(`img`, {
                                    src: m,
                                    style: {
                                        width: B ? 24 : 36,
                                        height: B ? 24 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !B && (0, M.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                (()=>{
                                    let e = fe.find((e)=>e.id === (Q.shipType ?? `default`)) ?? fe[0], t = v[Q.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, M.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: B ? 0 : 2,
                                            padding: B ? `2px 6px 2px 2px` : `2px 8px 2px 2px`,
                                            borderRadius: 7,
                                            border: `1px solid rgba(200,160,48,0.28)`,
                                            background: `rgba(200,160,48,0.07)`,
                                            fontSize: B ? 9 : 10,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: B ? 110 : 200,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, M.jsx)(`img`, {
                                                src: ee(e.id),
                                                alt: ``,
                                                style: {
                                                    width: B ? 20 : 24,
                                                    height: B ? 20 : 24,
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
                                                        children: B ? e.name.replace(/^The /, ``) : e.name
                                                    }),
                                                    !B && (0, M.jsx)(`span`, {
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
                                gap: B ? 8 : 16,
                                alignItems: `flex-end`
                            },
                            children: (B ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Q.ship.hull}/${Q.ship.maxHull}`,
                                    color: bn
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
                                    color: bn
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
                                                fontSize: B ? 9 : 10,
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
                                                        gold: At,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: B ? 18 : 22,
                                                        height: B ? 18 : 22,
                                                        objectFit: `contain`,
                                                        opacity: .9
                                                    }
                                                }),
                                                (0, M.jsx)(`span`, {
                                                    style: {
                                                        fontSize: B ? 13 : 16,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !B && (0, M.jsxs)(`div`, {
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
                                    onClick: jn,
                                    "aria-label": R ? `Unmute sound` : `Mute sound`,
                                    title: R ? `Unmute sound` : `Mute sound`,
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
                                    children: R ? `MUTE` : `SOUND`
                                }),
                                (0, M.jsx)(`button`, {
                                    onClick: Mn,
                                    "aria-label": z ? `Play cinematics` : `Skip cinematics`,
                                    title: z ? `Cinematics off — click to restore` : `Skip scene / portal / death videos`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.08)`,
                                        color: z ? `#c8a030` : `rgba(255,255,255,0.4)`,
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        borderRadius: 6,
                                        padding: `4px 8px`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: z ? `SKIP` : `CINE`
                                })
                            ]
                        }),
                        B && (0, M.jsxs)(`div`, {
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
                                    onClick: jn,
                                    "aria-label": R ? `Unmute sound` : `Mute sound`,
                                    title: R ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `none`,
                                        color: `rgba(255,255,255,0.4)`,
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: R ? `MUTE` : `SND`
                                }),
                                (0, M.jsx)(`button`, {
                                    onClick: Mn,
                                    "aria-label": z ? `Play cinematics` : `Skip cinematics`,
                                    title: z ? `Cinematics off` : `Skip cinematics`,
                                    style: {
                                        background: `transparent`,
                                        border: `none`,
                                        color: z ? `#c8a030` : `rgba(255,255,255,0.4)`,
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: z ? `SKIP` : `CINE`
                                })
                            ]
                        })
                    ]
                }),
                B && (Q.relics ?? []).length > 0 && (0, M.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Q.relics ?? []).map((e)=>{
                        let t = g(e);
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
                                src: de(e),
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
                B && Q.hunter?.active && (()=>{
                    let e = pe(Q), t = Ce(Q), n = _e(Q);
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
                                    (0, M.jsx)(w, {
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
                                            jt(Q.hunter.mode),
                                            C(Q.hunter.mode)
                                        ]
                                    }),
                                    (0, M.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: Se(e)
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
                                                background: Q.hunter.awareness >= y.hunter.frenzyAwareness ? `#ee4444` : Q.hunter.awareness >= y.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`,
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
                                width: B ? 0 : 200,
                                padding: B ? 0 : `12px 10px`,
                                overflow: `hidden`,
                                display: `flex`,
                                flexDirection: `column`,
                                gap: 8,
                                borderRight: B ? `none` : `1px solid rgba(255,255,255,0.04)`,
                                transition: `width 0.3s`,
                                background: B ? void 0 : `linear-gradient(90deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, M.jsxs)(`div`, {
                                    style: {
                                        background: yn > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${yn > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, M.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: yn > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, M.jsx)(w, {
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
                                                        color: yn > 70 ? `#ee4444` : `#ee8844`,
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
                                                    width: `${yn}%`
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
                                    let e = pe(Q), t = Ce(Q), n = _e(Q), r = t === `critical` || t === `danger`;
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
                                                    (0, M.jsx)(w, {
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
                                                    jt(Q.hunter.mode, 12),
                                                    C(Q.hunter.mode)
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
                                                    Se(e),
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
                                                        background: Q.hunter.awareness >= y.hunter.frenzyAwareness ? `#ee4444` : Q.hunter.awareness >= y.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`
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
                                    let t = ft.find((t)=>t.id === e), n = e === `escape` && !Q.escapeUsed, r = e === `escape` && Q.escapeUsed;
                                    return (0, M.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: r ? `rgba(255,255,255,0.28)` : pt[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 5
                                        },
                                        children: [
                                            (0, M.jsx)(`img`, {
                                                src: N[e],
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
                                        (0, M.jsx)(w, {
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
                                                    img: vt,
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
                                                    img: bt,
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
                                                    img: yt,
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
                        (0, M.jsx)(be, {
                            state: Q,
                            isMobile: B,
                            slide: sn,
                            lurch: ln,
                            onboard: O,
                            onDismissOnboard: Xt,
                            onMove: Tn
                        }),
                        (0, M.jsxs)(`div`, {
                            style: {
                                width: B ? 0 : 200,
                                minWidth: B ? 0 : 200,
                                padding: B ? 0 : `12px 10px`,
                                display: B ? `none` : `flex`,
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
                                    children: ft.map((e)=>{
                                        let t = Q.ship.upgrades.includes(e.id), n = A.includes(e.id), r = Q.upgradeToken && Q.showPort, i = r ? 0 : e.cost, a = !t && !n && Q.ship.gold >= i && Q.showPort, o = pt[e.build], s = t || Q.showPort;
                                        return (0, M.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Q.showPort && (n ? tt((t)=>t.filter((t)=>t !== e.id)) : a && tt((t)=>[
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
                                                                    src: N[e.id],
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
                                                    children: (0, M.jsx)(ht, {
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
                (0, M.jsx)(Ot, {
                    cinematic: q,
                    isMobile: B,
                    muted: R,
                    zone: Q.currentZone ?? 1,
                    onDeathEnd: ()=>Y(!0),
                    onClose: ()=>{
                        q && nn.current.add(q), J(null);
                    }
                }),
                (0, M.jsx)(n, {
                    children: L && (0, M.jsxs)(i.div, {
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
                        onClick: ()=>Mt(null),
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
                            b[L.zone] && (0, M.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${b[L.zone]})`,
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
                                children: (0, M.jsx)(w, {
                                    name: `vortex`,
                                    size: B ? 72 : 96
                                })
                            }),
                            (0, M.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: B ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: L.lines.slice(0, Nt + 1).map((e, t)=>{
                                    let n = e === L.lines[L.lines.length - 1] && Nt >= L.lines.length - 1, r = e === `You have entered:`;
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
                                            fontSize: n ? B ? 28 : 40 : r ? 14 : B ? 17 : 20,
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
                    children: j && (()=>{
                        let e = j.rarity === `legendary` ? `#eedd44` : j.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = j.rarity.toUpperCase();
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
                            onClick: ()=>st(null),
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
                                                width: B ? 168 : 220,
                                                height: B ? 168 : 220,
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
                                                width: B ? 200 : 260,
                                                height: B ? 200 : 260,
                                                borderRadius: `50%`,
                                                border: `1px solid ${e}88`
                                            }
                                        }),
                                        (0, M.jsx)(`img`, {
                                            src: de(j.id),
                                            alt: ``,
                                            style: {
                                                position: `relative`,
                                                zIndex: 1,
                                                width: B ? 120 : 160,
                                                height: B ? 120 : 160,
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
                                        fontSize: B ? 30 : 40,
                                        color: e,
                                        letterSpacing: 2,
                                        textShadow: `0 0 30px ${e}66`,
                                        marginBottom: 14,
                                        textAlign: `center`,
                                        padding: `0 20px`
                                    },
                                    children: j.name
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
                                        fontSize: B ? 15 : 17,
                                        color: `rgba(255,255,255,0.75)`,
                                        maxWidth: 440,
                                        textAlign: `center`,
                                        lineHeight: 1.5,
                                        padding: `0 24px`,
                                        marginBottom: 32
                                    },
                                    children: j.desc
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
                    children: Q.event && !q && !Q.gameOver && !Q.showPort && Te[Q.event.cellType] && (0, M.jsx)(_t, {
                        variant: `scene`,
                        event: Q.event,
                        isMobile: B,
                        gold: Q.ship.gold,
                        hull: Q.ship.hull,
                        relics: Q.relics,
                        upgrades: Q.ship.upgrades,
                        score: Q.score,
                        onboard: O,
                        onDismissOnboard: Xt,
                        onChoose: En,
                        canEscape: !!xn,
                        onSkip: Dn
                    }, `event-scene`)
                }),
                (0, M.jsx)(n, {
                    children: Q.event && !q && !Q.gameOver && !Q.showPort && Q.event.cellType && !x[Q.event.cellType] && (0, M.jsx)(_t, {
                        variant: `compact`,
                        event: Q.event,
                        isMobile: B,
                        gold: Q.ship.gold,
                        hull: Q.ship.hull,
                        relics: Q.relics,
                        upgrades: Q.ship.upgrades,
                        cellIcon: xe[Q.event.cellType],
                        onboard: O,
                        onDismissOnboard: Xt,
                        onChoose: En,
                        canEscape: !!xn,
                        onSkip: Dn
                    }, `event-compact`)
                }),
                (0, M.jsx)(xt, {
                    open: !!Q.showPort && !Q.gameOver,
                    isMobile: B,
                    ship: Q.ship,
                    portUpgrades: Q.portUpgrades,
                    upgradeToken: !!Q.upgradeToken,
                    maxedComponents: Q.maxedComponents,
                    cart: A,
                    setCart: tt,
                    onboard: O,
                    onDismissOnboard: Xt,
                    onUpgradeComponent: On,
                    onReroll: ()=>{
                        G(40), E((e)=>ie(e));
                    },
                    freeReroll: Q.shipType === `merchant` && !!Q.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        G(n), E((n)=>re(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of A)G(50 + dt.indexOf(e));
                        G(70), E((e)=>{
                            let t = e;
                            for (let e of A)t = _(t, e);
                            return oe(t);
                        }), tt([]);
                    }
                }),
                (0, M.jsx)(Et, {
                    open: en,
                    state: Q,
                    isMobile: B,
                    isDailyRun: H,
                    personalBest: Ft,
                    isNewRecord: Lt,
                    newFeats: nt,
                    nearFeats: it,
                    submitStatus: P,
                    onRetrySubmit: ()=>{
                        $t();
                    },
                    nftMinted: Ct,
                    walletAddress: e,
                    account: t,
                    onChainDone: mt,
                    setOnChainDone: gt,
                    submitting: Ht,
                    setSubmitting: Ut,
                    connecting: ze,
                    onConnect: ()=>Re(),
                    showGuestDailyCta: !!(e && Be.current && !H && Ve && c),
                    onPlayDaily: c,
                    rangMois: rn,
                    harborDown: Kt,
                    restarting: Jt,
                    onRestart: kn,
                    onHome: o,
                    onWatchReplay: W.current.length > 0 ? ()=>{
                        Je({
                            seed: Q.seed,
                            shipId: S ?? `default`,
                            actions: [
                                ...W.current
                            ],
                            label: H ? `Daily Challenge` : Q.runTitle || `Corsair`,
                            finalScore: Q.score
                        });
                    } : void 0
                }),
                Ke && (0, M.jsx)(we, {
                    payload: Ke,
                    isMobile: B,
                    onClose: ()=>Je(null)
                }),
                Tt.length > 0 && (0, M.jsx)(Dt, {
                    queue: Tt,
                    isMobile: B,
                    onDismiss: ()=>I((e)=>e.slice(1))
                }),
                (0, M.jsx)(kt, {
                    open: dn,
                    isMobile: B,
                    muted: R,
                    onClose: ()=>{
                        $.current = !1, X(!1);
                    }
                }),
                B && (0, M.jsxs)(M.Fragment, {
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
                                    onClick: ()=>fn(Z === `ship` ? null : `ship`),
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
                                    children: (0, M.jsx)(w, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, M.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>fn(Z === `upgrades` ? null : `upgrades`),
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
                                    children: (0, M.jsx)(w, {
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
                                                let t = ft.find((t)=>t.id === e);
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
                                                    (0, M.jsx)(w, {
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
                                            ft.map((e)=>{
                                                let t = Q.ship.upgrades.includes(e.id), n = pt[e.build];
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
                                                                    src: N[e.id],
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
                                                            children: (0, M.jsx)(ht, {
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
                            onClick: ()=>fn(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { Mt as default, __tla };
