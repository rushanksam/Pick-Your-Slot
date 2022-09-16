import React from 'react';

export default function TagTeamDashboardCard(props) {

    return (
        
        <div className={'card order-card' + props.background}>
            <div className="card-block">
                <h6 className="m-b-20">{props.title}</h6>
                <h2 className="text-right"><span>{ props.number}</span></h2>
            </div>
        </div>
    );
    

}