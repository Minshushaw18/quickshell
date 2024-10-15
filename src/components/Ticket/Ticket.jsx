import React from 'react'
import "./Ticket.css"

// status
import Emptycircle from '../../Assets/Images/To-do.svg'
import Complete from '../../Assets/Images/Done.svg'
import Halfdone from '../../Assets/Images/in-progress.svg'
import Notstart from '../../Assets/Images/Backlog.svg'
import exclamation from '../../Assets/Images/Cancelled.svg'

import dot from '../../Assets/Images/dot.png'

// priority
import UrgentI from '../../Assets/Images/SVG - Urgent Priority grey.svg'
import LowI from '../../Assets/Images/Img - Low Priority.svg'
import MediumI from '../../Assets/Images/Img - Medium Priority.svg'
import HighI from '../../Assets/Images/Img - High Priority.svg'
import NoI from '../../Assets/Images/No-priority.svg'

function Ticket({ ticket, user, available, grouping }) {



    let prioritiesIcon = {
        4: <img src={UrgentI} alt='image1'></img>,
        3: <img src={HighI} alt='image2'></img>,
        2: <img src={MediumI} alt='image3'></img>,
        1: <img src={LowI} alt='image4'></img>,
        0: <img src={NoI} alt='image5'></img>
    }


    let statusicon = {
        'Backlog': <img src={Notstart} alt='image6'></img>,
        'Todo': <img src={Emptycircle} alt='image7'></img>,
        'In progress': <img src={Halfdone} alt='image8'></img>,
        'Done': <img src={Complete} alt='image9'></img>,
        'Canceled': <img src={exclamation} alt='image10'></img>
    }
    return (
        <div className='ticket-main'>
            <div className='ticket-header'>
                <div className='ticket-id'>{ticket.id}</div>
                <div className='card-profile'>
                    <div className='card-profile-initial'>
                        {user[0]}{user[1]}
                    </div>
                    <div className={available ? "card-profile-initial-available card-profile-initial-available-true" : "card-profile-initial-available"}>
                    </div>
                </div>
                
            </div>
            <div className='ticket-content'>
                <div className='ticket-content-title'>
                    {grouping !== 'Status' ? <div className='ticket-tag-icon'>{statusicon[ticket['status']]}</div> : <></>}
                    <div className='ticket-title'><b>{ticket.title}</b></div>
                </div>
            </div>
            <div className='ticket-metadata'>
                <div className='ticket-tags'>
                    {grouping !== 'Priority' ?
                        <div className="ticket-tag">
                            <div className='ticket-tag-icon'>{prioritiesIcon[ticket['priority']]}</div>
                        </div> : <></>}

                    {ticket.tag.map((tag, key) => {
                        return (
                            <div key={key} className='ticket-tag'>
                                <div><img className="dot" src={dot} alt="" /></div>
                                <div>
                                    {tag}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Ticket

