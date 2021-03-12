import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import './Detail.css';

class Detail extends React.Component{
    state = {
        isLoading : true,
        id: 0,
        movie:[],
    }
      getMovieDetail = async () =>{ 
        const {location} = this.props;
        const { 
            data :{
                data:{
                    movie
                }
            }
         } = await axios.get('https://yts-proxy.now.sh/movie_details.json?movie_id='+location.state.id);
        //ES6에서는 변수와 키가 같다면 코드 축약 가능
        if(movie){
            this.setState({movie, isLoading:false});
        }else{
            alert("상세정보를 찾을수 없습니다.");
            this.props.history.push("/");
        }
      } 


    componentDidMount(){
        const {location,history} = this.props;
        if(location === undefined){
            history.push('/profile/project/movieApp/Home');
        }else{
            this.getMovieDetail();
        }
    }
    render(){
        const {location} = this.props;
        const {isLoading , movie} = this.state;
        if(location && location.state){
            return (<section className = "container">
                    {isLoading ? (<div className="loader" >
                                    <span className="loader__text">Loading...</span>
                                </div>) : 
                            (<div className="movie_detail">
                                <table>
                                    <tr>
                                        <td rowSpan="6"><img src={movie.medium_cover_image} alt={movie.title}/></td>
                                        <td>title</td>
                                        <td>{movie.title}</td>
                                    </tr>
                                    <tr>
                                        <td>year</td>
                                        <td>{movie.year}</td>
                                    </tr>
                                    <tr>
                                        <td>genres</td>
                                        <td>{movie.genres.map((genre,idx)=>{return <span key={idx}>{genre} </span>})}</td>
                                    </tr>
                                    <tr>
                                        <td>rating</td>
                                        <td>{movie.rating}</td>
                                    </tr>
                                    <tr>
                                        <td>year</td>
                                        <td>{movie.year}</td>
                                    </tr>
                                    <tr>
                                        <td>Download Count</td>
                                        <td>{movie.download_count}</td>
                                    </tr>
                                    <tr>
                                        <td >Description</td>
                                        <td colSpan="2">{movie.description_full}</td>
                                    </tr>
                                </table>
                            </div>)
                                }
                </section>
            )
        }else{
            return null;
        }
        
    }
}

export default withRouter(Detail);