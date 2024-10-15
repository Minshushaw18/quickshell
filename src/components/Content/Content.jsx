import React from 'react'
import { useState, useEffect } from 'react'
import "./Content.css"
import List from '../List/List'

import Plus from '../../Assets/Images/add.svg'
import Threedots from '../../Assets/Images/3 dot menu.svg'

import UrgentI from '../../Assets/Images/SVG - Urgent Priority colour.svg'
import LowI from '../../Assets/Images/Img - Low Priority.svg'
import MediumI from '../../Assets/Images/Img - Medium Priority.svg'
import HighI from '../../Assets/Images/Img - High Priority.svg'
import NoI from '../../Assets/Images/No-priority.svg'


import Emptycircle from '../../Assets/Images/To-do.svg'
import Complete from '../../Assets/Images/Done.svg'
import Halfdone from '../../Assets/Images/in-progress.svg'
import Notstart from '../../Assets/Images/Backlog.svg'
import exclamation from '../../Assets/Images/Cancelled.svg'


function Content({ statuses, priorities, priorityScores, grouping, ordering }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({
        "tickets": [],
        "users": []
    })
    let prioritiesIcon = {
        4: UrgentI,
        3: HighI,
        2: MediumI,
        1: LowI,
        0: NoI
    }

    let statusIcon = {
        'Backlog': <img src={Notstart} alt='image11'></img>,
        'Todo': <img src={Emptycircle} alt='image12'></img>,
        'In progress': <img src={Halfdone} alt='image13'></img>,
        'Done': <img src={Complete} alt='image14'></img>,
        'Canceled': <img src={exclamation} alt='image15'></img>
    }

   
    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response
            })
            .then(response => {
                setData(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

   
    const [ticketMap, setTicketMap] = useState([])

 
    function cmpTitle(a, b) {
        return a.title.localeCompare(b.title);
    }

   
    function cmpPriority(a, b) {
        return b.priority - a.priority;
    }

   
    let statusTicketMapTitle = () => {
        let obj = []
        statuses.forEach(status => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if (status === ticket.status) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

   
    let statusTicketMapPriority = () => {
        let obj = []
        statuses.forEach(status => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if (status === ticket.status) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }


    let userTicketMapTitle = () => {
        let obj = []
        data['users'].forEach(user => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if (user.id === ticket.userId) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

 
    let userTicketMapPriority = () => {
        let obj = []
        data['users'].forEach(user => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if (user.id === ticket.userId) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }


    let priorityTicketMapTitle = () => {
        let obj = []
        priorityScores.forEach(priority => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if (priority === ticket.priority) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

  
    let priorityTicketMapPriority = () => {
        let obj = []
        priorityScores.forEach(priority => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if (priority === ticket.priority) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

  
    useEffect(() => {
        if (grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority()
        } else if (grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle()
        } else if (grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority()
        } else if (grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle()
        } else if (grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority()
        } else if (grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle()
        }
    }, [grouping, ordering])

    
    useEffect(() => {
        
        if (grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority()
        } else if (grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle()
        } else if (grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority()
        } else if (grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle()
        } else if (grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority()
        } else if (grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle()
        }
    }, [data])

  
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className='dashboard-main'>
            {grouping === "Status" ?
                ticketMap.map((ticketList, key) => {
                    return (
                        <div className='dashboard-list'>
                            <div className='dashboard-list-header-controls'>
                                <div className='dashboard-list-header-controls-info'>
                                <div>{statusIcon[statuses[key]]}</div>
                                    <b><p className='dashboard-list-header'>{statuses[key]}</p></b>
                                    <div className='dashboard-list-items-count'>{ticketList.length}</div>
                                </div>
                                {ticketList.length !== 0 && <div>
                                    <div>{<img src={Plus} alt='img3'></img>}</div>
                                    <div>{<img src={Threedots} alt='img4'></img>}</div>
                                </div>}
                            </div>
                            <List key={key} ticketList={ticketList} userList={data['users']} grouping={grouping}/>
                        </div>
                    )
                })
                :
                grouping === 'User' ?

                    ticketMap.map((ticketList, key) => {
                        return (
                            <div className='dashboard-list'>
                                <div className='dashboard-list-header-controls'>
                                    <div className='dashboard-list-header-controls-info'>
                                        <div className='first-letter'>{data['users'][key].name.split(' ')[0].charAt(0).toUpperCase()}</div>
                                        <b><p className='dashboard-list-header'>{data['users'][key].name}</p></b>
                                        <div className='dashboard-list-items-count'>{ticketList.length}</div>
                                    </div>
                                    {ticketList.length !== 0 && <div>
                                        <div>{<img src={Plus} alt='img1'></img>}</div>
                                        <div>{<img src={Threedots} alt='img2'></img>}</div>
                                    </div>}
                                </div>
                                <List key={key} ticketList={ticketList} userList={data['users']} grouping={grouping}/>
                            </div>
                        )
                    })
                    :
                    grouping === 'Priority' ?
                        ticketMap.map((ticketList, key) => {
                            return (
                                <div className='dashboard-list'>
                                    <div className='dashboard-list-header-controls'>
                                        <div className='dashboard-list-header-controls-info'>
                                            <div>{<img src={prioritiesIcon[key]} alt=' '></img>}</div>
                                            <b><p className='dashboard-list-header'>{priorities[key]}</p></b>
                                            <div className='dashboard-list-items-count'>{ticketList.length}</div>
                                        </div>
                                        {ticketList.length !== 0 && <div>
                                            <div>{<img src={Plus} alt='img5'></img>}</div>
                                            <div>{<img src={Threedots} alt='img6'></img>}</div>
                                        </div>}
                                    </div>
                                    <List key={key} ticketList={ticketList} userList={data['users']} grouping={grouping}/>
                                </div>
                            )
                        })
                        :
                        (<span></span>)
            }
        </div>
    )
}

export default Content