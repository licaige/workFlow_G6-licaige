function(e, t) {
    t = t || {},
        e = (e = this.app.confirmURL(e)).getNormalize(),
        (t.repeat || void 0 === t.repeat) && (e += "_repeat"),
        t.anisotropy && (e += "_a" + t.anisotropy),
        t.mapping && (e += "_m" + t.mapping);
    var n = this._textures.get(e);
    n && (n.dispose(), this._textures.delete(e))
}

function HelloWorld() {
    console.log("Hello World");
}

function HelloWorld() {
    console.log("Hello World");
}

function test() {
    console.log("Hello World");
}

function HelloWorld() {
    console.log(123);
}