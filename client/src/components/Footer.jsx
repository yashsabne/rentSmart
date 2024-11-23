import "../styles/Footer.css"
import { LocalPhone, Email } from "@mui/icons-material"
import { Link } from "react-router-dom"; 
const Footer = () => {

  const year = new Date().getFullYear();


  return (
    <div className="footer">
      <div style={{width:'50%', display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly' }}>
      <div className="footer_left">
        <a href="/"><img src="/assets/logoa.png" alt="logo" /></a>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 72764 62261</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>yashsabne39@gmail.com</p>
        </div>
        <Link to="/help" style={{color:'yellow',textDecoration:'none'}} > <div> 😊 info about project </div></Link>     
   
      </div>
   
      </div>

      <div className="footer_bottom">
        <p>© {year} Yash Sabne. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
