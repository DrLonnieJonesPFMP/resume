// ThreeWebGL.js r45 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!self.Int32Array) self.Int32Array = Array, self.Float32Array = Array;
THREE.Color = function(b) {
    b !== void 0 && this.setHex(b);
    return this
};
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function(b) {
        this.r = b.r;
        this.g = b.g;
        this.b = b.b;
        return this
    },
    setRGB: function(b, c, d) {
        this.r = b;
        this.g = c;
        this.b = d;
        return this
    },
    setHSV: function(b, c, d) {
        var e, i, h;
        if (d == 0) this.r = this.g = this.b = 0;
        else switch (e = Math.floor(b * 6), i = b * 6 - e, b = d * (1 - c), h = d * (1 - c * i), c = d * (1 - c * (1 - i)), e) {
            case 1:
                this.r = h;
                this.g = d;
                this.b = b;
                break;
            case 2:
                this.r = b;
                this.g = d;
                this.b = c;
                break;
            case 3:
                this.r = b;
                this.g = h;
                this.b = d;
                break;
            case 4:
                this.r = c;
                this.g = b;
                this.b = d;
                break;
            case 5:
                this.r =
                    d;
                this.g = b;
                this.b = h;
                break;
            case 6:
            case 0:
                this.r = d, this.g = c, this.b = b
        }
        return this
    },
    setHex: function(b) {
        b = Math.floor(b);
        this.r = (b >> 16 & 255) / 255;
        this.g = (b >> 8 & 255) / 255;
        this.b = (b & 255) / 255;
        return this
    },
    getHex: function() {
        return ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255)
    },
    getContextStyle: function() {
        return "rgb(" + Math.floor(this.r * 255) + "," + Math.floor(this.g * 255) + "," + Math.floor(this.b * 255) + ")"
    },
    clone: function() {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
};
THREE.Vector2 = function(b, c) {
    this.x = b || 0;
    this.y = c || 0
};
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function(b, c) {
        this.x = b;
        this.y = c;
        return this
    },
    copy: function(b) {
        this.x = b.x;
        this.y = b.y;
        return this
    },
    clone: function() {
        return new THREE.Vector2(this.x, this.y)
    },
    add: function(b, c) {
        this.x = b.x + c.x;
        this.y = b.y + c.y;
        return this
    },
    addSelf: function(b) {
        this.x += b.x;
        this.y += b.y;
        return this
    },
    sub: function(b, c) {
        this.x = b.x - c.x;
        this.y = b.y - c.y;
        return this
    },
    subSelf: function(b) {
        this.x -= b.x;
        this.y -= b.y;
        return this
    },
    multiplyScalar: function(b) {
        this.x *= b;
        this.y *= b;
        return this
    },
    divideScalar: function(b) {
        b ? (this.x /= b, this.y /= b) : this.set(0, 0);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(b) {
        return this.x * b.x + this.y * b.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(b) {
        return Math.sqrt(this.distanceToSquared(b))
    },
    distanceToSquared: function(b) {
        var c = this.x - b.x,
            b = this.y - b.y;
        return c * c + b * b
    },
    setLength: function(b) {
        return this.normalize().multiplyScalar(b)
    },
    equals: function(b) {
        return b.x == this.x && b.y == this.y
    }
};
THREE.Vector3 = function(b, c, d) {
    this.x = b || 0;
    this.y = c || 0;
    this.z = d || 0
};
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function(b, c, d) {
        this.x = b;
        this.y = c;
        this.z = d;
        return this
    },
    setX: function(b) {
        this.x = b;
        return this
    },
    setY: function(b) {
        this.y = b;
        return this
    },
    setZ: function(b) {
        this.z = b;
        return this
    },
    copy: function(b) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
        return this
    },
    clone: function() {
        return new THREE.Vector3(this.x, this.y, this.z)
    },
    add: function(b, c) {
        this.x = b.x + c.x;
        this.y = b.y + c.y;
        this.z = b.z + c.z;
        return this
    },
    addSelf: function(b) {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        return this
    },
    addScalar: function(b) {
        this.x += b;
        this.y += b;
        this.z += b;
        return this
    },
    sub: function(b, c) {
        this.x = b.x - c.x;
        this.y = b.y - c.y;
        this.z = b.z - c.z;
        return this
    },
    subSelf: function(b) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this
    },
    multiply: function(b, c) {
        this.x = b.x * c.x;
        this.y = b.y * c.y;
        this.z = b.z * c.z;
        return this
    },
    multiplySelf: function(b) {
        this.x *= b.x;
        this.y *= b.y;
        this.z *= b.z;
        return this
    },
    multiplyScalar: function(b) {
        this.x *= b;
        this.y *= b;
        this.z *= b;
        return this
    },
    divideSelf: function(b) {
        this.x /= b.x;
        this.y /= b.y;
        this.z /= b.z;
        return this
    },
    divideScalar: function(b) {
        b ? (this.x /= b, this.y /= b, this.z /= b) : this.set(0, 0, 0);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthManhattan: function() {
        return this.x + this.y + this.z
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(b) {
        return this.normalize().multiplyScalar(b)
    },
    cross: function(b, c) {
        this.x = b.y * c.z - b.z * c.y;
        this.y = b.z * c.x - b.x * c.z;
        this.z = b.x * c.y - b.y * c.x;
        return this
    },
    crossSelf: function(b) {
        return this.set(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x)
    },
    distanceTo: function(b) {
        return Math.sqrt(this.distanceToSquared(b))
    },
    distanceToSquared: function(b) {
        return (new THREE.Vector3).sub(this, b).lengthSq()
    },
    setPositionFromMatrix: function(b) {
        this.x = b.n14;
        this.y = b.n24;
        this.z = b.n34
    },
    setRotationFromMatrix: function(b) {
        var c = Math.cos(this.y);
        this.y = Math.asin(b.n13);
        Math.abs(c) > 1.0E-5 ? (this.x = Math.atan2(-b.n23 / c, b.n33 / c), this.z = Math.atan2(-b.n12 / c, b.n11 / c)) : (this.x = 0, this.z = Math.atan2(b.n21, b.n22))
    },
    isZero: function() {
        return this.lengthSq() < 1.0E-4
    }
};
THREE.Vector4 = function(b, c, d, e) {
    this.x = b || 0;
    this.y = c || 0;
    this.z = d || 0;
    this.w = e !== void 0 ? e : 1
};
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function(b, c, d, e) {
        this.x = b;
        this.y = c;
        this.z = d;
        this.w = e;
        return this
    },
    copy: function(b) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
        this.w = b.w !== void 0 ? b.w : 1
    },
    clone: function() {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    },
    add: function(b, c) {
        this.x = b.x + c.x;
        this.y = b.y + c.y;
        this.z = b.z + c.z;
        this.w = b.w + c.w;
        return this
    },
    addSelf: function(b) {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        this.w += b.w;
        return this
    },
    sub: function(b, c) {
        this.x = b.x - c.x;
        this.y = b.y - c.y;
        this.z = b.z -
            c.z;
        this.w = b.w - c.w;
        return this
    },
    subSelf: function(b) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        this.w -= b.w;
        return this
    },
    multiplyScalar: function(b) {
        this.x *= b;
        this.y *= b;
        this.z *= b;
        this.w *= b;
        return this
    },
    divideScalar: function(b) {
        b ? (this.x /= b, this.y /= b, this.z /= b, this.w /= b) : (this.z = this.y = this.x = 0, this.w = 1);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w
    },
    lengthSq: function() {
        return this.dot(this)
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(b) {
        return this.normalize().multiplyScalar(b)
    },
    lerpSelf: function(b, c) {
        this.x += (b.x - this.x) * c;
        this.y += (b.y - this.y) * c;
        this.z += (b.z - this.z) * c;
        this.w += (b.w - this.w) * c;
        return this
    }
};
THREE.Ray = function(b, c) {
    this.origin = b || new THREE.Vector3;
    this.direction = c || new THREE.Vector3
};
THREE.Ray.prototype = {
    constructor: THREE.Ray,
    intersectScene: function(b) {
        return this.intersectObjects(b.objects)
    },
    intersectObjects: function(b) {
        var c, d, e = [];
        c = 0;
        for (d = b.length; c < d; c++) Array.prototype.push.apply(e, this.intersectObject(b[c]));
        e.sort(function(b, c) {
            return b.distance - c.distance
        });
        return e
    },
    intersectObject: function(b) {
        function c(b, c, d) {
            var e;
            e = d.clone().subSelf(b).dot(c);
            if (e <= 0) return null;
            b = b.clone().addSelf(c.clone().multiplyScalar(e));
            return d.distanceTo(b)
        }

        function d(b, c, d, e) {
            var e = e.clone().subSelf(c),
                d = d.clone().subSelf(c),
                i = b.clone().subSelf(c),
                b = e.dot(e),
                c = e.dot(d),
                e = e.dot(i),
                h = d.dot(d),
                d = d.dot(i),
                i = 1 / (b * h - c * c),
                h = (h * e - c * d) * i,
                b = (b * d - c * e) * i;
            return h > 0 && b > 0 && h + b < 1
        }
        if (b instanceof THREE.Particle) {
            var e = c(this.origin, this.direction, b.matrixWorld.getPosition());
            if (e == null || e > b.scale.x) return [];
            return [{
                distance: e,
                point: b.position,
                face: null,
                object: b
            }]
        } else if (b instanceof THREE.Mesh) {
            e = c(this.origin, this.direction, b.matrixWorld.getPosition());
            if (e == null || e > b.geometry.boundingSphere.radius * Math.max(b.scale.x,
                    Math.max(b.scale.y, b.scale.z))) return [];
            var i, h, j, k, p, o, q, m, t, w, y = b.geometry,
                C = y.vertices,
                E = [],
                e = 0;
            for (i = y.faces.length; e < i; e++)
                if (h = y.faces[e], t = this.origin.clone(), w = this.direction.clone(), o = b.matrixWorld, j = o.multiplyVector3(h.centroid.clone()).subSelf(t), m = j.dot(w), !(m <= 0) && (j = o.multiplyVector3(C[h.a].position.clone()), k = o.multiplyVector3(C[h.b].position.clone()), p = o.multiplyVector3(C[h.c].position.clone()), o = h instanceof THREE.Face4 ? o.multiplyVector3(C[h.d].position.clone()) : null, q = b.matrixRotationWorld.multiplyVector3(h.normal.clone()),
                        m = w.dot(q), b.doubleSided || (b.flipSided ? m > 0 : m < 0)))
                    if (m = q.dot((new THREE.Vector3).sub(j, t)) / m, t = t.addSelf(w.multiplyScalar(m)), h instanceof THREE.Face3) d(t, j, k, p) && (h = {
                        distance: this.origin.distanceTo(t),
                        point: t,
                        face: h,
                        object: b
                    }, E.push(h));
                    else if (h instanceof THREE.Face4 && (d(t, j, k, o) || d(t, k, p, o))) h = {
                distance: this.origin.distanceTo(t),
                point: t,
                face: h,
                object: b
            }, E.push(h);
            E.sort(function(b, c) {
                return b.distance - c.distance
            });
            return E
        } else return []
    }
};
THREE.Rectangle = function() {
    function b() {
        h = e - c;
        j = i - d
    }
    var c, d, e, i, h, j, k = !0;
    this.getX = function() {
        return c
    };
    this.getY = function() {
        return d
    };
    this.getWidth = function() {
        return h
    };
    this.getHeight = function() {
        return j
    };
    this.getLeft = function() {
        return c
    };
    this.getTop = function() {
        return d
    };
    this.getRight = function() {
        return e
    };
    this.getBottom = function() {
        return i
    };
    this.set = function(h, j, q, m) {
        k = !1;
        c = h;
        d = j;
        e = q;
        i = m;
        b()
    };
    this.addPoint = function(h, j) {
        k ? (k = !1, c = h, d = j, e = h, i = j) : (c = c < h ? c : h, d = d < j ? d : j, e = e > h ? e : h, i = i > j ? i : j);
        b()
    };
    this.add3Points =
        function(h, j, q, m, t, w) {
            k ? (k = !1, c = h < q ? h < t ? h : t : q < t ? q : t, d = j < m ? j < w ? j : w : m < w ? m : w, e = h > q ? h > t ? h : t : q > t ? q : t, i = j > m ? j > w ? j : w : m > w ? m : w) : (c = h < q ? h < t ? h < c ? h : c : t < c ? t : c : q < t ? q < c ? q : c : t < c ? t : c, d = j < m ? j < w ? j < d ? j : d : w < d ? w : d : m < w ? m < d ? m : d : w < d ? w : d, e = h > q ? h > t ? h > e ? h : e : t > e ? t : e : q > t ? q > e ? q : e : t > e ? t : e, i = j > m ? j > w ? j > i ? j : i : w > i ? w : i : m > w ? m > i ? m : i : w > i ? w : i);
            b()
        };
    this.addRectangle = function(h) {
        k ? (k = !1, c = h.getLeft(), d = h.getTop(), e = h.getRight(), i = h.getBottom()) : (c = c < h.getLeft() ? c : h.getLeft(), d = d < h.getTop() ? d : h.getTop(), e = e > h.getRight() ? e : h.getRight(), i = i >
            h.getBottom() ? i : h.getBottom());
        b()
    };
    this.inflate = function(h) {
        c -= h;
        d -= h;
        e += h;
        i += h;
        b()
    };
    this.minSelf = function(h) {
        c = c > h.getLeft() ? c : h.getLeft();
        d = d > h.getTop() ? d : h.getTop();
        e = e < h.getRight() ? e : h.getRight();
        i = i < h.getBottom() ? i : h.getBottom();
        b()
    };
    this.intersects = function(b) {
        return Math.min(e, b.getRight()) - Math.max(c, b.getLeft()) >= 0 && Math.min(i, b.getBottom()) - Math.max(d, b.getTop()) >= 0
    };
    this.empty = function() {
        k = !0;
        i = e = d = c = 0;
        b()
    };
    this.isEmpty = function() {
        return k
    }
};
THREE.Matrix3 = function() {
    this.m = []
};
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    transpose: function() {
        var b, c = this.m;
        b = c[1];
        c[1] = c[3];
        c[3] = b;
        b = c[2];
        c[2] = c[6];
        c[6] = b;
        b = c[5];
        c[5] = c[7];
        c[7] = b;
        return this
    },
    transposeIntoArray: function(b) {
        var c = this.m;
        b[0] = c[0];
        b[1] = c[3];
        b[2] = c[6];
        b[3] = c[1];
        b[4] = c[4];
        b[5] = c[7];
        b[6] = c[2];
        b[7] = c[5];
        b[8] = c[8];
        return this
    }
};
THREE.Matrix4 = function(b, c, d, e, i, h, j, k, p, o, q, m, t, w, y, C) {
    this.set(b !== void 0 ? b : 1, c || 0, d || 0, e || 0, i || 0, h !== void 0 ? h : 1, j || 0, k || 0, p || 0, o || 0, q !== void 0 ? q : 1, m || 0, t || 0, w || 0, y || 0, C !== void 0 ? C : 1);
    this.flat = Array(16);
    this.m33 = new THREE.Matrix3
};
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function(b, c, d, e, i, h, j, k, p, o, q, m, t, w, y, C) {
        this.n11 = b;
        this.n12 = c;
        this.n13 = d;
        this.n14 = e;
        this.n21 = i;
        this.n22 = h;
        this.n23 = j;
        this.n24 = k;
        this.n31 = p;
        this.n32 = o;
        this.n33 = q;
        this.n34 = m;
        this.n41 = t;
        this.n42 = w;
        this.n43 = y;
        this.n44 = C;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function(b) {
        this.set(b.n11, b.n12, b.n13, b.n14, b.n21, b.n22, b.n23, b.n24, b.n31, b.n32, b.n33, b.n34, b.n41, b.n42, b.n43, b.n44);
        return this
    },
    lookAt: function(b,
        c, d) {
        var e = THREE.Matrix4.__v1,
            i = THREE.Matrix4.__v2,
            h = THREE.Matrix4.__v3;
        h.sub(b, c).normalize();
        if (h.length() === 0) h.z = 1;
        e.cross(d, h).normalize();
        e.length() === 0 && (h.x += 1.0E-4, e.cross(d, h).normalize());
        i.cross(h, e).normalize();
        this.n11 = e.x;
        this.n12 = i.x;
        this.n13 = h.x;
        this.n21 = e.y;
        this.n22 = i.y;
        this.n23 = h.y;
        this.n31 = e.z;
        this.n32 = i.z;
        this.n33 = h.z;
        return this
    },
    multiplyVector3: function(b) {
        var c = b.x,
            d = b.y,
            e = b.z,
            i = 1 / (this.n41 * c + this.n42 * d + this.n43 * e + this.n44);
        b.x = (this.n11 * c + this.n12 * d + this.n13 * e + this.n14) * i;
        b.y = (this.n21 * c + this.n22 * d + this.n23 * e + this.n24) * i;
        b.z = (this.n31 * c + this.n32 * d + this.n33 * e + this.n34) * i;
        return b
    },
    multiplyVector4: function(b) {
        var c = b.x,
            d = b.y,
            e = b.z,
            i = b.w;
        b.x = this.n11 * c + this.n12 * d + this.n13 * e + this.n14 * i;
        b.y = this.n21 * c + this.n22 * d + this.n23 * e + this.n24 * i;
        b.z = this.n31 * c + this.n32 * d + this.n33 * e + this.n34 * i;
        b.w = this.n41 * c + this.n42 * d + this.n43 * e + this.n44 * i;
        return b
    },
    rotateAxis: function(b) {
        var c = b.x,
            d = b.y,
            e = b.z;
        b.x = c * this.n11 + d * this.n12 + e * this.n13;
        b.y = c * this.n21 + d * this.n22 + e * this.n23;
        b.z = c * this.n31 +
            d * this.n32 + e * this.n33;
        b.normalize();
        return b
    },
    crossVector: function(b) {
        var c = new THREE.Vector4;
        c.x = this.n11 * b.x + this.n12 * b.y + this.n13 * b.z + this.n14 * b.w;
        c.y = this.n21 * b.x + this.n22 * b.y + this.n23 * b.z + this.n24 * b.w;
        c.z = this.n31 * b.x + this.n32 * b.y + this.n33 * b.z + this.n34 * b.w;
        c.w = b.w ? this.n41 * b.x + this.n42 * b.y + this.n43 * b.z + this.n44 * b.w : 1;
        return c
    },
    multiply: function(b, c) {
        var d = b.n11,
            e = b.n12,
            i = b.n13,
            h = b.n14,
            j = b.n21,
            k = b.n22,
            p = b.n23,
            o = b.n24,
            q = b.n31,
            m = b.n32,
            t = b.n33,
            w = b.n34,
            y = b.n41,
            C = b.n42,
            E = b.n43,
            D = b.n44,
            wa = c.n11,
            xa =
            c.n12,
            qa = c.n13,
            sa = c.n14,
            ja = c.n21,
            G = c.n22,
            r = c.n23,
            ka = c.n24,
            R = c.n31,
            la = c.n32,
            $ = c.n33,
            ya = c.n34,
            S = c.n41,
            M = c.n42,
            f = c.n43,
            ua = c.n44;
        this.n11 = d * wa + e * ja + i * R + h * S;
        this.n12 = d * xa + e * G + i * la + h * M;
        this.n13 = d * qa + e * r + i * $ + h * f;
        this.n14 = d * sa + e * ka + i * ya + h * ua;
        this.n21 = j * wa + k * ja + p * R + o * S;
        this.n22 = j * xa + k * G + p * la + o * M;
        this.n23 = j * qa + k * r + p * $ + o * f;
        this.n24 = j * sa + k * ka + p * ya + o * ua;
        this.n31 = q * wa + m * ja + t * R + w * S;
        this.n32 = q * xa + m * G + t * la + w * M;
        this.n33 = q * qa + m * r + t * $ + w * f;
        this.n34 = q * sa + m * ka + t * ya + w * ua;
        this.n41 = y * wa + C * ja + E * R + D * S;
        this.n42 = y * xa + C * G + E * la +
            D * M;
        this.n43 = y * qa + C * r + E * $ + D * f;
        this.n44 = y * sa + C * ka + E * ya + D * ua;
        return this
    },
    multiplyToArray: function(b, c, d) {
        this.multiply(b, c);
        d[0] = this.n11;
        d[1] = this.n21;
        d[2] = this.n31;
        d[3] = this.n41;
        d[4] = this.n12;
        d[5] = this.n22;
        d[6] = this.n32;
        d[7] = this.n42;
        d[8] = this.n13;
        d[9] = this.n23;
        d[10] = this.n33;
        d[11] = this.n43;
        d[12] = this.n14;
        d[13] = this.n24;
        d[14] = this.n34;
        d[15] = this.n44;
        return this
    },
    multiplySelf: function(b) {
        this.multiply(this, b);
        return this
    },
    multiplyScalar: function(b) {
        this.n11 *= b;
        this.n12 *= b;
        this.n13 *= b;
        this.n14 *= b;
        this.n21 *= b;
        this.n22 *= b;
        this.n23 *= b;
        this.n24 *= b;
        this.n31 *= b;
        this.n32 *= b;
        this.n33 *= b;
        this.n34 *= b;
        this.n41 *= b;
        this.n42 *= b;
        this.n43 *= b;
        this.n44 *= b;
        return this
    },
    determinant: function() {
        var b = this.n11,
            c = this.n12,
            d = this.n13,
            e = this.n14,
            i = this.n21,
            h = this.n22,
            j = this.n23,
            k = this.n24,
            p = this.n31,
            o = this.n32,
            q = this.n33,
            m = this.n34,
            t = this.n41,
            w = this.n42,
            y = this.n43,
            C = this.n44;
        return e * j * o * t - d * k * o * t - e * h * q * t + c * k * q * t + d * h * m * t - c * j * m * t - e * j * p * w + d * k * p * w + e * i * q * w - b * k * q * w - d * i * m * w + b * j * m * w + e * h * p * y - c * k * p * y - e * i * o * y + b * k * o * y + c * i * m *
            y - b * h * m * y - d * h * p * C + c * j * p * C + d * i * o * C - b * j * o * C - c * i * q * C + b * h * q * C
    },
    transpose: function() {
        var b;
        b = this.n21;
        this.n21 = this.n12;
        this.n12 = b;
        b = this.n31;
        this.n31 = this.n13;
        this.n13 = b;
        b = this.n32;
        this.n32 = this.n23;
        this.n23 = b;
        b = this.n41;
        this.n41 = this.n14;
        this.n14 = b;
        b = this.n42;
        this.n42 = this.n24;
        this.n24 = b;
        b = this.n43;
        this.n43 = this.n34;
        this.n43 = b;
        return this
    },
    clone: function() {
        var b = new THREE.Matrix4;
        b.n11 = this.n11;
        b.n12 = this.n12;
        b.n13 = this.n13;
        b.n14 = this.n14;
        b.n21 = this.n21;
        b.n22 = this.n22;
        b.n23 = this.n23;
        b.n24 = this.n24;
        b.n31 =
            this.n31;
        b.n32 = this.n32;
        b.n33 = this.n33;
        b.n34 = this.n34;
        b.n41 = this.n41;
        b.n42 = this.n42;
        b.n43 = this.n43;
        b.n44 = this.n44;
        return b
    },
    flatten: function() {
        this.flat[0] = this.n11;
        this.flat[1] = this.n21;
        this.flat[2] = this.n31;
        this.flat[3] = this.n41;
        this.flat[4] = this.n12;
        this.flat[5] = this.n22;
        this.flat[6] = this.n32;
        this.flat[7] = this.n42;
        this.flat[8] = this.n13;
        this.flat[9] = this.n23;
        this.flat[10] = this.n33;
        this.flat[11] = this.n43;
        this.flat[12] = this.n14;
        this.flat[13] = this.n24;
        this.flat[14] = this.n34;
        this.flat[15] = this.n44;
        return this.flat
    },
    flattenToArray: function(b) {
        b[0] = this.n11;
        b[1] = this.n21;
        b[2] = this.n31;
        b[3] = this.n41;
        b[4] = this.n12;
        b[5] = this.n22;
        b[6] = this.n32;
        b[7] = this.n42;
        b[8] = this.n13;
        b[9] = this.n23;
        b[10] = this.n33;
        b[11] = this.n43;
        b[12] = this.n14;
        b[13] = this.n24;
        b[14] = this.n34;
        b[15] = this.n44;
        return b
    },
    flattenToArrayOffset: function(b, c) {
        b[c] = this.n11;
        b[c + 1] = this.n21;
        b[c + 2] = this.n31;
        b[c + 3] = this.n41;
        b[c + 4] = this.n12;
        b[c + 5] = this.n22;
        b[c + 6] = this.n32;
        b[c + 7] = this.n42;
        b[c + 8] = this.n13;
        b[c + 9] = this.n23;
        b[c + 10] = this.n33;
        b[c + 11] =
            this.n43;
        b[c + 12] = this.n14;
        b[c + 13] = this.n24;
        b[c + 14] = this.n34;
        b[c + 15] = this.n44;
        return b
    },
    setTranslation: function(b, c, d) {
        this.set(1, 0, 0, b, 0, 1, 0, c, 0, 0, 1, d, 0, 0, 0, 1);
        return this
    },
    setScale: function(b, c, d) {
        this.set(b, 0, 0, 0, 0, c, 0, 0, 0, 0, d, 0, 0, 0, 0, 1);
        return this
    },
    setRotationX: function(b) {
        var c = Math.cos(b),
            b = Math.sin(b);
        this.set(1, 0, 0, 0, 0, c, -b, 0, 0, b, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationY: function(b) {
        var c = Math.cos(b),
            b = Math.sin(b);
        this.set(c, 0, b, 0, 0, 1, 0, 0, -b, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationZ: function(b) {
        var c =
            Math.cos(b),
            b = Math.sin(b);
        this.set(c, -b, 0, 0, b, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    setRotationAxis: function(b, c) {
        var d = Math.cos(c),
            e = Math.sin(c),
            i = 1 - d,
            h = b.x,
            j = b.y,
            k = b.z,
            p = i * h,
            o = i * j;
        this.set(p * h + d, p * j - e * k, p * k + e * j, 0, p * j + e * k, o * j + d, o * k - e * h, 0, p * k - e * j, o * k + e * h, i * k * k + d, 0, 0, 0, 0, 1);
        return this
    },
    setPosition: function(b) {
        this.n14 = b.x;
        this.n24 = b.y;
        this.n34 = b.z;
        return this
    },
    getPosition: function() {
        if (!this.position) this.position = new THREE.Vector3;
        this.position.set(this.n14, this.n24, this.n34);
        return this.position
    },
    getColumnX: function() {
        if (!this.columnX) this.columnX = new THREE.Vector3;
        this.columnX.set(this.n11, this.n21, this.n31);
        return this.columnX
    },
    getColumnY: function() {
        if (!this.columnY) this.columnY = new THREE.Vector3;
        this.columnY.set(this.n12, this.n22, this.n32);
        return this.columnY
    },
    getColumnZ: function() {
        if (!this.columnZ) this.columnZ = new THREE.Vector3;
        this.columnZ.set(this.n13, this.n23, this.n33);
        return this.columnZ
    },
    setRotationFromEuler: function(b, c) {
        var d = b.x,
            e = b.y,
            i = b.z,
            h = Math.cos(d),
            d = Math.sin(d),
            j = Math.cos(e),
            e = Math.sin(e),
            k = Math.cos(i),
            i = Math.sin(i);
        switch (c) {
            case "YXZ":
                var p = j * k,
                    o = j * i,
                    q = e * k,
                    m = e * i;
                this.n11 = p + m * d;
                this.n12 = q * d - o;
                this.n13 = h * e;
                this.n21 = h * i;
                this.n22 = h * k;
                this.n23 = -d;
                this.n31 = o * d - q;
                this.n32 = m + p * d;
                this.n33 = h * j;
                break;
            case "ZXY":
                p = j * k;
                o = j * i;
                q = e * k;
                m = e * i;
                this.n11 = p - m * d;
                this.n12 = -h * i;
                this.n13 = q + o * d;
                this.n21 = o + q * d;
                this.n22 = h * k;
                this.n23 = m - p * d;
                this.n31 = -h * e;
                this.n32 = d;
                this.n33 = h * j;
                break;
            case "ZYX":
                p = h * k;
                o = h * i;
                q = d * k;
                m = d * i;
                this.n11 = j * k;
                this.n12 = q * e - o;
                this.n13 = p * e + m;
                this.n21 = j * i;
                this.n22 = m * e + p;
                this.n23 =
                    o * e - q;
                this.n31 = -e;
                this.n32 = d * j;
                this.n33 = h * j;
                break;
            case "YZX":
                p = h * j;
                o = h * e;
                q = d * j;
                m = d * e;
                this.n11 = j * k;
                this.n12 = m - p * i;
                this.n13 = q * i + o;
                this.n21 = i;
                this.n22 = h * k;
                this.n23 = -d * k;
                this.n31 = -e * k;
                this.n32 = o * i + q;
                this.n33 = p - m * i;
                break;
            case "XZY":
                p = h * j;
                o = h * e;
                q = d * j;
                m = d * e;
                this.n11 = j * k;
                this.n12 = -i;
                this.n13 = e * k;
                this.n21 = p * i + m;
                this.n22 = h * k;
                this.n23 = o * i - q;
                this.n31 = q * i - o;
                this.n32 = d * k;
                this.n33 = m * i + p;
                break;
            default:
                p = h * k, o = h * i, q = d * k, m = d * i, this.n11 = j * k, this.n12 = -j * i, this.n13 = e, this.n21 = o + q * e, this.n22 = p - m * e, this.n23 = -d * j, this.n31 =
                    m - p * e, this.n32 = q + o * e, this.n33 = h * j
        }
        return this
    },
    setRotationFromQuaternion: function(b) {
        var c = b.x,
            d = b.y,
            e = b.z,
            i = b.w,
            h = c + c,
            j = d + d,
            k = e + e,
            b = c * h,
            p = c * j;
        c *= k;
        var o = d * j;
        d *= k;
        e *= k;
        h *= i;
        j *= i;
        i *= k;
        this.n11 = 1 - (o + e);
        this.n12 = p - i;
        this.n13 = c + j;
        this.n21 = p + i;
        this.n22 = 1 - (b + e);
        this.n23 = d - h;
        this.n31 = c - j;
        this.n32 = d + h;
        this.n33 = 1 - (b + o);
        return this
    },
    scale: function(b) {
        var c = b.x,
            d = b.y,
            b = b.z;
        this.n11 *= c;
        this.n12 *= d;
        this.n13 *= b;
        this.n21 *= c;
        this.n22 *= d;
        this.n23 *= b;
        this.n31 *= c;
        this.n32 *= d;
        this.n33 *= b;
        this.n41 *= c;
        this.n42 *= d;
        this.n43 *=
            b;
        return this
    },
    compose: function(b, c, d) {
        var e = THREE.Matrix4.__m1,
            i = THREE.Matrix4.__m2;
        e.identity();
        e.setRotationFromQuaternion(c);
        i.setScale(d.x, d.y, d.z);
        this.multiply(e, i);
        this.n14 = b.x;
        this.n24 = b.y;
        this.n34 = b.z;
        return this
    },
    decompose: function(b, c, d) {
        var e = THREE.Matrix4.__v1,
            i = THREE.Matrix4.__v2,
            h = THREE.Matrix4.__v3;
        e.set(this.n11, this.n21, this.n31);
        i.set(this.n12, this.n22, this.n32);
        h.set(this.n13, this.n23, this.n33);
        b = b instanceof THREE.Vector3 ? b : new THREE.Vector3;
        c = c instanceof THREE.Quaternion ? c :
            new THREE.Quaternion;
        d = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
        d.x = e.length();
        d.y = i.length();
        d.z = h.length();
        b.x = this.n14;
        b.y = this.n24;
        b.z = this.n34;
        e = THREE.Matrix4.__m1;
        e.copy(this);
        e.n11 /= d.x;
        e.n21 /= d.x;
        e.n31 /= d.x;
        e.n12 /= d.y;
        e.n22 /= d.y;
        e.n32 /= d.y;
        e.n13 /= d.z;
        e.n23 /= d.z;
        e.n33 /= d.z;
        c.setFromRotationMatrix(e);
        return [b, c, d]
    },
    extractPosition: function(b) {
        this.n14 = b.n14;
        this.n24 = b.n24;
        this.n34 = b.n34
    },
    extractRotation: function(b, c) {
        var d = 1 / c.x,
            e = 1 / c.y,
            i = 1 / c.z;
        this.n11 = b.n11 * d;
        this.n21 = b.n21 * d;
        this.n31 =
            b.n31 * d;
        this.n12 = b.n12 * e;
        this.n22 = b.n22 * e;
        this.n32 = b.n32 * e;
        this.n13 = b.n13 * i;
        this.n23 = b.n23 * i;
        this.n33 = b.n33 * i
    }
};
THREE.Matrix4.makeInvert = function(b, c) {
    var d = b.n11,
        e = b.n12,
        i = b.n13,
        h = b.n14,
        j = b.n21,
        k = b.n22,
        p = b.n23,
        o = b.n24,
        q = b.n31,
        m = b.n32,
        t = b.n33,
        w = b.n34,
        y = b.n41,
        C = b.n42,
        E = b.n43,
        D = b.n44;
    c === void 0 && (c = new THREE.Matrix4);
    c.n11 = p * w * C - o * t * C + o * m * E - k * w * E - p * m * D + k * t * D;
    c.n12 = h * t * C - i * w * C - h * m * E + e * w * E + i * m * D - e * t * D;
    c.n13 = i * o * C - h * p * C + h * k * E - e * o * E - i * k * D + e * p * D;
    c.n14 = h * p * m - i * o * m - h * k * t + e * o * t + i * k * w - e * p * w;
    c.n21 = o * t * y - p * w * y - o * q * E + j * w * E + p * q * D - j * t * D;
    c.n22 = i * w * y - h * t * y + h * q * E - d * w * E - i * q * D + d * t * D;
    c.n23 = h * p * y - i * o * y - h * j * E + d * o * E + i * j * D - d * p * D;
    c.n24 =
        i * o * q - h * p * q + h * j * t - d * o * t - i * j * w + d * p * w;
    c.n31 = k * w * y - o * m * y + o * q * C - j * w * C - k * q * D + j * m * D;
    c.n32 = h * m * y - e * w * y - h * q * C + d * w * C + e * q * D - d * m * D;
    c.n33 = i * o * y - h * k * y + h * j * C - d * o * C - e * j * D + d * k * D;
    c.n34 = h * k * q - e * o * q - h * j * m + d * o * m + e * j * w - d * k * w;
    c.n41 = p * m * y - k * t * y - p * q * C + j * t * C + k * q * E - j * m * E;
    c.n42 = e * t * y - i * m * y + i * q * C - d * t * C - e * q * E + d * m * E;
    c.n43 = i * k * y - e * p * y - i * j * C + d * p * C + e * j * E - d * k * E;
    c.n44 = e * p * q - i * k * q + i * j * m - d * p * m - e * j * t + d * k * t;
    c.multiplyScalar(1 / b.determinant());
    return c
};
THREE.Matrix4.makeInvert3x3 = function(b) {
    var c = b.m33,
        d = c.m,
        e = b.n33 * b.n22 - b.n32 * b.n23,
        i = -b.n33 * b.n21 + b.n31 * b.n23,
        h = b.n32 * b.n21 - b.n31 * b.n22,
        j = -b.n33 * b.n12 + b.n32 * b.n13,
        k = b.n33 * b.n11 - b.n31 * b.n13,
        p = -b.n32 * b.n11 + b.n31 * b.n12,
        o = b.n23 * b.n12 - b.n22 * b.n13,
        q = -b.n23 * b.n11 + b.n21 * b.n13,
        m = b.n22 * b.n11 - b.n21 * b.n12,
        b = b.n11 * e + b.n21 * j + b.n31 * o;
    b == 0 && console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");
    b = 1 / b;
    d[0] = b * e;
    d[1] = b * i;
    d[2] = b * h;
    d[3] = b * j;
    d[4] = b * k;
    d[5] = b * p;
    d[6] = b * o;
    d[7] = b * q;
    d[8] = b * m;
    return c
};
THREE.Matrix4.makeFrustum = function(b, c, d, e, i, h) {
    var j;
    j = new THREE.Matrix4;
    j.n11 = 2 * i / (c - b);
    j.n12 = 0;
    j.n13 = (c + b) / (c - b);
    j.n14 = 0;
    j.n21 = 0;
    j.n22 = 2 * i / (e - d);
    j.n23 = (e + d) / (e - d);
    j.n24 = 0;
    j.n31 = 0;
    j.n32 = 0;
    j.n33 = -(h + i) / (h - i);
    j.n34 = -2 * h * i / (h - i);
    j.n41 = 0;
    j.n42 = 0;
    j.n43 = -1;
    j.n44 = 0;
    return j
};
THREE.Matrix4.makePerspective = function(b, c, d, e) {
    var i, b = d * Math.tan(b * Math.PI / 360);
    i = -b;
    return THREE.Matrix4.makeFrustum(i * c, b * c, i, b, d, e)
};
THREE.Matrix4.makeOrtho = function(b, c, d, e, i, h) {
    var j, k, p, o;
    j = new THREE.Matrix4;
    k = c - b;
    p = d - e;
    o = h - i;
    j.n11 = 2 / k;
    j.n12 = 0;
    j.n13 = 0;
    j.n14 = -((c + b) / k);
    j.n21 = 0;
    j.n22 = 2 / p;
    j.n23 = 0;
    j.n24 = -((d + e) / p);
    j.n31 = 0;
    j.n32 = 0;
    j.n33 = -2 / o;
    j.n34 = -((h + i) / o);
    j.n41 = 0;
    j.n42 = 0;
    j.n43 = 0;
    j.n44 = 1;
    return j
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Matrix4.__m1 = new THREE.Matrix4;
THREE.Matrix4.__m2 = new THREE.Matrix4;
THREE.Object3D = function() {
    this.name = "";
    this.id = THREE.Object3DCount++;
    this.parent = void 0;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.eulerOrder = "XYZ";
    this.scale = new THREE.Vector3(1, 1, 1);
    this.flipSided = this.doubleSided = this.dynamic = !1;
    this.renderDepth = null;
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = !1;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    translate: function(b, c) {
        this.matrix.rotateAxis(c);
        this.position.addSelf(c.multiplyScalar(b))
    },
    translateX: function(b) {
        this.translate(b, this._vector.set(1, 0, 0))
    },
    translateY: function(b) {
        this.translate(b, this._vector.set(0, 1, 0))
    },
    translateZ: function(b) {
        this.translate(b, this._vector.set(0, 0, 1))
    },
    lookAt: function(b) {
        this.matrix.lookAt(b, this.position, this.up);
        this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
    },
    add: function(b) {
        if (this.children.indexOf(b) ===
            -1) {
            b.parent !== void 0 && b.parent.removeChild(b);
            b.parent = this;
            this.children.push(b);
            for (var c = this; c.parent !== void 0;) c = c.parent;
            c !== void 0 && c instanceof THREE.Scene && c.addChildRecurse(b)
        }
    },
    remove: function(b) {
        var c = this,
            d = this.children.indexOf(b);
        if (d !== -1) {
            b.parent = void 0;
            for (this.children.splice(d, 1); c.parent !== void 0;) c = c.parent;
            c !== void 0 && c instanceof THREE.Scene && c.removeChildRecurse(b)
        }
    },
    getChildByName: function(b, c) {
        var d, e, i;
        d = 0;
        for (e = this.children.length; d < e; d++) {
            i = this.children[d];
            if (i.name ===
                b) return i;
            if (c && (i = i.getChildByName(b, c), i !== void 0)) return i
        }
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z));
        this.matrixWorldNeedsUpdate = !0
    },
    update: function(b, c, d) {
        this.matrixAutoUpdate &&
            this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || c) b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale), this.matrixWorldNeedsUpdate = !1, c = !0;
        for (var b = 0, e = this.children.length; b < e; b++) this.children[b].update(this.matrixWorld, c, d)
    },
    addChild: function(b) {
        console.warn("DEPRECATED: Object3D.addChild() is now Object3D.add().");
        this.add(b)
    },
    removeChild: function(b) {
        console.warn("DEPRECATED: Object3D.removeChild() is now Object3D.remove().");
        this.remove(b)
    }
};
THREE.Object3DCount = 0;
THREE.Projector = function() {
    function b() {
        var b = p[k] = p[k] || new THREE.RenderableVertex;
        k++;
        return b
    }

    function c(b, c) {
        return c.z - b.z
    }

    function d(b, c) {
        var d = 0,
            f = 1,
            e = b.z + b.w,
            h = c.z + c.w,
            i = -b.z + b.w,
            j = -c.z + c.w;
        return e >= 0 && h >= 0 && i >= 0 && j >= 0 ? !0 : e < 0 && h < 0 || i < 0 && j < 0 ? !1 : (e < 0 ? d = Math.max(d, e / (e - h)) : h < 0 && (f = Math.min(f, e / (e - h))), i < 0 ? d = Math.max(d, i / (i - j)) : j < 0 && (f = Math.min(f, i / (i - j))), f < d ? !1 : (b.lerpSelf(c, d), c.lerpSelf(b, 1 - f), !0))
    }
    var e, i, h = [],
        j, k, p = [],
        o, q, m = [],
        t, w = [],
        y, C, E = [],
        D, wa, xa = [],
        qa = [],
        sa = [],
        ja = new THREE.Vector4,
        G = new THREE.Vector4,
        r = new THREE.Matrix4,
        ka = new THREE.Matrix4,
        R = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4],
        la = new THREE.Vector4,
        $ = new THREE.Vector4;
    this.projectVector = function(b, c) {
        r.multiply(c.projectionMatrix, c.matrixWorldInverse);
        r.multiplyVector3(b);
        return b
    };
    this.unprojectVector = function(b, c) {
        r.multiply(c.matrixWorld, THREE.Matrix4.makeInvert(c.projectionMatrix));
        r.multiplyVector3(b);
        return b
    };
    this.pickingRay = function(b, c) {
        var d;
        b.z = -1;
        d = new THREE.Vector3(b.x, b.y, 1);
        this.unprojectVector(b, c);
        this.unprojectVector(d, c);
        d.subSelf(b).normalize();
        return new THREE.Ray(b, d)
    };
    this.projectObjects = function(b, d, j) {
        var f, k;
        i = qa.length = 0;
        f = b.objects;
        b = 0;
        for (d = f.length; b < d; b++) {
            k = f[b];
            var o;
            if (!(o = !k.visible))
                if (o = k instanceof THREE.Mesh)
                    if (o = k.frustumCulled) {
                        a: {
                            o = void 0;
                            for (var p = k.matrixWorld, m = -k.geometry.boundingSphere.radius * Math.max(k.scale.x, Math.max(k.scale.y, k.scale.z)), q = 0; q < 6; q++)
                                if (o = R[q].x * p.n14 + R[q].y * p.n24 + R[q].z * p.n34 +
                                    R[q].w, o <= m) {
                                    o = !1;
                                    break a
                                }
                            o = !0
                        }
                        o = !o
                    }
            if (!o) o = h[i] = h[i] || new THREE.RenderableObject, i++, e = o, ja.copy(k.position), r.multiplyVector3(ja), e.object = k, e.z = ja.z, qa.push(e)
        }
        j && qa.sort(c);
        return qa
    };
    this.projectScene = function(e, h, i) {
        var f = h.near,
            qa = h.far,
            ja, va, N, T, I, V, X, W, aa, J, Aa, La, Ra, Ia, Ba, Da, za;
        wa = C = t = q = sa.length = 0;
        h.matrixAutoUpdate && h.update(void 0, !0);
        e.update(void 0, !1, h);
        r.multiply(h.projectionMatrix, h.matrixWorldInverse);
        R[0].set(r.n41 - r.n11, r.n42 - r.n12, r.n43 - r.n13, r.n44 - r.n14);
        R[1].set(r.n41 + r.n11,
            r.n42 + r.n12, r.n43 + r.n13, r.n44 + r.n14);
        R[2].set(r.n41 + r.n21, r.n42 + r.n22, r.n43 + r.n23, r.n44 + r.n24);
        R[3].set(r.n41 - r.n21, r.n42 - r.n22, r.n43 - r.n23, r.n44 - r.n24);
        R[4].set(r.n41 - r.n31, r.n42 - r.n32, r.n43 - r.n33, r.n44 - r.n34);
        R[5].set(r.n41 + r.n31, r.n42 + r.n32, r.n43 + r.n33, r.n44 + r.n34);
        for (ja = 0; ja < 6; ja++) aa = R[ja], aa.divideScalar(Math.sqrt(aa.x * aa.x + aa.y * aa.y + aa.z * aa.z));
        aa = this.projectObjects(e, h, !0);
        e = 0;
        for (ja = aa.length; e < ja; e++)
            if (J = aa[e].object, J.visible)
                if (Aa = J.matrixWorld, La = J.matrixRotationWorld, Ra = J.materials,
                    Ia = J.overdraw, k = 0, J instanceof THREE.Mesh) {
                    Ba = J.geometry;
                    T = Ba.vertices;
                    Da = Ba.faces;
                    Ba = Ba.faceVertexUvs;
                    va = 0;
                    for (N = T.length; va < N; va++) j = b(), j.positionWorld.copy(T[va].position), Aa.multiplyVector3(j.positionWorld), j.positionScreen.copy(j.positionWorld), r.multiplyVector4(j.positionScreen), j.positionScreen.x /= j.positionScreen.w, j.positionScreen.y /= j.positionScreen.w, j.visible = j.positionScreen.z > f && j.positionScreen.z < qa;
                    T = 0;
                    for (va = Da.length; T < va; T++) {
                        N = Da[T];
                        if (N instanceof THREE.Face3)
                            if (I = p[N.a], V = p[N.b],
                                X = p[N.c], I.visible && V.visible && X.visible && (J.doubleSided || J.flipSided != (X.positionScreen.x - I.positionScreen.x) * (V.positionScreen.y - I.positionScreen.y) - (X.positionScreen.y - I.positionScreen.y) * (V.positionScreen.x - I.positionScreen.x) < 0)) W = m[q] = m[q] || new THREE.RenderableFace3, q++, o = W, o.v1.copy(I), o.v2.copy(V), o.v3.copy(X);
                            else continue;
                        else if (N instanceof THREE.Face4)
                            if (I = p[N.a], V = p[N.b], X = p[N.c], W = p[N.d], I.visible && V.visible && X.visible && W.visible && (J.doubleSided || J.flipSided != ((W.positionScreen.x - I.positionScreen.x) *
                                    (V.positionScreen.y - I.positionScreen.y) - (W.positionScreen.y - I.positionScreen.y) * (V.positionScreen.x - I.positionScreen.x) < 0 || (V.positionScreen.x - X.positionScreen.x) * (W.positionScreen.y - X.positionScreen.y) - (V.positionScreen.y - X.positionScreen.y) * (W.positionScreen.x - X.positionScreen.x) < 0))) za = w[t] = w[t] || new THREE.RenderableFace4, t++, o = za, o.v1.copy(I), o.v2.copy(V), o.v3.copy(X), o.v4.copy(W);
                            else continue;
                        o.normalWorld.copy(N.normal);
                        La.multiplyVector3(o.normalWorld);
                        o.centroidWorld.copy(N.centroid);
                        Aa.multiplyVector3(o.centroidWorld);
                        o.centroidScreen.copy(o.centroidWorld);
                        r.multiplyVector3(o.centroidScreen);
                        X = N.vertexNormals;
                        I = 0;
                        for (V = X.length; I < V; I++) W = o.vertexNormalsWorld[I], W.copy(X[I]), La.multiplyVector3(W);
                        I = 0;
                        for (V = Ba.length; I < V; I++)
                            if (za = Ba[I][T]) {
                                X = 0;
                                for (W = za.length; X < W; X++) o.uvs[I][X] = za[X]
                            }
                        o.meshMaterials = Ra;
                        o.faceMaterials = N.materials;
                        o.overdraw = Ia;
                        o.z = o.centroidScreen.z;
                        sa.push(o)
                    }
                } else if (J instanceof THREE.Line) {
            ka.multiply(r, Aa);
            T = J.geometry.vertices;
            I = b();
            I.positionScreen.copy(T[0].position);
            ka.multiplyVector4(I.positionScreen);
            va = 1;
            for (N = T.length; va < N; va++)
                if (I = b(), I.positionScreen.copy(T[va].position), ka.multiplyVector4(I.positionScreen), V = p[k - 2], la.copy(I.positionScreen), $.copy(V.positionScreen), d(la, $)) la.multiplyScalar(1 / la.w), $.multiplyScalar(1 / $.w), Aa = E[C] = E[C] || new THREE.RenderableLine, C++, y = Aa, y.v1.positionScreen.copy(la), y.v2.positionScreen.copy($), y.z = Math.max(la.z, $.z), y.materials = J.materials, sa.push(y)
        } else if (J instanceof THREE.Particle && (G.set(J.matrixWorld.n14, J.matrixWorld.n24, J.matrixWorld.n34, 1), r.multiplyVector4(G),
                G.z /= G.w, G.z > 0 && G.z < 1)) Aa = xa[wa] = xa[wa] || new THREE.RenderableParticle, wa++, D = Aa, D.x = G.x / G.w, D.y = G.y / G.w, D.z = G.z, D.rotation = J.rotation.z, D.scale.x = J.scale.x * Math.abs(D.x - (G.x + h.projectionMatrix.n11) / (G.w + h.projectionMatrix.n14)), D.scale.y = J.scale.y * Math.abs(D.y - (G.y + h.projectionMatrix.n22) / (G.w + h.projectionMatrix.n24)), D.materials = J.materials, sa.push(D);
        i && sa.sort(c);
        return sa
    }
};
THREE.Quaternion = function(b, c, d, e) {
    this.set(b || 0, c || 0, d || 0, e !== void 0 ? e : 1)
};
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function(b, c, d, e) {
        this.x = b;
        this.y = c;
        this.z = d;
        this.w = e;
        return this
    },
    copy: function(b) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
        this.w = b.w;
        return this
    },
    setFromEuler: function(b) {
        var c = Math.PI / 360,
            d = b.x * c,
            e = b.y * c,
            i = b.z * c,
            b = Math.cos(e),
            e = Math.sin(e),
            c = Math.cos(-i),
            i = Math.sin(-i),
            h = Math.cos(d),
            d = Math.sin(d),
            j = b * c,
            k = e * i;
        this.w = j * h - k * d;
        this.x = j * d + k * h;
        this.y = e * c * h + b * i * d;
        this.z = b * i * h - e * c * d;
        return this
    },
    setFromAxisAngle: function(b, c) {
        var d = c / 2,
            e = Math.sin(d);
        this.x = b.x * e;
        this.y = b.y * e;
        this.z = b.z * e;
        this.w = Math.cos(d);
        return this
    },
    setFromRotationMatrix: function(b) {
        var c = Math.pow(b.determinant(), 1 / 3);
        this.w = Math.sqrt(Math.max(0, c + b.n11 + b.n22 + b.n33)) / 2;
        this.x = Math.sqrt(Math.max(0, c + b.n11 - b.n22 - b.n33)) / 2;
        this.y = Math.sqrt(Math.max(0, c - b.n11 + b.n22 - b.n33)) / 2;
        this.z = Math.sqrt(Math.max(0, c - b.n11 - b.n22 + b.n33)) / 2;
        this.x = b.n32 - b.n23 < 0 ? -Math.abs(this.x) : Math.abs(this.x);
        this.y = b.n13 - b.n31 < 0 ? -Math.abs(this.y) : Math.abs(this.y);
        this.z = b.n21 - b.n12 < 0 ? -Math.abs(this.z) : Math.abs(this.z);
        this.normalize();
        return this
    },
    calculateW: function() {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    },
    inverse: function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var b = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        b == 0 ? this.w = this.z = this.y = this.x = 0 : (b = 1 / b, this.x *= b, this.y *= b, this.z *= b, this.w *= b);
        return this
    },
    multiplySelf: function(b) {
        var c =
            this.x,
            d = this.y,
            e = this.z,
            i = this.w,
            h = b.x,
            j = b.y,
            k = b.z,
            b = b.w;
        this.x = c * b + i * h + d * k - e * j;
        this.y = d * b + i * j + e * h - c * k;
        this.z = e * b + i * k + c * j - d * h;
        this.w = i * b - c * h - d * j - e * k;
        return this
    },
    multiply: function(b, c) {
        this.x = b.x * c.w + b.y * c.z - b.z * c.y + b.w * c.x;
        this.y = -b.x * c.z + b.y * c.w + b.z * c.x + b.w * c.y;
        this.z = b.x * c.y - b.y * c.x + b.z * c.w + b.w * c.z;
        this.w = -b.x * c.x - b.y * c.y - b.z * c.z + b.w * c.w;
        return this
    },
    multiplyVector3: function(b, c) {
        c || (c = b);
        var d = b.x,
            e = b.y,
            i = b.z,
            h = this.x,
            j = this.y,
            k = this.z,
            p = this.w,
            o = p * d + j * i - k * e,
            q = p * e + k * d - h * i,
            m = p * i + h * e - j * d,
            d = -h *
            d - j * e - k * i;
        c.x = o * p + d * -h + q * -k - m * -j;
        c.y = q * p + d * -j + m * -h - o * -k;
        c.z = m * p + d * -k + o * -j - q * -h;
        return c
    }
};
THREE.Quaternion.slerp = function(b, c, d, e) {
    var i = b.w * c.w + b.x * c.x + b.y * c.y + b.z * c.z;
    if (Math.abs(i) >= 1) return d.w = b.w, d.x = b.x, d.y = b.y, d.z = b.z, d;
    var h = Math.acos(i),
        j = Math.sqrt(1 - i * i);
    if (Math.abs(j) < 0.001) return d.w = 0.5 * (b.w + c.w), d.x = 0.5 * (b.x + c.x), d.y = 0.5 * (b.y + c.y), d.z = 0.5 * (b.z + c.z), d;
    i = Math.sin((1 - e) * h) / j;
    e = Math.sin(e * h) / j;
    d.w = b.w * i + c.w * e;
    d.x = b.x * i + c.x * e;
    d.y = b.y * i + c.y * e;
    d.z = b.z * i + c.z * e;
    return d
};
THREE.Vertex = function(b) {
    this.position = b || new THREE.Vector3
};
THREE.Face3 = function(b, c, d, e, i, h) {
    this.a = b;
    this.b = c;
    this.c = d;
    this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
    this.vertexNormals = e instanceof Array ? e : [];
    this.color = i instanceof THREE.Color ? i : new THREE.Color;
    this.vertexColors = i instanceof Array ? i : [];
    this.vertexTangents = [];
    this.materials = h instanceof Array ? h : [h];
    this.centroid = new THREE.Vector3
};
THREE.Face4 = function(b, c, d, e, i, h, j) {
    this.a = b;
    this.b = c;
    this.c = d;
    this.d = e;
    this.normal = i instanceof THREE.Vector3 ? i : new THREE.Vector3;
    this.vertexNormals = i instanceof Array ? i : [];
    this.color = h instanceof THREE.Color ? h : new THREE.Color;
    this.vertexColors = h instanceof Array ? h : [];
    this.vertexTangents = [];
    this.materials = j instanceof Array ? j : [j];
    this.centroid = new THREE.Vector3
};
THREE.UV = function(b, c) {
    this.u = b || 0;
    this.v = c || 0
};
THREE.UV.prototype = {
    constructor: THREE.UV,
    set: function(b, c) {
        this.u = b;
        this.v = c;
        return this
    },
    copy: function(b) {
        this.u = b.u;
        this.v = b.v;
        return this
    },
    clone: function() {
        return new THREE.UV(this.u, this.v)
    }
};
THREE.Geometry = function() {
    this.id = THREE.GeometryCount++;
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.faceUvs = [
        []
    ];
    this.faceVertexUvs = [
        []
    ];
    this.morphTargets = [];
    this.morphColors = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.dynamic = this.hasTangents = !1
};
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function(b) {
        var c = new THREE.Matrix4;
        c.extractRotation(b, new THREE.Vector3(1, 1, 1));
        for (var d = 0, e = this.vertices.length; d < e; d++) b.multiplyVector3(this.vertices[d].position);
        d = 0;
        for (e = this.faces.length; d < e; d++) {
            var i = this.faces[d];
            c.multiplyVector3(i.normal);
            for (var h = 0, j = i.vertexNormals.length; h < j; h++) c.multiplyVector3(i.vertexNormals[h]);
            b.multiplyVector3(i.centroid)
        }
    },
    computeCentroids: function() {
        var b, c, d;
        b = 0;
        for (c = this.faces.length; b <
            c; b++) d = this.faces[b], d.centroid.set(0, 0, 0), d instanceof THREE.Face3 ? (d.centroid.addSelf(this.vertices[d.a].position), d.centroid.addSelf(this.vertices[d.b].position), d.centroid.addSelf(this.vertices[d.c].position), d.centroid.divideScalar(3)) : d instanceof THREE.Face4 && (d.centroid.addSelf(this.vertices[d.a].position), d.centroid.addSelf(this.vertices[d.b].position), d.centroid.addSelf(this.vertices[d.c].position), d.centroid.addSelf(this.vertices[d.d].position), d.centroid.divideScalar(4))
    },
    computeFaceNormals: function(b) {
        var c,
            d, e, i, h, j, k = new THREE.Vector3,
            p = new THREE.Vector3;
        e = 0;
        for (i = this.faces.length; e < i; e++) {
            h = this.faces[e];
            if (b && h.vertexNormals.length) {
                k.set(0, 0, 0);
                c = 0;
                for (d = h.vertexNormals.length; c < d; c++) k.addSelf(h.vertexNormals[c]);
                k.divideScalar(3)
            } else c = this.vertices[h.a], d = this.vertices[h.b], j = this.vertices[h.c], k.sub(j.position, d.position), p.sub(c.position, d.position), k.crossSelf(p);
            k.isZero() || k.normalize();
            h.normal.copy(k)
        }
    },
    computeVertexNormals: function() {
        var b, c, d, e;
        if (this.__tmpVertices == void 0) {
            e = this.__tmpVertices =
                Array(this.vertices.length);
            b = 0;
            for (c = this.vertices.length; b < c; b++) e[b] = new THREE.Vector3;
            b = 0;
            for (c = this.faces.length; b < c; b++)
                if (d = this.faces[b], d instanceof THREE.Face3) d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
                else if (d instanceof THREE.Face4) d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
        } else {
            e = this.__tmpVertices;
            b = 0;
            for (c = this.vertices.length; b < c; b++) e[b].set(0, 0, 0)
        }
        b = 0;
        for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof
        THREE.Face3 ? (e[d.a].addSelf(d.normal), e[d.b].addSelf(d.normal), e[d.c].addSelf(d.normal)) : d instanceof THREE.Face4 && (e[d.a].addSelf(d.normal), e[d.b].addSelf(d.normal), e[d.c].addSelf(d.normal), e[d.d].addSelf(d.normal));
        b = 0;
        for (c = this.vertices.length; b < c; b++) e[b].normalize();
        b = 0;
        for (c = this.faces.length; b < c; b++) d = this.faces[b], d instanceof THREE.Face3 ? (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c])) : d instanceof THREE.Face4 && (d.vertexNormals[0].copy(e[d.a]),
            d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c]), d.vertexNormals[3].copy(e[d.d]))
    },
    computeTangents: function() {
        function b(b, f, c, d, e, h, i) {
            k = b.vertices[f].position;
            p = b.vertices[c].position;
            o = b.vertices[d].position;
            q = j[e];
            m = j[h];
            t = j[i];
            w = p.x - k.x;
            y = o.x - k.x;
            C = p.y - k.y;
            E = o.y - k.y;
            D = p.z - k.z;
            wa = o.z - k.z;
            xa = m.u - q.u;
            qa = t.u - q.u;
            sa = m.v - q.v;
            ja = t.v - q.v;
            G = 1 / (xa * ja - qa * sa);
            la.set((ja * w - sa * y) * G, (ja * C - sa * E) * G, (ja * D - sa * wa) * G);
            $.set((xa * y - qa * w) * G, (xa * E - qa * C) * G, (xa * wa - qa * D) * G);
            ka[f].addSelf(la);
            ka[c].addSelf(la);
            ka[d].addSelf(la);
            R[f].addSelf($);
            R[c].addSelf($);
            R[d].addSelf($)
        }
        var c, d, e, i, h, j, k, p, o, q, m, t, w, y, C, E, D, wa, xa, qa, sa, ja, G, r, ka = [],
            R = [],
            la = new THREE.Vector3,
            $ = new THREE.Vector3,
            ya = new THREE.Vector3,
            S = new THREE.Vector3,
            M = new THREE.Vector3;
        c = 0;
        for (d = this.vertices.length; c < d; c++) ka[c] = new THREE.Vector3, R[c] = new THREE.Vector3;
        c = 0;
        for (d = this.faces.length; c < d; c++) h = this.faces[c], j = this.faceVertexUvs[0][c], h instanceof THREE.Face3 ? b(this, h.a, h.b, h.c, 0, 1, 2) : h instanceof THREE.Face4 && (b(this, h.a, h.b, h.c, 0, 1,
            2), b(this, h.a, h.b, h.d, 0, 1, 3));
        var f = ["a", "b", "c", "d"];
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            h = this.faces[c];
            for (e = 0; e < h.vertexNormals.length; e++) M.copy(h.vertexNormals[e]), i = h[f[e]], r = ka[i], ya.copy(r), ya.subSelf(M.multiplyScalar(M.dot(r))).normalize(), S.cross(h.vertexNormals[e], r), i = S.dot(R[i]), i = i < 0 ? -1 : 1, h.vertexTangents[e] = new THREE.Vector4(ya.x, ya.y, ya.z, i)
        }
        this.hasTangents = !0
    },
    computeBoundingBox: function() {
        var b;
        if (this.vertices.length > 0) {
            this.boundingBox = {
                x: [this.vertices[0].position.x, this.vertices[0].position.x],
                y: [this.vertices[0].position.y, this.vertices[0].position.y],
                z: [this.vertices[0].position.z, this.vertices[0].position.z]
            };
            for (var c = 1, d = this.vertices.length; c < d; c++) {
                b = this.vertices[c];
                if (b.position.x < this.boundingBox.x[0]) this.boundingBox.x[0] = b.position.x;
                else if (b.position.x > this.boundingBox.x[1]) this.boundingBox.x[1] = b.position.x;
                if (b.position.y < this.boundingBox.y[0]) this.boundingBox.y[0] = b.position.y;
                else if (b.position.y > this.boundingBox.y[1]) this.boundingBox.y[1] = b.position.y;
                if (b.position.z <
                    this.boundingBox.z[0]) this.boundingBox.z[0] = b.position.z;
                else if (b.position.z > this.boundingBox.z[1]) this.boundingBox.z[1] = b.position.z
            }
        }
    },
    computeBoundingSphere: function() {
        for (var b = 0, c = 0, d = this.vertices.length; c < d; c++) b = Math.max(b, this.vertices[c].position.length());
        this.boundingSphere = {
            radius: b
        }
    },
    mergeVertices: function() {
        var b = {},
            c = [],
            d = [],
            e, i = Math.pow(10, 4),
            h, j;
        h = 0;
        for (j = this.vertices.length; h < j; h++) e = this.vertices[h].position, e = [Math.round(e.x * i), Math.round(e.y * i), Math.round(e.z * i)].join("_"),
            b[e] === void 0 ? (b[e] = h, c.push(this.vertices[h]), d[h] = c.length - 1) : d[h] = d[b[e]];
        h = 0;
        for (j = this.faces.length; h < j; h++) {
            b = this.faces[h];
            if (b instanceof THREE.Face3) b.a = d[b.a], b.b = d[b.b], b.c = d[b.c];
            if (b instanceof THREE.Face4) b.a = d[b.a], b.b = d[b.b], b.c = d[b.c], b.d = d[b.d]
        }
        this.vertices = c
    }
};
THREE.GeometryCount = 0;
THREE.Spline = function(b) {
    function c(b, c, d, e, h, i, j) {
        b = (d - b) * 0.5;
        e = (e - c) * 0.5;
        return (2 * (c - d) + b + e) * j + (-3 * (c - d) - 2 * b - e) * i + b * h + c
    }
    this.points = b;
    var d = [],
        e = {
            x: 0,
            y: 0,
            z: 0
        },
        i, h, j, k, p, o, q, m, t;
    this.initFromArray = function(b) {
        this.points = [];
        for (var c = 0; c < b.length; c++) this.points[c] = {
            x: b[c][0],
            y: b[c][1],
            z: b[c][2]
        }
    };
    this.getPoint = function(b) {
        i = (this.points.length - 1) * b;
        h = Math.floor(i);
        j = i - h;
        d[0] = h == 0 ? h : h - 1;
        d[1] = h;
        d[2] = h > this.points.length - 2 ? h : h + 1;
        d[3] = h > this.points.length - 3 ? h : h + 2;
        o = this.points[d[0]];
        q = this.points[d[1]];
        m = this.points[d[2]];
        t = this.points[d[3]];
        k = j * j;
        p = j * k;
        e.x = c(o.x, q.x, m.x, t.x, j, k, p);
        e.y = c(o.y, q.y, m.y, t.y, j, k, p);
        e.z = c(o.z, q.z, m.z, t.z, j, k, p);
        return e
    };
    this.getControlPointsArray = function() {
        var b, c, d = this.points.length,
            e = [];
        for (b = 0; b < d; b++) c = this.points[b], e[b] = [c.x, c.y, c.z];
        return e
    };
    this.getLength = function(b) {
        var c, d, e = c = c = 0,
            h = new THREE.Vector3,
            i = new THREE.Vector3,
            j = [],
            k = 0;
        j[0] = 0;
        b || (b = 100);
        d = this.points.length * b;
        h.copy(this.points[0]);
        for (b = 1; b < d; b++) c = b / d, position = this.getPoint(c), i.copy(position),
            k += i.distanceTo(h), h.copy(position), c *= this.points.length - 1, c = Math.floor(c), c != e && (j[c] = k, e = c);
        j[j.length] = k;
        return {
            chunks: j,
            total: k
        }
    };
    this.reparametrizeByArcLength = function(b) {
        var c, d, e, h, i, j, k = [],
            o = new THREE.Vector3,
            p = this.getLength();
        k.push(o.copy(this.points[0]).clone());
        for (c = 1; c < this.points.length; c++) {
            d = p.chunks[c] - p.chunks[c - 1];
            j = Math.ceil(b * d / p.total);
            h = (c - 1) / (this.points.length - 1);
            i = c / (this.points.length - 1);
            for (d = 1; d < j - 1; d++) e = h + d * (1 / j) * (i - h), position = this.getPoint(e), k.push(o.copy(position).clone());
            k.push(o.copy(this.points[c]).clone())
        }
        this.points = k
    }
};
THREE.Edge = function(b, c, d, e) {
    this.vertices = [b, c];
    this.vertexIndices = [d, e];
    this.faces = [];
    this.faceIndices = []
};
THREE.Camera = function() {
    if (arguments.length) return console.warn("DEPRECATED: Camera() is now PerspectiveCamera() or OrthographicCamera()."), new THREE.PerspectiveCamera(arguments[0], arguments[1], arguments[2], arguments[3]);
    THREE.Object3D.call(this);
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4
};
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.lookAt = function(b) {
    this.matrix.lookAt(this.position, b, this.up);
    this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
};
THREE.Camera.prototype.update = function(b, c, d) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (c || this.matrixWorldNeedsUpdate) b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, c = !0, THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    for (b = 0; b < this.children.length; b++) this.children[b].update(this.matrixWorld, c, d)
};
THREE.OrthographicCamera = function(b, c, d, e, i, h) {
    THREE.Camera.call(this);
    this.left = b;
    this.right = c;
    this.top = d;
    this.bottom = e;
    this.near = i !== void 0 ? i : 0.1;
    this.far = h !== void 0 ? h : 2E3;
    this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = new THREE.Camera;
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix = THREE.Matrix4.makeOrtho(this.left, this.right, this.top, this.bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function(b, c, d, e) {
    THREE.Camera.call(this);
    this.fov = b !== void 0 ? b : 50;
    this.aspect = c !== void 0 ? c : 1;
    this.near = d !== void 0 ? d : 0.1;
    this.far = e !== void 0 ? e : 2E3;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = new THREE.Camera;
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;
THREE.PerspectiveCamera.prototype.setLens = function(b, c) {
    this.fov = 2 * Math.atan((c !== void 0 ? c : 43.25) / (b * 2));
    this.fov *= 180 / Math.PI;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function(b, c, d, e, i, h) {
    this.fullWidth = b;
    this.fullHeight = c;
    this.x = d;
    this.y = e;
    this.width = i;
    this.height = h;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    if (this.fullWidth) {
        var b = this.fullWidth / this.fullHeight,
            c = Math.tan(this.fov * Math.PI / 360) * this.near,
            d = -c,
            e = b * d,
            b = Math.abs(b * c - e),
            d = Math.abs(c - d);
        this.projectionMatrix = THREE.Matrix4.makeFrustum(e + this.x * b / this.fullWidth, e + (this.x + this.width) * b / this.fullWidth, c - (this.y + this.height) * d / this.fullHeight, c - this.y * d / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near,
        this.far)
};
THREE.Light = function(b) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(b)
};
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function(b) {
    THREE.Light.call(this, b)
};
THREE.AmbientLight.prototype = new THREE.Light;
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function(b, c, d) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3(0, 1, 0);
    this.intensity = c !== void 0 ? c : 1;
    this.distance = d !== void 0 ? d : 0
};
THREE.DirectionalLight.prototype = new THREE.Light;
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function(b, c, d) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3(0, 0, 0);
    this.intensity = c !== void 0 ? c : 1;
    this.distance = d !== void 0 ? d : 0
};
THREE.PointLight.prototype = new THREE.Light;
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.SpotLight = function(b, c, d, e) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = c !== void 0 ? c : 1;
    this.distance = d !== void 0 ? d : 0;
    this.castShadow = e !== void 0 ? e : !1
};
THREE.SpotLight.prototype = new THREE.Light;
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.Material = function(b) {
    this.name = "";
    this.id = THREE.MaterialCount++;
    b = b || {};
    this.opacity = b.opacity !== void 0 ? b.opacity : 1;
    this.transparent = b.transparent !== void 0 ? b.transparent : !1;
    this.blending = b.blending !== void 0 ? b.blending : THREE.NormalBlending;
    this.depthTest = b.depthTest !== void 0 ? b.depthTest : !0;
    this.depthWrite = b.depthWrite !== void 0 ? b.depthWrite : !0;
    this.polygonOffset = b.polygonOffset !== void 0 ? b.polygonOffset : !1;
    this.polygonOffsetFactor = b.polygonOffsetFactor !== void 0 ? b.polygonOffsetFactor : 0;
    this.polygonOffsetUnits =
        b.polygonOffsetUnits !== void 0 ? b.polygonOffsetUnits : 0;
    this.alphaTest = b.alphaTest !== void 0 ? b.alphaTest : 0
};
THREE.MaterialCount = 0;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.LineBasicMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.linewidth = b.linewidth !== void 0 ? b.linewidth : 1;
    this.linecap = b.linecap !== void 0 ? b.linecap : "round";
    this.linejoin = b.linejoin !== void 0 ? b.linejoin : "round";
    this.vertexColors = b.vertexColors ? b.vertexColors : !1;
    this.fog = b.fog !== void 0 ? b.fog : !0
};
THREE.LineBasicMaterial.prototype = new THREE.Material;
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== void 0 ? b.map : null;
    this.lightMap = b.lightMap !== void 0 ? b.lightMap : null;
    this.envMap = b.envMap !== void 0 ? b.envMap : null;
    this.combine = b.combine !== void 0 ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== void 0 ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== void 0 ? b.refractionRatio : 0.98;
    this.fog = b.fog !== void 0 ? b.fog :
        !0;
    this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== void 0 ? b.wireframeLinecap : "round";
    this.wireframeLinejoin = b.wireframeLinejoin !== void 0 ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
    this.skinning = b.skinning !== void 0 ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets :
        !1
};
THREE.MeshBasicMaterial.prototype = new THREE.Material;
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== void 0 ? b.map : null;
    this.lightMap = b.lightMap !== void 0 ? b.lightMap : null;
    this.envMap = b.envMap !== void 0 ? b.envMap : null;
    this.combine = b.combine !== void 0 ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== void 0 ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== void 0 ? b.refractionRatio : 0.98;
    this.fog = b.fog !== void 0 ?
        b.fog : !0;
    this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== void 0 ? b.wireframeLinecap : "round";
    this.wireframeLinejoin = b.wireframeLinejoin !== void 0 ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
    this.skinning = b.skinning !== void 0 ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== void 0 ?
        b.morphTargets : !1
};
THREE.MeshLambertMaterial.prototype = new THREE.Material;
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.ambient = b.ambient !== void 0 ? new THREE.Color(b.ambient) : new THREE.Color(328965);
    this.specular = b.specular !== void 0 ? new THREE.Color(b.specular) : new THREE.Color(1118481);
    this.shininess = b.shininess !== void 0 ? b.shininess : 30;
    this.map = b.map !== void 0 ? b.map : null;
    this.lightMap = b.lightMap !== void 0 ? b.lightMap : null;
    this.envMap = b.envMap !== void 0 ? b.envMap : null;
    this.combine = b.combine !== void 0 ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== void 0 ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== void 0 ? b.refractionRatio : 0.98;
    this.fog = b.fog !== void 0 ? b.fog : !0;
    this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== void 0 ? b.wireframeLinecap : "round";
    this.wireframeLinejoin =
        b.wireframeLinejoin !== void 0 ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
    this.skinning = b.skinning !== void 0 ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets : !1
};
THREE.MeshPhongMaterial.prototype = new THREE.Material;
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1
};
THREE.MeshDepthMaterial.prototype = new THREE.Material;
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.shading = b.shading ? b.shading : THREE.FlatShading;
    this.wireframe = b.wireframe ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth ? b.wireframeLinewidth : 1
};
THREE.MeshNormalMaterial.prototype = new THREE.Material;
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function() {};
THREE.MeshShaderMaterial = function(b) {
    console.warn("DEPRECATED: MeshShaderMaterial() is now ShaderMaterial().");
    return new THREE.ShaderMaterial(b)
};
THREE.ParticleBasicMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== void 0 ? b.map : null;
    this.size = b.size !== void 0 ? b.size : 1;
    this.sizeAttenuation = b.sizeAttenuation !== void 0 ? b.sizeAttenuation : !0;
    this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
    this.fog = b.fog !== void 0 ? b.fog : !0
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material;
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ShaderMaterial = function(b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.fragmentShader = b.fragmentShader !== void 0 ? b.fragmentShader : "void main() {}";
    this.vertexShader = b.vertexShader !== void 0 ? b.vertexShader : "void main() {}";
    this.uniforms = b.uniforms !== void 0 ? b.uniforms : {};
    this.attributes = b.attributes;
    this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
    this.fog = b.fog !==
        void 0 ? b.fog : !1;
    this.lights = b.lights !== void 0 ? b.lights : !1;
    this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
    this.skinning = b.skinning !== void 0 ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets : !1
};
THREE.ShaderMaterial.prototype = new THREE.Material;
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
THREE.Texture = function(b, c, d, e, i, h) {
    this.id = THREE.TextureCount++;
    this.image = b;
    this.mapping = c !== void 0 ? c : new THREE.UVMapping;
    this.wrapS = d !== void 0 ? d : THREE.ClampToEdgeWrapping;
    this.wrapT = e !== void 0 ? e : THREE.ClampToEdgeWrapping;
    this.magFilter = i !== void 0 ? i : THREE.LinearFilter;
    this.minFilter = h !== void 0 ? h : THREE.LinearMipMapLinearFilter;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.needsUpdate = !1
};
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function() {
        var b = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
        b.offset.copy(this.offset);
        b.repeat.copy(this.repeat);
        return b
    }
};
THREE.TextureCount = 0;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.CubeReflectionMapping = function() {};
THREE.CubeRefractionMapping = function() {};
THREE.LatitudeReflectionMapping = function() {};
THREE.LatitudeRefractionMapping = function() {};
THREE.SphericalReflectionMapping = function() {};
THREE.SphericalRefractionMapping = function() {};
THREE.UVMapping = function() {};
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.DataTexture = function(b, c, d, e, i, h, j, k, p) {
    THREE.Texture.call(this, null, i, h, j, k, p);
    this.image = {
        data: b,
        width: c,
        height: d
    };
    this.format = e !== void 0 ? e : THREE.RGBAFormat
};
THREE.DataTexture.prototype = new THREE.Texture;
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.DataTexture.prototype.clone = function() {
    var b = new THREE.DataTexture(this.data.slice(0), this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
    b.offset.copy(this.offset);
    b.repeat.copy(this.repeat);
    return b
};
THREE.Particle = function(b) {
    THREE.Object3D.call(this);
    this.materials = b instanceof Array ? b : [b]
};
THREE.Particle.prototype = new THREE.Object3D;
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function(b, c) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = c instanceof Array ? c : [c];
    this.sortParticles = !1
};
THREE.ParticleSystem.prototype = new THREE.Object3D;
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function(b, c, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = c instanceof Array ? c : [c];
    this.type = d != void 0 ? d : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function(b, c) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = c && c.length ? c : [c];
    this.overdraw = !1;
    if (this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = b.boundingSphere.radius, this.geometry.morphTargets.length)) {
        this.morphTargetBase = -1;
        this.morphTargetForcedOrder = [];
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var d = 0; d < this.geometry.morphTargets.length; d++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[d].name] =
            d
    }
};
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function(b) {
    if (this.morphTargetDictionary[b] !== void 0) return this.morphTargetDictionary[b];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + b + " does not exist. Returning 0.");
    return 0
};
THREE.Bone = function(b) {
    THREE.Object3D.call(this);
    this.skin = b;
    this.skinMatrix = new THREE.Matrix4;
    this.hasNoneBoneChildren = !1
};
THREE.Bone.prototype = new THREE.Object3D;
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function(b, c, d) {
    this.matrixAutoUpdate && (c |= this.updateMatrix());
    if (c || this.matrixWorldNeedsUpdate) b ? this.skinMatrix.multiply(b, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, c = !0;
    var e, i = this.children.length;
    if (this.hasNoneBoneChildren) {
        this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
        for (e = 0; e < i; e++) b = this.children[e], b instanceof THREE.Bone ? b.update(this.skinMatrix, c, d) : b.update(this.matrixWorld, !0, d)
    } else
        for (e = 0; e < i; e++) this.children[e].update(this.skinMatrix,
            c, d)
};
THREE.Bone.prototype.addChild = function(b) {
    if (this.children.indexOf(b) === -1 && (b.parent !== void 0 && b.parent.removeChild(b), b.parent = this, this.children.push(b), !(b instanceof THREE.Bone))) this.hasNoneBoneChildren = !0
};
THREE.SkinnedMesh = function(b, c) {
    THREE.Mesh.call(this, b, c);
    this.identityMatrix = new THREE.Matrix4;
    this.bones = [];
    this.boneMatrices = [];
    var d, e, i, h, j, k;
    if (this.geometry.bones !== void 0) {
        for (d = 0; d < this.geometry.bones.length; d++) i = this.geometry.bones[d], h = i.pos, j = i.rotq, k = i.scl, e = this.addBone(), e.name = i.name, e.position.set(h[0], h[1], h[2]), e.quaternion.set(j[0], j[1], j[2], j[3]), e.useQuaternion = !0, k !== void 0 ? e.scale.set(k[0], k[1], k[2]) : e.scale.set(1, 1, 1);
        for (d = 0; d < this.bones.length; d++) i = this.geometry.bones[d],
            e = this.bones[d], i.parent === -1 ? this.addChild(e) : this.bones[i.parent].addChild(e);
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        this.pose()
    }
};
THREE.SkinnedMesh.prototype = new THREE.Mesh;
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update = function(b, c, d) {
    if (this.visible) {
        this.matrixAutoUpdate && (c |= this.updateMatrix());
        if (c || this.matrixWorldNeedsUpdate) b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, c = !0;
        var e, i = this.children.length;
        for (e = 0; e < i; e++) b = this.children[e], b instanceof THREE.Bone ? b.update(this.identityMatrix, !1, d) : b.update(this.matrixWorld, c, d);
        d = this.bones.length;
        ba = this.bones;
        bm = this.boneMatrices;
        for (c = 0; c < d; c++) ba[c].skinMatrix.flattenToArrayOffset(bm,
            c * 16)
    }
};
THREE.SkinnedMesh.prototype.addBone = function(b) {
    b === void 0 && (b = new THREE.Bone(this));
    this.bones.push(b);
    return b
};
THREE.SkinnedMesh.prototype.pose = function() {
    this.update(void 0, !0);
    for (var b, c = [], d = 0; d < this.bones.length; d++) b = this.bones[d], c.push(THREE.Matrix4.makeInvert(b.skinMatrix)), b.skinMatrix.flattenToArrayOffset(this.boneMatrices, d * 16);
    if (this.geometry.skinVerticesA === void 0) {
        this.geometry.skinVerticesA = [];
        this.geometry.skinVerticesB = [];
        var e;
        for (b = 0; b < this.geometry.skinIndices.length; b++) {
            var d = this.geometry.vertices[b].position,
                i = this.geometry.skinIndices[b].x,
                h = this.geometry.skinIndices[b].y;
            e = new THREE.Vector3(d.x,
                d.y, d.z);
            this.geometry.skinVerticesA.push(c[i].multiplyVector3(e));
            e = new THREE.Vector3(d.x, d.y, d.z);
            this.geometry.skinVerticesB.push(c[h].multiplyVector3(e));
            this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y !== 1 && (d = (1 - (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y)) * 0.5, this.geometry.skinWeights[b].x += d, this.geometry.skinWeights[b].y += d)
        }
    }
};
THREE.Ribbon = function(b, c) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = c instanceof Array ? c : [c]
};
THREE.Ribbon.prototype = new THREE.Object3D;
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.LOD = function() {
    THREE.Object3D.call(this);
    this.LODs = []
};
THREE.LOD.prototype = new THREE.Object3D;
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.addLevel = function(b, c) {
    c === void 0 && (c = 0);
    for (var c = Math.abs(c), d = 0; d < this.LODs.length; d++)
        if (c < this.LODs[d].visibleAtDistance) break;
    this.LODs.splice(d, 0, {
        visibleAtDistance: c,
        object3D: b
    });
    this.add(b)
};
THREE.LOD.prototype.update = function(b, c, d) {
    this.matrixAutoUpdate && (c |= this.updateMatrix());
    if (c || this.matrixWorldNeedsUpdate) b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, c = !0;
    if (this.LODs.length > 1) {
        b = d.matrixWorldInverse;
        b = -(b.n31 * this.position.x + b.n32 * this.position.y + b.n33 * this.position.z + b.n34);
        this.LODs[0].object3D.visible = !0;
        for (var e = 1; e < this.LODs.length; e++)
            if (b >= this.LODs[e].visibleAtDistance) this.LODs[e - 1].object3D.visible = !1,
                this.LODs[e].object3D.visible = !0;
            else break;
        for (; e < this.LODs.length; e++) this.LODs[e].object3D.visible = !1
    }
    for (b = 0; b < this.children.length; b++) this.children[b].update(this.matrixWorld, c, d)
};
THREE.Sprite = function(b) {
    THREE.Object3D.call(this);
    this.color = b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map instanceof THREE.Texture ? b.map : THREE.ImageUtils.loadTexture(b.map);
    this.blending = b.blending !== void 0 ? b.blending : THREE.NormalBlending;
    this.useScreenCoordinates = b.useScreenCoordinates !== void 0 ? b.useScreenCoordinates : !0;
    this.mergeWith3D = b.mergeWith3D !== void 0 ? b.mergeWith3D : !this.useScreenCoordinates;
    this.affectedByDistance = b.affectedByDistance !== void 0 ? b.affectedByDistance :
        !this.useScreenCoordinates;
    this.scaleByViewport = b.scaleByViewport !== void 0 ? b.scaleByViewport : !this.affectedByDistance;
    this.alignment = b.alignment instanceof THREE.Vector2 ? b.alignment : THREE.SpriteAlignment.center;
    this.rotation3d = this.rotation;
    this.rotation = 0;
    this.opacity = 1;
    this.uvOffset = new THREE.Vector2(0, 0);
    this.uvScale = new THREE.Vector2(1, 1)
};
THREE.Sprite.prototype = new THREE.Object3D;
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.supr = THREE.Object3D.prototype;
THREE.Sprite.prototype.updateMatrix = function() {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    if (this.scale.x !== 1 || this.scale.y !== 1) this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, this.scale.y);
    this.matrixWorldNeedsUpdate = !0
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function() {
    THREE.Object3D.call(this);
    this.fog = null;
    this.matrixAutoUpdate = !1;
    this.collisions = this.overrideMaterial = null;
    this.objects = [];
    this.lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.add = function(b) {
    this.supr.add.call(this, b);
    this.addChildRecurse(b)
};
THREE.Scene.prototype.addChildRecurse = function(b) {
    if (b instanceof THREE.Light) this.lights.indexOf(b) === -1 && this.lights.push(b);
    else if (!(b instanceof THREE.Camera || b instanceof THREE.Bone) && this.objects.indexOf(b) === -1) {
        this.objects.push(b);
        this.__objectsAdded.push(b);
        var c = this.__objectsRemoved.indexOf(b);
        c !== -1 && this.__objectsRemoved.splice(c, 1)
    }
    for (c = 0; c < b.children.length; c++) this.addChildRecurse(b.children[c])
};
THREE.Scene.prototype.remove = function(b) {
    this.supr.remove.call(this, b);
    this.removeChildRecurse(b)
};
THREE.Scene.prototype.removeChildRecurse = function(b) {
    if (b instanceof THREE.Light) {
        var c = this.lights.indexOf(b);
        c !== -1 && this.lights.splice(c, 1)
    } else b instanceof THREE.Camera || (c = this.objects.indexOf(b), c !== -1 && (this.objects.splice(c, 1), this.__objectsRemoved.push(b), c = this.__objectsAdded.indexOf(b), c !== -1 && this.__objectsAdded.splice(c, 1)));
    for (c = 0; c < b.children.length; c++) this.removeChildRecurse(b.children[c])
};
THREE.Scene.prototype.addChild = function(b) {
    console.warn("DEPRECATED: Scene.addChild() is now Scene.add().");
    this.add(b)
};
THREE.Scene.prototype.addObject = function(b) {
    console.warn("DEPRECATED: Scene.addObject() is now Scene.add().");
    this.add(b)
};
THREE.Scene.prototype.addLight = function(b) {
    console.warn("DEPRECATED: Scene.addLight() is now Scene.add().");
    this.add(b)
};
THREE.Scene.prototype.removeChild = function(b) {
    console.warn("DEPRECATED: Scene.removeChild() is now Scene.remove().");
    this.remove(b)
};
THREE.Scene.prototype.removeObject = function(b) {
    console.warn("DEPRECATED: Scene.removeObject() is now Scene.remove().");
    this.remove(b)
};
THREE.Scene.prototype.removeLight = function(b) {
    console.warn("DEPRECATED: Scene.removeLight() is now Scene.remove().");
    this.remove(b)
};
THREE.Fog = function(b, c, d) {
    this.color = new THREE.Color(b);
    this.near = c !== void 0 ? c : 1;
    this.far = d !== void 0 ? d : 1E3
};
THREE.FogExp2 = function(b, c) {
    this.color = new THREE.Color(b);
    this.density = c !== void 0 ? c : 2.5E-4
};
THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_pars_vertex: "uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif",
    lights_vertex: "if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n}\n#endif\n}",
    lights_phong_pars_vertex: "#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif",
    lights_phong_vertex: "#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif",
    lights_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + viewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * pointDistance;\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + viewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight;\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * totalDiffuse + totalSpecular + ambientLightColor * ambient;",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\nvColor = color;\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform float shadowDarkness;\nuniform float shadowBias;\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_SOFT\nconst float xPixelOffset = 1.0 / SHADOWMAP_WIDTH;\nconst float yPixelOffset = 1.0 / SHADOWMAP_HEIGHT;\n#endif\nvec4 shadowColor = vec4( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nshadowCoord.z += shadowBias;\nif ( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nfor ( float y = -1.25; y <= 1.25; y += 1.25 )\nfor ( float x = -1.25; x <= 1.25; x += 1.25 ) {\nvec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadow += 1.0;\n}\nshadow /= 9.0;\nshadowColor = shadowColor * vec4( vec3( ( 1.0 - shadowDarkness * shadow ) ), 1.0 );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec4( vec3( shadowDarkness ), 1.0 );\n#endif\n}\n}\ngl_FragColor = gl_FragColor * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif"
};
THREE.UniformsUtils = {
    merge: function(b) {
        var c, d, e, i = {};
        for (c = 0; c < b.length; c++)
            for (d in e = this.clone(b[c]), e) i[d] = e[d];
        return i
    },
    clone: function(b) {
        var c, d, e, i = {};
        for (c in b)
            for (d in i[c] = {}, b[c]) e = b[c][d], i[c][d] = e instanceof THREE.Color || e instanceof THREE.Vector2 || e instanceof THREE.Vector3 || e instanceof THREE.Vector4 || e instanceof THREE.Matrix4 || e instanceof THREE.Texture ? e.clone() : e instanceof Array ? e.slice() : e;
        return i
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: 0.98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        enableLighting: {
            type: "i",
            value: 1
        },
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: 6,
            texture: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        },
        shadowBias: {
            type: "f",
            value: 0.0039
        },
        shadowDarkness: {
            type: "f",
            value: 0.2
        }
    }
};
THREE.ShaderLib = {
    sprite: {
        vertexShader: "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex,
            THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment,
            THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap]),
        vertexShader: ["varying vec3 vLightWeighting;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex,
            THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "vec3 transformedNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment,
            "gl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(328965)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            }
        }]),
        vertexShader: ["varying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex,
            THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;", THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;",
            THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lights_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment,
            THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"
        ].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
            THREE.ShaderChunk.shadowmap_vertex, "}"
        ].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment,
            "}"
        ].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
};
THREE.WebGLRenderer = function(b) {
    function c(b, c, d) {
        var e, h, i, j = b.vertices,
            L = j.length,
            z = b.colors,
            k = z.length,
            o = b.__vertexArray,
            p = b.__colorArray,
            q = b.__sortArray,
            v = b.__dirtyVertices,
            m = b.__dirtyColors,
            t = b.__webglCustomAttributes,
            u, r;
        if (t)
            for (u in t) t[u].offset = 0;
        if (d.sortParticles) {
            Fa.multiplySelf(d.matrixWorld);
            for (e = 0; e < L; e++) h = j[e].position, Ja.copy(h), Fa.multiplyVector3(Ja), q[e] = [Ja.z, e];
            q.sort(function(b, c) {
                return c[0] - b[0]
            });
            for (e = 0; e < L; e++) h = j[q[e][1]].position, i = e * 3, o[i] = h.x, o[i + 1] = h.y, o[i + 2] = h.z;
            for (e = 0; e < k; e++) i = e * 3, color = z[q[e][1]], p[i] = color.r, p[i + 1] = color.g, p[i + 2] = color.b;
            if (t)
                for (u in t) {
                    e = t[u];
                    z = e.value.length;
                    for (i = 0; i < z; i++) {
                        index = q[i][1];
                        k = e.offset;
                        if (e.size === 1) {
                            if (e.boundTo === void 0 || e.boundTo === "vertices") e.array[k] = e.value[index]
                        } else {
                            if (e.boundTo === void 0 || e.boundTo === "vertices") r = e.value[index];
                            e.size === 2 ? (e.array[k] = r.x, e.array[k + 1] = r.y) : e.size === 3 ? e.type === "c" ? (e.array[k] = r.r, e.array[k + 1] = r.g, e.array[k + 2] = r.b) : (e.array[k] = r.x, e.array[k + 1] = r.y, e.array[k + 2] = r.z) : (e.array[k] =
                                r.x, e.array[k + 1] = r.y, e.array[k + 2] = r.z, e.array[k + 3] = r.w)
                        }
                        e.offset += e.size
                    }
                }
        } else {
            if (v)
                for (e = 0; e < L; e++) h = j[e].position, i = e * 3, o[i] = h.x, o[i + 1] = h.y, o[i + 2] = h.z;
            if (m)
                for (e = 0; e < k; e++) color = z[e], i = e * 3, p[i] = color.r, p[i + 1] = color.g, p[i + 2] = color.b;
            if (t)
                for (u in t)
                    if (e = t[u], e.__original.needsUpdate) {
                        z = e.value.length;
                        for (i = 0; i < z; i++) {
                            k = e.offset;
                            if (e.size === 1) {
                                if (e.boundTo === void 0 || e.boundTo === "vertices") e.array[k] = e.value[i]
                            } else {
                                if (e.boundTo === void 0 || e.boundTo === "vertices") r = e.value[i];
                                e.size === 2 ? (e.array[k] =
                                    r.x, e.array[k + 1] = r.y) : e.size === 3 ? e.type === "c" ? (e.array[k] = r.r, e.array[k + 1] = r.g, e.array[k + 2] = r.b) : (e.array[k] = r.x, e.array[k + 1] = r.y, e.array[k + 2] = r.z) : (e.array[k] = r.x, e.array[k + 1] = r.y, e.array[k + 2] = r.z, e.array[k + 3] = r.w)
                            }
                            e.offset += e.size
                        }
                    }
        }
        if (v || d.sortParticles) f.bindBuffer(f.ARRAY_BUFFER, b.__webglVertexBuffer), f.bufferData(f.ARRAY_BUFFER, o, c);
        if (m || d.sortParticles) f.bindBuffer(f.ARRAY_BUFFER, b.__webglColorBuffer), f.bufferData(f.ARRAY_BUFFER, p, c);
        if (t)
            for (u in t)
                if (e = t[u], e.__original.needsUpdate || d.sortParticles) f.bindBuffer(f.ARRAY_BUFFER,
                    e.buffer), f.bufferData(f.ARRAY_BUFFER, e.array, c)
    }

    function d(b, c, d, e, h) {
        e.program || M.initMaterial(e, c, d, h);
        if (e.morphTargets && !h.__webglMorphTargetInfluences) {
            h.__webglMorphTargetInfluences = new Float32Array(M.maxMorphTargets);
            for (var i = 0, j = M.maxMorphTargets; i < j; i++) h.__webglMorphTargetInfluences[i] = 0
        }
        var k = !1,
            i = e.program,
            j = i.uniforms,
            z = e.uniforms;
        i != Wa && (f.useProgram(i), Wa = i, k = !0);
        if (e.id != N) N = e.id, k = !0;
        if (k) {
            f.uniformMatrix4fv(j.projectionMatrix, !1, Ta);
            if (d && e.fog)
                if (z.fogColor.value = d.color, d instanceof THREE.Fog) z.fogNear.value = d.near, z.fogFar.value = d.far;
                else if (d instanceof THREE.FogExp2) z.fogDensity.value = d.density;
            if (e instanceof THREE.MeshPhongMaterial || e instanceof THREE.MeshLambertMaterial || e.lights) {
                for (var o, p, q = 0, m = 0, v = 0, t, u, w, y = Ya, F = y.directional.colors, C = y.directional.positions, A = y.point.colors, D = y.point.positions, E = y.point.distances, G = 0, K = 0, d = o = w = 0, k = c.length; d < k; d++)
                    if (o = c[d], p = o.color, t = o.position, u = o.intensity, w = o.distance, o instanceof THREE.AmbientLight) q += p.r, m += p.g, v += p.b;
                    else if (o instanceof THREE.DirectionalLight) w = G * 3, F[w] = p.r * u, F[w + 1] = p.g * u, F[w + 2] = p.b * u, C[w] = t.x, C[w + 1] = t.y, C[w + 2] = t.z, G += 1;
                else if (o instanceof THREE.SpotLight) w = G * 3, F[w] = p.r * u, F[w + 1] = p.g * u, F[w + 2] = p.b * u, p = 1 / t.length(), C[w] = t.x * p, C[w + 1] = t.y * p, C[w + 2] = t.z * p, G += 1;
                else if (o instanceof THREE.PointLight) o = K * 3, A[o] = p.r * u, A[o + 1] = p.g * u, A[o + 2] = p.b * u, D[o] = t.x, D[o + 1] = t.y, D[o + 2] = t.z, E[K] = w, K += 1;
                d = G * 3;
                for (k = F.length; d < k; d++) F[d] = 0;
                d = K * 3;
                for (k = A.length; d < k; d++) A[d] = 0;
                y.point.length = K;
                y.directional.length = G;
                y.ambient[0] = q;
                y.ambient[1] =
                    m;
                y.ambient[2] = v;
                c = Ya;
                z.enableLighting.value = c.directional.length + c.point.length;
                z.ambientLightColor.value = c.ambient;
                z.directionalLightColor.value = c.directional.colors;
                z.directionalLightDirection.value = c.directional.positions;
                z.pointLightColor.value = c.point.colors;
                z.pointLightPosition.value = c.point.positions;
                z.pointLightDistance.value = c.point.distances
            }
            if (e instanceof THREE.MeshBasicMaterial || e instanceof THREE.MeshLambertMaterial || e instanceof THREE.MeshPhongMaterial) z.diffuse.value = e.color, z.opacity.value =
                e.opacity, (z.map.texture = e.map) && z.offsetRepeat.value.set(e.map.offset.x, e.map.offset.y, e.map.repeat.x, e.map.repeat.y), z.lightMap.texture = e.lightMap, z.envMap.texture = e.envMap, z.reflectivity.value = e.reflectivity, z.refractionRatio.value = e.refractionRatio, z.combine.value = e.combine, z.useRefract.value = e.envMap && e.envMap.mapping instanceof THREE.CubeRefractionMapping;
            if (e instanceof THREE.LineBasicMaterial) z.diffuse.value = e.color, z.opacity.value = e.opacity;
            else if (e instanceof THREE.ParticleBasicMaterial) z.psColor.value =
                e.color, z.opacity.value = e.opacity, z.size.value = e.size, z.scale.value = Ca.height / 2, z.map.texture = e.map;
            else if (e instanceof THREE.MeshPhongMaterial) z.ambient.value = e.ambient, z.specular.value = e.specular, z.shininess.value = e.shininess;
            else if (e instanceof THREE.MeshDepthMaterial) z.mNear.value = b.near, z.mFar.value = b.far, z.opacity.value = e.opacity;
            else if (e instanceof THREE.MeshNormalMaterial) z.opacity.value = e.opacity;
            if (h.receiveShadow && !e._shadowPass && z.shadowMatrix) {
                for (c = 0; c < Sa.length; c++) z.shadowMatrix.value[c] =
                    Sa[c], z.shadowMap.texture[c] = M.shadowMap[c];
                z.shadowDarkness.value = M.shadowMapDarkness;
                z.shadowBias.value = M.shadowMapBias
            }
            c = e.uniformsList;
            z = 0;
            for (d = c.length; z < d; z++)
                if (m = i.uniforms[c[z][1]])
                    if (q = c[z][0], v = q.type, k = q.value, v == "i") f.uniform1i(m, k);
                    else if (v == "f") f.uniform1f(m, k);
            else if (v == "v2") f.uniform2f(m, k.x, k.y);
            else if (v == "v3") f.uniform3f(m, k.x, k.y, k.z);
            else if (v == "v4") f.uniform4f(m, k.x, k.y, k.z, k.w);
            else if (v == "c") f.uniform3f(m, k.r, k.g, k.b);
            else if (v == "fv1") f.uniform1fv(m, k);
            else if (v == "fv") f.uniform3fv(m,
                k);
            else if (v == "v3v") {
                if (!q._array) q._array = new Float32Array(3 * k.length);
                v = 0;
                for (t = k.length; v < t; v++) y = v * 3, q._array[y] = k[v].x, q._array[y + 1] = k[v].y, q._array[y + 2] = k[v].z;
                f.uniform3fv(m, q._array)
            } else if (v == "m4") {
                if (!q._array) q._array = new Float32Array(16);
                k.flattenToArray(q._array);
                f.uniformMatrix4fv(m, !1, q._array)
            } else if (v == "m4v") {
                if (!q._array) q._array = new Float32Array(16 * k.length);
                v = 0;
                for (t = k.length; v < t; v++) k[v].flattenToArrayOffset(q._array, v * 16);
                f.uniformMatrix4fv(m, !1, q._array)
            } else if (v == "t") {
                if (f.uniform1i(m,
                        k), m = q.texture)
                    if (m.image instanceof Array && m.image.length == 6) {
                        if (q = m, q.image.length == 6)
                            if (q.needsUpdate) {
                                if (!q.image.__webglTextureCube) q.image.__webglTextureCube = f.createTexture();
                                f.activeTexture(f.TEXTURE0 + k);
                                f.bindTexture(f.TEXTURE_CUBE_MAP, q.image.__webglTextureCube);
                                for (k = 0; k < 6; k++) f.texImage2D(f.TEXTURE_CUBE_MAP_POSITIVE_X + k, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, q.image[k]);
                                r(f.TEXTURE_CUBE_MAP, q, q.image[0]);
                                q.needsUpdate = !1
                            } else f.activeTexture(f.TEXTURE0 + k), f.bindTexture(f.TEXTURE_CUBE_MAP, q.image.__webglTextureCube)
                    } else m instanceof
                THREE.WebGLRenderTargetCube ? (q = m, f.activeTexture(f.TEXTURE0 + k), f.bindTexture(f.TEXTURE_CUBE_MAP, q.__webglTexture)) : ka(m, k)
            } else if (v == "tv") {
                if (!q._array) {
                    q._array = [];
                    v = 0;
                    for (t = q.texture.length; v < t; v++) q._array[v] = k + v
                }
                f.uniform1iv(m, q._array);
                v = 0;
                for (t = q.texture.length; v < t; v++)(m = q.texture[v]) && ka(m, q._array[v])
            }(e instanceof THREE.ShaderMaterial || e instanceof THREE.MeshPhongMaterial || e.envMap) && j.cameraPosition !== null && f.uniform3f(j.cameraPosition, b.position.x, b.position.y, b.position.z);
            (e instanceof THREE.MeshPhongMaterial || e instanceof THREE.MeshLambertMaterial || e instanceof THREE.ShaderMaterial || e.skinning) && j.viewMatrix !== null && f.uniformMatrix4fv(j.viewMatrix, !1, Ua);
            e.skinning && (f.uniformMatrix4fv(j.cameraInverseMatrix, !1, Ua), f.uniformMatrix4fv(j.boneGlobalMatrices, !1, h.boneMatrices))
        }
        f.uniformMatrix4fv(j.modelViewMatrix, !1, h._modelViewMatrixArray);
        j.normalMatrix && f.uniformMatrix3fv(j.normalMatrix, !1, h._normalMatrixArray);
        (e instanceof THREE.ShaderMaterial || e.envMap || e.skinning || h.receiveShadow) &&
        j.objectMatrix !== null && f.uniformMatrix4fv(j.objectMatrix, !1, h._objectMatrixArray);
        return i
    }

    function e(b, c, e, h, i, j) {
        if (h.opacity != 0) {
            var k, e = d(b, c, e, h, j),
                b = e.attributes,
                c = !1,
                e = i.id * 16777215 + e.id;
            e != T && (T = e, c = !0);
            if (!h.morphTargets && b.position >= 0) c && (f.bindBuffer(f.ARRAY_BUFFER, i.__webglVertexBuffer), f.vertexAttribPointer(b.position, 3, f.FLOAT, !1, 0, 0));
            else if (j.morphTargetBase) {
                e = h.program.attributes;
                j.morphTargetBase !== -1 ? (f.bindBuffer(f.ARRAY_BUFFER, i.__webglMorphTargetsBuffers[j.morphTargetBase]),
                    f.vertexAttribPointer(e.position, 3, f.FLOAT, !1, 0, 0)) : e.position >= 0 && (f.bindBuffer(f.ARRAY_BUFFER, i.__webglVertexBuffer), f.vertexAttribPointer(e.position, 3, f.FLOAT, !1, 0, 0));
                if (j.morphTargetForcedOrder.length)
                    for (var o = 0, z = j.morphTargetForcedOrder, q = j.morphTargetInfluences; o < h.numSupportedMorphTargets && o < z.length;) f.bindBuffer(f.ARRAY_BUFFER, i.__webglMorphTargetsBuffers[z[o]]), f.vertexAttribPointer(e["morphTarget" + o], 3, f.FLOAT, !1, 0, 0), j.__webglMorphTargetInfluences[o] = q[z[o]], o++;
                else {
                    var z = [],
                        p = -1,
                        m = 0,
                        q = j.morphTargetInfluences,
                        t, v = q.length,
                        o = 0;
                    for (j.morphTargetBase !== -1 && (z[j.morphTargetBase] = !0); o < h.numSupportedMorphTargets;) {
                        for (t = 0; t < v; t++) !z[t] && q[t] > p && (m = t, p = q[m]);
                        f.bindBuffer(f.ARRAY_BUFFER, i.__webglMorphTargetsBuffers[m]);
                        f.vertexAttribPointer(e["morphTarget" + o], 3, f.FLOAT, !1, 0, 0);
                        j.__webglMorphTargetInfluences[o] = p;
                        z[m] = 1;
                        p = -1;
                        o++
                    }
                }
                h.program.uniforms.morphTargetInfluences !== null && f.uniform1fv(h.program.uniforms.morphTargetInfluences, j.__webglMorphTargetInfluences)
            }
            if (c) {
                if (i.__webglCustomAttributes)
                    for (k in i.__webglCustomAttributes) b[k] >=
                        0 && (e = i.__webglCustomAttributes[k], f.bindBuffer(f.ARRAY_BUFFER, e.buffer), f.vertexAttribPointer(b[k], e.size, f.FLOAT, !1, 0, 0));
                b.color >= 0 && (f.bindBuffer(f.ARRAY_BUFFER, i.__webglColorBuffer), f.vertexAttribPointer(b.color, 3, f.FLOAT, !1, 0, 0));
                b.normal >= 0 && (f.bindBuffer(f.ARRAY_BUFFER, i.__webglNormalBuffer), f.vertexAttribPointer(b.normal, 3, f.FLOAT, !1, 0, 0));
                b.tangent >= 0 && (f.bindBuffer(f.ARRAY_BUFFER, i.__webglTangentBuffer), f.vertexAttribPointer(b.tangent, 4, f.FLOAT, !1, 0, 0));
                b.uv >= 0 && (i.__webglUVBuffer ? (f.bindBuffer(f.ARRAY_BUFFER,
                    i.__webglUVBuffer), f.vertexAttribPointer(b.uv, 2, f.FLOAT, !1, 0, 0), f.enableVertexAttribArray(b.uv)) : f.disableVertexAttribArray(b.uv));
                b.uv2 >= 0 && (i.__webglUV2Buffer ? (f.bindBuffer(f.ARRAY_BUFFER, i.__webglUV2Buffer), f.vertexAttribPointer(b.uv2, 2, f.FLOAT, !1, 0, 0), f.enableVertexAttribArray(b.uv2)) : f.disableVertexAttribArray(b.uv2));
                h.skinning && b.skinVertexA >= 0 && b.skinVertexB >= 0 && b.skinIndex >= 0 && b.skinWeight >= 0 && (f.bindBuffer(f.ARRAY_BUFFER, i.__webglSkinVertexABuffer), f.vertexAttribPointer(b.skinVertexA, 4,
                    f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, i.__webglSkinVertexBBuffer), f.vertexAttribPointer(b.skinVertexB, 4, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, i.__webglSkinIndicesBuffer), f.vertexAttribPointer(b.skinIndex, 4, f.FLOAT, !1, 0, 0), f.bindBuffer(f.ARRAY_BUFFER, i.__webglSkinWeightsBuffer), f.vertexAttribPointer(b.skinWeight, 4, f.FLOAT, !1, 0, 0))
            }
            j instanceof THREE.Mesh ? (h.wireframe ? (f.lineWidth(h.wireframeLinewidth), c && f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, i.__webglLineBuffer), f.drawElements(f.LINES, i.__webglLineCount,
                    f.UNSIGNED_SHORT, 0)) : (c && f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, i.__webglFaceBuffer), f.drawElements(f.TRIANGLES, i.__webglFaceCount, f.UNSIGNED_SHORT, 0)), M.info.render.calls++, M.info.render.vertices += i.__webglFaceCount, M.info.render.faces += i.__webglFaceCount / 3) : j instanceof THREE.Line ? (j = j.type == THREE.LineStrip ? f.LINE_STRIP : f.LINES, f.lineWidth(h.linewidth), f.drawArrays(j, 0, i.__webglLineCount), M.info.render.calls++) : j instanceof THREE.ParticleSystem ? (f.drawArrays(f.POINTS, 0, i.__webglParticleCount), M.info.render.calls++) :
                j instanceof THREE.Ribbon && (f.drawArrays(f.TRIANGLE_STRIP, 0, i.__webglVertexCount), M.info.render.calls++)
        }
    }

    function i(b, c, d) {
        if (!b.__webglVertexBuffer) b.__webglVertexBuffer = f.createBuffer();
        if (!b.__webglNormalBuffer) b.__webglNormalBuffer = f.createBuffer();
        b.hasPos && (f.bindBuffer(f.ARRAY_BUFFER, b.__webglVertexBuffer), f.bufferData(f.ARRAY_BUFFER, b.positionArray, f.DYNAMIC_DRAW), f.enableVertexAttribArray(c.attributes.position), f.vertexAttribPointer(c.attributes.position, 3, f.FLOAT, !1, 0, 0));
        if (b.hasNormal) {
            f.bindBuffer(f.ARRAY_BUFFER,
                b.__webglNormalBuffer);
            if (d == THREE.FlatShading) {
                var e, h, i, j, k, z, o, q, p, m, v = b.count * 3;
                for (m = 0; m < v; m += 9) d = b.normalArray, e = d[m], h = d[m + 1], i = d[m + 2], j = d[m + 3], z = d[m + 4], q = d[m + 5], k = d[m + 6], o = d[m + 7], p = d[m + 8], e = (e + j + k) / 3, h = (h + z + o) / 3, i = (i + q + p) / 3, d[m] = e, d[m + 1] = h, d[m + 2] = i, d[m + 3] = e, d[m + 4] = h, d[m + 5] = i, d[m + 6] = e, d[m + 7] = h, d[m + 8] = i
            }
            f.bufferData(f.ARRAY_BUFFER, b.normalArray, f.DYNAMIC_DRAW);
            f.enableVertexAttribArray(c.attributes.normal);
            f.vertexAttribPointer(c.attributes.normal, 3, f.FLOAT, !1, 0, 0)
        }
        f.drawArrays(f.TRIANGLES,
            0, b.count);
        b.count = 0
    }

    function h(b) {
        if (V != b.doubleSided) b.doubleSided ? f.disable(f.CULL_FACE) : f.enable(f.CULL_FACE), V = b.doubleSided;
        if (X != b.flipSided) b.flipSided ? f.frontFace(f.CW) : f.frontFace(f.CCW), X = b.flipSided
    }

    function j(b) {
        aa != b && (b ? f.enable(f.DEPTH_TEST) : f.disable(f.DEPTH_TEST), aa = b)
    }

    function k(b) {
        J != b && (f.depthMask(b), J = b)
    }

    function p(b, c, d) {
        Aa != b && (b ? f.enable(f.POLYGON_OFFSET_FILL) : f.disable(f.POLYGON_OFFSET_FILL), Aa = b);
        if (b && (La != c || Ra != d)) f.polygonOffset(c, d), La = c, Ra = d
    }

    function o(b) {
        ha[0].set(b.n41 -
            b.n11, b.n42 - b.n12, b.n43 - b.n13, b.n44 - b.n14);
        ha[1].set(b.n41 + b.n11, b.n42 + b.n12, b.n43 + b.n13, b.n44 + b.n14);
        ha[2].set(b.n41 + b.n21, b.n42 + b.n22, b.n43 + b.n23, b.n44 + b.n24);
        ha[3].set(b.n41 - b.n21, b.n42 - b.n22, b.n43 - b.n23, b.n44 - b.n24);
        ha[4].set(b.n41 - b.n31, b.n42 - b.n32, b.n43 - b.n33, b.n44 - b.n34);
        ha[5].set(b.n41 + b.n31, b.n42 + b.n32, b.n43 + b.n33, b.n44 + b.n34);
        for (var c, b = 0; b < 6; b++) c = ha[b], c.divideScalar(Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z))
    }

    function q(b) {
        for (var c = b.matrixWorld, f = -b.geometry.boundingSphere.radius * Math.max(b.scale.x,
                Math.max(b.scale.y, b.scale.z)), d = 0; d < 6; d++)
            if (b = ha[d].x * c.n14 + ha[d].y * c.n24 + ha[d].z * c.n34 + ha[d].w, b <= f) return !1;
        return !0
    }

    function m(b, c) {
        b.list[b.count] = c;
        b.count += 1
    }

    function t(b) {
        var c, f, d = b.object,
            e = b.opaque,
            h = b.transparent;
        h.count = 0;
        b = e.count = 0;
        for (c = d.materials.length; b < c; b++) f = d.materials[b], f.transparent ? m(h, f) : m(e, f)
    }

    function w(b) {
        var c, f, d, e, h = b.object,
            i = b.buffer,
            j = b.opaque,
            k = b.transparent;
        k.count = 0;
        b = j.count = 0;
        for (d = h.materials.length; b < d; b++)
            if (c = h.materials[b], c instanceof THREE.MeshFaceMaterial) {
                c =
                    0;
                for (f = i.materials.length; c < f; c++)(e = i.materials[c]) && (e.transparent ? m(k, e) : m(j, e))
            } else(e = c) && (e.transparent ? m(k, e) : m(j, e))
    }

    function y(b, c) {
        return c.z - b.z
    }

    function C(b) {
        var c, k, m, H = 0,
            p, t, L, z, r = b.lights;
        ra || (ra = new THREE.PerspectiveCamera(M.shadowCameraFov, M.shadowMapWidth / M.shadowMapHeight, M.shadowCameraNear, M.shadowCameraFar));
        c = 0;
        for (k = r.length; c < k; c++)
            if (m = r[c], m instanceof THREE.SpotLight && m.castShadow) {
                N = -1;
                M.shadowMap[H] || (M.shadowMap[H] = new THREE.WebGLRenderTarget(M.shadowMapWidth, M.shadowMapHeight, {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat
                }));
                Sa[H] || (Sa[H] = new THREE.Matrix4);
                p = M.shadowMap[H];
                t = Sa[H];
                ra.position.copy(m.position);
                ra.lookAt(m.target.position);
                ra.update(void 0, !0);
                b.update(void 0, !1, ra);
                t.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
                t.multiplySelf(ra.projectionMatrix);
                t.multiplySelf(ra.matrixWorldInverse);
                ra.matrixWorldInverse.flattenToArray(Ua);
                ra.projectionMatrix.flattenToArray(Ta);
                Fa.multiply(ra.projectionMatrix, ra.matrixWorldInverse);
                o(Fa);
                M.initWebGLObjects(b);
                R(p);
                f.clearColor(1, 1, 1, 1);
                M.clear();
                f.clearColor(Y.r, Y.g, Y.b, Ga);
                t = b.__webglObjects.length;
                m = b.__webglObjectsImmediate.length;
                for (p = 0; p < t; p++) L = b.__webglObjects[p], z = L.object, z.visible && z.castShadow ? !(z instanceof THREE.Mesh) || !z.frustumCulled || q(z) ? (z.matrixWorld.flattenToArray(z._objectMatrixArray), D(z, ra, !1), L.render = !0) : L.render = !1 : L.render = !1;
                j(!0);
                G(THREE.NormalBlending);
                for (p = 0; p < t; p++)
                    if (L = b.__webglObjects[p], L.render) z = L.object, buffer = L.buffer, h(z), L = z.customDepthMaterial ?
                        z.customDepthMaterial : z.geometry.morphTargets.length ? Za : Va, e(ra, r, null, L, buffer, z);
                for (p = 0; p < m; p++) L = b.__webglObjectsImmediate[p], z = L.object, z.visible && z.castShadow && (z.matrixAutoUpdate && z.matrixWorld.flattenToArray(z._objectMatrixArray), T = -1, D(z, ra, !1), h(z), program = d(ra, r, null, Va, z), z.immediateRenderCallback ? z.immediateRenderCallback(program, f, ha) : z.render(function(b) {
                    i(b, program, Va.shading)
                }));
                H++
            }
    }

    function E(b, c) {
        var d, e, h;
        d = u.attributes;
        var i = u.uniforms,
            j = za / Da,
            k, z = [],
            o = Da * 0.5,
            m = za * 0.5,
            p = !0;
        f.useProgram(u.program);
        Wa = u.program;
        T = aa = W = -1;
        $a || (f.enableVertexAttribArray(u.attributes.position), f.enableVertexAttribArray(u.attributes.uv), $a = !0);
        f.disable(f.CULL_FACE);
        f.enable(f.BLEND);
        f.depthMask(!0);
        f.bindBuffer(f.ARRAY_BUFFER, u.vertexBuffer);
        f.vertexAttribPointer(d.position, 2, f.FLOAT, !1, 16, 0);
        f.vertexAttribPointer(d.uv, 2, f.FLOAT, !1, 16, 8);
        f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, u.elementBuffer);
        f.uniformMatrix4fv(i.projectionMatrix, !1, Ta);
        f.activeTexture(f.TEXTURE0);
        f.uniform1i(i.map, 0);
        d = 0;
        for (e = b.__webglSprites.length; d <
            e; d++)
            if (h = b.__webglSprites[d], h.visible && h.opacity != 0) h.useScreenCoordinates ? h.z = -h.position.z : (h._modelViewMatrix.multiplyToArray(c.matrixWorldInverse, h.matrixWorld, h._modelViewMatrixArray), h.z = -h._modelViewMatrix.n34);
        b.__webglSprites.sort(y);
        d = 0;
        for (e = b.__webglSprites.length; d < e; d++) h = b.__webglSprites[d], h.visible && h.opacity != 0 && h.map && h.map.image && h.map.image.width && (h.useScreenCoordinates ? (f.uniform1i(i.useScreenCoordinates, 1), f.uniform3f(i.screenPosition, (h.position.x - o) / o, (m - h.position.y) /
            m, Math.max(0, Math.min(1, h.position.z)))) : (f.uniform1i(i.useScreenCoordinates, 0), f.uniform1i(i.affectedByDistance, h.affectedByDistance ? 1 : 0), f.uniformMatrix4fv(i.modelViewMatrix, !1, h._modelViewMatrixArray)), k = h.map.image.width / (h.scaleByViewport ? za : 1), z[0] = k * j * h.scale.x, z[1] = k * h.scale.y, f.uniform2f(i.uvScale, h.uvScale.x, h.uvScale.y), f.uniform2f(i.uvOffset, h.uvOffset.x, h.uvOffset.y), f.uniform2f(i.alignment, h.alignment.x, h.alignment.y), f.uniform1f(i.opacity, h.opacity), f.uniform3f(i.color, h.color.r, h.color.g,
            h.color.b), f.uniform1f(i.rotation, h.rotation), f.uniform2fv(i.scale, z), h.mergeWith3D && !p ? (f.enable(f.DEPTH_TEST), p = !0) : !h.mergeWith3D && p && (f.disable(f.DEPTH_TEST), p = !1), G(h.blending), ka(h.map, 0), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0));
        f.enable(f.CULL_FACE);
        f.enable(f.DEPTH_TEST);
        f.depthMask(J)
    }

    function D(b, c, f) {
        b._modelViewMatrix.multiplyToArray(c.matrixWorldInverse, b.matrixWorld, b._modelViewMatrixArray);
        f && THREE.Matrix4.makeInvert3x3(b._modelViewMatrix).transposeIntoArray(b._normalMatrixArray)
    }

    function wa(b) {
        var c, f, d, e;
        e = b.__materials;
        b = 0;
        for (f = e.length; b < f; b++)
            if (d = e[b], d.attributes)
                for (c in d.attributes)
                    if (d.attributes[c].needsUpdate) return !0;
        return !1
    }

    function xa(b) {
        var c, f, d, e;
        e = b.__materials;
        b = 0;
        for (f = e.length; b < f; b++)
            if (d = e[b], d.attributes)
                for (c in d.attributes) d.attributes[c].needsUpdate = !1
    }

    function qa(b, c) {
        var f;
        for (f = b.length - 1; f >= 0; f--) b[f].object == c && b.splice(f, 1)
    }

    function sa(b) {
        function c(b) {
            var e = [];
            f = 0;
            for (d = b.length; f < d; f++) b[f] == void 0 ? e.push("undefined") : e.push(b[f].id);
            return e.join("_")
        }
        var f, d, e, h, i, j, k, o, m = {},
            p = b.morphTargets !== void 0 ? b.morphTargets.length : 0;
        b.geometryGroups = {};
        e = 0;
        for (h = b.faces.length; e < h; e++) i = b.faces[e], j = i.materials, k = c(j), m[k] == void 0 && (m[k] = {
            hash: k,
            counter: 0
        }), o = m[k].hash + "_" + m[k].counter, b.geometryGroups[o] == void 0 && (b.geometryGroups[o] = {
            faces: [],
            materials: j,
            vertices: 0,
            numMorphTargets: p
        }), i = i instanceof THREE.Face3 ? 3 : 4, b.geometryGroups[o].vertices + i > 65535 && (m[k].counter += 1, o = m[k].hash + "_" + m[k].counter, b.geometryGroups[o] == void 0 && (b.geometryGroups[o] = {
            faces: [],
            materials: j,
            vertices: 0,
            numMorphTargets: p
        })), b.geometryGroups[o].faces.push(e), b.geometryGroups[o].vertices += i;
        b.geometryGroupsList = [];
        for (var q in b.geometryGroups) b.geometryGroups[q].id = I++, b.geometryGroupsList.push(b.geometryGroups[q])
    }

    function ja(b, c, f) {
        b.push({
            buffer: c,
            object: f,
            opaque: {
                list: [],
                count: 0
            },
            transparent: {
                list: [],
                count: 0
            }
        })
    }

    function G(b) {
        if (b != W) {
            switch (b) {
                case THREE.AdditiveBlending:
                    f.blendEquation(f.FUNC_ADD);
                    f.blendFunc(f.SRC_ALPHA, f.ONE);
                    break;
                case THREE.SubtractiveBlending:
                    f.blendEquation(f.FUNC_ADD);
                    f.blendFunc(f.ZERO, f.ONE_MINUS_SRC_COLOR);
                    break;
                case THREE.MultiplyBlending:
                    f.blendEquation(f.FUNC_ADD);
                    f.blendFunc(f.ZERO, f.SRC_COLOR);
                    break;
                default:
                    f.blendEquationSeparate(f.FUNC_ADD, f.FUNC_ADD), f.blendFuncSeparate(f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA, f.ONE, f.ONE_MINUS_SRC_ALPHA)
            }
            W = b
        }
    }

    function r(b, c, d) {
        (d.width & d.width - 1) == 0 && (d.height & d.height - 1) == 0 ? (f.texParameteri(b, f.TEXTURE_WRAP_S, S(c.wrapS)), f.texParameteri(b, f.TEXTURE_WRAP_T, S(c.wrapT)), f.texParameteri(b, f.TEXTURE_MAG_FILTER, S(c.magFilter)),
            f.texParameteri(b, f.TEXTURE_MIN_FILTER, S(c.minFilter)), f.generateMipmap(b)) : (f.texParameteri(b, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(b, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(b, f.TEXTURE_MAG_FILTER, ya(c.magFilter)), f.texParameteri(b, f.TEXTURE_MIN_FILTER, ya(c.minFilter)))
    }

    function ka(b, c) {
        if (b.needsUpdate) {
            if (!b.__webglInit) b.__webglInit = !0, b.__webglTexture = f.createTexture(), M.info.memory.textures++;
            f.activeTexture(f.TEXTURE0 + c);
            f.bindTexture(f.TEXTURE_2D, b.__webglTexture);
            b instanceof
            THREE.DataTexture ? f.texImage2D(f.TEXTURE_2D, 0, S(b.format), b.image.width, b.image.height, 0, S(b.format), f.UNSIGNED_BYTE, b.image.data) : f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, b.image);
            r(f.TEXTURE_2D, b, b.image);
            b.needsUpdate = !1
        } else f.activeTexture(f.TEXTURE0 + c), f.bindTexture(f.TEXTURE_2D, b.__webglTexture)
    }

    function R(b) {
        var c = b instanceof THREE.WebGLRenderTargetCube;
        if (b && !b.__webglFramebuffer) {
            if (b.depthBuffer === void 0) b.depthBuffer = !0;
            if (b.stencilBuffer === void 0) b.stencilBuffer = !0;
            b.__webglRenderbuffer = f.createRenderbuffer();
            b.__webglTexture = f.createTexture();
            if (c) {
                f.bindTexture(f.TEXTURE_CUBE_MAP, b.__webglTexture);
                r(f.TEXTURE_CUBE_MAP, b, b);
                b.__webglFramebuffer = [];
                for (var d = 0; d < 6; d++) b.__webglFramebuffer[d] = f.createFramebuffer(), f.texImage2D(f.TEXTURE_CUBE_MAP_POSITIVE_X + d, 0, S(b.format), b.width, b.height, 0, S(b.format), S(b.type), null)
            } else b.__webglFramebuffer = f.createFramebuffer(), f.bindTexture(f.TEXTURE_2D, b.__webglTexture), r(f.TEXTURE_2D, b, b), f.texImage2D(f.TEXTURE_2D, 0, S(b.format),
                b.width, b.height, 0, S(b.format), S(b.type), null);
            f.bindRenderbuffer(f.RENDERBUFFER, b.__webglRenderbuffer);
            if (c)
                for (d = 0; d < 6; ++d) f.bindFramebuffer(f.FRAMEBUFFER, b.__webglFramebuffer[d]), f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_CUBE_MAP_POSITIVE_X + d, b.__webglTexture, 0);
            else f.bindFramebuffer(f.FRAMEBUFFER, b.__webglFramebuffer), f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_2D, b.__webglTexture, 0);
            b.depthBuffer && !b.stencilBuffer ? (f.renderbufferStorage(f.RENDERBUFFER,
                f.DEPTH_COMPONENT16, b.width, b.height), f.framebufferRenderbuffer(f.FRAMEBUFFER, f.DEPTH_ATTACHMENT, f.RENDERBUFFER, b.__webglRenderbuffer)) : b.depthBuffer && b.stencilBuffer ? (f.renderbufferStorage(f.RENDERBUFFER, f.DEPTH_STENCIL, b.width, b.height), f.framebufferRenderbuffer(f.FRAMEBUFFER, f.DEPTH_STENCIL_ATTACHMENT, f.RENDERBUFFER, b.__webglRenderbuffer)) : f.renderbufferStorage(f.RENDERBUFFER, f.RGBA4, b.width, b.height);
            c ? f.bindTexture(f.TEXTURE_CUBE_MAP, null) : f.bindTexture(f.TEXTURE_2D, null);
            f.bindRenderbuffer(f.RENDERBUFFER,
                null);
            f.bindFramebuffer(f.FRAMEBUFFER, null)
        }
        var e, h;
        b ? (c = c ? b.__webglFramebuffer[b.activeCubeFace] : b.__webglFramebuffer, d = b.width, b = b.height, h = e = 0) : (c = null, d = Da, b = za, e = Ia, h = Ba);
        c != va && (f.bindFramebuffer(f.FRAMEBUFFER, c), f.viewport(e, h, d, b), va = c)
    }

    function la(b) {
        b instanceof THREE.WebGLRenderTargetCube ? (f.bindTexture(f.TEXTURE_CUBE_MAP, b.__webglTexture), f.generateMipmap(f.TEXTURE_CUBE_MAP), f.bindTexture(f.TEXTURE_CUBE_MAP, null)) : (f.bindTexture(f.TEXTURE_2D, b.__webglTexture), f.generateMipmap(f.TEXTURE_2D),
            f.bindTexture(f.TEXTURE_2D, null))
    }

    function $(b, c) {
        var d;
        b == "fragment" ? d = f.createShader(f.FRAGMENT_SHADER) : b == "vertex" && (d = f.createShader(f.VERTEX_SHADER));
        f.shaderSource(d, c);
        f.compileShader(d);
        if (!f.getShaderParameter(d, f.COMPILE_STATUS)) return console.error(f.getShaderInfoLog(d)), console.error(c), null;
        return d
    }

    function ya(b) {
        switch (b) {
            case THREE.NearestFilter:
            case THREE.NearestMipMapNearestFilter:
            case THREE.NearestMipMapLinearFilter:
                return f.NEAREST;
            default:
                return f.LINEAR
        }
    }

    function S(b) {
        switch (b) {
            case THREE.RepeatWrapping:
                return f.REPEAT;
            case THREE.ClampToEdgeWrapping:
                return f.CLAMP_TO_EDGE;
            case THREE.MirroredRepeatWrapping:
                return f.MIRRORED_REPEAT;
            case THREE.NearestFilter:
                return f.NEAREST;
            case THREE.NearestMipMapNearestFilter:
                return f.NEAREST_MIPMAP_NEAREST;
            case THREE.NearestMipMapLinearFilter:
                return f.NEAREST_MIPMAP_LINEAR;
            case THREE.LinearFilter:
                return f.LINEAR;
            case THREE.LinearMipMapNearestFilter:
                return f.LINEAR_MIPMAP_NEAREST;
            case THREE.LinearMipMapLinearFilter:
                return f.LINEAR_MIPMAP_LINEAR;
            case THREE.ByteType:
                return f.BYTE;
            case THREE.UnsignedByteType:
                return f.UNSIGNED_BYTE;
            case THREE.ShortType:
                return f.SHORT;
            case THREE.UnsignedShortType:
                return f.UNSIGNED_SHORT;
            case THREE.IntType:
                return f.INT;
            case THREE.UnsignedShortType:
                return f.UNSIGNED_INT;
            case THREE.FloatType:
                return f.FLOAT;
            case THREE.AlphaFormat:
                return f.ALPHA;
            case THREE.RGBFormat:
                return f.RGB;
            case THREE.RGBAFormat:
                return f.RGBA;
            case THREE.LuminanceFormat:
                return f.LUMINANCE;
            case THREE.LuminanceAlphaFormat:
                return f.LUMINANCE_ALPHA
        }
        return 0
    }
    var M = this,
        f, ua = [],
        Wa =
        null,
        va = null,
        N = -1,
        T = null,
        I = 0,
        V = null,
        X = null,
        W = null,
        aa = null,
        J = null,
        Aa = null,
        La = null,
        Ra = null,
        Ia = 0,
        Ba = 0,
        Da = 0,
        za = 0,
        ha = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4],
        Fa = new THREE.Matrix4,
        Ta = new Float32Array(16),
        Ua = new Float32Array(16),
        Ja = new THREE.Vector4,
        Ya = {
            ambient: [0, 0, 0],
            directional: {
                length: 0,
                colors: [],
                positions: []
            },
            point: {
                length: 0,
                colors: [],
                positions: [],
                distances: []
            }
        },
        b = b || {},
        Ca = b.canvas !== void 0 ? b.canvas : document.createElement("canvas"),
        U = b.stencil !== void 0 ? b.stencil : !0,
        cb = b.preserveDrawingBuffer !== void 0 ? b.preserveDrawingBuffer : !1,
        db = b.antialias !== void 0 ? b.antialias : !1,
        Y = b.clearColor !== void 0 ? new THREE.Color(b.clearColor) : new THREE.Color(0),
        Ga = b.clearAlpha !== void 0 ? b.clearAlpha : 0,
        Xa = b.maxLights !== void 0 ? b.maxLights : 4;
    this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0
        }
    };
    this.maxMorphTargets = 8;
    this.domElement = Ca;
    this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.shadowMapBias = 0.0039;
    this.shadowMapDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCameraNear = 1;
    this.shadowCameraFar = 5E3;
    this.shadowCameraFov = 50;
    this.shadowMap = [];
    this.shadowMapEnabled = !1;
    this.shadowMapSoft = !0;
    var ra, Sa = [],
        b = THREE.ShaderLib.depthRGBA,
        ab = THREE.UniformsUtils.clone(b.uniforms),
        Va = new THREE.ShaderMaterial({
            fragmentShader: b.fragmentShader,
            vertexShader: b.vertexShader,
            uniforms: ab
        }),
        Za = new THREE.ShaderMaterial({
            fragmentShader: b.fragmentShader,
            vertexShader: b.vertexShader,
            uniforms: ab,
            morphTargets: !0
        });
    Va._shadowPass = !0;
    Za._shadowPass = !0;
    try {
        if (!(f = Ca.getContext("experimental-webgl", {
                antialias: db,
                stencil: U,
                preserveDrawingBuffer: cb
            }))) throw "Error creating WebGL context.";
        console.log(navigator.userAgent + " | " + f.getParameter(f.VERSION) + " | " + f.getParameter(f.VENDOR) + " | " + f.getParameter(f.RENDERER) + " | " + f.getParameter(f.SHADING_LANGUAGE_VERSION))
    } catch (eb) {
        console.error(eb)
    }
    f.clearColor(0, 0, 0, 1);
    f.clearDepth(1);
    f.clearStencil(0);
    f.enable(f.DEPTH_TEST);
    f.depthFunc(f.LEQUAL);
    f.frontFace(f.CCW);
    f.cullFace(f.BACK);
    f.enable(f.CULL_FACE);
    f.enable(f.BLEND);
    f.blendEquation(f.FUNC_ADD);
    f.blendFunc(f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
    f.clearColor(Y.r, Y.g, Y.b, Ga);
    this.context = f;
    var bb = f.getParameter(f.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0,
        u = {};
    u.vertices = new Float32Array(16);
    u.faces = new Uint16Array(6);
    U = 0;
    u.vertices[U++] = -1;
    u.vertices[U++] = -1;
    u.vertices[U++] = 0;
    u.vertices[U++] = 1;
    u.vertices[U++] = 1;
    u.vertices[U++] = -1;
    u.vertices[U++] = 1;
    u.vertices[U++] = 1;
    u.vertices[U++] = 1;
    u.vertices[U++] =
        1;
    u.vertices[U++] = 1;
    u.vertices[U++] = 0;
    u.vertices[U++] = -1;
    u.vertices[U++] = 1;
    u.vertices[U++] = 0;
    U = u.vertices[U++] = 0;
    u.faces[U++] = 0;
    u.faces[U++] = 1;
    u.faces[U++] = 2;
    u.faces[U++] = 0;
    u.faces[U++] = 2;
    u.faces[U++] = 3;
    u.vertexBuffer = f.createBuffer();
    u.elementBuffer = f.createBuffer();
    f.bindBuffer(f.ARRAY_BUFFER, u.vertexBuffer);
    f.bufferData(f.ARRAY_BUFFER, u.vertices, f.STATIC_DRAW);
    f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, u.elementBuffer);
    f.bufferData(f.ELEMENT_ARRAY_BUFFER, u.faces, f.STATIC_DRAW);
    u.program = f.createProgram();
    f.attachShader(u.program, $("fragment", THREE.ShaderLib.sprite.fragmentShader));
    f.attachShader(u.program, $("vertex", THREE.ShaderLib.sprite.vertexShader));
    f.linkProgram(u.program);
    u.attributes = {};
    u.uniforms = {};
    u.attributes.position = f.getAttribLocation(u.program, "position");
    u.attributes.uv = f.getAttribLocation(u.program, "uv");
    u.uniforms.uvOffset = f.getUniformLocation(u.program, "uvOffset");
    u.uniforms.uvScale = f.getUniformLocation(u.program, "uvScale");
    u.uniforms.rotation = f.getUniformLocation(u.program, "rotation");
    u.uniforms.scale = f.getUniformLocation(u.program, "scale");
    u.uniforms.alignment = f.getUniformLocation(u.program, "alignment");
    u.uniforms.color = f.getUniformLocation(u.program, "color");
    u.uniforms.map = f.getUniformLocation(u.program, "map");
    u.uniforms.opacity = f.getUniformLocation(u.program, "opacity");
    u.uniforms.useScreenCoordinates = f.getUniformLocation(u.program, "useScreenCoordinates");
    u.uniforms.affectedByDistance = f.getUniformLocation(u.program, "affectedByDistance");
    u.uniforms.screenPosition = f.getUniformLocation(u.program,
        "screenPosition");
    u.uniforms.modelViewMatrix = f.getUniformLocation(u.program, "modelViewMatrix");
    u.uniforms.projectionMatrix = f.getUniformLocation(u.program, "projectionMatrix");
    var $a = !1;
    this.setSize = function(b, c) {
        Ca.width = b;
        Ca.height = c;
        this.setViewport(0, 0, Ca.width, Ca.height)
    };
    this.setViewport = function(b, c, d, e) {
        Ia = b;
        Ba = c;
        Da = d;
        za = e;
        f.viewport(Ia, Ba, Da, za)
    };
    this.setScissor = function(b, c, d, e) {
        f.scissor(b, c, d, e)
    };
    this.enableScissorTest = function(b) {
        b ? f.enable(f.SCISSOR_TEST) : f.disable(f.SCISSOR_TEST)
    };
    this.setClearColorHex =
        function(b, c) {
            Y.setHex(b);
            Ga = c;
            f.clearColor(Y.r, Y.g, Y.b, Ga)
        };
    this.setClearColor = function(b, c) {
        Y.copy(b);
        Ga = c;
        f.clearColor(Y.r, Y.g, Y.b, Ga)
    };
    this.getClearColor = function() {
        return Y
    };
    this.getClearAlpha = function() {
        return Ga
    };
    this.clear = function(b, c, d) {
        var e = 0;
        if (b == void 0 || b) e |= f.COLOR_BUFFER_BIT;
        if (c == void 0 || c) e |= f.DEPTH_BUFFER_BIT;
        if (d == void 0 || d) e |= f.STENCIL_BUFFER_BIT;
        f.clear(e)
    };
    this.getContext = function() {
        return f
    };
    this.deallocateObject = function(b) {
        if (b.__webglInit)
            if (b.__webglInit = !1, delete b._modelViewMatrix,
                delete b._normalMatrixArray, delete b._modelViewMatrixArray, delete b._objectMatrixArray, b instanceof THREE.Mesh)
                for (g in b.geometry.geometryGroups) {
                    var c = b.geometry.geometryGroups[g];
                    f.deleteBuffer(c.__webglVertexBuffer);
                    f.deleteBuffer(c.__webglNormalBuffer);
                    f.deleteBuffer(c.__webglTangentBuffer);
                    f.deleteBuffer(c.__webglColorBuffer);
                    f.deleteBuffer(c.__webglUVBuffer);
                    f.deleteBuffer(c.__webglUV2Buffer);
                    f.deleteBuffer(c.__webglSkinVertexABuffer);
                    f.deleteBuffer(c.__webglSkinVertexBBuffer);
                    f.deleteBuffer(c.__webglSkinIndicesBuffer);
                    f.deleteBuffer(c.__webglSkinWeightsBuffer);
                    f.deleteBuffer(c.__webglFaceBuffer);
                    f.deleteBuffer(c.__webglLineBuffer);
                    if (c.numMorphTargets)
                        for (var d = 0, e = c.numMorphTargets; d < e; d++) f.deleteBuffer(c.__webglMorphTargetsBuffers[d]);
                    M.info.memory.geometries--
                } else if (b instanceof THREE.Ribbon) b = b.geometry, f.deleteBuffer(b.__webglVertexBuffer), f.deleteBuffer(b.__webglColorBuffer), M.info.memory.geometries--;
                else if (b instanceof THREE.Line) b = b.geometry, f.deleteBuffer(b.__webglVertexBuffer), f.deleteBuffer(b.__webglColorBuffer),
            M.info.memory.geometries--;
        else if (b instanceof THREE.ParticleSystem) b = b.geometry, f.deleteBuffer(b.__webglVertexBuffer), f.deleteBuffer(b.__webglColorBuffer), M.info.memory.geometries--
    };
    this.deallocateTexture = function(b) {
        if (b.__webglInit) b.__webglInit = !1, f.deleteTexture(b.__webglTexture), M.info.memory.textures--
    };
    this.initMaterial = function(b, c, d, e) {
        var h, i, j, k;
        b instanceof THREE.MeshDepthMaterial ? k = "depth" : b instanceof THREE.MeshNormalMaterial ? k = "normal" : b instanceof THREE.MeshBasicMaterial ? k = "basic" :
            b instanceof THREE.MeshLambertMaterial ? k = "lambert" : b instanceof THREE.MeshPhongMaterial ? k = "phong" : b instanceof THREE.LineBasicMaterial ? k = "basic" : b instanceof THREE.ParticleBasicMaterial && (k = "particle_basic");
        if (k) {
            var o = THREE.ShaderLib[k];
            b.uniforms = THREE.UniformsUtils.clone(o.uniforms);
            b.vertexShader = o.vertexShader;
            b.fragmentShader = o.fragmentShader
        }
        var m, p, q;
        m = q = o = 0;
        for (p = c.length; m < p; m++) j = c[m], j instanceof THREE.SpotLight && q++, j instanceof THREE.DirectionalLight && q++, j instanceof THREE.PointLight &&
            o++;
        o + q <= Xa ? m = q : (m = Math.ceil(Xa * q / (o + q)), o = Xa - m);
        j = {
            directional: m,
            point: o
        };
        o = q = 0;
        for (m = c.length; o < m; o++) p = c[o], p instanceof THREE.SpotLight && p.castShadow && q++;
        var t = 50;
        if (e !== void 0 && e instanceof THREE.SkinnedMesh) t = e.bones.length;
        var v;
        a: {
            m = b.fragmentShader;p = b.vertexShader;
            var o = b.uniforms,
                c = b.attributes,
                d = {
                    map: !!b.map,
                    envMap: !!b.envMap,
                    lightMap: !!b.lightMap,
                    vertexColors: b.vertexColors,
                    fog: d,
                    useFog: b.fog,
                    sizeAttenuation: b.sizeAttenuation,
                    skinning: b.skinning,
                    morphTargets: b.morphTargets,
                    maxMorphTargets: this.maxMorphTargets,
                    maxDirLights: j.directional,
                    maxPointLights: j.point,
                    maxBones: t,
                    shadowMapEnabled: this.shadowMapEnabled && e.receiveShadow,
                    shadowMapSoft: this.shadowMapSoft,
                    shadowMapWidth: this.shadowMapWidth,
                    shadowMapHeight: this.shadowMapHeight,
                    maxShadows: q,
                    alphaTest: b.alphaTest
                },
                r, e = [];k ? e.push(k) : (e.push(m), e.push(p));
            for (r in d) e.push(r),
            e.push(d[r]);k = e.join();r = 0;
            for (e = ua.length; r < e; r++)
                if (ua[r].code == k) {
                    v = ua[r].program;
                    break a
                }
            r = f.createProgram();e = [bb ? "#define VERTEX_TEXTURES" : "", "#define MAX_DIR_LIGHTS " + d.maxDirLights,
                "#define MAX_POINT_LIGHTS " + d.maxPointLights, "#define MAX_SHADOWS " + d.maxShadows, "#define MAX_BONES " + d.maxBones, d.map ? "#define USE_MAP" : "", d.envMap ? "#define USE_ENVMAP" : "", d.lightMap ? "#define USE_LIGHTMAP" : "", d.vertexColors ? "#define USE_COLOR" : "", d.skinning ? "#define USE_SKINNING" : "", d.morphTargets ? "#define USE_MORPHTARGETS" : "", d.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", d.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", d.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"
            ].join("\n");
            j = ["#ifdef GL_ES\nprecision highp float;\n#endif", "#define MAX_DIR_LIGHTS " + d.maxDirLights, "#define MAX_POINT_LIGHTS " + d.maxPointLights, "#define MAX_SHADOWS " + d.maxShadows, d.alphaTest ? "#define ALPHATEST " + d.alphaTest : "", d.useFog && d.fog ? "#define USE_FOG" : "", d.useFog && d.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", d.map ? "#define USE_MAP" : "", d.envMap ? "#define USE_ENVMAP" : "", d.lightMap ? "#define USE_LIGHTMAP" : "", d.vertexColors ? "#define USE_COLOR" : "", d.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                d.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "", d.shadowMapSoft ? "#define SHADOWMAP_WIDTH " + d.shadowMapWidth.toFixed(1) : "", d.shadowMapSoft ? "#define SHADOWMAP_HEIGHT " + d.shadowMapHeight.toFixed(1) : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"
            ].join("\n");f.attachShader(r, $("fragment", j + m));f.attachShader(r, $("vertex", e + p));f.linkProgram(r);f.getProgramParameter(r, f.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + f.getProgramParameter(r, f.VALIDATE_STATUS) + ", gl error [" +
                f.getError() + "]");r.uniforms = {};r.attributes = {};
            var u, e = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "cameraInverseMatrix", "boneGlobalMatrices", "morphTargetInfluences"];
            for (u in o) e.push(u);u = e;e = 0;
            for (o = u.length; e < o; e++) m = u[e],
            r.uniforms[m] = f.getUniformLocation(r, m);e = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
            for (u = 0; u < d.maxMorphTargets; u++) e.push("morphTarget" + u);
            for (v in c) e.push(v);
            v = e;u = 0;
            for (c = v.length; u < c; u++) d = v[u],
            r.attributes[d] = f.getAttribLocation(r, d);r.id = ua.length;ua.push({
                program: r,
                code: k
            });M.info.memory.programs = ua.length;v = r
        }
        b.program = v;
        v = b.program.attributes;
        v.position >= 0 && f.enableVertexAttribArray(v.position);
        v.color >= 0 && f.enableVertexAttribArray(v.color);
        v.normal >= 0 && f.enableVertexAttribArray(v.normal);
        v.tangent >= 0 && f.enableVertexAttribArray(v.tangent);
        b.skinning && v.skinVertexA >= 0 && v.skinVertexB >= 0 && v.skinIndex >= 0 && v.skinWeight >= 0 && (f.enableVertexAttribArray(v.skinVertexA),
            f.enableVertexAttribArray(v.skinVertexB), f.enableVertexAttribArray(v.skinIndex), f.enableVertexAttribArray(v.skinWeight));
        if (b.attributes)
            for (i in b.attributes) v[i] !== void 0 && v[i] >= 0 && f.enableVertexAttribArray(v[i]);
        if (b.morphTargets)
            for (i = b.numSupportedMorphTargets = 0; i < this.maxMorphTargets; i++) u = "morphTarget" + i, v[u] >= 0 && (f.enableVertexAttribArray(v[u]), b.numSupportedMorphTargets++);
        b.uniformsList = [];
        for (h in b.uniforms) b.uniformsList.push([b.uniforms[h], h])
    };
    this.clearTarget = function(b, c, d, f) {
        R(b);
        this.clear(c, d, f)
    };
    this.render = function(b, c, m, r) {
        var H, u, Ea, L, z, I, Q, Pa, Qa = b.lights,
            v = b.fog;
        N = -1;
        this.shadowMapEnabled && C(b, c);
        M.info.render.calls = 0;
        M.info.render.vertices = 0;
        M.info.render.faces = 0;
        c.matrixAutoUpdate && c.update(void 0, !0);
        b.update(void 0, !1, c);
        c.matrixWorldInverse.flattenToArray(Ua);
        c.projectionMatrix.flattenToArray(Ta);
        Fa.multiply(c.projectionMatrix, c.matrixWorldInverse);
        o(Fa);
        this.initWebGLObjects(b);
        R(m);
        (this.autoClear || r) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
        z = b.__webglObjects.length;
        for (r = 0; r < z; r++)
            if (H = b.__webglObjects[r], Q = H.object, Q.visible)
                if (!(Q instanceof THREE.Mesh) || !Q.frustumCulled || q(Q)) {
                    if (Q.matrixWorld.flattenToArray(Q._objectMatrixArray), D(Q, c, !0), w(H), H.render = !0, this.sortObjects) H.object.renderDepth ? H.z = H.object.renderDepth : (Ja.copy(Q.position), Fa.multiplyVector3(Ja), H.z = Ja.z)
                } else H.render = !1;
        else H.render = !1;
        this.sortObjects && b.__webglObjects.sort(y);
        I = b.__webglObjectsImmediate.length;
        for (r = 0; r < I; r++) H = b.__webglObjectsImmediate[r], Q =
            H.object, Q.visible && (Q.matrixAutoUpdate && Q.matrixWorld.flattenToArray(Q._objectMatrixArray), D(Q, c, !0), t(H));
        if (b.overrideMaterial) {
            j(b.overrideMaterial.depthTest);
            G(b.overrideMaterial.blending);
            for (r = 0; r < z; r++)
                if (H = b.__webglObjects[r], H.render) Q = H.object, Pa = H.buffer, h(Q), e(c, Qa, v, b.overrideMaterial, Pa, Q);
            for (r = 0; r < I; r++) H = b.__webglObjectsImmediate[r], Q = H.object, Q.visible && (T = -1, h(Q), u = d(c, Qa, v, b.overrideMaterial, Q), Q.immediateRenderCallback ? Q.immediateRenderCallback(u, f, ha) : Q.render(function(c) {
                i(c,
                    u, b.overrideMaterial.shading)
            }))
        } else {
            G(THREE.NormalBlending);
            for (r = z - 1; r >= 0; r--)
                if (H = b.__webglObjects[r], H.render) {
                    Q = H.object;
                    Pa = H.buffer;
                    Ea = H.opaque;
                    h(Q);
                    for (H = 0; H < Ea.count; H++) L = Ea.list[H], j(L.depthTest), k(L.depthWrite), p(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), e(c, Qa, v, L, Pa, Q)
                }
            for (r = 0; r < I; r++)
                if (H = b.__webglObjectsImmediate[r], Q = H.object, Q.visible) {
                    T = -1;
                    Ea = H.opaque;
                    h(Q);
                    for (H = 0; H < Ea.count; H++) L = Ea.list[H], j(L.depthTest), k(L.depthWrite), p(L.polygonOffset, L.polygonOffsetFactor,
                        L.polygonOffsetUnits), u = d(c, Qa, v, L, Q), Q.immediateRenderCallback ? Q.immediateRenderCallback(u, f, ha) : Q.render(function(b) {
                        i(b, u, L.shading)
                    })
                }
            for (r = 0; r < z; r++)
                if (H = b.__webglObjects[r], H.render) {
                    Q = H.object;
                    Pa = H.buffer;
                    Ea = H.transparent;
                    h(Q);
                    for (H = 0; H < Ea.count; H++) L = Ea.list[H], G(L.blending), j(L.depthTest), k(L.depthWrite), p(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), e(c, Qa, v, L, Pa, Q)
                }
            for (r = 0; r < I; r++)
                if (H = b.__webglObjectsImmediate[r], Q = H.object, Q.visible) {
                    T = -1;
                    Ea = H.transparent;
                    h(Q);
                    for (H = 0; H <
                        Ea.count; H++) L = Ea.list[H], G(L.blending), j(L.depthTest), k(L.depthWrite), p(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), u = d(c, Qa, v, L, Q), Q.immediateRenderCallback ? Q.immediateRenderCallback(u, f, ha) : Q.render(function(b) {
                        i(b, u, L.shading)
                    })
                }
        }
        b.__webglSprites.length && E(b, c);
        m && m.minFilter !== THREE.NearestFilter && m.minFilter !== THREE.LinearFilter && la(m)
    };
    this.initWebGLObjects = function(b) {
        if (!b.__webglObjects) b.__webglObjects = [], b.__webglObjectsImmediate = [], b.__webglSprites = [];
        for (; b.__objectsAdded.length;) {
            var d =
                b.__objectsAdded[0],
                e = b,
                h = void 0,
                i = void 0,
                j = void 0;
            if (!d.__webglInit)
                if (d.__webglInit = !0, d._modelViewMatrix = new THREE.Matrix4, d._normalMatrixArray = new Float32Array(9), d._modelViewMatrixArray = new Float32Array(16), d._objectMatrixArray = new Float32Array(16), d.matrixWorld.flattenToArray(d._objectMatrixArray), d instanceof THREE.Mesh)
                    for (h in i = d.geometry, i.geometryGroups == void 0 && sa(i), i.geometryGroups) {
                        if (j = i.geometryGroups[h], !j.__webglVertexBuffer) {
                            var k = j;
                            k.__webglVertexBuffer = f.createBuffer();
                            k.__webglNormalBuffer =
                                f.createBuffer();
                            k.__webglTangentBuffer = f.createBuffer();
                            k.__webglColorBuffer = f.createBuffer();
                            k.__webglUVBuffer = f.createBuffer();
                            k.__webglUV2Buffer = f.createBuffer();
                            k.__webglSkinVertexABuffer = f.createBuffer();
                            k.__webglSkinVertexBBuffer = f.createBuffer();
                            k.__webglSkinIndicesBuffer = f.createBuffer();
                            k.__webglSkinWeightsBuffer = f.createBuffer();
                            k.__webglFaceBuffer = f.createBuffer();
                            k.__webglLineBuffer = f.createBuffer();
                            if (k.numMorphTargets) {
                                var o = void 0,
                                    m = void 0;
                                k.__webglMorphTargetsBuffers = [];
                                o = 0;
                                for (m =
                                    k.numMorphTargets; o < m; o++) k.__webglMorphTargetsBuffers.push(f.createBuffer())
                            }
                            M.info.memory.geometries++;
                            for (var k = d, p = void 0, q = void 0, r = void 0, t = r = void 0, v = void 0, u = void 0, w = u = o = 0, y = r = q = void 0, r = m = y = q = p = void 0, t = k.geometry, v = t.faces, y = j.faces, p = 0, q = y.length; p < q; p++) r = y[p], r = v[r], r instanceof THREE.Face3 ? (o += 3, u += 1, w += 3) : r instanceof THREE.Face4 && (o += 4, u += 2, w += 4);
                            for (var p = j, q = k, C = y = v = void 0, F = void 0, C = void 0, r = [], v = 0, y = q.materials.length; v < y; v++)
                                if (C = q.materials[v], C instanceof THREE.MeshFaceMaterial) {
                                    C =
                                        0;
                                    for (l = p.materials.length; C < l; C++)(F = p.materials[C]) && r.push(F)
                                } else(F = C) && r.push(F);
                            p = r;
                            j.__materials = p;
                            a: {
                                v = q = void 0;y = p.length;
                                for (q = 0; q < y; q++)
                                    if (v = p[q], v.map || v.lightMap || v instanceof THREE.ShaderMaterial) {
                                        q = !0;
                                        break a
                                    }
                                q = !1
                            }
                            a: {
                                y = v = void 0;r = p.length;
                                for (v = 0; v < r; v++)
                                    if (y = p[v], !(y instanceof THREE.MeshBasicMaterial && !y.envMap || y instanceof THREE.MeshDepthMaterial)) {
                                        y = y && y.shading != void 0 && y.shading == THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading;
                                        break a
                                    }
                                y = !1
                            }
                            a: {
                                r = v = void 0;C = p.length;
                                for (v = 0; v < C; v++)
                                    if (r = p[v], r.vertexColors) {
                                        r = r.vertexColors;
                                        break a
                                    }
                                r = !1
                            }
                            j.__vertexArray = new Float32Array(o * 3);
                            if (y) j.__normalArray = new Float32Array(o * 3);
                            if (t.hasTangents) j.__tangentArray = new Float32Array(o * 4);
                            if (r) j.__colorArray = new Float32Array(o * 3);
                            if (q) {
                                if (t.faceUvs.length > 0 || t.faceVertexUvs.length > 0) j.__uvArray = new Float32Array(o * 2);
                                if (t.faceUvs.length > 1 || t.faceVertexUvs.length > 1) j.__uv2Array = new Float32Array(o * 2)
                            }
                            if (k.geometry.skinWeights.length && k.geometry.skinIndices.length) j.__skinVertexAArray =
                                new Float32Array(o * 4), j.__skinVertexBArray = new Float32Array(o * 4), j.__skinIndexArray = new Float32Array(o * 4), j.__skinWeightArray = new Float32Array(o * 4);
                            j.__faceArray = new Uint16Array(u * 3 + (k.geometry.edgeFaces ? k.geometry.edgeFaces.length * 6 : 0));
                            j.__lineArray = new Uint16Array(w * 2);
                            if (j.numMorphTargets) {
                                j.__morphTargetsArrays = [];
                                t = 0;
                                for (v = j.numMorphTargets; t < v; t++) j.__morphTargetsArrays.push(new Float32Array(o * 3))
                            }
                            j.__needsSmoothNormals = y == THREE.SmoothShading;
                            j.__uvType = q;
                            j.__vertexColorType = r;
                            j.__normalType =
                                y;
                            j.__webglFaceCount = u * 3 + (k.geometry.edgeFaces ? k.geometry.edgeFaces.length * 6 : 0);
                            j.__webglLineCount = w * 2;
                            t = 0;
                            for (v = p.length; t < v; t++)
                                if (q = p[t], q.attributes) {
                                    if (j.__webglCustomAttributes === void 0) j.__webglCustomAttributes = {};
                                    for (a in q.attributes) {
                                        r = q.attributes[a];
                                        y = {};
                                        for (m in r) y[m] = r[m];
                                        if (!y.__webglInitialized || y.createUniqueBuffers) y.__webglInitialized = !0, u = 1, y.type === "v2" ? u = 2 : y.type === "v3" ? u = 3 : y.type === "v4" ? u = 4 : y.type === "c" && (u = 3), y.size = u, y.array = new Float32Array(o * u), y.buffer = f.createBuffer(),
                                            y.buffer.belongsToAttribute = a, r.needsUpdate = !0, y.__original = r;
                                        j.__webglCustomAttributes[a] = y
                                    }
                                }
                            j.__inittedArrays = !0;
                            i.__dirtyVertices = !0;
                            i.__dirtyMorphTargets = !0;
                            i.__dirtyElements = !0;
                            i.__dirtyUvs = !0;
                            i.__dirtyNormals = !0;
                            i.__dirtyTangents = !0;
                            i.__dirtyColors = !0
                        }
                    } else if (d instanceof THREE.Ribbon) {
                        if (i = d.geometry, !i.__webglVertexBuffer) j = i, j.__webglVertexBuffer = f.createBuffer(), j.__webglColorBuffer = f.createBuffer(), M.info.memory.geometries++, j = i, k = j.vertices.length, j.__vertexArray = new Float32Array(k * 3),
                            j.__colorArray = new Float32Array(k * 3), j.__webglVertexCount = k, i.__dirtyVertices = !0, i.__dirtyColors = !0
                    } else if (d instanceof THREE.Line) {
                if (i = d.geometry, !i.__webglVertexBuffer) j = i, j.__webglVertexBuffer = f.createBuffer(), j.__webglColorBuffer = f.createBuffer(), M.info.memory.geometries++, j = i, k = j.vertices.length, j.__vertexArray = new Float32Array(k * 3), j.__colorArray = new Float32Array(k * 3), j.__webglLineCount = k, i.__dirtyVertices = !0, i.__dirtyColors = !0
            } else if (d instanceof THREE.ParticleSystem && (i = d.geometry, !i.__webglVertexBuffer)) {
                j =
                    i;
                j.__webglVertexBuffer = f.createBuffer();
                j.__webglColorBuffer = f.createBuffer();
                M.info.geometries++;
                j = i;
                k = d;
                o = j.vertices.length;
                j.__vertexArray = new Float32Array(o * 3);
                j.__colorArray = new Float32Array(o * 3);
                j.__sortArray = [];
                j.__webglParticleCount = o;
                j.__materials = k.materials;
                w = u = m = void 0;
                m = 0;
                for (u = k.materials.length; m < u; m++)
                    if (w = k.materials[m], w.attributes) {
                        if (j.__webglCustomAttributes === void 0) j.__webglCustomAttributes = {};
                        for (a in w.attributes) {
                            originalAttribute = w.attributes[a];
                            attribute = {};
                            for (property in originalAttribute) attribute[property] =
                                originalAttribute[property];
                            if (!attribute.__webglInitialized || attribute.createUniqueBuffers) attribute.__webglInitialized = !0, size = 1, attribute.type === "v2" ? size = 2 : attribute.type === "v3" ? size = 3 : attribute.type === "v4" ? size = 4 : attribute.type === "c" && (size = 3), attribute.size = size, attribute.array = new Float32Array(o * size), attribute.buffer = f.createBuffer(), attribute.buffer.belongsToAttribute = a, originalAttribute.needsUpdate = !0, attribute.__original = originalAttribute;
                            j.__webglCustomAttributes[a] = attribute
                        }
                    }
                i.__dirtyVertices = !0;
                i.__dirtyColors = !0
            }
            if (!d.__webglActive) {
                if (d instanceof THREE.Mesh)
                    for (h in i = d.geometry, i.geometryGroups) j = i.geometryGroups[h], ja(e.__webglObjects, j, d);
                else d instanceof THREE.Ribbon || d instanceof THREE.Line || d instanceof THREE.ParticleSystem ? (i = d.geometry, ja(e.__webglObjects, i, d)) : THREE.MarchingCubes !== void 0 && d instanceof THREE.MarchingCubes || d.immediateRenderCallback ? e.__webglObjectsImmediate.push({
                        object: d,
                        opaque: {
                            list: [],
                            count: 0
                        },
                        transparent: {
                            list: [],
                            count: 0
                        }
                    }) : d instanceof THREE.Sprite &&
                    e.__webglSprites.push(d);
                d.__webglActive = !0
            }
            b.__objectsAdded.splice(0, 1)
        }
        for (; b.__objectsRemoved.length;) {
            d = b.__objectsRemoved[0];
            e = b;
            if (d instanceof THREE.Mesh || d instanceof THREE.ParticleSystem || d instanceof THREE.Ribbon || d instanceof THREE.Line) qa(e.__webglObjects, d);
            else if (d instanceof THREE.Sprite) {
                e = e.__webglSprites;
                h = d;
                i = void 0;
                for (i = e.length - 1; i >= 0; i--) e[i] == h && e.splice(i, 1)
            } else(d instanceof THREE.MarchingCubes || d.immediateRenderCallback) && qa(e.__webglObjectsImmediate, d);
            d.__webglActive = !1;
            b.__objectsRemoved.splice(0, 1)
        }
        d = 0;
        for (e = b.__webglObjects.length; d < e; d++)
            if (i = b.__webglObjects[d].object, m = j = h = void 0, i instanceof THREE.Mesh) {
                h = i.geometry;
                k = 0;
                for (o = h.geometryGroupsList.length; k < o; k++)
                    if (j = h.geometryGroupsList[k], m = wa(j), h.__dirtyVertices || h.__dirtyMorphTargets || h.__dirtyElements || h.__dirtyUvs || h.__dirtyNormals || h.__dirtyColors || h.__dirtyTangents || m)
                        if (m = j, u = f.DYNAMIC_DRAW, w = !h.dynamic, m.__inittedArrays) {
                            var D = p = t = void 0,
                                A = void 0,
                                G = D = void 0,
                                E = void 0,
                                I = void 0,
                                K = void 0,
                                O = F = C = r =
                                y = v = q = void 0,
                                P = void 0,
                                J = void 0,
                                s = A = K = A = I = E = void 0,
                                n = void 0,
                                B = n = s = E = void 0,
                                R = void 0,
                                U = B = n = s = D = D = G = K = A = B = n = s = R = B = n = s = R = B = n = s = void 0,
                                ia = 0,
                                N = 0,
                                X = 0,
                                $ = 0,
                                V = 0,
                                S = 0,
                                Z = 0,
                                T = 0,
                                ma = 0,
                                x = 0,
                                na = 0,
                                B = s = 0,
                                B = void 0,
                                oa = m.__vertexArray,
                                ka = m.__uvArray,
                                la = m.__uv2Array,
                                W = m.__normalArray,
                                ca = m.__tangentArray,
                                pa = m.__colorArray,
                                da = m.__skinVertexAArray,
                                ea = m.__skinVertexBArray,
                                fa = m.__skinIndexArray,
                                ga = m.__skinWeightArray,
                                ra = m.__morphTargetsArrays,
                                aa = m.__webglCustomAttributes,
                                n = void 0,
                                ha = m.__faceArray,
                                Y = m.__lineArray,
                                ya = m.__needsSmoothNormals,
                                v = m.__vertexColorType,
                                q = m.__uvType,
                                y = m.__normalType,
                                ta = i.geometry,
                                va = ta.__dirtyVertices,
                                za = ta.__dirtyElements,
                                ua = ta.__dirtyUvs,
                                Aa = ta.__dirtyNormals,
                                Ba = ta.__dirtyTangents,
                                Da = ta.__dirtyColors,
                                Fa = ta.__dirtyMorphTargets,
                                Ca = ta.vertices,
                                Ga = m.faces,
                                La = ta.faces,
                                Ia = ta.faceVertexUvs[0],
                                Ja = ta.faceVertexUvs[1],
                                Ma = ta.skinVerticesA,
                                Na = ta.skinVerticesB,
                                Oa = ta.skinIndices,
                                Ka = ta.skinWeights,
                                Ha = ta.morphTargets;
                            if (aa)
                                for (U in aa) aa[U].offset = 0, aa[U].offsetSrc = 0;
                            t = 0;
                            for (p = Ga.length; t < p; t++)
                                if (D = Ga[t], A = La[D], Ia && (r = Ia[D]),
                                    Ja && (C = Ja[D]), D = A.vertexNormals, G = A.normal, E = A.vertexColors, I = A.color, K = A.vertexTangents, A instanceof THREE.Face3) {
                                    if (va) F = Ca[A.a].position, O = Ca[A.b].position, P = Ca[A.c].position, oa[N] = F.x, oa[N + 1] = F.y, oa[N + 2] = F.z, oa[N + 3] = O.x, oa[N + 4] = O.y, oa[N + 5] = O.z, oa[N + 6] = P.x, oa[N + 7] = P.y, oa[N + 8] = P.z, N += 9;
                                    if (aa)
                                        for (U in aa)
                                            if (n = aa[U], n.__original.needsUpdate) s = n.offset, B = n.offsetSrc, n.size === 1 ? (n.boundTo === void 0 || n.boundTo === "vertices" ? (n.array[s] = n.value[A.a], n.array[s + 1] = n.value[A.b], n.array[s + 2] = n.value[A.c]) :
                                                n.boundTo === "faces" ? (B = n.value[B], n.array[s] = B, n.array[s + 1] = B, n.array[s + 2] = B, n.offsetSrc++) : n.boundTo === "faceVertices" && (n.array[s] = n.value[B], n.array[s + 1] = n.value[B + 1], n.array[s + 2] = n.value[B + 2], n.offsetSrc += 3), n.offset += 3) : (n.boundTo === void 0 || n.boundTo === "vertices" ? (F = n.value[A.a], O = n.value[A.b], P = n.value[A.c]) : n.boundTo === "faces" ? (P = O = F = B = n.value[B], n.offsetSrc++) : n.boundTo === "faceVertices" && (F = n.value[B], O = n.value[B + 1], P = n.value[B + 2], n.offsetSrc += 3), n.size === 2 ? (n.array[s] = F.x, n.array[s + 1] = F.y,
                                                n.array[s + 2] = O.x, n.array[s + 3] = O.y, n.array[s + 4] = P.x, n.array[s + 5] = P.y, n.offset += 6) : n.size === 3 ? (n.type === "c" ? (n.array[s] = F.r, n.array[s + 1] = F.g, n.array[s + 2] = F.b, n.array[s + 3] = O.r, n.array[s + 4] = O.g, n.array[s + 5] = O.b, n.array[s + 6] = P.r, n.array[s + 7] = P.g, n.array[s + 8] = P.b) : (n.array[s] = F.x, n.array[s + 1] = F.y, n.array[s + 2] = F.z, n.array[s + 3] = O.x, n.array[s + 4] = O.y, n.array[s + 5] = O.z, n.array[s + 6] = P.x, n.array[s + 7] = P.y, n.array[s + 8] = P.z), n.offset += 9) : (n.array[s] = F.x, n.array[s + 1] = F.y, n.array[s + 2] = F.z, n.array[s + 3] = F.w, n.array[s +
                                                4] = O.x, n.array[s + 5] = O.y, n.array[s + 6] = O.z, n.array[s + 7] = O.w, n.array[s + 8] = P.x, n.array[s + 9] = P.y, n.array[s + 10] = P.z, n.array[s + 11] = P.w, n.offset += 12));
                                    if (Fa) {
                                        s = 0;
                                        for (n = Ha.length; s < n; s++) F = Ha[s].vertices[A.a].position, O = Ha[s].vertices[A.b].position, P = Ha[s].vertices[A.c].position, B = ra[s], B[na] = F.x, B[na + 1] = F.y, B[na + 2] = F.z, B[na + 3] = O.x, B[na + 4] = O.y, B[na + 5] = O.z, B[na + 6] = P.x, B[na + 7] = P.y, B[na + 8] = P.z;
                                        na += 9
                                    }
                                    if (Ka.length) s = Ka[A.a], n = Ka[A.b], B = Ka[A.c], ga[x] = s.x, ga[x + 1] = s.y, ga[x + 2] = s.z, ga[x + 3] = s.w, ga[x + 4] = n.x, ga[x + 5] = n.y,
                                        ga[x + 6] = n.z, ga[x + 7] = n.w, ga[x + 8] = B.x, ga[x + 9] = B.y, ga[x + 10] = B.z, ga[x + 11] = B.w, s = Oa[A.a], n = Oa[A.b], B = Oa[A.c], fa[x] = s.x, fa[x + 1] = s.y, fa[x + 2] = s.z, fa[x + 3] = s.w, fa[x + 4] = n.x, fa[x + 5] = n.y, fa[x + 6] = n.z, fa[x + 7] = n.w, fa[x + 8] = B.x, fa[x + 9] = B.y, fa[x + 10] = B.z, fa[x + 11] = B.w, s = Ma[A.a], n = Ma[A.b], B = Ma[A.c], da[x] = s.x, da[x + 1] = s.y, da[x + 2] = s.z, da[x + 3] = 1, da[x + 4] = n.x, da[x + 5] = n.y, da[x + 6] = n.z, da[x + 7] = 1, da[x + 8] = B.x, da[x + 9] = B.y, da[x + 10] = B.z, da[x + 11] = 1, s = Na[A.a], n = Na[A.b], B = Na[A.c], ea[x] = s.x, ea[x + 1] = s.y, ea[x + 2] = s.z, ea[x + 3] = 1, ea[x + 4] = n.x,
                                        ea[x + 5] = n.y, ea[x + 6] = n.z, ea[x + 7] = 1, ea[x + 8] = B.x, ea[x + 9] = B.y, ea[x + 10] = B.z, ea[x + 11] = 1, x += 12;
                                    if (Da && v) E.length == 3 && v == THREE.VertexColors ? (A = E[0], s = E[1], n = E[2]) : n = s = A = I, pa[ma] = A.r, pa[ma + 1] = A.g, pa[ma + 2] = A.b, pa[ma + 3] = s.r, pa[ma + 4] = s.g, pa[ma + 5] = s.b, pa[ma + 6] = n.r, pa[ma + 7] = n.g, pa[ma + 8] = n.b, ma += 9;
                                    if (Ba && ta.hasTangents) E = K[0], I = K[1], A = K[2], ca[Z] = E.x, ca[Z + 1] = E.y, ca[Z + 2] = E.z, ca[Z + 3] = E.w, ca[Z + 4] = I.x, ca[Z + 5] = I.y, ca[Z + 6] = I.z, ca[Z + 7] = I.w, ca[Z + 8] = A.x, ca[Z + 9] = A.y, ca[Z + 10] = A.z, ca[Z + 11] = A.w, Z += 12;
                                    if (Aa && y)
                                        if (D.length == 3 &&
                                            ya)
                                            for (K = 0; K < 3; K++) G = D[K], W[S] = G.x, W[S + 1] = G.y, W[S + 2] = G.z, S += 3;
                                        else
                                            for (K = 0; K < 3; K++) W[S] = G.x, W[S + 1] = G.y, W[S + 2] = G.z, S += 3;
                                    if (ua && r !== void 0 && q)
                                        for (K = 0; K < 3; K++) D = r[K], ka[X] = D.u, ka[X + 1] = D.v, X += 2;
                                    if (ua && C !== void 0 && q)
                                        for (K = 0; K < 3; K++) D = C[K], la[$] = D.u, la[$ + 1] = D.v, $ += 2;
                                    za && (ha[V] = ia, ha[V + 1] = ia + 1, ha[V + 2] = ia + 2, V += 3, Y[T] = ia, Y[T + 1] = ia + 1, Y[T + 2] = ia, Y[T + 3] = ia + 2, Y[T + 4] = ia + 1, Y[T + 5] = ia + 2, T += 6, ia += 3)
                                } else if (A instanceof THREE.Face4) {
                                if (va) F = Ca[A.a].position, O = Ca[A.b].position, P = Ca[A.c].position, J = Ca[A.d].position, oa[N] =
                                    F.x, oa[N + 1] = F.y, oa[N + 2] = F.z, oa[N + 3] = O.x, oa[N + 4] = O.y, oa[N + 5] = O.z, oa[N + 6] = P.x, oa[N + 7] = P.y, oa[N + 8] = P.z, oa[N + 9] = J.x, oa[N + 10] = J.y, oa[N + 11] = J.z, N += 12;
                                if (aa)
                                    for (U in aa)
                                        if (n = aa[U], n.__original.needsUpdate) s = n.offset, B = n.offsetSrc, n.size === 1 ? (n.boundTo === void 0 || n.boundTo === "vertices" ? (n.array[s] = n.value[A.a], n.array[s + 1] = n.value[A.b], n.array[s + 2] = n.value[A.c], n.array[s + 3] = n.value[A.d]) : n.boundTo === "faces" ? (B = n.value[B], n.array[s] = B, n.array[s + 1] = B, n.array[s + 2] = B, n.array[s + 3] = B, n.offsetSrc++) : n.boundTo ===
                                            "faceVertices" && (n.array[s] = n.value[B], n.array[s + 1] = n.value[B + 1], n.array[s + 2] = n.value[B + 2], n.array[s + 3] = n.value[B + 3], n.offsetSrc += 4), n.offset += 4) : (n.boundTo === void 0 || n.boundTo === "vertices" ? (F = n.value[A.a], O = n.value[A.b], P = n.value[A.c], J = n.value[A.d]) : n.boundTo === "faces" ? (J = P = O = F = B = n.value[B], n.offsetSrc++) : n.boundTo === "faceVertices" && (F = n.value[B], O = n.value[B + 1], P = n.value[B + 2], J = n.value[B + 3], n.offsetSrc += 4), n.size === 2 ? (n.array[s] = F.x, n.array[s + 1] = F.y, n.array[s + 2] = O.x, n.array[s + 3] = O.y, n.array[s + 4] =
                                            P.x, n.array[s + 5] = P.y, n.array[s + 6] = J.x, n.array[s + 7] = J.y, n.offset += 8) : n.size === 3 ? (n.type === "c" ? (n.array[s] = F.r, n.array[s + 1] = F.g, n.array[s + 2] = F.b, n.array[s + 3] = O.r, n.array[s + 4] = O.g, n.array[s + 5] = O.b, n.array[s + 6] = P.r, n.array[s + 7] = P.g, n.array[s + 8] = P.b, n.array[s + 9] = J.r, n.array[s + 10] = J.g, n.array[s + 11] = J.b) : (n.array[s] = F.x, n.array[s + 1] = F.y, n.array[s + 2] = F.z, n.array[s + 3] = O.x, n.array[s + 4] = O.y, n.array[s + 5] = O.z, n.array[s + 6] = P.x, n.array[s + 7] = P.y, n.array[s + 8] = P.z, n.array[s + 9] = J.x, n.array[s + 10] = J.y, n.array[s + 11] = J.z),
                                            n.offset += 12) : (n.array[s] = F.x, n.array[s + 1] = F.y, n.array[s + 2] = F.z, n.array[s + 3] = F.w, n.array[s + 4] = O.x, n.array[s + 5] = O.y, n.array[s + 6] = O.z, n.array[s + 7] = O.w, n.array[s + 8] = P.x, n.array[s + 9] = P.y, n.array[s + 10] = P.z, n.array[s + 11] = P.w, n.array[s + 12] = J.x, n.array[s + 13] = J.y, n.array[s + 14] = J.z, n.array[s + 15] = J.w, n.offset += 16));
                                if (Fa) {
                                    s = 0;
                                    for (n = Ha.length; s < n; s++) F = Ha[s].vertices[A.a].position, O = Ha[s].vertices[A.b].position, P = Ha[s].vertices[A.c].position, J = Ha[s].vertices[A.d].position, B = ra[s], B[na] = F.x, B[na + 1] = F.y, B[na + 2] =
                                        F.z, B[na + 3] = O.x, B[na + 4] = O.y, B[na + 5] = O.z, B[na + 6] = P.x, B[na + 7] = P.y, B[na + 8] = P.z, B[na + 9] = J.x, B[na + 10] = J.y, B[na + 11] = J.z;
                                    na += 12
                                }
                                if (Ka.length) s = Ka[A.a], n = Ka[A.b], B = Ka[A.c], R = Ka[A.d], ga[x] = s.x, ga[x + 1] = s.y, ga[x + 2] = s.z, ga[x + 3] = s.w, ga[x + 4] = n.x, ga[x + 5] = n.y, ga[x + 6] = n.z, ga[x + 7] = n.w, ga[x + 8] = B.x, ga[x + 9] = B.y, ga[x + 10] = B.z, ga[x + 11] = B.w, ga[x + 12] = R.x, ga[x + 13] = R.y, ga[x + 14] = R.z, ga[x + 15] = R.w, s = Oa[A.a], n = Oa[A.b], B = Oa[A.c], R = Oa[A.d], fa[x] = s.x, fa[x + 1] = s.y, fa[x + 2] = s.z, fa[x + 3] = s.w, fa[x + 4] = n.x, fa[x + 5] = n.y, fa[x + 6] = n.z, fa[x + 7] = n.w,
                                    fa[x + 8] = B.x, fa[x + 9] = B.y, fa[x + 10] = B.z, fa[x + 11] = B.w, fa[x + 12] = R.x, fa[x + 13] = R.y, fa[x + 14] = R.z, fa[x + 15] = R.w, s = Ma[A.a], n = Ma[A.b], B = Ma[A.c], R = Ma[A.d], da[x] = s.x, da[x + 1] = s.y, da[x + 2] = s.z, da[x + 3] = 1, da[x + 4] = n.x, da[x + 5] = n.y, da[x + 6] = n.z, da[x + 7] = 1, da[x + 8] = B.x, da[x + 9] = B.y, da[x + 10] = B.z, da[x + 11] = 1, da[x + 12] = R.x, da[x + 13] = R.y, da[x + 14] = R.z, da[x + 15] = 1, s = Na[A.a], n = Na[A.b], B = Na[A.c], A = Na[A.d], ea[x] = s.x, ea[x + 1] = s.y, ea[x + 2] = s.z, ea[x + 3] = 1, ea[x + 4] = n.x, ea[x + 5] = n.y, ea[x + 6] = n.z, ea[x + 7] = 1, ea[x + 8] = B.x, ea[x + 9] = B.y, ea[x + 10] = B.z, ea[x +
                                        11] = 1, ea[x + 12] = A.x, ea[x + 13] = A.y, ea[x + 14] = A.z, ea[x + 15] = 1, x += 16;
                                if (Da && v) E.length == 4 && v == THREE.VertexColors ? (A = E[0], s = E[1], n = E[2], E = E[3]) : E = n = s = A = I, pa[ma] = A.r, pa[ma + 1] = A.g, pa[ma + 2] = A.b, pa[ma + 3] = s.r, pa[ma + 4] = s.g, pa[ma + 5] = s.b, pa[ma + 6] = n.r, pa[ma + 7] = n.g, pa[ma + 8] = n.b, pa[ma + 9] = E.r, pa[ma + 10] = E.g, pa[ma + 11] = E.b, ma += 12;
                                if (Ba && ta.hasTangents) E = K[0], I = K[1], A = K[2], K = K[3], ca[Z] = E.x, ca[Z + 1] = E.y, ca[Z + 2] = E.z, ca[Z + 3] = E.w, ca[Z + 4] = I.x, ca[Z + 5] = I.y, ca[Z + 6] = I.z, ca[Z + 7] = I.w, ca[Z + 8] = A.x, ca[Z + 9] = A.y, ca[Z + 10] = A.z, ca[Z + 11] = A.w,
                                    ca[Z + 12] = K.x, ca[Z + 13] = K.y, ca[Z + 14] = K.z, ca[Z + 15] = K.w, Z += 16;
                                if (Aa && y)
                                    if (D.length == 4 && ya)
                                        for (K = 0; K < 4; K++) G = D[K], W[S] = G.x, W[S + 1] = G.y, W[S + 2] = G.z, S += 3;
                                    else
                                        for (K = 0; K < 4; K++) W[S] = G.x, W[S + 1] = G.y, W[S + 2] = G.z, S += 3;
                                if (ua && r !== void 0 && q)
                                    for (K = 0; K < 4; K++) D = r[K], ka[X] = D.u, ka[X + 1] = D.v, X += 2;
                                if (ua && C !== void 0 && q)
                                    for (K = 0; K < 4; K++) D = C[K], la[$] = D.u, la[$ + 1] = D.v, $ += 2;
                                za && (ha[V] = ia, ha[V + 1] = ia + 1, ha[V + 2] = ia + 3, ha[V + 3] = ia + 1, ha[V + 4] = ia + 2, ha[V + 5] = ia + 3, V += 6, Y[T] = ia, Y[T + 1] = ia + 1, Y[T + 2] = ia, Y[T + 3] = ia + 3, Y[T + 4] = ia + 1, Y[T + 5] = ia + 2, Y[T + 6] =
                                    ia + 2, Y[T + 7] = ia + 3, T += 8, ia += 4)
                            }
                            va && (f.bindBuffer(f.ARRAY_BUFFER, m.__webglVertexBuffer), f.bufferData(f.ARRAY_BUFFER, oa, u));
                            if (aa)
                                for (U in aa) n = aa[U], n.__original.needsUpdate && (f.bindBuffer(f.ARRAY_BUFFER, n.buffer), f.bufferData(f.ARRAY_BUFFER, n.array, u));
                            if (Fa) {
                                s = 0;
                                for (n = Ha.length; s < n; s++) f.bindBuffer(f.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[s]), f.bufferData(f.ARRAY_BUFFER, ra[s], u)
                            }
                            Da && ma > 0 && (f.bindBuffer(f.ARRAY_BUFFER, m.__webglColorBuffer), f.bufferData(f.ARRAY_BUFFER, pa, u));
                            Aa && (f.bindBuffer(f.ARRAY_BUFFER,
                                m.__webglNormalBuffer), f.bufferData(f.ARRAY_BUFFER, W, u));
                            Ba && ta.hasTangents && (f.bindBuffer(f.ARRAY_BUFFER, m.__webglTangentBuffer), f.bufferData(f.ARRAY_BUFFER, ca, u));
                            ua && X > 0 && (f.bindBuffer(f.ARRAY_BUFFER, m.__webglUVBuffer), f.bufferData(f.ARRAY_BUFFER, ka, u));
                            ua && $ > 0 && (f.bindBuffer(f.ARRAY_BUFFER, m.__webglUV2Buffer), f.bufferData(f.ARRAY_BUFFER, la, u));
                            za && (f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, m.__webglFaceBuffer), f.bufferData(f.ELEMENT_ARRAY_BUFFER, ha, u), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, m.__webglLineBuffer),
                                f.bufferData(f.ELEMENT_ARRAY_BUFFER, Y, u));
                            x > 0 && (f.bindBuffer(f.ARRAY_BUFFER, m.__webglSkinVertexABuffer), f.bufferData(f.ARRAY_BUFFER, da, u), f.bindBuffer(f.ARRAY_BUFFER, m.__webglSkinVertexBBuffer), f.bufferData(f.ARRAY_BUFFER, ea, u), f.bindBuffer(f.ARRAY_BUFFER, m.__webglSkinIndicesBuffer), f.bufferData(f.ARRAY_BUFFER, fa, u), f.bindBuffer(f.ARRAY_BUFFER, m.__webglSkinWeightsBuffer), f.bufferData(f.ARRAY_BUFFER, ga, u));
                            w && (delete m.__inittedArrays, delete m.__colorArray, delete m.__normalArray, delete m.__tangentArray,
                                delete m.__uvArray, delete m.__uv2Array, delete m.__faceArray, delete m.__vertexArray, delete m.__lineArray, delete m.__skinVertexAArray, delete m.__skinVertexBArray, delete m.__skinIndexArray, delete m.__skinWeightArray)
                        }
                h.__dirtyVertices = !1;
                h.__dirtyMorphTargets = !1;
                h.__dirtyElements = !1;
                h.__dirtyUvs = !1;
                h.__dirtyNormals = !1;
                h.__dirtyTangents = !1;
                h.__dirtyColors = !1;
                xa(j)
            } else if (i instanceof THREE.Ribbon) {
            h = i.geometry;
            if (h.__dirtyVertices || h.__dirtyColors) {
                i = h;
                j = f.DYNAMIC_DRAW;
                k = t = w = w = void 0;
                p = i.vertices;
                o =
                    i.colors;
                q = p.length;
                m = o.length;
                v = i.__vertexArray;
                u = i.__colorArray;
                y = i.__dirtyColors;
                if (i.__dirtyVertices) {
                    for (w = 0; w < q; w++) t = p[w].position, k = w * 3, v[k] = t.x, v[k + 1] = t.y, v[k + 2] = t.z;
                    f.bindBuffer(f.ARRAY_BUFFER, i.__webglVertexBuffer);
                    f.bufferData(f.ARRAY_BUFFER, v, j)
                }
                if (y) {
                    for (w = 0; w < m; w++) color = o[w], k = w * 3, u[k] = color.r, u[k + 1] = color.g, u[k + 2] = color.b;
                    f.bindBuffer(f.ARRAY_BUFFER, i.__webglColorBuffer);
                    f.bufferData(f.ARRAY_BUFFER, u, j)
                }
            }
            h.__dirtyVertices = !1;
            h.__dirtyColors = !1
        } else if (i instanceof THREE.Line) {
            h = i.geometry;
            if (h.__dirtyVertices || h.__dirtyColors) {
                i = h;
                j = f.DYNAMIC_DRAW;
                k = t = w = w = void 0;
                p = i.vertices;
                o = i.colors;
                q = p.length;
                m = o.length;
                v = i.__vertexArray;
                u = i.__colorArray;
                y = i.__dirtyColors;
                if (i.__dirtyVertices) {
                    for (w = 0; w < q; w++) t = p[w].position, k = w * 3, v[k] = t.x, v[k + 1] = t.y, v[k + 2] = t.z;
                    f.bindBuffer(f.ARRAY_BUFFER, i.__webglVertexBuffer);
                    f.bufferData(f.ARRAY_BUFFER, v, j)
                }
                if (y) {
                    for (w = 0; w < m; w++) color = o[w], k = w * 3, u[k] = color.r, u[k + 1] = color.g, u[k + 2] = color.b;
                    f.bindBuffer(f.ARRAY_BUFFER, i.__webglColorBuffer);
                    f.bufferData(f.ARRAY_BUFFER,
                        u, j)
                }
            }
            h.__dirtyVertices = !1;
            h.__dirtyColors = !1
        } else if (i instanceof THREE.ParticleSystem) h = i.geometry, m = wa(h), (h.__dirtyVertices || h.__dirtyColors || i.sortParticles || m) && c(h, f.DYNAMIC_DRAW, i), h.__dirtyVertices = !1, h.__dirtyColors = !1, xa(h)
    };
    this.setFaceCulling = function(b, c) {
        b ? (!c || c == "ccw" ? f.frontFace(f.CCW) : f.frontFace(f.CW), b == "back" ? f.cullFace(f.BACK) : b == "front" ? f.cullFace(f.FRONT) : f.cullFace(f.FRONT_AND_BACK), f.enable(f.CULL_FACE)) : f.disable(f.CULL_FACE)
    };
    this.supportsVertexTextures = function() {
        return bb
    }
};
THREE.WebGLRenderTarget = function(b, c, d) {
    this.width = b;
    this.height = c;
    d = d || {};
    this.wrapS = d.wrapS !== void 0 ? d.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = d.wrapT !== void 0 ? d.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = d.magFilter !== void 0 ? d.magFilter : THREE.LinearFilter;
    this.minFilter = d.minFilter !== void 0 ? d.minFilter : THREE.LinearMipMapLinearFilter;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = d.format !== void 0 ? d.format : THREE.RGBAFormat;
    this.type = d.type !== void 0 ? d.type :
        THREE.UnsignedByteType;
    this.depthBuffer = d.depthBuffer !== void 0 ? d.depthBuffer : !0;
    this.stencilBuffer = d.stencilBuffer !== void 0 ? d.stencilBuffer : !0
};
THREE.WebGLRenderTarget.prototype.clone = function() {
    var b = new THREE.WebGLRenderTarget(this.width, this.height);
    b.wrapS = this.wrapS;
    b.wrapT = this.wrapT;
    b.magFilter = this.magFilter;
    b.minFilter = this.minFilter;
    b.offset.copy(this.offset);
    b.repeat.copy(this.repeat);
    b.format = this.format;
    b.type = this.type;
    b.depthBuffer = this.depthBuffer;
    b.stencilBuffer = this.stencilBuffer;
    return b
};
THREE.WebGLRenderTargetCube = function(b, c, d) {
    THREE.WebGLRenderTarget.call(this, b, c, d);
    this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget;
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;