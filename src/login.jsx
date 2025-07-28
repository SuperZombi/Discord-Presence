const Login = () => {
	const [buttonActive, setButtonActive] = React.useState(false)
	const [appId, setAppId] = React.useState("")
	const inputHandler = (e)=>{
		setAppId(e)
		setButtonActive(e.length > 10)
	}
	const handleSubmit = (value)=>{
		console.log(value)
	}
	return (
		<Container className="h-dvh items-center">
			<Card className="w-110 p-6">
				<h3 className="text-xl font-bold text-center">
					<T>login_wellcome_header</T>
				</h3>
				<img className="
					h-32 w-32 object-cover rounded-full
					m-auto my-2
				"   draggable={false}
					src="assets/avatar-blue.png"
				/>
				<p className="text-center">
					<T vars={{
						highlight_text: (<b><T>login_wellcome_paragraph_highlight_text</T></b>),
						br: <br/>
					}}>
						login_wellcome_paragraph
					</T>
				</p>
				<div>
					<Input
						id="app_id"
						name="app_id"
						placeholder={Tt("login_app_id_input_placeholder")}
						autoComplete="on"
						value={appId}
						onChange={val=>{
							setAppId(val)
							setButtonActive(val.length > 10)
						}}
						onKeyDown={e=>{
							if (e.key === "Enter" && buttonActive) {
								handleSubmit(appId)
							}
						}}
					/>
					<p className="text-xs text-gray-400 ms-1 mt-2">
						<T vars={{link: (
							<a href="https://discord.com/developers/applications" target="_blank"
								className="text-blue-500 font-semibold hover:underline">
								{Tt("login_app_id_hint_link")}
							</a>
						)}}>
							login_app_id_hint
						</T>
					</p>
				</div>
				<Button className="w-full mt-3"
					disabled={!buttonActive}
					onClick={_=>handleSubmit(appId)}
				>
					<T>login_action_button</T>
				</Button>
			</Card>
		</Container>
	)
}
