/* @preserve skinview3d / MIT License / https://github.com/bs-community/skinview3d */ ! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).skinview3d = {})
}(this, (function(e) {
    "use strict";
    const t = 0,
        i = 1,
        n = 2,
        r = 0,
        a = 1,
        s = 2,
        o = 3,
        l = 100,
        c = 1e3,
        d = 1001,
        h = 1002,
        u = 1003,
        f = 1006,
        p = 1008,
        m = 1009,
        g = 1012,
        x = 1014,
        _ = 1015,
        v = 1016,
        y = 1020,
        M = 1022,
        b = 1023,
        A = 1026,
        w = 1027,
        S = 3e3,
        T = 7680,
        L = "300 es";
    class E {
        addEventListener(e, t) {
            void 0 === this._listeners && (this._listeners = {});
            const i = this._listeners;
            void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t)
        }
        hasEventListener(e, t) {
            if (void 0 === this._listeners) return !1;
            const i = this._listeners;
            return void 0 !== i[e] && -1 !== i[e].indexOf(t)
        }
        removeEventListener(e, t) {
            if (void 0 === this._listeners) return;
            const i = this._listeners[e];
            if (void 0 !== i) {
                const e = i.indexOf(t); - 1 !== e && i.splice(e, 1)
            }
        }
        dispatchEvent(e) {
            if (void 0 === this._listeners) return;
            const t = this._listeners[e.type];
            if (void 0 !== t) {
                e.target = this;
                const i = t.slice(0);
                for (let t = 0, n = i.length; t < n; t++) i[t].call(this, e);
                e.target = null
            }
        }
    }
    const P = [];
    for (let e = 0; e < 256; e++) P[e] = (e < 16 ? "0" : "") + e.toString(16);
    const F = Math.PI / 180,
        N = 180 / Math.PI;

    function C() {
        const e = 4294967295 * Math.random() | 0,
            t = 4294967295 * Math.random() | 0,
            i = 4294967295 * Math.random() | 0,
            n = 4294967295 * Math.random() | 0;
        return (P[255 & e] + P[e >> 8 & 255] + P[e >> 16 & 255] + P[e >> 24 & 255] + "-" + P[255 & t] + P[t >> 8 & 255] + "-" + P[t >> 16 & 15 | 64] + P[t >> 24 & 255] + "-" + P[63 & i | 128] + P[i >> 8 & 255] + "-" + P[i >> 16 & 255] + P[i >> 24 & 255] + P[255 & n] + P[n >> 8 & 255] + P[n >> 16 & 255] + P[n >> 24 & 255]).toUpperCase()
    }

    function R(e, t, i) {
        return Math.max(t, Math.min(i, e))
    }

    function D(e, t, i) {
        return (1 - i) * e + i * t
    }

    function I(e) {
        return 0 == (e & e - 1) && 0 !== e
    }

    function U(e) {
        return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
    }
    class z {
        constructor(e = 0, t = 0) {
            this.x = e, this.y = t
        }
        get width() {
            return this.x
        }
        set width(e) {
            this.x = e
        }
        get height() {
            return this.y
        }
        set height(e) {
            this.y = e
        }
        set(e, t) {
            return this.x = e, this.y = t, this
        }
        setScalar(e) {
            return this.x = e, this.y = e, this
        }
        setX(e) {
            return this.x = e, this
        }
        setY(e) {
            return this.y = e, this
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                default:
                    throw new Error("index is out of range: " + e)
            }
            return this
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw new Error("index is out of range: " + e)
            }
        }
        clone() {
            return new this.constructor(this.x, this.y)
        }
        copy(e) {
            return this.x = e.x, this.y = e.y, this
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
        }
        addScalar(e) {
            return this.x += e, this.y += e, this
        }
        addVectors(e, t) {
            return this.x = e.x + t.x, this.y = e.y + t.y, this
        }
        addScaledVector(e, t) {
            return this.x += e.x * t, this.y += e.y * t, this
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
        }
        subScalar(e) {
            return this.x -= e, this.y -= e, this
        }
        subVectors(e, t) {
            return this.x = e.x - t.x, this.y = e.y - t.y, this
        }
        multiply(e) {
            return this.x *= e.x, this.y *= e.y, this
        }
        multiplyScalar(e) {
            return this.x *= e, this.y *= e, this
        }
        divide(e) {
            return this.x /= e.x, this.y /= e.y, this
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }
        applyMatrix3(e) {
            const t = this.x,
                i = this.y,
                n = e.elements;
            return this.x = n[0] * t + n[3] * i + n[6], this.y = n[1] * t + n[4] * i + n[7], this
        }
        min(e) {
            return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this
        }
        max(e) {
            return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this
        }
        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this
        }
        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this
        }
        clampLength(e, t) {
            const i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }
        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        }
        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        }
        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
        }
        negate() {
            return this.x = -this.x, this.y = -this.y, this
        }
        dot(e) {
            return this.x * e.x + this.y * e.y
        }
        cross(e) {
            return this.x * e.y - this.y * e.x
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        angle() {
            return Math.atan2(-this.y, -this.x) + Math.PI
        }
        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e))
        }
        distanceToSquared(e) {
            const t = this.x - e.x,
                i = this.y - e.y;
            return t * t + i * i
        }
        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }
        lerp(e, t) {
            return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
        }
        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this
        }
        equals(e) {
            return e.x === this.x && e.y === this.y
        }
        fromArray(e, t = 0) {
            return this.x = e[t], this.y = e[t + 1], this
        }
        toArray(e = [], t = 0) {
            return e[t] = this.x, e[t + 1] = this.y, e
        }
        fromBufferAttribute(e, t, i) {
            return void 0 !== i && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this
        }
        rotateAround(e, t) {
            const i = Math.cos(t),
                n = Math.sin(t),
                r = this.x - e.x,
                a = this.y - e.y;
            return this.x = r * i - a * n + e.x, this.y = r * n + a * i + e.y, this
        }
        random() {
            return this.x = Math.random(), this.y = Math.random(), this
        }
    }
    z.prototype.isVector2 = !0;
    class O {
        constructor() {
            this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
        }
        set(e, t, i, n, r, a, s, o, l) {
            const c = this.elements;
            return c[0] = e, c[1] = n, c[2] = s, c[3] = t, c[4] = r, c[5] = o, c[6] = i, c[7] = a, c[8] = l, this
        }
        identity() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
        }
        copy(e) {
            const t = this.elements,
                i = e.elements;
            return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], this
        }
        extractBasis(e, t, i) {
            return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this
        }
        setFromMatrix4(e) {
            const t = e.elements;
            return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
        }
        multiply(e) {
            return this.multiplyMatrices(this, e)
        }
        premultiply(e) {
            return this.multiplyMatrices(e, this)
        }
        multiplyMatrices(e, t) {
            const i = e.elements,
                n = t.elements,
                r = this.elements,
                a = i[0],
                s = i[3],
                o = i[6],
                l = i[1],
                c = i[4],
                d = i[7],
                h = i[2],
                u = i[5],
                f = i[8],
                p = n[0],
                m = n[3],
                g = n[6],
                x = n[1],
                _ = n[4],
                v = n[7],
                y = n[2],
                M = n[5],
                b = n[8];
            return r[0] = a * p + s * x + o * y, r[3] = a * m + s * _ + o * M, r[6] = a * g + s * v + o * b, r[1] = l * p + c * x + d * y, r[4] = l * m + c * _ + d * M, r[7] = l * g + c * v + d * b, r[2] = h * p + u * x + f * y, r[5] = h * m + u * _ + f * M, r[8] = h * g + u * v + f * b, this
        }
        multiplyScalar(e) {
            const t = this.elements;
            return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
        }
        determinant() {
            const e = this.elements,
                t = e[0],
                i = e[1],
                n = e[2],
                r = e[3],
                a = e[4],
                s = e[5],
                o = e[6],
                l = e[7],
                c = e[8];
            return t * a * c - t * s * l - i * r * c + i * s * o + n * r * l - n * a * o
        }
        invert() {
            const e = this.elements,
                t = e[0],
                i = e[1],
                n = e[2],
                r = e[3],
                a = e[4],
                s = e[5],
                o = e[6],
                l = e[7],
                c = e[8],
                d = c * a - s * l,
                h = s * o - c * r,
                u = l * r - a * o,
                f = t * d + i * h + n * u;
            if (0 === f) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            const p = 1 / f;
            return e[0] = d * p, e[1] = (n * l - c * i) * p, e[2] = (s * i - n * a) * p, e[3] = h * p, e[4] = (c * t - n * o) * p, e[5] = (n * r - s * t) * p, e[6] = u * p, e[7] = (i * o - l * t) * p, e[8] = (a * t - i * r) * p, this
        }
        transpose() {
            let e;
            const t = this.elements;
            return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
        }
        getNormalMatrix(e) {
            return this.setFromMatrix4(e).invert().transpose()
        }
        transposeIntoArray(e) {
            const t = this.elements;
            return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
        }
        setUvTransform(e, t, i, n, r, a, s) {
            const o = Math.cos(r),
                l = Math.sin(r);
            return this.set(i * o, i * l, -i * (o * a + l * s) + a + e, -n * l, n * o, -n * (-l * a + o * s) + s + t, 0, 0, 1), this
        }
        scale(e, t) {
            const i = this.elements;
            return i[0] *= e, i[3] *= e, i[6] *= e, i[1] *= t, i[4] *= t, i[7] *= t, this
        }
        rotate(e) {
            const t = Math.cos(e),
                i = Math.sin(e),
                n = this.elements,
                r = n[0],
                a = n[3],
                s = n[6],
                o = n[1],
                l = n[4],
                c = n[7];
            return n[0] = t * r + i * o, n[3] = t * a + i * l, n[6] = t * s + i * c, n[1] = -i * r + t * o, n[4] = -i * a + t * l, n[7] = -i * s + t * c, this
        }
        translate(e, t) {
            const i = this.elements;
            return i[0] += e * i[2], i[3] += e * i[5], i[6] += e * i[8], i[1] += t * i[2], i[4] += t * i[5], i[7] += t * i[8], this
        }
        equals(e) {
            const t = this.elements,
                i = e.elements;
            for (let e = 0; e < 9; e++)
                if (t[e] !== i[e]) return !1;
            return !0
        }
        fromArray(e, t = 0) {
            for (let i = 0; i < 9; i++) this.elements[i] = e[i + t];
            return this
        }
        toArray(e = [], t = 0) {
            const i = this.elements;
            return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e
        }
        clone() {
            return (new this.constructor).fromArray(this.elements)
        }
    }
    let B;
    O.prototype.isMatrix3 = !0;
    let G = 0;
    class H extends E {
        constructor(e = H.DEFAULT_IMAGE, t = H.DEFAULT_MAPPING, i = 1001, n = 1001, r = 1006, a = 1008, s = 1023, o = 1009, l = 1, c = 3e3) {
            super(), Object.defineProperty(this, "id", {
                value: G++
            }), this.uuid = C(), this.name = "", this.image = e, this.mipmaps = [], this.mapping = t, this.wrapS = i, this.wrapT = n, this.magFilter = r, this.minFilter = a, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = o, this.offset = new z(0, 0), this.repeat = new z(1, 1), this.center = new z(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new O, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = c, this.version = 0, this.onUpdate = null
        }
        updateMatrix() {
            this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
        }
        clone() {
            return (new this.constructor).copy(this)
        }
        copy(e) {
            return this.name = e.name, this.image = e.image, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this
        }
        toJSON(e) {
            const t = void 0 === e || "string" == typeof e;
            if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
            const i = {
                metadata: {
                    version: 4.5,
                    type: "Texture",
                    generator: "Texture.toJSON"
                },
                uuid: this.uuid,
                name: this.name,
                mapping: this.mapping,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                center: [this.center.x, this.center.y],
                rotation: this.rotation,
                wrap: [this.wrapS, this.wrapT],
                format: this.format,
                type: this.type,
                encoding: this.encoding,
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY,
                premultiplyAlpha: this.premultiplyAlpha,
                unpackAlignment: this.unpackAlignment
            };
            if (void 0 !== this.image) {
                const n = this.image;
                if (void 0 === n.uuid && (n.uuid = C()), !t && void 0 === e.images[n.uuid]) {
                    let t;
                    if (Array.isArray(n)) {
                        t = [];
                        for (let e = 0, i = n.length; e < i; e++) n[e].isDataTexture ? t.push(k(n[e].image)) : t.push(k(n[e]))
                    } else t = k(n);
                    e.images[n.uuid] = {
                        uuid: n.uuid,
                        url: t
                    }
                }
                i.image = n.uuid
            }
            return t || (e.textures[this.uuid] = i), i
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
        transformUv(e) {
            if (300 !== this.mapping) return e;
            if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
                case c:
                    e.x = e.x - Math.floor(e.x);
                    break;
                case d:
                    e.x = e.x < 0 ? 0 : 1;
                    break;
                case h:
                    1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x)
            }
            if (e.y < 0 || e.y > 1) switch (this.wrapT) {
                case c:
                    e.y = e.y - Math.floor(e.y);
                    break;
                case d:
                    e.y = e.y < 0 ? 0 : 1;
                    break;
                case h:
                    1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y)
            }
            return this.flipY && (e.y = 1 - e.y), e
        }
        set needsUpdate(e) {
            !0 === e && this.version++
        }
    }

    function k(e) {
        return "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap ? class {
            static getDataURL(e) {
                if (/^data:/i.test(e.src)) return e.src;
                if ("undefined" == typeof HTMLCanvasElement) return e.src;
                let t;
                if (e instanceof HTMLCanvasElement) t = e;
                else {
                    void 0 === B && (B = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), B.width = e.width, B.height = e.height;
                    const i = B.getContext("2d");
                    e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), t = B
                }
                return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", .6)) : t.toDataURL("image/png")
            }
        }.getDataURL(e) : e.data ? {
            data: Array.prototype.slice.call(e.data),
            width: e.width,
            height: e.height,
            type: e.data.constructor.name
        } : (console.warn("THREE.Texture: Unable to serialize Texture."), {})
    }
    H.DEFAULT_IMAGE = void 0, H.DEFAULT_MAPPING = 300, H.prototype.isTexture = !0;
    class V {
        constructor(e = 0, t = 0, i = 0, n = 1) {
            this.x = e, this.y = t, this.z = i, this.w = n
        }
        get width() {
            return this.z
        }
        set width(e) {
            this.z = e
        }
        get height() {
            return this.w
        }
        set height(e) {
            this.w = e
        }
        set(e, t, i, n) {
            return this.x = e, this.y = t, this.z = i, this.w = n, this
        }
        setScalar(e) {
            return this.x = e, this.y = e, this.z = e, this.w = e, this
        }
        setX(e) {
            return this.x = e, this
        }
        setY(e) {
            return this.y = e, this
        }
        setZ(e) {
            return this.z = e, this
        }
        setW(e) {
            return this.w = e, this
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                case 3:
                    this.w = t;
                    break;
                default:
                    throw new Error("index is out of range: " + e)
            }
            return this
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw new Error("index is out of range: " + e)
            }
        }
        clone() {
            return new this.constructor(this.x, this.y, this.z, this.w)
        }
        copy(e) {
            return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
        }
        addScalar(e) {
            return this.x += e, this.y += e, this.z += e, this.w += e, this
        }
        addVectors(e, t) {
            return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
        }
        addScaledVector(e, t) {
            return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
        }
        subScalar(e) {
            return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
        }
        subVectors(e, t) {
            return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
        }
        multiply(e) {
            return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this
        }
        multiplyScalar(e) {
            return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
        }
        applyMatrix4(e) {
            const t = this.x,
                i = this.y,
                n = this.z,
                r = this.w,
                a = e.elements;
            return this.x = a[0] * t + a[4] * i + a[8] * n + a[12] * r, this.y = a[1] * t + a[5] * i + a[9] * n + a[13] * r, this.z = a[2] * t + a[6] * i + a[10] * n + a[14] * r, this.w = a[3] * t + a[7] * i + a[11] * n + a[15] * r, this
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }
        setAxisAngleFromQuaternion(e) {
            this.w = 2 * Math.acos(e.w);
            const t = Math.sqrt(1 - e.w * e.w);
            return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
        }
        setAxisAngleFromRotationMatrix(e) {
            let t, i, n, r;
            const a = .01,
                s = .1,
                o = e.elements,
                l = o[0],
                c = o[4],
                d = o[8],
                h = o[1],
                u = o[5],
                f = o[9],
                p = o[2],
                m = o[6],
                g = o[10];
            if (Math.abs(c - h) < a && Math.abs(d - p) < a && Math.abs(f - m) < a) {
                if (Math.abs(c + h) < s && Math.abs(d + p) < s && Math.abs(f + m) < s && Math.abs(l + u + g - 3) < s) return this.set(1, 0, 0, 0), this;
                t = Math.PI;
                const e = (l + 1) / 2,
                    o = (u + 1) / 2,
                    x = (g + 1) / 2,
                    _ = (c + h) / 4,
                    v = (d + p) / 4,
                    y = (f + m) / 4;
                return e > o && e > x ? e < a ? (i = 0, n = .707106781, r = .707106781) : (i = Math.sqrt(e), n = _ / i, r = v / i) : o > x ? o < a ? (i = .707106781, n = 0, r = .707106781) : (n = Math.sqrt(o), i = _ / n, r = y / n) : x < a ? (i = .707106781, n = .707106781, r = 0) : (r = Math.sqrt(x), i = v / r, n = y / r), this.set(i, n, r, t), this
            }
            let x = Math.sqrt((m - f) * (m - f) + (d - p) * (d - p) + (h - c) * (h - c));
            return Math.abs(x) < .001 && (x = 1), this.x = (m - f) / x, this.y = (d - p) / x, this.z = (h - c) / x, this.w = Math.acos((l + u + g - 1) / 2), this
        }
        min(e) {
            return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this
        }
        max(e) {
            return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this
        }
        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this
        }
        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this
        }
        clampLength(e, t) {
            const i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }
        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
        }
        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
        }
        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
        }
        negate() {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
        }
        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }
        lerp(e, t) {
            return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
        }
        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this.w = e.w + (t.w - e.w) * i, this
        }
        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
        }
        fromArray(e, t = 0) {
            return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
        }
        toArray(e = [], t = 0) {
            return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
        }
        fromBufferAttribute(e, t, i) {
            return void 0 !== i && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this
        }
        random() {
            return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this
        }
    }
    V.prototype.isVector4 = !0;
    class W extends E {
        constructor(e, t, i) {
            super(), this.width = e, this.height = t, this.depth = 1, this.scissor = new V(0, 0, e, t), this.scissorTest = !1, this.viewport = new V(0, 0, e, t), i = i || {}, this.texture = new H(void 0, i.mapping, i.wrapS, i.wrapT, i.magFilter, i.minFilter, i.format, i.type, i.anisotropy, i.encoding), this.texture.image = {}, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = 1, this.texture.generateMipmaps = void 0 !== i.generateMipmaps && i.generateMipmaps, this.texture.minFilter = void 0 !== i.minFilter ? i.minFilter : f, this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer, this.stencilBuffer = void 0 !== i.stencilBuffer && i.stencilBuffer, this.depthTexture = void 0 !== i.depthTexture ? i.depthTexture : null
        }
        setTexture(e) {
            e.image = {
                width: this.width,
                height: this.height,
                depth: this.depth
            }, this.texture = e
        }
        setSize(e, t, i = 1) {
            this.width === e && this.height === t && this.depth === i || (this.width = e, this.height = t, this.depth = i, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = i, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
        }
        clone() {
            return (new this.constructor).copy(this)
        }
        copy(e) {
            return this.width = e.width, this.height = e.height, this.depth = e.depth, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    }
    W.prototype.isWebGLRenderTarget = !0;
    class X {
        constructor(e = 0, t = 0, i = 0, n = 1) {
            this._x = e, this._y = t, this._z = i, this._w = n
        }
        static slerp(e, t, i, n) {
            return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."), i.slerpQuaternions(e, t, n)
        }
        static slerpFlat(e, t, i, n, r, a, s) {
            let o = i[n + 0],
                l = i[n + 1],
                c = i[n + 2],
                d = i[n + 3];
            const h = r[a + 0],
                u = r[a + 1],
                f = r[a + 2],
                p = r[a + 3];
            if (0 === s) return e[t + 0] = o, e[t + 1] = l, e[t + 2] = c, void(e[t + 3] = d);
            if (1 === s) return e[t + 0] = h, e[t + 1] = u, e[t + 2] = f, void(e[t + 3] = p);
            if (d !== p || o !== h || l !== u || c !== f) {
                let e = 1 - s;
                const t = o * h + l * u + c * f + d * p,
                    i = t >= 0 ? 1 : -1,
                    n = 1 - t * t;
                if (n > Number.EPSILON) {
                    const r = Math.sqrt(n),
                        a = Math.atan2(r, t * i);
                    e = Math.sin(e * a) / r, s = Math.sin(s * a) / r
                }
                const r = s * i;
                if (o = o * e + h * r, l = l * e + u * r, c = c * e + f * r, d = d * e + p * r, e === 1 - s) {
                    const e = 1 / Math.sqrt(o * o + l * l + c * c + d * d);
                    o *= e, l *= e, c *= e, d *= e
                }
            }
            e[t] = o, e[t + 1] = l, e[t + 2] = c, e[t + 3] = d
        }
        static multiplyQuaternionsFlat(e, t, i, n, r, a) {
            const s = i[n],
                o = i[n + 1],
                l = i[n + 2],
                c = i[n + 3],
                d = r[a],
                h = r[a + 1],
                u = r[a + 2],
                f = r[a + 3];
            return e[t] = s * f + c * d + o * u - l * h, e[t + 1] = o * f + c * h + l * d - s * u, e[t + 2] = l * f + c * u + s * h - o * d, e[t + 3] = c * f - s * d - o * h - l * u, e
        }
        get x() {
            return this._x
        }
        set x(e) {
            this._x = e, this._onChangeCallback()
        }
        get y() {
            return this._y
        }
        set y(e) {
            this._y = e, this._onChangeCallback()
        }
        get z() {
            return this._z
        }
        set z(e) {
            this._z = e, this._onChangeCallback()
        }
        get w() {
            return this._w
        }
        set w(e) {
            this._w = e, this._onChangeCallback()
        }
        set(e, t, i, n) {
            return this._x = e, this._y = t, this._z = i, this._w = n, this._onChangeCallback(), this
        }
        clone() {
            return new this.constructor(this._x, this._y, this._z, this._w)
        }
        copy(e) {
            return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this
        }
        setFromEuler(e, t) {
            if (!e || !e.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
            const i = e._x,
                n = e._y,
                r = e._z,
                a = e._order,
                s = Math.cos,
                o = Math.sin,
                l = s(i / 2),
                c = s(n / 2),
                d = s(r / 2),
                h = o(i / 2),
                u = o(n / 2),
                f = o(r / 2);
            switch (a) {
                case "XYZ":
                    this._x = h * c * d + l * u * f, this._y = l * u * d - h * c * f, this._z = l * c * f + h * u * d, this._w = l * c * d - h * u * f;
                    break;
                case "YXZ":
                    this._x = h * c * d + l * u * f, this._y = l * u * d - h * c * f, this._z = l * c * f - h * u * d, this._w = l * c * d + h * u * f;
                    break;
                case "ZXY":
                    this._x = h * c * d - l * u * f, this._y = l * u * d + h * c * f, this._z = l * c * f + h * u * d, this._w = l * c * d - h * u * f;
                    break;
                case "ZYX":
                    this._x = h * c * d - l * u * f, this._y = l * u * d + h * c * f, this._z = l * c * f - h * u * d, this._w = l * c * d + h * u * f;
                    break;
                case "YZX":
                    this._x = h * c * d + l * u * f, this._y = l * u * d + h * c * f, this._z = l * c * f - h * u * d, this._w = l * c * d - h * u * f;
                    break;
                case "XZY":
                    this._x = h * c * d - l * u * f, this._y = l * u * d - h * c * f, this._z = l * c * f + h * u * d, this._w = l * c * d + h * u * f;
                    break;
                default:
                    console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a)
            }
            return !1 !== t && this._onChangeCallback(), this
        }
        setFromAxisAngle(e, t) {
            const i = t / 2,
                n = Math.sin(i);
            return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = Math.cos(i), this._onChangeCallback(), this
        }
        setFromRotationMatrix(e) {
            const t = e.elements,
                i = t[0],
                n = t[4],
                r = t[8],
                a = t[1],
                s = t[5],
                o = t[9],
                l = t[2],
                c = t[6],
                d = t[10],
                h = i + s + d;
            if (h > 0) {
                const e = .5 / Math.sqrt(h + 1);
                this._w = .25 / e, this._x = (c - o) * e, this._y = (r - l) * e, this._z = (a - n) * e
            } else if (i > s && i > d) {
                const e = 2 * Math.sqrt(1 + i - s - d);
                this._w = (c - o) / e, this._x = .25 * e, this._y = (n + a) / e, this._z = (r + l) / e
            } else if (s > d) {
                const e = 2 * Math.sqrt(1 + s - i - d);
                this._w = (r - l) / e, this._x = (n + a) / e, this._y = .25 * e, this._z = (o + c) / e
            } else {
                const e = 2 * Math.sqrt(1 + d - i - s);
                this._w = (a - n) / e, this._x = (r + l) / e, this._y = (o + c) / e, this._z = .25 * e
            }
            return this._onChangeCallback(), this
        }
        setFromUnitVectors(e, t) {
            let i = e.dot(t) + 1;
            return i < Number.EPSILON ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize()
        }
        angleTo(e) {
            return 2 * Math.acos(Math.abs(R(this.dot(e), -1, 1)))
        }
        rotateTowards(e, t) {
            const i = this.angleTo(e);
            if (0 === i) return this;
            const n = Math.min(1, t / i);
            return this.slerp(e, n), this
        }
        identity() {
            return this.set(0, 0, 0, 1)
        }
        invert() {
            return this.conjugate()
        }
        conjugate() {
            return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this
        }
        dot(e) {
            return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
        }
        lengthSq() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        }
        length() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
        }
        normalize() {
            let e = this.length();
            return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
        }
        premultiply(e) {
            return this.multiplyQuaternions(e, this)
        }
        multiplyQuaternions(e, t) {
            const i = e._x,
                n = e._y,
                r = e._z,
                a = e._w,
                s = t._x,
                o = t._y,
                l = t._z,
                c = t._w;
            return this._x = i * c + a * s + n * l - r * o, this._y = n * c + a * o + r * s - i * l, this._z = r * c + a * l + i * o - n * s, this._w = a * c - i * s - n * o - r * l, this._onChangeCallback(), this
        }
        slerp(e, t) {
            if (0 === t) return this;
            if (1 === t) return this.copy(e);
            const i = this._x,
                n = this._y,
                r = this._z,
                a = this._w;
            let s = a * e._w + i * e._x + n * e._y + r * e._z;
            if (s < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, s = -s) : this.copy(e), s >= 1) return this._w = a, this._x = i, this._y = n, this._z = r, this;
            const o = 1 - s * s;
            if (o <= Number.EPSILON) {
                const e = 1 - t;
                return this._w = e * a + t * this._w, this._x = e * i + t * this._x, this._y = e * n + t * this._y, this._z = e * r + t * this._z, this.normalize(), this._onChangeCallback(), this
            }
            const l = Math.sqrt(o),
                c = Math.atan2(l, s),
                d = Math.sin((1 - t) * c) / l,
                h = Math.sin(t * c) / l;
            return this._w = a * d + this._w * h, this._x = i * d + this._x * h, this._y = n * d + this._y * h, this._z = r * d + this._z * h, this._onChangeCallback(), this
        }
        slerpQuaternions(e, t, i) {
            this.copy(e).slerp(t, i)
        }
        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
        }
        fromArray(e, t = 0) {
            return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this
        }
        toArray(e = [], t = 0) {
            return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
        }
        fromBufferAttribute(e, t) {
            return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this
        }
        _onChange(e) {
            return this._onChangeCallback = e, this
        }
        _onChangeCallback() {}
    }
    X.prototype.isQuaternion = !0;
    class Y {
        constructor(e = 0, t = 0, i = 0) {
            this.x = e, this.y = t, this.z = i
        }
        set(e, t, i) {
            return void 0 === i && (i = this.z), this.x = e, this.y = t, this.z = i, this
        }
        setScalar(e) {
            return this.x = e, this.y = e, this.z = e, this
        }
        setX(e) {
            return this.x = e, this
        }
        setY(e) {
            return this.y = e, this
        }
        setZ(e) {
            return this.z = e, this
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                default:
                    throw new Error("index is out of range: " + e)
            }
            return this
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error("index is out of range: " + e)
            }
        }
        clone() {
            return new this.constructor(this.x, this.y, this.z)
        }
        copy(e) {
            return this.x = e.x, this.y = e.y, this.z = e.z, this
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
        }
        addScalar(e) {
            return this.x += e, this.y += e, this.z += e, this
        }
        addVectors(e, t) {
            return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
        }
        addScaledVector(e, t) {
            return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
        }
        subScalar(e) {
            return this.x -= e, this.y -= e, this.z -= e, this
        }
        subVectors(e, t) {
            return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
        }
        multiplyScalar(e) {
            return this.x *= e, this.y *= e, this.z *= e, this
        }
        multiplyVectors(e, t) {
            return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
        }
        applyEuler(e) {
            return e && e.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(j.setFromEuler(e))
        }
        applyAxisAngle(e, t) {
            return this.applyQuaternion(j.setFromAxisAngle(e, t))
        }
        applyMatrix3(e) {
            const t = this.x,
                i = this.y,
                n = this.z,
                r = e.elements;
            return this.x = r[0] * t + r[3] * i + r[6] * n, this.y = r[1] * t + r[4] * i + r[7] * n, this.z = r[2] * t + r[5] * i + r[8] * n, this
        }
        applyNormalMatrix(e) {
            return this.applyMatrix3(e).normalize()
        }
        applyMatrix4(e) {
            const t = this.x,
                i = this.y,
                n = this.z,
                r = e.elements,
                a = 1 / (r[3] * t + r[7] * i + r[11] * n + r[15]);
            return this.x = (r[0] * t + r[4] * i + r[8] * n + r[12]) * a, this.y = (r[1] * t + r[5] * i + r[9] * n + r[13]) * a, this.z = (r[2] * t + r[6] * i + r[10] * n + r[14]) * a, this
        }
        applyQuaternion(e) {
            const t = this.x,
                i = this.y,
                n = this.z,
                r = e.x,
                a = e.y,
                s = e.z,
                o = e.w,
                l = o * t + a * n - s * i,
                c = o * i + s * t - r * n,
                d = o * n + r * i - a * t,
                h = -r * t - a * i - s * n;
            return this.x = l * o + h * -r + c * -s - d * -a, this.y = c * o + h * -a + d * -r - l * -s, this.z = d * o + h * -s + l * -a - c * -r, this
        }
        project(e) {
            return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
        }
        unproject(e) {
            return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
        }
        transformDirection(e) {
            const t = this.x,
                i = this.y,
                n = this.z,
                r = e.elements;
            return this.x = r[0] * t + r[4] * i + r[8] * n, this.y = r[1] * t + r[5] * i + r[9] * n, this.z = r[2] * t + r[6] * i + r[10] * n, this.normalize()
        }
        divide(e) {
            return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }
        min(e) {
            return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this
        }
        max(e) {
            return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this
        }
        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this
        }
        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this
        }
        clampLength(e, t) {
            const i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }
        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
        }
        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
        }
        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
        }
        negate() {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
        }
        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }
        lerp(e, t) {
            return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
        }
        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this
        }
        cross(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t)) : this.crossVectors(this, e)
        }
        crossVectors(e, t) {
            const i = e.x,
                n = e.y,
                r = e.z,
                a = t.x,
                s = t.y,
                o = t.z;
            return this.x = n * o - r * s, this.y = r * a - i * o, this.z = i * s - n * a, this
        }
        projectOnVector(e) {
            const t = e.lengthSq();
            if (0 === t) return this.set(0, 0, 0);
            const i = e.dot(this) / t;
            return this.copy(e).multiplyScalar(i)
        }
        projectOnPlane(e) {
            return Q.copy(this).projectOnVector(e), this.sub(Q)
        }
        reflect(e) {
            return this.sub(Q.copy(e).multiplyScalar(2 * this.dot(e)))
        }
        angleTo(e) {
            const t = Math.sqrt(this.lengthSq() * e.lengthSq());
            if (0 === t) return Math.PI / 2;
            const i = this.dot(e) / t;
            return Math.acos(R(i, -1, 1))
        }
        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e))
        }
        distanceToSquared(e) {
            const t = this.x - e.x,
                i = this.y - e.y,
                n = this.z - e.z;
            return t * t + i * i + n * n
        }
        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
        }
        setFromSpherical(e) {
            return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
        }
        setFromSphericalCoords(e, t, i) {
            const n = Math.sin(t) * e;
            return this.x = n * Math.sin(i), this.y = Math.cos(t) * e, this.z = n * Math.cos(i), this
        }
        setFromCylindrical(e) {
            return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
        }
        setFromCylindricalCoords(e, t, i) {
            return this.x = e * Math.sin(t), this.y = i, this.z = e * Math.cos(t), this
        }
        setFromMatrixPosition(e) {
            const t = e.elements;
            return this.x = t[12], this.y = t[13], this.z = t[14], this
        }
        setFromMatrixScale(e) {
            const t = this.setFromMatrixColumn(e, 0).length(),
                i = this.setFromMatrixColumn(e, 1).length(),
                n = this.setFromMatrixColumn(e, 2).length();
            return this.x = t, this.y = i, this.z = n, this
        }
        setFromMatrixColumn(e, t) {
            return this.fromArray(e.elements, 4 * t)
        }
        setFromMatrix3Column(e, t) {
            return this.fromArray(e.elements, 3 * t)
        }
        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z
        }
        fromArray(e, t = 0) {
            return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
        }
        toArray(e = [], t = 0) {
            return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
        }
        fromBufferAttribute(e, t, i) {
            return void 0 !== i && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this
        }
        random() {
            return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this
        }
    }
    Y.prototype.isVector3 = !0;
    const Q = new Y,
        j = new X;
    class q {
        constructor(e = new Y(1 / 0, 1 / 0, 1 / 0), t = new Y(-1 / 0, -1 / 0, -1 / 0)) {
            this.min = e, this.max = t
        }
        set(e, t) {
            return this.min.copy(e), this.max.copy(t), this
        }
        setFromArray(e) {
            let t = 1 / 0,
                i = 1 / 0,
                n = 1 / 0,
                r = -1 / 0,
                a = -1 / 0,
                s = -1 / 0;
            for (let o = 0, l = e.length; o < l; o += 3) {
                const l = e[o],
                    c = e[o + 1],
                    d = e[o + 2];
                l < t && (t = l), c < i && (i = c), d < n && (n = d), l > r && (r = l), c > a && (a = c), d > s && (s = d)
            }
            return this.min.set(t, i, n), this.max.set(r, a, s), this
        }
        setFromBufferAttribute(e) {
            let t = 1 / 0,
                i = 1 / 0,
                n = 1 / 0,
                r = -1 / 0,
                a = -1 / 0,
                s = -1 / 0;
            for (let o = 0, l = e.count; o < l; o++) {
                const l = e.getX(o),
                    c = e.getY(o),
                    d = e.getZ(o);
                l < t && (t = l), c < i && (i = c), d < n && (n = d), l > r && (r = l), c > a && (a = c), d > s && (s = d)
            }
            return this.min.set(t, i, n), this.max.set(r, a, s), this
        }
        setFromPoints(e) {
            this.makeEmpty();
            for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
            return this
        }
        setFromCenterAndSize(e, t) {
            const i = J.copy(t).multiplyScalar(.5);
            return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
        }
        setFromObject(e) {
            return this.makeEmpty(), this.expandByObject(e)
        }
        clone() {
            return (new this.constructor).copy(this)
        }
        copy(e) {
            return this.min.copy(e.min), this.max.copy(e.max), this
        }
        makeEmpty() {
            return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
        }
        isEmpty() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        }
        getCenter(e) {
            return void 0 === e && (console.warn("THREE.Box3: .getCenter() target is now required"), e = new Y), this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
        }
        getSize(e) {
            return void 0 === e && (console.warn("THREE.Box3: .getSize() target is now required"), e = new Y), this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
        }
        expandByPoint(e) {
            return this.min.min(e), this.max.max(e), this
        }
        expandByVector(e) {
            return this.min.sub(e), this.max.add(e), this
        }
        expandByScalar(e) {
            return this.min.addScalar(-e), this.max.addScalar(e), this
        }
        expandByObject(e) {
            e.updateWorldMatrix(!1, !1);
            const t = e.geometry;
            void 0 !== t && (null === t.boundingBox && t.computeBoundingBox(), K.copy(t.boundingBox), K.applyMatrix4(e.matrixWorld), this.union(K));
            const i = e.children;
            for (let e = 0, t = i.length; e < t; e++) this.expandByObject(i[e]);
            return this
        }
        containsPoint(e) {
            return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
        }
        containsBox(e) {
            return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
        }
        getParameter(e, t) {
            return void 0 === t && (console.warn("THREE.Box3: .getParameter() target is now required"), t = new Y), t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
        }
        intersectsBox(e) {
            return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
        }
        intersectsSphere(e) {
            return this.clampPoint(e.center, J), J.distanceToSquared(e.center) <= e.radius * e.radius
        }
        intersectsPlane(e) {
            let t, i;
            return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant
        }
        intersectsTriangle(e) {
            if (this.isEmpty()) return !1;
            this.getCenter(ae), se.subVectors(this.max, ae), $.subVectors(e.a, ae), ee.subVectors(e.b, ae), te.subVectors(e.c, ae), ie.subVectors(ee, $), ne.subVectors(te, ee), re.subVectors($, te);
            let t = [0, -ie.z, ie.y, 0, -ne.z, ne.y, 0, -re.z, re.y, ie.z, 0, -ie.x, ne.z, 0, -ne.x, re.z, 0, -re.x, -ie.y, ie.x, 0, -ne.y, ne.x, 0, -re.y, re.x, 0];
            return !!ce(t, $, ee, te, se) && (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!ce(t, $, ee, te, se) && (oe.crossVectors(ie, ne), t = [oe.x, oe.y, oe.z], ce(t, $, ee, te, se)))
        }
        clampPoint(e, t) {
            return void 0 === t && (console.warn("THREE.Box3: .clampPoint() target is now required"), t = new Y), t.copy(e).clamp(this.min, this.max)
        }
        distanceToPoint(e) {
            return J.copy(e).clamp(this.min, this.max).sub(e).length()
        }
        getBoundingSphere(e) {
            return void 0 === e && console.error("THREE.Box3: .getBoundingSphere() target is now required"), this.getCenter(e.center), e.radius = .5 * this.getSize(J).length(), e
        }
        intersect(e) {
            return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
        }
        union(e) {
            return this.min.min(e.min), this.max.max(e.max), this
        }
        applyMatrix4(e) {
            return this.isEmpty() || (Z[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Z[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Z[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Z[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Z[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Z[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Z[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Z[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Z)), this
        }
        translate(e) {
            return this.min.add(e), this.max.add(e), this
        }
        equals(e) {
            return e.min.equals(this.min) && e.max.equals(this.max)
        }
    }
    q.prototype.isBox3 = !0;
    const Z = [new Y, new Y, new Y, new Y, new Y, new Y, new Y, new Y],
        J = new Y,
        K = new q,
        $ = new Y,
        ee = new Y,
        te = new Y,
        ie = new Y,
        ne = new Y,
        re = new Y,
        ae = new Y,
        se = new Y,
        oe = new Y,
        le = new Y;

    function ce(e, t, i, n, r) {
        for (let a = 0, s = e.length - 3; a <= s; a += 3) {
            le.fromArray(e, a);
            const s = r.x * Math.abs(le.x) + r.y * Math.abs(le.y) + r.z * Math.abs(le.z),
                o = t.dot(le),
                l = i.dot(le),
                c = n.dot(le);
            if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > s) return !1
        }
        return !0
    }
    const de = new q,
        he = new Y,
        ue = new Y,
        fe = new Y;
    class pe {
        constructor(e = new Y, t = -1) {
            this.center = e, this.radius = t
        }
        set(e, t) {
            return this.center.copy(e), this.radius = t, this
        }
        setFromPoints(e, t) {
            const i = this.center;
            void 0 !== t ? i.copy(t) : de.setFromPoints(e).getCenter(i);
            let n = 0;
            for (let t = 0, r = e.length; t < r; t++) n = Math.max(n, i.distanceToSquared(e[t]));
            return this.radius = Math.sqrt(n), this
        }
        copy(e) {
            return this.center.copy(e.center), this.radius = e.radius, this
        }
        isEmpty() {
            return this.radius < 0
        }
        makeEmpty() {
            return this.center.set(0, 0, 0), this.radius = -1, this
        }
        containsPoint(e) {
            return e.distanceToSquared(this.center) <= this.radius * this.radius
        }
        distanceToPoint(e) {
            return e.distanceTo(this.center) - this.radius
        }
        intersectsSphere(e) {
            const t = this.radius + e.radius;
            return e.center.distanceToSquared(this.center) <= t * t
        }
        intersectsBox(e) {
            return e.intersectsSphere(this)
        }
        intersectsPlane(e) {
            return Math.abs(e.distanceToPoint(this.center)) <= this.radius
        }
        clampPoint(e, t) {
            const i = this.center.distanceToSquared(e);
            return void 0 === t && (console.warn("THREE.Sphere: .clampPoint() target is now required"), t = new Y), t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
        }
        getBoundingBox(e) {
            return void 0 === e && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), e = new q), this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e)
        }
        applyMatrix4(e) {
            return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
        }
        translate(e) {
            return this.center.add(e), this
        }
        expandByPoint(e) {
            fe.subVectors(e, this.center);
            const t = fe.lengthSq();
            if (t > this.radius * this.radius) {
                const e = Math.sqrt(t),
                    i = .5 * (e - this.radius);
                this.center.add(fe.multiplyScalar(i / e)), this.radius += i
            }
            return this
        }
        union(e) {
            return ue.subVectors(e.center, this.center).normalize().multiplyScalar(e.radius), this.expandByPoint(he.copy(e.center).add(ue)), this.expandByPoint(he.copy(e.center).sub(ue)), this
        }
        equals(e) {
            return e.center.equals(this.center) && e.radius === this.radius
        }
        clone() {
            return (new this.constructor).copy(this)
        }
    }
    const me = new Y,
        ge = new Y,
        xe = new Y,
        _e = new Y,
        ve = new Y,
        ye = new Y,
        Me = new Y;
    class be {
        constructor(e = new Y, t = new Y(0, 0, -1)) {
            this.origin = e, this.direction = t
        }
        set(e, t) {
            return this.origin.copy(e), this.direction.copy(t), this
        }
        copy(e) {
            return this.origin.copy(e.origin), this.direction.copy(e.direction), this
        }
        at(e, t) {
            return void 0 === t && (console.warn("THREE.Ray: .at() target is now required"), t = new Y), t.copy(this.direction).multiplyScalar(e).add(this.origin)
        }
        lookAt(e) {
            return this.direction.copy(e).sub(this.origin).normalize(), this
        }
        recast(e) {
            return this.origin.copy(this.at(e, me)), this
        }
        closestPointToPoint(e, t) {
            void 0 === t && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), t = new Y), t.subVectors(e, this.origin);
            const i = t.dot(this.direction);
            return i < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(i).add(this.origin)
        }
        distanceToPoint(e) {
            return Math.sqrt(this.distanceSqToPoint(e))
        }
        distanceSqToPoint(e) {
            const t = me.subVectors(e, this.origin).dot(this.direction);
            return t < 0 ? this.origin.distanceToSquared(e) : (me.copy(this.direction).multiplyScalar(t).add(this.origin), me.distanceToSquared(e))
        }
        distanceSqToSegment(e, t, i, n) {
            ge.copy(e).add(t).multiplyScalar(.5), xe.copy(t).sub(e).normalize(), _e.copy(this.origin).sub(ge);
            const r = .5 * e.distanceTo(t),
                a = -this.direction.dot(xe),
                s = _e.dot(this.direction),
                o = -_e.dot(xe),
                l = _e.lengthSq(),
                c = Math.abs(1 - a * a);
            let d, h, u, f;
            if (c > 0)
                if (d = a * o - s, h = a * s - o, f = r * c, d >= 0)
                    if (h >= -f)
                        if (h <= f) {
                            const e = 1 / c;
                            d *= e, h *= e, u = d * (d + a * h + 2 * s) + h * (a * d + h + 2 * o) + l
                        } else h = r, d = Math.max(0, -(a * h + s)), u = -d * d + h * (h + 2 * o) + l;
            else h = -r, d = Math.max(0, -(a * h + s)), u = -d * d + h * (h + 2 * o) + l;
            else h <= -f ? (d = Math.max(0, -(-a * r + s)), h = d > 0 ? -r : Math.min(Math.max(-r, -o), r), u = -d * d + h * (h + 2 * o) + l) : h <= f ? (d = 0, h = Math.min(Math.max(-r, -o), r), u = h * (h + 2 * o) + l) : (d = Math.max(0, -(a * r + s)), h = d > 0 ? r : Math.min(Math.max(-r, -o), r), u = -d * d + h * (h + 2 * o) + l);
            else h = a > 0 ? -r : r, d = Math.max(0, -(a * h + s)), u = -d * d + h * (h + 2 * o) + l;
            return i && i.copy(this.direction).multiplyScalar(d).add(this.origin), n && n.copy(xe).multiplyScalar(h).add(ge), u
        }
        intersectSphere(e, t) {
            me.subVectors(e.center, this.origin);
            const i = me.dot(this.direction),
                n = me.dot(me) - i * i,
                r = e.radius * e.radius;
            if (n > r) return null;
            const a = Math.sqrt(r - n),
                s = i - a,
                o = i + a;
            return s < 0 && o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t)
        }
        intersectsSphere(e) {
            return this.distanceSqToPoint(e.center) <= e.radius * e.radius
        }
        distanceToPlane(e) {
            const t = e.normal.dot(this.direction);
            if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
            const i = -(this.origin.dot(e.normal) + e.constant) / t;
            return i >= 0 ? i : null
        }
        intersectPlane(e, t) {
            const i = this.distanceToPlane(e);
            return null === i ? null : this.at(i, t)
        }
        intersectsPlane(e) {
            const t = e.distanceToPoint(this.origin);
            if (0 === t) return !0;
            return e.normal.dot(this.direction) * t < 0
        }
        intersectBox(e, t) {
            let i, n, r, a, s, o;
            const l = 1 / this.direction.x,
                c = 1 / this.direction.y,
                d = 1 / this.direction.z,
                h = this.origin;
            return l >= 0 ? (i = (e.min.x - h.x) * l, n = (e.max.x - h.x) * l) : (i = (e.max.x - h.x) * l, n = (e.min.x - h.x) * l), c >= 0 ? (r = (e.min.y - h.y) * c, a = (e.max.y - h.y) * c) : (r = (e.max.y - h.y) * c, a = (e.min.y - h.y) * c), i > a || r > n ? null : ((r > i || i != i) && (i = r), (a < n || n != n) && (n = a), d >= 0 ? (s = (e.min.z - h.z) * d, o = (e.max.z - h.z) * d) : (s = (e.max.z - h.z) * d, o = (e.min.z - h.z) * d), i > o || s > n ? null : ((s > i || i != i) && (i = s), (o < n || n != n) && (n = o), n < 0 ? null : this.at(i >= 0 ? i : n, t)))
        }
        intersectsBox(e) {
            return null !== this.intersectBox(e, me)
        }
        intersectTriangle(e, t, i, n, r) {
            ve.subVectors(t, e), ye.subVectors(i, e), Me.crossVectors(ve, ye);
            let a, s = this.direction.dot(Me);
            if (s > 0) {
                if (n) return null;
                a = 1
            } else {
                if (!(s < 0)) return null;
                a = -1, s = -s
            }
            _e.subVectors(this.origin, e);
            const o = a * this.direction.dot(ye.crossVectors(_e, ye));
            if (o < 0) return null;
            const l = a * this.direction.dot(ve.cross(_e));
            if (l < 0) return null;
            if (o + l > s) return null;
            const c = -a * _e.dot(Me);
            return c < 0 ? null : this.at(c / s, r)
        }
        applyMatrix4(e) {
            return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
        }
        equals(e) {
            return e.origin.equals(this.origin) && e.direction.equals(this.direction)
        }
        clone() {
            return (new this.constructor).copy(this)
        }
    }
    class Ae {
        constructor() {
            this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
        }
        set(e, t, i, n, r, a, s, o, l, c, d, h, u, f, p, m) {
            const g = this.elements;
            return g[0] = e, g[4] = t, g[8] = i, g[12] = n, g[1] = r, g[5] = a, g[9] = s, g[13] = o, g[2] = l, g[6] = c, g[10] = d, g[14] = h, g[3] = u, g[7] = f, g[11] = p, g[15] = m, this
        }
        identity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
        }
        clone() {
            return (new Ae).fromArray(this.elements)
        }
        copy(e) {
            const t = this.elements,
                i = e.elements;
            return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15], this
        }
        copyPosition(e) {
            const t = this.elements,
                i = e.elements;
            return t[12] = i[12], t[13] = i[13], t[14] = i[14], this
        }
        setFromMatrix3(e) {
            const t = e.elements;
            return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this
        }
        extractBasis(e, t, i) {
            return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this
        }
        makeBasis(e, t, i) {
            return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1), this
        }
        extractRotation(e) {
            const t = this.elements,
                i = e.elements,
                n = 1 / we.setFromMatrixColumn(e, 0).length(),
                r = 1 / we.setFromMatrixColumn(e, 1).length(),
                a = 1 / we.setFromMatrixColumn(e, 2).length();
            return t[0] = i[0] * n, t[1] = i[1] * n, t[2] = i[2] * n, t[3] = 0, t[4] = i[4] * r, t[5] = i[5] * r, t[6] = i[6] * r, t[7] = 0, t[8] = i[8] * a, t[9] = i[9] * a, t[10] = i[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
        }
        makeRotationFromEuler(e) {
            e && e.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            const t = this.elements,
                i = e.x,
                n = e.y,
                r = e.z,
                a = Math.cos(i),
                s = Math.sin(i),
                o = Math.cos(n),
                l = Math.sin(n),
                c = Math.cos(r),
                d = Math.sin(r);
            if ("XYZ" === e.order) {
                const e = a * c,
                    i = a * d,
                    n = s * c,
                    r = s * d;
                t[0] = o * c, t[4] = -o * d, t[8] = l, t[1] = i + n * l, t[5] = e - r * l, t[9] = -s * o, t[2] = r - e * l, t[6] = n + i * l, t[10] = a * o
            } else if ("YXZ" === e.order) {
                const e = o * c,
                    i = o * d,
                    n = l * c,
                    r = l * d;
                t[0] = e + r * s, t[4] = n * s - i, t[8] = a * l, t[1] = a * d, t[5] = a * c, t[9] = -s, t[2] = i * s - n, t[6] = r + e * s, t[10] = a * o
            } else if ("ZXY" === e.order) {
                const e = o * c,
                    i = o * d,
                    n = l * c,
                    r = l * d;
                t[0] = e - r * s, t[4] = -a * d, t[8] = n + i * s, t[1] = i + n * s, t[5] = a * c, t[9] = r - e * s, t[2] = -a * l, t[6] = s, t[10] = a * o
            } else if ("ZYX" === e.order) {
                const e = a * c,
                    i = a * d,
                    n = s * c,
                    r = s * d;
                t[0] = o * c, t[4] = n * l - i, t[8] = e * l + r, t[1] = o * d, t[5] = r * l + e, t[9] = i * l - n, t[2] = -l, t[6] = s * o, t[10] = a * o
            } else if ("YZX" === e.order) {
                const e = a * o,
                    i = a * l,
                    n = s * o,
                    r = s * l;
                t[0] = o * c, t[4] = r - e * d, t[8] = n * d + i, t[1] = d, t[5] = a * c, t[9] = -s * c, t[2] = -l * c, t[6] = i * d + n, t[10] = e - r * d
            } else if ("XZY" === e.order) {
                const e = a * o,
                    i = a * l,
                    n = s * o,
                    r = s * l;
                t[0] = o * c, t[4] = -d, t[8] = l * c, t[1] = e * d + r, t[5] = a * c, t[9] = i * d - n, t[2] = n * d - i, t[6] = s * c, t[10] = r * d + e
            }
            return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
        }
        makeRotationFromQuaternion(e) {
            return this.compose(Te, e, Le)
        }
        lookAt(e, t, i) {
            const n = this.elements;
            return Fe.subVectors(e, t), 0 === Fe.lengthSq() && (Fe.z = 1), Fe.normalize(), Ee.crossVectors(i, Fe), 0 === Ee.lengthSq() && (1 === Math.abs(i.z) ? Fe.x += 1e-4 : Fe.z += 1e-4, Fe.normalize(), Ee.crossVectors(i, Fe)), Ee.normalize(), Pe.crossVectors(Fe, Ee), n[0] = Ee.x, n[4] = Pe.x, n[8] = Fe.x, n[1] = Ee.y, n[5] = Pe.y, n[9] = Fe.y, n[2] = Ee.z, n[6] = Pe.z, n[10] = Fe.z, this
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
        }
        premultiply(e) {
            return this.multiplyMatrices(e, this)
        }
        multiplyMatrices(e, t) {
            const i = e.elements,
                n = t.elements,
                r = this.elements,
                a = i[0],
                s = i[4],
                o = i[8],
                l = i[12],
                c = i[1],
                d = i[5],
                h = i[9],
                u = i[13],
                f = i[2],
                p = i[6],
                m = i[10],
                g = i[14],
                x = i[3],
                _ = i[7],
                v = i[11],
                y = i[15],
                M = n[0],
                b = n[4],
                A = n[8],
                w = n[12],
                S = n[1],
                T = n[5],
                L = n[9],
                E = n[13],
                P = n[2],
                F = n[6],
                N = n[10],
                C = n[14],
                R = n[3],
                D = n[7],
                I = n[11],
                U = n[15];
            return r[0] = a * M + s * S + o * P + l * R, r[4] = a * b + s * T + o * F + l * D, r[8] = a * A + s * L + o * N + l * I, r[12] = a * w + s * E + o * C + l * U, r[1] = c * M + d * S + h * P + u * R, r[5] = c * b + d * T + h * F + u * D, r[9] = c * A + d * L + h * N + u * I, r[13] = c * w + d * E + h * C + u * U, r[2] = f * M + p * S + m * P + g * R, r[6] = f * b + p * T + m * F + g * D, r[10] = f * A + p * L + m * N + g * I, r[14] = f * w + p * E + m * C + g * U, r[3] = x * M + _ * S + v * P + y * R, r[7] = x * b + _ * T + v * F + y * D, r[11] = x * A + _ * L + v * N + y * I, r[15] = x * w + _ * E + v * C + y * U, this
        }
        multiplyScalar(e) {
            const t = this.elements;
            return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
        }
        determinant() {
            const e = this.elements,
                t = e[0],
                i = e[4],
                n = e[8],
                r = e[12],
                a = e[1],
                s = e[5],
                o = e[9],
                l = e[13],
                c = e[2],
                d = e[6],
                h = e[10],
                u = e[14];
            return e[3] * (+r * o * d - n * l * d - r * s * h + i * l * h + n * s * u - i * o * u) + e[7] * (+t * o * u - t * l * h + r * a * h - n * a * u + n * l * c - r * o * c) + e[11] * (+t * l * d - t * s * u - r * a * d + i * a * u + r * s * c - i * l * c) + e[15] * (-n * s * c - t * o * d + t * s * h + n * a * d - i * a * h + i * o * c)
        }
        transpose() {
            const e = this.elements;
            let t;
            return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
        }
        setPosition(e, t, i) {
            const n = this.elements;
            return e.isVector3 ? (n[12] = e.x, n[13] = e.y, n[14] = e.z) : (n[12] = e, n[13] = t, n[14] = i), this
        }
        invert() {
            const e = this.elements,
                t = e[0],
                i = e[1],
                n = e[2],
                r = e[3],
                a = e[4],
                s = e[5],
                o = e[6],
                l = e[7],
                c = e[8],
                d = e[9],
                h = e[10],
                u = e[11],
                f = e[12],
                p = e[13],
                m = e[14],
                g = e[15],
                x = d * m * l - p * h * l + p * o * u - s * m * u - d * o * g + s * h * g,
                _ = f * h * l - c * m * l - f * o * u + a * m * u + c * o * g - a * h * g,
                v = c * p * l - f * d * l + f * s * u - a * p * u - c * s * g + a * d * g,
                y = f * d * o - c * p * o - f * s * h + a * p * h + c * s * m - a * d * m,
                M = t * x + i * _ + n * v + r * y;
            if (0 === M) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            const b = 1 / M;
            return e[0] = x * b, e[1] = (p * h * r - d * m * r - p * n * u + i * m * u + d * n * g - i * h * g) * b, e[2] = (s * m * r - p * o * r + p * n * l - i * m * l - s * n * g + i * o * g) * b, e[3] = (d * o * r - s * h * r - d * n * l + i * h * l + s * n * u - i * o * u) * b, e[4] = _ * b, e[5] = (c * m * r - f * h * r + f * n * u - t * m * u - c * n * g + t * h * g) * b, e[6] = (f * o * r - a * m * r - f * n * l + t * m * l + a * n * g - t * o * g) * b, e[7] = (a * h * r - c * o * r + c * n * l - t * h * l - a * n * u + t * o * u) * b, e[8] = v * b, e[9] = (f * d * r - c * p * r - f * i * u + t * p * u + c * i * g - t * d * g) * b, e[10] = (a * p * r - f * s * r + f * i * l - t * p * l - a * i * g + t * s * g) * b, e[11] = (c * s * r - a * d * r - c * i * l + t * d * l + a * i * u - t * s * u) * b, e[12] = y * b, e[13] = (c * p * n - f * d * n + f * i * h - t * p * h - c * i * m + t * d * m) * b, e[14] = (f * s * n - a * p * n - f * i * o + t * p * o + a * i * m - t * s * m) * b, e[15] = (a * d * n - c * s * n + c * i * o - t * d * o - a * i * h + t * s * h) * b, this
        }
        scale(e) {
            const t = this.elements,
                i = e.x,
                n = e.y,
                r = e.z;
            return t[0] *= i, t[4] *= n, t[8] *= r, t[1] *= i, t[5] *= n, t[9] *= r, t[2] *= i, t[6] *= n, t[10] *= r, t[3] *= i, t[7] *= n, t[11] *= r, this
        }
        getMaxScaleOnAxis() {
            const e = this.elements,
                t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
                n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
            return Math.sqrt(Math.max(t, i, n))
        }
        makeTranslation(e, t, i) {
            return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
        }
        makeRotationX(e) {
            const t = Math.cos(e),
                i = Math.sin(e);
            return this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1), this
        }
        makeRotationY(e) {
            const t = Math.cos(e),
                i = Math.sin(e);
            return this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1), this
        }
        makeRotationZ(e) {
            const t = Math.cos(e),
                i = Math.sin(e);
            return this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
        }
        makeRotationAxis(e, t) {
            const i = Math.cos(t),
                n = Math.sin(t),
                r = 1 - i,
                a = e.x,
                s = e.y,
                o = e.z,
                l = r * a,
                c = r * s;
            return this.set(l * a + i, l * s - n * o, l * o + n * s, 0, l * s + n * o, c * s + i, c * o - n * a, 0, l * o - n * s, c * o + n * a, r * o * o + i, 0, 0, 0, 0, 1), this
        }
        makeScale(e, t, i) {
            return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
        }
        makeShear(e, t, i) {
            return this.set(1, t, i, 0, e, 1, i, 0, e, t, 1, 0, 0, 0, 0, 1), this
        }
        compose(e, t, i) {
            const n = this.elements,
                r = t._x,
                a = t._y,
                s = t._z,
                o = t._w,
                l = r + r,
                c = a + a,
                d = s + s,
                h = r * l,
                u = r * c,
                f = r * d,
                p = a * c,
                m = a * d,
                g = s * d,
                x = o * l,
                _ = o * c,
                v = o * d,
                y = i.x,
                M = i.y,
                b = i.z;
            return n[0] = (1 - (p + g)) * y, n[1] = (u + v) * y, n[2] = (f - _) * y, n[3] = 0, n[4] = (u - v) * M, n[5] = (1 - (h + g)) * M, n[6] = (m + x) * M, n[7] = 0, n[8] = (f + _) * b, n[9] = (m - x) * b, n[10] = (1 - (h + p)) * b, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, this
        }
        decompose(e, t, i) {
            const n = this.elements;
            let r = we.set(n[0], n[1], n[2]).length();
            const a = we.set(n[4], n[5], n[6]).length(),
                s = we.set(n[8], n[9], n[10]).length();
            this.determinant() < 0 && (r = -r), e.x = n[12], e.y = n[13], e.z = n[14], Se.copy(this);
            const o = 1 / r,
                l = 1 / a,
                c = 1 / s;
            return Se.elements[0] *= o, Se.elements[1] *= o, Se.elements[2] *= o, Se.elements[4] *= l, Se.elements[5] *= l, Se.elements[6] *= l, Se.elements[8] *= c, Se.elements[9] *= c, Se.elements[10] *= c, t.setFromRotationMatrix(Se), i.x = r, i.y = a, i.z = s, this
        }
        makePerspective(e, t, i, n, r, a) {
            void 0 === a && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
            const s = this.elements,
                o = 2 * r / (t - e),
                l = 2 * r / (i - n),
                c = (t + e) / (t - e),
                d = (i + n) / (i - n),
                h = -(a + r) / (a - r),
                u = -2 * a * r / (a - r);
            return s[0] = o, s[4] = 0, s[8] = c, s[12] = 0, s[1] = 0, s[5] = l, s[9] = d, s[13] = 0, s[2] = 0, s[6] = 0, s[10] = h, s[14] = u, s[3] = 0, s[7] = 0, s[11] = -1, s[15] = 0, this
        }
        makeOrthographic(e, t, i, n, r, a) {
            const s = this.elements,
                o = 1 / (t - e),
                l = 1 / (i - n),
                c = 1 / (a - r),
                d = (t + e) * o,
                h = (i + n) * l,
                u = (a + r) * c;
            return s[0] = 2 * o, s[4] = 0, s[8] = 0, s[12] = -d, s[1] = 0, s[5] = 2 * l, s[9] = 0, s[13] = -h, s[2] = 0, s[6] = 0, s[10] = -2 * c, s[14] = -u, s[3] = 0, s[7] = 0, s[11] = 0, s[15] = 1, this
        }
        equals(e) {
            const t = this.elements,
                i = e.elements;
            for (let e = 0; e < 16; e++)
                if (t[e] !== i[e]) return !1;
            return !0
        }
        fromArray(e, t = 0) {
            for (let i = 0; i < 16; i++) this.elements[i] = e[i + t];
            return this
        }
        toArray(e = [], t = 0) {
            const i = this.elements;
            return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e
        }
    }
    Ae.prototype.isMatrix4 = !0;
    const we = new Y,
        Se = new Ae,
        Te = new Y(0, 0, 0),
        Le = new Y(1, 1, 1),
        Ee = new Y,
        Pe = new Y,
        Fe = new Y,
        Ne = new Ae,
        Ce = new X;
    class Re {
        constructor(e = 0, t = 0, i = 0, n = Re.DefaultOrder) {
            this._x = e, this._y = t, this._z = i, this._order = n
        }
        get x() {
            return this._x
        }
        set x(e) {
            this._x = e, this._onChangeCallback()
        }
        get y() {
            return this._y
        }
        set y(e) {
            this._y = e, this._onChangeCallback()
        }
        get z() {
            return this._z
        }
        set z(e) {
            this._z = e, this._onChangeCallback()
        }
        get order() {
            return this._order
        }
        set order(e) {
            this._order = e, this._onChangeCallback()
        }
        set(e, t, i, n) {
            return this._x = e, this._y = t, this._z = i, this._order = n || this._order, this._onChangeCallback(), this
        }
        clone() {
            return new this.constructor(this._x, this._y, this._z, this._order)
        }
        copy(e) {
            return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this
        }
        setFromRotationMatrix(e, t, i) {
            const n = e.elements,
                r = n[0],
                a = n[4],
                s = n[8],
                o = n[1],
                l = n[5],
                c = n[9],
                d = n[2],
                h = n[6],
                u = n[10];
            switch (t = t || this._order) {
                case "XYZ":
                    this._y = Math.asin(R(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-c, u), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(h, l), this._z = 0);
                    break;
                case "YXZ":
                    this._x = Math.asin(-R(c, -1, 1)), Math.abs(c) < .9999999 ? (this._y = Math.atan2(s, u), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-d, r), this._z = 0);
                    break;
                case "ZXY":
                    this._x = Math.asin(R(h, -1, 1)), Math.abs(h) < .9999999 ? (this._y = Math.atan2(-d, u), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(o, r));
                    break;
                case "ZYX":
                    this._y = Math.asin(-R(d, -1, 1)), Math.abs(d) < .9999999 ? (this._x = Math.atan2(h, u), this._z = Math.atan2(o, r)) : (this._x = 0, this._z = Math.atan2(-a, l));
                    break;
                case "YZX":
                    this._z = Math.asin(R(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-d, r)) : (this._x = 0, this._y = Math.atan2(s, u));
                    break;
                case "XZY":
                    this._z = Math.asin(-R(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(h, l), this._y = Math.atan2(s, r)) : (this._x = Math.atan2(-c, u), this._y = 0);
                    break;
                default:
                    console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
            }
            return this._order = t, !1 !== i && this._onChangeCallback(), this
        }
        setFromQuaternion(e, t, i) {
            return Ne.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ne, t, i)
        }
        setFromVector3(e, t) {
            return this.set(e.x, e.y, e.z, t || this._order)
        }
        reorder(e) {
            return Ce.setFromEuler(this), this.setFromQuaternion(Ce, e)
        }
        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
        }
        fromArray(e) {
            return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this
        }
        toArray(e = [], t = 0) {
            return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
        }
        toVector3(e) {
            return e ? e.set(this._x, this._y, this._z) : new Y(this._x, this._y, this._z)
        }
        _onChange(e) {
            return this._onChangeCallback = e, this
        }
        _onChangeCallback() {}
    }
    Re.prototype.isEuler = !0, Re.DefaultOrder = "XYZ", Re.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
    class De {
        constructor() {
            this.mask = 1
        }
        set(e) {
            this.mask = 1 << e | 0
        }
        enable(e) {
            this.mask |= 1 << e | 0
        }
        enableAll() {
            this.mask = -1
        }
        toggle(e) {
            this.mask ^= 1 << e | 0
        }
        disable(e) {
            this.mask &= ~(1 << e | 0)
        }
        disableAll() {
            this.mask = 0
        }
        test(e) {
            return 0 != (this.mask & e.mask)
        }
    }
    let Ie = 0;
    const Ue = new Y,
        ze = new X,
        Oe = new Ae,
        Be = new Y,
        Ge = new Y,
        He = new Y,
        ke = new X,
        Ve = new Y(1, 0, 0),
        We = new Y(0, 1, 0),
        Xe = new Y(0, 0, 1),
        Ye = {
            type: "added"
        },
        Qe = {
            type: "removed"
        };
    class je extends E {
        constructor() {
            super(), Object.defineProperty(this, "id", {
                value: Ie++
            }), this.uuid = C(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = je.DefaultUp.clone();
            const e = new Y,
                t = new Re,
                i = new X,
                n = new Y(1, 1, 1);
            t._onChange((function() {
                i.setFromEuler(t, !1)
            })), i._onChange((function() {
                t.setFromQuaternion(i, void 0, !1)
            })), Object.defineProperties(this, {
                position: {
                    configurable: !0,
                    enumerable: !0,
                    value: e
                },
                rotation: {
                    configurable: !0,
                    enumerable: !0,
                    value: t
                },
                quaternion: {
                    configurable: !0,
                    enumerable: !0,
                    value: i
                },
                scale: {
                    configurable: !0,
                    enumerable: !0,
                    value: n
                },
                modelViewMatrix: {
                    value: new Ae
                },
                normalMatrix: {
                    value: new O
                }
            }), this.matrix = new Ae, this.matrixWorld = new Ae, this.matrixAutoUpdate = je.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new De, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {}
        }
        onBeforeRender() {}
        onAfterRender() {}
        applyMatrix4(e) {
            this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale)
        }
        applyQuaternion(e) {
            return this.quaternion.premultiply(e), this
        }
        setRotationFromAxisAngle(e, t) {
            this.quaternion.setFromAxisAngle(e, t)
        }
        setRotationFromEuler(e) {
            this.quaternion.setFromEuler(e, !0)
        }
        setRotationFromMatrix(e) {
            this.quaternion.setFromRotationMatrix(e)
        }
        setRotationFromQuaternion(e) {
            this.quaternion.copy(e)
        }
        rotateOnAxis(e, t) {
            return ze.setFromAxisAngle(e, t), this.quaternion.multiply(ze), this
        }
        rotateOnWorldAxis(e, t) {
            return ze.setFromAxisAngle(e, t), this.quaternion.premultiply(ze), this
        }
        rotateX(e) {
            return this.rotateOnAxis(Ve, e)
        }
        rotateY(e) {
            return this.rotateOnAxis(We, e)
        }
        rotateZ(e) {
            return this.rotateOnAxis(Xe, e)
        }
        translateOnAxis(e, t) {
            return Ue.copy(e).applyQuaternion(this.quaternion), this.position.add(Ue.multiplyScalar(t)), this
        }
        translateX(e) {
            return this.translateOnAxis(Ve, e)
        }
        translateY(e) {
            return this.translateOnAxis(We, e)
        }
        translateZ(e) {
            return this.translateOnAxis(Xe, e)
        }
        localToWorld(e) {
            return e.applyMatrix4(this.matrixWorld)
        }
        worldToLocal(e) {
            return e.applyMatrix4(Oe.copy(this.matrixWorld).invert())
        }
        lookAt(e, t, i) {
            e.isVector3 ? Be.copy(e) : Be.set(e, t, i);
            const n = this.parent;
            this.updateWorldMatrix(!0, !1), Ge.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Oe.lookAt(Ge, Be, this.up) : Oe.lookAt(Be, Ge, this.up), this.quaternion.setFromRotationMatrix(Oe), n && (Oe.extractRotation(n.matrixWorld), ze.setFromRotationMatrix(Oe), this.quaternion.premultiply(ze.invert()))
        }
        add(e) {
            if (arguments.length > 1) {
                for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
                return this
            }
            return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(Ye)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
        }
        remove(e) {
            if (arguments.length > 1) {
                for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                return this
            }
            const t = this.children.indexOf(e);
            return -1 !== t && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Qe)), this
        }
        clear() {
            for (let e = 0; e < this.children.length; e++) {
                const t = this.children[e];
                t.parent = null, t.dispatchEvent(Qe)
            }
            return this.children.length = 0, this
        }
        attach(e) {
            return this.updateWorldMatrix(!0, !1), Oe.copy(this.matrixWorld).invert(), null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), Oe.multiply(e.parent.matrixWorld)), e.applyMatrix4(Oe), this.add(e), e.updateWorldMatrix(!1, !0), this
        }
        getObjectById(e) {
            return this.getObjectByProperty("id", e)
        }
        getObjectByName(e) {
            return this.getObjectByProperty("name", e)
        }
        getObjectByProperty(e, t) {
            if (this[e] === t) return this;
            for (let i = 0, n = this.children.length; i < n; i++) {
                const n = this.children[i].getObjectByProperty(e, t);
                if (void 0 !== n) return n
            }
        }
        getWorldPosition(e) {
            return void 0 === e && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), e = new Y), this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
        }
        getWorldQuaternion(e) {
            return void 0 === e && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), e = new X), this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ge, e, He), e
        }
        getWorldScale(e) {
            return void 0 === e && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), e = new Y), this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ge, ke, e), e
        }
        getWorldDirection(e) {
            void 0 === e && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), e = new Y), this.updateWorldMatrix(!0, !1);
            const t = this.matrixWorld.elements;
            return e.set(t[8], t[9], t[10]).normalize()
        }
        raycast() {}
        traverse(e) {
            e(this);
            const t = this.children;
            for (let i = 0, n = t.length; i < n; i++) t[i].traverse(e)
        }
        traverseVisible(e) {
            if (!1 === this.visible) return;
            e(this);
            const t = this.children;
            for (let i = 0, n = t.length; i < n; i++) t[i].traverseVisible(e)
        }
        traverseAncestors(e) {
            const t = this.parent;
            null !== t && (e(t), t.traverseAncestors(e))
        }
        updateMatrix() {
            this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
        }
        updateMatrixWorld(e) {
            this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
            const t = this.children;
            for (let i = 0, n = t.length; i < n; i++) t[i].updateMatrixWorld(e)
        }
        updateWorldMatrix(e, t) {
            const i = this.parent;
            if (!0 === e && null !== i && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === t) {
                const e = this.children;
                for (let t = 0, i = e.length; t < i; t++) e[t].updateWorldMatrix(!1, !0)
            }
        }
        toJSON(e) {
            const t = void 0 === e || "string" == typeof e,
                i = {};
            t && (e = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {}
            }, i.metadata = {
                version: 4.5,
                type: "Object",
                generator: "Object3D.toJSON"
            });
            const n = {};

            function r(t, i) {
                return void 0 === t[i.uuid] && (t[i.uuid] = i.toJSON(e)), i.uuid
            }
            if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), !0 === this.castShadow && (n.castShadow = !0), !0 === this.receiveShadow && (n.receiveShadow = !0), !1 === this.visible && (n.visible = !1), !1 === this.frustumCulled && (n.frustumCulled = !1), 0 !== this.renderOrder && (n.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), n.layers = this.layers.mask, n.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (n.matrixAutoUpdate = !1), this.isInstancedMesh && (n.type = "InstancedMesh", n.count = this.count, n.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (n.instanceColor = this.instanceColor.toJSON())), this.isMesh || this.isLine || this.isPoints) {
                n.geometry = r(e.geometries, this.geometry);
                const t = this.geometry.parameters;
                if (void 0 !== t && void 0 !== t.shapes) {
                    const i = t.shapes;
                    if (Array.isArray(i))
                        for (let t = 0, n = i.length; t < n; t++) {
                            const n = i[t];
                            r(e.shapes, n)
                        } else r(e.shapes, i)
                }
            }
            if (this.isSkinnedMesh && (n.bindMode = this.bindMode, n.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (r(e.skeletons, this.skeleton), n.skeleton = this.skeleton.uuid)), void 0 !== this.material)
                if (Array.isArray(this.material)) {
                    const t = [];
                    for (let i = 0, n = this.material.length; i < n; i++) t.push(r(e.materials, this.material[i]));
                    n.material = t
                } else n.material = r(e.materials, this.material);
            if (this.children.length > 0) {
                n.children = [];
                for (let t = 0; t < this.children.length; t++) n.children.push(this.children[t].toJSON(e).object)
            }
            if (this.animations.length > 0) {
                n.animations = [];
                for (let t = 0; t < this.animations.length; t++) {
                    const i = this.animations[t];
                    n.animations.push(r(e.animations, i))
                }
            }
            if (t) {
                const t = a(e.geometries),
                    n = a(e.materials),
                    r = a(e.textures),
                    s = a(e.images),
                    o = a(e.shapes),
                    l = a(e.skeletons),
                    c = a(e.animations);
                t.length > 0 && (i.geometries = t), n.length > 0 && (i.materials = n), r.length > 0 && (i.textures = r), s.length > 0 && (i.images = s), o.length > 0 && (i.shapes = o), l.length > 0 && (i.skeletons = l), c.length > 0 && (i.animations = c)
            }
            return i.object = n, i;

            function a(e) {
                const t = [];
                for (const i in e) {
                    const n = e[i];
                    delete n.metadata, t.push(n)
                }
                return t
            }
        }
        clone(e) {
            return (new this.constructor).copy(this, e)
        }
        copy(e, t = !0) {
            if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t)
                for (let t = 0; t < e.children.length; t++) {
                    const i = e.children[t];
                    this.add(i.clone())
                }
            return this
        }
    }
    je.DefaultUp = new Y(0, 1, 0), je.DefaultMatrixAutoUpdate = !0, je.prototype.isObject3D = !0;
    const qe = new Y,
        Ze = new Y,
        Je = new O;
    class Ke {
        constructor(e = new Y(1, 0, 0), t = 0) {
            this.normal = e, this.constant = t
        }
        set(e, t) {
            return this.normal.copy(e), this.constant = t, this
        }
        setComponents(e, t, i, n) {
            return this.normal.set(e, t, i), this.constant = n, this
        }
        setFromNormalAndCoplanarPoint(e, t) {
            return this.normal.copy(e), this.constant = -t.dot(this.normal), this
        }
        setFromCoplanarPoints(e, t, i) {
            const n = qe.subVectors(i, t).cross(Ze.subVectors(e, t)).normalize();
            return this.setFromNormalAndCoplanarPoint(n, e), this
        }
        copy(e) {
            return this.normal.copy(e.normal), this.constant = e.constant, this
        }
        normalize() {
            const e = 1 / this.normal.length();
            return this.normal.multiplyScalar(e), this.constant *= e, this
        }
        negate() {
            return this.constant *= -1, this.normal.negate(), this
        }
        distanceToPoint(e) {
            return this.normal.dot(e) + this.constant
        }
        distanceToSphere(e) {
            return this.distanceToPoint(e.center) - e.radius
        }
        projectPoint(e, t) {
            return void 0 === t && (console.warn("THREE.Plane: .projectPoint() target is now required"), t = new Y), t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
        }
        intersectLine(e, t) {
            void 0 === t && (console.warn("THREE.Plane: .intersectLine() target is now required"), t = new Y);
            const i = e.delta(qe),
                n = this.normal.dot(i);
            if (0 === n) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null;
            const r = -(e.start.dot(this.normal) + this.constant) / n;
            return r < 0 || r > 1 ? null : t.copy(i).multiplyScalar(r).add(e.start)
        }
        intersectsLine(e) {
            const t = this.distanceToPoint(e.start),
                i = this.distanceToPoint(e.end);
            return t < 0 && i > 0 || i < 0 && t > 0
        }
        intersectsBox(e) {
            return e.intersectsPlane(this)
        }
        intersectsSphere(e) {
            return e.intersectsPlane(this)
        }
        coplanarPoint(e) {
            return void 0 === e && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), e = new Y), e.copy(this.normal).multiplyScalar(-this.constant)
        }
        applyMatrix4(e, t) {
            const i = t || Je.getNormalMatrix(e),
                n = this.coplanarPoint(qe).applyMatrix4(e),
                r = this.normal.applyMatrix3(i).normalize();
            return this.constant = -n.dot(r), this
        }
        translate(e) {
            return this.constant -= e.dot(this.normal), this
        }
        equals(e) {
            return e.normal.equals(this.normal) && e.constant === this.constant
        }
        clone() {
            return (new this.constructor).copy(this)
        }
    }
    Ke.prototype.isPlane = !0;
    const $e = new Y,
        et = new Y,
        tt = new Y,
        it = new Y,
        nt = new Y,
        rt = new Y,
        at = new Y,
        st = new Y,
        ot = new Y,
        lt = new Y;
    class ct {
        constructor(e = new Y, t = new Y, i = new Y) {
            this.a = e, this.b = t, this.c = i
        }
        static getNormal(e, t, i, n) {
            void 0 === n && (console.warn("THREE.Triangle: .getNormal() target is now required"), n = new Y), n.subVectors(i, t), $e.subVectors(e, t), n.cross($e);
            const r = n.lengthSq();
            return r > 0 ? n.multiplyScalar(1 / Math.sqrt(r)) : n.set(0, 0, 0)
        }
        static getBarycoord(e, t, i, n, r) {
            $e.subVectors(n, t), et.subVectors(i, t), tt.subVectors(e, t);
            const a = $e.dot($e),
                s = $e.dot(et),
                o = $e.dot(tt),
                l = et.dot(et),
                c = et.dot(tt),
                d = a * l - s * s;
            if (void 0 === r && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), r = new Y), 0 === d) return r.set(-2, -1, -1);
            const h = 1 / d,
                u = (l * o - s * c) * h,
                f = (a * c - s * o) * h;
            return r.set(1 - u - f, f, u)
        }
        static containsPoint(e, t, i, n) {
            return this.getBarycoord(e, t, i, n, it), it.x >= 0 && it.y >= 0 && it.x + it.y <= 1
        }
        static getUV(e, t, i, n, r, a, s, o) {
            return this.getBarycoord(e, t, i, n, it), o.set(0, 0), o.addScaledVector(r, it.x), o.addScaledVector(a, it.y), o.addScaledVector(s, it.z), o
        }
        static isFrontFacing(e, t, i, n) {
            return $e.subVectors(i, t), et.subVectors(e, t), $e.cross(et).dot(n) < 0
        }
        set(e, t, i) {
            return this.a.copy(e), this.b.copy(t), this.c.copy(i), this
        }
        setFromPointsAndIndices(e, t, i, n) {
            return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[n]), this
        }
        clone() {
            return (new this.constructor).copy(this)
        }
        copy(e) {
            return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
        }
        getArea() {
            return $e.subVectors(this.c, this.b), et.subVectors(this.a, this.b), .5 * $e.cross(et).length()
        }
        getMidpoint(e) {
            return void 0 === e && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), e = new Y), e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
        }
        getNormal(e) {
            return ct.getNormal(this.a, this.b, this.c, e)
        }
        getPlane(e) {
            return void 0 === e && (console.warn("THREE.Triangle: .getPlane() target is now required"), e = new Ke), e.setFromCoplanarPoints(this.a, this.b, this.c)
        }
        getBarycoord(e, t) {
            return ct.getBarycoord(e, this.a, this.b, this.c, t)
        }
        getUV(e, t, i, n, r) {
            return ct.getUV(e, this.a, this.b, this.c, t, i, n, r)
        }
        containsPoint(e) {
            return ct.containsPoint(e, this.a, this.b, this.c)
        }
        isFrontFacing(e) {
            return ct.isFrontFacing(this.a, this.b, this.c, e)
        }
        intersectsBox(e) {
            return e.intersectsTriangle(this)
        }
        closestPointToPoint(e, t) {
            void 0 === t && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), t = new Y);
            const i = this.a,
                n = this.b,
                r = this.c;
            let a, s;
            nt.subVectors(n, i), rt.subVectors(r, i), st.subVectors(e, i);
            const o = nt.dot(st),
                l = rt.dot(st);
            if (o <= 0 && l <= 0) return t.copy(i);
            ot.subVectors(e, n);
            const c = nt.dot(ot),
                d = rt.dot(ot);
            if (c >= 0 && d <= c) return t.copy(n);
            const h = o * d - c * l;
            if (h <= 0 && o >= 0 && c <= 0) return a = o / (o - c), t.copy(i).addScaledVector(nt, a);
            lt.subVectors(e, r);
            const u = nt.dot(lt),
                f = rt.dot(lt);
            if (f >= 0 && u <= f) return t.copy(r);
            const p = u * l - o * f;
            if (p <= 0 && l >= 0 && f <= 0) return s = l / (l - f), t.copy(i).addScaledVector(rt, s);
            const m = c * f - u * d;
            if (m <= 0 && d - c >= 0 && u - f >= 0) return at.subVectors(r, n), s = (d - c) / (d - c + (u - f)), t.copy(n).addScaledVector(at, s);
            const g = 1 / (m + p + h);
            return a = p * g, s = h * g, t.copy(i).addScaledVector(nt, a).addScaledVector(rt, s)
        }
        equals(e) {
            return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
        }
    }
    let dt = 0;

    function ht() {
        Object.defineProperty(this, "id", {
            value: dt++
        }), this.uuid = C(), this.name = "", this.type = "Material", this.fog = !0, this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = l, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = T, this.stencilZFail = T, this.stencilZPass = T, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0
    }
    ht.prototype = Object.assign(Object.create(E.prototype), {
        constructor: ht,
        isMaterial: !0,
        onBuild: function() {},
        onBeforeCompile: function() {},
        customProgramCacheKey: function() {
            return this.onBeforeCompile.toString()
        },
        setValues: function(e) {
            if (void 0 !== e)
                for (const t in e) {
                    const i = e[t];
                    if (void 0 === i) {
                        console.warn("THREE.Material: '" + t + "' parameter is undefined.");
                        continue
                    }
                    if ("shading" === t) {
                        console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === i;
                        continue
                    }
                    const n = this[t];
                    void 0 !== n ? n && n.isColor ? n.set(i) : n && n.isVector3 && i && i.isVector3 ? n.copy(i) : this[t] = i : console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.")
                }
        },
        toJSON: function(e) {
            const t = void 0 === e || "string" == typeof e;
            t && (e = {
                textures: {},
                images: {}
            });
            const i = {
                metadata: {
                    version: 4.5,
                    type: "Material",
                    generator: "Material.toJSON"
                }
            };

            function n(e) {
                const t = [];
                for (const i in e) {
                    const n = e[i];
                    delete n.metadata, t.push(n)
                }
                return t
            }
            if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), void 0 !== this.roughness && (i.roughness = this.roughness), void 0 !== this.metalness && (i.metalness = this.metalness), this.sheen && this.sheen.isColor && (i.sheen = this.sheen.getHex()), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), void 0 !== this.shininess && (i.shininess = this.shininess), void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, void 0 !== this.combine && (i.combine = this.combine)), void 0 !== this.envMapIntensity && (i.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.size && (i.size = this.size), null !== this.shadowSide && (i.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (i.blending = this.blending), 0 !== this.side && (i.side = this.side), this.vertexColors && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), !0 === this.transparent && (i.transparent = this.transparent), i.depthFunc = this.depthFunc, i.depthTest = this.depthTest, i.depthWrite = this.depthWrite, i.colorWrite = this.colorWrite, i.stencilWrite = this.stencilWrite, i.stencilWriteMask = this.stencilWriteMask, i.stencilFunc = this.stencilFunc, i.stencilRef = this.stencilRef, i.stencilFuncMask = this.stencilFuncMask, i.stencilFail = this.stencilFail, i.stencilZFail = this.stencilZFail, i.stencilZPass = this.stencilZPass, this.rotation && 0 !== this.rotation && (i.rotation = this.rotation), !0 === this.polygonOffset && (i.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (i.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth && 1 !== this.linewidth && (i.linewidth = this.linewidth), void 0 !== this.dashSize && (i.dashSize = this.dashSize), void 0 !== this.gapSize && (i.gapSize = this.gapSize), void 0 !== this.scale && (i.scale = this.scale), !0 === this.dithering && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), !0 === this.alphaToCoverage && (i.alphaToCoverage = this.alphaToCoverage), !0 === this.premultipliedAlpha && (i.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (i.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (i.morphTargets = !0), !0 === this.morphNormals && (i.morphNormals = !0), !0 === this.skinning && (i.skinning = !0), !0 === this.flatShading && (i.flatShading = this.flatShading), !1 === this.visible && (i.visible = !1), !1 === this.toneMapped && (i.toneMapped = !1), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), t) {
                const t = n(e.textures),
                    r = n(e.images);
                t.length > 0 && (i.textures = t), r.length > 0 && (i.images = r)
            }
            return i
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(e) {
            this.name = e.name, this.fog = e.fog, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
            const t = e.clippingPlanes;
            let i = null;
            if (null !== t) {
                const e = t.length;
                i = new Array(e);
                for (let n = 0; n !== e; ++n) i[n] = t[n].clone()
            }
            return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    }), Object.defineProperty(ht.prototype, "needsUpdate", {
        set: function(e) {
            !0 === e && this.version++
        }
    });
    const ut = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        },
        ft = {
            h: 0,
            s: 0,
            l: 0
        },
        pt = {
            h: 0,
            s: 0,
            l: 0
        };

    function mt(e, t, i) {
        return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? e + 6 * (t - e) * i : i < .5 ? t : i < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - i) : e
    }

    function gt(e) {
        return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4)
    }

    function xt(e) {
        return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055
    }
    class _t {
        constructor(e, t, i) {
            return void 0 === t && void 0 === i ? this.set(e) : this.setRGB(e, t, i)
        }
        set(e) {
            return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
        }
        setScalar(e) {
            return this.r = e, this.g = e, this.b = e, this
        }
        setHex(e) {
            return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
        }
        setRGB(e, t, i) {
            return this.r = e, this.g = t, this.b = i, this
        }
        setHSL(e, t, i) {
            var n;
            if (e = (e % (n = 1) + n) % n, t = R(t, 0, 1), i = R(i, 0, 1), 0 === t) this.r = this.g = this.b = i;
            else {
                const n = i <= .5 ? i * (1 + t) : i + t - i * t,
                    r = 2 * i - n;
                this.r = mt(r, n, e + 1 / 3), this.g = mt(r, n, e), this.b = mt(r, n, e - 1 / 3)
            }
            return this
        }
        setStyle(e) {
            function t(t) {
                void 0 !== t && parseFloat(t) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
            }
            let i;
            if (i = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)) {
                let e;
                const n = i[1],
                    r = i[2];
                switch (n) {
                    case "rgb":
                    case "rgba":
                        if (e = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) return this.r = Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, t(e[4]), this;
                        if (e = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) return this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, t(e[4]), this;
                        break;
                    case "hsl":
                    case "hsla":
                        if (e = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) {
                            const i = parseFloat(e[1]) / 360,
                                n = parseInt(e[2], 10) / 100,
                                r = parseInt(e[3], 10) / 100;
                            return t(e[4]), this.setHSL(i, n, r)
                        }
                }
            } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
                const e = i[1],
                    t = e.length;
                if (3 === t) return this.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255, this.g = parseInt(e.charAt(1) + e.charAt(1), 16) / 255, this.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255, this;
                if (6 === t) return this.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255, this.g = parseInt(e.charAt(2) + e.charAt(3), 16) / 255, this.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255, this
            }
            return e && e.length > 0 ? this.setColorName(e) : this
        }
        setColorName(e) {
            const t = ut[e.toLowerCase()];
            return void 0 !== t ? this.setHex(t) : console.warn("THREE.Color: Unknown color " + e), this
        }
        clone() {
            return new this.constructor(this.r, this.g, this.b)
        }
        copy(e) {
            return this.r = e.r, this.g = e.g, this.b = e.b, this
        }
        copyGammaToLinear(e, t = 2) {
            return this.r = Math.pow(e.r, t), this.g = Math.pow(e.g, t), this.b = Math.pow(e.b, t), this
        }
        copyLinearToGamma(e, t = 2) {
            const i = t > 0 ? 1 / t : 1;
            return this.r = Math.pow(e.r, i), this.g = Math.pow(e.g, i), this.b = Math.pow(e.b, i), this
        }
        convertGammaToLinear(e) {
            return this.copyGammaToLinear(this, e), this
        }
        convertLinearToGamma(e) {
            return this.copyLinearToGamma(this, e), this
        }
        copySRGBToLinear(e) {
            return this.r = gt(e.r), this.g = gt(e.g), this.b = gt(e.b), this
        }
        copyLinearToSRGB(e) {
            return this.r = xt(e.r), this.g = xt(e.g), this.b = xt(e.b), this
        }
        convertSRGBToLinear() {
            return this.copySRGBToLinear(this), this
        }
        convertLinearToSRGB() {
            return this.copyLinearToSRGB(this), this
        }
        getHex() {
            return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
        }
        getHexString() {
            return ("000000" + this.getHex().toString(16)).slice(-6)
        }
        getHSL(e) {
            void 0 === e && (console.warn("THREE.Color: .getHSL() target is now required"), e = {
                h: 0,
                s: 0,
                l: 0
            });
            const t = this.r,
                i = this.g,
                n = this.b,
                r = Math.max(t, i, n),
                a = Math.min(t, i, n);
            let s, o;
            const l = (a + r) / 2;
            if (a === r) s = 0, o = 0;
            else {
                const e = r - a;
                switch (o = l <= .5 ? e / (r + a) : e / (2 - r - a), r) {
                    case t:
                        s = (i - n) / e + (i < n ? 6 : 0);
                        break;
                    case i:
                        s = (n - t) / e + 2;
                        break;
                    case n:
                        s = (t - i) / e + 4
                }
                s /= 6
            }
            return e.h = s, e.s = o, e.l = l, e
        }
        getStyle() {
            return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
        }
        offsetHSL(e, t, i) {
            return this.getHSL(ft), ft.h += e, ft.s += t, ft.l += i, this.setHSL(ft.h, ft.s, ft.l), this
        }
        add(e) {
            return this.r += e.r, this.g += e.g, this.b += e.b, this
        }
        addColors(e, t) {
            return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
        }
        addScalar(e) {
            return this.r += e, this.g += e, this.b += e, this
        }
        sub(e) {
            return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this
        }
        multiply(e) {
            return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
        }
        multiplyScalar(e) {
            return this.r *= e, this.g *= e, this.b *= e, this
        }
        lerp(e, t) {
            return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
        }
        lerpColors(e, t, i) {
            return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this
        }
        lerpHSL(e, t) {
            this.getHSL(ft), e.getHSL(pt);
            const i = D(ft.h, pt.h, t),
                n = D(ft.s, pt.s, t),
                r = D(ft.l, pt.l, t);
            return this.setHSL(i, n, r), this
        }
        equals(e) {
            return e.r === this.r && e.g === this.g && e.b === this.b
        }
        fromArray(e, t = 0) {
            return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this
        }
        toArray(e = [], t = 0) {
            return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
        }
        fromBufferAttribute(e, t) {
            return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), !0 === e.normalized && (this.r /= 255, this.g /= 255, this.b /= 255), this
        }
        toJSON() {
            return this.getHex()
        }
    }
    _t.NAMES = ut, _t.prototype.isColor = !0, _t.prototype.r = 1, _t.prototype.g = 1, _t.prototype.b = 1;
    class vt extends ht {
        constructor(e) {
            super(), this.type = "MeshBasicMaterial", this.color = new _t(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.setValues(e)
        }
        copy(e) {
            return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this
        }
    }
    vt.prototype.isMeshBasicMaterial = !0;
    const yt = new Y,
        Mt = new z;
    class bt {
        constructor(e, t, i) {
            if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.name = "", this.array = e, this.itemSize = t, this.count = void 0 !== e ? e.length / t : 0, this.normalized = !0 === i, this.usage = 35044, this.updateRange = {
                offset: 0,
                count: -1
            }, this.version = 0, this.onUploadCallback = function() {}
        }
        set needsUpdate(e) {
            !0 === e && this.version++
        }
        setUsage(e) {
            return this.usage = e, this
        }
        copy(e) {
            return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this
        }
        copyAt(e, t, i) {
            e *= this.itemSize, i *= t.itemSize;
            for (let n = 0, r = this.itemSize; n < r; n++) this.array[e + n] = t.array[i + n];
            return this
        }
        copyArray(e) {
            return this.array.set(e), this
        }
        copyColorsArray(e) {
            const t = this.array;
            let i = 0;
            for (let n = 0, r = e.length; n < r; n++) {
                let r = e[n];
                void 0 === r && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", n), r = new _t), t[i++] = r.r, t[i++] = r.g, t[i++] = r.b
            }
            return this
        }
        copyVector2sArray(e) {
            const t = this.array;
            let i = 0;
            for (let n = 0, r = e.length; n < r; n++) {
                let r = e[n];
                void 0 === r && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", n), r = new z), t[i++] = r.x, t[i++] = r.y
            }
            return this
        }
        copyVector3sArray(e) {
            const t = this.array;
            let i = 0;
            for (let n = 0, r = e.length; n < r; n++) {
                let r = e[n];
                void 0 === r && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", n), r = new Y), t[i++] = r.x, t[i++] = r.y, t[i++] = r.z
            }
            return this
        }
        copyVector4sArray(e) {
            const t = this.array;
            let i = 0;
            for (let n = 0, r = e.length; n < r; n++) {
                let r = e[n];
                void 0 === r && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", n), r = new V), t[i++] = r.x, t[i++] = r.y, t[i++] = r.z, t[i++] = r.w
            }
            return this
        }
        applyMatrix3(e) {
            if (2 === this.itemSize)
                for (let t = 0, i = this.count; t < i; t++) Mt.fromBufferAttribute(this, t), Mt.applyMatrix3(e), this.setXY(t, Mt.x, Mt.y);
            else if (3 === this.itemSize)
                for (let t = 0, i = this.count; t < i; t++) yt.fromBufferAttribute(this, t), yt.applyMatrix3(e), this.setXYZ(t, yt.x, yt.y, yt.z);
            return this
        }
        applyMatrix4(e) {
            for (let t = 0, i = this.count; t < i; t++) yt.x = this.getX(t), yt.y = this.getY(t), yt.z = this.getZ(t), yt.applyMatrix4(e), this.setXYZ(t, yt.x, yt.y, yt.z);
            return this
        }
        applyNormalMatrix(e) {
            for (let t = 0, i = this.count; t < i; t++) yt.x = this.getX(t), yt.y = this.getY(t), yt.z = this.getZ(t), yt.applyNormalMatrix(e), this.setXYZ(t, yt.x, yt.y, yt.z);
            return this
        }
        transformDirection(e) {
            for (let t = 0, i = this.count; t < i; t++) yt.x = this.getX(t), yt.y = this.getY(t), yt.z = this.getZ(t), yt.transformDirection(e), this.setXYZ(t, yt.x, yt.y, yt.z);
            return this
        }
        set(e, t = 0) {
            return this.array.set(e, t), this
        }
        getX(e) {
            return this.array[e * this.itemSize]
        }
        setX(e, t) {
            return this.array[e * this.itemSize] = t, this
        }
        getY(e) {
            return this.array[e * this.itemSize + 1]
        }
        setY(e, t) {
            return this.array[e * this.itemSize + 1] = t, this
        }
        getZ(e) {
            return this.array[e * this.itemSize + 2]
        }
        setZ(e, t) {
            return this.array[e * this.itemSize + 2] = t, this
        }
        getW(e) {
            return this.array[e * this.itemSize + 3]
        }
        setW(e, t) {
            return this.array[e * this.itemSize + 3] = t, this
        }
        setXY(e, t, i) {
            return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = i, this
        }
        setXYZ(e, t, i, n) {
            return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this
        }
        setXYZW(e, t, i, n, r) {
            return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this.array[e + 3] = r, this
        }
        onUpload(e) {
            return this.onUploadCallback = e, this
        }
        clone() {
            return new this.constructor(this.array, this.itemSize).copy(this)
        }
        toJSON() {
            const e = {
                itemSize: this.itemSize,
                type: this.array.constructor.name,
                array: Array.prototype.slice.call(this.array),
                normalized: this.normalized
            };
            return "" !== this.name && (e.name = this.name), 35044 !== this.usage && (e.usage = this.usage), 0 === this.updateRange.offset && -1 === this.updateRange.count || (e.updateRange = this.updateRange), e
        }
    }
    bt.prototype.isBufferAttribute = !0;
    class At extends bt {
        constructor(e, t, i) {
            super(new Uint16Array(e), t, i)
        }
    }
    class wt extends bt {
        constructor(e, t, i) {
            super(new Uint32Array(e), t, i)
        }
    }
    class St extends bt {
        constructor(e, t, i) {
            super(new Float32Array(e), t, i)
        }
    }

    function Tt(e) {
        if (0 === e.length) return -1 / 0;
        let t = e[0];
        for (let i = 1, n = e.length; i < n; ++i) e[i] > t && (t = e[i]);
        return t
    }
    let Lt = 0;
    const Et = new Ae,
        Pt = new je,
        Ft = new Y,
        Nt = new q,
        Ct = new q,
        Rt = new Y;
    class Dt extends E {
        constructor() {
            super(), Object.defineProperty(this, "id", {
                value: Lt++
            }), this.uuid = C(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
                start: 0,
                count: 1 / 0
            }, this.userData = {}
        }
        getIndex() {
            return this.index
        }
        setIndex(e) {
            return Array.isArray(e) ? this.index = new(Tt(e) > 65535 ? wt : At)(e, 1) : this.index = e, this
        }
        getAttribute(e) {
            return this.attributes[e]
        }
        setAttribute(e, t) {
            return this.attributes[e] = t, this
        }
        deleteAttribute(e) {
            return delete this.attributes[e], this
        }
        hasAttribute(e) {
            return void 0 !== this.attributes[e]
        }
        addGroup(e, t, i = 0) {
            this.groups.push({
                start: e,
                count: t,
                materialIndex: i
            })
        }
        clearGroups() {
            this.groups = []
        }
        setDrawRange(e, t) {
            this.drawRange.start = e, this.drawRange.count = t
        }
        applyMatrix4(e) {
            const t = this.attributes.position;
            void 0 !== t && (t.applyMatrix4(e), t.needsUpdate = !0);
            const i = this.attributes.normal;
            if (void 0 !== i) {
                const t = (new O).getNormalMatrix(e);
                i.applyNormalMatrix(t), i.needsUpdate = !0
            }
            const n = this.attributes.tangent;
            return void 0 !== n && (n.transformDirection(e), n.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
        }
        rotateX(e) {
            return Et.makeRotationX(e), this.applyMatrix4(Et), this
        }
        rotateY(e) {
            return Et.makeRotationY(e), this.applyMatrix4(Et), this
        }
        rotateZ(e) {
            return Et.makeRotationZ(e), this.applyMatrix4(Et), this
        }
        translate(e, t, i) {
            return Et.makeTranslation(e, t, i), this.applyMatrix4(Et), this
        }
        scale(e, t, i) {
            return Et.makeScale(e, t, i), this.applyMatrix4(Et), this
        }
        lookAt(e) {
            return Pt.lookAt(e), Pt.updateMatrix(), this.applyMatrix4(Pt.matrix), this
        }
        center() {
            return this.computeBoundingBox(), this.boundingBox.getCenter(Ft).negate(), this.translate(Ft.x, Ft.y, Ft.z), this
        }
        setFromPoints(e) {
            const t = [];
            for (let i = 0, n = e.length; i < n; i++) {
                const n = e[i];
                t.push(n.x, n.y, n.z || 0)
            }
            return this.setAttribute("position", new St(t, 3)), this
        }
        computeBoundingBox() {
            null === this.boundingBox && (this.boundingBox = new q);
            const e = this.attributes.position,
                t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute) return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingBox.set(new Y(-1 / 0, -1 / 0, -1 / 0), new Y(1 / 0, 1 / 0, 1 / 0));
            if (void 0 !== e) {
                if (this.boundingBox.setFromBufferAttribute(e), t)
                    for (let e = 0, i = t.length; e < i; e++) {
                        const i = t[e];
                        Nt.setFromBufferAttribute(i), this.morphTargetsRelative ? (Rt.addVectors(this.boundingBox.min, Nt.min), this.boundingBox.expandByPoint(Rt), Rt.addVectors(this.boundingBox.max, Nt.max), this.boundingBox.expandByPoint(Rt)) : (this.boundingBox.expandByPoint(Nt.min), this.boundingBox.expandByPoint(Nt.max))
                    }
            } else this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        }
        computeBoundingSphere() {
            null === this.boundingSphere && (this.boundingSphere = new pe);
            const e = this.attributes.position,
                t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute) return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingSphere.set(new Y, 1 / 0);
            if (e) {
                const i = this.boundingSphere.center;
                if (Nt.setFromBufferAttribute(e), t)
                    for (let e = 0, i = t.length; e < i; e++) {
                        const i = t[e];
                        Ct.setFromBufferAttribute(i), this.morphTargetsRelative ? (Rt.addVectors(Nt.min, Ct.min), Nt.expandByPoint(Rt), Rt.addVectors(Nt.max, Ct.max), Nt.expandByPoint(Rt)) : (Nt.expandByPoint(Ct.min), Nt.expandByPoint(Ct.max))
                    }
                Nt.getCenter(i);
                let n = 0;
                for (let t = 0, r = e.count; t < r; t++) Rt.fromBufferAttribute(e, t), n = Math.max(n, i.distanceToSquared(Rt));
                if (t)
                    for (let r = 0, a = t.length; r < a; r++) {
                        const a = t[r],
                            s = this.morphTargetsRelative;
                        for (let t = 0, r = a.count; t < r; t++) Rt.fromBufferAttribute(a, t), s && (Ft.fromBufferAttribute(e, t), Rt.add(Ft)), n = Math.max(n, i.distanceToSquared(Rt))
                    }
                this.boundingSphere.radius = Math.sqrt(n), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
            }
        }
        computeFaceNormals() {}
        computeTangents() {
            const e = this.index,
                t = this.attributes;
            if (null === e || void 0 === t.position || void 0 === t.normal || void 0 === t.uv) return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
            const i = e.array,
                n = t.position.array,
                r = t.normal.array,
                a = t.uv.array,
                s = n.length / 3;
            void 0 === t.tangent && this.setAttribute("tangent", new bt(new Float32Array(4 * s), 4));
            const o = t.tangent.array,
                l = [],
                c = [];
            for (let e = 0; e < s; e++) l[e] = new Y, c[e] = new Y;
            const d = new Y,
                h = new Y,
                u = new Y,
                f = new z,
                p = new z,
                m = new z,
                g = new Y,
                x = new Y;

            function _(e, t, i) {
                d.fromArray(n, 3 * e), h.fromArray(n, 3 * t), u.fromArray(n, 3 * i), f.fromArray(a, 2 * e), p.fromArray(a, 2 * t), m.fromArray(a, 2 * i), h.sub(d), u.sub(d), p.sub(f), m.sub(f);
                const r = 1 / (p.x * m.y - m.x * p.y);
                isFinite(r) && (g.copy(h).multiplyScalar(m.y).addScaledVector(u, -p.y).multiplyScalar(r), x.copy(u).multiplyScalar(p.x).addScaledVector(h, -m.x).multiplyScalar(r), l[e].add(g), l[t].add(g), l[i].add(g), c[e].add(x), c[t].add(x), c[i].add(x))
            }
            let v = this.groups;
            0 === v.length && (v = [{
                start: 0,
                count: i.length
            }]);
            for (let e = 0, t = v.length; e < t; ++e) {
                const t = v[e],
                    n = t.start;
                for (let e = n, r = n + t.count; e < r; e += 3) _(i[e + 0], i[e + 1], i[e + 2])
            }
            const y = new Y,
                M = new Y,
                b = new Y,
                A = new Y;

            function w(e) {
                b.fromArray(r, 3 * e), A.copy(b);
                const t = l[e];
                y.copy(t), y.sub(b.multiplyScalar(b.dot(t))).normalize(), M.crossVectors(A, t);
                const i = M.dot(c[e]) < 0 ? -1 : 1;
                o[4 * e] = y.x, o[4 * e + 1] = y.y, o[4 * e + 2] = y.z, o[4 * e + 3] = i
            }
            for (let e = 0, t = v.length; e < t; ++e) {
                const t = v[e],
                    n = t.start;
                for (let e = n, r = n + t.count; e < r; e += 3) w(i[e + 0]), w(i[e + 1]), w(i[e + 2])
            }
        }
        computeVertexNormals() {
            const e = this.index,
                t = this.getAttribute("position");
            if (void 0 !== t) {
                let i = this.getAttribute("normal");
                if (void 0 === i) i = new bt(new Float32Array(3 * t.count), 3), this.setAttribute("normal", i);
                else
                    for (let e = 0, t = i.count; e < t; e++) i.setXYZ(e, 0, 0, 0);
                const n = new Y,
                    r = new Y,
                    a = new Y,
                    s = new Y,
                    o = new Y,
                    l = new Y,
                    c = new Y,
                    d = new Y;
                if (e)
                    for (let h = 0, u = e.count; h < u; h += 3) {
                        const u = e.getX(h + 0),
                            f = e.getX(h + 1),
                            p = e.getX(h + 2);
                        n.fromBufferAttribute(t, u), r.fromBufferAttribute(t, f), a.fromBufferAttribute(t, p), c.subVectors(a, r), d.subVectors(n, r), c.cross(d), s.fromBufferAttribute(i, u), o.fromBufferAttribute(i, f), l.fromBufferAttribute(i, p), s.add(c), o.add(c), l.add(c), i.setXYZ(u, s.x, s.y, s.z), i.setXYZ(f, o.x, o.y, o.z), i.setXYZ(p, l.x, l.y, l.z)
                    } else
                        for (let e = 0, s = t.count; e < s; e += 3) n.fromBufferAttribute(t, e + 0), r.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), c.subVectors(a, r), d.subVectors(n, r), c.cross(d), i.setXYZ(e + 0, c.x, c.y, c.z), i.setXYZ(e + 1, c.x, c.y, c.z), i.setXYZ(e + 2, c.x, c.y, c.z);
                this.normalizeNormals(), i.needsUpdate = !0
            }
        }
        merge(e, t) {
            if (!e || !e.isBufferGeometry) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e);
            void 0 === t && (t = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
            const i = this.attributes;
            for (const n in i) {
                if (void 0 === e.attributes[n]) continue;
                const r = i[n].array,
                    a = e.attributes[n],
                    s = a.array,
                    o = a.itemSize * t,
                    l = Math.min(s.length, r.length - o);
                for (let e = 0, t = o; e < l; e++, t++) r[t] = s[e]
            }
            return this
        }
        normalizeNormals() {
            const e = this.attributes.normal;
            for (let t = 0, i = e.count; t < i; t++) Rt.fromBufferAttribute(e, t), Rt.normalize(), e.setXYZ(t, Rt.x, Rt.y, Rt.z)
        }
        toNonIndexed() {
            function e(e, t) {
                const i = e.array,
                    n = e.itemSize,
                    r = e.normalized,
                    a = new i.constructor(t.length * n);
                let s = 0,
                    o = 0;
                for (let e = 0, r = t.length; e < r; e++) {
                    s = t[e] * n;
                    for (let e = 0; e < n; e++) a[o++] = i[s++]
                }
                return new bt(a, n, r)
            }
            if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
            const t = new Dt,
                i = this.index.array,
                n = this.attributes;
            for (const r in n) {
                const a = e(n[r], i);
                t.setAttribute(r, a)
            }
            const r = this.morphAttributes;
            for (const n in r) {
                const a = [],
                    s = r[n];
                for (let t = 0, n = s.length; t < n; t++) {
                    const n = e(s[t], i);
                    a.push(n)
                }
                t.morphAttributes[n] = a
            }
            t.morphTargetsRelative = this.morphTargetsRelative;
            const a = this.groups;
            for (let e = 0, i = a.length; e < i; e++) {
                const i = a[e];
                t.addGroup(i.start, i.count, i.materialIndex)
            }
            return t
        }
        toJSON() {
            const e = {
                metadata: {
                    version: 4.5,
                    type: "BufferGeometry",
                    generator: "BufferGeometry.toJSON"
                }
            };
            if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters) {
                const t = this.parameters;
                for (const i in t) void 0 !== t[i] && (e[i] = t[i]);
                return e
            }
            e.data = {
                attributes: {}
            };
            const t = this.index;
            null !== t && (e.data.index = {
                type: t.array.constructor.name,
                array: Array.prototype.slice.call(t.array)
            });
            const i = this.attributes;
            for (const t in i) {
                const n = i[t];
                e.data.attributes[t] = n.toJSON(e.data)
            }
            const n = {};
            let r = !1;
            for (const t in this.morphAttributes) {
                const i = this.morphAttributes[t],
                    a = [];
                for (let t = 0, n = i.length; t < n; t++) {
                    const n = i[t];
                    a.push(n.toJSON(e.data))
                }
                a.length > 0 && (n[t] = a, r = !0)
            }
            r && (e.data.morphAttributes = n, e.data.morphTargetsRelative = this.morphTargetsRelative);
            const a = this.groups;
            a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
            const s = this.boundingSphere;
            return null !== s && (e.data.boundingSphere = {
                center: s.center.toArray(),
                radius: s.radius
            }), e
        }
        clone() {
            return (new Dt).copy(this)
        }
        copy(e) {
            this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
            const t = {};
            this.name = e.name;
            const i = e.index;
            null !== i && this.setIndex(i.clone(t));
            const n = e.attributes;
            for (const e in n) {
                const i = n[e];
                this.setAttribute(e, i.clone(t))
            }
            const r = e.morphAttributes;
            for (const e in r) {
                const i = [],
                    n = r[e];
                for (let e = 0, r = n.length; e < r; e++) i.push(n[e].clone(t));
                this.morphAttributes[e] = i
            }
            this.morphTargetsRelative = e.morphTargetsRelative;
            const a = e.groups;
            for (let e = 0, t = a.length; e < t; e++) {
                const t = a[e];
                this.addGroup(t.start, t.count, t.materialIndex)
            }
            const s = e.boundingBox;
            null !== s && (this.boundingBox = s.clone());
            const o = e.boundingSphere;
            return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    }
    Dt.prototype.isBufferGeometry = !0;
    const It = new Ae,
        Ut = new be,
        zt = new pe,
        Ot = new Y,
        Bt = new Y,
        Gt = new Y,
        Ht = new Y,
        kt = new Y,
        Vt = new Y,
        Wt = new Y,
        Xt = new Y,
        Yt = new Y,
        Qt = new z,
        jt = new z,
        qt = new z,
        Zt = new Y,
        Jt = new Y;
    class Kt extends je {
        constructor(e = new Dt, t = new vt) {
            super(), this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets()
        }
        copy(e) {
            return super.copy(e), void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = e.material, this.geometry = e.geometry, this
        }
        updateMorphTargets() {
            const e = this.geometry;
            if (e.isBufferGeometry) {
                const t = e.morphAttributes,
                    i = Object.keys(t);
                if (i.length > 0) {
                    const e = t[i[0]];
                    if (void 0 !== e) {
                        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                        for (let t = 0, i = e.length; t < i; t++) {
                            const i = e[t].name || String(t);
                            this.morphTargetInfluences.push(0), this.morphTargetDictionary[i] = t
                        }
                    }
                }
            } else {
                const t = e.morphTargets;
                void 0 !== t && t.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
            }
        }
        raycast(e, t) {
            const i = this.geometry,
                n = this.material,
                r = this.matrixWorld;
            if (void 0 === n) return;
            if (null === i.boundingSphere && i.computeBoundingSphere(), zt.copy(i.boundingSphere), zt.applyMatrix4(r), !1 === e.ray.intersectsSphere(zt)) return;
            if (It.copy(r).invert(), Ut.copy(e.ray).applyMatrix4(It), null !== i.boundingBox && !1 === Ut.intersectsBox(i.boundingBox)) return;
            let a;
            if (i.isBufferGeometry) {
                const r = i.index,
                    s = i.attributes.position,
                    o = i.morphAttributes.position,
                    l = i.morphTargetsRelative,
                    c = i.attributes.uv,
                    d = i.attributes.uv2,
                    h = i.groups,
                    u = i.drawRange;
                if (null !== r)
                    if (Array.isArray(n))
                        for (let i = 0, f = h.length; i < f; i++) {
                            const f = h[i],
                                p = n[f.materialIndex];
                            for (let i = Math.max(f.start, u.start), n = Math.min(f.start + f.count, u.start + u.count); i < n; i += 3) {
                                const n = r.getX(i),
                                    h = r.getX(i + 1),
                                    u = r.getX(i + 2);
                                a = $t(this, p, e, Ut, s, o, l, c, d, n, h, u), a && (a.faceIndex = Math.floor(i / 3), a.face.materialIndex = f.materialIndex, t.push(a))
                            }
                        } else {
                            for (let i = Math.max(0, u.start), h = Math.min(r.count, u.start + u.count); i < h; i += 3) {
                                const h = r.getX(i),
                                    u = r.getX(i + 1),
                                    f = r.getX(i + 2);
                                a = $t(this, n, e, Ut, s, o, l, c, d, h, u, f), a && (a.faceIndex = Math.floor(i / 3), t.push(a))
                            }
                        } else if (void 0 !== s)
                            if (Array.isArray(n))
                                for (let i = 0, r = h.length; i < r; i++) {
                                    const r = h[i],
                                        f = n[r.materialIndex];
                                    for (let i = Math.max(r.start, u.start), n = Math.min(r.start + r.count, u.start + u.count); i < n; i += 3) {
                                        a = $t(this, f, e, Ut, s, o, l, c, d, i, i + 1, i + 2), a && (a.faceIndex = Math.floor(i / 3), a.face.materialIndex = r.materialIndex, t.push(a))
                                    }
                                } else {
                                    for (let i = Math.max(0, u.start), r = Math.min(s.count, u.start + u.count); i < r; i += 3) {
                                        a = $t(this, n, e, Ut, s, o, l, c, d, i, i + 1, i + 2), a && (a.faceIndex = Math.floor(i / 3), t.push(a))
                                    }
                                }
            } else i.isGeometry && console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
        }
    }

    function $t(e, t, i, n, r, a, s, o, l, c, d, h) {
        Ot.fromBufferAttribute(r, c), Bt.fromBufferAttribute(r, d), Gt.fromBufferAttribute(r, h);
        const u = e.morphTargetInfluences;
        if (t.morphTargets && a && u) {
            Wt.set(0, 0, 0), Xt.set(0, 0, 0), Yt.set(0, 0, 0);
            for (let e = 0, t = a.length; e < t; e++) {
                const t = u[e],
                    i = a[e];
                0 !== t && (Ht.fromBufferAttribute(i, c), kt.fromBufferAttribute(i, d), Vt.fromBufferAttribute(i, h), s ? (Wt.addScaledVector(Ht, t), Xt.addScaledVector(kt, t), Yt.addScaledVector(Vt, t)) : (Wt.addScaledVector(Ht.sub(Ot), t), Xt.addScaledVector(kt.sub(Bt), t), Yt.addScaledVector(Vt.sub(Gt), t)))
            }
            Ot.add(Wt), Bt.add(Xt), Gt.add(Yt)
        }
        e.isSkinnedMesh && t.skinning && (e.boneTransform(c, Ot), e.boneTransform(d, Bt), e.boneTransform(h, Gt));
        const f = function(e, t, i, n, r, a, s, o) {
            let l;
            if (l = 1 === t.side ? n.intersectTriangle(s, a, r, !0, o) : n.intersectTriangle(r, a, s, 2 !== t.side, o), null === l) return null;
            Jt.copy(o), Jt.applyMatrix4(e.matrixWorld);
            const c = i.ray.origin.distanceTo(Jt);
            return c < i.near || c > i.far ? null : {
                distance: c,
                point: Jt.clone(),
                object: e
            }
        }(e, t, i, n, Ot, Bt, Gt, Zt);
        if (f) {
            o && (Qt.fromBufferAttribute(o, c), jt.fromBufferAttribute(o, d), qt.fromBufferAttribute(o, h), f.uv = ct.getUV(Zt, Ot, Bt, Gt, Qt, jt, qt, new z)), l && (Qt.fromBufferAttribute(l, c), jt.fromBufferAttribute(l, d), qt.fromBufferAttribute(l, h), f.uv2 = ct.getUV(Zt, Ot, Bt, Gt, Qt, jt, qt, new z));
            const e = {
                a: c,
                b: d,
                c: h,
                normal: new Y,
                materialIndex: 0
            };
            ct.getNormal(Ot, Bt, Gt, e.normal), f.face = e
        }
        return f
    }
    Kt.prototype.isMesh = !0;
    class ei extends Dt {
        constructor(e = 1, t = 1, i = 1, n = 1, r = 1, a = 1) {
            super(), this.type = "BoxGeometry", this.parameters = {
                width: e,
                height: t,
                depth: i,
                widthSegments: n,
                heightSegments: r,
                depthSegments: a
            };
            const s = this;
            n = Math.floor(n), r = Math.floor(r), a = Math.floor(a);
            const o = [],
                l = [],
                c = [],
                d = [];
            let h = 0,
                u = 0;

            function f(e, t, i, n, r, a, f, p, m, g, x) {
                const _ = a / m,
                    v = f / g,
                    y = a / 2,
                    M = f / 2,
                    b = p / 2,
                    A = m + 1,
                    w = g + 1;
                let S = 0,
                    T = 0;
                const L = new Y;
                for (let a = 0; a < w; a++) {
                    const s = a * v - M;
                    for (let o = 0; o < A; o++) {
                        const h = o * _ - y;
                        L[e] = h * n, L[t] = s * r, L[i] = b, l.push(L.x, L.y, L.z), L[e] = 0, L[t] = 0, L[i] = p > 0 ? 1 : -1, c.push(L.x, L.y, L.z), d.push(o / m), d.push(1 - a / g), S += 1
                    }
                }
                for (let e = 0; e < g; e++)
                    for (let t = 0; t < m; t++) {
                        const i = h + t + A * e,
                            n = h + t + A * (e + 1),
                            r = h + (t + 1) + A * (e + 1),
                            a = h + (t + 1) + A * e;
                        o.push(i, n, a), o.push(n, r, a), T += 6
                    }
                s.addGroup(u, T, x), u += T, h += S
            }
            f("z", "y", "x", -1, -1, i, t, e, a, r, 0), f("z", "y", "x", 1, -1, i, t, -e, a, r, 1), f("x", "z", "y", 1, 1, e, i, t, n, a, 2), f("x", "z", "y", 1, -1, e, i, -t, n, a, 3), f("x", "y", "z", 1, -1, e, t, i, n, r, 4), f("x", "y", "z", -1, -1, e, t, -i, n, r, 5), this.setIndex(o), this.setAttribute("position", new St(l, 3)), this.setAttribute("normal", new St(c, 3)), this.setAttribute("uv", new St(d, 2))
        }
    }

    function ti(e) {
        const t = {};
        for (const i in e) {
            t[i] = {};
            for (const n in e[i]) {
                const r = e[i][n];
                r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? t[i][n] = r.clone() : Array.isArray(r) ? t[i][n] = r.slice() : t[i][n] = r
            }
        }
        return t
    }

    function ii(e) {
        const t = {};
        for (let i = 0; i < e.length; i++) {
            const n = ti(e[i]);
            for (const e in n) t[e] = n[e]
        }
        return t
    }
    const ni = {
        clone: ti,
        merge: ii
    };
    class ri extends ht {
        constructor(e) {
            super(), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}", this.fragmentShader = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
                derivatives: !1,
                fragDepth: !1,
                drawBuffers: !1,
                shaderTextureLOD: !1
            }, this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv2: [0, 0]
            }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== e && (void 0 !== e.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(e))
        }
        copy(e) {
            return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = ti(e.uniforms), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.lights = e.lights, this.clipping = e.clipping, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this
        }
        toJSON(e) {
            const t = super.toJSON(e);
            t.glslVersion = this.glslVersion, t.uniforms = {};
            for (const i in this.uniforms) {
                const n = this.uniforms[i].value;
                n && n.isTexture ? t.uniforms[i] = {
                    type: "t",
                    value: n.toJSON(e).uuid
                } : n && n.isColor ? t.uniforms[i] = {
                    type: "c",
                    value: n.getHex()
                } : n && n.isVector2 ? t.uniforms[i] = {
                    type: "v2",
                    value: n.toArray()
                } : n && n.isVector3 ? t.uniforms[i] = {
                    type: "v3",
                    value: n.toArray()
                } : n && n.isVector4 ? t.uniforms[i] = {
                    type: "v4",
                    value: n.toArray()
                } : n && n.isMatrix3 ? t.uniforms[i] = {
                    type: "m3",
                    value: n.toArray()
                } : n && n.isMatrix4 ? t.uniforms[i] = {
                    type: "m4",
                    value: n.toArray()
                } : t.uniforms[i] = {
                    value: n
                }
            }
            Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
            const i = {};
            for (const e in this.extensions) !0 === this.extensions[e] && (i[e] = !0);
            return Object.keys(i).length > 0 && (t.extensions = i), t
        }
    }
    ri.prototype.isShaderMaterial = !0;
    class ai extends je {
        constructor() {
            super(), this.type = "Camera", this.matrixWorldInverse = new Ae, this.projectionMatrix = new Ae, this.projectionMatrixInverse = new Ae
        }
        copy(e, t) {
            return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this
        }
        getWorldDirection(e) {
            void 0 === e && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), e = new Y), this.updateWorldMatrix(!0, !1);
            const t = this.matrixWorld.elements;
            return e.set(-t[8], -t[9], -t[10]).normalize()
        }
        updateMatrixWorld(e) {
            super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }
        updateWorldMatrix(e, t) {
            super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }
        clone() {
            return (new this.constructor).copy(this)
        }
    }
    ai.prototype.isCamera = !0;
    class si extends ai {
        constructor(e = 50, t = 1, i = .1, n = 2e3) {
            super(), this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = n, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
        }
        copy(e, t) {
            return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this
        }
        setFocalLength(e) {
            const t = .5 * this.getFilmHeight() / e;
            this.fov = 2 * N * Math.atan(t), this.updateProjectionMatrix()
        }
        getFocalLength() {
            const e = Math.tan(.5 * F * this.fov);
            return .5 * this.getFilmHeight() / e
        }
        getEffectiveFOV() {
            return 2 * N * Math.atan(Math.tan(.5 * F * this.fov) / this.zoom)
        }
        getFilmWidth() {
            return this.filmGauge * Math.min(this.aspect, 1)
        }
        getFilmHeight() {
            return this.filmGauge / Math.max(this.aspect, 1)
        }
        setViewOffset(e, t, i, n, r, a) {
            this.aspect = e / t, null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = a, this.updateProjectionMatrix()
        }
        clearViewOffset() {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
        }
        updateProjectionMatrix() {
            const e = this.near;
            let t = e * Math.tan(.5 * F * this.fov) / this.zoom,
                i = 2 * t,
                n = this.aspect * i,
                r = -.5 * n;
            const a = this.view;
            if (null !== this.view && this.view.enabled) {
                const e = a.fullWidth,
                    s = a.fullHeight;
                r += a.offsetX * n / e, t -= a.offsetY * i / s, n *= a.width / e, i *= a.height / s
            }
            const s = this.filmOffset;
            0 !== s && (r += e * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + n, t, t - i, e, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }
        toJSON(e) {
            const t = super.toJSON(e);
            return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t
        }
    }
    si.prototype.isPerspectiveCamera = !0;
    const oi = 90;
    class li extends je {
        constructor(e, t, i) {
            if (super(), this.type = "CubeCamera", !0 !== i.isWebGLCubeRenderTarget) return void console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
            this.renderTarget = i;
            const n = new si(oi, 1, e, t);
            n.layers = this.layers, n.up.set(0, -1, 0), n.lookAt(new Y(1, 0, 0)), this.add(n);
            const r = new si(oi, 1, e, t);
            r.layers = this.layers, r.up.set(0, -1, 0), r.lookAt(new Y(-1, 0, 0)), this.add(r);
            const a = new si(oi, 1, e, t);
            a.layers = this.layers, a.up.set(0, 0, 1), a.lookAt(new Y(0, 1, 0)), this.add(a);
            const s = new si(oi, 1, e, t);
            s.layers = this.layers, s.up.set(0, 0, -1), s.lookAt(new Y(0, -1, 0)), this.add(s);
            const o = new si(oi, 1, e, t);
            o.layers = this.layers, o.up.set(0, -1, 0), o.lookAt(new Y(0, 0, 1)), this.add(o);
            const l = new si(oi, 1, e, t);
            l.layers = this.layers, l.up.set(0, -1, 0), l.lookAt(new Y(0, 0, -1)), this.add(l)
        }
        update(e, t) {
            null === this.parent && this.updateMatrixWorld();
            const i = this.renderTarget,
                [n, r, a, s, o, l] = this.children,
                c = e.xr.enabled,
                d = e.getRenderTarget();
            e.xr.enabled = !1;
            const h = i.texture.generateMipmaps;
            i.texture.generateMipmaps = !1, e.setRenderTarget(i, 0), e.render(t, n), e.setRenderTarget(i, 1), e.render(t, r), e.setRenderTarget(i, 2), e.render(t, a), e.setRenderTarget(i, 3), e.render(t, s), e.setRenderTarget(i, 4), e.render(t, o), i.texture.generateMipmaps = h, e.setRenderTarget(i, 5), e.render(t, l), e.setRenderTarget(d), e.xr.enabled = c
        }
    }
    class ci extends H {
        constructor(e, t, i, n, r, a, s, o, l, c) {
            super(e = void 0 !== e ? e : [], t = void 0 !== t ? t : 301, i, n, r, a, s = void 0 !== s ? s : M, o, l, c), this._needsFlipEnvMap = !0, this.flipY = !1
        }
        get images() {
            return this.image
        }
        set images(e) {
            this.image = e
        }
    }
    ci.prototype.isCubeTexture = !0;
    class di extends W {
        constructor(e, t, i) {
            Number.isInteger(t) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), t = i), super(e, e, t), t = t || {}, this.texture = new ci(void 0, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding), this.texture.generateMipmaps = void 0 !== t.generateMipmaps && t.generateMipmaps, this.texture.minFilter = void 0 !== t.minFilter ? t.minFilter : f, this.texture._needsFlipEnvMap = !1
        }
        fromEquirectangularTexture(e, t) {
            this.texture.type = t.type, this.texture.format = b, this.texture.encoding = t.encoding, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
            const i = {
                    uniforms: {
                        tEquirect: {
                            value: null
                        }
                    },
                    vertexShader: "varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}",
                    fragmentShader: "uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}"
                },
                n = new ei(5, 5, 5),
                r = new ri({
                    name: "CubemapFromEquirect",
                    uniforms: ti(i.uniforms),
                    vertexShader: i.vertexShader,
                    fragmentShader: i.fragmentShader,
                    side: 1,
                    blending: 0
                });
            r.uniforms.tEquirect.value = t;
            const a = new Kt(n, r),
                s = t.minFilter;
            t.minFilter === p && (t.minFilter = f);
            return new li(1, 10, this).update(e, a), t.minFilter = s, a.geometry.dispose(), a.material.dispose(), this
        }
        clear(e, t, i, n) {
            const r = e.getRenderTarget();
            for (let r = 0; r < 6; r++) e.setRenderTarget(this, r), e.clear(t, i, n);
            e.setRenderTarget(r)
        }
    }
    di.prototype.isWebGLCubeRenderTarget = !0;
    class hi extends H {
        constructor(e, t, i, n, r, a, s, o, l, c, d, h) {
            super(null, a, s, o, l, c, n, r, d, h), this.image = {
                data: e || null,
                width: t || 1,
                height: i || 1
            }, this.magFilter = void 0 !== l ? l : u, this.minFilter = void 0 !== c ? c : u, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
        }
    }
    hi.prototype.isDataTexture = !0;
    const ui = new pe,
        fi = new Y;
    class pi {
        constructor(e = new Ke, t = new Ke, i = new Ke, n = new Ke, r = new Ke, a = new Ke) {
            this.planes = [e, t, i, n, r, a]
        }
        set(e, t, i, n, r, a) {
            const s = this.planes;
            return s[0].copy(e), s[1].copy(t), s[2].copy(i), s[3].copy(n), s[4].copy(r), s[5].copy(a), this
        }
        copy(e) {
            const t = this.planes;
            for (let i = 0; i < 6; i++) t[i].copy(e.planes[i]);
            return this
        }
        setFromProjectionMatrix(e) {
            const t = this.planes,
                i = e.elements,
                n = i[0],
                r = i[1],
                a = i[2],
                s = i[3],
                o = i[4],
                l = i[5],
                c = i[6],
                d = i[7],
                h = i[8],
                u = i[9],
                f = i[10],
                p = i[11],
                m = i[12],
                g = i[13],
                x = i[14],
                _ = i[15];
            return t[0].setComponents(s - n, d - o, p - h, _ - m).normalize(), t[1].setComponents(s + n, d + o, p + h, _ + m).normalize(), t[2].setComponents(s + r, d + l, p + u, _ + g).normalize(), t[3].setComponents(s - r, d - l, p - u, _ - g).normalize(), t[4].setComponents(s - a, d - c, p - f, _ - x).normalize(), t[5].setComponents(s + a, d + c, p + f, _ + x).normalize(), this
        }
        intersectsObject(e) {
            const t = e.geometry;
            return null === t.boundingSphere && t.computeBoundingSphere(), ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(ui)
        }
        intersectsSprite(e) {
            return ui.center.set(0, 0, 0), ui.radius = .7071067811865476, ui.applyMatrix4(e.matrixWorld), this.intersectsSphere(ui)
        }
        intersectsSphere(e) {
            const t = this.planes,
                i = e.center,
                n = -e.radius;
            for (let e = 0; e < 6; e++) {
                if (t[e].distanceToPoint(i) < n) return !1
            }
            return !0
        }
        intersectsBox(e) {
            const t = this.planes;
            for (let i = 0; i < 6; i++) {
                const n = t[i];
                if (fi.x = n.normal.x > 0 ? e.max.x : e.min.x, fi.y = n.normal.y > 0 ? e.max.y : e.min.y, fi.z = n.normal.z > 0 ? e.max.z : e.min.z, n.distanceToPoint(fi) < 0) return !1
            }
            return !0
        }
        containsPoint(e) {
            const t = this.planes;
            for (let i = 0; i < 6; i++)
                if (t[i].distanceToPoint(e) < 0) return !1;
            return !0
        }
        clone() {
            return (new this.constructor).copy(this)
        }
    }

    function mi() {
        let e = null,
            t = !1,
            i = null,
            n = null;

        function r(t, a) {
            i(t, a), n = e.requestAnimationFrame(r)
        }
        return {
            start: function() {
                !0 !== t && null !== i && (n = e.requestAnimationFrame(r), t = !0)
            },
            stop: function() {
                e.cancelAnimationFrame(n), t = !1
            },
            setAnimationLoop: function(e) {
                i = e
            },
            setContext: function(t) {
                e = t
            }
        }
    }

    function gi(e, t) {
        const i = t.isWebGL2,
            n = new WeakMap;
        return {
            get: function(e) {
                return e.isInterleavedBufferAttribute && (e = e.data), n.get(e)
            },
            remove: function(t) {
                t.isInterleavedBufferAttribute && (t = t.data);
                const i = n.get(t);
                i && (e.deleteBuffer(i.buffer), n.delete(t))
            },
            update: function(t, r) {
                if (t.isGLBufferAttribute) {
                    const e = n.get(t);
                    return void((!e || e.version < t.version) && n.set(t, {
                        buffer: t.buffer,
                        type: t.type,
                        bytesPerElement: t.elementSize,
                        version: t.version
                    }))
                }
                t.isInterleavedBufferAttribute && (t = t.data);
                const a = n.get(t);
                void 0 === a ? n.set(t, function(t, n) {
                    const r = t.array,
                        a = t.usage,
                        s = e.createBuffer();
                    e.bindBuffer(n, s), e.bufferData(n, r, a), t.onUploadCallback();
                    let o = 5126;
                    return r instanceof Float32Array ? o = 5126 : r instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : r instanceof Uint16Array ? t.isFloat16BufferAttribute ? i ? o = 5131 : console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.") : o = 5123 : r instanceof Int16Array ? o = 5122 : r instanceof Uint32Array ? o = 5125 : r instanceof Int32Array ? o = 5124 : r instanceof Int8Array ? o = 5120 : r instanceof Uint8Array && (o = 5121), {
                        buffer: s,
                        type: o,
                        bytesPerElement: r.BYTES_PER_ELEMENT,
                        version: t.version
                    }
                }(t, r)) : a.version < t.version && (! function(t, n, r) {
                    const a = n.array,
                        s = n.updateRange;
                    e.bindBuffer(r, t), -1 === s.count ? e.bufferSubData(r, 0, a) : (i ? e.bufferSubData(r, s.offset * a.BYTES_PER_ELEMENT, a, s.offset, s.count) : e.bufferSubData(r, s.offset * a.BYTES_PER_ELEMENT, a.subarray(s.offset, s.offset + s.count)), s.count = -1)
                }(a.buffer, t, r), a.version = t.version)
            }
        }
    }
    class xi extends Dt {
        constructor(e = 1, t = 1, i = 1, n = 1) {
            super(), this.type = "PlaneGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: i,
                heightSegments: n
            };
            const r = e / 2,
                a = t / 2,
                s = Math.floor(i),
                o = Math.floor(n),
                l = s + 1,
                c = o + 1,
                d = e / s,
                h = t / o,
                u = [],
                f = [],
                p = [],
                m = [];
            for (let e = 0; e < c; e++) {
                const t = e * h - a;
                for (let i = 0; i < l; i++) {
                    const n = i * d - r;
                    f.push(n, -t, 0), p.push(0, 0, 1), m.push(i / s), m.push(1 - e / o)
                }
            }
            for (let e = 0; e < o; e++)
                for (let t = 0; t < s; t++) {
                    const i = t + l * e,
                        n = t + l * (e + 1),
                        r = t + 1 + l * (e + 1),
                        a = t + 1 + l * e;
                    u.push(i, n, a), u.push(n, r, a)
                }
            this.setIndex(u), this.setAttribute("position", new St(f, 3)), this.setAttribute("normal", new St(p, 3)), this.setAttribute("uv", new St(m, 2))
        }
    }
    const _i = {
            alphamap_fragment: "#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,vUv).g;\n#endif",
            alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif",
            alphatest_fragment: "#ifdef ALPHATEST\nif(diffuseColor.a<ALPHATEST)discard;\n#endif",
            aomap_fragment: "#ifdef USE_AOMAP\nfloat ambientOcclusion=(texture2D(aoMap,vUv2).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;\n#if defined(USE_ENVMAP)&&defined(STANDARD)\nfloat dotNV=saturate(dot(geometry.normal,geometry.viewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.specularRoughness);\n#endif\n#endif",
            aomap_pars_fragment: "#ifdef USE_AOMAP\nuniform sampler2D aoMap;uniform float aoMapIntensity;\n#endif",
            begin_vertex: "vec3 transformed=vec3(position);",
            beginnormal_vertex: "vec3 objectNormal=vec3(normal);\n#ifdef USE_TANGENT\nvec3 objectTangent=vec3(tangent.xyz);\n#endif",
            bsdfs: "vec2 integrateSpecularBRDF(const in float dotNV,const in float roughness){const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;return vec2(-1.04,1.04)*a004+r.zw;}float punctualLightIntensityToIrradianceFactor(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){\n#if defined(PHYSICALLY_CORRECT_LIGHTS)\nfloat distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;\n#else\nif(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;\n#endif\n}vec3 BRDF_Diffuse_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 specularColor,const in float dotLH){float fresnel=exp2((-5.55473*dotLH-6.98316)*dotLH);return(1.0-specularColor)*fresnel+specularColor;}vec3 F_Schlick_RoughnessDependent(const in vec3 F0,const in float dotNV,const in float roughness){float fresnel=exp2((-5.55473*dotNV-6.98316)*dotNV);vec3 Fr=max(vec3(1.0-roughness),F0)-F0;return Fr*fresnel+F0;}float G_GGX_Smith(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gl=dotNL+sqrt(a2+(1.0-a2)*pow2(dotNL));float gv=dotNV+sqrt(a2+(1.0-a2)*pow2(dotNV));return 1.0/(gl*gv);}float G_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}vec3 BRDF_Specular_GGX(const in IncidentLight incidentLight,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(incidentLight.direction+viewDir);float dotNL=saturate(dot(normal,incidentLight.direction));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotLH=saturate(dot(incidentLight.direction,halfDir));vec3 F=F_Schlick(specularColor,dotLH);float G=G_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(G*D);}vec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}vec3 BRDF_Specular_GGX_Environment(const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float roughness){float dotNV=saturate(dot(normal,viewDir));vec2 brdf=integrateSpecularBRDF(dotNV,roughness);return specularColor*brdf.x+brdf.y;}void BRDF_Specular_Multiscattering_Environment(const in GeometricContext geometry,const in vec3 specularColor,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){float dotNV=saturate(dot(geometry.normal,geometry.viewDir));vec3 F=F_Schlick_RoughnessDependent(specularColor,dotNV,roughness);vec2 brdf=integrateSpecularBRDF(dotNV,roughness);vec3 FssEss=F*brdf.x+brdf.y;float Ess=brdf.x+brdf.y;float Ems=1.0-Ess;vec3 Favg=specularColor+(1.0-specularColor)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_Specular_BlinnPhong(const in IncidentLight incidentLight,const in GeometricContext geometry,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(incidentLight.direction+geometry.viewDir);float dotNH=saturate(dot(geometry.normal,halfDir));float dotLH=saturate(dot(incidentLight.direction,halfDir));vec3 F=F_Schlick(specularColor,dotLH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}float GGXRoughnessToBlinnExponent(const in float ggxRoughness){return(2.0/pow2(ggxRoughness+0.0001)-2.0);}float BlinnExponentToGGXRoughness(const in float blinnExponent){return sqrt(2.0/(blinnExponent+2.0));}\n#if defined(USE_SHEEN)\nfloat D_Charlie(float roughness,float NoH){float invAlpha=1.0/roughness;float cos2h=NoH*NoH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float NoV,float NoL){return saturate(1.0/(4.0*(NoL+NoV-NoL*NoV)));}vec3 BRDF_Specular_Sheen(const in float roughness,const in vec3 L,const in GeometricContext geometry,vec3 specularColor){vec3 N=geometry.normal;vec3 V=geometry.viewDir;vec3 H=normalize(V+L);float dotNH=saturate(dot(N,H));return specularColor*D_Charlie(roughness,dotNH)*V_Neubelt(dot(N,V),dot(N,L));}\n#endif",
            bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vUv);vec2 dSTdy=dFdy(vUv);float Hll=bumpScale*texture2D(bumpMap,vUv).x;float dBx=bumpScale*texture2D(bumpMap,vUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=vec3(dFdx(surf_pos.x),dFdx(surf_pos.y),dFdx(surf_pos.z));vec3 vSigmaY=vec3(dFdy(surf_pos.x),dFdy(surf_pos.y),dFdy(surf_pos.z));vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}\n#endif",
            clipping_planes_fragment: "#if NUM_CLIPPING_PLANES>0\nvec4 plane;\n#pragma unroll_loop_start\nfor(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}\n#pragma unroll_loop_end\n#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES\nbool clipped=true;\n#pragma unroll_loop_start\nfor(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}\n#pragma unroll_loop_end\nif(clipped)discard;\n#endif\n#endif",
            clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];\n#endif",
            clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;\n#endif",
            clipping_planes_vertex: "#if NUM_CLIPPING_PLANES>0\nvClipPosition=-mvPosition.xyz;\n#endif",
            color_fragment: "#if defined(USE_COLOR_ALPHA)\ndiffuseColor*=vColor;\n#elif defined(USE_COLOR)\ndiffuseColor.rgb*=vColor;\n#endif",
            color_pars_fragment: "#if defined(USE_COLOR_ALPHA)\nvarying vec4 vColor;\n#elif defined(USE_COLOR)\nvarying vec3 vColor;\n#endif",
            color_pars_vertex: "#if defined(USE_COLOR_ALPHA)\nvarying vec4 vColor;\n#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvarying vec3 vColor;\n#endif",
            color_vertex: "#if defined(USE_COLOR_ALPHA)\nvColor=vec4(1.0);\n#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvColor=vec3(1.0);\n#endif\n#ifdef USE_COLOR\nvColor*=color;\n#endif\n#ifdef USE_INSTANCING_COLOR\nvColor.xyz*=instanceColor.xyz;\n#endif",
            common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\n#define whiteComplement(a)(1.0-saturate(a))\nfloat pow2(const in float x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float average(const in vec3 color){return dot(color,vec3(0.3333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}\n#ifdef HIGH_PRECISION\nfloat precisionSafeLength(vec3 v){return length(v);}\n#else\nfloat max3(vec3 v){return max(max(v.x,v.y),v.z);}float precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}\n#endif\nstruct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};struct GeometricContext{vec3 position;vec3 normal;vec3 viewDir;\n#ifdef CLEARCOAT\nvec3 clearcoatNormal;\n#endif\n};vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 projectOnPlane(in vec3 point,in vec3 pointOnPlane,in vec3 planeNormal){float distance=dot(planeNormal,point-pointOnPlane);return-distance*planeNormal+point;}float sideOfPlane(in vec3 point,in vec3 pointOnPlane,in vec3 planeNormal){return sign(dot(point-pointOnPlane,planeNormal));}vec3 linePlaneIntersect(in vec3 pointOnLine,in vec3 lineDirection,in vec3 pointOnPlane,in vec3 planeNormal){return lineDirection*(dot(planeNormal,pointOnPlane-pointOnLine)/dot(planeNormal,lineDirection))+pointOnLine;}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float linearToRelativeLuminance(const in vec3 color){vec3 weights=vec3(0.2126,0.7152,0.0722);return dot(weights,color.rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}",
            cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_maxMipLevel 8.0\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_maxTileSize 256.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);float texelSize=1.0/(3.0*cubeUV_maxTileSize);vec2 uv=getUV(direction,face)*(faceSize-1.0);vec2 f=fract(uv);uv+=0.5-f;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;if(mipInt<cubeUV_maxMipLevel){uv.y+=2.0*cubeUV_maxTileSize;}uv.y+=filterInt*2.0*cubeUV_minTileSize;uv.x+=3.0*max(0.0,cubeUV_maxTileSize-2.0*faceSize);uv*=texelSize;vec3 tl=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.x+=texelSize;vec3 tr=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.y+=texelSize;vec3 br=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.x-=texelSize;vec3 bl=envMapTexelToLinear(texture2D(envMap,uv)).rgb;vec3 tm=mix(tl,tr,f.x);vec3 bm=mix(bl,br,f.x);return mix(tm,bm,f.y);}\n#define r0 1.0\n#define v0 0.339\n#define m0-2.0\n#define r1 0.8\n#define v1 0.276\n#define m1-1.0\n#define r4 0.4\n#define v4 0.046\n#define m4 2.0\n#define r5 0.305\n#define v5 0.016\n#define m5 3.0\n#define r6 0.21\n#define v6 0.0038\n#define m6 4.0\nfloat roughnessToMip(float roughness){float mip=0.0;if(roughness>=r1){mip=(r0-roughness)*(m1-m0)/(r0-r1)+m0;}else if(roughness>=r4){mip=(r1-roughness)*(m4-m1)/(r1-r4)+m1;}else if(roughness>=r5){mip=(r4-roughness)*(m5-m4)/(r4-r5)+m4;}else if(roughness>=r6){mip=(r5-roughness)*(m6-m5)/(r5-r6)+m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),m0,cubeUV_maxMipLevel);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}\n#endif",
            defaultnormal_vertex: "vec3 transformedNormal=objectNormal;\n#ifdef USE_INSTANCING\nmat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;\n#endif\ntransformedNormal=normalMatrix*transformedNormal;\n#ifdef FLIP_SIDED\ntransformedNormal=-transformedNormal;\n#endif\n#ifdef USE_TANGENT\nvec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;\n#ifdef FLIP_SIDED\ntransformedTangent=-transformedTangent;\n#endif\n#endif",
            displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\nuniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;\n#endif",
            displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\ntransformed+=normalize(objectNormal)*(texture2D(displacementMap,vUv).x*displacementScale+displacementBias);\n#endif",
            emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\nvec4 emissiveColor=texture2D(emissiveMap,vUv);emissiveColor.rgb=emissiveMapTexelToLinear(emissiveColor).rgb;totalEmissiveRadiance*=emissiveColor.rgb;\n#endif",
            emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\nuniform sampler2D emissiveMap;\n#endif",
            encodings_fragment: "gl_FragColor=linearToOutputTexel(gl_FragColor);",
            encodings_pars_fragment: "vec4 LinearToLinear(in vec4 value){return value;}vec4 GammaToLinear(in vec4 value,in float gammaFactor){return vec4(pow(value.rgb,vec3(gammaFactor)),value.a);}vec4 LinearToGamma(in vec4 value,in float gammaFactor){return vec4(pow(value.rgb,vec3(1.0/gammaFactor)),value.a);}vec4 sRGBToLinear(in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}vec4 LinearTosRGB(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}vec4 RGBEToLinear(in vec4 value){return vec4(value.rgb*exp2(value.a*255.0-128.0),1.0);}vec4 LinearToRGBE(in vec4 value){float maxComponent=max(max(value.r,value.g),value.b);float fExp=clamp(ceil(log2(maxComponent)),-128.0,127.0);return vec4(value.rgb/exp2(fExp),(fExp+128.0)/255.0);}vec4 RGBMToLinear(in vec4 value,in float maxRange){return vec4(value.rgb*value.a*maxRange,1.0);}vec4 LinearToRGBM(in vec4 value,in float maxRange){float maxRGB=max(value.r,max(value.g,value.b));float M=clamp(maxRGB/maxRange,0.0,1.0);M=ceil(M*255.0)/255.0;return vec4(value.rgb/(M*maxRange),M);}vec4 RGBDToLinear(in vec4 value,in float maxRange){return vec4(value.rgb*((maxRange/255.0)/value.a),1.0);}vec4 LinearToRGBD(in vec4 value,in float maxRange){float maxRGB=max(value.r,max(value.g,value.b));float D=max(maxRange/maxRGB,1.0);D=clamp(floor(D)/255.0,0.0,1.0);return vec4(value.rgb*(D*(255.0/maxRange)),D);}const mat3 cLogLuvM=mat3(0.2209,0.3390,0.4184,0.1138,0.6780,0.7319,0.0102,0.1130,0.2969);vec4 LinearToLogLuv(in vec4 value){vec3 Xp_Y_XYZp=cLogLuvM*value.rgb;Xp_Y_XYZp=max(Xp_Y_XYZp,vec3(1e-6,1e-6,1e-6));vec4 vResult;vResult.xy=Xp_Y_XYZp.xy/Xp_Y_XYZp.z;float Le=2.0*log2(Xp_Y_XYZp.y)+127.0;vResult.w=fract(Le);vResult.z=(Le-(floor(vResult.w*255.0))/255.0)/255.0;return vResult;}const mat3 cLogLuvInverseM=mat3(6.0014,-2.7008,-1.7996,-1.3320,3.1029,-5.7721,0.3008,-1.0882,5.6268);vec4 LogLuvToLinear(in vec4 value){float Le=value.z*255.0+value.w;vec3 Xp_Y_XYZp;Xp_Y_XYZp.y=exp2((Le-127.0)/2.0);Xp_Y_XYZp.z=Xp_Y_XYZp.y/value.y;Xp_Y_XYZp.x=value.x*Xp_Y_XYZp.z;vec3 vRGB=cLogLuvInverseM*Xp_Y_XYZp.rgb;return vec4(max(vRGB,0.0),1.0);}",
            envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvec3 reflectVec=reflect(cameraToFrag,worldNormal);\n#else\nvec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);\n#endif\n#else\nvec3 reflectVec=vReflect;\n#endif\n#ifdef ENVMAP_TYPE_CUBE\nvec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envColor=textureCubeUV(envMap,reflectVec,0.0);\n#else\nvec4 envColor=vec4(0.0);\n#endif\n#ifndef ENVMAP_TYPE_CUBE_UV\nenvColor=envMapTexelToLinear(envColor);\n#endif\n#ifdef ENVMAP_BLENDING_MULTIPLY\noutgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_MIX)\noutgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_ADD)\noutgoingLight+=envColor.xyz*specularStrength*reflectivity;\n#endif\n#endif",
            envmap_common_pars_fragment: "#ifdef USE_ENVMAP\nuniform float envMapIntensity;uniform float flipEnvMap;uniform int maxMipLevel;\n#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube envMap;\n#else\nuniform sampler2D envMap;\n#endif\n#endif",
            envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;uniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
            envmap_pars_vertex: "#ifdef USE_ENVMAP\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;\n#else\nvarying vec3 vReflect;uniform float refractionRatio;\n#endif\n#endif",
            envmap_physical_pars_fragment: "#if defined(USE_ENVMAP)\n#ifdef ENVMAP_MODE_REFRACTION\nuniform float refractionRatio;\n#endif\nvec3 getLightProbeIndirectIrradiance(const in GeometricContext geometry,const in int maxMIPLevel){vec3 worldNormal=inverseTransformDirection(geometry.normal,viewMatrix);\n#ifdef ENVMAP_TYPE_CUBE\nvec3 queryVec=vec3(flipEnvMap*worldNormal.x,worldNormal.yz);\n#ifdef TEXTURE_LOD_EXT\nvec4 envMapColor=textureCubeLodEXT(envMap,queryVec,float(maxMIPLevel));\n#else\nvec4 envMapColor=textureCube(envMap,queryVec,float(maxMIPLevel));\n#endif\nenvMapColor.rgb=envMapTexelToLinear(envMapColor).rgb;\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);\n#else\nvec4 envMapColor=vec4(0.0);\n#endif\nreturn PI*envMapColor.rgb*envMapIntensity;}float getSpecularMIPLevel(const in float roughness,const in int maxMIPLevel){float maxMIPLevelScalar=float(maxMIPLevel);float sigma=PI*roughness*roughness/(1.0+roughness);float desiredMIPLevel=maxMIPLevelScalar+log2(sigma);return clamp(desiredMIPLevel,0.0,maxMIPLevelScalar);}vec3 getLightProbeIndirectRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness,const in int maxMIPLevel){\n#ifdef ENVMAP_MODE_REFLECTION\nvec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));\n#else\nvec3 reflectVec=refract(-viewDir,normal,refractionRatio);\n#endif\nreflectVec=inverseTransformDirection(reflectVec,viewMatrix);float specularMIPLevel=getSpecularMIPLevel(roughness,maxMIPLevel);\n#ifdef ENVMAP_TYPE_CUBE\nvec3 queryReflectVec=vec3(flipEnvMap*reflectVec.x,reflectVec.yz);\n#ifdef TEXTURE_LOD_EXT\nvec4 envMapColor=textureCubeLodEXT(envMap,queryReflectVec,specularMIPLevel);\n#else\nvec4 envMapColor=textureCube(envMap,queryReflectVec,specularMIPLevel);\n#endif\nenvMapColor.rgb=envMapTexelToLinear(envMapColor).rgb;\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);\n#endif\nreturn envMapColor.rgb*envMapIntensity;}\n#endif",
            envmap_vertex: "#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvWorldPosition=worldPosition.xyz;\n#else\nvec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvReflect=reflect(cameraToVertex,worldNormal);\n#else\nvReflect=refract(cameraToVertex,worldNormal,refractionRatio);\n#endif\n#endif\n#endif",
            fog_vertex: "#ifdef USE_FOG\nfogDepth=-mvPosition.z;\n#endif",
            fog_pars_vertex: "#ifdef USE_FOG\nvarying float fogDepth;\n#endif",
            fog_fragment: "#ifdef USE_FOG\n#ifdef FOG_EXP2\nfloat fogFactor=1.0-exp(-fogDensity*fogDensity*fogDepth*fogDepth);\n#else\nfloat fogFactor=smoothstep(fogNear,fogFar,fogDepth);\n#endif\ngl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);\n#endif",
            fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;varying float fogDepth;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;uniform float fogFar;\n#endif\n#endif",
            gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\nuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);\n#ifdef USE_GRADIENTMAP\nreturn texture2D(gradientMap,coord).rgb;\n#else\nreturn(coord.x<0.7)?vec3(0.7):vec3(1.0);\n#endif\n}",
            lightmap_fragment: "#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=PI*lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#endif",
            lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nuniform sampler2D lightMap;uniform float lightMapIntensity;\n#endif",
            lights_lambert_vertex: "vec3 diffuse=vec3(1.0);GeometricContext geometry;geometry.position=mvPosition.xyz;geometry.normal=normalize(transformedNormal);geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(-mvPosition.xyz);GeometricContext backGeometry;backGeometry.position=geometry.position;backGeometry.normal=-geometry.normal;backGeometry.viewDir=geometry.viewDir;vLightFront=vec3(0.0);vIndirectFront=vec3(0.0);\n#ifdef DOUBLE_SIDED\nvLightBack=vec3(0.0);vIndirectBack=vec3(0.0);\n#endif\nIncidentLight directLight;float dotNL;vec3 directLightColor_Diffuse;vIndirectFront+=getAmbientLightIrradiance(ambientLightColor);vIndirectFront+=getLightProbeIrradiance(lightProbe,geometry);\n#ifdef DOUBLE_SIDED\nvIndirectBack+=getAmbientLightIrradiance(ambientLightColor);vIndirectBack+=getLightProbeIrradiance(lightProbe,backGeometry);\n#endif\n#if NUM_POINT_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){getPointDirectLightIrradiance(pointLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=PI*directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){getSpotDirectLightIrradiance(spotLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=PI*directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){getDirectionalDirectLightIrradiance(directionalLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=PI*directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){vIndirectFront+=getHemisphereLightIrradiance(hemisphereLights[i],geometry);\n#ifdef DOUBLE_SIDED\nvIndirectBack+=getHemisphereLightIrradiance(hemisphereLights[i],backGeometry);\n#endif\n}\n#pragma unroll_loop_end\n#endif",
            lights_pars_begin: "uniform bool receiveShadow;uniform vec3 ambientLightColor;uniform vec3 lightProbe[9];vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in GeometricContext geometry){vec3 worldNormal=inverseTransformDirection(geometry.normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreturn irradiance;}\n#if NUM_DIR_LIGHTS>0\nstruct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalDirectLightIrradiance(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight directLight){directLight.color=directionalLight.color;directLight.direction=directionalLight.direction;directLight.visible=true;}\n#endif\n#if NUM_POINT_LIGHTS>0\nstruct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointDirectLightIrradiance(const in PointLight pointLight,const in GeometricContext geometry,out IncidentLight directLight){vec3 lVector=pointLight.position-geometry.position;directLight.direction=normalize(lVector);float lightDistance=length(lVector);directLight.color=pointLight.color;directLight.color*=punctualLightIntensityToIrradianceFactor(lightDistance,pointLight.distance,pointLight.decay);directLight.visible=(directLight.color!=vec3(0.0));}\n#endif\n#if NUM_SPOT_LIGHTS>0\nstruct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotDirectLightIrradiance(const in SpotLight spotLight,const in GeometricContext geometry,out IncidentLight directLight){vec3 lVector=spotLight.position-geometry.position;directLight.direction=normalize(lVector);float lightDistance=length(lVector);float angleCos=dot(directLight.direction,spotLight.direction);if(angleCos>spotLight.coneCos){float spotEffect=smoothstep(spotLight.coneCos,spotLight.penumbraCos,angleCos);directLight.color=spotLight.color;directLight.color*=spotEffect*punctualLightIntensityToIrradianceFactor(lightDistance,spotLight.distance,spotLight.decay);directLight.visible=true;}else{directLight.color=vec3(0.0);directLight.visible=false;}}\n#endif\n#if NUM_RECT_AREA_LIGHTS>0\nstruct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];\n#endif\n#if NUM_HEMI_LIGHTS>0\nstruct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in GeometricContext geometry){float dotNL=dot(geometry.normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreturn irradiance;}\n#endif",
            lights_toon_fragment: "ToonMaterial material;material.diffuseColor=diffuseColor.rgb;",
            lights_toon_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\nstruct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometry.normal,directLight.direction)*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreflectedLight.directDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_Toon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD(material)(0)",
            lights_phong_fragment: "BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;",
            lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreflectedLight.directDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_Specular_BlinnPhong(directLight,geometry,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD(material)(0)",
            lights_physical_fragment: "PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(geometryNormal)),abs(dFdy(geometryNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.specularRoughness=max(roughnessFactor,0.0525);material.specularRoughness+=geometryRoughness;material.specularRoughness=min(material.specularRoughness,1.0);\n#ifdef REFLECTIVITY\nmaterial.specularColor=mix(vec3(MAXIMUM_SPECULAR_COEFFICIENT*pow2(reflectivity)),diffuseColor.rgb,metalnessFactor);\n#else\nmaterial.specularColor=mix(vec3(DEFAULT_SPECULAR_COEFFICIENT),diffuseColor.rgb,metalnessFactor);\n#endif\n#ifdef CLEARCOAT\nmaterial.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;\n#ifdef USE_CLEARCOATMAP\nmaterial.clearcoat*=texture2D(clearcoatMap,vUv).x;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nmaterial.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vUv).y;\n#endif\nmaterial.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);\n#endif\n#ifdef USE_SHEEN\nmaterial.sheenColor=sheen;\n#endif",
            lights_physical_pars_fragment: "struct PhysicalMaterial{vec3 diffuseColor;float specularRoughness;vec3 specularColor;\n#ifdef CLEARCOAT\nfloat clearcoat;float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox(const in float roughness,const in float dotNL){return DEFAULT_SPECULAR_COEFFICIENT+(1.0-DEFAULT_SPECULAR_COEFFICIENT)*(pow(1.0-dotNL,5.0)*pow(1.0-roughness,2.0));}\n#if NUM_RECT_AREA_LIGHTS>0\nvoid RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometry.normal;vec3 viewDir=geometry.viewDir;vec3 position=geometry.position;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.specularRoughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}\n#endif\nvoid RE_Direct_Physical(const in IncidentLight directLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\n#ifdef CLEARCOAT\nfloat ccDotNL=saturate(dot(geometry.clearcoatNormal,directLight.direction));vec3 ccIrradiance=ccDotNL*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nccIrradiance*=PI;\n#endif\nfloat clearcoatDHR=material.clearcoat*clearcoatDHRApprox(material.clearcoatRoughness,ccDotNL);reflectedLight.directSpecular+=ccIrradiance*material.clearcoat*BRDF_Specular_GGX(directLight,geometry.viewDir,geometry.clearcoatNormal,vec3(DEFAULT_SPECULAR_COEFFICIENT),material.clearcoatRoughness);\n#else\nfloat clearcoatDHR=0.0;\n#endif\n#ifdef USE_SHEEN\nreflectedLight.directSpecular+=(1.0-clearcoatDHR)*irradiance*BRDF_Specular_Sheen(material.specularRoughness,directLight.direction,geometry,material.sheenColor);\n#else\nreflectedLight.directSpecular+=(1.0-clearcoatDHR)*irradiance*BRDF_Specular_GGX(directLight,geometry.viewDir,geometry.normal,material.specularColor,material.specularRoughness);\n#endif\nreflectedLight.directDiffuse+=(1.0-clearcoatDHR)*irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){\n#ifdef CLEARCOAT\nfloat ccDotNV=saturate(dot(geometry.clearcoatNormal,geometry.viewDir));reflectedLight.indirectSpecular+=clearcoatRadiance*material.clearcoat*BRDF_Specular_GGX_Environment(geometry.viewDir,geometry.clearcoatNormal,vec3(DEFAULT_SPECULAR_COEFFICIENT),material.clearcoatRoughness);float ccDotNL=ccDotNV;float clearcoatDHR=material.clearcoat*clearcoatDHRApprox(material.clearcoatRoughness,ccDotNL);\n#else\nfloat clearcoatDHR=0.0;\n#endif\nfloat clearcoatInv=1.0-clearcoatDHR;vec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;BRDF_Specular_Multiscattering_Environment(geometry,material.specularColor,material.specularRoughness,singleScattering,multiScattering);vec3 diffuse=material.diffuseColor*(1.0-(singleScattering+multiScattering));reflectedLight.indirectSpecular+=clearcoatInv*radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}\n#define RE_Direct RE_Direct_Physical\n#define RE_Direct_RectArea RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}",
            lights_fragment_begin: "GeometricContext geometry;geometry.position=-vViewPosition;geometry.normal=normal;geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);\n#ifdef CLEARCOAT\ngeometry.clearcoatNormal=clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)\nPointLight pointLight;\n#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointDirectLightIrradiance(pointLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)\npointLightShadow=pointLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)\nSpotLight spotLight;\n#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotDirectLightIrradiance(spotLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)\nspotLightShadow=spotLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)\nDirectionalLight directionalLight;\n#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalDirectLightIrradiance(directionalLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)\ndirectionalLightShadow=directionalLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)\nRectAreaLight rectAreaLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if defined(RE_IndirectDiffuse)\nvec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);irradiance+=getLightProbeIrradiance(lightProbe,geometry);\n#if (NUM_HEMI_LIGHTS>0)\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometry);}\n#pragma unroll_loop_end\n#endif\n#endif\n#if defined(RE_IndirectSpecular)\nvec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);\n#endif",
            lights_fragment_maps: "#if defined(RE_IndirectDiffuse)\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nlightMapIrradiance*=PI;\n#endif\nirradiance+=lightMapIrradiance;\n#endif\n#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)\niblIrradiance+=getLightProbeIndirectIrradiance(geometry,maxMipLevel);\n#endif\n#endif\n#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)\nradiance+=getLightProbeIndirectRadiance(geometry.viewDir,geometry.normal,material.specularRoughness,maxMipLevel);\n#ifdef CLEARCOAT\nclearcoatRadiance+=getLightProbeIndirectRadiance(geometry.viewDir,geometry.clearcoatNormal,material.clearcoatRoughness,maxMipLevel);\n#endif\n#endif",
            lights_fragment_end: "#if defined(RE_IndirectDiffuse)\nRE_IndirectDiffuse(irradiance,geometry,material,reflectedLight);\n#endif\n#if defined(RE_IndirectSpecular)\nRE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometry,material,reflectedLight);\n#endif",
            logdepthbuf_fragment: "#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\ngl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;\n#endif",
            logdepthbuf_pars_fragment: "#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\nuniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;\n#endif",
            logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvarying float vFragDepth;varying float vIsPerspective;\n#else\nuniform float logDepthBufFC;\n#endif\n#endif",
            logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));\n#else\nif(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}\n#endif\n#endif",
            map_fragment: "#ifdef USE_MAP\nvec4 texelColor=texture2D(map,vUv);texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;\n#endif",
            map_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
            map_particle_fragment: "#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nvec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;\n#endif\n#ifdef USE_MAP\nvec4 mapTexel=texture2D(map,uv);diffuseColor*=mapTexelToLinear(mapTexel);\n#endif\n#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,uv).g;\n#endif",
            map_particle_pars_fragment: "#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif",
            metalnessmap_fragment: "float metalnessFactor=metalness;\n#ifdef USE_METALNESSMAP\nvec4 texelMetalness=texture2D(metalnessMap,vUv);metalnessFactor*=texelMetalness.b;\n#endif",
            metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\nuniform sampler2D metalnessMap;\n#endif",
            morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nobjectNormal*=morphTargetBaseInfluence;objectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];\n#endif",
            morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetBaseInfluence;\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[8];\n#else\nuniform float morphTargetInfluences[4];\n#endif\n#endif",
            morphtarget_vertex: "#ifdef USE_MORPHTARGETS\ntransformed*=morphTargetBaseInfluence;transformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];\n#ifndef USE_MORPHNORMALS\ntransformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];\n#endif\n#endif",
            normal_fragment_begin: "float faceDirection=gl_FrontFacing?1.0:-1.0;\n#ifdef FLAT_SHADED\nvec3 fdx=vec3(dFdx(vViewPosition.x),dFdx(vViewPosition.y),dFdx(vViewPosition.z));vec3 fdy=vec3(dFdy(vViewPosition.x),dFdy(vViewPosition.y),dFdy(vViewPosition.z));vec3 normal=normalize(cross(fdx,fdy));\n#else\nvec3 normal=normalize(vNormal);\n#ifdef DOUBLE_SIDED\nnormal=normal*faceDirection;\n#endif\n#ifdef USE_TANGENT\nvec3 tangent=normalize(vTangent);vec3 bitangent=normalize(vBitangent);\n#ifdef DOUBLE_SIDED\ntangent=tangent*faceDirection;bitangent=bitangent*faceDirection;\n#endif\n#if defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP)\nmat3 vTBN=mat3(tangent,bitangent,normal);\n#endif\n#endif\n#endif\nvec3 geometryNormal=normal;",
            normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\nnormal=texture2D(normalMap,vUv).xyz*2.0-1.0;\n#ifdef FLIP_SIDED\nnormal=-normal;\n#endif\n#ifdef DOUBLE_SIDED\nnormal=normal*faceDirection;\n#endif\nnormal=normalize(normalMatrix*normal);\n#elif defined(TANGENTSPACE_NORMALMAP)\nvec3 mapN=texture2D(normalMap,vUv).xyz*2.0-1.0;mapN.xy*=normalScale;\n#ifdef USE_TANGENT\nnormal=normalize(vTBN*mapN);\n#else\nnormal=perturbNormal2Arb(-vViewPosition,normal,mapN,faceDirection);\n#endif\n#elif defined(USE_BUMPMAP)\nnormal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd(),faceDirection);\n#endif",
            normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;uniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nuniform mat3 normalMatrix;\n#endif\n#if !defined(USE_TANGENT)&&(defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP))\nvec3 perturbNormal2Arb(vec3 eye_pos,vec3 surf_norm,vec3 mapN,float faceDirection){vec3 q0=vec3(dFdx(eye_pos.x),dFdx(eye_pos.y),dFdx(eye_pos.z));vec3 q1=vec3(dFdy(eye_pos.x),dFdy(eye_pos.y),dFdy(eye_pos.z));vec2 st0=dFdx(vUv.st);vec2 st1=dFdy(vUv.st);vec3 N=surf_norm;vec3 q1perp=cross(q1,N);vec3 q0perp=cross(N,q0);vec3 T=q1perp*st0.x+q0perp*st1.x;vec3 B=q1perp*st0.y+q0perp*st1.y;float det=max(dot(T,T),dot(B,B));float scale=(det==0.0)?0.0:faceDirection*inversesqrt(det);return normalize(T*(mapN.x*scale)+B*(mapN.y*scale)+N*mapN.z);}\n#endif",
            clearcoat_normal_fragment_begin: "#ifdef CLEARCOAT\nvec3 clearcoatNormal=geometryNormal;\n#endif",
            clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\nvec3 clearcoatMapN=texture2D(clearcoatNormalMap,vUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;\n#ifdef USE_TANGENT\nclearcoatNormal=normalize(vTBN*clearcoatMapN);\n#else\nclearcoatNormal=perturbNormal2Arb(-vViewPosition,clearcoatNormal,clearcoatMapN,faceDirection);\n#endif\n#endif",
            clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\nuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\nuniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;\n#endif",
            packing: "vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float linearClipZ,const in float near,const in float far){return linearClipZ*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float invClipZ,const in float near,const in float far){return(near*far)/((far-near)*invClipZ-far);}",
            premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\ngl_FragColor.rgb*=gl_FragColor.a;\n#endif",
            project_vertex: "vec4 mvPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nmvPosition=instanceMatrix*mvPosition;\n#endif\nmvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;",
            dithering_fragment: "#ifdef DITHERING\ngl_FragColor.rgb=dithering(gl_FragColor.rgb);\n#endif",
            dithering_pars_fragment: "#ifdef DITHERING\nvec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}\n#endif",
            roughnessmap_fragment: "float roughnessFactor=roughness;\n#ifdef USE_ROUGHNESSMAP\nvec4 texelRoughness=texture2D(roughnessMap,vUv);roughnessFactor*=texelRoughness.g;\n#endif",
            roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\nuniform sampler2D roughnessMap;\n#endif",
            shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\nfloat texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bvec4 inFrustumVec=bvec4(shadowCoord.x>=0.0,shadowCoord.x<=1.0,shadowCoord.y>=0.0,shadowCoord.y<=1.0);bool inFrustum=all(inFrustumVec);bvec2 frustumTestVec=bvec2(inFrustum,shadowCoord.z<=1.0);bool frustumTest=all(frustumTestVec);if(frustumTest){\n#if defined(SHADOWMAP_TYPE_PCF)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);\n#elif defined(SHADOWMAP_TYPE_PCF_SOFT)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);\n#elif defined(SHADOWMAP_TYPE_VSM)\nshadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);\n#else\nshadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);\n#endif\n}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);\n#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)\nvec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);\n#else\nreturn texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);\n#endif\n}\n#endif",
            shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform mat4 spotShadowMatrix[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\n#endif",
            shadowmap_vertex: "#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0||NUM_SPOT_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0\nvec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;\n#endif\n#if NUM_DIR_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*spotLightShadows[i].shadowNormalBias,0);vSpotShadowCoord[i]=spotShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#endif",
            shadowmask_pars_fragment: "float getShadowMask(){float shadow=1.0;\n#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}\n#pragma unroll_loop_end\n#endif\n#endif\nreturn shadow;}",
            skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);\n#endif",
            skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;\n#ifdef BONE_TEXTURE\nuniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}\n#else\nuniform mat4 boneMatrices[MAX_BONES];mat4 getBoneMatrix(const in float i){mat4 bone=boneMatrices[int(i)];return bone;}\n#endif\n#endif",
            skinning_vertex: "#ifdef USE_SKINNING\nvec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;\n#endif",
            skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;\n#ifdef USE_TANGENT\nobjectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;\n#endif\n#endif",
            specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular=texture2D(specularMap,vUv);specularStrength=texelSpecular.r;\n#else\nspecularStrength=1.0;\n#endif",
            specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
            tonemapping_fragment: "#if defined(TONE_MAPPING)\ngl_FragColor.rgb=toneMapping(gl_FragColor.rgb);\n#endif",
            tonemapping_pars_fragment: "#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\nuniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return toneMappingExposure*color;}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}",
            transmissionmap_fragment: "#ifdef USE_TRANSMISSIONMAP\ntotalTransmission*=texture2D(transmissionMap,vUv).r;\n#endif",
            transmissionmap_pars_fragment: "#ifdef USE_TRANSMISSIONMAP\nuniform sampler2D transmissionMap;\n#endif",
            uv_pars_fragment: "#if (defined(USE_UV)&&!defined(UVS_VERTEX_ONLY))\nvarying vec2 vUv;\n#endif",
            uv_pars_vertex: "#ifdef USE_UV\n#ifdef UVS_VERTEX_ONLY\nvec2 vUv;\n#else\nvarying vec2 vUv;\n#endif\nuniform mat3 uvTransform;\n#endif",
            uv_vertex: "#ifdef USE_UV\nvUv=(uvTransform*vec3(uv,1)).xy;\n#endif",
            uv2_pars_fragment: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvarying vec2 vUv2;\n#endif",
            uv2_pars_vertex: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nattribute vec2 uv2;varying vec2 vUv2;uniform mat3 uv2Transform;\n#endif",
            uv2_vertex: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvUv2=(uv2Transform*vec3(uv2,1)).xy;\n#endif",
            worldpos_vertex: "#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)\nvec4 worldPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nworldPosition=instanceMatrix*worldPosition;\n#endif\nworldPosition=modelMatrix*worldPosition;\n#endif",
            background_frag: "uniform sampler2D t2D;varying vec2 vUv;void main(){vec4 texColor=texture2D(t2D,vUv);gl_FragColor=mapTexelToLinear(texColor);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
            background_vert: "varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}",
            cube_frag: "#include <envmap_common_pars_fragment>\nuniform float opacity;varying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main(){vec3 vReflect=vWorldDirection;\n#include <envmap_fragment>\ngl_FragColor=envColor;gl_FragColor.a*=opacity;\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
            cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\ngl_Position.z=gl_Position.w;}",
            depth_frag: "#if DEPTH_PACKING==3200\nuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#if DEPTH_PACKING==3200\ndiffuseColor.a=opacity;\n#endif\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <logdepthbuf_fragment>\nfloat fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;\n#if DEPTH_PACKING==3200\ngl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);\n#elif DEPTH_PACKING==3201\ngl_FragColor=packDepthToRGBA(fragCoordZ);\n#endif\n}",
            depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvHighPrecisionZW=gl_Position.zw;}",
            distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\nfloat dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}",
            distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\nvWorldPosition=worldPosition.xyz;}",
            equirect_frag: "uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);vec4 texColor=texture2D(tEquirect,sampleUV);gl_FragColor=mapTexelToLinear(texColor);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
            equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}",
            linedashed_frag: "uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nif(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <color_fragment>\noutgoingLight=diffuseColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}",
            linedashed_vert: "uniform float scale;attribute float lineDistance;varying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){vLineDistance=scale*lineDistance;\n#include <color_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}",
            meshbasic_frag: "uniform vec3 diffuse;uniform float opacity;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\nReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#else\nreflectedLight.indirectDiffuse+=vec3(1.0);\n#endif\n#include <aomap_fragment>\nreflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;\n#include <envmap_fragment>\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <skinbase_vertex>\n#ifdef USE_ENVMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\n#include <envmap_vertex>\n#include <fog_vertex>\n}",
            meshlambert_frag: "uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;varying vec3 vLightFront;varying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;varying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\n#ifdef DOUBLE_SIDED\nreflectedLight.indirectDiffuse+=(gl_FrontFacing)?vIndirectFront:vIndirectBack;\n#else\nreflectedLight.indirectDiffuse+=vIndirectFront;\n#endif\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse*=BRDF_Diffuse_Lambert(diffuseColor.rgb);\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse=(gl_FrontFacing)?vLightFront:vLightBack;\n#else\nreflectedLight.directDiffuse=vLightFront;\n#endif\nreflectedLight.directDiffuse*=BRDF_Diffuse_Lambert(diffuseColor.rgb)*getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;\n#include <envmap_fragment>\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;varying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;varying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\nvec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;\n#ifdef USE_MATCAP\nvec4 matcapColor=texture2D(matcap,uv);matcapColor=matcapTexelToLinear(matcapColor);\n#else\nvec4 matcapColor=vec4(1.0);\n#endif\nvec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\nvViewPosition=-mvPosition.xyz;}",
            meshtoon_frag: "#define TOON\nuniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_toon_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            meshphong_frag: "#define PHONG\nuniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#include <envmap_fragment>\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\nuniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;uniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#ifdef TRANSMISSION\nfloat totalTransmission=transmission;\n#endif\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <clearcoat_normal_fragment_begin>\n#include <clearcoat_normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <transmissionmap_fragment>\n#include <lights_physical_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#ifdef TRANSMISSION\ndiffuseColor.a*=mix(saturate(1.-totalTransmission+linearToRelativeLuminance(reflectedLight.directSpecular+reflectedLight.indirectSpecular)),1.0,metalness);\n#endif\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#ifdef USE_TANGENT\nvTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);\n#endif\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\n#include <logdepthbuf_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\ngl_FragColor=vec4(packNormalToRGB(normal),opacity);}",
            normal_vert: "#define NORMAL\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#ifdef USE_TANGENT\nvTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);\n#endif\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvViewPosition=-mvPosition.xyz;\n#endif\n}",
            points_frag: "uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_particle_fragment>\n#include <color_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}",
            points_vert: "uniform float size;uniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <color_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\ngl_PointSize=size;\n#ifdef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);\n#endif\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <fog_vertex>\n}",
            shadow_frag: "uniform vec3 color;uniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main(){gl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
            shadow_vert: "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main(){\n#include <begin_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            sprite_frag: "uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
            sprite_vert: "uniform float rotation;uniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\nvec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));\n#ifndef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;\n#endif\nvec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}"
        },
        vi = {
            common: {
                diffuse: {
                    value: new _t(15658734)
                },
                opacity: {
                    value: 1
                },
                map: {
                    value: null
                },
                uvTransform: {
                    value: new O
                },
                uv2Transform: {
                    value: new O
                },
                alphaMap: {
                    value: null
                }
            },
            specularmap: {
                specularMap: {
                    value: null
                }
            },
            envmap: {
                envMap: {
                    value: null
                },
                flipEnvMap: {
                    value: -1
                },
                reflectivity: {
                    value: 1
                },
                refractionRatio: {
                    value: .98
                },
                maxMipLevel: {
                    value: 0
                }
            },
            aomap: {
                aoMap: {
                    value: null
                },
                aoMapIntensity: {
                    value: 1
                }
            },
            lightmap: {
                lightMap: {
                    value: null
                },
                lightMapIntensity: {
                    value: 1
                }
            },
            emissivemap: {
                emissiveMap: {
                    value: null
                }
            },
            bumpmap: {
                bumpMap: {
                    value: null
                },
                bumpScale: {
                    value: 1
                }
            },
            normalmap: {
                normalMap: {
                    value: null
                },
                normalScale: {
                    value: new z(1, 1)
                }
            },
            displacementmap: {
                displacementMap: {
                    value: null
                },
                displacementScale: {
                    value: 1
                },
                displacementBias: {
                    value: 0
                }
            },
            roughnessmap: {
                roughnessMap: {
                    value: null
                }
            },
            metalnessmap: {
                metalnessMap: {
                    value: null
                }
            },
            gradientmap: {
                gradientMap: {
                    value: null
                }
            },
            fog: {
                fogDensity: {
                    value: 25e-5
                },
                fogNear: {
                    value: 1
                },
                fogFar: {
                    value: 2e3
                },
                fogColor: {
                    value: new _t(16777215)
                }
            },
            lights: {
                ambientLightColor: {
                    value: []
                },
                lightProbe: {
                    value: []
                },
                directionalLights: {
                    value: [],
                    properties: {
                        direction: {},
                        color: {}
                    }
                },
                directionalLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                directionalShadowMap: {
                    value: []
                },
                directionalShadowMatrix: {
                    value: []
                },
                spotLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        direction: {},
                        distance: {},
                        coneCos: {},
                        penumbraCos: {},
                        decay: {}
                    }
                },
                spotLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                spotShadowMap: {
                    value: []
                },
                spotShadowMatrix: {
                    value: []
                },
                pointLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        decay: {},
                        distance: {}
                    }
                },
                pointLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {},
                        shadowCameraNear: {},
                        shadowCameraFar: {}
                    }
                },
                pointShadowMap: {
                    value: []
                },
                pointShadowMatrix: {
                    value: []
                },
                hemisphereLights: {
                    value: [],
                    properties: {
                        direction: {},
                        skyColor: {},
                        groundColor: {}
                    }
                },
                rectAreaLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        width: {},
                        height: {}
                    }
                },
                ltc_1: {
                    value: null
                },
                ltc_2: {
                    value: null
                }
            },
            points: {
                diffuse: {
                    value: new _t(15658734)
                },
                opacity: {
                    value: 1
                },
                size: {
                    value: 1
                },
                scale: {
                    value: 1
                },
                map: {
                    value: null
                },
                alphaMap: {
                    value: null
                },
                uvTransform: {
                    value: new O
                }
            },
            sprite: {
                diffuse: {
                    value: new _t(15658734)
                },
                opacity: {
                    value: 1
                },
                center: {
                    value: new z(.5, .5)
                },
                rotation: {
                    value: 0
                },
                map: {
                    value: null
                },
                alphaMap: {
                    value: null
                },
                uvTransform: {
                    value: new O
                }
            }
        },
        yi = {
            basic: {
                uniforms: ii([vi.common, vi.specularmap, vi.envmap, vi.aomap, vi.lightmap, vi.fog]),
                vertexShader: _i.meshbasic_vert,
                fragmentShader: _i.meshbasic_frag
            },
            lambert: {
                uniforms: ii([vi.common, vi.specularmap, vi.envmap, vi.aomap, vi.lightmap, vi.emissivemap, vi.fog, vi.lights, {
                    emissive: {
                        value: new _t(0)
                    }
                }]),
                vertexShader: _i.meshlambert_vert,
                fragmentShader: _i.meshlambert_frag
            },
            phong: {
                uniforms: ii([vi.common, vi.specularmap, vi.envmap, vi.aomap, vi.lightmap, vi.emissivemap, vi.bumpmap, vi.normalmap, vi.displacementmap, vi.fog, vi.lights, {
                    emissive: {
                        value: new _t(0)
                    },
                    specular: {
                        value: new _t(1118481)
                    },
                    shininess: {
                        value: 30
                    }
                }]),
                vertexShader: _i.meshphong_vert,
                fragmentShader: _i.meshphong_frag
            },
            standard: {
                uniforms: ii([vi.common, vi.envmap, vi.aomap, vi.lightmap, vi.emissivemap, vi.bumpmap, vi.normalmap, vi.displacementmap, vi.roughnessmap, vi.metalnessmap, vi.fog, vi.lights, {
                    emissive: {
                        value: new _t(0)
                    },
                    roughness: {
                        value: 1
                    },
                    metalness: {
                        value: 0
                    },
                    envMapIntensity: {
                        value: 1
                    }
                }]),
                vertexShader: _i.meshphysical_vert,
                fragmentShader: _i.meshphysical_frag
            },
            toon: {
                uniforms: ii([vi.common, vi.aomap, vi.lightmap, vi.emissivemap, vi.bumpmap, vi.normalmap, vi.displacementmap, vi.gradientmap, vi.fog, vi.lights, {
                    emissive: {
                        value: new _t(0)
                    }
                }]),
                vertexShader: _i.meshtoon_vert,
                fragmentShader: _i.meshtoon_frag
            },
            matcap: {
                uniforms: ii([vi.common, vi.bumpmap, vi.normalmap, vi.displacementmap, vi.fog, {
                    matcap: {
                        value: null
                    }
                }]),
                vertexShader: _i.meshmatcap_vert,
                fragmentShader: _i.meshmatcap_frag
            },
            points: {
                uniforms: ii([vi.points, vi.fog]),
                vertexShader: _i.points_vert,
                fragmentShader: _i.points_frag
            },
            dashed: {
                uniforms: ii([vi.common, vi.fog, {
                    scale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    totalSize: {
                        value: 2
                    }
                }]),
                vertexShader: _i.linedashed_vert,
                fragmentShader: _i.linedashed_frag
            },
            depth: {
                uniforms: ii([vi.common, vi.displacementmap]),
                vertexShader: _i.depth_vert,
                fragmentShader: _i.depth_frag
            },
            normal: {
                uniforms: ii([vi.common, vi.bumpmap, vi.normalmap, vi.displacementmap, {
                    opacity: {
                        value: 1
                    }
                }]),
                vertexShader: _i.normal_vert,
                fragmentShader: _i.normal_frag
            },
            sprite: {
                uniforms: ii([vi.sprite, vi.fog]),
                vertexShader: _i.sprite_vert,
                fragmentShader: _i.sprite_frag
            },
            background: {
                uniforms: {
                    uvTransform: {
                        value: new O
                    },
                    t2D: {
                        value: null
                    }
                },
                vertexShader: _i.background_vert,
                fragmentShader: _i.background_frag
            },
            cube: {
                uniforms: ii([vi.envmap, {
                    opacity: {
                        value: 1
                    }
                }]),
                vertexShader: _i.cube_vert,
                fragmentShader: _i.cube_frag
            },
            equirect: {
                uniforms: {
                    tEquirect: {
                        value: null
                    }
                },
                vertexShader: _i.equirect_vert,
                fragmentShader: _i.equirect_frag
            },
            distanceRGBA: {
                uniforms: ii([vi.common, vi.displacementmap, {
                    referencePosition: {
                        value: new Y
                    },
                    nearDistance: {
                        value: 1
                    },
                    farDistance: {
                        value: 1e3
                    }
                }]),
                vertexShader: _i.distanceRGBA_vert,
                fragmentShader: _i.distanceRGBA_frag
            },
            shadow: {
                uniforms: ii([vi.lights, vi.fog, {
                    color: {
                        value: new _t(0)
                    },
                    opacity: {
                        value: 1
                    }
                }]),
                vertexShader: _i.shadow_vert,
                fragmentShader: _i.shadow_frag
            }
        };

    function Mi(e, t, i, n, r) {
        const a = new _t(0);
        let s, o, l = 0,
            c = null,
            d = 0,
            h = null;

        function u(e, t) {
            i.buffers.color.setClear(e.r, e.g, e.b, t, r)
        }
        return {
            getClearColor: function() {
                return a
            },
            setClearColor: function(e, t = 1) {
                a.set(e), l = t, u(a, l)
            },
            getClearAlpha: function() {
                return l
            },
            setClearAlpha: function(e) {
                l = e, u(a, l)
            },
            render: function(i, r, f, p) {
                let m = !0 === r.isScene ? r.background : null;
                m && m.isTexture && (m = t.get(m));
                const g = e.xr,
                    x = g.getSession && g.getSession();
                x && "additive" === x.environmentBlendMode && (m = null), null === m ? u(a, l) : m && m.isColor && (u(m, 1), p = !0), (e.autoClear || p) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), m && (m.isCubeTexture || 306 === m.mapping) ? (void 0 === o && (o = new Kt(new ei(1, 1, 1), new ri({
                    name: "BackgroundCubeMaterial",
                    uniforms: ti(yi.cube.uniforms),
                    vertexShader: yi.cube.vertexShader,
                    fragmentShader: yi.cube.fragmentShader,
                    side: 1,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                })), o.geometry.deleteAttribute("normal"), o.geometry.deleteAttribute("uv"), o.onBeforeRender = function(e, t, i) {
                    this.matrixWorld.copyPosition(i.matrixWorld)
                }, Object.defineProperty(o.material, "envMap", {
                    get: function() {
                        return this.uniforms.envMap.value
                    }
                }), n.update(o)), o.material.uniforms.envMap.value = m, o.material.uniforms.flipEnvMap.value = m.isCubeTexture && m._needsFlipEnvMap ? -1 : 1, c === m && d === m.version && h === e.toneMapping || (o.material.needsUpdate = !0, c = m, d = m.version, h = e.toneMapping), i.unshift(o, o.geometry, o.material, 0, 0, null)) : m && m.isTexture && (void 0 === s && (s = new Kt(new xi(2, 2), new ri({
                    name: "BackgroundMaterial",
                    uniforms: ti(yi.background.uniforms),
                    vertexShader: yi.background.vertexShader,
                    fragmentShader: yi.background.fragmentShader,
                    side: 0,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                })), s.geometry.deleteAttribute("normal"), Object.defineProperty(s.material, "map", {
                    get: function() {
                        return this.uniforms.t2D.value
                    }
                }), n.update(s)), s.material.uniforms.t2D.value = m, !0 === m.matrixAutoUpdate && m.updateMatrix(), s.material.uniforms.uvTransform.value.copy(m.matrix), c === m && d === m.version && h === e.toneMapping || (s.material.needsUpdate = !0, c = m, d = m.version, h = e.toneMapping), i.unshift(s, s.geometry, s.material, 0, 0, null))
            }
        }
    }

    function bi(e, t, i, n) {
        const r = e.getParameter(34921),
            a = n.isWebGL2 ? null : t.get("OES_vertex_array_object"),
            s = n.isWebGL2 || null !== a,
            o = {},
            l = u(null);
        let c = l;

        function d(t) {
            return n.isWebGL2 ? e.bindVertexArray(t) : a.bindVertexArrayOES(t)
        }

        function h(t) {
            return n.isWebGL2 ? e.deleteVertexArray(t) : a.deleteVertexArrayOES(t)
        }

        function u(e) {
            const t = [],
                i = [],
                n = [];
            for (let e = 0; e < r; e++) t[e] = 0, i[e] = 0, n[e] = 0;
            return {
                geometry: null,
                program: null,
                wireframe: !1,
                newAttributes: t,
                enabledAttributes: i,
                attributeDivisors: n,
                object: e,
                attributes: {},
                index: null
            }
        }

        function f() {
            const e = c.newAttributes;
            for (let t = 0, i = e.length; t < i; t++) e[t] = 0
        }

        function p(e) {
            m(e, 0)
        }

        function m(i, r) {
            const a = c.newAttributes,
                s = c.enabledAttributes,
                o = c.attributeDivisors;
            if (a[i] = 1, 0 === s[i] && (e.enableVertexAttribArray(i), s[i] = 1), o[i] !== r) {
                (n.isWebGL2 ? e : t.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](i, r), o[i] = r
            }
        }

        function g() {
            const t = c.newAttributes,
                i = c.enabledAttributes;
            for (let n = 0, r = i.length; n < r; n++) i[n] !== t[n] && (e.disableVertexAttribArray(n), i[n] = 0)
        }

        function x(t, i, r, a, s, o) {
            !0 !== n.isWebGL2 || 5124 !== r && 5125 !== r ? e.vertexAttribPointer(t, i, r, a, s, o) : e.vertexAttribIPointer(t, i, r, s, o)
        }

        function _() {
            v(), c !== l && (c = l, d(c.object))
        }

        function v() {
            l.geometry = null, l.program = null, l.wireframe = !1
        }
        return {
            setup: function(r, l, h, _, v) {
                let y = !1;
                if (s) {
                    const t = function(t, i, r) {
                        const s = !0 === r.wireframe;
                        let l = o[t.id];
                        void 0 === l && (l = {}, o[t.id] = l);
                        let c = l[i.id];
                        void 0 === c && (c = {}, l[i.id] = c);
                        let d = c[s];
                        void 0 === d && (d = u(n.isWebGL2 ? e.createVertexArray() : a.createVertexArrayOES()), c[s] = d);
                        return d
                    }(_, h, l);
                    c !== t && (c = t, d(c.object)), y = function(e, t) {
                        const i = c.attributes,
                            n = e.attributes;
                        let r = 0;
                        for (const e in n) {
                            const t = i[e],
                                a = n[e];
                            if (void 0 === t) return !0;
                            if (t.attribute !== a) return !0;
                            if (t.data !== a.data) return !0;
                            r++
                        }
                        return c.attributesNum !== r || c.index !== t
                    }(_, v), y && function(e, t) {
                        const i = {},
                            n = e.attributes;
                        let r = 0;
                        for (const e in n) {
                            const t = n[e],
                                a = {};
                            a.attribute = t, t.data && (a.data = t.data), i[e] = a, r++
                        }
                        c.attributes = i, c.attributesNum = r, c.index = t
                    }(_, v)
                } else {
                    const e = !0 === l.wireframe;
                    c.geometry === _.id && c.program === h.id && c.wireframe === e || (c.geometry = _.id, c.program = h.id, c.wireframe = e, y = !0)
                }!0 === r.isInstancedMesh && (y = !0), null !== v && i.update(v, 34963), y && (! function(r, a, s, o) {
                    if (!1 === n.isWebGL2 && (r.isInstancedMesh || o.isInstancedBufferGeometry) && null === t.get("ANGLE_instanced_arrays")) return;
                    f();
                    const l = o.attributes,
                        c = s.getAttributes(),
                        d = a.defaultAttributeValues;
                    for (const t in c) {
                        const n = c[t];
                        if (n >= 0) {
                            const a = l[t];
                            if (void 0 !== a) {
                                const t = a.normalized,
                                    r = a.itemSize,
                                    s = i.get(a);
                                if (void 0 === s) continue;
                                const l = s.buffer,
                                    c = s.type,
                                    d = s.bytesPerElement;
                                if (a.isInterleavedBufferAttribute) {
                                    const i = a.data,
                                        s = i.stride,
                                        h = a.offset;
                                    i && i.isInstancedInterleavedBuffer ? (m(n, i.meshPerAttribute), void 0 === o._maxInstanceCount && (o._maxInstanceCount = i.meshPerAttribute * i.count)) : p(n), e.bindBuffer(34962, l), x(n, r, c, t, s * d, h * d)
                                } else a.isInstancedBufferAttribute ? (m(n, a.meshPerAttribute), void 0 === o._maxInstanceCount && (o._maxInstanceCount = a.meshPerAttribute * a.count)) : p(n), e.bindBuffer(34962, l), x(n, r, c, t, 0, 0)
                            } else if ("instanceMatrix" === t) {
                                const t = i.get(r.instanceMatrix);
                                if (void 0 === t) continue;
                                const a = t.buffer,
                                    s = t.type;
                                m(n + 0, 1), m(n + 1, 1), m(n + 2, 1), m(n + 3, 1), e.bindBuffer(34962, a), e.vertexAttribPointer(n + 0, 4, s, !1, 64, 0), e.vertexAttribPointer(n + 1, 4, s, !1, 64, 16), e.vertexAttribPointer(n + 2, 4, s, !1, 64, 32), e.vertexAttribPointer(n + 3, 4, s, !1, 64, 48)
                            } else if ("instanceColor" === t) {
                                const t = i.get(r.instanceColor);
                                if (void 0 === t) continue;
                                const a = t.buffer,
                                    s = t.type;
                                m(n, 1), e.bindBuffer(34962, a), e.vertexAttribPointer(n, 3, s, !1, 12, 0)
                            } else if (void 0 !== d) {
                                const i = d[t];
                                if (void 0 !== i) switch (i.length) {
                                    case 2:
                                        e.vertexAttrib2fv(n, i);
                                        break;
                                    case 3:
                                        e.vertexAttrib3fv(n, i);
                                        break;
                                    case 4:
                                        e.vertexAttrib4fv(n, i);
                                        break;
                                    default:
                                        e.vertexAttrib1fv(n, i)
                                }
                            }
                        }
                    }
                    g()
                }(r, l, h, _), null !== v && e.bindBuffer(34963, i.get(v).buffer))
            },
            reset: _,
            resetDefaultState: v,
            dispose: function() {
                _();
                for (const e in o) {
                    const t = o[e];
                    for (const e in t) {
                        const i = t[e];
                        for (const e in i) h(i[e].object), delete i[e];
                        delete t[e]
                    }
                    delete o[e]
                }
            },
            releaseStatesOfGeometry: function(e) {
                if (void 0 === o[e.id]) return;
                const t = o[e.id];
                for (const e in t) {
                    const i = t[e];
                    for (const e in i) h(i[e].object), delete i[e];
                    delete t[e]
                }
                delete o[e.id]
            },
            releaseStatesOfProgram: function(e) {
                for (const t in o) {
                    const i = o[t];
                    if (void 0 === i[e.id]) continue;
                    const n = i[e.id];
                    for (const e in n) h(n[e].object), delete n[e];
                    delete i[e.id]
                }
            },
            initAttributes: f,
            enableAttribute: p,
            disableUnusedAttributes: g
        }
    }

    function Ai(e, t, i, n) {
        const r = n.isWebGL2;
        let a;
        this.setMode = function(e) {
            a = e
        }, this.render = function(t, n) {
            e.drawArrays(a, t, n), i.update(n, a, 1)
        }, this.renderInstances = function(n, s, o) {
            if (0 === o) return;
            let l, c;
            if (r) l = e, c = "drawArraysInstanced";
            else if (l = t.get("ANGLE_instanced_arrays"), c = "drawArraysInstancedANGLE", null === l) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            l[c](a, n, s, o), i.update(s, a, o)
        }
    }

    function wi(e, t, i) {
        let n;

        function r(t) {
            if ("highp" === t) {
                if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
                t = "mediump"
            }
            return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
        }
        const a = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && e instanceof WebGL2ComputeRenderingContext;
        let s = void 0 !== i.precision ? i.precision : "highp";
        const o = r(s);
        o !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", o, "instead."), s = o);
        const l = !0 === i.logarithmicDepthBuffer,
            c = e.getParameter(34930),
            d = e.getParameter(35660),
            h = e.getParameter(3379),
            u = e.getParameter(34076),
            f = e.getParameter(34921),
            p = e.getParameter(36347),
            m = e.getParameter(36348),
            g = e.getParameter(36349),
            x = d > 0,
            _ = a || t.has("OES_texture_float");
        return {
            isWebGL2: a,
            getMaxAnisotropy: function() {
                if (void 0 !== n) return n;
                if (!0 === t.has("EXT_texture_filter_anisotropic")) {
                    const i = t.get("EXT_texture_filter_anisotropic");
                    n = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                } else n = 0;
                return n
            },
            getMaxPrecision: r,
            precision: s,
            logarithmicDepthBuffer: l,
            maxTextures: c,
            maxVertexTextures: d,
            maxTextureSize: h,
            maxCubemapSize: u,
            maxAttributes: f,
            maxVertexUniforms: p,
            maxVaryings: m,
            maxFragmentUniforms: g,
            vertexTextures: x,
            floatFragmentTextures: _,
            floatVertexTextures: x && _,
            maxSamples: a ? e.getParameter(36183) : 0
        }
    }

    function Si(e) {
        const t = this;
        let i = null,
            n = 0,
            r = !1,
            a = !1;
        const s = new Ke,
            o = new O,
            l = {
                value: null,
                needsUpdate: !1
            };

        function c() {
            l.value !== i && (l.value = i, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0
        }

        function d(e, i, n, r) {
            const a = null !== e ? e.length : 0;
            let c = null;
            if (0 !== a) {
                if (c = l.value, !0 !== r || null === c) {
                    const t = n + 4 * a,
                        r = i.matrixWorldInverse;
                    o.getNormalMatrix(r), (null === c || c.length < t) && (c = new Float32Array(t));
                    for (let t = 0, i = n; t !== a; ++t, i += 4) s.copy(e[t]).applyMatrix4(r, o), s.normal.toArray(c, i), c[i + 3] = s.constant
                }
                l.value = c, l.needsUpdate = !0
            }
            return t.numPlanes = a, t.numIntersection = 0, c
        }
        this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t, a) {
            const s = 0 !== e.length || t || 0 !== n || r;
            return r = t, i = d(e, a, 0), n = e.length, s
        }, this.beginShadows = function() {
            a = !0, d(null)
        }, this.endShadows = function() {
            a = !1, c()
        }, this.setState = function(t, s, o) {
            const h = t.clippingPlanes,
                u = t.clipIntersection,
                f = t.clipShadows,
                p = e.get(t);
            if (!r || null === h || 0 === h.length || a && !f) a ? d(null) : c();
            else {
                const e = a ? 0 : n,
                    t = 4 * e;
                let r = p.clippingState || null;
                l.value = r, r = d(h, s, t, o);
                for (let e = 0; e !== t; ++e) r[e] = i[e];
                p.clippingState = r, this.numIntersection = u ? this.numPlanes : 0, this.numPlanes += e
            }
        }
    }

    function Ti(e) {
        let t = new WeakMap;

        function i(e, t) {
            return 303 === t ? e.mapping = 301 : 304 === t && (e.mapping = 302), e
        }

        function n(e) {
            const i = e.target;
            i.removeEventListener("dispose", n);
            const r = t.get(i);
            void 0 !== r && (t.delete(i), r.dispose())
        }
        return {
            get: function(r) {
                if (r && r.isTexture) {
                    const a = r.mapping;
                    if (303 === a || 304 === a) {
                        if (t.has(r)) {
                            return i(t.get(r).texture, r.mapping)
                        } {
                            const a = r.image;
                            if (a && a.height > 0) {
                                const s = e.getRenderTarget(),
                                    o = new di(a.height / 2);
                                return o.fromEquirectangularTexture(e, r), t.set(r, o), e.setRenderTarget(s), r.addEventListener("dispose", n), i(o.texture, r.mapping)
                            }
                            return null
                        }
                    }
                }
                return r
            },
            dispose: function() {
                t = new WeakMap
            }
        }
    }

    function Li(e) {
        const t = {};

        function i(i) {
            if (void 0 !== t[i]) return t[i];
            let n;
            switch (i) {
                case "WEBGL_depth_texture":
                    n = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
                    break;
                case "EXT_texture_filter_anisotropic":
                    n = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                    break;
                case "WEBGL_compressed_texture_s3tc":
                    n = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                    break;
                case "WEBGL_compressed_texture_pvrtc":
                    n = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                    break;
                default:
                    n = e.getExtension(i)
            }
            return t[i] = n, n
        }
        return {
            has: function(e) {
                return null !== i(e)
            },
            init: function(e) {
                e.isWebGL2 ? i("EXT_color_buffer_float") : (i("WEBGL_depth_texture"), i("OES_texture_float"), i("OES_texture_half_float"), i("OES_texture_half_float_linear"), i("OES_standard_derivatives"), i("OES_element_index_uint"), i("OES_vertex_array_object"), i("ANGLE_instanced_arrays")), i("OES_texture_float_linear"), i("EXT_color_buffer_half_float")
            },
            get: function(e) {
                const t = i(e);
                return null === t && console.warn("THREE.WebGLRenderer: " + e + " extension not supported."), t
            }
        }
    }

    function Ei(e, t, i, n) {
        const r = {},
            a = new WeakMap;

        function s(e) {
            const o = e.target;
            null !== o.index && t.remove(o.index);
            for (const e in o.attributes) t.remove(o.attributes[e]);
            o.removeEventListener("dispose", s), delete r[o.id];
            const l = a.get(o);
            l && (t.remove(l), a.delete(o)), n.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, i.memory.geometries--
        }

        function o(e) {
            const i = [],
                n = e.index,
                r = e.attributes.position;
            let s = 0;
            if (null !== n) {
                const e = n.array;
                s = n.version;
                for (let t = 0, n = e.length; t < n; t += 3) {
                    const n = e[t + 0],
                        r = e[t + 1],
                        a = e[t + 2];
                    i.push(n, r, r, a, a, n)
                }
            } else {
                const e = r.array;
                s = r.version;
                for (let t = 0, n = e.length / 3 - 1; t < n; t += 3) {
                    const e = t + 0,
                        n = t + 1,
                        r = t + 2;
                    i.push(e, n, n, r, r, e)
                }
            }
            const o = new(Tt(i) > 65535 ? wt : At)(i, 1);
            o.version = s;
            const l = a.get(e);
            l && t.remove(l), a.set(e, o)
        }
        return {
            get: function(e, t) {
                return !0 === r[t.id] || (t.addEventListener("dispose", s), r[t.id] = !0, i.memory.geometries++), t
            },
            update: function(e) {
                const i = e.attributes;
                for (const e in i) t.update(i[e], 34962);
                const n = e.morphAttributes;
                for (const e in n) {
                    const i = n[e];
                    for (let e = 0, n = i.length; e < n; e++) t.update(i[e], 34962)
                }
            },
            getWireframeAttribute: function(e) {
                const t = a.get(e);
                if (t) {
                    const i = e.index;
                    null !== i && t.version < i.version && o(e)
                } else o(e);
                return a.get(e)
            }
        }
    }

    function Pi(e, t, i, n) {
        const r = n.isWebGL2;
        let a, s, o;
        this.setMode = function(e) {
            a = e
        }, this.setIndex = function(e) {
            s = e.type, o = e.bytesPerElement
        }, this.render = function(t, n) {
            e.drawElements(a, n, s, t * o), i.update(n, a, 1)
        }, this.renderInstances = function(n, l, c) {
            if (0 === c) return;
            let d, h;
            if (r) d = e, h = "drawElementsInstanced";
            else if (d = t.get("ANGLE_instanced_arrays"), h = "drawElementsInstancedANGLE", null === d) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            d[h](a, l, s, n * o, c), i.update(l, a, c)
        }
    }

    function Fi(e) {
        const t = {
            frame: 0,
            calls: 0,
            triangles: 0,
            points: 0,
            lines: 0
        };
        return {
            memory: {
                geometries: 0,
                textures: 0
            },
            render: t,
            programs: null,
            autoReset: !0,
            reset: function() {
                t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0
            },
            update: function(e, i, n) {
                switch (t.calls++, i) {
                    case 4:
                        t.triangles += n * (e / 3);
                        break;
                    case 1:
                        t.lines += n * (e / 2);
                        break;
                    case 3:
                        t.lines += n * (e - 1);
                        break;
                    case 2:
                        t.lines += n * e;
                        break;
                    case 0:
                        t.points += n * e;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", i)
                }
            }
        }
    }

    function Ni(e, t) {
        return e[0] - t[0]
    }

    function Ci(e, t) {
        return Math.abs(t[1]) - Math.abs(e[1])
    }

    function Ri(e) {
        const t = {},
            i = new Float32Array(8),
            n = [];
        for (let e = 0; e < 8; e++) n[e] = [e, 0];
        return {
            update: function(r, a, s, o) {
                const l = r.morphTargetInfluences,
                    c = void 0 === l ? 0 : l.length;
                let d = t[a.id];
                if (void 0 === d) {
                    d = [];
                    for (let e = 0; e < c; e++) d[e] = [e, 0];
                    t[a.id] = d
                }
                for (let e = 0; e < c; e++) {
                    const t = d[e];
                    t[0] = e, t[1] = l[e]
                }
                d.sort(Ci);
                for (let e = 0; e < 8; e++) e < c && d[e][1] ? (n[e][0] = d[e][0], n[e][1] = d[e][1]) : (n[e][0] = Number.MAX_SAFE_INTEGER, n[e][1] = 0);
                n.sort(Ni);
                const h = s.morphTargets && a.morphAttributes.position,
                    u = s.morphNormals && a.morphAttributes.normal;
                let f = 0;
                for (let e = 0; e < 8; e++) {
                    const t = n[e],
                        r = t[0],
                        s = t[1];
                    r !== Number.MAX_SAFE_INTEGER && s ? (h && a.getAttribute("morphTarget" + e) !== h[r] && a.setAttribute("morphTarget" + e, h[r]), u && a.getAttribute("morphNormal" + e) !== u[r] && a.setAttribute("morphNormal" + e, u[r]), i[e] = s, f += s) : (h && !0 === a.hasAttribute("morphTarget" + e) && a.deleteAttribute("morphTarget" + e), u && !0 === a.hasAttribute("morphNormal" + e) && a.deleteAttribute("morphNormal" + e), i[e] = 0)
                }
                const p = a.morphTargetsRelative ? 1 : 1 - f;
                o.getUniforms().setValue(e, "morphTargetBaseInfluence", p), o.getUniforms().setValue(e, "morphTargetInfluences", i)
            }
        }
    }

    function Di(e, t, i, n) {
        let r = new WeakMap;

        function a(e) {
            const t = e.target;
            t.removeEventListener("dispose", a), i.remove(t.instanceMatrix), null !== t.instanceColor && i.remove(t.instanceColor)
        }
        return {
            update: function(e) {
                const s = n.render.frame,
                    o = e.geometry,
                    l = t.get(e, o);
                return r.get(l) !== s && (t.update(l), r.set(l, s)), e.isInstancedMesh && (!1 === e.hasEventListener("dispose", a) && e.addEventListener("dispose", a), i.update(e.instanceMatrix, 34962), null !== e.instanceColor && i.update(e.instanceColor, 34962)), l
            },
            dispose: function() {
                r = new WeakMap
            }
        }
    }
    yi.physical = {
        uniforms: ii([yi.standard.uniforms, {
            clearcoat: {
                value: 0
            },
            clearcoatMap: {
                value: null
            },
            clearcoatRoughness: {
                value: 0
            },
            clearcoatRoughnessMap: {
                value: null
            },
            clearcoatNormalScale: {
                value: new z(1, 1)
            },
            clearcoatNormalMap: {
                value: null
            },
            sheen: {
                value: new _t(0)
            },
            transmission: {
                value: 0
            },
            transmissionMap: {
                value: null
            }
        }]),
        vertexShader: _i.meshphysical_vert,
        fragmentShader: _i.meshphysical_frag
    };
    class Ii extends H {
        constructor(e = null, t = 1, i = 1, n = 1) {
            super(null), this.image = {
                data: e,
                width: t,
                height: i,
                depth: n
            }, this.magFilter = u, this.minFilter = u, this.wrapR = d, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
        }
    }
    Ii.prototype.isDataTexture2DArray = !0;
    class Ui extends H {
        constructor(e = null, t = 1, i = 1, n = 1) {
            super(null), this.image = {
                data: e,
                width: t,
                height: i,
                depth: n
            }, this.magFilter = u, this.minFilter = u, this.wrapR = d, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
        }
    }
    Ui.prototype.isDataTexture3D = !0;
    const zi = new H,
        Oi = new Ii,
        Bi = new Ui,
        Gi = new ci,
        Hi = [],
        ki = [],
        Vi = new Float32Array(16),
        Wi = new Float32Array(9),
        Xi = new Float32Array(4);

    function Yi(e, t, i) {
        const n = e[0];
        if (n <= 0 || n > 0) return e;
        const r = t * i;
        let a = Hi[r];
        if (void 0 === a && (a = new Float32Array(r), Hi[r] = a), 0 !== t) {
            n.toArray(a, 0);
            for (let n = 1, r = 0; n !== t; ++n) r += i, e[n].toArray(a, r)
        }
        return a
    }

    function Qi(e, t) {
        if (e.length !== t.length) return !1;
        for (let i = 0, n = e.length; i < n; i++)
            if (e[i] !== t[i]) return !1;
        return !0
    }

    function ji(e, t) {
        for (let i = 0, n = t.length; i < n; i++) e[i] = t[i]
    }

    function qi(e, t) {
        let i = ki[t];
        void 0 === i && (i = new Int32Array(t), ki[t] = i);
        for (let n = 0; n !== t; ++n) i[n] = e.allocateTextureUnit();
        return i
    }

    function Zi(e, t) {
        const i = this.cache;
        i[0] !== t && (e.uniform1f(this.addr, t), i[0] = t)
    }

    function Ji(e, t) {
        const i = this.cache;
        if (void 0 !== t.x) i[0] === t.x && i[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
        else {
            if (Qi(i, t)) return;
            e.uniform2fv(this.addr, t), ji(i, t)
        }
    }

    function Ki(e, t) {
        const i = this.cache;
        if (void 0 !== t.x) i[0] === t.x && i[1] === t.y && i[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
        else if (void 0 !== t.r) i[0] === t.r && i[1] === t.g && i[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), i[0] = t.r, i[1] = t.g, i[2] = t.b);
        else {
            if (Qi(i, t)) return;
            e.uniform3fv(this.addr, t), ji(i, t)
        }
    }

    function $i(e, t) {
        const i = this.cache;
        if (void 0 !== t.x) i[0] === t.x && i[1] === t.y && i[2] === t.z && i[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
        else {
            if (Qi(i, t)) return;
            e.uniform4fv(this.addr, t), ji(i, t)
        }
    }

    function en(e, t) {
        const i = this.cache,
            n = t.elements;
        if (void 0 === n) {
            if (Qi(i, t)) return;
            e.uniformMatrix2fv(this.addr, !1, t), ji(i, t)
        } else {
            if (Qi(i, n)) return;
            Xi.set(n), e.uniformMatrix2fv(this.addr, !1, Xi), ji(i, n)
        }
    }

    function tn(e, t) {
        const i = this.cache,
            n = t.elements;
        if (void 0 === n) {
            if (Qi(i, t)) return;
            e.uniformMatrix3fv(this.addr, !1, t), ji(i, t)
        } else {
            if (Qi(i, n)) return;
            Wi.set(n), e.uniformMatrix3fv(this.addr, !1, Wi), ji(i, n)
        }
    }

    function nn(e, t) {
        const i = this.cache,
            n = t.elements;
        if (void 0 === n) {
            if (Qi(i, t)) return;
            e.uniformMatrix4fv(this.addr, !1, t), ji(i, t)
        } else {
            if (Qi(i, n)) return;
            Vi.set(n), e.uniformMatrix4fv(this.addr, !1, Vi), ji(i, n)
        }
    }

    function rn(e, t) {
        const i = this.cache;
        i[0] !== t && (e.uniform1i(this.addr, t), i[0] = t)
    }

    function an(e, t) {
        const i = this.cache;
        Qi(i, t) || (e.uniform2iv(this.addr, t), ji(i, t))
    }

    function sn(e, t) {
        const i = this.cache;
        Qi(i, t) || (e.uniform3iv(this.addr, t), ji(i, t))
    }

    function on(e, t) {
        const i = this.cache;
        Qi(i, t) || (e.uniform4iv(this.addr, t), ji(i, t))
    }

    function ln(e, t) {
        const i = this.cache;
        i[0] !== t && (e.uniform1ui(this.addr, t), i[0] = t)
    }

    function cn(e, t) {
        const i = this.cache;
        Qi(i, t) || (e.uniform2uiv(this.addr, t), ji(i, t))
    }

    function dn(e, t) {
        const i = this.cache;
        Qi(i, t) || (e.uniform3uiv(this.addr, t), ji(i, t))
    }

    function hn(e, t) {
        const i = this.cache;
        Qi(i, t) || (e.uniform4uiv(this.addr, t), ji(i, t))
    }

    function un(e, t, i) {
        const n = this.cache,
            r = i.allocateTextureUnit();
        n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.safeSetTexture2D(t || zi, r)
    }

    function fn(e, t, i) {
        const n = this.cache,
            r = i.allocateTextureUnit();
        n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture3D(t || Bi, r)
    }

    function pn(e, t, i) {
        const n = this.cache,
            r = i.allocateTextureUnit();
        n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.safeSetTextureCube(t || Gi, r)
    }

    function mn(e, t, i) {
        const n = this.cache,
            r = i.allocateTextureUnit();
        n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture2DArray(t || Oi, r)
    }

    function gn(e, t) {
        e.uniform1fv(this.addr, t)
    }

    function xn(e, t) {
        const i = Yi(t, this.size, 2);
        e.uniform2fv(this.addr, i)
    }

    function _n(e, t) {
        const i = Yi(t, this.size, 3);
        e.uniform3fv(this.addr, i)
    }

    function vn(e, t) {
        const i = Yi(t, this.size, 4);
        e.uniform4fv(this.addr, i)
    }

    function yn(e, t) {
        const i = Yi(t, this.size, 4);
        e.uniformMatrix2fv(this.addr, !1, i)
    }

    function Mn(e, t) {
        const i = Yi(t, this.size, 9);
        e.uniformMatrix3fv(this.addr, !1, i)
    }

    function bn(e, t) {
        const i = Yi(t, this.size, 16);
        e.uniformMatrix4fv(this.addr, !1, i)
    }

    function An(e, t) {
        e.uniform1iv(this.addr, t)
    }

    function wn(e, t) {
        e.uniform2iv(this.addr, t)
    }

    function Sn(e, t) {
        e.uniform3iv(this.addr, t)
    }

    function Tn(e, t) {
        e.uniform4iv(this.addr, t)
    }

    function Ln(e, t) {
        e.uniform1uiv(this.addr, t)
    }

    function En(e, t) {
        e.uniform2uiv(this.addr, t)
    }

    function Pn(e, t) {
        e.uniform3uiv(this.addr, t)
    }

    function Fn(e, t) {
        e.uniform4uiv(this.addr, t)
    }

    function Nn(e, t, i) {
        const n = t.length,
            r = qi(i, n);
        e.uniform1iv(this.addr, r);
        for (let e = 0; e !== n; ++e) i.safeSetTexture2D(t[e] || zi, r[e])
    }

    function Cn(e, t, i) {
        const n = t.length,
            r = qi(i, n);
        e.uniform1iv(this.addr, r);
        for (let e = 0; e !== n; ++e) i.safeSetTextureCube(t[e] || Gi, r[e])
    }

    function Rn(e, t, i) {
        this.id = e, this.addr = i, this.cache = [], this.setValue = function(e) {
            switch (e) {
                case 5126:
                    return Zi;
                case 35664:
                    return Ji;
                case 35665:
                    return Ki;
                case 35666:
                    return $i;
                case 35674:
                    return en;
                case 35675:
                    return tn;
                case 35676:
                    return nn;
                case 5124:
                case 35670:
                    return rn;
                case 35667:
                case 35671:
                    return an;
                case 35668:
                case 35672:
                    return sn;
                case 35669:
                case 35673:
                    return on;
                case 5125:
                    return ln;
                case 36294:
                    return cn;
                case 36295:
                    return dn;
                case 36296:
                    return hn;
                case 35678:
                case 36198:
                case 36298:
                case 36306:
                case 35682:
                    return un;
                case 35679:
                case 36299:
                case 36307:
                    return fn;
                case 35680:
                case 36300:
                case 36308:
                case 36293:
                    return pn;
                case 36289:
                case 36303:
                case 36311:
                case 36292:
                    return mn
            }
        }(t.type)
    }

    function Dn(e, t, i) {
        this.id = e, this.addr = i, this.cache = [], this.size = t.size, this.setValue = function(e) {
            switch (e) {
                case 5126:
                    return gn;
                case 35664:
                    return xn;
                case 35665:
                    return _n;
                case 35666:
                    return vn;
                case 35674:
                    return yn;
                case 35675:
                    return Mn;
                case 35676:
                    return bn;
                case 5124:
                case 35670:
                    return An;
                case 35667:
                case 35671:
                    return wn;
                case 35668:
                case 35672:
                    return Sn;
                case 35669:
                case 35673:
                    return Tn;
                case 5125:
                    return Ln;
                case 36294:
                    return En;
                case 36295:
                    return Pn;
                case 36296:
                    return Fn;
                case 35678:
                case 36198:
                case 36298:
                case 36306:
                case 35682:
                    return Nn;
                case 35680:
                case 36300:
                case 36308:
                case 36293:
                    return Cn
            }
        }(t.type)
    }

    function In(e) {
        this.id = e, this.seq = [], this.map = {}
    }
    Dn.prototype.updateCache = function(e) {
        const t = this.cache;
        e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), ji(t, e)
    }, In.prototype.setValue = function(e, t, i) {
        const n = this.seq;
        for (let r = 0, a = n.length; r !== a; ++r) {
            const a = n[r];
            a.setValue(e, t[a.id], i)
        }
    };
    const Un = /(\w+)(\])?(\[|\.)?/g;

    function zn(e, t) {
        e.seq.push(t), e.map[t.id] = t
    }

    function On(e, t, i) {
        const n = e.name,
            r = n.length;
        for (Un.lastIndex = 0;;) {
            const a = Un.exec(n),
                s = Un.lastIndex;
            let o = a[1];
            const l = "]" === a[2],
                c = a[3];
            if (l && (o |= 0), void 0 === c || "[" === c && s + 2 === r) {
                zn(i, void 0 === c ? new Rn(o, e, t) : new Dn(o, e, t));
                break
            } {
                let e = i.map[o];
                void 0 === e && (e = new In(o), zn(i, e)), i = e
            }
        }
    }

    function Bn(e, t) {
        this.seq = [], this.map = {};
        const i = e.getProgramParameter(t, 35718);
        for (let n = 0; n < i; ++n) {
            const i = e.getActiveUniform(t, n);
            On(i, e.getUniformLocation(t, i.name), this)
        }
    }

    function Gn(e, t, i) {
        const n = e.createShader(t);
        return e.shaderSource(n, i), e.compileShader(n), n
    }
    Bn.prototype.setValue = function(e, t, i, n) {
        const r = this.map[t];
        void 0 !== r && r.setValue(e, i, n)
    }, Bn.prototype.setOptional = function(e, t, i) {
        const n = t[i];
        void 0 !== n && this.setValue(e, i, n)
    }, Bn.upload = function(e, t, i, n) {
        for (let r = 0, a = t.length; r !== a; ++r) {
            const a = t[r],
                s = i[a.id];
            !1 !== s.needsUpdate && a.setValue(e, s.value, n)
        }
    }, Bn.seqWithValue = function(e, t) {
        const i = [];
        for (let n = 0, r = e.length; n !== r; ++n) {
            const r = e[n];
            r.id in t && i.push(r)
        }
        return i
    };
    let Hn = 0;

    function kn(e) {
        switch (e) {
            case S:
                return ["Linear", "( value )"];
            case 3001:
                return ["sRGB", "( value )"];
            case 3002:
                return ["RGBE", "( value )"];
            case 3004:
                return ["RGBM", "( value, 7.0 )"];
            case 3005:
                return ["RGBM", "( value, 16.0 )"];
            case 3006:
                return ["RGBD", "( value, 256.0 )"];
            case 3007:
                return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
            case 3003:
                return ["LogLuv", "( value )"];
            default:
                return console.warn("THREE.WebGLProgram: Unsupported encoding:", e), ["Linear", "( value )"]
        }
    }

    function Vn(e, t, i) {
        const n = e.getShaderParameter(t, 35713),
            r = e.getShaderInfoLog(t).trim();
        if (n && "" === r) return "";
        return "THREE.WebGLShader: gl.getShaderInfoLog() " + i + "\n" + r + function(e) {
            const t = e.split("\n");
            for (let e = 0; e < t.length; e++) t[e] = e + 1 + ": " + t[e];
            return t.join("\n")
        }(e.getShaderSource(t))
    }

    function Wn(e, t) {
        const i = kn(t);
        return "vec4 " + e + "( vec4 value ) { return " + i[0] + "ToLinear" + i[1] + "; }"
    }

    function Xn(e, t) {
        const i = kn(t);
        return "vec4 " + e + "( vec4 value ) { return LinearTo" + i[0] + i[1] + "; }"
    }

    function Yn(e, t) {
        let i;
        switch (t) {
            case 1:
                i = "Linear";
                break;
            case 2:
                i = "Reinhard";
                break;
            case 3:
                i = "OptimizedCineon";
                break;
            case 4:
                i = "ACESFilmic";
                break;
            case 5:
                i = "Custom";
                break;
            default:
                console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), i = "Linear"
        }
        return "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }"
    }

    function Qn(e) {
        return "" !== e
    }

    function jn(e, t) {
        return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
    }

    function qn(e, t) {
        return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection)
    }
    const Zn = /^[ \t]*#include +<([\w\d./]+)>/gm;

    function Jn(e) {
        return e.replace(Zn, Kn)
    }

    function Kn(e, t) {
        const i = _i[t];
        if (void 0 === i) throw new Error("Can not resolve #include <" + t + ">");
        return Jn(i)
    }
    const $n = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
        er = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

    function tr(e) {
        return e.replace(er, nr).replace($n, ir)
    }

    function ir(e, t, i, n) {
        return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), nr(e, t, i, n)
    }

    function nr(e, t, i, n) {
        let r = "";
        for (let e = parseInt(t); e < parseInt(i); e++) r += n.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
        return r
    }

    function rr(e) {
        let t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;";
        return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t
    }

    function ar(e, t, i, n) {
        const r = e.getContext(),
            a = i.defines;
        let s = i.vertexShader,
            o = i.fragmentShader;
        const l = function(e) {
                let t = "SHADOWMAP_TYPE_BASIC";
                return 1 === e.shadowMapType ? t = "SHADOWMAP_TYPE_PCF" : 2 === e.shadowMapType ? t = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === e.shadowMapType && (t = "SHADOWMAP_TYPE_VSM"), t
            }(i),
            c = function(e) {
                let t = "ENVMAP_TYPE_CUBE";
                if (e.envMap) switch (e.envMapMode) {
                    case 301:
                    case 302:
                        t = "ENVMAP_TYPE_CUBE";
                        break;
                    case 306:
                    case 307:
                        t = "ENVMAP_TYPE_CUBE_UV"
                }
                return t
            }(i),
            d = function(e) {
                let t = "ENVMAP_MODE_REFLECTION";
                if (e.envMap) switch (e.envMapMode) {
                    case 302:
                    case 307:
                        t = "ENVMAP_MODE_REFRACTION"
                }
                return t
            }(i),
            h = function(e) {
                let t = "ENVMAP_BLENDING_NONE";
                if (e.envMap) switch (e.combine) {
                    case 0:
                        t = "ENVMAP_BLENDING_MULTIPLY";
                        break;
                    case 1:
                        t = "ENVMAP_BLENDING_MIX";
                        break;
                    case 2:
                        t = "ENVMAP_BLENDING_ADD"
                }
                return t
            }(i),
            u = e.gammaFactor > 0 ? e.gammaFactor : 1,
            f = i.isWebGL2 ? "" : function(e) {
                return [e.extensionDerivatives || e.envMapCubeUV || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (e.extensionShaderTextureLOD || e.envMap) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(Qn).join("\n")
            }(i),
            p = function(e) {
                const t = [];
                for (const i in e) {
                    const n = e[i];
                    !1 !== n && t.push("#define " + i + " " + n)
                }
                return t.join("\n")
            }(a),
            m = r.createProgram();
        let g, x, _ = i.glslVersion ? "#version " + i.glslVersion + "\n" : "";
        i.isRawShaderMaterial ? (g = [p].filter(Qn).join("\n"), g.length > 0 && (g += "\n"), x = [f, p].filter(Qn).join("\n"), x.length > 0 && (x += "\n")) : (g = [rr(i), "#define SHADER_NAME " + i.shaderName, p, i.instancing ? "#define USE_INSTANCING" : "", i.instancingColor ? "#define USE_INSTANCING_COLOR" : "", i.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + u, "#define MAX_BONES " + i.maxBones, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + d : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMap && i.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", i.normalMap && i.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.displacementMap && i.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.vertexTangents ? "#define USE_TANGENT" : "", i.vertexColors ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUvs ? "#define USE_UV" : "", i.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.skinning ? "#define USE_SKINNING" : "", i.useVertexTexture ? "#define BONE_TEXTURE" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals && !1 === i.flatShading ? "#define USE_MORPHNORMALS" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + l : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(Qn).join("\n"), x = [f, rr(i), "#define SHADER_NAME " + i.shaderName, p, i.alphaTest ? "#define ALPHATEST " + i.alphaTest + (i.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + u, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.matcap ? "#define USE_MATCAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + c : "", i.envMap ? "#define " + d : "", i.envMap ? "#define " + h : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMap && i.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", i.normalMap && i.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.sheen ? "#define USE_SHEEN" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.vertexTangents ? "#define USE_TANGENT" : "", i.vertexColors || i.instancingColor ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUvs ? "#define USE_UV" : "", i.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", i.gradientMap ? "#define USE_GRADIENTMAP" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + l : "", i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (i.extensionShaderTextureLOD || i.envMap) && i.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== i.toneMapping ? "#define TONE_MAPPING" : "", 0 !== i.toneMapping ? _i.tonemapping_pars_fragment : "", 0 !== i.toneMapping ? Yn("toneMapping", i.toneMapping) : "", i.dithering ? "#define DITHERING" : "", _i.encodings_pars_fragment, i.map ? Wn("mapTexelToLinear", i.mapEncoding) : "", i.matcap ? Wn("matcapTexelToLinear", i.matcapEncoding) : "", i.envMap ? Wn("envMapTexelToLinear", i.envMapEncoding) : "", i.emissiveMap ? Wn("emissiveMapTexelToLinear", i.emissiveMapEncoding) : "", i.lightMap ? Wn("lightMapTexelToLinear", i.lightMapEncoding) : "", Xn("linearToOutputTexel", i.outputEncoding), i.depthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "", "\n"].filter(Qn).join("\n")), s = Jn(s), s = jn(s, i), s = qn(s, i), o = Jn(o), o = jn(o, i), o = qn(o, i), s = tr(s), o = tr(o), i.isWebGL2 && !0 !== i.isRawShaderMaterial && (_ = "#version 300 es\n", g = ["#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + g, x = ["#define varying in", i.glslVersion === L ? "" : "out highp vec4 pc_fragColor;", i.glslVersion === L ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + x);
        const v = _ + x + o,
            y = Gn(r, 35633, _ + g + s),
            M = Gn(r, 35632, v);
        if (r.attachShader(m, y), r.attachShader(m, M), void 0 !== i.index0AttributeName ? r.bindAttribLocation(m, 0, i.index0AttributeName) : !0 === i.morphTargets && r.bindAttribLocation(m, 0, "position"), r.linkProgram(m), e.debug.checkShaderErrors) {
            const e = r.getProgramInfoLog(m).trim(),
                t = r.getShaderInfoLog(y).trim(),
                i = r.getShaderInfoLog(M).trim();
            let n = !0,
                a = !0;
            if (!1 === r.getProgramParameter(m, 35714)) {
                n = !1;
                const t = Vn(r, y, "vertex"),
                    i = Vn(r, M, "fragment");
                console.error("THREE.WebGLProgram: shader error: ", r.getError(), "gl.VALIDATE_STATUS", r.getProgramParameter(m, 35715), "gl.getProgramInfoLog", e, t, i)
            } else "" !== e ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", e) : "" !== t && "" !== i || (a = !1);
            a && (this.diagnostics = {
                runnable: n,
                programLog: e,
                vertexShader: {
                    log: t,
                    prefix: g
                },
                fragmentShader: {
                    log: i,
                    prefix: x
                }
            })
        }
        let b, A;
        return r.deleteShader(y), r.deleteShader(M), this.getUniforms = function() {
            return void 0 === b && (b = new Bn(r, m)), b
        }, this.getAttributes = function() {
            return void 0 === A && (A = function(e, t) {
                const i = {},
                    n = e.getProgramParameter(t, 35721);
                for (let r = 0; r < n; r++) {
                    const n = e.getActiveAttrib(t, r).name;
                    i[n] = e.getAttribLocation(t, n)
                }
                return i
            }(r, m)), A
        }, this.destroy = function() {
            n.releaseStatesOfProgram(this), r.deleteProgram(m), this.program = void 0
        }, this.name = i.shaderName, this.id = Hn++, this.cacheKey = t, this.usedTimes = 1, this.program = m, this.vertexShader = y, this.fragmentShader = M, this
    }

    function sr(e, t, i, n, r, a) {
        const s = [],
            o = n.isWebGL2,
            l = n.logarithmicDepthBuffer,
            c = n.floatVertexTextures,
            d = n.maxVertexUniforms,
            h = n.vertexTextures;
        let u = n.precision;
        const f = {
                MeshDepthMaterial: "depth",
                MeshDistanceMaterial: "distanceRGBA",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshToonMaterial: "toon",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                MeshMatcapMaterial: "matcap",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points",
                ShadowMaterial: "shadow",
                SpriteMaterial: "sprite"
            },
            p = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "instancingColor", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "vertexAlphas", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "sheen", "transmissionMap"];

        function m(e) {
            let t;
            return e && e.isTexture ? t = e.encoding : e && e.isWebGLRenderTarget ? (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), t = e.texture.encoding) : t = S, t
        }
        return {
            getParameters: function(r, s, p, g, x) {
                const _ = g.fog,
                    v = r.isMeshStandardMaterial ? g.environment : null,
                    y = t.get(r.envMap || v),
                    M = f[r.type],
                    b = x.isSkinnedMesh ? function(e) {
                        const t = e.skeleton.bones;
                        if (c) return 1024; {
                            const e = d,
                                i = Math.floor((e - 20) / 4),
                                n = Math.min(i, t.length);
                            return n < t.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + t.length + " bones. This GPU supports " + n + "."), 0) : n
                        }
                    }(x) : 0;
                let A, w;
                if (null !== r.precision && (u = n.getMaxPrecision(r.precision), u !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", u, "instead.")), M) {
                    const e = yi[M];
                    A = e.vertexShader, w = e.fragmentShader
                } else A = r.vertexShader, w = r.fragmentShader;
                const S = e.getRenderTarget();
                return {
                    isWebGL2: o,
                    shaderID: M,
                    shaderName: r.type,
                    vertexShader: A,
                    fragmentShader: w,
                    defines: r.defines,
                    isRawShaderMaterial: !0 === r.isRawShaderMaterial,
                    glslVersion: r.glslVersion,
                    precision: u,
                    instancing: !0 === x.isInstancedMesh,
                    instancingColor: !0 === x.isInstancedMesh && null !== x.instanceColor,
                    supportsVertexTextures: h,
                    outputEncoding: null !== S ? m(S.texture) : e.outputEncoding,
                    map: !!r.map,
                    mapEncoding: m(r.map),
                    matcap: !!r.matcap,
                    matcapEncoding: m(r.matcap),
                    envMap: !!y,
                    envMapMode: y && y.mapping,
                    envMapEncoding: m(y),
                    envMapCubeUV: !!y && (306 === y.mapping || 307 === y.mapping),
                    lightMap: !!r.lightMap,
                    lightMapEncoding: m(r.lightMap),
                    aoMap: !!r.aoMap,
                    emissiveMap: !!r.emissiveMap,
                    emissiveMapEncoding: m(r.emissiveMap),
                    bumpMap: !!r.bumpMap,
                    normalMap: !!r.normalMap,
                    objectSpaceNormalMap: 1 === r.normalMapType,
                    tangentSpaceNormalMap: 0 === r.normalMapType,
                    clearcoatMap: !!r.clearcoatMap,
                    clearcoatRoughnessMap: !!r.clearcoatRoughnessMap,
                    clearcoatNormalMap: !!r.clearcoatNormalMap,
                    displacementMap: !!r.displacementMap,
                    roughnessMap: !!r.roughnessMap,
                    metalnessMap: !!r.metalnessMap,
                    specularMap: !!r.specularMap,
                    alphaMap: !!r.alphaMap,
                    gradientMap: !!r.gradientMap,
                    sheen: !!r.sheen,
                    transmissionMap: !!r.transmissionMap,
                    combine: r.combine,
                    vertexTangents: r.normalMap && r.vertexTangents,
                    vertexColors: r.vertexColors,
                    vertexAlphas: !0 === r.vertexColors && x.geometry && x.geometry.attributes.color && 4 === x.geometry.attributes.color.itemSize,
                    vertexUvs: !!(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatMap || r.clearcoatRoughnessMap || r.clearcoatNormalMap || r.displacementMap || r.transmissionMap),
                    uvsVertexOnly: !(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatNormalMap || r.transmissionMap || !r.displacementMap),
                    fog: !!_,
                    useFog: r.fog,
                    fogExp2: _ && _.isFogExp2,
                    flatShading: !!r.flatShading,
                    sizeAttenuation: r.sizeAttenuation,
                    logarithmicDepthBuffer: l,
                    skinning: r.skinning && b > 0,
                    maxBones: b,
                    useVertexTexture: c,
                    morphTargets: r.morphTargets,
                    morphNormals: r.morphNormals,
                    numDirLights: s.directional.length,
                    numPointLights: s.point.length,
                    numSpotLights: s.spot.length,
                    numRectAreaLights: s.rectArea.length,
                    numHemiLights: s.hemi.length,
                    numDirLightShadows: s.directionalShadowMap.length,
                    numPointLightShadows: s.pointShadowMap.length,
                    numSpotLightShadows: s.spotShadowMap.length,
                    numClippingPlanes: a.numPlanes,
                    numClipIntersection: a.numIntersection,
                    dithering: r.dithering,
                    shadowMapEnabled: e.shadowMap.enabled && p.length > 0,
                    shadowMapType: e.shadowMap.type,
                    toneMapping: r.toneMapped ? e.toneMapping : 0,
                    physicallyCorrectLights: e.physicallyCorrectLights,
                    premultipliedAlpha: r.premultipliedAlpha,
                    alphaTest: r.alphaTest,
                    doubleSided: 2 === r.side,
                    flipSided: 1 === r.side,
                    depthPacking: void 0 !== r.depthPacking && r.depthPacking,
                    index0AttributeName: r.index0AttributeName,
                    extensionDerivatives: r.extensions && r.extensions.derivatives,
                    extensionFragDepth: r.extensions && r.extensions.fragDepth,
                    extensionDrawBuffers: r.extensions && r.extensions.drawBuffers,
                    extensionShaderTextureLOD: r.extensions && r.extensions.shaderTextureLOD,
                    rendererExtensionFragDepth: o || i.has("EXT_frag_depth"),
                    rendererExtensionDrawBuffers: o || i.has("WEBGL_draw_buffers"),
                    rendererExtensionShaderTextureLod: o || i.has("EXT_shader_texture_lod"),
                    customProgramCacheKey: r.customProgramCacheKey()
                }
            },
            getProgramCacheKey: function(t) {
                const i = [];
                if (t.shaderID ? i.push(t.shaderID) : (i.push(t.fragmentShader), i.push(t.vertexShader)), void 0 !== t.defines)
                    for (const e in t.defines) i.push(e), i.push(t.defines[e]);
                if (!1 === t.isRawShaderMaterial) {
                    for (let e = 0; e < p.length; e++) i.push(t[p[e]]);
                    i.push(e.outputEncoding), i.push(e.gammaFactor)
                }
                return i.push(t.customProgramCacheKey), i.join()
            },
            getUniforms: function(e) {
                const t = f[e.type];
                let i;
                if (t) {
                    const e = yi[t];
                    i = ni.clone(e.uniforms)
                } else i = e.uniforms;
                return i
            },
            acquireProgram: function(t, i) {
                let n;
                for (let e = 0, t = s.length; e < t; e++) {
                    const t = s[e];
                    if (t.cacheKey === i) {
                        n = t, ++n.usedTimes;
                        break
                    }
                }
                return void 0 === n && (n = new ar(e, i, t, r), s.push(n)), n
            },
            releaseProgram: function(e) {
                if (0 == --e.usedTimes) {
                    const t = s.indexOf(e);
                    s[t] = s[s.length - 1], s.pop(), e.destroy()
                }
            },
            programs: s
        }
    }

    function or() {
        let e = new WeakMap;
        return {
            get: function(t) {
                let i = e.get(t);
                return void 0 === i && (i = {}, e.set(t, i)), i
            },
            remove: function(t) {
                e.delete(t)
            },
            update: function(t, i, n) {
                e.get(t)[i] = n
            },
            dispose: function() {
                e = new WeakMap
            }
        }
    }

    function lr(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.program !== t.program ? e.program.id - t.program.id : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
    }

    function cr(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
    }

    function dr(e) {
        const t = [];
        let i = 0;
        const n = [],
            r = [],
            a = {
                id: -1
            };

        function s(n, r, s, o, l, c) {
            let d = t[i];
            const h = e.get(s);
            return void 0 === d ? (d = {
                id: n.id,
                object: n,
                geometry: r,
                material: s,
                program: h.program || a,
                groupOrder: o,
                renderOrder: n.renderOrder,
                z: l,
                group: c
            }, t[i] = d) : (d.id = n.id, d.object = n, d.geometry = r, d.material = s, d.program = h.program || a, d.groupOrder = o, d.renderOrder = n.renderOrder, d.z = l, d.group = c), i++, d
        }
        return {
            opaque: n,
            transparent: r,
            init: function() {
                i = 0, n.length = 0, r.length = 0
            },
            push: function(e, t, i, a, o, l) {
                const c = s(e, t, i, a, o, l);
                (!0 === i.transparent ? r : n).push(c)
            },
            unshift: function(e, t, i, a, o, l) {
                const c = s(e, t, i, a, o, l);
                (!0 === i.transparent ? r : n).unshift(c)
            },
            finish: function() {
                for (let e = i, n = t.length; e < n; e++) {
                    const i = t[e];
                    if (null === i.id) break;
                    i.id = null, i.object = null, i.geometry = null, i.material = null, i.program = null, i.group = null
                }
            },
            sort: function(e, t) {
                n.length > 1 && n.sort(e || lr), r.length > 1 && r.sort(t || cr)
            }
        }
    }

    function hr(e) {
        let t = new WeakMap;
        return {
            get: function(i, n) {
                let r;
                return !1 === t.has(i) ? (r = new dr(e), t.set(i, [r])) : n >= t.get(i).length ? (r = new dr(e), t.get(i).push(r)) : r = t.get(i)[n], r
            },
            dispose: function() {
                t = new WeakMap
            }
        }
    }

    function ur() {
        const e = {};
        return {
            get: function(t) {
                if (void 0 !== e[t.id]) return e[t.id];
                let i;
                switch (t.type) {
                    case "DirectionalLight":
                        i = {
                            direction: new Y,
                            color: new _t
                        };
                        break;
                    case "SpotLight":
                        i = {
                            position: new Y,
                            direction: new Y,
                            color: new _t,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0
                        };
                        break;
                    case "PointLight":
                        i = {
                            position: new Y,
                            color: new _t,
                            distance: 0,
                            decay: 0
                        };
                        break;
                    case "HemisphereLight":
                        i = {
                            direction: new Y,
                            skyColor: new _t,
                            groundColor: new _t
                        };
                        break;
                    case "RectAreaLight":
                        i = {
                            color: new _t,
                            position: new Y,
                            halfWidth: new Y,
                            halfHeight: new Y
                        }
                }
                return e[t.id] = i, i
            }
        }
    }
    let fr = 0;

    function pr(e, t) {
        return (t.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0)
    }

    function mr(e, t) {
        const i = new ur,
            n = function() {
                const e = {};
                return {
                    get: function(t) {
                        if (void 0 !== e[t.id]) return e[t.id];
                        let i;
                        switch (t.type) {
                            case "DirectionalLight":
                            case "SpotLight":
                                i = {
                                    shadowBias: 0,
                                    shadowNormalBias: 0,
                                    shadowRadius: 1,
                                    shadowMapSize: new z
                                };
                                break;
                            case "PointLight":
                                i = {
                                    shadowBias: 0,
                                    shadowNormalBias: 0,
                                    shadowRadius: 1,
                                    shadowMapSize: new z,
                                    shadowCameraNear: 1,
                                    shadowCameraFar: 1e3
                                }
                        }
                        return e[t.id] = i, i
                    }
                }
            }(),
            r = {
                version: 0,
                hash: {
                    directionalLength: -1,
                    pointLength: -1,
                    spotLength: -1,
                    rectAreaLength: -1,
                    hemiLength: -1,
                    numDirectionalShadows: -1,
                    numPointShadows: -1,
                    numSpotShadows: -1
                },
                ambient: [0, 0, 0],
                probe: [],
                directional: [],
                directionalShadow: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadow: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                rectArea: [],
                rectAreaLTC1: null,
                rectAreaLTC2: null,
                point: [],
                pointShadow: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: []
            };
        for (let e = 0; e < 9; e++) r.probe.push(new Y);
        const a = new Y,
            s = new Ae,
            o = new Ae;
        return {
            setup: function(a) {
                let s = 0,
                    o = 0,
                    l = 0;
                for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
                let c = 0,
                    d = 0,
                    h = 0,
                    u = 0,
                    f = 0,
                    p = 0,
                    m = 0,
                    g = 0;
                a.sort(pr);
                for (let e = 0, t = a.length; e < t; e++) {
                    const t = a[e],
                        x = t.color,
                        _ = t.intensity,
                        v = t.distance,
                        y = t.shadow && t.shadow.map ? t.shadow.map.texture : null;
                    if (t.isAmbientLight) s += x.r * _, o += x.g * _, l += x.b * _;
                    else if (t.isLightProbe)
                        for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(t.sh.coefficients[e], _);
                    else if (t.isDirectionalLight) {
                        const e = i.get(t);
                        if (e.color.copy(t.color).multiplyScalar(t.intensity), t.castShadow) {
                            const e = t.shadow,
                                i = n.get(t);
                            i.shadowBias = e.bias, i.shadowNormalBias = e.normalBias, i.shadowRadius = e.radius, i.shadowMapSize = e.mapSize, r.directionalShadow[c] = i, r.directionalShadowMap[c] = y, r.directionalShadowMatrix[c] = t.shadow.matrix, p++
                        }
                        r.directional[c] = e, c++
                    } else if (t.isSpotLight) {
                        const e = i.get(t);
                        if (e.position.setFromMatrixPosition(t.matrixWorld), e.color.copy(x).multiplyScalar(_), e.distance = v, e.coneCos = Math.cos(t.angle), e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra)), e.decay = t.decay, t.castShadow) {
                            const e = t.shadow,
                                i = n.get(t);
                            i.shadowBias = e.bias, i.shadowNormalBias = e.normalBias, i.shadowRadius = e.radius, i.shadowMapSize = e.mapSize, r.spotShadow[h] = i, r.spotShadowMap[h] = y, r.spotShadowMatrix[h] = t.shadow.matrix, g++
                        }
                        r.spot[h] = e, h++
                    } else if (t.isRectAreaLight) {
                        const e = i.get(t);
                        e.color.copy(x).multiplyScalar(_), e.halfWidth.set(.5 * t.width, 0, 0), e.halfHeight.set(0, .5 * t.height, 0), r.rectArea[u] = e, u++
                    } else if (t.isPointLight) {
                        const e = i.get(t);
                        if (e.color.copy(t.color).multiplyScalar(t.intensity), e.distance = t.distance, e.decay = t.decay, t.castShadow) {
                            const e = t.shadow,
                                i = n.get(t);
                            i.shadowBias = e.bias, i.shadowNormalBias = e.normalBias, i.shadowRadius = e.radius, i.shadowMapSize = e.mapSize, i.shadowCameraNear = e.camera.near, i.shadowCameraFar = e.camera.far, r.pointShadow[d] = i, r.pointShadowMap[d] = y, r.pointShadowMatrix[d] = t.shadow.matrix, m++
                        }
                        r.point[d] = e, d++
                    } else if (t.isHemisphereLight) {
                        const e = i.get(t);
                        e.skyColor.copy(t.color).multiplyScalar(_), e.groundColor.copy(t.groundColor).multiplyScalar(_), r.hemi[f] = e, f++
                    }
                }
                u > 0 && (t.isWebGL2 || !0 === e.has("OES_texture_float_linear") ? (r.rectAreaLTC1 = vi.LTC_FLOAT_1, r.rectAreaLTC2 = vi.LTC_FLOAT_2) : !0 === e.has("OES_texture_half_float_linear") ? (r.rectAreaLTC1 = vi.LTC_HALF_1, r.rectAreaLTC2 = vi.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), r.ambient[0] = s, r.ambient[1] = o, r.ambient[2] = l;
                const x = r.hash;
                x.directionalLength === c && x.pointLength === d && x.spotLength === h && x.rectAreaLength === u && x.hemiLength === f && x.numDirectionalShadows === p && x.numPointShadows === m && x.numSpotShadows === g || (r.directional.length = c, r.spot.length = h, r.rectArea.length = u, r.point.length = d, r.hemi.length = f, r.directionalShadow.length = p, r.directionalShadowMap.length = p, r.pointShadow.length = m, r.pointShadowMap.length = m, r.spotShadow.length = g, r.spotShadowMap.length = g, r.directionalShadowMatrix.length = p, r.pointShadowMatrix.length = m, r.spotShadowMatrix.length = g, x.directionalLength = c, x.pointLength = d, x.spotLength = h, x.rectAreaLength = u, x.hemiLength = f, x.numDirectionalShadows = p, x.numPointShadows = m, x.numSpotShadows = g, r.version = fr++)
            },
            setupView: function(e, t) {
                let i = 0,
                    n = 0,
                    l = 0,
                    c = 0,
                    d = 0;
                const h = t.matrixWorldInverse;
                for (let t = 0, u = e.length; t < u; t++) {
                    const u = e[t];
                    if (u.isDirectionalLight) {
                        const e = r.directional[i];
                        e.direction.setFromMatrixPosition(u.matrixWorld), a.setFromMatrixPosition(u.target.matrixWorld), e.direction.sub(a), e.direction.transformDirection(h), i++
                    } else if (u.isSpotLight) {
                        const e = r.spot[l];
                        e.position.setFromMatrixPosition(u.matrixWorld), e.position.applyMatrix4(h), e.direction.setFromMatrixPosition(u.matrixWorld), a.setFromMatrixPosition(u.target.matrixWorld), e.direction.sub(a), e.direction.transformDirection(h), l++
                    } else if (u.isRectAreaLight) {
                        const e = r.rectArea[c];
                        e.position.setFromMatrixPosition(u.matrixWorld), e.position.applyMatrix4(h), o.identity(), s.copy(u.matrixWorld), s.premultiply(h), o.extractRotation(s), e.halfWidth.set(.5 * u.width, 0, 0), e.halfHeight.set(0, .5 * u.height, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), c++
                    } else if (u.isPointLight) {
                        const e = r.point[n];
                        e.position.setFromMatrixPosition(u.matrixWorld), e.position.applyMatrix4(h), n++
                    } else if (u.isHemisphereLight) {
                        const e = r.hemi[d];
                        e.direction.setFromMatrixPosition(u.matrixWorld), e.direction.transformDirection(h), e.direction.normalize(), d++
                    }
                }
            },
            state: r
        }
    }

    function gr(e, t) {
        const i = new mr(e, t),
            n = [],
            r = [];
        return {
            init: function() {
                n.length = 0, r.length = 0
            },
            state: {
                lightsArray: n,
                shadowsArray: r,
                lights: i
            },
            setupLights: function() {
                i.setup(n)
            },
            setupLightsView: function(e) {
                i.setupView(n, e)
            },
            pushLight: function(e) {
                n.push(e)
            },
            pushShadow: function(e) {
                r.push(e)
            }
        }
    }

    function xr(e, t) {
        let i = new WeakMap;
        return {
            get: function(n, r = 0) {
                let a;
                return !1 === i.has(n) ? (a = new gr(e, t), i.set(n, [a])) : r >= i.get(n).length ? (a = new gr(e, t), i.get(n).push(a)) : a = i.get(n)[r], a
            },
            dispose: function() {
                i = new WeakMap
            }
        }
    }
    class _r extends ht {
        constructor(e) {
            super(), this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.setValues(e)
        }
        copy(e) {
            return super.copy(e), this.depthPacking = e.depthPacking, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
        }
    }
    _r.prototype.isMeshDepthMaterial = !0;
    class vr extends ht {
        constructor(e) {
            super(), this.type = "MeshDistanceMaterial", this.referencePosition = new Y, this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.setValues(e)
        }
        copy(e) {
            return super.copy(e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this
        }
    }
    vr.prototype.isMeshDistanceMaterial = !0;

    function yr(e, t, i) {
        let n = new pi;
        const r = new z,
            a = new z,
            s = new V,
            o = [],
            l = [],
            c = {},
            d = i.maxTextureSize,
            h = {
                0: 1,
                1: 0,
                2: 2
            },
            p = new ri({
                defines: {
                    SAMPLE_RATE: 2 / 8,
                    HALF_SAMPLE_RATE: 1 / 8
                },
                uniforms: {
                    shadow_pass: {
                        value: null
                    },
                    resolution: {
                        value: new z
                    },
                    radius: {
                        value: 4
                    }
                },
                vertexShader: "void main(){gl_Position=vec4(position,1.0);}",
                fragmentShader: "uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;\n#include <packing>\nvoid main(){float mean=0.0;float squared_mean=0.0;float depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy)/resolution));for(float i=-1.0;i<1.0;i+=SAMPLE_RATE){\n#ifdef HORIZONTAL_PASS\nvec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(i,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;\n#else\nfloat depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,i)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;\n#endif\n}mean=mean*HALF_SAMPLE_RATE;squared_mean=squared_mean*HALF_SAMPLE_RATE;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}"
            }),
            m = p.clone();
        m.defines.HORIZONTAL_PASS = 1;
        const g = new Dt;
        g.setAttribute("position", new bt(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
        const x = new Kt(g, p),
            _ = this;

        function v(i, n) {
            const r = t.update(x);
            p.uniforms.shadow_pass.value = i.map.texture, p.uniforms.resolution.value = i.mapSize, p.uniforms.radius.value = i.radius, e.setRenderTarget(i.mapPass), e.clear(), e.renderBufferDirect(n, null, r, p, x, null), m.uniforms.shadow_pass.value = i.mapPass.texture, m.uniforms.resolution.value = i.mapSize, m.uniforms.radius.value = i.radius, e.setRenderTarget(i.map), e.clear(), e.renderBufferDirect(n, null, r, m, x, null)
        }

        function y(e, t, i) {
            const n = e << 0 | t << 1 | i << 2;
            let r = o[n];
            return void 0 === r && (r = new _r({
                depthPacking: 3201,
                morphTargets: e,
                skinning: t
            }), o[n] = r), r
        }

        function M(e, t, i) {
            const n = e << 0 | t << 1 | i << 2;
            let r = l[n];
            return void 0 === r && (r = new vr({
                morphTargets: e,
                skinning: t
            }), l[n] = r), r
        }

        function A(t, i, n, r, a, s, o) {
            let l = null,
                d = y,
                u = t.customDepthMaterial;
            if (!0 === r.isPointLight && (d = M, u = t.customDistanceMaterial), void 0 === u) {
                let e = !1;
                !0 === n.morphTargets && (e = i.morphAttributes && i.morphAttributes.position && i.morphAttributes.position.length > 0);
                let r = !1;
                !0 === t.isSkinnedMesh && (!0 === n.skinning ? r = !0 : console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", t));
                l = d(e, r, !0 === t.isInstancedMesh)
            } else l = u;
            if (e.localClippingEnabled && !0 === n.clipShadows && 0 !== n.clippingPlanes.length) {
                const e = l.uuid,
                    t = n.uuid;
                let i = c[e];
                void 0 === i && (i = {}, c[e] = i);
                let r = i[t];
                void 0 === r && (r = l.clone(), i[t] = r), l = r
            }
            return l.visible = n.visible, l.wireframe = n.wireframe, l.side = 3 === o ? null !== n.shadowSide ? n.shadowSide : n.side : null !== n.shadowSide ? n.shadowSide : h[n.side], l.clipShadows = n.clipShadows, l.clippingPlanes = n.clippingPlanes, l.clipIntersection = n.clipIntersection, l.wireframeLinewidth = n.wireframeLinewidth, l.linewidth = n.linewidth, !0 === r.isPointLight && !0 === l.isMeshDistanceMaterial && (l.referencePosition.setFromMatrixPosition(r.matrixWorld), l.nearDistance = a, l.farDistance = s), l
        }

        function w(i, r, a, s, o) {
            if (!1 === i.visible) return;
            if (i.layers.test(r.layers) && (i.isMesh || i.isLine || i.isPoints) && (i.castShadow || i.receiveShadow && 3 === o) && (!i.frustumCulled || n.intersectsObject(i))) {
                i.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, i.matrixWorld);
                const n = t.update(i),
                    r = i.material;
                if (Array.isArray(r)) {
                    const t = n.groups;
                    for (let l = 0, c = t.length; l < c; l++) {
                        const c = t[l],
                            d = r[c.materialIndex];
                        if (d && d.visible) {
                            const t = A(i, n, d, s, a.near, a.far, o);
                            e.renderBufferDirect(a, null, n, t, i, c)
                        }
                    }
                } else if (r.visible) {
                    const t = A(i, n, r, s, a.near, a.far, o);
                    e.renderBufferDirect(a, null, n, t, i, null)
                }
            }
            const l = i.children;
            for (let e = 0, t = l.length; e < t; e++) w(l[e], r, a, s, o)
        }
        this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1, this.render = function(t, i, o) {
            if (!1 === _.enabled) return;
            if (!1 === _.autoUpdate && !1 === _.needsUpdate) return;
            if (0 === t.length) return;
            const l = e.getRenderTarget(),
                c = e.getActiveCubeFace(),
                h = e.getActiveMipmapLevel(),
                p = e.state;
            p.setBlending(0), p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), p.setScissorTest(!1);
            for (let l = 0, c = t.length; l < c; l++) {
                const c = t[l],
                    h = c.shadow;
                if (void 0 === h) {
                    console.warn("THREE.WebGLShadowMap:", c, "has no shadow.");
                    continue
                }
                if (!1 === h.autoUpdate && !1 === h.needsUpdate) continue;
                r.copy(h.mapSize);
                const m = h.getFrameExtents();
                if (r.multiply(m), a.copy(h.mapSize), (r.x > d || r.y > d) && (r.x > d && (a.x = Math.floor(d / m.x), r.x = a.x * m.x, h.mapSize.x = a.x), r.y > d && (a.y = Math.floor(d / m.y), r.y = a.y * m.y, h.mapSize.y = a.y)), null === h.map && !h.isPointLightShadow && 3 === this.type) {
                    const e = {
                        minFilter: f,
                        magFilter: f,
                        format: b
                    };
                    h.map = new W(r.x, r.y, e), h.map.texture.name = c.name + ".shadowMap", h.mapPass = new W(r.x, r.y, e), h.camera.updateProjectionMatrix()
                }
                if (null === h.map) {
                    const e = {
                        minFilter: u,
                        magFilter: u,
                        format: b
                    };
                    h.map = new W(r.x, r.y, e), h.map.texture.name = c.name + ".shadowMap", h.camera.updateProjectionMatrix()
                }
                e.setRenderTarget(h.map), e.clear();
                const g = h.getViewportCount();
                for (let e = 0; e < g; e++) {
                    const t = h.getViewport(e);
                    s.set(a.x * t.x, a.y * t.y, a.x * t.z, a.y * t.w), p.viewport(s), h.updateMatrices(c, e), n = h.getFrustum(), w(i, o, h.camera, c, this.type)
                }
                h.isPointLightShadow || 3 !== this.type || v(h, o), h.needsUpdate = !1
            }
            _.needsUpdate = !1, e.setRenderTarget(l, c, h)
        }
    }

    function Mr(e, t, i) {
        const n = i.isWebGL2;
        const r = new function() {
                let t = !1;
                const i = new V;
                let n = null;
                const r = new V(0, 0, 0, 0);
                return {
                    setMask: function(i) {
                        n === i || t || (e.colorMask(i, i, i, i), n = i)
                    },
                    setLocked: function(e) {
                        t = e
                    },
                    setClear: function(t, n, a, s, o) {
                        !0 === o && (t *= s, n *= s, a *= s), i.set(t, n, a, s), !1 === r.equals(i) && (e.clearColor(t, n, a, s), r.copy(i))
                    },
                    reset: function() {
                        t = !1, n = null, r.set(-1, 0, 0, 0)
                    }
                }
            },
            a = new function() {
                let t = !1,
                    i = null,
                    n = null,
                    r = null;
                return {
                    setTest: function(e) {
                        e ? U(2929) : z(2929)
                    },
                    setMask: function(n) {
                        i === n || t || (e.depthMask(n), i = n)
                    },
                    setFunc: function(t) {
                        if (n !== t) {
                            if (t) switch (t) {
                                case 0:
                                    e.depthFunc(512);
                                    break;
                                case 1:
                                    e.depthFunc(519);
                                    break;
                                case 2:
                                    e.depthFunc(513);
                                    break;
                                case 3:
                                    e.depthFunc(515);
                                    break;
                                case 4:
                                    e.depthFunc(514);
                                    break;
                                case 5:
                                    e.depthFunc(518);
                                    break;
                                case 6:
                                    e.depthFunc(516);
                                    break;
                                case 7:
                                    e.depthFunc(517);
                                    break;
                                default:
                                    e.depthFunc(515)
                            } else e.depthFunc(515);
                            n = t
                        }
                    },
                    setLocked: function(e) {
                        t = e
                    },
                    setClear: function(t) {
                        r !== t && (e.clearDepth(t), r = t)
                    },
                    reset: function() {
                        t = !1, i = null, n = null, r = null
                    }
                }
            },
            s = new function() {
                let t = !1,
                    i = null,
                    n = null,
                    r = null,
                    a = null,
                    s = null,
                    o = null,
                    l = null,
                    c = null;
                return {
                    setTest: function(e) {
                        t || (e ? U(2960) : z(2960))
                    },
                    setMask: function(n) {
                        i === n || t || (e.stencilMask(n), i = n)
                    },
                    setFunc: function(t, i, s) {
                        n === t && r === i && a === s || (e.stencilFunc(t, i, s), n = t, r = i, a = s)
                    },
                    setOp: function(t, i, n) {
                        s === t && o === i && l === n || (e.stencilOp(t, i, n), s = t, o = i, l = n)
                    },
                    setLocked: function(e) {
                        t = e
                    },
                    setClear: function(t) {
                        c !== t && (e.clearStencil(t), c = t)
                    },
                    reset: function() {
                        t = !1, i = null, n = null, r = null, a = null, s = null, o = null, l = null, c = null
                    }
                }
            };
        let o = {},
            c = null,
            d = {},
            h = null,
            u = !1,
            f = null,
            p = null,
            m = null,
            g = null,
            x = null,
            _ = null,
            v = null,
            y = !1,
            M = null,
            b = null,
            A = null,
            w = null,
            S = null;
        const T = e.getParameter(35661);
        let L = !1,
            E = 0;
        const P = e.getParameter(7938); - 1 !== P.indexOf("WebGL") ? (E = parseFloat(/^WebGL (\d)/.exec(P)[1]), L = E >= 1) : -1 !== P.indexOf("OpenGL ES") && (E = parseFloat(/^OpenGL ES (\d)/.exec(P)[1]), L = E >= 2);
        let F = null,
            N = {};
        const C = new V(0, 0, e.canvas.width, e.canvas.height),
            R = new V(0, 0, e.canvas.width, e.canvas.height);
            

        function D(t, i, n) {
            const r = new Uint8Array(4),
                a = e.createTexture();
            e.bindTexture(t, a), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
            for (let t = 0; t < n; t++) e.texImage2D(i + t, 0, 6408, 1, 1, 0, 6408, 5121, r);
            return a
        }
        const I = {};

        function U(t) {
            !0 !== o[t] && (e.enable(t), o[t] = !0)
        }

        function z(t) {
            !1 !== o[t] && (e.disable(t), o[t] = !1)
        }
        I[3553] = D(3553, 3553, 1), I[34067] = D(34067, 34069, 6), r.setClear(0, 0, 0, 1), a.setClear(1), s.setClear(0), U(2929), a.setFunc(3), H(!1), k(1), U(2884), G(0);
        const O = {
            [l]: 32774,
            101: 32778,
            102: 32779
        };
        if (n) O[103] = 32775, O[104] = 32776;
        else {
            const e = t.get("EXT_blend_minmax");
            null !== e && (O[103] = e.MIN_EXT, O[104] = e.MAX_EXT)
        }
        const B = {
            200: 0,
            201: 1,
            202: 768,
            204: 770,
            210: 776,
            208: 774,
            206: 772,
            203: 769,
            205: 771,
            209: 775,
            207: 773
        };

        function G(t, i, n, r, a, s, o, c) {
            if (0 !== t) {
                if (!1 === u && (U(3042), u = !0), 5 === t) a = a || i, s = s || n, o = o || r, i === p && a === x || (e.blendEquationSeparate(O[i], O[a]), p = i, x = a), n === m && r === g && s === _ && o === v || (e.blendFuncSeparate(B[n], B[r], B[s], B[o]), m = n, g = r, _ = s, v = o), f = t, y = null;
                else if (t !== f || c !== y) {
                    if (p === l && x === l || (e.blendEquation(32774), p = l, x = l), c) switch (t) {
                        case 1:
                            e.blendFuncSeparate(1, 771, 1, 771);
                            break;
                        case 2:
                            e.blendFunc(1, 1);
                            break;
                        case 3:
                            e.blendFuncSeparate(0, 0, 769, 771);
                            break;
                        case 4:
                            e.blendFuncSeparate(0, 768, 0, 770);
                            break;
                        default:
                            console.error("THREE.WebGLState: Invalid blending: ", t)
                    } else switch (t) {
                        case 1:
                            e.blendFuncSeparate(770, 771, 1, 771);
                            break;
                        case 2:
                            e.blendFunc(770, 1);
                            break;
                        case 3:
                            e.blendFunc(0, 769);
                            break;
                        case 4:
                            e.blendFunc(0, 768);
                            break;
                        default:
                            console.error("THREE.WebGLState: Invalid blending: ", t)
                    }
                    m = null, g = null, _ = null, v = null, f = t, y = c
                }
            } else !0 === u && (z(3042), u = !1)
        }

        function H(t) {
            M !== t && (t ? e.frontFace(2304) : e.frontFace(2305), M = t)
        }

        function k(t) {
            0 !== t ? (U(2884), t !== b && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : z(2884), b = t
        }

        function W(t, i, n) {
            t ? (U(32823), w === i && S === n || (e.polygonOffset(i, n), w = i, S = n)) : z(32823)
        }

        function X(t) {
            void 0 === t && (t = 33984 + T - 1), F !== t && (e.activeTexture(t), F = t)
        }
        return {
            buffers: {
                color: r,
                depth: a,
                stencil: s
            },
            enable: U,
            disable: z,
            bindFramebuffer: function(t, i) {
                null === i && null !== c && (i = c), d[t] !== i && (e.bindFramebuffer(t, i), d[t] = i, n && (36009 === t && (d[36160] = i), 36160 === t && (d[36009] = i)))
            },
            bindXRFramebuffer: function(t) {
                t !== c && (e.bindFramebuffer(36160, t), c = t)
            },
            useProgram: function(t) {
                return h !== t && (e.useProgram(t), h = t, !0)
            },
            setBlending: G,
            setMaterial: function(e, t) {
                2 === e.side ? z(2884) : U(2884);
                let i = 1 === e.side;
                t && (i = !i), H(i), 1 === e.blending && !1 === e.transparent ? G(0) : G(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha), a.setFunc(e.depthFunc), a.setTest(e.depthTest), a.setMask(e.depthWrite), r.setMask(e.colorWrite);
                const n = e.stencilWrite;
                s.setTest(n), n && (s.setMask(e.stencilWriteMask), s.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), s.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)), W(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits), !0 === e.alphaToCoverage ? U(32926) : z(32926)
            },
            setFlipSided: H,
            setCullFace: k,
            setLineWidth: function(t) {
                t !== A && (L && e.lineWidth(t), A = t)
            },
            setPolygonOffset: W,
            setScissorTest: function(e) {
                e ? U(3089) : z(3089)
            },
            activeTexture: X,
            bindTexture: function(t, i) {
                null === F && X();
                let n = N[F];
                void 0 === n && (n = {
                    type: void 0,
                    texture: void 0
                }, N[F] = n), n.type === t && n.texture === i || (e.bindTexture(t, i || I[t]), n.type = t, n.texture = i)
            },
            unbindTexture: function() {
                const t = N[F];
                void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0)
            },
            compressedTexImage2D: function() {
                try {
                    e.compressedTexImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texImage2D: function() {
                try {
                    e.texImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texImage3D: function() {
                try {
                    e.texImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            scissor: function(t) {
                !1 === C.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), C.copy(t))
            },
            viewport: function(t) {
                !1 === R.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), R.copy(t))
            },
            reset: function() {
                e.disable(3042), e.disable(2884), e.disable(2929), e.disable(32823), e.disable(3089), e.disable(2960), e.disable(32926), e.blendEquation(32774), e.blendFunc(1, 0), e.blendFuncSeparate(1, 0, 1, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(513), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(519, 0, 4294967295), e.stencilOp(7680, 7680, 7680), e.clearStencil(0), e.cullFace(1029), e.frontFace(2305), e.polygonOffset(0, 0), e.activeTexture(33984), e.bindFramebuffer(36160, null), !0 === n && (e.bindFramebuffer(36009, null), e.bindFramebuffer(36008, null)), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), o = {}, F = null, N = {}, c = null, d = {}, h = null, u = !1, f = null, p = null, m = null, g = null, x = null, _ = null, v = null, y = !1, M = null, b = null, A = null, w = null, S = null, C.set(0, 0, e.canvas.width, e.canvas.height), R.set(0, 0, e.canvas.width, e.canvas.height), r.reset(), a.reset(), s.reset()
            }
        }
    }

    function br(e, t, i, n, r, a, s) {
        const o = r.isWebGL2,
            l = r.maxTextures,
            m = r.maxCubemapSize,
            S = r.maxTextureSize,
            T = r.maxSamples,
            L = new WeakMap;
        let E, P = !1;
        try {
            P = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d")
        } catch (e) {}

        function F(e, t) {
            return P ? new OffscreenCanvas(e, t) : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")
        }

        function N(e, t, i, n) {
            let r = 1;
            if ((e.width > n || e.height > n) && (r = n / Math.max(e.width, e.height)), r < 1 || !0 === t) {
                if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                    const n = t ? U : Math.floor,
                        a = n(r * e.width),
                        s = n(r * e.height);
                    void 0 === E && (E = F(a, s));
                    const o = i ? F(a, s) : E;
                    o.width = a, o.height = s;
                    return o.getContext("2d").drawImage(e, 0, 0, a, s), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + a + "x" + s + ")."), o
                }
                return "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ")."), e
            }
            return e
        }

        function C(e) {
            return I(e.width) && I(e.height)
        }

        function R(e, t) {
            return e.generateMipmaps && t && e.minFilter !== u && e.minFilter !== f
        }

        function D(t, i, r, a) {
            e.generateMipmap(t);
            n.get(i).__maxMipLevel = Math.log2(Math.max(r, a))
        }

        function z(i, n, r) {
            if (!1 === o) return n;
            if (null !== i) {
                if (void 0 !== e[i]) return e[i];
                console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + i + "'")
            }
            let a = n;
            return 6403 === n && (5126 === r && (a = 33326), 5131 === r && (a = 33325), 5121 === r && (a = 33321)), 6407 === n && (5126 === r && (a = 34837), 5131 === r && (a = 34843), 5121 === r && (a = 32849)), 6408 === n && (5126 === r && (a = 34836), 5131 === r && (a = 34842), 5121 === r && (a = 32856)), 33325 !== a && 33326 !== a && 34842 !== a && 34836 !== a || t.get("EXT_color_buffer_float"), a
        }

        function O(e) {
            return e === u || 1004 === e || 1005 === e ? 9728 : 9729
        }

        function B(t) {
            const i = t.target;
            i.removeEventListener("dispose", B),
                function(t) {
                    const i = n.get(t);
                    if (void 0 === i.__webglInit) return;
                    e.deleteTexture(i.__webglTexture), n.remove(t)
                }(i), i.isVideoTexture && L.delete(i), s.memory.textures--
        }

        function G(t) {
            const i = t.target;
            i.removeEventListener("dispose", G),
                function(t) {
                    const i = t.texture,
                        r = n.get(t),
                        a = n.get(i);
                    if (!t) return;
                    void 0 !== a.__webglTexture && e.deleteTexture(a.__webglTexture);
                    t.depthTexture && t.depthTexture.dispose();
                    if (t.isWebGLCubeRenderTarget)
                        for (let t = 0; t < 6; t++) e.deleteFramebuffer(r.__webglFramebuffer[t]), r.__webglDepthbuffer && e.deleteRenderbuffer(r.__webglDepthbuffer[t]);
                    else e.deleteFramebuffer(r.__webglFramebuffer), r.__webglDepthbuffer && e.deleteRenderbuffer(r.__webglDepthbuffer), r.__webglMultisampledFramebuffer && e.deleteFramebuffer(r.__webglMultisampledFramebuffer), r.__webglColorRenderbuffer && e.deleteRenderbuffer(r.__webglColorRenderbuffer), r.__webglDepthRenderbuffer && e.deleteRenderbuffer(r.__webglDepthRenderbuffer);
                    n.remove(i), n.remove(t)
                }(i), s.memory.textures--
        }
        let H = 0;

        function k(e, t) {
            const r = n.get(e);
            if (e.isVideoTexture && function(e) {
                    const t = s.render.frame;
                    L.get(e) !== t && (L.set(e, t), e.update())
                }(e), e.version > 0 && r.__version !== e.version) {
                const i = e.image;
                if (void 0 === i) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
                else {
                    if (!1 !== i.complete) return void j(r, e, t);
                    console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
                }
            }
            i.activeTexture(33984 + t), i.bindTexture(3553, r.__webglTexture)
        }

        function V(t, r) {
            const s = n.get(t);
            t.version > 0 && s.__version !== t.version ? function(t, n, r) {
                if (6 !== n.image.length) return;
                Q(t, n), i.activeTexture(33984 + r), i.bindTexture(34067, t.__webglTexture), e.pixelStorei(37440, n.flipY), e.pixelStorei(37441, n.premultiplyAlpha), e.pixelStorei(3317, n.unpackAlignment), e.pixelStorei(37443, 0);
                const s = n && (n.isCompressedTexture || n.image[0].isCompressedTexture),
                    l = n.image[0] && n.image[0].isDataTexture,
                    c = [];
                for (let e = 0; e < 6; e++) c[e] = s || l ? l ? n.image[e].image : n.image[e] : N(n.image[e], !1, !0, m);
                const d = c[0],
                    h = C(d) || o,
                    u = a.convert(n.format),
                    f = a.convert(n.type),
                    p = z(n.internalFormat, u, f);
                let g;
                if (Y(34067, n, h), s) {
                    for (let e = 0; e < 6; e++) {
                        g = c[e].mipmaps;
                        for (let t = 0; t < g.length; t++) {
                            const r = g[t];
                            n.format !== b && n.format !== M ? null !== u ? i.compressedTexImage2D(34069 + e, t, p, r.width, r.height, 0, r.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : i.texImage2D(34069 + e, t, p, r.width, r.height, 0, u, f, r.data)
                        }
                    }
                    t.__maxMipLevel = g.length - 1
                } else {
                    g = n.mipmaps;
                    for (let e = 0; e < 6; e++)
                        if (l) {
                            i.texImage2D(34069 + e, 0, p, c[e].width, c[e].height, 0, u, f, c[e].data);
                            for (let t = 0; t < g.length; t++) {
                                const n = g[t].image[e].image;
                                i.texImage2D(34069 + e, t + 1, p, n.width, n.height, 0, u, f, n.data)
                            }
                        } else {
                            i.texImage2D(34069 + e, 0, p, u, f, c[e]);
                            for (let t = 0; t < g.length; t++) {
                                const n = g[t];
                                i.texImage2D(34069 + e, t + 1, p, u, f, n.image[e])
                            }
                        } t.__maxMipLevel = g.length
                }
                R(n, h) && D(34067, n, d.width, d.height);
                t.__version = n.version, n.onUpdate && n.onUpdate(n)
            }(s, t, r) : (i.activeTexture(33984 + r), i.bindTexture(34067, s.__webglTexture))
        }
        const W = {
                [c]: 10497,
                [d]: 33071,
                [h]: 33648
            },
            X = {
                [u]: 9728,
                1004: 9984,
                1005: 9986,
                [f]: 9729,
                1007: 9985,
                [p]: 9987
            };

        function Y(i, a, s) {
            if (s ? (e.texParameteri(i, 10242, W[a.wrapS]), e.texParameteri(i, 10243, W[a.wrapT]), 32879 !== i && 35866 !== i || e.texParameteri(i, 32882, W[a.wrapR]), e.texParameteri(i, 10240, X[a.magFilter]), e.texParameteri(i, 10241, X[a.minFilter])) : (e.texParameteri(i, 10242, 33071), e.texParameteri(i, 10243, 33071), 32879 !== i && 35866 !== i || e.texParameteri(i, 32882, 33071), a.wrapS === d && a.wrapT === d || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), e.texParameteri(i, 10240, O(a.magFilter)), e.texParameteri(i, 10241, O(a.minFilter)), a.minFilter !== u && a.minFilter !== f && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), !0 === t.has("EXT_texture_filter_anisotropic")) {
                const s = t.get("EXT_texture_filter_anisotropic");
                if (a.type === _ && !1 === t.has("OES_texture_float_linear")) return;
                if (!1 === o && a.type === v && !1 === t.has("OES_texture_half_float_linear")) return;
                (a.anisotropy > 1 || n.get(a).__currentAnisotropy) && (e.texParameterf(i, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), n.get(a).__currentAnisotropy = a.anisotropy)
            }
        }

        function Q(t, i) {
            void 0 === t.__webglInit && (t.__webglInit = !0, i.addEventListener("dispose", B), t.__webglTexture = e.createTexture(), s.memory.textures++)
        }

        function j(t, n, r) {
            let s = 3553;
            n.isDataTexture2DArray && (s = 35866), n.isDataTexture3D && (s = 32879), Q(t, n), i.activeTexture(33984 + r), i.bindTexture(s, t.__webglTexture), e.pixelStorei(37440, n.flipY), e.pixelStorei(37441, n.premultiplyAlpha), e.pixelStorei(3317, n.unpackAlignment), e.pixelStorei(37443, 0);
            const l = function(e) {
                    return !o && (e.wrapS !== d || e.wrapT !== d || e.minFilter !== u && e.minFilter !== f)
                }(n) && !1 === C(n.image),
                c = N(n.image, l, !1, S),
                h = C(c) || o,
                p = a.convert(n.format);
            let m, v = a.convert(n.type),
                T = z(n.internalFormat, p, v);
            Y(s, n, h);
            const L = n.mipmaps;
            if (n.isDepthTexture) T = 6402, o ? T = n.type === _ ? 36012 : n.type === x ? 33190 : n.type === y ? 35056 : 33189 : n.type === _ && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), n.format === A && 6402 === T && n.type !== g && n.type !== x && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), n.type = g, v = a.convert(n.type)), n.format === w && 6402 === T && (T = 34041, n.type !== y && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), n.type = y, v = a.convert(n.type))), i.texImage2D(3553, 0, T, c.width, c.height, 0, p, v, null);
            else if (n.isDataTexture)
                if (L.length > 0 && h) {
                    for (let e = 0, t = L.length; e < t; e++) m = L[e], i.texImage2D(3553, e, T, m.width, m.height, 0, p, v, m.data);
                    n.generateMipmaps = !1, t.__maxMipLevel = L.length - 1
                } else i.texImage2D(3553, 0, T, c.width, c.height, 0, p, v, c.data), t.__maxMipLevel = 0;
            else if (n.isCompressedTexture) {
                for (let e = 0, t = L.length; e < t; e++) m = L[e], n.format !== b && n.format !== M ? null !== p ? i.compressedTexImage2D(3553, e, T, m.width, m.height, 0, m.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : i.texImage2D(3553, e, T, m.width, m.height, 0, p, v, m.data);
                t.__maxMipLevel = L.length - 1
            } else if (n.isDataTexture2DArray) i.texImage3D(35866, 0, T, c.width, c.height, c.depth, 0, p, v, c.data), t.__maxMipLevel = 0;
            else if (n.isDataTexture3D) i.texImage3D(32879, 0, T, c.width, c.height, c.depth, 0, p, v, c.data), t.__maxMipLevel = 0;
            else if (L.length > 0 && h) {
                for (let e = 0, t = L.length; e < t; e++) m = L[e], i.texImage2D(3553, e, T, p, v, m);
                n.generateMipmaps = !1, t.__maxMipLevel = L.length - 1
            } else i.texImage2D(3553, 0, T, p, v, c), t.__maxMipLevel = 0;
            R(n, h) && D(s, n, c.width, c.height), t.__version = n.version, n.onUpdate && n.onUpdate(n)
        }

        function q(t, r, s, o) {
            const l = r.texture,
                c = a.convert(l.format),
                d = a.convert(l.type),
                h = z(l.internalFormat, c, d);
            32879 === o || 35866 === o ? i.texImage3D(o, 0, h, r.width, r.height, r.depth, 0, c, d, null) : i.texImage2D(o, 0, h, r.width, r.height, 0, c, d, null), i.bindFramebuffer(36160, t), e.framebufferTexture2D(36160, s, o, n.get(l).__webglTexture, 0), i.bindFramebuffer(36160, null)
        }

        function Z(t, i, n) {
            if (e.bindRenderbuffer(36161, t), i.depthBuffer && !i.stencilBuffer) {
                let r = 33189;
                if (n) {
                    const t = i.depthTexture;
                    t && t.isDepthTexture && (t.type === _ ? r = 36012 : t.type === x && (r = 33190));
                    const n = K(i);
                    e.renderbufferStorageMultisample(36161, n, r, i.width, i.height)
                } else e.renderbufferStorage(36161, r, i.width, i.height);
                e.framebufferRenderbuffer(36160, 36096, 36161, t)
            } else if (i.depthBuffer && i.stencilBuffer) {
                if (n) {
                    const t = K(i);
                    e.renderbufferStorageMultisample(36161, t, 35056, i.width, i.height)
                } else e.renderbufferStorage(36161, 34041, i.width, i.height);
                e.framebufferRenderbuffer(36160, 33306, 36161, t)
            } else {
                const t = i.texture,
                    r = a.convert(t.format),
                    s = a.convert(t.type),
                    o = z(t.internalFormat, r, s);
                if (n) {
                    const t = K(i);
                    e.renderbufferStorageMultisample(36161, t, o, i.width, i.height)
                } else e.renderbufferStorage(36161, o, i.width, i.height)
            }
            e.bindRenderbuffer(36161, null)
        }

        function J(t) {
            const r = n.get(t),
                a = !0 === t.isWebGLCubeRenderTarget;
            if (t.depthTexture) {
                if (a) throw new Error("target.depthTexture not supported in Cube render targets");
                ! function(t, r) {
                    if (r && r.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
                    if (i.bindFramebuffer(36160, t), !r.depthTexture || !r.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    n.get(r.depthTexture).__webglTexture && r.depthTexture.image.width === r.width && r.depthTexture.image.height === r.height || (r.depthTexture.image.width = r.width, r.depthTexture.image.height = r.height, r.depthTexture.needsUpdate = !0), k(r.depthTexture, 0);
                    const a = n.get(r.depthTexture).__webglTexture;
                    if (r.depthTexture.format === A) e.framebufferTexture2D(36160, 36096, 3553, a, 0);
                    else {
                        if (r.depthTexture.format !== w) throw new Error("Unknown depthTexture format");
                        e.framebufferTexture2D(36160, 33306, 3553, a, 0)
                    }
                }(r.__webglFramebuffer, t)
            } else if (a) {
                r.__webglDepthbuffer = [];
                for (let n = 0; n < 6; n++) i.bindFramebuffer(36160, r.__webglFramebuffer[n]), r.__webglDepthbuffer[n] = e.createRenderbuffer(), Z(r.__webglDepthbuffer[n], t, !1)
            } else i.bindFramebuffer(36160, r.__webglFramebuffer), r.__webglDepthbuffer = e.createRenderbuffer(), Z(r.__webglDepthbuffer, t, !1);
            i.bindFramebuffer(36160, null)
        }

        function K(e) {
            return o && e.isWebGLMultisampleRenderTarget ? Math.min(T, e.samples) : 0
        }
        let $ = !1,
            ee = !1;
        this.allocateTextureUnit = function() {
            const e = H;
            return e >= l && console.warn("THREE.WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + l), H += 1, e
        }, this.resetTextureUnits = function() {
            H = 0
        }, this.setTexture2D = k, this.setTexture2DArray = function(e, t) {
            const r = n.get(e);
            e.version > 0 && r.__version !== e.version ? j(r, e, t) : (i.activeTexture(33984 + t), i.bindTexture(35866, r.__webglTexture))
        }, this.setTexture3D = function(e, t) {
            const r = n.get(e);
            e.version > 0 && r.__version !== e.version ? j(r, e, t) : (i.activeTexture(33984 + t), i.bindTexture(32879, r.__webglTexture))
        }, this.setTextureCube = V, this.setupRenderTarget = function(t) {
            const r = t.texture,
                l = n.get(t),
                c = n.get(r);
            t.addEventListener("dispose", G), c.__webglTexture = e.createTexture(), c.__version = r.version, s.memory.textures++;
            const d = !0 === t.isWebGLCubeRenderTarget,
                h = !0 === t.isWebGLMultisampleRenderTarget,
                u = r.isDataTexture3D || r.isDataTexture2DArray,
                f = C(t) || o;
            if (!o || r.format !== M || r.type !== _ && r.type !== v || (r.format = b, console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")), d) {
                l.__webglFramebuffer = [];
                for (let t = 0; t < 6; t++) l.__webglFramebuffer[t] = e.createFramebuffer()
            } else if (l.__webglFramebuffer = e.createFramebuffer(), h)
                if (o) {
                    l.__webglMultisampledFramebuffer = e.createFramebuffer(), l.__webglColorRenderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(36161, l.__webglColorRenderbuffer);
                    const n = a.convert(r.format),
                        s = a.convert(r.type),
                        o = z(r.internalFormat, n, s),
                        c = K(t);
                    e.renderbufferStorageMultisample(36161, c, o, t.width, t.height), i.bindFramebuffer(36160, l.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064, 36161, l.__webglColorRenderbuffer), e.bindRenderbuffer(36161, null), t.depthBuffer && (l.__webglDepthRenderbuffer = e.createRenderbuffer(), Z(l.__webglDepthRenderbuffer, t, !0)), i.bindFramebuffer(36160, null)
                } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
            if (d) {
                i.bindTexture(34067, c.__webglTexture), Y(34067, r, f);
                for (let e = 0; e < 6; e++) q(l.__webglFramebuffer[e], t, 36064, 34069 + e);
                R(r, f) && D(34067, r, t.width, t.height), i.bindTexture(34067, null)
            } else {
                let e = 3553;
                if (u)
                    if (o) {
                        e = r.isDataTexture3D ? 32879 : 35866
                    } else console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.");
                i.bindTexture(e, c.__webglTexture), Y(e, r, f), q(l.__webglFramebuffer, t, 36064, e), R(r, f) && D(3553, r, t.width, t.height), i.bindTexture(3553, null)
            }
            t.depthBuffer && J(t)
        }, this.updateRenderTargetMipmap = function(e) {
            const t = e.texture;
            if (R(t, C(e) || o)) {
                const r = e.isWebGLCubeRenderTarget ? 34067 : 3553,
                    a = n.get(t).__webglTexture;
                i.bindTexture(r, a), D(r, t, e.width, e.height), i.bindTexture(r, null)
            }
        }, this.updateMultisampleRenderTarget = function(t) {
            if (t.isWebGLMultisampleRenderTarget)
                if (o) {
                    const r = t.width,
                        a = t.height;
                    let s = 16384;
                    t.depthBuffer && (s |= 256), t.stencilBuffer && (s |= 1024);
                    const o = n.get(t);
                    i.bindFramebuffer(36008, o.__webglMultisampledFramebuffer), i.bindFramebuffer(36009, o.__webglFramebuffer), e.blitFramebuffer(0, 0, r, a, 0, 0, r, a, s, 9728), i.bindFramebuffer(36008, null), i.bindFramebuffer(36009, o.__webglMultisampledFramebuffer)
                } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
        }, this.safeSetTexture2D = function(e, t) {
            e && e.isWebGLRenderTarget && (!1 === $ && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), $ = !0), e = e.texture), k(e, t)
        }, this.safeSetTextureCube = function(e, t) {
            e && e.isWebGLCubeRenderTarget && (!1 === ee && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), ee = !0), e = e.texture), V(e, t)
        }
    }

    function Ar(e, t, i) {
        const n = i.isWebGL2;
        return {
            convert: function(e) {
                let i;
                if (e === m) return 5121;
                if (1017 === e) return 32819;
                if (1018 === e) return 32820;
                if (1019 === e) return 33635;
                if (1010 === e) return 5120;
                if (1011 === e) return 5122;
                if (e === g) return 5123;
                if (1013 === e) return 5124;
                if (e === x) return 5125;
                if (e === _) return 5126;
                if (e === v) return n ? 5131 : (i = t.get("OES_texture_half_float"), null !== i ? i.HALF_FLOAT_OES : null);
                if (1021 === e) return 6406;
                if (e === M) return 6407;
                if (e === b) return 6408;
                if (1024 === e) return 6409;
                if (1025 === e) return 6410;
                if (e === A) return 6402;
                if (e === w) return 34041;
                if (1028 === e) return 6403;
                if (1029 === e) return 36244;
                if (1030 === e) return 33319;
                if (1031 === e) return 33320;
                if (1032 === e) return 36248;
                if (1033 === e) return 36249;
                if (33776 === e || 33777 === e || 33778 === e || 33779 === e) {
                    if (i = t.get("WEBGL_compressed_texture_s3tc"), null === i) return null;
                    if (33776 === e) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (33777 === e) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (33778 === e) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (33779 === e) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT
                }
                if (35840 === e || 35841 === e || 35842 === e || 35843 === e) {
                    if (i = t.get("WEBGL_compressed_texture_pvrtc"), null === i) return null;
                    if (35840 === e) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (35841 === e) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (35842 === e) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (35843 === e) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                }
                if (36196 === e) return i = t.get("WEBGL_compressed_texture_etc1"), null !== i ? i.COMPRESSED_RGB_ETC1_WEBGL : null;
                if ((37492 === e || 37496 === e) && (i = t.get("WEBGL_compressed_texture_etc"), null !== i)) {
                    if (37492 === e) return i.COMPRESSED_RGB8_ETC2;
                    if (37496 === e) return i.COMPRESSED_RGBA8_ETC2_EAC
                }
                return 37808 === e || 37809 === e || 37810 === e || 37811 === e || 37812 === e || 37813 === e || 37814 === e || 37815 === e || 37816 === e || 37817 === e || 37818 === e || 37819 === e || 37820 === e || 37821 === e || 37840 === e || 37841 === e || 37842 === e || 37843 === e || 37844 === e || 37845 === e || 37846 === e || 37847 === e || 37848 === e || 37849 === e || 37850 === e || 37851 === e || 37852 === e || 37853 === e ? (i = t.get("WEBGL_compressed_texture_astc"), null !== i ? e : null) : 36492 === e ? (i = t.get("EXT_texture_compression_bptc"), null !== i ? e : null) : e === y ? n ? 34042 : (i = t.get("WEBGL_depth_texture"), null !== i ? i.UNSIGNED_INT_24_8_WEBGL : null) : void 0
            }
        }
    }
    class wr extends si {
        constructor(e = []) {
            super(), this.cameras = e
        }
    }
    wr.prototype.isArrayCamera = !0;
    class Sr extends je {
        constructor() {
            super(), this.type = "Group"
        }
    }
    Sr.prototype.isGroup = !0;
    const Tr = {
        type: "move"
    };
    class Lr {
        constructor() {
            this._targetRay = null, this._grip = null, this._hand = null
        }
        getHandSpace() {
            return null === this._hand && (this._hand = new Sr, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
                pinching: !1
            }), this._hand
        }
        getTargetRaySpace() {
            return null === this._targetRay && (this._targetRay = new Sr, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Y, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Y), this._targetRay
        }
        getGripSpace() {
            return null === this._grip && (this._grip = new Sr, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Y, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Y), this._grip
        }
        dispatchEvent(e) {
            return null !== this._targetRay && this._targetRay.dispatchEvent(e), null !== this._grip && this._grip.dispatchEvent(e), null !== this._hand && this._hand.dispatchEvent(e), this
        }
        disconnect(e) {
            return this.dispatchEvent({
                type: "disconnected",
                data: e
            }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this
        }
        update(e, t, i) {
            let n = null,
                r = null,
                a = null;
            const s = this._targetRay,
                o = this._grip,
                l = this._hand;
            if (e && "visible-blurred" !== t.session.visibilityState)
                if (null !== s && (n = t.getPose(e.targetRaySpace, i), null !== n && (s.matrix.fromArray(n.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), n.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(n.linearVelocity)) : s.hasLinearVelocity = !1, n.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(n.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(Tr))), l && e.hand) {
                    a = !0;
                    for (const n of e.hand.values()) {
                        const e = t.getJointPose(n, i);
                        if (void 0 === l.joints[n.jointName]) {
                            const e = new Sr;
                            e.matrixAutoUpdate = !1, e.visible = !1, l.joints[n.jointName] = e, l.add(e)
                        }
                        const r = l.joints[n.jointName];
                        null !== e && (r.matrix.fromArray(e.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), r.jointRadius = e.radius), r.visible = null !== e
                    }
                    const n = l.joints["index-finger-tip"],
                        r = l.joints["thumb-tip"],
                        s = n.position.distanceTo(r.position),
                        o = .02,
                        c = .005;
                    l.inputState.pinching && s > o + c ? (l.inputState.pinching = !1, this.dispatchEvent({
                        type: "pinchend",
                        handedness: e.handedness,
                        target: this
                    })) : !l.inputState.pinching && s <= o - c && (l.inputState.pinching = !0, this.dispatchEvent({
                        type: "pinchstart",
                        handedness: e.handedness,
                        target: this
                    }))
                } else null !== o && e.gripSpace && (r = t.getPose(e.gripSpace, i), null !== r && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1));
            return null !== s && (s.visible = null !== n), null !== o && (o.visible = null !== r), null !== l && (l.visible = null !== a), this
        }
    }
    class Er extends E {
        constructor(e, t) {
            super();
            const i = this,
                n = e.state;
            let r = null,
                a = 1,
                s = null,
                o = "local-floor",
                l = null;
            const c = [],
                d = new Map,
                h = new si;
            h.layers.enable(1), h.viewport = new V;
            const u = new si;
            u.layers.enable(2), u.viewport = new V;
            const f = [h, u],
                p = new wr;
            p.layers.enable(1), p.layers.enable(2);
            let m = null,
                g = null;

            function x(e) {
                const t = d.get(e.inputSource);
                t && t.dispatchEvent({
                    type: e.type,
                    data: e.inputSource
                })
            }

            function _() {
                d.forEach((function(e, t) {
                    e.disconnect(t)
                })), d.clear(), m = null, g = null, n.bindXRFramebuffer(null), e.setRenderTarget(e.getRenderTarget()), w.stop(), i.isPresenting = !1, i.dispatchEvent({
                    type: "sessionend"
                })
            }

            function v(e) {
                const t = r.inputSources;
                for (let e = 0; e < c.length; e++) d.set(t[e], c[e]);
                for (let t = 0; t < e.removed.length; t++) {
                    const i = e.removed[t],
                        n = d.get(i);
                    n && (n.dispatchEvent({
                        type: "disconnected",
                        data: i
                    }), d.delete(i))
                }
                for (let t = 0; t < e.added.length; t++) {
                    const i = e.added[t],
                        n = d.get(i);
                    n && n.dispatchEvent({
                        type: "connected",
                        data: i
                    })
                }
            }
            this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
                let t = c[e];
                return void 0 === t && (t = new Lr, c[e] = t), t.getTargetRaySpace()
            }, this.getControllerGrip = function(e) {
                let t = c[e];
                return void 0 === t && (t = new Lr, c[e] = t), t.getGripSpace()
            }, this.getHand = function(e) {
                let t = c[e];
                return void 0 === t && (t = new Lr, c[e] = t), t.getHandSpace()
            }, this.setFramebufferScaleFactor = function(e) {
                a = e, !0 === i.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
            }, this.setReferenceSpaceType = function(e) {
                o = e, !0 === i.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
            }, this.getReferenceSpace = function() {
                return s
            }, this.getSession = function() {
                return r
            }, this.setSession = async function(e) {
                if (r = e, null !== r) {
                    r.addEventListener("select", x), r.addEventListener("selectstart", x), r.addEventListener("selectend", x), r.addEventListener("squeeze", x), r.addEventListener("squeezestart", x), r.addEventListener("squeezeend", x), r.addEventListener("end", _), r.addEventListener("inputsourceschange", v);
                    const e = t.getContextAttributes();
                    !0 !== e.xrCompatible && await t.makeXRCompatible();
                    const n = {
                            antialias: e.antialias,
                            alpha: e.alpha,
                            depth: e.depth,
                            stencil: e.stencil,
                            framebufferScaleFactor: a
                        },
                        l = new XRWebGLLayer(r, t, n);
                    r.updateRenderState({
                        baseLayer: l
                    }), s = await r.requestReferenceSpace(o), w.setContext(r), w.start(), i.isPresenting = !0, i.dispatchEvent({
                        type: "sessionstart"
                    })
                }
            };
            const y = new Y,
                M = new Y;

            function b(e, t) {
                null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert()
            }
            this.getCamera = function(e) {
                p.near = u.near = h.near = e.near, p.far = u.far = h.far = e.far, m === p.near && g === p.far || (r.updateRenderState({
                    depthNear: p.near,
                    depthFar: p.far
                }), m = p.near, g = p.far);
                const t = e.parent,
                    i = p.cameras;
                b(p, t);
                for (let e = 0; e < i.length; e++) b(i[e], t);
                e.matrixWorld.copy(p.matrixWorld), e.matrix.copy(p.matrix), e.matrix.decompose(e.position, e.quaternion, e.scale);
                const n = e.children;
                for (let e = 0, t = n.length; e < t; e++) n[e].updateMatrixWorld(!0);
                return 2 === i.length ? function(e, t, i) {
                    y.setFromMatrixPosition(t.matrixWorld), M.setFromMatrixPosition(i.matrixWorld);
                    const n = y.distanceTo(M),
                        r = t.projectionMatrix.elements,
                        a = i.projectionMatrix.elements,
                        s = r[14] / (r[10] - 1),
                        o = r[14] / (r[10] + 1),
                        l = (r[9] + 1) / r[5],
                        c = (r[9] - 1) / r[5],
                        d = (r[8] - 1) / r[0],
                        h = (a[8] + 1) / a[0],
                        u = s * d,
                        f = s * h,
                        p = n / (-d + h),
                        m = p * -d;
                    t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(m), e.translateZ(p), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert();
                    const g = s + p,
                        x = o + p,
                        _ = u - m,
                        v = f + (n - m),
                        b = l * o / x * g,
                        A = c * o / x * g;
                    e.projectionMatrix.makePerspective(_, v, b, A, g, x)
                }(p, h, u) : p.projectionMatrix.copy(h.projectionMatrix), p
            };
            let A = null;
            const w = new mi;
            w.setAnimationLoop((function(e, t) {
                if (l = t.getViewerPose(s), null !== l) {
                    const e = l.views,
                        t = r.renderState.baseLayer;
                    n.bindXRFramebuffer(t.framebuffer);
                    let i = !1;
                    e.length !== p.cameras.length && (p.cameras.length = 0, i = !0);
                    for (let n = 0; n < e.length; n++) {
                        const r = e[n],
                            a = t.getViewport(r),
                            s = f[n];
                        s.matrix.fromArray(r.transform.matrix), s.projectionMatrix.fromArray(r.projectionMatrix), s.viewport.set(a.x, a.y, a.width, a.height), 0 === n && p.matrix.copy(s.matrix), !0 === i && p.cameras.push(s)
                    }
                }
                const i = r.inputSources;
                for (let e = 0; e < c.length; e++) {
                    const n = c[e],
                        r = i[e];
                    n.update(r, t, s)
                }
                A && A(e, t)
            })), this.setAnimationLoop = function(e) {
                A = e
            }, this.dispose = function() {}
        }
    }

    function Pr(e) {
        function t(t, i) {
            t.opacity.value = i.opacity, i.color && t.diffuse.value.copy(i.color), i.emissive && t.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity), i.map && (t.map.value = i.map), i.alphaMap && (t.alphaMap.value = i.alphaMap), i.specularMap && (t.specularMap.value = i.specularMap);
            const n = e.get(i).envMap;
            if (n) {
                t.envMap.value = n, t.flipEnvMap.value = n.isCubeTexture && n._needsFlipEnvMap ? -1 : 1, t.reflectivity.value = i.reflectivity, t.refractionRatio.value = i.refractionRatio;
                const r = e.get(n).__maxMipLevel;
                void 0 !== r && (t.maxMipLevel.value = r)
            }
            let r, a;
            i.lightMap && (t.lightMap.value = i.lightMap, t.lightMapIntensity.value = i.lightMapIntensity), i.aoMap && (t.aoMap.value = i.aoMap, t.aoMapIntensity.value = i.aoMapIntensity), i.map ? r = i.map : i.specularMap ? r = i.specularMap : i.displacementMap ? r = i.displacementMap : i.normalMap ? r = i.normalMap : i.bumpMap ? r = i.bumpMap : i.roughnessMap ? r = i.roughnessMap : i.metalnessMap ? r = i.metalnessMap : i.alphaMap ? r = i.alphaMap : i.emissiveMap ? r = i.emissiveMap : i.clearcoatMap ? r = i.clearcoatMap : i.clearcoatNormalMap ? r = i.clearcoatNormalMap : i.clearcoatRoughnessMap && (r = i.clearcoatRoughnessMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), t.uvTransform.value.copy(r.matrix)), i.aoMap ? a = i.aoMap : i.lightMap && (a = i.lightMap), void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture), !0 === a.matrixAutoUpdate && a.updateMatrix(), t.uv2Transform.value.copy(a.matrix))
        }

        function i(t, i) {
            t.roughness.value = i.roughness, t.metalness.value = i.metalness, i.roughnessMap && (t.roughnessMap.value = i.roughnessMap), i.metalnessMap && (t.metalnessMap.value = i.metalnessMap), i.emissiveMap && (t.emissiveMap.value = i.emissiveMap), i.bumpMap && (t.bumpMap.value = i.bumpMap, t.bumpScale.value = i.bumpScale, 1 === i.side && (t.bumpScale.value *= -1)), i.normalMap && (t.normalMap.value = i.normalMap, t.normalScale.value.copy(i.normalScale), 1 === i.side && t.normalScale.value.negate()), i.displacementMap && (t.displacementMap.value = i.displacementMap, t.displacementScale.value = i.displacementScale, t.displacementBias.value = i.displacementBias);
            e.get(i).envMap && (t.envMapIntensity.value = i.envMapIntensity)
        }
        return {
            refreshFogUniforms: function(e, t) {
                e.fogColor.value.copy(t.color), t.isFog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t.isFogExp2 && (e.fogDensity.value = t.density)
            },
            refreshMaterialUniforms: function(e, n, r, a) {
                n.isMeshBasicMaterial ? t(e, n) : n.isMeshLambertMaterial ? (t(e, n), function(e, t) {
                    t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
                }(e, n)) : n.isMeshToonMaterial ? (t(e, n), function(e, t) {
                    t.gradientMap && (e.gradientMap.value = t.gradientMap);
                    t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
                    t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
                    t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                    t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
                }(e, n)) : n.isMeshPhongMaterial ? (t(e, n), function(e, t) {
                    e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
                    t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
                    t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                    t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
                }(e, n)) : n.isMeshStandardMaterial ? (t(e, n), n.isMeshPhysicalMaterial ? function(e, t) {
                    i(e, t), e.reflectivity.value = t.reflectivity, e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.sheen && e.sheen.value.copy(t.sheen);
                    t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap);
                    t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap);
                    t.clearcoatNormalMap && (e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), e.clearcoatNormalMap.value = t.clearcoatNormalMap, 1 === t.side && e.clearcoatNormalScale.value.negate());
                    e.transmission.value = t.transmission, t.transmissionMap && (e.transmissionMap.value = t.transmissionMap)
                }(e, n) : i(e, n)) : n.isMeshMatcapMaterial ? (t(e, n), function(e, t) {
                    t.matcap && (e.matcap.value = t.matcap);
                    t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
                    t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                    t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
                }(e, n)) : n.isMeshDepthMaterial ? (t(e, n), function(e, t) {
                    t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
                }(e, n)) : n.isMeshDistanceMaterial ? (t(e, n), function(e, t) {
                    t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias);
                    e.referencePosition.value.copy(t.referencePosition), e.nearDistance.value = t.nearDistance, e.farDistance.value = t.farDistance
                }(e, n)) : n.isMeshNormalMaterial ? (t(e, n), function(e, t) {
                    t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1));
                    t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                    t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
                }(e, n)) : n.isLineBasicMaterial ? (function(e, t) {
                    e.diffuse.value.copy(t.color), e.opacity.value = t.opacity
                }(e, n), n.isLineDashedMaterial && function(e, t) {
                    e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
                }(e, n)) : n.isPointsMaterial ? function(e, t, i, n) {
                    e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * i, e.scale.value = .5 * n, t.map && (e.map.value = t.map);
                    t.alphaMap && (e.alphaMap.value = t.alphaMap);
                    let r;
                    t.map ? r = t.map : t.alphaMap && (r = t.alphaMap);
                    void 0 !== r && (!0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix))
                }(e, n, r, a) : n.isSpriteMaterial ? function(e, t) {
                    e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map);
                    t.alphaMap && (e.alphaMap.value = t.alphaMap);
                    let i;
                    t.map ? i = t.map : t.alphaMap && (i = t.alphaMap);
                    void 0 !== i && (!0 === i.matrixAutoUpdate && i.updateMatrix(), e.uvTransform.value.copy(i.matrix))
                }(e, n) : n.isShadowMaterial ? (e.color.value.copy(n.color), e.opacity.value = n.opacity) : n.isShaderMaterial && (n.uniformsNeedUpdate = !1)
            }
        }
    }

    function Fr(e) {
        const t = void 0 !== (e = e || {}).canvas ? e.canvas : function() {
                const e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                return e.style.display = "block", e
            }(),
            i = void 0 !== e.context ? e.context : null,
            n = void 0 !== e.alpha && e.alpha,
            r = void 0 === e.depth || e.depth,
            a = void 0 === e.stencil || e.stencil,
            s = void 0 !== e.antialias && e.antialias,
            o = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
            l = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
            c = void 0 !== e.powerPreference ? e.powerPreference : "default",
            d = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat;
        let h = null,
            u = null;
        const f = [],
            p = [];
        this.domElement = t, this.debug = {
            checkShaderErrors: !0
        }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.outputEncoding = S, this.physicallyCorrectLights = !1, this.toneMapping = 0, this.toneMappingExposure = 1;
        const g = this;
        let x = !1,
            y = 0,
            M = 0,
            A = null,
            w = -1,
            T = null;
        const L = new V,
            E = new V;
        let P = null,
            F = t.width,
            N = t.height,
            C = 1,
            R = null,
            D = null;
        const I = new V(0, 0, F, N),
            U = new V(0, 0, F, N);
        let O = !1;
        const B = new pi;
        let G = !1,
            H = !1;
        const k = new Ae,
            W = new Y,
            X = {
                background: null,
                fog: null,
                environment: null,
                overrideMaterial: null,
                isScene: !0
            };

        function Q() {
            return null === A ? C : 1
        }
        let j, q, Z, J, K, $, ee, te, ie, ne, re, ae, se, oe, le, ce, de, he, ue, fe, pe, me, ge = i;

        function xe(e, i) {
            for (let n = 0; n < e.length; n++) {
                const r = e[n],
                    a = t.getContext(r, i);
                if (null !== a) return a
            }
            return null
        }
        try {
            const e = {
                alpha: n,
                depth: r,
                stencil: a,
                antialias: s,
                premultipliedAlpha: o,
                preserveDrawingBuffer: l,
                powerPreference: c,
                failIfMajorPerformanceCaveat: d
            };
            if (t.addEventListener("webglcontextlost", ye, !1), t.addEventListener("webglcontextrestored", Me, !1), null === ge) {
                const t = ["webgl2", "webgl", "experimental-webgl"];
                if (!0 === g.isWebGL1Renderer && t.shift(), ge = xe(t, e), null === ge) throw xe(t) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
            }
            void 0 === ge.getShaderPrecisionFormat && (ge.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                }
            })
        } catch (e) {
            throw console.error("THREE.WebGLRenderer: " + e.message), e
        }

        function _e() {
            j = new Li(ge), q = new wi(ge, j, e), j.init(q), pe = new Ar(ge, j, q), Z = new Mr(ge, j, q), J = new Fi(ge), K = new or, $ = new br(ge, j, Z, K, q, pe, J), ee = new Ti(g), te = new gi(ge, q), me = new bi(ge, j, te, q), ie = new Ei(ge, te, J, me), ne = new Di(ge, ie, te, J), he = new Ri(ge), le = new Si(K), re = new sr(g, ee, j, q, me, le), ae = new Pr(K), se = new hr(K), oe = new xr(j, q), de = new Mi(g, ee, Z, ne, o), ce = new yr(g, ne, q), ue = new Ai(ge, j, J, q), fe = new Pi(ge, j, J, q), J.programs = re.programs, g.capabilities = q, g.extensions = j, g.properties = K, g.renderLists = se, g.shadowMap = ce, g.state = Z, g.info = J
        }
        _e();
        const ve = new Er(g, ge);

        function ye(e) {
            e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), x = !0
        }

        function Me() {
            console.log("THREE.WebGLRenderer: Context Restored."), x = !1;
            const e = J.autoReset,
                t = ce.enabled,
                i = ce.autoUpdate,
                n = ce.needsUpdate,
                r = ce.type;
            _e(), J.autoReset = e, ce.enabled = t, ce.autoUpdate = i, ce.needsUpdate = n, ce.type = r
        }

        function be(e) {
            const t = e.target;
            t.removeEventListener("dispose", be),
                function(e) {
                    (function(e) {
                        const t = K.get(e).programs;
                        void 0 !== t && t.forEach((function(e) {
                            re.releaseProgram(e)
                        }))
                    })(e), K.remove(e)
                }(t)
        }
        this.xr = ve, this.getContext = function() {
            return ge
        }, this.getContextAttributes = function() {
            return ge.getContextAttributes()
        }, this.forceContextLoss = function() {
            const e = j.get("WEBGL_lose_context");
            e && e.loseContext()
        }, this.forceContextRestore = function() {
            const e = j.get("WEBGL_lose_context");
            e && e.restoreContext()
        }, this.getPixelRatio = function() {
            return C
        }, this.setPixelRatio = function(e) {
            void 0 !== e && (C = e, this.setSize(F, N, !1))
        }, this.getSize = function(e) {
            return void 0 === e && (console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"), e = new z), e.set(F, N)
        }, this.setSize = function(e, i, n) {
            ve.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (F = e, N = i, t.width = Math.floor(e * C), t.height = Math.floor(i * C), !1 !== n && (t.style.width = e + "px", t.style.height = i + "px"), this.setViewport(0, 0, e, i))
        }, this.getDrawingBufferSize = function(e) {
            return void 0 === e && (console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"), e = new z), e.set(F * C, N * C).floor()
        }, this.setDrawingBufferSize = function(e, i, n) {
            F = e, N = i, C = n, t.width = Math.floor(e * n), t.height = Math.floor(i * n), this.setViewport(0, 0, e, i)
        }, this.getCurrentViewport = function(e) {
            return void 0 === e && (console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"), e = new V), e.copy(L)
        }, this.getViewport = function(e) {
            return e.copy(I)
        }, this.setViewport = function(e, t, i, n) {
            e.isVector4 ? I.set(e.x, e.y, e.z, e.w) : I.set(e, t, i, n), Z.viewport(L.copy(I).multiplyScalar(C).floor())
        }, this.getScissor = function(e) {
            return e.copy(U)
        }, this.setScissor = function(e, t, i, n) {
            e.isVector4 ? U.set(e.x, e.y, e.z, e.w) : U.set(e, t, i, n), Z.scissor(E.copy(U).multiplyScalar(C).floor())
        }, this.getScissorTest = function() {
            return O
        }, this.setScissorTest = function(e) {
            Z.setScissorTest(O = e)
        }, this.setOpaqueSort = function(e) {
            R = e
        }, this.setTransparentSort = function(e) {
            D = e
        }, this.getClearColor = function(e) {
            return void 0 === e && (console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"), e = new _t), e.copy(de.getClearColor())
        }, this.setClearColor = function() {
            de.setClearColor.apply(de, arguments)
        }, this.getClearAlpha = function() {
            return de.getClearAlpha()
        }, this.setClearAlpha = function() {
            de.setClearAlpha.apply(de, arguments)
        }, this.clear = function(e, t, i) {
            let n = 0;
            (void 0 === e || e) && (n |= 16384), (void 0 === t || t) && (n |= 256), (void 0 === i || i) && (n |= 1024), ge.clear(n)
        }, this.clearColor = function() {
            this.clear(!0, !1, !1)
        }, this.clearDepth = function() {
            this.clear(!1, !0, !1)
        }, this.clearStencil = function() {
            this.clear(!1, !1, !0)
        }, this.dispose = function() {
            t.removeEventListener("webglcontextlost", ye, !1), t.removeEventListener("webglcontextrestored", Me, !1), se.dispose(), oe.dispose(), K.dispose(), ee.dispose(), ne.dispose(), me.dispose(), ve.dispose(), ve.removeEventListener("sessionstart", Se), ve.removeEventListener("sessionend", Te), Le.stop()
        }, this.renderBufferImmediate = function(e, t) {
            me.initAttributes();
            const i = K.get(e);
            e.hasPositions && !i.position && (i.position = ge.createBuffer()), e.hasNormals && !i.normal && (i.normal = ge.createBuffer()), e.hasUvs && !i.uv && (i.uv = ge.createBuffer()), e.hasColors && !i.color && (i.color = ge.createBuffer());
            const n = t.getAttributes();
            e.hasPositions && (ge.bindBuffer(34962, i.position), ge.bufferData(34962, e.positionArray, 35048), me.enableAttribute(n.position), ge.vertexAttribPointer(n.position, 3, 5126, !1, 0, 0)), e.hasNormals && (ge.bindBuffer(34962, i.normal), ge.bufferData(34962, e.normalArray, 35048), me.enableAttribute(n.normal), ge.vertexAttribPointer(n.normal, 3, 5126, !1, 0, 0)), e.hasUvs && (ge.bindBuffer(34962, i.uv), ge.bufferData(34962, e.uvArray, 35048), me.enableAttribute(n.uv), ge.vertexAttribPointer(n.uv, 2, 5126, !1, 0, 0)), e.hasColors && (ge.bindBuffer(34962, i.color), ge.bufferData(34962, e.colorArray, 35048), me.enableAttribute(n.color), ge.vertexAttribPointer(n.color, 3, 5126, !1, 0, 0)), me.disableUnusedAttributes(), ge.drawArrays(4, 0, e.count), e.count = 0
        }, this.renderBufferDirect = function(e, t, i, n, r, a) {
            null === t && (t = X);
            const s = r.isMesh && r.matrixWorld.determinant() < 0,
                o = Re(e, t, n, r);
            Z.setMaterial(n, s);
            let l = i.index;
            const c = i.attributes.position;
            if (null === l) {
                if (void 0 === c || 0 === c.count) return
            } else if (0 === l.count) return;
            let d, h = 1;
            !0 === n.wireframe && (l = ie.getWireframeAttribute(i), h = 2), (n.morphTargets || n.morphNormals) && he.update(r, i, n, o), me.setup(r, n, o, i, l);
            let u = ue;
            null !== l && (d = te.get(l), u = fe, u.setIndex(d));
            const f = null !== l ? l.count : c.count,
                p = i.drawRange.start * h,
                m = i.drawRange.count * h,
                g = null !== a ? a.start * h : 0,
                x = null !== a ? a.count * h : 1 / 0,
                _ = Math.max(p, g),
                v = Math.min(f, p + m, g + x) - 1,
                y = Math.max(0, v - _ + 1);
            if (0 !== y) {
                if (r.isMesh) !0 === n.wireframe ? (Z.setLineWidth(n.wireframeLinewidth * Q()), u.setMode(1)) : u.setMode(4);
                else if (r.isLine) {
                    let e = n.linewidth;
                    void 0 === e && (e = 1), Z.setLineWidth(e * Q()), r.isLineSegments ? u.setMode(1) : r.isLineLoop ? u.setMode(2) : u.setMode(3)
                } else r.isPoints ? u.setMode(0) : r.isSprite && u.setMode(4);
                if (r.isInstancedMesh) u.renderInstances(_, y, r.count);
                else if (i.isInstancedBufferGeometry) {
                    const e = Math.min(i.instanceCount, i._maxInstanceCount);
                    u.renderInstances(_, y, e)
                } else u.render(_, y)
            }
        }, this.compile = function(e, t) {
            u = oe.get(e), u.init(), e.traverseVisible((function(e) {
                e.isLight && e.layers.test(t.layers) && (u.pushLight(e), e.castShadow && u.pushShadow(e))
            })), u.setupLights(), e.traverse((function(t) {
                const i = t.material;
                if (i)
                    if (Array.isArray(i))
                        for (let n = 0; n < i.length; n++) {
                            Ne(i[n], e, t)
                        } else Ne(i, e, t)
            }))
        };
        let we = null;

        function Se() {
            Le.stop()
        }

        function Te() {
            Le.start()
        }
        const Le = new mi;

        function Ee(e, t, i, n) {
            if (!1 === e.visible) return;
            if (e.layers.test(t.layers))
                if (e.isGroup) i = e.renderOrder;
                else if (e.isLOD) !0 === e.autoUpdate && e.update(t);
            else if (e.isLight) u.pushLight(e), e.castShadow && u.pushShadow(e);
            else if (e.isSprite) {
                if (!e.frustumCulled || B.intersectsSprite(e)) {
                    n && W.setFromMatrixPosition(e.matrixWorld).applyMatrix4(k);
                    const t = ne.update(e),
                        r = e.material;
                    r.visible && h.push(e, t, r, i, W.z, null)
                }
            } else if (e.isImmediateRenderObject) n && W.setFromMatrixPosition(e.matrixWorld).applyMatrix4(k), h.push(e, null, e.material, i, W.z, null);
            else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.frame !== J.render.frame && (e.skeleton.update(), e.skeleton.frame = J.render.frame), !e.frustumCulled || B.intersectsObject(e))) {
                n && W.setFromMatrixPosition(e.matrixWorld).applyMatrix4(k);
                const t = ne.update(e),
                    r = e.material;
                if (Array.isArray(r)) {
                    const n = t.groups;
                    for (let a = 0, s = n.length; a < s; a++) {
                        const s = n[a],
                            o = r[s.materialIndex];
                        o && o.visible && h.push(e, t, o, i, W.z, s)
                    }
                } else r.visible && h.push(e, t, r, i, W.z, null)
            }
            const r = e.children;
            for (let e = 0, a = r.length; e < a; e++) Ee(r[e], t, i, n)
        }

        function Pe(e, t, i) {
            const n = !0 === t.isScene ? t.overrideMaterial : null;
            for (let r = 0, a = e.length; r < a; r++) {
                const a = e[r],
                    s = a.object,
                    o = a.geometry,
                    l = null === n ? a.material : n,
                    c = a.group;
                if (i.isArrayCamera) {
                    const e = i.cameras;
                    for (let i = 0, n = e.length; i < n; i++) {
                        const n = e[i];
                        s.layers.test(n.layers) && (Z.viewport(L.copy(n.viewport)), u.setupLightsView(n), Fe(s, t, n, o, l, c))
                    }
                } else Fe(s, t, i, o, l, c)
            }
        }

        function Fe(e, t, i, n, r, a) {
            if (e.onBeforeRender(g, t, i, n, r, a), e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), e.isImmediateRenderObject) {
                const n = Re(i, t, r, e);
                Z.setMaterial(r), me.reset(),
                    function(e, t) {
                        e.render((function(e) {
                            g.renderBufferImmediate(e, t)
                        }))
                    }(e, n)
            } else g.renderBufferDirect(i, t, n, r, e, a);
            e.onAfterRender(g, t, i, n, r, a)
        }

        function Ne(e, t, i) {
            !0 !== t.isScene && (t = X);
            const n = K.get(e),
                r = u.state.lights,
                a = u.state.shadowsArray,
                s = r.state.version,
                o = re.getParameters(e, r.state, a, t, i),
                l = re.getProgramCacheKey(o);
            let c = n.programs;
            n.environment = e.isMeshStandardMaterial ? t.environment : null, n.fog = t.fog, n.envMap = ee.get(e.envMap || n.environment), void 0 === c && (e.addEventListener("dispose", be), c = new Map, n.programs = c);
            let d = c.get(l);
            if (void 0 !== d) {
                if (n.currentProgram === d && n.lightsStateVersion === s) return Ce(e, o), d
            } else o.uniforms = re.getUniforms(e), e.onBuild(o, g), e.onBeforeCompile(o, g), d = re.acquireProgram(o, l), c.set(l, d), n.uniforms = o.uniforms;
            const h = n.uniforms;
            (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (h.clippingPlanes = le.uniform), Ce(e, o), n.needsLights = function(e) {
                return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights
            }(e), n.lightsStateVersion = s, n.needsLights && (h.ambientLightColor.value = r.state.ambient, h.lightProbe.value = r.state.probe, h.directionalLights.value = r.state.directional, h.directionalLightShadows.value = r.state.directionalShadow, h.spotLights.value = r.state.spot, h.spotLightShadows.value = r.state.spotShadow, h.rectAreaLights.value = r.state.rectArea, h.ltc_1.value = r.state.rectAreaLTC1, h.ltc_2.value = r.state.rectAreaLTC2, h.pointLights.value = r.state.point, h.pointLightShadows.value = r.state.pointShadow, h.hemisphereLights.value = r.state.hemi, h.directionalShadowMap.value = r.state.directionalShadowMap, h.directionalShadowMatrix.value = r.state.directionalShadowMatrix, h.spotShadowMap.value = r.state.spotShadowMap, h.spotShadowMatrix.value = r.state.spotShadowMatrix, h.pointShadowMap.value = r.state.pointShadowMap, h.pointShadowMatrix.value = r.state.pointShadowMatrix);
            const f = d.getUniforms(),
                p = Bn.seqWithValue(f.seq, h);
            return n.currentProgram = d, n.uniformsList = p, d
        }

        function Ce(e, t) {
            const i = K.get(e);
            i.outputEncoding = t.outputEncoding, i.instancing = t.instancing, i.numClippingPlanes = t.numClippingPlanes, i.numIntersection = t.numClipIntersection, i.vertexAlphas = t.vertexAlphas
        }

        function Re(e, t, i, n) {
            !0 !== t.isScene && (t = X), $.resetTextureUnits();
            const r = t.fog,
                a = i.isMeshStandardMaterial ? t.environment : null,
                s = null === A ? g.outputEncoding : A.texture.encoding,
                o = ee.get(i.envMap || a),
                l = !0 === i.vertexColors && n.geometry && n.geometry.attributes.color && 4 === n.geometry.attributes.color.itemSize,
                c = K.get(i),
                d = u.state.lights;
            if (!0 === G && (!0 === H || e !== T)) {
                const t = e === T && i.id === w;
                le.setState(i, e, t)
            }
            let h = !1;
            i.version === c.__version ? c.needsLights && c.lightsStateVersion !== d.state.version || c.outputEncoding !== s || n.isInstancedMesh && !1 === c.instancing ? h = !0 : n.isInstancedMesh || !0 !== c.instancing ? c.envMap !== o || i.fog && c.fog !== r ? h = !0 : void 0 === c.numClippingPlanes || c.numClippingPlanes === le.numPlanes && c.numIntersection === le.numIntersection ? c.vertexAlphas !== l && (h = !0) : h = !0 : h = !0 : (h = !0, c.__version = i.version);
            let f = c.currentProgram;
            !0 === h && (f = Ne(i, t, n));
            let p = !1,
                m = !1,
                x = !1;
            const v = f.getUniforms(),
                y = c.uniforms;
            if (Z.useProgram(f.program) && (p = !0, m = !0, x = !0), i.id !== w && (w = i.id, m = !0), p || T !== e) {
                if (v.setValue(ge, "projectionMatrix", e.projectionMatrix), q.logarithmicDepthBuffer && v.setValue(ge, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), T !== e && (T = e, m = !0, x = !0), i.isShaderMaterial || i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshStandardMaterial || i.envMap) {
                    const t = v.map.cameraPosition;
                    void 0 !== t && t.setValue(ge, W.setFromMatrixPosition(e.matrixWorld))
                }(i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial) && v.setValue(ge, "isOrthographic", !0 === e.isOrthographicCamera), (i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial || i.isShadowMaterial || i.skinning) && v.setValue(ge, "viewMatrix", e.matrixWorldInverse)
            }
            if (i.skinning) {
                v.setOptional(ge, n, "bindMatrix"), v.setOptional(ge, n, "bindMatrixInverse");
                const e = n.skeleton;
                if (e) {
                    const t = e.bones;
                    if (q.floatVertexTextures) {
                        if (null === e.boneTexture) {
                            let i = Math.sqrt(4 * t.length);
                            M = i, i = Math.pow(2, Math.ceil(Math.log(M) / Math.LN2)), i = Math.max(i, 4);
                            const n = new Float32Array(i * i * 4);
                            n.set(e.boneMatrices);
                            const r = new hi(n, i, i, b, _);
                            e.boneMatrices = n, e.boneTexture = r, e.boneTextureSize = i
                        }
                        v.setValue(ge, "boneTexture", e.boneTexture, $), v.setValue(ge, "boneTextureSize", e.boneTextureSize)
                    } else v.setOptional(ge, e, "boneMatrices")
                }
            }
            var M;
            return (m || c.receiveShadow !== n.receiveShadow) && (c.receiveShadow = n.receiveShadow, v.setValue(ge, "receiveShadow", n.receiveShadow)), m && (v.setValue(ge, "toneMappingExposure", g.toneMappingExposure), c.needsLights && function(e, t) {
                e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t
            }(y, x), r && i.fog && ae.refreshFogUniforms(y, r), ae.refreshMaterialUniforms(y, i, C, N), Bn.upload(ge, c.uniformsList, y, $)), i.isShaderMaterial && !0 === i.uniformsNeedUpdate && (Bn.upload(ge, c.uniformsList, y, $), i.uniformsNeedUpdate = !1), i.isSpriteMaterial && v.setValue(ge, "center", n.center), v.setValue(ge, "modelViewMatrix", n.modelViewMatrix), v.setValue(ge, "normalMatrix", n.normalMatrix), v.setValue(ge, "modelMatrix", n.matrixWorld), f
        }
        Le.setAnimationLoop((function(e) {
            we && we(e)
        })), "undefined" != typeof window && Le.setContext(window), this.setAnimationLoop = function(e) {
            we = e, ve.setAnimationLoop(e), null === e ? Le.stop() : Le.start()
        }, ve.addEventListener("sessionstart", Se), ve.addEventListener("sessionend", Te), this.render = function(e, t) {
            let i, n;
            if (void 0 !== arguments[2] && (console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."), i = arguments[2]), void 0 !== arguments[3] && (console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."), n = arguments[3]), void 0 !== t && !0 !== t.isCamera) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            if (!0 === x) return;
            !0 === e.autoUpdate && e.updateMatrixWorld(), null === t.parent && t.updateMatrixWorld(), !0 === ve.enabled && !0 === ve.isPresenting && (t = ve.getCamera(t)), !0 === e.isScene && e.onBeforeRender(g, e, t, i || A), u = oe.get(e, p.length), u.init(), p.push(u), k.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), B.setFromProjectionMatrix(k), H = this.localClippingEnabled, G = le.init(this.clippingPlanes, H, t), h = se.get(e, f.length), h.init(), f.push(h), Ee(e, t, 0, g.sortObjects), h.finish(), !0 === g.sortObjects && h.sort(R, D), !0 === G && le.beginShadows();
            const r = u.state.shadowsArray;
            ce.render(r, e, t), u.setupLights(), u.setupLightsView(t), !0 === G && le.endShadows(), !0 === this.info.autoReset && this.info.reset(), void 0 !== i && this.setRenderTarget(i), de.render(h, e, t, n);
            const a = h.opaque,
                s = h.transparent;
            a.length > 0 && Pe(a, e, t), s.length > 0 && Pe(s, e, t), null !== A && ($.updateRenderTargetMipmap(A), $.updateMultisampleRenderTarget(A)), !0 === e.isScene && e.onAfterRender(g, e, t), Z.buffers.depth.setTest(!0), Z.buffers.depth.setMask(!0), Z.buffers.color.setMask(!0), Z.setPolygonOffset(!1), me.resetDefaultState(), w = -1, T = null, p.pop(), u = p.length > 0 ? p[p.length - 1] : null, f.pop(), h = f.length > 0 ? f[f.length - 1] : null
        }, this.getActiveCubeFace = function() {
            return y
        }, this.getActiveMipmapLevel = function() {
            return M
        }, this.getRenderTarget = function() {
            return A
        }, this.setRenderTarget = function(e, t = 0, i = 0) {
            A = e, y = t, M = i, e && void 0 === K.get(e).__webglFramebuffer && $.setupRenderTarget(e);
            let n = null,
                r = !1,
                a = !1;
            if (e) {
                const i = e.texture;
                (i.isDataTexture3D || i.isDataTexture2DArray) && (a = !0);
                const s = K.get(e).__webglFramebuffer;
                e.isWebGLCubeRenderTarget ? (n = s[t], r = !0) : n = e.isWebGLMultisampleRenderTarget ? K.get(e).__webglMultisampledFramebuffer : s, L.copy(e.viewport), E.copy(e.scissor), P = e.scissorTest
            } else L.copy(I).multiplyScalar(C).floor(), E.copy(U).multiplyScalar(C).floor(), P = O;
            if (Z.bindFramebuffer(36160, n), Z.viewport(L), Z.scissor(E), Z.setScissorTest(P), r) {
                const n = K.get(e.texture);
                ge.framebufferTexture2D(36160, 36064, 34069 + t, n.__webglTexture, i)
            } else if (a) {
                const n = K.get(e.texture),
                    r = t || 0;
                ge.framebufferTextureLayer(36160, 36064, n.__webglTexture, i || 0, r)
            }
        }, this.readRenderTargetPixels = function(e, t, i, n, r, a, s) {
            if (!e || !e.isWebGLRenderTarget) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
            let o = K.get(e).__webglFramebuffer;
            if (e.isWebGLCubeRenderTarget && void 0 !== s && (o = o[s]), o) {
                Z.bindFramebuffer(36160, o);
                try {
                    const s = e.texture,
                        o = s.format,
                        l = s.type;
                    if (o !== b && pe.convert(o) !== ge.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                    const c = l === v && (j.has("EXT_color_buffer_half_float") || q.isWebGL2 && j.has("EXT_color_buffer_float"));
                    if (!(l === m || pe.convert(l) === ge.getParameter(35738) || l === _ && (q.isWebGL2 || j.has("OES_texture_float") || j.has("WEBGL_color_buffer_float")) || c)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                    36053 === ge.checkFramebufferStatus(36160) ? t >= 0 && t <= e.width - n && i >= 0 && i <= e.height - r && ge.readPixels(t, i, n, r, pe.convert(o), pe.convert(l), a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
                } finally {
                    const e = null !== A ? K.get(A).__webglFramebuffer : null;
                    Z.bindFramebuffer(36160, e)
                }
            }
        }, this.copyFramebufferToTexture = function(e, t, i = 0) {
            const n = Math.pow(2, -i),
                r = Math.floor(t.image.width * n),
                a = Math.floor(t.image.height * n),
                s = pe.convert(t.format);
            $.setTexture2D(t, 0), ge.copyTexImage2D(3553, i, s, e.x, e.y, r, a, 0), Z.unbindTexture()
        }, this.copyTextureToTexture = function(e, t, i, n = 0) {
            const r = t.image.width,
                a = t.image.height,
                s = pe.convert(i.format),
                o = pe.convert(i.type);
            $.setTexture2D(i, 0), ge.pixelStorei(37440, i.flipY), ge.pixelStorei(37441, i.premultiplyAlpha), ge.pixelStorei(3317, i.unpackAlignment), t.isDataTexture ? ge.texSubImage2D(3553, n, e.x, e.y, r, a, s, o, t.image.data) : t.isCompressedTexture ? ge.compressedTexSubImage2D(3553, n, e.x, e.y, t.mipmaps[0].width, t.mipmaps[0].height, s, t.mipmaps[0].data) : ge.texSubImage2D(3553, n, e.x, e.y, s, o, t.image), 0 === n && i.generateMipmaps && ge.generateMipmap(3553), Z.unbindTexture()
        }, this.copyTextureToTexture3D = function(e, t, i, n, r = 0) {
            if (g.isWebGL1Renderer) return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
            const {
                width: a,
                height: s,
                data: o
            } = i.image, l = pe.convert(n.format), c = pe.convert(n.type);
            let d;
            if (n.isDataTexture3D) $.setTexture3D(n, 0), d = 32879;
            else {
                if (!n.isDataTexture2DArray) return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
                $.setTexture2DArray(n, 0), d = 35866
            }
            ge.pixelStorei(37440, n.flipY), ge.pixelStorei(37441, n.premultiplyAlpha), ge.pixelStorei(3317, n.unpackAlignment);
            const h = ge.getParameter(3314),
                u = ge.getParameter(32878),
                f = ge.getParameter(3316),
                p = ge.getParameter(3315),
                m = ge.getParameter(32877);
            ge.pixelStorei(3314, a), ge.pixelStorei(32878, s), ge.pixelStorei(3316, e.min.x), ge.pixelStorei(3315, e.min.y), ge.pixelStorei(32877, e.min.z), ge.texSubImage3D(d, r, t.x, t.y, t.z, e.max.x - e.min.x + 1, e.max.y - e.min.y + 1, e.max.z - e.min.z + 1, l, c, o), ge.pixelStorei(3314, h), ge.pixelStorei(32878, u), ge.pixelStorei(3316, f), ge.pixelStorei(3315, p), ge.pixelStorei(32877, m), 0 === r && n.generateMipmaps && ge.generateMipmap(d), Z.unbindTexture()
        }, this.initTexture = function(e) {
            $.setTexture2D(e, 0), Z.unbindTexture()
        }, this.resetState = function() {
            y = 0, M = 0, A = null, Z.reset(), me.reset()
        }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
            detail: this
        }))
    }
    class Nr extends je {
        constructor() {
            super(), this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
                detail: this
            }))
        }
        copy(e, t) {
            return super.copy(e, t), null !== e.background && (this.background = e.background.clone()), null !== e.environment && (this.environment = e.environment.clone()), null !== e.fog && (this.fog = e.fog.clone()), null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.autoUpdate = e.autoUpdate, this.matrixAutoUpdate = e.matrixAutoUpdate, this
        }
        toJSON(e) {
            const t = super.toJSON(e);
            return null !== this.background && (t.object.background = this.background.toJSON(e)), null !== this.environment && (t.object.environment = this.environment.toJSON(e)), null !== this.fog && (t.object.fog = this.fog.toJSON()), t
        }
    }
    Nr.prototype.isScene = !0;
    class Cr extends ai {
        constructor(e = -1, t = 1, i = 1, n = -1, r = .1, a = 2e3) {
            super(), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = n, this.near = r, this.far = a, this.updateProjectionMatrix()
        }
        copy(e, t) {
            return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = null === e.view ? null : Object.assign({}, e.view), this
        }
        setViewOffset(e, t, i, n, r, a) {
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = a, this.updateProjectionMatrix()
        }
        clearViewOffset() {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
        }
        updateProjectionMatrix() {
            const e = (this.right - this.left) / (2 * this.zoom),
                t = (this.top - this.bottom) / (2 * this.zoom),
                i = (this.right + this.left) / 2,
                n = (this.top + this.bottom) / 2;
            let r = i - e,
                a = i + e,
                s = n + t,
                o = n - t;
            if (null !== this.view && this.view.enabled) {
                const e = (this.right - this.left) / this.view.fullWidth / this.zoom,
                    t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                r += e * this.view.offsetX, a = r + e * this.view.width, s -= t * this.view.offsetY, o = s - t * this.view.height
            }
            this.projectionMatrix.makeOrthographic(r, a, s, o, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }
        toJSON(e) {
            const t = super.toJSON(e);
            return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, null !== this.view && (t.object.view = Object.assign({}, this.view)), t
        }
    }
    Cr.prototype.isOrthographicCamera = !0;
    class Rr {
        constructor(e = !0) {
            this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
        }
        start() {
            this.startTime = Dr(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
        }
        stop() {
            this.getElapsedTime(), this.running = !1, this.autoStart = !1
        }
        getElapsedTime() {
            return this.getDelta(), this.elapsedTime
        }
        getDelta() {
            let e = 0;
            if (this.autoStart && !this.running) return this.start(), 0;
            if (this.running) {
                const t = Dr();
                e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e
            }
            return e
        }
    }

    function Dr() {
        return ("undefined" == typeof performance ? Date : performance).now()
    }
    class Ir {
        constructor(e = 1, t = 0, i = 0) {
            return this.radius = e, this.phi = t, this.theta = i, this
        }
        set(e, t, i) {
            return this.radius = e, this.phi = t, this.theta = i, this
        }
        copy(e) {
            return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this
        }
        makeSafe() {
            const e = 1e-6;
            return this.phi = Math.max(e, Math.min(Math.PI - e, this.phi)), this
        }
        setFromVector3(e) {
            return this.setFromCartesianCoords(e.x, e.y, e.z)
        }
        setFromCartesianCoords(e, t, i) {
            return this.radius = Math.sqrt(e * e + t * t + i * i), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, i), this.phi = Math.acos(R(t / this.radius, -1, 1))), this
        }
        clone() {
            return (new this.constructor).copy(this)
        }
    }

    function Ur(e, t, i, n, r, a, s, o) {
        const l = (e, t, i, n) => [new z(e / s, 1 - n / o), new z(i / s, 1 - n / o), new z(i / s, 1 - t / o), new z(e / s, 1 - t / o)],
            c = l(t + a, i, t + n + a, i + a),
            d = l(t + n + a, i, t + 2 * n + a, i + a),
            h = l(t, i + a, t + a, i + a + r),
            u = l(t + a, i + a, t + n + a, i + a + r),
            f = l(t + n + a, i + a, t + n + 2 * a, i + r + a),
            p = l(t + n + 2 * a, i + a, t + 2 * n + 2 * a, i + r + a),
            m = e.attributes.uv;
        m.copyVector2sArray([f[3], f[2], f[0], f[1], h[3], h[2], h[0], h[1], c[3], c[2], c[0], c[1], d[0], d[1], d[3], d[2], u[3], u[2], u[0], u[1], p[3], p[2], p[0], p[1]]), m.needsUpdate = !0
    }

    function zr(e, t, i, n, r, a) {
        Ur(e, t, i, n, r, a, 64, 64)
    }

    function Or(e, t, i, n, r, a) {
        Ur(e, t, i, n, r, a, 64, 32)
    }
    class Br extends Sr {
        constructor(e, t) {
            super(), this.innerLayer = e, this.outerLayer = t, e.name = "inner", t.name = "outer"
        }
    }
    class Gr extends Sr {
        constructor(e) {
            super(), this.modelListeners = [], this.slim = !1;
            const t = new vt({
                    map: e,
                    side: 0
                }),
                i = new vt({
                    map: e,
                    side: 2,
                    transparent: !0,
                    alphaTest: 1e-5
                }),
                n = t.clone();
            n.polygonOffset = !0, n.polygonOffsetFactor = 1, n.polygonOffsetUnits = 1;
            const r = i.clone();
            r.polygonOffset = !0, r.polygonOffsetFactor = 1, r.polygonOffsetUnits = 1;
            const a = new ei(8, 8, 8);
            zr(a, 0, 0, 8, 8, 8);
            const s = new Kt(a, t),
                o = new ei(9, 9, 9);
            zr(o, 32, 0, 8, 8, 8);
            const l = new Kt(o, i);
            this.head = new Br(s, l), this.head.name = "head", this.head.add(s, l), this.head.position.y = 4, this.add(this.head);
            const c = new ei(8, 12, 4);
            zr(c, 16, 16, 8, 12, 4);
            const d = new Kt(c, t),
                h = new ei(8.5, 12.5, 4.5);
            zr(h, 16, 32, 8, 12, 4);
            const u = new Kt(h, i);
            this.body = new Br(d, u), this.body.name = "body", this.body.add(d, u), this.body.position.y = -6, this.add(this.body);
            const f = new ei,
                p = new Kt(f, n);
            this.modelListeners.push(() => {
                p.scale.x = this.slim ? 3 : 4, p.scale.y = 12, p.scale.z = 4, zr(f, 40, 16, this.slim ? 3 : 4, 12, 4)
            });
            const m = new ei,
                g = new Kt(m, r);
            this.modelListeners.push(() => {
                g.scale.x = this.slim ? 3.5 : 4.5, g.scale.y = 12.5, g.scale.z = 4.5, zr(m, 40, 32, this.slim ? 3 : 4, 12, 4)
            });
            const x = new Sr;
            x.add(p, g), this.modelListeners.push(() => {
                x.position.x = this.slim ? -.5 : -1
            }), x.position.y = -4, this.rightArm = new Br(p, g), this.rightArm.name = "rightArm", this.rightArm.add(x), this.rightArm.position.x = -5, this.rightArm.position.y = -2, this.add(this.rightArm);
            const _ = new ei,
                v = new Kt(_, n);
            this.modelListeners.push(() => {
                v.scale.x = this.slim ? 3 : 4, v.scale.y = 12, v.scale.z = 4, zr(_, 32, 48, this.slim ? 3 : 4, 12, 4)
            });
            const y = new ei,
                M = new Kt(y, r);
            this.modelListeners.push(() => {
                M.scale.x = this.slim ? 3.5 : 4.5, M.scale.y = 12.5, M.scale.z = 4.5, zr(y, 48, 48, this.slim ? 3 : 4, 12, 4)
            });
            const b = new Sr;
            b.add(v, M), this.modelListeners.push(() => {
                b.position.x = this.slim ? .5 : 1
            }), b.position.y = -4, this.leftArm = new Br(v, M), this.leftArm.name = "leftArm", this.leftArm.add(b), this.leftArm.position.x = 5, this.leftArm.position.y = -2, this.add(this.leftArm);
            const A = new ei(4, 12, 4);
            zr(A, 0, 16, 4, 12, 4);
            const w = new Kt(A, n),
                S = new ei(4.5, 12.5, 4.5);
            zr(S, 0, 32, 4, 12, 4);
            const T = new Kt(S, r),
                L = new Sr;
            L.add(w, T), L.position.y = -6, this.rightLeg = new Br(w, T), this.rightLeg.name = "rightLeg", this.rightLeg.add(L), this.rightLeg.position.x = -1.9, this.rightLeg.position.y = -12, this.rightLeg.position.z = -.1, this.add(this.rightLeg);
            const E = new ei(4, 12, 4);
            zr(E, 16, 48, 4, 12, 4);
            const P = new Kt(E, n),
                F = new ei(4.5, 12.5, 4.5);
            zr(F, 0, 48, 4, 12, 4);
            const N = new Kt(F, r),
                C = new Sr;
            C.add(P, N), C.position.y = -6, this.leftLeg = new Br(P, N), this.leftLeg.name = "leftLeg", this.leftLeg.add(C), this.leftLeg.position.x = 1.9, this.leftLeg.position.y = -12, this.leftLeg.position.z = -.1, this.add(this.leftLeg), this.modelType = "default"
        }
        get modelType() {
            return this.slim ? "slim" : "default"
        }
        set modelType(e) {
            this.slim = "slim" === e, this.modelListeners.forEach(e => e())
        }
        getBodyParts() {
            return this.children.filter(e => e instanceof Br)
        }
        setInnerLayerVisible(e) {
            this.getBodyParts().forEach(t => t.innerLayer.visible = e)
        }
        setOuterLayerVisible(e) {
            this.getBodyParts().forEach(t => t.outerLayer.visible = e)
        }
    }
    class Hr extends Sr {
        constructor(e) {
            super();
            const t = new vt({
                    map: e,
                    side: 2,
                    transparent: !0,
                    alphaTest: 1e-5
                }),
                i = new ei(10, 16, 1);
            Or(i, 0, 0, 10, 16, 1), this.cape = new Kt(i, t), this.cape.position.y = -8, this.cape.position.z = .5, this.add(this.cape)
        }
    }
    class kr extends Sr {
        constructor(e) {
            super();
            const t = new vt({
                    map: e,
                    side: 2,
                    transparent: !0,
                    alphaTest: 1e-5
                }),
                i = new ei(12, 22, 4);
            Or(i, 22, 0, 10, 20, 2);
            const n = new Kt(i, t);
            n.position.x = -5, n.position.y = -10, n.position.z = -1, this.leftWing = new Sr, this.leftWing.add(n), this.add(this.leftWing);
            const r = new ei(12, 22, 4);
            Or(r, 22, 0, 10, 20, 2);
            const a = new Kt(r, t);
            a.scale.x = -1, a.position.x = 5, a.position.y = -10, a.position.z = -1, this.rightWing = new Sr, this.rightWing.add(a), this.add(this.rightWing), this.leftWing.position.x = 5, this.leftWing.rotation.x = .2617994, this.leftWing.rotation.y = .01, this.leftWing.rotation.z = .2617994, this.updateRightWing()
        }
        updateRightWing() {
            this.rightWing.position.x = -this.leftWing.position.x, this.rightWing.position.y = this.leftWing.position.y, this.rightWing.rotation.x = this.leftWing.rotation.x, this.rightWing.rotation.y = -this.leftWing.rotation.y, this.rightWing.rotation.z = -this.leftWing.rotation.z
        }
    }
    class Vr extends Sr {
        constructor(e, t) {
            super(), this.skin = new Gr(e), this.skin.name = "skin", this.add(this.skin), this.cape = new Hr(t), this.cape.name = "cape", this.cape.position.z = -2, this.cape.rotation.x = 10.8 * Math.PI / 180, this.cape.rotation.y = Math.PI, this.add(this.cape), this.elytra = new kr(t), this.elytra.name = "elytra", this.elytra.position.z = -2, this.elytra.visible = !1, this.add(this.elytra)
        }
        get backEquipment() {
            return this.cape.visible ? "cape" : this.elytra.visible ? "elytra" : null
        }
        set backEquipment(e) {
            this.cape.visible = "cape" === e, this.elytra.visible = "elytra" === e
        }
    }

    function Wr(e) {
        return e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap || "undefined" != typeof OffscreenCanvas && e instanceof OffscreenCanvas
    }

    function Xr(e, t, i, n, r) {
        const a = e.getImageData(t, i, n, r);
        for (let e = 0; e < n; e++)
            for (let t = 0; t < r; t++) {
                const i = 4 * (e + t * n);
                if (255 !== a.data[i + 3]) return !0
            }
        return !1
    }

    function Yr(e) {
        return e / 64
    }

    function Qr(e, t) {
        const i = Yr(t),
            n = (t, n, r, a, s, o, l) => function(e, t, i, n, r, a, s, o) {
                const l = e.getImageData(t, i, n, r);
                if (o)
                    for (let e = 0; e < r; e++)
                        for (let t = 0; t < n / 2; t++) {
                            const i = 4 * (t + e * n),
                                r = 4 * (n - t - 1 + e * n),
                                a = l.data[i],
                                s = l.data[i + 1],
                                o = l.data[i + 2],
                                c = l.data[i + 3],
                                d = l.data[r],
                                h = l.data[r + 1],
                                u = l.data[r + 2],
                                f = l.data[r + 3];
                            l.data[i] = d, l.data[i + 1] = h, l.data[i + 2] = u, l.data[i + 3] = f, l.data[r] = a, l.data[r + 1] = s, l.data[r + 2] = o, l.data[r + 3] = c
                        }
                e.putImageData(l, a, s)
            }(e, t * i, n * i, r * i, a * i, s * i, o * i, l);
        ! function(e, t) {
            if (!Xr(e, 0, 0, t, t / 2)) {
                const i = Yr(t),
                    n = (t, n, r, a) => e.clearRect(t * i, n * i, r * i, a * i);
                n(40, 0, 8, 8), n(48, 0, 8, 8), n(32, 8, 8, 8), n(40, 8, 8, 8), n(48, 8, 8, 8), n(56, 8, 8, 8)
            }
        }(e, t), n(4, 16, 4, 4, 20, 48, !0), n(8, 16, 4, 4, 24, 48, !0), n(0, 20, 4, 12, 24, 52, !0), n(4, 20, 4, 12, 20, 52, !0), n(8, 20, 4, 12, 16, 52, !0), n(12, 20, 4, 12, 28, 52, !0), n(44, 16, 4, 4, 36, 48, !0), n(48, 16, 4, 4, 40, 48, !0), n(40, 20, 4, 12, 40, 52, !0), n(44, 20, 4, 12, 36, 52, !0), n(48, 20, 4, 12, 32, 52, !0), n(52, 20, 4, 12, 44, 52, !0)
    }

    function jr(e, t) {
        const i = function(e) {
            if (e.width === 2 * e.height) return e.width / 64;
            if (17 * e.width == 22 * e.height) return e.width / 22;
            if (11 * e.width == 23 * e.height) return e.width / 46;
            throw new Error(`Bad cape size: ${e.width}x${e.height}`)
        }(t);
        e.width = 64 * i, e.height = 32 * i;
        const n = e.getContext("2d");
        n.clearRect(0, 0, e.width, e.height), n.drawImage(t, 0, 0, t.width, t.height)
    }
    async function qr(e) {
        const t = document.createElement("img");
        return new Promise((i, n) => {
            t.onload = () => i(t), t.onerror = n, t.crossOrigin = "anonymous", "string" == typeof e ? t.src = e : (void 0 !== e.crossOrigin && (t.crossOrigin = e.crossOrigin), void 0 !== e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.src = e.src)
        })
    }

    function Zr(e, t, i) {
        e instanceof Function ? e(t, i) : e.play(t, i)
    }
    class Jr {
        constructor(e) {
            this.speed = 1, this.paused = !1, this.progress = 0, this.lastTime = 0, this.started = !1, this.toResetAndRemove = !1, this.animation = e
        }
        play(e, t) {
            if (this.toResetAndRemove) return Zr(this.animation, e, 0), void this.remove();
            let i;
            this.started ? i = t - this.lastTime : (i = 0, this.started = !0), this.lastTime = t, this.paused || (this.progress += i * this.speed), Zr(this.animation, e, this.progress)
        }
        reset() {
            this.progress = 0
        }
        remove() {}
        resetAndRemove() {
            this.toResetAndRemove = !0
        }
    }
    class Kr {
        constructor() {
            this.handles = new Set
        }
        add(e) {
            const t = new Jr(e);
            return t.remove = () => {
                this.handles.delete(t)
            }, this.handles.add(t), t
        }
        play(e, t) {
            this.handles.forEach(i => i.play(e, t))
        }
    }
    class $r extends Kr {
        constructor() {
            super(...arguments), this.speed = 1, this.progress = 0, this.clock = new Rr(!0)
        }
        get animation() {
            return this
        }
        get paused() {
            return !this.clock.running
        }
        set paused(e) {
            e ? this.clock.stop() : this.clock.start()
        }
        runAnimationLoop(e) {
            0 !== this.handles.size && (this.progress += this.clock.getDelta() * this.speed, this.play(e, this.progress))
        }
        reset() {
            this.progress = 0
        }
    }
    class ea {
        constructor(e = {}) {
            this.animations = new $r, this._disposed = !1, this._renderPaused = !1, this.canvas = void 0 === e.canvas ? document.createElement("canvas") : e.canvas, this.skinCanvas = document.createElement("canvas"), this.skinTexture = new H(this.skinCanvas), this.skinTexture.magFilter = u, this.skinTexture.minFilter = u, this.capeCanvas = document.createElement("canvas"), this.capeTexture = new H(this.capeCanvas), this.capeTexture.magFilter = u, this.capeTexture.minFilter = u, this.scene = new Nr, this.camera = new si(40), this.camera.position.y = -8, this.camera.position.z = 60, this.renderer = new Fr({
                canvas: this.canvas,
                alpha: !1 !== e.alpha,
                preserveDrawingBuffer: !0 === e.preserveDrawingBuffer
            }), this.renderer.setPixelRatio(window.devicePixelRatio), this.playerObject = new Vr(this.skinTexture, this.capeTexture), this.playerObject.name = "player", this.playerObject.skin.visible = !1, this.playerObject.cape.visible = !1, this.scene.add(this.playerObject), void 0 !== e.skin && this.loadSkin(e.skin, e.model), void 0 !== e.cape && this.loadCape(e.cape), void 0 !== e.width && (this.width = e.width), void 0 !== e.height && (this.height = e.height), !0 === e.renderPaused ? this._renderPaused = !0 : window.requestAnimationFrame(() => this.draw())
        }
        loadSkin(e, t = "auto-detect", i = {}) {
            if (null === e) this.resetSkin();
            else {
                if (!Wr(e)) return qr(e).then(e => this.loadSkin(e, t, i)); {
                    ! function(e, t) {
                        let i = !1;
                        if (t.width !== t.height) {
                            if (t.width !== 2 * t.height) throw new Error(`Bad skin size: ${t.width}x${t.height}`);
                            i = !0
                        }
                        const n = e.getContext("2d");
                        if (i) {
                            const i = t.width;
                            e.width = i, e.height = i, n.clearRect(0, 0, i, i), n.drawImage(t, 0, 0, i, i / 2), Qr(n, i)
                        } else e.width = t.width, e.height = t.height, n.clearRect(0, 0, t.width, t.height), n.drawImage(t, 0, 0, e.width, e.height)
                    }(this.skinCanvas, e);
                    const n = "auto-detect" === t ? function(e) {
                        const t = Yr(e.width),
                            i = e.getContext("2d"),
                            n = (e, n, r, a) => Xr(i, e * t, n * t, r * t, a * t),
                            r = (e, n, r, a) => function(e, t, i, n, r) {
                                const a = e.getImageData(t, i, n, r);
                                for (let e = 0; e < n; e++)
                                    for (let t = 0; t < r; t++) {
                                        const i = 4 * (e + t * n);
                                        if (0 !== a.data[i + 0] || 0 !== a.data[i + 1] || 0 !== a.data[i + 2] || 255 !== a.data[i + 3]) return !1
                                    }
                                return !0
                            }(i, e * t, n * t, r * t, a * t);
                        return n(50, 16, 2, 4) || n(54, 20, 2, 12) || n(42, 48, 2, 4) || n(46, 52, 2, 12) || r(50, 16, 2, 4) && r(54, 20, 2, 12) && r(42, 48, 2, 4) && r(46, 52, 2, 12) ? "slim" : "default"
                    }(this.skinCanvas) : t;
                    this.skinTexture.needsUpdate = !0, this.playerObject.skin.modelType = n, !1 !== i.makeVisible && (this.playerObject.skin.visible = !0)
                }
            }
        }
        resetSkin() {
            this.playerObject.skin.visible = !1
        }
        loadCape(e, t = {}) {
            if (null === e) this.resetCape();
            else {
                if (!Wr(e)) return qr(e).then(e => this.loadCape(e, t));
                jr(this.capeCanvas, e), this.capeTexture.needsUpdate = !0, !1 !== t.makeVisible && (this.playerObject.backEquipment = void 0 === t.backEquipment ? "cape" : t.backEquipment)
            }
        }
        resetCape() {
            this.playerObject.backEquipment = null
        }
        draw() {
            this.disposed || this._renderPaused || (this.animations.runAnimationLoop(this.playerObject), this.render(), window.requestAnimationFrame(() => this.draw()))
        }
        render() {
            this.renderer.render(this.scene, this.camera)
        }
        setSize(e, t) {
            this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t)
        }
        dispose() {
            this._disposed = !0, this.renderer.dispose(), this.skinTexture.dispose(), this.capeTexture.dispose()
        }
        get disposed() {
            return this._disposed
        }
        get renderPaused() {
            return this._renderPaused
        }
        set renderPaused(e) {
            const t = !this.disposed && !e && this._renderPaused;
            this._renderPaused = e, t && window.requestAnimationFrame(() => this.draw())
        }
        get width() {
            return this.renderer.getSize(new z).width
        }
        set width(e) {
            this.setSize(e, this.height)
        }
        get height() {
            return this.renderer.getSize(new z).height
        }
        set height(e) {
            this.setSize(this.width, e)
        }
    }
    const ta = {
            type: "change"
        },
        ia = {
            type: "start"
        },
        na = {
            type: "end"
        };
    class ra extends E {
        constructor(e, l) {
            super(), void 0 === l && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'), l === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.object = e, this.domElement = l, this.enabled = !0, this.target = new Y, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
                LEFT: "ArrowLeft",
                UP: "ArrowUp",
                RIGHT: "ArrowRight",
                BOTTOM: "ArrowDown"
            }, this.mouseButtons = {
                LEFT: t,
                MIDDLE: i,
                RIGHT: n
            }, this.touches = {
                ONE: r,
                TWO: s
            }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
                return f.phi
            }, this.getAzimuthalAngle = function() {
                return f.theta
            }, this.listenToKeyEvents = function(e) {
                e.addEventListener("keydown", Z), this._domElementKeyEvents = e
            }, this.saveState = function() {
                c.target0.copy(c.target), c.position0.copy(c.object.position), c.zoom0 = c.object.zoom
            }, this.reset = function() {
                c.target.copy(c.target0), c.object.position.copy(c.position0), c.object.zoom = c.zoom0, c.object.updateProjectionMatrix(), c.dispatchEvent(ta), c.update(), h = d.NONE
            }, this.update = function() {
                const t = new Y,
                    i = (new X).setFromUnitVectors(e.up, new Y(0, 1, 0)),
                    n = i.clone().invert(),
                    r = new Y,
                    a = new X,
                    s = 2 * Math.PI;
                return function() {
                    const e = c.object.position;
                    t.copy(e).sub(c.target), t.applyQuaternion(i), f.setFromVector3(t), c.autoRotate && h === d.NONE && E(2 * Math.PI / 60 / 60 * c.autoRotateSpeed), c.enableDamping ? (f.theta += p.theta * c.dampingFactor, f.phi += p.phi * c.dampingFactor) : (f.theta += p.theta, f.phi += p.phi);
                    let o = c.minAzimuthAngle,
                        l = c.maxAzimuthAngle;
                    return isFinite(o) && isFinite(l) && (o < -Math.PI ? o += s : o > Math.PI && (o -= s), l < -Math.PI ? l += s : l > Math.PI && (l -= s), f.theta = o <= l ? Math.max(o, Math.min(l, f.theta)) : f.theta > (o + l) / 2 ? Math.max(o, f.theta) : Math.min(l, f.theta)), f.phi = Math.max(c.minPolarAngle, Math.min(c.maxPolarAngle, f.phi)), f.makeSafe(), f.radius *= m, f.radius = Math.max(c.minDistance, Math.min(c.maxDistance, f.radius)), !0 === c.enableDamping ? c.target.addScaledVector(g, c.dampingFactor) : c.target.add(g), t.setFromSpherical(f), t.applyQuaternion(n), e.copy(c.target).add(t), c.object.lookAt(c.target), !0 === c.enableDamping ? (p.theta *= 1 - c.dampingFactor, p.phi *= 1 - c.dampingFactor, g.multiplyScalar(1 - c.dampingFactor)) : (p.set(0, 0, 0), g.set(0, 0, 0)), m = 1, !!(x || r.distanceToSquared(c.object.position) > u || 8 * (1 - a.dot(c.object.quaternion)) > u) && (c.dispatchEvent(ta), r.copy(c.object.position), a.copy(c.object.quaternion), x = !1, !0)
                }
            }(), this.dispose = function() {
                c.domElement.removeEventListener("contextmenu", ee), c.domElement.removeEventListener("pointerdown", W), c.domElement.removeEventListener("wheel", q), c.domElement.removeEventListener("touchstart", J), c.domElement.removeEventListener("touchend", $), c.domElement.removeEventListener("touchmove", K), c.domElement.ownerDocument.removeEventListener("pointermove", Q), c.domElement.ownerDocument.removeEventListener("pointerup", j), null !== c._domElementKeyEvents && c._domElementKeyEvents.removeEventListener("keydown", Z)
            };
            const c = this,
                d = {
                    NONE: -1,
                    ROTATE: 0,
                    DOLLY: 1,
                    PAN: 2,
                    TOUCH_ROTATE: 3,
                    TOUCH_PAN: 4,
                    TOUCH_DOLLY_PAN: 5,
                    TOUCH_DOLLY_ROTATE: 6
                };
            let h = d.NONE;
            const u = 1e-6,
                f = new Ir,
                p = new Ir;
            let m = 1;
            const g = new Y;
            let x = !1;
            const _ = new z,
                v = new z,
                y = new z,
                M = new z,
                b = new z,
                A = new z,
                w = new z,
                S = new z,
                T = new z;

            function L() {
                return Math.pow(.95, c.zoomSpeed)
            }

            function E(e) {
                p.theta -= e
            }

            function P(e) {
                p.phi -= e
            }
            const F = function() {
                    const e = new Y;
                    return function(t, i) {
                        e.setFromMatrixColumn(i, 0), e.multiplyScalar(-t), g.add(e)
                    }
                }(),
                N = function() {
                    const e = new Y;
                    return function(t, i) {
                        !0 === c.screenSpacePanning ? e.setFromMatrixColumn(i, 1) : (e.setFromMatrixColumn(i, 0), e.crossVectors(c.object.up, e)), e.multiplyScalar(t), g.add(e)
                    }
                }(),
                C = function() {
                    const e = new Y;
                    return function(t, i) {
                        const n = c.domElement;
                        if (c.object.isPerspectiveCamera) {
                            const r = c.object.position;
                            e.copy(r).sub(c.target);
                            let a = e.length();
                            a *= Math.tan(c.object.fov / 2 * Math.PI / 180), F(2 * t * a / n.clientHeight, c.object.matrix), N(2 * i * a / n.clientHeight, c.object.matrix)
                        } else c.object.isOrthographicCamera ? (F(t * (c.object.right - c.object.left) / c.object.zoom / n.clientWidth, c.object.matrix), N(i * (c.object.top - c.object.bottom) / c.object.zoom / n.clientHeight, c.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), c.enablePan = !1)
                    }
                }();

            function R(e) {
                c.object.isPerspectiveCamera ? m /= e : c.object.isOrthographicCamera ? (c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom * e)), c.object.updateProjectionMatrix(), x = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), c.enableZoom = !1)
            }

            function D(e) {
                c.object.isPerspectiveCamera ? m *= e : c.object.isOrthographicCamera ? (c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom / e)), c.object.updateProjectionMatrix(), x = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), c.enableZoom = !1)
            }

            function I(e) {
                _.set(e.clientX, e.clientY)
            }

            function U(e) {
                M.set(e.clientX, e.clientY)
            }

            function O(e) {
                if (1 == e.touches.length) _.set(e.touches[0].pageX, e.touches[0].pageY);
                else {
                    const t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                        i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                    _.set(t, i)
                }
            }

            function B(e) {
                if (1 == e.touches.length) M.set(e.touches[0].pageX, e.touches[0].pageY);
                else {
                    const t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                        i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                    M.set(t, i)
                }
            }

            function G(e) {
                const t = e.touches[0].pageX - e.touches[1].pageX,
                    i = e.touches[0].pageY - e.touches[1].pageY,
                    n = Math.sqrt(t * t + i * i);
                w.set(0, n)
            }

            function H(e) {
                if (1 == e.touches.length) v.set(e.touches[0].pageX, e.touches[0].pageY);
                else {
                    const t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                        i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                    v.set(t, i)
                }
                y.subVectors(v, _).multiplyScalar(c.rotateSpeed);
                const t = c.domElement;
                E(2 * Math.PI * y.x / t.clientHeight), P(2 * Math.PI * y.y / t.clientHeight), _.copy(v)
            }

            function k(e) {
                if (1 == e.touches.length) b.set(e.touches[0].pageX, e.touches[0].pageY);
                else {
                    const t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                        i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                    b.set(t, i)
                }
                A.subVectors(b, M).multiplyScalar(c.panSpeed), C(A.x, A.y), M.copy(b)
            }

            function V(e) {
                const t = e.touches[0].pageX - e.touches[1].pageX,
                    i = e.touches[0].pageY - e.touches[1].pageY,
                    n = Math.sqrt(t * t + i * i);
                S.set(0, n), T.set(0, Math.pow(S.y / w.y, c.zoomSpeed)), R(T.y), w.copy(S)
            }

            function W(e) {
                if (!1 !== c.enabled) switch (e.pointerType) {
                    case "mouse":
                    case "pen":
                        ! function(e) {
                            let r;
                            switch (c.domElement.focus ? c.domElement.focus() : window.focus(), e.button) {
                                case 0:
                                    r = c.mouseButtons.LEFT;
                                    break;
                                case 1:
                                    r = c.mouseButtons.MIDDLE;
                                    break;
                                case 2:
                                    r = c.mouseButtons.RIGHT;
                                    break;
                                default:
                                    r = -1
                            }
                            switch (r) {
                                case i:
                                    if (!1 === c.enableZoom) return;
                                    ! function(e) {
                                        w.set(e.clientX, e.clientY)
                                    }(e), h = d.DOLLY;
                                    break;
                                case t:
                                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                        if (!1 === c.enablePan) return;
                                        U(e), h = d.PAN
                                    } else {
                                        if (!1 === c.enableRotate) return;
                                        I(e), h = d.ROTATE
                                    }
                                    break;
                                case n:
                                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                        if (!1 === c.enableRotate) return;
                                        I(e), h = d.ROTATE
                                    } else {
                                        if (!1 === c.enablePan) return;
                                        U(e), h = d.PAN
                                    }
                                    break;
                                default:
                                    h = d.NONE
                            }
                            h !== d.NONE && (c.domElement.ownerDocument.addEventListener("pointermove", Q), c.domElement.ownerDocument.addEventListener("pointerup", j), c.dispatchEvent(ia))
                        }(e)
                }
            }

            function Q(e) {
                if (!1 !== c.enabled) switch (e.pointerType) {
                    case "mouse":
                    case "pen":
                        ! function(e) {
                            if (!1 === c.enabled) return;
                            switch (e.preventDefault(), h) {
                                case d.ROTATE:
                                    if (!1 === c.enableRotate) return;
                                    ! function(e) {
                                        v.set(e.clientX, e.clientY), y.subVectors(v, _).multiplyScalar(c.rotateSpeed);
                                        const t = c.domElement;
                                        E(2 * Math.PI * y.x / t.clientHeight), P(2 * Math.PI * y.y / t.clientHeight), _.copy(v), c.update()
                                    }(e);
                                    break;
                                case d.DOLLY:
                                    if (!1 === c.enableZoom) return;
                                    ! function(e) {
                                        S.set(e.clientX, e.clientY), T.subVectors(S, w), T.y > 0 ? R(L()) : T.y < 0 && D(L()), w.copy(S), c.update()
                                    }(e);
                                    break;
                                case d.PAN:
                                    if (!1 === c.enablePan) return;
                                    ! function(e) {
                                        b.set(e.clientX, e.clientY), A.subVectors(b, M).multiplyScalar(c.panSpeed), C(A.x, A.y), M.copy(b), c.update()
                                    }(e)
                            }
                        }(e)
                }
            }

            function j(e) {
                switch (e.pointerType) {
                    case "mouse":
                    case "pen":
                        ! function(e) {
                            if (c.domElement.ownerDocument.removeEventListener("pointermove", Q), c.domElement.ownerDocument.removeEventListener("pointerup", j), !1 === c.enabled) return;
                            c.dispatchEvent(na), h = d.NONE
                        }()
                }
            }

            function q(e) {
                !1 === c.enabled || !1 === c.enableZoom || h !== d.NONE && h !== d.ROTATE || (e.preventDefault(), c.dispatchEvent(ia), function(e) {
                    e.deltaY < 0 ? D(L()) : e.deltaY > 0 && R(L()), c.update()
                }(e), c.dispatchEvent(na))
            }

            function Z(e) {
                !1 !== c.enabled && !1 !== c.enablePan && function(e) {
                    let t = !1;
                    switch (e.code) {
                        case c.keys.UP:
                            C(0, c.keyPanSpeed), t = !0;
                            break;
                        case c.keys.BOTTOM:
                            C(0, -c.keyPanSpeed), t = !0;
                            break;
                        case c.keys.LEFT:
                            C(c.keyPanSpeed, 0), t = !0;
                            break;
                        case c.keys.RIGHT:
                            C(-c.keyPanSpeed, 0), t = !0
                    }
                    t && (e.preventDefault(), c.update())
                }(e)
            }

            function J(e) {
                if (!1 !== c.enabled) {
                    switch (e.preventDefault(), e.touches.length) {
                        case 1:
                            switch (c.touches.ONE) {
                                case r:
                                    if (!1 === c.enableRotate) return;
                                    O(e), h = d.TOUCH_ROTATE;
                                    break;
                                case a:
                                    if (!1 === c.enablePan) return;
                                    B(e), h = d.TOUCH_PAN;
                                    break;
                                default:
                                    h = d.NONE
                            }
                            break;
                        case 2:
                            switch (c.touches.TWO) {
                                case s:
                                    if (!1 === c.enableZoom && !1 === c.enablePan) return;
                                    ! function(e) {
                                        c.enableZoom && G(e), c.enablePan && B(e)
                                    }(e), h = d.TOUCH_DOLLY_PAN;
                                    break;
                                case o:
                                    if (!1 === c.enableZoom && !1 === c.enableRotate) return;
                                    ! function(e) {
                                        c.enableZoom && G(e), c.enableRotate && O(e)
                                    }(e), h = d.TOUCH_DOLLY_ROTATE;
                                    break;
                                default:
                                    h = d.NONE
                            }
                            break;
                        default:
                            h = d.NONE
                    }
                    h !== d.NONE && c.dispatchEvent(ia)
                }
            }

            function K(e) {
                if (!1 !== c.enabled) switch (e.preventDefault(), h) {
                    case d.TOUCH_ROTATE:
                        if (!1 === c.enableRotate) return;
                        H(e), c.update();
                        break;
                    case d.TOUCH_PAN:
                        if (!1 === c.enablePan) return;
                        k(e), c.update();
                        break;
                    case d.TOUCH_DOLLY_PAN:
                        if (!1 === c.enableZoom && !1 === c.enablePan) return;
                        ! function(e) {
                            c.enableZoom && V(e), c.enablePan && k(e)
                        }(e), c.update();
                        break;
                    case d.TOUCH_DOLLY_ROTATE:
                        if (!1 === c.enableZoom && !1 === c.enableRotate) return;
                        ! function(e) {
                            c.enableZoom && V(e), c.enableRotate && H(e)
                        }(e), c.update();
                        break;
                    default:
                        h = d.NONE
                }
            }

            function $(e) {
                !1 !== c.enabled && (c.dispatchEvent(na), h = d.NONE)
            }

            function ee(e) {
                !1 !== c.enabled && e.preventDefault()
            }
            c.domElement.addEventListener("contextmenu", ee), c.domElement.addEventListener("pointerdown", W), c.domElement.addEventListener("wheel", q, {
                passive: !1
            }), c.domElement.addEventListener("touchstart", J, {
                passive: !1
            }), c.domElement.addEventListener("touchend", $), c.domElement.addEventListener("touchmove", K, {
                passive: !1
            }), this.update()
        }
    }
    var aa = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            opacity: {
                value: 1
            }
        },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: "uniform float opacity;uniform sampler2D tDiffuse;varying vec2 vUv;void main(){vec4 texel=texture2D(tDiffuse,vUv);gl_FragColor=opacity*texel;}"
    };
    class sa {
        constructor() {
            this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1
        }
        setSize() {}
        render() {
            console.error("THREE.Pass: .render() must be implemented in derived pass.")
        }
    }
    const oa = new Cr(-1, 1, 1, -1, 0, 1),
        la = new Dt;
    la.setAttribute("position", new St([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), la.setAttribute("uv", new St([0, 2, 0, 0, 2, 0], 2));
    class ca {
        constructor(e) {
            this._mesh = new Kt(la, e)
        }
        dispose() {
            this._mesh.geometry.dispose()
        }
        render(e) {
            e.render(this._mesh, oa)
        }
        get material() {
            return this._mesh.material
        }
        set material(e) {
            this._mesh.material = e
        }
    }
    class da extends sa {
        constructor(e, t) {
            super(), this.textureID = void 0 !== t ? t : "tDiffuse", e instanceof ri ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = ni.clone(e.uniforms), this.material = new ri({
                defines: Object.assign({}, e.defines),
                uniforms: this.uniforms,
                vertexShader: e.vertexShader,
                fragmentShader: e.fragmentShader
            })), this.fsQuad = new ca(this.material)
        }
        render(e, t, i) {
            this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e))
        }
    }
    class ha extends sa {
        constructor(e, t) {
            super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1
        }
        render(e, t, i) {
            const n = e.getContext(),
                r = e.state;
            let a, s;
            r.buffers.color.setMask(!1), r.buffers.depth.setMask(!1), r.buffers.color.setLocked(!0), r.buffers.depth.setLocked(!0), this.inverse ? (a = 0, s = 1) : (a = 1, s = 0), r.buffers.stencil.setTest(!0), r.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE), r.buffers.stencil.setFunc(n.ALWAYS, a, 4294967295), r.buffers.stencil.setClear(s), r.buffers.stencil.setLocked(!0), e.setRenderTarget(i), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), r.buffers.color.setLocked(!1), r.buffers.depth.setLocked(!1), r.buffers.stencil.setLocked(!1), r.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295), r.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP), r.buffers.stencil.setLocked(!0)
        }
    }
    class ua extends sa {
        constructor() {
            super(), this.needsSwap = !1
        }
        render(e) {
            e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1)
        }
    }
    class fa {
        constructor(e, t) {
            if (this.renderer = e, void 0 === t) {
                const i = {
                        minFilter: f,
                        magFilter: f,
                        format: b
                    },
                    n = e.getSize(new z);
                this._pixelRatio = e.getPixelRatio(), this._width = n.width, this._height = n.height, (t = new W(this._width * this._pixelRatio, this._height * this._pixelRatio, i)).texture.name = "EffectComposer.rt1"
            } else this._pixelRatio = 1, this._width = t.width, this._height = t.height;
            this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], void 0 === aa && console.error("THREE.EffectComposer relies on CopyShader"), void 0 === da && console.error("THREE.EffectComposer relies on ShaderPass"), this.copyPass = new da(aa), this.clock = new Rr
        }
        swapBuffers() {
            const e = this.readBuffer;
            this.readBuffer = this.writeBuffer, this.writeBuffer = e
        }
        addPass(e) {
            this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }
        insertPass(e, t) {
            this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }
        removePass(e) {
            const t = this.passes.indexOf(e); - 1 !== t && this.passes.splice(t, 1)
        }
        isLastEnabledPass(e) {
            for (let t = e + 1; t < this.passes.length; t++)
                if (this.passes[t].enabled) return !1;
            return !0
        }
        render(e) {
            void 0 === e && (e = this.clock.getDelta());
            const t = this.renderer.getRenderTarget();
            let i = !1;
            for (let t = 0, n = this.passes.length; t < n; t++) {
                const n = this.passes[t];
                if (!1 !== n.enabled) {
                    if (n.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), n.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), n.needsSwap) {
                        if (i) {
                            const t = this.renderer.getContext(),
                                i = this.renderer.state.buffers.stencil;
                            i.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), i.setFunc(t.EQUAL, 1, 4294967295)
                        }
                        this.swapBuffers()
                    }
                    void 0 !== ha && (n instanceof ha ? i = !0 : n instanceof ua && (i = !1))
                }
            }
            this.renderer.setRenderTarget(t)
        }
        reset(e) {
            if (void 0 === e) {
                const t = this.renderer.getSize(new z);
                this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, (e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
            }
            this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2
        }
        setSize(e, t) {
            this._width = e, this._height = t;
            const i = this._width * this._pixelRatio,
                n = this._height * this._pixelRatio;
            this.renderTarget1.setSize(i, n), this.renderTarget2.setSize(i, n);
            for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(i, n)
        }
        setPixelRatio(e) {
            this._pixelRatio = e, this.setSize(this._width, this._height)
        }
    }
    new Cr(-1, 1, 1, -1, 0, 1);
    const pa = new Dt;
    pa.setAttribute("position", new St([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), pa.setAttribute("uv", new St([0, 2, 0, 0, 2, 0], 2));
    class ma extends sa {
        constructor(e, t, i, n, r) {
            super(), this.scene = e, this.camera = t, this.overrideMaterial = i, this.clearColor = n, this.clearAlpha = void 0 !== r ? r : 0, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new _t
        }
        render(e, t, i) {
            const n = e.autoClear;
            let r, a;
            e.autoClear = !1, void 0 !== this.overrideMaterial && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor && (e.getClearColor(this._oldClearColor), r = e.getClearAlpha(), e.setClearColor(this.clearColor, this.clearAlpha)), this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : i), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor && e.setClearColor(this._oldClearColor, r), void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = a), e.autoClear = n
        }
    }
    const ga = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            resolution: {
                value: new z(1 / 1024, 1 / 512)
            }
        },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: "precision highp float;uniform sampler2D tDiffuse;uniform vec2 resolution;varying vec2 vUv;\n#define FXAA_PC 1\n#define FXAA_GLSL_100 1\n#define FXAA_QUALITY_PRESET 12\n#define FXAA_GREEN_AS_LUMA 1\n#ifndef FXAA_PC_CONSOLE\n#define FXAA_PC_CONSOLE 0\n#endif\n#ifndef FXAA_GLSL_120\n#define FXAA_GLSL_120 0\n#endif\n#ifndef FXAA_GLSL_130\n#define FXAA_GLSL_130 0\n#endif\n#ifndef FXAA_HLSL_3\n#define FXAA_HLSL_3 0\n#endif\n#ifndef FXAA_HLSL_4\n#define FXAA_HLSL_4 0\n#endif\n#ifndef FXAA_HLSL_5\n#define FXAA_HLSL_5 0\n#endif\n#ifndef FXAA_GREEN_AS_LUMA\n#define FXAA_GREEN_AS_LUMA 0\n#endif\n#ifndef FXAA_EARLY_EXIT\n#define FXAA_EARLY_EXIT 1\n#endif\n#ifndef FXAA_DISCARD\n#define FXAA_DISCARD 0\n#endif\n#ifndef FXAA_FAST_PIXEL_OFFSET\n#ifdef GL_EXT_gpu_shader4\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifdef GL_NV_gpu_shader5\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifdef GL_ARB_gpu_shader5\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifndef FXAA_FAST_PIXEL_OFFSET\n#define FXAA_FAST_PIXEL_OFFSET 0\n#endif\n#endif\n#ifndef FXAA_GATHER4_ALPHA\n#if (FXAA_HLSL_5==1)\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifdef GL_ARB_gpu_shader5\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifdef GL_NV_gpu_shader5\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifndef FXAA_GATHER4_ALPHA\n#define FXAA_GATHER4_ALPHA 0\n#endif\n#endif\n#ifndef FXAA_QUALITY_PRESET\n#define FXAA_QUALITY_PRESET 12\n#endif\n#if (FXAA_QUALITY_PRESET==10)\n#define FXAA_QUALITY_PS 3\n#define FXAA_QUALITY_P0 1.5\n#define FXAA_QUALITY_P1 3.0\n#define FXAA_QUALITY_P2 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==11)\n#define FXAA_QUALITY_PS 4\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 3.0\n#define FXAA_QUALITY_P3 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==12)\n#define FXAA_QUALITY_PS 5\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 4.0\n#define FXAA_QUALITY_P4 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==13)\n#define FXAA_QUALITY_PS 6\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 4.0\n#define FXAA_QUALITY_P5 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==14)\n#define FXAA_QUALITY_PS 7\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 4.0\n#define FXAA_QUALITY_P6 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==15)\n#define FXAA_QUALITY_PS 8\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 4.0\n#define FXAA_QUALITY_P7 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==20)\n#define FXAA_QUALITY_PS 3\n#define FXAA_QUALITY_P0 1.5\n#define FXAA_QUALITY_P1 2.0\n#define FXAA_QUALITY_P2 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==21)\n#define FXAA_QUALITY_PS 4\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==22)\n#define FXAA_QUALITY_PS 5\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==23)\n#define FXAA_QUALITY_PS 6\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==24)\n#define FXAA_QUALITY_PS 7\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 3.0\n#define FXAA_QUALITY_P6 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==25)\n#define FXAA_QUALITY_PS 8\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 4.0\n#define FXAA_QUALITY_P7 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==26)\n#define FXAA_QUALITY_PS 9\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 4.0\n#define FXAA_QUALITY_P8 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==27)\n#define FXAA_QUALITY_PS 10\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 4.0\n#define FXAA_QUALITY_P9 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==28)\n#define FXAA_QUALITY_PS 11\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 4.0\n#define FXAA_QUALITY_P10 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==29)\n#define FXAA_QUALITY_PS 12\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 2.0\n#define FXAA_QUALITY_P10 4.0\n#define FXAA_QUALITY_P11 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==39)\n#define FXAA_QUALITY_PS 12\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.0\n#define FXAA_QUALITY_P2 1.0\n#define FXAA_QUALITY_P3 1.0\n#define FXAA_QUALITY_P4 1.0\n#define FXAA_QUALITY_P5 1.5\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 2.0\n#define FXAA_QUALITY_P10 4.0\n#define FXAA_QUALITY_P11 8.0\n#endif\n#if (FXAA_GLSL_100==1)||(FXAA_GLSL_120==1)||(FXAA_GLSL_130==1)\n#define FxaaBool bool\n#define FxaaDiscard discard\n#define FxaaFloat float\n#define FxaaFloat2 vec2\n#define FxaaFloat3 vec3\n#define FxaaFloat4 vec4\n#define FxaaHalf float\n#define FxaaHalf2 vec2\n#define FxaaHalf3 vec3\n#define FxaaHalf4 vec4\n#define FxaaInt2 ivec2\n#define FxaaSat(x)clamp(x,0.0,1.0)\n#define FxaaTex sampler2D\n#else\n#define FxaaBool bool\n#define FxaaDiscard clip(-1)\n#define FxaaFloat float\n#define FxaaFloat2 float2\n#define FxaaFloat3 float3\n#define FxaaFloat4 float4\n#define FxaaHalf half\n#define FxaaHalf2 half2\n#define FxaaHalf3 half3\n#define FxaaHalf4 half4\n#define FxaaSat(x)saturate(x)\n#endif\n#if (FXAA_GLSL_100==1)\n#define FxaaTexTop(t,p)texture2D(t,p,0.0)\n#define FxaaTexOff(t,p,o,r)texture2D(t,p+(o*r),0.0)\n#endif\n#if (FXAA_GLSL_120==1)\n#define FxaaTexTop(t,p)texture2DLod(t,p,0.0)\n#if (FXAA_FAST_PIXEL_OFFSET==1)\n#define FxaaTexOff(t,p,o,r)texture2DLodOffset(t,p,0.0,o)\n#else\n#define FxaaTexOff(t,p,o,r)texture2DLod(t,p+(o*r),0.0)\n#endif\n#if (FXAA_GATHER4_ALPHA==1)\n#define FxaaTexAlpha4(t,p)textureGather(t,p,3)\n#define FxaaTexOffAlpha4(t,p,o)textureGatherOffset(t,p,o,3)\n#define FxaaTexGreen4(t,p)textureGather(t,p,1)\n#define FxaaTexOffGreen4(t,p,o)textureGatherOffset(t,p,o,1)\n#endif\n#endif\n#if (FXAA_GLSL_130==1)\n#define FxaaTexTop(t,p)textureLod(t,p,0.0)\n#define FxaaTexOff(t,p,o,r)textureLodOffset(t,p,0.0,o)\n#if (FXAA_GATHER4_ALPHA==1)\n#define FxaaTexAlpha4(t,p)textureGather(t,p,3)\n#define FxaaTexOffAlpha4(t,p,o)textureGatherOffset(t,p,o,3)\n#define FxaaTexGreen4(t,p)textureGather(t,p,1)\n#define FxaaTexOffGreen4(t,p,o)textureGatherOffset(t,p,o,1)\n#endif\n#endif\n#if (FXAA_HLSL_3==1)\n#define FxaaInt2 float2\n#define FxaaTex sampler2D\n#define FxaaTexTop(t,p)tex2Dlod(t,float4(p,0.0,0.0))\n#define FxaaTexOff(t,p,o,r)tex2Dlod(t,float4(p+(o*r),0,0))\n#endif\n#if (FXAA_HLSL_4==1)\n#define FxaaInt2 int2\nstruct FxaaTex{SamplerState smpl;Texture2D tex;};\n#define FxaaTexTop(t,p)t.tex.SampleLevel(t.smpl,p,0.0)\n#define FxaaTexOff(t,p,o,r)t.tex.SampleLevel(t.smpl,p,0.0,o)\n#endif\n#if (FXAA_HLSL_5==1)\n#define FxaaInt2 int2\nstruct FxaaTex{SamplerState smpl;Texture2D tex;};\n#define FxaaTexTop(t,p)t.tex.SampleLevel(t.smpl,p,0.0)\n#define FxaaTexOff(t,p,o,r)t.tex.SampleLevel(t.smpl,p,0.0,o)\n#define FxaaTexAlpha4(t,p)t.tex.GatherAlpha(t.smpl,p)\n#define FxaaTexOffAlpha4(t,p,o)t.tex.GatherAlpha(t.smpl,p,o)\n#define FxaaTexGreen4(t,p)t.tex.GatherGreen(t.smpl,p)\n#define FxaaTexOffGreen4(t,p,o)t.tex.GatherGreen(t.smpl,p,o)\n#endif\n#if (FXAA_GREEN_AS_LUMA==0)\nFxaaFloat FxaaLuma(FxaaFloat4 rgba){return rgba.w;}\n#else\nFxaaFloat FxaaLuma(FxaaFloat4 rgba){return rgba.y;}\n#endif\n#if (FXAA_PC==1)\nFxaaFloat4 FxaaPixelShader(FxaaFloat2 pos,FxaaFloat4 fxaaConsolePosPos,FxaaTex tex,FxaaTex fxaaConsole360TexExpBiasNegOne,FxaaTex fxaaConsole360TexExpBiasNegTwo,FxaaFloat2 fxaaQualityRcpFrame,FxaaFloat4 fxaaConsoleRcpFrameOpt,FxaaFloat4 fxaaConsoleRcpFrameOpt2,FxaaFloat4 fxaaConsole360RcpFrameOpt2,FxaaFloat fxaaQualitySubpix,FxaaFloat fxaaQualityEdgeThreshold,FxaaFloat fxaaQualityEdgeThresholdMin,FxaaFloat fxaaConsoleEdgeSharpness,FxaaFloat fxaaConsoleEdgeThreshold,FxaaFloat fxaaConsoleEdgeThresholdMin,FxaaFloat4 fxaaConsole360ConstDir){FxaaFloat2 posM;posM.x=pos.x;posM.y=pos.y;\n#if (FXAA_GATHER4_ALPHA==1)\n#if (FXAA_DISCARD==0)\nFxaaFloat4 rgbyM=FxaaTexTop(tex,posM);\n#if (FXAA_GREEN_AS_LUMA==0)\n#define lumaM rgbyM.w\n#else\n#define lumaM rgbyM.y\n#endif\n#endif\n#if (FXAA_GREEN_AS_LUMA==0)\nFxaaFloat4 luma4A=FxaaTexAlpha4(tex,posM);FxaaFloat4 luma4B=FxaaTexOffAlpha4(tex,posM,FxaaInt2(-1,-1));\n#else\nFxaaFloat4 luma4A=FxaaTexGreen4(tex,posM);FxaaFloat4 luma4B=FxaaTexOffGreen4(tex,posM,FxaaInt2(-1,-1));\n#endif\n#if (FXAA_DISCARD==1)\n#define lumaM luma4A.w\n#endif\n#define lumaE luma4A.z\n#define lumaS luma4A.x\n#define lumaSE luma4A.y\n#define lumaNW luma4B.w\n#define lumaN luma4B.z\n#define lumaW luma4B.x\n#else\nFxaaFloat4 rgbyM=FxaaTexTop(tex,posM);\n#if (FXAA_GREEN_AS_LUMA==0)\n#define lumaM rgbyM.w\n#else\n#define lumaM rgbyM.y\n#endif\n#if (FXAA_GLSL_100==1)\nFxaaFloat lumaS=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(0.0,1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,0.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaN=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(0.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,0.0),fxaaQualityRcpFrame.xy));\n#else\nFxaaFloat lumaS=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(0,1),fxaaQualityRcpFrame.xy));FxaaFloat lumaE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,0),fxaaQualityRcpFrame.xy));FxaaFloat lumaN=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(0,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,0),fxaaQualityRcpFrame.xy));\n#endif\n#endif\nFxaaFloat maxSM=max(lumaS,lumaM);FxaaFloat minSM=min(lumaS,lumaM);FxaaFloat maxESM=max(lumaE,maxSM);FxaaFloat minESM=min(lumaE,minSM);FxaaFloat maxWN=max(lumaN,lumaW);FxaaFloat minWN=min(lumaN,lumaW);FxaaFloat rangeMax=max(maxWN,maxESM);FxaaFloat rangeMin=min(minWN,minESM);FxaaFloat rangeMaxScaled=rangeMax*fxaaQualityEdgeThreshold;FxaaFloat range=rangeMax-rangeMin;FxaaFloat rangeMaxClamped=max(fxaaQualityEdgeThresholdMin,rangeMaxScaled);FxaaBool earlyExit=range<rangeMaxClamped;if(earlyExit)\n#if (FXAA_DISCARD==1)\nFxaaDiscard;\n#else\nreturn rgbyM;\n#endif\n#if (FXAA_GATHER4_ALPHA==0)\n#if (FXAA_GLSL_100==1)\nFxaaFloat lumaNW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaSE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,1.0),fxaaQualityRcpFrame.xy));\n#else\nFxaaFloat lumaNW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,1),fxaaQualityRcpFrame.xy));FxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,1),fxaaQualityRcpFrame.xy));\n#endif\n#else\nFxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,1),fxaaQualityRcpFrame.xy));\n#endif\nFxaaFloat lumaNS=lumaN+lumaS;FxaaFloat lumaWE=lumaW+lumaE;FxaaFloat subpixRcpRange=1.0/range;FxaaFloat subpixNSWE=lumaNS+lumaWE;FxaaFloat edgeHorz1=(-2.0*lumaM)+lumaNS;FxaaFloat edgeVert1=(-2.0*lumaM)+lumaWE;FxaaFloat lumaNESE=lumaNE+lumaSE;FxaaFloat lumaNWNE=lumaNW+lumaNE;FxaaFloat edgeHorz2=(-2.0*lumaE)+lumaNESE;FxaaFloat edgeVert2=(-2.0*lumaN)+lumaNWNE;FxaaFloat lumaNWSW=lumaNW+lumaSW;FxaaFloat lumaSWSE=lumaSW+lumaSE;FxaaFloat edgeHorz4=(abs(edgeHorz1)*2.0)+abs(edgeHorz2);FxaaFloat edgeVert4=(abs(edgeVert1)*2.0)+abs(edgeVert2);FxaaFloat edgeHorz3=(-2.0*lumaW)+lumaNWSW;FxaaFloat edgeVert3=(-2.0*lumaS)+lumaSWSE;FxaaFloat edgeHorz=abs(edgeHorz3)+edgeHorz4;FxaaFloat edgeVert=abs(edgeVert3)+edgeVert4;FxaaFloat subpixNWSWNESE=lumaNWSW+lumaNESE;FxaaFloat lengthSign=fxaaQualityRcpFrame.x;FxaaBool horzSpan=edgeHorz>=edgeVert;FxaaFloat subpixA=subpixNSWE*2.0+subpixNWSWNESE;if(!horzSpan)lumaN=lumaW;if(!horzSpan)lumaS=lumaE;if(horzSpan)lengthSign=fxaaQualityRcpFrame.y;FxaaFloat subpixB=(subpixA*(1.0/12.0))-lumaM;FxaaFloat gradientN=lumaN-lumaM;FxaaFloat gradientS=lumaS-lumaM;FxaaFloat lumaNN=lumaN+lumaM;FxaaFloat lumaSS=lumaS+lumaM;FxaaBool pairN=abs(gradientN)>=abs(gradientS);FxaaFloat gradient=max(abs(gradientN),abs(gradientS));if(pairN)lengthSign=-lengthSign;FxaaFloat subpixC=FxaaSat(abs(subpixB)*subpixRcpRange);FxaaFloat2 posB;posB.x=posM.x;posB.y=posM.y;FxaaFloat2 offNP;offNP.x=(!horzSpan)?0.0:fxaaQualityRcpFrame.x;offNP.y=(horzSpan)?0.0:fxaaQualityRcpFrame.y;if(!horzSpan)posB.x+=lengthSign*0.5;if(horzSpan)posB.y+=lengthSign*0.5;FxaaFloat2 posN;posN.x=posB.x-offNP.x*FXAA_QUALITY_P0;posN.y=posB.y-offNP.y*FXAA_QUALITY_P0;FxaaFloat2 posP;posP.x=posB.x+offNP.x*FXAA_QUALITY_P0;posP.y=posB.y+offNP.y*FXAA_QUALITY_P0;FxaaFloat subpixD=((-2.0)*subpixC)+3.0;FxaaFloat lumaEndN=FxaaLuma(FxaaTexTop(tex,posN));FxaaFloat subpixE=subpixC*subpixC;FxaaFloat lumaEndP=FxaaLuma(FxaaTexTop(tex,posP));if(!pairN)lumaNN=lumaSS;FxaaFloat gradientScaled=gradient*1.0/4.0;FxaaFloat lumaMM=lumaM-lumaNN*0.5;FxaaFloat subpixF=subpixD*subpixE;FxaaBool lumaMLTZero=lumaMM<0.0;lumaEndN-=lumaNN*0.5;lumaEndP-=lumaNN*0.5;FxaaBool doneN=abs(lumaEndN)>=gradientScaled;FxaaBool doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P1;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P1;FxaaBool doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P1;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P1;if(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P2;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P2;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P2;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P2;\n#if (FXAA_QUALITY_PS>3)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P3;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P3;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P3;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P3;\n#if (FXAA_QUALITY_PS>4)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P4;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P4;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P4;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P4;\n#if (FXAA_QUALITY_PS>5)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P5;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P5;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P5;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P5;\n#if (FXAA_QUALITY_PS>6)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P6;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P6;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P6;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P6;\n#if (FXAA_QUALITY_PS>7)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P7;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P7;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P7;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P7;\n#if (FXAA_QUALITY_PS>8)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P8;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P8;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P8;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P8;\n#if (FXAA_QUALITY_PS>9)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P9;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P9;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P9;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P9;\n#if (FXAA_QUALITY_PS>10)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P10;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P10;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P10;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P10;\n#if (FXAA_QUALITY_PS>11)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P11;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P11;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P11;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P11;\n#if (FXAA_QUALITY_PS>12)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P12;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P12;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P12;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P12;}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}FxaaFloat dstN=posM.x-posN.x;FxaaFloat dstP=posP.x-posM.x;if(!horzSpan)dstN=posM.y-posN.y;if(!horzSpan)dstP=posP.y-posM.y;FxaaBool goodSpanN=(lumaEndN<0.0)!=lumaMLTZero;FxaaFloat spanLength=(dstP+dstN);FxaaBool goodSpanP=(lumaEndP<0.0)!=lumaMLTZero;FxaaFloat spanLengthRcp=1.0/spanLength;FxaaBool directionN=dstN<dstP;FxaaFloat dst=min(dstN,dstP);FxaaBool goodSpan=directionN?goodSpanN:goodSpanP;FxaaFloat subpixG=subpixF*subpixF;FxaaFloat pixelOffset=(dst*(-spanLengthRcp))+0.5;FxaaFloat subpixH=subpixG*fxaaQualitySubpix;FxaaFloat pixelOffsetGood=goodSpan?pixelOffset:0.0;FxaaFloat pixelOffsetSubpix=max(pixelOffsetGood,subpixH);if(!horzSpan)posM.x+=pixelOffsetSubpix*lengthSign;if(horzSpan)posM.y+=pixelOffsetSubpix*lengthSign;\n#if (FXAA_DISCARD==1)\nreturn FxaaTexTop(tex,posM);\n#else\nreturn FxaaFloat4(FxaaTexTop(tex,posM).xyz,lumaM);\n#endif\n}\n#endif\nvoid main(){gl_FragColor=FxaaPixelShader(vUv,vec4(0.0),tDiffuse,tDiffuse,tDiffuse,resolution,vec4(0.0),vec4(0.0),vec4(0.0),0.75,0.166,0.0833,0.0,0.0,0.0,vec4(0.0));gl_FragColor.a=texture2D(tDiffuse,vUv).a;}"
    };
    e.BodyPart = Br, e.CapeObject = Hr, e.CompositeAnimation = Kr, e.ElytraObject = kr, e.FXAASkinViewer = class extends ea {
        constructor(e) {
            super(e), this.composer = new fa(this.renderer), this.renderPass = new ma(this.scene, this.camera), this.fxaaPass = new da(ga), this.composer.addPass(this.renderPass), this.composer.addPass(this.fxaaPass), this.updateComposerSize()
        }
        setSize(e, t) {
            super.setSize(e, t), void 0 !== this.composer && this.updateComposerSize()
        }
        updateComposerSize() {
            this.composer.setSize(this.width, this.height);
            const e = this.renderer.getPixelRatio();
            this.composer.setPixelRatio(e), this.fxaaPass.material.uniforms.resolution.value.x = 1 / (this.width * e), this.fxaaPass.material.uniforms.resolution.value.y = 1 / (this.height * e)
        }
        render() {
            this.composer.render()
        }
        dispose() {
            super.dispose(), this.fxaaPass.fsQuad.dispose()
        }
    }, e.FlyingAnimation = (e, t) => {
        t < 0 && (t = 0);
        const i = (a = 1, (n = (t *= 20) * t / 100) <= (r = 0) ? r : n >= a ? a : n);
        var n, r, a;
        e.rotation.x = i * Math.PI / 2, e.skin.head.rotation.x = i > .5 ? Math.PI / 4 - e.rotation.x : 0;
        const s = .25 * Math.PI * i;
        e.skin.leftArm.rotation.z = s, e.skin.rightArm.rotation.z = -s;
        const o = .34906584,
            l = Math.PI / 2,
            c = Math.pow(.9, t);
        e.elytra.leftWing.rotation.x = o + -.08726644 * c, e.elytra.leftWing.rotation.z = l + c * (.2617994 - l), e.elytra.updateRightWing()
    }, e.PlayerObject = Vr, e.RootAnimation = $r, e.RotatingAnimation = (e, t) => {
        e.rotation.y = t
    }, e.RunningAnimation = (e, t) => {
        const i = e.skin;
        t = 15 * t + .5 * Math.PI, i.leftLeg.rotation.x = 1.3 * Math.cos(t + Math.PI), i.rightLeg.rotation.x = 1.3 * Math.cos(t), i.leftArm.rotation.x = 1.5 * Math.cos(t), i.rightArm.rotation.x = 1.5 * Math.cos(t + Math.PI);
        const n = .1 * Math.PI;
        i.leftArm.rotation.z = .1 * Math.cos(t) + n, i.rightArm.rotation.z = .1 * Math.cos(t + Math.PI) - n, e.position.y = Math.cos(2 * t), e.position.x = .15 * Math.cos(t), e.rotation.z = .01 * Math.cos(t + Math.PI);
        const r = .3 * Math.PI;
        e.cape.rotation.x = .1 * Math.sin(2 * t) + r
    }, e.SkinObject = Gr, e.SkinViewer = ea, e.WalkingAnimation = (e, t) => {
        const i = e.skin;
        t *= 8, i.leftLeg.rotation.x = .5 * Math.sin(t), i.rightLeg.rotation.x = .5 * Math.sin(t + Math.PI), i.leftArm.rotation.x = .5 * Math.sin(t + Math.PI), i.rightArm.rotation.x = .5 * Math.sin(t);
        const n = .02 * Math.PI;
        i.leftArm.rotation.z = .03 * Math.cos(t) + n, i.rightArm.rotation.z = .03 * Math.cos(t + Math.PI) - n, i.head.rotation.y = .2 * Math.sin(t / 4), i.head.rotation.x = .1 * Math.sin(t / 5);
        const r = .06 * Math.PI;
        e.cape.rotation.x = .06 * Math.sin(t / 1.5) + r
    }, e.createOrbitControls = function(e) {
        const t = new ra(e.camera, e.renderer.domElement);
        return t.enablePan = !1, t.target = new Y(0, -8, 0), t.minDistance = 10, t.maxDistance = 256, t.update(), t
    }, e.invokeAnimation = Zr, Object.defineProperty(e, "__esModule", {
        value: !0
    })
})); //# sourceMappingURL=skinview3d.bundle.js.map
