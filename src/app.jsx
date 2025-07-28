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
		</div>
	)
}

const MainForm = () => {
	const currentTimestamp = () => Math.floor(Date.now() / 1000);
	const [actType, setActType] = React.useState("playing")
	const [details, setDetails] = React.useState()
	const [state, setState] = React.useState()

	const [timestamp, setTimestamp] = React.useState("normal")
	const [ts_start, set_ts_start] = React.useState()
	const [ts_end, set_ts_end] = React.useState()

	const [large_image, set_large_image] = React.useState()
	const [small_image, set_small_image] = React.useState()

	const [large_text, set_large_text] = React.useState()
	const [small_text, set_small_text] = React.useState()

	const [state_url, set_state_url] = React.useState()
	const [details_url, set_details_url] = React.useState()

	const [party_current, set_party_current] = React.useState(0)
	const [party_total, set_party_total] = React.useState(0)
	const [party_size, set_party_size] = React.useState([])

	React.useEffect(() => {
		if (party_total === 0){
			set_party_size([])
		} else {
			set_party_size([party_current, party_total])
		}
	}, [party_current, party_total])

	const [button_1_text, set_button_1_text] = React.useState()
	const [button_1_url, set_button_1_url] = React.useState()
	const [button_2_text, set_button_2_text] = React.useState()
	const [button_2_url, set_button_2_url] = React.useState()
	const [buttons, set_buttons] = React.useState([])

	React.useEffect(() => {
		const buttons = [];
		if (button_1_text && button_1_url) {
			buttons.push({ label: button_1_text, url: button_1_url })
		}
		if (button_2_text && button_2_url) {
			buttons.push({ label: button_2_text, url: button_2_url })
		}
		set_buttons(buttons);
	}, [button_1_text, button_1_url, button_2_text, button_2_url])

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
	React.useEffect(() => {
		handleTimestamp(timestamp)
	}, [timestamp])

	const handleMainClick = () => {
		console.log("here")
	}

	return (
		<Container>
			<Sticky className="w-96" classNameChild="top-3">
				<Presence actType={actType} state={state} details={details}
					ts_start={ts_start} ts_end={ts_end}
					large_image={large_image} small_image={small_image}
					large_text={large_text} small_text={small_text}
					state_url={state_url} details_url={details_url}
					party_size={party_size}
					buttons={buttons}
				/>
				<Button className="w-full mt-3" onClick={handleMainClick}>Apply</Button>
			</Sticky>
			
			<Card className="items-center w-96">

				<Select label="Activity" selected={actType} options={[
					{ value: "playing", label: "Playing" },
					{ value: "listening", label: "Listening" },
					{ value: "watching", label: "Watching" },
				]} onChange={setActType}/>

				<Select label="Timestamp" selected={timestamp} options={[
					{ value: "normal", label: "Normal" },
					{ value: "local_time", label: "Local time" },
				]} onChange={handleTimestamp}/>

				<Input placeholder="Details" label="Details"
					value={details} name="details"
					onChange={val => {
						setDetails(val)
						if (val === ""){
							set_details_url("")
						}
					}}
				/>

				{details ? (
					<React.Fragment>
						<Input placeholder="Details URL" label="Details URL"
							value={details_url} name="details_url"
							onChange={set_details_url}
						/>
						<Hr/>
					</React.Fragment>
				) : null}

				<Input placeholder="State" label="State"
					name="state" value={state}
					onChange={val => {
						setState(val)
						if (val === ""){
							set_state_url("")
						}
					}}
				/>

				{(state && party_size.length === 0) ? (
					<React.Fragment>
						<Input placeholder="State URL" label="State URL"
							value={state_url} name="state_url"
							onChange={set_state_url}
						/>
						<Hr/>
					</React.Fragment>
				) : null}

				<InputGroup label="Party">
					<Input type="number" name="party_current" max={party_total}
						onChange={set_party_current}
						value={party_current}
					/>
					<Input type="number" name="party_total"
						onChange={val => {
							set_party_total(val)
							if (val > 0){
								set_state_url("")
							}
						}}
						value={party_total}
					/>
				</InputGroup>

				<Hr/>

				<Input placeholder="https://image.png" label="Large Image"
					name="large_image" value={large_image}
					onChange={val => {
						set_large_image(val)
						if (val === ""){
							set_large_text("")
						}
					}}
				/>
				{large_image ? (
					<React.Fragment>
						<Input placeholder="Large Image Tooltip" label="Large Image Tooltip"
							value={large_text} name="large_text"
							onChange={set_large_text}
						/>
						<Hr/>
					</React.Fragment>
				) : null}

				<Input placeholder="https://image.png" label="Small Image"
					name="small_image" value={small_image}
					onChange={val => {
						set_small_image(val)
						if (val === ""){
							set_small_text("")
						}
					}}
				/>
				{small_image ? (
					<Input placeholder="Small Image Tooltip" label="Small Image Tooltip"
						value={small_text} name="small_text"
						onChange={set_small_text}
					/>
				) : null}

				<Hr/>

				<Input placeholder="Button text" label="Button text"
					name="button_1_text" value={button_1_text}
					onChange={val=>{
						set_button_1_text(val)
						if (val === ""){
							set_button_1_url("")
						}
					}}
				/>
				{button_1_text ? (
					<React.Fragment>
						<Input placeholder="Button URL" label="Button URL"
							name="button_1_url" value={button_1_url}
							onChange={set_button_1_url}
						/>

						<Hr/>

						<Input placeholder="Button text" label="Button text"
							name="button_2_text" value={button_2_text}
							onChange={val=>{
								set_button_2_text(val)
								if (val === ""){
									set_button_2_url("")
								}
							}}
						/>

						{button_2_text ? (
							<Input placeholder="Button URL" label="Button URL"
								name="button_2_url" value={button_2_url}
								onChange={set_button_2_url}
							/>
						) : null}
					</React.Fragment>
				) : null}

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
