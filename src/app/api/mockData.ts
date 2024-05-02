import crown from "../../shared/assets/icons/crown.svg?react" 
import crownF from "../../shared/assets/icons/crownF.svg?react" 
import house from "../../shared/assets/icons/house.svg?react"
// import houseF from "../../shared/assets/icons/houseF.svg?react"   
// Currently there's only one variant of house svg, so house and houseF have the same path
import houseF from "../../shared/assets/icons/house.svg?react"
import sword from "../../shared/assets/icons/sword.svg?react"
import swordF from "../../shared/assets/icons/swordF.svg?react"
import trophy from "../../shared/assets/icons/trophy.svg?react"
import trophyF from "../../shared/assets/icons/trophyF.svg?react"


export const  mockNavData = [
    {
        svgSrc: house,
        svgFilledSrc: houseF,
        text: 'Feed',
        route: '/feed',
    },
    {
        svgSrc: trophy,
        svgFilledSrc: trophyF,
        text: 'Contests',
        route: '/contests',
    },
    {
        svgSrc: sword,
        svgFilledSrc: swordF,
        text: 'Battles',
        route: '/battles',
    },
    {
        svgSrc: crown,
        svgFilledSrc: crownF,
        text: 'Top users',
        route: '/topUsers',
    },
]