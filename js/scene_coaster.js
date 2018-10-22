var months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

function monthNumToName(monthnum) {
    return months[monthnum - 1] || '';
}
function findBannerNamed(a) {
    var b = null;
    return banners.forEach(function(c) {
        c.name == a && (b = c)
    }), b
}

function calloutType(a) {
    return a.off = "undefined" != typeof a.off ? +a.off : 0, a
}

function type(a) {
    return a.close = +a.close.split(",").join(""), a
}

function petype(a) {
    return a.pe = Math.max(+a.pe, 0), a
}
function playsound(path) {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', path);
  audioElement.play();
}
function fadeObjects(a) {
	playsound('sounds/click.mp3');
	if (a.fadein) {
        new TWEEN.Tween({
            o: 0
        }).to({
            o: 1
        }, 5).onUpdate(function() {}).chain(new TWEEN.Tween({
            o: 0
        }).to({
            o: 1
        }, 1e3).onUpdate(function() {
            a.parent.material.opacity = this.o;
            var b = this;
            a.parent.children.forEach(function(a) {
                a.material.opacity = b.o
            })
        }).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function() {
            a.hasOwnProperty("callback") && a.callback()
        })).start()
    } else {
        new TWEEN.Tween({
            o: 0
        }).to({
            o: 1
        }, 5).onUpdate(function() {}).chain(new TWEEN.Tween({
            o: 1
        }).to({
            o: 0
        }, 1e3).onUpdate(function() {
            a.parent.material.opacity = this.o;
            var b = this;
            a.parent.children.forEach(function(a) {
                a.material.opacity = b.o
            })
        }).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function() {
            a.hasOwnProperty("callback") && a.callback()
        })).start()
    }
}

function start(a) {
	
    $("body").removeClass("notstarted"), $("#startscreen").remove(), started = !0, vropt = mobile || force3d
}

