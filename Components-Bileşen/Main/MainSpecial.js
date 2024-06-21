import { useInView } from "react-intersection-observer";

export default function Special() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  return (
    <>
      <section
        id="features"
        ref={ref}
        className={`features ${inView ? "fade-in" : ""}`}
      >
        <div className="slider_overlay">
          <div className="container">
            <div className="row">
              <div
                className="main_features_content_area  wow fadeIn"
                data-wow-duration="3s"
              >
                <div className="col-md-12">
                  <div className="main_features_content text-left">
                    <div className="col-md-6">
                      <div className="single_features_text">
                        <h4>Special Recipes</h4>
                        <h3>Taste of Precious</h3>
                        <p>
                          Welcome to Special Recipes: Taste of Precious, where
                          culinary artistry meets exquisite flavors. Our
                          platform is dedicated to bringing you a curated
                          collection of unique and cherished recipes from around
                          the world. Each recipe is handpicked and crafted with
                          precision, offering you a taste of the extraordinary.
                          Whether you're an experienced chef or a home cook
                          looking to elevate your meals, our detailed
                          instructions, expert tips, and high-quality
                          ingredients ensure that every dish you create is
                          nothing short of spectacular. Join us on a gastronomic
                          journey and discover the precious flavors that make
                          each recipe special.
                        </p>
                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
