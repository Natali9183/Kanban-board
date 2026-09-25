import { useState } from "react";
import userAvatar from "../assets/user-avatar.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="header__title">Awesome Kanban Board</h1>
      <div className="user-menu">
        <button
          className="user-menu__toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Открыть меню пользователя"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <img className="user-menu__avatar" src={userAvatar} alt="Аватар пользователя" />
          <span className="user-menu__arrow" aria-hidden="true">{isMenuOpen ? "⌃" : "⌄"}</span>
        </button>
        {isMenuOpen && (
          <ul className="user-menu__list">
            <li className="user-menu__item">Profile</li>
            <li className="user-menu__item">Log Out</li>
          </ul>
        )}
      </div>
    </header>
  );
};
