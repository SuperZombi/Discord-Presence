const MainForm = () => {
	const currentTimestamp = () => Math.floor(Date.now() / 1000)
	const [actType, setActType] = React.useState("playing")
	const [details, setDetails] = React.useState()
	const [state, setState] = React.useState()

	const [timestamp, setTimestamp] = React.useState("normal")
	const [ts_start, set_ts_start] = React.useState()
	const [ts_end, set_ts_end] = React.useState()

	const handleTimestamp = val=>{
		setTimestamp(val)
		if (val === "local_time"){
			const now = new Date()
			const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
			const calculated = currentTimestamp() - secondsSinceMidnight
			set_ts_start(calculated)
			set_ts_end(null)
			set_media_current(0)
			set_media_duration(0)
		}
		else {
			set_ts_start(null)
			set_ts_end(null)
		}
	}
	React.useEffect(() => {
		handleTimestamp(timestamp)
	}, [timestamp])

	const [media_current, set_media_current] = React.useState(0)
	const [media_duration, set_media_duration] = React.useState(0)

	React.useEffect(() => {
		if (media_current === 0 && media_duration === 0) return
		const t_start = currentTimestamp() - Number(media_current)
		const t_end = t_start - Number(media_duration)
		set_ts_start(t_start)
		set_ts_end(t_end)
	}, [media_current, media_duration])

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
	const [buttons_preview, set_buttons_preview] = React.useState([])

	React.useEffect(() => {
		if (buttons[0]){
			set_button_1_text(buttons[0].label)
			set_button_1_url(buttons[0].url)
		}
		if (buttons[1]){
			set_button_2_text(buttons[1].label)
			set_button_2_url(buttons[1].url)
		}
	}, [buttons])

	React.useEffect(() => {
		const new_buttons = []
		const new_buttons_preview = []

		if (button_1_text && button_1_url) {
			new_buttons_preview.push({ label: button_1_text, url: button_1_url })
			if (button_1_url?.startsWith('http')){
				new_buttons.push({ label: button_1_text, url: button_1_url })
			}
		}
		if (button_2_text && button_2_url) {
			new_buttons_preview.push({ label: button_2_text, url: button_2_url })
			if (button_2_url?.startsWith('http')){
				new_buttons.push({ label: button_2_text, url: button_2_url })
			}
		}
		set_buttons_preview(new_buttons_preview)
		set_buttons(new_buttons)
	}, [button_1_text, button_1_url, button_2_text, button_2_url])

	const handleMainClick = () => {
		const obj = {
			act_type: actType,
			details: details,
			details_url: details_url,
			state: state,
			state_url: state_url,
			timestamp: timestamp,
			ts_start: ts_start,
			ts_end: ts_end,
			media_current: media_current,
			media_duration: media_duration,
			large_image: large_image,
			large_text: large_text,
			small_image: small_image,
			small_text: small_text,
			party_size: party_size,
			buttons: buttons,
		}
		console.log(cleanObject(obj))
	}

	return (
		<Container>
			<Sticky className="w-96" classNameChild="top-3">
				<Presence actType={actType} appName={Tt("default_appName")}
					state={state} details={details}
					ts_start={ts_start} ts_end={ts_end}
					large_image={large_image} small_image={small_image}
					large_text={large_text} small_text={small_text}
					state_url={state_url} details_url={details_url}
					party_size={party_size}
					buttons={buttons_preview}
				/>
				<Button className="w-full mt-3 font-bold" onClick={handleMainClick}>
					<T>main_apply_button</T>
				</Button>
			</Sticky>
			
			<Card className="items-center w-96">

				<Select label={<T>actType_select_label</T>} selected={actType} options={[
					{ value: "playing", label: <T>actType_select_playing</T> },
					{ value: "listening", label: <T>actType_select_listening</T> },
					{ value: "watching", label: <T>actType_select_watching</T> },
				]} onChange={setActType}/>

				<Select label={<T>timestamp_select_label</T>} selected={timestamp} options={[
					{ value: "normal", label: <T>timestamp_select_label_normal</T> },
					{ value: "local_time", label: <T>timestamp_select_label_local_time</T> },
				]} onChange={handleTimestamp}/>

				<Hr/>

				{
					(["listening", "watching"].includes(actType) && timestamp === "normal") ? (
						<React.Fragment>
							<InputGroup>
								<Input label={<T>media_current_input_label</T>} type="number"
									name="media_current" value={media_current}
									onChange={set_media_current}
								/>
								<Input label={<T>media_duration_input_label</T>} type="number"
									name="media_total" value={media_duration}
									onChange={set_media_duration}
								/>
							</InputGroup>
							<Hr/>
						</React.Fragment>
					) : null
				}

				<Input placeholder={Tt("details_input_placeholder")}
					label={<T>details_input_label</T>}
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
						<Input placeholder={Tt("details_url_input_placeholder")}
							label={<T>details_url_input_label</T>}
							value={details_url} name="details_url"
							onChange={set_details_url}
						/>
						<Hr/>
					</React.Fragment>
				) : null}

				<Input placeholder={Tt("state_input_placeholder")}
					label={<T>state_input_label</T>}
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
						<Input placeholder={Tt("state_url_input_placeholder")}
							label={<T>state_url_input_label</T>}
							value={state_url} name="state_url"
							onChange={set_state_url}
						/>
						<Hr/>
					</React.Fragment>
				) : null}

				<InputGroup label={<T>party_input_label</T>}>
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

				<Input placeholder={Tt("large_image_input_placeholder")}
					label={<T>large_image_input_label</T>}
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
						<Input placeholder={Tt("large_image_tooltip_input_placeholder")}
							label={<T>large_image_tooltip_input_label</T>}
							value={large_text} name="large_text"
							onChange={set_large_text}
						/>
						<Hr/>
					</React.Fragment>
				) : null}

				<Input placeholder={Tt("small_image_input_placeholder")}
					label={<T>small_image_input_label</T>}
					name="small_image" value={small_image}
					onChange={val => {
						set_small_image(val)
						if (val === ""){
							set_small_text("")
						}
					}}
				/>
				{small_image ? (
					<Input placeholder={Tt("small_image_tooltip_input_placeholder")}
						label={<T>small_image_tooltip_input_label</T>}
						value={small_text} name="small_text"
						onChange={set_small_text}
					/>
				) : null}

				<Hr/>

				<Input placeholder={Tt("bottom_button_input_placeholder")}
					label={<T>bottom_button_input_label</T>}
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
						<Input placeholder={Tt("bottom_button_url_input_placeholder")}
							label={<T>bottom_button_url_input_label</T>}
							name="button_1_url" value={button_1_url}
							onChange={set_button_1_url}
						/>

						<Hr/>

						<Input placeholder={Tt("bottom_button_input_placeholder")}
							label={<T>bottom_button_input_label</T>}
							name="button_2_text" value={button_2_text}
							onChange={val=>{
								set_button_2_text(val)
								if (val === ""){
									set_button_2_url("")
								}
							}}
						/>

						{button_2_text ? (
							<Input placeholder={Tt("bottom_button_url_input_placeholder")}
								label={<T>bottom_button_url_input_label</T>}
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

function cleanObject(obj) {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => {
			if (v == null) return false
			if (Array.isArray(v) && v.length === 0) return false
			return true
		})
	)
}
