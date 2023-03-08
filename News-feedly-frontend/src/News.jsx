import React,{useState,useEffect} from "react";
import { Paper, TextField, FormControlLabel, Checkbox, Button,Grid,Box,Typography,CardContent,CardMedia,Card,CardActions,Avatar,CardActionArea } from "@material-ui/core";
import axios from "axios"
import base_url from "./env";

function News(){

  const [NewsData, setNewsData] = useState([])
  const [SearchValue, setSearchValue] = useState('')
  const [checkBox1, setcheckBox1] = useState(true)
  const [checkBox2, setcheckBox2] = useState(true)
  const fetchData=async()=>{
    const data = await axios.get(`${base_url}/api/news?api1=${checkBox1}&api2=${checkBox2}&filter=${SearchValue}`)
    setNewsData(data?.data.data)
  }
  
  useEffect(() => {
    fetchData()
  }, [])

const onChange=(e)=>{
    setSearchValue(e.target.value)
}

const onCheckChange1=()=>{
      setcheckBox1(!checkBox1)

}
const onCheckChange2=()=>{
      setcheckBox2(!checkBox2)
}

const onSubmit = async ()=>{
      const data = await axios.get(`${base_url}/api/news?api1=${checkBox1}&api2=${checkBox2}&filter=${SearchValue}`)
      setNewsData(data?.data.data)
}

const convertDate=(date)=>{
  let converteddate = new Date(date)
  return(converteddate.toLocaleDateString())
}

   return (
      <>
    <Paper elevation={6} style={{ padding: "25px" }}>
      <TextField
        fullWidth
        placeholder="Search..."
        onChange={onChange}
        value={SearchValue}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkBox1}
            onChange={onCheckChange1}
          />
        }
        label="News Org"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkBox2}
            onChange={onCheckChange2}
          />
        }
        label="Gnu News"
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Paper>
    <Grid container spacing={3}>
    {
      
      NewsData?.map((data)=>{
          return(
            <Grid item xs={12} sm={6} md={4} >   
              <Card style={{maxWidth: "100%" ,height:600}}>
                <CardActionArea>
                  <CardMedia
                    style={{height: 240}}
                    image={data?.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     {data?.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{display: "flex",marginLeft: "10px",verticalAlign:"bottom", justifyContent: "space-between"}}>
                  <Box style={{display: "flex"}}>
                    <Box ml={2} >
                      <Typography  variant="subtitle2" component="p">
                        {data?.apiname}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" component="p">
                        {convertDate(data?.date)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                  </Box>
                </CardActions>
              </Card>
           </Grid>
          )
      })
    }
  </Grid>
    
    </>
   ) 
}


export default News