function init() {
    function a(a) {
        if (started) {
            var b = c(a);
            if (b.length > 0) {
                var d = b[0];
                d.object.hasOwnProperty("_choose") && d.object.material.opacity >= 1 ? d.object._choose(selected) : mobile && walkbutton._choose()
            } else mobile && walkbutton._choose()
        }
    }

    function b(a) {
        if (started) {
            var b = c(a);
            if (b.length > 0) {
                var d = b[0];
                d.object.hasOwnProperty("_choose") && d.object.material.opacity >= 1 && $("body").addClass("mousehover")
            } else $("body").removeClass("mousehover")
        }
    }

    function c(a) {
        return started ? (z.x = a.clientX / window.innerWidth * 2 - 1, z.y = 2 * -(a.clientY / window.innerHeight) + 1, raycaster.setFromCamera(mousevec.set(z.x, z.y), camera), raycaster.intersectObjects(j)) : []
    }

    function d(a) {
        var b = a.pedata,
            c = a.data;
        callouts = a.callouts, banners = a.banners, stops = a.stops, stopcheck = stops.join("#"), chartPEData = b, peZ.domain(d3.extent(b, function(a) {
            return a.pe
        })), chartData = c, L.range([0, c.length]);
        var d = d3.extent(c, function(a) {
            return parseDate(a.date)
        });
        K.domain(d);
        //var f = d3.max(c, function(a) {
         //   return a.close
        //});
		var f = 1500;
        Q.domain([0, f]), 
		R.domain([0, f]), minix.domain(d), miniy.domain([0, f]), xscale = K, yscale = Q, xiscale = L, yUScale = R;
        var g = (width / c.length, new THREE.MeshPhongMaterial({
                color: feverColor,
                emissive: feverEmit
            })),
            h = new THREE.MeshBasicMaterial({
                visible: !1
            });
        chartWindow = new THREE.Mesh(new THREE.PlaneBufferGeometry(width, height, 1, 1), h), chartWindow.position.set(chartplane, height / 2, 0), chartWindow.rotation.set(0, -Math.PI / 2, 0), scene.add(chartWindow), j.push(chartWindow), chartWindow.react = function(a) {
            if (!climbbutton.climbing) {
                var b = a.intersects[0].point,
                    c = Math.floor(xiscale(b.z));
                datum = chartData[c], datum.pe = chartPEData[c].pe
            }
        }; {
            var i = (new THREE.Geometry, new THREE.Geometry, new THREE.Geometry),
                k = new THREE.Geometry,
                l = new THREE.Geometry,
                m = ({
                    direction: new THREE.Vector3,
                    arrow: null,
                    rotation: new THREE.Euler,
                    edgeGeometry: null,
                    position: new THREE.Vector3,
                    edge: null
                }, new THREE.SphereGeometry(feverwidth, 6, 6));
            new THREE.Mesh(m)
        }
        recession = !1, recpassed = 0, prevmon=00;
        for (var n = 0, o = 0, p = 0, q = 0; q < c.length - 1; q++) {
            0 == q && (c[q].x = K(parseDate(c[q].date))), c[q + 1].x = K(parseDate(c[q + 1].date));
            var r = new THREE.Vector3(chartplane, Q(c[q].close), c[q].x),
                s = new THREE.Vector3(chartplane, Q(c[q + 1].close), c[q + 1].x);
            a1 = yUScale(c[q].close), a2 = yUScale(c[q + 1].close), k.vertices.push(r);
            var t = c[q];
            if (recpassed < recessions.length) {
                var u = recessions[recpassed];
                t.date.split("/")[0] == u.split("/")[0] && t.date.split("/")[2] == u.split("/")[2] && (recession = !recession, recpassed++)
            }
            N.push(new THREE.Vector3(minix(parseDate(c[q].date)), miniy(c[q].close), 0));
            var v = new THREE.Vector3(chartplane - peZ(chartPEData[q + 1].pe) / 2, s.y, s.z),
                w = new THREE.Vector3(chartplane - peZ(chartPEData[q].pe) / 2, r.y, r.z),
                x = new THREE.Vector3(chartplane + peZ(chartPEData[q].pe) / 2, r.y, r.z),
                y = new THREE.Vector3(chartplane + peZ(chartPEData[q + 1].pe) / 2, s.y, s.z),
                z = new THREE.Vector3(chartplane + pewidth / 2, r.y, r.z),
                A = new THREE.Vector3(chartplane + pewidth / 2, s.y, s.z),
                B = i.vertices.length;
            i.vertices.push(v, w, x, y), l.vertices.push(y, x, z, A);
            var C = recession ? recColor : YLineCol,
                D = new THREE.Face3(B, B + 1, B + 2),
                E = new THREE.Face3(B + 2, B + 3, B),
                F = [new THREE.Color, new THREE.Color, new THREE.Color, new THREE.Color];
            F[0].copy(C), F[1].copy(C), F[2].copy(C), F[3].copy(C), F[0].multiplyScalar(a2), F[1].multiplyScalar(a1), F[2].multiplyScalar(a1), F[3].multiplyScalar(a2), D.vertexColors.push(F[0], F[1], F[2]), E.vertexColors.push(F[2], F[3], F[0]), i.faces.push(D, E);
            var G = new THREE.Face3(B, B + 1, B + 2),
                H = new THREE.Face3(B + 2, B + 3, B);
            l.faces.push(G, H);
			for(mm=1;mm<13;mm++){
            if ((mm == t.date.split("/")[0] || 0 == q) && +t.date.split("/")[2] > o) {
					if(o!=t.date.split("/")[0])
					{
						o = +t.date.split("/")[0], p = t.date.split("/")[0], spritey = e(monthNumToName(mm), {
							fontsize: 50,
							textColor: yearTextColor
						}), spritey.position.set(chartplane, r.y + 4, r.z), scene.add(spritey);
						var I = new THREE.Geometry,
							J = I.vertices,
							O = spritey.position.clone();
							O.y -= 1.5, J.push(O, new THREE.Vector3(O.x, r.y, r.z)), I.computeLineDistances();
						var P = new THREE.Line(I, lineYearMaterial);
						platformYearLines.push(P), scene.add(P), yearlabels.push({
							label: spritey,							
							line: P
						})				
				}
            }
			}
            if ("01" != t.date.split("/")[0] || (+t.date.split("/")[2] > o, 1)) {
                if (t.date.split("/")[0] !== p, !1) {
                    p = t.date.split("/")[0];
                    var I = new THREE.Geometry,
                        J = I.vertices;
                    J.push(new THREE.Vector3(chartplane, Q(t.close), K(n)), new THREE.Vector3(chartplane, Q(0), K(n))), I.computeLineDistances();
                    var P = new THREE.Line(I, lineMaterial);
                    scene.add(P)
                }
            } else {
                o = +t.date.split("/")[2], p = t.date.split("/")[0];
                var I = new THREE.Geometry,
                    J = I.vertices;
                J.push(new THREE.Vector3(chartplane, Q(t.close), K(n)), new THREE.Vector3(chartplane, Q(0), K(n))), I.computeLineDistances();
                var P = new THREE.Line(I, lineThickMaterial);
                scene.add(P)
            } 
            n++
        }
        for (var S = new THREE.SplineCurve3(k.vertices), T = {
                steps: 4 * k.vertices.length,
                bevelEnabled: !1,
                extrudePath: S
            }, U = [], V = 6, n = 0; V > n; n++) {
            var W = .2,
                X = n / V * Math.PI * 2;
            U.push(new THREE.Vector2(Math.cos(X) * W, Math.sin(X) * W))
        }
        var Y = new THREE.Shape(U),
            Z = new THREE.ExtrudeGeometry(Y, T);
        console.log("made extrude"), edgeMesh = new THREE.Mesh(Z, g), scene.add(edgeMesh);
        var _ = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            depthWrite: !0,
            transparent: !0,
            opacity: 0,
            side: THREE.DoubleSide,
            shininess: 2,
            specular: 11184810,
            color: 16777215
        });
        i.computeFaceNormals(), feverPlatformMesh = new THREE.Mesh(i, _), scene.add(feverPlatformMesh);
        var aa = new THREE.MeshBasicMaterial({
            color: platformInvColor,
            transparent: !0,
            opacity: 0,
            wireframe: !1,
            depthTest: !0,
            depthWrite: !1,
            side: THREE.DoubleSide
        });
        l.computeFaceNormals(), feverPlatformInverseMeshA = new THREE.Mesh(l, aa), scene.add(feverPlatformInverseMeshA), feverPlatformInverseMeshB = new THREE.Mesh(l, aa), scene.add(feverPlatformInverseMeshB), feverPlatformInverseMeshB.scale.x = -1, feverPlatformInverseMeshB.position.x += 2 * chartplane, platformFinalPos = feverPlatformMesh.position.clone(), platformInverseAPos = feverPlatformInverseMeshA.position.clone(), platformInverseBPos = feverPlatformInverseMeshB.position.clone(), feverPlatformMesh.position.y = feverPlatformInverseMeshA.position.y = feverPlatformInverseMeshB.position.y = 500, k.computeLineDistances();
        var ba = new THREE.LineBasicMaterial({
            color: feverShadowLineColor,
            linewidth: 1,
            linecap: "round",
            linejoin: "round"
        });
        feverShadowLine = new THREE.Line(k, ba), feverShadowLineN = new THREE.Line(k, ba), scene.add(feverShadowLine, feverShadowLineN), M.computeLineDistances();
        var ca = new THREE.LineBasicMaterial({
            color: minifevercolor,
            linewidth: 1
        });
        minifever = new THREE.Line(M, ca), minichart.add(minifever, miniMarkerMesh), vrhud.add(minichart), minichart.rotateX(0), minichart.position.set(minichartpos.x, minichartpos.y, minichartpos.z);
        for (var da = 15, ea = 0; da >= ea; ea++) {
            var fa = f / da,
                ga = Math.floor(ea * fa),
                ha = Q(ga),
                I = new THREE.Geometry,
                J = I.vertices;
            J.push(new THREE.Vector3(14.95, ha, -width / 2), new THREE.Vector3(14.95, ha, width / 2)), I.computeLineDistances();
            var ia = new THREE.LineBasicMaterial({
                color: chartlines
            });
            ia.linewidth = 0 == ea ? 2 : 1;
            var P = new THREE.Line(I, ia);
            scene.add(P), gridlines.push(P), spritey = e(ga, {
                fontsize: 40,
                textColor: labelColor
            }), spritey.position.set(14, ha - 1, -width / 2), spritey = e(ga, {
                fontsize: 60,
                textColor: labelColor
            }), spritey.position.set(9, ha - 1, width / 2)
        }
        var ja = new THREE.BoxGeometry(.25, .25, width),
            ka = new THREE.MeshLambertMaterial({
                color: chartlines,
                emissive: chartlines
            }),
            la = new THREE.Mesh(ja, ka);
        la.position.set(chartplane, Q(0), 0), scene.add(la);
        var ma = new THREE.MeshBasicMaterial({
                color: titlecolor
            }),
            na = [ma],
            oa = new THREE.TextGeometry(a.title, {
                size: 4,
                height: 0,
                curveSegments: 3,
                font: "droid sans",
                material: 0
            }),
            pa = new THREE.MeshFaceMaterial(na);
        chartTitleMesh = new THREE.Mesh(oa, pa), oa.computeBoundingBox();
        oa.boundingBox.max.x - oa.boundingBox.min.x;
        chartTitleMesh.position.set(chartplane, Q(f + 100), -width / 2), chartTitleMesh.rotation.y = -Math.PI / 2, scene.add(chartTitleMesh), recessionlabels.forEach(function(a) {
            var b = e(a.label, {
                    fontsize: 30,
                    textColor: {
                        r: 207,
                        g: 41,
                        b: 49,
                        a: 1
                    }
                }),
                c = a.hasOwnProperty("off") && "undefined" != typeof a.off ? {
                    x: 0,
                    y: a.off,
                    z: 0
                } : {
                    x: 0,
                    y: 0,
                    z: 0
                },
                d = a.hasOwnProperty("close") ? Q(a.close) : getYforDate(a.date);
            b.position.set(chartplane + c.x, d + 6 + c.y, K(parseDate(a.date)) + c.z), b.material.opacity = 1, scene.add(b), a.label = b;
            var f = new THREE.Geometry,
                g = f.vertices,
                h = b.position.clone();
            h.y -= 1.2;
            var i = b.position.clone();
            i.y = d, g.push(h, i), f.computeLineDistances();
            var j = new THREE.LineBasicMaterial({
                color: recessionColor,
                transparent: !0,
                opacity: 0
            });
            lineMaterial.linewidth = 1;
            var k = new THREE.Line(f, j);
            a.line = k, scene.add(k)
        }), callouts.forEach(function(a, b) {
            var c = e(a.text, {
                    fontsize: 30,
                    textColor: labelColor
                }),
                d = a.hasOwnProperty("off") && "undefined" != typeof a.off ? {
                    x: 0,
                    y: a.off,
                    z: 0
                } : {
                    x: 0,
                    y: 0,
                    z: 0
                },
                f = a.hasOwnProperty("close") ? Q(a.close) : getYforDate(a.date),
                g = b % 2 ? 8 : 10;
            if (c.position.set(chartplane + d.x, f + g + d.y, K(parseDate(a.date)) + d.z), c.material.opacity = 0, a.hasOwnProperty("_choose")) {
                var h = new TextureSprite(new THREE.ImageUtils.loadTexture("textures/icons.png"), iconsprites.redinfo);
                prepImg(h.texture);
                var i = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 1, 1), new THREE.MeshBasicMaterial({
                    color: 16777215,
                    map: h.texture,
                    side: THREE.FrontSide,
                    transparent: !0,
                    opacity: 1
                }));
                i.position.set(chartplane + 6 + d.x, Q(a.close) + 1 + d.y, K(parseDate(a.date)) + d.z), i._choose = a._choose, j.push(i)
            }
            scene.add(c), a.sprite = c, a.target = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 1, 1), new THREE.MeshBasicMaterial({
                visible: !1
            })), a.target.position = c.position.clone();
            var k = new THREE.Geometry,
                l = k.vertices,
                m = c.position.clone();
            m.y -= 1.2;
            var n = c.position.clone();
            n.y = f, l.push(m, n), k.computeLineDistances();
            var o = new THREE.LineBasicMaterial({
                color: platformYearLineColor,
                transparent: !0,
                opacity: 0
            });
            o.linewidth = 1;
            var p = new THREE.Line(k, o);
            a.line = p, scene.add(p)
        }), banners.forEach(function(a) {
            var b = new THREE.ImageUtils.loadTexture("textures/" + a.name),
                c = a.hasOwnProperty("hide") ? 0 : 1,
                d = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 5, 1, 1), new THREE.MeshBasicMaterial({
                    color: 16777215,
                    map: b,
                    side: THREE.FrontSide,
                    transparent: !0,
                    opacity: c
                }));
            if (d.position.set(chartplane, Q(a.close) + 13, K(parseDate(a.date)) + 9), a.hasOwnProperty("paneloffset") && d.position.add(a.paneloffset), a.hasOwnProperty("hide") && (a.opos = d.position.clone(), d.position.set(100, 100, 100)), d.rotateY(Math.PI), a.hasOwnProperty("choosecallback") && (d._choose = climb_choose, j.push(d)), a.hasOwnProperty("navbuttons")) {
                if (a.navbuttons.hasOwnProperty("next")) {
                    var e = new TextureSprite(new THREE.ImageUtils.loadTexture("textures/icons.png"), iconsprites.next);
                    prepImg(e.texture);
                    var f = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.2, 2.2, 1, 1), new THREE.MeshBasicMaterial({
                        color: 16777215,
                        emissive: 16777215,
                        map: e.texture,
                        transparent: !0,
                        side: THREE.FrontSide,
                        depthTest: !0,
                        opacity: c
                    }));
                    f.position.set(0, -4.3, 0), d.add(f), f._choose = function() {
                        a.navbuttons.next({
                            panel: d
                        })
                    }, j.push(f)
                }
                if (a.navbuttons.hasOwnProperty("rocket")) {
                    var e = new TextureSprite(new THREE.ImageUtils.loadTexture("textures/icons.png"), iconsprites.rocket);
                    prepImg(e.texture);
                    var f = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.2, 2.2, 1, 1), new THREE.MeshBasicMaterial({
                        color: 16777215,
                        emissive: 16777215,
                        map: e.texture,
                        transparent: !0,
                        side: THREE.FrontSide,
                        depthTest: !0,
                        opacity: c
                    }));
                    f.position.set(2, -4.3, 0), d.add(f), f._choose = function() {
                        a.navbuttons.rocket({
                            panel: d
                        })
                    }, j.push(f)
                }
                if (a.navbuttons.hasOwnProperty("previous")) {
                    var g = new TextureSprite(new THREE.ImageUtils.loadTexture("textures/icons.png"), iconsprites.previous);
                    prepImg(g.texture);
                    var h = new THREE.Mesh(new THREE.PlaneBufferGeometry(2.2, 2.2, 1, 1), new THREE.MeshBasicMaterial({
                        color: 16777215,
                        map: g.texture,
                        transparent: !0,
                        side: THREE.FrontSide,
                        opacity: c
                    }));
                    h.position.set(-2, -4.3, 0), d.add(h), h._choose = function() {
                        a.navbuttons.previous({
                            panel: d
                        })
                    }, j.push(h)
                }
            }
            a.mesh = d, d.scale.multiplyScalar(1.5), scene.add(d)
        }), $("body").addClass("ready")
    }

    function e(a, b) {
        var c = 28,
            d = f(a, b),
            e = {
                map: d,
                depthTest: !0,
                depthWrite: !1
            },
            g = new THREE.SpriteMaterial(e),
            h = new THREE.Sprite(g);
        return h.scale.set(d.image.width / c, d.image.height / c, 1), h
    }

    function f(a, b) {
        void 0 === b && (b = {});
        var c = b.hasOwnProperty("fontface") ? b.fontface : "Whitney SSm",
            d = b.hasOwnProperty("fontsize") ? b.fontsize : 18,
            e = b.hasOwnProperty("borderThickness") ? b.borderThickness : 0,
            f = (b.hasOwnProperty("borderColor") ? b.borderColor : {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            }, b.hasOwnProperty("backgroundColor") ? b.backgroundColor : {
                r: 255,
                g: 255,
                b: 255,
                a: 1
            }),
            g = b.hasOwnProperty("textColor") ? b.textColor : {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            },
            h = document.createElement("canvas"),
            i = h.getContext("2d");
        i.font = d + "px " + c;
        var j = i.measureText(a),
            k = j.width;
        h.width = k, h.height = d + 5, i.font = d + "px " + c, i.fillStyle = "rgba(" + f.r + "," + f.g + "," + f.b + "," + f.a + ")", i.lineWidth = 0, i.fillStyle = "rgba(" + g.r + "," + g.g + "," + g.b + "," + g.a + ")", i.fillText(a, e, d + e);
        var l = new THREE.Texture(h);
        return l.needsUpdate = !0, l
    }

    function g(a) {
        a.alpha && (controls = new THREE.DeviceOrientationControls(camera, !0), controls.connect(), controls.update(), element.addEventListener("click", fullscreen, !1), window.removeEventListener("deviceorientation", g, !0))
    }
    if (Modernizr = Modernizr || {
            webgl: !0
        }, !Modernizr.webgl) return !1;
    mobile && (mql = window.matchMedia("(orientation: landscape)"), useStereo = mql.matches && vropt || force3d, mql.addListener(function(a) {
        useStereo = a.matches ? vropt : !1 || force3d, resize()
    })), chartinfodiv = document.getElementById("chartinfo"), chartinfodiv.innerHTML = "<span id='infocurdate' class='cur-date'></span><br><span id='infocurclose' class='cur-close'></span><br><span id='infocurpe' class='cur-pe'></span>", infocurdate = document.getElementById("infocurdate"), infocurclose = document.getElementById("infocurclose"), infocurpe = document.getElementById("infocurpe"), updatelist = new UpdateList, renderer = new THREE.WebGLRenderer({
        alpha: !0,
        antialias: !0,
        logarithmicDepthBuffer: !1
    }), renderer.gammaInput = !0, renderer.gammaOutput = !0, element = renderer.domElement, container = document.getElementById("example"), container.appendChild(element), effect = is_firefox && is_vr_enabled ? effect = new THREE.VREffect(renderer) : mobile || force3d ? new THREE.StereoEffect(renderer) : null, scene = new THREE.Scene, scene.add(dot), scene.add(dotLine);
    var h = new THREE.MeshBasicMaterial({
            visible: !1
        }),
        i = new THREE.SphereGeometry(5, 32, 32);
    player = new THREE.Mesh(i, h), player.position.set(playerStart.x, playerStart.y, playerStart.z), playerlight = new THREE.PointLight(16777215, 1.08, 100), playerlight.position.set(0, 6, -1), is_firefox && is_vr_enabled ? (camera = new THREE.PerspectiveCamera(90, 1, .05, 1e3), camera.position.set(-1.5, playerheight, 0), player.add(camera, playerlight), player.rotateY(-Math.PI / 2), controls = new THREE.VRControls(camera)) : (camera = new THREE.PerspectiveCamera(90, 1, .05, 1e3), camera.position.set(-1.5, playerheight, 0), player.add(camera, playerlight), controls = new THREE.OrbitControls(camera, element), controls.rotateUp(Math.PI / 4), controls.target.set(startTarget.x, startTarget.y, startTarget.z), controls.noZoom = !0, controls.noPan = !0);
    var j = [];
    vrui = new THREE.Mesh, vrui.position.set(0, 1, 0), vrui.rotateY(-Math.PI / 2), vrui.rotateX(-Math.PI / 2), vrui.scale.set(.25, .25, .25), vrhudPositioner = new THREE.Mesh(new THREE.PlaneBufferGeometry(50, 50, 1, 1), new THREE.MeshBasicMaterial({
        visible: !1
    })), vrhudPositioner.name = "vrhudPositioner", vrhudPositioner.position.set(0, 0, -5), vrhud = new THREE.Mesh, vrhud.position.set(0, 0, -5);
    var k = new THREE.ImageUtils.loadTexture("textures/pointer.png");
    cursorAnimation = new TextureAnimator(k, 4, 1, 4, 1);
    var l = new THREE.MeshBasicMaterial({
            map: k,
            transparent: !0,
            visible: !0,
            depthWrite: !1,
            depthTest: !1
        }),
        m = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    cursor = new THREE.Mesh(m, l), cursor.position.set(0, 0, 1), camera.add(cursor), camera.add(vrhudPositioner), camera.add(vrhud);
    var n = THREE.ImageUtils.loadTexture("textures/startwalk.png"),
        o = THREE.ImageUtils.loadTexture("textures/stopwalk.png"),
        p = new THREE.PlaneBufferGeometry(5, 5, 1, 1),
        q = new THREE.MeshBasicMaterial({
            map: n,
            transparent: !0,
            depthTest: !1
        });
    walkbutton = new THREE.Mesh(p, q), walkbutton.position.set(0, 0, 1), walkbutton.walking = !1, walkbutton._choose = function(a) {
        walkbutton.walking ? (walkbutton.material.map = n, walkbutton.walking = !1) : (walkbutton.material.map = o, walkbutton.walking = !0)
    };
    var r = THREE.ImageUtils.loadTexture("textures/startclimb.png"),
        s = (THREE.ImageUtils.loadTexture("textures/stopclimb.png"), new THREE.PlaneBufferGeometry(5, 5, 1, 1)),
        t = new THREE.MeshBasicMaterial({
            map: r,
            transparent: !0,
            depthTest: !1
        });
    climbbutton = new THREE.Mesh(s, t), climbbutton.position.set(5, 5, 1), climbbutton.climbing = !1, player.add(vrui), scene.add(player);
    var u = 550,
        v = -40,
        w = 50;
    ocamera = new THREE.OrthographicCamera((window.innerWidth - u) / -2 + v, (window.innerWidth - u) / 2 + v, (window.innerHeight - u) / 2 + w, (window.innerHeight - u) / -2 + w, -500, 1e3), ocamera.position.x = -30, ocamera.position.y = 20, ocamera.position.z = -40, ocamera.lookAt(new THREE.Vector3(0, 0, 0));
    var x = new THREE.ImageUtils.loadTexture("textures/startbutton.gif");
    prepImg(x), headstone = new THREE.Mesh(new THREE.PlaneBufferGeometry(3.7, 1.2, 1, 1), new THREE.MeshBasicMaterial({
        color: 16777215,
        map: x,
        side: THREE.DoubleSide
    })), headstone.position.set(playerStart.x + 12, 12, 0), headstone.scale.set(2, 2, 2), headstone.rotateY(-Math.PI / 2), headstone._choose = climb_choose, scene.add(headstone), masthead = new THREE.Mesh(new THREE.PlaneBufferGeometry(8, 8), new THREE.MeshPhongMaterial({
        color: 16777215,
        //map: new THREE.ImageUtils.loadTexture("textures/WSJBlockTexture.jpg"),
        //normalMap: new THREE.ImageUtils.loadTexture("textures/WSJnormalMap.png"),
        //specularMap: new THREE.ImageUtils.loadTexture("textures/WSJblackonwhite.jpg"),
        normalScale: new THREE.Vector2(.5, .5),
        shininess: 80
    })), masthead.position.set(playerStart.x - 25, 20, 0), masthead.rotateY(Math.PI / 2);
    var y = new THREE.PointLight(16777215, .8, 40);
    y.position.set(8, 10, 1), masthead.scale.set(4, 4, 4), masthead.add(y), scene.add(masthead), j.push(headstone), raycaster = new THREE.Raycaster;
    var z = {
        x: 0,
        y: 0
    };
    document.addEventListener("mousedown", a, !1), document.addEventListener("mousemove", b, !1), document.addEventListener("keydown", function(a) {
        switch (a.keyCode) {
            case 32:
			    keys.space = !0, started && walkbutton._choose();
                break;
            case 16:
                keys.shift = !0;
                break;
            case 38:
                keys.uparrow = !0;
                break;
            case 40:
                keys.downarrow = !0;
                break;
            case 37:
                keys.leftarrow = !0;
                break;
            case 39:
                keys.rightarrow = !0;
                break;
            case 65:
                keys.a = !0;
                break;
            case 83:
                keys.s = !0;
                break;
            case 68:
                keys.d = !0;
                break;
            case 87:
                keys.w = !0
        }
    }, !1), document.addEventListener("keyup", function(a) {
        switch (a.keyCode) {
            case 32:
                keys.space = !1;
                break;
            case 16:
                keys.shift = !1;
                break;
            case 38:
                keys.uparrow = !1;
                break;
            case 40:
                keys.downarrow = !1;
                break;
            case 37:
                keys.leftarrow = !1;
                break;
            case 39:
                keys.rightarrow = !1;
                break;
            case 65:
                keys.a = !1;
                break;
            case 83:
                keys.s = !1;
                break;
            case 68:
                keys.d = !1;
                break;
            case 87:
                keys.w = !1
        }
    }, !1);
    var A = 25;
    findIntersections = function() {
        if (started) {
            raycaster.setFromCamera(centerVec, camera);
            var a = raycaster.intersectObjects(j),
                b = {
                    intersects: a
                };
            if (j.forEach(function(a) {
                    try {} catch (b) {}
                }), a.length > 0) {
                var c = a[0];
                if (c.object.hasOwnProperty("react") && c.object.react(b), selected)
                    if (selected.id === c.object.uuid) c.object.hasOwnProperty("_choose") && c.object.material.opacity >= 1 && (selected.choosetime -= 1, this.selected.choosetime <= 0 && !c.object.justchosen && (cursorAnimation.currentTile == cursorAnimation.numberOfTiles - 1 ? (c.object.justchosen = !0, c.object._choose(selected)) : (cursorAnimation.next(), this.selected.choosetime = A)));
                    else {
                        var d = this.selected;
                        d.obj.justchosen && (d.obj.justchosen = !1), this.selected = {
                            id: c.object.uuid,
                            choosetime: A,
                            obj: c.object,
                            old: d
                        }, cursorAnimation.rewind(), d.obj.hasOwnProperty("_deselect") && d.obj._deselect(selected), c.object.hasOwnProperty("react") && c.object.react(b), c.object.hasOwnProperty("_select") && c.object._select(selected), c.object.hasOwnProperty("_choose") && c.object.material.opacity >= 1 && (cursor.position.z = -(a[0].distance - .3))
                    } else selected = {
                    id: c.object.uuid,
                    choosetime: A,
                    obj: c.object,
                    intersects: a
                }, cursorAnimation.rewind(), c.object.hasOwnProperty("react") && c.object.react(b), c.object.hasOwnProperty("_select") && c.object._select(selected), c.object.hasOwnProperty("_choose") && c.object.material.opacity >= 1 && (cursor.position.z = -(a[0].distance - .3))
            } else try {
                if (this.selected) {
                    var d = this.selected;
                    cursorAnimation.rewind(), this.selected = null, d.obj.justchosen && (d.obj.justchosen = !1), d.obj.hasOwnProperty("_deselect") && d.obj._deselect(selected)
                }
            } catch (e) {
                console.log(e)
            }
        }
    };
    for (var B = "textures/BlackGrad-", C = ["zpos", "zpos", "ypos", "ypos", "zpos", "zpos"], D = ".jpg", E = new THREE.BoxGeometry(1e3, 1e3, 1e3), F = [], G = 0; 6 > G; G++) {
        var H = B + C[G] + D;
        F.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(H),
            side: THREE.BackSide
        }))
    }
    var I = new THREE.MeshFaceMaterial(F),
        J = new THREE.Mesh(E, I);
    scene.add(J), parseDate = d3.time.format("%x").parse;
    var K = d3.time.scale().range([-width / 2, width / 2]),
        L = d3.scale.linear().domain([-width / 2, width / 2]);
    minichart = new THREE.Mesh;
    var M = new THREE.Geometry,
        N = M.vertices,
        O = new THREE.SphereGeometry(.027, 4, 4),
        P = new THREE.MeshBasicMaterial({
            color: minimarkercolor
        });
    P.visible = !1, miniMarkerMesh = new THREE.Mesh(O, P), minix = d3.time.scale().range([-miniwidth / 2, miniwidth / 2]), miniy = d3.scale.linear().range([0, miniheight]); {
        var Q = d3.scale.linear().range([zeroheight, height]),
            R = d3.scale.pow(2).range([0, 1]);
        d3.scale.linear().range([chartplane, chartplane - depth])
    }
    peZ = d3.scale.linear().range([pewidth, 1]), coScale = d3.scale.pow(2).range([1, 0]).domain([5, 150]).clamp(!0);
    var S = h;
    bounds = [-width / 2 - 5, 18, width / 2 + 5, playerStart.x - 30];
    var T = new THREE.BoxGeometry(10, 10, Math.abs(bounds[0]) + Math.abs(bounds[2])),
        U = new THREE.Mesh(T, S);
    U.position.set(bounds[1], 0, 0), walls.push(U), scene.add(U);
    var V = new THREE.BoxGeometry(Math.abs(bounds[1]) + Math.abs(bounds[3]), 10, 10),
        W = new THREE.Mesh(V, S);
    W.position.set((bounds[3] + bounds[1]) / 2, 0, bounds[0]), walls.push(W), scene.add(W);
    var X = new THREE.BoxGeometry(10, 10, Math.abs(bounds[0]) + Math.abs(bounds[2])),
        Y = new THREE.Mesh(X, S);
    Y.position.set(bounds[3], 0, 0), walls.push(Y), scene.add(Y);
    var Z = new THREE.BoxGeometry(Math.abs(bounds[1]) + Math.abs(bounds[3]), 10, 10),
        _ = new THREE.Mesh(Z, S);
    _.position.set((bounds[3] + bounds[1]) / 2, 0, bounds[2]), walls.push(_), scene.add(_); {
        var aa = datasets.nav;
    }
    d3.tsv(aa.pedataurl, aa.pefunc, function(a, b) {
        aa.pedata = b, d3.tsv(aa.dataurl, type, function(a, b) {
            aa.data = b, d3.tsv(aa.timelineurl, calloutType, function(a, b) {
                aa.callouts = b, d(aa)
            })
        })
    }), window.addEventListener("deviceorientation", g, !0), is_firefox && is_vr_enabled && window.addEventListener("dblclick", function() {
        effect.setFullScreen(!0)
    });
    var ba = THREE.ImageUtils.loadTexture("textures/patterns/checkerTextureBlack.png");
    ba.wrapS = THREE.RepeatWrapping, ba.wrapT = THREE.RepeatWrapping, ba.repeat = new THREE.Vector2(50, 50), ba.anisotropy = renderer.getMaxAnisotropy();
    var ca = new THREE.MeshPhongMaterial({
            color: 16777215,
            specular: 3355443,
            shininess: 20,
            shading: THREE.FlatShading,
            map: ba
        }),
        da = new THREE.PlaneBufferGeometry(1e3, 1e3);
    da.computeTangents(), groundmesh = new THREE.Mesh(da, ca), groundmesh.rotation.x = -Math.PI / 2, groundmesh.material.normalScale.set(-.5, -.5), scene.add(groundmesh), window.addEventListener("resize", resize, !1), setTimeout(resize, 1)
}

