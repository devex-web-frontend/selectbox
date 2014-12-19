angular.scenario.dsl('keydown', function() {
	return function(code) {
		return this.addFutureAction('keydown on document with code: ' + code, function($window, $document, done) {
			var element = $document[0],
				event = document.createEvent('UIEvents');

			event.initUIEvent('keydown', false, false);

			event.key = code;

			function keydownHandler() {
				element.removeEventListener('keydown', keydownHandler);
				done();
			}

			element.addEventListener('keydown', keydownHandler);
			element.dispatchEvent(event);
		});
	};
});