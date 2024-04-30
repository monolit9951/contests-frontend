import "./contestsFilter.scss"

export const ContestsFilter = () => {
    return (
        <div className="contestsFilter_container">
            <button type="button" className="filter_option">All</button>
            <button type="button" className="filter_option">For fun</button>
            <button type="button" className="filter_option">For work</button>
        </div>
    )
}