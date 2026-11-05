import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { a as o, f as s, h as c, i as l, l as u, m as d, p as f, s as p, t as m } from "./anchor-BAEzmeAu.js";
import { A as h, B as g, C as ee, D as te, E as ne, F as re, I as ie, L as ae, M as oe, N as se, P as ce, R as le, T as _, U as ue, V as de, X as v, Y as y, _ as fe, a as pe, c as me, d as b, f as x, h as he, i as ge, j as _e, k as ve, l as S, m as C, n as ye, o as w, p as be, r as xe, s as Se, t as Ce, u as we, w as T, z as Te } from "./ReplayScreen-CPCRKDdv.js";
import { A as Ee, b as De, c as Oe, j as ke, m as Ae, t as je, v as Me, y as Ne, __tla as __tla_0 } from "./supabase-L-29MAGv.js";
import { a as Pe, c as Fe, o as Ie, r as Le, s as Re } from "./nftCatalog-DgS71tPf.js";
import { l as E, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
import { t as D } from "./rpc-BQNg8r_c.js";
let Ct;
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
    var O = e(t(), 1), ze = `corsair_onboard_v2`;
    function Be() {
        try {
            return new Set(JSON.parse(localStorage.getItem(ze) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function Ve(e) {
        let t = Be();
        t.add(e);
        try {
            localStorage.setItem(ze, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function He(e) {
        let t = Be();
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
    var Ue = {
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
    }, k = {
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
    }, A = {}, We = !1;
    function Ge(e) {
        We = e;
    }
    function j(e) {
        if (!We) try {
            let t = A[e];
            t || (t = new Audio(`/sounds/${k[e]}.wav`), A[e] = t), t.volume = Ue[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    function Ke(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function qe(e, t) {
        let n = Ke(e);
        return n === 0 || t >= n;
    }
    function Je(e, t, n) {
        return t === `port` && e.label === `Dock` && (n ?? []).includes(`ghost`) ? `Ghost Ship cannot dock` : null;
    }
    function M(e, t, n, r, i) {
        let a = Je(e, t, i);
        if (a) return a + ` — sail on.`;
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function Ye(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    var Xe = `/assets/swift_sails-YMobDX4v.png`, Ze = `/assets/ghost_ship-4jaVs07k.png`, Qe = `/assets/treasure_hunter-C9jnAyZy.png`, $e = `/assets/storm_rider-BjRGnDwr.png`, et = `/assets/cursed_greed-BlVfcQDt.png`, N = `/assets/berserker-B9haxHEY.png`, P = r(), F = {
        escape: Xe,
        ghost: Ze,
        hunter: Qe,
        rider: $e,
        greed: et,
        berserker: N
    }, tt = [
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
    ], I = y.upgrades.costs, nt = Math.round(y.storm.hunterSurgeBonus * 100), rt = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: I.ghost,
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
            cost: I.rider,
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
            cost: I.greed,
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
            cost: I.berserker,
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
                `Storm surges +${nt}% more frequent.`
            ],
            cost: I.hunter,
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
            cost: I.escape,
            icon: `escape`,
            build: `escape`
        }
    ], it = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function at({ ok: e }) {
        return (0, P.jsx)(`span`, {
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
    function ot({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, P.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, P.jsx)(at, {
                        ok: t
                    }),
                    (0, P.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, P.jsxs)(`div`, {
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
    function st(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, P.jsx)(`img`, {
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
        }) : (0, P.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function ct({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, upgrades: s, score: c, cellIcon: l, onboard: u, onDismissOnboard: d, onChoose: f, canEscape: p, onSkip: m }) {
        let h = (0, P.jsx)(`div`, {
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
                let u = Ye(c.risk), d = Je(c, t.cellType, s), p = !d && qe(c.desc, r) && !d, m = M(c, t.cellType, o, a, s), h = e === `scene` ? 1.04 : 1.02, g = e === `scene` ? .96 : .98, ee = d ? `rgba(120,120,140,0.45)` : p ? `${u}55` : `rgba(255,255,255,0.1)`;
                return (0, P.jsxs)(i.button, {
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
                        me[c.icon] ? (0, P.jsxs)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`,
                                position: `relative`
                            },
                            children: [
                                (0, P.jsx)(`img`, {
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
                                d && (0, P.jsx)(`div`, {
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
                        }) : (0, P.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 26 : 22,
                                marginBottom: 4
                            },
                            children: c.icon
                        }),
                        (0, P.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: d ? `rgba(160,160,180,0.75)` : u,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: c.label
                        }),
                        (0, P.jsx)(`div`, {
                            style: {
                                fontSize: 20,
                                color: d ? `rgba(180,170,200,0.7)` : `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: m
                        }),
                        (0, P.jsx)(`div`, {
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
        }), g = p && m ? (0, P.jsxs)(i.button, {
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
                (0, P.jsx)(`img`, {
                    src: F.escape,
                    alt: ``,
                    style: {
                        width: 28,
                        height: 28,
                        objectFit: `contain`,
                        filter: `drop-shadow(0 0 6px rgba(100,200,240,0.7))`
                    }
                }),
                (0, P.jsxs)(`span`, {
                    style: {
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `flex-start`,
                        lineHeight: 1.15
                    },
                    children: [
                        (0, P.jsx)(`span`, {
                            children: `Swift Sails — Escape`
                        }),
                        (0, P.jsx)(`span`, {
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
        return e === `scene` ? (0, P.jsxs)(i.div, {
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
                S[t.cellType] && (0, P.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${S[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, P.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                c != null && (0, P.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, P.jsxs)(`div`, {
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
                (0, P.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        u && d && (0, P.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, P.jsx)(C, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            })
                        }),
                        (0, P.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: 16,
                                paddingLeft: 8
                            },
                            children: (0, P.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 28 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: we[t.cellType] ?? t.cellType
                            })
                        }),
                        h,
                        g && (0, P.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: g
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, P.jsx)(i.div, {
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
            children: (0, P.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, P.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: st(l, 55)
                    }),
                    (0, P.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, P.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            u && d && (0, P.jsx)(C, {
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
    var lt = `/assets/hull-CGmPGbU0.png`, ut = `/assets/vision-3Q65Za4i.png`, dt = `/assets/power-CBX9SU5d.png`;
    function ft({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, P.jsx)(n, {
            children: e && (0, P.jsxs)(i.div, {
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
                    (0, P.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, P.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, P.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, P.jsx)(`span`, {
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
                            u && d && (0, P.jsx)(C, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, P.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, P.jsx)(`div`, {
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
                                            return (0, P.jsxs)(`div`, {
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
                                                    (0, P.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, P.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, P.jsx)(`img`, {
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
                                                            (0, P.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, P.jsx)(`div`, {
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
                                                    (0, P.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: `rgba(255,255,255,0.6)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, P.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 11,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.2)`,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: t === 1 && s >= 2 ? `MAX 2 N3` : `→ N${t + 2} · ${n}g`
                                                    }),
                                                    a && (0, P.jsx)(`div`, {
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
                            (0, P.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8
                                },
                                children: [
                                    (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, P.jsx)(i.button, {
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
                            (0, P.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: rt.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = it[e.build];
                                    return (0, P.jsxs)(`div`, {
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
                                            (0, P.jsx)(`img`, {
                                                src: F[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`
                                                }
                                            }),
                                            (0, P.jsxs)(`div`, {
                                                children: [
                                                    (0, P.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                            fontFamily: `'Pirata One', cursive`
                                                        },
                                                        children: e.name
                                                    }),
                                                    (0, P.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, P.jsx)(ot, {
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
                            r.upgrades.length + c.length >= 2 && (0, P.jsx)(`div`, {
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
                        return (0, P.jsxs)(P.Fragment, {
                            children: [
                                e && (0, P.jsx)(`div`, {
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
                                t && (0, P.jsx)(`div`, {
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
                                (0, P.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 8,
                                        marginBottom: 16
                                    },
                                    children: n.map((n)=>{
                                        let a = r.gold >= n.cost && r.hull < r.maxHull && !e, o = e ? `Cursed Greed blocks repairs` : t ? `+${n.heal} hull (half)` : n.baseDesc;
                                        return (0, P.jsxs)(i.button, {
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
                                                (0, P.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: e ? `rgba(160,160,180,0.75)` : `#44cc88`,
                                                        fontFamily: `'Pirata One', cursive`
                                                    },
                                                    children: n.label
                                                }),
                                                (0, P.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: e ? `rgba(180,170,200,0.65)` : `rgba(255,255,255,0.5)`
                                                    },
                                                    children: o
                                                }),
                                                (0, P.jsx)(`div`, {
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
                    (0, P.jsxs)(i.button, {
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
                            (0, P.jsx)(T, {
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
    var pt = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new E({
        nodeUrl: D
    });
    async function L(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: pt,
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
    function mt(e) {
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
    function ht({ status: e, onRetry: t }) {
        if (e.kind === `idle`) return null;
        if (e.kind === `local`) return (0, P.jsx)(R, {
            tone: `muted`,
            children: `Local voyage — not ranked. Connect + server seed to climb the board.`
        });
        if (e.kind === `sending`) return (0, P.jsx)(R, {
            tone: `info`,
            pulse: !0,
            children: (0, P.jsxs)(`span`, {
                style: {
                    display: `inline-flex`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, P.jsx)(gt, {}),
                    ` Logging the voyage to the harbor…`
                ]
            })
        });
        if (e.kind === `ok`) return e.daily ? (0, P.jsx)(R, {
            tone: `daily`,
            children: (0, P.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4
                },
                children: [
                    (0, P.jsxs)(`div`, {
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
                            (0, P.jsx)(T, {
                                name: `sun`,
                                size: 18
                            }),
                            ` DAILY SCORE PUBLISHED`
                        ]
                    }),
                    (0, P.jsx)(`div`, {
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
        }) : (0, P.jsx)(R, {
            tone: `ok`,
            children: (0, P.jsx)(`span`, {
                style: {
                    fontFamily: `'Pirata One', cursive`,
                    fontSize: 15,
                    letterSpacing: 2
                },
                children: `✓ SCORE SAVED — ON THE LEADERBOARD`
            })
        });
        if (e.kind === `queued`) return (0, P.jsx)(R, {
            tone: `warn`,
            children: (0, P.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, P.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#eec070`
                        },
                        children: `Harbor lag — voyage queued`
                    }),
                    (0, P.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: e.step === `log` ? `Could not save the run log. Retry now, or it will send on your next visit.` : `Log saved, approval pending. Retry now, or it will finish on your next visit.`
                    }),
                    t && (0, P.jsx)(`button`, {
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
        return (0, P.jsx)(R, {
            tone: `bad`,
            children: (0, P.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, P.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#ee8899`
                        },
                        children: `Score not accepted`
                    }),
                    (0, P.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: n
                    }),
                    t && (0, P.jsx)(`button`, {
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
    function R({ children: e, tone: t, pulse: n }) {
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
        return (0, P.jsx)(i.div, {
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
    function gt() {
        return (0, P.jsx)(i.span, {
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
    function _t({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: s, isNewRecord: l, newFeats: u, nearFeats: f, submitStatus: p, onRetrySubmit: m, nftMinted: h, walletAddress: ee, account: ne, onChainDone: re, setOnChainDone: ie, submitting: ae, setSubmitting: oe, connecting: se, onConnect: ce, showGuestDailyCta: le, onPlayDaily: _, rangMois: ue, harborDown: de, restarting: v, onRestart: y, onHome: fe, onWatchReplay: pe }) {
        let [me, b] = (0, O.useState)(!1), x = o(), he = x <= 1, ge = !a && !ve() && !!_ && !!ee, S = le || ge, C = mt(t.log), ye = {
            padding: r ? `16px 36px` : `18px 48px`,
            borderRadius: 14,
            border: S ? `2px solid rgba(136,221,255,0.85)` : `2px solid rgba(200,160,48,0.85)`,
            background: S ? `linear-gradient(135deg, rgba(30,90,120,0.85) 0%, rgba(20,50,70,0.9) 100%)` : `linear-gradient(135deg, rgba(120,90,20,0.75) 0%, rgba(60,45,10,0.9) 100%)`,
            color: S ? `#a8e8ff` : `#f0d878`,
            cursor: v && !S ? `wait` : `pointer`,
            fontSize: r ? 22 : 26,
            fontWeight: 700,
            letterSpacing: 3,
            fontFamily: `'Pirata One', cursive`,
            boxShadow: S ? `0 0 28px rgba(80,180,220,0.35)` : `0 0 28px rgba(200,160,48,0.35)`,
            opacity: v && !S ? .7 : 1,
            width: r ? `min(92vw, 360px)` : void 0,
            textAlign: `center`
        }, w = {
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
        return (0, P.jsx)(n, {
            children: e && (0, P.jsxs)(i.div, {
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
                    (0, P.jsx)(i.div, {
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
                    (0, P.jsxs)(`div`, {
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
                            (0, P.jsx)(i.div, {
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
                                children: (0, P.jsx)(T, {
                                    name: `skull`,
                                    size: r ? 72 : 100
                                })
                            }),
                            (0, P.jsx)(i.div, {
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
                            (0, P.jsx)(i.div, {
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
                            (0, P.jsxs)(i.div, {
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
                                    (0, P.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 14,
                                            color: `#ee6655`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2
                                        },
                                        children: [
                                            `Sunk by `,
                                            C.name
                                        ]
                                    }),
                                    (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 13,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            lineHeight: 1.35
                                        },
                                        children: C.tip
                                    })
                                ]
                            }),
                            (0, P.jsxs)(i.div, {
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
                                    (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: `SCORE`
                                    }),
                                    (0, P.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 40 : 52,
                                            color: `#eedd44`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 700,
                                            lineHeight: 1.05
                                        },
                                        children: [
                                            t.score.toLocaleString(),
                                            (0, P.jsx)(`span`, {
                                                style: {
                                                    fontSize: r ? 16 : 20,
                                                    color: `rgba(238,221,68,0.55)`,
                                                    marginLeft: 6
                                                },
                                                children: `pts`
                                            })
                                        ]
                                    }),
                                    l && (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `#44ffaa`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 4
                                        },
                                        children: `NEW BEST`
                                    }),
                                    !l && s > t.score && (0, P.jsxs)(`div`, {
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
                            he && (0, P.jsx)(i.div, {
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
                            (0, P.jsxs)(i.div, {
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
                                    de && (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try again when you're online`
                                    }),
                                    S && _ ? (0, P.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: _,
                                        style: ye,
                                        children: `PLAY DAILY · 1 TRY`
                                    }) : (0, P.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: y,
                                        disabled: v,
                                        style: ye,
                                        children: v ? `PREPARING…` : `SAIL AGAIN`
                                    }),
                                    (0, P.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 10,
                                            flexWrap: `wrap`,
                                            justifyContent: `center`,
                                            alignItems: `center`
                                        },
                                        children: [
                                            S && (0, P.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: y,
                                                disabled: v,
                                                style: w,
                                                children: v ? `…` : `Sail free run`
                                            }),
                                            !S && ge && _ && (0, P.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: _,
                                                style: {
                                                    ...w,
                                                    borderColor: `rgba(136,221,255,0.4)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Daily · 1 try`
                                            }),
                                            !ee && (0, P.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ce,
                                                disabled: se,
                                                style: {
                                                    ...w,
                                                    borderColor: `rgba(200,160,48,0.4)`,
                                                    color: `#c8a030`
                                                },
                                                children: se ? `…` : `Connect wallet`
                                            }),
                                            pe && (0, P.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: pe,
                                                style: {
                                                    ...w,
                                                    borderColor: `rgba(136,221,255,0.35)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Watch replay`
                                            }),
                                            (0, P.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: fe,
                                                style: {
                                                    ...w,
                                                    border: `none`,
                                                    color: `rgba(255,255,255,0.28)`
                                                },
                                                children: `← Menu`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, P.jsx)(ht, {
                                status: p,
                                onRetry: m
                            }),
                            u.length > 0 && (0, P.jsx)(i.div, {
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
                                children: u.map((e)=>(0, P.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, P.jsx)(T, {
                                                name: e.icon,
                                                size: 22
                                            }),
                                            (0, P.jsxs)(`div`, {
                                                style: {
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, P.jsxs)(`div`, {
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
                                                    (0, P.jsxs)(`div`, {
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
                            h.length > 0 && (0, P.jsx)(i.div, {
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
                                    let e = Pe(h[0]), t = e ? Le[e.rarity] : `#eedd88`;
                                    return (0, P.jsxs)(P.Fragment, {
                                        children: [
                                            e && (0, P.jsx)(`img`, {
                                                src: Ie(e.image),
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
                                            (0, P.jsxs)(`div`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0,
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, P.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 10,
                                                            letterSpacing: 2,
                                                            color: t,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: `NFT CLAIMED · MINT PENDING`
                                                    }),
                                                    (0, P.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 14,
                                                            color: `#f0e6c8`,
                                                            fontFamily: `'Pirata One', cursive`,
                                                            overflow: `hidden`,
                                                            textOverflow: `ellipsis`,
                                                            whiteSpace: `nowrap`
                                                        },
                                                        children: h.map(Re).join(` · `)
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            }),
                            (0, P.jsx)(`button`, {
                                type: `button`,
                                onClick: ()=>b((e)=>!e),
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
                            (0, P.jsx)(n, {
                                children: me && (0, P.jsxs)(i.div, {
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
                                        (0, P.jsxs)(`div`, {
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
                                        (0, P.jsx)(`div`, {
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
                                                    val: x,
                                                    color: `#88ddff`
                                                }
                                            ].map((e)=>(0, P.jsxs)(`div`, {
                                                    style: {
                                                        textAlign: `center`
                                                    },
                                                    children: [
                                                        (0, P.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `rgba(255,255,255,0.3)`,
                                                                letterSpacing: 2,
                                                                fontFamily: `'Cinzel', serif`
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, P.jsx)(`div`, {
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
                                        t.scoreBreakdown && (0, P.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `10px 16px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(255,255,255,0.08)`,
                                                background: `rgba(0,0,0,0.3)`
                                            },
                                            children: [
                                                (0, P.jsx)(`div`, {
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
                                                ].filter((e)=>e.val > 0).map((e)=>(0, P.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            marginBottom: 2
                                                        },
                                                        children: [
                                                            (0, P.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: `rgba(255,255,255,0.4)`,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: e.label
                                                            }),
                                                            (0, P.jsx)(`span`, {
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
                                        f.length > 0 && (0, P.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `12px 14px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(136,221,255,0.3)`,
                                                background: `rgba(10,24,40,0.65)`
                                            },
                                            children: [
                                                (0, P.jsx)(`div`, {
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
                                                f.map((e)=>(0, P.jsxs)(`div`, {
                                                        style: {
                                                            marginTop: 6
                                                        },
                                                        children: [
                                                            (0, P.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    justifyContent: `space-between`,
                                                                    marginBottom: 3
                                                                },
                                                                children: [
                                                                    (0, P.jsx)(`div`, {
                                                                        style: {
                                                                            fontFamily: `'Pirata One', cursive`,
                                                                            fontSize: 14,
                                                                            color: `#c8e8ff`
                                                                        },
                                                                        children: e.feat.name
                                                                    }),
                                                                    (0, P.jsxs)(`div`, {
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
                                                            (0, P.jsx)(`div`, {
                                                                style: {
                                                                    height: 3,
                                                                    borderRadius: 2,
                                                                    background: `rgba(255,255,255,0.08)`,
                                                                    overflow: `hidden`,
                                                                    marginBottom: 3
                                                                },
                                                                children: (0, P.jsx)(`div`, {
                                                                    style: {
                                                                        height: `100%`,
                                                                        width: `${Math.round(e.ratio * 100)}%`,
                                                                        background: `linear-gradient(90deg,#2a6a8a,#88ddff)`
                                                                    }
                                                                })
                                                            }),
                                                            (0, P.jsx)(`div`, {
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
                                        (0, P.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.25)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginBottom: 12,
                                                textAlign: `center`
                                            },
                                            children: a ? _e() ? `Seed ${t.seed} · Daily ${te()}` : `Blind daily — seed at 00:00 UTC` : `Seed ${t.seed}`
                                        }),
                                        ne && !re && (0, P.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                alignItems: `center`,
                                                gap: 6,
                                                marginBottom: 12
                                            },
                                            children: [
                                                (0, P.jsx)(i.button, {
                                                    whileHover: {
                                                        scale: 1.04
                                                    },
                                                    disabled: ae,
                                                    onClick: async ()=>{
                                                        oe(!0);
                                                        try {
                                                            await L(ne, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
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
                                                    children: ae ? `ENGRAVING...` : (0, P.jsxs)(P.Fragment, {
                                                        children: [
                                                            (0, P.jsx)(T, {
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
                                                (0, P.jsx)(`div`, {
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
                                            return (0, P.jsx)(d, {
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
                                                    deathName: C.name,
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
    function vt({ queue: e, isMobile: t, onDismiss: r }) {
        let a = e[0] ?? null;
        if ((0, O.useEffect)(()=>{
            a && j(`nft`);
        }, [
            a
        ]), !a) return null;
        let o = Pe(a), s = o?.name ?? Re(a), c = o?.rarity ?? `Rare`, l = Le[c], u = Fe(a), d = o ? Ie(o.image) : null, f = e.length - 1;
        return (0, P.jsx)(n, {
            children: (0, P.jsxs)(i.div, {
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
                    (0, P.jsx)(`div`, {
                        "aria-hidden": !0,
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            opacity: .35,
                            background: `radial-gradient(circle at 50% 40%, ${l}22 0%, transparent 55%)`
                        }
                    }),
                    (0, P.jsx)(i.div, {
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
                    (0, P.jsxs)(i.div, {
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
                    (0, P.jsxs)(i.div, {
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
                            (0, P.jsx)(i.div, {
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
                            (0, P.jsx)(`div`, {
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
                                children: d ? (0, P.jsx)(`img`, {
                                    src: d,
                                    alt: s,
                                    style: {
                                        width: `100%`,
                                        height: `100%`,
                                        objectFit: `cover`,
                                        display: `block`
                                    }
                                }) : (0, P.jsx)(`div`, {
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
                    (0, P.jsx)(i.div, {
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
                    o?.condition && (0, P.jsx)(i.div, {
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
                    (0, P.jsx)(i.div, {
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
                    (0, P.jsx)(i.div, {
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
                    (0, P.jsxs)(i.div, {
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
                            (0, P.jsx)(i.button, {
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
                            (0, P.jsx)(`button`, {
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
    function yt({ cinematic: e, isMobile: t, muted: r, zone: a, onClose: o, onDeathEnd: s }) {
        if (!e || !(b[e] || S[e] || e === `death`)) return null;
        let c = !t && !!b[e], l = e === `death` ? x[a] ?? S.storm : S[e] ?? null, u = ()=>{
            e === `death` && s(), o();
        };
        return (0, P.jsx)(n, {
            children: (0, P.jsxs)(i.div, {
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
                    c ? (0, P.jsx)(i.video, {
                        src: b[e],
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
                    }, e) : l ? (0, P.jsx)(i.div, {
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
                    (0, P.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            background: e === `death` ? `linear-gradient(to bottom, rgba(40,5,5,0.35) 0%, rgba(5,8,15,0.55) 55%, rgba(5,8,15,0.88) 100%)` : `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`
                        }
                    }),
                    (0, P.jsxs)(`div`, {
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
                            (0, P.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 28 : 40,
                                    color: e === `death` ? `#ee6666` : `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                },
                                children: we[e] ?? ``
                            }),
                            (0, P.jsx)(`div`, {
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
    function bt({ open: e, isMobile: t, muted: r, onClose: a }) {
        return (0, P.jsx)(n, {
            children: e && (0, P.jsxs)(i.div, {
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
                    t ? (0, P.jsx)(i.div, {
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
                    }) : (0, P.jsx)(`video`, {
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
                    (0, P.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            background: t ? `radial-gradient(ellipse at center, rgba(80,0,100,0.35) 0%, rgba(0,0,0,0.65) 100%)` : `rgba(0,0,0,0.3)`
                        }
                    }),
                    (0, P.jsxs)(i.div, {
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
                            (0, P.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 26 : 32,
                                    color: `#cc44ee`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                },
                                children: `THE HUNTER STRIKES!`
                            }),
                            (0, P.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 14 : 16,
                                    color: `rgba(255,255,255,0.7)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    marginTop: 6
                                },
                                children: `Tentacles rake the hull`
                            }),
                            (0, P.jsx)(`div`, {
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
    var xt = `/icons/gold.png`, St = (e, t = 14)=>(0, P.jsx)(T, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    Ct = function({ walletAddress: e, account: t, username: r, onHome: o, onPlayDaily: c, dailySeed: d, isDaily: me, seedToken: _e, shipId: C, resumeState: Pe, resumeRunId: Fe, resumeActions: Ie }) {
        let { connect: Le, connecting: Re } = a(), [E, D] = (0, O.useState)(()=>Pe ?? h(d, C ?? `default`)), ze = (0, O.useRef)(!e), [Be, Ue] = (0, O.useState)(()=>!ve()), [k, A] = (0, O.useState)(null), [We, Ke] = (0, O.useState)(null), [qe, Je] = (0, O.useState)(!1), [M, Ye] = (0, O.useState)([]), [Xe, Ze] = (0, O.useState)([]), [Qe, $e] = (0, O.useState)([]), et = (0, O.useRef)(0), [N, I] = (0, O.useState)(null), nt = (0, O.useRef)((E.relics ?? []).length), [at, st] = (0, O.useState)(!1), [pt, L] = (0, O.useState)({
            kind: `idle`
        }), [mt, ht] = (0, O.useState)(!1), R = (0, O.useRef)(!1), [gt, Ct] = (0, O.useState)([]), [wt, Tt] = (0, O.useState)([]), [z, Et] = (0, O.useState)(null), [Dt, Ot] = (0, O.useState)(0), [kt, At] = (0, O.useState)(()=>l()), [jt, Mt] = (0, O.useState)(!1), [Nt, Pt] = (0, O.useState)(!1), [B, Ft] = (0, O.useState)(window.innerWidth < 768), V = (0, O.useRef)(me === !0), H = V.current, It = (0, O.useRef)(_e), [Lt, Rt] = (0, O.useState)(!1), [zt, Bt] = (0, O.useState)(!1);
        (0, O.useEffect)(()=>{
            if (E.gameOver) {
                A(null);
                return;
            }
            E.turn > 0 && Ve(`sail`), A(He(E));
        }, [
            E.turn,
            E.event,
            E.showPort,
            E.hunter?.active,
            E.stormDistance,
            E.gameOver
        ]);
        let Vt = ()=>{
            k && (Ve(k.id), A(null));
        };
        (0, O.useEffect)(()=>{
            H && (se(), e && te());
        }, []), (0, O.useEffect)(()=>{
            if (!e) {
                Ue(!ve());
                return;
            }
            Me(e, te()).then((e)=>{
                if (e) {
                    Ue(!1);
                    return;
                }
                ve() && ne(), Ue(!0);
            });
        }, [
            e
        ]);
        let U = (0, O.useRef)(Fe ?? crypto.randomUUID()), W = (0, O.useRef)(Ie ? [
            ...Ie
        ] : []), G = (e)=>{
            W.current.push(e);
        }, K = (0, O.useRef)([]);
        (0, O.useEffect)(()=>{
            let t = e;
            !t || E.gameOver || W.current.length !== 0 && f({
                run_id: U.current,
                wallet_address: t,
                seed: E.seed,
                ship_id: C ?? `default`,
                is_daily: V.current,
                seed_token: It.current ?? null,
                actions: W.current,
                turn: E.turn,
                score: E.score,
                saved_at: Date.now()
            });
        }, [
            E
        ]), (0, O.useEffect)(()=>{
            let e = W.current.length - 1;
            e < 0 || (K.current[e * 3] = E.score, K.current[e * 3 + 1] = E.ship.hull, K.current[e * 3 + 2] = E.rngState ?? -1);
        }, [
            E
        ]);
        let Ht = (0, O.useRef)(0);
        (0, O.useEffect)(()=>{
            e && (Fe || ke({
                run_id: U.current,
                wallet_address: e,
                username: r ?? null,
                seed: E.seed,
                is_daily: H,
                seed_token: _e ?? null
            }));
        }, []), (0, O.useEffect)(()=>{
            !e || E.gameOver || E.turn - Ht.current < 3 || (Ht.current = E.turn, Ne(U.current, {
                score: E.score,
                turn: E.turn,
                zone: E.currentZone ?? 1,
                gold: E.ship.gold,
                hull: E.ship.hull
            }));
        }, [
            E.turn
        ]);
        let Ut = ()=>({
                run_id: U.current,
                wallet_address: e,
                seed: E.seed,
                ship_id: C ?? `default`,
                is_daily: V.current,
                actions: W.current,
                checks: W.current.flatMap((e, t)=>[
                        K.current[t * 3] ?? -1,
                        K.current[t * 3 + 1] ?? -1,
                        K.current[t * 3 + 2] ?? -1
                    ]),
                final_score: E.score,
                final_turn: E.turn
            }), Wt = async ()=>{
            if (!e) return;
            if (!V.current && !It.current) {
                L({
                    kind: `local`
                });
                return;
            }
            let t = Ut();
            L({
                kind: `sending`
            });
            try {
                await Ee(t);
            } catch (e) {
                console.warn(`[runlog]`, e), s(`runlog`, t), L({
                    kind: `queued`,
                    step: `log`
                });
                return;
            }
            try {
                let t = await je(U.current);
                if (t?.approved) {
                    if (st(!0), L({
                        kind: `ok`,
                        daily: V.current
                    }), V.current && se(), t.nft?.minted?.length) {
                        let e = t.nft.minted.map((e)=>typeof e == `string` ? e : e.nft).filter(Boolean);
                        Ct(e), Tt(e);
                    }
                } else console.warn(`[approve] refuse :`, t?.raison ?? t), L({
                    kind: `rejected`,
                    raison: t?.raison ?? void 0
                }), V.current && Me(e, te()).then((e)=>{
                    e || ne();
                });
            } catch (e) {
                console.warn(`[approve]`, e), s(`approve`, {
                    run_id: U.current
                }), L({
                    kind: `queued`,
                    step: `approve`
                });
            }
        };
        (0, O.useEffect)(()=>{
            if (E.gameOver) {
                if (!e) {
                    L({
                        kind: `idle`
                    });
                    return;
                }
                if (!R.current) {
                    if (R.current = !0, Oe(U.current, {
                        score: E.score,
                        turn: E.turn,
                        zone: E.currentZone ?? 1,
                        gold: E.ship.gold,
                        hull: E.ship.hull,
                        run_title: E.runTitle
                    }), !V.current && !It.current) {
                        console.warn(`[approve] skip : seed local, run non soumise`), L({
                            kind: `local`
                        }), u();
                        return;
                    }
                    Wt(), u();
                }
            }
        }, [
            E.gameOver
        ]), (0, O.useEffect)(()=>{
            let e = (e)=>{
                let t = e.detail;
                !t?.run_id || t.run_id !== U.current || t.approved && (st(!0), L({
                    kind: `ok`,
                    daily: H
                }), H && se());
            };
            return window.addEventListener(`corsair-sync`, e), ()=>window.removeEventListener(`corsair-sync`, e);
        }, [
            H
        ]), (0, O.useEffect)(()=>{
            let e = ()=>Ft(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [q, J] = (0, O.useState)(null), [Gt, Kt] = (0, O.useState)(!1), qt = (0, O.useRef)(null), Jt = (0, O.useRef)(new Set), [Yt, Xt] = (0, O.useState)(null);
        (0, O.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !E.gameOver || !H || !e || !n || at && Ae().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && Xt({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            E.gameOver,
            at
        ]);
        let Zt = (0, O.useRef)({
            x: E.ship.x,
            y: E.ship.y
        }), [Qt, $t] = (0, O.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [en, tn] = (0, O.useState)({
            x: 0,
            y: 0
        });
        (0, O.useEffect)(()=>{
            let e = Zt.current, t = E.ship.x - e.x, n = E.ship.y - e.y;
            if (Zt.current = {
                x: E.ship.x,
                y: E.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = he(E.ship.vision, B), i = .8;
            $t({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), tn({
                x: t,
                y: n
            });
            let a = setTimeout(()=>tn({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>$t({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(o), clearTimeout(a);
            };
        }, [
            E.ship.x,
            E.ship.y,
            B,
            E.ship.vision
        ]);
        let [nn, Y] = (0, O.useState)(!1), [X, rn] = (0, O.useState)(null), [an, on] = (0, O.useState)(null), [sn, cn] = (0, O.useState)(0), ln = ()=>{
            Je(!0), setTimeout(()=>Je(!1), 400);
        }, un = (e)=>{
            on(e), setTimeout(()=>on(null), 150);
        }, Z = E, dn = Math.min(100, (1 - Z.stormDistance / 10) * 100), fn = Z.ship.hull <= 5 ? `#ee4444` : Z.ship.hull <= 10 ? `#ee8844` : `#44cc88`, pn = !Z.escapeUsed && Z.ship.upgrades.includes(`escape`) && Z.event && Z.event.choices[0].risk !== `safe`;
        (0, O.useEffect)(()=>{
            if (E.gameOver) return;
            let e = E.event?.cellType;
            e && (!b[e] && !S[e] || Jt.current.has(e) || J(e));
        }, [
            E.event?.cellType,
            E.gameOver
        ]), (0, O.useEffect)(()=>{
            if (!q || q === `death`) return;
            let e = B ? 2200 : {
                ancient_kraken: 6500
            }[q] ?? 5e3, t = setTimeout(()=>{
                Jt.current.add(q), J(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            q,
            B
        ]);
        let mn = (0, O.useRef)(1);
        (0, O.useEffect)(()=>{
            let e = E.currentZone ?? 1;
            if (e > mn.current) {
                let t = mn.current, n = v[e], r = v[t]?.transitionText ?? [];
                Et({
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
                }), Ot(0), mn.current = e;
            }
        }, [
            E.currentZone
        ]), (0, O.useEffect)(()=>{
            if (!z) return;
            if (Dt >= z.lines.length) {
                setTimeout(()=>Et(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Ot((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            z,
            Dt
        ]), (0, O.useEffect)(()=>{
            E.dangerStreak > et.current && (et.current = E.dangerStreak);
        }, [
            E.dangerStreak
        ]), (0, O.useEffect)(()=>{
            if (E.gameOver) {
                let e = ue(E);
                e.length > 0 && (Ze(e), j(`streak`));
                let t = p({
                    score: E.score,
                    turn: E.turn,
                    zone: E.currentZone ?? 1,
                    gold: E.ship.gold,
                    hunterAttacksSurvived: E.hunterAttacksSurvived ?? 0,
                    peakStreak: et.current,
                    hadStreak5: (E.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if ($e(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (At(t.pb), Mt(!0)), u(), B) Y(!1), J(`death`), qt.current = setTimeout(()=>{
                    Kt((e)=>e || !0), J(null);
                }, 2200);
                else {
                    let e = hn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Y(!1), J(`death`), qt.current = setTimeout(()=>{
                            Kt((e)=>e || !0), J(null);
                        }, 9e3);
                    }, e);
                }
            } else qt.current &&= (clearTimeout(qt.current), null), Kt(!1), J(null), Jt.current.clear(), et.current = 0, $e([]), Mt(!1);
        }, [
            E.gameOver
        ]);
        let hn = (0, O.useRef)(!1), gn = (0, O.useRef)(-99), _n = (0, O.useRef)(null);
        (0, O.useEffect)(()=>{
            E.log?.includes(`Tentacles rake the hull`) && (E.turn - gn.current < 3 || (gn.current = E.turn, _n.current && clearTimeout(_n.current), hn.current = !0, Y(!0), _n.current = setTimeout(()=>{
                hn.current = !1, Y(!1);
            }, B ? 2e3 : 7200)));
        }, [
            E.log,
            E.turn,
            B
        ]), (0, O.useEffect)(()=>{
            if (!nn) return;
            let e = ()=>{
                hn.current = !1, Y(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            nn
        ]), (0, O.useEffect)(()=>{
            if (E.log?.includes(`⚡ Storm surge`) && un(`rgba(100,150,255,0.35)`), E.log?.includes(`Storm Rider surfs`) && un(`rgba(50,200,160,0.32)`), E.event?.cellType === `ancient_kraken` ? un(`rgba(200,160,48,0.4)`) : E.event?.cellType === `kraken` && un(`rgba(150,0,255,0.3)`), E.hunter?.active) {
                let e = Se(E);
                cn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else cn(0);
        }, [
            E
        ]), (0, O.useEffect)(()=>{
            let e = (e)=>{
                if (E.gameOver || E.event || E.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && vn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && vn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && vn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            E.gameOver,
            E.event,
            E.showPort,
            E.turn
        ]);
        let vn = (e, t)=>{
            G(e === -1 ? 0 : e === 1 ? 2 : 1), D((n)=>ce(n, e, t));
        }, yn = (e)=>{
            G(10 + e), D((t)=>{
                let n = ae(t, e);
                return n.ship.hull < t.ship.hull && ln(), n;
            });
        }, bn = ()=>{
            G(20), D((e)=>le(e));
        }, xn = (e)=>{
            G(e === `hull` ? 30 : e === `weapon` ? 31 : 32), D((t)=>Te(t, e));
        }, Sn = async ()=>{
            if (e) {
                Bt(!0), Rt(!1);
                let t = await De(e);
                if (Bt(!1), !t) {
                    Rt(!0);
                    return;
                }
                V.current = !1, It.current = t.seed_token;
                let n = h(t.seed, C ?? `default`);
                W.current = [], K.current = [], Ht.current = 0, U.current = crypto.randomUUID(), R.current = !1, st(!1), L({
                    kind: `idle`
                }), ht(!1), Ct([]), Tt([]), ke({
                    run_id: U.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), D(n);
                return;
            }
            V.current = !1;
            let t = h(void 0, C ?? `default`);
            W.current = [], K.current = [], Ht.current = 0, U.current = crypto.randomUUID(), R.current = !1, st(!1), L({
                kind: `idle`
            }), ht(!1), Ct([]), Tt([]), D(t);
        }, Q = (0, O.useRef)(null), [$, Cn] = (0, O.useState)(!1);
        (0, O.useEffect)(()=>{
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
        }, []), (0, O.useEffect)(()=>{
            Q.current && (Q.current.muted = $), Ge($);
        }, [
            $
        ]);
        let wn = (0, O.useRef)({
            gold: E.ship.gold,
            hull: E.ship.hull,
            zone: E.currentZone ?? 1,
            over: E.gameOver,
            mult: E.scoreMultiplier ?? 1,
            hmode: E.hunter?.mode ?? ``,
            storm: E.stormDistance
        });
        return (0, O.useEffect)(()=>{
            let e = wn.current, t = !!E.log?.includes(`Tentacles rake`);
            if (E.gameOver && !e.over) j(`death`);
            else if (!E.gameOver) {
                E.ship.gold > e.gold && j(`gold`), E.ship.gold < e.gold && E.showPort && j(`buy`), t ? j(`hunter_attack`) : E.ship.hull < e.hull && j(`damage`), (E.currentZone ?? 1) !== e.zone && j(`zone`), (E.scoreMultiplier ?? 1) > e.mult && j(`streak`);
                let n = E.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && j(`hunter_near`), E.stormDistance < e.storm && E.stormDistance <= 4 && E.stormDistance > 0 && (j(`thunder`), ln());
            }
            wn.current = {
                gold: E.ship.gold,
                hull: E.ship.hull,
                zone: E.currentZone ?? 1,
                over: E.gameOver,
                mult: E.scoreMultiplier ?? 1,
                hmode: E.hunter?.mode ?? ``,
                storm: E.stormDistance
            };
            let n = (E.relics ?? []).length;
            if (n > nt.current) {
                let e = (E.relics ?? [])[n - 1], t = g(e);
                t && (I(t), j(`streak`));
            }
            nt.current = n;
        }, [
            E
        ]), (0, P.jsxs)(i.div, {
            animate: qe ? {
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
                (0, P.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, P.jsx)(i.div, {
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
                                backgroundImage: `url(${x[Z.currentZone ?? 1] ?? x[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, Z.currentZone ?? 1),
                        (0, P.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        }),
                        (0, P.jsx)(i.div, {
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
                an && (0, P.jsx)(i.div, {
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
                        background: an,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                sn > 0 && (0, P.jsx)(i.div, {
                    animate: {
                        opacity: [
                            sn,
                            sn * .6,
                            sn
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
                Z.ship.hull <= 5 && !Z.gameOver && (0, P.jsx)(i.div, {
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
                (0, P.jsxs)(`div`, {
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
                        (0, P.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: B ? 6 : 8
                            },
                            children: [
                                (0, P.jsx)(`img`, {
                                    src: m,
                                    style: {
                                        width: B ? 24 : 36,
                                        height: B ? 24 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !B && (0, P.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                (()=>{
                                    let e = fe.find((e)=>e.id === (Z.shipType ?? `default`)) ?? fe[0], t = v[Z.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, P.jsxs)(`div`, {
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
                                            (0, P.jsx)(`img`, {
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
                                            (0, P.jsxs)(`span`, {
                                                style: {
                                                    display: `flex`,
                                                    flexDirection: `column`,
                                                    lineHeight: 1.15,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    (0, P.jsx)(`span`, {
                                                        children: B ? e.name.replace(/^The /, ``) : e.name
                                                    }),
                                                    !B && (0, P.jsx)(`span`, {
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
                        (0, P.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: B ? 8 : 16,
                                alignItems: `flex-end`
                            },
                            children: (B ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${Z.ship.hull}/${Z.ship.maxHull}`,
                                    color: fn
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
                                    color: fn
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
                                    color: `rgba(255,255,255,0.45)`
                                }
                            ]).map((e)=>(0, P.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, P.jsx)(`div`, {
                                            style: {
                                                fontSize: B ? 9 : 10,
                                                color: `rgba(255,255,255,0.38)`,
                                                letterSpacing: 1.5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: e.label
                                        }),
                                        (0, P.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 3,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, P.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: xt,
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
                                                (0, P.jsx)(`span`, {
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
                        !B && (0, P.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 12
                            },
                            children: [
                                (0, P.jsxs)(`div`, {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 4
                                    },
                                    children: [
                                        (0, P.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 28,
                                                height: 28,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, P.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: Z.score
                                        }),
                                        (0, P.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(238,221,68,0.55)`,
                                                fontWeight: 500
                                            },
                                            children: `pts`
                                        })
                                    ]
                                }),
                                (0, P.jsx)(`button`, {
                                    onClick: ()=>Cn((e)=>!e),
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
                        B && (0, P.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 6
                            },
                            children: [
                                (0, P.jsxs)(`span`, {
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
                                (0, P.jsx)(`button`, {
                                    onClick: ()=>Cn((e)=>!e),
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
                B && (Z.relics ?? []).length > 0 && (0, P.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: (Z.relics ?? []).map((e)=>{
                        let t = g(e);
                        return t ? (0, P.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, P.jsx)(`img`, {
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
                B && Z.hunter?.active && (()=>{
                    let e = pe(Z), t = Se(Z), n = ge(Z);
                    return (0, P.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, P.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, P.jsx)(T, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, P.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: Z.hunter.mode === `frenzy` ? `#ff6666` : Z.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            St(Z.hunter.mode),
                                            w(Z.hunter.mode)
                                        ]
                                    }),
                                    (0, P.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: xe(e)
                                    }),
                                    (0, P.jsxs)(`div`, {
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
                            (0, P.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, P.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, P.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${Z.hunter.awareness}%`,
                                                background: Z.hunter.awareness >= y.hunter.frenzyAwareness ? `#ee4444` : Z.hunter.awareness >= y.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, P.jsxs)(`span`, {
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
                (0, P.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, P.jsxs)(`div`, {
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
                                (0, P.jsxs)(`div`, {
                                    style: {
                                        background: dn > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${dn > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, P.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: dn > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, P.jsx)(T, {
                                                    name: `storm`,
                                                    size: 13
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, P.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `baseline`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, P.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: dn > 70 ? `#ee4444` : `#ee8844`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        lineHeight: 1
                                                    },
                                                    children: Z.stormDistance
                                                }),
                                                (0, P.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.45)`,
                                                        fontFamily: `'IM Fell English', cursive`
                                                    },
                                                    children: `turns left`
                                                })
                                            ]
                                        }),
                                        (0, P.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 6
                                            },
                                            children: (0, P.jsx)(i.div, {
                                                animate: {
                                                    width: `${dn}%`
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
                                Z.hunter?.active && (()=>{
                                    let e = pe(Z), t = Se(Z), n = ge(Z), r = t === `critical` || t === `danger`;
                                    return (0, P.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${Z.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : Z.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 8,
                                            padding: `8px 9px`
                                        },
                                        children: [
                                            (0, P.jsxs)(`div`, {
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
                                                    (0, P.jsx)(T, {
                                                        name: `kraken`,
                                                        size: 13
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, P.jsxs)(`div`, {
                                                style: {
                                                    display: `inline-block`,
                                                    padding: `1px 7px`,
                                                    borderRadius: 5,
                                                    fontSize: 10,
                                                    letterSpacing: 1.5,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 4,
                                                    background: Z.hunter.mode === `frenzy` ? `rgba(220,30,30,0.3)` : Z.hunter.mode === `stalking` ? `rgba(180,30,180,0.3)` : Z.hunter.mode === `searching` ? `rgba(30,100,180,0.3)` : `rgba(255,255,255,0.06)`,
                                                    color: Z.hunter.mode === `frenzy` ? `#ff6666` : Z.hunter.mode === `stalking` ? `#dd88ff` : Z.hunter.mode === `searching` ? `#66aaff` : `rgba(255,255,255,0.55)`,
                                                    border: `1px solid ${Z.hunter.mode === `frenzy` ? `rgba(220,30,30,0.6)` : Z.hunter.mode === `stalking` ? `rgba(180,30,180,0.5)` : `rgba(255,255,255,0.1)`}`
                                                },
                                                children: [
                                                    St(Z.hunter.mode, 12),
                                                    w(Z.hunter.mode)
                                                ]
                                            }),
                                            (0, P.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: .5,
                                                    marginBottom: 2
                                                },
                                                children: [
                                                    xe(e),
                                                    ` · ≈−`,
                                                    n
                                                ]
                                            }),
                                            (0, P.jsx)(`div`, {
                                                style: {
                                                    height: 3,
                                                    background: `rgba(255,255,255,0.06)`,
                                                    borderRadius: 2,
                                                    marginTop: 4
                                                },
                                                children: (0, P.jsx)(i.div, {
                                                    animate: {
                                                        width: `${Z.hunter.awareness}%`
                                                    },
                                                    transition: {
                                                        duration: .5
                                                    },
                                                    style: {
                                                        height: 3,
                                                        borderRadius: 2,
                                                        background: Z.hunter.awareness >= y.hunter.frenzyAwareness ? `#ee4444` : Z.hunter.awareness >= y.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`
                                                    }
                                                })
                                            })
                                        ]
                                    });
                                })(),
                                (0, P.jsx)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.35)`,
                                        letterSpacing: 2,
                                        marginTop: 4,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: `EQUIPPED`
                                }),
                                Z.ship.upgrades.length === 0 ? (0, P.jsx)(`div`, {
                                    style: {
                                        fontSize: 12,
                                        color: `rgba(255,255,255,0.28)`,
                                        fontStyle: `italic`,
                                        fontFamily: `'IM Fell English', cursive`
                                    },
                                    children: `None yet`
                                }) : Z.ship.upgrades.map((e)=>{
                                    let t = rt.find((t)=>t.id === e), n = e === `escape` && !Z.escapeUsed, r = e === `escape` && Z.escapeUsed;
                                    return (0, P.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: r ? `rgba(255,255,255,0.28)` : it[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 5
                                        },
                                        children: [
                                            (0, P.jsx)(`img`, {
                                                src: F[e],
                                                style: {
                                                    width: 16,
                                                    height: 16,
                                                    objectFit: `contain`,
                                                    opacity: r ? .4 : 1
                                                }
                                            }),
                                            (0, P.jsx)(`span`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: t.name
                                            }),
                                            n && (0, P.jsx)(`span`, {
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
                                            r && (0, P.jsx)(`span`, {
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
                                Z.upgradeToken && (0, P.jsxs)(`div`, {
                                    style: {
                                        fontSize: 11,
                                        color: `#eedd44`,
                                        marginTop: 2,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 5
                                    },
                                    children: [
                                        (0, P.jsx)(T, {
                                            name: `star`,
                                            size: 12
                                        }),
                                        ` Free upgrade at port`
                                    ]
                                }),
                                (0, P.jsxs)(`div`, {
                                    style: {
                                        marginTop: 6
                                    },
                                    children: [
                                        (0, P.jsx)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: `rgba(255,255,255,0.28)`,
                                                letterSpacing: 2,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 6
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, P.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 6
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: lt,
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
                                                    img: dt,
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
                                                    img: ut,
                                                    color: `#6aaccc`,
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
                                                ], o = e.key === `hull` ? `${Z.ship.maxHull} HP` : e.key === `weapon` ? `P${Z.ship.power}` : `V${Z.ship.vision}`;
                                                return (0, P.jsxs)(i.div, {
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
                                                        (0, P.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 4
                                                            },
                                                            children: [
                                                                (0, P.jsx)(`img`, {
                                                                    src: e.img,
                                                                    alt: ``,
                                                                    style: {
                                                                        width: 16,
                                                                        height: 16,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, P.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        (0, P.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 11,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: .5
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, P.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 8,
                                                                                color: `rgba(255,255,255,0.28)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, P.jsxs)(`div`, {
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
                                                        (0, P.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, n)=>(0, P.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        n > 0 && (0, P.jsx)(`div`, {
                                                                            style: {
                                                                                width: 6,
                                                                                height: 1,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, P.jsx)(`div`, {
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
                                                                            children: (0, P.jsx)(`span`, {
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
                        (0, P.jsx)(ye, {
                            state: Z,
                            isMobile: B,
                            slide: Qt,
                            lurch: en,
                            onboard: k,
                            onDismissOnboard: Vt,
                            onMove: vn
                        }),
                        (0, P.jsxs)(`div`, {
                            style: {
                                width: B ? 0 : 200,
                                minWidth: B ? 0 : 200,
                                padding: B ? 0 : `12px 10px`,
                                display: B ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                borderLeft: `1px solid rgba(255,255,255,0.04)`,
                                pointerEvents: Z.showPort ? `none` : `auto`,
                                opacity: Z.showPort ? .35 : 1,
                                overflow: `hidden`,
                                background: `linear-gradient(270deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, P.jsxs)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.4)`,
                                        letterSpacing: 2,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        `UPGRADES`,
                                        !Z.showPort && (0, P.jsx)(`span`, {
                                            style: {
                                                color: `rgba(255,255,255,0.22)`,
                                                marginLeft: 6
                                            },
                                            children: `· at port`
                                        })
                                    ]
                                }),
                                (0, P.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 4,
                                        overflowY: `auto`
                                    },
                                    children: rt.map((e)=>{
                                        let t = Z.ship.upgrades.includes(e.id), n = M.includes(e.id), r = Z.upgradeToken && Z.showPort, i = r ? 0 : e.cost, a = !t && !n && Z.ship.gold >= i && Z.showPort, o = it[e.build], s = t || Z.showPort;
                                        return (0, P.jsxs)(`div`, {
                                            onClick: ()=>{
                                                Z.showPort && (n ? Ye((t)=>t.filter((t)=>t !== e.id)) : a && Ye((t)=>[
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
                                                (0, P.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        justifyContent: `space-between`,
                                                        alignItems: `center`,
                                                        gap: 4
                                                    },
                                                    children: [
                                                        (0, P.jsxs)(`span`, {
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
                                                                (0, P.jsx)(`img`, {
                                                                    src: F[e.id],
                                                                    style: {
                                                                        width: 18,
                                                                        height: 18,
                                                                        objectFit: `contain`,
                                                                        flexShrink: 0
                                                                    }
                                                                }),
                                                                (0, P.jsx)(`span`, {
                                                                    style: {
                                                                        overflow: `hidden`,
                                                                        textOverflow: `ellipsis`,
                                                                        whiteSpace: `nowrap`
                                                                    },
                                                                    children: e.name
                                                                })
                                                            ]
                                                        }),
                                                        t ? (0, P.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: o
                                                            },
                                                            children: `✓`
                                                        }) : n ? (0, P.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `#44cc88`
                                                            },
                                                            children: `✓`
                                                        }) : (0, P.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 11,
                                                                color: `#eedd44`,
                                                                flexShrink: 0
                                                            },
                                                            children: r && Z.showPort ? `FREE` : e.cost + `g`
                                                        })
                                                    ]
                                                }),
                                                s && (0, P.jsx)(`div`, {
                                                    style: {
                                                        marginTop: 3
                                                    },
                                                    children: (0, P.jsx)(ot, {
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
                (0, P.jsx)(yt, {
                    cinematic: q,
                    isMobile: B,
                    muted: $,
                    zone: Z.currentZone ?? 1,
                    onDeathEnd: ()=>Kt(!0),
                    onClose: ()=>{
                        q && Jt.current.add(q), J(null);
                    }
                }),
                (0, P.jsx)(n, {
                    children: z && (0, P.jsxs)(i.div, {
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
                        onClick: ()=>Et(null),
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
                            x[z.zone] && (0, P.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${x[z.zone]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    opacity: .28,
                                    filter: `saturate(0.7) brightness(0.55)`
                                }
                            }),
                            (0, P.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)`
                                }
                            }),
                            (0, P.jsx)(i.div, {
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
                                children: (0, P.jsx)(T, {
                                    name: `vortex`,
                                    size: B ? 72 : 96
                                })
                            }),
                            (0, P.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: B ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: z.lines.slice(0, Dt + 1).map((e, t)=>{
                                    let n = e === z.lines[z.lines.length - 1] && Dt >= z.lines.length - 1, r = e === `You have entered:`;
                                    return e ? (0, P.jsx)(i.div, {
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
                                    }, t) : (0, P.jsx)(`div`, {
                                        style: {
                                            height: 12
                                        }
                                    }, t);
                                })
                            }),
                            (0, P.jsx)(i.div, {
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
                (0, P.jsx)(n, {
                    children: N && (()=>{
                        let e = N.rarity === `legendary` ? `#eedd44` : N.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = N.rarity.toUpperCase();
                        return (0, P.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>I(null),
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
                                (0, P.jsx)(i.div, {
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
                                (0, P.jsxs)(i.div, {
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
                                        (0, P.jsx)(i.div, {
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
                                        (0, P.jsx)(i.div, {
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
                                        (0, P.jsx)(`img`, {
                                            src: de(N.id),
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
                                (0, P.jsxs)(i.div, {
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
                                (0, P.jsx)(i.div, {
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
                                    children: N.name
                                }),
                                (0, P.jsx)(i.div, {
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
                                    children: N.desc
                                }),
                                (0, P.jsx)(i.div, {
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
                (0, P.jsx)(n, {
                    children: Z.event && !q && !Z.gameOver && !Z.showPort && we[Z.event.cellType] && (0, P.jsx)(ct, {
                        variant: `scene`,
                        event: Z.event,
                        isMobile: B,
                        gold: Z.ship.gold,
                        hull: Z.ship.hull,
                        relics: Z.relics,
                        upgrades: Z.ship.upgrades,
                        score: Z.score,
                        onboard: k,
                        onDismissOnboard: Vt,
                        onChoose: yn,
                        canEscape: !!pn,
                        onSkip: bn
                    }, `event-scene`)
                }),
                (0, P.jsx)(n, {
                    children: Z.event && !q && !Z.gameOver && !Z.showPort && Z.event.cellType && !S[Z.event.cellType] && (0, P.jsx)(ct, {
                        variant: `compact`,
                        event: Z.event,
                        isMobile: B,
                        gold: Z.ship.gold,
                        hull: Z.ship.hull,
                        relics: Z.relics,
                        upgrades: Z.ship.upgrades,
                        cellIcon: be[Z.event.cellType],
                        onboard: k,
                        onDismissOnboard: Vt,
                        onChoose: yn,
                        canEscape: !!pn,
                        onSkip: bn
                    }, `event-compact`)
                }),
                (0, P.jsx)(ft, {
                    open: !!Z.showPort && !Z.gameOver,
                    isMobile: B,
                    ship: Z.ship,
                    portUpgrades: Z.portUpgrades,
                    upgradeToken: !!Z.upgradeToken,
                    maxedComponents: Z.maxedComponents,
                    cart: M,
                    setCart: Ye,
                    onboard: k,
                    onDismissOnboard: Vt,
                    onUpgradeComponent: xn,
                    onReroll: ()=>{
                        G(40), D((e)=>ie(e));
                    },
                    freeReroll: Z.shipType === `merchant` && !!Z.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        G(n), D((n)=>re(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of M)G(50 + tt.indexOf(e));
                        G(70), D((e)=>{
                            let t = e;
                            for (let e of M)t = _(t, e);
                            return oe(t);
                        }), Ye([]);
                    }
                }),
                (0, P.jsx)(_t, {
                    open: Gt,
                    state: Z,
                    isMobile: B,
                    isDailyRun: H,
                    personalBest: kt,
                    isNewRecord: jt,
                    newFeats: Xe,
                    nearFeats: Qe,
                    submitStatus: pt,
                    onRetrySubmit: ()=>{
                        Wt();
                    },
                    nftMinted: gt,
                    walletAddress: e,
                    account: t,
                    onChainDone: mt,
                    setOnChainDone: ht,
                    submitting: Nt,
                    setSubmitting: Pt,
                    connecting: Re,
                    onConnect: ()=>Le(),
                    showGuestDailyCta: !!(e && ze.current && !H && Be && c),
                    onPlayDaily: c,
                    rangMois: Yt,
                    harborDown: Lt,
                    restarting: zt,
                    onRestart: Sn,
                    onHome: o,
                    onWatchReplay: W.current.length > 0 ? ()=>{
                        Ke({
                            seed: Z.seed,
                            shipId: C ?? `default`,
                            actions: [
                                ...W.current
                            ],
                            label: H ? `Daily Challenge` : Z.runTitle || `Corsair`,
                            finalScore: Z.score
                        });
                    } : void 0
                }),
                We && (0, P.jsx)(Ce, {
                    payload: We,
                    isMobile: B,
                    onClose: ()=>Ke(null)
                }),
                wt.length > 0 && (0, P.jsx)(vt, {
                    queue: wt,
                    isMobile: B,
                    onDismiss: ()=>Tt((e)=>e.slice(1))
                }),
                (0, P.jsx)(bt, {
                    open: nn,
                    isMobile: B,
                    muted: $,
                    onClose: ()=>{
                        hn.current = !1, Y(!1);
                    }
                }),
                B && (0, P.jsxs)(P.Fragment, {
                    children: [
                        !Z.event && !Z.showPort && !Z.gameOver && (0, P.jsxs)(`div`, {
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
                                (0, P.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>rn(X === `ship` ? null : `ship`),
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
                                    children: (0, P.jsx)(T, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, P.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>rn(X === `upgrades` ? null : `upgrades`),
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
                                    children: (0, P.jsx)(T, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, P.jsx)(n, {
                            children: X && (0, P.jsxs)(i.div, {
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
                                    X === `ship` && (0, P.jsxs)(P.Fragment, {
                                        children: [
                                            (0, P.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, P.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            Z.ship.upgrades.length === 0 ? (0, P.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : Z.ship.upgrades.map((e)=>{
                                                let t = rt.find((t)=>t.id === e);
                                                return (0, P.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, P.jsx)(`img`, {
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
                                            Z.upgradeToken && (0, P.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, P.jsx)(T, {
                                                        name: `star`,
                                                        size: 12
                                                    }),
                                                    ` Free upgrade — claim it at a port`
                                                ]
                                            }),
                                            (0, P.jsx)(`div`, {
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
                                                let t = Z.ship.levels[e.key], n = e.key === `hull` ? `${Z.ship.maxHull} HP` : e.key === `weapon` ? `P${Z.ship.power}` : `V${Z.ship.vision}`;
                                                return (0, P.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, P.jsx)(`img`, {
                                                            src: e.img,
                                                            alt: ``,
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, P.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 50
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, P.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, P.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, P.jsx)(`span`, {
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
                                    X === `upgrades` && (0, P.jsxs)(P.Fragment, {
                                        children: [
                                            (0, P.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            rt.map((e)=>{
                                                let t = Z.ship.upgrades.includes(e.id), n = it[e.build];
                                                return (0, P.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, P.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, P.jsx)(`img`, {
                                                                    src: F[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, P.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, P.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, P.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, P.jsx)(ot, {
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
                        X && (0, P.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>rn(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { Ct as default, __tla };
