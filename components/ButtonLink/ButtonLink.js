import Link from "next/link"

export const ButtonLink = ({destination,lable}) => {
  return (
          <Link href={destination} legacyBehavior>
                    <a className="btn">
                              {lable}
                    </a>
          </Link>
  )
}
