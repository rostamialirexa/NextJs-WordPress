import { BlockRenderer } from 'components/BlocksRenderer'
import { MainMenu } from 'components/MainMenu'
import Head from 'next/head'
export const Page = (props) => {
  return (
                    <div>
                      <Head>
                        <title>{props.seo.title}</title>
                        <meta name="description" content={props.seo.metaDesc}/>
                      </Head>
                              <MainMenu 
                              items={props.mainMenuItems} 
                              callToActionLable={props.callToActionLable} 
                              callToActionDestination={props.callToActionDestination}/>
                              <BlockRenderer blocks={props.blocks}/>
                    </div>
  )
}
