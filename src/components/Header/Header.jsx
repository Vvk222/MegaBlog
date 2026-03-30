import React from "react";
import { Container, Logo, LogOutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-3">

          <Link to="/" className="flex items-center gap-2">
            <Logo width="40px" />
            <span className="font-bold text-lg">MegaBlog</span>
          </Link>

          <ul className="hidden md:flex gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="hover:text-blue-600 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>

          <div className="flex items-center gap-3">
            {!authStatus ? (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button
                  onClick={() => navigate("/signup")}
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/add-post")}
                  className="btn btn-secondary"
                >
                  + Create
                </button>
                <LogOutBtn />
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;