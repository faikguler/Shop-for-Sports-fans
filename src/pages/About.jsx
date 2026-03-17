const About = () => {
  return (
    <>
      {/* Project Description */}
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h2 class="fw-bold mb-4">Our Project: Shop for Sports Fans</h2>
          <p class="fs-5">We are developing a modern e-commerce platform tailored for sports enthusiasts. Our goal is to provide a seamless shopping experience for jerseys, equipment, and accessories across multiple sports.</p>
          <p class="fs-5">The platform features a React-based customer interface, a Node.js/Express backend, and an admin panel (Vue.js) to manage products, orders, and users. We aim to combine performance, usability, and style.</p>
          <p class="fs-5">As <span class="fw-bold text-warning">Coders of the Apocalypse</span>, we embrace challenges and deliver high-quality code. This project showcases our skills in full-stack development and teamwork.</p>
        </div>
        <div class="col-lg-6 mt-4 mt-lg-0 text-center">
          <img src="https://placehold.co/600x400/ffc107/212529?text=Team+Coders" class="img-fluid rounded-4 shadow" alt="Team"/>
        </div>
      </div>
    </div>
  </section>

  {/* Team Members */}
  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Meet the Team</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm text-center p-4">
            <i class="bi bi-person-circle display-1 text-warning mb-3"></i>
            <h4 class="fw-bold">Faik</h4>
            <p class="text-muted">Full-Stack Developer</p>
            <p>Loves football and coding. Responsible for backend APIs and database design.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm text-center p-4">
            <i class="bi bi-person-circle display-1 text-warning mb-3"></i>
            <h4 class="fw-bold">Abdul</h4>
            <p class="text-muted">Full-Stack Developer</p>
            <p>Loves football and coding. Responsible for backend APIs and database design.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm text-center p-4">
            <i class="bi bi-person-circle display-1 text-warning mb-3"></i>
            <h4 class="fw-bold">Blaize</h4>
            <p class="text-muted">Full-Stack Developer</p>
            <p>Loves football and coding. Responsible for backend APIs and database design.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Why Choose Us? */}
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center fw-bold mb-5">Why Choose Us?</h2>
        </div>
        <div class="col-md-4 text-center mb-4">
          <i class="bi bi-lightning-charge-fill text-warning display-4"></i>
          <h5 class="mt-3">Fast & Reliable</h5>
          <p>Built with modern tech stack for speed and scalability.</p>
        </div>
        <div class="col-md-4 text-center mb-4">
          <i class="bi bi-people-fill text-warning display-4"></i>
          <h5 class="mt-3">Fan-Centric</h5>
          <p>Designed by sports fans for sports fans.</p>
        </div>
        <div class="col-md-4 text-center mb-4">
          <i class="bi bi-shield-check text-warning display-4"></i>
          <h5 class="mt-3">Secure Payments</h5>
          <p>Your data is safe with us.</p>
        </div>
      </div>
    </div>
  </section>
    </>
  )
};
export default About;