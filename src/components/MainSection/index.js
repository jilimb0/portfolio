import Bio from "./Bio"
import Examples from "./Examples"
import bg1 from "./img/1.jpg"
import bg2 from "./img/2.jpg"
import bg3 from "./img/3.jpg"
import bg4 from "./img/4.jpg"

import s from "./style.module.css"

const MainSection = ({ handlePortfolio }) => {
  const hour = new Date().getHours()
  let backgroundImage = bg4

  if (hour >= 22 || hour < 6) backgroundImage = bg4
  else if (hour < 12) backgroundImage = bg1
  else if (hour < 18) backgroundImage = bg2
  else backgroundImage = bg3

  return (
    <div
      className={s.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Bio handlePage={handlePortfolio} />
      <Examples />
    </div>
  )
}

export default MainSection
