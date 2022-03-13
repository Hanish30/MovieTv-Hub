import React,{useState,useEffect} from 'react';
import axios from "axios";
import CustomPagination from "../../Components/Pagination/CustomPagination.js";
import NewsItem from "./NewsItem";
import TextField from '@mui/material/TextField';
import { createMuiTheme, ThemeProvider ,Tabs,Tab} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@mui/material/Button';

 const News = () => {
    const [content,setContent]=useState([]);
    const [page,setPage]=useState(1);
    const [numOfPages,setNumberOfPages]=useState(1);
    const [country,setCountry]=useState("us");
    const theme = createMuiTheme({
      palette: {
       primary: {
        light: '#757ce8',
        main: '#ffffff',
        dark: '#002884',
        contrastText: '#fff',
                },
              },
  });
    const fetchNews= async () => {
        const {data}= await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&category=entertainment&apiKey=6572fbb6c1744c279dd5b82448266c97`);
       // the above line fetches the data from the tmdb api.
       //used to set content as data.results numberOfPages as data.total_pages.
       console.log(data);
        setContent(data.articles);
        setNumberOfPages(Math.floor(70/20)+1);
    }
    useEffect(() => {
        fetchNews();
        // eslint-disable-next-line
    }, [page])
  return (
    <div>
            <span className="pageTitle" style={{fontSize:"170%"}}>News</span>
            <ThemeProvider theme={theme}>
           <div style={{display:"flex",
              margin:"15px 0",
           }}>
               <TextField 
               style={{
                flex : "1",
                color : "#fff",
               }}
               className="searchBox"
               label="Enter your country's 2 word name ex us , in , uk " 
               variant="filled"
                onChange={(event) => {
                         setCountry(event.target.value);
                   }}
                   onKeyPress={fetchNews}
               />
               <Button variant="contained" style={{marginLeft:10, backgroundColor:"#39445a"}} 
               color="primary" onClick={fetchNews}><SearchIcon/></Button>
            </div>
        </ThemeProvider>
            <div className="trending">
                {
                   content && content.map((objContent) => {
                       //checks for content and if content is present then makes a single component for every element in content
                       return <NewsItem key={objContent.publishedAt}
                        id={objContent.publishedAt}
                        title={objContent.title}
                        author={objContent.author}
                        overview={objContent.overview}
                        date={objContent.publishedAt}
                        image={objContent.urlToImage}
                        url={objContent.url}
                        />
                       
                   })
                }
             </div>
             {numOfPages>1 && <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
        </div>
  )
}
export default News;
