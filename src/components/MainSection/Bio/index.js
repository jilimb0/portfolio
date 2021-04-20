import { useEffect, useState } from "react"
import cn from "classnames"

import s from "./style.module.css"

const Bio = ({ handlePage }) => {
  const [title1, setTitle1] = useState(true)
  const [title2, setTitle2] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTitle1(false)
      setTitle2(true)
    }, 2000)
    setTimeout(() => {
      setTitle2(false)
    }, 4000)
  }, [])

  return (
    <>
      {(title1 || handlePage) && (
        <div className={cn(s.title, s.title1)}>
          Hello, my name is Maksym and I'm Developer.
          <div className={s.links}>
            Github:
            <a href="https://github.com/jilimb0">Account</a>
            <a href="https://github.com/jilimb0/portfolio">Portfolio</a>
          </div>
        </div>
      )}

      {title2 && (
        <div className={cn(s.title, s.title2)}>
          What I develop? <br /> Let's see!
        </div>
      )}
    </>
  )
}

export default Bio
