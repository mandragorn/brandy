/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */


window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-pill' : '&#xe007;',
			'icon-home' : '&#xf015;',
			'icon-inbox' : '&#xf01c;',
			'icon-calendar' : '&#xf073;',
			'icon-credit' : '&#xf09d;',
			'icon-info-sign' : '&#xf059;',
			'icon-stethoscope' : '&#xf0f1;',
			'icon-star-empty' : '&#xf006;',
			'icon-star' : '&#xf005;',
			'icon-drawer' : '&#xe009;',
			'icon-plus' : '&#xf067;',
			'icon-minus' : '&#xf068;',
			'icon-reorder' : '&#xf0c9;',
			'icon-ok' : '&#xf00c;',
			'icon-exclamation-sign' : '&#xf06a;',
			'icon-remove' : '&#xf00d;',
			'icon-sort-up' : '&#xf0de;',
			'icon-sort-down' : '&#xf0dd;',
			'icon-sort' : '&#xf0dc;',
			'icon-move' : '&#xf047;',
			'icon-signout' : '&#xf08b;',
			'icon-warning-sign' : '&#xf071;',
			'icon-remove-sign' : '&#xf057;',
			'icon-info-sign' : '&#xf05a;',
			'icon-check' : '&#xf046;',
			'icon-ok-sign' : '&#xf058;',
			'icon-ok-circle' : '&#xf05d;',
			'icon-check-empty' : '&#xf096;',
			'icon-filter' : '&#xf0b0;',
			'icon-arrow-right' : '&#xf061;',
			'icon-chevron-right' : '&#xf054;',
			'icon-chevron-left' : '&#xf053;',
			'icon-arrow-left' : '&#xf060;',
			'icon-search' : '&#xe001;',
			'icon-paper-clip' : '&#xf0c6;',
			'icon-tea' : '&#xf3cb;',
			'icon-bandage' : '&#xe004;',
			'icon-email' : '&#xe005;',
			'icon-reply' : '&#xe006;',
			'icon-forward' : '&#xe00a;',
			'icon-allergies' : '&#xe00b;',
			'icon-address-book' : '&#xe00c;',
			'icon-cog' : '&#xf013;',
			'icon-syringe' : '&#xe002;',
			'icon-bar-chart' : '&#xe003;',
			'icon-hospital' : '&#xf0f8;',
			'icon-th' : '&#xf00a;',
			'icon-external-link' : '&#xf08e;',
			'icon-layers' : '&#xf1ca;',
			'icon-desktop' : '&#xf108;',
			'icon-tablet' : '&#xe00e;',
			'icon-fontwidth' : '&#xf1f9;',
			'icon-th-list' : '&#xf00b;',
			'icon-user' : '&#xf007;',
			'icon-user-md' : '&#xf0f0;',
			'icon-group' : '&#xf0c0;',
			'icon-download' : '&#xf11a;',
			'icon-medkit' : '&#xf0fa;',
			'icon-caret-down' : '&#xf0d7;',
			'icon-caret-up' : '&#xf0d8;',
			'icon-caret-left' : '&#xf0d9;',
			'icon-caret-right' : '&#xf0da;',
			'icon-heart' : '&#xe008;',
			'icon-h-sign' : '&#xf0fd;',
			'icon-plus-sign' : '&#xf0fe;',
			'icon-pencil' : '&#xf040;',
			'icon-edit' : '&#xf044;',
			'icon-eye-open' : '&#xf06e;',
			'icon-print' : '&#xf02f;',
			'icon-envelope' : '&#xe00d;',
			'icon-comment' : '&#xe00f;',
			'icon-chat' : '&#xe010;',
			'icon-dollar-sign' : '&#xe000;',
			'icon-clip-board' : '&#xe011;',
			'icon-file' : '&#xe012;',
			'icon-circle-blank' : '&#xf10c;',
			'icon-circle' : '&#xf111;',
			'icon-barcode' : '&#xf02a;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};
