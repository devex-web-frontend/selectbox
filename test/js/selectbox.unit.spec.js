describe('Selectbox ', function() {
	var simpleSelectTmpl = [
		'<select id="test" class="justiceLeague heroes">',
			'<option class="superman" value="super power" data-man-of-steel="yeah">Superman</option>',
			'<option class="batman" value="super rich" data-friend="Robin" data-foe="Penguin">Batman</option>',
			'<option class="flash" value="super speed" data-status="not available">Flash</option>',
		'</select>'
	].join('');

	beforeEach(function() {
		document.body.innerHTML = simpleSelectTmpl;
		window.DropDown = DropDownMock;
	});

	afterEach(function() {
		document.body.innerHTML = '';
		window.DropDown = null;
	});

	describe('#constructor()', function() {
		it('should generate .selectBox block', function() {
			new Selectbox(document.getElementById('test'));

			expect(document.querySelector('.selectBox')).not.toBeNull();
		});

		it('should move classNames of original select to .selectBox', function() {
			var original = document.getElementById('test'),
				selectBox;

			new Selectbox(original);
			selectBox = document.querySelector('.selectBox');

			expect(selectBox.classList.contains('justiceLeague')).toBe(true);
			expect(selectBox.classList.contains('heroes')).toBe(true);
			expect(original.className).toBe('');
		});

		it('should move id of original select, if present, to .selectBox', function() {
			var original = document.getElementById('test'),
				selectBox;

			new Selectbox(original);
			selectBox = document.querySelector('.selectBox');

			expect(selectBox.id).toBe('test');
			expect(original.id).toBe('');
		});

		it('should generate id for .selectBox, if original select doesn\'t have one', function() {
			var selectBox;

			document.body.innerHTML = simpleSelectTmpl.replace('id="test"', '');

			new Selectbox(document.querySelector('select'));
			selectBox = document.querySelector('.selectBox');

			expect(selectBox.id).not.toBe('');
			expect(/^\w+_\d+_\d+$/.test(selectBox.id)).toBe(true);
		});

		it('should add className of selected option as modifier on init', function() {
			var selectElement = document.getElementById('test');

			selectElement.selectedIndex = 2;
			new Selectbox(selectElement);

			expect(document.querySelector('.selectBox-flash')).not.toBeNull();
		});

		it('should init disabled control if original select is disabled', function() {
			var selectElement = document.getElementById('test');

			selectElement.disabled = true;
			new Selectbox(selectElement);
			expect(document.querySelector('.selectBox-disabled')).not.toBeNull();
		});

		it('should init normally when original select is empty ', function() {
			var selectElement = document.getElementById('test');

			selectElement.innerHTML = '';

			expect(function() {
				new Selectbox(selectElement);
			}).not.toThrow();
			expect(document.querySelector('.selectBox')).not.toBeNull();
		});

		it('should pass data-attributes as object to dropdown', function() {
			new Selectbox(document.getElementById('test'));
			expect(DropDown.instance.___getDataList()[2].data.status).toBe('not available');
			expect(DropDown.instance.___getDataList()[0].data.manOfSteel).toBe('yeah');
			expect(DropDown.instance.___getDataList()[1].data.friend).toBe('Robin');
			expect(DropDown.instance.___getDataList()[1].data.foe).toBe('Penguin');
		});

		it('should show dropdown', function() {
			var selectElement = document.getElementById('test'),
				testSelectBox;

			testSelectBox = new Selectbox(selectElement);
			testSelectBox.showDropdown();
			expect(DropDownMock.instance.isShown()).toBe(true);
		});

		it('should hide dropdown', function() {
			var selectElement = document.getElementById('test'),
					testSelectBox;
			testSelectBox = new Selectbox(selectElement);
			testSelectBox.showDropdown();
			testSelectBox.hideDropdown();
			expect(DropDownMock.instance.isShown()).toBe(false);
		});

		it('should add "-active" modifier when dropdown shows', function() {
			var selectElement = document.getElementById('test');
			new Selectbox(selectElement);

			var dropDownElement = document.querySelector('.dropDown');
			DX.Event.trigger(dropDownElement , DropDown.E_SHOWN);
			expect(document.querySelectorAll('.selectBox-active').length).toBe(1);
		});

		it('should remove "-active" modifier when dropdown hides', function() {
			var selectElement = document.getElementById('test');
			new Selectbox(selectElement);

			var dropDownElement = document.querySelector('.dropDown');
			DX.Event.trigger(dropDownElement, DropDown.E_SHOWN);
			DX.Event.trigger(dropDownElement, DropDown.E_HIDDEN);
			expect(document.querySelectorAll('.selectBox-active').length).toBe(0);
		});

		describe('E_CREATED', function() {
			it('should be triggered once after selectbox created', function() {
				var test = document.getElementById('test'),
						eventHandler = jasmine.createSpy('created');

				test.addEventListener(Selectbox.E_CREATED, eventHandler);

				new Selectbox(test);

				expect(eventHandler).toHaveBeenCalled();
				expect(eventHandler.calls.length).toBe(1);
			});

			it('should pass block, dropDown and eventTarget to e.detail', function() {
				var test = document.getElementById('test'),
						testBlock,
						testDropdown,
						testEventTarget;

				test.addEventListener(Selectbox.E_CREATED, function(e) {
					testBlock = e.detail.block;
					testDropdown = e.detail.dropDown;
					testEventTarget = e.detail.eventTarget;
				});

				new Selectbox(test);

				expect(testBlock).toBe(document.querySelector('.selectBox'));
				expect(testDropdown).toBe(document.querySelector('.dropDown'));
				expect(testEventTarget).toBe(test);
			});
		});
	});

	describe('Methods', function() {
		describe('#getValue()', function() {
			it('should return empty string (as value) when all elements removed by js', function() {
				var selectElement = document.getElementById('test'),
						select = new Selectbox(selectElement);

				expect(select.getValue()).toBe('super power');

				selectElement.innerHTML = '';

				waitsFor(function() {
					return !selectElement.options.length;
				}, 'options should removed', 100);

				runs(function() {
					window.setTimeout(function() {
						expect(select.getValue()).toBe('')
					}, 100);
				});
			});

			it('should return empty string when Selectbox initialized on empty select', function() {
				var selectElement = document.getElementById('test'),
						selectbox;

				selectElement.innerHTML = '';
				selectbox = new Selectbox(selectElement);

				expect(selectbox.getValue()).toBe('');
			});

			it('should return correctly value Selectbox initialized on select with selectedIndex <> 0', function() {
				var selectElement = document.getElementById('test'),
						selectbox;

				selectElement.selectedIndex = 1;
				selectbox = new Selectbox(selectElement);

				expect(selectbox.getValue()).toBe('super rich');
			});
		});

		describe('#getText()', function() {
			it('should return empty string when Selectbox initialized on empty select', function() {
				var selectElement = document.getElementById('test'),
						selectbox;

				selectElement.innerHTML = '';
				selectbox = new Selectbox(selectElement);

				expect(selectbox.getText()).toBe('');
			});
		});
	});

	describe('Constants', function() {
		it('should provide event names as constants', function() {
			expect(Selectbox.E_CHANGED).toBe('selectbox:changed');
			expect(Selectbox.E_CHANGE_VALUE).toBe('selectbox:changevalue');
			expect(Selectbox.E_CREATED).toBe('selectbox:created');
		});
	});

	describe('Events API', function() {

	});

	describe('Static Methods', function() {
		describe('#disable()', function() {
			it('should disable original selectbox', function() {
				var select = document.getElementById('test');

				new Selectbox(select);
				Selectbox.disable(select);

				expect(select.disabled).toBe(true);
			});

			it('should add selectbox-disabled modifier to block', function() {
				var select = document.getElementById('test'),
					block;

				new Selectbox(select);
				block = document.querySelector('.selectBox');
				Selectbox.disable(select);

				expect(block.classList.contains('selectBox-disabled')).toBe(true);
			});
		});

		describe('#enable()', function() {
			it('should enable original selectbox', function() {
				var select = document.getElementById('test');

				select.disabled = true;
				new Selectbox(select);
				Selectbox.enable(select);

				expect(select.disabled).toBe(false);
			});

			it('should remove selectbox-disabled modifier from block', function() {
				var select = document.getElementById('test'),
					block;

				select.disabled = true;
				new Selectbox(select);
				block = document.querySelector('.selectBox');
				Selectbox.enable(select);

				expect(block.classList.contains('selectBox-disabled')).toBe(false);
			});
		});
	})
});