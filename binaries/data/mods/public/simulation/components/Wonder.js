function Wonder() {}

Wonder.prototype.Schema = 
	"<element name='TimeTillVictory'>" +
		"<data type='nonNegativeInteger'/>" +
	"</element>";

Wonder.prototype.Init = function()
{
};

Wonder.prototype.OnOwnershipChanged = function(msg)
{
	this.ResetTimer(msg.to);
};

Wonder.prototype.OnGameTypeChanged = function()
{
	var cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
	if (!cmpPlayer)
		return;
	this.ResetTimer(cmpPlayer.GetPlayerID());
};

Wonder.prototype.ResetTimer = function(ownerID)
{
	var cmpTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer);
	var cmpGuiInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	// remove existing messages if any
	if (this.timer)
	{
		cmpTimer.CancelTimer(this.timer);
		cmpGuiInterface.DeleteTimeNotification(this.ownMessage);
		cmpGuiInterface.DeleteTimeNotification(this.otherMessage);
	}
	if (ownerID <= 0)
		return;

	var cmpEndGameManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_EndGameManager);
	if (!cmpEndGameManager.CheckGameType("wonder"))
		return;

	// create new messages, and start timer to register defeat.
	var cmpPlayerManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_PlayerManager);
	var numPlayers = cmpPlayerManager.GetNumPlayers();
	var cmpPlayer = QueryOwnerInterface(this.entity, IID_Player);
	var players = [];
	for (var i = 1; i < numPlayers; i++)
		if (i != ownerID)
			players.push(i);

	this.otherMessage = cmpGuiInterface.AddTimeNotification({
		"message": cmpPlayer.GetName() + " will have won in %T",
		"players": players,
		"time": +this.template.TimeTillVictory*1000
	});
	this.ownMessage = cmpGuiInterface.AddTimeNotification({
		"message": "You will have won in %T",
		"players": [ownerID],
		"time": +this.template.TimeTillVictory*1000
	});
	this.timer = cmpTimer.SetTimeout(SYSTEM_ENTITY, IID_EndGameManager, "MarkPlayerAsWon", +this.template.TimeTillVictory*1000, ownerID);
};

Engine.RegisterComponentType(IID_Wonder, "Wonder", Wonder);
