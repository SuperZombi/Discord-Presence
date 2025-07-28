const App = () => {
	const [showLoader, setShowLoader] = React.useState(true)
	React.useEffect(() => {
		setTimeout(_=>{
			setShowLoader(false)
		}, 1000)
	}, [])

	return (
		<div>
			<Loader show={showLoader}/>
			<Presence actType="playing" state="State" details="Details"
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
			</Card>
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
