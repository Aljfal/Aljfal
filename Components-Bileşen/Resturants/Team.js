export default function ResturantTeam({ Employees }) {
  return (
    <>
      <div
        id="our_team"
        className="team-main pad-top-100 pad-bottom-100 parallax"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div
                className="wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.1s"
              >
                <h2 className="block-title text-center">Our Team</h2>
                <p className="title-caption text-center">
                  Our team is dedicated to providing an outstanding dining
                  experience. Our talented chefs craft culinary masterpieces,
                  while our friendly and attentive staff ensure every detail is
                  perfect. Together, we strive for excellence in service and
                  hospitality, making your visit truly memorable.{" "}
                </p>
              </div>
              <div className="team-box">
                <div className="row">
                  {Employees.map((emplyee) => (
                    <div className="col-md-4 col-sm-6" key={emplyee._id}>
                      <div className="sf-team">
                        <div className="thumb">
                          <a href="#">
                            <img
                              src={`/uploads/images/${emplyee.image}`}
                              alt={emplyee.image}
                            />
                          </a>
                        </div>
                        <div className="text-col relative">
                          <h3>{emplyee.Name}</h3>
                          <p >
                            {emplyee.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
