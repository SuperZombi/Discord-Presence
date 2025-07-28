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
async function init_lang(lang="en"){
	try {
		const response = await fetch(`/locales/${lang}.json`);
		const data = await response.json();
		_LOCALE = data;
	} catch (e) {
		console.error(`Failed to load lang (${lang}):`, e);
	}
}
