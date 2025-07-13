/*[c][size=1] STARTTMRA */
var myUsername = "";
var usernameRE = /href="\/collection\/user\/(.*?)">Collection/.exec(document.body.innerHTML);
if(usernameRE){
	myUsername = usernameRE[1];
}
var TMRversion = [2,2,6,1]; 
/*jshint +W018*/ /*jshint +W086*/ /*jshint +W014*/ /*jshint +W117*/ /* TODO: deal with bouncing options (just change context, don't remove and add) */ /*var document = "";var module = "";var alert = "";var alertify = "";var confirm = "";var prompt = "";*/ /* TODO: Admiral "Lee" Banner, President/Admiral/CAG "Billy" banners*/ /* TODO: Dictator Starbuck, Kat, Anders, Gaeta, Tory */
/*var document = "";
let module = "";
let alert = "";
let alertify = "";
let confirm = "";
let prompt = "";
let define = "";
let window = "";
let setTimeout = "";
let Event = "";*/  
var d = {
	"spaceNames": ["Reserves","The Deep",   
				   "Water Space 1","Water Space 2","Water Space 3","Water Space 4","Water Space 5","Water Space 6","Water Space 7","Water Space 8",
				   "Deck Space 1","Deck Space 2","Deck Space 3","Deck Space 4","Deck Space 5","Deck Space 6","Deck Space 7","Deck Space 8",
				   "Bridge","Chapel","Captain's Cabin","Cargo Hold","Galley","Boiler Room",
				   "Sick Bay","Brig"],
	"damageNames": ["Structural Damage (Influence)","Structural Damage (Lore)","Structural Damage (Observation)","Structural Damage (Strength)","Structural Damage (Will)",
					"Structural Damage (Wild)","Fuel Leak","Flooded Food Stores","Fleeing Passengers",
					"False Alarm","Minor Structural Damage"],
	"characters": ["Keilani", "Arjun", "Svetlana", "Jeanne", "Jamie", "William", "Beatrice", "Ishmael", "Edmund", "Samira", 
				   "Antar", "Avery", "Guillaume", "Ida", "Kokoj", "Raúl", "Sardaana", "Mui Choo"],
	"startingLocations": ["Captain's Cabin", "Bridge", "Captain's Cabin", "Boiler Room", "Bridge", "Chapel", "Chapel", "Galley", "Galley", "Cargo Hold",
						  "Cargo Hold", "Boiler Room", "Chapel", "Galley", "Cargo Hold", "Captain's Cabin", "Bridge", "Boiler Room"], 
	"banners":       [6414447, 6414430, 6414458, 6414443, 6414440, 6414461, 6414432, 6414438, 6414451, 6414454, 
					  8326819, 8326820, 8326822, 8326824, 8326826, 8326830, 8326832, 8326833], 
	"hybridBanners": [6414449, 6414431, 6414459, 6414444, 6414441, 6414462, 6414436, 6414439, 6414453, 6414456, 
					  8326834, 8326835, 8326836, 8326837, 8326838, 8326839, 8326840, 8326841], 
	/* UTODO: these */
	"keeperBanners": [6414447, 6414430, 6414458, 6414443, 6414440, 6414461, 6414447, 6414432, 6414438, 6414454,
					  8326819, 8326820, 8326822, 8326824, 8326826, 8326830, 8326832, 8326833], 
	"captainBanners": [6414447, 6414430, 6414458, 6414443, 6414440, 6414461, 6414447, 6414432, 6414438, 6414454,
	                   8326819, 8326820, 8326822, 8326824, 8326826, 8326830, 8326832, 8326833], 
	"dictatorBanners": [6414447, 6414430, 6414458, 6414443, 6414440, 6414461, 6414447, 6414432, 6414438, 6414454,
	                    8326819, 8326820, 8326822, 8326824, 8326826, 8326830, 8326832, 8326833], 
	"allyBanners": [544872, 544873, 544205, 6790850, 6840941, 544875, 544210, 6784028, 544206, 878729, 544203, 6790846],
	"skillSets": [
		[1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
		[0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
		[0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
		[0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	"skillDraws": [
		[3, 2, 2, 1, 0, 0, 1, 0, 1, 0, 0, 2, 2, 2, 0, 0, 2, 0],
		[0, 0, 1, 0, 0, 3, 2, 2, 1, 1, 2, 0, 2, 1, 2, 1, 0, 0],
		[0, 1, 2, 2, 0, 0, 2, 0, 1, 2, 3, 0, 0, 0, 0, 2, 2, 1],
		[0, 2, 0, 2, 3, 0, 0, 2, 1, 0, 0, 2, 0, 2, 0, 2, 0, 2],
		[2, 0, 0, 0, 2, 2, 0, 1, 1, 2, 0, 1, 1, 0, 3, 0, 1, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	"captainSuccession": [1,2,7,4,5,16,10,14,12,18,11,3,17,13,15,9,6,8], 
	"keeperSuccession": [18,17,12,15,14,1,6,4,7,8,5,16,3,9,2,10,13,11],
	"allyNames": ["Able Seaman", "Cadet", "Conspiracy Theorist", "Fortune Teller", "Gambler", "Host", "Mechanic", "Professor", "Quartermaster", "Ruffian", "Security Officer", "Soldier"],
	"allyValues": [3,3,3,4,0,4,4,4,4,2,0,3],
	"horrorNames": ["Drowned Spirit","Grasping Tendril","Ominous Visions","Shoggoth"],
	"waypointNames": ["Abandoned Depot","Deserted Island","Hurricane","Iceberg","Reef","Shipwreck Survivors","Wrecked Ship","Deep One City","Fog Bank","Maelstrom","Rainstorm","Rogue Wave",
		"Rolling Seas","Sea Smoke","Seaweed Patch","Smooth Sailing","Calm Waters","Deep One Ambush","Rough Water","Stormy Seas",
		"Aurora","Storm Winds","Tranquil Tides","Blood Moon","Blustering Gale","Kelp Forest","Sea Foam","Ship Graveyard","Bone Chill","Mesmerizing Haze"
	],
	"mythosNames": ["Accusation","Adrift Fishing Boat","Barricade the Hatches","Bucket Brigade","Class Struggle","Coal Bunker Fire","Collision Course","Coordinated Assault","Criminal Activity",
	"Damaged Evaporator","Deep One Feint","Deep One Swarm","Dinghy Launch","Disturbing Dreams","E.O.T. Failure","Fear of the Unknown","Firemen Strike","Flooding Compartment","Food Rationing",
	"Food Stores Raid","Horrific Visions","Hull Leak","Hypnotic Melody","Identity Crisis","Improvised Fuel Source","Incoming SOS","Infection","Infiltrator","Jail Break","Just Desserts","Kitty Litter",
	"Looming Breakdown","Lure of Y'ha-nthlei","Missing Jewelry","Missing Munitions","Missing Parents","Mysterious Lifeboat","On the Offensive","Open the Gate","Passenger Overboard","Passenger Riot",
	"Poisoned Food","Power to the People","Rally the Crew","Rat Infestation","Ritual Coordination","Ritual Support","Sacrifice Deep One","Sewage Backup","Shipboard Fire","Stolen Ritual Components",
	"Strange Vision","The Anarcho-Individualist","The Captain's Banquet","The Father's Favor","The Mother's Wrath","Too Many Bodies","Transformation","Volunteer Army","Hold the Line","History Repeats",
	"The Peacemaker","Do No Harm","Signs of Life","The Game is Afoot","Memory of the Deep","Miscalculation","Family Ties","Gift of the Mother","Ticket, Please",
	"A Closer Look","All It Can Eat","Battering Waves","Bump in the Night","Cabin Fever","Calenture","Cleansing Rain","Coal Dust","Creeping Vines","Dabbling in the Occult","Dead Reckoning","Demand Change","Despair",
	"Disappearing Belongings","Disappearing Food","Drag","Drowned Fears","Eccentric Gathering","Eerie Moaning","Finest Ingredients","Ghostly Locket","Growing Unease","Hysteria","Inheritance","Initiation","Insight","Intrusion",
	"Join Hands","Last Rites","Lurking Creature","Make Ready","Missing Persons","Monstrous Pursuit","Mysterious Rune","Mystic Communion","Occult Accusations","Offering","Ominous Feeling","Outbreak","Parasite","Pickpocket",
	"Precognition","Price of Power","Risky Preservation","Scary Stories","Seaborne","Secure Leadership","Sense of Foreboding","Shoggoth","Spoilage","Taken","The End is Nigh!","Tidal Turbulence","To Arms!","Torn Pages",
	"Tug of War","Unexpected Revival","Unsecured Cargo","Unseen Follower","Witch Hunt",
	"Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis","Personal Crisis",
	"Unsolved Case","Terrified Sailor","Exorcism","Rumors","Cursed Whispers","Sense of Propriety","Looming Danger","Underestimated"
	],
	"spellNames": ["Alchemical Transmutation","Astral Travel","Call Down the Storm","Call Friends","Cloud Memory","Conjuration","Dark Pact","Feed the Mind","Flesh Ward","Foresee",
		"Greater Banishment","Greater Banishment","Heal","Lure Monster","Plague of Locusts","Raise the Dead","Revelation of Script","Summon Fire","Summon the Beast Within","Voice of Ra",
		"Blessing","Cast Out","Conjure Fortune","Dowsing","Greater Banishment (A)","Instill Bravery","Storm of Spirits","Temporal Barrier","Temporal Discovery","Uncanny Luck"
	],
	"itemNames": ["Speaking Trumpet", "Six-Shooter", "Travel Pharmacy", "Tool Kit", "Repeating Rifle", "Elder Sign Amulet", "Almanac", "Book of Dagon", '"Lucky" Ring', "Starbuck", 
	              "Pocket Pistol", "Fine Clothes", "Mystical Text", "Binoculars", "Medicine Ball", "Treasured Memento", "Jam Tin Grenade", "Kitchen Knife", "Plimsolls", "Shotgun",
				  "Notebook","Whistle","Spirit Board","Fillet Knife","Cursed Mask","Valise","Flare Gun","Maau","Baseball Bat","Ritual Candles"
	],
	"currentPlayerChooses": [0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
							 1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	"keeperChooses":        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
							 0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],	
	"captainChooses":       [1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,
	                         0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	"namedPlayerChooses": ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
		"","","","","","","","","","","","","Keilani","Arjun","Svetlana","Jeanne","Jamie","William","Beatrice","Ishmael","Edmund","Samira",
		"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
		"Antar","Avery","Guillaume","Ida","Kokoj","Raúl","Sardaana","Mui Choo"],
	"positives": [
		[0,1,0,1,0,1,0,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,1,
		 0,0,0,0,0,1,0,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0],
		[0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,1,1,0,1,0,1,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,0,
		 1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
		[0,1,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,
		 0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
		[0,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,1,0,
		 1,0,1,1,1,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,1,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,1,1,
		 1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0]
	],
	"difficulty": [0,16,10,16,0,13,11,17,11,11,11,15,0,13,11,15,9,9,0,11,10,9,10,11,0,0,0,11,9,0,10,11,9,0,16,0,0,10,18,9,13,0,9,13,12,9,0,0,9,11,10,0,0,0,16,17,0,0,0,15,13,13,13,13,13,13,13,0,15,13,
	               16,0,14,10,10,9,0,16,10,11,9,0,15,12,14,16,0,0,10,0,11,12,16,0,0,0,15,15,16,15,0,13,16,0,12,0,0,9,0,10,13,15,0,16,15,13,0,9,11,9,16,0,15,0,11,16,16,13,15,9,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,0,13,0,0],
	"partial": [0,13,0,0,0,0,8,0,0,8,0,11,0,10,0,0,0,0,0,8,0,0,7,0,0,0,0,8,0,0,0,0,0,0,12,0,0,0,0,0,10,0,0,10,8,0,0,0,0,8,0,0,0,0,11,12,0,0,0,10,0,0,0,0,0,0,0,0,0,0,
	            0,0,8,0,0,0,0,11,0,0,0,0,11,0,8,12,0,0,0,0,0,0,11,0,0,0,0,12,10,11,0,10,10,0,0,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,11,0,11,0,8,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	"trackIcon": ["R","C","C","R","T","R","R","R","R","R","C","C","T","T","R","C","R","R","R","T","R","T","T","R","R","R","T","T","C","C","R","R","R","T","C","R","R",
		"C","R","T","T","T","T","C","R","T","T","T","C","R","T","C","R","T","T","T","T","T","R","C","T","T","T","T","T","T","T","T","T","T",
		"T","T","R","T","C","C","R","C","R","R","C","R","C","C","T","T","R","C","T","C","R","T","R","R","R","R","C","R","R","T","T","T","T","T","R","R","R","T","C","T","C","C",
		"T","C","C","R","C","T","T","C","T","T","C","T","R","T","R","R","C","R","","","","","","","","","","","","","T","T","T","T","T","T","T","T"
	],
	"activation":["O","M","M","M","O","F","O","O","M","M","O","O","F","M","F","O","F","O","O","F","O","O","O","O","M","F","O","M","F","O","M","M","F","M","O","O","O",
		"F","F","O","O","O","O","F","O","O","M","O","F","O","F","O","F","M","F","M","O","O","F","M","O","M","F","O","O","M","F","O","M","O",
		"F","F","M","O","O","O","O","M","O","O","M","O","M","O","O","M","F","O","O","O","O","O","O","O","M","O","F","F","F","O","F","F","M","O",
		"M","M","O","O","O","O","M","O","M","O","F","M","F","F","M","O","F","F","O","O","F","M","O","M","O","O","","","","","","","","","","","","","M","M","O","F","F","F","O","O"
	],
	"horror": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			   1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	"loyaltyNames": ["You Are A Human", "You Are A Human", "You Are A Human", "You Are A Human", "You Are A Human",
		"You Are A Human", "You Are A Human", "You Are A Human", "You Are A Human", "[col" + "or=red]You Are A Hybrid[/col" + "or]", "[col" +
		"or=red]You Are A Hybrid[/col" + "or]", "[col" + "or=purple]You are a Cultist[/col" +
		"or]", "You Are A Human", "[col" + "or=red]You Are A Hybrid[/col" + "or]"
	],
	"featNames": ["Unconventional Leader","Self Sacrifice","Medical Intervention","Full Steam Ahead","Arrest Order","Quick Cast","Perfect Number","Deep One Ancestry","Uncanny Fortune","Well Equipped",
	              "Revelation","Popular Support","Unfinished Business","Feast","Don the Mask","Beck and Call","Alarm","Instinct"],
	"preludeNames": ["Favorable Conditions","Outpace","Respite","Surplus","Volunteer",
	                 "Cargo Raid","Delegate Authority","Preparation","Spreading Rumors","Valuable Lessons",
					 "Boarding Party","Doom","Emergence","Malfunctions","Shortage"]
};
var z = {};
var ts = document.getElementsByTagName("textarea");
var t = ts[ts.length-1];
var me = -1;
var myPlayer = "";
var mobile = false;

var localizationPriority = ["en-US"];

function lc(key,v,gen){
	for(let j = 0; !(j>=localizationPriority.length); j++){
		let lang = localizationPriority[j];
		if(!(lang in LOCALIZATION) || !(key in LOCALIZATION[lang])){
			continue;
		}
		key = LOCALIZATION[lang][key];
		if(!Array.isArray(v) && v !== undefined){
			v = [v];
		}
		for(let k = 0; v && !(k>=v.length) && !(k>=10); k++){
			key = key.replaceAll(new RegExp("\\$"+k,'g'),lc(v[k]));
		}
		if(!Array.isArray[gen] && gen !== undefined){
			gen = [gen];
		}
		for(let k = 0; gen && !(k>=gen.length) && !(k>=10); k++){
			let m = key.match(new RegExp("\\$PRON\\S+"+k,"g"));
			for(let l = 0; m && !(l>=m.length); l++){
				let pronKey = m[l].slice(0,-1);
				if(pronKey in LOCALIZATION[lang] && gen[k] in LOCALIZATION[lang][pronKey]){
					key = key.replace(m[l],LOCALIZATION[lang][pronKey][gen[k]]);
				}
			}
			
		}
		break;
	}
	return key;
}

function inv() {
	return colorText("#F7F7F8", "|");
} /***** ALERTIFY ****/
var lb = String.fromCharCode(60);
var TRANSITION_FALLBACK_DURATION = 500;
var hideElement = function(el) {
	if(!el) {
		return;
	}
	let removeThis = function() {
		if(el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	};
	el.classList.remove("show");
	el.classList.add("hide");
	el.addEventListener("transitionend", removeThis); /* alertify: Fallback for no transitions. */
	setTimeout(removeThis, TRANSITION_FALLBACK_DURATION);
};

function Alertify() {
	/**	 * Alertify private object	 * @type {Object}	 */ /* _alertify is a struct, with functions... */
	let _alertify = {
		parent: document.body,
		version: "1.0.11",
		defaultOkLabel: "Ok",
		okLabel: "Ok",
		defaultCancelLabel: "Cancel",
		cancelLabel: "Cancel",
		defaultMaxLogItems: 2,
		maxLogItems: 2,
		promptValue: "",
		promptPlaceholder: "",
		closeLogOnClick: false,
		closeLogOnClickDefault: false,
		delay: 5000,
		defaultDelay: 5000,
		logContainerClass: "alertify-logs",
		logContainerDefaultClass: "alertify-logs",
		dialogs: {
			buttons: {
				holder: lb + "nav>{" + "{buttons}}" + lb + "/nav>",
				ok: lb + "button class='ok' tabindex='1'>{" + "{ok}}" + lb + "/button>",
				cancel: lb + "button class='cancel' tabindex='2'>{" + "{cancel}}" + lb + "/button>",
				choice: lb + "button class='choice' id='choice{" + "{num}}'>{" + "{choice}}" + lb + "/button>"
			},
			input: lb + "input type='text'>",
			message: lb + "p class='msg'>{" + "{message}}" + lb + "/p>",
			log: lb + "div class='{" + "{class}}'>{" + "{message}}" + lb + "/div>"
		},
		defaultDialogs: {
			buttons: {
				holder: lb + "nav>{" + "{buttons}}" + lb + "/nav>",
				ok: lb + "button class='ok' tabindex='1'>{" + "{ok}}" + lb + "/button>",
				cancel: lb + "button class='cancel' tabindex='2'>{" + "{cancel}}" + lb + "/button>"
			},
			input: lb + "input type='text'>",
			message: lb + "p class='msg'>{" + "{message}}" + lb + "/p>",
			log: lb + "div class='{" + "{class}}'>{" + "{message}}" + lb + "/div>"
		},
		/**		 * Build the proper message box		 *		 * @param  {Object} item    Current object in the queue		 *		 * @return {String}         An HTML string of the message box		 */
		build: function(item) {
			/* promptButton uses onOkay to carry illegal with us... */
			let btnTxt = this.dialogs.buttons.ok;
			let html = lb + "div class='dialog'>" + lb + "div>";
			if(item.type === "promptButton" && typeof item.message === "string") {
				let illegal = item.onOkay;
				let split = item.message.split("\n");
				let foundAnyChoices = false;
				for(let j = 0; !(j >= split.length); j++) {
					let re = /^([ABC]|\d+): (.*)$/.exec(split[j]);
					if(re === null) {
						html += this.dialogs.message.replace("{" + "{message}}", split[j]);
					} else {
						foundAnyChoices = true;
						let n = parseInt(re[1]);
						if(isNaN(n) || !illegal(n)) {
							/* valid options or a number, gets id choiceA, choiceB, choiceC, choice0, choice1, etc... */
							html += this.dialogs.buttons.holder.replace("{" + "{buttons}}", this.dialogs.buttons.choice.replace("{" + "{choice}}", re[
								2]).replace("{" + "{num}}", re[1]));
						} else {
							html += this.dialogs.message.replace("{" + "{message}}", split[j]);
						}
					}
				}
				if(!foundAnyChoices) {
					for(let n = 0; !(n > 30); n++) {
						if(!illegal(n)) {
							html += this.dialogs.buttons.holder.replace("{" + "{buttons}}", this.dialogs.buttons.choice.replace("{" + "{choice}}", n)
								.replace("{" + "{num}}", n));
						}
					}
				}
				html += this.dialogs.buttons.holder.replace("{" + "{buttons}}", this.dialogs.buttons.cancel.replace("{" + "{cancel}}", this
					.cancelLabel));
				html += lb + "/div>" + lb + "/div>";
				return html;
			}
			if(typeof item.message === "string") {
				item.message = item.message.replace(/\n/g, lb + "br>");
			}
			html += this.dialogs.message.replace("{" + "{message}}", item.message);
			if(item.type === "confirm" || item.type === "prompt") {
				btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
			}
			if(item.type === "prompt") {
				html += this.dialogs.input;
			}
			html = (html + this.dialogs.buttons.holder + lb + "/div>" + lb + "/div>").replace("{" + "{buttons}}", btnTxt).replace("{" + "{ok}}", this
				.okLabel).replace("{" + "{cancel}}", this.cancelLabel);
			return html;
		},
		/**		 * Create a dialog box		 *		 * @param  {String}   message      The message passed from the callee		 * @param  {String}   type         Type of dialog to create		 * @param  {Function} onOkay       [Optional] Callback function when clicked okay.		 * @param  {Function} onCancel     [Optional] Callback function when cancelled.		 *		 * @return {Object}		 */
		dialog: function(message, type, onOkay, onCancel) {
			return this.setup({
				type: type,
				message: message,
				onOkay: onOkay,
				onCancel: onCancel
			});
		},
		/**		 * Initiate all the required pieces for the dialog box		 *		 * @return {undefined}		 */ setup: function(item) {
			let el = document.createElement("div");
			el.className = "alertify hide";
			el.innerHTML = this.build(item);
			let illegal = item.onOkay;
			item.onOkay = null;
			let btnOK = el.querySelector(".ok");
			let btnCancel = el.querySelector(".cancel");
			let input = el.querySelector("input");
			let label = el.querySelector("label");
			let choiceA = el.querySelector("#choiceA");
			let choiceB = el.querySelector("#choiceB");
			let choiceC = el.querySelector("#choiceC");
			let choices = [];
			if(choiceA) {
				choices.push(choiceA);
			}
			if(choiceB) {
				choices.push(choiceB);
			}
			if(choiceC) {
				choices.push(choiceC);
			}
			for(let j = 0; !(j > 20); j++) {
				let choiceN = el.querySelector("#choice" + j);
				if(choiceN) {
					choices.push(choiceN);
				}
			} /*document.getElementById("body").parentNode.insertBefore(el,document.getElementById("body")); */ /* alertify: Set default value/placeholder of input */
			if(input) {
				if(typeof this.promptPlaceholder === "string") {
					/* alertify: Set the label, if available, for MDL, etc. */
					if(label) {
						label.textContent = this.promptPlaceholder;
					} else {
						input.placeholder = this.promptPlaceholder;
					}
				}
				if(typeof this.promptValue === "string") {
					input.value = this.promptValue;
				}
			} /* is there any reject? gotta have cleanup... */
			function setupHandlers(resolve) {
				if("function" !== typeof resolve) {
					/* alertify: promises are not available so resolve is a no-op */
					resolve = function() {};
				}
				for(let j = 0; !(j >= choices.length); j++) {
					choices[j].addEventListener("click", (ev) => {
						resolve({
							buttonClicked: choices[j].id,
							event: ev
						});
						hideElement(el);
					});
				}
				if(btnOK) {
					if(!input) {
						btnOK.addEventListener("keyup", function(ev) {
							if(ev.which === 27) {
								if(btnCancel) {
									btnCancel.click();
								} else {
									btnOK.click();
								}
							}
						});
					}
					btnOK.addEventListener("click", function(ev) {
						if(input) {
							resolve({
								buttonClicked: "ok",
								inputValue: input.value,
								event: ev
							});
						} else {
							resolve({
								buttonClicked: "ok",
								event: ev
							});
						}
						hideElement(el);
					});
				}
				if(btnCancel) {
					btnCancel.addEventListener("click", function(ev) {
						if(item.onCancel && "function" === typeof item.onCancel) {
							item.onCancel(ev);
						}
						if(input) {
							resolve({
								buttonClicked: "cancel",
								inputValue: input.value,
								event: ev
							});
						} else {
							resolve({
								buttonClicked: "cancel",
								event: ev
							});
						}
						hideElement(el);
					});
				}
				if(input) {
					input.addEventListener("keyup", function(ev) {
						if(ev.which === 13) {
							btnOK.click();
						} else if(ev.which === 27) {
							btnCancel.click();
						}
					});
				}
			}
			let promise;
			if(typeof Promise === "function") {
				promise = new Promise(setupHandlers);
			} else {
				setupHandlers();
			}
			this.parent.appendChild(el);
			setTimeout(function() {
				el.classList.remove("hide");
				if(input && item.type && item.type === "prompt") {
					input.select(); /* I don't think this works on iOS */
					input.focus();
				} else {
					if(btnOK) {
						btnOK.focus();
					}
				}
			}, 100);
			return promise;
		},
		okBtn: function(label) {
			this.okLabel = label;
			return this;
		},
		setDelay: function(time) {
			time = time || 0;
			this.delay = isNaN(time) ? this.defaultDelay : parseInt(time, 10);
			return this;
		},
		cancelBtn: function(str) {
			this.cancelLabel = str;
			return this;
		},
		/*setMaxLogItems: function(num) {			this.maxLogItems = parseInt(num || this.defaultMaxLogItems);		},*/ /* TODO: play around with this, though then we may need to be careful with calls to reset. */
		theme: function(themeStr) {
			switch (themeStr.toLowerCase()) {
				case "bootstrap":
					this.dialogs.buttons.ok = lb + "button class='ok btn btn-primary' tabindex='1'>{" + "{ok}}" + lb + "/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel btn btn-default' tabindex='2'>{" + "{cancel}}" + lb + "/button>";
					this.dialogs.input = lb + "input type='text' class='form-control'>";
					break;
				case "purecss":
					this.dialogs.buttons.ok = lb + "button class='ok pure-button' tabindex='1'>{" + "{ok}}" + lb + "/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel pure-button' tabindex='2'>{" + "{cancel}}" + lb + "/button>";
					break;
				case "mdl":
				case "material-design-light":
					this.dialogs.buttons.ok = lb + "button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{" + "{ok}}" + lb +
						"/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{" +
						"{cancel}}" + lb + "/button>";
					this.dialogs.input = lb + "div class='mdl-textfield mdl-js-textfield'>" + lb + "input class='mdl-textfield__input'>" + lb +
						"label class='md-textfield__label'>" + lb + "/label>" + lb + "/div>";
					break;
				case "angular-material":
					this.dialogs.buttons.ok = lb + "button class='ok md-primary md-button' tabindex='1'>{" + "{ok}}" + lb + "/button>";
					this.dialogs.buttons.cancel = lb + "button class='cancel md-button' tabindex='2'>{" + "{cancel}}" + lb + "/button>";
					this.dialogs.input = lb + "div layout='column'>" + lb + "md-input-container md-no-float>" + lb + "input type='text'>" + lb +
						"/md-input-container>" + lb + "/div>";
					break;
				case "default":
				default:
					this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok;
					this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel;
					this.dialogs.input = this.defaultDialogs.input;
					break;
			}
		},
		reset: function() {
			this.parent = document.body;
			this.theme("default");
			this.okBtn(this.defaultOkLabel);
			this.cancelBtn(this.defaultCancelLabel); /*this.setMaxLogItems();*/
			this.promptValue = "";
			this.promptPlaceholder = "";
			this.delay = this
			.defaultDelay; /*this.setCloseLogOnClick(this.closeLogOnClickDefault);			this.setLogPosition("bottom left");			this.logTemplateMethod = null;*/
		},
		injectCSS: function() {
			if(!document.querySelector("#alertifyCSS")) {
				let head = document.getElementsByTagName("head")[0];
				let css = document.createElement("style");
				css.type = "text/css";
				css.id = "alertifyCSS";
				css.innerHTML =
					".alertify-logs > * {  padding: 12px 24px;  color: #fff;  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);  border-radius: 1px; }  .alertify-logs > *, .alertify-logs > *.default {    background: rgba(0, 0, 0, 0.8); }  .alertify-logs > *.error {    background: rgba(244, 67, 54, 0.8); }  .alertify-logs > *.success {    background: rgba(76, 175, 80, 0.9); } .alertify2 {position: fixed;  background-color: rgba(0, 0, 0, 0.3);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99998;  box-sizing: border-box;  transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1);} .alertify {  position: fixed;  background-color: rgba(0, 0, 0, 0);  left: 0;  right: 0;  top: 0;  bottom: 0;  width: 100%;  height: 100%;  z-index: 99999; }  .alertify.hide {    opacity: 0;    pointer-events: none; }  .alertify, .alertify.show {    box-sizing: border-box;    transition: all 0.33s cubic-bezier(0.25, 0.8, 0.25, 1); }  .alertify, .alertify * {    box-sizing: border-box; }  .alertify .dialog {    padding: 12px; }  .alertify .dialog, .alertify .alert {    width: 100%;	transform: translateY(-50%);    margin: 0 auto;    position: relative;    top: 50%;    transform: translateY(-50%); }    .alertify .dialog > *, .alertify .alert > * {      width: 400px;      max-width: 95%;      margin: 0 auto;      text-align: center;      padding: 12px;      background: #fff;      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.14), 0 4px 5px 0 rgba(0, 0, 0, 0.098), 0 1px 10px 0 rgba(0, 0, 0, 0.084); }    .alertify .dialog .msg, .alertify .alert .msg {      padding: 12px;      margin-bottom: 12px;      margin: 0;      text-align: left; }    .alertify .dialog input:not(.form-control), .alertify .alert input:not(.form-control) {      margin-bottom: 15px;      width: 100%;      font-size: 100%;      padding: 12px; }      .alertify .dialog input:not(.form-control):focus, .alertify .alert input:not(.form-control):focus {        outline-offset: -2px; }    .alertify .dialog nav, .alertify .alert nav {      text-align: right; }      .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button), .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button) {        background: transparent;        box-sizing: border-box;        color: rgba(0, 0, 0, 0.87);        position: relative;        outline: 0;        border: 0;        display: inline-block;        -ms-flex-align: center;            -ms-grid-row-align: center;            align-items: center;        padding: 0 6px;        margin: 6px 8px;        line-height: 36px;        min-height: 36px;        white-space: nowrap;        min-width: 88px;        text-align: center;      font-size: 14px;        text-decoration: none;        cursor: pointer;        border: 1px solid transparent;        border-radius: 2px; }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active {          background-color: rgba(0, 0, 0, 0.05); }        .alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus, .alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus {          border: 1px solid rgba(0, 0, 0, 0.1); }      .alertify .dialog nav button.btn, .alertify .alert nav button.btn {        margin: 6px 4px; }.alertify-logs {  position: fixed;  z-index: 99999; }  .alertify-logs.bottom, .alertify-logs:not(.top) {    bottom: 16px; }  .alertify-logs.left, .alertify-logs:not(.right) {    left: 16px; }    .alertify-logs.left > *, .alertify-logs:not(.right) > * {      float: left;      transform: translate3d(0, 0, 0);      height: auto; }      .alertify-logs.left > *.show, .alertify-logs:not(.right) > *.show {        left: 0; }      .alertify-logs.left > *, .alertify-logs.left > *.hide, .alertify-logs:not(.right) > *, .alertify-logs:not(.right) > *.hide {        left: -110%; }  .alertify-logs.right {    right: 16px; }    .alertify-logs.right > * {      float: right;      transform: translate3d(0, 0, 0); }      .alertify-logs.right > *.show {        right: 0;        opacity: 1; }      .alertify-logs.right > *, .alertify-logs.right > *.hide {        right: -110%;        opacity: 0; }  .alertify-logs.top {    top: 0; }  .alertify-logs > * {    box-sizing: border-box;    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);    position: relative;    clear: both;    backface-visibility: hidden;    perspective: 1000; }    .alertify-logs > * {      max-height: 0;      margin: 0;      padding: 0;      overflow: hidden;      opacity: 0;      pointer-events: none; }    .alertify-logs > *.show {      margin-top: 12px;      opacity: 1;      max-height: 1000px;      padding: 12px;      pointer-events: auto; }";
				head.insertBefore(css, head.firstChild);
			}
		},
		removeCSS: function() {
			let css = document.querySelector("#alertifyCSS");
			if(css && css.parentNode) {
				css.parentNode.removeChild(css);
			}
		}
	};
	_alertify.injectCSS();
	return {
		_$$alertify: _alertify,
		parent: function(elem) {
			_alertify.parent = elem;
		},
		reset: function() {
			_alertify.reset();
			return this;
		},
		alert: function(message, onOkay, onCancel) {
			return _alertify.dialog(message, "alert", onOkay, onCancel) || this;
		},
		confirm: function(message, onOkay, onCancel) {
			return _alertify.dialog(message, "confirm", onOkay, onCancel) || this;
		},
		prompt: function(message, onOkay, onCancel) {
			return _alertify.dialog(message, "prompt", onOkay, onCancel) || this;
		},
		promptButton: function(message, illegal, onCancel) {
			return _alertify.dialog(message, "promptButton", illegal, onCancel) || this;
		},
		log: function(message, click) {
			_alertify.log(message, "default", click);
			return this;
		},
		theme: function(themeStr) {
			_alertify.theme(themeStr);
			return this;
		},
		success: function(message, click) {
			_alertify.log(message, "success", click);
			return this;
		},
		error: function(message, click) {
			_alertify.log(message, "error", click);
			return this;
		},
		cancelBtn: function(label) {
			_alertify.cancelBtn(label);
			return this;
		},
		okBtn: function(label) {
			_alertify.okBtn(label);
			return this;
		},
		delay: function(time) {
			_alertify.setDelay(time);
			return this;
		},
		placeholder: function(str) {
			_alertify.promptPlaceholder = str;
			return this;
		},
		defaultValue: function(str) {
			_alertify.promptValue = str;
			return this;
		},
		maxLogItems: function(num) {
			_alertify.setMaxLogItems(num);
			return this;
		},
		closeLogOnClick: function(bool) {
			_alertify.setCloseLogOnClick(!!bool);
			return this;
		},
		logPosition: function(str) {
			_alertify.setLogPosition(str || "");
			return this;
		},
		setLogTemplate: function(templateMethod) {
			_alertify.logTemplateMethod = templateMethod;
			return this;
		},
		clearLogs: function() {
			_alertify.setupLogContainer().innerHTML = "";
			return this;
		},
		version: _alertify.version
	};
} /* alertify: AMD, window, and NPM support */
if("undefined" !== typeof module && !!module && !!module.exports) {
	/* alertify: Preserve backwards compatibility */
	module.exports = function() {
		return new Alertify();
	};
	let obj = new Alertify();
	for(let key in obj) {
		module.exports[key] = obj[key];
	}
} else if(typeof define === "function" && define.amd) {
	define(function() {
		return new Alertify();
	});
} else {
	window.alertify = new Alertify();
} /**** END ALERTIFY ****/
var alertifyBackground = document.createElement("div");
alertifyBackground.className = "alertify2 hide";
document.body.appendChild(alertifyBackground);
setTimeout(function() {
	alertifyBackground.classList.remove("hide");
}, 100);
var alertQueue = [];
var queuedPrompt = [];

function alertQueueShift(arg) {
	if(arg) {
		arg.event.preventDefault();
	}
	alertQueue.shift();
	if(alertQueue.length > 0) {
		if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
			alert(alertQueue[0]);
			alertQueueShift();
		} else {
			alertify.cancelBtn("CANCEL").okBtn("OK");
			alertify.alert(alertQueue[0]).then(alertQueueShift);
		}
	} else if(queuedPrompt.length > 0) {
		let promptType = queuedPrompt[0];
		switch (promptType) {
			case "promptNum": {
				let promptText = queuedPrompt[1];
				let illegal = queuedPrompt[2];
				let cancel = queuedPrompt[3];
				let user = queuedPrompt[4];
				let newCancel = queuedPrompt[5];
				queuedPrompt = [];
				promptNum(promptText, illegal, cancel, user, newCancel);
				break;
			}
			case "confirm": {
				let confirmText = queuedPrompt[1];
				let cancel = queuedPrompt[2];
				let user = queuedPrompt[3];
				let newOK = queuedPrompt[4];
				let newCancel = queuedPrompt[5];
				queuedPrompt = [];
				confirmify(confirmText, cancel, user, newOK, newCancel);
				break;
			}
			case "promptString": {
				let promptText = queuedPrompt[1];
				let cancel = queuedPrompt[2];
				let user = queuedPrompt[3];
				let defaultText = queuedPrompt[4];
				queuedPrompt = [];
				promptString(promptText, cancel, user, defaultText);
				break;
			}
			case "mainMenu": {
				queuedPrompt = [];
				mainMenu();
			}
		}
	}
}

function addAlert(alertText,v,g) {
	alertText = lc(alertText,v,g);
	if(me >= 0 && z.numPlayers > me && z.promptStyle[me] !== 0) {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		alertText = alertText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		alertText = alertText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		alertText = alertText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
	}
	alertQueue.push(alertText);
	if(alertQueue.length === 1) {
		if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
			alert(alertText);
			alertQueueShift();
		} else {
			alertify.cancelBtn("CANCEL").okBtn("OK");
			alertify.alert(alertText).then(alertQueueShift);
		}
	}
}

function confirmify(confirmText, cancel, user, newOK, newCancel) {
	if(queuedPrompt.length > 0) {
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0) {
		queuedPrompt = ["confirm", confirmText, cancel, user, newOK, newCancel];
	} else if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
		let ok = confirm(confirmText);
		if(ok) {
			user();
		} else {
			cancel();
		}
	} else {
		confirmText = lc(confirmText);
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		confirmText = confirmText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		confirmText = confirmText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		confirmText = confirmText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
		if(!newOK) {
			newOK = "OK";
		}
		if(!newCancel) {
			newCancel = "CANCEL";
		}
		alertify.okBtn(newOK).cancelBtn(newCancel).confirm(confirmText).then(function(arg) {
			arg.event.preventDefault();
			if(arg.buttonClicked == "cancel") {
				cancel();
			} else {
				user();
			}
		});
	}
}

function tooManyOptions(illegal) {
	let legalCount = 0;
	for(let j = 0; !(j > 20); j++) {
		if(!illegal(j)) {
			legalCount++;
		}
	}
	return legalCount > 13;
} /* TODO: var waiting, var quit */
function promptNum(promptText, illegal, cancel, user, newCancel) {
	if(queuedPrompt.length > 0) {
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0) {
		queuedPrompt = ["promptNum", promptText, illegal, cancel, user, newCancel];
	} else if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
		let prompted = prompt(promptText);
		if(prompted === null) {
			cancel();
		} else {
			let n = parseInt(prompted);
			if(isNaN(n) || illegal(n)) {
				promptNum(promptText, illegal, cancel, user);
			} else {
				user(n);
			}
		}
	} else {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		promptText = promptText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		promptText = promptText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		promptText = promptText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
		if(!newCancel) {
			newCancel = "CANCEL";
		}
		alertify.cancelBtn(newCancel).okBtn("OK");
		if(0 > me || me >= z.numPlayers || (!mobile && z.promptStyle[me] === 1) || z.promptStyle[me] === 3 || tooManyOptions(illegal)) {
			alertify.prompt(promptText).then((arg) => {
				arg.event.preventDefault();
				let n = parseInt(arg.inputValue);
				if(arg.buttonClicked === "cancel" || arg.inputValue === null) {
					if(newCancel !== undefined && !isNaN(n) && !illegal(n)) {
						confirmify('Are you sure you want to quit?  Whatever option you had typed in the dialog box when you pressed "' + newCancel +
							'" will not be processed.', mainMenu, cancel, "Yes, Quit", "No, Go Back");
					} else {
						cancel();
					}
				} else {
					if(isNaN(n) || illegal(n)) {
						promptNum(promptText, illegal, cancel, user, newCancel);
					} else {
						user(n);
					}
				}
			});
		} else {
			alertify.promptButton(promptText, illegal).then((arg) => {
				arg.event.preventDefault();
				if(arg.buttonClicked === "cancel") {
					cancel();
				} else {
					user(parseInt(/^choice(\d+)$/.exec(arg.buttonClicked)[1]));
				}
			});
		}
	}
} /* empty strings now count as cancel */
function promptString(promptText, cancel, user, defaultText) {
	if(queuedPrompt.length > 0) {
		alert("Error! Cannot queue multiple prompts");
	} else if(alertQueue.length > 0) {
		queuedPrompt = ["promptString", promptText, cancel, user, defaultText];
	} else if(me >= 0 && z.numPlayers > me && z.promptStyle[me] === 0) {
		let prompted = prompt(promptText);
		if(prompted === null || prompted === "") {
			cancel();
		} else {
			user(prompted);
		}
	} else {
		let colorRE = new RegExp('\\[col' + 'or=([^\\]]+)\\]([^[]*)\\[/col' + 'or\\]', "g");
		let boldRE = new RegExp('\\[b' + '\\]([^[]*)\\[/' + 'b\\]', "g");
		let strikethroughRE = new RegExp('\\[-' + '\\]([^[]*)\\[/' + '-\\]', "g");
		promptText = promptText.replace(colorRE, lb + 'span style="color:$1;">$2' + lb + '/span>');
		promptText = promptText.replace(boldRE, lb + 'b>$1' + lb + '/b>');
		promptText = promptText.replace(strikethroughRE, lb + 'strike>$1' + lb + '/strike>');
		if(!defaultText) {
			defaultText = "";
		}
		alertify.cancelBtn("CANCEL").okBtn("OK");
		alertify.defaultValue(defaultText).prompt(promptText).then((arg) => {
			arg.event.preventDefault();
			if(arg.buttonClicked == "cancel" || arg.inputValue === null || arg.inputValue === "") {
				alertify.defaultValue("");
				cancel();
			} else {
				alertify.defaultValue("");
				user(arg.inputValue);
			}
		});
	}
}

function error(str) {
	alert(str);
} /* TODO: better in-mod notification that you're in DE range. */

const aLCG = 1664525;
const cLCG = 1013904223;
const mLCG = 0x100000000;

function updateSeed(){
	z.seed = (aLCG * z.seed + cLCG) % mLCG;
}

function shuffle(array) {
	for(let i = array.length; i > 0; i--) {
		let rando = Math.floor((z.seed * i)/ mLCG);
		updateSeed();
		let removed = array.splice(rando, 1)[0];
		array.push(removed);
	}
	return array;
}

function colorText(color, text) {
	return "[col" + "or=" + color + "]" + text + "[/col" +  "or]";
}

function size(text, pt) {
	return "[siz" +  "e=" + pt + "]" + text + "[/s" +  "ize]";
}

function bold(text) {
	return "[b" +"]" + text + "[/" +  "b]";
}

function spoiler(text) {
	return "[o" + "]" + text + "[/" +  "o]";
}

function invisible(str) {
	/* F4F4FF */
	return "[color=" +  "#FFFFFF]" + str + "[/" +  "color]";
}

function code(text) {
	return "[c"+"]"+text+"[/"+"c]";
}

function strikethrough(text) {
	return "[-" +  "]" + text + "[/" +  "-]";
}

function italics(text) {
	return "[i" +  "]" + text + "[/" +  "i]";
}

function floatleft(text) {
	return "[float" +  "left]" + text + "[/float" +  "left]";
}

function center(text) {
	return "[cent" +  "er]" + text + "[/cent" +  "er]";
}

function clear() {
	return "[cle" + "ar]";
}

const X = 0;
const F = 1;
const M = 2;
const RESERVES = 0;
const DEEP = 1;
const WATER = 2;
const DECK = 10;
const BRIDGE = 18;
const INTERIOR = BRIDGE;
const CHAPEL = 19;
const CAPTAINS_CABIN = 20;
const CARGO_HOLD = 21;
const GALLEY = 22;
const BOILER_ROOM = 23;
const SICK_BAY = 24;
const BRIG = 25;

const DROWNED_SPIRIT = 0;
const GRASPING_TENDRIL = 1;
const SHOGGOTH = 2;
const OMINOUS_VISIONS = 3;

/* UTODO: change gender with localization (e.g. BSG reskin)*/
function getGender(index){
	switch(z.players[index]){
		case "Keilani":
		case "Svetlana":
		case "Jeanne":
		case "Beatrice":
		case "Samira":
		case "Ida":
		case "Kokoj":
		case "Sardaana":
		case "Mui Choo":
			return F;
		case "Arjun":
		case "William":
		case "Ishmael":
		case "Edmund":
		case "Antar":
		case "Avery":
		case "Guillaume":
		case "Raúl":
			return M;
		case "Jamie":
		default:
			return X;
	}
}

/* UTODO: this and lc */
function colorIDName(colorID) {
	switch (colorID) {
		case 0:
			return lc(colorText("orange", "Influence"));
		case 1:
			return lc(colorText("purple", "Lore"));
		case 2:
			return lc(colorText("green", "Observation"));
		case 3:
			return lc(colorText("red", "Strength"));
		case 4:
			return lc(colorText("blue", "Will"));
		case 5:
			return lc(colorText("brown", "Treachery"));
		case BOON:
			return lc(colorText("teal", "Boon"));
		default:
			return "Invalid Color ID";
	}
}

/* UTODO: incoporate localization (including of colored words) in these */

function plainAlert(text,params,g) {
	addAlert(text,params,g);
	/* UTODO: localization of these */
	t.value += lc(text,params,g).replace(/Keeper(?![a-zA-Z'])/g, colorText("orange", "Keeper")).replace(/Captain(?![a-zA-Z'])/g, colorText("green", "Captain"))
		.replace(/Influence/g, colorText("orange", "Influence")).replace(/Observation/g, colorText("green", "Observation"))
		.replace(/Lore/g, colorText("purple", "Lore")).replace(/Strength/g, colorText("red", "Strength")).replace(/Will(?!i)/g, colorText("blue",
			"Will")).replace(/Treachery/g, colorText("brown", "Treachery")).replace(/Boon/g, colorText("teal", "Boon")) + "\r\n";
}

function boldAlert(text,params,g) {
	addAlert(text,params,g);
	t.value += bold(lc(text,params,g).replace(/Keeper(?![a-zA-Z'])/g, colorText("orange", "Keeper")).replace(/Captain(?![a-zA-Z'])/g, colorText("green", "Captain"))
		.replace(/Influence/g, colorText("orange", "Influence")).replace(/Observation/g, colorText("green", "Observation"))
		.replace(/Lore/g, colorText("purple", "Lore")).replace(/Strength/g, colorText("red", "Strength")).replace(/Will(?!i)/g, colorText("blue",
			"Will")).replace(/Treachery/g, colorText("brown", "Treachery"))).replace(/Boon/g, colorText("teal", "Boon")) + "\r\n";
}

function clearSpoilers() {
	let ore = new RegExp('\\[o\\][\\s\\S]*\\[/o\\]', "g");
	t.value = t.value.replace(ore, "").replace(ore, ""); /* TODO: check this */
}

function clearQuotes() {
	let qre0 = new RegExp('\\[q="(?!TMR)((?!(\\[q[\\]=]|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	let qre1 = new RegExp('\\[q="(?!TMR)(((?!(\\[q[\\]=]|\\[/q\\]))[\\s\\S])*\\[q[\\]=]((?!(\\[q=|\\[/q\\]))[\\s\\S])*\\[/q\\]((?!(\\[q[\\]=]|\\[/q\\]))[\\s\\S])*)*\\[/q\\]',
		"g");
	t.value = t.value.replace(qre0, "").replace(qre1, "").replace(qre0, "").replace(qre1, "");
}

function colorIDAlert(colorID) {
	switch (colorID) {
		case 0:
			return "Influence";
		case 1:
			return "Lore";
		case 2:
			return "Observation";
		case 3:
			return "Strength";
		case 4:
			return "Will";
		case 5:
			return "Treachery";
		case 6:
			return "Boon";
		default:
			return "Invalid Color ID";
	}
}

function colorIDcolor(colorID) {
	switch (colorID) {
		case 0:
			return "orange";
		case 1:
			return "purple";
		case 2:
			return "green";
		case 3:
			return "red";
		case 4:
			return "blue";
		case 5:
			return "brown";
		case 6:
			return "teal";
		default:
			return "black";
	}
}

const INFLUENCE = 0;
const LORE = 1;
const OBSERVATION = 2;
const STRENGTH = 3;
const WILL = 4;
const TREACHERY = 5;
const BOON = 6;

function cardColorID(id) {
	if(id >= 147){
		id -= 147;
		return Math.floor(id / 2);
	}
	return Math.floor(id / 21);
}

function cardColor(id) {
	return colorIDcolor(cardColorID(id));
}

function cardValue(id) {
	if(id >= 147){
		id -= 147;
		return (id % 2) * 6;
	}
	let mod = id % 21;
	if(mod >= 19){
		return 5;
	} else if(mod >= 16) {
		return 4;
	} else if(mod >= 12) {
		return 3;
	} else if(mod >= 7) {
		return 2;
	} else {
		return 1;
	}
}
const ZERO_STRENGTH = 147;
const DIRECT = 0;
const OUST = 2;
const INSPIRATION = 4;
const RUMBLE = 6;
const EVACUATION = 8;
const TURMOIL = 10;
const REVELATION = 12;


function cardName(id) {
	if(id >= 147) {
		id -= 147;
		switch (id){
			case DIRECT:
				return "Direct";
			case 1:
				return "Inspiring Speech";
			case OUST:
				return "Oust";
			case 3:
				return "Forced Learning";
			case INSPIRATION:
				return "Inspiration";
			case 5:
				return "Preparation";
			case RUMBLE:
				return "Rumble";
			case 7:
				return "Shrug It Off";
			case EVACUATION:
				return "Evacuation";
			case 9:
				return "True Grit";
			case TURMOIL:
				return "Turmoil";
			case 11:
				return "Summon";
			case REVELATION:
				return "Revelation";
			case 13:
				return "Providence";
		}
	}
	let mod = id % 21;
	switch (cardColorID(id)) {
		case BOON:
			if(mod >= 19){
				return "Providence";
			} else if(mod >= 12) {
				return "Ingenuity";
			} else {
				return "Companion";
			}
		case TREACHERY:
			if(mod >= 19){
				return "Perform Rites";
			} else if(mod >= 16) {
				return "Ransack";
			} else if(mod >= 12) {
				return "Siren Song";
			} else if(mod >= 7) {
				return "Call to Action";
			} else {
				return "Reinforcements";
			}
		case WILL:
			if(mod >= 19){
				return "True Grit";
			} else if(mod >= 12) {
				return "Determination";
			} else {
				return "Persistence";
			}
		case STRENGTH:
			if(mod >= 19){
				return "Shrug It Off";
			} else if(mod >= 12) {
				return "Rampage";
			} else {
				return "Combat Training";
			}
		case OBSERVATION:
			if(mod >= 19){
				return "Preparation";
			} else if(mod >= 12) {
				return "Keen Insight";
			} else {
				return "Watch and Learn";
			}
		case LORE:
			if(mod >= 19){
				return "Forced Learning";
			} else if(mod >= 12) {
				return "Lesser Banishment";  
			} else {
				return "Shrivelling";
			}
		case INFLUENCE:
			if(mod >= 19){
				return "Inspiring Speech";
			} else if(mod >= 12) {
				return "Nothing to Hide";
			} else {
				return "Coordinated Effort";
			}
	}
}

function cardText(id) {
	return colorText(cardColor(id), cardValue(id) + " - " + lc(cardName(id)));
}

function reshuffleSkillCardDeck(colorID) {
	if(z.skillCardDecks[colorID].length === 0) {
		z.skillCardDecks[colorID] = z.skillCardDiscards[colorID];
		shuffle(z.skillCardDecks[colorID]);
		println("DECK_RESHUFFLE",colorIDName(colorID));
		z.skillCardDiscards[colorID] = [];
		if(z.spreadingRumors){
			z.spreadingRumorsDecks[colorID] = 0;
			let any = false;
			for(let j = 0; !(j>=z.spreadingRumorsDecks.length); j++){
				if(z.spreadingRumorsDecks[j] === 1){
					any = true;
					break;
				}
			}
			if(!any){
				delete z.spreadingRumors;
				delete z.spreadingRumorsDecks;
			}
		}
	}
}

function drawFromDeck(colorID) {
	if(z.skillCardDecks[colorID].length === 0){
		reshuffleSkillCardDeck(colorID);
	}
	let card = z.skillCardDecks[colorID].pop();
	reshuffleSkillCardDeck(colorID); /* will return undefined if empty */
	return card;
}

function buildChaos() {
	println("CHAOS_REBUILT");
	if(z.chaos.length !== 0) {
		addAlert("Cannot rebuild Chaos; Chaos not empty.");
		return 0;
	}
	for(let colorID = 0; !(colorID >= 5); colorID++) {
		if(2 > z.skillCardDecks[colorID].length + z.skillCardDiscards[colorID].length){
			println("SHORT_CHAOS_ALERT",colorIDName(colorID));
		} else {
			for(let i = 2; i > 0; i--) {
				let card = drawFromDeck(colorID);
				z.chaos.push(card);
			}
		}
	}
	if(z.fromTheAbyss){
		for(let colorID = 5; !(colorID >= 7); colorID++) {
			if(2 > z.skillCardDecks[colorID].length + z.skillCardDiscards[colorID].length){
				println("SHORT_CHAOS_ALERT",colorIDName(colorID));
			} else {
				for(let i = 2; i > 0; i--) {
					let card = drawFromDeck(colorID);
					z.chaos.push(card);
				}
			}
		}
	}
	shuffle(z.chaos);
}

function decreaseFood(num) {
	if(num === undefined){
		num = 1;
	}
	/* URULES: more providence than loss */
	if(z.providence >= num){
		delete z.providence;
		boldAlert("PROVIDENCE_FULL","Food");
		return true;
	} else if( num > z.providence){
		delete z.providence;
		boldAlert("PROVIDENCE_PARTIAL","Food",z.providence);
		num -= z.providence;
	}
	z.food -= num;
	if(0 > z.food){
		z.food = 0;
	}
	boldAlert("RESOURCE_DROP",["Food",num,z.food]);
	if(z.food === 0){
		endGame(false);
		return false;
	}
	return true;
}

function increaseFood() {
	if(z.food === 10) {
		plainAlert("RESOURCE_CANNOT_INCREASE","Food");
		return true;
	} else {
		z.food++;
		boldAlert("RESOURCE_INCREASE",["Food",z.food]);
		return true;
	}
}


function decreaseFuel(num) {
	if(num === undefined){
		num = 1;
	}
	if(z.providence >= num){
		delete z.providence;
		boldAlert("PROVIDENCE_FULL","Fuel");
		return true;
	} else if(num > z.providence){
		delete z.providence;
		boldAlert("PROVIDENCE_PARTIAL","Fuel",z.providence);
		num -= z.providence;
	}
	z.fuel -= num;
	if(0 > z.fuel){
		z.fuel = 0;
	}
	boldAlert("RESOURCE_DROP",["Fuel",num,z.fuel]);
	if(z.fuel === 0){
		endGame(false);
		return false;
	}
	return true;
}


function increaseFuel() {
	if(z.fuel === 10) {
		plainAlert("RESOURCE_CANNOT_INCREASE","Fuel");
		return true;
	} else {
		z.fuel++;
		boldAlert("RESOURCE_INCREASE",["Fuel",z.fuel]);
		return true;
	}
}


function decreaseSanity(num) {
	if(num === undefined){
		num = 1;
	}
	if(z.providence >= num){
		delete z.providence;
		boldAlert("PROVIDENCE_FULL","Sanity");
		return true;
	} else if(num > z.providence){
		delete z.providence;
		boldAlert("PROVIDENCE_PARTIAL","Sanity",z.providence);
		num -= z.providence;
	}
	z.sanity -= num;
	if(0 > z.sanity){
		z.sanity = 0;
	}
	boldAlert("RESOURCE_DROP",["Sanity",num,z.sanity]);
	if(z.sanity === 0){
		endGame(false);
		return false;
	}
	return true;
	
}

function increaseSanity() {
	if(z.sanity === 10) {
		plainAlert("RESOURCE_CANNOT_INCREASE","Sanity");
		return true;
	} else {
		z.sanity++;
		boldAlert("RESOURCE_INCREASE",["Sanity",z.sanity]);
		return true;
	}
}

 /* TODO: think about multiple contexts (should be rare) */
function addOption(player, opt, con, man) {
	for(let j = 0; !(j >= z.mythosOptions[player].length); j++) {
		if(z.mythosOptions[player][j] === opt) {
			z.context[player][j] = con;
			z.mandatory[player][j] = man;
			return false;
		}
	}
	z.mythosOptions[player].push(opt);
	z.context[player].push(con);
	z.mandatory[player].push(man);
}

function removeOption(player, opt) {
	for(let j = 0; !(j >= z.mythosOptions[player].length); j++) {
		if(z.mythosOptions[player][j] === opt) {
			z.mythosOptions[player].splice(j, 1);
			z.context[player].splice(j, 1);
			z.mandatory[player].splice(j, 1);
			j--;
		}
	}
}

function hasOption(player, opt) {
	for(let j = 0; !(j >= z.mythosOptions[player].length); j++) {
		if(z.mythosOptions[player][j] === opt) {
			return true;
		}
	}
	return false;
}

function getContext(player, opt) {
	for(let j = 0; !(j >= z.mythosOptions[player].length); j++) {
		if(z.mythosOptions[player][j] === opt) {
			return z.context[player][j];
		}
	}
	return undefined;
}

function isMandatory(player, opt) {
	for(let j = 0; !(j >= z.mythosOptions[player].length); j++) {
		if(z.mythosOptions[player][j] === opt) {
			return z.mandatory[player][j];
		}
	}
	return false;
}

function anyMandatory() {
	let mandatories = [];
	for(let j = 0; !(j >= z.numPlayers); j++) {
		for(let k = 0; !(k >= z.mythosOptions[j].length); k++) {
			if(z.mandatory[j][k]) {
				mandatories.push([j, z.mythosOptions[j][k]]);
			}
		}
	}
	return mandatories;
}

function decreaseSouls(num) {
	if(num === undefined){
		num = 1;
	}
	if(z.providence >= num){
		delete z.providence;
		boldAlert("PROVIDENCE_FULL","Souls");
		return true;
	} else if(num > z.providence){
		delete z.providence;
		boldAlert("PROVIDENCE_PARTIAL","Souls",z.providence);
		num -= z.providence;
	}
	z.souls -= num;
	if(0 > z.souls){
		z.souls = 0;
	}

	boldAlert("RESOURCE_DROP",["Souls",num,z.souls]);
	if(z.souls === 0){
		endGame(false);
		return false;
	}
	return true;
}

function increaseSouls() {
	if(z.souls === 10) {
		plainAlert("RESOURCE_CANNOT_INCREASE","Souls");
		return true;
	} else {
		z.souls++;
		boldAlert("RESOURCE_INCREASE",["Souls",z.souls]);
		return true;
	}
}

function primeJumpIcon() {
	if(z.currentMythos !== null) {
		/* UTODO: automatically prompt end of turn discards */
		if(d.trackIcon[z.currentMythos] === "T"){
			if(canAnyoneFeast()){
				plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
				addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Travel",true);
				optionForAll("Advance the Travel Track","Icon",true);
			} else if(advanceTravel()){
				primeHorrorIcon();
			} else {
				z.extraTravel = "Jump Icon";
			}
		} else if(d.trackIcon[z.currentMythos] === "R") {
			if(canAnyoneFeast()){
				plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
				addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Ritual",true);
				optionForAll("Advance the Ritual Track","Icon",true);
			} else if(advanceRitual()){
				primeHorrorIcon();
			} else {
				z.extraRitual = "Jump Icon";
			}
		} else if(d.trackIcon[z.currentMythos] === "C") {
			let chooser = z.turn;
			if(z.playerLocations[chooser] === "Brig"){
				chooser = z.captain;
			}
			boldAlert("CHOICE_ICON",z.players[chooser]);
			addOption(chooser,"Advance the Travel Track","Icon",true);
			addOption(chooser,"Advance the Ritual Track","Icon",true);
			if(canAnyoneFeast()){
				plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
				addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Choice",true);
			}
		}
	}
}

function doneWithRitual(noPrompt){
	
	if(z.temporalDiscovery !== undefined && !noPrompt){
		boldAlert("TEMPORAL_DISCOVERY_TRAVEL_ALERT",z.players[z.temporalDiscovery]);
		addOption(z.temporalDiscovery,"Advance the Travel Track","Temporal Discovery",true);
		addOption(z.temporalDiscovery,"Don't advance the Travel Track",undefined,true);
		return;
	}
	
	if(Array.isArray(z.extraRitual) && z.extraRitual[0] === "Temporal Discovery"){
		z.extraRitual = z.extraRitual[1];
		SPTokenBad("Temporal Discovery","Ritual");
		return;
	}
	
	if(z.extraRitual === "Jump Icon"){
		delete z.extraRitual;
		primeHorrorIcon();
	} else if (z.extraRitual === "Price of Power"){
		let player = z.keeper;
		if(z.spreadMisfortune){
			player = getPlayerNum("Edmund");
		}
		discardEntireHand(player);
		if(defeat(player,"Price of Power")){
			doneWithChoiceMythos();
		}
	} else if(z.extraRitual === "Greater Banishment 1"){
		delete z.extraRitual;
		if(advanceRitual()){
			SPTokenBad("Greater Banishment");
		} else {
			z.extraRitual = "Greater Banishment 0";
		}
	} else if(z.extraRitual === "Greater Banishment 0"){
		delete z.extraRitual;
		SPTokenBad("Greater Banishment");
	} else if(z.extraRitual === "Chapel"){
		delete z.extraRitual;
		finishedAction();
	} else if(z.extraRitual === "Ritual Support"){
		delete z.extraRitual;
		doneWithChoiceMythos();
	} else if(z.extraRitual === "Sacrifice Deep One 1"){
		delete z.extraRitual;
		if(advanceRitual()){
			finishedAction();
		} else {
			z.extraRitual = "Sacrifice Deep One 0";
		}
	} else if(z.extraRitual === "Sacrifice Deep One 0"){
		delete z.extraRitual;
		finishedAction();
	} else if(z.extraRitual === "Disrupt Ritual 1"){
		delete z.extraRitual;
		if(advanceRitual()){
			doneWithRevealEffect(getPlayerNum("William"));
		} else {
			z.extraRitual = "Disrupt Ritual 0";
		}
	} else if(z.extraRitual === "Disrupt Ritual 0"){
		delete z.extraRitual;
		doneWithRevealEffect(getPlayerNum("William"));
	} else if(z.extraRitual === "Mythos"){
		delete z.extraRitual;
		clearSkillCheck();
	} else if(z.extraRitual === "Respite"){
		z.finishedMythos = true;
	} else {
		let done = true;
		while(z.extraRitual && done){
			done = advanceRitual();
			z.extraRitual--;
		}
		if(done){
			delete z.extraRitual;
			clearSkillCheck();
		}
	}
}

function primeHorrorIcon(){
	if(z.currentMythos !== null && d.horror[z.currentMythos] === 1){
		activateHorror("Icon");
	}
}

function activateHorror(context,skip){
	if(skip && context === "Interrupt"){
		context = z.horrorContext;
	}
	z.horrorContext = context;
	if(!skip && canInterruptActivation() && (z.shoggoth || z.graspingTendril || z.drownedSpirit)){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier","Horror",true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Horror",true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]","Horror",true);
		}
		optionForAll("Activate Horror Icon","Interrupt",true);
		return false;
	} else if(!skip && canAnyoneFeast()){
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Horror",true);
			optionForAll("Activate Horror Icon","Interrupt",true);
		}
		return false;
	}
	if(z.horror === 0){
		z.horror++;
		plainAlert("HORROR_TO_MIDDLE");
		doneWithHorror();
		return true;
	} else if (z.horror === 1){
		z.horror = -1;
		boldAlert("HORROR_TO_SPAWN");
		let horror = z.horrorDeck.pop();
		if(horror === OMINOUS_VISIONS){
			plainAlert("OMINOUS_VISIONS");
			z.horrorDeck.unshift(horror);
			if(z.turn === z.cursedWhispers){
				SPTokenBad("Cursed Whispers","Ominous Visions");
				return false;
			} else {
				dealSkillCard(z.turn,BOON);
				dealSkillCard(z.turn,TREACHERY);
				horror = z.horrorDeck.pop();
			}
		}
		z.horrorDeck.push(horror);
		shuffle(z.horrorDeck);
		if(horror === SHOGGOTH){
			if(activateShoggoth("Horror")){
				doneWithHorror();
				return true;
			}
		} else if(horror === DROWNED_SPIRIT){
			if(activateDrownedSpirit("Horror")){
				doneWithHorror();
				return true;
			}
		} else {
			if(activateGraspingTendril("Horror")){
				doneWithHorror();
				return true;
			}
		}
	} else {
		if(z.shoggoth !== RESERVES && z.drownedSpirit === RESERVES && z.graspingTendril === RESERVES){
			if(activateShoggoth("Horror",true)){
				doneWithHorror();
				return true;
			}
		} else if(z.shoggoth === RESERVES && z.drownedSpirit !== RESERVES && z.graspingTendril === RESERVES){
			if(activateDrownedSpirit("Horror",true)){
				doneWithHorror();
				return true;
			}
		} else if(z.shoggoth === RESERVES && z.drownedSpirit === RESERVES && z.graspingTendril !== RESERVES){
			if(activateGraspingTendril("Horror",true)){
				doneWithHorror();
				return true;
			}
		} else {
			while(true){
				let horror = z.horrorDeck.pop();
				if(horror === SHOGGOTH && z.shoggoth !== RESERVES){
					z.horrorDeck = [0,1,2,3];
					shuffle(z.horrorDeck);
					if(activateShoggoth("Horror",true)){
						doneWithHorror();
						return true;
					}
					break;
				} else if(horror === DROWNED_SPIRIT && z.drownedSpirit !== RESERVES){
					z.horrorDeck = [0,1,2,3];
					shuffle(z.horrorDeck);
					if(activateDrownedSpirit("Horror",true)){
						doneWithHorror();
						return true;
					}
					break;
				} else if(horror === GRASPING_TENDRIL && z.graspingTendril !== RESERVES){
					z.horrorDeck = [0,1,2,3];
					shuffle(z.horrorDeck);
					if(activateGraspingTendril("Horror",true)){
						doneWithHorror();
						return true;
					}
					break;
				}
			}
		}
	}
	return false;
}

function doneWithHorror(){
	let context = z.horrorContext;
	delete z.horrorContext;
	switch(context){
		case "Mysterious Rune":
			doneWithChoiceMythos();
			break;
		case "Ominous Feeling":
			clearSkillCheck();
			break;
	}
}

function doneWithShoggoth(){
	let context = z.shoggothContext;
	delete z.shoggothContext;
	switch(context){
		case "All It Can Eat 1":
			if(!activateShoggoth("All It Can Eat 2")){
				break;
			}
			/* falls through */
		case "All It Can Eat 2":
		case "Shoggoth (OR)":
			doneWithChoiceMythos();
			break;
		case "Monstrous Pursuit":
		case "Parasite":
		case "Shoggoth (fail)":
			clearSkillCheck();
			break;
		case "Underestimated 1":
			if(!activateShoggoth("Underestimated 2")){
				break;
			}
			/* falls through */
		case "Underestimated 2":
			if(!activateShoggoth("Underestimated 3")){
				break;
			}
			/* falls through */
		case "Underestimated 3":
			doneWithChoiceMythos();
			break;
		case "Heed the Mask 1":
			if(!activateShoggoth("Heed the Mask 2")){
				break;
			}
			/* falls through */
		case "Heed the Mask 2":
			doneWithRevealEffect(getPlayerNum("Kokoj"));
			break;
		case "Sea Foam":
			doneWithWaypoint();
			break;
		case "Horror":
			doneWithHorror();
			break;
		case "Summon":
			finishedAction();
			break;
	}
}

function doneWithDrownedSpirit(){
	let context = z.drownedSpiritContext;
	delete z.drownedSpiritContext;
	switch(context){
		case "Summon":
			finishedAction();
			break;
		case "Ghostly Locket 1":
		case "Exorcism 1":
			if(!activateDrownedSpirit("Ghostly Locket 2")){
				break;
			}
			/* falls through */
		case "Exorcism 2":
		case "Ghostly Locket 2":
		case "Dabbling in the Occult":
		case "Eerie Moaning":
		case "Last Rites":
			clearSkillCheck();
			break;
		case "Ghostly Locket (OR)":
			doneWithChoiceMythos();
			break;
		case "Horror":
			doneWithHorror();
			break;
		case "Storm of Spirits":
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			break;
		case "Call the Dead 1":
			if(!activateDrownedSpirit("Call the Dead 2")){
				break;
			}
			/* falls through */
		case "Call the Dead 2":
			doneWithRevealEffect(getPlayerNum("Guillaume"));
			break;
		case "Ship Graveyard":
			doneWithWaypoint();
			break;
	}
}

function activateShoggoth(context,skip){
	if(skip && context === "Interrupt"){
		context = z.shoggothContext;
	}
	if(!skip && canInterruptActivation()){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier","Shoggoth",true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Shoggoth",true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]","Shoggoth",true);
		}
		optionForAll("Activate the Shoggoth","Interrupt",true);
		z.shoggothContext = context;
		return false;
	}
	if(z.shoggoth === RESERVES){
		boldAlert("SHOGGOTH_SPAWNS");
		NoSPToken("Shoggoth Placement",context);
		return false;
	} else {
		let targets = [];
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(!z.revealedHybrids[j] && z.playerLocations[j] === d.spaceNames[z.shoggoth]){
				targets.push(z.players[j]);
			}
		}
		if(targets.length > 1){
			boldAlert("SHOGGOTH_MULTIPLE_HUMANS",[z.players[z.turn],d.spaceNames[z.shoggoth]]);
			addOption(z.turn,"Choose the next Shoggoth target",targets,true);
			z.shoggothContext = context;
			return false;
		} else if(targets.length === 1){
			plainAlert("SHOGGOTH_ATTACKS_HUMAN",targets[0],getGender(targets[0]));
			NoSPToken("SHOGGOTH_VS_HUMAN",targets);
			z.dieRollModifier = 1;
			z.shoggothContext = context;
			return false;
		} else if(z.spacePassengers[z.shoggoth].length >= 1){
			let medicalIntervention = false;
			let medicalInterventioner = -1;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
					medicalIntervention = true;
					medicalInterventioner = j;
					break;
				}
			}
			let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")],d.spaceNames[z.shoggoth]);
			if(!medicalIntervention && !travelPharmacy){
				let done = true;
				while(z.spacePassengers[z.shoggoth].length > 0){
					done = defeatPassenger(z.spacePassengers[z.shoggoth].pop()) && done;
				}
				if(!done){
					z.shoggothContext = context;
				}
				return done;
			}
			plainAlert("SHOGGOTH_PASSENGER_DEFEAT",d.spaceNames[z.shoggoth]);
			if(travelPharmacy){
				addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Shoggoth",z.shoggoth,0],true);
				plainAlert("TRAVEL_PHARMACY_NOTIFICATION",z.players[itemHolder("Travel Pharmacy")]);
			}
			if(medicalIntervention){
				plainAlert("MEDICAL_INTERVENTION_PAUSE");
				addOption(medicalInterventioner,"Medical Intervention (passenger)",["Shoggoth",z.shoggoth,0],true);
			}
			optionForAll("Defeat a passenger in a space",["Shoggoth",z.shoggoth],true);
			z.shoggothContext = context;
			return false;
		} else if(z.shoggoth >= INTERIOR && INTERIOR + 6 > z.shoggoth && z.damage[z.shoggoth-INTERIOR] === -1){
			let damageDone = damageLocation(d.spaceNames[z.shoggoth],undefined,"Shoggoth");
			if(!damageDone){
				z.shoggothContext = context;
			}
			return damageDone;
		} else {
			let removed = 0;
			for(let j = 0; !(j>=4) && z.itemDeck.length > 0; j++){
				removed++;
				z.itemDeck.pop();
			}
			if(removed === 0){
				plainAlert("SHOGGOTH_NO_ITEMS");
			} else if(removed === 1){
				plainAlert("SHOGGOTH_ONE_ITEM");
			} else {
				plainAlert("SHOGGOTH_ITEMS",removed);
			}
			if(z.shoggoth >= WATER && !(z.shoggoth >= DECK)){
				z.shoggoth += 8;
				fleeCheck(z.shoggoth);
			} else if (z.shoggoth >= DECK && !(z.shoggoth >= INTERIOR)){
				z.shoggoth += 7;
				if(z.shoggoth === BRIDGE - 1){
					z.shoggoth++;
				} else if (z.shoggoth === BOILER_ROOM + 1){
					z.shoggoth--;
				}
				fleeCheck(z.shoggoth);
			} else {
				/* URULES: tiebreaker here */
				z.shoggoth = interiorDeepOneProceeds(z.shoggoth,true);
				fleeCheck(z.shoggoth);
			}
			plainAlert("SHOGGOTH_MOVES",d.spaceNames[z.shoggoth]);
			return true;
		}
	}
}

function activateDrownedSpirit(context,skip){
	if(skip && context === "Interrupt"){
		context = z.drownedSpiritContext;
	}
	if(!skip && canInterruptActivation()){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier","Drowned Spirit",true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Drowned Spirit",true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]","Drowned Spirit",true);
		}
		z.drownedSpiritContext = context;
		optionForAll("Activate the Drowned Spirit","Interrupt",true);
		return false;
	}
	if(z.drownedSpirit === RESERVES){
		boldAlert("DROWNED_SPIRIT_SPAWNS");
		NoSPToken("Drowned Spirit Placement",context);
		return false;
	} else {
		if(z.drownedSpirit >= INTERIOR && INTERIOR + 6 > z.drownedSpirit && z.damage[z.drownedSpirit-INTERIOR] === -1){
			let damageDone = damageLocation(d.spaceNames[z.drownedSpirit],undefined,"Drowned Spirit");
			if(!damageDone){
				z.drownedSpiritContext = context;
			}
			return damageDone;
		} else {
			let removed = 0;
			for(let j = 0; !(j>=4) && z.spellDeck.length > 0; j++){
				removed++;
				z.spellDeck.pop();
			}
			if(removed === 0){
				plainAlert("DROWNED_SPIRIT_NO_ITEMS");
			} else if(removed === 1){
				plainAlert("DROWNED_SPIRIT_ONE_ITEM");
			} else {
				plainAlert("DROWNED_SPIRIT_ITEMS",removed);
			}
			if(z.drownedSpirit >= WATER && !(z.drownedSpirit >= DECK)){
				z.drownedSpirit += 8;
				fleeCheck(z.drownedSpirit);
			} else if (z.drownedSpirit >= DECK && !(z.drownedSpirit >= INTERIOR)){
				z.drownedSpirit += 7;
				if(z.drownedSpirit === BRIDGE - 1){
					z.drownedSpirit++;
				} else if (z.drownedSpirit === BOILER_ROOM + 1){
					z.drownedSpirit--;
				}
				fleeCheck(z.drownedSpirit);
			} else {
				/* URULES: tiebreaker here */
				z.drownedSpirit = interiorDeepOneProceeds(z.drownedSpirit,true);
				fleeCheck(z.drownedSpirit);
			}
			plainAlert("DROWNED_SPIRIT_MOVES",d.spaceNames[z.drownedSpirit]);
		}
	}
	return true;
}

function doneWithGraspingTendril(){
	let context = z.graspingTendrilContext;
	delete z.graspingTendrilContext;
	switch(context){
		case "Summon":
			finishedAction();
			break;
		case "A Closer Look":
		case "Bump in the Night":
		case "Drag":
		case "Tug of War":
			clearSkillCheck();
			break;
		case "A Closer Look (OR)":
			doneWithChoiceMythos();
			break;
		case "Manifest Horror 1":
			if(!activateGraspingTendril("Manifest Horror 2")){
				break;
			}
			/* falls through */
		case "Manifest Horror 2":
			doneWithRevealEffect(getPlayerNum("Avery"));
			break;
		case "Horror":
			doneWithHorror();
			break;
		case "Kelp Forest":
			doneWithWaypoint();
			break;
	}
}

function activateGraspingTendril(context,skip){
	if(skip && context === "Interrupt"){
		context = z.graspingTendrilContext;
	}
	if(!skip && canInterruptActivation()){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier","Grasping Tendril",true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Grasping Tendril",true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]","Grasping Tendril",true);
		}
		z.graspingTendrilContext = context;
		optionForAll("Activate the Grasping Tendril","Interrupt",true);
		return false;
	}
	if(z.graspingTendril === RESERVES){
		boldAlert("GRASPING_TENDRIL_SPAWNS");
		NoSPToken("Grasping Tendril Placement",context);
	} else {
		let targets = [];
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(!z.revealedHybrids[j] && z.playerLocations[j] === d.spaceNames[z.graspingTendril+8]){
				targets.push(j);
			}
		}
		if(targets.length > 1){
			
			boldAlert("GRASPING_TENDRIL_MULTIPLE_HUMANS",[z.players[z.turn],d.spaceNames[z.graspingTendril+8]]);
			addOption(z.turn,"Choose the Grasping Spirit target",undefined,true);
			z.graspingTendrilContext = context;
			return false;
		} else if(targets.length === 1){
			
			plainAlert("GRASPING_TENDRIL_ATTACKS_HUMAN",z.players[targets[0]],getGender(targets[0]));
			NoSPToken("GRASPING_TENDRIL_VS_HUMAN",z.players[targets[0]]);
			z.dieRollModifier = 1;
			z.graspingTendrilContext = context;
			return false;
		} else {
			if(z.spacePassengers[z.graspingTendril+8].length > 0){
				plainAlert("GRASPING_TENDRIL_GRASPS",d.spaceNames[z.graspingTendril+8]);
				while(z.spacePassengers[z.graspingTendril+8].length > 0){
					z.spacePassengers[z.graspingTendril].push(z.spacePassengers[z.graspingTendril+8].pop());
				}
			} else if(z.passengerSupply.length > 0){
				plainAlert("GRASPING_TENDRIL_PORTHOLE",d.spaceNames[z.graspingTendril]);
				z.spacePassengers[z.graspingTendril].push(z.passengerSupply.pop());
			} else {
				plainAlert("GRASPING_TENDRIL_NO_PORTHOLE");
			}
			if(z.graspingTendril !== WATER && z.graspingTendril !== WATER + 1){
				z.graspingTendril -= 2;
				plainAlert("GRASPING_TENDRIL_ADVANCE",d.spaceNames[z.graspingTendril]);
			}
			fleeCheck(z.graspingTendril);
			fleeCheck(z.graspingTendril+8);
			return true;
		}
	}
}

/* spawns in water space only */
function spawnGraspingTendril(locIndex){
	z.horror = -1;
	z.graspingTendril = locIndex;
	plainAlert("GRASPING_TENDRIL_SPAWNED",d.spaceNames[locIndex]);
	fleeCheck(locIndex+8);
}

function spawnDrownedSpirit(locIndex){
	z.horror = -1;
	z.drownedSpirit = locIndex;
	plainAlert("DROWNED_SPIRIT_SPAWNED",d.spaceNames[locIndex]);
	fleeCheck(locIndex);
}

function spawnShoggoth(locIndex){
	z.horror = -1;
	z.shoggoth = locIndex;
	plainAlert("SHOGGOTH_SPAWNED",d.spaceNames[locIndex]);
	fleeCheck(locIndex);
}

function fleeCheck(locIndex){
	if(!z.fromTheAbyss){
		return;
	}
	for(let j = 0; !(j>=z.allies.length); j++){
		if(z.allies[j][1] === d.spaceNames[locIndex]){
			let humanPresent = false;
			for(let k = 0; !(k>=z.numPlayers); k++){
				if(!z.revealedHybrids[k] && z.playerLocations[k] === d.spaceNames[locIndex]){
					humanPresent = true;
					break;
				}
			}
			if(!humanPresent){
				let enemyPresent = (z.shoggoth === locIndex) || (z.drownedSpirit === locIndex) || (z.graspingTendril + 8 === locIndex);
				for(let k = 0; !(k>=z.deepOnes.length) && !enemyPresent; k++){
					enemyPresent = z.deepOnes[k] === locIndex;
				}
				for(let k = 0; !(k>=z.numPlayers) && !enemyPresent; k++){
					enemyPresent = z.playerLocations[k] === d.spaceNames[locIndex];
				}
				if(enemyPresent){
					plainAlert("ALLY_FLEES",d.allyNames[z.allies[j][0]]);
					z.allyDeck.push(z.allies.splice(j,1)[0][0]);
					shuffle(z.allyDeck);
					j--;
				}
			}
		}
	}
}

function primeCylonActivation() {
	let act = d.activation[z.currentMythos];
	switch (act) {
		case "O":
			addAlert("MONSTER_ACTIVATION_ALERT","Deep Ones");
			if(activateDeepOnes()){
				primeJumpIcon();
			} else if (!z.gameOver){
				z.deepOneContext = "Monster";
			}			
			break;
		case "F":
			addAlert("MONSTER_ACTIVATION_ALERT","Father Dagon");
			if(activateFather("Monster")){
				primeJumpIcon();
			}
			break;
		case "M":
			addAlert("MONSTER_ACTIVATION_ALERT","Mother Hydra");
			if(activateMother("Monster")){
				primeJumpIcon();
			}				
			break;
	}
}

function dealSkillCard(player, colorID) {
	if(z.skillCardDecks[colorID].length > 0 || z.skillCardDiscards[colorID].length > 0) {
		printlnBold("CARD_DRAW",[z.players[player],colorIDName(colorID)]);
		if(z.spreadingRumors && z.spreadingRumorsDecks[colorID] === 1){
			z.possibleColors[player][TREACHERY] = 1;
			z.possibleColors[player][BOON] = 1;
		}
		let card = drawFromDeck(colorID);
		z.possibleColors[player][colorID] = 1;
		z.skillCardHands[player].push(card);
		return card;
	} else {
		plainAlert("NO_CARD_TO_DRAW",[z.players[player],colorIDName(colorID)]);
		return undefined;
	}
}

function discardSkillCard(player, pos) {
	if(!(pos >= 0) || pos >= z.skillCardHands[player].length) {
		error("Cannot discard a card you do not have in hand!");
		return false;
	}
	let card = z.skillCardHands[player].splice(pos, 1)[0];
	z.skillCardDiscards[cardColorID(card)].push(card);
	/*reshuffleSkillCardDeck(cardColorID(card));*/
	printlnBold("DISCARD_CARD",[z.players[player],cardText(card)]);
	if(z.skillCardHands[player].length === 0) {
		z.possibleColors[player] = [0, 0, 0, 0, 0, 0];
	}
	return true;
} /* Returns the card id discarded. */


function playSkillCard(player, pos, output) {
	if(!(pos >= 0) || pos >= z.skillCardHands[player].length) {
		error("Cannot play a card you do not have in hand!");
		return 0;
	}
	let card = z.skillCardHands[player].splice(pos, 1)[0];
	checkEmptyColors(player);
	z.skillCardDiscards[cardColorID(card)].push(card);
	/*reshuffleSkillCardDeck(cardColorID(card));*/
	if(output) {
		printlnBold("PLAY_CARD_ALERT",[z.players[player],cardText(card)]);
	}
}

function optionForAll(opt, context, man) {
	for(let j = 0; !(j >= z.numPlayers); j++) {
		addOption(j, opt, context, man);
	}
}

function removeFromAll(opt) {
	for(let j = 0; !(j >= z.numPlayers); j++) {
		removeOption(j, opt);
	}
}

function getCharacter(name) {
	for(let i = 0; !(i >= d.characters.length); i++) {
		if(d.characters[i ] === name) {
			return i;
		}
	}
	return -1;
}



function passCaptain(old,lowest) {
	if(!lowest){
		let best = 99;
		let bestBrigged = 99;
		let brigAdmiral = -1;
		for(let i = 0; !(i >= z.numPlayers); i++) {
			let character = getCharacter(z.players[i ]);
			let rank = d.captainSuccession[character];
			if(!(rank >= best) && z.revealedHybrids[i ] === 0 && rank !== old && z.playerLocations[i ] !== "Brig") {
				z.captain = i;
				best = rank;
			}
			if(!(rank >= bestBrigged) && z.revealedHybrids[i ] === 0) {
				bestBrigged = rank;
				brigAdmiral = i;
			}
		}
		if(best === 99) {
			z.captain = brigAdmiral;
			if(bestBrigged !== old) {
				boldAlert("NEW_CAPTAIN",z.players[z.captain]);
			} else {
				println("ALL_HUMANS_IN_BRIG","Captain");
				return;
			}
		} else {
			boldAlert("NEW_CAPTAIN",z.players[z.captain]);
		}
	} else {
		let best = -1;
		for(let i = 0; !(i >= z.numPlayers); i++) {
			let character = getCharacter(z.players[i ]);
			let rank = d.captainSuccession[character];
			if(rank > best && z.revealedHybrids[i ] === 0 && rank !== old && z.playerLocations[i ] !== "Brig") {
				z.captain = i;
				best = rank;
			}
		}
		if(best !== -1){
			boldAlert("NEW_CAPTAIN",z.players[z.captain]);
		} else {
			/* URULES: this */
			passCaptain(old);
		}
	}
}

function passKeeper(old) {

	let best = 99;
	let bestBrigged = 99;
	let brigAdmiral = -1;
	for(let i = 0; !(i >= z.numPlayers); i++) {
		let character = getCharacter(z.players[i ]);
		let rank = d.keeperSuccession[character];
		if(!(rank >= best) && z.revealedHybrids[i ] === 0 && rank !== old && z.playerLocations[i ] !== "Brig") {
			z.keeper = i;
			best = rank;
		}
		if(!(rank >= bestBrigged) && z.revealedHybrids[i ] === 0) {
			bestBrigged = rank;
			brigAdmiral = i;
		}
	}
	if(best === 99) {
		z.keeper = brigAdmiral;
		if(bestBrigged !== old) {
			boldAlert("NEW_KEEPER",z.players[z.keeper]);
		} else {
			println("ALL_HUMANS_IN_BRIG","Keeper of the Tome");
			return;
		}
	} else {
		boldAlert("NEW_KEEPER",z.players[z.keeper]);
	}
}


function deepOnesAway() {
	let count = 0;
	for(let i = 0; !(i >= z.deepOnes.length); i++) {
		if(z.deepOnes[i ] === DEEP || z.deepOnes[i ] === RESERVES) {
			count++;
		}
	}
	return count;
}

function deepOnesReserves(){
	let count = 0;
	for(let i = 0; !(i >= z.deepOnes.length); i++) {
		if(z.deepOnes[i ] === RESERVES) {
			count++;
		}
	}
	return count;
}

function versionAtLeast(ver) {
	for(let j = 0; !(j >= z.version.length) && !(j >= ver.length); j++) {
		if(ver[j] > z.version[j]) {
			return false;
		} else if(z.version[j] > ver[j]) {
			return true;
		}
	}
	if(ver.length > z.version.length) {
		return false;
	}
	return true;
}

function versionsAtLeast(ver1, ver2) {
	for(let j = 0; !(j >= ver1.length) && !(j >= ver2.length); j++) {
		if(ver2[j] > ver1[j]) {
			return false;
		} else if(ver1[j] > ver2[j]) {
			return true;
		}
	}
	if(ver2.length > ver1.length) {
		return false;
	}
	return true;
}

function isRevealedCultist(player){
	return !isHybrid(player) && isTraitor(player) && z.revealedHybrids[player];
}

function endGame(humansWon) {
	/* TODO: end of game report */
	z.gameOver = true;
	if(humansWon) {
		addAlert("Humans Win!");
		t.value += size(colorText("blue", bold("Humans Win!")), 14) + "\r\n";
		for(let j = 0; !(j >= z.numPlayers); j++) {
			if(!isTraitor(j)) {
				t.value += bold(z.players[j] + " wins!") + "\r\n";
			}
		}
	} else {
		
		humansWon = false;
		if(z.distance >= 12){
			addAlert("Traitors Win!");
			t.value += size(colorText("red", bold("Traitors Win!")), 14) + "\r\n";
		} else {
			addAlert("Hybrids Win!");
			t.value += size(colorText("red", bold("Hybrids Win!")), 14) + "\r\n";
		}
		for(let j = 0; !(j >= z.numPlayers); j++) {
			if(isHybrid(j)){
				printlnBold("PLAYER_WINS",z.players[j]);
			} else if(isTraitor(j) && z.distance >= 12){
				printlnBold("CULTIST_WINS",z.players[j]);
			}
			/* UTODO: announce cultist loss? */
		}
	}
	t.value += "\r\n"+bold("Remember to record the outcome of your game on the [ur"+"l=https:"+"//boardgamegeek.com/wiki/page/Unfathomable_PBF]Unfathomable PBF Wiki[/"+"url]!")+"\r\n";
}

function notebookCheck(card,performer){
	if(card === undefined){
		return;
	}
	if(card === z.notebookCard){
		delete z.notebookCard;
	}
	if(!z.notebook && itemPresent("Notebook") && itemHolder("Notebook") === performer && cardName(card) === "Coordinated Effort"){
		boldAlert("NOTEBOOK_ALERT",[z.players[performer],cardText(card)],getGender(performer));
		if(hasOption(performer,"[Notebook] Return a card to your hand")){
			let context = getContext(performer,"[Notebook] Return a card to your hand");
			context.push(card);
			addOption(performer,"[Notebook] Return a card to your hand",context,false);
		} else {
			addOption(performer,"[Notebook] Return a card to your hand",[card],false);
		}
	}
}

function season(player,color){
	if(z.players[player] === "Ida" && !z.revealedHybrids[player] && !z.seasoned){
		plainAlert("SEASONED_ALERT",colorIDAlert(color));
		if(hasOption(player,"[Seasoned] Draw 2 Skill Cards")){
			let context = getContext(player,"[Seasoned] Draw 2 Skill Cards");
			if(!context.includes(color)){
				context.push(color);
				addOption(me,"[Seasoned] Draw 2 Skill Cards",context,false);
			}
		} else {
			addOption(me,"[Seasoned] Draw 2 Skill Cards",[color],false);
		}
	}
}

function finishedAction(){
	delete z.midAction;
	let performer = z.actionPerformer;
	delete z.actionPerformer;
	if((performer !== z.turn || (performer === z.turn && z.phase === 3)) && performer !== undefined && !hasOption(performer,"Use an Ally") && canUseAlly(performer,true)){
		boldAlert("LATE_ALLY_ALERT",z.players[performer]);
		addOption(performer,"Use an Ally",undefined,false);
	}	
	if((performer !== z.turn || (performer === z.turn && z.phase === 3)) && performer !== undefined && !hasOption(performer,"Lost Souls") && canLostSouls(performer,true)){
		boldAlert("LATE_LOST_SOULS_ALERT",z.players[performer]);
		addOption(performer,"Lost Souls",undefined,false);
	}
	if(performer === undefined){
		plainAlert("There may be a bug interfering with Ally use here, please let Zoe know.");
	}
	while(z.xoStack.length > 0){
		let card = z.xoStack.pop();
		let performer = z.xoPerformers.pop();
		if(card === -1){
			return;
		} else if(card === "Cadet" || card === "Cadet+"){
			wander(CADET);
			return;
		} else if(!Number.isInteger(card) && card !== "Loyal Assistant"){
			if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
				z.xoStack[z.xoStack.length-1] = "Cadet+";
			}
			return;
		}
		if((performer !== z.turn || (performer === z.turn && z.phase === 3)) && !hasOption(performer,"Use an Ally") && canUseAlly(performer,true) && card !== "Loyal Assistant" && card !== "Coordinated Effort"){
			boldAlert("LATE_ALLY_ALERT",z.players[performer]);
			addOption(performer,"Use an Ally",undefined,false);
		}	
		if((performer !== z.turn || (performer === z.turn && z.phase === 3)) && !hasOption(performer,"Lost Souls") && canLostSouls(performer,true) && card !== "Coordinated Effort"){
			boldAlert("LATE_LOST_SOULS_ALERT",z.players[performer]);
			addOption(performer,"Lost Souls",undefined,false);
		}	
		if(characterPresent("Raúl") && canLoyalAssistant(getPlayerNum("Raúl"))){
			boldAlert("LOYAL_ASSISTANT_REMINDER");
		}
	
		
		if(Number.isInteger(card)){
			notebookCheck(card,performer);
			if(cardName(card) === "True Grit"){
				season(performer,WILL);
			}
			println(cardText(card) + " discarded.");
			z.skillCardDiscards[cardColorID(card)].push(card);
		}
	}
	
}

function doneWithMother(){
	
	if(z.midAction === "Perform Rites" && !hasOption(z.turn,"Activate Father Dagon")){
		finishedAction();
	}
	if(z.motherContext === "Coordinated Assault"){
		delete z.motherContext;
		if(activateFather("Coordinated Assault")){
			if(activateDeepOnes()){
				clearSkillCheck();
			} else {
				z.deepOneContext = "Coordinated Assault";
			}
		}
	} else if(z.motherContext === "The Mother's Wrath 2"){
		delete z.motherContext;
		if(activateMother("The Mother's Wrath")){
			delete z.motherContext;
			clearSkillCheck();
		}
	} else if(z.motherContext === "The Mother's Wrath"){
		delete z.motherContext;
		clearSkillCheck();
	} else if(z.motherContext === "Monster"){
		delete z.motherContext;
		primeJumpIcon();
	} else if(z.motherContext === "Looming Danger"){
		delete z.motherContext;
		doneWithChoiceMythos();
	}
}



function doneWithDamage(){
	let context = z.damageContext;
	delete z.damageContext;
	if(context === "Hurricane 1"){
		if(damageShip("Waypoint")){
			doneWithWaypoint();
		}
	} else if (context === "Creeping Vines 1"){
		SPTokenBad("Creeping Vines");
	} else if (context === "Creeping Vines 2"){
		doneWithChoiceMythos();
	} else if(context === "Malfunctions 1"){
		if(damageShip("Malfunctions 2")){
			handlePreludes();
		}
	} else if(context === "Malfunctions 2"){
		handlePreludes();
	} else if (context === "Waypoint"){
		doneWithWaypoint();
	} else if (context === "Collision Course"){
		if(damageShip("Mythos")){
			clearSkillCheck();
		}
	} else if (context === "Shipboard Fire"){
		if(damageShip("Collision Course")){
			if(damageShip("Mythos")){
				clearSkillCheck();
			}
		}
	} else if (context === "Do No Harm"){
		movePlayer(getPlayerNum("Svetlana"),"Sick Bay");
		clearSkillCheck();
	} else if (context === "Do No Harm Edmund"){
		movePlayer(getPlayerNum("Edmund"),"Sick Bay");
		clearSkillCheck();
	} else if (context === "Do No Harm OR"){
		doneWithChoiceMythos();
	} else if (context === "Signs of Life"){
		if(defeat(getPlayerNum("Jeanne"),"Signs of Life")){
			doneWithChoiceMythos();
		}
	} else if (context === "Signs of Life Edmund"){
		if(defeat(getPlayerNum("Edmund"),"Signs of Life")){
			doneWithChoiceMythos();
		}
	} else if (context === "Deep One"){
		resumeDeepOneActivation();
	} else if (context === "Mother Hydra"){
		doneWithMother();
	} else if (context === "Spell"){
		if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
			finishedAction();
		}
		if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
	} else if (context === "Jam Tin Grenade"){
		if(z.midAction === "Jam Tin Grenade"){
			finishedAction();
		}
	} else if (context === "Sabotage"){
		doneWithRevealEffect(getPlayerNum("Jeanne"));
	} else if (context === "The Game is Afoot"){
		/* deep ones spawned elsewhere */
		doneWithChoiceMythos();
	} else if (context === "Mythos" || context === "Infiltrator"){
		/* deep one spawned elsewhere */
		clearSkillCheck();
	} else if (context === "Drowned Spirit"){
		doneWithDrownedSpirit();
	} else if (context === "Disappearing Food"){
		spawnDeepOne(DEEP);
	} else if (context === "Shoggoth"){
		doneWithShoggoth();
	}
	/* not done: 
	anything else with Mother Hydra
	*/
}

function damageShip(context){
	let damage = z.damageDeck.pop();
	if(d.damageNames[damage].startsWith("Structural Damage") || d.damageNames[damage] === "Minor Structural Damage"){
		let count = 0;
		let undamagedLocation = -1;
		for(let j = 0; !(j>=6); j++){
			if(isLocationDamaged(d.spaceNames[j+INTERIOR])){
				count++;
			} else {
				undamagedLocation = j+INTERIOR;
			}
		}
		
		if(count === 5){
			let loc = d.spaceNames[undamagedLocation];
			z.damage[undamagedLocation-INTERIOR] = damage;
			boldAlert("DAMAGE_ALERT",[loc,d.damageNames[damage]]);
			endGame(false);
		} else {
			plainAlert("DAMAGE_SHIP_ALERT",d.damageNames[damage]);
			NoSPToken("DAMAGE_PLACEMENT",[damage,context]);
		}
		return false;
	} else if(d.damageNames[damage] === "Fuel Leak"){
		plainAlert("FUEL_LEAK");
		return decreaseFuel();
	} else if(d.damageNames[damage] === "Flooded Food Stores"){
		plainAlert("FLOODED_FOOD_STORES");
		return decreaseFood();
	} else if(d.damageNames[damage] === "Fleeing Passengers"){
		z.damageDeck.unshift(damage);
		if(z.passengerSupply.length > 0){
			plainAlert("FLEEING_PASSENGERS");
			NoSPToken("Risk passenger",["Fleeing Passengers","Ship",context]);
			return false;
		} else {
			plainAlert("NO_PASSENGERS_IN_SUPPLY");			
			return damageShip(context);
		}
	} else if(d.damageNames[damage] === "False Alarm"){
		plainAlert("FALSE_ALARM");
		return true;
	}
}


function damageLocation(loc,damage,context){
	let priority = [];
	let done = true;
	switch(loc){
		case "Bridge":
			priority = ["Bridge","Captain's Cabin","Chapel","Galley","Cargo Hold","Boiler Room"];
			break;
		case "Chapel":
			priority = ["Chapel","Cargo Hold","Captain's Cabin","Bridge","Boiler Room","Galley"];
			break;
		case "Captain's Cabin":
			priority = ["Captain's Cabin","Galley","Chapel","Bridge","Boiler Room","Cargot Hold"];
			break;
		case "Cargo Hold":
			priority = ["Cargo Hold","Boiler Room","Galley","Chapel","Captain's Cabin","Bridge"];
			break;
		case "Galley":
			priority = ["Galley","Boiler Room","Cargo Hold","Captain's Cabin","Chapel","Bridge"];
			break;
		case "Boiler Room":
			priority = ["Boiler Room","Galley","Cargo Hold","Captain's Cabin","Chapel","Bridge"];
			break;
	}
	if(damage === undefined){
		damage = z.damageDeck.pop();
	}
	if(d.damageNames[damage].startsWith("Structural Damage") || d.damageNames[damage] === "Minor Structural Damage"){
		for(let j = 0; !(j>=priority.length); j++){
			if(!isLocationDamaged(priority[j])){
				loc = d.spaceNames[locationIndex(priority[j])];
				z.damage[locationIndex(priority[j])-INTERIOR] = damage;
				boldAlert("DAMAGE_ALERT",[loc,d.damageNames[damage]]);
				let count = 0;
				for(let k = 0; !(k>=6); k++){
					if(isLocationDamaged(d.spaceNames[k+INTERIOR])){
						count++;
					}
				}
				if(count === 6){
					endGame(false);
					return false;
				}
				

				if(context !== "Malfunction 1" && context !== "Malfunction 2" && d.damageNames[damage] !== "Minor Structural Damage"){
					for(let k = 0; !(k>=z.playerLocations.length); k++){
						if(z.playerLocations[k] === loc && z.revealedHybrids[k] === 0){
							done = defeat(k,"Damage Location") && done;
						}
					}
					fleeCheck(locationIndex(loc));
				}
				
				
				
				if(context === "The Game is Afoot"){
					done = spawnDeepOnes(locationIndex(priority[j]),4) && done;
				} else if(context === "Infiltrator"){
					done = spawnDeepOne(locationIndex(priority[j])) && done;
				}
				if(!done){
					z.damageContext = context;
				}
				return done;
			}
			
		}
	} else if(d.damageNames[damage] === "Fuel Leak"){
		plainAlert("FUEL_LEAK");
		return decreaseFuel();
	} else if(d.damageNames[damage] === "Flooded Food Stores"){
		plainAlert("FLOODED_FOOD_STORES");
		return decreaseFood();
	} else if(d.damageNames[damage] === "Fleeing Passengers"){
		z.damageDeck.unshift(damage);
		if(z.passengerSupply.length > 0){
			plainAlert("FLEEING_PASSENGERS");
			NoSPToken("Risk passenger",["Fleeing Passengers",loc,context]);
			return false;
		} else {
			plainAlert("NO_PASSENGERS_IN_SUPPLY");
			return damageLocation(loc,undefined,context);
		}
	} else if(d.damageNames[damage] === "False Alarm"){
		plainAlert("FALSE_ALARM");
		return true;
	}
}

function getDistance(destinationID) {
	if(destinationID >= 16){
		return 4;
	} else if(destinationID >= 7){
		return 3;
	} else {
		return 2;
	}
}

function isHybridCard(card) {
	switch (card) {
		case 9:
		case 10:
		case 13:
			return true;
	}
	return false;
}

function isTraitor(player){
	if(z.revealedHybrids[player] === 1){
		return true;
	}
	for(let j = 0; !(j >= z.loyaltyHands[player].length); j++) {
		if(isHybridCard(z.loyaltyHands[player][j]) || (z.loyaltyHands[player][j] === CULTIST && z.numPlayers !== 7) ) {
			return true;
		}
	}
	return false;
}

function isHybrid(player){
	for(let j = 0; !(j >= z.loyaltyHands[player].length); j++) {
		if(isHybridCard(z.loyaltyHands[player][j])) {
			return true;
		}
	}
	for(let j = 0; !(j >= z.loyaltyDiscards[player].length); j++){
		if(isHybridCard(z.loyaltyDiscards[player][j])) {
			return true;
		}
	}
	return false;
}


function canReveal(){
	if(z.revealedHybrids[me] === 1){
		return false;
	}
	for(let j = 0; !(j >= z.loyaltyHands[me].length); j++) {
		if(isHybridCard(z.loyaltyHands[me][j]) || (z.loyaltyHands[me][j] === CULTIST && z.numPlayers !== 7)) {
			return true;
		}
	}
	return false;
}

function itemPresent(itemName){
	for(let j = 0; !(j>=z.items.length); j++){
		for(let k = 0; !(k>=z.items[j].length); k++){
			if(d.itemNames[z.items[j][k]] === itemName && z.playerLocations[j] !== "Brig"){
				return true;
			}
		}
	}
	return false;
}

function itemHolder(itemName){
	for(let j = 0; !(j>=z.items.length); j++){
		for(let k = 0; !(k>=z.items[j].length); k++){
			if(d.itemNames[z.items[j][k]] === itemName){
				return j;
			}
		}
	}
	return -1;
}

function canFirstOath(){
	if(!characterPresent("Ishmael") || z.players[me] !== "Ishmael"  || (z.mother === DEEP && z.father === DEEP) || z.revealedHybrids[me]){
		return false;
	}
	return hasLore();
}

function canBreakOut(){
	if(z.revealedHybrids[me] === 0 || z.playerLocations[me] !== "Brig"){
		return false;
	}
	let value = 0;
	for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
		value += cardValue(z.skillCardHands[me][j]);
	}
	return value >= 12;
}

function canSpeakingTrumpet(){
	if(!itemPresent("Speaking Trumpet") || itemHolder("Speaking Trumpet") !== me){
		return false;
	}
	for(let j = 0; !(j>=z.spacePassengers.length); j++){
		if(isAdjacent(z.playerLocations[me],d.spaceNames[j]) && z.spacePassengers[j].length > 0){
			return true;
		}
	}
	return false;
}

function hasLore(player){
	if(player === undefined){
		player = me;
	}
	for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
		if(cardColorID(z.skillCardHands[me][j]) === LORE || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
			return true;
		}
	}
	return false;
}

function canSacrificeDeepOne(){
	if(z.sacrifice !== me){
		return false;
	}
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(d.spaceNames[z.deepOnes[j]] === z.playerLocations[me]){
			return true;
		}
	}
	return false;
}

function canDefeatPassenger(){
	if(z.revealedHybrids[me] === 0){
		return false;
	}
	let locIndex = locationIndex(z.playerLocations[me]);
	let deckPassengers = z.spacePassengers[locIndex].length > 0;
	let waterPassengers = locIndex >= DECK && INTERIOR > locIndex && z.spacePassengers[locIndex-8].length > 0;
	if(!deckPassengers && !waterPassengers){
		return false;
	}
	for(let j = 0; !(j>=z.playerLocations.length); j++){
		if(z.playerLocations[j] === z.playerLocations[me] && z.revealedHybrids[j] === 0){
			return false;
		}
	}
	return true;
}

function canRescue(){
	if(z.rumors && z.players[me] === "Ida"){
		return false;
	}
	let locIndex = locationIndex(z.playerLocations[me]);
	if(z.spacePassengers[locIndex].length > 0 && !z.revealedHybrids[me]){
		return true;
	}
	if(z.fromTheAbyss && locIndex >= DECK && INTERIOR > locIndex && z.spacePassengers[locIndex-8].length > 0){
		return true;
	}
	return false;
}

function useAlly(ally, noCost){
	if(z.allyUser === undefined){
		z.allyUser = [];
	}
	z.allyUser.push(me);
	let cost = d.allyValues[ally];
	if(noCost){
		cost = 0;
	}
	if(cost === 0){
		useAlly2(ally);
	} else {
		let doIt = (v,count)=>{
			if(count >= cost){
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					if(v[j]){
						v.splice(j,1);
						discardSkillCard(me,j);
						j--;
					}
				}
				useAlly2(ally);
			} else {
				let promptText = lc("ALLY_DISCARD_SKILL_CARD_PROMPT",[cost,z.skillCardHands[me].length]);
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					promptText += "\n"+(j+1)+": "+cardText(z.skillCardHands[me][j]);
					if(v[j]){
						promptText += lc(" (already chosen)");
					}
				}
				promptNum(promptText,(a)=>1>a||a>z.skillCardHands[me],()=>{doIt(v,count)},(a)=>{
					let value = cardValue(z.skillCardHands[me][a-1]);
					if(v[a-1]){
						count -= value;
						v[a-1] = false;
						doIt(v,count);
					} else {
						v[a-1] = true;
						count += value;
						doIt(v,count);
					}
				});
			}
		};
		z.skillCardHands[me].sort(cardCompare);
		let v = [];
		for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
			v.push(false);
		}
		doIt(v,0);			
	}
}

var a0 = "ENDTMRA  [/size] [/c]" + 
" [c][size=1] STARTTMRB";

function useAlly2(ally){
	t.value += imageM(d.allyBanners[ally])+"\r\n";
	boldAlert("ALLY_USE_ALERT",[z.players[me],d.allyNames[ally]]);
	switch(d.allyNames[ally]){
		case "Able Seaman": {
			let any = false;
			for(let j = 0; !(j>=z.spacePassengers.length); j++){
				if(z.spacePassengers[j].length > 0){
					any = true;
					break;
				}
			}
			if(!any){
				plainAlert("No effect.");
				wander(ABLE_SEAMAN);
			} else {
				addOption(me,"[Able Seaman] Rescue a Passenger",undefined,true);
			}
			break;
		}
		case "Cadet":
			if(z.midAction === "Unfinished Business"){
				z.xoStack.push("Unfinished Business");
				z.xoPerformers.push(z.actionPerformer);
				delete z.midAction;
				delete z.actionPerformer;
			}
			z.xoStack.push("Cadet");
			z.xoPerformers.push(me);
			z.cadet = me;
			break;
		case "Conspiracy Theorist":
			if(me === z.cursedWhispers){
				SPTokenBad("Cursed Whispers","Conspiracy Theorist");
			} else {
				dealSkillCard(me,BOON);
				dealSkillCard(me,TREACHERY);
				wander(CONSPIRACY_THEORIST);
			}
			break;
		case "Fortune Teller":
			addOption(me,"Scout the Mythos deck","Fortune Teller",true);
			addAlert("FORTUNE_TELLER_ALERT");
			break;
		case "Gambler":
			SPTokenBad("Gambler",me);
			break;
		case "Host":
			addAlert("HOST_ALERT");
			addOption(me,"[Host] Choose a target",undefined,true);
			break;
		case "Mechanic": {
			let promptText = "";
			let choices = [];
			for(let j = 0; !(j>=z.damage.length); j++){
				if(z.damage[j] >= 0 && !enemyInSpace(d.spaceNames[INTERIOR+j])){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(d.spaceNames[INTERIOR+j]);
				}
			}
			if(choices.length === 0){
				wander(MECHANIC);
			} else if(choices.length === 1){
				let damage = z.damage[choices[0]];
				z.damageDeck.push(damage);
				shuffle(z.damageDeck);
				z.damage[choices[0]] = -1;
				plainAlert("STRUCTURAL_DAMAGE_REPAIRED",[d.spaceNames[choices[0]],d.damageNames[damage]]);
				wander(MECHANIC);
			} else {
				addAlert("MECHANIC_ALERT");
				addOption(me,"[Mechanic] Repair a space",[lc("MECHANIC_PROMPT",choices.length)+promptText,choices],true);
			}
			break;
		}
		case "Professor":
			addAlert("PROFESSOR_ALERT");
			addOption(me,"[Professor] Draw Skill Cards");
			break;
		case "Quartermaster":
			addOption(me,"Scout the Waypoint deck","Quartermaster",true);
			addAlert("QUARTERMASTER_ALERT");
			break;
		case "Ruffian": {
			let any = (z.shoggoth >= DECK) || (z.drownedSpirit >= DECK) || (z.graspingTendril != RESERVES);
			for(let j = 0; !(j>=z.deepOnes.length) && !any; j++){
				if(z.deepOnes[j] >= DECK){
					any = true;
					break;
				}
			}
			for(let j = 0; !(j>=z.numPlayers) && !any; j++){
				if(z.revealedHybrids[j]){
					any = true;
					break;
				}
			}
			if(!any){
				wander(RUFFIAN);
			} else {
				addOption(me,"[Ruffian] Attack an enemy",undefined,true);
				addAlert("RUFFIAN_ALERT");
			}
			break;
		}
		case "Security Officer":
			addOption(me,"[Security Officer] Choose a target",undefined,true);
			break;
		case "Soldier": {
			let choices = [];
			let promptText = "";
			for(let j = WATER; !(j>=SICK_BAY); j++){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j){
						choices.push(j);
						promptText += "\n"+(choices.length)+": "+d.spaceNames[j];
						break;
					}
				}
			}
			if(choices.length === 0){
				plainAlert("No effect.");
				wander(SOLDIER);
			} else if(choices.length === 1){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === choices[0]){
						z.deepOnes[k] = RESERVES;
						plainAlert("SOLDIER_ALERT",d.spaceNames[choices[0]]);
						break;
					}
				}
				wander(SOLDIER);
			} else {
				addOption(me,"[Soldier] Defeat a Deep One",[lc("DEFEAT_DEEP_ONE_PROMPT",choices.length)+promptText,choices],true);
				addAlert("SOLDIER_PROMPT");
			}
			break;
		}
			
	}
	mainMenu();
}

function canUseAlly(player,secret,excluded){
	if(player === undefined){
		player = me;
	}
	if(!z.fromTheAbyss){
		return false;
	}
	if((z.allyUsed[player] && z.instillBravery !== player) || z.revealedHybrids[player]){
		return false;
	}
	if(z.rumors && z.players[player] === "Ida"){
		return false;
	}
	let handValue = 0;
	if(secret){
		handValue = 6*z.skillCardHands[player].length;
	} else {
		for(let j = 0; !(j>=z.skillCardHands[player].length); j++){
			handValue += cardValue(z.skillCardHands[player][j]);
		}
	}
	for(let j = 0; !(j>=z.allies.length); j++){
		if(z.allies[j][1] === z.playerLocations[player] && z.allies[j][1] !== excluded){
			let cost = d.allyValues[z.allies[j][0]];
			if(handValue >= cost || z.players[player] === "Avery" || z.instillBravery === player){
				return true;
			}
		}
	}
	return false;
}

function canLostSouls(player,secret){
	if(player === undefined){
		player = me;
	}
	if(z.players[player] !== "Guillaume" || z.revealedHybrids[player] || z.playerLocations[player] === "Brig" || z.lostSouls){
		return false;
	}
	let handValue = 0;
	if(secret){
		handValue = 6*z.skillCardHands[player].length;
	} else {
		for(let j = 0; !(j>=z.skillCardHands[player].length); j++){
			handValue += cardValue(z.skillCardHands[player][j]);
		}
	}
	for(let j = 0; !(j>=z.guillaumeAllies.length); j++){
		if(z.guillaumeAllies[j] === z.playerLocations[player]){
			let cost = d.allyValues[z.allies[j][0]];
			if(handValue >= cost || z.instillBravery === player){
				return true;
			}
		}
	}
	return false;
}

function canEnableTrade(){
	
	if(z.revealedHybrids[me] === 1){
		return false;
	}
	let items = z.items[me].length;
	let anyFound = false;
	/* URULES: revealed traitors can participate in trades, right? */
	for(let j = 0; !(j>=z.playerLocations.length); j++){
		if(j !== me && z.playerLocations[j] === z.playerLocations[me]){
			items += z.items[j].length;
			anyFound = true;
		}
	}
	return anyFound && items > 0;
}

function canAlmanac(){
	if(z.dieRollQueue.length > 0 && z.lastDieRoll === null && itemPresent("Almanac") && itemHolder("Almanac") === me && z.almanac){
		for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
			if(cardColorID(z.skillCardHands[me][j]) === OBSERVATION || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
				return true;
			}
		}
	} 
	return false;
}

function canBookOfDagon(){
	if(!itemPresent("Book of Dagon") || itemHolder("Book of Dagon") !== me || !z.bookOfDagon){
		return false;
	}
	let index = locationIndex(z.playerLocations[me]);
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(z.deepOnes[j] === index){
			return true;
		}
	}
	return false;
}

function canWhistleMove(){
	if(!itemPresent("Whistle") || itemHolder("Whistle") !== me || z.whistle){
		return false;
	}
	for(let j = 0; !(j>=z.allies.length); j++){
		if(z.allies[j][1] !== z.playerLocations[me]){
			return true;
		}
	}
}

function canWhistleSpawn(){
	if(!itemPresent("Whistle") || itemHolder("Whistle") !== me || z.whistle){
		return false;
	}
	return z.allyDeck.length > 0;
}

function canSpiritBoard(){
	return z.phase === 1 && z.turn === me && !z.noRansack && itemPresent("Spirit Board") && itemHolder("Spirit Board") === me && z.allyDeck.length > 0 && !z.spiritBoard;
}

function canValise(){
	return itemPresent("Valise") && itemHolder("Valise") === me && z.itemDeck.length > 0;
}

const MINOR_STRUCTURAL_DAMAGE = 10;

function canRepair(){
	let index = locationIndex(z.playerLocations[me]);
	if(INTERIOR > index || index >= INTERIOR + 6){
		return false;
	}
	if(z.revealedHybrids[me]){
		return false;
	}
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(z.deepOnes[j] === index){
			return false;
		}
	}
	for(let j = 0; !(j>=z.revealedHybrids.length); j++){
		if(z.playerLocations[j] === z.playerLocations[me] && z.revealedHybrids[j]){
			return false;
		}
	}
	/* URULES: this */
	if(z.fromTheAbyss && (z.shoggoth === index || z.drownedSpirit === index)){
		return false;
	}
	let damage = z.damage[index-INTERIOR];
	if(damage === MINOR_STRUCTURAL_DAMAGE){
		return true;
	} else if(damage >= 0){
		let count = 0;
		for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
			if(cardColorID(z.skillCardHands[me][j]) === damage || cardName(z.skillCardHands[me][j]) === "Ingenuity" || damage === TREACHERY){
				count += cardValue(z.skillCardHands[me][j]);
				if(count >= 5 || (count >= 3 && damage !== TREACHERY)){
					return true;
				}
			}
		}
		
	} 
	return false;
}

function canArrestOrder(){
	return z.feats[me].includes("Arrest Order");
}

function canToolKit(){
	if(!itemPresent("Tool Kit") || itemHolder("Tool Kit") !== me || enemiesInMySpace()){
		return false;
	}
	let index = locationIndex(z.playerLocations[me]);
	
	return index >= INTERIOR && INTERIOR + 6 > index && z.damage[index-INTERIOR] !== -1;
}

const FINE_CLOTHES = 11;
const VALISE = 25;

function hasMultipleImprovements(player){
	let count = 0;
	for(let j = 0; !(j>=z.items[player].length); j++){
		if(z.items[player][j] >= FINE_CLOTHES && FINE_CLOTHES+5 > z.items[player][j]){
			count++;
		}
		if(d.itemNames[z.items[player][j]] === "Valise" && z.playerLocations[player] !== "Brig"){
			count--;
		}
	}
	return count > 1;
}

function enemyInSpace(loc){
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(d.spaceNames[z.deepOnes[j]] === loc){
			return true;
		}
	}
	for(let j = 0; !(j>=z.revealedHybrids.length); j++){
		if(z.revealedHybrids[j] && loc === z.playerLocations[j]){
			return true;
		}
	}
	if(z.shoggoth && d.spaceNames[z.shoggoth] === loc){
		return true;
	}
	if(z.graspingTendril && d.spaceNames[z.graspingTendril+8] === loc){
		return true;
	}
	if(z.drownedSpirit && d.spaceNames[z.drownedSpirit] === loc){
		return true;
	}
	return false;
}

function enemiesInMySpace(player,except){
	if(player === undefined){
		player = me;
	}
	let count = 0;
	let loc = z.playerLocations[player];
	if(z.revealedHybrids[player] === 0){
		for(let j = 0; !(j>=z.deepOnes.length); j++){
			if(d.spaceNames[z.deepOnes[j]] === loc){
				count++;
			}
		}
	}
	if(except === "Deep One" && count > 0){
		count--;
	}
	for(let j = 0; !(j>=z.revealedHybrids.length); j++){
		if(z.revealedHybrids[j] !== z.revealedHybrids[player] && loc === z.playerLocations[j] && except !== z.players[j]){
			count++;
		}
	}
	if(z.revealedHybrids[player] === 0 && z.shoggoth && d.spaceNames[z.shoggoth] === loc && except !== "Shoggoth"){
		count++;
	}
	if(z.revealedHybrids[player] === 0 && z.graspingTendril && d.spaceNames[z.graspingTendril+8] === loc && except !== "Grasping Tendril"){
		count++;
	}
	if(z.revealedHybrids[player] === 0 && z.drownedSpirit && d.spaceNames[z.drownedSpirit] === loc && except !== "Drowned Spirit"){
		count++;
	}
	return count;
}

function enemyInAdjacentSpace(player){
	if(player === undefined){
		player = me;
	}
	let loc = z.playerLocations[player];
	if(z.revealedHybrids[player] === 0){
		for(let j = 0; !(j>=z.deepOnes.length); j++){
			if(isAdjacent(loc, d.spaceNames[z.deepOnes[j]])){
				return true;
			}
		}
	}
	for(let j = 0; !(j>=z.revealedHybrids.length); j++){
		if(z.revealedHybrids[j] !== z.revealedHybrids[player] && isAdjacent(loc, z.playerLocations[j])){
			return true;
		}
	}
	if(z.revealedHybrids[player] === 0 && z.shoggoth && isAdjacent(loc,d.spaceNames[z.shoggoth])){
		return true;
	}
	if(z.revealedHybrids[player] === 0 && z.graspingTendril && isAdjacent(loc,d.spaceNames[z.graspingTendril])){
		return true;
	}
	if(z.revealedHybrids[player] === 0 && z.graspingTendril && (isAdjacent(loc,d.spaceNames[z.graspingTendril]) || isAdjacent(loc,d.spaceNames[z.graspingTendril+8]))){
		return true;
	}
	return false;
}

function isInOrAdjacent(loc1,loc2){
	return loc1 === loc2 || isAdjacent(loc1,loc2);
}

function isAdjacent(loc1,loc2){
	switch(loc1){
		case "Bridge":
		switch(loc2){
			case "Deck Space 1":
			case "Deck Space 2":
			case "Chapel":
			case "Captain's Cabin":
			return true;
			default:
			return false;
		}
		case "Chapel":
		switch(loc2){
			case "Deck Space 3":
			case "Bridge":
			case "Captain's Cabin":
			case "Cargo Hold":
			case "Sick Bay":
			return true;
			default:
			return false;
		}
		case "Captain's Cabin":
		switch(loc2){
			case "Deck Space 4":
			case "Bridge":
			case "Chapel":
			case "Galley":
			case "Sick Bay":
			return true;
			default:
			return false;
		}
		case "Cargo Hold":
		switch(loc2){
			case "Deck Space 5":
			case "Boiler Room":
			case "Galley":
			case "Chapel":
			case "Brig":
			return true;
			default:
			return false;
		}
		case "Galley":
		switch(loc2){
			case "Deck Space 6":
			case "Boiler Room":
			case "Captain's Cabin":
			case "Cargo Hold":
			case "Brig":
			return true;
			default:
			return false;
		}
		case "Boiler Room":
		switch(loc2){
			case "Deck Space 7":
			case "Deck Space 8":
			case "Cargo Hold":
			case "Galley":
			return true;
			default:
			return false;
		}
		case "Deck Space 1":
		switch(loc2){
			case "Water Space 1":
			case "Deck Space 2":
			case "Deck Space 3":
			case "Bridge":
			return true;
			default:
			return false;
		}
		case "Deck Space 2":
		switch(loc2){
			case "Water Space 2":
			case "Deck Space 1":
			case "Deck Space 4":
			case "Bridge":
			return true;
			default:
			return false;
		}
		case "Deck Space 3":
		switch(loc2){
			case "Water Space 3":
			case "Deck Space 1":
			case "Deck Space 5":
			case "Chapel":
			return true;
			default:
			return false;
		}
		case "Deck Space 4":
		switch(loc2){
			case "Water Space 4":
			case "Deck Space 2":
			case "Deck Space 6":
			case "Captain's Cabin":
			return true;
			default:
			return false;
		}
		case "Deck Space 5":
		switch(loc2){
			case "Water Space 5":
			case "Deck Space 3":
			case "Deck Space 7":
			case "Cargo Hold":
			return true;
			default:
			return false;
		}
		case "Deck Space 6":
		switch(loc2){
			case "Water Space 6":
			case "Deck Space 4":
			case "Deck Space 8":
			case "Galley":
			return true;
			default:
			return false;
		}
		case "Deck Space 7":
		switch(loc2){
			case "Water Space 7":
			case "Deck Space 5":
			case "Deck Space 8":
			case "Boiler Room":
			return true;
			default:
			return false;
		}
		case "Deck Space 8":
		switch(loc2){
			case "Water Space 8":
			case "Deck Space 6":
			case "Deck Space 7":
			case "Boiler Room":
			return true;
			default:
			return false;
		}
		case "Water Space 1":
		switch(loc2){
			case "Deck Space 1":
			case "Water Space 2":
			case "Water Space 3":
			return true;
			default:
			return false;
		}
		case "Water Space 2":
		switch(loc2){
			case "Deck Space 2":
			case "Water Space 1":
			case "Water Space 4":
			return true;
			default:
			return false;
		}
		case "Water Space 3":
		switch(loc2){
			case "Deck Space 3":
			case "Water Space 1":
			case "Water Space 5":
			return true;
			default:
			return false;
		}
		case "Water Space 4":
		switch(loc2){
			case "Deck Space 4":
			case "Water Space 2":
			case "Water Space 6":
			return true;
			default:
			return false;
		}
		case "Water Space 5":
		switch(loc2){
			case "Deck Space 5":
			case "Water Space 3":
			case "Water Space 7":
			return true;
			default:
			return false;
		}
		case "Water Space 6":
		switch(loc2){
			case "Deck Space 6":
			case "Water Space 4":
			case "Water Space 8":
			return true;
			default:
			return false;
		}
		case "Water Space 7":
		switch(loc2){
			case "Deck Space 7":
			case "Water Space 5":
			case "Water Space 8":
			return true;
			default:
			return false;
		}
		case "Water Space 8":
		switch(loc2){
			case "Deck Space 8":
			case "Water Space 6":
			case "Water Space 7":
			return true;
			default:
			return false;
		}
		case "Sick Bay":
		switch(loc2){
			case "Chapel":
			case "Captain's Cabin":
			return true;
			default:
			return false;
		}
		case "Brig":
		switch(loc2){
			case "Cargo Hold":
			case "Galley":
			return true;
			default:
			return false;
		}
	}
	
}

function resolveDefeatContext(player){
	let context = z.defeats[player].shift();
	if(context === "Cast"){
		if(!canResolveDefeatHumanContext("Cast") && !canResolveDefeatTraitorContext("Cast")){
			doneWithRitual();
		}
	} else if (context === "Shrivelling"){
		if(z.midAction === "Shrivelling"){
			finishedAction();
		}
	} else if(Array.isArray(context) && context[0] === "PVP"){
		doneWithAttack(context[1]);		
	} else if(context === "Damage Location"){
		for(let j = DECK; !(j>=SICK_BAY); j++){
			fleeCheck(j);
		}
		if(!canResolveDefeatHumanContext("Damage Location")){
			doneWithDamage();
		}
	} else if(context === "Summon the Beast Within"){
		if(z.defeats[player].length === 0 && z.revealedHybrids[player]){
			beastWithinFiddle();
		}
		if(!z.revealedHybrids[player] && !canResolveDefeatHumanContext("Summon the Beast Within")){
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
	} else if(context === "Deep One"){
		resumeDeepOneActivation();
	} else if(context === "Grasping Tendril"){
		doneWithGraspingTendril();
	} else if(Array.isArray(context) && context[0] === "Shoggoth"){
		let params = context[1];
		if(params.length === 0){
			doneWithShoggoth();
		} else if (params.length === 1){
			plainAlert("SHOGGOTH_ATTACKS_HUMAN",params[0],getGender(getPlayerNum(params[0])));
			NoSPToken("SHOGGOTH_VS_HUMAN",params);
		} else {
			boldAlert("SHOGGOTH_MULTIPLE_HUMANS",[z.players[z.turn],d.spaceNames[z.shoggoth]]);
			addOption(z.turn,"Choose the next Shoggoth target",params,true);
		}
	} else if(Array.isArray(context) && (context[0] === "Jam Tin Grenade" || context[0] === "Don the Mask")){
		let any = false;
		for(let j = 0; !any && !(j>=z.numPlayers); j++){
			if(hasOption(j,"Defeat a passenger in a space")){
				any = true;
			}
			for(let k = 0; !(k>=z.defeats[j].length); k++){
				if(Array.isArray(z.defeats[j][k]) && (z.defeats[j][k][0] === "Jam Tin Grenade" || z.defeats[j][k][0] === "Don the Mask")){
					any = true;
					break;
				}
			}
		}
		if(!any){
			
			let goodToGo = true;
			if(z.fromTheAbyss){
				for(let j = 0; !(j>=z.allies.length); j++){
					if(context[1] === z.allies[j][1]){
						if(characterPresent("Guillaume")){
							plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
							z.guillaumeAllies.push(z.allies[j][0]);
						} else {
							plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
							
						}
						z.allies.splice(j,1);
						j--;
					}
				}
				if(z.guillaumeAllies.length > 3){
					boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
					addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game",context,true);
					goodToGo = false;
				}
			}
			if(goodToGo){
				let index = locationIndex(context[1]);
				if(index >= INTERIOR && INTERIOR + 6 > index && context[0] === "Jam Tin Grenade"){
					if(damageLocation(d.spaceNames[index],undefined,"Jam Tin Grenade")){
						if(z.midAction === "Jam Tin Grenade"){
							finishedAction();
						}
					}
				} else {
					finishedAction();
				}
			}
		}
	} else if (context === "Rain Fire"){
		let any = canResolveDefeatHumanContext("Rain Fire");
		for(let j = 0; !any && !(j>=z.numPlayers); j++){
			if(hasOption(j,"Defeat a passenger in a space")){
				any = true;
			}
		}
		if(!any){
			doneWithRevealEffect(getPlayerNum("Jamie"));
		}
		
	} else if (context === "Signs of Life" || context === "Exorcism" || context === "Cursed Whispers" || context === "Offering" || context === "Price of Power"){
		doneWithChoiceMythos();
	} else if(context === "Fear of the Unknown" || context === "Unseen Follower" || context === "Terrified Sailor"){
		clearSkillCheck();
	} else if (context === "Sewage Backup"){
		if(!canResolveDefeatHumanContext("Sewage Backup")){
			clearSkillCheck();
		}
	} else if(context === "Gift of the Mother"){
		clearSkillCheck();
	} else if(context === "Firemen Strike"){
		let any = false;
		for(let j = 0; !any && !(j>=z.numPlayers); j++){
			if(hasOption(j,"Discard a Skill Card")){
				any = true;
			}
		}
		if(!any){
			clearSkillCheck();
		}
	}

	/* UTODO: this */
}


function defeat(player,context){
	
	/* URULES: does this take priority over other preventions? */
	/* URULES: does this get burned up if the player is in Sick Bay / Brig? */
	
	let fleshWard = z.fleshWard === player;
	
	if(z.playerLocations[player] === "Brig" && !fleshWard){
		plainAlert("DEFEAT_IN_BRIG",z.players[player]);
		return true;
	}
	if(z.playerLocations[player] === "Sick Bay" && !z.revealedHybrids[player] && !fleshWard){
		plainAlert("DEFEAT_IN_SICK_BAY",z.players[player]);
		return true;
	}
	
	let healingWords = characterPresent("Svetlana") && z.possibleColors[getPlayerNum("Svetlana")][LORE] === 1;
	let medicalIntervention = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
			medicalIntervention = true;
			break;
		}
	}
	let starbuck = itemPresent("Starbuck") && (itemHolder("Starbuck") === player);
	let shrugItOff = z.possibleColors[player][STRENGTH] === 1;
	
	
	if(!healingWords && !medicalIntervention && !starbuck && !shrugItOff){
		if(fleshWard){
			plainAlert("FLESH_WARD_ACTIVATES",z.players[player]);
			delete z.fleshWard;
			SPTokenBad("Flesh Ward",player);
			z.defeats[player].push(context);
			return false;
		} else {
			addAlert("PLAYER_DEFEATED",z.players[player]);
			if(z.revealedHybrids[player] === 0){
				movePlayer(player,"Sick Bay");
			} else {
				movePlayer(player,"Brig");
			}
			while(z.defeats[player].length > 0){
				resolveDefeatContext(player);
			}
			return true;
		}
	}
	z.defeats[player].push(context);
	if(fleshWard){
		boldAlert("FLESH_WARD_COULD_TRIGGER",[z.players[player],z.players[z.turn]]);
	} else {
		boldAlert("IMMINENT_DEFEAT",z.players[player]);
	}
	if(healingWords && medicalIntervention){
		plainAlert("SVETLANA_PAUSE");
	} else if(healingWords){
		plainAlert("HEALING_WORDS_PAUSE");
	} else if(medicalIntervention){
		plainAlert("MEDICAL_INTERVENTION_DEFEAT_PAUSE");
	}
	if(shrugItOff){
		plainAlert("SHRUG_IT_OFF_PAUSE",z.players[player]);
	}
	if(starbuck){
		plainAlert("STARBUCK_PAUSE",z.players[player]);
	}
	return false;
}

function canHealingWords(){
	if(!characterPresent("Svetlana") || z.players[me] !== "Svetlana"){
		return false;
	}
	let defeats = 0;
	for(let j = 0; !(j>=z.defeats.length); j++){
		defeats += z.defeats[j].length;
	}
	if(defeats === 0){
		return false;
	}
	for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
		if(cardColorID(z.skillCardHands[me][j]) === LORE || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
			return true;
		}
	}
	return false;
}

function canMedicalInterventionCharacter(){
	if(!z.feats[me].includes("Medical Intervention") || z.playerLocations[me] == "Brig"){
		return false;
	}
	let defeats = 0;
	for(let j = 0; !(j>=z.defeats.length); j++){
		defeats += z.defeats[j].length;
	}
	return defeats !== 0;
}

function canSacrificeStarbuck(){
	return itemPresent("Starbuck") && itemHolder("Starbuck") === me && z.defeats[me].length > 0;
}

function canResolveDefeatHumanContext(context){
	let defeats = 0;
	for(let j = 0; !(j>=z.defeats.length); j++){
		if(!z.revealedHybrids[j]){
			for(let k = 0; !(k>=z.defeats[j].length); k++){
				if(z.defeats[j][k] === context){
					defeats++;
				}
			}
		}
	}
	return defeats !== 0;
}

function canResolveDefeatTraitorContext(context){
	let defeats = 0;
	for(let j = 0; !(j>=z.defeats.length); j++){
		if(z.revealedHybrids[j]){
			for(let k = 0; !(k>=z.defeats[j].length); k++){
				if(z.defeats[j][k] === context){
					defeats++;
				}
			}
		}
	}
	return defeats !== 0;
}

function canResolveDefeatHuman(){
	let defeats = 0;
	for(let j = 0; !(j>=z.defeats.length); j++){
		if(!z.revealedHybrids[j] && j !== z.fleshWard){
			defeats += z.defeats[j].length;
		}
	}
	return defeats !== 0;
}

function canResolveDefeatTraitor(){
	let defeats = 0;
	for(let j = 0; !(j>=z.defeats.length); j++){
		if(z.revealedHybrids[j] && j !== z.fleshWard){
			defeats += z.defeats[j].length;
		}
	}
	return defeats !== 0;
}

function canResolveFleshWard(){
	if(z.fleshWard === undefined){
		return false;
	}
	return z.defeats[z.fleshWard].length > 0;
}

function canShrugItOff(){
	if(z.defeats[me].length === 0){
		return false;
	}
	for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
		if(cardName(z.skillCardHands[me][j]) === "Shrug It Off"){
			return true;
		}
	}
	return false;
}

function canCombatTraining(){
	if((z.lastDieRoll !== "PLAYER_VS_PLAYER" && z.lastDieRoll !== "HUMAN_VS_DEEP_ONE" && z.lastDieRoll !== "DEEP_ONE_VS_HUMAN" && 
	    z.lastDieRoll !== "PLAYER_VS_HORROR" && z.lastDieRoll !== "SHOGGOTH_VS_HUMAN" && z.lastDieRoll !== "GRASPING_TENDRIL_VS_HUMAN" &&
		z.lastDieRoll !== "RUFFIAN_VS_DEEP_ONE" && z.lastDieRoll !== "RUFFIAN_VS_HORROR" && z.lastDieRoll !== "RUFFIAN_VS_PLAYER")){
		return false;
	}
	for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
		if(cardName(z.skillCardHands[me][j]) === "Combat Training"){
			return true;
		}
	}
	return false;
}


function movePlayer(player, location, lowestCaptain, lowestKeeper, context, noAuto) {
	/* URULES: this */
	/*if(z.playerLocations[player] === "Brig" && location !== "Brig" && z.revealedHybrids[player] === 0) {
		if(z.playerLocations[z.captain] === "Brig" && player !== z.captain) {
			z.captain = player;
			printlnBold("NEW_CAPTAIN",z.players[player]);
		}
	}
	if(z.playerLocations[player] === "Brig" && location !== "Brig" && z.revealedHybrids[player] === 0) {
		if(z.playerLocations[z.keeper] === "Brig" && player !== z.keeper) {
			z.keeper = player;
			printlnBold("NEW_KEEPER",z.players[player]);
		}
	}*/
	let oldLocation = z.playerLocations[player];
	if(location === oldLocation){
		return true;
	}
	z.playerLocations[player] = location;
	
	if(player !== me || location === "Brig" || location === "Sick Bay") {
		printlnBold("PLAYER_IS_MOVED",[z.players[player],location]);
	} else {
		printlnBold("PLAYER_MOVES",[z.players[player],location]);
	}
	if(location === "Brig" && player === z.captain) {
		passCaptain(d.captainSuccession[getCharacter(z.players[z.captain])],lowestCaptain);
	}
	if(location === "Brig" && player === z.keeper) {
		passKeeper(d.keeperSuccession[getCharacter(z.players[z.keeper])],lowestKeeper);
	}
	if(!z.revealedHybrids[player]){
		fleeCheck(locationIndex(oldLocation));
	}
	if(z.revealedHybrids[player]){
		fleeCheck(locationIndex(location));
	}
	if(z.senseOfPropriety !== undefined && z.playerLocations[z.senseOfPropriety] === location){
		let count = 0;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.playerLocations[j] === z.playerLocations[player]){
				count++;
			}
		}
		if(count >= 2){
			return promptDiscards(z.senseOfPropriety,2,["Sense of Propriety",context],noAuto);
		}
	} else {
		return true;
	}
	/* ATODO: context handling */
}

function difficultyTemplate() {
	if(arguments.length === 0) {
		let text = "";
		if(z.currentSkillCheck === "Captain's Cabin" || z.currentSkillCheck === "Brig" || z.currentSkillCheck === "Memory of the Deep" || z.currentSkillCheck === "Security Officer") {
			text = lc(z.currentSkillCheck);
			if(z.currentSkillCheck === "Captain's Cabin" || z.currentSkillCheck === "Security Officer") {
				text += " vs. " + lc(z.players[z.thisTarget]);
			} else if(z.currentSkillCheck === "Brig") {
				text += " (" + lc(z.players[z.thisTarget]) + ")";
			}
		} else {
			text = lc(d.mythosNames[z.currentSkillCheck]);
		}
		if(z.thisDifficulty){
			text += " - ";
			text += z.thisDifficulty;
		}
		if(z.thisPartial > 0 && z.thisDifficulty > z.thisPartial) {
			text += "(" + z.thisPartial + ")";
		}
		/* UTODO: localization */
		if(z.thisInfluence) {
			text += colorText("orange", "Y");
		}
		if(z.thisLore) {
			text += colorText("purple", "P");
		}
		if(z.thisObservation) {
			text += colorText("green", "G");
		}
		if(z.thisStrength) {
			text += colorText("red", "R");
		}
		if(z.thisWill) {
			text += colorText("blue", "B");
		}
		return bold(text);
	} else {
		let x = arguments[0];
		let text = lc(d.mythosNames[x]);
		if(d.difficulty[x] !== 0) {
			text += " - " + d.difficulty[x];
			if(d.partial[x] > 0) {
				text += "(" + d.partial[x] + ")";
			}
			if(d.positives[0][x] > 0) {
				text += colorText("orange", "Y");
			}
			if(d.positives[1][x] > 0) {
				text += colorText("purple", "P");
			}
			if(d.positives[2][x] > 0) {
				text += colorText("green", "G");
			}
			if(d.positives[3][x] > 0) {
				text += colorText("red", "R");
			}
			if(d.positives[4][x] > 0) {
				text += colorText("blue", "B");
			}
		}
		return bold(text);
	}
} /* TODO: Calc CO? */ /* TODO: Include played SP in card count here? */



function DEToken() {
	z.deToken = true; /* TODO: make sure this works */
	let qre = new RegExp('\\[q' +  '="TMR: Determination"\\]((?!(\\[q' +  '=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = "[q" +  '="TMR: Determination"]' + bold(size(colorText("blue", "Determination"), 14)) + "\r\n";
	text += lc("Looking for ") + colorText("blue", lc("Determination"));
	let options = [];
	if(itemPresent('"Lucky" Ring') && !z.luckyRing){
		options.push(lc('"Lucky" Ring'));
	}
	for(let j=0; !(j>=z.numPlayers); j++){
		if(z.feats[j].includes("Well Equipped") && z.playerLocations[j] !== "Brig" && z.items[j].length > 0){
			options.push(lc("Well Equipped"));
		}
		if(z.feats[j].includes("Revelation") && z.playerLocations[j] !== "Brig" && z.skillCardHands[j].length > 0){
			options.push(lc("Revelation"));
		}
		if(z.feats[j].includes("Instinct") && z.playerLocations[j] !== "Brig"){
			options.push(lc("Instinct"));
		}
	}
	if(z.revelation !== undefined){
		options.push(lc("Revelation of Script"));
	}
	if(characterPresent("Keilani") && z.playerLocations[getPlayerNum("Keilani")] !== "Brig" && !z.experienced && z.skillCardHands[getPlayerNum("Keilani")].length > 0){
		options.push(lc("Experienced"));
	}
	
	if(options.length === 1){
		text += lc(" or ")+options[0];
	} else {
		for(let j = 0; !(j>=options.length); j++){
			text += ", ";
			if(j === options.length - 1){
				text += lc(" or ");
			}
			text += options[j];
		}
	}
	text += ".\r\n";
	text += "\r\n";
	for(let i = z.turn; !(i >= z.turn + z.numPlayers); i++) {
		let interruptPlayer = i % z.numPlayers;
		text += z.players[interruptPlayer] + " (" + z.skillCardHands[interruptPlayer].length + ") - ";
		let luckyRing = itemPresent('"Lucky" Ring') && !z.luckyRing && itemHolder('"Lucky" Ring') === interruptPlayer;
		let wellEquipped = z.feats[interruptPlayer].includes("Well Equipped") && z.playerLocations[interruptPlayer] !== "Brig" && z.items[interruptPlayer].length > 0;
		let revelationFeat = z.feats[interruptPlayer].includes("Revelation") && z.playerLocations[interruptPlayer] !== "Brig" && z.skillCardHands[interruptPlayer].length > 0;
		let instinct = z.feats[interruptPlayer].includes("Instinct") && z.playerLocations[interruptPlayer] !== "Brig";
		
		let revelationOfScript = z.revelation === interruptPlayer;
		if(z.des[interruptPlayer].length > 0 && z.des[interruptPlayer][0][0] === "Pass") {
			text += "Pass";
		} else if(z.des[interruptPlayer].length > 0) {
			for(let j = 0; !(j>=z.des[interruptPlayer].length); j++){
				if(j !== 0){
					text += ", ";
				}
				if(z.des[interruptPlayer][j][0] === '"Lucky" Ring'){
					text += lc('"Lucky" Ring');
				} else if(z.des[interruptPlayer][j][0] === "Well Equipped"){
					text += lc("Well Equipped");
				} else if(z.des[interruptPlayer][j][0] === "Instinct"){
					text += lc("Instinct");
				} else {
					text += cardText(z.des[interruptPlayer][j][0]);
				}
				let val = z.des[interruptPlayer][j][1];
				if(val > 0){
					text += " (+"+val+")";
				} else {
					text += " ("+val+")";
				}
			}
		} else if(z.skillCardHands[interruptPlayer].length === 0 && !luckyRing && !wellEquipped && !revelationOfScript && !revelationFeat && !instinct) {
			text += "PASS: No Cards";
		} else if(z.possibleColors[interruptPlayer][WILL] === 0 && !luckyRing && !wellEquipped && !revelationOfScript && !revelationFeat && !instinct) {
			text += "PASS: No Will";
		}
		text += "\r\n";
	}
	text += "\r\n"+skillCheckTally(true)[0];
	/* UTODO: add conflict resolved by current player reminder */
	text += "[/" + "q]\r\n";
	t.value += text;
}

function SPToken(eventName) {
	let sanitizedName = eventName.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
	let qre = new RegExp('\\[q' +  '="TMR: Interrupts for ' + sanitizedName + '"\\]((?!(\\[q' +  '=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = '[q=' +  '"TMR: Interrupts for ' + eventName + '"]\r\n';
	text += bold(size(lc("Interrupts for ") + eventName, 14)) + "\r\n";
	text += lc("Looking for ") + colorText("green", lc("Keen Insight"));
	let options = [];
	
	if(itemPresent("Almanac") && z.possibleColors[itemHolder("Almanac")][OBSERVATION] && z.almanac){
		options.push("Almanac");
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.feats[j].includes("Perfect Number")){
			options.push("Perfect Number");
			break;
		}
	}
	if(characterPresent("Kokoj") && canEldritchInfluence(getPlayerNum("Kokoj"))){
		options.push("Eldritch Influence");
	}
	if(options.length === 1){
		text += lc(" or ")+lc(options[0]);
	} else {
		for(let j = 0; !(j>=options.length); j++){
			text += ", ";
			if(j === options.length - 1){
				text += lc(" or ");
			}
			text += lc(options[j]);
		}
	}
	
	text += ".\r\n";
	if(characterPresent("Edmund") && z.skillCardHands[getPlayerNum("Edmund")].length > 0 && z.playerLocations[getPlayerNum("Edmund")] !== "Brig") {
		text += lc("FORTUNATE_SON_REMINDER")+"\r\n";
	}
	if(z.pocketPistol){
		text += lc("POCKET_PISTOL_REMAINDER",z.players[z.dieRoller])+"\r\n";
	}
	
	if(eventName === "HUMAN_VS_DEEP_ONE" || eventName === "PLAYER_VS_PLAYER" || eventName === "DEEP_ONE_VS_HUMAN" ||
	   eventName === "PLAYER_VS_HORROR" || eventName === "GRASPING_TENDRIL_VS_HUMAN" || eventName === "SHOGGOTH_VS_HUMAN" ||
	   eventName === "RUFFIAN_VS_DEEP_ONE" || eventName === "RUFFIAN_VS_HORROR" || eventName === "RUFFIAN_VS_PLAYER"){
		for(let j = 0; !(j>=z.possibleColors.length); j++){
			if(z.possibleColors[j][STRENGTH]){
				text += lc("COMBAT_TRAINING_REMINDER")+"\r\n";
				break;
			}
		}
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(canUncannyLuck(j)){
			text += lc("UNCANNY_LUCK_REMINDER",z.players[j])+"\r\n";
			break;
		}
	}
	
	if(itemPresent("Maau") && (z.turn === itemHolder("Maau") || z.actionPerformer === itemHolder("Maau") || z.xoPerformers.includes(itemHolder("Maau"))) && !z.maau){
		text += lc("MAAU_REMINDER",z.players[itemHolder("Maau")]);
	}
	if((eventName === "PLAYER_VS_PLAYER" || eventName === "HUMAN_VS_DEEP_ONE" || eventName === "PLAYER_VS_HORROR") && itemPresent("Baseball Bat") &&
	    Array.isArray(z.dieRollParams[0]) && z.dieRollParams[0].length === 2 && z.dieRollParams[0][2] === "Baseball Bat"){
		text += lc("BASEBALL_BAT_REMINDER",z.players[itemHolder("Baseball Bat")]);
	}
	
	for(let i = z.turn; !(i >= z.turn + z.numPlayers); i++) {
		let interruptPlayer = i % z.numPlayers;
		text += "\r\n"+z.players[interruptPlayer] + " (" + z.skillCardHands[interruptPlayer].length + ") - ";

		if(z.sps[interruptPlayer].length > 0 && z.sps[interruptPlayer][0][0] === "Pass") {
			text += lc("Pass");
		} else if(z.sps[interruptPlayer].length > 0) {
			for(let j = 0; !(j>=z.sps[interruptPlayer].length); j++){
				if(j !== 0){
					text += ", ";
				}
				text += cardText(z.sps[interruptPlayer][j][0]);
				let val = z.sps[interruptPlayer][j][1];
				if(val > 2){
					text += " (+"+val+", "+lc("Almanac")+")";
				} else if(val > 0){
					text += " (+"+val+")";
				} else {
					text += " ("+val+")";
				}
			}
		} else if(z.skillCardHands[interruptPlayer].length === 0) {
			text += lc("PASS: No Cards");
		} else if(z.possibleColors[interruptPlayer][OBSERVATION] === 0) {
			text += lc("PASS: No Observation");
		}
	}

	if(z.dieRollModifier > 0){
		text += "\r\n\r\n"+bold(lc("Total Modifier: ")+"+"+z.dieRollModifier);
	} else {
		text += "\r\n\r\n"+bold(lc("Total Modifier: ")+z.dieRollModifier);
	}
	text += "[/" + "q]\r\n";
	t.value += text;
}


/* UTODO: check roller functionality */
function SPTokenBad(eventName, eventParams, roller) {
	z.dieRollQueue.push(eventName);
	z.dieRollParams.push(eventParams);
	let theRoller = roller;
	if(roller === undefined) {
		theRoller = me;
	}
	if(z.dieRollQueue.length === 1) {
		addAlert("ASKING_FOR_KEEN_INSIGHT",lc(eventName,eventParams));
		if(characterPresent("Edmund") && z.skillCardHands[getPlayerNum("Edmund")].length > 0 && z.playerLocations[getPlayerNum("Edmund")] !== "Brig") {
			addAlert("FORTUNATE_SON_REMINDER");
		}
		if(z.pocketPistol){
			addAlert("POCKET_PISTOL_REMAINDER",z.players[z.dieRoller]);
		}
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(canUncannyLuck(j)){
				addAlert("UNCANNY_LUCK_REMINDER",z.players[j]);
				break;
			}
		}
		if(itemPresent("Maau") && (z.turn === itemHolder("Maau") || z.actionPerformer === itemHolder("Maau") || z.xoPerformers.includes(itemHolder("Maau"))) && !z.maau){
			addAlert(lc("MAAU_REMINDER",z.players[itemHolder("Maau")]));
		}
		if((eventName === "PLAYER_VS_PLAYER" || eventName === "HUMAN_VS_DEEP_ONE" || eventName === "PLAYER_VS_HORROR") && itemPresent("Baseball Bat") &&
			Array.isArray(z.dieRollParams[0]) && z.dieRollParams[0].length === 2 && z.dieRollParams[0][2] === "Baseball Bat"){
			addAlert(lc("BASEBALL_BAT_REMINDER",z.players[itemHolder("Baseball Bat")]));
		}
		if(eventName === "HUMAN_VS_DEEP_ONE" || eventName === "PLAYER_VS_PLAYER" || eventName === "DEEP_ONE_VS_HUMAN" ||
		   eventName === "PLAYER_VS_HORROR" || eventName === "SHOGGOTH_VS_HUMAN" || eventName === "GRASPING_TENDRIL_VS_HUMAN" ||
		   eventName === "RUFFIAN_VS_DEEP_ONE" || eventName === "RUFFIAN_VS_HORROR" || eventName === "RUFFIAN_VS_PLAYER"){
			for(let j = 0; !(j>=z.possibleColors.length); j++){
				if(z.possibleColors[j][STRENGTH]){
					addAlert("COMBAT_TRAINING_REMINDER");
					break;
				}
			}
		}
		z.dieRoller = theRoller;
		z.spToken = true;
		SPToken(lc(eventName,eventParams));
	}
}

function beastWithinFiddle(){
	for(let j = 0; !(j>=z.dieRollQueue.length); j++){
		if(z.dieRollQueue[j] === "SUMMON_THE_BEAST_WITHIN"){
			z.dieRollParams[j]--;
			if(z.dieRollParams[j] === 1){
				z.dieRollParams.splice(j,1);
				z.dieRollQueue.splice(j,1);
				plainAlert("SUMMON_THE_BEAST_WITHIN_FIDDLE");
				break;
			}
		}
	}
}

/* UTODO: check roller functionality */
function NoSPToken(eventName, eventParams) {
	z.dieRollQueue.push(eventName);
	z.dieRollParams.push(eventParams);
	/* UTODO: do we care about who rolls a die? */
	if(z.dieRollQueue.length === 1) {
		z.dieRoller = me;
	}
}

function playSpell(pos, peek) {
	let spell = -1;
	if(peek === "Quick Cast") {
		spell = pos;
	} else if(peek){
		spell = z.spellPeek[pos];
		z.spellPeek.splice(pos, 1);
	}
	boldAlert("PLAY_CARD_ALERT",[z.players[me],d.spellNames[spell]]);

	switch(d.spellNames[spell]){
		case "Raise the Dead":
			if(decreaseSanity()){
				increaseSouls();
				increaseSouls();
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
			break;
		case "Revelation of Script":
			plainAlert("DRAW_ONE_ITEM",[z.players[me],"Revelation of Script"],getGender(me));
			z.revelation = me;
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			break;
		case "Alchemical Transmutation":
			if(decreaseFood()){
				increaseFuel();
				increaseFuel();
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
			break;
		case "Flesh Ward":
			addAlert("FLESH_WARD_ALERT");
			addOption(me,"Assign Flesh Ward",undefined,true);
			break;
		case "Foresee":
			addOption(me,"Scout the Mythos deck","Foresee",true);
			addOption(me,"Scout the Waypoint deck","Foresee",true);
			addAlert("FORESEE_ALERT");
			break;
		case "Lure Monster":
			z.mother = DEEP;
			z.father = DEEP;
			SPTokenBad("Lure Monster");
			break;
		case "Astral Travel":
			plainAlert("ASTRAL_TRAVEL_ALERT",z.players[me]);
			addOption(me,"[Astral Travel] Choose a space",undefined,true);
			break;
		case "Greater Banishment":
	    case "Greater Banishment (A)": {
			if(advanceRitual()){
				if(advanceRitual()){
					SPTokenBad("Greater Banishment");
				} else {
					z.extraRitual = "Greater Banishment 0";
					plainAlert("GREATER_BANISHMENT");
				}
			} else {
				plainAlert("EXTRA_RITUAL_COORDINATION_1");
				z.extraRitual = "Greater Banishment 1";
			}
			
			break;
		}
		case "Summon the Beast Within":
			addOption(me,"[Summon the Beast Within] Move",undefined,true);
			addOption(me,"[Summon the Beast Within] Don't move",undefined,true);
			/* URULES: if an enemy prevents defeat, this affects the roll, right? */
			plainAlert("SUMMON_THE_BEAST_WITHIN_ALERT",z.players[me],getGender(me));
			break;
		case "Summon Fire":
			if(advanceTravel()){
				SPTokenBad("Summon Fire");
			} else if(!z.gameOver){
				z.extraTravel = "Summon Fire 1";
				plainAlert("SUMMON_FIRE_TRAVEL_ALERT");
			}
			break;
		case "Call Down the Storm": {
			let count = 0;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] >= WATER && DECK > z.deepOnes[j]){
					z.deepOnes[j] = RESERVES;
					count++;
				}
			}
			if(count === 0){
				plainAlert("No Effect.");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else if (count === 1){
				plainAlert("CALL_DOWN_THE_STORM_ALERT_1");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else {
				plainAlert("CALL_DOWN_THE_STORM_ALERT",count);
				if(count > 8){
					if(damageShip("Spell")){
						if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
							finishedAction();
						}
						if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
					}
				} else {
					SPTokenBad("CALL_DOWN_THE_STORM",count);
				}
			}
			break;
		}
		case "Feed the Mind":
			if(decreaseFood()){
				increaseSanity();
				increaseSanity();
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
			break;
		case "Heal":
			for(let j = 0; !(j>=z.playerLocations.length); j++){
				if(z.revealedHybrids[j] === 0){
					if(z.playerLocations[j] === "Sick Bay"){
						addOption(j,"Move","Heal",true);
					} else if(z.cursedWhispers === j){
						addOption(j,"Trigger Cursed Whispers",undefined,false);
					} else {						
						addOption(j,"Draw 1 Skill Card","Heal",false);
					}
				} 
			}
			plainAlert("HEAL_ALERT");
			SPTokenBad("Heal");
			break;
		case "Dark Pact":
			shuffleTreachery(4);
			addOption(me,"Increase a resource","Dark Pact",true);
			break;
		case "Plague of Locusts":
			SPTokenBad("Plague of Locusts",me);
			break;
		case "Cloud Memory": {
			increaseSanity();
			let done = true;
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(z.revealedHybrids[k] === 0){					
					done = promptDiscards(k,1,"Cloud Memory",!done) && done;
				}
			}
			if(done){
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
			break;
		}
		case "Voice of Ra":
			/* UTODO: make sure roll doesn't occur until everyone draws */
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(z.revealedHybrids[j] === 0){
					if(j === z.cursedWhispers){
						SPTokenBad("Cursed Whispers");
					} else if(z.fromTheAbyss){
						addOption(j,"Draw 1 Skill Card (not treachery/boon)",undefined,true);
					} else {
						addOption(j,"Draw 1 Skill Card (any color but treachery)",undefined,true);
					}
				}
			}
			SPTokenBad("Voice of Ra");
			break;
		case "Call Friends":
			if(numSpacePassengers() === 0){
				plainAlert("No effect.");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else {
				plainAlert("CALL_FRIENDS_ALERT",z.players[me]);
				addOption(me,"Rescue a Passenger",["Call Friends",0],true);
				addOption(me,"I'm done rescuing passengers",["Call Friends",0],true);
			}
			break;
		case "Conjuration":
			/* URULES: if there aren't 5 items in the item deck, you have to keep one, right? */
			if(z.itemDeck.length === 0){
				SPTokenBad("Conjuration");
			} else if(z.itemDeck.length === 1){
				drawItem(me);
				SPTokenBad("Conjuration");
			} else {
				let items = [];
				let alertText = lc("You drew:");
				for(let j = 0; !(j>=5); j++){
					let item = z.itemDeck.pop();
					alertText += "\n"+lc(d.itemNames[item]);
					items.push(item);
					if(z.itemDeck.length === 0){
						break;
					}
				}
				alertText += "\n"+lc("CONJURATION_ALERT");
				addAlert(alertText);
				addOption(me,"Place an Item in in your play area",["Conjuration",items],true);
			}
			break;
		case "Blessing":
			addAlert("BLESSING_ALERT");
			addOption(me,"[Blessing] Bless a player",undefined,true);
			break;
		case "Cast Out": {
			let any = (z.shoggoth && z.shoggoth >= DECK) || (z.drownedSpirit && z.drownedSpirit >= DECK) || z.graspingTendril;
			let any2 = any;
			let count = 0;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] >= DECK){
					any = true;
					count++;
				}
				any = (z.deepOnes[j] >= DECK) || any;
			}
			let any3 = false;
			for(let j = 0; !(j>=z.numPlayers) && !any3; j++){
				any3 = z.revealedHybrids[j];
			}
			any |= any3;
			if(!any2 && !any3 && count === 1){
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] >= DECK){
						plainAlert("SHRIVELLING_DEEP_ONE_SUCCESS",d.spaceNames[z.deepOnes[j]]);
						z.deepOnes[j] = RESERVES;
					}
				}
			} else if(any){
				if(any2){
					addOption(me,"Repel a Horror","Cast Out",true);
				}
				if(count){
					addOption(me,"Defeat a Deep One","Cast Out",true);
				}
				if(any3){
					addOption(me,"Defeat a player","Cast Out",true);
				}
				boldAlert("CAST_OUT_ALERT",z.players[me]);
			}
			SPTokenBad("Cast Out",me);
			break;
		}
		case "Conjure Fortune":
			if(z.skillCardDecks[BOON].length === 0 && z.skillCardDiscards[BOON].length === 0){
				plainAlert("No effect.");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else {
				addOption(me,"[Conjure Fortune] Shuffle Boon cards into Chaos",undefined,true);
				addAlert("CONJURE_FORTUNE_ALERT");
			}
			break;
		case "Dowsing":
			boldAlert("DOWSING_ALERT",z.players[me]);
			addOption(me,"[Dowsing] Move",undefined,true);
			addOption(me,"[Dowsing] Don't move",undefined,true);
			break;
		case "Instill Bravery":
			if(z.allyDeck.length === 0){
				plainAlert("No effect.");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else if(2 >= z.allyDeck.length) {
				spawnAlly(z.playerLocations[me]);
				spawnAlly(z.playerLocations[me]);
				SPTokenBad("Instill Bravery",me);
			} else {
				addAlert("INSTILL_BRAVERY_ALERT");
				addOption(me,"[Instill Bravery] Scout the Ally deck",undefined,true);
			}
			break;
		case "Storm of Spirits": {
			let any = (z.shoggoth && z.shoggoth >= DECK) || (z.drownedSpirit && z.drownedSpirit >= DECK) || z.graspingTendril;
			let any2 = any;
			let count = 0;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] >= DECK){
					any = true;
					count++;
				}
				any = (z.deepOnes[j] >= DECK) || any;
			}
			if(any){
				if(any2){
					addOption(me,"Repel a Horror",[z.players[me],undefined,"Storm of Spirits",0],true);
				}
				if(count){
					addOption(me,"Defeat a Deep One",[z.players[me],undefined,"Storm of Spirits",0],true);
				}
				addOption(me,"I'm done defeating monsters",[z.players[me],undefined,"Storm of Spirits",0],true);
				boldAlert("STORM_OF_SPIRITS_ALERT",z.players[me]);
			} else {
				plainAlert("No effect.");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
			break;
		}
		case "Temproral Barrier":
			z.temporalBarrier = me;
			boldAlert("TEMPORAL_BARRIER_PLACEMENT",z.players[me],getGender(me));
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			break;
		case "Temporal Discovery":
			z.temporalDiscovery = me;
			boldAlert("TEMPORAL_DISCOVERY_ALERT",z.players[me],getGender(me));
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			break;
		case "Uncanny Luck":
			addAlert("UNCANNY_LUCK_ALERT");
			addOption(me,"[Uncanny Luck] Place this card in a play area",undefined,true);
			break;
	}

}

function interruptsToken() {
	let MythosName = "";
	if(Number.isInteger(z.currentSkillCheck)) {
		MythosName = d.mythosNames[z.currentSkillCheck];
	} else {
		MythosName = z.currentSkillCheck;
	}
	let qre = new RegExp('\\[q=' + '"TMR: Interrupts for ' + MythosName + '"\\]((?!(\\[q' +  '=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = '[q=' +  '"TMR: Interrupts for ' + MythosName + '"]\r\n' + size(bold("Interrupts for "), 14) + size(difficultyTemplate(), 14) + "\r\n";
	let interruptPossibilities = [];
	if(!z.nothingToHide) {
		interruptPossibilities.push(colorText("orange", lc("Nothing to Hide")));
	}
	if(!(z.thisInfluence && z.thisLore && z.thisObservation && z.thisStrength && z.thisWill)){
		interruptPossibilities.push(colorText("purple", lc("Forced Learning")));
	}
	if(!z.preparation) {
		interruptPossibilities.push(colorText("green", lc("Preparation")));
	}
	if(interruptPossibilities.length > 0) {
		text += "Looking for ";
		for(let i = 0; !(i >= interruptPossibilities.length); i++) {
			if(i === interruptPossibilities.length - 1 && i !== 0) {
				text += "and/or ";
			}
			text += interruptPossibilities[i ];
			if(i === interruptPossibilities.length - 1) {
				text += ".\r\n\r\n";
			} else {
				text += ", ";
			}
		}
	}
	for(let i = z.turn + 1; !(i > z.turn + z.numPlayers); i++) {
		let interruptPlayer = i % z.numPlayers;
		let cards = z.skillCardHands[interruptPlayer].length;
		for(let j = 0; !(j >= z.interrupts[interruptPlayer].length); j++) {
			if(/Nothing to Hide/.test(z.interrupts[interruptPlayer][j]) || /Forced Learning/.test(z.interrupts[interruptPlayer][j]) ||
				/Preparation/.test(z.interrupts[interruptPlayer][j])) {
				cards++;
			}
		}
		text += z.players[interruptPlayer] + " (" + cards + ") - ";
		if(z.tank[interruptPlayer] && z.interrupts[interruptPlayer].length === 0) {
			text += "TANK";
		} else if(z.skillCardHands[interruptPlayer].length === 0 && z.interrupts[interruptPlayer].length === 0 && interruptChoices(interruptPlayer).length ===
			0) {
			text += "PASS: No Cards";
		} else if(z.interrupts[interruptPlayer].length > 0) {
			for(let j = 0; !(j >= z.interrupts[interruptPlayer].length); j++) {
				text += z.interrupts[interruptPlayer][j];
				if(j !== z.interrupts[interruptPlayer].length - 1) {
					text += ", ";
				}
			}
			if(z.tank[interruptPlayer]) {
				text += ", TANK";
			}
		} else if(interruptChoices(interruptPlayer).length === 0) {
			/* UTODO: Pass: No X */
			text += "";
		}
		text += "\r\n";
	}
	let effects = [colorText("blue","Determination")];
	if(characterPresent("Keilani") && z.playerLocations[getPlayerNum("Keilani")] !== "Brig" && z.skillCardHands[getPlayerNum("Keilani")].length > 0){
		effects.push("Experienced");
	}
	if(z.revelation !== undefined){
		effects.push("Revelation of Script");
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.feats[j].includes("Well Equipped") && z.items[j].length > 0 && z.playerLocations[j] !== "Brig"){
			effects.push("Well Equipped");
		}
		if(z.feats[j].includes("Revelation") && z.skillCardHands[j].length > 0 && z.playerLocations[j] !== "Brig"){
			effects.push("Revelation");
		}
		if(z.feats[j].includes("Instinct") && z.playerLocations[j] !== "Brig"){
			effects.push("Instinct");
		}
	}
	if(itemPresent('"Lucky" Ring')){
		effects.push('"Lucky" Ring');
	}
	text += "\r\nRemember to submit Conditional Orders for post-skill check abilities (";
	for(let j = 0; !(j>=effects.length); j++){
		if(j !== 0){
			if(j === effects.length - 1){
				if(effects.length === 2){
					text += " and/or ";
				} else {
					text += ", and/or ";
				}
			} else {
				text += ", ";
			}
		}
		text += effects[j];
	}
	text += ")\r\n";
	text += "[/" + "q]\r\n";
	t.value += text;
}

function cardCompare(a, b) {
	if(cardColorID(a) > cardColorID(b)) {
		return 1;
	}
	if(cardColorID(b) > cardColorID(a)) {
		return -1;
	}
	if(cardValue(a) > cardValue(b)) {
		return 1;
	}
	if(cardValue(b) > cardValue(a)) {
		return -1;
	}
	if(a > b) {
		return 1;
	}
	if(b > a) {
		return -1;
	}
	return 0;
}


function numSpacePassengers() {
	let count = 0;
	for(let j = 0; !(j >= z.spacePassengers.length); j++) {
		count += z.spacePassengers[j].length;
	}
	return count;
}

function sortedSkillCheck(includeDestiny) {
	let list = [];
	for(let i = 0; !(i >= z.skillCheckCards.length); i++) {
		if(i === z.numPlayers && !includeDestiny) {
			break;
		}
		for(let j = 0; !(j >= z.skillCheckCards[i ].length); j++) {
			list.push(z.skillCheckCards[i ][j]);
		}
	}
	if(z.familyTiesCard !== undefined){
		list.push(z.familyTiesCard);
	}
	if(z.memoryOfTheDeepCard !== undefined){
		list.push(z.memoryOfTheDeepCard);

	}
	return list.sort(cardCompare);
}

function skillCheckTally(revealDestiny) {
	let colorTallies = [0, 0, 0, 0, 0, 0];
	if(z.fromTheAbyss){
		colorTallies.push(0);
	}
	let cardList;
	if(!z.skillCheckRevealed) {
		cardList = sortedSkillCheck(revealDestiny);
	} else {
		cardList = z.revealedCards;
	}
	for(let i = 0; !(i >= cardList.length); i++) {
		let value = cardValue(cardList[i ]);
		let color = cardColorID(cardList[i ]);

		colorTallies[color] += value;
	}
	let tally = 0;
	let text = "";
	if(!revealDestiny) {
		text += "Running Tally:";
	} else {
		text += "Tally:";
	}
	text += " ";
	let revelation = cardList.includes(REVELATION+ZERO_STRENGTH);
	let turmoil = cardList.includes(TURMOIL+ZERO_STRENGTH);
	for(let color = 0; !(color >= colorTallies.length); color++) {
		let sign = -1;
		let plusMinus = "-";
		if((color === INFLUENCE && z.thisInfluence) || (color === LORE && z.thisLore) || (color === OBSERVATION && z.thisObservation) || (color === STRENGTH && z.thisStrength) || 
			(color === WILL && z.thisWill) || (color === TREACHERY && revelation) || (color === BOON && !turmoil) ) {
			sign = 1;
			plusMinus = "+";
		}
		tally += sign * colorTallies[color];
		text += colorText(colorIDcolor(color), plusMinus + " " + colorTallies[color] + " ");
		
	}
	if(z.luckyRing){
		tally += 2;
		text += '+ 2 ('+lc('"Lucky" Ring')+") ";
	}
	if(z.wellEquipped){
		tally += z.wellEquipped;
		if(z.wellEquipped > 0){
			text += "+ "+z.wellEquipped+lc(" (Well Equipped) ");
		} else if(0 > z.wellEquipped){
			text += "- "+(-z.wellEquipped)+lc(" (Well Equipped) ");
		}
	}
	if(z.instinct){
		tally += z.instinct;
		text += "+ "+z.instinct+lc(" (Instinct) ");
	}
	if(z.determination){
		tally += z.determination;
		if(z.determination > 0){
			text += "+ "+z.determination+" ("+lc("Determination")+") ";
		} else if(0 > z.determination){
			text += "- "+(-z.determination)+" ("+lc("Determination")+") ";
		}
	}
	if(!revealDestiny && !z.preparation) {
		text += "± Chaos ";
	}
	text += "= ";
	let result = "";
	if(tally >= z.thisDifficulty) {
		text += bold(colorText("green", tally + " - "+lc("PASS")));
		result = "PASS";
	} else if(z.thisPartial !== 0 && tally >= z.thisPartial) {
		text += bold(colorText("orange", tally + " - "+lc("PARTIAL")));
		result = "PARTIAL";
	} else {
		text += bold(colorText("red", tally + " - "+lc("FAIL")));
		result = "FAIL";
	}
	return [text, result, tally];
}

function autoPass(contributor) {
	if(contributor === z.numPlayers) {
		return false;
	}
	let j = (z.turn + contributor + 1) % z.numPlayers;
	if(z.tank[j]) {
		return true;
	}
	if(z.skillCardHands[j].length === 0) {
		return true;
	}
	return false;
}

function checkNotStarted() {
	if(z.skillCheckCards[z.numPlayers].length > 0) {
		return false;
	}
	if(z.revealedCards.length > 0) {
		return false;
	}
	if(z.processedOutcome) {
		return false;
	}
	if(!z.preparation) {
		return true;
	}
	if(z.contributingPlayer === 0) {
		return true;
	}
	for(let j = z.contributingPlayer - 1; j >= 0; j--) {
		if(!autoPass(j)) {
			return false;
		}
	}
	return true;
}

const NO_LIMIT = 105;

function maxSkillCards(j) {
	if(z.revealedHybrids[j] === 1 || z.playerLocations[j] === "Brig") {
		return 1;
	}
	return NO_LIMIT;
}


function canIContribute() {
	while(autoPass(z.contributingPlayer)) {
		z.contributingPlayer++;
	}
	if(z.skillCheckCards[me].length >= maxSkillCards(me)) {
		return false;
	}
	let contributingMe = (me - z.turn - 1 + z.numPlayers) % z.numPlayers;
	if(autoPass(contributingMe)) {
		return false;
	}
	if(!(z.contributingPlayer >= contributingMe)) {
		return false;
	}
	if(z.contributingPlayer === contributingMe) {
		return true;
	}
	if(z.skillCheckCards[me].length === 0) {
		return false;
	}
	if(z.players[me] === "William" && z.memoryOfTheDeepCard !== undefined && z.nothingToHide){
		return false;
	}
	let b = true;
	for(let i = z.contributingPlayer - 1; b && i > contributingMe; i--) {
		b = autoPass(i);
	}
	return b;
}

function blankArrays(num) {
	let bob = [];
	for(let i = num; i > 0; i--) {
		bob.push([]);
	}
	return bob;
}

function printRevealedCards() {
	let text = "";
	for(let i = 0; !(i >= z.revealedCards.length); i++) {
		text += cardText(z.revealedCards[i ]) + "\r\n";
	}
	text += "\r\n";
	text += skillCheckTally(true)[0] + "\r\n";
	t.value += text;
} 


function revealSkillCheck() {
	z.skillCheckRevealed = true;
	z.revealedCards = sortedSkillCheck(true);
	z.skillCheckCards = blankArrays(z.numPlayers + 1);
	delete z.familyTiesCard;
	delete z.memoryOfTheDeepCard;
	printRevealedCards();
}

function advanceContributor() {
	if(me === z.turn) {
		z.contributingPlayer = z.numPlayers;
	} else {
		z.contributingPlayer = (me - z.turn + z.numPlayers) % z.numPlayers;
		while(autoPass(z.contributingPlayer)) {
			z.contributingPlayer++;
		}
	}
}

function cards(val){
	if(val === 1){
		return lc("card");
	} else {
		return lc("cards");
	}
}


function skillCheckToken() {
	let MythosName = "";
	if(Number.isInteger(z.currentSkillCheck)) {
		MythosName = d.mythosNames[z.currentSkillCheck];
	} else {
		MythosName = z.currentSkillCheck;
	}
	let qre = new RegExp('\\[q' +  '="TMR: ' + MythosName + '"\\]((?!(\\[q' +  '=|\\[/q\\]))[\\s\\S])*\\[/q\\]', "g");
	t.value = t.value.replace(qre, "");
	let text = '[q' +  '="TMR: ' + MythosName + '"]\r\n';
	text += size(difficultyTemplate(), 14) + "\r\n";
	if(z.nothingToHide) {
		text += bold(lc("NOTHING_TO_HIDE_TOKEN"))+"\r\n";
	}
	text += "\r\n"+lc("Chaos")+" - " +z.skillCheckCards[z.numPlayers].length + " "+cards(z.skillCheckCards[z.numPlayers].length)+"\r\n";
	if(z.familyTiesCard !== undefined) {
		text += lc("Family Ties")+" - ";
		if(z.nothingToHide) {
			text += cardText(z.familyTiesCard)+"\r\n";
		} else {
			text += "1 "+lc("Treachery")+"\r\n";
		}
	}
	let contributor = 0;
	let contributingPlayer = z.contributingPlayer;
	while(true){
		contributor = (contributingPlayer + z.turn + 1) % z.numPlayers;
		if(contributingPlayer === z.numPlayers){
			contributor = -1;
			break;
		}
		if(autoPass(contributingPlayer)){
			contributingPlayer++;
			continue;
		}
		if(z.skillCheckCards[contributor].length > 0){
			contributingPlayer++;
			continue;
		}	
		break;
	}
	for(let i = 0; !(i >= z.numPlayers); i++) {
		let j = (z.turn + 1 + i) % z.numPlayers;
		if(contributor === j){
			text += bold(z.players[j]);
		} else {
			text += z.players[j];
		}
		text +=  " (" + (z.skillCardHands[j].length + z.skillCheckCards[j].length) + ") - ";
		if(z.skillCardHands[j].length === 0 && z.skillCheckCards[j].length === 0) {
			text += lc("PASS: No Cards")+"\r\n";
		}  else if(z.tank[j] && z.skillCheckCards[j].length === 0) {
			text += lc("TANK")+"\r\n";
		} else if(z.skillCheckCards[j].length > 0) {
			if(!z.nothingToHide) {

				text += z.skillCheckCards[j].length + " " + cards(z.skillCheckCards[j].length)+ " ";
				text += lc(z.contributionLabels[j]) + "\r\n";
			} else {
				for(let k = 0; !(k >= z.skillCheckCards[j].length); k++) {
					text += cardText(z.skillCheckCards[j][k]) + ", ";
				}
				text = text.slice(0, -2);
				text += "\r\n";
			}
		} else {
			if(i >= z.contributingPlayer) {
				if(maxSkillCards(j) !== NO_LIMIT) {
					text += lc("(" + maxSkillCards(j) + " max)");
				}
				text += "\r\n";
			} else {
				text += lc("Pass")+"\r\n";
			}
		}
		if(z.memoryOfTheDeepCard !== undefined && z.players[j] === "William"){
			text += lc("Memory of the Deep")+" - ";
			if(z.nothingToHide) {
				text += cardText(z.memoryOfTheDeepCard)+"\r\n";
			} else {
				text += "1 "+lc("Treachery")+"\r\n";
			}
		}
	}
	text += "\r\n";
	if(z.nothingToHide) {
		text += skillCheckTally(false)[0] + "\r\n";
	}
	let effects = [colorText("blue","Determination")];
	if(characterPresent("Keilani") && z.playerLocations[getPlayerNum("Keilani")] !== "Brig" && z.skillCardHands[getPlayerNum("Keilani")].length > 0){
		effects.push("Experienced");
	}
	if(z.revelation !== undefined){
		effects.push("Revelation of Script");
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.feats[j].includes("Well Equipped") && z.playerLocations[j] !== "Brig" && z.items[j].length > 0){
			effects.push("Well Equipped");
		}
		if(z.feats[j].includes("Revelation") && z.playerLocations[j] !== "Brig" && z.skillCardHands[j].length > 0){
			effects.push("Revelation");
		}
		if(z.feats[j].includes("Instinct") && z.playerLocations[j] !== "Brig"){
			effects.push("Instinct");
		}
	}
	if(itemPresent('"Lucky" Ring')){
		effects.push('"Lucky" Ring');
	}
	text += "Remember to submit Conditional Orders for post-skill check abilities (";
	for(let j = 0; !(j>=effects.length); j++){
		if(j !== 0){
			if(j === effects.length - 1){
				if(effects.length === 2){
					text += " and/or ";
				} else {
					text += ", and/or ";
				}
			} else {
				text += ", ";
			}
		}
		text += effects[j];
	}
	text += ")\r\n";
	text += "[/" + "q]";
	t.value += text;
}

function playChaosToSkillCheck() {
	if(z.chaos.length === 0) {
		addAlert("CHAOS_EMPTY");
		return 0;
	}
	println("ADDING_CHAOS");
	z.skillCheckCards[z.numPlayers].push(z.chaos.pop());
	if(z.chaos.length === 0) {
		buildChaos();
	}
	z.skillCheckCards[z.numPlayers].push(z.chaos.pop());
	if(z.chaos.length === 0) {
		buildChaos();
	}
	if(z.familyTies && z.playerLocations[getPlayerNum("Ishmael")] !== "Brig" && 
		(z.skillCardDecks[TREACHERY].length > 0 || z.skillCardDiscards[TREACHERY].length > 0)){
			
		plainAlert("FAMILY_TIES_TRIGGER");
		z.familyTiesCard = drawFromDeck(TREACHERY);
		if(z.nothingToHide){
			addAlert("FAMILY_TIES_NOTHING_TO_HIDE",cardText(z.familyTiesCard));
		} else {
			addAlert("FAMILY_TIES_TRIGGER");
		}
	}
	skillCheckToken();
}

function checkEmptyColors(player){
	if(z.skillCardHands[player].length === 0){
		z.possibleColors[player] = [0,0,0,0,0,0];
	}
}

function playCardToSkillCheck(player, pos) {
	if(!(pos >= 0) || pos >= z.skillCardHands[player].length) {
		error("Cannot play into skill check a card you do not have in hand!");
		return 0;
	}
	let card = z.skillCardHands[player].splice(pos, 1)[0];
	checkEmptyColors(player);
	z.skillCheckCards[player].push(card);
	skillCheckToken();
}

function startMythosSkillCheck() {
	menuPage = "Default";
	if(z.currentMythos === null) {
		return null;
	}
	z.currentSkillCheck = z.currentMythos;
	z.thisDifficulty = d.difficulty[z.currentMythos];
	z.thisPartial = d.partial[z.currentMythos];
	z.thisInfluence = d.positives[0][z.currentMythos];
	z.thisLore = d.positives[1][z.currentMythos];
	z.thisObservation = d.positives[2][z.currentMythos];
	z.thisStrength = d.positives[3][z.currentMythos];
	z.thisWill = d.positives[4][z.currentMythos];
	z.contributingPlayer = 0;
	interruptsToken();
	return null;
}

function sleeper() {
	let done = true;
	z.awakening = true;
	t.value += "[ima" +  "geid=6414530 medium]\r\n";
	plainAlert("AWAKENING_PHASE");
	for(let i = 0; !(i >= z.players.length); i++) {
		let k = (z.turn + i) % z.numPlayers;
		if(z.revealedHybrids[k ]) {
			/* UTODO: note that turn order matters here */
			plainAlert("MUST_PASS_LOYALTY",z.players[k ],getGender(k));
			addOption(k,"Pass your remaining Loyalty cards to a Human of your choice","Sleeper",true);
			done = false;
		}

		let loy = z.loyaltyDeck.pop();
		z.loyaltyHands[i ].push(loy);
	
	}
	t.value += "\r\n" + bold("You may now relist yourselves on the [ur" + "l=ht" + "tps://" + "boardgamegeek.com/wiki/page/Unfathomable_PBF]Unfathomable Waiting List[/u" +"rl].") + "\r\n";
	return done;
}

function characterPresent(name) {
	for(let i = 0; !(i >= z.players.length); i++) {
		if(z.players[i ] === name && (!z.hasOwnProperty("revealedHybrids") || z.revealedHybrids[i ] === 0)) {
			return true;
		}
	}
	return false;
}

function getPlayerNum(name) {
	for(let i = 0; !(i >= z.players.length); i++) {
		if(z.players[i ] === name) {
			return i;
		}
	}
	return -1;
}

function startLocationSkillCheck(location, target) {
	menuPage = "Default";
	z.thisTarget = target;
	z.currentSkillCheck = location;
	z.thisPartial = 0;
	if(location === "Captain's Cabin") {
		z.thisInfluence = 1;
		z.thisLore = 0;
		z.thisObservation = 1;
		z.thisStrength = 0;
		z.thisWill = 0;
		z.thisDifficulty = 8;
	} else if(location === "Brig") {
		z.thisInfluence = 0;
		z.thisLore = 1;
		z.thisObservation = 0;
		z.thisStrength = 1;
		z.thisWill = 0;
		z.thisDifficulty = 8;
	} else if(location === "Memory of the Deep"){
		z.thisInfluence = 0;
		z.thisLore = 1;
		z.thisObservation = 0;
		z.thisStrength = 0;
		z.thisWill = 1;
		z.thisDifficulty = 13;
		z.thisTarget = null;
	} else if(location === "Security Officer"){
		z.thisInfluence = 1;
		z.thisLore = 0;
		z.thisObservation = 1;
		z.thisStrength = 0;
		z.thisWill = 0;
		z.thisDifficulty = 6;
	}
	z.contributingPlayer = 0;
	interruptsToken();
}

function titleList(player) {
	let text = "";
	if(player === z.captain && player === z.keeper) {
		text += colorText("purple", "Dictator ");
	} else {
		if(player === z.captain) {
			text += colorText("green", "Captain ");
		} else if(player === z.keeper) {
			text += colorText("orange", "Keeper of the Tome ");
		}
	}
	return text;
}

function increaseDistance(by) {
	z.distance += by;
	boldAlert("Distance increases by " + by + " to " + z.distance + ".");
	if(z.distance >= 12 && z.rumors){
		delete z.rumors;
		z.mythosDiscards.push(RUMORS);
		plainAlert("RUMORS_DISCARDED");
	}
}

function spawnDeepOne(sector) {
	let raider = -1;
	for(let i = 0; !(i >= z.deepOnes.length); i++) {
		if(z.deepOnes[i ] === RESERVES) {
			raider = i;
			break;
		}
	}

	if(raider === -1) {
		println("NO_MORE_DEEP_ONES");
		endGame(false);
		return false;
	}
	z.deepOnes[raider] = sector;
	fleeCheck(sector);
	println("DEEP_ONE_PLACED",d.spaceNames[sector]);
	return true;
}

function spawnDeepOnes(sector, num) {
	for(let i = 0; !(i >= num); i++) {
		if(!spawnDeepOne(sector)){
			return false;
		}
	}
	return true;
}

function deepDeepOnes(){
	let count = 0;
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(z.deepOnes[j] === DEEP){
			count++;
		}
	}
	return count;
}

function activateFather(context,skip){
	if(!skip && canInterruptActivation()){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier",["Father Dagon",context],true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]",["Father Dagon",context],true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]",["Father Dagon",context],true);
		}
		if(context === "Perform Rites"){
			context = "Perform Rites Skip";
		}
		optionForAll("Activate Father Dagon",context,true);
		return false;
	}
	println("FATHER_DAGON_ACTIVATES");
	if(z.father === DEEP){
		if(spawnDeepOnes(DEEP,2)){
			if(deepDeepOnes() >= 4){
				plainAlert("FATHER_DAGON_ROLL");
				NoSPToken("Father Dagon Activation",context);
				return false;
			}
			return true;
		} else {
			return false;
		}
	} else {
		if(spawnDeepOnes(z.father+8,2)){
			if(z.father !== WATER && z.father !== WATER + 1){
				z.father -= 2;
				plainAlert("PLAYER_MOVES",["Father Dagon",d.spaceNames[z.father]]);
			}
			return true;
		}
		return false;
	}
}

function activateMother(context,skip){
	if(!skip && canInterruptActivation()){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier","Mother Hydra",true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Mother Hydra",true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]","Mother Hydra",true);
		}
		z.motherContext = context;
		optionForAll("Activate Mother Hydra","Interrupt",true);
		return false;
	}
	if(skip && context === "Interrupt"){
		context = z.motherContext;
	}
	println("MOTHER_HYDRA_ACTIVATES");
	if(z.mother === DEEP){
		if(spawnDeepOnes(DEEP,2)){
			if(deepDeepOnes() >= 4){
				plainAlert("MOTHER_HYDRA_ROLL");
				NoSPToken("Mother Hydra Activation");
				z.motherContext = context;
				return false;
			}
			return true;
		} else {
			return false;
		}
	} else {
		let done = true;
		switch(z.mother){
			case WATER:
			case WATER+1:
				done = damageLocation("Bridge",undefined,"Mother Hydra");
				break;
			case WATER+2:
				done = damageLocation("Chapel",undefined,"Mother Hydra");
				break;
			case WATER+3:
				done = damageLocation("Captain's Cabin",undefined,"Mother Hydra");
				break;
			case WATER+4:
				done = damageLocation("Cargo Hold",undefined,"Mother Hydra");
				break;
			case WATER+5:
				done = damageLocation("Galley",undefined,"Mother Hydra");
				break;
			case WATER+6:
			case WATER+7:
				done = damageLocation("Boiler Room",undefined,"Mother Hydra");
				break;
		}
		
		if(z.mother !== WATER && z.mother !== WATER + 1 && !z.gameOver){
			z.mother -= 2;
			plainAlert("PLAYER_MOVES",["Mother Hydra",d.spaceNames[z.mother]]);
		}
		if(!done){
			z.motherContext = context;
		}
		return done;
		
	}
}

function advanceRitual(priceOfPower) {
	z.ritualTrack++;
	switch (z.ritualTrack) {
		case 1:
			plainAlert("RITUAL_ADVANCE_1");
			if(z.temporalDiscovery !== undefined){
				boldAlert("TEMPORAL_DISCOVERY_RITUAL_ALERT",z.players[z.temporalDiscovery]);
				addOption(z.temporalDiscovery,"Advance the Ritual Track","Temporal Discovery",true);
				addOption(z.temporalDiscovery,"Don't advance the Ritual Track",undefined,true);
				return false;
			}
			return true;
		case 2:
			plainAlert("RITUAL_ADVANCE_2");
			if(z.temporalDiscovery !== undefined){
				boldAlert("TEMPORAL_DISCOVERY_RITUAL_ALERT",z.players[z.temporalDiscovery]);
				addOption(z.temporalDiscovery,"Advance the Ritual Track","Temporal Discovery",true);
				addOption(z.temporalDiscovery,"Don't advance the Ritual Track",undefined,true);
				return false;
			}
			return true;
		case 3:
			plainAlert("RITUAL_ADVANCE_3");
			if(z.temporalDiscovery !== undefined){
				boldAlert("TEMPORAL_DISCOVERY_RITUAL_ALERT",z.players[z.temporalDiscovery]);
				addOption(z.temporalDiscovery,"Advance the Ritual Track","Temporal Discovery",true);
				addOption(z.temporalDiscovery,"Don't advance the Ritual Track",undefined,true);
				return false;
			}
			return true;
		case 4: {
			z.ritualTrack = 0;
			boldAlert("RITUAL_CAST");

			t.value += "[ima" +  "geid=6414560 medium]\r\n";
			if(z.mother > DEEP){
				println("MOTHER_TO_DEEP");
				z.mother = DEEP;
			}
			if(z.father > DEEP){
				println("FATHER_TO_DEEP");
				z.father = DEEP;
			}
			
			if(z.fromTheAbyss){
				if(z.shoggoth >= WATER && !(z.shoggoth >= INTERIOR)){
					println("SHOGGOTH_DEFEATED");
					z.shoggoth = RESERVES;
				}
				if(z.drownedSpirit >= WATER && !(z.drownedSpirit >= INTERIOR)){
					println("DROWNED_SPIRIT_DEFEATED");
					z.drownedSpirit = RESERVES;
				}
				if(z.graspingTendril >= WATER){
					println("GRASPING_TENDRIL_DEFEATED");
					z.graspingTendril = RESERVES;
				}
				if(z.horror === -1 && (z.shoggoth === RESERVES && z.drownedSpirit === RESERVES)){
					println("HORROR_TRACK_RESET");
					z.horror = 0;
				}
				
			}
			let any = false;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] >= WATER && INTERIOR > z.deepOnes[j]){
					z.deepOnes[j] = RESERVES;
					any = true;
				}
			}
			if(any){
				println("DEEP_ONES_DEFEATED");
				any = false;
			}
			let good = true;
			let medicalIntervention = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
					medicalIntervention = true;
					break;
				}
			}
			let travelPharmacy = false;
			for(let j = WATER; !(j>=INTERIOR); j++){
				if(z.spacePassengers[j].length > 0){
					any = true;
					if(itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")],d.spaceNames[j])){
						travelPharmacy = true;
					}
				}
			}
			if(any){
				if(!medicalIntervention && !travelPharmacy){
					for(let j = WATER; !(j>=INTERIOR); j++){
						while(z.spacePassengers[j].length > 0 && !z.gameOver){
							defeatPassenger(z.spacePassengers[j].pop());
						}
					}
					good = !z.gameOver;
				} else {
					boldAlert("ROGUE_WAVE_ALERT");
					if(travelPharmacy){
						plainAlert("TRAVEL_PHARMACY_ALERT",z.players[itemHolder("Travel Pharmacy")],getGender(itemHolder("Travel Pharmacy")));
						addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Cast","",0],false);
					}
					if(medicalIntervention){
						plainAlert("MEDICAL_INTERVENTION_MANY_ALERT");
						addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",["Cast","",0],false);
					}
					optionForAll("Defeat a passenger in a space",["Cast","",0],true);
					good = false;
				}
			}
			if(good && z.fromTheAbyss){
				for(let j = 0; !(j>=z.allies.length); j++){
					if(INTERIOR > locationIndex(z.allies[j][1])){
						if(characterPresent("Guillaume")){
							plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
							z.guillaumeAllies.push(z.allies[j][0]);
						} else {
							plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
							
						}
						z.allies.splice(j,1);
						j--;
					}
				}
				if(characterPresent("Guillaume") && z.guillaumeAllies.length > 3){
					boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
					addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game","Cast",true);
					good = false;
				}
			}
			if(good){
				for(let j = 0; !(j>=z.playerLocations.length); j++){
					let k = (z.turn + j) % z.numPlayers;
					if(INTERIOR > locationIndex(z.playerLocations[k])){
						good = defeat(k,"Cast") && good;
					}
				}
			} else {
				plainAlert("CAST_ALERT");
			}
			
			textGameState(true);
			if(!priceOfPower && good && z.temporalDiscovery !== undefined){
				boldAlert("TEMPORAL_DISCOVERY_TRAVEL_ALERT",z.players[z.temporalDiscovery]);
				addOption(z.temporalDiscovery,"Advance the Travel Track","Temporal Discovery",true);
				addOption(z.temporalDiscovery,"Don't advance the Travel Track",undefined,true);
				return false;
			}
			return good;
			
		}
	}
	
}

function resetDeepOneActivations() {
	for(let j = 0; !(j >= z.deepOnes.length); j++) {
		if(z.deepOnes[j] !== DEEP && z.deepOnes[j] !== RESERVES) {
			z.deepOneActivated[j] = 0;
		} else {
			z.deepOneActivated[j] = 1;
		}
	}
}
  
function route(sourceIndex,destIndex){
	/* URULES: if there are 2 equidistant routes, does the Deep One go to the higher space?*/
	switch(sourceIndex){
		case BRIDGE:
		switch(destIndex){
			case CHAPEL:
			case CARGO_HOLD:
				return CHAPEL;
			default:
				return CAPTAINS_CABIN;
		}
		case CHAPEL:
		switch(destIndex){
			case BRIDGE:
				return BRIDGE;
			case CAPTAINS_CABIN:
				return CAPTAINS_CABIN;
			default:
				return CARGO_HOLD;
		}
		case CAPTAINS_CABIN:
		switch(destIndex){
			case BRIDGE:
				return BRIDGE;
			case CHAPEL:
				return CHAPEL;
			default:
				return GALLEY;
		}
		case CARGO_HOLD:
		switch(destIndex){
			case CHAPEL:
			case BRIDGE:
				return CHAPEL;
			case GALLEY:
			case CAPTAINS_CABIN:
				return GALLEY;
			default:
				return BOILER_ROOM;
		}
		case GALLEY:
		switch(destIndex){
			case BOILER_ROOM:
				return BOILER_ROOM;
			case CARGO_HOLD:
			case CHAPEL:
				return CARGO_HOLD;
			default:
				return CAPTAINS_CABIN;
		}
		case BOILER_ROOM:
		switch(destIndex){
			case CHAPEL:
			case CARGO_HOLD:
				return CARGO_HOLD;
			default:
				return GALLEY;
		}
	}
}
  
function interiorDeepOneProceeds(index,force) {
	let priority = [];
	/* URULES: if there are 2 equidistant routes, does the Deep One go to the higher space?*/
	switch(index){
		case BRIDGE:
			priority = [CAPTAINS_CABIN,CHAPEL,GALLEY,CARGO_HOLD,BOILER_ROOM];
			break;
		case CHAPEL:
			priority = [CARGO_HOLD,CAPTAINS_CABIN,BRIDGE,BOILER_ROOM,GALLEY];
			break;
		case CAPTAINS_CABIN:
			priority = [GALLEY,CHAPEL,BRIDGE,BOILER_ROOM,CARGO_HOLD];
			break;
		case CARGO_HOLD:
			priority = [BOILER_ROOM,GALLEY,CHAPEL,CAPTAINS_CABIN,BRIDGE];
			break;
		case GALLEY:
			priority = [BOILER_ROOM,CARGO_HOLD,CAPTAINS_CABIN,CHAPEL,BRIDGE];
			break;
		case BOILER_ROOM:
			priority = [GALLEY,CARGO_HOLD,CAPTAINS_CABIN,CHAPEL,BRIDGE];
			break;
	}
	let possibilities = [];
	for(let j = 0; !(j>=priority.length); j++){
		let index2 = priority[j];
		if(z.damage[index2-INTERIOR] >= 0){
			continue;
		}
		possibilities.push(index2);
		if(force){
			break;
		}
		let targets = z.spacePassengers[index2].length;
		for(let k = 0; !(k>=z.playerLocations.length); k++){
			if(z.playerLocations[k] === d.spaceNames[index2] && z.revealedHybrids[k] === 0){
				targets++;
			}
		}
		let deepOnes = 0;
		for(let k = 0; !(k>=z.deepOnes.length); k++){
			if(z.deepOnes[k] === index2){
				deepOnes++;
			}
		}
		if(targets >= deepOnes){
			break;
		}
	}
	let firstRoute = route(index,possibilities[0]);
	if(force){
		return firstRoute;
	}
	for(let j = 1; !(j>=possibilities.length); j++){
		if(firstRoute !== route(index,possibilities[j])){
			return false;
		}
	}
	return firstRoute;
}


function resumeDeepOneActivation(){
	let manualSectors = 0;
	for(let j = WATER; !(j>=INTERIOR); j++){
		let canMove = z.spacePassengers[j].length === 0;
		for(let k = 0; canMove && !(k>=z.playerLocations.length); k++){
			if(z.playerLocations[k] === d.spaceNames[j] && z.revealedHybrids[k] === 0){
				canMove = false;
			}
		}
		if(canMove){
			let count = 0;
			let countBarricaded = 0;
			let dest = j + 8;
			if(j > DECK){
				dest--;
			}
			if(j === DECK+7){
				dest--;
			}
			for(let k = 0; !(k>=z.deepOnes.length); k++){
				if(z.deepOnes[k] === j && !z.deepOneActivated[k]){
					z.deepOneActivated[k] = 1;
					if(!z.barricadeActive || DECK > j){
						z.deepOnes[k] = dest;
						fleeCheck(dest);
						count++;
					} else {
						countBarricaded++;
					}
				}
			}
			if(countBarricaded === 1){
				plainAlert("DEEP_ONE_BARRICADE",d.spaceNames[j]);
			} else if (countBarricaded > 1){
				plainAlert("DEEP_ONES_BARRICADE",[count,d.spaceNames[j]]);
			}
			if(count === 1){
				plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[dest]);
			} else if (count > 1){
				plainAlert("DEEP_ONES_MOVE",[count,d.spaceNames[dest]]);
			}
		} else {
			let any = false;
			for(let k = 0; !(k>=z.deepOnes.length); k++){
				if(z.deepOnes[k] === j && !z.deepOneActivated[k]){
					any = true;
					break;
				}
			}
			if(any){
				manualSectors++;
			}
		}
	}
	for(let j = INTERIOR; !(j>=INTERIOR+6); j++){
		let canMove = z.spacePassengers[j].length === 0 && z.damage[j-INTERIOR] >= 0;
		for(let k = 0; canMove && !(k>=z.playerLocations.length); k++){
			if(z.playerLocations[k] === d.spaceNames[j] && z.revealedHybrids[k] === 0){
				canMove = false;
			}
		}
		/* URULES: barricades internal, too? */
		if(z.barricadeActive && canMove){
			let count = 0;
			for(let k = 0; !(k>=z.deepOnes.length); k++){
				if(z.deepOnes[k] === j && !z.deepOneActivated[k]){
					z.deepOneActivated[k] = 1;
					count++;
				}
			}
			if(count === 1){
				plainAlert("DEEP_ONE_BARRICADE",d.spaceNames[j]);
			} else if (count > 1){
				plainAlert("DEEP_ONES_BARRICADE",[count,d.spaceNames[j]]);
			}
		} else {
			let destIndex = interiorDeepOneProceeds(j);
			if(canMove && destIndex){
				let count = 0;
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j && !z.deepOneActivated[k]){
						z.deepOneActivated[k] = 1;
						z.deepOnes[k] = destIndex;
						fleeCheck(destIndex);
						count++;
					}
				}
				if(count === 1){
					plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[destIndex]);
				} else if (count > 1){
					plainAlert("DEEP_ONES_MOVE",[count,d.spaceNames[destIndex]]);
				}
			} else {
				let any = false;
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j && !z.deepOneActivated[k]){
						any = true;
						break;
					}
				}
				if(any){
					manualSectors++;
				}
			}
		}
	}

	if(manualSectors === 0){
		if(z.midAction === "Call to Action"){
			finishedAction();
		}
		if(z.deepOneContext === "Call Friends"){
			delete z.deepOneContext;
			if(z.midAction === "Quick Cast" || z.midAction === "Keeper of the Tome"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
		if(z.deepOneContext === "Swear the Second Oath"){
			doneWithRevealEffect(getPlayerNum("Ishmael"));
		}
		if(z.deepOneContext === "Ritual Coordination" || z.deepOneContext === "Volunteer Army"){
			delete z.deepOneContext;
			doneWithChoiceMythos();
		}
		if(z.deepOneContext === "Barricade the Hatches" || z.deepOneContext === "Coordinated Assault"){
			delete z.deepOneContext;
			clearSkillCheck();
		}
		if(z.deepOneContext === "Monster"){
			delete z.deepOneContext;
			primeJumpIcon();
		}
		
		if(z.deepOneContext === "Deep One Swarm"){
			delete z.deepOneContext;
			if(activateDeepOnes()){
				clearSkillCheck();
			} else {
				z.deepOneContext = "Coordinated Assault";
			}
		} else {
			delete z.deepOneContext;
		}
		return true;
	} else if(manualSectors === 1){
		let done = true;
		for(let j = 0; done && !(j>=z.deepOneActivated.length); j++){
			if(!z.deepOneActivated[j]){
				done = activateDeepOne(j);
				break;
			}
		}
		if(done){
			return resumeDeepOneActivation();
		}
		return done;
	} else {
		plainAlert("DEEP_ONE_PICK_ACTIVATION",z.players[z.turn]);
		addOption(z.turn,"Choose which Deep One activates",undefined,true);
		return false;
	}
}
  
function canAnyoneAlarm(){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] !== "Brig" && z.feats[j].includes("Alarm")){
			return z.players[j];
		}
	}
	return false;
}

function canAnyoneFeast(){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] !== "Brig" && z.feats[j].includes("Feast")){
			return z.players[j];
		}
	}
	return false;
}

function canInterruptActivation(){
	return z.temporalBarrier !== undefined || canAnyoneAlarm() || canAnyoneFeast();
}

function activateDeepOnes(skip) {
	if(!skip && canInterruptActivation()){
		if(z.temporalBarrier !== undefined){
			plainAlert("TEMPORAL_BARRIER_ALERT",z.players[z.temporalBarrier]);
			addOption(z.temporalBarrier,"Temporal Barrier","Deep Ones",true);
		}
		if(canAnyoneFeast()){
			plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
			addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Deep Ones",true);
		}
		if(canAnyoneAlarm()){
			plainAlert("ALARM_ALERT",canAnyoneAlarm(),getGender(getPlayerNum(canAnyoneAlarm())));
			addOption(getPlayerNum(canAnyoneAlarm()),"Alarm [Feat]","Deep Ones",true);
		}
		optionForAll("Activate Deep Ones","Interrupt",true);
		return false;
	}
	boldAlert("ACTIVATE_DEEP_ONES_ALERT");	
	if(deepOnesAway() === z.deepOnes.length){
		if(spawnDeepOnes(DEEP,2)){
			if(deepDeepOnes() >= 4){
				plainAlert("DEEP_ONES_ROLL");
				NoSPToken("Deep Ones Activation");
			} else {
				if(z.deepOneContext === "Call Friends"){
					delete z.deepOneContext;
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
				delete z.deepOneContext;
				return true;
			}
		} else {
			return false;
		}
	} else {
		resetDeepOneActivations();
		return resumeDeepOneActivation();
	}
}

function activateDeepOne(index){
	let targets = 0;
	let target = "";
	let locIndex = z.deepOnes[index];
	for(let j = 0; !(j>=z.playerLocations.length); j++){
		if(z.playerLocations[j] === d.spaceNames[locIndex] && z.revealedHybrids[j] === 0){
			targets++;
			target = z.players[j];
		}
	}
	if(targets > 1){
		boldAlert("DEEP_ONE_MULTIPLE_HUMANS",[z.players[z.turn],d.spaceNames[locIndex]]);
		addOption(z.turn,"Choose the Deep One target",index,true);
		return false;
	} else if(targets === 1){
		z.deepOneActivated[index] = 1;
		plainAlert("DEEP_ONE_ATTACKS_HUMAN",target,getGender(getPlayerNum(target)));
		NoSPToken("DEEP_ONE_VS_HUMAN",target);
		return false;
	} else if(z.spacePassengers[locIndex].length >= 1){
		z.deepOneActivated[index] = 1;
		let medicalIntervention = false;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
				medicalIntervention = true;
				break;
			}
		}
		let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")],d.spaceNames[locIndex]);
		if(!medicalIntervention && !travelPharmacy){
			return defeatPassenger(z.spacePassengers[locIndex].pop());
		}
		plainAlert("DEEP_ONE_PASSENGER_DEFEAT",d.spaceNames[locIndex]);
		if(travelPharmacy){
			addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Deep One",locIndex,0],true);
			plainAlert("TRAVEL_PHARMACY_NOTIFICATION",z.players[itemHolder("Travel Pharmacy")]);
		}
		if(medicalIntervention){
			plainAlert("MEDICAL_INTERVENTION_PAUSE");
			addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",["Deep One",locIndex,0],true);
		}
		optionForAll("Defeat a passenger in a space",["Deep One",locIndex],true);
		return false;
	} else if(locIndex >= INTERIOR && INTERIOR + 6 > locIndex && z.damage[locIndex-INTERIOR] === -1){
		z.deepOneActivated[index] = 1;
		return damageLocation(d.spaceNames[locIndex],undefined,"Deep One");
	} else if(locIndex >= INTERIOR && INTERIOR + 6 > locIndex && z.damage[locIndex-INTERIOR] >= 0){
		let destIndex = interiorDeepOneProceeds(locIndex,true);
		z.deepOneActivated[index] = 1;
		z.deepOnes[index] = destIndex;
		plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[destIndex]);
		return true;
	} else {
		plainAlert("something went wrong with Deep One activations");
	}
}

function characterSpecificMythos(player){
	let ch = getCharacter(player);
	if(ch >= 10){
		return 145 + (ch - 10);
	} else {
		return 60 + ch;
	}
}

function humansInBrig(){
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(!z.revealedHybrids[j] && z.playerLocations[j] === "Brig"){
			return true;
		}
	}
	return false;
}

function initializeMythos() {
	/* UTODO: new banner */
	t.value += "\r\n[ima" +  "geid=735196 medium]\r\n";
	t.value += size(italics(difficultyTemplate(z.currentMythos)), 14) + "\r\n";
	if(z.spreadMisfortune){
		if(d.captainChooses[z.currentMythos] || d.keeperChooses[z.currentMythos] || d.namedPlayerChooses[z.currentMythos] || d.currentPlayerChooses[z.currentMythos]){
			/* URULES: Spread Misfortune and "you cannot choose this option" and "you" more generally */
			if (d.mythosNames[z.currentMythos] === "Criminal Activity" && z.items[getPlayerNum("Edmund")].length === 0){
				plainAlert("CRIMINAL_ACTIVITY_NO_CHOICE",z.players[getPlayerNum("Edmund")]);
				z.currentSkillCheck = z.currentMythos;
				processSkillCheckOutcome(false);
			} else if (d.mythosNames[z.currentMythos] === "History Repeats" && z.captain !== getPlayerNum("Edmund")){
				plainAlert("HISTORY_REPEATS_NO_CHOICE");
				z.currentSkillCheck = z.currentMythos;
				processSkillCheckOutcome(false);
			} else if(d.mythosNames[z.currentMythos] === "Volunteer Army" && z.passengerSupply.length === 0){
				plainAlert("VOLUNTEER_ARMY_NO_CHOICE");
				if(processBottom()){
					doneWithChoiceMythos();
				}
				z.finishedMythos = true;
				/* UTODO: URULES: Ritual Support/Poisoned Food */
			} else if(d.mythosNames[z.currentMythos] === "To Arms!" && z.shoggoth === RESERVES && z.drownedSpirit === RESERVES && z.graspingTendril === RESERVES){
				plainAlert("TO_ARMS_NO_CHOICE");
				processBottom();
				z.finishedMythos = true;
			} else if(d.mythosNames[z.currentMythos] === "Outbreak" && !humansInBrig()){
				plainAlert("OUTBREAK_NO_CHOICE");
				processTop();
				z.finishedMythos = true;
			} else if((d.mythosNames[z.currentMythos] === "Ritual Support" || d.mythosNames[z.currentMythos] === "Poisoned Food") && !z.possibleColors[getPlayerNum("Edmund")][LORE]){
				plainAlert("RITUAL_SUPPORT_NO_CHOICE","Edmund");
				if(processBottom()){
					doneWithChoiceMythos();
				}
				z.finishedMythos = true;
			} else if(d.mythosNames[z.currentMythos] === "Improvised Fuel Source" && 3 > z.passengerSupply.length){
				plainAlert("IMPROVISED_FUEL_SOURCE_NO_CHOICE");
				if(processBottom()){
					doneWithChoiceMythos();
				}
				z.finishedMythos = true;
			} else {
				printlnBold("YOUR_CHOICE_HERE","Edmund");
			}
		} else {
			z.currentSkillCheck = z.currentMythos;
			processSkillCheckOutcome(false);
		}
	} else if(z.playerLocations[z.turn] === "Brig"){
		let uncannyFortune = false;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.feats[j].includes("Uncanny Fortune")){
				uncannyFortune = true;
				break;
			}
		}
		if(uncannyFortune){
			optionForAll("Process Monster Activation Icon",undefined,true);
			printlnBold(z.players[z.turn]+" is in the Brig, so the crisis on this Mythos card is not resolved.");
		} else {
			printlnBold("BRIG_MYTHOS",z.players[z.turn]);
			primeCylonActivation();
			z.finishedMythos = true;
		}
	} else if (d.mythosNames[z.currentMythos] === "Criminal Activity" && z.items[z.turn].length === 0){
		plainAlert("CRIMINAL_ACTIVITY_NO_CHOICE",z.players[z.turn]);
		startMythosSkillCheck();
	} else if (d.mythosNames[z.currentMythos] === "History Repeats" && z.captain !== getPlayerNum("Keilani")){
		plainAlert("HISTORY_REPEATS_NO_CHOICE");
		startMythosSkillCheck();
	} else if(d.mythosNames[z.currentMythos] === "Volunteer Army" && z.passengerSupply.length === 0){
		plainAlert("VOLUNTEER_ARMY_NO_CHOICE");
		if(processBottom()){
			doneWithChoiceMythos();
		}
		z.finishedMythos = true;
	} else if(d.mythosNames[z.currentMythos] === "To Arms!" && z.shoggoth === RESERVES && z.drownedSpirit === RESERVES && z.graspingTendril === RESERVES){
		plainAlert("TO_ARMS_NO_CHOICE");
		processBottom();
		z.finishedMythos = true;
	} else if(d.mythosNames[z.currentMythos] === "Outbreak" && !humansInBrig()){
		plainAlert("OUTBREAK_NO_CHOICE");
		processTop();
		z.finishedMythos = true;
	} else if((d.mythosNames[z.currentMythos] === "Ritual Support" || d.mythosNames[z.currentMythos] === "Poisoned Food") && !z.possibleColors[z.keeper][LORE]){
		plainAlert("RITUAL_SUPPORT_NO_CHOICE",z.players[z.keeper]);
		if(processBottom()){
			doneWithChoiceMythos();
		}
		z.finishedMythos = true;
	} else if(d.mythosNames[z.currentMythos] === "Improvised Fuel Source" && 3 > z.passengerSupply.length){
		plainAlert("IMPROVISED_FUEL_SOURCE_NO_CHOICE");
		if(processBottom()){
			doneWithChoiceMythos();
		}
		z.finishedMythos = true;
	} else if(d.captainChooses[z.currentMythos]) {
		printlnBold("YOUR_CHOICE_HERE",(colorText("green", "Captain") + " " + z.players[z.captain]));
	} else if(d.keeperChooses[z.currentMythos]) {
		printlnBold("YOUR_CHOICE_HERE",(colorText("orange", "Keeper") + " " + z.players[z.keeper]));
	} else if(d.namedPlayerChooses[z.currentMythos] !== "") {
		printlnBold("YOUR_CHOICE_HERE",d.namedPlayerChooses[z.currentMythos]);
	} else if(d.currentPlayerChooses[z.currentMythos]) {
		printlnBold("YOUR_CHOICE_HERE",z.players[z.turn]);
	} else {
		startMythosSkillCheck();
	}
}

function reshuffleMythos(){
	plainAlert("DECK_RESHUFFLE","Mythos");
	let charSpecific = [];
	for(let j = 0; !(j>=z.mythosDiscards.length) && z.fromTheAbyss; j++){
		if(d.namedPlayerChooses[z.mythosDiscards[j]]){
			charSpecific.push(z.mythosDiscards.splice(j,1)[0]);
			j--;
		}
	}
	z.mythosDeck = shuffle(z.mythosDiscards);
	z.mythosDiscards = charSpecific;
}

function playMythos(player) {
	if(z.currentMythos !== null) {
		discardMythos();
	}
	z.currentMythos = z.mythosDeck.pop();
	if((d.namedPlayerChooses[z.currentMythos] && (!characterPresent(d.namedPlayerChooses[z.currentMythos]) || z.playerLocations[getPlayerNum(d.namedPlayerChooses[z.currentMythos])] === "Brig")) ||
	   (d.mythosNames[z.currentMythos] === "Personal Crisis" && (z.playerLocations[player] === "Brig" || z.spreadMisfortune))){
	   
		
		plainAlert("MYTHOS_DISCARDED",d.mythosNames[z.currentMythos]);
		if(z.mythosDeck.length === 0) {
			reshuffleMythos();
		}
		let nextMythos = z.mythosDeck[z.mythosDeck.length-1];
		if(!((d.namedPlayerChooses[nextMythos] && (!characterPresent(d.namedPlayerChooses[nextMythos]) || z.playerLocations[getPlayerNum(d.namedPlayerChooses[nextMythos])] === "Brig")) ||
		    (d.mythosNames[nextMythos] === "Personal Crisis" && (z.playerLocations[player] === "Brig" || z.spreadMisfortune)))){
			let alertText = lc("Played Mythos: ") + lc(d.mythosNames[nextMythos]) + ".";
			if(z.playerLocations[z.turn] !== "Brig" && ((z.turn === me && d.currentPlayerChooses[nextMythos] === 1) || (me === z.captain && d.captainChooses[nextMythos] === 1) || 
			   (me === z.keeper && d.keeperChooses[nextMythos] === 1) || (d.namedPlayerChooses[nextMythos] === z.players[me]) )) {
				alertText += "\n"+lc("ITS_YOUR_CHOOSE");
			}		
			addAlert(alertText);
		}
		playMythos(player);
		
		return;
	} else if (d.mythosNames[z.currentMythos] === "Personal Crisis"){
		z.mythosDiscards.push(z.currentMythos);
		for(let j = 0; !(j>=z.numPlayers); j++){
			let k = (player + j) % z.numPlayers;
			let charSpecific = z.characterMythos[k];
			/* URULES: in the Brig */
			if(charSpecific === -1 || z.revealedHybrids[k] || z.playerLocations[k] === "Brig"){
				continue;
			}
			z.mythosDeck.push(charSpecific);
			z.characterMythos[k] = -1;
			if(k === me){
				addAlert(lc("Played Mythos: ") + lc(d.mythosNames[charSpecific]) + ".\n"+lc("ITS_YOUR_CHOOSE"));
			}
			playMythos(k);
			return;
		}
		plainAlert("MYTHOS_DISCARDED",d.mythosNames[z.currentMythos]);
		if(z.mythosDeck.length === 0) {
			reshuffleMythos();
		}
		let nextMythos = z.mythosDeck[z.mythosDeck.length-1];
		if(!((d.namedPlayerChooses[nextMythos] && (!characterPresent(d.namedPlayerChooses[nextMythos]) || z.playerLocations[getPlayerNum(d.namedPlayerChooses[nextMythos])] === "Brig")) ||
		    (d.mythosNames[nextMythos] === "Personal Crisis" && (z.playerLocations[player] === "Brig" || z.spreadMisfortune)))){
			let alertText = lc("Played Mythos: ") + lc(d.mythosNames[nextMythos]) + ".";
			if(z.playerLocations[z.turn] !== "Brig" && ((z.turn === me && d.currentPlayerChooses[nextMythos] === 1) || (me === z.captain && d.captainChooses[nextMythos] === 1) || 
			   (me === z.keeper && d.keeperChooses[nextMythos] === 1) || (d.namedPlayerChooses[nextMythos] === z.players[me]) )) {
				alertText += "\n"+lc("ITS_YOUR_CHOOSE");
			}		
			addAlert(alertText);
		}
		playMythos(player);
		
	}
	if(player === undefined) {
		z.mythosPlayer = z.turn;
	} else {
		z.mythosPlayer = player;
	}
	initializeMythos();
}

function println(str,v,gen){
	t.value += lc(str,v,gen) + "\r\n";
}

function printlnBold(str,v,gen){
	t.value += bold(lc(str,v,gen)) + "\r\n";
}

function retreatRitual(){
	if(z.ritualTrack === 0){
		plainAlert("RITUAL_NO_RETREAT");
	} else {
		z.ritualTrack--;
		plainAlert("RITUAL_RETREAT_ALERT",ritualTrackName());
	}
}

function ritualTrackName(){
	switch(z.ritualTrack){
		case 0:
		return "Start";
		case 1:
		case 2:
		case 3:
		return "Incantation "+z.ritualTrack;
		case 4:
		return "Cast";
	}
}

function travelTrackName(){
	switch(z.travelTrack){
		case 0:
		return "Start";
		case 1:
		return "Slow Ahead (1)";
		case 2:
		return "Half Ahead (2)";
		case 3:
		return "Full Speed Ahead (3)";
		case 4:
		return "Travel";
	}
}

function activateLocation(location, action) {
	printlnBold("LOCATION_ACTIVATED",[z.players[me],location]);
	
	if(location === "Bridge"){
		riskPassenger(me);
		z.midAction = "Bridge";
		z.actionPerformer = me;
	} else if (location === "Chapel"){

		if(!z.possibleColors[me][LORE] && (!z.fromTheAbyss || !z.possibleColors[me][BOON])){
			
			plainAlert("CHAPEL_CHOICE",z.players[me]);
			retreatRitual();
			finishedAction();
		} else if(z.ritualTrack === 0){
			z.midAction = "Chapel";
			z.actionPerformer = me;
			plainAlert("CHAPEL_NO_CHOICE",z.players[me]);
			addOption(me,"Discard a Lore card","Chapel",true);
		} else {
			z.midAction = "Chapel";
			z.actionPerformer = me;
			plainAlert("CHAPEL_CHOICE",[z.players[me]]);
			addOption(me,"Retreat the Ritual Track","Chapel",true);
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardColorID(z.skillCardHands[me][j]) === LORE || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
					addOption(me,"Discard a Lore card","Chapel",true);
					break;
				}
			}
		}
		
	} else if(location === "Boiler Room"){
		z.midAction = "Boiler Room";
		z.actionPerformer = me;
		plainAlert("BOILER_ROOM",z.players[me]);
		addOption(me,"Discard a Strength card","Boiler Room",true);
	} else if(location === "Captain's Cabin") {
		let promptText = lc("CAPTAINS_CABIN_TARGET_PROMPT",z.numPlayers);
		let validTargets = [];
		for(let j = 0; !(j >= z.numPlayers); j++) {
			promptText += "\n" + (j + 1) + ": ";
			validTargets.push(false);
			if(z.revealedHybrids[j] === 1) {
				promptText += lc("[TRAITOR]");
			} else {
				validTargets[j] = true;
			}
			if(validTargets[j]) {
				promptText += lc(z.players[j]);
			}
		}
		promptNum(promptText, (a) => 1 > a || a > z.numPlayers || !validTargets[a - 1], mainMenu, (target) => {
			printlnBold("CAPTAINS_CABIN_TARGET_CHOSEN",[z.players[me],z.players[target-1]]);
			startLocationSkillCheck(location, target - 1);
			z.activatedLocations[locationIndex(location)] = true;
			if(action){
				didAction();
			}
			z.midAction = "Captain's Cabin";
			z.actionPerformer = me;
			mainMenu();
		});
		return;
	} else if(location === "Cargo Hold"){
		z.midAction = "Cargo Hold";
		z.actionPerformer = me;
		if(z.itemDeck.length >= 2){
			printlnBold("CARGO_HOLD_ACTIVATION",z.players[me],getGender(me));
			let item1 = z.itemDeck.pop();
			let item2 = z.itemDeck.pop();
			addAlert("CARGO_HOLD_DRAW",[d.itemNames[item1],d.itemNames[item2]]);
			addOption(me,"Place an Item in in your play area",["Cargo Hold",[item1,item2]],true);
		} else {
			printlnBold("CARGO_HOLD_ACTIVATION_1",z.players[me],getGender(me));
			let item1 = z.itemDeck.pop();
			addAlert("CARGO_HOLD_DRAW_1",d.itemNames[item1]);
			addOption(me,"Place an Item in in your play area",["Cargo Hold",[item1]],true);
			addOption(me,"Return an Item to the deck",item1,true);
		}
	} else if(location === "Galley"){
		printlnBold("GALLEY_ACTIVATION",z.players[me]);
		addOption(me,"[Galley] Draw Skill Cards",undefined,true);
		z.midAction = "Galley";
		z.actionPerformer = me;
	} else if(location === "Brig"){
		startLocationSkillCheck("Brig", me);
		z.midAction = "Brig";
		z.actionPerformer = me;
	}
	z.activatedLocations[locationIndex(location)] = true;
	if(action){
		didAction();
	}
	mainMenu();
}

const THE_PEACEMAKER = 61;
const MEMORY_OF_THE_DEEP = 65;
const FAMILY_TIES = 67;
const BARRICADE_THE_HATCHES = 2;
const SACRIFICE_DEEP_ONE = 47;
const RUMORS = 145;
const CURSED_WHISPERS = 146;
const SENSE_OF_PROPRIETY = 147;

function defeatPassenger(name) {
	let done = true;
	boldAlert("PASSENGER_DEFEATED_TYPE",name);
	switch (name) {
		case "2 Souls":
			done = decreaseSouls(2);
			break;
		case "1 Soul":
			done = decreaseSouls();
			break;
		case "1 Soul + 1 Sanity":
			done = decreaseSouls();
			done = done && decreaseSanity();
			break;
	}
	z.defeatedPassengers.push(name);
	if(z.thePeacemaker && done){
		plainAlert("PEACEMAKER_DISCARDED");
		done = decreaseSanity() && done;
		delete z.thePeacemaker;
		z.mythosDiscards.push(THE_PEACEMAKER);
	}
	return done;
}


function defeatSupplyPassenger() {
	boldAlert("PASSENGER_SUPPLY_DEFEAT_ALERT");
	let civ = z.passengerSupply.pop();
	return defeatPassenger(civ);
}

function doneWithSleeper(noPrompt){
	
	if(z.temporalDiscovery !== undefined && !noPrompt){
		boldAlert("TEMPORAL_DISCOVERY_TRAVEL_ALERT",z.players[z.temporalDiscovery]);
		addOption(z.temporalDiscovery,"Advance the Travel Track","Temporal Discovery",true);
		addOption(z.temporalDiscovery,"Don't advance the Travel Track",undefined,true);
		return;
	}
	
	if(Array.isArray(z.extraTravel) && z.extraTravel[0] === "Storm Winds"){
		z.extraTravel = z.extraTravel[1];
		doneWithWaypoint();
		return;
	}
	if(Array.isArray(z.extraTravel) && z.extraTravel[0] === "Temporal Discovery"){
		z.extraTravel = z.extraTravel[1];
		SPTokenBad("Temporal Discovery","Travel");
		return;
	}
	if(z.extraTravel === "Boiler Room"){
		delete z.extraTravel;
		finishedAction();
		if(characterPresent("Jeanne") && z.playerLocations[getPlayerNum("Jeanne")] !== "Brig"){
			plainAlert("JURY_RIGGER_NOTIFICATION");
			addOption(getPlayerNum("Jeanne"),"Jury Rigger",undefined,false);
		}
	}
	if(z.extraTravel === "Storm Winds"){
		delete z.extraTravel;
		doneWithWaypoint();
	}
	if(z.extraTravel === "Full Steam Ahead 1"){
		delete z.extraTravel;
		if(advanceTravel()){
			finishedAction();
		} else {
			z.extraTravel = "Full Steam Ahead 2";
		}
	}
	if(z.extraTravel === "Full Steam Ahead 2"){
		delete z.extraTravel;
		finishedAction();
	}
	if(z.extraTravel === "Summon Fire 1"){
		delete z.extraTravel;
		plainAlert("SUMMON_FIRE_ALERT");
		SPTokenBad("Summon Fire");
	}
	if(z.extraTravel === "Summon Fire 2"){
		delete z.extraTravel;
		if(damageShip("Spell")){
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
	}
	if(z.extraTravel === "Mythos"){
		delete z.extraTravel;
		clearSkillCheck();
	}
	if(z.extraTravel === "Jump Icon"){
		delete z.extraTravel;
		primeHorrorIcon();
	}
	if(z.extraTravel === "Respite"){
		z.finishedMythos = true;
	}
}

function doneWithWaypoint(){
	if(!z.awakening && z.distance >= 6){
		if(sleeper()){
			doneWithSleeper();
		}
	} else {
		doneWithSleeper();
	}
}

function processDestination(player) {
	let name = d.waypointNames[z.waypointDiscards[z.waypointDiscards.length - 1]];
	t.value += bold("Destination is " + name) + "\r\n";
	z.travelTrack = 0;
	let input = false;
	switch (name) {
		case "Abandoned Depot":
			increaseDistance(2);
			if(3 > z.passengerSupply.length){
				plainAlert("NOT_ENOUGH_PASSENGERS");
			} else {
				plainAlert("ABANDONED_DEPOT",z.players[player]);
				addOption(player,"[Abandoned Depot] Risk 3 passengers");
				addOption(player,"[Abandoned Depot] Do not risk any passengers");
				input = true;
			}
			break;
		case "Deserted Island":
			increaseDistance(2);
			if(1 > z.passengerSupply.length){
				plainAlert("NOT_ENOUGH_PASSENGERS");
			} else {
				plainAlert("DESERTED_ISLAND",z.players[player]);
				addOption(player,"[Deserted Island] Risk a passenger");
				addOption(player,"[Deserted Island] Do not risk a passenger");
				input = true;
			}
			break;
		case "Hurricane":
			increaseDistance(2);
			plainAlert("HURRICANE",z.players[player]);
			addOption(player, "[Hurricane] Lose 1 Fuel", undefined, true);
			addOption(player, "[Hurricane] Damage the ship 2 times", undefined, true);
			input = true;
			break;
		case "Iceberg":
			increaseDistance(2);
			plainAlert("ICEBERG",z.players[player]);
			addOption(player,"[Iceberg] Take the die roll",undefined,true);
			addOption(player,"[Iceberg] Do not take the die roll",undefined,true);
			input = true;
			break;
		case "Reef":
			increaseDistance(2);
			SPTokenBad("Reef");
			input = true;
			break;
		case "Shipwreck Survivors":
			increaseDistance(2);
			/* UTOOD: these */
			if(1 > z.passengerSupply.length){
				plainAlert("NOT_ENOUGH_PASSENGERS");
			} else {
				plainAlert("SHIPWRECK_SURVIVORS",z.players[player]);
				addOption(player,"[Shipwreck Survivors] Risk a passenger",undefined,true);
				addOption(player,"[Shipwreck Survivors] Do not risk a passenger",undefined,true);
				input = true;
			}
			break;
		case "Wrecked Ship":
			increaseDistance(2);
			/* UTOOD: these */
			if(1 > z.passengerSupply.length){
				plainAlert("NOT_ENOUGH_PASSENGERS");
			} else {
				plainAlert("WRECKED_SHIP",z.players[player]);
				addOption(player,"[Wrecked Ship] Risk a passenger",undefined,true);
				addOption(player,"[Wrecked Ship] Do not risk a passenger",undefined,true);
				input = true;
			}
			break;
		case "Deep One City":
			increaseDistance(3);
			if(decreaseFuel() && spawnDeepOnes(DEEP,5)){
				NoSPToken("Deep One City");
				plainAlert("DEEP_ONES_ROLL");
				input = true;
			}
			break;
		case "Fog Bank":
			increaseDistance(3);
			decreaseFuel();
			SPTokenBad("Fog Bank",player);
			input = true;
			break;
		case "Maelstrom":
			increaseDistance(3);
			if(decreaseFuel()){
				plainAlert("HURRICANE",z.players[player]);
				addOption(player, "[Maelstrom] Lose 1 Fuel", undefined, true);
				addOption(player, "[Maelstrom] Damage the ship 2 times", undefined, true);
				input = true;
			}
			break;
		case "Rainstorm":
			increaseDistance(3);
			if(decreaseFuel()){
				if(1 > z.passengerSupply.length){
					plainAlert("NOT_ENOUGH_PASSENGERS");
				} else {
					plainAlert("DESERTED_ISLAND",z.players[player]);
					addOption(player,"[Rainstorm] Risk a passenger");
					addOption(player,"[Rainstorm] Do not risk a passenger");
					input = true;
				}
			}
			break;
		case "Rogue Wave":
			increaseDistance(3);
			if(decreaseFuel()){
				let any = false;
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] >= DECK && INTERIOR > z.deepOnes[j]){
						z.deepOnes[j] -= 8;
						any = true;
					}
				}
				if(any){
					plainAlert("ROGUE_WAVE_DEEP_ONES");
					any = false;
				}
				let medicalIntervention = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
						medicalIntervention = true;
						break;
					}
				}
				let travelPharmacy = false;
				for(let j = DECK; !(j>=INTERIOR); j++){
					if(z.spacePassengers[j].length > 0){
						any = true;
						if(itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")],d.spaceNames[j])){
							travelPharmacy = true;
						}
					}
				}
				if(any){
					if(!medicalIntervention && !travelPharmacy){
						for(let j = DECK; !(j>=INTERIOR); j++){
							while(z.spacePassengers[j].length > 0 && !z.gameOver){
								defeatPassenger(z.spacePassengers[j].pop());
							}
						}
					} else {
						boldAlert("ROGUE_WAVE_ALERT");
						if(travelPharmacy){
							plainAlert("TRAVEL_PHARMACY_ALERT",z.players[itemHolder("Travel Pharmacy")],getGender(itemHolder("Travel Pharmacy")));
							addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Rogue Wave","",0],false);
						}
						if(medicalIntervention){
							plainAlert("MEDICAL_INTERVENTION_MANY_ALERT");
							addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",["Rogue Wave","",0],false);
						}
						optionForAll("Defeat a passenger in a space",["Rogue Wave","",0],true);
						input = true;
					}
				}
			}
			break;
		case "Rolling Seas":
			increaseDistance(3);
			if(decreaseFuel()){
				let sectors = 0;
				let medicalIntervention = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
						medicalIntervention = true;
						break;
					}
				}
				let travelPharmacy = false;
				let sector = -1;
				for(let j = DECK; !(j>=INTERIOR); j++){
					if(z.spacePassengers[j].length > 0){
						sectors++;
						if(itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")],d.spaceNames[j])){
							travelPharmacy = true;
						}
						sector = j;
					}
				}
				if(sectors === 1){
					if(!medicalIntervention && !travelPharmacy){
						input = defeatPassenger(z.spacePassengers[sector].pop());
					} else {
						plainAlert("ROLLING_SEAS_ALERT_1",[z.players[player],d.spaceNames[sector]]);
						if(travelPharmacy){
							plainAlert("TRAVEL_PHARMACY_NOTIFICATION",z.players[itemHolder("Travel Pharmacy")]);
							addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Rolling Seas",sector,0],false);
						}
						if(medicalIntervention){
							plainAlert("MEDICAL_INTERVENTION_PAUSE");
							addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",["Rolling Seas",sector,0],false);
						}
						
						addOption(player,"Defeat a passenger in a space",["Rolling Seas",sector,0]);
						input = true;
					}
				} else if(sectors > 1){
					boldAlert("ROLLING_SEAS_ALERT",z.players[player]);
					addOption(player,"Defeat a passenger in a space",["Rolling Seas","",0]);
					input = true;
				}
			}
			break;
		case "Sea Smoke":
			increaseDistance(3);
			if(decreaseFuel()){
				for(let j = WATER; !(j>=DECK) && !z.gameOver; j++){
					spawnDeepOne(j);
				}
			}
			break;
		case "Seaweed Patch":
			increaseDistance(3);
			if(decreaseFuel()){
				/* URULES: this */
				addOption(player,"[Seaweed Patch] Risk 2 passengers",undefined,true);
				addOption(player,"[Seaweed Patch] Damage the ship",undefined,true);
				input = true;
			}
			break;
		case "Smooth Sailing":
			increaseDistance(3);
			if(decreaseFuel()){
				decreaseFood();
			}
			break;
		case "Calm Waters":
			increaseDistance(4);
			if(decreaseFuel(2)){
				decreaseFood();
			}
			break;
		case "Deep One Ambush":
			increaseDistance(4);
			if(decreaseFuel(2)){
				for(let j = DECK; !(j>=INTERIOR) && !z.gameOver; j++){
					spawnDeepOne(j);
				}			
			}
			break;
		case "Rough Water":
			increaseDistance(4);
			if(decreaseFuel(2)){
				decreaseSanity();
			}
			break;
		case "Stormy Seas":
			increaseDistance(4);
			if(decreaseFuel(2)){
				input = !damageShip("Waypoint");
			}
			break;
		case "Aurora":
			increaseDistance(2);
			if(1 > z.passengerSupply.length){
				plainAlert("NOT_ENOUGH_PASSENGERS");
			} else {
				plainAlert("AURORA_ALERT",z.players[player],getGender(player));
				addOption(player,"[Aurora] Risk a passenger",undefined,true);
				addOption(player,"[Aurora] Do not risk a passenger",undefined,true);
				input = true;
			}
			break;
		case "Storm Winds":
			increaseDistance(2);
			plainAlert("STORM_WINDS",z.players[player]);
			addOption(player,"[Storm Winds] Take the die roll",undefined,true);
			addOption(player,"[Storm Winds] Do not take the die roll",undefined,true);
			input = true;
			break;
		case "Tranquil Tides":
			increaseDistance(2);
			SPTokenBad("Tranquil Tides");
			input = true;
			break;
		case "Blood Moon":
			increaseDistance(3);
			if(decreaseFuel(1)){
				shuffleTreachery(4);
			}
			break;
		case "Blustering Gale":
			increaseDistance(3);
			if(decreaseFuel(1) && z.passengerSupply.length > 0){
				input = true;
				plainAlert("BLUSTERING_GALE_ALERT");
				NoSPToken("Blustering Gale");
			}
			break;
		case "Kelp Forest":
			increaseDistance(3);
			if(decreaseFuel()){
				input = !activateGraspingTendril("Kelp Forest");
			}
			break;
		case "Sea Foam":
			increaseDistance(3);
			if(decreaseFuel()){
				input = !activateShoggoth("Sea Foam");
			}
			break;
		case "Ship Graveyard":
			increaseDistance(3);
			if(decreaseFuel()){
				input = !activateDrownedSpirit("Ship Graveyard");
			}
			break;
		case "Bone Chill":
			increaseDistance(4);
			if(decreaseFuel(2)){
				for(let j = 0; !(j>=z.numPlayers); j++){
					let k = (z.turn + j) % z.numPlayers;
					if(!z.revealedHybrids[k]){
						input = promptDiscards(k,2,"Bone Chill",!input) && input;
					}
				}
			}
			break;
		case "Mesmerizing Haze":
			increaseDistance(4);
			if(decreaseFuel(2)){
				if(z.passengerSupply.length >= 2){
					plainAlert("MESMERIZING_HAZE_ALERT");
					NoSPToken("Mesmerizing Haze","first");
					input = true;
				} else if(z.passengerSupply.length === 1){
					plainAlert("BLUSTERING_GALE_ALERT");
					NoSPToken("Mesmerizing Haze","second");
					input = true;
				}
			}
		
			
	}
	if(z.gameOver){
		input = true;
	}
	if(!input) {
		doneWithWaypoint();
	}

	textGameState(true);
	
}


function skillCheckEffects() {
	let ef = [];
	for(let j = 0; !(j >= z.revealedCards.length); j++) {
		switch (z.revealedCards[j] - ZERO_STRENGTH) {
			case DIRECT: {
				let any = false;
				for(let j = 0; !(j>=z.numPlayers) && !any; j++){
					any = z.revealedHybrids[j] === 0 && z.playerLocations[j] !== "Brig";
				}
				if(!z.direct && any) {
					ef.push(z.revealedCards[j]);
				}
				break;
			}
			case OUST: {
				let any = false;
				for(let j = 0; !(j>=z.deepOnes.length) && !any; j++){
					any = z.deepOnes[j] !== DEEP && z.deepOnes[j] !== RESERVES;
				}
				if(!z.oust && any) {
					ef.push(z.revealedCards[j]);
				}
				break;
			}
			case INSPIRATION: {
				let revelation = z.revealedCards.includes(REVELATION+ZERO_STRENGTH);
				let turmoil = z.revealedCards.includes(TURMOIL+ZERO_STRENGTH);
				let any = false;
				for(let j = 0; !(j>=z.revealedCards.length) && !any; j++){
					let color = cardColorID(z.revealedCards[j]);
					any = ((color === INFLUENCE && z.thisInfluence) || (color === LORE && z.thisLore) || (color === OBSERVATION && z.thisObservation) || (color === STRENGTH && z.thisStrength) ||
						   (color === WILL && z.thisWill) || (color === TREACHERY && revelation) || (color === BOON && !turmoil)) && (cardName(z.revealedCards[j]) !== "Inspiration");
				}
				if(!z.inspiration && any) {
					ef.push(z.revealedCards[j]);
				}
				break;
			}
			case RUMBLE: {
				let any = false;
				for(let j = 0; !(j>=z.numPlayers) && !any; j++){
					if(z.revealedHybrids[j]){
						continue;
					}
					if(enemiesInMySpace(j) && (!z.thePeacemaker || z.players[j] !== "Arjun")){
						any = true;
					} else if(itemHolder("Repeating Rifle") == j && z.playerLocations[j] !== "Brig" && enemyInAdjacentSpace(j) && (!z.thePeacemaker || z.players[j] !== "Arjun")){
						any = true;
						break;
					} else if(itemHolder("Flare Gun") === j && z.playerLocations[j] !== "Brig" && !z.flareGun){	
						for(let k = 0; !(k>=z.numPlayers) && !any; k++){
							any = z.playerLocations[j] !== z.playerLocations[k] && z.playerLocations[k] !== "Brig";
						}
					}
				}
				if(!z.rumble && any) {
					ef.push(z.revealedCards[j]);
				}
				break;
			}
			case EVACUATION: {
				let any = false;
				for(let j = 0; !(j>=z.spacePassengers.length) && !any; j++){
					any = z.spacePassengers[j].length > 0
				}
				if(!z.evacuation && any) {
					ef.push(z.revealedCards[j]);
				}
				break;
			}
			default:
				break;
		}
	}
	return ef;
}

function canGatherEvidence(){
	if(!characterPresent("Antar") || z.playerLocations[getPlayerNum("Antar")] === "Brig" || z.playerLocations[getPlayerNum("Antar")] === "Sick Bay"){
		return false;
	}
	let revelation = z.revealedCards.includes(REVELATION+ZERO_STRENGTH);
	let turmoil = z.revealedCards.includes(TURMOIL+ZERO_STRENGTH);
	let any = false;
	for(let j = 0; !(j>=z.revealedCards.length) && !any; j++){
		let color = cardColorID(z.revealedCards[j]);
		let value = cardValue(z.revealedCards[j]);
		any = ((color === INFLUENCE && !z.thisInfluence) || (color === LORE && !z.thisLore) || (color === OBSERVATION && !z.thisObservation) || (color === STRENGTH && !z.thisStrength) ||
		       (color === WILL && !z.thisWill) || (color === TREACHERY && !revelation) || (color === BOON && turmoil)) && (value >= 1 && 4 >= value);
	}
	return any && !z.gatherEvidence;
}

function postSkillCheckAbilities(){
	return canGatherEvidence() || skillCheckEffects().length > 0;
}

function clearSkillCheck() {
	if(z.luckyRing) {
		let outcome = skillCheckTally(true)[1];
		if(outcome === "PASS") {
			println("LUCKY_RING_PROC");
			shuffleTreachery();
		}
		delete z.luckyRing;
	}
	if(z.instinct){
		let outcome = skillCheckTally(true)[1];
		if(outcome === "PASS") {
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Instinct")){
					z.feats[j].splice(z.feats[j].indexOf("Instinct"),1);
				}
			}
			plainAlert("INSTINCT_REMOVED");
		}
		delete z.instinct;
	}
	if(!postSkillCheckAbilities()){
		clearSkillCheck2();
	} else {
		if(canGatherEvidence() && skillCheckEffects().length > 0){
			boldAlert("ANTAR_AND_SKILL_CHECK",z.players[z.turn]);
			addOption(getPlayerNum("Antar"),"Gather Evidence",undefined,true);
			addOption(getPlayerNum("Antar"),"Pass on Gather Evidence",undefined,true);
			addOption(z.turn,"Resolve a skill check effect",undefined,true);
		} else if(canGatherEvidence()){
			plainAlert("GATHER_EVIDENCE_WARNING");
			addOption(getPlayerNum("Antar"),"Gather Evidence",undefined,true);
			addOption(getPlayerNum("Antar"),"Pass on Gather Evidence",undefined,true);
		} else {
			boldAlert("SKILL_CHECK_ALERT",z.players[z.turn]);
			addOption(z.turn,"Resolve a skill check effect",undefined,true);
		}
	}
}
	
function clearSkillCheck2() {
	while(z.revealedCards.length > 0) {
		let card = z.revealedCards.pop();
		z.skillCardDiscards[cardColorID(card)].push(card);
	}

	delete z.wellEquipped;
	delete z.experienced;
	delete z.instinct;
	
	if(z.midAction === "Memory of the Deep" || z.midAction === "Captain's Cabin" || z.midAction === "Brig"){
		finishedAction();
	}	
	
	if(z.currentSkillCheck === "Security Officer"){
		wander(SECURITY_OFFICER);
	}
	
	z.currentSkillCheck = null;
	z.thisDifficulty = null;
	z.thisPartial = null;
	z.thisInfluence = null;
	z.thisLore = null;
	z.thisObservation = null;
	z.thisStrength = null;
	z.thisWill = null;
	z.thisTarget = null;
	z.nothingToHide = false;
	z.preparation = false;
	z.skillCheckRevealed = false;
	z.processedOutcome = false;
	delete z.determination;
	delete z.direct;
	delete z.oust;
	delete z.inspiration;
	delete z.rumble;
	delete z.evacuation;
	delete z.gatherEvidence;
	z.determinationCOs = [];
	z.des = [];
	z.deToken = false;
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.tank[j] = false;
		z.des[j] = [];
	}
	z.interrupts = blankArrays(z.numPlayers);
	z.contributingPlayer = 0;
	z.revealedCards = [];
	z.contributionLabels = [];
	for(let i = 0; !(i >= z.numPlayers); i++) {
		z.contributionLabels.push("");
	}
	if(z.currentMythos !== null) {
		if(z.spreadMisfortune){
			/* URULES: does Edmund make subchoices? */
			discardMythos();
			delete z.spreadMisfortune;
			z.finishedMythos = false;
			doneWithRevealEffect(getPlayerNum("Edmund"));
		} else if(arguments.length === 0) {
			primeCylonActivation();
		}
		if(arguments.length === 0){
			z.finishedMythos = true;
		}
	}
}


function interruptChoices() {
	let player = me;
	if(arguments.length > 0) {
		player = arguments[0];
	}
	let interrupts = [];
	/* URULES: duplicate interrupts */
	let forcedLearning = false;
	for(let i = 0; !(i >= z.skillCardHands[player].length); i++) {
		let card = z.skillCardHands[player][i ];
		let name = cardName(card);
		
		if(name === "Nothing to Hide" && !z.nothingToHide) {
			interrupts.push(card);
		} else if(name === "Preparation" && !z.preparation){
			interrupts.push(card);
		} else if(name === "Forced Learning" && !forcedLearning){
			forcedLearning = true;
			if(!z.thisInfluence){
				interrupts.push(cardText(card)+" ("+colorIDName(INFLUENCE)+")");
			}
			if(!z.thisLore){
				interrupts.push(cardText(card)+" ("+colorIDName(LORE)+")");
			}
			if(!z.thisObservation){
				interrupts.push(cardText(card)+" ("+colorIDName(OBSERVATION)+")");
			}
			if(!z.thisStrength){
				interrupts.push(cardText(card)+" ("+colorIDName(STRENGTH)+")");
			}
			if(!z.thisWill){
				interrupts.push(cardText(card)+" ("+colorIDName(WILL)+")");
			}
		}
	}
	if(z.feats[player].includes("Uncanny Fortune") && d.currentPlayerChooses[z.currentSkillCheck] === 0 && 
	   d.namedPlayerChooses[z.currentSkillCheck] === "" &&
	   d.captainChooses[z.currentSkillCheck] === 0 && z.phase === 4 && d.keeperChooses[z.currentSkillCheck] === 0 && 
	   (z.interrupts[player].length === 0 || z.interrupts[player][0].slice(0, 4).toLowerCase() === "pass")) {
		interrupts.push("Uncanny Fortune");
	}
	if(z.feats[player].includes("Self Sacrifice") && (Number.isInteger(z.currentSkillCheck) || z.currentSkillCheck === "Memory of the Deep")) {
		interrupts.push("Self Sacrifice (Pass)");
		interrupts.push("Self Sacrifice (Fail)");
		if(d.partial[z.currentSkillCheck]){
			interrupts.push("Self Sacrifice (Partial)");
		}
	}
	return interrupts;
}

function advanceTravel() {
	z.travelTrack++;
	boldAlert("TRAVEL_TRACK_NO_PUSH_ALERT", travelTrackName());
	
	let any = false;
	if(z.father === WATER+6 || z.father === WATER+7){
		z.father = DEEP;
		any = true;
	}
	if(z.father !== DEEP){
		z.father += 2;
		any = true;
	}
	if(z.mother === WATER+6 || z.mother === WATER+7){
		z.mother = DEEP;
		any = true;
	}
	if(z.mother !== DEEP){
		z.mother += 2;
		any = true;
	}
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(z.deepOnes[j] >= WATER && DECK > z.deepOnes[j]){
			any = true;
			if(z.deepOnes[j] === WATER+6 || z.deepOnes[j] === WATER+7){
				z.deepOnes[j] = DEEP;
			} else {
				z.deepOnes[j] += 2;
			}
		}
	}
	
	let shoggothDefeated = false;
	let drownedSpiritDefeated = false;
	let graspingTendrilDefeated = false;
	if(z.fromTheAbyss){
		if(z.shoggoth === WATER + 6 || z.shoggoth === WATER + 7){
			z.shoggoth = RESERVES;
			any = true;
			shoggothDefeated = true;
		}
		if(z.drownedSpirit === WATER + 6 || z.drownedSpirit === WATER + 7){
			z.drownedSpirit = RESERVES;
			any = true;
			drownedSpiritDefeated = true;
		}
		if(z.graspingTendril === WATER + 6 || z.graspingTendril === WATER + 7){
			z.graspingTendril = RESERVES;
			any = true;
			graspingTendrilDefeated = true;
		}
		if(z.shoggoth >= WATER && !(z.shoggoth >= DECK)){
			z.shoggoth += 2;
			any = true;
		}
		if(z.graspingTendril >= WATER && !(z.graspingTendril >= DECK)){
			z.graspingTendril += 2;
			any = true;
		}
		if(z.drownedSpirit >= WATER && !(z.drownedSpirit >= DECK)){
			z.drownedSpirit += 2;
			any = true;
		}
	
		
	}

	if(any){
		boldAlert("TRAVEL_TRACK_ADVANCE_ALERT");
		if(shoggothDefeated){
			boldAlert("SHOGGOTH_DEFEATED");
		}
		if(graspingTendrilDefeated){
			boldAlert("GRASPING_TENDRIL_DEFEATED");
		}
		if(drownedSpiritDefeated){
			boldAlert("DROWNED_SPIRIT_DEFEATED");
		}
		if((shoggothDefeated || graspingTendrilDefeated || drownedSpiritDefeated) && (z.shoggoth === RESERVES && z.graspingTendril === RESERVES && z.drownedSpirit === RESERVES)){
			z.horror = 0;
			plainAlert("HORROR_TRACK_RESET");
		}
		
	}
	let good = true;
	if(z.spacePassengers[WATER+6].length > 0 || z.spacePassengers[WATER+7].length > 0){
		let medicalIntervention = false;
		let medicalInterventioner = -1;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
				medicalIntervention = true;
				medicalInterventioner = j;
				break;
			}
		}
		let travelPharmacy = itemPresent("Travel Pharmacy") && (z.playerLocations[itemHolder("Travel Pharmacy")] === "Deck Space 7" || z.playerLocations[itemHolder("Travel Pharmacy")] === "Deck Space 8");
		
		if(!medicalIntervention && !travelPharmacy){
			plainAlert("PASSENGERS_SWEPT_BACK");
			while(z.spacePassengers[WATER+6].length > 0 && !z.gameOver){
				defeatPassenger(z.spacePassengers[WATER+6].pop());
			}
			while(z.spacePassengers[WATER+7].length > 0 && !z.gameOver){
				defeatPassenger(z.spacePassengers[WATER+7].pop());
			}
			good = !z.gameOver;
			for(let j = WATER+5; j>=WATER; j--){
				while(z.spacePassengers[j].length > 0){
					z.spacePassengers[j+2].push(z.spacePassengers[j].pop());
				}
			}
		} else {
			boldAlert("PASSENGERS_SWEPT_AWAY_ALERT");
			if(travelPharmacy){
				plainAlert("TRAVEL_PHARMACY_ALERT",z.players[itemHolder("Travel Pharmacy")],getGender(itemHolder("Travel Pharmacy")));
				addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Travel","",0],false);
			}
			if(medicalIntervention){
				plainAlert("MEDICAL_INTERVENTION_MANY_ALERT");
				addOption(medicalInterventioner,"Medical Intervention (passenger)",["Travel","",0],false);
			}
			optionForAll("Defeat a passenger in a space",["Travel","",0],true);
			good = false;
		}
	} else {
		let any = false;
		for(let j = WATER+4; j>=WATER; j--){
			while(z.spacePassengers[j].length > 0){
				any = true;
				z.spacePassengers[j+2].push(z.spacePassengers[j].pop());
			}
		}
		if(any){
			plainAlert("PASSENGERS_SWEPT_BACK");
		}
	}
	if(z.travelTrack === 4 && good) {
		t.value += "[ima" +"geid=6414574 medium]\r\n\r\n";
		boldAlert("TRAVEL_ALERT");
		if(z.distance >= 12) {
			boldAlert("REACHED_BOSTON");
			endGame(true);
		} else {	
			boldAlert("TRAVEL_CHOICE_ALERT",z.players[z.captain]);
			addOption(z.captain,"Choose a Waypoint",undefined,true);
		}
		return false;
	}
	if(good && z.temporalDiscovery !== undefined){
		boldAlert("TEMPORAL_DISCOVERY_TRAVEL_ALERT",z.players[z.temporalDiscovery]);
		addOption(z.temporalDiscovery,"Advance the Travel Track","Temporal Discovery",true);
		addOption(z.temporalDiscovery,"Don't advance the Travel Track",undefined,true);
		return false;
	}
	return good;
}

function retreatTravel() {
	if(z.travelTrack === 0) {
		plainAlert("TRAVEL_CANNOT_DECREASE");
	} else {
		z.travelTrack--;
		plainAlert("TRAVEL_RETREAT",travelTrackName());
	}
	return true;
}

function shuffleTreachery(num) {
	if(num === undefined){
		num = 2;
	}
	let total = z.skillCardDecks[TREACHERY].length + z.skillCardDiscards[TREACHERY].length;
	if(num > total){
		num = total;
		if(num % 2 === 1){
			num--;
		}
	}
	/* URULES: what if there aren't enough? */
	let count = 0;
	for(let j = 0; !(j >= num); j++) {
		let card = drawFromDeck(TREACHERY);
		if(card !== undefined) {
			z.chaos.push(card);
			shuffle(z.chaos);
			count++;
		} else {
			addAlert("TREACHERY_CHAOS_FAIL");
		}
	}
	plainAlert("Shuffled " + count + " Treachery into Chaos.");
}

function shuffleBoons(num) {
	if(num === undefined){
		num = 2;
	}
	let total = z.skillCardDecks[BOON].length + z.skillCardDiscards[BOON].length;
	if(num > total){
		num = total;
		if(num % 2 === 1){
			num--;
		}
	}
	/* URULES: what if there aren't enough? */
	let count = 0;
	for(let j = 0; !(j >= num); j++) {
		let card = drawFromDeck(BOON);
		if(card !== undefined) {
			z.chaos.push(card);
			shuffle(z.chaos);
			count++;
		} else {
			addAlert("BOON_CHAOS_FAIL");
		}
	}
	plainAlert("Shuffled " + count + " Boons into Chaos.");
}

function discardMythos() {
	let per = false;
	switch (d.mythosNames[z.currentMythos]) {
		case "Memory of the Deep":
			per = z.memoryOfTheDeep;
			break;
		case "The Peacemaker":
			per = z.thePeacemaker;
			break;
		case "Family Ties":
			per = z.familyTies;
			break;
		case "Barricade the Hatches":
			per = (z.barricade !== undefined);
			break;
		case "Sacrifice Deep One":
			per = (z.sacrifice !== undefined);
			break;
		case "Rumors":
			per = z.rumors;
			break;
		case "Cursed Whispers":
			per = (z.cursedWhispers !== undefined);
			break;
		case "Sense of Propriety":
			per = (z.senseOfPropriety !== undefined);
			break;
	}
	if(!per) {
		z.mythosDiscards.push(z.currentMythos);
	}
	if(z.mythosDeck.length === 0){
		reshuffleMythos();
	}
	z.currentMythos = null;
	z.mythosPlayer = null;
}

function isLocationDamaged(loc) {
	let index = locationIndex(loc)-INTERIOR;
	if(0 > index || index >= 6){
		return false;
	}
	return z.damage[index] >= 0;
}

/* UTODO: localization here */
function promptDiscards(player, num, context, noAuto) {
	if(z.skillCardHands[player].length === 0) {
		plainAlert(z.players[player] + " has no skill cards; no effect.");
		return true;
	} else if(num >= z.skillCardHands[player].length  && !noAuto) {
		if(player === me) {
			addAlert("You discard your entire hand.");
		}
		z.skillCardHands[player].sort(cardCompare);
		while(z.skillCardHands[player].length > 0) {
			discardSkillCard(player, 0);
		}
		return true;
	} else {
		if(num === 1) {
			plainAlert(z.players[player] + " must discard 1 skill card.");
		} else {
			plainAlert(z.players[player] + " must discard " + num + " skill cards.");
		}
		addOption(player, "Discard a Skill Card", [num,context], true);
		return false;
	}
}



function processOR() {
	if(z.currentMythos === null) {
		return null;
	}
	let done = true;
	switch (d.mythosNames[z.currentMythos]) {
		case "A Closer Look":
			done = activateGraspingTendril("A Closer Look");
			break;
		case "Cabin Fever":
			done = false;
			SPTokenBad("Cabin Fever");
			break;
		case "Creeping Vines":
			if(damageShip("Creeping Vines 1")){
				SPTokenBad("Creeping Vines");
			}
			done = false;
			break;
		case "Ghostly Locket":
			done = activateDrownedSpirit("Ghostly Locket (OR)");
			break;
		case "Pickpocket":
			if((z.spreadMisfortune && z.items[getPlayerNum("Edmund")].length === 0) || (!z.spreadMisfortune && z.items[z.turn].length === 0)){
				plainAlert("No effect.");
			} else {
				done = false;
				SPTokenBad("Pickpocket");
			}
			break;
		case "Seaborne":
			shuffleTreachery(4);
			break;
		case "Shoggoth":
			done = activateShoggoth("Shoggoth (OR)");
			break;
		case "Unseen Follower":
			done = false;
			if(decreaseSanity()){
				let player = z.turn;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				boldAlert("WITCH_HUNT_ALERT",z.players[player]);
				NoSPToken("Unseen Follower",player);
			}
			break;
		case "Terrified Sailor":
			done = decreaseSouls(2);
			break;
		case "Unsolved Case":
			discardEntireHand(getPlayerNum("Antar"));
			if(itemPresent("Notebook")){
				plainAlert("ITEM_IS_REMOVED","Notebook");
				let holder = itemHolder("Notebook");
				for(let j = 0; !(j>=z.items[holder].length); j++){
					if(d.itemNames[z.items[holder][j]] === 'Notebook'){
						z.items[holder].splice(j,1);
						break;
					}
				}	
			}
			break;
		case "Exorcism":
			discardEntireHand(getPlayerNum("Guillaume"));
			done = defeat(getPlayerNum("Guillaume"),"Exorcism");
			break;
		case "Rumors":
			if(z.distance >= 12){
				plainAlert("No effect.");
			} else {
				z.rumors = true;
				boldAlert("RUMORS_OR");
			}
			break;
		case "Sense of Propriety":
			z.senseOfPropriety = getPlayerNum("Raúl");
			boldAlert("SENSE_OF_PROPRIETY_PLACED");
			break;
		case "Power to the People":
			if(z.spreadMisfortune){
				let edmundCaptain = getPlayerNum("Edmund") === z.captain;				
				movePlayer(getPlayerNum("Edmund"),"Brig",true);
				if(!edmundCaptain){
					passCaptain(d.captainSuccession[getCharacter(z.players[z.captain])],true);
				}
				removeOption(getPlayerNum("Edmund"),"[Reveal] Discard a Skill Card");
			} else {
				movePlayer(z.captain,"Brig",true);
			}
			break;
		case "Witch Hunt":
			if(z.spreadMisfortune){
				let edmundKeeper = getPlayerNum("Edmund") === z.keeper;
				movePlayer(getPlayerNum("Edmund"),"Brig",false,true);
				if(!edmundKeeper){
					passKeeper(d.keeperSuccession[getCharacter(z.players[z.keeper])],true);
				}
				removeOption(getPlayerNum("Edmund"),"[Reveal] Discard a Skill Card");
			} else {
				movePlayer(z.keeper,"Brig",false,true);
			}
			break;
		case "Bucket Brigade":
			addAlert("BUCKET_BRIGADE_OR");
			SPTokenBad("Bucket Brigade");
			done = false;
			break;
		case "Criminal Activity": {
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(z.items[player].length === 1){
				plainAlert("ITEM_REMOVED",[z.players[player],d.itemNames[z.items[player][0]]]);
				z.items[player] = [];
				z.activeImprovements[player] = 0;
			} else {
				boldAlert("CRIMINAL_ACTIVITY_OR",z.players[player],getGender(player));
				addOption(player,"Remove 1 of your items from the game","Criminal Activity",true);
				done = false;
			}
			shuffleTreachery(4);
			break;
		}
		case "Firemen Strike":
			if(z.travelTrack === 0){
				done = decreaseFuel();
			} else {
				retreatTravel();
			}
			if(done){
				shuffleTreachery();
			}
			break;
		case "Kitty Litter":
			if(z.spreadMisfortune){
				movePlayer(getPlayerNum("Edmund"),"Galley");
			} else {
				movePlayer(z.turn,"Galley");
			}
			SPTokenBad("Kitty Litter");
			done = false;
			break;
		case "Coal Bunker Fire":
			if(decreaseFuel()){
				SPTokenBad("Coal Bunker Fire");
			}
			done = false;
			break;
		case "Identity Crisis":
			if(decreaseSouls()){
				let player = z.turn;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				if(z.skillCardHands[player].length > 0){
					SPTokenBad("Identity Crisis");
					done = false;
				}
			}
			break;
		case "Ritual Coordination":
			done = activateDeepOnes();
			if(!done){
				z.deepOneContext = "Ritual Coordination";
			}
			break;
		case "Open the Gate":
			decreaseSanity();
			break;
		case "Looming Breakdown":
			if(z.travelTrack >= 2){
				retreatTravel();
				retreatTravel();
			} else if(z.travelTrack === 1){
				decreaseFuel();
			} else {
				decreaseFuel(2);
			}
			break;
		case "History Repeats":
			done = decreaseSanity();
			if(z.spreadMisfortune){
				movePlayer(getPlayerNum("Edmund"),"Brig");
				removeFromAll("[Reveal] Discard a Skill Card");
			} else {
				movePlayer(getPlayerNum("Keilani"),"Brig");
			}
			break;
		case "The Peacemaker":
			if(z.spreadMisfortune){
				plainAlert("MEMORY_OF_THE_DEEP_SPREAD","The Peacemaker");
			} else {
				plainAlert("THE_PEACEMAKER_OR");
				z.thePeacemaker = true;
			}
			break;
		case "Do No Harm":
			if(z.spreadMisfortune){
				movePlayer(getPlayerNum("Edmund"),"Brig");
				removeFromAll("[Reveal] Discard a Skill Card");
			} else {
				movePlayer(getPlayerNum("Svetlana"),"Brig");
			}
			done = damageShip("Do No Harm OR");
			break;
		case "Signs of Life": 
			done = false;
			if(z.passengerSupply.length === 0){
				if(z.spreadMisfortune){
					if(!damageShip("Signs of Life Edmund") && !z.gameOver){
						plainAlert("SIGNS_OF_LIFE_OR_0","Edmund");
					}
				} else {
					if(!damageShip("Signs of Life") && !z.gameOver){
						plainAlert("SIGNS_OF_LIFE_OR_0","Jeanne");
					}
				}
			} else {
				if(z.spreadMisfortune){
					plainAlert("SIGNS_OF_LIFE_OR","Edmund");
					riskPassenger("Signs of Life Edmund");
				} else {
					plainAlert("SIGNS_OF_LIFE_OR","Jeanne");
					riskPassenger("Signs of Life");
				}
			}
			break;
		case "The Game is Afoot": {
			done = damageLocation("Boiler Room",undefined,"The Game is Afoot");
			break;
		}
		case "Memory of the Deep":
			if(z.spreadMisfortune){
				plainAlert("MEMORY_OF_THE_DEEP_SPREAD","Memory of the Deep");
			} else {
				plainAlert("MEMORY_OF_THE_DEEP_PLACE");
				z.memoryOfTheDeep = true;
			}
			break;
		case "Miscalculation":
			addAlert("MISCALCULATION_OR");
			SPTokenBad("Miscalculation");
			done = false;
			break;
		case "Gift of the Mother":
			if(itemPresent('"Lucky" Ring')){
				plainAlert("ITEM_IS_REMOVED",'"Lucky" Ring');
				let holder = itemHolder('"Lucky" Ring');
				for(let j = 0; !(j>=z.items[holder].length); j++){
					if(d.itemNames[z.items[holder][j]] === '"Lucky" Ring'){
						z.items[holder].splice(j,1);
						break;
					}
				}	
			}
			shuffleTreachery(6);
			break;
		case "Ticket, Please": {
			let player = getPlayerNum("Samira");
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(z.items[player].length > 0){
				boldAlert("TICKET_PLEASE_ITEM_DUMP",z.players[player],getGender(player));
				z.items[player] = [];
				z.activeImprovements[player] = 0;
			}
			plainAlert("TICKET_PLEASE_DIE_ROLL",z.players[player]);
			NoSPToken("Ticket, Please");
			done = false;
			break;
		}
		default:
			plainAlert("ERROR: No OR choice found.");
	}
	if(z.gameOver){
		done = false;
	}
	return done;
}


function loseTitleFeatMythos(player){
	if(z.captain === player) {
		passCaptain(d.captainSuccession[getCharacter(z.players[z.captain])]);
	}
	if(z.keeper === player) {
		passKeeper(d.keeperSuccession[getCharacter(z.players[z.keeper])]);
	}
	z.feats[player] = [];
	if(z.players[player] === "Arjun" && z.thePeacemaker){
		plainAlert("PEACEMAKER_DISCARDED");
		delete z.thePeacemaker;
		z.mythosDiscards.push(THE_PEACEMAKER);
	}
	if(z.players[player] === "William" && z.memoryOfTheDeep){
		plainAlert("MEMORY_OF_THE_DEEP_DISCARD");
		delete z.memoryOfTheDeep;
		z.mythosDiscards.push(MEMORY_OF_THE_DEEP);
	}
	if(z.players[player] === "Ishmael" && z.familyTies){
		plainAlert("FAMILY_TIES_DISCARD");
		delete z.familyTies;
		z.mythosDiscards.push(FAMILY_TIES);
	}
	if(z.players[player] === "Ida" && z.rumors){
		plainAlert("RUMORS_DISCARDED");
		delete z.rumors;
		z.mythosDiscards.push(RUMORS);
	}
	if(z.players[player] === "Kokoj" && z.cursedWhispers){
		plainAlert("CURSED_WHISPERS_DISCARD");
		delete z.cursedWhispers;
		z.mythosDiscards.push(CURSED_WHISPERS);
	}
	if(z.players[player] === "Raúl" && z.senseOfPropriety){
		plainAlert("SENSE_OF_PROPRIETY_DISCARD");
		delete z.senseOfPropriety;
		z.mythosDiscards.push(SENSE_OF_PROPRIETY);
	}
	if(player === z.barricade){
		plainAlert("BARRICADE_THE_HATCHES_DISCARDED",z.players[player]);
		delete z.barricade;
		z.mythosDiscards.push(BARRICADE_THE_HATCHES);
	}
	if(player === z.sacrifice){
		plainAlert("SACRIFICE_DEEP_ONE_DISCARDED",z.players[player]);
		delete z.sacrifice;
		z.mythosDiscards.push(SACRIFICE_DEEP_ONE);
	}
	if(z.playerLocations[player] !== "Brig" && z.skillCardHands[player].length > 0){
		plainAlert("TREACHERY_TRADE_ALERT",z.players[player]);
		addOption(player,"[Reveal] Discard a Skill Card",0,false);
	} else {
		plainAlert("NO_SKILL_CARDS",z.players[player]);
	}
	if(z.midAction === "Reveal"){
		finishedAction();
	}
}

function discardEntireHand(player) {
	if(z.skillCardHands[player].length === 0) {
		plainAlert("NO_SKILL_CARDS_TO_DISCARD",z.players[player]);
		return true;
	} else {
		z.skillCardHands[player].sort(cardCompare);
		
		let cardList = lc("DISCARD_ENTIRE_HAND",z.players[player],getGender(player));
		while(z.skillCardHands[player].length > 0) {
			let card = z.skillCardHands[player].shift();
			z.skillCardDiscards[cardColorID(card)].push(card);
			cardList += "\r\n"+cardText(card);
		}
		plainAlert(cardList);
		z.possibleColors[player] = [0, 0, 0, 0, 0, 0];
		return true;
	}
}

function canEldritchInfluence(player){
	if(player === undefined){
		player = me;
	}
	if(z.players[player] !== "Kokoj" || z.playerLocations[player] === "Brig" || z.skillCardHands[player].length === 0 || z.revealedHybrids[player]){
		return false;
	}
	if(z.actionPerformer === player && (z.xoStack.length === 0 || z.xoStack[z.xoStack.length-1] !== "Cadet")){
		return true;
	}
	for(let j = z.xoStack.length-1; j>=0; j--){
		if(z.xoPerformers[j] === player && z.xoStack[j] !== "Cadet"){
			return true;
		}
	}
	return false;
}

function canAnyoneMaau(){
	if(z.maau || !itemPresent("Maau")){
		return false;
	}
	if(z.turn === itemHolder("Maau") && z.lastDieRoll !== "Initial Ally Placement" && z.lastDieRoll !== "Surplus" && z.lastDieRoll !== "Shortage"){
		return true;
	}
	if(z.actionPerformer === itemHolder("Maau") && (z.xoStack.length === 0 || z.xoStack[z.xoStack.length-1] !== "Cadet")){
		return true;
	}
	for(let j = z.xoStack.length-1; j>=0; j--){
		if(z.xoPerformers[j] === itemHolder("Maau") && z.xoStack[j] !== "Cadet"){
			return true;
		}
	}
	return false;
}

function canChangeDieRoll() {
	return canAnyoneMaau() || canBaseballBat();
}

function canBaseballBat(){
	if(!itemPresent("Baseball Bat") || z.playerLocations[itemHolder("Baseball Bat")] === "Brig"){
		return false;
	}
	if(z.lastDieRoll === "PLAYER_VS_PLAYER" || z.lastDieRoll === "HUMAN_VS_DEEP_ONE" || z.lastDieRoll === "PLAYER_VS_HORROR"){
		if(Array.isArray(z.lastDieRollParams) && z.lastDieRollParams.length === 2 && z.lastDieRollParams[2] === "Baseball Bat"){
			return true;
		}
	}
	return false;
}

function canUncannyLuck(player){
	if(player === undefined){
		player = me;
	}
	if(z.actionPerformer === z.uncannyLuck && !z.uncannyLuckUsed && z.actionPerformer === me && (z.xoStack.length === 0 || z.xoStack[z.xoStack.length-1] !== "Cadet")){
		return true;
	}
	for(let j = z.xoStack.length-1; j>=0; j--){
		if(z.xoPerformers[j] === z.uncannyLuck && !z.uncannyLuckUsed && z.xoPerformers[j] === me && z.xoStack[j] !== "Cadet"){
			return true;
		}
	}
	return false;
}

function canModifyDieRoll() {
	if(characterPresent("Edmund") && z.skillCardHands[getPlayerNum("Edmund")].length > 0 && z.playerLocations[getPlayerNum("Edmund")] !== "Brig"){
		return true;
	}
	if(z.pocketPistol){
		return true;
	}
	if(z.lastDieRoll === "HUMAN_VS_DEEP_ONE" || z.lastDieRoll === "PLAYER_VS_PLAYER" || z.lastDieRoll === "DEEP_ONE_VS_HUMAN" ||
	   z.lastDieRoll === "PLAYER_VS_HORROR" || z.lastDieRoll === "SHOGGOTH_VS_HUMAN" || z.lastDieRoll === "GRASPING_TENDRIL_VS_HUMAN" ||
	   z.lastDieRoll === "RUFFIAN_VS_DEEP_ONE" || z.lastDieRoll === "RUFFIAN_VS_HORROR" || z.lastDieRoll === "RUFFIAN_VS_PLAYER"){
		for(let j = 0; !(j>=z.possibleColors.length); j++){
			if(z.possibleColors[j][STRENGTH]){
				return true;
			}
		}
	}
	if(z.uncannyLuck !== undefined && z.actionPerformer === z.uncannyLuck && !z.uncannyLuckUsed && (z.xoStack.length === 0 || z.xoStack[z.xoStack.length-1] !== "Cadet")){
		return true;
	}
	for(let j = z.xoStack.length-1; j>=0; j--){
		if(z.xoPerformers[j] === z.uncannyLuck && !z.uncannyLuckUsed && z.xoStack[j] !== "Cadet"){
			return true;
		}
	}
	return canChangeDieRoll();
}

function locationIndex(loc){
	switch(loc){
		case "Bridge":
		return BRIDGE;
		case "Chapel":
		return CHAPEL;
		case "Captain's Cabin":
		return CAPTAINS_CABIN;
		case "Cargo Hold":
		return CARGO_HOLD;
		case "Galley":
		return GALLEY;
		case "Boiler Room":
		return BOILER_ROOM;
		case "Sick Bay":
		return SICK_BAY;
		case "Brig":
		return BRIG;
		case "Deep":
		return DEEP;
	}
	if(loc.startsWith("Deck Space")){
		return parseInt(loc[loc.length-1])+DECK-1;
	} else if(loc.startsWith("Water Space")){
		return parseInt(loc[loc.length-1])+WATER-1;
	}
	return 0;
}

function interiorRoll(value){
	if(value >= 7){
		return "Boiler Room";
	} else if(value === 6){
		return "Galley";
	} else if(value === 5){
		return "Cargo Hold";
	} else if(value === 4){
		return "Captain's Cabin";
	} else if(value === 3){
		return "Chapel";
	} else {
		return "Bridge";
	}
}

const ABLE_SEAMAN = 0;
const CADET = 1;
const CONSPIRACY_THEORIST = 2;
const FORTUNE_TELLER = 3;
const GAMBLER = 4;
const HOST = 5;
const MECHANIC = 6;
const PROFESSOR = 7;
const QUARTERMASTER = 8;
const RUFFIAN = 9;
const SECURITY_OFFICER = 10;
const SOLDIER = 11;

function allyPresent(ally){
	for(let j = 0; !(j>=z.allies.length); j++){
		if(z.allies[j][0] === ally){
			return true;
		}
	}
	return false;
}



function wander(ally){
	if(allyPresent(ally)){
		plainAlert("ALLY_WANDERS",d.allyNames[ally]);
		NoSPToken("Wander",ally);
		return false;
	} else if(z.unfinishedBusiness){
		if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Unfinished Business"){
			z.midAction = z.xoStack.pop();
			z.actionPerformer = z.xoPerformers.pop();
		}
		z.unfinishedBusiness--;
		if(z.unfinishedBusiness === 0 || z.guillaumeAllies.length === 0){
			delete z.unfinishedBusiness;
			finishedAction();
		} else {
			addOption(z.allyUser[z.allyUser.length-1],"[Unfinished Business] Use an Ally",undefined,true);
			if(z.guillaumeAllies.length > 3){
				addOption(z.allyUser[z.allyUser.length-1],"[Unfinished Business] Remove an Ally from the game",undefined,true);
			} else {
				addOption(z.allyUser[z.allyUser.length-1],"I'm done with Unfinished Business",undefined,true);
			}
		}
	}
	z.allyUser.pop();
	if(z.allyUser.length === 0){
		delete z.allyUser;
	}
}

function doneWithAttack(params){
	/* attacker, location (if Deep One) or target (if not), weapon, number of attacks left */
	let player = -1;
	let weapon = "";
	if(params[0] === "Ruffian"){
		weapon = "Ruffian";
		player = getPlayerNum(params[0]);
	} else {
		player = getPlayerNum(params[0]);
		weapon = params[2];
	}
	let target = params[1];
	if(d.spaceNames.includes(params[1])){
		target = "Deep One";
	}
	let additionalAttacks = params[3];
	
	if(weapon === "Ruffian"){
		wander(RUFFIAN);
	} else if((z.midAction === "Attack Deep One" || z.midAction === "Attack Player" || z.midAction === "Attack Horror") && (params[2] !== "Fillet Knife" || !enemiesInMySpace(player,target))){
		finishedAction();
	} else if (z.midRumble && weapon !== "Flare Gun" && (weapon !== "Fillet Knife" || !enemiesInMySpace(player,target))){
		delete z.midRumble;
		if(!postSkillCheckAbilities()){
			clearSkillCheck2();
		}
	} else if(weapon === "Fillet Knife"){
		if(z.midAction === "Rampage"){
			if(additionalAttacks > 0 && enemiesInMySpace(player)){
				addOption(player,"[Fillet Knife] Attack an enemy",additionalAttacks,true);
				if(enemiesInMySpace(player,target)){
					boldAlert("FILLET_KNIFE_AGAIN_ALERT",z.players[player],getGender(player));
					addOption(player,"[Fillet Knife] Attack another enemy",target,false);
				}
				addOption(player,"I'm done with Rampage",undefined,true);
			} else if(enemiesInMySpace(player,target)){
				boldAlert("FILLET_KNIFE_AGAIN_ALERT",z.players[player],getGender(player));
				addOption(player,"[Fillet Knife] Attack another enemy",target,true);
				addOption(player,"I'm done with Rampage",undefined,true);
			} else {
				notebookCheck(z.notebookCard,player);
				season(player,STRENGTH);
				finishedAction();
			}
		} else {
			boldAlert("FILLET_KNIFE_AGAIN_ALERT",z.players[player],getGender(player));
			addOption(player,"[Fillet Knife] Attack another enemy",target,true);
		}
	} else if(weapon === "Fillet Knife (bis)"){
		if(!enemiesInMySpace(player) || !hasOption(player,"[Fillet Knife] Attack an enemy")){
			removeOption(player,"[Fillet Knife] Attack an enemy");
			removeOption(player,"I'm done with Rampage");
			notebookCheck(z.notebookCard,player);
			season(player,STRENGTH);
			finishedAction();
		}
	} else if(weapon === "Close Range" || weapon === "Six-Shooter" || weapon === "Pocket Pistol" || weapon === "Shotgun" || weapon === "Baseball Bat"){
		if(!enemiesInMySpace(player) || (weapon === "Baseball Bat" && !itemPresent("Baseball Bat")) || additionalAttacks === 0){
			removeOption(player,"I'm done with Rampage");
			notebookCheck(z.notebookCard,player);
			season(player,STRENGTH);
			finishedAction();
		} else {
			if(weapon === "Close Range"){
				addOption(player,"Attack an enemy",additionalAttacks,true);
			} else {
				addOption(player,"["+weapon+"] Attack an enemy",additionalAttacks,true);
			}
			addOption(player,"I'm done with Rampage",undefined,true);
		}
	} else if(weapon === "Repeating Rifle"){
		if(!enemyInAdjacentSpace(player) || additionalAttacks === 0){
			notebookCheck(z.notebookCard,player);
			season(player,STRENGTH);
			finishedAction();
		} else {
			addOption(player,"[Repeating Rifle] Attack an enemy",additionalAttacks,true);
			addOption(player,"I'm done with Rampage",undefined,true);
		}
	} else if(weapon === "Flare Gun"){
		if(z.midAction === "Rampage"){
			if(canFlareGunAlert(player)){
				addOption(player,"[Flare Gun] Alert another character","Rampage",true);
				addOption(player,"I'm done with Rampage",undefined,true);
			} else {
				notebookCheck(z.notebookCard,player);
				season(player,STRENGTH);
				finishedAction();
			}
		} else if(z.midRumble){
			if(canFlareGunAlert(player)){
				addOption(player,"[Flare Gun] Alert another character","Rumble",true);
				addOption(player,"[Flare Gun] Don't alert another character","Rumble",true);
			} else {
				delete z.midRumble;
				if(!postSkillCheckAbilities()){
					clearSkillCheck2();
				}
			}
		} else {
			if(canFlareGunAlert(player)){
				addOption(player,"[Flare Gun] Alert another character","Attack",true);
				addOption(player,"[Flare Gun] Don't alert another character","Attack",true);
			} else {
				finishedAction();
			}
		}
	}
}

function processDieRoll() {
	let value = z.lastDieRollValue + z.lastDieRollModifier;
	let modifier = z.lastDieRollModifier;
	let oldAlmanac = z.almanac;
	let roll = z.lastDieRoll;
	let params = z.lastDieRollParams;
	z.lastDieRollValue = 0;
	z.lastDieRollModifier = 0;
	z.lastDieRoll = null;
	z.lastDieRollParams = null;
	delete z.pocketPistol;
	delete z.perfectNumber;
	z.almanac = true;
	z.dieRollModifier = 0;
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.sps[j] = [];
	}
	if(z.uncannyLuckNow){
		delete z.uncannyLuckNow;
		if(2 >= value){
			if(decreaseSanity()){
				boldAlert("UNCANNY_LUCK_GONE");
				delete z.uncannyLuck;
			} else {
				return;
			}
		}
	}
	if(roll === "Chapel"){
		if( 7 > value) {
			decreaseSanity();
		}
		if(!z.gameOver){
			if(advanceRitual()){
				finishedAction();
			} else {
				z.extraRitual = "Chapel";
			}
		}
	} else if (roll === "Temporal Barrier"){
		if(5 >= value){
			decreaseSanity();
		}
		if(!z.gameOver){
			if(params === "Mother Hydra"){
				doneWithMother();
			} else if (params === "Shoggoth"){
				if(z.shoggoth === RESERVES && z.shoggothContext === "Horror"){
					z.horror = 0;
					delete z.shoggothContext;
					doneWithHorror();
				} else {
					doneWithShoggoth();
				}
			} else if (params === "Drowned Spirit"){
				if(z.drownedSpirit === RESERVES && z.drownedSpiritContext === "Horror"){
					z.horror = 0;
					delete z.drownedSpiritContext;
					doneWithHorror();
				} else {
					doneWithDrownedSpirit();
				}
				
			} else if (params === "Grasping Tendril"){
				if(z.graspingTendril === RESERVES && z.graspingTendrilContext === "Horror"){
					z.horror = 0;
					delete z.graspingTendrilContext;
					doneWithHorror();
				} else {
					doneWithGraspingTendril();
				}
			} else if (params === "Horror"){
				doneWithHorror();
			} else if (Array.isArray(params) && params[0] === "Father Dagon"){
				if(z.midAction === "Perform Rites" && !hasOption(z.turn,"Activate Mother Hydra")){
					finishedAction();
				}
				if(params[1] === "The Father's Favor 2"){
					if(activateFather("The Father's Favor")){
						clearSkillCheck();
					}
				}
				if(params[1] === "The Father's Favor"){
					clearSkillCheck();
				}
				if(params[1] === "Coordinated Assault"){
					if(activateDeepOnes()){
						clearSkillCheck();
					} else {
						z.deepOneContext = "Coordinated Assault";
					}
				}
				if(params[1] === "Looming Danger"){
					if(activateMother("Looming Danger")){
						doneWithChoiceMythos();
					}
				}
				if(params[1] === "Monster"){
					primeJumpIcon();
				}
			} else if(params === "Deep Ones"){
				if(z.deepOneContext === "Call Friends"){
					delete z.deepOneContext;
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				} else if(z.deepOneContext === "Ritual Coordination" || z.deepOneContext === "Volunteer Army"){
					delete z.deepOneContext;
					doneWithChoiceMythos();
				} else if(z.deepOneContext === "Barricade the Hatches" || z.deepOneContext === "Coordinated Assault"){
					delete z.deepOneContext;
					clearSkillCheck();
				} else if(z.deepOneContext === "Monster"){
					delete z.deepOneContext;
					primeJumpIcon();
				} else if(z.deepOneContext === "Deep One Swarm"){
					delete z.deepOneContext;
					if(activateDeepOnes()){
						clearSkillCheck();
					} else {
						z.deepOneContext = "Coordinated Assault";
					}
				} else {
					delete z.deepOneContext;
				}
			}
		}
	} else if (roll === "Cursed Whispers"){
		let player = z.cursedWhispers;
		if(value === 8){
			plainAlert("CURSED_WHISPERS_DISCARD");
			delete z.cursedWhispers;
			z.mythosDiscards.push(CURSED_WHISPERS);
		} else {
			plainAlert("No effect.");
		}
		if(params === "Watch and Learn"){
			finishedAction();
			notebookCheck(z.notebookCard,player);
			season(player,OBSERVATION);
		} else if(params === "Beck and Call"){
			if(z.playerLocations[z.turn] === "Sick Bay"){
				if(z.turn === z.cursedWhispers){
					boldAlert("CURSED_WHISPERS_SICKBAY");
					SPTokenBad("Cursed Whispers","Receive Skills");
				} else {
					println("SICK_BAY_ALERT",z.players[z.turn],getGender(z.turn));
					addOption(z.turn,"Draw 1 Skill Card","Sick Bay",true);
				}
			} else if(z.turn === z.cursedWhispers){
				boldAlert("CURSED_WHISPERS_TURN_START");
				addOption(z.turn,"Receive Skills for this turn","Cursed Whispers",true);
			} else {
				for(let i = 0; !(i >= 5); i++) {
					for(let j = d.skillDraws[i ][getCharacter(z.players[z.turn])]; j > 0; j--) {
						dealSkillCard(z.turn, i);
					}
				}
				if(z.activeImprovements[z.turn] && z.playerLocations[z.turn] !== "Brig"){
					dealSkillCard(z.turn,z.activeImprovements[z.turn] - FINE_CLOTHES);
				}
				if(itemPresent("Valise") && itemHolder("Valise") === z.turn && z.valiseImprovement){
					dealSkillCard(z.turn,z.valiseImprovement - FINE_CLOTHES);
				}
				if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === z.turn && z.playerLocations[z.turn] !== "Brig"){
					dealSkillCard(z.turn,TREACHERY);
				}
				if(z.blessing === me){
					dealSkillCard(z.turn,BOON);
				}
				addAlert("RECEIVE_SKILLS_HUMAN",z.players[z.turn],getGender(z.turn));
				z.phase = 1;
			}
		} else if (params === "Receive Skills"){
			z.phase = 1;
		} else if (params === "Galley"){
			finishedAction();
		} else if(params === "Tranquil Tides"){
			doneWithWaypoint();
		} else if(params === "Ritual Candles"){
			finishedAction();
		} else if(params === "Conspiracy Theorist"){
			wander(CONSPIRACY_THEORIST);
		} else if(params === "Professor"){
			wander(PROFESSOR);
		} else if(params === "Gambler"){
			wander(GAMBLER);
		} else if(params === "Persistence"){
			z.skillCardDiscards[WILL].push(z.midAction[1]);
			notebookCheck(z.midAction[1],me);
			season(me,WILL);
			finishedAction();
		} else if(params === "Ominous Visions"){
			activateHorror(z.horrorContext);
		} else if(params === "Identity Crisis"){
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(hasOption(j,"Draw 1 Skill Card")){
					any = true;
					break;
				}
			}
			if(!any){
				clearSkillCheck();
			}
		} else if(params === "Battering Waves"){
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(hasOption(j,"Activate an Improvement")){
					any = true;
					break;
				}
			}
			if(!any){
				clearSkillCheck();
			}
		} else if(params === "Mythos"){
			clearSkillCheck();
		} else if(params === "Choice Mythos"){
			doneWithChoiceMythos();
		} else if(params === "Cleansing Rain"){
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(hasOption(j,"[Cleansing Rain] Move")){
					any = true;
					break;
				}
			}
			if(!any){
				doneWithChoiceMythos();
			}
		} else if(params === "Precognition"){
			if(!hasOption(player,"[Precognition] Put 2 Skill Cards on top of the Chaos Deck")){
				clearSkillCheck();
			}
		} else if(params === "Pickpocket"){
			doneWithRevealEffect(getPlayerNum("Samira"));
		} else if(params === "Criminal Activity"){
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(hasOption(j,"Remove all but 1 of your items from the game")){
					any = true;
					break;
				}
			}
			if(!any){
				clearSkillCheck();
			}
		}
	} else if (roll === "Uncanny Luck"){
		plainAlert("No effect.");
	} else if (roll === "Unseen Follower"){
		movePlayer(params,d.spaceNames[DECK-1+value]);
		doneWithChoiceMythos();
	} else if (roll === "Outbreak"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			decreaseSouls();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if(roll === "Make Ready"){
		spawnAlly(d.spaceNames[DECK+value-1]);
		doneWithChoiceMythos();
	} else if (roll === "Creeping Vines"){
		if(value > 4){
			plainAlert("No effect.");
			doneWithChoiceMythos();
		} else {
			if(damageShip("Creeping Vines 2")){
				doneWithChoiceMythos();
			}
		}
	} else if (roll === "Temporal Discovery"){
		if(5 >= value){
			decreaseSanity();
		}
		if(!z.gameOver){
			if(params === "Travel"){
				doneWithSleeper();
			} else {
				doneWithRitual();
			}
		}
	} else if (roll === "Storm of Spirits"){
		if(value > params){
			plainAlert("No effect.");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		} else {
			if(activateDrownedSpirit("Storm of Spirits")){
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
		}
	} else if (roll === "Cast Out"){
		if(value >= 6){
			let any = (z.shoggoth && z.shoggoth >= DECK) || (z.drownedSpirit && z.drownedSpirit >= DECK) || z.graspingTendril;
			let any2 = any;
			let count = 0;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] >= DECK){
					any = true;
					count++;
				}
				any = (z.deepOnes[j] >= DECK) || any;
			}
			let any3 = false;
			for(let j = 0; !(j>=z.numPlayers) && !any3; j++){
				any3 = z.revealedHybrids[j];
			}
			any |= any3;
			if(any){
				if(any2){
					addOption(params,"Repel a Horror","Cast Out (bis)",true);
				}
				if(count){
					addOption(params,"Defeat a Deep One","Cast Out (bis)",true);
				}
				if(any3){
					addOption(params,"Defeat a player","Cast Out (bis)",true);
				}
				addOption(params,"Do not resolve Cast Out again",undefined,true);
				boldAlert("CAST_OUT_ALERT_AGAIN",z.players[me]);
			} else {
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
		} else {
			if(decreaseSanity()){
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
		}
	} else if (roll === "To Arms! (top)"){
		if(value >= 6){
			addOption(params[1],"Repel a Horror",[z.players[params[1]],params[0],"To Arms!"],true);
			boldAlert("TO_ARMS_SUCCESS_ALERT",[z.players[params[1]],params[0]]);
		} else {
			if(z.allyDeck.length > 0){
				let ally = d.allyDeck.pop();
				/* ARULES: one at a time or after both? */
				if(characterPresent("Guillaume")){
					plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[ally]);
					z.guillaumeAllies.push(ally);
				} else {
					plainAlert("PLAYER_DEFEATED",d.allyNames[ally]);
				}
			}
			if(z.allyDeck.length > 0){
				let ally = d.allyDeck.pop();
				/* ARULES: one at a time or after both? */
				if(characterPresent("Guillaume")){
					plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[ally]);
					z.guillaumeAllies.push(ally);
				} else {
					plainAlert("PLAYER_DEFEATED",d.allyNames[ally]);
				}
			}
			let done = true;
			if(z.guillaumeAllies.length > 3){
				boldAlert("GUILLAUME_TOO_MANY",1);
				addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game","To Arms!",true);
				done = false;
			}
			done = decreaseSouls() && done;
			
			if(done){
				doneWithChoiceMythos();
			}
			
				
				
			
		}
	} else if (roll === "Conjure Fortune"){
		if(value > params){
			plainAlert("No effect.");
		} else {
			decreaseSanity(2);
		}
		if(!z.gameOver){
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
	} else if (roll === "Blustering Gale"){
		if(value >= 5){
			z.spacePassengers[WATER+1].push(z.passengerSupply.pop());
			plainAlert("BLUSTERING_GALE_RESULT",2);
		} else {
			z.spacePassengers[WATER].push(z.passengerSupply.pop());
			plainAlert("BLUSTERING_GALE_RESULT",1);
		}
		doneWithWaypoint();
	} else if (roll === "Mesmerizing Haze"){
		if(value >= 5){
			z.spacePassengers[WATER+1].push(z.passengerSupply.pop());
			plainAlert("BLUSTERING_GALE_RESULT",2);
		} else {
			z.spacePassengers[WATER].push(z.passengerSupply.pop());
			plainAlert("BLUSTERING_GALE_RESULT",1);
		}
		if(params === "first"){
			NoSPToken("Mesmerizing Haze","second");
		} else {
			doneWithWaypoint();
		}
	} else if (roll === "Tranquil Tides"){
		if(value >= 5){
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(k === z.cursedWhispers){
					SPTokenBad("Cursed Whispers","Tranquil Tides");
				} else {
					dealSkillCard(k,BOON);
				}
			}
		} else {
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(k === z.cursedWhispers){
					SPTokenBad("Cursed Whispers","Tranquil Tides");
				} else {
					dealSkillCard(k,TREACHERY);
				}
			}
		}
		if(z.cursedWhispers === undefined){
			doneWithWaypoint();
		}
	} else if (roll === "Instinct"){
		z.wellEquipped = value;
		boldAlert("INSTINCT_ALERT",value);
		println(skillCheckTally(true)[0]);
		z.des[me].push(["Instinct",value]);
		DEToken();
	} else if (roll === "Gather Friends"){
		if(spawnDeepOne(DECK-1+value)){
			params++;
			if(params > 3){
				doneWithRevealEffect(getPlayerNum("Ida"));
			} else {
				NoSPToken("Gather Friends",params);
			}
		}
	} else if(roll === "Wander"){
		let index = locationIndex(z.playerLocations[z.allyUser[z.allyUser.length-1]]);
		let dest = -1;
		if(index === DECK-1+value){
			if(value===1){
				dest = BRIDGE;
			} else if(value === 8){
				dest = BOILER_ROOM;
			} else {
				dest = DECK-2+value;
			}
		} else if(index === BRIDGE && value === 1){
			dest = DECK;
		} else if(index === BOILER_ROOM && value === 8){
			dest = DECK+7;
		} else if(index === INTERIOR - 2 + value && value > 1){
			dest = DECK-1+value;
		} else {
			addOption(z.allyUser[z.allyUser.length-1],"Choose where the "+d.allyNames[params]+" wanders",[params,value],true);
		}
		if(dest !== -1){
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][0] === params){
					plainAlert("ALLY_WANDERS_TO",[d.allyNames[params],d.spaceNames[dest]]);
					z.allies[j][1] = d.spaceNames[dest];
					fleeCheck(dest);
					break;
				}
			}
		}
	} else if (roll === "Instill Bravery"){
		if(4 >= value){
			decreaseSanity();
		}
		if(!z.gameOver){
			z.instillBravery = params;
			z.instillBraveryCount = 2;
			plainAlert("INSTILL_BRAVERY_START");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
	} else if (roll === "Gambler"){
		let done = true;
		if(value >= 5){
			done = drawItem(params,"Gambler");
		} else {
			if(z.items[params].length === 0){
				plainAlert("No effect.");
			} else {
				shuffle(z.items[params]);
				let item = z.items[params].pop();
				if(d.itemNames[item] === "Cursed Mask"){
					plainAlert("CURSED_MASK_TRIGGER",z.players[params]);
					z.items[params].push(item);
					if(params === z.cursedWhispers){
						SPTokenBad("Cursed Whispers","Gambler");
						done = false;
					} else {
						dealSkillCard(params,TREACHERY);
					}
				} else {
					plainAlert("BATTERING_WAVES_ITEM_LOST",[z.players[params],d.itemNames[item]]);
					z.itemDeck.push(item);
					shuffle(z.itemDeck);
					if(isImprovement(item) || item === VALISE){
						if(!resetImprovements(params)){
							addOption(params,"Activate an Improvement","Gambler",true);
							plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[params]);
							done = false;
						} 
					}
				}
			}	
		}
		if(done){
			wander(GAMBLER);
		}
	} else if (roll === "Pickpocket"){
		if(value >= 7){
			plainAlert("No effect.");
			doneWithChoiceMythos();
		} else {
			let done = true;
			if(z.spreadMisfortune){
				if(z.items[getPlayerNum("Edmund")].length > 0){
					shuffle(z.items[getPlayerNum("Edmund")]);
					let item = z.items[getPlayerNum("Edmund")].pop();
					if(d.itemNames[item] === "Cursed Mask"){
						plainAlert("CURSED_MASK_TRIGGER","Edmund");
						z.items[getPlayerNum("Edmund")].push(item);
						dealSkillCard(getPlayerNum("Edmund"),TREACHERY);
					} else {
						plainAlert("ITEM_REMOVED",["Edmund",d.itemNames[item]]);
						if(isImprovement(item) || item === VALISE){
							if(!resetImprovements(getPlayerNum("Edmund"))){
								addOption(getPlayerNum("Edmund"),"Activate an Improvement","Pickpocket (OR)",true);
								plainAlert("MULTIPLE_IMPROVEMENTS_ALERT","Edmund");
								done = false;
							}
						}
					}
				}
			} else {
				if(z.items[z.turn].length > 0){
					shuffle(z.items[z.turn]);
					let item = z.items[z.turn].pop();
					if(d.itemNames[item] === "Cursed Mask"){
						plainAlert("CURSED_MASK_TRIGGER",z.players[z.turn]);
						z.items[z.turn].push(item);
						if(z.turn === z.cursedWhispers){
							done = false;
							SPTokenBad("Cursed Whispers","Choice Mythos");
						} else {
							dealSkillCard(z.turn,TREACHERY);
						}
					} else {
						plainAlert("ITEM_REMOVED",[z.players[z.turn],d.itemNames[item]]);
						if(isImprovement(item) || item === VALISE){
							if(!resetImprovements(z.turn)){
								addOption(z.turn,"Activate an Improvement","Pickpocket (OR)",true);
								plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[z.turn]);
								done = false;
							} 
						}
					}
				}
			}
			if(done){
				doneWithChoiceMythos();
			}
		}
	} else if (roll === "Mysterious Rune"){
		if(value >= 6){
			if(z.spreadMisfortune){
				dealSkillCard(getPlayerNum("Edmund"),BOON);
				dealSkillCard(getPlayerNum("Edmund"),BOON);
			} else {
				if(z.turn === z.cursedWhispers){
					SPTokenBad("Cursed Whispers","Choice Mythos");
				} else {
					dealSkillCard(z.turn,BOON);
					dealSkillCard(z.turn,BOON);
				}
			}
		} else {
			activateHorror("Mysterious Rune");
		}
	} else if (roll === "Cabin Fever"){
		if(value > 4){
			plainAlert("No effect.");
			doneWithChoiceMythos();
		} else {
			let done = true;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j]){
					if(!promptDiscards(j,2,"Cabin Fever")){
						done = false;
					}
				}
			}
			if(done){
				doneWithChoiceMythos();
			}
		}
	} else if (roll === "Unsecured Cargo"){
		let space = WATER;
		if(value >= 5){
			space = WATER + 1;
		}
		z.spacePassengers[space].push(z.passengerSupply.pop());
		plainAlert("PASSENGER_SPAWNED",d.spaceNames[space]);
		if(params === "second"){
			let count = 0;
			for(let j = 0; !(j>=8) && z.itemDeck.length > 0; j++){
				z.itemDeck.pop();
				count++;
			}
			if(count === 1){
				plainAlert("UNSECURED_CARGO_SINGULAR");
			} else if(count > 1){
				plainAlert("UNSECURED_CARGO_PLURAL",count);
			}
			clearSkillCheck();
		} else {
			NoSPToken("Unsecured Cargo","second");
			boldAlert("UNSECURED_CARGO_ONE");
		}
	} else if(roll === "Taken"){
		let index = WATER;
		if(value >= 5){
			index = WATER + 1;
		}
		if(spawnDeepOnes(index,2)){
			if(z.passengerSupply.length > 0){
				z.spacePassengers[index].push(z.passengerSupply.pop());
				plainAlert("PASSENGER_SPAWNED",d.spaceNames[index]);
			}
			clearSkillCheck();
		}
	} else if (roll === "Spoilage"){
		if(4 >= value){
			decreaseFood();
		} else {
			plainAlert("No effect.");
		}
		if(!z.gameOver){
			clearSkillCheck();
		}
	} else if (roll === "Missing Persons (partial)"){
		z.spacePassengers[DECK+value-1].push(z.passengerSupply.pop());
		if(z.passengerSupply.length > 0){
			z.spacePassengers[DECK+value-1].push(z.passengerSupply.pop());
			plainAlert("PASSENGERS_SPAWNED",[2,d.spaceNames[DECK+value-1]]);
		} else {
			plainAlert("PASSENGER_SPAWNED",d.spaceNames[DECK+value-1]);
		}
		clearSkillCheck();
	} else if (roll === "Missing Persons (fail)"){
		if(value >= 5){
			z.spacePassengers[WATER+1].push(z.passengerSupply.pop());
			plainAlert("PASSENGER_SPAWNED",d.spaceNames[WATER+1]);
		} else {
			z.spacePassengers[WATER].push(z.passengerSupply.pop());
			plainAlert("PASSENGER_SPAWNED",d.spaceNames[WATER]);
		}
		
		clearSkillCheck();
	} else if (roll === "Monstrous Pursuit"){
		if(value >= 5){
			z.spacePassengers[WATER+1].push(z.passengerSupply.pop());
			plainAlert("PASSENGER_SPAWNED",d.spaceNames[WATER+1]);
		} else {
			z.spacePassengers[WATER].push(z.passengerSupply.pop());
			plainAlert("PASSENGER_SPAWNED",d.spaceNames[WATER]);
		}
		if(activateShoggoth("Monstrous Pursuit")){
			clearSkillCheck();
		}
	} else if (roll === "Shoggoth Placement"){
		spawnShoggoth(DECK - 1 + value);
		activateShoggoth(params);
	} else if (roll === "Grasping Tendril Placement"){
		if(value >= 5){
			spawnGraspingTendril(WATER+1);
		} else {
			spawnGraspingTendril(WATER);
		}
		if(params === "Drag (partial)"){
			clearSkillCheck();
		} else {
			if(activateGraspingTendril(params)){
				doneWithGraspingTendril();
			}
		}
	} else if (roll === "Growing Unease"){
		spawnAlly(d.spaceNames[DECK+value-1]);
		if(params > 1){
			plainAlert("GROWING_UNEASE_ALERT");
			NoSPToken(roll,params-1);
		} else {
			clearSkillCheck();
		}
	} else if(roll === "Drowned Spirit Placement"){
		let loc = interiorRoll(value);
		spawnDrownedSpirit(locationIndex(loc));
		activateDrownedSpirit(params);
	} else if(roll === "Surplus"){
		switch(value){
			case 1:
			case 2:
				increaseFuel();
				increaseFuel();
				break;
			case 3:
			case 4:
				increaseFood();
				increaseFood();
				break;
			case 5:
			case 6:
				increaseSanity();
				increaseSanity();
				break;
			case 7:
			case 8:
				increaseSouls();
				increaseSouls();
				break;
		}
		handlePreludes();
	} else if(roll === "Shortage"){
		let ok = true;		
		switch(value){
			case 1:
			case 2: {
				let base = 8;
				if(z.noCultist){
					base = 7;
				}
				if(z.easierGame){
					base += 2;
				}
				if(z.harderGame){
					base -= 2;
				}
				if(z.fuel === base){
					decreaseFuel(2);
				} else {
					ok = false;
				}
				break;
			}
			case 3:
			case 4: {
				let base = 8;
				if(z.noCultist){
					base = 6;
				}
				if(z.easierGame){
					base += 2;
				}
				if(z.harderGame){
					base -= 2;
				}
				if(z.food === base){
					decreaseFood(2);
				} else {
					ok = false;
				}
				break;
			}
			case 5:
			case 6: {
				let base = 8;
				if(z.noCultist){
					base = 6;
				}
				if(z.easierGame){
					base += 2;
				}
				if(z.harderGame){
					base -= 2;
				}
				if(z.fuel === base){
					decreaseSanity(2);
				} else {
					ok = false;
				}
				break;
			}
			case 7:
			case 8: {
				let base = 8;
				if(z.noCultist){
					base = 7;
				}
				if(z.easierGame){
					base += 2;
				}
				if(z.harderGame){
					base -= 2;
				}
				if(z.fuel === base){
					decreaseSouls(2);
				} else {
					ok = false;
				}
				break;
			}
		}
		if(ok){
			handlePreludes();
		} else {
			z.dieRollModifier = modifier;
			z.dieRollQueue.unshift(roll);
			z.dieRollParams.unshift(params);
			z.dieRoller = z.turn;
			z.almanac = oldAlmanac;
			boldAlert("SETUP_REROLL");
		}
	} else if (roll === "Initial Ally Placement"){
		
		if(params === 1){
			spawnAlly(interiorRoll(value));
			NoSPToken("Initial Ally Placement",2);
			boldAlert("ALLY_SETUP_2");
		} else {
			let loc = interiorRoll(value);
			if(loc !== z.allies[0][1] ){
				spawnAlly(loc);
				if(z.preludes){
					handlePreludes();
				} else {
					dealInitialLoyalties();
				}
			} else {
				z.dieRollModifier = modifier;
				z.dieRollQueue.unshift(roll);
				z.dieRollParams.unshift(params);
				z.dieRoller = z.turn;
				z.almanac = oldAlmanac;
				boldAlert("SETUP_REROLL");
			}
		}
		
	} else if (roll === "The Captain's Banquet" || roll === "To Arms! (bottom)"){
		if(value > 6){
			plainAlert("No effect.");
		} else {
			decreaseSanity();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if(roll === "Missing Parents"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			if(decreaseSouls()){
				spawnDeepOne(locationIndex("Captain's Cabin"));
			}
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if(roll === "Transformation (top option)"){
		if(value > 6){
			plainAlert("No effect.");
		} else {
			if(decreaseSouls()){
				spawnDeepOne(locationIndex("Cargo Hold"));
			}
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Poisoned Food"){
		if(value > 6){
			plainAlert("No effect.");
		} else {
			decreaseSouls();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Ritual Support"){
		if(value >= 7){
			if(advanceRitual()){
				doneWithChoiceMythos();
			} else {
				z.extraRitual = "Ritual Support";
			}
		} else if(decreaseSanity()){
			if(decreaseSouls()){
				doneWithChoiceMythos();
			}
		}
	} else if(roll === "Sacrifice Deep One"){
		if(value >= 6){
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(d.spaceNames[z.deepOnes[j]] === z.playerLocations[z.sacrifice]){
					z.deepOnes[j] = RESERVES;
					break;
				}
			}
			delete z.sacrifice;
			z.mythosDiscards.push(SACRIFICE_DEEP_ONE);
			plainAlert("SACRIFICE_DEEP_ONE_SUCCESS");
			if(advanceRitual()){
				if(advanceRitual()){
					finishedAction();
				} else {
					z.extraRitual = "Sacrifice Deep One 0";
				}
			} else {
				plainAlert("EXTRA_RITUAL_COORDINATION_1");
				z.extraRitual = "Sacrifice Deep One 1";
			}
		} else {
			plainAlert("No effect.");
			finishedAction();
		}
	} else if(roll === "Mysterious Lifeboat"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			if(spawnDeepOne(locationIndex("Galley"))){
				spawnDeepOne(locationIndex("Cargo Hold"));
			}
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "DEEP_ONE_VS_HUMAN"){
		if(value >= 6){
			if(defeat(getPlayerNum(params),"Deep One")){
				resumeDeepOneActivation();
			}
		} else {
			plainAlert("No effect.");
			resumeDeepOneActivation();
		}
	} else if (roll === "SHOGGOTH_VS_HUMAN"){
		let target = params.shift();
		
		if(value >= 6){
			
			if(defeat(getPlayerNum(target),["Shoggoth",params])){
				if(params.length === 0){
					doneWithHorror();
				} else if (params.length === 1){
					plainAlert("SHOGGOTH_ATTACKS_HUMAN",params[0],getGender(getPlayerNum(params[0])));
					NoSPToken("SHOGGOTH_VS_HUMAN",params);
				} else {
					boldAlert("SHOGGOTH_MULTIPLE_HUMANS",[z.players[z.turn],d.spaceNames[z.shoggoth]]);
					addOption(z.turn,"Choose the next Shoggoth target",params,true);
				}
			}
		} else {
			plainAlert("No effect.");
			if(params.length === 0){
				doneWithHorror();
			} else if (params.length === 1){
				plainAlert("SHOGGOTH_ATTACKS_HUMAN",params[0],getGender(getPlayerNum(params[0])));
				NoSPToken("SHOGGOTH_VS_HUMAN",params);
			} else {
				boldAlert("SHOGGOTH_MULTIPLE_HUMANS",[z.players[z.turn],d.spaceNames[z.shoggoth]]);
				addOption(z.turn,"Choose the next Shoggoth target",params,true);
			}
		}
	} else if (roll === "GRASPING_TENDRIL_VS_HUMAN"){
		if(value >= 6){
			if(defeat(getPlayerNum(params),"Grasping Tendril")){
				doneWithGraspingTendril();
			}
		} else {
			plainAlert("No effect.");
			doneWithGraspingTendril();
		}
	} else if(roll === "REVELATION_OF_SCRIPT_ROLL"){
		if(value > params){
			plainAlert("No effect.");
		} else {
			decreaseSanity();
		}
	} else if(roll === "Identity Crisis"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			if(z.spreadMisfortune){
				discardEntireHand(getPlayerNum("Edmund"));
			} else {
				discardEntireHand(z.turn);
			}
		}
		doneWithChoiceMythos();
	} else if (roll === "Infection (1st roll)"){
		if(value > 6){
			plainAlert("No effect.");
			doneWithChoiceMythos();
		} else {
			if(decreaseSouls()){
				SPTokenBad("Infection (2nd roll)");
			}
		}
	} else if (roll === "Infection (2nd roll)"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			decreaseSouls();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Fog Bank"){
		if(value > 4){
			doneWithWaypoint();
		} else {
			z.distance -= 3;
			boldAlert("Distance decreases by 3 to " + z.distance + ".");
			z.waypointDiscards.pop();
			z.waypointDiscards.push(z.waypointDeck.pop());
			processDestination(params);
		}
	} else if(roll === "Deep One City" || roll === "Coordinated Assault"){
		if(value >= 5){
			if(z.mother === DEEP){
				z.mother = WATER+1;
			}
			if(z.father === DEEP){
				z.father = WATER+1;
			}
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER+1;
				}
			}
			plainAlert("DEEP_ONES_ALERT",d.spaceNames[WATER+1]);
		} else {
			if(z.mother === DEEP){
				z.mother = WATER;
			}
			if(z.father === DEEP){
				z.father = WATER;
			}
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER;
				}
			}
			plainAlert("DEEP_ONES_ALERT",d.spaceNames[WATER]);
		}
		if(roll === "Coordinated Assault"){
			if(activateMother("Coordinated Assault")){
				if(activateFather("Coordinated Assault")){
					if(activateDeepOnes()){
						clearSkillCheck();
					} else {
						z.deepOneContext = "Coordinated Assault";
					}
				}
			} else {
				z.motherContext = "Coordinated Assault";
			}
		} else if(roll === "Deep One City"){
			doneWithWaypoint();
		}
	} else if (roll === "Iceberg"){
		if(value >= 5){
			increaseFood();
			doneWithWaypoint();
		} else {
			if(damageShip("Waypoint")){
				doneWithWaypoint();
			}
		}
	} else if (roll === "Storm Winds"){
		if(value >= 6){
			if(advanceTravel()){
				doneWithWaypoint();
			} else {
				if(z.hasOwnProperty("extraTravel")){
					z.extraTravel = ["Storm Winds",z.extraTravel];
				} else {
					z.extraTravel = "Storm Winds";
				}
			}
		} else {
			if(damageShip("Waypoint")){
				doneWithWaypoint();
			}
		}
	} else if(roll === "Reef"){
		if(value > 4){
			plainAlert("No effect.");
			doneWithWaypoint();
		} else {
			if(damageShip("Waypoint")){
				doneWithWaypoint();
			}
		}
	} else if (roll === "Abandoned Depot"){
		if(value >= 5){
			increaseFuel();
			increaseFuel();
		} else {
			plainAlert("No effect.");
		}
		doneWithWaypoint();
	} else if (roll === "Deserted Island" || roll === "Rainstorm"){
		if(value >= 5){
			increaseFood();
		} else {
			plainAlert("No effect.");
		}
		doneWithWaypoint();
	} else if (roll === "Shipwreck Survivors"){
		if(value >= 5){
			increaseSouls();
		} else {
			plainAlert("No effect.");
		}
		doneWithWaypoint();
	} else if (roll === "Wrecked Ship"){
		if(value >= 5){
			increaseFuel();
		} else {
			plainAlert("No effect.");
		}
		doneWithWaypoint();
	} else if(roll === "CALL_FRIENDS"){
		if(value > params){
			plainAlert("No effect.");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		} else {
			z.deepOneContext = "Call Friends";
			activateDeepOnes();
		}
	} else if (roll === "Voice of Ra"){
		if(value > 4){
			plainAlert("No effect.");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		} else {
			let done = true;
			let noAuto = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(hasOption(j,"Draw 1 Skill Card (any color but treachery)") || hasOption(j,"Draw 1 Skill Card (not treachery/boon)")){
					noAuto = true;
					break;
				}
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(z.revealedHybrids[k] === 0){
					done = promptDiscards(k,1,"Voice of Ra",noAuto) && done;
					if(!done){
						noAuto = true;
					}
				}
			}
			if(done){
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
		}
	} else if(roll === "Plague of Locusts"){
		if(value >= 5){
			decreaseFood();
		}
		if(!z.gameOver){
			if(value > 8){
				value = 8;
			}
			let count = 0;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] > DEEP){
					count++;
				}
			}
			if(value >= count){
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] > DEEP){
						z.deepOnes[j] = 0;
					}
				}
				plainAlert("PLAGUE_OF_LOCUSTS_BOOM");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else {
				if(value === 1){
					plainAlert("PLAGUE_OF_LOCUSTS_1",z.players[params]);
				} else {
					plainAlert("PLAGUE_OF_LOCUSTS_ALERT",[z.players[params],value]);
				}
				addOption(params,"Defeat a Deep One",value,true);
			}
		}
	} else if (roll === "DAMAGE_PLACEMENT"){
		if(damageLocation(interiorRoll(value),params[0],params[1])){
			z.damageContext = params[1];
			doneWithDamage();
		}
	} else if (roll === "Infiltrator" || roll === "Lurking Creature"){
		spawnDeepOne(locationIndex(interiorRoll(value)));
		if(!z.gameOver){
			clearSkillCheck();
		}
	} else if (roll === "Sewage Backup"){
		let loc = interiorRoll(value);
		let any = false;
		let done = true;
		for(let j = 0; !(j>=z.numPlayers); j++){
			if(z.playerLocations[j] === loc && z.revealedHybrids[j] === 0){
				done = defeat(j,"Sewage Backup") && done;
				any = true;
			}
		}
		if(!any){
			plainAlert("No effect.");
			clearSkillCheck();
		} else if(done){
			clearSkillCheck();
		}
	} else if(roll === "CALL_DOWN_THE_STORM"){
		if(value > params){
			plainAlert("No effect.");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		} else {
			if(damageShip("Spell")){
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
		}
	} else if(roll === "Summon Fire"){
		if(value >= 6){
			if(advanceTravel()){
				if(damageShip("Spell")){
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
			} else if(!z.gameOver) {
				z.extraTravel = "Summon Fire 2";
				plainAlert("SUMMON_FIRE_ALERT_DAMAGE");
			}
		} else {
			plainAlert("No effect.");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
	} else if (roll === "Flesh Ward" || roll === "Lure Monster" || roll === "Greater Banishment" || roll === "Heal" || roll === "Conjuration" || roll == "Dinghy Launch" || 
			   roll === "Transformation (bottom option)" || roll === "Astral Travel" || roll === "Foresee" || roll === "Blessing" || roll == "Dowsing"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			decreaseSanity();
		}
		if(!z.gameOver){
			if(roll === "Flesh Ward"){
				if(z.midAction === "Attack Player" || z.midAction === "Shrivelling"){
					finishedAction();
				}
				resolveDefeatContext(params);
			}
			if(roll === "Lure Monster" || roll === "Astral Travel" || roll === "Greater Banishment" || roll === "Conjuration" || roll === "Foresee" || roll === "Blessing"){
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast" || roll === "Dowsing"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			}
			if(roll === "Heal"){
				let any = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(hasOption(j,"Move")){
						any = true;
					}
				}
				if(!any){
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
			}
			if(roll === "Dinghy Launch" || roll === "Transformation (bottom option)"){
				doneWithChoiceMythos();
			}
		}
	} else if (roll === "Miscalculation"){
		if(value > 7){
			plainAlert("No effect.");
		} else {
			if(z.travelTrack > 0){
				retreatTravel();
			} else {
				decreaseFuel();
			}
			if(z.fuel > 0){
				if(z.travelTrack > 0){
					retreatTravel();
				} else {
					decreaseFuel();
				}
			}
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if(roll === "Inspiring Speech"){
		if(value >= 3){
			increaseSanity();
		} else {
			decreaseSanity();
		}
		season(z.actionPerformer,INFLUENCE);
		finishedAction();
	} else if(roll === "Boiler Room"){
		if(value >= 7){
			plainAlert("No effect.");
		} else {
			decreaseFuel();
		}
		let done = advanceTravel();
		if(done){
			finishedAction();
			/* UTODO: explicit pass required? */
			if(characterPresent("Jeanne") && z.playerLocations[getPlayerNum("Jeanne")] !== "Brig"){
				plainAlert("JURY_RIGGER_NOTIFICATION");
				addOption(getPlayerNum("Jeanne"),"Jury Rigger",undefined,false);
			}
		} else {
			z.extraTravel = "Boiler Room";
		}
	} else if (roll === "GALLEY_ROLL"){
		if(params > value){
			decreaseFood();
		} else {
			plainAlert("No effect.");
		}		
		finishedAction();
	} else if (roll === "Kitty Litter"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			decreaseFood();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "HUMAN_VS_DEEP_ONE" || roll === "RUFFIAN_VS_DEEP_ONE"){
		if(value >= 4){
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(d.spaceNames[z.deepOnes[j]] === params[1]){
					z.deepOnes[j] = RESERVES;
					break;
				}
			}
			plainAlert("DEEP_ONE_DEFEATED",params);
		} else {
			plainAlert("No effect.");
		}
		
		doneWithAttack(params);
		
	} else if(roll === "PLAYER_VS_PLAYER" || roll === "RUFFIAN_VS_PLAYER"){
		
		if(value >= 6){
			plainAlert("PLAYER_VS_PLAYER_SUCCESS",params);
			let defeatContext = ["PVP",params];
			if(defeat(getPlayerNum(params[1]),defeatContext)){
				doneWithAttack(params);
			}
		} else {
			plainAlert("No effect.");
			doneWithAttack(params);
		}
	} else if(roll === "PLAYER_VS_HORROR"){
		if(value >= 6){
			boldAlert("HORROR_REPELLED",[params[0],params[1]]);
			addOption(getPlayerNum(params[0]),"Repel a Horror",params,true);
		} else {
			plainAlert("No effect.");
			doneWithAttack(params);
		}
	} else if(roll === "RUFFIAN_VS_HORROR"){
		if(value >= 6){
			boldAlert("HORROR_REPELLED",[params[0],params[1]]);
			addOption(getPlayerNum(params[2]),"Repel a Horror",params,true);
		} else {
			plainAlert("No effect.");
			doneWithAttack(params);
		}
	} else if (roll === "First Oath of Dagon (Father Dagon)"){
		if(value >= 7){
			z.mother = DEEP;
			boldAlert("MOVED_TO_DEEP","Father Dagon");
		} else {
			plainAlert("FIRST_OATH_FAIL","Father Dagon");
			addOption(getPlayerNum("Ishmael"),"Move a monarch","Father Dagon",false);
		}
		finishedAction();
	} else if (roll === "First Oath of Dagon (Mother Hydra)"){
		if(value >= 7){
			z.mother = DEEP;
			boldAlert("MOVED_TO_DEEP","Mother Hydra");
		} else {
			addOption(getPlayerNum("Ishmael"),"Move a monarch","Mother Hydra",false);
			plainAlert("FIRST_OATH_FAIL","Mother Hydra");
		}
		finishedAction();
	} else if(roll === "SUMMON_THE_BEAST_WITHIN"){
		if(value > params[0]){
			plainAlert("No Effect.");
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		} else {
			let goodToGo = true;
			
			let index = locationIndex(params[1]);
			if(z.spacePassengers[index].length > 0){
				let medicalIntervention = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
						medicalIntervention = true;
					}
				}
				let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")], params[1]);
				if(!medicalIntervention && !travelPharmacy){
					while(z.spacePassengers[index].length > 0 && goodToGo){
						goodToGo = defeatPassenger(z.spacePassengers[index].pop()[1]);
					}
				} else {
					boldAlert("JAM_TIN_GRENADE_PASSENGERS_DEFEAT_ALERT",params[1]);
					if(travelPharmacy){
						plainAlert("TRAVEL_PHARMACY_JAM_TIN_GRENADE_ALERT",[z.players[itemHolder("Travel Pharmacy")],params[1]],getGender(itemHolder("Travel Pharmacy")));
						addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Summon the Beast Within",index,0],false);
					}
					if(medicalIntervention){
						plainAlert("MEDICAL_INTERVENTION_JAM_TIN_GRENADE_ALERT");
						addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",["Summon the Beast Within",index,0],false);
					}
					optionForAll("Defeat a passenger in a space",["Summon the Beast Within",index,0],true);
					goodToGo = false;
				}
			}
			if(goodToGo){
				for(let j = 0; !(j>=z.playerLocations.length); j++){
					let k = (z.turn + j) % z.numPlayers;
					if(z.playerLocations[k] === params[1] && z.revealedHybrids[k] === 0){
						goodToGo = defeat(k,"Summon the Beast Within") && goodToGo;
					}
				}
				if(goodToGo && (z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast")){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
			} else {
				plainAlert("SUMMON_THE_BEAST_WITHIN_HUMAN_DEFEAT",params[1]);
			}
		}
	} else if (roll === "SHRIVELLING_VS_DEEP_ONE"){
		if(value >= 6){
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(d.spaceNames[z.deepOnes[j]] === params[0]){
					z.deepOnes[j] = RESERVES;
					plainAlert("SHRIVELLING_DEEP_ONE_SUCCESS",params[0]);
					break;
				}
			}
		} else {
			plainAlert("No effect.");
		}
		finishedAction();
		if(itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === params[1] && z.elderSignAmulet){
			let any = false;
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(z.revealedHybrids[j] !== z.revealedHybrids[params[1]]){
					any = true;
					break;
				}
			}
			if(!z.revealedHybrids[params[1]]){
				any |= z.deepOnes.length > deepOnesAway();
				any |= z.shoggoth > RESERVES;
				any |= z.graspingTendril > RESERVES;
				any |= z.drownedSpirit > RESERVES;
			}
			if(any){
				plainAlert("ELDER_SIGN_AMULET_SHRIVELLING_ALERT",z.players[params[1]],getGender(params[1]));
				addOption(params[1],"[Shrivelling] Target an enemy","Elder Sign Amulet",false);
			}
		}
		notebookCheck(z.notebookCard,params[1]);
		season(params[1],LORE);
		delete z.elderSignAmulet;
	} else if (roll === "SHRIVELLING_VS_TRAITOR") {
		if(value >= 6){
			if(defeat(getPlayerNum(params[0]),"Shrivelling")){
				finishedAction();
			}
		} else {
			plainAlert("No effect.");
			finishedAction();
		}
		if(itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === params[1] && z.elderSignAmulet){
			let any = false;
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(z.revealedHybrids[j] !== z.revealedHybrids[params[1]]){
					any = true;
					break;
				}
			}
			if(!z.revealedHybrids[params[1]]){
				any |= z.deepOnes.length > deepOnesAway();
				any |= z.shoggoth > RESERVES;
				any |= z.drownedSpirit > RESERVES;
				any |= z.graspingTendril > RESERVES;
			}
			if(any){
				plainAlert("ELDER_SIGN_AMULET_SHRIVELLING_ALERT",z.players[params[1]],getGender(params[1]));
				addOption(params[1],"[Shrivelling] Target an enemy","Elder Sign Amulet",false);
			}
		}
		notebookCheck(z.notebookCard,params[1]);
		season(params[1],LORE);
		delete z.elderSignAmulet;
	} else if (roll === "SHRIVELLING_VS_HORROR") {
		if(value >= 6){
			boldAlert("HORROR_REPELLED",[z.players[params[1]],params[0]]);
			addOption(params[1],"Repel a Horror",[z.players[params[1]],params[0],"Shrivelling"],true);
		} else {
			plainAlert("No effect.");
			finishedAction();
			if(itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === params[1] && z.elderSignAmulet){
				let any = false;
				for(let j = 0; !(j>=z.revealedHybrids.length); j++){
					if(z.revealedHybrids[j] !== z.revealedHybrids[params[1]]){
						any = true;
						break;
					}
				}
				if(!z.revealedHybrids[params[1]]){
					any |= z.deepOnes.length > deepOnesAway();
					any |= z.shoggoth > RESERVES;
					any |= z.drownedSpirit > RESERVES;
					any |= z.graspingTendril > RESERVES;
				}
				if(any){
					plainAlert("ELDER_SIGN_AMULET_SHRIVELLING_ALERT",z.players[params[1]],getGender(params[1]));
					addOption(params[1],"[Shrivelling] Target an enemy","Elder Sign Amulet",false);
				}
			}
			notebookCheck(z.notebookCard,params[1]);
			season(params[1],LORE);
			delete z.elderSignAmulet;
		}
		
	} else if (roll === "Food Rationing"){
		if(value >= 7){
			plainAlert("No effect.");
		} else {
			decreaseSanity();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Bucket Brigade"){
		if(value >= 7){
			plainAlert("No effect.");
		} else {
			decreaseFuel();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Coal Bunker Fire"){
		if(value > 4){
			plainAlert("No effect.");
		} else {
			decreaseFuel();
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Ticket, Please"){
		if(value > 8){
			value = 8;
		} else if(1 > value){
			value = 1;
		}
		if(z.spreadMisfortune){
			movePlayer(getPlayerNum("Edmund"),d.spaceNames[DECK+value-1]);
		} else {
			movePlayer(getPlayerNum("Samira"),d.spaceNames[DECK+value-1]);
		}
		doneWithChoiceMythos();
	} else if (roll === "Risk passenger"){
		if(value > 8){
			value = 8;
		} else if(1 > value){
			value = 1;
		}
		z.spacePassengers[DECK+value-1].push(z.passengerSupply.pop());
		plainAlert("PASSENGER_PLACED",d.spaceNames[DECK+value-1]);
		if(Array.isArray(params) && params[0] === "Fleeing Passengers"){
			if(params[1] === "Ship"){
				if(damageShip(params[2]) && !z.gameOver){
					z.damageContext = params[2];
					doneWithDamage();
				}
			} else {
				if(damageLocation(params[1],undefined,params[2]) && !z.gameOver){
					z.damageContext = params[2];
					doneWithDamage();
				}
			}
		}
		if(z.midAction === "Siren Song"){
			finishedAction();
		}
		if(z.midAction === "Bridge"){
			addOption(params,"Scout the Mythos deck",undefined,true);
			addOption(params,"Scout the Waypoint deck",undefined,true);
		}
		if(params === "Signs of Life" || params === "Signs of Life Edmund"){
			if(damageShip(params)){
				if(params === "Signs of Life"){
					if(defeat(getPlayerNum("Jeanne"),"Signs of Life")){
						doneWithChoiceMythos();
					}
				} else {
					if(defeat(getPlayerNum("Edmund"),"Signs of Life")){
						doneWithChoiceMythos();
					}
				}
			}
		}
		if(params === "Calenture"){
			let any = false;
			for(let j = DECK; !(j>=INTERIOR); j++){
				while(z.spacePassengers[j].length > 0){
					any = true;
					z.spacePassengers[j-8].push(z.spacePassengers[j].pop());
				}
			}
			if(any){
				plainAlert("CALENTURE_FAIL");
			}
			clearSkillCheck();
		}
		if(params === "Seaweed Patch"){
			doneWithWaypoint();
		}
		if(params === "Finest Ingredients (bottom)"){
			shuffleTreachery();
			doneWithChoiceMythos();
		}
		if(params === "Eccentric Gathering"){
			if(z.allyDeck.length > 1){
				z.allyDeck.pop();
				z.allyDeck.pop();
				plainAlert("ECCENTRIC_GATHERING_PLURAL");
			} else if(z.allyDeck.length === 1){
				z.allyDeck.pop();
				plainAlert("ECCENTRIC_GATHERING_PLURAL");
			}
			doneWithChoiceMythos();
		}
		if(params === "The End is Nigh!"){
			let done = true;
			if(z.spreadMisfortune){
				dealSkillCard(getPlayerNum("Edmund"),BOON);
				dealSkillCard(getPlayerNum("Edmund"),BOON);
				dealSkillCard(getPlayerNum("Edmund"),TREACHERY);
				dealSkillCard(getPlayerNum("Edmund"),TREACHERY);
			} else {
				if(z.cursedWhispers === z.captain){
					addOption(z.captain,"[The End is Nigh!] Draw a Boon",2,true);
					addOption(z.captain,"[The End is Nigh!] Draw a Treachery",2,true);
					boldAlert("THE_END_IS_NIGH_CURSED");
					done = false;
				} else {
					dealSkillCard(z.captain,BOON);
					dealSkillCard(z.captain,BOON);
					dealSkillCard(z.captain,TREACHERY);
					dealSkillCard(z.captain,TREACHERY);
				}
			}
			if(done){
				doneWithChoiceMythos();
			}
		}
		if(params === "Improvised Fuel Source" || params === "Incoming SOS" || params === "Class Struggle" || params === "Finest Ingredients (top)" || params === "Drowned Fears"){
			doneWithChoiceMythos();
		}
		if(params === "Too Many Bodies"){
			let num = 0;
			for(let j = DECK; !(j>=INTERIOR); j++){
				num += z.spacePassengers[j].length;
			}
			if(num >= 8){
				if(decreaseSanity()){
					doneWithChoiceMythos();
				}
			} else {
				SPTokenBad("Too Many Bodies");
			}
		}
		if(params === "Bucket Brigade Fail" || params === "Lure of Y'ha-nthlei" || params === "Adrift Fishing Boat Partial" ||
		   params === "Hypnotic Melody" || params === "Disappearing Belongings" || params === "Growing Unease" || params === "Hysteria" ||
		   params === "Join Hands"){
			   
			clearSkillCheck();
		}
		if(params === "Bucket Brigade Pass"){
			if(advanceTravel()){
				clearSkillCheck();
			} else {
				z.extraTravel = "Mythos";
			}
		}
		if(params === "Adrift Fishing Boat Pass"){
			increaseSouls();
			if(z.passengerSupply.length >= 1){
				boldAlert("ADRIFT_FISHING_BOAT_PASS",z.players[z.turn]);
				addOption(z.turn,"Risk a passenger","Adrift Fishing Boat",false);
				addOption(z.turn,"Clear skill check","Adrift Fishing Boat",true);
			} else {
				clearSkillCheck();
			}
		}
		if(params === "Adrift Fishing Boat Pass 2"){
			increaseFood();
			clearSkillCheck();
		}
		if(Array.isArray(params) && params[0] === "Aurora"){
			if(z.allyDeck.length === 0){
				doneWithWaypoint();
			} else {
				plainAlert("AURORA_SPAWN_ALERT",z.players[params[1]],getGender(params[1]));
				addOption(params[1],"[Aurora] Spawn 2 allies",undefined,true);
			}
		}
		if(Array.isArray(params) && params[0] === "Volunteer Army"){
			let num = params[1];
			let count = 0;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] >= DECK && INTERIOR+6 > z.deepOnes[j]){
					count++;
				}
			}
			if(num >= count){
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] >= DECK && INTERIOR+6 > z.deepOnes[j]){
						z.deepOnes[j] = RESERVES;
					}
				}
				plainAlert("VOLUNTEER_ARMY_ALL");
				doneWithChoiceMythos();
			} else if(count > 0){
				let player = z.captain;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				addOption(player,"[Volunteer Army] Defeat a Deep One",num,true);
			} else {
				doneWithChoiceMythos();
			}
		}
	} else if (roll === "Too Many Bodies"){
		let num = 0;
		for(let j = DECK; !(j>=INTERIOR); j++){
			num += z.spacePassengers[j].length;
		}
		if(value > 8){
			value = 8;
		}
		if(num >= value){
			decreaseSanity();
		} else {
			plainAlert("No effect.");
		}
		if(!z.gameOver){
			doneWithChoiceMythos();
		}
	} else if (roll === "Father Dagon Activation"){
		if(value >= 5){
			z.father = WATER + 1;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER + 1;
				}
			}
		} else {
			z.father = WATER;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER;
				}
			}
		}
		plainAlert("FATHER_DAGON_ALERT",d.spaceNames[z.father]);
		if(z.midAction === "Perform Rites" && !hasOption(z.turn,"Activate Mother Hydra")){
			finishedAction();
		}
		if(params === "The Father's Favor 2"){
			if(activateFather("The Father's Favor")){
				clearSkillCheck();
			}
		}
		if(params === "The Father's Favor"){
			clearSkillCheck();
		}
		if(params === "Coordinated Assault"){
			if(activateDeepOnes()){
				clearSkillCheck();
			} else {
				z.deepOneContext = "Coordinated Assault";
			}
		}
		if(params === "Looming Danger"){
			if(activateMother("Looming Danger")){
				doneWithChoiceMythos();
			}
		}
		if(params === "Monster"){
			primeJumpIcon();
		}
	} else if (roll === "Mother Hydra Activation"){
		if(value >= 5){
			z.mother = WATER + 1;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER + 1;
				}
			}
		} else {
			z.mother = WATER;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER;
				}
			}
		}
		plainAlert("MOTHER_HYDRA_ALERT",d.spaceNames[z.mother]);
		doneWithMother();
	} else if (roll === "Deep Ones Activation"){
		if(value >= 5){
			if(z.mother === DEEP){
				z.mother = WATER + 1;
			}
			if(z.father === DEEP){
				z.father = WATER + 1;
			}
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER + 1;
				}
			}
			plainAlert("DEEP_ONES_ALERT",d.spaceNames[WATER+1]);
		} else {
			if(z.mother === DEEP){
				z.mother = WATER;
			}
			if(z.father === DEEP){
				z.father = WATER;
			}
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === DEEP){
					z.deepOnes[j] = WATER;
				}
			}
			plainAlert("DEEP_ONES_ALERT",d.spaceNames[WATER]);
		}
		if(z.deepOneContext === "Call Friends"){
			delete z.deepOneContext;
			if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
				finishedAction();
			}
			if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
		}
		if(z.deepOneContext === "Ritual Coordination" || z.deepOneContext === "Volunteer Army"){
			delete z.deepOneContext;
			doneWithChoiceMythos();
		}
		if(z.deepOneContext === "Barricade the Hatches" || z.deepOneContext === "Coordinated Assault"){
			delete z.deepOneContext;
			clearSkillCheck();
		}
		if(z.deepOneContext === "Monster"){
			delete z.deepOneContext;
			primeJumpIcon();
		}
		if(z.deepOneContext === "Deep One Swarm"){
			delete z.deepOneContext;
			if(activateDeepOnes()){
				clearSkillCheck();
			} else {
				z.deepOneContext = "Coordinated Assault";
			}
		} else {
			delete z.deepOneContext;
		}
	} else if (roll === "Collision Course (Partial)"){
		if(value >= 5){
			z.father = WATER + 1;
			z.mother = WATER + 1;
			plainAlert("MONARCHS_TO_SPACE",d.spaceNames[WATER+1]);
		} else {
			z.father = WATER;
			z.mother = WATER;
			plainAlert("MONARCHS_TO_SPACE",d.spaceNames[WATER]);
		}
		let done = damageShip("Mythos");
		retreatTravel();
		if(done){
			clearSkillCheck();
		}
	} else if (roll === "Collision Course (Fail)"){
		if(value >= 5){
			z.father = WATER + 1;
			z.mother = WATER + 1;
			plainAlert("MONARCHS_TO_SPACE",d.spaceNames[WATER+1]);
		} else {
			z.father = WATER;
			z.mother = WATER;
			plainAlert("MONARCHS_TO_SPACE",d.spaceNames[WATER]);
		}
		let done = false;
		if(damageShip("Collision Course")){
			done = damageShip("Mythos");
		}
		retreatTravel();
		retreatTravel();
		if(done){
			clearSkillCheck();
		}
	} else if (roll === "The Game is Afoot"){
		let room = "";
		if(value >= 7){
			room = "Boiler Room";
		} else if(value === 6){
			room = "Galley";
		} else if(value === 5){
			room = "Cargo Hold";
		} else if(value === 4){
			room = "Captain's Cabin";
		} else if(value === 3){
			room = "Chapel";
		} else {
			room = "Bridge";
		}
		spawnDeepOnes(locationIndex(room),4);
		if(z.spreadMisfortune){
			movePlayer(getPlayerNum("Edmund"),room);
		} else {
			movePlayer(getPlayerNum("Jamie"),room);
		}
		clearSkillCheck();
	} else {
		plainAlert("Error: no outcome associated with die roll.");
	}

}

function processBottom() {
	if(z.currentMythos === null) {
		return null;
	}
	let done = true;
	let name = d.mythosNames[z.currentMythos];
	switch (name) {
		case "All It Can Eat":
			done = decreaseFood(3);
			break;
		case "Cleansing Rain": {
			/* ATODO: more carefulness with treachery skill draws */
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(!z.revealedHybrids[k]){
					switch(z.playerLocations[k]){
						case "Deck Space 1":
						case "Deck Space 2":
							movePlayer(k,"Bridge");
							break;
						case "Deck Space 3":
							movePlayer(k,"Chapel");
							break;
						case "Deck Space 4":
							movePlayer(k,"Captain's Cabin");
							break;
						case "Deck Space 5":
							movePlayer(k,"Cargo Hold");
							break;
						case "Deck Space 6":
							movePlayer(k,"Galley");
							break;
						case "Deck Space 7":
						case "Deck Space 8":
							movePlayer(k,"Boiler Room");
							break;
					}
					if(k !== z.cursedWhispers){
						dealSkillCard(k,TREACHERY);
					} else {
						SPTokenBad("Cursed Whispers","Cleansing Rain");
						done = false;
					}
				}
			}
			break;
		}
		case "Demand Change": {
			let count = 0;
			let player = -1;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && z.playerLocations[j] === "Brig"){
					count++;
					player = j;
				}
			}
			if(count === 0){
				done = decreaseSanity(2);
			} else if (count === 1){
				movePlayer(player,"Captain's Cabin");
			} else {
				player = z.captain;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				boldAlert("DEMAND_CHANGE_BOTTOM_ALERT",z.players[player]);
				addOption(player,"[Demand Change] Move a player to the Captain's Cabin",undefined,true);
				done = false;
			}
			break;
		}	
		case "Food Rationing":
		case "Disappearing Belongings":
			done = decreaseFood(2);
			break;
		case "Drowned Fears":
			done = decreaseFood(2);
			if(done){
				if(z.spreadMisfortune){
					dealSkillCard(getPlayerNum("Edmund"),BOON);
					dealSkillCard(getPlayerNum("Edmund"),BOON);
				} else {
					if(z.captain === z.cursedWhispers){
						SPTokenBad("Cursed Whispers","Choice Mythos");
						done = false;
					} else {
						dealSkillCard(z.captain,BOON);
						dealSkillCard(z.captain,BOON);
					}
				}
			}
			break;
		case "Eccentric Gathering":
			done = decreaseSanity();
			done = done && riskTwoPassengers("Eccentric Gathering");
			if(done){
				if(z.allyDeck.length > 1){
					z.allyDeck.pop();
					z.allyDeck.pop();
					plainAlert("ECCENTRIC_GATHERING_PLURAL");
				} else if(z.allyDeck.length === 1){
					z.allyDeck.pop();
					plainAlert("ECCENTRIC_GATHERING_PLURAL");
				}
			}
			break;
		case "Insight": {
			let context = [];
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && j !== player){
					context.push(j);
				}
			}
			if(z.skillCardHands[player].length === 0){
				plainAlert("No effect.");
			} else {
				boldAlert("INSIGHT_BOTTOM_ALERT",z.players[player]);
				addOption(player,"[Insight] Give away a Skill Card",context,true);
				done = false;
			}
			break;
		}
		case "Make Ready": {
			let any = false;
			for(let j = 0; !(j>=z.allies.length); j++){
				let destination = "";
				switch(z.allies[j][1]){
					case "Chapel":
						destination = "Deck Space 3";
						break;
					case "Captain's Cabin":
						destination = "Deck Space 4";
						break;
					case "Cargo Hold":
						destination = "Deck Space 5";
						break;
					case "Galley":
						destination = "Deck Space 6";
						break;
					case "Bridge":
						done = false;
						boldAlert("JOIN_HANDS_ALERT",[z.players[z.turn],d.allyNames[z.allies[j][0]],1,2]);
						addOption(z.turn,"[Make Ready] Move an ally",undefined,true);
						break;
					case "Boiler Room":
						done = false;
						boldAlert("JOIN_HANDS_ALERT",[z.players[z.turn],d.allyNames[z.allies[j][0]],1,2]);
						addOption(z.turn,"[Make Ready] Move an ally",undefined,true);
						break;
				}
				if(destination !== ""){
					any = true;
					plainAlert("PLAYER_IS_MOVED",[d.allyNames[z.allies[j][0]],destination]);
					z.allies[j][1] = destination;
					fleeCheck(locationIndex(destination));
				}
			}
			if(done){
				/* ATODO: burning off Uncanny Luck */
				if(z.allyDeck.length === 0){
					if(!any){
						plainAlert("No effect.");
					}
				} else {
					NoSPToken("Make Ready");
					boldAlert("MAKE_READY_ALERT");
				}
			}
			
			break;
		}
		case "Mysterious Rune":
			done = false;
			SPTokenBad("Mysterious Rune");
			break;
		case "Occult Accusations":
			if(z.allies.length === 0){
				shuffleTreachery(4);
			} else if(z.allies.length === 1){
				let ally = z.allies.pop()[0];
				plainAlert("OCCULT_ACCUSATIONS_ALERT",d.allyNames[ally]);
				z.allyDeck.push(ally);
				shuffle(z.allyDeck);
				shuffleTreachery(4);
			} else {
				done = false;
				let player = z.keeper;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				boldAlert("OCCULT_ACCUSATIONS_DO_ALERT",z.players[player]);
				addOption(player,"[Occult Accusations] Reshuffle an Ally",undefined,true);
			}
			break; 
		case "Offering": {
			let least = 1000;
			let context = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.revealedHybrids[j]){
					continue;
				}
				if(least > z.skillCardHands[j].length){
					least = z.skillCardHands[j].length;
					context = [j];
				} else if (z.skillCardHands[j].length === least){
					context.push(j);
				}
			}
			if(context.length === 1){
				done = defeat(context[0],"Offering");
			} else {
				let player = z.keeper;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				boldAlert("OFFERING_ALERT_BOTTOM",z.players[player]);
				addOption(player,"[Offering] Choose a sacrifice",["bottom",context],true);
				done = false;
			}
			break;
		}
		case "Outbreak":
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(!z.revealedHybrids[k] && z.playerLocations[k] === "Brig"){
					movePlayer(k,"Sick Bay");
				}
			}
			break;
		case "Price of Power": {
			let count = 0;
			if(z.ritualTrack >= 3){
				retreatRitual();
				retreatRitual();
				retreatRitual();
			} else if(z.ritualTrack === 2){
				retreatRitual();
				retreatRitual();
				count = 3;
			} else if(z.ritualTrack === 1){
				retreatRitual();
				count = 6;
			} else if(z.ritualTrack === 0){
				count = 9;
				if(z.spellDeck.length === 0){
					plainAlert("No effect.");
				}
			}
			if(count > z.spellDeck.length){
				count = z.spellDeck.length;
			}
			for(let j = 0; !(j>=count); j++){
				z.spellDeck.pop();
			}
			if(count > 1){
				plainAlert("TORN_PAGES_PLURAL",count);
			} else if(count === 1){
				plainAlert("TORN_PAGES_PASS");
			}
			break;
		}
		case "Secure Leadership": {
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			movePlayer(player,"Chapel");
			if(z.keeper !== player){
				boldAlert("NEW_KEEPER",z.players[player]);
			}
			z.keeper = player;
			done = decreaseSanity();
			break;
		}
		case "The End is Nigh!":
			done = riskThreePassengers("The End is Nigh!");
			if(done){
				if(z.spreadMisfortune){
					dealSkillCard(getPlayerNum("Edmund"),BOON);
					dealSkillCard(getPlayerNum("Edmund"),BOON);
					dealSkillCard(getPlayerNum("Edmund"),TREACHERY);
					dealSkillCard(getPlayerNum("Edmund"),TREACHERY);
				} else {
					dealSkillCard(z.captain,BOON);
					dealSkillCard(z.captain,BOON);
					dealSkillCard(z.captain,TREACHERY);
					dealSkillCard(z.captain,TREACHERY);
				}
			}
			break;
		case "To Arms!":
			done = false;
			SPTokenBad("To Arms! (bottom)");
			break;
		case "Cursed Whispers":
			z.cursedWhispers = getPlayerNum("Kokoj");
			boldAlert("CURSED_WHISPERS_ALERT");
			break;
		case "Looming Danger":
			done = decreaseSanity();
			done = done && activateFather("Looming Danger");
			done = done && activateMother("Looming Danger");
			break;
		case "Finest Ingredients":
			done = riskThreePassengers("Finest Ingredients (bottom)");
			if(done){
				shuffleTreachery();
			}
			break;
		case "Inheritance":
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(!z.revealedHybrids[k]){
					if(z.cursedWhispers === k){
						done = false;
						SPTokenBad("Cursed Whispers","Choice Mythos");
					} else {
						dealSkillCard(k,BOON);
					}
				}
			}
			if(z.itemDeck.length === 1){
				z.itemDeck.pop();
				plainAlert("UNSECURED_CARGO_SINGULAR");
			} else if(z.itemDeck.length > 1){
				z.itemDeck.pop();
				z.itemDeck.pop();
				plainAlert("UNSECURED_CARGO_PLURAL",2);
			}
			break;
		case "Strange Vision":
			for(let j = 0; !(j>=8); j++){
				if(!spawnDeepOne(DECK+j)){
					done = false;
					break;
				}
			}
			break;
		case "Underestimated":
			if(z.playerLocations[getPlayerNum("Mui Choo")] === "Sick Bay"){
				spawnShoggoth(CHAPEL);
			} else {
				spawnShoggoth(locationIndex(z.playerLocations[getPlayerNum("Mui Choo")]));
			}
			done = activateShoggoth("Underestimated 1");
			done = done && activateShoggoth("Underestimated 2");
			done = done && activateShoggoth("Underestimated 3");
			break;
		case "Accusation": {
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(player === z.turn){
				done = promptDiscards(z.turn,4,"Accusation");
			} else {
				done = promptDiscards(player,2,"Accusation");
				done = promptDiscards(z.turn,2,"Accusation",!done) && done;
			}
			shuffleTreachery();
			break;
		}
		case "Just Desserts":
		case "Missing Jewelry":
			shuffleTreachery(4);
			break;
		case "The Anarcho-Individualist":
			if(z.spreadMisfortune){
				done = promptDiscards(getPlayerNum("Edmund"),2,"The Anarcho-Individualist");
			} else {
				done = promptDiscards(z.turn,2,"The Anarcho-Individualist");
			}
			shuffleTreachery();
			break;
		case "Infection":
			plainAlert("INFECTION_BOTTOM");
			SPTokenBad("Infection (1st roll)");
			done = false;
			break;
		case "Too Many Bodies": {
			let num = 0;
			for(let j = DECK; !(j>=INTERIOR); j++){
				num += z.spacePassengers[j].length;
			}
			plainAlert("TOO_MANY_BODIES");
			if(z.passengerSupply.length === 0){
				if(num >= 8){
					done = decreaseSanity();
				} else {
					done = false;
					SPTokenBad("Too Many Bodies");
				}
			} else {
				riskPassenger("Too Many Bodies");
				done = false;
			}
			break;
		}
		case "Volunteer Army":
			done = activateDeepOnes();
			if(!done){
				z.deepOneContext = "Volunteer Army";
			}
			break;
		case "Mysterious Lifeboat":
		case "Incoming SOS":
		case "Missing Parents":
			decreaseSanity();
			break;
		case "Ritual Support":
			retreatRitual();
			if(z.spreadMisfortune){
				done = promptDiscards(getPlayerNum("Edmund"),2,"Ritual Support");
			} else {
				done = promptDiscards(z.keeper,2,"Ritual Support");
			}
			break;
		case "Sacrifice Deep One":
			z.ritualTrack = 0;
			plainAlert("RESET_RITUAL_TRACK");
			if(z.spreadMisfortune){
				discardEntireHand(getPlayerNum("Edmund"));
			} else {
				discardEntireHand(z.keeper);
			}
			break;
		case "The Captain's Banquet":
			if(decreaseFood()){
				SPTokenBad("The Captain's Banquet");
				done = false;
			}
			break;
		case "Dinghy Launch":
		case "Initiation":
			decreaseSouls();
			break;
		case "Poisoned Food":
			decreaseFood();
			break;
		case "Class Struggle":
			done = riskFourPassengers("Class Struggle");
			break;
		case "Transformation":
			if(decreaseSouls()){
				SPTokenBad("Transformation (bottom option)");
			}
			done = false;
			break;
		case "Improvised Fuel Source":
			decreaseFuel();
			break;
		case "Family Ties": {
			let player = getPlayerNum("Ishmael");
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			let index = locationIndex(z.playerLocations[player]);
			if(index >= INTERIOR && INTERIOR+6 > index){
				done = spawnDeepOnes(index,4);
			} else if(index === DECK){
				done = spawnDeepOnes(INTERIOR,4);
			} else if(index === INTERIOR-1){
				done = spawnDeepOnes(INTERIOR+5,4);
			} else if(index !== SICK_BAY){
				done = spawnDeepOnes(index+6,4);
			} else {
				done = false;
				plainAlert(z.players[player]+" must choose whether to spawn the Deep Ones in the Chapel or the Captain's Cabin.");
				addOption(player,"[Family Ties] Choose where to spawn Deep Ones",undefined,true);
				/* URULES: does he get a choice or do they just go into Captain's Cabin? */
			}
			break;
		}		
		default:
			error("ERROR: No Bottom effect found.");
	}  
	if(z.gameOver){
		done = false;
	}
	return done;
}

function doneWithChoiceMythos(){
	if(z.spreadMisfortune){
		delete z.spreadMisfortune;
		z.finishedMythos = false;
		doneWithRevealEffect(getPlayerNum("Edmund"));
	} else {
		primeCylonActivation();
	}
}

function processTop() {
	if(z.currentMythos === null) {
		return null;
	}
	let done = true;
	switch (d.mythosNames[z.currentMythos]) {
		case "All It Can Eat":
			if(activateShoggoth("All It Can Eat 1")){
				activateShoggoth("All It Can Eat 2");
			}
			break;
		case "Cleansing Rain": {
			/*let boonCount = z.skillCardDecks[BOON].length + z.skillCardDiscards[BOON].length;*/
			/* ATODO: more carefulness with boon skill draws */
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(!z.revealedHybrids[k]){
					switch(z.playerLocations[k]){
						case "Chapel":
							movePlayer(k,"Deck Space 3");
							break;
						case "Captain's Cabin":
							movePlayer(k,"Deck Space 4");
							break;
						case "Cargo Hold":
							movePlayer(k,"Deck Space 5");
							break;
						case "Galley":
							movePlayer(k,"Deck Space 6");
							break;
						case "Bridge":
							boldAlert("CLEANSING_RAIN_ALERT",[z.players[k],"Deck Space 1","Deck Space 2"]);
							addOption(k,"[Cleansing Rain] Move",undefined,true);
							done = false;
							break;
						case "Boiler Room":
							boldAlert("CLEANSING_RAIN_ALERT",[z.players[k],"Deck Space 7","Deck Space 8"]);
							done = false;
							addOption(k,"[Cleansing Rain] Move",undefined,true);
							break;
						case "Sick Bay":
							boldAlert("CLEANSING_RAIN_ALERT",[z.players[k],"Deck Space 3","Deck Space 4"]);
							done = false;
							addOption(k,"[Cleansing Rain] Move",undefined,true);
							break;
					}
					if(k !== z.cursedWhispers){
						dealSkillCard(k,BOON);
					} else {
						SPTokenBad("Cursed Whispers","Cleansing Rain");
						done = false;
					}
				}
			}
			break;
		}
		case "Demand Change": {
			let player = -1;
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig"){
					player = j;
					count++;
				}
			}
			if(count == 1){
				movePlayer(player,"Brig");
			} else if(count > 1){
				done = false;
				let player = z.captain;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				boldAlert("DEMAND_CHANGE_ALERT",z.players[player]);
				addOption(player,"Move a player to the Brig","Demand Change",true);
			}
			break;
		}
		case "Drowned Fears":
			done = decreaseFood();
			done = done && riskPassenger("Drowned Fears");
			break;
		case "Eccentric Gathering": {
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			movePlayer(player,"Galley");
			spawnAlly("Galley");
			spawnAlly("Galley");
			done = decreaseFood(2);
			break;
		}
		case "Finest Ingredients":
			done = decreaseFood(2);
			done = done && riskPassenger("Finest Ingredients (top)");
			break;
		case "Inheritance":
			done = decreaseSanity();
			if(done){
				let player = z.captain;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				drawItem(player,"Inheritance");
				done = drawItem(player,"Inheritance");
			}
			break;
		case "Initiation": {
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(player === z.cursedWhispers){
				SPTokenBad("Cursed Whispers","Choice Mythos");
			} else {
				dealSkillCard(player,BOON);
			}
			shuffleTreachery(4);
			break;
		}
		case "Insight": {
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(j !== player && !z.revealedHybrids[j] && z.skillCardHands[j].length > 0){
					shuffle(z.skillCardHands[j]);
					let card = z.skillCardHands[j].pop();
					for(let k = 0; !(k>=z.possibleColors[j].length); k++){
						if(z.possibleColors[j][k]){
							z.possibleColors[player][k] = 1;
						}
						if(z.skillCardHands[j].length === 0){
							z.possibleColors[j][k] = 0;
						}
					}
					if(me === player){
						addAlert("BETRAY_ALERT",[cardText(card),z.players[j]]);
						println("INSIGHT_TOP_ALERT",[z.players[player],z.players[j]]);
					} else {
						plainAlert("INSIGHT_TOP_ALERT",[z.players[player],z.players[j]]);
					}
					z.skillCardHands[player].push(card);
					
				}
			}
			break;
		}
		case "Make Ready":
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(!z.revealedHybrids[k] && z.playerLocations[k] !== "Brig"){
					movePlayer(k,"Captain's Cabin");
					if(k === z.cursedWhispers){
						SPTokenBad("Cursed Whispers","Choice Mythos");
						done = false;
					} else {
						dealSkillCard(k,BOON);
					}
				}
			}
			break;
		case "Mysterious Rune": {
			let count = 0;
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			let least = 6;
			for(let j = 0; !(j>=z.skillCardHands[player].length); j++){
				let value = cardValue(z.skillCardHands[player][j]);
				if(least > value){
					least = value;
				}
				count += value;
			}
			if(5 > count - least){
				discardEntireHand(player);
			} else {
				addOption(player,"Discard a Skill Card",["Mysterious Rune",0],true);
				boldAlert("MYSTERIOUS_RUNE_ALERT",z.players[player]);
				done = false;
			}
			break;
		}
		case "Offering": {
			let most = 0;
			let context = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.revealedHybrids[j]){
					continue;
				}
				if(z.skillCardHands[j].length > most){
					most = z.skillCardHands[j].length;
					context = [j];
				} else if (z.skillCardHands[j].length === most){
					context.push(j);
				}
			}
			if(most === 0){
				plainAlert("No effect.");
			} else if(context.length === 1){
				discardEntireHand(context[0]);
			} else {
				let player = z.keeper;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				boldAlert("OFFERING_ALERT_TOP",z.players[player]);
				addOption(player,"[Offering] Choose a sacrifice",["top",context],true);
				done = false;
			}
			break;
		}
		case "Outbreak":
			if(z.passengerSupply.length > 0){
				let medicalInterventionPlayer = -1;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
						medicalInterventionPlayer = j;
						break;
					}
				}
				if(medicalInterventionPlayer >= 0){
					optionForAll("Defeat a Passenger in the supply","Outbreak",true);
					addOption(medicalInterventionPlayer,"Medical Intervention (passenger)","Outbreak",false);
					done = false;
				} else {
					done = defeatSupplyPassenger();
				}
			} else {
				done = decreaseSouls();
			}
			if(done){
				SPTokenBad("Outbreak");
				done = false;
			}
			break;
		case "Price of Power": {
			let oldRitual = z.ritualTrack;
			z.ritualTrack = 3;
			let player = z.keeper;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(advanceRitual()){
				z.ritualTrack = oldRitual;
				discardEntireHand(player);
				done = defeat(player,"Price of Power");
			} else {
				z.ritualTrack = oldRitual;
				z.extraRitual = "Price of Power";
				done = false;
			}
			break;
		}
		case "Secure Leadership": {
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			movePlayer(player,"Captain's Cabin");
			if(z.captain !== player){
				boldAlert("NEW_CAPTAIN",z.players[player]);
			}
			z.captain = player;
			done = decreaseFood();
			break;
		}
		case "The End is Nigh!": {
			let context = [];
			for(let j = DECK; !(j>=INTERIOR); j++){
				if(z.spacePassengers[j].length > 0){
					context.push(j);
				}
			}
			if(context.length === 0){
				shuffleTreachery(4);
			} else if(context.length === 1){
				z.passengerSupply.push(z.spacePassengers[context[0]].pop());
				plainAlert("THE_END_IS_NIGH_RESHUFFLE",d.spaceNames[context[0]]);
				shuffleTreachery(4);
			} else {
				let player = z.captain;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				addOption(player,"[The End is Nigh!] Reshuffle a Passenger",context,true);
				boldAlert("THE_END_IS_NIGH_ALERT",z.players[player]);
				done = false;
			}
			break;
		}
		case "To Arms!":{
			let count = 0;
			let target = "";
			if(z.shoggoth > RESERVES){
				count++;
				target = "Shoggoth";
			}
			if(z.drownedSpirit > RESERVES){
				count++;
				target = "Drowned Spirit";
			}
			if(z.graspingTendril > RESERVES){
				count++;
				target = "Grasping Tendril";
			}
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(count === 1){
				SPTokenBad("To Arms! (top)",[target,player]);
			} else {
				boldAlert("TO_ARMS_TOP_ALERT",z.players[player]);
				addOption(player,"[To Arms!] Choose a Horror",undefined,true);
			}
			done = false;
			break;
		}
		case "Underestimated": {
			let loc = z.playerLocations[getPlayerNum("Mui Choo")];
			if(loc === "Sick Bay"){
				spawnShoggoth(CHAPEL);
			} else {
				spawnShoggoth(locationIndex(loc));
			}
			boldAlert("UNDERESTIMATED_ALERT");
			addOption(getPlayerNum("Mui Choo"),"[Underestimated] Move",undefined,true);
			done = false;
			break;
		}
		case "Food Rationing":
			decreaseFood();
			addAlert("FOOD_RATIONING_TOP");
			SPTokenBad("Food Rationing");
			done = false;
			break;
		case "Strange Vision": {
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			addOption(player,"Scout the Waypoint deck","Strange Vision",true);
			done = false;
			break;
		}
		case "Cursed Whispers": {
			/* URULES: from current player or Kokoj? */
			let any = false;
			for(let j = 0; !(j>=z.numPlayers); j++){
				let k = (z.turn + 1 + j) % z.numPlayers;
				if(!z.revealedHybrids[k] && z.playerLocations[k] !== "Brig" && z.playerLocations[k] !== "Sick Bay"){
					defeat(k,"Cursed Whispers");
					any = true;
				}
			}
			if(!any){
				plainAlert("No effect.");
			}
			break;
		}
		case "Looming Danger":
			if(z.travelTrack === 0){
				done = decreaseFuel(2);
			} else if(z.travelTrack === 1){
				z.travelTrack--;
				done = decreaseFuel();
			} else {
				z.travelTrack -= 2;
			}
			if(done){
				let any = false;
				switch(z.mother){
					case WATER:
					case WATER+2:
					case WATER+4:
						z.mother = WATER+6;
						any = true;
						break;
					case WATER+1:
					case WATER+3:
					case WATER+5:
						z.mother = WATER+7;
						any = true;
						break;
				}
				switch(z.father){
					case WATER:
					case WATER+2:
					case WATER+4:
						z.father = WATER+6;
						any = true;
						break;
					case WATER+1:
					case WATER+3:
					case WATER+5:
						z.father = WATER+7;
						any = true;
						break;
				}
				switch(z.graspingTendril){
					case WATER:
					case WATER+2:
					case WATER+4:
						z.graspingTendril = WATER+6;
						fleeCheck(DECK+6);
						any = true;
						break;
					case WATER+1:
					case WATER+3:
					case WATER+5:
						z.graspingTendril = WATER+7;
						fleeCheck(DECK+7);
						any = true;
						break;
				}
				switch(z.shoggoth){
					case WATER:
					case WATER+2:
					case WATER+4:
						z.shoggoth = WATER+6;
						any = true;
						break;
					case WATER+1:
					case WATER+3:
					case WATER+5:
						z.shoggoth = WATER+7;
						any = true;
						break;
				}
				switch(z.drownedSpirit){
					case WATER:
					case WATER+2:
					case WATER+4:
						z.drownedSpirit = WATER+6;
						any = true;
						break;
					case WATER+1:
					case WATER+3:
					case WATER+5:
						z.drownedSpirit = WATER+7;
						any = true;
						break;
				}
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					switch(z.deepOnes[j]){
						case WATER:
						case WATER+2:
						case WATER+4:
							z.deepOnes[j] = WATER+6;
							any = true;
							break;
						case WATER+1:
						case WATER+3:
						case WATER+5:
							z.deepOnes[j] = WATER+7;
							any = true;
							break;
					}
				}
				while(z.spacePassengers[WATER].length > 0){
					z.spacePassengers[WATER+6].push(z.spacePassengers[WATER].pop());
					any = true;
				}
				while(z.spacePassengers[WATER+2].length > 0){
					z.spacePassengers[WATER+6].push(z.spacePassengers[WATER+2].pop());
					any = true;
				}
				while(z.spacePassengers[WATER+4].length > 0){
					z.spacePassengers[WATER+6].push(z.spacePassengers[WATER+4].pop());
					any = true;
				}
				while(z.spacePassengers[WATER+1].length > 0){
					z.spacePassengers[WATER+7].push(z.spacePassengers[WATER+1].pop());
					any = true;
				}
				while(z.spacePassengers[WATER+3].length > 0){
					z.spacePassengers[WATER+7].push(z.spacePassengers[WATER+3].pop());
					any = true;
				}
				while(z.spacePassengers[WATER+5].length > 0){
					z.spacePassengers[WATER+7].push(z.spacePassengers[WATER+5].pop());
					any = true;
				}
				if(any){
					plainAlert("LOOMING_DANGER_TOP");
				}
			}
			break;
		case "Accusation":
		case "Occult Accusations": {
			let numFree = 0;
			let index = -1;
			for(let j = 0; !(j>=z.playerLocations.length); j++){
				if(z.revealedHybrids[j] === 0 && z.playerLocations[j] !== "Brig"){
					numFree++;
					index = j;
				}
			}
			if(numFree === 0){
				plainAlert("No effect.");
			} else if(numFree === 1) {
				movePlayer(index,"Brig");
			} else {
				let player = z.captain;
				if(d.mythosNames[z.currentMythos] === "Occult Accusations"){
					player = z.keeper;
				}
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				plainAlert("PLAYER_TO_BRIG",z.players[player]);
				addOption(player,"Move a player to the Brig","Accusation",true);
				done = false;
			}
			
			break;
		}
		case "Just Desserts": {
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			done = decreaseFood(2);
			done = done && drawItem(player,"Just Desserts");
			break;
		}
		case "The Anarcho-Individualist": {
			let player = z.turn;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			done = decreaseSanity() && done;
			done = drawItem(player,"The Anarcho-Individualist");	
			if(!z.gameOver){
				for(let j = 0; !(j>=5) && z.itemDeck.length > 0; j++){
					z.itemDeck.pop();
				}
				plainAlert("ANARCHO_INDIVIDUALIST_TOP");
			}
			break;
		}
		case "Missing Jewelry":
			done = decreaseSanity();
			break;
		case "Infection":
		case "Too Many Bodies":
			done = decreaseFood();
			break;
		case "Volunteer Army": {
			let player = z.captain;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			/* URULES: I assume I can't risk more than I have in the supply */
			done = false;
			if(z.passengerSupply.length === 1){
				riskPassenger(["Volunteer Army",1]);
			} else {
				let total = z.passengerSupply.length;
				if(total > 4){
					total = 4;
				}
				boldAlert("VOLUNTEER_ARMY_TOP",[z.players[player],total]);
				addOption(player,"[Volunteer Army] Risk passengers",1,true);
			}
			break;
		}
		case "Mysterious Lifeboat":
			plainAlert("MYSTERIOUS_LIFEBOAT_TOP");
			done = false;
			if(z.passengerSupply.length > 0){
				riskPassenger();
				z.dieRollQueue.push("Mysterious Lifeboat");
				z.dieRollParams.push(undefined);
			} else {
				SPTokenBad("Mysterious Lifeboat");
			}
			break;
		case "Ritual Support": {
			let player = z.keeper;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			done = false;
			if(z.skillCardHands[player].length === 1 && hasLore(player)){
				let card = discardSkillCard(player,0);
				z.dieRollModifier = cardValue(card);
				SPTokenBad("Ritual Support");
				println("ROLL_MODIFIER_REMINDER",cardValue(card));
			} else {
				plainAlert("RITUAL_SUPPORT_TOP",z.players[player],getGender(player));
				addOption(player,"Discard a Lore card","Ritual Support",true);
			}
			break;
		}
		case "Sacrifice Deep One":
			if(decreaseSanity()){
				if(!z.spreadMisfortune){
					z.sacrifice = z.keeper;
					plainAlert("SACRIFICE_DEEP_ONE_TOP",z.players[z.keeper],getGender(z.keeper));
				} else {
					plainAlert("MEMORY_OF_THE_DEEP_SPREAD","Sacrifice Deep One");
				}
			}
			break;
		case "The Captain's Banquet":
			if(decreaseFood(2)){
				increaseSanity();
				for(let j = 0; !(j>=z.playerLocations.length); j++){
					if(z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== "Galley" && !z.revealedHybrids[j]){
						done = false;
						addOption(j,"[The Captain's Banquet] Move to the Galley",undefined, false);
					}
				}
				if(!done){
					plainAlert("CAPTAINS_BANQUET_TOP");
					optionForAll("[The Captain's Banquet] Move on from this crisis",undefined,true);
				}
			}
			break;	
		case "Dinghy Launch":
			done = false;
			if(riskPassenger()){
				SPTokenBad("Dinghy Launch");
			} else {
				z.dieRollQueue.push("Dinghy Launch");
				z.dieRollParams.push(undefined);
				plainAlert("DINGHY_LAUNCH_TOP");
			}
			break;
		case "Incoming SOS":
			/* URULES: what happens if fewer than 4 in the supply? */
			if(z.passengerSupply.length >= 4){
				done = riskFourPassengers("Incoming SOS");
				increaseFood();
				increaseFuel();
				increaseSouls();
			} else if(z.passengerSupply.length === 3){
				done = riskThreePassengers("Incoming SOS");
			} else if(z.passengerSupply.length === 2){
				done = riskTwoPassengers("Incoming SOS");
			} else if(z.passengerSupply.length === 1){
				done = riskPassenger("Incoming SOS");
			} else {
				plainAlert("No effect.");
			}
			break;
		case "Poisoned Food": {
			done = false;
			let player = z.keeper;
			if(z.spreadMisfortune){
				player = getPlayerNum("Edmund");
			}
			if(z.skillCardHands[player].length === 1 && hasLore(player)){
				let card = discardSkillCard(player,0);
				z.dieRollModifier = cardValue(card);
				SPTokenBad("Poisoned Food");
				println("ROLL_MODIFIER_REMINDER",cardValue(card));
			} else {
				plainAlert("POISONED_FOOD_TOP",z.players[player],getGender(player));
				addOption(player,"Discard a Lore card","Poisoned Food",true);
			}
			break;
		}
		case "Class Struggle":
			decreaseSanity(2);
			break;
		case "Missing Parents":
			if(z.spreadMisfortune){
				movePlayer(getPlayerNum("Edmund"),"Captain's Cabin");
				SPTokenBad("Missing Parents");
			} else {
				movePlayer(z.turn,"Captain's Cabin");
				SPTokenBad("Missing Parents");
			}
			done = false;
			break;
		case "Transformation":
			SPTokenBad("Transformation (top option)");
			done = false;
			break;
		case "Improvised Fuel Source":
			done = riskThreePassengers("Improvised Fuel Source");
			increaseFuel();
			break;
		case "Family Ties":
			if(z.spreadMisfortune){
				plainAlert("FAMILY_TIES_SPREAD");
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					z.deepOnes[j] = RESERVES;
				}
			} else {
				plainAlert("FAMILY_TIES_TOP");
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					z.deepOnes[j] = RESERVES;
				}
				z.familyTies = true;
			}
			break;
		default:
			addAlert("Error: no Top outcome found");
	}
	if(z.gameOver){
		done = false;
	}
	return done;
} 

function isImprovement(item){
	return item >= FINE_CLOTHES && FINE_CLOTHES + 5 > item;
}

function resetImprovements(player){
	if(hasMultipleImprovements(player)){
		return false;
	}
	let first = true;
	let valise = itemHolder("Valise") === player;
	if(valise){
		delete z.valiseImprovement;
	}
	for(let j = 0; !(j>=z.items[player].length); j++){
		let item = z.items[player][j];
		if(isImprovement(item)){
			if(first){
				z.activeImprovements[player] = item;
				first = false;
				if(!valise){
					return true;
				}
			} else {
				z.valiseImprovement = item;
				return true;
			}
		}
	}
	if(first){
		z.activeImprovements[player] = 0;
	} 
	return true;
}

function drawTwoItems(player,context){
	if(z.itemDeck.length === 0){
		plainAlert("NO_ITEMS_LEFT");
	} else if(z.itemDeck.length === 1){
		let item = z.itemDeck.pop();
		z.items[player].push(item);
		boldAlert("DRAW_ONE_ITEM",[z.players[player],d.itemNames[item]],getGender(player));
		if(isImprovement(item) || item === VALISE){
			if(hasMultipleImprovements(player)){
				addOption(player,"Activate an Improvement",context,true);
				plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[player]);
				return false;
			} else {
				resetImprovements(player);
			}
		}		
	} else {
		let item1 = z.itemDeck.pop();
		let item2 = z.itemDeck.pop();
		z.items[player].push(item1);
		z.items[player].push(item2);
		boldAlert("DRAW_TWO_ITEMS",[z.players[player],d.itemNames[item1],d.itemNames[item2]],getGender(player));
		if(isImprovement(item1) || isImprovement(item2) || item1 === VALISE || item2 === VALISE){
			if(hasMultipleImprovements(player)){
				addOption(player,"Activate an Improvement",context,true);
				plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[player]);
				return false;
			} else {
				resetImprovements(player);
			}
		}		
	}
	return true;
}

function drawItem(player,context){
	if(z.itemDeck.length === 0){
		plainAlert("NO_ITEMS_LEFT");
	} else {
		let item = z.itemDeck.pop();
		z.items[player].push(item);
		boldAlert("DRAW_ONE_ITEM",[z.players[player],d.itemNames[item]],getGender(player));
		if(isImprovement(item) || item === VALISE){
			if(!resetImprovements(player)){
				addOption(player,"Activate an Improvement",context,true);
				plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[player]);
				return false;
			}
		}		
	}
	return true;
}



function processSkillCheckOutcome(fakeAutoPass) {
	let result = "";
	let autoPass = fakeAutoPass === true;
	let autoPartial = !autoPass && !!fakeAutoPass;
	let autoFail = fakeAutoPass !== undefined && !autoPass;
	if(autoPass === true) {
		result = "PASS";
	} else if(autoPartial){
		result = "PARTIAL";
	} else if(autoFail) {
		result = "FAIL";
	}
	let name = "";
	if(z.currentSkillCheck === null) {
		if(!z.spreadMisfortune){
			return null;
		} else {
			name = d.mythosNames[z.currentMythos]
		}
	} else if(!Number.isInteger(z.currentSkillCheck)) {
		name = z.currentSkillCheck;
	} else {
		name = d.mythosNames[z.currentSkillCheck];
	}
	let done = true;
	let tally = 0;
	if(!autoPass && !autoFail && !autoPartial) {
		let sct = skillCheckTally(true);
		result = sct[1];
		tally = sct[2];
	}
	z.processedOutcome = true;
	if(result === "PASS") {
		/* TODO: make sure everything shows up in alerts */
		boldAlert("CHECK_PASSED",name);

		if(z.currentSkillCheck === "Captain's Cabin" || z.currentSkillCheck === "Security Officer"){
			if(z.playerLocations[z.thisTarget] === "Brig"){
				plainAlert("No effect.");
			} else {
				movePlayer(z.thisTarget, "Brig");
			}
		} else if(z.currentSkillCheck === "Brig"){
				/* UTODO: BSG total conversion mod */
			boldAlert("BRIG_ESCAPE_ALERT",z.players[z.thisTarget]);
			addOption(z.thisTarget, "Move", "Brig", true);
			done = false;
		} else if(z.currentSkillCheck === "Memory of the Deep"){
			delete z.memoryOfTheDeep;
			plainAlert("MEMORY_OF_THE_DEEP_ACTION_PASS");
			z.mythosDiscards.push(MEMORY_OF_THE_DEEP);
		} else {
			switch (d.mythosNames[z.currentSkillCheck]) {
				case "A Closer Look":
					plainAlert("A_CLOSER_LOOK_PASS",z.players[z.turn]);
					if(z.cursedWhispers === z.turn){
						done = false;
						SPTokenBad("Cursed Whispers","Mythos");
					} else {
						dealSkillCard(z.turn,BOON);
						dealSkillCard(z.turn,BOON);
					}
					break;
				case "Battering Waves": {
					done = false;
					boldAlert("BATTERING_WAVES_PASS");
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig"){
							addOption(j,"[Battering Waves] Move",undefined,true);
							addOption(j,"[Battering Waves] Don't move",undefined,true);
						}
					}
					break;
				}
				case "Coal Dust":
					increaseFuel();
					break;
				case "Creeping Vines":
					plainAlert("CREEPING_VINES_PASS",z.players[z.captain]);
					dealSkillCard(z.captain,TREACHERY);
					if(z.cursedWhispers === z.captain){
						done = false;
						SPTokenBad("Cursed Whispers","Mythos");
					} else {
						dealSkillCard(z.captain,TREACHERY);
						dealSkillCard(z.captain,TREACHERY);
					}
					break;
				case "Despair":
				case "Mystic Communion":
					plainAlert("DESPAIR_PASS");
					for(let j = 0; !(j>=z.numPlayers); j++){
						let k = (z.turn + j) % z.numPlayers;
						if(!z.revealedHybrids[k]){
							if(z.cursedWhispers === k){
								done = false;
								SPTokenBad("Cursed Whispers","Mythos");
							} else {
								dealSkillCard(k,BOON);
							}
						}
					}
					break;
				case "Disappearing Belongings":
					boldAlert("DISAPPEARING_BELONGINGS_PASS",z.players[z.captain]);
					addOption(z.captain,"[Disappearing Belongings] Trade Sanity for Items",undefined,true);
					addOption(z.captain,"[Disappearing Belongings] Decline the trade",undefined,true);
					done = false;
					break;
				case "Disappearing Food":
				case "Lurking Creature": {
					let any = (z.shoggoth && z.shoggoth >= DECK) || (z.drownedSpirit && z.drownedSpirit >= DECK) || z.graspingTendril;
					let any2 = any;
					let count = 0;
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] >= DECK){
							any = true;
							count++;
						}
						any = (z.deepOnes[j] >= DECK) || any;
					}
					if(!any2 && count === 1){
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] >= DECK){
								plainAlert("SHRIVELLING_DEEP_ONE_SUCCESS",d.spaceNames[z.deepOnes[j]]);
								z.deepOnes[j] = RESERVES;
							}
						}
					} else if(any){
						if((z.shoggoth && z.shoggoth >= DECK) || (z.drownedSpirit && z.drownedSpirit >= DECK) || z.graspingTendril){
							addOption(z.turn,"Repel a Horror","Disappearing Food",true);
							done = false;
						}
						if(count){
							addOption(z.turn,"Defeat a Deep One","Disappearing Food",true);
							done = false;
						}
					} else {
						plainAlert("No effect.");
					}
					break;
				}
				case "Ghostly Locket":
					shuffleBoons();
					break;
				case "Growing Unease":
					switch(z.allyDeck.length){
						case 0:
							plainAlert("No effect.");
							break;
						case 1:
						case 2:
							plainAlert("GROWING_UNEASE_ALERT");
							NoSPToken("Growing Unease",z.allyDeck.length);
							done = false;
							break;
						default:
							plainAlert("GROWING_UNEASE_ALERT");
							NoSPToken("Growing Unease",3);
							done = false;
							break;
					}
					break;
				case "Intrusion":
					plainAlert("INTRUSION_PASS",z.players[z.captain]);
					if(z.captain === z.cursedWhispers){
						SPTokenBad("Cursed Whispers","Mythos");
					} else {
						dealSkillCard(z.captain,BOON);
						dealSkillCard(z.captain,BOON);
					}
					break;
				case "Join Hands": 
					if(z.shoggoth && z.shoggoth >= DECK && INTERIOR > z.shoggoth){
						z.shoggoth -= 8;
						fleeCheck(z.shoggoth);
					} else if (z.shoggoth && z.shoggoth > BRIDGE && BOILER_ROOM > z.shoggoth){
						z.shoggoth -= 7;
						fleeCheck(z.shoggoth);
					} else if(z.shoggoth === BRIDGE || z.shoggoth === BOILER_ROOM){
						addOption(z.turn,"[Join Hands] Move monsters");
						done = false;
					}
					if(z.drownedSpirit && z.drownedSpirit >= DECK && INTERIOR > z.drownedSpirit){
						z.drownedSpirit -= 8;
						fleeCheck(z.drownedSpirit);
					} else if (z.drownedSpirit && z.drownedSpirit >= CHAPEL && BOILER_ROOM > z.drownedSpirit){
						z.drownedSpirit -= 7;
						fleeCheck(z.drownedSpirit);
					} else if (z.drownedSpirit === BRIDGE || z.drownedSpirit === BOILER_ROOM){
						if(done){
							addOption(z.turn,"[Join Hands] Move monsters");
						}
						done = false;
					}
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] >= DECK && INTERIOR > z.deepOnes[j]){
							z.deepOnes[j] -= 8;
							fleeCheck(z.deepOnes[j]);
						} else if (z.deepOnes[j] > BRIDGE && BOILER_ROOM > z.deepOnes[j]){
							z.deepOnes[j] -= 7;
							fleeCheck(z.deepOnes[j]);
						} else if(z.deepOnes[j] === BRIDGE || z.deepOnes[j] === BOILER_ROOM){
							if(done){
								addOption(z.turn,"[Join Hands] Move monsters");
							}
							done = false;
						}
					}
					break;
				case "Last Rites":
					shuffleBoons(4);
					break;
				case "Missing Persons":
					if(z.allyDeck.length === 0){
						plainAlert("No effect.");
					} else if(z.allyDeck.length === 1){
						boldAlert("MISSING_PERSONS_1",[d.allyNames[z.allyDeck[0]],z.players[z.turn]]);
						addOption(z.turn,"[Missing Persons] Spawn allies",undefined,true);
						done = false;
					} else {
						boldAlert("MISSING_PERSONS_2",[z.players[z.turn],d.allyNames[z.allyDeck[z.allyDeck.length-1]],d.allyNames[z.allyDeck[z.allyDeck.length-2]]]);
						addOption(z.turn,"[Missing Persons] Spawn allies",undefined,true);
						done = false;
					}
					break;
				case "Precognition":
					for(let j = 0; !(j>=4); j++){
						z.skillCardHands[z.turn].push(z.chaos.pop());
						if(j === 1 && z.cursedWhispers === z.turn){
							SPTokenBad("Cursed Whispers","Precognition");
							break;
						}
						if(z.chaos.length === 0 && j !== 3){
							buildChaos();
						}
					}
					for(let j = 0; !(j>=z.possibleColors[z.turn].length); j++){
						z.possibleColors[z.turn][j] = 1;
					}
					boldAlert("PRECOGNITION_ALERT",z.players[z.turn]);
					addOption(z.turn,"[Precognition] Put 2 Skill Cards on top of the Chaos Deck",undefined,true);
					done = false;
					break;
				case "Risky Preservation":
					increaseFood();
					break;
				case "Seaborne":
					boldAlert("SEABORNE_ALERT",z.players[z.keeper]);
					addOption(z.keeper,"Advance the Travel Track","Seaborne",true);
					addOption(z.keeper,"Advance the Ritual Track","Seaborne",true);
					done = false;
					break;
				case "Scary Stories":
					plainAlert("SCARY_STORIES_PASS",z.players[z.turn]);
					dealSkillCard(z.turn,BOON);
					if(z.turn === z.cursedWhispers){
						done = false;
						SPTokenBad("Cursed Whispers","Mythos");
					} else {
						dealSkillCard(z.turn,BOON);
						dealSkillCard(z.turn,BOON);
					}
					break;
				case "Sense of Foreboding":
					plainAlert("SENSE_OF_FOREBODING_PASS",z.players[z.keeper]);
					if(z.keeper === z.cursedWhispers){
						done = false;
						SPTokenBad("Cursed Whispers","Mythos");
					} else {
						dealSkillCard(z.keeper,BOON);
						dealSkillCard(z.keeper,BOON);
					}
					break;
				case "Taken":
					plainAlert("TAKEN_PASS",z.players[z.turn]);
					addOption(z.turn,"[Taken] Choose a ship space",undefined,true);
					done = false;
					break;
				case "Torn Pages":
					if(z.spellDeck.length === 0){
						plainAlert("No effect.");
					} else {
						boldAlert("TORN_PAGES_PASS");
						z.spellDeck.pop();
					}
					break;
				case "Unexpected Revival":
					increaseSouls();
					break;
				case "Unsecured Cargo": {
					let any = false; 
					for(let j = 0; !(j>=z.numPlayers); j++){
						let k = (z.turn + j) % z.numPlayers;
						if(locationIndex(z.playerLocations[k]) >= DECK && INTERIOR > locationIndex(z.playerLocations[k])){
							any = true;
							done = drawItem(k,"Unsecured Cargo") && done;
						}
					}
					if(!any){
						plainAlert("No effect.");
					}
					break;
				}
				case "Unseen Follower":
					done = false;
					plainAlert("UNSEEN_FOLLOWER_ALERT",z.players[z.turn]);
					addOption(z.turn,"[Unseen Follower] Spawn an Ally",undefined,true);
					break;
				case "Terrified Sailor": {
					if(z.itemDeck.length === 0){
						plainAlert("No effect.");
					} else {
						let any = false;
						for(let j = z.itemDeck.length-1; j>=0 && !any; j--){
							let name = d.itemNames[z.itemDeck[j]];
							switch(name){
								case "Six-Shooter":
								case "Repeating Rifle":
								case "Pocket Pistol":
								case "Kitchen Knife":
								case "Shotgun":
								case "Fillet Knife":
								case "Flare Gun":
								case "Baseball Bat":
									z.items[getPlayerNum("Avery")].push(z.itemDeck.splice(j,1)[0]);
									plainAlert("TERRIFIED_SAILOR_PASS",name);
									any = true;
									break;
								default:
									println("ITEM_REVEALED",name);
									break;
							}
						}
						plainAlert("DECK_RESHUFFLE","Item");
						shuffle(z.itemDeck);
					}
					break;
				}			
				case "Rumors":
					/* URULES: Sick Bay here */
					if(z.playerLocations[getPlayerNum("Ida")] === "Sick Bay"){
						spawnAlly("Chapel");
					} else {
						spawnAlly(z.playerLocations[getPlayerNum("Ida")]);
					}
					break;
				case "Sense of Propriety":
					if(z.playerLocations[getPlayerNum("Raúl")] === "Sick Bay"){
						spawnAlly("Chapel");
					} else {
						spawnAlly(z.playerLocations[getPlayerNum("Raúl")]);
					}
					break;
				case "Power to the People":
				case "Witch Hunt":
					shuffleTreachery();
					break;
				case "Adrift Fishing Boat":
					if(z.passengerSupply.length === 0){
						plainAlert("No effect.");
					} else {
						done = false;
						riskPassenger("Adrift Fishing Boat Pass");
					}
					break;
				case "Bucket Brigade":
					if(z.passengerSupply.length >= 2){
						riskTwoPassengers("Bucket Brigade Pass");
						done = false;
					} else {
						plainAlert("No effect.");
					}
					break;
				case "Passenger Riot":
				case "Criminal Activity":
				case "Pickpocket":
					done = drawItem(z.turn,"Passenger Riot");
					break;
				case "Missing Munitions": {
					let sectors = 0;
					let deepOne = 0;
					for(let j = INTERIOR; !(j>=INTERIOR+6); j++){
						for(let k = 0; !(k>=z.deepOnes.length); k++){
							if(z.deepOnes[k] === j){
								sectors++;
								deepOne = k;
								break;
							}
						}
					}
					if(sectors === 1){
						let sector = z.deepOnes[deepOne];
						plainAlert("DEEP_ONE_DEFEATED",[z.players[z.turn],d.spaceNames[sector]]);
						z.deepOnes[deepOne] = RESERVES;
					} else if(sectors > 1){
						plainAlert("MISSING_MUNITIONS_PASS",z.players[z.turn]);
						addOption(z.turn,"Defeat a Deep One","Missing Munitions",true);
						done = false;
					} else {
						plainAlert("No effect.");
					}
					break;
				}
				case "Stolen Ritual Components":
				case "Dabbling in the Occult": {
					if(z.spellDeck.length === 0){
						plainAlert("No effect.");
					} else {
						plainAlert("STOLEN_RITUAL_COMPONENTS_PASS",z.players[z.keeper]);
						addOption(z.keeper,"[Keeper of the Tome] Look at 2 Spells","Stolen Ritual Components",true);
						z.stolenRitualComponents = true;
						done = false;
					}
					break;
				}
				case "Kitty Litter": 
				case "Rally the Crew":
				case "Disturbing Dreams":
				case "Cabin Fever":
				case "Hysteria":
				case "Unsolved Case":
				case "Exorcism":
					increaseSanity();
					break;
				case "Coal Bunker Fire":
				case "Coordinated Assault":
				case "E.O.T. Failure":
				case "Drag":
				case "Monstrous Pursuit":
					done = advanceTravel();
					if(!done && !z.gameOver){
						z.extraTravel = "Mythos";
					}
					break;
				case "Shipboard Fire":
					done = damageShip("Mythos");
					break;
				case "Barricade the Hatches":
					z.barricade = z.turn;
					plainAlert("BARRICADE_THE_HATCHES_PASS",z.players[z.turn],getGender(z.turn));
					break;
				case "Identity Crisis":
					/* UTODO: think about ordering */
					plainAlert("IDENTITY_CRISIS_PASS");
					for(let j = 0; !(j>=z.revealedHybrids.length); j++){
						let k = (z.turn + j) % z.numPlayers;
						if(z.revealedHybrids[k] === 0){
							if(k === z.cursedWhispers){
								SPTokenBad("Cursed Whispers","Identity Crisis");
							} else {
								addOption(k,"Draw 1 Skill Card","Identity Crisis",true);
							}
						}
					}
					done = false;
					break;
				case "Ritual Coordination": {
					done = advanceRitual();
					let extra = (tally - 9) >> 1;
					while(done && extra > 0){
						done = advanceRitual();
						extra--;
					}
					if(extra > 0){
						if(extra === 1){
							plainAlert("EXTRA_RITUAL_COORDINATION_1");
						} else {
							plainAlert("EXTRA_RITUAL_COORDINATION",extra);
						}
						z.extraRitual = extra;
					}
					break;
				}
				case "On the Offensive": {
					let any = false;
					let context = [];
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] >= DECK){
							context.push(true);
							any = true;
						} else {
							context.push(false);
						}
					}
					if(any){
						done = false;
						addOption(z.turn,"Move a Deep One",context,true);
						plainAlert("ON_THE_OFFENSIVE_ALERT",z.players[z.turn]);
					} else {
						plainAlert("No effect.");
					}
					break;
				}
				case "Hold the Line": {
					let any = false;
					let context = [];
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] >= DECK){
							context.push(true);
							any = true;
						} else {
							context.push(false);
						}
					}
					if(any){
						done = false;
						addOption(z.turn,"Move a Deep One",context,false);
						addOption(z.turn,"Clear skill check","Hold the Line",true);
						plainAlert("HOLD_THE_LINE_ALERT",z.players[z.turn]);
					} else {
						plainAlert("No effect.");
					}
					break;
				}
				case "Open the Gate": {
					done = false;
					z.travelTrack = 0;
					plainAlert("OPEN_THE_GATE_PASS",z.players[z.keeper]);
					addOption(z.keeper,"Choose a Waypoint",undefined,true);
					z.extraTravel = "Mythos";
					break;
				}
				case "Rat Infestation": {
					done = false;
					plainAlert("RAT_INFESTATION_PASS",z.players[z.turn]);
					addOption(z.turn,"[Rat Infestation] Trade Sanity for Food",undefined,true);
					addOption(z.turn,"[Rat Infestation] Decline the trade",undefined,true);
					break;
				}
				case "History Repeats": {
					increaseSanity();
					let any = false;
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.revealedHybrids[j] === 0 && z.players[j] !== "Keilani" && z.playerLocations[j] !== "Brig"){
							any = true;
							break;
						}
					}
					if(any){
						plainAlert("ANOTHER_PLAYER_TO_BRIG","Keilani");
						addOption(getPlayerNum("Keilani"),"Move a player to the Brig", "History Repeats", false);
						addOption(getPlayerNum("Keilani"),"Clear skill check", "History Repeats", true);
						done = false;
					}
					break;
				}
				case "The Peacemaker": {
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] !== DEEP){
							z.deepOnes[j] = RESERVES;
						}
					}
					boldAlert("THE_PEACEMAKER_PASS");
					break;
				}
				case "Do No Harm": {
					done = decreaseSanity();
					if(done){
						movePlayer(getPlayerNum("Svetlana"),"Sick Bay");
					}
					break;
				}
				case "Signs of Life": {
					increaseSanity();
					break;
				}
				case "The Game is Afoot": {
					done = false;
					plainAlert("THE_GAME_IS_AFOOT_PASS");
					addOption(getPlayerNum("Jamie"),"[The Game is Afoot] Choose an interior space",undefined,true);
					break;
				}
				case "Memory of the Deep": {
					done = false;
					plainAlert("MEMORY_OF_THE_DEEP_PASS");
					addOption(getPlayerNum("William"),"Discard Memory of the Deep",undefined,false);
					addOption(getPlayerNum("William"),"Clear skill check","Memory of the Deep",true);
					break;
				}
				case "Miscalculation": {
					done = false;
					addOption(getPlayerNum("Beatrice"),"Scout the Waypoint deck","Miscalculation",true);
					plainAlert("MISCALCULATION_PASS");
					break;
				}
				case "Gift of the Mother": {
					let destinyText = lc("GIFT_OF_THE_MOTHER_PASS")+"\r\n";
					if(z.luckyRing){
						println("LUCKY_RING_PROC");
						shuffleTreachery();
						delete z.luckyRing;
					}
					while(z.chaos.length > 0) {
						let card = z.chaos.pop();
						z.skillCardDiscards[cardColorID(card)].push(card);
						destinyText += cardText(card) + "\r\n";
					}
					plainAlert(destinyText);
					buildChaos();
					break;
				}
				case "Ticket, Please":
					drawItem(getPlayerNum("Samira"),"Passenger Riot");
					break;		
				case "Tug of War":
					spawnAlly("Galley");
					break;
				default:
					plainAlert("No effect.");
					break;
			}
		}

	} else if(result === "PARTIAL") {
		boldAlert("CHECK_PARTIAL",name);
		switch (d.mythosNames[z.currentSkillCheck]) {
			case "Battering Waves":
			case "Coal Dust":
			case "Despair":
			case "Hysteria":
			case "Last Rites":
			case "Lurking Creature":
			case "Monstrous Pursuit":
			case "Risky Preservation":
			case "Taken":
			case "Unexpected Revival":
				plainAlert("No effect.");
				break;
			case "Disappearing Food":
				done = decreaseFood();
				done = done && spawnDeepOne(GALLEY);
				break;
			case "Drag":
				plainAlert("DRAG_ALERT");
				NoSPToken("Grasping Tendril Placement","Drag (partial)");
				done = false;
				break;
			case "Join Hands": {
				let any = false;
				for(let j = 0; !(j>=z.allies.length); j++){
					let destination = "";
					switch(z.allies[j][1]){
						case "Chapel":
							destination = "Deck Space 3";
							break;
						case "Captain's Cabin":
							destination = "Deck Space 4";
							break;
						case "Cargo Hold":
							destination = "Deck Space 5";
							break;
						case "Galley":
							destination = "Deck Space 6";
							break;
						case "Bridge":
							done = false;
							boldAlert("JOIN_HANDS_ALERT",[z.players[z.turn],d.allyNames[z.allies[j][0]],1,2]);
							addOption(z.turn,"[Join Hands] Move an ally","Partial",true);
							break;
						case "Boiler Room":
							done = false;
							boldAlert("JOIN_HANDS_ALERT",[z.players[z.turn],d.allyNames[z.allies[j][0]],1,2]);
							addOption(z.turn,"[Join Hands] Move an ally","Partial",true);
							break;
					}
					if(destination !== ""){
						any = true;
						plainAlert("PLAYER_IS_MOVED",[d.allyNames[z.allies[j][0]],destination]);
						z.allies[j][1] = destination;
						fleeCheck(locationIndex(destination));
					}
				}
				if(!any && done){
					plainAlert("No effect.");
				}
				break;
			}
			case "Missing Persons":
				if(z.passengerSupply.length === 0){
					plainAlert("No effect.");
				} else {
					NoSPToken("Missing Persons (partial)");
					boldAlert("MISSING_PERSONS_PARTIAL_ALERT");
					done = false;
				}
				break;
			case "Scary Stories":
				done = promptDiscards(z.turn,2,"Scary Stories",false);
				break;
			case "Tidal Turbulence":
				boldAlert("TIDAL_TURBULENCE_PARTIAL_ALERT",z.players[z.turn]);
				addOption(z.turn,"[Tidal Turbulence] Lose a resource",undefined,true);
				done = false;
				break;
			case "Torn Pages":
				if(z.spellDeck.length === 0){
					plainAlert("No effect.");
				} else if(z.spellDeck.length === 1){
					boldAlert("TORN_PAGES_PASS");
					z.spellDeck.pop();
				} else {
					let count = 0;
					for(let j = 0; !(j>=6) && z.spellDeck.length > 0; j++){
						z.spellDeck.pop();
						count++;
					}
					boldAlert("TORN_PAGES_PLURAL",count);
				}
				break;
			case "Tug of War":
				if(decreaseFood()){
					plainAlert("TUG_OF_WAR_PARTIAL");
					spawnGraspingTendril(WATER+5);
				}
				break;
			case "Food Stores Raid":
			case "Damaged Evaporator":
			case "Rat Infestation":
				done = decreaseFood();
				break;
			case "Adrift Fishing Boat":
				if(z.passengerSupply.length >= 2){
					riskTwoPassengers("Adrift Fishing Boat Partial");
					increaseSouls();
					done = false;
				} else {
					plainAlert("No effect.");
				}
				break;
			case "Passenger Riot":
			case "Disturbing Dreams":
			case "Rally the Crew":
				done = decreaseSanity();
				break;
			case "Missing Munitions":
				done = damageShip("Mythos");
				break;
			case "The Mother's Wrath":
				done = activateMother("The Mother's Wrath");
				break;
			case "Infiltrator":
				NoSPToken("Infiltrator");
				plainAlert("INFILTRATOR_PARTIAL");
				done = false;
				break;
			case "Collision Course":
				NoSPToken("Collision Course (Partial)");
				plainAlert("COLLISION_COURSE_PARTIAL");
				done = false;
				break;
			case "Shipboard Fire":
				done = damageShip("Collision Course");
				if(done){
					done = damageShip("Mythos");
				}
				break;
			case "Deep One Swarm":
				done = activateDeepOnes();
				if(!done){
					z.deepOneContext = "Barricade the Hatches";
				}
				break;
			case "The Father's Favor":
				done = activateFather("The Father's Favor");
				break;
			case "Hypnotic Melody":
				if(z.passengerSupply.length === 0){
					done = decreaseFood();
				} else {
					done = false;
					riskPassenger("Hypnotic Melody");
				}
				break;
			case "Hold the Line":
				for(let j = WATER; !(j>=DECK) && done; j++){
					done = spawnDeepOne(j);
				}
				break;
			default:
				error("ERROR: No Partial Result Found");
		}

	} else if(result === "FAIL") {
		boldAlert("CHECK_FAILED",name);
		if(z.currentSkillCheck === "Captain's Cabin" || z.currentSkillCheck === "Brig" || z.currentSkillCheck === "Security Officer"){
			plainAlert("No effect.");
		} else if (z.currentSkillCheck === "Memory of the Deep"){
			done = decreaseSanity();
		} else {
		switch (name) {
			case "A Closer Look":
				done = decreaseSouls();
				done = done && activateGraspingTendril("A Closer Look");
				break;
			case "Battering Waves": {
				let any = false;
				let fakeAny = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig" && z.items[j].length > 0){
						any = true;
						shuffle(z.items[j]);
						let item = z.items[j].pop();
						if(d.itemNames[item] === "Cursed Mask"){
							fakeAny = true;
							plainAlert("CURSED_MASK_TRIGGER",z.players[j]);
							z.items[j].push(item);
							if(j === z.cursedWhispers){
								SPTokenBad("Cursed Whispers","Battering Waves");
								done = false;
							} else {
								dealSkillCard(j,TREACHERY);
							}
						} else {
							z.itemDeck.push(item);
							boldAlert("BATTERING_WAVES_ITEM_LOST",[z.players[j],d.itemNames[item]]);
							if(isImprovement(item) || item === VALISE){
								if(!resetImprovements(j)){
									addOption(j,"Activate an Improvement","Battering Waves",true);
									plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[j]);
									done = false;
								} 
							}
						}
					}
				}
				if(any){
					shuffle(z.itemDeck);
				} else if(!fakeAny){
					plainAlert("No effect.");
				}
				break;
			}
			case "Bump in the Night":
				done = activateGraspingTendril("Bump in the Night");
				break;
			case "Cabin Fever":
				done = decreaseFood();
				break;
			case "Calenture":
				done = riskTwoPassengers("Calenture");
				if(done){
					let any = false;
					for(let j = DECK; !(j>=INTERIOR); j++){
						while(z.spacePassengers[j].length > 0){
							any = true;
							z.spacePassengers[j-8].push(z.spacePassengers[j].pop());
						}
					}
					if(any){
						plainAlert("CALENTURE_FAIL");
					}
				}
				break;
			case "Coal Dust":
				done = decreaseFuel();
				if(done){
					if(z.passengerSupply.length > 0){
						z.spacePassengers[DECK-1+7].push(z.passengerSupply.pop());
						plainAlert("PASSENGER_SPAWNED","Deck Space 7");
						if(z.passengerSupply.length > 0){
							z.spacePassengers[DECK-1+8].push(z.passengerSupply.pop());
							plainAlert("PASSENGER_SPAWNED","Deck Space 8");
						}
					}
				}
				break;
			case "Creeping Vines":
				done = decreaseSouls();
				done = done && damageShip("Mythos");
				break;
			case "Dabbling in the Occult":
				done = decreaseSouls();
				done = done && activateDrownedSpirit("Dabbling in the Occult");
				break;
			case "Dead Reckoning":
				done = decreaseFuel();
				break;
			case "Despair":
				done = decreaseSanity();
				done = done && decreaseSouls();
				break;
			case "Disappearing Belongings":
				done = decreaseSanity();
				done = done && riskTwoPassengers("Disappearing Belongings");
				break;
			case "Disappearing Food":
				done = decreaseFood(2);
				done = done && damageLocation("Galley",undefined,"Disappearing Food");
				done = done && spawnDeepOne(DEEP);
				break;
			case "Drag":
				retreatTravel();
				done = activateGraspingTendril("Drag");
				break;
			case "Eerie Moaning":
				done = activateDrownedSpirit("Eerie Moaning");
				break;
			case "Ghostly Locket":
				done = activateDrownedSpirit("Ghostly Locket 1");
				done = done && activateDrownedSpirit("Ghostly Locket 2");
				break;
			case "Growing Unease":
				done = riskThreePassengers("Growing Unease");
				break;
			case "Hysteria":
				done = decreaseSanity();
				done = done && riskTwoPassengers("Hysteria");
				break;
			case "Intrusion":
			case "Tidal Turbulence":
				done = decreaseFood();
				done = done && decreaseFuel();
				break;
			case "Join Hands": {
				for(let j = 0; !(j>=z.allies.length); j++){
					let destination = "";
					switch(z.allies[j][1]){
						case "Chapel":
							destination = "Deck Space 3";
							break;
						case "Captain's Cabin":
							destination = "Deck Space 4";
							break;
						case "Cargo Hold":
							destination = "Deck Space 5";
							break;
						case "Galley":
							destination = "Deck Space 6";
							break;
						case "Bridge":
							done = false;
							boldAlert("JOIN_HANDS_ALERT",[z.players[z.turn],d.allyNames[z.allies[j][0]],1,2]);
							addOption(z.turn,"[Join Hands] Move an ally","Fail",true);
							break;
						case "Boiler Room":
							done = false;
							boldAlert("JOIN_HANDS_ALERT",[z.players[z.turn],d.allyNames[z.allies[j][0]],1,2]);
							addOption(z.turn,"[Join Hands] Move an ally","Fail",true);
							break;
					}
					if(destination !== ""){
						plainAlert("PLAYER_IS_MOVED",[d.allyNames[z.allies[j][0]],destination]);
						z.allies[j][1] = destination;
					}
				}
				if(done){
					riskThreePassengers("Join Hands");
				}
				break;
			}
			case "Last Rites":
				shuffleTreachery();
				done = activateDrownedSpirit("Last Rites");
				break;
			case "Lurking Creature":
				done = false;
				decreaseSouls();
				NoSPToken("Lurking Creature");
				plainAlert("INFILTRATOR_PARTIAL");
				break;
			case "Missing Persons":
				done = decreaseSouls();
				if(done && z.passengerSupply.length > 0){
					done = false;
					NoSPToken("Missing Persons (fail)");
					boldAlert("MISSING_PERSONS_FAIL_ALERT");
				}
				break;
			case "Monstrous Pursuit":
				if(z.passengerSupply.length === 0){
					done = activateShoggoth("Monstrous Pursuit");
				} else {
					done = false;
					NoSPToken("Monstrous Pursuit");
					boldAlert("MISSING_PERSONS_FAIL_ALERT");
				}
				break;
			case "Mystic Communion":
				done = decreaseSanity();
				if(done){
					shuffleTreachery();
				}
				break;
			case "Ominous Feeling":
				activateHorror("Ominous Feeling");
				done = false;
				break;
			case "Parasite":
				done = activateShoggoth("Parasite");
				break;
			case "Pickpocket":
				done = decreaseSanity();
				if(done){
					if(z.spreadMisfortune){
						if(z.items[getPlayerNum("Edmund")].length > 0){
							shuffle(z.items[getPlayerNum("Edmund")]);
							let item = z.items[getPlayerNum("Edmund")].pop();
							if(d.itemNames[item] === "Cursed Mask"){
								plainAlert("CURSED_MASK_TRIGGER","Edmund");
								z.items[getPlayerNum("Edmund")].push(item);
								dealSkillCard(getPlayerNum("Edmund"),TREACHERY);
							} else {
								plainAlert("ITEM_REMOVED",["Edmund",d.itemNames[item]]);
								if(isImprovement(item) || item === VALISE){
									if(!resetImprovements(getPlayerNum("Edmund"))){
										addOption(getPlayerNum("Edmund"),"Activate an Improvement","Pickpocket (fail)",true);
										plainAlert("MULTIPLE_IMPROVEMENTS_ALERT","Edmund");
										done = false;
									}
								}
							}
						}
					} else {
						if(z.items[z.turn].length > 0){
							shuffle(z.items[z.turn]);
							let item = z.items[z.turn].pop();
							if(d.itemNames[item] === "Cursed Mask"){
								plainAlert("CURSED_MASK_TRIGGER",z.players[z.turn]);
								z.items[z.turn].push(item);
								if(z.turn === z.cursedWhispers){
									SPTokenBad("Cursed Whispers","Mythos");
									done = false;
								} else {
									dealSkillCard(z.turn,TREACHERY);
								}
							} else {
								plainAlert("ITEM_REMOVED",[z.players[z.turn],d.itemNames[item]]);
								if(isImprovement(item) || item === VALISE){
									if(!resetImprovements(z.turn)){
										addOption(z.turn,"Activate an Improvement","Pickpocket (fail)",true);
										plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[z.turn]);
										done = false;
									}
								}
							}
						}
					}
				}
				break;
			case "Precognition":
				done = decreaseSanity(2);
				if(done){
					if(2 > z.skillCardDecks[TREACHERY].length + z.skillCardDiscards[TREACHERY].length){
						plainAlert("SHORT_CHAOS_ALERT",colorIDName(TREACHERY));
					} else {
						reshuffleSkillCardDeck(TREACHERY);
						z.chaos.push(z.skillCardDecks[TREACHERY].pop());
						reshuffleSkillCardDeck(TREACHERY);
						z.chaos.push(z.skillCardDecks[TREACHERY].pop());
						plainAlert("PRECOGNITION_FAIL");
					}
				}
				break;
			case "Seaborne":
				done = decreaseFood(2);
				if(done){
					shuffleTreachery();
				}
				break;
			case "Sense of Foreboding":
				done = decreaseSanity();
				if(done){
					if(z.ritualTrack === 0){
						done = decreaseSanity();
					} else {
						retreatRitual();
					}
				}
				break;
			case "Shoggoth":
				spawnShoggoth(BRIDGE);
				done = activateShoggoth("Shoggoth (fail)");
				break;
			case "Spoilage":
				done = decreaseFood();
				if(done){
					done = false;
					SPTokenBad("Spoilage");
				}
				break;
			case "Taken":
				NoSPToken("Taken");
				boldAlert("TAKEN_FAIL");
				break;
			case "Torn Pages":
				if(z.spellDeck.length === 1){
					boldAlert("TORN_PAGES_PASS");
					z.spellDeck.pop();
				} else if(z.spellDeck.length > 1) {
					let count = 0;
					for(let j = 0; !(j>=6) && z.spellDeck.length > 0; j++){
						z.spellDeck.pop();
						count++;
					}
					boldAlert("TORN_PAGES_PLURAL",count);
				}
				done = decreaseSouls();
				break;
			case "Tug of War":
				done = decreaseSouls();
				if(done){
					spawnGraspingTendril(WATER-1+6);
					activateGraspingTendril("Tug of War");
				}
				break;
			case "Unexpected Revival":
				done = decreaseFood();
				done = done && decreaseSouls();
				break;
			case "Unsecured Cargo":
				if(z.passengerSupply.length === 0){
					if(z.itemDeck.length === 0){
						plainAlert("No effect.");
					} else {
						let count = 0;
						for(let j = 0; !(j>=8) && z.itemDeck.length > 0; j++){
							z.itemDeck.pop();
							count++;
						}
						if(count === 1){
							plainAlert("UNSECURED_CARGO_SINGULAR");
						} else {
							plainAlert("UNSECURED_CARGO_PLURAL",count);
						}
					}
				} else if(z.passengerSupply.length === 1){
					NoSPToken("Unsecured Cargo","second");
					boldAlert("UNSECURED_CARGO_ONE");
				} else {
					NoSPToken("Unsecured Cargo","first");
					boldAlert("UNSECURED_CARGO_TWO");
				}
				break;
			case "Unseen Follower":
				done = decreaseSanity();
				if(z.spreadMisfortune){
					done = done && defeat(getPlayerNum("Edmund"),"Unseen Follower");
				} else {
					done = done && defeat(z.turn,"Unseen Follower");
				}
				break;
			case "Witch Hunt":
				done = decreaseSanity();
				if(done){
					if(z.spreadMisfortune){
						let edmundKeeper = getPlayerNum("Edmund") === z.keeper;
						movePlayer(getPlayerNum("Edmund"),"Brig",false,true);
						if(!edmundKeeper){
							passKeeper(d.keeperSuccession[getCharacter(z.players[z.keeper])],true);
						}
						removeOption(getPlayerNum("Edmund"),"[Reveal] Discard a Skill Card");
					} else {
						movePlayer(z.keeper,"Brig",false,true);
					}
				}
				break;
			case "Unsolved Case":
				done = decreaseSanity();
				if(done){
					shuffleTreachery(4);
				}
				break;
			case "Terrified Sailor":
				done = decreaseSouls();
				done = done && defeat(getPlayerNum("Avery"),"Terrified Sailor");
				break;
			case "Exorcism":
				done = decreaseSouls();
				done = done && activateDrownedSpirit("Exorcism 1");
				done = done && activateDrownedSpirit("Exorcism 2");
				break;
			case "Rumors":
				movePlayer(getPlayerNum("Ida"),"Brig");
				break;
			case "Sense of Propriety":
				done = decreaseSanity();
				if(done){
					z.senseOfPropriety = getPlayerNum("Raúl");
					boldAlert("SENSE_OF_PROPRIETY_PLACED");
				}
				break;
			case "Missing Munitions":
				done = damageShip("Collision Course");
				if(done){
					done = damageShip("Mythos");
				}
				break;
			case "Hull Leak":
				done = damageShip("Mythos");
				break;
			case "Power to the People":
				done = decreaseSouls();
				if(done){
					if(z.spreadMisfortune){
						let edmundCaptain = z.captain === getPlayerNum("Edmund");
						movePlayer(getPlayerNum("Edmund"),"Brig",true);
						if(!edmundCaptain){
							passCaptain(d.captainSuccession[getCharacter(z.players[z.captain])],true);
						}
						removeFromAll("[Reveal] Discard a Skill Card");
					} else {
						movePlayer(z.captain,"Brig",true);
					}
				}
				break;
			case "Food Stores Raid":
			case "Risky Preservation":
				done = decreaseFood(2);
				break;
			case "Adrift Fishing Boat":
			case "Passenger Riot":
				done = decreaseSanity();
				done = done && decreaseSouls();
				break;
			case "Bucket Brigade":
				if(decreaseFuel()){
					done = riskTwoPassengers("Bucket Brigade Fail");
				}
				break;
			case "Criminal Activity":
				done = decreaseSanity();
				if(done){
					for(let j = 0; !(j>=z.items.length); j++){
						if(z.items[j].length > 1 && z.revealedHybrids[j] === 0){
							done = false;
							addOption(j,"Remove all but 1 of your items from the game","Criminal Activity",true);
						}
					}
					if(!done){
						plainAlert("CRIMINAL_ACTIVITY_FAIL");
					}
				}
				break;
			case "Firemen Strike":
				if(z.spreadMisfortune){
					done = defeat(getPlayerNum("Edmund"),"Firemen Strike");
					done = promptDiscards(getPlayerNum("Edmund"),3,"Firemen Strike",!done) && done;
				} else {
					done = defeat(z.turn,"Firemen Strike");
					done = promptDiscards(z.turn,3,"Firemen Strike",!done) && done;
				}
				break;
			case "Stolen Ritual Components":
				retreatRitual();
				retreatRitual();
				plainAlert("STOLEN_RITUAL_COMPONENTS_FAIL");
				for(let j = 0; !(j>=5) && z.spellDeck.length > 0; j++){
					z.spellDeck.pop();
				}
				break;
			case "The Mother's Wrath":
				done = activateMother("The Mother's Wrath 2");
				if(done){
					done = activateMother("The Mother's Wrath");
				}
				break;
			case "Kitty Litter":
			case "Horrific Visions":
				done = decreaseSanity();
				break;
			case "Infiltrator":
				done = damageShip("Infiltrator");
				break;
			case "Rally the Crew":
				if(decreaseSanity(2)){
					for(let j = 0; !(j>=z.players.length); j++){
						let k = (z.turn + j) % z.numPlayers;
						if(!z.revealedHybrids[k]){
							done = promptDiscards(k,2,"Rally the Crew",!done) && done;
						}
					}
				}
				break;
			case "Collision Course":
				NoSPToken("Collision Course (Fail)");
				done = false;
				break;
			case "Coal Bunker Fire":
				if(decreaseFuel()){
					decreaseSouls();
				}
				break;
			case "Shipboard Fire":
				done = damageShip("Shipboard Fire");
				if(done){
					done = damageShip("Collision Course");
					if(done){
						done = damageShip("Mythos");
					}
				}
				break;
			case "Barricade the Hatches":
			case "Deep One Feint":
			case "On the Offensive":
				done = activateDeepOnes();
				if(!done){
					z.deepOneContext = "Barricade the Hatches";
				}
				break;
			case "Identity Crisis": {
				let player = z.turn;
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				if(decreaseSouls()){
					if(z.playerLocations[player] === "Sick Bay"){
						spawnDeepOne(locationIndex("Chapel"));
					} else {
						spawnDeepOne(locationIndex(z.playerLocations[player]));
					}
				}
				break;
			}
			case "Sewage Backup":
				if(decreaseSanity()){
					let any = false;
					for(let j = 0; !(j>=z.numPlayers); j++){
						let index = locationIndex(z.playerLocations[j]);
						if(index >= INTERIOR && INTERIOR+6 > index && !z.revealedHybrids[j]){
							any = true;
							break;
						}
					}
					if(any){
						NoSPToken("Sewage Backup");
						plainAlert("SEWAGE_BACKUP_FAIL");
						done = false;
					}
				}
				break;
			case "Deep One Swarm":
				done = activateDeepOnes();
				if(done){
					done = activateDeepOnes();
					if(!done){
						z.deepOneContext = "Coordinated Assault";
					}
				} else {
					z.deepOneContext = "Deep One Swarm";
				}
				break;
			case "Coordinated Assault": {
				let any = (z.father === DEEP || z.mother === DEEP);
				for(let j = 0; !(j>=z.deepOnes.length) && !any; j++){
					any = (z.deepOnes[j] === DEEP);
				}
				if(!any){
					done = activateMother("Coordinated Assault");
					if(done){
						done = activateFather("Coordinated Assault");
						if(done){
							done = activateDeepOnes();
							if(!done){
								z.deepOneContext = "Coordinated Assault";
							}
						}
					}
				} else {
					plainAlert("COORDINATED_ASSAULT_FAIL");
					NoSPToken("Coordinated Assault");
					done = false;
				}
				break;
			}
			case "E.O.T. Failure":
				if(z.travelTrack === 0){
					done = decreaseFuel();
				} else {
					retreatTravel();
				}
				break;
			case "Jail Break":
				done = decreaseSanity();
				if(done){
					let any = false;
					for(let j = 0; !(j>=z.playerLocations.length); j++){
						if(z.playerLocations[j] === "Brig"){
							any = true;
							addOption(j,"Move","Jail Break",true);
						}
					}
					if(any){
						done = false;
						boldAlert("JAIL_BREAK_FAIL");
					}
				}
				break;
			case "Ritual Coordination":
				if(decreaseSanity()){
					done = damageLocation("Chapel",undefined,"Mythos");
				}
				break;
			case "Open the Gate":
				if(decreaseSanity()){
					if(decreaseSouls()){
						done = damageShip("Collision Course");
						if(done){
							done = damageShip("Mythos");
						}
					}
				}
				break;
			case "Passenger Overboard":
			case "Flooding Compartment":
				decreaseSouls();
				break;
			case "Disturbing Dreams":
			case "Scary Stories":
				decreaseSanity(2);
				break;
			case "Lure of Y'ha-nthlei":
				done = riskFourPassengers("Lure of Y'ha-nthlei");
				break;
			case "Fear of the Unknown": 
				discardEntireHand(z.keeper);
				done = defeat(z.keeper,"Fear of the Unknown");
				passKeeper(d.keeperSuccession[getCharacter(z.players[z.keeper])]);
				break;
			case "The Father's Favor":
				done = activateFather("The Father's Favor 2");
				if(done){
					done = activateFather("The Father's Favor");
				}
				break;
			case "Hypnotic Melody":
				if(z.passengerSupply.length > 0){
					let medicalInterventionPlayer = -1;
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
							medicalInterventionPlayer = j;
							break;
						}
					}
					if(medicalInterventionPlayer >= 0){
						optionForAll("Defeat a Passenger in the supply","Hypnotic Melody",true);
						addOption(medicalInterventionPlayer,"Medical Intervention (passenger)","Hypnotic Melody",false);
						done = false;
					} else {
						done = defeatSupplyPassenger();
					}
				} else {
					decreaseSouls(2);
				}
				break;
			case "Damaged Evaporator":
				if(decreaseFood()){
					if(z.travelTrack > 0){
						retreatTravel();
					} else {
						decreaseFuel();
					}
				}
				break;
			case "Rat Infestation":
				decreaseFood(2);
				break;
			case "Looming Breakdown":
				if(decreaseSouls()){
					done = damageLocation("Boiler Room",undefined,"Mythos");
				}
				break;
			case "Hold the Line":
				for(let j = DECK; !(j>=INTERIOR) && done; j++){
					done = spawnDeepOne(j);
				}
				break;
			/* URULES: who is "you" if Edmund draws this with his reveal effect? */
			case "History Repeats": {
				let player = getPlayerNum("Keilani");
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				done = decreaseSouls();
				if(player !== z.captain){
					movePlayer(player,"Brig");
					removeFromAll("[Reveal] Discard a Skill Card");
					movePlayer(z.captain,"Brig");
				} else {
					movePlayer(z.captain,"Brig");
				}
				break;
			}
			case "The Peacemaker":
				for(let j = INTERIOR; done && !(j>=INTERIOR+6); j++){
					done = spawnDeepOne(j);
				}
				break;
			case "Do No Harm": {
				let player = getPlayerNum("Svetlana");
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				if(decreaseSanity()){
					if(z.spreadMisfortune){
						done = damageShip("Do No Harm Edmund");
					} else {
						done = damageShip("Do No Harm");
					}
					if(done){
						movePlayer(player,"Sick Bay");
					}
				}
				break;
			}
			case "Signs of Life":
				decreaseSouls(2);
				break;
			case "The Game is Afoot":
				
				
				if(z.spreadMisfortune){
					plainAlert("THE_GAME_IS_AFOOT_FAIL","Edmund");
				} else {
					plainAlert("THE_GAME_IS_AFOOT_FAIL","Jamie");
				}
				NoSPToken("The Game is Afoot");
				done = false;
				break;
			case "Memory of the Deep":
				if(decreaseSanity()){
					if(!z.spreadMisfortune){
						plainAlert("MEMORY_OF_THE_DEEP_PLACE");
						z.memoryOfTheDeep = true;
					} else {
						plainAlert("MEMORY_OF_THE_DEEP_SPREAD","Memory of the Deep");
					}
				}
				break;
			case "Miscalculation":
				if(z.travelTrack > 0){
					retreatTravel();
				} else {
					done = decreaseFuel();
				}
				if(done){
					if(z.travelTrack > 0){
						retreatTravel();
					} else {
						done = decreaseFuel();
					}
				}
				break;
			case "Gift of the Mother":
				done = defeat(getPlayerNum("Edmund"),"Gift of the Mother");
				if(itemPresent('"Lucky" Ring')){
					plainAlert("ITEM_IS_REMOVED",'"Lucky" Ring');
					let holder = itemHolder('"Lucky" Ring');
					for(let j = 0; !(j>=z.items[holder].length); j++){
						if(d.itemNames[z.items[holder][j]] === '"Lucky" Ring'){
							z.items[holder].splice(j,1);
							break;
						}
					}	
				}
				shuffleTreachery(6);
				break;
			case "Ticket, Please": {
				let player = getPlayerNum("Samira");
				if(z.spreadMisfortune){
					player = getPlayerNum("Edmund");
				}
				movePlayer(player,"Brig");
				if(z.items[player].length > 0){
					boldAlert("TICKET_PLEASE_ITEM_DUMP",z.players[player],getGender(player));
					z.items[player] = [];
					z.activeImprovements[player] = 0;
				}
				break;
			}
			default:
				error("ERROR: No Fail Result Found");
		}
		}
	}
	if(done && !z.gameOver){
		addAlert("DISCARD_SKILL_CHECK_CARDS");
		clearSkillCheck();
	}
}

function riskPassenger(context){
	/* URULES: if there is none in the supply, does the corresponding effect happen? */
	if(z.passengerSupply.length > 0){
		plainAlert("RISK_PASSENGER");
		NoSPToken("Risk passenger",context);
		return false;
	} else {
		plainAlert("NO_PASSENGERS_TO_RISK");
		return true;
	}
}

function riskTwoPassengers(context){
	if(z.passengerSupply.length >= 2){
		plainAlert("RISK_TWO_PASSENGERS");
		NoSPToken("Risk passenger");
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(context);
		return false;
	} else if (z.passengerSupply.length === 1){
		plainAlert("ONE_PASSENGER_ONLY");
		return riskPassenger(context);
	} else {
		plainAlert("NO_PASSENGERS_TO_RISK");
		return true;
	}
}

function riskThreePassengers(context){
	if(z.passengerSupply.length >=3){
		plainAlert("RISK_THREE_PASSENGERS");
		NoSPToken("Risk passenger");
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(undefined);
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(context);
		return false;
	} else if(z.passengerSupply.length === 2){
		plainAlert("N_PASSENGERS_ONLY",2);
		riskPassenger();
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(context);
		return false;
	} else if (z.passengerSupply.length === 1){
		plainAlert("ONE_PASSENGER_ONLY");
		return riskPassenger(context);
	} else {
		plainAlert("NO_PASSENGERS_TO_RISK");
		return true;
	}
}

function riskFourPassengers(context){
	if(z.passengerSupply.length >= 4){
		plainAlert("RISK_FOUR_PASSENGERS");
		NoSPToken("Risk passenger");
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(undefined);
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(undefined);
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(context);
		return false;
	} else if(z.passengerSupply.length === 3){
		plainAlert("N_PASSENGERS_ONLY",3);
		riskPassenger();
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(undefined);
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(context);
		return false;
	} else if(z.passengerSupply.length === 2){
		plainAlert("N_PASSENGERS_ONLY",2);
		riskPassenger();
		z.dieRollQueue.push("Risk passenger");
		z.dieRollParams.push(context);
		return false;
	} else if (z.passengerSupply.length === 1){
		plainAlert("ONE_PASSENGER_ONLY");
		riskPassenger(context);
		return false;
	} else {
		plainAlert("NO_PASSENGERS_TO_RISK");
		return true;
	}
}


/* TODO: activation symbols!*/
function postSeed() {
	let re = new RegExp(/(\[c\])?\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|TMR) seed: (\S+)\[\/color\]\[\/size\](\[\/c\])?/, "g");
	let seed2 = re.exec(t.value);
	if(seed2 !== null) {
		seed2 = seed2[5];
		seed2 = window.atob(seed2.replace(/-/g, ""));
	}
	if(seed2 !== seed) {
		addAlert("Possible double-post prevented; you should probably run TMR again to make sure your play processed correctly.");
		t.value += bold(colorText("red", "Possible double-post prevented; you should run TMR again to make sure your play processed correctly.")) + "\r\n";
		return;
	}
	let banner = z.banners[me];

	let bannerRegExp = new RegExp("\\[ima" + "geid=" + banner + " medium\\]", "g");
	let dumbRe = new RegExp('\\[co' + 'lor=red\\]\\[b' + "\\]This post did not process properly\\.  Please try again\\.\\[/" + "b\\]\\[/co" + "lor\\]", "g");
	let clearRegExp = new RegExp("(\\[clear\\])+", "g");
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let text0 = "";
	while(splitted.length > 0) {
		text0 += splitted.shift() + "-";
	}
	t.value = "[ima" +  "geid=" + banner + " medium]" + clear() + code(size(invisible("TMR seed: " + text0), 1)) + clear() + t.value.replace(bannerRegExp, "")
		.replace(re, "").replace(dumbRe, "").replace(clearRegExp, clear());
	if(arguments.length === 0) {
		clearSpoilers();
	}
	clearQuotes();
	try{
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});

		t.dispatchEvent(evt);
	} catch(err){}
}


function textGameState(images) {
	let report = '[q' +  '="TMR: Game State"]';

	if(z.gameSetup2){
		report += size(bold(italics(lc("Game Setup"))), 14) + "\r\n\r\n";
	} else {
		report += size(bold(italics(lc("Turn")+ " " + z.round + "." + (z.turn + 1) + ": " + lc("CURRENT_PLAYER",titleList(z.turn) + z.players[z.turn]))), 14) + "\r\n\r\n";
	}

	let distanceReport = imageO(6347288);
	if(z.waypointDiscards.length !== 1) {
		distanceReport += "\r\n" + bold(size(z.distance, 10));
	}
	for(let j = 0; !(j >= z.waypointDiscards.length); j++) {

		switch (getDistance(z.waypointDiscards[j])) {
			case 2:
				distanceReport += "\r\n" + imageO(6347353);
				break;
			case 3:
				distanceReport += "\r\n" + imageO(6347355);
				break;
			case 4:
				distanceReport += "\r\n" + imageO(6347356);
				break;
		}
	}
	
	

	let fuelImage = imageO(6413059);
	let foodImage = imageO(6413057);
	/*if(!z.damageDeck.includes(6)){
		fuelImage = imageO(6413060);
	}
	if(!z.damageDeck.includes(7)){
		foodImage = imageO(6413058);
	}*/
	let resourcesReport = fuelImage + "\r\n";
	if(z.fuel > 4) {
		resourcesReport += bold(size(z.fuel, 10));
	} else {
		resourcesReport += bold(colorText("red", size(z.fuel, 10)));
	}
	resourcesReport += "\r\n" + foodImage + "\r\n";
	if(z.food > 4) {
		resourcesReport += bold(size(z.food, 10));
	} else {
		resourcesReport += bold(colorText("red", size(z.food, 10)));
	}
	resourcesReport += "\r\n" + imageO(6413088) + "\r\n";
	if(z.sanity > 4) {
		resourcesReport += bold(size(z.sanity, 10));
	} else {
		resourcesReport += bold(colorText("red", size(z.sanity, 10)));
	}
	resourcesReport += "\r\n" + imageO(6413215) + "\r\n";
	if(z.souls > 4) {
		resourcesReport += bold(size(z.souls, 10));
	} else {
		resourcesReport += bold(colorText("red", size(z.souls, 10)));
	}
	
	


	let deepReport = "";
	let deepDeepOnes = deepOnesInSpace(DEEP);
	if(deepDeepOnes > 0){
		deepReport += deepOneImage(DEEP);
	}
	if(z.mother === DEEP){
		deepReport += motherImage();
	}
	if(z.father === DEEP){
		deepReport += fatherImage();
	}
	let viperReport = "";
	let sickbayReport = "";
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === "Sick Bay"){
			sickbayReport += playerImage(j);
		}
	}
	if(sickbayReport){
		viperReport += center(imageO(6433513))+center(sickbayReport);
	}
	let brigReport = "";
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === "Brig"){
			brigReport += playerImage(j);
		}
	}
	if(brigReport){
		viperReport += center(imageO(6433512))+center(brigReport);
	}
	viperReport += center(imageO(6347389)) + center(deepReport);
	
	/*
	if(z.defeatedPassengers.length > 0) {
		let deadCivReport = imageO(3771660);
		let pop1 = 0;
		let decoy = 0;
		for(let j = 0; !(j >= z.defeatedPassengers.length); j++) {
			if(z.defeatedPassengers[j] === "1 Soul") {
				pop1++;
			} else if(z.defeatedPassengers[j] === "2 Souls") {
				deadCivReport += "\r\n" + imageO(6413080);
			} else if(z.defeatedPassengers[j] === "Decoy") {
				decoy++;
			} else if(z.defeatedPassengers[j] === "1 Soul + 1 Sanity") {
				deadCivReport += "\r\n" + imageO(6413081);
			}
		}
		if(pop1 === 1) {
			deadCivReport += "\r\n" + imageO(6413079);
		} else if(pop1 > 1) {
			deadCivReport += "\r\n" + imageO(6413079) + "\r\n" + size(bold("x" + pop1), 8);
		}
		if(decoy === 1) {
			deadCivReport += "\r\n" + imageO(6413078);
		} else if(decoy > 1) {
			deadCivReport += "\r\n" + imageO(6413078) + "\r\n" + size(bold("x" + decoy), 8);
		}
		report += floatleft(center(deadCivReport));
	}*/
	let tracksReport = "";
	if(z.travelTrack === 0){
		tracksReport += imageO(6413220);
	} else if(z.travelTrack === 1){
		tracksReport += imageO(6413221);
	} else if(z.travelTrack === 2){
		tracksReport += imageO(6413222);
	} else if(z.travelTrack === 3){
		tracksReport += imageO(6413223);
	} else if(z.travelTrack === 4){
		tracksReport += imageO(6413224);
	}
	tracksReport += "\r\n";
	if(z.ritualTrack === 0){
		tracksReport += imageO(6413082);
	} else if(z.ritualTrack === 1){
		tracksReport += imageO(6413083);
	} else if(z.ritualTrack === 2){
		tracksReport += imageO(6413084);
	} else if(z.ritualTrack === 3){
		tracksReport += imageO(6413085);
	}
	if(z.horror === 0){
		tracksReport += "\r\n"+imageO(8326717);
	} else if(z.horror === 1){
		tracksReport += "\r\n"+imageO(8326718);
	} else if(z.horror === 2){
		tracksReport += "\r\n"+imageO(8326719);
	}
	if(z.respite){
		tracksReport += "\r\n"+imageO(8326738);
	}
	if(z.barricadeActive){
		tracksReport += "\r\n"+imageO(8326739);
	}
	viperReport += "\r\n"+center(resourcesReport);
	tracksReport += "\r\n"+distanceReport;
	report += floatleft(viperReport);
	report += floatleft(boardImage());
	report += floatleft(center(tracksReport));
	
	report += clear();
	report += "[h"+"r]";
	if(images) {
		if(z.skillCardDecks[INFLUENCE].length+z.skillCardDiscards[INFLUENCE].length > 0){
			report += floatleft(center(imageO(6413061) + "\r\n" + size(bold(colorText("orange", z.skillCardDecks[INFLUENCE].length)), 8)));
		} else {
			report += floatleft(center(imageO(6413061) + "\r\n" + size(bold(colorText("orange", "NONE")), 8)));
		}
		if(z.skillCardDecks[LORE].length+z.skillCardDiscards[LORE].length > 0){
			report += floatleft(center(imageO(6413073) + "\r\n" + size(bold(colorText("purple", z.skillCardDecks[LORE].length)), 8)));
		} else {
			report += floatleft(center(imageO(6413073) + "\r\n" + size(bold(colorText("purple", "NONE")), 8)));
		}
		if(z.skillCardDecks[OBSERVATION].length+z.skillCardDiscards[OBSERVATION].length > 0){
			report += floatleft(center(imageO(6413075) + "\r\n" + size(bold(colorText("green", z.skillCardDecks[OBSERVATION].length)), 8)));
		} else {
			report += floatleft(center(imageO(6413075) + "\r\n" + size(bold(colorText("green", "NONE")), 8)));
		}
		if(z.skillCardDecks[STRENGTH].length+z.skillCardDiscards[STRENGTH].length > 0){
			report += floatleft(center(imageO(6413217) + "\r\n" + size(bold(colorText("red", z.skillCardDecks[STRENGTH].length)), 8)));
		} else {
			report += floatleft(center(imageO(6413217) + "\r\n" + size(bold(colorText("red", "NONE")), 8)));
		}
		if(z.skillCardDecks[WILL].length+z.skillCardDiscards[WILL].length > 0){
			report += floatleft(center(imageO(6413228) + "\r\n" + size(bold(colorText("blue", z.skillCardDecks[WILL].length)), 8)));
		} else {
			report += floatleft(center(imageO(6413228) + "\r\n" + size(bold(colorText("blue", "NONE")), 8)));
		}
		if(z.skillCardDecks[TREACHERY].length+z.skillCardDiscards[TREACHERY].length > 0){
			report += floatleft(center(imageO(6413226) + "\r\n" + size(bold(colorText("brown", z.skillCardDecks[TREACHERY].length)), 8)));
		} else {
			report += floatleft(center(imageO(6413226) + "\r\n" + size(bold(colorText("brown", "NONE")), 8)));
		}
		if(z.fromTheAbyss){
			if(z.skillCardDecks[BOON].length+z.skillCardDiscards[BOON].length > 0){
				report += floatleft(center(imageO(8329141) + "\r\n" + size(bold(colorText("teal", z.skillCardDecks[BOON].length)), 8)));
			} else {
				report += floatleft(center(imageO(8329141) + "\r\n" + size(bold(colorText("teal", "NONE")), 8)));
			}
		}
		report += floatleft(center(imageO(6347997) + "\r\n" + size(bold(z.chaos.length), 8)));
		report += floatleft(center(imageO(6409310) + "\r\n" + size(bold(z.mythosDeck.length), 8)));
		report += floatleft(center(imageO(6413225) + "\r\n" + size(bold(z.waypointDeck.length), 8)));
		report += floatleft(center(imageO(6413216) + "\r\n" + size(bold(z.spellDeck.length), 8)));
		report += floatleft(center(imageO(6413064) + "\r\n" + size(bold(z.itemDeck.length), 8)));
		report += floatleft(center(imageO(6413028) + "\r\n" + size(bold(z.damageDeck.length), 8)));
		if(z.fromTheAbyss){
			report += floatleft(center(imageO(8323156) + "\r\n" + size(bold(z.allyDeck.length), 8)));
		}
		report += floatleft(center(imageO(6433479) + "\r\n" + size(bold(z.passengerSupply.length), 8)));
		if(z.loyaltyDeck.length > 0) {
			report += floatleft(center(imageO(6348000) + "\r\n" + size(bold(z.loyaltyDeck.length), 8)));
		}
		report += floatleft(center(imageO(6435354)+"\r\n"+size(bold(deepOnesReserves()),8)));
		report += clear();
	}
	if(images) {
		/*var turnReport = "";		for(let j = 0; !(j>=z.numPlayers); j++){			turnReport+="\r\n"+inv();			if(j===z.turn){				turnReport+=imageO(3772029);			} else {				turnReport+=vspacer();			}			turnReport+=inv();		}		report+=floatleft(center(turnReport.slice(2)));*/
		let titleReport = "";
		for(let j = 0; !(j >= z.numPlayers); j++) {
			titleReport += "\r\n" + inv();
			let anything = false;
			if(j === z.captain) {
				titleReport += imageO(6413026);
				anything = true;
			}
			if(j === z.keeper) {
				titleReport += imageO(6413069);
				anything = true;
			}
			if(isRevealedCultist(j)){
				titleReport += imageO(6413027);
				anything = true;
			}
 			
			if(!anything) {
				titleReport += vspacer();
			}
			titleReport += inv();
		}

		report += floatleft(center(titleReport.slice(2)));
		let skillsReport = "";
		for(let j = 0; !(j >= z.numPlayers); j++) {
			skillsReport += "\r\n" + imageO(6347999) + bold(z.skillCardHands[j].length);
		}
		report += floatleft(skillsReport.slice(2));
		let nameReport = "";
		for(let j = 0; !(j >= z.numPlayers); j++) {
			nameReport += "\r\n" + inv() + nametag(j) + locationtag(j) + inv();
		}
		if(z.fromTheAbyss){
			for(let j = 0; !(j>=z.allies.length); j++){
				nameReport += "\r\n" + inv() + allyTag(z.allies[j][0]) + goodLocationTag(z.allies[j][1]) + inv();
			}
			if(z.shoggoth){
				nameReport += "\r\n" + inv() + imageO(8326772) + badLocationTag(d.spaceNames[z.shoggoth]) + inv();
			}
			if(z.drownedSpirit){
				nameReport += "\r\n" + inv() + imageO(8326773) + goodLocationTag(d.spaceNames[z.drownedSpirit]) + inv();
			}
			if(z.graspingTendril){
				nameReport += "\r\n" + inv() + imageO(8326774) + goodLocationTag(d.spaceNames[z.graspingTendril+8]) + inv();
			}
		}
		report += floatleft(center(nameReport.slice(2)));
		let miscReport = "";
		for(let j = 0; !(j >= z.numPlayers); j++) {
			/* UTODO: Feat deck back */
			miscReport += "\r\n";
			let hasOwnFeat = false;
			for(let k = 0; !(k>=z.feats[j].length); k++){
				if(z.feats[j][k] === d.featNames[getCharacter(z.players[j])]){
					hasOwnFeat = true;
					break;
				}
			}
			if(hasOwnFeat){
				miscReport += imageO(3772024);
			} else {
				miscReport += imageO(3772626);
			}
			
			if(z.loyaltyHands[j].length > 0) {
				miscReport += inv() + imageO(6348001);
				if(z.loyaltyHands[j].length > 1) {
					miscReport += bold(z.loyaltyHands[j].length);
				}
			
			}
			if(z.fromTheAbyss && z.characterMythos[j] !== -1){
				miscReport += inv() + imageO(6409309);
			}
			/* UTODO: think about better item display */

			let firstItem = true;
			miscReport += " ";
			for(let k = 0; !(k>=z.feats[j].length); k++){
				if(z.feats[j][k] !== d.featNames[getCharacter(z.players[j])]){
					miscReport += lc(z.feats[j][k]);
					firstItem = false;
				}
			}
			let inactiveImprovements = 0;
			for(let k = 0; !(k>=z.items[j].length); k++){
				
				
				if(isImprovement(z.items[j][k])){
					/* we show the valise improvement anyway */
					if(z.items[j][k] === z.activeImprovements[j] || (itemHolder("Valise") === j && z.items[j][k] === z.valiseImprovement)){
						let color = colorIDcolor(z.items[j][k]-FINE_CLOTHES);
						if(!firstItem){
							miscReport += ", ";
						}
						miscReport += colorText(color,lc(d.itemNames[z.items[j][k]]));
						firstItem = false;
					} else {
						inactiveImprovements++;
					}
				} else {
					if(!firstItem){
						miscReport += ", ";
					}
					firstItem = false;
					if(d.itemNames[z.items[j][k]] === "Cursed Mask"){
						miscReport += lc(colorText(colorIDcolor(TREACHERY),lc("Cursed Mask")));
					} else {
						miscReport += lc(d.itemNames[z.items[j][k]]);
					}
				}
			}
			if(inactiveImprovements > 0){
				if(!firstItem){
					miscReport += ", ";
				}
				miscReport += inv() + imageO(8329175);
				if(inactiveImprovements > 1){
					miscReport += bold(inactiveImprovements);
				}
			}

			if(j === z.sacrifice){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Sacrifice Deep One");
			}
			if(j === z.barricade){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Barricade the Hatches");
			}
			if(z.thePeacemaker && z.players[j] === "Arjun"){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("The Peacemaker");
			}
			if(z.memoryOfTheDeep && z.players[j] === "William"){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Memory of the Deep");
			}
			if(z.familyTies && z.players[j] === "Ishmael"){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Family Ties");
			}
			if(z.fleshWard === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Flesh Ward");
			}
			if(z.revelation === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Revelation of Script");
			}
			if(z.blessing === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += colorText(colorIDcolor(BOON),lc("Blessing"));
			}
			if(z.temporalBarrier === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Temporal Barrier");
			}
			if(z.temporalDiscovery === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Temporal Discovery");
			}
			if(z.uncannyLuck === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Uncanny Luck");
			}
			if(z.rumors && z.players[j] === "Ida"){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Rumors");
			}
			if(z.cursedWhispers === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Cursed Whispers");
			}
			if(z.senseOfPropriety === j){
				if(!firstItem){
					miscReport += ", ";
				}
				firstItem = false;
				miscReport += lc("Sense of Propriety");
			}
			if(z.players[j] === "Guillaume" || z.ersatzGuillaume === j){
				for(let k = 0; !(k>=z.guillaumeAllies.length); k++){
					if(!firstItem){
						miscReport += ", ";
					} else {
						firstItem = false;
					}
					miscReport += lc(d.allyNames[z.guillaumeAllies[k]]);
				}
			}

		}
		report += floatleft(miscReport.slice(2)) + clear();
	}
	
	report += "[/" + "q]";
	t.value += report;
} /* TODO: add new player's banner at start of their turn? */
function imageO(id) {
	return "[ima" +  "geid=" + id + " original inline]";
}
function imageM(id) {
	return "[ima" + "geid=" + id + " medium inline]";
}


function vspacer() {
	return imageO(3772031);
}

function motherImage(space){
	if(space === undefined || z.mother === space){
		return imageO(6433472);
	} else {
		return blankImage();
	}
	
}

function fatherImage(space){
	if(space === undefined || z.father === space){
		return imageO(6433469);
	} else {
		return blankImage();
	}
}

function deepOneImage(n) {
	
	switch(deepOnesInSpace(n)){
		case 1:
		return imageO(6435354);
		case 2:
		return imageO(6435355);
		case 3:
		return imageO(6435356);
		case 4:
		return imageO(6435357);
		case 5:
		return imageO(6435358);
		case 6:
		return imageO(6435359);
		case 7:
		return imageO(6435360);
		case 8:
		return imageO(6435361);
		case 9:
		return imageO(6435362);
		case 10:
		return imageO(6435363);
		case 11:
		return imageO(6435364);
		case 12:
		return imageO(6435365);
		case 13:
		return imageO(6435366);
		case 14:
		return imageO(6435367);
		case 15:
		return imageO(6435368);
		case 16:
		return imageO(6435372);
		case 17:
		return imageO(6435374);
		case 18:
		return imageO(6435377);
		case 19:
		return imageO(6435379);
		case 20:
		return imageO(6435381);
		default:
		return blankImage();
	}
}


/* UTODO: this */
function dieRollImage() {
	let r = "";
	switch (z.lastDieRollModifier) {
		case -3:
			r = imageO(3807729);
			break;
		case -2:
			r = imageO(3807730);
			break;
		case -1:
			r = imageO(3807731);
			break;
		case 1:
			r = imageO(3807732);
			break;
		case 2:
			r = imageO(3807733);
			break;
		case 3:
			r = imageO(3807734);
			break;
		case 4:
			r = imageO(3807735);
			break;
		case 5:
			r = imageO(3807736);
			break;
		case 0:
			break;
		default:
			r = "+" + z.lastDieRollModifier + "=";
	}
	if(z.lastDieRollModifier !== 0) {
		if(z.lastDieRollValue + z.lastDieRollModifier >= 8) {
			r += imageO(3789084);
		} else if(1 >= z.lastDieRollValue + z.lastDieRollModifier) {
			r += imageO(3789064);
		} else {
			switch (z.lastDieRollValue + z.lastDieRollModifier) {
				case 2:
					r += imageO(3789070);
					break;
				case 3:
					r += imageO(3789073);
					break;
				case 4:
					r += imageO(3789077);
					break;
				case 5:
					r += imageO(3789080);
					break;
				case 6:
					r += imageO(3789081);
					break;
				case 7:
					r += imageO(3789096);
					break;
			}
		}
	}
	switch (z.lastDieRollValue) {
		case 1:
			return imageO(3789064) + r;
		case 2:
			return imageO(3789070) + r;
		case 3:
			return imageO(3789073) + r;
		case 4:
			return imageO(3789077) + r;
		case 5:
			return imageO(3789080) + r;
		case 6:
			return imageO(3789081) + r;
		case 7:
			return imageO(3789096) + r;
		case 8:
			return imageO(3789084) + r;
		default:
			return r;
	}
}




function damageImage(index) {
	switch(z.damage[index-INTERIOR]){
		case INFLUENCE:
		return imageO(6434183);
		case LORE:
		return imageO(6434184);
		case OBSERVATION:
		return imageO(6434185);
		case STRENGTH:
		return imageO(6434186);
		case WILL:
		return imageO(6434187);
		case TREACHERY:
		return imageO(6434188);
		default:
		return imageO(8329429);
		
	}
}

function goodLocationTag(loc){
	switch (loc) {
	case "Bridge":
		return imageO(3772324);
	case "Brig":
		return imageO(4644597);
	case "Captain's Cabin":
		return imageO(3772328);
	case "Chapel":
		return imageO(6348066);
	case "Cargo Hold":
		return imageO(6348071);
	case "Galley":
		return imageO(6348073);
	case "Boiler Room":
		return imageO(6348074);
	case "Sick Bay":
		return imageO(6348075);
	case "Deck Space 1":
		return imageO(6348076);
	case "Deck Space 2":
		return imageO(6348077);
	case "Deck Space 3":
		return imageO(6348079);
	case "Deck Space 4":
		return imageO(6348080);
	case "Deck Space 5":
		return imageO(6348081);
	case "Deck Space 6":
		return imageO(6348083);
	case "Deck Space 7":
		return imageO(6348084);
	case "Deck Space 8":
		return imageO(6348089);
	}
}

function badLocationTag(loc){
	switch(loc){
	case "Bridge":
		return imageO(6348100);
	case "Brig":
		return imageO(6348101);
	case "Captain's Cabin":
		return imageO(6348102);
	case "Chapel":
		return imageO(6348107);
	case "Cargo Hold":
		return imageO(6348108);
	case "Galley":
		return imageO(6348109);
	case "Boiler Room":
		return imageO(6348110);
	case "Sick Bay":
		return imageO(6348111);
	case "Deck Space 1":
		return imageO(6348112);
	case "Deck Space 2":
		return imageO(6348113);
	case "Deck Space 3":
		return imageO(6348114);
	case "Deck Space 4":
		return imageO(6348115);
	case "Deck Space 5":
		return imageO(6348117);
	case "Deck Space 6":
		return imageO(6348118);
	case "Deck Space 7":
		return imageO(6348119);
	case "Deck Space 8":
		return imageO(6348120);
	case "Water Space 1":
		return imageO(8326778);
	case "Water Space 2":
		return imageO(8326779);
	case "Water Space 3":
		return imageO(8326780);
	case "Water Space 4":
		return imageO(8326781);
	case "Water Space 5":
		return imageO(8326783);
	case "Water Space 6":
		return imageO(8326784);
	case "Water Space 7":
		return imageO(8326786);
	case "Water Space 8":
		return imageO(8326787);
		
	}
}


function locationtag(player) {
	let loc = z.playerLocations[player];
	if(z.revealedHybrids[player] === 0){		
		return goodLocationTag(loc);
	} else {
		return badLocationTag(loc);
	}
}



function nametag(player) {
	let name = z.players[player];
	if(player !== z.turn) {
		/* UTODO: BSG localization of these images */
		switch (name) {
			case "Keilani":
				return imageO(6348009);
			case "Arjun":
				return imageO(6348010);
			case "Svetlana":
				return imageO(6348011);
			case "Jeanne":
				return imageO(6348012);
			case "Jamie":
				return imageO(6348014);
			case "William":
				return imageO(6348015);
			case "Beatrice":
				return imageO(6348016);
			case "Ishmael":
				return imageO(6348017);
			case "Edmund":
				return imageO(6348018);
			case "Samira":
				return imageO(6348019);
			case "Antar":
				return imageO(8323164);
			case "Avery":
				return imageO(8323165);
			case "Guillaume":
				return imageO(8323166);
			case "Ida":
				return imageO(8323167);
			case "Kokoj":
				return imageO(8323168);
			case "Raúl":
				return imageO(8323169);
			case "Sardaana":
				return imageO(8323170);
			case "Mui Choo":
				return imageO(8323171);
		}
	} else {
		switch (name) {
			case "Keilani":
				return imageO(6348021);
			case "Arjun":
				return imageO(6348022);
			case "Svetlana":
				return imageO(6348023);
			case "Jeanne":
				return imageO(6348024);
			case "Jamie":
				return imageO(6348025);
			case "William":
				return imageO(6348030);
			case "Beatrice":
				return imageO(6348032);
			case "Ishmael":
				return imageO(6348033);
			case "Edmund":
				return imageO(6348034);
			case "Samira":
				return imageO(6348035);
			case "Antar":
				return imageO(8323172);
			case "Avery":
				return imageO(8323173);
			case "Guillaume":
				return imageO(8323175);
			case "Ida":
				return imageO(8323176);
			case "Kokoj":
				return imageO(8323177);
			case "Raúl":
				return imageO(8323178);
			case "Sardaana":
				return imageO(8323179);
			case "Mui Choo":
				return imageO(8323180);
		}
	}
	return z.players[player];
}

function blankImage(){
	return imageO(6432956);
}


function deepOnesInSpace(index){
	let count = 0;
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(z.deepOnes[j] === index){
			count++;
		}
	}
	return count;
}




function passengerImage(index){
	let n = 1;
	if(index){
		n = z.spacePassengers[index].length;
	}
	switch(n){
		case 1:
		return imageO(6433479);
		case 2:
		return imageO(6433480);
		case 3:
		return imageO(6433481);
		case 4:
		return imageO(6433482);
		case 5:
		return imageO(6433483);
		case 6:
		return imageO(6433484);
		case 7:
		return imageO(6433485);
		case 8:
		return imageO(6433486);
		case 9:
		return imageO(6433487);
		default:
		return blankImage();
	}
}

function allyImage(ally){
	switch(ally){
		case ABLE_SEAMAN:
		return imageO(8323360);
		case CADET:
		return imageO(8323362);
		case CONSPIRACY_THEORIST:
		return imageO(8323363);
		case FORTUNE_TELLER:
		return imageO(8323364);
		case GAMBLER:
		return imageO(8323366);
		case HOST:
		return imageO(8323367);
		case MECHANIC:
		return imageO(8323369);
		case PROFESSOR:
		return imageO(8323370);
		case QUARTERMASTER:
		return imageO(8323371);
		case RUFFIAN:
		return imageO(8323373);
		case SECURITY_OFFICER:
		return imageO(8323374);
		case SOLDIER:
		return imageO(8323375);
	}
}

function allyTag(ally){
	switch(ally){
		case ABLE_SEAMAN:
		return imageO(8326753);
		case CADET:
		return imageO(8326754);
		case CONSPIRACY_THEORIST:
		return imageO(8326756);
		case FORTUNE_TELLER:
		return imageO(8326757);
		case GAMBLER:
		return imageO(8326758);
		case HOST:
		return imageO(8326760);
		case MECHANIC:
		return imageO(8326764);
		case PROFESSOR:
		return imageO(8326766);
		case QUARTERMASTER:
		return imageO(8326767);
		case RUFFIAN:
		return imageO(8326768);
		case SECURITY_OFFICER:
		return imageO(8326770);
		case SOLDIER:
		return imageO(8326771);
	}
}

function playerImage(k){
	if(z.revealedHybrids[k]){
		switch(z.players[k]){
			case "Arjun":
				return imageO(6433419);
			case "Beatrice":
				return imageO(6433421);
			case "Edmund":
				return imageO(6433424);
			case "Ishmael":
				return imageO(6433427);
			case "Jamie":
				return imageO(6433429);
			case "Jeanne":
				return imageO(6433431);
			case "Keilani":
				return imageO(6433433);
			case "Samira":
				return imageO(6433437);
			case "Svetlana":
				return imageO(6433439);
			case "William":
				return imageO(6433442);
			case "Antar":
				return imageO(8323820);
			case "Avery":
				return imageO(8323821);
			case "Guillaume":
				return imageO(8323823);
			case "Ida":
				return imageO(8323824);
			case "Kokoj":
				return imageO(8323825);
			case "Raúl":
				return imageO(8323826);
			case "Sardaana":
				return imageO(8323827);
			case "Mui Choo":
				return imageO(8323830);
		}
	} else {
		switch(z.players[k]){
			case "Arjun":
				return imageO(6434150);
			case "Beatrice":
				return imageO(6434154);
			case "Edmund":
				return imageO(6434167);
			case "Ishmael":
				return imageO(6434169);
			case "Jamie":
				return imageO(6434171);
			case "Jeanne":
				return imageO(6434173);
			case "Keilani":
				return imageO(6434175);
			case "Samira":
				return imageO(6434177);
			case "Svetlana":
				return imageO(6434179);
			case "William":
				return imageO(6434181);
			case "Antar":
				return imageO(8323810);
			case "Avery":
				return imageO(8323811);
			case "Guillaume":
				return imageO(8323812);
			case "Ida":
				return imageO(8323813);
			case "Kokoj":
				return imageO(8323814);
			case "Raúl":
				return imageO(8323815);
			case "Sardaana":
				return imageO(8323816);
			case "Mui Choo":
				return imageO(8323818);
		}
	}
}

function shoggothImage(index){
	if(index === z.shoggoth || index === undefined){
		return imageO(8326654);
	}
	return blankImage();
	
}

function drownedSpiritImage(index){
	if(index === z.drownedSpirit || index === undefined){
		return imageO(8326655);
	}
	return blankImage();
}

function graspingTendrilImage(index){
	if(index === z.graspingTendril || index === z.graspingTendril + 8 || index === undefined){
		return imageO(8326656);
	}
	return blankImage();
}

function waterImage(index,num){
	index += WATER;
	if(index - WATER === 0 || index - WATER === 1){
		switch(num){
			case 1:
				return passengerImage(index);
			case 2:
				return shoggothImage(index);
			case 3:
				return graspingTendrilImage(index);
			case 4:
				return motherImage(index);
			case 5:
				return drownedSpiritImage(index);
			case 6:
				return deepOneImage(index);
			case 7:
				return fatherImage(index);
		}
	} else if (index - WATER === 6 || index - WATER === 7){
		let avail = [1,2,3,4,5];
		if(deepOnesInSpace(index)){
			avail.splice(avail.indexOf(5),1);
			if(num === 5){
				return deepOneImage(index);
			}
		}
		if(index === z.mother){
			avail.splice(avail.indexOf(2),1);
			if(num === 2){
				return motherImage(index);
			}
		}
		if(index === z.father){
			avail.splice(avail.indexOf(4),1);
			if(num === 4){
				return fatherImage(index);
			}
		}
		if(z.spacePassengers[index].length > 0){
			avail.splice(avail.indexOf(3),1);
			if(num === 3){
				return passengerImage(index);
			}
		}
		let horrors = [];
		if(z.shoggoth === index){
			horrors.push("Shoggoth");
		}
		if(z.drownedSpirit === index){
			horrors.push("Drowned Spirit");
		}
		if(z.graspingTendril === index){
			horrors.push("Grasping Tendril");
		}
		if(avail.length >= horrors.length){
			while(horrors.length > 0){
				let a = avail.pop();
				let h = horrors.pop();
				if(num === a){
					if(h === "Shoggoth"){
						return shoggothImage();
					} else if (h === "Drowned Spirit"){
						return drownedSpiritImage();
					} else {
						return graspingTendrilImage();
					}
				}
			}
		} else {
			if(num === avail[avail.length-1]){
				if(horrors.length === 2){
					return imageO(8326563);
				} else {
					return imageO(8326564);
				}
			}
		}
		
	} else {
		let avail = [1,2,3,4];
		if(deepOnesInSpace(index)){
			avail.splice(avail.indexOf(2),1);
			if(num === 2){
				return deepOneImage(index);
			}
		}
		if(index === z.mother){
			avail.splice(avail.indexOf(4),1);
			if(num === 4){
				return motherImage(index);
			}
		}
		if(index === z.father){
			avail.splice(avail.indexOf(3),1);
			if(num === 3){
				return fatherImage(index);
			}
		}
		if(z.spacePassengers[index].length > 0){
			avail.splice(avail.indexOf(1),1);
			if(num === 1){
				return passengerImage(index);
			}
		}
		let horrors = [];
		if(z.shoggoth === index){
			horrors.push("Shoggoth");
		}
		if(z.drownedSpirit === index){
			horrors.push("Drowned Spirit");
		}
		if(z.graspingTendril === index){
			horrors.push("Grasping Tendril");
		}
		if(avail.length >= horrors.length){
			while(horrors.length > 0){
				let a = avail.pop();
				let h = horrors.pop();
				if(num === a){
					if(h === "Shoggoth"){
						return shoggothImage();
					} else if (h === "Drowned Spirit"){
						return drownedSpiritImage();
					} else {
						return graspingTendrilImage();
					}
				}
			}
		} else if(avail.length > 0){
			if(num === avail[avail.length-1]){
				if(horrors.length === 1){
					let h = horrors[0];
					if(h === "Shoggoth"){
						return shoggothImage();
					} else if (h === "Drowned Spirit"){
						return drownedSpiritImage();
					} else {
						return graspingTendrilImage();
					}
				} else if(horrors.length === 2){
					return imageO(8326563);
				} else {
					return imageO(8326564);
				}
			}
		}
	}
	return blankImage();
}

function spaceImage(index,num){
	let deepOnes = 0;
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(z.deepOnes[j] === index){
			deepOnes = 1;
			break;
		}
	}
	let passengers = 0;
	if(z.spacePassengers[index].length > 0){
		passengers = 1;
	}
	let damage = 0;
	if(index >= INTERIOR && INTERIOR + 6 > index && z.damage[index-INTERIOR] >= 0){
		damage = 1;
	}
	let humans = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === d.spaceNames[index] && !z.revealedHybrids[j]){
			humans++;
		}
	}
	let traitors = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === d.spaceNames[index] && z.revealedHybrids[j]){
			traitors++;
		}
	}
	let allies = 0;
	for(let j = 0; z.fromTheAbyss && !(j>=z.allies.length); j++){
		if(z.allies[j][1] === d.spaceNames[index]){
			allies++;
		}
	}
	let horrors = 0;
	if(z.shoggoth === index){
		horrors++;
	}
	if(z.drownedSpirit === index){
		horrors++;
	}
	if(z.graspingTendril === index || z.graspingTendril + 8 === index){
		horrors++;
	}
	let deepOneNum = 0;
	let humanNum = 1;
	let otherNum = 2;
	let traitorNum = 3;
	switch(index){
		case DECK+2:
		case DECK+3:
		case DECK+4:
		case DECK+5:
			deepOneNum = 1;
			humanNum = 2;
			otherNum = 3;
			traitorNum = 0;
			break;
		case CAPTAINS_CABIN:
		case CHAPEL:
		case GALLEY:
		case CARGO_HOLD:
			deepOneNum = 2;
			humanNum = 1;
			otherNum = 0;
			traitorNum = 3;
			break;
		case BOILER_ROOM:
			otherNum = 1;
			traitorNum = 3;
			deepOneNum = 2;
			humanNum = 0;
			break;
		case DECK+6:
		case DECK+7:
			deepOneNum = 3;
			humanNum = 2;
			otherNum = 1;
			traitorNum = 0;
			break;
	}
	let results = ["","","",""];
	let empty = 4;
	if(deepOnes){
		results[deepOneNum] = "Deep Ones";
		empty--;
	}
	if(damage){
		results[otherNum] = "Damage";
		empty--;
	}
	if(passengers){
		results[otherNum] = "Passenger";
		empty--;
	}
	if(empty >= humans + traitors + allies + horrors){
		if(humans > 0){
			results[humanNum] = "Human 1";
		}
		if(traitors > 0){
			results[traitorNum] = "Traitor 1";
		}
		let k = 2;
		for(let j = 0; !(j>=4) && humans >= k; j++){
			if(results[j] === ""){
				results[j] = "Human "+k;
				k++;
			}
		}
		k = 2;
		for(let j = 0; !(j>=4) && traitors >= k; j++){
			if(results[j] === ""){
				results[j] = "Traitor "+k;
				k++;
			}
		}
		k = 1;
		for(let j = 0; !(j>=4) && horrors >= k; j++){
			if(results[j] === ""){
				results[j] = "Horror "+k;
				k++;
			}
		}
		k = 1;
		for(let j = 0; !(j>=4) && allies >= k; j++){
			if(results[j] === ""){
				results[j] = "Ally "+k;
				k++;
			}
		}
	} else {
		let needToPlace = [];
		if(humans){
			needToPlace.push("Humans");
		}
		if(traitors){
			needToPlace.push("Traitors");
		}
		if(horrors){
			needToPlace.push("Horrors");
		}
		if(allies){
			needToPlace.push("Allies");
		}

		
		let placeRest = ()=>{
			if(needToPlace.includes("Humans")){
				if(humans === 1){
					results[humanNum] = "Human 1";
				} else if(humans > 1) {
					results[humanNum] = "Humans";
				}
			}
			if(needToPlace.includes("Traitors")){
				if(traitors === 1){
					results[traitorNum] = "Traitor 1";
				} else if(traitors > 1){
					results[traitorNum] = "Traitors";
				}
			}
			if(needToPlace.includes("Horrors")){
				for(let j = 0; !(j>=4); j++){
					if(results[j] === ""){
						if(horrors === 1){
							results[j] = "Horror 1";
						} else if(horrors > 1){
							results[j] = "Horrors";
						}
						break;
					}
				}
			}
			if(needToPlace.includes("Allies")){
				for(let j = 0; !(j>=4); j++){
					if(results[j] === ""){
						if(horrors === 1){
							results[j] = "Ally 1";
						} else if(horrors > 1){
							results[j] = "Allies";
						}
						break;
					}
				}
			}
		};
		
		if(needToPlace.length >= empty){
			placeRest();
		} else {
			if(humans === 1){
				results[humanNum] = "Human 1";
				needToPlace.splice(needToPlace.indexOf("Humans"),1);
				empty--;
			}
			if(traitors === 1){
				results[traitorNum] = "Traitor 1";
				needToPlace.splice(needToPlace.indexOf("Traitors"),1);
				empty--;
			}
			if(horrors === 1){
				needToPlace.splice(needToPlace.indexOf("Horrors"),1);
				empty--;
				for(let j = 0; !(j>=4); j++){
					if(results[j] === ""){
						results[j] = "Horror 1";
						break;
					}
				}
			}
			if(allies === 1){
				needToPlace.splice(needToPlace.indexOf("Allies"),1);
				empty--;
				for(let j = 0; !(j>=4); j++){
					if(results[j] === ""){
						results[j] = "Ally 1";
						break;
					}
				}
			}

			if(humans === 2){
				results[humanNum] = "Human 1";
				needToPlace.splice(needToPlace.indexOf("Humans"),1);
				for(let j = 0; !(j>=4); j++){
					if(results[j] === "" && (j !== traitorNum || traitors === 0)){
						results[j] = "Human 2";
						break;
					}
				}
				empty -= 2;
			}
			if(needToPlace.length >= empty){
				placeRest();
			} else {
				if(traitors === 2){
					results[traitorNum] = "Traitor 1";
					needToPlace.splice(needToPlace.indexOf("Traitors"),1);
					for(let j = 0; !(j>=4); j++){
						if(results[j] === "" && (j !== humanNum || humans === 0)){
							results[j] = "Traitor 2";
							break;
						}
					}
					empty -= 2;
				}
				if(needToPlace.length >= empty){
					placeRest();
				} else {
					if(horrors === 2){
						needToPlace.splice(needToPlace.indexOf("Horrors"),1);
						let k = 1;
						for(let j = 0; !(j>=4) && horrors >= k; j++){
							if(results[j] === "" && (j !== humanNum || humans === 0) && (j !== traitorNum || traitors === 0)){
								results[j] = "Horror "+k;
								k++;

							}
						}
						empty -= 2;
					}
					if(needToPlace.length >= empty){
						placeRest();
					} else {
						if(allies === 2){
							needToPlace.splice(needToPlace.indexOf("Allies"),1);
							let k = 1;
							for(let j = 0; !(j>=4) && allies >= k; j++){
								if(results[j] === "" && (j !== humanNum || humans === 0) && (j !== traitorNum || traitors === 0)){
									results[j] = "Ally "+k;
									k++;

								}
							}
							empty -= 2;
						}
						if(needToPlace.length >= empty){
							placeRest();
						} else {
							if(humans === 3){
								needToPlace.splice(needToPlace.indexOf("Humans"),1);
								let k = 2;
								results[humanNum] = "Human 1";
								for(let j = 0; !(j>=4) && humans >= k; j++){
									if(results[j] === "" && (j !== traitorNum || traitors === 0)){
										results[j] = "Human "+k;
										k++;

									}
								}
								empty -= 3;
							}
							if(needToPlace.length >= empty){
								placeRest();
							} else {
								if(traitors === 3){
									needToPlace.splice(needToPlace.indexOf("Traitors"),1);
									let k = 2;
									results[traitorNum] = "Traitor 1";
									for(let j = 0; !(j>=4) && traitors >= k; j++){
										if(results[j] === "" && (j !== humanNum || humans === 0)){
											results[j] = "Traitor "+k;
											k++;

										}
									}
									empty -= 3;
								}
								if(needToPlace.length >= empty){
									placeRest();
								} else {
									if(horrors === 3){
										needToPlace.splice(needToPlace.indexOf("Horrors"),1);
										let k = 1;
										for(let j = 0; !(j>=4) && horrors >= k; j++){
											if(results[j] === "" && (j !== humanNum || humans === 0) && (j !== traitorNum || traitors === 0)){
												results[j] = "Horror "+k;
												k++;

											}
										}
										empty -= 3;
									}
									if(needToPlace.length >= empty){
										placeRest();
									} else {
										if(allies === 3){
											needToPlace.splice(needToPlace.indexOf("Allies"),1);
											let k = 1;
											for(let j = 0; !(j>=4) && allies >= k; j++){
												if(results[j] === "" && (j !== humanNum || humans === 0) && (j !== traitorNum || traitors === 0)){
													results[j] = "Ally "+k;
													k++;

												}
											}
											empty -= 3;
										}
										placeRest();
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	
	
	switch(results[num]){
		case "Humans":
			switch(humans){
				case 2:
					return imageO(6433409);
				case 3:
					return imageO(6433410);
				case 4:
					return imageO(6433412);
				case 5:
					return imageO(6433414);
				case 6:
					return imageO(6433415);
				case 7:
					return imageO(8326657);
			}
			break;
		case "Human 1":
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && !z.revealedHybrids[j]){
					return playerImage(j);
				}
			}
			break;
		case "Traitor 1":
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && z.revealedHybrids[j]){
					return playerImage(j);
				}
			}
			break;
		case "Human 2": {
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && !z.revealedHybrids[j]){
					count++;
					if(count === 2){
						return playerImage(j);
					}
				}
			}
			break;
		}
		case "Traitor 2": {
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && z.revealedHybrids[j]){
					count++;
					if(count === 2){
						return playerImage(j);
					}
				}
			}
			break;
		}
		case "Human 3": {
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && !z.revealedHybrids[j]){
					count++;
					if(count === 3){
						return playerImage(j);
					}
				}
			}
			break;
		}
		case "Traitor 3": {
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && z.revealedHybrids[j]){
					count++;
					if(count === 3){
						return playerImage(j);
					}
				}
			}
			break;
		}
		case "Human 4": {
			let count = 0;
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] === d.spaceNames[index] && !z.revealedHybrids[j]){
					count++;
					if(count === 4){
						return playerImage(j);
					}
				}
			}
			break;
		}
		case "Ally 1": {
			let count = 0;
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] === d.spaceNames[index]){
					count++;
					if(count === 1){
						return allyImage(z.allies[j][0]);
					}
				}
			}
			break;
		}
		case "Ally 2": {
			let count = 0;
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] === d.spaceNames[index]){
					count++;
					if(count === 2){
						return allyImage(z.allies[j][0]);
					}
				}
			}
			break;
		}
		case "Ally 3": {
			let count = 0;
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] === d.spaceNames[index]){
					count++;
					if(count === 3){
						return allyImage(z.allies[j][0]);
					}
				}
			}
			break;
		}
		case "Ally 4": {
			let count = 0;
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] === d.spaceNames[index]){
					count++;
					if(count === 4){
						return allyImage(z.allies[j][0]);
					}
				}
			}
			break;
		}
		case "Allies":
			switch(allies){
				case 2:
					return imageO(8326565);
				case 3:
					return imageO(8326566);
				case 4:
					return imageO(8326567);
				case 5:
					return imageO(8326568);
				case 6:
					return imageO(8326569);
				case 7:
					return imageO(8326647);
				case 8:
					return imageO(8326648);
				case 9:
					return imageO(8326649);
				case 10:
					return imageO(8326650);
				case 11:
					return imageO(8326651);
				case 12:
					return imageO(8326653);
			}
			break;
		case "Horrors":
			switch(horrors){
				case 2:
					return imageO(8326563);
				case 3:
					return imageO(8326564);
			}
			break;
		case "Horror 1":
			if(z.shoggoth === index){
				return shoggothImage();
			} else if(z.drownedSpirit === index){
				return drownedSpiritImage();
			} else {
				return graspingTendrilImage();
			}
		case "Horror 2":
			if(z.drownedSpirit === index && z.shoggoth === index){
				return drownedSpiritImage();
			} else {
				return graspingTendrilImage();
			}
		case "Horror 3":
			return graspingTendrilImage();
		case "Deep Ones":
			return deepOneImage(index);
		case "Damage":
			return damageImage(index);
		case "Passenger":
			return passengerImage(index);
		case "Traitors":
			switch(traitors){
				case 2:
					return imageO(6433490);
				case 3:
					return imageO(6433491);
			}
			break;
		case "":
			switch(index){
				case DECK:
					switch(num){
						case 0:
							return imageO(6434308);
						case 1:
							return imageO(6434313);
						case 2:
							return imageO(6434321);
						case 3:
							return imageO(6434329);
					}
					break;
				case DECK+1:
					switch(num){
						case 0:
							return imageO(6434306);
						case 1:
							return imageO(6434311);
						case 2:
							return imageO(6434316);
						case 3:
							return imageO(6434324);
					}
					break;
				case DECK+2:
					switch(num){
						case 0:
							return imageO(6434343);
						case 1:
							return imageO(6434352);
						case 2:
							return imageO(6434364);
						case 3:
							return imageO(6434376);
					}
					break;
				case DECK+3:
					switch(num){
						case 0:
							return imageO(6434336);
						case 1:
							return imageO(6434346);
						case 2:
							return imageO(6434357);
						case 3:
							return imageO(6434369);
					}
					break;
				case DECK+4:
					switch(num){
						case 0:
							return imageO(6434389);
						case 1:
							return imageO(6434406);
						case 2:
							return imageO(6434418);
						case 3:
							return imageO(6434429);
					}
					break;
				case DECK+5:
					switch(num){
						case 0:
							return imageO(6434382);
						case 1:
							return imageO(6434399);
						case 2:
							return imageO(6434412);
						case 3:
							return imageO(6434421);
					}
					break;
				case DECK+6:
					switch(num){
						case 0:
							return imageO(6434438);
						case 1:
							return imageO(6434451);
						case 2:
							return imageO(6434456);
						case 3:
							return imageO(6434463);
					}
					break;
				case DECK+7:
					switch(num){
						case 0:
							return imageO(6434433);
						case 1:
							return imageO(6434442);
						case 2:
							return imageO(6434454);
						case 3:
							return imageO(6434461);
					}
					break;
				case BRIDGE:
					switch(num){
						case 0:
							return imageO(6434318);
						case 1:
							return imageO(6434319);
						case 2:
							return imageO(6434326);
						case 3:
							return imageO(6434327);
					}
					break;
				case CHAPEL:
					switch(num){
						case 0:
							return imageO(6434341);
						case 1:
							return imageO(6434350);
						case 2:
							return imageO(6434361);
						case 3:
							return imageO(6434373);
					}
					break;
				case CAPTAINS_CABIN:
					switch(num){
						case 0:
							return imageO(6434338);
						case 1:
							return imageO(6434348);
						case 2:
							return imageO(6434359);
						case 3:
							return imageO(6434371);
					}
					break;
				case CARGO_HOLD:
					switch(num){
						case 0:
							return imageO(6434387);
						case 1:
							return imageO(6434404);
						case 2:
							return imageO(6434416);
						case 3:
							return imageO(6434425);
					}
					break;
				case GALLEY:
					switch(num){
						case 0:
							return imageO(6434385);
						case 1:
							return imageO(6434402);
						case 2:
							return imageO(6434414);
						case 3:
							return imageO(6434423);
					}
					break;
				case BOILER_ROOM:
					switch(num){
						case 0:
							return imageO(6434435);
						case 1:
							return imageO(6434436);
						case 2:
							return imageO(6434446);
						case 3:
							return imageO(6434448);
					}
			}
	}
	return blankImage();
}



function boardImage() {
	
	let port = waterImage(1,1)+"\n"+waterImage(1,2)+"\n"+waterImage(1,3)+"\n"+waterImage(1,4)+"\n"+waterImage(1,5);
	port += "\n"+waterImage(3,1)+"\n"+waterImage(3,2)+"\n"+waterImage(3,3)+"\n"+waterImage(3,4);
	port += "\n"+waterImage(5,1)+"\n"+waterImage(5,2)+"\n"+waterImage(5,3)+"\n"+waterImage(5,4);
	port += "\n"+waterImage(7,1)+"\n"+waterImage(7,2)+"\n"+waterImage(7,3)+"\n"+waterImage(7,4);
	
	let starboard = waterImage(0,1)+"\n"+waterImage(0,2)+"\n"+waterImage(0,3)+"\n"+waterImage(0,4)+"\n"+waterImage(0,5);
	starboard += "\n"+waterImage(2,1)+"\n"+waterImage(2,2)+"\n"+waterImage(2,3)+"\n"+waterImage(2,4);
	starboard += "\n"+waterImage(4,1)+"\n"+waterImage(4,2)+"\n"+waterImage(4,3)+"\n"+waterImage(4,4);
	starboard += "\n"+waterImage(6,1)+"\n"+waterImage(6,2)+"\n"+waterImage(6,3)+"\n"+waterImage(6,4);
	
	let ship = imageO(6434293) + waterImage(1,6) + imageO(6434297) + waterImage(0,6);
	ship += "\n"+waterImage(1,7)+imageO(6434303)+spaceImage(DECK+1,0)+imageO(6434307)+spaceImage(DECK,0)+imageO(6434309)+waterImage(0,7);
	ship += "\n"+imageO(6434310)+spaceImage(DECK+1,1)+imageO(6434312)+spaceImage(DECK,1)+imageO(6434314);
	ship += "\n"+imageO(6434315)+spaceImage(DECK+1,2)+imageO(6434317)+spaceImage(BRIDGE,0)+spaceImage(BRIDGE,1)+imageO(6434320)+spaceImage(DECK,2);
	ship += "\n"+imageO(6434322)+spaceImage(DECK+1,3)+imageO(6434325)+spaceImage(BRIDGE,2)+spaceImage(BRIDGE,3)+imageO(6434328)+spaceImage(DECK,3)+
			imageO(6434331);
	ship += "\n"+imageO(6434333)+spaceImage(DECK+3,0)+imageO(6434337)+spaceImage(CAPTAINS_CABIN,0)+imageO(6434339)+spaceImage(CHAPEL,0)+
			imageO(6434342)+spaceImage(DECK+2,0)+imageO(6434344);
	ship += "\n"+imageO(6434345)+spaceImage(DECK+3,1)+imageO(6434347)+spaceImage(CAPTAINS_CABIN,1)+imageO(6434354)+spaceImage(CHAPEL,1)+
			imageO(6434351)+spaceImage(DECK+2,1)+imageO(6434353);
	ship += "\n"+imageO(6434356)+spaceImage(DECK+3,2)+imageO(6434358)+spaceImage(CAPTAINS_CABIN,2);
	let sickbayHumans = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === "Sick Bay" && !z.revealedHybrids[j]){
			sickbayHumans = 1;
			break;
		}
	}
	/* UTODO: hazardous location outline for sick bay (both), brig (traitor) */
	if(sickbayHumans){
		ship += imageO(6435070);
	} else {
		ship += imageO(6434360);
	}
	ship += spaceImage(CHAPEL,2)+imageO(6434363)+spaceImage(DECK+2,2)+imageO(6434366);
	ship += "\n"+imageO(6434367)+spaceImage(DECK+3,3)+imageO(6434370)+spaceImage(CAPTAINS_CABIN,3);
	let sickbayTraitors = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === "Sick Bay" && z.revealedHybrids[j]){
			sickbayTraitors = 1;
			break;
		}
	}
	if(sickbayTraitors){
		ship += imageO(6435071 ); 
	} else {
		ship += imageO(6434372);
	}
	ship += spaceImage(CHAPEL,3)+imageO(6434374)+spaceImage(DECK+2,3)+imageO(6434378);
	ship += "\n"+imageO(6434381)+spaceImage(DECK+5,0)+imageO(6434383)+spaceImage(GALLEY,0)+imageO(6434386)+spaceImage(CARGO_HOLD,0)+imageO(6434388)+
			spaceImage(DECK+4,0)+imageO(6434390);
	ship += "\n"+imageO(6434398)+spaceImage(DECK+5,1)+imageO(6434401)+spaceImage(GALLEY,1)+imageO(6434403)+spaceImage(CARGO_HOLD,1)+imageO(6434405)+
			spaceImage(DECK+4,1)+imageO(6434409);
	ship += "\n"+imageO(6434410)+spaceImage(DECK+5,2)+imageO(6434413)+spaceImage(GALLEY,2);
	let brigHumans = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === "Brig" && !z.revealedHybrids[j]){
			brigHumans = 1;
			break;
		}
	}
	if(brigHumans){
		ship += imageO(6435072);
	} else {
		ship += imageO(6434415);
	}
	ship += spaceImage(CARGO_HOLD,2)+imageO(6434417)+spaceImage(DECK+4,2)+imageO(6434419);
	ship += "\n"+imageO(6434420)+spaceImage(DECK+5,3)+imageO(6434422)+spaceImage(GALLEY,3);
	let brigTraitors = 0;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] === "Brig" && z.revealedHybrids[j]){
			brigTraitors = 1;
			break;
		}
	}
	if(brigTraitors){
		ship += imageO(6435073);
	} else {
		ship += imageO(6434424);
	}
	ship += spaceImage(CARGO_HOLD,3)+imageO(6434427)+spaceImage(DECK+4,3)+imageO(6434431);
	ship += "\n"+imageO(6434432)+spaceImage(DECK+7,0)+imageO(6434434)+spaceImage(BOILER_ROOM,0)+spaceImage(BOILER_ROOM,1)+imageO(6434437)+
			spaceImage(DECK+6,0)+imageO(6434439);
	ship += "\n"+imageO(6434440)+spaceImage(DECK+7,1)+imageO(6434444)+spaceImage(BOILER_ROOM,2)+spaceImage(BOILER_ROOM,3)+imageO(6434450)+
			spaceImage(DECK+6,1)+imageO(6434452);
	ship += "\n"+imageO(6434453)+spaceImage(DECK+7,2)+imageO(6434455)+spaceImage(DECK+6,2)+imageO(6434459);
	ship += "\n"+imageO(6434460)+spaceImage(DECK+7,3)+imageO(6434462)+spaceImage(DECK+6,3)+imageO(6434464);
	ship += "\n"+waterImage(7,5)+imageO(6434465)+waterImage(6,5);
	
	
	return floatleft(port)+floatleft(ship)+floatleft(starboard)+clear();

}

function canBeckAndCall(){
	if(!z.feats[z.turn].includes("Beck and Call") || z.playerLocations[z.turn] === "Brig" || z.revealedHybrids[z.turn]){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== "Sick Bay" && j !== me){
			return true;
		}
	}
	return false;
}

function startThatTurn(){
	
	if(!resetImprovements(z.turn)){
		println("MULTIPLE_IMPROVEMENTS_ALERT",z.players[z.turn]);
		addOption(z.turn,"Activate an Improvement","Receive Skills",true);
	} else if(canBeckAndCall()){
		addOption(z.turn,"Beck and Call [Feat]",undefined,true);
		if(z.turn === z.cursedWhispers){
			addOption(z.turn,"Receive Skills for this turn","Cursed Whispers",true);
		} else {
			addOption(z.turn,"Receive Skills for this turn","Beck and Call",true);
		}
		println("BECK_AND_CALL_ALERT",z.players[z.turn],getGender(z.turn));
	} else {
		if(z.playerLocations[z.turn] === "Sick Bay"){
			if(z.turn === z.cursedWhispers){
				boldAlert("CURSED_WHISPERS_SICKBAY");
				SPTokenBad("Cursed Whispers","Receive Skills");
			} else {
				println("SICK_BAY_ALERT",z.players[z.turn],getGender(z.turn));
				addOption(z.turn,"Draw 1 Skill Card","Sick Bay",true);
			}
		} else if(z.revealedHybrids[z.turn] === 1){
			println("RECEIVE_SKILLS_TRAITOR",z.players[z.turn],getGender(z.turn));
			addOption(z.turn,"Receive Skills for this turn",undefined,true);
		} else if(z.turn === z.cursedWhispers){
			boldAlert("CURSED_WHISPERS_TURN_START");
			addOption(z.turn,"Receive Skills for this turn","Cursed Whispers",true);
		} else {
			for(let i = 0; !(i >= 5); i++) {
				for(let j = d.skillDraws[i ][getCharacter(z.players[z.turn])]; j > 0; j--) {
					dealSkillCard(z.turn, i);
				}
			}
			if(z.activeImprovements[z.turn] && z.playerLocations[z.turn] !== "Brig"){
				dealSkillCard(z.turn,z.activeImprovements[z.turn] - FINE_CLOTHES);
			}
			if(itemPresent("Valise") && itemHolder("Valise") === z.turn && z.valiseImprovement){
				dealSkillCard(z.turn,z.valiseImprovement - FINE_CLOTHES);
			}
			if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === z.turn && z.playerLocations[z.turn] !== "Brig"){
				dealSkillCard(z.turn,TREACHERY);
			}
			if(z.blessing === me){
				dealSkillCard(z.turn,BOON);
			}
			addAlert("RECEIVE_SKILLS_HUMAN",z.players[z.turn],getGender(z.turn));
			z.phase = 1;
		}
	}
}

function gameSetup() {
	z.gameSetup = true;
	z.cultist = false;
	z.seed = Math.floor(Math.random() * mLCG);
	/* UTODO: localization prompt */
	
	expansionPrompt();
}

function clearBackground() {
	hideElement(alertifyBackground);
}

function isMobile() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}
mobile = isMobile();

function expansionPrompt(){
	confirmify(lc("FROM_THE_ABYSS_PROMPT"),numPlayersPrompt,()=>{
		z.fromTheAbyss = true;
		numPlayersPrompt();
	},"YES","NO");
}

function numPlayersPrompt() {
	let maxPlayers = 7;
	promptNum(lc("NUM_PLAYERS_PROMPT",maxPlayers), (a) => 3 > a || a > maxPlayers, clearBackground, (prompted) => {
		z.numPlayers = prompted;
		if(z.numPlayers === 4 || z.numPlayers === 6){
			z.cultist = true;
		}
		variantsPrompt();
	});
}

function variantsPrompt() {
	/* UTODO: Prelude cards */
	let variants = [];
	let usedVariants = [];
	if(z.cultist){
		variants.push("No Cultist Variant");
	}
	variants.push("First Game Variant");
	variants.push("Easier Game");
	variants.push("Harder Game");
	if(z.numPlayers === 5){
		variants.push("5 Player Cultist Variant");
	}
	if(z.numPlayers !== 7){
		variants.push("Random Cultist Variant");
	}
	if(z.fromTheAbyss){
		variants.push("Preludes (normal)");
		variants.push("Preludes (custom)");
	}
	for(let j = 0; !(j >= variants.length); j++) {
		usedVariants.push(false);
	}
	let anyVariants = false;
	if(variants.length > 0) {
		let variantPrompt = function() {
			let promptText = "You may toggle variants here.  Once you're done, press Cancel to proceed.";
			for(let j = 0; !(j >= variants.length); j++) {
				promptText += "\n" + (j + 1) + ": ";
				if(usedVariants[j]) {
					promptText += "[ON] ";
				} else {
					promptText += "[OFF] ";
				}
				promptText += variants[j];
			}
			promptNum(promptText, (a) => 1 > a || a > variants.length, () => {
				let preludesCustom = false;
				for(let j = 0; !(j >= variants.length); j++) {
					if(usedVariants[j]) {
						anyVariants = true;
						switch (variants[j]) {
							case "No Cultist Variant":
								delete z.cultist;
								z.noCultist = true;
								break;
							case "First Game Variant":
								z.firstGame = true;
								break;
							case "Easier Game":
								z.easierGame = true;
								break;
							case "Harder Game":
								z.harderGame = true;
								break;
							case "5 Player Cultist Variant":
								z.cultist = true;
								break;
							case "Random Cultist Variant":
								z.randomCultist = true;
								break;
							case "Preludes (normal)":
								z.preludes = true;
								z.day = 1;
								z.twilight = 1;
								z.night = 1;
								break;
							case "Preludes (custom)":
								z.preludes = true;
								preludesCustom = true;
								break;
							default:
								break;
						}
					}
				}
				if(preludesCustom){
					promptPreludes(anyVariants, variants, usedVariants);
				} else {
					promptUsernames(anyVariants, variants, usedVariants, 1);
				}
			}, (prompted) => {
				usedVariants[prompted - 1] = !usedVariants[prompted - 1];
				variantPrompt();
			});
		};
		variantPrompt();
	} else {
		promptUsernames(anyVariants, variants, usedVariants, 1);
	}
}

function promptPreludes(anyVariants,variants,usedVariants){
	promptNum(lc("DAY_PROMPT"), (a) => 0 > a || a > 5, clearBackground, (a) => {
		z.day = a;
		promptNum(lc("TWILIGHT_PROMPT"), (a) => 0 > a || a > 5, clearBackground, (a) => {
			z.twilight = a;
			promptNum(lc("NIGHT_PROMPT"), (a) => 0 > a || a > 5, clearBackground, (a) => {
				z.night = a;
				promptUsernames(anyVariants, variants, usedVariants, 1);
			});
		});
	});
}


function promptUsernames(anyVariants, variants, usedVariants, j) {
	if(j === 1) {
		z.usernames = [];
	}
	if(j > z.numPlayers) {
		shuffle(z.usernames);
		finishSetup(anyVariants, variants, usedVariants);
	} else {
		promptString(lc("PROMPT_USERNAME",[j,z.numPlayers]),
			clearBackground, (prompted) => {
				z.usernames.push(prompted);
				promptUsernames(anyVariants, variants, usedVariants, j + 1);
			});
	}
}

function finishSetup(anyVariants, variants, usedVariants) {
	t.value = t.value + bold(size("[thread"+"=2731140]"+lc("The Marconi Room Setup")+"["+"/thread]", 14)) + "\r\n\r\n";
	printlnBold("Game Options:");
	println("NUM_PLAYERS_PRINT",z.numPlayers);
	if(z.fromTheAbyss){
		println("From the Abyss");
	} else {
		println("Base Game");
	}
	
	if(z.randomCultist){
		if(z.noCultist){
			delete z.noCultist;
			let index = variants.indexOf("No Cultist Variant");
			usedVariants[index] = false;
		}
		if(z.firstGame){
			delete z.firstGame;
			let index = variants.indexOf("First Game Variant");
			usedVariants[index] = false;
		}
		if(z.cultist && z.numPlayers === 5){
			z.cultist = false;
			let index = variants.indexOf("5 Player Cultist Variant");
			usedVariants[index] = false;
		}
	}
	if(z.cultist){
		println("CULTIST_IN_PLAY");
	}
	if(z.firstGame && z.noCultist){
		delete z.noCultist;
		let index = variants.indexOf("No Cultist Variant");
		usedVariants[index] = false;
	}
	if(anyVariants) {
		t.value += "\r\n\r\n" + bold("[article" + "=26973211]"+lc("Unofficial Variants")+"[/" + "article]:");
		for(let j = 0; !(j >= variants.length); j++) {
			if(usedVariants[j]) {
				if(variants[j] === "Preludes (custom)"){
					t.value += "\r\nPreludes (";
					let any = false;
					if(z.day){
						t.value += z.day + " Day";
						any = true;
					}
					if(z.twilight){
						if(any){
							t.value += ", ";
						}
						t.value += z.twilight + " Twilight";
					}
					if(z.night){
						if(any){
							t.value += ", ";
						}
						t.value += z.night + " Night";
					}
					t.value += ")";
				} else if(variants[j] === "Preludes (normal)"){
					t.value += "\r\nPreludes (1 Day, 1 Twilight, 1 Night)";
				} else {
					t.value += "\r\n" + variants[j];
				}
			}
		}
		t.value += "\r\n\r\n";
	}
	t.value += bold(lc("Players")) + " "+lc("(in randomized turn order)");
	for(let j = 0; !(j >= z.numPlayers); j++) {
		t.value += "\r\n" + (j + 1) + ": [us" + "er=" + z.usernames[j] + "]" + z.usernames[j] + "[/" + "user]";
	}
	if(z.usernames[z.numPlayers-1].toLowerCase() === "vorpalgens"){
		t.value += " (no surprise there)";
	}
	t.value += "\r\n\r\n";
	printlnBold("UP_FIRST_IS",z.usernames[0]);
    println("GAME_START_MESSAGE");	
	z.players = [];
	z.banners = [];
	z.playerLocations = [];
	z.possibleColors = [];
	z.TMRversion = TMRversion;
	z.promptStyle = [];
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.promptStyle.push(1);
	}
	let splitted = window.btoa(JSON.stringify(z)).match(/.{1,20}/g);
	let text = "";
	while(splitted.length > 0) {
		text += splitted.shift() + "-";
	}
	let re = new RegExp("(\\[c\\])?\\[size=(1|0)\\]\\[color=#(F4F4FF|FFFFFF)\\](New|TMR) seed: \\S+\\[/color\\]\\[/size\\](\\[/c\\])?", "g");
	t.value = t.value.replace(re, "") + code(size(invisible("TMR seed: " + text), 1));
	try{
		let evt = new Event('input', {
			bubbles: true,
			cancelable: true,
		});
		t.dispatchEvent(evt);
	} catch(err){}
	clearBackground();
}

function hashString(str) {
	let hash = 0;
	for(let i = 0; !(i >= str.length); i++) {
		let chr = str.charCodeAt(i);
		hash = (Math.floor(hash / 32) - hash) + chr;
		hash = hash & hash;
	}
	return (hash & 7);
}

function pickCharacter() {
	let choices = [];
	let promptText = "";
	let maxCharacter = d.characters.length;
	if(!z.fromTheAbyss){
		maxCharacter = 10;
	}
	/* ATODO: 2 screens for From the Abyss?*/
	for(let j = 0; !(j>=maxCharacter); j++){
		if(!z.players.includes(d.characters[j])){
			choices.push(j);
			promptText += "\n"+(choices.length)+": "+lc(d.characters[j]);
		}
	}
	choices.push("Random Character");
	promptText += "\n"+(choices.length)+": "+lc("Random Character");
	promptText = lc("CHARACTER_PROMPT",choices.length) + promptText;
	promptNum(promptText,(a)=>1>a||a>choices.length,saveAndQuit,(a)=>{
		let character = choices[a-1];
		let rando = (a === choices.length);
		if(rando){
			choices.pop();
			character = choices[Math.floor(Math.random() * choices.length)];
		}
		z.players.push(d.characters[character]);
		addAlert("PLAYER_CHOSEN_ALERT",d.characters[character]);
		printlnBold("PLAYER_CHOSEN_PRINT",[z.usernames[z.players.length - 1],d.characters[character]]);
		if(rando){
			println("PLAYER_CHOSEN_RANDOM");
		}
		z.playerLocations.push(d.startingLocations[character]);
		if(z.fromTheAbyss){
			z.possibleColors.push([0, 0, 0, 0, 0, 0, 0]);
		} else {
			z.possibleColors.push([0, 0, 0, 0, 0, 0]);
		}
		z.banners.push(d.banners[character]);
		if(z.players.length >= z.numPlayers){
			gameSetup2();
		} else {
			printlnBold("UP_NEXT_IS",z.usernames[z.players.length]);
			saveAndQuit();
		}
	});
}

function saveAndQuit() {
	postSeed();
	if(t.value.slice(-4) !== ("[h" +  "r]")) {
		t.value += "[h" +  "r]";
	}
	clearBackground();
}

function spawnAlly(loc){
	if(z.allyDeck.length === 0){
		boldAlert("NO_ALLY_TO_SPAWN");
	} else {
		let ally = z.allyDeck.pop();
		z.allies.push([ally,loc]);
		boldAlert("ALLY_SPAWN",[d.allyNames[ally],loc]);
		fleeCheck(locationIndex(loc));
	}
	
}

const CULTIST = 11;

function gameSetup2() {
	z.version = TMRversion;
	z.TMRversion = TMRversion;
	printlnBold("Players:");
	for(let j = 0; !(j >= z.numPlayers); j++) {
		println("PLAYER_AS_CHARACTER",[z.usernames[j],z.players[j]]);
	}
	t.value += "\r\n";
	
	
	z.deckChief = true;
	z.quickDraw = true;
	z.occultTraining = true;
	z.scavenger = true;
	z.bookOfDagon = true;
	z.starbuck = true;
	z.keeperAction = true;
	z.trueGrit = true;
	z.almanac = true;
	z.plimsolls = true;
	
	z.dieRollQueue = [];
	z.dieRollParams = [];
	z.lastDieRoll = null;
	z.dieRollModifier = 0;
	z.lastDieRollModifier = 0;
	z.lastDieRollValue = 0;
	z.lastDieRollParams = null;
	z.round = 1;
	z.turn = 0;
	z.phase = 0;
	z.emergencyAction = false;
	z.keeper = -1;
	z.captain = -1;
	z.currentMythos = null;
	z.mythosPlayer = null;
	z.currentSkillCheck = null;
	z.thisDifficulty = null;
	z.thisPartial = null;
	z.thisInfluence = null;
	z.thisLore = null;
	z.thisObservation = null;
	z.thisStrength = null;
	z.thisWill = null;
	z.thisTarget = null;
	z.chaos = [];
	z.interrupts = blankArrays(z.numPlayers);
	
	z.distance = 0;
	z.contributingPlayer = 0;
	z.skillCheckRevealed = false;
	z.finishedMythos = false;
	z.revealedCards = [];
	z.awakening = false;
	z.spellPeek = [];
	z.spellPeeker = -1;
	z.secretMessages = [];
	z.defeats = blankArrays(z.numPlayers);
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.secretMessages.push("");
	}
	z.gameOver = false;
	z.mythosOptions = blankArrays(z.numPlayers);
	z.context = blankArrays(z.numPlayers);
	z.mandatory = blankArrays(z.numPlayers);
	z.processedOutcome = false;
	
	z.spToken = false;
	z.deToken = false;
	z.des = [];
	z.sps = [];
	z.dieRoller = 0;
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.sps.push([]);
		z.des.push([]);
	}
	z.tank = [];
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.tank.push(false);
	}
	
	z.contributionLabels = [];
	z.activeImprovements = [];
	for(let i = 0; !(i >= z.numPlayers); i++) {
		z.contributionLabels.push("");
		z.activeImprovements.push(0);
	}
	/* 2: Set Tracks */
	z.travelTrack = 0;
	z.ritualTrack = 0;
	/* 3: Set Dials */
	z.souls = 8;
	z.sanity = 8;
	z.food = 8;
	z.fuel = 8;
	if(z.noCultist){
		z.fuel = 7;
		z.sanity = 6;
		z.food = 6;
		z.souls = 7;
	}
	if(z.easierGame){
		z.fuel += 2;
		z.sanity += 2;
		z.food += 2;
		z.souls += 2;
	}
	if(z.harderGame){
		z.fuel -= 2;
		z.sanity -= 2;
		z.food -= 2;
		z.souls -= 2;
	}
	/* 4: Create Supply */
	z.deepOnes = [];
	for(let j = 0; !(j>=20); j++){
		z.deepOnes.push(RESERVES);
	}
	
	z.passengerSupply = ["Decoy", "Decoy", "2 Souls", "1 Soul + 1 Sanity", "1 Soul", "1 Soul", "1 Soul", "1 Soul", "1 Soul"];
	z.defeatedPassengers = [];
	shuffle(z.passengerSupply);
	z.spacePassengers = blankArrays(d.spaceNames.length);
	
	z.dieRolls = [];
	for(let j = 0; !(j >= 250); j++) {
		let rando = Math.floor((z.seed * 8) / mLCG) + 1;
		updateSeed();
		z.dieRolls.push(rando);
	}
	
	if(z.fromTheAbyss){
		z.horrorDeck = [0,1,2,3];
		shuffle(z.horrorDeck);
		z.horror = 0;
	}
	
	/* 5: Create Skill Decks */
	
	z.skillCardDecks = blankArrays(6);
	for(let i = 0; !(i >= 6); i++) {
		for(let j = 0; !(j >= 21); j++) {
			z.skillCardDecks[i ].push(j + i * 21);
		}
		shuffle(z.skillCardDecks[i ]);
	}
	if(z.fromTheAbyss){
		z.skillCardDecks.push([]);
		for(let j = 0; !(j >= 21); j++) {
			z.skillCardDecks[BOON].push(126 + j);
		}
		for(let j = 0; !(j>=7); j++){
			z.skillCardDecks[j].push(147+2*j);
			z.skillCardDecks[j].push(147+2*j+1);
			shuffle(z.skillCardDecks[j]);
		}
	}
	z.skillCardDiscards = blankArrays(6);
	if(z.fromTheAbyss){
		z.skillCardDiscards.push([]);
	}
	z.skillCardHands = blankArrays(z.numPlayers);
	z.skillCheckCards = blankArrays(z.numPlayers + 1);
	/* 6: Create Damage and Mythos decks */
	
	z.damageDeck = [];
	for(let j = 0; !(j>=8); j++){
		z.damageDeck.push(j);
	}
	if(z.fromTheAbyss){
		z.damageDeck.push(9);
		z.damageDeck.push(10);
	}
	z.damage = [];
	for(let j = 0; !(j>=6); j++){
		z.damage.push(-1);
	}
	shuffle(z.damageDeck);
	
	z.mythosDeck = [];
	z.mythosDiscards = [];

	for(let j = 0; !(j >= 60); j++) {
		z.mythosDeck.push(j);
	}
	if(!z.fromTheAbyss){
		for(let j = 60; !(j>=70); j++){
			z.mythosDeck.push(j);
		}
	} else {
		for(let j = 70; !(j>=142); j++){
			z.mythosDeck.push(j);
		}
	}
	shuffle(z.mythosDeck);
	
	/* 7: Place Monsters and Passengers */
	
	z.deepOnes[0] = WATER;
	z.deepOnes[1] = WATER;
	z.deepOnes[2] = WATER+1;
	z.deepOnes[3] = WATER+1;
	z.deepOnes[4] = DECK;
	z.deepOnes[5] = DECK+1;
	z.activatedLocations = [];
	for(let j = 0; !(j>=d.spaceNames.length); j++){
		z.activatedLocations.push(false);
	}
	z.mother = DEEP;
	z.father = DEEP;
	if(z.fromTheAbyss){
		z.shoggoth = RESERVES;
		z.graspingTendril = RESERVES;
		z.drownedSpirit = RESERVES;
	}
	z.deepOneActivated = [];
	for(let j = 0; !(j >= z.deepOnes.length); j++) {
		z.deepOneActivated.push(0);
	}
	
	z.spacePassengers[DECK+2].push(z.passengerSupply.pop());
	z.spacePassengers[DECK+3].push(z.passengerSupply.pop());
	
	/* 8: Create Chaos Deck */
	buildChaos();
	
	/* 10: Create Play Areas */
	
	z.feats = [];
	for(let j = 0; !(j >= z.numPlayers); j++) {
		z.feats.push([d.featNames[getCharacter(z.players[j])]]);
	}
	
	if(z.fromTheAbyss){
		z.characterMythos = [];
		for(let j = 0; !(j>=z.numPlayers); j++){
			z.characterMythos.push(characterSpecificMythos(z.players[j]));
		}
	}
	
	z.guillaumeAllies = [];
	
	
	
	/* 11: Gather Items */
	
	z.itemDeck = [];
	z.items = blankArrays(z.numPlayers);
	for(let j = 0; !(j>=20); j++){
		let starter = false;
		for(let k = 0; !(k>=z.numPlayers); k++){
			if(getCharacter(z.players[k]) === j && 10 > j){
				starter = true;
				z.items[k].push(j);
				break;
			}
		}
		if(!starter){
			z.itemDeck.push(j);
		}
	}
	if(z.fromTheAbyss){
		for(let j = 20; !(j>=30); j++){
			let starter = false;
			for(let k = 0; !(k>=z.numPlayers); k++){
				if(getCharacter(z.players[k])+10 === j){
					starter = true;
					z.items[k].push(j);
					break;
				}
			}
			if(!starter){
				z.itemDeck.push(j);
			}
		}
	}
	shuffle(z.itemDeck);
	
	/* 14: Create Waypoint Deck */
	
	z.revealedHybrids = [];
	for(let i = 0; !(i >= z.numPlayers); i++) {
		z.revealedHybrids.push(0);
	}
	
	z.waypointDeck = [];
	for(let j = 0; !(j >= 20); j++) {
		z.waypointDeck.push(j);
	}
	if(z.fromTheAbyss){
		for(let j = 20; !(j>=30); j++){
			z.waypointDeck.push(j);
		}
	}
	shuffle(z.waypointDeck);
	z.waypointDiscards = [];
		
	passCaptain(99);
	
	/* 15: Create Spell Deck */
	
	z.spellDeck = [];
	for(let j = 0; !(j >= 20); j++) {
		z.spellDeck.push(j);
	}
	if(z.fromTheAbyss){
		for(let j = 20; !(j >= 30); j++) {
			z.spellDeck.push(j);
		}
	}
	shuffle(z.spellDeck);
	
	passKeeper(99);
	
	/* 16: Create Loyalty Deck */
	
	/* URULES: card 13? */
	
	let cylonDeck = [9, 10, 13];
	let notCylonDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 12];
	if(z.randomCultist){
		cylonDeck.push(CULTIST);
		shuffle(cylonDeck);
	}
	z.loyaltyDeck = [];
	z.loyaltyDeck.push(cylonDeck.pop());
	z.loyaltyDeck.push(notCylonDeck.pop());
	z.loyaltyDeck.push(notCylonDeck.pop());
	z.loyaltyDeck.push(notCylonDeck.pop());
	z.loyaltyDeck.push(notCylonDeck.pop());
	z.loyaltyDeck.push(notCylonDeck.pop());
	if(z.numPlayers === 4 || z.numPlayers === 6) {
		if(z.cultist){
			z.loyaltyDeck.push(CULTIST); /* 11 */
		} else if(z.randomCultist){
			z.loyaltyDeck.push(cylonDeck.pop());
		} else {
			z.loyaltyDeck.push(notCylonDeck.pop());
		}
		z.loyaltyDeck.push(notCylonDeck.pop());
		if(z.numPlayers === 6) {
			z.loyaltyDeck.push(cylonDeck.pop());
			z.loyaltyDeck.push(notCylonDeck.pop());
			z.loyaltyDeck.push(notCylonDeck.pop());
			z.loyaltyDeck.push(notCylonDeck.pop());
		}
	} else if(z.numPlayers === 5) {
		z.loyaltyDeck.push(notCylonDeck.pop());
		z.loyaltyDeck.push(notCylonDeck.pop());
		z.loyaltyDeck.push(notCylonDeck.pop());
		if(z.cultist){
			z.loyaltyDeck.push(CULTIST);
		} else {
			z.loyaltyDeck.push(cylonDeck.pop());
		}
	} else if(z.numPlayers === 7){
		z.loyaltyDeck.push(notCylonDeck.pop());
		z.loyaltyDeck.push(notCylonDeck.pop());
		z.loyaltyDeck.push(CULTIST);
		z.loyaltyDeck.push(cylonDeck.pop());
	}
	shuffle(z.loyaltyDeck);
	
	z.loyaltyHands = blankArrays(z.numPlayers);
	z.loyaltyDiscards = blankArrays(z.numPlayers);
	

	
	z.determinationCOs = [];
	t.value += "\r\n";
	z.xoStack = [];
	z.xoPerformers = [];
	if(z.fromTheAbyss){
		z.allies = [];
		z.allyDeck = [];
		for(let j = 0; !(j>=12); j++){
			z.allyDeck.push(j);
		}
		shuffle(z.allyDeck);
		z.allyUsed = [];
		for(let j = 0; !(j>=z.numPlayers); j++){
			z.allyUsed[j] = 0;
		}
	}
	
	/* 13: Draw Skill Cards */
	
	delete z.gameSetup;
	
	if(z.preludes){
		z.dayDeck = [0,1,2,3,4];
		z.twilightDeck = [5,6,7,8,9];
		z.nightDeck = [10,11,12,13,14];
		shuffle(z.dayDeck);
		shuffle(z.twilightDeck);
		shuffle(z.nightDeck);
	}
	
	if(z.firstGame){
		for(let k = 0; !(k>=z.numPlayers); k++){
			for(let i = 0; !(i >= 5); i++) {
				for(let j = d.skillDraws[i ][getCharacter(z.players[k])]; j > 0; j--) {
					dealSkillCard(k, i);
				}
			}
		}
		textGameState(true);
		if(!z.fromTheAbyss){
			println("LOYALTY_DECK_SIZE_START",z.loyaltyDeck.length);
			for(let i = 0; !(i >= 5); i++) {
				for(let j = d.skillDraws[i ][getCharacter(z.players[z.turn])]; j > 0; j--) {
					dealSkillCard(z.turn, i);
				}
			}
			z.phase = 1;
			saveAndQuit();
		} else {
			z.gameSetup2 = true;
			boldAlert("ALLY_SETUP");
			saveAndQuit();
		}
	} else {
		z.gameSetup2 = true;
		
		textGameState(true);
		boldAlert("INITIAL_SKILL_DRAWS",z.players[z.turn]);
		saveAndQuit();
	}
}

function dealInitialLoyalties(){
	
	/* 17: Deal Loyalty Cards */
	
	println("LOYALTY_DECK_SIZE_START",z.loyaltyDeck.length);
	if(!z.firstGame){
		for(let i = 0; !(i >= z.numPlayers); i++) {
			z.loyaltyHands[i ].push(z.loyaltyDeck.pop());
		}
		println("LOYALTY_DECK_SIZE_AFTER_DEAL",z.loyaltyDeck.length);
	}
	delete z.gameSetup2;
	textGameState(true);
	startThatTurn();
	
}


function handlePreludes(){
	
	if(z.preludes){
		while(z.day > 0){
			z.day--;
			let prelude = z.dayDeck.pop();
			switch(d.preludeNames[prelude]){
				case "Favorable Conditions":
					z.travelTrack += 2;
					boldAlert("FAVORABLE_CONDITIONS");
					break;
				case "Outpace":
					z.deepOnes[1] = RESERVES;
					z.deepOnes[3] = RESERVES;
					z.deepOnes[4] = RESERVES;
					z.deepOnes[5] = RESERVES;
					boldAlert("OUTPACE");
					break;
				case "Respite":
					z.respite = true;
					boldAlert("RESPITE");
					break;
				case "Surplus":
					NoSPToken("Surplus");
					boldAlert("SURPLUS");
					return;
				case "Volunteer":
					boldAlert("VOLUNTEER",z.players[z.turn]);
					spawnAlly(z.playerLocations[z.turn]);
					shuffleBoons(4);
					break;
			}
		}
		while(z.twilight > 0){
			z.twilight--;
			let prelude = z.twilightDeck.pop();
			switch(d.preludeNames[prelude]){
				case "Cargo Raid":
					boldAlert("CARGO_RAID");
					for(let j = 0; !(j>=z.numPlayers); j++){
						drawItem(j);
					}
					break;
				case "Delegate Authority":
					boldAlert("DELEGATE_AUTHORITY");
					passCaptain(d.captainSuccession[getCharacter(z.players[z.captain])]);
					passKeeper(d.keeperSuccession[getCharacter(z.players[z.keeper])]);
					break;
				case "Preparation":
					boldAlert("PREPARATION");
					optionForAll("Preparation","",true);
					return;
				case "Spreading Rumors":
					boldAlert("SPREADING_RUMORS");
					z.spreadingRumors = true;
					z.spreadingRumorsDecks = [1,1,1,1,1,0,0];
					for(let j = 0; !(j>=5); j++){
						z.skillCardDecks[j].push(z.skillCardDecks[TREACHERY].pop());
						z.skillCardDecks[j].push(z.skillCardDecks[BOON].pop());
						shuffle(z.skillCardDecks[j]);
					}
					break;
				case "Valuable Lessons": {
					let featDeck = [];
					for(let j = 0; !(j>=d.featNames.length); j++){
						let found = false;
						for(let k = 0; !(k>=z.numPlayers); k++){
							if(z.feats[k][0] === d.featNames[j]){
								found = true;
								break;
							}
						}
						if(!found){
							featDeck.push([j,d.featNames[j]]);
						}
					}
					shuffle(featDeck);
					boldAlert("VALUABLE_LESSONS");
					for(let j = 0; !(j>=z.numPlayers); j++){
						let feats = featDeck.pop();
						boldAlert("VALUABLE_LESSONS_FEAT",[z.players[j],feats[1],d.characters[feats[0]]]);
						z.feats[j].push(feats[1]);
					}
					break;
				}
			}
		}
		while(z.night > 0){
			z.night--;
			let prelude = z.nightDeck.pop();
			switch(d.preludeNames[prelude]){
				case "Boarding Party":
					boldAlert("BOARDING_PARTY");
					spawnDeepOne(DECK+2);
					spawnDeepOne(DECK+3);
					if(z.spacePassengers[DECK+2].length > 0){
						z.spacePassengers[WATER+2].push(z.spacePassengers[DECK+2].pop());
					}
					if(z.spacePassengers[DECK+3].length > 0){
						z.spacePassengers[WATER+3].push(z.spacePassengers[DECK+3].pop());
					}
					break;
				case "Doom": {
					let horror = z.horrorDeck.pop();
					if(horror === OMINOUS_VISIONS){
						horror = z.horrorDeck.pop();
					}
					if(horror === SHOGGOTH){
						z.shoggoth = DECK;
						boldAlert("DOOM_SHOGGOTH");
					} else if(horror === GRASPING_TENDRIL){
						z.graspingTendril = WATER;
						boldAlert("DOOM_GRASPING_TENDRIL");
					} else if(horror === DROWNED_SPIRIT){
						z.drownedSpirit = DECK;
						boldAlert("DOOM_DROWNED_SPIRIT");
					}
					z.horrorDeck=[0,1,2,3];
					shuffle(z.horrorDeck);
					z.horror = -1;
					break; 
				}
				case "Emergence":
					boldAlert("EMERGENCE");
					z.father = WATER;
					z.mother = WATER+1;
					break;
				case "Malfunctions":
					if(damageShip("Malfunctions 1")){
						if(!damageShip("Malfunctions 2")){
							return;
						}
					} else {
						return;
					}
					break;
				case "Shortage":
					NoSPToken("Shortage");
					boldAlert("SHORTAGE");
					return;
			}
		}
		delete z.preludes;
	}
	
	dealInitialLoyalties();
	
}


function handReport() {
	let report = lc("HAND_REPORT_PRELUDE",[bold(titleList(me)),bold(z.players[me])])+"\r\n";
	for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
		report += cardText(z.skillCardHands[me][j]);
		report += "\r\n";
	}
	let excessCards = z.skillCardHands[me].length - 10;
	if(excessCards === 1) {
		report += lc("HAND_LIMIT_ALERT_3")+"\r\n";
	} else if(excessCards > 1){
		report += lc("HAND_LIMIT_ALERT_4",excessCards)+"\r\n";
	}
	report += "\r\n";

	if(z.items[me].length > 0){
		report += bold(lc("ITEM_REPORT"));
		for(let j = 0; !(j>=z.items[me].length); j++){
			report += "\r\n"+lc(d.itemNames[z.items[me][j]]);
			if(isImprovement(z.items[me][j])){
				if(z.items[me][j] === z.activeImprovements[me] || z.items[me][j] === z.valiseImprovement){
					report += " (active)";
				} else {
					report += " (inactive)";
				}
			}
		}
		report += "\r\n\r\n";
	}
	report += bold(lc("LOYALTY_PRELUDE"))+"\r\n";
	
	for(let j = 0; !(j >= z.loyaltyHands[me].length); j++) {
		report += lc(d.loyaltyNames[z.loyaltyHands[me][j]]) + "\r\n";
	}
	for(let j = 0; !(j >= z.loyaltyDiscards[me].length); j++) {
		report += strikethrough(lc(d.loyaltyNames[z.loyaltyDiscards[me][j]])) + "\r\n";
	}
	report += "\r\n";

	if(z.feats[me].length){
		for(let j = 0; !(j>=z.feats[me].length); j++){
			report += bold(lc(z.feats[me][j])) + "\r\n\r\n";
		}
	} else {
		report += bold(lc("USED_FEAT")) + "\r\n\r\n";
	}
	
	let mythosReport = "";
	if(z.barricade === me){
		mythosReport += "\r\n"+lc("Barricade the Hatches");
	}
	if(z.sacrifice === me){
		mythosReport += "\r\n"+lc("Sacrifice Deep One");
	}
	if(z.players[me] === "Arjun" && z.thePeacemaker){
		mythosReport += "\r\n"+lc("The Peacemaker");
	}
	if(z.players[me] === "William" && z.memoryOfTheDeep){
		mythosReport += "\r\n"+lc("Memory of the Deep");
	}
	if(z.players[me] === "Ishmael" && z.familyTies){
		mythosReport += "\r\n"+lc("Family Ties");
	}
	if(mythosReport){
		report += bold(lc("MYTHOS_REPORT"))+mythosReport+"\r\n\r\n";
	}
	if(z.fleshWard === me){
		report += bold(lc("FLESH_WARD_REPORT"))+"\r\n\r\n";
	}
	if(z.revelation === me){
		report += bold(lc("REVELATION_OF_SCRIPT_REPORT"))+"\r\n\r\n";
	}
	if(z.secretMessages[me].length > 0) {
		report += lc("SECRET_MESSAGE_PRELUDE")+"\r\n" + z.secretMessages[me];
	}
	return report;
}



var menuPage = "Default";
var firstPage = true;
var reGlobal = new RegExp(/\[size=(1|0)\]\[color=#(F4F4FF|FFFFFF)\](New|TMR) seed: \S+\[\/color\]\[\/size\]/, "g");
if(t === undefined) {
	window.localStorage.setItem("tmrUrgent", "out of context");
	alert("TMR only works while creating or editing a post on the BGG forums.");
	clearBackground();
} else {
	let foundOne = false;
	let foundTwo = false;
	var seed = null;
	for(let j = ts.length-1; j>=0; j--){
		let seedRE = reGlobal.exec(ts[j].value);
		if(seedRE !== null){
			if(foundOne){
				foundTwo = true;
				break;
			} else {
				seed = seedRE[0].slice(33,-15);
				t = ts[j];
				foundOne = true;
			}
		}
	}
	if(foundTwo){
		addAlert("You are quoting multiple TMR posts on this page; close all but one, or use the Legacy Editor, to continue.");
		seed = null;
		clearBackground();
	} else if(seed === null){
		window.localStorage.setItem("tmrUrgent", "blank post");
		confirmify("Would you like to start a new game?", clearBackground, gameSetup, "YES", "NO");
		seed = null;
	}
	if(seed !== null) {
		seed = window.atob(seed.replace(/-/g, ""));
		z = JSON.parse(seed);
		
		
		if(!versionsAtLeast(TMRversion, z.TMRversion)) {
			addAlert("You are using an out-of-date version of TMR!  Run TMR again to apply the update.");
			window.localStorage.setItem("tmrUrgent", "outdated");
			clearBackground();
		} else {
			if(!versionsAtLeast(z.TMRversion, TMRversion)) {
				z.TMRversion = TMRversion;
			}
			for(let j = 0; !(j >= z.numPlayers); j++) {
				if(z.usernames[j].toLowerCase() === myUsername.toLowerCase()) {
					me = j;
				}
			}
			if(me === -1) {

				addAlert(
					"You are not recognized as a player in this game!\nProceed only if you believe this to be in error, or you are replacing a player who resigned or disappeared."
					);
				let promptText = "What player number are you? (1-" + (z.numPlayers) +
					")\nProceed only if you know you are a player in the game (e.g. your username was misspelled, or you are replacing a player who resigned or disappeared).";
				for(let j = 0; !(j >= z.numPlayers); j++) {
					promptText += "\n" + (j + 1) + ": " + z.players[j];
				}
				promptNum(promptText, (a) => 1 > a || a > z.numPlayers, clearBackground, (prompted) => {
					me = prompted - 1;
					if(z.gameSetup && me > z.players.length) {
						addAlert("It is not yet your turn to pick a character.");
						clearBackground();
					} else if(z.gameSetup && z.players.length > me) {
						addAlert("Please wait for character selection to conclude.");
						clearBackground();
					} else if(z.gameSetup) {
						pickCharacter();
					} else {
						myPlayer = z.players[me];
						t.value += colorText("red", bold("This post did not process properly.  Please try again."));
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.feats[j] === 0){
								z.feats[j] = [];
							} else if(z.feats[j] === 1){
								z.feats[j] = [d.featNames[getCharacter(z.players[j])]];
							}
						}
						mainMenu();
					}
				});
				
			} else {
				if(z.gameSetup) {
					if(me > z.players.length) {
						addAlert("It is not yet your turn to pick a character.");
						clearBackground();
					} else if(z.players.length > me) {
						addAlert("Please wait for character selection to conclude.");
						clearBackground();
					} else {
						pickCharacter();
					}
				} else {
					myPlayer = z.players[me];
					t.value += colorText("red", bold("This post did not process properly.  Please try again."));
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.feats[j] === 0){
							z.feats[j] = [];
						} else if(z.feats[j] === 1){
							z.feats[j] = [d.featNames[getCharacter(z.players[j])]];
						}
					}
					mainMenu();
				}
			}
		}
	}
}

function canPlayActionCard() {
	if(z.revealedHybrids[me] === 1) {
		for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
			let name = cardName(z.skillCardHands[me][j]);
			switch(name){
				case "Reinforcements":
				case "Summon":
					return true;
				case "Call to Action":
					if(z.deepOnes.length > deepOnesAway()){
						return true;
					}
					break;
				case "Siren Song":
					if(z.passengerSupply.length > 0){
						return true;
					}
					break;
				case "Ransack":
					if(z.phase === 1 && z.turn === me && !z.noRansack && (z.playerLocations[me] === "Chapel" || z.playerLocations[me] === "Galley" || z.playerLocations[me] === "Boiler Room")){
						return true;
					}
					break;
				case "Perform Rites":
					if(z.phase === 1 && z.turn === me && !z.noRansack){
						return true;
					}
					break;
			}
		}
	}
	for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
		let name = cardName(z.skillCardHands[me][j]);
		switch (name) {
			case "Coordinated Effort":
			case "Inspiring Speech":
			case "Watch and Learn":
			case "Providence":
				return true;
			case "Companion":
				return z.allyDeck.length > 0 && z.playerLocations[me] !== "Brig" && z.playerLocations[me] !== "Sick Bay";
			case "Persistence":
				if(z.skillCardHands[me].length > 1 || z.players[me] === "Ida" && !z.revealedHybrids[me]){
					return true;
				}
				break;
			case "True Grit":
				if(z.trueGrit){
					return true;
				}
				break;
			case "Shrivelling": {
				for(let j = 0; !(j>=z.revealedHybrids.length); j++){
					if(z.revealedHybrids[j] !== z.revealedHybrids[me]){
						return true;
					}
				}
				if(!z.revealedHybrids[me] && z.deepOnes.length > deepOnesAway()){
					return true;
				}
				if(!z.revealedHybrids[me] && (z.shoggoth > RESERVES || z.drownedSpirit > RESERVES || z.graspingTendril > RESERVES)){
					return true;
				}
				if(z.players[me] === "Ida" && !z.revealedHybrids[me]){
					return true;
				}
				break;
			}
			case "Lesser Banishment": 
				if(z.deepOnes.length > deepOnesAway()){
					return true;
				}
				if(z.players[me] === "Ida" && !z.revealedHybrids[me]){
					return true;
				}
				break;
			case "Rampage":
				if((enemiesInMySpace() || (enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me)) && (!z.thePeacemaker || z.players[me] !== "Arjun")){
					return true;
				}
				if(itemPresent("Flare Gun") && itemHolder("Flare Gun") === me){
					return true;
				}
				if(z.players[me] === "Ida" && !z.revealedHybrids[me]){
					return true;
				}
				break;
		}
	}
	return false;
}

function canAnyoneAction() {
	return z.phase === 1 || z.phase === 2 || z.xo1 >= 0 || z.trueGritBonus >= 0 || z.loyalAssistant >= 0 || z.cadet >= 0;
}

function didAction() {
	/* 
	z.phase: 
	0: draw skill cards
	1: first action
	2: second action
	3: mythos step
	*/
	z.noRansack = true;
	if(me === z.trueGritBonus) {
		delete z.trueGritBonus;
	} else if(me === z.xo1) {
		delete z.xo1;
	} else if(me === z.loyalAssistant){
		delete z.loyalAssistant;
	} else if(me === z.cadet){
		delete z.cadet;
	} else if(z.phase === 2 && me === z.turn) {
		z.phase = 3;
	} else if(z.phase === 1 && me === z.turn) {
		z.phase = 2;
	}
}

function canWatch(){
	if(z.players[me] !== "Sardaana" || z.watch || z.revealedHybrids[me] || z.playerLocations[me] === "Brig"){
		return false;
	}
	if(z.playerLocations[me] !== "Bridge"){
		return true;
	}
	for(let j = 0; !(j>=z.spacePassengers.length); j++){
		if(z.spacePassengers[j].length > 0){
			return true;
		}
	}
	if(z.cadet === me){
		return true;
	}
	return false;
}

function canSeaLegs(){
	if(z.players[me] !== "Mui Choo" || z.seaLegs || z.revealedHybrids[me] || z.playerLocations[me] === "Brig"){
		return false;
	}
	for(let j = DECK; !(j>=SICK_BAY); j++){
		for(let k = 0; !(k>=z.deepOnes.length); k++){
			if(z.deepOnes[k] === j && (d.spaceNames[j] !== z.playerLocations[me] || z.cadet === me)){
				return true;
			}
		}
	}
	if((z.shoggoth >= DECK && (d.spaceNames[z.shoggoth] !== z.playerLocations[me] || z.cadet === me)) || (z.drownedSpirit >= DECK && (d.spaceNames[z.drownedSpirit] !== z.playerLocations[me] || z.cadet === me)) || 
	   (z.graspingTendril > RESERVES && (d.spaceNames[z.graspingTendril+8] !== z.playerLocations[me] || z.cadet === me))){
		return true;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== "Sick Bay" && z.revealedHybrids[j] && (z.playerLocations[j] !== z.playerLocations[me] || z.cadet === me)){
			return true;
		}
	}
	return false;
}

function canLoyalAssistant(player){
	if(player === undefined){
		player = me;
	}
	let any = false;
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[player] === z.playerLocations[j] && !z.revealedHybrids[j] && j !== player){
			any = true;
			break;
		}
	}
	if(!any || z.playerLocations[player] === "Brig"|| z.players[player] !== "Raúl" || z.revealedHybrids[player] || player !== z.turn || z.loyalAssistantUsed){
		return false;
	}
	if(((z.phase === 1 && !z.noRansack) || z.phase === 3) && !z.gameSetup2 && z.xo1 === undefined && z.trueGritBonus === undefined && !z.midAction && z.dieRollQueue.length === 0 &&
	   anyMandatory().length === 0 && z.lastDieRoll === null){
		return true;
	}
	return false;
}

function canActivateLocation(player, location) {
	if(z.dieRollQueue.length > 0) {
		return false;
	}
	if(z.revealedHybrids[player] === 1){
		return false;
	}
	if(isLocationDamaged(location)) {
		return false;
	}
	if(location === "Sick Bay" || location.startsWith("Deck")){
		return false;
	} 
	for(let j = 0; !(j>=z.playerLocations.length); j++){
		if(z.revealedHybrids[j] === 1 && z.playerLocations[j] === location && location !== "Brig"){
			return false;
		}
	}
	for(let j = 0; !(j>=z.deepOnes.length); j++){
		if(d.spaceNames[z.deepOnes[j]] === location){
			return false;
		}
	}
	if(z.fromTheAbyss && (d.spaceNames[z.shoggoth] === location || d.spaceNames[z.drownedSpirit] === location)){
		return false;
	}
	
	if(z.activatedLocations[locationIndex(location)]){
		return false;
	}
	if(location === "Cargo Hold"){
		if(z.itemDeck.length === 0){
			return false;
		}
	}
	if(location === "Bridge"){
		if(z.passengerSupply.length === 0){
			return false;
		}
	}
	if(location === "Chapel" && z.ritualTrack === 0){
		let lore = false;
		for(let j = 0; !(j>=z.skillCardHands[player].length); j++){
			if(cardColorID(z.skillCardHands[player][j]) === LORE || cardName(z.skillCardHands[player][j]) === "Ingenuity"){
				lore = true;
				break; 
			}
		}
		if(!lore){
			return false;
		}
	}
	
	if(location === "Boiler Room"){
		let strength = false;
		for(let j = 0; !(j>=z.skillCardHands[player].length); j++){
			if(cardColorID(z.skillCardHands[player][j]) === STRENGTH || cardName(z.skillCardHands[player][j]) === "Ingenuity"){
				strength = true;
				break;
			}
		}
		if(!strength){
			return false;
		}
	}
	
	return true;
}

function doneWithRevealEffect(player){
	if(z.loyaltyHands[player].length > 0 && 12 > z.distance && !z.gameOver){
		addOption(player,"Pass your remaining Loyalty cards to a Human of your choice","Reveal",true);
	} else {
		loseTitleFeatMythos(player);
	}
}

function doneWithRepel(context){
	
	if(context === "Disappearing Food"){
		clearSkillCheck();
	} else if(context === "Cast Out" || context === "Cast Out (bis)"){
		return;
	} else if (context[2] === "Storm of Spirits"){
		if(context[3] === 7){
			SPTokenBad("Storm of Spirits",7);
		} else {
			addOption(getPlayerNum(context[0]),"Repel a Horror",context,true);
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j]){
					addOption(getPlayerNum(context[0]),"Defeat a Deep One",context,true);
					break;
				}
			}
			addOption(getPlayerNum(context[0]),"I'm done defeating monsters",context,true);
		}
	} else if(context[2] === "Shrivelling"){
		finishedAction();
		if(itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === getPlayerNum(context[0]) && z.elderSignAmulet){
			let any = false;
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(z.revealedHybrids[j] !== z.revealedHybrids[getPlayerNum(context[0])]){
					any = true;
					break;
				}
			}
			if(!z.revealedHybrids[getPlayerNum(context[0])]){
				any |= z.deepOnes.length > deepOnesAway();
				any |= z.shoggoth > RESERVES;
				any |= z.graspingTendril > RESERVES;
				any |= z.drownedSpirit > RESERVES;
			}
			if(any){
				plainAlert("ELDER_SIGN_AMULET_SHRIVELLING_ALERT",context[0],getGender(getPlayerNum(context[0])));
				addOption(getPlayerNum(context[0]),"[Shrivelling] Target an enemy","Elder Sign Amulet",false);
			}
		}
		notebookCheck(z.notebookCard,getPlayerNum(context[0]));
		season(getPlayerNum(context[0]),LORE);
		delete z.elderSignAmulet;
	} else if(context[2] === "To Arms!"){
		doneWithChoiceMythos();
	} else if(context[2] === "Summon the Beast Within"){
		let any = false;
		if(d.spaceName[z.shoggoth] === z.playerLocations[getPlayerNum(context[0])] && !context[3].includes("Shoggoth")){
			any = true;
		}
		if(d.spaceName[z.drownedSpirit] === z.playerLocations[getPlayerNum(context[0])] && !context[3].includes("Drowned Spirit")){
			any = true;
		}
		if(d.spaceName[z.graspingTendril] === z.playerLocations[getPlayerNum(context[0])] && !context[3].includes("Grasping Tendril")){
			any = true;
		}
		if(any){
			addOption(getPlayerNum(context[0]),"Repel a Horror",context,true);
		}
	} else if(context[2] === "Jam Tin Grenade" || context[2] === "Don the Mask"){
		let any = false;
		if(d.spaceName[z.shoggoth] === context[4] && !context[3].includes("Shoggoth")){
			any = true;
		}
		if(d.spaceName[z.drownedSpirit] === context[4] && !context[3].includes("Drowned Spirit")){
			any = true;
		}
		if(d.spaceName[z.graspingTendril] === context[4] && !context[3].includes("Grasping Tendril")){
			any = true;
		}
		if(any){
			addOption(getPlayerNum(context[0]),"Repel a Horror",context,true);
		} else {
			let goodToGo = true;
			for(let j = 0; !(j>=z.playerLocations.length); j++){
				let k = (z.turn + j) % z.numPlayers;
				if(z.playerLocations[k] === context[4]){
					goodToGo = defeat(k,[context[2],context[4]]) && goodToGo;
				}
			}
			let index = locationIndex(context[4]);				
			if(z.spacePassengers[index].length > 0){
				
				let medicalIntervention = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
						medicalIntervention = true;
						break;
					}
				}
				let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")], context[4]);
				
		
				if(goodToGo && !medicalIntervention && !travelPharmacy){
					while(z.spacePassengers[index].length > 0 && goodToGo){
						goodToGo = defeatPassenger(z.spacePassengers[index].pop());
					}
				} else {
					boldAlert("JAM_TIN_GRENADE_PASSENGERS_DEFEAT_ALERT",context[4]);
					if(travelPharmacy){
						plainAlert("TRAVEL_PHARMACY_JAM_TIN_GRENADE_ALERT",[z.players[itemHolder("Travel Pharmacy")],context[4]],getGender(itemHolder("Travel Pharmacy")));
						addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",[context[2],index,0],false);
					}
					if(medicalIntervention){
						plainAlert("MEDICAL_INTERVENTION_JAM_TIN_GRENADE_ALERT");
						addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",[context[2],index,0],false);
					}
					optionForAll("Defeat a passenger in a space",[context[2],index,0],false);	
				}
			}
			if(z.fromTheAbyss && (goodToGo || !characterPresent("Guillaume"))){
				for(let j = 0; !(j>=z.allies.length); j++){
					if(context[4] === z.allies[j][1]){
						if(characterPresent("Guillaume")){
							plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
							z.guillaumeAllies.push(z.allies[j][0]);
						} else {
							plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
							
						}
						z.allies.splice(j,1);
						j--;
					}
				}
				if(z.guillaumeAllies.length > 3){
					boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
					addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game",[context[2],context[4]],true);
					goodToGo = false;
				}
			}
				
			if(index >= INTERIOR && INTERIOR+6 > index && !isLocationDamaged(context[4]) && context[2] === "Jam Tin Grenade"){
				if(goodToGo){
					if(damageLocation(context[4],undefined,"Jam Tin Grenade")){
						finishedAction();
					}
				}
			} else if(goodToGo){
				finishedAction();
			}
		}
	} else {
		doneWithAttack(context);
	}
	
}

function canFlareGunAlert(player){
	if(player === undefined){
		player = me;
	}
	if(!itemPresent("Flare Gun") || itemHolder("Flare Gun") !== player){
		return false;
	}
	for(let j = 0; !(j>=z.numPlayers); j++){
		if(z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== z.playerLocations[player]){
			return true;
		}
	}
	return false;
}

function mainMenu() {

	if(!z.hasOwnProperty("determinationCOs")){
		z.determinationCOs = [];
	}
	if(!z.hasOwnProperty("xoPerformers")){
		z.xoPerformers = [];
	}
	
	let options = [];


	options.push("Show Hand Report");
	options.push("Display Game State");
	if(mobile) {
		options.push("Add text after your post (and quit)");
	}
	
	/* TODO: if you're the last person to pass on interrupts, automatically play in destiny */ /* TODO: closequote tag for easier cleanup */

	if(z.round === 1 && z.turn === 0 && me !== 0 && z.skillCardHands[me].length === 0 && z.currentMythos === null && z.currentSkillCheck === null && z.skillCardDiscards[0].length === 0 && z.skillCardDiscards[1].length === 0 && z.skillCardDiscards[2].length === 0 && z.skillCardDiscards[3]
		.length === 0 && z.skillCardDiscards[4].length === 0 && (z.skillCardDiscards.length === 5 || z.skillCardDiscards[5].length === 0)) {
		options.push("Draw initial Skill Cards");
	}
	if((z.dieRollQueue.length === 0 || z.dieRollQueue[0] !== "Flesh Ward") && z.lastDieRoll !== "Flesh Ward"){
		if(canHealingWords()){
			options.push("Healing Words");
		}
		if(canMedicalInterventionCharacter()){
			options.push("Medical Intervention (character)");
		}
		if(canSacrificeStarbuck()){
			options.push("Sacrifice Starbuck");
		}
		if(canResolveDefeatHuman()){
			options.push("Move a character to Sick Bay");
		}
		if(canResolveDefeatTraitor()){
			options.push("Move a player to the Brig");
		}
		if(canResolveFleshWard()){
			options.push("Trigger Flesh Ward");
		}
		if(canShrugItOff()){
			options.push("Play a Shrug It Off");
		}
	}
	


	if(z.dieRollQueue.length > 0 && z.lastDieRoll === null && !z.spToken) {
		options.push("Ask for a Keen Insight");
	} 
	
	if(z.dieRollQueue.length > 0 && z.lastDieRoll === null) {
		for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
			if(cardName(z.skillCardHands[me][j]) === "Keen Insight"){
				options.push("Play a Keen Insight");
				break;
			}
		}
		if(z.sps[me].length === 0 && z.spToken) {
			options.push("Pass on Keen Insight");
		}
	}

	if(canAlmanac()){
		options.push("Almanac");
	}
	

	if(z.dieRollQueue.length > 0 && z.lastDieRoll === null) {
		options.push("Roll a die for " + lc(z.dieRollQueue[0],z.dieRollParams[0]));
	}
	if(z.lastDieRoll !== null) {
		options.push("Process the outcome of the die roll");
	}
	options = options.concat(z.mythosOptions[me]);
	if(z.currentSkillCheck !== null) {
		if(checkNotStarted()) {
			if(interruptChoices().length > 0) {
				options.push("Play an interrupt for this skill check");
			}
			if(z.interrupts[me].length === 0) {
				options.push("Pass on interrupts for this skill check");
			} /* TODO: fix guts / tank bug!! (still present?) */
			if(!z.tank[me]) {
				options.push("TANK this skill check");
			}
			if(z.skillCheckCards[z.numPlayers].length !== 2 && z.chaos.length >= 1 && !z.preparation && z.revealedCards.length === 0) {
				options.push("Play Chaos into skill check");
			} else {
				options.push("Display the skill check token");
			}
		} /* TODO: check if this is working properly. */ /* TODO: check if you can use this during the skill check */ /* TODO: really check this is cancelled properly by a play in */ /* TODO: check you can do this before the skill check starts... */
		if(!z.skillCheckRevealed){
			let any = false;
			if(z.players[me] === "Keilani" && z.skillCardHands[me].length > 0 && z.revealedHybrids[me] === 0 && z.playerLocations[me] !== "Brig"){
				any = true;
			}
			if(itemPresent('"Lucky" Ring') && itemHolder('"Lucky" Ring') === me){
				any = true;
			}
			if(z.revelation === me){
				any = true;
			}
			if(z.feats[me].includes("Well Equipped") && !z.revealedHybrids[me] && z.items[me].length > 0 && z.playerLocations[me] !== "Brig"){
				any = true;
			}
			if(z.feats[me].includes("Revelation") && !z.revealedHybrids[me] && z.skillCardHands[me].length > 0 && z.playerLocations[me] !== "Brig"){
				any = true;
			}
			if(z.feats[me].includes("Instinct") && !z.revealedHybrids[me] && z.playerLocations[me] !== "Brig"){
				any = true;
			}
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardName(z.skillCardHands[me][j]) === "Determination"){
					any = true;
					break;
				}
			}
			if(any){
				options.push("Submit Conditional Order for a post-skill check ability");
			}
			
		}
		if(!z.skillCheckRevealed && (!(z.contributingPlayer >= (me - z.turn - 1 + z.numPlayers) % z.numPlayers) || (z.contributingPlayer === 0 && (z.turn + 1) % z.numPlayers ===
				me))) {
			if(z.tank[me]) {
				options.push("Cancel your TANK order");
			} else if(!options.includes("TANK this skill check")) {
				options.push("TANK this skill check");
			}
		} else if(z.tank[me] && !z.skillCheckRevealed){
			let contributingMe = (me - z.turn - 1 + z.numPlayers);
			let good = true;
			for(let j = z.contributingPlayer - 1; j > contributingMe; j--){
				if(!autoPass(j)){
					good = false;
				}
			}
			if(good){
				options.push("Cancel your TANK order");
			}
			
		}
		if((z.skillCheckCards[z.numPlayers].length === 2 || z.preparation ) && canIContribute()) {
			options.push("Play a card into the skill check");
		} 
		if((z.skillCheckCards[z.numPlayers].length === 2 || z.preparation ) && canIContribute() && z.skillCheckCards[me].length === 0) {
			options.push("Pass on the skill check");
		}
		if(z.skillCheckCards[me].length > 0 && !z.nothingToHide && z.contributionLabels[me] === "") {
			options.push("Specify strength of your contribution to the skill check");
		}
		if(z.contributingPlayer === z.numPlayers && !z.skillCheckRevealed) {
			options.push("Reveal cards from skill check");
		}
		/* URULES: UTODO: order of Experienced && Revelation vs. below */
		if(z.players[me] === "Keilani" && z.playerLocations[me] !== "Brig" && !z.revealedHybrids[me] && z.skillCheckRevealed && z.skillCardHands[me].length > 0 && !z.experienced) {
			/* UTODO: remove this once you start processing the skill check */
			options.push("Experienced");
		}
		
		if(z.skillCheckRevealed && !z.processedOutcome){
			if(!z.deToken){
				options.push("Ask for a Determination");
			} else if(z.des[me].length === 0){
				options.push("Pass on Determination");
			}
			if(itemPresent('"Lucky" Ring') && itemHolder('"Lucky" Ring') === me && !z.luckyRing){
				options.push('"Lucky" Ring');
			}
			if(z.feats[me].includes("Well Equipped") && z.playerLocations[me] !== "Brig" && z.items[me].length > 0){
				options.push("Well Equipped [Feat]");
			}
			if(z.feats[me].includes("Revelation") && z.playerLocations[me] !== "Brig" && z.skillCardHands[me].length > 0){
				options.push("Revelation [Feat]");
			}
			if(z.feats[me].includes("Instinct") && z.playerLocations[me] !== "Brig" && !z.instinct && z.dieRollQueue.length === 0 && z.lastDieRoll === null){
				options.push("Instinct [Feat]");
			}
			if(z.revelation === me){
				options.push("Revelation of Script");
			}
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardName(z.skillCardHands[me][j]) === "Determination"){
					options.push("Play a Determination");
					break;
				}
			}
		}
		if(!z.processedOutcome && z.skillCheckRevealed) {
			options.push("Process outcome of this skill check");
		}
	}
	if(menuPage === "Default") {
		if(z.players[me] === "Edmund" && z.skillCardHands[me].length > 0 && !z.revealedHybrids[me] && z.playerLocations[me] !== "Brig" && z.lastDieRoll !== null && !z.perfectNumber) {
			options.push("Fortunate Son");
		}
		if(itemPresent("Maau") && itemHolder("Maau") === me && (z.turn === me || z.actionPerformer === me || z.xoPerformers.includes(me)) && z.lastDieRoll !== null && !z.maau){
			options.push("Maau");
		}
		if(canBaseballBat() && itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === me){
			options.push("[Baseball Bat] Increase the die roll");
		}
		if(itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === me && z.lastDieRoll !== null && z.pocketPistol && !z.perfectNumber) {
			options.push("[Pocket Pistol] Reroll the die");
		}
		if(canUncannyLuck() && z.lastDieRoll !== null && !z.perfectNumber){
			options.push("[Uncanny Luck] Reroll the die");
		}
		if(canCombatTraining() && !z.perfectNumber){
			options.push("Play a Combat Training");
		}
		

		if(me === z.barricade){
			options.push("Barricade the Hatches");
		}
		
		if(canSpiritBoard()){
			options.push("Spirit Board");
		}
		
		if(canLoyalAssistant()){
			options.push("Loyal Assistant");
		}
		
		if((((me === z.turn && !z.gameSetup2 && (z.phase === 1 || z.phase === 2) && z.xo1 === undefined && z.trueGritBonus === undefined &&
              z.cadet === undefined && z.loyalAssistant === undefined) || 
		   (me === z.trueGritBonus) || (me === z.xo1) || (me === z.cadet) || (me === z.loyalAssistant)) && !z.midAction && z.dieRollQueue.length === 0 && anyMandatory().length === 0 && 
		   z.lastDieRoll === null) || z.emergencyAction) {


			/* bonus action granters: character abilities then items*/			
			if(z.quickDraw && z.players[me] === "Jamie" && !z.revealedHybrids[me]){
				if(enemiesInMySpace() && itemPresent("Six-Shooter") && itemHolder("Six-Shooter") === me){
					options.push("[Quick Draw] [Six-Shooter] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === me){
					options.push("[Quick Draw] [Pocket Pistol] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Shotgun") && itemHolder("Shotgun") === me){
					options.push("[Quick Draw] [Shotgun] Attack an enemy");
				}
				if(enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me){
					options.push("[Quick Draw] [Repeating Rifle] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Fillet Knife") && itemHolder("Fillet Knife") === me){
					options.push("[Quick Draw] [Fillet Knife] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === me){
					options.push("[Quick Draw] [Baseball Bat] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Flare Gun") && itemHolder("Flare Gun") === me && !z.flareGun){
					options.push("[Quick Draw] [Flare Gun] Attack an enemy");
				}
				if(canFlareGunAlert() && !z.flareGun){
					options.push("[Quick Draw] [Flare Gun] Alert another character");
				}
			}
			if(z.players[me]==="Arjun" && z.deckChief && !z.revealedHybrids[me] && z.playerLocations[me] !== "Brig"){
				options.push("Deck Chief");
			}
			if(canWatch()){
				options.push("Watch");
			}
			if(canSeaLegs()){
				options.push("Sea Legs");
			}
			if(itemPresent("Plimsolls") && itemHolder("Plimsolls") === me && z.plimsolls){
				options.push("Plimsolls");
			}
			if(z.players[me]==="William" && z.occultTraining && z.playerLocations[me] !== "Brig" && !z.revealedHybrids[me]){
				options.push("Occult Training");
			}
			if(enemiesInMySpace() && itemPresent("Starbuck") && itemHolder("Starbuck") === me && z.starbuck && (!z.thePeacemaker || z.players[me] !== "Arjun")){
				options.push("[Starbuck] Attack an enemy");
			}
			if(canBookOfDagon()){
				options.push("Book of Dagon");
			}
			
			if(canWhistleMove()){
				options.push("[Whistle] Move an Ally");
			}
			if(canWhistleSpawn()){
				options.push("[Whistle] Spawn an Ally");
			}
			if(canUseAlly() && !hasOption(me,"Use an Ally") && z.cadet !== me){
				options.push("Use an Ally");
			}
			if(canLostSouls() && !hasOption(me,"Lost Souls")){
				options.push("Lost Souls");
			}

			/* Move */
			if(!hasOption(me,"Move") && z.playerLocations[me] !== "Brig" && z.cadet !== me){
				options.push("Move");
			}
			
			if(canBreakOut()){
				options.push("Discard skill cards to leave the Brig");
			}

			/* Attack an enemy */		
			if(!z.thePeacemaker || z.players[me] !== "Arjun"){
				if(enemiesInMySpace() && itemPresent("Six-Shooter") && itemHolder("Six-Shooter") === me && !hasOption(me,"[Six-Shooter] Attack an enemy")){
					options.push("[Six-Shooter] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === me && !hasOption(me,"[Pocket Pistol] Attack an enemy")){
					options.push("[Pocket Pistol] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Shotgun") && itemHolder("Shotgun") === me && !hasOption(me,"[Shotgun] Attack an enemy")){
					options.push("[Shotgun] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Fillet Knife") && itemHolder("Fillet Knife") === me && !hasOption(me,"[Fillet Knife] Attack an enemy")){
					options.push("[Fillet Knife] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === me && !hasOption(me,"[Baseball Bat] Attack an enemy")){
					options.push("[Baseball Bat] Attack an enemy");
				}
				if(enemiesInMySpace() && itemPresent("Flare Gun") && itemHolder("Flare Gun") === me && !hasOption(me,"[Flare Gun] Attack an enemy") && !z.flareGun){
					options.push("[Flare Gun] Attack an enemy");
				}
				if(enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me && !hasOption(me,"[Repeating Rifle] Attack an enemy")){
					options.push("[Repeating Rifle] Attack an enemy");
				}
				if(enemiesInMySpace() && !hasOption(me,"Attack an enemy") && z.cadet !== me){
					options.push("Attack an enemy");
				}
			}
			if(canFlareGunAlert() && !hasOption(me,"[Flare Gun] Alert another character") && !z.flareGun){
				options.push("[Flare Gun] Alert another character");
			}
			if(itemPresent("Jam Tin Grenade") && itemHolder("Jam Tin Grenade") === me){
				options.push("Jam Tin Grenade");
			}
			/* Rescue a passenger */
			if(canSpeakingTrumpet()){
				options.push("Speaking Trumpet");
			}
			if(canRescue() && z.cadet !== me){
				options.push("Rescue a Passenger");
			}
			if(canDefeatPassenger()){
				options.push("Defeat a passenger in a space");
			}
			/* Enable trading */
			if(canEnableTrade() && z.cadet !== me){
				options.push("Enable trading in your space");
			}
			/* other character abilities */
			if(canFirstOath()){
				options.push("First Oath of Dagon");
			}
			if(z.players[me]==="Samira" && 4 >= z.items[me].length && !z.revealedHybrids[me] && z.playerLocations[me] !== "Brig" && z.scavenger){
				options.push("Scavenger");
			}
			/* skill cards */
			if(canPlayActionCard()) {
				options.push("Play an Action Skill Card");
			}

			
			/* titles */
			if(z.keeper === me && z.keeperAction && z.spellDeck.length > 0){
				if(z.fromTheAbyss){
					options.push("[Keeper of the Tome] Look at 3 Spells");
				} else {
					options.push("[Keeper of the Tome] Look at 2 Spells");
				}
			}
			if(z.players[me] === "William" && z.memoryOfTheDeep){
				options.push("Memory of the Deep");
			}
			if(canSacrificeDeepOne()){
				options.push("Sacrifice Deep One");
			}
			
			/* Feats */
			if(z.playerLocations[me] === "Boiler Room" && z.feats[me].includes("Full Steam Ahead")){
				options.push("Full Steam Ahead [Feat]");
			}		
			if(canArrestOrder()){
				options.push("Arrest Order [Feat]");
			}
			if(z.feats[me].includes("Quick Cast") && me === z.keeper && z.spellDeck.length > 0){
				options.push("Quick Cast [Feat]");
			}
			if(z.feats[me].includes("Deep One Ancestry")){
				options.push("Deep One Ancestry [Feat]");
			}
			
			if(z.feats[me].includes("Popular Support") && z.playerLocations[me] !== "Brig" && z.playerLocations[me] !== "Sick Bay"){
				options.push("Popular Support [Feat]");
			}
			if(z.feats[me].includes("Unfinished Business") && z.playerLocations[me] !== "Brig" && (z.allyDeck.length > 0 || z.guillaumeAllies.length > 0)){
				options.push("Unfinished Business [Feat]");
			}
			if(z.feats[me].includes("Don the Mask") && z.playerLocations[me] !== "Brig"){
				options.push("Don the Mask [Feat]");
			}
			
			/* space activation */
			if(canActivateLocation(me, z.playerLocations[me]) && z.cadet !== me) {
				options.push("Activate " + z.playerLocations[me]);
			}
			if(canToolKit()){
				options.push("Tool Kit");
			}
			if(canRepair() && z.cadet !== me){
				options.push("Repair Damage");
			}
			if(canValise()){
				options.push("Valise");
			}
			if(itemPresent("Ritual Candles") && itemHolder("Ritual Candles") === me){
				options.push("Ritual Candles");
			}
			/* UTODO: update revealing more */
			if(canReveal() && z.cadet !== me) {
				options.push("Reveal as a Traitor");
			}
			/* URULES: is this legal? */
			options.push("Do Nothing");

			
		}
		if(!z.gameSetup2 && !canAnyoneAction()  && !z.midAction && z.phase === 3 && !z.revealedHybrids[z.turn] && z.currentMythos === null && 
			z.currentSkillCheck === null && z.spellPeeker === -1 && z.dieRollQueue.length === 0 && z.lastDieRoll === null && z.travelTrack !== 4 &&
			!canResolveDefeatHuman() && !canResolveDefeatTraitor() && !canResolveFleshWard() && anyMandatory().length === 0) {
				
			if(z.respite){
				options.push("Respite");
			} else if(z.players[z.turn] === "Beatrice" && z.playerLocations[z.turn] !== "Brig") {
				if(z.players[me] === "Beatrice") {
					options.push("Predictive Analytics");
				}
			} else {
				options.push("Play the top Mythos");
			}
		}
		if(z.dieRollQueue.length > 0 && z.playerLocations[me] !== "Brig" && z.feats[me].includes("Perfect Number")) {
			/* UTODO: CO for Perfect Number */
			options.push("Perfect Number [Feat]");
		}
		if(z.dieRollQueue.length > 0 && canEldritchInfluence()) {
			options.push("Eldritch Influence");
		}
		if(z.feats[me].includes("Uncanny Fortune") && z.revealedHybrids[me] === 0 && z.currentMythos !== null && 
		   z.currentSkillCheck === null && !z.finishedMythos && z.phase === 4 && 
		  (d.currentPlayerChooses[z.currentMythos] || d.captainChooses[z.currentMythos] || d.keeperChooses[z.currentMythos] || 
		   d.namedPlayerChooses[z.currentMythos] !== "" || z.playerLocations[z.turn] === "Brig")) {
			   
			options.push("Uncanny Fortune [Feat]");
		}

		/* TODO: allow end turn only in late phase (execution a concern, though, as XO/SoE may need to wrap up. */
		if(z.currentSkillCheck === null && !z.midAction && anyMandatory().length === 0 && z.dieRollQueue.length === 0 && 
			(z.finishedMythos || (z.phase === 3 && z.revealedHybrids[z.turn] === 1))) {
				
			if(z.skillCardHands[me].length > 10 && !hasOption(me, "Discard a Skill Card")) {
				options.push("Discard a Skill Card");
			}
			options.push("End Turn");
		}
		if(z.currentMythos !== null && z.currentSkillCheck === null && !z.finishedMythos && d.difficulty[z.currentMythos] > 0 &&
		   ((!z.spreadMisfortune && ((z.turn === me && d.currentPlayerChooses[z.currentMythos]) || 
									  d.namedPlayerChooses[z.currentMythos] === z.players[me] ||
									 (z.captain === me && d.captainChooses[z.currentMythos]) ||
									 (z.keeper === me && d.keeperChooses[z.currentMythos]))) ||
		   (z.spreadMisfortune && z.players[me] === "Edmund"))) {
			
			if(z.spreadMisfortune){
				options.push("Choose the Fail on this mythos");
			} else {
				options.push("Choose the Skill Check on this mythos");
			}
			/* UTODO: use the names of the OR, top, bottom */
			options.push("Choose the OR on this mythos");
			if(z.feats[me].includes("Unconventional Leader")){
				options.push("Unconventional Leader [Feat]");
			}
		}
		
		if(z.currentMythos !== null && z.currentSkillCheck === null && !z.finishedMythos && d.difficulty[z.currentMythos] === 0 &&
		   ((!z.spreadMisfortune && ((z.turn === me && d.currentPlayerChooses[z.currentMythos]) || 
									  d.namedPlayerChooses[z.currentMythos] === z.players[me] ||
									 (z.captain === me && d.captainChooses[z.currentMythos]) ||
									 (z.keeper === me && d.keeperChooses[z.currentMythos]))) ||
		   (z.spreadMisfortune && z.players[me] === "Edmund"))) {
			   
			   
			if(hasLore() || (d.mythosNames[z.currentMythos] !== "Poisoned Food" && d.mythosNames[z.currentMythos] !== "Ritual Support")){
				options.push("Choose the top option on this mythos");
			}
			options.push("Choose the bottom option on this mythos");
			if(z.feats[me].includes("Unconventional Leader")){
				options.push("Unconventional Leader [Feat]");
			}
		}
		options.push("[Settings and Conditional Orders]");
	} else if(menuPage === "[Settings and Conditional Orders]") {
		/* TODO: 600px wide image above textGameState */
		options.push("View the top card of each discard pile");
		if(z.waypointDiscards.length > 0){
			options.push("View visited Waypoints");
		}
		for(let j = 0; !(j>=z.loyaltyDiscards.length); j++){
			if(z.loyaltyDiscards[j].length > 0){
				options.push("View discarded Loyalty cards");
				break;
			}
		}
		options.push("Submit Conditional Order for a rare action");
		if(z.currentSkillCheck !== null && !z.skillCheckRevealed){
			options.push("Submit Conditional Order for a post-skill check ability");
		}
		if(z.secretMessages[me].length > 0) {
			options.push("Delete your secret messages");
		}
		if(z.uncannyLuck === me){
			/* ATODO: better optional option */
			options.push("Roll a die for Uncanny Luck");
		}
		options.push("Print your hand report in a spoiler (and quit)");
		options.push("Change your default banner");
		options.push("Change dialog display style");
		options.push("Check for TMR updates");
		options.push("[I still can't find what I'm looking for]");
	} else if(menuPage === "[I still can't find what I'm looking for]") {
		options.push("Move");
		
		options.push("Allow players to take actions out of turn this turn");
		options.push("Make all options non-mandatory");
		options.push("Draw 1 Skill Card (not treachery/boon)");

		if(z.skillCardHands[me].length > 0) {
			options.push("Discard a Skill Card");
		}

		options.push("Move a player to the Brig");
		options.push("Move a character to Sick Bay");

		options.push("Increase a resource");
		options.push("Decrease a resource");
		if(z.travelTrack !== 4) {
			options.push("Advance the Travel Track");
		}

		if(z.passengerSupply.length > 0) {
			options.push("Risk a passenger");
			options.push("Defeat a Passenger in the supply");
		}

		options.push("Change my username");
		options.push("Advance the Ritual Track");
		if(z.ritualTrack !== 0){
			options.push("Retreat the Ritual Track");
		}


		options.push("Activate Mother Hydra");
		options.push("Activate Father Dagon");
		options.push("Activate Deep Ones");
		if(z.fromTheAbyss){
			options.push("Activate the Shoggoth");
			options.push("Activate the Drowned Spirit");
			options.push("Activate the Grasping Tendril");
			options.push("Activate Horror Icon");
		}

		options.push("Shuffle Skill Card Decks");
		
	}
	 /* TODO: shuffle various decks in case of screwup */ /*	What would you like to do, Baltar? (1-5)   	42											11: Print Hand Report (and exit).           	342: Display Game State.						243: TANK this skill check.					274: Play Destiny into skil...				26*/
	let maxOptions = options.length;
	let minOptions = 1;
	if(options.length > 22 && firstPage) {
		maxOptions = 22;
		options.splice(21, 0, "(scroll down)", "(scroll up)");
	}
	if(!firstPage) {
		minOptions = 22;
	}
	let promptText = "What would you like to do, " + myPlayer + "? (" + minOptions + "-" + maxOptions + ")\n\n";
	for(let i = minOptions - 1; !(i >= maxOptions); i++) {
		promptText += (i + 1) + ": " + options[i ] + ".\n";
	} 
	let cancelLabel = "Go Back";
	if(menuPage === "Default" && firstPage) {
		cancelLabel = "Save and Quit";
	}
	promptNum(promptText, (a) => minOptions > a || a > maxOptions, () => {
		if(menuPage === "Default" && firstPage) {
			saveAndQuit();
		} else {
			menuPage = "Default";
			firstPage = true;
			mainMenu();
		}
	}, (prompted) => {
		let ch = options[prompted - 1];
		if(menuPage === "[I still can't find what I'm looking for]" && ch !== "(scroll down)") {
			t.value += size("I had to dig deep into the menus to find this.  This is probably the result of a bug, which [us" +
				"er=Grafin]Grafin[/us" + "er] should track down.\r\n", 8);
		}
		if(ch === "(scroll down)") {
			firstPage = false;
			mainMenu();
		} else {
			firstPage = true;
		}
		if(ch === "Blind Devotion (OPG)") {
			mainMenu();
		} else if (ch === "Shuffle Skill Card Decks"){
			for(let j = 0; !(j>=z.skillCardDecks.length); j++){
				shuffle(z.skillCardDecks[j]);
			}
			plainAlert("Shuffled each of the skill card decks (but not their discards).  This should only have been done if a rewind was necessary.");
			mainMenu();
		} else if (ch === "Temporal Barrier"){
			confirmify("TEMPORAL_BARRIER_CONFIRM",mainMenu,()=>{
				let context = getContext(me,ch);
				boldAlert("TEMPORAL_BARRIER_USE",z.players[me]);
				delete z.temporalBarrier;
				removeOption(me,ch);
				removeFromAll("Activate Deep Ones");
				removeFromAll("Activate Father Dagon");
				removeFromAll("Activate Mother Hydra");
				removeFromAll("Activate the Shoggoth");
				removeFromAll("Activate the Drowned Spirit");
				removeFromAll("Activate the Grasping Tendril");
				removeFromAll("Activate Horror Icon");
				removeFromAll("Alarm [Feat]");
				removeFromAll("Feast [Feat]");
				SPTokenBad("Temporal Barrier",context);
				mainMenu();
			});
		} else if(ch === "Feast [Feat]"){
			confirmify("FEAST_CONFIRM",mainMenu,()=>{
				let context = getContext(me,ch);
				boldAlert("FEAST_USE",z.players[me],getGender(me));
				z.feats[me].splice(z.feats[me].indexOf("Feast"),1);
				removeOption(me,ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Alarm [Feat]");
				if(decreaseFood()){
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== "Galley"){
							addOption(me,"[Feast] Move a player",undefined,false);
							break;
						}
					}
					for(let j = 0; !(j>=z.allies.length); j++){
						if(z.allies[j][1] !== "Galley"){
							addOption(me,"[Feast] Move an Ally",undefined,false);
							break;
						}
					}
					removeFromAll("Activate Deep Ones");
					removeFromAll("Activate Father Dagon");
					removeFromAll("Activate Mother Hydra");
					removeFromAll("Activate the Shoggoth");
					removeFromAll("Activate the Drowned Spirit");
					removeFromAll("Activate the Grasping Tendril");
					removeFromAll("Activate Horror Icon");
					if(context === "Deep Ones"){
						optionForAll("Activate Deep Ones","Feast",true);
					} else if(context === "Mother Hydra"){
						optionForAll("Activate Mother Hydra","Feast",true);
					} else if(context === "Shoggoth"){
						optionForAll("Activate the Shoggoth","Feast",true);
					} else if(context === "Drowned Spirit"){
						optionForAll("Activate the Drowned Spirit","Feast",true);
					} else if(context === "Grasping Tendril"){
						optionForAll("Activate the Grasping Tendril","Feast",true);
					} else if(context === "Horror"){
						optionForAll("Activate Horror Icon","Feast",true);
					} else if(Array.isArray(context) && context[0] === "Father Dagon"){
						optionForAll("Activate Father Dagon",["Feast",context[1]],true);
					}
				}
				mainMenu();
			});	
		} else if (ch === "[Feast] Move a player"){
			let choices = [];
			promptText = "";
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== "Galley"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("FEAST_HUMAN_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				movePlayer(choices[a-1],"Galley");
				if(choices.length === 1){
					removeOption(me,ch);
				}
				mainMenu();
			});
		} else if (ch === "[Feast] Move an Ally"){
			let choices = [];
			promptText = "";
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] !== "Galley"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(d.allyNames[z.allies[j][0]]);
				}
			}
			promptNum(lc("FEAST_ALLY_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				boldAlert("FEAST_ALLY_ALERT",[z.players[me],d.allyNames[z.allies[choices[a-1]][0]]]);
				z.allies[choices[a-1]][1] = "Galley";
				fleeCheck(GALLEY);
				if(choices.length === 1){
					removeOption(me,ch);
				}
				mainMenu();
			});
		} else if (ch === "Alarm [Feat]"){
			confirmify("ALARM_CONFIRM",mainMenu,()=>{
				let context = getContext(me,ch);
				boldAlert("ALARM_USE",z.players[me],getGender(me));
				z.feats[me].splice(z.feats[me].indexOf("Alarm"),1);
				removeOption(me,ch);
				removeFromAll("Activate Deep Ones");
				removeFromAll("Activate Father Dagon");
				removeFromAll("Activate Mother Hydra");
				removeFromAll("Activate the Shoggoth");
				removeFromAll("Activate the Drowned Spirit");
				removeFromAll("Activate the Grasping Tendril");
				removeFromAll("Activate Horror Icon");
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				if(decreaseSanity()){
					if(context === "Mother Hydra"){
						doneWithMother();
					} else if (context === "Shoggoth"){
						if(z.shoggoth === RESERVES && z.shoggothContext === "Horror"){
							z.horror = 0;
							delete z.shoggothContext;
							doneWithHorror();
						} else {
							doneWithShoggoth();
						}
					} else if (context === "Drowned Spirit"){
						if(z.drownedSpirit === RESERVES && z.drownedSpiritContext === "Horror"){
							z.horror = 0;
							delete z.drownedSpiritContext;
							doneWithHorror();
						} else {
							doneWithDrownedSpirit();
						}
						
					} else if (context === "Grasping Tendril"){
						if(z.graspingTendril === RESERVES && z.graspingTendrilContext === "Horror"){
							z.horror = 0;
							delete z.graspingTendrilContext;
							doneWithHorror();
						} else {
							doneWithGraspingTendril();
						}
					} else if (context === "Horror"){
						doneWithHorror();
					} else if (Array.isArray(context) && context[0] === "Father Dagon"){
						if(z.midAction === "Perform Rites" && !hasOption(z.turn,"Activate Mother Hydra")){
							finishedAction();
						}
						if(context[1] === "The Father's Favor 2"){
							if(activateFather("The Father's Favor")){
								clearSkillCheck();
							}
						}
						if(context[1] === "The Father's Favor"){
							clearSkillCheck();
						}
						if(context[1] === "Coordinated Assault"){
							if(activateDeepOnes()){
								clearSkillCheck();
							} else {
								z.deepOneContext = "Coordinated Assault";
							}
						}
						if(context[1] === "Looming Danger"){
							if(activateMother("Looming Danger")){
								doneWithChoiceMythos();
							}
						}
						if(context[1] === "Monster"){
							primeJumpIcon();
						}
					} else if(context === "Deep Ones"){
						if(z.deepOneContext === "Call Friends"){
							delete z.deepOneContext;
							if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
								finishedAction();
							}
							if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
						} else if(z.deepOneContext === "Ritual Coordination" || z.deepOneContext === "Volunteer Army"){
							delete z.deepOneContext;
							doneWithChoiceMythos();
						} else if(z.deepOneContext === "Barricade the Hatches" || z.deepOneContext === "Coordinated Assault"){
							delete z.deepOneContext;
							clearSkillCheck();
						} else if(z.deepOneContext === "Monster"){
							delete z.deepOneContext;
							primeJumpIcon();
						} else if(z.deepOneContext === "Deep One Swarm"){
							delete z.deepOneContext;
							if(activateDeepOnes()){
								clearSkillCheck();
							} else {
								z.deepOneContext = "Coordinated Assault";
							}
						} else {
							delete z.deepOneContext;
						}
					}
				}
				mainMenu();
			});
		} else if (ch === "Trigger Cursed Whispers"){
			confirmify("TRIGGER_CURSED_WHISPERS_CONFIRM",mainMenu,()=>{
				SPTokenBad("Cursed Whispers");
				removeOption(me,ch);
				mainMenu();
			});
		} else if(ch === "[The End is Nigh!] Draw a Boon"){
			confirmify("BOON_DRAW_CONFIRM",mainMenu,()=>{
				dealSkillCard(me,BOON);
				let context = getContext(me,ch);
				removeOption(me,ch);
				removeOption(me,"[The End is Nigh!] Draw a Treachery");
				if(context === 1){
					SPTokenBad("Cursed Whispers","Choice Mythos");
				} else {
					addOption(me,ch,1,true);
					addOption(me,"[The End is Nigh!] Draw a Treachery",1,true);
				}
				mainMenu();
			});
		} else if(ch === "[The End is Nigh!] Draw a TREACHERY"){
			confirmify("TREACHERY_DRAW_CONFIRM",mainMenu,()=>{
				dealSkillCard(me,TREACHERY);
				let context = getContext(me,ch);
				removeOption(me,ch);
				removeOption(me,"[The End is Nigh!] Draw a Boon");
				if(context === 1){
					SPTokenBad("Cursed Whispers","Choice Mythos");
				} else {
					addOption(me,"[The End is Nigh!] Draw a Boon",1,true);
					addOption(me,ch,1,true);
				}
				mainMenu();
			});
		} else if (ch === "Roll a die for Uncanny Luck"){
			confirmify("UNCANNY_LUCK_SPECIAL",mainMenu,()=>{
				plainAlert("UNCANNY_LUCK_SPECIAL_ALERT");
				z.uncannyLuckUsed = true;
				z.uncannyLuckNow = true;
				SPTokenBad("Uncanny Luck");
				mainMenu();
			});
		} else if (ch === "[The End is Nigh!] Reshuffle a Passenger"){
			let context = getContext(me,ch);
			let promptText = lc("THE_END_IS_NIGH_PROMPT",context.length);
			for(let j = 0; !(j>=context.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.spaceNames[context[j]]);
			}
			promptNum(promptText,(a)=>1>a||a>context.length,mainMenu,(a)=>{
				z.passengerSupply.push(z.spacePassengers[context[a-1]].pop());
				boldAlert("THE_END_IS_NIGH_RESHUFFLE",d.spaceNames[context[a-1]]);
				shuffleTreachery(4);
				doneWithChoiceMythos();
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "[Offering] Choose a sacrifice"){
			let context = getContext(me,ch);
			let promptText = "";
			if(context[0] === "top"){
				promptText = lc("OFFERING_TOP_PROMPT",context[1].length);
			} else {
				promptText = lc("OFFERING_BOTTOM_PROMPT",context[1].length);
			}
			for(let j = 0; !(j>=context[1].length); j++){
				promptText += "\n"+(j+1)+": "+lc(z.players[context[1][j]]);
			}
			promptNum(promptText,(a)=>1>a||a>context[1].length,mainMenu,(a)=>{
				removeOption(me,ch);
				if(context[0] === "top"){
					discardEntireHand(context[1][a-1]);
					doneWithChoiceMythos();
				} else if(defeat(context[1][a-1],"Offering")){
					doneWithChoiceMythos();
				}
				mainMenu();
			});
		} else if (ch === "[Occult Accusations] Reshuffle an Ally"){
			let promptText = lc("OCCULT_ACCUSATIONS_PROMPT",z.allies.length);
			for(let j = 0; !(j>=z.allies.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.allyNames[z.allies[j][0]]);
			}
			promptNum(promptText,(a)=>1>a||a>z.allies.length,mainMenu,(a)=>{
				let ally = z.allies.splice(a-1,1)[0][0];
				boldAlert("OCCULT_ACCUSATIONS_ALERT",d.allyNames[ally]);
				shuffleTreachery(4);
				doneWithChoiceMythos();
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "[Insight] Give away a Skill Card"){
			let context = getContext(me,ch);
			let promptText = lc("INSIGHT_PROMPT",context.length);
			for(let j = 0; !(j>=context.length); j++){
				promptText += "\n"+(j+1)+": "+lc(z.players[j]);
			}
			promptNum(promptText,(a)=>1>a||a>context.length,mainMenu,(a)=>{
				let player = context[a-1];
				let promptText = lc("INSIGHT_PROMPT_2",[z.players[player],z.skillCardHands[me].length]);
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					promptText += "\n"+(j+1)+": "+cardText(z.skillCardHands[me][j]);
				}
				promptNum(promptText,(b)=>1>b||b>z.skillCardHands[me].length,mainMenu,(b)=>{
					context.splice(a-1,1);
					let card = z.skillCardHands[me].splice(b-1,1)[0];
					for(let j = 0; !(j>=z.possibleColors[me].length); j++){
						if(z.possibleColors[me][j]){
							z.possibleColors[player][j] = 1;
						}
						if(z.skillCardHands[me].length === 0){
							z.possibleColors[me] = 0;
						}
					}
					addAlert("INSIGHT_GIVE_ALERT",[cardText(card),z.players[player]]);
					printlnBold("INSIGHT_GIVE_PRINT",[z.players[me],z.players[player]]);
					removeOption(me,ch);
					if(context.length > 0 || z.skillCardHands[me].length > 0){
						addOption(me,ch,context,true);
					}
					mainMenu();
				});
			});
		} else if (ch === "[Uncanny Luck] Place this card in a play area"){
			let promptText = lc("UNCANNY_LUCK_PROMPT",z.numPlayers);
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": "+lc(z.players[j]);
			}
			promptNum(promptText,(a)=>1>a||a>z.numPlayers,mainMenu,(a)=>{
				boldAlert("UNCANNY_LUCK_RECEIVED",z.players[a-1]);
				z.uncannyLuck === a - 1;
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Do not resolve Cast Out again"){
			confirmify("CAST_OUT_DECLINE",mainMenu,()=>{
				boldAlert("CAST_OUT_DECLINE_ALERT",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"Defeat a Deep One");
				removeOption(me,"Defeat a player");
				removeOption(me,"Repel a Horror");
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				mainMenu();
			});
		} else if (ch === "I'm done defeating monsters"){
			confirmify("STORM_OF_SPIRITS_CONFIRM",mainMenu,()=>{
				let context = getContext(me,ch);
				removeOption(me,ch);
				removeOption(me,"Defeat a Deep One");
				removeOption(me,"Repel a Horror");
				SPTokenBad("Storm of Spirits",context[3]);
				mainMenu();
			});
		} else if (ch === "[To Arms!] Choose a Horror"){
			let choices = [];
			let promptText = "";
			if(z.shoggoth > RESERVES){
				choices.push("Shoggoth");
				promptText += "\n1: "+lc("Shoggoth");
			}
			if(z.drownedSpirit > RESERVES){
				choices.push("Drowned Spirit");
				promptText += "\n"+choices.length+": "+lc("Drowned Spirit");
			}
			if(z.graspingTendril > RESERVES){
				choices.push("Grasping Tendril");
				promptText += "\n"+choices.length+": "+lc("Grasping Tendril");
			}
			promptNum(lc("TO_ARMS_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				plainAlert("TO_ARMS_ALERT",[z.players[me],choices[a-1]]);
				SPTokenBad("To Arms! (top)",[choices[a-1],me]);
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "[Conjure Fortune] Shuffle Boon cards into Chaos"){
			promptNum(lc("CONJURE_FORTUNE_PROMPT"),(a)=>a!==2&&a!==4&&a!==6,mainMenu,(a)=>{
				let pairs = Math.round(a/2);
				let count = 0;
				for(let j = 0; !(j>=pairs); j++){
					if(z.skillCardDecks[BOON].length === 0){
						reshuffleSkillCardDeck(BOON);
					}
					if(z.skillCardDecks[BOON].length === 0){
						break;
					}
					let boon1 = z.skillCardDecks[BOON].pop();
					if(z.skillCardDecks[BOON].length === 0){
						reshuffleSkillCardDeck(BOON);
					}
					if(z.skillCardDecks[BOON].length === 0){
						z.skillCardDecks[BOON].push(boon1);
						break;
					}
					let boon2 = z.skillCardDecks[BOON].pop();
					z.chaos.push(boon1);
					z.chaos.push(boon2);
					count += 2;
				}
				boldAlert("CONJURE_FORTUNE_ANNOUNCE",count);
				if(count > 0){
					shuffle(z.chaos);
					SPTokenBad("Conjure Fortune",count);
				} else {
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
				removeOption(me,ch);
				
			});
		} else if (ch === "[Mechanic] Repair a space"){
			let context = getContext(me,ch);
			let promptText = context[0];
			let choices = context[1];
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let damage = z.damage[choices[a-1]];
				z.damageDeck.push(damage);
				shuffle(z.damageDeck);
				z.damage[choices[a-1]] = -1;
				plainAlert("STRUCTURAL_DAMAGE_REPAIRED",[d.spaceNames[choices[a-1]],d.damageNames[damage]]);
				removeOption(me,ch);
				wander(MECHANIC);
				mainMenu();
			});
		} else if (ch === "[Ruffian] Attack an enemy"){
			let choices = [];
			let indices = [];
			let promptText = "";
			for(let j = DECK; !(j>=SICK_BAY); j++){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j){
						choices.push("Deep One");
						indices.push(j);
						promptText += "\n"+choices.length+": "+lc("Deep One")+" ("+lc(d.spaceNames[j])+")";
					}
				}
			}
			if(z.shoggoth >= DECK){
				choices.push("Shoggoth");
				promptText += "\n"+choices.length+": "+lc("Shoggoth");
			}
			if(z.drownedSpirit >= DECK){
				choices.push("Drowned Spirit");
				promptText += "\n"+choices.length+": "+lc("Drowned Spirit");
			}
			if(z.graspingTendril > RESERVES){
				choices.push("Grasping Tendril");
				promptText += "\n"+choices.length+": "+lc("Drowned Spirit");
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.revealedHybrids[j]){
					choices.push(z.players[j]);
					promptText += "\n"+choices.length+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("RUFFIAN_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let target = choices[a-1];				
				z.dieRollModifier = 1;

				let horror = (target === "Shoggoth" || target === "Drowned Spirit" || target === "Grasping Tendril");
				
				if(target === "Deep One"){
					let index = indices[a-1];
					boldAlert("ATTACK_DEEP_ONE_ALERT",["The Ruffian",d.spaceNames[index]]);
					NoSPToken("RUFFIAN_VS_DEEP_ONE",["Ruffian",d.spaceNames[index],z.players[me],1]);
				} else {
					let target2 = target;
					if(horror){
						target2 = "the "+target;
					}
					boldAlert("ATTACK_ALERT",["The Ruffian",target2]);
				
					if(horror){
						SPTokenBad("RUFFIAN_VS_HORROR",["Ruffian",target,z.players[me]]);
					} else {
						SPTokenBad("RUFFIAN_VS_PLAYER",["Ruffian",target,z.players[me]]);
					}
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "[Soldier] Defeat a Deep One"){
			let context = getContext(me,ch);
			let promptText = context[0];
			let choices = context[1];
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === choices[a-1]){
						z.deepOnes[k] = RESERVES;
						plainAlert("SOLDIER_ALERT",d.spaceNames[choices[a-1]]);
						break;
					}
				}
				removeOption(me,ch);
				wander(SOLDIER);
				mainMenu();
			});
		} else if(ch === "[Host] Choose a target"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+z.players[j];
				}
			}
			promptNum(lc("HOST_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				removeOption(me,ch);
				addOption(choices[a-1],"[Host] Move",undefined,true);
				addOption(choices[a-1],"[Host] Don't move",undefined,true);
				boldAlert("HOST_CHOICE_ALERT",[z.players[me],z.players[choices[a-1]]]);
				mainMenu();
			});
		} else if(ch.startsWith("Choose where the ")){
			let context = getContext(me,ch);
			let ally = context[0];
			let value = context[1];
			let first = "";
			let second = d.spaceNames[DECK-1+value];
			if(value === 1){
				first = "Bridge";
			} else if(value === 8){
				first = "Boiler Room";
			} else {
				first = d.spaceNames[INTERIOR-2+value];
			}
			promptNum(lc("ALLY_WANDERS_PROMPT",[d.allyNames[ally],first,second]),(a)=>1>a||a>2,mainMenu,(a)=>{
				let dest = first;
				if(a===2){
					dest = second;
				}
				for(let j = 0; !(j>=z.allies.length); j++){
					if(z.allies[j][0] === ally){
						plainAlert("ALLY_WANDERS_TO",[d.allyNames[ally],dest]);
						z.allies[j][1] = dest;
						fleeCheck(locationIndex(dest));
						break;
					}
				}
				z.allyUser.pop();
				if(z.allyUser.length === 0){
					delete z.allyUser;
				}
				removeOption(me,ch);
				mainMenu();
			});
			
		} else if (ch === "[Security Officer] Choose a target"){
			let promptText = "";
			let choices = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j]){
					choices.push(j);
					promptText += "\n"+(j+1)+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("CAPTAINS_CABIN_TARGET_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				removeOption(me,ch);
				startLocationSkillCheck("Security Officer", choices[a-1]);
				mainMenu();
			});
		} else if (ch === "Unfinished Business [Feat]"){
			confirmify("UNFINISHED_BUSINESS_CONFIRM",mainMenu,()=>{
				printlnBold("UNFINISHED_BUSINESS_ALERT",z.players[me],getGender(me));
				z.feats[me].splice(z.feats[me].indexOf("Unfinished Business"),1);
				if(z.allyDeck.length > 0){
					let ally = z.allyDeck.pop();
					z.guillaumeAllies.push(ally);
					plainAlert("UNFINISHED_BUSINESS_PLAY_AREA",[z.players[me],d.allyNames[ally]],getGender(me));
				}
				if(z.allyDeck.length > 0){
					let ally = z.allyDeck.pop();
					z.guillaumeAllies.push(ally);
					plainAlert("UNFINISHED_BUSINESS_PLAY_AREA",[z.players[me],d.allyNames[ally]],getGender(me));
				}
				if(z.players[me] !== "Guillaume"){
					z.ersatzGuillaume = me;
				}
				addOption(me,"[Unfinished Business] Use an Ally",undefined,true);
				if(z.guillaumeAllies.length > 3){
					addOption(me,"[Unfinished Business] Remove an Ally from the game",undefined,true);
				} else {
					addOption(me,"I'm done with Unfinished Business",undefined,true);
				}
				z.midAction = "Unfinished Business";
				z.unfinishedBusiness = 3;
				z.actionPerformer = me;
				didAction();
				mainMenu();
			});
		} else if (ch === "[Unfinished Business] Remove an Ally from the game"){
			let promptText = lc("LOST_SOULS_TOO_MANY_PROMPT",z.guillaumeAllies.length);
			if(hasOption(me,"[Unfinished Business] Use an Ally")){
				promptText += lc("UNFINISHED_BUSINESS_CLEAN_UP_EARLY");
			}
			for(let j = 0; !(j>=z.guillaumeAllies.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.allyNames[z.guillaumeAllies[j]]);
			}
			promptNum(promptText,(a)=>1>a||a>z.guillaumeAllies.length,mainMenu,(a)=>{
				let ally = z.guillaumeAllies.splice(a-1,1)[0];
				boldAlert("GUILLAUME_REMOVES_ALLY",d.allyNames[ally]);
				removeOption(me,"[Unfinished Business] Use an Ally");
				delete z.unfinishedBusiness;
				if(z.guillaumeAllies.length === 3){
					removeOption(me,ch);
					finishedAction();
				}
				mainMenu();
			});
		} else if(ch === "I'm done with Unfinished Business"){
			confirmify(lc("UNFINISHED_BUSINESS_EARLY"),mainMenu,()=>{
				removeOption(me,"[Unfinished Business] Use an Ally");
				delete z.unfinishedBusiness;
				removeOption(me,ch);
				finishedAction();
				mainMenu();
			});
		} else if (ch === "Use an Ally"){
			let choices = [];
			let handValue = 0;
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				handValue += cardValue(z.skillCardHands[me][j]);
			}
			let promptText = "";
			let noCost = z.players[me] === "Avery" || z.instillBravery === me;
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] === z.playerLocations[me]){
					let cost = d.allyValues[z.allies[j][0]];
					if(noCost){
						cost = 0;
					}
					if(handValue >= cost || noCost){
						choices.push(j);
						promptText += "\n"+choices.length+": "+lc(d.allyNames[z.allies[j][0]])+" (cost "+cost+")";
					}
				}
			}
			let doIt = (a)=>{
				let ally = z.allies[choices[a-1]][0];
				let cost = d.allyValues[ally];
				if(z.allyUsed[me] || (cost > handValue && z.players[me] !== "Avery")){
					z.instillBraveryCount--;
					if(z.instillBraveryCount === 0){
						delete z.instillBraveryCount;
						delete z.instillBravery;
					}
					if(!canUseAlly(me,false,ally)){
						removeOption(me,ch);
					}
					useAlly(ally,true);
				} else if(z.players[me] === "Avery"){
					z.allyUsed[me] = 1;
					if(!canUseAlly(me,false,ally)){
						removeOption(me,ch);
					}
					useAlly(ally,true);
				} else if(z.instillBravery !== me){
					z.allyUsed[me] = 1;
					useAlly(ally,false);
					if(!canUseAlly(me,false,ally)){
						removeOption(me,ch);
					}
				} else {
					confirmify(lc("INSTILL_BRAVERY_QUESTION",cost),()=>{
						z.allyUsed[me] = 1;
						if(!canUseAlly(me,false,ally)){
							removeOption(me,ch);
						}
						useAlly(ally,false);
					},()=>{
						z.instillBraveryCount--;
						if(z.instillBraveryCount === 0){
							delete z.instillBraveryCount;
							delete z.instillBravery;
						}
						if(!canUseAlly(me,false,ally)){
							removeOption(me,ch);
						}
						useAlly(ally,true);
					},"YES","NO");
				}
			};
			
			if(choices.length === 1){
				confirmify(lc("ALLY_USE_CONFIRM",d.allyNames[z.allies[choices[0]][0]]),mainMenu,()=>{
					doIt(1);
				});
			} else {
				promptNum(lc("ALLY_USE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,doIt);
			}
		} else if (ch === "Lost Souls"){
			let choices = [];
			let handValue = 0;
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				handValue += cardValue(z.skillCardHands[me][j]);
			}
			let promptText = "";
			let noCost = z.instillBravery === me;
			for(let j = 0; !(j>=z.guillaumeAllies.length); j++){
				let cost = d.allyValues[z.guillaumeAllies[j]];
				if(noCost){
					cost = 0;
				}
				if(handValue >= cost){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(d.allyNames[z.guillaumeAllies[j]])+" (cost "+d.allyValues[z.guillaumeAllies[j]]+")";
				}
			}
			
			let doIt = (a)=>{
				if(noCost && d.allyValues[z.guillaumeAllies[choices[a-1]]] !== 0){
					let cost = d.allyValues[z.guillaumeAllies[choices[a-1]]];
					if(cost > handValue){
						z.lostSouls = true;
						z.instillBraveryCount--;
						if(z.instillBraveryCount === 0){
							delete z.instillBraveryCount;
							delete z.instillBravery;
						}
						useAlly(z.guillaumeAllies[choices[a-1]],noCost);
					} else {
						confirmify(lc("INSTILL_BRAVERY_QUESTION",cost),()=>{
							z.lostSouls = true;
							useAlly(z.guillaumeAllies[choices[a-1]],false);
						},()=>{
							z.lostSouls = true;
							z.instillBraveryCount--;
							if(z.instillBraveryCount === 0){
								delete z.instillBraveryCount;
								delete z.instillBravery;
							}
							useAlly(z.guillaumeAllies[choices[a-1]],true);
						},"YES","NO");
					}
					
				} else {
					z.lostSouls = true;
					useAlly(z.guillaumeAllies[choices[a-1]],noCost);
				}
			};
			
			if(choices.length === 1){
				confirmify(lc("ALLY_USE_CONFIRM",d.allyNames[z.guillaumeAllies[choices[0]]]),mainMenu,()=>{
					doIt(1);
				});
			} else {
				promptNum(lc("ALLY_USE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,doIt);
			}
		} else if (ch === "[Unfinished Business] Use an Ally"){
			let promptText = "";
			for(let j = 0; !(j>=z.guillaumeAllies.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.allyNames[z.guillaumeAllies[j]]);
			}
			
			if(z.guillaumeAllies.length === 1){
				confirmify(lc("ALLY_USE_CONFIRM",d.allyNames[z.guillaumeAllies[0]]),mainMenu,()=>{
					removeOption(me,ch);
					removeOption(me,"[Unfinished Business] Remove an Ally from the game");
					removeOption(me,"I'm done with Unfinished Business");
					useAlly(z.guillaumeAllies.pop(),true);
				});
			} else {
				promptNum(lc("ALLY_USE_PROMPT",z.guillaumeAllies.length)+promptText,(a)=>1>a||a>z.guillaumeAllies.length,mainMenu,(a)=>{
					removeOption(me,ch);
					removeOption(me,"[Unfinished Business] Remove an Ally from the game");
					useAlly(z.guillaumeAllies.splice(a-1,1)[0],true);
				});
			}
		} else if (ch === "[Notebook] Return a card to your hand"){
			let context = getContext(me,ch);
			
			let doIt = (card)=>{
				let color = cardColorID(card);
				let any = false;
				for(let j = 0; !(j>=z.skillCardDiscards[color].length); j++){
					if(z.skillCardDiscards[color][j] === card){
						z.skillCardHands[me].push(z.skillCardDiscards[color].splice(j,1)[0]);
						z.possibleColors[me][color] = 1;
						any = true;
						z.notebook = true;
						if(cardName === "Shrivelling" && itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === me){
							removeOption(me,"[Shrivelling] Target an enemy");
						} else if(cardName === "Lesser Banishment" && itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === me){
							removeOption(me,"[Lesser Banishment] Target a space");
						}
						break;
					}
				}
				removeOption(me,ch);
				if(!any){
					addAlert("NOTEBOOK_FAIL",cardText(card));
				}
				mainMenu();
				
			};
			
			if(context.length === 1){
				let confirmText = lc("NOTEBOOK_CONFIRM",cardText(context[0]));
				if((hasOption(me,"[Shrivelling] Target an enemy") || hasOption(me,"[Lesser Banishment] Target a space")) && itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === me){
					confirmText += "\n"+lc("NOTEBOOK_ELDER_SIGN_AMULET");
				}
				confirmify(confirmText,mainMenu,doIt(context[0]));
			} else {
				let promptText = lc("NOTEBOOK_PROMPT",context.length);
				for(let j = 0; !(j>=context.length); j++){
					promptText += "\n"+(j+1)+": "+cardText(context[j]);
				}
				if((hasOption(me,"[Shrivelling] Target an enemy") || hasOption(me,"[Lesser Banishment] Target a space")) && itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === me){
					promptText += "\n"+lc("NOTEBOOK_ELDER_SIGN_AMULET");
				}
				promptNum(promptText,(a)=>1>a||a>context.length,mainMenu,(a)=>{
					doIt(context[a-1]);
				});
			}
		} else if (ch === "Maau"){
			/* ATODO: be smarter about this (like with calc) */
			let increase = z.lastDieRollValue + z.lastDieRollModifier + 2;
			if(increase > 8){
				increase = 8;
			}
			let decrease = z.lastDieRollValue + z.lastDieRollModifier - 2;
			if(1 > decrease){
				decrease = 1;
			}
			promptNum(lc("MAAU_PROMPT",[increase,decrease]),(a)=>1>a||a>2,mainMenu,(a)=>{
				if(a===1){
					z.lastDieRollModifier += 2;
					boldAlert("MAAU_INCREASE_ALERT",z.players[me]);
				} else {
					z.lastDieRollModifier -= 2;
					boldAlert("MAAU_DECREASE_ALERT",z.players[me]);
				}
				t.value += dieRollImage() + "\r\n";
				z.maau = true;
				if(z.perfectNumber){
					if(!canChangeDieRoll()){
						processDieRoll();
					}
				} else if(!canModifyDieRoll()) {
					processDieRoll();
				}
				mainMenu();
			});
		} else if (ch === "[Baseball Bat] Increase the die roll"){
			confirmify("BASEBALL_BAT_CONFIRM",mainMenu,()=>{
				boldAlert("BASEBALL_BAT_USE_ALERT");
				z.lastDieRollModifier += 2;
				z.items[me].splice(z.items[me].indexOf("Baseball Bat"),1);
				t.value += dieRollImage() + "\r\n";
				if(z.perfectNumber){
					if(!canChangeDieRoll()){
						processDieRoll();
					}
				} else if(!canModifyDieRoll()){
					processDieRoll();
				}
				removeOption(me,"[Baseball Bat] Attack an enemy");
				removeOption(me,"I'm done with Rampage");
				mainMenu();
			});
		} else if (ch === "Ritual Candles"){
			confirmify("RITUAL_CANDLES_CONFIRM",mainMenu,()=>{
				boldAlert("RITUAL_CANDLES_ALERT",z.players[me]);
				z.actionPerformer = me;
				didAction();
				let cards = [];
				cards.push(dealSkillCard(me,BOON));
				cards.push(dealSkillCard(me,BOON));
				cards.push(dealSkillCard(me,BOON));
				if(me === z.cursedWhispers){
					let alertText = lc("You draw:");
					for(let j = 0; !(j>=cards.length); j++){
						alertText += "\n"+cardText(cards[j]);
					}
					addAlert(alertText);
					SPTokenBad("Cursed Whispers","Ritual Candles");
				} else {
					cards.push(dealSkillCard(me,BOON));
					cards.push(dealSkillCard(me,BOON));
					let alertText = lc("You draw:");
					for(let j = 0; !(j>=cards.length); j++){
						alertText += "\n"+cardText(cards[j]);
					}
					addAlert(alertText);
				}
				for(let j = 0; !(j>=z.items[me].length); j++){
					if(d.itemNames[z.items[me][j]] === "Ritual Candles"){
						z.items[me].splice(j,1);
						println("ITEM_IS_REMOVED","Ritual Candles");
						break;
					}
				}
				if(me !== z.cursedWhispers){
					finishedAction();
				}
				mainMenu();
			});
		} else if (ch === "Valise"){			
			confirmify(lc("USE_VALISE_CONFIRM"),mainMenu,()=>{
				didAction();
				z.midAction = "Valise";
				z.actionPerformer = me;
				printlnBold("USE_VALISE_ALERT",z.players[me]);
				let alertText = lc("VALISE_PRIVATE_ALERT");
				let promptText = "";
				let choices = [];
				for(let j = 0; !(j>=z.itemDeck.length); j++){
					alertText += "\n"+lc(d.itemNames[z.itemDeck[j]]);
					if(isImprovement(z.itemDeck[j])){
						choices.push(j);
						promptText += "\n"+choices.length+": "+d.itemNames[z.itemDeck[j]];
					}
				}
				addAlert(alertText);
				let done = true;
				if(choices.length === 0){
					plainAlert("VALISE_FAILURE");
					println("DECK_RESHUFFLE","Item");
					shuffle(z.itemDeck);
				} else if (choices.length === 1){
					let item = z.itemDeck.splice(choices[0],1)[0];
					z.items[me].push(item);
					boldAlert("CARGO_HOLD_DONE",[z.players[me],d.itemNames[item]],getGender(me));
					if(!resetImprovements(me)){
						addOption(me,"Activate an Improvement","Valise",true);
						plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
						done = false;
					}
					println("DECK_RESHUFFLE","Item");
					shuffle(z.itemDeck);
				} else {
					addOption(me,"[Valise] Take an Improvement",[promptText,choices],true);
					done = false;
				}
				if(done){
					finishedAction();
				}
				
				mainMenu();
			});
		} else if (ch === "[Valise] Take an Improvement"){
			let context = getContext(me,ch);
			let choices = context[1];
			let promptText = lc("VALISE_PROMPT",choices.length)+context[0];
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let item = z.itemDeck.splice(choices[a-1],1)[0];
				z.items[me].push(item);
				boldAlert("CARGO_HOLD_DONE",[z.players[me],d.itemNames[item]],getGender(me));
				println("DECK_RESHUFFLE","Item");
				shuffle(z.itemDeck);
				if(!resetImprovements(me)){
					addOption(me,"Activate an Improvement","Valise",true);
					z.midAction = "Valise";
					z.actionPerformer = me;
					plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
				} else {
					finishedAction();
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Spirit Board"){
			confirmify("SPIRIT_BOARD_CONFIRM",mainMenu,()=>{
				let ally = z.allyDeck.pop();
				
				if(characterPresent("Guillaume")){
					plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[ally]);
					z.guillaumeAllies.push(ally);
					if(z.guillaumeAllies.length > 3){
						boldAlert("GUILLAUME_TOO_MANY",1);
						addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game","Spirit Board",true);
					}
				} else {
					plainAlert("PLAYER_DEFEATED",d.allyNames[ally]);
				}
				z.spiritBoard = true;
				if(me === z.cursedWhispers){
					SPTokenBad("Cursed Whispers");
				} else {
					addOption(me,"Draw 1 Skill Card (not treachery/boon)",undefined,true);
				}
				mainMenu();
			});
		} else if (ch === "[Blessing] Bless a player"){
			let promptText = lc("BLESSING_PROMPT",z.numPlayers);
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": "+z.players[j];
			}
			promptNum(promptText,(a)=>1>a||a>z.numPlayers,mainMenu,(a)=>{
				z.blessing = a-1;
				boldAlert("BLESSING_DONE_ALERT",[z.players[me],z.players[z.blessing]]);
				if(z.blessing === z.cursedWhispers){
					SPTokenBad("Cursed Whispers");
				} else {
					let card1 = dealSkillCard(z.blessing,BOON);
					let card2 = dealSkillCard(z.blessing,BOON);
					addAlert("SEASONED_DRAW",[cardText(card1),cardText(card2)]);
				}
				removeOption(me,ch);
				SPTokenBad("Blessing",undefined,z.blessing);
				mainMenu();
			});
		} else if (ch === "[Whistle] Move an Ally"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] !== z.playerLocations[me]){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(d.allyNames[z.allies[j][0]])+" ("+lc(z.allies[j][1])+")";
				}
			}
			promptNum(lc("JOIN_HANDS_PROMPT_ALLY",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				z.allies[choices[a-1]][1] = z.playerLocations[me];
				boldAlert("WHISTLE_MOVE_ALERT",[z.players[me],d.allyNames[z.allies[choices[a-1]][0]],z.playerLocations[me]]);
				fleeCheck(locationIndex(z.playerLocations[me]));
				z.whistle = true;
				z.noRansack = true;
				if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
					z.xoStack[z.xoStack.length-1] = "Cadet+";
				}
				mainMenu();
			});
		} else if (ch === "[Whistle] Spawn an Ally"){
			confirmify(lc("WHISTLE_CONFIRM"),mainMenu,()=>{
				spawnAlly(z.playerLocations[me]);
				z.whistle = true;
				z.noRansack = true;
				if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
					z.xoStack[z.xoStack.length-1] = "Cadet+";
				}
				mainMenu();
			});
		} else if(ch === "[Tidal Turbulence] Lose a resource"){
			promptNum(lc("TIDAL_TURBULENCE_PROMPT",[z.food,z.fuel]),(a)=>1>a||a>2,mainMenu,(a)=>{
				if(a === 1){
					if(decreaseFood()){
						clearSkillCheck();
					}
				} else {
					if(decreaseFuel()){
						clearSkillCheck();
					}
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "[Join Hands] Move an ally" || ch === "[Make Ready] Move an ally" || ch === "[Abandon Ship] Move an ally"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.allies.length); j++){
				if(z.allies[j][1] === "Bridge" || z.allies[j][1] === "Boiler Room"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+d.allyNames[z.allies[j][0]];
				}
			}
			
			let whereTo = (a)=>{
				if(z.allies[a][1] === "Bridge"){
					promptNum(lc("JOIN_HANDS_PROMPT_WHERE",[d.allyNames[z.allies[a][0]],1,2]),(b)=>1>b||b>2,mainMenu,(b)=>{
						let destination = "Deck Space 1";
						if(b === 2){
							destination = "Deck Space 2";
						}
						boldAlert("MOVE_MONARCH_ALERT",[z.players[me],d.allyNames[z.allies[a][0]],destination]);
						z.allies[a][1] = destination;
						fleeCheck(locationIndex(destination));
						if(choices.length === 1){
							let context = getContext(me,ch);
							removeOption(me,ch);
							if(ch === "[Make Ready] Move an ally"){
								if(z.allyDeck.length === 0){
									doneWithChoiceMythos();
								} else {
									NoSPToken("Make Ready");
									boldAlert("MAKE_READY_ALERT");
								}
							} else if(ch === "[Abandon Ship] Move an ally"){
								if(!hasOption(me,"[Abandon Ship] Move a player")){
									doneWithRevealEffect(getPlayerNum("Sardaana"));
								}
							} else if(context === "Partial" || riskThreePassengers("Join Hands")){
								clearSkillCheck();
							}
						}
						mainMenu();
					});
				} else {
					promptNum(lc("JOIN_HANDS_PROMPT_WHERE",[d.allyNames[z.allies[a][0]],7,8]),(b)=>1>b||b>2,mainMenu,(b)=>{
						let destination = "Deck Space 7";
						if(b === 2){
							destination = "Deck Space 8";
						}
						boldAlert("MOVE_MONARCH_ALERT",[z.players[me],d.allyNames[z.allies[a][0]],destination]);
						z.allies[a][1] = destination;
						fleeCheck(locationIndex(destination));
						if(choices.length === 1){
							let context = getContext(me,ch);
							removeOption(me,ch);
							if(ch === "[Make Ready] Move an ally"){
								if(z.allyDeck.length === 0){
									doneWithChoiceMythos();
								} else {
									NoSPToken("Make Ready");
									boldAlert("MAKE_READY_ALERT");
								}
							} else if(ch === "[Abandon Ship] Move an ally"){
								if(!hasOption(me,"[Abandon Ship] Move a player")){
									doneWithRevealEffect(getPlayerNum("Sardaana"));
								}
							} if(context === "Partial" || riskThreePassengers("Join Hands")){
								clearSkillCheck();
							}
						}
						mainMenu();
					});
				}
			};
			
			
			if(choices.length === 1){
				whereTo(choices[0]);
			} else {
				promptNum(lc("JOIN_HANDS_PROMPT_ALLY",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					whereTo(choices[a-1]);
				});
			}
		} else if (ch === "[Unseen Follower] Spawn an Ally"){
			let choices = [];
			let promptText = "";
			for(let j = DECK; !(j>=INTERIOR+6); j++){
				if(isAdjacent(d.spaceNames[j],z.playerLocations[me])){
					choices.push(d.spaceNames[j]);
					promptText += "\n"+choices.length+": "+d.spaceNames[j];
				}
			}
			promptText = lc("UNSEEN_FOLLOWER_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				spawnAlly(choices[a-1]);
				removeOption(me,ch);
				clearSkillCheck();
				mainMenu();
			});
		} else if (ch === "[Precognition] Put 2 Skill Cards on top of the Chaos Deck"){
			let doIt = (b)=>{
				let promptText = lc("PRECOGNITION_PROMPT",z.skillCardHands[me].length);
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					promptText += "\r\n"+(j+1)+": ";
					if(b === j){
						promptText+="(already chose this)";
					} else {
						promptText+=cardText(z.skillCardHands[me][j]);
					}
				}
				promptNum(promptText,(a)=>1>a||a>z.skillCardHands[me].length||a===b+1,mainMenu,(c)=>{
					if(b === -1){
						doIt(c);
					} else {
						let card1 = b;
						let card2 = c;
						if(c > b){
							c = card1;
							b = card2;
						}
						addAlert("PRECOGNITION_PRIVATE_ALERT",[cardText(z.skillCardHands[me][b]),cardText(z.skillCardHands[me][c])]);
						z.chaos.push(z.skillCardHands[me].splice(b,1)[0]);
						z.chaos.push(z.skillCardHands[me].splice(c,1)[0]);
						removeOption(me,ch);
						if(z.dieRollQueue.length === 0 && z.lastDieRoll === null){
							clearSkillCheck();
						}
						mainMenu();
					}
				});
			};
			doIt(-1);
		} else if (ch === "[Missing Persons] Spawn allies"){
			promptNum(lc("MISSING_PERSONS_SHIP_PROMPT"),(a)=>1>a||a>2,mainMenu,(a)=>{
				removeOption(me,ch);
				if(a === 1){
					promptNum(lc("MISSING_PERSONS_INTERIOR_PROMPT"),(a)=>1>a||a>6,mainMenu,(a)=>{
						spawnAlly(d.spaceNames[INTERIOR+a-1]);
						spawnAlly(d.spaceNames[INTERIOR+a-1]);
						clearSkillCheck();
						mainMenu();
					});
				} else {
					promptNum(lc("MISSING_PERSONS_DECK_PROMPT"),(a)=>1>a||a>8,mainMenu,(a)=>{
						spawnAlly(d.spaceNames[DECK+a-1]);
						spawnAlly(d.spaceNames[DECK+a-1]);
						clearSkillCheck();
						mainMenu();
					});
				}
			});
		} else if (ch === "[Join Hands] Move monsters"){
			let choices = [];
			let promptText = "";
			if(z.shoggoth === BRIDGE || z.shoggoth === BOILER_ROOM){
				choices.push("Shoggoth");
				promptText += "\r\n"+(choices.length)+": "+choices[choices.length-1];
			}
			if(z.drownedSpirit === BRIDGE || z.drownedSpirit === BOILER_ROOM){
				choices.push("Drowned Spirit");
				promptText += "\r\n"+(choices.length)+": "+choices[choices.length-1];
			}
			let bridge = 0;
			let boilerRoom = 1;
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(z.deepOnes[j] === BRIDGE){
					bridge++;
				}
				if(z.deepOnes[j] === BOILER_ROOM){
					boilerRoom++;
				}
			}
			if(bridge){
				choices.push("1 Deep One (Bridge)");
				promptText += "\r\n"+(choices.length)+": "+choices[choices.length-1];
				if(bridge > 1){
					choices.push("All Deep Ones (Bridge)");
					promptText += "\r\n"+(choices.length)+": "+choices[choices.length-1];
				}
			}
			if(boilerRoom){
				choices.push("1 Deep One (Boiler Room)");
				promptText += "\r\n"+(choices.length)+": "+choices[choices.length-1];
				if(bridge > 1){
					choices.push("All Deep Ones (Boiler Room)");
					promptText += "\r\n"+(choices.length)+": "+choices[choices.length-1];
				}
			}
			
			let doIt = (choice)=>{
				bridge = (choice === "Shoggoth" && z.shoggoth === BRIDGE) || (choice === "Drowned Spirit" && z.drownedSpirit === BRIDGE) || choice === "1 Deep One (Bridge)" || choice === "All Deep Ones (Bridge)";
				if(bridge){
					choices = ["Deck Space 1","Deck Space 2"];
				} else {
					choices = ["Deck Space 7","Deck Space 8"];
				}
				let promptText = lc("JOIN_HANDS_WHERE",choice)+"\r\n1: "+choices[0]+"\r\n2: "+choices[1];
				promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
					if(choice === "Shoggoth"){
						if(z.shoggoth === BRIDGE){
							if(a === 1){
								z.shoggoth = DECK;
							} else {
								z.shoggoth = DECK + 1;
							}
						} else if(a === 1){
							z.shoggoth = DECK + 6;
						} else {
							z.shoggoth = DECK + 7;
						}
						plainAlert("SHOGGOTH_MOVES",d.spaceNames[z.shoggoth]);
						fleeCheck(z.shoggoth);
					} else if (choice === "Drowned Spirit"){
						if(z.drownedSpirit === BRIDGE){
							if(a === 1){
								z.drownedSpirit = DECK;
							} else {
								z.drownedSpirit = DECK + 1;
							}
						} else if(a === 1){
							z.drownedSpirit = DECK + 6;
						} else {
							z.drownedSpirit = DECK + 7;
						}
						plainAlert("SHOGGOTH_MOVES",d.spaceNames[z.drownedSpirit]);
						fleeCheck(z.drownedSpirit);
					} else if (choice === "1 Deep One (Bridge)" || choice === "All Deep Ones (Bridge)"){
						let one = (choice === "1 Deep One (Bridge)");
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === BRIDGE){
								if(a === 1){
									z.deepOnes[j] = DECK;
								} else {
									z.deepOnes[j] = DECK+1;
								}
								if(one){
									break;
								}
							}
						}
						if(a === 1){
							if(one){
								plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[DECK]);
							} else {
								plainAlert("DEEP_ONES_MOVE",[bridge,d.spaceNames[DECK]]);
							}
							fleeCheck(DECK);
						} else {
							if(one){
								plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[DECK+1]);
							} else {
								plainAlert("DEEP_ONES_MOVE",[bridge,d.spaceNames[DECK+1]]);
							}
							fleeCheck(DECK+1);
						}
					} else {
						let one = (choice === "1 Deep One (Boiler Room)");
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === BOILER_ROOM){
								if(a === 1){
									z.deepOnes[j] = DECK+6;
								} else {
									z.deepOnes[j] = DECK+7;
								}
								if(one){
									break;
								}
							}
						}
						if(a === 1){
							if(one){
								plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[DECK+6]);
							} else {
								plainAlert("DEEP_ONES_MOVE",[bridge,d.spaceNames[DECK+6]]);
							}
							fleeCheck(DECK+6);
						} else {
							if(one){
								plainAlert("ONE_DEEP_ONE_MOVES",d.spaceNames[DECK+7]);
							} else {
								plainAlert("DEEP_ONES_MOVE",[bridge,d.spaceNames[DECK+7]]);
							}
							fleeCheck(DECK+7);
						}
					}
					let any = false;
					if(z.shoggoth === BRIDGE || z.shoggoth === BOILER_ROOM){
						any = true;
					} else if(z.drownedSpirit === BRIDGE || z.drownedSpirit === BOILER_ROOM){
						any = true;
					}
					for(let j = 0; !(j>=z.deepOnes.length) && !any; j++){
						any = (z.deepOnes[j] === BRIDGE) || (z.deepOnes[j] === BOILER_ROOM);
					}
					if(!any){
						removeOption(me,ch);
					}
					mainMenu();
				});
			};
			if(choices.length === 1){
				doIt(choices[0]);
			} else {
				promptNum(lc("JOIN_HANDS_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					doIt(choices[a-1]);
				});
			}
		} else if (ch === "[Disappearing Belongings] Trade Sanity for Items"){
			confirmify(lc("DISAPPEARING_BELONGINGS_ACCEPT_CONFIRM"),mainMenu,()=>{
				if(decreaseSanity()){
					if(drawTwoItems(me,"Disappearing Belongings")){
						clearSkillCheck();
					}
				}
				removeOption(me,ch);
				removeOption(me,"[Disappearing Belongings] Decline the trade");
				mainMenu();
			});
		} else if (ch === "[Disappearing Belongings] Decline the trade"){
			confirmify(lc("DISAPPEARING_BELONGINGS_DECLINE_CONFIRM"),mainMenu,()=>{
				plainAlert("DISAPPEARING_BELONGINGS_DECLINE",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Disappearing Belongings] Trade Sanity for Items");
				clearSkillCheck();
				mainMenu();
			});
		} else if (ch === "Repel a Horror"){
			let context = getContext(me,ch);
			let doRepel = (horror,start)=>{
				let graspingTendril = (horror === "Grasping Tendril");
				let choices = [];
				let promptText = "";
				for(let j = 0; !(j>=INTERIOR+6); j++){
					if(isAdjacent(d.spaceNames[j],d.spaceNames[start]) && (!graspingTendril || DECK > j)){
						choices.push(j);
						promptText += "\r\n"+choices.length+": "+d.spaceNames[j];
					}
				}
				promptNum(lc("REPEL_HORROR_PROMPT",[horror,choices.length])+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					plainAlert("HORROR_REPEL_ALERT",[z.players[me],horror,d.spaceNames[choices[a-1]]]);
					if(horror === "Shoggoth"){
						z.shoggoth = choices[a-1];
					} else if(horror === "Grasping Tendril") {
						z.graspingTendril = choices[a-1];
						fleeCheck(z.graspingTendril + 8);
					} else {
						z.drownedSpirit = choices[a-1];
					}
					fleeCheck(choices[a-1]);
					removeOption(me,ch);
					if(context === "Summon the Beast Within"){
						context = [z.players[me],horror,context,[]];
					} else if(Array.isArray(context) && (context[2] === "Summon the Beast Within" || context[2] === "Jam Tin Grenade")){
						context[3].push(horror);
					} else if(Array.isArray(context) && context[2] === "Storm of Spirits"){
						context[3]++;
						removeOption(me,ch);
						removeOption(me,"Defeat a Deep One");
						removeOption(me,"I'm done defeating monsters");
						context[2] = horror;
					}						
					if(context === "Cast Out" || context === "Cast Out (bis)"){
						removeOption(me,ch);
						removeOption(me,"Repel a Horror");
						removeOption(me,"Defeat a Deep One");
						removeOption(me,"Do not resolve Cast Out again");
						if(context === "Cast Out (bis)"){
							SPTokenBad("Cast Out",me);
						}
					}
					
					if(z.skillCardHands[me].length === 0 || (Array.isArray(context) && context[context.length-1] === "bis")){
						if(Array.isArray(context) && (context[0] === "Disappearing Food")){
							context = "Disappearing Food";
						} else if(Array.isArray(context) && (context[0] === "Cast Out")){
							context = "Cast Out";
						} else if(Array.isArray(context) && (context[0] === "Cast Out (bis)")){
							context = "Cast Out (bis)";
						}
						doneWithRepel(context);
					} else {
						let value = 0;
						for(let j = 0; !(j>=z.skillCardHands[me].length) && 4 > value; j++){
							value += cardValue(z.skillCardHands[me][j]);
						}
						if(value >= 4){
							if(Array.isArray(context)){
								context.push(0);
								addOption(me,"[Repel] Discard a Skill Card",context,true);
							} else {
								addOption(me,"[Repel] Discard a Skill Card",[context,0],true);
							}								
						}
						addOption(me,"Do not repel the Horror further",context,true);
					}
					mainMenu();
				});
			};
			if(context === "Disappearing Food" || context === "Cast Out" || Array.isArray(context) && context[2] === "Storm of Spirits"){
				let choices = [];
				let promptText = "";
				if(z.shoggoth && z.shoggoth >= DECK){
					choices.push(["Shoggoth",z.shoggoth]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(z.drownedSpirit && z.drownedSpirit >= DECK){
					choices.push(["Drowned Spirit",z.drownedSpirit]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(z.graspingTendril){
					choices.push(["Grasping Tendril",z.graspingTendril]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(choices.length === 1){
					doRepel(choices[0][0],choices[0][1],choices[0][0]==="Grasping Tendril");
				} else {
					promptNum(lc("HORROR_REPEL_WHICH",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
						doRepel(choices[a-1][0],choices[a-1][1]);
					});
				}
			} else if(context === "Summon the Beast Within"){
				let choices = [];
				let promptText = "";
				if(z.shoggoth && d.spaceNames[z.shoggoth] === z.playerLocations[me]){
					choices.push(["Shoggoth",z.shoggoth]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(z.drownedSpirit && d.spaceNames[z.drownedSpirit] === z.playerLocations[me]){
					choices.push(["Drowned Spirit",z.drownedSpirit]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(z.graspingTendril && d.spaceNames[z.graspingTendril] === z.playerLocations[me]){
					choices.push(["Grasping Tendril",z.graspingTendril]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				
				if(choices.length === 1){
					doRepel(choices[0][0],choices[0][1],choices[0][0]==="Grasping Tendril");
				} else {
					promptNum(lc("HORROR_REPEL_WHICH",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
						doRepel(choices[a-1][0],choices[a-1][1]);
					});
				}
			} else if(context[2] === "Summon the Beast Within" || context[2] === "Jam Tin Grenade"){
				let choices = [];
				let promptText = "";
				let loc = z.playerLocations[me];
				if(context[2] === "Jam Tin Grenade"){
					loc = context[4];
				}
				if(z.shoggoth && d.spaceNames[z.shoggoth] === loc && !context[3].includes("Shoggoth")){
					choices.push(["Shoggoth",z.shoggoth]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(z.drownedSpirit && d.spaceNames[z.drownedSpirit] === loc && !context[3].includes("Drowned Spirit")){
					choices.push(["Drowned Spirit",z.drownedSpirit]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				if(z.graspingTendril && d.spaceNames[z.graspingTendril] === loc && !context[3].includes("Grasping Tendril")){
					choices.push(["Grasping Tendril",z.graspingTendril]);
					promptText += "\r\n"+choices.length+": "+choices[choices.length-1][0];
				}
				
				if(choices.length === 1){
					doRepel(choices[0][0],choices[0][1]);
				} else {
					promptNum(lc("HORROR_REPEL_WHICH",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
						doRepel(choices[a-1][0],choices[a-1][1]);
					});
				}
			} else if(context[1] === "Shoggoth"){
				doRepel("Shoggoth",z.shoggoth);
			} else if (context[1] === "Grasping Tendril"){
				doRepel("Grasping Tendril",z.graspingTendril);
			} else {
				doRepel("Drowned Sprit",z.drownedSpirit);
			}
		} else if (ch === "Do not repel the Horror further"){
			let context = getContext(me,ch);
			confirmify(lc("NO_MORE_REPEL_CONFIRM",context[1]),mainMenu,()=>{
				removeOption(me,ch);
				removeOption(me,"[Repel] Discard a Skill Card");
				doneWithRepel(context);
				mainMenu();
			});
		} else if (ch === "[Repel] Discard a Skill Card") {
			let choices = [];
			let context = getContext(me,ch);
			let promptText = "";
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				choices.push(j);
				promptText += "\n"+(choices.length)+": "+cardText(z.skillCardHands[me][j]);
			}
			promptText = lc("REPEL_PROMPT",[context[1],choices.length,context[context.length-1]]) + promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				/* UTODO: can I keep discarding? */
				let value = cardValue(z.skillCardHands[me][choices[a-1]]);
				discardSkillCard(me,choices[a-1]);
				context[context.length-1] += value;
				removeOption(me,ch);
				removeOption(me,"Do not repel the Horror further");
				if(context[context.length-1] >= 4){
					context.pop();
					context.push("bis");
					addOption(me,"Repel a Horror",context,true);
				} else {
					addOption(me,ch,context,true);
				}
				mainMenu();
			});
		} else if (ch === "Pass on Gather Evidence"){
			confirmify("PASS_GATHER_EVIDENCE_CONFIRM",mainMenu,()=>{
				plainAlert("PASS_GATHER_EVIDENCE");
				removeOption(me,ch);
				removeOption(me,"Gather Evidence");
				z.gatherEvidence = true;
				if(!hasOption(z.turn,"Resolve a skill check effect")){
					clearSkillCheck();
				}
				mainMenu();
			});
		} else if (ch === "Gather Evidence"){
			let choices = [];
			let revelation = z.revealedCards.includes(REVELATION+ZERO_STRENGTH);
			let turmoil = z.revealedCards.includes(TURMOIL+ZERO_STRENGTH);
			let promptText = "";
			for(let j = 0; !(j>=z.revealedCards.length); j++){
				let color = cardColorID(z.revealedCards[j]);
				let value = cardValue(z.revealedCards[j]);
				if(((color === INFLUENCE && !z.thisInfluence) || (color === LORE && !z.thisLore) || (color === OBSERVATION && !z.thisObservation) || (color === STRENGTH && !z.thisStrength) ||
					   (color === WILL && !z.thisWill) || (color === TREACHERY && !revelation) || (color === BOON && turmoil)) && (value >= 1 && 4 >= value)){
					
					choices.push(j);
					promptText += "\r\n"+choices.length+": "+cardText(z.revealedCards[j]);
				}	
			}
			promptText = lc("GATHER_EVIDENCE_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let card = z.revealedCards.splice(choices[a-1],1)[0];
				plainAlert("GATHER_EVIDENCE_ALERT",cardText(card));
				z.possibleColors[me][cardColorID(card)] = 1;
				z.skillCardHands[me].push(card);
				removeOption(me,ch);
				removeOption(me,"Pass on Gather Evidence");
				z.gatherEvidence = true;
				removeOption(z.turn,"Resolve a skill check effect");
				if(skillCheckEffects().length > 0){
					addOption(z.turn,"Resolve a skill check effect",undefined,true);
				} else {
					clearSkillCheck();
				}
				mainMenu();
			});
			
		} else if (ch === "Resolve a skill check effect"){
			let choices = skillCheckEffects();
			let promptText = lc("SKILL_CARD_EFFECT_PROMPT",choices.length);
			for(let j = 0; !(j>=choices.length); j++){
				promptText += "\r\n"+(j+1)+": "+cardText(choices[j]);
			}
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				switch(choices[a-1] - ZERO_STRENGTH){
					case DIRECT: {
						let choices = [];
						let promptText = "";
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(!z.revealedHybrids[j] && z.playerLocations[j] !== "Brig"){
								choices.push(j);
								promptText += "\r\n"+(choices.length)+": "+z.players[j];
							}
						}
						promptNum(lc("DIRECT_WHO_PROMPT",choices.length)+promptText,(b)=>1>b||b>choices.length,mainMenu,(b)=>{
							let who = choices[b-1];
							let myLocation = z.playerLocations[who];
							let validShips = [];
							let pickLocation = function(shipChosen) {
								let validLocations = [];
								switch (shipChosen) {
									case "Interior":
										for(let j = INTERIOR; !(j>=INTERIOR+6); j++){
											validLocations.push(d.spaceNames[j]);
										}
										break;
									case "Deck":
										for(let j = DECK; !(j>=DECK+8); j++){
											validLocations.push(d.spaceNames[j]);
										}
										break;
								}
								let promptText = lc("MOVE_SPACE_DIRECT_PROMPT",[z.players[who],validLocations.length]);
								for(let j = 0; !(j >= validLocations.length); j++) {
									promptText += "\n" + (j + 1) + ": ";
									if(myLocation === validLocations[j]) {
										promptText += lc("(already here)");
									} else {
										promptText += lc(validLocations[j]);
									}
								}
								promptNum(promptText, (c) => 1 > c || c > validLocations.length || validLocations[c - 1] === myLocation, mainMenu, (choice) => {
									let prompted = validLocations[choice - 1];
									addAlert("PLAYER_MOVES_DIRECT",[z.players[me],z.players[who],prompted]);
									movePlayer(who, prompted);
									z.direct = true;
									if(skillCheckEffects().length === 0){
										removeOption(me,ch);
										if(!characterPresent("Antar") || !hasOption(getPlayerNum("Antar"),"Gather Evidence")){
											clearSkillCheck2();
										}
									}
									mainMenu();
								});
							};
							
							validShips = ["Interior","Deck"];
			

							let promptText = lc("MOVE_SHIP_PROMPT_DIRECT",[z.players[who],validShips.length]);
							for(let j = 0; !(j >= validShips.length); j++) {
								promptText += "\n" + (j + 1) + ": " + lc(validShips[j]);
							}
							promptNum(promptText, (c) => 1 > c || c > validShips.length, mainMenu, (prompted) => {
								pickLocation(validShips[prompted - 1]);
							});
						});
						break;
					}
					case OUST: {
						let choices = [];
						let promptText = "";
						for(let j = WATER; !(j>=d.spaceNames.length); j++){
							for(let k = 0; !(k>=z.deepOnes.length); k++){
								if(z.deepOnes[k] === j){
									choices.push(k);
									promptText += "\r\n"+choices.length+": "+d.spaceNames[j];
									break;
								}
							}
						}
						promptNum(lc("OUST_FROM",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
							promptNum(lc("OUST_SHIP"),(b)=>1>b||b>3,mainMenu,(b)=>{
								let start = WATER;
								let end = DECK;
								if(b === 2){
									start = DECK;
									end = INTERIOR;
								} else if(b === 3){
									start = INTERIOR;
									end = INTERIOR+6;
								}
								let promptText = lc("OUST_WHERE",end-start);
								for(let j = start; !(j>=end); j++){
									promptText += "\r\n"+(j-start+1)+": ";
									if(z.deepOnes[choices[a-1]] === j){
										promptText += "(already here)";
									} else {
										promptText += d.spaceNames[j];
									}
								}
								promptNum(promptText,(c)=>start>c||c>=end||c-1+start===z.deepOnes[choices[a-1]],mainMenu,(c)=>{
									plainAlert("OUST_ALERT",[z.players[me],d.spaceNames[z.deepOnes[choices[a-1]]],d.spaceNames[c-1+start]]);
									z.deepOnes[choices[a-1]] = c-1+start;
									fleeCheck(c-1+start);
									z.oust = true;
									if(skillCheckEffects().length === 0){
										removeOption(me,ch);
										if(!characterPresent("Antar") || !hasOption(getPlayerNum("Antar"),"Gather Evidence")){
											clearSkillCheck2();
										}
									}
									mainMenu();
								});
							});
						});
						break;
					}
					case INSPIRATION: {
						let choices = [];
						let revelation = z.revealedCards.includes(REVELATION+ZERO_STRENGTH);
						let turmoil = z.revealedCards.includes(TURMOIL+ZERO_STRENGTH);
						let promptText = "";
						for(let j = 0; !(j>=z.revealedCards.length); j++){
							let color = cardColorID(z.revealedCards[j]);
							if(((color === INFLUENCE && z.thisInfluence) || (color === LORE && z.thisLore) || (color === OBSERVATION && z.thisObservation) || (color === STRENGTH && z.thisStrength) ||
								   (color === WILL && z.thisWill) || (color === TREACHERY && revelation) || (color === BOON && !turmoil)) && cardName[z.revealedCards[j]] !== "Inspiration"){
								
								choices.push(j);
								promptText += "\r\n"+choices.length+": "+cardText(z.revealedCards[j]);
							}	
						}
						promptText = lc("GATHER_EVIDENCE_PROMPT",choices.length)+promptText;
						promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
							let card = z.revealedCards.splice(choices[a-1],1)[0];
							plainAlert("INSPIRATION_ALERT",[z.players[me],cardText(card)],getGender(me));
							z.possibleColors[me][cardColorID(card)] = 1;
							z.skillCardHands[me].push(card);
							z.inspiration = true;
							removeFromAll("Pass on Gather Evidence");
							removeFromAll("Gather Evidence");
							if(skillCheckEffects().length === 0){
								removeOption(me,ch);
							}
							if(canGatherEvidence()){
								addOption(getPlayerNum("Antar"),"Gather Evidence",undefined,true);
								addOption(getPlayerNum("Antar"),"Pass on Gather Evidence",undefined,true);
							}
							if(skillCheckEffects().length === 0 && !canGatherEvidence()){
								clearSkillCheck2();
							}
							mainMenu();
						});
						break;
					}
					case RUMBLE: {
						let choices = [];
						let promptText = "";
						for(let j = 0; !(j>=z.numPlayers); j++){
							let any = false;
							if(z.revealedHybrids[j]){
								continue;
							}
							if(enemiesInMySpace(j) && (!z.thePeacemaker || z.players[j] !== "Arjun")){
								any = true;
							} else if(itemHolder("Repeating Rifle") == j && z.playerLocations[j] !== "Brig" && enemyInAdjacentSpace(j) && (!z.thePeacemaker || z.players[j] !== "Arjun")){
								any = true;
								break;
							} else if(itemHolder("Flare Gun") === j && z.playerLocations[j] !== "Brig" && !z.flareGun){	
								for(let k = 0; !(k>=z.numPlayers) && !any; k++){
									any = z.playerLocations[j] !== z.playerLocations[k] && z.playerLocations[k] !== "Brig";
								}
							}
							if(any){
								choices.push(j);
								promptText += "\r\n"+choices.length+": "+z.players[j];
							}
						}
						promptNum(lc("RUMBLE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
							let who = choices[a-1];
							boldAlert("RUMBLE_ALERT",[z.players[me],z.players[who]],getGender(who));
							let options = 0;	
							if(!z.thePeacemaker || z.players[who] !== "Arjun"){
								if(enemiesInMySpace(who) && itemPresent("Six-Shooter") && itemHolder("Six-Shooter") === who){
									options++;
								}
								if(enemiesInMySpace(who) && itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === who){
									options++;
								}
								if(enemiesInMySpace(who) && itemPresent("Shotgun") && itemHolder("Shotgun") === who){
									options++;
								}
								if(enemiesInMySpace(who) && itemPresent("Fillet Knife") && itemHolder("Fillet Knife") === who){
									options++;
								}
								if(enemiesInMySpace(who) && itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === who){
									options++;
								}
								if(enemiesInMySpace(who) && itemPresent("Flare Gun") && itemHolder("Flare Gun") === who && !z.flareGun){
									options++;
								}
								if(enemyInAdjacentSpace(who) && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === who){
									options++;
								}
								if(enemiesInMySpace(who)){
									options++;
								}
								if(options === 1){
									if(enemyInAdjacentSpace(who) && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === who){
										addOption(who,"[Repeating Rifle] Attack an enemy","Rumble",true);
									}
									if(enemiesInMySpace(who)){
										addOption(who,"Attack an enemy","Rumble",true);
									}
								} else {
									addOption(who,"[Rumble] Choose your weapon",undefined,true);
								}
							} else {
								addOption(who,"[Flare Gun] Alert another character","Rumble",true);
							}
							z.rumble = true;
							if(skillCheckEffects().length === 0){
								removeOption(me,ch);
							}
							mainMenu();
						});
						break;
					}
					case EVACUATION: {
						let choices = [];
						let promptText = "";
						for(let j = WATER; !(j>=z.spacePassengers.length); j++){
							if(z.spacePassengers[j].length){
								choices.push(j);
								promptText += "\r\n"+choices.length+": "+d.spaceNames[j];
								break;
							}
						}
						promptNum(lc("EVACUATION_FROM",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
							promptNum(lc("EVACUATION_SHIP"),(b)=>1>b||b>2,mainMenu,(b)=>{
								let start = WATER;
								if(b === 1){
									start = DECK;
								}
								let promptText = lc("EVACUATION_WHERE",8);
								for(let j = start; !(j>=start+8); j++){
									promptText += "\r\n"+(j-start+1)+": ";
									if(choices[a-1] === j){
										promptText += "(already here)";
									} else {
										promptText += d.spaceNames[j];
									}
								}
								promptNum(promptText,(c)=>1>c||c>8||c-1+start===choices[a-1],mainMenu,(c)=>{
									plainAlert("EVACUATION_ALERT",[z.players[me],d.spaceNames[choices[a-1]],d.spaceNames[c-1+start]]);
									z.spacePassengers[c-1+start].push(z.spacePassengers[choices[a-1]].pop());
									z.evacuation = true;
									if(skillCheckEffects().length === 0){
										removeOption(me,ch);
										if(!characterPresent("Antar") || !hasOption(getPlayerNum("Antar"),"Gather Evidence")){
											clearSkillCheck2();
										}
									}
									mainMenu();
								});
							});
						});
						break;
					}
				}
			});
			
		} else if (ch === "Respite"){
			z.phase = 4;
			boldAlert("RESPITE_EFFECT",z.players[z.turn]);
			addOption(z.turn,"Advance the Travel Track","Respite",true);
			addOption(z.turn,"Advance the Ritual Track","Respite",true);
			if(canAnyoneFeast()){
				plainAlert("FEAST_ALERT",canAnyoneFeast(),getGender(getPlayerNum(canAnyoneFeast())));
				addOption(getPlayerNum(canAnyoneFeast()),"Feast [Feat]","Respite",true);
			}
			delete z.respite;
			mainMenu();			
		} else if (ch === "I'm done with Rampage"){
			confirmify("Confirming you want to waive any additional attacks from Rampage.",mainMenu,()=>{
				println(z.players[me]+" waives any further attacks from Rampage.");
				removeOption(me,ch);
				removeOption(me,"Attack an enemy");
				removeOption(me,"[Six-Shooter] Attack an enemy");
				removeOption(me,"[Pocket Pistol] Attack an enemy");
				removeOption(me,"[Shotgun] Attack an enemy");
				removeOption(me,"[Repeating Rifle] Attack an enemy");
				removeOption(me,"[Flare Gun] Attack an enemy");
				removeOption(me,"[Flare Gun] Alert another character");
				removeOption(me,"[Baseball Bat] Attack an enemy");
				removeOption(me,"[Fillet Knife] Attack an enemy");
				removeOption(me,"[Fillet Knife] Attack a different enemy");
				notebookCheck(z.notebookCard,me);
				season(me,STRENGTH);
				finishedAction();
				mainMenu();
			});
		} else if (ch === "[Family Ties] Choose where to spawn Deep Ones"){
			let promptText = "Where do you want to spawn 4 Deep Ones?\n1: Chapel\n2: Captain's Cabin";
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
				let done = true;
				if(a === 1){
					done = spawnDeepOnes(CHAPEL,4);
				} else {
					done = spawnDeepOnes(CAPTAINS_CABIN,4);
				}
				if(done){
					doneWithChoiceMythos();
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Trigger Flesh Ward"){
			confirmify(lc("FLESH_WARD_CONFIRM",[z.players[z.fleshWard],z.players[z.turn]]),mainMenu,()=>{
				let player = z.fleshWard;
				plainAlert("FLESH_WARD_ACTIVATES",z.players[player]);
				delete z.fleshWard;
				SPTokenBad("Flesh Ward",player);
				mainMenu();
			});
		} else if (ch === "Choose the Deep One target"){
			let promptText = "";
			let index = getContext(me,ch);
			let choices = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && d.spaceNames[z.deepOnes[index]] === z.playerLocations[j]){
					choices.push(z.players[j]);
					promptText += "\n"+(choices.length)+": "+z.players[j];
				}
			}
			promptText = lc("DEEP_ONE_CHOICE",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let target = choices[a-1];
				z.deepOneActivated[index] = 1;
				plainAlert("DEEP_ONE_ATTACKS_HUMAN",target,getGender(getPlayerNum(target)));
				NoSPToken("DEEP_ONE_VS_HUMAN",target);
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Choose the next Shoggoth target"){
			let choices = getContext(me,ch);
			let promptText = lc("SHOGGOTH_CHOICE",choices.length);
			for(let j = 0; !(j>=z.numPlayers); j++){
				promptText += "\n"+(j+1)+": "+choices[j];
			}
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let target = choices[a-1];
				choices.unshift(choices.splice(a-1,1)[0]);
				plainAlert("SHOGGOTH_ATTACKS_HUMAN",target,getGender(target));
				NoSPToken("SHOGGOTH_VS_HUMAN",choices);
				z.dieRollModifier = 1;
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Choose the Grasping Tendril target"){ 
			let promptText = "";
			let choices = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && d.spaceNames[z.graspingTendril+8] === z.playerLocations[j]){
					choices.push(z.players[j]);
					promptText += "\n"+(choices.length)+": "+z.players[j];
				}
			}
			promptText = lc("GRASPING_TENDRIL_CHOICE",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let target = choices[a-1];
				plainAlert("GRASPING_TENDRIL_ATTACKS_HUMAN",target,getGender(getPlayerNum(target)));
				NoSPToken("GRASPING_TENDRIL_VS_HUMAN",target);
				z.dieRollModifier = 1;
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Submit Conditional Order for a post-skill check ability"){
			let promptText = "This conditional order will pause for post-skill check abilities (namely, "+colorText("blue","Determination");
			let lowerBound = z.thisTarget;
			let upperBound = z.thisTarget-1;
			if(z.thisPartial > 0){
				lowerBound = z.thisPartial;
			}
			lowerBound -= 14;
			upperBound += 14;
			if(characterPresent("Keilani") && z.playerLocations[getPlayerNum("Keilani")] !== "Brig" && z.skillCardHands[getPlayerNum("Keilani")].length > 0){
				promptText += ", Experienced";
				lowerBound = -267;
				upperBound = 267;
			}
			if(z.revelation !== undefined){
				promptText += ", Revelation of Script";
				lowerBound = -267;
				upperBound = 267;
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Well Equipped") && z.playerLocations[j] !== "Brig" && z.items[j].length > 0){
					promptText += ", Well Equipped";
					lowerBound -= z.items[j].length;
					upperBound += z.items[j].length;
					break;
				}
			}
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Instinct") && z.playerLocations[j] !== "Brig"){
					promptText += ", Instinct";
					upperBound += 8;
					break;
				}
			}
			
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Revelation") && z.playerLocations[j] !== "Brig" && z.skillCardHands[j].length > 0){
					promptText += ", Revelation";
					lowerBound -= z.skillCardHands[j].length * 6;
					upperBound += z.skillCardHands[j].length * 6;
					break;
				}
			}
			if(itemPresent('"Lucky" Ring')){
				promptText += ', "Lucky" Ring';
				lowerBound -= 2;
				upperBound = 267;
			}
			
			
			
			
			/* what's the highest I can get to?
			6-player game, everyone has 10 cards going into the turn. (60 cards) [70]
			draw cards with an improvement +6 = 66 [76]
			quick cast heal: 6 more cards +6 = 72 [83]
			galley: 5 more cards +5 = 77 [88]
			watch and learn: 1 card +1 = 78 [89]
			destiny: 2 cards +2 = 80 [91]
			
			skill checks have at most 3 positive, only 63 cards.
			1 forced learning: 84 cards positive [79 avail]
			
			*/
			let choices = [];
			choices.push("FAIL 2");
			
			let choiceText = "";
			if(z.thisPartial > 0){
				choiceText += "\n"+choices.length+": "+"Short of passing by 2 or less";
				choices.push("FAIL 4");
				choiceText += "\n"+choices.length+": "+"Short of passing by 4 or less";
			} else {
				choiceText += "\n"+choices.length+": "+"Failing by 2 or less";
				choices.push("FAIL 4");
				choiceText += "\n"+choices.length+": "+"Failing by 4 or less";
			}
			
			
			choices.push("PASS 2");
			choiceText += "\n"+choices.length+": "+"Passing by less than 2";
			choices.push("PASS 4");
			choiceText += "\n"+choices.length+": "+"Passing by less than 4";
			if(z.thisPartial > 0){
				choices.push("PARTIAL 2");
				choiceText += "\n"+choices.length+": "+"Short of the partial by 2 or less";
				choices.push("PARTIAL 4");
				choiceText += "\n"+choices.length+": "+"Short of the partial by 4 or less";
				choices.push("PARTIAL_BAD 2");
				choiceText += "\n"+choices.length+": "+"Above the partial threshold by less than 2";
				choices.push("PARTIAL_BAD 4");
				choiceText += "\n"+choices.length+": "+"Above the partial threshold by less than 4";
			}
			let bestExperienced = 0;
			let worstExperienced = 0;
			if(z.players[me] === "Keilani" && !z.revealedHybrids[me] && z.playerLocations[me] !== "Brig"){
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					let val = cardValue(z.skillCardHands[me][j]);
					let color = cardColorID(z.skillCardHands[me][j]);
					if((z.thisInfluence && color === INFLUENCE) || (z.thisLore && color === LORE) || (z.thisObservation && color === OBSERVATION) || (z.thisStrength && color === STRENGTH) ||
					   (z.thisLore && color === LORE)){
					
						if(val > bestExperienced){
							bestExperienced = val;
						}
					} else if(val > worstExperienced){
						worstExperienced = val;
					}
				}
			}
			if(bestExperienced % 2 === 1){
				choices.push("EXPERIENCED FAIL");
				if(!(z.thisPartial > 0)){
					choiceText += "\n"+choices.length+": "+"Failing by "+bestExperienced+" or less";
				} else {
					choiceText += "\n"+choices.length+": "+"Short of passing by "+bestExperienced+" or less";
					choices.push("EXPERIENCED PARTIAL");
					choiceText += "\n"+choices.length+": "+"Short of the partial by "+bestExperienced+" or less";
				}
			}
			if(worstExperienced % 2 === 1){
				choices.push("EXPERIENCED PASS");
				choiceText += "\n"+choices.length+": "+"Passing by less than "+worstExperienced;
				if(z.thisPartial > 0){
					choices.push("EXPERIENCED PARTIAL_BAD");
					choiceText += "\n"+choices.length+": "+"Above the partial by less than "+worstExperienced;
				}
			}
			let samira = 0;
			if(!z.revealedHybrids[me] && z.playerLocations[me] !== "Brig" && z.feats[me].includes("Well Equipped")){
				samira = z.items[me].length;
			}
			if(samira !== 0 && samira !== 2 && samira !== 4){
				choices.push("SAMIRA FAIL");
				if(z.thisPartial > 0){
					choiceText += "\n"+choices.length+": "+"Short of passing by "+samira+" or less";
				} else {
					choiceText += "\n"+choices.length+": "+"Failing by "+samira+" or less";
				}
				choices.push("SAMIRA PASS");
				choiceText += "\n"+choices.length+": "+"Passing by less than "+samira;
				if(z.thisPartial > 0){
					choices.push("SAMIRA PARTIAL");
					choiceText += "\n"+choices.length+": "+"Short of the partial by "+samira+" or less";
					choices.push("SAMIRA PARTIAL_BAD");
					choiceText += "\n"+choices.length+": "+"Above the partial by less than "+samira;
				}
			}
			let instinct = (!z.revealedHybrids[me] && z.playerLocations[me] !== "Brig" && z.feats[me].includes("Instinct"));
			if(instinct){
				choices.push("INSTINCT FAIL");
				if(z.thisPartial > 0){
					choiceText += "\n"+choices.length+": "+"Short of passing by 8 or less";
				} else {
					choiceText += "\n"+choices.length+": "+"Failing by 8 or less";
				}
				if(z.thisPartial > 0){
					choices.push("INSTINCT PARTIAL");
					choiceText += "\n"+choices.length+": "+"Short of the partial by 8 or less";
				}
			}
			
			choices.push("PASS");
			choiceText += "\n"+choices.length+": Passing by any amount";
			choices.push("FAIL");
			choiceText += "\n"+choices.length+": Failing by any amount";
			if(z.thisPartial > 0){
				choices.push("PARTIAL");
				choiceText += "\n"+choices.length+": Partial Pass, regardless of the tally";
			}
			choices.push("ALWAYS");
			choiceText += "\n"+choices.length+": "+"Pause regardless of the tally";
			choices.push("MANUAL");
			choiceText += "\n"+choices.length+": "+"Enter range manually";
			
			promptText += ") if the skill check tally falls in the specified range after skill cards are revealed from this skill check.";
			promptText += "\r\nThis CO cannot be cancelled once placed; multiple COs can be entered if desired.";
			promptText += "\r\nUnder what condition would you like to pause for post-skill check abilities? (1-"+choices.length+")"+choiceText;
			
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let choice = choices[a-1];
				let upper = 0;
				let lower = 0;
				if(choice === "FAIL 2" || choice === "FAIL 4" || choice === "EXPERIENCED FAIL" || choice === "SAMIRA FAIL" || choice === "INSTINCT FAIL"){
					upper = z.thisDifficulty - 1;
					switch(choice){
						case "FAIL 2":
							lower = upper - 1;
							break;
						case "FAIL 4":
							lower = upper - 3;
							break;
						case "EXPERIENCED FAIL":
							lower = upper - bestExperienced + 1;
							break;
						case "SAMIRA FAIL":
							lower = upper - samira + 1;
							break;
						case "INSTINCT FAIL":
							lower = upper - 7;
							break;
					}
				} else if(choice === "PARTIAL 2" || choice === "PARTIAL 4" || choice === "EXPERIENCED PARTIAL" || choice === "SAMIRA PARTIAL" || choice === "INSTINCT PARTIAL"){
					upper = z.thisPartial - 1;
					switch(choice){
						case "PARTIAL 2":
							lower = upper - 1;
							break;
						case "PARTIAL 4":
							lower = upper - 3;
							break;
						case "EXPERIENCED PARTIAL":
							lower = upper - bestExperienced + 1;
							break;
						case "SAMIRA PARTIAL":
							lower = upper - samira + 1;
							break;
						case "INSTINCT PARTIAL":
							lower = upper - 7;
							break;
					}
				} else if(choice === "PASS 2" || choice === "PASS 4" || choice === "EXPERIENCED PASS" || choice === "SAMIRA PASS"){
					lower = z.thisDifficulty;
					switch(choice){
						case "PASS 2":
							upper = lower + 1;
							break;
						case "PASS 4":
							upper = lower + 3;
							break;
						case "EXPERIENCED PASS":
							upper = lower + bestExperienced - 1;
							break;
						case "SAMIRA PASS":
							upper = lower + samira - 1;
							break;
					}
				} else if(choice === "PARTIAL_BAD 2" || choice === "PARTIAL_BAD 4" || choice === "EXPERIENCED PARTIAL_BAD" || choice === "SAMIRA PARTIAL_BAD"){
					lower = z.thisPartial;
					switch(choice){
						case "PARTIAL_BAD 2":
							upper = lower + 1;
							break;
						case "PARTIAL_BAD 4":
							upper = lower + 3;
							break;
						case "EXPERIENCED PARTIAL_BAD":
							upper = lower + bestExperienced - 1;
							break;
						case "SAMIRA PARTIAL_BAD":
							upper = lower + samira - 1;
							break;
					}
				} else if (choice === "ALWAYS"){
					lower = lowerBound;
					upper = upperBound;
				} else if (choice === "PASS"){
					lower = z.thisDifficulty;
					upper = upperBound;
				} else if (choice === "FAIL"){
					lower = lowerBound;
					upper = z.thisDifficulty - 1;
					if(z.thisPartial > 0){
						upper = z.thisPartial - 1;
					}
				} else if (choice === "PARTIAL"){
					lower = z.thisPartial;
					upper = z.thisDifficulty - 1;
				}
				
				if(choice === "MANUAL"){
					let promptText = "What is the lowest skill check tally for which you would like to pause for post-skill check abilities? ("+lowerBound+" to "+upperBound+")";
					promptNum(promptText,(a)=> lowerBound > a || a > upperBound, mainMenu,(lower)=>{
						lowerBound = lower;
						promptText = "What is the highest skill check tally for which you would like to pause for post-skill check abilities? ("+lowerBound+" to "+upperBound+")";
						promptNum(promptText,(a)=> lowerBound > a || a > upperBound, mainMenu, (upper) => {
							addAlert("Post-skill check abilities will be paused for if the skill check tally falls between "+lower+" and "+upper+", inclusive, or within any other range left by another CO.");
							z.determinationCOs.push([lower,upper]);
							mainMenu();
						});
					});
				} else {
					addAlert("Post-skill check abilities will be paused for if the skill check tally falls between "+lower+" and "+upper+", inclusive, or within any other range left by another CO.");
					z.determinationCOs.push([lower,upper]);
					mainMenu();
				}
			});
		} else if (ch === "[The Captain's Banquet] Move to the Galley"){
			confirmify(lc("CAPTAINS_BANQUET_CONFIRM"),mainMenu,()=>{
				movePlayer(me,"Galley");
				removeOption(me,ch);
				let any = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(hasOption(j,ch)){
						any = true;
					}
				}
				if(!any){
					removeFromAll("[The Captain's Banquet] Move on from this crisis");
					doneWithChoiceMythos();
				}
				mainMenu();
			});
		} else if (ch === "[The Captain's Banquet] Move on from this crisis"){
			let confirmText = lc("CAPTAINS_BANQUET_DONE");
			confirmify(confirmText, mainMenu, () => {
				removeFromAll("[The Captain's Banquet] Move to the Galley");
				removeFromAll(ch);
				doneWithChoiceMythos();
				mainMenu();
			});
		} else if (ch === "Barricade the Hatches"){
			confirmify(lc("BARRICADE_THE_HATCHES_CONFIRM"),mainMenu,()=>{
				boldAlert("BARRICADE_THE_HATCHES_ALERT",z.players[me]);
				delete z.barricade;
				z.mythosDiscards.push(BARRICADE_THE_HATCHES);
				/* URULES: what does this do?
				Does this prevent movements from interior to interior spaces?
				Does this prevent the Spawning of Deep Ones in interior spaces?
				Do activating Deep Ones that would move just sit there?				
				*/
				z.barricadeActive = true;
				mainMenu();
			});
		} else if (ch === "[Abandoned Depot] Risk 3 passengers"){
			confirmify(lc("ABANDONED_DEPOT_CONFIRM"),mainMenu,()=>{
				NoSPToken("Risk passenger");
				z.dieRollQueue.push("Risk passenger");
				z.dieRollParams.push(undefined);
				z.dieRollQueue.push("Risk passenger");
				z.dieRollParams.push(undefined);
				z.dieRollQueue.push("Abandoned Depot");
				z.dieRollParams.push(undefined);
				removeOption(me,ch);
				removeOption(me,"[Abandoned Depot] Do not risk any passengers");
				boldAlert("ABANDONED_DEPOT_RISK",z.players[me]);
				mainMenu();
			});
		} else if (ch === "[Abandoned Depot] Do not risk any passengers"){
			confirmify(lc("ABANDONED_DEPOT_CONFIRM_PASS"),mainMenu,()=>{
				plainAlert("CAPTAIN_NO_RISK_PASSENGERS",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Abandoned Depot] Risk 3 passengers");
				doneWithWaypoint();
				mainMenu();
			});
		} else if (ch === "[Seaweed Patch] Risk 2 passengers"){
			confirmify(lc("SEAWEED_PATCH_PASSENGER_CONFIRM"),mainMenu,()=>{
				/* URULES: can I pick this option if I have 0-1 passengers in the supply? */
				if(riskTwoPassengers("Seaweed Patch")){
					doneWithWaypoint();
				}
				removeOption(me,ch);
				removeOption(me,"[Seaweed Patch] Damage the ship");
				mainMenu();
			});
		} else if(ch === "[Deserted Island] Risk a passenger" || ch === "[Rainstorm] Risk a passenger"){
			confirmify(lc("DESERTED_ISLAND_CONFIRM"),mainMenu,()=>{
				NoSPToken("Risk passenger");
				if(ch === "[Deserted Island] Risk a passenger"){
					z.dieRollQueue.push("Deserted Island");
					z.dieRollParams.push(undefined);
				} else {
					z.dieRollQueue.push("Rainstorm");
					z.dieRollParams.push(undefined);
				}
				removeOption(me,ch);
				removeOption(me,"[Deserted Island] Do not risk a passenger");
				removeOption(me,"[Rainstorm] Do not risk a passenger");
				boldAlert("DESERTED_ISLAND_RISK",z.players[me]);
				mainMenu();
			});
		} else if (ch === "[Deserted Island] Do not risk a passenger" || ch === "[Rainstorm] Do not risk a passenger"){
			confirmify(lc("DESERTED_ISLAND_CONFIRM_PASS"),mainMenu,()=>{
				plainAlert("CAPTAIN_NO_RISK_PASSENGERS",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Deserted Island] Risk a passenger");
				removeOption(me,"[Rainstorm] Risk a passenger");
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Shipwreck Survivors] Risk a passenger"){
			confirmify(lc("SHIPWRECK_SURVIVORS_CONFIRM"),mainMenu,()=>{
				NoSPToken("Risk passenger");
				z.dieRollQueue.push("Shipwreck Survivors");
				z.dieRollParams.push(undefined);
				removeOption(me,ch);
				removeOption(me,"[Shipwreck Survivors] Do not risk a passenger");
				boldAlert("DESERTED_ISLAND_RISK",z.players[me]);
				mainMenu();
			});
		} else if (ch === "[Shipwreck Survivors] Do not risk a passenger"){
			confirmify(lc("SHIPWRECK_SURVIVORS_CONFIRM_PASS"),mainMenu,()=>{
				plainAlert("CAPTAIN_NO_RISK_PASSENGERS",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Shipwreck Survivors] Risk a passenger");
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Aurora] Risk a passenger"){
			confirmify(lc("SHIPWRECK_SURVIVORS_CONFIRM"),mainMenu,()=>{
				NoSPToken("Risk passenger",["Aurora",me]);
				removeOption(me,ch);
				removeOption(me,"[AURORA] Do not risk a passenger");
				boldAlert("DESERTED_ISLAND_RISK",z.players[me]);
				mainMenu();
			});
		} else if(ch === "[Aurora] Do not risk a passenger"){
			confirmify(lc("AURORA_CONFIRM_PASS"),mainMenu,()=>{
				plainAlert("CAPTAIN_NO_RISK_PASSENGERS",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Aurora] Risk a passenger");
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Aurora] Spawn 2 allies"){
			let options = [];
			let promptText = "";
			for(let j = DECK; !(j>=SICK_BAY); j++){
				if(isAdjacent(d.spaceNames[j],z.playerLocations[me]) || d.spaceNames[j] === z.playerLocations[me]){
					options.push(j);
					promptText += "\n"+options.length+": "+lc(d.spaceNames[j]);
				}
			}
			promptNum(lc("AURORA_PROMPT",options.length)+promptText,(a)=>1>a||a>options.length,mainMenu,(a)=>{
				spawnAlly(d.spaceNames[options[a-1]]);
				spawnAlly(d.spaceNames[options[a-1]]);
				removeOption(me,ch);
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Wrecked Ship] Risk a passenger"){
			confirmify(lc("WRECKED_SHIP_CONFIRM"),mainMenu,()=>{
				NoSPToken("Risk passenger");
				z.dieRollQueue.push("Wrecked Ship");
				z.dieRollParams.push(undefined);
				removeOption(me,ch);
				removeOption(me,"[Wrecked Ship] Do not risk a passenger");
				boldAlert("DESERTED_ISLAND_RISK",z.players[me]);
				mainMenu();
			});
		} else if (ch === "[Wrecked Ship] Do not risk a passenger"){
			confirmify(lc("WRECKED_SHIP_CONFIRM_PASS"),mainMenu,()=>{
				plainAlert("CAPTAIN_NO_RISK_PASSENGERS",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Wrecked Ship] Risk a passenger");
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Volunteer Army] Risk passengers"){
			let max = z.passengerSupply.length;
			if(max > 4){
				max = 4;
			}
			promptNum(lc("VOLUNTEER_ARMY_PROMPT",max),(a)=>1>a||a>max,mainMenu,(a)=>{
				if(a === 4){
					riskFourPassengers(["Volunteer Army",4]);
				} else if(a === 3){
					riskThreePassengers(["Volunteer Army",3]);
				} else if(a === 2){
					riskTwoPassengers(["Volunteer Army",2]);
				} else {
					riskPassenger(["Volunteer Army",1]);
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Defeat a Deep One" || ch === "[Volunteer Army] Defeat a Deep One"){
			let choices = [];
			let context = getContext(me,ch);
			let man = isMandatory(me,ch);
			/* UTODO: make automatic if all in same sector */
			let promptText = "";
			let start = WATER;
			if(ch === "[Volunteer Army] Defeat a Deep One" || context === "Disappearing Food"){
				start = DECK;
			} else if(context === "Missing Munitions"){
				start = INTERIOR;
			}
			for(let j = start; !(j>=d.spaceNames.length); j++){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j){
						choices.push(j);
						promptText += "\n"+choices.length+": "+lc(d.spaceNames[j]);
						break; 
					}
				}
			}
			promptText = lc("DEFEAT_DEEP_ONE_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] === choices[a-1]){
						z.deepOnes[j] = RESERVES;
						break;
					}
				}
				removeOption(me,ch);
				plainAlert("DEFEAT_DEEP_ONE_ALERT",[z.players[me],d.spaceNames[choices[a-1]]]);
				if(Number.isInteger(context)){
					context--;
					if(context > 0){
						addOption(me,ch,context,man);
					} else {
						if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
							finishedAction();
						}
						if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
						if(ch === "[Volunteer Army] Defeat a Deep One"){
							doneWithChoiceMythos();
						}
					}
				}
				if(context === "Cast Out" || context === "Cast Out (bis)"){
					removeOption(me,ch);
					removeOption(me,"Repel a Horror");
					removeOption(me,"Defeat a Deep One");
					removeOption(me,"Do not resolve Cast Out again");
					if(context === "Cast Out (bis)"){
						SPTokenBad("Cast Out",me);
					}
				} else if(Array.isArray(context) && context[2] === "Storm of Spirits"){
					context[3]++;
					let any = (z.shoggoth && z.shoggoth >= DECK) || (z.drownedSpirit && z.drownedSpirit >= DECK) || z.graspingTendril;
					let any2 = any;
					let count = 0;
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] >= DECK){
							any = true;
							count++;
						}
						any = (z.deepOnes[j] >= DECK) || any;
					}
					if(context[3] === 7 || !any){
						SPTokenBad("Storm of Spirits",context[3]);
					} else {
						if(any2){
							addOption(me,"Repel a Horror",context,true);
						}
						if(count){
							addOption(me,"Defeat a Deep One",context,true);
						}
						addOption(me,"I'm done defeating monsters",context,true);
					}
				}
				if(context === "Missing Munitions" || context === "Disappearing Food"){
					clearSkillCheck();
				}
				mainMenu();
			});
		} else if (ch === "[Summon Fire] Roll a die"){
			confirmify(lc("SUMMON_FIRE_CONFIRM"),mainMenu,()=>{
				SPTokenBad("Summon Fire");
				removeFromAll(ch);
				mainMenu();
			});
		} else if (ch === "[Taken] Choose a ship space"){

			let zones = ["Deck","Interior"];
			let promptText = lc("TAKEN_WHERE");
			for(let j = 0; !(j>=zones.length); j++){
				promptText += "\n"+(j+1)+": "+zones[j];
			}
			
			promptNum(promptText,(a)=>1>a||a>zones.length,mainMenu,(a)=>{
				if(zones[a-1] === "Deck"){
					let promptText = lc("TAKEN_DECK");
					for(let j = 0; !(j>=8); j++){
						promptText += "\n"+(j+1)+": "+lc(d.spaceNames[j+DECK]);
					}
					promptNum(promptText,(a)=>1>a||a>8,mainMenu,(a)=>{
						let any = false;
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === a-1+DECK){
								any = true;
								z.deepOnes[j] = RESERVES;
							}
						}
						if(any){
							addAlert("SUMMON_THE_BEAST_WITHIN_DEEP_ONES",d.spaceNames[a-1+DECK]);
						}
						spawnAlly(d.spaceNames[a-1+DECK]);
						removeOption(me,ch);
						clearSkillCheck();
						mainMenu();
					});
				} else if(zones[a-1] === "Interior"){
					let promptText = lc("TAKEN_INTERIOR");
					for(let j = 0; !(j>=6); j++){
						promptText += "\n"+(j+1)+": "+lc(d.spaceNames[j+INTERIOR]);
					}
					promptNum(promptText,(a)=>1>a||a>6,mainMenu,(a)=>{
						let any = false;
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === a-1+INTERIOR){
								any = true;
								z.deepOnes[j] = RESERVES;
							}
						}
						if(any){
							addAlert("SUMMON_THE_BEAST_WITHIN_DEEP_ONES",d.spaceNames[a-1+INTERIOR]);
						}
						spawnAlly(d.spaceNames[a-1+INTERIOR]);
						removeOption(me,ch);
						clearSkillCheck();
						mainMenu();
					});
				}
			});

		} else if (ch === "[Astral Travel] Choose a space"){
			/* URULES: Can I pick a water space? */
			let choices = [];
			let promptText = "";
			for(let j = WATER; !(j>=d.spaceNames.length); j++){
				let any = false;
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j){
						any = true;
						break;
					}
				}
				for(let k = 0; !any && !(k>=z.playerLocations.length); k++){
					if(locationIndex(z.playerLocations[k]) === j){
						any = true;
					}
				}
				if(any){
					choices.push(j);
					promptText += "\n"+choices.length + ": "+lc(d.spaceNames[j]);
				}
			}
			promptText = lc("ASTRAL_TRAVEL_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				boldAlert("ASTRAL_TRAVEL_TARGET",[z.players[me],d.spaceNames[choices[a-1]]]);
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === choices[a-1]){
						addOption(me,"[Astral Travel] Move a Deep One",choices[a-1],false);
						break;
					}
				}
				for(let k = 0; !(k>=z.playerLocations.length); k++){
					if(locationIndex(z.playerLocations[k]) === choices[a-1]){
						addOption(me,"[Astral Travel] Move a player",choices[a-1],false);
						break;
					}
				}
				SPTokenBad("Astral Travel");
				removeOption(me,ch);
				mainMenu();
			});
			
		} else if (ch === "Move a Deep One"){
			let context = getContext(me,ch);
			let man = isMandatory(me,ch);
			let choices = [];
			let promptText = "";
			for(let j = DECK; !(j>=INTERIOR+6); j++){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j && context[k]){
						choices.push(j);
						promptText += "\n"+(choices.length)+": "+lc(d.spaceNames[j]);
						break;
					}
				}
			}
			let pickDestination = (a)=>{
				let choices2 = [];
				let promptText = "";
				let stop = INTERIOR + 6;
				if(z.barricadeActive){
					stop = INTERIOR;
				}
				for(let j = WATER; !(j>=stop); j++){
					if(isAdjacent(d.spaceNames[j],d.spaceNames[choices[a-1]])){
						choices2.push(j);
						promptText += "\n"+(choices2.length)+": "+lc(d.spaceNames[j]);
					}
				}
				promptText = lc("ON_THE_OFFENSIVE_PROMPT_2",[d.spaceNames[choices[a-1]],choices2.length])+promptText;
				promptNum(promptText,(b)=>1>b||b>choices2.length,mainMenu,(b)=>{
					for(let k = 0; !(k>=z.deepOnes.length); k++){
						if(z.deepOnes[k] === choices[a-1] && context[k]){
							z.deepOnes[k] = choices2[b-1];
							fleeCheck(choices2[b-1]);
							context[k] = false;
							plainAlert("ON_THE_OFFENSIVE_MOVE_ALERT",[z.players[me],d.spaceNames[choices[a-1]],d.spaceNames[choices2[b-1]]]);
							break;
						}
					}
					let any = false;
					for(let j = 0; !(j>=context.length); j++){
						if(context[j]){
							any = true;
							break;
						}
					}
					removeOption(me,ch);
					if(any){
						addOption(me,ch,context,man);
					} else {
						removeOption(me,"Clear skill check");
						clearSkillCheck();
					}
					mainMenu();
				});
			};
			if(choices.length === 1){
				pickDestination(1);
			} else {
				promptText = lc("ON_THE_OFFENSIVE_PROMPT",choices.length)+promptText;
				promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,pickDestination);
			}
		} else if (ch === "[Astral Travel] Move a Deep One"){
			let context = getContext(me,ch);
			let doIt = (a)=>{
				if(a === 1){
					let promptText = lc("ASTRAL_TRAVEL_DEEP_ONE_DECK");
					for(let j = 0; !(j>=8); j++){
						promptText += "\n"+(j+1)+": ";
						if(context === j + DECK){
							promptText += lc("(cannot move here)");
						} else {
							promptText += lc(d.spaceNames[j+DECK]);
						}
					}
					promptNum(promptText,(a)=>1>a||a>8||a-1+DECK===context,mainMenu,(a)=>{
						let done = false;
						let anyMore = false;
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === context){
								if(!done){
									z.deepOnes[j] = DECK+a-1;
									fleeCheck(DECK+a-1);
									done = true;
								} else {
									anyMore = true;
								}
							}
						}
						plainAlert("ASTRAL_TRAVEL_DEEP_ONE_ALERT",[z.players[me],d.spaceNames[DECK+a-1]]);
						if(!anyMore){
							removeOption(me,ch);
						}
						mainMenu();
					});
				} else {
					let promptText = lc("ASTRAL_TRAVEL_DEEP_ONE_INTERIOR");
					for(let j = 0; !(j>=6); j++){
						promptText += "\n"+(j+1)+": ";
						if(context === j + INTERIOR){
							promptText += lc("(cannot move here)");
						} else {
							promptText += lc(d.spaceNames[j+INTERIOR]);
						}
					}
					promptNum(promptText,(a)=>1>a||a>6||a-1+INTERIOR===context,mainMenu,(a)=>{
						let done = false;
						let anyMore = false;
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === context){
								if(!done){
									z.deepOnes[j] = INTERIOR+a-1;
									fleeCheck(INTERIOR+a-1);
									done = true;
								} else {
									anyMore = true;
								}
							}
						}
						plainAlert("ASTRAL_TRAVEL_DEEP_ONE_ALERT",[z.players[me],d.spaceNames[INTERIOR+a-1]]);
						if(!anyMore){
							removeOption(me,ch);
						}
						mainMenu();
					});
				}
			};
			if(z.barricadeActive){
				doIt(1);
			} else {
				promptNum(lc("ASTRAL_TRAVEL_DEEP_ONE_PROMPT_1"),(a)=>1>a||a>2,mainMenu,doIt);
			}
var a1 = "ENDTMRB  [/size][/c] " + 
" [c][size=1] STARTTMRC";
		} else if (ch === "[Astral Travel] Move a player"){ 
			let context = getContext(me,ch);
			let players = [];
			let promptText = ""; 
			for(let j = 0; !(j>=z.playerLocations.length); j++){
				if(d.spaceNames[context] === z.playerLocations[j]){
					players.push(j);
					promptText += "\n"+": "+players.length+": "+lc(z.players[j]);
				}
			}
			let pickWhere = (player)=>{
				let zones = ["Deck","Interior"];
				if(context !== SICK_BAY){
					zones.push("Sick Bay");
				}
				if(context !== BRIG){
					zones.push("Brig");
				}
				let promptText = lc("ASTRAL_TRAVEL_WHERE",[z.players[player],zones.length]);
				for(let j = 0; !(j>=zones.length); j++){
					promptText += "\n"+(j+1)+": "+zones[j];
				}
				let cleanup = ()=>{
					let any = false;
					for(let j = 0; !(j>=z.playerLocations.length); j++){
						if(z.playerLocations[j] === d.spaceNames[context]){
							any = true;
							break;
						}
					}
					if(!any){
						removeOption(me,ch);
					}
					mainMenu();
				};
				
				promptNum(promptText,(a)=>1>a||a>zones.length,mainMenu,(a)=>{
					if(zones[a-1] === "Deck"){
						let promptText = lc("ASTRAL_TRAVEL_DECK",z.players[player]);
						for(let j = 0; !(j>=8); j++){
							promptText += "\n"+(j+1)+": ";
							if(context === j + DECK){
								promptText += lc("(cannot move here)");
							} else {
								promptText += lc(d.spaceNames[j+DECK]);
							}
						}
						promptNum(promptText,(a)=>1>a||a>8||a-1+DECK===context,mainMenu,(a)=>{
							movePlayer(player,d.spaceNames[a-1+DECK]);
							cleanup();
						});
					} else if(zones[a-1] === "Interior"){
						let promptText = lc("ASTRAL_TRAVEL_INTERIOR",z.players[player]);
						for(let j = 0; !(j>=6); j++){
							promptText += "\n"+(j+1)+": ";
							if(context === j + INTERIOR){
								promptText += lc("(cannot move here)");
							} else {
								promptText += lc(d.spaceNames[j+INTERIOR]);
							}
						}
						promptNum(promptText,(a)=>1>a||a>8||a-1+INTERIOR===context,mainMenu,(a)=>{
							movePlayer(player,d.spaceNames[a-1+INTERIOR]);
							cleanup();
						});
					} else if(zones[a-1] === "Sick Bay"){
						movePlayer(player,"Sick Bay");
						cleanup();
					} else if(zones[a-1] === "Brig"){
						movePlayer(player,"Brig");
						cleanup();
					}
				});
			};
			
			if(players.length === 1){
				pickWhere(players[0]);
			} else {
				promptText = lc("ASTRAL_TRAVEL_PLAYER_PROMPT",players.length)+promptText;
				promptNum(promptText,(a)=>1>a||a>players.length,mainMenu,(a)=>{
					pickWhere(players[a-1]);
				});
			}
		} else if (ch === "Assign Flesh Ward"){
			let promptText = lc("FLESH_WARD_PROMPT",z.numPlayers);
			for(let j = 0; !(j>=z.players.length); j++){
				promptText += "\n"+(j+1)+": "+lc(z.players[j]);
			}
			promptNum(promptText,(a)=>1>a||a>z.players.length,mainMenu,(a)=>{
				plainAlert("FLESH_WARD_PLACED",[z.players[me],z.players[a-1]]);
				z.fleshWard = a-1;
				removeOption(me,ch);
				if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
					finishedAction();
				}
				if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				mainMenu();
			});
		} else if (ch === "Remove 1 of your items from the game"){
			let promptText = lc("ITEM_REMOVAL_PROMPT",z.items[me].length);
			for(let j = 0; !(j>=z.items[me].length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.itemNames[z.items[me][j]]);
			}
			promptNum(promptText,(a)=>1>a||a>z.items[me].length,mainMenu,(a)=>{
				let item = z.items[me][a-1];
				plainAlert("ITEM_REMOVED",[z.players[me],d.itemNames[z.items[me][a-1]]]);
				z.items[me].splice(a-1,1);
				if(d.itemNames[item] === "Cursed Mask"){
					plainAlert("CURSED_MASK_TRIGGER",z.players[me]);
					z.items[me].push(item);
					if(me === z.cursedWhispers){
						SPTokenBad("Cursed Whispers","Choice Mythos");
					} else {
						dealSkillCard(me,TREACHERY);
					}
				} else {
					if(isImprovement(item) || item === VALISE){
						if(!resetImprovements(me)){
							addOption(me,"Activate an Improvement","Criminal Activity",true);
							plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
						}
					}
				}
				if(!hasOption(me,"Activate an Improvement")){
					doneWithChoiceMythos();
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Remove all but 1 of your items from the game"){
			let promptText = lc("CRIMINAL_ACTIVITY_PROMPT",z.items[me].length);
			for(let j = 0; !(j>=z.items[me].length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.itemNames[z.items[me][j]]);
			}
			promptNum(promptText,(a)=>1>a||a>z.items[me].length,mainMenu,(a)=>{
				plainAlert("CRIMINAL_ACTIVITY_ALERT",[z.players[me],d.itemNames[z.items[me][a-1]]],getGender(me));
				a--;
				for(let j = 0; !(j>=z.items[me].length); j++){
					if(j !== a){
						/* URULES: this */
						if(d.itemNames[z.items[me][j]] === "Cursed Mask"){
							plainAlert("CURSED_MASK_TRIGGER",z.players[me]);
							if(j === z.cursedWhispers){
								SPTokenBad("Cursed Whispers","Criminal Activity");
							} else {
								dealSkillCard(me,TREACHERY);
							}
						} else {
							z.items[me].splice(j,1);
							
							j--;
							a--;
						}
					}
				}
				resetImprovements(me);
				removeOption(me,ch);
				let any = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(hasOption(j,ch)){
						any = true;
						break;
					}
				}
				if(!any && z.dieRollQueue.length === 0 && z.lastDieRoll === null){
					clearSkillCheck();
				}
				mainMenu();
				/* UTODO: item graveyard */
			});
		} else if (ch === "Memory of the Deep"){
			confirmify(lc("MEMORY_OF_THE_DEEP_CONFIRM_ACTION"),mainMenu,()=>{
				z.midAction = "Memory of the Deep";
				z.actionPerformer = me;
				printlnBold("William uses the action on Memory of the Deep.");
				startLocationSkillCheck("Memory of the Deep");
				didAction();
				mainMenu();
			});
		} else if(ch === "Sacrifice Deep One"){
			confirmify(lc("SACRIFICE_DEEP_ONE_CONFIRM"),mainMenu,()=>{
				plainAlert("SACRIFICE_DEEP_ONE_ALERT",z.players[me],getGender(me));
				didAction();
				SPTokenBad("Sacrifice Deep One");
				z.midAction = "Sacrifice Deep One";
				z.actionPerformer = me;
				mainMenu();
			});
		} else if (ch === "[Seaweed Patch] Damage the ship"){
			confirmify(lc("DAMAGE_SHIP_CONFIRM"),mainMenu,()=>{
				removeOption(me,"[Seaweed Patch] Risk 2 passengers");
				removeFromAll(ch);
				if(damageShip("Waypoint")){
					doneWithWaypoint();
				}
				mainMenu();
			});
		} else if (ch === "Defeat a player"){
			let context = getContext(me,ch);
			if(context === "Signs of Life"){
				confirmify(lc("SIGNS_OF_LIFE_CONFIRM","Jeanne"),mainMenu,()=>{
					defeat(getPlayerNum("Jeanne"),"Signs of Life");
					removeFromAll(ch);
					mainMenu();
				});
			} else if(context === "Signs of Life Edmund"){
				confirmify(lc("SIGNS_OF_LIFE_CONFIRM","Edmund"),mainMenu,()=>{
					defeat(getPlayerNum("Edmund"),"Signs of Life");
					removeFromAll(ch);
					mainMenu();
				});
			} else if(context === "Cast Out" || context === "Cast Out (bis)"){
				let choices = [];
				let promptText = "";
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.revealedHybrids[j]){
						choices.push(j);
						promptText += "\n"+choices.length+": "+lc(z.players[j]);
					}
				}
				promptNum(lc("CAST_OUT_TRAITOR_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					removeOption(me,ch);
					removeOption(me,"Repel a Horror");
					removeOption(me,"Defeat a Deep One");
					removeOption(me,"Do not resolve Cast Out again");
					defeat(choices[a-1]);
					if(context === "Cast Out (bis)"){
						SPTokenBad("Cast Out",me);
					}
					mainMenu();
				});
			}
		} else if(ch === "Discard Memory of the Deep"){
			let confirmText = lc("MEMORY_OF_THE_DEEP_CONFIRM_1");
			if(z.memoryOfTheDeep){
				confirmText = lc("MEMORY_OF_THE_DEEP_CONFIRM_2");
			}
			confirmify(confirmText,mainMenu,()=>{
				boldAlert("MEMORY_OF_THE_DEEP_DISCARD");
				removeOption(me,ch);
				removeOption(me,"Clear skill check");
				discardMythos();
				z.finishedMythos = true;
				clearSkillCheck();
				mainMenu();
			});
		} else if (ch === "[The Game is Afoot] Choose an interior space"){
			/* URULES: Sickbay and Brig are not interior spaces, right? */
			let promptText = lc("THE_GAME_IS_AFOOT_PROMPT");
			for(let j = 0; !(j>=8); j++){
				promptText += "\n"+(j+1)+": "+lc(d.spaceNames[j+INTERIOR]);
			}
			promptNum(promptText,(a)=>1>a||a>8,mainMenu,(a)=>{
				boldAlert("THE_GAME_IS_AFOOT_ALERT",d.spaceNames[a-1+INTERIOR]);
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] === a-1 + INTERIOR){
						z.deepOnes[j] = RESERVES;
					}
				}
				removeOption(me,ch);
				clearSkillCheck();
				mainMenu();
			});
		} else if (ch === "Beck and Call [Feat]"){
			let options = [];
			let promptText = "";
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(j !== me && z.playerLocations[j] !== "Brig" && z.playerLocations[j] !== "Sick Bay"){
					options.push(j);
					promptText += "\n"+options.length+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("BECK_AND_CALL_PROMPT",options.length)+promptText,(a)=>1>a||a>options.length,mainMenu,(a)=>{
				boldAlert("BECK_AND_CALL_DONE",z.players[me],getGender(me));
				z.feats[me].splice(z.feats[me].indexOf("Beck and Call"),1);
				movePlayer(me,z.playerLocations[options[a-1]]);
				if(z.cursedWhispers === me){
					let count = 0;
					for(let j = 0; !(j>=z.items[me].length); j++){
						if(isImprovement(z.items[me][j])){
							count++;
						}
					}
					if(2 >= count){
						SPTokenBad("Cursed Whispers","Beck and Call");
						removeOption(me,"Receive Skills for this turn");
						removeOption(me,ch);
					} else {
						addOption(me,"[Beck and Call] Draw skill cards",undefined,true);
						removeOption(me,"Receive Skills for this turn");
						removeOption(me,ch);
					}
				} else {
					let alertText = lc("You drew:");
					for(let j = 0; !(j>=z.items[me].length); j++){
						if(isImprovement(z.items[me][j])){
							let card = dealSkillCard(z.turn,z.items[me][j] - FINE_CLOTHES);
							alertText += "\n"+cardText(card);
						}
					}
					if(z.playerLocations[me] === "Sick Bay"){
						addAlert(alertText);
						println("SICK_BAY_ALERT",z.players[z.turn],getGender(z.turn));
						addOption(z.turn,"Draw 1 Skill Card","Sick Bay",true);
					} else {
						for(let i = 0; !(i >= 5); i++) {
							for(let j = d.skillDraws[i ][getCharacter(z.players[z.turn])]; j > 0; j--) {
								let card = dealSkillCard(z.turn, i);
								alertText += "\n"+cardText(card);
							}
						}
						if(z.activeImprovements[z.turn] && z.playerLocations[z.turn] !== "Brig"){
							let card = dealSkillCard(z.turn,z.activeImprovements[z.turn] - FINE_CLOTHES);
							alertText += "\n"+cardText(card);
						}
						if(itemPresent("Valise") && itemHolder("Valise") === z.turn && z.valiseImprovement){
							dealSkillCard(z.turn,z.valiseImprovement - FINE_CLOTHES);
						}
						if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === z.turn && z.playerLocations[z.turn] !== "Brig"){
							dealSkillCard(z.turn,TREACHERY);
						}
						if(z.blessing === me){
							dealSkillCard(z.turn,BOON);
						}
						addAlert(alertText);
						z.phase = 1;
					}
					removeOption(me,ch);
					removeOption(me,"Receive Skills for this turn");
					mainMenu();
				}
			});
			
		} else if (ch === "Activate an Improvement"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.items[me].length); j++){
				if(isImprovement(z.items[me][j])){
					choices.push(z.items[me][j]);
					promptText += "\n"+(choices.length)+": "+lc(d.itemNames[z.items[me][j]]);
				}
			}
			promptText = lc("ACTIVATE_IMPROVEMENT_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				
				let finishUp = ()=>{
					let context = getContext(me,ch);
					removeOption(me,ch);
					if(context === "Receive Skills"){
						if(z.playerLocations[z.turn] === "Sick Bay"){
							println("SICK_BAY_ALERT",z.players[z.turn],getGender(z.turn));
							addOption(z.turn,"Draw 1 Skill Card","Sick Bay",true);
						} else if(z.revealedHybrids[z.turn] === 1){
							println("RECEIVE_SKILLS_TRAITOR",z.players[z.turn],getGender(z.turn));
							addOption(z.turn,"Receive Skills for this turn",undefined,true);
						} else {
							let alertText = lc("You drew:");
							for(let i = 0; !(i >= 5); i++) {
								for(let j = d.skillDraws[i ][getCharacter(z.players[z.turn])]; j > 0; j--) {
									let card = dealSkillCard(z.turn, i);
									alertText += "\n"+cardText(card);
								}
							}
							if(z.activeImprovements[z.turn] && z.playerLocations[z.turn] !== "Brig"){
								let card = dealSkillCard(z.turn,z.activeImprovements[z.turn] - FINE_CLOTHES);
								alertText += "\n"+cardText(card);
							}
							if(itemPresent("Valise") && itemHolder("Valise") === z.turn && z.valiseImprovement){
								dealSkillCard(z.turn,z.valiseImprovement - FINE_CLOTHES);
							}
							if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === z.turn && z.playerLocations[z.turn] !== "Brig"){
								dealSkillCard(z.turn,TREACHERY);
							}
							if(z.blessing === me){
								dealSkillCard(z.turn,BOON);
							}
							addAlert(alertText);
							z.phase = 1;
						}
						
					} else if(z.midAction === "Scavenger" || z.midAction === "Cargo Hold" || z.midAction === "Valise"){
						finishedAction();
					} else if (context === "Pickpocket"){
						let any = false;
						for(let j = 0; !any && !(j>=z.numPlayers); j++){
							if(hasOption(j,"Activate an Improvement")){
								any = true;
							}
						}
						if(!any){
							doneWithRevealEffect(getPlayerNum("Samira"));
						}
					} else if (context === "Just Desserts" || context === "The Anarcho-Individualist" || context === "Criminal Activity" || context === "Pickpocket (OR)" || context === "Inheritance"){
						doneWithChoiceMythos();
					} else if (context === "Passenger Riot" || context === "Disappearing Belongings" || context === "Pickpocket (fail)"){
						clearSkillCheck();
					} else if (context === "Unsecured Cargo" || context === "Battering Waves"){
						let any = false;
						for(let j = 0; !(j>=z.numPlayers) && !any; j++){
							any = hasOption(j,"Activate an Improvement");
						}
						any |= ((z.dieRollQueue.length > 0 || z.lastDieRoll !== null) && context === "Battering Waves");
						if(!any){
							clearSkillCheck();
						}
					} else if(context === "Gambler"){
						wander(GAMBLER);
					}
					mainMenu();
				};
				
				if(itemHolder("Valise") === me){
					let choices2 = [];
					let promptText = "";
					for(let j = 0; !(j>=z.items[me].length); j++){
						if(isImprovement(z.items[me][j])){
							choices2.push(z.items[me][j]);
							promptText = "\n"+(choices2.length)+": ";
							if(z.items[me][j] === z.activeImprovements[me]){
								promptText += lc("(already active)");
							} else {
								promptText += lc(d.itemNames[z.items[me][j]]);
							}
						}
					}
					promptNum(lc("ACTIVATE_VALISE_PROMPT",choices2.length)+promptText,(b)=>1>b||b>choices2.length||z.items[me][b-1]===choices[a-1],mainMenu,(b)=>{
						z.activeImprovements[me] = choices[a-1];
						boldAlert("LOCATION_ACTIVATED",[z.players[me],d.itemNames[choices[a-1]]]);
						z.valiseImprovement = choices2[b-1];
						boldAlert("LOCATION_ACTIVATED",[z.players[me],d.itemNames[choices2[b-1]]]);
						finishUp();
					});
				} else {
					z.activeImprovements[me] = choices[a-1];
					boldAlert("LOCATION_ACTIVATED",[z.players[me],d.itemNames[choices[a-1]]]);
					finishUp();
				}
			});
		} else if (ch === "Risk a passenger"){
			confirmify(lc("RISK_PASSENGER_CONFIRM"),mainMenu,()=>{
				let context = getContext(me,ch);
				riskPassenger("Adrift Fishing Boat Pass 2");
				if(context === "Adrift Fishing Boat"){
					removeOption(me,"Clear skill check");
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "Discard skill cards to leave the Brig"){
			let chosen = [];
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				chosen.push(false);
			}
			let pickCard = (value) => {
				let promptText = lc("BREAK_OUT_PROMPT",[z.skillCardHands[me].length,value]);
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					promptText += "\n"+(j+1)+": ";
					if(chosen[j]){
						promptText += lc("(already chosen)");
					} else {
						promptText += cardText(z.skillCardHands[me][j]);
					}
					
				}
				promptNum(promptText,(a)=>1>a||a>z.skillCardHands[me].length||chosen[a-1],mainMenu,(a)=>{
					chosen[a-1] = true;
					value += cardValue(z.skillCardHands[me][a-1]);
					/* URULES: can I just ditch extra cards for no reason? */
					if(value >= 12){
						let confirmText = lc("BREAK_OUT_CONFIRM");
						for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
							if(chosen[j]){
								confirmText += "\n"+cardText(z.skillCardHands[me][j]);
							}
						}
						confirmify(confirmText,mainMenu,()=>{
							let numDiscards = 0;
							for(let j = 0; !(j>=chosen.length); j++){
								if(chosen[j]){
									discardSkillCard(me,j-numDiscards);
									numDiscards++;
								}
							}
							addOption(me,"Move","Break Out",true);
							z.midAction = "Break Out";
							z.actionPerformer = me;
							mainMenu();
						});
					} else {
						pickCard(value);
					}
				});
				
			};
			pickCard(0);
		} else if (ch === "Enable trading in your space"){
			confirmify(lc("TRADING_CONFIRM"),mainMenu,()=>{
				let alertText = lc("TRADING_ALERT",z.players[me],getGender(me));
				for(let j = 0; !(j>=z.playerLocations.length); j++){
					if(z.playerLocations[me] === z.playerLocations[j]){
						alertText += "\n"+z.players[j];
						if(z.items[j].length > 0){
							addOption(j,"Give an item to another player",undefined,false);
						}
					}
				}
				boldAlert(alertText);
				didAction();
				z.actionPerformer = me;
				delete z.cursedExploit;
				finishedAction();
				mainMenu();
			});
		} else if (ch === "Almanac"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardColorID(z.skillCardHands[me][j]) === OBSERVATION || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
					choices.push(j);
					promptText += "\n"+(choices.length)+": "+cardText(z.skillCardHands[me][j]);
				}
			}
			promptText = lc("ALMANAC_PROMPT",choices.length) + promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let card = z.skillCardHands[me][choices[a-1]];
				let value = cardValue(card);
				z.almanac = false;
				discardSkillCard(me,choices[a-1]);
				boldAlert("ALMANAC_ALERT",[z.players[me],value]);
				z.dieRollModifier += value;
				z.sps[me].push([card,value]);
				SPToken(lc(z.dieRollQueue[0],z.dieRollParams[0]));
				mainMenu();
			});
		} else if (ch === "[Structural Damage] Discard a Skill Card"){
			let choices = [];
			let context = getContext(me,ch);
			let promptText = "";
			let damage = z.damage[locationIndex(z.playerLocations[me])-INTERIOR];
			let threshold = 3;
			if(damage === TREACHERY){
				threshold = 5;
			}
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardColorID(z.skillCardHands[me][j]) === damage || cardName(z.skillCardHands[me][j]) === "Ingenuity" || damage === TREACHERY){
					choices.push(j);
					promptText += "\n"+(choices.length)+": "+cardText(z.skillCardHands[me][j]);
				}
			}
			promptText = lc("STRUCTURAL_DAMAGE_PROMPT",[choices.length,context,threshold]) + promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				/* UTODO: can I keep discarding? */
				let value = cardValue(z.skillCardHands[me][choices[a-1]]);
				discardSkillCard(me,choices[a-1]);
				context += value;
				removeOption(me,ch);
				if(context >= threshold){
					z.damageDeck.push(z.damage[locationIndex(z.playerLocations[me])-INTERIOR]);
					z.damage[locationIndex(z.playerLocations[me])-INTERIOR] = -1;
					shuffle(z.damageDeck);
					boldAlert("STRUCTURAL_DAMAGE_REPAIRED",[z.playerLocations[me],d.damageNames[damage]]);
					finishedAction();
				} else {
					addOption(me,ch,context,true);
				}
				mainMenu();
			});
		} else if (ch === "[Call to Action] Activate each Deep One in your space"){
			confirmify(lc("CALL_TO_ACTION_OWN_SPACE_CONFIRM"),mainMenu,()=>{
				printlnBold("CALL_TO_ACTION_OWN_SPACE_PRINT",z.players[me],getGender(me));
				let numActivating = 0;
				resetDeepOneActivations();
				for(let j = 0; !(j >= z.deepOnes.length); j++) {
					if(z.deepOnes[j] !== locationIndex(z.playerLocations[me])) {
						z.deepOneActivated[j] = 1;
					} else {
						numActivating++;
					}
				}
				removeOption(me,ch);
				removeOption(me,"[Call to Action] Activate 1 Deep One in any space");
				if(numActivating > 0){
					resumeDeepOneActivation();
				}
				
				mainMenu();
			});
		} else if (ch === "[Call to Action] Activate 1 Deep One in any space"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.deepOnes.length); j++){
				if(!(choices.includes(z.deepOnes[j])) && z.deepOnes[j] !== DEEP && z.deepOnes[j] !== RESERVES){
					choices.push(z.deepOnes[j]);
					promptText += "\n"+(choices.length)+": "+d.spaceNames[z.deepOnes[j]];
				}
			}
			promptText = lc("CALL_TO_ACTION_ONE_PROMPT",choices.length) + promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				boldAlert("CALL_TO_ACTION_ONE_ALERT",[z.players[me],d.spaceNames[choices[a-1]]]);
				let foundIt = false;
				resetDeepOneActivations();
				for(let j = 0; !(j >= z.deepOnes.length); j++) {
					if(!foundIt && z.deepOnes[j] === choices[a-1]){
						foundIt = true;
					} else {
						z.deepOneActivated[j] = 1;
					}
				}
				removeOption(me,ch);
				removeOption(me,"[Call to Action] Activate each Deep One in your space");
				resumeDeepOneActivation();
				mainMenu();
			});
			
			
		} else if (ch === "[Keeper of the Tome] Look at 2 Spells" || ch === "[Keeper of the Tome] Look at 3 Spells"){
			let confirmText = lc("KEEPER_ACTION_CONFIRM");
			if(ch === "[Keeper of the Tome] Look at 3 Spells"){
				confirmText = lc("KEEPER_ACTION_CONFIRM_3");
			}
			confirmify(confirmText,mainMenu,()=>{
				z.spellPeeker = me;
				let alertText = lc("You drew:");
				if(z.spellDeck.length !== 0) {
					let quo = z.spellDeck.pop();
					z.spellPeek.push(quo);
					alertText += "\n" + lc(d.spellNames[quo]);
				}
				if(z.spellDeck.length !== 0) {
					let quo = z.spellDeck.pop();
					z.spellPeek.push(quo);
					alertText += "\n" + lc(d.spellNames[quo]);
				}
				if(z.fromTheAbyss && z.spellDeck.length !== 0){
					let quo = z.spellDeck.pop();
					z.spellPeek.push(quo);
					alertText += "\n" + lc(d.spellNames[quo]);
				}
				addAlert(alertText);
				if(z.spellPeek.length === 3){
					addOption(me,"[Keeper of the Tome] Bottom a Spell",undefined,true);
					printlnBold("KEEPER_ACTION_PRINT_ABYSS",z.players[me]);
				} else if(z.spellPeek.length === 2){
					addOption(me,"[Keeper of the Tome] Cast a Spell",undefined,true);
					printlnBold("KEEPER_ACTION_PRINT",z.players[me]);
				} else {
					addOption(me,"[Keeper of the Tome] Cast a Spell",undefined,true);
					printlnBold("KEEPER_ACTION_PRINT_1",z.players[me]);
					addOption(me,"[Keeper of the Tome] Return the spell to the deck",undefined,true);
				}

				if(getContext(me,ch) === "Stolen Ritual Components"){
					removeOption(me,ch);
				} else {
					z.midAction = "Keeper of the Tome";
					z.actionPerformer = me;
					z.keeperAction = false;
					didAction();
				}
				mainMenu();
			});	
		} else if (ch === "[Keeper of the Tome] Bottom a Spell"){
			let promptText = lc("SPELL_BOTTOM_PROMPT");
			for(let i = 0; !(i >= z.spellPeek.length); i++) {
				promptText += "\n" + (i + 1) + ": " + lc(d.spellNames[z.spellPeek[i ]]);
			}
			promptNum(promptText, (a) => 1 > a || a > z.spellPeek.length, mainMenu, (prompted) => {
				let spell = z.spellPeek.splice(prompted-1,1)[0];
				z.spellDeck.unshift(spell);
				addAlert("BOTTOM",d.spellNames[spell]);
				removeOption(me,ch);
				addOption(me,"[Keeper of the Tome] Cast a Spell",undefined,true);
				mainMenu();
			});
		} else if (ch === "[Keeper of the Tome] Cast a Spell") {
			let promptText = lc("SPELL_CAST_PROMPT",z.spellPeek.length);
			for(let i = 0; !(i >= z.spellPeek.length); i++) {
				promptText += "\n" + (i + 1) + ": " + lc(d.spellNames[z.spellPeek[i ]]);
			}
			promptNum(promptText, (a) => 1 > a || a > z.spellPeek.length, mainMenu, (prompted) => {
				if(z.spellPeek.length === 2){
					if(prompted === 1){
						z.spellDeck.unshift(z.spellPeek.pop());
					} else {
						z.spellDeck.unshift(z.spellPeek.shift());
					}
				}
				playSpell(0, true);
				z.spellPeeker = -1;
				removeOption(me, ch);
				removeOption(me,"[Keeper of the Tome] Return the spell to the deck");
				mainMenu();
			});
		} else if (ch === "[Keeper of the Tome] Return the spell to the deck"){
			confirmify(lc("KEEPER_PASS_CONFIRM",d.spellNames[z.spellPeek[0]]),mainMenu,()=>{
				z.spellDeck.push(z.spellPeek.pop());
				z.spellPeeker = -1;
				removeOption(me,ch);
				removeOption(me,"[Keeper of the Tome] Cast a Spell");
				boldAlert("KEEPER_PASS_ALERT",z.players[me]);
				mainMenu();
			});
		} else if (ch === "Revelation of Script"){
			let promptText = lc("REVELATION_OF_SCRIPT_PROMPT");
			for(let j = 0; !(j>=6); j++){
				promptText += "\n"+(j+1)+": ";
				if(z.skillCardDecks[j].length > 0 || z.skillCardDiscards[j].length > 0){
					promptText += colorIDName(j);
				} else {
					promptText += lc("(deck empty)");
				} 
			}
			promptNum(promptText,(a)=>1>a||a>6||(z.skillCardDecks[a-1].length===0 && z.skillCardDiscards[a-1].length===0),mainMenu,(a)=>{
				
				let card = drawFromDeck(a-1);
				z.revealedCards.push(card);
				let tally = skillCheckTally(true);
				boldAlert("REVELATION_OF_SCRIPT_ALERT",[z.players[me],colorIDName(a-1),cardText(card)]);
				t.value += "\r\n" + tally[0] + "\r\n";
				delete z.revelation;
				SPTokenBad("REVELATION_OF_SCRIPT_ROLL",cardValue(card));
				/* UTODO: prepare for DE and equivalents. */
				mainMenu();
			});
		} else if (ch === "Well Equipped [Feat]"){
			promptNum(lc("WELL_EQUIPPED_PROMPT",z.items[me].length)+"\n"+lc("FEAT_USE_WARNING"),(a)=>a>z.items[me].length||-z.items[me].length>a||a===0,mainMenu,(a)=>{
				z.wellEquipped = a;
				if(a>0){
					boldAlert("WELL_EQUIPPED_INCREASE",a);
				} else {
					boldAlert("WELL_EQUIPPED_DECREASE",-a);
				}
				println(skillCheckTally(true)[0]);
				z.feats[me].splice(z.feats[me].indexOf("Well Equipped"),1);
				z.des[me].push(["Well Equipped",a]);
				DEToken();
				mainMenu();
			});
		} else if (ch === "Instinct [Feat]"){
			confirmify("INSTINCT_CONFIRM",mainMenu,()=>{
				SPTokenBad("Instinct");
				mainMenu();
			});
		} else if (ch === '"Lucky" Ring'){
			let confirmText = lc("LUCKY_RING_CONFIRM");
			let tally = skillCheckTally(true)[2];
			let goal = z.thisDifficulty;
			if(tally >= goal){
				confirmText += "\n" + lc("LUCKY_RING_EVIL_CONFIRM");
			}
			confirmify(confirmText,mainMenu,()=>{
				boldAlert("LUCKY_RING_ALERT",z.players[me],getGender(me));
				z.luckyRing = true;
				z.des[me].push(['"Lucky" Ring',2]);
				DEToken();				
				mainMenu();
			});
		} else if (ch === "Book of Dagon"){
			let promptText = "";
			let spaces = [];
			let stop = INTERIOR + 6;
			if(z.barricadeActive){
				stop = INTERIOR;
			}
			for(let j = 0; !(j>=stop); j++){
				if(isAdjacent(z.playerLocations[me],d.spaceNames[j])){
					spaces.push(j);
					promptText += "\n"+spaces.length+": "+lc(d.spaceNames[j]);
				}
			}
			promptNum(lc("BOOK_OF_DAGON_PROMPT",spaces.length)+promptText,(a)=>1>a||a>spaces.length,mainMenu,(a)=>{
				boldAlert("BOOK_OF_DAGON_ALERT",[z.players[me],d.spaceNames[spaces[a-1]]],getGender(me));
				let myIndex = locationIndex(z.playerLocations[me]);
				for(let j = 0; !(j >= z.deepOnes.length); j++){
					if(z.deepOnes[j] === myIndex){
						z.deepOnes[j] = spaces[a-1];
						fleeCheck(spaces[a-1]);
					}
				}
				if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
					z.xoStack[z.xoStack.length-1] = "Cadet+";
				}
				z.noRansack = true;
				z.bookOfDagon = false;
				mainMenu();
			});
		} else if (ch === "Scavenger"){
			confirmify(lc("SCAVENGER_CONFIRM"),mainMenu,()=>{
				/* URULES: are inactive improvements public knowledge? */
				if(z.itemDeck.length > 0){
					let item = z.itemDeck.pop();
					z.items[me].push(item);
					boldAlert("SCAVENGER_ALERT",d.itemNames[item]);
					if(isImprovement(item) || item === VALISE){
						if(!resetImprovements(me)){
							addOption(me,"Activate an Improvement",undefined,true);
							plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
							z.midAction = "Scavenger";
							z.actionPerformer = me;
						} 
					}
				}
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.playerLocations[me] === z.playerLocations[j] && j !== me && z.revealedHybrids[j] === 0){
						plainAlert("SCAVENGER_HANDOFF_NOTIFICATION");
						addOption(me,"[Scavenger] Give an item to another Human",undefined,false);
						break;						
					}
				}

				z.scavenger = false;
				didAction();
				if(!hasOption(me,"Activate an Improvement")){
					z.actionPerformer = me;
					finishedAction();
				}
				mainMenu();
			});
		} else if (ch === "[Scavenger] Give an item to another Human" || ch === "Give an item to another player"){
			let promptText = lc("ITEM_HANDOFF_PROMPT_WHAT",z.items[me].length);
			for(let j = 0; !(j>=z.items[me].length); j++){
				promptText += "\n"+(j+1)+": ";
				if(z.cursedExploit && d.itemNames[z.items[me][j]] === "Cursed Mask"){
					promptText += "(nope, sorry)";
				} else {
					promptText += lc(d.itemNames[z.items[me][j]]);
				}
			}
			promptNum(promptText,(a)=>1>a||a>z.items[me].length||(z.cursedExploit && d.itemNames[z.items[me][a-1]] === "Cursed Mask"),mainMenu,(a)=>{
				let promptText = "";
				let targets = [];
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(z.playerLocations[me] === z.playerLocations[j] && j !== me && (z.revealedHybrids[j] === 0 || ch === "Give an item to another player")){
						targets.push(j);
						promptText += "\n"+targets.length+": "+z.players[j];
					}
				}
				let giveAway = (itemIndex,target)=>{
					let item = z.items[me].splice(itemIndex,1)[0];
					if(d.itemNames[item] === "Cursed Mask"){
						plainAlert("CURSED_MASK_TRIGGER",z.players[me]);
						z.items[me].push(item);
						if(me === z.cursedWhispers){
							SPTokenBad("Cursed Whispers");
						} else {
							dealSkillCard(me,TREACHERY);
						}
						z.cursedExploit = true;
					} else {
						boldAlert("ITEM_HANDOFF_ALERT",[d.itemNames[item],z.players[target],z.players[me]]);
						z.items[target].push(item);
						
						if(isImprovement(item) || item === VALISE){
							if(!resetImprovements(me)){
								addOption(me,"Activate an Improvement",undefined,true);
								plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
							}
							
							if(!resetImprovements(target)){
								addOption(target,"Activate an Improvement",undefined,true);
								plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[target]);
							}
						}
					}
					if(ch === "[Scavenger] Give an item to another Human"){
						removeOption(me,ch);
					} else {
						if(z.items[me].length === 0){
							removeOption(me,ch);
						}
						addOption(target,"Give an item to another player",undefined,false);
					}
					mainMenu();
				};
				
				if(targets.length === 1){
					giveAway(a-1,targets[0]);
				} else {
					promptNum(lc("ITEM_HANDOFF_PROMPT_WHO",[d.itemNames[z.items[me][a-1]],targets.length])+promptText,(b)=>1>b||b>targets.length,mainMenu,(b)=>{
						giveAway(a-1,targets[b-1]);
					});
				}
				
			});
		} else if (ch === "Pickpocket"){
			let promptText = "";
			let targets = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[me] === z.playerLocations[j] && j !== me && z.revealedHybrids[j] === 0){
					targets.push(j);
					promptText += "\n"+targets.length+": "+z.players[j];
				}
			}
			
			let chooseWhat = (a)=>{
				let promptText = lc("PICKPOCKET_WHAT_PROMPT",[z.players[a],z.items[a].length]);
				for(let j = 0; !(j>=z.items[a].length); j++){
					promptText += "\n"+(j+1)+": "+lc(d.itemNames[z.items[a][j]]);
				}
				promptNum(promptText,(b)=>1>b||b>z.items[a].length,mainMenu,(b)=>{
					let item = z.items[a].splice(b,1)[0];
					let done = true;
					if(d.itemNames[item] === "Cursed Mask"){
						plainAlert("CURSED_MASK_PICKPOCKET");
						z.items[a].push(item);
						dealSkillCard(a,TREACHERY);
					} else {
						z.items[me].push(item);
						boldAlert("PICKPOCKET_ALERT",[d.itemNames[item],z.players[a]]);
						
						if(isImprovement(item) || item === VALISE){
							if(!resetImprovements(me)){
								addOption(me,"Activate an Improvement","Pickpocket",true);
								plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
								done = false;
							}
							if(!resetImprovements(me)){
								addOption(a,"Activate an Improvement","Pickpocket",true);
								plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[a]);
								done = false;
							}
						}
					}
					if(done){
						doneWithRevealEffect(getPlayerNum("Samira"));
					}
					removeOption(me,ch);
					mainMenu();
				});
			};
			
			if(targets.length === 1){
				chooseWhat(targets[0]);
			} else {
				promptNum(lc("PICKPOCKET_WHO_PROMPT",targets.length)+promptText,(a)=>1>a||a>targets.length,mainMenu,(a)=>{
					chooseWhat(targets[a-1]);
				});
			}
		} else if(ch === "Move a monarch"){
			let context = getContext(me,ch);
			let space = z.mother;
			if(context === "Father Dagon"){
				space = z.father;
			}
			let spaces = [];
			let promptText = lc("MOVE_MONARCH_PROMPT",context);
			for(let j = WATER; !(j>=WATER+8); j++){
				if(isAdjacent(d.spaceNames[space],d.spaceNames[j])){
					spaces.push(j);
					promptText += "\n"+spaces.length+": "+lc(d.spaceNames[j]);
				}
			}
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
				boldAlert("MOVE_MONARCH_ALERT",[z.players[me],context,d.spaceNames[spaces[a-1]]]);
				if(context === "Mother Hydra"){
					z.mother = spaces[a-1];
				} else if(context === "Father Dagon"){
					z.father = spaces[a-1];
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if(ch === "First Oath of Dagon"){
			
			let pickCard = (a)=>{
				let lores = [];
				let promptText = "";
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					if(cardColorID(z.skillCardHands[me][j]) === LORE || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
						lores.push([z.skillCardHands[me][j],j]);
						promptText += "\n"+(lores.length)+": "+cardText(z.skillCardHands[me][j]);
					}
				}
				promptNum(lc("FIRST_OATH_LORE_PROMPT",lores.length)+promptText,(b)=>1>b||b>lores.length,mainMenu,(b)=>{
					let card = lores[b-1][0];
					if(a===1){
						boldAlert("FIRST_OATH_ALERT","Mother Hydra");
					} else {
						boldAlert("FIRST_OATH_ALERT","Father Dagon");
					}
					discardSkillCard(me,lores[b-1][1]);
					z.dieRollModifier = cardValue(card);
					if(a===1){
						SPTokenBad("First Oath of Dagon (Mother Hydra)");
					} else {
						SPTokenBad("First Oath of Dagon (Father Dagon)");
					}
					
					z.midAction = "First Oath of Dagon";
					z.actionPerformer = me;
					didAction();
					mainMenu();
				});
				
			};
			
			if(z.mother !== DEEP && z.father !== DEEP){
				promptNum(lc("FIRST_OATH_MONARCH_PROMPT"),(a)=>1>a||a>2,mainMenu,pickCard);
			} else if(z.mother !== DEEP){
				pickCard(1);
			} else if(z.father !== DEEP){
				pickCard(2);
			}
		} else if(ch === "Divide and Conquer"){
			let sectors = [0,0,0,0,0,0,0,0];
			let doIt = (n)=>{
				if(n === 4){
					for(let j = 0; !(j>=8); j++){
						if(sectors[j]===1){
							addAlert("DEEP_ONE_PLACED",d.spaceNames[j+WATER]);
							spawnDeepOne(j+WATER);
						}
					}
					doneWithRevealEffect(me);
					removeOption(me,ch);
					mainMenu();
				} else {
					let promptText = lc("DIVIDE_AND_CONQUER_PROMPT");
					for(let j = 0; !(j>=8); j++){
						promptText += "\n"+(j+1)+": ";
						if(sectors[j]===0){
							promptText += lc(d.spaceNames[j+WATER]);
						} else {
							promptText += lc("(already placed)");
						}
					}
					promptNum(promptText,(a)=>1>a||a>8||sectors[a-1]===1,mainMenu,(a)=>{
						sectors[a-1] = 1;
						doIt(n+1);
					});
				}
			};
			
			doIt(0);			
		} else if(ch === "Disrupt Ritual"){
			let choices = [];
			if(z.ritualTrack >= 2){
				choices.push("Retreat 2 spaces");
			}
			if(z.ritualTrack >= 1){
				choices.push("Retreat 1 space");
			}
			choices.push("Leave unchanged");
			choices.push("Advance 1 space");
			choices.push("Advance 2 spaces");
			let promptText = lc("DISRUPT_RITUAL_PROMPT",choices.length);
			for(let j = 0; !(j>=choices.length); j++){
				promptText += "\n"+(j+1)+": "+choices[j];
			}
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let choice = choices[a-1];
				switch(choice){
					case "Retreat 2 spaces":
						retreatRitual();
						/* falls through */
					case "Retreat 1 space":
						retreatRitual();
						doneWithRevealEffect(me);
						break;
					case "Leave unchanged":
						boldAlert("DISRUPT_RITUAL_PASS");
						doneWithRevealEffect(me);
						break;
					case "Advance 2 spaces":
						if(advanceRitual()){
							if(advanceRitual()){
								if(!z.gameOver){
									doneWithRevealEffect(me);
								}
							} else {
								z.extraRitual = "Disrupt Ritual 0";
							}
						} else {
							plainAlert("EXTRA_RITUAL_COORDINATION_1");
							z.extraRitual = "Disrupt Ritual 1";
						}
						break;
					case "Advance 1 space":
						if(advanceRitual()){
							if(!z.gameOver){
								doneWithRevealEffect(me);
							}
						} else {
							z.extraRitual = "Disrupt Ritual 0";
						}
						break;
				}				
				removeOption(me,ch);
				mainMenu();
			});
			
			
		} else if(ch === "Quick Cast [Feat]"){
			confirmify(lc("QUICK_CAST_CONFIRM")+"\n"+lc("FEAT_USE_WARNING"),mainMenu,()=>{
				z.midAction = "Quick Cast";
				z.actionPerformer = me;
				z.xoStack.push("Quick Cast");
				z.xoPerformers.push(me);
				z.feats[me].splice(z.feats[me].indexOf("Quick Cast"),1);
				printlnBold("QUICK_CAST_ALERT");
				let spell = z.spellDeck.pop();
				playSpell(spell,"Quick Cast");
				z.noRansack = true;
				mainMenu();
			});
		} else if (ch === "Occult Training"){
			confirmify(lc("OCCULT_TRAINING_CONFIRM"),mainMenu,()=>{
				z.occultTrainingCard = z.spellDeck.pop();
				printlnBold("OCCULT_TRAINING_ANNOUNCEMENT");
				addAlert("OCCULT_TRAINING_ALERT",d.spellNames[z.occultTrainingCard]);
				addOption(me,"[Occult Training] Top the Spell",undefined,true);
				addOption(me,"[Occult Training] Bottom the Spell",undefined,true);
				z.occultTraining = false;
				z.midAction = "Occult Training";
				z.actionPerformer = me;
				z.xoStack.push("Occult Training");
				z.xoPerformers.push(me);
				mainMenu();
				
			});
		} else if (ch === "[Occult Training] Top the Spell"){
			confirmify(lc("OCCULT_TRAINING_TOP_CONFIRM",d.spellNames[z.occultTrainingCard]),mainMenu,()=>{
				z.spellDeck.push(z.occultTrainingCard);
				delete z.occultTrainingCard;
				boldAlert("OCCULT_TRAINING_TOP_ALERT");
				removeOption(me,ch);
				removeOption(me,"[Occult Training] Bottom the Spell");
				finishedAction();
				mainMenu();
			});			
		} else if (ch === "[Occult Training] Bottom the Spell"){
			confirmify(lc("OCCULT_TRAINING_BOTTOM_CONFIRM",d.spellNames[z.occultTrainingCard]),mainMenu,()=>{
				z.spellDeck.unshift(z.occultTrainingCard);
				delete z.occultTrainingCard;
				boldAlert("OCCULT_TRAINING_BOTTOM_ALERT");
				removeOption(me,ch);
				removeOption(me,"[Occult Training] Top the Spell");
				finishedAction();
				mainMenu();
			});			
		} else if(ch === "Arrest Order [Feat]"){
			let promptText = "\n"+lc("FEAT_USE_WARNING");
			let targets = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[me] === z.playerLocations[j] && j !== me){
					targets.push(j);
					promptText += "\n"+targets.length+": "+lc(z.players[j]);
				}
			}
			let arrest = (target)=>{
				boldAlert("ARREST_ORDER_ALERT",z.players[target]);
				z.feats[me].splice(z.feats[me].indexOf("Arrest Order"),1);
				movePlayer(target,"Brig");
				didAction();
				z.actionPerformer = me;
				finishedAction();
				mainMenu();
			};
			if(targets.length === 1){
				confirmify(lc("ARREST_ORDER_CONFIRM",z.players[targets[0]])+"\n"+lc("FEAT_USE_WARNING"),mainMenu,()=>{
					arrest(targets[0]);
				});
			} else {
				promptNum(lc("ARREST_ORDER_PROMPT",targets.length)+promptText,(a)=>1>a||a>targets.length,mainMenu,(a)=>{
					arrest(targets[a-1]);
				});
			}
			
		} else if (ch === "Tool Kit"){
			confirmify(lc("TOOL_KIT_CONFIRM",z.playerLocations[me]),mainMenu,()=>{
				let index = locationIndex(z.playerLocations[me])-INTERIOR;
				let damage = z.damage[index];
				boldAlert("TOOL_KIT_ALERT",[z.players[me],z.playerLocations[me],d.damageNames[damage]]);
				z.damageDeck.push(damage);
				shuffle(z.damageDeck);
				z.damage[index] = -1;
				didAction();
				z.actionPerformer = me;
				finishedAction();
				mainMenu();
			});
		} else if (ch === "Jam Tin Grenade" || ch === "Don the Mask [Feat]"){

			let spaces = [];
			let doIt = (a)=>{
				let ch2 = ch;
				if(ch === "Jam Tin Grenade"){
					boldAlert("JAM_TIN_GRENADE_ALERT",[z.players[me],spaces[a-1]],getGender(me));
					z.midAction = "Jam Tin Grenade";
					for(let j = 0; !(j>=z.items[me].length); j++){
						if(d.itemNames[z.items[me][j]] === "Jam Tin Grenade"){
							z.items[me].splice(j,1);
						}
					}
				} else {
					boldAlert("DON_THE_MASK_ALERT",z.players[me],getGender(me));
					z.midAction = "Don the Mask";
					z.feats[me].splice(z.feats[me].indexOf("Don the Mask"),1);
					ch2 = "Don the Mask";
				}
				z.actionPerformer = me;
				
				
				let anyDeep = false;
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(d.spaceNames[z.deepOnes[j]] === spaces[a-1]){
						anyDeep = true;
						z.deepOnes[j] = RESERVES;
					}
				}
				if(anyDeep){
					plainAlert("JAM_TIN_GRENADE_DEEP_ONES",spaces[a-1]);
				}
				let goodToGo = true;
				if(z.fromTheAbyss){
					let horrors = [];
					if(d.spaceNames[z.shoggoth] === spaces[a-1]){
						horrors.push("Shoggoth");
					}
					if(d.spaceNames[z.drownedSpirit] === spaces[a-1]){
						horrors.push("Drowned Spirit");
					}
					if(d.spaceNames[z.graspingTendril] === spaces[a-1]){
						horrors.push("Grasping Tendril");
					}
					if(horrors.length > 0){
						addOption(me,"Repel a Horror",[z.players[me],undefined,ch2,[],spaces[a-1]],true);
						if(horrors.length === 1){
							boldAlert("JAM_TIN_GRENADE_HORROR",horrors[0]);
						} else {
							boldAlert("JAM_TIN_GRENADE_HORRORS",spaces[a-1]);
						}
						goodToGo = false;
					}
				}
				
				/* ATODO: allies do not have to be after characters/passengers. */
				let index = locationIndex(spaces[a-1]);	
				if(goodToGo){
				/* UTODO: enforce defeat before passengers? */
					for(let j = 0; !(j>=z.playerLocations.length); j++){
						let k = (z.turn + j) % z.numPlayers;
						if(z.playerLocations[k] === spaces[a-1]){
							goodToGo = defeat(k,[ch2,spaces[a-1]]) && goodToGo;
						}
					}
								
					if(z.spacePassengers[index].length > 0){
						
						let medicalIntervention = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
								medicalIntervention = true;
								break;
							}
						}
						/* URULES: if the Travel Pharmacy holder is in the space, do they need to be saved to use Travel Pharmacy here? */
						let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")], spaces[a-1]);
						
				
						if(goodToGo && !medicalIntervention && !travelPharmacy){
							while(z.spacePassengers[index].length > 0 && goodToGo){
								goodToGo = defeatPassenger(z.spacePassengers[index].pop());
							}
						} else {
							boldAlert("JAM_TIN_GRENADE_PASSENGERS_DEFEAT_ALERT",spaces[a-1]);
							if(travelPharmacy){
								plainAlert("TRAVEL_PHARMACY_JAM_TIN_GRENADE_ALERT",[z.players[itemHolder("Travel Pharmacy")],spaces[a-1]],getGender(itemHolder("Travel Pharmacy")));
								addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",[ch2,index,0],false);
							}
							if(medicalIntervention){
								plainAlert("MEDICAL_INTERVENTION_JAM_TIN_GRENADE_ALERT");
								addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",[ch2,index,0],false);
							}
							optionForAll("Defeat a passenger in a space",["Jam Tin Grenade",index,0],false);	
						}
					}
					if(z.fromTheAbyss && (goodToGo || !characterPresent("Guillaume"))){
						for(let j = 0; !(j>=z.allies.length); j++){
							if(spaces[a-1] === z.allies[j][1]){
								if(characterPresent("Guillaume")){
									plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
									z.guillaumeAllies.push(z.allies[j][0]);
								} else {
									plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
									
								}
								z.allies.splice(j,1);
								j--;
							}
						}
						if(z.guillaumeAllies.length > 3){
							boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
							addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game",[ch2,spaces[a-1]],true);
							goodToGo = false;
						}
					}
				}
				didAction();
				if(index >= INTERIOR && INTERIOR+6 > index && !isLocationDamaged(spaces[a-1]) && ch2 === "Jam Tin Grenade"){
					if(goodToGo){
						if(damageLocation(spaces[a-1],undefined,"Jam Tin Grenade")){
							finishedAction();
						}
					} else {
						plainAlert("JAM_TIN_GRENADE_DAMAGE",spaces[a-1]);
					}
				} else if(goodToGo){
					finishedAction();
				}
				mainMenu();
			};
			
			
			if(ch === "Jam Tin Grenade"){
				
				let promptText = "";
				/* URULES: can I use this on the Brig or Sickbay? */
				for(let j = WATER; !(j>=d.spaceNames.length); j++){
					if(isAdjacent(z.playerLocations[me],d.spaceNames[j])){
						spaces.push(d.spaceNames[j]);
						promptText += "\n"+spaces.length+": "+lc(d.spaceNames[j]);
					}
				}
				promptText = lc("JAM_TIN_GRENADE_PROMPT",spaces.length)+promptText;
				promptNum(promptText,(a)=>1>a||a>spaces.length,mainMenu,doIt);
			} else {
				spaces = [z.playerLocations[me]];
				confirmify("DON_THE_MASK_CONFIRM",mainMenu,()=>{
					doIt(1);
				});
			}
		} else if (ch === "Full Steam Ahead [Feat]"){
			confirmify(lc("FULL_STEAM_AHEAD_CONFIRM")+"\n"+lc("FEAT_USE_WARNING"),mainMenu,()=>{
				boldAlert("FULL_STEAM_AHEAD_ALERT");
				z.feats[me].splice(z.feats[me].indexOf("Full Steam Ahead"),1);
				didAction();
				if(decreaseFuel()){
					if(advanceTravel()){
						if(!advanceTravel()){
							z.midAction = "Full Steam Ahead";
							z.actionPerformer = me;
						} else {
							finishedAction();
						}
					} else {
						z.midAction = "Full Steam Ahead";
						z.actionPerformer = me;
						plainAlert("EXTRA_TRAVEL_TRACK");
						z.extraTravel = "Full Steam Ahead 1";
					}
				}
				mainMenu();
			});
		} else if (ch === "Jury Rigger"){
			/* UTODO: Pass on Jury Rigger */
			confirmify(lc("JURY_RIGGER_CONFIRM"),mainMenu,()=>{
				boldAlert("JURY_RIGGER_ALERT");
				if(damageShip()){
					advanceTravel();
				} else {
					plainAlert("JURY_RIGGER_EXTRA");
					optionForAll("Advance the Travel Track",undefined,true);
				}
				removeOption(me,ch);
				mainMenu();
				
			});
		} else if (ch === "[Lesser Banishment] Target a space"){
			let choices = [];
			let promptText = "";
			for(let j = WATER; !(j>=d.spaceNames.length); j++){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j){
						choices.push(j);
						promptText += "\n"+(choices.length)+": "+lc(d.spaceNames[j]);
						break;
					}
				}
			}
			promptText = lc("LESSER_BANISHMENT_SPACE_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let choices2 = [];
				let promptText = "";
				let stop = INTERIOR + 6;
				if(z.barricadeActive){
					stop = INTERIOR;
				}
				for(let j = WATER; !(j>=stop); j++){
					if(isAdjacent(d.spaceNames[j],d.spaceNames[choices[a-1]])){
						choices2.push(j);
						promptText += "\n"+(choices2.length)+": "+lc(d.spaceNames[j]);
					}
				}
				promptText = lc("LESSER_BANISHMENT_MOVE_PROMPT",[d.spaceNames[choices[a-1]],choices2.length])+promptText;
				promptNum(promptText,(b)=>1>b||b>choices2.length,mainMenu,(b)=>{
					boldAlert("LESSER_BANISHMENT_MOVE_ALERT",[z.players[me],d.spaceNames[choices[a-1]],d.spaceNames[choices2[b-1]]]);
					for(let j = 0; !(j>=z.deepOnes.length); j++){
						if(z.deepOnes[j] === choices[a-1]){
							z.deepOnes[j] = choices2[b-1];
							fleeCheck(choices2[b-1]);
						}
					}
					let context = getContext(me,ch);
					removeOption(me,ch);
					if(itemPresent("Elder Sign Amulet") && itemHolder("Elder Sign Amulet") === me && z.elderSignAmulet){
						plainAlert("ELDER_SIGN_AMULET_LESSER_BANISHMENT_ALERT",z.players[me],getGender(me));
						addOption(me,ch,"Elder Sign Amulet",false);
					}
					notebookCheck(z.notebookCard,me);
					season(me,LORE);
					delete z.elderSignAmulet;
					if(context !== "Elder Sign Amulet"){
						finishedAction();
					}
					mainMenu();
				});
			});
		} else if (ch === "[Shrivelling] Target an enemy"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(z.revealedHybrids[j] !== z.revealedHybrids[me]){
					choices.push(z.players[j]);
					promptText += "\n"+(choices.length)+": "+lc(z.players[j]);
				}
			}
			if(!z.revealedHybrids[me]){
				for(let j = WATER; !(j>=d.spaceNames.length); j++){
					for(let k = 0; !(k>=z.deepOnes.length); k++){
						if(z.deepOnes[k] === j){
							choices.push(j);
							promptText += "\n"+(choices.length)+": "+lc("Deep One")+" ("+lc(d.spaceNames[j])+")";
							break;
						}
					}
				}
				if(z.shoggoth > RESERVES){
					choices.push("Shoggoth");
					promptText += "\n"+(choices.length)+": "+lc("Shoggoth");
				}
				if(z.drownedSpirit > RESERVES){
					choices.push("Drowned Spirit");
					promptText += "\n"+(choices.length)+": "+lc("Drowned Spirit");
				}
				if(z.graspingTendril > RESERVES){
					choices.push("Grasping Tendril");
					promptText += "\n"+(choices.length)+": "+lc("Grasping Tendril");
				}
			}
			promptText = lc("SHRIVELLING_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				if(Number.isInteger(choices[a-1])){
					NoSPToken("SHRIVELLING_VS_DEEP_ONE",[d.spaceNames[choices[a-1]],me]);
					boldAlert("SHRIVELLING_DEEP_ONE_ALERT",[z.players[me],d.spaceNames[choices[a-1]]]);
					z.dieRollModifier = 2;
				} else if(choices[a-1] === "Shoggoth" || choices[a-1] === "Drowned Spirit" || choices[a-1] === "Grasping Tendril"){
					SPTokenBad("SHRIVELLING_VS_HORROR",[choices[a-1],me]);
				} else {
					SPTokenBad("SHRIVELLING_VS_TRAITOR",[choices[a-1],me]);
				}
				z.midAction = "Shrivelling";
				z.actionPerformer = me;
				removeOption(me,ch);
				mainMenu();
			});
		} else if (ch === "[Flare Gun] Alert another character" || ch === "[Quick Draw] [Flare Gun] Alert another character"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.playerLocations[j] !== z.playerLocations[me] && z.playerLocations[j] !== "Brig"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("FLARE_GUN_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				boldAlert("FLARE_GUN_ALERT_ALERT",[z.players[choices[a-1]],z.players[me]]);
				let context = getContext(me,ch);
				z.flareGun = true;
				if(ch === "[Quick Draw] [Flare Gun] Alert another character"){
					z.quickDraw = false;
					z.noRansack = true;
					z.xoStack.push("Quick Draw");
					z.xoPerformers.push(me);
					z.actionPerformer = me;
				}
				if(context === undefined){
					z.midAction = "Flare Gun";
					z.actionPerformer = me;
					context = "Flare Gun";
					didAction();
				}
				
				addOption(choices[a-1],"[Flare Gun] Move",[z.playerLocations[me],context],true);
				addOption(choices[a-1],"[Flare Gun] Don't move",context,true);
				removeOption(me,ch);
				removeOption(me,"[Flare Gun] Attack an enemy");
				removeOption(me,"I'm done with Rampage");
				mainMenu();
			});
		} else if (ch === "[Flare Gun] Don't alert another character"){
			confirmify("FLARE_GUN_ALERT_PASS",mainMenu,()=>{
				removeOption(me,ch);
				removeOption(me,"[Flare Gun] Alert another character");
				if(z.midRumble){
					delete z.midRumble;
					if(!postSkillCheckAbilities()){
						clearSkillCheck2();
					}
				} else {
					finishedAction();
				}
				mainMenu();
			});
		} else if (ch === "[Flare Gun] Move"){
			let context = getContext(me,ch);
			confirmify(lc("FLARE_GUN_MOVE_CONFIRM",context[0]),mainMenu,()=>{
				movePlayer(me,context[0]);
				removeOption(me,ch);
				removeOption(me,"[Flare Gun] Don't move");
				if(z.midRumble){
					delete z.midRumble;
					if(!postSkillCheckAbilities()){
						clearSkillCheck2();
					}
				} else if(z.midAction === "Rampage"){
					notebookCheck(z.notebookCard,z.actionPerformer);
					season(z.actionPerformer,STRENGTH);
					finishedAction();
				} else {
					finishedAction();
				}
				mainMenu();
			});
		} else if (ch === "[Flare Gun] Don't move"){
			confirmify(lc("FLARE_GUN_STAY_CONFIRM"),mainMenu,()=>{
				boldAlert("FLARE_GUN_STAY_ALERT",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Flare Gun] Move");
				if(z.midRumble){
					delete z.midRumble;
					if(!postSkillCheckAbilities()){
						clearSkillCheck2();
					}
				} else if(z.midAction === "Rampage"){
					notebookCheck(z.notebookCard,z.actionPerformer);
					season(z.actionPerformer,STRENGTH);
					finishedAction();
				} else {
					finishedAction();
				}
				mainMenu();
			});
		} else if(ch === "[Six-Shooter] Attack an enemy" || ch === "[Quick Draw] [Six-Shooter] Attack an enemy" || ch === "Attack an enemy" || ch === "[Starbuck] Attack an enemy" ||
				  ch === "[Pocket Pistol] Attack an enemy" || ch === "[Quick Draw] [Pocket Pistol] Attack an enemy" || ch === "[Shotgun] Attack an enemy" || 
				  ch === "[Quick Draw] [Shotgun] Attack an enemy" || ch === "[Fillet Knife] Attack an enemy" || ch === "[Flare Gun] Attack an enemy" || ch === "[Baseball Bat] Attack an enemy" ||
				  ch === "[Quick Draw] [Fillet Knife] Attack an enemy" || ch === "[Quick Draw] [Flare Gun] Attack an enemy" || ch === "[Quick Draw] [Baseball Bat] Attack an enemy" ||
				  ch === "[Fillet Knife] Attack another enemy"){
			let promptText = "";
			let confirmText = "";
			let shotgunBonus = enemiesInMySpace();
			if(ch === "Attack an enemy" && itemPresent("Six-Shooter") && itemHolder("Six-Shooter") === me && !hasOption(me,ch)){
				promptText += "\n"+lc("SIX_SHOOTER_WHY_NOT");
				confirmText += "\n"+lc("SIX_SHOOTER_WHY_NOT");
			}
			if(ch === "Attack an enemy" && itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === me && !hasOption(me,ch)){
				promptText += "\n"+lc("BASEBALL_BAT_WHY_NOT");
				confirmText += "\n"+lc("BASEBALL_BAT_WHY_NOT");
			}
			if(ch === "Attack an enemy" && itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === me && !hasOption(me,ch) && 
			   !(itemPresent("Kitchen Knife") && itemHolder("Kitchen Knife") === me)){
				promptText += "\n"+lc("POCKET_PISTOL_WHY_NOT");
				confirmText += "\n"+lc("POCKET_PISTOL_WHY_NOT");
			}
			if((ch === "[Six-Shooter] Attack an enemy" || ch === "[Pocket Pistol] Attack an enemy" || ch === "[Shotgun] Attack an enemy" || 
			    ch === "[Fillet Knife] Attack an enemy" || ch === "[Flare Gun] Attack an enemy" || ch === "[Baseball Bat] Attack an enemy") && 
			   z.players[me] === "Jamie" && z.quickDraw && !hasOption(me,ch)){
				promptText += "\n"+lc("QUICK_DRAW_WHY_NOT");
				confirmText += "\n"+lc("QUICK_DRAW_WHY_NOT");
			}
			if(itemPresent("Shotgun") && itemHolder("Shotgun") === me && !hasOption(me,ch) && ((ch === "[Six-Shooter] Attack an enemy" && shotgunBonus > 2) ||
			   (ch === "Attack an enemy" && (shotgunBonus > 1 || !(itemPresent("Kitchen Knife") && itemHolder("Kitchen Knife") === me))) ||
			   (ch === "[Baseball Bat] Attack an enemy" && shotgunBonus > 3))){
				promptText += "\n"+lc("SHOTGUN_WHY_NOT",shotgunBonus);
				confirmText += "\n"+lc("SHOTGUN_WHY_NOT",shotgunBonus); 
			}
			if(ch === "Attack an enemy" && itemPresent("Starbuck") && itemHolder("Starbuck") === me && z.starbuck && !hasOption(me,ch)){
				promptText += "\n"+lc("STARBUCK_WHY_NOT");
				confirmText += "\n"+lc("STARBUCK_WHY_NOT");
			}			
			let context = getContext(me,ch);
			let choices = [];
			let count = 0;
			if(z.revealedHybrids[me] === 0){
				let found = false;
				let foundTwo = false;
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(d.spaceNames[z.deepOnes[j]] === z.playerLocations[me]){
						if(!found){
							found = true;
							if(ch !== "[Fillet Knife] Attack another enemy" || context !== "Deep One"){
								foundTwo = true;
								choices.push("Deep One");
								promptText += "\n"+choices.length+": "+lc("Deep One");
							}
						} else if(!foundTwo){
							foundTwo = true;
							choices.push("Deep One");
							promptText += "\n"+choices.length+": "+lc("Deep One");
						}
						count++;
					}
				}
			}
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(z.playerLocations[j] === z.playerLocations[me] && z.revealedHybrids[me] !== z.revealedHybrids[j] && context !== z.players[j]){
					choices.push(z.players[j]);
					promptText += "\n"+choices.length+": "+lc(z.players[j]);
					count++;
				}
			}
			if(locationIndex(z.playerLocations[me]) === z.shoggoth && context !== "Shoggoth"){
				choices.push("Shoggoth");
				count++;
			}
			if(locationIndex(z.playerLocations[me]) === z.drownedSpirit && context !== "Drowned Spirit"){
				choices.push("Drowned Spirit");
				count++;
			}
			if(locationIndex(z.playerLocations[me]) - 8 === z.graspingTendril && context !== "Grasping Tendril"){
				choices.push("Grasping Tendril");
				count++;
			}
			if(ch === "Attack an enemy" && count > 1 && itemPresent("Fillet Knife") && itemHolder("Fillet Knife") === me && !hasOption(me,ch) && itemHolder("Kitchen Knife") !== me){
				promptText += "\n"+lc("FILLET_KNIFE_WHY_NOT");
				confirmText += "\n"+lc("FILLET_KNIFE_WHY_NOT");
			}
			let attack = (target) =>{
				if(ch.includes("[Six-Shooter]")){
					z.dieRollModifier = 2;
				} else if (ch.includes("Shotgun")){
					z.dieRollModifier = shotgunBonus;
				} else if((ch === "Attack an enemy" && itemPresent("Kitchen Knife") && itemHolder("Kitchen Knife") === me) || (ch === "[Baseball Bat] Attack an enemy")){
					z.dieRollModifier = 1;
				} else if(ch.includes("Flare Gun")){
					z.dieRollModifier = 2;
				}
				let horror = (target === "Shoggoth" || target === "Drowned Spirit" || target === "Grasping Tendril");
				let additionalAttacks = 0;
				
				if(Number.isInteger(context)){
					additionalAttacks = context - 1;
				}
				if(target === "Deep One"){
					let newContext = "Close Range";
					if(ch === "Attack an enemy" || ch === "[Starbuck] Attack an enemy"){
						boldAlert("ATTACK_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me]]);
					} else if (ch.includes("Six-Shooter")){
						boldAlert("SIX_SHOOTER_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me]],getGender(me));
						newContext = "Six-Shooter";
					} else if (ch.includes("Pocket Pistol")){
						boldAlert("POCKET_PISTOL_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me]],getGender(me));
						z.pocketPistol = true;
						newContext = "Pocket Pistol";
					} else if (ch.includes("Shotgun")){
						boldAlert("SHOTGUN_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me],shotgunBonus],getGender(me));
						newContext = "Shotgun";
					} else if (ch.includes("Fillet Knife")){
						boldAlert("FILLET_KNIFE_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me]],getGender(me));
						if(ch === "[Fillet Knife] Attack an enemy"){
							newContext = "Fillet Knife";
						} else {
							newContext = "Fillet Knife (bis)";
						}
					} else if (ch.includes("Flare Gun")){
						z.flareGun = true;
						boldAlert("FLARE_GUN_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me]],getGender(me));
						newContext = "Flare Gun";
						removeOption(me,"[Flare Gun] Alert another character");
					} else if (ch.includes("Baseball Bat")){
						boldAlert("BASEBALL_BAT_DEEP_ONE_ALERT",[z.players[me],z.playerLocations[me]],getGender(me));
						newContext = "Baseball Bat";
					}

					NoSPToken("HUMAN_VS_DEEP_ONE",[z.players[me],z.playerLocations[me],newContext,additionalAttacks]);
				} else {
					let newContext = "Close Range";
					let target2 = target;
					if(horror){
						target2 = "the "+target;
					}
					
					if(ch === "Attack an enemy" || ch === "[Starbuck] Attack an enemy"){
						boldAlert("ATTACK_ALERT",[z.players[me],target2]);
					} else if (ch.includes("Six-Shooter")) {
						boldAlert("SIX_SHOOTER_ALERT",[z.players[me],target2],getGender(me));
						newContext = "Six-Shooter";
					} else if (ch.includes("Pocket Pistol")){
						boldAlert("POCKET_PISTOL_ALERT",[z.players[me],target2],getGender(me));
						z.pocketPistol = true;
						newContext = "Pocket Pistol";
					} else if (ch.includes("Shotgun")){
						boldAlert("SHOTGUN_ALERT",[z.players[me],target2,shotgunBonus],getGender(me));
						newContext = "Shotgun";
					} else if (ch.includes("Fillet Knife")){
						boldAlert("FILLET_KNIFE_ALERT",[z.players[me],target2],getGender(me));
						if(ch === "[Fillet Knife] Attack an enemy"){
							newContext = "Fillet Knife";
						} else {
							newContext = "Fillet Knife (bis)";
						}
					} else if (ch.includes("Flare Gun")){
						boldAlert("FLARE_GUN_ALERT",[z.players[me],target2],getGender(me));
						newContext = "Flare Gun";
						z.flareGun = true;
						removeOption(me,"[Flare Gun] Alert another character");
					} else if (ch.includes("Baseball Bat")){
						boldAlert("BASEBALL_BAT_ALERT",[z.players[me],target2],getGender(me));
						newContext = "Baseball Bat";
					}
					if(horror){
						SPTokenBad("PLAYER_VS_HORROR",[z.players[me],target,newContext,additionalAttacks]);
					} else {
						SPTokenBad("PLAYER_VS_PLAYER",[z.players[me],target,newContext,additionalAttacks]);
					}
				}
				if(ch === "Attack an enemy" && itemPresent("Kitchen Knife") && itemHolder("Kitchen Knife") === me){
					plainAlert("KITCHEN_KNIFE_ALERT");
				}
				
				if(ch.includes("Quick Draw")){
					plainAlert("QUICK_DRAW_ALERT");
					z.quickDraw = false;
					if(target === "Deep One"){
						z.midAction = "Attack Deep One";
					} else if (horror){
						z.midAction = "Attack Horror";
					} else {
						z.midAction = "Attack Player";
					}
					z.noRansack = true;
					z.xoStack.push("Quick Draw");
					z.xoPerformers.push(me);
					z.actionPerformer = me;
				} else if(ch === "[Starbuck] Attack an enemy") {
					plainAlert("STARBUCK_ALERT",z.players[me]);
					z.starbuck = false;
					if(target === "Deep One"){
						z.midAction = "Attack Deep One";
					} else if (horror){
						z.midAction = "Attack Horror";
					} else {
						z.midAction = "Attack Player";
					}
					z.noRansack = true;
					z.xoStack.push("Starbuck");
					z.xoPerformers.push(me);
					z.actionPerformer = me;
				} else if(Number.isInteger(context)){
					removeOption(me,ch);
					removeOption(me,"I'm done with Rampage");
					removeOption(me,"[Fillet Knife] Attack another enemy");
				} else if(context === "Rumble"){
					removeOption(me,ch);
					z.midRumble = true;
				} else if(ch === "[Fillet Knife] Attack another enemy"){
					removeOption(me,ch);
				} else {
					didAction();
					if(target === "Deep One"){
						z.midAction = "Attack Deep One";
					} else if (horror){
						z.midAction = "Attack Horror";
					} else {
						z.midAction = "Attack Player";
					}
					z.actionPerformer = me;
				}
				mainMenu();
			};
			if(choices.length === 1){				
				confirmify(lc("ATTACK_CONFIRM",choices[0])+confirmText,mainMenu,()=>{
					attack(choices[0]);
				});
			} else {
				promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					attack(choices[a-1]);
				});
			}
		} else if (ch === "[Rumble] Choose your weapon" || ch === "[Rampage] Choose your weapon"){
			let choices = [];
			let promptText = "";
			if(enemiesInMySpace()){
				if(ch === "[Rampage] Choose your weapon"){
					choices.push("Regular attacks");
				} else {
					choices.push("Regular attack");
				}
				promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				if(itemPresent("Six-Shooter") && itemHolder("Six-Shooter") === me){
					choices.push("Six-Shooter");
					promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				}
				if(itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === me){
					choices.push("Pocket Pistol");
					promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				}
				if(itemPresent("Shotgun") && itemHolder("Shotgun") === me){
					choices.push("Shotgun");
					promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				}
				if(itemPresent("Fillet Knife") && itemHolder("Fillet Knife") === me){
					choices.push("Fillet Knife");
					promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				}
				if(itemPresent("Flare Gun") && itemHolder("Flare Gun") === me && !z.flareGun){
					choices.push("Flare Gun");
					promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				}
				if(itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === me){
					choices.push("Baseball Bat");
					promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
				}
			}
			if(enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me){
				choices.push("Repeating Rifle");
				promptText += "\n"+choices.length+": "+lc(choices[choices.length-1]);
			}
			if(ch === "[Rampage] Choose your weapon"){
				promptText = lc("RAMPAGE_PROMPT",choices.length)+promptText;
				promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					if(choices[a-1] === "Regular attacks"){
						addOption(me,"Attack an enemy",4,true);
						/* UTODO: clean up I'm done with Rampage */
						addOption(me,"I'm done with Rampage",undefined,true);
						plainAlert("RAMPAGE_ATTACK_ALERT",z.players[me],getGender(me));
					} else if(choices[a-1] === "Flare Gun"){
						z.flareGun = true;
						addOption(me,"[Flare Gun] Attack an enemy",1,true);
						if(canFlareGunAlert()){
							addOption(me,"[Flare Gun] Alert another character","Rampage",true);
						}
						addOption(me,"I'm done with Rampage",undefined,true);
						plainAlert("RAMPAGE_FLARE_GUN_ALERT",z.players[me],getGender(me));
					} else {
						addOption(me,"["+choices[a-1]+"] Attack an enemy",3,true);
						addOption(me,"I'm done with Rampage",undefined,true);
						plainAlert("RAMPAGE_WEAPON_ALERT",[z.players[me],choices[a-1]],getGender(me));
					}
					removeOption(me,ch);
					mainMenu();
				});
			} else {
				promptText = lc("RUMBLE_PROMPT_WEAPON",choices.length)+promptText;
				promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					if(choices[a-1] === "Regular attacks"){
						addOption(me,"Attack an enemy","Rumble",true);
						plainAlert("RUMBLE_FISTS_ALERT",z.players[me]);
					} else {
						addOption(me,"["+choices[a-1]+"] Attack an enemy","Rumble",true);
						plainAlert("RUMBLE_WEAPON_ALERT",[z.players[me],choices[a-1]],getGender(me));
						if(choices[a-1] === "Flare Gun" && canFlareGunAlert()){
							addOption(me,"[Flare Gun] Alert another character","Rumble",true);
						}
					}
					removeOption(me,ch);
					mainMenu();
				});
			}
		} else if (ch === "[Repeating Rifle] Attack an enemy" || ch === "[Quick Draw] [Repeating Rifle] Attack an enemy"){
			let promptText = "";
			let confirmText = "";
			if(ch === "[Repeating Rifle] Attack an enemy" && z.players[me] === "Jamie" && z.quickDraw){
				promptText += "\n"+lc("QUICK_DRAW_WHY_NOT");
				confirmText += "\n"+lc("QUICK_DRAW_WHY_NOT");
			}
			let choices = [];
			let spaces = [];
			for(let j = 0; !(j>=d.spaceNames.length); j++){
				spaces.push(false);
			}
			if(z.revealedHybrids[me] === 0){
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(isAdjacent(d.spaceNames[z.deepOnes[j]],z.playerLocations[me])){
						if(!spaces[z.deepOnes[j]]){
							choices.push([d.spaceNames[z.deepOnes[j]]]);
							spaces[z.deepOnes[j]] = true;
							promptText += "\n"+choices.length+": "+lc("Deep One")+" ("+lc(d.spaceNames[z.deepOnes[j]])+")";
						}
					}
				}
			}
			if(z.shoggoth && isAdjacent(z.playerLocations[me],d.spaceNames[z.shoggoth])){
				choices.push("Shoggoth");
				promptText += "\n"+choices.length+": "+lc("Shoggoth");
			}
			if(z.graspingTendril && (isAdjacent(z.playerLocations[me],d.spaceNames[z.graspingTendril]) || isAdjacent(z.playerLocations[me],d.spaceNames[z.graspingTendril+8]))){
				choices.push("Grasping Tendril");
				promptText += "\n"+choices.length+": "+lc("Grasping Tendril");
			}
			if(z.drownedSpirit && isAdjacent(z.playerLocations[me],d.spaceNames[z.drownedSpirit])){
				choices.push("Drowned Spirit");
				promptText += "\n"+choices.length+": "+lc("Drowned Spirit");
			}
			for(let j = 0; !(j>=z.revealedHybrids.length); j++){
				if(isAdjacent(z.playerLocations[j],z.playerLocations[me]) && z.revealedHybrids[me] !== z.revealedHybrids[j]){
					choices.push(z.players[j]);
					promptText += "\n"+choices.length+": "+lc(z.players[j]);
				}
			}
			let attack = (target) =>{
				let context = getContext(me,ch);
				let additionalAttacks = 0;
				if(Number.isInteger(context)){
					additionalAttacks = context - 1;
				}
				z.dieRollModifier = 1;
				if(Array.isArray(target)){
					boldAlert("REPEATING_RIFLE_DEEP_ONE_ALERT",[z.players[me],target[0]],getGender(me));
					NoSPToken("HUMAN_VS_DEEP_ONE",[z.players[me],target[0],"Repeating Rifle",additionalAttacks]);
				} else if(target === "Shoggoth" || target === "Grasping Tendril" || target === "Drowned Spirit"){
					boldAlert("REPEATING_RIFLE_ALERT",[z.players[me],target],getGender(me));
					SPTokenBad("PLAYER_VS_HORROR",[z.players[me],target,"Repeating Rifle"]);
				} else {
					boldAlert("REPEATING_RIFLE_ALERT",[z.players[me],target],getGender(me));
					SPTokenBad("PLAYER_VS_PLAYER",[z.players[me],target,"Repeating Rifle"]);
				}
				
				
				if(ch === "[Quick Draw] [Repeating Rifle] Attack an enemy"){
					plainAlert("QUICK_DRAW_ALERT");
					z.quickDraw = false;
					if(Array.isArray(target)){
						z.midAction = "Attack Deep One";
					} else if(target === "Shoggoth" || target === "Grasping Tendril" || target === "Drowned Spirit"){
						z.midAction = "Attack Horror";
					} else {
						z.midAction = "Attack Player";
					}
					z.xoStack.push("Quick Draw");
					z.xoPerformers.push(me);
					z.actionPerformer = me;
				} else if(Number.isInteger(context)){
					removeOption(me,ch);
					removeOption(me,"I'm done with Rampage");
				} else if(context === "Rumble"){
					removeOption(me,ch);
					z.midRumble = true;
				} else {
					didAction();
					if(Array.isArray(target)){
						z.midAction = "Attack Deep One";
					} else if(target === "Shoggoth" || target === "Grasping Tendril" || target === "Drowned Spirit"){
						z.midAction = "Attack Horror";
					} else {
						z.midAction = "Attack Player";
					}
					z.actionPerformer = me;
				}
				mainMenu();
			};
			
			if(choices.length === 1){	
				if(Array.isArray(choices[0])){
					confirmify(lc("REPEATING_RIFLE_DEEP_ONE_CONFIRM",choices[0][0])+confirmText,mainMenu,()=>{
						attack(choices[0]);
					});
				} else {
					confirmify(lc("REPEATING_RIFLE_PVP_CONFIRM",choices[0])+confirmText,mainMenu,()=>{
						attack(choices[0]);
					});
				}
			} else {
				promptNum(lc("REPEATING_RIFLE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					attack(choices[a-1]);
				});
			}
		} else if (ch === "Speaking Trumpet"){
			confirmify(lc("SPEAKING_TRUMPET_CONFIRM"),mainMenu,()=>{
				boldAlert("SPEAKING_TRUMPET_ALERT",z.players[me],getGender(me));
				for(let j = 0; !(j>=z.spacePassengers.length); j++){
					if(isInOrAdjacent(z.playerLocations[me],d.spaceNames[j])){
						while(z.spacePassengers[j].length > 0){
							let civ = z.spacePassengers[j].pop();
							println("PASSENGER_RESCUED",d.spaceNames[j]);
							z.passengerSupply.push(civ);
						}
					}
				}
				shuffle(z.passengerSupply);
				if(z.fromTheAbyss){
					spawnAlly(z.playerLocations[me]);
				}
				didAction();
				z.actionPerformer = me;
				finishedAction();
				mainMenu();
			});
		} else if(ch === "Rescue a Passenger") {
			let context = getContext(me,ch);
			let man = isMandatory(me,ch);
			
			let rescuePassenger = (index,rescueAll)=>{
				if(rescueAll){
					while(z.spacePassengers[index].length > 0){
						z.passengerSupply.push(z.spacePassengers[index].pop());
					}
					shuffle(z.passengerSupply);
					plainAlert("PASSENGER_RESCUE_ALERT_ALL",[z.players[me],d.spaceNames[index]]);
				} else {
					z.passengerSupply.push(z.spacePassengers[index].pop());
					shuffle(z.passengerSupply);
					plainAlert("PASSENGER_RESCUE_ALERT",[z.players[me],d.spaceNames[index]]);
				}
				if(Array.isArray(context)){
					context[1]++;
					if(numSpacePassengers() === 0){
						removeOption(me,ch);
						removeOption(me,"I'm done rescuing passengers");
						if(context[1] > 8){
							z.deepOneContext = "Call Friends";
							activateDeepOnes();
						} else if(context[1] >= 1){
							SPTokenBad("CALL_FRIENDS",context[1]);
						}
						if(z.fromTheAbyss){
							spawnAlly(d.spaceNames[index]);
						}
					} else {
						addOption(me,ch,[context[0],context[1]],man);
						addOption(me,"I'm done rescuing passengers",[context[0],context[1]],man);
					}
				} else if(ch === "[Able Seaman] Rescue a Passenger"){
					removeOption(me,ch);
					wander(ABLE_SEAMAN);
				} else {
					if(z.fromTheAbyss){
						spawnAlly(z.playerLocations[me]);
					}
					didAction();
					z.actionPerformer = me;
					finishedAction();
				}
				mainMenu();
			};
			
			if(Array.isArray(context) || ch === "[Able Seaman] Rescue a Passenger"){
				let choices = [];
				let promptText = "";
				for(let j = 0; !(j>=z.spacePassengers.length); j++){
					if(z.spacePassengers[j].length > 0){
						choices.push(j);
						promptText += "\n"+choices.length+": "+lc(d.spaceNames[j]);
					}
				}
				promptText = lc("PASSENGER_RESCUE_PROMPT",choices.length)+promptText;
				promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
					rescuePassenger(choices[a-1],(ch === "[Able Seaman] Rescue a Passenger" && choices[a-1] >= DECK));
				});
			} else {
				let locIndex = locationIndex(z.playerLocations[me]);
				let waterPassenger = z.fromTheAbyss && locIndex >= DECK && INTERIOR > locIndex && z.spacePassengers[locIndex-8].length > 0;
				let deckPassenger = z.spacePassengers[locIndex].length > 0;
				if(waterPassenger && deckPassenger){
					promptNum(lc("PASSENGER_RESCUE_PROMPT",2)+"\n1: "+lc(d.spaceNames[locIndex])+"\n2: "+lc(d.spaceNames[locIndex-8]),(a)=>1>a||a>2,mainMenu,(a)=>{
						if(a===1){
							rescuePassenger(locIndex,true);
						} else {
							rescuePassenger(locIndex-8);
						}
					});
				} else if(waterPassenger){
					rescuePassenger(locIndex-8,false);
				} else {
					rescuePassenger(locIndex,z.fromTheAbyss);
				}
			}
		} else if (ch === "I'm done rescuing passengers"){
			confirmify(lc("CALL_FRIENDS_CONFIRM"),mainMenu,()=>{
				let context = getContext(me,ch);
				removeOption(me,ch);
				removeOption(me,"Rescue a Passenger");
				if(context[1] > 8){
					if(z.fromTheAbyss){
						spawnAlly(z.playerLocations[me]);
					}
					z.deepOneContext = "Call Friends";
					activateDeepOnes();
				} else if(context[1] >= 1){
					if(z.fromTheAbyss){
						spawnAlly(z.playerLocations[me]);
					}
					SPTokenBad("CALL_FRIENDS",context[1]);
				} else {
					plainAlert("No passengers were rescued, so no die roll is necessary.");
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
				mainMenu();
			});
		} else if (ch === "Play a Shrug It Off"){
			confirmify(lc("SHRUG_IT_OFF_CONFIRM"),mainMenu,()=>{
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					if(cardName(z.skillCardHands[me][j]) === "Shrug It Off"){
						playSkillCard(me,j,true);
						break;
					}
				}
				boldAlert("SHRUG_IT_OFF_ALERT",z.players[me],getGender(me));
				resolveDefeatContext(me);
				
				mainMenu();
			});
			
		} else if(ch === "Medical Intervention (character)"){
			let targets = [];
			let promptText = "\n"+lc("FEAT_USE_WARNING");
			for(let j = 0; !(j>=z.defeats.length); j++){
				if(z.defeats[j].length > 0){
					targets.push(j);
					promptText += "\n"+(targets.length)+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("CHOOSE_HEAL_TARGET",targets.length) + promptText,(a)=>1>a||a>targets.length,mainMenu,(a)=>{
				boldAlert("MEDICAL_INTERVENTION_ALERT",z.players[targets[a-1]]);
				resolveDefeatContext(targets[a-1]);
				z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
				mainMenu();
			});
		} else if (ch === "Move a character to Sick Bay"){
			let context = getContext(me,ch);
			if(context === "Do No Harm" || context === "Do No Harm Edmund"){
				let confirmText = lc("DO_NO_HARM_CONFIRM","Svetlana");
				if(context === "Do No Harm Edmund"){
					confirmText = lc("DO_NO_HARM_CONFIRM","Edmund");
				}
				confirmify(confirmText,mainMenu,()=>{
					removeFromAll(ch);
					if(context === "Do No Harm"){
						movePlayer(getPlayerNum("Svetlana"),"Sick Bay");
					} else {
						movePlayer(getPlayerNum("Edmund"),"Sick Bay");
					}
					mainMenu();
				});
			} else {
				let targets = [];
				let promptText = "";
				for(let j = 0; !(j>=z.defeats.length); j++){
					if(z.defeats[j].length > 0 && !z.revealedHybrids[j]){
						targets.push(j);
						promptText += "\n"+(targets.length)+": "+lc(z.players[j]);
					}
				}
				promptNum(lc("CHOOSE_SICKBAY_TARGET",targets.length) + promptText,(a)=>1>a||a>targets.length,mainMenu,(a)=>{
					movePlayer(targets[a-1],"Sick Bay");
					while(z.defeats[targets[a-1]].length > 0){
						resolveDefeatContext(targets[a-1]);
					}
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(hasOption(j,"Attack an enemy") || hasOption(j,"[Six-Shooter] Attack an enemy") || 
							hasOption(j,"[Shotgun] Attack an enemy") || hasOption(j,"[Pocket Pistol] Attack an enemy") || hasOption(j,"[Baseball Bat] Attack an enemy")){
						
							if(!enemiesInMySpace(j)){
								removeOption(j,"Attack an enemy");
								removeOption(j,"[Six-Shooter] Attack an enemy");
								removeOption(j,"[Shotgun] Attack an enemy");
								removeOption(j,"[Pocket Pistol] Attack an enemy");
								removeOption(j,"[Baseball Bat] Attack an enemy");
							}
						}
						if(hasOption(j,"[Repeating Rifle] Attack an enemy") && !enemyInAdjacentSpace(j)){
							removeOption(j,"[Repeating Rifle] Attack an enemy");
						}				
					}
					mainMenu();
				});
			}
		} else if (ch === "Healing Words"){
			let targets = [];
			let promptText = "";
			for(let j = 0; !(j>=z.defeats.length); j++){
				if(z.defeats[j].length > 0){
					targets.push(j);
					promptText += "\n"+(targets.length)+": "+lc(z.players[j]);
				}
			}
			
			let chooseDiscard = (target) => {
				let promptText = "";
				let loreIndices = [];
				for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
					if(cardColorID(z.skillCardHands[me][j]) === LORE || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
						loreIndices.push(j);
						promptText += "\n"+(loreIndices.length)+": "+cardText(z.skillCardHands[me][j]);
					}
				}
				promptNum(lc("HEALING_WORDS_PROMPT",[z.players[target],loreIndices.length])+promptText,(a)=>1>a||a>loreIndices.length,mainMenu,(a)=>{
					boldAlert("HEALING_WORDS_ALERT",z.players[target]);
					discardSkillCard(me,loreIndices[a-1]);
					resolveDefeatContext(target);
					mainMenu();					
				});
			};
			
			if(targets.length === 1){
				chooseDiscard(targets[0]);
			} else {
				promptNum(lc("CHOOSE_HEAL_TARGET",targets.length) + promptText,(a)=>1>a||a>targets.length,mainMenu,(a)=>{
					chooseDiscard(targets[a-1]);
				});
			}
		} else if (ch === "Sacrifice Starbuck"){
			confirmify(lc("SACRIFICE_STARBUCK_CONFIRM"),mainMenu,()=>{
				plainAlert("SACRIFICE_STARBUCK_ALERT",z.players[me]);
				resolveDefeatContext(me);				
				for(let j = 0; !(j>=z.items[me].length); j++){
					if(d.itemNames[z.items[me][j]] === "Starbuck"){
						z.items[me].splice(j,1);
						break;
					}
				}
				mainMenu();
			});
		} else if(ch === "Deck Chief"){
			promptNum(lc("DECK_CHIEF_PROMPT"),(a)=>1>a||a>9,mainMenu,(a)=>{
				if(a === 9){
					addAlert("Chief, only suffering awaits you there.  Besides, don't you have enough to worry about with these Hybrids without adding Changelings to the mix?");			
				} else {
					boldAlert("DECK_CHIEF_ALERT",a);
					if(z.playerLocations[me] !== ("Deck Space "+a)){
						movePlayer(me,"Deck Space "+a);
					}
					if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
						z.xoStack[z.xoStack.length-1] = "Cadet+";
					}
					z.noRansack = true;
					z.deckChief = false;
				}
				mainMenu();
			});
		} else if(ch === "Watch"){
			let options = [BRIDGE];
			let promptText = "\n1: Bridge";
			for(let j = 0; !(j>=8); j++){
				if(z.spacePassengers[DECK+j].length > 0 || z.spacePassengers[WATER+j].length > 0){
					options.push(DECK+j);
					promptText += "\n"+options.length+": "+d.spaceNames[DECK+j];
				}
			}

			promptNum(lc("WATCH_PROMPT",options.length)+promptText,(a)=>1>a||a>options.length,mainMenu,(a)=>{

				boldAlert("WATCH_ALERT");
				if(z.playerLocations[me] !== d.spaceNames[options[a-1]]){
					movePlayer(me,d.spaceNames[options[a-1]]);
				}
				if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
					z.xoStack[z.xoStack.length-1] = "Cadet+";
				}
				z.noRansack = true;
				z.watch = true;
				mainMenu();
			});
		} else if(ch === "Sea Legs"){

			let options = [];
			let promptText = "";
			for(let j = DECK; !(j>=SICK_BAY); j++){
				if(z.playerLocations[me] === d.spaceNames[j] && z.cadet !== me){
					continue;
				}
				let any = false;
				for(let k = 0; !(k>=z.deepOnes.length) && !any; k++){
					if(z.deepOnes[k] === j){
						any = true;
					}
				}
				any = any || (z.shoggoth === j || z.drownedSpirit === j || z.graspingTendril + 8 === j);
				for(let k = 0; !(k>=z.numPlayers) && !any; k++){
					if(d.spaceNames[j] === z.playerLocations[k] && z.revealedHybrids[k]){
						any = true;
					}
				}
				if(any){
					options.push(j);
					promptText += "\n"+options.length+": "+lc(d.spaceNames[j]);
				}
			}
			promptNum(lc("WATCH_PROMPT",options.length)+promptText,(a)=>1>a||a>options.length,mainMenu,(a)=>{

				boldAlert("SEA_LEGS_ALERT");
				if(z.playerLocations[me] !== d.spaceNames[options[a-1]]){
					movePlayer(me,d.spaceNames[options[a-1]]);
				}
				if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
					z.xoStack[z.xoStack.length-1] = "Cadet+";
				}
				z.noRansack = true;
				z.seaLegs = true;
				mainMenu();
			});
		} else if (ch === "Plimsolls"){
			let choices = [];
			let promptText = "";
			for(let j = DECK; !(j>=INTERIOR+6); j++){
				if(isAdjacent(z.playerLocations[me],d.spaceNames[j])){
					choices.push(d.spaceNames[j]);
					promptText += "\n"+(choices.length)+": "+lc(d.spaceNames[j]);
				}
			}
			promptText = lc("PLIMSOLLS_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				movePlayer(me,choices[a-1]);
				boldAlert("PLIMSOLLS_ALERT",z.players[me],getGender(me));
				if(z.xoStack.length > 0 && z.xoStack[z.xoStack.length-1] === "Cadet"){
					z.xoStack[z.xoStack.length-1] = "Cadet+";
				}
				z.plimsolls = false;
				z.noRansack = true;
				mainMenu();
			});
			

		} else if (ch === "[Galley] Draw Skill Cards"){
			let draw = [0,0,0,0,0];
			
			let promptDraw = (n)=>{
				let max = 6;
				if(n === 0){
					max = 5;
				}
				let promptText = lc("GALLEY_PROMPT",max);
				for(let j = 0; !(j>=5); j++){
					promptText += "\n"+(j+1)+": "+lc(colorIDAlert(j));
					if(draw[j] > 0){
						promptText += " "+lc("NUM_CHOSEN",draw[j]);
					}
				}
				if(n !== 0){
					promptText += "\n6: "+lc("Stop drawing");
				}
				if(me === z.cursedWhispers){
					promptText += "\n"+lc("GALLEY_CURSED_WHISPERS");
				}
				promptNum(promptText,(a)=>1>a||a>max,mainMenu,(a)=>{
					if(a !== 6){
						draw[a-1] += 1;
						n++;
					}
					if(n === 5 || (n === 3 && z.cursedWhispers === me) || a === 6){
						let confirmText = lc("GALLEY_CONFIRM",n);
						for(let j = 0; !(j>=5); j++){
							if(draw[j] > 0){
								confirmText += "\n"+draw[j]+" "+lc(colorIDAlert(j));
							}
						}
						confirmify(confirmText,mainMenu,()=>{
							removeOption(me,ch);
							let alertText = lc("You drew:");
							for(let j = 0; !(j>=5); j++){
								while(draw[j] > 0){
									let card = dealSkillCard(me,j);
									alertText += "\n"+cardText(card);
									draw[j]--;
								}
							}
							addAlert(alertText);
							if(n === 1){
								/* UTODO: include second person pronouns in localization */
								plainAlert("GALLEY_ONE_CARD_ONLY",z.players[me]);
								if(z.cursedWhispers === me){
									SPTokenBad("Cursed Whispers","Galley");
								}
								finishedAction();
							} else {
								if(z.cursedWhispers === me){
									SPTokenBad("Cursed Whispers");
								}
								SPTokenBad("GALLEY_ROLL",n);
							}
							mainMenu();
						});
					} else {
						promptDraw(n);
					}
				});
			};
			promptDraw(0);
		} else if (ch === "Place an Item in in your play area"){
			let c = getContext(me,ch);
			let context = c[0];
			let items = c[1];
			let promptText = lc("CARGO_HOLD_PROMPT",items.length);
			for(let j = 0; !(j>=items.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.itemNames[items[j]]);
			}
			promptNum(promptText,(a)=>1>a||a>items.length,mainMenu,(a)=>{
				let chosenItem = items.splice(a-1,1)[0];
				z.items[me].push(chosenItem);
				boldAlert("CARGO_HOLD_DONE",[z.players[me],d.itemNames[chosenItem]],getGender(me));
				if(isImprovement(chosenItem) || chosenItem === VALISE){
					if(!resetImprovements(me)){
						addOption(me,"Activate an Improvement",undefined,true);
						plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
					}
				}
				if(context === "Cargo Hold" && items.length > 0){
					addAlert("BOTTOM",d.itemNames[items[0]]);
					println("CARGO_HOLD_BOTTOM_ALERT",z.players[me]);
					z.itemDeck.unshift(items[0]);
					if(!hasOption(me,"Activate an Improvement")){
						finishedAction();
					}
				} else if(context === "Conjuration"){
					plainAlert("CONJURATION_RESHUFFLE_ALERT",z.players[me]);
					while(items.length > 0){
						z.itemDeck.push(items.pop());
					}
					shuffle(z.itemDeck);
					SPTokenBad("Conjuration");
				}
				
				removeOption(me,"Return an Item to the deck");
				removeOption(me,ch);
				mainMenu();
			});
			
		} else if (ch === "Return an Item to the deck"){
			let item = getContext(me,ch);
			confirmify(lc("ITEM_RETURN",d.itemNames[item]),mainMenu,()=>{
				boldAlert("ITEM_RETURN_ALERT",z.players[me]);
				z.itemDeck.push(item);
				removeOption(me,ch);
				removeOption(me,"Place an Item in in your play area");
				finishedAction();
				mainMenu();
			});
		} else if (ch === "Retreat the Ritual Track"){
			confirmify(lc("RITUAL_RETREAT_CONFIRM"),mainMenu,()=>{
				retreatRitual();
				removeOption(me,ch);
				removeOption(me,"Discard a Lore card");
				if(z.midAction === "Chapel"){
					finishedAction();
				}
				mainMenu();
			});
		} else if (ch === "Discard a Lore card"){
			let lores = [];
			let promptText = "";
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardColorID(z.skillCardHands[me][j]) === LORE || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
					lores.push([j,z.skillCardHands[me][j]]);
					promptText += "\n"+lores.length+": "+cardText(lores[lores.length-1][1]);
				}
			}
			let proceed = (index)=>{
				let card = z.skillCardHands[me][index];
				let context = getContext(me,ch);
				discardSkillCard(me,index);
				removeOption(me,ch);
				removeOption(me,"Retreat the Ritual Track");
				if(context === "Chapel"){
					z.dieRollModifier = cardValue(card);
					SPTokenBad("Chapel");
					
					println("ROLL_MODIFIER_REMINDER",cardValue(card));
				} else if (context === "Ritual Support"){
					z.dieRollModifier = cardValue(card);
					SPTokenBad("Ritual Support");
					
					println("ROLL_MODIFIER_REMINDER",cardValue(card));
				} else if (context === "Poisoned Food"){
					z.dieRollModifier = cardValue(card);
					SPTokenBad("Poisoned Food");
					
					println("ROLL_MODIFIER_REMINDER",cardValue(card));
				} 
				mainMenu();
			};
			
			if(lores.length === 1){
				confirmify(lc("DISCARD_CONFIRM",cardText(lores[0][1])),mainMenu,()=>{
					proceed(lores[0][0]);
				});
			} else {
				promptNum(lc("DISCARD_SKILL_CARD_TYPE_PROMPT",["Lore",lores.length])+promptText,(a)=>1>a||a>lores.length,mainMenu,(a)=>{
					proceed(lores[a-1][0]);
				});
			}
			
		} else if (ch === "Discard a Strength card"){
			let lores = [];
			let promptText = "";
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardColorID(z.skillCardHands[me][j]) === STRENGTH || cardName(z.skillCardHands[me][j]) === "Ingenuity"){
					lores.push([j,z.skillCardHands[me][j]]);
					promptText += "\n"+lores.length+": "+cardText(lores[lores.length-1][1]);
				}
			}
			let proceed = (index)=>{
				let card = z.skillCardHands[me][index];
				let context = getContext(me,ch);
				discardSkillCard(me,index);
				removeOption(me,ch);
				if(context === "Boiler Room"){
					z.dieRollModifier = cardValue(card);
					SPTokenBad("Boiler Room");
					
					println("ROLL_MODIFIER_REMINDER",cardValue(card));
				}
				mainMenu();
			};
			
			if(lores.length === 1){
				confirmify(lc("DISCARD_CONFIRM",cardText(lores[0][1])),mainMenu,()=>{
					proceed(lores[0][0]);
				});
			} else {
				promptNum(lc("DISCARD_SKILL_CARD_TYPE_PROMPT",["Strength",lores.length])+promptText,(a)=>1>a||a>lores.length,mainMenu,(a)=>{
					proceed(lores[a-1][0]);
				});
			}
			
		} else if (ch === "Scout the Mythos deck"){
			let numScout = 2;
			let context = getContext(me,ch);
			if(context === "Foresee"){
				numScout = 4;
			}
			confirmify(lc("SCOUT_CONFIRM",["Mythos",numScout]),mainMenu,()=>{
				printlnBold("SCOUT_ANNOUNCEMENT",[z.players[me],"Mythos",numScout]);
				let mythoses = [];
				let alertText = "";
				for(let j = 0; !(j>=numScout); j++){
					if(z.mythosDeck.length === 0){
						reshuffleMythos();
					}
					let mythos = z.mythosDeck.pop();
					if((d.namedPlayerChooses[mythos] && (!characterPresent(d.namedPlayerChooses[mythos]) || z.playerLocations[getPlayerNum(d.namedPlayerChooses[mythos])] === "Brig")) ||
					   d.mythosNames[mythos] === "Personal Crisis"){
						plainAlert("MYTHOS_DISCARDED",d.mythosNames[mythos]);
						z.mythosDiscards.push(mythos);
						j--;
						continue;
					}
					alertText += "\n"+lc(d.mythosNames[mythos]);
					mythoses.push(mythos);
				}
				alertText = lc("SCOUT_CARDS","Mythos")+alertText+"\n"+lc("SCOUT_CARDS_2");
				addAlert(alertText);
				addOption(me,"Top a Mythos card",[getContext(me,ch),mythoses],true);
				removeOption(me,ch);
				removeOption(me,"Scout the Waypoint deck");
				mainMenu();
			});
		} else if (ch === "Scout the Waypoint deck"){
			let numScout = 2;
			let context = getContext(me,ch);
			if(context === "Foresee"){
				numScout = 4;
			}
			confirmify(lc("SCOUT_CONFIRM",["Waypoint",numScout]),mainMenu,()=>{
				printlnBold("SCOUT_ANNOUNCEMENT",[z.players[me],"Waypoint",numScout]);
				let mythoses = [];
				let alertText = "";
				for(let j = 0; !(j>=numScout); j++){
					let mythos = z.waypointDeck.pop();
					alertText += "\n"+lc(d.waypointNames[mythos]);
					mythoses.push(mythos);
					if(z.waypointDeck.length === 0){
						z.waypointDeck = z.waypointDiscards;
						shuffle(z.waypointDeck);
						plainAlert("DECK_RESHUFFLE","Waypoint");
						z.waypointDiscards = [];
					}
				}
				alertText = lc("SCOUT_CARDS","Waypoint")+alertText+"\n"+lc("SCOUT_CARDS_2");
				addAlert(alertText);
				addOption(me,"Top a Waypoint card",[context,mythoses],true);
				removeOption(me,ch);
				removeOption(me,"Scout the Mythos deck");
				mainMenu();
			});
			
		} else if (ch === "Top a Mythos card"){
			let b = getContext(me,ch);
			let context = b[0];
			let mythos = b[1];
			let promptText = lc("TOP_PROMPT",["Mythos",mythos.length]);
			for(let j = 0; !(j>=mythos.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.mythosNames[mythos[j]]);
			}
			promptNum(promptText,
				(a)=>1>a||a>mythos.length,mainMenu,(a)=>{
					z.mythosDeck.push(mythos[a-1]);
					if(mythos.length === 2){
						println("TOP_ANNOUNCEMENT",[z.players[me],"Mythos"]);
						if(a === 1){
							addAlert("TOP_ALERT",["Mythos",d.mythosNames[mythos[0]],d.mythosNames[mythos[1]]]);
							z.mythosDeck.unshift(mythos[1]);
						} else {
							addAlert("TOP_ALERT",["Mythos",d.mythosNames[mythos[1]],d.mythosNames[mythos[0]]]);
							z.mythosDeck.unshift(mythos[0]);
						}
						if(z.midAction === "Bridge"){
							finishedAction();
						}
						if(context === "Foresee"){
							SPTokenBad("Foresee");
						} else if(context === "Fortune Teller"){
							wander(FORTUNE_TELLER);
						}
					} else {
						addAlert("TOP_ALERT_2",["Mythos",d.mythosNames[mythos[a-1]]]);
						mythos.splice(a-1,1);
						println("TOP_ANNOUNCEMENT_2",[z.players[me],"Mythos"]);
						addOption(me,"Bottom a Mythos card",[context,mythos],true);
					}
					removeOption(me,ch);
					
					mainMenu();
				}
			);
			
		} else if (ch === "Bottom a Mythos card"){
			let b = getContext(me,ch);
			let context = b[0];
			let mythos = b[1];
			let promptText = lc("BOTTOM_PROMPT",["Mythos",mythos.length]);
			for(let j = 0; !(j>=mythos.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.mythosNames[mythos[j]]);
			}
			promptNum(promptText,
				(a)=>1>a||a>mythos.length,mainMenu,(a)=>{
					z.mythosDeck.unshift(mythos[a-1]);
					addAlert("BOTTOM_ALERT",["Mythos",d.mythosNames[mythos[a-1]]]);
					addAlert("BOTTOM_ANNOUNCEMENT",[z.players[me],"Mythos"]);
					mythos.splice(a-1,1);
					if(mythos.length === 1){
						addAlert("BOTTOM_ALERT",["Mythos",d.mythosNames[mythos[0]]]);
						addAlert("BOTTOM_ANNOUNCEMENT",[z.players[me],"Mythos"]);
						removeOption(me,ch);
						if(context === "Foresee"){
							SPTokenBad("Foresee");
						}
					} else {
						addOption(me,ch,[context,mythos],true);
					}					
					mainMenu();
				}
			);
		} else if (ch === "Top a Waypoint card"){
			let b = getContext(me,ch);
			let context = b[0];
			let mythos = b[1];
			let promptText = lc("TOP_PROMPT",["Waypoint",mythos.length]);
			for(let j = 0; !(j>=mythos.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.waypointNames[mythos[j]]);
			}
			promptNum(promptText,
				(a)=>1>a||a>mythos.length,mainMenu,(a)=>{
					z.waypointDeck.push(mythos[a-1]);
					if(mythos.length === 2){
						println("TOP_ANNOUNCEMENT",[z.players[me],"Waypoint"]);
						if(a === 1){
							addAlert("TOP_ALERT",["Waypoint",d.waypointNames[mythos[0]],d.waypointNames[mythos[1]]]);
							z.waypointDeck.unshift(mythos[1]);
						} else {
							addAlert("TOP_ALERT",["Waypoint",d.waypointNames[mythos[1]],d.waypointNames[mythos[0]]]);
							z.waypointDeck.unshift(mythos[0]);
						}
						if(context === "Strange Vision"){
							movePlayer(me,"Brig");
							doneWithChoiceMythos();
						}
						if(context === "Miscalculation"){
							clearSkillCheck();
						}
						if(z.midAction === "Bridge"){
							finishedAction();
						}
						if(context === "Foresee"){
							SPTokenBad("Foresee");
						} else if(context === "Quartermaster"){
							wander(QUARTERMASTER);
						}
					} else {
						addAlert("TOP_ALERT_2",["Waypoint",d.waypointNames[mythos[a-1]]]);
						mythos.splice(a-1,1);
						println("TOP_ANNOUNCEMENT_2",[z.players[me],"Waypoint"]);
						addOption(me,"Bottom a Waypoint card",[context,mythos],true);
					}
					removeOption(me,ch);
					
					mainMenu();
				}
			);
			
		} else if (ch === "Bottom a Waypoint card"){
			let b = getContext(me,ch);
			let context = b[0];
			let mythos = b[1];
			let promptText = lc("BOTTOM_PROMPT",["Mythos",mythos.length]);
			for(let j = 0; !(j>=mythos.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.waypointNames[mythos[j]]);
			}
			promptNum(promptText,
				(a)=>1>a||a>mythos.length,mainMenu,(a)=>{
					z.waypointDeck.unshift(mythos[a-1]);
					addAlert("BOTTOM_ALERT",["Waypoint",d.waypointNames[mythos[a-1]]]);
					addAlert("BOTTOM_ANNOUNCEMENT",[z.players[me],"Waypoint"]);
					mythos.splice(a-1,1);
					if(mythos.length === 1){
						addAlert("BOTTOM_ALERT",["Waypoint",d.waypointNames[mythos[0]]]);
						addAlert("BOTTOM_ANNOUNCEMENT",[z.players[me],"Waypoint"]);
						removeOption(me,ch);
						if(context === "Foresee"){
							SPTokenBad("Foresee");
						}
					} else {
						addOption(me,ch,[context,mythos],true);
					}					
					mainMenu();
				}
			);
		} else if (ch === "View discarded Loyalty cards"){
			let alertText = bold("Discarded Loyalties:\r\n");
			for(let j = 0; !(j>=z.loyaltyDiscards.length); j++){
				if(z.loyaltyDiscards[j].length > 0){
					alertText += "\r\n"+bold(z.players[j])+":";
				}
				for(let k = 0; !(k>=z.loyaltyDiscards[j].length); k++){
					alertText += "\r\n"+d.loyaltyNames[z.loyaltyDiscards[j][k]];
				}
			}
			plainAlert(alertText);
			mainMenu();
		} else if (ch === "View the top card of each discard pile"){
			let alertText = "";
			for(let j = 0; !(j>=z.skillCardDiscards.length); j++){
				if(j !== 0){
					alertText += "\n";
				}
				if(z.skillCardDiscards[j].length === 0){
					alertText += "There are no "+colorIDAlert(j)+" discards.";
				} else {
					alertText += cardText(z.skillCardDiscards[j][z.skillCardDiscards[j].length-1]);
				}
			}
			if(z.mythosDiscards.length > 0){
				alertText += "\nMythos: "+d.mythosNames[z.mythosDiscards[z.mythosDiscards.length-1]];
			} else {
				alertText += "\nMythos: (none)";
			}
			addAlert(alertText);
			mainMenu();
		} else if (ch === "View visited Waypoints"){
			let alertText = "";
			for(let j = 0; !(j>=z.waypointDiscards.length); j++){
				if(j !== 0){
					alertText += "\n";
				}
				alertText += d.waypointNames[z.waypointDiscards[j]];
			}
			addAlert(alertText);
			mainMenu();
		} else if (ch === "Print your hand report in a spoiler (and quit)"){
			let report = handReport();
			t.value += spoiler(report);
			postSeed(true);
			if(t.value.slice(-4) !== ("[h" +  "r]")) {
				t.value += "[h" +  "r]";
			}
			clearBackground();
		} else if(ch === "Allow players to take actions out of turn this turn") {
			confirmify("Use this if someone should be entitled to an action but TMR won't let them take it.", mainMenu, () => {
				plainAlert("Turning off Action safeguards.");
				z.emergencyAction = true;
				mainMenu();
			});
		} else if(ch === "Make all options non-mandatory") {
			confirmify(
				"Use this if TMR seems to think one or more people need to do something in order to end the turn or draw the current Mythos, but you are sure TMR is wrong.",
				mainMenu, () => {
					plainAlert("All current player options made non-mandatory.  You can now try drawing the top Mythos / ending the turn again.");
					for(let j = 0; !(j >= z.numPlayers); j++) {
						for(let k = 0; !(k >= z.mandatory[j].length); k++) {
							z.mandatory[j][k] = false;
						}
					}
					mainMenu();
				});
		} else if(ch === "Delete your secret messages") {
			confirmify("Confirming you want to delete your secret messages from your hand report.", mainMenu, () => {
				z.secretMessages[me] = "";
				mainMenu();
			});
		} else if (ch === "[Iceberg] Take the die roll"){
			confirmify(lc("ICEBERG_RISK_CONFIRM"),mainMenu,()=>{
				SPTokenBad("Iceberg");
				removeOption(me,ch);
				removeOption(me,"[Iceberg] Do not take the die roll");
				mainMenu();
			});
		} else if (ch === "[Iceberg] Do not take the die roll"){
			confirmify(lc("ICEBERG_SAFE_CONFIRM"),mainMenu,()=>{
				plainAlert("ICEBERG_SAFE",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Iceberg] Take the die roll");
				doneWithWaypoint();
				mainMenu();
			});
		} else if (ch === "[Storm Winds] Take the die roll"){
			confirmify(lc("STORM_WINDS_RISK_CONFIRM"),mainMenu,()=>{
				SPTokenBad("Storm Winds");
				removeOption(me,ch);
				removeOption(me,"[Storm Winds] Do not take the die roll");
				mainMenu();
			});
		} else if (ch === "[Storm Winds] Do not take the die roll"){
			confirmify(lc("STORM_WINDS_SAFE_CONFIRM"),mainMenu,()=>{
				plainAlert("ICEBERG_SAFE",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Storm Winds] Take the die roll");
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Hurricane] Lose 1 Fuel" || ch === "[Maelstrom] Lose 1 Fuel") {
			confirmify(lc("HURRICANE_FUEL_CONFIRM"), mainMenu, () => {
				decreaseFuel();
				removeOption(me, ch);
				removeOption(me, "[Hurricane] Damage the ship 2 times");
				removeOption(me, "[Maelstrom] Damage the ship 2 times");
				doneWithWaypoint();
				mainMenu();
			});
		} else if(ch === "[Hurricane] Damage the ship 2 times" || ch === "[Maelstrom] Damage the ship 2 times") {
			confirmify(lc("HURRICANE_DAMAGE_CONFIRM"), mainMenu, () => {
				if(damageShip("Hurricane 1")){
					if(damageShip("Waypoint")){
						doneWithWaypoint();
					}
				}
				removeOption(me, ch);
				removeOption(me, "[Hurricane] Lose 1 Fuel");
				removeOption(me, "[Maelstrom] Lose 1 Fuel");
				mainMenu();
			});
		} else if(ch === "Choose which Deep One activates") {
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=d.spaceNames.length); j++){
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j && z.deepOneActivated[k] === 0){
						choices.push(j);
						promptText += "\n"+choices.length+": "+lc(d.spaceNames[j]);
						break;
					}
				}
			}
			promptText = lc("DEEP_ONE_PICK_ACTIVATION_PROMPT",choices.length)+promptText;
			promptNum(promptText, (a) => 1 > a || a > choices.length, mainMenu, (a) => {
				removeOption(me, ch);
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === choices[a-1] && z.deepOneActivated[k] === 0){
						if(activateDeepOne(k)){
							resumeDeepOneActivation();
						}
						break;
					}
				}
				mainMenu();
			});
		} else if(ch === "Resume Deep Ones Activation") {
			confirmify(lc("RESUME_DEEP_ONE_ACTIVATION_CONFIRM"), mainMenu, () => {
				removeFromAll(ch);
				resumeDeepOneActivation();
				mainMenu();
			});
		} else if(ch === "Pass on Keen Insight") {
			confirmify(lc("KEEN_INSIGHT_PASS_CONFIRM"), mainMenu, () => {
				addAlert("KEEN_INSIGHT_PASS_ALERT");
				z.sps[me] = [ ["Pass"] ];
				SPToken(lc(z.dieRollQueue[0],z.dieRollParams[0]));
				mainMenu();
			});
		} else if(ch === "Pass on Determination") {
			confirmify(lc("DETERMINATION_PASS_CONFIRM"), mainMenu, () => {
				addAlert("DETERMINATION_PASS_ALERT");
				z.des[me].push(["Pass"]);
				DEToken();
				mainMenu();
			}); 
		} else if(ch.slice(0, 10) === "Roll a die") {
			confirmify(lc("DIE_ROLL_CONFIRM",lc(z.dieRollQueue[0],z.dieRollParams[0])), mainMenu, () => {
				z.spToken = false;
				z.lastDieRoll = z.dieRollQueue.shift(); /* TODO: hash by other things as well? (turn) */
				z.lastDieRollParams = z.dieRollParams.shift();
				z.lastDieRollValue = ((z.dieRolls.pop() - 1 + hashString(z.lastDieRoll[0])) % 8) + 1;
				if(z.dieRolls.length === 0) {
					for(let j = 0; !(j >= 250); j++) {
						let rando = Math.floor((z.seed * 8)/mLCG) + 1;
						updateSeed();
						z.dieRolls.push(rando);
					}
				}
				if(z.dieRollModifier === 0) {
					addAlert("DIE_ROLL",z.lastDieRollValue);
				} else if(z.dieRollModifier > 0) {
					addAlert("DIE_ROLL_PLUS",[ z.lastDieRollValue, z.dieRollModifier ,(z.lastDieRollValue + z.dieRollModifier)]);
				} else {
					addAlert("DIE_ROLL_MINUS",[ z.lastDieRollValue , (-z.dieRollModifier) , (z.lastDieRollValue + z.dieRollModifier)]);
				}
				z.lastDieRollModifier = z.dieRollModifier;
				t.value += dieRollImage() + "\r\n";
				if(!canModifyDieRoll()) {
					processDieRoll();
				}
				mainMenu();
			});
		} else if(ch === "Process the outcome of the die roll") {
			confirmify(lc("DIE_ROLL_PROCESS_CONFIRM", [lc(z.lastDieRoll,z.lastDieRollParams) ,z.lastDieRollValue + z.lastDieRollModifier]), mainMenu, () => {
				processDieRoll();
				mainMenu();
			});
		} else if(ch === "TANK this skill check") {
			confirmify(
				lc("TANK_CONFIRM"), mainMenu, () => {
					z.tank[me] = true;
					addAlert("TANK order submitted.");
					let interruptsPhase = true;
					for(let j = 0; !(j > z.numPlayers); j++) {
						if(z.skillCheckCards[j].length > 0) {
							interruptsPhase = false;
						}
					}
					if(interruptsPhase) {
						interruptsToken();
					} else {
						skillCheckToken();
					}
					mainMenu();
				});
		} else if(ch === "Cancel your TANK order") {
			confirmify(lc("TANK_CANCEL_CONFIRM"), mainMenu, () => {
				z.tank[me] = false;
				addAlert("TANK_CANCEL");
				let interruptsPhase = true;
				for(let j = 0; !(j > z.numPlayers); j++) {
					if(z.skillCheckCards[j].length > 0) {
						interruptsPhase = false;
					}
				}
				if(interruptsPhase) {
					interruptsToken();
				} else {
					let contributingMe = (me - (z.turn + 1) + z.numPlayers) % z.numPlayers;
					if(z.contributingPlayer > contributingMe){
						z.contributingPlayer = contributingMe;
					}
					skillCheckToken();
				}
				mainMenu();
			});
		} else if(ch === "Draw 2 Skill Cards (any color but treachery)" || ch === "Draw 2 Skill Cards (not treachery/boon)") {
			let card1 = -1;
			let card2 = -1;
			let maxColor = 5;
			let drawCard = function(k) {
				if(k === 2) {
					let confirmText = "";
					if(card1 === card2) {
						confirmText = lc("WATCH_AND_LEARN_2_CONFIRM",colorIDAlert(card1));
					} else {
						confirmText = lc("WATCH_AND_LEARN_1_CONFIRM",[colorIDAlert(card1),colorIDAlert(card2)]);
					}
					confirmify(confirmText, mainMenu, () => {
						let context = getContext(me,ch);
						card1 = dealSkillCard(me, card1);
						card2 = dealSkillCard(me, card2);
						addAlert("WATCH_AND_LEARN_DRAW_ALERT",[cardText(card1),cardText(card2)]);
						finishedAction();
						z.skillCardDiscards[OBSERVATION].push(context);
						notebookCheck(context,me);
						season(me,OBSERVATION);
						removeOption(me,ch);
						mainMenu();
					});
				} else {
					let promptText = "";
					if(k === 0) {
						promptText = lc("WATCH_AND_LEARN_PROMPT_1",maxColor);
					} else {
						promptText = lc("WATCH_AND_LEARN_PROMPT_2",maxColor);
					}
					for(let j = 0; !(j >= maxColor); j++) {
						promptText += "\n" + (j + 1) + ": ";
						promptText += lc(colorIDAlert(j));
					}
					promptNum(promptText, (a) => 1 > a || a > maxColor, mainMenu, (prompted) => {
						if(k === 0) {
							card1 = prompted - 1;
						} else {
							card2 = prompted - 1;
						}
						drawCard(k + 1);
					});
				}
			};
			drawCard(0);
		} else if(ch === "[Persistence] Draw Skill Cards" || ch === "[Professor] Draw Skill Cards") {
			let drawOptions = [1, 1, 1, 1, 1];
			let promptText = lc("PERSISTENCE_PROMPT");
			for(let j = 0; !(j >= drawOptions.length); j++) {
				promptText += "\n" + (j + 1) + ": ";
				promptText += colorIDAlert(j);
			}
			let context = getContext(me, ch);
			if(ch === "[Professor] Draw Skill Cards"){
				context = 3;
			}
			promptNum(promptText, (a) => 1 > a || a > drawOptions.length || drawOptions[a - 1] === 0, mainMenu, (prompted) => {
				if(me === z.cursedWhispers){
					context -= 2;
					if(context === -1){
						context = 0;
					}
				}
				confirmify(lc("PERSISTENCE_CONFIRM",[context,colorIDAlert(prompted - 1)]), mainMenu, () => {
					let alertText = lc("You drew:");
					for(let j = 0; !(j >= context); j++) {
						let card = dealSkillCard(me, prompted - 1);
						alertText += "\n" + cardText(card);
					}
					addAlert(alertText);
					removeOption(me, ch);
					removeOption(me, "[Persistence] Discard a Skill Card");
					
					if(ch === "[Professor] Draw Skill Cards"){
						if(me === z.cursedWhispers){
							SPTokenBad("Cursed Whispers","Professor");
						} else {
							wander(PROFESSOR);
						}
					} else {
						if(me === z.cursedWhispers){
							SPTokenBad("Cursed Whispers","Persistence");
						} else {
							z.skillCardDiscards[WILL].push(z.midAction[1]);
							notebookCheck(z.midAction[1],me);
							season(me,WILL);
							finishedAction();
						}
					}
					mainMenu();
				});
			});
		} else if(ch === "[Reveal] Draw Treachery") {
			let context = getContext(me, ch);
			confirmify(lc("REVEAL_TREACHERY_CONFIRM"), mainMenu, () => {
				
				let alertText = lc("You drew:");
				for(let j = 0; !(j >= context); j++) {
					let card = dealSkillCard(me, TREACHERY);
					alertText += "\n" + cardText(card);
				}
				addAlert(alertText);
				removeOption(me, ch);
				removeOption(me, "[Reveal] Discard a Skill Card");
				mainMenu();
			});
		} else if(ch === "Draw 1 Skill Card") {
			let drawOptions = [0, 0, 0, 0, 0, 0];
			if(z.fromTheAbyss){
				drawOptions.push(0);
			}
			let chr = getCharacter(z.players[me]);
			for(let j = 0; !(j >= drawOptions.length); j++) {
				drawOptions[j] = d.skillSets[j][chr];
			}
			if(z.revealedHybrids[me] === 1 && z.phase === 0) {
				drawOptions[TREACHERY] = 1;
			}
			if(z.activeImprovements[me] > 0 && z.playerLocations[me] !== "Brig"){
				drawOptions[z.activeImprovements[me]-FINE_CLOTHES] = 1;
			}
			if(itemPresent("Valise") && itemHolder("Valise") === me && z.valiseImprovement){
				drawOptions[z.valiseImprovement-FINE_CLOTHES] = 1;
			}
			if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === me && z.playerLocations[me] !== "Brig"){
				drawOptions[TREACHERY] = 1;
			}
			if(z.blessing === me){
				drawOptions[BOON] = 1;
			}
			let promptText = lc("DRAW_1_PROMPT");
			for(let j = 0; !(j >= drawOptions.length); j++) {
				promptText += "\n" + (j + 1) + ": ";
				if(drawOptions[j] === 1) {
					/* UTODO: lc this */
					promptText += colorIDAlert(j);
				} else {
					promptText += "(not in your skill set)";
				}
			}
			promptNum(promptText, (a) => 1 > a || a > drawOptions.length || drawOptions[a - 1] === 0, mainMenu, (prompted) => {
				confirmify(lc("DRAW_1_CONFIRM",colorIDAlert(prompted - 1)), mainMenu, () => {
					if(z.phase === 0){
						z.phase = 1;
					}
					let card = dealSkillCard(me, prompted - 1);
					addAlert("DRAW_1_ALERT",cardText(card));
					let context = getContext(me,ch);
					removeOption(me, ch);
					if(context === "Identity Crisis"){
						let any = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(hasOption(j,ch)){
								any = true;
								break;
							}
						}
						if(!any && z.dieRollQueue.length === 0 && z.lastDieRoll === null){
							clearSkillCheck();
						}
					}
					mainMenu();
				});
			});
		} else if(ch === "Draw 1 Skill Card (any color but treachery)" || ch === "Draw 1 Skill Card (not treachery/boon)") {
			let promptText = lc("PERSISTENCE_PROMPT",5);
			for(let j = 0; !(j >= TREACHERY); j++) {
				promptText += "\n" + (j + 1) + ": " + colorIDAlert(j);
			}
			promptNum(promptText, (a) => 1 > a || a > TREACHERY, mainMenu, (prompted) => {
				confirmify(lc("PERSISTENCE_CONFIRM",[1,colorIDAlert(prompted - 1)]), mainMenu, () => {
					let card = dealSkillCard(me, prompted - 1);
					addAlert("DRAW_1_ALERT", cardText(card));
					removeOption(me, ch);
					mainMenu();
				});
			});
		} else if(ch === "Submit Conditional Order for a rare action") {
			let rareActions = [];
			/* UTODO: look into these again*/
		
			
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(z.feats[j].includes("Uncanny Fortune")){
					rareActions.push("Uncanny Fortune [Edmund's Feat]");
					break;
				}
			}


			if(rareActions.length === 0) {
				addAlert("No rare actions available at this time.");
				mainMenu();
			} else {
				let promptText =
					"You may use this ability to request a pause for a rare interrupt-style ability when the next window for its use presents itself. " +
					"Nobody will know who requested the pause, but the request cannot be cancelled once made.\n\nFor which ability would you like to submit a pause request for? (1-" +
					rareActions.length + ")";
				for(let j = 0; !(j >= rareActions.length); j++) {
					promptText += "\n" + (j + 1) + ": " + rareActions[j];
				}
				promptNum(promptText, (a) => 1 > a || a > rareActions.length, mainMenu, (prompted) => {
					addAlert("Pause requested for " + rareActions[prompted - 1]);
					switch (rareActions[prompted - 1]) {
						case "Uncanny Fortune [Edmund's Feat]":
							z.uncannyFortunePause = true;
							addAlert("UNCANNY_FORTUNE_PAUSE_NOTE");
							break;
					}
					mainMenu();
				});
			} /* TODO: it's pretty obvious you're requesting a pause if you're not doing anything else */
		} else if(ch === "[Other Options]") {
			menuPage = "Default";
			mainMenu();
		} else if(ch === "[Settings and Conditional Orders]" || ch === "[I still can't find what I'm looking for]") {
			menuPage = ch;
			mainMenu();
		}  else if(ch === "Process outcome of this skill check") {
			/* UTODO: localization */
			let confirmText = "The outcome of the ";
			if(Number.isInteger(z.currentSkillCheck)) {
				confirmText += '"' + d.mythosNames[z.currentSkillCheck] + '"';
			} else {
				confirmText += '"' + z.currentSkillCheck + '"';
			}
			confirmText += " skill check will be a ";
			confirmText += skillCheckTally(true)[1];
			confirmText += ".\n\nWould you like to process this outcome now?";
			confirmify(confirmText, mainMenu, () => {
				processSkillCheckOutcome();
				mainMenu();	
			});
		} else if(ch === "Experienced") {
			let promptText = lc("EXPERIENCED_PROMPT",z.skillCardHands[me].length);
			for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
				promptText += "\n" + (j + 1) + ": " + cardText(z.skillCardHands[me][j]);
			}
			promptNum(promptText, (a) => 1 > a || a > z.skillCardHands[me].length, mainMenu, (prompted) => {
				confirmify(lc("EXPERIENCED_CONFIRM",cardText(z.skillCardHands[me][prompted - 1])), mainMenu,
				() => {
					let card = z.skillCardHands[me].splice(prompted - 1, 1)[0];
					z.revealedCards.push(card);
					let tally = skillCheckTally(true);
					boldAlert("EXPERIENCED_ALERT",cardText(card));
					t.value += "\r\n" + tally[0] + "\r\n";
					if(z.skillCardHands[me].length === 0) {
						z.possibleColors[me] = [0, 0, 0, 0, 0, 0];
					}
					z.experienced = true;
					/* UTODO: prepare for DE and equivalents. */
					mainMenu();
				});
			});
		} else if(ch === "Revelation [Feat]" || ch === "[Revelation] Add another skill card") {
			let promptText = lc("REVELATION_PROMPT",z.skillCardHands[me].length);
			for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
				promptText += "\n" + (j + 1) + ": " + cardText(z.skillCardHands[me][j]);
			}
			promptNum(promptText, (a) => 1 > a || a > z.skillCardHands[me].length, mainMenu, (prompted) => {
				let card = z.skillCardHands[me].splice(prompted - 1, 1)[0];
				if(ch === "Revelation [Feat]"){
					z.feats[me].splice(z.feats[me].indexOf("Revelation"),1);
				}
				z.revealedCards.push(card);
				let tally = skillCheckTally(true);
				boldAlert("REVELATION_ALERT",[z.players[me],cardText(card)],getGender(me));
				t.value += "\r\n" + tally[0] + "\r\n";
				if(z.skillCardHands[me].length === 0) {
					z.possibleColors[me] = [0, 0, 0, 0, 0, 0];
					removeOption(me,ch);
					removeOption(me,"I'm done with Revelation");
				} else {
					addOption(me,"[Revelation] Add another skill card",undefined,true);
					addOption(me,"I'm done with Revelation",undefined,true);
				}
				/* UTODO: prepare for DE and equivalents. */
				mainMenu();
			});
		} else if(ch === "I'm done with Revelation"){
			confirmify("REVELATION_CONFIRM",mainMenu,()=>{
				removeOption(me,ch);
				removeOption(me,"[Revelation] Add another skill card");
				mainMenu();
			});
		} else if(ch === "Repair Damage"){
			let confirmText = "";
			let damage = z.damage[locationIndex(z.playerLocations[me])-INTERIOR];
			if(damage === MINOR_STRUCTURAL_DAMAGE){
				confirmText = lc("MINOR_STRUCTURAL_DAMAGE_CONFIRM");
			} else if(damage === TREACHERY){
				confirmText = lc("STRUCTURAL_DAMAGE_CONFIRM_WILD");
			} else {
				confirmText = lc("STRUCTURAL_DAMAGE_CONFIRM",colorIDAlert(damage));
			}
			confirmify(confirmText,mainMenu,()=>{
				didAction();
				if(damage === MINOR_STRUCTURAL_DAMAGE){
					z.damageDeck.push(z.damage[locationIndex(z.playerLocations[me])-INTERIOR]);
					z.damage[locationIndex(z.playerLocations[me])-INTERIOR] = -1;
					shuffle(z.damageDeck);
					boldAlert("STRUCTURAL_DAMAGE_REPAIRED",[z.playerLocations[me],d.damageNames[damage]]);
					finishedAction();
				} else {
					if(damage === TREACHERY){
						boldAlert("STRUCTURAL_DAMAGE_ALERT_WILD",z.players[me]);
					} else {
						boldAlert("STRUCTURAL_DAMAGE_ALERT",[z.players[me],colorIDAlert(damage)]);
					}
					addOption(me,"[Structural Damage] Discard a Skill Card",0,true);
					z.midAction = "Repair";
					z.actionPerformer = me;
				}
				mainMenu();
			});
		} else if(ch === "Advance the Travel Track") {
			confirmify(lc("TRAVEL_ADVANCE_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Advance the Ritual Track");
				removeFromAll("Don't advance the Travel Track");
				removeFromAll("Feast [Feat]");
				if(advanceTravel()){
					if(context === "Seaborne"){
						clearSkillCheck();
					} else if(context === "Icon"){
						primeHorrorIcon();
					} else if (context === "Temporal Discovery"){
						delete z.temporalDiscovery;
						plainAlert("ITEM_IS_REMOVED","Temporal Discovery");
						SPTokenBad("Temporal Discovery","Travel");
					} else if(context === "Respite"){
						z.finishedMythos = true;
					}
				} else {
					if(context === "Seaborne"){
						z.extraTravel = "Mythos";
					} else if(context === "Icon"){
						z.extraTravel = "Jump Icon";
					} else if(context === "Temporal Discovery"){
						delete z.temporalDiscovery;
						plainAlert("ITEM_IS_REMOVED","Temporal Discovery");
						z.extraTravel = ["Temporal Discovery",z.extraTravel];
					} else if(context === "Respite"){
						z.extraTravel = "Respite";
					}
				}
				mainMenu();
			});
		} else if (ch === "Don't advance the Travel Track"){
			confirmify("TEMPORAL_DISCOVERY_DECLINE",mainMenu,()=>{
				plainAlert("TEMPORAL_DISCOVERY_DECLINE_ALERT",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"Advance the Travel Track");
				doneWithSleeper(true);
				mainMenu();
			});
		} else if (ch === "Don't advance the Ritual Track"){
			confirmify("TEMPORAL_DISCOVERY_DECLINE_CONFIRM_RITUAL",mainMenu,()=>{
				plainAlert("TEMPORAL_DISCOVERY_DECLINE_ALERT",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"Advance the Ritual Track");
				doneWithRitual(true);
				mainMenu();
			});
		} else if(ch === "Advance the Ritual Track") {
			confirmify(lc("RITUAL_ADVANCE_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Advance the Travel Track");
				removeFromAll("Don't advance the Ritual Track");
				removeFromAll("Feast [Feat]");
				if(advanceRitual()){
					if(context === "Seaborne"){
						clearSkillCheck();
					} else if(context === "Icon"){
						primeHorrorIcon();
					} else if (context === "Temporal Discovery"){
						delete z.temporalDiscovery;
						plainAlert("ITEM_IS_REMOVED","Temporal Discovery");
						SPTokenBad("Temporal Discovery","Ritual");
					} else if (context === "Respite"){
						z.finishedMythos = true;
					}
				} else {
					if(context === "Seaborne"){
						z.extraRitual = "Mythos";
					} else if(context === "Icon"){
						z.extraRitual = "Jump Icon";
					} else if(context === "Temporal Discovery"){
						delete z.temporalDiscovery;
						plainAlert("ITEM_IS_REMOVED","Temporal Discovery");
						z.extraRitual = ["Temporal Discovery",z.extraRitual];
					} else if(context === "Respite"){
						z.extraRitual = "Respite";
					}
				}
				let man = isMandatory(me,ch);
				if(Number.isInteger(context) && context > 1){
					optionForAll(ch,context-1,man);
				}
				
				mainMenu();
			});
		} else if(ch === "Pass your remaining Loyalty cards to a Human of your choice") {
			/* UTODO: localization */
			let promptText = lc("Your remaining Loyalties are:");
			for(let j = 0; !(j >= z.loyaltyHands[me].length); j++) {
				promptText += "\n" + lc(d.loyaltyNames[z.loyaltyHands[me][j]]);
			}
			promptText += "\n\n"+lc("PASS_LOYALTY_PROMPT",z.numPlayers);
			for(let j = 0; !(j >= z.numPlayers); j++) {
				promptText += "\n" + (j + 1) + ": ";
				if(z.revealedHybrids[j] === 1) {
					promptText += lc("[TRAITOR]");
				} else {
					promptText += lc(z.players[j]);
				}
			}
			promptNum(promptText, (a) => 1 > a || a > z.numPlayers || z.revealedHybrids[a - 1] === 1, mainMenu, (prompted) => {
				addAlert("You pass your Loyalties to " + z.players[prompted - 1] + ".");
				boldAlert("PASS_LOYALTY_ANNOUNCE",[z.players[me],z.players[prompted - 1]],getGender(me));
				z.loyaltyHands[prompted - 1] = z.loyaltyHands[prompted - 1].concat(shuffle(z.loyaltyHands[me]));
				z.loyaltyHands[me] = [];
				let context = getContext(me,ch);
				removeOption(me,ch);
				if(context === "Reveal"){
					loseTitleFeatMythos(me);
				} else if(context === "Sleeper"){
					let any = false;
					for(let j = 0; !(j>=z.numPlayers);j++){
						if(hasOption(j,ch)){
							any = true;
						}
					}
					if(!any){
						doneWithSleeper();
					}
				}
				
				mainMenu();
			});
		} else if(ch === "Receive Skills for this turn" || ch === "Draw initial Skill Cards" || ch === "Preparation" || ch === "[Beck and Call] Draw skill cards") {
			let context = getContext(me,ch);
			if(context === "Beck and Call"){
				confirmify("BECK_AND_CALL_PASS_CONFIRM",mainMenu,()=>{
					let alertText = lc("You drew:");
					for(let i = 0; !(i >= 5); i++) {
						for(let j = d.skillDraws[i ][getCharacter(z.players[z.turn])]; j > 0; j--) {
							let card = dealSkillCard(z.turn, i);
							alertText += "\n"+cardText(card);
						}
					}
					if(z.activeImprovements[z.turn] && z.playerLocations[z.turn] !== "Brig"){
						let card = dealSkillCard(z.turn,z.activeImprovements[z.turn] - FINE_CLOTHES);
						alertText += "\n"+cardText(card);
					}
					if(itemPresent("Valise") && itemHolder("Valise") === z.turn && z.valiseImprovement){
						dealSkillCard(z.turn,z.valiseImprovement - FINE_CLOTHES);
					}
					if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === z.turn && z.playerLocations[z.turn] !== "Brig"){
						dealSkillCard(z.turn,TREACHERY);
					}
					if(z.blessing === me){
						dealSkillCard(z.turn,BOON);
					}
					addAlert(alertText);
					z.phase = 1;
					removeOption(me,ch);
					removeOption(me,"Beck and Call [Feat]");
					mainMenu();
				});
			} else {
				let maxColors = 6;
				let draw = [0, 0, 0, 0, 0, 0];
				if(z.fromTheAbyss){
					maxColors = 7;
					draw.push(0);
				}
				
				let drawTotal = 0;
				let maxDraw = 3;
				let myCharacter = getCharacter(z.players[me]);
				let confirmDraw = function() {
					let confirmText = lc("CONFIRM_DRAW");
					for(let i = 0; !(i >= maxColors); i++) {
						if(draw[i ] > 0) {
							/* UTODO: colorIDName should include lc */
							confirmText += "\n"+draw[i ] + " " + colorIDName(i);
						}
					}
					confirmify(confirmText, mainMenu, () => {
						if(ch === "Draw initial Skill Cards") {
							println("INITIAL_DRAW_ALERT",z.players[me],getGender(me));
						} else if (ch === "Preparation"){
							println("PREPARATION_ALERT",z.players[me],getGender(me));
						} else if ( ch === "[Beck and Call] Draw skill cards" ){
							println("BECK_AND_CALL_CURSED",z.players[me],getGender(me));
						} else {
							println("TRAITOR_DRAW_ALERT",z.players[me],getGender(me));
						}
						let cardsDealt = lc("You drew:");
						for(let i = 0; !(i >= maxColors); i++) {
							for(let j = draw[i ]; j > 0; j--) {
								let card = dealSkillCard(me, i); /* TODO: better alert than undefined if out of cards in deck? */
								cardsDealt += "\n"+cardText(card);
							}
						}
						addAlert(cardsDealt);
						if(z.turn === me && ch !== "Preparation" && context !== "Cursed Whispers" &&  ch !== "[Beck and Call] Draw skill cards") {
							z.phase = 1;
						}
						removeOption(me,ch);
						if(ch === "Draw initial Skill Cards"){
							let allDone = true;
							for(let j = 1; !(j>=z.numPlayers); j++){
								if(z.skillCardHands[j].length === 0){
									allDone = false;
									break;
								}
							}
							if(allDone){
								if(z.fromTheAbyss){
									plainAlert("INITIAL_ALLY_PLACEMENT");
									NoSPToken("Initial Ally Placement",1);
								} else {
									dealInitialLoyalties();
								}
							}
						} else if (ch === "Preparation"){
							let any = false;
							for(let j = 0; !(j>=z.numPlayers); j++){
								if(hasOption(j,"Preparation")){
									any = true;
								}
							}
							if(!any){
								handlePreludes();
							}
						} else if (context === "Cursed Whispers"){
							SPTokenBad("Cursed Whispers","Receive Skills");
						} else if ( ch === "[Beck and Call] Draw skill cards"){
							SPTokenBad("Cursed Whispers","Beck and Call");
						}
						mainMenu();
					});
					
				};

				let drawOptions = [0, 0, 0, 0, 0, 0];
				if(z.fromTheAbyss){
					drawOptions.push(0);
				}
				
				if(ch === "[Beck and Call] Draw skill cards"){
					maxDraw = 0;
					for(let j = 0; !(j>=z.items[me].length); j++){
						if(isImprovement(z.items[me][j])){
							drawOptions[z.items[me][j]-FINE_CLOTHES]++;
							maxDraw++;
						}
					}
					maxDraw -= 2;
				} else {
					for(let j = 0; !(j >= drawOptions.length); j++) {
						drawOptions[j] = d.skillDraws[j][myCharacter];
					}
				
					if(z.revealedHybrids[me] === 1) {
						maxDraw = 5;
						drawOptions[TREACHERY] = 5;
						if(z.activeImprovements[me] && z.playerLocations[me] !== "Brig"){
							drawOptions[z.activeImprovements[me]-FINE_CLOTHES]++;
							drawOptions[TREACHERY]++;
							maxDraw++;
						}
						if(itemPresent("Valise") && itemHolder("Valise") === me && z.valiseImprovement){
							drawOptions[z.valiseImprovement-FINE_CLOTHES]++;
							drawOptions[TREACHERY]++;
							maxDraw++;
						}
						if(z.blessing === me){
							drawOptions[BOON]++;
							drawOptions[TREACHERY]++;
							maxDraw++;
						}
					} else if(context === "Cursed Whispers") {
						if(z.activeImprovements[me] && z.playerLocations[me] !== "Brig"){
							drawOptions[z.activeImprovements[me]-FINE_CLOTHES]++;
							maxDraw++;
						}
						if(itemPresent("Valise") && itemHolder("Valise") === me && z.valiseImprovement){
							drawOptions[z.valiseImprovement-FINE_CLOTHES]++;
							maxDraw++;
						}
						if(z.blessing === me){
							drawOptions[BOON]++;
							maxDraw++;
						}
					}
					if(itemPresent("Cursed Mask") && itemHolder("Cursed Mask") === me && z.playerLocations[me] !== "Brig"){
						drawOptions[TREACHERY]++;
						if(z.revealedHybrids[me] === 1 || context === "Cursed Whispers"){
							maxDraw++;
						}
					}
				}

				
				let drawACard = function() {
					let optionsDraw = [];
					for(let j = 0; !(j>=6); j++){
						if(drawOptions[j] === 0){
							optionsDraw.push("(cannot draw this)");
						} else {
							optionsDraw.push("Draw 1 "+colorIDAlert(j));
						}
					}
					let promptText = lc("SKILL_DRAW_PROMPT");
					for(let i = 0; !(i >= optionsDraw.length); i++) {
						promptText += "\n"+(i + 1) + ": " + lc(optionsDraw[i ]);
					}
					promptNum(promptText, (a) => 1 > a || a > optionsDraw.length || drawOptions[a - 1] === 0, mainMenu, (prompted2) => {
						draw[prompted2 - 1]++;
						drawTotal++;
						addAlert("CHOSE_TO_DRAW",colorIDName(prompted2 - 1));
						if(drawTotal === maxDraw){
							confirmDraw();
							return;
						}
						drawOptions[prompted2 - 1]--;
						drawACard();
					});
				};
				drawACard();
			}

		} else if(ch === "Uncanny Fortune [Feat]") {
			confirmify(lc("UNCANNY_FORTUNE_CONFIRM")+"\n"+lc("FEAT_USE_WARNING"), mainMenu, () => {
				z.mythosDiscards.push(z.currentMythos);
				if(z.mythosDeck.length === 0){
					reshuffleMythos();
				}
				z.currentMythos = null;

				z.feats[me].splice(z.feats[me].indexOf("Uncanny Fortune"),1);
				printlnBold("UNCANNY_FORTUNE_PRINT",z.players[me]);
				removeFromAll("Process Monster Activation Icon");
				playMythos();
				addAlert("UNCANNY_FORTUNE_NEW_MYTHOS",d.mythosNames[z.currentMythos]);
				/* TODO: resolve double alert */
				if(z.playerLocations[z.turn] !== "Brig" && ((z.turn === me && d.currentPlayerChooses[z.currentMythos] === 1) || (z.captain === me && d.captainChooses[z.currentMythos] === 1) || 
				(z.keeper === me && d.keeperChooses[z.currentMythos] === 1) || d.namedPlayerChooses[z.currentMythos] === z.players[me])) {
					addAlert("ITS_YOUR_CHOOSE");
				}
				mainMenu();
			});
		} else if (ch === "Process Monster Activation Icon"){
			confirmify("Confirming that Edmund is not using his Feat on this Mythos, and that you want to process the Monster activation icon.",mainMenu,()=>{
				removeFromAll(ch);
				primeCylonActivation();
				z.finishedMythos = true;
				mainMenu();
			});
		} else if (ch === "Choose a space to damage") {
			let choices = [];
			let promptText = "";
			for(let j = INTERIOR; !(j>=INTERIOR+6); j++){
				if(z.damage[j-INTERIOR] === -1){
					choices.push(j);
					promptText += "\n"+(choices.length)+": "+lc(d.spaceNames[j]);
				}
			}
			promptText = lc("DAMAGE_SPACE_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				boldAlert("DAMAGE_SPACE_ALERT",[z.players[me],d.spaceNames[choices[a-1]]]);
				removeOption(me,ch);
				if(damageLocation(d.spaceNames[choices[a-1]],undefined,"Sabotage")){
					doneWithRevealEffect(getPlayerNum("Jeanne"));
				}
				mainMenu();
			});
		} else if(ch === "Reveal as a Traitor") {
			let revealingCard = -1;
			
			let isCultist = false;
			let isHybrid = false;
			
			for(let i = 0; !(i >= z.loyaltyHands[me].length); i++) {
				if(isHybridCard(z.loyaltyHands[me][i ])) {
					isHybrid = true;
					revealingCard = i;
				}
				if(z.loyaltyHands[me][i ] === CULTIST && z.numPlayers !== 7) {
					isCultist = true;
					revealingCard = i;
				}
			}
			
			let reveal = (revealingCard)=>{
				let loyalty = z.loyaltyHands[me][revealingCard];
				z.loyaltyDiscards[me].push(z.loyaltyHands[me].splice(revealingCard, 1)[0]);
				boldAlert("REVEAL_ALERT",[z.players[me],d.loyaltyNames[loyalty]]);
				/* URULES: do you count as traitor immediately? */
				z.revealedHybrids[me] = 1;
				fleeCheck(locationIndex(z.playerLocations[me]));
				didAction();
				z.midAction = "Reveal";
				z.actionPerformer = me;
				let done = true;
				if(z.playerLocations[me] === "Brig") {
					plainAlert("BRIG_REVEAL_ALERT",z.players[me],getGender(me));
				} else {
					switch (z.players[me]) {
						
					case "Keilani":
						done = decreaseSanity();
						break;
					case "Arjun":
						z.travelTrack = 0;
						boldAlert("RESET_TRAVEL_TRACK");
						break;
					case "Svetlana":
						done = false;
						if(numSpacePassengers() === 0){
							if(z.passengerSupply.length === 0){
								plainAlert("CONDUCT_MALPRACTICE_NONE");
								done = true;
							} else if(z.feats[me].includes("Medical Intervention")){
								plainAlert("CONDUCT_MALPRACTICE_SUPPLY");
								addOption(me,"Defeat a passenger in the supply","Conduct Malpractice",true);
								addOption(me,"Medical Intervention (passenger)","Conduct Malpractice",false);
							} else {
								done = defeatSupplyPassenger();
							}
						} else if (z.passengerSupply.length === 0){
							let numSectors = 0;
							for(let j = 0; !(j>=z.spacePassengers.length); j++){
								if(z.spacePassengers[j].length > 0){
									numSectors++;
								}
							}
							if(numSectors === 1 && !z.feats[me].includes("Medical Intervention")){
								for(let j = 0; !(j>=z.spacePassengers.length); j++){
									if(z.spacePassengers[j].length > 0){
										done = defeatPassenger(z.spacePassengers[j].pop());
										break;
									}
								}
							} else {
								plainAlert("CONDUCT_MALPRACTICE_SPACE");
								addOption(me,"Defeat a passenger in a space","Conduct Malpractice",true);
								if(z.feats[me].includes("Medical Intervention")){
									addOption(me,"Medical Intervention (passenger)","Conduct Malpractice",false);
								}
							}	
						} else {
							plainAlert("CONDUCT_MALPRACTICE_CHOICE");
							addOption(me,"Defeat a passenger in a space","Conduct Malpractice",true);
							addOption(me,"Defeat a Passenger in the supply","Conduct Malpractice",true);
							if(z.feats[me].includes("Medical Intervention")){
								addOption(me,"Medical Intervention (passenger)","Conduct Malpractice",false);
							}
						}
						break;
					case "Jeanne": {
						let numUndamaged = 0;
						let index = -1;
						for(let j = 0; !(j>=z.damage.length); j++){
							if(z.damage[j] === -1){
								numUndamaged++;
								index = j;
							}
						}
						if(numUndamaged === 1){
							/* This will likely end the game */
							done = damageLocation(d.spaceNames[INTERIOR+index],undefined,"Sabotage");
						} else {
							plainAlert("CHOOSE_DAMAGE_ANNOUNCE",z.players[me]);
							done = false;
							addOption(me,"Choose a space to damage","Sabotage",true);
						}
						break;
					}
					case "Jamie": {
						for(let j = 0; !(j>=z.revealedHybrids.length); j++){
							let k = (z.turn + j) % z.numPlayers;
							if(z.playerLocations[me] === z.playerLocations[k] && z.revealedHybrids[k] === 0){
								done = defeat(k,"Rain Fire") && done;
							}
						}
						let index = locationIndex(z.playerLocations[me]);
						
						if(z.spacePassengers[index].length > 0){
							let medicalIntervention = false;
							for(let j = 0; !(j>=z.numPlayers); j++){
								if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
									medicalIntervention = true;
									break;
								}
							}
							let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(z.playerLocations[itemHolder("Travel Pharmacy")], z.playerLocations[me]);
							if(!medicalIntervention && !travelPharmacy && done){
								while(z.spacePassengers[index].length > 0 && done){
									done = defeatPassenger(z.spacePassengers[index].pop());
								}
							} else {
								boldAlert("JAM_TIN_GRENADE_PASSENGERS_DEFEAT_ALERT",z.playerLocations[me]);
								if(travelPharmacy){
									plainAlert("TRAVEL_PHARMACY_JAM_TIN_GRENADE_ALERT",[z.players[itemHolder("Travel Pharmacy")],z.playerLocations[me]],getGender(itemHolder("Travel Pharmacy")));
									addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",["Rain Fire",index,0],false);
								}
								if(medicalIntervention){
									plainAlert("MEDICAL_INTERVENTION_JAM_TIN_GRENADE_ALERT");
									addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",["Rain Fire",index,0],false);
								}
								optionForAll("Defeat a passenger in a space",["Rain Fire",index,0],true);
								done = false;
							}
						}
						break;
					}
					case "William": {
						plainAlert("DISRUPT_RITUAL_ALERT");
						addOption(me,"Disrupt Ritual",undefined,true);
						done = false;
						break;
					}
					case "Beatrice": {
						done = false;
						if(deepOnesReserves() >= 4){
							plainAlert("DIVIDE_AND_CONQUER_ALERT");
							addOption(me,"Divide and Conquer",undefined,true);
						} else {
							boldAlert("DIVIDE_AND_CONQUER_NONE");
							endGame(false);
						}
						break;
					}
					case "Ishmael": {
						let numActivating = 0;
						resetDeepOneActivations();
						for(let j = 0; !(j >= z.deepOnes.length); j++) {
							if(z.deepOnes[j] !== locationIndex(z.playerLocations[me])) {
								z.deepOneActivated[j] = 1;
							} else {
								numActivating++;
							}
						}
						if(numActivating > 0){
							done = resumeDeepOneActivation();
							if(!done){
								z.deepOneContext = "Swear the Second Oath";
							}
						}
						break;
					}
					case "Edmund": {
						done = false;
						z.spreadMisfortune = true;
						playMythos(me);
						break;
					}
					case "Samira": {
						let total = 0;
						for(let j = 0; !(j>=z.items.length); j++){
							if(z.playerLocations[me] === z.playerLocations[j] && z.revealedHybrids[j] === 0 && j !== me){
								total += z.items[j].length;
							}
						}
						if(total === 0){
							boldAlert("PICKPOCKET_FAIL");
						} else if(total === 1){
							for(let j = 0; !(j>=z.items.length); j++){
								if(z.playerLocations[me] === z.playerLocations[j] && z.revealedHybrids[j] === 0 && j !== me && z.items[j].length > 0){
									let item = z.items[j].pop();
									if(d.itemNames[item] === "Cursed Mask"){
										plainAlert("CURSED_MASK_PICKPOCKET");
										z.items[j].push(item);
										if(j === z.cursedWhispers){
											done = false;
											SPTokenBad("Cursed Whispers","Pickpocket");
										} else {
											dealSkillCard(j,TREACHERY);
										} 
									} else {
										z.items[me].push(item);
										boldAlert("PICKPOCKET_ALERT",[d.itemNames[item],z.players[j]]);
										if(isImprovement(item) || item === VALISE){
											if(!resetImprovements(me)){
												addOption(me,"Activate an Improvement","Pickpocket",true);
												plainAlert("MULTIPLE_IMPROVEMENTS_ALERT",z.players[me]);
												done = false;
											}
											/* target only had 1 item, so they no longer have an improvement */
										}
										
										break;
									}
								}
							}
						} else {
							addOption(me,"Pickpocket",undefined,true);
							done = false;
						}
						break;
					}
					case "Antar":
						shuffleTreachery(4);
						dealSkillCard(me,TREACHERY);
						dealSkillCard(me,TREACHERY);
						dealSkillCard(me,TREACHERY);
						dealSkillCard(me,TREACHERY);
						break;
					case "Avery":
						done = activateGraspingTendril("Manifest Horror 1");
						done = done && activateGraspingTendril("Manifest Horror 2");
						break;
					case "Ida": {
						if((z.allyDeck.length + z.allies.length > 3) && z.allies.length > 0){
							addAlert("GATHER_FRIENDS_ALERT");
							addOption(me,"[Gather Friends] Remove an Ally",3,true);
						} else if (z.allyDeck.length > 3){
							for(let j = 0; !(j>=3); j++){
								let ally = z.allyDeck.pop();
								plainAlert("ITEM_IS_REMOVED",d.allyNames[ally]);
							}
							boldAlert("GATHER_FRIENDS_ALERT_ROLL");
							NoSPToken("Gather Friends",1);
						} else {
							while(z.allyDeck.length > 0){
								let ally = z.allyDeck.pop();
								plainAlert("ITEM_IS_REMOVED",d.allyNames[ally]);
							}
							while(z.allies.length > 0){
								let ally = z.allies.pop()[0];
								plainAlert("ITEM_IS_REMOVED",d.allyNames[ally]);
							}
							boldAlert("GATHER_FRIENDS_ALERT_ROLL");
							NoSPToken("Gather Friends",1);
						}
						done = false;
						break;
					}
					case "Guillaume":
						done = activateDrownedSpirit("Call the Dead 1");
						done = done && activateDrownedSpirit("Call the Dead 2");
						break;
					case "Kokoj":
						done = activateShoggoth("Heed the Mask 1");
						done = done && activateShoggoth("Heed the Mask 2");
						break;
					case "Raúl": {
						let count = 0;
						let player = -1;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(j !== me && !z.revealedHybrids[j] && z.playerLocations[me] === z.playerLocations[j]){
								count++;
								player = j;
							}
						}
						if(count === 0){
							plainAlert("No effect.");
						} else if(count === 1){
							shuffle(z.skillCardHands[player]);
							for(let j = 0; !(j>=z.possibleColors[player].length); j++){
								if(z.possibleColors[player][j]){
									z.possibleColors[me][j] = 1;
								}
							}
							for(let j = 0; !(j>=4) && z.skillCardHands[player].length > 0; j++){
								let card = z.skillCardHands[player].pop();
								addAlert("BETRAY_ALERT",[cardText(card),z.players[player]]);
							}
							if(z.skillCardHands[player].length === 0){
								z.possibleColors[player] = [0,0,0,0,0,0,0];
							}
						} else {
							addOption(me,"[Betray] Choose a victim",undefined,true);
							addAlert("BETRAY_ALERT_CHOOSE");
							done = false;
						}
						break;
					}
					case "Sardaana": {
						let any = true;
						for(let j = DECK; !(j>=INTERIOR); j++){
							while(z.spacePassengers[j].length > 0){
								z.spacePassengers[j-8].push(z.spacePassengers[j].pop());
								any = true;
							}
						}
						if(any){
							plainAlert("ABANDON_SHIP_ALERT");
						}
						let context = [];
						for(let j = 0; !(j>=z.numPlayers); j++){
							let k = (z.turn + j) % z.numPlayers;
							/* ARULES: this doesn't free people from the brig, right? */
							if(!z.revealedHybrids[k] && locationIndex(z.playerLocations[k]) >= INTERIOR && z.playerLocations[k] !== "Brig"){
								switch(z.playerLocations[k]){
									case "Chapel":
										movePlayer(k,"Deck Space 3");
										break;
									case "Captain's Cabin":
										movePlayer(k,"Deck Space 4");
										break;
									case "Cargo Hold":
										movePlayer(k,"Deck Space 5");
										break;
									case "Galley":
										movePlayer(k,"Deck Space 6");
										break;
									case "Bridge":
									case "Boiler Room":
									case "Sick Bay":
										done = false;
										context.push(k);
										break;
								}
							}
						}
						if(context.length > 0){
							addOption(me,"[Abandon Ship] Move a player",context,true);
							boldAlert("ABANDON_SHIP_PLAYER_ALERT");
						}
						for(let j = 0; !(j>=z.allies.length); j++){
							let destination = "";
							switch(z.allies[j][1]){
								case "Chapel":
									destination = "Deck Space 3";
									break;
								case "Captain's Cabin":
									destination = "Deck Space 4";
									break;
								case "Cargo Hold":
									destination = "Deck Space 5";
									break;
								case "Galley":
									destination = "Deck Space 6";
									break;
								case "Bridge":
									done = false;
									boldAlert("JOIN_HANDS_ALERT",["Sardaana",d.allyNames[z.allies[j][0]],1,2]);
									addOption(z.turn,"[Abandon Ship] Move an ally",undefined,true);
									break;
								case "Boiler Room":
									done = false;
									boldAlert("JOIN_HANDS_ALERT",["Sardaana",d.allyNames[z.allies[j][0]],1,2]);
									addOption(z.turn,"[Abandon Ship] Move an ally",undefined,true);
									break;
							}
							if(destination !== ""){
								plainAlert("PLAYER_IS_MOVED",[d.allyNames[z.allies[j][0]],destination]);
								z.allies[j][1] = destination;
								fleeCheck(locationIndex(destination));
							}
						}
						break;
						
					}
					case "Mui Choo":
						if(z.playerLocations[me] === "Sick Bay"){
							plainAlert("No effect.");
						} else {
							let any = false;
							for(let j = 0; !(j>=z.deepOnes.length); j++){
								if(z.deepOnes[j] > RESERVES){
									any = true;
									break;
								}
							}
							if(!any){
								plainAlert("No effect.");
							} else {
								addAlert("REUNITE_ALERT");
								addOption(me,"[Reunite] Move a Deep One",4,true);
								addOption(me,"I'm done with Reunite",undefined,true);
								done = false;
							}
						}
						break;
					}
					
				}
				if(done){
					doneWithRevealEffect(me);
				}
				mainMenu();
			};
			
			if(isHybrid && isCultist){
				promptNum(lc("REVEAL_PROMPT"),(a)=>1>a||a>2,mainMenu,(a)=>{
					if(a === 1){
						for(let i = 0; !(i >= z.loyaltyHands[me].length); i++) {
							if(isHybridCard(z.loyaltyHands[me][i ])) {
								revealingCard = i;
								break;
							}
						}
					} else {
						for(let i = 0; !(i >= z.loyaltyHands[me].length); i++) {
							if(z.loyaltyHands[me][i ] === CULTIST) {
								revealingCard = i;
								break;
							}
						}
					}
					reveal(revealingCard);
				});
			} else {				
				confirmify(lc("REVEAL_CONFIRM"), mainMenu, () => {
					reveal(revealingCard);
				});
			}
	
		} else if (ch === "[Reunite] Move a Deep One"){
			let choices = [];
			let promptText = "";
			let count = 0;
			for(let j = DEEP; !(j>=SICK_BAY); j++){
				let found = false;
				if(d.spaceNames[j] === z.playerLocations[me]){
					continue;
				}
				for(let k = 0; !(k>=z.deepOnes.length); k++){
					if(z.deepOnes[k] === j){
						if(!found){
							choices.push(j);
							promptText += "\n"+choices.length+": "+lc(d.spaceNames[j]);
							found = true;
						}
						count++;
					}
				}
			}
			promptNum(lc("REUNITE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] === choices[a-1]){
						z.deepOnes[j] = locationIndex(z.playerLocations[me]);
						plainAlert("REUNITE_MOVE_ALERT",[d.spaceNames[choices[a-1]],z.playerLocations[me]]);
						fleeCheck(choices[a-1]);
						break;
					}
				}
				let context = getContext(me,ch);
				context--;
				removeOption(me,ch);
				if(context === 0 || count === 1){
					removeOption(me,"I'm done with Reunite");
					doneWithRevealEffect(me);						
				} else {
					addOption(me,"[Reunite] Move a Deep One",context);
				}
				mainMenu();
			});
			
		} else if (ch === "I'm done with Reunite"){
			confirmify("REUNITE_DONE_CONFIRM",mainMenu,()=>{
				plainAlert("REUNITE_DONE_ALERT");
				removeOption(me,ch);
				removeOption(me,"[Reunite] Move a Deep One");
				doneWithRevealEffect(me);
				mainMenu();
			});						
		} else if (ch === "[Betray] Choose a victim"){
			
			let promptText = "";
			let choices = [];
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(j !== me && !z.revealedHybrids[j] && z.playerLocations[me] === z.playerLocations[j]){
					choices.push(j);
					promptText += "\n"+(choices.length)+": "+z.players[j];
				}
			}
			promptNum(lc("BETRAY_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				let player = choices[a-1];
				shuffle(z.skillCardHands[player]);
				for(let j = 0; !(j>=z.possibleColors[player].length); j++){
					if(z.possibleColors[player][j]){
						z.possibleColors[me][j] = 1;
					}
				}
				for(let j = 0; !(j>=4) && z.skillCardHands[player].length > 0; j++){
					let card = z.skillCardHands[player].pop();
					addAlert("BETRAY_ALERT",[cardText(card),z.players[player]]);
				}
				if(z.skillCardHands[player].length === 0){
					z.possibleColors[player] = [0,0,0,0,0,0,0];
				}
				removeOption(me,ch);
				doneWithRevealEffect(me);
				mainMenu();
			});

		} else if (ch === "[Gather Friends] Remove an Ally"){
			let allyDeck = 1;
			if(z.allyDeck.length === 0){
				allyDeck = 0;
			}
			let promptText = lc("GATHER_FRIENDS_PROMPT",z.allies.length+allyDeck);
			for(let j = 0; !(j>=z.allies.length); j++){
				promptText += "\n"+(j+1)+": "+lc(d.allyNames[z.allies[j][0]]);
			}
			if(allyDeck){
				promptText += "\n"+(z.allies.length+1)+": top Ally card";
			}
			promptNum(promptText,(a)=>1>a||a>z.allies.length+allyDeck,mainMenu,(a)=>{
				if(a === z.allies.length + 1){
					let ally = z.allyDeck.pop();
					plainAlert("ITEM_IS_REMOVED",d.allyNames[ally]);
				} else {
					let ally = z.allies.splice(a-1,1)[0][0];
					plainAlert("ITEM_IS_REMOVED",d.allyNames[ally]);
				}
				let context = getContext(me,ch);
				context--;
				if(z.allies.length === 0){
					for(let j = 0; !(j>=context); j++){
						let ally = z.allyDeck.pop();
						plainAlert("ITEM_IS_REMOVED",d.allyNames[ally]);
					}
					context = 0;
				}
				removeOption(me,ch);
				if(context > 0){
					addOption(me,ch,context);
				} else {
					boldAlert("GATHER_FRIENDS_ALERT_ROLL");
					NoSPToken("Gather Friends",1);
				}
				mainMenu();
			});
		} else if (ch === "[Reveal] Lose Title, Feat, and Mythos cards"){
			confirmify(lc("LOSE_TITLE_CONFIRM"),mainMenu,()=>{
				loseTitleFeatMythos(me);
				removeOption(me,ch);
				mainMenu();
			});
		} else if(ch === "Activate Mother Hydra") {
			confirmify(lc("MOTHER_HYDRA_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an Ally");
				let skip = context === "Interrupt";
				if(context === "Feast"){
					context = "Interrupt";
				}
				if(activateMother(context,skip)){
					doneWithMother();
				}
				mainMenu();
			});
		} else if(ch === "End Turn") {
			confirmify("Confirming that you want to end the current turn.", mainMenu, () => {
				let goodToEndTurn = true;
				for(let i = 0; !(i >= z.numPlayers); i++) {
					let j = (i + z.turn) % z.numPlayers;
					if(z.skillCardHands[j].length > 10) {
						if(z.skillCardHands[j].length === 11) {
							boldAlert("HAND_LIMIT_ALERT_1",z.players[j],getGender(j));
						} else {
							boldAlert("HAND_LIMIT_ALERT_2",[z.players[j],z.skillCardHands[j].length-10],getGender(j));
						}  
						goodToEndTurn = false;
					}
				}

				if(z.travelTrack === 4) {
					boldAlert("MUST_CHOOSE_WAYPOINT");
					goodToEndTurn = false;
				}
				if(z.spellPeeker !== -1) {
					boldAlert(z.players[z.spellPeeker] + " must finish dealing with the Spell cards in their hand.");
					goodToEndTurn = false;
				}
				if(z.dieRollQueue.length > 0 || z.lastDieRoll !== null) {
					boldAlert("MUST_FINISH_ROLLS");
					goodToEndTurn = false;
				}
				for(let j = 0; !(j>=z.defeats.length); j++){
					if(z.defeats[j].length > 0){
						boldAlert("MUST_FINISH_DEFEATS");
						goodToEndTurn = false;
						break;
					}
				}
				let mandatories = anyMandatory();
				if(mandatories.length > 0) {
					let alertText = lc("END_TURN_MANDATORY");
					for(let j = 0; !(j >= mandatories.length); j++) {
						alertText += "\n"+lc(z.players[mandatories[j][0]]) + ": " + lc(mandatories[j][1]);
					}
					alertText += "\n\n"+lc("IF_NO_MANDATORY");
					plainAlert(alertText);
					goodToEndTurn = false;
				}
				let check = [];
				let max = 126;
				if(z.fromTheAbyss){
					max = 161;
				}
				for(let j = 0; !(j>=max); j++){
					check.push(false);
				}
				for(let j = 0; !(j>=z.skillCardDecks.length); j++){
					for(let k = 0; !(k>=z.skillCardDecks[j].length); k++){
						let card = z.skillCardDecks[j][k];
						if(check[card]){
							boldAlert("Error: "+cardText(card)+" duplicate found!");
							goodToEndTurn = false;
						}
						check[card] = true;
					}
					for(let k = 0; !(k>=z.skillCardDiscards[j].length); k++){
						let card = z.skillCardDiscards[j][k];
						if(check[card]){
							boldAlert("Error: "+cardText(card)+" duplicate found!");
							goodToEndTurn = false;
						}
						check[card] = true;
					}
				}
				for(let j = 0; !(j>=z.skillCardHands.length); j++){
					for(let k = 0; !(k>=z.skillCardHands[j].length); k++){
						let card = z.skillCardHands[j][k];
						if(check[card]){
							boldAlert("Error: "+cardText(card)+" duplicate found!");
							goodToEndTurn = false;
						}
						check[card] = true;
					}
				}
				for(let j = 0; !(j>=z.chaos.length); j++){
					let card = z.chaos[j];
					if(check[card]){
						boldAlert("Error: "+cardText(card)+" duplicate found!");
						goodToEndTurn = false;
					}
					check[card] = true;
				}
				for(let j = 0; !(j>=max); j++){
					if(!check[j]){
						boldAlert("Error: "+cardText(j)+" missing!");
						goodToEndTurn = false;
					}
				}
				let endThatTurn = function() {
					
					z.turn++;
					if(z.turn === z.numPlayers) {
						z.turn = 0;
						z.round++;
						if(z.round === 2 && z.firstGame){
							for(let i = 0; !(i >= z.numPlayers); i++) {
								z.loyaltyHands[i ].push(z.loyaltyDeck.pop());
							}
							println("FIRST_GAME_LOYALTY_DEAL");
							println("LOYALTY_DECK_SIZE_AFTER_DEAL",z.loyaltyDeck.length);
						}
					}
					addAlert("NEW_TURN_ALERT",z.players[z.turn]);
					textGameState(true);
					if(z.currentMythos !== null) {
						discardMythos();
					}
					z.deckChief = true;
					z.quickDraw = true;
					z.occultTraining = true;
					z.scavenger = true;
					z.bookOfDagon = true;
					z.starbuck = true;
					z.keeperAction = true;
					z.trueGrit = true;
					z.almanac = true;
					z.plimsolls = true;
					delete z.noRansack;
					delete z.providence;
					delete z.whistle;
					delete z.maau;
					delete z.notebook;
					delete z.lostSouls;
					delete z.instillBravery;
					delete z.instillBraveryCount;
					delete z.seasoned;
					delete z.loyalAssistantUsed;
					delete z.watch;
					delete z.seaLegs;
					delete z.flareGun;
					delete z.uncannyLuckUsed;
					delete z.cursedExploit;
					delete z.spiritBoard;
					
					if(z.barricadeActive){
						delete z.barricadeActive;
						plainAlert("BARRICADE_THE_HATCHES_OFF");
					}
					
					z.activatedLocations = [];
					for(let j = 0; !(j>=z.activatedLocations.length); j++){
						z.activatedLocations[j] = false;
					}
					
					z.phase = 0;
					z.emergencyAction = false;
					z.currentMythos = null;
					z.mythosPlayer = null;
					z.finishedMythos = false;
					z.mythosOptions = blankArrays(z.numPlayers);
					z.context = blankArrays(z.numPlayers);
					z.mandatory = blankArrays(z.numPlayers);
					delete z.xo1;
					z.dieRoller = z.turn;

					for(let j = 0; !(j >= z.numPlayers); j++) {
						z.skillCardHands[j].sort(cardCompare);
						if(z.fromTheAbyss){
							z.allyUsed[j] = false;
						}
					}
					startThatTurn();
					
					
					mainMenu();
				};
				if(goodToEndTurn) {
					endThatTurn();
				} else {
					mainMenu();
				}
			});
		} else if(ch === "Check for TMR updates") {
			/* UTODO: localization */
			confirmify(
				"Confirming you want to quit TMR and apply any pending updates.\n\nYou probably don't want to do this unless you were instructed to do so.",
				mainMenu, () => {
					window.localStorage.setItem("tmrUrgent", "requested");
					saveAndQuit();
				});
		} else if(ch === "Change your default banner") {
			/* UTODO: localization */
			let chr = getCharacter(z.players[me]);
			let defaultBanner = d.banners[chr];
			if(me === z.keeper && me === z.captain) {
				defaultBanner = d.dictatorBanners[chr];
			} else if(me === z.keeper) {
				defaultBanner = d.keeperBanners[chr];
			} else if(me === z.captain) {
				defaultBanner = d.captainBanners[chr];
			} else if(z.revealedHybrids[me] === 1) {
				defaultBanner = d.hybridBanners[chr];
			}
			let changeBanner = function() {
				promptString("What imageID would you like to use for your new banner?", mainMenu, (prompted0) => {
					let prompted = parseInt(prompted0);
					if(isNaN(prompted0) || 1 > prompted0) {
						changeBanner();
					} else {
						let bannerRegExp = new RegExp("\\[ima" +  "geid=" + z.banners[me] + " medium\\]", "g");
						t.value = t.value.replace(bannerRegExp, "");
						z.banners[me] = prompted;
						mainMenu();
					}
				}, "" + defaultBanner);
			};
			changeBanner();
		} else if(ch === "Activate Deep Ones") {
			confirmify(lc("ACTIVATE_DEEP_ONES_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an Ally");
				let skip = true;
				if(context === "Feast"){
					context = "Interrupt";
					skip = false;
				}
				activateDeepOnes(skip);
				mainMenu();
			});
		} else if (ch === "Activate the Shoggoth"){
			confirmify(lc("ACTIVATE_SHOGGOTH_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an Ally");
				let skip = context === "Interrupt";
				if(context === "Feast"){
					context = "Interrupt";
				}
				if(activateShoggoth(context,skip)){
					doneWithShoggoth();
				}
				mainMenu();
			});
		} else if (ch === "Activate the Drowned Spirit"){
			confirmify(lc("ACTIVATE_DROWNED_SPIRIT_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an Ally");
				let skip = context === "Interrupt";
				if(context === "Feast"){
					context = "Interrupt";
				}
				if(activateDrownedSpirit(context,skip)){
					doneWithDrownedSpirit();
				}
				mainMenu();
			});
		} else if (ch === "Activate the Grasping Tendril"){
			confirmify(lc("ACTIVATE_GRASPING_TENDRIL_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an Ally");
				let skip = context === "Interrupt";
				if(context === "Feast"){
					context = "Interrupt";
				}
				if(activateGraspingTendril(context,skip)){
					doneWithGraspingTendril();
				}
				mainMenu();
			});
		} else if (ch === "Activate Horror Icon"){
			confirmify(lc("ACTIVATE_HORROR_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an Ally");
				let skip = context === "Interrupt";
				if(context === "Feast"){
					context = "Interrupt";
				}
				activateHorror(context,skip);
				mainMenu();
			});
		} else if(ch === "Activate Father Dagon") {
			confirmify(lc("FATHER_DAGON_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				let skip = true;
				if(Array.isArray(context) && context[0] === "Feast"){
					context = context[1];
					skip = false;
				} else if(context === "Perform Rites"){
					skip = false;
				}
				if(context === "Perform Rites Skip"){
					context = "Perform Rites";
				}
				let done = activateFather(context,skip);
				
				removeFromAll(ch);
				removeFromAll("Temporal Barrier");
				removeFromAll("Feast [Feat]");
				removeFromAll("Alarm [Feat]");
				removeFromAll("[Feast] Move a player");
				removeFromAll("[Feast] Move an ally");
				
				if(done){
					if(context === "Monster"){
						primeJumpIcon();
					} else if(context === "The Father's Favor"){
						clearSkillCheck();
					} else if(context === "Looming Danger"){
						if(activateMother("Looming Danger")){
							doneWithChoiceMythos();
						}
					} else if(context === "The Father's Favor 2"){
						activateFather("The Father's Favor");
					} else if(context === "Coordinated Assault"){
						if(activateDeepOnes()){
							clearSkillCheck();
						} else {
							z.deepOneContext = "Coordinated Assault";
						}
					} else if(z.midAction === "Perform Rites" && !hasOption(z.turn,"Activate Mother Hydra")){
						finishedAction();
					}
				}
				
				mainMenu();
			});
		} else if(ch === "[Lost Souls] Remove one of your allies from the game"){
			let context = getContext(me,ch);
			let promptText = lc("LOST_SOULS_TOO_MANY_PROMPT",z.guillaumeAllies.length);
			for(let j = 0; !(j>=z.guillaumeAllies.length); j++){
				promptText += "\r\n"+(j+1)+": "+d.allyNames[j];
			}
			promptNum(promptText,(a)=>1>a||a>z.guillaumeAllies.length,mainMenu,(a)=>{
				plainAlert("GUILLAUME_REMOVES_ALLY",d.allyNames[z.guillaumeAllies[a-1]]);
				if(z.guillaumeAllies.length === 3){
					removeOption(me,ch);
					if(context === "Cast"){
						let done = true;
						for(let j = 0; !(j>=z.playerLocations.length); j++){
							let k = (z.turn + j) % z.numPlayers;
							let locIndex = locationIndex(z.playerLocations[k]);
							if(locIndex >= DECK && INTERIOR > locIndex){
								done = defeat(k,"Cast") && done;
							}
						}
						if(done){
							doneWithRitual();
						}
					} else if(context === "To Arms!"){
						doneWithChoiceMythos();
					} else if(Array.isArray(context) && context[0] === "Jam Tin Grenade"){
						let index = locationIndex(context[1]);
						if(index >= INTERIOR && INTERIOR + 6 > index){
							if(damageLocation(d.spaceNames[index],undefined,"Jam Tin Grenade")){
								if(z.midAction === "Jam Tin Grenade"){
									finishedAction();
								}
							}
						} else {
							finishedAction();
						}
					} else if(Array.isArray(context) && context[0] === "Don the Mask"){
						finishedAction();
					}
				}
				mainMenu();
			});
		} else if(ch === "Defeat a passenger in a space") {
			let context = getContext(me, ch);
			if(Array.isArray(context) && (context[0] === "Rogue Wave" || context[0] === "Cast")){
				let confirmText = lc("PASSENGER_DEFEAT_DECK_CONFIRM");
				if(context[2]){
					confirmText = lc("PASSENGER_DEFEAT_DECK_CONFIRM_MEDICAL_INTERVENTION");
				}
				confirmify(confirmText,mainMenu,()=>{
					for(let j = WATER; !(j>=INTERIOR); j++){
						let surviving = 0;
						if(j === context[2]){
							surviving = 1;
						}
						while(z.spacePassengers[j].length > surviving && !z.gameOver){
							defeatPassenger(z.spacePassengers[j].pop());
						}
					}
					removeFromAll("Travel Pharmacy");
					removeFromAll("Defeat a passenger in a space");
					removeFromAll("Medical Intervention (passenger)");
					if(context[0] === "Cast" && !z.gameOver){
						let done = true;
						if(z.fromTheAbyss){
							for(let j = 0; !(j>=z.allies.length); j++){
								if(INTERIOR > locationIndex(z.allies[j][1])){
									if(characterPresent("Guillaume")){
										plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
										z.guillaumeAllies.push(z.allies[j][0]);
									} else {
										plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
										
									}
									z.allies.splice(j,1);
									j--;
								}
							}
							if(characterPresent("Guillaume") && z.guillaumeAllies.length > 3){
								boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
								addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game","Cast",true);
								done = false;
							}
						}
						if(done){
							for(let j = 0; !(j>=z.playerLocations.length); j++){
								let k = (z.turn + j) % z.numPlayers;
								let locIndex = locationIndex(z.playerLocations[k]);
								if(locIndex >= DECK && INTERIOR > locIndex){
									done = defeat(k,"Cast") && done;
								}
							}
						}
						if(done){
							doneWithRitual();
						}
					}
					if(context[0] === "Rogue Wave" && !z.gameOver){
						doneWithWaypoint();
					}
					mainMenu();
				});
			} else if (Array.isArray(context) && (context[0] === "Summon the Beast Within" || context[0] === "Jam Tin Grenade" || 
												  context[0] === "Rain Fire" || context[0] === "Shoggoth" || context[0] === "Don the Mask")){
				let confirmText = lc("PASSENGER_DEFEAT_SPACE_ALL_CONFIRM",d.spaceNames[context[1]]);
				if(context[2]){
					confirmText = lc("PASSENGER_DEFEAT_SPACE_ALL_CONFIRM_MEDICAL_INTERVENTION",d.spaceNames[context[1]]);
				}
				confirmify(confirmText,mainMenu,()=>{
					let surviving = 0;
					if(context[1] === context[2]){
						surviving = 1;
					}
					let index = context[1];
					while(z.spacePassengers[index].length > surviving && !z.gameOver){
						defeatPassenger(z.spacePassengers[index].pop());
					}
					removeFromAll(ch);
					removeFromAll("Travel Pharmacy");
					removeFromAll("Medical Intervention (passenger)");
					if(context[0] === "Summon the Beast Within" && !z.gameOver){
						let done = true;
						for(let j = 0; !(j>=z.playerLocations.length); j++){
							let k = (z.turn + j) % z.numPlayers;
							if(z.playerLocations[k] === d.spaceNames[index] && !z.revealedHybrids[k] ){
								done = defeat(k,"Summon the Beast Within") && done;
							}
						}
						if(done){
							if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
								finishedAction();
							}
							if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
						}
					} else if((context[0] === "Jam Tin Grenade" || context[0] === "Don the Mask") && !z.gameOver){
						let any = false;
						for(let j = 0; !any && !(j>=z.numPlayers); j++){
							for(let k = 0; !(k>=z.defeats[j].length); k++){
								if(Array.isArray(z.defeats[j][k]) && (z.defeats[j][k][0] === "Jam Tin Grenade" || z.defeats[j][k][0] === "Don the Mask")){
									any = true;
									break;
								}
							}
						}
						if(!any){
							let goodToGo = true;
							if(z.fromTheAbyss){
								for(let j = 0; !(j>=z.allies.length); j++){
									if(context[1] === z.allies[j][1]){
										if(characterPresent("Guillaume")){
											plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
											z.guillaumeAllies.push(z.allies[j][0]);
										} else {
											plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
											
										}
										z.allies.splice(j,1);
										j--;
									}
								}
								if(z.guillaumeAllies.length > 3){
									boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
									addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game",context,true);
									goodToGo = false;
								}
							}
							if(index >= INTERIOR && INTERIOR+6 > index && !isLocationDamaged(context[1]) && context[0] === "Jam Tin Grenade"){
								if(goodToGo){
									if(damageLocation(context[1],undefined,"Jam Tin Grenade")){
										finishedAction();
									}
								} else {
									plainAlert("JAM_TIN_GRENADE_DAMAGE",context[1]);
								}
							} else if(goodToGo){
								finishedAction();
							}
						}
					} else if(context[0] === "Rain Fire" && !z.gameOver){

						if(!canResolveDefeatHumanContext("Rain Fire")){
							doneWithRevealEffect(getPlayerNum("Jamie"));
						}
					} else if(context[0] === "Shoggoth" && !z.gameOver){
						doneWithHorror();
					}
					mainMenu();
				});
			} else if(Array.isArray(context) && context[0] === "Deep One"){
				confirmify(lc("PASSENGER_DEFEAT_DEEP_ONE_CONFIRM",d.spaceNames[context[1]]),mainMenu,()=>{
					removeFromAll(ch);
					removeFromAll("Medical Intervention (passenger)");
					removeFromAll("Travel Pharmacy");
					defeatPassenger(z.spacePassengers[context[1]].pop());
					if(!z.gameOver){
						resumeDeepOneActivation();
					}
					mainMenu();
				});
			} else {
				
				let doIt = (index) => {
					printlnBold("PASSENGER_TARGET_CHOICE",[z.players[me],d.spaceNames[index]]);
					let medicalIntervention = false;
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
							medicalIntervention = true;
							break;
						}
					}
					let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(d.spaceNames[index],z.playerLocations[itemHolder("Travel Pharmacy")]);
					if(Array.isArray(context) && context[0] === "Conduct Malpractice"){
						medicalIntervention = false;
					}					
					if(medicalIntervention){
						addOption(getPlayerNum("Svetlana"),"Medical Intervention (passenger)",[context[0],index,0],false);
						println("MEDICAL_INTERVENTION_PAUSE");
					}
					if(travelPharmacy){
						println("TRAVEL_PHARMACY_NOTIFICATION",z.players[itemHolder("Travel Pharmacy")]);
						addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",[context[0],index,0],false);
					}
					removeOption(me,"Defeat a Passenger in the supply");
					let killIt = ()=>{
						defeatPassenger(z.spacePassengers[index].pop());
						removeFromAll(ch);
						removeFromAll("Travel Pharmacy");
						removeFromAll("Medical Intervention (passenger)");
						if(z.midAction === "Defeat a Passenger"){
							finishedAction();
						}
						if(Array.isArray(context) && context[0] === "Rolling Seas" && !z.gameOver){
							doneWithWaypoint();
						}
						if(Array.isArray(context) && context[0] === "Conduct Malpractice" && !z.gameOver){
							doneWithRevealEffect(getPlayerNum("Svetlana"));
						}
						mainMenu();
					};
					let neverMind = ()=>{
						if(!hasOption(me,ch)){
							optionForAll(ch,context);
						}
						mainMenu();
					};
					
					if(medicalIntervention && travelPharmacy){
						confirmify(lc("PASSENGER_DEFEAT_BOTH_CONFIRM",z.players[itemHolder("Travel Pharmacy")]),neverMind,killIt);
					} else if(medicalIntervention){
						confirmify(lc("PASSENGER_DEFEAT_MEDICAL_INTERVENTION_CONFIRM"),neverMind,killIt);
					} else if(travelPharmacy){
						confirmify(lc("PASSENGER_DEFEAT_TRAVEL_PHARMACY_CONFIRM",z.players[itemHolder("Travel Pharmacy")]),neverMind,killIt);
					} else {
						killIt();
					}
				};
				if(Array.isArray(context) && context[0] === "Traitor"){
					doIt(context[1]);
				} else if(Array.isArray(context) || context === "Conduct Malpractice"){
					let targets = [];
					let promptText = "";
					for(let j = DECK; !(j>=INTERIOR); j++){
						if(z.spacePassengers[j].length > 0){
							targets.push(j);
							promptText += "\n"+targets.length+": "+lc(d.spaceNames[j]);
						}
					}
					promptText = lc("PASSENGER_DEFEAT_PROMPT",targets.length)+promptText;
					if(targets.length === 1){
						doIt(targets[0]);
					} else {
						promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,(a)=>{
							doIt(targets[a-1]);
						});
					}
				} else {
					let index = locationIndex(z.playerLocations[me]);
					let deckPassenger = z.spacePassengers[index].length > 0;
					let waterPassenger = z.spacePassengers[index-8].length > 0;
					if(deckPassenger && waterPassenger){
						promptNum(lc("PASSENGER_DEFEAT_PROMPT",2)+"\n1: "+lc(d.spaceNames[index])+"\n2: "+lc(d.spaceNames[index-8]),(a)=>1>a||a>2,mainMenu,(a)=>{
							if(a === 2){
								index -= 8;
							}
							context = ["Traitor",index,0];
							didAction();
							z.midAction = "Defeat a Passenger";
							z.actionPerformer = me;
							doIt(index);
						});
					} else {
						if(waterPassenger){
							index -= 8;
						}
						context = ["Traitor",index,0];
						didAction();
						z.midAction = "Defeat a Passenger";
						z.actionPerformer = me;
						doIt(index);
					} 
					
				}
					
			}
		} else if(ch === "Defeat a Passenger in the supply") {
			confirmify(lc("DEFEAT_PASSENGER_SUPPLY_CONFIRM"), mainMenu, () => {
				let context = getContext(me,ch);
				removeFromAll(ch);
				defeatSupplyPassenger();
				removeFromAll("Defeat a passenger in a space");
				removeFromAll("Medical Intervention (passenger)");
				if(context === "Conduct Malpractice" && !z.gameOver){
					doneWithRevealEffect(getPlayerNum("Svetlana"));
				}
				if(context === "Hypnotic Melody" && !z.gameOver){
					clearSkillCheck();
				}
				if(context === "Outbreak" && !z.gameOver){
					SPTokenBad("Outbreak");
				}
				mainMenu();
			});
		} else if(ch === "Trigger Awakening Phase") {
			confirmify(lc("AWAKENING_TRIGGER_CONFIRM"), mainMenu, () => {
				removeFromAll(ch);
				sleeper();
				mainMenu();
			});
		} else if(ch === "[Rat Infestation] Trade Sanity for Food"){
			confirmify(lc("RAT_INFESTATION_TRADE_CONFIRM"),mainMenu,()=>{
				if(decreaseSanity()){
					increaseFood();
				}
				removeOption(me,ch);
				removeOption(me,"[Rat Infestation] Decline the trade");
				clearSkillCheck();
				mainMenu();
			});
		} else if(ch === "[Rat Infestation] Decline the trade"){
			confirmify(lc("RAT_INFESTATION_PASS_CONFIRM"),mainMenu,()=>{
				boldAlert("RAT_INFESTATION_EWW");
				removeOption(me,ch);
				removeOption(me,"[Rat Infestation] Trade Sanity for Food");
				clearSkillCheck();
				mainMenu();
			});
		} else if(ch === "Choose a Waypoint") {
			let numDestinations = 2;
			println("WAYPOINT_LOOK_TEXT",[z.players[me],titleList(me)]);
			if(numDestinations > z.waypointDeck.length) {
				numDestinations = z.waypointDeck.length;
			}
			let promptText = lc("WAYPOINT_PROMPT",numDestinations);
			for(let i = 1; !(i > numDestinations); i++) {
				promptText += "\n"+(i) + ": " + lc(d.waypointNames[z.waypointDeck[z.waypointDeck.length - i]]);
			}

			promptNum(promptText, (a) => 1 > a || a > numDestinations, mainMenu, (prompted) => {
				let destination = z.waypointDeck[z.waypointDeck.length - prompted];
				z.waypointDiscards.push(z.waypointDeck.splice(z.waypointDeck.length - prompted, 1)[0]);
				addAlert("WAYPOINT_ALERT",d.waypointNames[destination]);
				removeOption(me,ch);
				if(numDestinations === 2) {
					z.waypointDeck.unshift(z.waypointDeck.pop());
					processDestination(me);
					mainMenu();
				} else if(numDestinations === 1) {
					processDestination(me);
					mainMenu();
				}
			});
		} else if(ch === "Deep One Ancestry [Feat]") {
			let inspector = (prompted2)=>{
				
				let targetName = z.players[prompted2 - 1];
				let secretText = lc("LOYALTY_SECRET",targetName);
				shuffle(z.loyaltyHands[prompted2-1]);
				for(let i = 0; !(i >= z.loyaltyHands[prompted2 - 1].length); i++) {
					secretText += "\r\n" + lc(d.loyaltyNames[z.loyaltyHands[prompted2 - 1][i ]]);
				}
				
				z.secretMessages[me] += "\n" + secretText;
				addAlert(secretText + "\n\n"+lc("ADDED_TO_SECRET_TEXT"));
				printlnBold("ANCESTRY_ALERT",targetName);
				z.feats[me].splice(z.feats[me].indexOf("Deep One Ancestry"),1);
				didAction();
				z.actionPerformer = me;
				finishedAction();
				mainMenu();
			};

			let promptText = lc("ANCESTRY_PROMPT",z.numPlayers)+"\n"+lc("FEAT_USE_WARNING");

			for(let i = 0; !(i >= z.numPlayers); i++) {
				promptText += "\n"+(i + 1) + ": ";
				if(z.revealedHybrids[i ] === 1) {
					promptText += lc("[TRAITOR]");
				}  else if(i === me) {
					promptText += "(cannot target yourself)";
				} else {
					promptText += lc(z.players[i ]) + " (" + z.loyaltyHands[i ].length + ")";
				}
			}
			promptNum(promptText, (a) => 1>a||a>z.numPlayers||a-1===me||z.revealedHybrids[a-1]===1, mainMenu,inspector);
			
		} else if (ch === "Popular Support [Feat]"){
			confirmify("POPULAR_SUPPORT_CONFIRM",mainMenu,()=>{
				boldAlert("POPULAR_SUPPORT_ALERT",z.players[me],getGender(me));
				z.feats[me].splice(z.feats[me].indexOf("Popular Support"),1);
				spawnAlly(z.playerLocations[me]);
				spawnAlly(z.playerLocations[me]);
				if(me === z.keeper && me === z.captain){
					didAction();
					z.actionPerformer = me;
					finishedAction();
					mainMenu();
				} else if(me === z.captain){
					z.keeper = me;
					boldAlert("NEW_KEEPER",z.players[z.keeper]);
					didAction();
					z.actionPerformer = me;
					finishedAction();
					mainMenu();
				} else if(me === z.keeper){
					z.captain = me;
					boldAlert("NEW_KEEPER",z.players[z.keeper]);
					didAction();
					z.actionPerformer = me;
					finishedAction();
					mainMenu();
				} else {
					confirmify("POPULAR_TAKE_TITLE",()=>{
						z.keeper = me;
						boldAlert("NEW_KEEPER",z.players[z.keeper]);
						didAction();
						z.actionPerformer = me;
						finishedAction();
						mainMenu();
					},()=>{
						z.captain = me;
						boldAlert("NEW_KEEPER",z.players[z.keeper]);
						didAction();
						z.actionPerformer = me;
						finishedAction();
						mainMenu();
					},lc("Keeper of the Tome"),lc("Captain"));
				}
			});
		} else if(ch === "Perfect Number [Feat]") {
			/* URULES: can this be modified? can this be rerolled? */
			/* UTODO: this and discarded cards */
			let promptText = lc("PERFECT_NUMBER_PROMPT");

			promptNum(promptText, (a) => 1 > a || a > 8, mainMenu, (prompted) => {
				z.feats[me].splice(z.feats[me].indexOf("Perfect Number"),1);
				addAlert("PERFECT_NUMBER_ALERT", prompted);
				z.lastDieRoll = z.dieRollQueue.shift();
				z.lastDieRollParams = z.dieRollParams.shift();
				z.lastDieRollValue = prompted;
				z.lastDieRollModifier = z.dieRollModifier;
				printlnBold("PERFECT_NUMBER_PRINT", dieRollImage());
				if(canChangeDieRoll()){
					z.perfectNumber = true;
					plainAlert("MAAU_PERFECT_NUMBER");
				} else {
					processDieRoll();
				}
				mainMenu();
			});
		} else if (ch === "Eldritch Influence"){
			let promptText = lc("ELDRTICH_INFLUENCE_PROMPT",z.skillCardHands[me].length);
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				promptText += "\n"+(j+1)+": "+cardText(z.skillCardHands[me][j]);
			}
			
			let doIt = (value)=>{
				z.lastDieRoll = z.dieRollQueue.shift();
				z.lastDieRollParams = z.dieRollParams.shift();
				z.lastDieRollValue = value;
				z.lastDieRollModifier = z.dieRollModifier;
				printlnBold("PERFECT_NUMBER_PRINT", dieRollImage());
				if(canAnyoneMaau()){
					z.perfectNumber = true;
					plainAlert("MAAU_PERFECT_NUMBER");
				} else {
					processDieRoll();
				}
				mainMenu();
			};
			
			promptNum(promptText,(a)=>1>a||a>z.skillCardHands[me].length,mainMenu,(a)=>{
				let card = z.skillCardHands[me][a-1];
				discardSkillCard(me,a-1);
				if(cardName(card) === "Ingenuity"){
					confirmify("ELDRTICH_INFLUENCE_INGENUITY",()=>{
						doIt(4);
					},()=>{
						doIt(6);
					},"6","4");
				} else {
					if(cardColorID(card) === TREACHERY){
						doIt(6);
					} else {
						doIt(4);
					}
				}
			});
		} else if(ch === "Ask for a Keen Insight") {
			let eventName = lc(z.dieRollQueue[0],z.dieRollParams[0]);
			confirmify(lc("KEEN_INSIGHT_TOKEN_CONFIRM",eventName), mainMenu, () => {
				addAlert("ASKING_FOR_KEEN_INSIGHT",eventName);
				if(characterPresent("Edmund") && z.skillCardHands[getPlayerNum("Edmund")].length > 0 && z.playerLocations[getPlayerNum("Edmund")] !== "Brig") {
					addAlert("FORTUNATE_SON_REMINDER");
				}
				if(z.pocketPistol){
					addAlert("POCKET_PISTOL_REMAINDER",z.players[z.dieRoller]);
				}
				if(eventName === "HUMAN_VS_DEEP_ONE" || eventName === "PLAYER_VS_PLAYER" || eventName === "DEEP_ONE_VS_HUMAN" ||
				   eventName === "PLAYER_VS_HORROR" || eventName === "SHOGGOTH_VS_HUMAN" || eventName === "GRASPING_TENDRIL_VS_HUMAN" ||
				   eventName === "RUFFIAN_VS_DEEP_ONE" || eventName === "RUFFIAN_VS_HORRO" || eventName === "RUFFIAN_VS_PLAYER"){
					for(let j = 0; !(j>=z.possibleColors.length); j++){
						if(z.possibleColors[j][STRENGTH]){
							addAlert("COMBAT_TRAINING_REMINDER");
							break;
						}
					}
				}
				SPToken(eventName);
				z.spToken = true;
				mainMenu();
			});
		} else if(ch === "Ask for a Determination") {
			confirmify(lc("DETERMINATION_TOKEN_CONFIRM"), mainMenu, () => {
				addAlert("ASKING_FOR_DETERMINATION");
				DEToken();
				z.deToken = true;
				mainMenu();
			});
		} else if(ch === "Increase a resource") {
			let bumpResource = function(prompted) {
				switch (prompted) {
					case 1:
						increaseFuel();
						break;
					case 2:
						increaseFood();
						break;
					case 3:
						increaseSanity();
						break;
					case 4:
						increaseSouls();
						break;
				}
				if(getContext(me,ch) === "Dark Pact"){
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
				removeOption(me, ch);
				mainMenu();
			};
			promptNum(lc("INCREASE_RESOURCE_PROMPT",[z.fuel,z.food,z.sanity,z.souls]), (a) => 1 > a || a > 4, mainMenu, bumpResource);
		} else if(ch === "Decrease a resource") {
			let bumpResource = function(prompted) {
				switch (prompted) {
					case 1:
						decreaseFuel();
						break;
					case 2:
						decreaseFood();
						break;
					case 3:
						decreaseSanity();
						break;
					case 4:
						decreaseSouls();
						break;
				}
				mainMenu();
			};
			promptNum(lc("DECREASE_RESOURCE_PROMPT",[z.fuel,z.food,z.sanity,z.souls]), (a) => 1 > a || a > 4, mainMenu, bumpResource);
		} else if(ch === "Medical Intervention (passenger)") {
			let context = getContext(me,ch);
			confirmify(lc("MEDICAL_INTERVENTION_PASSENGER_CONFIRM")+"\n"+lc("FEAT_USE_WARNING"), mainMenu, () => {
				if(context === "Hypnotic Melody"){
					z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
					boldAlert("HYPNOTIC_MELODY_MEDICAL_INTERVENTION_ANNOUNCE");
					removeOption(me,ch);
					removeFromAll("Defeat a Passenger in the supply");
					clearSkillCheck();
					mainMenu();
				} else if(context === "Outbreak"){
					z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
					boldAlert("HYPNOTIC_MELODY_MEDICAL_INTERVENTION_ANNOUNCE");
					removeOption(me,ch);
					removeFromAll("Defeat a Passenger in the supply");
					SPTokenBad("Outbreak");
					mainMenu();
				} else if (context === "Conduct Malpractice"){
					z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
					boldAlert("CONDUCT_MALPRACTICE_CANCEL");
					removeOption(me,ch);
					removeFromAll("Defeat a Passenger in the supply");
					removeFromAll("Defeat a passenger in a space");	
					removeFromAll("Travel Pharmacy");
					doneWithRevealEffect(getPlayerNum("Svetlana"));
					mainMenu();
				} else if(Array.isArray(context) && context[0] === "Deep One"){
					boldAlert("MEDICAL_INTERVENTION_PASSENGER_ALERT");
					z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
					removeFromAll("Defeat a passenger in a space");	
					removeFromAll("Travel Pharmacy");
					removeOption(me,ch);
					resumeDeepOneActivation();
					mainMenu();
				} else if(Array.isArray(context) && (context[0] === "Rolling Seas" || context[0] === "Traitor")){
					boldAlert("MEDICAL_INTERVENTION_PASSENGER_ALERT");
					z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
					removeFromAll("Defeat a passenger in a space");	
					removeFromAll("Travel Pharmacy");
					removeOption(me,ch);
					if(context[0] === "Traitor"){
						finishedAction();
					}
					if(context[0] === "Rolling Seas"){
						doneWithWaypoint();
					}
					mainMenu();
				} else if(Array.isArray(context) && (context[0] === "Cast" || context[0] === "Rogue Wave")){
					
					let targets = [];
					let promptText = "";
					for(let j = WATER; !(j>=INTERIOR); j++){
						if(z.spacePassengers[j].length > 0){
							targets.push(j);
							promptText += "\n"+targets.length+": "+lc(d.spaceNames[j]);
						}
					}
					
					let doIt = (a) => {
						let index = targets[a-1];
						boldAlert("MEDICAL_INTERVENTION_PASSENGER_IN_SECTOR",d.spaceNames[index]);
						
						z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
						removeOption(me,ch);
						context[2] = index;
						let travelPharmacy = false;
						for(let j = WATER; !(j>=INTERIOR); j++){
							if(z.spacePassengers[j].length > 0){
								if(z.spacePassengers[j].length === 1 && j === index){
									continue;
								}
								if(itemPresent("Travel Pharmacy") && isInOrAdjacent(d.spaceNames[j],z.playerLocations[itemHolder("Travel Pharmacy")])){
									travelPharmacy = true;
									break;
								}
							}
						}
						if(travelPharmacy){
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",context,false);
							optionForAll("Defeat a passenger in a space",context,true);
						} else {
							for(let j = WATER; !(j>=INTERIOR); j++){
								let surviving = 0;
								if(j === index){
									surviving = 1;
								}
								while(z.spacePassengers[j].length > surviving && !z.gameOver){
									defeatPassenger(z.spacePassengers[j].pop());
								}
							}
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							if(context[0] === "Cast" && !z.gameOver){
								let done = true;
								
								if(z.fromTheAbyss){
									for(let j = 0; !(j>=z.allies.length); j++){
										if(INTERIOR > locationIndex(z.allies[j][1])){
											if(characterPresent("Guillaume")){
												plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
												z.guillaumeAllies.push(z.allies[j][0]);
											} else {
												plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
												
											}
											z.allies.splice(j,1);
											j--;
										}
									}
									if(characterPresent("Guillaume") && z.guillaumeAllies.length > 3){
										boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
										addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game","Cast",true);
										done = false;
									}
								}
								
								if(done){
									for(let j = 0; !(j>=z.playerLocations.length); j++){
										let k = (z.turn + j) % z.numPlayers;
										let locIndex = locationIndex(z.playerLocations[k]);
										if(locIndex >= DECK && INTERIOR > locIndex){
											done = defeat(k,"Cast") && done;
										}
									}
								}
								if(done){
									doneWithRitual();
								}
							}
							if(context[0] === "Rogue Wave" && !z.gameOver){
								doneWithWaypoint();
							}

						}
							
						mainMenu();						
					};
					
					if(targets.length === 1){
						doIt(1);
					} else {
						promptText = lc("MEDICAL_INTERVENTION_PASSENGER_PROMPT",targets.length)+promptText;
						promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,doIt);
					}
				} else if(Array.isArray(context) && (context[0] === "Travel")){
					
					let targets = [];
					let promptText = "";
					for(let j = WATER+6; !(j>=DECK); j++){
						if(z.spacePassengers[j].length > 0){
							targets.push(j);
							promptText += "\n"+targets.length+": "+lc(d.spaceNames[j]);
						}
					}
					
					let doIt = (a) => {
						let index = targets[a-1];
						boldAlert("MEDICAL_INTERVENTION_PASSENGER_IN_SECTOR",d.spaceNames[index]);
						
						z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
						removeOption(me,ch);
						context[2] = index;
						let travelPharmacy = false;
						for(let j = WATER+6; !(j>=DECK); j++){
							if(z.spacePassengers[j].length > 0){
								if(z.spacePassengers[j].length === 1 && j === index){
									continue;
								}
								if(itemPresent("Travel Pharmacy") && isInOrAdjacent(d.spaceNames[j],z.playerLocations[itemHolder("Travel Pharmacy")])){
									travelPharmacy = true;
									break;
								}
							}
						}
						if(travelPharmacy){
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",context,false);
							optionForAll("Defeat a passenger in a space",context,true);
						} else {
							for(let j = WATER+6; !(j>=DECK); j++){
								let surviving = 0;
								if(j === index){
									surviving = 1;
								}
								while(z.spacePassengers[j].length > surviving && !z.gameOver){
									defeatPassenger(z.spacePassengers[j].pop());
								}
							}
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							if(!z.gameOver){
								if(z.travelTrack === 4){
									t.value += "[ima" +"geid=6414574 medium]\r\n\r\n";
									boldAlert("TRAVEL_ALERT");
									if(z.distance >= 12) {
										boldAlert("REACHED_BOSTON");
										endGame(true);
									} else {	
										boldAlert("TRAVEL_CHOICE_ALERT",z.players[z.captain]);
										addOption(z.captain,"Choose a Waypoint",undefined,true);
									}
								} else {
									doneWithSleeper();
								}
							}

						}
							
						mainMenu();						
					};
					
					if(targets.length === 1){
						doIt(1);
					} else {
						promptText = lc("MEDICAL_INTERVENTION_PASSENGER_PROMPT",targets.length)+promptText;
						promptNum(promptText,(a)=>1>a||a>targets.length,mainMenu,doIt);
					}
				} else if (Array.isArray(context) && (context[0] === "Jam Tin Grenade" || context[0] === "Summon the Beast Within" || context[0] === "Rain Fire" || context[0] === "Shoggoth") ){
					confirmify(lc("MEDICAL_INTERVENTION_PASSENGER_CONFIRM"),mainMenu,()=>{
						let index = context[1];
						boldAlert("MEDICAL_INTERVENTION_PASSENGER_IN_SECTOR",d.spaceNames[index]);
						
						z.feats[me].splice(z.feats[me].indexOf("Medical Intervention"),1);
						removeOption(me,ch);
						context[2] = index;
						let travelPharmacy = itemPresent("Travel Pharmacy") && isInOrAdjacent(d.spaceNames[index],z.playerLocations[itemHolder("Travel Pharmacy")]) && 
												z.spacePassengers[index].length > 1;
						
						if(travelPharmacy){
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							addOption(itemHolder("Travel Pharmacy"),"Travel Pharmacy",context,false);
							optionForAll("Defeat a passenger in a space",context,true);
						} else {
							while(z.spacePassengers[index].length > 1 && !z.gameOver){
								defeatPassenger(z.spacePassengers[index].pop());
							}
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							if(context[0] === "Summon the Beast Within" && !z.gameOver){
								let done = true;
								for(let j = 0; !(j>=z.playerLocations.length); j++){
									let k = (z.turn + j) % z.numPlayers;
									if(z.playerLocations[k] === d.spaceNames[index] && !z.revealedHybrids[k] ){
										done = defeat(k,"Summon the Beast Within") && done;
									}
								}
								if(done){
									if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
										finishedAction();
									}
									if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
								}
							} else if(context[0] === "Jam Tin Grenade" && !z.gameOver){
								let any = false;
								for(let j = 0; !any && !(j>=z.numPlayers); j++){
									for(let k = 0; !(k>=z.defeats[j].length); k++){
										if(Array.isArray(z.defeats[j][k]) && z.defeats[j][k][0] === "Jam Tin Grenade"){
											any = true;
											break;
										}
									}
								}
								if(!any){
									let goodToGo = true;
									if(z.fromTheAbyss){
										for(let j = 0; !(j>=z.allies.length); j++){
											if(context[1] === z.allies[j][1]){
												if(characterPresent("Guillaume")){
													plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
													z.guillaumeAllies.push(z.allies[j][0]);
												} else {
													plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
													
												}
												z.allies.splice(j,1);
												j--;
											}
										}
										if(z.guillaumeAllies.length > 3){
											boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
											addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game",context,true);
											goodToGo = false;
										}
									}
									if(index >= INTERIOR && INTERIOR+6 > index && !isLocationDamaged(context[1]) && context[0] === "Jam Tin Grenade"){
										if(goodToGo){
											if(damageLocation(context[1],undefined,"Jam Tin Grenade")){
												finishedAction();
											}
										} else {
											plainAlert("JAM_TIN_GRENADE_DAMAGE",context[1]);
										}
									} else if(goodToGo){
										finishedAction();
									}
								}
							} else if(context[0] === "Rain Fire" && !z.gameOver){
								if(!canResolveDefeatHumanContext("Rain Fire")){
									doneWithRevealEffect(getPlayerNum("Jamie"));
								}
							} else if(context[0] === "Shoggoth" && !z.gameOver){
								doneWithHorror();
							}
						}
							
						mainMenu();	
					});	
				}
			});
		} else if(ch === "Travel Pharmacy") { 
			promptNum(lc("TRAVEL_PHARMACY_PROMPT"),(a)=>1>a||a>2,mainMenu,(a)=>{
				
				let context = getContext(me,ch);
				
				let doReshuffle = (index) => {
					z.passengerSupply.push(z.spacePassengers[index].pop());
					shuffle(z.passengerSupply);
					if(z.fromTheAbyss){
						spawnAlly(z.playerLocations[me]);
					}
					if(a === 1){
						boldAlert("TRAVEL_PHARMACY_FOOD",[z.players[me],d.spaceNames[index]]);
						decreaseFood();
						if(z.gameOver){
							mainMenu();
							return;
						}
					} else {
						boldAlert("TRAVEL_PHARMACY_REMOVE",[z.players[me],d.spaceNames[index]]);
						for(let j = 0; !(j>=z.items[me].length); j++){
							if(d.itemNames[z.items[me][j]] === "Travel Pharmacy"){
								z.items[me].splice(j,1);
								break;
							}
						}
						removeFromAll("Travel Pharmacy");
					}

					if(Array.isArray(context) && context[0] === "Deep One"){
						removeOption(me,ch);
						removeFromAll("Defeat a passenger in a space");
						removeFromAll("Medical Intervention (passenger)");
						resumeDeepOneActivation();
					} else if(Array.isArray(context) && (context[0] === "Traitor" || context[0] === "Rolling Seas" || context[0] === "Conduct Malpractice")){
						removeOption(me,ch);
						removeFromAll("Defeat a passenger in a space");
						removeFromAll("Medical Intervention (passenger)");
						if(context[0] === "Traitor"){
							finishedAction();
						}
						if(context[0] === "Rolling Seas"){
							doneWithWaypoint();
						}
						if(context[0] === "Conduct Malpractice"){
							doneWithRevealEffect(getPlayerNum("Svetlana"));
						}
					} else if (Array.isArray(context) && (context[0] === "Travel")){
						let medicalIntervention = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
								medicalIntervention = true;
							}
						}
								
						let targets = numSpacePassengers();
						if(z.spacePassengers[context[2]].length > 0){
							targets--;
						}
						let travelPharmacy = false;
						if(a === 1){
							for(let j = WATER+6; !(j>=DECK); j++){
								if(z.spacePassengers[j].length > 0){
									if(z.spacePassengers[j].length === 1 && j === context[2]){
										continue;
									}
									if(itemPresent("Travel Pharmacy") && isInOrAdjacent(d.spaceNames[j],z.playerLocations[itemHolder("Travel Pharmacy")])){
										travelPharmacy = true;
										break;
									}
								}
							}
						}

						if((!medicalIntervention && !travelPharmacy) || targets === 0){
							for(let j = WATER+6; !(j>=DECK); j++){
								let surviving = 0;
								if(j === context[2]){
									surviving = 1;
								}
								while(z.spacePassengers[j].length > surviving && !z.gameOver){
									defeatPassenger(z.spacePassengers[j].pop());
								}
							}
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							removeFromAll("Medical Intervention (passenger)");
							if(!z.gameOver){
							    if(z.travelTrack === 4){
									t.value += "[ima" +"geid=6414574 medium]\r\n\r\n";
									boldAlert("TRAVEL_ALERT");
									if(z.distance >= 12) {
										boldAlert("REACHED_BOSTON");
										endGame(true);
									} else {	
										boldAlert("TRAVEL_CHOICE_ALERT",z.players[z.captain]);
										addOption(z.captain,"Choose a Waypoint",undefined,true);
									}
								} else {
									doneWithSleeper();
								}
							}
						}
					} else if(Array.isArray(context) && (context[0] === "Cast" || context[0] === "Rogue Wave")) {
						let medicalIntervention = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
								medicalIntervention = true;
							}
						}
								
						let targets = numSpacePassengers();
						if(z.spacePassengers[context[2]].length > 0){
							targets--;
						}
						let travelPharmacy = false;
						if(a === 1){
							let start = WATER;
							if(context[0] === "Rogue Wave"){
								start = DECK;
							}
							for(let j = start; !(j>=INTERIOR); j++){
								if(z.spacePassengers[j].length > 0){
									if(z.spacePassengers[j].length === 1 && j === context[2]){
										continue;
									}
									if(itemPresent("Travel Pharmacy") && isInOrAdjacent(d.spaceNames[j],z.playerLocations[itemHolder("Travel Pharmacy")])){
										travelPharmacy = true;
										break;
									}
								}
							}
						}

						if((!medicalIntervention && !travelPharmacy) || targets === 0){
							let start = WATER;
							if(context[0] === "Rogue Wave"){
								start = DECK;
							}
							for(let j = start; !(j>=INTERIOR); j++){
								let surviving = 0;
								if(j === context[2]){
									surviving = 1;
								}
								while(z.spacePassengers[j].length > surviving && !z.gameOver){
									defeatPassenger(z.spacePassengers[j].pop());
								}
							}
							removeFromAll("Travel Pharmacy");
							removeFromAll("Defeat a passenger in a space");
							removeFromAll("Medical Intervention (passenger)");
							if(context[0] === "Cast" && !z.gameOver){
								let done = true;
								
								if(z.fromTheAbyss){
									for(let j = 0; !(j>=z.allies.length); j++){
										if(INTERIOR > locationIndex(z.allies[j][1])){
											if(characterPresent("Guillaume")){
												plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
												z.guillaumeAllies.push(z.allies[j][0]);
											} else {
												plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
												
											}
											z.allies.splice(j,1);
											j--;
										}
									}
									if(characterPresent("Guillaume") && z.guillaumeAllies.length > 3){
										boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
										addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game","Cast",true);
										done = false;
									}
								}
								if(done){
									for(let j = 0; !(j>=z.playerLocations.length); j++){
										let k = (z.turn + j) % z.numPlayers;
										let locIndex = locationIndex(z.playerLocations[k]);
										if(locIndex >= DECK && INTERIOR > locIndex){
											done = defeat(k,"Cast") && done;
										}
									}
								}
								if(done){
									doneWithRitual();
								}
							}
						}							
													
					} else if(Array.isArray(context) && (context[0] === "Jam Tin Grenade" || context[0] === "Summon the Beast Within" || context[0] === "Rain Fire" || context == "Shoggoth")) {
						let medicalIntervention = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(z.feats[j].includes("Medical Intervention") && z.playerLocations[j] !== "Brig"){
								medicalIntervention = true;
							}
						}
						let travelPharmacy = (a === 1);
						
						let targets = z.spacePassengers[index].length;
						if(index === context[2]){
							targets--;
						}
						
						if((!medicalIntervention && !travelPharmacy) || targets === 0){
							let surviving = z.spacePassengers[index].length - targets;
							while(z.spacePassengers[index].length > surviving && !z.gameOver){
								defeatPassenger(z.spacePassengers[index].pop());
							}
							removeFromAll(ch);
							removeFromAll("Defeat a passenger in a space");
							removeFromAll("Medical Intervention (passenger)");
							if(context[0] === "Summon the Beast Within" && !z.gameOver){
								let done = true;
								for(let j = 0; !(j>=z.playerLocations.length); j++){
									let k = (z.turn + j) % z.numPlayers;
									if(z.playerLocations[k] === d.spaceNames[index] && !z.revealedHybrids[k] ){
										done = defeat(k,"Summon the Beast Within") && done;
									}
								}
								if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
									finishedAction();
								}
								if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
							} else if(context[0] === "Jam Tin Grenade" && !z.gameOver){
								let any = false;
								for(let j = 0; !any && !(j>=z.numPlayers); j++){
									for(let k = 0; !(k>=z.defeats[j].length); k++){
										if(Array.isArray(z.defeats[j][k]) && z.defeats[j][k][0] === "Jam Tin Grenade"){
											any = true;
											break;
										}
									}
								}
								if(!any){
									let goodToGo = true;
									if(z.fromTheAbyss){
										for(let j = 0; !(j>=z.allies.length); j++){
											if(context[1] === z.allies[j][1]){
												if(characterPresent("Guillaume")){
													plainAlert("GUILLAUME_RESCUES_ALLY",d.allyNames[z.allies[j][0]]);
													z.guillaumeAllies.push(z.allies[j][0]);
												} else {
													plainAlert("PLAYER_DEFEATED",d.allyNames[z.allies[j][0]]);
													
												}
												z.allies.splice(j,1);
												j--;
											}
										}
										if(z.guillaumeAllies.length > 3){
											boldAlert("GUILLAUME_TOO_MANY",z.guillaumeAllies.length-3);
											addOption(getPlayerNum("Guillaume"),"[Lost Souls] Remove one of your allies from the game",context,true);
											goodToGo = false;
										}
									}
									if(index >= INTERIOR && INTERIOR+6 > index && !isLocationDamaged(context[1]) && context[0] === "Jam Tin Grenade"){
										if(goodToGo){
											if(damageLocation(context[1],undefined,"Jam Tin Grenade")){
												finishedAction();
											}
										} else {
											plainAlert("JAM_TIN_GRENADE_DAMAGE",context[1]);
										}
									} else if(goodToGo){
										finishedAction();
									}
								}
							} else if(context[0] === "Rain Fire" && !z.gameOver){
								if(!canResolveDefeatHumanContext("Rain Fire")){
									doneWithRevealEffect(getPlayerNum("Jamie"));
								}
							} else if(context[0] === "Shoggoth" && !z.gameOver){
								doneWithHorror();
							} else if(context[0] === "Travel" && !z.gameOver){
							    if(z.travelTrack === 4){
									t.value += "[ima" +"geid=6414574 medium]\r\n\r\n";
									boldAlert("TRAVEL_ALERT");
									if(z.distance >= 12) {
										boldAlert("REACHED_BOSTON");
										endGame(true);
									} else {	
										boldAlert("TRAVEL_CHOICE_ALERT",z.players[z.captain]);
										addOption(z.captain,"Choose a Waypoint",undefined,true);
									}
								} else {
									doneWithSleeper();
								}
							}
						}
					}
					mainMenu();
				};
				
				if(Array.isArray(context) && (context[0] === "Deep One" || context[0] === "Traitor" || context[0] === "Rolling Seas" || context[0] === "Conduct Malpractice" ||
											  context[0] === "Summon the Beast Within" || context[0] === "Jam Tin Grenade" || context[0] === "Rain Fire" || context[0] === "Shoggoth")){
					doReshuffle(context[1]);
				} else if(Array.isArray(context) && (context[0] === "Rogue Wave" || context[0] === "Cast")){
					let targets = [];
					let promptText = "";
					let start = WATER;
					if(context[0] === "Rogue Wave"){
						start = DECK;
					}
					for(let j = start; !(j>=z.spacePassengers.length); j++){
						if(isInOrAdjacent(z.playerLocations[me],d.spaceNames[j]) && (z.spacePassengers[j].length > 1 || (context[2] !== j && z.spacePassengers[j].length > 0))){
							targets.push(j);
							promptText += "\n"+targets.length + ": "+lc(d.spaceNames[j]);
						}
					}
					if(targets.length === 1){
						doReshuffle(targets[0]);
					} else {
						promptText = lc("TRAVEL_PHARMACY_PASSENGER_PROMPT",targets.length)+promptText;
						promptNum(promptText,(b)=>1>b||b>targets.length,mainMenu,(b)=>{
							doReshuffle(targets[b-1]);
						});
					}
				} else if(Array.isArray(context) && (context[0] === "Travel")){
					let targets = [];
					let promptText = "";
					for(let j = WATER+6; !(j>=DECK); j++){
						if(isInOrAdjacent(z.playerLocations[me],d.spaceNames[j]) && (z.spacePassengers[j].length > 1 || (context[2] !== j && z.spacePassengers[j].length > 0))){
							targets.push(j);
							promptText += "\n"+targets.length + ": "+lc(d.spaceNames[j]);
						}
					}
					if(targets.length === 1){
						doReshuffle(targets[0]);
					} else {
						promptText = lc("TRAVEL_PHARMACY_PASSENGER_PROMPT",targets.length)+promptText;
						promptNum(promptText,(b)=>1>b||b>targets.length,mainMenu,(b)=>{
							doReshuffle(targets[b-1]);
						});
					}
				}
			});
		} else if (ch === "Play a Combat Training"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				if(cardName(z.skillCardHands[me][j]) === "Combat Training"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+cardText(z.skillCardHands[me][j]);
				}
			}
			promptText = lc("COMBAT_TRAINING_PROMPT",choices.length)+promptText;
			promptNum(promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				playSkillCard(me,choices[a-1],true);
				z.dieRollQueue.unshift(z.lastDieRoll);
				z.dieRollParams.unshift(z.lastDieRollParams);
				z.dieRollModifier = z.lastDieRollModifier;
				z.lastDieRoll = null;
				z.lastDieRollParams = null;
				z.lastDieRollValue = null;
				z.lastDieRollModifier = null;
				addAlert("COMBAT_TRAINING_ALERT");
				mainMenu();
			});
			
		} else if(ch === "Fortunate Son") {
			let promptText = lc("FORTUNATE_SON_PROMPT",z.skillCardHands[me].length);
			for(let j = 0; !(j>=z.skillCardHands[me].length); j++){
				promptText += "\n"+(j+1)+": "+cardText(z.skillCardHands[me][j]);
			}
			promptNum(promptText,(a)=>1>a||a>z.skillCardHands[me].length,mainMenu,(a)=>{
				printlnBold("FORTUNATE_SON_PRINT");
				discardSkillCard(me,a-1);
				z.dieRollQueue.unshift(z.lastDieRoll);
				z.dieRollParams.unshift(z.lastDieRollParams);
				z.dieRollModifier = z.lastDieRollModifier;
				z.lastDieRoll = null;
				z.lastDieRollParams = null;
				z.lastDieRollValue = null;
				z.lastDieRollModifier = null;
				addAlert("FORTUNATE_SON_ALERT");
				mainMenu();
			});
		} else if(ch === "[Pocket Pistol] Reroll the die") {
			let confirmText = lc("POCKET_PISTOL_REROLL_CONFIRM");
			confirmify(confirmText, mainMenu, () => {
				printlnBold("POCKET_PISTOL_REROLL_PRINT",z.players[me]);
				z.dieRollQueue.unshift(z.lastDieRoll);
				z.dieRollParams.unshift(z.lastDieRollParams);
				z.dieRollModifier = z.lastDieRollModifier;
				z.lastDieRoll = null;
				z.lastDieRollParams = null;
				z.lastDieRollValue = null;
				z.lastDieRollModifier = null;
				delete z.pocketPistol;
				addAlert("DIE_REROLL_ALERT");
				mainMenu();
			});
		} else if(ch === "[Uncanny Luck] Reroll the die") {
			let confirmText = lc("UNCANNY_LUCK_REROLL_CONFIRM");
			confirmify(confirmText, mainMenu, () => {
				printlnBold("UNCANNY_LUCK_REROLL_PRINT",z.players[me]);
				z.dieRollQueue.unshift(z.lastDieRoll);
				z.dieRollParams.unshift(z.lastDieRollParams);
				z.dieRollModifier = z.lastDieRollModifier;
				z.lastDieRoll = null;
				z.lastDieRollParams = null;
				z.lastDieRollValue = null;
				z.lastDieRollModifier = null;
				z.uncannyLuckUsed = true;
				z.uncannyLuckNow = true;
				addAlert("DIE_REROLL_ALERT");
				mainMenu();
			});
		} else if (ch === "[Demand Change] Move a player to the Captain's Cabin"){
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j>=z.numPlayers); j++){
				if(!z.revealedHybrids[j] && z.playerLocations[j] === "Brig"){
					choices.push(j);
					promptText += "\n"+choices.length+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("DEMAND_CHANGE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				movePlayer(choices[a-1],"Captain's Cabin");
				removeOption(me,ch);
				doneWithChoiceMythos();
				mainMenu();
			});
		} else if(ch === "Move a player to the Brig") {
			let context = getContext(me,ch);
			let illegal = (a)=>{
				if(z.playerLocations[a] === "Brig"){
					return true;
				}
				if((context === "Accusation" || context === "Demand Change") && z.revealedHybrids[a]){
					return true;
				}
				if(context === "History Repeats" && z.players[a] === "Keilani"){
					return true;
				}
				if(context === undefined && (!z.revealedHybrids[a] || z.defeats[a].length === 0)){
					return true;
				}
				return false;
			};
			let promptText = lc("BRIG_PROMPT",z.numPlayers);
			for(let i = 0; !(i >= z.numPlayers); i++) {
				promptText += "\n"+(i + 1) + ": ";
				if(illegal(i)) {
					promptText += "[invalid target]";
				} else {
					promptText += z.players[i ];
				}
			}
			promptNum(promptText, (a) => 1 > a || a > z.numPlayers || illegal(a-1) , mainMenu, (prompted) => {
					movePlayer(prompted - 1, "Brig");
					if(context === undefined){
						while(z.defeats[prompted-1].length > 0){
							resolveDefeatContext(prompted-1);
						}
					}
					if(context === "Accusation" || context === "Demand Change"){
						doneWithChoiceMythos();
					}
					if(context === "History Repeats"){
						removeOption(me,"Clear skill check");
						clearSkillCheck();
					}
					removeOption(me, ch);
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(hasOption(j,"Attack an enemy") || hasOption(j,"[Six-Shooter] Attack an enemy") || 
							hasOption(j,"[Shotgun] Attack an enemy") || hasOption(j,"[Pocket Pistol] Attack an enemy") || hasOption(j,"[Baseball Bat] Attack an enemy")){
						
							if(!enemiesInMySpace(j)){
								removeOption(j,"Attack an enemy");
								removeOption(j,"[Six-Shooter] Attack an enemy");
								removeOption(j,"[Shotgun] Attack an enemy");
								removeOption(j,"[Pocket Pistol] Attack an enemy");
								removeOption(j,"[Baseball Bat] Attack an enemy");
							}
						}
						if(hasOption(j,"[Repeating Rifle] Attack an enemy") && !enemyInAdjacentSpace(j)){
							removeOption(j,"[Repeating Rifle] Attack an enemy");
						}				
					}
					mainMenu();
				});
		} else if(ch === "[Coordinated Effort] Target a character") {
			let promptText = lc("COORDINATED_EFFORT_PROMPT",z.numPlayers);
			for(let j = 0; !(j >= z.numPlayers); j++) {
				promptText += "\n" + (j + 1) + ": ";
				if(j === me) {
					promptText += lc("(cannot target yourself)");
				} else {
					promptText += lc(z.players[j]);
				}
			}
			promptNum(promptText, (a) => 1 > a || a > z.numPlayers || a - 1 === me, mainMenu, (prompted) => {
				removeOption(me, ch);
				boldAlert("COORDINATED_EFFORT_TARGETED_ALERT",[z.players[me],z.players[prompted - 1]]);
				plainAlert("COORDINATED_EFFORT_ACTION_ALERT",z.players[prompted - 1]);
				z.xo1 = prompted - 1;
				season(me,INFLUENCE);
				mainMenu();
			});
		} else if(ch === "Loyal Assistant") {
			let choices = [];
			let promptText = "";
			for(let j = 0; !(j >= z.numPlayers); j++) {
				if(z.playerLocations[me] === z.playerLocations[j] && !z.revealedHybrids[j] && j !== me){
					choices.push(j);
					promptText += "\n"+(choices.length)+": "+lc(z.players[j]);
				}
			}
			promptNum(lc("LOYAL_ASSISTANT_PROMPT",choices.length)+promptText, (a) => 1 > a || a > choices.length, mainMenu, (a) => {
				boldAlert("LOYAL_ASSISTANT_ALERT",z.players[choices[a-1]]);
				z.loyalAssistant = choices[a-1];
				z.xoStack.push("Loyal Assistant");
				z.xoPerformers.push(me);
				z.loyalAssistantUsed = true;
				mainMenu();
			});
		} else if (ch === "[Seasoned] Draw 2 Skill Cards"){
			let context = getContext(me,ch);
			let promptText = lc("SEASONED_PROMPT",context.length);
			for(let j = 0; !(j>=context.length); j++){
				promptText += "\n"+(j+1)+": "+colorIDAlert(context[j]);
			}
			
			let doIt = (a)=>{
				printlnBold("SEASONED_USE_ALERT",colorIDAlert(a));
				let card1 = dealSkillCard(me,a);
				let card2 = dealSkillCard(me,a);
				addAlert("SEASONED_DRAW",[cardText(card1),cardText(card2)]);
				z.seasoned = true;
				removeOption(me,ch);
				mainMenu();
			};
			
			if(context.length === 1){
				confirmify(lc("SEASONED_CONFIRM",colorIDAlert(context[0])),mainMenu,()=>{
					doIt(context[0]);
				});
			} else {
				promptNum(promptText,(a)=>1>a||a>context.length,mainMenu,(a)=>{
					doIt(context[a-1]);
				});
			}
		} else if(ch === "Play a Determination") {
			/* TODO: return DEs to hand */
			let mfs = [];
			let promptText = "";
			for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
				if(cardName(z.skillCardHands[me][j]) === "Determination") {
					mfs.push(j);
					promptText += "\n" + mfs.length + ": " + cardText(z.skillCardHands[me][j]);
				}
			}
			promptText = lc("DETERMINATION_PROMPT",mfs.length) + promptText;
			
			let promptWay = (prompted)=>{
				promptNum(lc("DETERMINATION_UP_DOWN_PROMPT"),(a)=>1>a||a>2,mainMenu,(a)=>{
					let card = z.skillCardHands[me][mfs[prompted - 1]];
					playSkillCard(me, mfs[prompted - 1], false);
					if(a === 1){
						if(z.determination){
							z.determination += 2;
						} else {
							z.determination = 2;
						}
						z.des[me].push([card,2]);
						boldAlert("DETERMINATION_UP_ALERT",[z.players[me],cardText(card)]);
					} else {
						if(z.determination){
							z.determination -= 2;
						} else {
							z.determination = -2;
						}
						z.des[me].push([card,-2]);
						boldAlert("DETERMINATION_DOWN_ALERT",[z.players[me],cardText(card)]);
					}
					DEToken();
					mainMenu();
				});
			};
			
			
			if(mfs.length === 1){
				promptWay(1);
			} else {
				promptNum(promptText, (a) => 1 > a || a > mfs.length, mainMenu, promptWay);
			}
		
		} else if(ch === "Play a Keen Insight") {
			let mfs = [];
			let promptText = "";
			for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
				if(cardName(z.skillCardHands[me][j]) === "Keen Insight") {
					mfs.push(j);
					promptText += "\n" + mfs.length + ": " + cardText(z.skillCardHands[me][j]);
				}
			}
			promptText = lc("KEEN_INSIGHT_PROMPT",mfs.length) + promptText;
			let promptWay = (prompted)=>{
				promptNum(lc("KEEN_INSIGHT_WAY_PROMPT"),(a)=>1>a||a>2,mainMenu,(a)=>{
					let card = z.skillCardHands[me][mfs[prompted - 1]];
					playSkillCard(me, mfs[prompted - 1], false);
					if(a === 1){
						z.dieRollModifier += 2;
						z.sps[me].push([card,2]);
						boldAlert("KEEN_INSIGHT_UP_ALERT",[z.players[me],cardText(card)]);
					} else {
						z.dieRollModifier -= 2;
						z.sps[me].push([card,-2]);
						boldAlert("KEEN_INSIGHT_DOWN_ALERT",[z.players[me],cardText(card)]);
					}
					SPToken(lc(z.dieRollQueue[0],z.dieRollParams[0]));
					z.spToken = true;
					mainMenu();
				});
			};
			if(mfs.length === 1){
				promptWay(1);
			} else {
				promptNum(promptText, (a) => 1 > a || a > mfs.length, mainMenu, promptWay);
			}
		} else if (ch === "[Reinforcements] Move Deep monsters to a water space"){
			promptNum(lc("REINFORCEMENTS_PROMPT"),(a)=>1>a||a>8,mainMenu,(a)=>{
				if(z.mother === DEEP){
					z.mother = WATER-1+a;
				}
				if(z.father === DEEP){
					z.father = WATER-1+a;
				}
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] === DEEP){
						z.deepOnes[j] = WATER-1+a;
					}
				}
				boldAlert("REINFORCEMENTS_ALERT_3",[z.players[me],a]);
				removeOption(me,ch);
				finishedAction();
				mainMenu();
			});
		} else if (ch === "[Companion] Scout the ally deck"){
			let promptText = lc("COMPANION_PROMPT");
			promptText += "\n1: "+d.allyNames[z.allyDeck[z.allyDeck.length-1]];
			promptText += "\n2: "+d.allyNames[z.allyDeck[z.allyDeck.length-2]];
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
				let ally = z.allyDeck.pop();
				if(a === 1){
					z.allyDeck.unshift(z.allyDeck.pop());
					z.allyDeck.push(ally);
				} else {
					z.allyDeck.unshift(ally);
				}
				spawnAlly(z.playerLocations[me]);
				removeOption(me,ch);
				finishedAction();
				notebookCheck(z.notebookCard,me);
				mainMenu();
			});
		} else if (ch === "[Instill Bravery] Scout the Ally deck"){
			let num = 3;
			let promptText = "\n1: "+d.allyNames[z.allyDeck[z.allyDeck.length-1]];
			promptText += "\n2: "+d.allyNames[z.allyDeck[z.allyDeck.length-2]];
			promptText += "\n3: "+d.allyNames[z.allyDeck[z.allyDeck.length-3]];
			if(z.allyDeck.length >= 4){
				num++;
				promptText += "\n3: "+d.allyNames[z.allyDeck[z.allyDeck.length-4]];
			}
			promptNum(lc("INSTILL_BRAVERY_PROMPT",num)+promptText,(a)=>1>a||a>num,mainMenu,(a)=>{
				let promptText = "";
				for(let j = 1; !(j>4) && !(j>z.allyDeck.length); j++){
					promptText += "\n"+j+": ";
					if(j !== a){
						promptText += d.allyNames[z.allyDeck[z.allyDeck.length-j]];
					} else {
						promptText += lc("(already chosen)");
					}
				}
				promptNum(lc("INSTILL_BRAVERY_PROMPT_2",num)+promptText,(b)=>1>b||b>num||a===b,mainMenu,(b)=>{
					let spareAlly1 = -1;
					let spareAlly2 = -1;
					if(a === 1 || b === 1){
						spawnAlly(z.playerLocations[me]);
					} else {
						spareAlly1 = z.allyDeck.pop();
					}
					if(a === 2 || b === 2){
						spawnAlly(z.playerLocations[me]);
					} else if(spareAlly1 === -1){
						spareAlly1 = z.allyDeck.pop();
					} else {
						spareAlly2 = z.allyDeck.pop();
					}
					if(a === 3 || b === 3){
						spawnAlly(z.playerLocations[me]);
					} else if(spareAlly1 === -1){
						spareAlly1 = z.allyDeck.pop();
					} else {
						spareAlly2 = z.allyDeck.pop();
					}
					if(a === 4 || b === 4){
						spawnAlly(z.playerLocations[me]);
					}
					if(spareAlly1 !== -1){
						z.allyDeck.push(spareAlly1);
					}
					if(spareAlly2 !== -1){
						z.allyDeck.push(spareAlly2);
					}
					shuffle(z.allyDeck);
					println("DECK_RESHUFFLE","Ally");
					SPTokenBad("Instill Bravery",me);
					
				});
			});
		} else if(ch === "Play an Action Skill Card") {
			let didAction2 = didAction;
			let cards = [];
			for(let j = 0; !(j >= z.skillCardHands[me].length); j++) {
				let card = z.skillCardHands[me][j];
				let name = cardName(card);
				if(z.revealedHybrids[me] === 1) {
					switch(name){
						case "Reinforcements":
						case "Summon":
							cards.push([card,j]);
							break;
						case "Call to Action":
							if(z.deepOnes.length > deepOnesAway()){
								cards.push([card,j]);
							}
							break;
						case "Siren Song":
							if(z.passengerSupply.length > 0){
								cards.push([card,j]);
							}
							break;
						case "Ransack":
							if(z.phase === 1 && !z.noRansack && z.turn === me && (z.playerLocations[me] === "Chapel" || z.playerLocations[me] === "Galley" || z.playerLocations[me] === "Boiler Room")){
								cards.push([card,j]);
							}
							break;
						case "Perform Rites":
							if(z.phase === 1 && z.turn === me && !z.noRansack){
								cards.push([card,j]);
							}
							break;
					}
				}
				switch (name) {
					case "Coordinated Effort":
					case "Inspiring Speech":
					case "Watch and Learn":
					case "Providence":
						cards.push([card, j]);
						break;
					case "Persistence":
						if(z.skillCardHands[me].length > 1 || (z.players[me] === "Ida" && !z.revealedHybrids[me])){
							cards.push([card,j]);
						}
						break;
					case "True Grit":
						if(z.trueGrit){
							cards.push([card,j]);
						}
						break;
					case "Shrivelling": {
						let any = false;
						for(let j = 0; !(j>=z.revealedHybrids.length); j++){
							if(z.revealedHybrids[j] !== z.revealedHybrids[me]){
								any = true;
								break;
							}
						}
						if(!z.revealedHybrids[me]){
							any |= (z.deepOnes.length > deepOnesAway());
							any |= z.shoggoth > 0;
							any |= z.graspingTendril > 0;
							any |= z.drownedSpirit > 0;
						}
						any |= (z.players[me] === "Ida" && !z.revealedHybrids[me]);
						if(any){
							cards.push([card,j]);
						}
						break;
					}
					case "Lesser Banishment": 
						if(z.deepOnes.length > deepOnesAway() || (z.players[me] === "Ida" && !z.revealedHybrids[me])){
							cards.push([card,j]);
						}
						break;
					case "Rampage":
						if((enemiesInMySpace() || (itemPresent("Flare Gun") && itemHolder("Flare Gun") === me) || (enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me) || (z.players[me] === "Ida" && !z.revealedHybrids[me])) && 
							(!z.thePeacemaker || z.players[me] !== "Arjun")){
							cards.push([card,j]);
						}
						break;
					case "Companion":
						if(z.allyDeck.length > 0 && z.playerLocations[me] !== "Brig" && z.playerLocations[me] !== "Sick Bay"){
							cards.push([card,j]);
						}
						break;
				}
				
			}
			let promptText = lc("SKILL_CARD_ACTION_PROMPT",cards.length);
			for(let j = 0; !(j >= cards.length); j++) {
				promptText += "\n" + (j + 1) + ": " + cardText(cards[j][0]);
			}
			promptNum(promptText, (a) => 1 > a || a > cards.length, mainMenu, (prompted) => {
				let card = cards[prompted - 1][0];
				let pos = cards[prompted - 1][1];
				confirmify(lc("SKILL_CARD_ACTION_CONFIRM",cardText(card)), mainMenu, () => {
					let name = cardName(card);
					let did = false;
					let done = function() {
						if(!did) {
							didAction2();
						}
						mainMenu();
					};
					if(name !== "Persistence" && name !== "Watch and Learn" && name !== "Coordinated Effort" && name !== "True Grit"){
						playSkillCard(me, pos, true);
					}
					addAlert("PLAY_CARD_ALERT_PRIVATE",cardText(card));
					z.actionPerformer = me;
					if(name === "Coordinated Effort"){
						delete z.actionPerformer;
						z.skillCardHands[me].splice(pos,1);
						checkEmptyColors(me);
						printlnBold("PLAY_CARD_ALERT",[z.players[me],cardText(card)]);
						addOption(me, "[Coordinated Effort] Target a character", undefined, true);
						z.xoStack.push(card);
						z.xoPerformers.push(me);
						addAlert("COORDINATED_EFFORT_ALERT");
						z.noRansack = true;
					} else if (name === "Companion"){
						if(z.allyDeck.length === 1){
							plainAlert("COMPANION_ONE_ALLY");
							spawnAlly(z.playerLocations[me]);
							notebookCheck(card,me);
							finishedAction();
						} else {	
							z.midAction = "Companion";
							addAlert("COMPANION_ALERT");
							addOption(me, "[Companion] Scout the ally deck", undefined, true);
							if(itemPresent("Notebook") && itemHolder("Notebook") === me && !z.notebook){
								z.notebookCard = card;
							}
						}
					} else if(name === "Inspiring Speech"){
						z.midAction = "Insipring Speech";
						SPTokenBad("Inspiring Speech");
					} else if(name === "Shrivelling"){
						let any = false;
						for(let j = 0; !(j>=z.revealedHybrids.length); j++){
							if(z.revealedHybrids[j] !== z.revealedHybrids[me]){
								any = true;
								break;
							}
						}
						if(!z.revealedHybrids[me]){
							any |= (z.deepOnes.length > deepOnesAway());
							any |= z.shoggoth > 0;
							any |= z.graspingTendril > 0;
							any |= z.drownedSpirit > 0;
						}
						if(any){
							if(itemPresent("Elder Sign Amulet") && me === itemHolder("Elder Sign Amulet")){
								z.elderSignAmulet = true;
							}
							addOption(me,"[Shrivelling] Target an enemy",undefined,true);
							addAlert("SHRIVELLING_ALERT");
							z.midAction = "Shrivelling";
							if(itemPresent("Notebook") && itemHolder("Notebook") === me && !z.notebook){
								z.notebookCard = card;
							}
						} else {
							notebookCheck(card,me);
							season(me,LORE);
							finishedAction();
						}
					} else if(name === "Lesser Banishment"){
						if(z.deepOnes.length > deepOnesAway()){
							if(itemPresent("Elder Sign Amulet") && me === itemHolder("Elder Sign Amulet")){
								z.elderSignAmulet = true;
							}
							addOption(me,"[Lesser Banishment] Target a space",undefined,true);
							addAlert("LESSER_BANISHMENT_ALERT");
							z.midAction = "Lesser Banishment";
							if(itemPresent("Notebook") && itemHolder("Notebook") === me && !z.notebook){
								z.notebookCard = card;
							}
						} else {
							notebookCheck(card,me);
							season(me,LORE);
							finishedAction();
						}
					} else if(name === "Watch and Learn"){
						printlnBold("PLAY_CARD_ALERT",[z.players[me],cardText(card)]);
						addAlert("WATCH_AND_LEARN_ALERT");
						if(z.cursedWhispers === me){
							playSkillCard(me, pos, true);
							SPTokenBad("Cursed Whispers","Watch and Learn");
						} if(z.fromTheAbyss){
							addOption(me, "Draw 2 Skill Cards (not treachery/boon)",z.skillCardHands[me].splice(pos,1)[0],true);
						} else {
							addOption(me, "Draw 2 Skill Cards (any color but treachery)",z.skillCardHands[me].splice(pos,1)[0],true);
						}
						checkEmptyColors(me);
						z.midAction = "Watch and Learn";
					} else if(name === "Rampage"){
						if((enemiesInMySpace() || (enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me))){

							let mySpace = enemiesInMySpace();
							let numOptions = 0;
							if(mySpace){
								numOptions++;
								if(itemPresent("Six-Shooter") && itemHolder("Six-Shooter") === me){
									numOptions++;
								}
								if(itemPresent("Pocket Pistol") && itemHolder("Pocket Pistol") === me){
									numOptions++;
								}
								if(itemPresent("Shotgun") && itemHolder("Shotgun") === me){
									numOptions++;
								}
								if(itemPresent("Fillet Knife") && itemHolder("Fillet Knife") === me){
									numOptions++;
								}
								if(itemPresent("Baseball Bat") && itemHolder("Baseball Bat") === me){
									numOptions++;
								}
							}
							if(enemyInAdjacentSpace() && itemPresent("Repeating Rifle") && itemHolder("Repeating Rifle") === me){
								numOptions++;
							}
							if(itemPresent("Flare Gun") && itemHolder("Flare Gun") === me && !z.flareGun){
								numOptions++;
							}
							z.midAction = "Rampage";
							if(numOptions === 1){
								if(mySpace){
									plainAlert("RAMPAGE_ATTACK_ALERT",z.players[me],getGender(me));
									addOption(me,"Attack an enemy",4,true);
									addOption(me,"I'm done with Rampage",undefined,true);
								} else {
									plainAlert("RAMPAGE_WEAPON_ALERT",[z.players[me],"Repeating Rifle"],getGender(me));
									addOption(me,"[Repeating Rifle] Attack an enemy",3,true);
									addOption(me,"I'm done with Rampage",undefined,true);
								}
							} else {
								addOption(me,"[Rampage] Choose your weapon");
								addAlert("RAMPAGE_WHICH_ALERT");
							}
							if(itemPresent("Notebook") && itemHolder("Notebook") === me && !z.notebook){
								z.notebookCard = card;
							}
						} else {
							notebookCheck(card,me);
							season(me,STRENGTH);
							finishedAction();
						}
					} else if(name === "True Grit"){
						delete z.actionPerformer;
						z.skillCardHands[me].splice(pos,1);
						checkEmptyColors(me);
						printlnBold("PLAY_CARD_ALERT",[z.players[me],cardText(card)]);
						addAlert("TRUE_GRIT_ALERT");
						z.trueGrit = false;
						z.trueGritBonus = me;
						z.xoStack.push(card);
						z.xoStack.push(-1);
						z.xoPerformers.push(me);
						z.xoPerformers.push(me);
						did = true;
						z.noRansack = true;
					} else if (name === "Persistence"){
						if(z.skillCardHands[me].length > 0){
							printlnBold("PLAY_CARD_ALERT",[z.players[me],cardText(card)]);
							addOption(me,"[Persistence] Discard a Skill Card",0,true);
							z.midAction = ["Persistence",z.skillCardHands[me].splice(pos,1)[0]];
							checkEmptyColors(me);
						} else {
							playSkillCard(me, pos, true);
							notebookCheck(card,me);
							season(me,WILL);
							finishedAction();
						}
					} else if (name === "Reinforcements"){
						if(spawnDeepOne(DEEP)){
							addAlert("REINFORCEMENTS_ALERT");
							if(deepOnesAway() - deepOnesReserves() >= 4){
								plainAlert("REINFORCEMENTS_ALERT_2",z.players[me]);
								addOption(me,"[Reinforcements] Move Deep monsters to a water space",undefined,true);
								z.midAction = "Reinforcements";
							} else {
								finishedAction();
							}
						}
					} else if(name === "Call to Action"){
						let index = locationIndex(z.playerLocations[me]);
						let anyOnSpace = false;
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === index){
								anyOnSpace = true;
								break;
							}
						}
						if(anyOnSpace){
							addAlert("CALL_TO_ACTION_CHOICE_ALERT");
							addOption(me,"[Call to Action] Activate each Deep One in your space",undefined,true);
							addOption(me,"[Call to Action] Activate 1 Deep One in any space",undefined,true);
						} else {
							addAlert("CALL_TO_ACTION_NO_CHOICE_ALERT");
							addOption(me,"[Call to Action] Activate 1 Deep One in any space",undefined,true);
						}
						z.midAction = "Call to Action";
					} else if (name === "Siren Song"){
						riskPassenger();
						z.midAction = "Siren Song";
					} else if (name === "Ransack"){
						did = true;
						z.phase = 3;
						switch(z.playerLocations[me]){
							case "Chapel":
								decreaseSanity();
								break;
							case "Galley":
								decreaseFood();
								break;
							case "Boiler Room":
								decreaseFuel();
								break;
						}
						finishedAction();
					} else if(name === "Perform Rites"){
						addOption(me,"Activate Mother Hydra","Perform Rites",true);
						addOption(me,"Activate Father Dagon","Perform Rites",true);
						addAlert("PERFORM_RITES");
						did = true;
						z.midAction = "Perform Rites";
						z.phase = 3;
					} else if(name === "Providence"){
						if(z.providence){
							z.providence += 1
						} else {
							z.providence = 1;
						}
						addAlert("PROVIDENCE");
						finishedAction();
					} else if(name === "Summon"){
						addOption(me,"[Summon] Activate a Horror",undefined,true);
						addAlert("SUMMON");
						z.midAction = "Summon";
					}
					
					done();

				});
			});
		} else if (ch === "[Summon] Activate a Horror"){
			promptNum(lc("ACTIVATE_HORROR_PROMPT"),(a)=>1>a||a>3,mainMenu,(a)=>{
				let done = false;
				switch(a){
					case 1:
						done = activateShoggoth("Summon");
						break;
					case 2:
						done = activateDrownedSpirit("Summon");
						break;
					case 3:
						done = activateGraspingTendril("Summon");
						break;
				}
				if(done){
					finishedAction();
				}
				removeOption(me,ch);
				mainMenu();
			});
		} else if(ch === "Choose the top option on this mythos") {
			/* TODO: remove this option (and "choose the bottom...") once chosen */
			confirmify(lc("CHOOSE_TOP_CONFIRM",d.mythosNames[z.currentMythos]), mainMenu, () => {
				let title = "";
				if(d.captainChooses[z.currentMythos] === 1) {
					title = lc("Captain");
				} else if(d.keeperChooses[z.currentMythos] === 1) {
					title = lc("Keeper");
				}
				printlnBold("CHOOSE_TOP_ALERT",[title,z.players[me],d.mythosNames[z.currentMythos]]);
				if(processTop()){
					doneWithChoiceMythos();
				}
				z.finishedMythos = true;
				mainMenu();
			});
		} else if(ch === "Choose the bottom option on this mythos") {
			confirmify(lc("CHOOSE_BOTTOM_CONFIRM",d.mythosNames[z.currentMythos]), mainMenu, () => {
				let title = "";
				if(d.captainChooses[z.currentMythos] === 1) {
					title = lc("Captain");
				} else if(d.keeperChooses[z.currentMythos] === 1) {
					title = lc("Keeper");
				}
				printlnBold("CHOOSE_BOTTOM_ALERT",[title,z.players[me],d.mythosNames[z.currentMythos]]);
				if(processBottom()){
					doneWithChoiceMythos();
				}
				z.finishedMythos = true;
				mainMenu();
			});
		} else if(ch === "Unconventional Leader [Feat]") {
			let promptText = lc("UNCONVENTIONAL_LEADER_PROMPT")+"\n"+lc("FEAT_USE_WARNING");
			let resources = [lc("Fuel"),lc("Food"),lc("Sanity"),lc("Souls")];
			for(let j = 1; !(j>4); j++){
				promptText += "\n"+j+": "+resources[j-1];
			}
			promptNum(promptText,(a)=>1>a||a>4,mainMenu,(a)=>{
				boldAlert("UNCONVENTIONAL_LEADER_ANNOUNCEMENT",resources[a-1]);
				z.feats[me].splice(z.feats[me].indexOf("Unconventional Leader"),1);
				switch(a){
					case 1:
					decreaseFuel();
					break;
					case 2:
					decreaseFood();
					break;
					case 3:
					decreaseSanity();
					break;
					case 4:
					decreaseSouls();
					break;
				}
				if(!z.gameOver){
					doneWithChoiceMythos();
				}
				z.finishedMythos = true;
				mainMenu();
			});
		} else if(ch === "Choose the OR on this mythos") {
			confirmify(lc("CHOOSE_OR_CONFIRM",d.mythosNames[z.currentMythos]), mainMenu, () => {
				printlnBold("CHOOSE_OR_ALERT",[z.players[me],d.mythosNames[z.currentMythos]]);
				if(processOR()){
					doneWithChoiceMythos();
				}			
				z.finishedMythos = true;
				mainMenu();
			}); /* TODO: display relative title ranks */
		} else if(ch === "Predictive Analytics") {
			let mandatories = anyMandatory();
			if(  mandatories.length > 0) {
				plainAlert("PREDICTIVE_ANALYTICS_MANDATORY");
				for(let j = 0; !(j >= mandatories.length); j++) {
					plainAlert(z.players[mandatories[j][0]] + ": " + lc(mandatories[j][1]));
				}
				plainAlert("IF_NO_MANDATORY");
				mainMenu();
			} else {
				let promptText = lc("PREDICTIVE_ANALYTICS_PROMPT");
				let Mythos1 = -1;
				let Mythos2 = -1;
				while (true) {
					if(z.mythosDeck.length === 0) {
						reshuffleMythos();
					}
					Mythos1 = z.mythosDeck.pop();
					
					/* URULES: Personal Crisis and Predictive Analytics */
					if(d.namedPlayerChooses[Mythos1] && (!characterPresent(d.namedPlayerChooses[Mythos1]) || z.playerLocations[getPlayerNum(d.namedPlayerChooses[Mythos1])] === "Brig")){
						plainAlert("MYTHOS_DISCARDED",d.mythosNames[Mythos1]);
						z.mythosDiscards.push(Mythos1);
					} else {
						break;
					}
				}
				while(true){
					if(z.mythosDeck.length === 0) {
						reshuffleMythos();
					}
					Mythos2 = z.mythosDeck.pop();
					
					if(d.namedPlayerChooses[Mythos2] && (!characterPresent(d.namedPlayerChooses[Mythos2]) || z.playerLocations[getPlayerNum(d.namedPlayerChooses[Mythos2])] === "Brig")){
						plainAlert("MYTHOS_DISCARDED",d.mythosNames[Mythos2]);
						z.mythosDiscards.push(Mythos2);
					} else {
						break;
					}
				}
				promptText += "\n1: " + d.mythosNames[Mythos1] ;
				promptText += "\n2: " + d.mythosNames[Mythos2];
				promptNum(promptText, (a) => 1 > a || a > 2, () => {
					z.mythosDeck.push(Mythos2);
					z.mythosDeck.push(Mythos1);
					mainMenu();
				}, (prompted) => {
					if(prompted === 2) {
						z.mythosDeck.unshift(Mythos1);
						z.mythosDeck.push(Mythos2);
					} else {
						z.mythosDeck.unshift(Mythos2);
						z.mythosDeck.push(Mythos1);
					}
					
					z.mythosOptions = blankArrays(z.numPlayers);
					z.context = blankArrays(z.numPlayers);
					z.mandatory = blankArrays(z.numPlayers);
					println("PREDICTIVE_ANALYTICS_ANNOUNCEMENT");

					z.phase = 4;
					playMythos();
					let alertText = lc("Played Mythos: ") + lc(d.mythosNames[z.currentMythos]) + ".";
					if(z.playerLocations[z.turn] !== "Brig" && ((z.turn === me && d.currentPlayerChooses[z.currentMythos] === 1) || (me === z.captain && d.captainChooses[z.currentMythos] === 1) || 
					   (me === z.keeper && d.keeperChooses[z.currentMythos] === 1) || (d.namedPlayerChooses[z.currentMythos] === z.players[me]))) {
						alertText += "\n"+lc("ITS_YOUR_CHOOSE");
					}
					addAlert(alertText);
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.feats[j].includes("Uncanny Fortune")){
							if(z.uncannyFortunePause){
								plainAlert("UNCANNY_FORTUNE_PAUSE");
							}
							break;
						}
					}
					mainMenu();
				});
			}
		}else if(ch === "Play an interrupt for this skill check") {
			/* UTODO: localization */
			let interrupts = interruptChoices();
			let promptText = "Which interrupt would you like to use? (1-" + interrupts.length + ")\n";
			for(let i = 0; !(i >= interrupts.length); i++) {
				promptText += (i + 1) + ": ";
				if(Number.isInteger(interrupts[i ])) {
					promptText += cardText(interrupts[i ]) + "\n";
				} else {
					promptText += interrupts[i ] + "\n";
				}
			}
			promptNum(promptText, (a) => 1 > a || a > interrupts.length, mainMenu, (prompted) => {
				let confirmText = "Confirming you want to use ";
				if(Number.isInteger(interrupts[prompted - 1])) {
					confirmText += cardText(interrupts[prompted - 1]) + ".\n";
				} else {
					confirmText += interrupts[prompted - 1] + ".\n";
				}
				confirmify(confirmText, mainMenu, () => {
					if(z.interrupts[me].length === 1 && z.interrupts[me][0] === "Pass") {
						z.interrupts[me] = [];
					}
					if(Number.isInteger(interrupts[prompted - 1])) {
						for(let i = 0; !(i >= z.skillCardHands[me].length); i++) {
							if(z.skillCardHands[me][i ] === interrupts[prompted - 1]) {
								playSkillCard(me, i, false);
								switch (cardName(interrupts[prompted - 1])) {
									case "Nothing to Hide":
										z.nothingToHide = true;
										break;
									case "Preparation":
										z.preparation = true;
										break;
								}
								z.interrupts[me].push(cardText(interrupts[prompted - 1]));
								interruptsToken();
								mainMenu();
								break;
							}
						}
					} else if(interrupts[prompted - 1].includes("Forced Learning")) {
						for(let j = 0; !(j>= z.skillCardHands[me].length); j++){
							if(cardName(z.skillCardHands[me][j]) === "Forced Learning"){
								playSkillCard(me,j,false);
							}
						}
						if(interrupts[prompted - 1].includes("Influence")){
							addAlert("FORCED_LEARNING",colorIDName(INFLUENCE));
							z.thisInfluence = true;
						} else if(interrupts[prompted - 1].includes("Lore")){
							addAlert("FORCED_LEARNING",colorIDName(LORE));
							z.thisLore = true;
						} else if(interrupts[prompted - 1].includes("Observation")){
							addAlert("FORCED_LEARNING",colorIDName(OBSERVATION));
							z.thisObservation = true;
						} else if(interrupts[prompted - 1].includes("Strength")){
							addAlert("FORCED_LEARNING",colorIDName(STRENGTH));
							z.thisStrength = true;
						} else if(interrupts[prompted - 1].includes("Will")){
							addAlert("FORCED_LEARNING",colorIDName(WILL));
							z.thisWill = true;
						} 
						z.interrupts[me].push(interrupts[prompted-1]);
						interruptsToken();
						mainMenu();
					} else if(interrupts[prompted - 1] === "Uncanny Fortune") {
						confirmify(
							lc("UNCANNY_FORTUNE_CONFIRM_2"),
							mainMenu, () => {
								printlnBold("UNCANNY_FORTUNE_PRINT",z.players[me]);
								println("SELF_SACRIFICE_INTERRUPT_WARNING");
								z.feats[me].splice(z.feats[me].indexOf("Uncanny Fortune"),1);
								clearSkillCheck2(true);
								z.mythosDiscards.push(z.currentMythos);
								if(z.mythosDeck.length === 0) {
									reshuffleMythos();
								}
								z.currentMythos = null;
								let nextMythos = z.mythosDeck[z.mythosDeck.length-1];
								if(!d.namedPlayerChooses[nextMythos] || (characterPresent(d.namedPlayerChooses[nextMythos] && 
									z.playerLocations[getPlayerNum(d.namedPlayerChooses[nextMythos])] !== "Brig"))){
										
									let alertText = lc("UNCANNY_FORTUNE_NEW_MYTHOS",d.mythosNames[nextMythos]);
									if(z.playerLocations[z.turn] !== "Brig" && ((z.turn === me && d.currentPlayerChooses[nextMythos] === 1) || (me === z.captain && d.captainChooses[nextMythos] === 1) || 
									   (me === z.keeper && d.keeperChooses[nextMythos] === 1) || (d.namedPlayerChooses[nextMythos] === z.players[me])) ) {
										alertText += "\n"+lc("ITS_YOUR_CHOOSE");
									}		
									addAlert(alertText);
								}
								
								playMythos();
								mainMenu();
							});
					} else if(interrupts[prompted - 1] === "Self Sacrifice (Pass)") {
						confirmify(lc("SELF_SACRIFICE_CONFIRM","PASS"),
							mainMenu, () => {
								printlnBold("SELF_SACRIFICE_ALERT","PASS");
								println("SELF_SACRIFICE_INTERRUPT_WARNING");
								z.feats[me].splice(z.feats[me].indexOf("Self Sacrifice"),1);
								/* URULES: ordering */
								defeat(me,"Self Sacrifice");
								processSkillCheckOutcome(true);								
								mainMenu();
							});
					} else if(interrupts[prompted - 1] === "Self Sacrifice (Fail)") {
						confirmify(lc("SELF_SACRIFICE_CONFIRM","FAIL"), mainMenu, () => {
								printlnBold("SELF_SACRIFICE_ALERT","FAIL");
								println("SELF_SACRIFICE_INTERRUPT_WARNING");
								z.feats[me].splice(z.feats[me].indexOf("Self Sacrifice"),1);
								defeat(me,"Self Sacrifice");
								processSkillCheckOutcome(false);
								mainMenu();
							});
					} else if(interrupts[prompted - 1] === "Self Sacrifice (Partial)") {
						confirmify(lc("SELF_SACRIFICE_CONFIRM","PARTIAL"),
							mainMenu, () => {
								printlnBold("SELF_SACRIFICE_ALERT","PARTIAL");
								println("SELF_SACRIFICE_INTERRUPT_WARNING");
								z.feats[me].splice(z.feats[me].indexOf("Self Sacrifice"),1);
								defeat(me,"Self Sacrifice");
								processSkillCheckOutcome(2);								
								mainMenu();
							});
					}
				});
			});
		} else if(ch === "Pass on interrupts for this skill check") {
			confirmify("Confirming you'd like to pass on interrupts for this skill check.", mainMenu, () => {
				z.interrupts[me] = ["Pass"];
				interruptsToken();
				mainMenu();
			});
		} else if(ch === "Specify strength of your contribution to the skill check") {
			let promptText = "How would you like to specify the strength of your contribution to this skill check?\n1: Low\n";
			let mediumOK = false;
			if(z.skillCheckCards[me].length >= 2) {
				promptText += "2: Medium\n3: High";
				mediumOK = true;
			} else {
				promptText += "2: High";
			}
			promptNum(promptText, (a) => 1 > a || a > 3 || (a === 3 && !mediumOK), mainMenu, (prompted) => {
				let confirmText = "Confirming you want to specify your contribution as ";
				if(prompted === 1) {
					confirmText += "(low)";
				} else if((prompted === 2 && !mediumOK) || prompted === 3) {
					confirmText += "(high)";
				} else {
					confirmText += "(medium)";
				}
				confirmText += ".\r\nOnce this is set, it cannot be changed.";
				confirmify(confirmText, mainMenu, () => {
					if(prompted === 1) {
						z.contributionLabels[me] = "(low)";
					} else if((prompted === 2 && !mediumOK) || prompted === 3) {
						z.contributionLabels[me] = "(high)";
					} else {
						z.contributionLabels[me] = "(medium)";
					}
					skillCheckToken();
					mainMenu();
				});
			});
		} else if(ch === "Clear skill check") {
			/* UTODO: update localization */
			let context = getContext(me,ch);
			let confirmText = lc("CLEAR_SKILL_CHECK_CONFIRM");
			confirmify(confirmText, mainMenu, () => {
				addAlert("Discarding all cards from the skill check");
				if (context === "Adrift Fishing Boat"){
					removeOption(me,"Risk a passenger");
				} else if (context === "Memory of the Deep"){
					removeOption(me,"Discard Memory of the Deep");
				} else if (context === "History Repeats"){
					removeOption(me,"Move a player to the Brig");
				} else if (context === "Hold the Line"){
					removeOption(me,"Move a Deep One");
				}
				removeFromAll(ch);
				clearSkillCheck();
				mainMenu();
			});
		} else if(ch === "Reveal cards from skill check") {
			confirmify(lc("CONFIRM_SKILL_CHECK_REVEAL"), mainMenu, () => {
				/* UTOODO: localization */
				addAlert("Shuffling and revealing skill check cards.");
				let sorted = sortedSkillCheck(true);
				revealSkillCheck();
				let text = "";
				for(let i = 0; !(i >= sorted.length); i++) {
					text += cardText(sorted[i ]) + "\n";
				}
				text += "\n";
				text += skillCheckTally(true)[0] + "\n";
				addAlert("The following cards are revealed:" + "\n" + text);

				let any = false;
				let val = skillCheckTally(true)[2];
				for(let j = 0; !(j>=z.determinationCOs.length); j++){
					if(val >= z.determinationCOs[j][0] && z.determinationCOs[j][1] >= val){
						any = true;
						break;
					}
				}
				if(any){
					plainAlert("One or more players have requested a pause for post-skill check abilities.");
					DEToken();
				}
				mainMenu();
				
			});
		} else if(ch === "Play Chaos into skill check") {
			confirmify(lc("CHAOS_PLAY_CONFIRM"), mainMenu, () => {
				addAlert("Played 2 cards from Chaos into the skill check.");
				playChaosToSkillCheck();
				mainMenu();
			});
		} else if(ch === "Display the skill check token") {
			confirmify("Confirming that you want to display the skill check token to prompt " + z.players[(z.turn + z.contributingPlayer + 1) % z.numPlayers] + " to play into the skill check.", mainMenu, () => {
				plainAlert("Displaying the skill check token; note that interrupts can still be played until " + z.players[(z.turn + z.contributingPlayer + 1) % z.numPlayers] + " plays or passes on the skill check itself.");
				skillCheckToken();
				mainMenu();
			});
		} else if(ch === "Pass on the skill check") {
			/* TODO: CO contributions, etc. */
			confirmify("Confirming that you want to pass on the skill check.", mainMenu, () => {
				advanceContributor();
				skillCheckToken();
				mainMenu();
			});
		} else if(ch === "Play a card into the skill check" ) {
			/* UTODO: localize, update this */
			let playIn = function() {
				let memory = z.memoryOfTheDeep && z.players[me] === "William" && z.nothingToHide && (z.skillCardDecks[TREACHERY].length > 0 || z.skillCardDiscards[TREACHERY].length > 0) && z.skillCheckCards[me].length > 0;
				if(!canIContribute()) {
					let promptText = "You played ";
					for(let k = 0; !(k >= z.skillCheckCards[me].length); k++) {
						promptText += cardText(z.skillCheckCards[me][k]) + ", ";
					}
					promptText = promptText.slice(0, -2);
					promptText += " into the skill check.\n\nYou cannot contribute any more cards.";
					if(memory){
						let card = drawFromDeck(TREACHERY);
						z.memoryOfTheDeepCard = card;
						plainAlert("MEMORY_OF_THE_DEEP_NOTHING_TO_HIDE",cardText(z.memoryOfTheDeepCard));
						skillCheckToken();
					}
					addAlert(promptText);
					advanceContributor();
					mainMenu();
					return;
				}
				let promptText = "";
				if(z.skillCheckCards[me].length > 0) {
					promptText += "So far, you have played ";
					for(let k = 0; !(k >= z.skillCheckCards[me].length); k++) {
						promptText += cardText(z.skillCheckCards[me][k]) + ", ";
					}
					promptText = promptText.slice(0, -2);
					promptText += " into the skill check.\n\n";
				}
				promptText += "What card would you like to play into the skill check? (1-" + z.skillCardHands[me].length + ")";
				for(let i = 0; !(i >= z.skillCardHands[me].length); i++) {
					promptText += "\n" + (i + 1) + ": " + cardText(z.skillCardHands[me][i ]);
				}
				if(memory){
					promptText += "\nIf you pass, the Treachery card from Memory of the Deep will be played in and you will not be able to play any further cards.";
				}
				promptNum(promptText, (a) => 1 > a || a > z.skillCardHands[me].length, () => {
					if(memory){
						let card = drawFromDeck(TREACHERY);
						z.memoryOfTheDeepCard = card;
						plainAlert("MEMORY_OF_THE_DEEP_NOTHING_TO_HIDE",cardText(z.memoryOfTheDeepCard));
						advanceContributor();
						skillCheckToken();
					} else if (z.skillCheckCards[me].length > 0){
						advanceContributor();
					}
					mainMenu();
				}, (prompted) => {
					confirmify("Confirming you want to play " + cardText(z.skillCardHands[me][prompted - 1]) + " into the check.", playIn,
					() => {
						addAlert("Played " + cardText(z.skillCardHands[me][prompted - 1]) + " into the skill check.");
						for(let j = 0; !(j >= z.numPlayers); j++) {
							z.tank[j] = false;
						}
						playCardToSkillCheck(me, prompted - 1);
						/* URULES: this is faceup if IC'd, right? */
						if(z.skillCheckCards[me].length === 1 && z.memoryOfTheDeep && !z.nothingToHide && z.players[me] === "William" && 
							(z.skillCardDecks[TREACHERY].length > 0 || z.skillCardDiscards[TREACHERY].length > 0)){
							
							let card = drawFromDeck(TREACHERY);
							z.memoryOfTheDeepCard = card;
							plainAlert("MEMORY_OF_THE_DEEP_TRIGGER");
							
							skillCheckToken();
						}
						if(z.skillCardHands[me].length === 0) {
							if(z.memoryOfTheDeep && z.players[me] === "William" && 
							   (z.skillCardDecks[TREACHERY].length > 0 || z.skillCardDiscards[TREACHERY].length > 0) && z.nothingToHide){

								let card = drawFromDeck(TREACHERY);
								z.memoryOfTheDeepCard = card;
								plainAlert("MEMORY_OF_THE_DEEP_NOTHING_TO_HIDE",cardText(z.memoryOfTheDeepCard));
								skillCheckToken();
							}								   
							advanceContributor();
							mainMenu();
						} else {
							/* TODO: any way to cancel later? */
							playIn();
						}
					});
				});
			};
			playIn();
		} else if(ch.slice(0, 8) === "Activate" && ch.slice(9) !== "Deep Ones" && ch.slice(9) !== "Father Dagon" && ch.slice(9) !== "Mother Hydra" && ch.slice(9) !==
			"another location" && ch.slice(9) !== "an Improvement") {
			let location = ch.slice(9);
			confirmify(lc("ACTIVATE_SPACE_CONFIRM",location), mainMenu, () => {
				activateLocation(location,true);
			});
		} else if(ch === "Do Nothing") {
			/* UTODO: localize */
			confirmify("Confirming you want to waive the action you are presently entitled to, thereby doing nothing.", mainMenu, () => {
				plainAlert(z.players[me] + " chooses to do nothing as an action.");
				didAction();
				z.actionPerformer = me;
				z.midAction = "Nothing";
				finishedAction();
				mainMenu();
			});
		} else if (ch === "[Host] Don't move"){
			confirmify(lc("BATTERING_WAVES_STAY",z.playerLocations[me]),mainMenu,()=>{
				removeOption(me,ch);
				printlnBold("BATTERING_WAVES_STAY_ALERT",z.players[me]);
				removeOption(me,"[Host] Move");
				wander(HOST);
				mainMenu();
			});
		} else if (ch === "[Battering Waves] Don't move"){
			confirmify(lc("BATTERING_WAVES_STAY",z.playerLocations[me]),mainMenu,()=>{
				printlnBold("BATTERING_WAVES_STAY_ALERT",z.players[me]);
				removeOption(me,ch);
				removeOption(me,"[Battering Waves] Move");
				let any = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(hasOption(j,"[Battering Waves] Move")){
						any = true;
						break;
					}
				}
				if(!any){
					clearSkillCheck();
				}
				mainMenu();
			});
		} else if (ch === "[Summon the Beast Within] Don't move"){
			confirmify(lc("SUMMON_THE_BEAST_WITHIN_STAY",z.playerLocations[me]),mainMenu,()=>{
				let prompted = z.playerLocations[me];
				let count = 0;
				for(let j = 0; !(j>=z.deepOnes.length); j++){
					if(z.deepOnes[j] === locationIndex(prompted)){
						z.deepOnes[j] = RESERVES;
						count++;
					}
				}
				if(count){
					plainAlert("SUMMON_THE_BEAST_WITHIN_DEEP_ONES",prompted);
				}
				for(let j = 0; !(j>=z.playerLocations.length); j++){
					if(z.playerLocations[j].length === prompted && z.revealedHybrids[j]){
						defeat(j,"Summon the Beast Within");
						count++;
					}
				}
				/* ATODO: improve when spell done handling */
				if(z.fromTheAbyss){
					let any = false;
					if(d.spaceNames[z.shoggoth] === z.playerLocations[me]){
						count++;
						any = true;
					}
					if(d.spaceNames[z.drownedSpirit] === z.playerLocations[me]){
						count++;
						any = true;
					}
					if(d.spaceNames[z.graspingTendril] === z.playerLocations[me]){
						count++;
						any = true;
					}
					if(any){
						addOption(me,"Repel a Horror","Summon the Beast Within",true);
					}
				}
				
				
				/* UTODO: if count > 9 (and it can't be brought below)... */
				if(count > 1){
					if(z.dieRollQueue.length === 0){
						SPTokenBad("SUMMON_THE_BEAST_WITHIN",[count,prompted]);
					} else {
						z.dieRollQueue.push("SUMMON_THE_BEAST_WITHIN");
						z.dieRollParams.push([count,prompted]);
					}
				} else {
					if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
						finishedAction();
					}
					if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
				}
				removeOption(me, ch);
				removeOption(me,"[Summon the Beast Within] Move");
				mainMenu();
			});
			
		} else if (ch === "[Dowsing] Don't move"){
			confirmify("DOWSING_CONFIRM",mainMenu,()=>{
				removeOption(me,"[Dowsing] Move");
				drawItem(me,"Dowsing");
				drawItem(me,"Dowsing");
				SPTokenBad("Dowsing");						
				mainMenu();
			});
		} else if (ch === "[Underestimated] Move"){
			let choices = [];
			let loc = z.playerLocations[getPlayerNum("Mui Choo")];
			let promptText = "";
			for(let j = DECK; !(j>=SICK_BAY); j++){
				if(isAdjacent(d.spaceNames[j],loc)){
					choices.push(d.spaceNames[j]);
					promptText += "\n"+choices.length+": "+lc(d.spaceNames[j]);
				}
			}
			promptNum(lc("MOVE_SPACE_PROMPT",choices.length)+promptText,(a)=>1>a||a>choices.length,mainMenu,(a)=>{
				movePlayer(getPlayerNum("Mui Choo"),choices[a-1]);
				removeOption(me,ch);
				if(decreaseSouls()){
					doneWithChoiceMythos();
				}
				mainMenu();
			});
		} else if (ch === "[Abandon Ship] Move a player"){
			let context = getContext(me,ch);
			let promptText = lc("ABANDON_SHIP_PROMPT",context.length);
			for(let j = 0; !(j>=context.length); j++){
				promptText += "\n"+(j+1)+": "+lc(z.players[j]);
			}
			promptNum(promptText,(a)=>1>a||a>context.length,mainMenu,(a)=>{
				let choices = [];
				switch(z.playerLocations[context[a-1]]){
					case "Boiler Room":
						choices = ["Deck Space 7","Deck Space 8"];
						break;
					case "Sick Bay":
						choices = ["Deck Space 3","Deck Space 4"];
						break;
					case "Bridge":
						choices = ["Deck Space 1","Deck Space 2"];
						break;
				}
				let promptText = lc("JOIN_HANDS_WHERE",z.players[context[a-1]]);
				for(let j = 0; !(j>=choices.length); j++){
					promptText += "\n"+(j+1)+": "+choices[j];
				}
				promptNum(promptText,(b)=>1>b||b>2,mainMenu,(b)=>{
					movePlayer(context[a-1],choices[b-1]);
					context.splice(a-1,1);
					if(context.length === 0){
						removeOption(me,ch);
						if(!hasOption(me,"[Abandon Ship] Move an ally")){
							doneWithRevealEffect(me);
						}
					}
					mainMenu();
				});
			});
		} else if (ch === "[Cleansing Rain] Move"){
			let choices = [];
			switch(z.playerLocations[me]){
				case "Boiler Room":
					choices = ["Deck Space 7","Deck Space 8"];
					break;
				case "Sick Bay":
					choices = ["Deck Space 3","Deck Space 4"];
					break;
				case "Bridge":
					choices = ["Deck Space 1","Deck Space 2"];
					break;
			}
			let promptText = lc("MOVE_SPACE_PROMPT",2);
			for(let j = 0; !(j>=choices.length); j++){
				promptText += "\n"+(j+1)+": "+choices[j];
			}
			promptNum(promptText,(a)=>1>a||a>2,mainMenu,(a)=>{
				movePlayer(me,choices[a-1]);
				removeOption(me,ch);
				let any = false;
				for(let j = 0; !(j>=z.numPlayers); j++){
					if(hasOption(me,ch)){
						any = true;
						break;
					}
				}
				if(!any && z.dieRollQueue.length === 0 && z.lastDieRoll === null){
					doneWithChoiceMythos();
				}
				mainMenu();
			});
		} else if(ch === "Move" || ch === "[Summon the Beast Within] Move" || ch === "[Battering Waves] Move" || ch === "[Host] Move" || ch === "[Dowsing] Move") {
			/* you don't get this option if you're in the Brig */ 
			let myLocation = z.playerLocations[me];
			let validShips = [];
			let pickLocation = function(shipChosen) {
				let validLocations = [];
				switch (shipChosen) {
					case "Interior":
						for(let j = INTERIOR; !(j>=INTERIOR+6); j++){
							validLocations.push(d.spaceNames[j]);
						}
						break;
					case "Deck":
						for(let j = DECK; !(j>=DECK+8); j++){
							validLocations.push(d.spaceNames[j]);
						}
						break;
				}
				let promptText = lc("MOVE_SPACE_PROMPT",validLocations.length);
				for(let j = 0; !(j >= validLocations.length); j++) {
					promptText += "\n" + (j + 1) + ": ";
					if(myLocation === validLocations[j]) {
						promptText += lc("(already here)");
					} else {
						promptText += lc(validLocations[j]);
					}
				}
				promptNum(promptText, (a) => 1 > a || a > validLocations.length || validLocations[a - 1] === myLocation, mainMenu, (choice) => {
					let prompted = validLocations[choice - 1];
					addAlert("PLAYER_MOVES",[z.players[me],prompted]);
					movePlayer(me, prompted);
					let context = getContext(me,ch);
					if(!hasOption(me,ch) || context === "Break Out"){
						didAction();
						z.actionPerformer = me;
						finishedAction();
					}
					
					removeOption(me, ch);
					removeOption(me,"[Summon the Beast Within] Don't move");
					if(z.midAction === "Brig" && !z.currentSkillCheck){
						finishedAction();
					}
					if(context === "Heal"){
						let any = z.dieRollQueue.includes("Heal");
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(hasOption(j,ch)){
								any = true;
							}
						}
						if(!any){
							if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
								finishedAction();
							}
							if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
						}
					} else if (context === "Jail Break"){
						let any = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(hasOption(j,ch)){
								any = true;
							}
						}
						if(!any){
							clearSkillCheck();
						}
					} else if(ch === "[Dowsing] Move"){
						removeOption(me,"[Dowsing] Don't move");
						drawItem(me,"Dowsing");
						drawItem(me,"Dowsing");
						SPTokenBad("Dowsing");						
						mainMenu();
				    } else if(ch === "[Summon the Beast Within] Move"){
						let count = 0;
						for(let j = 0; !(j>=z.deepOnes.length); j++){
							if(z.deepOnes[j] === locationIndex(prompted)){
								z.deepOnes[j] = RESERVES;
								count++;
							}
						}
						if(count){
							plainAlert("SUMMON_THE_BEAST_WITHIN_DEEP_ONES",prompted);
						}
						for(let j = 0; !(j>=z.playerLocations.length); j++){
							if(z.playerLocations[j].length === prompted && z.revealedHybrids[j]){
								defeat(j,"Summon the Beast Within");
								count++;
							}
						}
						if(z.fromTheAbyss){
							let any = false;
							if(d.spaceNames[z.shoggoth] === z.playerLocations[me]){
								count++;
								any = true;
							}
							if(d.spaceNames[z.drownedSpirit] === z.playerLocations[me]){
								count++;
								any = true;
							}
							if(d.spaceNames[z.graspingTendril] === z.playerLocations[me]){
								count++;
								any = true;
							}
							if(any){
								addOption(me,"Repel a Horror","Summon the Beast Within",true);
							}
						}
						if(count > 1){
							if(z.dieRollQueue.length === 0){
								SPTokenBad("SUMMON_THE_BEAST_WITHIN",[count,prompted]);
							} else {
								z.dieRollQueue.push("SUMMON_THE_BEAST_WITHIN");
								z.dieRollParams.push([count,prompted]);
							}
						} else {
							if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
								finishedAction();
							}
							if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
						}
					} else if (ch === "[Battering Waves] Move"){
						removeOption(me,ch);
						removeOption(me,"[Battering Waves] Don't move");
						let any = false;
						for(let j = 0; !(j>=z.numPlayers); j++){
							if(hasOption(j,"[Battering Waves] Move")){
								any = true;
								break;
							}
						}
						if(!any){
							clearSkillCheck();
						}
					} else if(ch === "[Host] Move"){
						removeOption(me,ch);
						removeOption(me,"[Host] Don't move");
						wander(HOST);
					}
					if(context === "Brig"){
						clearSkillCheck();
					}
					
					mainMenu();
				});
			};
			validShips = ["Interior","Deck"];
			

			let promptText = lc("MOVE_SHIP_PROMPT",validShips.length);
			for(let j = 0; !(j >= validShips.length); j++) {
				promptText += "\n" + (j + 1) + ": " + lc(validShips[j]);
			}
			promptNum(promptText, (a) => 1 > a || a > validShips.length, mainMenu, (prompted) => {
				pickLocation(validShips[prompted - 1]);
			});
		} else if(ch === "Discard a Skill Card" || ch === "[Persistence] Discard a Skill Card" || ch === "[Reveal] Discard a Skill Card") {
			let promptText = "";
			promptText = lc("DISCARD_SKILL_CARD_PROMPT", z.skillCardHands[me].length);
			for(let i = 0; !(i >= z.skillCardHands[me].length); i++) {
				promptText += "\n" + (i + 1) + ": " + cardText(z.skillCardHands[me][i ]);
			}
			promptNum(promptText, (a) => 1 > a || a > z.skillCardHands[me].length + 1, mainMenu, (prompted) => {
				let card = z.skillCardHands[me][prompted - 1];
				let confirmText = lc("DISCARD_SKILL_CARD_CONFIRM",cardText(card));

				confirmify(confirmText, mainMenu, () => {
					addAlert("DISCARD_ALERT",cardText(card));
					discardSkillCard(me, prompted - 1);
					let context = getContext(me, ch);
					let man = isMandatory(me, ch);
					
					if(ch === "[Persistence] Discard a Skill Card") {
						context++;
						if(z.skillCardHands[me].length > 0 && 5 > context) {
							addOption(me, ch, context, false);
						} else {
							removeOption(me, ch);
						}
						addOption(me, "[Persistence] Draw Skill Cards", context, true);
					} else if(ch === "[Reveal] Discard a Skill Card"){
						context++;
						if(z.skillCardHands[me].length > 0) {
							addOption(me, ch, context, false);
						} else {
							removeOption(me, ch);
						}
						addOption(me, "[Reveal] Draw Treachery", context, true);
					} else if(Array.isArray(context) && Number.isInteger(context[0])) {
						context[0]--;
						if(z.skillCardHands[me].length > 0 && context[0] > 0) {
							addOption(me, ch, context, man);
						} else {
							removeOption(me, ch);
							if(context[1] === "Cloud Memory" || context[1] === "Voice of Ra"){
								let any = false;
								for(let j = 0; !(j>=z.numPlayers); j++){
									if(hasOption(j,ch)){
										any = true;
										break;
									}
								}
								if(!any){
									if(z.midAction === "Keeper of the Tome" || z.midAction === "Quick Cast"){
										finishedAction();
									}
									if(z.stolenRitualComponents){delete z.stolenRitualComponents; clearSkillCheck();}
								}
							} else if(context[1] === "Accusation"){
								let any = false;
								for(let j = 0; !(j>=z.numPlayers); j++){
									if(hasOption(j,ch)){
										any = true;
										break;
									}
								}
								if(!any){
									doneWithChoiceMythos();
								}
							} else if(context[1] === "Ritual Support" || context[1] === "The Anarcho-Individualist"){
								doneWithChoiceMythos();
							} else if(context[1] === "Rally the Crew" || context[1] === "Cabin Fever"){
								let any = false;
								for(let j = 0; !(j>=z.numPlayers); j++){
									if(hasOption(j,ch)){
										any = true;
										break;
									}
								}
								if(!any){
									if(context[1] === "Rally the Crew"){
										clearSkillCheck();
									} else {
										doneWithChoiceMythos();
									}
								}
							} else if(context[1] === "Firemen Strike"){
								if(!canResolveDefeatHumanContext("Firemen Strike") && !canResolveDefeatTraitorContext("Firemen Strike")){
									clearSkillCheck();
								}
							} else if(context[1] === "Scary Stories"){
								clearSkillCheck();
							} else if(context[1] === "Bone Chill"){
								let any = false;
								for(let j = 0; !(j>=z.numPlayers); j++){
									if(hasOption(j,ch)){
										any = true;
										break;
									}
								}
								if(!any){
									doneWithWaypoint();
								}
							}
							
						}
						
					} else if(Array.isArray(context) && context[0] == "Mysterious Rune"){
						let value = cardValue(card);
						context[1] += value;
						removeOption(me,ch);
						if(value >= 5){
							addOption(me,ch,context,true);
						} else {
							doneWithChoiceMythos();
						}
					}
					mainMenu();
				});
			});
		} else if(ch === "Play the top Mythos") {
			let mandatories = anyMandatory();
			if(mandatories.length > 0) {
				let alertText = lc("MYTHOS_HOLD_UP");

				for(let j = 0; !(j >= mandatories.length); j++) {
					alertText += "\n"+lc(z.players[mandatories[j][0]]) + ": " + lc(mandatories[j][1]);
				}
				alertText += "\n"+lc("ALL_NON_MANDATORY_HELP");
				addAlert(alertText);
				mainMenu();
			} else {
				confirmify(lc("MYTHOS_CONFIRM"), mainMenu, () => {
					z.mythosOptions = blankArrays(z.numPlayers);
					z.context = blankArrays(z.numPlayers);
					z.mandatory = blankArrays(z.numPlayers);
					addAlert("MYTHOS_ANNOUNCE",d.mythosNames[z.mythosDeck[z.mythosDeck.length - 1]]);
					z.phase = 4;
					playMythos();
					
					if(!z.finishedMythos && z.playerLocations[z.turn] !== "Brig" && ((z.turn === me && d.currentPlayerChooses[z.currentMythos] === 1) || (me === z.captain && d.captainChooses[z.currentMythos] === 1) || 
						(me === z.keeper && d.keeperChooses[z.currentMythos] === 1) || (d.namedPlayerChooses[z.currentMythos] === z.players[me]))) {
						
						addAlert("ITS_YOUR_CHOOSE");
					}
					for(let j = 0; !(j>=z.numPlayers); j++){
						if(z.feats[j].includes("Uncanny Fortune")){
							if(z.uncannyFortunePause){
								plainAlert("UNCANNY_FORTUNE_PAUSE");
							}
							break;
						}
					}
					mainMenu();
				});
			}
		} else if(ch === "Choose the Skill Check on this mythos") {
			confirmify(lc("CHOOSE_SKILL_CHECK_CONFIRM",d.mythosNames[z.currentMythos]), mainMenu, () => {
				printlnBold("CHOOSE_SKILL_CHECK_ALERT",[z.players[me],d.mythosNames[z.currentMythos]]);
				addAlert("INITIALIZING_SKILL_CHECK", d.mythosNames[z.currentMythos]);
				startMythosSkillCheck();
				mainMenu();
			});
		} else if(ch === "Choose the Fail on this mythos") {
			confirmify(lc("CHOOSE_FAIL_CONFIRM",d.mythosNames[z.currentMythos]), mainMenu, () => {
				printlnBold("CHOOSE_FAIL_ALERT",[z.players[me],d.mythosNames[z.currentMythos]]);
				processSkillCheckOutcome(false);
				mainMenu();
			});
		} else if(ch === "Add text after your post (and quit)") {
			promptString("Type your note below.", mainMenu, (prompted) => {
				t.value += prompted + "\r\n";
				saveAndQuit();
			});
		} else if(ch === "Show Hand Report") {
			let report = handReport();
			addAlert(report);
			mainMenu();
		} else if(ch === "Display Game State") {
			confirmify(
				lc("DISPLAY_GAME_STATE_CONFIRM"),
				mainMenu, () => {
					textGameState(true);
					mainMenu();
				});
		} else if(ch === "Change my username") {
			confirmify(lc("CHANGE_USERNAME_CONFIRM"),
				mainMenu, () => {
					promptString(lc("ENTER_USERNAME"), mainMenu, (prompted) => {
						z.usernames[me] = prompted;
						plainAlert("ASSUMING_CONTROL",[z.players[me],prompted]);
						saveAndQuit();
					});
				});
		} else if(ch === "Change dialog display style") {
			let styles = ["Classic", "Modern", "Modern (Mobile)", "Modern (Desktop)"];
			let promptText = lc("DIALOG_STYLE_PROMPT",styles.length);
			
			for(let j = 0; !(j >= styles.length); j++) {
				promptText += "\n" + (j + 1) + ": " + styles[j];
				if(z.promptStyle[me] === j) {
					promptText += " (you're using this now)";
				}
			}
			promptNum(promptText, (a) => 1 > a || a > styles.length, mainMenu, (choice) => {
				if(choice - 1 !== z.promptStyle[me]) {
					addAlert("STYLE_SWITCHED");
					z.promptStyle[me] = choice - 1;
					saveAndQuit();
				} else {
					addAlert("STYLE_KEPT");
					mainMenu();
				}
			});
		}
	}, cancelLabel);
}
/*
var quickQuoteThread = new RegExp("thread/\\d+", "g");
var quickQuoteArticle = new RegExp("article/\\d+", "g");
var quotedRE = new RegExp("\\[size=(1|0)\\]\\[color=#(F4F4FF|FFFFFF)\\]Quoted Article: (\\d+)\\[/color\\]\\[/size\\]", "g");

function checkForNewer() {
	let parser = new DOMParser();
	let doc = parser.parseFromString(this.responseText, "text/html");
	let quotedRE = new RegExp("\\[size=(1|0)\\]\\[color=#(F4F4FF|FFFFFF)\\]Quoted Article: (\\d+)\\[/color\\]\\[/size\\]", "g");
	let quotedArticle = parseInt(quotedRE.exec(t.value)[3]);
	let articles = doc.querySelectorAll('div[id^="objcontainer_article"]');
	for(let j = 0; !(j >= articles.length); j++) {
		let articleRE = new RegExp("objcontainer_article(\\d+)$", "g");
		let article = parseInt(articleRE.exec(articles[j].id)[1]);
		if(article > quotedArticle) {
			if(articles[j].innerHTML.search(/New seed: /g) !== -1) {
				alert(
					"You do not appear to be quoting the most recent TMR-using post in the thread.\nYou probably want to cancel this post and check if there is a post further down the thread (perhaps on a subsequent page) you should be quoting instead.");
				t.value += colorText("red", bold(
						"WARNING: This post did not quote the most recent TMR-using post in the thread, and thus probably cancelled another person's play."
						)) + "\r\n";
				return;
			}
		}
	}
	let nextPage = doc.querySelector('a[title="next page"]');
	if(nextPage !== null) {
		let href = nextPage.getAttribute("href");
		let oReq = new XMLHttpRequest();
		oReq.addEventListener("load", checkForNewer);
		oReq.open("GET", href);
		oReq.send();
	}
}
if(t !== undefined && (quickQuoteThread.test(location.pathname) || quickQuoteArticle.test(location.pathname))) {
	let articles = document.querySelectorAll('div[id^="objcontainer_article"]');
	let textArea = document.querySelector("textarea");
	let foundQQ = false;
	let badMan = false;
	for(let j = 0; !(j >= articles.length); j++) {
		if(!foundQQ) {
			let articleRE = new RegExp("objcontainer_article(\\d+)$", "g");
			let article = articleRE.exec(articles[j].id)[1];
			t.value = size(invisible("Quoted Article: " + article), 0) + clear() + t.value.replace(quotedRE, "");
			foundQQ = articles[j].contains(textArea);
		} else {
			if(articles[j].innerHTML.search(/New seed: /g) !== -1) {
				alert(
					"You do not appear to be quoting the most recent TMR-using post in the thread.\nYou probably want to cancel this post and quote a post further down the page instead.");
				t.value += colorText("red", bold(
						"WARNING: This post did not quote the most recent TMR-using post in the thread, and thus probably cancelled another person's play."
						));
				badMan = true;
				break;
			}
		}
	}
	if(!badMan && foundQQ) {
		let nextPage = document.querySelector('a[title="next page"]');
		if(nextPage !== null) {
			let href = nextPage.getAttribute("href");
			let oReq = new XMLHttpRequest();
			oReq.addEventListener("load", checkForNewer);
			oReq.open("GET", href);
			oReq.send();
		}
	}
} else if(t !== undefined) {
	let quoteRE = new RegExp("quote/(\\d+)$", "g");
	let quoteEX = quoteRE.exec(location.pathname);
	let article = 0;
	if(quoteEX === null) {
		let quotedEX = quotedRE.exec(t.value);
		if(quotedEX !== null) {
			article = parseInt(quotedEX[1]);
		}
	} else {
		article = parseInt(quoteEX[1]);
		t.value = size(invisible("Quoted Article: " + article), 0) + clear() + t.value.replace(quotedRE, "");
	}
	if(article !== 0) {
		let oReq = new XMLHttpRequest();
		oReq.addEventListener("load", checkForNewer);
		oReq.open("GET", "/article/" + article);
		oReq.send();
	}
}*/ // ENDTMRC [/size][/c]