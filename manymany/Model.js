
guidedModel =// @startlock
{
	Group :
	{
		entityMethods :
		{// @endlock
			removeUser:function()
			{// @lock
				// Add your code here
			},// @lock
			addUser:function()
			{// @lock
				// Add your code here
			}// @startlock
		}
	},
	User :
	{
		entityMethods :
		{// @endlock
			removeGroup:function(groupID)
			{// @lock
				var theGroup = ds.Group(groupID);
				var matches = ds.UserGroup.query("group.ID == :1 && user.ID == :2", groupID, this.ID);
				if(matches.length > 0){
					matches.remove();
					return true;
				}
			},// @lock
			addGroup:function(groupID)
			{// @lock
				var theGroup = ds.Group(groupID);
				var existing = ds.UserGroup.find("group.ID == :1 && user.ID == :2", groupID, this.ID);
				if(!existing){
					new ds.UserGroup({user: this, group: theGroup}).save();
					return true;
				}
			}// @startlock
		}
	}
};// @endlock
