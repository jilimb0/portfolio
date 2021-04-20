import db from "../../../portfolio-db.json"
import s from "./style.module.css"
import stopcheck from "../../../assets/stopcheck.webp"
import pokemon from "../../../assets/pokemon.webp"
import indulgence from "../../../assets/indulgence.webp"
import indaapp from "../../../assets/indaapp.webp"
import admin from "../../../assets/admin.webp"

const Examples = () => {
  return (
    <div className="examples-container">
      {Object.values(db).map(({ id, link, descr, ghLink }) => (
        <div className={s.example} key={id}>
          <a href={link} className={s.link}>
            <img
              id={id}
              src={
                id === "stopcheck"
                  ? stopcheck
                  : id === "pokemon"
                  ? pokemon
                  : id === "indulgence"
                  ? indulgence
                  : id === "indaapp"
                  ? indaapp
                  : admin
              }
              alt={id}
            />
          </a>
          <div className={s.description}>
            {descr}
            {ghLink && (
              <a href={ghLink} className={s.ghLink}>
                Link to GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Examples
