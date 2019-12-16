import { createMuiTheme } from '@material-ui/core/styles';
import { lightGreen, amber, cyan, teal, grey, indigo, purple, blueGrey } from '@material-ui/core/colors';

// Customize theme to pervade all (and specified 
// individual) Material-UI components:
const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'rgba(255, 193, 7, .5)',
      main: 'rgba(255, 193, 7, .8)',
      dark: 'rgba(255, 193, 7, 1)',
      contrastText: 'rgba(9, 51, 113, 1)',
    },
    secondary: {
      light: 'rgb(27,78,139, .5)',
      main: 'rgb(27,78,139, .8)',
      dark: 'rgb(27,78,139, 1)',
      contrastText: 'white', 
    },
  },
  props: {
    MuiListItemBase: {
      fontSize: "2rem",
      fontFamily: "Oswald",
    },
    MuiListItemTextBase: {
        fontSize: "2rem",
        fontFamily: "Oswald",
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#812859',
      }
    },
    MuiButton: {
      text: {
        fontSize: '20px',
        fontWeight: 700,
      },
      root: {
        margin: '20px',
      },
    },
    MuiSelect: {
      select: {
        maxWidth: 300,
      }
    },
    MuiPaper: {

    },
    MuiGridList: {
      root: {
        maxWidth: 650,
        margin: "0px",
        overflowY: "hidden",
      },
    },
    MuiGridListTile: {
      root: {
        maxWidth: 650,
        minWidth: 300,
        height: "112px !important",
      },
      tile: {
        width: 300,
        height: 112,
      },
    },
    MuiTextField: {
      root: {
        maxWidth: 340,
        margin: '12px'
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1.2rem",
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: "22px",
        minHeight: "50px",
      }
    },
    MuiListItemText: {
      root: {
        minWidth: "90px",
      }
    },
    MuiOutlinedInput: {
      inputMarginDense: {
        minWidth: "200px",
        maxWidth: "300px",
      },
    },
    MuiDialogActions: {
      root: {
        margin: "24px",
      }
    },
    MuiFormControl: {
      root: {
        maxWidth: '300px'
      }
    }
  },
  typography: { 
    fontFamily: '"Montserrat", "Roboto", "Arial", sans',
    useNextVariants: true,
    headline: {
      fontWeight: 700,
    },
  },
  classes: {
    modalPaper: {
      padding: "24px",
    }
  }
});

export default theme