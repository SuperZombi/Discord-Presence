const Home = () => {
	const {
		Link,
	} = ReactRouterDOM;

	const presences = [
		{
			appName: "Discord Custom Presence",
			details: "Customize your activity status",
			ts_start: Math.floor(Date.now() / 1000) - 10,
			buttons: [{label: "Start now", url: "https://github.com/SuperZombi/Discord-Presence/"}]
		},
		{
			appName: "YouTube Music",
			large_image: "images/yt_music.png",
			actType: "listening",
			state: "Tame Impala",
			details: "Dracula (JENNIE Remix)",
			ts_start: Math.floor(Date.now() / 1000) - 86,
			ts_end: Math.floor(Date.now() / 1000) + 124,
			buttons: [{label: "Listen", url: "https://music.youtube.com/"}]
		}
	]
	const [currentPresence, setCurrentPresence] = React.useState(0)
	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPresence(prev => (prev + 1) % presences.length)
		}, 10000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="space-y-8 py-6">
			<Section className="grid items-center justify-items-center sm:justify-items-start gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
				<div>
					<h1 className="max-w-3xl text-4xl text-center sm:text-left font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
						Customize your <span className="text-sky-500">Discord Activity</span> as you wish
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 text-balance">
						<span className="text-sky-500">Discord Presence</span> helps you customize your Discord activity:<br/>your status, cover photo, buttons, and details can be neatly organized into a card.
					</p>
					<div className="mt-8 flex gap-3 sm:gap-4 justify-center sm:justify-start flex-nowrap whitespace-nowrap">
						<Link to="/download" className="
							flex gap-2 items-center
							rounded-2xl bg-indigo-400 px-4 py-3 sm:px-6
							font-semibold text-white
							shadow-xl shadow-indigo-500/25
							transition hover:-translate-y-0.5 hover:bg-indigo-300
						">
							<i className="fa-solid fa-download"></i>
							<span>Download</span>
						</Link>
						<a href="#setup" className="
							flex gap-2 items-center rounded-2xl
							border border-white/10 bg-white/10 px-4 py-3 sm:px-6
							font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15
						">
							<i className="fa-solid fa-rocket"></i>
							<span>Get Started</span>
						</a>
					</div>
				</div>
				<div className="max-w-xl zoom-85 md:zoom-100 w-full">
					<Presence {...presences[currentPresence]}/>
				</div>
			</Section>

			<Section id="customization">
				<div className="mb-10 max-w-2xl">
					<Badge icon="fa-solid fa-wand-magic-sparkles">Customization</Badge>
					<h2 className="mt-5 text-4xl font-bold text-white">
						Create a unique Presence
					</h2>
					<p className="mt-4 leading-7 text-slate-300">
						Show what you're playing, listening to, or watching.<br/>Personalize every part of your activity with custom images, buttons, timestamps, and details.
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-3">
					<FeatureCard
						icon="fa-solid fa-palette"
						title="Fully customizable"
					>
						Edit activity type, state, details, timestamps, images, tooltips, party size, and more.
					</FeatureCard>

					<FeatureCard
						icon="fa-solid fa-images"
						title="Custom images"
					>
						Use large and small images with custom tooltips to give your activity more personality.
					</FeatureCard>

					<FeatureCard
						icon="fa-solid fa-link"
						title="Interactive buttons"
					>
						Add up to two custom buttons linking to your website, portfolio, stream, or any other page your friends can visit.
					</FeatureCard>
				</div>
			</Section>

			<Section id="setup" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<Badge icon="fa-solid fa-rocket">Getting started</Badge>

					<h2 className="mt-5 text-4xl font-bold text-white">
						Set up your Presence in minutes.
					</h2>

					<p className="mt-4 leading-7 text-slate-300">
						No complicated configuration.<br/>Just create a Discord application,
						paste its ID, and start customizing your Rich Presence.
					</p>
				</div>

				<div className="space-y-4">
					<Step number="1"
						title="Download the app"
						to="/download"
					>
						Download the latest release and launch the application.
					</Step>

					<Step number="2"
						title="Create a Discord application"
						to="https://discord.com/developers/applications"
					>
						Create a new application in the Discord Developer Portal and copy
						your Application ID.
					</Step>

					<Step number="3"
						title="Customize & launch"
					>
						Choose an activity, add images, buttons, timestamps, and details,
						then start your custom Rich Presence instantly.
					</Step>
				</div>
			</Section>

			<Section id="features">
				<Badge icon="fa-solid fa-circle-check">Features</Badge>

				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<FeatureCard
						title="Activity types"
					>
						Playing, Listening, Watching
					</FeatureCard>

					<FeatureCard
						title="Timestamps"
					>
						Elapsed time, progress bar, or local time.
					</FeatureCard>

					<FeatureCard
						title="Media"
					>
						Large & small images with custom hover tooltips.
					</FeatureCard>

					<FeatureCard
						title="More"
					>
						Party size, custom URLs, and interactive buttons.
					</FeatureCard>
				</div>

				<p className="mt-6 text-sm text-slate-400 rounded-3xl border border-white/10 bg-white/5 p-6">
					Note: Discord does not display custom buttons to the account that created them,
					but they are fully visible to everyone else.
				</p>
			</Section>
		</div>
	)
}

