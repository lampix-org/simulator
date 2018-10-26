const event = (name) => `lx-simulator/IPC/${name}`;

// Admin UI events
exports.TOGGLE_MOVEMENT = event('TOGGLE_MOVEMENT');
exports.SET_WATCHER_NAME = event('SET_CLASSIFIER');
exports.SET_RECOGNIZED_CLASS = event('SET_RECOGNIZED_CLASS');
exports.SET_METADATA = event('SET_METADATA');
exports.UPDATE_SIMULATOR_SETTINGS = event('UPDATE_SIMULATOR_SETTINGS');
exports.UPDATE_SIMULATOR_LIST = event('UPDATE_SIMULATOR_LIST');
exports.UPDATE_URL_LIST = event('UPDATE_URL_LIST');
exports.ERROR = event('ERROR');
exports.ADMIN_UI_READY = event('ADMIN_UI_READY');
exports.CLOSE_SIMULATOR = event('CLOSE_SIMULATOR');
exports.FOCUS_SIMULATOR = event('FOCUS_SIMULATOR');
exports.OPEN_DEV_TOOLS = event('OPEN_DEV_TOOLS');
exports.CHANGE_CATEGORY_SETTINGS = event('CHANGE_CATEGORY_SETTINGS');
exports.LOAD_APP = event('LOAD_APP');
exports.APP_CONFIG = event('APP_CONFIG');
exports.ADD_APP_NAME_URL_ASSOCIATION = event('ADD_APP_NAME_URL_ASSOCIATION');
exports.REMOVE_APP_NAME_URL_ASSOCIATION = event('REMOVE_APP_NAME_URL_ASSOCIATION');
exports.SAVE_SCALE_FACTOR = event('SAVE_SCALE_FACTOR');
exports.SAVE_PIX = event('SAVE_PIX');
exports.SAVE_USER_DEFINED_CLASSES = event('SAVE_USER_DEFINED_CLASSES');

// Simulated app input events
exports.MOUSE_MOVE = event('MOUSE_MOVE');
exports.LEFT_CLICK = event('LEFT_CLICK');

// lampixjs events
exports.TRANSFORM_COORDINATES = event('TRANSFORM_COORDINATES');
exports.CHANGE_CATEGORY_SETTINGS = event('CHANGE_CATEGORY_SETTINGS');
exports.GET_LAMPIX_INFO = event('GET_LAMPIX_INFO');
exports.GET_APPS = event('GET_APPS');
exports.SWITCH_TO_APP = event('SWITCH_TO_APP');
exports.ADD_WATCHERS = event('ADD_WATCHERS');
exports.REMOVE_WATCHERS = event('REMOVE_WATCHERS');
exports.PAUSE_WATCHERS = event('PAUSE_WATCHERS');
exports.RESUME_WATCHERS = event('RESUME_WATCHERS');
exports.UPDATE_WATCHER_SHAPE = event('UPDATE_WATCHER_SHAPE');

// Logger
exports.LOG_R_TO_M = event('LOG_R_TO_M');
exports.LOG_M_TO_R = event('LOG_M_TO_R');

// General
exports.BEFORE_UNLOAD = event('BEFORE_UNLOAD');
