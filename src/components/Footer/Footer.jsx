import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="mt-10 border-t py-10 dark:border-gray-700">
      <div className="container-custom grid md:grid-cols-4 gap-8">

        <div>
          <Logo width="100px" />
          <p className="text-sm mt-3 text-gray-500">
            © 2026 Vivek. All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Features</Link></li>
            <li><Link to="/">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Help</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Privacy</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;