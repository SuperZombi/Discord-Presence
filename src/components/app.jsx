const Badge = ({icon, children}) => (
	<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 shadow-lg shadow-indigo-950/20 backdrop-blur">
		<i className={icon}></i>
		{children}
	</span>
)

const FeatureCard = ({icon, title, children}) => (
	<div className="group rounded-3xl border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-indigo-300/35 hover:bg-white/[0.07]">
		<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/15 text-xl text-indigo-200 ring-1 ring-inset ring-indigo-200/20 transition group-hover:scale-110 group-hover:bg-indigo-400/25">
			<i className={icon}></i>
		</div>
		<h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
		<p className="leading-7 text-slate-300">{children}</p>
	</div>
)

const Step = ({number, title, children}) => (
	<div className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
		<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-400/15 font-bold text-fuchsia-100 ring-1 ring-inset ring-fuchsia-200/20">
			{number}
		</div>
		<div>
			<h3 className="text-lg font-semibold text-white">{title}</h3>
			<p className="mt-2 leading-7 text-slate-300">{children}</p>
		</div>
	</div>
)

const Home = () => {
	const {
		Link,
	} = ReactRouterDOM;

	const presences = [
		{
			appName: "Discord Custom Presence",
			details: "Customize your activity status",
			ts_start: Math.floor(Date.now() / 1000) - 15,
			buttons: [{label: "Start now", url: "https://github.com/SuperZombi/Discord-Presence/"}]
		},
		{
			appName: "YouTube Music",
			large_image: "images/yt_music.png",
			actType: "listening",
			state: "Tame Impala",
			details: "Dracula (JENNIE Remix)",
			ts_start: Math.floor(Date.now() / 1000) - 86,
			ts_end: Math.floor(Date.now() / 1000) + 210,
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
			<Section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
				<div>
					<h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
						Customize your<br/><span className="text-sky-500">Discord Activity</span><br/>as you wish
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 text-balance">
						<span className="text-sky-500">Discord Presence</span> helps you customize your Discord activity:<br/>your status, cover photo, buttons, and details can be neatly organized into a card.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link to="/download" className="flex gap-2 items-center
							rounded-2xl bg-indigo-400 px-6 py-3
							font-semibold text-white
							shadow-xl shadow-indigo-500/25
							transition hover:-translate-y-0.5 hover:bg-indigo-300
						">
							<i className="fa-solid fa-download"></i>
							<span>Download</span>
						</Link>
						<a href="#setup" className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
							Как начать
						</a>
					</div>
				</div>
				<div className="max-w-xl zoom-75 md:zoom-100">
					<Presence {...presences[currentPresence]}/>
				</div>
			</Section>

			<Section id="features">
				<div className="mb-10 max-w-2xl">
					<Badge icon="fa-solid fa-wand-magic-sparkles">Дизайн секций</Badge>
					<h2 className="mt-5 text-4xl font-bold text-white">Карточки с глубиной, свечением и мягкой виньеткой.</h2>
				</div>
				<div className="grid gap-5 md:grid-cols-3">
					<FeatureCard icon="fa-solid fa-palette" title="Гибкая визуальная подача">Секции используют размытые градиентные пятна, стеклянный фон и inset-виньетку, чтобы контент выглядел объемно даже на темной теме.</FeatureCard>
					<FeatureCard icon="fa-solid fa-bolt" title="Быстрый старт">Главная страница уже содержит готовую структуру: hero-блок, преимущества, шаги подключения и финальный призыв к действию.</FeatureCard>
					<FeatureCard icon="fa-solid fa-shield-heart" title="Аккуратный фокус">Контрастные кнопки, читаемые тексты и спокойные анимации помогают направлять пользователя без визуального шума.</FeatureCard>
				</div>
			</Section>

			<Section id="setup" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<Badge icon="fa-solid fa-route">3 простых шага</Badge>
					<h2 className="mt-5 text-4xl font-bold text-white">Собери Presence под себя.</h2>
					<p className="mt-4 leading-7 text-slate-300">Добавь название активности, описание, изображение и ссылки — страница подскажет, как лучше презентовать твой статус.</p>
				</div>
				<div className="space-y-4">
					<Step number="01" title="Выбери настроение">Определи стиль карточки: игра, разработка, музыка, стрим или личный бренд.</Step>
					<Step number="02" title="Добавь детали">Заполни название, вторую строку, таймер, большую картинку и полезные кнопки.</Step>
					<Step number="03" title="Покажи друзьям">Запусти Presence и позволь профилю говорить за тебя, пока ты занимаешься важным.</Step>
				</div>
			</Section>
		</div>
	)
}


const DownloadOption = ({icon, title, subtitle, badge, primaryLabel, primaryHref, secondaryLabel, secondaryHref, features, accent = "sky"}) => {
	const tone = accent === "emerald" ? {
		cardHover: "hover:border-emerald-300/40",
		glow: "bg-emerald-400/20",
		icon: "bg-emerald-400/15 text-emerald-100",
		check: "bg-emerald-400/15 text-emerald-100",
		button: "bg-emerald-400 shadow-emerald-500/25 hover:bg-emerald-300",
	} : {
		cardHover: "hover:border-sky-300/40",
		glow: "bg-sky-400/20",
		icon: "bg-sky-400/15 text-sky-100",
		check: "bg-sky-400/15 text-sky-100",
		button: "bg-sky-400 shadow-sky-500/25 hover:bg-sky-300",
	}

	return (
		<div className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-2xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${tone.cardHover}`}>
			<div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition group-hover:scale-125 ${tone.glow}`}></div>
			<div className="relative">
				<div className="flex items-start justify-between gap-4">
					<div className={`flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ring-1 ring-inset ring-white/15 ${tone.icon}`}>
						<i className={icon}></i>
					</div>
					<span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">{badge}</span>
				</div>
				<h3 className="mt-7 text-3xl font-bold text-white">{title}</h3>
				<p className="mt-3 min-h-16 leading-7 text-slate-300">{subtitle}</p>
				<ul className="mt-6 space-y-3">
					{features.map((feature) => (
						<li key={feature} className="flex items-center gap-3 text-sm text-slate-200">
							<span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${tone.check}`}>
								<i className="fa-solid fa-check"></i>
							</span>
							{feature}
						</li>
					))}
				</ul>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row">
					<a href={primaryHref} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white shadow-xl transition hover:-translate-y-0.5 ${tone.button}`}>
						<i className="fa-solid fa-download"></i>
						{primaryLabel}
					</a>
					{(secondaryHref && secondaryLabel) && (
						<a href={secondaryHref} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
							<i className="fa-solid fa-arrow-up-right-from-square"></i>
							{secondaryLabel}
						</a>
					)}
					
				</div>
			</div>
		</div>
	)
}

const DownloadsPage = () => {
	return (
		<div className="space-y-8 py-6">
			<section className="grid gap-5 lg:grid-cols-2">
				<DownloadOption
					accent="sky"
					icon="fa-brands fa-windows"
					title="Windows"
					subtitle="Download the desktop build, launch it, and start customizing your Discord activity without manual setup."
					badge="Recommended"
					primaryLabel="Download for Windows"
					primaryHref="https://github.com/SuperZombi/Discord-Presence/releases/latest/download/Discord.Presence.exe"
					features={["Ready-to-use package", "Best choice for everyday users", "Designed for quick setup"]}
				/>
				<DownloadOption
					accent="emerald"
					icon="fa-brands fa-linux"
					title="Source code (Linux)"
					subtitle="Clone the project on Linux, review the source, and build the client with your preferred developer workflow."
					badge="Linux"
					primaryLabel="Download source"
					primaryHref="https://github.com/SuperZombi/Discord-Presence/releases/latest/download/linux.zip"
					secondaryLabel="GitHub repository"
					secondaryHref="https://github.com/SuperZombi/Discord-Presence"
					features={["Full source code access", "Build and tweak locally", "Great for Linux users"]}
				/>
			</section>
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
			<HeaderNotification/>
			<header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
				
				<div className="max-w-6xl h-full m-auto px-4 py-2 flex items-center justify-between">
					<nav>
						<Link to="/" className="flex items-center gap-3">
							<img className="h-8" src="images/logo.png" alt="Logo" draggable={false}/>
							<span className="text-lg font-semibold">Discord Presence</span>
						</Link>
					</nav>
					<a href="#setup" className="hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15 sm:block">Начать</a>
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
