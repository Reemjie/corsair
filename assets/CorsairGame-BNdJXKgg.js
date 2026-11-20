import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { a as o, f as s, i as c, l, p as u, s as d, t as f } from "./anchor-5CyoSY96.js";
import { $ as p, A as m, B as h, D as g, E as _, F as v, G as ee, H as y, I as te, L as ne, M as re, N as ie, O as b, P as x, R as ae, T as S, U as oe, V as C, W as se, a as ce, c as le, d as ue, et as w, f as de, g as fe, h as T, i as pe, j as E, l as D, m as me, n as he, nt as ge, o as _e, p as ve, q as ye, r as be, s as xe, t as Se, tt as Ce, u as O, v as we, w as Te, z as Ee } from "./ReplayScreen-CvbWLj12.js";
import { D as De, E as Oe, T as ke, _ as Ae, c as je, g as Me, p as Ne, t as Pe, v as Fe, __tla as __tla_0 } from "./supabase-DvWtbdnt.js";
import { a as k, c as Ie, o as Le, r as Re, s as ze } from "./nftCatalog-3Mir_rrL.js";
import { l as Be, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
import { t as A } from "./rpc-BQNg8r_c.js";
let Gt;
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
    var j = e(t(), 1), M = `corsair_onboard_v3`;
    function Ve() {
        try {
            return new Set(JSON.parse(localStorage.getItem(M) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function He(e) {
        let t = Ve();
        t.add(e);
        try {
            localStorage.setItem(M, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function Ue(e) {
        let t = Ve();
        return !t.has(`sail`) && e.turn === 0 && !e.event && !e.showPort && !e.gameOver ? {
            id: `sail`,
            title: `SET SAIL`,
            text: `Sail Ahead, Port, or Starboard. You cannot sail south — the storm climbs from behind.`
        } : !t.has(`danger`) && e.event && e.event.choices.some((e)=>e.risk === `risky` || e.risk === `bold`) ? {
            id: `danger`,
            title: `A CHOICE`,
            text: `Bold pays more. Safe keeps you alive. Read the risk line under each option.`
        } : !t.has(`duel`) && e.pirateDuel && e.pirateDuel.phase === `choose` && !e.gameOver ? {
            id: `duel`,
            title: `SEA DUEL`,
            text: `Read their intent. Strike, Board (or Lash), or Flee — the BEST chip marks the counter.`
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
    }, Ge = {
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
    }, N = {}, Ke = (()=>{
        try {
            return localStorage.getItem(`corsair_muted`) === `1`;
        } catch  {
            return !1;
        }
    })();
    function qe(e) {
        Ke = e;
    }
    function P(e) {
        if (!Ke) try {
            let t = N[e];
            t || (t = new Audio(`/sounds/${Ge[e]}.wav`), N[e] = t), t.volume = We[e], t.currentTime = 0, t.play().catch(()=>{});
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
    function Ze(e, t) {
        try {
            localStorage.setItem(e, t ? `1` : `0`);
        } catch  {}
    }
    function Qe() {
        return Xe(Je);
    }
    function $e(e) {
        Ze(Je, e);
    }
    function et() {
        return Xe(Ye);
    }
    function tt(e) {
        Ze(Ye, e);
    }
    function nt(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function rt(e, t) {
        let n = nt(e);
        return n === 0 || t >= n;
    }
    function it(e, t, n) {
        return t === `port` && e.label === `Dock` && (n ?? []).includes(`ghost`) ? `Ghost Ship cannot dock` : null;
    }
    function at(e, t, n, r, i) {
        let a = it(e, t, i);
        if (a) return a + ` — sail on.`;
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function ot(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    function st(e) {
        return e === `safe` ? `SAFE · keeps you alive` : e === `risky` ? `RISKY · hull at stake` : `BOLD · big payoff`;
    }
    var ct = `/assets/swift_sails-YMobDX4v.png`, F = `/assets/ghost_ship-4jaVs07k.png`, lt = `/assets/treasure_hunter-C9jnAyZy.png`, ut = `/assets/storm_rider-BjRGnDwr.png`, dt = `/assets/cursed_greed-BlVfcQDt.png`, ft = `/assets/berserker-B9haxHEY.png`, I = r(), pt = {
        escape: ct,
        ghost: F,
        hunter: lt,
        rider: ut,
        greed: dt,
        berserker: ft
    }, mt = [
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
    ], ht = Ce.upgrades.costs, L = Math.round(Ce.storm.hunterSurgeBonus * 100), R = [
        {
            id: `ghost`,
            name: `Ghost Ship`,
            pros: [
                `Pirates ignore you. +2 vision.`
            ],
            cons: [
                `Cannot dock at ports. Krakens attracted on sea cells.`
            ],
            cost: ht.ghost,
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
            cost: ht.rider,
            icon: `rider`,
            build: `escape`
        },
        {
            id: `greed`,
            name: `Cursed Greed`,
            pros: [
                `Gold x${Ce.greed.goldMultiplier} on combat.`
            ],
            cons: [
                `Cannot repair at port. Storm worsens every 200g. Pirates hit harder at 400g+. Hunter aggro at 600g+.`
            ],
            cost: ht.greed,
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
            cost: ht.berserker,
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
            cost: ht.hunter,
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
            cost: ht.escape,
            icon: `escape`,
            build: `escape`
        }
    ], gt = {
        vision: `#6aaccc`,
        gold: `#eedd44`,
        combat: `#ee6644`,
        escape: `#44cc88`
    };
    function _t({ ok: e }) {
        return (0, I.jsx)(`span`, {
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
    function vt({ pros: e, cons: t, fontSize: n = 11, opacity: r = .55 }) {
        let i = (e, t, n)=>(0, I.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    lineHeight: 1.45
                },
                children: [
                    (0, I.jsx)(_t, {
                        ok: t
                    }),
                    (0, I.jsx)(`span`, {
                        style: {
                            color: `rgba(255,255,255,${r})`
                        },
                        children: e
                    })
                ]
            }, n);
        return (0, I.jsxs)(`div`, {
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
    function yt(e, t) {
        return e ? e.startsWith(`http`) || e.startsWith(`/`) ? (0, I.jsx)(`img`, {
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
        }) : (0, I.jsx)(`span`, {
            style: {
                fontSize: t
            },
            children: e
        }) : null;
    }
    function bt({ variant: e, event: t, isMobile: n, gold: r, hull: a, relics: o, upgrades: s, score: c, cellIcon: l, onboard: u, onDismissOnboard: d, onChoose: f, canEscape: p, onSkip: m, interactive: h = !0 }) {
        let g = (0, I.jsx)(`div`, {
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
                let u = ot(c.risk), d = it(c, t.cellType, s), p = !d && rt(c.desc, r) && !d, m = at(c, t.cellType, o, a, s), h = e === `scene` ? 1.04 : 1.02, g = e === `scene` ? .96 : .98, _ = d ? `rgba(120,120,140,0.45)` : p ? `${u}55` : `rgba(255,255,255,0.1)`;
                return (0, I.jsxs)(i.button, {
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
                        D[c.icon] ? (0, I.jsxs)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? n ? 8 : 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`,
                                position: `relative`
                            },
                            children: [
                                (0, I.jsx)(`img`, {
                                    src: D[c.icon],
                                    alt: ``,
                                    style: {
                                        width: e === `scene` ? n ? 40 : 72 : 40,
                                        height: e === `scene` ? n ? 40 : 72 : 40,
                                        objectFit: `contain`,
                                        opacity: d ? .45 : 1,
                                        filter: d ? `grayscale(1)` : void 0
                                    }
                                }),
                                d && (0, I.jsx)(`div`, {
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
                        }) : (0, I.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 22 : 26 : 22,
                                marginBottom: 4
                            },
                            children: c.icon
                        }),
                        (0, I.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 20 : 24 : 18,
                                fontWeight: e === `scene` ? 700 : 600,
                                color: d ? `rgba(160,160,180,0.75)` : u,
                                textAlign: e === `scene` ? `center` : `left`
                            },
                            children: c.label
                        }),
                        (0, I.jsx)(`div`, {
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
                        !p && !d && (0, I.jsx)(`div`, {
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
                        (0, I.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 12 : 13 : 15,
                                color: d ? `rgba(180,160,200,0.85)` : u,
                                marginTop: e === `scene` ? n ? 6 : 10 : 4,
                                letterSpacing: e === `scene` ? 1.5 : 1,
                                textAlign: e === `scene` ? `center` : `left`,
                                fontFamily: `'Cinzel', serif`
                            },
                            children: d ? d.toLowerCase().includes(`dock`) ? `CAN'T DOCK` : `UNAVAILABLE` : st(c.risk)
                        })
                    ]
                }, l);
            })
        }), _ = p && m ? (0, I.jsxs)(i.button, {
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
                (0, I.jsx)(`img`, {
                    src: pt.escape,
                    alt: ``,
                    style: {
                        width: 28,
                        height: 28,
                        objectFit: `contain`,
                        filter: `drop-shadow(0 0 6px rgba(100,200,240,0.7))`
                    }
                }),
                (0, I.jsxs)(`span`, {
                    style: {
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `flex-start`,
                        lineHeight: 1.15
                    },
                    children: [
                        (0, I.jsx)(`span`, {
                            children: `Swift Sails — Escape`
                        }),
                        (0, I.jsx)(`span`, {
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
        return e === `scene` ? (0, I.jsxs)(i.div, {
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
                O[t.cellType] && (0, I.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `url(${O[t.cellType]})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }
                }),
                (0, I.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        background: `linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)`
                    }
                }),
                (0, I.jsx)(`div`, {
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
                    children: (0, I.jsxs)(`div`, {
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
                            (0, I.jsxs)(`span`, {
                                style: {
                                    color: `#88eebb`
                                },
                                children: [
                                    a,
                                    (0, I.jsx)(`span`, {
                                        style: {
                                            color: `rgba(255,255,255,0.35)`,
                                            fontWeight: 500,
                                            fontSize: n ? 11 : 12
                                        },
                                        children: ` hp`
                                    })
                                ]
                            }),
                            (0, I.jsx)(`span`, {
                                style: {
                                    width: 1,
                                    height: 14,
                                    background: `rgba(255,255,255,0.18)`
                                }
                            }),
                            (0, I.jsxs)(`span`, {
                                style: {
                                    color: `#eedd44`
                                },
                                children: [
                                    r,
                                    (0, I.jsx)(`span`, {
                                        style: {
                                            color: `rgba(255,255,255,0.35)`,
                                            fontWeight: 500,
                                            fontSize: n ? 11 : 12
                                        },
                                        children: `g`
                                    })
                                ]
                            }),
                            c != null && (0, I.jsxs)(I.Fragment, {
                                children: [
                                    (0, I.jsx)(`span`, {
                                        style: {
                                            width: 1,
                                            height: 14,
                                            background: `rgba(255,255,255,0.18)`
                                        }
                                    }),
                                    (0, I.jsxs)(`span`, {
                                        style: {
                                            color: `#f0d878`
                                        },
                                        children: [
                                            c,
                                            (0, I.jsx)(`span`, {
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
                (0, I.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        maxWidth: 700,
                        width: `100%`,
                        textAlign: `center`
                    },
                    children: [
                        u && d && (0, I.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                marginBottom: 12
                            },
                            children: (0, I.jsx)(T, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            })
                        }),
                        (0, I.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: n ? 10 : 16,
                                paddingLeft: 8,
                                marginTop: n ? 52 : 8
                            },
                            children: (0, I.jsx)(`div`, {
                                style: {
                                    fontSize: n ? 26 : 42,
                                    fontWeight: 700,
                                    color: `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)`,
                                    lineHeight: 1.1
                                },
                                children: ue[t.cellType] ?? t.cellType
                            })
                        }),
                        g,
                        _ && (0, I.jsx)(`div`, {
                            style: {
                                marginTop: 4
                            },
                            children: _
                        })
                    ]
                })
            ]
        }, `event-scene`) : (0, I.jsx)(i.div, {
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
            children: (0, I.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `flex-start`,
                    gap: 20,
                    maxWidth: 700,
                    margin: `0 auto`
                },
                children: [
                    (0, I.jsx)(`div`, {
                        style: {
                            flexShrink: 0
                        },
                        children: yt(l, 55)
                    }),
                    (0, I.jsxs)(`div`, {
                        style: {
                            flex: 1
                        },
                        children: [
                            (0, I.jsx)(`div`, {
                                style: {
                                    fontSize: 21,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                    color: `#e8e0d0`
                                },
                                children: t.cellType.charAt(0).toUpperCase() + t.cellType.slice(1).replace(`_`, ` `)
                            }),
                            u && d && (0, I.jsx)(T, {
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
    var xt = {
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
    }, St = {
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
    }, Ct = {
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
    }, wt = {
        pirate: `BOARDING DUEL`,
        kraken: `KRAKEN DUEL`,
        ancient_kraken: `ANCIENT DUEL`,
        hunter: `HUNTER DUEL`
    }, Tt = {
        pirate: `Pirates`,
        kraken: `Kraken`,
        ancient_kraken: `Ancient`,
        hunter: `Hunter`
    };
    function z({ label: e, filled: t, max: n = 3, color: r }) {
        return (0, I.jsxs)(`div`, {
            style: {
                display: `flex`,
                alignItems: `center`,
                gap: 4,
                marginTop: 5
            },
            children: [
                (0, I.jsx)(`span`, {
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
                }, (e, n)=>(0, I.jsx)(`div`, {
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
    function Et({ power: e, accent: t }) {
        let n = Math.max(1, Math.min(5, e));
        return (0, I.jsx)(`div`, {
            style: {
                display: `inline-flex`,
                alignItems: `center`,
                gap: 3
            },
            title: `Threat ${e}`,
            children: Array.from({
                length: 5
            }, (e, r)=>(0, I.jsx)(`div`, {
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
    function Dt({ duel: e, ship: t, isMobile: r, log: a, notoriety: o = 0, onAction: s }) {
        let c = e.kind ?? `pirate`, l = xt[c], u = e.enemyMaxHull > 0 ? Math.max(0, e.enemyHull / e.enemyMaxHull) : 0, d = t.maxHull > 0 ? Math.max(0, t.hull / t.maxHull) : 0, f = St[c][e.intent], p = Ct[c], m = O[c] ?? O.pirate, h = de[c], g = e.phase === `choose`, _ = e.phase === `player_result` || e.phase === `enemy_result` || e.phase === `victory` || e.phase === `fled`, v = e.phase === `victory`, ee = e.enemyPower >= 4, y = !!e.enraged, te = u > 0 && u <= .25, ne = d > 0 && d <= .3, re = w(c, e.intent, o, t.gold), ie = e.phase === `player_result` && e.lastCounter ? {
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
        }, b = (0, j.useRef)(s);
        b.current = s;
        let x = (0, j.useRef)(null);
        (0, j.useEffect)(()=>{
            let e = (e)=>{
                if (e.metaKey || e.ctrlKey || e.altKey) return;
                let t = e.target?.tagName;
                t === `INPUT` || t === `TEXTAREA` || (g ? e.key === `1` ? (e.preventDefault(), b.current(0)) : e.key === `2` ? (e.preventDefault(), b.current(1)) : e.key === `3` && (e.preventDefault(), b.current(2)) : _ && (e.key === ` ` || e.key === `Enter`) && (e.preventDefault(), b.current(3)));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            g,
            _
        ]), (0, j.useEffect)(()=>{
            let e = x.current;
            e && (_ || v ? e.play().catch(()=>{}) : e.pause());
        }, [
            _,
            v,
            g,
            e.round,
            e.phase
        ]);
        let ae = c === `pirate` ? `Loot claimed. The ${e.enemyName.toLowerCase()} scatter into the fog.` : c === `hunter` ? `${e.enemyName} is driven into the fog — for now.` : `${e.enemyName} sinks beneath the black water.`, S = v ? l.victoryBorder : y ? `rgba(255,80,120,0.9)` : ee ? `rgba(255,140,80,0.85)` : l.border, oe = v ? `THE SEA YIELDS` : e.phase === `fled` ? `RETREAT` : e.phase === `player_result` ? `ROUND ${e.round} · STEP 1 OF 2` : e.phase === `enemy_result` ? `ROUND ${e.round} · STEP 2 OF 2` : `${wt[c]} · ROUND ${e.round}`, C = e.phase === `player_result` && e.lastPlayerHit > 0 ? `YOU hit for −${e.lastPlayerHit}` : e.phase === `enemy_result` && e.lastEnemyHit > 0 ? `THEY hit for −${e.lastEnemyHit}` : e.phase === `enemy_result` && e.lastEnemyHit === 0 ? `THEY miss — no hull lost` : null;
        return (0, I.jsxs)(i.div, {
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
                border: `2px solid ${S}`,
                boxShadow: v ? `0 16px 48px rgba(0,0,0,0.65), 0 0 70px ${l.glow}` : y ? `0 0 0 1px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.65), 0 0 70px rgba(255,40,80,0.45)` : `0 0 0 1px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.65), 0 0 60px ${ee ? `rgba(255,120,40,0.4)` : l.glow}`,
                display: `flex`,
                flexDirection: `column`,
                background: `#08060a`
            },
            children: [
                (0, I.jsx)(`div`, {
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
                h && !r && (0, I.jsx)(`video`, {
                    ref: x,
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
                (0, I.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        borderRadius: `inherit`,
                        background: v ? l.victoryOverlay : l.overlay
                    }
                }),
                (0, I.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        pointerEvents: `none`,
                        borderRadius: `inherit`,
                        background: `radial-gradient(ellipse at 50% 18%, ${l.accent}22 0%, transparent 55%)`
                    }
                }),
                (0, I.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        padding: r ? `10px 10px 12px` : `18px 18px 20px`,
                        overflowY: r ? `auto` : void 0,
                        WebkitOverflowScrolling: r ? `touch` : void 0,
                        maxHeight: r ? `calc(100dvh - 20px - env(safe-area-inset-top) - env(safe-area-inset-bottom))` : void 0
                    },
                    children: [
                        (0, I.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 10,
                                letterSpacing: 2.5,
                                color: l.accentSoft,
                                textAlign: `center`,
                                marginBottom: 2
                            },
                            children: oe
                        }),
                        (0, I.jsx)(`div`, {
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
                        (g || e.phase === `player_result` || e.phase === `enemy_result`) && (0, I.jsx)(`div`, {
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
                        (0, I.jsxs)(`div`, {
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
                                (0, I.jsxs)(`span`, {
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
                                        (0, I.jsx)(Et, {
                                            power: e.enemyPower,
                                            accent: l.accent
                                        })
                                    ]
                                }),
                                y && (0, I.jsx)(`span`, {
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
                                te && !v && (0, I.jsx)(`span`, {
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
                                ne && g && (0, I.jsx)(`span`, {
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
                        (0, I.jsx)(n, {
                            children: (C || e.phase === `player_result` && (e.lastCounter || e.lastPunished)) && (0, I.jsxs)(i.div, {
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
                                    e.phase === `player_result` && (e.lastCounter || e.lastPunished) && (0, I.jsxs)(`div`, {
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
                                    C && (0, I.jsx)(`div`, {
                                        style: {
                                            fontFamily: `'Pirata One', cursive`,
                                            fontSize: r ? 22 : 26,
                                            letterSpacing: 1,
                                            color: e.phase === `player_result` ? `#88eebb` : `#ff8899`,
                                            textShadow: `0 2px 12px rgba(0,0,0,0.85)`,
                                            marginTop: 2
                                        },
                                        children: C
                                    })
                                ]
                            }, `${e.phase}-${e.lastCounter}-${e.lastPunished}-${e.lastPlayerHit}-${e.lastEnemyHit}`)
                        }),
                        g && (0, I.jsxs)(i.div, {
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
                                D[f.icon] && (0, I.jsx)(`img`, {
                                    src: D[f.icon],
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
                                (0, I.jsx)(`div`, {
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
                                (0, I.jsx)(`div`, {
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
                                f.best !== `Fight` && (0, I.jsxs)(`div`, {
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
                                f.best === `Fight` && (0, I.jsx)(`div`, {
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
                        v && (0, I.jsxs)(i.div, {
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
                                (0, I.jsxs)(`div`, {
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
                                (0, I.jsxs)(`div`, {
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
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        justifyContent: `center`,
                                        gap: 22,
                                        marginTop: 12,
                                        fontFamily: `'Pirata One', cursive`
                                    },
                                    children: [
                                        (0, I.jsxs)(`div`, {
                                            children: [
                                                (0, I.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        letterSpacing: 2,
                                                        color: `rgba(238,221,68,0.55)`,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: `GOLD`
                                                }),
                                                (0, I.jsxs)(`div`, {
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
                                        (0, I.jsxs)(`div`, {
                                            children: [
                                                (0, I.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        letterSpacing: 2,
                                                        color: `rgba(136,238,187,0.55)`,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: `SCORE`
                                                }),
                                                (0, I.jsxs)(`div`, {
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
                        e.phase !== `fled` && (0, I.jsxs)(`div`, {
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
                                (0, I.jsx)(Ot, {
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
                                (0, I.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Pirata One', cursive`,
                                        fontSize: 20,
                                        color: v ? `#f0d878` : l.accent,
                                        textShadow: `0 0 12px ${l.glow}`,
                                        lineHeight: 1
                                    },
                                    children: v ? `☠` : `⚔`
                                }),
                                (0, I.jsx)(Ot, {
                                    side: `right`,
                                    name: Tt[c],
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
                        g && (0, I.jsxs)(`div`, {
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
                                ].map((t)=>(0, I.jsx)(`div`, {
                                        style: {
                                            width: r ? 8 : 9,
                                            height: r ? 8 : 9,
                                            borderRadius: `50%`,
                                            background: t < e.momentum ? l.accent : `rgba(255,255,255,0.12)`,
                                            boxShadow: t < e.momentum ? `0 0 8px ${l.accent}` : `none`
                                        }
                                    }, t)),
                                (0, I.jsx)(`span`, {
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
                        !g && (0, I.jsx)(n, {
                            mode: `wait`,
                            children: (0, I.jsx)(i.div, {
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
                                children: v ? ae : a
                            }, a + e.phase)
                        }),
                        g && (0, I.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                flexDirection: r ? `column` : `row`,
                                gap: r ? 6 : 8,
                                justifyContent: `center`
                            },
                            children: p.map((t)=>{
                                let n = t.id === 0 && e.intent === `grapple` || t.id === 1 && e.intent === `volley`, a = t.id === 0 && e.intent === `volley` || t.id === 1 && e.intent === `grapple`, o = t.id === 2 && e.intent === `plunder`, c = t.id === 2 ? o ? `⚠ ${t.weak}` : t.beats : n ? `▸ ${t.beats}` : a ? `▸ ${t.weak}` : t.beats;
                                return (0, I.jsxs)(i.button, {
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
                                        !r && (0, I.jsx)(`span`, {
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
                                        (0, I.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: r ? 10 : 8
                                            },
                                            children: [
                                                D[t.icon] && (0, I.jsx)(`img`, {
                                                    src: D[t.icon],
                                                    alt: ``,
                                                    style: {
                                                        width: r ? 28 : 36,
                                                        height: r ? 28 : 36,
                                                        objectFit: `contain`,
                                                        flexShrink: 0
                                                    }
                                                }),
                                                (0, I.jsxs)(`div`, {
                                                    style: {
                                                        minWidth: 0,
                                                        flex: 1
                                                    },
                                                    children: [
                                                        (0, I.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `baseline`,
                                                                gap: 8,
                                                                flexWrap: `wrap`
                                                            },
                                                            children: [
                                                                (0, I.jsx)(`span`, {
                                                                    style: {
                                                                        fontFamily: `'Pirata One', cursive`,
                                                                        fontSize: r ? 18 : 20,
                                                                        color: t.color,
                                                                        lineHeight: 1
                                                                    },
                                                                    children: t.label
                                                                }),
                                                                (0, I.jsx)(`span`, {
                                                                    style: {
                                                                        fontFamily: `'Cinzel', serif`,
                                                                        fontSize: 9,
                                                                        letterSpacing: 1.3,
                                                                        color: n ? `#88eebb` : a || o ? `#ff8899` : `rgba(255,255,255,0.4)`
                                                                    },
                                                                    children: t.tag
                                                                }),
                                                                r && t.id !== 2 && (0, I.jsxs)(`span`, {
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
                                                        (0, I.jsx)(`div`, {
                                                            style: {
                                                                fontFamily: `'Cinzel', serif`,
                                                                fontSize: 10,
                                                                letterSpacing: 1,
                                                                marginTop: r ? 2 : 4,
                                                                color: n ? `#88eebb` : a || o ? `#ff8899` : `rgba(255,255,255,0.45)`
                                                            },
                                                            children: t.id === 2 && r ? `${c} · ${re}` : c
                                                        }),
                                                        t.id === 2 && !r && (0, I.jsxs)(`div`, {
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
                                                        t.id !== 2 && !r && (0, I.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                flexDirection: `column`
                                                            },
                                                            children: [
                                                                (0, I.jsx)(z, {
                                                                    label: `DMG`,
                                                                    filled: t.dmg,
                                                                    color: t.color
                                                                }),
                                                                (0, I.jsx)(z, {
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
                        _ && (0, I.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                flexDirection: `column`,
                                alignItems: `center`,
                                gap: 8
                            },
                            children: [
                                (e.phase === `player_result` || e.phase === `enemy_result`) && (0, I.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: 13,
                                        color: `rgba(255,255,255,0.45)`,
                                        textAlign: `center`
                                    },
                                    children: e.phase === `player_result` ? `Your attack is done. Tap for their counter.` : `Their attack is done. Tap to choose your next move.`
                                }),
                                (0, I.jsx)(i.button, {
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
    function Ot({ side: e, name: t, hull: r, max: a, pct: o, color: s, float: c, floatBad: l, pulse: u, warn: d }) {
        let f = d && (l || e === `left`) ? `#ff8899` : s;
        return (0, I.jsxs)(i.div, {
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
                (0, I.jsx)(`div`, {
                    style: {
                        fontFamily: `'Cinzel', serif`,
                        fontSize: 10,
                        letterSpacing: 1.2,
                        color: `rgba(255,255,255,0.48)`,
                        marginBottom: 3
                    },
                    children: t
                }),
                (0, I.jsxs)(`div`, {
                    style: {
                        fontFamily: `'Pirata One', cursive`,
                        fontSize: 22,
                        color: f,
                        lineHeight: 1,
                        textShadow: `0 0 12px ${f}66`
                    },
                    children: [
                        r,
                        (0, I.jsxs)(`span`, {
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
                (0, I.jsx)(`div`, {
                    style: {
                        marginTop: 5,
                        height: 9,
                        borderRadius: 4,
                        background: `rgba(0,0,0,0.5)`,
                        overflow: `hidden`,
                        border: d ? `1px solid rgba(255,120,140,0.45)` : `1px solid rgba(255,255,255,0.1)`
                    },
                    children: (0, I.jsx)(i.div, {
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
                (0, I.jsx)(n, {
                    children: c > 0 && (0, I.jsxs)(i.div, {
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
    var kt = `/assets/hull-CGmPGbU0.png`, At = `/assets/vision-3Q65Za4i.png`, jt = `/assets/power-CBX9SU5d.png`;
    function Mt({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
        return (0, I.jsx)(n, {
            children: e && (0, I.jsxs)(i.div, {
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
                    (0, I.jsxs)(`div`, {
                        style: {
                            maxWidth: 700,
                            margin: `0 auto`
                        },
                        children: [
                            (0, I.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    (0, I.jsx)(`img`, {
                                        src: `/assets/anchor-Bx3zJViJ.png`,
                                        alt: ``,
                                        style: {
                                            width: 40,
                                            height: 40,
                                            objectFit: `contain`
                                        }
                                    }),
                                    (0, I.jsx)(`span`, {
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
                            u && d && (0, I.jsx)(T, {
                                tip: u,
                                isMobile: t,
                                onDismiss: d
                            }),
                            (0, I.jsxs)(`div`, {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 14,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            marginBottom: 10
                                        },
                                        children: `SHIP COMPONENTS`
                                    }),
                                    (0, I.jsx)(`div`, {
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
                                            return (0, I.jsxs)(`div`, {
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
                                                    (0, I.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            marginBottom: 6
                                                        },
                                                        children: [
                                                            (0, I.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    alignItems: `center`,
                                                                    gap: 6,
                                                                    fontSize: 13,
                                                                    color: e.color,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: [
                                                                    (0, I.jsx)(`img`, {
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
                                                            (0, I.jsx)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    gap: 3
                                                                },
                                                                children: [
                                                                    0,
                                                                    1,
                                                                    2
                                                                ].map((n)=>(0, I.jsx)(`div`, {
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
                                                    (0, I.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 13,
                                                            color: `rgba(255,255,255,0.65)`,
                                                            fontFamily: `'IM Fell English', cursive`,
                                                            marginBottom: 6
                                                        },
                                                        children: e.effects[t]
                                                    }),
                                                    !a && (0, I.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 12,
                                                            color: i ? `#eedd44` : `rgba(255,255,255,0.25)`,
                                                            fontFamily: `'Cinzel', serif`,
                                                            letterSpacing: .5
                                                        },
                                                        children: t === 1 && s >= 2 ? `Only 2 components can reach III` : `Upgrade to ${o} · ${n}g`
                                                    }),
                                                    a && (0, I.jsx)(`div`, {
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
                            (0, I.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    justifyContent: `space-between`,
                                    alignItems: `center`,
                                    marginBottom: 8,
                                    gap: 8
                                },
                                children: [
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 16,
                                            color: `rgba(255,255,255,0.6)`,
                                            fontFamily: `'Pirata One', cursive`
                                        },
                                        children: `Available upgrades`
                                    }),
                                    (0, I.jsx)(i.button, {
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
                            (0, I.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: t ? `1fr` : `repeat(2, 1fr)`,
                                    gap: 10,
                                    marginBottom: 12
                                },
                                children: R.filter((e)=>a.includes(e.id) || r.upgrades.includes(e.id)).map((e)=>{
                                    let t = r.upgrades.includes(e.id), n = c.includes(e.id), i = o ? 0 : e.cost, a = r.upgrades.length + c.length >= 2, s = !t && !n && r.gold >= i && !a, u = gt[e.build], d = t ? `OWNED` : n ? i === 0 ? `IN CART · FREE` : `IN CART · ${i}g` : i === 0 ? `FREE` : `${i}g`;
                                    return (0, I.jsxs)(`div`, {
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
                                            (0, I.jsx)(`img`, {
                                                src: pt[e.id],
                                                alt: ``,
                                                style: {
                                                    width: 44,
                                                    height: 44,
                                                    objectFit: `contain`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, I.jsxs)(`div`, {
                                                style: {
                                                    minWidth: 0,
                                                    flex: 1
                                                },
                                                children: [
                                                    (0, I.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `baseline`,
                                                            gap: 8
                                                        },
                                                        children: [
                                                            (0, I.jsx)(`div`, {
                                                                style: {
                                                                    fontSize: 17,
                                                                    fontWeight: 700,
                                                                    color: t ? u : n ? `#44cc88` : `#e8e0d0`,
                                                                    fontFamily: `'Pirata One', cursive`
                                                                },
                                                                children: e.name
                                                            }),
                                                            (0, I.jsx)(`div`, {
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
                                                    (0, I.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, I.jsx)(vt, {
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
                            r.upgrades.length + c.length >= 2 && (0, I.jsx)(`div`, {
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
                        return (0, I.jsxs)(I.Fragment, {
                            children: [
                                e && (0, I.jsx)(`div`, {
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
                                t && (0, I.jsx)(`div`, {
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
                                (0, I.jsx)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 8,
                                        marginBottom: 16
                                    },
                                    children: n.map((n)=>{
                                        let a = r.gold >= n.cost && r.hull < r.maxHull && !e, o = e ? `Cursed Greed blocks repairs` : t ? `+${n.heal} hull (half)` : n.baseDesc;
                                        return (0, I.jsxs)(i.button, {
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
                                                (0, I.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: e ? `rgba(160,160,180,0.75)` : `#44cc88`,
                                                        fontFamily: `'Pirata One', cursive`
                                                    },
                                                    children: n.label
                                                }),
                                                (0, I.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: e ? `rgba(180,170,200,0.65)` : `rgba(255,255,255,0.5)`
                                                    },
                                                    children: o
                                                }),
                                                (0, I.jsx)(`div`, {
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
                        let e = c.map((e)=>R.find((t)=>t.id === e)?.name).filter(Boolean), t = c.reduce((e, t)=>e + (R.find((e)=>e.id === t)?.cost ?? 0), 0), n = o ? 0 : t, a = Math.max(0, r.gold - n), s = c.length > 0;
                        return (0, I.jsxs)(I.Fragment, {
                            children: [
                                s && (0, I.jsxs)(`div`, {
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
                                (0, I.jsxs)(i.button, {
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
                                        (0, I.jsx)(S, {
                                            name: `anchor`,
                                            size: 22,
                                            style: {
                                                marginRight: 8
                                            }
                                        }),
                                        s ? o ? `SET SAIL · CLAIM FREE` : `SET SAIL · BUY (${n}g)` : `SET SAIL`
                                    ]
                                }),
                                s && (0, I.jsx)(`div`, {
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
    var Nt = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new Be({
        nodeUrl: A
    });
    async function Pt(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: Nt,
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
    function Ft({ payload: e, isMobile: t, onShare: n }) {
        return (0, I.jsxs)(i.div, {
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
                (0, I.jsxs)(`div`, {
                    style: {
                        padding: t ? `14px 16px 10px` : `18px 20px 12px`,
                        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(/scenes/storm.jpg)`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    },
                    children: [
                        (0, I.jsx)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 11,
                                letterSpacing: 3,
                                color: `rgba(200,160,48,0.85)`
                            },
                            children: e.isDaily ? `DAILY CHALLENGE` : `VOYAGE LOG`
                        }),
                        (0, I.jsx)(`div`, {
                            style: {
                                fontFamily: `'Pirata One', cursive`,
                                fontSize: t ? 26 : 32,
                                color: `#e8d8a8`,
                                letterSpacing: 2,
                                marginTop: 4
                            },
                            children: e.runTitle
                        }),
                        (0, I.jsxs)(`div`, {
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
                (0, I.jsx)(`div`, {
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
                    ].map((e)=>(0, I.jsxs)(`div`, {
                            style: {
                                textAlign: `center`
                            },
                            children: [
                                (0, I.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: `rgba(255,255,255,0.35)`
                                    },
                                    children: e.label
                                }),
                                (0, I.jsx)(`div`, {
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
                (0, I.jsxs)(`div`, {
                    style: {
                        padding: `0 16px 14px`,
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 8,
                        alignItems: `center`
                    },
                    children: [
                        (0, I.jsxs)(`div`, {
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
                        (0, I.jsx)(i.button, {
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
    async function It(e) {
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
    function Lt(e) {
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
    function B({ status: e, onRetry: t }) {
        if (e.kind === `idle`) return null;
        if (e.kind === `local`) return (0, I.jsx)(V, {
            tone: `muted`,
            children: `Local voyage — not ranked. Connect + server seed to climb the board.`
        });
        if (e.kind === `sending`) return (0, I.jsx)(V, {
            tone: `info`,
            pulse: !0,
            children: (0, I.jsxs)(`span`, {
                style: {
                    display: `inline-flex`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, I.jsx)(H, {}),
                    ` Logging the voyage to the harbor…`
                ]
            })
        });
        if (e.kind === `ok`) return e.daily ? (0, I.jsx)(V, {
            tone: `daily`,
            children: (0, I.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4
                },
                children: [
                    (0, I.jsxs)(`div`, {
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
                            (0, I.jsx)(S, {
                                name: `sun`,
                                size: 18
                            }),
                            ` DAILY SCORE PUBLISHED`
                        ]
                    }),
                    (0, I.jsx)(`div`, {
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
        }) : (0, I.jsx)(V, {
            tone: `ok`,
            children: (0, I.jsx)(`span`, {
                style: {
                    fontFamily: `'Pirata One', cursive`,
                    fontSize: 15,
                    letterSpacing: 2
                },
                children: `✓ SCORE SAVED — ON THE LEADERBOARD`
            })
        });
        if (e.kind === `queued`) return (0, I.jsx)(V, {
            tone: `warn`,
            children: (0, I.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, I.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#eec070`
                        },
                        children: `Harbor lag — voyage queued`
                    }),
                    (0, I.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: e.step === `log` ? `Could not save the run log. Retry now, or it will send on your next visit.` : `Log saved, approval pending. Retry now, or it will finish on your next visit.`
                    }),
                    t && (0, I.jsx)(`button`, {
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
        return (0, I.jsx)(V, {
            tone: `bad`,
            children: (0, I.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8
                },
                children: [
                    (0, I.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 14,
                            letterSpacing: 1,
                            color: `#ee8899`
                        },
                        children: `Score not accepted`
                    }),
                    (0, I.jsx)(`div`, {
                        style: {
                            fontSize: 12,
                            color: `rgba(255,255,255,0.5)`,
                            fontFamily: `'IM Fell English', cursive`,
                            maxWidth: 320,
                            lineHeight: 1.35
                        },
                        children: n
                    }),
                    t && (0, I.jsx)(`button`, {
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
    function V({ children: e, tone: t, pulse: n }) {
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
        return (0, I.jsx)(i.div, {
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
    function H() {
        return (0, I.jsx)(i.span, {
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
    function Rt({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: s, isNewRecord: c, newFeats: l, nearFeats: u, submitStatus: d, onRetrySubmit: f, nftMinted: p, walletAddress: h, account: g, onChainDone: _, setOnChainDone: v, submitting: ee, setSubmitting: y, connecting: te, onConnect: ne, showGuestDailyCta: re, onPlayDaily: x, rangMois: ae, harborDown: oe, restarting: C, onRestart: ce, onHome: le, onWatchReplay: ue }) {
        let [w, de] = (0, j.useState)(!1), fe = o(), T = fe <= 1, pe = !a && !m() && !!x && !!h, E = re || pe, D = Lt(t.log), me = {
            padding: r ? `16px 36px` : `18px 48px`,
            borderRadius: 14,
            border: E ? `2px solid rgba(136,221,255,0.85)` : `2px solid rgba(200,160,48,0.85)`,
            background: E ? `linear-gradient(135deg, rgba(30,90,120,0.85) 0%, rgba(20,50,70,0.9) 100%)` : `linear-gradient(135deg, rgba(120,90,20,0.75) 0%, rgba(60,45,10,0.9) 100%)`,
            color: E ? `#a8e8ff` : `#f0d878`,
            cursor: C && !E ? `wait` : `pointer`,
            fontSize: r ? 22 : 26,
            fontWeight: 700,
            letterSpacing: 3,
            fontFamily: `'Pirata One', cursive`,
            boxShadow: E ? `0 0 28px rgba(80,180,220,0.35)` : `0 0 28px rgba(200,160,48,0.35)`,
            opacity: C && !E ? .7 : 1,
            width: r ? `min(92vw, 360px)` : void 0,
            textAlign: `center`
        }, he = {
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
        return (0, I.jsx)(n, {
            children: e && (0, I.jsxs)(i.div, {
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
                    (0, I.jsx)(i.div, {
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
                    (0, I.jsxs)(`div`, {
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
                            (0, I.jsx)(i.div, {
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
                                children: (0, I.jsx)(S, {
                                    name: `skull`,
                                    size: r ? 72 : 100
                                })
                            }),
                            (0, I.jsx)(i.div, {
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
                            (0, I.jsx)(i.div, {
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
                            (0, I.jsxs)(i.div, {
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
                                    (0, I.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 14,
                                            color: `#ee6655`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2
                                        },
                                        children: [
                                            `Sunk by `,
                                            D.name
                                        ]
                                    }),
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: r ? 12 : 13,
                                            color: `rgba(255,255,255,0.5)`,
                                            fontFamily: `'IM Fell English', cursive`,
                                            textAlign: `center`,
                                            lineHeight: 1.35
                                        },
                                        children: D.tip
                                    })
                                ]
                            }),
                            (0, I.jsxs)(i.div, {
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
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            letterSpacing: 3,
                                            color: `rgba(255,255,255,0.35)`,
                                            fontFamily: `'Cinzel', serif`
                                        },
                                        children: `SCORE`
                                    }),
                                    (0, I.jsxs)(`div`, {
                                        style: {
                                            fontSize: r ? 40 : 52,
                                            color: `#eedd44`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 700,
                                            lineHeight: 1.05
                                        },
                                        children: [
                                            t.score.toLocaleString(),
                                            (0, I.jsx)(`span`, {
                                                style: {
                                                    fontSize: r ? 16 : 20,
                                                    color: `rgba(238,221,68,0.55)`,
                                                    marginLeft: 6
                                                },
                                                children: `pts`
                                            })
                                        ]
                                    }),
                                    c && (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `#44ffaa`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 4
                                        },
                                        children: `NEW BEST`
                                    }),
                                    !c && s > t.score && (0, I.jsxs)(`div`, {
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
                            T && (0, I.jsx)(i.div, {
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
                            (0, I.jsxs)(i.div, {
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
                                    oe && (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try again when you're online`
                                    }),
                                    E && x ? (0, I.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: x,
                                        style: me,
                                        children: `PLAY DAILY · 1 TRY`
                                    }) : (0, I.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ce,
                                        disabled: C,
                                        style: me,
                                        children: C ? `PREPARING…` : `SAIL AGAIN`
                                    }),
                                    (0, I.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            gap: 10,
                                            flexWrap: `wrap`,
                                            justifyContent: `center`,
                                            alignItems: `center`
                                        },
                                        children: [
                                            E && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ce,
                                                disabled: C,
                                                style: he,
                                                children: C ? `…` : `Sail free run`
                                            }),
                                            !E && pe && x && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: x,
                                                style: {
                                                    ...he,
                                                    borderColor: `rgba(136,221,255,0.4)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Daily · 1 try`
                                            }),
                                            !h && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ne,
                                                disabled: te,
                                                style: {
                                                    ...he,
                                                    borderColor: `rgba(200,160,48,0.4)`,
                                                    color: `#c8a030`
                                                },
                                                children: te ? `…` : `Connect wallet`
                                            }),
                                            ue && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ue,
                                                style: {
                                                    ...he,
                                                    borderColor: `rgba(136,221,255,0.35)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Watch replay`
                                            }),
                                            (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: le,
                                                style: {
                                                    ...he,
                                                    border: `none`,
                                                    color: `rgba(255,255,255,0.28)`
                                                },
                                                children: `← Menu`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, I.jsx)(B, {
                                status: d,
                                onRetry: f
                            }),
                            l.length > 0 && (0, I.jsx)(i.div, {
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
                                children: l.map((e)=>(0, I.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, I.jsx)(S, {
                                                name: e.icon,
                                                size: 22
                                            }),
                                            (0, I.jsxs)(`div`, {
                                                style: {
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, I.jsxs)(`div`, {
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
                                                    (0, I.jsxs)(`div`, {
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
                            p.length > 0 && (0, I.jsx)(i.div, {
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
                                    let e = k(p[0]), t = e ? Re[e.rarity] : `#eedd88`;
                                    return (0, I.jsxs)(I.Fragment, {
                                        children: [
                                            e && (0, I.jsx)(`img`, {
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
                                            (0, I.jsxs)(`div`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0,
                                                    textAlign: `left`
                                                },
                                                children: [
                                                    (0, I.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 10,
                                                            letterSpacing: 2,
                                                            color: t,
                                                            fontFamily: `'Cinzel', serif`
                                                        },
                                                        children: `NFT CLAIMED · MINT PENDING`
                                                    }),
                                                    (0, I.jsx)(`div`, {
                                                        style: {
                                                            fontSize: 14,
                                                            color: `#f0e6c8`,
                                                            fontFamily: `'Pirata One', cursive`,
                                                            overflow: `hidden`,
                                                            textOverflow: `ellipsis`,
                                                            whiteSpace: `nowrap`
                                                        },
                                                        children: p.map(ze).join(` · `)
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            }),
                            (0, I.jsx)(`button`, {
                                type: `button`,
                                onClick: ()=>de((e)=>!e),
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
                                children: w ? `▲ HIDE DETAILS` : `▼ VOYAGE DETAILS`
                            }),
                            (0, I.jsx)(n, {
                                children: w && (0, I.jsxs)(i.div, {
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
                                        (0, I.jsxs)(`div`, {
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
                                        (0, I.jsx)(`div`, {
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
                                                    val: fe,
                                                    color: `#88ddff`
                                                }
                                            ].map((e)=>(0, I.jsxs)(`div`, {
                                                    style: {
                                                        textAlign: `center`
                                                    },
                                                    children: [
                                                        (0, I.jsx)(`div`, {
                                                            style: {
                                                                fontSize: 10,
                                                                color: `rgba(255,255,255,0.3)`,
                                                                letterSpacing: 2,
                                                                fontFamily: `'Cinzel', serif`
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, I.jsx)(`div`, {
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
                                        t.scoreBreakdown && (0, I.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `10px 16px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(255,255,255,0.08)`,
                                                background: `rgba(0,0,0,0.3)`
                                            },
                                            children: [
                                                (0, I.jsx)(`div`, {
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
                                                ].filter((e)=>e.val > 0).map((e)=>(0, I.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            marginBottom: 2
                                                        },
                                                        children: [
                                                            (0, I.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: `rgba(255,255,255,0.4)`,
                                                                    fontFamily: `'Cinzel', serif`
                                                                },
                                                                children: e.label
                                                            }),
                                                            (0, I.jsx)(`span`, {
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
                                        u.length > 0 && (0, I.jsxs)(`div`, {
                                            style: {
                                                marginBottom: 14,
                                                padding: `12px 14px`,
                                                borderRadius: 10,
                                                border: `1px solid rgba(136,221,255,0.3)`,
                                                background: `rgba(10,24,40,0.65)`
                                            },
                                            children: [
                                                (0, I.jsx)(`div`, {
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
                                                u.map((e)=>(0, I.jsxs)(`div`, {
                                                        style: {
                                                            marginTop: 6
                                                        },
                                                        children: [
                                                            (0, I.jsxs)(`div`, {
                                                                style: {
                                                                    display: `flex`,
                                                                    justifyContent: `space-between`,
                                                                    marginBottom: 3
                                                                },
                                                                children: [
                                                                    (0, I.jsx)(`div`, {
                                                                        style: {
                                                                            fontFamily: `'Pirata One', cursive`,
                                                                            fontSize: 14,
                                                                            color: `#c8e8ff`
                                                                        },
                                                                        children: e.feat.name
                                                                    }),
                                                                    (0, I.jsxs)(`div`, {
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
                                                            (0, I.jsx)(`div`, {
                                                                style: {
                                                                    height: 3,
                                                                    borderRadius: 2,
                                                                    background: `rgba(255,255,255,0.08)`,
                                                                    overflow: `hidden`,
                                                                    marginBottom: 3
                                                                },
                                                                children: (0, I.jsx)(`div`, {
                                                                    style: {
                                                                        height: `100%`,
                                                                        width: `${Math.round(e.ratio * 100)}%`,
                                                                        background: `linear-gradient(90deg,#2a6a8a,#88ddff)`
                                                                    }
                                                                })
                                                            }),
                                                            (0, I.jsx)(`div`, {
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
                                        (0, I.jsx)(`div`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(255,255,255,0.25)`,
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: 1,
                                                marginBottom: 12,
                                                textAlign: `center`
                                            },
                                            children: a ? ie() ? `Seed ${t.seed} · Daily ${b()}` : `Blind daily — seed at 00:00 UTC` : `Seed ${t.seed}`
                                        }),
                                        g && !_ && (0, I.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                alignItems: `center`,
                                                gap: 6,
                                                marginBottom: 12
                                            },
                                            children: [
                                                (0, I.jsx)(i.button, {
                                                    whileHover: {
                                                        scale: 1.04
                                                    },
                                                    disabled: ee,
                                                    onClick: async ()=>{
                                                        y(!0);
                                                        try {
                                                            await Pt(g, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                                        } catch (e) {
                                                            console.warn(`On-chain submit failed:`, e);
                                                        }
                                                        v(!0), y(!1);
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
                                                    children: ee ? `ENGRAVING...` : (0, I.jsxs)(I.Fragment, {
                                                        children: [
                                                            (0, I.jsx)(S, {
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
                                                (0, I.jsx)(`div`, {
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
                                            }, i = (t.relics ?? []).map((e)=>se(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = ae ? `\n⚔️ #${ae.rank} in Starktember — ${ae.total.toLocaleString()} pts across the month.` : ``, c = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                            return (0, I.jsx)(Ft, {
                                                isMobile: r,
                                                onShare: ()=>{
                                                    It(c);
                                                },
                                                payload: {
                                                    score: t.score,
                                                    turn: t.turn,
                                                    gold: t.ship.gold,
                                                    runTitle: t.runTitle,
                                                    seed: t.seed,
                                                    deathName: D.name,
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
    function zt({ queue: e, isMobile: t, onDismiss: r }) {
        let a = e[0] ?? null;
        if ((0, j.useEffect)(()=>{
            a && P(`nft`);
        }, [
            a
        ]), !a) return null;
        let o = k(a), s = o?.name ?? ze(a), c = o?.rarity ?? `Rare`, l = Re[c], u = Ie(a), d = o ? Le(o.image) : null, f = e.length - 1;
        return (0, I.jsx)(n, {
            children: (0, I.jsxs)(i.div, {
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
                    (0, I.jsx)(`div`, {
                        "aria-hidden": !0,
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            opacity: .35,
                            background: `radial-gradient(circle at 50% 40%, ${l}22 0%, transparent 55%)`
                        }
                    }),
                    (0, I.jsx)(i.div, {
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
                    (0, I.jsxs)(i.div, {
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
                    (0, I.jsxs)(i.div, {
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
                            (0, I.jsx)(i.div, {
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
                            (0, I.jsx)(`div`, {
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
                                children: d ? (0, I.jsx)(`img`, {
                                    src: d,
                                    alt: s,
                                    style: {
                                        width: `100%`,
                                        height: `100%`,
                                        objectFit: `cover`,
                                        display: `block`
                                    }
                                }) : (0, I.jsx)(`div`, {
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
                    (0, I.jsx)(i.div, {
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
                    o?.condition && (0, I.jsx)(i.div, {
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
                    (0, I.jsx)(i.div, {
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
                    (0, I.jsx)(i.div, {
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
                    (0, I.jsxs)(i.div, {
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
                            (0, I.jsx)(i.button, {
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
                            (0, I.jsx)(`button`, {
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
    function Bt({ cinematic: e, isMobile: t, muted: r, zone: a, onClose: o, onDeathEnd: s }) {
        let c = !!(e && (de[e] || O[e] || e === `death`)), l = !!(c && e && !t && de[e]), u = e ? e === `death` ? ve[a] ?? O.storm : O[e] ?? null : null, d = ()=>{
            e === `death` && s(), o();
        };
        return (0, I.jsx)(n, {
            children: c && e && (0, I.jsxs)(i.div, {
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
                    l ? (0, I.jsx)(i.video, {
                        src: de[e],
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
                    }, e) : u ? (0, I.jsx)(i.div, {
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
                    (0, I.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            pointerEvents: `none`,
                            background: e === `death` ? `linear-gradient(to bottom, rgba(40,5,5,0.35) 0%, rgba(5,8,15,0.55) 55%, rgba(5,8,15,0.88) 100%)` : `linear-gradient(to bottom, rgba(5,8,15,0.1) 0%, rgba(5,8,15,0.35) 70%, rgba(5,8,15,0.7) 100%)`
                        }
                    }),
                    (0, I.jsxs)(`div`, {
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
                            (0, I.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 28 : 40,
                                    color: e === `death` ? `#ee6666` : `#e8e0d0`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 2px 30px rgba(0,0,0,0.95)`
                                },
                                children: ue[e] ?? ``
                            }),
                            (0, I.jsx)(`div`, {
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
    function Vt({ open: e, isMobile: t, muted: r, onClose: a }) {
        return (0, I.jsx)(n, {
            children: e && (0, I.jsxs)(i.div, {
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
                    t ? (0, I.jsx)(i.div, {
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
                    }) : (0, I.jsx)(`video`, {
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
                    (0, I.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            background: t ? `radial-gradient(ellipse at center, rgba(80,0,100,0.35) 0%, rgba(0,0,0,0.65) 100%)` : `rgba(0,0,0,0.3)`
                        }
                    }),
                    (0, I.jsxs)(i.div, {
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
                            (0, I.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 26 : 32,
                                    color: `#cc44ee`,
                                    fontFamily: `'Pirata One', cursive`,
                                    letterSpacing: 3,
                                    textShadow: `0 0 30px rgba(150,0,150,0.9)`
                                },
                                children: `THE HUNTER STRIKES!`
                            }),
                            (0, I.jsx)(`div`, {
                                style: {
                                    fontSize: t ? 14 : 16,
                                    color: `rgba(255,255,255,0.7)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    marginTop: 6
                                },
                                children: `Tentacles rake the hull`
                            }),
                            (0, I.jsx)(`div`, {
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
    var Ht = `/assets/score-DnnSqbJU.png`, Ut = `/icons/gold.png`, Wt = (e, t = 14)=>(0, I.jsx)(S, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    Gt = function({ walletAddress: e, account: t, username: r, onHome: o, onPlayDaily: ie, dailySeed: w, isDaily: T, seedToken: D, shipId: k, resumeState: Ie, resumeRunId: Le, resumeActions: Re }) {
        let { connect: ze, connecting: Be } = a(), [A, M] = (0, j.useState)(()=>Ie || (D && !T && w != null ? re(w, k ?? `default`, `pending`, []) : E(w, k ?? `default`))), Ve = (0, j.useRef)(!e), [We, Ge] = (0, j.useState)(()=>!m()), [N, Ke] = (0, j.useState)(null), [Je, Ye] = (0, j.useState)(null), [Xe, Ze] = (0, j.useState)(!1), [nt, rt] = (0, j.useState)([]), [it, at] = (0, j.useState)([]), [ot, st] = (0, j.useState)([]), ct = (0, j.useRef)(0), [F, lt] = (0, j.useState)(null), ut = (0, j.useRef)((A.relics ?? []).length), [dt, ft] = (0, j.useState)(!1), [ht, L] = (0, j.useState)({
            kind: `idle`
        }), [_t, yt] = (0, j.useState)(!1), xt = (0, j.useRef)(!1), [St, Ct] = (0, j.useState)([]), [wt, Tt] = (0, j.useState)([]), [z, Et] = (0, j.useState)(null), [Ot, Nt] = (0, j.useState)(0), [Pt, Ft] = (0, j.useState)(()=>c()), [It, Lt] = (0, j.useState)(!1), [B, V] = (0, j.useState)(()=>Qe()), [H, Gt] = (0, j.useState)(()=>et()), Kt = (0, j.useRef)(H);
        Kt.current = H;
        let [qt, Jt] = (0, j.useState)(!1), [U, Yt] = (0, j.useState)(window.innerWidth < 768), W = (0, j.useRef)(T === !0), G = W.current, Xt = (0, j.useRef)(D), Zt = (0, j.useRef)(!1), Qt = (0, j.useRef)(!1), [$t, en] = (0, j.useState)(!1), [tn, nn] = (0, j.useState)(!1), [rn, an] = (0, j.useState)(()=>!!D && !Ie && !T);
        (0, j.useEffect)(()=>{
            if (!D || Ie || T || w == null) {
                an(!1);
                return;
            }
            let e = !1;
            return (async ()=>{
                let t = await ke(D, [], k ?? `default`);
                e || (t?.reveals?.length ? M(re(w, k ?? `default`, t.map_commitment, t.reveals)) : M(E(w, k ?? `default`)), an(!1));
            })(), ()=>{
                e = !0;
            };
        }, [
            D,
            Ie,
            T,
            w,
            k
        ]), (0, j.useEffect)(()=>{
            if (A.gameOver) {
                Ke(null);
                return;
            }
            A.turn > 0 && He(`sail`), Ke(Ue(A));
        }, [
            A.turn,
            A.event,
            A.showPort,
            A.hunter?.active,
            A.stormDistance,
            A.gameOver,
            A.pirateDuel?.phase
        ]);
        let on = ()=>{
            N && (He(N.id), Ke(null));
        };
        (0, j.useEffect)(()=>{
            G && (v(), e && b());
        }, []), (0, j.useEffect)(()=>{
            if (!e) {
                Ge(!m());
                return;
            }
            Me(e, b()).then((e)=>{
                if (e) {
                    Ge(!1);
                    return;
                }
                m() && g(), Ge(!0);
            });
        }, [
            e
        ]);
        let K = (0, j.useRef)(Le ?? crypto.randomUUID()), q = (0, j.useRef)(Re ? [
            ...Re
        ] : []), sn = (e)=>{
            q.current.push(e);
        }, J = (0, j.useRef)([]);
        (0, j.useEffect)(()=>{
            let t = e;
            !t || A.gameOver || q.current.length !== 0 && u({
                run_id: K.current,
                wallet_address: t,
                seed: A.seed,
                ship_id: k ?? `default`,
                is_daily: W.current,
                seed_token: Xt.current ?? null,
                actions: q.current,
                turn: A.turn,
                score: A.score,
                saved_at: Date.now()
            });
        }, [
            A
        ]), (0, j.useEffect)(()=>{
            let e = q.current.length - 1;
            e < 0 || (J.current[e * 3] = A.score, J.current[e * 3 + 1] = A.ship.hull, J.current[e * 3 + 2] = A.rngState ?? -1);
        }, [
            A
        ]);
        let cn = (0, j.useRef)(0);
        (0, j.useEffect)(()=>{
            e && (Le || De({
                run_id: K.current,
                wallet_address: e,
                username: r ?? null,
                seed: A.seed,
                is_daily: G,
                seed_token: D ?? null
            }));
        }, []), (0, j.useEffect)(()=>{
            !e || A.gameOver || A.turn - cn.current < 3 || (cn.current = A.turn, Ae(K.current, {
                score: A.score,
                turn: A.turn,
                zone: A.currentZone ?? 1,
                gold: A.ship.gold,
                hull: A.ship.hull
            }));
        }, [
            A.turn
        ]);
        let ln = ()=>({
                run_id: K.current,
                wallet_address: e,
                seed: A.seed,
                ship_id: k ?? `default`,
                is_daily: W.current,
                actions: q.current,
                checks: q.current.flatMap((e, t)=>[
                        J.current[t * 3] ?? -1,
                        J.current[t * 3 + 1] ?? -1,
                        J.current[t * 3 + 2] ?? -1
                    ]),
                final_score: A.score,
                final_turn: A.turn
            }), un = async ()=>{
            if (!e) return;
            if (!W.current && !Xt.current) {
                L({
                    kind: `local`
                });
                return;
            }
            let t = ln();
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
                let t = await Pe(K.current);
                if (t?.approved) {
                    if (ft(!0), L({
                        kind: `ok`,
                        daily: W.current
                    }), W.current && v(), t.nft?.minted?.length) {
                        let e = t.nft.minted.map((e)=>typeof e == `string` ? e : e.nft).filter(Boolean);
                        Ct(e), Tt(e);
                    }
                } else console.warn(`[approve] refuse :`, t?.raison ?? t), L({
                    kind: `rejected`,
                    raison: t?.raison ?? void 0
                }), W.current && Me(e, b()).then((e)=>{
                    e || g();
                });
            } catch (e) {
                console.warn(`[approve]`, e), s(`approve`, {
                    run_id: K.current
                }), L({
                    kind: `queued`,
                    step: `approve`
                });
            }
        };
        (0, j.useEffect)(()=>{
            if (A.gameOver) {
                if (!e) {
                    L({
                        kind: `idle`
                    });
                    return;
                }
                if (!xt.current) {
                    if (xt.current = !0, je(K.current, {
                        score: A.score,
                        turn: A.turn,
                        zone: A.currentZone ?? 1,
                        gold: A.ship.gold,
                        hull: A.ship.hull,
                        run_title: A.runTitle
                    }), !W.current && !Xt.current) {
                        console.warn(`[approve] skip : seed local, run non soumise`), L({
                            kind: `local`
                        }), l();
                        return;
                    }
                    un(), l();
                }
            }
        }, [
            A.gameOver
        ]), (0, j.useEffect)(()=>{
            let e = (e)=>{
                let t = e.detail;
                !t?.run_id || t.run_id !== K.current || t.approved && (ft(!0), L({
                    kind: `ok`,
                    daily: G
                }), G && v());
            };
            return window.addEventListener(`corsair-sync`, e), ()=>window.removeEventListener(`corsair-sync`, e);
        }, [
            G
        ]), (0, j.useEffect)(()=>{
            let e = ()=>Yt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [Y, X] = (0, j.useState)(null), [dn, fn] = (0, j.useState)(!1), pn = (0, j.useRef)(null), mn = (0, j.useRef)(new Set), [hn, gn] = (0, j.useState)(null);
        (0, j.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !A.gameOver || !G || !e || !n || dt && Ne().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && gn({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            A.gameOver,
            dt
        ]);
        let _n = (0, j.useRef)({
            x: A.ship.x,
            y: A.ship.y
        }), [vn, yn] = (0, j.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [bn, xn] = (0, j.useState)({
            x: 0,
            y: 0
        });
        (0, j.useEffect)(()=>{
            let e = _n.current, t = A.ship.x - e.x, n = A.ship.y - e.y;
            if (_n.current = {
                x: A.ship.x,
                y: A.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = fe(A.ship.vision, U), i = .8;
            yn({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), xn({
                x: t,
                y: n
            });
            let a = setTimeout(()=>xn({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>yn({
                    x: 0,
                    y: 0,
                    instant: !1
                }));
            return ()=>{
                cancelAnimationFrame(o), clearTimeout(a);
            };
        }, [
            A.ship.x,
            A.ship.y,
            U,
            A.ship.vision
        ]);
        let [Sn, Z] = (0, j.useState)(!1), [Q, Cn] = (0, j.useState)(null), [wn, Tn] = (0, j.useState)(null), [En, Dn] = (0, j.useState)(0), On = ()=>{
            Ze(!0), setTimeout(()=>Ze(!1), 400);
        }, kn = (e)=>{
            Tn(e), setTimeout(()=>Tn(null), 150);
        }, $ = A, An = Math.min(100, (1 - $.stormDistance / 10) * 100), jn = $.ship.hull <= 5 ? `#ee4444` : $.ship.hull <= 10 ? `#ee8844` : `#44cc88`, Mn = !$.escapeUsed && $.ship.upgrades.includes(`escape`) && $.event && $.event.choices[0].risk !== `safe`;
        (0, j.useEffect)(()=>{
            if (H || A.gameOver) return;
            let e = A.event?.cellType;
            e && (!de[e] && !O[e] || mn.current.has(e) || X(e));
        }, [
            A.event?.cellType,
            A.gameOver,
            H
        ]), (0, j.useEffect)(()=>{
            if (!Y || Y === `death`) return;
            let e = U ? 2200 : {
                ancient_kraken: 6500
            }[Y] ?? 5e3, t = setTimeout(()=>{
                mn.current.add(Y), X(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            Y,
            U
        ]);
        let Nn = (0, j.useRef)(1);
        (0, j.useEffect)(()=>{
            let e = A.currentZone ?? 1;
            if (e > Nn.current) {
                let t = Nn.current, n = ge[e], r = ge[t]?.transitionText ?? [], i = r.length > 0 ? [
                    ...r,
                    ``,
                    `You have entered:`,
                    n.name.toUpperCase()
                ] : [
                    `You have entered:`,
                    n.name.toUpperCase()
                ];
                H || (Et({
                    lines: i,
                    zone: e
                }), Nt(0)), Nn.current = e;
            }
        }, [
            A.currentZone,
            H
        ]), (0, j.useEffect)(()=>{
            if (!z) return;
            if (Ot >= z.lines.length) {
                setTimeout(()=>Et(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Nt((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            z,
            Ot
        ]), (0, j.useEffect)(()=>{
            A.dangerStreak > ct.current && (ct.current = A.dangerStreak);
        }, [
            A.dangerStreak
        ]), (0, j.useEffect)(()=>{
            if (A.gameOver) {
                let e = ye(A);
                e.length > 0 && (at(e), P(`streak`));
                let t = d({
                    score: A.score,
                    turn: A.turn,
                    zone: A.currentZone ?? 1,
                    gold: A.ship.gold,
                    hunterAttacksSurvived: A.hunterAttacksSurvived ?? 0,
                    peakStreak: ct.current,
                    hadStreak5: (A.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if (st(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (Ft(t.pb), Lt(!0)), l(), Kt.current) Z(!1), X(null), fn(!0);
                else if (U) Z(!1), X(`death`), pn.current = setTimeout(()=>{
                    fn((e)=>e || !0), X(null);
                }, 2200);
                else {
                    let e = Pn.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Z(!1), X(`death`), pn.current = setTimeout(()=>{
                            fn((e)=>e || !0), X(null);
                        }, 9e3);
                    }, e);
                }
            } else pn.current &&= (clearTimeout(pn.current), null), fn(!1), X(null), mn.current.clear(), ct.current = 0, st([]), Lt(!1);
        }, [
            A.gameOver,
            U
        ]);
        let Pn = (0, j.useRef)(!1), Fn = (0, j.useRef)(-99), In = (0, j.useRef)(null);
        (0, j.useEffect)(()=>{
            H || A.log?.includes(`Tentacles rake the hull`) && (A.turn - Fn.current < 3 || (Fn.current = A.turn, In.current && clearTimeout(In.current), Pn.current = !0, Z(!0), In.current = setTimeout(()=>{
                Pn.current = !1, Z(!1);
            }, U ? 2e3 : 7200)));
        }, [
            A.log,
            A.turn,
            U,
            H
        ]), (0, j.useEffect)(()=>{
            H && (Y && Y !== `death` && (mn.current.add(Y), X(null)), Y === `death` && (X(null), fn(!0)), Et(null), Pn.current = !1, Z(!1));
        }, [
            H
        ]), (0, j.useEffect)(()=>{
            if (!Sn) return;
            let e = ()=>{
                Pn.current = !1, Z(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            Sn
        ]), (0, j.useEffect)(()=>{
            if (A.log?.includes(`⚡ Storm surge`) && kn(`rgba(100,150,255,0.35)`), A.log?.includes(`Storm Rider surfs`) && kn(`rgba(50,200,160,0.32)`), A.event?.cellType === `ancient_kraken` ? kn(`rgba(200,160,48,0.4)`) : A.event?.cellType === `kraken` && kn(`rgba(150,0,255,0.3)`), A.hunter?.active) {
                let e = le(A);
                Dn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else Dn(0);
        }, [
            A
        ]), (0, j.useEffect)(()=>{
            let e = (e)=>{
                if (A.gameOver || A.event || A.pirateDuel || A.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && Rn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && Rn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && Rn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            A.gameOver,
            A.event,
            A.pirateDuel,
            A.showPort,
            A.turn
        ]);
        let Ln = async (e, t)=>{
            if (!A.fairFog || !Xt.current) {
                sn(e), M(t);
                return;
            }
            if (!(Qt.current || rn)) {
                Qt.current = !0;
                try {
                    let n = [
                        ...q.current,
                        e
                    ], r = await ke(Xt.current, n, k ?? `default`);
                    if (!r) {
                        en(!0);
                        return;
                    }
                    sn(e), M((e)=>{
                        let n = t({
                            ...e,
                            grid: p(e.grid, r.reveals)
                        });
                        return y({
                            ...n,
                            grid: p(n.grid, r.reveals),
                            fairFog: e.fairFog
                        });
                    });
                } finally{
                    Qt.current = !1;
                }
            }
        }, Rn = (e, t)=>{
            Ln(e === -1 ? 0 : e === 1 ? 2 : 1, (n)=>te(n, e, t));
        }, zn = (e)=>{
            Ln(10 + e, (t)=>{
                let n = Ee(t, e);
                return n.ship.hull < t.ship.hull && On(), n;
            });
        }, Bn = (e)=>{
            Zt.current || (Zt.current = !0, window.setTimeout(()=>{
                Zt.current = !1;
            }, 280), Ln(80 + e, (t)=>{
                let n = h(t, e);
                return n.ship.hull < t.ship.hull && On(), n;
            }));
        }, Vn = ()=>{
            Ln(20, (e)=>C(e));
        }, Hn = (e)=>{
            Ln(e === `hull` ? 30 : e === `weapon` ? 31 : 32, (t)=>oe(t, e));
        }, Un = async ()=>{
            if (e) {
                nn(!0), en(!1);
                let t = await Fe(e);
                if (nn(!1), !t) {
                    en(!0);
                    return;
                }
                W.current = !1, Xt.current = t.seed_token, q.current = [], J.current = [], cn.current = 0, K.current = crypto.randomUUID(), xt.current = !1, ft(!1), L({
                    kind: `idle`
                }), yt(!1), Ct([]), Tt([]);
                let n = E(t.seed, k ?? `default`);
                if (t.fair_fog) {
                    let e = await ke(t.seed_token, [], k ?? `default`);
                    e?.reveals?.length && (n = re(t.seed, k ?? `default`, e.map_commitment || t.map_commitment || ``, e.reveals));
                }
                De({
                    run_id: K.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), M(n);
                return;
            }
            W.current = !1;
            let t = E(void 0, k ?? `default`);
            q.current = [], J.current = [], cn.current = 0, K.current = crypto.randomUUID(), xt.current = !1, ft(!1), L({
                kind: `idle`
            }), yt(!1), Ct([]), Tt([]), M(t);
        }, Wn = (0, j.useRef)(null);
        (0, j.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = Qe(), n.play().catch(()=>{}), Wn.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), Wn.current && (Wn.current.pause(), Wn.current.currentTime = 0);
            };
        }, []), (0, j.useEffect)(()=>{
            Wn.current && (Wn.current.muted = B), qe(B), $e(B);
        }, [
            B
        ]), (0, j.useEffect)(()=>{
            tt(H);
        }, [
            H
        ]);
        let Gn = ()=>V((e)=>!e), Kn = ()=>Gt((e)=>!e), qn = (0, j.useRef)({
            gold: A.ship.gold,
            hull: A.ship.hull,
            zone: A.currentZone ?? 1,
            over: A.gameOver,
            mult: A.scoreMultiplier ?? 1,
            hmode: A.hunter?.mode ?? ``,
            storm: A.stormDistance
        });
        return (0, j.useEffect)(()=>{
            let e = qn.current, t = !!A.log?.includes(`Tentacles rake`);
            if (A.gameOver && !e.over) P(`death`);
            else if (!A.gameOver) {
                A.ship.gold > e.gold && P(`gold`), A.ship.gold < e.gold && A.showPort && P(`buy`), t ? P(`hunter_attack`) : A.ship.hull < e.hull && P(`damage`), (A.currentZone ?? 1) !== e.zone && P(`zone`), (A.scoreMultiplier ?? 1) > e.mult && P(`streak`);
                let n = A.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && P(`hunter_near`), A.stormDistance < e.storm && A.stormDistance <= 4 && A.stormDistance > 0 && (P(`thunder`), On());
            }
            qn.current = {
                gold: A.ship.gold,
                hull: A.ship.hull,
                zone: A.currentZone ?? 1,
                over: A.gameOver,
                mult: A.scoreMultiplier ?? 1,
                hmode: A.hunter?.mode ?? ``,
                storm: A.stormDistance
            };
            let n = (A.relics ?? []).length;
            if (n > ut.current) {
                let e = (A.relics ?? [])[n - 1], t = se(e);
                t && (lt(t), P(`streak`));
            }
            ut.current = n;
        }, [
            A
        ]), (0, I.jsxs)(i.div, {
            animate: Xe ? {
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
                (0, I.jsxs)(`div`, {
                    style: {
                        position: `absolute`,
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: `none`,
                        overflow: `hidden`
                    },
                    children: [
                        (0, I.jsx)(i.div, {
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
                                backgroundImage: `url(${ve[$.currentZone ?? 1] ?? ve[1]})`,
                                backgroundSize: `cover`,
                                backgroundPosition: `center`,
                                filter: `saturate(0.7) brightness(0.8)`
                            }
                        }, $.currentZone ?? 1),
                        (0, I.jsx)(`div`, {
                            style: {
                                position: `absolute`,
                                inset: 0,
                                background: `radial-gradient(ellipse at 50% 45%, rgba(8,15,24,0.35) 0%, rgba(8,15,24,0.82) 55%, rgba(8,15,24,0.97) 100%)`
                            }
                        }),
                        (0, I.jsx)(i.div, {
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
                wn && (0, I.jsx)(i.div, {
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
                        background: wn,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                En > 0 && (0, I.jsx)(i.div, {
                    animate: {
                        opacity: [
                            En,
                            En * .6,
                            En
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
                $.ship.hull <= 5 && !$.gameOver && (0, I.jsx)(i.div, {
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
                (0, I.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        padding: U ? `calc(6px + env(safe-area-inset-top)) 8px 6px` : `8px 18px`,
                        background: `linear-gradient(180deg, rgba(6,12,20,0.78) 0%, rgba(6,12,20,0.42) 100%)`,
                        borderBottom: `1px solid rgba(255,255,255,0.05)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5,
                        backdropFilter: `blur(6px)`,
                        gap: U ? 6 : 12,
                        minWidth: 0
                    },
                    children: [
                        (0, I.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: U ? 4 : 8,
                                flexShrink: 0
                            },
                            children: [
                                (0, I.jsx)(`img`, {
                                    src: f,
                                    style: {
                                        width: U ? 22 : 36,
                                        height: U ? 22 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !U && (0, I.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                !U && (()=>{
                                    let e = we.find((e)=>e.id === ($.shipType ?? `default`)) ?? we[0], t = ge[$.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, I.jsxs)(`div`, {
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
                                            (0, I.jsx)(`img`, {
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
                                            (0, I.jsxs)(`span`, {
                                                style: {
                                                    display: `flex`,
                                                    flexDirection: `column`,
                                                    lineHeight: 1.15,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    (0, I.jsx)(`span`, {
                                                        children: e.name
                                                    }),
                                                    (0, I.jsx)(`span`, {
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
                        (0, I.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: U ? 8 : 16,
                                alignItems: `flex-end`,
                                flex: 1,
                                minWidth: 0,
                                justifyContent: U ? `center` : `flex-end`
                            },
                            children: (U ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${$.ship.hull}/${$.ship.maxHull}`,
                                    color: jn
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
                                    color: jn
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
                            ]).map((e)=>(0, I.jsxs)(`div`, {
                                    style: {
                                        textAlign: `center`,
                                        flexShrink: 0
                                    },
                                    children: [
                                        (0, I.jsx)(`div`, {
                                            style: {
                                                fontSize: 9,
                                                color: `rgba(255,255,255,0.4)`,
                                                letterSpacing: 1.2,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: e.label
                                        }),
                                        (0, I.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 3,
                                                fontWeight: 700,
                                                color: e.color
                                            },
                                            children: [
                                                (0, I.jsx)(`img`, {
                                                    src: {
                                                        hull: `/assets/hull-CGmPGbU0.png`,
                                                        gold: Ut,
                                                        vision: `/assets/vision-3Q65Za4i.png`,
                                                        power: `/assets/power-CBX9SU5d.png`,
                                                        turn: `/assets/turn-Wvx6vBym.png`
                                                    }[e.icon] || `/assets/hull-CGmPGbU0.png`,
                                                    style: {
                                                        width: U ? 16 : 22,
                                                        height: U ? 16 : 22,
                                                        objectFit: `contain`,
                                                        opacity: .9
                                                    }
                                                }),
                                                (0, I.jsx)(`span`, {
                                                    style: {
                                                        fontSize: U ? 14 : 16,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        (0, I.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: U ? 4 : 12,
                                flexShrink: 0
                            },
                            children: [
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        fontSize: U ? 16 : 18,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 3,
                                        minWidth: U ? 56 : void 0,
                                        justifyContent: `flex-end`
                                    },
                                    children: [
                                        (0, I.jsx)(`img`, {
                                            src: Ht,
                                            style: {
                                                width: U ? 20 : 28,
                                                height: U ? 20 : 28,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, I.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`,
                                                letterSpacing: .5
                                            },
                                            children: $.score
                                        }),
                                        !U && (0, I.jsx)(`span`, {
                                            style: {
                                                fontSize: 11,
                                                color: `rgba(238,221,68,0.55)`,
                                                fontWeight: 500
                                            },
                                            children: `pts`
                                        })
                                    ]
                                }),
                                (0, I.jsx)(`button`, {
                                    onClick: Gn,
                                    "aria-label": B ? `Unmute sound` : `Mute sound`,
                                    title: B ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.12)`,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontSize: U ? 8 : 10,
                                        letterSpacing: .5,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`,
                                        borderRadius: 6,
                                        minWidth: U ? 36 : void 0,
                                        minHeight: U ? 36 : void 0,
                                        padding: U ? `0 4px` : `4px 8px`
                                    },
                                    children: B ? `MUTE` : U ? `SND` : `SOUND`
                                }),
                                (0, I.jsx)(`button`, {
                                    onClick: Kn,
                                    "aria-label": H ? `Play cinematics` : `Skip cinematics`,
                                    title: H ? `Cinematics off — click to restore` : `Skip scene / portal / death videos`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.12)`,
                                        color: H ? `#c8a030` : `rgba(255,255,255,0.5)`,
                                        fontSize: U ? 8 : 10,
                                        letterSpacing: .5,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`,
                                        borderRadius: 6,
                                        minWidth: U ? 36 : void 0,
                                        minHeight: U ? 36 : void 0,
                                        padding: U ? `0 4px` : `4px 8px`
                                    },
                                    children: H ? `SKIP` : `CINE`
                                })
                            ]
                        })
                    ]
                }),
                U && ($.relics ?? []).length > 0 && (0, I.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: ($.relics ?? []).map((e)=>{
                        let t = se(e);
                        return t ? (0, I.jsx)(`div`, {
                            title: `${t.name} — ${t.desc}`,
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                padding: `2px 5px`,
                                borderRadius: 6,
                                background: `rgba(200,160,48,0.14)`,
                                border: `1px solid rgba(200,160,48,0.35)`
                            },
                            children: (0, I.jsx)(`img`, {
                                src: ee(e),
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
                U && $.hunter?.active && !$.pirateDuel && (()=>{
                    let e = ce($), t = le($), n = pe($);
                    return (0, I.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            flexDirection: `column`,
                            gap: 2,
                            padding: `5px 10px 6px`,
                            background: t === `critical` ? `rgba(140,0,30,0.55)` : t === `danger` ? `rgba(120,0,40,0.45)` : `rgba(80,0,80,0.3)`,
                            borderBottom: `1px solid ${t === `critical` ? `rgba(255,80,100,0.55)` : `rgba(180,30,180,0.3)`}`
                        },
                        children: [
                            (0, I.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, I.jsx)(S, {
                                        name: `kraken`,
                                        size: 15,
                                        style: {
                                            marginRight: 2
                                        }
                                    }),
                                    (0, I.jsxs)(`div`, {
                                        style: {
                                            fontSize: 11,
                                            color: $.hunter.mode === `frenzy` ? `#ff6666` : $.hunter.mode === `stalking` ? `#dd88ff` : `rgba(255,255,255,0.55)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            minWidth: 70
                                        },
                                        children: [
                                            Wt($.hunter.mode),
                                            xe($.hunter.mode)
                                        ]
                                    }),
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: be(e)
                                    }),
                                    (0, I.jsxs)(`div`, {
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
                            (0, I.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 8
                                },
                                children: [
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            flex: 1,
                                            height: 3,
                                            background: `rgba(255,255,255,0.1)`,
                                            borderRadius: 2
                                        },
                                        children: (0, I.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                borderRadius: 2,
                                                width: `${$.hunter.awareness}%`,
                                                background: $.hunter.awareness >= Ce.hunter.frenzyAwareness ? `#ee4444` : $.hunter.awareness >= Ce.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`,
                                                transition: `width 0.5s`
                                            }
                                        })
                                    }),
                                    (0, I.jsxs)(`span`, {
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
                            (0, I.jsx)(`div`, {
                                style: {
                                    fontSize: 10,
                                    color: `rgba(255,255,255,0.4)`,
                                    fontFamily: `'IM Fell English', cursive`,
                                    lineHeight: 1.25
                                },
                                children: _e($.hunter.mode)
                            })
                        ]
                    });
                })(),
                (0, I.jsxs)(`div`, {
                    style: {
                        flex: 1,
                        minHeight: 0,
                        display: `flex`,
                        overflow: `hidden`,
                        position: `relative`
                    },
                    children: [
                        (0, I.jsxs)(`div`, {
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
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        background: An > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${An > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, I.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: An > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, I.jsx)(S, {
                                                    name: `storm`,
                                                    size: 13
                                                }),
                                                ` STORM`
                                            ]
                                        }),
                                        (0, I.jsxs)(`div`, {
                                            style: {
                                                display: `flex`,
                                                alignItems: `baseline`,
                                                gap: 6
                                            },
                                            children: [
                                                (0, I.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: An > 70 ? `#ee4444` : `#ee8844`,
                                                        fontFamily: `'Cinzel', serif`,
                                                        lineHeight: 1
                                                    },
                                                    children: $.stormDistance
                                                }),
                                                (0, I.jsx)(`div`, {
                                                    style: {
                                                        fontSize: 11,
                                                        color: `rgba(255,255,255,0.45)`,
                                                        fontFamily: `'IM Fell English', cursive`
                                                    },
                                                    children: `turns left`
                                                })
                                            ]
                                        }),
                                        (0, I.jsx)(`div`, {
                                            style: {
                                                height: 3,
                                                background: `rgba(255,255,255,0.06)`,
                                                borderRadius: 2,
                                                marginTop: 6
                                            },
                                            children: (0, I.jsx)(i.div, {
                                                animate: {
                                                    width: `${An}%`
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
                                    let e = ce($), t = le($), n = pe($), r = t === `critical` || t === `danger`;
                                    return (0, I.jsxs)(`div`, {
                                        style: {
                                            background: t === `critical` ? `rgba(180,20,40,0.28)` : r ? `rgba(180,30,60,0.18)` : `rgba(180,30,180,0.08)`,
                                            border: `1px solid ${$.hunter.mode === `frenzy` || t === `critical` ? `rgba(255,60,90,0.75)` : r ? `rgba(220,50,80,0.55)` : $.hunter.mode === `stalking` ? `rgba(220,50,220,0.5)` : `rgba(255,255,255,0.08)`}`,
                                            borderRadius: 8,
                                            padding: `8px 9px`
                                        },
                                        children: [
                                            (0, I.jsxs)(`div`, {
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
                                                    (0, I.jsx)(S, {
                                                        name: `kraken`,
                                                        size: 13
                                                    }),
                                                    ` HUNTER`
                                                ]
                                            }),
                                            (0, I.jsxs)(`div`, {
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
                                                    Wt($.hunter.mode, 12),
                                                    xe($.hunter.mode)
                                                ]
                                            }),
                                            (0, I.jsxs)(`div`, {
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
                                            (0, I.jsx)(`div`, {
                                                style: {
                                                    fontSize: 10,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    fontFamily: `'IM Fell English', cursive`,
                                                    marginBottom: 4,
                                                    lineHeight: 1.25
                                                },
                                                children: _e($.hunter.mode)
                                            }),
                                            (0, I.jsxs)(`div`, {
                                                style: {
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 6,
                                                    marginTop: 2
                                                },
                                                children: [
                                                    (0, I.jsx)(`div`, {
                                                        style: {
                                                            flex: 1,
                                                            height: 3,
                                                            background: `rgba(255,255,255,0.06)`,
                                                            borderRadius: 2
                                                        },
                                                        children: (0, I.jsx)(i.div, {
                                                            animate: {
                                                                width: `${$.hunter.awareness}%`
                                                            },
                                                            transition: {
                                                                duration: .5
                                                            },
                                                            style: {
                                                                height: 3,
                                                                borderRadius: 2,
                                                                background: $.hunter.awareness >= Ce.hunter.frenzyAwareness ? `#ee4444` : $.hunter.awareness >= Ce.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`
                                                            }
                                                        })
                                                    }),
                                                    (0, I.jsxs)(`span`, {
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
                                (0, I.jsx)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.35)`,
                                        letterSpacing: 2,
                                        marginTop: 4,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: `EQUIPPED`
                                }),
                                $.ship.upgrades.length === 0 ? (0, I.jsx)(`div`, {
                                    style: {
                                        fontSize: 12,
                                        color: `rgba(255,255,255,0.28)`,
                                        fontStyle: `italic`,
                                        fontFamily: `'IM Fell English', cursive`
                                    },
                                    children: `None yet`
                                }) : $.ship.upgrades.map((e)=>{
                                    let t = R.find((t)=>t.id === e), n = e === `escape` && !$.escapeUsed, r = e === `escape` && $.escapeUsed;
                                    return (0, I.jsxs)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: r ? `rgba(255,255,255,0.28)` : gt[t.build],
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 5
                                        },
                                        children: [
                                            (0, I.jsx)(`img`, {
                                                src: pt[e],
                                                style: {
                                                    width: 16,
                                                    height: 16,
                                                    objectFit: `contain`,
                                                    opacity: r ? .4 : 1
                                                }
                                            }),
                                            (0, I.jsx)(`span`, {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: t.name
                                            }),
                                            n && (0, I.jsx)(`span`, {
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
                                            r && (0, I.jsx)(`span`, {
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
                                $.upgradeToken && (0, I.jsxs)(`div`, {
                                    style: {
                                        fontSize: 11,
                                        color: `#eedd44`,
                                        marginTop: 2,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 5
                                    },
                                    children: [
                                        (0, I.jsx)(S, {
                                            name: `star`,
                                            size: 12
                                        }),
                                        ` Free upgrade at port`
                                    ]
                                }),
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        marginTop: 6
                                    },
                                    children: [
                                        (0, I.jsx)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: `rgba(255,255,255,0.28)`,
                                                letterSpacing: 2,
                                                fontFamily: `'Cinzel', serif`,
                                                marginBottom: 6
                                            },
                                            children: `SHIP`
                                        }),
                                        (0, I.jsx)(`div`, {
                                            style: {
                                                display: `flex`,
                                                flexDirection: `column`,
                                                gap: 6
                                            },
                                            children: [
                                                {
                                                    key: `hull`,
                                                    label: `Hull`,
                                                    img: kt,
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
                                                    img: jt,
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
                                                    img: At,
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
                                                return (0, I.jsxs)(i.div, {
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
                                                        (0, I.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 4
                                                            },
                                                            children: [
                                                                (0, I.jsx)(`img`, {
                                                                    src: e.img,
                                                                    alt: ``,
                                                                    style: {
                                                                        width: 16,
                                                                        height: 16,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, I.jsxs)(`div`, {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        (0, I.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 12,
                                                                                color: r,
                                                                                fontFamily: `'Pirata One', cursive`,
                                                                                letterSpacing: .5
                                                                            },
                                                                            children: e.label
                                                                        }),
                                                                        (0, I.jsx)(`div`, {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: `rgba(255,255,255,0.35)`,
                                                                                fontFamily: `'Cinzel', serif`
                                                                            },
                                                                            children: e.sub[t]
                                                                        })
                                                                    ]
                                                                }),
                                                                (0, I.jsxs)(`div`, {
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
                                                        (0, I.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 0
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((e, n)=>(0, I.jsxs)(`div`, {
                                                                    style: {
                                                                        display: `flex`,
                                                                        alignItems: `center`
                                                                    },
                                                                    children: [
                                                                        n > 0 && (0, I.jsx)(`div`, {
                                                                            style: {
                                                                                width: 6,
                                                                                height: 1,
                                                                                background: e <= t ? `${r}88` : `rgba(255,255,255,0.08)`
                                                                            }
                                                                        }),
                                                                        (0, I.jsx)(`div`, {
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
                                                                            children: (0, I.jsx)(`span`, {
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
                        (0, I.jsx)(he, {
                            state: $,
                            isMobile: U,
                            slide: vn,
                            lurch: bn,
                            onboard: N,
                            onDismissOnboard: on,
                            onMove: Rn
                        }),
                        (0, I.jsxs)(`div`, {
                            style: {
                                width: U ? 0 : 200,
                                minWidth: U ? 0 : 200,
                                padding: U ? 0 : `12px 10px`,
                                display: U ? `none` : `flex`,
                                flexDirection: `column`,
                                gap: 6,
                                borderLeft: `1px solid rgba(255,255,255,0.04)`,
                                pointerEvents: $.showPort ? `none` : `auto`,
                                opacity: $.showPort ? .35 : 1,
                                overflow: `hidden`,
                                background: `linear-gradient(270deg, rgba(4,10,16,0.55) 0%, rgba(4,10,16,0.15) 100%)`
                            },
                            children: [
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        fontSize: 10,
                                        color: `rgba(255,255,255,0.4)`,
                                        letterSpacing: 2,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: [
                                        $.showPort ? `UPGRADES` : `EQUIPPED`,
                                        !$.showPort && (0, I.jsx)(`span`, {
                                            style: {
                                                color: `rgba(255,255,255,0.22)`,
                                                marginLeft: 6
                                            },
                                            children: `· buy at port`
                                        })
                                    ]
                                }),
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: 4,
                                        overflowY: `auto`
                                    },
                                    children: [
                                        !$.showPort && $.ship.upgrades.length === 0 && (0, I.jsx)(`div`, {
                                            style: {
                                                fontSize: 12,
                                                color: `rgba(255,255,255,0.3)`,
                                                fontStyle: `italic`,
                                                fontFamily: `'IM Fell English', cursive`,
                                                padding: `4px 2px`
                                            },
                                            children: `None yet — dock to buy`
                                        }),
                                        R.filter((e)=>$.showPort || $.ship.upgrades.includes(e.id)).map((e)=>{
                                            let t = $.ship.upgrades.includes(e.id), n = nt.includes(e.id), r = $.upgradeToken && $.showPort, i = r ? 0 : e.cost, a = !t && !n && $.ship.gold >= i && $.showPort, o = gt[e.build], s = t || $.showPort;
                                            return (0, I.jsxs)(`div`, {
                                                onClick: ()=>{
                                                    $.showPort && (n ? rt((t)=>t.filter((t)=>t !== e.id)) : a && rt((t)=>[
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
                                                    (0, I.jsxs)(`div`, {
                                                        style: {
                                                            display: `flex`,
                                                            justifyContent: `space-between`,
                                                            alignItems: `center`,
                                                            gap: 4
                                                        },
                                                        children: [
                                                            (0, I.jsxs)(`span`, {
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
                                                                    (0, I.jsx)(`img`, {
                                                                        src: pt[e.id],
                                                                        style: {
                                                                            width: 18,
                                                                            height: 18,
                                                                            objectFit: `contain`,
                                                                            flexShrink: 0
                                                                        }
                                                                    }),
                                                                    (0, I.jsx)(`span`, {
                                                                        style: {
                                                                            overflow: `hidden`,
                                                                            textOverflow: `ellipsis`,
                                                                            whiteSpace: `nowrap`
                                                                        },
                                                                        children: e.name
                                                                    })
                                                                ]
                                                            }),
                                                            t ? (0, I.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: o
                                                                },
                                                                children: `✓`
                                                            }) : n ? (0, I.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 10,
                                                                    color: `#44cc88`
                                                                },
                                                                children: `✓`
                                                            }) : (0, I.jsx)(`span`, {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: `#eedd44`,
                                                                    flexShrink: 0
                                                                },
                                                                children: r && $.showPort ? `FREE` : e.cost + `g`
                                                            })
                                                        ]
                                                    }),
                                                    s && (0, I.jsx)(`div`, {
                                                        style: {
                                                            marginTop: 3
                                                        },
                                                        children: (0, I.jsx)(vt, {
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
                (0, I.jsx)(Bt, {
                    cinematic: Y,
                    isMobile: U,
                    muted: B,
                    zone: $.currentZone ?? 1,
                    onDeathEnd: ()=>fn(!0),
                    onClose: ()=>{
                        Y && mn.current.add(Y), X(null);
                    }
                }),
                (0, I.jsx)(n, {
                    children: z && (0, I.jsxs)(i.div, {
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
                            ve[z.zone] && (0, I.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${ve[z.zone]})`,
                                    backgroundSize: `cover`,
                                    backgroundPosition: `center`,
                                    opacity: .28,
                                    filter: `saturate(0.7) brightness(0.55)`
                                }
                            }),
                            (0, I.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)`
                                }
                            }),
                            (0, I.jsx)(i.div, {
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
                                children: (0, I.jsx)(S, {
                                    name: `vortex`,
                                    size: U ? 72 : 96
                                })
                            }),
                            (0, I.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: U ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: z.lines.slice(0, Ot + 1).map((e, t)=>{
                                    let n = e === z.lines[z.lines.length - 1] && Ot >= z.lines.length - 1, r = e === `You have entered:`;
                                    return e ? (0, I.jsx)(i.div, {
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
                                    }, t) : (0, I.jsx)(`div`, {
                                        style: {
                                            height: 12
                                        }
                                    }, t);
                                })
                            }),
                            (0, I.jsx)(i.div, {
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
                (0, I.jsx)(n, {
                    children: F && (()=>{
                        let e = F.rarity === `legendary` ? `#eedd44` : F.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = F.rarity.toUpperCase();
                        return (0, I.jsxs)(i.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>lt(null),
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
                                (0, I.jsx)(i.div, {
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
                                (0, I.jsxs)(i.div, {
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
                                        (0, I.jsx)(i.div, {
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
                                        (0, I.jsx)(i.div, {
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
                                        (0, I.jsx)(`img`, {
                                            src: ee(F.id),
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
                                (0, I.jsxs)(i.div, {
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
                                (0, I.jsx)(i.div, {
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
                                    children: F.name
                                }),
                                (0, I.jsx)(i.div, {
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
                                    children: F.desc
                                }),
                                (0, I.jsx)(i.div, {
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
                (0, I.jsx)(n, {
                    children: $.pirateDuel && !Y && !$.gameOver && !$.showPort && (0, I.jsx)(i.div, {
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
                            alignItems: U ? `flex-start` : `center`,
                            justifyContent: `center`,
                            padding: U ? `calc(10px + env(safe-area-inset-top)) 10px calc(12px + env(safe-area-inset-bottom))` : 20,
                            overflowY: `auto`,
                            WebkitOverflowScrolling: `touch`,
                            background: `rgba(4,2,6,0.78)`,
                            backdropFilter: `blur(3px)`,
                            pointerEvents: `auto`
                        },
                        children: (0, I.jsx)(Dt, {
                            duel: $.pirateDuel,
                            ship: $.ship,
                            isMobile: U,
                            log: $.log,
                            notoriety: $.notoriety ?? 0,
                            onAction: Bn
                        })
                    }, `pirate-duel`)
                }),
                (0, I.jsx)(n, {
                    children: $.event && !$.pirateDuel && !$.gameOver && !$.showPort && ue[$.event.cellType] && (0, I.jsx)(bt, {
                        variant: `scene`,
                        event: $.event,
                        isMobile: U,
                        gold: $.ship.gold,
                        hull: $.ship.hull,
                        relics: $.relics,
                        upgrades: $.ship.upgrades,
                        score: $.score,
                        onboard: N,
                        onDismissOnboard: on,
                        onChoose: zn,
                        canEscape: !!Mn,
                        onSkip: Vn,
                        interactive: !Y || Y === `death`
                    }, `event-scene`)
                }),
                (0, I.jsx)(n, {
                    children: $.event && !$.pirateDuel && !$.gameOver && !$.showPort && $.event.cellType && !O[$.event.cellType] && (0, I.jsx)(bt, {
                        variant: `compact`,
                        event: $.event,
                        isMobile: U,
                        gold: $.ship.gold,
                        hull: $.ship.hull,
                        relics: $.relics,
                        upgrades: $.ship.upgrades,
                        cellIcon: me[$.event.cellType],
                        onboard: N,
                        onDismissOnboard: on,
                        onChoose: zn,
                        canEscape: !!Mn,
                        onSkip: Vn,
                        interactive: !Y || Y === `death`
                    }, `event-compact`)
                }),
                (0, I.jsx)(Mt, {
                    open: !!$.showPort && !$.gameOver,
                    isMobile: U,
                    ship: $.ship,
                    portUpgrades: $.portUpgrades,
                    upgradeToken: !!$.upgradeToken,
                    maxedComponents: $.maxedComponents,
                    cart: nt,
                    setCart: rt,
                    onboard: N,
                    onDismissOnboard: on,
                    onUpgradeComponent: Hn,
                    onReroll: ()=>{
                        sn(40), M((e)=>ae(e));
                    },
                    freeReroll: $.shipType === `merchant` && !!$.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        sn(n), M((n)=>ne(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of nt)sn(50 + mt.indexOf(e));
                        sn(70), M((e)=>{
                            let t = e;
                            for (let e of nt)t = _(t, e);
                            return x(t);
                        }), rt([]);
                    }
                }),
                (0, I.jsx)(Rt, {
                    open: dn,
                    state: $,
                    isMobile: U,
                    isDailyRun: G,
                    personalBest: Pt,
                    isNewRecord: It,
                    newFeats: it,
                    nearFeats: ot,
                    submitStatus: ht,
                    onRetrySubmit: ()=>{
                        un();
                    },
                    nftMinted: St,
                    walletAddress: e,
                    account: t,
                    onChainDone: _t,
                    setOnChainDone: yt,
                    submitting: qt,
                    setSubmitting: Jt,
                    connecting: Be,
                    onConnect: ()=>ze(),
                    showGuestDailyCta: !!(e && Ve.current && !G && We && ie),
                    onPlayDaily: ie,
                    rangMois: hn,
                    harborDown: $t,
                    restarting: tn,
                    onRestart: Un,
                    onHome: o,
                    onWatchReplay: q.current.length > 0 ? ()=>{
                        Ye({
                            seed: $.seed,
                            shipId: k ?? `default`,
                            actions: [
                                ...q.current
                            ],
                            label: G ? `Daily Challenge` : $.runTitle || `Corsair`,
                            finalScore: $.score
                        });
                    } : void 0
                }),
                Je && (0, I.jsx)(Se, {
                    payload: Je,
                    isMobile: U,
                    onClose: ()=>Ye(null)
                }),
                wt.length > 0 && (0, I.jsx)(zt, {
                    queue: wt,
                    isMobile: U,
                    onDismiss: ()=>Tt((e)=>e.slice(1))
                }),
                (0, I.jsx)(Vt, {
                    open: Sn,
                    isMobile: U,
                    muted: B,
                    onClose: ()=>{
                        Pn.current = !1, Z(!1);
                    }
                }),
                U && (0, I.jsxs)(I.Fragment, {
                    children: [
                        !$.event && !$.showPort && !$.gameOver && !$.pirateDuel && (0, I.jsxs)(`div`, {
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
                                (0, I.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Cn(Q === `ship` ? null : `ship`),
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
                                    children: (0, I.jsx)(S, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, I.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>Cn(Q === `upgrades` ? null : `upgrades`),
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
                                    children: (0, I.jsx)(S, {
                                        name: `swords`,
                                        size: 22
                                    })
                                })
                            ]
                        }),
                        (0, I.jsx)(n, {
                            children: Q && (0, I.jsxs)(i.div, {
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
                                    Q === `ship` && (0, I.jsxs)(I.Fragment, {
                                        children: [
                                            (0, I.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `SHIP`
                                            }),
                                            (0, I.jsxs)(`div`, {
                                                style: {
                                                    display: `flex`,
                                                    gap: 12,
                                                    marginBottom: 10,
                                                    fontFamily: `'Cinzel', serif`,
                                                    fontSize: 12
                                                },
                                                children: [
                                                    (0, I.jsxs)(`span`, {
                                                        style: {
                                                            color: `#eedd44`
                                                        },
                                                        children: [
                                                            `Score `,
                                                            $.score
                                                        ]
                                                    }),
                                                    (0, I.jsxs)(`span`, {
                                                        style: {
                                                            color: `rgba(255,255,255,0.45)`
                                                        },
                                                        children: [
                                                            `Turn `,
                                                            $.turn
                                                        ]
                                                    }),
                                                    (0, I.jsxs)(`span`, {
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
                                            (0, I.jsx)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `rgba(255,255,255,0.5)`,
                                                    marginBottom: 6
                                                },
                                                children: `EQUIPPED`
                                            }),
                                            $.ship.upgrades.length === 0 ? (0, I.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.3)`,
                                                    fontStyle: `italic`,
                                                    marginBottom: 8
                                                },
                                                children: `None yet`
                                            }) : $.ship.upgrades.map((e)=>{
                                                let t = R.find((t)=>t.id === e), n = e === `escape` && !$.escapeUsed, r = e === `escape` && $.escapeUsed;
                                                return (0, I.jsxs)(`div`, {
                                                    style: {
                                                        fontSize: 13,
                                                        color: r ? `rgba(255,255,255,0.3)` : `#c8a030`,
                                                        marginBottom: 4,
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 6
                                                    },
                                                    children: [
                                                        (0, I.jsx)(`img`, {
                                                            src: pt[e],
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`,
                                                                opacity: r ? .45 : 1
                                                            }
                                                        }),
                                                        (0, I.jsx)(`span`, {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: t.name
                                                        }),
                                                        n && (0, I.jsx)(`span`, {
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
                                                        r && (0, I.jsx)(`span`, {
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
                                            $.upgradeToken && (0, I.jsxs)(`div`, {
                                                style: {
                                                    fontSize: 12,
                                                    color: `#eedd44`,
                                                    marginBottom: 8,
                                                    display: `flex`,
                                                    alignItems: `center`,
                                                    gap: 5
                                                },
                                                children: [
                                                    (0, I.jsx)(S, {
                                                        name: `star`,
                                                        size: 12
                                                    }),
                                                    ` Free upgrade — claim it at a port`
                                                ]
                                            }),
                                            (0, I.jsx)(`div`, {
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
                                                return (0, I.jsxs)(`div`, {
                                                    style: {
                                                        display: `flex`,
                                                        alignItems: `center`,
                                                        gap: 8,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        (0, I.jsx)(`img`, {
                                                            src: e.img,
                                                            alt: ``,
                                                            style: {
                                                                width: 18,
                                                                height: 18,
                                                                objectFit: `contain`
                                                            }
                                                        }),
                                                        (0, I.jsx)(`span`, {
                                                            style: {
                                                                color: e.color,
                                                                fontSize: 13,
                                                                width: 54
                                                            },
                                                            children: e.label
                                                        }),
                                                        (0, I.jsx)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: 3
                                                            },
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((n)=>(0, I.jsx)(`div`, {
                                                                    style: {
                                                                        width: 14,
                                                                        height: 14,
                                                                        borderRadius: 3,
                                                                        background: n <= t ? e.color : `rgba(255,255,255,0.1)`,
                                                                        border: `1px solid ${n <= t ? e.color + `88` : `rgba(255,255,255,0.05)`}`
                                                                    }
                                                                }, n))
                                                        }),
                                                        (0, I.jsx)(`span`, {
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
                                    Q === `upgrades` && (0, I.jsxs)(I.Fragment, {
                                        children: [
                                            (0, I.jsx)(`div`, {
                                                style: {
                                                    fontSize: 13,
                                                    color: `rgba(255,255,255,0.4)`,
                                                    letterSpacing: 2,
                                                    fontFamily: `'Cinzel', serif`,
                                                    marginBottom: 8
                                                },
                                                children: `UPGRADES`
                                            }),
                                            R.map((e)=>{
                                                let t = $.ship.upgrades.includes(e.id), n = gt[e.build];
                                                return (0, I.jsxs)(`div`, {
                                                    style: {
                                                        marginBottom: 10,
                                                        opacity: t ? 1 : .6
                                                    },
                                                    children: [
                                                        (0, I.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                alignItems: `center`,
                                                                gap: 6,
                                                                marginBottom: 3
                                                            },
                                                            children: [
                                                                (0, I.jsx)(`img`, {
                                                                    src: pt[e.id],
                                                                    style: {
                                                                        width: 20,
                                                                        height: 20,
                                                                        objectFit: `contain`
                                                                    }
                                                                }),
                                                                (0, I.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: t ? n : `rgba(255,255,255,0.7)`,
                                                                        fontFamily: `'Pirata One', cursive`
                                                                    },
                                                                    children: e.name
                                                                }),
                                                                t && (0, I.jsx)(`span`, {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: `#44cc88`,
                                                                        marginLeft: `auto`
                                                                    },
                                                                    children: `✓`
                                                                })
                                                            ]
                                                        }),
                                                        (0, I.jsx)(`div`, {
                                                            style: {
                                                                lineHeight: 1.5
                                                            },
                                                            children: (0, I.jsx)(vt, {
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
                        Q && (0, I.jsx)(`div`, {
                            style: {
                                position: `fixed`,
                                inset: 0,
                                zIndex: 24
                            },
                            onClick: ()=>Cn(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { Gt as default, __tla };