function resize() {
    var a = viewWidth = container.offsetWidth,
        b = viewHeight = container.offsetHeight;
    camera.aspect = a / b, camera.updateProjectionMatrix(), renderer.setPixelRatio(window.devicePixelRatio), renderer.setSize(a, b), null != effect && useStereo && effect.setSize(a, b), element.style.width = a + "px", element.style.height = b + "px"
}

function getScreenPosition(a) {
    var b = viewWidth / 2,
        c = viewHeight / 2;
    return gsp.set(0, 0, 0), gsp.x = gsp.x * b + b, gsp.y = -(gsp.y * c) + c, gsp
}

function placeHUD() {
    var a = {},
        b = useStereo ? viewWidth - viewWidth / 5 : viewWidth,
        c = useStereo ? 45 : mobile ? 40 : 10,
        d = mobile ? miniRight : miniRightDesk;
    a.x = (b - d) / window.innerWidth * 2 - 1, a.y = 2 * -(c / window.innerHeight) + 1, phudvec.set(a.x, a.y), phudview.setFromMatrixPosition(camera.matrixWorld);
    try {
        raycaster.setFromCamera(phudvec, camera);
        var e = raycaster.intersectObjects([vrhudPositioner]),
            f = e[0],
            g = camera.worldToLocal(f.point);
        vrhud.position.set(g.x, g.y, g.z)
    } catch (h) {}
}

