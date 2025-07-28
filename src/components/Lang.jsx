const supported_langs = ["en", "ru"]
var _LOCALE = {}
const T = ({children, vars=null}) => {
	const rawText = _get_locale(children)

	if (vars && Object.values(vars).some(v => typeof v === "object" && React.isValidElement(v))) {
		const parts = rawText.split(/(\{.*?\})/g)
		return (
			<React.Fragment>
				{parts.map((part, idx) => {
					const match = part.match(/^\{(.*)\}$/)
					if (match) {
						const key = match[1];
						const val = vars[key];
						if (React.isValidElement(val)) {
							return React.cloneElement(val, { key: idx });
						}
						return val || "";
					}
					return <React.Fragment key={idx}>{part}</React.Fragment>;
				})}
			</React.Fragment>
		)
	}
	return (
		<React.Fragment>{Tt(children, vars)}</React.Fragment>
	)
}
const Tt = (key, vars=null) => {
	return _LOCALE_MAP(_get_locale(key), vars)
}
const _get_locale = (key) => {
	if (!Object.keys(_LOCALE).includes(key)){
		console.error(`Key ${key} does not exist`)
		return key
	}
	return _LOCALE[key]
}
const _LOCALE_MAP = (x, vars) => {
	return Object.entries(vars || {}).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), x)
}
const init_lang = async (lang=null) => {
	const userLang = lang || navigator.language.slice(0, 2).toLowerCase()
	const lang_to_load = supported_langs.includes(userLang) ? userLang : "en"
	if (lang_to_load !== userLang){
		console.warn(`Language '${userLang}' is not supported!`)
	}
	try {
		const response = await fetch(`/locales/${lang_to_load}.json`)
		const data = await response.json()
		_LOCALE = data;
	} catch (e) {
		console.error(`Failed to load lang '${lang_to_load}':\n\n`, e)
		if (lang_to_load !== "en"){
			await init_lang("en")
		} else {
			throw new Error("Failed to init language engine")
		}
	}
}
