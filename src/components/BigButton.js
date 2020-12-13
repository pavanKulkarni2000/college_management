import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';


const useStyles=makeStyles({
    link:{
        textDecoration:'none'
    },
    paper:{
        height:200,
        width:200,
        padding:20,
    },
    typo:{
        padding:20,
    }
})

const initShadow = 10
const howerShadow=2

export default function BigButton(props) {
    const [shadow,setShadow] = useState(initShadow)
    const classes = useStyles()

    return (
        <Link 
            to={props.link}
            className={classes.link}
        >
            <Paper
                square="false"
                elevation={shadow}
                className={classes.paper}
                onMouseEnter={()=>setShadow(howerShadow)}
                onMouseLeave={()=>setShadow(initShadow)}
            >
                {props.component}
                <Typography
                    className={classes.typo}
                    variant="h6"
                >
                    { props.title }
                </Typography>
            </Paper>
        </Link>
    )
}

