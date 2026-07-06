const {
	useState,
	useEffect
} = React;

const {
	HashRouter,
	Switch,
	Route,
	Link,
	useHistory,
	useLocation,
	useParams
} = ReactRouterDOM;

const Home = () => {
	return (
		<>
			<i className="fa-brands fa-discord"></i>
			<h3>Hello world</h3>
			<img className="h-32" src="images/picture.png"/>
		</>
	)
}

const Test = () => {
	const history = useHistory()

	return (
		<div>
			<h2>Test</h2>
			<button onClick={() => history.push("/")}>
				Go home
			</button>
		</div>
	)
}

const App = () => {
	return (
		<HashRouter>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/test">Test</Link>
			</nav>

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/test" component={Test} />
			</Switch>
		</HashRouter>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
