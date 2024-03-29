import React from 'react';
import PropTypes from 'prop-types';

const colors = {
    blueGray: 'bg-blue-gray-500',
    gray: 'bg-gray-500',
    brown: 'bg-brown-500',
    deepOrange: 'bg-deep-orange-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    yellow: 'bg-yellow-600',
    lime: 'bg-lime-500',
    lightGreen: 'bg-light-green-500',
    green: 'bg-green-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    lightBlue: 'bg-light-blue-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    deepPurple: 'bg-deep-purple-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    red: 'bg-red-500',
    transparent: 'bg-transparent'
};

export default function Navbar({ children, isOpen, color, navbar, className }) {
    return (
      <>
        <div className="relative w-full z-20 bg-[#090a0e]">
          <nav
            className={`${isOpen ? 'bg-eversnipe-dark border-b border-b-eversnipe bg-opacity-100' : 'bg-black bg-opacity-20 md:bg-transparent'} fixed w-full md:relative md:flex md:flex-wrap md:items-center md:justify-between py-2.5 px-3`}
          >
            {children}
          </nav>
        </div>
      </>
    );
}

Navbar.defaultProps = {
    color: 'lightBlue',
    navbar: false,
};

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    navbar: PropTypes.bool,
};