function update(a) {
    if (findIntersections(), placeHUD(), walkbutton.walking)
        if (climbbutton.climbing) {
            var b = player.position;
            previousspot.set(b.x, b.y, b.z), accurateWalk.set(b.x, b.y, b.z);
            var c = keys.shift ? 2.5 * climbspeed : climbspeed;
            c = rocket ? 10 * climbspeed : c, accwalkvec.set(0, 0, c), accwalkvec.multiplyScalar(a), accurateWalk.add(accwalkvec);
            var d = Math.floor(xiscale(b.z));
            if (d = 0 > d ? 0 : d, d < chartData.length - 1) {
                datum = chartData[d], datum.pe = chartPEData[d].pe, stopcheck.indexOf(datum.date) >= 0 && !rocket && (player.position.z = previousspot.z, walkbutton._choose(), stopcheck = stopcheck.replace(datum.date, ""));
                var e = chartData[d + 1],
                    f = xscale(parseDate(e.date)) - xscale(parseDate(chartData[d].date)),
                    g = player.position.z - xscale(parseDate(e.date)),
                    h = g / f;
                climbY.set(0, yscale(chartData[d].close), 0), climbY.lerp(climblerpvec.set(0, yscale(e.close), 0), h), accurateWalk.y = climbY.y;
                var f = xscale(parseDate(e.date)) - xscale(parseDate(chartData[d].date)),
                    i = yscale(e.close) - yscale(chartData[d].close);
                walkvec.set(0, i, f), walkvec.multiplyScalar(c), walkvec.multiplyScalar(a), player.position.add(walkvec), ppostest.set(b.x, b.y, b.z);
                var j = ppostest.distanceTo(accurateWalk);
                rocket ? (accurateAlpha = Math.abs(j - playerStart.y) / playerStart.y, accurateAlpha = accurateAlpha > 1 ? 1 : accurateAlpha) : accurateAlpha = j > 2 ? .08 : 0, b.lerp(accurateWalk, accurateAlpha)
            } else b.z = previousspot.z, b.y = yscale(chartData[chartData.length - 1].close), rocket = !1, walkbutton._choose()
        } else {
            walkvec.set(0, 0, -1);
            var b = player.position;
            previousspot.set(b.x, b.y, b.z), accurateWalk.set(b.x, b.y, b.z), walkvec.applyQuaternion(camera.quaternion);
            var k = keys.shift ? 3 * walkspeed : walkspeed;
            walkvec.multiplyScalar(k), walkvec.multiplyScalar(a), walkvec.y = 0; {
                b.x, b.z
            }
            if (b.add(walkvec), collide(player, walls)) {
                walkvec.multiplyScalar(-1.5), b.set(previousspot.x, previousspot.y, previousspot.z);
                for (var l = 10; collide(player, walls) && l > 0;) walkvec.multiplyScalar(.5), b.add(walkvec), l--
            }
        }
    camera.updateProjectionMatrix(), controls.update(a), updatelist.update(a)
}

