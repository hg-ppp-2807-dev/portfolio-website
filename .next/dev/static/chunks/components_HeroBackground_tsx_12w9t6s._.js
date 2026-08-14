(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/HeroBackground.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const COLORS = [
    "#7c5cff",
    "#00b8ff",
    "#b8a3ff",
    "#5c7aff"
];
const MAX_DIST = 140;
const PARTICLE_COUNT = 60;
function HeroBackground() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const mouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: -9999,
        y: -9999
    });
    const particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            /* --- resize -------------------------------------------- */ const resize = {
                "HeroBackground.useEffect.resize": ()=>{
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetHeight;
                }
            }["HeroBackground.useEffect.resize"];
            resize();
            window.addEventListener("resize", resize);
            /* --- init particles ------------------------------------ */ particles.current = Array.from({
                length: PARTICLE_COUNT
            }, {
                "HeroBackground.useEffect": ()=>({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.45,
                        vy: (Math.random() - 0.5) * 0.45,
                        radius: Math.random() * 1.6 + 0.8,
                        color: COLORS[Math.floor(Math.random() * COLORS.length)]
                    })
            }["HeroBackground.useEffect"]);
            /* --- mouse tracking ------------------------------------ */ const onMove = {
                "HeroBackground.useEffect.onMove": (e)=>{
                    const rect = canvas.getBoundingClientRect();
                    mouse.current = {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                    };
                }
            }["HeroBackground.useEffect.onMove"];
            const onLeave = {
                "HeroBackground.useEffect.onLeave": ()=>{
                    mouse.current = {
                        x: -9999,
                        y: -9999
                    };
                }
            }["HeroBackground.useEffect.onLeave"];
            canvas.addEventListener("mousemove", onMove);
            canvas.addEventListener("mouseleave", onLeave);
            /* --- draw loop ----------------------------------------- */ const draw = {
                "HeroBackground.useEffect.draw": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const pts = particles.current;
                    for (const p of pts){
                        // mouse repulsion
                        const dx = p.x - mouse.current.x;
                        const dy = p.y - mouse.current.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < 100) {
                            p.vx += dx / d * 0.06;
                            p.vy += dy / d * 0.06;
                        }
                        // speed cap
                        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                        if (speed > 1.2) {
                            p.vx *= 0.96;
                            p.vy *= 0.96;
                        }
                        // move
                        p.x += p.vx;
                        p.y += p.vy;
                        // bounce
                        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                        // draw dot
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = 0.7;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                    // draw connections
                    for(let i = 0; i < pts.length; i++){
                        for(let j = i + 1; j < pts.length; j++){
                            const dx = pts[i].x - pts[j].x;
                            const dy = pts[i].y - pts[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < MAX_DIST) {
                                const alpha = (1 - dist / MAX_DIST) * 0.22;
                                ctx.beginPath();
                                ctx.moveTo(pts[i].x, pts[i].y);
                                ctx.lineTo(pts[j].x, pts[j].y);
                                ctx.strokeStyle = pts[i].color;
                                ctx.lineWidth = 0.8;
                                ctx.globalAlpha = alpha;
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                            }
                        }
                    }
                    animRef.current = requestAnimationFrame(draw);
                }
            }["HeroBackground.useEffect.draw"];
            draw();
            return ({
                "HeroBackground.useEffect": ()=>{
                    cancelAnimationFrame(animRef.current);
                    window.removeEventListener("resize", resize);
                    canvas.removeEventListener("mousemove", onMove);
                    canvas.removeEventListener("mouseleave", onLeave);
                }
            })["HeroBackground.useEffect"];
        }
    }["HeroBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "auto"
        }
    }, void 0, false, {
        fileName: "[project]/components/HeroBackground.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_s(HeroBackground, "rUueNx5Tqq0bAgAF5D5oSxAt2A8=");
_c = HeroBackground;
var _c;
__turbopack_context__.k.register(_c, "HeroBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/HeroBackground.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/HeroBackground.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_HeroBackground_tsx_12w9t6s._.js.map