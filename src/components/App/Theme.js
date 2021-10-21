//////////////////////////////
// Author(s): Rebecca Ye
// Date Made: 29/09/2021
//////////////////////////////

import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: red[900],
		},
		secondary: { 
			main: red[900],
		},
	}});

	export default theme;