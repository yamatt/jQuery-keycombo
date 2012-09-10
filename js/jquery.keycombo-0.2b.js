/*
1. License

    keyCombo - extends jQuery to give simpler key combo functionality
    Copyright (C) 2010  Matthew Copperwaite

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

2. Contents

1. License
2. Contents
3. Version History
4. Documentation
5. Future Revisions
6. Contact
[Code]

3. Version History

3.1	0.1a	First version. Seems to work.
3.2	0.1b	Released. Needs testing.
3.3	0.2b	Moved code to single function to isolate the code and prevent conflicts with other plugins.

4. Documentation

[Please see the README.txt file]


5. Future Revisions

5.1 This needs to be tested in multiple browsers
5.2 Ability to disable commands
5.3 Any other improvements.

6. Contact
e-mail:		mattcopp@gmail.com
twitter:	http://twitter.com/mattcopp
identi.ca:	http://identi.ca/yamatt
website:	http://localhosy.net
git-repo:	http://git.localhosy.net
dev-wiki:	http://dev.localhosy.net
*/

//initialise

(function($){
    $.fn.extend({ 
        keyCombo: function(combo, triggerFunction) {
			var keyNames = {'backspace': 8, 'backsp': 8, 'bcksp': 8,
						'tab': 9,
						'enter': 13, 'return': 13,
						'shift': 16, 'shft': 13,
						'ctrl': 17, 'control': 17,
						'alt': 17,
						'pause': 19, 'break': 19,
						'caps': 20, 'capslock': 20, 'caps-lock': 20, 'caps lock': 20, 'caplock': 20, 'cap-lock': 20, 'cap lock': 20,
						'esc': 27, 'escape': 27,
						'pageup': 33,'page up': 33,'pgup': 33,
						'pagedown': 34,'page down': 34,'pgdn': 34,
						'end': 35,
						'home': 36,
						'left': 37, 'left arrow': 37, 'left-arrow': 37,
						'up': 38, 'up arrow': 38, 'up-arrow': 38,
						'right': 39, 'right arrow': 39, 'right-arrow': 39,
						'down': 40, 'down arrow': 40, 'down-arrow': 40,
						'insert': 45, 'ins': 45,
						'delete': 46, 'del': 46,
						'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119, 'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123
					};
        
			var comboArray = combo.split('+');
			
			var keys = new Array();
			for ( var i in comboArray ) {
				if (comboArray[i].length > 0) {				//if it has a value (incase someone put a + on the end or ++ in their string)
					keys[i] = new Array();
					keys[i]['name'] = comboArray[i];		//never used, may be useful for debugging
					
					if (comboArray[i].length > 1) {			//if it is a descriptively named key (e.g.: ctrl or alt) then it will have more than a length of 1
						keys[i]['ascii'] = keyNames[comboArray[i].toLowerCase()];	//use the associative array above to 'translate' the name to the ascii number
					}
					else if (comboArray[i].length == 1) {
						keys[i]['ascii'] = comboArray[i].toUpperCase().charCodeAt(0);	//convert all single characters (letters) to upper case so that s and S are seen the same when shift is used as a trigger key
					}
					keys[i]['down'] = false;			//default to it being in the 'up' state (it could be wrong, perhaps it could detect this in future though probably not nessecary)
				}
			}
	
			jQuery(document).keyup(function (e) {
				for (var i = 0; i < keys.length; i++) {
					if(e.which == keys[i]['ascii']) {	//match the key pressed to any key in the combo (future extension to detect order?)
						keys[i]['down'] = false;	//set that someone has taken their finger, limb, nose off the key
					}
				}
			});
		
			jQuery(document).keydown(function (e) {
				e.preventDefault();
				var allPressed = true;
				for (var i = 0; i < keys.length; i++) {
					if(e.which == keys[i]['ascii']) {	//set that someone has depressed the key
						keys[i]['down'] = true;
					}
					if (!keys[i]['down']) {			//detect if all keys in the combo has been pressed
						allPressed = false;
					}
				}
				if (allPressed) {
					for (var i = 0; i < keys.length; i++) {	//if you use an alert() it never detects the keys have been unpressed so this just assumes you have
						keys[i]['down'] = false;
					}
					triggerFunction();			//run the function associated with this key combination
				}
			});
		}
	});
})(jQuery);
