import { useDispatch, useSelector } from 'react-redux';

import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { setSocket } from '../redux/slices/socketSlice';
import { useEffect } from 'react';

const SOCKET_URL = process.env.REACT_APP_API_URL + '/ws';

const SocketClient = () => {
	const id = useSelector((state) => state.user.data?.info?.id);
	const dispatch = useDispatch();

	useEffect(() => {
		const sock = new SockJS(SOCKET_URL);
		const stomp = over(sock);
		if (id) {
			stomp.debug = false;
			stomp.connect({}, () => onSuccessConnect(stomp), onError);
		}

		return () => {
			if (id) {
				stomp.disconnect();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const onError = (err) => {
		console.log(err);
	};

	const onSuccessConnect = (stomp) => {
		dispatch(setSocket(stomp));
	};

	return <></>;
};

export default SocketClient;
