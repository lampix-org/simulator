const format = (info) => `[${info.timestamp}] [${info.renderer ? 'R' : 'M'}] [${info.level}]: ${info.message}`;

exports.format = format;
