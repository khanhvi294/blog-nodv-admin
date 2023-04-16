import { Notification } from '../Notification';
import { setNotificationRead } from '../../../../api/notificationApi';
import { useMutation } from 'react-query';

export const NotificationList = ({ notificationList }) => {
	const setNotificationReadMutation = useMutation(setNotificationRead);
	if (!notificationList.length)
		return (
			<div className="text-center text-gray-500">
				you don't have any notifications right now
			</div>
		);
	return (
		<div
			className="flex flex-col"
			style={{
				gap: '0.5rem',
			}}
		>
			{notificationList.map((notification) => (
				<Notification
					key={notification.id}
					notification={notification}
					setNotificationReadMutation={() =>
						setNotificationReadMutation.mutate(notification.id)
					}
				/>
			))}
		</div>
	);
};
