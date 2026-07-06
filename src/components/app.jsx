const Home = () => {
	return (
		<>
			<Section>
				<i className="fa-brands fa-discord"></i>
				<h3>Hello world</h3>
				<img className="h-32" src="images/picture.png"/>
			</Section>
		</>
	)
}

const Section = ({children}) => {
	return (
		<section className="p-4 min-h-[calc(100dvh-(--spacing(16)))]">
			{children}
		</section>
	)
}

const Header = () => {
	const {
		Link,
	} = ReactRouterDOM;

	return (
		<header className="sticky top-0 bg-slate-800/50 backdrop-blur-md h-16">
			<div className="max-w-6xl h-full m-auto px-4 py-2 flex items-center">
				<nav>
					<Link to="/" className="flex items-center gap-3">
						<img className="h-8" src="images/logo.png" alt="Logo" draggable={false}/>
						<span className="text-lg font-semibold">Discord Presence</span>
					</Link>
				</nav>
			</div>
		</header>
	)
}

const App = () => {
	const {
		HashRouter,
		Switch,
		Route,
		Link,
	} = ReactRouterDOM;

	return (
		<div className="bg-slate-900 min-h-dvh text-gray-100">
			<HashRouter>
				<Header/>
				<main className="max-w-6xl m-auto">
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</main>
			</HashRouter>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