function collide(a, b) {
    var c = !1,
        d = a.position;
    collideorigin.set(d.x, d.y, d.z);
    for (var e = 0; e < a.geometry.vertices.length; e++) {
        globalVertex.set(0, 0, 0), collideDirectionVector.set(0, 0, 0);
        var f = a.geometry.vertices[e];
        localVertex.set(f.x, f.y, f.z), globalVertex = localVertex.applyMatrix4(a.matrix), collideDirectionVector = globalVertex.sub(a.position);
        var g = collideDirectionVector;
        collideDirectionVectorNorm.set(g.x, g.y, g.z), collideDirectionVectorNorm.normalize(), collideRay.set(collideorigin, collideDirectionVectorNorm);
        var h = collideRay.intersectObjects(b);
        h.length > 0 && h[0].distance < collideDirectionVector.length() && (c = !0), f = d = g = h = void 0
    }
    return c
}

function distanceTo(a, b) {
    var c = a.position,
        d = b.position,
        e = c.x - d.x,
        f = c.y - d.y,
        g = c.z - d.z;
    return Math.sqrt(e * e + f * f + g * g)
}

function render(a) {
    try {
        callouts.forEach(function(a) {
            var b = distanceTo(player, a.sprite);
            a.sprite.material.opacity = coScale(b), a.line.material.opacity = coScale(b)
        });
        var b = keys.w ? ocamera : camera;
        if (null != effect && useStereo ? effect.render(scene, b) : renderer.render(scene, b), null !== datum && "undefined" != typeof datum) {
            var c = Date.parse(datum.date),
                d = dateobj;
            d.setTime(c);
            var e = d.getDate(),
                f = monthArrIndexed[d.getMonth()],
                g = d.getFullYear(),
                h = f + " " + e + ", " + g;
            //e = f = g = void 0, infocurdate.innerHTML = h, infocurclose.innerHTML = datum.close.toFixed(2), infocurpe.innerHTML = datum.pe.toFixed(2) + " P/E ratio", miniMarkerMesh.material.visible = !0, miniMarkerMesh.position.set(minix(parseDate(datum.date)), miniy(datum.close), 0), dot.material.visible = !0, dotLine.material.visible = !0, labelChart()
			e = f = g = void 0, infocurdate.innerHTML = h, infocurclose.innerHTML = datum.close.toFixed(0) + " Funds", infocurpe.innerHTML = "Missed Cutoff", miniMarkerMesh.material.visible = !0, miniMarkerMesh.position.set(minix(parseDate(datum.date)), miniy(datum.close), 0), dot.material.visible = !0, dotLine.material.visible = !0, labelChart()
        } else dot.material.visible = !1, dotLine.material.visible = !1, miniMarkerMesh.material.visible = !1
    } catch (i) {}
}

