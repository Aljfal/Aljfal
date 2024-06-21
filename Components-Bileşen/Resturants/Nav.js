import { useState } from "react";

export default function ResturantNav({Logo,Name}) {
  const [activeLink, setActiveLink] = useState("Home");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      <div id="site-header">
        <header id="header" className="header-block-top">
          <div className="container">
            <div className="row">
              <div className="main-menu">
                <nav className="navbar navbar-default" id="mainNav">
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#navbar"
                      aria-expanded="false"
                      aria-controls="navbar"
                    >
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <div className="logo">
                      <a
                        className="navbar-brand js-scroll-trigger logo-header w-96"
                        href="#"
                      >
                        <img src={`/uploads/images/${Logo}`} alt="" />
                      </a>
                    </div>
                  </div>
                  <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                      <li className={activeLink === "Home" ? "active" : ""}>
                        <a
                          href="#banner"
                          onClick={() => handleLinkClick("Home")}
                        >
                          Home
                        </a>
                      </li>
                      <li className={activeLink === "About us" ? "active" : ""}>
                        <a
                          href="#about"
                          onClick={() => handleLinkClick("About us")}
                        >
                          About us
                        </a>
                      </li>
                      <li className={activeLink === "Menu" ? "active" : ""}>
                        <a href="#menu" onClick={() => handleLinkClick("Menu")}>
                          Menu
                        </a>
                      </li>
                      <li className={activeLink === "Team" ? "active" : ""}>
                        <a
                          href="#our_team"
                          onClick={() => handleLinkClick("Team")}
                        >
                          Team
                        </a>
                      </li>
                      <li className={activeLink === "Gallery" ? "active" : ""}>
                        <a
                          href="#gallery"
                          onClick={() => handleLinkClick("Gallery")}
                        >
                          Gallery
                        </a>
                      </li>
                      <li
                        className={activeLink === "Comments" ? "active" : ""}
                      >
                        <a
                          href="#Comments"
                          onClick={() => handleLinkClick("Comments")}
                        >
                          Comments
                        </a>
                      </li>
                      <li
                        className={activeLink === "Reservaion" ? "active" : ""}
                      >
                        <a
                          href="#reservation"
                          onClick={() => handleLinkClick("Reservaion")}
                        >
                          Reservation
                        </a>
                      </li>

                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div id="banner" className="banner full-screen-mode parallax">
        <div className="container pr">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="banner-static">
              <div className="banner-text">
                <div className="banner-cell">
                  <h1>
                    Dinner with us{" "}
                    <span
                      className="typer"
                      id="some-id"
                      data-delay="200"
                      data-delim=":"
                      data-words="Friends:Family:Officemates"
                      data-colors="red"
                    ></span>
                    <span
                      className="cursor"
                      data-cursorDisplay="_"
                      data-owner="some-id"
                    ></span>
                  </h1>
                  <h2>{Name} </h2>
                  <p>
                  Experience culinary excellence and exceptional service at {Name}, where every meal is a delightful journey for your taste buds.
                  </p>
                  <div className="book-btn">
                    <a
                      href="#reservation"
                      className="table-btn hvr-underline-from-center"
                    >
                      Book my Table
                    </a>
                  </div>
                  <a href="#about">
                    <div className="mouse"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
