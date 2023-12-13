

const Footer = () => {
    return (
        <footer className="mt-10">
            <div className="footer p-10 bg-base-200 text-base-content">
                <aside className="mt-16 text-3xl text-orange-400">
                    TECLINK

                </aside>
                <nav>
                    <header className="footer-title">Social</header>
                    <a className="link link-hover" href="https://www.facebook.com">Facebook</a>
                    <a className="link link-hover"> Instagram</a>
                    <a className="link link-hover"> LinkedIn</a>
                    <a className="link link-hover">Twitter</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover"> Services
                    </a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover"> Pricing</a>
                    <a className="link link-hover"> FAQs</a>
                </nav>
                <nav>
                    <header className="footer-title">Useful Links</header>
                    <a className="link link-hover"> About Us</a>
                    <a className="link link-hover">Terms & condition</a>
                    <a className="link link-hover">Privacy Policy</a>
                </nav>

            </div>
            <div className=" footer-center  p-4 bg-base-200 text-base-content">
                <aside>
                    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;