function animate(a) {
    requestAnimationFrame(animate), TWEEN.update(a), update(clock.getDelta()), render(clock.getDelta())
}

function fullscreen() {
    container.requestFullscreen ? container.requestFullscreen() : container.msRequestFullscreen ? container.msRequestFullscreen() : container.mozRequestFullScreen ? container.mozRequestFullScreen() : container.webkitRequestFullscreen && container.webkitRequestFullscreen()
}

function TextureAnimator(a, b, c, d, e) {
    this.tilesHorizontal = b, this.tilesVertical = c, this.numberOfTiles = d, a.wrapS = a.wrapT = THREE.RepeatWrapping, a.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical), this.tileDisplayDuration = e, this.currentTile = 0, this.update = function(a) {
        for (this.currentDisplayTime += a; this.currentDisplayTime > this.tileDisplayDuration;) this.currentDisplayTime -= this.tileDisplayDuration, this.next()
    }, this.updateDisplay = function() {
        var b = this.currentTile % this.tilesHorizontal;
        a.offset.x = b / this.tilesHorizontal;
        var c = Math.floor(this.currentTile / this.tilesHorizontal);
        a.offset.y = c / this.tilesVertical
    }, this.rewind = function() {
        this.currentDisplayTime = 0, this.currentTile = 0, this.updateDisplay()
    }, this.next = function() {
        this.currentTile != this.numberOfTiles - 1 && (this.currentTile++, this.updateDisplay())
    }, this.rewind()
}

function TextureSprite(a, b) {
    this.texture = a, this.xpos = b.x, this.ypos = b.y, this.width = b.width, this.height = b.height, this.tw = b.total_width, this.th = b.total_height, a.wrapS = a.wrapT = THREE.RepeatWrapping, this.texture.repeat.set(this.width / this.tw, this.height / this.th), this.texture.offset.x = this.xpos / this.tw, this.texture.offset.y = this.height / this.th - this.ypos / this.th
}

function drawMap() {
    if ("undefined" != typeof chartData && !mobile) {
        var a = mapcanvas.getContext("2d");
        a.clearRect(0, 0, mapwidth, mapheight), a.beginPath(), a.lineWidth = 1, a.strokeStyle = "rgba(127,127,127,1.0)";
        for (var b = 0; b < chartData.length - 1; b++) a.moveTo(mapx(parseDate(chartData[b].date)), mapy(chartData[b].close)), a.lineTo(mapx(parseDate(chartData[b + 1].date)), mapy(chartData[b + 1].close));
        if (a.closePath(), a.stroke(), null !== datum && "undefined" != typeof datum) {
            var c = mapx(parseDate(datum.date)),
                d = mapy(datum.close),
                e = 3;
            a.fillStyle = "rgb(255,255,255)", a.fillRect(c - e / 2, d - e / 2, e, e)
        }
    }
}

function UpdateList() {
    this.active = 0, this.list = [], this.add = function(a) {
        return this.list.push(a), this.active++, this.list.length - 1
    }, this.remove = function(a) {
        this.list[a] = null, this.active--, this.active <= 0 && (this.list.length = 0)
    }, this.update = function(a) {
        this.list.forEach(function(b) {
            null !== b && b.update(a)
        })
    }
}

function labelChart() {
    for (var a = xscale(parseDate(datum.date)), b = yscale(datum.close), c = dotLine.geometry.vertices, d = 0; 4 > d; d++) c[d].y = b;
    dotLine.geometry.verticesNeedUpdate = !0, dotLine.position.set(chartplane, yscale(0), a), dot.position.set(chartplane, b, a)
}

function getYforDate(a) {
    feverPlatformMesh.position.set(platformFinalPos.x, platformFinalPos.y, platformFinalPos.z), feverPlatformMesh.updateMatrixWorld();
    var b = xscale(parseDate(a));
    origGetY.set(chartplane, zeroheight, b);
    var c = new THREE.Raycaster(origGetY, directionGetYVector.normalize()),
        d = c.intersectObjects([feverPlatformMesh]),
        e = !1;
    return d.length > 0 && (e = d[0].distance), feverPlatformMesh.position.y = 500, e
}

function nextslide() {
    $(".current").removeClass("current").addClass("passed"), $($(".ahead")[0]).removeClass("ahead").addClass("current")
}

function prevslide() {
    $(".current").removeClass("current").addClass("ahead"), $($(".passed")[$(".passed").length - 1]).removeClass("passed").addClass("current")
}

function prepImg(a) {
    a.anisotropy = renderer.getMaxAnisotropy(), a.minFilter = THREE.LinearFilter, a.magFilter = THREE.LinearFilter, a.generateMipmaps = !1, a.needsUpdate = !0, a.wrapS = a.wrapT = THREE.ClampToEdgeWrapping
}
var iconsprites = {
        list: ["blueinfo", "greeninfo", "next", "previous", "redinfo", "rocket"],
        blueinfo: {
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            source_image: "dev/iconsprites/blueinfo.png",
            image: "../textures/icons.png",
            total_width: 600,
            total_height: 400,
            escaped_image: "../textures/icons.png",
            offset_x: 0,
            offset_y: 0,
            px: {
                x: "0px",
                y: "0px",
                offset_x: "0px",
                offset_y: "0px",
                height: "200px",
                width: "200px",
                total_height: "400px",
                total_width: "600px"
            }
        },
        greeninfo: {
            x: 200,
            y: 0,
            width: 200,
            height: 200,
            source_image: "dev/iconsprites/greeninfo.png",
            image: "../textures/icons.png",
            total_width: 600,
            total_height: 400,
            escaped_image: "../textures/icons.png",
            offset_x: -200,
            offset_y: 0,
            px: {
                x: "200px",
                y: "0px",
                offset_x: "-200px",
                offset_y: "0px",
                height: "200px",
                width: "200px",
                total_height: "400px",
                total_width: "600px"
            }
        },
        next: {
            x: 0,
            y: 200,
            width: 200,
            height: 200,
            source_image: "dev/iconsprites/next.png",
            image: "../textures/icons.png",
            total_width: 600,
            total_height: 400,
            escaped_image: "../textures/icons.png",
            offset_x: 0,
            offset_y: -200,
            px: {
                x: "0px",
                y: "200px",
                offset_x: "0px",
                offset_y: "-200px",
                height: "200px",
                width: "200px",
                total_height: "400px",
                total_width: "600px"
            }
        },
        previous: {
            x: 200,
            y: 200,
            width: 200,
            height: 200,
            source_image: "dev/iconsprites/previous.png",
            image: "../textures/icons.png",
            total_width: 600,
            total_height: 400,
            escaped_image: "../textures/icons.png",
            offset_x: -200,
            offset_y: -200,
            px: {
                x: "200px",
                y: "200px",
                offset_x: "-200px",
                offset_y: "-200px",
                height: "200px",
                width: "200px",
                total_height: "400px",
                total_width: "600px"
            }
        },
        redinfo: {
            x: 400,
            y: 0,
            width: 200,
            height: 200,
            source_image: "dev/iconsprites/redinfo.png",
            image: "../textures/icons.png",
            total_width: 600,
            total_height: 400,
            escaped_image: "../textures/icons.png",
            offset_x: -400,
            offset_y: 0,
            px: {
                x: "400px",
                y: "0px",
                offset_x: "-400px",
                offset_y: "0px",
                height: "200px",
                width: "200px",
                total_height: "400px",
                total_width: "600px"
            }
        },
        rocket: {
            x: 400,
            y: 200,
            width: 200,
            height: 200,
            source_image: "dev/iconsprites/rocket.png",
            image: "../textures/icons.png",
            total_width: 600,
            total_height: 400,
            escaped_image: "../textures/icons.png",
            offset_x: -400,
            offset_y: -200,
            px: {
                x: "400px",
                y: "200px",
                offset_x: "-400px",
                offset_y: "-200px",
                height: "200px",
                width: "200px",
                total_height: "400px",
                total_width: "600px"
            }
        }
    };
