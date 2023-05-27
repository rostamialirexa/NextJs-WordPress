import { v4 as uuid } from "uuid"
export const MapMainMenuItems = (menuItems) => {
          return menuItems.map(menuItem => ({
                    id:uuid(),
                    destination:menuItem.menuItem.destination?.uri,
                    lable:menuItem.menuItem.lable,
                    subMenuItems:(menuItem.items || []).map((subMenuItem => ({
                              id:uuid(),
                              destination:subMenuItem.destination?.uri,
                              lable:subMenuItem.lable
                    })))
          }))
}