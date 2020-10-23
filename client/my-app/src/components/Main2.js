import React from 'react';


class Main2 extends React.Component {
    render() {
        return (
            <div>
                <h1>PlaceMint2</h1>
                {/* {React.cloneElement({...this.props.children}, {...this.props})} */}
                {/* {React.cloneElement(this.props.children, this.props)} */}
                {React.cloneElement({...this.props}.children, {...this.props})}
            </div>
          )
    }
}

export default Main2;