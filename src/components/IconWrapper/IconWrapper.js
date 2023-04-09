export const IconWrapper = ({ children, size = 'h-6 w-6' }) => {
	return (
		<div className={`flex h-6 w-6 items-center justify-center ${size}`}>
			{children}
		</div>
	);
};
