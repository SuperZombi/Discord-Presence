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
				<p className="mt-3 leading-7 text-slate-300">{subtitle}</p>
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
				<div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row">
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
					subtitle="Standalone desktop build with all dependencies included."
					badge="Recommended"
					primaryLabel="Download"
					primaryHref="https://github.com/SuperZombi/Discord-Presence/releases/latest/download/Discord.Presence.exe"
					features={["Recommended for most users", "No installation required", "Standalone executable"]}
				/>
				<DownloadOption
					accent="emerald"
					icon="fa-brands fa-linux"
					title="Linux"
					subtitle="Python package with a bundled web interface."
					badge="Linux"
					primaryLabel="Download"
					primaryHref="https://github.com/SuperZombi/Discord-Presence/releases/latest/download/linux.zip"
					secondaryLabel="GitHub"
					secondaryHref="https://github.com/SuperZombi/Discord-Presence"
					features={["Great for Linux users", "Python 3 required", "Bundled web interface"]}
				/>
			</section>
		</div>
	)
}
