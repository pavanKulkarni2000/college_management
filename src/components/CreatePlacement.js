import React, { useState } from 'react'
import { Paper,TextField, MenuItem, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
  paper:{
      margin:'30px',
      padding:'20px',
      display:'inline-block'
  },
  typo:{
      color:'#d4b168'
  }
}));

export default function CreatePlacement() {
    const [company, setCompany] = useState('')
    const [job_profile, setJob_profile] = useState('')
    const [role, setRole] = useState('')
    const [min_cgpa, setMin_cgpa] = useState()
    const [max_backlogs, setMax_backlogs] = useState()
    const [stipend, setStipend] = useState()
    const [year, setYear] = useState()
    const [title, setTitle] = useState()
    const [message, setMessage] = useState()
    const [category, setCategory] = useState()

    const history = useHistory()
    const classes = useStyles()

    const handleSubmit=(event)=>{
        event.preventDefault()
        const data={
            company,
            job_profile,
            stipend,
            max_backlogs,
            min_cgpa,
            role,
            year,
            category
        }
        const data1={
            year,
            title,
            message
        }
        axios.post('/placement',data)
        .then(results=>{
            alert('Entry Insertion Successful!')
        })
        .catch(err=>{
            if(err.response && err.response.status === 400){
                history.push('/')
            }
            else{
                console.log(err)
                alert('Sorry!! There is something wrong with the Server')
            }
        })
        axios.post('/department/post',data1)
        .then(results=>{
            alert('Post put in Department Feed')
            history.push('/home/student')
        })
        .catch(err=>{
            if(err.response && err.response.status === 400){
                history.push('/')
            }
            else{
                console.log(err)
                alert('Sorry!! There is something wrong with the Server')
            }
        })
    }
    
    return (
        <Paper
            className={classes.paper}
            variant='outlined'>
            <Typography
                className={classes.typo}
                variant='h5'>
                Entry For Placement
            </Typography>
            <br/>
            <form className={classes.root} onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <TextField
                        value={company}
                        variant='outlined'
                        label='Company'
                        helperText='Enter the Name of the Company'
                        onChange ={(e)=>setCompany(e.target.value)}
                        autoFocus
                        required
                    />
                    <TextField
                        value={job_profile}
                        variant='outlined'
                        label='Job Profile'
                        helperText='Enter the Job Profile'
                        onChange ={(e)=>setJob_profile(e.target.value)}
                        required
                    />
                </div>
                <div>

                    <TextField
                        select
                        value={role}
                        variant='outlined'
                        label='Role'
                        helperText='Enter if the role is Intern or FTE'
                        onChange ={(e)=>setRole(e.target.value)}
                        required
                    >
                        <MenuItem value={'INTERN'}>Internship</MenuItem>
                        <MenuItem value={'FTE'}>Full Time Offer</MenuItem>
                    </TextField>
                    <TextField
                        value={min_cgpa}
                        variant='outlined'
                        label='Min CGPA'
                        onChange ={(e)=>setMin_cgpa(e.target.value)}
                        helperText='Enter the minimum CGPA for qualification (Decimal between 0-10)'
                        required
                        type='number'
                        step='0.1'
                        min='0' max='10'
                    />

                </div>
                <div>

                    <TextField
                        value={max_backlogs}
                        variant='outlined'
                        label='Max Backlogs'
                        onChange ={(e)=>setMax_backlogs(e.target.value)}
                        helperText='Maximum Backlogs (Number between 0-10)'
                        required
                        type='number'
                        min='0' max='10'
                    />
                    <TextField
                        value={stipend}
                        variant='outlined'
                        label='Stipend/CTC'
                        onChange ={(e)=>setStipend(e.target.value)}
                        helperText='Enter Stipend for Internship and CTC for FTE(Enter a Number)'
                        required
                        type='number' min='0'
                    />
                </div>
                <div>
                    <TextField
                        select
                        value={year}
                        variant='outlined'
                        label='Year'
                        onChange ={(e)=>setYear(e.target.value)}
                        helperText='Enter Eligibility year for students'
                        required
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </TextField>
                    <TextField
                        value={category}
                        variant='outlined'
                        label='Category'
                        onChange ={(e)=>setCategory(e.target.value)}
                        helperText='Enter which category of the company dream /open dream etc'
                        required
                    />
                </div>
                <br/>
                <Typography
                    className={classes.typo}
                    variant='h5'>
                    Entry For Post
                </Typography>
                <br/>
                <div>

                    <TextField
                            fullWidth
                            multiline
                            value={title}
                            onChange ={(e)=>setTitle(e.target.value)}
                            className={{width:'100%'}}
                            variant='outlined'
                            label='Title'
                            helperText='Title for Department Post Regarding Internship'
                            required
                    />
                    <TextField
                        multiline
                        value={message}
                        variant='outlined'
                        label='Description'
                        onChange ={(e)=>setMessage(e.target.value)}
                        helperText='Message for the Department Post'
                        required
                    /> 
                </div>
                <br/>
                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size='large'>
                    SUBMIT
                </Button>
                <br/>
            </form>
    </Paper>
    )
}
