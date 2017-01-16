function Sandbox(callback) {
    var modules = [];
    for (var i in Sandbox.modules) {
        modules.push(i);
    }
    for (var i = 0; i < modules.length; i++) {
        this[modules[i]] = Sandbox.modules[modules[i]]();
    }
    callback(this);
}
