describe('Selectbox', function() {

	var KEY_UP_CODE = 38,
		KEY_DOWN_CODE = 40,
		ENTER_KEY_CODE = 13,
		ESC_KEY_CODE = 27;
	
	beforeEach(function() {
		browser().navigateTo('/test/js/html/simple-select.html');
	});
	afterEach(function() {
	});

	describe('mouse', function() {
		it('should show dropdown when clicked', function() {
			element('.selectBox').click();
			expect(element('.dropDown-shown').count()).toBe(1);
		});

		it('should hide dropdown when clicked 2 times', function() {
			element('.selectBox').click();
			element('.selectBox').click();
			expect(element('.dropDown-shown').count()).toBe(0);
		});

		it('should not show dropdown when disabled selectbox clicked', function() {
			browser().navigateTo('/test/js/html/simple-select-disabled.html');
			element('.selectBox').click();
			expect(element('.dropDown-shown').count()).toBe(0);
		});
	});

	describe('keyboard', function() {
		it('should set next item as hovered when down button pressed on keyboard', function() {
			element('.selectBox').click();
			keydown(KEY_DOWN_CODE);

			expect(element('.dropDown--option-opt2.dropDown--option-hovered').count()).toBe(1);
		});

		it('should set previous item as hovered when up button pressed on keyboard', function() {
			element('.selectBox').click();
			keydown(KEY_DOWN_CODE);
			keydown(KEY_UP_CODE);

			expect(element('.dropDown--option-opt1.dropDown--option-hovered').count()).toBe(1);
		});

		it('should not change hovered item when up button pressed on keyboard and first item is hovered already', function() {
			element('.selectBox').click();
			keydown(KEY_UP_CODE);

			expect(element('.dropDown--option-opt1.dropDown--option-hovered').count()).toBe(1);
		});

		it('should not change hovered item when down button pressed on keyboard and last item is hovered already', function() {
			element('.selectBox').click();
			keydown(KEY_DOWN_CODE);
			keydown(KEY_DOWN_CODE);
			keydown(KEY_DOWN_CODE);
			expect(element('.dropDown--option-opt3.dropDown--option-hovered').count()).toBe(1);
		});

		it('should hide dropdown when enter is pressed', function() {
			element('.selectBox').click();
			keydown(ENTER_KEY_CODE);

			expect(element('.dropDown-shown').count()).toBe(0);
		});

		it('should hide dropdown when escape is pressed', function() {
			element('.selectBox').click();
			keydown(ESC_KEY_CODE);

			expect(element('.dropDown-shown').count()).toBe(0);
		});

		it('should set hovered element as selected when enter is pressed', function() {
			element('.selectBox').click();
			keydown(KEY_DOWN_CODE);
			keydown(ENTER_KEY_CODE);

			expect(element('.dropDown--option-opt2.dropDown--option-selected').count()).toBe(1);
		});

		it('should not change selected item when escape is pressed', function() {
			element('.selectBox').click();
			keydown(KEY_DOWN_CODE);
			keydown(ESC_KEY_CODE);

			expect(element('.dropDown--option-opt1.dropDown--option-selected').count()).toBe(1);
		});

		it('should ignore keyboard when dropdown is hidden', function() {
			keydown(KEY_UP_CODE);
			expect(element('.dropDown--option-hovered').count()).toBe(0);
			expect(element('.dropDown--option-opt1.dropDown--option-selected').count()).toBe(1);
			keydown(KEY_DOWN_CODE);
			expect(element('.dropDown--option-hovered').count()).toBe(0);
			expect(element('.dropDown--option-opt1.dropDown--option-selected').count()).toBe(1);
			keydown(ENTER_KEY_CODE);
			expect(element('.dropDown--option-hovered').count()).toBe(0);
			expect(element('.dropDown--option-opt1.dropDown--option-selected').count()).toBe(1);
			keydown(ESC_KEY_CODE);
			expect(element('.dropDown--option-hovered').count()).toBe(0);
			expect(element('.dropDown--option-opt1.dropDown--option-selected').count()).toBe(1);
		});
	});
});