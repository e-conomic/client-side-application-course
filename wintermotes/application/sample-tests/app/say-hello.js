export default function(name) {
	if (!name) {
		throw new Error('Please provide a valid input');
	}
	return 'Hello ' + name + '!'
}