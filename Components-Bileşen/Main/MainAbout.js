import { useInView } from "react-intersection-observer";

export default function MainAbout() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <>
      <section
        id="abouts"
        ref={ref}
        className={`abouts ${inView ? "fade-in" : ""}`}
      >
        <div className="container">
          <div className="row">
            <div className="abouts_content">
              <div className="col-md-6">
                <div
                  className="single_abouts_text text-center wow slideInLeft"
                  data-wow-duration="1s"
                >
                  <img src="ab.png" alt="" />
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="single_abouts_text wow slideInRight"
                  data-wow-duration="1s"
                >
                  <h4>About us</h4>
                  <h3>WE ARE TASTY</h3>
                  <p>
                    Welcome to DineWise, your ultimate guide to
                    discovering the best dining experiences in town. Whether
                    you're a food enthusiast, a casual diner, or someone
                    planning a special occasion, we're here to help you make the
                    most out of every meal. Our mission is simple: to connect
                    you with exceptional restaurants that suit your taste and
                    preferences. We understand that finding the perfect place to
                    dine can be challenging, especially with so many options
                    available. That's why we've created a platform where you can
                    explore comprehensive reviews, honest ratings, and detailed
                    descriptions of restaurants in your area.
                  </p>

            
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
