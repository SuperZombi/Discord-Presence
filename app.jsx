const App = () => {
	return (
		<div>
			<Presence actType="listening" state="State" details="Details"
				large_image = "https://cdn.discordapp.com/embed/avatars/1.png"
				small_image = "https://cdn.discordapp.com/app-assets/383226320970055681/1359299466493956258.png"
				ts_start = {Math.floor(Date.now() / 1000) - 100}
				ts_end = {Math.floor(Date.now() / 1000) + 100}
				buttons = {[
					{"label": "Ask to join", "url": "https://www.google.com/"},
					{"label": "Ask to join", "url": "https://www.google.com/"},
				]}
			/>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
