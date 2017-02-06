// ThreeExtras.js r45 - http://github.com/mrdoob/three.js
THREE.ColorUtils = {
    adjustHSV: function(a, b, c, e) {
        var g = THREE.ColorUtils.__hsv;
        THREE.ColorUtils.rgbToHsv(a, g);
        g.h = THREE.ColorUtils.clamp(g.h + b, 0, 1);
        g.s = THREE.ColorUtils.clamp(g.s + c, 0, 1);
        g.v = THREE.ColorUtils.clamp(g.v + e, 0, 1);
        a.setHSV(g.h, g.s, g.v)
    },
    rgbToHsv: function(a, b) {
        var c = a.r,
            e = a.g,
            g = a.b,
            h = Math.max(Math.max(c, e), g),
            f = Math.min(Math.min(c, e), g);
        if (f == h) f = c = 0;
        else {
            var k = h - f,
                f = k / h,
                c = c == h ? (e - g) / k : e == h ? 2 + (g - c) / k : 4 + (c - e) / k;
            c /= 6;
            c < 0 && (c += 1);
            c > 1 && (c -= 1)
        }
        b === void 0 && (b = {
            h: 0,
            s: 0,
            v: 0
        });
        b.h = c;
        b.s = f;
        b.v = h;
        return b
    },
    clamp: function(a, b, c) {
        return a < b ? b : a > c ? c : a
    }
};
THREE.ColorUtils.__hsv = {
    h: 0,
    s: 0,
    v: 0
};
THREE.GeometryUtils = {
    merge: function(a, b) {
        var c, e, g = a.vertices.length,
            h = b instanceof THREE.Mesh ? b.geometry : b,
            f = a.vertices,
            k = h.vertices,
            l = a.faces,
            m = h.faces,
            n = a.faceVertexUvs[0],
            h = h.faceVertexUvs[0];
        if (b instanceof THREE.Mesh) b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, e = new THREE.Matrix4, e.extractRotation(c, b.scale);
        for (var o = 0, t = k.length; o < t; o++) {
            var u = new THREE.Vertex(k[o].position.clone());
            c && c.multiplyVector3(u.position);
            f.push(u)
        }
        o = 0;
        for (t = m.length; o < t; o++) {
            var u = m[o],
                v, y, p = u.vertexNormals,
                z = u.vertexColors;
            u instanceof THREE.Face3 ? v = new THREE.Face3(u.a + g, u.b + g, u.c + g) : u instanceof THREE.Face4 && (v = new THREE.Face4(u.a + g, u.b + g, u.c + g, u.d + g));
            v.normal.copy(u.normal);
            e && e.multiplyVector3(v.normal);
            f = 0;
            for (k = p.length; f < k; f++) y = p[f].clone(), e && e.multiplyVector3(y), v.vertexNormals.push(y);
            v.color.copy(u.color);
            f = 0;
            for (k = z.length; f < k; f++) y = z[f], v.vertexColors.push(y.clone());
            v.materials = u.materials.slice();
            v.centroid.copy(u.centroid);
            c && c.multiplyVector3(v.centroid);
            l.push(v)
        }
        o = 0;
        for (t = h.length; o <
            t; o++) {
            c = h[o];
            e = [];
            f = 0;
            for (k = c.length; f < k; f++) e.push(new THREE.UV(c[f].u, c[f].v));
            n.push(e)
        }
    },
    clone: function(a) {
        var b = new THREE.Geometry,
            c, e = a.vertices,
            g = a.faces,
            h = a.faceVertexUvs[0],
            a = 0;
        for (c = e.length; a < c; a++) {
            var f = new THREE.Vertex(e[a].position.clone());
            b.vertices.push(f)
        }
        a = 0;
        for (c = g.length; a < c; a++) {
            var k = g[a],
                l, m, n = k.vertexNormals,
                o = k.vertexColors;
            k instanceof THREE.Face3 ? l = new THREE.Face3(k.a, k.b, k.c) : k instanceof THREE.Face4 && (l = new THREE.Face4(k.a, k.b, k.c, k.d));
            l.normal.copy(k.normal);
            e = 0;
            for (f = n.length; e < f; e++) m = n[e], l.vertexNormals.push(m.clone());
            l.color.copy(k.color);
            e = 0;
            for (f = o.length; e < f; e++) m = o[e], l.vertexColors.push(m.clone());
            l.materials = k.materials.slice();
            l.centroid.copy(k.centroid);
            b.faces.push(l)
        }
        a = 0;
        for (c = h.length; a < c; a++) {
            g = h[a];
            l = [];
            e = 0;
            for (f = g.length; e < f; e++) l.push(new THREE.UV(g[e].u, g[e].v));
            b.faceVertexUvs[0].push(l)
        }
        return b
    },
    randomPointInTriangle: function(a, b, c) {
        var e, g, h, f = new THREE.Vector3,
            k = THREE.GeometryUtils.__v1;
        e = THREE.GeometryUtils.random();
        g = THREE.GeometryUtils.random();
        e + g > 1 && (e = 1 - e, g = 1 - g);
        h = 1 - e - g;
        f.copy(a);
        f.multiplyScalar(e);
        k.copy(b);
        k.multiplyScalar(g);
        f.addSelf(k);
        k.copy(c);
        k.multiplyScalar(h);
        f.addSelf(k);
        return f
    },
    randomPointInFace: function(a, b, c) {
        var e, g, h;
        if (a instanceof THREE.Face3) return e = b.vertices[a.a].position, g = b.vertices[a.b].position, h = b.vertices[a.c].position, THREE.GeometryUtils.randomPointInTriangle(e, g, h);
        else if (a instanceof THREE.Face4) {
            e = b.vertices[a.a].position;
            g = b.vertices[a.b].position;
            h = b.vertices[a.c].position;
            var b = b.vertices[a.d].position,
                f;
            c ? a._area1 && a._area2 ? (c = a._area1, f = a._area2) : (c = THREE.GeometryUtils.triangleArea(e, g, b), f = THREE.GeometryUtils.triangleArea(g, h, b), a._area1 = c, a._area2 = f) : (c = THREE.GeometryUtils.triangleArea(e, g, b), f = THREE.GeometryUtils.triangleArea(g, h, b));
            return THREE.GeometryUtils.random() * (c + f) < c ? THREE.GeometryUtils.randomPointInTriangle(e, g, b) : THREE.GeometryUtils.randomPointInTriangle(g, h, b)
        }
    },
    randomPointsInGeometry: function(a, b) {
        function c(a) {
            function c(b, e) {
                if (e < b) return b;
                var f = b + Math.floor((e - b) / 2);
                return m[f] >
                    a ? c(b, f - 1) : m[f] < a ? c(f + 1, e) : f
            }
            return c(0, m.length - 1)
        }
        var e, g, h = a.faces,
            f = a.vertices,
            k = h.length,
            l = 0,
            m = [],
            n, o, t, u;
        for (g = 0; g < k; g++) {
            e = h[g];
            if (e instanceof THREE.Face3) n = f[e.a].position, o = f[e.b].position, t = f[e.c].position, e._area = THREE.GeometryUtils.triangleArea(n, o, t);
            else if (e instanceof THREE.Face4) n = f[e.a].position, o = f[e.b].position, t = f[e.c].position, u = f[e.d].position, e._area1 = THREE.GeometryUtils.triangleArea(n, o, u), e._area2 = THREE.GeometryUtils.triangleArea(o, t, u), e._area = e._area1 + e._area2;
            l += e._area;
            m[g] = l
        }
        e = [];
        f = {};
        for (g = 0; g < b; g++) k = THREE.GeometryUtils.random() * l, k = c(k), e[g] = THREE.GeometryUtils.randomPointInFace(h[k], a, !0), f[k] ? f[k] += 1 : f[k] = 1;
        return e
    },
    triangleArea: function(a, b, c) {
        var e, g = THREE.GeometryUtils.__v1;
        g.sub(a, b);
        e = g.length();
        g.sub(a, c);
        a = g.length();
        g.sub(b, c);
        c = g.length();
        b = 0.5 * (e + a + c);
        return Math.sqrt(b * (b - e) * (b - a) * (b - c))
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    center: function(a) {
        a.computeBoundingBox();
        var b = new THREE.Matrix4;
        b.setTranslation(-0.5 *
            (a.boundingBox.x[1] + a.boundingBox.x[0]), -0.5 * (a.boundingBox.y[1] + a.boundingBox.y[0]), -0.5 * (a.boundingBox.z[1] + a.boundingBox.z[0]));
        a.applyMatrix(b);
        a.computeBoundingBox()
    }
};
THREE.GeometryUtils.random = THREE.GeometryUtils.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.ImageUtils = {
    loadTexture: function(a, b, c) {
        var e = new Image,
            g = new THREE.Texture(e, b);
        e.onload = function() {
            g.needsUpdate = !0;
            c && c(this)
        };
        e.crossOrigin = "";
        e.src = a;
        return g
    },
    loadTextureCube: function(a, b, c) {
        var e, g = [],
            h = new THREE.Texture(g, b),
            b = g.loadCount = 0;
        for (e = a.length; b < e; ++b) g[b] = new Image, g[b].onload = function() {
            g.loadCount += 1;
            if (g.loadCount == 6) h.needsUpdate = !0;
            c && c(this)
        }, g[b].crossOrigin = "", g[b].src = a[b];
        return h
    },
    getNormalMap: function(a, b) {
        var c = function(a) {
            var c = Math.sqrt(a[0] * a[0] + a[1] * a[1] +
                a[2] * a[2]);
            return [a[0] / c, a[1] / c, a[2] / c]
        };
        b |= 1;
        var e = a.width,
            g = a.height,
            h = document.createElement("canvas");
        h.width = e;
        h.height = g;
        var f = h.getContext("2d");
        f.drawImage(a, 0, 0);
        for (var k = f.getImageData(0, 0, e, g).data, l = f.createImageData(e, g), m = l.data, n = 0; n < e; n++)
            for (var o = 1; o < g; o++) {
                var t = o - 1 < 0 ? g - 1 : o - 1,
                    u = (o + 1) % g,
                    v = n - 1 < 0 ? e - 1 : n - 1,
                    y = (n + 1) % e,
                    p = [],
                    z = [0, 0, k[(o * e + n) * 4] / 255 * b];
                p.push([-1, 0, k[(o * e + v) * 4] / 255 * b]);
                p.push([-1, -1, k[(t * e + v) * 4] / 255 * b]);
                p.push([0, -1, k[(t * e + n) * 4] / 255 * b]);
                p.push([1, -1, k[(t * e + y) * 4] / 255 * b]);
                p.push([1, 0, k[(o * e + y) * 4] / 255 * b]);
                p.push([1, 1, k[(u * e + y) * 4] / 255 * b]);
                p.push([0, 1, k[(u * e + n) * 4] / 255 * b]);
                p.push([-1, 1, k[(u * e + v) * 4] / 255 * b]);
                t = [];
                v = p.length;
                for (u = 0; u < v; u++) {
                    var y = p[u],
                        w = p[(u + 1) % v],
                        y = [y[0] - z[0], y[1] - z[1], y[2] - z[2]],
                        w = [w[0] - z[0], w[1] - z[1], w[2] - z[2]];
                    t.push(c([y[1] * w[2] - y[2] * w[1], y[2] * w[0] - y[0] * w[2], y[0] * w[1] - y[1] * w[0]]))
                }
                p = [0, 0, 0];
                for (u = 0; u < t.length; u++) p[0] += t[u][0], p[1] += t[u][1], p[2] += t[u][2];
                p[0] /= t.length;
                p[1] /= t.length;
                p[2] /= t.length;
                z = (o * e + n) * 4;
                m[z] = (p[0] + 1) / 2 * 255 | 0;
                m[z + 1] = (p[1] + 0.5) *
                    255 | 0;
                m[z + 2] = p[2] * 255 | 0;
                m[z + 3] = 255
            }
        f.putImageData(l, 0, 0);
        return h
    }
};
THREE.SceneUtils = {
    showHierarchy: function(a, b) {
        THREE.SceneUtils.traverseHierarchy(a, function(a) {
            a.visible = b
        })
    },
    traverseHierarchy: function(a, b) {
        var c, e, g = a.children.length;
        for (e = 0; e < g; e++) c = a.children[e], b(c), THREE.SceneUtils.traverseHierarchy(c, b)
    }
};
if (THREE.WebGLRenderer) THREE.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: 0.1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                enableSpecular: {
                    type: "i",
                    value: 0
                },
                enableReflection: {
                    type: "i",
                    value: 0
                },
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tSpecular: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                tDisplacement: {
                    type: "t",
                    value: 5,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                uDisplacementBias: {
                    type: "f",
                    value: 0
                },
                uDisplacementScale: {
                    type: "f",
                    value: 1
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE.Color(328965)
                },
                uShininess: {
                    type: "f",
                    value: 30
                },
                uOpacity: {
                    type: "f",
                    value: 1
                },
                uReflectivity: {
                    type: "f",
                    value: 0.5
                },
                uOffset: {
                    type: "v2",
                    value: new THREE.Vector2(0, 0)
                },
                uRepeat: {
                    type: "v2",
                    value: new THREE.Vector2(1, 1)
                }
            }]),
            fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
                THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\nif( enableAO )\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + viewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + viewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight;\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * totalDiffuse + totalSpecular + ambientLightColor * uAmbientColor;\nif ( enableReflection ) {\nvec3 wPos = cameraPosition - vViewPosition;\nvec3 vReflect = reflect( normalize( wPos ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, uReflectivity );\n}",
                THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"
            ].join("\n"),
            vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
                THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvViewPosition = -mvPosition.xyz;\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv * uRepeat + uOffset;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif",
                THREE.ShaderChunk.shadowmap_vertex, "}"
            ].join("\n")
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"
        }
    }
};
THREE.Curve = function() {};
THREE.Curve.prototype.getPoint = function() {
    console.log("Warning, getPoint() not implemented!");
    return null
};
THREE.Curve.prototype.getPointAt = function(a) {
    return this.getPoint(this.getUtoTmapping(a))
};
THREE.Curve.prototype.getPoints = function(a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
    return c
};
THREE.Curve.prototype.getSpacedPoints = function(a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
    return c
};
THREE.Curve.prototype.getLength = function() {
    var a = this.getLengths();
    return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function(a) {
    a || (a = 200);
    if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1) return this.cacheArcLengths;
    var b = [],
        c, e = this.getPoint(0),
        g, h = 0;
    b.push(0);
    for (g = 1; g <= a; g++) c = this.getPoint(g / a), h += c.distanceTo(e), b.push(h), e = c;
    return this.cacheArcLengths = b
};
THREE.Curve.prototype.getUtoTmapping = function(a, b) {
    var c = this.getLengths(),
        e = 0,
        g = c.length,
        h;
    h = b ? b : a * c[g - 1];
    time = Date.now();
    for (var f = 0, k = g - 1, l; f <= k;)
        if (e = Math.floor(f + (k - f) / 2), l = c[e] - h, l < 0) f = e + 1;
        else if (l > 0) k = e - 1;
    else {
        k = e;
        break
    }
    e = k;
    if (c[e] == h) return e / (g - 1);
    f = c[e];
    return c = (e + (h - f) / (c[e + 1] - f)) / (g - 1)
};
THREE.Curve.prototype.getNormalVector = function(a) {
    a = this.getTangent(a);
    return new THREE.Vector2(-a.y, a.x)
};
THREE.Curve.prototype.getTangent = function(a) {
    var b = a - 1.0E-4;
    a += 1.0E-4;
    b < 0 && (b = 0);
    a > 1 && (a = 1);
    var b = this.getPoint(b),
        a = this.getPoint(a),
        c = new THREE.Vector2;
    c.sub(a, b);
    return c.unit()
};
THREE.LineCurve = function(a, b) {
    a instanceof THREE.Vector2 ? (this.v1 = a, this.v2 = b) : THREE.LineCurve.oldConstructor.apply(this, arguments)
};
THREE.LineCurve.oldConstructor = function(a, b, c, e) {
    this.constructor(new THREE.Vector2(a, b), new THREE.Vector2(c, e))
};
THREE.LineCurve.prototype = new THREE.Curve;
THREE.LineCurve.prototype.constructor = THREE.LineCurve;
THREE.LineCurve.prototype.getPoint = function(a) {
    var b = new THREE.Vector2;
    b.sub(this.v2, this.v1);
    b.multiplyScalar(a).addSelf(this.v1);
    return b
};
THREE.LineCurve.prototype.getPointAt = function(a) {
    return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function() {
    var a = new THREE.Vector2;
    a.sub(this.v2, this.v1);
    a.normalize();
    return a
};
THREE.QuadraticBezierCurve = function(a, b, c) {
    if (!(b instanceof THREE.Vector2)) var e = Array.prototype.slice.call(arguments),
        a = new THREE.Vector2(e[0], e[1]),
        b = new THREE.Vector2(e[2], e[3]),
        c = new THREE.Vector2(e[4], e[5]);
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = new THREE.Curve;
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint = function(a) {
    var b;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function(a) {
    var b;
    b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b
};
THREE.CubicBezierCurve = function(a, b, c, e) {
    if (!(b instanceof THREE.Vector2)) var g = Array.prototype.slice.call(arguments),
        a = new THREE.Vector2(g[0], g[1]),
        b = new THREE.Vector2(g[2], g[3]),
        c = new THREE.Vector2(g[4], g[5]),
        e = new THREE.Vector2(g[6], g[7]);
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = e
};
THREE.CubicBezierCurve.prototype = new THREE.Curve;
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint = function(a) {
    var b;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function(a) {
    var b;
    b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b
};
THREE.SplineCurve = function(a) {
    this.points = a
};
THREE.SplineCurve.prototype = new THREE.Curve;
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint = function(a) {
    var b = new THREE.Vector2,
        c = [],
        e = this.points,
        g;
    g = (e.length - 1) * a;
    a = Math.floor(g);
    g -= a;
    c[0] = a == 0 ? a : a - 1;
    c[1] = a;
    c[2] = a > e.length - 2 ? a : a + 1;
    c[3] = a > e.length - 3 ? a : a + 2;
    b.x = THREE.Curve.Utils.interpolate(e[c[0]].x, e[c[1]].x, e[c[2]].x, e[c[3]].x, g);
    b.y = THREE.Curve.Utils.interpolate(e[c[0]].y, e[c[1]].y, e[c[2]].y, e[c[3]].y, g);
    return b
};
THREE.ArcCurve = function(a, b, c, e, g, h) {
    this.aX = a;
    this.aY = b;
    this.aRadius = c;
    this.aStartAngle = e;
    this.aEndAngle = g;
    this.aClockwise = h
};
THREE.ArcCurve.prototype = new THREE.Curve;
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve;
THREE.ArcCurve.prototype.getPoint = function(a) {
    var b = this.aEndAngle - this.aStartAngle;
    this.aClockwise || (a = 1 - a);
    a = this.aStartAngle + a * b;
    return new THREE.Vector2(this.aX + this.aRadius * Math.cos(a), this.aY + this.aRadius * Math.sin(a))
};
THREE.Curve.Utils = {
    tangentQuadraticBezier: function(a, b, c, e) {
        return 2 * (1 - a) * (c - b) + 2 * a * (e - c)
    },
    tangentCubicBezier: function(a, b, c, e, g) {
        return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * e * (1 - a) - 3 * a * a * e + 3 * a * a * g
    },
    tangentSpline: function(a) {
        return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
    },
    interpolate: function(a, b, c, e, g) {
        var a = (c - a) * 0.5,
            e = (e - b) * 0.5,
            h = g * g;
        return (2 * b - 2 * c + a + e) * g * h + (-3 * b + 3 * c - 2 * a - e) * h + a * g + b
    }
};
THREE.Curve.create = function(a, b) {
    a.prototype = new THREE.Curve;
    a.prototype.constructor = a;
    a.prototype.getPoint = b;
    return a
};
THREE.LineCurve3 = THREE.Curve.create(function(a, b) {
    this.v1 = a;
    this.v2 = b
}, function(a) {
    var b = new THREE.Vector3;
    b.sub(v2, v1);
    b.multiplyScalar(a);
    b.addSelf(this.v1);
    return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c
}, function(a) {
    var b, c;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
    return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function(a, b, c, e) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = e
}, function(a) {
    var b, c;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
    return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function(a) {
    this.points = a
}, function(a) {
    var b = new THREE.Vector3,
        c = [],
        e = this.points,
        g;
    g = (e.length - 1) * a;
    a = Math.floor(g);
    g -= a;
    c[0] = a == 0 ? a : a - 1;
    c[1] = a;
    c[2] = a > e.length - 2 ? a : a + 1;
    c[3] = a > e.length - 3 ? a : a + 2;
    b.x = THREE.Curve.Utils.interpolate(e[c[0]].x, e[c[1]].x, e[c[2]].x, e[c[3]].x, g);
    b.y = THREE.Curve.Utils.interpolate(e[c[0]].y, e[c[1]].y, e[c[2]].y, e[c[3]].y, g);
    b.z = THREE.Curve.Utils.interpolate(e[c[0]].z, e[c[1]].z, e[c[2]].z, e[c[3]].z, g);
    return b
});
THREE.CurvePath = function() {
    this.curves = [];
    this.bends = []
};
THREE.CurvePath.prototype = new THREE.Curve;
THREE.CurvePath.prototype.constructor = THREE.CurvePath;
THREE.CurvePath.prototype.add = function(a) {
    this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function() {};
THREE.CurvePath.prototype.closePath = function() {};
THREE.CurvePath.prototype.getPoint = function(a) {
    for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;) {
        if (c[a] >= b) return b = c[a] - b, a = this.curves[a], b = 1 - b / a.getLength(), a.getPointAt(b);
        a++
    }
    return null
};
THREE.CurvePath.prototype.getLength = function() {
    var a = this.getCurveLengths();
    return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function() {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
    var a = [],
        b = 0,
        c, e = this.curves.length;
    for (c = 0; c < e; c++) b += this.curves[c].getLength(), a.push(b);
    return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function() {
    var a = this.getPoints(),
        b, c, e, g;
    b = c = Number.NEGATIVE_INFINITY;
    e = g = Number.POSITIVE_INFINITY;
    var h, f, k, l;
    l = new THREE.Vector2;
    f = 0;
    for (k = a.length; f < k; f++) {
        h = a[f];
        if (h.x > b) b = h.x;
        else if (h.x < e) e = h.x;
        if (h.y > c) c = h.y;
        else if (h.y < c) g = h.y;
        l.addSelf(h.x, h.y)
    }
    return {
        minX: e,
        minY: g,
        maxX: b,
        maxY: c,
        centroid: l.divideScalar(k)
    }
};
THREE.CurvePath.prototype.createPointsGeometry = function(a) {
    return this.createGeometry(this.getPoints(a, !0))
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
    return this.createGeometry(this.getSpacedPoints(a, !0))
};
THREE.CurvePath.prototype.createGeometry = function(a) {
    for (var b = new THREE.Geometry, c = 0; c < a.length; c++) b.vertices.push(new THREE.Vertex(new THREE.Vector3(a[c].x, a[c].y, 0)));
    return b
};
THREE.CurvePath.prototype.addWrapPath = function(a) {
    this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function(a, b) {
    var c = this.getPoints(a),
        e, g;
    if (!b) b = this.bends;
    e = 0;
    for (g = b.length; e < g; e++) c = this.getWrapPoints(c, b[e]);
    return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function(a, b) {
    var c = this.getSpacedPoints(a),
        e, g;
    if (!b) b = this.bends;
    e = 0;
    for (g = b.length; e < g; e++) c = this.getWrapPoints(c, b[e]);
    return c
};
THREE.CurvePath.prototype.getWrapPoints = function(a, b) {
    var c = this.getBoundingBox(),
        e, g, h, f, k, l;
    e = 0;
    for (g = a.length; e < g; e++) h = a[e], f = h.x, k = h.y, l = f / c.maxX, l = b.getUtoTmapping(l, f), f = b.getPoint(l), k = b.getNormalVector(l).multiplyScalar(k), h.x = f.x + k.x, h.y = f.y + k.y;
    return a
};
THREE.Path = function(a) {
    THREE.CurvePath.call(this);
    this.actions = [];
    a && this.fromPoints(a)
};
THREE.Path.prototype = new THREE.CurvePath;
THREE.Path.prototype.constructor = THREE.Path;
THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc"
};
THREE.Path.prototype.fromPoints = function(a) {
    this.moveTo(a[0].x, a[0].y);
    var b, c = a.length;
    for (b = 1; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function() {
    var a = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE.PathActions.MOVE_TO,
        args: a
    })
};
THREE.Path.prototype.lineTo = function(a, b) {
    var c = Array.prototype.slice.call(arguments),
        e = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE.LineCurve(new THREE.Vector2(e[e.length - 2], e[e.length - 1]), new THREE.Vector2(a, b)));
    this.actions.push({
        action: THREE.PathActions.LINE_TO,
        args: c
    })
};
THREE.Path.prototype.quadraticCurveTo = function(a, b, c, e) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE.QuadraticBezierCurve(new THREE.Vector2(h[h.length - 2], h[h.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, e)));
    this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: g
    })
};
THREE.Path.prototype.bezierCurveTo = function(a, b, c, e, g, h) {
    var f = Array.prototype.slice.call(arguments),
        k = this.actions[this.actions.length - 1].args;
    this.curves.push(new THREE.CubicBezierCurve(new THREE.Vector2(k[k.length - 2], k[k.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, e), new THREE.Vector2(g, h)));
    this.actions.push({
        action: THREE.PathActions.BEZIER_CURVE_TO,
        args: f
    })
};
THREE.Path.prototype.splineThru = function(a) {
    var b = Array.prototype.slice.call(arguments),
        c = this.actions[this.actions.length - 1].args,
        c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
    Array.prototype.push.apply(c, a);
    this.curves.push(new THREE.SplineCurve(c));
    this.actions.push({
        action: THREE.PathActions.CSPLINE_THRU,
        args: b
    })
};
THREE.Path.prototype.arc = function(a, b, c, e, g, h) {
    var f = Array.prototype.slice.call(arguments);
    this.curves.push(new THREE.ArcCurve(a, b, c, e, g, h));
    this.actions.push({
        action: THREE.PathActions.ARC,
        args: f
    })
};
THREE.Path.prototype.getSpacedPoints = function(a) {
    a || (a = 40);
    for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
    return b
};
THREE.Path.prototype.getPoints = function(a, b) {
    var a = a || 12,
        c = [],
        e, g, h, f, k, l, m, n, o, t, u, v, y;
    e = 0;
    for (g = this.actions.length; e < g; e++) switch (h = this.actions[e], f = h.action, h = h.args, f) {
        case THREE.PathActions.LINE_TO:
            c.push(new THREE.Vector2(h[0], h[1]));
            break;
        case THREE.PathActions.QUADRATIC_CURVE_TO:
            k = h[2];
            l = h[3];
            o = h[0];
            t = h[1];
            c.length > 0 ? (f = c[c.length - 1], u = f.x, v = f.y) : (f = this.actions[e - 1].args, u = f[f.length - 2], v = f[f.length - 1]);
            for (f = 1; f <= a; f++) y = f / a, h = THREE.Shape.Utils.b2(y, u, o, k), y = THREE.Shape.Utils.b2(y, v, t,
                l), c.push(new THREE.Vector2(h, y));
            break;
        case THREE.PathActions.BEZIER_CURVE_TO:
            k = h[4];
            l = h[5];
            o = h[0];
            t = h[1];
            m = h[2];
            n = h[3];
            c.length > 0 ? (f = c[c.length - 1], u = f.x, v = f.y) : (f = this.actions[e - 1].args, u = f[f.length - 2], v = f[f.length - 1]);
            for (f = 1; f <= a; f++) y = f / a, h = THREE.Shape.Utils.b3(y, u, o, m, k), y = THREE.Shape.Utils.b3(y, v, t, n, l), c.push(new THREE.Vector2(h, y));
            break;
        case THREE.PathActions.CSPLINE_THRU:
            f = this.actions[e - 1].args;
            f = [new THREE.Vector2(f[f.length - 2], f[f.length - 1])];
            y = a * h[0].length;
            f = f.concat(h[0]);
            h = new THREE.SplineCurve(f);
            for (f = 1; f <= y; f++) c.push(h.getPointAt(f / y));
            break;
        case THREE.PathActions.ARC:
            f = this.actions[e - 1].args;
            k = h[0];
            l = h[1];
            m = h[2];
            o = h[3];
            y = h[4];
            t = !!h[5];
            n = f[f.length - 2];
            u = f[f.length - 1];
            f.length == 0 && (n = u = 0);
            v = y - o;
            var p = a * 2;
            for (f = 1; f <= p; f++) y = f / p, t || (y = 1 - y), y = o + y * v, h = n + k + m * Math.cos(y), y = u + l + m * Math.sin(y), c.push(new THREE.Vector2(h, y))
    }
    b && c.push(c[0]);
    return c
};
THREE.Path.prototype.transform = function(a, b) {
    this.getBoundingBox();
    return this.getWrapPoints(this.getPoints(b), a)
};
THREE.Path.prototype.nltransform = function(a, b, c, e, g, h) {
    var f = this.getPoints(),
        k, l, m, n, o;
    k = 0;
    for (l = f.length; k < l; k++) m = f[k], n = m.x, o = m.y, m.x = a * n + b * o + c, m.y = e * o + g * n + h;
    return f
};
THREE.Path.prototype.debug = function(a) {
    var b = this.getBoundingBox();
    a || (a = document.createElement("canvas"), a.setAttribute("width", b.maxX + 100), a.setAttribute("height", b.maxY + 100), document.body.appendChild(a));
    b = a.getContext("2d");
    b.fillStyle = "white";
    b.fillRect(0, 0, a.width, a.height);
    b.strokeStyle = "black";
    b.beginPath();
    var c, e, g, a = 0;
    for (c = this.actions.length; a < c; a++) e = this.actions[a], g = e.args, e = e.action, e != THREE.PathActions.CSPLINE_THRU && b[e].apply(b, g);
    b.stroke();
    b.closePath();
    b.strokeStyle = "red";
    e =
        this.getPoints();
    a = 0;
    for (c = e.length; a < c; a++) g = e[a], b.beginPath(), b.arc(g.x, g.y, 1.5, 0, Math.PI * 2, !1), b.stroke(), b.closePath()
};
THREE.Path.prototype.toShapes = function() {
    var a, b, c, e, g = [],
        h = new THREE.Path;
    a = 0;
    for (b = this.actions.length; a < b; a++) c = this.actions[a], e = c.args, c = c.action, c == THREE.PathActions.MOVE_TO && h.actions.length != 0 && (g.push(h), h = new THREE.Path), h[c].apply(h, e);
    h.actions.length != 0 && g.push(h);
    if (g.length == 0) return [];
    var f, h = [];
    if (THREE.Shape.Utils.isClockWise(g[0].getPoints())) {
        a = 0;
        for (b = g.length; a < b; a++) e = g[a], THREE.Shape.Utils.isClockWise(e.getPoints()) ? (f && h.push(f), f = new THREE.Shape, f.actions = e.actions, f.curves =
            e.curves) : f.holes.push(e);
        h.push(f)
    } else {
        f = new THREE.Shape;
        a = 0;
        for (b = g.length; a < b; a++) e = g[a], THREE.Shape.Utils.isClockWise(e.getPoints()) ? (f.actions = e.actions, f.curves = e.curves, h.push(f), f = new THREE.Shape) : f.holes.push(e)
    }
    return h
};
THREE.Shape = function() {
    THREE.Path.apply(this, arguments);
    this.holes = []
};
THREE.Shape.prototype = new THREE.Path;
THREE.Shape.prototype.constructor = THREE.Path;
THREE.Shape.prototype.extrude = function(a) {
    return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function(a) {
    var b, c = this.holes.length,
        e = [];
    for (b = 0; b < c; b++) e[b] = this.holes[b].getTransformedPoints(a, this.bends);
    return e
};
THREE.Shape.prototype.getSpacedPointsHoles = function(a) {
    var b, c = this.holes.length,
        e = [];
    for (b = 0; b < c; b++) e[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
    return e
};
THREE.Shape.prototype.extractAllPoints = function(a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    }
};
THREE.Shape.prototype.extractAllSpacedPoints = function(a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    }
};
THREE.Shape.Utils = {
    removeHoles: function(a, b) {
        var c = a.concat(),
            e = c.concat(),
            g, h, f, k, l, m, n, o, t, u, v = [];
        for (l = 0; l < b.length; l++) {
            m = b[l];
            Array.prototype.push.apply(e, m);
            h = Number.POSITIVE_INFINITY;
            for (g = 0; g < m.length; g++) {
                t = m[g];
                u = [];
                for (o = 0; o < c.length; o++) n = c[o], n = t.distanceToSquared(n), u.push(n), n < h && (h = n, f = g, k = o)
            }
            g = k - 1 >= 0 ? k - 1 : c.length - 1;
            h = f - 1 >= 0 ? f - 1 : m.length - 1;
            var y = [m[f], c[k], c[g]];
            o = THREE.FontUtils.Triangulate.area(y);
            var p = [m[f], m[h], c[k]];
            t = THREE.FontUtils.Triangulate.area(p);
            u = k;
            n = f;
            k += 1;
            f += -1;
            k <
                0 && (k += c.length);
            k %= c.length;
            f < 0 && (f += m.length);
            f %= m.length;
            g = k - 1 >= 0 ? k - 1 : c.length - 1;
            h = f - 1 >= 0 ? f - 1 : m.length - 1;
            y = [m[f], c[k], c[g]];
            y = THREE.FontUtils.Triangulate.area(y);
            p = [m[f], m[h], c[k]];
            p = THREE.FontUtils.Triangulate.area(p);
            o + t > y + p && (k = u, f = n, k < 0 && (k += c.length), k %= c.length, f < 0 && (f += m.length), f %= m.length, g = k - 1 >= 0 ? k - 1 : c.length - 1, h = f - 1 >= 0 ? f - 1 : m.length - 1);
            o = c.slice(0, k);
            t = c.slice(k);
            u = m.slice(f);
            n = m.slice(0, f);
            h = [m[f], m[h], c[k]];
            v.push([m[f], c[k], c[g]]);
            v.push(h);
            c = o.concat(u).concat(n).concat(t)
        }
        return {
            shape: c,
            isolatedPts: v,
            allpoints: e
        }
    },
    triangulateShape: function(a, b) {
        var c = THREE.Shape.Utils.removeHoles(a, b),
            e = c.allpoints,
            g = c.isolatedPts,
            c = THREE.FontUtils.Triangulate(c.shape, !1),
            h, f, k, l, m = {};
        h = 0;
        for (f = e.length; h < f; h++) l = e[h].x + ":" + e[h].y, m[l] !== void 0 && console.log("Duplicate point", l), m[l] = h;
        h = 0;
        for (f = c.length; h < f; h++) {
            k = c[h];
            for (e = 0; e < 3; e++) l = k[e].x + ":" + k[e].y, l = m[l], l !== void 0 && (k[e] = l)
        }
        h = 0;
        for (f = g.length; h < f; h++) {
            k = g[h];
            for (e = 0; e < 3; e++) l = k[e].x + ":" + k[e].y, l = m[l], l !== void 0 && (k[e] = l)
        }
        return c.concat(g)
    },
    isClockWise: function(a) {
        return THREE.FontUtils.Triangulate.area(a) < 0
    },
    b2p0: function(a, b) {
        var c = 1 - a;
        return c * c * b
    },
    b2p1: function(a, b) {
        return 2 * (1 - a) * a * b
    },
    b2p2: function(a, b) {
        return a * a * b
    },
    b2: function(a, b, c, e) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, e)
    },
    b3p0: function(a, b) {
        var c = 1 - a;
        return c * c * c * b
    },
    b3p1: function(a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b
    },
    b3p2: function(a, b) {
        return 3 * (1 - a) * a * a * b
    },
    b3p3: function(a, b) {
        return a * a * a * b
    },
    b3: function(a, b, c, e, g) {
        return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, e) +
            this.b3p3(a, g)
    }
};
THREE.TextPath = function(a, b) {
    THREE.Path.call(this);
    this.parameters = b || {};
    this.set(a)
};
THREE.TextPath.prototype.set = function(a, b) {
    this.text = a;
    var b = b || this.parameters,
        c = b.curveSegments !== void 0 ? b.curveSegments : 4,
        e = b.font !== void 0 ? b.font : "helvetiker",
        g = b.weight !== void 0 ? b.weight : "normal",
        h = b.style !== void 0 ? b.style : "normal";
    THREE.FontUtils.size = b.size !== void 0 ? b.size : 100;
    THREE.FontUtils.divisions = c;
    THREE.FontUtils.face = e;
    THREE.FontUtils.weight = g;
    THREE.FontUtils.style = h
};
THREE.TextPath.prototype.toShapes = function() {
    for (var a = THREE.FontUtils.drawText(this.text).paths, b = [], c = 0, e = a.length; c < e; c++) Array.prototype.push.apply(b, a[c].toShapes());
    return b
};
THREE.AnimationHandler = function() {
    var a = [],
        b = {},
        c = {
            update: function(c) {
                for (var b = 0; b < a.length; b++) a[b].update(c)
            },
            addToUpdate: function(c) {
                a.indexOf(c) === -1 && a.push(c)
            },
            removeFromUpdate: function(c) {
                c = a.indexOf(c);
                c !== -1 && a.splice(c, 1)
            },
            add: function(a) {
                b[a.name] !== void 0 && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting.");
                b[a.name] = a;
                if (a.initialized !== !0) {
                    for (var c = 0; c < a.hierarchy.length; c++) {
                        for (var e = 0; e < a.hierarchy[c].keys.length; e++) {
                            if (a.hierarchy[c].keys[e].time <
                                0) a.hierarchy[c].keys[e].time = 0;
                            if (a.hierarchy[c].keys[e].rot !== void 0 && !(a.hierarchy[c].keys[e].rot instanceof THREE.Quaternion)) {
                                var k = a.hierarchy[c].keys[e].rot;
                                a.hierarchy[c].keys[e].rot = new THREE.Quaternion(k[0], k[1], k[2], k[3])
                            }
                        }
                        if (a.hierarchy[c].keys[0].morphTargets !== void 0) {
                            k = {};
                            for (e = 0; e < a.hierarchy[c].keys.length; e++)
                                for (var l = 0; l < a.hierarchy[c].keys[e].morphTargets.length; l++) {
                                    var m = a.hierarchy[c].keys[e].morphTargets[l];
                                    k[m] = -1
                                }
                            a.hierarchy[c].usedMorphTargets = k;
                            for (e = 0; e < a.hierarchy[c].keys.length; e++) {
                                var n = {};
                                for (m in k) {
                                    for (l = 0; l < a.hierarchy[c].keys[e].morphTargets.length; l++)
                                        if (a.hierarchy[c].keys[e].morphTargets[l] === m) {
                                            n[m] = a.hierarchy[c].keys[e].morphTargetsInfluences[l];
                                            break
                                        }
                                    l === a.hierarchy[c].keys[e].morphTargets.length && (n[m] = 0)
                                }
                                a.hierarchy[c].keys[e].morphTargetsInfluences = n
                            }
                        }
                        for (e = 1; e < a.hierarchy[c].keys.length; e++) a.hierarchy[c].keys[e].time === a.hierarchy[c].keys[e - 1].time && (a.hierarchy[c].keys.splice(e, 1), e--);
                        for (e = 1; e < a.hierarchy[c].keys.length; e++) a.hierarchy[c].keys[e].index = e
                    }
                    e = parseInt(a.length *
                        a.fps, 10);
                    a.JIT = {};
                    a.JIT.hierarchy = [];
                    for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(e));
                    a.initialized = !0
                }
            },
            get: function(a) {
                if (typeof a === "string") return b[a] ? b[a] : (console.log("THREE.AnimationHandler.get: Couldn't find animation " + a), null)
            },
            parse: function(a) {
                var c = [];
                if (a instanceof THREE.SkinnedMesh)
                    for (var b = 0; b < a.bones.length; b++) c.push(a.bones[b]);
                else e(a, c);
                return c
            }
        },
        e = function(a, c) {
            c.push(a);
            for (var b = 0; b < a.children.length; b++) e(a.children[b], c)
        };
    c.LINEAR = 0;
    c.CATMULLROM = 1;
    c.CATMULLROM_FORWARD =
        2;
    return c
}();
THREE.Animation = function(a, b, c, e) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.loop = this.isPaused = !0;
    this.interpolationType = c !== void 0 ? c : THREE.AnimationHandler.LINEAR;
    this.JITCompile = e !== void 0 ? e : !0;
    this.points = [];
    this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function(a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = a !== void 0 ? a : !0;
        this.currentTime = b !== void 0 ? b : 0;
        var c, e = this.hierarchy.length,
            g;
        for (c = 0; c < e; c++) {
            g = this.hierarchy[c];
            if (this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD) g.useQuaternion = !0;
            g.matrixAutoUpdate = !0;
            if (g.animationCache === void 0) g.animationCache = {}, g.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, g.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, g.animationCache.originalMatrix = g instanceof
            THREE.Bone ? g.skinMatrix : g.matrix;
            var h = g.animationCache.prevKey;
            g = g.animationCache.nextKey;
            h.pos = this.data.hierarchy[c].keys[0];
            h.rot = this.data.hierarchy[c].keys[0];
            h.scl = this.data.hierarchy[c].keys[0];
            g.pos = this.getNextKeyWith("pos", c, 1);
            g.rot = this.getNextKeyWith("rot", c, 1);
            g.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function() {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function() {
    this.isPaused = this.isPlaying = !1;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.hierarchy.length; a++)
        if (this.hierarchy[a].animationCache !== void 0) this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix = this.hierarchy[a].animationCache.originalMatrix : this.hierarchy[a].matrix = this.hierarchy[a].animationCache.originalMatrix, delete this.hierarchy[a].animationCache
};
THREE.Animation.prototype.update = function(a) {
    if (this.isPlaying) {
        var b = ["pos", "rot", "scl"],
            c, e, g, h, f, k, l, m, n = this.data.JIT.hierarchy,
            o, t;
        this.currentTime += a * this.timeScale;
        t = this.currentTime;
        o = this.currentTime %= this.data.length;
        m = parseInt(Math.min(o * this.data.fps, this.data.length * this.data.fps), 10);
        for (var u = 0, v = this.hierarchy.length; u < v; u++)
            if (a = this.hierarchy[u], l = a.animationCache, this.JITCompile && n[u][m] !== void 0) a instanceof THREE.Bone ? (a.skinMatrix = n[u][m], a.matrixAutoUpdate = !1, a.matrixWorldNeedsUpdate = !1) : (a.matrix = n[u][m], a.matrixAutoUpdate = !1, a.matrixWorldNeedsUpdate = !0);
            else {
                if (this.JITCompile) a instanceof THREE.Bone ? a.skinMatrix = a.animationCache.originalMatrix : a.matrix = a.animationCache.originalMatrix;
                for (var y = 0; y < 3; y++) {
                    c = b[y];
                    f = l.prevKey[c];
                    k = l.nextKey[c];
                    if (k.time <= t) {
                        if (o < t)
                            if (this.loop) {
                                f = this.data.hierarchy[u].keys[0];
                                for (k = this.getNextKeyWith(c, u, 1); k.time < o;) f = k, k = this.getNextKeyWith(c, u, k.index + 1)
                            } else {
                                this.stop();
                                return
                            }
                        else {
                            do f = k, k = this.getNextKeyWith(c, u, k.index + 1); while (k.time <
                                o)
                        }
                        l.prevKey[c] = f;
                        l.nextKey[c] = k
                    }
                    a.matrixAutoUpdate = !0;
                    a.matrixWorldNeedsUpdate = !0;
                    e = (o - f.time) / (k.time - f.time);
                    g = f[c];
                    h = k[c];
                    if (e < 0 || e > 1) console.log("THREE.Animation.update: Warning! Scale out of bounds:" + e + " on bone " + u), e = e < 0 ? 0 : 1;
                    if (c === "pos")
                        if (c = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR) c.x = g[0] + (h[0] - g[0]) * e, c.y = g[1] + (h[1] - g[1]) * e, c.z = g[2] + (h[2] - g[2]) * e;
                        else {
                            if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD)
                                if (this.points[0] =
                                    this.getPrevKeyWith("pos", u, f.index - 1).pos, this.points[1] = g, this.points[2] = h, this.points[3] = this.getNextKeyWith("pos", u, k.index + 1).pos, e = e * 0.33 + 0.33, g = this.interpolateCatmullRom(this.points, e), c.x = g[0], c.y = g[1], c.z = g[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) e = this.interpolateCatmullRom(this.points, e * 1.01), this.target.set(e[0], e[1], e[2]), this.target.subSelf(c), this.target.y = 0, this.target.normalize(), e = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, e, 0)
                        }
                    else if (c ===
                        "rot") THREE.Quaternion.slerp(g, h, a.quaternion, e);
                    else if (c === "scl") c = a.scale, c.x = g[0] + (h[0] - g[0]) * e, c.y = g[1] + (h[1] - g[1]) * e, c.z = g[2] + (h[2] - g[2]) * e
                }
            }
        if (this.JITCompile && n[0][m] === void 0) {
            this.hierarchy[0].update(void 0, !0);
            for (u = 0; u < this.hierarchy.length; u++) n[u][m] = this.hierarchy[u] instanceof THREE.Bone ? this.hierarchy[u].skinMatrix.clone() : this.hierarchy[u].matrix.clone()
        }
    }
};
THREE.Animation.prototype.interpolateCatmullRom = function(a, b) {
    var c = [],
        e = [],
        g, h, f, k, l, m;
    g = (a.length - 1) * b;
    h = Math.floor(g);
    g -= h;
    c[0] = h == 0 ? h : h - 1;
    c[1] = h;
    c[2] = h > a.length - 2 ? h : h + 1;
    c[3] = h > a.length - 3 ? h : h + 2;
    h = a[c[0]];
    k = a[c[1]];
    l = a[c[2]];
    m = a[c[3]];
    c = g * g;
    f = g * c;
    e[0] = this.interpolate(h[0], k[0], l[0], m[0], g, c, f);
    e[1] = this.interpolate(h[1], k[1], l[1], m[1], g, c, f);
    e[2] = this.interpolate(h[2], k[2], l[2], m[2], g, c, f);
    return e
};
THREE.Animation.prototype.interpolate = function(a, b, c, e, g, h, f) {
    a = (c - a) * 0.5;
    e = (e - b) * 0.5;
    return (2 * (b - c) + a + e) * f + (-3 * (b - c) - 2 * a - e) * h + a * g + b
};
THREE.Animation.prototype.getNextKeyWith = function(a, b, c) {
    var e = this.data.hierarchy[b].keys;
    for (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c = c < e.length - 1 ? c : e.length - 1 : c %= e.length; c < e.length; c++)
        if (e[c][a] !== void 0) return e[c];
    return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function(a, b, c) {
    for (var e = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c > 0 ? c : 0 : c >= 0 ? c : c + e.length; c >= 0; c--)
        if (e[c][a] !== void 0) return e[c];
    return this.data.hierarchy[b].keys[e.length - 1]
};
THREE.CubeCamera = function(a, b, c, e) {
    this.cameraPX = new THREE.PerspectiveCamera(90, 1, a, b);
    this.cameraNX = new THREE.PerspectiveCamera(90, 1, a, b);
    this.cameraPY = new THREE.PerspectiveCamera(90, 1, a, b);
    this.cameraNY = new THREE.PerspectiveCamera(90, 1, a, b);
    this.cameraPZ = new THREE.PerspectiveCamera(90, 1, a, b);
    this.cameraNZ = new THREE.PerspectiveCamera(90, 1, a, b);
    this.cameraPXTarget = new THREE.Vector3(0, 0, 0);
    this.cameraNXTarget = new THREE.Vector3(0, 0, 0);
    this.cameraPYTarget = new THREE.Vector3(0, 0, 0);
    this.cameraNYTarget =
        new THREE.Vector3(0, 0, 0);
    this.cameraPZTarget = new THREE.Vector3(0, 0, 0);
    this.cameraNZTarget = new THREE.Vector3(0, 0, 0);
    this.height = c;
    this.position = new THREE.Vector3(0, c, 0);
    this.cameraPX.position = this.position;
    this.cameraNX.position = this.position;
    this.cameraPY.position = this.position;
    this.cameraNY.position = this.position;
    this.cameraPZ.position = this.position;
    this.cameraNZ.position = this.position;
    this.cameraPY.up.set(0, 0, 1);
    this.cameraPZ.up.set(0, -1, 0);
    this.cameraNZ.up.set(0, -1, 0);
    this.renderTarget = new THREE.WebGLRenderTargetCube(e,
        e, {
            format: THREE.RGBFormat,
            magFilter: THREE.LinearFilter,
            minFilter: THREE.LinearFilter
        });
    this.updatePosition = function(a) {
        this.position.x = a.x;
        this.position.z = a.z;
        this.cameraPXTarget.add(this.position, new THREE.Vector3(-1, 0, 0));
        this.cameraNXTarget.add(this.position, new THREE.Vector3(1, 0, 0));
        this.cameraPYTarget.add(this.position, new THREE.Vector3(0, 1, 0));
        this.cameraNYTarget.add(this.position, new THREE.Vector3(0, -1, 0));
        this.cameraPZTarget.add(this.position, new THREE.Vector3(0, 0, 1));
        this.cameraNZTarget.add(this.position,
            new THREE.Vector3(0, 0, -1));
        this.cameraPX.lookAt(this.cameraPXTarget);
        this.cameraNX.lookAt(this.cameraNXTarget);
        this.cameraPY.lookAt(this.cameraPYTarget);
        this.cameraNY.lookAt(this.cameraNYTarget);
        this.cameraPZ.lookAt(this.cameraPZTarget);
        this.cameraNZ.lookAt(this.cameraNZTarget)
    };
    this.updateCubeMap = function(a, c) {
        var b = this.renderTarget;
        a.setFaceCulling("back", "cw");
        c.scale.y = -1;
        c.position.y = 2 * this.height;
        c.updateMatrix();
        b.activeCubeFace = 0;
        a.render(c, this.cameraPX, b);
        b.activeCubeFace = 1;
        a.render(c,
            this.cameraNX, b);
        c.scale.y = 1;
        c.position.y = 0;
        c.updateMatrix();
        c.scale.x = -1;
        c.updateMatrix();
        b.activeCubeFace = 2;
        a.render(c, this.cameraPY, b);
        c.scale.x = 1;
        c.updateMatrix();
        a.setFaceCulling("back", "ccw");
        b.activeCubeFace = 3;
        a.render(c, this.cameraNY, b);
        c.scale.x = -1;
        c.updateMatrix();
        a.setFaceCulling("back", "cw");
        b.activeCubeFace = 4;
        a.render(c, this.cameraPZ, b);
        b.activeCubeFace = 5;
        a.render(c, this.cameraNZ, b);
        c.scale.x = 1;
        c.updateMatrix();
        a.setFaceCulling("back", "ccw")
    }
};
THREE.FirstPersonCamera = function() {
    console.warn("DEPRECATED: FirstPersonCamera() is FirstPersonControls().")
};
THREE.PathCamera = function() {
    console.warn("DEPRECATED: PathCamera() is PathControls().")
};
THREE.FlyCamera = function() {
    console.warn("DEPRECATED: FlyCamera() is FlyControls().")
};
THREE.RollCamera = function() {
    console.warn("DEPRECATED: RollCamera() is RollControls().")
};
THREE.TrackballCamera = function() {
    console.warn("DEPRECATED: TrackballCamera() is TrackballControls().")
};
THREE.CombinedCamera = function(a, b, c, e, g, h, f) {
    THREE.Camera.call(this);
    this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, h, f);
    this.cameraP = new THREE.PerspectiveCamera(c, a / b, e, g);
    this.toPerspective()
};
THREE.CombinedCamera.prototype = new THREE.Camera;
THREE.CombinedCamera.prototype.constructor = THREE.CoolCamera;
THREE.CombinedCamera.prototype.toPerspective = function() {
    this.near = this.cameraP.near;
    this.far = this.cameraP.far;
    this.projectionMatrix = this.cameraP.projectionMatrix
};
THREE.CombinedCamera.prototype.toOrthographic = function() {
    this.near = this.cameraO.near;
    this.far = this.cameraO.far;
    this.projectionMatrix = this.cameraO.projectionMatrix
};
THREE.CombinedCamera.prototype.setFov = function(a) {
    this.cameraP.fov = a;
    this.cameraP.updateProjectionMatrix();
    this.toPerspective()
};
THREE.CombinedCamera.prototype.setLens = function(a, b) {
    b || (b = 43.25);
    var c = 2 * Math.atan(b / (a * 2));
    c *= 180 / Math.PI;
    this.setFov(c);
    return c
};
THREE.FirstPersonControls = function(a, b) {
    function c(a, c) {
        return function() {
            c.apply(a, arguments)
        }
    }
    this.object = a;
    this.target = new THREE.Vector3(0, 0, 0);
    this.domElement = b !== void 0 ? b : document;
    this.movementSpeed = 1;
    this.lookSpeed = 0.005;
    this.noFly = !1;
    this.lookVertical = !0;
    this.autoForward = !1;
    this.activeLook = !0;
    this.heightSpeed = !1;
    this.heightCoef = 1;
    this.heightMin = 0;
    this.constrainVertical = !1;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;
    this.lastUpdate = (new Date).getTime();
    this.theta = this.phi = this.lon = this.lat =
        this.mouseY = this.mouseX = this.autoSpeedFactor = this.tdiff = 0;
    this.mouseDragOn = this.freeze = this.moveRight = this.moveLeft = this.moveBackward = this.moveForward = !1;
    this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX = this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    this.onMouseDown = function(a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook) switch (a.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
        }
        this.mouseDragOn = !0
    };
    this.onMouseUp = function(a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook) switch (a.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.mouseDragOn = !1
    };
    this.onMouseMove = function(a) {
        this.domElement === document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY =
            a.pageY - this.domElement.offsetTop - this.viewHalfY)
    };
    this.onKeyDown = function(a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                this.moveForward = !0;
                break;
            case 37:
            case 65:
                this.moveLeft = !0;
                break;
            case 40:
            case 83:
                this.moveBackward = !0;
                break;
            case 39:
            case 68:
                this.moveRight = !0;
                break;
            case 82:
                this.moveUp = !0;
                break;
            case 70:
                this.moveDown = !0;
                break;
            case 81:
                this.freeze = !this.freeze
        }
    };
    this.onKeyUp = function(a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                this.moveForward = !1;
                break;
            case 37:
            case 65:
                this.moveLeft = !1;
                break;
            case 40:
            case 83:
                this.moveBackward = !1;
                break;
            case 39:
            case 68:
                this.moveRight = !1;
                break;
            case 82:
                this.moveUp = !1;
                break;
            case 70:
                this.moveDown = !1
        }
    };
    this.update = function() {
        var a = (new Date).getTime();
        this.tdiff = (a - this.lastUpdate) / 1E3;
        this.lastUpdate = a;
        if (!this.freeze) {
            this.autoSpeedFactor = this.heightSpeed ? this.tdiff * ((this.object.position.y < this.heightMin ? this.heightMin : this.object.position.y > this.heightMax ? this.heightMax : this.object.position.y) - this.heightMin) * this.heightCoef : 0;
            var c = this.tdiff * this.movementSpeed;
            (this.moveForward || this.autoForward &&
                !this.moveBackward) && this.object.translateZ(-(c + this.autoSpeedFactor));
            this.moveBackward && this.object.translateZ(c);
            this.moveLeft && this.object.translateX(-c);
            this.moveRight && this.object.translateX(c);
            this.moveUp && this.object.translateY(c);
            this.moveDown && this.object.translateY(-c);
            c = this.tdiff * this.lookSpeed;
            this.activeLook || (c = 0);
            this.lon += this.mouseX * c;
            this.lookVertical && (this.lat -= this.mouseY * c);
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = (90 - this.lat) * Math.PI / 180;
            this.theta = this.lon *
                Math.PI / 180;
            var a = this.target,
                b = this.object.position;
            a.x = b.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            a.y = b.y + 100 * Math.cos(this.phi);
            a.z = b.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)
        }
        a = 1;
        this.constrainVertical && (a = Math.PI / (this.verticalMax - this.verticalMin));
        this.lon += this.mouseX * c;
        this.lookVertical && (this.lat -= this.mouseY * c * a);
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;
        this.theta = this.lon * Math.PI / 180;
        if (this.constrainVertical) this.phi = (this.phi - 0) * (this.verticalMax -
            this.verticalMin) / (Math.PI - 0) + this.verticalMin;
        a = this.target;
        b = this.object.position;
        a.x = b.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        a.y = b.y + 100 * Math.cos(this.phi);
        a.z = b.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.object.lookAt(a)
    };
    this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", c(this, this.onMouseMove), !1);
    this.domElement.addEventListener("mousedown", c(this, this.onMouseDown), !1);
    this.domElement.addEventListener("mouseup",
        c(this, this.onMouseUp), !1);
    this.domElement.addEventListener("keydown", c(this, this.onKeyDown), !1);
    this.domElement.addEventListener("keyup", c(this, this.onKeyUp), !1)
};
THREE.PathControls = function(a, b) {
    function c(a) {
        if ((a *= 2) < 1) return 0.5 * a * a;
        return -0.5 * (--a * (a - 2) - 1)
    }

    function e(a, c) {
        return function() {
            c.apply(a, arguments)
        }
    }

    function g(a, c, b, e) {
        var f = {
                name: b,
                fps: 0.6,
                length: e,
                hierarchy: []
            },
            h, g = c.getControlPointsArray(),
            k = c.getLength(),
            p = g.length,
            z = 0;
        h = p - 1;
        c = {
            parent: -1,
            keys: []
        };
        c.keys[0] = {
            time: 0,
            pos: g[0],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        c.keys[h] = {
            time: e,
            pos: g[h],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        for (h = 1; h < p - 1; h++) z = e * k.chunks[h] / k.total, c.keys[h] = {
            time: z,
            pos: g[h]
        };
        f.hierarchy[0] =
            c;
        THREE.AnimationHandler.add(f);
        return new THREE.Animation(a, b, THREE.AnimationHandler.CATMULLROM_FORWARD, !1)
    }

    function h(a, c) {
        var b, e, f = new THREE.Geometry;
        for (b = 0; b < a.points.length * c; b++) e = b / (a.points.length * c), e = a.getPoint(e), f.vertices[b] = new THREE.Vertex(new THREE.Vector3(e.x, e.y, e.z));
        return f
    }
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.id = "PathControls" + THREE.PathControlsIdCounter++;
    this.duration = 1E4;
    this.waypoints = [];
    this.useConstantSpeed = !0;
    this.resamplingCoef = 50;
    this.debugPath =
        new THREE.Object3D;
    this.debugDummy = new THREE.Object3D;
    this.animationParent = new THREE.Object3D;
    this.lookSpeed = 0.005;
    this.lookHorizontal = this.lookVertical = !0;
    this.verticalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.horizontalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.target = new THREE.Object3D;
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
    this.domElement === document ? (this.viewHalfX = window.innerWidth / 2, this.viewHalfY = window.innerHeight / 2) : (this.viewHalfX =
        this.domElement.offsetWidth / 2, this.viewHalfY = this.domElement.offsetHeight / 2, this.domElement.setAttribute("tabindex", -1));
    var f = Math.PI * 2,
        k = Math.PI / 180;
    this.update = function() {
        var a, b;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed);
        this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed);
        this.lon = Math.max(0, Math.min(360, this.lon));
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * k;
        this.theta = this.lon * k;
        a = this.phi % f;
        this.phi = a >= 0 ? a : a + f;
        a = this.verticalAngleMap.srcRange;
        b = this.verticalAngleMap.dstRange;
        var e = b[1] - b[0];
        this.phi = c(((this.phi - a[0]) * (b[1] - b[0]) / (a[1] - a[0]) + b[0] - b[0]) / e) * e + b[0];
        a = this.horizontalAngleMap.srcRange;
        b = this.horizontalAngleMap.dstRange;
        e = b[1] - b[0];
        this.theta = c(((this.theta - a[0]) * (b[1] - b[0]) / (a[1] - a[0]) + b[0] - b[0]) / e) * e + b[0];
        a = this.target.position;
        a.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        a.y = 100 * Math.cos(this.phi);
        a.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.object.lookAt(this.target.position)
    };
    this.onMouseMove = function(a) {
        this.domElement ===
            document ? (this.mouseX = a.pageX - this.viewHalfX, this.mouseY = a.pageY - this.viewHalfY) : (this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX, this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY)
    };
    this.init = function() {
        this.spline = new THREE.Spline;
        this.spline.initFromArray(this.waypoints);
        this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
        if (this.createDebugDummy) {
            var a = new THREE.MeshLambertMaterial({
                    color: 30719
                }),
                c = new THREE.MeshLambertMaterial({
                    color: 65280
                }),
                b = new THREE.CubeGeometry(10, 10, 20),
                f = new THREE.CubeGeometry(2, 2, 10);
            this.animationParent = new THREE.Mesh(b, a);
            a = new THREE.Mesh(f, c);
            a.position.set(0, 10, 0);
            this.animation = g(this.animationParent, this.spline, this.id, this.duration);
            this.animationParent.add(this.object);
            this.animationParent.add(this.target);
            this.animationParent.add(a)
        } else this.animation = g(this.animationParent, this.spline, this.id, this.duration), this.animationParent.add(this.target), this.animationParent.add(this.object);
        if (this.createDebugPath) {
            var a =
                this.debugPath,
                c = this.spline,
                b = h(c, 10),
                f = h(c, 10),
                k = new THREE.LineBasicMaterial({
                    color: 16711680,
                    linewidth: 3
                });
            lineObj = new THREE.Line(b, k);
            particleObj = new THREE.ParticleSystem(f, new THREE.ParticleBasicMaterial({
                color: 16755200,
                size: 3
            }));
            lineObj.scale.set(1, 1, 1);
            a.add(lineObj);
            particleObj.scale.set(1, 1, 1);
            a.add(particleObj);
            f = new THREE.SphereGeometry(1, 16, 8);
            k = new THREE.MeshBasicMaterial({
                color: 65280
            });
            for (i = 0; i < c.points.length; i++) b = new THREE.Mesh(f, k), b.position.copy(c.points[i]), a.add(b)
        }
        this.domElement.addEventListener("mousemove",
            e(this, this.onMouseMove), !1)
    }
};
THREE.PathControlsIdCounter = 0;
THREE.FlyControls = function(a, b) {
    function c(a, c) {
        return function() {
            c.apply(a, arguments)
        }
    }
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    b && this.domElement.setAttribute("tabindex", -1);
    this.movementSpeed = 1;
    this.rollSpeed = 0.005;
    this.autoForward = this.dragToLook = !1;
    this.object.useQuaternion = !0;
    this.tmpQuaternion = new THREE.Quaternion;
    this.mouseStatus = 0;
    this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    };
    this.moveVector = new THREE.Vector3(0,
        0, 0);
    this.rotationVector = new THREE.Vector3(0, 0, 0);
    this.lastUpdate = -1;
    this.tdiff = 0;
    this.handleEvent = function(a) {
        if (typeof this[a.type] == "function") this[a.type](a)
    };
    this.keydown = function(a) {
        if (!a.altKey) {
            switch (a.keyCode) {
                case 16:
                    this.movementSpeedMultiplier = 0.1;
                    break;
                case 87:
                    this.moveState.forward = 1;
                    break;
                case 83:
                    this.moveState.back = 1;
                    break;
                case 65:
                    this.moveState.left = 1;
                    break;
                case 68:
                    this.moveState.right = 1;
                    break;
                case 82:
                    this.moveState.up = 1;
                    break;
                case 70:
                    this.moveState.down = 1;
                    break;
                case 38:
                    this.moveState.pitchUp =
                        1;
                    break;
                case 40:
                    this.moveState.pitchDown = 1;
                    break;
                case 37:
                    this.moveState.yawLeft = 1;
                    break;
                case 39:
                    this.moveState.yawRight = 1;
                    break;
                case 81:
                    this.moveState.rollLeft = 1;
                    break;
                case 69:
                    this.moveState.rollRight = 1
            }
            this.updateMovementVector();
            this.updateRotationVector()
        }
    };
    this.keyup = function(a) {
        switch (a.keyCode) {
            case 16:
                this.movementSpeedMultiplier = 1;
                break;
            case 87:
                this.moveState.forward = 0;
                break;
            case 83:
                this.moveState.back = 0;
                break;
            case 65:
                this.moveState.left = 0;
                break;
            case 68:
                this.moveState.right = 0;
                break;
            case 82:
                this.moveState.up =
                    0;
                break;
            case 70:
                this.moveState.down = 0;
                break;
            case 38:
                this.moveState.pitchUp = 0;
                break;
            case 40:
                this.moveState.pitchDown = 0;
                break;
            case 37:
                this.moveState.yawLeft = 0;
                break;
            case 39:
                this.moveState.yawRight = 0;
                break;
            case 81:
                this.moveState.rollLeft = 0;
                break;
            case 69:
                this.moveState.rollRight = 0
        }
        this.updateMovementVector();
        this.updateRotationVector()
    };
    this.mousedown = function(a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus++;
        else switch (a.button) {
            case 0:
                this.object.moveForward = !0;
                break;
            case 2:
                this.object.moveBackward = !0
        }
    };
    this.mousemove = function(a) {
        if (!this.dragToLook || this.mouseStatus > 0) {
            var c = this.getContainerDimensions(),
                b = c.size[0] / 2,
                f = c.size[1] / 2;
            this.moveState.yawLeft = -(a.pageX - c.offset[0] - b) / b;
            this.moveState.pitchDown = (a.pageY - c.offset[1] - f) / f;
            this.updateRotationVector()
        }
    };
    this.mouseup = function(a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus--, this.moveState.yawLeft = this.moveState.pitchDown = 0;
        else switch (a.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.updateRotationVector()
    };
    this.update = function() {
        var a = (new Date).getTime();
        if (this.lastUpdate == -1) this.lastUpdate = a;
        this.tdiff = (a - this.lastUpdate) / 1E3;
        this.lastUpdate = a;
        var a = this.tdiff * this.movementSpeed,
            c = this.tdiff * this.rollSpeed;
        this.object.translateX(this.moveVector.x * a);
        this.object.translateY(this.moveVector.y * a);
        this.object.translateZ(this.moveVector.z * a);
        this.tmpQuaternion.set(this.rotationVector.x * c, this.rotationVector.y * c, this.rotationVector.z * c,
            1).normalize();
        this.object.quaternion.multiplySelf(this.tmpQuaternion);
        this.object.matrix.setPosition(this.object.position);
        this.object.matrix.setRotationFromQuaternion(this.object.quaternion);
        this.object.matrixWorldNeedsUpdate = !0
    };
    this.updateMovementVector = function() {
        var a = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right;
        this.moveVector.y = -this.moveState.down + this.moveState.up;
        this.moveVector.z = -a + this.moveState.back
    };
    this.updateRotationVector = function() {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
        this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
        this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
    };
    this.getContainerDimensions = function() {
        return this.domElement != document ? {
            size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
            offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
        } : {
            size: [window.innerWidth, window.innerHeight],
            offset: [0,
                0
            ]
        }
    };
    this.domElement.addEventListener("mousemove", c(this, this.mousemove), !1);
    this.domElement.addEventListener("mousedown", c(this, this.mousedown), !1);
    this.domElement.addEventListener("mouseup", c(this, this.mouseup), !1);
    this.domElement.addEventListener("keydown", c(this, this.keydown), !1);
    this.domElement.addEventListener("keyup", c(this, this.keyup), !1);
    this.updateMovementVector();
    this.updateRotationVector()
};
THREE.RollControls = function(a, b) {
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.mouseLook = !0;
    this.autoForward = !1;
    this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
    this.constrainVertical = [-0.9, 0.9];
    this.object.matrixAutoUpdate = !1;
    this.forward = new THREE.Vector3(0, 0, 1);
    this.roll = 0;
    this.lastUpdate = -1;
    this.delta = 0;
    var c = new THREE.Vector3,
        e = new THREE.Vector3,
        g = new THREE.Vector3,
        h = new THREE.Matrix4,
        f = !1,
        k = 1,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        t = 0,
        u = window.innerWidth / 2,
        v = window.innerHeight / 2;
    this.update = function() {
        var a =
            (new Date).getTime();
        if (this.lastUpdate == -1) this.lastUpdate = a;
        this.delta = (a - this.lastUpdate) / 1E3;
        this.lastUpdate = a;
        this.mouseLook && (a = this.delta * this.lookSpeed, this.rotateHorizontally(a * o), this.rotateVertically(a * t));
        a = this.delta * this.movementSpeed;
        this.object.translateZ(-a * (l > 0 || this.autoForward && !(l < 0) ? 1 : l));
        this.object.translateX(a * m);
        this.object.translateY(a * n);
        f && (this.roll += this.rollSpeed * this.delta * k);
        if (this.forward.y > this.constrainVertical[1]) this.forward.y = this.constrainVertical[1], this.forward.normalize();
        else if (this.forward.y < this.constrainVertical[0]) this.forward.y = this.constrainVertical[0], this.forward.normalize();
        g.copy(this.forward);
        e.set(0, 1, 0);
        c.cross(e, g).normalize();
        e.cross(g, c).normalize();
        this.object.matrix.n11 = c.x;
        this.object.matrix.n12 = e.x;
        this.object.matrix.n13 = g.x;
        this.object.matrix.n21 = c.y;
        this.object.matrix.n22 = e.y;
        this.object.matrix.n23 = g.y;
        this.object.matrix.n31 = c.z;
        this.object.matrix.n32 = e.z;
        this.object.matrix.n33 = g.z;
        h.identity();
        h.n11 = Math.cos(this.roll);
        h.n12 = -Math.sin(this.roll);
        h.n21 = Math.sin(this.roll);
        h.n22 = Math.cos(this.roll);
        this.object.matrix.multiplySelf(h);
        this.object.matrixWorldNeedsUpdate = !0;
        this.object.matrix.n14 = this.object.position.x;
        this.object.matrix.n24 = this.object.position.y;
        this.object.matrix.n34 = this.object.position.z
    };
    this.translateX = function(a) {
        this.object.position.x += this.object.matrix.n11 * a;
        this.object.position.y += this.object.matrix.n21 * a;
        this.object.position.z += this.object.matrix.n31 * a
    };
    this.translateY = function(a) {
        this.object.position.x += this.object.matrix.n12 *
            a;
        this.object.position.y += this.object.matrix.n22 * a;
        this.object.position.z += this.object.matrix.n32 * a
    };
    this.translateZ = function(a) {
        this.object.position.x -= this.object.matrix.n13 * a;
        this.object.position.y -= this.object.matrix.n23 * a;
        this.object.position.z -= this.object.matrix.n33 * a
    };
    this.rotateHorizontally = function(a) {
        c.set(this.object.matrix.n11, this.object.matrix.n21, this.object.matrix.n31);
        c.multiplyScalar(a);
        this.forward.subSelf(c);
        this.forward.normalize()
    };
    this.rotateVertically = function(a) {
        e.set(this.object.matrix.n12,
            this.object.matrix.n22, this.object.matrix.n32);
        e.multiplyScalar(a);
        this.forward.addSelf(e);
        this.forward.normalize()
    };
    this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", function(a) {
        o = (a.clientX - u) / window.innerWidth;
        t = (a.clientY - v) / window.innerHeight
    }, !1);
    this.domElement.addEventListener("mousedown", function(a) {
        a.preventDefault();
        a.stopPropagation();
        switch (a.button) {
            case 0:
                l = 1;
                break;
            case 2:
                l = -1
        }
    }, !1);
    this.domElement.addEventListener("mouseup",
        function(a) {
            a.preventDefault();
            a.stopPropagation();
            switch (a.button) {
                case 0:
                    l = 0;
                    break;
                case 2:
                    l = 0
            }
        }, !1);
    this.domElement.addEventListener("keydown", function(a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                l = 1;
                break;
            case 37:
            case 65:
                m = -1;
                break;
            case 40:
            case 83:
                l = -1;
                break;
            case 39:
            case 68:
                m = 1;
                break;
            case 81:
                f = !0;
                k = 1;
                break;
            case 69:
                f = !0;
                k = -1;
                break;
            case 82:
                n = 1;
                break;
            case 70:
                n = -1
        }
    }, !1);
    this.domElement.addEventListener("keyup", function(a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                l = 0;
                break;
            case 37:
            case 65:
                m = 0;
                break;
            case 40:
            case 83:
                l =
                    0;
                break;
            case 39:
            case 68:
                m = 0;
                break;
            case 81:
                f = !1;
                break;
            case 69:
                f = !1;
                break;
            case 82:
                n = 0;
                break;
            case 70:
                n = 0
        }
    }, !1)
};
THREE.TrackballControls = function(a, b) {
    function c(a, c) {
        return function() {
            c.apply(a, arguments)
        }
    }
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.screen = {
        width: window.innerWidth,
        height: window.innerHeight,
        offsetLeft: 0,
        offsetTop: 0
    };
    this.radius = (this.screen.width + this.screen.height) / 4;
    this.rotateSpeed = 1;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;
    this.staticMoving = this.noPan = this.noZoom = !1;
    this.dynamicDampingFactor = 0.2;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.keys = [65, 83, 68];
    this.target = new THREE.Vector3(0,
        0, 0);
    var e = !1,
        g = this.STATE.NONE,
        h = new THREE.Vector3,
        f = new THREE.Vector3,
        k = new THREE.Vector3,
        l = new THREE.Vector2,
        m = new THREE.Vector2,
        n = new THREE.Vector2,
        o = new THREE.Vector2;
    this.handleEvent = function(a) {
        if (typeof this[a.type] == "function") this[a.type](a)
    };
    this.getMouseOnScreen = function(a, c) {
        return new THREE.Vector2((a - this.screen.offsetLeft) / this.radius * 0.5, (c - this.screen.offsetTop) / this.radius * 0.5)
    };
    this.getMouseProjectionOnBall = function(a, c) {
        var b = new THREE.Vector3((a - this.screen.width * 0.5 - this.screen.offsetLeft) /
                this.radius, (this.screen.height * 0.5 + this.screen.offsetTop - c) / this.radius, 0),
            e = b.length();
        e > 1 ? b.normalize() : b.z = Math.sqrt(1 - e * e);
        h.copy(this.object.position).subSelf(this.target);
        e = this.object.up.clone().setLength(b.y);
        e.addSelf(this.object.up.clone().crossSelf(h).setLength(b.x));
        e.addSelf(h.setLength(b.z));
        return e
    };
    this.rotateCamera = function() {
        var a = Math.acos(f.dot(k) / f.length() / k.length());
        if (a) {
            var c = (new THREE.Vector3).cross(f, k).normalize(),
                b = new THREE.Quaternion;
            a *= this.rotateSpeed;
            b.setFromAxisAngle(c, -a);
            b.multiplyVector3(h);
            b.multiplyVector3(this.object.up);
            b.multiplyVector3(k);
            this.staticMoving ? f = k : (b.setFromAxisAngle(c, a * (this.dynamicDampingFactor - 1)), b.multiplyVector3(f))
        }
    };
    this.zoomCamera = function() {
        var a = 1 + (m.y - l.y) * this.zoomSpeed;
        a !== 1 && a > 0 && (h.multiplyScalar(a), this.staticMoving ? l = m : l.y += (m.y - l.y) * this.dynamicDampingFactor)
    };
    this.panCamera = function() {
        var a = o.clone().subSelf(n);
        if (a.lengthSq()) {
            a.multiplyScalar(h.length() * this.panSpeed);
            var c = h.clone().crossSelf(this.object.up).setLength(a.x);
            c.addSelf(this.object.up.clone().setLength(a.y));
            this.object.position.addSelf(c);
            this.target.addSelf(c);
            this.staticMoving ? n = o : n.addSelf(a.sub(o, n).multiplyScalar(this.dynamicDampingFactor))
        }
    };
    this.checkDistances = function() {
        if (!this.noZoom || !this.noPan) this.object.position.lengthSq() > this.maxDistance * this.maxDistance && this.object.position.setLength(this.maxDistance), h.lengthSq() < this.minDistance * this.minDistance && this.object.position.add(this.target, h.setLength(this.minDistance))
    };
    this.update = function() {
        h.copy(this.object.position).subSelf(this.target);
        this.rotateCamera();
        this.noZoom || this.zoomCamera();
        this.noPan || this.panCamera();
        this.object.position.add(this.target, h);
        this.checkDistances();
        this.object.lookAt(this.target)
    };
    this.domElement.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", c(this, function(a) {
        e && (f = k = this.getMouseProjectionOnBall(a.clientX, a.clientY), l = m = this.getMouseOnScreen(a.clientX, a.clientY), n = o = this.getMouseOnScreen(a.clientX, a.clientY), e = !1);
        g !== this.STATE.NONE &&
            (g === this.STATE.ROTATE ? k = this.getMouseProjectionOnBall(a.clientX, a.clientY) : g === this.STATE.ZOOM && !this.noZoom ? m = this.getMouseOnScreen(a.clientX, a.clientY) : g === this.STATE.PAN && !this.noPan && (o = this.getMouseOnScreen(a.clientX, a.clientY)))
    }), !1);
    this.domElement.addEventListener("mousedown", c(this, function(a) {
        a.preventDefault();
        a.stopPropagation();
        if (g === this.STATE.NONE) g = a.button, g === this.STATE.ROTATE ? f = k = this.getMouseProjectionOnBall(a.clientX, a.clientY) : g === this.STATE.ZOOM && !this.noZoom ? l = m = this.getMouseOnScreen(a.clientX,
            a.clientY) : this.noPan || (n = o = this.getMouseOnScreen(a.clientX, a.clientY))
    }), !1);
    this.domElement.addEventListener("mouseup", c(this, function(a) {
        a.preventDefault();
        a.stopPropagation();
        g = this.STATE.NONE
    }), !1);
    window.addEventListener("keydown", c(this, function(a) {
        if (g === this.STATE.NONE) {
            if (a.keyCode === this.keys[this.STATE.ROTATE]) g = this.STATE.ROTATE;
            else if (a.keyCode === this.keys[this.STATE.ZOOM] && !this.noZoom) g = this.STATE.ZOOM;
            else if (a.keyCode === this.keys[this.STATE.PAN] && !this.noPan) g = this.STATE.PAN;
            g !==
                this.STATE.NONE && (e = !0)
        }
    }), !1);
    window.addEventListener("keyup", c(this, function() {
        if (g !== this.STATE.NONE) g = this.STATE.NONE
    }), !1)
};
THREE.TrackballControls.prototype.STATE = {
    NONE: -1,
    ROTATE: 0,
    ZOOM: 1,
    PAN: 2
};
THREE.CubeGeometry = function(a, b, c, e, g, h, f, k) {
    function l(a, c, b, f, k, l, o, n) {
        var u, t, v = e || 1,
            J = g || 1,
            C = k / 2,
            F = l / 2,
            K = m.vertices.length;
        if (a == "x" && c == "y" || a == "y" && c == "x") u = "z";
        else if (a == "x" && c == "z" || a == "z" && c == "x") u = "y", J = h || 1;
        else if (a == "z" && c == "y" || a == "y" && c == "z") u = "x", v = h || 1;
        var M = v + 1,
            N = J + 1;
        k /= v;
        var L = l / J;
        for (t = 0; t < N; t++)
            for (l = 0; l < M; l++) {
                var O = new THREE.Vector3;
                O[a] = (l * k - C) * b;
                O[c] = (t * L - F) * f;
                O[u] = o;
                m.vertices.push(new THREE.Vertex(O))
            }
        for (t = 0; t < J; t++)
            for (l = 0; l < v; l++) m.faces.push(new THREE.Face4(l + M * t + K,
                l + M * (t + 1) + K, l + 1 + M * (t + 1) + K, l + 1 + M * t + K, null, null, n)), m.faceVertexUvs[0].push([new THREE.UV(l / v, t / J), new THREE.UV(l / v, (t + 1) / J), new THREE.UV((l + 1) / v, (t + 1) / J), new THREE.UV((l + 1) / v, t / J)])
    }
    THREE.Geometry.call(this);
    var m = this,
        n = a / 2,
        o = b / 2,
        t = c / 2;
    if (f !== void 0)
        if (f instanceof Array) this.materials = f;
        else {
            this.materials = [];
            for (var u = 0; u < 6; u++) this.materials.push([f])
        }
    else this.materials = [];
    this.sides = {
        px: !0,
        nx: !0,
        py: !0,
        ny: !0,
        pz: !0,
        nz: !0
    };
    if (k != void 0)
        for (var v in k) this.sides[v] != void 0 && (this.sides[v] = k[v]);
    this.sides.px && l("z", "y", -1, -1, c, b, n, this.materials[0]);
    this.sides.nx && l("z", "y", 1, -1, c, b, -n, this.materials[1]);
    this.sides.py && l("x", "z", 1, 1, a, c, o, this.materials[2]);
    this.sides.ny && l("x", "z", 1, -1, a, c, -o, this.materials[3]);
    this.sides.pz && l("x", "y", 1, -1, a, b, t, this.materials[4]);
    this.sides.nz && l("x", "y", -1, -1, a, b, -t, this.materials[5]);
    this.mergeVertices();
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.CubeGeometry.prototype = new THREE.Geometry;
THREE.CubeGeometry.prototype.constructor = THREE.CubeGeometry;
THREE.CylinderGeometry = function(a, b, c, e, g, h) {
    THREE.Geometry.call(this);
    var a = a != null ? a : 20,
        b = b != null ? b : 20,
        c = c || 100,
        f = c / 2,
        e = e || 8,
        g = g || 1,
        k, l, m = [],
        n = [];
    for (l = 0; l <= g; l++) {
        var o = [],
            t = [],
            u = l / g,
            v = u * (b - a) + a;
        for (k = 0; k <= e; k++) {
            var y = k / e;
            this.vertices.push(new THREE.Vertex(new THREE.Vector3(v * Math.sin(y * Math.PI * 2), -u * c + f, v * Math.cos(y * Math.PI * 2))));
            o.push(this.vertices.length - 1);
            t.push(new THREE.UV(y, u))
        }
        m.push(o);
        n.push(t)
    }
    for (l = 0; l < g; l++)
        for (k = 0; k < e; k++) {
            var c = m[l][k],
                o = m[l + 1][k],
                t = m[l + 1][k + 1],
                u = m[l][k + 1],
                v =
                this.vertices[c].position.clone().setY(0).normalize(),
                y = this.vertices[o].position.clone().setY(0).normalize(),
                p = this.vertices[t].position.clone().setY(0).normalize(),
                z = this.vertices[u].position.clone().setY(0).normalize(),
                w = n[l][k].clone(),
                x = n[l + 1][k].clone(),
                A = n[l + 1][k + 1].clone(),
                D = n[l][k + 1].clone();
            this.faces.push(new THREE.Face4(c, o, t, u, [v, y, p, z]));
            this.faceVertexUvs[0].push([w, x, A, D])
        }
    if (!h && a > 0) {
        this.vertices.push(new THREE.Vertex(new THREE.Vector3(0, f, 0)));
        for (k = 0; k < e; k++) c = m[0][k], o = m[0][k +
            1
        ], t = this.vertices.length - 1, v = new THREE.Vector3(0, 1, 0), y = new THREE.Vector3(0, 1, 0), p = new THREE.Vector3(0, 1, 0), w = n[0][k].clone(), x = n[0][k + 1].clone(), A = new THREE.UV(x.u, 0), this.faces.push(new THREE.Face3(c, o, t, [v, y, p])), this.faceVertexUvs[0].push([w, x, A])
    }
    if (!h && b > 0) {
        this.vertices.push(new THREE.Vertex(new THREE.Vector3(0, -f, 0)));
        for (k = 0; k < e; k++) c = m[l][k + 1], o = m[l][k], t = this.vertices.length - 1, v = new THREE.Vector3(0, -1, 0), y = new THREE.Vector3(0, -1, 0), p = new THREE.Vector3(0, -1, 0), w = n[l][k + 1].clone(), x = n[l][k].clone(),
            A = new THREE.UV(x.u, 1), this.faces.push(new THREE.Face3(c, o, t, [v, y, p])), this.faceVertexUvs[0].push([w, x, A])
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = new THREE.Geometry;
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.ExtrudeGeometry = function(a, b) {
    if (typeof a != "undefined") {
        THREE.Geometry.call(this);
        var a = a instanceof Array ? a : [a],
            c, e = a.length,
            g;
        this.shapebb = a[e - 1].getBoundingBox();
        for (c = 0; c < e; c++) g = a[c], this.addShape(g, b);
        this.computeCentroids();
        this.computeFaceNormals()
    }
};
THREE.ExtrudeGeometry.prototype = new THREE.Geometry;
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShape = function(a, b) {
    function c(a, c, b) {
        c || console.log("die");
        return c.clone().multiplyScalar(b).addSelf(a)
    }

    function e(a, c, b) {
        var e = THREE.ExtrudeGeometry.__v1,
            f = THREE.ExtrudeGeometry.__v2,
            h = THREE.ExtrudeGeometry.__v3,
            g = THREE.ExtrudeGeometry.__v4,
            k = THREE.ExtrudeGeometry.__v5,
            l = THREE.ExtrudeGeometry.__v6;
        e.set(a.x - c.x, a.y - c.y);
        f.set(a.x - b.x, a.y - b.y);
        e = e.normalize();
        f = f.normalize();
        h.set(-e.y, e.x);
        g.set(f.y, -f.x);
        k.copy(a).addSelf(h);
        l.copy(a).addSelf(g);
        if (k.equals(l)) return g.clone();
        k.copy(c).addSelf(h);
        l.copy(b).addSelf(g);
        h = e.dot(g);
        g = l.subSelf(k).dot(g);
        h == 0 && (console.log("Either infinite or no solutions!"), g == 0 ? console.log("Its finite solutions.") : console.log("Too bad, no solutions."));
        g /= h;
        if (g < 0) return c = Math.atan2(c.y - a.y, c.x - a.x), a = Math.atan2(b.y - a.y, b.x - a.x), c > a && (a += Math.PI * 2), anglec = (c + a) / 2, new THREE.Vector2(-Math.cos(anglec), -Math.sin(anglec));
        return e.multiplyScalar(g).addSelf(k).subSelf(a).clone()
    }

    function g(a) {
        for (C = a.length; --C >= 0;) {
            T = C;
            R = C - 1;
            R < 0 && (R = a.length -
                1);
            for (var c = 0, b = u + n * 2, c = 0; c < b; c++) {
                var e = O * c,
                    f = O * (c + 1),
                    h = Q + T + e,
                    g = Q + T + f,
                    m = h,
                    e = Q + R + e,
                    f = Q + R + f,
                    o = g;
                m += J;
                e += J;
                f += J;
                o += J;
                H.faces.push(new THREE.Face4(m, e, f, o, null, null, A));
                A && (m = c / b, e = (c + 1) / b, f = k + l * 2, h = (H.vertices[h].position.z + l) / f, g = (H.vertices[g].position.z + l) / f, H.faceVertexUvs[0].push([new THREE.UV(h, m), new THREE.UV(g, m), new THREE.UV(g, e), new THREE.UV(h, e)]))
            }
        }
    }

    function h(a, c, b) {
        H.vertices.push(new THREE.Vertex(new THREE.Vector3(a, c, b)))
    }

    function f(a, c, b) {
        a += J;
        c += J;
        b += J;
        H.faces.push(new THREE.Face3(a,
            c, b, null, null, x));
        if (x) {
            var e = D.maxY,
                f = D.maxX,
                h = H.vertices[c].position.x,
                c = H.vertices[c].position.y,
                g = H.vertices[b].position.x,
                b = H.vertices[b].position.y;
            H.faceVertexUvs[0].push([new THREE.UV(H.vertices[a].position.x / f, H.vertices[a].position.y / e), new THREE.UV(h / f, c / e), new THREE.UV(g / f, b / e)])
        }
    }
    var k = b.amount !== void 0 ? b.amount : 100,
        l = b.bevelThickness !== void 0 ? b.bevelThickness : 6,
        m = b.bevelSize !== void 0 ? b.bevelSize : l - 2,
        n = b.bevelSegments !== void 0 ? b.bevelSegments : 3,
        o = b.bevelEnabled !== void 0 ? b.bevelEnabled :
        !0,
        t = b.curveSegments !== void 0 ? b.curveSegments : 12,
        u = b.steps !== void 0 ? b.steps : 1,
        v = b.bendPath,
        y = b.extrudePath,
        p, z = !1,
        w = b.useSpacedPoints !== void 0 ? b.useSpacedPoints : !1,
        x = b.material,
        A = b.extrudeMaterial,
        D = this.shapebb;
    if (y) p = y.getPoints(t), u = p.length, z = !0, o = !1;
    o || (m = l = n = 0);
    var B, E, I, H = this,
        J = this.vertices.length;
    v && a.addWrapPath(v);
    t = w ? a.extractAllSpacedPoints(t) : a.extractAllPoints(t);
    v = t.shape;
    t = t.holes;
    if (y = !THREE.Shape.Utils.isClockWise(v)) {
        v = v.reverse();
        E = 0;
        for (I = t.length; E < I; E++) B = t[E], THREE.Shape.Utils.isClockWise(B) &&
            (t[E] = B.reverse());
        y = !1
    }
    y = THREE.Shape.Utils.triangulateShape(v, t);
    w = v;
    E = 0;
    for (I = t.length; E < I; E++) B = t[E], v = v.concat(B);
    var C, F, K, M, N, L, O = v.length,
        G = y.length,
        S = [];
    C = 0;
    F = w.length;
    T = F - 1;
    for (R = C + 1; C < F; C++, T++, R++) T == F && (T = 0), R == F && (R = 0), S[C] = e(w[C], w[T], w[R]);
    var P = [],
        U, V = S.concat();
    E = 0;
    for (I = t.length; E < I; E++) {
        B = t[E];
        U = [];
        C = 0;
        F = B.length;
        T = F - 1;
        for (R = C + 1; C < F; C++, T++, R++) T == F && (T = 0), R == F && (R = 0), U[C] = e(B[C], B[T], B[R]);
        P.push(U);
        V = V.concat(U)
    }
    for (K = 0; K < n; K++) {
        M = K / n;
        N = l * (1 - M);
        M = m * Math.sin(M * Math.PI / 2);
        C = 0;
        for (F =
            w.length; C < F; C++) L = c(w[C], S[C], M), h(L.x, L.y, -N);
        E = 0;
        for (I = t.length; E < I; E++) {
            B = t[E];
            U = P[E];
            C = 0;
            for (F = B.length; C < F; C++) L = c(B[C], U[C], M), h(L.x, L.y, -N)
        }
    }
    M = m;
    for (C = 0; C < O; C++) L = o ? c(v[C], V[C], M) : v[C], z ? h(L.x, L.y + p[0].y, p[0].x) : h(L.x, L.y, 0);
    for (K = 1; K <= u; K++)
        for (C = 0; C < O; C++) L = o ? c(v[C], V[C], M) : v[C], z ? h(L.x, L.y + p[K - 1].y, p[K - 1].x) : h(L.x, L.y, k / u * K);
    for (K = n - 1; K >= 0; K--) {
        M = K / n;
        N = l * (1 - M);
        M = m * Math.sin(M * Math.PI / 2);
        C = 0;
        for (F = w.length; C < F; C++) L = c(w[C], S[C], M), h(L.x, L.y, k + N);
        E = 0;
        for (I = t.length; E < I; E++) {
            B = t[E];
            U = P[E];
            C = 0;
            for (F = B.length; C < F; C++) L = c(B[C], U[C], M), z ? h(L.x, L.y + p[u - 1].y, p[u - 1].x + N) : h(L.x, L.y, k + N)
        }
    }
    if (o) {
        o = O * 0;
        for (C = 0; C < G; C++) m = y[C], f(m[2] + o, m[1] + o, m[0] + o);
        o = O * (u + n * 2);
        for (C = 0; C < G; C++) m = y[C], f(m[0] + o, m[1] + o, m[2] + o)
    } else {
        for (C = 0; C < G; C++) m = y[C], f(m[2], m[1], m[0]);
        for (C = 0; C < G; C++) m = y[C], f(m[0] + O * u, m[1] + O * u, m[2] + O * u)
    }
    var T, R, Q = 0;
    g(w);
    Q += w.length;
    E = 0;
    for (I = t.length; E < I; E++) B = t[E], g(B), Q += B.length
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.IcosahedronGeometry = function(a) {
    function b(a, c, b) {
        var e = Math.sqrt(a * a + c * c + b * b);
        return g.vertices.push(new THREE.Vertex(new THREE.Vector3(a / e, c / e, b / e))) - 1
    }

    function c(a, c, b, e) {
        e.faces.push(new THREE.Face3(a, c, b))
    }

    function e(a, c) {
        var e = g.vertices[a].position,
            f = g.vertices[c].position;
        return b((e.x + f.x) / 2, (e.y + f.y) / 2, (e.z + f.z) / 2)
    }
    var g = this,
        h = new THREE.Geometry;
    this.subdivisions = a || 0;
    THREE.Geometry.call(this);
    a = (1 + Math.sqrt(5)) / 2;
    b(-1, a, 0);
    b(1, a, 0);
    b(-1, -a, 0);
    b(1, -a, 0);
    b(0, -1, a);
    b(0, 1, a);
    b(0, -1, -a);
    b(0, 1, -a);
    b(a, 0, -1);
    b(a, 0, 1);
    b(-a, 0, -1);
    b(-a, 0, 1);
    c(0, 11, 5, h);
    c(0, 5, 1, h);
    c(0, 1, 7, h);
    c(0, 7, 10, h);
    c(0, 10, 11, h);
    c(1, 5, 9, h);
    c(5, 11, 4, h);
    c(11, 10, 2, h);
    c(10, 7, 6, h);
    c(7, 1, 8, h);
    c(3, 9, 4, h);
    c(3, 4, 2, h);
    c(3, 2, 6, h);
    c(3, 6, 8, h);
    c(3, 8, 9, h);
    c(4, 9, 5, h);
    c(2, 4, 11, h);
    c(6, 2, 10, h);
    c(8, 6, 7, h);
    c(9, 8, 1, h);
    for (var f = 0; f < this.subdivisions; f++) {
        var a = new THREE.Geometry,
            k;
        for (k in h.faces) {
            var l = e(h.faces[k].a, h.faces[k].b),
                m = e(h.faces[k].b, h.faces[k].c),
                n = e(h.faces[k].c, h.faces[k].a);
            c(h.faces[k].a, l, n, a);
            c(h.faces[k].b, m,
                l, a);
            c(h.faces[k].c, n, m, a);
            c(l, m, n, a)
        }
        h.faces = a.faces
    }
    g.faces = h.faces;
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.IcosahedronGeometry.prototype = new THREE.Geometry;
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
THREE.LatheGeometry = function(a, b, c) {
    THREE.Geometry.call(this);
    this.steps = b || 12;
    this.angle = c || 2 * Math.PI;
    for (var b = this.angle / this.steps, c = [], e = [], g = [], h = [], f = (new THREE.Matrix4).setRotationZ(b), k = 0; k < a.length; k++) this.vertices.push(new THREE.Vertex(a[k])), c[k] = a[k].clone(), e[k] = this.vertices.length - 1;
    for (var l = 0; l <= this.angle + 0.001; l += b) {
        for (k = 0; k < c.length; k++) l < this.angle ? (c[k] = f.multiplyVector3(c[k].clone()), this.vertices.push(new THREE.Vertex(c[k])), g[k] = this.vertices.length - 1) : g = h;
        l == 0 && (h = e);
        for (k = 0; k < e.length - 1; k++) this.faces.push(new THREE.Face4(g[k], g[k + 1], e[k + 1], e[k])), this.faceVertexUvs[0].push([new THREE.UV(1 - l / this.angle, k / a.length), new THREE.UV(1 - l / this.angle, (k + 1) / a.length), new THREE.UV(1 - (l - b) / this.angle, (k + 1) / a.length), new THREE.UV(1 - (l - b) / this.angle, k / a.length)]);
        e = g;
        g = []
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = new THREE.Geometry;
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry;
THREE.OctahedronGeometry = function(a, b) {
    function c(c) {
        var b = c.clone().normalize(),
            b = new THREE.Vertex(b.clone().multiplyScalar(a));
        b.index = f.vertices.push(b) - 1;
        b.uv = new THREE.UV(Math.atan2(c.z, -c.x) / 2 / Math.PI + 0.5, Math.atan2(-c.y, Math.sqrt(c.x * c.x + c.z * c.z)) / Math.PI + 0.5);
        return b
    }

    function e(a, c, b, k) {
        k < 1 ? (k = new THREE.Face3(a.index, c.index, b.index, [a.position, c.position, b.position]), k.centroid.addSelf(a.position).addSelf(c.position).addSelf(b.position).divideScalar(3), k.normal = k.centroid.clone().normalize(),
            f.faces.push(k), k = Math.atan2(k.centroid.z, -k.centroid.x), f.faceVertexUvs[0].push([h(a.uv, a.position, k), h(c.uv, c.position, k), h(b.uv, b.position, k)])) : (k -= 1, e(a, g(a, c), g(a, b), k), e(g(a, c), c, g(c, b), k), e(g(a, b), g(c, b), b, k), e(g(a, c), g(c, b), g(a, b), k))
    }

    function g(a, b) {
        k[a.index] || (k[a.index] = []);
        k[b.index] || (k[b.index] = []);
        var e = k[a.index][b.index];
        e === void 0 && (k[a.index][b.index] = k[b.index][a.index] = e = c((new THREE.Vector3).add(a.position, b.position).divideScalar(2)));
        return e
    }

    function h(a, c, b) {
        b < 0 && a.u ===
            1 && (a = new THREE.UV(a.u - 1, a.v));
        c.x === 0 && c.z === 0 && (a = new THREE.UV(b / 2 / Math.PI + 0.5, a.v));
        return a
    }
    THREE.Geometry.call(this);
    var b = isFinite(b) ? b : 3,
        f = this;
    c(new THREE.Vector3(1, 0, 0));
    c(new THREE.Vector3(-1, 0, 0));
    c(new THREE.Vector3(0, 1, 0));
    c(new THREE.Vector3(0, -1, 0));
    c(new THREE.Vector3(0, 0, 1));
    c(new THREE.Vector3(0, 0, -1));
    var k = [],
        l = this.vertices;
    e(l[0], l[2], l[4], b);
    e(l[0], l[4], l[3], b);
    e(l[0], l[3], l[5], b);
    e(l[0], l[5], l[2], b);
    e(l[1], l[2], l[5], b);
    e(l[1], l[5], l[3], b);
    e(l[1], l[3], l[4], b);
    e(l[1], l[4], l[2],
        b);
    this.boundingSphere = {
        radius: a
    }
};
THREE.OctahedronGeometry.prototype = new THREE.Geometry;
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry;
THREE.PlaneGeometry = function(a, b, c, e) {
    THREE.Geometry.call(this);
    var g, h = a / 2,
        f = b / 2,
        c = c || 1,
        e = e || 1,
        k = c + 1,
        l = e + 1;
    a /= c;
    var m = b / e;
    for (g = 0; g < l; g++)
        for (b = 0; b < k; b++) this.vertices.push(new THREE.Vertex(new THREE.Vector3(b * a - h, -(g * m - f), 0)));
    for (g = 0; g < e; g++)
        for (b = 0; b < c; b++) this.faces.push(new THREE.Face4(b + k * g, b + k * (g + 1), b + 1 + k * (g + 1), b + 1 + k * g)), this.faceVertexUvs[0].push([new THREE.UV(b / c, g / e), new THREE.UV(b / c, (g + 1) / e), new THREE.UV((b + 1) / c, (g + 1) / e), new THREE.UV((b + 1) / c, g / e)]);
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.PlaneGeometry.prototype = new THREE.Geometry;
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.SphereGeometry = function(a, b, c) {
    THREE.Geometry.call(this);
    for (var a = a || 50, e, g = Math.PI, h = Math.max(3, b || 8), f = Math.max(2, c || 6), b = [], c = 0; c < f + 1; c++) {
        e = c / f;
        var k = a * Math.cos(e * g),
            l = a * Math.sin(e * g),
            m = [],
            n = 0;
        for (e = 0; e < h; e++) {
            var o = 2 * e / h,
                t = l * Math.sin(o * g),
                o = l * Math.cos(o * g);
            (c == 0 || c == f) && e > 0 || (n = this.vertices.push(new THREE.Vertex(new THREE.Vector3(o, k, t))) - 1);
            m.push(n)
        }
        b.push(m)
    }
    for (var u, v, y, g = b.length, c = 0; c < g; c++)
        if (h = b[c].length, c > 0)
            for (e = 0; e < h; e++) {
                m = e == h - 1;
                f = b[c][m ? 0 : e + 1];
                k = b[c][m ? h - 1 : e];
                l = b[c - 1][m ?
                    h - 1 : e
                ];
                m = b[c - 1][m ? 0 : e + 1];
                t = c / (g - 1);
                u = (c - 1) / (g - 1);
                v = (e + 1) / h;
                var o = e / h,
                    n = new THREE.UV(1 - v, t),
                    t = new THREE.UV(1 - o, t),
                    o = new THREE.UV(1 - o, u),
                    p = new THREE.UV(1 - v, u);
                c < b.length - 1 && (u = this.vertices[f].position.clone(), v = this.vertices[k].position.clone(), y = this.vertices[l].position.clone(), u.normalize(), v.normalize(), y.normalize(), this.faces.push(new THREE.Face3(f, k, l, [new THREE.Vector3(u.x, u.y, u.z), new THREE.Vector3(v.x, v.y, v.z), new THREE.Vector3(y.x, y.y, y.z)])), this.faceVertexUvs[0].push([n, t, o]));
                c > 1 && (u =
                    this.vertices[f].position.clone(), v = this.vertices[l].position.clone(), y = this.vertices[m].position.clone(), u.normalize(), v.normalize(), y.normalize(), this.faces.push(new THREE.Face3(f, l, m, [new THREE.Vector3(u.x, u.y, u.z), new THREE.Vector3(v.x, v.y, v.z), new THREE.Vector3(y.x, y.y, y.z)])), this.faceVertexUvs[0].push([n, o, p]))
            }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
    this.boundingSphere = {
        radius: a
    }
};
THREE.SphereGeometry.prototype = new THREE.Geometry;
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.TextGeometry = function(a, b) {
    var c = (new THREE.TextPath(a, b)).toShapes();
    b.amount = b.height !== void 0 ? b.height : 50;
    if (b.bevelThickness === void 0) b.bevelThickness = 10;
    if (b.bevelSize === void 0) b.bevelSize = 8;
    if (b.bevelEnabled === void 0) b.bevelEnabled = !1;
    if (b.bend) {
        var e = c[c.length - 1].getBoundingBox().maxX;
        b.bendPath = new THREE.QuadraticBezierCurve(new THREE.Vector2(0, 0), new THREE.Vector2(e / 2, 120), new THREE.Vector2(e, 0))
    }
    THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = new THREE.ExtrudeGeometry;
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function() {
        return this.faces[this.face][this.weight][this.style]
    },
    getTextShapes: function(a, b) {
        return (new TextPath(a, b)).toShapes()
    },
    loadFace: function(a) {
        var b = a.familyName.toLowerCase();
        this.faces[b] = this.faces[b] || {};
        this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
        this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
    },
    drawText: function(a) {
        for (var b =
                this.getFace(), c = this.size / b.resolution, e = 0, g = String(a).split(""), h = g.length, f = [], a = 0; a < h; a++) {
            var k = new THREE.Path,
                k = this.extractGlyphPoints(g[a], b, c, e, k);
            e += k.offset;
            f.push(k.path)
        }
        return {
            paths: f,
            offset: e / 2
        }
    },
    extractGlyphPoints: function(a, b, c, e, g) {
        var h = [],
            f, k, l, m, n, o, t, u, v, y, p = b.glyphs[a] || b.glyphs[ctxt.options.fallbackCharacter];
        if (p) {
            if (p.o) {
                b = p._cachedOutline || (p._cachedOutline = p.o.split(" "));
                l = b.length;
                for (a = 0; a < l;) switch (k = b[a++], k) {
                    case "m":
                        k = b[a++] * c + e;
                        m = b[a++] * c;
                        h.push(new THREE.Vector2(k,
                            m));
                        g.moveTo(k, m);
                        break;
                    case "l":
                        k = b[a++] * c + e;
                        m = b[a++] * c;
                        h.push(new THREE.Vector2(k, m));
                        g.lineTo(k, m);
                        break;
                    case "q":
                        k = b[a++] * c + e;
                        m = b[a++] * c;
                        t = b[a++] * c + e;
                        u = b[a++] * c;
                        g.quadraticCurveTo(t, u, k, m);
                        if (f = h[h.length - 1]) {
                            n = f.x;
                            o = f.y;
                            f = 1;
                            for (divisions = this.divisions; f <= divisions; f++) {
                                var z = f / divisions,
                                    w = THREE.Shape.Utils.b2(z, n, t, k),
                                    z = THREE.Shape.Utils.b2(z, o, u, m);
                                h.push(new THREE.Vector2(w, z))
                            }
                        }
                        break;
                    case "b":
                        if (k = b[a++] * c + e, m = b[a++] * c, t = b[a++] * c + e, u = b[a++] * -c, v = b[a++] * c + e, y = b[a++] * -c, g.bezierCurveTo(k, m,
                                t, u, v, y), f = h[h.length - 1]) {
                            n = f.x;
                            o = f.y;
                            f = 1;
                            for (divisions = this.divisions; f <= divisions; f++) z = f / divisions, w = THREE.Shape.Utils.b3(z, n, t, v, k), z = THREE.Shape.Utils.b3(z, o, u, y, m), h.push(new THREE.Vector2(w, z))
                        }
                }
            }
            return {
                offset: p.ha * c,
                points: h,
                path: g
            }
        }
    }
};
(function(a) {
    var b = function(a) {
        for (var b = a.length, g = 0, h = b - 1, f = 0; f < b; h = f++) g += a[h].x * a[f].y - a[f].x * a[h].y;
        return g * 0.5
    };
    a.Triangulate = function(a, e) {
        var g = a.length;
        if (g < 3) return null;
        var h = [],
            f = [],
            k = [],
            l, m, n;
        if (b(a) > 0)
            for (m = 0; m < g; m++) f[m] = m;
        else
            for (m = 0; m < g; m++) f[m] = g - 1 - m;
        var o = 2 * g;
        for (m = g - 1; g > 2;) {
            if (o-- <= 0) {
                console.log("Warning, unable to triangulate polygon!");
                if (e) return k;
                return h
            }
            l = m;
            g <= l && (l = 0);
            m = l + 1;
            g <= m && (m = 0);
            n = m + 1;
            g <= n && (n = 0);
            var t;
            a: {
                t = a;
                var u = l,
                    v = m,
                    y = n,
                    p = g,
                    z = f,
                    w = void 0,
                    x = void 0,
                    A = void 0,
                    D = void 0,
                    B = void 0,
                    E = void 0,
                    I = void 0,
                    H = void 0,
                    J = void 0,
                    x = t[z[u]].x,
                    A = t[z[u]].y,
                    D = t[z[v]].x,
                    B = t[z[v]].y,
                    E = t[z[y]].x,
                    I = t[z[y]].y;
                if (1.0E-10 > (D - x) * (I - A) - (B - A) * (E - x)) t = !1;
                else {
                    for (w = 0; w < p; w++)
                        if (!(w == u || w == v || w == y)) {
                            var H = t[z[w]].x,
                                J = t[z[w]].y,
                                C = void 0,
                                F = void 0,
                                K = void 0,
                                M = void 0,
                                N = void 0,
                                L = void 0,
                                O = void 0,
                                G = void 0,
                                S = void 0,
                                P = void 0,
                                U = void 0,
                                V = void 0,
                                C = K = N = void 0,
                                C = E - D,
                                F = I - B,
                                K = x - E,
                                M = A - I,
                                N = D - x,
                                L = B - A,
                                O = H - x,
                                G = J - A,
                                S = H - D,
                                P = J - B,
                                U = H - E,
                                V = J - I,
                                C = C * P - F * S,
                                N = N * G - L * O,
                                K = K * V - M * U;
                            if (C >= 0 && K >= 0 && N >= 0) {
                                t = !1;
                                break a
                            }
                        }
                    t = !0
                }
            }
            if (t) {
                h.push([a[f[l]],
                    a[f[m]], a[f[n]]
                ]);
                k.push([f[l], f[m], f[n]]);
                l = m;
                for (n = m + 1; n < g; l++, n++) f[l] = f[n];
                g--;
                o = 2 * g
            }
        }
        if (e) return k;
        return h
    };
    a.Triangulate.area = b;
    return a
})(THREE.FontUtils);
self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
};
THREE.TorusGeometry = function(a, b, c, e, g) {
    THREE.Geometry.call(this);
    this.radius = a || 100;
    this.tube = b || 40;
    this.segmentsR = c || 8;
    this.segmentsT = e || 6;
    this.arc = g || Math.PI * 2;
    g = new THREE.Vector3;
    a = [];
    b = [];
    for (c = 0; c <= this.segmentsR; c++)
        for (e = 0; e <= this.segmentsT; e++) {
            var h = e / this.segmentsT * this.arc,
                f = c / this.segmentsR * Math.PI * 2;
            g.x = this.radius * Math.cos(h);
            g.y = this.radius * Math.sin(h);
            var k = new THREE.Vector3;
            k.x = (this.radius + this.tube * Math.cos(f)) * Math.cos(h);
            k.y = (this.radius + this.tube * Math.cos(f)) * Math.sin(h);
            k.z =
                this.tube * Math.sin(f);
            this.vertices.push(new THREE.Vertex(k));
            a.push(new THREE.UV(e / this.segmentsT, 1 - c / this.segmentsR));
            b.push(k.clone().subSelf(g).normalize())
        }
    for (c = 1; c <= this.segmentsR; c++)
        for (e = 1; e <= this.segmentsT; e++) {
            var g = (this.segmentsT + 1) * c + e - 1,
                h = (this.segmentsT + 1) * (c - 1) + e - 1,
                f = (this.segmentsT + 1) * (c - 1) + e,
                k = (this.segmentsT + 1) * c + e,
                l = new THREE.Face4(g, h, f, k, [b[g], b[h], b[f], b[k]]);
            l.normal.addSelf(b[g]);
            l.normal.addSelf(b[h]);
            l.normal.addSelf(b[f]);
            l.normal.addSelf(b[k]);
            l.normal.normalize();
            this.faces.push(l);
            this.faceVertexUvs[0].push([a[g].clone(), a[h].clone(), a[f].clone(), a[k].clone()])
        }
    this.computeCentroids()
};
THREE.TorusGeometry.prototype = new THREE.Geometry;
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;
THREE.TorusKnotGeometry = function(a, b, c, e, g, h, f) {
    function k(a, c, b, e, f, h) {
        c = b / e * a;
        b = Math.cos(c);
        return new THREE.Vector3(f * (2 + b) * 0.5 * Math.cos(a), f * (2 + b) * Math.sin(a) * 0.5, h * f * Math.sin(c) * 0.5)
    }
    THREE.Geometry.call(this);
    this.radius = a || 200;
    this.tube = b || 40;
    this.segmentsR = c || 64;
    this.segmentsT = e || 8;
    this.p = g || 2;
    this.q = h || 3;
    this.heightScale = f || 1;
    this.grid = Array(this.segmentsR);
    c = new THREE.Vector3;
    e = new THREE.Vector3;
    h = new THREE.Vector3;
    for (a = 0; a < this.segmentsR; ++a) {
        this.grid[a] = Array(this.segmentsT);
        for (b = 0; b <
            this.segmentsT; ++b) {
            var l = a / this.segmentsR * 2 * this.p * Math.PI,
                f = b / this.segmentsT * 2 * Math.PI,
                g = k(l, f, this.q, this.p, this.radius, this.heightScale),
                l = k(l + 0.01, f, this.q, this.p, this.radius, this.heightScale);
            c.x = l.x - g.x;
            c.y = l.y - g.y;
            c.z = l.z - g.z;
            e.x = l.x + g.x;
            e.y = l.y + g.y;
            e.z = l.z + g.z;
            h.cross(c, e);
            e.cross(h, c);
            h.normalize();
            e.normalize();
            l = -this.tube * Math.cos(f);
            f = this.tube * Math.sin(f);
            g.x += l * e.x + f * h.x;
            g.y += l * e.y + f * h.y;
            g.z += l * e.z + f * h.z;
            this.grid[a][b] = this.vertices.push(new THREE.Vertex(new THREE.Vector3(g.x, g.y,
                g.z))) - 1
        }
    }
    for (a = 0; a < this.segmentsR; ++a)
        for (b = 0; b < this.segmentsT; ++b) {
            var e = (a + 1) % this.segmentsR,
                h = (b + 1) % this.segmentsT,
                g = this.grid[a][b],
                c = this.grid[e][b],
                e = this.grid[e][h],
                h = this.grid[a][h],
                f = new THREE.UV(a / this.segmentsR, b / this.segmentsT),
                l = new THREE.UV((a + 1) / this.segmentsR, b / this.segmentsT),
                m = new THREE.UV((a + 1) / this.segmentsR, (b + 1) / this.segmentsT),
                n = new THREE.UV(a / this.segmentsR, (b + 1) / this.segmentsT);
            this.faces.push(new THREE.Face4(g, c, e, h));
            this.faceVertexUvs[0].push([f, l, m, n])
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = new THREE.Geometry;
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;
THREE.SubdivisionModifier = function(a) {
    this.subdivisions = a === void 0 ? 1 : a;
    this.useOldVertexColors = !1;
    this.supportUVs = !0
};
THREE.SubdivisionModifier.prototype.constructor = THREE.SubdivisionModifier;
THREE.SubdivisionModifier.prototype.modify = function(a) {
    for (var b = this.subdivisions; b-- > 0;) this.smooth(a)
};
THREE.SubdivisionModifier.prototype.smooth = function(a) {
    function b(a, c, b, e, k, l) {
        var m = new THREE.Face4(a, c, b, e, null, k.color, k.material);
        if (f.useOldVertexColors) {
            m.vertexColors = [];
            for (var n, p, u, t = 0; t < 4; t++) {
                u = l[t];
                n = new THREE.Color;
                n.setRGB(0, 0, 0);
                for (var v = 0; v < u.length; v++) p = k.vertexColors[u[v] - 1], n.r += p.r, n.g += p.g, n.b += p.b;
                n.r /= u.length;
                n.g /= u.length;
                n.b /= u.length;
                m.vertexColors[t] = n
            }
        }
        g.push(m);
        (!f.supportUVs || o.length != 0) && h.push([o[a], o[c], o[b], o[e]])
    }

    function c(a, c) {
        return Math.min(a, c) + "_" + Math.max(a,
            c)
    }
    var e = [],
        g = [],
        h = [],
        f = this,
        k = a.vertices,
        e = a.faces,
        l = k.concat(),
        m = [],
        n = {},
        o = [],
        t, u, v, y, p, z = a.faceVertexUvs[0];
    t = 0;
    for (u = z.length; t < u; t++) {
        v = 0;
        for (y = z[t].length; v < y; v++) p = e[t]["abcd".charAt(v)], o[p] || (o[p] = z[t][v])
    }
    var w;
    t = 0;
    for (u = e.length; t < u; t++)
        if (p = e[t], m.push(p.centroid), l.push(new THREE.Vertex(p.centroid)), f.supportUVs && o.length != 0) {
            w = new THREE.UV;
            if (p instanceof THREE.Face3) w.u = o[p.a].u + o[p.b].u + o[p.c].u, w.v = o[p.a].v + o[p.b].v + o[p.c].v, w.u /= 3, w.v /= 3;
            else if (p instanceof THREE.Face4) w.u = o[p.a].u +
                o[p.b].u + o[p.c].u + o[p.d].u, w.v = o[p.a].v + o[p.b].v + o[p.c].v + o[p.d].v, w.u /= 4, w.v /= 4;
            o.push(w)
        }
    y = function(a) {
        function b(a, c, e) {
            a[c] === void 0 && (a[c] = []);
            a[c].push(e)
        }
        var e, f, h, g, k = {};
        e = 0;
        for (f = a.faces.length; e < f; e++) h = a.faces[e], h instanceof THREE.Face3 ? (g = c(h.a, h.b), b(k, g, e), g = c(h.b, h.c), b(k, g, e), g = c(h.c, h.a), b(k, g, e)) : h instanceof THREE.Face4 && (g = c(h.a, h.b), b(k, g, e), g = c(h.b, h.c), b(k, g, e), g = c(h.c, h.d), b(k, g, e), g = c(h.d, h.a), b(k, g, e));
        return k
    }(a);
    var x, A, D = 0,
        z = k.length,
        B;
    for (t in y)
        if (p = y[t], w = p[0], x =
            p[1], B = t.split("_"), u = B[0], B = B[1], A = new THREE.Vector3, p.length != 2 ? (A.addSelf(k[u].position), A.addSelf(k[B].position), A.multiplyScalar(0.5)) : (A.addSelf(m[w]), A.addSelf(m[x]), A.addSelf(k[u].position), A.addSelf(k[B].position), A.multiplyScalar(0.25)), n[t] = z + e.length + D, l.push(new THREE.Vertex(A)), D++, f.supportUVs && o.length != 0) w = new THREE.UV, w.u = o[u].u + o[B].u, w.v = o[u].v + o[B].v, w.u /= 2, w.v /= 2, o.push(w);
    t = 0;
    for (u = m.length; t < u; t++) p = e[t], w = z + t, p instanceof THREE.Face3 ? (x = c(p.a, p.b), B = c(p.b, p.c), D = c(p.c, p.a),
        b(w, n[x], p.b, n[B], p, ["123", "12", "2", "23"]), b(w, n[B], p.c, n[D], p, ["123", "23", "3", "31"]), b(w, n[D], p.a, n[x], p, ["123", "31", "1", "12"])) : p instanceof THREE.Face4 ? (x = c(p.a, p.b), B = c(p.b, p.c), D = c(p.c, p.d), A = c(p.d, p.a), b(w, n[x], p.b, n[B], p, ["1234", "12", "2", "23"]), b(w, n[B], p.c, n[D], p, ["1234", "23", "3", "34"]), b(w, n[D], p.d, n[A], p, ["1234", "34", "4", "41"]), b(w, n[A], p.a, n[x], p, ["1234", "41", "1", "12"])) : console.log("face should be a face!", p);
    var e = l,
        E = {},
        I = {},
        l = function(a, c) {
            E[a] === void 0 && (E[a] = []);
            E[a].push(c)
        },
        n = function(a,
            c) {
            I[a] === void 0 && (I[a] = {});
            I[a][c] = null
        };
    for (t in y) p = y[t], B = t.split("_"), u = B[0], B = B[1], l(u, [u, B]), l(B, [u, B]), w = p[0], x = p[1], n(u, w), x ? n(u, x) : n(u, w), n(B, w), x ? n(B, x) : n(B, w);
    l = new THREE.Vector3;
    n = new THREE.Vector3;
    t = 0;
    for (u = k.length; t < u; t++)
        if (E[t] !== void 0) {
            l.set(0, 0, 0);
            n.set(0, 0, 0);
            y = new THREE.Vector3(0, 0, 0);
            z = 0;
            for (v in I[t]) l.addSelf(m[v]), z++;
            l.divideScalar(z);
            z = E[t].length;
            for (v = 0; v < z; v++) p = E[t][v], p = k[p[0]].position.clone().addSelf(k[p[1]].position).divideScalar(2), n.addSelf(p);
            n.divideScalar(z);
            y.addSelf(k[t].position);
            y.multiplyScalar(z - 3);
            y.addSelf(l);
            y.addSelf(n.multiplyScalar(2));
            y.divideScalar(z);
            e[t].position = y
        }
    a.vertices = e;
    a.faces = g;
    a.faceVertexUvs[0] = h;
    delete a.__tmpVertices;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals()
};
THREE.Loader = function(a) {
    this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null;
    this.onLoadStart = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {}
};
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    addStatusElement: function() {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.right = "0px";
        a.style.top = "0px";
        a.style.fontSize = "0.8em";
        a.style.textAlign = "left";
        a.style.background = "rgba(0,0,0,0.25)";
        a.style.color = "#fff";
        a.style.width = "120px";
        a.style.padding = "0.5em 0.5em 0.5em 0.5em";
        a.style.zIndex = 1E3;
        a.innerHTML = "Loading ...";
        return a
    },
    updateProgress: function(a) {
        var b = "Loaded ";
        b += a.total ? (100 * a.loaded / a.total).toFixed(0) + "%" : (a.loaded /
            1E3).toFixed(2) + " KB";
        this.statusDomElement.innerHTML = b
    },
    extractUrlbase: function(a) {
        a = a.split("/");
        a.pop();
        return a.length < 1 ? "" : a.join("/") + "/"
    },
    init_materials: function(a, b, c) {
        a.materials = [];
        for (var e = 0; e < b.length; ++e) a.materials[e] = [THREE.Loader.prototype.createMaterial(b[e], c)]
    },
    hasNormals: function(a) {
        var b, c, e = a.materials.length;
        for (c = 0; c < e; c++)
            if (b = a.materials[c][0], b instanceof THREE.ShaderMaterial) return !0;
        return !1
    },
    createMaterial: function(a, b) {
        function c(a) {
            a = Math.log(a) / Math.LN2;
            return Math.floor(a) ==
                a
        }

        function e(a, b) {
            var e = new Image;
            e.onload = function() {
                if (!c(this.width) || !c(this.height)) {
                    var b = Math.pow(2, Math.round(Math.log(this.width) / Math.LN2)),
                        e = Math.pow(2, Math.round(Math.log(this.height) / Math.LN2));
                    a.image.width = b;
                    a.image.height = e;
                    a.image.getContext("2d").drawImage(this, 0, 0, b, e)
                } else a.image = this;
                a.needsUpdate = !0
            };
            e.src = b
        }

        function g(a, c, f, h, g, k) {
            var l = document.createElement("canvas");
            a[c] = new THREE.Texture(l);
            a[c].sourceFile = f;
            if (h) {
                a[c].repeat.set(h[0], h[1]);
                if (h[0] != 1) a[c].wrapS = THREE.RepeatWrapping;
                if (h[1] != 1) a[c].wrapT = THREE.RepeatWrapping
            }
            g && a[c].offset.set(g[0], g[1]);
            if (k) {
                h = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                if (h[k[0]] !== void 0) a[c].wrapS = h[k[0]];
                if (h[k[1]] !== void 0) a[c].wrapT = h[k[1]]
            }
            e(a[c], b + "/" + f)
        }

        function h(a) {
            return (a[0] * 255 << 16) + (a[1] * 255 << 8) + a[2] * 255
        }
        var f, k, l;
        k = "MeshLambertMaterial";
        f = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            wireframe: a.wireframe
        };
        a.shading && (a.shading == "Phong" ? k = "MeshPhongMaterial" : a.shading == "Basic" && (k = "MeshBasicMaterial"));
        if (a.blending)
            if (a.blending == "Additive") f.blending = THREE.AdditiveBlending;
            else if (a.blending == "Subtractive") f.blending = THREE.SubtractiveBlending;
        else if (a.blending == "Multiply") f.blending = THREE.MultiplyBlending;
        if (a.transparent !== void 0 || a.opacity < 1) f.transparent = a.transparent;
        if (a.depthTest !== void 0) f.depthTest = a.depthTest;
        if (a.vertexColors !== void 0)
            if (a.vertexColors == "face") f.vertexColors = THREE.FaceColors;
            else if (a.vertexColors) f.vertexColors = THREE.VertexColors;
        if (a.colorDiffuse) f.color = h(a.colorDiffuse);
        else if (a.DbgColor) f.color = a.DbgColor;
        if (a.colorSpecular) f.specular = h(a.colorSpecular);
        if (a.colorAmbient) f.ambient = h(a.colorAmbient);
        if (a.transparency) f.opacity = a.transparency;
        if (a.specularCoef) f.shininess = a.specularCoef;
        a.mapDiffuse && b && g(f, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap);
        a.mapLight && b && g(f, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap);
        a.mapNormal && b && g(f, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap);
        a.mapSpecular && b && g(f, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap);
        if (a.mapNormal) {
            var m = THREE.ShaderUtils.lib.normal,
                n = THREE.UniformsUtils.clone(m.uniforms),
                o = f.color;
            k = f.specular;
            l = f.ambient;
            var t = f.shininess;
            n.tNormal.texture = f.normalMap;
            if (a.mapNormalFactor) n.uNormalScale.value = a.mapNormalFactor;
            if (f.map) n.tDiffuse.texture = f.map, n.enableDiffuse.value = !0;
            if (f.specularMap) n.tSpecular.texture = f.specularMap, n.enableSpecular.value = !0;
            if (f.lightMap) n.tAO.texture =
                f.lightMap, n.enableAO.value = !0;
            n.uDiffuseColor.value.setHex(o);
            n.uSpecularColor.value.setHex(k);
            n.uAmbientColor.value.setHex(l);
            n.uShininess.value = t;
            if (f.opacity) n.uOpacity.value = f.opacity;
            f = new THREE.ShaderMaterial({
                fragmentShader: m.fragmentShader,
                vertexShader: m.vertexShader,
                uniforms: n,
                lights: !0,
                fog: !0
            })
        } else f = new THREE[k](f);
        return f
    }
};
THREE.BinaryLoader = function(a) {
    THREE.Loader.call(this, a)
};
THREE.BinaryLoader.prototype = new THREE.Loader;
THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader;
THREE.BinaryLoader.prototype.supr = THREE.Loader.prototype;
THREE.BinaryLoader.prototype.load = function(a) {
    var b = a.model,
        c = a.callback,
        e = a.texture_path ? a.texture_path : THREE.Loader.prototype.extractUrlbase(b),
        g = a.bin_path ? a.bin_path : THREE.Loader.prototype.extractUrlbase(b),
        a = (new Date).getTime(),
        b = new Worker(b),
        h = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
    b.onmessage = function(a) {
        THREE.BinaryLoader.prototype.loadAjaxBuffers(a.data.buffers, a.data.materials, c, g, e, h)
    };
    b.onerror = function(a) {
        alert("worker.onerror: " + a.message + "\n" + a.data);
        a.preventDefault()
    };
    b.postMessage(a)
};
THREE.BinaryLoader.prototype.loadAjaxBuffers = function(a, b, c, e, g, h) {
    var f = new XMLHttpRequest,
        k = e + "/" + a,
        l = 0;
    f.onreadystatechange = function() {
        f.readyState == 4 ? f.status == 200 || f.status == 0 ? THREE.BinaryLoader.prototype.createBinModel(f.responseText, c, g, b) : alert("Couldn't load [" + k + "] [" + f.status + "]") : f.readyState == 3 ? h && (l == 0 && (l = f.getResponseHeader("Content-Length")), h({
            total: l,
            loaded: f.responseText.length
        })) : f.readyState == 2 && (l = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", k, !0);
    f.overrideMimeType("text/plain; charset=x-user-defined");
    f.setRequestHeader("Content-Type", "text/plain");
    f.send(null)
};
THREE.BinaryLoader.prototype.createBinModel = function(a, b, c, e) {
    var g = function(c) {
        function b(a, c) {
            var e = n(a, c),
                f = n(a, c + 1),
                g = n(a, c + 2),
                h = n(a, c + 3),
                k = (h << 1 & 255 | g >> 7) - 127;
            e |= (g & 127) << 16 | f << 8;
            if (e == 0 && k == -127) return 0;
            return (1 - 2 * (h >> 7)) * (1 + e * Math.pow(2, -23)) * Math.pow(2, k)
        }

        function g(a, c) {
            var b = n(a, c),
                e = n(a, c + 1),
                f = n(a, c + 2);
            return (n(a, c + 3) << 24) + (f << 16) + (e << 8) + b
        }

        function l(a, c) {
            var b = n(a, c);
            return (n(a, c + 1) << 8) + b
        }

        function m(a, c) {
            var b = n(a, c);
            return b > 127 ? b - 256 : b
        }

        function n(a, c) {
            return a.charCodeAt(c) & 255
        }

        function o(c) {
            var b,
                e, f;
            b = g(a, c);
            e = g(a, c + B);
            f = g(a, c + E);
            c = l(a, c + I);
            z.faces.push(new THREE.Face3(b, e, f, null, null, z.materials[c]))
        }

        function t(c) {
            var b, e, f, h, m, n;
            b = g(a, c);
            e = g(a, c + B);
            f = g(a, c + E);
            h = l(a, c + I);
            m = g(a, c + H);
            n = g(a, c + J);
            c = g(a, c + C);
            h = z.materials[h];
            var o = A[n * 3],
                p = A[n * 3 + 1];
            n = A[n * 3 + 2];
            var t = A[c * 3],
                ia = A[c * 3 + 1],
                c = A[c * 3 + 2];
            z.faces.push(new THREE.Face3(b, e, f, [new THREE.Vector3(A[m * 3], A[m * 3 + 1], A[m * 3 + 2]), new THREE.Vector3(o, p, n), new THREE.Vector3(t, ia, c)], null, h))
        }

        function u(c) {
            var b, e, f, h;
            b = g(a, c);
            e = g(a, c + F);
            f = g(a, c + K);
            h =
                g(a, c + M);
            c = l(a, c + N);
            z.faces.push(new THREE.Face4(b, e, f, h, null, null, z.materials[c]))
        }

        function v(c) {
            var b, e, f, h, m, n, o, p;
            b = g(a, c);
            e = g(a, c + F);
            f = g(a, c + K);
            h = g(a, c + M);
            m = l(a, c + N);
            n = g(a, c + L);
            o = g(a, c + O);
            p = g(a, c + G);
            c = g(a, c + S);
            m = z.materials[m];
            var t = A[o * 3],
                ia = A[o * 3 + 1];
            o = A[o * 3 + 2];
            var la = A[p * 3],
                ma = A[p * 3 + 1];
            p = A[p * 3 + 2];
            var u = A[c * 3],
                v = A[c * 3 + 1],
                c = A[c * 3 + 2];
            z.faces.push(new THREE.Face4(b, e, f, h, [new THREE.Vector3(A[n * 3], A[n * 3 + 1], A[n * 3 + 2]), new THREE.Vector3(t, ia, o), new THREE.Vector3(la, ma, p), new THREE.Vector3(u, v, c)],
                null, m))
        }

        function y(c) {
            var b, e, f, h;
            b = g(a, c);
            e = g(a, c + P);
            f = g(a, c + U);
            c = D[b * 2];
            h = D[b * 2 + 1];
            b = D[e * 2];
            var l = z.faceVertexUvs[0];
            e = D[e * 2 + 1];
            var m = D[f * 2];
            f = D[f * 2 + 1];
            var n = [];
            n.push(new THREE.UV(c, h));
            n.push(new THREE.UV(b, e));
            n.push(new THREE.UV(m, f));
            l.push(n)
        }

        function p(c) {
            var b, e, f, h, l, m;
            b = g(a, c);
            e = g(a, c + V);
            f = g(a, c + T);
            h = g(a, c + R);
            c = D[b * 2];
            l = D[b * 2 + 1];
            b = D[e * 2];
            m = D[e * 2 + 1];
            e = D[f * 2];
            var n = z.faceVertexUvs[0];
            f = D[f * 2 + 1];
            var o = D[h * 2];
            h = D[h * 2 + 1];
            var p = [];
            p.push(new THREE.UV(c, l));
            p.push(new THREE.UV(b, m));
            p.push(new THREE.UV(e,
                f));
            p.push(new THREE.UV(o, h));
            n.push(p)
        }
        var z = this,
            w = 0,
            x, A = [],
            D = [],
            B, E, I, H, J, C, F, K, M, N, L, O, G, S, P, U, V, T, R, Q, Z, W, $, X, Y;
        THREE.Geometry.call(this);
        THREE.Loader.prototype.init_materials(z, e, c);
        x = {
            signature: a.substr(w, 8),
            header_bytes: n(a, w + 8),
            vertex_coordinate_bytes: n(a, w + 9),
            normal_coordinate_bytes: n(a, w + 10),
            uv_coordinate_bytes: n(a, w + 11),
            vertex_index_bytes: n(a, w + 12),
            normal_index_bytes: n(a, w + 13),
            uv_index_bytes: n(a, w + 14),
            material_index_bytes: n(a, w + 15),
            nvertices: g(a, w + 16),
            nnormals: g(a, w + 16 + 4),
            nuvs: g(a, w + 16 +
                8),
            ntri_flat: g(a, w + 16 + 12),
            ntri_smooth: g(a, w + 16 + 16),
            ntri_flat_uv: g(a, w + 16 + 20),
            ntri_smooth_uv: g(a, w + 16 + 24),
            nquad_flat: g(a, w + 16 + 28),
            nquad_smooth: g(a, w + 16 + 32),
            nquad_flat_uv: g(a, w + 16 + 36),
            nquad_smooth_uv: g(a, w + 16 + 40)
        };
        w += x.header_bytes;
        B = x.vertex_index_bytes;
        E = x.vertex_index_bytes * 2;
        I = x.vertex_index_bytes * 3;
        H = x.vertex_index_bytes * 3 + x.material_index_bytes;
        J = x.vertex_index_bytes * 3 + x.material_index_bytes + x.normal_index_bytes;
        C = x.vertex_index_bytes * 3 + x.material_index_bytes + x.normal_index_bytes * 2;
        F = x.vertex_index_bytes;
        K = x.vertex_index_bytes * 2;
        M = x.vertex_index_bytes * 3;
        N = x.vertex_index_bytes * 4;
        L = x.vertex_index_bytes * 4 + x.material_index_bytes;
        O = x.vertex_index_bytes * 4 + x.material_index_bytes + x.normal_index_bytes;
        G = x.vertex_index_bytes * 4 + x.material_index_bytes + x.normal_index_bytes * 2;
        S = x.vertex_index_bytes * 4 + x.material_index_bytes + x.normal_index_bytes * 3;
        P = x.uv_index_bytes;
        U = x.uv_index_bytes * 2;
        V = x.uv_index_bytes;
        T = x.uv_index_bytes * 2;
        R = x.uv_index_bytes * 3;
        c = x.vertex_index_bytes * 3 + x.material_index_bytes;
        Y = x.vertex_index_bytes *
            4 + x.material_index_bytes;
        Q = x.ntri_flat * c;
        Z = x.ntri_smooth * (c + x.normal_index_bytes * 3);
        W = x.ntri_flat_uv * (c + x.uv_index_bytes * 3);
        $ = x.ntri_smooth_uv * (c + x.normal_index_bytes * 3 + x.uv_index_bytes * 3);
        X = x.nquad_flat * Y;
        c = x.nquad_smooth * (Y + x.normal_index_bytes * 4);
        Y = x.nquad_flat_uv * (Y + x.uv_index_bytes * 4);
        w += function(c) {
            for (var e, h, g, k = x.vertex_coordinate_bytes * 3, l = c + x.nvertices * k; c < l; c += k) e = b(a, c), h = b(a, c + x.vertex_coordinate_bytes), g = b(a, c + x.vertex_coordinate_bytes * 2), z.vertices.push(new THREE.Vertex(new THREE.Vector3(e,
                h, g)));
            return x.nvertices * k
        }(w);
        w += function(c) {
            for (var b, e, f, h = x.normal_coordinate_bytes * 3, g = c + x.nnormals * h; c < g; c += h) b = m(a, c), e = m(a, c + x.normal_coordinate_bytes), f = m(a, c + x.normal_coordinate_bytes * 2), A.push(b / 127, e / 127, f / 127);
            return x.nnormals * h
        }(w);
        w += function(c) {
            for (var e, h, g = x.uv_coordinate_bytes * 2, k = c + x.nuvs * g; c < k; c += g) e = b(a, c), h = b(a, c + x.uv_coordinate_bytes), D.push(e, h);
            return x.nuvs * g
        }(w);
        Q = w + Q;
        Z = Q + Z;
        W = Z + W;
        $ = W + $;
        X = $ + X;
        c = X + c;
        Y = c + Y;
        (function(a) {
            var c, b = x.vertex_index_bytes * 3 + x.material_index_bytes,
                e = b + x.uv_index_bytes * 3,
                f = a + x.ntri_flat_uv * e;
            for (c = a; c < f; c += e) o(c), y(c + b);
            return f - a
        })(Z);
        (function(a) {
            var c, b = x.vertex_index_bytes * 3 + x.material_index_bytes + x.normal_index_bytes * 3,
                e = b + x.uv_index_bytes * 3,
                f = a + x.ntri_smooth_uv * e;
            for (c = a; c < f; c += e) t(c), y(c + b);
            return f - a
        })(W);
        (function(a) {
            var c, b = x.vertex_index_bytes * 4 + x.material_index_bytes,
                e = b + x.uv_index_bytes * 4,
                f = a + x.nquad_flat_uv * e;
            for (c = a; c < f; c += e) u(c), p(c + b);
            return f - a
        })(c);
        (function(a) {
            var c, b = x.vertex_index_bytes * 4 + x.material_index_bytes + x.normal_index_bytes *
                4,
                e = b + x.uv_index_bytes * 4,
                f = a + x.nquad_smooth_uv * e;
            for (c = a; c < f; c += e) v(c), p(c + b);
            return f - a
        })(Y);
        (function(a) {
            var c, b = x.vertex_index_bytes * 3 + x.material_index_bytes,
                e = a + x.ntri_flat * b;
            for (c = a; c < e; c += b) o(c);
            return e - a
        })(w);
        (function(a) {
            var c, b = x.vertex_index_bytes * 3 + x.material_index_bytes + x.normal_index_bytes * 3,
                e = a + x.ntri_smooth * b;
            for (c = a; c < e; c += b) t(c);
            return e - a
        })(Q);
        (function(a) {
            var c, b = x.vertex_index_bytes * 4 + x.material_index_bytes,
                e = a + x.nquad_flat * b;
            for (c = a; c < e; c += b) u(c);
            return e - a
        })($);
        (function(a) {
            var c,
                b = x.vertex_index_bytes * 4 + x.material_index_bytes + x.normal_index_bytes * 4,
                e = a + x.nquad_smooth * b;
            for (c = a; c < e; c += b) v(c);
            return e - a
        })(X);
        this.computeCentroids();
        this.computeFaceNormals();
        THREE.Loader.prototype.hasNormals(this) && this.computeTangents()
    };
    g.prototype = new THREE.Geometry;
    g.prototype.constructor = g;
    b(new g(c))
};
THREE.ColladaLoader = function() {
    function a(a, c, b) {
        for (var a = Q.evaluate(a, Q, G, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), e = {}, f = a.iterateNext(), h = 0; f;) {
            f = (new c).parse(f);
            if (f.id.length == 0) f.id = b + h++;
            e[f.id] = f;
            f = a.iterateNext()
        }
        return e
    }

    function b() {
        var a = 1E6,
            c = -a,
            b = 0,
            e;
        for (e in ca)
            for (var f = ca[e], h = 0; h < f.sampler.length; h++) {
                var g = f.sampler[h];
                g.create();
                a = Math.min(a, g.startTime);
                c = Math.max(c, g.endTime);
                b = Math.max(b, g.input.length)
            }
        return {
            start: a,
            end: c,
            frames: b
        }
    }

    function c(a, b, e, f) {
        a.world = a.world ||
            new THREE.Matrix4;
        a.world.copy(a.matrix);
        if (a.channels && a.channels.length) {
            var h = a.channels[0].sampler.output[e];
            h instanceof THREE.Matrix4 && a.world.copy(h)
        }
        f && a.world.multiply(f, a.world);
        b.push(a);
        for (f = 0; f < a.nodes.length; f++) c(a.nodes[f], b, e, a.world)
    }

    function e(a, e, f) {
        var h = aa[e.url];
        if (!h || !h.skin) console.log("ColladaLoader: Could not find skin controller.");
        else if (!e.skeleton || !e.skeleton.length) console.log("ColladaLoader: Could not find the skeleton for the skin. ");
        else {
            var g = b(),
                e = W.getChildById(e.skeleton[0], !0) || W.getChildBySid(e.skeleton[0], !0),
                k, l, m, n, o = new THREE.Vector3,
                p;
            for (k = 0; k < a.vertices.length; k++) h.skin.bindShapeMatrix.multiplyVector3(a.vertices[k].position);
            for (f = 0; f < g.frames; f++) {
                var t = [],
                    u = [];
                for (k = 0; k < a.vertices.length; k++) u.push(new THREE.Vertex(new THREE.Vector3));
                c(e, t, f);
                k = t;
                l = h.skin;
                for (n = 0; n < k.length; n++)
                    if (m = k[n], p = -1, m.type == "JOINT") {
                        for (var v = 0; v < l.joints.length; v++)
                            if (m.sid == l.joints[v]) {
                                p = v;
                                break
                            }
                        if (p >= 0) {
                            v = l.invBindMatrices[p];
                            m.invBindMatrix = v;
                            m.skinningMatrix = new THREE.Matrix4;
                            m.skinningMatrix.multiply(m.world, v);
                            m.weights = [];
                            for (v = 0; v < l.weights.length; v++)
                                for (var y = 0; y < l.weights[v].length; y++) {
                                    var w = l.weights[v][y];
                                    w.joint == p && m.weights.push(w)
                                }
                        } else throw "ColladaLoader: Could not find joint '" + m.sid + "'.";
                    }
                for (k = 0; k < t.length; k++)
                    if (t[k].type == "JOINT")
                        for (l = 0; l < t[k].weights.length; l++) m = t[k].weights[l], n = m.index, m = m.weight, p = a.vertices[n], n = u[n], o.x = p.position.x, o.y = p.position.y, o.z = p.position.z, t[k].skinningMatrix.multiplyVector3(o), n.position.x += o.x * m, n.position.y += o.y *
                            m, n.position.z += o.z * m;
                a.morphTargets.push({
                    name: "target_" + f,
                    vertices: u
                })
            }
        }
    }

    function g(a) {
        var c = new THREE.Object3D,
            b, f, h;
        c.name = a.id || "";
        c.matrixAutoUpdate = !1;
        c.matrix = a.matrix;
        for (h = 0; h < a.controllers.length; h++) {
            var k = aa[a.controllers[h].url];
            switch (k.type) {
                case "skin":
                    if (ba[k.skin.source]) {
                        var l = new v;
                        l.url = k.skin.source;
                        l.instance_material = a.controllers[h].instance_material;
                        a.geometries.push(l);
                        b = a.controllers[h]
                    } else if (aa[k.skin.source] && (f = k = aa[k.skin.source], k.morph && ba[k.morph.source])) l = new v,
                        l.url = k.morph.source, l.instance_material = a.controllers[h].instance_material, a.geometries.push(l);
                    break;
                case "morph":
                    if (ba[k.morph.source]) l = new v, l.url = k.morph.source, l.instance_material = a.controllers[h].instance_material, a.geometries.push(l), f = a.controllers[h];
                    console.log("ColladaLoader: Morph-controller partially supported.")
            }
        }
        for (h = 0; h < a.geometries.length; h++) {
            var k = a.geometries[h],
                l = k.instance_material,
                k = ba[k.url],
                m = {},
                n = 0,
                o;
            if (k && k.mesh && k.mesh.primitives) {
                if (c.name.length == 0) c.name = k.id;
                if (l)
                    for (j =
                        0; j < l.length; j++) {
                        o = l[j];
                        var p = ga[fa[o.target].instance_effect.url].shader;
                        p.material.opacity = !p.material.opacity ? 1 : p.material.opacity;
                        o = m[o.symbol] = p.material;
                        n++
                    }
                l = o || new THREE.MeshLambertMaterial({
                    color: 14540253,
                    shading: THREE.FlatShading
                });
                k = k.mesh.geometry3js;
                if (n > 1) {
                    l = new THREE.MeshFaceMaterial;
                    for (j = 0; j < k.faces.length; j++) n = k.faces[j], n.materials = [m[n.daeMaterial]]
                }
                if (b !== void 0) e(k, b), l.morphTargets = !0, l = new THREE.SkinnedMesh(k, l), l.skeleton = b.skeleton, l.skinController = aa[b.url], l.skinInstanceController =
                    b, l.name = "skin_" + ea.length, ea.push(l);
                else if (f !== void 0) {
                    m = k;
                    n = f instanceof t ? aa[f.url] : f;
                    if (!n || !n.morph) console.log("could not find morph controller!");
                    else {
                        n = n.morph;
                        for (p = 0; p < n.targets.length; p++) {
                            var u = ba[n.targets[p]];
                            if (u.mesh && u.mesh.primitives && u.mesh.primitives.length) u = u.mesh.primitives[0].geometry, u.vertices.length === m.vertices.length && m.morphTargets.push({
                                name: "target_1",
                                vertices: u.vertices
                            })
                        }
                        m.morphTargets.push({
                            name: "target_Z",
                            vertices: m.vertices
                        })
                    }
                    l.morphTargets = !0;
                    l = new THREE.Mesh(k,
                        l);
                    l.name = "morph_" + da.length;
                    da.push(l)
                } else l = new THREE.Mesh(k, l);
                c.add(l)
            }
        }
        for (h = 0; h < a.nodes.length; h++) c.add(g(a.nodes[h], a));
        return c
    }

    function h() {
        this.init_from = this.id = ""
    }

    function f() {
        this.type = this.name = this.id = "";
        this.morph = this.skin = null
    }

    function k() {
        this.weights = this.targets = this.source = this.method = null
    }

    function l() {
        this.source = "";
        this.bindShapeMatrix = null;
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = []
    }

    function m() {
        this.name = this.id = "";
        this.nodes = [];
        this.scene = new THREE.Object3D
    }

    function n() {
        this.sid = this.name = this.id = "";
        this.nodes = [];
        this.controllers = [];
        this.transforms = [];
        this.geometries = [];
        this.channels = [];
        this.matrix = new THREE.Matrix4
    }

    function o() {
        this.type = this.sid = "";
        this.data = [];
        this.matrix = new THREE.Matrix4
    }

    function t() {
        this.url = "";
        this.skeleton = [];
        this.instance_material = []
    }

    function u() {
        this.target = this.symbol = ""
    }

    function v() {
        this.url = "";
        this.instance_material = []
    }

    function y() {
        this.id = "";
        this.mesh = null
    }

    function p(a) {
        this.geometry = a.id;
        this.primitives = [];
        this.geometry3js =
            this.vertices = null
    }

    function z() {}

    function w() {
        this.material = "";
        this.count = 0;
        this.inputs = [];
        this.vcount = null;
        this.p = [];
        this.geometry = new THREE.Geometry
    }

    function x() {
        this.source = "";
        this.stride = this.count = 0;
        this.params = []
    }

    function A() {
        this.input = {}
    }

    function D() {
        this.semantic = "";
        this.offset = 0;
        this.source = "";
        this.set = 0
    }

    function B(a) {
        this.id = a;
        this.type = null
    }

    function E() {
        this.name = this.id = "";
        this.instance_effect = null
    }

    function I() {
        this.color = new THREE.Color(0);
        this.color.setRGB(Math.random(), Math.random(),
            Math.random());
        this.color.a = 1;
        this.texcoord = this.texture = null
    }

    function H(a, c) {
        this.type = a;
        this.effect = c;
        this.material = null
    }

    function J(a) {
        this.effect = a;
        this.format = this.init_from = null
    }

    function C(a) {
        this.effect = a;
        this.mipfilter = this.magfilter = this.minfilter = this.wrap_t = this.wrap_s = this.source = null
    }

    function F() {
        this.name = this.id = "";
        this.sampler = this.surface = this.shader = null
    }

    function K() {
        this.url = ""
    }

    function M() {
        this.name = this.id = "";
        this.source = {};
        this.sampler = [];
        this.channel = []
    }

    function N(a) {
        this.animation =
            a;
        this.target = this.source = "";
        this.member = this.arrIndices = this.arrSyntax = this.dotSyntax = this.sid = null
    }

    function L(a) {
        this.id = "";
        this.animation = a;
        this.inputs = [];
        this.endTime = this.startTime = this.interpolation = this.output = this.input = null;
        this.duration = 0
    }

    function O(a) {
        var c = a.getAttribute("id");
        if (X[c] != void 0) return X[c];
        X[c] = (new B(c)).parse(a);
        return X[c]
    }

    function G(a) {
        if (a == "dae") return "http://www.collada.org/2005/11/COLLADASchema";
        return null
    }

    function S(a) {
        for (var a = U(a).split(/\s+/), c = [], b = 0; b < a.length; b++) c.push(parseFloat(a[b]));
        return c
    }

    function P(a) {
        for (var a = U(a).split(/\s+/), c = [], b = 0; b < a.length; b++) c.push(parseInt(a[b], 10));
        return c
    }

    function U(a) {
        return a.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function V(a, c, b) {
        return a.hasAttribute(c) ? parseInt(a.getAttribute(c), 10) : b
    }

    function T(a, c) {
        if (a === void 0) {
            for (var b = "0."; b.length < c + 2;) b += "0";
            return b
        }
        c = c || 2;
        b = a.toString().split(".");
        for (b[1] = b.length > 1 ? b[1].substr(0, c) : "0"; b[1].length < c;) b[1] += "0";
        return b.join(".")
    }

    function R(a, c) {
        var b = "";
        b += T(a.x, c) + ",";
        b += T(a.y, c) + ",";
        b +=
            T(a.z, c);
        return b
    }
    var Q = null,
        Z = null,
        W, $ = null,
        X = {},
        Y = {},
        ca = {},
        aa = {},
        ba = {},
        fa = {},
        ga = {},
        ha, ja, da, ea, ka = THREE.SmoothShading;
    h.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeName == "init_from") this.init_from = b.textContent
        }
        return this
    };
    f.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.type = "none";
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            switch (b.nodeName) {
                case "skin":
                    this.skin =
                        (new l).parse(b);
                    this.type = b.nodeName;
                    break;
                case "morph":
                    this.morph = (new k).parse(b), this.type = b.nodeName
            }
        }
        return this
    };
    k.prototype.parse = function(a) {
        var c = {},
            b = [],
            e;
        this.method = a.getAttribute("method");
        this.source = a.getAttribute("source").replace(/^#/, "");
        for (e = 0; e < a.childNodes.length; e++) {
            var f = a.childNodes[e];
            if (f.nodeType == 1) switch (f.nodeName) {
                case "source":
                    f = (new B).parse(f);
                    c[f.id] = f;
                    break;
                case "targets":
                    b = this.parseInputs(f);
                    break;
                default:
                    console.log(f.nodeName)
            }
        }
        for (e = 0; e < b.length; e++) switch (a =
            b[e], f = c[a.source], a.semantic) {
            case "MORPH_TARGET":
                this.targets = f.read();
                break;
            case "MORPH_WEIGHT":
                this.weights = f.read()
        }
        return this
    };
    k.prototype.parseInputs = function(a) {
        for (var c = [], b = 0; b < a.childNodes.length; b++) {
            var e = a.childNodes[b];
            if (e.nodeType == 1) switch (e.nodeName) {
                case "input":
                    c.push((new D).parse(e))
            }
        }
        return c
    };
    l.prototype.parse = function(a) {
        var c = {},
            b, e;
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = [];
        for (var f = 0; f < a.childNodes.length; f++) {
            var h =
                a.childNodes[f];
            if (h.nodeType == 1) switch (h.nodeName) {
                case "bind_shape_matrix":
                    h = S(h.textContent);
                    this.bindShapeMatrix = new THREE.Matrix4;
                    this.bindShapeMatrix.set(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8], h[9], h[10], h[11], h[12], h[13], h[14], h[15]);
                    break;
                case "source":
                    h = (new B).parse(h);
                    c[h.id] = h;
                    break;
                case "joints":
                    b = h;
                    break;
                case "vertex_weights":
                    e = h;
                    break;
                default:
                    console.log(h.nodeName)
            }
        }
        this.parseJoints(b, c);
        this.parseWeights(e, c);
        return this
    };
    l.prototype.parseJoints = function(a, c) {
        for (var b = 0; b <
            a.childNodes.length; b++) {
            var e = a.childNodes[b];
            if (e.nodeType == 1) switch (e.nodeName) {
                case "input":
                    var e = (new D).parse(e),
                        f = c[e.source];
                    if (e.semantic == "JOINT") this.joints = f.read();
                    else if (e.semantic == "INV_BIND_MATRIX") this.invBindMatrices = f.read()
            }
        }
    };
    l.prototype.parseWeights = function(a, c) {
        for (var b, e, f = [], h = 0; h < a.childNodes.length; h++) {
            var g = a.childNodes[h];
            if (g.nodeType == 1) switch (g.nodeName) {
                case "input":
                    f.push((new D).parse(g));
                    break;
                case "v":
                    b = P(g.textContent);
                    break;
                case "vcount":
                    e = P(g.textContent)
            }
        }
        for (h =
            g = 0; h < e.length; h++) {
            for (var k = e[h], l = [], m = 0; m < k; m++) {
                for (var n = {}, o = 0; o < f.length; o++) {
                    var p = f[o],
                        t = b[g + p.offset];
                    switch (p.semantic) {
                        case "JOINT":
                            n.joint = t;
                            break;
                        case "WEIGHT":
                            n.weight = c[p.source].data[t]
                    }
                }
                l.push(n);
                g += f.length
            }
            for (m = 0; m < l.length; m++) l[m].index = h;
            this.weights.push(l)
        }
    };
    m.prototype.getChildById = function(a, c) {
        for (var b = 0; b < this.nodes.length; b++) {
            var e = this.nodes[b].getChildById(a, c);
            if (e) return e
        }
        return null
    };
    m.prototype.getChildBySid = function(a, c) {
        for (var b = 0; b < this.nodes.length; b++) {
            var e =
                this.nodes[b].getChildBySid(a, c);
            if (e) return e
        }
        return null
    };
    m.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.nodes = [];
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "node":
                    this.nodes.push((new n).parse(b))
            }
        }
        return this
    };
    n.prototype.getChannelForTransform = function(a) {
        for (var c = 0; c < this.channels.length; c++) {
            var b = this.channels[c],
                e = b.target.split("/");
            e.shift();
            var f = e.shift(),
                h = f.indexOf(".") >= 0,
                g = f.indexOf("(") >= 0,
                k;
            if (h) e = f.split("."), f = e.shift(), e.shift();
            else if (g) {
                k = f.split("(");
                f = k.shift();
                for (e = 0; e < k.length; e++) k[e] = parseInt(k[e].replace(/\)/, ""))
            }
            if (f == a) return b.info = {
                sid: f,
                dotSyntax: h,
                arrSyntax: g,
                arrIndices: k
            }, b
        }
        return null
    };
    n.prototype.getChildById = function(a, c) {
        if (this.id == a) return this;
        if (c)
            for (var b = 0; b < this.nodes.length; b++) {
                var e = this.nodes[b].getChildById(a, c);
                if (e) return e
            }
        return null
    };
    n.prototype.getChildBySid = function(a, c) {
        if (this.sid == a) return this;
        if (c)
            for (var b = 0; b <
                this.nodes.length; b++) {
                var e = this.nodes[b].getChildBySid(a, c);
                if (e) return e
            }
        return null
    };
    n.prototype.getTransformBySid = function(a) {
        for (var c = 0; c < this.transforms.length; c++)
            if (this.transforms[c].sid == a) return this.transforms[c];
        return null
    };
    n.prototype.parse = function(a) {
        var c;
        this.id = a.getAttribute("id");
        this.sid = a.getAttribute("sid");
        this.name = a.getAttribute("name");
        this.type = a.getAttribute("type");
        this.type = this.type == "JOINT" ? this.type : "NODE";
        this.nodes = [];
        this.transforms = [];
        this.geometries = [];
        this.controllers = [];
        this.matrix = new THREE.Matrix4;
        for (var b = 0; b < a.childNodes.length; b++)
            if (c = a.childNodes[b], c.nodeType == 1) switch (c.nodeName) {
                case "node":
                    this.nodes.push((new n).parse(c));
                    break;
                case "instance_camera":
                    break;
                case "instance_controller":
                    this.controllers.push((new t).parse(c));
                    break;
                case "instance_geometry":
                    this.geometries.push((new v).parse(c));
                    break;
                case "instance_light":
                    break;
                case "instance_node":
                    c = c.getAttribute("url").replace(/^#/, "");
                    (c = Q.evaluate(".//dae:library_nodes//dae:node[@id='" + c + "']", Q,
                        G, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) && this.nodes.push((new n).parse(c));
                    break;
                case "rotate":
                case "translate":
                case "scale":
                case "matrix":
                case "lookat":
                case "skew":
                    this.transforms.push((new o).parse(c));
                    break;
                case "extra":
                    break;
                default:
                    console.log(c.nodeName)
            }
        a = [];
        b = 1E6;
        c = -1E6;
        for (var e in ca)
            for (var f = ca[e], h = 0; h < f.channel.length; h++) {
                var g = f.channel[h],
                    k = f.sampler[h];
                e = g.target.split("/")[0];
                if (e == this.id) k.create(), g.sampler = k, b = Math.min(b, k.startTime), c = Math.max(c, k.endTime),
                    a.push(g)
            }
        if (a.length) this.startTime = b, this.endTime = c;
        if ((this.channels = a) && this.channels.length) {
            e = 1E7;
            for (i = 0; i < this.channels.length; i++) {
                a = this.channels[i].sampler;
                for (b = 0; b < a.input.length - 1; b++) e = Math.min(e, a.input[b + 1] - a.input[b])
            }
            b = [];
            for (a = this.startTime; a < this.endTime; a += e) {
                c = a;
                for (var f = {}, l = h = void 0, h = 0; h < this.channels.length; h++) l = this.channels[h], f[l.sid] = l;
                g = new THREE.Matrix4;
                for (h = 0; h < this.transforms.length; h++)
                    if (k = this.transforms[h], l = f[k.sid], l !== void 0) {
                        for (var m = l.sampler, p, l = 0; l <
                            m.input.length - 1; l++)
                            if (m.input[l + 1] > c) {
                                p = m.output[l];
                                break
                            }
                        g = p !== void 0 ? p instanceof THREE.Matrix4 ? g.multiply(g, p) : g.multiply(g, k.matrix) : g.multiply(g, k.matrix)
                    } else g = g.multiply(g, k.matrix);
                c = g;
                b.push({
                    time: a,
                    pos: [c.n14, c.n24, c.n34],
                    rotq: [0, 0, 0, 1],
                    scl: [1, 1, 1]
                })
            }
            this.keys = b
        }
        this.updateMatrix();
        return this
    };
    n.prototype.updateMatrix = function() {
        this.matrix.identity();
        for (var a = 0; a < this.transforms.length; a++) this.matrix.multiply(this.matrix, this.transforms[a].matrix)
    };
    o.prototype.parse = function(a) {
        this.sid =
            a.getAttribute("sid");
        this.type = a.nodeName;
        this.data = S(a.textContent);
        this.updateMatrix();
        return this
    };
    o.prototype.updateMatrix = function() {
        var a = 0;
        this.matrix.identity();
        switch (this.type) {
            case "matrix":
                this.matrix.set(this.data[0], this.data[1], this.data[2], this.data[3], this.data[4], this.data[5], this.data[6], this.data[7], this.data[8], this.data[9], this.data[10], this.data[11], this.data[12], this.data[13], this.data[14], this.data[15]);
                break;
            case "translate":
                this.matrix.setTranslation(this.data[0], this.data[1],
                    this.data[2]);
                break;
            case "rotate":
                a = this.data[3] * (Math.PI / 180);
                this.matrix.setRotationAxis(new THREE.Vector3(this.data[0], this.data[1], this.data[2]), a);
                break;
            case "scale":
                this.matrix.setScale(this.data[0], this.data[1], this.data[2])
        }
        return this.matrix
    };
    t.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        this.skeleton = [];
        this.instance_material = [];
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "skeleton":
                    this.skeleton.push(b.textContent.replace(/^#/,
                        ""));
                    break;
                case "bind_material":
                    if (b = Q.evaluate(".//dae:instance_material", b, G, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null))
                        for (var e = b.iterateNext(); e;) this.instance_material.push((new u).parse(e)), e = b.iterateNext()
            }
        }
        return this
    };
    u.prototype.parse = function(a) {
        this.symbol = a.getAttribute("symbol");
        this.target = a.getAttribute("target").replace(/^#/, "");
        return this
    };
    v.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        this.instance_material = [];
        for (var c = 0; c < a.childNodes.length; c++) {
            var b =
                a.childNodes[c];
            if (b.nodeType == 1 && b.nodeName == "bind_material") {
                if (a = Q.evaluate(".//dae:instance_material", b, G, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null))
                    for (c = a.iterateNext(); c;) this.instance_material.push((new u).parse(c)), c = a.iterateNext();
                break
            }
        }
        return this
    };
    y.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            switch (b.nodeName) {
                case "mesh":
                    this.mesh = (new p(this)).parse(b)
            }
        }
        return this
    };
    p.prototype.parse = function(a) {
        function c(a,
            b) {
            var e = R(a.position);
            f[e] === void 0 && (f[e] = {
                v: a,
                index: b
            });
            return f[e]
        }
        this.primitives = [];
        var b;
        for (b = 0; b < a.childNodes.length; b++) {
            var e = a.childNodes[b];
            switch (e.nodeName) {
                case "source":
                    O(e);
                    break;
                case "vertices":
                    this.vertices = (new A).parse(e);
                    break;
                case "triangles":
                    this.primitives.push((new w).parse(e));
                    break;
                case "polygons":
                    console.warn("polygon holes not yet supported!");
                case "polylist":
                    this.primitives.push((new z).parse(e))
            }
        }
        var f = {};
        this.geometry3js = new THREE.Geometry;
        e = X[this.vertices.input.POSITION.source].data;
        for (a = b = 0; b < e.length; b += 3, a++) {
            var h = new THREE.Vertex(new THREE.Vector3(e[b], e[b + 1], e[b + 2]));
            c(h, a);
            this.geometry3js.vertices.push(h)
        }
        for (b = 0; b < this.primitives.length; b++) primitive = this.primitives[b], primitive.setVertices(this.vertices), this.handlePrimitive(primitive, this.geometry3js, f);
        this.geometry3js.computeCentroids();
        this.geometry3js.computeFaceNormals();
        this.geometry3js.computeVertexNormals();
        this.geometry3js.computeBoundingBox();
        return this
    };
    p.prototype.handlePrimitive = function(a, c, b) {
        var e =
            0,
            f, h, g = a.p,
            k = a.inputs,
            l, m, n, o = 0,
            p = 3,
            t = [];
        for (f = 0; f < k.length; f++) switch (l = k[f], l.semantic) {
            case "TEXCOORD":
                t.push(l.set)
        }
        for (; e < g.length;) {
            var u = [],
                v = [],
                y = {},
                w = [];
            a.vcount && (p = a.vcount[o++]);
            for (f = 0; f < p; f++)
                for (h = 0; h < k.length; h++) switch (l = k[h], source = X[l.source], m = g[e + f * k.length + l.offset], numParams = source.accessor.params.length, n = m * numParams, l.semantic) {
                    case "VERTEX":
                        l = R(c.vertices[m].position);
                        u.push(b[l].index);
                        break;
                    case "NORMAL":
                        v.push(new THREE.Vector3(source.data[n], source.data[n + 1], source.data[n +
                            2]));
                        break;
                    case "TEXCOORD":
                        y[l.set] === void 0 && (y[l.set] = []);
                        y[l.set].push(new THREE.UV(source.data[n], source.data[n + 1]));
                        break;
                    case "COLOR":
                        w.push((new THREE.Color).setRGB(source.data[n], source.data[n + 1], source.data[n + 2]))
                }
            var x;
            p == 3 ? x = new THREE.Face3(u[0], u[1], u[2], [v[0], v[1], v[2]], w.length ? w : new THREE.Color) : p == 4 && (x = new THREE.Face4(u[0], u[1], u[2], u[3], [v[0], v[1], v[2], v[3]], w.length ? w : new THREE.Color));
            x.daeMaterial = a.material;
            c.faces.push(x);
            for (h = 0; h < t.length; h++) f = y[t[h]], c.faceVertexUvs[h].push([f[0],
                f[1], f[2]
            ]);
            e += k.length * p
        }
    };
    z.prototype = new w;
    z.prototype.constructor = z;
    w.prototype.setVertices = function(a) {
        for (var c = 0; c < this.inputs.length; c++)
            if (this.inputs[c].source == a.id) this.inputs[c].source = a.input.POSITION.source
    };
    w.prototype.parse = function(a) {
        this.inputs = [];
        this.material = a.getAttribute("material");
        this.count = V(a, "count", 0);
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            switch (b.nodeName) {
                case "input":
                    this.inputs.push((new D).parse(a.childNodes[c]));
                    break;
                case "vcount":
                    this.vcount =
                        P(b.textContent);
                    break;
                case "p":
                    this.p = P(b.textContent)
            }
        }
        return this
    };
    x.prototype.parse = function(a) {
        this.params = [];
        this.source = a.getAttribute("source");
        this.count = V(a, "count", 0);
        this.stride = V(a, "stride", 0);
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeName == "param") {
                var e = {};
                e.name = b.getAttribute("name");
                e.type = b.getAttribute("type");
                this.params.push(e)
            }
        }
        return this
    };
    A.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var c = 0; c < a.childNodes.length; c++) a.childNodes[c].nodeName ==
            "input" && (input = (new D).parse(a.childNodes[c]), this.input[input.semantic] = input);
        return this
    };
    D.prototype.parse = function(a) {
        this.semantic = a.getAttribute("semantic");
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.set = V(a, "set", -1);
        this.offset = V(a, "offset", 0);
        if (this.semantic == "TEXCOORD" && this.set < 0) this.set = 0;
        return this
    };
    B.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            switch (b.nodeName) {
                case "bool_array":
                    for (var e =
                            U(b.textContent).split(/\s+/), f = [], h = 0; h < e.length; h++) f.push(e[h] == "true" || e[h] == "1" ? !0 : !1);
                    this.data = f;
                    this.type = b.nodeName;
                    break;
                case "float_array":
                    this.data = S(b.textContent);
                    this.type = b.nodeName;
                    break;
                case "int_array":
                    this.data = P(b.textContent);
                    this.type = b.nodeName;
                    break;
                case "IDREF_array":
                case "Name_array":
                    this.data = U(b.textContent).split(/\s+/);
                    this.type = b.nodeName;
                    break;
                case "technique_common":
                    for (e = 0; e < b.childNodes.length; e++)
                        if (b.childNodes[e].nodeName == "accessor") {
                            this.accessor = (new x).parse(b.childNodes[e]);
                            break
                        }
            }
        }
        return this
    };
    B.prototype.read = function() {
        var a = [],
            c = this.accessor.params[0];
        switch (c.type) {
            case "IDREF":
            case "Name":
            case "name":
            case "float":
                return this.data;
            case "float4x4":
                for (c = 0; c < this.data.length; c += 16) {
                    var b = this.data.slice(c, c + 16),
                        e = new THREE.Matrix4;
                    e.set(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]);
                    a.push(e)
                }
                break;
            default:
                console.log("ColladaLoader: Source: Read dont know how to read " + c.type + ".")
        }
        return a
    };
    E.prototype.parse = function(a) {
        this.id =
            a.getAttribute("id");
        this.name = a.getAttribute("name");
        for (var c = 0; c < a.childNodes.length; c++)
            if (a.childNodes[c].nodeName == "instance_effect") {
                this.instance_effect = (new K).parse(a.childNodes[c]);
                break
            }
        return this
    };
    I.prototype.isColor = function() {
        return this.texture == null
    };
    I.prototype.isTexture = function() {
        return this.texture != null
    };
    I.prototype.parse = function(a) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "color":
                    b = S(b.textContent);
                    this.color = new THREE.Color(0);
                    this.color.setRGB(b[0], b[1], b[2]);
                    this.color.a = b[3];
                    break;
                case "texture":
                    this.texture = b.getAttribute("texture"), this.texcoord = b.getAttribute("texcoord")
            }
        }
        return this
    };
    H.prototype.parse = function(a) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "ambient":
                case "emission":
                case "diffuse":
                case "specular":
                case "transparent":
                    this[b.nodeName] = (new I).parse(b);
                    break;
                case "shininess":
                case "reflectivity":
                case "transparency":
                    var e;
                    e = Q.evaluate(".//dae:float",
                        b, G, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    for (var f = e.iterateNext(), h = []; f;) h.push(f), f = e.iterateNext();
                    e = h;
                    e.length > 0 && (this[b.nodeName] = parseFloat(e[0].textContent))
            }
        }
        this.create();
        return this
    };
    H.prototype.create = function() {
        var a = {},
            c = this.transparency !== void 0 && this.transparency < 1,
            b;
        for (b in this) switch (b) {
            case "ambient":
            case "emission":
            case "diffuse":
            case "specular":
                var e = this[b];
                if (e instanceof I)
                    if (e.isTexture()) {
                        if (this.effect.sampler && this.effect.surface && this.effect.sampler.source ==
                            this.effect.surface.sid && (e = Y[this.effect.surface.init_from])) a.map = THREE.ImageUtils.loadTexture(ja + e.init_from), a.map.wrapS = THREE.RepeatWrapping, a.map.wrapT = THREE.RepeatWrapping, a.map.repeat.x = 1, a.map.repeat.y = -1
                    } else b == "diffuse" ? a.color = e.color.getHex() : c || (a[b] = e.color.getHex());
                break;
            case "shininess":
            case "reflectivity":
                a[b] = this[b];
                break;
            case "transparency":
                if (c) a.transparent = !0, a.opacity = this[b], c = !0
        }
        a.shading = ka;
        return this.material = new THREE.MeshLambertMaterial(a)
    };
    J.prototype.parse = function(a) {
        for (var c =
                0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "init_from":
                    this.init_from = b.textContent;
                    break;
                case "format":
                    this.format = b.textContent;
                    break;
                default:
                    console.log("unhandled Surface prop: " + b.nodeName)
            }
        }
        return this
    };
    C.prototype.parse = function(a) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "source":
                    this.source = b.textContent;
                    break;
                case "minfilter":
                    this.minfilter = b.textContent;
                    break;
                case "magfilter":
                    this.magfilter =
                        b.textContent;
                    break;
                case "mipfilter":
                    this.mipfilter = b.textContent;
                    break;
                case "wrap_s":
                    this.wrap_s = b.textContent;
                    break;
                case "wrap_t":
                    this.wrap_t = b.textContent;
                    break;
                default:
                    console.log("unhandled Sampler2D prop: " + b.nodeName)
            }
        }
        return this
    };
    F.prototype.create = function() {
        if (this.shader == null) return null
    };
    F.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.shader = null;
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "profile_COMMON":
                    this.parseTechnique(this.parseProfileCOMMON(b))
            }
        }
        return this
    };
    F.prototype.parseNewparam = function(a) {
        for (var c = a.getAttribute("sid"), b = 0; b < a.childNodes.length; b++) {
            var e = a.childNodes[b];
            if (e.nodeType == 1) switch (e.nodeName) {
                case "surface":
                    this.surface = (new J(this)).parse(e);
                    this.surface.sid = c;
                    break;
                case "sampler2D":
                    this.sampler = (new C(this)).parse(e);
                    this.sampler.sid = c;
                    break;
                case "extra":
                    break;
                default:
                    console.log(e.nodeName)
            }
        }
    };
    F.prototype.parseProfileCOMMON = function(a) {
        for (var c, b = 0; b < a.childNodes.length; b++) {
            var e = a.childNodes[b];
            if (e.nodeType == 1) switch (e.nodeName) {
                case "profile_COMMON":
                    this.parseProfileCOMMON(e);
                    break;
                case "technique":
                    c = e;
                    break;
                case "newparam":
                    this.parseNewparam(e);
                    break;
                case "extra":
                    break;
                default:
                    console.log(e.nodeName)
            }
        }
        return c
    };
    F.prototype.parseTechnique = function(a) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "lambert":
                case "blinn":
                case "phong":
                    this.shader = (new H(b.nodeName, this)).parse(b)
            }
        }
    };
    K.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, "");
        return this
    };
    M.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.name = a.getAttribute("name");
        this.source = {};
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "source":
                    b = (new B).parse(b);
                    this.source[b.id] = b;
                    break;
                case "sampler":
                    this.sampler.push((new L(this)).parse(b));
                    break;
                case "channel":
                    this.channel.push((new N(this)).parse(b))
            }
        }
        return this
    };
    N.prototype.parse = function(a) {
        this.source = a.getAttribute("source").replace(/^#/, "");
        this.target = a.getAttribute("target");
        var c = this.target.split("/");
        c.shift();
        var a =
            c.shift(),
            b = a.indexOf(".") >= 0,
            e = a.indexOf("(") >= 0,
            f, h;
        if (b) c = a.split("."), a = c.shift(), h = c.shift();
        else if (e) {
            f = a.split("(");
            a = f.shift();
            for (c = 0; c < f.length; c++) f[c] = parseInt(f[c].replace(/\)/, ""))
        }
        this.sid = a;
        this.dotSyntax = b;
        this.arrSyntax = e;
        this.arrIndices = f;
        this.member = h;
        return this
    };
    L.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        this.inputs = [];
        for (var c = 0; c < a.childNodes.length; c++) {
            var b = a.childNodes[c];
            if (b.nodeType == 1) switch (b.nodeName) {
                case "input":
                    this.inputs.push((new D).parse(b))
            }
        }
        return this
    };
    L.prototype.create = function() {
        for (var a = 0; a < this.inputs.length; a++) {
            var c = this.inputs[a],
                b = this.animation.source[c.source];
            switch (c.semantic) {
                case "INPUT":
                    this.input = b.read();
                    break;
                case "OUTPUT":
                    this.output = b.read();
                    break;
                case "INTERPOLATION":
                    this.interpolation = b.read();
                    break;
                case "IN_TANGENT":
                    break;
                case "OUT_TANGENT":
                    break;
                default:
                    console.log(c.semantic)
            }
        }
        this.duration = this.endTime = this.startTime = 0;
        if (this.input.length) {
            this.startTime = 1E8;
            this.endTime = -1E8;
            for (a = 0; a < this.input.length; a++) this.startTime =
                Math.min(this.startTime, this.input[a]), this.endTime = Math.max(this.endTime, this.input[a]);
            this.duration = this.endTime - this.startTime
        }
    };
    return {
        load: function(c, e) {
            if (document.implementation && document.implementation.createDocument) {
                document.implementation.createDocument("http://www.collada.org/2005/11/COLLADASchema", "COLLADA", null);
                c += "?rnd=" + Math.random();
                var k = new XMLHttpRequest;
                k.overrideMimeType && k.overrideMimeType("text/xml");
                k.onreadystatechange = function() {
                    if (k.readyState == 4 && (k.status == 0 || k.status ==
                            200)) {
                        $ = e;
                        var l, n = c;
                        Q = k.responseXML;
                        l = $;
                        n !== void 0 && (n = n.split("/"), n.pop(), ja = n.length < 1 ? "" : n.join("/") + "/");
                        Y = a("//dae:library_images/dae:image", h, "image");
                        fa = a("//dae:library_materials/dae:material", E, "material");
                        ga = a("//dae:library_effects/dae:effect", F, "effect");
                        ba = a("//dae:library_geometries/dae:geometry", y, "geometry");
                        aa = a("//dae:library_controllers/dae:controller", f, "controller");
                        ca = a("//dae:library_animations/dae:animation", M, "animation");
                        ha = a(".//dae:library_visual_scenes/dae:visual_scene",
                            m, "visual_scene");
                        da = [];
                        ea = [];
                        (n = Q.evaluate(".//dae:scene/dae:instance_visual_scene", Q, G, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext()) ? (n = n.getAttribute("url").replace(/^#/, ""), W = ha[n]) : W = null;
                        Z = new THREE.Object3D;
                        for (n = 0; n < W.nodes.length; n++) Z.add(g(W.nodes[n]));
                        b();
                        for (var o in ca);
                        o = {
                            scene: Z,
                            morphs: da,
                            skins: ea,
                            dae: {
                                images: Y,
                                materials: fa,
                                effects: ga,
                                geometries: ba,
                                controllers: aa,
                                animations: ca,
                                visualScenes: ha,
                                scene: W
                            }
                        };
                        l && l(o)
                    }
                };
                k.open("GET", c, !0);
                k.send(null)
            } else alert("Don't know how to parse XML!")
        },
        setPreferredShading: function(a) {
            ka = a
        },
        applySkin: e,
        geometries: ba
    }
};
THREE.JSONLoader = function(a) {
    THREE.Loader.call(this, a)
};
THREE.JSONLoader.prototype = new THREE.Loader;
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.supr = THREE.Loader.prototype;
THREE.JSONLoader.prototype.load = function(a) {
    var b = this,
        c = a.model,
        e = a.callback,
        g = a.texture_path ? a.texture_path : this.extractUrlbase(c),
        a = new Worker(c);
    a.onmessage = function(a) {
        b.createModel(a.data, e, g);
        b.onLoadComplete()
    };
    this.onLoadStart();
    a.postMessage((new Date).getTime())
};
THREE.JSONLoader.prototype.createModel = function(a, b, c) {
    var e = new THREE.Geometry,
        g = a.scale !== void 0 ? 1 / a.scale : 1;
    this.init_materials(e, a.materials, c);
    (function(c) {
        if (a.version === void 0 || a.version != 2) console.error("Deprecated file format.");
        else {
            var b, g, l, m, n, o, t, u, v, y, p, z, w, x, A = a.faces;
            o = a.vertices;
            var D = a.normals,
                B = a.colors,
                E = 0;
            for (b = 0; b < a.uvs.length; b++) a.uvs[b].length && E++;
            for (b = 0; b < E; b++) e.faceUvs[b] = [], e.faceVertexUvs[b] = [];
            m = 0;
            for (n = o.length; m < n;) t = new THREE.Vertex, t.position.x = o[m++] * c, t.position.y =
                o[m++] * c, t.position.z = o[m++] * c, e.vertices.push(t);
            m = 0;
            for (n = A.length; m < n;) {
                c = A[m++];
                o = c & 1;
                l = c & 2;
                b = c & 4;
                g = c & 8;
                u = c & 16;
                t = c & 32;
                y = c & 64;
                c &= 128;
                o ? (p = new THREE.Face4, p.a = A[m++], p.b = A[m++], p.c = A[m++], p.d = A[m++], o = 4) : (p = new THREE.Face3, p.a = A[m++], p.b = A[m++], p.c = A[m++], o = 3);
                if (l) l = A[m++], p.materials = e.materials[l];
                l = e.faces.length;
                if (b)
                    for (b = 0; b < E; b++) z = a.uvs[b], v = A[m++], x = z[v * 2], v = z[v * 2 + 1], e.faceUvs[b][l] = new THREE.UV(x, v);
                if (g)
                    for (b = 0; b < E; b++) {
                        z = a.uvs[b];
                        w = [];
                        for (g = 0; g < o; g++) v = A[m++], x = z[v * 2], v = z[v * 2 + 1], w[g] =
                            new THREE.UV(x, v);
                        e.faceVertexUvs[b][l] = w
                    }
                if (u) u = A[m++] * 3, g = new THREE.Vector3, g.x = D[u++], g.y = D[u++], g.z = D[u], p.normal = g;
                if (t)
                    for (b = 0; b < o; b++) u = A[m++] * 3, g = new THREE.Vector3, g.x = D[u++], g.y = D[u++], g.z = D[u], p.vertexNormals.push(g);
                if (y) t = A[m++], t = new THREE.Color(B[t]), p.color = t;
                if (c)
                    for (b = 0; b < o; b++) t = A[m++], t = new THREE.Color(B[t]), p.vertexColors.push(t);
                e.faces.push(p)
            }
        }
    })(g);
    (function() {
        var c, b, g, l;
        if (a.skinWeights) {
            c = 0;
            for (b = a.skinWeights.length; c < b; c += 2) g = a.skinWeights[c], l = a.skinWeights[c + 1], e.skinWeights.push(new THREE.Vector4(g,
                l, 0, 0))
        }
        if (a.skinIndices) {
            c = 0;
            for (b = a.skinIndices.length; c < b; c += 2) g = a.skinIndices[c], l = a.skinIndices[c + 1], e.skinIndices.push(new THREE.Vector4(g, l, 0, 0))
        }
        e.bones = a.bones;
        e.animation = a.animation
    })();
    (function(c) {
        if (a.morphTargets !== void 0) {
            var b, g, l, m, n, o, t, u, v;
            b = 0;
            for (g = a.morphTargets.length; b < g; b++) {
                e.morphTargets[b] = {};
                e.morphTargets[b].name = a.morphTargets[b].name;
                e.morphTargets[b].vertices = [];
                u = e.morphTargets[b].vertices;
                v = a.morphTargets[b].vertices;
                l = 0;
                for (m = v.length; l < m; l += 3) n = v[l] * c, o = v[l + 1] *
                    c, t = v[l + 2] * c, u.push(new THREE.Vertex(new THREE.Vector3(n, o, t)))
            }
        }
        if (a.morphColors !== void 0) {
            b = 0;
            for (g = a.morphColors.length; b < g; b++) {
                e.morphColors[b] = {};
                e.morphColors[b].name = a.morphColors[b].name;
                e.morphColors[b].colors = [];
                m = e.morphColors[b].colors;
                n = a.morphColors[b].colors;
                c = 0;
                for (l = n.length; c < l; c += 3) o = new THREE.Color(16755200), o.setRGB(n[c], n[c + 1], n[c + 2]), m.push(o)
            }
        }
    })(g);
    e.computeCentroids();
    e.computeFaceNormals();
    this.hasNormals(e) && e.computeTangents();
    b(e)
};
THREE.SceneLoader = function() {
    this.onLoadStart = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {};
    this.callbackSync = function() {};
    this.callbackProgress = function() {}
};
THREE.SceneLoader.prototype = {
    load: function(a, b) {
        var c = this,
            e = new Worker(a);
        e.postMessage(0);
        var g = THREE.Loader.prototype.extractUrlbase(a);
        e.onmessage = function(a) {
            function e(a, c) {
                return c == "relativeToHTML" ? a : g + "/" + a
            }

            function k() {
                for (u in F.objects)
                    if (!G.objects[u])
                        if (w = F.objects[u], w.geometry !== void 0) {
                            if (B = G.geometries[w.geometry]) {
                                var a = !1;
                                J = [];
                                for (P = 0; P < w.materials.length; P++) J[P] = G.materials[w.materials[P]], a = J[P] instanceof THREE.ShaderMaterial;
                                a && B.computeTangents();
                                x = w.position;
                                r = w.rotation;
                                q = w.quaternion;
                                s = w.scale;
                                q = 0;
                                J.length == 0 && (J[0] = new THREE.MeshFaceMaterial);
                                J.length > 1 && (J = [new THREE.MeshFaceMaterial]);
                                object = new THREE.Mesh(B, J);
                                object.name = u;
                                object.position.set(x[0], x[1], x[2]);
                                q ? (object.quaternion.set(q[0], q[1], q[2], q[3]), object.useQuaternion = !0) : object.rotation.set(r[0], r[1], r[2]);
                                object.scale.set(s[0], s[1], s[2]);
                                object.visible = w.visible;
                                G.scene.add(object);
                                G.objects[u] = object;
                                w.meshCollider && (a = THREE.CollisionUtils.MeshColliderWBox(object), G.scene.collisions.colliders.push(a));
                                if (w.castsShadow) a = new THREE.ShadowVolume(B), G.scene.add(a), a.position = object.position, a.rotation = object.rotation, a.scale = object.scale;
                                w.trigger && w.trigger.toLowerCase() != "none" && (a = {
                                    type: w.trigger,
                                    object: w
                                }, G.triggers[object.name] = a)
                            }
                        } else x = w.position, r = w.rotation, q = w.quaternion, s = w.scale, q = 0, object = new THREE.Object3D, object.name = u, object.position.set(x[0], x[1], x[2]), q ? (object.quaternion.set(q[0], q[1], q[2], q[3]), object.useQuaternion = !0) : object.rotation.set(r[0], r[1], r[2]), object.scale.set(s[0],
                            s[1], s[2]), object.visible = w.visible !== void 0 ? w.visible : !1, G.scene.add(object), G.objects[u] = object, G.empties[u] = object, w.trigger && w.trigger.toLowerCase() != "none" && (a = {
                            type: w.trigger,
                            object: w
                        }, G.triggers[object.name] = a)
            }

            function l(a) {
                return function(b) {
                    G.geometries[a] = b;
                    k();
                    M -= 1;
                    c.onLoadComplete();
                    n()
                }
            }

            function m(a) {
                return function(c) {
                    G.geometries[a] = c
                }
            }

            function n() {
                c.callbackProgress({
                    totalModels: L,
                    totalTextures: O,
                    loadedModels: L - M,
                    loadedTextures: O - N
                }, G);
                c.onLoadProgress();
                M == 0 && N == 0 && b(G)
            }
            var o, t,
                u, v, y, p, z, w, x, A, D, B, E, I, H, J, C, F, K, M, N, L, O, G;
            F = a.data;
            H = new THREE.BinaryLoader;
            K = new THREE.JSONLoader;
            N = M = 0;
            G = {
                scene: new THREE.Scene,
                geometries: {},
                materials: {},
                textures: {},
                objects: {},
                cameras: {},
                lights: {},
                fogs: {},
                triggers: {},
                empties: {}
            };
            a = !1;
            for (u in F.objects)
                if (w = F.objects[u], w.meshCollider) {
                    a = !0;
                    break
                }
            if (a) G.scene.collisions = new THREE.CollisionSystem;
            if (F.transform) {
                a = F.transform.position;
                A = F.transform.rotation;
                var S = F.transform.scale;
                a && G.scene.position.set(a[0], a[1], a[2]);
                A && G.scene.rotation.set(A[0],
                    A[1], A[2]);
                S && G.scene.scale.set(S[0], S[1], S[2]);
                (a || A || S) && G.scene.updateMatrix()
            }
            a = function() {
                N -= 1;
                n();
                c.onLoadComplete()
            };
            for (y in F.cameras) A = F.cameras[y], A.type == "perspective" ? E = new THREE.PerspectiveCamera(A.fov, A.aspect, A.near, A.far) : A.type == "ortho" && (E = new THREE.OrthographicCamera(A.left, A.right, A.top, A.bottom, A.near, A.far)), x = A.position, A = A.target, E.position.set(x[0], x[1], x[2]), E.target = new THREE.Vector3(A[0], A[1], A[2]), G.cameras[y] = E;
            for (v in F.lights) y = F.lights[v], E = y.color !== void 0 ? y.color :
                16777215, A = y.intensity !== void 0 ? y.intensity : 1, y.type == "directional" ? (x = y.direction, C = new THREE.DirectionalLight(E, A), C.position.set(x[0], x[1], x[2]), C.position.normalize()) : y.type == "point" ? (x = y.position, d = y.distance, C = new THREE.PointLight(E, A, d), C.position.set(x[0], x[1], x[2])) : y.type == "ambient" && (C = new THREE.AmbientLight(E)), G.scene.add(C), G.lights[v] = C;
            for (p in F.fogs) v = F.fogs[p], v.type == "linear" ? I = new THREE.Fog(0, v.near, v.far) : v.type == "exp2" && (I = new THREE.FogExp2(0, v.density)), A = v.color, I.color.setRGB(A[0],
                A[1], A[2]), G.fogs[p] = I;
            if (G.cameras && F.defaults.camera) G.currentCamera = G.cameras[F.defaults.camera];
            if (G.fogs && F.defaults.fog) G.scene.fog = G.fogs[F.defaults.fog];
            A = F.defaults.bgcolor;
            G.bgColor = new THREE.Color;
            G.bgColor.setRGB(A[0], A[1], A[2]);
            G.bgColorAlpha = F.defaults.bgalpha;
            for (o in F.geometries)
                if (p = F.geometries[o], p.type == "bin_mesh" || p.type == "ascii_mesh") M += 1, c.onLoadStart();
            L = M;
            for (o in F.geometries) p = F.geometries[o], p.type == "cube" ? (B = new THREE.CubeGeometry(p.width, p.height, p.depth, p.segmentsWidth,
                p.segmentsHeight, p.segmentsDepth, null, p.flipped, p.sides), G.geometries[o] = B) : p.type == "plane" ? (B = new THREE.PlaneGeometry(p.width, p.height, p.segmentsWidth, p.segmentsHeight), G.geometries[o] = B) : p.type == "sphere" ? (B = new THREE.SphereGeometry(p.radius, p.segmentsWidth, p.segmentsHeight), G.geometries[o] = B) : p.type == "cylinder" ? (B = new THREE.CylinderGeometry(p.topRad, p.botRad, p.height, p.radSegs, p.heightSegs), G.geometries[o] = B) : p.type == "torus" ? (B = new THREE.TorusGeometry(p.radius, p.tube, p.segmentsR, p.segmentsT), G.geometries[o] =
                B) : p.type == "icosahedron" ? (B = new THREE.IcosahedronGeometry(p.subdivisions), G.geometries[o] = B) : p.type == "bin_mesh" ? H.load({
                model: e(p.url, F.urlBaseType),
                callback: l(o)
            }) : p.type == "ascii_mesh" ? K.load({
                model: e(p.url, F.urlBaseType),
                callback: l(o)
            }) : p.type == "embedded_mesh" && (p = F.embeds[p.id]) && K.createModel(p, m(o), "");
            for (z in F.textures)
                if (o = F.textures[z], o.url instanceof Array) {
                    N += o.url.length;
                    for (H = 0; H < o.url.length; H++) c.onLoadStart()
                } else N += 1, c.onLoadStart();
            O = N;
            for (z in F.textures) {
                o = F.textures[z];
                if (o.mapping !=
                    void 0 && THREE[o.mapping] != void 0) o.mapping = new THREE[o.mapping];
                if (o.url instanceof Array) {
                    H = [];
                    for (var P = 0; P < o.url.length; P++) H[P] = e(o.url[P], F.urlBaseType);
                    H = THREE.ImageUtils.loadTextureCube(H, o.mapping, a)
                } else {
                    H = THREE.ImageUtils.loadTexture(e(o.url, F.urlBaseType), o.mapping, a);
                    if (THREE[o.minFilter] != void 0) H.minFilter = THREE[o.minFilter];
                    if (THREE[o.magFilter] != void 0) H.magFilter = THREE[o.magFilter];
                    if (o.repeat) {
                        H.repeat.set(o.repeat[0], o.repeat[1]);
                        if (o.repeat[0] != 1) H.wrapS = THREE.RepeatWrapping;
                        if (o.repeat[1] !=
                            1) H.wrapT = THREE.RepeatWrapping
                    }
                    o.offset && H.offset.set(o.offset[0], o.offset[1]);
                    if (o.wrap) {
                        K = {
                            repeat: THREE.RepeatWrapping,
                            mirror: THREE.MirroredRepeatWrapping
                        };
                        if (K[o.wrap[0]] !== void 0) H.wrapS = K[o.wrap[0]];
                        if (K[o.wrap[1]] !== void 0) H.wrapT = K[o.wrap[1]]
                    }
                }
                G.textures[z] = H
            }
            for (t in F.materials) {
                z = F.materials[t];
                for (D in z.parameters)
                    if (D == "envMap" || D == "map" || D == "lightMap") z.parameters[D] = G.textures[z.parameters[D]];
                    else if (D == "shading") z.parameters[D] = z.parameters[D] == "flat" ? THREE.FlatShading : THREE.SmoothShading;
                else if (D == "blending") z.parameters[D] = THREE[z.parameters[D]] ? THREE[z.parameters[D]] : THREE.NormalBlending;
                else if (D == "combine") z.parameters[D] = z.parameters[D] == "MixOperation" ? THREE.MixOperation : THREE.MultiplyOperation;
                else if (D == "vertexColors")
                    if (z.parameters[D] == "face") z.parameters[D] = THREE.FaceColors;
                    else if (z.parameters[D]) z.parameters[D] = THREE.VertexColors;
                if (z.parameters.opacity !== void 0 && z.parameters.opacity < 1) z.parameters.transparent = !0;
                if (z.parameters.normalMap) {
                    o = THREE.ShaderUtils.lib.normal;
                    a = THREE.UniformsUtils.clone(o.uniforms);
                    H = z.parameters.color;
                    K = z.parameters.specular;
                    p = z.parameters.ambient;
                    I = z.parameters.shininess;
                    a.tNormal.texture = G.textures[z.parameters.normalMap];
                    if (z.parameters.normalMapFactor) a.uNormalScale.value = z.parameters.normalMapFactor;
                    if (z.parameters.map) a.tDiffuse.texture = z.parameters.map, a.enableDiffuse.value = !0;
                    if (z.parameters.lightMap) a.tAO.texture = z.parameters.lightMap, a.enableAO.value = !0;
                    if (z.parameters.specularMap) a.tSpecular.texture = G.textures[z.parameters.specularMap],
                        a.enableSpecular.value = !0;
                    a.uDiffuseColor.value.setHex(H);
                    a.uSpecularColor.value.setHex(K);
                    a.uAmbientColor.value.setHex(p);
                    a.uShininess.value = I;
                    if (z.parameters.opacity) a.uOpacity.value = z.parameters.opacity;
                    z = new THREE.ShaderMaterial({
                        fragmentShader: o.fragmentShader,
                        vertexShader: o.vertexShader,
                        uniforms: a,
                        lights: !0,
                        fog: !0
                    })
                } else z = new THREE[z.type](z.parameters);
                G.materials[t] = z
            }
            k();
            c.callbackSync(G)
        }
    },
    constructor: THREE.SceneLoader
};
THREE.UTF8Loader = function() {};
THREE.UTF8Loader.prototype = new THREE.UTF8Loader;
THREE.UTF8Loader.prototype.constructor = THREE.UTF8Loader;
THREE.UTF8Loader.prototype.load = function(a) {
    var b = new XMLHttpRequest,
        c = a.model,
        e = a.callback,
        g = a.scale !== void 0 ? a.scale : 1,
        h = a.offsetX !== void 0 ? a.offsetX : 0,
        f = a.offsetY !== void 0 ? a.offsetY : 0,
        k = a.offsetZ !== void 0 ? a.offsetZ : 0;
    b.onreadystatechange = function() {
        b.readyState == 4 ? b.status == 200 || b.status == 0 ? THREE.UTF8Loader.prototype.createModel(b.responseText, e, g, h, f, k) : alert("Couldn't load [" + c + "] [" + b.status + "]") : b.readyState != 3 && b.readyState == 2 && b.getResponseHeader("Content-Length")
    };
    b.open("GET", c, !0);
    b.send(null)
};
THREE.UTF8Loader.prototype.decompressMesh = function(a) {
    var b = a.charCodeAt(0);
    b >= 57344 && (b -= 2048);
    b++;
    for (var c = new Float32Array(8 * b), e = 1, g = 0; g < 8; g++) {
        for (var h = 0, f = 0; f < b; ++f) {
            var k = a.charCodeAt(f + e);
            h += k >> 1 ^ -(k & 1);
            c[8 * f + g] = h
        }
        e += b
    }
    b = a.length - e;
    h = new Uint16Array(b);
    for (g = f = 0; g < b; g++) k = a.charCodeAt(g + e), h[g] = f - k, k == 0 && f++;
    return [c, h]
};
THREE.UTF8Loader.prototype.createModel = function(a, b, c, e, g, h) {
    var f = function() {
        var b = this;
        b.materials = [];
        THREE.Geometry.call(this);
        var f = THREE.UTF8Loader.prototype.decompressMesh(a),
            m = [],
            n = [];
        (function(a, f, l) {
            for (var m, n, p, z = a.length; l < z; l += f) m = a[l], n = a[l + 1], p = a[l + 2], m = m / 16383 * c, n = n / 16383 * c, p = p / 16383 * c, m += e, n += g, p += h, b.vertices.push(new THREE.Vertex(new THREE.Vector3(m, n, p)))
        })(f[0], 8, 0);
        (function(a, c, b) {
            for (var e, f, g = a.length; b < g; b += c) e = a[b], f = a[b + 1], e /= 1023, f /= 1023, n.push(e, 1 - f)
        })(f[0], 8, 3);
        (function(a,
            c, b) {
            for (var e, f, g, h = a.length; b < h; b += c) e = a[b], f = a[b + 1], g = a[b + 2], e = (e - 512) / 511, f = (f - 512) / 511, g = (g - 512) / 511, m.push(e, f, g)
        })(f[0], 8, 5);
        (function(a) {
            var c, e, f, g, h, l, w, x, A, D = a.length;
            for (c = 0; c < D; c += 3) {
                e = a[c];
                f = a[c + 1];
                g = a[c + 2];
                h = b;
                x = e;
                A = f;
                l = g;
                w = e;
                var B = f,
                    E = g,
                    I = h.materials[0],
                    H = m[B * 3],
                    J = m[B * 3 + 1],
                    B = m[B * 3 + 2],
                    C = m[E * 3],
                    F = m[E * 3 + 1],
                    E = m[E * 3 + 2];
                w = new THREE.Vector3(m[w * 3], m[w * 3 + 1], m[w * 3 + 2]);
                B = new THREE.Vector3(H, J, B);
                E = new THREE.Vector3(C, F, E);
                h.faces.push(new THREE.Face3(x, A, l, [w, B, E], null, I));
                h = n[e * 2];
                e = n[e * 2 +
                    1];
                l = n[f * 2];
                w = n[f * 2 + 1];
                x = n[g * 2];
                A = n[g * 2 + 1];
                g = b.faceVertexUvs[0];
                f = l;
                l = w;
                w = [];
                w.push(new THREE.UV(h, e));
                w.push(new THREE.UV(f, l));
                w.push(new THREE.UV(x, A));
                g.push(w)
            }
        })(f[1]);
        this.computeCentroids();
        this.computeFaceNormals()
    };
    f.prototype = new THREE.Geometry;
    f.prototype.constructor = f;
    b(new f)
};
THREE.Axes = function() {
    THREE.Object3D.call(this);
    var a = new THREE.Geometry;
    a.vertices.push(new THREE.Vertex);
    a.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 100, 0)));
    var b = new THREE.CylinderGeometry(0, 5, 25, 5, 1),
        c = new THREE.Line(a, new THREE.LineBasicMaterial({
            color: 16711680
        }));
    c.rotation.z = -Math.PI / 2;
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 16711680
    }));
    c.position.x = 100;
    c.rotation.z = -Math.PI / 2;
    this.add(c);
    c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 65280
    }));
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 65280
    }));
    c.position.y = 100;
    this.add(c);
    c = new THREE.Line(a, new THREE.LineBasicMaterial({
        color: 255
    }));
    c.rotation.x = Math.PI / 2;
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: 255
    }));
    c.position.z = 100;
    c.rotation.x = Math.PI / 2;
    this.add(c)
};
THREE.Axes.prototype = new THREE.Object3D;
THREE.Axes.prototype.constructor = THREE.Axes;
THREE.MarchingCubes = function(a, b) {
    THREE.Object3D.call(this);
    this.materials = b instanceof Array ? b : [b];
    this.init = function(a) {
        this.isolation = 80;
        this.size = a;
        this.size2 = this.size * this.size;
        this.size3 = this.size2 * this.size;
        this.halfsize = this.size / 2;
        this.delta = 2 / this.size;
        this.yd = this.size;
        this.zd = this.size2;
        this.field = new Float32Array(this.size3);
        this.normal_cache = new Float32Array(this.size3 * 3);
        this.vlist = new Float32Array(36);
        this.nlist = new Float32Array(36);
        this.firstDraw = !0;
        this.maxCount = 4096;
        this.count =
            0;
        this.hasNormal = this.hasPos = !1;
        this.positionArray = new Float32Array(this.maxCount * 3);
        this.normalArray = new Float32Array(this.maxCount * 3)
    };
    this.lerp = function(a, b, g) {
        return a + (b - a) * g
    };
    this.VIntX = function(a, b, g, h, f, k, l, m, n, o) {
        f = (f - n) / (o - n);
        n = this.normal_cache;
        b[h] = k + f * this.delta;
        b[h + 1] = l;
        b[h + 2] = m;
        g[h] = this.lerp(n[a], n[a + 3], f);
        g[h + 1] = this.lerp(n[a + 1], n[a + 4], f);
        g[h + 2] = this.lerp(n[a + 2], n[a + 5], f)
    };
    this.VIntY = function(a, b, g, h, f, k, l, m, n, o) {
        f = (f - n) / (o - n);
        n = this.normal_cache;
        b[h] = k;
        b[h + 1] = l + f * this.delta;
        b[h +
            2] = m;
        b = a + this.yd * 3;
        g[h] = this.lerp(n[a], n[b], f);
        g[h + 1] = this.lerp(n[a + 1], n[b + 1], f);
        g[h + 2] = this.lerp(n[a + 2], n[b + 2], f)
    };
    this.VIntZ = function(a, b, g, h, f, k, l, m, n, o) {
        f = (f - n) / (o - n);
        n = this.normal_cache;
        b[h] = k;
        b[h + 1] = l;
        b[h + 2] = m + f * this.delta;
        b = a + this.zd * 3;
        g[h] = this.lerp(n[a], n[b], f);
        g[h + 1] = this.lerp(n[a + 1], n[b + 1], f);
        g[h + 2] = this.lerp(n[a + 2], n[b + 2], f)
    };
    this.compNorm = function(a) {
        var b = a * 3;
        this.normal_cache[b] == 0 && (this.normal_cache[b] = this.field[a - 1] - this.field[a + 1], this.normal_cache[b + 1] = this.field[a - this.yd] - this.field[a +
            this.yd], this.normal_cache[b + 2] = this.field[a - this.zd] - this.field[a + this.zd])
    };
    this.polygonize = function(a, b, g, h, f, k) {
        var l = h + 1,
            m = h + this.yd,
            n = h + this.zd,
            o = l + this.yd,
            t = l + this.zd,
            u = h + this.yd + this.zd,
            v = l + this.yd + this.zd,
            y = 0,
            p = this.field[h],
            z = this.field[l],
            w = this.field[m],
            x = this.field[o],
            A = this.field[n],
            D = this.field[t],
            B = this.field[u],
            E = this.field[v];
        p < f && (y |= 1);
        z < f && (y |= 2);
        w < f && (y |= 8);
        x < f && (y |= 4);
        A < f && (y |= 16);
        D < f && (y |= 32);
        B < f && (y |= 128);
        E < f && (y |= 64);
        var I = THREE.edgeTable[y];
        if (I == 0) return 0;
        var H = this.delta,
            J = a + H,
            C = b + H,
            H = g + H;
        I & 1 && (this.compNorm(h), this.compNorm(l), this.VIntX(h * 3, this.vlist, this.nlist, 0, f, a, b, g, p, z));
        I & 2 && (this.compNorm(l), this.compNorm(o), this.VIntY(l * 3, this.vlist, this.nlist, 3, f, J, b, g, z, x));
        I & 4 && (this.compNorm(m), this.compNorm(o), this.VIntX(m * 3, this.vlist, this.nlist, 6, f, a, C, g, w, x));
        I & 8 && (this.compNorm(h), this.compNorm(m), this.VIntY(h * 3, this.vlist, this.nlist, 9, f, a, b, g, p, w));
        I & 16 && (this.compNorm(n), this.compNorm(t), this.VIntX(n * 3, this.vlist, this.nlist, 12, f, a, b, H, A, D));
        I & 32 && (this.compNorm(t),
            this.compNorm(v), this.VIntY(t * 3, this.vlist, this.nlist, 15, f, J, b, H, D, E));
        I & 64 && (this.compNorm(u), this.compNorm(v), this.VIntX(u * 3, this.vlist, this.nlist, 18, f, a, C, H, B, E));
        I & 128 && (this.compNorm(n), this.compNorm(u), this.VIntY(n * 3, this.vlist, this.nlist, 21, f, a, b, H, A, B));
        I & 256 && (this.compNorm(h), this.compNorm(n), this.VIntZ(h * 3, this.vlist, this.nlist, 24, f, a, b, g, p, A));
        I & 512 && (this.compNorm(l), this.compNorm(t), this.VIntZ(l * 3, this.vlist, this.nlist, 27, f, J, b, g, z, D));
        I & 1024 && (this.compNorm(o), this.compNorm(v), this.VIntZ(o *
            3, this.vlist, this.nlist, 30, f, J, C, g, x, E));
        I & 2048 && (this.compNorm(m), this.compNorm(u), this.VIntZ(m * 3, this.vlist, this.nlist, 33, f, a, C, g, w, B));
        y <<= 4;
        for (f = h = 0; THREE.triTable[y + f] != -1;) a = y + f, b = a + 1, g = a + 2, this.posnormtriv(this.vlist, this.nlist, 3 * THREE.triTable[a], 3 * THREE.triTable[b], 3 * THREE.triTable[g], k), f += 3, h++;
        return h
    };
    this.posnormtriv = function(a, b, g, h, f, k) {
        var l = this.count * 3;
        this.positionArray[l] = a[g];
        this.positionArray[l + 1] = a[g + 1];
        this.positionArray[l + 2] = a[g + 2];
        this.positionArray[l + 3] = a[h];
        this.positionArray[l +
            4] = a[h + 1];
        this.positionArray[l + 5] = a[h + 2];
        this.positionArray[l + 6] = a[f];
        this.positionArray[l + 7] = a[f + 1];
        this.positionArray[l + 8] = a[f + 2];
        this.normalArray[l] = b[g];
        this.normalArray[l + 1] = b[g + 1];
        this.normalArray[l + 2] = b[g + 2];
        this.normalArray[l + 3] = b[h];
        this.normalArray[l + 4] = b[h + 1];
        this.normalArray[l + 5] = b[h + 2];
        this.normalArray[l + 6] = b[f];
        this.normalArray[l + 7] = b[f + 1];
        this.normalArray[l + 8] = b[f + 2];
        this.hasNormal = this.hasPos = !0;
        this.count += 3;
        this.count >= this.maxCount - 3 && k(this)
    };
    this.begin = function() {
        this.count = 0;
        this.hasNormal = this.hasPos = !1
    };
    this.end = function(a) {
        if (this.count != 0) {
            for (var b = this.count * 3; b < this.positionArray.length; b++) this.positionArray[b] = 0;
            a(this)
        }
    };
    this.addBall = function(a, b, g, h, f) {
        var k = this.size * Math.sqrt(h / f),
            l = g * this.size,
            m = b * this.size,
            n = a * this.size,
            o = Math.floor(l - k);
        o < 1 && (o = 1);
        l = Math.floor(l + k);
        l > this.size - 1 && (l = this.size - 1);
        var t = Math.floor(m - k);
        t < 1 && (t = 1);
        m = Math.floor(m + k);
        m > this.size - 1 && (m = this.size - 1);
        var u = Math.floor(n - k);
        u < 1 && (u = 1);
        k = Math.floor(n + k);
        k > this.size - 1 && (k = this.size -
            1);
        for (var v, y, p, z, w, x; o < l; o++) {
            n = this.size2 * o;
            y = o / this.size - g;
            w = y * y;
            for (y = t; y < m; y++) {
                p = n + this.size * y;
                v = y / this.size - b;
                x = v * v;
                for (v = u; v < k; v++) z = v / this.size - a, z = h / (1.0E-6 + z * z + x + w) - f, z > 0 && (this.field[p + v] += z)
            }
        }
    };
    this.addPlaneX = function(a, b) {
        var g, h, f, k, l, m = this.size,
            n = this.yd,
            o = this.zd,
            t = this.field,
            u = m * Math.sqrt(a / b);
        u > m && (u = m);
        for (g = 0; g < u; g++)
            if (h = g / m, h *= h, k = a / (1.0E-4 + h) - b, k > 0)
                for (h = 0; h < m; h++) {
                    l = g + h * n;
                    for (f = 0; f < m; f++) t[o * f + l] += k
                }
    };
    this.addPlaneY = function(a, b) {
        var g, h, f, k, l, m, n = this.size,
            o = this.yd,
            t =
            this.zd,
            u = this.field,
            v = n * Math.sqrt(a / b);
        v > n && (v = n);
        for (h = 0; h < v; h++)
            if (g = h / n, g *= g, k = a / (1.0E-4 + g) - b, k > 0) {
                l = h * o;
                for (g = 0; g < n; g++) {
                    m = l + g;
                    for (f = 0; f < n; f++) u[t * f + m] += k
                }
            }
    };
    this.addPlaneZ = function(a, b) {
        var g, h, f, k, l, m;
        size = this.size;
        yd = this.yd;
        zd = this.zd;
        field = this.field;
        dist = size * Math.sqrt(a / b);
        dist > size && (dist = size);
        for (f = 0; f < dist; f++)
            if (g = f / size, g *= g, k = a / (1.0E-4 + g) - b, k > 0) {
                l = zd * f;
                for (h = 0; h < size; h++) {
                    m = l + h * yd;
                    for (g = 0; g < size; g++) field[m + g] += k
                }
            }
    };
    this.reset = function() {
        var a;
        for (a = 0; a < this.size3; a++) this.normal_cache[a *
            3] = 0, this.field[a] = 0
    };
    this.render = function(a) {
        this.begin();
        var b, g, h, f, k, l, m, n, o, t = this.size - 2;
        for (f = 1; f < t; f++) {
            o = this.size2 * f;
            m = (f - this.halfsize) / this.halfsize;
            for (h = 1; h < t; h++) {
                n = o + this.size * h;
                l = (h - this.halfsize) / this.halfsize;
                for (g = 1; g < t; g++) k = (g - this.halfsize) / this.halfsize, b = n + g, this.polygonize(k, l, m, b, this.isolation, a)
            }
        }
        this.end(a)
    };
    this.generateGeometry = function() {
        var a = 0,
            b = new THREE.Geometry,
            g = [];
        this.render(function(h) {
            var f, k, l, m, n, o, t, u;
            for (f = 0; f < h.count; f++) t = f * 3, n = t + 1, u = t + 2, k = h.positionArray[t],
                l = h.positionArray[n], m = h.positionArray[u], o = new THREE.Vector3(k, l, m), k = h.normalArray[t], l = h.normalArray[n], m = h.normalArray[u], t = new THREE.Vector3(k, l, m), t.normalize(), n = new THREE.Vertex(o), b.vertices.push(n), g.push(t);
            nfaces = h.count / 3;
            for (f = 0; f < nfaces; f++) t = (a + f) * 3, n = t + 1, u = t + 2, o = g[t], k = g[n], l = g[u], t = new THREE.Face3(t, n, u, [o, k, l]), b.faces.push(t);
            a += nfaces;
            h.count = 0
        });
        return b
    };
    this.init(a)
};
THREE.MarchingCubes.prototype = new THREE.Object3D;
THREE.MarchingCubes.prototype.constructor = THREE.MarchingCubes;
THREE.edgeTable = new Int32Array([0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107,
    1370, 598, 863, 85, 348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958, 170,
    419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0
]);
THREE.triTable = new Int32Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1, 3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1, 3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, 9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 9, 0, 2, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1, 8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1, 3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1, 1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1, 4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1, 4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1, 2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1, 9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1, 10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1, 5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1, 5, 4, 8, 5,
    8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1, 0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1, 8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1, 2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, 7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, 9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1, 2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1, 11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1, -1, 9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1, 5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1, 11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1, 11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1, 2, 3, 11, 10, 6,
    5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1, 6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1, 3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1, 6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1, 6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, 1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1, 8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1, 7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1, 3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1, 0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, 9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1, 8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1, 5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1, 0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1, 6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1, 10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1,
    10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1, 8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1, 1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1, 0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, 10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1, 3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1, 6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1, 9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1, 8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1, 3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1,
    6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1, 10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1, 10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1, 7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1, 7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1, 1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1, 11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1,
    8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1, 0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1, 7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1, 7,
    2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1, 2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1, 10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1, 10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1, 0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1, 7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1, 6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1, 6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1, 4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1, 10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1, 8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, 0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1, 1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1, 10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1, 4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1, 10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1, 9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1, 7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1, 3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1, 7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1, 3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1, 6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1, 9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1, 1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1, 4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1, 7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1, 6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1, 0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1, 6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1, 0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1, 11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1, 6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1, 5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1, 9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1, 1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1, 1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1, 10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1, 0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1, 5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1, 10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1, 11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1, 9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1, 7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1, 2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, 8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1, 9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1, 9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1, 1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1, 9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, 5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1, 0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1, 10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1, 2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1, 0, 4, 11, 0, 11, 3, 4, 5, 11,
    2, 11, 1, 5, 1, 11, -1, 0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1, 9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1, 5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1, 3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1, 5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1, 9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1, 1, 10, 11, 1, 11,
    4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1, 3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1, 4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1, 9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1, 11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1, 11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1, 2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1, 9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1, 3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1, 1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1, 4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1, 3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1, 0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1, 9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1, 1, 10,
    2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
]);
THREE.PlaneCollider = function(a, b) {
    this.point = a;
    this.normal = b
};
THREE.SphereCollider = function(a, b) {
    this.center = a;
    this.radius = b;
    this.radiusSq = b * b
};
THREE.BoxCollider = function(a, b) {
    this.min = a;
    this.max = b;
    this.dynamic = !0;
    this.normal = new THREE.Vector3
};
THREE.MeshCollider = function(a, b) {
    this.mesh = a;
    this.box = b;
    this.numFaces = this.mesh.geometry.faces.length;
    this.normal = new THREE.Vector3
};
THREE.CollisionSystem = function() {
    this.collisionNormal = new THREE.Vector3;
    this.colliders = [];
    this.hits = []
};
THREE.Collisions = new THREE.CollisionSystem;
THREE.CollisionSystem.prototype.merge = function(a) {
    Array.prototype.push.apply(this.colliders, a.colliders);
    Array.prototype.push.apply(this.hits, a.hits)
};
THREE.CollisionSystem.prototype.rayCastAll = function(a) {
    a.direction.normalize();
    this.hits.length = 0;
    var b, c, e, g, h = 0;
    b = 0;
    for (c = this.colliders.length; b < c; b++)
        if (g = this.colliders[b], e = this.rayCast(a, g), e < Number.MAX_VALUE) g.distance = e, e > h ? this.hits.push(g) : this.hits.unshift(g), h = e;
    return this.hits
};
THREE.CollisionSystem.prototype.rayCastNearest = function(a) {
    var b = this.rayCastAll(a);
    if (b.length == 0) return null;
    for (var c = 0; b[c] instanceof THREE.MeshCollider;) {
        var e = this.rayMesh(a, b[c]);
        if (e.dist < Number.MAX_VALUE) {
            b[c].distance = e.dist;
            b[c].faceIndex = e.faceIndex;
            break
        }
        c++
    }
    if (c > b.length) return null;
    return b[c]
};
THREE.CollisionSystem.prototype.rayCast = function(a, b) {
    if (b instanceof THREE.PlaneCollider) return this.rayPlane(a, b);
    else if (b instanceof THREE.SphereCollider) return this.raySphere(a, b);
    else if (b instanceof THREE.BoxCollider) return this.rayBox(a, b);
    else if (b instanceof THREE.MeshCollider && b.box) return this.rayBox(a, b.box)
};
THREE.CollisionSystem.prototype.rayMesh = function(a, b) {
    for (var c = this.makeRayLocal(a, b.mesh), e = Number.MAX_VALUE, g, h = 0; h < b.numFaces; h++) {
        var f = b.mesh.geometry.faces[h],
            k = b.mesh.geometry.vertices[f.a].position,
            l = b.mesh.geometry.vertices[f.b].position,
            m = b.mesh.geometry.vertices[f.c].position,
            n = f instanceof THREE.Face4 ? b.mesh.geometry.vertices[f.d].position : null;
        f instanceof THREE.Face3 ? (f = this.rayTriangle(c, k, l, m, e, this.collisionNormal, b.mesh), f < e && (e = f, g = h, b.normal.copy(this.collisionNormal), b.normal.normalize())) :
            f instanceof THREE.Face4 && (f = this.rayTriangle(c, k, l, n, e, this.collisionNormal, b.mesh), f < e && (e = f, g = h, b.normal.copy(this.collisionNormal), b.normal.normalize()), f = this.rayTriangle(c, l, m, n, e, this.collisionNormal, b.mesh), f < e && (e = f, g = h, b.normal.copy(this.collisionNormal), b.normal.normalize()))
    }
    return {
        dist: e,
        faceIndex: g
    }
};
THREE.CollisionSystem.prototype.rayTriangle = function(a, b, c, e, g, h, f) {
    var k = THREE.CollisionSystem.__v1,
        l = THREE.CollisionSystem.__v2;
    h.set(0, 0, 0);
    k.sub(c, b);
    l.sub(e, c);
    h.cross(k, l);
    k = h.dot(a.direction);
    if (!(k < 0))
        if (f.doubleSided || f.flipSided) h.multiplyScalar(-1), k *= -1;
        else return Number.MAX_VALUE;
    f = h.dot(b) - h.dot(a.origin);
    if (!(f <= 0)) return Number.MAX_VALUE;
    if (!(f >= k * g)) return Number.MAX_VALUE;
    f /= k;
    k = THREE.CollisionSystem.__v3;
    k.copy(a.direction);
    k.multiplyScalar(f);
    k.addSelf(a.origin);
    Math.abs(h.x) >
        Math.abs(h.y) ? Math.abs(h.x) > Math.abs(h.z) ? (a = k.y - b.y, h = c.y - b.y, g = e.y - b.y, k = k.z - b.z, c = c.z - b.z, e = e.z - b.z) : (a = k.x - b.x, h = c.x - b.x, g = e.x - b.x, k = k.y - b.y, c = c.y - b.y, e = e.y - b.y) : Math.abs(h.y) > Math.abs(h.z) ? (a = k.x - b.x, h = c.x - b.x, g = e.x - b.x, k = k.z - b.z, c = c.z - b.z, e = e.z - b.z) : (a = k.x - b.x, h = c.x - b.x, g = e.x - b.x, k = k.y - b.y, c = c.y - b.y, e = e.y - b.y);
    b = h * e - c * g;
    if (b == 0) return Number.MAX_VALUE;
    b = 1 / b;
    e = (a * e - k * g) * b;
    if (!(e >= 0)) return Number.MAX_VALUE;
    b *= h * k - c * a;
    if (!(b >= 0)) return Number.MAX_VALUE;
    if (!(1 - e - b >= 0)) return Number.MAX_VALUE;
    return f
};
THREE.CollisionSystem.prototype.makeRayLocal = function(a, b) {
    var c = THREE.CollisionSystem.__m;
    THREE.Matrix4.makeInvert(b.matrixWorld, c);
    var e = THREE.CollisionSystem.__r;
    e.origin.copy(a.origin);
    e.direction.copy(a.direction);
    c.multiplyVector3(e.origin);
    c.rotateAxis(e.direction);
    e.direction.normalize();
    return e
};
THREE.CollisionSystem.prototype.rayBox = function(a, b) {
    var c;
    b.dynamic && b.mesh && b.mesh.matrixWorld ? c = this.makeRayLocal(a, b.mesh) : (c = THREE.CollisionSystem.__r, c.origin.copy(a.origin), c.direction.copy(a.direction));
    var e = 0,
        g = 0,
        h = 0,
        f = 0,
        k = 0,
        l = 0,
        m = !0;
    c.origin.x < b.min.x ? (e = b.min.x - c.origin.x, e /= c.direction.x, m = !1, f = -1) : c.origin.x > b.max.x && (e = b.max.x - c.origin.x, e /= c.direction.x, m = !1, f = 1);
    c.origin.y < b.min.y ? (g = b.min.y - c.origin.y, g /= c.direction.y, m = !1, k = -1) : c.origin.y > b.max.y && (g = b.max.y - c.origin.y, g /= c.direction.y,
        m = !1, k = 1);
    c.origin.z < b.min.z ? (h = b.min.z - c.origin.z, h /= c.direction.z, m = !1, l = -1) : c.origin.z > b.max.z && (h = b.max.z - c.origin.z, h /= c.direction.z, m = !1, l = 1);
    if (m) return -1;
    m = 0;
    g > e && (m = 1, e = g);
    h > e && (m = 2, e = h);
    switch (m) {
        case 0:
            k = c.origin.y + c.direction.y * e;
            if (k < b.min.y || k > b.max.y) return Number.MAX_VALUE;
            c = c.origin.z + c.direction.z * e;
            if (c < b.min.z || c > b.max.z) return Number.MAX_VALUE;
            b.normal.set(f, 0, 0);
            break;
        case 1:
            f = c.origin.x + c.direction.x * e;
            if (f < b.min.x || f > b.max.x) return Number.MAX_VALUE;
            c = c.origin.z + c.direction.z *
                e;
            if (c < b.min.z || c > b.max.z) return Number.MAX_VALUE;
            b.normal.set(0, k, 0);
            break;
        case 2:
            f = c.origin.x + c.direction.x * e;
            if (f < b.min.x || f > b.max.x) return Number.MAX_VALUE;
            k = c.origin.y + c.direction.y * e;
            if (k < b.min.y || k > b.max.y) return Number.MAX_VALUE;
            b.normal.set(0, 0, l)
    }
    return e
};
THREE.CollisionSystem.prototype.rayPlane = function(a, b) {
    var c = a.direction.dot(b.normal),
        e = b.point.dot(b.normal);
    if (c < 0) c = (e - a.origin.dot(b.normal)) / c;
    else return Number.MAX_VALUE;
    return c > 0 ? c : Number.MAX_VALUE
};
THREE.CollisionSystem.prototype.raySphere = function(a, b) {
    var c = b.center.clone().subSelf(a.origin);
    if (c.lengthSq < b.radiusSq) return -1;
    var e = c.dot(a.direction.clone());
    if (e <= 0) return Number.MAX_VALUE;
    c = b.radiusSq - (c.lengthSq() - e * e);
    if (c >= 0) return Math.abs(e) - Math.sqrt(c);
    return Number.MAX_VALUE
};
THREE.CollisionSystem.__v1 = new THREE.Vector3;
THREE.CollisionSystem.__v2 = new THREE.Vector3;
THREE.CollisionSystem.__v3 = new THREE.Vector3;
THREE.CollisionSystem.__nr = new THREE.Vector3;
THREE.CollisionSystem.__m = new THREE.Matrix4;
THREE.CollisionSystem.__r = new THREE.Ray;
THREE.CollisionUtils = {};
THREE.CollisionUtils.MeshOBB = function(a) {
    a.geometry.computeBoundingBox();
    var b = a.geometry.boundingBox,
        c = new THREE.Vector3(b.x[0], b.y[0], b.z[0]),
        b = new THREE.Vector3(b.x[1], b.y[1], b.z[1]),
        c = new THREE.BoxCollider(c, b);
    c.mesh = a;
    return c
};
THREE.CollisionUtils.MeshAABB = function(a) {
    var b = THREE.CollisionUtils.MeshOBB(a);
    b.min.addSelf(a.position);
    b.max.addSelf(a.position);
    b.dynamic = !1;
    return b
};
THREE.CollisionUtils.MeshColliderWBox = function(a) {
    return new THREE.MeshCollider(a, THREE.CollisionUtils.MeshOBB(a))
};
if (THREE.WebGLRenderer) THREE.AnaglyphWebGLRenderer = function(a) {
    THREE.WebGLRenderer.call(this, a);
    var b = this,
        c = this.setSize,
        e = this.render,
        g = new THREE.PerspectiveCamera,
        h = new THREE.PerspectiveCamera,
        f = new THREE.Matrix4,
        k = new THREE.Matrix4,
        l, m, n;
    g.matrixAutoUpdate = h.matrixAutoUpdate = !1;
    var a = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat
        },
        o = new THREE.WebGLRenderTarget(512, 512, a),
        t = new THREE.WebGLRenderTarget(512, 512, a),
        u = new THREE.PerspectiveCamera(53, 1, 1, 1E4);
    u.position.z =
        2;
    _material = new THREE.ShaderMaterial({
        uniforms: {
            mapLeft: {
                type: "t",
                value: 0,
                texture: o
            },
            mapRight: {
                type: "t",
                value: 1,
                texture: t
            }
        },
        vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}"
    });
    var v = new THREE.Scene;
    v.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), _material));
    this.setSize = function(a, e) {
        c.call(b, a, e);
        o.width = a;
        o.height = e;
        t.width = a;
        t.height = e
    };
    this.render = function(a, c) {
        c.update(null, !0);
        if (l !== c.aspect || m !== c.near || n !== c.fov) {
            l = c.aspect;
            m = c.near;
            n = c.fov;
            var z = c.projectionMatrix.clone(),
                w = 125 / 30 * 0.5,
                x = w * m / 125,
                A = m * Math.tan(n * Math.PI / 360),
                D;
            f.n14 = w;
            k.n14 = -w;
            w = -A * l + x;
            D = A * l + x;
            z.n11 = 2 * m / (D - w);
            z.n13 = (D + w) / (D - w);
            g.projectionMatrix = z.clone();
            w = -A * l - x;
            D = A * l - x;
            z.n11 = 2 * m / (D - w);
            z.n13 =
                (D + w) / (D - w);
            h.projectionMatrix = z.clone()
        }
        g.matrix = c.matrixWorld.clone().multiplySelf(k);
        g.update(null, !0);
        g.position.copy(c.position);
        g.near = m;
        g.far = c.far;
        e.call(b, a, g, o, !0);
        h.matrix = c.matrixWorld.clone().multiplySelf(f);
        h.update(null, !0);
        h.position.copy(c.position);
        h.near = m;
        h.far = c.far;
        e.call(b, a, h, t, !0);
        e.call(b, v, u)
    }
};
if (THREE.WebGLRenderer) THREE.CrosseyedWebGLRenderer = function(a) {
    THREE.WebGLRenderer.call(this, a);
    this.autoClear = !1;
    var b = this,
        c = this.setSize,
        e = this.render,
        g, h, f = new THREE.PerspectiveCamera;
    f.target = new THREE.Vector3(0, 0, 0);
    var k = new THREE.PerspectiveCamera;
    k.target = new THREE.Vector3(0, 0, 0);
    b.separation = 10;
    if (a && a.separation !== void 0) b.separation = a.separation;
    this.setSize = function(a, e) {
        c.call(b, a, e);
        g = a / 2;
        h = e
    };
    this.render = function(a, c) {
        this.clear();
        f.fov = c.fov;
        f.aspect = 0.5 * c.aspect;
        f.near = c.near;
        f.far =
            c.far;
        f.updateProjectionMatrix();
        f.position.copy(c.position);
        f.target.copy(c.target);
        f.translateX(b.separation);
        f.lookAt(f.target);
        k.projectionMatrix = f.projectionMatrix;
        k.position.copy(c.position);
        k.target.copy(c.target);
        k.translateX(-b.separation);
        k.lookAt(k.target);
        this.setViewport(0, 0, g, h);
        e.call(b, a, f);
        this.setViewport(g, 0, g, h);
        e.call(b, a, k, !1)
    }
};