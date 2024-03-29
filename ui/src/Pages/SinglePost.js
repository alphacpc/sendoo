import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Context } from "../context/Context";

import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import CardPost from "../components/CardPost";

import "./../assets/sass/SinglePost.scss";

import { DeleteOutline, Edit} from "@material-ui/icons";
import { makeStyles, Container, Grid, Typography, Avatar, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";


import thomas from "./../assets/images/thomas.jpg";


const SinglePost = () => {

  const classes = useStyles();

  const [value, setValue] = useState(3);

  const { postID } = useParams();
  const [currentPost, setCurrentPost] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isRelated, setIsRelated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const {user} = useContext(Context)



  const fetchCurrentPost = async ()=>{
      const response = await axios.get(`/posts/${postID}`);
      await setCurrentPost(response.data);
      setLoaded(true);
  }


  const fetchRelatedPost = async ()=> {

    const response = await axios.get(`/posts?category=${currentPost.postCategory}`);
    const datas = await response.data;
    const related = await datas.filter(data => data._id !== currentPost._id);

    if(related.length > 0){
      setRelatedPosts(related);
      setIsRelated(true);
    }else{
      setIsRelated(false);
    }

  }

  const renderRelatedPost = ()=>{
    return <React.Fragment>
    
      <h4 className="relatedPost">Articles associés</h4>
            
      <Grid container spacing={4}>
        { relatedPosts.map((post, index) => <CardPost post={post} index={index} reload={true}/>) }
      </Grid>

    </React.Fragment>;
  }

  const checkRelated = (isRelated) ? renderRelatedPost() : "";

  useEffect( async()=>{
    await fetchCurrentPost();
    
    fetchRelatedPost();

  },[loaded])

  // console.log(user)

  if(user?.userName === currentPost.postAuthor){
    console.log("Hello word user == post");
  }

  return (!loaded) ? (<Loader/>) : (
    
    <div>

      <Navbar />

      <div className="divImgPost">
        
        <img src={`http://localhost:4040/images/${currentPost.postPhoto}`} alt={`${currentPost.postAuthor}`}/>
      
      </div>

      <Container>

        <Breadcrumb />

        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <div className={classes.divAuthor}>
                <Avatar
                  alt="thomas_sankara"
                  className={classes.avatar}
                  src={thomas}
                />
                <Typography variant="span" component="h5">{currentPost.postAuthor}</Typography>
                <Typography variant="span" component="p">
                  Homme d'Etat
                </Typography>
              </div>
            </Grid>

            <Grid item xs={10}>
              <div className={classes.postContent}>
                
                <div className={classes.postTitleDate}>
                  <Typography variant="span" component="h1">{currentPost.postTitle}</Typography>
                  <Typography variant="span" component="h5">{new Date(currentPost.createdAt).toLocaleDateString()}</Typography>
                </div>

                
                {user?.userName === currentPost.postAuthor && (
                  <div className="divUpdate">
                    <button className="btn-edit"><Edit/>modifier</button>
                    <button className="btn-delete"><DeleteOutline/>Supprimer</button>
                  </div>
                )}
                

                <div className={classes.postTextContent}>
                  <Typography variant="p" component="p">
                    {currentPost.postBody}
                  </Typography>
                </div>
              </div>

              <div className={classes.notes}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography variant="span" component="h3">
                    Note(s)
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>

        <Container >{checkRelated}</Container>

      </Container>

      <Footer />
    </div>
  );
};

export default SinglePost;

const useStyles = makeStyles((theme) => ({
  divAuthor: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    height: 80,
    width: 80,
    marginBottom: 10,
  },

  postTitleDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  postTextContent: {
    lineHeight: 2,
    fontSize: 18,
    textAlign: "justify",
  },

  notes: {
    marginTop: 20,
  },
}));
