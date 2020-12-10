import React, { useState } from 'react';
import Header from './Header';
import BigButton from './BigButton';
import {FaChalkboardTeacher} from "react-icons/fa"
import {BiChalkboard} from "react-icons/bi"
import {AiTwotoneNotification, AiOutlineLogout} from "react-icons/ai"
import {ImBooks} from 'react-icons/im'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';
import {BsPencilSquare} from 'react-icons/bs'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
    container:{
        height:'90vh',
    },
    grid:{
        height:'90vh'
    }
})

const lgColumns=4

export default function Home(){
    const [navOpen, setNav]=useState(false);
    const classes = useStyles()

    return (
        <div>
            <Header navOpen={navOpen} onClickMenu={setNav}/>
            <Container
                className={classes.container}>

            <Grid 
                container 
                spacing={5}
                justify="center"
                alignItems="center"
                className={classes.grid}
            >
                <Grid item lg={lgColumns}>
                    <BigButton 
                        component={<BiChalkboard size="120px"/>}
                        title={'DEPARTMENT POST'}
                    />
                </Grid>
                <Grid item lg={lgColumns}>
                    <BigButton 
                        component={<FaChalkboardTeacher size="120px"/>}
                        title={'CLASS POST'}
                    />
                </Grid>
                <Grid item lg={lgColumns}>
                    <BigButton 
                        component={<AiTwotoneNotification size="120px"/>}
                        title={'PLACEMENT'}
                    />
                </Grid>
                <Grid item lg={lgColumns}>
                    <BigButton 
                        component={<ImBooks size="120px"/>}
                        title={'COURSE NOTES'}
                    />
                </Grid>
                <Grid item lg={lgColumns}>
                    <BigButton 
                        component={<BsPencilSquare size="120px"/>}
                        title={'CREATE POST'}
                    />
                </Grid>
            </Grid>
            </Container>
            
        </div>
    );
}