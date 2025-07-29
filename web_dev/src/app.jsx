const App = () => {
	const [showLoader, setShowLoader] = React.useState(true)
	const [loaded, setLoaded] = React.useState(false)
	const [presenceData, setPresenceData] = React.useState({})
	const [connected, setConnected] = React.useState(false)
	const [app_id, set_app_id] = React.useState()
	const [login_errors, set_login_errors] = React.useState([])
	const [user, set_user] = React.useState()
	const [username, set_username] = React.useState()
	const [user_avatar, set_user_avatar] = React.useState()
	const [showSettings, setShowSettings] = React.useState(false)
	const [settingsValues, setsettingsValues] = React.useState({})

	const load_settings = async _=>{
		return await eel.get_settings()()
	}
	const onSettingsChange = async (key, val)=>{
		await eel.update_settings(key, val)()
		if (key === "lang"){
			window.location.reload()
		}
	}

	React.useEffect(() => {
		load_settings().then(async settings=>{
			const current_lang = await init_lang(settings.lang)
			settings.lang = current_lang
			setsettingsValues(settings)
			if (settings.app_id){
				await connectRPC(settings.app_id)
				if (settings.presence && settings.auto_apply){
					main_apply(settings.presence)
				}
			} else {
				setTimeout(_=>{setShowLoader(false)}, 1000)
			}
			if (settings.presence){
				setPresenceData(settings.presence)
			}
			setLoaded(true)
		})
	}, [])

	const connectRPC = async (app_id) => {
		setShowLoader(true)
		return new Promise((resolve)=>{
			setTimeout(async _=>{
				let result = await eel.connectRPC(app_id)()
				if (result.success){
					setConnected(true)
					set_login_errors([])
					set_app_id(result.app_id)
					if (result.user){
						set_user(result.user.name)
						set_username(result.user.username)
						set_user_avatar(result.user.avatar)
					}
				}
				else if (result.error){
					set_login_errors([{"text": result.error}])
				}
				resolve()
				setTimeout(_=>{
					setTimeout(_=>{setShowLoader(false)}, 1000)
				}, 1000)
			}, 10)
		})
	}

	const main_apply = async (data) => {
		await eel.set_activity(data)()
	}
	const main_disconnect = async _=>{
		setShowLoader(true)
		await eel.disconnect()()
		setConnected(false)
		setTimeout(_=>{
			setTimeout(_=>{setShowLoader(false)}, 1000)
		}, 100)
	}

	if (!loaded) {
		return <Loader show={showLoader}/>
	}
	return (
		<div>
			{connected ? (
				<React.Fragment>
					<Header user={user} username={username}
						user_avatar={user_avatar}
						openSettings={_=>setShowSettings(true)}
					/>
					<MainForm values={presenceData}
						onApply={main_apply} onDisconnect={main_disconnect}
						showSettings={showSettings} hideSetting={_=>setShowSettings(false)}
						settingsValues={settingsValues} settingsOnChange={onSettingsChange}
					/>
				</React.Fragment>
			) : (
				<Login tryConnect={connectRPC} errors={login_errors}/>
			)}
			<Loader show={showLoader}/>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
