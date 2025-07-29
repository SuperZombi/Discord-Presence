import eel
import sys, os
import json
import discordrpc
from discordrpc import Activity, Progressbar, use_local_time

DEV_MOD = False
SETTINGS = {}

def resource_path(relative_path=""):
	base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
	return os.path.join(base_path, relative_path)

def save_settings():
	with open(os.path.join(os.getcwd(), "settings.json"), 'w', encoding='utf-8') as file:
		file.write(json.dumps(SETTINGS, indent=4, ensure_ascii=False))

def update_settings(key, value):
	global SETTINGS
	SETTINGS[key] = value
	save_settings()

def load_settings():
	global SETTINGS
	set_file = os.path.join(os.getcwd(), "settings.json")
	if os.path.exists(set_file):
		with open(set_file, 'r', encoding='utf-8') as file:
			SETTINGS = json.loads(file.read())
load_settings()

@eel.expose
def get_settings(): return SETTINGS

rpc = None

@eel.expose
def connectRPC(app_id):
	global rpc
	if not rpc:
		try:
			rpc = discordrpc.RPC(app_id)
			update_settings("app_id", app_id)
			return {
				"success": True,
				"app_id": app_id
			}
		except Exception as e:
			return {
				"error": str(e)
			}
	else:
		print("rpc alreay connected")

@eel.expose
def set_activity(data):
	allowed_keys = [
		"state", "details", 
        "state_url", "details_url",
        "large_image", "large_text",
        "small_image", "small_text",
        "party_size", "buttons"
	]
	final = {k: v for k, v in data.items() if k in allowed_keys}

	actTypeMap = {
		"playing": Activity.Playing,
		"listening": Activity.Listening,
		"watching": Activity.Watching,
	}
	if "act_type" in data.keys():
		final["act_type"] = actTypeMap[data["act_type"]]
	if data.get("timestamp") == "local_time":
		final.update(use_local_time())
	if "media_current" in data.keys() and "media_duration" in data.keys():
		final.update(Progressbar(data["media_current"], data["media_duration"]))

	print(data)
	print(final)
	res = rpc.set_activity(**final)
	if res: update_settings("presence", data)
	return res


eel.init(resource_path("web_dev" if DEV_MOD else "web"))

browsers = ['chrome', 'default']
for browser in browsers:
	try:
		eel.start("dev.html" if DEV_MOD else "index.html", size=(900, 800), mode=browser, port=0)
		break
	except Exception:
		print(f"Failed to launch the app using {browser.title()} browser")
