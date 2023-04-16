import React from 'react';

export const NotificationListLoading = () => {
	return (
		<div className="flex flex-col gap-2">
			<Item />
			<Item />
			<Item />
		</div>
	);
};

function Item() {
	return (
		<div className=" bg-slate-50 p-4">
			<div className="flex animate-pulse space-x-4">
				<div className="h-8 w-8 rounded-full bg-gray-200"></div>
				<div className="flex-1 space-y-1 py-1">
					<div className="h-4 w-3/4 rounded bg-gray-200"></div>
					<div className="space-y-1">
						<div className="h-4 rounded bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
