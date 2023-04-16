import { Box, Tab as MuiTab, Tabs } from '@mui/material';

import { useEffect } from 'react';
import { useState } from 'react';

const Tab = ({
	tabItems = [
		{ id: 1, title: 'item 1' },
		{ id: 2, title: 'item 2' },
	],
	onChange = () => {},
	activeTab = tabItems[0],
}) => {
	const [value, setValue] = useState(tabItems[0].id);
	const handleChange = (e, newValue) => {
		setValue(newValue);
		onChange(newValue);
	};

	useEffect(() => {
		setValue(activeTab.id);
	}, [activeTab]);

	return (
		<Box sx={{ width: '100%' }} className="flex items-center border-b">
			<Tabs
				sx={{
					'& .MuiTabs-indicator': {
						backgroundColor: '#000',
						height: '1px',
					},
				}}
				value={value}
				onChange={handleChange}
				textColor="inherit"
				scrollButtons="auto"
				variant="scrollable"
				className="flex items-center"
			>
				{tabItems.map((item) => (
					<MuiTab
						disableTouchRipple
						key={item.id}
						value={item.id}
						label={item?.title || item?.name}
						className="mr-5 w-fit min-w-0 items-start p-0 font-[lora] normal-case"
					/>
				))}
			</Tabs>
		</Box>
	);
};

export default Tab;
