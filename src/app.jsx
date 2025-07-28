const App = () => {
	const [showLoader, setShowLoader] = React.useState(true)
	const [loaded, setLoaded] = React.useState(false)
	const [presenceData, setPresenceData] = React.useState({})
	const [app_id, set_app_id] = React.useState()

	React.useEffect(() => {
		init_lang().then(async _=>{
			const data = await get_settings()
			if (data.app_id){
				set_app_id(data.app_id)
				if (data.presence) setPresenceData(data.presence)
			}
			setLoaded(true)
			setTimeout(_=>{setShowLoader(false)}, 1000)
		})
	}, [])

	const main_apply = (data) => {
		console.log(data)
	}

	if (!loaded) {
		return <Loader show={showLoader}/>
	}
	return (
		<div>
			{app_id ? <MainForm values={presenceData} onApply={main_apply}/> : <Login/>}
			<Loader show={showLoader}/>
		</div>
	)
}

async function get_settings() {
	const logined_data = {
		app_id: 1397914682659963050,
		presence: {
			act_type: "listening",
			details: "My details",
			state: "My state",
			timestamp: "local_time",
		}
	}
	const not_logined_data = {}
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(not_logined_data)
			resolve(logined_data)
		}, 0)
	})
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
