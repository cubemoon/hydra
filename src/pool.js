//
// Hydra - HTML5 mobile game engine
// https://github.com/aduros/hydra/blob/master/LICENSE.txt

goog.provide("hydra.Pool");

goog.require("hydra.array");

/**
 * @constructor
 * @extends hydra.Entity
 * @deprecated
 */
hydra.Pool = function () {
    goog.base(this);

    /**
     * @private
     */
    this.freeObjects = [];
}
goog.inherits(hydra.Pool, hydra.Entity);

/** @type function() :Object */
hydra.Pool.prototype.createObject;

hydra.Pool.prototype.destroyObject = function (o) { }

hydra.Pool.prototype.alloc = function () {
    if (this.freeObjects != null && this.freeObjects.length > 0) {
        console.log("Reusing from pool", "size=", this.freeObjects.length);
        return this.freeObjects.pop();
    } else {
        console.log("Creating new object");
        return this.createObject();
    }
}

hydra.Pool.prototype.free = function (o) {
    if (this.freeObjects != null) {
        hydra.array.push(this.freeObjects, o);
    } else {
        this.destroyObject(o);
    }
}

hydra.Pool.prototype.destroy = function () {
    goog.base(this, "destroy");
    for (var ii = 0; ii < this.freeObjects.length; ++ii) {
        this.destroyObject(this.freeObjects[ii]);
    }
    this.freeObjects = null;
}
