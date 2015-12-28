/**
 * @copyright Devexperts
 *
 * @requires DX
 * @requires DX.Dom
 * @requires DX.Bem
 * @requires DX.Event
 * @requires DX.Tmpl
 * @requires DropDown
 * @namespace
 */

var Selectbox = (function(DX, window, document, undefined) {
	'use strict';

	var CN_SELECTBOX = 'selectBox',
		CN_INNER = CN_SELECTBOX + '--inner',
		CN_LABEL = CN_SELECTBOX + '--label',
		CN_ARROW = CN_SELECTBOX + '--arrow',
		TN_OPTGROUP = 'optgroup',
		KEY_UP_CODE = 38,
		KEY_DOWN_CODE = 40,
		ENTER_KEY_CODE = 13,
		M_ACTIVE = 'active',
		M_FOCUSED = 'focused',
		UPDATE_DELAY = 100,
		defaults = {
			tmpl: [
				'<div class="' + CN_INNER + '">',
				'<span class="' + CN_LABEL + '"></span>',
				'{%= arrowTmpl %}',
				'</div>'
			].join(''),
			arrowTmpl : '<span class="' + CN_ARROW + '"></span>',
			emptyOption: {
				value: '',
				label: '',
				textContent: '',
				className: ''
			},
			labelTmpl: '{%= text %}'
		};

	function map(collection, callback) {
		return Array.prototype.map.call(collection, callback);
	}

	function createDataObj(select) {
		return map(select.children, function(element) {
			return (element.tagName.toLowerCase() === TN_OPTGROUP) ? parseOptgroup(element) : parseOption(element);
		});
	}

	function parseOptgroup(optgroup) {
		return {
			title: optgroup.label,
			options: map(optgroup.children, function(option) {
				return parseOption(option);
			})
		};
	}

	function parseOption(optionNode) {
		var option = {
			value: optionNode.value,
			text: optionNode.label || optionNode.innerHTML,
			modifiers: splitClassName(optionNode),
			data: DX.Dom.getData(optionNode)
		};
		option = Object.assign({}, option, option.data);
		return option;
	}

	function splitClassName(element) {
		return element ? element.className.split(' ') : [];
	}

	/**
	 * Creates new selectbox component
	 * @constructor Selectbox
	 * @param {HTMLSelectElement} select
	 */
	return function Selectbox(select, optionsData, customDropDownConfig, customSelectBoxConfig) {
		var block,
			label,
			dropDown,
			updateDelay,
			currentOption,
			permanentBlockClassNames,
			selectId,
			selectBoxConfig,
			data;

		/**
		 * Triggers when electbox is created
		 *
		 * @event selectbox:created
		 */
		function init() {
			var dropDownClassName = splitClassName(select);
			selectBoxConfig = Object.assign({}, defaults, customSelectBoxConfig);
			permanentBlockClassNames = select.className;
			select.className = '';

			selectId = select.id || DX.String.createRandomId();
			select.id = '';

			dropDownClassName.push(CN_SELECTBOX);

			initAppearance();

			var dropDownConfig = Object.assign({}, customDropDownConfig, {modifiers: dropDownClassName});
			dropDown = new DropDown(block, dropDownConfig);
			updateData(optionsData);
			initListeners();

			DX.Event.trigger(select, Selectbox.E_CREATED, {
				detail: {
					eventTarget: select,
					block: block,
					dropDown: dropDown.getBlock()
				}
			});
		}

		function initAppearance() {
			var parent = DX.Dom.getParent(select),
				selectedIndex = select.selectedIndex;

			block = createBlock();
			label = block.querySelector('.' + CN_LABEL);

			parent.insertBefore(block, select);
			block.appendChild(select);
			select.selectedIndex = selectedIndex;
		}

		function createBlock() {
			console.log(selectBoxConfig.tmpl, selectBoxConfig)
			return DX.Dom.createElement('div', {
				id: selectId,
				innerHTML: DX.Tmpl.process(selectBoxConfig.tmpl, selectBoxConfig)
			});
		}

		function updateData(newData) {
			data = newData || createDataObj(select);
			dropDown.setDataList(data);
			setIndexBySelectedIndex();
		}

		function updateBlockClassNames() {
			var classNames = [permanentBlockClassNames, DX.Bem.createModifiedClassName(CN_SELECTBOX,
				splitClassName(currentOption))];

			if (DX.Bem.hasModifier(block, M_FOCUSED)) {
				classNames.push(DX.Bem.createModifiedClassName(CN_SELECTBOX, [M_FOCUSED]));
			}

			block.className = classNames.join(' ');
		}

		/**
		 * Triggers when selectbox is changed
		 *
		 * @event selectbox:changed
		 */
		function initListeners() {
			var dropDownBlock = dropDown.getBlock();

			select.addEventListener('focus', setFocusState);

			select.addEventListener('blur', removeFocusState);

			select.addEventListener('change', function(e) {
				setIndexBySelectedIndex();
			});

			block.addEventListener('touchend', function(e) {
				toggleDropdown();

				e.preventDefault();
			}, true);

			block.addEventListener('click', function(e) {
				toggleDropdown();
			}, true);

			dropDownBlock.addEventListener(DropDown.E_CHANGED, function() {
				var index = dropDown.getSelectedIndex();

				select.selectedIndex = index;
				setSelectedByIndex(index);
				DX.Event.trigger(select, Selectbox.E_CHANGED);
			}, true);

			dropDownBlock.addEventListener(DropDown.E_SHOWN, setActiveState);
			dropDownBlock.addEventListener(DropDown.E_HIDDEN, removeActiveState);
			select.addEventListener(Selectbox.E_CHANGE_VALUE, function() {
				setIndexBySelectedIndex();
			}, true);
			select.addEventListener('DOMNodeInserted', optionListModificationHandler);
			select.addEventListener('DOMNodeRemoved', optionListModificationHandler);
		}

		/**
		 * Show dropdown
		 * @method showDropDown
		 */
		function showDropdown() {
			if (!isDisabled()) {
				dropDown.show();
			}
		}

		/**
		 * Hide dropdown
		 * @method hideDropDown
		 */
		function hideDropdown() {
			dropDown.hide();
		}

		function keyDownHandler(e) {
			var key;

			if (dropDown.isShown()) {

				key = e.key || e.which;
				var newIndex = dropDown.getHoveredIndex();

				if (key === KEY_UP_CODE || key === 'Up') {
					newIndex--;
					dropDown.setHoveredIndex(newIndex);
				} else if (key === KEY_DOWN_CODE || key === 'Down') {
					newIndex++;
					dropDown.setHoveredIndex(newIndex);
				} else if (key === ENTER_KEY_CODE || key === 'Enter') {
					var triggerChangeEvent = true;
					dropDown.hide();
					dropDown.setSelectedIndex(newIndex, triggerChangeEvent);
				}

			}
		}

		function toggleDropdown() {
			if (isActiveState()) {
				hideDropdown();
			} else {
				showDropdown();
			}
		}

		function isDisabled() {
			return select.disabled;
		}

		function setActiveState() {
			DX.Bem.addModifier(block, M_ACTIVE);
			document.addEventListener(DX.Event.KEY_DOWN, keyDownHandler);
		}

		function setFocusState() {
			DX.Bem.addModifier(block, M_FOCUSED);
		}

		function removeFocusState() {
			DX.Bem.removeModifier(block, M_FOCUSED);
		}

		function removeActiveState() {
			DX.Bem.removeModifier(block, M_ACTIVE);
			document.removeEventListener(DX.Event.KEY_DOWN, keyDownHandler);
		}

		function isActiveState() {
			return DX.Bem.hasModifier(block, M_ACTIVE);
		}

		function optionListModificationHandler() {
			window.clearTimeout(updateDelay);

			updateDelay = window.setTimeout(updateData, UPDATE_DELAY);
		}

		/**
		 * Should be fired after external select index change
		 *
		 * @event selectbox:changevalue
		 */
		function setIndexBySelectedIndex() {
			var index = select.selectedIndex;

			setSelectedByIndex(index);
			dropDown.setSelectedIndex(index);
		}

		function setSelectedByIndex(index) {
			var option = select.options[index];

			if (option) {
				currentOption = option;
			} else {
				currentOption = selectBoxConfig.emptyOption;
			}
			setLabel(data[index]);
			updateBlockClassNames();

			if (isDisabled()) {
				Selectbox.disable(select);
			} else {
				Selectbox.enable(select);
			}
		}

		function setLabel(data) {
			label.innerHTML = data ? DX.Tmpl.process(selectBoxConfig.labelTmpl, data) : '';
		}

		/**
		 * Get current label
		 * @method getText
		 * @returns {String}
		 */
		function getText() {
			return currentOption.label || currentOption.textContent;
		}

		/**
		 * Get current value
		 * @method getValue
		 * @returns {Number|String}
		 */
		function getValue() {
			return currentOption.value || currentOption.textContent;
		}

		this.getValue = getValue;
		this.getText = getText;
		this.updateData = updateData;
		this.showDropdown = showDropdown;
		this.hideDropdown = hideDropdown;
		/**
		 * Get HTMLNode containing selectbox
		 * @method getBlock
		 * @returns {Node}
		 */
		this.getBlock = function() {
			return block;
		};
		/**
		 * Get element which listens to events
		 * @method getEventTarget
		 * @returns {Node}
		 */
		this.getEventTarget = function() {
			return select;
		};

		init();
	};
})(DX, window, document);

/** @constant
 * @type {string}
 * @default
 * @memberof Selectbox
 */
Selectbox.E_CREATED = 'selectbox:created';
/** @constant
 * @type {string}
 * @default
 * @memberof Selectbox
 */
Selectbox.E_CHANGED = 'selectbox:changed';
/** @constant
 * @type {string}
 * @default
 * @memberof Selectbox
 */
Selectbox.E_CHANGE_VALUE = 'selectbox:changevalue';

/**
 * Disable selectbox
 * @method disable
 * @static
 * @memberof Selectbox
 * @param {Node} select containing select block
 */
Selectbox.disable = function disableSelectbox(select) {
	'use strict';

	var block = DX.Dom.getParent(select);

	DX.Bem.addModifier(block, 'disabled');
	select.disabled = true;
};
/**
 * Enable selectbox
 * @method enable
 * @static
 * @memberof Selectbox
 * @param {Node} select containing select block
 */
Selectbox.enable = function enableSelectbox(select) {
	'use strict';

	var block = DX.Dom.getParent(select);

	DX.Bem.removeModifier(block, 'disabled');
	select.disabled = false;
};