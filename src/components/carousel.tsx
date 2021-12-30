function Carousel(){
    return(
        <div id = "carouselExampleCaptions" className = "carousel slide" data-bs-ride = "carousel">
            <div className = "carousel-indicators">
                <button type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide-to = "0" className = "active" aria-current = "true" aria-label = "Slide 1"></button>
                <button type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide-to = "1" aria-label = "Slide 2"></button>
                <button type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide-to = "2" aria-label = "Slide 3"></button>
                <button type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide-to = "3" aria-label = "Slide 4"></button>
                <button type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide-to = "4" aria-label = "Slide 5"></button>
            </div>
            <div className = "carousel-inner">
            <div className = "carousel-item active">
                <img src = "/add_item.jpg" className = "d-block w-100" alt = "..."/>
                <div className = "carousel-caption d-none d-md-block">
                    <h5>How do I add a new item?</h5>
                    <p>Simply click the new item button circled in red!</p>
                </div>
            </div>
            <div className = "carousel-item">
                <img src = "/add_category.jpg" className = "d-block w-100" alt = "..."/>
                <div className = "carousel-caption d-none d-md-block">
                    <h5>How do I organise my list?</h5>
                    <p>You can use the add category button circled in red to create your personal category.</p>
                </div>
            </div>
            <div className = "carousel-item">
                <img src = "/filter_category.jpg" className = "d-block w-100" alt = "..."/>
                <div className = "carousel-caption d-none d-md-block">
                    <h5>How do I filter my list according to catgory?</h5>
                    <p>Click on the category that you want to view</p>
                </div>
            </div>
            <div className = "carousel-item">
                <img src = "/show_all_items.jpg" className = "d-block w-100" alt = "..."/>
                <div className = "carousel-caption d-none d-md-block">
                    <h5>How do I view all list items?</h5>
                    <p>Just click on the Show All Items button circled in red.</p>
                </div>
            </div>
            <div className = "carousel-item">
                <img src = "/delete.jpg" className = "d-block w-100" alt = "..."/>
                <div className = "carousel-caption d-none d-md-block">
                    <h5>How do I delete items and categories?</h5>
                    <p>Click on the buttons circled in red to delete items or categories.</p>
                </div>
            </div>
            </div>
            <button className = "carousel-control-prev" type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide = "prev">
            <span className = "carousel-control-prev-icon" aria-hidden = "true"></span>
            <span className = "visually-hidden">Previous</span>
            </button>
            <button className = "carousel-control-next" type = "button" data-bs-target = "#carouselExampleCaptions" data-bs-slide = "next">
            <span className = "carousel-control-next-icon" aria-hidden = "true"></span>
            <span className = "visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;