import React from 'react'
import { useEffect , useState} from 'react';
import Page from '../../components/Page/Page';
import { useProject } from '../../contexts/ProjectContext';
import request from '../../util/request';

import { Gantt} from 'gantt-task-react';

import "gantt-task-react/dist/index.css";

const GanttPage = () => {
    const {actProject} = useProject();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await request.get(`${actProject.value}/task/`)
            if(res.data !== "Failure") {
                console.log(res.data);
                setTasks(res.data);
            }
        };
        fetchTasks();
    }, [actProject]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks])

    return (
        <Page title="Gantt Chart">
            { tasks.length !== 0 ? <Gantt listCellWidth='' ganttHeight="75vh" columnWidth="60" todayColor='#aab5b9' 
            barProgressColor='#3e97c7' barProgressSelectedColor='#61dafb'
            tasks={tasks.map(task => { 
                if(new Date(task.endDate) <= new Date()) {
                    return ({start: new Date(task.startDate), end: new Date(task.endDate), name: task.title, id: task._id, progress: 33, 
                        isDisabled: true,
                        type: 'task',  
                    styles: { progressColor: '#b82828', progressSelectedColor: '#e83333' }})
                }
                return ({start: new Date(task.startDate), end: new Date(task.endDate), name: task.title, id: task._id, progress: 33, 
                isDisabled: true,
                type: 'task',  
                })})}/> 
                : <></> }
        </Page>
    )
}   

export default GanttPage