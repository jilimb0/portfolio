import Bio from "./Bio"
import Examples from "./Examples"
import bg1 from "./img/1.jpg"
import bg2 from "./img/2.jpg"
import bg3 from "./img/3.jpg"
import bg4 from "./img/4.jpg"

import s from "./style.module.css"

const MainSection = ({ handlePortfolio }) => {
  var now = new Date().getHours()

  if (now < 5) now = bg1
  if (now < 14) now = bg2
  if (now < 17) now = bg3
  if (now < 20) now = bg4
  return (
    <div className={s.container} style={{ backgroundImage: `url(${now})` }}>
      <Bio handlePage={handlePortfolio} />
      <Examples />
    </div>
  )
}

export default MainSection
