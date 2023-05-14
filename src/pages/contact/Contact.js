import "./Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div className="contact__top">
        <h2>CONTACT US</h2>
        <p>Already use Resume Builder? Sign in here.</p>
        <p className="pdes">
          Email Us with any questions or inquiries. We would be happy to answer
          your questions.
        </p>
      </div>

      {/* bottom */}
      <div className="contact__bottom">
        <div className="contact__bottomCard">
          {/* form */}
          <span>
            <label for="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name.."
              required
            />
          </span>

          <span>
            <label for="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
              required
            />
          </span>

          <span>
            <label for="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject.."
              required
            />
          </span>

          <span>
            <label for="description">Enter Your Comment/Query:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              rows="3"
              cols="16"
              placeholder="Enter Your Comment/Query.."
              required
            />
          </span>

          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
