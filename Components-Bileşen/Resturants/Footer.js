export default function ResturantFooter({
  About,
  Adress,
  Phone,
  Mail,
  Logo,
  Meals,
}) {
  return (
    <>
      <div id="footer" className="footer-main">
        <div className="footer-box pad-top-70">
          <div className="container">
            <div className="row">
              <div className="footer-in-main">
                <div className="footer-logo">
                  <div className="text-center w-64">
                    <img src={`/uploads/images/${Logo}`} alt="" />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-box-a">
                    <h3>About Us</h3>
                    <p>{About?.split(" ").slice(0, 25).join(" ")} ....</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-box-b">
                    <h3>New Menu</h3>
                    <ul>
                      {Meals.slice(0, 4).map((meal, index) => (
                        <li key={index}>
                          <a href="#">{meal.Name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-box-c">
                    <h3>Contact Us</h3>
                    <p>
                      <i className="fa fa-map-signs" aria-hidden="true"></i>
                      <span>{Adress}</span>
                    </p>
                    <p>
                      <i className="fa fa-mobile" aria-hidden="true"></i>
                      <span>{Phone}</span>
                    </p>
                    <p>
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                      <span>
                        <a href={`mailto:${Mail}`}>{Mail}</a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
