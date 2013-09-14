
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var removeGroupClientButton = {};	// @button
	var removeGroupServerButton = {};	// @button
	var assignGroupClientButton = {};	// @button
	var assignGroupServerButton = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	removeGroupClientButton.click = function removeGroupClientButton_click (event)// @startlock
	{// @endlock
		if(sources.group.length > 0){
			var joinCollection = ds.UserGroup.query("user.ID == :1 && group.ID ==:2", {
				params:[sources.user.ID, sources.group.ID],
				onSuccess: function(){
					joinCollection.removeAllEntities({
						onSuccess: function(){
							sources.user.serverRefresh();
							sources.group.serverRefresh();
							sources.userGroup.all();	
						}
					});	
				}
			});

		}

	};// @lock

	removeGroupServerButton.click = function removeGroupServerButton_click (event)// @startlock
	{// @endlock
		if(sources.group != null){
			sources.user.removeGroup(sources.group.ID, {
				onSuccess: function(event){
					if(event.result ==true){
						sources.user.serverRefresh();
						sources.group.serverRefresh();
						sources.userGroup.all();
					}
				}
			});
		} 
	};// @lock

	assignGroupClientButton.click = function assignGroupClientButton_click (event)// @startlock
	{// @endlock
		if(sources.group.length > 0){
			sources.userGroup.addNewElement();
			sources.userGroup.user.set(sources.user);
			sources.userGroup.group.set(sources.group);
			sources.userGroup.save({
				onSuccess: function(event){
					sources.user.serverRefresh();
					sources.group.serverRefresh();
				}
			});
		}
	};// @lock

	assignGroupServerButton.click = function assignGroupServerButton_click (event)// @startlock
	{// @endlock
		if(sources.group != null){
			sources.user.addGroup(sources.group.ID, {
				onSuccess: function(event){
					if(event.result == true){
						sources.user.serverRefresh();
						sources.group.serverRefresh();
						sources.userGroup.all();
					}
				}
			});
		} 
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("removeGroupClientButton", "click", removeGroupClientButton.click, "WAF");
	WAF.addListener("removeGroupServerButton", "click", removeGroupServerButton.click, "WAF");
	WAF.addListener("assignGroupClientButton", "click", assignGroupClientButton.click, "WAF");
	WAF.addListener("assignGroupServerButton", "click", assignGroupServerButton.click, "WAF");
// @endregion
};// @endlock
