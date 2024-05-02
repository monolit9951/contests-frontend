import crown from "../../shared/assets/icons/crown.svg?react"
import house from "../../shared/assets/icons/house.svg?react"
import sword from "../../shared/assets/icons/sword.svg?react"
import trophy from "../../shared/assets/icons/trophy.svg?react"

export const  mockNavData = [
    {
        imgSrc: house,
        imgAlt: 'house',
        text: 'Feed',
        route: '/feed',
    },
    {
        imgSrc: trophy,
        imgAlt: 'trophy',
        text: 'Contests',
        route: '/contests',
    },
    {
        imgSrc: sword,
        imgAlt: 'sword',
        text: 'Battles',
        route: '/battles',
    },
    {
        imgSrc: crown,
        imgAlt: 'crown',
        text: 'Top users',
        route: '/topUsers',
    },
]