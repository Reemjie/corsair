import { a as e } from "./rolldown-runtime-Cyuzqnbw.js";
import { i as t, n, r, t as i } from "./motion-wKhEcHeU.js";
import { n as a } from "./walletApi-DYniPf4L.js";
import { a as o, f as s, h as c, i as l, l as u, m as d, p as f, s as p, t as m } from "./anchor-B8i7xjGf.js";
import { $ as h, A as g, B as _, D as v, E as ee, F as y, G as te, H as ne, I as re, L as ie, M as ae, N as b, O as oe, P as se, Q as x, R as S, T as C, U as ce, V as le, Z as ue, a as de, c as fe, d as pe, et as w, f as T, g as me, h as E, i as D, j as he, l as ge, m as _e, n as ve, o as ye, p as be, r as xe, s as Se, t as Ce, tt as we, u as O, v as Te, w as Ee, z as De } from "./ReplayScreen-D2g-1YRG.js";
import { A as Oe, b as ke, c as Ae, j as je, m as Me, t as Ne, v as Pe, y as Fe, __tla as __tla_0 } from "./supabase-COraZBBm.js";
import { a as Ie, c as Le, o as Re, r as ze, s as k } from "./nftCatalog-3Mir_rrL.js";
import { l as A, __tla as __tla_1 } from "./wallet-D0U5_iuP.js";
import { t as Be } from "./rpc-BQNg8r_c.js";
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
    var j = e(t(), 1), Ve = `corsair_onboard_v2`;
    function He() {
        try {
            return new Set(JSON.parse(localStorage.getItem(Ve) ?? `[]`));
        } catch  {
            return new Set;
        }
    }
    function Ue(e) {
        let t = He();
        t.add(e);
        try {
            localStorage.setItem(Ve, JSON.stringify([
                ...t
            ]));
        } catch  {}
    }
    function We(e) {
        let t = He();
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
    var M = {
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
    }, Ke = {}, qe = (()=>{
        try {
            return localStorage.getItem(`corsair_muted`) === `1`;
        } catch  {
            return !1;
        }
    })();
    function Je(e) {
        qe = e;
    }
    function N(e) {
        if (!qe) try {
            let t = Ke[e];
            t || (t = new Audio(`/sounds/${Ge[e]}.wav`), Ke[e] = t), t.volume = M[e], t.currentTime = 0, t.play().catch(()=>{});
        } catch  {}
    }
    var Ye = `corsair_muted`, Xe = `corsair_skip_cine`;
    function Ze(e) {
        try {
            return localStorage.getItem(e) === `1`;
        } catch  {
            return !1;
        }
    }
    function Qe(e, t) {
        try {
            localStorage.setItem(e, t ? `1` : `0`);
        } catch  {}
    }
    function $e() {
        return Ze(Ye);
    }
    function et(e) {
        Qe(Ye, e);
    }
    function tt() {
        return Ze(Xe);
    }
    function nt(e) {
        Qe(Xe, e);
    }
    function rt(e) {
        let t = e.match(/(?:lose|pay|costs?|spend)\s*(\d+)\s*(?:gold\b|g\b)|(?:^|\s)-(\d+)\s*gold\b/i);
        return t ? parseInt(t[1] ?? t[2]) : 0;
    }
    function it(e, t) {
        let n = rt(e);
        return n === 0 || t >= n;
    }
    function at(e, t, n) {
        return t === `port` && e.label === `Dock` && (n ?? []).includes(`ghost`) ? `Ghost Ship cannot dock` : null;
    }
    function ot(e, t, n, r, i) {
        let a = at(e, t, i);
        if (a) return a + ` — sail on.`;
        if (e.label === `Pact` && t === `kraken`) {
            let e = (n ?? []).includes(`storm_heart`);
            return `-${Math.min(e ? 10 : 20, r - 1)} HP, storm +6 turns. Hunter awakens!${e ? ` (Heart of the Storm)` : ``}`;
        }
        return e.desc;
    }
    function st(e) {
        return e === `safe` ? `#44cc88` : e === `risky` ? `#eedd44` : `#ee6644`;
    }
    function P(e) {
        return e === `safe` ? `SAFE · keeps you alive` : e === `risky` ? `RISKY · hull at stake` : `BOLD · big payoff`;
    }
    var ct = `/assets/swift_sails-YMobDX4v.png`, lt = `/assets/ghost_ship-4jaVs07k.png`, ut = `/assets/treasure_hunter-C9jnAyZy.png`, dt = `/assets/storm_rider-BjRGnDwr.png`, ft = `/assets/cursed_greed-BlVfcQDt.png`, F = `/assets/berserker-B9haxHEY.png`, I = r(), pt = {
        escape: ct,
        ghost: lt,
        hunter: ut,
        rider: dt,
        greed: ft,
        berserker: F
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
    ], L = w.upgrades.costs, ht = Math.round(w.storm.hunterSurgeBonus * 100), R = [
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
                `Gold x${w.greed.goldMultiplier} on combat.`
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
                `Storm surges +${ht}% more frequent.`
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
                let u = st(c.risk), d = at(c, t.cellType, s), p = !d && it(c.desc, r) && !d, m = ot(c, t.cellType, o, a, s), h = e === `scene` ? 1.04 : 1.02, g = e === `scene` ? .96 : .98, _ = d ? `rgba(120,120,140,0.45)` : p ? `${u}55` : `rgba(255,255,255,0.1)`;
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
                        padding: e === `scene` ? n ? `12px 14px` : `24px 28px` : `20px 24px`,
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
                        ge[c.icon] ? (0, I.jsxs)(`div`, {
                            style: {
                                marginBottom: e === `scene` ? n ? 8 : 12 : 6,
                                textAlign: e === `scene` ? `center` : `left`,
                                position: `relative`
                            },
                            children: [
                                (0, I.jsx)(`img`, {
                                    src: ge[c.icon],
                                    alt: ``,
                                    style: {
                                        width: e === `scene` ? n ? 48 : 72 : 40,
                                        height: e === `scene` ? n ? 48 : 72 : 40,
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
                        (0, I.jsx)(`div`, {
                            style: {
                                fontSize: e === `scene` ? n ? 12 : 13 : 15,
                                color: d ? `rgba(180,160,200,0.85)` : u,
                                marginTop: e === `scene` ? n ? 6 : 10 : 4,
                                letterSpacing: e === `scene` ? 1.5 : 1,
                                textAlign: e === `scene` ? `center` : `left`,
                                fontFamily: `'Cinzel', serif`
                            },
                            children: d ? d.toLowerCase().includes(`dock`) ? `CAN'T DOCK` : `UNAVAILABLE` : P(c.risk)
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
                padding: n ? `12px` : `24px`,
                paddingBottom: n ? `calc(20px + env(safe-area-inset-bottom))` : 64,
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
                c != null && !n && (0, I.jsx)(`div`, {
                    style: {
                        position: `absolute`,
                        top: 16,
                        right: 24,
                        display: `flex`,
                        alignItems: `center`,
                        gap: 6,
                        zIndex: 2
                    },
                    children: (0, I.jsxs)(`div`, {
                        style: {
                            fontSize: 18,
                            fontWeight: 700,
                            color: `#eedd44`
                        },
                        children: [
                            c,
                            ` pts`
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
                            children: (0, I.jsx)(E, {
                                tip: u,
                                isMobile: n,
                                onDismiss: d
                            })
                        }),
                        (0, I.jsx)(`div`, {
                            style: {
                                alignSelf: `flex-start`,
                                marginBottom: n ? 10 : 16,
                                paddingLeft: 8
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
                                children: pe[t.cellType] ?? t.cellType
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
                            u && d && (0, I.jsx)(E, {
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
                color: `#ff8866`
            },
            grapple: {
                title: `GRAPPLE`,
                tip: `Hooks coming — hit them from range.`,
                best: `Strike`,
                color: `#ee6688`
            },
            plunder: {
                title: `PLUNDER`,
                tip: `They want your gold — fleeing costs more.`,
                best: `Fight`,
                color: `#eecc66`
            }
        },
        kraken: {
            volley: {
                title: `SMASH`,
                tip: `Tentacles rise — cut in before the crush.`,
                best: `Lash`,
                color: `#88d8ff`
            },
            grapple: {
                title: `DRAG`,
                tip: `It coils to pull you under — strike free.`,
                best: `Strike`,
                color: `#66aaff`
            },
            plunder: {
                title: `FEED`,
                tip: `It smells gold — fleeing costs more hull.`,
                best: `Fight`,
                color: `#66e0cc`
            }
        },
        ancient_kraken: {
            volley: {
                title: `JUDGMENT`,
                tip: `The deep winds up — lash before it lands.`,
                best: `Lash`,
                color: `#c9a0ff`
            },
            grapple: {
                title: `ABYSS`,
                tip: `Elder grip forming — break it at range.`,
                best: `Strike`,
                color: `#ee88ff`
            },
            plunder: {
                title: `TRIBUTE`,
                tip: `It demands gold — fleeing is expensive.`,
                best: `Fight`,
                color: `#f0d878`
            }
        },
        hunter: {
            volley: {
                title: `SLAM`,
                tip: `It rears to crush the deck — rake in close.`,
                best: `Lash`,
                color: `#ff88cc`
            },
            grapple: {
                title: `LATCH`,
                tip: `It lunges to latch — drive it off at range.`,
                best: `Strike`,
                color: `#dd66ff`
            },
            plunder: {
                title: `SCENT`,
                tip: `It sniffs your gold — flee costs hull.`,
                best: `Fight`,
                color: `#eecc66`
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
    }, z = {
        pirate: `BOARDING DUEL`,
        kraken: `KRAKEN DUEL`,
        ancient_kraken: `ANCIENT DUEL`,
        hunter: `HUNTER DUEL`
    }, wt = {
        pirate: `Pirates`,
        kraken: `Kraken`,
        ancient_kraken: `Ancient`,
        hunter: `Hunter`
    }, Tt = {
        pirate: `Strike → Grapple · Board → Volley · Flee costs gold`,
        kraken: `Strike → Drag · Lash → Smash · Flee costs hull`,
        ancient_kraken: `Strike → Abyss · Lash → Judgment · Flee costs gold`,
        hunter: `Strike → Latch · Lash → Slam · Flee costs hull`
    };
    function Et({ label: e, filled: t, max: n = 3, color: r }) {
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
    function Dt({ power: e, accent: t }) {
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
    function Ot({ duel: e, ship: t, isMobile: r, log: a, notoriety: o = 0, onAction: s }) {
        let c = e.kind ?? `pirate`, l = xt[c], u = e.enemyMaxHull > 0 ? Math.max(0, e.enemyHull / e.enemyMaxHull) : 0, d = t.maxHull > 0 ? Math.max(0, t.hull / t.maxHull) : 0, f = St[c][e.intent], p = Ct[c], m = O[c] ?? O.pirate, h = T[c], g = e.phase === `choose`, _ = e.phase === `player_result` || e.phase === `enemy_result` || e.phase === `victory` || e.phase === `fled`, v = e.phase === `victory`, ee = e.enemyPower >= 4, y = !!e.enraged, te = u > 0 && u <= .25, ne = d > 0 && d <= .3, re = ue(c, e.intent, o, t.gold), ie = c === `pirate` ? `Board` : `Lash`, ae = e.phase === `player_result` && e.lastCounter ? {
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
        b.current = s, (0, j.useEffect)(()=>{
            let e = (e)=>{
                if (e.metaKey || e.ctrlKey || e.altKey) return;
                let t = e.target?.tagName;
                t === `INPUT` || t === `TEXTAREA` || (g ? e.key === `1` ? (e.preventDefault(), b.current(0)) : e.key === `2` ? (e.preventDefault(), b.current(1)) : e.key === `3` && (e.preventDefault(), b.current(2)) : _ && (e.key === ` ` || e.key === `Enter`) && (e.preventDefault(), b.current(3)));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            g,
            _
        ]);
        let oe = c === `pirate` ? `Loot claimed. The ${e.enemyName.toLowerCase()} scatter into the fog.` : c === `hunter` ? `${e.enemyName} is driven into the fog — for now.` : `${e.enemyName} sinks beneath the black water.`, se = v ? l.victoryBorder : y ? `rgba(255,80,120,0.9)` : ee ? `rgba(255,140,80,0.85)` : l.border, x = v ? `THE SEA YIELDS` : e.phase === `fled` ? `RETREAT` : e.phase === `player_result` ? `ROUND ${e.round} · STEP 1 OF 2` : e.phase === `enemy_result` ? `ROUND ${e.round} · STEP 2 OF 2` : `${z[c]} · ROUND ${e.round}`, S = e.phase === `player_result` && e.lastPlayerHit > 0 ? `YOU hit for −${e.lastPlayerHit}` : e.phase === `enemy_result` && e.lastEnemyHit > 0 ? `THEY hit for −${e.lastEnemyHit}` : e.phase === `enemy_result` && e.lastEnemyHit === 0 ? `THEY miss — no hull lost` : null;
        return (0, I.jsxs)(i.div, {
            initial: {
                opacity: 0,
                scale: .96
            },
            animate: {
                opacity: 1,
                scale: 1,
                ...ae
            },
            transition: {
                duration: e.phase === `player_result` || e.phase === `enemy_result` ? .45 : .25
            },
            style: {
                position: `relative`,
                width: `100%`,
                maxWidth: 560,
                margin: `0 auto`,
                borderRadius: 18,
                overflow: `hidden`,
                border: `2px solid ${se}`,
                boxShadow: v ? `0 16px 48px rgba(0,0,0,0.65), 0 0 70px ${l.glow}` : y ? `0 0 0 1px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.65), 0 0 70px rgba(255,40,80,0.45)` : `0 0 0 1px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.65), 0 0 60px ${ee ? `rgba(255,120,40,0.4)` : l.glow}`
            },
            children: [
                (0, I.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        backgroundImage: m ? `url(${m})` : void 0,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`,
                        filter: v ? `brightness(0.55) saturate(1.2)` : `brightness(0.42) saturate(1.2)`,
                        transform: c === `hunter` ? `scale(1.05)` : void 0
                    }
                }),
                h && !r && (0, I.jsx)(`video`, {
                    "aria-hidden": !0,
                    src: h,
                    autoPlay: !0,
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
                        filter: v ? `brightness(0.5) saturate(1.15)` : `brightness(0.4) saturate(1.2)`,
                        opacity: .95
                    }
                }, c),
                (0, I.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        background: v ? l.victoryOverlay : l.overlay
                    }
                }),
                (0, I.jsx)(`div`, {
                    "aria-hidden": !0,
                    style: {
                        position: `absolute`,
                        inset: 0,
                        pointerEvents: `none`,
                        background: `radial-gradient(ellipse at 50% 18%, ${l.accent}22 0%, transparent 55%)`
                    }
                }),
                (0, I.jsxs)(`div`, {
                    style: {
                        position: `relative`,
                        zIndex: 1,
                        padding: r ? `14px 12px 16px` : `18px 18px 20px`
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
                            children: x
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
                                display: `flex`,
                                justifyContent: `center`,
                                alignItems: `center`,
                                gap: r ? 6 : 10,
                                marginTop: 8,
                                marginBottom: 4,
                                flexWrap: `wrap`
                            },
                            children: [
                                {
                                    id: `you`,
                                    label: `1 · YOU`,
                                    on: e.phase === `player_result`
                                },
                                {
                                    id: `them`,
                                    label: `2 · THEM`,
                                    on: e.phase === `enemy_result`
                                },
                                {
                                    id: `pick`,
                                    label: `3 · CHOOSE`,
                                    on: g
                                }
                            ].map((e, t)=>(0, I.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: r ? 6 : 10
                                    },
                                    children: [
                                        t > 0 && (0, I.jsx)(`span`, {
                                            style: {
                                                color: `rgba(255,255,255,0.2)`,
                                                fontSize: 11
                                            },
                                            children: `→`
                                        }),
                                        (0, I.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`,
                                                fontSize: r ? 9 : 10,
                                                letterSpacing: 1.2,
                                                padding: `3px 8px`,
                                                borderRadius: 999,
                                                border: e.on ? `1px solid ${l.accent}99` : `1px solid rgba(255,255,255,0.12)`,
                                                color: e.on ? l.accent : `rgba(255,255,255,0.32)`,
                                                background: e.on ? `${l.accent}22` : `rgba(0,0,0,0.25)`,
                                                fontWeight: e.on ? 700 : 500
                                            },
                                            children: e.label
                                        })
                                    ]
                                }, e.id))
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
                                        (0, I.jsx)(Dt, {
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
                            children: (S || e.phase === `player_result` && (e.lastCounter || e.lastPunished)) && (0, I.jsxs)(i.div, {
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
                                    S && (0, I.jsx)(`div`, {
                                        style: {
                                            fontFamily: `'Pirata One', cursive`,
                                            fontSize: r ? 22 : 26,
                                            letterSpacing: 1,
                                            color: e.phase === `player_result` ? `#88eebb` : `#ff8899`,
                                            textShadow: `0 2px 12px rgba(0,0,0,0.85)`,
                                            marginTop: 2
                                        },
                                        children: S
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
                                margin: `10px auto 12px`,
                                maxWidth: 440,
                                textAlign: `center`,
                                padding: r ? `10px 12px` : `12px 14px`,
                                borderRadius: 14,
                                border: `1.5px solid ${y ? `#ff6688` : f.color}99`,
                                background: y ? `linear-gradient(135deg, rgba(180,20,60,0.4), rgba(0,0,0,0.6))` : `linear-gradient(135deg, ${f.color}28, rgba(0,0,0,0.6))`,
                                boxShadow: `0 0 28px ${y ? `rgba(255,60,100,0.35)` : f.color + `33`}`
                            },
                            children: [
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: r ? 11 : 12,
                                        fontWeight: 700,
                                        letterSpacing: 2.5,
                                        color: y ? `#ff6688` : f.color
                                    },
                                    children: [
                                        y ? `THE ELDER RAGES` : l.telegraph,
                                        ` · `,
                                        f.title
                                    ]
                                }),
                                (0, I.jsx)(`div`, {
                                    style: {
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: r ? 14 : 15,
                                        color: `rgba(255,248,230,0.9)`,
                                        marginTop: 5,
                                        lineHeight: 1.35
                                    },
                                    children: y && e.intent === `volley` ? `Judgment falls — Lash before it lands!` : f.tip
                                }),
                                f.best !== `Fight` && (0, I.jsxs)(`div`, {
                                    style: {
                                        display: `inline-block`,
                                        marginTop: 8,
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
                                        marginTop: 8,
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
                                }),
                                (0, I.jsx)(`div`, {
                                    style: {
                                        marginTop: 8,
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 1.2,
                                        color: `rgba(255,255,255,0.4)`
                                    },
                                    children: `One attack each — then you choose again`
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
                                marginTop: g ? 0 : 6
                            },
                            children: [
                                (0, I.jsx)(kt, {
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
                                (0, I.jsx)(kt, {
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
                        g && (0, I.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                justifyContent: `center`,
                                alignItems: `center`,
                                gap: 6,
                                marginBottom: 8,
                                flexWrap: `wrap`
                            },
                            children: [
                                [
                                    0,
                                    1,
                                    2
                                ].map((t)=>(0, I.jsx)(`div`, {
                                        style: {
                                            width: 9,
                                            height: 9,
                                            borderRadius: `50%`,
                                            background: t < e.momentum ? l.accent : `rgba(255,255,255,0.12)`,
                                            boxShadow: t < e.momentum ? `0 0 8px ${l.accent}` : `none`
                                        }
                                    }, t)),
                                (0, I.jsx)(`span`, {
                                    style: {
                                        fontFamily: `'Cinzel', serif`,
                                        fontSize: 10,
                                        letterSpacing: 1.2,
                                        color: l.accentSoft
                                    },
                                    children: `MOMENTUM`
                                }),
                                (0, I.jsx)(`span`, {
                                    style: {
                                        fontFamily: `'IM Fell English', cursive`,
                                        fontSize: 12,
                                        color: `rgba(255,255,255,0.4)`
                                    },
                                    children: `· counters build it · boosts damage`
                                })
                            ]
                        }),
                        (0, I.jsx)(n, {
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
                                    marginBottom: g ? 10 : 12,
                                    minHeight: r ? 36 : 40,
                                    lineHeight: 1.4,
                                    textShadow: `0 1px 6px rgba(0,0,0,0.85)`,
                                    padding: `0 4px`
                                },
                                children: v ? oe : a
                            }, a + e.phase)
                        }),
                        g && !r && (0, I.jsxs)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 9,
                                letterSpacing: 1.2,
                                color: `rgba(255,255,255,0.32)`,
                                textAlign: `center`,
                                marginBottom: 8
                            },
                            children: [
                                Tt[c],
                                ` · keys 1 / 2 / 3`
                            ]
                        }),
                        g && (0, I.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                flexDirection: r ? `column` : `row`,
                                gap: 8,
                                justifyContent: `center`
                            },
                            children: p.map((t)=>{
                                let n = t.id === 0 && e.intent === `grapple` || t.id === 1 && e.intent === `volley`, a = t.id === 0 && e.intent === `volley` || t.id === 1 && e.intent === `grapple`, o = t.id === 2 && e.intent === `plunder`;
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
                                        padding: r ? `11px 12px` : `12px 11px`,
                                        borderRadius: 14,
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
                                                gap: 8
                                            },
                                            children: [
                                                ge[t.icon] && (0, I.jsx)(`img`, {
                                                    src: ge[t.icon],
                                                    alt: ``,
                                                    style: {
                                                        width: r ? 32 : 36,
                                                        height: r ? 32 : 36,
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
                                                                        fontSize: r ? 19 : 20,
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
                                                                })
                                                            ]
                                                        }),
                                                        (0, I.jsx)(`div`, {
                                                            style: {
                                                                fontFamily: `'Cinzel', serif`,
                                                                fontSize: 10,
                                                                letterSpacing: 1,
                                                                marginTop: 4,
                                                                color: n ? `#88eebb` : a || o ? `#ff8899` : `rgba(255,255,255,0.45)`
                                                            },
                                                            children: t.id === 2 ? o ? `⚠ ${t.weak}` : t.beats : n ? `▸ ${t.beats}` : a ? `▸ ${t.weak}` : t.beats
                                                        }),
                                                        t.id === 2 ? (0, I.jsxs)(`div`, {
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
                                                        }) : (0, I.jsxs)(`div`, {
                                                            style: {
                                                                display: `flex`,
                                                                gap: r ? 12 : 0,
                                                                flexDirection: r ? `row` : `column`
                                                            },
                                                            children: [
                                                                (0, I.jsx)(Et, {
                                                                    label: `DMG`,
                                                                    filled: t.dmg,
                                                                    color: t.color
                                                                }),
                                                                (0, I.jsx)(Et, {
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
                        }),
                        g && r && (0, I.jsxs)(`div`, {
                            style: {
                                fontFamily: `'Cinzel', serif`,
                                fontSize: 9,
                                letterSpacing: 1,
                                color: `rgba(255,255,255,0.3)`,
                                textAlign: `center`,
                                marginTop: 10
                            },
                            children: [
                                `Strike beats `,
                                c === `pirate` ? `Grapple` : c === `hunter` ? `Latch` : c === `kraken` ? `Drag` : `Abyss`,
                                ` · `,
                                ie,
                                ` beats `,
                                c === `pirate` ? `Volley` : c === `hunter` ? `Slam` : c === `kraken` ? `Smash` : `Judgment`
                            ]
                        })
                    ]
                })
            ]
        }, `duel-${c}-${e.round}-${e.phase}`);
    }
    function kt({ side: e, name: t, hull: r, max: a, pct: o, color: s, float: c, floatBad: l, pulse: u, warn: d }) {
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
    var At = `/assets/hull-CGmPGbU0.png`, jt = `/assets/vision-3Q65Za4i.png`, Mt = `/assets/power-CBX9SU5d.png`;
    function Nt({ open: e, isMobile: t, ship: r, portUpgrades: a, upgradeToken: o, maxedComponents: s, cart: c, setCart: l, onboard: u, onDismissOnboard: d, onUpgradeComponent: f, onReroll: p, freeReroll: m, onRepair: h, onSetSail: g }) {
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
                            u && d && (0, I.jsx)(E, {
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
                                    marginBottom: 8
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
                            (0, I.jsx)(`div`, {
                                style: {
                                    display: `grid`,
                                    gridTemplateColumns: `repeat(2, 1fr)`,
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
                                        (0, I.jsx)(C, {
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
    var Pt = `0x01396d5df31922799610a9710bc69c5cb59c3427b400403d43c198de5d0003e3`;
    new A({
        nodeUrl: Be
    });
    async function Ft(e, t, n, r, i, a) {
        let o = new TextEncoder().encode(a.slice(0, 31)), s = `0x` + (Array.from(o).map((e)=>e.toString(16).padStart(2, `0`)).join(``) || `00`);
        return await e.execute([
            {
                contractAddress: Pt,
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
    function B(e) {
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
    function It({ status: e, onRetry: t }) {
        if (e.kind === `idle`) return null;
        if (e.kind === `local`) return (0, I.jsx)(V, {
            tone: `muted`,
            children: `Local voyage — not ranked. Connect + server seed to climb the board.`
        });
        if (e.kind === `combat_proto`) return (0, I.jsx)(V, {
            tone: `warn`,
            children: (0, I.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4
                },
                children: [
                    (0, I.jsx)(`div`, {
                        style: {
                            fontFamily: `'Pirata One', cursive`,
                            fontSize: 15,
                            letterSpacing: 2,
                            color: `#ff8899`
                        },
                        children: `COMBAT TEST — NOT RANKED`
                    }),
                    (0, I.jsx)(`div`, {
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
                    (0, I.jsx)(Lt, {}),
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
                            (0, I.jsx)(C, {
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
    function Lt() {
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
    function Rt({ open: e, state: t, isMobile: r, isDailyRun: a, personalBest: s, isNewRecord: l, newFeats: u, nearFeats: f, submitStatus: p, onRetrySubmit: m, nftMinted: h, walletAddress: _, account: v, onChainDone: ee, setOnChainDone: y, submitting: te, setSubmitting: re, connecting: ie, onConnect: b, showGuestDailyCta: se, onPlayDaily: x, rangMois: S, harborDown: ce, restarting: le, onRestart: ue, onHome: de, onWatchReplay: fe }) {
        let [pe, w] = (0, j.useState)(!1), T = o(), me = T <= 1, E = !a && !g() && !!x && !!_, D = se || E, he = B(t.log), ge = {
            padding: r ? `16px 36px` : `18px 48px`,
            borderRadius: 14,
            border: D ? `2px solid rgba(136,221,255,0.85)` : `2px solid rgba(200,160,48,0.85)`,
            background: D ? `linear-gradient(135deg, rgba(30,90,120,0.85) 0%, rgba(20,50,70,0.9) 100%)` : `linear-gradient(135deg, rgba(120,90,20,0.75) 0%, rgba(60,45,10,0.9) 100%)`,
            color: D ? `#a8e8ff` : `#f0d878`,
            cursor: le && !D ? `wait` : `pointer`,
            fontSize: r ? 22 : 26,
            fontWeight: 700,
            letterSpacing: 3,
            fontFamily: `'Pirata One', cursive`,
            boxShadow: D ? `0 0 28px rgba(80,180,220,0.35)` : `0 0 28px rgba(200,160,48,0.35)`,
            opacity: le && !D ? .7 : 1,
            width: r ? `min(92vw, 360px)` : void 0,
            textAlign: `center`
        }, _e = {
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
                                children: (0, I.jsx)(C, {
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
                                            he.name
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
                                        children: he.tip
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
                                    l && (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `#44ffaa`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 2,
                                            marginTop: 4
                                        },
                                        children: `NEW BEST`
                                    }),
                                    !l && s > t.score && (0, I.jsxs)(`div`, {
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
                            me && (0, I.jsx)(i.div, {
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
                                    ce && (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 12,
                                            color: `rgba(238,100,100,0.85)`,
                                            fontFamily: `'Cinzel', serif`,
                                            letterSpacing: 1,
                                            textAlign: `center`
                                        },
                                        children: `Harbor unreachable — try again when you're online`
                                    }),
                                    D && x ? (0, I.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: x,
                                        style: ge,
                                        children: `PLAY DAILY · 1 TRY`
                                    }) : (0, I.jsx)(i.button, {
                                        whileHover: {
                                            scale: 1.03
                                        },
                                        whileTap: {
                                            scale: .97
                                        },
                                        onClick: ue,
                                        disabled: le,
                                        style: ge,
                                        children: le ? `PREPARING…` : `SAIL AGAIN`
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
                                            D && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: ue,
                                                disabled: le,
                                                style: _e,
                                                children: le ? `…` : `Sail free run`
                                            }),
                                            !D && E && x && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: x,
                                                style: {
                                                    ..._e,
                                                    borderColor: `rgba(136,221,255,0.4)`,
                                                    color: `#88ddff`
                                                },
                                                children: `Daily · 1 try`
                                            }),
                                            !_ && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: b,
                                                disabled: ie,
                                                style: {
                                                    ..._e,
                                                    borderColor: `rgba(200,160,48,0.4)`,
                                                    color: `#c8a030`
                                                },
                                                children: ie ? `…` : `Connect wallet`
                                            }),
                                            fe && (0, I.jsx)(i.button, {
                                                whileHover: {
                                                    scale: 1.04
                                                },
                                                whileTap: {
                                                    scale: .97
                                                },
                                                onClick: fe,
                                                style: {
                                                    ..._e,
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
                                                onClick: de,
                                                style: {
                                                    ..._e,
                                                    border: `none`,
                                                    color: `rgba(255,255,255,0.28)`
                                                },
                                                children: `← Menu`
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, I.jsx)(It, {
                                status: p,
                                onRetry: m
                            }),
                            u.length > 0 && (0, I.jsx)(i.div, {
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
                                children: u.map((e)=>(0, I.jsxs)(`div`, {
                                        style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 10
                                        },
                                        children: [
                                            (0, I.jsx)(C, {
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
                            h.length > 0 && (0, I.jsx)(i.div, {
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
                                    let e = Ie(h[0]), t = e ? ze[e.rarity] : `#eedd88`;
                                    return (0, I.jsxs)(I.Fragment, {
                                        children: [
                                            e && (0, I.jsx)(`img`, {
                                                src: Re(e.image),
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
                                                        children: h.map(k).join(` · `)
                                                    })
                                                ]
                                            })
                                        ]
                                    });
                                })()
                            }),
                            (0, I.jsx)(`button`, {
                                type: `button`,
                                onClick: ()=>w((e)=>!e),
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
                                children: pe ? `▲ HIDE DETAILS` : `▼ VOYAGE DETAILS`
                            }),
                            (0, I.jsx)(n, {
                                children: pe && (0, I.jsxs)(i.div, {
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
                                                    val: T,
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
                                        f.length > 0 && (0, I.jsxs)(`div`, {
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
                                                f.map((e)=>(0, I.jsxs)(`div`, {
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
                                            children: a ? ae() ? `Seed ${t.seed} · Daily ${oe()}` : `Blind daily — seed at 00:00 UTC` : `Seed ${t.seed}`
                                        }),
                                        v && !ee && (0, I.jsxs)(`div`, {
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
                                                    disabled: te,
                                                    onClick: async ()=>{
                                                        re(!0);
                                                        try {
                                                            await Ft(v, t.score, t.seed, t.turn, t.currentZone ?? 1, t.runTitle);
                                                        } catch (e) {
                                                            console.warn(`On-chain submit failed:`, e);
                                                        }
                                                        y(!0), re(!1);
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
                                                    children: te ? `ENGRAVING...` : (0, I.jsxs)(I.Fragment, {
                                                        children: [
                                                            (0, I.jsx)(C, {
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
                                            }, i = (t.relics ?? []).map((e)=>ne(e)).filter((e)=>!!e).sort((e, t)=>(n[t.rarity] ?? 0) - (n[e.rarity] ?? 0))[0], o = i ? `\nFound the ${i.name} relic along the way.` : ``, s = S ? `\n⚔️ #${S.rank} in Starktember — ${S.total.toLocaleString()} pts across the month.` : ``, l = a ? `☀️ Daily Challenge — ${e} — ${t.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${s}${o}\n⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet` : `🏴\u200d☠️ ${t.runTitle} — ${t.score} pts before the storm claimed me.\n${t.turn} turns · ${t.ship.gold} gold · No mercy.${o}\nSame waters, seed ${t.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/\n\n#Tideborn #Starknet`;
                                            return (0, I.jsx)(d, {
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
                                                    deathName: he.name,
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
    function zt({ queue: e, isMobile: t, onDismiss: r }) {
        let a = e[0] ?? null;
        if ((0, j.useEffect)(()=>{
            a && N(`nft`);
        }, [
            a
        ]), !a) return null;
        let o = Ie(a), s = o?.name ?? k(a), c = o?.rarity ?? `Rare`, l = ze[c], u = Le(a), d = o ? Re(o.image) : null, f = e.length - 1;
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
        let c = !!(e && (T[e] || O[e] || e === `death`)), l = !!(c && e && !t && T[e]), u = e ? e === `death` ? be[a] ?? O.storm : O[e] ?? null : null, d = ()=>{
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
                        src: T[e],
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
                                children: pe[e] ?? ``
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
    var Ht = `/icons/gold.png`, Ut = (e, t = 14)=>(0, I.jsx)(C, {
            name: e === `frenzy` ? `lightning` : e === `stalking` ? `eye` : e === `searching` ? `mist` : `compass`,
            size: t,
            style: {
                marginRight: 5
            }
        });
    Wt = function({ walletAddress: e, account: t, username: r, onHome: o, onPlayDaily: c, dailySeed: d, isDaily: ae, seedToken: ue, shipId: E, resumeState: ge, resumeRunId: Ie, resumeActions: Le }) {
        let { connect: Re, connecting: ze } = a(), [k, A] = (0, j.useState)(()=>ge ?? he(d, E ?? `default`)), Be = (0, j.useRef)(!e), [Ve, He] = (0, j.useState)(()=>!g()), [M, Ge] = (0, j.useState)(null), [Ke, qe] = (0, j.useState)(null), [Ye, Xe] = (0, j.useState)(!1), [Ze, Qe] = (0, j.useState)([]), [rt, it] = (0, j.useState)([]), [at, ot] = (0, j.useState)([]), st = (0, j.useRef)(0), [P, ct] = (0, j.useState)(null), lt = (0, j.useRef)((k.relics ?? []).length), [ut, dt] = (0, j.useState)(!1), [ft, F] = (0, j.useState)({
            kind: `idle`
        }), [L, ht] = (0, j.useState)(!1), _t = (0, j.useRef)(!1), [yt, xt] = (0, j.useState)([]), [St, Ct] = (0, j.useState)([]), [z, wt] = (0, j.useState)(null), [Tt, Et] = (0, j.useState)(0), [Dt, kt] = (0, j.useState)(()=>l()), [Pt, Ft] = (0, j.useState)(!1), [B, It] = (0, j.useState)(()=>$e()), [V, Lt] = (0, j.useState)(()=>tt()), Wt = (0, j.useRef)(V);
        Wt.current = V;
        let [Gt, Kt] = (0, j.useState)(!1), [H, qt] = (0, j.useState)(window.innerWidth < 768), U = (0, j.useRef)(ae === !0), W = U.current;
        (0, j.useEffect)(()=>(h(U.current), ()=>h(!1)), []);
        let Jt = (0, j.useRef)(ue), Yt = (0, j.useRef)(!1), [Xt, Zt] = (0, j.useState)(!1), [Qt, $t] = (0, j.useState)(!1);
        (0, j.useEffect)(()=>{
            if (k.gameOver) {
                Ge(null);
                return;
            }
            k.turn > 0 && Ue(`sail`), Ge(We(k));
        }, [
            k.turn,
            k.event,
            k.showPort,
            k.hunter?.active,
            k.stormDistance,
            k.gameOver
        ]);
        let en = ()=>{
            M && (Ue(M.id), Ge(null));
        };
        (0, j.useEffect)(()=>{
            W && (se(), e && oe());
        }, []), (0, j.useEffect)(()=>{
            if (!e) {
                He(!g());
                return;
            }
            Pe(e, oe()).then((e)=>{
                if (e) {
                    He(!1);
                    return;
                }
                g() && v(), He(!0);
            });
        }, [
            e
        ]);
        let G = (0, j.useRef)(Ie ?? crypto.randomUUID()), K = (0, j.useRef)(Le ? [
            ...Le
        ] : []), q = (e)=>{
            K.current.push(e);
        }, J = (0, j.useRef)([]);
        (0, j.useEffect)(()=>{
            let t = e;
            !t || k.gameOver || K.current.length !== 0 && f({
                run_id: G.current,
                wallet_address: t,
                seed: k.seed,
                ship_id: E ?? `default`,
                is_daily: U.current,
                seed_token: Jt.current ?? null,
                actions: K.current,
                turn: k.turn,
                score: k.score,
                saved_at: Date.now()
            });
        }, [
            k
        ]), (0, j.useEffect)(()=>{
            let e = K.current.length - 1;
            e < 0 || (J.current[e * 3] = k.score, J.current[e * 3 + 1] = k.ship.hull, J.current[e * 3 + 2] = k.rngState ?? -1);
        }, [
            k
        ]);
        let tn = (0, j.useRef)(0);
        (0, j.useEffect)(()=>{
            e && (Ie || je({
                run_id: G.current,
                wallet_address: e,
                username: r ?? null,
                seed: k.seed,
                is_daily: W,
                seed_token: ue ?? null
            }));
        }, []), (0, j.useEffect)(()=>{
            !e || k.gameOver || k.turn - tn.current < 3 || (tn.current = k.turn, Fe(G.current, {
                score: k.score,
                turn: k.turn,
                zone: k.currentZone ?? 1,
                gold: k.ship.gold,
                hull: k.ship.hull
            }));
        }, [
            k.turn
        ]);
        let nn = ()=>({
                run_id: G.current,
                wallet_address: e,
                seed: k.seed,
                ship_id: E ?? `default`,
                is_daily: U.current,
                actions: K.current,
                checks: K.current.flatMap((e, t)=>[
                        J.current[t * 3] ?? -1,
                        J.current[t * 3 + 1] ?? -1,
                        J.current[t * 3 + 2] ?? -1
                    ]),
                final_score: k.score,
                final_turn: k.turn
            }), rn = async ()=>{
            if (!e) return;
            if (x()) {
                F({
                    kind: `combat_proto`
                });
                return;
            }
            if (!U.current && !Jt.current) {
                F({
                    kind: `local`
                });
                return;
            }
            let t = nn();
            F({
                kind: `sending`
            });
            try {
                await Oe(t);
            } catch (e) {
                console.warn(`[runlog]`, e), s(`runlog`, t), F({
                    kind: `queued`,
                    step: `log`
                });
                return;
            }
            try {
                let t = await Ne(G.current);
                if (t?.approved) {
                    if (dt(!0), F({
                        kind: `ok`,
                        daily: U.current
                    }), U.current && se(), t.nft?.minted?.length) {
                        let e = t.nft.minted.map((e)=>typeof e == `string` ? e : e.nft).filter(Boolean);
                        xt(e), Ct(e);
                    }
                } else console.warn(`[approve] refuse :`, t?.raison ?? t), F({
                    kind: `rejected`,
                    raison: t?.raison ?? void 0
                }), U.current && Pe(e, oe()).then((e)=>{
                    e || v();
                });
            } catch (e) {
                console.warn(`[approve]`, e), s(`approve`, {
                    run_id: G.current
                }), F({
                    kind: `queued`,
                    step: `approve`
                });
            }
        };
        (0, j.useEffect)(()=>{
            if (k.gameOver) {
                if (!e) {
                    F({
                        kind: `idle`
                    });
                    return;
                }
                if (!_t.current) {
                    if (_t.current = !0, Ae(G.current, {
                        score: k.score,
                        turn: k.turn,
                        zone: k.currentZone ?? 1,
                        gold: k.ship.gold,
                        hull: k.ship.hull,
                        run_title: k.runTitle
                    }), x()) {
                        console.warn(`[approve] skip : combat prototype (?combat=1)`), F({
                            kind: `combat_proto`
                        }), u();
                        return;
                    }
                    if (!U.current && !Jt.current) {
                        console.warn(`[approve] skip : seed local, run non soumise`), F({
                            kind: `local`
                        }), u();
                        return;
                    }
                    rn(), u();
                }
            }
        }, [
            k.gameOver
        ]), (0, j.useEffect)(()=>{
            let e = (e)=>{
                let t = e.detail;
                !t?.run_id || t.run_id !== G.current || t.approved && (dt(!0), F({
                    kind: `ok`,
                    daily: W
                }), W && se());
            };
            return window.addEventListener(`corsair-sync`, e), ()=>window.removeEventListener(`corsair-sync`, e);
        }, [
            W
        ]), (0, j.useEffect)(()=>{
            let e = ()=>qt(window.innerWidth < 768);
            return window.addEventListener(`resize`, e), ()=>window.removeEventListener(`resize`, e);
        }, []);
        let [Y, X] = (0, j.useState)(null), [an, on] = (0, j.useState)(!1), sn = (0, j.useRef)(null), cn = (0, j.useRef)(new Set), [ln, un] = (0, j.useState)(null);
        (0, j.useEffect)(()=>{
            let t = new Date, n = t.getUTCFullYear() === 2026 && t.getUTCMonth() === 8;
            !k.gameOver || !W || !e || !n || ut && Me().then((t)=>{
                let n = (e)=>e.toLowerCase().replace(/^0x0*/, ``), r = t.find((t)=>n(t.wallet_address) === n(e));
                r && un({
                    rank: r.rank,
                    total: r.total
                });
            }).catch(()=>{});
        }, [
            k.gameOver,
            ut
        ]);
        let dn = (0, j.useRef)({
            x: k.ship.x,
            y: k.ship.y
        }), [fn, pn] = (0, j.useState)({
            x: 0,
            y: 0,
            instant: !1
        }), [mn, hn] = (0, j.useState)({
            x: 0,
            y: 0
        });
        (0, j.useEffect)(()=>{
            let e = dn.current, t = k.ship.x - e.x, n = k.ship.y - e.y;
            if (dn.current = {
                x: k.ship.x,
                y: k.ship.y
            }, t === 0 && n === 0 || Math.abs(t) > 1 || Math.abs(n) > 1) return;
            let r = me(k.ship.vision, H), i = .8;
            pn({
                x: t * r * i,
                y: n * r * i,
                instant: !0
            }), hn({
                x: t,
                y: n
            });
            let a = setTimeout(()=>hn({
                    x: 0,
                    y: 0
                }), 380), o = requestAnimationFrame(()=>pn({
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
        let [gn, Z] = (0, j.useState)(!1), [Q, _n] = (0, j.useState)(null), [vn, yn] = (0, j.useState)(null), [bn, xn] = (0, j.useState)(0), Sn = ()=>{
            Xe(!0), setTimeout(()=>Xe(!1), 400);
        }, Cn = (e)=>{
            yn(e), setTimeout(()=>yn(null), 150);
        }, $ = k, wn = Math.min(100, (1 - $.stormDistance / 10) * 100), Tn = $.ship.hull <= 5 ? `#ee4444` : $.ship.hull <= 10 ? `#ee8844` : `#44cc88`, En = !$.escapeUsed && $.ship.upgrades.includes(`escape`) && $.event && $.event.choices[0].risk !== `safe`;
        (0, j.useEffect)(()=>{
            if (V || k.gameOver) return;
            let e = k.event?.cellType;
            e && (!T[e] && !O[e] || cn.current.has(e) || X(e));
        }, [
            k.event?.cellType,
            k.gameOver,
            V
        ]), (0, j.useEffect)(()=>{
            if (!Y || Y === `death`) return;
            let e = H ? 2200 : {
                ancient_kraken: 6500
            }[Y] ?? 5e3, t = setTimeout(()=>{
                cn.current.add(Y), X(null);
            }, e);
            return ()=>clearTimeout(t);
        }, [
            Y,
            H
        ]);
        let Dn = (0, j.useRef)(1);
        (0, j.useEffect)(()=>{
            let e = k.currentZone ?? 1;
            if (e > Dn.current) {
                let t = Dn.current, n = we[e], r = we[t]?.transitionText ?? [], i = r.length > 0 ? [
                    ...r,
                    ``,
                    `You have entered:`,
                    n.name.toUpperCase()
                ] : [
                    `You have entered:`,
                    n.name.toUpperCase()
                ];
                V || (wt({
                    lines: i,
                    zone: e
                }), Et(0)), Dn.current = e;
            }
        }, [
            k.currentZone,
            V
        ]), (0, j.useEffect)(()=>{
            if (!z) return;
            if (Tt >= z.lines.length) {
                setTimeout(()=>wt(null), 1e3);
                return;
            }
            let e = setTimeout(()=>Et((e)=>e + 1), 800);
            return ()=>clearTimeout(e);
        }, [
            z,
            Tt
        ]), (0, j.useEffect)(()=>{
            k.dangerStreak > st.current && (st.current = k.dangerStreak);
        }, [
            k.dangerStreak
        ]), (0, j.useEffect)(()=>{
            if (k.gameOver) {
                let e = te(k);
                e.length > 0 && (it(e), N(`streak`));
                let t = p({
                    score: k.score,
                    turn: k.turn,
                    zone: k.currentZone ?? 1,
                    gold: k.ship.gold,
                    hunterAttacksSurvived: k.hunterAttacksSurvived ?? 0,
                    peakStreak: st.current,
                    hadStreak5: (k.exploits ?? []).includes(`streak5`)
                }), n = new Set(e.map((e)=>e.id));
                if (ot(t.nearest.filter((e)=>!n.has(e.feat.id))), t.isNewRecord && (kt(t.pb), Ft(!0)), u(), Wt.current) Z(!1), X(null), on(!0);
                else if (H) Z(!1), X(`death`), sn.current = setTimeout(()=>{
                    on((e)=>e || !0), X(null);
                }, 2200);
                else {
                    let e = On.current ? 8e3 : 0;
                    setTimeout(()=>{
                        Z(!1), X(`death`), sn.current = setTimeout(()=>{
                            on((e)=>e || !0), X(null);
                        }, 9e3);
                    }, e);
                }
            } else sn.current &&= (clearTimeout(sn.current), null), on(!1), X(null), cn.current.clear(), st.current = 0, ot([]), Ft(!1);
        }, [
            k.gameOver,
            H
        ]);
        let On = (0, j.useRef)(!1), kn = (0, j.useRef)(-99), An = (0, j.useRef)(null);
        (0, j.useEffect)(()=>{
            V || k.log?.includes(`Tentacles rake the hull`) && (k.turn - kn.current < 3 || (kn.current = k.turn, An.current && clearTimeout(An.current), On.current = !0, Z(!0), An.current = setTimeout(()=>{
                On.current = !1, Z(!1);
            }, H ? 2e3 : 7200)));
        }, [
            k.log,
            k.turn,
            H,
            V
        ]), (0, j.useEffect)(()=>{
            V && (Y && Y !== `death` && (cn.current.add(Y), X(null)), Y === `death` && (X(null), on(!0)), wt(null), On.current = !1, Z(!1));
        }, [
            V
        ]), (0, j.useEffect)(()=>{
            if (!gn) return;
            let e = ()=>{
                On.current = !1, Z(!1);
            };
            return window.addEventListener(`mousedown`, e), window.addEventListener(`keydown`, e), window.addEventListener(`touchstart`, e), ()=>{
                window.removeEventListener(`mousedown`, e), window.removeEventListener(`keydown`, e), window.removeEventListener(`touchstart`, e);
            };
        }, [
            gn
        ]), (0, j.useEffect)(()=>{
            if (k.log?.includes(`⚡ Storm surge`) && Cn(`rgba(100,150,255,0.35)`), k.log?.includes(`Storm Rider surfs`) && Cn(`rgba(50,200,160,0.32)`), k.event?.cellType === `ancient_kraken` ? Cn(`rgba(200,160,48,0.4)`) : k.event?.cellType === `kraken` && Cn(`rgba(150,0,255,0.3)`), k.hunter?.active) {
                let e = fe(k);
                xn(e === `critical` ? .78 : e === `danger` ? .48 : e === `watch` ? .26 : .12);
            } else xn(0);
        }, [
            k
        ]), (0, j.useEffect)(()=>{
            let e = (e)=>{
                if (k.gameOver || k.event || k.pirateDuel || k.showPort) return;
                let t = e.target;
                t && (t.tagName === `INPUT` || t.tagName === `TEXTAREA`) || ((e.key === `ArrowLeft` || e.code === `KeyA`) && jn(-1, 0), (e.key === `ArrowUp` || e.code === `KeyW`) && jn(0, -1), (e.key === `ArrowRight` || e.code === `KeyD`) && jn(1, 0));
            };
            return window.addEventListener(`keydown`, e), ()=>window.removeEventListener(`keydown`, e);
        }, [
            k.gameOver,
            k.event,
            k.pirateDuel,
            k.showPort,
            k.turn
        ]);
        let jn = (e, t)=>{
            q(e === -1 ? 0 : e === 1 ? 2 : 1), A((n)=>y(n, e, t));
        }, Mn = (e)=>{
            q(10 + e), A((t)=>{
                let n = S(t, e);
                return n.ship.hull < t.ship.hull && Sn(), n;
            });
        }, Nn = (e)=>{
            Yt.current || (Yt.current = !0, window.setTimeout(()=>{
                Yt.current = !1;
            }, 280), q(80 + e), A((t)=>{
                let n = De(t, e);
                return n.ship.hull < t.ship.hull && Sn(), n;
            }));
        }, Pn = ()=>{
            q(20), A((e)=>_(e));
        }, Fn = (e)=>{
            q(e === `hull` ? 30 : e === `weapon` ? 31 : 32), A((t)=>le(t, e));
        }, In = async ()=>{
            if (e) {
                $t(!0), Zt(!1);
                let t = await ke(e);
                if ($t(!1), !t) {
                    Zt(!0);
                    return;
                }
                U.current = !1, h(!1), Jt.current = t.seed_token;
                let n = he(t.seed, E ?? `default`);
                K.current = [], J.current = [], tn.current = 0, G.current = crypto.randomUUID(), _t.current = !1, dt(!1), F({
                    kind: `idle`
                }), ht(!1), xt([]), Ct([]), je({
                    run_id: G.current,
                    wallet_address: e,
                    username: r ?? null,
                    seed: n.seed,
                    is_daily: !1,
                    seed_token: t.seed_token
                }), A(n);
                return;
            }
            U.current = !1, h(!1);
            let t = he(void 0, E ?? `default`);
            K.current = [], J.current = [], tn.current = 0, G.current = crypto.randomUUID(), _t.current = !1, dt(!1), F({
                kind: `idle`
            }), ht(!1), xt([]), Ct([]), A(t);
        }, Ln = (0, j.useRef)(null);
        (0, j.useEffect)(()=>{
            let e = !1, t = ()=>{
                if (e) return;
                e = !0;
                let n = new Audio(`/sounds/ambient.mp3`);
                n.loop = !0, n.volume = .4, n.muted = $e(), n.play().catch(()=>{}), Ln.current = n, window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t);
            };
            return window.addEventListener(`pointerdown`, t, {
                once: !0
            }), window.addEventListener(`keydown`, t, {
                once: !0
            }), ()=>{
                window.removeEventListener(`pointerdown`, t), window.removeEventListener(`keydown`, t), Ln.current && (Ln.current.pause(), Ln.current.currentTime = 0);
            };
        }, []), (0, j.useEffect)(()=>{
            Ln.current && (Ln.current.muted = B), Je(B), et(B);
        }, [
            B
        ]), (0, j.useEffect)(()=>{
            nt(V);
        }, [
            V
        ]);
        let Rn = ()=>It((e)=>!e), zn = ()=>Lt((e)=>!e), Bn = (0, j.useRef)({
            gold: k.ship.gold,
            hull: k.ship.hull,
            zone: k.currentZone ?? 1,
            over: k.gameOver,
            mult: k.scoreMultiplier ?? 1,
            hmode: k.hunter?.mode ?? ``,
            storm: k.stormDistance
        });
        return (0, j.useEffect)(()=>{
            let e = Bn.current, t = !!k.log?.includes(`Tentacles rake`);
            if (k.gameOver && !e.over) N(`death`);
            else if (!k.gameOver) {
                k.ship.gold > e.gold && N(`gold`), k.ship.gold < e.gold && k.showPort && N(`buy`), t ? N(`hunter_attack`) : k.ship.hull < e.hull && N(`damage`), (k.currentZone ?? 1) !== e.zone && N(`zone`), (k.scoreMultiplier ?? 1) > e.mult && N(`streak`);
                let n = k.hunter?.mode ?? ``;
                n !== e.hmode && (n === `stalking` || n === `frenzy`) && N(`hunter_near`), k.stormDistance < e.storm && k.stormDistance <= 4 && k.stormDistance > 0 && (N(`thunder`), Sn());
            }
            Bn.current = {
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
                let e = (k.relics ?? [])[n - 1], t = ne(e);
                t && (ct(t), N(`streak`));
            }
            lt.current = n;
        }, [
            k
        ]), (0, I.jsxs)(i.div, {
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
                                backgroundImage: `url(${be[$.currentZone ?? 1] ?? be[1]})`,
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
                vn && (0, I.jsx)(i.div, {
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
                        background: vn,
                        zIndex: 99,
                        pointerEvents: `none`
                    }
                }),
                bn > 0 && (0, I.jsx)(i.div, {
                    animate: {
                        opacity: [
                            bn,
                            bn * .6,
                            bn
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
                        padding: H ? `calc(5px + env(safe-area-inset-top)) 8px 5px` : `8px 18px`,
                        background: `linear-gradient(180deg, rgba(6,12,20,0.78) 0%, rgba(6,12,20,0.42) 100%)`,
                        borderBottom: `1px solid rgba(255,255,255,0.05)`,
                        flexShrink: 0,
                        position: `relative`,
                        zIndex: 5,
                        backdropFilter: `blur(6px)`
                    },
                    children: [
                        (0, I.jsxs)(`div`, {
                            style: {
                                fontWeight: 700,
                                color: `#c8a030`,
                                fontFamily: `'Pirata One', cursive`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: H ? 6 : 8
                            },
                            children: [
                                (0, I.jsx)(`img`, {
                                    src: m,
                                    style: {
                                        width: H ? 24 : 36,
                                        height: H ? 24 : 36,
                                        objectFit: `contain`
                                    }
                                }),
                                !H && (0, I.jsx)(`span`, {
                                    style: {
                                        fontSize: 18,
                                        letterSpacing: 3
                                    },
                                    children: `CORSAIR`
                                }),
                                (()=>{
                                    let e = Te.find((e)=>e.id === ($.shipType ?? `default`)) ?? Te[0], t = we[$.currentZone ?? 1]?.name ?? `The Coasts`;
                                    return (0, I.jsxs)(`div`, {
                                        title: e.tagline,
                                        style: {
                                            marginLeft: H ? 0 : 2,
                                            padding: H ? `2px 6px 2px 2px` : `2px 8px 2px 2px`,
                                            borderRadius: 7,
                                            border: `1px solid rgba(200,160,48,0.28)`,
                                            background: `rgba(200,160,48,0.07)`,
                                            fontSize: 10,
                                            letterSpacing: 1,
                                            color: `#e8d8a8`,
                                            fontFamily: `'Cinzel', serif`,
                                            fontWeight: 600,
                                            maxWidth: H ? 88 : 200,
                                            overflow: `hidden`,
                                            textOverflow: `ellipsis`,
                                            whiteSpace: `nowrap`,
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: 6
                                        },
                                        children: [
                                            (0, I.jsx)(`img`, {
                                                src: Ee(e.id),
                                                alt: ``,
                                                style: {
                                                    width: H ? 20 : 24,
                                                    height: H ? 20 : 24,
                                                    borderRadius: 4,
                                                    objectFit: `cover`,
                                                    flexShrink: 0
                                                }
                                            }),
                                            (0, I.jsx)(`span`, {
                                                style: {
                                                    display: `flex`,
                                                    flexDirection: `column`,
                                                    lineHeight: 1.15,
                                                    minWidth: 0
                                                },
                                                children: H ? (0, I.jsx)(`span`, {
                                                    style: {
                                                        overflow: `hidden`,
                                                        textOverflow: `ellipsis`
                                                    },
                                                    children: t
                                                }) : (0, I.jsxs)(I.Fragment, {
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
                                            })
                                        ]
                                    });
                                })()
                            ]
                        }),
                        (0, I.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: H ? 10 : 16,
                                alignItems: `flex-end`
                            },
                            children: (H ? [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${$.ship.hull}/${$.ship.maxHull}`,
                                    color: Tn
                                },
                                {
                                    icon: `gold`,
                                    label: `GOLD`,
                                    val: $.ship.gold,
                                    color: `#eedd44`
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
                                    color: `rgba(255,255,255,0.5)`
                                }
                            ] : [
                                {
                                    icon: `hull`,
                                    label: `HULL`,
                                    val: `${$.ship.hull}/${$.ship.maxHull}`,
                                    color: Tn
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
                                        textAlign: `center`
                                    },
                                    children: [
                                        (0, I.jsx)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: `rgba(255,255,255,0.4)`,
                                                letterSpacing: 1.5,
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
                                                        gold: Ht,
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
                                                (0, I.jsx)(`span`, {
                                                    style: {
                                                        fontSize: H ? 15 : 16,
                                                        fontFamily: `'Cinzel', serif`
                                                    },
                                                    children: e.val
                                                })
                                            ]
                                        })
                                    ]
                                }, e.label))
                        }),
                        !H && (0, I.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 12
                            },
                            children: [
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        display: `flex`,
                                        alignItems: `center`,
                                        gap: 4
                                    },
                                    children: [
                                        (0, I.jsx)(`img`, {
                                            src: `/assets/score-DnnSqbJU.png`,
                                            style: {
                                                width: 28,
                                                height: 28,
                                                objectFit: `contain`
                                            }
                                        }),
                                        (0, I.jsx)(`span`, {
                                            style: {
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: $.score
                                        }),
                                        (0, I.jsx)(`span`, {
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
                                    onClick: Rn,
                                    "aria-label": B ? `Unmute sound` : `Mute sound`,
                                    title: B ? `Unmute sound` : `Mute sound`,
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
                                    children: B ? `MUTE` : `SOUND`
                                }),
                                (0, I.jsx)(`button`, {
                                    onClick: zn,
                                    "aria-label": V ? `Play cinematics` : `Skip cinematics`,
                                    title: V ? `Cinematics off — click to restore` : `Skip scene / portal / death videos`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.08)`,
                                        color: V ? `#c8a030` : `rgba(255,255,255,0.4)`,
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        cursor: `pointer`,
                                        borderRadius: 6,
                                        padding: `4px 8px`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: V ? `SKIP` : `CINE`
                                })
                            ]
                        }),
                        H && (0, I.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                alignItems: `center`,
                                gap: 4
                            },
                            children: [
                                (0, I.jsx)(`span`, {
                                    style: {
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: `#eedd44`,
                                        fontFamily: `'Cinzel', serif`
                                    },
                                    children: $.score
                                }),
                                (0, I.jsx)(`button`, {
                                    onClick: Rn,
                                    "aria-label": B ? `Unmute sound` : `Mute sound`,
                                    title: B ? `Unmute sound` : `Mute sound`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.12)`,
                                        color: `rgba(255,255,255,0.5)`,
                                        fontSize: 9,
                                        letterSpacing: .5,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`,
                                        borderRadius: 6,
                                        minWidth: 36,
                                        height: 32,
                                        padding: `0 6px`
                                    },
                                    children: B ? `MUTE` : `SND`
                                }),
                                (0, I.jsx)(`button`, {
                                    onClick: zn,
                                    "aria-label": V ? `Play cinematics` : `Skip cinematics`,
                                    title: V ? `Cinematics off` : `Skip cinematics`,
                                    style: {
                                        background: `transparent`,
                                        border: `1px solid rgba(255,255,255,0.12)`,
                                        color: V ? `#c8a030` : `rgba(255,255,255,0.5)`,
                                        fontSize: 9,
                                        letterSpacing: .5,
                                        cursor: `pointer`,
                                        fontFamily: `'Cinzel', serif`,
                                        borderRadius: 6,
                                        minWidth: 36,
                                        height: 32,
                                        padding: `0 6px`
                                    },
                                    children: V ? `SKIP` : `CINE`
                                })
                            ]
                        })
                    ]
                }),
                H && ($.relics ?? []).length > 0 && (0, I.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 5,
                        justifyContent: `center`,
                        padding: `4px 8px`,
                        background: `rgba(5,10,18,0.6)`,
                        flexWrap: `wrap`
                    },
                    children: ($.relics ?? []).map((e)=>{
                        let t = ne(e);
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
                                src: ce(e),
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
                H && $.hunter?.active && (()=>{
                    let e = de($), t = fe($), n = D($);
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
                                    (0, I.jsx)(C, {
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
                                            Ut($.hunter.mode),
                                            Se($.hunter.mode)
                                        ]
                                    }),
                                    (0, I.jsx)(`div`, {
                                        style: {
                                            fontSize: 10,
                                            color: e <= 1 ? `#ff8899` : e <= 3 ? `#ffcc88` : `rgba(255,255,255,0.5)`,
                                            fontFamily: `'Cinzel', serif`,
                                            flex: 1
                                        },
                                        children: xe(e)
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
                                                background: $.hunter.awareness >= w.hunter.frenzyAwareness ? `#ee4444` : $.hunter.awareness >= w.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`,
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
                                children: ye($.hunter.mode)
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
                                (0, I.jsxs)(`div`, {
                                    style: {
                                        background: wn > 70 ? `rgba(180,30,30,0.18)` : `rgba(0,0,0,0.22)`,
                                        border: `1px solid ${wn > 70 ? `rgba(220,50,50,0.45)` : `rgba(255,255,255,0.06)`}`,
                                        borderRadius: 8,
                                        padding: `8px 9px`
                                    },
                                    children: [
                                        (0, I.jsxs)(`div`, {
                                            style: {
                                                fontSize: 10,
                                                color: wn > 70 ? `#ee4444` : `rgba(255,255,255,0.32)`,
                                                letterSpacing: 2,
                                                marginBottom: 4,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: 5,
                                                fontFamily: `'Cinzel', serif`
                                            },
                                            children: [
                                                (0, I.jsx)(C, {
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
                                                        color: wn > 70 ? `#ee4444` : `#ee8844`,
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
                                                    width: `${wn}%`
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
                                    let e = de($), t = fe($), n = D($), r = t === `critical` || t === `danger`;
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
                                                    (0, I.jsx)(C, {
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
                                                    Ut($.hunter.mode, 12),
                                                    Se($.hunter.mode)
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
                                                    xe(e),
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
                                                children: ye($.hunter.mode)
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
                                                                background: $.hunter.awareness >= w.hunter.frenzyAwareness ? `#ee4444` : $.hunter.awareness >= w.hunter.stalkingAwareness ? `#cc44ee` : `#7744aa`
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
                                        (0, I.jsx)(C, {
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
                                                    img: At,
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
                                                    img: Mt,
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
                                                    img: jt,
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
                        (0, I.jsx)(ve, {
                            state: $,
                            isMobile: H,
                            slide: fn,
                            lurch: mn,
                            onboard: M,
                            onDismissOnboard: en,
                            onMove: jn
                        }),
                        (0, I.jsxs)(`div`, {
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
                                            let t = $.ship.upgrades.includes(e.id), n = Ze.includes(e.id), r = $.upgradeToken && $.showPort, i = r ? 0 : e.cost, a = !t && !n && $.ship.gold >= i && $.showPort, o = gt[e.build], s = t || $.showPort;
                                            return (0, I.jsxs)(`div`, {
                                                onClick: ()=>{
                                                    $.showPort && (n ? Qe((t)=>t.filter((t)=>t !== e.id)) : a && Qe((t)=>[
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
                    isMobile: H,
                    muted: B,
                    zone: $.currentZone ?? 1,
                    onDeathEnd: ()=>on(!0),
                    onClose: ()=>{
                        Y && cn.current.add(Y), X(null);
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
                        onClick: ()=>wt(null),
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
                            be[z.zone] && (0, I.jsx)(`div`, {
                                style: {
                                    position: `absolute`,
                                    inset: 0,
                                    zIndex: 0,
                                    backgroundImage: `url(${be[z.zone]})`,
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
                                children: (0, I.jsx)(C, {
                                    name: `vortex`,
                                    size: H ? 72 : 96
                                })
                            }),
                            (0, I.jsx)(`div`, {
                                style: {
                                    position: `relative`,
                                    zIndex: 1,
                                    maxWidth: H ? `88vw` : 520,
                                    textAlign: `center`,
                                    padding: `0 16px`
                                },
                                children: z.lines.slice(0, Tt + 1).map((e, t)=>{
                                    let n = e === z.lines[z.lines.length - 1] && Tt >= z.lines.length - 1, r = e === `You have entered:`;
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
                                            fontSize: n ? H ? 28 : 40 : r ? 14 : H ? 17 : 20,
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
                    children: P && (()=>{
                        let e = P.rarity === `legendary` ? `#eedd44` : P.rarity === `rare` ? `#c88aff` : `#88ddbb`, t = P.rarity.toUpperCase();
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
                                                width: H ? 168 : 220,
                                                height: H ? 168 : 220,
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
                                                width: H ? 200 : 260,
                                                height: H ? 200 : 260,
                                                borderRadius: `50%`,
                                                border: `1px solid ${e}88`
                                            }
                                        }),
                                        (0, I.jsx)(`img`, {
                                            src: ce(P.id),
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
                            position: `absolute`,
                            inset: 0,
                            zIndex: 40,
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            padding: H ? 12 : 20,
                            background: `rgba(4,2,6,0.55)`,
                            backdropFilter: `blur(2px)`,
                            pointerEvents: `auto`
                        },
                        children: (0, I.jsx)(Ot, {
                            duel: $.pirateDuel,
                            ship: $.ship,
                            isMobile: H,
                            log: $.log,
                            notoriety: $.notoriety ?? 0,
                            onAction: Nn
                        })
                    }, `pirate-duel`)
                }),
                (0, I.jsx)(n, {
                    children: $.event && !$.pirateDuel && !$.gameOver && !$.showPort && pe[$.event.cellType] && (0, I.jsx)(bt, {
                        variant: `scene`,
                        event: $.event,
                        isMobile: H,
                        gold: $.ship.gold,
                        hull: $.ship.hull,
                        relics: $.relics,
                        upgrades: $.ship.upgrades,
                        score: $.score,
                        onboard: M,
                        onDismissOnboard: en,
                        onChoose: Mn,
                        canEscape: !!En,
                        onSkip: Pn,
                        interactive: !Y || Y === `death`
                    }, `event-scene`)
                }),
                (0, I.jsx)(n, {
                    children: $.event && !$.pirateDuel && !$.gameOver && !$.showPort && $.event.cellType && !O[$.event.cellType] && (0, I.jsx)(bt, {
                        variant: `compact`,
                        event: $.event,
                        isMobile: H,
                        gold: $.ship.gold,
                        hull: $.ship.hull,
                        relics: $.relics,
                        upgrades: $.ship.upgrades,
                        cellIcon: _e[$.event.cellType],
                        onboard: M,
                        onDismissOnboard: en,
                        onChoose: Mn,
                        canEscape: !!En,
                        onSkip: Pn,
                        interactive: !Y || Y === `death`
                    }, `event-compact`)
                }),
                (0, I.jsx)(Nt, {
                    open: !!$.showPort && !$.gameOver,
                    isMobile: H,
                    ship: $.ship,
                    portUpgrades: $.portUpgrades,
                    upgradeToken: !!$.upgradeToken,
                    maxedComponents: $.maxedComponents,
                    cart: Ze,
                    setCart: Qe,
                    onboard: M,
                    onDismissOnboard: en,
                    onUpgradeComponent: Fn,
                    onReroll: ()=>{
                        q(40), A((e)=>ie(e));
                    },
                    freeReroll: $.shipType === `merchant` && !!$.merchantFreeReroll,
                    onRepair: (e, t, n)=>{
                        q(n), A((n)=>re(n, e, t));
                    },
                    onSetSail: ()=>{
                        for (let e of Ze)q(50 + mt.indexOf(e));
                        q(70), A((e)=>{
                            let t = e;
                            for (let e of Ze)t = ee(t, e);
                            return b(t);
                        }), Qe([]);
                    }
                }),
                (0, I.jsx)(Rt, {
                    open: an,
                    state: $,
                    isMobile: H,
                    isDailyRun: W,
                    personalBest: Dt,
                    isNewRecord: Pt,
                    newFeats: rt,
                    nearFeats: at,
                    submitStatus: ft,
                    onRetrySubmit: ()=>{
                        rn();
                    },
                    nftMinted: yt,
                    walletAddress: e,
                    account: t,
                    onChainDone: L,
                    setOnChainDone: ht,
                    submitting: Gt,
                    setSubmitting: Kt,
                    connecting: ze,
                    onConnect: ()=>Re(),
                    showGuestDailyCta: !!(e && Be.current && !W && Ve && c),
                    onPlayDaily: c,
                    rangMois: ln,
                    harborDown: Xt,
                    restarting: Qt,
                    onRestart: In,
                    onHome: o,
                    onWatchReplay: K.current.length > 0 ? ()=>{
                        qe({
                            seed: $.seed,
                            shipId: E ?? `default`,
                            actions: [
                                ...K.current
                            ],
                            label: W ? `Daily Challenge` : $.runTitle || `Corsair`,
                            finalScore: $.score
                        });
                    } : void 0
                }),
                Ke && (0, I.jsx)(Ce, {
                    payload: Ke,
                    isMobile: H,
                    onClose: ()=>qe(null)
                }),
                St.length > 0 && (0, I.jsx)(zt, {
                    queue: St,
                    isMobile: H,
                    onDismiss: ()=>Ct((e)=>e.slice(1))
                }),
                (0, I.jsx)(Vt, {
                    open: gn,
                    isMobile: H,
                    muted: B,
                    onClose: ()=>{
                        On.current = !1, Z(!1);
                    }
                }),
                H && (0, I.jsxs)(I.Fragment, {
                    children: [
                        !$.event && !$.showPort && !$.gameOver && (0, I.jsxs)(`div`, {
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
                                    onClick: ()=>_n(Q === `ship` ? null : `ship`),
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
                                    children: (0, I.jsx)(C, {
                                        name: `anchor`,
                                        size: 22
                                    })
                                }),
                                (0, I.jsx)(i.button, {
                                    whileTap: {
                                        scale: .9
                                    },
                                    onClick: ()=>_n(Q === `upgrades` ? null : `upgrades`),
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
                                    children: (0, I.jsx)(C, {
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
                                                    (0, I.jsx)(C, {
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
                            onClick: ()=>_n(null)
                        })
                    ]
                })
            ]
        });
    };
});
export { Wt as default, __tla };
