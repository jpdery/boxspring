"use strict"

/**
 * @function boxspring.override
 * @since 0.9
 */
boxspring.override = function(name, prototype) {

	// TODO: Copy static functions from previosu constructor function after
	// static functions are defined

	var inherits = boxspring.constructors[name]
	if (inherits == null) {
		throw new Error('The class ' + name + ' does not exists')
	}

	var sconstruct = inherits
	var sprototype = inherits.prototype

	var constructor = _.has(prototype, 'constructor') ? prototype.constructor : sconstruct ? function() {
		return sconstruct.apply(this, arguments)
	} : function() {}

	boxspring.constructors[name] = constructor

	if (sconstruct) {
		constructor.prototype = Object.create(sprototype)
		constructor.prototype.constructor = constructor
		constructor.parent = sprototype
	}

	constructor.prototype.$kind = name

	_.forOwn(sconstruct, function(val, key) {
		if (key !== 'prototype' && key !== 'constructor' && key !== 'parent' && key !== '$properties') {
			constructor[key] = val
		}
	})

	boxspring.set(global, name, constructor)

	return boxspring.implement(name, prototype)
}