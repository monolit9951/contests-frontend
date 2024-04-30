import "../ui/contestsFilter.scss"

export const ContestsFilter = () => {
    return (
        <div className="contestsFilter_container">
            <div className="filter_option">All</div>
            <div className="filter_option">For fun</div>
            <div className="filter_option">For work</div>
        </div>
    )
}