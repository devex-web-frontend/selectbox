var DropDownMock = (function(DX, window, document, undefined) {
	'use strict';

	function DropDownMock(control, config) {
		var block,
				dataList,
				isDropDownShown,
				selectedIndex;

		DropDownMock.instance = this;

		function init() {
			block = DX.Dom.createElement('div', {
				className: 'dropDown'
			});
			document.body.appendChild(block);
		}

		function setDataList(data) {
			dataList = data;
		}

		function getDataList() {
			return dataList;
		}

		function show() {
			isDropDownShown = true;
		}

		function hide() {
			isDropDownShown = false;
		}

		function setSelectedIndex(index) {
			selectedIndex = index;
		}

		function getSelectedIndex() {
			return selectedIndex;
		}

		function getBlock() {
			return block;
		}

		function isShown() {
			return isDropDownShown;
		}

		init();

		this.setDataList = setDataList;
		this.setSelectedIndex = setSelectedIndex;
		this.getSelectedIndex = getSelectedIndex;
		this.show = show;
		this.hide = hide;
		this.isShown = isShown;
		this.getBlock = getBlock;

		this.___getDataList = getDataList;
	}

	return DropDownMock;

})(DX, window, document);

DropDownMock.E_CHANGED = 'dropdown:changed';
DropDownMock.E_SHOWN = 'dropdown:shown';
DropDownMock.E_HIDDEN = 'dropdown:hidden';
DropDownMock.E_CREATED = 'dropdown:created';

