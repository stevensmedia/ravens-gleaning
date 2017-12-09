module.exports = {
	html: function(buf) {
		var ret = Buffer.alloc(buf.length);
		var offset_in = 0;
		var offset_out = 0;
		do {
			var byte = buf.readUInt8(offset_in);
			ret.writeUInt8(byte, offset_out++);
		} while(++offset_in < buf.length);
		return ret;
	}
};
