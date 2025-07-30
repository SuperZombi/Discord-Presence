const Input = ({
	value="", type="text", min=0,
	label="", step=1, max=Infinity,
	onChange=null, ...props
}) => {
	const handleChange = (e) => {
		const val = e.target.value;
		if (type === "number"){
			if (val){
				if ((Number(val) > min) && (Number(val) < max)){
					return onChange?.(Number(val))
				}
				else if (Number(val) > min){
					return onChange?.(max)
				}
				else if (Number(val) < max){
					return onChange?.(min)
				}
			}
			return onChange?.(min)
		}
		onChange?.(val)
	}
	const handleMinus = (e) => {
		if ((Number(value) - Number(step)) < Number(min)) return
		onChange?.(Number(value) - Number(step))
	}
	const handlePlus = (e) => {
		if ((Number(value) + Number(step)) > Number(max)) return
		onChange?.(Number(value) + Number(step))
	}
	
	React.useEffect(() => {
		if (type !== "number") return;
		if (Number(value) > Number(max)) {
			onChange?.(Number(max))
		}
		else if (Number(value) < Number(min)) {
			onChange?.(Number(min))
		}
	}, [min, max]);

	return (
		<div className="w-full">
			{label ? (
				<h4 className={`
					${type === "number" ? "text-center" : "ms-1"}
					mb-1 font-medium select-none
				`}>{label}</h4>
			) : null}
			<div className="
				flex items-center relative 
			">

				{type === "number" ? (<InputButton className="
					left-0 rounded-s-xl
				" onClick={handleMinus}>−</InputButton>) : null}

				<input type={type} className={`
					w-full select-none
					focus:outline-none focus:border-[#5865f2]
					bg-[#2b2c32]
					border-2 border-[#42434a]
					p-3 py-2.5 rounded-xl
					duration-200 ease-out
					hover:border-[#646570]
					text-[#dcdddf] placeholder:text-[#82838a]
					appearance-none 
					[&::-webkit-outer-spin-button]:appearance-none 
					[&::-webkit-inner-spin-button]:appearance-none 
					[-moz-appearance:textfield]
					${type === "number" ? "text-center" : null}
				`}
					value={value}
					placeholder={type === "number" ? 0 : null}
					min={type === "number" ? min : null}
					max={type === "number" ? max : null}
					step={type === "number" ? step : null}
					{...props}
					onChange={handleChange}
				/>
				{type === "number" ? (<InputButton className="
					right-0 rounded-e-xl
				" onClick={handlePlus}>+</InputButton>) : null}
			</div>
		</div>
	)
}

const InputButton = ({children, className="", onClick}) => {
	return (
		<span className={`
			absolute top-0 bottom-0
			flex justify-center items-center
			w-10 bg-[#60626e]
			hover:bg-[#545561]
			active:bg-[#4a4b57]
			duration-200 ease-out
			cursor-pointer
			select-none
			${className}
		`} onClick={onClick}>{children}</span>
	)
}

const Button = ({
	children, className="", url="",
	disabled=false, danger=false,
	onClick=null, ...props
}) => {
	const clickHandle = _=>{
		if (disabled) return
		url ? window.open(url, '_blank') : onClick ? onClick() : null
	}
	return (
		<button
			{...props}
			onClick={clickHandle}
			className={`
				${disabled ? (
					`
						bg-[#484951] cursor-not-allowed
						text-gray-400
					`
				) : danger ? (
					`
					bg-[#484951] hover:bg-[#5e5f6b]
					text-red-400 hover:text-red-500
					cursor-pointer
					`
				) : (
					`
						bg-[#5865f2] hover:bg-[#4752c4]
						active:bg-[#3a48a3]
						cursor-pointer text-white
					`
				)}
				duration-200 ease-out
				text-center w-fit
				px-6 py-2.5
				rounded-xl
				select-none
				${className}
			`}
		>
			{children}
		</button>
	)
}

const Tooltip = ({
	children
}) => {
	// Need parent element with className="relative group"
	return (
		<div className="
			z-10
			left-1/2 top-0
			-translate-x-1/2
			absolute -translate-y-full
			opacity-0 group-hover:opacity-100
			invisible group-hover:visible
			duration-200 ease-out
			select-none
		">
			<div className="
				whitespace-nowrap
				rounded-lg bg-[#393a41]
				border-2 border-[#555]
				py-1.5 px-3
				text-sm text-white
			">
				{children}
			</div>
			<div className="
				absolute bg-[#393a41]
				border-2 border-[#555]
				border-l-0 border-t-0
				w-[10px] h-[10px]
				bottom-0 left-1/2
				translate-y-[calc(50%-1px)]
				-translate-x-1/2
				rotate-45
			"/>
		</div>
	)
}

const Select = ({
	options, onChange, selected=null,
	placeholder="", label=null
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [selectedOption, setSelectedOption] = React.useState(
		options.find(obj => obj.value === selected)
	)
	const selectRef = React.useRef(null)

	const handleClickOutside = (e) => {
		if (selectRef.current && !selectRef.current.contains(e.target)) {
			setIsOpen(false)
		}
	}

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	return (
		<div className="relative w-full" ref={selectRef}>
			{label ? (
				<h4 className="
					ms-1 mb-1 font-medium select-none
				">{label}</h4>
			) : null}
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="
					border-2 border-[#42434a]
					bg-[#2b2c32]
					hover:border-[#646570]
					rounded-lg p-3 py-2.5
					cursor-pointer
					flex justify-between items-center
					duration-200 ease-out
					select-none
				"
			>
				<span>{selectedOption ? selectedOption.label : placeholder}</span>
				<svg
					className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
				</svg>
			</div>

			{isOpen && (
				<div className="
					absolute z-10 mt-1 w-full
					bg-[#2b2c32] border-2 border-[#42434a]
					rounded-lg shadow-lg
					max-h-60 overflow-y-auto
					select-none
				">
					{options.map((option) => (
						<div
							key={option.value}
							onClick={() => {
								setSelectedOption(option)
								onChange?.(option.value)
								setIsOpen(false)
							}}
							className={`p-3 py-2.5 cursor-pointer hover:bg-[#4b4d58] ${
								selectedOption?.value === option.value ? "bg-[#6b6e7e] font-semibold" : ""
							}`}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
const Switch = ({
	checked=false, onChange
}) => {
	const [enabled, setEnabled] = React.useState(checked);
	const toggle = () => {
		setEnabled(prev => !prev);
		onChange?.(!enabled);
	}
	return (
		<div className={`
			relative inline-flex h-6 w-11 items-center
			rounded-full duration-200 cursor-pointer
			${enabled ? "bg-[#5865f2]" : "bg-[#4e5058]"}
		`} onClick={toggle}>
			<span className={`
				inline-block h-4 w-4 rounded-full bg-white duration-200
				${enabled ? "translate-x-6" : "translate-x-1"}
			`}/>
		</div>
	)
}
SwitchGroup = ({
	label="", checked=false,
	onChange=null, className=""
}) => {
	return (
		<div className={`
			flex justify-between items-center
			px-1 py-3
			${className}
		`}>
			<span className="ms-1 font-semibold select-none">{label}</span>
			<Switch checked={checked} onChange={onChange}/>
		</div>
	)
}

const InputGroup = ({children, label=""}) => {
	return (
		<div className="w-full">
			{label ? (
				<h4 className="
					mb-2 font-medium select-none
				">{label}</h4>
			) : null}
			<div className="flex gap-2">
				{children}
			</div>
		</div>
	)
}

const Card = ({ children, className="" }) => {
	return (
		<div className={`
			flex flex-col gap-3
			h-fit p-4
			rounded-xl
			bg-[#3f4048] text-[#dfe0e2]
			${className}
		`}>
			{children}
		</div>
	)
}

const Container = ({children, className=""}) => {
	return (
		<div className={`
			flex flex-wrap flex-row-reverse
			justify-center gap-x-5 gap-y-3 p-3
			${className}
		`}>
			{children}
		</div>
	)
}

const Hr = () => {
	return (
		<hr className="text-gray-500 m-2 w-full"/>
	)
}
