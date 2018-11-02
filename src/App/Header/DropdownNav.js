/**
 * Dropdown nav component.
 *
 * @module src/App/Header/DropdownNav
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { object, string, node, bool } from 'prop-types';
import classNames from 'classnames';

import Dropdown from 'src/Dropdown';

import styles from './DropdownNav.less';

/**
 * Dropdown button React component.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.to - The dropdown's target path. Used for routing.
 * @param {ReactNode} props.title - The title for the dropdown.
 * @param {boolean} props.isOpen - Whether or not the dropdown is open.
 * @returns {ReactElement} The component's elements.
 */
function DropdownButton(props) {
    const { to, title, isOpen } = props;

    /**
     * Button React component.
     *
     * @param {Object} buttonProps - The component's props.
     * @param {boolean} match - Whether or not the target path has been matched.
     * @returns {ReactElement} The component's elements.
     */
    function Button(buttonProps) {
        const { match } = buttonProps;
        const classes = classNames(styles.button, {
            [styles.active]: match !== null,
            [styles.open]: isOpen
        });

        return <button
            className={classes}
            onClick={event => event.preventDefault()}
        >
            {title}
        </button>;
    }

    Button.propTypes = {
        match: object
    };

    return <Route path={to}>
        {Button}
    </Route>;
}

DropdownButton.propTypes = {
    to: string.isRequired,
    title: node.isRequired,
    isOpen: bool
};

/**
 * Dropdown nav component.
 *
 * @alias module:src/App/Header/DropdownNav
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.title - The title for the dropdown.
 * @param {ReactNode} props.children - The dropdown items.
 * @returns {ReactElement} The component's elements.
 */
function DropdownNav(props) {
    const { title, children } = props;
    const { enter, enterActive, exit, exitActive } = styles;

    /**
     * Dropdown menu.
     *
     * @private
     *
     * @returns {ReactElement} The component's elements.
     */
    function Menu() {
        return <div className={styles.menu}>
            {children}
        </div>;
    }

    return <Dropdown
        className={styles.dropdown}
        button={<DropdownButton to='/account/' title={title} />}
        transition={{
            appear: true,
            classNames: {
                enter, enterActive, exit, exitActive,
                appear: enter,
                appearActive: enterActive
            },
            timeout: 300
        }}
    >
        <Menu />
    </Dropdown>;
}

DropdownNav.propTypes = {
    title: node.isRequired,
    children: node.isRequired
};

export default DropdownNav;

