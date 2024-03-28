import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoadingPulsePaw = ({containerClasses='', iconClasses='',text='LOADING...'}: {containerClasses?:string,  iconClasses?: string, text?:string}) => {
  return (
      <div
        className={` text-[20px] font-bold animate-pulse tracking-wider ${containerClasses}`}
      >
          <span>{text}</span> 
          <FontAwesomeIcon
              icon={faPaw}
              bounce
              className={`${iconClasses} `}
          /> 
    </div>
  )
}

export default LoadingPulsePaw