! function(a) {
    var b = a({});
    a.subscribe = function() {
        b.on.apply(b, arguments)
    }, a.unsubscribe = function() {
        b.off.apply(b, arguments)
    }, a.publish = function() {
        b.trigger.apply(b, arguments)
    }
}(jQuery);   
var panelsprites = {
        list: ["End", "Headstone", "Start"],
        End: {
            x: 0,
            y: 0,
            width: 1024,
            height: 1024,
            source_image: "dev/panelsprites/End.gif",
            image: "../textures/panels.png",
            total_width: 2048,
            total_height: 2048,
            escaped_image: "../textures/panels.png",
            offset_x: 0,
            offset_y: 0,
            px: {
                x: "0px",
                y: "0px",
                offset_x: "0px",
                offset_y: "0px",
                height: "1024px",
                width: "1024px",
                total_height: "2048px",
                total_width: "2048px"
            }
        },
        Headstone: {
            x: 1024,
            y: 0,
            width: 1024,
            height: 1024,
            source_image: "dev/panelsprites/Headstone.gif",
            image: "../textures/panels.png",
            total_width: 2048,
            total_height: 2048,
            escaped_image: "../textures/panels.png",
            offset_x: -1024,
            offset_y: 0,
            px: {
                x: "1024px",
                y: "0px",
                offset_x: "-1024px",
                offset_y: "0px",
                height: "1024px",
                width: "1024px",
                total_height: "2048px",
                total_width: "2048px"
            }
        },
        Start: {
            x: 0,
            y: 1024,
            width: 1024,
            height: 1024,
            source_image: "dev/panelsprites/Start.gif",
            image: "../textures/panels.png",
            total_width: 2048,
            total_height: 2048,
            escaped_image: "../textures/panels.png",
            offset_x: 0,
            offset_y: -1024,
            px: {
                x: "0px",
                y: "1024px",
                offset_x: "0px",
                offset_y: "-1024px",
                height: "1024px",
                width: "1024px",
                total_height: "2048px",
                total_width: "2048px"
            }
        }
    },
    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIpad = /iPad/i.test(navigator.userAgent),
    is_firefox = !1,
    is_vr_enabled = !1,
    mobile = mobile || is_vr_enabled,
    camera, scene, renderer, directionalLight, groundmesh, chartWindow, chartData, dot = null,
    dotLine, cursor, datum, startline, keys = {
        shift: !1,
        uparrow: !1,
        leftarrow: !1,
        rightarrow: !1,
        downarrow: !1,
        a: !1,
        s: !1,
        d: !1,
        w: !1,
        space: !1
    },
    keyhandlers = {};
	banners = null;
var NASbanners = [{
        name: "start.gif",
        date: "01/01/2017",
        close: "205",
        navbuttons: {
            next: function(a) {
                setTimeout(function() {
                    walkbutton._choose(), banners[0].opos = banners[0].mesh.position.clone(), fadeObjects({
                        parent: a.panel,
                        fadein: !1,
                        callback: function() {
                            banners[0].mesh.position.set(100, 100, 100)
                        }
                    })
                }, 100)
            }
        },
        paneloffset: new THREE.Vector3(0, 10, -.9)
    }, {
        name: "janhigh.gif",
        date: "01/20/2017",
        close: "567",
        navbuttons: {
            next: function(a) {
                setTimeout(function() {
                    walkbutton._choose(), findBannerNamed("janhigh.gif").mesh.opos = findBannerNamed("janhigh.gif").mesh.position.clone(), fadeObjects({
                        parent: a.panel,
                        fadein: !1,
                        callback: function() {
                            findBannerNamed("janhigh.gif").mesh.position.set(100, 100, 100)
                        }
                    })
                }, 100)
            }
        },
        paneloffset: new THREE.Vector3(0, 4, 0)        
    }, {
        name: "marhigh.gif",
        date: "03/20/2017",
        close: "456",
        navbuttons: {
            next: function(a) {
                setTimeout(function() {
                    walkbutton._choose(), findBannerNamed("marhigh.gif").mesh.opos = findBannerNamed("marhigh.gif").mesh.position.clone(), fadeObjects({
                        parent: a.panel,
                        fadein: !1,
                        callback: function() {
                            findBannerNamed("marhigh.gif").mesh.position.set(100, 100, 100)
                        }
                    })
                }, 100)
            }
        },
        paneloffset: new THREE.Vector3(0, 8, 0)
    },{
        name: "junhigh.gif",
        date: "06/21/2017",
        close: "489",
        navbuttons: {
            next: function(a) {
                setTimeout(function() {
                    walkbutton._choose(), findBannerNamed("junhigh.gif").mesh.opos = findBannerNamed("junhigh.gif").mesh.position.clone(), fadeObjects({
                        parent: a.panel,
                        fadein: !1,
                        callback: function() {
                            findBannerNamed("junhigh.gif").mesh.position.set(100, 100, 100)
                        }
                    })
                }, 100)
            }
        },
        paneloffset: new THREE.Vector3(0, 4, 0)
    },{
        name: "novhigh.gif",
        date: "11/20/2017",
        close: "623",
        navbuttons: {
            next: function(a) {
                setTimeout(function() {
                    walkbutton._choose(), findBannerNamed("novhigh.gif").mesh.opos = findBannerNamed("novhigh.gif").mesh.position.clone(), fadeObjects({
                        parent: a.panel,
                        fadein: !1,
                        callback: function() {
                            findBannerNamed("novhigh.gif").mesh.position.set(100, 100, 100)
                        }
                    })
                }, 100)
            }
        },
        paneloffset: new THREE.Vector3(0, 4, 0)
    },	
	{
        name: "end.gif",
        date: "12/31/2017",
        close: "235",
        navbuttons: {
            previous: function(a) {
                setTimeout(function() {
                    climb_choose()
                }, 100)
            },
            rocket: function(a) {
				playsound('sounds/click.mp3');
                setTimeout(function() {
				    walkbutton.walking && walkbutton._choose(), player.position.z = -width / 2, player.position.y = yscale(chartData[0].close), rocket = !0, setTimeout(function() {
                        walkbutton._choose()
                    })
                }, 1e3)
            }
        },
        paneloffset: new THREE.Vector3(0, 6, .1)
    }],
    NASstops = ["01/20/2017","03/20/2017","06/21/2017","11/20/2017"],
    stops, stopcheck, datasets = {
        nav: {
            id: "nav",
            title: "NAV",
            dataurl: "nav.tsv",
            pedataurl: "navweekly.tsv",
            timelineurl: "navcallouts.tsv",
            datafunc: type,
            pefunc: petype,
            timelinefunc: calloutType,
            data: null,
            pedata: null,
            callouts: null,
            banners: NASbanners,
            stops: NASstops			
        }
    },
    currentDataset = "nav",
    width = 400,
    height = 80,
    depth = 20,
    chartplane = 15,
    pewidth = 30,
    zeroheight = .5,
    effect, controls, vrui, player, movieScreen, vrhud, material2, playerlight, feverPlatformMesh, edgeMesh, feverLineLine, element, container, mql, projector, raycaster, spritey, xscale, yscale, xiscale, yUScale, peZ, title, selected, findIntersections, datelabel, valuelabel, barlabelfrontoffset = 5,
    parseDate, ttc = 3e3,
    walkspeed = 8,
    walkbutton, climbbutton, walkScale, climbspeed = 12,
    playerheight = 15,
    rocket = !1,
    playerStart = new THREE.Vector3(-50, 0, 0),
    climbStart = -width / 2,
    startTarget = new THREE.Vector3(.1, playerheight + 1.3, 0),
    tween, minix, miniy, miniheight = .8,
    miniwidth = 1.5,
    minifevercolor = 10066329,
    miniRight = 15,
    miniRightDesk = 35,
    minichartpos = new THREE.Vector3(-.8, -2.3, 0),
    minimarkercolor = 16711680,
    minilinecolor = 10066329,
    miniMarkerMesh, force = window.location.href.toLowerCase().indexOf("force") > -1,
    force3d = window.location.href.toLowerCase().indexOf("forcevr") > -1,
    started = !1,
    vropt = !0 && !isIpad || force3d || is_vr_enabled,
    feverColor = 12303291,
    blue = 31150,
    labelColor = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    },
    titlecolor = "#999999",
    chartlines = 2236962,
    feverEmit = 16777215,
    platformOpacity = 1,
    platformInvOpacity = .3,
    recessionColor = "#ce3139",
    platformYearLineColor = 16777215,
    feverShadowLineColor = 7829367,
    platformInvColor = 3355443,
    yearTextColor = {
        r: 128,
        g: 128,
        b: 128,
        a: 1
    },
    platformFinalPos, platformInverseAPos, platformInverseBPos, yearlabels = [],
    YLineCol = new THREE.Color(feverColor),
    recColor = new THREE.Color(recessionColor),
    highColor = 16711680,
    feverwidth = .1,
    gsp = new THREE.Vector3,
    phudvec = new THREE.Vector2,
    phudview = new THREE.Vector3,
    accwalkvec = new THREE.Vector3,
    climbY = new THREE.Vector3,
    climblerpvec = new THREE.Vector3,
    walkvec = new THREE.Vector3,
    origGetY = new THREE.Vector3,
    directionGetYVector = new THREE.Vector3(0, 1, 0),
    mousevec = new THREE.Vector2,
    centerVec = new THREE.Vector2,
    collideRay = new THREE.Raycaster,
    collideorigin = new THREE.Vector3,
    localVertex = new THREE.Vector3,
    globalVertex = new THREE.Vector3,
    collideDirectionVector = new THREE.Vector3,
    collideDirectionVectorNorm = new THREE.Vector3,
    dateobj = new Date,
    chartinfodiv = null,
    infocurdate = null,
    infocurclose = null,
    infocurpe = null,
    viewWidth, viewHeight, previousspot = new THREE.Vector3,
    accurateWalk = new THREE.Vector3,
    ppostest = new THREE.Vector3,
    dotGeo = new THREE.SphereGeometry(5 * feverwidth, 12, 12),
    dotMat = new THREE.MeshLambertMaterial({
        color: minimarkercolor,
        emissive: minimarkercolor
    }),
    dotLineGeo = new THREE.BoxGeometry(.4, .4, .4),
    dotLineMat = new THREE.MeshLambertMaterial({
        color: feverColor,
        emissive: feverColor
    });
