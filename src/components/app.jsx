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
	return (
		<div className="space-y-8 py-6">
			<Section className="grid min-h-[calc(100dvh-6rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
				<div>
					<Badge icon="fa-brands fa-discord">Rich Presence для твоего профиля</Badge>
					<h1 className="mt-8 max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
						Покажи, чем ты занят, красиво и без лишней сложности.
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
						Discord Presence помогает оформить активность в Discord: статус, обложку, кнопки и детали можно собрать в аккуратную карточку, которая выглядит как часть твоего бренда.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<a href="#features" className="rounded-2xl bg-indigo-400 px-6 py-3 font-semibold text-slate-950 shadow-xl shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-300">
							Посмотреть возможности
						</a>
						<a href="#setup" className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
							Как начать
						</a>
					</div>
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

const Section = ({children, className = "", id}) => {
	return (
		<section id={id} className={`
			section-card
			min-h-[calc(100dvh-(--spacing(16)))]
			relative overflow-hidden p-6 sm:p-8 lg:p-10
			border border-white/10 rounded-3xl backdrop-blur-xl
			${className}
		`}>
			{children}
		</section>
	)
}

const Header = () => {
	const {
		Link,
	} = ReactRouterDOM;

	return (
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
						<Route path="/" component={Home} />
					</Switch>
				</main>
			</HashRouter>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
