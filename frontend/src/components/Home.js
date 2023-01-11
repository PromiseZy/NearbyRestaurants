import React, { useState, useEffect } from 'react';
import Header from './Header'
import WebFont from 'webfontloader';
import './Home.css'
import Box from '@mui/material/Box';
//import SearchTextField,* as mySTF from './SearchTextField'
import exampleDatas from '../example_data.json'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Home() {
  // Get the current day of the month
  const day = new Date().getDay();
  const [nowday, setNowday] = useState(0)
  const [category, setCategory] =useState("All")
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [lengthOfData,setLengthOfData] = useState(0);
  const [countItem,setCountItem] = useState(9);
  const start = (page - 1) * countItem;
  const end = start + countItem;
  var ExamArray = {};
  
  if(category==="All"){
    ExamArray = exampleDatas
  }else if(category==="cafe"){
    ExamArray = exampleDatas.filter(item => (item.categories[0] === "cafe" || item.categories[1] === "cafe"||item.categories[2] === "cafe"));
  }else if(category==="restaurant"){
    ExamArray = exampleDatas.filter(item => (item.categories[0] === "restaurant" || item.categories[1] === "restaurant"||item.categories[2] === "restaurant"));
  }else if(category==="bakery"){
    ExamArray = exampleDatas.filter(item => (item.categories[0] === "bakery" || item.categories[1] === "bakery"||item.categories[2] === "bakery"));
  }
  const handleNext = () => {
    setPage(page + 1);
    console.log("page is ",page,"start is",start,"end is ",end)
  }
  const handlePrevios = () => {
    setPage(page - 1);
    console.log("page is ",page,"start is",start,"end is ",end)
  }
  function editCategory(data){
    setCategory(data);
    console.log(category);
  }
  const handleChange = (event) => {
    editCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Kanit']
      }
    });
   }, []);
   useEffect(() =>{
    day===0 ? setNowday(6):setNowday(day-1)
   },[ day]);
  return (
    <>
    <Header/>
    <Box sx={{ flexGrow: 1 ,position: 'sticky', top: 64,width: "100%"}} >
      <AppBar position="static" style={{fontFamily: 'Kanit' , backgroundColor:"#C4D3E9"}}>
        <Toolbar>
        
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{fontFamily: 'Kanit' , flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{color: '#000000'}}
          >
            Place List
          </Typography>
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label"style={{fontFamily: 'Kanit' }}>All</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={category}
          label="Category"
          onChange={handleChange}
          style={{fontFamily: 'Kanit' }}
        >
          <MenuItem value={"All"} >All</MenuItem>
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"bakery"}>Bakery</MenuItem>
          <MenuItem value={"cafe"}>Cafe</MenuItem>
        </Select>
      </FormControl>
    </Box>{"                   "}|{" "}
          <Search
          value={searchTerm}
          onChange={handleSearchChange}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search name…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
      {
        ExamArray.slice(start, end) && ExamArray.slice(start, end).map( exampleData => {
          if(searchTerm===''){
            if(lengthOfData!==ExamArray.length){
              setLengthOfData(ExamArray.length)
              setCountItem(9)
            }
            return(
              <Box sx={{ flexGrow: 1 , display: 'inline-block'
              ,justifyContent:"center",alignItems:"center"}} 
              onClick={() => 
                alert((exampleData.name.toUpperCase())+"  •"+(exampleData.rating)+"\n"+"Address : "+(exampleData.address)+
                "\n == Opening Hour==  \n"
                +(exampleData.operation_time[6].day)+": "+(exampleData.operation_time[6].time_open)+"-"+(exampleData.operation_time[6].time_close)+"\n"
                +(exampleData.operation_time[0].day)+": "+(exampleData.operation_time[0].time_open)+"-"+(exampleData.operation_time[0].time_close)+"\n"
                +(exampleData.operation_time[1].day)+": "+(exampleData.operation_time[1].time_open)+"-"+(exampleData.operation_time[1].time_close)+"\n"
                +(exampleData.operation_time[2].day)+": "+(exampleData.operation_time[2].time_open)+"-"+(exampleData.operation_time[2].time_close)+"\n"
                +(exampleData.operation_time[3].day)+": "+(exampleData.operation_time[3].time_open)+"-"+(exampleData.operation_time[3].time_close)+"\n"
                +(exampleData.operation_time[4].day)+": "+(exampleData.operation_time[4].time_open)+"-"+(exampleData.operation_time[4].time_close)+"\n"
                +(exampleData.operation_time[5].day)+": "+(exampleData.operation_time[5].time_open)+"-"+(exampleData.operation_time[5].time_close)+"\n"

                )

              }>
              <Grid item xs={4}>
              <div className= "container" key = {exampleData.id} style={{fontFamily: 'Kanit' }}>
                <Box
                  className='content-box'
                  sx={{
                   width: "flex",
                  height: "flex",
                  
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                   backgroundColor: '#E0E0E0',
                  opacity: [0.9, 0.8, 0.7],
                    },
                  }}>
                  <div className='content-con' style={{ border:'2px solid black',borderRadius: "25px"}}>
                    <div className='content-l'>
                      <img src={exampleData.profile_image_url} ></img>
                    </div>
                  <div className='content-r'>
                      <h2>{exampleData.name}</h2>
                      <h4><CalendarMonthIcon/>
                      {(() => { if(exampleData.operation_time[nowday].time_open==="closed"){
                        return("closed")
                      }else{
                        const open = exampleData.operation_time[nowday].time_open;
                        const close = exampleData.operation_time[nowday].time_close;
                        const opentime = " "+open+" - "+close+" ";
                        return(opentime)
                      }
              
                      })()}
                      <FiberManualRecordIcon fontSize='small' color="primary"/>{exampleData.rating}</h4>
                  </div>
                  <div className='content-b'>
                    <img src={exampleData.images[0]} ></img>
                    <img src={exampleData.images[1]} ></img>
                    <img src={exampleData.images[2]} ></img>
                  </div><div className='content-b-m' style={{ border:'2px solid black' ,backgroundColor:'#C4D3E9'}}>
                    <img src={exampleData.images[0]} ></img>
                    <img src={exampleData.images[1]} ></img>
                    <img src={exampleData.images[2]} ></img>

                  </div>
                </div>
                </Box>
              </div>
              </Grid>
              </Box>
              
            )
          }else{
            for (let i = 0; i < ExamArray.length; i++) {
              if(ExamArray[i].name.toLowerCase()===searchTerm.toLowerCase()){
                if(lengthOfData!==1){
                  setLengthOfData(1)
                  setCountItem(1)
                }
                
                return(
                  <Box sx={{ flexGrow: 1 , display: 'inline-block'
                  ,justifyContent:"center",alignItems:"center"}} 
                  onClick={() => 
                  alert((exampleData.name.toUpperCase())+"  •"+(exampleData.rating)+"\n"+"Address : "+(exampleData.address)+
                  "\n == Opening Hour==  \n"
                  +(exampleData.operation_time[6].day)+": "+(exampleData.operation_time[6].time_open)+"-"+(exampleData.operation_time[6].time_close)+"\n"
                  +(exampleData.operation_time[0].day)+": "+(exampleData.operation_time[0].time_open)+"-"+(exampleData.operation_time[0].time_close)+"\n"
                  +(exampleData.operation_time[1].day)+": "+(exampleData.operation_time[1].time_open)+"-"+(exampleData.operation_time[1].time_close)+"\n"
                  +(exampleData.operation_time[2].day)+": "+(exampleData.operation_time[2].time_open)+"-"+(exampleData.operation_time[2].time_close)+"\n"
                  +(exampleData.operation_time[3].day)+": "+(exampleData.operation_time[3].time_open)+"-"+(exampleData.operation_time[3].time_close)+"\n"
                  +(exampleData.operation_time[4].day)+": "+(exampleData.operation_time[4].time_open)+"-"+(exampleData.operation_time[4].time_close)+"\n"
                  +(exampleData.operation_time[5].day)+": "+(exampleData.operation_time[5].time_open)+"-"+(exampleData.operation_time[5].time_close)+"\n"

                )

              }>
                  <Grid item xs={4}>
                  <div className= "container" key = {ExamArray[i].id} style={{fontFamily: 'Kanit' }}>
                    <Box
                      className='content-box'
                      sx={{
                       width: "flex",
                      height: "flex",
                      
                      backgroundColor: '#FFFFFF',
                      '&:hover': {
                       backgroundColor: '#E0E0E0',
                      opacity: [0.9, 0.8, 0.7],
                        },
                      }}>
                      <div className='content-con' style={{ border:'2px solid black',borderRadius: "25px"}}>
                        <div className='content-l'>
                          <img src={ExamArray[i].profile_image_url} ></img>
                        </div>
                      <div className='content-r'>
                          <h2>{ExamArray[i].name}</h2>
                          <h4><CalendarMonthIcon/>
                          {(() => { if(exampleData.operation_time[nowday].time_open==="closed"){
                            return("closed")
                          }else{
                            const open = exampleData.operation_time[nowday].time_open;
                            const close = exampleData.operation_time[nowday].time_close;
                            const opentime = " "+open+" - "+close+" ";
                            return(opentime)
                            }
              
                      })()}
                          <FiberManualRecordIcon fontSize='small' color="primary"/>{ExamArray[i].rating}</h4>
                      </div>
                      <div className='content-b'>
                        <img src={ExamArray[i].images[0]} ></img>
                        <img src={ExamArray[i].images[1]} ></img>
                        <img src={ExamArray[i].images[2]} ></img>
                      </div><div className='content-b-m' style={{ border:'2px solid black' ,backgroundColor:'#C4D3E9'}}>
                        <img src={ExamArray[i].images[0]} ></img>
                        <img src={ExamArray[i].images[1]} ></img>
                        <img src={exampleData.images[2]} ></img>
                      </div>
                    </div>
                    </Box>
                  </div>
                  </Grid>
                  </Box>
                )
              }
            }
            
            
          }

          
          }
        )
      }
      <div className='NavPage'>
      {(() => {
              if(lengthOfData<=9){
                return ("")
              }
              else if((page===1)&&(end<lengthOfData)&&searchTerm===''){
                return (<p>
                  <text></text>
                  <Button  variant="contained" style={{fontFamily: 'Kanit'}} onClick={handleNext}>Next</Button>
                </p>)
              }
              else if ((page>=2)&&end<lengthOfData&&searchTerm===''){
                
                return(<p>
                  <Button variant="contained" style={{fontFamily: 'Kanit'}} onClick={handlePrevios}>Previous</Button>
                  <Button variant="contained" style={{fontFamily: 'Kanit'}} onClick={handleNext}>Next</Button>
                  </p>
                
                );
              }
              else if((page!==1)&&end>=lengthOfData&&searchTerm===''){
                return(<p>
                  <Button variant="contained" style={{fontFamily: 'Kanit'}} onClick={handlePrevios}>Previous</Button>
                  </p>);
              }
            })()}

            {(() => {
              
            })()}
            </div>
    </>
  );
}

export default Home;