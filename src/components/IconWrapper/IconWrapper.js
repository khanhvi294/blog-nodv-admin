export const IconWrapper = ({ children, size = 'h-6 w-6' }) => {
	return (
		<div className={`flex items-center justify-center ${size}`}>
			{children}
		</div>
	);
};
