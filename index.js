const CSI1 = "".codePointAt(0);
const CSI2 = "[".codePointAt(0);

function updateState(state, command) {
	if(!Object.keys(state).includes('first')) {
		state.first = true;
	} else {
		state.first = false;
	}

	//console.log(command);
	if(command.substr(-1) == "m") {
		var parts = command.substr(0, command.length - 1).split(";");
		for(var i = 0; i < parts.length; ++i) {
			var num = parseInt(parts[i]);
			// Reset
			if(num == 0) {
				state = { first: false };
			} else if(num == 1) {
				state.bold = true;
			} else if(num == 4) {
				state.underscore = true;
			} else if(num == 5) {
				state.blink = true;
			} else if(num == 7) {
				state.reverse = true;
			// 16 color FG
			} else if(num >= 30 && num <= 37) {
			// 16 color BG
			} else if(num >= 40 && num <= 47) {
			// Extended FG color
			} else if(num == 38) {
				// 256 color
				if(int(parts[i + 1]) == 5) {
				}
			// Extended BG color
			} else if(num == 48) {
				// 256 color
				if(int(parts[i + 1]) == 5) {
				}
			}
		}
	}

	//console.log(state);
	return state;
}

function htmlForState(state) {
	var ret = "";
	var fg = "#7f7f7f";
	var bg = "#000000";
	if(!state.first) {
		ret += "</span>";
	}
	ret += '<span style="';
	if(state.bold) {
		ret += "font-style:bold;";
	}
	if(state.underscore) {
		ret += "text-decoration:underline;";
	}
	if(state.blink) {
		ret += "text-decoration:blink;";
	}
	if(state.foreground) {
		fg = state.foreground;
	}
	if(state.background) {
		fg = state.background;
	}
	if(state.reverse) {
		ret += "color:" + bg + ";";
		ret += "background-color:" + fg + ";";
	} else {
		ret += "color:" + fg + ";";
		ret += "background-color:" + bg + ";";
	}
	ret += '">';

	return ret;
}

module.exports = {
	html: function(str) {
		var buf = Buffer.from(str);
		var len = buf.length;
		var ret = Buffer.from([]);
		var offset = 0;
		var state = {};
		var opened = false;
		do {
			// Read next byte
			var byte = buf.readUInt8(offset);

			// If we see ESC, get to work
			if(byte == CSI1) {
				// If next char is [, this is a sequence we care about
				if(offset + 1 < len && buf.readUInt8(offset + 1) == CSI2) {
					// Jump past the CSI
					offset += 2;
					var command = "";

					// Read ahead until we hit something that isn't a
					// number or a semicolon
					do {
						var char = String.fromCodePoint(buf.readUInt8(offset));
						command += char;
					} while(++offset < len && char.match(/[0-9;]/));

					// Process the command
					state = updateState(state, command);
					ret = Buffer.concat([ret, Buffer.from(htmlForState(state))]);
					opened = true;
					continue;
				}
			}

			// Pass through
			offset++;
			ret = Buffer.concat([ret, Buffer.from([byte])]);
		} while(offset < len);
		if(opened) {
			ret = Buffer.concat([ret, Buffer.from("</span>")]);
		}
		return ret.toString();
	}
};
