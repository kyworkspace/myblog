import React from 'react';
import axios from 'axios';
import Movie from '../component/Movie';
import './Home.css';

//클래스형 컴포넌트 작성하기
class Home extends React.Component{ //이게 기본 뼈대임
  state ={
    isLoading : true,
    movies:[],
  }

  getMovies = async () =>{ //자바스크립트에서 getMovies() 함수는 시간이 필요하고
    //async는 getMovie함수가 비동기라고 선언하는것.
    //즉 이작업이 끝나기 전에 다음으로 넘어가지 않도록 기다리는 것이라고 보면 됨

    
    //axios의 get()의 실행을 기다려줌
    //즉 여기서 axios의 get의 작업이 끝나길 기다림(await) 한다고 보면 됨
    
    const { 
      data :{
        data :{
          movies
        }
      }
     } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    //this.setState({movies : movies});
    //ES6에서는 변수와 키가 같다면 코드 축약 가능
    this.setState({movies, isLoading:false});
  } 

  componentDidMount(){
    this.getMovies();
  }
  componentWillUnmount(){
    console.log("Home Unmount")
  }

  render(){
    const {isLoading , movies} = this.state;
    return <section className="container" >
      {isLoading ? (<div className="loader" >
        <span className="loader__text">Loading...</span>
      </div>)
      :(
        <div className="movies">
          {movies.map(movie=>(
            <Movie 
              key = {movie.id}
              id = {movie.id}
              year = {movie.year}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
              genres = {movie.genres}
            />
          ))}
        </div>
      )
    }
      
      </section>
  }
}

export default Home;
