import cn from "classnames"

import s from "./style.module.css"

const Bio = ({ handlePage }) => {
  return (
    <>
      {handlePage && (
        <div className={cn(s.title, s.title1)}>
          Hello, my name is Maksym and I'm Developer.
          <div className={s.links}>
            Github:
            <a
              href="https://github.com/jilimb0"
              target="_blank"
              rel="noreferrer"
            >
              Account
            </a>
            <a
              href="https://github.com/jilimb0/portfolio"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Bio
