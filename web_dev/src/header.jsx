const Header = ({
	user, username, user_avatar
}) => {
	return (
		<div className="px-3">
			<div className="
				h-12.5 w-226 max-w-full
				bg-[#3f4048] text-[#dfe0e2]
				m-auto rounded-b-xl
				flex items-center px-2 gap-2
			">
				<img className="
					h-9 w-9 object-cover rounded-full
					select-none
				"   draggable={false}
					src={user_avatar || "assets/avatar-blue.png"}
					onError={({ currentTarget }) => {
						currentTarget.src = "assets/avatar-blue.png";
					}}
				/>
				<div className="flex flex-col select-none">
					<span>{user || <T>header_user_default_name</T>}</span>
					<span className="font-mono text-xs text-gray-400 tracking-wider">
						@{username || <T>header_user_default_username</T>}
					</span>
				</div>
				<svg className="
					h-9 w-9 ms-auto
					cursor-pointer
					duration-200 ease-out
					hover:rotate-60
				"   xmlns="http://www.w3.org/2000/svg" fill="#e4e4e6" viewBox="0 0 640 640">
					<path d="M259.1 73.5c3-14.8 16.1-25.5 31.3-25.5h59.8c15.2 0 28.3 10.7 31.3 25.5l14.5 70c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8a31.9 31.9 0 0 1-6.5 39.9L511 297.3c.9 7.4 1.3 15 1.3 22.7 0 7.7-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9L541 481.9a32.07 32.07 0 0 1-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9a31.99 31.99 0 0 1-31.3 25.5h-59.8c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8l-68.1 22.5a31.95 31.95 0 0 1-37.8-14.4l-29.9-51.8a31.9 31.9 0 0 1 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7 0-7.7.5-15.3 1.3-22.7l-53.4-47.5a32.05 32.05 0 0 1-6.5-39.9l29.9-51.8a31.95 31.95 0 0 1 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8l14.5-69.9zM320.3 400c44.2-.2 79.9-36.1 79.7-80.3-.2-44.2-36.1-79.9-80.3-79.7-44.2.2-79.9 36.1-79.7 80.3.2 44.2 36.1 79.9 80.3 79.7z"/>
				</svg>
			</div>
		</div>
	)
}
