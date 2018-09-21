const event = (name) => `lx-simulator/IPC/${name}`;

// Admin UI events
exports.TOGGLE_MOVEMENT = event('TOGGLE_MOVEMENT');
exports.SET_CLASSIFIER = event('SET_CLASSIFIER');
exports.SET_RECOGNIZED_CLASS = event('SET_RECOGNIZED_CLASS');
exports.SET_METADATA = event('SET_METADATA');
exports.UPDATE_SIMULATOR_SETTINGS = event('UPDATE_SIMULATOR_SETTINGS');
exports.UPDATE_SIMULATOR_LIST = event('UPDATE_SIMULATOR_LIST');
exports.UPDATE_URL_LIST = event('UPDATE_URL_LIST');
exports.ERROR = event('ERROR');
exports.ADMIN_UI_READY = event('IPC/ADMIN_UI_READY');
exports.CLOSE_SIMULATOR = event('IPC/CLOSE_SIMULATOR');
exports.FOCUS_SIMULATOR = event('IPC/FOCUS_SIMULATOR');
exports.OPEN_DEV_TOOLS = event('IPC/OPEN_DEV_TOOLS');
exports.CHANGE_CATEGORY_SETTINGS = event('CHANGE_CATEGORY_SETTINGS');
exports.LOAD_APP = event('IPC/LOAD_APP');
exports.APP_CONFIG = event('IPC/APP_CONFIG');
exports.ADD_APP_NAME_URL_ASSOCIATION = event('IPC/ADD_APP_NAME_URL_ASSOCIATION');
exports.REMOVE_APP_NAME_URL_ASSOCIATION = event('IPC/REMOVE_APP_NAME_URL_ASSOCIATION');
exports.SAVE_SCALE_FACTOR = event('IPC/SAVE_SCALE_FACTOR');
exports.SAVE_PIX = event('IPC/SAVE_PIX');
exports.SAVE_USER_SIMPLE_CLASSES = event('SAVE_USER_SIMPLE_CLASSES');
exports.SAVE_USER_POSITION_CLASSES = event('SAVE_USER_POSITION_CLASSES');

// Simulated app events
exports.MOUSE_MOVE = event('MOUSE_MOVE');
exports.SIMPLE_CLICK = event('SIMPLE_CLICK');
exports.POSITION_CLICK = event('POSITION_CLICK');

// Lampix.js events
exports.REGISTER_MOVEMENT = event('REGISTER_MOVEMENT');
exports.REGISTER_SIMPLE = event('REGISTER_SIMPLE');
exports.REGISTER_POSITION = event('REGISTER_POSITION');
exports.TRANSFORM_COORDINATES = event('TRANSFORM_COORDINATES');
exports.CHANGE_CATEGORY_SETTINGS = event('CHANGE_CATEGORY_SETTINGS');
exports.GET_LAMPIX_INFO = event('IPC/GET_LAMPIX_INFO');
exports.GET_APPS = event('GET_APPS');
exports.SWITCH_TO_APP = event('SWITCH_TO_APP');

// lampixjs v1 events
exports.ADD_WATCHERS = event('ADD_WATCHERS');
exports.REMOVE_WATCHERS = event('REMOVE_WATCHERS');

// Logger
exports.LOG_R_TO_M = event('LOG_R_TO_M');
exports.LOG_M_TO_R = event('LOG_M_TO_R');

// General
exports.BEFORE_UNLOAD = event('BEFORE_UNLOAD');
