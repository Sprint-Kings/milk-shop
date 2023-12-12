import Slider from "../slider/Slider";
import logo from "../../img/logo.svg";
import korova1 from "../../img/korova1.jpg";
import korova2 from "../../img/korova2.jpg";
import korova3 from "../../img/korova3.jpg";
const MainPage = () => {
    return (
        <div style={{width: '100%', display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
            <h1 style={{textAlign: 'center', color: '#3F4FD9'}}>Сила гор в стакане молока</h1>
            <Slider>
                <img src={korova1} alt='sdf' style={{height: 'inherit'}}></img>
                <img src={korova2} alt='sdf' style={{height: 'inherit'}}></img>
                <img src={korova3} alt='sdf'style={{height: 'inherit'}}></img>
                <img src={korova3} alt='sdf'style={{height: 'inherit'}}></img>
                <img src={korova3} alt='sdf'style={{height: 'inherit'}}></img>
                <img src={korova3} alt='sdf'style={{height: 'inherit'}}></img>
            </Slider>
        </div>
    )
} 

export default MainPage;