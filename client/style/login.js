import purple from '@material-ui/core/colors/purple';

module.exports = {
    root: {
        width: '300px',
        background: 'none',
        flexGrow: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate( -50%, -60%)',
    },
    toolbar: {
        flexGrow: 2,
    },
    bg: {
        flexGrow: 1,
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        background: purple[100],
    },
    textField: {
        width: '100%',
    },
    button: {
        width: '100%',
        margin: '20px 0px'
    },
    flex: {
        display: 'flex',
    },
    flexGrow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    footer: {
        background: purple[600],
        textAlign: 'center',
        fontSize: '12px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        color: 'white',
    },
    purple: {
        display: 'inline-block',
        margin: 0,
        padding: 0,
        width: '100%',
        textAlign: 'center',
        color: purple[600]
    }
}