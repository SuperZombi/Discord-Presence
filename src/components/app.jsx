const Home = () => {
	return (
		<>
			<i className="fa-brands fa-discord"></i>
			<h3>Hello world</h3>
			<img className="h-32" src="images/picture.png"/>
		</>
	)
}

const Header = () => {
	const {
		Link,
	} = ReactRouterDOM;

	return (
		<header className="sticky top-0 bg-slate-800/50 backdrop-blur-md h-16">
			<div className="max-w-6xl h-full m-auto px-8 py-2 flex items-center">
				<nav>
					<Link to="/">Home</Link>
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
				<div className="max-w-6xl m-auto">
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</div>
			</HashRouter>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
