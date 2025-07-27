import discordrpc
from discordrpc import Activity
import time
from discordrpc.utils import timestamp

# https://github.com/SuperZombi/Discord-RPC/blob/main/DOCS.md
rpc = discordrpc.RPC(app_id=1397914682659963050)
rpc.set_activity(
	state="State",
	details="Details",
	# act_type=Activity.Listening,
	ts_start=int(time.time()) - 100,
	# ts_end=ts_end,
)
rpc.run()
