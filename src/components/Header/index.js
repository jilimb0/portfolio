import db from "../../portfolio-db.json"
import s from "./style.module.css"

import logo from "../../assets/logo.webp"

const Header = ({ handlePortfolio }) => {
  return (
    <header className={s.header}>
      <img
        src={logo}
        alt=""
        className={s.logo}
        onClick={() => handlePortfolio()}
      />
      <ul className={s.ul}>
        {Object.values(db).map(({ id, name }) => (
          <li className={s.li} key={id}>
            <a href={`#${id}`} className={s.a}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
