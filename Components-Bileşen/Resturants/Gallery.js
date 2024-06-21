export default function ResturantGallery({ Gallarys }) {
  return (
    <>
      <div id="gallery" className="gallery-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div
                className="wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.1s"
              >
                <h2 className="block-title text-center">Our Gallery</h2>
                <p className="title-caption text-center">
                Explore our gallery to see captivating photos of our exquisite dishes, elegant ambiance, and memorable moments.
                </p>
              </div>
              <div className="gal-container clearfix">
                {Gallarys.map((gall) => (
                  <div className="col-md-4 col-sm-6 co-xs-12 gal-item" key={gall._id}>
                    <div className="box">
                      <a href="#" data-toggle="modal" data-target="#2">
                        <img
                          src={`/uploads/images/${gall.image}`}
                          alt={gall.image}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
