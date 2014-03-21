function getBaseURL() {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
}

AUI().ready(

	/*
	This function gets loaded when all the HTML, not including the portlets, is
	loaded.
	*/

	function() {
		AUI().use('node', function(A) {
			var searchForm = A.one("#banner form[name$=_3_fm]");
			if(searchForm) {
				searchForm.set('action','http://' + window.document.location.host + '/zoeken');
			}
			
			var doAsUserId = encodeURIComponent(Liferay.ThemeDisplay.getDoAsUserIdEncoded());
			if (doAsUserId != "") {
				A.all('a').each(function (node) {
					var href = node.getAttribute("href");
					if(href && href != "" && href.indexOf("javascript:") < 0 && href.indexOf("#") != 0 && (href.indexOf("/") == 0 || href.indexOf(getBaseURL()) == 0)) {
						if(href.indexOf("doAsUserId=" + doAsUserId) < 0) {
							if(href.indexOf("?") < 0) {
								href = href + "?" + "doAsUserId=" + doAsUserId;
							} else {
								href = href + "&" + "doAsUserId=" + doAsUserId;
							}
							node.setAttribute("href", href);
						}
					}
				});
			}
		});
	}
);

Liferay.Portlet.ready(

	/*
	This function gets loaded after each and every portlet on the page.

	portletId: the current portlet's id
	node: the Alloy Node object of the current portlet
	*/

	function(portletId, node) {
	}
);

Liferay.on(
	'allPortletsReady',
	/*
	This function gets loaded when everything, including the portlets, is on
	the page.
	*/

	function() {
		
	}
);

AUI().ready('aui-dialog', 'aui-overlay-manager', function(A) {
	var userName = A.one('#headerBox .links .user-fullname');
	if (userName) {
		userName.on('click',
			function(event) {
				event.preventDefault();
				var currentTarget = event.currentTarget;
				var controlPanelCategory = A.Lang.trim(currentTarget.attr('data-controlPanelCategory'));;

				var uri = currentTarget.attr('href');
				var title = currentTarget.attr('title');

				if (controlPanelCategory) {
					uri = Liferay.Util.addParams('controlPanelCategory=' + controlPanelCategory, uri) || uri;
				}

				Liferay.Util.openWindow({
				    dialog: {
				    	align: Liferay.Util.Window.ALIGN_CENTER,
				        width: 960,
				        modal:true,
				        centered: false,
				        destroyOnClose: true
				    },
				    title: title,
					uri: uri
				});
			}
		);
	}
});