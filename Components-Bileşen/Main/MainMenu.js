import { useInView } from "react-intersection-observer";

export default function MenuSpecial({ Meals }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  return (
    <>
      <section
        id="portfolio"
        ref={ref}
        className={`portfolio ${inView ? "fade-in" : ""}`}
      >
        <div className="container">
          <div className="row">
            <div
              className="portfolio_content text-center  wow fadeIn"
              data-wow-duration="5s"
            >
              <div className="col-md-12">
                <div className="head_title text-center">
                  <h4>Delightful</h4>
                  <h3>Experience</h3>
                </div>
                <div className="main_portfolio_content">
                  {Meals.map((meal) => (
                    <>
                      <div className="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                        <img src={`/uploads/images/${meal.image}`} alt="" />
                        <div className="portfolio_images_overlay text-center">
                          <h6>{meal.Name}</h6>
                          <p className="product_price">{meal.Price}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
