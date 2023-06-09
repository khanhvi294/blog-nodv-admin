import React from 'react';
import Navbar from './components/Navbar';
import SidebarLeft from './components/SidebarLeft';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
	return (
		<>
			<div className="flex bg-slate-100 min-h-screen">
				<div className="w-16 z-[9999]">
					<SidebarLeft />
				</div>
				<div className="flex-1 overflow-hidden">
					<Navbar />
					<div className=" w-full h-full pt-16">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default DefaultLayout;
