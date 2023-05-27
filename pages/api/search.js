const { gql } = require("@apollo/client")
const { default: client } = require("client")

const handler = async (req,res) => {
          try {
            const filters = JSON.parse(req.body)

            let hasParkingFilter = ``;
            let petFriendlyFilter = ``;
            let minPriceFilter = ``;
            let maxPriceFilter = ``;

            if(filters.hasParking) {
              hasParkingFilter = `
              {
                key:"has_Parking"
                compare:EQUAL_TO
                value:"1"
              },
              `
            }
            if(filters.petFriendly) {
              petFriendlyFilter = `
              {
                key:"pet_friendly"
                compare:EQUAL_TO
                value:"1"
              },
              `
            }
            if(filters.maxPrice) {
              maxPriceFilter = `
              {
                key:"price"
                compare:LESS_THAN_OR_EQUAL_TO
                value:"${filters.maxPrice}"
                type:NUMERIC
              }
              `
            }
            if(filters.minPrice) {
              minPriceFilter = `
              {
                key:"price"
                compare:GREATER_THAN_OR_EQUAL_TO
                value:"${filters.minPrice}"
                type:NUMERIC
              }
              `
            }


                    const {data} = await client.query({
                              query: gql`
                                        query AllPropertiesQuery {
                                                  propertys (where: {offsetPagination: {size: 3, offset: ${((filters.page || 1) -1) *3}}
                                                  metaQuery: {
                                                    relation:AND
                                                    metaArray: [
                                                      ${petFriendlyFilter}
                                                      ${hasParkingFilter}
                                                      ${minPriceFilter}
                                                      ${maxPriceFilter}
                                                    ]}
                                                }){
                                                            pageInfo {
                                                                      offsetPagination {
                                                                        total
                                                                      }
                                                                    }
                                                            nodes {
                                                                      databaseId
                                                                      title
                                                                      uri
                                                                      featuredImage{
                                                                                node{
                                                                                          uri
                                                                                          sourceUrl
                                                                                }
                                                                      }
                                                                      PropertyFeatures{
                                                                                bathrooms
                                                                                bedrooms
                                                                                hasParking
                                                                                petFriendly
                                                                                price
                                                                      }
                                                            }
                                                  }
                                        }
                              `
                    });
                    return res.status(200).json({
                              total:data.propertys.pageInfo.offsetPagination.total,
                              properties:data.propertys.nodes
                    })
          } catch (error) {
                    console.log(error)
          }
}
export default handler