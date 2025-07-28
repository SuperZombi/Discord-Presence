const supported_langs = ["en", "ru"]
var _LOCALE = {}
const T = ({children, vars=null}) => {
	return (
		<React.Fragment>{Tt(children, vars)}</React.Fragment>
	)
}
const Tt = (key, vars=null) => {
	if (!Object.keys(_LOCALE).includes(key)){
		console.error(`Key ${key} does not exist`)
		return key
	}
	return _LOCALE_MAP(_LOCALE[key], vars)
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
