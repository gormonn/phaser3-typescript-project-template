export const CANVAS_WIDTH = 1500;
export const CANVAS_HEIGHT = 640;

export const EDGEBOARD_X = 300;
export const EDGEBOARD_Y = 0;

export const FPS_TIME      = 1000/24;
export const DISABLE_SOUND_MOBILE = false;
export const FONT_GAME = "arialbold";

export const STATE_LOADING = 0;
export const STATE_MENU    = 1;
export const STATE_HELP    = 1;
export const STATE_GAME    = 3;

export const GAME_STATE_IDLE         = 0;
export const GAME_STATE_SPINNING     = 1;
export const GAME_STATE_SHOW_ALL_WIN = 2;
export const GAME_STATE_SHOW_WIN     = 3;

export const REEL_STATE_START   = 0;
export const REEL_STATE_MOVING = 1;
export const REEL_STATE_STOP    = 2;

export const ON_MOUSE_DOWN = 0;
export const ON_MOUSE_UP   = 1;
export const ON_MOUSE_OVER = 2;
export const ON_MOUSE_OUT  = 3;
export const ON_DRAG_START = 4;
export const ON_DRAG_END   = 5;

export const REEL_OFFSET_X = 380;
export const REEL_OFFSET_Y = 84;

export const NUM_REELS = 5;
export const NUM_ROWS = 3;
export const NUM_SYMBOLS = 8;
export const WILD_SYMBOL = 8;
export const NUM_PAYLINES = 20;
export const SYMBOL_SIZE = 140;
export const SPACE_BETWEEN_SYMBOLS = 10;
export const MAX_FRAMES_REEL_EASE = 16;
export const REEL_START_Y = REEL_OFFSET_Y - (SYMBOL_SIZE * 3);
export const REEL_ARRIVAL_Y = REEL_OFFSET_Y + (SYMBOL_SIZE * 3);
export const MIN_BET = 0.05;
export const MAX_BET = 0.5;

// константы без значений
export const MIN_REEL_LOOPS = null;
export const REEL_DELAY = null;
export const TIME_SHOW_WIN = null;
export const TIME_SHOW_ALL_WINS = null;
export const TOTAL_MONEY = null;
export const WIN_OCCURRENCE = null;
export const SLOT_CASH = null;
export const MIN_WIN = null;
export const PAYTABLE_VALUES = null;

export const ENABLE_FULLSCREEN = null;
export const ENABLE_CHECK_ORIENTATION = null;
export const SHOW_CREDITS = null;