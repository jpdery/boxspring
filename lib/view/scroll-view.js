"use strict"

/**
 * @class boxspring.view.ScrollView
 * @super boxspring.view.View
 * @since 0.9
 */
var ScrollView = boxspring.define('boxspring.view.ScrollView', {

	inherits: boxspring.view.View,

	//--------------------------------------------------------------------------
	// Methods
	//--------------------------------------------------------------------------

	properties: {

		/**
		 * @property contentSize
		 * @since 0.9
		 */
		contentSize: {
			value: function() {
				return new boxspring.geom.Size()
			}
		},

		/**
		 * @property contentSize
		 * @since 0.9
		 */
		contentOffset: {
			value: function() {
				return new boxspring.geom.Point()
			}
		}
	},

	constructor: function() {
		ScrollView.parent.constructor.call(this)
		var onPropertyChange = this.bind('onPropertyChange')
		this.on('propertychange', 'contentSize.x', onPropertyChange)
		this.on('propertychange', 'contentSize.y', onPropertyChange)
		this.on('propertychange', 'contentOffset.x', onPropertyChange)
		this.on('propertychange', 'contentOffset.y', onPropertyChange)
		this.overflow = 'hidden'
		return this
	},

	layout: function() {

		if (this.contentLayout) {
			this.contentLayout.view = this
			this.contentLayout.size.x = this.contentSize.x === 'fill' ? this.measuredSize.x : this.contentSize.x
			this.contentLayout.size.y = this.contentSize.y === 'fill' ? this.measuredSize.y : this.contentSize.y
			this.contentLayout.layout()
		}

		return this
	}

})