const Section = ({children, className = "", id}) => {
	return (
		<section id={id} className={`
			section-card
			min-h-[calc(100dvh-(--spacing(28)))]
			relative overflow-hidden p-6 sm:p-8 lg:p-10
			border border-white/10 rounded-3xl backdrop-blur-xl
			${className}
		`}>
			{children}
		</section>
	)
}

const Badge = ({icon, children}) => (
	<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 shadow-lg shadow-indigo-950/20 backdrop-blur">
		<i className={icon}></i>
		{children}
	</span>
)

const FeatureCard = ({icon, title, children}) => (
	<div className="group rounded-3xl border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/35 hover:bg-white/[0.07]">
		<div className="flex gap-3 items-center mb-3">
			{icon && (
				<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/15 text-xl text-indigo-200 ring-1 ring-inset ring-indigo-200/20 transition group-hover:scale-110 group-hover:bg-indigo-400/25">
					<i className={icon}></i>
				</div>
			)}
			<h3 className="text-xl font-semibold text-white">{title}</h3>
		</div>
		<p className="leading-7 text-slate-300">{children}</p>
	</div>
)

const Step = ({ number, title, children, to }) => {
	const {
		Link,
	} = ReactRouterDOM;

	const StepLinkIcon = () => (
		<i
			className="
				fa-solid fa-arrow-right
				transition-transform duration-300
				group-hover/arrow:translate-x-1
			"
		/>
	)

	const StepLink = ({header=false}) => {
		const linkClassName = `
			group/arrow h-12 w-12 shrink-0 items-center justify-center
			rounded-2xl border border-white/10
			bg-white/5 text-slate-300
			transition-all duration-300
			hover:scale-110
			hover:bg-sky-500
			hover:text-white
			hover:shadow-lg hover:shadow-sky-500/30
			${header ? "hidden sm:flex" : "flex sm:hidden"}
		`

		return to.startsWith("http") ? (
			<a href={to} target="_blank"
				className={`${linkClassName} ${header ? "ml-auto" : ""}`}
			>
				<StepLinkIcon/>
			</a>
		) : (
			<Link
				to={to}
				className={`${linkClassName} ${header ? "ml-auto" : ""}`}
			>
				<StepLinkIcon/>
			</Link>
		)
	}

	return (
		<div
			className="
				group relative flex flex-col gap-4
				rounded-3xl border border-white/10
				bg-white/4 p-5
				transition-all duration-300
				hover:-translate-y-1
				hover:border-sky-400/20
				hover:bg-white/6
			"
		>
			<div className="flex gap-3 items-center">
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-400/15 font-bold text-fuchsia-100 ring-1 ring-inset ring-fuchsia-200/20">
					{number}
				</div>
				<h3 className="text-lg font-semibold text-white">
					{title}
				</h3>
				{to && <StepLink header={true}/>}
			</div>
			<div className="flex gap-3 items-end justify-between">
				<p className="leading-7 text-slate-300">
					{children}
				</p>
				{to && <StepLink/>}
			</div>
		</div>
	)
}
