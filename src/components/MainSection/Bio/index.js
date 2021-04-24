import cn from "classnames"

import s from "./style.module.css"

const Bio = ({ handlePage }) => {
  return (
    <>
      {handlePage && (
        <div
          className={cn(s.title, s.title1)}
          onClick={() => {
            handlePage === true ? (handlePage = false) : (handlePage = true)
          }}
        >
          Hello, my name is Maksym and I'm Developer.
          <div className={s.links}>
            Github:
            <a href="https://github.com/jilimb0">Account</a>
            <a href="https://github.com/jilimb0/portfolio">Portfolio</a>
          </div>
        </div>
      )}
    </>
  )
}

export default Bio
