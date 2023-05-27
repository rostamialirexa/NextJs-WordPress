import { ButtonLink } from "components/ButtonLink"

export const CallToActionButton = ({align = 'left',buttonLable,destination}) => {
  const alignMap = {
    left:"text-left",
    center:"text-center",
    right:"text-right",
  }
  return (
    <div className={alignMap[align]}>
      <ButtonLink  destination={destination} lable={buttonLable}/>
    </div>
  )
}
