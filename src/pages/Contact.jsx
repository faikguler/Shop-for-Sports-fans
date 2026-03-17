const Contact = () => {
  return (
    <>
      <section class="py-5">
      <div class="container">
        <div class="row g-5">
          {/*Contact Form */}
            {/* Contact Info & Map */}
          <div class="col-lg-6">
            <h2 class="fw-bold mb-4">Get in touch</h2>
            <div class="d-flex align-items-start mb-4">
              <i class="bi bi-geo-alt-fill text-warning fs-3 me-3"></i>
              <div>
                <h5>Visit us</h5>
                <p class="mb-0">Office 4, Unit 6, First Floor, Stanhope Gate<br/>Camberley GU15 3DW</p>
              </div>
            </div>
            <div class="d-flex align-items-start mb-4">
              <i class="bi bi-telephone-fill text-warning fs-3 me-3"></i>
              <div>
                <h5>Call us</h5>
                <p class="mb-0">+44 20 4502 0325<br/>Mon-Sun, 5am-11pm</p>
              </div>
            </div>
            <div class="d-flex align-items-start mb-4">
              <i class="bi bi-envelope-fill text-warning fs-3 me-3"></i>
              <div>
                <h5>Email</h5>
                <p class="mb-0">support@sportshop.com</p>
              </div>
            </div>
          </div>



          <div class="col-lg-6">
            <h2 class="fw-bold mb-4">Send us a message</h2>
            <form>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="name" class="form-label">Your Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Faik Ramadan"/>
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" class="form-control" id="email" placeholder="name@example.com"/>
                </div>
                <div class="col-12">
                  <label for="subject" class="form-label">Subject</label>
                  <input type="text" class="form-control" id="subject" placeholder="Order inquiry, support, etc."/>
                </div>
                <div class="col-12">
                  <label for="message" class="form-label">Message</label>
                  <textarea class="form-control" id="message" rows="5" placeholder="How can we help?"></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-warning btn-lg px-5">Send Message <i class="bi bi-send ms-2"></i></button>
                </div>
              </div>
            </form>
          </div>
        
        </div>
      </div>
    </section>

    </>
  )
};
export default Contact;