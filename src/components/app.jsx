const HeaderNotification = () => {
	return (
		<div className="bg-red-900/50 py-1 flex gap-2 items-center justify-center">
			<i className="fa-solid fa-road-barrier text-amber-300"></i>
			<span>This website is still under construction</span>
		</div>
	)
}

const Header = () => {
	const {
		Link,
	} = ReactRouterDOM;

	return (
		<>
			{/*<HeaderNotification/>*/}
			<header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
				
				<div className="max-w-6xl h-full m-auto px-4 py-2 flex items-center justify-between">
					<nav>
						<Link to="/" className="flex items-center gap-3">
							<img className="h-8" src="images/logo.png" alt="Logo" draggable={false}/>
							<span className="text-lg font-semibold">Discord Presence</span>
						</Link>
					</nav>
					<Link to="/download" className="
						hidden rounded-full border border-white/10 bg-white/10
						px-4 py-2 text-sm font-semibold text-slate-100 transition
						hover:bg-white/15 sm:flex gap-2 items-center
					">
						<i className="fa-solid fa-download"></i>
						<span>Download</span>
					</Link>
				</div>
			</header>
		</>
	)
}

const App = () => {
	const {
		HashRouter,
		Switch,
		Route,
	} = ReactRouterDOM;

	return (
		<div className="min-h-dvh bg-[radial-gradient(circle_at_top_left,#312e81_0,transparent_32rem),linear-gradient(135deg,#020617,#0f172a_45%,#111827)] text-gray-100">
			<HashRouter>
				<Header/>
				<main className="max-w-6xl m-auto px-4">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/download" exact component={DownloadsPage} />
						<Route path="*" component={Home} />
					</Switch>
				</main>
			</HashRouter>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
