import {expect} from 'chai'
import sayHello from '../app/say-hello'

describe('sayHello', function() {

	describe('when called with a valid input', function() {

		it('should not throw an error', function() {
			sayHello('World');
		})

		it('should return the correct result', function() {
			var hello = sayHello('World');
			expect(sayHello('World')).to.equal('Hello World!');
		})

	})

	describe('when called with an invalid input', function(){
		it('should throw an error', function(){
			expect(sayHello).to.Throw(/Please provide a valid input/);
		})
	})

})