/**
 * 404 page component.
 *
 * @module src/App/NotFound
 */

import React from 'react';
import { shape, string } from 'prop-types';

/**
 * 404 page component.
 *
 * @alias module:src/App/NotFound
 *
 * @param {Object} props - The component's props.
 * @param {string} props.location.pathname - The current pathname (i.e., the one
 * that was not found).
 * @returns {ReactElement} The rendered component.
 */
export default function NotFound(props) {
    const { pathname } = props.location;

    return <div>
        <h1>404 - Not Found</h1>
        <p>The location <code>{pathname}</code> does not exist.</p>
    </div>;
}

NotFound.propTypes = {
    location: shape({
        pathname: string.isRequired
    }).isRequired
};

