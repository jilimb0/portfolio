import logo from "../../assets/logo.webp"
import db from "../../portfolio-db.json"
import s from "./style.module.css"

const Header = ({ handlePortfolio }) => {
  return (
    <header className={s.header}>
      <ul className={s.ul}>
        <li className={s.logoItem}>
          <button
            className={s.logoButton}
            onClick={handlePortfolio}
            type="button"
            aria-label="Toggle portfolio details"
          >
            <img src={logo} alt="" className={s.logo} />
          </button>
        </li>
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
