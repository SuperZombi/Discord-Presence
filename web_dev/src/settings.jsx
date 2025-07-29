const Settings = ({
	show, hide
}) => {
	return (
		<Container className={`
			z-10 fixed inset-0 bg-[#323339]
			duration-300 ease-out
			${show ? 'opacity-100' : 'opacity-0 scale-x-0 invisible'}
		`}>
			<div>
				<Card className="w-226 relative py-3">
					<h3 className="font-bold text-center text-lg select-none">
						Settings
					</h3>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
						onClick={hide} className="
							h-8 absolute
							right-2 top-1/2 -translate-y-1/2
							fill-red-500 cursor-pointer
							duration-200 ease-out
							hover:rotate-90
						"
					>
						<path d="M320 576c141.4 0 256-114.6 256-256S461.4 64 320 64 64 178.6 64 320s114.6 256 256 256zm-89-345a23.9 23.9 0 0 1 33.9 0l55 55 55-55a23.9 23.9 0 0 1 33.9 0c9.3 9.4 9.4 24.6 0 33.9l-55 55 55 55a23.9 23.9 0 0 1 0 33.9c-9.4 9.3-24.6 9.4-33.9 0l-55-55-55 55a23.9 23.9 0 0 1-33.9 0c-9.3-9.4-9.4-24.6 0-33.9l55-55-55-55a23.9 23.9 0 0 1 0-33.9z"/>
					</svg>
				</Card>
				<Card className="mt-3">
					Options
				</Card>
			</div>
		</Container>
	)
}
