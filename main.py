import eel
import time
import sys, os
import json
import discordrpc
from discordrpc.types import Activity, StatusDisplay
from discordrpc.utils import progress_bar, use_local_time
from pystray import Icon, Menu, MenuItem
from PIL import Image
import threading

DEV_MOD = os.path.exists("web_dev")
SETTINGS = {}

def resource_path(relative_path=""):
	base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
	return os.path.join(base_path, relative_path)

def save_settings():
	with open(os.path.join(os.getcwd(), "settings.json"), 'w', encoding='utf-8') as file:
		file.write(json.dumps(SETTINGS, indent=4, ensure_ascii=False))

@eel.expose
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
	if not rpc or not rpc.ipc.connected:
		try:
			rpc = discordrpc.RPC(app_id, exit_if_discord_close=False, exit_on_disconnect=False)
			update_settings("app_id", app_id)
			if rpc.ipc.connected:
				threading.Thread(target=rpc.run, daemon=True).start()
				return {
					"success": True,
					"user": vars(rpc.User),
					"app_id": rpc.app_id,
					"app_name": rpc.App.name,
					"app_icon": rpc.App.icon
				}
			return {
				"success": False,
				"error": "Discord is closed"
			}
		except Exception as e:
			return {
				"success": False,
				"error": str(e)
			}
	else:
		return {
			"success": True,
			"user": vars(rpc.User),
			"app_id": rpc.app_id,
			"app_name": rpc.App.name,
			"app_icon": rpc.App.icon
		}

@eel.expose
def disconnect():
	global rpc
	rpc.clear()
	rpc.disconnect()
	rpc = None
	update_settings("app_id", None)

@eel.expose
def set_activity(data):
	if data.get("clear"):
		rpc.clear()
		if SETTINGS.get("remember_presence", True):
			update_settings("presence", {})
		return
	allowed_keys = [
		"name", "state", "details",
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
	statusTypeMap = {
		"name": StatusDisplay.Name,
		"state": StatusDisplay.State,
		"details": StatusDisplay.Details,
	}
	if "act_type" in data.keys():
		final["act_type"] = actTypeMap[data["act_type"]]
	if "status_type" in data.keys():
		final["status_type"] = statusTypeMap[data["status_type"]]
	if data.get("timestamp") == "local_time":
		final.update(use_local_time())
	if "media_current" in data.keys() and "media_duration" in data.keys():
		final.update(progress_bar(data["media_current"], data["media_duration"]))

	if DEV_MOD:
		print(data)
		print(final)
	res = rpc.set_activity(**final)
	if res and SETTINGS.get("remember_presence", True):
		update_settings("presence", data)
	return res

def service_worker():
	while True:
		if SETTINGS.get("app_id"):
			if not rpc or not rpc.ipc.connected:
				res = connectRPC(SETTINGS.get("app_id"))
				if res.get("success") and SETTINGS.get("auto_apply") and SETTINGS.get("presence"):
					set_activity(SETTINGS.get("presence"))
		time.sleep(15)

def on_open(icon, item):
	eel.show("dev.html" if DEV_MOD else "index.html")

def on_exit(icon, item):
	os._exit(0)

eel.init(resource_path("web_dev" if DEV_MOD else "web"))

icon_image = Image.open(
	os.path.join(
		resource_path("web_dev" if DEV_MOD else "web"),
		"assets", "logo.png"
	)
)
menu = Menu(
	MenuItem('Open', on_open),
	MenuItem('Exit', on_exit)
)
icon = Icon("Discord Presence", icon_image, "Discord Presence", menu)
threading.Thread(target=icon.run, daemon=True).start()
threading.Thread(target=service_worker, daemon=True).start()

browsers = ['chrome', 'default']
for browser in browsers:
	try:
		eel.start("dev.html" if DEV_MOD else "index.html",
			size=(1000, 800), mode=browser, port=0,
			close_callback=lambda a, b: None
		)
		icon.stop()
		break
	except Exception:
		print(f"Failed to launch the app using {browser.title()} browser")
