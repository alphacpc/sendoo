import "./../assets/sass/Register.scss";
import Logo from "./../assets/images/Logo/Sendoo4.png";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaKey,
  FaLock,
  FaUsers,
} from "react-icons/fa";

export default function Register() {
  return (
    <div className="RegisterContainer">
      <div className="goHome">
        <Link to="/" className="goHomeLinke">
          <FaHome size={50} color="white" />
        </Link>
      </div>

      <img src={Logo} alt="" />
      <form id="RegisterForm">
        <div className="RegisterFormGroup">
          <div className="RegisterFormGroupItem">
            <FaUser color="green" />
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Entrer votre prenom"
            />
          </div>
          <div className="RegisterFormGroupItem">
            <FaUsers color="green" />
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Entrer votre nom de famille"
            />
          </div>
        </div>

        <div className="RegisterFormGroup">
          <div className="RegisterFormGroupItem">
            <FaUser color="green" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Entrer votre nom d'utilisateur"
            />
          </div>
          <div className="RegisterFormGroupItem">
            <FaEnvelope color="green" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrer votre email"
            />
          </div>
        </div>

        <div className="RegisterFormGroup">
          <div className="RegisterFormGroupItem">
            <FaLock color="green" />
            <input
              type="password"
              id="mdp"
              name="mdp"
              placeholder="Entrer votre mot de passe"
            />
          </div>
          <div className="RegisterFormGroupItem">
            <FaKey color="green" />
            <input
              type="password"
              id="mdpc"
              name="mdpc"
              placeholder="Entrer a nouveau votre mot de passe"
            />
          </div>
        </div>

        <div className="btnSave">
          <button>s'inscrire</button>
        </div>

        <div className="signup">
          <p>
            Vous avez deja un compte !
            <Link to="login" id="link">
              se connecter
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
