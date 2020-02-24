import React from 'react';
import Menu from './Menu';

const Layout = ({
    title = 'Title',
    description = 'description',
    className,
    // children = idk -- probably refers to the "subcomponents" that get rendered in ./Home ???
    children
}) => {
    return (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default Layout;
