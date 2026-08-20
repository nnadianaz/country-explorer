import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <a href="#top" className="footer-brand" aria-label="Atlas home">
        <span className="footer-compass" aria-hidden="true">
          <span />
        </span>
        <span>ATLAS</span>
      </a>

      <p>Made for curious minds and restless passports.</p>

      <a href="#top" className="footer-back-link">
        Back to the top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
};

export default Footer;