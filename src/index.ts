'use strict';
/**
 * Represents a base constructor which supports
 * options merging and
 * saving of standard stuff.
 *
 * @module Base
 * @author Sebastian Fitzner
 */

/**
 * Imports
 */
import * as mergeHelper from 'deepmerge';
import mixinHelper, { mixinType } from '@veams/helpers/lib/function/mixin';
import makeIdHelper from '@veams/helpers/lib/utility/make-id';

export interface BaseConfig {
	namespace?: string;
	el?: HTMLElement;
	options?: any;
}

// Workaround for browserify and webpack bundling
const merge = mergeHelper.default || mergeHelper;

class Base {
	options: any;
	_namespace: string;
	_instanceId: string | number;
	_el: HTMLElement;
	mixin: mixinType;

	/**
	 * Constructor
	 *
	 * to save standard elements like el and options and
	 * execute initialize as default method.
	 *
	 * @param {Object} BaseConfig - See interface.
	 * @param {String} BaseConfig.namespace - Add custom namespace to your class.
	 * @param {Object} BaseConfig.el - Save element in class.
	 * @param {Object} BaseConfig.options - Options passed by init process.
	 * @param {Object} opts [{}] - Object which contains options of the extended class.
	 */
	constructor({namespace, el, options}: BaseConfig, opts = {}) {
		this.namespace = namespace || 'base';
		this.instanceId = this.namespace;
		this.options = opts;
		this._options = options;
		this.mixin = mixinHelper;

		if (el) {
			this.el = el;
		}
	}

	// ----------------------------------------------------------
	// GETTER & SETTERS
	// ----------------------------------------------------------

	set namespace(namespace) {
		this._namespace = namespace;
	}

	get namespace() {
		return this._namespace;
	}

	get instanceId() {
		return this._instanceId;
	}

	set instanceId(id) {
		this._instanceId = `${id}_` + Date.now() + '_' + makeIdHelper();
	}

	get _options() {
		return this.options;
	}

	set _options(options) {
		this.options = merge(this.options, options || {});
	}

	set el(element) {
		this._el = element;
	}

	get el() {
		return this._el;
	}
}

export default Base;
