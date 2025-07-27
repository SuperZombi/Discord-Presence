const Presence = ({
	actType = "playing",
	appName = "AppName",
	state="",
	details="",
	state_url="",
	details_url="",
	large_image="https://cdn.discordapp.com/embed/avatars/1.png",
	small_image="",
	ts_start=Math.floor(Date.now() / 1000),
	ts_end="",
	buttons=[]
}) => {
	return (
		<div className="
			flex flex-col gap-2
			w-[400px] p-3
			rounded-xl
			bg-[#3f4048] text-[#dfe0e2]
		">
			<Header actType={actType} appName={appName} details={details}/>
			<Body
				large_image={large_image} small_image={small_image}
				actType={actType} appName={appName}
				state={state} details={details}
				state_url={state_url} details_url={details_url}
				ts_start={ts_start} ts_end={ts_end}
			/>
			<Bottom buttons={buttons}/>
		</div>
	)
}

const Header = ({
	actType, appName, details
}) => {
	function renderAction(){
		if (actType === "playing"){
			return "Playing"
		}
		else if (actType === "listening"){
			return details ? `Listening to ${appName}` : "Listening to"
		}
		else if (actType === "watching"){
			return details ? `Watching ${appName}` : "Watching"
		}
	}
	return (
		<div>
			<span className="text-sm">{renderAction()}</span>
		</div>
	)
}

const Body = ({
	actType,
	large_image, small_image,
	appName, state, details,
	state_url, details_url,
	ts_start, ts_end
}) => {
	return (
		<div className="flex items-center gap-3">
			<LeftBody large_image={large_image} small_image={small_image}/>
			<RightBody
				actType={actType} appName={appName}
				state={state} details={details}
				state_url={state_url} details_url={details_url}
				ts_start={ts_start} ts_end={ts_end}
			/>
		</div>
	)
}

const LeftBody = ({
	large_image, small_image,
}) => {
	return (
		<div className="relative shrink-0">
			<div>
				<img className="rounded-xl"
					src={large_image} height="100px" width="100px"
				/>
			</div>

			{small_image ? (
				<div className="absolute -bottom-1 -right-1">
					<img className="rounded-full outline-4 outline-[#3f4048]"
						src={small_image} height="32px" width="32px"
					/>
				</div>
			) : null}

		</div>
	)
}

const RightBody = ({
	actType, appName,
	state, details,
	state_url, details_url,
	ts_start, ts_end
}) => {
	return (
		<div className="w-full flex flex-col gap-1">
			<ActivityInfo actType={actType} appName={appName}
				state={state} details={details}
				state_url={state_url} details_url={details_url}
			/>
			{(["listening", "watching"].includes(actType) && ts_end) ? (
				<Progressbar ts_start={ts_start} ts_end={ts_end}/>
			) : (
				<Timer ts_start={ts_start} actType={actType}/>
			)}
		</div>
	)
}

const ActivityInfo = ({
	actType, appName, state, details,
	state_url, details_url
}) => {
	const openUrl = (url) => {
		window.open(url, '_blank')
	}
	return (
		<div className="flex flex-col">
			{(["listening", "watching"].includes(actType) && details) ? null : (
				<div className="font-bold">{appName}</div>
			)}

			{(details && ["listening", "watching"].includes(actType)) ? 
			(
				<div className={`font-bold ${details_url ? "hover:underline cursor-pointer" : ""}`}
					onClick={details_url ? _=>openUrl(details_url) : null}
				>
					{details}
				</div>
			) : (
				<div className={`text-sm ${details_url ? "hover:underline cursor-pointer" : ""}`}
					onClick={details_url ? _=>openUrl(details_url) : null}
				>
					{details}
				</div>
			)}

			{state ? (
				<div className={`text-sm ${state_url ? "hover:underline cursor-pointer" : ""}`}
					onClick={state_url ? _=>openUrl(state_url) : null}
				>
					{state}
				</div>
			) : null}
		</div>
	)
}

const Bottom = ({
	buttons
}) => {
	return (
		<div className="flex gap-2.5">
			{buttons.slice(0, 2).map((item, index) => (
				<Button key={index} label={item.label} url={item.url}/>
			))}
		</div>
	)
}
const Button = ({
	label, url
}) => {
	const onClick = _=>{
		window.open(url, '_blank')
	}
	return (
		<div
			className="
				bg-[#5865f2]
				hover:bg-[#4752c4]
				duration-200 ease-out
				text-white text-center
				w-full px-4 py-2
				rounded-xl
				select-none
				cursor-pointer
			"
			onClick={onClick}
		>
			{label}
		</div>
	)
}

const Progressbar = ({
	ts_start, ts_end
}) => {
	const total = ts_end - ts_start;
	const unixTime = Math.floor(Date.now() / 1000);
	const [current, setCurrent] = React.useState(unixTime - ts_start);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => {
				if (prev >= total) {
					clearInterval(interval);
					return prev;
				}
				return prev + 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [total]);

	const percent = (current / total) * 100;

	return (
		<div className="flex items-center gap-2.5">
			<span className="font-mono text-sm">{formatTime(current)}</span>
			<div className="bg-[gray] w-full h-0.5 rounded-xl">
				<div className="bg-[lightgrey] h-full rounded-xl"
					style={{ width: `${percent}%` }}
				/>
			</div>
			<span className="font-mono text-sm">{formatTime(total)}</span>
		</div>
	)
}

const Timer = ({
	ts_start, actType
}) => {
	const unixTime = Math.floor(Date.now() / 1000);
	const [seconds, setSeconds] = React.useState(unixTime - ts_start);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center gap-1">
			{
				actType === "listening" ? (
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
						<path fill="#75c383" d="M8.65 1.51A2 2 0 0 0 6 3.41v9.88A3.98 3.98 0 0 0 4.5 13C2.57 13 1 14.34 1 16s1.57 3 3.5 3S8 17.66 8 16V5.4l11 3.81v7.08a3.98 3.98 0 0 0-1.5-.29c-1.93 0-3.5 1.34-3.5 3s1.57 3 3.5 3 3.5-1.34 3.5-3V7.03c0-.74-.47-1.4-1.18-1.65L8.65 1.51Z"/>
					</svg>
				) : actType === "watching" ? (
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
						<path fill="#75c383" d="M4 3a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H4Zm2 17a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H6Z"/>
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
						<path fill="#75c383" fillRule="evenodd" clipRule="evenodd" d="M20.97 4.06c0 .18.08.35.24.43.55.28.9.82 1.04 1.42.3 1.24.75 3.7.75 7.09v4.91a3.09 3.09 0 0 1-5.85 1.38l-1.76-3.51a1.09 1.09 0 0 0-1.23-.55c-.57.13-1.36.27-2.16.27s-1.6-.14-2.16-.27c-.49-.11-1 .1-1.23.55l-1.76 3.51A3.09 3.09 0 0 1 1 17.91V13c0-3.38.46-5.85.75-7.1.15-.6.49-1.13 1.04-1.4a.47.47 0 0 0 .24-.44c0-.7.48-1.32 1.2-1.47l2.93-.62c.5-.1 1 .06 1.36.4.35.34.78.71 1.28.68a42.4 42.4 0 0 1 4.4 0c.5.03.93-.34 1.28-.69.35-.33.86-.5 1.36-.39l2.94.62c.7.15 1.19.78 1.19 1.47ZM20 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 7a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 1 1 0-2h1V7Z"/>
					</svg>
				)
			}
			<span className="font-mono font-bold text-xs text-[#75c383]">
				{formatTime(seconds)}
			</span>
		</div>
	)
}


function formatTime(totalSeconds){
	const hrs = Math.floor(totalSeconds / 3600);
	const mins = Math.floor((totalSeconds % 3600) / 60);
	const secs = totalSeconds % 60;

	const padded = (n) => n.toString().padStart(2, "0");

	if (hrs > 0) {
		return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
	} else {
		return `${padded(mins)}:${padded(secs)}`;
	}
}