dotLine = new THREE.Mesh(dotLineGeo, dotLineMat), dot = new THREE.Mesh(dotGeo, dotMat);
var climbchartoffset = 0,
    labelvalue = 5048.62,
    labellabel = "Previous high " + labellabel,
    bounds, walls = [],
    mapcanvas = document.createElement("canvas");
mapcanvas.width = mapwidth = 125, mapcanvas.height = mapheight = 40;
var lineYearMaterial = new THREE.LineBasicMaterial({
        color: platformYearLineColor,
        transparent: !0,
        opacity: 0
    }),
    lineMaterial = new THREE.LineBasicMaterial({
        color: chartlines
    });
lineMaterial.linewidth = 1;
var lineThickMaterial = new THREE.LineBasicMaterial({
    color: chartlines
});
lineThickMaterial.linewidth = 2;
var updatelist, headstone, recessions = ["11/24/2017"],
    recessionlabels = [{
        label: "Flood",
        date: "11/24/2018"
    }],
    gridlines = [],
    platformYearLines = [],
    baseColor = new THREE.Color("#00151f"),
    fillcolors = [{
        end: "12/10/2017",
        color: new THREE.Color("#0098db")
    }],
    monthArrIndexed = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
    climb_choose = function(a) {
        if (!player.blocktweens) {
			playsound('sounds/click.mp3');
            var b = is_firefox && is_vr_enabled ? -Math.PI / 2 : 0,
                c = is_firefox && is_vr_enabled ? Math.PI - 2 * Math.PI : -Math.PI / 2;
            if (climbbutton.climbing) walkbutton.walking && walkbutton._choose(), climbbutton.climbing = !1, player.tween && player.tween.stop(), player.tween = new TWEEN.Tween({
                d: 0
            }).to({
                d: 1
            }, 50).onStart(function() {
                player.blocktweens = !0
            }).onUpdate(function() {}).chain(new TWEEN.Tween({
                x: player.position.x,
                y: player.position.y,
                z: player.position.z,
                ry: c,
                po: platformOpacity,
                gridx: gridlines[0].position.x,
                pio: platformInvOpacity
            }).to({
                x: playerStart.x,
                y: playerStart.y,
                z: playerStart.z,
                po: 0,
                gridx: 0,
                pio: 0,
                ry: b
            }, 4e3).onUpdate(function() {
                player.position.set(this.x, this.y, this.z), player.rotation.y = this.ry, feverPlatformMesh.material.opacity = this.po, feverPlatformInverseMeshA.material.opacity = this.pio;
                var a = this;
                gridlines.forEach(function(b) {
                    b.position.x = a.gridx
                }), platformYearLines.forEach(function(b) {
                    b.material.opacity = a.po
                }), callouts.forEach(function(b) {
                    b.sprite.position.x = a.gridx + chartplane, b.line.position.x = a.gridx
                }), yearlabels.forEach(function(b) {
                    b.label.position.x = a.gridx + chartplane, b.line.position.x = a.gridx
                }), recessionlabels.forEach(function(b) {
                    b.label.position.x = a.gridx + chartplane, b.line.position.x = a.gridx
                }), chartTitleMesh.position.x = a.gridx + chartplane, feverShadowLine.position.x = a.gridx, feverShadowLineN.position.x = 0 - a.gridx
            }).easing(TWEEN.Easing.Quadratic.InOut).onStart(function() {
                player.blocktweens = !0
            }).onComplete(function() {
                player.blocktweens = !1, feverPlatformMesh.position.y = 500, feverPlatformInverseMeshA.position.y = 500, feverPlatformInverseMeshB.position.y = 500
            })).start();
            else {
                if (feverPlatformMesh.position.set(platformFinalPos.x, platformFinalPos.y, platformFinalPos.z), feverPlatformInverseMeshA.position.set(platformInverseAPos.x, platformInverseAPos.y, platformInverseAPos.z), feverPlatformInverseMeshB.position.set(platformInverseBPos.x, platformInverseBPos.y, platformInverseBPos.z), banners[0].hasOwnProperty("opos")) {
                    var d = banners[0].opos;
                    banners[0].mesh.position.set(d.x, d.y, d.z), fadeObjects({
                        parent: banners[0].mesh,
                        fadein: !0
                    })
                }
                player.tween && player.tween.stop(), walkbutton.walking && walkbutton._choose(), climbbutton.climbing = !0, datum = chartData[0], datum.pe = chartPEData[0].pe, ppx = [player.position.x + 1.8 * player.position.x, chartplane + climbchartoffset], ppy = [yscale(chartData[0].close) / 2, yscale(chartData[0].close)], ppz = [-width / 3.5, -width / 2], player.tween = new TWEEN.Tween({
                    d: 0
                }).to({
                    d: 1
                }, 50).onStart(function() {
                    player.blocktweens = !0
                }).onUpdate(function() {}).chain(new TWEEN.Tween({
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z,
                    ry: b,
                    po: 0,
                    gridx: gridlines[0].position.x,
                    pio: 0
                }).to({
                    x: ppx,
                    y: ppy,
                    z: ppz,
                    ry: c,
                    po: platformOpacity,
                    gridx: pewidth / 2,
                    pio: platformInvOpacity
                }, 4e3).onUpdate(function() {
                    player.position.set(this.x, this.y, this.z), player.rotation.y = this.ry, feverPlatformMesh.material.opacity = this.po, feverPlatformInverseMeshA.material.opacity = this.pio;
                    var a = this;
                    gridlines.forEach(function(b) {
                        b.position.x = a.gridx
                    }), platformYearLines.forEach(function(b) {
                        b.material.opacity = a.po
                    }), callouts.forEach(function(b) {
                        b.sprite.position.x = a.gridx + chartplane, b.line.position.x = a.gridx
                    }), yearlabels.forEach(function(b) {
                        b.label.position.x = a.gridx + chartplane, b.line.position.x = a.gridx
                    }), recessionlabels.forEach(function(b) {
                        b.label.position.x = a.gridx + chartplane, b.line.position.x = a.gridx
                    }), chartTitleMesh.position.x = a.gridx + chartplane, feverShadowLine.position.x = a.gridx, feverShadowLineN.position.x = 0 - a.gridx
                }).onStart(function() {
                    player.blocktweens = !0
                }).onComplete(function() {}).easing(TWEEN.Easing.Cubic.InOut).chain(new TWEEN.Tween({}).to({}).onUpdate(function() {}).delay(500).onComplete(function() {
                    player.blocktweens = !1
                }))).start()
            }
        }
    },
    useStereo = mobile && vropt || force3d,
    clock = new THREE.Clock;
init(), animate();
var accurateAlpha = 0;
self.addEventListener("message", function(a) {
    self.postMessage(a.data)
}, !1);