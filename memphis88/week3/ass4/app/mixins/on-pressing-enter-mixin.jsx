var OnPressingEnterMixin = {
	onPressingEnter: function(e) {
		if (e.keyCode == 13) { this.onClick() };
	}
};

module.exports = OnPressingEnterMixin;