const App = () => {
	const [showLoader, setShowLoader] = React.useState(true)
	React.useEffect(() => {
		setTimeout(_=>{
			setShowLoader(false)
		}, 100)
	}, [])

	return (
		<div>
			<MainForm/>
			<Loader show={showLoader}/>
			{/*<Presence actType="playing" state="State" details="Details"
				large_image = "https://cdn.discordapp.com/embed/avatars/1.png"
				small_image = "https://cdn.discordapp.com/app-assets/383226320970055681/1359299466493956258.png"
				large_text="Hello world" small_text="Small text"
				state_url="https://github.com/"
				details_url = "https://github.com/"
				ts_start = {Math.floor(Date.now() / 1000) - 100}
				ts_end = {Math.floor(Date.now() / 1000) + 100}
				party_size = {[2, 6]}
				buttons = {[
					{"label": "Ask to join", "url": "https://www.google.com/"},
					{"label": "Ask to join", "url": "https://www.google.com/"},
				]}
			/>
			<Card>
				<Input placeholder="Type some text">Hello</Input>
				<Input type="number" min={4}></Input>
				<Button>Some button</Button>
				<Button disabled={true}>Disabled button</Button>
				<Select options={[
					{ value: "apple", label: "Apple" },
					{ value: "banana", label: "Banana" },
					{ value: "orange", label: "Orange" },
				]} onChange={e=>console.log(e)}/>
			</Card>*/}
		</div>
	)
}

const MainForm = () => {
	const currentTimestamp = () => Math.floor(Date.now() / 1000);
	const [actType, setActType] = React.useState("playing")
	const [details, setDetails] = React.useState()
	const [state, setState] = React.useState()

	const [ts_start, set_ts_start] = React.useState(currentTimestamp())
	const [ts_end, set_ts_end] = React.useState()

	const [large_image, set_large_image] = React.useState("assets/avatar.png")
	const [small_image, set_small_image] = React.useState()

	const handleTimestamp = val=>{

		if (val === "local_time"){
			const now = new Date();
			const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
			const calculated = currentTimestamp() - secondsSinceMidnight
			set_ts_start(calculated)
			set_ts_end(null)
		}
		else {
			set_ts_start(currentTimestamp())
			set_ts_end(null)
		}
	}

	return (
		<Container>
			<div className="w-96">
				<Presence actType={actType} state={state} details={details}
						ts_start={ts_start} ts_end={ts_end}
						large_image={large_image} small_image={small_image}
						// large_text="Hello world" small_text="Small text"
						// state_url="https://github.com/"
						// details_url = "https://github.com/"
						// ts_start = {Math.floor(Date.now() / 1000) - 100}
						// ts_end = {Math.floor(Date.now() / 1000) + 100}
						// party_size = {[2, 6]}
						// buttons = {[
						// 	{"label": "Ask to join", "url": "https://www.google.com/"},
						// 	{"label": "Ask to join", "url": "https://www.google.com/"},
						// ]}
					/>
				<Button className="w-full mt-3">Apply</Button>
			</div>
			
			<Card className="items-center w-96">

				<Select label="Activity" selected="playing" options={[
					{ value: "playing", label: "Playing" },
					{ value: "listening", label: "Listening" },
					{ value: "watching", label: "Watching" },
				]} onChange={val => setActType(val)}/>

				<Input placeholder="Details" label="Details"
					name="details" onChange={val => setDetails(val) }
				/>

				<Input placeholder="State" label="State"
					name="state" onChange={val => setState(val) }
				/>

				<Select label="Timestamp" selected="normal" options={[
					{ value: "normal", label: "Normal" },
					{ value: "local_time", label: "Local time" },
				]} onChange={handleTimestamp}/>

				<Hr/>

				<Input placeholder="https://image.png" label="Large image"
					name="large_image" onChange={val => set_large_image(val) }
				/>

				<Input placeholder="https://image.png" label="Small image"
					name="small_image" onChange={val => set_small_image(val) }
				/>
			</Card>
		</Container>
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
