function Sandbox(callback) {
    var modules = [];
    for(var i in Sandbox.modules){
        modules.push(i);
    }
    for(var i = 0; i < modules.length; i++){
        this[modules[i]] = Sandbox.modules[modules[i]]();
    }
    callback(this);
}

Sandbox.modules = {
    dom: function(){
        return {
            getElement: function(){},
            getStyle: function(){}
        };
    },
    ajax: function(){
        return {
            post: function(){},
            get: function(){}
        };
    }
};

new Sandbox(function(box){
    console.log(box);
    // your code here
});
