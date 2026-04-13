import admin from "../../../assets/admin.webp"
import indaapp from "../../../assets/indaapp.webp"
import indulgence from "../../../assets/indulgence.webp"
import pokemon from "../../../assets/pokemon.webp"
import stopcheck from "../../../assets/stopcheck.webp"
import weather from "../../../assets/weather.webp"
import db from "../../../portfolio-db.json"
import s from "./style.module.css"

const Examples = () => {
  return (
    <div className={s.examplesContainer}>
      {Object.values(db).map(({ id, link, descr, ghLink }) => (
        <div className={s.example} key={id}>
          {link ? (
            <a href={link} className={s.link} target="_blank" rel="noreferrer">
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
                          : id === "weather"
                            ? weather
                            : admin
                }
                alt={id}
              />
            </a>
          ) : (
            <div className={s.link}>
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
                          : id === "weather"
                            ? weather
                            : admin
                }
                alt={id}
              />
            </div>
          )}
          <div className={s.description}>
            {descr}
            {ghLink && (
              <a
                href={ghLink}
                className={s.ghLink}
                target="_blank"
                rel="noreferrer"
              >
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
