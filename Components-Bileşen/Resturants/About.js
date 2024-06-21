export default function ResturantAbout({About})
{
    return(
        <>
        
    <div id="about" className="about-main pad-top-100 pad-bottom-100">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        <h2 className="block-title"> About Us </h2>
                        <h3>IT STARTED, QUITE SIMPLY, LIKE THIS...</h3>
                        <p>{About}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        <div className="about-images">
                            <img className="about-main" src="about-main.jpg" alt="About Main Image"/>
                            <img className="about-inset" src="about-inset.jpg" alt="About Inset Image"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        </>
    )
}