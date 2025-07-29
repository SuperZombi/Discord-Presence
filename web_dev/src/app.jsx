const App = () => {
	const [showLoader, setShowLoader] = React.useState(true)
	const [loaded, setLoaded] = React.useState(false)
	const [presenceData, setPresenceData] = React.useState({})
	const [app_id, set_app_id] = React.useState()
	const [login_errors, set_login_errors] = React.useState([])

	React.useEffect(() => {
		init_lang().then(async _=>{
			const settings = await eel.get_settings()()
			if (settings.app_id){
				connectRPC(settings.app_id)
			} else {
				setTimeout(_=>{setShowLoader(false)}, 1000)
			}
			if (settings.presence){
				setPresenceData(settings.presence)
				if (settings.auto_apply){
					main_apply(settings.presence)
				}
			}
			setLoaded(true)
		})
	}, [])

	const connectRPC = async (app_id) => {
		setShowLoader(true)
		let result = await eel.connectRPC(app_id)()
		if (result.success){
			set_app_id(result.app_id)
		}
		else if (result.error){
			set_login_errors([{"text": result.error}])
		}
		setTimeout(_=>{
			setTimeout(_=>{setShowLoader(false)}, 1000)
		}, 1000)
	}

	const main_apply = async (data) => {
		let result = await eel.set_activity(data)()
		console.log(result)
	}

	if (!loaded) {
		return <Loader show={showLoader}/>
	}
	return (
		<div>
			{app_id ? <MainForm values={presenceData} onApply={main_apply}/> : (
				<Login tryConnect={connectRPC} errors={login_errors}/>
			)}
			<Loader show={showLoader}/>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
