const App = () => {
	const [showLoader, setShowLoader] = React.useState(true)
	const [loaded, setLoaded] = React.useState(false)

	const test_init = {
		act_type: "listening",
		details: "My details",
		state: "My state",
		timestamp: "local_time",
	}

	React.useEffect(() => {
		init_lang().then(_=>{
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
			<MainForm values={test_init} onApply={main_apply}/>
			<Loader show={showLoader}/>
		</div>
	)
}

const Loader = ({show=true}) => {
	const [shouldRender, setShouldRender] = React.useState(show)
	React.useEffect(() => {
		if (!show){
			const timeout = setTimeout(() => setShouldRender(false), 200)
			return () => clearTimeout(timeout);
		} else {
			setShouldRender(true)
		}
	}, [show])

	return shouldRender && (
		<div className={`
			fixed inset-0 flex items-center justify-center
			z-50 bg-[#323339]
			duration-200 ease-out
			${show ? "opacity-100" : "opacity-0"}
		`}>
			<video src="assets/loading.webm" autoPlay muted loop></video>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
