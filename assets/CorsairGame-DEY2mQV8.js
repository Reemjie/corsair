import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { a as o, f as s, i as c, l, p as u, s as d, t as f } from "./anchor-IBgyt6lu.js";
import { $ as p, A as m, B as h, D as g, E as _, F as v, G as ee, H as y, I as te, L as ne, M as re, N as ie, O as b, P as ae, Q as x, R as oe, T as S, U as se, V as ce, Z as le, a as ue, c as de, d as fe, et as C, f as w, g as pe, h as me, i as T, j as he, l as E, m as ge, n as _e, o as ve, p as ye, r as be, s as xe, t as Se, tt as Ce, u as D, v as we, w as Te, z as Ee } from "./ReplayScreen-DEEFaVQn.js";
import { E as De, T as Oe, _ as ke, c as Ae, g as je, p as Me, t as Ne, v as Pe, __tla as __tla_0 } from "./supabase-BGfJttxd.js";
import { a as O, c as Fe, o as Ie, r as Le, s as Re } from "./nftCatalog-3Mir_rrL.js";
import { l as ze, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
import { t as k } from "./rpc-BQNg8r_c.js";
let Wt;
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
    var A = e(t(), 1), j = `corsair_onboard_v2`;
    function Be() {
        try {
            return new Set(JSON.parse(localStorage.getItem(j) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function Ve(e) {
        let t = Be();
        t.add(e);
        try {
            localStorage.setItem(j, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function He(e) {
        let t = Be();
        return !t.has(`sail`) && e.turn === 0 && !e.event && !e.showPort && !e.gameOver ? {
            id: `sail`,
            title: `SET SAIL`,
            text: `Sail Ahead, Port, or Starboard. You cannot sail south — the storm climbs from behind.`
        } : !t.has(`danger`) && e.event && e.event.choices.some((e)=>e.risk === `risky` || e.risk === `bold`) ? {
            id: `danger`,
            title: `A CHOICE`,
            text: `Bold pays more. Safe keeps you alive. Read the risk line under each option.`
        } : !t.has(`storm`) && e.turn > 0 && e.stormDistance <= 6 && !e.gameOver ? {
            id: `storm`,
            title: `THE STORM`,
            text: `${e.stormDistance} turns left before it catches you. Island ritual or Kraken Pact buys time.`
        } : !t.has(`port`) && e.showPort ? {
            id: `port`,
            title: `PORT`,
            text: `Repair hull, upgrade ship, pick up to 2 specials. Press SET SAIL to buy your cart and leave.`
        } : !t.has(`hunter`) && e.hunter?.active && !e.gameOver ? {
            id: `hunter`,
            title: `THE HUNTER`,
            text: `Watch Hunter awareness. Ports and storms calm it — frenzy means it knows where you are.`
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
    }, We = {
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
    }, M = {}, Ge = (()=>{
        try {
            return localStorage.getItem(`corsair_muted`) === `1`;
        } catch  {
            return !1;
        }
    })();
    function Ke(e) {
        Ge = e;
    }
    function N(e) {
        if (!Ge) try {
            let t = M[e];
            t || (t = new Audio(`/sounds/${We[e]}.wav`), M[e] = t), t.volume = Ue[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var qe = `corsair_muted`, Je = `corsair_skip_cine`;
    function Ye(e) {
        try {
            return localStorage.getItem(e) === `1`;
        } catch  {
            return !1;
        }
    }
    function Xe(e, t) {
        try {
            localStorage.setItem(e, t ? `1` : `0`);
        } catch  {}
    }
    function Ze() {
        return Ye(qe);
    }
    function Qe(e) {
        Xe(qe, e);
    }
    function $e() {
        return Ye(Je);
    }
    function et(e) {
        Xe(Je, e);
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
    function ot(e) {
        return e === `safe` ? `SAFE · keeps you alive` : e === `risky` ? `RISKY · hull at stake` : `BOLD · big payoff`;
    }
    var st = `/assets/swift_sails-YMobDX4v.png`, P = `/assets/ghost_ship-4jaVs07k.png`, ct = `/assets/treasure_hunter-C9jnAyZy.png`, lt = `/assets/storm_rider-BjRGnDwr.png`, ut = `/assets/cursed_greed-BlVfcQDt.png`, dt = `/assets/berserker-B9haxHEY.png`, F = r(), ft = {
        escape: st,
        ghost: P,
        hunter: ct,
        rider: lt,
        greed: ut,
        berserker: dt
    }, pt = [
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
    ], I = C.upgrades.costs, L = Math.round(C.storm.hunterSurgeBonus * 100), mt = [
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
                `Gold x${C.greed.goldMultiplier} on combat.`
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
                `Storm surges +${L}% more frequent.`
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
    ], ht = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function gt({ ok: e }) {
        return (0, F.jsx)(`span`, {
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
    function _t({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, F.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, F.jsx)(gt, {
                        ok: t
                    }),
                    (0, F.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, F.jsxs)(`div`, {
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
    function vt(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, F.jsx)(`img`, {
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
        }) : (0, F.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function yt({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, upgrades: s, score: c, cellIcon: l, onboard: u, onDismissOnboard: d, onChoose: f, canEscape: p, onSkip: m, interactive: h = !0 }) {
        let g = (0, F.jsx)(`div`, {
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
                let u = at(c.risk), d = rt(c, t.cellType, s), p = !d && nt(c.desc, r) && !d, m = it(c, t.cellType, o, a, s), h = e === `scene` ? 1.04 : 1.02, g = e === `scene` ? .96 : .98, _ = d ? `rgba(120,120,140,0.45)` : p ? `${u}55` : `rgba(255,255,255,0.1)`;
                return (0, F.jsxs)(i.button, {
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
                        padding: e === `scene` ? n ? `8px 12px` : `24px 28px` : `20px 24px`,
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
                        E[c.icon] ? (0, F.jsxs)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? n ? 8 : 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`,
                                position: `relative`
                            },
                            children: [
                                (0, F.jsx)(`img`, {
                                    src: E[c.icon],
                                    alt: ``,
                                    style: {
                                        width: e === `scene` ? n ? 40 : 72 : 40,
                                        height: e === `scene` ? n ? 40 : 72 : 40,
                                        objectFit: `contain`,
                                        opacity: d ? .45 : 1,
                                        filter: d ? `grayscale(1)` : void 0
                                    }
                                }),
                                d && (0, F.jsx)(`div`, {
                                    style: {
                                        position: `absolute`,
                                        inset: 0,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`,
                                        fontSize: e === `scene` ? n ? 22 : 28 : 20,
                                        color: `rgba(200,180,220,0.85)`,
                                        fontWeight: 700,
                                        textShadow: `0 1px 4px rgba(0,0,0,0.9)`,
                                        pointerEvents: `none`
                                    },
                                    children: `✕`
                                })
                            ]
                        }) : (0, F.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 22 : 26 : 22,
                                marginBottom: 4
                            },
                            children: c.icon
                        }),
                        (0, F.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 20 : 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: d ? `rgba(160,160,180,0.75)` : u,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: c.label
                        }),
                        (0, F.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` && n ? 16 : 20,
                                color: d ? `rgba(180,170,200,0.7)` : `rgba(255,255,255,0.8)`,
                                fontFamily: `'IM Fell English', cursive`,
                                marginTop: e === `scene` ? n ? 4 : 8 : 2,
                                textAlign: e === `scene` ? `center` : `left`,
                                lineHeight: 1.35
                            },
                            children: m
                        }),
                        !p && !d && (0, F.jsx)(`div`, {
                            style: {
                                marginTop: 6,
                                fontSize: n ? 11 : 12,
                                letterSpacing: 1.2,
                                fontFamily: `'Cinzel', serif`,
                                color: `rgba(255,180,100,0.85)`,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: `CAN'T AFFORD`
                        }),
                        (0, F.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 12 : 13 : 15,
                                color: d ? `rgba(180,160,200,0.85)` : u,
                                marginTop: e === `scene` ? n ? 6 : 10 : 4,
                                letterSpacing: e === `scene` ? 1.5 : 1,
                                textAlign: e === `scene` ? `center` : `left`,
                                fontFamily: `'Cinzel', serif`
                            },
                            children: d ? d.toLowerCase().includes(`dock`) ? `CAN'T DOCK` : `UNAVAILABLE` : ot(c.risk)
                        })
                    ]
                }, l);
            })
        }), _ = p && m ? (0, F.jsxs)(i.button, {
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
                (0, F.jsx)(`img`, {
                    src: ft.escape,
                    alt: ``,
                    style: {
                        width: 28,
                        height: 28,
                        objectFit: `contain`,
                        filter: `drop-shadow(0 0 6px rgba(100,200,240,0.7))`
                    }
                }),
                (0, F.jsxs)(`span`, {
                    style: {
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `flex-start`,
                        lineHeight: 1.15
                    },
                    children: [
                        (0, F.jsx)(`span`, {
                            children: `Swift Sails — Escape`
                        }),
                        (0, F.jsx)(`span`, {
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
        return e === `scene` ? (0, F.jsxs)(i.div, {
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
                duration: .2,
                ease: `easeOut`
            },
            style: {
                position: `fixed`,
                inset: 0,
                zIndex: 100,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `flex-end`,
                padding: n ? `calc(12px + env(safe-area-inset-top)) 12px calc(20px + env(safe-area-inset-bottom))` : `24px`,
                paddingBottom: n ? void 0 : 64,
                overflowY: `auto`,
                pointerEvents: h ? `auto` : `none`
            },
            children: [
                D[t.cellType] && (0, F.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${D[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, F.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                (0, F.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: n ? `calc(10px + env(safe-area-inset-top))` : 18,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        display: `flex`,
                        justifyContent: `center`,
                        pointerEvents: `none`,
                        padding: `0 12px`
                    },
                    children: (0, F.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            gap: n ? 14 : 18,
                            alignItems: `center`,
                            padding: n ? `8px 16px` : `8px 20px`,
                            borderRadius: 999,
                            background: `rgba(4,8,14,0.82)`,
                            border: `1px solid rgba(255,255,255,0.16)`,
                            boxShadow: `0 6px 24px rgba(0,0,0,0.45)`,
                            fontFamily: `'Cinzel', serif`,
                            fontSize: n ? 14 : 15,
                            fontWeight: 700,
                            backdropFilter: `blur(8px)`
                        },
                        children: [
                            (0, F.jsxs)(`span`, {
                                style: {
                                    color: `#88eebb`
                                },
                                children: [
                                    a,
                                    (0, F.jsx)(`span`, {
                                        style: {
                                            color: `rgba(255,255,255,0.35)`,
                                            fontWeight: 500,
                                            fontSize: n ? 11 : 12
                                        },
                                        children: ` hp`
                                    })
                                ]
                            }),
                            (0, F.jsx)(`span`, {
                                style: {
                                    width: 1,
                                    height: 14,
                                    background: `rgba(255,255,255,0.18)`
                                }
                            }),
                            (0, F.jsxs)(`span`, {
                                style: {
                                    color: `#eedd44`
                                },
                                children: [
                                    r,
                                    (0, F.jsx)(`span`, {
                                        style: {
                                            color: `rgba(255,255,255,0.35)`,
                                            fontWeight: 500,
                                            fontSize: n ? 11 : 12
                                        },
                                        children: `g`
                                    })
                                ]
                            }),
                            c != null && (0, F.jsxs)(F.Fragment, {
                                children: [
                                    (0, F.jsx)(`span`, {
                                        style: {
                                            width: 1,
                                            height: 14,
                                            background: `rgba(255,255,255,0.18)`
                                        }
                                    }),
                                    (0, F.jsxs)(`span`, {
                                        style: {
                                            color: `#f0d878`
                                        },
                                        children: [
                                            c,
                                            (0, F.jsx)(`span`, {
                                                style: {
                                                    color: `rgba(240,216,120,0.5)`,
                                                    fontWeight: 500,
                                                    fontSize: n ? 11 : 12
                                                },
                                                children: ` pts`
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }),
                (0, F.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        u && d && (0, F.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, F.jsx)(me, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            })
                        }),
                        (0, F.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: n ? 10 : 16,
                                paddingLeft: 8,
                                marginTop: n ? 52 : 8
                            },
                            children: (0, F.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 26 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: fe[t.cellType] ?? t.cellType
                            })
                        }),
                        g,
                        _ && (0, F.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: _
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, F.jsx)(i.div, {
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
                flexShrink: 0,
                pointerEvents: h ? `auto` : `none`
            },
            children: (0, F.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, F.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: vt(l, 55)
                    }),
                    (0, F.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, F.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            u && d && (0, F.jsx)(me, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            }),
                            g,
                            _
                        ]
                    })
                ]
            })
        }, `event-compact`);
    }
    var bt = {
        pirate: {
            accent: `#ee8844`,
            accentSoft: `rgba(238,136,68,0.75)`,
            glow: `rgba(200,40,40,0.32)`,
            border: `rgba(238,160,80,0.7)`,
            victoryBorder: `rgba(240,216,120,0.85)`,
            overlay: `linear-gradient(180deg, rgba(28,10,6,0.5) 0%, rgba(24,6,8,0.84) 45%, rgba(4,2,6,0.96) 100%)`,
            victoryOverlay: `linear-gradient(180deg, rgba(40,28,6,0.55) 0%, rgba(20,12,4,0.88) 50%, rgba(4,2,6,0.96) 100%)`,
            telegraph: `THEY WILL`
        },
        kraken: {
            accent: `#5ec4e8`,
            accentSoft: `rgba(94,196,232,0.75)`,
            glow: `rgba(20,80,140,0.45)`,
            border: `rgba(70,170,210,0.75)`,
            victoryBorder: `rgba(120,220,240,0.8)`,
            overlay: `linear-gradient(180deg, rgba(4,18,36,0.55) 0%, rgba(6,24,48,0.86) 45%, rgba(2,6,14,0.96) 100%)`,
            victoryOverlay: `linear-gradient(180deg, rgba(8,40,56,0.55) 0%, rgba(4,20,36,0.88) 50%, rgba(2,6,14,0.96) 100%)`,
            telegraph: `IT WILL`
        },
        ancient_kraken: {
            accent: `#c9a0ff`,
            accentSoft: `rgba(201,160,255,0.8)`,
            glow: `rgba(120,40,180,0.4)`,
            border: `rgba(180,120,255,0.75)`,
            victoryBorder: `rgba(240,216,120,0.9)`,
            overlay: `linear-gradient(180deg, rgba(24,8,40,0.55) 0%, rgba(18,6,32,0.86) 45%, rgba(6,2,12,0.97) 100%)`,
            victoryOverlay: `linear-gradient(180deg, rgba(48,28,8,0.55) 0%, rgba(28,12,32,0.88) 50%, rgba(6,2,12,0.97) 100%)`,
            telegraph: `THE ELDER WILL`
        },
        hunter: {
            accent: `#dd66ff`,
            accentSoft: `rgba(221,102,255,0.8)`,
            glow: `rgba(160,20,180,0.45)`,
            border: `rgba(200,80,255,0.75)`,
            victoryBorder: `rgba(240,160,255,0.85)`,
            overlay: `linear-gradient(180deg, rgba(32,4,40,0.55) 0%, rgba(24,4,28,0.86) 45%, rgba(6,2,10,0.97) 100%)`,
            victoryOverlay: `linear-gradient(180deg, rgba(40,12,40,0.55) 0%, rgba(20,6,24,0.88) 50%, rgba(6,2,10,0.97) 100%)`,
            telegraph: `IT WILL`
        }
    }, xt = {
        pirate: {
            volley: {
                title: `VOLLEY`,
                tip: `Cannons loaded — close in before they fire.`,
                best: `Board`,
                color: `#ff8866`,
                icon: `fight`
            },
            grapple: {
                title: `GRAPPLE`,
                tip: `Hooks coming — hit them from range.`,
                best: `Strike`,
                color: `#ee6688`,
                icon: `lurks`
            },
            plunder: {
                title: `PLUNDER`,
                tip: `They want your gold — fleeing costs more.`,
                best: `Fight`,
                color: `#eecc66`,
                icon: `take`
            }
        },
        kraken: {
            volley: {
                title: `SMASH`,
                tip: `Tentacles rise — cut in before the crush.`,
                best: `Lash`,
                color: `#88d8ff`,
                icon: `push`
            },
            grapple: {
                title: `DRAG`,
                tip: `It coils to pull you under — strike free.`,
                best: `Strike`,
                color: `#66aaff`,
                icon: `lurks`
            },
            plunder: {
                title: `FEED`,
                tip: `It smells gold — fleeing costs more hull.`,
                best: `Fight`,
                color: `#66e0cc`,
                icon: `take`
            }
        },
        ancient_kraken: {
            volley: {
                title: `JUDGMENT`,
                tip: `The deep winds up — lash before it lands.`,
                best: `Lash`,
                color: `#c9a0ff`,
                icon: `vortex`
            },
            grapple: {
                title: `ABYSS`,
                tip: `Elder grip forming — break it at range.`,
                best: `Strike`,
                color: `#ee88ff`,
                icon: `lurks`
            },
            plunder: {
                title: `TRIBUTE`,
                tip: `It demands gold — fleeing is expensive.`,
                best: `Fight`,
                color: `#f0d878`,
                icon: `tribute`
            }
        },
        hunter: {
            volley: {
                title: `SLAM`,
                tip: `It rears to crush the deck — rake in close.`,
                best: `Lash`,
                color: `#ff88cc`,
                icon: `push`
            },
            grapple: {
                title: `LATCH`,
                tip: `It lunges to latch — drive it off at range.`,
                best: `Strike`,
                color: `#dd66ff`,
                icon: `lurks`
            },
            plunder: {
                title: `SCENT`,
                tip: `It sniffs your gold — flee costs hull.`,
                best: `Fight`,
                color: `#eecc66`,
                icon: `take`
            }
        }
    }, St = {
        pirate: [
            {
                id: 0,
                label: `Strike`,
                tag: `SAFE HIT`,
                beats: `Beats Grapple`,
                weak: `Punished by Volley`,
                dmg: 2,
                risk: 1,
                color: `#ee8844`,
                icon: `fight`
            },
            {
                id: 1,
                label: `Board`,
                tag: `BIG HIT`,
                beats: `Beats Volley`,
                weak: `Punished by Grapple`,
                dmg: 3,
                risk: 3,
                color: `#ee4455`,
                icon: `lurks`
            },
            {
                id: 2,
                label: `Flee`,
                tag: `ESCAPE`,
                beats: `Leave the fight`,
                weak: `Costlier under Plunder`,
                dmg: 0,
                risk: 1,
                color: `#66aadd`,
                icon: `sail`
            }
        ],
        kraken: [
            {
                id: 0,
                label: `Strike`,
                tag: `SAFE HIT`,
                beats: `Beats Drag`,
                weak: `Punished by Smash`,
                dmg: 2,
                risk: 1,
                color: `#5ec4e8`,
                icon: `fight`
            },
            {
                id: 1,
                label: `Lash`,
                tag: `BIG HIT`,
                beats: `Beats Smash`,
                weak: `Punished by Drag`,
                dmg: 3,
                risk: 3,
                color: `#4488ee`,
                icon: `lurks`
            },
            {
                id: 2,
                label: `Flee`,
                tag: `ESCAPE`,
                beats: `Leave — costs hull`,
                weak: `Worse under Feed`,
                dmg: 0,
                risk: 2,
                color: `#66aadd`,
                icon: `sail`
            }
        ],
        ancient_kraken: [
            {
                id: 0,
                label: `Strike`,
                tag: `SAFE HIT`,
                beats: `Beats Abyss`,
                weak: `Punished by Judgment`,
                dmg: 2,
                risk: 1,
                color: `#c9a0ff`,
                icon: `fight`
            },
            {
                id: 1,
                label: `Lash`,
                tag: `BIG HIT`,
                beats: `Beats Judgment`,
                weak: `Punished by Abyss`,
                dmg: 3,
                risk: 3,
                color: `#ee88ff`,
                icon: `lurks`
            },
            {
                id: 2,
                label: `Flee`,
                tag: `ESCAPE`,
                beats: `Pay tribute & leave`,
                weak: `Worse under Tribute`,
                dmg: 0,
                risk: 1,
                color: `#66aadd`,
                icon: `sail`
            }
        ],
        hunter: [
            {
                id: 0,
                label: `Strike`,
                tag: `SAFE HIT`,
                beats: `Beats Latch`,
                weak: `Punished by Slam`,
                dmg: 2,
                risk: 1,
                color: `#dd66ff`,
                icon: `fight`
            },
            {
                id: 1,
                label: `Lash`,
                tag: `BIG HIT`,
                beats: `Beats Slam`,
                weak: `Punished by Latch`,
                dmg: 3,
                risk: 3,
                color: `#ee4488`,
                icon: `lurks`
            },
            {
                id: 2,
                label: `Flee`,
                tag: `ESCAPE`,
                beats: `Leave — costs hull`,
                weak: `Worse under Scent`,
                dmg: 0,
                risk: 2,
                color: `#66aadd`,
                icon: `sail`
            }
        ]
    }, Ct = {
        pirate: `BOARDING DUEL`,
        kraken: `KRAKEN DUEL`,
        ancient_kraken: `ANCIENT DUEL`,
        hunter: `HUNTER DUEL`
    }, wt = {
        pirate: `Pirates`,
        kraken: `Kraken`,
        ancient_kraken: `Ancient`,
        hunter: `Hunter`
    };
    function R({ label: e, filled: t, max: n = 3, color: r }) {
        return (0, F.jsxs)(`div`, {
            style: {
                display: `flex`,
                alignItems: `center`,
                gap: 4,
                marginTop: 5
            },
            children: [
                (0, F.jsx)(`span`, {
                    style: {
                        fontFamily: `'Cinzel', serif`,
                        fontSize: 9,
                        letterSpacing: 1.2,
                        color: `rgba(255,255,255,0.4)`,
                        width: 28,
                        flexShrink: 0
                    },
                    children: e
                }),
                Array.from({
                    length: n
                }, (e, n)=>(0, F.jsx)(`div`, {
                        style: {
                            width: 9,
                            height: 7,
                            borderRadius: 2,
                            background: n < t ? r : `rgba(255,255,255,0.1)`,
                            boxShadow: n < t ? `0 0 5px ${r}77` : `none`
                        }
                    }, n))
            ]
        });
    }
    function Tt({ power: e, accent: t }) {
        let n = Math.max(1, Math.min(5, e));
        return (0, F.jsx)(`div`, {
            style: {
                display: `inline-flex`,
                alignItems: `center`,
                gap: 3
            },
            title: `Threat ${e}`,
            children: Array.from({
                length: 5
            }, (e, r)=>(0, F.jsx)(`div`, {
                    style: {
                        width: 7,
                        height: 7,
                        borderRadius: `50%`,
                        background: r < n ? t : `rgba(255,255,255,0.12)`,
                        boxShadow: r < n ? `0 0 5px ${t}88` : `none`
                    }
                }, r))
        });
    }
    function Et({ duel: e, ship: t, isMobile: r, log: a, notoriety: o = 0, onAction: s }) {
        let c = e.kind ?? `pirate`, l = bt[c], u = e.enemyMaxHull > 0 ? Math.max(0, e.enemyHull / e.enemyMaxHull) : 0, d = t.maxHull > 0 ? Math.max(0, t.hull / t.maxHull) : 0, f = xt[c][e.intent], p = St[c], m = D[c] ?? D.pirate, h = w[c], g = e.phase === `choose`, _ = e.phase === `player_result` || e.phase === `enemy_result` || e.phase === `victory` || e.phase === `fled`, v = e.phase === `victory`, ee = e.enemyPower >= 4, y = !!e.enraged, te = u > 0 && u <= .25, ne = d > 0 && d <= .3, re = le(c, e.intent, o, t.gold), ie = e.phase === `player_result` && e.lastCounter ? {
            x: [
                0,
                -3,
                3,
                -2,
                2,
                0
            ],
            y: [
                0,
                -2,
                1,
                0
            ]
        } : e.phase === `player_result` && e.lastPunished ? {
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
        } : e.phase === `enemy_result` ? {
            x: [
                0,
                -6,
                6,
                -4,
                4,
                0
            ]
        } : {
            x: 0,
            y: 0
        }, b = (0, A.useRef)(s);
        b.current = s;
        let ae = (0, A.useRef)(null);
        (0, A.useEffect)(()=>{
            let e = (e)=>{
                if (e.metaKey || e.ctrlKey || e.altKey) return;
                let t = e.target?.tagName;
                t === `INPUT` || t === `TEXTAREA` || (g ? e.key === `1` ? (e.preventDefault(), b.current(0)) : e.key === `2` ? (e.preventDefault(), b.current(1)) : e.key === `3` && (e.preventDefault(), b.current(2)) : _ && (e.key === ` ` || e.key === `Enter`) && (e.preventDefault(), b.current(3)));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            g,
            _
        ]), (0, A.useEffect)(()=>{
            let e = ae.current;
            e && (_ || v ? e.play().catch(()=>{}) : e.pause());
        }, [
            _,
            v,
            g,
            e.round,
            e.phase
        ]);
        let x = c === `pirate` ? `Loot claimed. The ${e.enemyName.toLowerCase()} scatter into the fog.` : c === `hunter` ? `${e.enemyName} is driven into the fog — for now.` : `${e.enemyName} sinks beneath the black water.`, oe = v ? l.victoryBorder : y ? `rgba(255,80,120,0.9)` : ee ? `rgba(255,140,80,0.85)` : l.border, S = v ? `THE SEA YIELDS` : e.phase === `fled` ? `RETREAT` : e.phase === `player_result` ? `ROUND ${e.round} · STEP 1 OF 2` : e.phase === `enemy_result` ? `ROUND ${e.round} · STEP 2 OF 2` : `${Ct[c]} · ROUND ${e.round}`, se = e.phase === `player_result` && e.lastPlayerHit > 0 ? `YOU hit for −${e.lastPlayerHit}` : e.phase === `enemy_result` && e.lastEnemyHit > 0 ? `THEY hit for −${e.lastEnemyHit}` : e.phase === `enemy_result` && e.lastEnemyHit === 0 ? `THEY miss — no hull lost` : null;
        return (0, F.jsxs)(i.div, {
            initial: {
                opacity: 0,
                scale: .96
            },
            animate: {
                opacity: 1,
                scale: 1,
                ...ie
            },
            transition: {
                duration: e.phase === `player_result` || e.phase === `enemy_result` ? .45 : .25
            },
            style: {
                position: `relative`,
                width: `100%`,
                maxWidth: 560,
                margin: r ? `0 auto 8px` : `0 auto`,
                borderRadius: r ? 14 : 18,
                overflow: r ? `visible` : `hidden`,
                maxHeight: r ? `calc(100dvh - 20px - env(safe-area-inset-top) - env(safe-area-inset-bottom))` : void 0,
                border: `2px solid ${oe}`,
                boxShadow: v ? `0 16px 48px rgba(0,0,0,0.65), 0 0 70px ${l.glow}` : y ? `0 0 0 1px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.65), 0 0 70px rgba(255,40,80,0.45)` : `0 0 0 1px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.65), 0 0 60px ${ee ? `rgba(255,120,40,0.4)` : l.glow}`,
                display: `flex`,
                flexDirection: `column`,
                background: `#08060a`
            },
            children: [
                (0, F.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        borderRadius: `inherit`,
                        overflow: `hidden`,
                        backgroundImage: m ? `url(${m})` : void 0,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`,
                        filter: v ? `brightness(0.55) saturate(1.2)` : `brightness(0.42) saturate(1.2)`,
                        transform: c === `hunter` ? `scale(1.05)` : void 0
                    }
                }),
                h && !r && (0, F.jsx)(`video`, {
                    ref: ae,
                    "aria-hidden": !0,
                    src: h,
                    muted: !0,
                    loop: !0,
                    playsInline: !0,
                    preload: `auto`,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        width: `100%`,
                        height: `100%`,
                        objectFit: `cover`,
                        borderRadius: `inherit`,
                        filter: v ? `brightness(0.5) saturate(1.15)` : `brightness(0.4) saturate(1.2)`,
                        opacity: .95
                    }
                }, c),
                (0, F.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        borderRadius: `inherit`,
                        background: v ? l.victoryOverlay : l.overlay
                    }
                }),
                (0, F.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        pointerEvents: `none`,
                        borderRadius: `inherit`,
                        background: `radial-gradient(ellipse at 50% 18%, ${l.accent}22 0%, transparent 55%)`
                    }
                }),
                (0, F.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        padding: r ? `10px 10px 12px` : `18px 18px 20px`,
                        overflowY: r ? `auto` : void 0,
                        WebkitOverflowScrolling: r ? `touch` : void 0,
                        maxHeight: r ? `calc(100dvh - 20px - env(safe-area-inset-top) - env(safe-area-inset-bottom))` : void 0
                    },
                    children: [
                        (0, F.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 10,
                                letterSpacing: 2.5,
                                color: l.accentSoft,
                                textAlign: `center`,
                                marginBottom: 2
                            },
                            children: S
                        }),
                        (0, F.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: r ? 24 : 30,
                                color: v ? `#fff4c8` : `#fff0c8`,
                                textAlign: `center`,
                                letterSpacing: 1,
                                textShadow: v ? `0 2px 22px rgba(240,200,80,0.65)` : `0 2px 18px ${l.glow}`,
                                lineHeight: 1.1
                            },
                            children: v ? `VICTORY` : e.phase === `player_result` ? `YOUR ATTACK` : e.phase === `enemy_result` ? `THEIR ATTACK` : e.enemyName
                        }),
                        (g || e.phase === `player_result` || e.phase === `enemy_result`) && (0, F.jsx)(`div`, {
                            style: {
                                textAlign: `center`,
                                marginTop: r ? 4 : 6,
                                marginBottom: 2,
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 10,
                                letterSpacing: 1.5,
                                color: l.accentSoft
                            },
                            children: g ? `YOUR MOVE` : e.phase === `player_result` ? `1/2 · YOUR HIT` : `2/2 · THEIR HIT`
                        }),
                        (0, F.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                alignItems: `center`,
                                gap: 6,
                                flexWrap: `wrap`,
                                marginTop: 6,
                                marginBottom: 2
                            },
                            children: [
                                (0, F.jsxs)(`span`, {
                                    style: {
                                        display: `inline-flex`,
                                        alignItems: `center`,
                                        gap: 7,
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 9,
                                        letterSpacing: 1.5,
                                        padding: `4px 10px`,
                                        borderRadius: 999,
                                        border: `1px solid ${l.accent}66`,
                                        color: l.accent,
                                        background: `${l.accent}18`
                                    },
                                    children: [
                                        c === `ancient_kraken` ? `ANCIENT` : c.toUpperCase(),
                                        (0, F.jsx)(Tt, {
                                            power: e.enemyPower,
                                            accent: l.accent
                                        })
                                    ]
                                }),
                                y && (0, F.jsx)(`span`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 9,
                                        letterSpacing: 1.5,
                                        padding: `4px 10px`,
                                        borderRadius: 999,
                                        border: `1px solid rgba(255,80,120,0.85)`,
                                        color: `#ff6688`,
                                        background: `rgba(80,10,24,0.8)`
                                    },
                                    children: `ENRAGED`
                                }),
                                te && !v && (0, F.jsx)(`span`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 9,
                                        letterSpacing: 1.5,
                                        padding: `4px 10px`,
                                        borderRadius: 999,
                                        border: `1px solid rgba(240,216,120,0.7)`,
                                        color: `#f0d878`,
                                        background: `rgba(60,40,8,0.75)`
                                    },
                                    children: `FINISH IT`
                                }),
                                ne && g && (0, F.jsx)(`span`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 9,
                                        letterSpacing: 1.5,
                                        padding: `4px 10px`,
                                        borderRadius: 999,
                                        border: `1px solid rgba(255,100,120,0.7)`,
                                        color: `#ff8899`,
                                        background: `rgba(50,10,16,0.75)`
                                    },
                                    children: `HULL LOW`
                                })
                            ]
                        }),
                        (0, F.jsx)(n, {
                            children: (se || e.phase === `player_result` && (e.lastCounter || e.lastPunished)) && (0, F.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    scale: .85,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0
                                },
                                transition: {
                                    type: `spring`,
                                    stiffness: 220,
                                    damping: 16
                                },
                                style: {
                                    textAlign: `center`,
                                    margin: `8px auto 2px`
                                },
                                children: [
                                    e.phase === `player_result` && (e.lastCounter || e.lastPunished) && (0, F.jsxs)(`div`, {
                                        style: {
                                            fontFamily: `'Pirata One', cursive`,
                                            fontSize: r ? 24 : 30,
                                            letterSpacing: 3,
                                            color: e.lastCounter ? `#88eebb` : `#ff6677`,
                                            textShadow: e.lastCounter ? `0 0 28px rgba(100,255,180,0.7)` : `0 0 28px rgba(255,60,80,0.75)`
                                        },
                                        children: [
                                            e.lastCounter ? `COUNTER!` : `PUNISHED!`,
                                            e.lastCrit ? ` CRIT!` : ``
                                        ]
                                    }),
                                    se && (0, F.jsx)(`div`, {
                                        style: {
                                            fontFamily: `'Pirata One', cursive`,
                                            fontSize: r ? 22 : 26,
                                            letterSpacing: 1,
                                            color: e.phase === `player_result` ? `#88eebb` : `#ff8899`,
                                            textShadow: `0 2px 12px rgba(0,0,0,0.85)`,
                                            marginTop: 2
                                        },
                                        children: se
                                    })
                                ]
                            }, `${e.phase}-${e.lastCounter}-${e.lastPunished}-${e.lastPlayerHit}-${e.lastEnemyHit}`)
                        }),
                        g && (0, F.jsxs)(i.div, {
                            initial: {
                                y: -6,
                                opacity: 0
                            },
                            animate: {
                                y: 0,
                                opacity: 1
                            },
                            style: {
                                margin: r ? `4px auto 6px` : `10px auto 12px`,
                                maxWidth: 440,
                                textAlign: `center`,
                                padding: r ? `10px 12px 8px` : `14px 16px 12px`,
                                borderRadius: r ? 12 : 14,
                                border: `1.5px solid ${y ? `#ff6688` : f.color}99`,
                                background: y ? `linear-gradient(135deg, rgba(180,20,60,0.4), rgba(0,0,0,0.6))` : `linear-gradient(135deg, ${f.color}28, rgba(0,0,0,0.6))`,
                                boxShadow: `0 0 28px ${y ? `rgba(255,60,100,0.35)` : f.color + `33`}`
                            },
                            children: [
                                E[f.icon] && (0, F.jsx)(`img`, {
                                    src: E[f.icon],
                                    alt: ``,
                                    style: {
                                        width: r ? 56 : 72,
                                        height: r ? 56 : 72,
                                        objectFit: `contain`,
                                        margin: `0 auto 6px`,
                                        display: `block`,
                                        filter: `drop-shadow(0 0 14px ${f.color}88)`
                                    }
                                }),
                                (0, F.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: r ? 10 : 11,
                                        fontWeight: 600,
                                        letterSpacing: 2.2,
                                        color: `rgba(255,255,255,0.45)`,
                                        marginBottom: 2
                                    },
                                    children: y ? `THE ELDER` : l.telegraph
                                }),
                                (0, F.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: r ? 28 : 32,
                                        letterSpacing: 1,
                                        lineHeight: 1,
                                        color: y ? `#ff6688` : f.color,
                                        textShadow: `0 2px 16px ${f.color}66`
                                    },
                                    children: f.title
                                }),
                                f.best !== `Fight` && (0, F.jsxs)(`div`, {
                                    style: {
                                        display: `inline-block`,
                                        marginTop: r ? 8 : 10,
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 11,
                                        letterSpacing: 1.5,
                                        padding: `4px 12px`,
                                        borderRadius: 999,
                                        color: `#88eebb`,
                                        border: `1px solid rgba(136,238,187,0.55)`,
                                        background: `rgba(20,50,36,0.7)`
                                    },
                                    children: [
                                        `BEST → `,
                                        f.best
                                    ]
                                }),
                                f.best === `Fight` && (0, F.jsx)(`div`, {
                                    style: {
                                        display: `inline-block`,
                                        marginTop: r ? 8 : 10,
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 11,
                                        letterSpacing: 1.5,
                                        padding: `4px 12px`,
                                        borderRadius: 999,
                                        color: `#eecc88`,
                                        border: `1px solid rgba(238,204,136,0.45)`,
                                        background: `rgba(50,40,10,0.65)`
                                    },
                                    children: `FLEE COSTS MORE · PICK A HIT`
                                })
                            ]
                        }, `${e.intent}-${y}`),
                        v && (0, F.jsxs)(i.div, {
                            initial: {
                                opacity: 0,
                                y: 12,
                                scale: .95
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            transition: {
                                delay: .15,
                                type: `spring`,
                                stiffness: 160
                            },
                            style: {
                                margin: `12px auto`,
                                maxWidth: 400,
                                textAlign: `center`,
                                padding: `14px 14px`,
                                borderRadius: 14,
                                border: `1px solid ${l.victoryBorder}`,
                                background: `linear-gradient(165deg, rgba(80,56,12,0.75), rgba(20,12,4,0.9))`
                            },
                            children: [
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: 20,
                                        color: `#f0d878`
                                    },
                                    children: [
                                        e.enemyName,
                                        ` broken`
                                    ]
                                }),
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 12,
                                        letterSpacing: 1,
                                        color: `rgba(255,248,230,0.65)`,
                                        marginTop: 6
                                    },
                                    children: [
                                        `Final blow · `,
                                        e.lastPlayerHit,
                                        e.lastCrit ? ` · CRIT` : ``,
                                        e.lastCounter ? ` · COUNTER` : ``
                                    ]
                                }),
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        justifyContent: `center`,
                                        gap: 22,
                                        marginTop: 12,
                                        fontFamily: `'Pirata One', cursive`
                                    },
                                    children: [
                                        (0, F.jsxs)(`div`, {
                                            children: [
                                                (0, F.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        letterSpacing: 2,
                                                        color: `rgba(238,221,68,0.55)`,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: `GOLD`
                                                }),
                                                (0, F.jsxs)(`div`, {
                                                    style: {
                                                        color: `#eedd44`,
                                                        fontSize: 26
                                                    },
                                                    children: [
                                                        `+`,
                                                        e.victoryGold
                                                    ]
                                                })
                                            ]
                                        }),
                                        (0, F.jsxs)(`div`, {
                                            children: [
                                                (0, F.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        letterSpacing: 2,
                                                        color: `rgba(136,238,187,0.55)`,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: `SCORE`
                                                }),
                                                (0, F.jsxs)(`div`, {
                                                    style: {
                                                        color: `#88eebb`,
                                                        fontSize: 26
                                                    },
                                                    children: [
                                                        `+`,
                                                        e.victoryPts
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        e.phase !== `fled` && (0, F.jsxs)(`div`, {
                            style: {
                                display: `grid`,
                                gridTemplateColumns: `1fr auto 1fr`,
                                gap: r ? 8 : 12,
                                alignItems: `center`,
                                marginBottom: 8,
                                marginTop: g ? 0 : 6,
                                paddingTop: e.phase === `player_result` || e.phase === `enemy_result` ? 18 : 0,
                                overflow: `visible`
                            },
                            children: [
                                (0, F.jsx)(Dt, {
                                    side: `left`,
                                    name: `You`,
                                    hull: t.hull,
                                    max: t.maxHull,
                                    pct: d,
                                    color: `#88eebb`,
                                    float: e.phase === `enemy_result` ? e.lastEnemyHit : 0,
                                    floatBad: !0,
                                    pulse: e.phase === `enemy_result`,
                                    warn: ne
                                }),
                                (0, F.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: 20,
                                        color: v ? `#f0d878` : l.accent,
                                        textShadow: `0 0 12px ${l.glow}`,
                                        lineHeight: 1
                                    },
                                    children: v ? `☠` : `⚔`
                                }),
                                (0, F.jsx)(Dt, {
                                    side: `right`,
                                    name: wt[c],
                                    hull: e.enemyHull,
                                    max: e.enemyMaxHull,
                                    pct: u,
                                    color: l.accent,
                                    float: e.phase === `player_result` || v ? e.lastPlayerHit : 0,
                                    floatBad: !1,
                                    pulse: e.phase === `player_result`,
                                    warn: te && !v
                                })
                            ]
                        }),
                        g && (0, F.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                alignItems: `center`,
                                gap: 5,
                                marginBottom: r ? 6 : 8,
                                flexWrap: `wrap`
                            },
                            children: [
                                [
                                    0,
                                    1,
                                    2
                                ].map((t)=>(0, F.jsx)(`div`, {
                                        style: {
                                            width: r ? 8 : 9,
                                            height: r ? 8 : 9,
                                            borderRadius: `50%`,
                                            background: t < e.momentum ? l.accent : `rgba(255,255,255,0.12)`,
                                            boxShadow: t < e.momentum ? `0 0 8px ${l.accent}` : `none`
                                        }
                                    }, t)),
                                (0, F.jsx)(`span`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: r ? 9 : 10,
                                        letterSpacing: 1.2,
                                        color: l.accentSoft
                                    },
                                    children: `MOMENTUM`
                                })
                            ]
                        }),
                        !g && (0, F.jsx)(n, {
                            mode: `wait`,
                            children: (0, F.jsx)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 6
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                style: {
                                    fontFamily: `'IM Fell English', cursive`,
                                    fontSize: r ? 14 : 15,
                                    color: v ? `#f0d878` : e.lastCounter && e.phase === `player_result` ? `#88eebb` : e.phase === `enemy_result` ? `#ff8899` : `rgba(255,248,230,0.88)`,
                                    textAlign: `center`,
                                    marginBottom: 12,
                                    minHeight: r ? 28 : 40,
                                    lineHeight: 1.4,
                                    textShadow: `0 1px 6px rgba(0,0,0,0.85)`,
                                    padding: `0 4px`
                                },
                                children: v ? x : a
                            }, a + e.phase)
                        }),
                        g && (0, F.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                flexDirection: r ? `column` : `row`,
                                gap: r ? 6 : 8,
                                justifyContent: `center`
                            },
                            children: p.map((t)=>{
                                let n = t.id === 0 && e.intent === `grapple` || t.id === 1 && e.intent === `volley`, a = t.id === 0 && e.intent === `volley` || t.id === 1 && e.intent === `grapple`, o = t.id === 2 && e.intent === `plunder`, c = t.id === 2 ? o ? `⚠ ${t.weak}` : t.beats : n ? `▸ ${t.beats}` : a ? `▸ ${t.weak}` : t.beats;
                                return (0, F.jsxs)(i.button, {
                                    whileHover: {
                                        scale: 1.03,
                                        y: -2
                                    },
                                    whileTap: {
                                        scale: .97
                                    },
                                    onClick: ()=>s(t.id),
                                    "aria-label": `${t.label}. ${t.tag}. ${n ? t.beats : a ? t.weak : t.beats}`,
                                    style: {
                                        flex: 1,
                                        position: `relative`,
                                        minHeight: r ? 48 : void 0,
                                        padding: r ? `10px 12px` : `12px 11px`,
                                        borderRadius: r ? 12 : 14,
                                        border: n ? `2px solid ${t.color}` : a || o ? `1.5px solid rgba(255,100,100,0.55)` : `1.5px solid ${t.color}55`,
                                        background: n ? `linear-gradient(160deg, ${t.color}38, rgba(0,0,0,0.78))` : a || o ? `linear-gradient(160deg, rgba(60,10,10,0.78), rgba(0,0,0,0.82))` : `linear-gradient(160deg, rgba(0,0,0,0.78), ${t.color}14)`,
                                        cursor: `pointer`,
                                        textAlign: `left`,
                                        color: `#e8e0d0`,
                                        boxShadow: n ? `0 0 22px ${t.color}44` : `none`
                                    },
                                    children: [
                                        !r && (0, F.jsx)(`span`, {
                                            style: {
                                                position: `absolute`,
                                                top: 8,
                                                right: 8,
                                                width: 18,
                                                height: 18,
                                                borderRadius: 5,
                                                display: `flex`,
                                                alignItems: `center`,
                                                justifyContent: `center`,
                                                fontFamily: `'Cinzel', serif`,
                                                fontSize: 10,
                                                letterSpacing: 0,
                                                color: `rgba(255,255,255,0.45)`,
                                                border: `1px solid rgba(255,255,255,0.18)`,
                                                background: `rgba(0,0,0,0.35)`
                                            },
                                            children: t.id + 1
                                        }),
                                        (0, F.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: r ? 10 : 8
                                            },
                                            children: [
                                                E[t.icon] && (0, F.jsx)(`img`, {
                                                    src: E[t.icon],
                                                    alt: ``,
                                                    style: {
                                                        width: r ? 28 : 36,
                                                        height: r ? 28 : 36,
                                                        objectFit: `contain`,
                                                        flexShrink: 0
                                                    }
                                                }),
                                                (0, F.jsxs)(`div`, {
                                                    style: {
                                                        minWidth: 0,
                                                        flex: 1
                                                    },
                                                    children: [
                                                        (0, F.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `baseline`,
                                                                gap: 8,
                                                                flexWrap: `wrap`
                                                            },
                                                            children: [
                                                                (0, F.jsx)(`span`, {
                                                                    style: {
                                                                        fontFamily: `'Pirata One', cursive`,
                                                                        fontSize: r ? 18 : 20,
                                                                        color: t.color,
                                                                        lineHeight: 1
                                                                    },
                                                                    children: t.label
                                                                }),
                                                                (0, F.jsx)(`span`, {
                                                                    style: {
                                                                        fontFamily: `'Cinzel', serif`,
                                                                        fontSize: 9,
                                                                        letterSpacing: 1.3,
                                                                        color: n ? `#88eebb` : a || o ? `#ff8899` : `rgba(255,255,255,0.4)`
                                                                    },
                                                                    children: t.tag
                                                                }),
                                                                r && t.id !== 2 && (0, F.jsxs)(`span`, {
                                                                    style: {
                                                                        fontFamily: `'Cinzel', serif`,
                                                                        fontSize: 9,
                                                                        letterSpacing: .8,
                                                                        color: `rgba(255,255,255,0.35)`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: [
                                                                        `DMG `,
                                                                        t.dmg,
                                                                        ` · RISK `,
                                                                        t.risk
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        (0, F.jsx)(`div`, {
                                                            style: {
                                                                fontFamily: `'Cinzel', serif`,
                                                                fontSize: 10,
                                                                letterSpacing: 1,
                                                                marginTop: r ? 2 : 4,
                                                                color: n ? `#88eebb` : a || o ? `#ff8899` : `rgba(255,255,255,0.45)`
                                                            },
                                                            children: t.id === 2 && r ? `${c} · ${re}` : c
                                                        }),
                                                        t.id === 2 && !r && (0, F.jsxs)(`div`, {
                                                            style: {
                                                                fontFamily: `'Cinzel', serif`,
                                                                fontSize: 12,
                                                                letterSpacing: 1,
                                                                marginTop: 6,
                                                                color: `#88ccee`
                                                            },
                                                            children: [
                                                                `Cost · `,
                                                                re
                                                            ]
                                                        }),
                                                        t.id !== 2 && !r && (0, F.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                flexDirection: `column`
                                                            },
                                                            children: [
                                                                (0, F.jsx)(R, {
                                                                    label: `DMG`,
                                                                    filled: t.dmg,
                                                                    color: t.color
                                                                }),
                                                                (0, F.jsx)(R, {
                                                                    label: `RISK`,
                                                                    filled: t.risk,
                                                                    color: t.risk >= 3 ? `#ff6677` : `#eecc88`
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, t.id);
                            })
                        }),
                        _ && (0, F.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                flexDirection: `column`,
                                alignItems: `center`,
                                gap: 8
                            },
                            children: [
                                (e.phase === `player_result` || e.phase === `enemy_result`) && (0, F.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: 13,
                                        color: `rgba(255,255,255,0.45)`,
                                        textAlign: `center`
                                    },
                                    children: e.phase === `player_result` ? `Your attack is done. Tap for their counter.` : `Their attack is done. Tap to choose your next move.`
                                }),
                                (0, F.jsx)(i.button, {
                                    whileHover: {
                                        scale: 1.04
                                    },
                                    whileTap: {
                                        scale: .97
                                    },
                                    onClick: ()=>s(3),
                                    style: {
                                        padding: r ? `13px 28px` : `15px 36px`,
                                        borderRadius: 12,
                                        border: v ? `2px solid ${l.victoryBorder}` : `1.5px solid ${l.accent}66`,
                                        background: v ? `linear-gradient(135deg, rgba(200,150,40,0.55), rgba(80,50,10,0.85))` : `linear-gradient(135deg, ${l.accent}33, rgba(0,0,0,0.6))`,
                                        color: v ? `#fff4c8` : `#e8e0d0`,
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: r ? 18 : 20,
                                        letterSpacing: 1.5,
                                        cursor: `pointer`,
                                        boxShadow: v ? `0 0 28px rgba(240,200,80,0.35)` : `0 0 18px ${l.glow}`
                                    },
                                    children: v ? `CLAIM THE SPOILS` : e.phase === `fled` ? `BACK TO THE SEA` : e.phase === `player_result` ? `NEXT — THEIR ATTACK` : e.phase === `enemy_result` ? `NEXT — YOUR MOVE` : `CONTINUE`
                                })
                            ]
                        })
                    ]
                })
            ]
        }, `duel-${c}-${e.round}-${e.phase}`);
    }
    function Dt({ side: e, name: t, hull: r, max: a, pct: o, color: s, float: c, floatBad: l, pulse: u, warn: d }) {
        let f = d && (l || e === `left`) ? `#ff8899` : s;
        return (0, F.jsxs)(i.div, {
            animate: u ? {
                x: [
                    0,
                    -4,
                    4,
                    -3,
                    3,
                    0
                ]
            } : {
                x: 0
            },
            transition: {
                duration: .45
            },
            style: {
                position: `relative`,
                textAlign: e === `left` ? `left` : `right`
            },
            children: [
                (0, F.jsx)(`div`, {
                    style: {
                        fontFamily: `'Cinzel', serif`,
                        fontSize: 10,
                        letterSpacing: 1.2,
                        color: `rgba(255,255,255,0.48)`,
                        marginBottom: 3
                    },
                    children: t
                }),
                (0, F.jsxs)(`div`, {
                    style: {
                        fontFamily: `'Pirata One', cursive`,
                        fontSize: 22,
                        color: f,
                        lineHeight: 1,
                        textShadow: `0 0 12px ${f}66`
                    },
                    children: [
                        r,
                        (0, F.jsxs)(`span`, {
                            style: {
                                fontSize: 13,
                                color: `rgba(255,255,255,0.38)`
                            },
                            children: [
                                `/`,
                                a
                            ]
                        })
                    ]
                }),
                (0, F.jsx)(`div`, {
                    style: {
                        marginTop: 5,
                        height: 9,
                        borderRadius: 4,
                        background: `rgba(0,0,0,0.5)`,
                        overflow: `hidden`,
                        border: d ? `1px solid rgba(255,120,140,0.45)` : `1px solid rgba(255,255,255,0.1)`
                    },
                    children: (0, F.jsx)(i.div, {
                        animate: {
                            width: `${Math.round(o * 100)}%`
                        },
                        transition: {
                            type: `spring`,
                            stiffness: 120,
                            damping: 18
                        },
                        style: {
                            height: `100%`,
                            background: f,
                            borderRadius: 4
                        }
                    })
                }),
                (0, F.jsx)(n, {
                    children: c > 0 && (0, F.jsxs)(i.div, {
                        initial: {
                            opacity: 0,
                            y: 8,
                            scale: .8
                        },
                        animate: {
                            opacity: 1,
                            y: -24,
                            scale: 1.25
                        },
                        exit: {
                            opacity: 0
                        },
                        transition: {
                            duration: .7
                        },
                        style: {
                            position: `absolute`,
                            top: 0,
                            left: e === `left` ? void 0 : 0,
                            right: e === `left` ? 0 : void 0,
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 28,
                            color: l ? `#ff6677` : `#88eebb`,
                            textShadow: `0 2px 10px rgba(0,0,0,0.95)`,
                            pointerEvents: `none`
                        },
                        children: [
                            `−`,
                            c
                        ]
                    }, `${t}-${c}-${r}`)
                })
            ]
        });
    }
    var Ot = `/assets/hull-CGmPGbU0.png`, kt = `/assets/vision-3Q65Za4i.png`, At = `/assets/power-CBX9SU5d.png`;
    function jt({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, F.jsx)(n, {
            children: e && (0, F.jsxs)(i.div, {
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
                    (0, F.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, F.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, F.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, F.jsx)(`span`, {
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
                            u && d && (0, F.jsx)(me, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, F.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, F.jsx)(`div`, {
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
                                                    `Hull 28 · −2 storm damage`,
                                                    `Hull 38 · −3 storm & sea damage`
                                                ]
                                            },
                                            {
                                                key: `weapon`,
                                                label: `ARMEMENT`,
                                                img: `/assets/power-CBX9SU5d.png`,
                                                color: `#ee6644`,
                                                effects: [
                                                    `Power 2`,
                                                    `Power 5 · higher minimum hits`,
                                                    `Power 9 · −3 combat damage taken`
                                                ]
                                            },
                                            {
                                                key: `nav`,
                                                label: `NAVIGATION`,
                                                img: `/assets/vision-3Q65Za4i.png`,
                                                color: `#6aaccc`,
                                                effects: [
                                                    `Vision 1`,
                                                    `Vision 2 · stacks with Spyglass`,
                                                    `Vision 3 · danger detect`
                                                ]
                                            }
                                        ].map((e)=>{
                                            let t = r.levels[e.key], n = t === 0 ? 50 : 110, i = t < 2 && r.gold >= n && !(t === 1 && s >= 2), a = t >= 2, o = t === 0 ? `II` : `III`;
                                            return (0, F.jsxs)(`div`, {
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
                                                    (0, F.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, F.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, F.jsx)(`img`, {
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
                                                            (0, F.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, F.jsx)(`div`, {
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
                                                    (0, F.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 13,
                                                            color: `rgba(255,255,255,0.65)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, F.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.25)`,
                                                            fontFamily: `'Cinzel', serif`,
                                                            letterSpacing: .5
                                                        },
                                                        children: t === 1 && s >= 2 ? `Only 2 components can reach III` : `Upgrade to ${o} · ${n}g`
                                                    }),
                                                    a && (0, F.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
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
                            (0, F.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8,
                                    gap: 8
                                },
                                children: [
                                    (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, F.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        onClick: p,
                                        style: {
                                            padding: t ? `10px 14px` : `4px 12px`,
                                            minHeight: t ? 44 : void 0,
                                            borderRadius: 6,
                                            border: m ? `1px solid rgba(238,221,68,0.55)` : `1px solid rgba(255,200,50,0.3)`,
                                            background: m ? `rgba(238,221,68,0.14)` : `rgba(255,200,50,0.08)`,
                                            cursor: `pointer`,
                                            color: `#eedd44`,
                                            fontSize: 13,
                                            fontFamily: `'Pirata One', cursive`,
                                            flexShrink: 0
                                        },
                                        children: m ? `Free reroll` : `Reroll 20g`
                                    })
                                ]
                            }),
                            (0, F.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: t ? `1fr` : `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: mt.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = ht[e.build], d = t ? `OWNED` : n ? i === 0 ? `IN CART · FREE` : `IN CART · ${i}g` : i === 0 ? `FREE` : `${i}g`;
                                    return (0, F.jsxs)(`div`, {
                                        onClick: ()=>{
                                            n ? l((t)=>t.filter((t)=>t !== e.id)) : s && l((t)=>[
                                                    ...t,
                                                    e.id
                                                ]);
                                        },
                                        style: {
                                            padding: `14px 14px`,
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
                                            (0, F.jsx)(`img`, {
                                                src: ft[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    minWidth: 0,
                                                    flex: 1
                                                },
                                                children: [
                                                    (0, F.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `baseline`,
                                                            gap: 8
                                                        },
                                                        children: [
                                                            (0, F.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 17,
                                                                    fontWeight: 700,
                                                                    color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: e.name
                                                            }),
                                                            (0, F.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 12,
                                                                    letterSpacing: .5,
                                                                    flexShrink: 0,
                                                                    color: t ? u : n ? `#44cc88` : `#eedd44`,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: d
                                                            })
                                                        ]
                                                    }),
                                                    (0, F.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, F.jsx)(_t, {
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
                            r.upgrades.length + c.length >= 2 && (0, F.jsx)(`div`, {
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
                        return (0, F.jsxs)(F.Fragment, {
                            children: [
                                e && (0, F.jsx)(`div`, {
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
                                t && (0, F.jsx)(`div`, {
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
                                (0, F.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 8,
                                        marginBottom: 16
                                    },
                                    children: n.map((n)=>{
                                        let a = r.gold >= n.cost && r.hull < r.maxHull && !e, o = e ? `Cursed Greed blocks repairs` : t ? `+${n.heal} hull (half)` : n.baseDesc;
                                        return (0, F.jsxs)(i.button, {
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
                                                (0, F.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: e ? `rgba(160,160,180,0.75)` : `#44cc88`,
                                                        fontFamily: `'Pirata One', cursive`
                                                    },
                                                    children: n.label
                                                }),
                                                (0, F.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: e ? `rgba(180,170,200,0.65)` : `rgba(255,255,255,0.5)`
                                                    },
                                                    children: o
                                                }),
                                                (0, F.jsx)(`div`, {
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
                    (()=>{
                        let e = c.map((e)=>mt.find((t)=>t.id === e)?.name).filter(Boolean), t = c.reduce((e, t)=>e + (mt.find((e)=>e.id === t)?.cost ?? 0), 0), n = o ? 0 : t, a = Math.max(0, r.gold - n), s = c.length > 0;
                        return (0, F.jsxs)(F.Fragment, {
                            children: [
                                s && (0, F.jsxs)(`div`, {
                                    style: {
                                        marginBottom: 8,
                                        padding: `8px 12px`,
                                        borderRadius: 8,
                                        textAlign: `center`,
                                        border: `1px solid rgba(200,160,48,0.35)`,
                                        background: `rgba(40,30,8,0.55)`,
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: 14,
                                        color: `rgba(240,216,120,0.9)`
                                    },
                                    children: [
                                        `Buying `,
                                        e.join(` · `),
                                        o ? ` · FREE token` : ` (${n}g)`,
                                        ` · `,
                                        `gold after: `,
                                        a
                                    ]
                                }),
                                (0, F.jsxs)(i.button, {
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
                                        border: s ? `2px solid rgba(200,160,48,0.75)` : `2px solid rgba(200,160,48,0.5)`,
                                        background: s ? `rgba(200,160,48,0.18)` : `rgba(200,160,48,0.1)`,
                                        color: `#c8a030`,
                                        fontSize: 18,
                                        fontFamily: `'Pirata One', cursive`,
                                        letterSpacing: 3,
                                        cursor: `pointer`,
                                        boxShadow: s ? `0 0 20px rgba(200,160,48,0.2)` : void 0
                                    },
                                    children: [
                                        (0, F.jsx)(S, {
                                            name: `anchor`,
                                            size: 22,
                                            style: {
                                                marginRight: 8
                                            }
                                        }),
                                        s ? o ? `SET SAIL · CLAIM FREE` : `SET SAIL · BUY (${n}g)` : `SET SAIL`
                                    ]
                                }),
                                s && (0, F.jsx)(`div`, {
                                    style: {
                                        marginTop: 6,
                                        textAlign: `center`,
                                        fontSize: 11,
                                        letterSpacing: 1,
                                        color: `rgba(255,255,255,0.35)`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: `Purchases apply when you sail`
                                })
                            ]
                        });
                    })()
                ]
            })
        });
    }
    var Mt = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new ze({
        nodeUrl: k
    });
    async function Nt(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: Mt,
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
    function Pt({ payload: e, isMobile: t, onShare: n }) {
        return (0, F.jsxs)(i.div, {
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
                (0, F.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, F.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, F.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, F.jsxs)(`div`, {
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
                (0, F.jsx)(`div`, {
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
                    ].map((e)=>(0, F.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, F.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, F.jsx)(`div`, {
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
                (0, F.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, F.jsxs)(`div`, {
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
                        (0, F.jsx)(i.button, {
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
    async function Ft(e) {
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
    function It(e) {
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
        if (e.kind === `idle`) return null;
        if (e.kind === `local`) return (0, F.jsx)(B, {
            tone: `muted`,
            children: `Local voyage — not ranked. Connect + server seed to climb the board.`
        });
        if (e.kind === `combat_proto`) return (0, F.jsx)(B, {
            tone: `warn`,
            children: (0, F.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4
                },
                children: [
                    (0, F.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 15,
                            letterSpacing: 2,
                            color: `#ff8899`
                        },
                        children: `COMBAT TEST — NOT RANKED`
                    }),
                    (0, F.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.55)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 340,
                            lineHeight: 1.35
                        },
                        children: `Sea duels are on for playtesting. Remove ?combat=1 to climb the real board.`
                    })
                ]
            })
        });
        if (e.kind === `sending`) return (0, F.jsx)(B, {
            tone: `info`,
            pulse: !0,
            children: (0, F.jsxs)(`span`, {
                style: {
                    display: `inline-flex`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, F.jsx)(V, {}),
                    ` Logging the voyage to the harbor…`
                ]
            })
        });
        if (e.kind === `ok`) return e.daily ? (0, F.jsx)(B, {
            tone: `daily`,
            children: (0, F.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4
                },
                children: [
                    (0, F.jsxs)(`div`, {
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
                            (0, F.jsx)(S, {
                                name: `sun`,
                                size: 18
                            }),
                            ` DAILY SCORE PUBLISHED`
                        ]
                    }),
                    (0, F.jsx)(`div`, {
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
        }) : (0, F.jsx)(B, {
            tone: `ok`,
            children: (0, F.jsx)(`span`, {
                style: {
                    fontFamily: `'Pirata One', cursive`,
                    fontSize: 15,
                    letterSpacing: 2
                },
                children: `✓ SCORE SAVED — ON THE LEADERBOARD`
            })
        });
        if (e.kind === `queued`) return (0, F.jsx)(B, {
            tone: `warn`,
            children: (0, F.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, F.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#eec070`
                        },
                        children: `Harbor lag — voyage queued`
                    }),
                    (0, F.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: e.step === `log` ? `Could not save the run log. Retry now, or it will send on your next visit.` : `Log saved, approval pending. Retry now, or it will finish on your next visit.`
                    }),
                    t && (0, F.jsx)(`button`, {
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
        return (0, F.jsx)(B, {
            tone: `bad`,
            children: (0, F.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, F.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#ee8899`
                        },
                        children: `Score not accepted`
                    }),
                    (0, F.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: n
                    }),
                    t && (0, F.jsx)(`button`, {
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
    function B({ children: e, tone: t, pulse: n }) {
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
        return (0, F.jsx)(i.div, {
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
    function V() {
        return (0, F.jsx)(i.span, {
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
    function Lt({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: s, isNewRecord: c, newFeats: l, nearFeats: u, submitStatus: d, onRetrySubmit: f, nftMinted: p, walletAddress: h, account: g, onChainDone: _, setOnChainDone: v, submitting: ee, setSubmitting: te, connecting: ne, onConnect: ie, showGuestDailyCta: ae, onPlayDaily: x, rangMois: oe, harborDown: se, restarting: ce, onRestart: le, onHome: ue, onWatchReplay: de }) {
        let [fe, C] = (0, A.useState)(!1), w = o(), pe = w <= 1, me = !a && !m() && !!x && !!h, T = ae || me, he = It(t.log), E = {
            padding: r ? `16px 36px` : `18px 48px`,
            borderRadius: 14,
            border: T ? `2px solid rgba(136,221,255,0.85)` : `2px solid rgba(200,160,48,0.85)`,
            background: T ? `linear-gradient(135deg, rgba(30,90,120,0.85) 0%, rgba(20,50,70,0.9) 100%)` : `linear-gradient(135deg, rgba(120,90,20,0.75) 0%, rgba(60,45,10,0.9) 100%)`,
            color: T ? `#a8e8ff` : `#f0d878`,
            cursor: ce && !T ? `wait` : `pointer`,
            fontSize: r ? 22 : 26,
            fontWeight: 700,
            letterSpacing: 3,
            fontFamily: `'Pirata One', cursive`,
            boxShadow: T ? `0 0 28px rgba(80,180,220,0.35)` : `0 0 28px rgba(200,160,48,0.35)`,
            opacity: ce && !T ? .7 : 1,
            width: r ? `min(92vw, 360px)` : void 0,
            textAlign: `center`
        }, ge = {
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
        return (0, F.jsx)(n, {
            children: e && (0, F.jsxs)(i.div, {
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
                    (0, F.jsx)(i.div, {
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
                    (0, F.jsxs)(`div`, {
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
                            (0, F.jsx)(i.div, {
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
                                children: (0, F.jsx)(S, {
                                    name: `skull`,
                                    size: r ? 72 : 100
                                })
                            }),
                            (0, F.jsx)(i.div, {
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
                            (0, F.jsx)(i.div, {
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
                            (0, F.jsxs)(i.div, {
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
                                    (0, F.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 14,
                                            color: `#ee6655`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2
                                        },
                                        children: [
                                            `Sunk by `,
                                            he.name
                                        ]
                                    }),
                                    (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 13,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            lineHeight: 1.35
                                        },
                                        children: he.tip
                                    })
                                ]
                            }),
                            (0, F.jsxs)(i.div, {
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
                                    (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: `SCORE`
                                    }),
                                    (0, F.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 40 : 52,
                                            color: `#eedd44`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 700,
                                            lineHeight: 1.05
                                        },
                                        children: [
                                            t.score.toLocaleString(),
                                            (0, F.jsx)(`span`, {
                                                style: {
                                                    fontSize: r ? 16 : 20,
                                                    color: `rgba(238,221,68,0.55)`,
                                                    marginLeft: 6
                                                },
                                                children: `pts`
                                            })
                                        ]
                                    }),
                                    c && (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `#44ffaa`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 4
                                        },
                                        children: `NEW BEST`
                                    }),
                                    !c && s > t.score && (0, F.jsxs)(`div`, {
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
                            pe && (0, F.jsx)(i.div, {
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
                            (0, F.jsxs)(i.div, {
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
                                    se && (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try again when you're online`
                                    }),
                                    T && x ? (0, F.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: x,
                                        style: E,
                                        children: `PLAY DAILY · 1 TRY`
                                    }) : (0, F.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: le,
                                        disabled: ce,
                                        style: E,
                                        children: ce ? `PREPARING…` : `SAIL AGAIN`
                                    }),
                                    (0, F.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 10,
                                            flexWrap: `wrap`,
                                            justifyContent: `center`,
                                            alignItems: `center`
                                        },
                                        children: [
                                            T && (0, F.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: le,
                                                disabled: ce,
                                                style: ge,
                                                children: ce ? `…` : `Sail free run`
                                            }),
                                            !T && me && x && (0, F.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: x,
                                                style: {
                                                    ...ge,
                                                    borderColor: `rgba(136,221,255,0.4)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Daily · 1 try`
                                            }),
                                            !h && (0, F.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ie,
                                                disabled: ne,
                                                style: {
                                                    ...ge,
                                                    borderColor: `rgba(200,160,48,0.4)`,
                                                    color: `#c8a030`
                                                },
                                                children: ne ? `…` : `Connect wallet`
                                            }),
                                            de && (0, F.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: de,
                                                style: {
                                                    ...ge,
                                                    borderColor: `rgba(136,221,255,0.35)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Watch replay`
                                            }),
                                            (0, F.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ue,
                                                style: {
                                                    ...ge,
                                                    border: `none`,
                                                    color: `rgba(255,255,255,0.28)`
                                                },
                                                children: `← Menu`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, F.jsx)(z, {
                                status: d,
                                onRetry: f
                            }),
                            l.length > 0 && (0, F.jsx)(i.div, {
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
                                children: l.map((e)=>(0, F.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, F.jsx)(S, {
                                                name: e.icon,
                                                size: 22
                                            }),
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, F.jsxs)(`div`, {
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
                                                    (0, F.jsxs)(`div`, {
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
                            p.length > 0 && (0, F.jsx)(i.div, {
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
                                    let e = O(p[0]), t = e ? Le[e.rarity] : `#eedd88`;
                                    return (0, F.jsxs)(F.Fragment, {
                                        children: [
                                            e && (0, F.jsx)(`img`, {
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
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0,
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, F.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 10,
                                                            letterSpacing: 2,
                                                            color: t,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: `NFT CLAIMED · MINT PENDING`
                                                    }),
                                                    (0, F.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 14,
                                                            color: `#f0e6c8`,
                                                            fontFamily: `'Pirata One', cursive`,
                                                            overflow: `hidden`,
                                                            textOverflow: `ellipsis`,
                                                            whiteSpace: `nowrap`
                                                        },
                                                        children: p.map(Re).join(` · `)
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            }),
                            (0, F.jsx)(`button`, {
                                type: `button`,
                                onClick: ()=>C((e)=>!e),
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
                                children: fe ? `▲ HIDE DETAILS` : `▼ VOYAGE DETAILS`
                            }),
                            (0, F.jsx)(n, {
                                children: fe && (0, F.jsxs)(i.div, {
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
                                        (0, F.jsxs)(`div`, {
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
                                        (0, F.jsx)(`div`, {
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
                                                    val: w,
                                                    color: `#88ddff`
                                                }
                                            ].map((e)=>(0, F.jsxs)(`div`, {
                                                    style: {
                                                        textAlign: `center`
                                                    },
                                                    children: [
                                                        (0, F.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `rgba(255,255,255,0.3)`,
                                                                letterSpacing: 2,
                                                                fontFamily: `'Cinzel', serif`
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, F.jsx)(`div`, {
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
                                        t.scoreBreakdown && (0, F.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `10px 16px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(255,255,255,0.08)`,
                                                background: `rgba(0,0,0,0.3)`
                                            },
                                            children: [
                                                (0, F.jsx)(`div`, {
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
                                                ].filter((e)=>e.val > 0).map((e)=>(0, F.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            marginBottom: 2
                                                        },
                                                        children: [
                                                            (0, F.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: `rgba(255,255,255,0.4)`,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: e.label
                                                            }),
                                                            (0, F.jsx)(`span`, {
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
                                        u.length > 0 && (0, F.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `12px 14px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(136,221,255,0.3)`,
                                                background: `rgba(10,24,40,0.65)`
                                            },
                                            children: [
                                                (0, F.jsx)(`div`, {
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
                                                u.map((e)=>(0, F.jsxs)(`div`, {
                                                        style: {
                                                            marginTop: 6
                                                        },
                                                        children: [
                                                            (0, F.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    justifyContent: `space-between`,
                                                                    marginBottom: 3
                                                                },
                                                                children: [
                                                                    (0, F.jsx)(`div`, {
                                                                        style: {
                                                                            fontFamily: `'Pirata One', cursive`,
                                                                            fontSize: 14,
                                                                            color: `#c8e8ff`
                                                                        },
                                                                        children: e.feat.name
                                                                    }),
                                                                    (0, F.jsxs)(`div`, {
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
                                                            (0, F.jsx)(`div`, {
                                                                style: {
                                                                    height: 3,
                                                                    borderRadius: 2,
                                                                    background: `rgba(255,255,255,0.08)`,
                                                                    overflow: `hidden`,
                                                                    marginBottom: 3
                                                                },
                                                                children: (0, F.jsx)(`div`, {
                                                                    style: {
                                                                        height: `100%`,
                                                                        width: `${Math.round(e.ratio * 100)}%`,
                                                                        background: `linear-gradient(90deg,#2a6a8a,#88ddff)`
                                                                    }
                                                                })
                                                            }),
                                                            (0, F.jsx)(`div`, {
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
                                        (0, F.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.25)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginBottom: 12,
                                                textAlign: `center`
                                            },
                                            children: a ? re() ? `Seed ${t.seed} · Daily ${b()}` : `Blind daily — seed at 00:00 UTC` : `Seed ${t.seed}`
                                        }),
                                        g && !_ && (0, F.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                alignItems: `center`,
                                                gap: 6,
                                                marginBottom: 12
                                            },
                                            children: [
                                                (0, F.jsx)(i.button, {
                                                    whileHover: {
                                                        scale: 1.04
                                                    },
                                                    disabled: ee,
                                                    onClick: async ()=>{
                                                        te(!0);
                                                        try {
                                                            await Nt(g, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                                        } catch (e) {
                                                            console.warn(`On-chain submit failed:`, e);
                                                        }
                                                        v(!0), te(!1);
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
                                                    children: ee ? `ENGRAVING...` : (0, F.jsxs)(F.Fragment, {
                                                        children: [
                                                            (0, F.jsx)(S, {
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
                                                (0, F.jsx)(`div`, {
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
                                            }, i = (t.relics ?? []).map((e)=>y(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = oe ? `\n⚔️ #${oe.rank} in Starktember — ${oe.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                            return (0, F.jsx)(Pt, {
                                                isMobile: r,
                                                onShare: ()=>{
                                                    Ft(c);
                                                },
                                                payload: {
                                                    score: t.score,
                                                    turn: t.turn,
                                                    gold: t.ship.gold,
                                                    runTitle: t.runTitle,
                                                    seed: t.seed,
                                                    deathName: he.name,
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
    function Rt({ queue: e, isMobile: t, onDismiss: r }) {
        let a = e[0] ?? null;
        if ((0, A.useEffect)(()=>{
            a && N(`nft`);
        }, [
            a
        ]), !a) return null;
        let o = O(a), s = o?.name ?? Re(a), c = o?.rarity ?? `Rare`, l = Le[c], u = Fe(a), d = o ? Ie(o.image) : null, f = e.length - 1;
        return (0, F.jsx)(n, {
            children: (0, F.jsxs)(i.div, {
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
                    (0, F.jsx)(`div`, {
                        "aria-hidden": !0,
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            opacity: .35,
                            background: `radial-gradient(circle at 50% 40%, ${l}22 0%, transparent 55%)`
                        }
                    }),
                    (0, F.jsx)(i.div, {
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
                    (0, F.jsxs)(i.div, {
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
                    (0, F.jsxs)(i.div, {
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
                            (0, F.jsx)(i.div, {
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
                            (0, F.jsx)(`div`, {
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
                                children: d ? (0, F.jsx)(`img`, {
                                    src: d,
                                    alt: s,
                                    style: {
                                        width: `100%`,
                                        height: `100%`,
                                        objectFit: `cover`,
                                        display: `block`
                                    }
                                }) : (0, F.jsx)(`div`, {
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
                    (0, F.jsx)(i.div, {
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
                    o?.condition && (0, F.jsx)(i.div, {
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
                    (0, F.jsx)(i.div, {
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
                    (0, F.jsx)(i.div, {
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
                    (0, F.jsxs)(i.div, {
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
                            (0, F.jsx)(i.button, {
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
                            (0, F.jsx)(`button`, {
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
    function zt({ cinematic: e, isMobile: t, muted: r, zone: a, onClose: o, onDeathEnd: s }) {
        let c = !!(e && (w[e] || D[e] || e === `death`)), l = !!(c && e && !t && w[e]), u = e ? e === `death` ? ye[a] ?? D.storm : D[e] ?? null : null, d = ()=>{
            e === `death` && s(), o();
        };
        return (0, F.jsx)(n, {
            children: c && e && (0, F.jsxs)(i.div, {
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
                    duration: .2
                },
                onClick: d,
                style: {
                    position: `fixed`,
                    inset: 0,
                    zIndex: 140,
                    cursor: `pointer`,
                    background: `#05080f`
                },
                children: [
                    l ? (0, F.jsx)(i.video, {
                        src: w[e],
                        autoPlay: !0,
                        muted: r,
                        playsInline: !0,
                        preload: `auto`,
                        disablePictureInPicture: !0,
                        onEnded: d,
                        initial: {
                            opacity: 0,
                            scale: 1.07
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            delay: .15,
                            duration: .45,
                            ease: `easeOut`
                        },
                        style: {
                            width: `100%`,
                            height: `100%`,
                            objectFit: `cover`
                        }
                    }, e) : u ? (0, F.jsx)(i.div, {
                        initial: {
                            opacity: 0,
                            scale: 1.08
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            duration: .5,
                            ease: `easeOut`
                        },
                        style: {
                            position: `absolute`,
                            inset: 0,
                            backgroundImage: `url(${u})`,
                            backgroundSize: `cover`,
                            backgroundPosition: `center`
                        }
                    }, `still-${e}`) : null,
                    (0, F.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            background: e === `death` ? `linear-gradient(to bottom, rgba(40,5,5,0.35) 0%, rgba(5,8,15,0.55) 55%, rgba(5,8,15,0.88) 100%)` : `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`
                        }
                    }),
                    (0, F.jsxs)(`div`, {
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
                            (0, F.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 28 : 40,
                                    color: e === `death` ? `#ee6666` : `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                },
                                children: fe[e] ?? ``
                            }),
                            (0, F.jsx)(`div`, {
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
    function Bt({ open: e, isMobile: t, muted: r, onClose: a }) {
        return (0, F.jsx)(n, {
            children: e && (0, F.jsxs)(i.div, {
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
                    t ? (0, F.jsx)(i.div, {
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
                    }) : (0, F.jsx)(`video`, {
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
                    (0, F.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            background: t ? `radial-gradient(ellipse at center, rgba(80,0,100,0.35) 0%, rgba(0,0,0,0.65) 100%)` : `rgba(0,0,0,0.3)`
                        }
                    }),
                    (0, F.jsxs)(i.div, {
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
                            (0, F.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 26 : 32,
                                    color: `#cc44ee`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                },
                                children: `THE HUNTER STRIKES!`
                            }),
                            (0, F.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 14 : 16,
                                    color: `rgba(255,255,255,0.7)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    marginTop: 6
                                },
                                children: `Tentacles rake the hull`
                            }),
                            (0, F.jsx)(`div`, {
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
    var Vt = `/assets/score-DnnSqbJU.png`, Ht = `/icons/gold.png`, Ut = (e, t = 14)=>(0, F.jsx)(S, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    Wt = function({ walletAddress: e, account: t, username: r, onHome: o, onPlayDaily: re, dailySeed: le, isDaily: me, seedToken: E, shipId: O, resumeState: Fe, resumeRunId: Ie, resumeActions: Le }) {
        let { connect: Re, connecting: ze } = a(), [k, j] = (0, A.useState)(()=>Fe ?? he(le, O ?? `default`)), Be = (0, A.useRef)(!e), [Ue, We] = (0, A.useState)(()=>!m()), [M, Ge] = (0, A.useState)(null), [qe, Je] = (0, A.useState)(null), [Ye, Xe] = (0, A.useState)(!1), [tt, nt] = (0, A.useState)([]), [rt, it] = (0, A.useState)([]), [at, ot] = (0, A.useState)([]), st = (0, A.useRef)(0), [P, ct] = (0, A.useState)(null), lt = (0, A.useRef)((k.relics ?? []).length), [ut, dt] = (0, A.useState)(!1), [I, L] = (0, A.useState)({
            kind: `idle`
        }), [gt, vt] = (0, A.useState)(!1), bt = (0, A.useRef)(!1), [xt, St] = (0, A.useState)([]), [Ct, wt] = (0, A.useState)([]), [R, Tt] = (0, A.useState)(null), [Dt, Mt] = (0, A.useState)(0), [Nt, Pt] = (0, A.useState)(()=>c()), [Ft, It] = (0, A.useState)(!1), [z, B] = (0, A.useState)(()=>Ze()), [V, Wt] = (0, A.useState)(()=>$e()), Gt = (0, A.useRef)(V);
        Gt.current = V;
        let [Kt, qt] = (0, A.useState)(!1), [H, Jt] = (0, A.useState)(window.innerWidth < 768), U = (0, A.useRef)(me === !0), W = U.current;
        (0, A.useEffect)(()=>(p(U.current), ()=>p(!1)), []);
        let Yt = (0, A.useRef)(E), Xt = (0, A.useRef)(!1), [Zt, Qt] = (0, A.useState)(!1), [$t, en] = (0, A.useState)(!1);
        (0, A.useEffect)(()=>{
            if (k.gameOver) {
                Ge(null);
                return;
            }
            k.turn > 0 && Ve(`sail`), Ge(He(k));
        }, [
            k.turn,
            k.event,
            k.showPort,
            k.hunter?.active,
            k.stormDistance,
            k.gameOver
        ]);
        let tn = ()=>{
            M && (Ve(M.id), Ge(null));
        };
        (0, A.useEffect)(()=>{
            W && (ae(), e && b());
        }, []), (0, A.useEffect)(()=>{
            if (!e) {
                We(!m());
                return;
            }
            je(e, b()).then((e)=>{
                if (e) {
                    We(!1);
                    return;
                }
                m() && g(), We(!0);
            });
        }, [
            e
        ]);
        let G = (0, A.useRef)(Ie ?? crypto.randomUUID()), K = (0, A.useRef)(Le ? [
            ...Le
        ] : []), q = (e)=>{
            K.current.push(e);
        }, J = (0, A.useRef)([]);
        (0, A.useEffect)(()=>{
            let t = e;
            !t || k.gameOver || K.current.length !== 0 && u({
                run_id: G.current,
                wallet_address: t,
                seed: k.seed,
                ship_id: O ?? `default`,
                is_daily: U.current,
                seed_token: Yt.current ?? null,
                actions: K.current,
                turn: k.turn,
                score: k.score,
                saved_at: Date.now()
            });
        }, [
            k
        ]), (0, A.useEffect)(()=>{
            let e = K.current.length - 1;
            e < 0 || (J.current[e * 3] = k.score, J.current[e * 3 + 1] = k.ship.hull, J.current[e * 3 + 2] = k.rngState ?? -1);
        }, [
            k
        ]);
        let nn = (0, A.useRef)(0);
        (0, A.useEffect)(()=>{
            e && (Ie || De({
                run_id: G.current,
                wallet_address: e,
                username: r ?? null,
                seed: k.seed,
                is_daily: W,
                seed_token: E ?? null
            }));
        }, []), (0, A.useEffect)(()=>{
            !e || k.gameOver || k.turn - nn.current < 3 || (nn.current = k.turn, ke(G.current, {
                score: k.score,
                turn: k.turn,
                zone: k.currentZone ?? 1,
                gold: k.ship.gold,
                hull: k.ship.hull
            }));
        }, [
            k.turn
        ]);
        let rn = ()=>({
                run_id: G.current,
                wallet_address: e,
                seed: k.seed,
                ship_id: O ?? `default`,
                is_daily: U.current,
                actions: K.current,
                checks: K.current.flatMap((e, t)=>[
                        J.current[t * 3] ?? -1,
                        J.current[t * 3 + 1] ?? -1,
                        J.current[t * 3 + 2] ?? -1
                    ]),
                final_score: k.score,
                final_turn: k.turn
            }), an = async ()=>{
            if (!e) return;
            if (x()) {
                L({
                    kind: `combat_proto`
                });
                return;
            }
            if (!U.current && !Yt.current) {
                L({
                    kind: `local`
                });
                return;
            }
            let t = rn();
            L({
                kind: `sending`
            });
            try {
                await Oe(t);
            } catch (e) {
                console.warn(`[runlog]`, e), s(`runlog`, t), L({
                    kind: `queued`,
                    step: `log`
                });
                return;
            }
            try {
                let t = await Ne(G.current);
                if (t?.approved) {
                    if (dt(!0), L({
                        kind: `ok`,
                        daily: U.current
                    }), U.current && ae(), t.nft?.minted?.length) {
                        let e = t.nft.minted.map((e)=>typeof e == `string` ? e : e.nft).filter(Boolean);
                        St(e), wt(e);
                    }
                } else console.warn(`[approve] refuse :`, t?.raison ?? t), L({
                    kind: `rejected`,
                    raison: t?.raison ?? void 0
                }), U.current && je(e, b()).then((e)=>{
                    e || g();
                });
            } catch (e) {
                console.warn(`[approve]`, e), s(`approve`, {
                    run_id: G.current
                }), L({
                    kind: `queued`,
                    step: `approve`
                });
            }
        };
        (0, A.useEffect)(()=>{
            if (k.gameOver) {
                if (!e) {
                    L({
                        kind: `idle`
                    });
                    return;
                }
                if (!bt.current) {
                    if (bt.current = !0, Ae(G.current, {
                        score: k.score,
                        turn: k.turn,
                        zone: k.currentZone ?? 1,
                        gold: k.ship.gold,
                        hull: k.ship.hull,
                        run_title: k.runTitle
                    }), x()) {
                        console.warn(`[approve] skip : combat prototype (?combat=1)`), L({
                            kind: `combat_proto`
                        }), l();
                        return;
                    }
                    if (!U.current && !Yt.current) {
                        console.warn(`[approve] skip : seed local, run non soumise`), L({
                            kind: `local`
                        }), l();
                        return;
                    }
                    an(), l();
                }
            }
        }, [
            k.gameOver
        ]), (0, A.useEffect)(()=>{
            let e = (e)=>{
                let t = e.detail;
                !t?.run_id || t.run_id !== G.current || t.approved && (dt(!0), L({
                    kind: `ok`,
                    daily: W
                }), W && ae());
            };
            return window.addEventListener(`corsair-sync`, e), ()=>window.removeEventListener(`corsair-sync`, e);
        }, [
            W
        ]), (0, A.useEffect)(()=>{
            let e = ()=>Jt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [Y, X] = (0, A.useState)(null), [on, sn] = (0, A.useState)(!1), cn = (0, A.useRef)(null), ln = (0, A.useRef)(new Set), [un, dn] = (0, A.useState)(null);
        (0, A.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !k.gameOver || !W || !e || !n || ut && Me().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && dn({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            k.gameOver,
            ut
        ]);
        let fn = (0, A.useRef)({
            x: k.ship.x,
            y: k.ship.y
        }), [pn, mn] = (0, A.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [hn, gn] = (0, A.useState)({
            x: 0,
            y: 0
        });
        (0, A.useEffect)(()=>{
            let e = fn.current, t = k.ship.x - e.x, n = k.ship.y - e.y;
            if (fn.current = {
                x: k.ship.x,
                y: k.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = pe(k.ship.vision, H), i = .8;
            mn({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), gn({
                x: t,
                y: n
            });
            let a = setTimeout(()=>gn({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>mn({
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
        let [_n, Z] = (0, A.useState)(!1), [Q, vn] = (0, A.useState)(null), [yn, bn] = (0, A.useState)(null), [xn, Sn] = (0, A.useState)(0), Cn = ()=>{
            Xe(!0), setTimeout(()=>Xe(!1), 400);
        }, wn = (e)=>{
            bn(e), setTimeout(()=>bn(null), 150);
        }, $ = k, Tn = Math.min(100, (1 - $.stormDistance / 10) * 100), En = $.ship.hull <= 5 ? `#ee4444` : $.ship.hull <= 10 ? `#ee8844` : `#44cc88`, Dn = !$.escapeUsed && $.ship.upgrades.includes(`escape`) && $.event && $.event.choices[0].risk !== `safe`;
        (0, A.useEffect)(()=>{
            if (V || k.gameOver) return;
            let e = k.event?.cellType;
            e && (!w[e] && !D[e] || ln.current.has(e) || X(e));
        }, [
            k.event?.cellType,
            k.gameOver,
            V
        ]), (0, A.useEffect)(()=>{
            if (!Y || Y === `death`) return;
            let e = H ? 2200 : {
                ancient_kraken: 6500
            }[Y] ?? 5e3, t = setTimeout(()=>{
                ln.current.add(Y), X(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            Y,
            H
        ]);
        let On = (0, A.useRef)(1);
        (0, A.useEffect)(()=>{
            let e = k.currentZone ?? 1;
            if (e > On.current) {
                let t = On.current, n = Ce[e], r = Ce[t]?.transitionText ?? [], i = r.length > 0 ? [
                    ...r,
                    ``,
                    `You have entered:`,
                    n.name.toUpperCase()
                ] : [
                    `You have entered:`,
                    n.name.toUpperCase()
                ];
                V || (Tt({
                    lines: i,
                    zone: e
                }), Mt(0)), On.current = e;
            }
        }, [
            k.currentZone,
            V
        ]), (0, A.useEffect)(()=>{
            if (!R) return;
            if (Dt >= R.lines.length) {
                setTimeout(()=>Tt(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Mt((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            R,
            Dt
        ]), (0, A.useEffect)(()=>{
            k.dangerStreak > st.current && (st.current = k.dangerStreak);
        }, [
            k.dangerStreak
        ]), (0, A.useEffect)(()=>{
            if (k.gameOver) {
                let e = ee(k);
                e.length > 0 && (it(e), N(`streak`));
                let t = d({
                    score: k.score,
                    turn: k.turn,
                    zone: k.currentZone ?? 1,
                    gold: k.ship.gold,
                    hunterAttacksSurvived: k.hunterAttacksSurvived ?? 0,
                    peakStreak: st.current,
                    hadStreak5: (k.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if (ot(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (Pt(t.pb), It(!0)), l(), Gt.current) Z(!1), X(null), sn(!0);
                else if (H) Z(!1), X(`death`), cn.current = setTimeout(()=>{
                    sn((e)=>e || !0), X(null);
                }, 2200);
                else {
                    let e = kn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Z(!1), X(`death`), cn.current = setTimeout(()=>{
                            sn((e)=>e || !0), X(null);
                        }, 9e3);
                    }, e);
                }
            } else cn.current &&= (clearTimeout(cn.current), null), sn(!1), X(null), ln.current.clear(), st.current = 0, ot([]), It(!1);
        }, [
            k.gameOver,
            H
        ]);
        let kn = (0, A.useRef)(!1), An = (0, A.useRef)(-99), jn = (0, A.useRef)(null);
        (0, A.useEffect)(()=>{
            V || k.log?.includes(`Tentacles rake the hull`) && (k.turn - An.current < 3 || (An.current = k.turn, jn.current && clearTimeout(jn.current), kn.current = !0, Z(!0), jn.current = setTimeout(()=>{
                kn.current = !1, Z(!1);
            }, H ? 2e3 : 7200)));
        }, [
            k.log,
            k.turn,
            H,
            V
        ]), (0, A.useEffect)(()=>{
            V && (Y && Y !== `death` && (ln.current.add(Y), X(null)), Y === `death` && (X(null), sn(!0)), Tt(null), kn.current = !1, Z(!1));
        }, [
            V
        ]), (0, A.useEffect)(()=>{
            if (!_n) return;
            let e = ()=>{
                kn.current = !1, Z(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            _n
        ]), (0, A.useEffect)(()=>{
            if (k.log?.includes(`⚡ Storm surge`) && wn(`rgba(100,150,255,0.35)`), k.log?.includes(`Storm Rider surfs`) && wn(`rgba(50,200,160,0.32)`), k.event?.cellType === `ancient_kraken` ? wn(`rgba(200,160,48,0.4)`) : k.event?.cellType === `kraken` && wn(`rgba(150,0,255,0.3)`), k.hunter?.active) {
                let e = de(k);
                Sn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else Sn(0);
        }, [
            k
        ]), (0, A.useEffect)(()=>{
            let e = (e)=>{
                if (k.gameOver || k.event || k.pirateDuel || k.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && Mn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && Mn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && Mn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            k.gameOver,
            k.event,
            k.pirateDuel,
            k.showPort,
            k.turn
        ]);
        let Mn = (e, t)=>{
            q(e === -1 ? 0 : e === 1 ? 2 : 1), j((n)=>v(n, e, t));
        }, Nn = (e)=>{
            q(10 + e), j((t)=>{
                let n = oe(t, e);
                return n.ship.hull < t.ship.hull && Cn(), n;
            });
        }, Pn = (e)=>{
            Xt.current || (Xt.current = !0, window.setTimeout(()=>{
                Xt.current = !1;
            }, 280), q(80 + e), j((t)=>{
                let n = Ee(t, e);
                return n.ship.hull < t.ship.hull && Cn(), n;
            }));
        }, Fn = ()=>{
            q(20), j((e)=>h(e));
        }, In = (e)=>{
            q(e === `hull` ? 30 : e === `weapon` ? 31 : 32), j((t)=>ce(t, e));
        }, Ln = async ()=>{
            if (e) {
                en(!0), Qt(!1);
                let t = await Pe(e);
                if (en(!1), !t) {
                    Qt(!0);
                    return;
                }
                U.current = !1, p(!1), Yt.current = t.seed_token;
                let n = he(t.seed, O ?? `default`);
                K.current = [], J.current = [], nn.current = 0, G.current = crypto.randomUUID(), bt.current = !1, dt(!1), L({
                    kind: `idle`
                }), vt(!1), St([]), wt([]), De({
                    run_id: G.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), j(n);
                return;
            }
            U.current = !1, p(!1);
            let t = he(void 0, O ?? `default`);
            K.current = [], J.current = [], nn.current = 0, G.current = crypto.randomUUID(), bt.current = !1, dt(!1), L({
                kind: `idle`
            }), vt(!1), St([]), wt([]), j(t);
        }, Rn = (0, A.useRef)(null);
        (0, A.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = Ze(), n.play().catch(()=>{}), Rn.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), Rn.current && (Rn.current.pause(), Rn.current.currentTime = 0);
            };
        }, []), (0, A.useEffect)(()=>{
            Rn.current && (Rn.current.muted = z), Ke(z), Qe(z);
        }, [
            z
        ]), (0, A.useEffect)(()=>{
            et(V);
        }, [
            V
        ]);
        let zn = ()=>B((e)=>!e), Bn = ()=>Wt((e)=>!e), Vn = (0, A.useRef)({
            gold: k.ship.gold,
            hull: k.ship.hull,
            zone: k.currentZone ?? 1,
            over: k.gameOver,
            mult: k.scoreMultiplier ?? 1,
            hmode: k.hunter?.mode ?? ``,
            storm: k.stormDistance
        });
        return (0, A.useEffect)(()=>{
            let e = Vn.current, t = !!k.log?.includes(`Tentacles rake`);
            if (k.gameOver && !e.over) N(`death`);
            else if (!k.gameOver) {
                k.ship.gold > e.gold && N(`gold`), k.ship.gold < e.gold && k.showPort && N(`buy`), t ? N(`hunter_attack`) : k.ship.hull < e.hull && N(`damage`), (k.currentZone ?? 1) !== e.zone && N(`zone`), (k.scoreMultiplier ?? 1) > e.mult && N(`streak`);
                let n = k.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && N(`hunter_near`), k.stormDistance < e.storm && k.stormDistance <= 4 && k.stormDistance > 0 && (N(`thunder`), Cn());
            }
            Vn.current = {
                gold: k.ship.gold,
                hull: k.ship.hull,
                zone: k.currentZone ?? 1,
                over: k.gameOver,
                mult: k.scoreMultiplier ?? 1,
                hmode: k.hunter?.mode ?? ``,
                storm: k.stormDistance
            };
            let n = (k.relics ?? []).length;
            if (n > lt.current) {
                let e = (k.relics ?? [])[n - 1], t = y(e);
                t && (ct(t), N(`streak`));
            }
            lt.current = n;
        }, [
            k
        ]), (0, F.jsxs)(i.div, {
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
                boxShadow: $.stormDistance <= 2 ? `inset 0 0 80px rgba(220,30,30,0.6)` : $.stormDistance <= 4 ? `inset 0 0 50px rgba(220,100,30,0.3)` : `none`,
                color: `#e8e0d0`,
                fontFamily: `'Pirata One', cursive`,
                display: `flex`,
                flexDirection: `column`,
                overflow: `hidden`,
                position: `relative`
            },
            children: [
                (0, F.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, F.jsx)(i.div, {
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
                                backgroundImage: `url(${ye[$.currentZone ?? 1] ?? ye[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, $.currentZone ?? 1),
                        (0, F.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        }),
                        (0, F.jsx)(i.div, {
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
                                background: ($.currentZone ?? 1) === 3 ? `radial-gradient(ellipse at 50% 42%, transparent 18%, rgba(50,8,70,0.35) 55%, rgba(0,0,0,0.72) 100%)` : ($.currentZone ?? 1) === 2 ? `radial-gradient(ellipse at 50% 42%, transparent 20%, rgba(55,25,95,0.32) 58%, rgba(4,6,18,0.7) 100%)` : `radial-gradient(ellipse at 50% 42%, transparent 22%, rgba(15,55,85,0.28) 60%, rgba(4,10,18,0.65) 100%)`
                            }
                        }, `vig-${$.currentZone ?? 1}`)
                    ]
                }),
                yn && (0, F.jsx)(i.div, {
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
                        background: yn,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                xn > 0 && (0, F.jsx)(i.div, {
                    animate: {
                        opacity: [
                            xn,
                            xn * .6,
                            xn
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
                $.ship.hull <= 5 && !$.gameOver && (0, F.jsx)(i.div, {
                    animate: {
                        opacity: [
                            .4,
                            0,
                            .4
                        ]
                    },
                    transition: {
                        repeat: 1 / 0,
                        duration: $.ship.hull <= 1 ? .4 : $.ship.hull <= 3 ? .6 : 1
                    },
                    style: {
                        position: `fixed`,
                        inset: 0,
                        background: `radial-gradient(ellipse at center, transparent 50%, rgba(220,30,30,0.5) 100%)`,
                        zIndex: 97,
                        pointerEvents: `none`
                    }
                }),
                (0, F.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        padding: H ? `calc(6px + env(safe-area-inset-top)) 8px 6px` : `8px 18px`,
                        background: `linear-gradient(180deg, rgba(6,12,20,0.78) 0%, rgba(6,12,20,0.42) 100%)`,
                        borderBottom: `1px solid rgba(255,255,255,0.05)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5,
                        backdropFilter: `blur(6px)`,
                        gap: H ? 6 : 12,
                        minWidth: 0
                    },
                    children: [
                        (0, F.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: H ? 4 : 8,
                                flexShrink: 0
                            },
                            children: [
                                (0, F.jsx)(`img`, {
                                    src: f,
                                    style: {
                                        width: H ? 22 : 36,
                                        height: H ? 22 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !H && (0, F.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                !H && (()=>{
                                    let e = we.find((e)=>e.id === ($.shipType ?? `default`)) ?? we[0], t = Ce[$.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, F.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: 2,
                                            padding: `2px 8px 2px 2px`,
                                            borderRadius: 7,
                                            border: `1px solid rgba(200,160,48,0.28)`,
                                            background: `rgba(200,160,48,0.07)`,
                                            fontSize: 10,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: 200,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, F.jsx)(`img`, {
                                                src: Te(e.id),
                                                alt: ``,
                                                style: {
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 4,
                                                    objectFit: `cover`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, F.jsxs)(`span`, {
                                                style: {
                                                    display: `flex`,
                                                    flexDirection: `column`,
                                                    lineHeight: 1.15,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    (0, F.jsx)(`span`, {
                                                        children: e.name
                                                    }),
                                                    (0, F.jsx)(`span`, {
                                                        style: {
                                                            fontSize: 9,
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
                        (0, F.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: H ? 8 : 16,
                                alignItems: `flex-end`,
                                flex: 1,
                                minWidth: 0,
                                justifyContent: H ? `center` : `flex-end`
                            },
                            children: (H ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${$.ship.hull}/${$.ship.maxHull}`,
                                    color: En
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: $.ship.gold,
                                    color: `#eedd44`
                                }
                            ] : [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${$.ship.hull}/${$.ship.maxHull}`,
                                    color: En
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: $.ship.gold,
                                    color: `#eedd44`
                                },
                                {
                                    icon: `vision`,
                                    label: `VISION`,
                                    val: ($.visionBlind ?? 0) > 0 ? `${$.ship.vision}~` : $.ship.vision,
                                    color: ($.visionBlind ?? 0) > 0 ? `#88aacc` : `#6aaccc`
                                },
                                {
                                    icon: `power`,
                                    label: `POWER`,
                                    val: $.ship.power,
                                    color: `#ee8844`
                                },
                                {
                                    icon: `turn`,
                                    label: `TURN`,
                                    val: $.turn,
                                    color: `rgba(255,255,255,0.45)`
                                }
                            ]).map((e)=>(0, F.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`,
                                        flexShrink: 0
                                    },
                                    children: [
                                        (0, F.jsx)(`div`, {
                                            style: {
                                                fontSize: 9,
                                                color: `rgba(255,255,255,0.4)`,
                                                letterSpacing: 1.2,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: e.label
                                        }),
                                        (0, F.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 3,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, F.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: Ht,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: H ? 16 : 22,
                                                        height: H ? 16 : 22,
                                                        objectFit: `contain`,
                                                        opacity: .9
                                                    }
                                                }),
                                                (0, F.jsx)(`span`, {
                                                    style: {
                                                        fontSize: H ? 14 : 16,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        (0, F.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: H ? 4 : 12,
                                flexShrink: 0
                            },
                            children: [
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        fontSize: H ? 16 : 18,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 3,
                                        minWidth: H ? 56 : void 0,
                                        justifyContent: `flex-end`
                                    },
                                    children: [
                                        (0, F.jsx)(`img`, {
                                            src: Vt,
                                            style: {
                                                width: H ? 20 : 28,
                                                height: H ? 20 : 28,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, F.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: .5
                                            },
                                            children: $.score
                                        }),
                                        !H && (0, F.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(238,221,68,0.55)`,
                                                fontWeight: 500
                                            },
                                            children: `pts`
                                        })
                                    ]
                                }),
                                (0, F.jsx)(`button`, {
                                    onClick: zn,
                                    "aria-label": z ? `Unmute sound` : `Mute sound`,
                                    title: z ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.12)`,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontSize: H ? 8 : 10,
                                        letterSpacing: .5,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`,
                                        borderRadius: 6,
                                        minWidth: H ? 36 : void 0,
                                        minHeight: H ? 36 : void 0,
                                        padding: H ? `0 4px` : `4px 8px`
                                    },
                                    children: z ? `MUTE` : H ? `SND` : `SOUND`
                                }),
                                (0, F.jsx)(`button`, {
                                    onClick: Bn,
                                    "aria-label": V ? `Play cinematics` : `Skip cinematics`,
                                    title: V ? `Cinematics off — click to restore` : `Skip scene / portal / death videos`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.12)`,
                                        color: V ? `#c8a030` : `rgba(255,255,255,0.5)`,
                                        fontSize: H ? 8 : 10,
                                        letterSpacing: .5,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`,
                                        borderRadius: 6,
                                        minWidth: H ? 36 : void 0,
                                        minHeight: H ? 36 : void 0,
                                        padding: H ? `0 4px` : `4px 8px`
                                    },
                                    children: V ? `SKIP` : `CINE`
                                })
                            ]
                        })
                    ]
                }),
                H && ($.relics ?? []).length > 0 && (0, F.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: ($.relics ?? []).map((e)=>{
                        let t = y(e);
                        return t ? (0, F.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, F.jsx)(`img`, {
                                src: se(e),
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
                H && $.hunter?.active && !$.pirateDuel && (()=>{
                    let e = ue($), t = de($), n = T($);
                    return (0, F.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, F.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, F.jsx)(S, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, F.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: $.hunter.mode === `frenzy` ? `#ff6666` : $.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            Ut($.hunter.mode),
                                            xe($.hunter.mode)
                                        ]
                                    }),
                                    (0, F.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: be(e)
                                    }),
                                    (0, F.jsxs)(`div`, {
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
                            (0, F.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, F.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, F.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${$.hunter.awareness}%`,
                                                background: $.hunter.awareness >= C.hunter.frenzyAwareness ? `#ee4444` : $.hunter.awareness >= C.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, F.jsxs)(`span`, {
                                        style: {
                                            fontSize: 9,
                                            color: `rgba(255,255,255,0.4)`,
                                            fontFamily: `'Cinzel', serif`,
                                            whiteSpace: `nowrap`
                                        },
                                        children: [
                                            `AWARENESS `,
                                            $.hunter.awareness,
                                            `%`
                                        ]
                                    })
                                ]
                            }),
                            (0, F.jsx)(`div`, {
                                style: {
                                    fontSize: 10,
                                    color: `rgba(255,255,255,0.4)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    lineHeight: 1.25
                                },
                                children: ve($.hunter.mode)
                            })
                        ]
                    });
                })(),
                (0, F.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, F.jsxs)(`div`, {
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
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        background: Tn > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${Tn > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, F.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: Tn > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, F.jsx)(S, {
                                                    name: `storm`,
                                                    size: 13
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, F.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `baseline`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, F.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: Tn > 70 ? `#ee4444` : `#ee8844`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        lineHeight: 1
                                                    },
                                                    children: $.stormDistance
                                                }),
                                                (0, F.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.45)`,
                                                        fontFamily: `'IM Fell English', cursive`
                                                    },
                                                    children: `turns left`
                                                })
                                            ]
                                        }),
                                        (0, F.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 6
                                            },
                                            children: (0, F.jsx)(i.div, {
                                                animate: {
                                                    width: `${Tn}%`
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
                                $.hunter?.active && (()=>{
                                    let e = ue($), t = de($), n = T($), r = t === `critical` || t === `danger`;
                                    return (0, F.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${$.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : $.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 8,
                                            padding: `8px 9px`
                                        },
                                        children: [
                                            (0, F.jsxs)(`div`, {
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
                                                    (0, F.jsx)(S, {
                                                        name: `kraken`,
                                                        size: 13
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    display: `inline-block`,
                                                    padding: `1px 7px`,
                                                    borderRadius: 5,
                                                    fontSize: 10,
                                                    letterSpacing: 1.5,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 4,
                                                    background: $.hunter.mode === `frenzy` ? `rgba(220,30,30,0.3)` : $.hunter.mode === `stalking` ? `rgba(180,30,180,0.3)` : $.hunter.mode === `searching` ? `rgba(30,100,180,0.3)` : `rgba(255,255,255,0.06)`,
                                                    color: $.hunter.mode === `frenzy` ? `#ff6666` : $.hunter.mode === `stalking` ? `#dd88ff` : $.hunter.mode === `searching` ? `#66aaff` : `rgba(255,255,255,0.55)`,
                                                    border: `1px solid ${$.hunter.mode === `frenzy` ? `rgba(220,30,30,0.6)` : $.hunter.mode === `stalking` ? `rgba(180,30,180,0.5)` : `rgba(255,255,255,0.1)`}`
                                                },
                                                children: [
                                                    Ut($.hunter.mode, 12),
                                                    xe($.hunter.mode)
                                                ]
                                            }),
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: e <= 1 ? `#ff5566` : e <= 3 ? `#eeaa66` : `rgba(255,255,255,0.55)`,
                                                    fontFamily: `'Cinzel', serif`,
                                                    letterSpacing: .5,
                                                    marginBottom: 2
                                                },
                                                children: [
                                                    be(e),
                                                    ` · ≈−`,
                                                    n,
                                                    ` hull`
                                                ]
                                            }),
                                            (0, F.jsx)(`div`, {
                                                style: {
                                                    fontSize: 10,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    fontFamily: `'IM Fell English', cursive`,
                                                    marginBottom: 4,
                                                    lineHeight: 1.25
                                                },
                                                children: ve($.hunter.mode)
                                            }),
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 6,
                                                    marginTop: 2
                                                },
                                                children: [
                                                    (0, F.jsx)(`div`, {
                                                        style: {
                                                            flex: 1,
                                                            height: 3,
                                                            background: `rgba(255,255,255,0.06)`,
                                                            borderRadius: 2
                                                        },
                                                        children: (0, F.jsx)(i.div, {
                                                            animate: {
                                                                width: `${$.hunter.awareness}%`
                                                            },
                                                            transition: {
                                                                duration: .5
                                                            },
                                                            style: {
                                                                height: 3,
                                                                borderRadius: 2,
                                                                background: $.hunter.awareness >= C.hunter.frenzyAwareness ? `#ee4444` : $.hunter.awareness >= C.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`
                                                            }
                                                        })
                                                    }),
                                                    (0, F.jsxs)(`span`, {
                                                        style: {
                                                            fontSize: 9,
                                                            color: `rgba(255,255,255,0.38)`,
                                                            fontFamily: `'Cinzel', serif`,
                                                            whiteSpace: `nowrap`
                                                        },
                                                        children: [
                                                            $.hunter.awareness,
                                                            `%`
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })(),
                                (0, F.jsx)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.35)`,
                                        letterSpacing: 2,
                                        marginTop: 4,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: `EQUIPPED`
                                }),
                                $.ship.upgrades.length === 0 ? (0, F.jsx)(`div`, {
                                    style: {
                                        fontSize: 12,
                                        color: `rgba(255,255,255,0.28)`,
                                        fontStyle: `italic`,
                                        fontFamily: `'IM Fell English', cursive`
                                    },
                                    children: `None yet`
                                }) : $.ship.upgrades.map((e)=>{
                                    let t = mt.find((t)=>t.id === e), n = e === `escape` && !$.escapeUsed, r = e === `escape` && $.escapeUsed;
                                    return (0, F.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: r ? `rgba(255,255,255,0.28)` : ht[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 5
                                        },
                                        children: [
                                            (0, F.jsx)(`img`, {
                                                src: ft[e],
                                                style: {
                                                    width: 16,
                                                    height: 16,
                                                    objectFit: `contain`,
                                                    opacity: r ? .4 : 1
                                                }
                                            }),
                                            (0, F.jsx)(`span`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: t.name
                                            }),
                                            n && (0, F.jsx)(`span`, {
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
                                            r && (0, F.jsx)(`span`, {
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
                                $.upgradeToken && (0, F.jsxs)(`div`, {
                                    style: {
                                        fontSize: 11,
                                        color: `#eedd44`,
                                        marginTop: 2,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 5
                                    },
                                    children: [
                                        (0, F.jsx)(S, {
                                            name: `star`,
                                            size: 12
                                        }),
                                        ` Free upgrade at port`
                                    ]
                                }),
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        marginTop: 6
                                    },
                                    children: [
                                        (0, F.jsx)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: `rgba(255,255,255,0.28)`,
                                                letterSpacing: 2,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 6
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, F.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 6
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: Ot,
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
                                                    img: At,
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
                                                    img: kt,
                                                    color: `#6aaccc`,
                                                    sub: [
                                                        `Basic`,
                                                        `Chart`,
                                                        `Star Reader`
                                                    ]
                                                }
                                            ].map((e)=>{
                                                let t = $.ship.levels[e.key], n = t === 2, r = e.color, a = [
                                                    `I`,
                                                    `II`,
                                                    `III`
                                                ], o = e.key === `hull` ? `Hull ${$.ship.maxHull}` : e.key === `weapon` ? `Power ${$.ship.power}` : `Vision ${$.ship.vision}`;
                                                return (0, F.jsxs)(i.div, {
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
                                                        (0, F.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 4
                                                            },
                                                            children: [
                                                                (0, F.jsx)(`img`, {
                                                                    src: e.img,
                                                                    alt: ``,
                                                                    style: {
                                                                        width: 16,
                                                                        height: 16,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, F.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        (0, F.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 12,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: .5
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, F.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.35)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, F.jsxs)(`div`, {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: r,
                                                                        fontFamily: `'Cinzel', serif`,
                                                                        fontWeight: 700,
                                                                        textAlign: `right`
                                                                    },
                                                                    children: [
                                                                        o,
                                                                        n ? ` ★` : ``
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        (0, F.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, n)=>(0, F.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        n > 0 && (0, F.jsx)(`div`, {
                                                                            style: {
                                                                                width: 6,
                                                                                height: 1,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, F.jsx)(`div`, {
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
                                                                            children: (0, F.jsx)(`span`, {
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
                        (0, F.jsx)(_e, {
                            state: $,
                            isMobile: H,
                            slide: pn,
                            lurch: hn,
                            onboard: M,
                            onDismissOnboard: tn,
                            onMove: Mn
                        }),
                        (0, F.jsxs)(`div`, {
                            style: {
                                width: H ? 0 : 200,
                                minWidth: H ? 0 : 200,
                                padding: H ? 0 : `12px 10px`,
                                display: H ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                borderLeft: `1px solid rgba(255,255,255,0.04)`,
                                pointerEvents: $.showPort ? `none` : `auto`,
                                opacity: $.showPort ? .35 : 1,
                                overflow: `hidden`,
                                background: `linear-gradient(270deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.4)`,
                                        letterSpacing: 2,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        $.showPort ? `UPGRADES` : `EQUIPPED`,
                                        !$.showPort && (0, F.jsx)(`span`, {
                                            style: {
                                                color: `rgba(255,255,255,0.22)`,
                                                marginLeft: 6
                                            },
                                            children: `· buy at port`
                                        })
                                    ]
                                }),
                                (0, F.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 4,
                                        overflowY: `auto`
                                    },
                                    children: [
                                        !$.showPort && $.ship.upgrades.length === 0 && (0, F.jsx)(`div`, {
                                            style: {
                                                fontSize: 12,
                                                color: `rgba(255,255,255,0.3)`,
                                                fontStyle: `italic`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                padding: `4px 2px`
                                            },
                                            children: `None yet — dock to buy`
                                        }),
                                        mt.filter((e)=>$.showPort || $.ship.upgrades.includes(e.id)).map((e)=>{
                                            let t = $.ship.upgrades.includes(e.id), n = tt.includes(e.id), r = $.upgradeToken && $.showPort, i = r ? 0 : e.cost, a = !t && !n && $.ship.gold >= i && $.showPort, o = ht[e.build], s = t || $.showPort;
                                            return (0, F.jsxs)(`div`, {
                                                onClick: ()=>{
                                                    $.showPort && (n ? nt((t)=>t.filter((t)=>t !== e.id)) : a && nt((t)=>[
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
                                                    (0, F.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            gap: 4
                                                        },
                                                        children: [
                                                            (0, F.jsxs)(`span`, {
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
                                                                    (0, F.jsx)(`img`, {
                                                                        src: ft[e.id],
                                                                        style: {
                                                                            width: 18,
                                                                            height: 18,
                                                                            objectFit: `contain`,
                                                                            flexShrink: 0
                                                                        }
                                                                    }),
                                                                    (0, F.jsx)(`span`, {
                                                                        style: {
                                                                            overflow: `hidden`,
                                                                            textOverflow: `ellipsis`,
                                                                            whiteSpace: `nowrap`
                                                                        },
                                                                        children: e.name
                                                                    })
                                                                ]
                                                            }),
                                                            t ? (0, F.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: o
                                                                },
                                                                children: `✓`
                                                            }) : n ? (0, F.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 10,
                                                                    color: `#44cc88`
                                                                },
                                                                children: `✓`
                                                            }) : (0, F.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: `#eedd44`,
                                                                    flexShrink: 0
                                                                },
                                                                children: r && $.showPort ? `FREE` : e.cost + `g`
                                                            })
                                                        ]
                                                    }),
                                                    s && (0, F.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, F.jsx)(_t, {
                                                            pros: e.pros,
                                                            cons: e.cons,
                                                            fontSize: 10,
                                                            opacity: .45
                                                        })
                                                    })
                                                ]
                                            }, e.id);
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                (0, F.jsx)(zt, {
                    cinematic: Y,
                    isMobile: H,
                    muted: z,
                    zone: $.currentZone ?? 1,
                    onDeathEnd: ()=>sn(!0),
                    onClose: ()=>{
                        Y && ln.current.add(Y), X(null);
                    }
                }),
                (0, F.jsx)(n, {
                    children: R && (0, F.jsxs)(i.div, {
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
                        onClick: ()=>Tt(null),
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
                            ye[R.zone] && (0, F.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${ye[R.zone]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    opacity: .28,
                                    filter: `saturate(0.7) brightness(0.55)`
                                }
                            }),
                            (0, F.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)`
                                }
                            }),
                            (0, F.jsx)(i.div, {
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
                                children: (0, F.jsx)(S, {
                                    name: `vortex`,
                                    size: H ? 72 : 96
                                })
                            }),
                            (0, F.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: H ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: R.lines.slice(0, Dt + 1).map((e, t)=>{
                                    let n = e === R.lines[R.lines.length - 1] && Dt >= R.lines.length - 1, r = e === `You have entered:`;
                                    return e ? (0, F.jsx)(i.div, {
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
                                    }, t) : (0, F.jsx)(`div`, {
                                        style: {
                                            height: 12
                                        }
                                    }, t);
                                })
                            }),
                            (0, F.jsx)(i.div, {
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
                (0, F.jsx)(n, {
                    children: P && (()=>{
                        let e = P.rarity === `legendary` ? `#eedd44` : P.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = P.rarity.toUpperCase();
                        return (0, F.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>ct(null),
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
                                (0, F.jsx)(i.div, {
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
                                (0, F.jsxs)(i.div, {
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
                                        (0, F.jsx)(i.div, {
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
                                        (0, F.jsx)(i.div, {
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
                                        (0, F.jsx)(`img`, {
                                            src: se(P.id),
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
                                (0, F.jsxs)(i.div, {
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
                                (0, F.jsx)(i.div, {
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
                                (0, F.jsx)(i.div, {
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
                                (0, F.jsx)(i.div, {
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
                (0, F.jsx)(n, {
                    children: $.pirateDuel && !Y && !$.gameOver && !$.showPort && (0, F.jsx)(i.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        style: {
                            position: `fixed`,
                            inset: 0,
                            zIndex: 110,
                            display: `flex`,
                            alignItems: H ? `flex-start` : `center`,
                            justifyContent: `center`,
                            padding: H ? `calc(10px + env(safe-area-inset-top)) 10px calc(12px + env(safe-area-inset-bottom))` : 20,
                            overflowY: `auto`,
                            WebkitOverflowScrolling: `touch`,
                            background: `rgba(4,2,6,0.78)`,
                            backdropFilter: `blur(3px)`,
                            pointerEvents: `auto`
                        },
                        children: (0, F.jsx)(Et, {
                            duel: $.pirateDuel,
                            ship: $.ship,
                            isMobile: H,
                            log: $.log,
                            notoriety: $.notoriety ?? 0,
                            onAction: Pn
                        })
                    }, `pirate-duel`)
                }),
                (0, F.jsx)(n, {
                    children: $.event && !$.pirateDuel && !$.gameOver && !$.showPort && fe[$.event.cellType] && (0, F.jsx)(yt, {
                        variant: `scene`,
                        event: $.event,
                        isMobile: H,
                        gold: $.ship.gold,
                        hull: $.ship.hull,
                        relics: $.relics,
                        upgrades: $.ship.upgrades,
                        score: $.score,
                        onboard: M,
                        onDismissOnboard: tn,
                        onChoose: Nn,
                        canEscape: !!Dn,
                        onSkip: Fn,
                        interactive: !Y || Y === `death`
                    }, `event-scene`)
                }),
                (0, F.jsx)(n, {
                    children: $.event && !$.pirateDuel && !$.gameOver && !$.showPort && $.event.cellType && !D[$.event.cellType] && (0, F.jsx)(yt, {
                        variant: `compact`,
                        event: $.event,
                        isMobile: H,
                        gold: $.ship.gold,
                        hull: $.ship.hull,
                        relics: $.relics,
                        upgrades: $.ship.upgrades,
                        cellIcon: ge[$.event.cellType],
                        onboard: M,
                        onDismissOnboard: tn,
                        onChoose: Nn,
                        canEscape: !!Dn,
                        onSkip: Fn,
                        interactive: !Y || Y === `death`
                    }, `event-compact`)
                }),
                (0, F.jsx)(jt, {
                    open: !!$.showPort && !$.gameOver,
                    isMobile: H,
                    ship: $.ship,
                    portUpgrades: $.portUpgrades,
                    upgradeToken: !!$.upgradeToken,
                    maxedComponents: $.maxedComponents,
                    cart: tt,
                    setCart: nt,
                    onboard: M,
                    onDismissOnboard: tn,
                    onUpgradeComponent: In,
                    onReroll: ()=>{
                        q(40), j((e)=>ne(e));
                    },
                    freeReroll: $.shipType === `merchant` && !!$.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        q(n), j((n)=>te(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of tt)q(50 + pt.indexOf(e));
                        q(70), j((e)=>{
                            let t = e;
                            for (let e of tt)t = _(t, e);
                            return ie(t);
                        }), nt([]);
                    }
                }),
                (0, F.jsx)(Lt, {
                    open: on,
                    state: $,
                    isMobile: H,
                    isDailyRun: W,
                    personalBest: Nt,
                    isNewRecord: Ft,
                    newFeats: rt,
                    nearFeats: at,
                    submitStatus: I,
                    onRetrySubmit: ()=>{
                        an();
                    },
                    nftMinted: xt,
                    walletAddress: e,
                    account: t,
                    onChainDone: gt,
                    setOnChainDone: vt,
                    submitting: Kt,
                    setSubmitting: qt,
                    connecting: ze,
                    onConnect: ()=>Re(),
                    showGuestDailyCta: !!(e && Be.current && !W && Ue && re),
                    onPlayDaily: re,
                    rangMois: un,
                    harborDown: Zt,
                    restarting: $t,
                    onRestart: Ln,
                    onHome: o,
                    onWatchReplay: K.current.length > 0 ? ()=>{
                        Je({
                            seed: $.seed,
                            shipId: O ?? `default`,
                            actions: [
                                ...K.current
                            ],
                            label: W ? `Daily Challenge` : $.runTitle || `Corsair`,
                            finalScore: $.score
                        });
                    } : void 0
                }),
                qe && (0, F.jsx)(Se, {
                    payload: qe,
                    isMobile: H,
                    onClose: ()=>Je(null)
                }),
                Ct.length > 0 && (0, F.jsx)(Rt, {
                    queue: Ct,
                    isMobile: H,
                    onDismiss: ()=>wt((e)=>e.slice(1))
                }),
                (0, F.jsx)(Bt, {
                    open: _n,
                    isMobile: H,
                    muted: z,
                    onClose: ()=>{
                        kn.current = !1, Z(!1);
                    }
                }),
                H && (0, F.jsxs)(F.Fragment, {
                    children: [
                        !$.event && !$.showPort && !$.gameOver && !$.pirateDuel && (0, F.jsxs)(`div`, {
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
                                (0, F.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>vn(Q === `ship` ? null : `ship`),
                                    "aria-label": `Show ship status`,
                                    "aria-expanded": Q === `ship`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${Q === `ship` ? `#44cc88` : `rgba(255,255,255,0.2)`}`,
                                        background: Q === `ship` ? `rgba(68,204,136,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: Q === `ship` ? `#44cc88` : `rgba(255,255,255,0.6)`,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: (0, F.jsx)(S, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, F.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>vn(Q === `upgrades` ? null : `upgrades`),
                                    "aria-label": `Show upgrades`,
                                    "aria-expanded": Q === `upgrades`,
                                    style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        border: `1px solid ${Q === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.2)`}`,
                                        background: Q === `upgrades` ? `rgba(200,160,48,0.2)` : `rgba(0,0,0,0.7)`,
                                        color: Q === `upgrades` ? `#c8a030` : `rgba(255,255,255,0.6)`,
                                        cursor: `pointer`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        justifyContent: `center`
                                    },
                                    children: (0, F.jsx)(S, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, F.jsx)(n, {
                            children: Q && (0, F.jsxs)(i.div, {
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
                                    Q === `ship` && (0, F.jsxs)(F.Fragment, {
                                        children: [
                                            (0, F.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, F.jsxs)(`div`, {
                                                style: {
                                                    display: `flex`,
                                                    gap: 12,
                                                    marginBottom: 10,
                                                    fontFamily: `'Cinzel', serif`,
                                                    fontSize: 12
                                                },
                                                children: [
                                                    (0, F.jsxs)(`span`, {
                                                        style: {
                                                            color: `#eedd44`
                                                        },
                                                        children: [
                                                            `Score `,
                                                            $.score
                                                        ]
                                                    }),
                                                    (0, F.jsxs)(`span`, {
                                                        style: {
                                                            color: `rgba(255,255,255,0.45)`
                                                        },
                                                        children: [
                                                            `Turn `,
                                                            $.turn
                                                        ]
                                                    }),
                                                    (0, F.jsxs)(`span`, {
                                                        style: {
                                                            color: `#ee8844`
                                                        },
                                                        children: [
                                                            `Power `,
                                                            $.ship.power
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, F.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            $.ship.upgrades.length === 0 ? (0, F.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : $.ship.upgrades.map((e)=>{
                                                let t = mt.find((t)=>t.id === e), n = e === `escape` && !$.escapeUsed, r = e === `escape` && $.escapeUsed;
                                                return (0, F.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: r ? `rgba(255,255,255,0.3)` : `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, F.jsx)(`img`, {
                                                            src: ft[e],
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`,
                                                                opacity: r ? .45 : 1
                                                            }
                                                        }),
                                                        (0, F.jsx)(`span`, {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: t.name
                                                        }),
                                                        n && (0, F.jsx)(`span`, {
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
                                                        r && (0, F.jsx)(`span`, {
                                                            style: {
                                                                fontSize: 9,
                                                                letterSpacing: 1,
                                                                color: `rgba(255,255,255,0.3)`,
                                                                fontFamily: `'Cinzel', serif`
                                                            },
                                                            children: `USED`
                                                        })
                                                    ]
                                                }, e);
                                            }),
                                            $.upgradeToken && (0, F.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, F.jsx)(S, {
                                                        name: `star`,
                                                        size: 12
                                                    }),
                                                    ` Free upgrade — claim it at a port`
                                                ]
                                            }),
                                            (0, F.jsx)(`div`, {
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
                                                let t = $.ship.levels[e.key], n = e.key === `hull` ? `Hull ${$.ship.maxHull}` : e.key === `weapon` ? `Power ${$.ship.power}` : `Vision ${$.ship.vision}`;
                                                return (0, F.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, F.jsx)(`img`, {
                                                            src: e.img,
                                                            alt: ``,
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, F.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 54
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, F.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, F.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, F.jsx)(`span`, {
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
                                    Q === `upgrades` && (0, F.jsxs)(F.Fragment, {
                                        children: [
                                            (0, F.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            mt.map((e)=>{
                                                let t = $.ship.upgrades.includes(e.id), n = ht[e.build];
                                                return (0, F.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, F.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, F.jsx)(`img`, {
                                                                    src: ft[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, F.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, F.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, F.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, F.jsx)(_t, {
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
                        Q && (0, F.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>vn(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { Wt as default, __tla };
