const App = () => {
	return (
		<div>
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
