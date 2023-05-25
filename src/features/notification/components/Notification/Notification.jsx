import './style.css';

import { formatDistance, formatRelative } from 'date-fns';

import { Avatar } from '@mui/material';
import { FlagIcon } from '../../../../assets/icons/heroicons';
import { IconWrapper } from '../../../../components/IconWrapper';
import { Link } from 'react-router-dom';
import { NotificationType } from '../../../../config/dataType';
import { useMemo } from 'react';

export const Notification = ({ notification, setNotificationReadMutation }) => {
	const type = useMemo(() => {
		let res = { message: '', icon: '' };
		switch (notification.type) {
			case NotificationType.FOLLOW:
				res.message = 'started following you';
				res.icon = <i className="fa-solid fa-user-plus"></i>;
				break;
			case NotificationType.LIKE:
				res.message = 'clapped for your post';
				res.icon = <i className="fa-solid fa-hands-clapping"></i>;
				break;
			case NotificationType.COMMENT:
				res.message = 'comment on your post';
				res.icon = <i className="fa-solid fa-comment"></i>;
				break;
			case NotificationType.REPLYCOMMENT:
				res.message = 'replied to your comment on a post';
				res.icon = <i className="fa-solid fa-comment"></i>;
				break;
			case NotificationType.LIKECOMMENT:
				res.message = 'clapped for your comment';
				res.icon = <i className="fa-solid fa-hands-clapping"></i>;
				break;
			case NotificationType.WARNINGCOMMENT:
				res.message = 'your comment violates our community standards';
				res.icon = <i className="fa-light fa-triangle-exclamation"></i>;
				break;
			case NotificationType.WARNINGPOST:
				res.message = 'your post violates our community standards';
				res.icon = <i className="fa-light fa-triangle-exclamation"></i>;
				break;
			case NotificationType.REPORTING:
				res.message = 'reported a content';
				res.icon = <FlagIcon className="text-blue-600" />;
				break;

			default:
				res = 'notification';
				break;
		}
		return res;
	}, [notification.type]);
	return (
		<Link
			onClick={() =>
				!notification.isRead ? setNotificationReadMutation() : ''
			}
			to={notification.link}
		>
			<div
				className="notification"
				style={{
					borderColor: notification.isRead
						? 'transparent'
						: '#10B981',
					backgroundColor: notification.isRead
						? 'transparent'
						: '#f8fafc',
				}}
			>
				<div className="flex items-center gap-4">
					<Avatar
						className="h-8 w-8"
						alt={notification.sender?.username}
						src={notification.sender?.avatar}
					/>

					<div className="flex flex-col">
						<span className="text-base">
							{notification.sender?.username}
							<span className="text-slate-500">
								{' '}
								{type.message}
							</span>
						</span>
						<div className="flex items-center gap-4 text-sm text-slate-500">
							<span className="first-letter:uppercase text-slate-500 mr-4">
								{formatDistance(
									new Date(notification.createdDate),
									new Date(),
									{ addSuffix: true },
								)}
							</span>
							<IconWrapper size="h-5 w-5">
								{type.icon}
							</IconWrapper>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
