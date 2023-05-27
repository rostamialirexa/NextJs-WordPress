import { gql } from "@apollo/client"
import client from "client"
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks"
import { MapMainMenuItems } from "./MapMainMenuItems"

export const getPageStaticProps = async (context) => {
          const uri = context.params?.slug ?  `/${context.params.slug.join('/')}/` : '/'
          const {data} = await client.query({
            query:gql`
            query PageQuery($uri: String!) {
              nodeByUri(uri: $uri) {
                ... on Page {
                  id
                  title
                  blocks
                  seo {
                    title
                    metaDesc
                  }
                }
                ... on Property {
                  id
                  title
                  blocks
                  seo {
                    title
                    metaDesc
                  }
                }
              }
              acfOptionsMainMenu {
                mainMenu {
                  callToActionButton {
                    lable
                    destination {
                      ... on Page {
                        uri
                      }
                    }
                  }
                  menuItems {
                    menuItem {
                      destination{
                        ... on Page {
                          uri
                        }
                      }
                      lable
                    }
                    items {
                      destination {
                        ... on Page {
                          uri
                        }
                      }
                      lable
                    }
                  }
                }
              }
            }
            `,
            variables: {
                    uri
            }
            
          })
          const blocks= cleanAndTransformBlocks(data.nodeByUri.blocks)
          return {
            props:{
              seo:data.nodeByUri.seo,
              mainMenuItems:MapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
              blocks,
              callToActionLable:data.acfOptionsMainMenu.mainMenu.callToActionButton.lable,
              callToActionDestination:data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
            }
          }
        }